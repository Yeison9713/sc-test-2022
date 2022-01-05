const { getObjRegHC } = require("../../HICLIN/scripts/reg_hc.js");
const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("HC9012", {
  props: {
    params: {
      estado: false,
      paso: null,
    },
  },
  data() {
    return {
      dato_9012: detallesHc.WS_9012(),
      hcprc: getObjRegHC(),
      edad_hc_w: "",
      fecha_act: moment().format("YYYYMMDD"),
      hora_act: moment().format("HHmm"),
      iniciales: {
        ano: "",
        mes: "",
        dia: "",
        hr: "",
        mn: "",
        folio: "",
      },
      array_tipo_vacuna: [
        { COD: "1", DESCRIP: "PFIZER" },
        { COD: "2", DESCRIP: "SINOVAC" },
        { COD: "3", DESCRIP: "MODERNA" },
        { COD: "4", DESCRIP: "ASTRAZENECA" },
        { COD: "5", DESCRIP: "JANSSEN" },
      ],
      array_etapa_vacuna: [
        { COD: "1", DESCRIP: "PRIMERA" },
        { COD: "2", DESCRIP: "SEGUNDA" },
        { COD: "3", DESCRIP: "TERCERA" },
        { COD: "4", DESCRIP: "CUARTA" },
        { COD: "5", DESCRIP: "QUINTA" },
      ],
      array_nro_dosis_1: [
        { COD: "1", DESCRIP: "PRIMERA DOSIS" },
        { COD: "2", DESCRIP: "SEGUNDA DOSIS" },
        { COD: "3", DESCRIP: "DOSIS UNICA" },
      ],
      array_nro_dosis_2: [
        { COD: "1", DESCRIP: "DOSIS UNICA" },
        { COD: "2", DESCRIP: "DOSIS REFUERZO" },
      ],
      medico: {
        IDENTIFICACION: "",
        NOMBRE: "",
        ATIENDE_PROF: "",
        TAB_ESPEC: "",
      },
      array_aper_ocul: _tipoJsonHc("aper_ocul"),
      array_resp_verb: _tipoJsonHc("resp_verb"),
      array_resp_moto: _tipoJsonHc("resp_moto"),
      flagSalir: false,
      mostrarTipoReaccion: false,
      nit_usu: $_USUA_GLOBAL[0].NIT,
      detalles: [],
      mostrarComorbilidades: false,
    };
  },
  created() {
    loader("show");
    $this = this;
  },
  watch: {
    "params.estado": function (val) {
      if (val) this.leerHistoria();
    },

    flagSalir: function (val) {
      if (val) $this.$emit("callback_esc", this.dato_9012);
    },

    "hcprc.motiv": function (val) {
      this.hcprc.motiv = val.enterPut().replaceEsp();
    },

    "dato_9012.datos_tabla_recom": function (val) {
      this.dato_9012.datos_tabla_recom = val.enterPut().replaceEsp();
    },
  },
  computed: {
    descrip_tipo_vacuna() {
      let tipo = this.array_tipo_vacuna.find((el) => el.COD == this.dato_9012.tipo_vacuna);
      return tipo ? tipo.DESCRIP : "";
    },

    descrip_nro_dosis() {
      switch (parseInt(this.dato_9012.nro_dosis)) {
        case 1:
          return "PRIMERA DOSIS";
        case 2:
          return "SEGUNDA DOSIS";
        case 3:
          return "DOSIS UNICA";
        case 4:
          return "DOSIS REFUERZO";
        default:
          return "";
      }
    },

    descrip_etapa_vacuna() {
      let etapa = this.array_etapa_vacuna.find((el) => el.COD == this.dato_9012.etapa_vacuna);
      return etapa ? etapa.DESCRIP : "";
    },

    fecha_vacunacion() {
      return _getObjectDate(this.dato_9012.fecha_vacunacion);
    },
  },
  methods: {
    async leerHistoria() {
      await this.comprobarHistoriasAnteriores();

      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario.trim() + "|1|",
        },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then((data) => {
          this.hcprc = data;
          loader("hide");
          if (this.params.paso == 2) {
            this.buscarEvolAnt();
          } else this.leerDetalles();
        })
        .catch((err) => {
          CON851("", "Error consultando datos", null, "error", "error");
          console.log(err, "err");
          this.salir();
        });
    },

    buscarEvolAnt() {
      if (this.hcprc.llave.slice(17) > 1 || this.SW_EXISTE_W == 1) {
        CON851P(
          "¿Desea ver las evoluciones anteriores?", 
          this.leerDetalles,
          () => {
            iniciar_HC002B(2);
            this.leerDetalles();
          })
      } else this.leerDetalles();
    },

    comprobarHistoriasAnteriores() {
      return new Promise((resolve, reject) => {
        postData(
          {
            datosh:
              datosEnvio() + $_REG_HC.llave_hc.slice(0, 17) + "000001" + "|" + localStorage.Usuario.trim() + "|1|",
          },
          get_url("APP/HICLIN/GET_HC.DLL")
        )
          .then((data) => {
            if (data.novedad == 7) this.SW_EXISTE_W = 0;
            else this.SW_EXISTE_W = 1;
            resolve();
          })
          .catch((err) => {
            console.log(err, "err");
            reject();
          });
      });
    },

    leerDetalles() {
      loader("show");
      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|||9012|" + $_REG_HC.serv_hc + "|",
        },
        get_url("app/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          let detalles = data["DETHC"];
          this.detalles.pop();

          let detalle9012 = detalles.find((e) => e["COD-DETHC"] == "9012");

          this.dato_9012 = detalle9012 ? detalle9012.DETALLE : this.dato_9012;

          this.abrirArchivos();
        })
        .catch((error) => {
          CON851("", "Error consultando datos", null, "error", "error");
          console.log(error);
          this.salir();
        });
    },

    abrirArchivos() {
      switch ($_REG_HC.edad_hc.unid_edad) {
        case "D":
          this.edad_hc_w = 1;
          break;
        case "M":
          this.edad_hc_w = 2;
          break;
        case "A":
          this.edad_hc_w = 3;
          break;
        default:
          this.edad_hc_w = 0;
          break;
      }

      this.edad_hc_w += $_REG_HC.edad_hc.vlr_edad.toString().padStart(3, "0");

      this.hcprc.unid_edad = $_REG_HC.edad_hc.unid_edad;
      this.hcprc.vlr_edad = cerosIzq($_REG_HC.edad_hc.vlr_edad.toString(), 3);
      this.hcprc.edad_dias = SC_DIAS($_REG_PACI.NACIM, this.fecha_act);
      if (!this.hcprc.med) this.hcprc.med = $_REG_PROF.IDENTIFICACION;

      loader("hide");
      this.leerMedico();
    },

    leerMedico() {
      this.medico = $_REG_PROF;
      if (
        this.medico.ATIENDE_PROF == "A" &&
        [250, 140, 460, 461, 464, 462].includes(parseInt(this.medico.TAB_ESPEC[0].COD))
      )
        this.medico.ATIENDE_PROF = 1;
      this.inicioVacunacion();
    },

    inicioVacunacion() {
      switch (this.params.paso) {
        case 1:
          this.ventanaVacunacionCovid19();
          break;
        case 2:
          this.buscarComprobantes();
          break;
        default:
          CON851("", "Paso no válido, vacunación covid", null, "error", "Error");
          this.salir();
          break;
      }
    },

    ventanaVacunacionCovid19() {
      this.datoVacunado();
    },

    datoVacunado() {
      validarInputs(
        {
          form: "#vacunado",
        },
        this.salir,
        () => {
          this.dato_9012.vacunado_covid19 = this.dato_9012.vacunado_covid19.toUpperCase();
          if (this.dato_9012.vacunado_covid19 != "S") this.dato_9012.vacunado_covid19 = "N";

          if (this.dato_9012.vacunado_covid19 == "S") {
            this.datoEtapaVacuna();
          } else {
            this.dato_9012.etapa_vacuna =
              this.dato_9012.tipo_vacuna =
              this.dato_9012.nro_dosis =
              this.dato_9012.fecha_vacunacion =
                "";
            this.grabarVacunacion_1();
          }
        }
      );
    },

    datoFechaVacuna_1() {
      validarInputs(
        {
          form: "#fecha_vacunacion",
        },
        this.datoNroDosis,
        () => {
          this.fecha_vacunacion.ano_w = this.fecha_vacunacion.ano_w.padStart(4, "0");
          this.fecha_vacunacion.mes_w = this.fecha_vacunacion.mes_w.padStart(2, "0");
          this.fecha_vacunacion.dia_w = this.fecha_vacunacion.dia_w.padStart(2, "0");
          this.dato_9012.fecha_vacunacion = `${this.fecha_vacunacion.ano_w}${this.fecha_vacunacion.mes_w}${this.fecha_vacunacion.dia_w}`;

          if (!_validarFecha(this.fecha_vacunacion.ano_w, this.fecha_vacunacion.mes_w, this.fecha_vacunacion.dia_w)) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaVacuna_1();
          } else if (this.fecha_vacunacion.ano_w > this.fecha_act.slice(0, 4)) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaVacuna_1();
          } else if (parseInt(this.dato_9012.fecha_vacunacion) > parseInt(this.fecha_act)) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaVacuna_1();
          } else {
            this.grabarVacunacion_1();
          }
        }
      );
    },

    grabarVacunacion_1() {
      CON851P(
        "01",
        () => {
          this.dato_9012.vacunado_covid19 == "S" ? this.datoFechaVacuna_1() : this.datoVacunado();
        },
        this.grabarDetalles_9012
      );
    },

    buscarComprobantes() {
      let nits = [892000458, 892000264, 800037202];
      if (!nits.includes(this.nit_usu)) {
        if ($_REG_HC.serv_hc == 02 || $_REG_HC.serv_hc == 08) {
          this.buscarConsultaExterna();
        } else if (this.nit_usu == 900405505 && $_REG_HC.serv_hc == 63) {
          // FAMEDIC QUIERE BUSCAR COMPROBANTE PARA TELESALUD
          this.buscarConsultaExterna();
        } else if (this.nit_usu == 892000458 && $_REG_HC.serv_hc == 01) {
          // HOSPITAL DE SAN MARTIN QUIERE BUSCAR comprobante tambien para urgencias
          this.buscarConsultaExterna();
        } else {
          this.verificarCrearHistoria();
        }
      } else this.verificarCrearHistoria();
    },

    async buscarConsultaExterna() {
      postData(
        {
          datosh:
            datosEnvio() +
            localStorage.Usuario +
            "|" +
            $_REG_PACI.COD +
            "|" +
            $_REG_HC.serv_hc +
            "|" +
            moment().format("YYYYMMDD") +
            "|",
        },
        get_url("APP/HICLIN/HC811B.DLL")
      )
        .then((data) => {
          this.nro_ult_comp = data;
          this.verificarCrearHistoria();
        })
        .catch((err) => {
          console.error(err);
          this.salir();
        });
    },

    async verificarCrearHistoria() {
      if (this.hcprc.novedad == "7") {
        this.hcprc.med = this.medico.IDENTIFICACION;
        this.hcprc.rips.finalid = $_REG_HC.finalid_hc;
        this.hcprc.fecha = $_REG_HC.fecha_hc;
        this.hcprc.hora = this.hora_act;
        this.hcprc.serv = $_REG_HC.serv_hc;
        this.crearHistoria();
      } else {
        await this.errorYaExiste();
      }
    },

    crearHistoria() {
      var data = {};
      data["datosh"] = datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + this.hcprc.novedad + "|";
      data["datos_basicos"] =
        this.hcprc.fecha +
        "|" +
        this.hcprc.hora +
        "|" +
        this.hcprc.med +
        "|" +
        $_REG_HC.serv_hc +
        "|" +
        this.hcprc.unid_edad +
        this.hcprc.vlr_edad +
        "|" +
        this.hcprc.edad_dias +
        "|9012|0|";

      postData(data, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
        .then(async (data) => {
          if ($_REG_HC.serv_hc == 1 || $_REG_HC.serv_hc == 4) {
            this.hcprc.proceden = data.PROCEDENCIA.trim();
            this.hcprc.motiv = data.MOTIV.trim();
            this.hcprc.signos.peso = parseFloat(data.PESO.trim()).toString();
            this.hcprc.signos.talla = parseInt(data.TALLA).toString();
            this.hcprc.rips.triage = data.TRIAGE.trim();
            this.hcprc.rips.causa = data.CAUSA.trim();
            this.hcprc.rips.finalid = data.FINALID.trim();
            this.hcprc.rips.estado_sal = data.ESTADO_SAL.trim();
            this.hcprc.rips.remitido = data.REMITIDO.trim();
            this.hcprc.cierre.eps = data.EPS.trim();
          }

          this.hcprc.novedad = "8";
          this.pantalla_01();
        })
        .catch((error) => {
          console.log(error);
          CON851("", "Ha ocurrido un error creando historia", null, "error", "Error");
          this.salir();
        });
    },

    async errorYaExiste() {
      await postData(
        { datosh: datosEnvio(), paso: "1", codigo: cerosIzq(this.hcprc.med, 10) },
        get_url("APP/SALUD/SER819.DLL")
      )
        .then((data) => {
          if (data.NOMBRE.trim() == "Personal no atiende") {
            CON851("9X", "9X", null, "error", "Error");
            this.salir();
          } else {
            this.medico = data;

            jAlert(
              {
                titulo: "ATENCIÓN",
                mensaje: `Ese paciente ya tiene historia clinica abierta, con fecha ${_editFecha2(this.hcprc.fecha)} ${
                  this.hcprc.cierre.temporal == 1 ? "\n No fue totalmente diligenciada" : ""
                }`,
              },
              () => {
                this.pantalla_01();
              }
            );
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error leyendo datos", null, "error", "Error");
          this.salir();
        });
    },

    async pantalla_01() {
      this.iniciales.ano = this.fecha_act.substring(0, 4);
      this.iniciales.mes = this.fecha_act.substring(4, 6);
      this.iniciales.dia = this.fecha_act.substring(6, 8);

      this.iniciales.hr = this.hora_act.substring(0, 2);
      this.iniciales.mn = this.hora_act.substring(2, 4);

      this.iniciales.folio = this.hcprc.llave.substring(15, 23);

      if (this.hcprc.med.trim() == "") this.hcprc.med = this.medico.IDENTIFICACION;
      this.hcprc.descrip_med = this.medico.NOMBRE;

      await postData({ datosh: datosEnvio() + $_REG_HC.serv_hc + "|" }, get_url("APP/SALUD/SER873-1.DLL"))
        .then((data) => {
          this.hcprc.descrip_serv = data.UNSERV.DESCRIP;
        })
        .catch((error) => {
          CON851("", "Error consultando unidades de servicio", null, "error", "error");
          console.log(error);
        });

      this.datoEmbarazada();
    },

    datoEmbarazada() {
      if (
        $_REG_PACI.SEXO == "F" &&
        this.hcprc.unid_edad == "A" &&
        this.hcprc.vlr_edad > 8 &&
        this.hcprc.vlr_edad < 55
      ) {
        CON851P(
          "29",
          () => {
            this.SW_EMBAR_W = "S";
            this.datoMotivo();
          },
          this.datoMotivo
        );
      } else {
        this.SW_EMBAR_W = "N";
        this.datoMotivo();
      }
    },

    datoMotivo() {
      if (!this.hcprc.motiv) this.hcprc.motiv = "OBSERVACION VACUNACION COVID-19";

      validarInputs(
        {
          form: "#motiv",
        },
        () => {
          this.salir();
        },
        () => {
          this.hcprc.motiv = this.hcprc.motiv.toUpperCase().replaceEsp();
          if (!this.hcprc.motiv) {
            CON851("", "02", null, "error", "Error");
            this.datoMotivo();
          } else this.datoEtapaVacuna();
        }
      );
    },

    datoEtapaVacuna() {
      POPUP(
        {
          array: this.array_etapa_vacuna,
          titulo: "ETAPA DE VACUNA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.dato_9012.etapa_vacuna,
          callback_f: () => {
            switch (this.params.paso) {
              case 1:
                this.datoVacunado();
                break;
              case 2:
                this.datoMotivo();
                break;
              default:
                this.datoMotivo();
                break;
            }
          },
        },
        (data) => {
          this.dato_9012.etapa_vacuna = data.COD;
          setTimeout(() => {
            this.datoTipoVacuna();
          }, 200);
        }
      );
    },

    datoTipoVacuna() {
      POPUP(
        {
          array: this.array_tipo_vacuna,
          titulo: "TIPO DE VACUNA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.dato_9012.tipo_vacuna,
          callback_f: () => {
            setTimeout(() => {
              this.datoEtapaVacuna();
            }, 200);
          },
        },
        (data) => {
          this.dato_9012.tipo_vacuna = data.COD;
          setTimeout(() => {
            this.datoNroDosis();
          }, 200);
        }
      );
    },

    datoNroDosis() {
      POPUP(
        {
          array: this.dato_9012.tipo_vacuna != 5 ? this.array_nro_dosis_1 : this.array_nro_dosis_2,
          titulo: "NUMERO DE DOSIS",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.dato_9012.nro_dosis,
          callback_f: () => {
            setTimeout(() => {
              this.datoTipoVacuna();
            }, 200);
          },
        },
        (data) => {
          if (this.dato_9012.tipo_vacuna == 5) {
            switch (parseInt(data.COD)) {
              case 1:
                this.dato_9012.nro_dosis = "3";
                break;
              case 2:
                this.dato_9012.nro_dosis = "4";
                break;
            }
          } else {
            this.dato_9012.nro_dosis = data.COD;
          }
          setTimeout(() => {
            switch (this.params.paso) {
              case 1:
                this.datoFechaVacuna_1();
                break;
              case 2:
                this.mostrarPantallaSignosIng();
                break;
              default:
                this.mostrarPantallaSignosIng();
                break;
            }
          }, 200);
        }
      );
    },

    mostrarPantallaSignosIng() {
      this.datoPesoIng();
    },

    datoPesoIng() {
      if ($_REG_HC.edad_hc.unid_edad == "D" || ($_REG_HC.edad_hc.unid_edad == "M" && $_REG_HC.edad_hc.vlr_edad < 3)) {
        this.hcprc.signos.und_peso = 2;
      } else this.hcprc.signos.und_peso = 1;

      validarInputs(
        {
          form: "#peso_ing",
        },
        () => {
          setTimeout(() => {
            this.datoTipoVacuna();
          }, 200);
        },
        () => {
          if (
            this.nit_usu == 800037021 &&
            this.medico.ATIENDE_PROF == 1 &&
            $_REG_HC.serv_hc == 02 &&
            this.hcprc.signos.peso == 0
          ) {
            CON851("", "02", null, "error", "Error");
            this.datoPesoIng();
          } else if (this.hcprc.signos.peso == 0) {
            this.hcprc.signos.peso = 0;
            this.hcprc.signos.und_peso = 0;
            this.datoTallaIng();
          } else {
            switch (parseInt(this.hcprc.signos.und_peso)) {
              case 1:
                if (this.hcprc.signos.peso < 2 || this.hcprc.signos.peso > 300) {
                  CON851("", "03", null, "error", "Error");
                  this.datoPesoIng();
                } else this.datoTallaIng();
                break;
              case 2:
                if (this.hcprc.signos.peso < 500 || this.hcprc.signos.peso > 20000) {
                  CON851("", "03", null, "error", "Error");
                  this.datoPesoIng();
                } else this.datoTallaIng();
                break;
            }
          }
        }
      );
    },

    datoTallaIng() {
      validarInputs(
        {
          form: "#talla_ing",
        },
        () => {
          this.datoPesoIng();
        },
        () => {
          if (this.hcprc.signos.talla == 0 && this.hcprc.signos.peso == 0) {
            CON851("", "02", null, "error", "Error");
            this.datoTallaIng();
          } else if (this.hcprc.signos.talla > 230) {
            CON851("", "03", null, "error", "Error");
            this.datoTallaIng();
          } else this.calcularIndicesImc();
        }
      );
    },

    calcularIndicesImc() {
      if (this.hcprc.signos.peso == 0 || this.hcprc.signos.talla == 0) {
        this.hcprc.signos.imc_corp = 0;
      } else {
        this.hcprc.signos.imc_corp = Math.round(
          parseFloat(this.hcprc.signos.peso) /
            ((parseFloat(this.hcprc.signos.talla) / 100) ** 2).toFixed(2).toString().padStart(5, "0")
        );
      }

      if (this.hcprc.signos.peso == 0 || this.hcprc.signos.talla == 0) {
        this.hcprc.signos.sup_corp = 0;
      } else {
        this.hcprc.signos.sup_corp = Math.round(
          ((parseFloat(this.hcprc.signos.peso) + parseFloat(this.hcprc.signos.talla) - 60) / 100)
            .toFixed(2)
            .toString()
            .padStart(5, "0")
        );
      }

      if ($_REG_HC.edad_hc.unid_edad == "A" && $_REG_HC.edad_hc.vlr_edad > 15 && this.SW_EMBAR_W == "N") {
        if (this.hcprc.signos.imc_corp >= 30) {
          CON851("", "BC", null, "warning", "Error");
        } else if (this.hcprc.signos.imc_corp >= 25) {
          CON851("", "BB", null, "warning", "Error");
        } else if (this.hcprc.signos.imc_corp < 16) {
          CON851("", "BE", null, "warning", "Error");
        } else if (this.hcprc.signos.imc_corp <= 17) {
          CON851("", "BD", null, "warning", "Error");
        }
      }

      this.datoTempIng();
    },

    datoTempIng() {
      validarInputs(
        {
          form: "#temp_ing",
        },
        () => {
          this.datoTallaIng();
        },
        () => {
          this.validacionesTemp()
            .then(() => {
              this.datoFcIng();
            })
            .catch(() => {
              this.datoTempIng();
            });
        }
      );
    },

    validacionesTemp() {
      return new Promise((resolve, reject) => {
        if (this.hcprc.signos.temp == 0 && $_REG_HC.serv_hc != 02 && $_REG_HC.serv_hc != 63) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.hcprc.signos.temp == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.hcprc.signos.temp > 0 && (this.hcprc.signos.temp < 35.5 || this.hcprc.signos.temp > 38)) {
          CON851("", "BM", null, "warning", "Error");
        }

        if (this.hcprc.signos.temp > 45) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoFcIng() {
      validarInputs(
        {
          form: "#fcard_ing",
        },
        () => {
          this.datoTempIng();
        },
        () => {
          this.validacionesFcard_ing()
            .then(() => {
              this.datoFrIng();
            })
            .catch(() => {
              this.datoFcIng();
            });
        }
      );
    },

    validacionesFcard_ing() {
      return new Promise((resolve, reject) => {
        if (this.hcprc.signos.fcard == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.hcprc.signos.fcard > 0) {
          if (
            $_REG_HC.edad_hc.unid_edad == "D" ||
            ($_REG_HC.edad_hc.unid_edad == "M" && $_REG_HC.edad_hc.vlr_edad < 3)
          ) {
            if (this.hcprc.signos.fcard < 120 || this.hcprc.signos.fcard > 160) {
              CON851("", "BK", null, "warning", "Error");
            }
          } else {
            if (
              $_REG_HC.edad_hc.unid_edad == "M" ||
              ($_REG_HC.edad_hc.unid_edad == "A" && $_REG_HC.edad_hc.vlr_edad < 5)
            ) {
              if (this.hcprc.signos.fcard < 60 || this.hcprc.signos.fcard > 100) {
                CON851("", "BK", null, "warning", "Error");
              }
            } else {
              if (this.hcprc.signos.fcard < 60 || this.hcprc.signos.fcard > 90) {
                CON851("", "BK", null, "warning", "Error");
              }
            }
          }
        }

        if (this.hcprc.signos.fcard > 200) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoFrIng() {
      validarInputs(
        {
          form: "#fresp_ing",
        },
        () => {
          this.datoFcIng();
        },
        () => {
          this.validacionesFresp_ing()
            .then(() => {
              this.datoTens1Ing();
            })
            .catch(() => {
              this.datoFrIng();
            });
        }
      );
    },

    validacionesFresp_ing() {
      return new Promise((resolve, reject) => {
        if (this.hcprc.signos.fresp == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.hcprc.signos.fresp > 0) {
          switch ($_REG_HC.edad_hc.unid_edad) {
            case "D":
              if (this.hcprc.signos.fresp < 30 || this.hcprc.signos.fresp > 60) {
                CON851("", "BL", null, "warning", "Error");
              }
              break;
            case "M":
              if ($_REG_HC.edad_hc.vlr_edad < 3) {
                if (this.hcprc.signos.fresp < 30 || this.hcprc.signos.fresp > 60) {
                  CON851("", "BL", null, "warning", "Error");
                }
              } else {
                if (this.hcprc.signos.fresp < 20 || this.hcprc.signos.fresp > 50) {
                  CON851("", "BL", null, "warning", "Error");
                }
              }
              break;
            case "A":
              if ($_REG_HC.edad_hc.vlr_edad < 5) {
                if (this.hcprc.signos.fresp < 16 || this.hcprc.signos.fresp > 40) {
                  CON851("", "BL", null, "warning", "Error");
                }
              } else {
                if (this.hcprc.signos.fresp < 14 || this.hcprc.signos.fresp > 30) {
                  CON851("", "BL", null, "warning", "Error");
                }
              }
              break;
          }
        }

        if (this.hcprc.signos.fresp > 100) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoTens1Ing() {
      validarInputs(
        {
          form: "#tens1_ing",
        },
        () => {
          this.datoFrIng();
        },
        () => {
          this.validacionesTens1_ing()
            .then(() => {
              this.datoTens2Ing();
            })
            .catch(() => {
              this.datoTens1Ing();
            });
        }
      );
    },

    validacionesTens1_ing() {
      return new Promise((resolve, reject) => {
        if ([1, 5, 7, "A", "H", "I", "O"].includes(this.medico.ATIENDE_PROF)) {
          // continue
        } else {
          if (this.hcprc.signos.tens1 == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
            CON851("", "02", null, "error", "Error");
            reject();
          }
        }

        if (this.hcprc.signos.tens1 > 300) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoTens2Ing() {
      validarInputs(
        {
          form: "#tens2_ing",
        },
        () => {
          this.datoTens1Ing();
        },
        () => {
          this.validacionesTens2_ing()
            .then(() => {
              if ($_REG_HC.edad_hc.unid_edad == "D" || $_REG_HC.edad_hc.unid_edad == "M") {
                this.hcprc.signos.aper_ocul = 0;
                this.hcprc.signos.resp_verb = 0;
                this.hcprc.signos.resp_moto = 0;
                this.hcprc.signos.vlr_glasg = 0;
                this.datoPvcIng();
              } else if (
                this.medico.TAB_ESPEC[0].COD == 521 ||
                this.medico.TAB_ESPEC[0].COD == 522 ||
                this.medico.TAB_ESPEC[1].COD == 521 ||
                this.medico.TAB_ESPEC[1].COD == 522
              ) {
                this.hcprc.signos.aper_ocul = 0;
                this.hcprc.signos.resp_verb = 0;
                this.hcprc.signos.resp_moto = 0;
                this.hcprc.signos.vlr_glasg = 0;
                this.hcprc.signos.pvc = 0;
                this.hcprc.signos.oximetria = 0;
                this.hcprc.signos.per_abdo = 0;
                this.datoReaccionSecundaria();
              } else {
                this.datoGlasg1Ing();
              }
            })
            .catch(() => {
              this.datoTens2Ing();
            });
        }
      );
    },

    validacionesTens2_ing() {
      return new Promise((resolve, reject) => {
        if (this.hcprc.signos.tens1 > 0 && this.hcprc.signos.tens2 == 0 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.hcprc.signos.tens2 > 300) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        this.hcprc.signos.tens_media = Math.round(
          (parseFloat(this.hcprc.signos.tens1) + parseFloat(this.hcprc.signos.tens2) * 2) / 3
        );

        resolve();
      });
    },

    datoGlasg1Ing() {
      POPUP(
        {
          array: this.array_aper_ocul,
          titulo: "APERTURA OCULAR",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.hcprc.signos.aper_ocul.toString(),
          callback_f: () => this.datoFrIng(),
        },
        (data) => {
          this.hcprc.signos.aper_ocul = data.COD;
          setTimeout(() => {
            this.datoGlasg2Ing();
          }, 200);
        }
      );
    },

    datoGlasg2Ing() {
      POPUP(
        {
          array: this.array_resp_verb,
          titulo: "RESPUESTA VERBAL",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.hcprc.signos.resp_verb.toString(),
          callback_f: () => this.datoGlasg1Ing(),
        },
        (data) => {
          this.hcprc.signos.resp_verb = data.COD;
          setTimeout(() => {
            this.datoGlasg3Ing();
          }, 200);
        }
      );
    },

    datoGlasg3Ing() {
      POPUP(
        {
          array: this.array_resp_moto,
          titulo: "RESPUESTA MOTORA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.hcprc.signos.resp_moto.toString(),
          callback_f: () => this.datoGlasg2Ing(),
        },
        (data) => {
          this.hcprc.signos.resp_moto = data.COD;

          this.hcprc.signos.vlr_glasg =
            parseInt(this.hcprc.signos.aper_ocul) +
            parseInt(this.hcprc.signos.resp_verb) +
            parseInt(this.hcprc.signos.resp_moto);
          this.hcprc.signos.vlr_glasg = this.hcprc.signos.vlr_glasg.toString();
          setTimeout(() => {
            this.datoPvcIng();
          }, 200);
        }
      );
    },

    datoPvcIng() {
      validarInputs(
        {
          form: "#pvc_ing",
        },
        () => {
          this.datoFrIng();
        },
        () => {
          this.datoPerAbdoIng();
        }
      );
    },

    datoPerAbdoIng() {
      if (
        $_REG_HC.serv_hc == 08 ||
        ((this.nit_usu == 900005694 || this.nit_usu == 832002436) && $_REG_PACI.CRONICO == "S")
      ) {
        validarInputs(
          {
            form: "#per_abdo_ing",
          },
          () => {
            this.datoPvcIng();
          },
          () => {
            if (this.hcprc.signos.per_abdo == 0) {
              if (
                [832002436, 900306771, 844001287].includes(this.nit_usu) ||
                (this.nit_usu == 892000458 && $_REG_PACI.CRONICO == "S")
              ) {
                CON851("", "02", null, "error", "Error");
                this.datoPerAbdoIng();
              } else if (
                $_REG_HC.serv_hc == 08 &&
                $_REG_HC.edad_hc.unid_edad == "A" &&
                $_REG_HC.edad_hc.vlr_edad > 18 &&
                $_REG_PACI.CRONICO == "S"
              ) {
                CON851("", "02", null, "error", "Error");
                this.datoPerAbdoIng();
              } else {
                this.datoSatIng();
              }
            } else this.datoSatIng();
          }
        );
      } else {
        this.hcprc.signos.per_abdo = 0;
        this.datoSatIng();
      }
    },

    datoSatIng() {
      validarInputs(
        {
          form: "#oximetria_ing",
        },
        () => {
          this.datoPvcIng();
        },
        () => {
          this.datoComorbilidadVacuna();
        }
      );
    },

    datoComorbilidadVacuna() {
      if (!this.dato_9012.comorbilidad_vacuna.trim()) this.dato_9012.comorbilidad_vacuna = "S";
      validarInputs(
        {
          form: "#comorbilidad_vacuna",
        },
        () => {
          this.mostrarPantallaSignosIng();
        },
        () => {
          this.dato_9012.comorbilidad_vacuna = this.dato_9012.comorbilidad_vacuna.toUpperCase();
          if (this.dato_9012.comorbilidad_vacuna != "S") this.dato_9012.comorbilidad_vacuna = "N";

          if (this.dato_9012.comorbilidad_vacuna == "S") {
            this.mostrarComorbilidades = true;
            this.datoDiabetes();
          } else {
            this.dato_9012.comorbilidad_confirmada = {
              diabetes: "",
              enf_cardiovas: "",
              falla_renal: "",
              vih: "",
              cancer: "",
              enf_autoinmun: "",
              hipotiroid: "",
              cortico_inmuno: "",
              epoc_asma: "",
              mal_nutricion: "",
              fumadores: "",
            };
            this.datoReaccionSecundaria();
          }
        }
      );
    },

    datoDiabetes() {
      validarInputs(
        {
          form: "#diabetes",
        },
        () => {
          this.mostrarComorbilidades = false;
          this.datoComorbilidadVacuna();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.diabetes =
            this.dato_9012.comorbilidad_confirmada.diabetes.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.diabetes.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.diabetes = "N";
          this.datoEnfCardiovas();
        }
      );
    },

    datoEnfCardiovas() {
      validarInputs(
        {
          form: "#enf_cardiovas",
        },
        () => {
          this.datoDiabetes();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.enf_cardiovas =
            this.dato_9012.comorbilidad_confirmada.enf_cardiovas.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.enf_cardiovas.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.enf_cardiovas = "N";
          this.datoFallaRenal();
        }
      );
    },

    datoFallaRenal() {
      validarInputs(
        {
          form: "#falla_renal",
        },
        () => {
          this.datoEnfCardiovas();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.falla_renal =
            this.dato_9012.comorbilidad_confirmada.falla_renal.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.falla_renal.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.falla_renal = "N";
          this.datoVih();
        }
      );
    },

    datoVih() {
      validarInputs(
        {
          form: "#vih",
        },
        () => {
          this.datoFallaRenal();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.vih = this.dato_9012.comorbilidad_confirmada.vih.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.vih.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.vih = "N";
          this.datoCancer();
        }
      );
    },

    datoCancer() {
      validarInputs(
        {
          form: "#cancer",
        },
        () => {
          this.datoVih();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.cancer = this.dato_9012.comorbilidad_confirmada.cancer.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.cancer.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.cancer = "N";
          this.datoEnfAutoinmun();
        }
      );
    },

    datoEnfAutoinmun() {
      validarInputs(
        {
          form: "#enf_autoinmun",
        },
        () => {
          this.datoCancer();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.enf_autoinmun =
            this.dato_9012.comorbilidad_confirmada.enf_autoinmun.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.enf_autoinmun.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.enf_autoinmun = "N";
          this.datoHipotiroid();
        }
      );
    },

    datoHipotiroid() {
      validarInputs(
        {
          form: "#hipotiroid",
        },
        () => {
          this.datoEnfAutoinmun();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.hipotiroid =
            this.dato_9012.comorbilidad_confirmada.hipotiroid.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.hipotiroid.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.hipotiroid = "N";
          this.datoCorticoInmuno();
        }
      );
    },

    datoCorticoInmuno() {
      validarInputs(
        {
          form: "#cortico_inmuno",
        },
        () => {
          this.datoHipotiroid();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.cortico_inmuno =
            this.dato_9012.comorbilidad_confirmada.cortico_inmuno.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.cortico_inmuno.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.cortico_inmuno = "N";
          this.datoEpocAsma();
        }
      );
    },

    datoEpocAsma() {
      validarInputs(
        {
          form: "#epoc_asma",
        },
        () => {
          this.datoCorticoInmuno();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.epoc_asma =
            this.dato_9012.comorbilidad_confirmada.epoc_asma.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.epoc_asma.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.epoc_asma = "N";
          this.datoMalNutricion();
        }
      );
    },

    datoMalNutricion() {
      validarInputs(
        {
          form: "#mal_nutricion",
        },
        () => {
          this.datoEpocAsma();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.mal_nutricion =
            this.dato_9012.comorbilidad_confirmada.mal_nutricion.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.mal_nutricion.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.mal_nutricion = "N";
          this.datoFumadores();
        }
      );
    },

    datoFumadores() {
      validarInputs(
        {
          form: "#fumadores",
        },
        () => {
          this.datoMalNutricion();
        },
        () => {
          this.dato_9012.comorbilidad_confirmada.fumadores =
            this.dato_9012.comorbilidad_confirmada.fumadores.toUpperCase();
          if (this.dato_9012.comorbilidad_confirmada.fumadores.toUpperCase() != "S")
            this.dato_9012.comorbilidad_confirmada.fumadores = "N";

          this.mostrarComorbilidades = false;
          this.datoReaccionSecundaria();
        }
      );
    },

    datoReaccionSecundaria() {
      validarInputs(
        {
          form: "#reaccion_secund",
        },
        () => {
          this.datoComorbilidadVacuna();
        },
        () => {
          this.dato_9012.reaccion_secund = this.dato_9012.reaccion_secund.toUpperCase();
          if (this.dato_9012.reaccion_secund != "S") this.dato_9012.reaccion_secund = "N";

          if (this.dato_9012.reaccion_secund == "S") {
            this.mostrarTipoReaccion = true;
            this.datoEnrojecimiento();
          } else {
            this.dato_9012.tipo_reaccion = {
              enrojecimiento_tipo: "",
              prurito_tipo: "",
              erupcion_cuta_tipo: "",
              cefalea_tipo: "",
              fatiga_tipo: "",
              mialgias_tipo: "",
              lipotimia_tipo: "",
              ansiedad_tipo: "",
              rash_cutaneo_tipo: "",
              disnea_tipo: "",
              otros_tipo_reac: "",
            };
            this.mostrarPantallaSignosEgr();
          }
        }
      );
    },

    datoEnrojecimiento() {
      validarInputs(
        {
          form: "#enrojecimiento_tipo",
        },
        () => {
          this.mostrarTipoReaccion = false;
          this.datoReaccionSecundaria();
        },
        () => {
          this.dato_9012.tipo_reaccion.enrojecimiento_tipo =
            this.dato_9012.tipo_reaccion.enrojecimiento_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.enrojecimiento_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.enrojecimiento_tipo = "N";
          this.datoPrurito();
        }
      );
    },

    datoPrurito() {
      validarInputs(
        {
          form: "#prurito_tipo",
        },
        () => {
          this.datoEnrojecimiento();
        },
        () => {
          this.dato_9012.tipo_reaccion.prurito_tipo = this.dato_9012.tipo_reaccion.prurito_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.prurito_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.prurito_tipo = "N";
          this.datoErupcionCuta();
        }
      );
    },

    datoErupcionCuta() {
      validarInputs(
        {
          form: "#erupcion_cuta_tipo",
        },
        () => {
          this.datoPrurito();
        },
        () => {
          this.dato_9012.tipo_reaccion.erupcion_cuta_tipo =
            this.dato_9012.tipo_reaccion.erupcion_cuta_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.erupcion_cuta_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.erupcion_cuta_tipo = "N";
          this.datoCefalea();
        }
      );
    },

    datoCefalea() {
      validarInputs(
        {
          form: "#cefalea_tipo",
        },
        () => {
          this.datoErupcionCuta();
        },
        () => {
          this.dato_9012.tipo_reaccion.cefalea_tipo = this.dato_9012.tipo_reaccion.cefalea_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.cefalea_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.cefalea_tipo = "N";
          this.datoFatiga();
        }
      );
    },

    datoFatiga() {
      validarInputs(
        {
          form: "#fatiga_tipo",
        },
        () => {
          this.datoCefalea();
        },
        () => {
          this.dato_9012.tipo_reaccion.fatiga_tipo = this.dato_9012.tipo_reaccion.fatiga_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.fatiga_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.fatiga_tipo = "N";
          this.datoMialgias();
        }
      );
    },

    datoMialgias() {
      validarInputs(
        {
          form: "#mialgias_tipo",
        },
        () => {
          this.datoFatiga();
        },
        () => {
          this.dato_9012.tipo_reaccion.mialgias_tipo = this.dato_9012.tipo_reaccion.mialgias_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.mialgias_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.mialgias_tipo = "N";
          this.datoLipotimia();
        }
      );
    },

    datoLipotimia() {
      validarInputs(
        {
          form: "#lipotimia_tipo",
        },
        () => {
          this.datoMialgias();
        },
        () => {
          this.dato_9012.tipo_reaccion.lipotimia_tipo = this.dato_9012.tipo_reaccion.lipotimia_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.lipotimia_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.lipotimia_tipo = "N";
          this.datoAnsiedad();
        }
      );
    },

    datoAnsiedad() {
      validarInputs(
        {
          form: "#ansiedad_tipo",
        },
        () => {
          this.datoLipotimia();
        },
        () => {
          this.dato_9012.tipo_reaccion.ansiedad_tipo = this.dato_9012.tipo_reaccion.ansiedad_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.ansiedad_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.ansiedad_tipo = "N";
          this.datoRashCutaneo();
        }
      );
    },

    datoRashCutaneo() {
      validarInputs(
        {
          form: "#rash_cutaneo_tipo",
        },
        () => {
          this.datoAnsiedad();
        },
        () => {
          this.dato_9012.tipo_reaccion.rash_cutaneo_tipo = this.dato_9012.tipo_reaccion.rash_cutaneo_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.rash_cutaneo_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.rash_cutaneo_tipo = "N";
          this.datoDisneaTipo();
        }
      );
    },

    datoDisneaTipo() {
      validarInputs(
        {
          form: "#disnea_tipo",
        },
        () => {
          this.datoRashCutaneo();
        },
        () => {
          this.dato_9012.tipo_reaccion.disnea_tipo = this.dato_9012.tipo_reaccion.disnea_tipo.toUpperCase();
          if (this.dato_9012.tipo_reaccion.disnea_tipo.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.disnea_tipo = "N";
          this.datoOtrosTipoReac();
        }
      );
    },

    datoOtrosTipoReac() {
      validarInputs(
        {
          form: "#otros_tipo_reac",
        },
        () => {
          this.datoDisneaTipo();
        },
        () => {
          this.dato_9012.tipo_reaccion.otros_tipo_reac = this.dato_9012.tipo_reaccion.otros_tipo_reac.toUpperCase();
          if (this.dato_9012.tipo_reaccion.otros_tipo_reac.toUpperCase() != "S")
            this.dato_9012.tipo_reaccion.otros_tipo_reac = "N";
          this.mostrarTipoReaccion = false;
          this.datoOtroTipoReacc();
        }
      );
    },

    datoOtroTipoReacc() {
      if (this.dato_9012.tipo_reaccion.otros_tipo_reac == "S") {
        this.datoOtroTipoReacc();
      } else {
        this.dato_9012.otro_reaccion = "";
        this.mostrarPantallaSignosEgr();
      }
    },

    datoOtroTipoReacc() {
      if (this.dato_9012.tipo_reaccion.otros_tipo_reac == "S") {
        validarInputs(
          {
            form: "#otro_reaccion",
          },
          () => {
            this.datoReaccionSecundaria();
          },
          () => {
            this.dato_9012.otro_reaccion = this.dato_9012.otro_reaccion.toUpperCase().replaceEsp();
            if (!this.dato_9012.otro_reaccion) {
              CON851("", "02", null, "error", "Error");
              this.datoOtroTipoReacc();
            } else {
              this.mostrarPantallaSignosEgr();
            }
          }
        );
      } else {
        this.dato_9012.otro_reaccion = "";
        this.mostrarPantallaSignosEgr();
      }
    },

    mostrarPantallaSignosEgr() {
      if ([892000458, 892000264, 800037202].includes(this.nit_usu)) {
        this.dato_9012.signos = {
          und_peso: 0,
          peso: 0,
          talla: 0,
          imc_corp: 0,
          sup_corp: 0,
          temp: 0,
          fcard: 0,
          fresp: 0,
          tens1: 0,
          tens2: 0,
          tens_media: 0,
          oximetria: 0,
          pvc: 0,
          aper_ocul: 0,
          resp_verb: 0,
          resp_moto: 0,
          vlr_glasg: 0,
          per_abdo: 0,
        };
        this.datoObservacionVacuna();
      } else {
        if (this.dato_9012.signos.peso == 0 && this.dato_9012.signos.talla == 0) {
          this.dato_9012.signos.und_peso = this.hcprc.signos.und_peso;
          this.dato_9012.signos.peso = this.hcprc.signos.peso;
          this.dato_9012.signos.talla = this.hcprc.signos.talla;
        }
        this.datoPesoEgr();
      }
    },

    datoPesoEgr() {
      if ($_REG_HC.edad_hc.unid_edad == "D" || ($_REG_HC.edad_hc.unid_edad == "M" && $_REG_HC.edad_hc.vlr_edad < 3)) {
        this.dato_9012.signos.und_peso = 2;
      } else this.dato_9012.signos.und_peso = 1;

      validarInputs(
        {
          form: "#peso_egr",
        },
        () => {
          this.datoReaccionSecundaria();
        },
        () => {
          if (
            this.nit_usu == 800037021 &&
            this.medico.ATIENDE_PROF == 1 &&
            $_REG_HC.serv_hc == 02 &&
            this.dato_9012.signos.peso == 0
          ) {
            CON851("", "02", null, "error", "Error");
            this.datoPesoEgr();
          } else if (this.dato_9012.signos.peso == 0) {
            this.dato_9012.signos.peso = 0;
            this.dato_9012.signos.und_peso = 0;
            this.datoTallaEgr();
          } else {
            switch (parseInt(this.dato_9012.signos.und_peso)) {
              case 1:
                if (this.dato_9012.signos.peso < 2 || this.dato_9012.signos.peso > 300) {
                  CON851("", "03", null, "error", "Error");
                  this.datoPesoEgr();
                } else this.datoTallaEgr();
                break;
              case 2:
                if (this.dato_9012.signos.peso < 500 || this.dato_9012.signos.peso > 20000) {
                  CON851("", "03", null, "error", "Error");
                  this.datoPesoEgr();
                } else this.datoTallaEgr();
                break;
            }
          }
        }
      );
    },

    datoTallaEgr() {
      validarInputs(
        {
          form: "#talla_egr",
        },
        () => {
          this.datoPesoEgr();
        },
        () => {
          if (this.hcprc.signos.talla == 0 && this.hcprc.signos.peso == 0) {
            CON851("", "02", null, "error", "Error");
            this.datoTallaEgr();
          } else if (this.hcprc.signos.talla > 230) {
            CON851("", "03", null, "error", "Error");
            this.datoTallaEgr();
          } else this.calcularIndicesImcEgr();
        }
      );
    },

    calcularIndicesImcEgr() {
      if (this.dato_9012.signos.peso == 0 || this.dato_9012.signos.talla == 0) {
        this.dato_9012.signos.imc_corp = 0;
      } else {
        this.dato_9012.signos.imc_corp = Math.round(
          parseFloat(this.dato_9012.signos.peso) /
            ((parseFloat(this.dato_9012.signos.talla) / 100) ** 2).toFixed(2).toString().padStart(5, "0")
        );
      }

      if (this.dato_9012.signos.peso == 0 || this.dato_9012.signos.talla == 0) {
        this.dato_9012.signos.sup_corp = 0;
      } else {
        this.dato_9012.signos.sup_corp = Math.round(
          ((parseFloat(this.dato_9012.signos.peso) + parseFloat(this.dato_9012.signos.talla) - 60) / 100)
            .toFixed(2)
            .toString()
            .padStart(5, "0")
        );
      }

      if ($_REG_HC.edad_hc.unid_edad == "A" && $_REG_HC.edad_hc.vlr_edad > 15 && this.SW_EMBAR_W == "N") {
        if (this.dato_9012.signos.imc_corp >= 30) {
          CON851("", "BC", null, "warning", "Error");
        } else if (this.dato_9012.signos.imc_corp >= 25) {
          CON851("", "BB", null, "warning", "Error");
        } else if (this.dato_9012.signos.imc_corp < 16) {
          CON851("", "BE", null, "warning", "Error");
        } else if (this.dato_9012.signos.imc_corp <= 17) {
          CON851("", "BD", null, "warning", "Error");
        }
      }

      this.datoTempEgr();
    },

    datoTempEgr() {
      validarInputs(
        {
          form: "#temp_egr",
        },
        () => {
          this.datoTallaEgr();
        },
        () => {
          this.validacionesTemp_egr()
            .then(() => {
              this.datoFcEgr();
            })
            .catch(() => {
              this.datoTempEgr();
            });
        }
      );
    },

    validacionesTemp_egr() {
      return new Promise((resolve, reject) => {
        if (this.dato_9012.signos.temp == 0 && $_REG_HC.serv_hc != 02 && $_REG_HC.serv_hc != 63) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.dato_9012.signos.temp == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.dato_9012.signos.temp > 0 && (this.dato_9012.signos.temp < 35.5 || this.dato_9012.signos.temp > 38)) {
          CON851("", "BM", null, "warning", "Error");
        }

        if (this.dato_9012.signos.temp > 45) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoFcEgr() {
      validarInputs(
        {
          form: "#fcard_egr",
        },
        () => {
          this.datoTempEgr();
        },
        () => {
          this.validacionesFcard_egr()
            .then(() => {
              this.datoFrEgr();
            })
            .catch(() => {
              this.datoFcEgr();
            });
        }
      );
    },

    validacionesFcard_egr() {
      return new Promise((resolve, reject) => {
        if (this.dato_9012.signos.fcard == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.dato_9012.signos.fcard > 0) {
          if (
            $_REG_HC.edad_hc.unid_edad == "D" ||
            ($_REG_HC.edad_hc.unid_edad == "M" && $_REG_HC.edad_hc.vlr_edad < 3)
          ) {
            if (this.dato_9012.signos.fcard < 120 || this.dato_9012.signos.fcard > 160) {
              CON851("", "BK", null, "warning", "Error");
            }
          } else {
            if (
              $_REG_HC.edad_hc.unid_edad == "M" ||
              ($_REG_HC.edad_hc.unid_edad == "A" && $_REG_HC.edad_hc.vlr_edad < 5)
            ) {
              if (this.dato_9012.signos.fcard < 60 || this.dato_9012.signos.fcard > 100) {
                CON851("", "BK", null, "warning", "Error");
              }
            } else {
              if (this.dato_9012.signos.fcard < 60 || this.dato_9012.signos.fcard > 90) {
                CON851("", "BK", null, "warning", "Error");
              }
            }
          }
        }

        if (this.dato_9012.signos.fcard > 200) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoFrEgr() {
      validarInputs(
        {
          form: "#fresp_egr",
        },
        () => {
          this.datoFcEgr();
        },
        () => {
          this.validacionesFresp_egr()
            .then(() => {
              this.datoTens1Egr();
            })
            .catch(() => {
              this.datoFrEgr();
            });
        }
      );
    },

    validacionesFresp_egr() {
      return new Promise((resolve, reject) => {
        if (this.dato_9012.signos.fresp == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.dato_9012.signos.fresp > 0) {
          switch ($_REG_HC.edad_hc.unid_edad) {
            case "D":
              if (this.dato_9012.signos.fresp < 30 || this.dato_9012.signos.fresp > 60) {
                CON851("", "BL", null, "warning", "Error");
              }
              break;
            case "M":
              if ($_REG_HC.edad_hc.vlr_edad < 3) {
                if (this.dato_9012.signos.fresp < 30 || this.dato_9012.signos.fresp > 60) {
                  CON851("", "BL", null, "warning", "Error");
                }
              } else {
                if (this.dato_9012.signos.fresp < 20 || this.dato_9012.signos.fresp > 50) {
                  CON851("", "BL", null, "warning", "Error");
                }
              }
              break;
            case "A":
              if ($_REG_HC.edad_hc.vlr_edad < 5) {
                if (this.dato_9012.signos.fresp < 16 || this.dato_9012.signos.fresp > 40) {
                  CON851("", "BL", null, "warning", "Error");
                }
              } else {
                if (this.dato_9012.signos.fresp < 14 || this.dato_9012.signos.fresp > 30) {
                  CON851("", "BL", null, "warning", "Error");
                }
              }
              break;
          }
        }

        if (this.dato_9012.signos.fresp > 100) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoTens1Egr() {
      validarInputs(
        {
          form: "#tens1_egr",
        },
        () => {
          this.datoFrEgr();
        },
        () => {
          this.validacionesTens1_egr()
            .then(() => {
              this.datoTens2Egr();
            })
            .catch(() => {
              this.datoTens1Egr();
            });
        }
      );
    },

    validacionesTens1_egr() {
      return new Promise((resolve, reject) => {
        if ([1, 5, 7, "A", "H", "I", "O"].includes(this.medico.ATIENDE_PROF)) {
          // continue
        } else {
          if (this.dato_9012.signos.tens1 == 0 && $_REG_HC.serv_hc == 02 && this.nit_usu == 800037021) {
            CON851("", "02", null, "error", "Error");
            reject();
          }
        }

        if (this.dato_9012.signos.tens1 > 300) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        resolve();
      });
    },

    datoTens2Egr() {
      validarInputs(
        {
          form: "#tens2_egr",
        },
        () => {
          this.datoTens1Egr();
        },
        () => {
          this.validacionesTens2_egr()
            .then(() => {
              if ($_REG_HC.edad_hc.unid_edad == "D" || $_REG_HC.edad_hc.unid_edad == "M") {
                this.dato_9012.signos.aper_ocul = 0;
                this.dato_9012.signos.resp_verb = 0;
                this.dato_9012.signos.resp_moto = 0;
                this.dato_9012.signos.vlr_glasg = 0;
                this.datoPvcEgr();
              } else if (
                this.medico.TAB_ESPEC[0].COD == 521 ||
                this.medico.TAB_ESPEC[0].COD == 522 ||
                this.medico.TAB_ESPEC[1].COD == 521 ||
                this.medico.TAB_ESPEC[1].COD == 522
              ) {
                this.dato_9012.signos.aper_ocul = 0;
                this.dato_9012.signos.resp_verb = 0;
                this.dato_9012.signos.resp_moto = 0;
                this.dato_9012.signos.vlr_glasg = 0;
                this.dato_9012.signos.pvc = 0;
                this.dato_9012.signos.oximetria = 0;
                this.dato_9012.signos.per_abdo = 0;
                this.datoObservacionVacuna();
              } else {
                this.datoGlasg1Egr();
              }
            })
            .catch((error) => {
              console.log(error);
              this.datoTens2Egr();
            });
        }
      );
    },

    validacionesTens2_egr() {
      return new Promise((resolve, reject) => {
        if (this.dato_9012.signos.tens1 > 0 && this.dato_9012.signos.tens2 == 0 && this.nit_usu == 800037021) {
          CON851("", "02", null, "error", "Error");
          reject();
        }

        if (this.dato_9012.signos.tens2 > 300) {
          CON851("", "03", null, "error", "Error");
          reject();
        }

        this.dato_9012.signos.tens_media = Math.round(
          (parseFloat(this.dato_9012.signos.tens1) + parseFloat(this.dato_9012.signos.tens2) * 2) / 3
        );

        resolve();
      });
    },

    datoGlasg1Egr() {
      POPUP(
        {
          array: this.array_aper_ocul,
          titulo: "APERTURA OCULAR",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.dato_9012.signos.aper_ocul,
          callback_f: () => this.datoFrEgr(),
        },
        (data) => {
          this.dato_9012.signos.aper_ocul = data.COD;
          setTimeout(() => {
            this.datoGlasg2Egr();
          }, 200);
        }
      );
    },

    datoGlasg2Egr() {
      POPUP(
        {
          array: this.array_resp_verb,
          titulo: "RESPUESTA VERBAL",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.dato_9012.signos.resp_verb,
          callback_f: () => this.datoGlasg1Egr(),
        },
        (data) => {
          this.dato_9012.signos.resp_verb = data.COD;
          setTimeout(() => {
            this.datoGlasg3Egr();
          }, 200);
        }
      );
    },

    datoGlasg3Egr() {
      POPUP(
        {
          array: this.array_resp_moto,
          titulo: "RESPUESTA MOTORA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.dato_9012.signos.resp_moto,
          callback_f: () => this.datoGlasg2Egr(),
        },
        (data) => {
          this.dato_9012.signos.resp_moto = data.COD;

          this.dato_9012.signos.vlr_glasg =
            parseInt(this.dato_9012.signos.aper_ocul) +
            parseInt(this.dato_9012.signos.resp_verb) +
            parseInt(this.dato_9012.signos.resp_moto);
          this.dato_9012.signos.vlr_glasg = this.dato_9012.signos.vlr_glasg.toString();
          setTimeout(() => {
            this.datoPvcEgr();
          }, 200);
        }
      );
    },

    datoPvcEgr() {
      validarInputs(
        {
          form: "#pvc_egr",
        },
        () => {
          this.datoFrEgr();
        },
        () => {
          this.datoPerAbdoEgr();
        }
      );
    },

    datoPerAbdoEgr() {
      if (
        $_REG_HC.serv_hc == 08 ||
        ((this.nit_usu == 900005694 || this.nit_usu == 832002436) && $_REG_PACI.CRONICO == "S")
      ) {
        validarInputs(
          {
            form: "#per_abdo_egr",
          },
          () => {
            this.datoPvcEgr();
          },
          () => {
            if (this.dato_9012.signos.per_abdo == 0) {
              if (
                [832002436, 900306771, 844001287].includes(this.nit_usu) ||
                (this.nit_usu == 892000458 && $_REG_PACI.CRONICO == "S")
              ) {
                CON851("", "02", null, "error", "Error");
                this.datoPerAbdoEgr();
              } else if (
                $_REG_HC.serv_hc == 08 &&
                $_REG_HC.edad_hc.unid_edad == "A" &&
                $_REG_HC.edad_hc.vlr_edad > 18 &&
                $_REG_PACI.CRONICO == "S"
              ) {
                CON851("", "02", null, "error", "Error");
                this.datoPerAbdoEgr();
              } else {
                this.datoSatEgr();
              }
            } else this.datoSatEgr();
          }
        );
      } else {
        this.dato_9012.signos.per_abdo = 0;
        this.datoSatEgr();
      }
    },

    datoSatEgr() {
      validarInputs(
        {
          form: "#oximetria_egr",
        },
        () => {
          this.datoPvcEgr();
        },
        () => {
          this.datoObservacionVacuna();
        }
      );
    },

    datoObservacionVacuna() {
      validarInputs(
        {
          form: "#observacion_vacuna",
        },
        () => {
          this.datoPvcEgr();
        },
        () => {
          this.dato_9012.observacion_vacuna = this.dato_9012.observacion_vacuna.toUpperCase().replaceEsp();
          this.datoRecomendacionVacuna();
        }
      );
    },

    datoRecomendacionVacuna() {
      validarInputs(
        {
          form: "#recomendaciones",
        },
        () => {
          this.datoPvcEgr();
        },
        () => {
          this.dato_9012.datos_tabla_recom = this.dato_9012.datos_tabla_recom.toUpperCase().replaceEsp();
          this.saltoPag();
        }
      );
    },

    saltoPag() {
      if (!this.hcprc.motiv) {
        this.datoMotivo();
      } else {
        this.confirmar();
      }
    },

    confirmar() {
      CON851P("01", this.datoMotivo, this.grabarPag);
    },

    async grabarPag() {
      if (
        ($_REG_HC.serv > 02 && $_REG_HC.serv != 08 && $_REG_HC.serv != 63) ||
        ($_REG_HC.serv == 01 && this.hcprc.rips.observ == "S") ||
        ($_REG_HC.serv == 01 && this.hcprc.rips.estado_sal == 3) ||
        ($_REG_HC.serv == 01 && this.hcprc.rips.estado_sal == 4) ||
        ($_REG_HC.serv == 02 && this.hcprc.rips.observ == "S") ||
        ($_REG_HC.serv == 02 && this.hcprc.rips.estado_sal == 4)
      ) {
        this.hcprc.cierre.estado = 1;
      } else {
        this.hcprc.cierre.estado = 2;
        this.hcprc.cierre.egreso = $_REG_HC.fecha_hc;
        this.hcprc.cierre.hora_egres = moment().format("HHmm");
      }

      if (this.hcprc.cierre.estado == 2) {
        this.hcprc.cierre.fecha_ult_cierre = moment().format("YYYYMMDD");
        this.hcprc.cierre.hora_ult_cierre = moment().format("HHmm");
        this.hcprc.cierre.oper_ult_cierre = localStorage.Usuario;
        // liberar cama
      }

      this.hcprc.cierre.temporal = 0;
      this.hcprc.cierre.clase = 0;
      this.hcprc.esquema = "9012";

      let datos = _getObjetoSaveHc(this.hcprc, filtroArray.tablasHC);
      datos.datosh = datos.datosh + "1|";

      postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
        .then((data) => {
          this.grabarDetalles_9012();
        })
        .catch((error) => {
          CON851("", "Error en guardado de historia", null, "error", "Error");
          this.datoRecomendacionVacuna();
          console.log(error, "ERROR");
        });
    },

    async grabarDetalles_9012() {
      let detalles = {
        9012: _getObjetoSaveHc(this.dato_9012, []),
      };

      detalles["9012"] = {
        ...detalles["9012"],
        paso: this.params.paso.toString(),
      };

      console.log(detalles, "det");

      grabarDetalles(detalles, $_REG_HC.llave_hc)
        .then((data) => {
          CON851("", "Guardado correctamente", null, "success", "");
          switch (this.params.paso) {
            case 1:
              this.salir_final();
              break;
            case 2:
              this.actualizarRipsFactura();
              break;
            default:
              this.actualizarRipsFactura();
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error en guardado de detalles", null, "error", "");
          this.salir();
        });
    },

    actualizarRipsFactura() {
      var data = {};
      data["datosh"] = datosEnvio() + this.nro_ult_comp + "|";
      data["paso"] = "1";

      postData(data, get_url("APP/SALUD/SER448C.DLL"))
        .then((data) => {
          this.marcarCita();
        })
        .catch((error) => {
          console.error(error);
          this.marcarCita();
        });
    },

    marcarCita() {
      postData(
        {
          datosh: datosEnvio() + this.fecha_act + "|" + localStorage.IDUSU + "|" + $_REG_PACI.COD + "|",
        },
        get_url("APP/HICLIN/HC-101.DLL")
      )
        .then(this.salir_final)
        .catch((err) => {
          console.error(err);
          setTimeout(() => {
            this.salir_final();
          }, 300);
        });
    },

    salir() {
      this.flagSalir = true;
    },

    salir_final() {
      this.$emit("callback");
    },
  },

  template: /*html*/ `<transition name="modal_prosoft" v-if="params.estado">
    <div class="overlay_prosoft" v-if='params.paso == 2'>
        <div class="modal_prosoft" style="width: 97%;">
            <div class="container_prosoft">
                <div class="header_prosoft">
                    <div class="head-textarea" style="display: flex; justify-content: center;">
                        <div>
                            <label style="font-weight: bold; font-size: 15pt; padding-top: 8px;"> HISTORIA VACUNACIÓN COVID-19 (CORONAVIRUS) </label>
                        </div>
                    </div>
                </div>
                <div class="body_prosoft" style="padding-bottom: 5px;">
                    <div class="col-md-12 no-padding">
                        <div class="portlet light no-padding">
                            <div class="portlet-body">
                                <div class="form-horizontal">

                                    <div class="col-md-12">
                                        <div class="form-group col-md-12 box-center" style="padding-left: 14px;">
                    
                                            <div class="col-md-3 no-padding" id="fechaEnc">
                                                <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0;">
                                                    <label class="col-md-12">Año</label>
                                                    <div class="input-group col-md-12">
                                                        <input v-model="iniciales.ano" type="text" class="form-control col-md-12" maxlength="4" data-orden="1" required="true" style="text-align: center;" disabled="disabled">
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0;">
                                                    <label class="col-md-12">Mes</label>
                                                    <div class="input-group col-md-12">
                                                        <input v-model="iniciales.mes" type="text" class="form-control col-md-12" maxlength="2" data-orden="2" required="true" style="text-align: center;" disabled="disabled">
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0;">
                                                    <label class="col-md-12">Dia</label>
                                                    <div class="input-group col-md-12">
                                                        <input v-model="iniciales.dia" type="text" class="form-control col-md-12" maxlength="2" data-orden="3" required="true" style="text-align: center;" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>
                    
                                            <div class="col-md-2 no-padding" id="time">
                                                <div class="col-md-6" style="padding-left: 0;">
                                                    <label class="col-md-12">Hora</label>
                                                    <div class="input-group col-md-12">
                                                        <input v-model="iniciales.hr" type="text" class="form-control col-md-12" maxlength="4" data-orden="1" required="true" style="text-align: center;" disabled="disabled">
                                                    </div>
                                                </div>
                                                <div class="col-md-6" style="padding-left: 0;">
                                                    <label class="col-md-12">Min</label>
                                                    <div class="input-group col-md-12">
                                                        <input v-model="iniciales.mn" type="text" class="form-control col-md-12" maxlength="2" data-orden="2" required="true" style="text-align: center;" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>
                    
                                            <div class="col-md-4">
                                                <label class="col-md-12" style="text-align: center;">Medico</label>
                                                <div class="input-group col-md-12" id="validarMedico">
                                                    <div class="inline-inputs">
                                                        <input v-model="hcprc.med" type="text" class="form-control col-md-4 uppercase" maxlength="10" data-orden="1" style="text-align: center;" disabled="disabled">
                                                        <input v-model="hcprc.descrip_med" type="text" class="form-control col-md-8 uppercase" maxlength="10" data-orden="" style="text-align: center;" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-2">
                                                <label class="col-md-12">Consultando</label>
                                                <div class="input-group col-md-12">
                                                    <input v-model="hcprc.descrip_serv" type="text" class="form-control col-md-12 uppercase" maxlength="10" data-orden="1" style="text-align: center;" disabled="disabled">
                                                </div>
                                            </div>
                    
                                            <div class="col-md-1" style="padding-right: 0;">
                                                <label class="col-md-12">Folio</label>
                                                <div class="input-group col-md-12">
                                                    <input v-model="iniciales.folio" type="text" class="form-control col-md-12 uppercase" maxlength="10" data-orden="1" style="text-align: center;" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6" style="padding-right: 0;">
                                        <div class="form-group col-md-12 no-padding">
                                            <div class="col-md-12 box-center" id="motiv">
                                                <div class="col-md-12 head-box" style="display: flex; justify-content:space-between;">
                                                    <label>Motivo consulta</label>
                                                    <div>
                                                        <div class="tooltip-proft bottom-text" style="margin-left: 5px;">
                                                            <span class="icon-proft icon-info"></span>
                                                            <span class="tiptext">
                                                            <div>Con F3 pasa de un campo a otro.</div>
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea v-model="hcprc.motiv" class="form-control" rows="4" maxlength="240" data-orden="1" style="resize: none; text-align: justify" disabled="disabled"></textarea>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-6" style="padding-left: 0;">
                                                    <label class="col-md-5" style="background: 0; text-align: left;">Etapa de vacuna</label>
                                                    <div class="input-group col-md-7">
                                                        <input v-model="descrip_etapa_vacuna" type="text" class="form-control col-md-12 text-center" required="true" data-orden="1" disabled="disabled">
                                                    </div>
                                                </div>

                                                <div class="inline-inputs col-md-6 no-padding">
                                                    <label class="col-md-5" style="background: 0; text-align: left;">Tipo de vacuna</label>
                                                    <div class="input-group col-md-7">
                                                        <input v-model="descrip_tipo_vacuna" type="text" class="form-control col-md-12 text-center" required="true" data-orden="1" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-6" style="padding-left: 0;">
                                                    <label class="col-md-5" style="background: 0; text-align: left;">Número de Dosis</label>
                                                    <div class="input-group col-md-7">
                                                        <input v-model="descrip_nro_dosis" type="text" class="form-control col-md-12 text-center" required="true" data-orden="1" disabled="disabled">
                                                    </div>
                                                </div>

                                                <div class="inline-inputs col-md-6 no-padding" id="comorbilidad_vacuna">
                                                    <label class="col-md-8" style="background: 0; text-align: left;">Comorbilidades</label>
                                                    <div class="input-group col-md-4">
                                                        <input v-model="dato_9012.comorbilidad_vacuna" type="text" class="form-control col-md-12 text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;" id="reaccion_secund">
                                                <div class="inline-inputs col-md-12 no-padding" style="padding-right: 5px;">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">Presenta reacción secundaria a la administración de la vacuna</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.reaccion_secund" type="text" class="form-control col-md-12 text-center" data-orden="1" disabled="disabled" placeholder='N' maxlength="1">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;" id="otro_reaccion">
                                                <div class="inline-inputs col-md-12 no-padding" style="padding-right: 5px; padding-right: 9px;">
                                                    <label class="col-md-2" style="background: 0; text-align: left;">Otros</label>
                                                    <div class="input-group col-md-10">
                                                        <input v-model="dato_9012.otro_reaccion" type="text" class="form-control col-md-12 text-left" required="true" data-orden="1" maxlength="95" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;" id="observacion_vacuna">
                                                <div class="inline-inputs col-md-12 no-padding" style="padding-right: 5px; padding-right: 9px;">
                                                    <label class="col-md-2" style="background: 0; text-align: left;">Observación</label>
                                                    <div class="input-group col-md-10">
                                                        <input v-model="dato_9012.observacion_vacuna" type="text" class="form-control col-md-12 text-left" required="true" data-orden="1" maxlength="95" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" id="recomendaciones">
                                                <div class="col-md-12 head-box" style="display: flex; justify-content:space-between;">
                                                    <label>Recomendaciones</label>
                                                    <div>
                                                        <div class="tooltip-proft bottom-text" style="margin-left: 5px;">
                                                            <span class="icon-proft icon-info"></span>
                                                            <span class="tiptext">
                                                            <div>Con F3 pasa de un campo a otro.</div>
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea v-model="dato_9012.datos_tabla_recom" class="form-control" rows="4" maxlength="350" data-orden="1" style="resize: none; text-align: justify" disabled="disabled"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group col-md-12 box-center" style="text-align: left">
                                        
                                            <div class="col-md-12 head-box" style="padding-left: 12px;">
                                                <label>Signos Vitales de Ingreso</label>
                                            </div>

                                            <div class="col-md-12" style="padding-top: 9px; padding-right: 0;">
                                                <div class="col-md-12 no-padding">

                                                    <div class="col-md-12 no-padding" style="display: flex; justify-content: center;">

                                                        <div class="col-md-3 col-sm-3 col-xs-12" style="text-align: left;" id="peso_ing">
                                                            <label v-if="hcprc.signos.und_peso == 2">Peso (Gr)</label>
                                                            <label v-else>Peso (Kg)</label>
                                                            <div class="inline-inputs">
                                                                <div class="input-group col-md-12">
                                                                    <input v-model="hcprc.signos.peso" data-orden="1" type="number" maxlength="5" placeholder="Gr" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="talla_ing" class="col-md-3 col-sm-3 col-xs-12" style="text-align: left;">
                                                            <label>Estatura</label>
                                                            <div class="inline-inputs">
                                                                <div class="input-group col-md-12">
                                                                    <input v-model="hcprc.signos.talla" data-orden="1" type="number" maxlength="3" placeholder="Cm" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                            <label>IMC</label>
                                                            <div class="inline-inputs">
                                                                <input v-model="hcprc.signos.imc_corp" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                            <label>Sup C.</label>
                                                            <div class="inline-inputs">
                                                                <input v-model="hcprc.signos.sup_corp" class="form-control col-md-12" style="text-align: center; text-transform: lowercase !important;" disabled="disabled">
                                                            </div>
                                                        </div>

                                                        <div id="temp_ing" class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>Temp.</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.temp" data-orden="1" maxlength="5" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    </div>

                                                    <div class="salto-linea"></div>
                                                    <div class="col-md-12 no-padding" style="display: flex; justify-content: center;">
                                                    </div>
                                                    <div class="salto-linea"></div>

                                                    <div id="fcard_ing" class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>F.C</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.fcard" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="fresp_ing" class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>F.R</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.fresp" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                                        <label>Tensión arterial</label>
                                                        <div class="inline-inputs">
                                                            <div id="tens1_ing" class="input-group col-md-6 col-sm-6 col-xs-6">
                                                                <input v-model="hcprc.signos.tens1" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                            <div id="tens2_ing" class="input-group col-md-6 col-sm-6 col-xs-6">
                                                                <input v-model="hcprc.signos.tens2" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>TA media</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.tens_media" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="pvc_ing" class="col-md-2" style="text-align: left;">
                                                        <label>PVC</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.pvc" data-orden="1" type="number" maxlength="2" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="salto-linea"></div>
                                                    <div class="col-md-12 no-padding" style="display: flex; justify-content: center;">
                                                    </div>
                                                    <div class="salto-linea"></div>

                                                    <div id="per_abdo_ing" class="col-md-2" style="text-align: left;">
                                                        <label>P. Abdo</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.per_abdo" data-orden="1" type="text" maxlength="5" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="oximetria_ing" class="col-md-2" style="text-align: left;">
                                                        <label>Oximetria</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.oximetria" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Aper. Ocul</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.aper_ocul" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Resp. Verb</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.resp_verb" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Resp. Moto</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.resp_moto" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Vlr Glasg</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="hcprc.signos.vlr_glasg" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6" style="margin-top: 57px;">
                                        <div class="form-group col-md-12 box-center" style="text-align: left">
                                        
                                            <div class="col-md-12 head-box" style="padding-left: 12px;">
                                                <label>Signos Vitales de Egreso</label>
                                            </div>

                                            <div class="col-md-12" style="padding-top: 9px; padding-right: 0;">
                                                <div class="col-md-12 no-padding">

                                                    <div class="col-md-12 no-padding" style="display: flex; justify-content: center;">

                                                        <div class="col-md-3 col-sm-4 col-xs-12" style="text-align: left;" id="peso_egr">
                                                            <label v-if="dato_9012.signos.und_peso == 2">Peso (Gr)</label>
                                                            <label v-else>Peso (Kg)</label>
                                                            <div class="inline-inputs">
                                                                <div class="input-group col-md-12">
                                                                    <input v-model="dato_9012.signos.peso" data-orden="1" type="number" maxlength="5" placeholder="Gr" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="talla_egr" class="col-md-3 col-sm-4 col-xs-12" style="text-align: left;">
                                                            <label>Estatura</label>
                                                            <div class="inline-inputs">
                                                                <div class="input-group col-md-12">
                                                                    <input v-model="dato_9012.signos.talla" data-orden="1" type="number" maxlength="3" placeholder="Cm" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 col-sm-3 col-xs-12" style="text-align: left;">
                                                            <label>IMC</label>
                                                            <div class="inline-inputs">
                                                                <input v-model="dato_9012.signos.imc_corp" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 col-sm-3 col-xs-12" style="text-align: left;">
                                                            <label>Sup C.</label>
                                                            <div class="inline-inputs">
                                                                <input v-model="dato_9012.signos.sup_corp" class="form-control col-md-12" style="text-align: center; text-transform: lowercase !important;" disabled="disabled">
                                                            </div>
                                                        </div>

                                                        <div id="temp_egr" class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>Temp.</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.temp" data-orden="1" maxlength="5" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    </div>

                                                    <div class="salto-linea"></div>
                                                    <div class="col-md-12 no-padding" style="display: flex; justify-content: center;">
                                                    </div>
                                                    <div class="salto-linea"></div>

                                                    <div id="fcard_egr" class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>F.C</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.fcard" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="fresp_egr" class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>F.R</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.fresp" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                                        <label>Tensión arterial</label>
                                                        <div class="inline-inputs">
                                                            <div id="tens1_egr" class="input-group col-md-6 col-sm-6 col-xs-6">
                                                                <input v-model="dato_9012.signos.tens1" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                            <div id="tens2_egr" class="input-group col-md-6 col-sm-6 col-xs-6">
                                                                <input v-model="dato_9012.signos.tens2" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-12" style="text-align: left;">
                                                        <label>TA media</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.tens_media" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="pvc_egr" class="col-md-2" style="text-align: left;">
                                                        <label>PVC</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.pvc" data-orden="1" type="number" maxlength="2" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="salto-linea"></div>
                                                    <div class="col-md-12 no-padding" style="display: flex; justify-content: center;">
                                                    </div>
                                                    <div class="salto-linea"></div>

                                                    <div id="per_abdo_egr" class="col-md-2" style="text-align: left;">
                                                        <label>P. Abdo</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.per_abdo" data-orden="1" type="text" maxlength="5" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="oximetria_egr" class="col-md-2" style="text-align: left;">
                                                        <label>Oximetria</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.oximetria" data-orden="1" type="number" maxlength="3" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Aper. Ocul</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.aper_ocul" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Resp. Verb</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.resp_verb" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Resp. Moto</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.resp_moto" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2 col-sm-2 col-xs-2">
                                                        <label>Vlr Glasg</label>
                                                        <div class="inline-inputs">
                                                            <div class="input-group col-md-12">
                                                                <input v-model="dato_9012.signos.vlr_glasg" class="form-control col-md-12" style="text-align: center" disabled="disabled">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
              </div>

              <transition v-if="mostrarTipoReaccion">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="col-md-12 no-padding">
                            <div class="portlet light no-padding">
                                <div class="portlet-body">
                                    <div class="form-horizontal">
                                        <div class="col-md-3 box-center">
                                            <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center; padding: 2px;">
                                                <label style="font-size: 13pt">TIPO DE REACCIÓN</label>
                                            </div>
                    
                                            <div class="salto-linea"></div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="enrojecimiento_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">1. Enrojecimiento</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.enrojecimiento_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="prurito_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">2. Prurito</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.prurito_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="erupcion_cuta_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">3. Erupcion cutanea</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.erupcion_cuta_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="cefalea_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">4. Cefalea</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.cefalea_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="fatiga_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">5. Fatiga</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.fatiga_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="mialgias_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">6. Mialgias</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.mialgias_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="lipotimia_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">7. Lipotimia</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.lipotimia_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="ansiedad_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">8. Ansiedad</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.ansiedad_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="rash_cutaneo_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">9. Rash cutaneo</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.rash_cutaneo_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="disnea_tipo">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">10. Disnea</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.disnea_tipo" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="otros_tipo_reac">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">11. Otros</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.tipo_reaccion.otros_tipo_reac" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </transition>

              <transition v-if="mostrarComorbilidades">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="col-md-12 no-padding">
                            <div class="portlet light no-padding">
                                <div class="portlet-body">
                                    <div class="form-horizontal">
                                        <div class="col-md-4 box-center">
                                            <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center; padding: 2px;">
                                                <label style="font-size: 13pt">COMORBILIDADES EXISTENTES</label>
                                            </div>
                    
                                            <div class="salto-linea"></div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="diabetes">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">1. Diabetes</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.diabetes" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="enf_cardiovas">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">2. Enfermedad Cardiovascular (incluye HTA y ACV)</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.enf_cardiovas" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="falla_renal">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">3. Falla renal</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.falla_renal" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="vih">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">4. Vih u otra inmunodeficiencia</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.vih" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="cancer">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">5. Cancer</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.cancer" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="enf_autoinmun">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">6. Enfermedades autoinmunes</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.enf_autoinmun" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="hipotiroid">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">7. Hipotiroidismo</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.hipotiroid" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="cortico_inmuno">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">8. Uso de corticoides o inmunosupresores</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.cortico_inmuno" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="epoc_asma">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">9. EPOC y asma</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.epoc_asma" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="mal_nutricion">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">10. Mal nutrición (obesidad y desnutrición)</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.mal_nutricion" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="fumadores">
                                                    <label class="col-md-10" style="background: 0; text-align: left;">11. Fumadores</label>
                                                    <div class="input-group col-md-2">
                                                        <input v-model="dato_9012.comorbilidad_confirmada.fumadores" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </transition>
            </div>
        </div>
    </div>

    <div class="modal-mask" v-if='params.paso == 1'>
      <div class="modal-wrapper">
        <div class="modal-container col-lg-4 col-md-6 col-sm-10 col-xs-10">
          <div class="col-12 no-padding">
            <div class="portlet light box-center box-title">
              <div class="portlet-title">
                <div class="caption" style="width: 100%;">
                  <span class="caption-subject bold">
                    VACUNACIÓN COVID-19 (CORONAVIRUS)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 no-padding">
            <div class="col-md-12 box-center" style="display: flex;">
              <div class="inline-inputs col-md-12" id="vacunado">
                <label class="col-md-10" style="background: 0; text-align: left;">Esta vacunado contra COVID-19</label>
                <div class="input-group col-md-2">
                    <input v-model="dato_9012.vacunado_covid19" type="text" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="1" placeholder="N">
                </div>
              </div>
            </div>

            <div class="col-md-12 box-center" style="display: flex;">
              <div class="inline-inputs col-md-12">
                <label class="col-md-5" style="background: 0; text-align: left;">Etapa de vacuna</label>
                <div class="input-group col-md-7">
                    <input v-model="descrip_etapa_vacuna" type="text" class="form-control col-md-12 text-center" required="true" data-orden="1" disabled="disabled">
                </div>
              </div>
            </div>

            <div class="col-md-12 box-center" style="display: flex;">
              <div class="inline-inputs col-md-12">
                <label class="col-md-5" style="background: 0; text-align: left;">Tipo de vacuna</label>
                <div class="input-group col-md-7">
                    <input v-model="descrip_tipo_vacuna" type="text" class="form-control col-md-12 text-center" required="true" data-orden="1" disabled="disabled">
                </div>
              </div>
            </div>

            <div class="col-md-12 box-center" style="display: flex;">
                <div class="inline-inputs col-md-12">
                    <label class="col-md-5" style="background: 0; text-align: left;">Número de dosis</label>
                    <div class="input-group col-md-7">
                        <input v-model="descrip_nro_dosis" type="text" class="form-control col-md-12 text-center" required="true" data-orden="1" disabled="disabled">
                    </div>
                </div>
            </div>

            <div class="col-md-12 box-center" style="display: flex;">
                <div class="inline-inputs col-md-12">
                    <label class="col-md-5" style="background: 0; text-align: left;">Fecha vacuna</label>
                    <div class="col-md-7 no-padding" id="fecha_vacunacion">
                      <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0;">
                          <label class="col-md-12 no-padding" style="background: 0;">Año</label>
                          <div class="input-group col-md-12">
                              <input v-model="fecha_vacunacion.ano_w" type="text" class="form-control col-md-12" maxlength="4" data-orden="1" required="true" style="text-align: center;" disabled="disabled">
                          </div>
                      </div>
                      <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0;">
                          <label class="col-md-12 no-padding" style="background: 0;">Mes</label>
                          <div class="input-group col-md-12">
                              <input v-model="fecha_vacunacion.mes_w" type="text" class="form-control col-md-12" maxlength="2" data-orden="2" required="true" style="text-align: center;" disabled="disabled">
                          </div>
                      </div>
                      <div class="col-md-4 col-sm-4 col-xs-4" style="padding-left: 0;">
                          <label class="col-md-12 no-padding" style="background: 0;">Dia</label>
                          <div class="input-group col-md-12">
                              <input v-model="fecha_vacunacion.dia_w" type="text" class="form-control col-md-12" maxlength="2" data-orden="3" required="true" style="text-align: center;" disabled="disabled">
                          </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>`,
});
