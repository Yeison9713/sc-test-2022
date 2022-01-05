// IMPRESION DE EVOLUCIONES DE TERAPIAS - DAVID.M - 27-01-2021

new Vue({
  el: "#HC707",
  data: {
    global_HC707: {
      añoEnc_HC707: "",
      mesEnc_HC707: "",
      diaEnc_HC707: "",
      hr_HC707: "",
      mn_HC707: "",
      medico_HC707: "",
      descripMedico_HC707: "",
      consultando_HC707: "",
      notasTer_HC707: "",
      formuMed_HC707: "",
      solicLab_HC707: "",
      solicImag_HC707: "",
      solicOrdMd_HC707: "",
      solicConsul_HC707: "",
      incapMed_HC707: "",
    },
    macro: {
      tipoMacro_HC707: '',
      codMacro_HC707: '',
      detalleMacro_HC707: '',
      viaMacro_HC707: '',
      descripVia_HC707: ''
    },
    contenido_evo: '',
    fecha_act: moment().format("YYYYMMDD"),
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion('Reimprime nota terapeutas')
    $this = this;
    await this._cargarEvoluciones_HC707();
  },
  methods: {
    _cargarF8_terapias_HC607() {
      $this.multiple = false;
      _ventanaDatos({
        titulo: "CONSULTA DE EVOLUCIONES POR PACIENTE",
        columnas: ["FECHA_EVO", "HORA_EVO", "DESCRIP_MEDICO_EVO", "PROCED_EVO", 'FOLIO_EVO', 'DESCRIP_SERV_EVO'],
        labels: ["Fecha", "Hora", 'Medico', '', 'Folio', 'Unserv'],
        ancho: "1000px",
        data: $this._evoluciones,
        callback_esc: () => {
          $this.salir_HC707();
        },
        callback: async (data) => {
          $this._evolucion = data;
          $this.moverDatosEvo_HC707();
          console.log(data)
        }
      });
    },
    async moverDatosEvo_HC707() {
      this.global_HC707.notasTer_HC707 = this._evolucion.OPC_EVO.TERAP;
      this.global_HC707.formuMed_HC707 = this._evolucion.OPC_EVO.FORMUL;
      this.global_HC707.solicLab_HC707 = this._evolucion.OPC_EVO.LABOR;
      this.global_HC707.solicImag_HC707 = this._evolucion.OPC_EVO.IMAGE;
      this.global_HC707.solicOrdMd_HC707 = this._evolucion.OPC_EVO.ORDMED;
      this.global_HC707.solicConsul_HC707 = this._evolucion.OPC_EVO.CONSUL;
      this.global_HC707.incapMed_HC707 = this._evolucion.OPC_EVO.INCAP;

      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + this._evolucion.OPER_ELAB_EVO + '|' + this._evolucion.MEDICO_EVO + '|' + this._evolucion.FECHA_EVO + '|' + this._evolucion.HORA_EVO + '|' + 'CONS' + '|' }, get_url("app/HICLIN/HC002.DLL"))
        .then(async data => {
          $this._evolucion = data.EVOLUCION[0];
        }).catch(err => {
          console.log(err, 'error')
        })

      // datos iniciales
      this.global_HC707.añoEnc_HC707 = this._evolucion.ANO_EVO;
      this.global_HC707.mesEnc_HC707 = this._evolucion.MES_EVO;
      this.global_HC707.diaEnc_HC707 = this._evolucion.DIA_EVO;
      this.global_HC707.hr_HC707 = this._evolucion.HORA_EVO.substring(0,2);
      this.global_HC707.mn_HC707 = this._evolucion.HORA_EVO.substring(2,4);
      this.global_HC707.medico_HC707 = this._evolucion.MEDICO;
      this.global_HC707.descripMedico_HC707 = this._evolucion.NOM_MEDICO;
      this.global_HC707.consultando_HC707 = this._evolucion.DESCRIP_UNSERV;

      // macro
      this.macro.tipoMacro_HC707 = this._evolucion.MACRO.CLASE;
      this.macro.codMacro_HC707 = this._evolucion.MACRO.CODIGO;
      this.macro.detalleMacro_HC707 = this._evolucion.MACRO.DETALLE_MACRO;
      this.macro.viaMacro_HC707 = this._evolucion.MACRO.VIA;

      // contenido evolucion
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + this._evolucion.FECHA_EVO + '|' + this._evolucion.HORA_EVO + '|' + this._evolucion.OPER_EVO + '|' + '1' + '|CONS|' }, get_url("app/HICLIN/HCDETA_EVO.DLL"))
        .then(data => {
          $this.contenido_evo = data.DETALLE_EVO[0].CONTENIDO;
        }).catch(err => {
          console.log(err, 'error')
        })

      this.validarNotasTer_HC707();
    },

    salir_HC707() {
      _regresar_menuhis();
    },

    validarNotasTer_HC707() {
      validarInputs(
        {
          form: "#validarNotasTer_HC707",
        },
        () => {
          $this.salir_HC707();
        },
        () => {
          $this.global_HC707.notasTer_HC707 = $this.global_HC707.notasTer_HC707.toUpperCase() == "S" ? "S" : "N";
          $this.validarFormuMed_HC707();
        }
      );
    },
    validarFormuMed_HC707() {
      validarInputs(
        {
          form: "#validarFormuMed_HC707",
        },
        () => {
          $this.validarNotasTer_HC707();
        },
        () => {
          $this.global_HC707.formuMed_HC707 = $this.global_HC707.formuMed_HC707.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicLab_HC707();
        }
      );
    },
    validarSolicLab_HC707() {
      validarInputs(
        {
          form: "#validarSolicLab_HC707",
        },
        () => {
          $this.validarFormuMed_HC707();
        },
        () => {
          $this.global_HC707.solicLab_HC707 = $this.global_HC707.solicLab_HC707.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicImag_HC707();
        }
      );
    },
    validarSolicImag_HC707() {
      validarInputs(
        {
          form: "#validarSolicImag_HC707",
        },
        () => {
          $this.validarSolicLab_HC707();
        },
        () => {
          $this.global_HC707.solicImag_HC707 = $this.global_HC707.solicImag_HC707.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicOrdMd_HC707();
        }
      );
    },
    validarSolicOrdMd_HC707() {
      validarInputs(
        {
          form: "#validarSolicOrdMd_HC707",
        },
        () => {
          $this.validarSolicImag_HC707();
        },
        () => {
          $this.global_HC707.solicOrdMd_HC707 = $this.global_HC707.solicOrdMd_HC707.toUpperCase() == "S" ? "S" : "N";
          $this.validarSolicConsul_HC707();
        }
      );
    },
    validarSolicConsul_HC707() {
      validarInputs(
        {
          form: "#validarSolicConsul_HC707",
        },
        () => {
          $this.validarSolicOrdMd_HC707();
        },
        () => {
          $this.global_HC707.solicConsul_HC707 = $this.global_HC707.solicConsul_HC707.toUpperCase() == "S" ? "S" : "N";
          $this.validarIncapMed_HC707();
        }
      );
    },
    validarIncapMed_HC707() {
      validarInputs(
        {
          form: "#validarIncapMed_HC707",
        },
        () => {
          $this.validarSolicConsul_HC707();
        },
        () => {
          this.global_HC707.incapMed_HC707 = $this.global_HC707.incapMed_HC707.toUpperCase() == "S" ? "S" : "N";
          this.imprimir_HC707();
        }
      );
    },

    async imprimir_HC707() {
      inicializarFormatoBase_impHc();

      if (
        $this.global_HC707.notasTer_HC707.toUpperCase() == "S" ||
        $this.global_HC707.formuMed_HC707.toUpperCase() == "S" ||
        $this.global_HC707.solicLab_HC707.toUpperCase() == "S" ||
        $this.global_HC707.solicImag_HC707.toUpperCase() == "S" ||
        $this.global_HC707.solicOrdMd_HC707.toUpperCase() == "S" ||
        $this.global_HC707.solicConsul_HC707.toUpperCase() == "S" ||
        $this.global_HC707.incapMed_HC707.toUpperCase() == "S"
      ) {
        await this.llamarHCI02();
      }

      if (formatoBaseImp_Hc.header != '') {
        toastr.success("Impresion/es cargadas correctamente");
      }

      this.salir_HC707();
    },

    async llamarHCI02() {
      loader('show');
      await $this.ordenImpresionPorFechas_HC707();
      loader('hide');
    },

    async ordenImpresionPorFechas_HC707() {
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
          opc_enf: 'N',
          opc_ter: this.global_HC707.notasTer_HC707.toUpperCase(),
          opc_for: this.global_HC707.formuMed_HC707.toUpperCase(),
          opc_lab: this.global_HC707.solicLab_HC707.toUpperCase(),
          opc_ima: this.global_HC707.solicImag_HC707.toUpperCase(),
          opc_ord: this.global_HC707.solicOrdMd_HC707.toUpperCase(),
          opc_con: this.global_HC707.solicConsul_HC707.toUpperCase(),
          opc_inc: this.global_HC707.incapMed_HC707.toUpperCase(),
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

    async _cargarEvoluciones_HC707() {
      await postData({ datosh: datosEnvio() + `${$_REG_PACI['COD']}|${$_REG_HC['suc_folio_hc'] + $_REG_HC['nro_folio_hc']}|3|` }, get_url("app/HICLIN/HC705B.DLL"))
        .then(data => {
          $this._evoluciones = data.EVOLUCIONES;
          $this._evoluciones.pop();
          $this._cargarPaisesRips_HC707();
        }).catch(err => {
          console.log(err, "error");
          loader('hide')
          $this.salir_HC707();
        })
    },

    async _cargarPaisesRips_HC707() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
        .then((data) => {
          $this._paisesRips = data.PAISESRIPS;
          $this._paisesRips.pop();
          $this._cargarEspecialidades_HC707();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarEspecialidades_HC707() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          $this._especialidades = data.ESPECIALIDADES;
          $this._especialidades.pop();
          $this._cargarCiudades_HC707();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarCiudades_HC707() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          $this._ciudades = data.CIUDAD;
          $this._ciudades.pop();
          $this._cargarEntidades_HC707();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarEntidades_HC707() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
        .then((data) => {
          $this._entidades = data.ENTIDADES;
          $this._entidades.pop();
          $this._cargarOcupaciones_HC707();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarOcupaciones_HC707() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
        .then((data) => {
          $this._ocupaciones = data.OCUPACIONES;
          $this._ocupaciones.pop();
          loader("hide");
          $this._cargarF8_terapias_HC607();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async ordenarDatos_HC707() {
      await $this.arrayImp.sort((a, b) => {
        return a.fecha_total - b.fecha_total;
      });
    }
  },
});
