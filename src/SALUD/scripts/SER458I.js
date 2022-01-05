// 28/09/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER458I",
  data: {
    SER458I: [],
    form: {
      anolistarini_SER458I: "",
      meslistarini_SER458I: "",
      dialistarini_SER458I: "",
      anolistarfin_SER458I: "",
      meslistarfin_SER458I: "",
      dialistarfin_SER458I: "",
      nit_SER458I: "",
      descripnit_SER458I: "",
      operador_SER458I: "",
      descripoper_SER458I: "",
      envio_SER458I: "",
      descripenvio_SER458I: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,3,L,2 - Imprime facturas de MYT");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_ANO_LNK = $_ANO_LNK + 20;
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_FECHAACTUAL = moment().format('YYYYMMDD');
    $_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
    $_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
    $_DIAACTUALW = $_FECHAACTUAL.substring(6, 8);
    var $_this = this;
    obtenerDatosCompletos({
      nombreFd: "TERCEROS",
    }, function (data) {
      $_this.SER458I.TERCEROS = data.TERCEROS;
      $_this.SER458I.TERCEROS.pop();
      obtenerDatosCompletos({
        nombreFd: "OPERADOR",
      }, function (data) {
        $_this.SER458I.OPERADOR = data.ARCHREST;
        $_this.SER458I.OPERADOR.pop();
        $_this._evaluarfechaini_SER458I('1')
        obtenerDatosCompletos({
          nombreFd: 'ENVIOS',
        }, function (data) {
          $_this.SER458I.ENVIOS = data.ENVIOS;
          $_this.SER458I.ENVIOS.pop();
          $_this.SER458I.FILTROENVIO = $_this.SER458I.ENVIOS.filter(e => e.PER.trim() == $_ANO_LNK + $_MES_LNK);
        });
      });
    });
  },
  methods: {
    _evaluarfechaini_SER458I(orden) {
      loader("hide");
      this.form.anolistarini_SER458I = $_ANO_LNK;
      this.form.meslistarini_SER458I = $_MES_LNK;
      this.form.dialistarini_SER458I = "01";
      this.form.anolistarfin_SER458I = $_ANOACTUALW;
      this.form.meslistarfin_SER458I = $_MESACTUALW;
      this.form.dialistarfin_SER458I = $_DIAACTUALW;
      validarInputs(
        {
          form: "#fechalistarInicial_458I",
          orden: orden,
        },
        _toggleNav,
        () => {
          if (this.form.anolistarini_SER458I.trim() == "" || this.form.anolistarini_SER458I < 1990) {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SER458I("1"), "error", "error");
          } else {
            this.form.meslistarini_SER458I = this.form.meslistarini_SER458I.padStart(2, "0");
            if (this.form.meslistarini_SER458I.trim() == "" || this.form.meslistarini_SER458I < 1 || this.form.meslistarini_SER458I > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER458I("2"), "error", "error");
            } else {
              this.form.dialistarini_SER458I = this.form.dialistarini_SER458I.padStart(2, "0");
              if (this.form.dialistarini_SER458I.trim() == "" || this.form.dialistarini_SER458I < 1 || this.form.dialistarini_SER458I > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SER458I("3"), "error", "error");
              } else {
                this.SER458I.FECHAINICIO = this.form.anolistarini_SER458I + this.form.meslistarini_SER458I + this.form.dialistarini_SER458I
                this._validarfechafinal_SER458I("1");
              }
            }
          }
        },
      );
    },
    _validarfechafinal_SER458I(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_458I",
          orden: orden,
        },
        () => { this._evaluarfechaini_SER458I("3") },
        () => {
          if (this.form.anolistarfin_SER458I.trim() == "" || this.form.anolistarfin_SER458I < 1990) {
            CON851("", "Año incorrecto! ", this._validarfechafinal_SER458I("1"), "error", "error");
          } else {
            this.form.meslistarfin_SER458I = this.form.meslistarfin_SER458I.padStart(2, "0");
            if (this.form.meslistarfin_SER458I.trim() == "" || this.form.meslistarfin_SER458I < 1 || this.form.meslistarfin_SER458I > 12) {
              CON851("", "Mes incorrecto! ", this._validarfechafinal_SER458I("2"), "error", "error");
            } else {
              this.form.dialistarfin_SER458I = this.form.dialistarfin_SER458I.padStart(2, "0");
              if (this.form.dialistarfin_SER458I.trim() == "" || this.form.dialistarfin_SER458I < 1 || this.form.dialistarfin_SER458I > 31) {
                CON851("", "Dia incorrecto! ", this._validarfechafinal_SER458I("3"), "error", "error");
              } else {
                this.SER458I.FECHAFINAL = this.form.anolistarfin_SER458I + this.form.meslistarfin_SER458I + this.form.dialistarfin_SER458I
                if (this.SER458I.FECHAFINAL < this.SER458I.FECHAINICIO) {
                  this._validarfechafinal_SER458I("1")
                } else {
                  this._evaluarnit_SER458I()
                }
              }
            }
          }
        },
      );
    },
    _evaluarnit_SER458I() {
      if (this.form.nit_SER458I.trim() == '') this.form.nit_SER458I = '99'
      validarInputs(
        {
          form: "#validanit_458I",
          orden: "1",
        },
        () => { this._validarfechafinal_SER458I("2"); },
        () => {

          if (this.form.nit_SER458I == '99') {
            this.form.descripnit_SER458I = 'PROCESO TOTAL'
            this._evaluarnumeracion_SER458I()
          } else {
            const res = this.SER458I.TERCEROS.find(e => e.COD == this.form.nit_SER458I);
            if (res == undefined) {
              CON851('01', '01', this._evaluarnit_SER458I(), 'error', 'error');
            } else {
              this.form.descripnit_SER458I = res.NOMBRE;
              this._evaluarnumeracion_SER458I()
            }
          }
        },
      );
    },
    _evaluarnumeracion_SER458I() {
      postData({ datosh: datosEnvio() + '1|' + this.SER458I.FECHAINICIO + '|' + this.SER458I.FECHAFINAL + '|' + this.form.nit_SER458I + '| | |' }, get_url("APP/SALUD/SER458I.DLL"))
        .then(data => {
          this._evaluaroperador_SER458I();
        })
        .catch(err => {
          this._evaluarnit_SER458I();
        });
    },
    _evaluaroperador_SER458I() {
      if (this.form.operador_SER458I.trim() == '') this.form.operador_SER458I = '****'
      validarInputs(
        {
          form: "#validaroperador_458I",
          orden: "1",
        }, this._evaluarnit_SER458I,
        () => {
          if (this.form.operador_SER458I == '****') {
            this.form.descripoper_SER458I = 'TODOS LOS FACTURADORES'
            this._evaluarfechaingreso_SER458I()
          } else {
            const res = this.SER458I.OPERADOR.find(e => e.CODIGO == this.form.operador_SER458I);
            if (res == undefined) {
              CON851('01', '01', this._evaluaroperador_SER458I(), 'error', 'error');
            } else {
              this.form.descripoper_SER458I = res.DESCRIPCION;
              this._evaluarfechaingreso_SER458I()
            }
          }
        },
      );
    },
    _evaluarfechaingreso_SER458I() {
      fechaingMask_SER457A.typedValue = 'N';
      validarInputs({
        form: '#validarfechaing_458I',
        orden: '1',
      },
        () => { this._evaluaroperador_SER458I() },
        () => {
          if (fechaingMask_SER457A.value.trim() == '') fechaingMask_SER457A.typedValue = 'N';
          this._evaluarnumeroenvio_SER458I()
        }
      )
    },
    _evaluarnumeroenvio_SER458I() {
      if (this.form.envio_SER458I.trim() == '') this.form.envio_SER458I = '99'
      validarInputs(
        {
          form: "#validarenvio_458I",
          orden: "1",
        }, this._evaluarfechaingreso_SER458I,
        () => {
          if (this.form.envio_SER458I == '99') {
            this.form.descripenvio_SER458I = "TODOS LOS ENVIOS";
            loader("show");
            this._evaluadll_SER458I()
          } else {
            const res = this.SER458I.FILTROENVIO.find(e => e.NRO == this.form.envio_SER458I);
            if (res == undefined) {
              CON851('01', '01', this._evaluarnumeroenvio_SER458I(), 'error', 'error');
            } else {
              this.form.descripenvio_SER458I = res.DESCRIPCION_TERCERO;
              loader("show");
              this._evaluadll_SER458I()
            }
          }
        },
      );
    },
    _evaluadll_SER458I() {
      postData({ datosh: datosEnvio() + '2|' + this.SER458I.FECHAINICIO + '|' + this.SER458I.FECHAFINAL + '|' + this.form.nit_SER458I + '|' + this.form.operador_SER458I + '|' + this.form.envio_SER458I + '|' }, get_url("APP/SALUD/SER458I.DLL"))
        .then(data => {
          SER458I.FACTURAS = data.FACTURA
          SER458I.FACTURAS2 = data
          SER458I.FACTURAS.pop()
          let impresionSER458I = new Object;
          impresionSER458I.FACTURASMYT = SER458I.FACTURAS
          impresionSER458I.OPERADOR = SER458I.FACTURAS[0].OPER
          impresionSER458I.OPERMOD = SER458I.FACTURAS[0].OPER_MOD
          impresionSER458I.FECHACTUAL = moment().format('YYYYMMDD')
          impresionSER458I.ADMINW = localStorage.getItem('Usuario');
          SER458I.TOTALBRUTO = 0;
          SER458I.ITEMLOCAL = 0;
          for (var i in SER458I.FACTURAS2.FACTURA) {
            SER458I.ITEMLOCAL++
            if (parseInt(SER458I.FACTURAS2.FACTURA[i].VLRBRUTO) > 0) {
              SER458I.TOTALBRUTO = SER458I.TOTALBRUTO + parseInt(SER458I.FACTURAS2.FACTURA[i].VLRBRUTO);
            }
          }
          impresionSER458I.VLRTOTAL = SER458I.TOTALBRUTO
          _impresionfacturamytSER458I(impresionSER458I, this._evaluarimpresionformulario_SER458I, this._evaluarnumeroenvio_SER458I)
        })
        .catch(err => {
          loader("hide");
          this._evaluarnumeroenvio_SER458I()
        });
    },
    _evaluarimpresionformulario_SER458I() {
      CON851P('OK, para imprimir formulario de radicacion', _toggleNav, this._segundaimp_SERSER458I)
    },
    _segundaimp_SERSER458I() {
      this.SER458I.ENVIOLNK = '';
      let impresionSER458I2 = new Object;
      SER458I.ITEMLOCAL = SER458I.ITEMLOCAL.toString().padStart(3, '0')
      impresionSER458I2.FECHARAD = moment().format('YYYYMMDD')
      impresionSER458I2.RADICADO = this.SER458I.ENVIOLNK
      impresionSER458I2.NROCOBRO = SER458I.ITEMLOCAL 
      impresionSER458I2.VALORCOBRO = SER458I.TOTALBRUTO
      impresionSER458I2.VALORTOTAL = SER458I.TOTALBRUTO
      impresionSER458I2.TOTALFOLIO = SER458I.ITEMLOCAL
      _impresion2facturamytSER458I(impresionSER458I2, _toggleNav, this._evaluarnumeroenvio_SER458I)
    },






    _f8nit_SER458I() {
      var $_this = this
      _ventanaDatos_lite_v2({
        titulo: 'VENTANA DE TERCEROS',
        data: $_this.SER458I.TERCEROS,
        indice: ["COD", "NOMBRE", "CIUDAD", "ACT"],
        mascara: [{
          "COD": 'Identificacion',
          "NOMBRE": 'Nombre',
          "DIRREC": "direccion",
          "TELEF": "telefono"
        }],
        minLength: 3,
        callback_esc: function () {
          $(".nit_SER458I").focus();
        },
        callback: function (data) {
          $_this.form.nit_SER458I = data.COD
          _enterInput('.nit_SER458I');
        }
      });
    },
    _f8operador_SER458I() {
      var $_this = this;
      _ventanaDatos({
        titulo: "GRUPOS DE OPERADORES",
        columnas: ["CODIGO", "DESCRIPCION", "ID"],
        data: $_this.SER458I.OPERADOR,
        callback_esc: function () {
          $(".operador_SER458I").focus();
        },
        callback: function (data) {
          $_this.form.operador_SAL548 = data.CODIGO.trim();
          _enterInput(".operador_SER458I");
        },
      });
    },
    _f8envio_SER458I() {
      var $_this = this
      if ($_this.SER458I.FILTROENVIO.length == 0) {
        CON851("08", "08 ", this._evaluarnroenv_SER513(), "error", "error");
      } else {
        _ventanaDatos({
          titulo: 'VENTANA DE ENVIOS',
          columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
          data: $_this.SER458I.FILTROENVIO,
          callback_esc: function () {
            $(".envio_SER458I").focus();
          },
          callback: function (data) {
            form.envio_SER458I = data.NRO
            _enterInput('.envio_SER458I');
          }
        });
      }
    }
  },
});

var fechaingMask_SER457A = IMask($('#fechaing_SER458I')[0], {
  mask: 'a',
  definitions: {
    'a': /[SN]/
  },
  prepare: function (str) {
    if (str.trim() == '') {
      return false
    } else {
      return str.toUpperCase()
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase()
  }
});