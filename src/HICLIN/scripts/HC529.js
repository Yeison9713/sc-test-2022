
// CREACION - SANTIAGO.F - OCTUBRE 22/2020

var $this;
var $_HC529 = [];

var arrayHCI529 = [];
var arrayCups_HCI529 = [];

var activar;
var retrocedio_HC529 = 1;
var novedad_w;

// tipo 1 es materiales cirugias y el tipo 2 materiales enfermeria
var tipo_w = 2;
var admin_w;

new Vue({
  el: '#HC529',
  data: {
    form: {
      descripAtiende_529: '',
      cargo_529: '',
      numero_529: '',
      año_529: '',
      mes_529: '',
      dia_529: '',
      hora_529: '',
      minutos_529: '',
      unserv_529: '',
      descripUnserv_529: '',

      descripId_529: '',
      sala_529: '',
      prefijo_529: '',
      fact_529: '',
      descripFact_529: '',

      cirujano_529: '',
      descripCirujano_529: '',
      anestesiologo_529: '',
      descripAnestesiologo_529: '',
      ayudante_529: '',
      descripAyudante_529: '',
      instrumentador_529: '',
      descripInstrumentador_529: '',
      circulante_529: '',
      descripCirculante_529: '',

      cx1_529: '',
      descripCx1_529: '',
      cx2_529: '',
      descripCx2_529: '',
      cx3_529: '',
      descripCx3_529: '',
      cx4_529: '',
      descripCx4_529: '',
      cx5_529: '',
      descripCx5_529: '',

      itm_529: '',
      grp_529: '',
      articulos_529: '',
      descripArticulo_529: '',
      cantidad_529: '',
    },

    hc529: {
      tablaGastos: [],
    },

    tabla_gastos: {
      item: '',
      grupo: '',
      articulo: '',
      descripArt: '',
      cantidad: '',
    },

    fecha_act: moment().format('YYYYMMDD'),
    dataArray: new Object(),
    data_evo: new Object()
  },
  async created() {
    await this.cargarArchivos_HC529();
  },
  methods: {
    _inicializar_HC529() {
      loader('hide')
      $this = this;
      _inputControl('disabled');
      _inputControl('reset');
      if (localStorage.idOpciondata == "0529") {
        nombreOpcion('5-2-9 - Hoja de Gastos');
      } else {
        nombreOpcion('7-C-9 - Hoja de Gastos');
      }
      this.init_HC529();
    },

    async init_HC529() {
      $this = this;
      await this.llenarDatosMedico_HC529();
      await this.validarNumero_HC529();
    },

    llenarDatosMedico_HC529() {

      var tipo_medico;
      $this.form.descripAtiende_529 = $_REG_PROF.NOMBRE.replace(/\s+/g, ' ');

      switch ($_REG_PROF.ATIENDE_PROF) {
        case '1': tipo_medico = 'MEDICO ESPECIALISTA'; break;
        case '2': tipo_medico = 'MEDICO GENERAL'; break;
        case '3': tipo_medico = 'ENFERMERA'; break;
        case '4': tipo_medico = 'MEDICO AUX.ENFERMERIA'; break;
        case '5': tipo_medico = 'TERAPIAS Y OTROS'; break;
        case '6': tipo_medico = 'ENFERMERA GEFE PYP'; break;
        case '7': tipo_medico = 'PSICOLOGIA'; break;
        case '8': tipo_medico = 'NUTRICIONISTA'; break;
        case 'A': tipo_medico = 'ODONTOLOGO'; break;
        case 'H': tipo_medico = 'HIGIENISTA ORAL'; break;
        case 'I': tipo_medico = 'INSTRUMENTACION'; break;
        case 'O': tipo_medico = 'OPTOMETRIA'; break;
        case 'T': tipo_medico = 'TRABAJO SOCIAL'; break;
      }

      $this.form.cargo_529 = tipo_medico;

    },

    validarNumero_HC529() {
      $this = this
      $this.form.numero_529 == '' ? this.form.numero_529 = parseInt($_HC529.numero_ctl) : false;
      validarInputs(
        {
          form: "#validarnumero_HC529",
          orden: '1',
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          var numer_gto = cerosIzq($this.form.numero_529, 6);

          if (numer_gto == $_HC529.numero_ctl) {
            novedad_w = 7;
          } else {
            novedad_w = 8;
          }

          console.log("novedad: ", novedad_w);

          if (localStorage.idOpciondata == "07C9") {
            var res = $_HC529._gastosCiru.find(e => e.NUMERO == numer_gto);
            if (res != undefined) {
              if (novedad_w == 8) {
                // imprime
                this.llenarRegistroEncontrado_HC529(res);
              } else {
                CON851('01', '01', null, 'error', 'error');
                this.validarNumero_HC529();
              }
            } else {
                CON851('01', '01', null, 'error', 'error');
                this.validarNumero_HC529();
            }
          } else {
            var res = $_HC529._gastosCiru.find(e => e.NUMERO == numer_gto);
            if (res != undefined) {
              if (novedad_w == 7) {
                $this.form.numero_529 = parseInt(numer_gto) + 1;
                this.validarNumero_HC529();
                // si la novedad es 7 y encuentra el registro suma 1 a numero_gto y se devuelve
              } else {
                // muestra registro encontrado
                this.llenarRegistroEncontrado_HC529(res);
              }
            } else {
              if (novedad_w == 7) {
                // continua para grabar uno nuevo
                this.llenarRegistro_HC529();
              } else {
                CON851('01', '01', null, 'error', 'error');
                this.validarNumero_HC529();
              }
            }
          }
        }
      )
    },

    async llenarRegistroEncontrado_HC529(datos) {
      $this = this
      $this.form.año_529 = datos.FECHA.substring(7,11);
      var mes = datos.FECHA.substring(0,3);
      $this.form.dia_529 = datos.FECHA.substring(4,6);

      if (tipo_w == 1) {
        arrayHCI529.operador = datos.OPER_INST;
      } else {
        arrayHCI529.operador = datos.OPER_ELAB;
      }

      var mes_edit;
      switch (mes) {
        case "ENE":
          mes_edit = "01";
          break;
        case "FEB":
          mes_edit = "02";
          break;
        case "MAR":
          mes_edit = "03";
          break;
        case "ABR":
          mes_edit = "04";
          break;
        case "MAY":
          mes_edit = "05";
          break;
        case "JUN":
          mes_edit = "06";
          break;
        case "JUL":
          mes_edit = "07";
          break;
        case "AGT":
          mes_edit = "08";
          break;
        case "SEP":
          mes_edit = "09";
          break;
        case "OCT":
          mes_edit = "10";
          break;
        case "NOV":
          mes_edit = "11";
          break;
        case "DIC":
          mes_edit = "12";
          break;
        default:
          mes_edit = "";
          break;
      }

      $this.form.mes_529 = mes_edit;

      $this.form.hora_529 = moment().format('HH');
      $this.form.minutos_529 = moment().format('mm');

      $this.form.unserv_529 = datos.UNSERV;
      var busqUnserv = $_HC529._unserv.find(e => e.COD == datos.UNSERV);
      if (busqUnserv != undefined) {
        $this.form.descripUnserv_529 = busqUnserv.DESCRIP;
      } else {
        $this.form.descripUnserv_529 = "";
      }

      $this.form.descripId_529 = parseInt($_REG_PACI.COD) + '           ' + $_REG_PACI.DESCRIP.trim();

      $this.form.sala_529 = datos.SALA;
      $this.form.prefijo_529 = datos.PREF;
      $this.form.fact_529 = datos.NRO_CTA;

      var llave_num = datos.PREF.toUpperCase() + datos.NRO_CTA;

      await postData({ datosh: datosEnvio() + llave_num }, get_url("APP/SALUD/SER808-01.DLL"))
        .then((data) => {
          $_HC529._numer = data.NUMER19;

          if ($_HC529._numer[0]['IDPAC_NUM'] != "000000000000001"
                && $_HC529._numer[0]['IDPAC_NUM'] != $_REG_PACI.COD) {
                  CON851('06', '06', null, 'error', 'error');
            } else {
              // continue
              $this.form.descripFact_529 = $_HC529._numer[0]['DESCRIP_NUM'];
            }
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          // _regresar_menuhis();
        });

      if (parseInt(datos.COD_CX) != 0) {
        $this.form.cirujano_529 = parseInt(datos.COD_CX);

        var busqProf = $_HC529._profesionales.find(e => e.IDENTIFICACION == parseInt(datos.COD_CX));
        if (busqProf != undefined) {
          // continue
          $this.form.descripCirujano_529 = busqProf.NOMBRE.replace(/\s+/g, ' ');
        }

      } else {
        $this.form.cirujano_529 = "";
      }

      if (parseInt(datos.COD_ANE) != 0) {
        $this.form.anestesiologo_529 = parseInt(datos.COD_ANE);

        var busqProf = $_HC529._profesionales.find(e => e.IDENTIFICACION == parseInt(datos.COD_ANE));
        if (busqProf != undefined) {
          // continue
          $this.form.descripAnestesiologo_529 = busqProf.NOMBRE.replace(/\s+/g, ' ');
        }
      } else {
        $this.form.anestesiologo_529 = "";
      }

      if (parseInt(datos.COD_AYU) != 0) {
        $this.form.ayudante_529 = parseInt(datos.COD_AYU);

        var busqProf = $_HC529._profesionales.find(e => e.IDENTIFICACION == parseInt(datos.COD_AYU));
        if (busqProf != undefined) {
          // continue
          $this.form.descripAyudante_529 = busqProf.NOMBRE.replace(/\s+/g, ' ');
        }
      } else {
        $this.form.ayudante_529 = "";
      }

      if (parseInt(datos.COD_INS) != 0) {
        $this.form.instrumentador_529 = parseInt(datos.COD_INS);

        var busqProf = $_HC529._profesionales.find(e => e.IDENTIFICACION == parseInt(datos.COD_INS));
        if (busqProf != undefined) {
          // continue
          $this.form.descripInstrumentador_529 = busqProf.NOMBRE.replace(/\s+/g, ' ');
        }
      } else {
        $this.form.instrumentador_529 = "";
      }

      if (parseInt(datos.COD_CIR) != 0) {
        $this.form.circulante_529 = parseInt(datos.COD_CIR);

        var busqProf = $_HC529._profesionales.find(e => e.IDENTIFICACION == parseInt(datos.COD_CIR));
        if (busqProf != undefined) {
          // continue
          $this.form.descripCirculante_529 = busqProf.NOMBRE.replace(/\s+/g, ' ');
        }
      } else {
        $this.form.circulante_529 = "";
      }

      $this.form.cx1_529 = datos.CUPS[0].CUPS;

      var bsuqCup = $_HC529._cups.find(e => e.LLAVE.trim() == datos.CUPS[0].CUPS);
      if (bsuqCup != undefined) {
        $this.form.descripCx1_529 = bsuqCup.DESCRIP;
      } else {
        $this.form.descripCx1_529 = "";
      }

      $this.form.cx2_529 = datos.CUPS[1].CUPS;

      var bsuqCup = $_HC529._cups.find(e => e.LLAVE.trim() == datos.CUPS[1].CUPS);
      if (bsuqCup != undefined) {
        $this.form.descripCx2_529 = bsuqCup.DESCRIP;
      } else {
        $this.form.descripCx2_529 = "";
      }

      $this.form.cx3_529 = datos.CUPS[2].CUPS;

      var bsuqCup = $_HC529._cups.find(e => e.LLAVE.trim() == datos.CUPS[2].CUPS);
      if (bsuqCup != undefined) {
        $this.form.descripCx3_529 = bsuqCup.DESCRIP;
      } else {
        $this.form.descripCx3_529 = "";
      }

      $this.form.cx4_529 = datos.CUPS[3].CUPS;

      var bsuqCup = $_HC529._cups.find(e => e.LLAVE.trim() == datos.CUPS[3].CUPS);
      if (bsuqCup != undefined) {
        $this.form.descripCx4_529 = bsuqCup.DESCRIP;
      } else {
        $this.form.descripCx4_529 = "";
      }

      $this.form.cx5_529 = datos.CUPS[4].CUPS;

      var bsuqCup = $_HC529._cups.find(e => e.LLAVE.trim() == datos.CUPS[4].CUPS);
      if (bsuqCup != undefined) {
        $this.form.descripCx5_529 = bsuqCup.DESCRIP;
      } else {
        $this.form.descripCx5_529 = "";
      }

      if (datos.ARTIC.length > 0) {
        datos.ARTIC.pop();
      }

      for (var i in datos.ARTIC) {

        if (i > 0) {
          retrocedio_HC529 = retrocedio_HC529 + 1;
        }

        var busq = $_HC529._articulos.find(e => e.LLAVE_ART.trim() == datos.ARTIC[i].ART_COMP);
        if (busq != undefined) {
          var descrip = busq.DESCRIP_ART;
        } else {
          var descrip = "";
        }

        $this.hc529.tablaGastos.push({
          item: retrocedio_HC529,
          grupo: datos.ARTIC[i].GRUPO,
          articulo: datos.ARTIC[i].ART_COMP,
          descripArt: descrip,
          cantidad: datos.ARTIC[i].CANT,
        })
      }
      retrocedio_HC529 = retrocedio_HC529 + 1;

      if (localStorage.idOpciondata == "07C9") {
        setTimeout(async () => {await this.imprimir_HC529_1();}, 350);
      } else {
        setTimeout(async () => {await this.llenarRegistro_HC529();}, 350);
      }
    },

    llenarRegistro_HC529() {
      $this.form.año_529 = moment().format('YYYY');
      $this.form.mes_529 = moment().format('MM');
      $this.form.dia_529 = moment().format('DD');

      $this.form.descripId_529 = parseInt($_REG_PACI.COD) + '           ' + $_REG_PACI.DESCRIP.trim();
      this.datoDia_HC529();
    },

    datoDia_HC529() {
      $this = this
      validarInputs(
        {
          form: "#dia_HC529A",
          orden: '4',
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          var dia_w = parseInt($this.form.dia_529);
          if (dia_w < 1 || dia_w > 31) {
            CON851('03', '03', null, 'error', 'error');
            this.datoDia_HC529();
          }else if (dia_w == "") {
            CON851('02', '02', null, 'error', 'error');
            this.datoDia_HC529();
          } else {
            // continue
            this.datoHora_HC529();
          }
        }
      )
    },

    datoHora_HC529() {
      $this = this
      $this.form.hora_529 = moment().format('HH');
      validarInputs(
        {
          form: "#hora_HC529",
          orden: '5',
        },
        () => {
          this.datoDia_HC529();
        },
        () => {
          var hora_w = $this.form.hora_529;
          if (hora_w < 0 || hora_w > 23) {
            this.datoHora_HC529();
          } else if (hora_w == "") {
            CON851('02', '02', null, 'error', 'error');
            this.datoHora_HC529();
          } else {
            // continue
            this.datoMinutos_HC529();
          }
        }
      )
    },

    datoMinutos_HC529() {
      $this = this
      $this.form.minutos_529 = moment().format('mm');
      validarInputs(
        {
          form: "#minutos_HC529",
          orden: '5',
        },
        () => {
          this.datoHora_HC529();
        },
        () => {
          var hora_w = $this.form.hora_529;
          var minutos_w = $this.form.minutos_529;
          if (minutos_w < 0 || minutos_w > 59) {
            this.datoMinutos_HC529();
          } else if (minutos_w == 00 && hora_w == 00) {
            CON851('02', '02', null, 'error', 'error');
            this.datoMinutos_HC529();
          } else if (minutos_w == "") {
            CON851('02', '02', null, 'error', 'error');
            this.datoMinutos_HC529();
          } else {
            // continue
            this.datoUnidad_HC529();
          }
        }
      )
    },

    datoUnidad_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodUnserv_HC529",
          orden: '1',
        },
        () => {
          this.datoMinutos_HC529();
        },
        () => {
          var unserv = $this.form.unserv_529;
          var res = $_HC529._unserv.find(e => e.COD == unserv);
          if (res != undefined) {
            activar = res.ESTADO;
            $this.form.descripUnserv_529 = res.DESCRIP;
            if (unserv.trim() == "") {
              CON851('02', '02', null, 'error', 'error');
              this.datoUnidad_HC529();
            } else if (unserv.trim() == "88") {
              this.datoDia_HC529();
            } else if (activar == "N") {
              CON851('13', '13', null, 'error', 'error');
              this.datoUnidad_HC529();
            } else {
              // continue
              this.datoSala_HC529();
            }
          } else {
            CON851('02', '02', null, 'error', 'error');
            this.datoUnidad_HC529();
          }
        }
      )
    },

    datoSala_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarSala_HC529",
          orden: '1',
        },
        () => {
          this.datoDia_HC529();
        },
        () => {
          var sala_w = $this.form.sala_529;
          if (sala_w == "") {
            CON851('02', '02', null, 'error', 'error');
            this.datoSala_HC529();
          } else {
            // continue
            this.datoPrefijo_HC529();
          }
        }
      )
    },

    datoPrefijo_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarPrefijo_HC529",
          orden: '1',
        },
        () => {
          this.datoSala_HC529();
        },
        () => {
          var prefijo_w = $this.form.prefijo_529.toUpperCase();
          if (prefijo_w == "0") {
            $this.form.prefijo_529 = "";
            prefijo_w = $this.form.prefijo_529.toUpperCase();
          }

          if (prefijo_w == "" || prefijo_w == "A" || prefijo_w == "P" || prefijo_w == "T") {
            // continue
            this.datoFactura_HC529();
          } else {
            CON851('03', '03', null, 'error', 'error');
            this.datoPrefijo_HC529();
          }
        }
      )
    },

    async datoFactura_HC529() {
      $this = this
      $this.form.descripFact_529 = "";
      validarInputs(
        {
          form: "#validarFact_HC529",
          orden: '1',
        },
        () => {
          this.datoPrefijo_HC529();
        },
        () => {
          $this.form.fact_529 = $this.form.fact_529.padStart(6, 0);
          var factura_w = $this.form.fact_529.padStart(6, 0);
          var llave_num = $this.form.prefijo_529.toUpperCase() + factura_w;

          if (factura_w == 0) {
            // sin factura
            $this.form.descripFact_529 = "SIN FACTURA";
            this.datoCirujano_HC529();
            // continue
          } else {
            this.cargarNumeracion_HC529(llave_num);
          }
        }
      )
    },

    datoCirujano_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodCirujano_HC529",
          orden: '1',
        },
        () => {
          this.datoFactura_HC529();
        },
        () => {
          var cod_ciruj = $this.form.cirujano_529;
          var res = $_HC529._profesionales.find(e => e.IDENTIFICACION == cod_ciruj);
          if (res != undefined) {
            // continue
            $this.form.descripCirujano_529 = res.NOMBRE.replace(/\s+/g, ' ');
            this.datoAnestesiologo_HC529();
          } else {
            CON851('01', '01', null, 'error', 'error');
            if ($_USUA_GLOBAL[0].NIT == 800037021) {
              this.datoCirujano_HC529();
            } else {
              // continue
              $this.form.descripCirujano_529 = "";
              this.datoAnestesiologo_HC529();
            }
          }
        }
      )
    },

    datoAnestesiologo_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodAnestesiologo_HC529",
          orden: '1',
        },
        () => {
          this.datoCirujano_HC529();
        },
        () => {
          var cod = $this.form.anestesiologo_529;
          var res = $_HC529._profesionales.find(e => e.IDENTIFICACION == cod);
          if (res != undefined) {
            // continue
            $this.form.descripAnestesiologo_529 = res.NOMBRE.replace(/\s+/g, ' ');
            this.datoAyudante_HC529();
          } else {
            if (cod.trim() == "") {
              // continue
              $this.form.descripAnestesiologo_529 = "";
              this.datoAyudante_HC529();
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoAnestesiologo_HC529();
            }
          }
        }
      )
    },

    datoAyudante_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodAyudante_HC529",
          orden: '1',
        },
        () => {
          this.datoAnestesiologo_HC529();
        },
        () => {
          var cod = $this.form.ayudante_529;
          var res = $_HC529._profesionales.find(e => e.IDENTIFICACION == cod);
          if (res != undefined) {
            // continue
            $this.form.descripAyudante_529 = res.NOMBRE.replace(/\s+/g, ' ');
            this.datoInstrumentador_HC529();
          } else {
            if (cod.trim() == "") {
              // continue
              $this.form.descripAyudante_529 = "";
              this.datoInstrumentador_HC529();
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoAyudante_HC529();
            }
          }
        }
      )
    },

    datoInstrumentador_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodInstrumentador_HC529",
          orden: '1',
        },
        () => {
          this.datoAyudante_HC529();
        },
        () => {
          var cod = $this.form.instrumentador_529;
          var res = $_HC529._profesionales.find(e => e.IDENTIFICACION == cod);
          if (res != undefined) {
            // continue
            $this.form.descripInstrumentador_529 = res.NOMBRE.replace(/\s+/g, ' ');
            this.datoCirculante_HC529();
          } else {
            if (cod.trim() == "") {
              if ($_USUA_GLOBAL[0].NIT == 800037021) {
                CON851('02', '02', null, 'error', 'error');
                this.datoInstrumentador_HC529();
              } else {
                // continue
                $this.form.descripInstrumentador_529 = "";
                this.datoCirculante_HC529();
              }
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoInstrumentador_HC529();
            }
          }
        }
      )
    },

    datoCirculante_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodCirculante_HC529",
          orden: '1',
        },
        () => {
          this.datoInstrumentador_HC529();
        },
        () => {
          var cod = $this.form.circulante_529;
          var res = $_HC529._profesionales.find(e => e.IDENTIFICACION == cod);
          if (res != undefined) {
            // continue
            $this.form.descripCirculante_529 = res.NOMBRE.replace(/\s+/g, ' ');
            this.datoCups1_HC529();
          } else {
            if (cod.trim() == "") {
              if ($_USUA_GLOBAL[0].NIT == 800037021) {
                CON851('02', '02', null, 'error', 'error');
                this.datoCirculante_HC529();
              } else {
                // continue
                $this.form.descripCirculante_529 = "";
                this.datoCups1_HC529();
              }
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoCirculante_HC529();
            }
          }
        }
      )
    },

    datoCups1_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodCx1_HC529",
          orden: "1"
        },
        () => {
          this.datoCirculante_HC529();
        },
        () => {
          var cod = $this.form.cx1_529;
          var res = $_HC529._cups.find(e => e.LLAVE.trim() == cod);
          if (res != undefined) {
            // continue
            $this.form.descripCx1_529 = res.DESCRIP;
            this.datoCups2_HC529();
          } else {
            CON851('02', '02', null, 'error', 'error');
            this.datoCups1_HC529();
          }
        }
      )
    },

    datoCups2_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodCx2_HC529",
          orden: "1"
        },
        () => {
          this.datoCups1_HC529();
        },
        () => {
          var cod = $this.form.cx2_529;
          var res = $_HC529._cups.find(e => e.LLAVE.trim() == cod);
          if (res != undefined) {
            // continue
            $this.form.descripCx2_529 = res.DESCRIP;
            this.datoCups3_HC529();
          } else {
            if (cod.trim() == "") {
              // continue
              $this.form.descripCx2_529 = "";
              this.datoCups3_HC529();
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoCups2_HC529();
            }
          }
        }
      )
    },

    datoCups3_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodCx3_HC529",
          orden: "1"
        },
        () => {
          this.datoCups2_HC529();
        },
        () => {
          var cod = $this.form.cx3_529;
          var res = $_HC529._cups.find(e => e.LLAVE.trim() == cod);
          if (res != undefined) {
            // continue
            $this.form.descripCx3_529 = res.DESCRIP;
            this.datoCups4_HC529();
          } else {
            if (cod.trim() == "") {
              // continue
              $this.form.descripCx3_529 = "";
              this.datoCups4_HC529();
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoCups3_HC529();
            }
          }
        }
      )
    },

    datoCups4_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodCx4_HC529",
          orden: "1"
        },
        () => {
          this.datoCups3_HC529();
        },
        () => {
          var cod = $this.form.cx4_529;
          var res = $_HC529._cups.find(e => e.LLAVE.trim() == cod);
          if (res != undefined) {
            // continue
            $this.form.descripCx4_529 = res.DESCRIP;
            this.datoCups5_HC529();
          } else {
            if (cod.trim() == "") {
              // continue
              $this.form.descripCx4_529 = "";
              this.datoCups5_HC529();
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoCups4_HC529();
            }
          }
        }
      )
    },

    datoCups5_HC529() {
      $this = this
      validarInputs(
        {
          form: "#validarCodCx5_HC529",
          orden: "1"
        },
        () => {
          this.datoCups4_HC529();
        },
        () => {
          var cod = $this.form.cx5_529;
          var res = $_HC529._cups.find(e => e.LLAVE.trim() == cod);
          if (res != undefined) {
            // continue
            $this.form.descripCx5_529 = res.DESCRIP;
            this.datoItem_HC529();
          } else {
            if (cod.trim() == "") {
              // continue
              $this.form.descripCx5_529 = "";
              this.datoItem_HC529();
            } else {
              CON851('01', '01', null, 'error', 'error');
              this.datoCups5_HC529();
            }
          }
        }
      )
    },

    async datoItem_HC529() {
      _inputControl('disabled');
      $this = this
      $this.form.itm_529 = retrocedio_HC529;
      validarInputs(
        {
          form: "#itm_HC529",
          orden: "1",

          event_f5: () => {
            CON851P('03', () => { this.datoItem_HC529(); }, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
          },

          event_f3: () => {
            CON851P('01', () => { this.datoItem_HC529() }, () => { setTimeout(() => { this.guardado_HC529(); }, 300) });
          },

        },
        () => {
          toastr.success('F5 PARA SALIR');
          this.datoItem_HC529();
        },
        () => {
          var item = $this.form.itm_529;
          var item_max = $this.hc529.tablaGastos.length + 1;
          if (item > item_max || item <= 0) {
            this.datoItem_HC529();
          } else {
            if (item != retrocedio_HC529) {
              this.editarItem_HC529(item);
              setTimeout(() => { this.datoGrp_HC529(); }, 300);
              console.log("aqui1");
            } else {
              setTimeout(() => { this.datoGrp_HC529(); }, 300);
              console.log('aqui2')
              // continue
            }
          }
        }
      )
    },

    datoGrp_HC529() {
      $this = this
      validarInputs(
        {
          form: "#grp_HC529",
          orden: "1",

          event_f3: () => {
            this.datoItem_HC529();
          },

        },
        () => {
          this.datoItem_HC529();
        },
        () => {
          var grp = $this.form.grp_529;
          setTimeout(() => { this.datoArtic_HC529(); }, 300);
          // continue
        }
      )
    },

    datoArtic_HC529() {
      $this = this
      validarInputs(
        {
          form: "#articulos_HC529",
          orden: "1",

          event_f3: () => {
            this.datoItem_HC529();
          },

        },
        () => {
          this.datoGrp_HC529();
        },
        () => {
          var artic = $this.form.articulos_529;
          var res = $_HC529._articulos.find(e => e.LLAVE_ART.trim() == artic);
          if (res != undefined) {
            $this.form.grp_529 = res.GRUPO_ART;
            $this.form.descripArticulo_529 = res.DESCRIP_ART;
            setTimeout(() => { this.datoCant_HC529(); }, 300);
            // continue
          } else {
            CON851('01', '01', null, 'error', 'error');
            this.datoArtic_HC529();
          }
        }
      )
    },

    datoCant_HC529() {
      $this = this
      $this.form.cantidad_529 == '' ? $this.form.cantidad_529 = ".00" : false;
      validarInputs(
        {
          form: "#cantidad_HC529",
          orden: "1",

          event_f3: () => {
            this.datoItem_HC529();
          },
          
        },
        () => {
          this.datoArtic_HC529();
        },
        () => {
          var cant = parseFloat($this.form.cantidad_529).toFixed(2);
          if (cant.trim() == "" || cant.trim() == 0 || cant.trim() < 1) {
            CON851('03', '03', null, 'error', 'error');
            this.datoCant_HC529();
          } else {
            setTimeout(() => { this.subirTabla_HC529(); }, 300);
            // continue
          }
        }
      )
    },

    subirTabla_HC529() {
      $this = this

      if ($this.form.cantidad_529 % 1 == 0) {
        var cantidadDeci = parseFloat($this.form.cantidad_529).toFixed();
      } else {
        var cantidadDeci = parseFloat($this.form.cantidad_529).toFixed(2);
      }

      var index = $this.form.itm_529 - 1;

      var elemento = $this.hc529.tablaGastos[index];

      var reset_vali;

      console.log(elemento);

      if (elemento == undefined) {
        $this.hc529.tablaGastos.push({
          item: $this.form.itm_529,
          grupo: $this.form.grp_529,
          articulo: $this.form.articulos_529,
          descripArt: $this.form.descripArticulo_529,
          cantidad: cantidadDeci,
        })
        reset_vali = '1';
      } else {
        $this.tabla_gastos = {
          item: $this.form.itm_529,
          grupo: $this.form.grp_529,
          articulo: $this.form.articulos_529,
          descripArt: $this.form.descripArticulo_529,
          cantidad: cantidadDeci,
        }

        $this.hc529.tablaGastos[index] = $this.tabla_gastos;
        reset_vali = '2';
      }

      this.reset_HC529(reset_vali);
    },

    reset_HC529(reset_vali) {
      $this = this

      if (reset_vali == '1') {
        retrocedio_HC529 = retrocedio_HC529 + 1;
      } else if (reset_vali == '2') {
        retrocedio_HC529 = $this.hc529.tablaGastos.length + 1;
      }

      $this.form.itm_529 = '';
      $this.form.grp_529 = '';
      $this.form.articulos_529 = '';
      $this.form.descripArticulo_529 = '';
      $this.form.cantidad_529 = '';

      this.datoItem_HC529();
    },

    editarItem_HC529(item) {

      var index = item - 1;

      $this.form.itm_529 = $this.hc529.tablaGastos[index].item;
      $this.form.grp_529 = $this.hc529.tablaGastos[index].grupo;
      $this.form.articulos_529 = $this.hc529.tablaGastos[index].articulo;
      $this.form.descripArticulo_529 = $this.hc529.tablaGastos[index].descripArt;
      $this.form.cantidad_529 = $this.hc529.tablaGastos[index].cantidad;
    },


    _deleteItemFormu_HC529(element) {
      let item = parseFloat(element.srcElement.value);

      if (element.srcElement.checked) {
        CON850_P(
          (e) => {
            element.srcElement.checked = false;
            this.$refs.item_HC529.focus();
            if (e.id == "S") {

              let filtro = this.hc529.tablaGastos.filter(
                (e) => e.item != item
              );

              this.hc529.tablaGastos = JSON.parse(JSON.stringify(filtro));

              this.hc529.tablaGastos.map((a, b) => {
                a.item = b + 1;
                return a;
              });

              retrocedio_HC529 = retrocedio_HC529 - 1;

              console.log(retrocedio_HC529)

            }
            this.$refs.item_HC529.focus();
          },
          { msj: "Desea eliminar el item ?" }
        );

      } else element.srcElement.checked = false;
    },

    async guardado_HC529() {
      var data = {};
      var nro_gto = $this.form.numero_529;
      var indice = $this.form.itm_529 - 1;
      admin_w = localStorage.Usuario;
      var llave_w = $_REG_HC.llave_hc;
      var medico = $_REG_PROF.IDENTIFICACION;

      var fecha_ult = moment().format('YYYYMMDD');
      data['datosh'] = datosEnvio() + novedad_w + '|' + nro_gto + '|' + indice + '|' + tipo_w + '|' + admin_w + '|' + llave_w + '|' + fecha_ult + '|' + medico + '|';
      
      var fecha_w = $this.form.año_529 + $this.form.mes_529 + $this.form.dia_529;

      data['LLAVE_FOLIO_W'] = $_REG_HC.llave_hc;
      data['FECHA_GTO_W'] = fecha_w;
      data['HORA_GTO_W'] = $this.form.hora_529 + $this.form.minutos_529;
      data['UNSERV_W'] = $this.form.unserv_529;
      data['SALA_W'] = $this.form.sala_529;
      data['PREF_W'] = $this.form.prefijo_529.toUpperCase();
      data['NRO_CTA_W'] = $this.form.fact_529;

      data['COD_CX_W'] = $this.form.cirujano_529;
      data['COD_ANE_W'] = $this.form.anestesiologo_529;
      data['COD_AYU_W'] = $this.form.ayudante_529;
      data['COD_INS_W'] = $this.form.instrumentador_529;
      data['COD_CIR_W'] = $this.form.circulante_529;

      data['CUPS_01_W'] = $this.form.cx1_529;
      data['CUPS_02_W'] = $this.form.cx2_529;
      data['CUPS_03_W'] = $this.form.cx3_529;
      data['CUPS_04_W'] = $this.form.cx4_529;
      data['CUPS_05_W'] = $this.form.cx5_529;

      for (var i in $this.hc529.tablaGastos) {
        data[`GRUPO_${cerosIzq(parseInt(i) + 1, 3)}`] = $this.hc529.tablaGastos[i].grupo.toString();
        data[`ARTIC_${cerosIzq(parseInt(i) + 1, 3)}`] = $this.hc529.tablaGastos[i].articulo.toString();
        data[`CANT_${cerosIzq(parseInt(i) + 1, 3)}`] = $this.hc529.tablaGastos[i].cantidad.toString();
      }

      $this.data = data;

      // toastr.success("Información guardada");
      // this.ventanaFecha_HC003A();

      console.log(data);

      var fecha_conse = fecha_w.substring(2, 8);

      await postData(data, get_url("APP/HICLIN/HC529.DLL"))
        .then(data => {
          console.log(data)
          console.log('entro al dll a guardar')
          toastr.success("Información guardada");
          if (novedad_w == 7) {
            $this.grabar_consecutivo_HC529(fecha_conse);
          }
          setTimeout(() => {$this.imprimir_HC529_1();}, 350);
        }).catch(err => {
          toastr.error("Error en guardado");
          _regresar_menuhis();
          console.log(err, 'error')
          loader('hide')
        })
    },

    imprimir_HC529_1() {
      CON851P('00', () => { _regresar_menuhis() }, () => { setTimeout(() => { this.imprimir_HC529(); }, 300) });
    },

    imprimir_HC529() {
      arrayHCI529.numero = $this.form.numero_529;

      var aux;
      switch($this.form.mes_529) {
        case '01': aux = 'Ene'; break;
        case '02': aux = 'Feb'; break;
        case '03': aux = 'Mar'; break;
        case '04': aux = 'Abr'; break;
        case '05': aux = 'May'; break;
        case '06': aux = 'Jun'; break;
        case '07': aux = 'Jul'; break;
        case '08': aux = 'Agt'; break;
        case '09': aux = 'Sep'; break;
        case '10': aux = 'Oct'; break;
        case '11': aux = 'Nov'; break;
        case '12': aux = 'Dic'; break;
      }

      arrayHCI529.sala = $this.form.sala_529;
      arrayHCI529.factura = $this.form.prefijo_529.toUpperCase() + $this.form.fact_529;

      arrayHCI529.fecha = aux + ' ' + $this.form.dia_529 + '/' + $this.form.año_529;
      arrayHCI529.hora = $this.form.hora_529 + ':' + $this.form.minutos_529;

      arrayHCI529.cirujano = $this.form.descripCirujano_529;
      arrayHCI529.anestesiologo = $this.form.descripAnestesiologo_529;
      arrayHCI529.ayudante = $this.form.descripAyudante_529;
      arrayHCI529.instrumentador = $this.form.descripInstrumentador_529;
      arrayHCI529.circulante = $this.form.descripCirculante_529;

      arrayCups_HCI529.push({
        cod: $this.form.cx1_529,
        descrip: $this.form.descripCx1_529,
      })
      arrayCups_HCI529.push({
        cod: $this.form.cx2_529,
        descrip: $this.form.descripCx2_529,
      })
      arrayCups_HCI529.push({
        cod: $this.form.cx3_529,
        descrip: $this.form.descripCx3_529,
      })
      arrayCups_HCI529.push({
        cod: $this.form.cx4_529,
        descrip: $this.form.descripCx4_529,
      })
      arrayCups_HCI529.push({
        cod: $this.form.cx5_529,
        descrip: $this.form.descripCx5_529,
      })

      arrayHCI529.cups = arrayCups_HCI529;

      arrayHCI529.articulos = $this.hc529.tablaGastos;
      arrayHCI529.tipo_w = tipo_w;
      
      if (novedad_w == 7) {
        arrayHCI529.operador = admin_w;
      }

      _iniciarHCI107(arrayHCI529);
    },

    async grabar_consecutivo_HC529(fecha_conse) {
      var nro = cerosIzq($this.form.numero_529, 6);
      console.log(nro, 'CONSECUTIVO')
        await postData({ datosh: datosEnvio() + "1g" + '|' + fecha_conse + '|' + nro + '|' }, get_url("app/CONTAB/CON007X.DLL"))
          .then(data => {
            console.log(data, 'CON007X')
            console.log('entro al dll a guardar CON007X')
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })
    },

    _ventanaArticulos_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE ARTICULOS",
        columnas: ["LLAVE_ART", "DESCRIP_ART"],
        data: $_HC529._articulos,
        callback_esc: function () {
          document.querySelector('.articulos_529').focus();
        },
        callback: function (data) {
          $this.form.articulos_529 = data.LLAVE_ART.trim();
          $this.form.descripArticulo_529 = data.DESCRIP_ART.trim();
          $this.form.grp_529 = data.GRUPO_ART;
          _enterInput('.articulos_529');
        }
      })
    },


    _ventanaCodigosCups1_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CODIGOS CUPS",
        columnas: ["LLAVE", "DESCRIP"],
        data: $_HC529._cups,
        callback_esc: function () {
          document.querySelector('.cx1_529').focus();
        },
        callback: function (data) {
          $this.form.cx1_529 = data.LLAVE.trim();
          $this.form.descripCx1_529 = data.DESCRIP.trim();
          _enterInput('.cx1_529');
        }
      })
    },

    _ventanaCodigosCups2_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CODIGOS CUPS",
        columnas: ["LLAVE", "DESCRIP"],
        data: $_HC529._cups,
        callback_esc: function () {
          document.querySelector('.cx2_529').focus();
        },
        callback: function (data) {
          $this.form.cx2_529 = data.LLAVE.trim();
          $this.form.descripCx2_529 = data.DESCRIP.trim();
          _enterInput('.cx2_529');
        }
      })
    },

    _ventanaCodigosCups3_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CODIGOS CUPS",
        columnas: ["LLAVE", "DESCRIP"],
        data: $_HC529._cups,
        callback_esc: function () {
          document.querySelector('.cx3_529').focus();
        },
        callback: function (data) {
          $this.form.cx3_529 = data.LLAVE.trim();
          $this.form.descripCx3_529 = data.DESCRIP.trim();
          _enterInput('.cx3_529');
        }
      })
    },

    _ventanaCodigosCups4_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CODIGOS CUPS",
        columnas: ["LLAVE", "DESCRIP"],
        data: $_HC529._cups,
        callback_esc: function () {
          document.querySelector('.cx4_529').focus();
        },
        callback: function (data) {
          $this.form.cx4_529 = data.LLAVE.trim();
          $this.form.descripCx4_529 = data.DESCRIP.trim();
          _enterInput('.cx4_529');
        }
      })
    },

    _ventanaCodigosCups5_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CODIGOS CUPS",
        columnas: ["LLAVE", "DESCRIP"],
        data: $_HC529._cups,
        callback_esc: function () {
          document.querySelector('.cx5_529').focus();
        },
        callback: function (data) {
          $this.form.cx5_529 = data.LLAVE.trim();
          $this.form.descripCx5_529 = data.DESCRIP.trim();
          _enterInput('.cx5_529');
        }
      })
    },

    _ventanaProfesionales_HC529() {
      _ventanaDatos({
        titulo: "PROFESIONALES QUE ATENDIERON",
        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_HC529._profesionales,
        ancho: "1000px",
        callback_esc: function () {
          document.querySelector('.cirujano_529').focus();
        },
        callback: function (data) {
          $this.form.cirujano_529 = data.IDENTIFICACION.trim();
          $this.form.descripCirujano_529 = data.NOMBRE.replace(/\s+/g, ' ').trim();
          _enterInput('.cirujano_529');
        }
      })
    },

    _ventanaProfesionales2_HC529() {
      _ventanaDatos({
        titulo: "PROFESIONALES QUE ATENDIERON",
        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_HC529._profesionales,
        ancho: "1000px",
        callback_esc: function () {
          document.querySelector('.anestesiologo_529').focus();
        },
        callback: function (data) {
          $this.form.anestesiologo_529 = data.IDENTIFICACION.trim();
          $this.form.descripAnestesiologo_529 = data.NOMBRE.replace(/\s+/g, ' ').trim();
          _enterInput('.anestesiologo_529');
        }
      })
    },

    _ventanaProfesionales3_HC529() {
      _ventanaDatos({
        titulo: "PROFESIONALES QUE ATENDIERON",
        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_HC529._profesionales,
        ancho: "1000px",
        callback_esc: function () {
          document.querySelector('.ayudante_529').focus();
        },
        callback: function (data) {
          $this.form.ayudante_529 = data.IDENTIFICACION.trim();
          $this.form.descripAyudante_529 = data.NOMBRE.replace(/\s+/g, ' ').trim();
          _enterInput('.ayudante_529');
        }
      })
    },

    _ventanaProfesionales4_HC529() {
      _ventanaDatos({
        titulo: "PROFESIONALES QUE ATENDIERON",
        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_HC529._profesionales,
        ancho: "1000px",
        callback_esc: function () {
          document.querySelector('.instrumentador_529').focus();
        },
        callback: function (data) {
          $this.form.instrumentador_529 = data.IDENTIFICACION.trim();
          $this.form.descripInstrumentador_529 = data.NOMBRE.replace(/\s+/g, ' ').trim();
          _enterInput('.instrumentador_529');
        }
      })
    },

    _ventanaProfesionales5_HC529() {
      _ventanaDatos({
        titulo: "PROFESIONALES QUE ATENDIERON",
        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_HC529._profesionales,
        ancho: "1000px",
        callback_esc: function () {
          document.querySelector('.circulante_529').focus();
        },
        callback: function (data) {
          $this.form.circulante_529 = data.IDENTIFICACION.trim();
          $this.form.descripCirculante_529 = data.NOMBRE.replace(/\s+/g, ' ').trim();
          _enterInput('.circulante_529');
        }
      })
    },

    _ventanaCamas_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CAMAS",
        columnas: ["COD", "DESCRIPCION", "DESCRIP_EST"],
        data: $_HC529._camas,
        callback_esc: function () {
          document.querySelector('.sala_529').focus();
        },
        callback: function (data) {
          $this.form.sala_529 = data.COD.trim();
          _enterInput('.sala_529');
        }
      })
    },

    _ventanaUnserv_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE UNIDADES DE SERVICIO",
        columnas: ["COD", "DESCRIP"],
        data: $_HC529._unserv,
        callback_esc: function () {
          document.querySelector('.unserv_529').focus();
        },
        callback: function (data) {
          $this.form.descripUnserv_529 = data.DESCRIP.trim();
          $this.form.unserv_529 = data.COD.trim();
          activar = data.ESTADO;
          _enterInput('.unserv_529');
        }
      })
    },

    _ventanaHojaGastos_HC529() {
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE HOJAS DE CIRUGIA",
        columnas: ["NUMERO", "FECHA" , "PROCED" , "ENFERMER"],
        data: $_HC529._gastosCiru,
        callback_esc: function () {
          document.querySelector('.numero_529').focus();
        },
        callback: function (data) {
          $this.form.numero_529 = parseInt(data.NUMERO);
          _enterInput('.numero_529');
        }
      })
    },


    cargarNumeracion_HC529(llave_num) {
      $this = this;
      postData({ datosh: datosEnvio() + llave_num }, get_url("APP/SALUD/SER808-01.DLL"))
        .then((data) => {
          $_HC529._numer = data.NUMER19;

          if ($_HC529._numer[0]['IDPAC_NUM'] != "000000000000001"
                && $_HC529._numer[0]['IDPAC_NUM'] != $_REG_PACI.COD) {
                  CON851('06', '06', null, 'error', 'error');
                  this.datoFactura_HC529();
            } else {
              // continue
              $this.form.descripFact_529 = $_HC529._numer[0]['DESCRIP_NUM'];

              this.datoCirujano_HC529();
            }

        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          // _regresar_menuhis();
          this.datoFactura_HC529();
        });
    },

    async cargarArchivos_HC529() {
      loader('show');
      $this = this;

      await postData({ datosh: `${datosEnvio()}1g` },get_url("APP/CONTAB/CON007.DLL"))
        .then(data => {
          console.log(data, 'CON007')
            let pedido = data.split('|')[1]
            $_HC529.numero_ctl = parseInt(pedido).toString().padStart(6, '0');
        })
        .catch(err => {
            console.log('Error', err)
            loader('hide')
            _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + tipo_w + '|' },get_url("APP/HICLIN/HC529B.DLL"))
        .then(data => {
          $_HC529._gastosCiru = data.GASTOS_CIRUG;
          $_HC529._gastosCiru.pop();
        })
        .catch(err => {
            console.log('Error', err)
            loader('hide')
            _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC809.DLL"))
        .then((data) => {
          $_HC529._camas = data.CAMAS;
          $_HC529._camas.pop();
        }).catch((err) => {
          console.log(err, 'err')
          _regresar_menuhis();
        });

      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then(data => {
          $_HC529._profesionales = data.ARCHPROF;
          $_HC529._profesionales.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER802C.DLL"))
        .then(data => {
          $_HC529._cups = data.CODIGOS;
          $_HC529._cups.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() }, get_url("app/INVENT/INV803.DLL"))
        .then(data => {
          $_HC529._articulos = data.ARTICULOS;
          $_HC529._articulos.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          $_HC529._unserv = data.UNSERV;
          $_HC529._unserv.pop();
          this._inicializar_HC529(); 
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _regresar_menuhis();
        });
    }
  },
})