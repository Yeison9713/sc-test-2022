
// CREACION - CARLOS - 11/10/2021

new Vue({
  el: '#SER5416',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      fechaInicial: '',
      fechaFinal: '',

      ano_ini: '',
      mes_ini: '',
      dia_ini: '',

      ano_fin: '',
      mes_fin: '',
      dia_fin: '',
      

      sucursal: '',
      descrip_sucursal: '',
    },

    array_sucursal: [],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    _vm = this;
    _inputControl('disabled');
		_inputControl('reset');    
    nombreOpcion('9-5-4-2-1-4-H - Listado RESUMEN DISPENSACION.');
    loader("show");
    this.cargarSucursal();
  },
  methods: {
    llenarDatosFecha() {
      this.form.ano_ini = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mes_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.dia_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

      this.form.ano_fin = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mes_fin = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.dia_fin = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

      this.validarAnoIni();
    },

    validarAnoIni() {
      validarInputs({
        form: '#ano_inicial',
        orden: "1"
      }, () => {
        _toggleNav();
      }, () => {
        let año = parseFloat(this.form.ano_ini) || 0
        if (año < 1990) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAnoIni();
        } else {
          this.validarMesIni();
        }
      })
    },

    validarMesIni() {
      validarInputs({
        form: '#mes_inicial',
        orden: "1"
      }, () => {
        this.validarAnoIni();
      }, () => {
        this.form.mes_ini = cerosIzq(this.form.mes_ini, 2);
        let mes = parseInt(this.form.mes_ini);
        if (mes < 1 || mes > 12) {
          this.validarMesIni();
        } else {
          this.validarDiaIni();
        }
      })
    },

    validarDiaIni() {
      validarInputs({
        form: '#dia_inicial',
        orden: "1"
      }, () => {
        this.validarAnoIni();
      }, () => {
        this.form.dia_ini = cerosIzq(this.form.dia_ini, 2);
        let dia = parseInt(this.form.dia_ini);
        if (dia < 1 || dia > 31) {
          this.validarDiaIni();
        } else {
          // continue
          this.validarAnoFin();
        }
      })
    },

    validarAnoFin() {
      validarInputs({
        form: '#ano_final',
        orden: "1"
      }, () => {
        this.validarAnoIni();
      }, () => {
        let año = parseInt(this.form.ano_fin);
        if (año < 1990) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          this.validarMesFin();
        }
      })
    },

    validarMesFin() {
      validarInputs({
        form: '#mes_final',
        orden: "1"
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.mes_fin = cerosIzq(this.form.mes_fin, 2);
        let mes = parseInt(this.form.mes_fin);
        if (mes < 1 || mes > 12) {
          this.validarMesFin();
        } else {
          this.validarDiaFin();
        }
      })
    },

    validarDiaFin() {
      validarInputs({
        form: '#dia_final',
        orden: "1"
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.dia_fin = cerosIzq(this.form.dia_fin, 2);
        let dia = parseInt(this.form.diaFinal);
        this.form.fechaInicial = parseInt(`${this.form.ano_ini}${this.form.mes_ini}${this.form.dia_ini}`);
        this.form.fechaFinal = parseInt(`${this.form.ano_fin}${this.form.mes_fin}${this.form.dia_fin}`);
        if (dia < 1 || dia > 31) {
          this.validarDiaFin();
        } else if (this.form.fechaFinal < this.form.fechaInicial) {
          CON851('37', '37', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          this.Dato_sucursal();
        }
      })
    },

    Dato_sucursal() {
      validarInputs({
        form: '#dato_sucursal',
        orden: "1",
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.sucursal = this.form.sucursal || "**";    
        let sucursal = this.form.sucursal;

        if (sucursal == '**') {
          this.$refs.descrip_sucursal.value = 'Todas las sucursales.';
          this._envioImpresion();
        } else {
          let busq = this.array_sucursal.find(a => a.CODIGO == sucursal);
          if (busq != undefined) {
            this.$refs.descrip_sucursal.value = busq.DESCRIPCION;
            this._envioImpresion();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.Dato_sucursal();
          }
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          this.Dato_sucursal();
        },
        () => {
          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.form.fechaInicial.toString()).format("YYYY/MM/DD")} - ${moment(this.form.fechaFinal.toString()).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

          let data = {};
          
          data["datosh"] = datosEnvio();
          data["admin_w"] = localStorage.Usuario;
          data["fecha_inicial"] = this.form.fechaInicial.toString();
          data["fecha_final"] = this.form.fechaFinal.toString();
          data["SUCURSAL_W"] = this.form.sucursal;

          postData(data, get_url("app/SALUD/SER5416.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_SER5416(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.Dato_sucursal();
            });
        }
      );
    },

    _montarImpresion_SER5416(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        // data.LISTADO[i]['DESCRIPCION'] = data.LISTADO[i]['DESCRIPCION'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.Dato_sucursal();
      } else {
        var columnas = [
          {
            title: "COMPROBANTE",
            value: "COMPROBANTE",
          },
          {
            title: "DISPE",
            value: "DISPE",
          },
          {
            title: "NUMERO", 
            value: "NUMERO",
          },
          {
            title: "NOMBRE",
            value: "NOMBRE",
            format: "string",
          },
          {
            title: "FOLIO", 
            value: "FOLIO",
          },
          {
            title: "FECHA",
            value: "FECHA",
          },
          {
            title: "HORA", 
            value: "HORA",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `RESUMEN DE FACTURACION   NIT: ${nit}`,
          `PERIODO DESDE: ${this.form.ano_ini}/${this.form.mes_ini}/${this.form.dia_ini} 
          HASTA: ${this.form.ano_fin}/${this.form.mes_fin}/${this.form.dia_fin}`,
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

    _ventanaSucursal() {
      _ventanaDatos({
        titulo: 'VENTANA DE SUCURSALES',
        columnas: ['CODIGO', 'DESCRIPCION'],
        data: this.array_sucursal,
        callback_esc: () => {
          document.querySelector('.sucursal').focus()
        },
        callback: (data) => {
          this.form.sucursal = data.CODIGO;
          setTimeout(() => { _enterInput('.sucursal') }, 100);
        }
      })
		},


    cargarSucursal() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON823.DLL"))
        .then((data) => {
          this.array_sucursal = data.SUCURSAL;
          loader('hide')
          this.llenarDatosFecha()
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _toggleNav();
        });
    },
  },
});