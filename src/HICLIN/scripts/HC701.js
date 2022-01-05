// CREACION - DAVID.M - AGOSTO 2020

new Vue({
  el: "#HC701",
  data: {
    _historiaAper: [],
    _profesionales: [],
    _tipoMacro: [],
    _codigos: [],
    _detalles: [],
    datosIni: {
      añoEnc_701: "",
      mesEnc_701: "",
      diaEnc_701: "",
      hr_701: "",
      mn_701: "",
      medico_HC701: "",
      descripMedico_HC701: "",
      consultando_HC701: "",
      proceder_701: "",
      motivo1_701: "",
      motivo2_701: "",
      clase_701: "",
      folio_701: "",
    },
    llave_hc: $_REG_HC.llave_hc,
    form: {
      aper_HC701: "",
      evo_HC701: "",
      notasEnf_HC701: "",
      notasTer_HC701: "",
      formuMed_HC701: "",
      solicLab_HC701: "",
      solicImag_HC701: "",
      solicOrdMd_HC701: "",
      solicConsul_HC701: "",
      incapMed_HC701: "",
      agrupar_HC701: "",
      añoInicial_701: "",
      mesInicial_701: "",
      diaInicial_701: "",
      añoFinal_701: "",
      mesFinal_701: "",
      diaFinal_701: "",
      macro_HC701: "",
      descripMacro_HC701: "",
      codigo_HC701: "",
      descripCodigo_HC701: "",
      tabla_diag: [],
    },
    fecha_act: moment().format("YYYYMMDD"),
    dataArray: new Object(),
    data_evo: new Object(),
    opcionesHC701: {},
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    $this = this;
    await this._cargarArchivos_HCI02();
  },
  methods: {
    async iniciarHC701() {
      this.llenarDatos();

      await this.validarAperHC701();
    },
    async llenarDatos() {
      $this.enf_act_hc = $this._detalles.find((e) => e["COD-DETHC"] == "1001" && e["LLAVE-HC"] == $_REG_HC.llave_hc);
      if ($this.enf_act_hc != undefined) {
        $this.enf_act_hc = $this.enf_act_hc.DETALLE;
        $this.enf_act_hc = $this.enf_act_hc.replace(/\&/g, "\n").trim();
        $this.enf_act_hc = $this.enf_act_hc.replace(/\�/g, "Ñ");
      }

      this.datosIni.añoEnc_701 = this._hcprc.fecha.substring(0, 4);
      this.datosIni.mesEnc_701 = this._hcprc.fecha.substring(4, 6);
      this.datosIni.diaEnc_701 = this._hcprc.fecha.substring(6, 8);

      this.datosIni.hr_701 = this._hcprc.hora.substring(0, 2);
      this.datosIni.mn_701 = this._hcprc.hora.substring(2, 4);

      this.datosIni.medico_HC701 = this._hcprc.med;
      this.datosIni.descripMedico_HC701 = this._hcprc.descrip_med.replace(/\�/g, "Ñ");

      this.datosIni.consultando_HC701 = this._hcprc.cierre.descrip_unserv;

      this.form.tabla_diag = this._hcprc.rips.tabla_diag;

      document.querySelector(".proceder_701").innerHTML = this._hcprc.proceden.toUpperCase();
      document.querySelector(".motivo1_701").innerHTML = this._hcprc.motivo.toUpperCase();

      if (this.enf_act_hc) document.querySelector(".enferAct_701").innerHTML = this.enf_act_hc.toUpperCase();

      document.querySelector(".clase_701").innerHTML = this._hcprc.cierre.clase;
      document.querySelector(".folio_701").innerHTML = this._hcprc.llave.substring(15, 23);
    },
    validarAperHC701() {
      if ($this._hcprc.novedad == "7") {
        $this.form.aper_HC701 = "N";
        $this.validarEvoHC701();
      } else {
        validarInputs(
          {
            form: "#validarAper_701",
            orden: "1",
          },
          () => {
            _regresar_menuhis();
          },
          () => {
            $this.form.aper_HC701 = $this.form.aper_HC701.toUpperCase() == "S" ? "S" : "N";
            $this.validarEvoHC701();
          }
        );
      }
    },
    validarEvoHC701() {
      validarInputs(
        {
          form: "#validarEvo_701",
          orden: "1",
        },
        () => {
          if ($this._hcprc.novedad == "7") {
            _regresar_menuhis();
          } else {
            $this.validarAperHC701();
          }
        },
        () => {
          $this.form.evo_HC701 = $this.form.evo_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarNotasEnfHC701();
        }
      );
    },
    validarNotasEnfHC701() {
      validarInputs(
        {
          form: "#validarNotasEnf_701",
        },
        () => {
          $this.validarEvoHC701();
        },
        () => {
          $this.form.notasEnf_HC701 = $this.form.notasEnf_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarNotasTerHC701();
        }
      );
    },
    validarNotasTerHC701() {
      validarInputs(
        {
          form: "#validarNotasTer_701",
        },
        () => {
          $this.validarNotasEnfHC701();
        },
        () => {
          $this.form.notasTer_HC701 = $this.form.notasTer_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarFormuMedHC701();
        }
      );
    },
    validarFormuMedHC701() {
      validarInputs(
        {
          form: "#validarFormuMed_701",
        },
        () => {
          $this.validarNotasTerHC701();
        },
        () => {
          $this.form.formuMed_HC701 = $this.form.formuMed_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicLabHC701();
        }
      );
    },
    validarSolicLabHC701() {
      validarInputs(
        {
          form: "#validarSolicLab_701",
        },
        () => {
          $this.validarFormuMedHC701();
        },
        () => {
          $this.form.solicLab_HC701 = $this.form.solicLab_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicImagHC701();
        }
      );
    },
    validarSolicImagHC701() {
      validarInputs(
        {
          form: "#validarSolicImag_701",
        },
        () => {
          $this.validarSolicLabHC701();
        },
        () => {
          $this.form.solicImag_HC701 = $this.form.solicImag_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicOrdMdHC701();
        }
      );
    },
    validarSolicOrdMdHC701() {
      validarInputs(
        {
          form: "#validarSolicOrdMd_701",
        },
        () => {
          $this.validarSolicImagHC701();
        },
        () => {
          $this.form.solicOrdMd_HC701 = $this.form.solicOrdMd_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicConsulHC701();
        }
      );
    },
    validarSolicConsulHC701() {
      validarInputs(
        {
          form: "#validarSolicConsul_701",
        },
        () => {
          $this.validarSolicOrdMdHC701();
        },
        () => {
          $this.form.solicConsul_HC701 = $this.form.solicConsul_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.validarIncapMedHC701();
        }
      );
    },
    validarIncapMedHC701() {
      validarInputs(
        {
          form: "#validarIncapMed_701",
        },
        () => {
          $this.validarSolicConsulHC701();
        },
        () => {
          $this.form.incapMed_HC701 = $this.form.incapMed_HC701.toUpperCase() == "S" ? "S" : "N";
          var incap = $this.form.incapMed_HC701.toUpperCase();
          if (
            $this.form.aper_HC701.toUpperCase() == "N" &&
            $this.form.evo_HC701.toUpperCase() == "N" &&
            $this.form.notasEnf_HC701.toUpperCase() == "N" &&
            $this.form.notasTer_HC701.toUpperCase() == "N" &&
            $this.form.formuMed_HC701.toUpperCase() == "N" &&
            $this.form.solicLab_HC701.toUpperCase() == "N" &&
            $this.form.solicOrdMd_HC701.toUpperCase() == "N" &&
            $this.form.solicConsul_HC701.toUpperCase() == "N" &&
            $this.form.incapMed_HC701.toUpperCase() == "S"
          ) {
            validar2(incap);
          } else {
            if (incap == "N") {
              validar2(incap);
            } else {
              CON851("G2", "G2", null, "error", "error");
              $this.validarIncapMedHC701();
            }
          }

          function validar2(incap) {
            if (incap == "") {
              CON851("03", "03", null, "error", "error");
              $this.validarIncapMedHC701();
            } else {
              if (incap != "N" && incap != "S") {
                CON851("03", "03", null, "error", "error");
                $this.validarIncapMedHC701();
              } else {
                $this.validarAgruparHC701();
              }
            }
          }
        }
      );
    },
    validarAgruparHC701() {
      validarInputs(
        {
          form: "#validarAgrupar_701",
          orden: "1",
        },
        () => {
          $this.validarIncapMedHC701();
        },
        () => {
          $this.form.agrupar_HC701 = $this.form.agrupar_HC701.toUpperCase() == "S" ? "S" : "N";
          $this.llenarFechas();
        }
      );
    },
    llenarFechas() {
      $this.form.añoInicial_701 = this._hcprc.fecha.substring(0, 4);
      $this.form.mesInicial_701 = this._hcprc.fecha.substring(4, 6);
      $this.form.diaInicial_701 = this._hcprc.fecha.substring(6, 8);

      $this.form.añoFinal_701 = this.fecha_act.substring(0, 4);
      $this.form.mesFinal_701 = this.fecha_act.substring(4, 6);
      $this.form.diaFinal_701 = this.fecha_act.substring(6, 8);

      $this.validarFechaInicialHC701("1");
    },
    validarFechaInicialHC701(orden) {
      setTimeout(() => {
        validarInputs(
          {
            form: "#fechaInicial_701",
            orden: orden,
          },
          () => {
            $this.validarAgruparHC701();
          },
          () => {
            $this.form.diaInicial_701 = cerosIzq($this.form.diaInicial_701, 2);
            $this.form.mesInicial_701 = cerosIzq($this.form.mesInicial_701, 2);
            $this.fechaInicial = $this.form.añoInicial_701 + $this.form.mesInicial_701 + $this.form.diaInicial_701;
            var diaIni = parseFloat($this.form.diaInicial_701);
            var mesIni = parseFloat($this.form.mesInicial_701);
            var añoIni = parseFloat($this.form.añoInicial_701);
            if (parseInt(añoIni) < 2000) {
              CON851("37", "37", null, "error", "error");
              $this.validarFechaInicialHC701("1");
            } else {
              if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
                CON851("37", "37", null, "error", "error");
                $this.validarFechaInicialHC701("3");
              } else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
                CON851("37", "37", null, "error", "error");
                $this.validarFechaInicialHC701("2");
              } else {
                $this.validarFechaFinalHC701("1");
              }
            }
          }
        );
      }, 200);
    },
    validarFechaFinalHC701(orden) {
      validarInputs(
        {
          form: "#fechaFinal_701",
          orden: orden,
        },
        () => {
          $this.validarFechaInicialHC701("1");
        },
        () => {
          $this.form.diaFinal_701 = cerosIzq($this.form.diaFinal_701, 2);
          $this.form.mesFinal_701 = cerosIzq($this.form.mesFinal_701, 2);
          $this.fechaFinal = $this.form.añoFinal_701 + $this.form.mesFinal_701 + $this.form.diaFinal_701;
          var diaFin = parseFloat($this.form.diaFinal_701);
          var mesFin = parseFloat($this.form.mesFinal_701);
          var añoFin = parseFloat($this.form.añoFinal_701);
          if (parseInt(añoFin) < 1900) {
            CON851("37", "37", null, "error", "error");
            $this.validarFechaFinalHC701("1");
          } else {
            if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
              CON851("37", "37", null, "error", "error");
              $this.validarFechaFinalHC701("3");
            } else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
              CON851("37", "37", null, "error", "error");
              $this.validarFechaFinalHC701("2");
            } else if ($this.fechaFinal < $this.fechaInicial) {
              CON851("03", "Fecha de vencimiento debe ser mayor", null, "error", "error");
              $this.validarFechaFinalHC701("2");
            } else {
              $this.validarTipoMacroHC701();
            }
          }
        }
      );
    },
    validarTipoMacroHC701() {
      this.form.macro_HC701 == "" ? (this.form.macro_HC701 = "0") : false;
      validarInputs(
        {
          form: "#validarMacro_701",
          orden: "1",
        },
        () => {
          setTimeout(() => {
            $this.validarFechaFinalHC701("1");
          }, 200);
        },
        () => {
          var macro = $this.form.macro_HC701;
          const res = $this._tipoMacro.find((e) => e.CODIGO.trim() == macro);
          if (macro == "0") {
            $this.form.descripMacro_HC701 = "";
            $this._depurarImpresion();
          } else {
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              $this.validarTipoMacroHC701();
            } else {
              $this.form.descripMacro_HC701 = res.DESCRIP;
              $this.validarCodigoHC701();
            }
          }
        }
      );
    },
    validarCodigoHC701() {
      validarInputs(
        {
          form: "#validarCodigo_701",
          orden: "1",
        },
        () => {
          setTimeout(() => {
            $this.validarTipoMacroHC701();
          }, 250);
        },
        () => {
          var codigo = $this.form.codigo_HC701;
          const res = $this._codigos.find((e) => e.CODIGO.trim() == codigo);
          if (res == undefined) {
            CON851("01", "01", null, "error", "error");
            $this.validarCodigoHC701();
          } else {
            $this.form.descripCodigo_HC701 = res.DESCRIP;
            $this._depurarImpresion();
          }
        }
      );
    },
    _depurarImpresion() {
      this.crearJsonOpc();
      this._ordenImprimir();
    },
    _ventanaTipoMacroHC701() {
      _ventanaDatos({
        titulo: "TIPO DE MACRO",
        columnas: ["CODIGO", "DESCRIP"],
        data: $this._tipoMacro,
        callback_esc: function () {
          document.querySelector(".macro_HC701").focus();
        },
        callback: function (data) {
          $this.form.macro_HC701 = data.CODIGO.trim();
          _enterInput(".macro_HC701");
        },
      });
    },
    _ventanaCodigosHC701() {
      _ventanaDatos({
        titulo: "VENTANA MACROS PARA EVOLUCION TIPO 1",
        columnas: ["CLASE", "CODIGO", "DETALLE"],
        data: $this._codigos,
        callback_esc: function () {
          document.querySelector(".codigo_HC701").focus();
        },
        callback: function (data) {
          $this.form.codigo_HC701 = data.CODIGO.trim();
          _enterInput(".codigo_HC701");
        },
      });
    },
    async _ordenImprimir() {
      inicializarFormatoBase_impHc();

      loader("show");

      if (
        this.form.evo_HC701.toUpperCase() == "S" ||
        this.form.notasEnf_HC701.toUpperCase() == "S" ||
        this.form.notasTer_HC701.toUpperCase() == "S" ||
        this.form.formuMed_HC701.toUpperCase() == "S" ||
        this.form.solicLab_HC701.toUpperCase() == "S" ||
        this.form.solicOrdMd_HC701.toUpperCase() == "S" ||
        this.form.solicConsul_HC701.toUpperCase() == "S"
      ) {
        await this._cargarTodasEvo();
      }

      if ($this._hcprc.edad.substring(0, 1) == "A" && parseFloat($this._hcprc.edad.substring(1, 4)) > 18) {
        $this.SW_CRECIM = 0;
      } else {
        if ($this.SW_CRECIM == 0) {
          for (var i in $this.todasEvo) {
            if ($this.todasEvo[i].TIPO == "P") {
              $this.SW_CRECIM = 1;
            }
          }
        }
        if ($this.SW_CRECIM == 1) {
          await this._iniciar_PYP1I();
        }
      }
      // IMPRESION CLAP
      await this._iniciar_CLAP();

      if (this.form.aper_HC701.toUpperCase() == "N" && this.form.agrupar_HC701.toUpperCase() == "S") {
        header71Opcional($_USUA_GLOBAL[0].NIT, $this._hcprc);
      }

      if (this.form.aper_HC701.toUpperCase() == "S" || this.form.agrupar_HC701.toUpperCase() == "S") {
        await this._imprimirHistoria();
      } else {
        if (
          this.form.aper_HC701.toUpperCase() == "N" &&
          this.form.formuMed_HC701.toUpperCase() == "S" &&
          this.form.solicLab_HC701.toUpperCase() == "S" &&
          this.form.solicImag_HC701.toUpperCase() &&
          this.form.solicOrdMd_HC701.toUpperCase() &&
          this.form.incapMed_HC701.toUpperCase() == "S"
        ) {
          await this._imprimirHistoria();
        }
      }

      if (
        this.form.evo_HC701.toUpperCase() == "S" ||
        $this.form.notasEnf_HC701.toUpperCase() == "S" ||
        $this.form.notasTer_HC701.toUpperCase() == "S" ||
        $this.form.formuMed_HC701.toUpperCase() == "S" ||
        $this.form.solicLab_HC701.toUpperCase() == "S" ||
        $this.form.solicOrdMd_HC701.toUpperCase() == "S" ||
        $this.form.solicConsul_HC701.toUpperCase() == "S"
      ) {
        await this.llamarHCI02();
      }

      if (
        $this.form.aper_HC701.toUpperCase() == "N" &&
        $this.form.evo_HC701.toUpperCase() == "N" &&
        $this.form.notasEnf_HC701.toUpperCase() == "N" &&
        $this.form.notasTer_HC701.toUpperCase() == "N" &&
        $this.form.formuMed_HC701.toUpperCase() == "N" &&
        $this.form.solicLab_HC701.toUpperCase() == "N" &&
        $this.form.solicOrdMd_HC701.toUpperCase() == "N" &&
        $this.form.solicConsul_HC701.toUpperCase() == "N" &&
        $this.form.incapMed_HC701.toUpperCase() == "S"
      ) {
        await this.llamarHCI02();
      }

      // IMPRIME DATO-9010 - VALE
      await this.llamar_HCI9010();

      // IMPRIME DATO-9011 - APGAR
      await this.llamar_HCI9011();

      // IMPRIME DATO-9007 - AUTISMO
      await this.llamar_HCI9007();

      // PYP2
      if ((this._hcprc.esquema == "AI01" || this._hcprc.esquema == "AI02") && this._hcprc.serv == "08") {
        await this.llamar_PYP2();
      }

      if ($this.form.agrupar_HC701.toUpperCase() == "S" && formatoBaseImp_Hc.content[0].stack.length > 0) {
        await this.llenarEgreso_HC701();

        await _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
          content: formatoBaseImp_Hc,
        }).catch((err) => {
          console.error(err);
        });
      }

      if (formatoBaseImp_Hc.content[0].stack.length > 0) toastr.success("Impresion/es cargadas correctamente");

      loader("hide");
      _regresar_menuhis();
    },

    llenarEgreso_HC701() {
      const { iniciar_HCI01C } = require("../../HICLIN/scripts/HCI01C");

      return new Promise((resolve) => {
        iniciar_HCI01C({
          hcprc: this._hcprc,
          callback: resolve,
        });
      });
    },

    async _imprimirHistoria() {
      switch (this._hcprc.esquema) {
        case "8001":
          await this.llamar_HCI8001();
          break;
        case "8002":
          await this._iniciar_HCI8002();
          break;
        case "8031":
          await this.llamar_HCI8031();
          break;
        case "AI02":
          await this.llamarAIEPI020();
          break;
        case "AI01":
          await this.llamarAIEPI010();
          break;
        case "9004":
          _regresar_menuhis();
          break;
        case "9012":
          await this.llamar_HCI9012();
          break;
        case "8051":
          await this.llamar_HCI8051();
          break;
        default:
          await this.llamarHCI01();
          break;
      }
    },

    async _iniciar_PYP1I() {
      var params = {
        id: " 71",
        descrip: "Impresión PYP",
        dll: `HICLIN\\PYP1I`,
        callback: () => {
          console.log("TERMINA LLAMADO");
        },
      };
      this._imprimirPagina_701(params);
    },

    async _iniciar_CLAP() {
      var llegada = [];
      await postData(
        {
          datosh: datosEnvio() + $this._hcprc.llave.substring(0, 15) + "|" + $this._hcprc.fecha,
        },
        get_url("APP/HICLIN/BUSQ-CLAP.DLL")
      )
        .then((data) => {
          llegada = data.split("|");
        })
        .catch((err) => {
          console.log(err, "err");
        });

      if (llegada[0] == "2") {
        var params = {
          id: " 71",
          descrip: "Impresión CLAP",
          dll: `HICLIN\\CLAPI001`,
          callback: () => {
            console.log("TERMINA LLAMADO");
          },
        };
        var datos = `${llegada[1] + $this._hcprc.fecha}`;
        this._imprimirPagina_701(params, datos);
      }
    },

    async llamar_HCI9010() {
      await this.traerHistoriaClinica().then(() => {
        iniciar_HCI9010( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
      });
    },

    async llamar_HCI9011() {
      await this.traerHistoriaClinica().then(() => {
        iniciar_HCI9011( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
      });
    },

    async llamar_HCI9007() {
      await this.traerHistoriaClinica().then(() => {
        iniciar_HCI9007( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
      });
    },

    async _iniciar_HCI8001() {
      var params = {
        id: " 71",
        descrip: "Impresión Citologia",
        dll: `HICLIN\\HCI8001`,
        callback: () => {
          console.log("TERMINA LLAMADO");
        },
      };
      var datos = this.retornarEnvioRm_701();
      this._imprimirPagina_701(params, datos);
    },

    async _iniciar_HCI8002() {
      await _iniciarHCI8002($this.opcionesHC701, $this.arrayDatos);
    },

    async llamar_HCI8031() {
      // if ($this.form.aper_HC701 == "S") {
      //   await _iniciar_HCI8031($this.opcionesHC701, $this.arrayDatos);
      // }
      await _iniciar_HCI8031($this.opcionesHC701, $this.arrayDatos);
      // var params = {
      //   id: " 71",
      //   descrip: "Impresion Historia Planificación Familiar",
      //   dll: `HICLIN\\HCI8031`,
      //   callback: () => {
      //     console.log("TERMINA LLAMADO");
      //   },
      // };
      // var datos = this.retornarEnvioRm_701();
      // this._imprimirPagina_701(params, datos);
    },

    async _iniciar_HCI8051() {
      var params = {
        id: " 71",
        descrip: "Impresion Historia del Adolescente",
        dll: `HICLIN\\HCI8051`,
        callback: () => {
          console.log("TERMINA LLAMADO");
        },
      };
      var datos = this.retornarEnvioRm_701();
      this._imprimirPagina_701(params, datos);
    },

    async llamarAIEPI020() {
      if ($this.form.aper_HC701 == "S") {
        await iniciar_AIEPI020($this.opcionesHC701, $this.arrayDatos);
      }
    },

    retornarEnvioRm_701() {
      var extra = "";
      extra += $this.form.aper_HC701.toUpperCase();
      extra += $this.form.evo_HC701.toUpperCase();
      extra += $this.form.notasEnf_HC701.toUpperCase();
      extra += $this.form.notasTer_HC701.toUpperCase();
      extra += $this.form.formuMed_HC701.toUpperCase();
      extra += $this.form.solicLab_HC701.toUpperCase();
      extra += $this.form.solicImag_HC701.toUpperCase();
      extra += $this.form.solicOrdMd_HC701.toUpperCase();
      extra += $this.form.solicConsul_HC701.toUpperCase();
      extra += $this.form.incapMed_HC701.toUpperCase();
      extra += $this.form.agrupar_HC701.toUpperCase();
      extra += "00";
      extra += cerosIzq($this.form.macro_HC701 + $this.form.codigo_HC701, 7);
      extra += cerosIzq($this.form.añoInicial_701 + $this.form.mesInicial_701 + $this.form.diaInicial_701, 8);
      extra += cerosIzq($this.form.añoFinal_701 + $this.form.mesFinal_701 + $this.form.diaFinal_701, 8);
      extra += "99";

      return extra;
    },

    llamarHCI_8031() {
      _iniciarHCI_8031();
    },

    // ------- IMPRIME HISTORIA CLINICA NORMAL (PRINCIPAL) ------
    async llamarHCI01() {
      if ($this.form.aper_HC701 == "S") {
        await this.traerHistoriaClinica().then(async () => {
          await _iniciarHCI01($this.opcionesHC701, {
            ...$this.arrayDatos,
            hcprc_new: this._hcprc2,
          });
        });
      }
    },

    async llamarAIEPI010() {
      if ($this.form.aper_HC701 == "S") {
        await iniciar_AIEPI010($this.opcionesHC701, $this.arrayDatos);
      }
    },

    async llamar_HCI8001() {
      await iniciar_HCI8001($this.opcionesHC701, $this.arrayDatos);
    },

    async llamar_HCI9012() {
      await _iniciarHCI9012($this.opcionesHC701, $this.arrayDatos);
    },

    async llamar_HCI8051() {
      const { imprimir_HCI8051 } = require("../../frameworks/pdf/hiclin/HCI-8051.formato");

      await this.traerHistoriaClinica().then(() => {
        imprimir_HCI8051({
          opciones: this.opcionesHC701,
          hcprc: this._hcprc2,
          detalles: this._detalles,
          paci: $_REG_PACI,
        });
      });
    },

    async llamar_PYP2() {
      const { imprimir_PYP2I } = require("../../frameworks/pdf/hiclin/PYP2I.formato");

      await this.traerHistoriaClinica().then(() => {
        imprimir_PYP2I({
          hcprc: this._hcprc2,
          paci: $_REG_PACI,
          callback_error: () => {},
          callback: () => {},
        });
      });
    },

    async llamarHCI02() {
      await $this.recorrerEvoluciones_HC701();
    },

    crearJsonOpc() {
      ($this.opcionesHC701 = {
        opc_aper: $this.form.aper_HC701.toUpperCase(),
        opc_evo: $this.form.evo_HC701.toUpperCase(),
        opc_enf: $this.form.notasEnf_HC701.toUpperCase(),
        opc_ter: $this.form.notasTer_HC701.toUpperCase(),
        opc_for: $this.form.formuMed_HC701.toUpperCase(),
        opc_lab: $this.form.solicLab_HC701.toUpperCase(),
        opc_ima: $this.form.solicImag_HC701.toUpperCase(),
        opc_ord: $this.form.solicOrdMd_HC701.toUpperCase(),
        opc_con: $this.form.solicConsul_HC701.toUpperCase(),
        opc_inc: $this.form.incapMed_HC701.toUpperCase(),
        opc_resu: $this.form.agrupar_HC701.toUpperCase(),
        fecha_ini_opc: $this.form.añoInicial_701 + $this.form.mesInicial_701 + $this.form.diaInicial_701,
        fecha_fin_opc: $this.form.añoFinal_701 + $this.form.mesFinal_701 + $this.form.diaFinal_701,
        opc_macro: $this.form.macro_HC701 + $this.form.codigo_HC701,
      }),
        ($this.arrayDatos = {
          _ciudades: $this._ciudades,
          _paisesRips: $this._paisesRips,
          _hcpac: $this._hcprc,
          _especialidades: $this._especialidades,
          _detalles: $this._detalles,
          $_reg_hc: $_REG_HC,
          $_reg_paci: $_REG_PACI,
        });
    },
    async recorrerEvoluciones_HC701() {
      $this.arrayImp = [];
      if ($this.form.evo_HC701.toUpperCase() == "S") {
        $this.buscarTipo1 = $this.todasEvo.filter((e) => e.TIPO == "1");
        for (var i in $this.buscarTipo1) {
          if (
            parseFloat($this.buscarTipo1[i].FECHA_EVO) >= parseInt($this.fechaInicial) &&
            parseFloat($this.buscarTipo1[i].FECHA_EVO) <= parseInt($this.fechaFinal)
          ) {
            $this.arrayImp.push($this.buscarTipo1[i]);
          }
        }
      }

      if ($this.form.notasEnf_HC701.toUpperCase() == "S") {
        $this.buscarTipo2 = $this.todasEvo.filter((e) => e.TIPO == "2");
        for (var i in $this.buscarTipo2) {
          if (
            parseFloat($this.buscarTipo2[i].FECHA_EVO) >= parseInt($this.fechaInicial) &&
            parseFloat($this.buscarTipo2[i].FECHA_EVO) <= parseInt($this.fechaFinal)
          ) {
            $this.arrayImp.push($this.buscarTipo2[i]);
          }
        }
      }

      if ($this.form.notasTer_HC701.toUpperCase() == "S") {
        $this.buscarTipo3 = $this.todasEvo.filter((e) => e.TIPO == "3");
        for (var i in $this.buscarTipo3) {
          if (
            parseFloat($this.buscarTipo3[i].FECHA_EVO) >= parseInt($this.fechaInicial) &&
            parseFloat($this.buscarTipo3[i].FECHA_EVO) <= parseInt($this.fechaFinal)
          ) {
            $this.arrayImp.push($this.buscarTipo3[i]);
          }
        }
      }

      for (var i in $this.arrayImp) {
        $this.arrayImp[i].fecha_total = $this.arrayImp[i].FECHA_EVO + $this.arrayImp[i].HORA_EVO;
      }

      let array_sortby = $this.arrayImp.sort((a, b) => {
        return a.fecha_total - b.fecha_total;
      });

      $this.arrayImp = JSON.parse(JSON.stringify(array_sortby)).filter((e) => e.TIPO != 5);

      // await $this.ordenarDatos_HC701();

      loader("show");
      for (var i in $this.arrayImp) {
        if ($this.arrayImp[i]["TIPO"] != 5) {
          await $this.ordenImpresionPorFechas_HC701($this.arrayImp[i]);
        }
      }
    },
    async ordenImpresionPorFechas_HC701(evolucion) {
      $this.jsonEnvio = {
        folio: evolucion.LLAVE_EVO.substring(15, 23),
        macro: evolucion.MACRO.CODIGO,
        id: evolucion.LLAVE_EVO.substring(0, 15),
        oper: evolucion.OPER_EVO,
        medic: evolucion.MEDICO,
        fecha: evolucion.FECHA_EVO,
        hora: evolucion.HORA_EVO,
        tipoEvo: evolucion.TIPO,
        _arrayTipoEvo: tipoEvolucion(),
        original: 0,
        _opciones: {
          opc_aper: $this.form.aper_HC701.toUpperCase(),
          opc_evo: $this.form.evo_HC701.toUpperCase(),
          opc_enf: $this.form.notasEnf_HC701.toUpperCase(),
          opc_ter: $this.form.notasTer_HC701.toUpperCase(),
          opc_for: $this.form.formuMed_HC701.toUpperCase(),
          opc_lab: $this.form.solicLab_HC701.toUpperCase(),
          opc_ima: $this.form.solicImag_HC701.toUpperCase(),
          opc_ord: $this.form.solicOrdMd_HC701.toUpperCase(),
          opc_con: $this.form.solicConsul_HC701.toUpperCase(),
          opc_inc: $this.form.incapMed_HC701.toUpperCase(),
          opc_resu: $this.form.agrupar_HC701.toUpperCase(),
          fechaIni: $this.fechaInicial,
          fechaFin: $this.fechaFinal,
          opc_macro: evolucion.MACRO.CODIGO,
        },
        arrayDatos_HCI02: {
          _ciudades: $this._ciudades,
          _paisesRips: $this._paisesRips,
          _hcpac: $this._hcprc,
          _especialidades: $this._especialidades,
          _detalles: $this._detalles,
        },
        resumido: $this.form.agrupar_HC701.toUpperCase() == "S" ? true : false,
        // todasFormu: true,
        opcion: "masiva",
        _evolucion: evolucion,
      };

      await _iniciarHCI02($this.jsonEnvio);
    },
    async _cargarArchivos_HCI02() {
      postData(
        { datosh: datosEnvio() + this.llave_hc + "|" + localStorage["Usuario"].trim() + "|1|" },
        get_url("APP/HICLIN/HC_PRC.DLL")
      )
        .then((data) => {
          $this._hcprc = data["HCPAC"];
          $this._cargarDetalles();
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          _regresar_menuhis();
        });
    },

    _cargarDetalles() {
      var serv = this._hcprc.esquema == "AI01" || this._hcprc.esquema == "AI02" ? $this._hcprc.serv : "";
      postData(
        { datosh: datosEnvio() + $_REG_HC.llave_hc + "|**|||" + serv + "|" },
        get_url("app/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          $this._detalles = data["DETHC"];
          $this._detalles.pop();
          $this._cargarPaisesRips();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    _cargarPaisesRips() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
        .then((data) => {
          $this._paisesRips = data.PAISESRIPS;
          $this._paisesRips.pop();
          $this._cargarEspecialidades();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    _cargarEspecialidades() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          $this._especialidades = data.ESPECIALIDADES;
          $this._especialidades.pop();
          $this._cargarTipoMacros();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    _cargarTipoMacros() {
      try {
        $this._tipoMacro = _SER874($this._tipoMacro);
        $this._cargarCodigosMacros();
      } catch (err) {
        console.log(err, "err");
        loader("hide");
        _regresar_menuhis();
      }
    },

    _cargarCodigosMacros() {
      postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
        .then((data) => {
          $this._codigos = data.MACROS;
          $this._codigos.pop();
          $this._cargarCiudades();
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          _regresar_menuhis();
        });
    },

    _cargarCiudades() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          $this._ciudades = data.CIUDAD;
          $this._ciudades.pop();
          loader("hide");
          $this.iniciarHC701();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    _cargarTodasEvo() {
      CON851("", "Consultando evoluciones", null, "info", "Cargando");
      return new Promise((resolve, reject) => {
        postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + "1" + "|", fecha_ini: `${this.form.añoInicial_701}${this.form.mesInicial_701}${this.form.diaInicial_701}`, fecha_fin: `${this.form.añoFinal_701}${this.form.mesFinal_701}${this.form.diaFinal_701}` }, get_url("app/HICLIN/HC002B.DLL"))
          .then((data) => {
            this.todasEvo = data.EVOLUCIONES;
            this.todasEvo.pop();
            console.log(this.todasEvo, "todasEvo");
            resolve();
          })
          .catch((err) => {
            console.error(err, "error");
            loader("hide");
            reject();
            _regresar_menuhis();
          });
      });
    },

    async traerHistoriaClinica() {
      return new Promise((resolve, reject) => {
        postData(
          { datosh: datosEnvio() + this.llave_hc + "|" + localStorage["Usuario"].trim() + "|1|" },
          get_url("APP/HICLIN/GET_HC.DLL")
        )
          .then((data) => {
            this._hcprc2 = data;
            resolve();
          })
          .catch((err) => {
            CON851("", "Error consultando historia", null, "error", "Error");
            console.log(err, "err");
            reject();
          });
      });
    },

    async _imprimirPagina_701(llegada, extra) {
      var reg_hc = {
        id_paci: $_REG_HC.id_paciente,
        suc_folio: $_REG_HC.suc_folio_hc,
        nro_folio: $_REG_HC.nro_folio_hc,
      };
      var parametros = {
        Id: llegada.id,
        Descripcion: llegada.descrip,
        Tipo: "RM",
        Params: [{ dll: llegada.dll, extra, reg_hc }],
      };
      await _validarVentanaMain(parametros, () => {
        llegada.callback();
      });
    },

    async ordenarDatos_HC701() {
      await $this.arrayImp.sort((a, b) => {
        return a.fecha_total - b.fecha_total;
      });
      // await $this.arrayImp.sort((a, b) => {
      //     if (parseInt(a.fecha_total) > parseInt(b.fecha_total)) {
      //         return 1;
      //     }
      //     if (parseInt(a.fecha_total) < parseInt(b.fecha_total)) {
      //         return -1;
      //     }
      //     return 0;
      // });
    },
  },
});
