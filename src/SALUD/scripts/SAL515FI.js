// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SAL515FI",
  data: {
    SAL515FI: [],
    form: {
      consulta_SAL515FI: "",
      nroelec_SAL515FI: "",
      prefijo_SAL515FI: "",
      numero_SAL515FI: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,6,G,3 - Impresion masiva de factura electronica");
    $_this = this;
    $_this.SAL515FI.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SAL515FI.ANO_LNK = $_this.SAL515FI.FECHA_LNK.substring(0, 2);
    $_this.SAL515FI.MES_LNK = $_this.SAL515FI.FECHA_LNK.substring(2, 4);
    $_this.SAL515FI.DIA_LNK = $_this.SAL515FI.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "ELECENVIOS",
    }, function (data) {
      $_this.SAL515FI.ELECENVIOS = data.ELECENVIOS;
      $_this.SAL515FI.ELECENVIOS.pop();
      $_this.SAL515FI.FILTROELEC = $_this.SAL515FI.ELECENVIOS.filter(e => e.PER.trim() == 20 + $_this.SAL515FI.ANO_LNK + $_this.SAL515FI.MES_LNK);
      console.log('FILTRO', $_this.SAL515FI.FILTROELEC)
      obtenerDatosCompletos({
        nombreFd: "PREFIJOS",
      }, function (data) {
        $_this.SAL515FI.PREFIJOS = data.PREFIJOS;
        loader("hide");
        $_this._evaluarconsulta_SAL515FI()
      });
    });
  },
  methods: {
    _evaluarconsulta_SAL515FI() {
      validarInputs({
        form: "#VALIDAR0_SAL515FI",
        orden: "1"
      }, 
        () => { _toggleNav() },
        () => {
          this.form.consulta_SAL515FI = this.form.consulta_SAL515FI.toUpperCase();
          if (this.form.consulta_SAL515FI == 'S' || this.form.consulta_SAL515FI == 'N') {
            if (this.form.consulta_SAL515FI == 'S') {
              $('#NUMEROELEC_SAL515FI').removeClass('hidden');

              this._evaluarenvioelec_SAL515F()
            } else {
              $('#CONSULTAFACT_SAL515FI').removeClass('hidden');

              this._evaluarprefijofact_SAL515F()
            }
          } else {
            CON851("", "Dato requerido!", this._evaluarconsulta_SAL515FI(), "error", "Error");
          }
        }
      )
    },
    _evaluarenvioelec_SAL515F() {
      validarInputs({
        form: "#VALIDAR1_SAL515FI",
        orden: '1'
      },
        () => {
          $('#NUMEROELEC_SAL515FI').addClass('hidden')
          this._evaluarconsulta_SAL515FI()
        },
        () => {
          if (this.form.nroelec_SAL515FI == '' || this.form.nroelec_SAL515FI == 0) {
            CON851("01", "01", this._evaluarenvioelec_SAL515F(), "error", "Error");
          } else {
            if (this.form.nroelec_SAL515FI == '999999') {
              $('#FECHAIMP_SAL515FI').removeClass('hidden');
              this._evaluarfechaimpresion_SAL515FI('1')
            } else {
              postData({
                datosh: datosEnvio() + '1|' + this.form.nroelec_SAL515FI.toString().padStart(6, '0') + '|'
              }, get_url("APP/SALUD/SER613G.DLL"))
                .then((data) => {
                  this.SAL515FI.ELECTFACTURACION = data.ELECFACTURACION[0];
                  this._evaluarimpresion_SAL515F()
                })
                .catch((error) => {
                  console.log(error);
                  this._evaluarenvioelec_SAL515F()
                });
            }
          }
        }
      )
    },
    _evaluarfechaimpresion_SAL515FI(orden) {
      validarInputs({
        form: "#fechalistarInicial_SAL515FI",
        orden: orden
      }, () => {
        $('#FECHAIMP_SAL515FI').addClass('hidden');
        this._evaluarenvioelec_SAL515F()
      },
        () => {
          if (this.form.anolistarini_SAL515FI.trim() == "" || this.form.anolistarini_SAL515FI < 1990) {
            CON851("", "Año incorrecto! ", this._evaluarfechaimpresion_SAL515FI("1"), "error", "error");
          } else {
            var mesinilistar = this.form.meslistarini_SAL515FI.padStart(2, "0");
            if (mesinilistar.trim() == "" || mesinilistar < 1 || mesinilistar > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaimpresion_SAL515FI("2"), "error", "error");
            } else {
              this.SAL515FI.FECHAINIW = this.form.anolistarini_SAL515FI + this.form.meslistarini_SAL515FI.padStart(2, "0")
              this._validarfechafin_SAL515FI("1");
            }
          }
        }
      )
    },
    _validarfechafin_SAL515FI(orden) {
      validarInputs({
        form: "#fechalistarFinal_SAL515FI",
        orden: orden
      }, () => { this._evaluarfechaimpresion_SAL515FI("3") },
        () => {
          if (this.form.anolistarfin_SAL515FI.trim() == "" || this.form.anolistarfin_SAL515FI < 1990) {
            CON851("", "Año incorrecto! ", this._validarfechafin_SAL515FI("1"), "error", "error");
          } else {
            var mesfinlistar = this.form.meslistarfin_SAL515FI.padStart(2, "0");
            if (mesfinlistar.trim() == "" || mesfinlistar < 1 || mesfinlistar > 12) {
              CON851("", "Mes incorrecto! ", this._validarfechafin_SAL515FI("2"), "error", "error");
            } else {
              this.SAL515FI.FECHAFINW = this.form.anolistarfin_SAL515FI + this.form.meslistarfin_SAL515FI.padStart(2, "0")
              this._evaluarimpresion_SAL515F()
            }
          }
        }
      )
    },
    _evaluarprefijofact_SAL515F() {
      validarInputs({
        form: "#VALIDARPREFIJO_SAL515FI",
        orden: "1"
      }, () => {
        $('#CONSULTAFACT_SAL515FI').addClass('hidden')
        this._evaluarconsulta_SAL515FI()
      },
        () => {
          SAL515FI.PREFIJOW = prefijoMask_SAL515FI.value;
          this._evaluarnumerofact_SAL515F()
        }
      )
    },
    _evaluarnumerofact_SAL515F() {
      validarInputs({
        form: "#VALIDARNUMERO_SAL515FI",
        orden: "1"
      }, () => { this._evaluarimpresion_SAL515F() },
        () => {
          this.form.numero_SAL515FI = this.form.numero_SAL515FI.toString().padStart(6, '0')
          if (this.form.numero_SAL515FI == '000000') {
            CON851("01", "01", this._evaluarnumerofact_SAL515F(), "error", "Error");
          } else {
            let URL = get_url("APP/SALUD/SER808-01.DLL");
            postData({
              datosh: datosEnvio() + SAL515FI.PREFIJOW + this.form.numero_SAL515FI + "|",
            }, URL)
              .then(data => {
                this.SAL515FI.NUMER = data.NUMER19[0];
                this._evaluarimpresion_SAL515F()
              })
              .catch(error => {
                console.error(error);
                this._evaluarnumerofact_SAL515F();
              });
          }
        }
      )
    },
    _evaluarimpresion_SAL515F() {
      loader('show');
      let URL = get_url("APP/SALUD/SAL515FI.DLL");
      postData({
        datosh: datosEnvio() + this.form.consulta_SAL515FI + '|' + this.form.nroelec_SAL515FI + "|" + this.SAL515FI.FECHAINIW + '|' + this.SAL515FI.FECHAFINW + '|' + SAL515FI.PREFIJOW + this.form.numero_SAL515FI + '|',
      }, URL)
        .then(data => {
          console.log(data, 'TRAE IMPRESION')
          data.ELECIMPRESION.pop();
          let pruebatoken = this.SAL515FI.PREFIJOS[0].PRUEBA_TOKEN;
          let proveedor = this.SAL515FI.PREFIJOS[0].PROV_FACT_ELECT;
          if (pruebatoken == 'S') pruebatoken = true
          else pruebatoken = false
          console.log(pruebatoken);
          generarPDF_envios({ proveedor: proveedor, tipo_envio: pruebatoken, cufes:data.ELECIMPRESION, vista:true, nit: $_USUA_GLOBAL[0].NIT.toString().padStart(10,'0') })
          .then((data) => {
            loader('hide');
            console.log(data);
            this.SAL515FI.RUTA = data;
            setTimeout(this._finalizar_SAL515FI, 1000)
          })
          .catch(error => {
              loader('hide');
              console.error(error);
              this._evaluarconsulta_SAL515FI();
          });
        })
        .catch(error => {
          loader('hide');
          console.error(error);
          this._evaluarconsulta_SAL515FI();
        });
    },
    _finalizar_SAL515FI() {
      let { exec } = require('child_process');
      exec(`START ${this.SAL515FI.RUTA}`, (err,stdout,stderr) => {
        if (err) console.error(err)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      })
      CON851('','Impreso',_toggleNav(),'success','Exito');
    },

    _f8numeracion_SAL515FI() {
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Buscar por tercero', 'buscar por paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_this.SAL515FI.FACT = data.COD;
          $_this.form.facturatabla_SER613G = $_this.SAL515FI.FACT.substring(1, 7)
          _enterInput('.factura_SAL515FI');
        },
        cancel: () => {
          _enterInput('.factura_SAL515FI');
        }
      };
      F8LITE(parametros);
    },
    _f8elecenvios_SAL515FI() {
      if ($_this.SAL515FI.FILTROELEC.length == 0) {
        CON851('08', '08', $(".envioelec_SAL515FI").focus(), 'error', 'error');
      } else {
        _ventanaDatos({
          titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
          columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", 'FECHA'],
          data: $_this.SAL515FI.FILTROELEC,
          callback_esc: function () {
            $(".envioelec_SAL515FI").focus();
          },
          callback: function (data) {
            $_this.form.nroelec_SAL515FI = data.NRO
            _enterInput('.envioelec_SAL515FI');
          }
        });
      }
    }
  },
});

var prefijoMask_SAL515FI = IMask($('#prefijo_SAL515FI')[0], {
  mask: 'a',
  definitions: {
    'a': /[APTBEDFGHIJKLMNQRSVWXYZ]/
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
