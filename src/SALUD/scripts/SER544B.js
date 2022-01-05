//  03/08/2020 - DIANA ESCOBAR: CREADO 

new Vue({
  el: "#SER544B",
  // components: {
  //   loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
  // },
  data: {
    // estado_loader: false,
    // progreso: {},
    // label_loader: null,
    // loader: 1,
    // tipo_impresion: null,

    SER544B: [],
    form: {
      facturacionpor_SER544B: '',
      tipofact_SER544B: '',
      descriptipofact_SER544B: '',
      formapago_SER544B: '',
      descripformapago_SER544B: '',
      anolistarini_SER544B: '',
      meslistarini_SER544B: '',
      dialistarini_SER544B: '',
      anolistarfin_SER544B: '',
      meslistarfin_SER544B: '',
      dialistarfin_SER544B: '',
      grupo_SER544B: '',
      grupo2_SER544B: '',
      cerradas_SER544B: '',
      discricod_SER544B: '',
    },

  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,4,8 - Resumen egresos hospitalarios");
    $_this = this;
    $_this.SER544B.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER544BANO_LNK = $_this.SER544B.FECHA_LNK.substring(0, 2);
    $_this.SER544BMES_LNK = $_this.SER544B.FECHA_LNK.substring(2, 4);
    $_this.SER544BDIA_LNK = $_this.SER544B.FECHA_LNK.substring(4, 6);
    $_this.SER544B.FECHAFINW = 00000000
    $_this.SER544B.TIPOGRW = 0
    $_this.SER544B.NUEVOTEMP = [],
      obtenerDatosCompletos(
        {
          nombreFd: 'SERVICIOS',
        },
        function (data) {
          $_this.SER544B.SERVICIOS = data.SERVICIOS
          loader("hide");
          $_this._evaluarfacturacion_SER544B()
          obtenerDatosCompletos(
            {
              nombreFd: 'FORMAPAGO',
            },
            function (data) {
              $_this.SER544B.FORMAPAGO = data.FORMAPAGO
            },
          );
        },
      );
  },

  methods: {
    _evaluarfacturacion_SER544B() {
      var SWARCH = [
        { COD: "1", DESCRIP: "Segun facturacion" },
        { COD: "2", DESCRIP: "Segun solicitud servicios" },
      ];
      POPUP(
        {
          array: SWARCH,
          titulo: "FACTURACION POR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          callback_f: () => { _toggleNav(); },
        },
        SWARCH => {
          this.form.facturacionpor_SER544B = SWARCH.COD + " - " + SWARCH.DESCRIP;
          this._evaluartipofact_SER544B()
        },
      );
    },
    _evaluartipofact_SER544B() {
      if (this.form.tipofact_SER544B.trim() == '') {
        this.form.tipofact_SER544B = '4'
      }
      validarInputs(
        {
          form: "#validartipofact_SER544B",
          orden: '1'
        },
        () => { setTimeout(this._evaluarfacturacion_SER544B, 300) },
        () => {
          if (this.form.tipofact_SER544B == '*') {
            this.form.descriptipofact_SER544B = 'TODOS LOS TIPOS'
            this._evaluarformapago_SER544B()
          } else {
            const res = this.SER544B.SERVICIOS.find(e => e.COD == this.form.tipofact_SER544B);
            if (res == undefined) {
              CON851('03', '03', null, 'error', 'error');
              this._evaluartipofact_SER544B();
            } else {
              this.form.descriptipofact_SER544B = res.DESCRIPCION
              this._evaluarformapago_SER544B()
            }
          }
        }
      )
    },

    _evaluarformapago_SER544B() {
      if (this.form.formapago_SER544B.trim() == '') {
        this.form.formapago_SER544B = '*'
      }
      validarInputs(
        {
          form: "#validarformapago_SER544B",
          orden: '1'
        }, this._evaluartipofact_SER544B,
        () => {
          var formapago = this.form.formapago_SER544B;
          if (formapago == '*') {
            this.form.descripformapago_SER544B = 'PROCESO TOTAL'
            this._evaluarfechaini_SER544B('1')
          } else {
            const res = this.SER544B.FORMAPAGO.find(e => e.COD == formapago);
            if (res == undefined) {
              CON851('03', '03', this._evaluarformapago_SER544B(), 'error', 'error');
            } else {
              this.form.descripformapago_SER544B = res.DESCRIP
              this._evaluarfechaini_SER544B('1')
            }
          }
        }
      )
    },
    _evaluarfechaini_SER544B(orden) {
      if (this.form.meslistarini_SER544B.trim() == '') {
        this.form.anolistarini_SER544B = 20 + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2)
        this.form.meslistarini_SER544B = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4)
        this.form.dialistarini_SER544B = '01'
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SER544B",
          orden: orden,
        }, this._evaluarformapago_SER544B,
        () => {
          if (this.form.anolistarini_SER544B.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SER544B("1"), "error", "error");
          } else {
            var mesinilistar = this.form.meslistarini_SER544B.padStart(2, "0");
            if (mesinilistar.trim() == "" || mesinilistar < 1 || mesinilistar > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER544B("2"), "error", "error");
            } else {
              var diainilistar = this.form.dialistarini_SER544B.padStart(2, "0");
              if (diainilistar.trim() == "" || diainilistar < 1 || diainilistar > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SER544B("3"), "error", "error");
              } else {
                this.SER544B.FECHAINIW = this.form.anolistarini_SER544B.padStart(4, "0") + this.form.meslistarini_SER544B.padStart(2, "0") + this.form.dialistarini_SER544B.padStart(2, "0")
                if (moment(this.SER544B.FECHAINIW).format('YYYYMMDD').trim() == 'Fecha inválida') {
                  CON851('', 'Dia invalido del mes', null, 'error', 'Error');
                  return this._evaluarfechaini_SER544B("3")
                }
                this._leerfact_sakSER544B();
              }
            }
          }
        },
      )
    },
    _leerfact_sakSER544B() {
      let URL = get_url("APP/SALUD/SAL548.DLL");
      postData({ datosh: datosEnvio() + '1|' + this.SER544B.FECHAINIW + '|' }, URL)
        .then(data => {
          if (this.SER544B.FECHAFINW < this.SER544B.FECHAINIW) {
            this.SER544B.FECHAFINW = this.SER544B.FECHAINIW;
            this.form.anolistarfin_SER544B = this.SER544B.FECHAFINW.substring(0, 4)
            this.form.meslistarfin_SER544B = this.SER544B.FECHAFINW.substring(4, 6)
            this.form.dialistarfin_SER544B = this.SER544B.FECHAFINW.substring(6, 8)
          }
          this._evaluarfechafin_SER544B('1')
        })
        .catch(err => {
          console.debug(err);
          this._evaluarfechaini_SER544B('3')
        })

    },
    _evaluarfechafin_SER544B(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_SER544B",
          orden: orden,
        },
        () => { this._evaluarfechaini_SER544B('3') },
        () => {
          if (this.form.anolistarfin_SER544B.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SER544B("1"), "error", "error");
          } else {
            var mesfinlistar = this.form.meslistarfin_SER544B.padStart(2, "0");
            if (mesfinlistar.trim() == "" || mesfinlistar < 1 || mesfinlistar > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SER544B("2"), "error", "error");
            } else {
              var diafinlistar = this.form.dialistarfin_SER544B.padStart(2, "0");
              if (diafinlistar.trim() == "" || diafinlistar < 1 || diafinlistar > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SER544B("3"), "error", "error");
              } else {
                this.SER544B.FECHAFINW = this.form.anolistarfin_SER544B.padStart(4, "0") + this.form.meslistarfin_SER544B.padStart(2, "0") + this.form.dialistarfin_SER544B.padStart(2, "0")
                if (this.SER544B.FECHAINIW > this.SER544B.FECHAFINW) {
                  this._evaluarfechafin_SER544B("1")
                } else {
                  if (moment(this.SER544B.FECHAFINW).format('YYYYMMDD').trim() == 'Fecha inválida') {
                    CON851('', 'Dia invalido del mes', null, 'error', 'Error');
                    return this._evaluarfechafin_SER544B("3")
                  }
                  this.form.grupo_SER544B = 'S1'
                  this.form.grupo2_SER544B = '10'
                  this._evaluarnivel_SER544B()
                }
              }
            }
          }
        },
      )
    },
    _evaluarnivel_SER544B() {
      if (this.form.cerradas_SER544B == '') {
        this.form.cerradas_SER544B = 'N'
      }
      validarInputs(
        {
          form: "#validarcerrada_SER544B",
          orden: '1'
        }, () => { this._evaluarfechafin_SER544B("3") },
        () => {
          this.form.cerradas_SER544B = this.form.cerradas_SER544B.toUpperCase()
          if (this.form.cerradas_SER544B == 'S' || this.form.cerradas_SER544B == 'N') {
            this._evaluardiscriminarcod_SER544B()
          } else {
            this._evaluarnivel_SER544B()
          }
        }
      )
    },
    _evaluardiscriminarcod_SER544B() {
      validarInputs(
        {
          form: "#validardiscricod_SER544B",
          orden: '1'
        }, this._evaluarnivel_SER544B,
        () => {
          this.form.discricod_SER544B = this.form.discricod_SER544B.toUpperCase()
          if (this.form.discricod_SER544B == 'S' || this.form.discricod_SER544B == 'N') {
            this._grabaropcion_SER544B()
          } else {
            CON851('03', '03', null, 'error', 'error');
            this._evaluardiscriminarcod_SER544B()
          }
        }
      )
    },


    async _grabaropcion_SER544B() {
      this.SER544B.FECHAACTUAL = moment().format('YYYY/MM/DD');
      this.SER544B.ACTUAL = moment().format('YYYYMMDDHHmmss');
      this.SER544B.HORAACTUAL = moment().format('HH:mm');
      //  PROCESAMIENTO DE FECHAS
      let fecha_ini = this.SER544B.FECHAINIW
      let fecha_fin = this.SER544B.FECHAFINW
      let rango_fechas = rango_fecha_meses(fecha_ini, fecha_fin)
      console.log(rango_fechas)
      //
      let datos_envio = [
        this.form.facturacionpor_SER544B.substring(0, 1),
        this.form.tipofact_SER544B,
        this.form.formapago_SER544B.substring(0, 1),
        this.form.grupo_SER544B,
        this.form.grupo2_SER544B,
        this.form.cerradas_SER544B,
        null,
        null,
        this.form.discricod_SER544B,
        localStorage.Usuario,
      ]
      console.log(datos_envio, 'ENVIO')
      let consulta_general = []
      this.estado_loader = true;
      for (const fecha of rango_fechas) {
        this.label_loader = `Procesando mes: ${fecha.label.toUpperCase()}`;

        datos_envio[6] = fecha.ini
        datos_envio[7] = fecha.fin
        let data = await this.procesar_envio(datos_envio)
        consulta_general = consulta_general.concat(data)
        this.progreso = { transferred: 0, speed: 0 }
      }

      this.loader = false
      this.label_loader = `GENERANDO IMPRESIÓN...`;
      this.progreso.completado = true
      setTimeout(() => { this.format_impresion(consulta_general) }, 700)
    },

    procesar_envio(datos_envio) {
      console.log(datos_envio, 'PROCESAR ENVIO')
      const _this = this
      return new Promise((resolve) => {
        let URL = get_url("APP/SALUD/SER544B.DLL");
        postData({
          datosh: datosEnvio() + datos_envio.join('|')
        }, URL, {
          onProgress: (progress) => {
            _this.progreso = progress;
          }
        })
          .then(data => {
            this.SER544B.HOSP = data.CONSULTA
            this.SER544B.HOSP.pop()
            resolve(this.SER544B.HOSP)
          })
          .catch(err => {
            console.error('Ha ocurrido un error durante la consulta:', err)
            resolve([])
          })
      })
    },

    format_impresion(data) {
      this.SER544B.TEMP = data
      for (var i in this.SER544B.TEMP) {
        this.SER544B.TEMP[i].VALOR1 = this.SER544B.TEMP[i].Valores[0].trim()
        this.SER544B.TEMP[i].VALOR2 = this.SER544B.TEMP[i].Valores[1].trim()
        this.SER544B.TEMP[i].VALOR3 = this.SER544B.TEMP[i].Valores[2].trim()
        this.SER544B.TEMP[i].VALOR4 = this.SER544B.TEMP[i].Valores[3].trim()
        this.SER544B.TEMP[i].VALOR5 = this.SER544B.TEMP[i].Valores[4].trim()
        this.SER544B.TEMP[i].VALOR6 = this.SER544B.TEMP[i].Valores[5].trim()
        this.SER544B.TEMP[i].VALOR7 = this.SER544B.TEMP[i].Valores[6].trim()
        this.SER544B.TEMP[i].VALOR8 = this.SER544B.TEMP[i].Valores[7].trim()

        this.SER544B.TEMP[i].CANT1 = this.SER544B.TEMP[i].Totalpaci[0].trim()
        this.SER544B.TEMP[i].CANT2 = this.SER544B.TEMP[i].Totalpaci[1].trim()
        this.SER544B.TEMP[i].CANT3 = this.SER544B.TEMP[i].Totalpaci[2].trim()
        this.SER544B.TEMP[i].CANT4 = this.SER544B.TEMP[i].Totalpaci[3].trim()
        this.SER544B.TEMP[i].CANT5 = this.SER544B.TEMP[i].Totalpaci[4].trim()
        this.SER544B.TEMP[i].CANT6 = this.SER544B.TEMP[i].Totalpaci[5].trim()
        this.SER544B.TEMP[i].CANT7 = this.SER544B.TEMP[i].Totalpaci[6].trim()
        this.SER544B.TEMP[i].CANT8 = this.SER544B.TEMP[i].Totalpaci[7].trim()
        if (this.form.discricod_SER544B == 'N') {
          if(this.SER544B.TEMP[i].Apel1 == "RESUMEN POR")this.SER544B.NUEVOTEMP.push(this.SER544B.TEMP[i])
        }else{
          this.SER544B.NUEVOTEMP.push(this.SER544B.TEMP[i])
        }
      }
      let columnas = [
        {
          title: "1APELLIDO",
          value: 'Apel1',
          format: "string"
        },
        {
          title: "2APELLIDO",
          value: 'Apel2',
          format: "string"
        },
        {
          title: "1NOMBRE",
          value: 'Nombre1',
          format: "string"
        },
        {
          title: "2NOMBRE",
          value: 'Nombre2',
          format: "string"
        },
        {
          title: "NRO IDENTIFICACION",
          value: 'Cod',
        },
        {
          title: "ENTIDAD",
          value: 'Entidad',
        },
        {
          title: "EDAD",
          value: 'Edad',
        },
        {
          title: "FACTURA",
          value: 'Factura',
          format: "string"
        },
        {
          title: "REGIMEN SUBSIDIADO",
          value: 'CANT1',

        },
        {
          title: "VALOR 1",
          value: 'VALOR1',
          format: "money"
        },
        {
          title: "VINCULADOS",
          value: 'CANT2',
        },
        {
          title: "VALOR 2",
          value: 'VALOR2',
          format: "money"
        },
        {
          title: "CONTRIBUTIVO",
          value: 'CANT3',
        },
        {
          title: "VALOR 3",
          value: 'VALOR3',
          format: "money"
        },
        {
          title: "ACCIDENTES DE TRANSITO",
          value: 'CANT4',
        },
        {
          title: "VALOR 4",
          value: 'VALOR4',
          format: "money"
        },
        {
          title: "FISALUD",
          value: 'CANT5',
        },
        {
          title: "VALOR 5",
          value: 'VALOR5',
          format: "money"
        },
        {
          title: "DESPLAZADOS",
          value: 'CANT6',
        },
        {
          title: "VALOR 6",
          value: 'VALOR6',
          format: "money"
        },
        {
          title: "RIESGOS PROFESIONALES",
          value: 'CANT7',
        },
        {
          title: "VALOR 7",
          value: 'VALOR7',
          format: "money"
        },
        {
          title: "PARTICULARES",
          value: 'CANT8',
        },
        {
          title: "VALOR 8",
          value: 'VALOR8',
          format: "money"
        },
      ]
      _impresion2({
        tipo: 'excel',
        header: [
          {
            text: `${$_USUA_GLOBAL[0].NOMBRE}` + 'NIT: ' + `${$_USUA_GLOBAL[0].NIT}`,
            bold: true,
            size: 14
          },
          `DESDE: ` + this.SER544B.FECHAINIW + `HASTA: ` + this.SER544B.FECHAFINW + ' Hora:' + this.SER544B.HORAACTUAL,
        ],
        logo: `${$_USUA_GLOBAL[0].NIT}.png`,
        tabla: {
          columnas,
          data: this.SER544B.NUEVOTEMP,
        },
        archivo: `LISTADO-DE-RESUMEN-${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
      })
        .then(() => {
          this.estado_loader = false
          CON851(
            "",
            "Impreso Correctamente",
            null,
            "success",
            "Exito"
          );
          _toggleNav()
        })
        .catch(() => {
          this.estado_loader = false
          CON851('', 'Ha ocurrido un error generando la impresión.', null, 'error', 'Error')
          this._evaluardiscriminarcod_SER544B()
        })
    },



    _f8tiposerv_SER544B() {
      var $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIPCION"],
        data: $_this.SER544B._servicios,
        callback_esc: function () {
          $(".tipofact_SER544B").focus();
        },
        callback: function (data) {
          $_this.form.tipofact_SER544B = (data.COD)
          _enterInput('.tipofact_SER544B');
        }
      });

    },
    _f8formapago_SER544B() {
      var $_this = this;
      _ventanaDatos({
        titulo: "FORMAS DE PAGO",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER544B._formapago,
        callback_esc: function () {
          $(".formapago_SER544B").focus();
        },
        callback: function (data) {
          $_this.form.formapago_SER544B = (data.COD)
          _enterInput('.formapago_SER544B');
        }
      });

    },
    _f8grupo_SER544B() {
      var $_this = this;
      if ($_this.form.tipofact_SER544B == '0') {
        _ventanaDatos({
          titulo: "VENTANA DE GRUPOS",
          columnas: ["TIPO", "GRUPO", "DESCRIP"],
          data: $_this.SER544B.GRUPOS,
          callback_esc: function () {
            $(".grupo_SER544B").focus();
          },
          callback: function (data) {
            $_this.form.grupo_SER544B = data.GRUPO.trim()
            _enterInput('.grupo_SER544B');
          }
        });
      } else {
        _ventanaDatos({
          titulo: "VENTANA DE GRUPOS DE SERVICIOS",
          columnas: ["COD", "DESCRIP"],
          data: $_this.SER544B._gruposer,
          callback_esc: function () {
            $(".grupo_SER544B").focus();
          },
          callback: function (data) {
            $_this.form.grupo_SER544B = data.COD.trim()
            _enterInput('.grupo_SER544B');
          }
        });

      }
    },


  },
});
