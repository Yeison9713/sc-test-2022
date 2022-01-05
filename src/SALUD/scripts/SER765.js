// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER765",
  data: {
    SER765: [],
    form: {
      novedad_SER765: "",
      codigoetnias_SER765: "",
      nombreetnias_SER765: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,7,6,5 - Actualizacion etnias de pacientes");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;
    obtenerDatosCompletos({
      nombreFd: "ETNIAS",
    },
      function (data) {
        $_this.SER765.ETNIAS = data.ETNIAS;
        $_this.SER765.ETNIAS.pop();
        loader("hide");
        CON850($_this._validarnovedad_SER765);
      },
    );
  },
  methods: {
    _validarnovedad_SER765(novedad) {
      console.log(novedad, 'OPCIONES')
      this.form.novedad_SER765 = novedad.id;
      if (this.form.novedad_SER765 == "F") {
        _toggleNav();
      } else {
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.form.novedad_SER765 = this.form.novedad_SER765 + " - " + novedad[this.form.novedad_SER765];
        this._validarcodetnias_SER765();
      }
    },
    _validarcodetnias_SER765() {
      validarInputs({
        form: "#VALIDAR1_SER765",
        orden: "1"
      }, () => {
        CON850(this._validarnovedad_SER765);
      },
        () => {
          if (this.form.codigoetnias_SER765.trim() == '') {
            CON851("03", "03", this._validarcodetnias_SER765(), "error", "Error");
          } else {
            let res = this.SER765.ETNIAS.find(e => e.COD == this.form.codigoetnias_SER765);
            if (res == undefined) {
              if (this.form.novedad_SER765.substring(0, 1) == '7') {
                this._evaluardescripetnias_SER765()
              } else if (this.form.novedad_SER765.substring(0, 1) == '8') {
                CON851("01", "01", this._validarcodetnias_SER765(), "error", "Error");
              } else {
                CON851("01", "01", this._validarcodetnias_SER765(), "error", "Error");
              }
            } else {
              if (this.form.novedad_SER765.substring(0, 1) == '7') {
                CON851("00", "00", this._validarcodetnias_SER765(), "error", "Error");
              } else if (this.form.novedad_SER765.substring(0, 1) == '8') {
                this.form.nombreetnias_SER765 = res.DESCRIP.trim();
                this._evaluardescripetnias_SER765()
              } else {
                this.form.nombreetnias_SER765 = res.DESCRIP.trim();
                CON851P('54', this._validarcodetnias_SER765, this._evaluargrabar_SER765)
              }
            }
          }
        }
      )
    },
    _evaluardescripetnias_SER765() {
      validarInputs({
        form: "#VALIDAR2_SER765",
        orden: "1"
      }, () => { this._validarcodetnias_SER765(); },
        () => {
          if (this.form.nombreetnias_SER765.trim() == '') {
            CON851("02", "02", this._evaluardescripetnias_SER765(), "error", "Error");
          } else {
            this._evaluargrabar_SER765()
          }
        }
      )
    },
    _evaluargrabar_SER765() {
      postData({ datosh: datosEnvio() + this.form.codigoetnias_SER765 + "|" + this.form.nombreetnias_SER765 + '|' + this.form.novedad_SER765.substring(0,1) + '|' }, get_url("APP/SALUD/SER765.DLL"))
        .then(data => {
          CON851('','Proceso terminado',_toggleNav(),'success','Exito');
        })
        .catch(err => {
          this._validarcodetnias_SER765()
        });
    },


    _f8etnias_SER765() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ETNIAS PACIENTES',
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER765.ETNIAS,
        callback_esc: function () {
          $(".etnias_SER765").focus();
        },
        callback: function (data) {
          $_this.form.codigoetnias_SER765 = data.COD;
          _enterInput(".etnias_SER765");
        }
      });
    },
  },
});
