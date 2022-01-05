//  23/09/2021 - CARLOS: CREADO 

new Vue({
  el: "#INV547",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      fact: '',
      descripFact: '',

      discri: '',
      
      fechaInicial: '',
      fechaFinal: '',

      ano_ini: '',
      mes_ini: '',
      dia_ini: '',

      ano_fin: '',
      mes_fin: '',
      dia_fin: '',

      nit: '',
      descripNit: '',
    },

    _terceros: [],

     resumenFact: [
      { COD: "1", DESCRIP: "Segun facturacion" },
      { COD: "2", DESCRIP: "Segun solicitud servicios" },
    ],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    Fecha_act: moment().format("YYYYMMDD"),
  },
  async created() {
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,4,2 - Resumen x clase y forma pago");
    this.cargarTerceros()
   },

  methods: {
    validarFactura() {
      POPUP(
        {
          array: this.resumenFact,
          titulo: "Resumen de facturacion por tipo",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: 1,
          callback_f: () => { _toggleNav(); },
        },
        (data) => {
          this.form.fact = data.COD;
          this.form.descripFact = data.DESCRIP;
          setTimeout ( () => {
            this.evaluardiscriminarfactura();
          }, 100);
        },
      );
    },

    evaluardiscriminarfactura() {
      validarInputs(
        {
          form: "#validardiscri",
          orden: '1'
        },
        () => {
          this.validarFactura();
        },
        () => {
          let discri = this.form.discri.toUpperCase() || 'N'
          this.form.discri = discri
          
          if (discri == 'S' || discri == 'N') {
            this.llenarDatosFecha()
          } else {
            CON851('03', '03', null, 'error', 'error');
            this.evaluardiscriminarfactura()
          }
        }
      )
    },
    
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
        this.evaluardiscriminarfactura();
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
        this.validarMesIni();
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
        this.validarDiaIni();
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
        this.validarMesFin();
      }, () => {
        this.form.dia_fin = cerosIzq(this.form.dia_fin, 2);
        let dia = parseInt(this.form.diaFinal);
        this.form.fechaInicial = parseInt(`${this.form.ano_ini}${this.form.mes_fin}${this.form.dia_ini}`);
        this.form.fechaFinal = parseInt(`${this.form.ano_fin}${this.form.mes_fin}${this.form.dia_fin}`);
        if (dia < 1 || dia > 31) {
          this.validarDiaFin();
        } else if (this.form.fechaFinal < this.form.fechaInicial) {
          CON851('37', '37', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          this.validarNit();
        }
      })
    },

    validarNit() {
      validarInputs({
        form: '#validarnit',
        orden: "1",
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.nit = this.form.nit || "99";    
        let nit = this.form.nit;

        if (nit == '99') {
          this.form.descripNit = 'Proceso total.';
          this._envioImpresion();
        } else {
          let busq = this._terceros.find(a => a.COD == nit);
          if (busq != undefined) {
            this.form.descripNit = busq.NOMBRE;
            this._envioImpresion();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarNit();
          }
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          this.validarNit();
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
          data["fecha_inicial"] = this.form.fechaInicial;
          data["fecha_final"] = this.form.fechaFinal;
          data["tipo_fact"] = this.form.fact;
          data["fact"] = this.form.discri;
          data["nit"] = this.form.nit;

          postData(data, get_url("app/SALUD/INV547.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_INV547(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validarNit();
            });
        }
      );
    },

    _montarImpresion_INV547(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        data.LISTADO[i]['DESCRIPCION'] = data.LISTADO[i]['DESCRIPCION'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validarNit();
      } else {
        var columnas = [
          {
            title: "DESCRIPCION",
            value: "DESCRIPCION",
            format: "string",
          },
          {
            title: " ",
            value: "CANTIDAD1",
          },
          {
            title: "CONTADO", 
            value: "CONTADO",
          },
          {
            title: " ",
            value: "CANTIDAD2",
          },
          {
            title: "HOSPITALIZADOS", 
            value: "HOSPITALIZADOS",
          },
          {
            title: " ",
            value: "CANTIDAD3",
          },
          {
            title: "AMBULATORIO", 
            value: "AMBULATORIO",
          },
          {
            title: " ",
            value: "CANTIDAD4",
          },
          {
            title: "ACCIDTRANSITO",
            value: "ACCID_TRANSITO",
          },
          {
            title: "TOTAL", 
            value: "TOTAL",
          },
          {
            title: "IDENTIFICACION", 
            value: "IDENTIFICACION",
          },
          {
            title: "PACIENTE", 
            value: "PACIENTE",
          },
          {
            title: "ENTIDAD", 
            value: "ENTIDAD",
          },
          {
            title: "MEDICO", 
            value: "MEDICO",
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
    
    _ventanaNIT(){
      _ventanaDatos({
        titulo: 'VENTANA TERCEROS',
        columnas: ['COD', 'NOMBRE'],
        data: this._terceros,
        callback_esc: () => {
          document.querySelector('.nit').focus()
        },
        callback: (data) => {
          this.form.descripNit = data.NOMBRE;
          setTimeout(() => { _enterInput('.nit') }, 100);
        }
      })
    },

    cargarTerceros() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON802.DLL"))
        .then((data) => {
          this._terceros = data.TERCEROS;
          loader('hide')
          this.validarFactura()
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _toggleNav();
        });
    },
  },
});
