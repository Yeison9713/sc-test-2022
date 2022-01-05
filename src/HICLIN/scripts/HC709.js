// IMPRESION DE TODOS LOS FOLIOS - DAVID.M - 27-01-2021

new Vue({
  el: "#HC709",
  data: {
    _aperturas: [],
    _todasEvo: [],
    _paisesRips: [],
    _especialidades: [],
    _ciudades: [],
    _entidades: [],
    _ocupaciones: [],
    _tipoMacro: [],
    _codigosMacro: [],
    _detalles: [],
    global_HC709: {
      añoEnc_HC709: "",
      mesEnc_HC709: "",
      diaEnc_HC709: "",
      hr_HC709: "",
      mn_HC709: "",
      medico_HC709: "",
      descripMedico_HC709: "",
      consultando_HC709: "",
      año_ini: '',
      mes_ini: '',
      dia_ini: '',
      año_fin: '',
      mes_fin: '',
      dia_fin: ''
    },
    opciones: {
      opc_aper: '',
      opc_evo: '',
      opc_enf: '',
      opc_ter: '',
      opc_for: '',
      opc_lab: '',
      opc_ima: '',
      opc_ord: '',
      opc_con: '',
      opc_inc: '',
      opc_rla: '',
      opc_resu: '',
      opc_epic: ''
    },
    macro: {
      tipoMacro_HC709: '',
      codMacro_HC709: '',
      descripTipoMacro_HC709: '',
    },
    contenido_evo: '',
    fecha_act: moment().format("YYYYMMDD"),
    historias_tabla: [],
    nit_usu: $_USUA_GLOBAL[0].NIT,
    his_evo: [],
    dataBase64: []
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion('Imprime todos los folios')
    $this = this;
    await this.buscarHistoria_HC709();
  },
  methods: {
    async buscarHistoria_HC709() {
      this.cargarEvoluciones_HC709();

      this.global_HC709.fecha_ini = this.global_HC709.año_ini + this.global_HC709.mes_ini + this.global_HC709.dia_ini;
      if (this.global_HC709.fecha_ini == 0) {
        this.global_HC709.año_ini = this.fecha_act.substring(0, 4);
        this.global_HC709.mes_ini = '01';
        this.global_HC709.dia_ini = '01';

        this.global_HC709.año_fin = this.fecha_act.substring(0, 4);
        this.global_HC709.mes_fin = this.fecha_act.substring(4, 6);
        this.global_HC709.dia_fin = this.fecha_act.substring(6, 8);
      }
    },

    buscarFechaIni_HC709(orden) {
      validarInputs(
        {
          form: "#validarFechaIni_HC709",
          orden: orden
        },
        () => {
          $this.salir_HC709();
        },
        () => {
          this.global_HC709.año_ini = cerosIzq(this.global_HC709.año_ini, 4);
          this.global_HC709.mes_ini = cerosIzq(this.global_HC709.mes_ini, 2);
          this.global_HC709.dia_ini = cerosIzq(this.global_HC709.dia_ini, 2);

          if (this.global_HC709.año_ini < 2000) {
            CON851('37', '37', null, 'error', 'error');
            this.buscarFechaIni_HC709('1');
          } else if (this.global_HC709.mes_ini < 1 || this.global_HC709.mes_ini > 12) {
            CON851('37', '37', null, 'error', 'error');
            this.buscarFechaIni_HC709('2');
          } else if (this.global_HC709.dia_ini < 1 || this.global_HC709.dia_ini > 31) {
            CON851('37', '37', null, 'error', 'error');
            this.buscarFechaIni_HC709('3');
          } else {
            this.global_HC709.fecha_ini = this.global_HC709.año_ini + this.global_HC709.mes_ini + this.global_HC709.dia_ini;
            this.global_HC709.fecha_fin = this.global_HC709.año_fin + this.global_HC709.mes_fin + this.global_HC709.dia_fin;
            if (this.global_HC709.fecha_fin < this.global_HC709.fecha_ini) {
              this.global_HC709.año_fin = this.fecha_act.substring(0, 4);
              this.global_HC709.mes_fin = this.fecha_act.substring(4, 6);
              this.global_HC709.dia_fin = this.fecha_act.substring(6, 8);
            }
            this.buscarFechaFin_HC709('1');
          }
        }
      );
    },

    buscarFechaFin_HC709(orden) {
      validarInputs(
        {
          form: "#validarFechaFin_HC709",
          orden: orden
        },
        () => {
          $this.buscarFechaIni_HC709('3');
        },
        () => {
          this.global_HC709.año_fin = cerosIzq(this.global_HC709.año_fin, 4);
          this.global_HC709.mes_fin = cerosIzq(this.global_HC709.mes_fin, 2);
          this.global_HC709.dia_fin = cerosIzq(this.global_HC709.dia_fin, 2);

          if (this.global_HC709.año_fin < this.global_HC709.año_ini) {
            CON851('37', '37', null, 'error', 'error');
            this.buscarFechaFin_HC709('1');
          } else if (this.global_HC709.mes_fin < 1 || this.global_HC709.mes_fin > 12) {
            CON851('37', '37', null, 'error', 'error');
            this.buscarFechaFin_HC709('2');
          } else if (this.global_HC709.dia_fin < 1 || this.global_HC709.dia_fin > 31) {
            CON851('37', '37', null, 'error', 'error');
            this.buscarFechaFin_HC709('3');
          } else {
            this.global_HC709.fecha_fin = this.global_HC709.año_fin + this.global_HC709.mes_fin + this.global_HC709.dia_fin;
            if (this.global_HC709.fecha_fin < this.global_HC709.fecha_ini) {
              this.global_HC709.año_fin = this.fecha_act.substring(0, 4);
              this.global_HC709.mes_fin = this.fecha_act.substring(4, 6);
              this.global_HC709.dia_fin = this.fecha_act.substring(6, 8);
              CON851('37', '37', null, 'error', 'error');
              this.buscarFechaFin_HC709('1');
            } else {
              this.leerHistoria_HC709();
            }
          }
        }
      );
    },

    async leerHistoria_HC709() {
      await this.cargarAperturas_HC709();

      if (!this.flagSalir) {
        for (var i in this._aperturas) {
          this.historias_tabla.push({
            folio: this._aperturas[i].llave.substring(15, 17) + ' - ' + this._aperturas[i].llave.substring(17, 23),
            fecha: _editarFecha(this._aperturas[i].fecha),
            medico: _editCedula(this._aperturas[i].med) + ' - ' + this._aperturas[i].descrip_med,
            motivo: this._aperturas[i].motivo
          })
        }

        this.confirmar_HC709()
      }
    },

    confirmar_HC709() {
      CON851P('00', this.salir_HC709, this.buscarApertura_HC709);
    },

    buscarApertura_HC709() {
      if (this._aperturas.length < 1) {
        this.opciones.opc_aper = "N";
        this.buscarEvo_HC709();
      } else {
        validarInputs(
          {
            form: "#validarOpcAper_HC709",
          },
          () => {
            this.salir_HC709();
          },
          () => {
            this.opciones.opc_aper = this.opciones.opc_aper.toUpperCase() == "S" ? "S" : "N";
            this.buscarEvo_HC709();
          }
        );
      }
    },

    buscarEvo_HC709() {
      if (this.opciones.opc_evo.trim() == '') this.opciones.opc_evo = 'S'

      validarInputs(
        {
          form: "#validarOpcEvo_HC709",
        },
        () => {
          this.buscarApertura_HC709();
        },
        () => {
          this.opciones.opc_evo = this.opciones.opc_evo.toUpperCase() == "S" ? "S" : "N";
          this.buscarNotasEnf_HC709();
        }
      );
    },

    buscarNotasEnf_HC709() {
      if (this.opciones.opc_enf.trim() == '') this.opciones.opc_enf = 'S'

      validarInputs(
        {
          form: "#validarOpcEnf_HC709",
        },
        () => {
          this.buscarEvo_HC709();
        },
        () => {
          this.opciones.opc_enf = this.opciones.opc_enf.toUpperCase() == "S" ? "S" : "N";
          this.buscarNotasTer_HC709();
        }
      );
    },

    buscarNotasTer_HC709() {
      if (this.opciones.opc_ter.trim() == '') this.opciones.opc_ter = 'S'

      validarInputs(
        {
          form: "#validarOpcTer_HC709",
        },
        () => {
          this.buscarNotasEnf_HC709();
        },
        () => {
          this.opciones.opc_ter = this.opciones.opc_ter.toUpperCase() == "S" ? "S" : "N";
          this.buscarFormulacion_HC709();
        }
      );
    },

    buscarFormulacion_HC709() {
      if (this.opciones.opc_for.trim() == '') this.opciones.opc_for = 'S'

      validarInputs(
        {
          form: "#validarOpcFor_HC709",
        },
        () => {
          this.buscarNotasTer_HC709();
        },
        () => {
          this.opciones.opc_for = this.opciones.opc_for.toUpperCase() == "S" ? "S" : "N";
          this.buscarLab_HC709();
        }
      );
    },

    buscarLab_HC709() {
      if (this.opciones.opc_lab.trim() == '') this.opciones.opc_lab = 'N'

      validarInputs(
        {
          form: "#validarOpcLab_HC709",
        },
        () => {
          this.buscarFormulacion_HC709();
        },
        () => {
          this.opciones.opc_lab = this.opciones.opc_lab.toUpperCase() == "S" ? "S" : "N";
          this.buscarImag_HC709();
        }
      );
    },

    buscarImag_HC709() {
      if (this.opciones.opc_ima.trim() == '') this.opciones.opc_ima = 'N'

      validarInputs(
        {
          form: "#validarOpcIma_HC709",
        },
        () => {
          this.buscarLab_HC709();
        },
        () => {
          this.opciones.opc_ima = this.opciones.opc_ima.toUpperCase() == "S" ? "S" : "N";
          this.buscarOrd_HC709();
        }
      );
    },

    buscarOrd_HC709() {
      if (this.opciones.opc_ord.trim() == '') this.opciones.opc_ord = 'N'

      validarInputs(
        {
          form: "#validarOpcOrd_HC709",
        },
        () => {
          this.buscarImag_HC709();
        },
        () => {
          this.opciones.opc_ord = this.opciones.opc_ord.toUpperCase() == "S" ? "S" : "N";
          this.buscarConsultas_HC709();
        }
      );
    },

    buscarConsultas_HC709() {
      if (this.opciones.opc_con.trim() == '') this.opciones.opc_con = 'N'

      validarInputs(
        {
          form: "#validarOpcCon_HC709",
        },
        () => {
          this.buscarOrd_HC709();
        },
        () => {
          this.opciones.opc_con = this.opciones.opc_con.toUpperCase() == "S" ? "S" : "N";
          this.buscarResultados_HC709();
        }
      );
    },

    buscarResultados_HC709() {
      if (this.opciones.opc_rla.trim() == '' && this.nit_usu == 892000401) this.opciones.opc_rla = 'N'
      else this.opciones.opc_rla = 'S'

      validarInputs(
        {
          form: "#validarOpcRla_HC709",
        },
        () => {
          this.buscarConsultas_HC709();
        },
        () => {
          this.opciones.opc_rla = this.opciones.opc_rla.toUpperCase() == "S" ? "S" : "N";
          this.buscarIncapacidad_HC709();
        }
      );
    },

    buscarIncapacidad_HC709() {
      if (this.opciones.opc_inc.trim() == '') this.opciones.opc_inc = 'N'

      validarInputs(
        {
          form: "#validarOpcInc_HC709",
        },
        () => {
          this.buscarResultados_HC709();
        },
        () => {
          this.opciones.opc_inc = this.opciones.opc_inc.toUpperCase() == "S" ? "S" : "N";
          this.buscarMacro_HC709();
        }
      );
    },

    buscarMacro_HC709() {
      if (this.macro.tipoMacro_HC709 == "") this.macro.tipoMacro_HC709 = '0'

      validarInputs(
        {
          form: "#validarTipoMacro_HC709",
        },
        () => {
          this.buscarApertura_HC709();
        },
        () => {
          switch (this.macro.tipoMacro_HC709) {
            case '0':
              this.macro.descripTipoMacro_HC709 = 'TODAS LAS MACROS'
              this.cerrarOpciones_HC709()
              break;
            case '1':
            case '2':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case 'O':
            case 'C':
            case 'P':
              this.macro.descripTipoMacro_HC709 = descripTipoMacro_mainHc(this.macro.tipoMacro_HC709)
              this.datoMacro_HC709()
              break;
            default:
              this.buscarMacro_HC709()
              break;
          }
        }
      );
    },

    datoMacro_HC709() {
      validarInputs(
        {
          form: "#validarCodMacro_HC709",
        },
        () => {
          this.buscarMacro_HC709();
        },
        () => {
          if (this.macro.codMacro_HC709 == '') this.macro.codMacro_HC709 = '000000'
          if (this.macro.codMacro_HC709 == 0) {
            this.cerrarOpciones_HC709()
          } else {
            this.busqMacro = this._codigosMacro.find((e) => e.CODIGO.trim() == this.macro.codMacro_HC709);
            if (!this.busqMacro) {
              CON851('37', '37', null, 'error', 'error')
              this.datoMacro_HC709()
            } else {
              this.cerrarOpciones_HC709()
            }
          }
        }
      );
    },

    cerrarOpciones_HC709() {
      if (this.macro.codMacro_HC709 == '' || this.macro.codMacro_HC709 == 0) this.macro.codMacro_HC709 = '000000'
      this.opciones.opc_resu = 'I'
      this.opciones.opc_epic = 'N'
      this.grabarAud_HC709()
    },

    grabarAud_HC709() {
      // falta grabado de auditoria
      this.imprimirTabla_HC709()
    },

    async imprimirTabla_HC709() {
      $_REG_HC.hidePage = true;

      loader('show')
      this.evo_x_fechas = this._todasEvo.filter(e => e.FECHA_EVO >= this.global_HC709.fecha_ini && e.FECHA_EVO <= this.global_HC709.fecha_fin)

      if (this._aperturas.length > 0) {
        for (var i in this._aperturas) {
          // imprime apertura
          await this.llamarApertura_HC709(this._aperturas[i].esquema, this._aperturas[i])

          if (this.opciones.opc_evo == 'N'
            && this.opciones.opc_enf == 'N'
            && this.opciones.opc_ter == 'N'
            && this.opciones.opc_for == 'N'
            && this.opciones.opc_lab == 'N'
            && this.opciones.opc_ima == 'N'
            && this.opciones.opc_ord == 'N'
            && this.opciones.opc_con == 'N') {
            // continue
          } else {
            this.busqEvo = this.evo_x_fechas.filter(e => e.LLAVE_EVO.substring(0, 23) == this._aperturas[i].llave)

            if (this.busqEvo.length > 0) {
              await this.buscarEvolucion_HC709(this._aperturas[i])
            } else {
              await this.imprimirCierre_HC709(this._aperturas[i])
            }
          }

          await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS-01')}.pdf`,
            content: formatoBaseImp_Hc,
            retornar: true
          }).then(data => {
            this.dataBase64.push(data)
          }).catch((err) => {
            console.error(err)
          })
        }

        if (this.opciones.opc_rla == 'S') {
          await postData({ datosh: datosEnvio(), masivo: 'S', paciente_masivo: $_REG_PACI.COD }, get_url("app/LAB/LAB102.DLL"))
            .then(data => {
              data = data.RESULTADOS_LAB
              data.pop()
              this.his_lab = data
            }).catch(err => {
              console.log(err, 'error')
            })

          for (var i in this.his_lab) {
            await _imprimirLab102(this.his_lab[i], true)
          }

          if (formatoBaseImp_lab.header != '') {
            await _impresion2({
              tipo: 'pdf',
              archivo: localStorage.Usuario + moment().format('-YYMMDD-HHmmss') + '.pdf',
              content: formatoBaseImp_lab,
              retornar: true
            }).then((data) => {
              this.dataBase64.push(data)
            }).catch(err => {
              console.error(err)
            })
          }
        }

        await unirPdfs_mainHc(this.dataBase64, true);
        await this.modifyPdf()

        toastr.success('Impresión cargada correctamente')
        this.salir_HC709()
      } else {
        toastr.warning('El paciente no tiene ninguna historia clínica en el rango de fechas seleccionadas')
        this.salir_HC709()
      }

      loader('hide')
      $_REG_HC.hidePage = false;
    },

    async buscarEvolucion_HC709(hcprc) {
      if (this.global_HC709.año_ini > this.fecha_act.substring(0, 4)) {
        await this.imprimirCierre_HC709(hcprc)
      } else {
        for (var i in this.busqEvo) {
          if (this.global_HC709.mes_ini > 0) {
            if (this.busqEvo[i].FECHA_EVO < this.global_HC709.fecha_ini || this.busqEvo[i].FECHA_EVO > this.global_HC709.fecha_fin) {
              // continue
            } else {
              switch (this.busqEvo[i].TIPO) {
                case '1':
                  if (this.opciones.opc_evo == 'N') {
                    //  continue
                  } else {
                    await this.llamar_HCI02(this.busqEvo[i], hcprc)
                  }
                  break;
                case '2':
                  if (this.opciones.opc_enf == 'N') {
                    //  continue
                  } else {
                    await this.llamar_HCI02(this.busqEvo[i], hcprc)
                  }
                  break;
                case '3':
                  if (this.opciones.opc_ter == 'N') {
                    //  continue
                  } else {
                    await this.llamar_HCI02(this.busqEvo[i], hcprc)
                  }
                  break;
                case '7':
                  if (this.opciones.opc_evo == 'N') {
                    //  continue
                  } else {
                    // Se omite temporalmente
                  }
                  break;
                case '8':
                  if (this.opciones.opc_evo == 'N') {
                    //  continue
                  } else {
                    // Se omite temporalmente
                  }
                  break;
                case 'N':
                  if (this.opciones.opc_ter == 'N') {
                    //  continue
                  } else {
                    await this.llamar_HCI02(this.busqEvo[i], hcprc)
                  }
                  break;
                case 'P':
                  if (this.opciones.opc_ter == 'N') {
                    //  continue
                  } else {
                    await this.llamar_HCI02(this.busqEvo[i], hcprc)
                  }
                  break;
                default:
                  // continue
                  break;
              }

              if (this.opciones.opc_resu == 'X') this.opciones.opc_resu = 'I'
            }
          }
        }

        await this.imprimirCierre_HC709(hcprc);
      }
    },

    async imprimirCierre_HC709(hcprc) {
      if (hcprc.cierre.estado == 2) {
        const { iniciar_HCI01C } = require("../../HICLIN/scripts/HCI01C");
  
        return new Promise((resolve) => {
          iniciar_HCI01C({
            hcprc: hcprc,
            callback: resolve,
          });
        });
      }
    },

    async llamarApertura_HC709(esquema, hcprc) {
      var opciones = {
        opc_aper: this.opciones.opc_aper,
        opc_evo: this.opciones.opc_evo,
        opc_enf: this.opciones.opc_enf,
        opc_ter: this.opciones.opc_ter,
        opc_for: this.opciones.opc_for,
        opc_lab: this.opciones.opc_lab,
        opc_ima: this.opciones.opc_ima,
        opc_ord: this.opciones.opc_ord,
        opc_con: this.opciones.opc_con,
        opc_inc: this.opciones.opc_inc,
        opc_resu: 'S',
        fecha_ini_opc: this.global_HC709.fecha_ini,
        fecha_fin_opc: this.global_HC709.fecha_fin,
        opc_macro: this.macro.tipoMacro_HC709 + this.macro.codMacro_HC709,
      }

      var arrayDatos = {
        _ciudades: this._ciudades,
        _entidades: this._entidades,
        _ocupaciones: this._ocupaciones,
        reg_pac: $_REG_PACI,
        _paisesRips: this._paisesRips,
        _hcpac: hcprc,
        _especialidades: this._especialidades,
        _detalles: this._detalles,
        $_reg_hc: $_REG_HC,
        $_reg_paci: $_REG_PACI,
      }

      switch (esquema) {
        case '8031':
          await _iniciar_HCI8031(opciones, arrayDatos);
          break;
        case 'AI02':
          await iniciar_AIEPI020(opciones, arrayDatos);
          break;
        case 'AI01':
          await iniciar_AIEPI010(opciones, arrayDatos);
          break;
        default:
          await _iniciarHCI01(opciones, arrayDatos);
          break;
      }
    },

    async llamar_HCI02(evolucion, hcprc) {
      var jsonEvo = {
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
          opc_aper: this.opciones.opc_aper,
          opc_evo: this.opciones.opc_evo,
          opc_enf: this.opciones.opc_enf,
          opc_ter: this.opciones.opc_ter,
          opc_for: this.opciones.opc_for,
          opc_lab: this.opciones.opc_lab,
          opc_ima: this.opciones.opc_ima,
          opc_ord: this.opciones.opc_ord,
          opc_con: this.opciones.opc_con,
          opc_inc: this.opciones.opc_inc,
          opc_resu: this.opciones.opc_resu,
          fechaIni: this.global_HC709.fecha_ini,
          fechaFin: this.global_HC709.fecha_fin,
          opc_macro: this.macro.tipoMacro_HC709 + this.macro.codMacro_HC709,
        },
        arrayDatos_HCI02: {
          _ciudades: this._ciudades,
          _entidades: this._entidades,
          _ocupaciones: this._ocupaciones,
          reg_pac: $_REG_PACI,
          _hcpac: hcprc,
          _paisesRips: this._paisesRips,
          _especialidades: this._especialidades,
          _detalles: this._detalles,
        },
        resumido: true,
        todasFormu: false,
        opcion: 'masiva',
        _evolucion: evolucion
      };

      await _iniciarHCI02(jsonEvo)
    },

    salir_HC709() {
      this.flagSalir = true;
      _regresar_menuhis();
    },

    _ventanaTipoMacro_HC709() {
      POPUP(
        {
          array: this._tipoMacro,
          titulo: "TIPO DE MACRO",
          indices: [{ id: "CODIGO", label: "DESCRIP" }],
          seleccion: this.macro.tipoMacro_HC709,
          callback_f: () => {
            this.buscarMacro_HC709();
          },
        },
        (data) => {
          this.macro.tipoMacro_HC709 = data.CODIGO;
          _enterInput('.tipoMacro_HC709')
        }
      );
    },

    _ventanaCodigosMacro_HC709() {
      _ventanaDatos({
        titulo: "VENTANA CODIGOS DE MACROS",
        columnas: ["CLASE", "CODIGO", "DETALLE"],
        data: this._codigosMacro,
        callback_esc: function () {
          document.querySelector(".codMacro_HC709").focus();
        },
        callback: function (data) {
          $this.macro.codMacro_HC709 = data.CODIGO;
          _enterInput(".codMacro_HC709");
        },
      });
    },

    async cargarAperturas_HC709() {
      loader('show');
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + `|2|` + this.global_HC709.fecha_ini + '|' + this.global_HC709.fecha_fin }, get_url("APP/HICLIN/HC002B-1.DLL"))
        .then(async (data) => {
          this._aperturas = data.APERTURAS;
          this._aperturas.pop();
          for (var i in this._aperturas) {
            this._aperturas[i] = this._aperturas[i].HCPAC;
          }
          loader('hide');
        })
        .catch((err) => {
          console.log(err, "err");
          loader('hide');
          this.salir_HC709();
        });
    },

    async cargarEvoluciones_HC709() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + '2' + '|' }, get_url("app/HICLIN/HC002B.DLL"))
        .then((data) => {
          this._todasEvo = data.EVOLUCIONES;
          this._todasEvo.pop();
          this._cargarDetalles_HC709()
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          this.salir_HC709();
        });
    },

    async _cargarDetalles_HC709() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc.substring(0, 15) + '00000000' + "|**|**||" + '' + "|" }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this._detalles = data["DETHC"]
          this._detalles.pop()
          this._cargarPaisesRips_HC709()
        })
        .catch((err) => {
          console.log(err, "error")
          loader("hide")
          _regresar_menuhis()
        });
    },

    async _cargarPaisesRips_HC709() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
        .then((data) => {
          this._paisesRips = data.PAISESRIPS;
          this._paisesRips.pop();
          this._cargarEspecialidades_HC709();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarEspecialidades_HC709() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          this._especialidades = data.ESPECIALIDADES;
          this._especialidades.pop();
          this._cargarCiudades_HC709();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarCiudades_HC709() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          this._ciudades = data.CIUDAD;
          this._ciudades.pop();
          this._cargarEntidades_HC709();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarEntidades_HC709() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
        .then((data) => {
          this._entidades = data.ENTIDADES;
          this._entidades.pop();
          this._cargarOcupaciones_HC709();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarOcupaciones_HC709() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
        .then((data) => {
          this._ocupaciones = data.OCUPACIONES;
          this._ocupaciones.pop();
          this._cargarTipoMacro_HC709();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarTipoMacro_HC709() {
      try {
        $this._tipoMacro = _SER874($this._tipoMacro);
        $this._cargarCodigosMacro_HC709();
      } catch (err) {
        console.log(err, "err");
        loader("hide");
        _regresar_menuhis();
      }
    },

    async _cargarCodigosMacro_HC709() {
      postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
        .then((data) => {
          $this._codigosMacro = data.MACROS
          $this._codigosMacro.pop()
          loader("hide")
          this.buscarFechaIni_HC709('1')
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async modifyPdf() {
      const url = $_REG_HC.nombrePdf;
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      const pages = pdfDoc.getPages()
      for (var i in pages) {
        const pageAct = pages[i]
        const { width, height } = pageAct.getSize()
        pageAct.drawText(`PAG ${parseInt(i) + 1} de ${pages.length}`, {
          x: 480,
          y: height - 35,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        })
      }

      const pdfBytes = await pdfDoc.save()
      await unirPdfs_mainHc([pdfBytes], false, $_REG_HC.nombrePdf)
    },
  }
});
