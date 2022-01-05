
// CREACION - SANTIAGO.F - NOV 19/2021

new Vue({
  el: '#SAL54166',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      documento_SAL54166: '',
      descripDoc: '',

      anoini_SAL54166: '',
      mesini_SAL54166: '',
      diaini_SAL54166: '',

      anofin_SAL54166: '',
      mesfin_SAL54166: '',
      diafin_SAL54166: '',

      anocorteini_SAL54166: '',
      mescorteini_SAL54166: '',
      diacorteini_SAL54166: '',

      prefijo_SAL54166: '',

      tiposerv_SAL54166: '',
      descripTiposerv: '',

      comprobante_SAL54166: '',
      operador_SAL54166: '',
      descripOperador: '',

      sw_fecha: '',
      anulado: '',
    },

    arrayOpc: [],
    arrayOper: [],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    _vm = this;
    loader("show");
    nombreOpcion('9-5-4-1-6 - Informe de auditoria de correccion comprobantes');
    this.traerOpc();
  },
  methods: {
    traerOpc() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/GET_OPCIO.DLL"))
        .then((data) => {
          this.arrayOpc = data.REG_OPC;
          this.traerOper();
        })
        .catch((err) => {
          loader("hide");
          CON851("", "Error leyendo opciones", null, "error", "Error");
          _toggleNav();
        });
    },

    traerOper() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON982.DLL"))
        .then((data) => {
          this.arrayOper = data.ARCHREST;
          loader("hide");
          this.dato_document();
        })
        .catch((err) => {
          loader("hide");
          CON851("", "Error leyendo operadores", null, "error", "Error");
          _toggleNav();
        });
    },

    dato_document() {
      if (this.form.documento_SAL54166.trim() == '') {
        this.form.documento_SAL54166 = '14*';
      }
      validarInputs(
        {
          form: "#VALIDARDOC_SAL54166",
        },
        () => {
          _toggleNav();
        },
        () => {
          this.form.documento_SAL54166 = this.form.documento_SAL54166.toUpperCase();
          let tipoA = this.form.documento_SAL54166.slice(0,2);
          let tipoB = this.form.documento_SAL54166.slice(2,6);

          if (tipoB.trim() == '*' || tipoB == '****') {
            this.form.descripDoc = 'Todos los tipos';
            this.llenarDatosFechaIni();
          } else {
            let busq = this.arrayOpc.find(e => e.llave == this.form.documento_SAL54166);
            if (busq) {
              this.form.descripDoc = busq.nombre_opc;
              this.llenarDatosFechaIni();
            } else {
              CON851('03', '03', null, 'error', 'error');
              this.dato_document();
            }
          }
        }
      );
    },

    llenarDatosFechaIni() {
      this.form.anoini_SAL54166 = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mesini_SAL54166 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
      this.form.diaini_SAL54166 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
      this.validarAnioIni();
    },

    validarAnioIni() {
      validarInputs(
        {
          form: "#anioIni",
        },
        () => {
          this.dato_document();
        },
        () => {
          let anio = parseFloat(this.form.anoini_SAL54166);

          if (anio < 1900) {
            this.validarAnioIni();
          } else {
            this.validarMesIni()
          }
        }
      );
    },

    validarMesIni() {
      validarInputs(
        {
          form: "#mesIni",
        },
        () => {
          this.validarAnioIni();
        },
        () => {
          this.form.mesini_SAL54166 = this.form.mesini_SAL54166.padStart(2, "0");
          let mes = parseFloat(this.form.mesini_SAL54166);

          if (mes < 1 || mes > 12) {
            this.validarMesIni();
          } else {
            this.validarDiaIni()
          }
        }
      );
    },

    validarDiaIni() {
      validarInputs(
        {
          form: "#diaIni",
        },
        () => {
          this.validarMesIni();
        },
        () => {
          this.form.diaini_SAL54166 = this.form.diaini_SAL54166.padStart(2, "0");
          let dia = parseFloat(this.form.diaini_SAL54166);

          if (dia < 1 || dia > 31) {
            this.validarDiaIni();
          } else {
            if (this.form.anofin_SAL54166 == 0 || this.form.anofin_SAL54166 == '') {
              this.form.anofin_SAL54166 = this.form.anoini_SAL54166;
              this.form.mesfin_SAL54166 = this.form.mesini_SAL54166;
              this.form.diafin_SAL54166 = this.form.diaini_SAL54166;
            }
            this.validarAnioFin()
          }
        }
      );
    },

    validarAnioFin() {
      validarInputs(
        {
          form: "#anioFin",
        },
        () => {
          this.validarAnioIni();
        },
        () => {
          let anio = parseFloat(this.form.anofin_SAL54166);

          if (anio < 1900) {
            this.validarAnioFin();
          } else {
            this.validarMesFin()
          }
        }
      );
    },

    validarMesFin() {
      validarInputs(
        {
          form: "#mesFin",
        },
        () => {
          this.validarAnioFin();
        },
        () => {
          this.form.mesfin_SAL54166 = this.form.mesfin_SAL54166.padStart(2, "0");
          let mes = parseFloat(this.form.mesfin_SAL54166);

          if (mes < 1 || mes > 12) {
            this.validarMesFin();
          } else {
            this.validarDiaFin()
          }
        }
      );
    },

    validarDiaFin() {
      validarInputs(
        {
          form: "#diaFin",
        },
        () => {
          this.validarMesFin();
        },
        () => {
          this.form.diafin_SAL54166 = this.form.diafin_SAL54166.padStart(2, "0");
          let dia = parseFloat(this.form.diafin_SAL54166);
          let fechaIni = parseFloat(`${this.form.anoini_SAL54166}${this.form.mesini_SAL54166}${this.form.diaini_SAL54166}`);
          let fechaFin = parseFloat(`${this.form.anofin_SAL54166}${this.form.mesfin_SAL54166}${this.form.diafin_SAL54166}`);

          if (dia < 1 || dia > 31) {
            this.validarDiaFin();
          } else {
            if (fechaIni > fechaFin) {
              CON851("9Q", "9Q", null, "warning", "Advertencia");
              this.validarAnioFin();
            } else {
              this.llenarFechaCorte();
            }
          }
        }
      );
    },

    llenarFechaCorte() {
      this.form.anocorteini_SAL54166 = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mescorteini_SAL54166 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);

      let anio = parseFloat(this.form.anocorteini_SAL54166);
      let mes = parseFloat(this.form.mescorteini_SAL54166);
      let dia = 0;

      if (mes == 1) {
        anio = anio - 1;
        mes = 12;
      } else {
        mes = mes - 1;
      }

      switch(mes.toString()) {
        case '1': dia = 31; break;
        case '2': dia = 29; break;
        case '3': dia = 31; break;
        case '4': dia = 30; break;
        case '5': dia = 31; break;
        case '6': dia = 30; break;
        case '7': dia = 31; break;
        case '8': dia = 31; break;
        case '9': dia = 30; break;
        case '10': dia = 31; break;
        case '11': dia = 30; break;
        case '12': dia = 31; break;
      }

      this.form.anocorteini_SAL54166 = anio.toString();
      this.form.mescorteini_SAL54166 = mes.toString();
      this.form.diacorteini_SAL54166 = dia.toString();
      this.validarAnioCorte()
    },

    validarAnioCorte() {
      validarInputs(
        {
          form: "#anioCorte",
        },
        () => {
          this.validarAnioIni();
        },
        () => {
          let anio = parseFloat(this.form.anocorteini_SAL54166);

          if (anio < 1900) {
            this.validarAnioCorte();
          } else {
            this.validarMesCorte()
          }
        }
      );
    },

    validarMesCorte() {
      validarInputs(
        {
          form: "#mesCorte",
        },
        () => {
          this.validarAnioCorte();
        },
        () => {
          this.form.mescorteini_SAL54166 = this.form.mescorteini_SAL54166.padStart(2, "0");
          let mes = parseFloat(this.form.mescorteini_SAL54166);

          if (mes < 1 || mes > 12) {
            this.validarMesCorte();
          } else {
            this.validarDiaCorte()
          }
        }
      );
    },

    validarDiaCorte() {
      validarInputs(
        {
          form: "#diaCorte",
        },
        () => {
          this.validarMesCorte();
        },
        () => {
          this.form.diacorteini_SAL54166 = this.form.diacorteini_SAL54166.padStart(2, "0");
          let dia = parseFloat(this.form.diacorteini_SAL54166);

          if (dia < 1 || dia > 31) {
            this.validarDiaCorte();
          } else {
            this.datoSuc();
          }
        }
      );
    },

    datoSuc() {
      if (this.form.prefijo_SAL54166.trim() == '') {
        this.form.prefijo_SAL54166 = $_USUA_GLOBAL[0].PREFIJ;
      }
      validarInputs(
        {
          form: "#VALIDARPREF_SAL54166",
        },
        () => {
          this.validarAnioCorte();
        },
        () => {
          let suc = this.form.prefijo_SAL54166;

          if (suc == '**') {
            this.dato_tipo();
          } else {
            // falta validacion factura serv
            this.dato_tipo();
          }
        }
      );
    },

    dato_tipo() {
      if (this.form.tiposerv_SAL54166.trim() == '') {
        this.form.tiposerv_SAL54166 = '*';
      }
      validarInputs(
        {
          form: "#VALIDARTIPO_SAL54166",
        },
        () => {
          this.datoSuc();
        },
        () => {
          let tipo = this.form.tiposerv_SAL54166;

          switch(tipo) {
            case '0':
              this.form.descripTiposerv = 'Medicamentos';
              this.dato_numero();
              break;
            case '1':
              this.form.descripTiposerv = 'Cirugias';
              this.dato_numero();
              break;
            case '2':
              this.form.descripTiposerv = 'Laboratorios';
              this.dato_numero();
              break;
            case '3':
              this.form.descripTiposerv = 'Imagenologia';
              this.dato_numero();
              break;
            case '4':
              this.form.descripTiposerv = 'Otros servicios';
              this.dato_numero();
              break;
            case '5':
              this.form.descripTiposerv = 'Consultas-Terapias';
              this.dato_numero();
              break;
            case '6':
              this.form.descripTiposerv = 'Patologia';
              this.dato_numero();
              break;
            case '7':
              this.form.descripTiposerv = 'Promoción y prevención';
              this.dato_numero();
              break;
            case '*':
              this.form.descripTiposerv = 'Todos los servicios';
              this.dato_numero();
              break;
            default:
              CON851('03', '03', null, 'error', 'error');
              this.dato_tipo();
              break;
          }
        }
      );
    },

    dato_numero() {
      if (this.form.comprobante_SAL54166.trim() == '') {
        this.form.comprobante_SAL54166 = '******';
      }
      validarInputs(
        {
          form: "#VALIDARCOMP_SAL54166",
        },
        () => {
          this.dato_tipo();
        },
        () => {
          let comprob = (this.form.comprobante_SAL54166 = this.form.comprobante_SAL54166.padStart(6, "0"));
          let suc = this.form.prefijo_SAL54166;
          let tipo = this.form.tiposerv_SAL54166;

          if (suc == '**' || tipo == '*' || comprob == '******') {
            this.dato_operador();
          } else {
            // lee el archivo fact con la llave
            this.dato_operador();
          }
        }
      );
    },

    dato_operador() {
      if (this.form.operador_SAL54166.trim() == '') {
        this.form.operador_SAL54166 = '****';
      }
      validarInputs(
        {
          form: "#VALIDAROPER_SAL54166",
        },
        () => {
          this.dato_tipo();
        },
        () => {
          let oper = this.form.operador_SAL54166;

          if (oper == '****') {
            this.form.descripOperador = 'Todos los operadores';
            this.dato_fecha()
          } else {
            let busq = this.arrayOper.find(e => e.CODIGO == oper);
            if (busq) {
              this.form.descripOperador = busq.DESCRIPCION;
              this.dato_fecha()
            } else {
              CON851('03', '/03', null, 'error', 'error');
              this.dato_operador();
            }
          }
        }
      );
    },

    dato_fecha() {
      this.form.sw_fecha.trim() == '' ? this.form.sw_fecha = 'N' : false;
      validarInputs({
        form: '#datoSwFecha'
      }, () => {
        this.dato_operador();
      }, () => {
        this.form.sw_fecha = this.form.sw_fecha.toUpperCase();
        var fecha = this.form.sw_fecha;
        if (fecha == 'S' || fecha == 'N') {
          // continue
          this.dato_anuladas();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_fecha();
        }
      })
    },

    dato_anuladas() {
      this.form.anulado.trim() == '' ? this.form.anulado = 'N' : false;
      validarInputs({
        form: '#datoAnulado'
      }, () => {
        this.dato_fecha();
      }, () => {
        this.form.anulado = this.form.anulado.toUpperCase();
        var anulado = this.form.anulado;
        if (anulado == 'S' || anulado == 'N') {
          //  agregar llamado del dll que trae listado y organizar las columnas del listado
          // this._envioImpresion();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.dato_anuladas();
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          this.dato_anuladas();
        },
        () => {
          this.estado_loader = true;
          // this.label_loader = `Procesando: ${moment(this.form.fecha.toString()).format("YYYY/MM")})}`;
          this.label_loader = `Procesando: ${`${this.form.anoini_SAL54166}/${this.form.mesini_SAL54166}/${this.form.diaini_SAL54166} - ${this.form.anofin_SAL54166}/${this.form.mesfin_SAL54166}/${this.form.diafin_SAL54166}`}`;
          this.progreso = { transferred: 0, speed: 0 };

          let fechaIni = `${this.form.anoini_SAL54166}${this.form.mesini_SAL54166}${this.form.diaini_SAL54166}`;
          let fechaFin = `${this.form.anofin_SAL54166}${this.form.mesfin_SAL54166}${this.form.diafin_SAL54166}`;
          let fechaCorte = `${this.form.anocorteini_SAL54166}${this.form.mescorteini_SAL54166}${this.form.diacorteini_SAL54166}`;

          var datos_envio = [
            // localStorage.Usuario,
            this.form.documento_SAL54166,
            fechaIni,
            fechaFin,
            fechaCorte,
            this.form.prefijo_SAL54166,
            this.form.tiposerv_SAL54166,
            this.form.comprobante_SAL54166,
            this.form.operador_SAL54166,
            this.form.sw_fecha,
            this.form.anulado,
          ]

          postData({ datosh: datosEnvio() + datos_envio.join('|') }, get_url("app/SALUD/SAL54166.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_SAL54166(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.dato_anuladas();
            });
        }
      );
    },

    _montarImpresion_SAL54166(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        // data.LISTADO[i]['DESCRIP_J'] = data.LISTADO[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.dato_anuladas();
      } else {
        var columnas = [
          {
            title: "FACT.",
            value: "LLAVE",
            format: "string",
          },
          {
            title: "TOTAL FACT",
            value: "TOTAL_FACT",
          },
          {
            title: "DROGUERIA", 
            value: "DROGUERIA",
          },
          {
            title: "CIRUGIA", 
            value: "CIRUGIA",
          },
          {
            title: "LABORATORIO", 
            value: "LABORATORIO",
          },
          {
            title: "IMAGENOLOGIA", 
            value: "IMAGENOLOGIA",
          },
          {
            title: "OTROS SERV.", 
            value: "OTROS_SERV",
          },
          {
            title: "CONSULTAS Y TER", 
            value: "CONSULT_TER",
          },
          {
            title: "PATOLOG CITOLOG", 
            value: "PATOL_CITOL",
          },
          {
            title: "PROM. Y PREVEN", 
            value: "PROM_PREV",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `LISTADO DE FACTURACION     NIT: ${nit}`,
          `PERIODO: ${this.form.anoini_SAL54166}/${this.form.mesini_SAL54166}/${this.form.diaini_SAL54166} HASTA: ${this.form.anofin_SAL54166}/${this.form.mesfin_SAL54166}/${this.form.diafin_SAL54166}`,
        ]

        _impresion2({
          tipo: 'excel',
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.LISTADO,
          },
          archivo: `${localStorage.Usuario + moment().format(`YYMMDD-HHmmss`)}`
        })
          .then(() => {
            console.log('Proceso terminado')
            this.estado_loader = false;
            _toggleNav();
          })
          .catch(() => {
            this.estado_loader = false;
            console.log('Proceso error')
            _toggleNav();
          })
      }
    },

    _f8operadores() {
      _this = this
      _ventanaDatos({
        titulo: "VENTANA DE OPERADORES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: _this.arrayOper,
        callback_esc: function () {
          $(".operador").focus();
        },
        callback: function (data) {
          _this.form.operador_SAL54166 = data.CODIGO.trim();
          _enterInput(".operador");
        },
      });
    },
  },
})