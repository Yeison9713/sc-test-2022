
// CREACION - SANTIAGO.F - FEBRERO 16/2021

const {
  getObjRegEvo,
  getDatosGuardadoEvol,
} = require('../../HICLIN/scripts/reg_evo.js');

new Vue({
  el: '#HC004',
  data: {
    form: {
      año_HC004: '',
      mes_HC004: '',
      dia_HC004: '',
      hr_HC004: '',
      mn_HC004: '',

      medico_HC004: '',
      descripMedico_HC004: '',
      consultando_HC004: '',

      clMacro_HC004: '',
      macro_HC004: '',
      descripMacro_HC004: '',
      talla_HC004: '',
      peso_HC004: '',
      medPeso_HC004: '',
      imc_HC004: '',
      clMacroDescrip_HC004: '',

      descripTerap_HC004: '',

      diagnosticos: [
        { nro: '01', cod: '', descrip: '' },
        { nro: '02', cod: '', descrip: '' },
        { nro: '03', cod: '', descrip: '' },
        { nro: '04', cod: '', descrip: '' },
        { nro: '05', cod: '', descrip: '' },
      ],
    },

    mostrarHC604: false,

    paramsHC604: {
      estado: false,
    },

    datosHC604: {
      admin: localStorage.Usuario,
      llave: {
        id: $_REG_HC.llave_hc.slice(0, 15),
        folio: $_REG_HC.llave_hc.slice(15),
      },
      edad: {
        unidad: $_REG_HC.edad_hc.unid_edad,
        valor: $_REG_HC.edad_hc.vlr_edad,
      },
      medico: localStorage.IDUSU,
    },

    opcionesTipoFormu: [
      { text: "Medicamentos", value: 1 },
      { text: "Laboratorios", value: 2 },
      { text: "Imagen diagnosticos", value: 3 },
      { text: "Ordenes medicas", value: 4 },
      { text: "Consultas", value: 5 },
      { text: "Incapacidades medicas", value: 6 },
    ],

    reg_evo: getObjRegEvo(),
    fecha_act: moment().format("YYYYMMDD"),
  },

  components: {
    "nuevo-folio": component_hc604,
  },

  async created() {
    $this = this;
    await this.get_historia_HC004();
  },
  methods: {
    _inicializar_HC004() {
      loader('hide')
      _inputControl('disabled');
      _inputControl('reset');
      if (localStorage.idOpciondata == "02") {
        nombreOpcion('2 - Notas terapias y nutricion');
      } else {
        nombreOpcion('7-7 - reimprime notas terapeutas');
      }
      this.iniciar_HC004();
    },

    async iniciar_HC004() {
      await this.llenarDatos_HC004();

      if ($_USUA_GLOBAL[0].NIT == 900030814 || $_USUA_GLOBAL[0].NIT == 900450008 ||
        $_USUA_GLOBAL[0].NIT == 901146885 || $_USUA_GLOBAL[0].NIT == 830511298 ||
        $_USUA_GLOBAL[0].NIT == 822005547) {
        await this.validarAno_HC004();
      } else {
        if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC' || localStorage.Usuario == '0101') {
          await this.impresionEvolAnteriores_HC004(1);
        } else {
          await this.impresionEvolAnteriores_HC004(2);
        }
      }
    },

    async impresionEvolAnteriores_HC004(band) {
      CON851P(
        'Desea ver evoluciones anteriores?',
        async () => {
          if (band == 1) {
            await this.validarAno_HC004();
          } else {
            await this.buscarEvo_HC004();
          }
        },
        async () => {
          iniciar_HC002B(2);
          if (band == 1) {
            await this.validarAno_HC004();
          } else {
            await this.buscarEvo_HC004();
          }
        })
    },

    llenarDatos_HC004() {
      this.form.medico_HC004 = $_REG_PROF.IDENTIFICACION;
      this.form.descripMedico_HC004 = $_REG_PROF.NOMBRE;

      this.form.año_HC004 = parseInt(moment().format('YYYY'));
      this.form.mes_HC004 = parseInt(moment().format('MM'));
      this.form.dia_HC004 = parseInt(moment().format('DD'));

      this.form.hr_HC004 = moment().format('HH');
      this.form.mn_HC004 = moment().format('mm');
    },

    validarAno_HC004() {
      validarInputs(
        {
          form: "#ano_HC004",
          orden: '1',

          event_f5: () => {
            CON851P('03', () => { this.validarAno_HC004(); }, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
          },
        },
        () => {
          toastr.success('F5 PARA SALIR');
          this.validarAno_HC004();
        },
        () => {
          var ano_w = this.form.año_HC004;
          var ano_act = parseInt(moment().format('YYYY'));

          if (ano_w > ano_act || ano_w < (ano_act - 1)) {
            this.validarAno_HC004();
          } else {
            this.validarMes_HC004();
          }
        }
      );
    },

    validarMes_HC004() {
      validarInputs(
        {
          form: "#mes_HC004",
          orden: '1',
        },
        () => {
          this.validarAno_HC004();
        },
        () => {
          var mes_w = this.form.mes_HC004;

          if (mes_w < 1 || mes_w > 12) {
            this.validarAno_HC004();
          } else {
            this.validarDia_HC004();
          }
        }
      );
    },

    validarDia_HC004() {
      validarInputs(
        {
          form: "#dia_HC004",
          orden: '1',
        },
        () => {
          this.validarMes_HC004();
        },
        () => {
          var dia_w = this.form.dia_HC004;

          if (dia_w < 1 || dia_w > 31) {
            this.validarAno_HC004();
          } else {
            this.validarHora_HC004('1');
          }
        }
      );
    },

    validarHora_HC004(orden) {
      validarInputs(
        {
          form: "#time_HC004",
          orden: orden,
        },
        () => {
          this.validarAno_HC004();
        },
        () => {
          var hora_w = this.form.hr_HC004;
          var minut_w = this.form.mn_HC004;

          if (hora_w > 23) {
            this.validarHora_HC004('1');
          } else if (minut_w > 59) {
            this.validarHora_HC004('2');
          } else {
            // valida si existe la evolcuion
            this.buscarEvo_HC004();
          }
        }
      );
    },

    async buscarEvo_HC004() {
      this.form.mes_HC004 = cerosIzq(this.form.mes_HC004, 2);
      this.form.dia_HC004 = cerosIzq(this.form.dia_HC004, 2);

      this.form.hr_HC004 = cerosIzq(this.form.hr_HC004, 2);
      this.form.mn_HC004 = cerosIzq(this.form.mn_HC004, 2);

      var id_w = $_REG_PACI["COD"];
      var folio_w = $this._hcprc.llave.substring(15);

      var fecha_w = `${this.form.año_HC004}${this.form.mes_HC004}${this.form.dia_HC004}`;
      var hora_W = `${this.form.hr_HC004}${this.form.mn_HC004}`;
      var oper_w = localStorage.Usuario;

      this.reg_evo.FECHA_EVO = `${this.form.año_HC004}${this.form.mes_HC004}${this.form.dia_HC004}`;
      this.reg_evo.ANO_EVO = this.form.año_HC004;
      this.reg_evo.MES_EVO = this.form.mes_HC004;
      this.reg_evo.DIA_EVO = this.form.dia_HC004;
      this.reg_evo.HORA_EVO = hora_W;
      this.reg_evo.OPER_EVO = oper_w;

      // var llave_evo = `${id_w}${folio_w}${fecha_w}${hora_W}${oper_w}`;
      this.reg_evo.LLAVE_EVO = `${id_w}${folio_w}${fecha_w}${hora_W}${oper_w}`;
      console.log('llave evo: ', this.reg_evo.LLAVE_EVO);

      this.busqEvo = this._evoluciones.find((e) => e.LLAVE_EVO == this.reg_evo.LLAVE_EVO);
      if (this.busqEvo != undefined) {
        // si nov es 8 que consulte el hc002 de gaby y moverlo a this.reg_evo
        this.consultarEvo_HC004();
      } else {
        this.crearEvo_HC004();
      }
    },

    async consultarEvo_HC004() {
      loader('show');
      const llave = this.busqEvo.ID_EVO + this.busqEvo.FOLIO_EVO;
      postData({
        datosh: datosEnvio() + llave + '|' + this.busqEvo.OPER_ELAB_EVO + '|' + this.busqEvo.MEDICO_EVO + '|' + this.busqEvo.FECHA_EVO + '|' + this.busqEvo.HORA_EVO + '|' + 'CONS' + '|'
      }, get_url('APP/HICLIN/HC002.DLL'))
        .then((data) => {
          loader('hide')

          this.reg_evo = {
            ...this.reg_evo,
            ...data.EVOLUCION[0]
          }

          this.reg_evo.NOVEDAD = '8';

          this.consultarTablaEvo();
        }).catch((err) => {
          loader('hide');
          console.log('Error', err);
          CON851('', 'consultando datos evolucion', null, 'error', 'Error');
          _regresar_menuhis();
        });
    },

    async consultarTablaEvo() {
      const llave = this.busqEvo.ID_EVO + this.busqEvo.FOLIO_EVO;
      await postData({ datosh: datosEnvio() + llave + '|' + this.busqEvo.FECHA_EVO + '|' + this.busqEvo.HORA_EVO + '|' + this.busqEvo.OPER_ELAB_EVO + '|' + '1' + '|CONS|' }, get_url("app/HICLIN/HCDETA_EVO.DLL"))
        .then(data => {
          this.tabla_evo = data.DETALLE_EVO[0].CONTENIDO;
          this.tabla_evo == undefined ? $_HCI02.tabla_evo = '' : false;
          this.continue_HC004();
        }).catch(err => {
          console.log(err, 'error')
          _regresar_menuhis();
        })
    },

    async crearEvo_HC004() {
      this.reg_evo.NOVEDAD = '7';
      this.reg_evo.TIPO = '3';
      this.reg_evo.MEDICO = this.form.medico_HC004;
      this.reg_evo.UNSERV = this._hcprc.cierre.unserv;
      this.reg_evo.RIPS.UNID_EDAD = this._hcprc.edad.substring(0,1);
      this.reg_evo.RIPS.EDAD = this._hcprc.edad.substring(1);
      this.reg_evo.RIPS.ATIENDE = $_REG_PROF.ATIENDE_PROF;
      this.reg_evo.HAB = this._hcprc.cierre.hab;

      this.form.macro_HC004 = cerosIzq(this.form.macro_HC004, 6);
      this.continue_HC004();
    },

    continue_HC004() {
      var busqUnserv = this._unserv.find(e => e['COD'] == this.reg_evo.UNSERV);
      if (busqUnserv != undefined) {
        this.form.consultando_HC004 = busqUnserv.DESCRIP;
      } else {
        CON851('01', '01', null, 'error', 'error');
        this.validarAno_HC004();
      }

      console.log(this.reg_evo);

      if (this.reg_evo.NOVEDAD == '8') {
        // cuando noved es 8 muestra los datos de la evo
        toastr.success("ACTUALIZANDO");

        switch (this.reg_evo.MACRO.CLASE) {
          case '1':
            this.form.clMacroDescrip_HC004 = 'CIRUGIAS';
          case '2':
            this.form.clMacroDescrip_HC004 = ' PROCEDIMIENTOS';
          case '4':
            this.form.clMacroDescrip_HC004 = 'ENFERMERIA';
          case '5':
            this.form.clMacroDescrip_HC004 = 'MEDICINA GENERAL';
          case '6':
            this.form.clMacroDescrip_HC004 = 'MEDICINA ESPECIALIZ';
          case '7':
            this.form.clMacroDescrip_HC004 = 'RESUMENES HISTORIA';
          case '8':
            this.form.clMacroDescrip_HC004 = 'TERAPIAS';
        }
        this.form.clMacro_HC004 = this.reg_evo.MACRO.CLASE;
        this.form.macro_HC004 = this.reg_evo.MACRO.CODIGO;

        if (this.reg_evo.MACRO.CODIGO == '000000') {
          // continue
          this.continue2_HC004();
        } else {
          this.busqMacro = this._codigos.find(e => e.CLASE.concat(e.CODIGO) == this.form.clMacro_HC004.concat(this.form.macro_HC004));
          if (this.busqMacro != undefined) {
            this.form.descripMacro_HC004 = busqMacro.DETALLE;
            // continue
            this.continue2_HC004();
          } else {
            CON851('01', '01', null, 'error', 'error');
            this.validarAno_HC004();
          }
        }

        this.form.descripTerap_HC004 = this.tabla_evo.replace(/(?:\&)/g, "\n");;

        for (var i in this.reg_evo.TABLA_DIAGNOSTICOS) {
          if (i < 5) {
            this.form.diagnosticos[i].cod = this.reg_evo.TABLA_DIAGNOSTICOS[i];
            var busq = this._enfermedades.find(e => e.COD_ENF == this.form.diagnosticos[i].cod);
            if (busq != undefined) {
              this.form.diagnosticos[i].descrip = busq.NOMBRE_ENF;
            } else {
              this.form.diagnosticos[i].descrip = '';
            }
          }
        }


      } else {
        toastr.success("CREANDO");
        this.continue2_HC004();
      }

    },

    continue2_HC004() {
      this.form.clMacro_HC004 = '8';
      this.form.clMacroDescrip_HC004 = 'TERAPIAS';

      if ($_USUA_GLOBAL[0].NIT == 830511298 || $_USUA_GLOBAL[0].NIT == 822001570 ||
        $_USUA_GLOBAL[0].NIT == 800037202 || $_USUA_GLOBAL[0].NIT == 844003205 ||
        $_USUA_GLOBAL[0].NIT == 900004059 && this._hcprc.serv == '63') {
        this.validarMacro_HC004();
      } else if ($_REG_PROF.ATIENDE_PROF == '8') {
        // dato nutricion, captura talla, peso e i.m.c

        this.form.talla_HC004 = this.reg_evo.SIGNOS_VITALES.TALLA;

        if (this.reg_evo.PESO_NEW != "") {
          this.form.peso_HC004 = this.reg_evo.PESO_NEW;
        } else {
          if (this.reg_evo.SIGNOS_VITALES.UNID_PESO == '2') {
            this.form.medPeso_HC004 = 'Gr';
            this.form.peso_HC004 = this.reg_evo.SIGNOS_VITALES.PESO_GRAMOS;
          } else {
            this.form.medPeso_HC004 = 'Kg';
            this.form.peso_HC004 = this.reg_evo.SIGNOS_VITALES.PESO;
          }
        }

        this.validarTalla_HC004();
      } else {
        this.validarMacro_HC004();
      }
    },

    validarTalla_HC004() {
      validarInputs(
        {
          form: "#validarTalla_HC004",
          orden: '1',

          event_f5: () => {
            CON851P('03', () => { this.validarTalla_HC004(); }, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
          },
        },
        () => {
          toastr.success('F5 PARA SALIR');
          this.validarTalla_HC004();
        },
        () => {
          var talla = parseInt(this.form.talla_HC004);
          if (talla < 10 || talla > 230) {
            CON851('03', '03', null, 'error', 'error');
            this.validarTalla_HC004();
          } else {
            this.reg_evo.SIGNOS_VITALES.TALLA = this.form.talla_HC004;
            // continue
            this.validarPeso_HC004();
          }
        }
      );
    },

    validarPeso_HC004() {
      if (this.reg_evo.RIPS.UNID_EDAD == 'D' || (this.reg_evo.RIPS.UNID_EDAD == 'M' && parseInt(this.reg_evo.RIPS.EDAD) < 3)) {
        this.reg_evo.SIGNOS_VITALES.UNID_PESO = '2';
      } else {
        this.reg_evo.SIGNOS_VITALES.UNID_PESO = '1';
      }

      if (this.reg_evo.SIGNOS_VITALES.UNID_PESO == '2') {
        this.form.medPeso_HC004 = 'Gr';
      } else {
        this.form.medPeso_HC004 = 'Kg';
      }
      validarInputs(
        {
          form: "#validarPeso_HC004",
          orden: '1',
        },
        () => {
          this.validarTalla_HC004();
        },
        () => {
          var peso = parseFloat(this.form.peso_HC004);

          switch (this.reg_evo.SIGNOS_VITALES.UNID_PESO) {
            case '1':
              if (peso < 2 || peso > 300) {
                CON851('03', '03', null, 'error', 'error');
                this.validarPeso_HC004();
              } else {
                // continue
                this.reg_evo.PESO_NEW = peso.toString();
                this.validarIMC_HC004();
              }
              break;
            case '2':
              if (peso < 500 || peso > 20000) {
                CON851('03', '03', null, 'error', 'error');
                this.validarPeso_HC004();
              } else {
                this.reg_evo.PESO_NEW = (peso / 1000).toString();
                // continue
                this.validarIMC_HC004();
              }
              break;
          }
        }
      );
    },

    async validarIMC_HC004() {
      var talla_w = this.reg_evo.SIGNOS_VITALES.TALLA;

      if (this.reg_evo.PESO_NEW != "") {
        var peso_w = this.reg_evo.PESO_NEW;
      } else {
        if (this.reg_evo.SIGNOS_VITALES.UNID_PESO == '2') {
          peso_w = this.reg_evo.SIGNOS_VITALES.PESO_GRAMOS;
        } else {
          peso_w = this.reg_evo.SIGNOS_VITALES.PESO;
        }
      }

      if (parseFloat(talla_w) == 0 || parseFloat(peso_w) == 0) {
        this.form.imc_HC004 = 0;
        this.reg_evo.SIGNOS_VITALES.IMC_CORP = this.form.imc_HC004;
        // continue
      } else {
        this.form.imc_HC004 = (parseFloat(peso_w) / ((parseFloat(talla_w) / 100) ** 2)).toFixed(2).toString().padStart(2);
        this.reg_evo.SIGNOS_VITALES.IMC_CORP = this.form.imc_HC004;
      }

      if (this.reg_evo.RIPS.UNID_EDAD == 'A' && parseInt(this.reg_evo.RIPS.EDAD) > 15) {
        if (parseFloat(this.reg_evo.SIGNOS_VITALES.IMC_CORP) >= 30) {
          CON851('BC', 'BC', null, 'warning', 'Advertencia');
        } else if (parseFloat(this.reg_evo.SIGNOS_VITALES.IMC_CORP) >= 25) {
          CON851('BB', 'BB', null, 'warning', 'Advertencia');
        } else if (parseFloat(this.reg_evo.SIGNOS_VITALES.IMC_CORP) < 16) {
          CON851('BE', 'BE', null, 'warning', 'Advertencia');
        } else if (parseFloat(this.reg_evo.SIGNOS_VITALES.IMC_CORP) <= 17) {
          CON851('BB', 'BB', null, 'warning', 'Advertencia');
        }
      }

      this.validarMacro_HC004();
    },

    validarMacro_HC004() {
      validarInputs(
        {
          form: "#validarCodMacro_HC004",
          orden: "1",

          event_f5: () => {
            CON851P('03', () => { this.validarMacro_HC004(); }, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
          },
        },
        () => {
          toastr.success('F5 PARA SALIR');
          this.validarMacro_HC004();
        },
        () => {
          var macro = this.form.macro_HC004;

          if (macro == '000000') {

            if (($_USUA_GLOBAL[0].NIT == 900450008 || $_USUA_GLOBAL[0].NIT == 901146885) &&
              ($_REG_PROF.ATIENDE_PROF == '1' || $_REG_PROF.ATIENDE_PROF == '5' || $_REG_PROF.ATIENDE_PROF == '7') &&
              this.reg_evo.UNSERV == '03') {
              CON851('02', '02', null, 'error', 'error');
              this.validarMacro_HC004();
            } else {
              // continue
              this.reg_evo.MACRO.CLASE = this.form.clMacro_HC004;
              this.reg_evo.MACRO.CODIGO = this.form.macro_HC004;
              this.validarDescripTerap_HC004();
            }

          } else {

            var busqMacros = this._codigos.filter(e => e.CLASE == this.form.clMacro_HC004);
            this.busqMacro = busqMacros.find(e => e.CLASE.concat(e.CODIGO) == this.form.clMacro_HC004.concat(macro));
            if (this.busqMacro != undefined) {
              this.form.descripMacro_HC004 = busqMacro.DETALLE;
              this.reg_evo.MACRO.CLASE = this.form.clMacro_HC004;
              this.reg_evo.MACRO.CODIGO = this.form.macro_HC004;
              // continue
              this.validarDescripTerap_HC004();
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.validarMacro_HC004();
            }
          }
        }
      );
    },

    validarDescripTerap_HC004() {
      toastr.success("F3 para continuar");
      validarInputs(
        {
          form: "#validarDescrip_terap_HC004",
          orden: "1",
        },
        () => {
          this.validarMacro_HC004();
        },
        () => {
          this.form.descripTerap_HC004 = this.form.descripTerap_HC004.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');
          if (this.form.descripTerap_HC004.trim() != "") {
            this.validarDiagnosticos_HC004(0);
          } else {
            this.validarDescripTerap_HC004();
          }
        }
      );
    },

    validarDiagnosticos_HC004(pos) {
      if (pos > 4) {
        // continue
        this.grabar_evo_HC004();
      } else {
        validarInputs(
          {
            form: "#validarCod_diag_" + pos + "_HC004",
            orden: "1",

            event_f5: () => {
              CON851P('03', () => { this.validarDiagnosticos_HC004(pos); }, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
            },

          },
          () => {
            if (pos == 0) {
              this.validarDescripTerap_HC004();
            } else {
              this.validarDiagnosticos_HC004(pos - 1)
            }
          },
          () => {
            this.form.diagnosticos[pos].cod = this.form.diagnosticos[pos].cod.toUpperCase();
            var diagn = this.form.diagnosticos[pos].cod;
            // if (diagn.trim() == '' && pos == 0) {
            //   CON851('01', '01', null, 'error', 'error');
            //   this.validarDiagnosticos_HC004(pos);
            // } else {
              if (this.form.diagnosticos[pos].cod.trim() == '') {
                for (var i in this.form.diagnosticos) {
                  if (i >= pos) {
                    this.form.diagnosticos[i].cod = '';
                    this.form.diagnosticos[i].descrip = '';
                  }
                }
                this.grabar_evo_HC004();
              } else {
                this.busqEnf = this._enfermedades.find(e => e.COD_ENF == this.form.diagnosticos[pos].cod);
                if (this.busqEnf != undefined) {
                  this.form.diagnosticos[pos].descrip = this.busqEnf.NOMBRE_ENF;
                  this.reg_evo.TABLA_DIAGNOSTICOS[pos] = this.form.diagnosticos[pos].cod;
                  this.validarDiagnosticos_HC004(pos + 1);
                } else {
                  CON851('01', '01', null, 'error', 'error');
                  this.validarDiagnosticos_HC004(pos);
                }
              }
            // }
          }
        );
      }
    },

    grabar_evo_HC004() {
      CON851P(
        '01',
        () => {
          this.validarDiagnosticos_HC004(0);
        },
        () => {
          let datos_envio = getDatosGuardadoEvol(this.reg_evo, localStorage.Usuario);
          // datos_envio.SOL_MED_GENERAL = this.sol_med_general;
          postData(datos_envio, get_url('APP/HICLIN/SAVE_EVOL.DLL'))
            .then((data) => {
              console.log('Data save_evol: ', data);
              CON851('', 'Ok', null, 'success', 'Evolución grabada con exito');


              if (this.reg_evo.NOVEDAD == '7') {
                $_REG_HC.opc_llamado = '2';
              }

              this.grabar_detalle_evolucion_HC004();
            })
            .catch((err) => {
              CON851('', 'Ha ocurrido un error guardando informacion de la evolución', null, 'error', 'Error');
              console.log('Error grabado evolucion: ', err)
              _regresar_menuhis();
            })
        });
    },

    grabar_detalle_evolucion_HC004() {
      let data = {};

      data.datosh = datosEnvio() + this.reg_evo.LLAVE_EVO + '|' + '1' + '|';

      let detalle = JSON.parse(JSON.stringify(this.form.descripTerap_HC004.replace(/(\r\n|\n|\r)/gm, "&")));

      let posicion = 0;
      let contadorLin = 0;
      let contadorTotal = 0;
      let linea = '';
      let maximo = 90;

      detalle.split('').forEach((item, i) => {
        contadorTotal = i + 1
        contadorLin = contadorLin + 1

        switch (item) {
          case 'á':
          case 'é':
          case 'í':
          case 'ó':
          case 'ú':
          case 'Á':
          case 'É':
          case 'Í':
          case 'Ó':
          case 'Ú':
          case 'ñ':
          case 'Ñ':
          case '!':
          case '"':
          case '#':
          case '$':
          case '%':
          case '/':
          case '(':
          case ')':
          case '=':
          case '?':
          case '*':
          case '+':
          case '-':
          case '@':
          case '>':
          case '<':
            maximo = maximo + 1
            break;
        }
        linea += item

        if (contadorLin == maximo || detalle.length == contadorTotal) {
          posicion = posicion + 1

          data["RENG_DEVO_" + posicion.toString().padStart(3, "0")] = linea
          contadorLin = 0
          linea = ''
          maximo = 90
        }
      })

      console.log(data);

      postData(data, get_url('APP/HICLIN/SAVE_DETEVO.DLL'))
        .then((data) => {
          console.log(data)
          CON851('', 'Ok', null, 'success', 'Detalles grabados con exito');
          this.llamarFormulacion_HC004();
        })
        .catch((error) => {
          console.log(error)
          CON851('', 'Error grabando detalles', null, 'error', 'Error');
          jAlert({
            titulo: "ATENCION!",
            mensaje: "<b>Mensaje: </b>Ha ocurrido un error grabando los detalles!<br>"
          },
            () => {
              setTimeout(() => {
                this.grabar_detalle_evolucion_HC004()
              }, 300)
            }
          );
        })
    },

    llamarFormulacion_HC004() {
      var fecha_w = `${this.form.año_HC004}${this.form.mes_HC004}${this.form.dia_HC004}`;
      var hora_W = `${this.form.hr_HC004}${this.form.mn_HC004}`;
      var oper_w = localStorage.Usuario;

      console.log(fecha_w);
      console.log(hora_W);
      console.log(oper_w);

      $_REG_HC.fecha_lnk = fecha_w;
      $_REG_HC.hora_lnk = hora_W;
      $_REG_HC.oper_lnk = oper_w;
      $_REG_HC.tipo_evo = '3'

      $("#body_main").load("../../HICLIN/paginas/HC002F.html");
    },

    _titleVentanaIndicaciones_HC004() {
      var text = "";
      if (this.tipoFormu == "1") {
        text = "DOSIS";
      } else {
        text = "INDICACIONES";
      }
      return text;
    },

    _ventanaMacro_HC004() {
      var busqMacros = this._codigos.filter(e => e.CLASE == this.form.clMacro_HC004);
      _ventanaDatos({
        titulo: "VENTANA MACROS",
        columnas: ["CLASE", "CODIGO", "DETALLE"],
        data: busqMacros,
        callback_esc: function () {
          document.querySelector('.macro_HC004').focus();
        },
        callback: function (data) {
          $this.form.clMacro_HC004 = data.CLASE;
          $this.form.macro_HC004 = data.CODIGO;
          $this.form.descripMacro_HC004 = data.DETALLE;
          _enterInput('.macro_HC004');
        },
      });
    },

    async _ventanaDiagnosticos_HC004(pos) {
      await _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: $this._enfermedades,
        callback_esc: function () {
          document.querySelector(`.codDiag_${pos}_HC004`).focus();
        },
        callback: async function (data) {
          $this.form.diagnosticos[pos].cod = data['COD_ENF'].trim();
          $this.form.diagnosticos[pos].descrip = data['NOMBRE_ENF'].trim();
          setTimeout(() => { _enterInput(`.codDiag_${pos}_HC004`); console.log('sale') }, 200);
        }
      });
    },

    async get_historia_HC004() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
        .then(data => {
          this._hcprc = data.HCPAC;

          if (this._hcprc.novedad == "7") {
            CON851P(
              "13",
              () => {
                _regresar_menuhis();
              },
              () => {
                this.mostrarHC604 = true;
                setTimeout(() => {
                  this.paramsHC604.estado = true;
                });
              }
            );
          } else {
            this.cargarArchivos_HC004();
          }

        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        });
    },

    validarEsc_nuevoFolio() {
      this.mostrarHC604 = this.paramsHC604.estado = false;
      CON851P(
        "03",
        () => {
          _regresar_menuhis();
        },
        () => {
          this.get_historia_HC004();
        }
      );
    },

    async validarCallback_nuevoFolio() {
      this.mostrarHC604 = this.paramsHC604.estado = false;
      await this.get_historia_HC004();
    },

    async cargarArchivos_HC004() {
      loader('show');

      await postData(
        {
          datosh:
            `${datosEnvio()}${$_REG_PACI["COD"]}|${$_REG_HC["suc_folio_hc"] + $_REG_HC["nro_folio_hc"]}|3|`
        }, get_url("app/HICLIN/HC705B.DLL"))
        .then((data) => {
          this._evoluciones = data.EVOLUCIONES;
          this._evoluciones.pop();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });

      await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
        .then((data) => {
          this._codigos = data.MACROS;
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          _regresar_menuhis();
        });

      await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          this._enfermedades = data.ENFERMEDADES
          this._enfermedades.pop()

          for (var i in this._enfermedades) {
            this._enfermedades[i].NOMBRE_ENF = $this._enfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
          }
        })
        .catch(err => {
          console.log(err, 'err')
          loader('hide');
          _regresar_menuhis();
        });

      await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unserv = data.UNSERV;
          this._unserv.pop();
          loader('hide')
          this._inicializar_HC004();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _regresar_menuhis();
        });
    }
  },
})