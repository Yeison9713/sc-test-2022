// 04/02/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER448",
  data: {
    SER448: [],
    form: {
      anoini_SER448: "",
      mesini_SER448: "",
      diaini_SER448: "",
      anofin_SER448: "",
      mesfin_SER448: "",
      diafin_SER448: "",
      tomarfecha_SER448: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,7,4,8 - Cargar rips desde Historia Clinica");
    $_this = this;
    $_this.SER448.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER448.ANO_LNK = $_this.SER448.FECHA_LNK.substring(0, 2);
    $_this.SER448.MES_LNK = $_this.SER448.FECHA_LNK.substring(2, 4);
    $_this.SER448.DIA_LNK = $_this.SER448.FECHA_LNK.substring(4, 6);
    loader("hide");
    $_this._evaluarfechaini_SER448('1')
  },
  methods: {
    _evaluarfechaini_SER448(orden) {
      this.form.anoini_SER448 = 20 + this.SER448.ANO_LNK
      this.form.mesini_SER448 = this.SER448.MES_LNK
      this.form.diaini_SER448 = '01'
      validarInputs(
        {
          form: "#fechaInicial_SER448",
          orden: orden
        },
        () => { _toggleNav() },
        () => {
          if (this.form.anoini_SER448.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SER448('1');
          } else {
            if (this.form.mesini_SER448.trim() == '' || this.form.mesini_SER448 < 01 || this.form.mesini_SER448 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SER448('2');
            } else {
              if (this.form.diaini_SER448.trim() == '' || this.form.diaini_SER448 < 01 || this.form.diaini_SER448 > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SER448('3'), 'error', 'error');
              } else {
                this.SER448.FECHAINIW = this.form.anoini_SER448 + this.form.mesini_SER448 + this.form.diaini_SER448
                postData({ datosh: datosEnvio() + '1|' + this.SER448.FECHAINIW + "|" }, get_url("APP/SALUD/SER5407.DLL"))
                  .then(data => {
                    console.log(data, 'PASO 1 ')
                    this._evaluarfechafin_SER448('1')
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarfechaini_SER448('1')
                  });
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SER448(orden) {
      this.form.anofin_SER448 = 20 + this.SER448.ANO_LNK
      this.form.mesfin_SER448 = this.SER448.MES_LNK
      this.form.diafin_SER448 = this.SER448.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SER448",
          orden: orden
        },
        () => { this._evaluarfechaini_SER448('3') },
        () => {
          if (this.form.anofin_SER448.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SER448('1');
          } else {
            if (this.form.mesfin_SER448.trim() == '' || this.form.mesfin_SER448 < 01 || this.form.mesfin_SER448 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SER448('2');
            } else {
              if (this.form.diafin_SER448.trim() == '' || this.form.diafin_SER448 < 01 || this.form.diafin_SER448 > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER448('3'), 'error', 'error');
              } else {
                this.SER448.FECHAFINW = this.form.anofin_SER448 + this.form.mesfin_SER448 + this.form.diafin_SER448
                if (this.SER448.FECHAFINW < this.SER448.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SER448('3'), 'error', 'error');
                } else {
                  this._evaluarfechafacturacion_SER448()
                }
              }
            }
          }
        }
      )
    },
    _evaluarfechafacturacion_SER448() {
      if(this.form.tomarfecha_SER448.trim() == '') this.form.tomarfecha_SER448 = 'N'
      validarInputs(
        {
          form: "#VALIDAR1_SER448",
          orden: '1'
        },
        () => { this._evaluarfechafin_SER448('3') },
        () => {
          this.form.tomarfecha_SER448 = this.form.tomarfecha_SER448.toUpperCase();
          if (this.form.tomarfecha_SER448 == 'N' || this.form.tomarfecha_SER448 == 'S') {
            this._evaluargrabado_SER448()
          } else {
            CON851("03", "03", this._evaluarfechafacturacion_SER448(), "error", "Error");
          }
        }
      )
    },
    _evaluargrabado_SER448() {
      loader("show")
      postData({ datosh: datosEnvio()  +  this.SER448.FECHAINIW + "|" + this.SER448.FECHAFINW + '|' + this.form.tomarfecha_SER448  + '|' + localStorage.Usuario + '|'}, get_url("APP/SALUD/SER448.DLL"))
        .then(data => {
          console.log(data, 'GRABADO')
          loader("hide");
          CON851('','Proceso terminado',_toggleNav(),'success','Exito');
        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarfechafacturacion_SER448()
        });
    },
  },
});
