// IMPRESION DE EVOLUCIONES DE ENFERMERIA - DAVID.M - 27-01-2021

new Vue({
  el: "#HC706",
  data: {
    global_HC706: {
      añoEnc_HC706: "",
      mesEnc_HC706: "",
      diaEnc_HC706: "",
      hr_HC706: "",
      mn_HC706: "",
      medico_HC706: "",
      descripMedico_HC706: "",
      consultando_HC706: "",
      notasEnf_HC706: "",
      formuMed_HC706: "",
      solicLab_HC706: "",
      solicImag_HC706: "",
      solicOrdMd_HC706: "",
      solicConsul_HC706: "",
      incapMed_HC706: "",
    },
    macro: {
      tipoMacro_HC706: '',
      codMacro_HC706: '',
      detalleMacro_HC706: '',
      viaMacro_HC706: '',
      descripVia_HC706: ''
    },
    signos: {
      PESO: '',
      TALLA: '',
      IMC_CORP: '',
      SUP_CORP: '',
      TEMP: '',
      F_CARD: '',
      F_RESP: '',
      TENS_1: '',
      TENS_2: '',
      TENS_MEDIA: '',
      UNID_PESO: '',
      TANNER_PUBICO: '',
      TANNER_GENIT: '',
      PVC: '',
      APER_OCUL: '',
      RESP_VERB: '',
      RESP_MOTO: '',
      VLR_GLASG: '',
      G_URIN: '',
      OXIMETRIA: '',
      GLUCOMETRIA: '',
      PESO_GRAMOS: '',
      ETCO: '',
      SUP: '',
      RESUL_CITO: '',
      MUEST_CITO: '',
      CREATININA: '',
      OTR_SIG: '',
      PER_TORA: '',
      PER_ABDO: '',
    },
    contenido_evo: '',
    fecha_act: moment().format("YYYYMMDD"),
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion('Reimprime evolución enfermería')
    $this = this;
    await this._cargarEvoluciones_HC706();
  },
  methods: {
    _cargarF8_enfermeria_HC607() {
      $this.multiple = false;
      _ventanaDatos({
        titulo: "CONSULTA DE EVOLUCIONES POR PACIENTE",
        columnas: ["FECHA_EVO", "HORA_EVO", "DESCRIP_MEDICO_EVO", "PROCED_EVO", 'FOLIO_EVO', 'DESCRIP_SERV_EVO'],
        label: ["Fecha", "Hora", 'Medico', '', 'Folio', 'Unserv'],
        ancho: "1000px",
        data: $this._evoluciones,
        callback_esc: () => {
          $this.salir_HC706();
        },
        callback: async (data) => {
          $this._evolucion = data;
          $this.moverDatosEvo_HC706();
          console.log(data)
        }
      });
    },
    async moverDatosEvo_HC706() {
      this.global_HC706.notasEnf_HC706 = this._evolucion.OPC_EVO.ENFERM;
      this.global_HC706.formuMed_HC706 = this._evolucion.OPC_EVO.FORMUL;
      this.global_HC706.solicLab_HC706 = this._evolucion.OPC_EVO.LABOR;
      this.global_HC706.solicImag_HC706 = this._evolucion.OPC_EVO.IMAGE;
      this.global_HC706.solicOrdMd_HC706 = this._evolucion.OPC_EVO.ORDMED;
      this.global_HC706.solicConsul_HC706 = this._evolucion.OPC_EVO.CONSUL;
      this.global_HC706.incapMed_HC706 = this._evolucion.OPC_EVO.INCAP;

      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + this._evolucion.OPER_ELAB_EVO + '|' + this._evolucion.MEDICO_EVO + '|' + this._evolucion.FECHA_EVO + '|' + this._evolucion.HORA_EVO + '|' + 'CONS' + '|' }, get_url("app/HICLIN/HC002.DLL"))
        .then(async data => {
          $this._evolucion = data.EVOLUCION[0];
        }).catch(err => {
          console.log(err, 'error')
        })

      // datos iniciales
      this.global_HC706.añoEnc_HC706 = this._evolucion.ANO_EVO;
      this.global_HC706.mesEnc_HC706 = this._evolucion.MES_EVO;
      this.global_HC706.diaEnc_HC706 = this._evolucion.DIA_EVO;
      this.global_HC706.hr_HC706 = this._evolucion.HORA_EVO.substring(0,2);
      this.global_HC706.mn_HC706 = this._evolucion.HORA_EVO.substring(2,4);
      this.global_HC706.medico_HC706 = this._evolucion.MEDICO;
      this.global_HC706.descripMedico_HC706 = this._evolucion.NOM_MEDICO;
      this.global_HC706.consultando_HC706 = this._evolucion.DESCRIP_UNSERV;

      // macro
      this.macro.tipoMacro_HC706 = this._evolucion.MACRO.CLASE;
      this.macro.codMacro_HC706 = this._evolucion.MACRO.CODIGO;
      this.macro.detalleMacro_HC706 = this._evolucion.MACRO.DETALLE_MACRO;
      this.macro.viaMacro_HC706 = this._evolucion.MACRO.VIA;

      // signos
      this.signos.PESO = this._evolucion.SIGNOS_VITALES.PESO.trim() != '' ? this._evolucion.SIGNOS_VITALES.PESO : this._evolucion.SIGNOS_VITALES.PESO_GRAMOS;
      this.signos.TALLA = this._evolucion.SIGNOS_VITALES.TALLA;
      this.signos.IMC_CORP = this._evolucion.SIGNOS_VITALES.IMC_CORP;
      this.signos.SUP = this._evolucion.SIGNOS_VITALES.SUP_CORP;
      this.signos.TEMP = this._evolucion.SIGNOS_VITALES.TEMP;
      this.signos.F_CARD = this._evolucion.SIGNOS_VITALES.F_CARD;
      this.signos.F_RESP = this._evolucion.SIGNOS_VITALES.F_RESP;
      this.signos.TENS_1 = this._evolucion.SIGNOS_VITALES.TENS_1;
      this.signos.TENS_2 = this._evolucion.SIGNOS_VITALES.TENS_2;
      this.signos.TENS_MEDIA = this._evolucion.SIGNOS_VITALES.TENS_MEDIA;
      this.signos.PVC = this._evolucion.SIGNOS_VITALES.PVC;
      this.signos.PER_TORA = this._evolucion.PER_TORA;
      this.signos.PER_ABDO = this._evolucion.PER_ABDO;
      this.signos.G_URIN = this._evolucion.SIGNOS_VITALES.G_URIN;
      this.signos.OXIMETRIA = this._evolucion.SIGNOS_VITALES.OXIMETRIA;
      this.signos.GLUCOMETRIA = this._evolucion.SIGNOS_VITALES.GLUCOMETRIA;

      // contenido evolucion
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + this._evolucion.FECHA_EVO + '|' + this._evolucion.HORA_EVO + '|' + this._evolucion.OPER_EVO + '|' + '1' + '|CONS|' }, get_url("app/HICLIN/HCDETA_EVO.DLL"))
        .then(data => {
          $this.contenido_evo = data.DETALLE_EVO[0].CONTENIDO;
        }).catch(err => {
          console.log(err, 'error')
        })

      this.validarNotasEnfHC706();
    },

    salir_HC706() {
      _regresar_menuhis();
    },

    validarNotasEnfHC706() {
      validarInputs(
        {
          form: "#validarNotasEnf_HC706",
        },
        () => {
          $this.salir_HC706();
        },
        () => {
          $this.global_HC706.notasEnf_HC706 = $this.global_HC706.notasEnf_HC706.toUpperCase() == "S" ? "S" : "N";
          $this.validarFormuMedHC706();
        }
      );
    },
    validarFormuMedHC706() {
      validarInputs(
        {
          form: "#validarFormuMed_HC706",
        },
        () => {
          $this.validarNotasEnfHC706();
        },
        () => {
          $this.global_HC706.formuMed_HC706 = $this.global_HC706.formuMed_HC706.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicLabHC706();
        }
      );
    },
    validarSolicLabHC706() {
      validarInputs(
        {
          form: "#validarSolicLab_HC706",
        },
        () => {
          $this.validarFormuMedHC706();
        },
        () => {
          $this.global_HC706.solicLab_HC706 = $this.global_HC706.solicLab_HC706.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicImagHC706();
        }
      );
    },
    validarSolicImagHC706() {
      validarInputs(
        {
          form: "#validarSolicImag_HC706",
        },
        () => {
          $this.validarSolicLabHC706();
        },
        () => {
          $this.global_HC706.solicImag_HC706 = $this.global_HC706.solicImag_HC706.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicOrdMdHC706();
        }
      );
    },
    validarSolicOrdMdHC706() {
      validarInputs(
        {
          form: "#validarSolicOrdMd_HC706",
        },
        () => {
          $this.validarSolicImagHC706();
        },
        () => {
          $this.global_HC706.solicOrdMd_HC706 = $this.global_HC706.solicOrdMd_HC706.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicConsulHC706();
        }
      );
    },
    validarSolicConsulHC706() {
      validarInputs(
        {
          form: "#validarSolicConsul_HC706",
        },
        () => {
          $this.validarSolicOrdMdHC706();
        },
        () => {
          $this.global_HC706.solicConsul_HC706 = $this.global_HC706.solicConsul_HC706.toUpperCase() == "S" ? "S" : "N";
          $this.validarIncapMedHC706();
        }
      );
    },
    validarIncapMedHC706() {
      validarInputs(
        {
          form: "#validarIncapMed_HC706",
        },
        () => {
          $this.validarSolicConsulHC706();
        },
        () => {
          this.global_HC706.incapMed_HC706 = $this.global_HC706.incapMed_HC706.toUpperCase() == "S" ? "S" : "N";
          this.imprimir_HC706();
        }
      );
    },

    async imprimir_HC706() {
      inicializarFormatoBase_impHc();

      if (
        $this.global_HC706.notasEnf_HC706.toUpperCase() == "S" ||
        $this.global_HC706.formuMed_HC706.toUpperCase() == "S" ||
        $this.global_HC706.solicLab_HC706.toUpperCase() == "S" ||
        $this.global_HC706.solicImag_HC706.toUpperCase() == "S" ||
        $this.global_HC706.solicOrdMd_HC706.toUpperCase() == "S" ||
        $this.global_HC706.solicConsul_HC706.toUpperCase() == "S" ||
        $this.global_HC706.incapMed_HC706.toUpperCase() == "S"
      ) {
        await this.llamarHCI02();
      }

      if (formatoBaseImp_Hc.header != '') {
        toastr.success("Impresion/es cargadas correctamente");
      }

      this.salir_HC706();
    },

    async llamarHCI02() {
      loader('show');
      await $this.ordenImpresionPorFechas_HC706();
      loader('hide');
    },

    async ordenImpresionPorFechas_HC706() {
      $this.jsonEnvio = {
        folio: this._evolucion.LLAVE_EVO.substring(15, 23),
        macro: this._evolucion.MACRO.CLASE + this._evolucion.MACRO.CODIGO,
        id: this._evolucion.LLAVE_EVO.substring(0, 15),
        oper: this._evolucion.OPER_EVO,
        medic: this._evolucion.MEDICO,
        fecha: this._evolucion.FECHA_EVO,
        hora: this._evolucion.HORA_EVO,
        _arrayTipoEvo: tipoEvolucion(),
        original: 0,
        _opciones: {
          opc_aper: 'N',
          opc_evo: 'N',
          opc_enf: this.global_HC706.notasEnf_HC706.toUpperCase(),
          opc_ter: 'N',
          opc_for: this.global_HC706.formuMed_HC706.toUpperCase(),
          opc_lab: this.global_HC706.solicLab_HC706.toUpperCase(),
          opc_ima: this.global_HC706.solicImag_HC706.toUpperCase(),
          opc_ord: this.global_HC706.solicOrdMd_HC706.toUpperCase(),
          opc_con: this.global_HC706.solicConsul_HC706.toUpperCase(),
          opc_inc: this.global_HC706.incapMed_HC706.toUpperCase(),
          opc_resu: 'N',
          fechaIni: '00000000',
          fechaFin: '99999999',
          opc_macro: this._evolucion.MACRO.CLASE + this._evolucion.MACRO.CODIGO,
        },
        arrayDatos_HCI02: {
          _ciudades: $this._ciudades,
          _entidades: $this._entidades,
          _ocupaciones: $this._ocupaciones,
          reg_pac: $_REG_PACI,
          _paisesRips: $this._paisesRips,
          _hcpac: $this._hcprc,
          _especialidades: $this._especialidades,
          _detalles: $this._detalles,
        },
        resumido: false,
        todasFormu: true,
        // opcion: '71',
        // _evolucion: this._evolucion
      };

      await _iniciarHCI02($this.jsonEnvio);

      $this.banderaToastr = true;
    },

    async _cargarEvoluciones_HC706() {
      await postData({ datosh: datosEnvio() + `${$_REG_PACI['COD']}|${$_REG_HC['suc_folio_hc'] + $_REG_HC['nro_folio_hc']}|2|` }, get_url("app/HICLIN/HC705B.DLL"))
        .then(data => {
          $this._evoluciones = data.EVOLUCIONES;
          $this._evoluciones.pop();
          $this._cargarPaisesRips_HC706();
        }).catch(err => {
          console.log(err, "error");
          loader('hide')
          $this.salir_HC706();
        })
    },

    async _cargarPaisesRips_HC706() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
        .then((data) => {
          $this._paisesRips = data.PAISESRIPS;
          $this._paisesRips.pop();
          $this._cargarEspecialidades_HC706();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarEspecialidades_HC706() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          $this._especialidades = data.ESPECIALIDADES;
          $this._especialidades.pop();
          $this._cargarCiudades_HC706();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarCiudades_HC706() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          $this._ciudades = data.CIUDAD;
          $this._ciudades.pop();
          $this._cargarEntidades_HC706();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarEntidades_HC706() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
        .then((data) => {
          $this._entidades = data.ENTIDADES;
          $this._entidades.pop();
          $this._cargarOcupaciones_HC706();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarOcupaciones_HC706() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
        .then((data) => {
          $this._ocupaciones = data.OCUPACIONES;
          $this._ocupaciones.pop();
          loader("hide");
          $this._cargarF8_enfermeria_HC607();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async ordenarDatos_HC706() {
      await $this.arrayImp.sort((a, b) => {
        return a.fecha_total - b.fecha_total;
      });
    }
  },
});
