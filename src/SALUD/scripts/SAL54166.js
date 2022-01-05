// 23/01/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER5409",
  data: {
    SER5409: [],
    form: {
      anoini_SER5409: "",
      mesini_SER5409: "",
      diaini_SER5409: "",
      anofin_SER5409: "",
      mesfin_SER5409: "",
      diafin_SER5409: "",
      satisfaccion_SER5409: "",
      eventos_SER5409: "",
      auditoria_SER5409: "",
      aseguradoras_SER5409: "",
      codsucursal_SER5409: "",
      descrcipsucursal_SER5409: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,2,4,9 - Informe resolucion 256 DE 2016");
    $_this = this;
    $_this.SER5409.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER5409.ANO_LNK = $_this.SER5409.FECHA_LNK.substring(0, 2);
    $_this.SER5409.MES_LNK = $_this.SER5409.FECHA_LNK.substring(2, 4);
    $_this.SER5409.DIA_LNK = $_this.SER5409.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "SUCURSALES",
    },
      function (data) {
        $_this.SER5409.SUCURSAL = data.SUCURSAL;
        // $_this.SER5409.SUCURSAL.pop();
        loader("hide");
        $_this._evaluarfechaini_SER5409('1')
      },
    );
  },
  methods: {
    _evaluarfechaini_SER5409(orden) {
      this.form.anoini_SER5409 = 20 + this.SER5409.ANO_LNK
      this.form.mesini_SER5409 = this.SER5409.MES_LNK
      this.form.diaini_SER5409 = '01'
      validarInputs(
        {
          form: "#fechaInicial_SER5409",
          orden: orden
        },
        () => { _toggleNav() },
        () => {
          if (this.form.anoini_SER5409.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SER5409('1');
          } else {
            if (this.form.mesini_SER5409.trim() == '' || this.form.mesini_SER5409 < 01 || this.form.mesini_SER5409 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SER5409('2');
            } else {
              if (this.form.diaini_SER5409.trim() == '' || this.form.diaini_SER5409 < 01 || this.form.diaini_SER5409 > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SER5409('3'), 'error', 'error');
              } else {
                this.SER5409.FECHAINIW = this.form.anoini_SER5409 + this.form.mesini_SER5409 + this.form.diaini_SER5409
                postData({ datosh: datosEnvio() + '1|' + this.SER5409.FECHAINIW + "|" }, get_url("APP/SALUD/SER5407.DLL"))
                  .then(data => {
                    console.log(data, 'PASO 1 ')
                    this._evaluarfechafin_SER5409('1')
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarfechaini_SER5409('1')
                  });
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SER5409(orden) {
      this.form.anofin_SER5409 = 20 + this.SER5409.ANO_LNK
      this.form.mesfin_SER5409 = this.SER5409.MES_LNK
      this.form.diafin_SER5409 = this.SER5409.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SER5409",
          orden: orden
        },
        () => { this._evaluarfechaini_SER5409('3') },
        () => {
          if (this.form.anofin_SER5409.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SER5409('1');
          } else {
            if (this.form.mesfin_SER5409.trim() == '' || this.form.mesfin_SER5409 < 01 || this.form.mesfin_SER5409 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SER5409('2');
            } else {
              if (this.form.diafin_SER5409.trim() == '' || this.form.diafin_SER5409 < 01 || this.form.diafin_SER5409 > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER5409('3'), 'error', 'error');
              } else {
                this.SER5409.FECHAFINW = this.form.anofin_SER5409 + this.form.mesfin_SER5409 + this.form.diafin_SER5409
                if (this.SER5409.FECHAFINW < this.SER5409.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SER5409('3'), 'error', 'error');
                } else {
                  this._evaluarregsatisfaccion_SER5409()
                }
              }
            }
          }
        }
      )
    },
    _evaluarregsatisfaccion_SER5409() {
      if (this.form.satisfaccion_SER5409.trim() == '') this.form.satisfaccion_SER5409 = 'N'
      validarInputs({
        form: "#VALIDARSATIS_SER5409",
        orden: "1"
      }, () => { this._evaluarfechafin_SER5409('3'); },
        () => {
          this.form.satisfaccion_SER5409 = this.form.satisfaccion_SER5409.toUpperCase();
          if (this.form.satisfaccion_SER5409 == 'S' || this.form.satisfaccion_SER5409 == 'N') {
            this._evaluarregeventos_SER5409()
          } else {
            CON851("03", "03", this._evaluarregsatisfaccion_SER5409(), "error", "Error");
          }
        }
      )
    },
    _evaluarregeventos_SER5409() {
      if (this.form.eventos_SER5409.trim() == '') this.form.eventos_SER5409 = 'N'
      validarInputs({
        form: "#VALIDAREVENTOS_SER5409",
        orden: "1"
      }, () => { this._evaluarregsatisfaccion_SER5409(); },
        () => {
          this.form.eventos_SER5409 = this.form.eventos_SER5409.toUpperCase();
          if (this.form.eventos_SER5409 == 'S' || this.form.eventos_SER5409 == 'N') {
            this._evaluarauditoria_SER5409()
          } else {
            CON851("03", "03", this._evaluarregeventos_SER5409(), "error", "Error");
          }
        }
      )
    },
    _evaluarauditoria_SER5409() {
      if (this.form.auditoria_SER5409.trim() == '') this.form.auditoria_SER5409 = 'N'
      validarInputs({
        form: "#VALIDARAUDITORIA_SER5409",
        orden: "1"
      }, () => { this._evaluarregeventos_SER5409(); },
        () => {
          this.form.auditoria_SER5409 = this.form.auditoria_SER5409.toUpperCase();
          if (this.form.auditoria_SER5409 == 'S' || this.form.auditoria_SER5409 == 'N') {
            this._evaluarasegurador_SER5409()
          } else {
            CON851("03", "03", this._evaluarauditoria_SER5409(), "error", "Error");
          }
        }
      )
    },
    _evaluarasegurador_SER5409() {
      if ($_USUA_GLOBAL[0].PUC == '3' || $_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == 6) {
        if (this.form.aseguradoras_SER5409.trim() == '') this.form.aseguradoras_SER5409 = 'N'
        validarInputs({
          form: "#VALIDARASEGURADO_SER5409",
          orden: "1"
        }, () => { this._evaluarauditoria_SER5409() },
          () => {
            this.form.aseguradoras_SER5409 = this.form.aseguradoras_SER5409.toUpperCase();
            if (this.form.aseguradoras_SER5409 == 'S' || this.form.aseguradoras_SER5409 == 'N') {
              this._evaluarsucursal_SER5409()
            } else {
              CON851("03", "03", this._evaluarasegurador_SER5409(), "error", "Error");
            }
          }
        )
      } else {
        this.form.aseguradoras_SER5409 = 'N'
        this._evaluarsucursal_SER5409()
      }

    },
    _evaluarsucursal_SER5409() {
      if (this.form.codsucursal_SER5409.trim() == '') this.form.codsucursal_SER5409 = '**'
      validarInputs({
        form: "#VALIDARCODSUC_SER5409",
        orden: "1"
      }, () => { this._evaluarasegurador_SER5409() },
        () => {
          this.form.codsucursal_SER5409 = this.form.codsucursal_SER5409.toUpperCase();
          if (this.form.codsucursal_SER5409 == '**') {
            this.form.descrcipsucursal_SER5409 = 'TODAS LAS SUCURSALES'
            this._evaluargrabado_SER5409()
          } else {
            const res = this.SER5409.SUCURSAL.find(e => e.CODIGO == this.form.codsucursal_SER5409);
            if (res == undefined) {
              CON851("01", "01", this._evaluarsucursal_SER5409(), "error", "error");
            } else {
              this.form.descrcipsucursal_SER5409 = res.DESCRIPCION;
              this._evaluargrabado_SER5409()
            }
          }
        }
      )
    },
    _evaluargrabado_SER5409() {
      loader("show")
      postData({ datosh: datosEnvio() + this.SER5409.FECHAINIW + "|" + this.SER5409.FECHAFINW + '|' + this.form.satisfaccion_SER5409 + '|' + this.form.eventos_SER5409 + '|' + this.form.auditoria_SER5409 + '|' + this.form.aseguradoras_SER5409 + '|' + this.form.codsucursal_SER5409 + '|' }, get_url("APP/SALUD/SER5409.DLL"))
        .then(data => {
          console.log(data, 'GRABADO')
          loader("hide");
          var nombretxt = data.replace('.TXT', '');
          let datosEnvio = {
            nombre_txt: nombretxt,
          };
          $.ajax({
            data: datosEnvio,
            type: 'POST',
            async: false,
            url: get_url('app/Inc/_crearRIPS.php')
          }).done(function (data) {
            if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
              console.error('problemas para crear el txt');
            } else {
              fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, data, function (err) {
                if (err) return console.error(err);
              });
            }
          });
          CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarsucursal_SER5409()
        });
    },
    _f8Ssucursal_SER5409() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SUCURSALES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $_this.SER5409.SUCURSAL,
        callback_esc: function () {
          $(".Sucursal_SER5409").focus();
        },
        callback: function (data) {
          $_this.form.codsucursal_SER5409 = data.CODIGO.trim();
          _enterInput(".Sucursal_SER5409");
        },
      });
    }
  },
});
