// 11/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER105C",
  data: {
    SER105C: [],
    form: {
      codgOrig_SER105C: "",
      decripOrgSER105C: "",
      codgDest_SER105C: "",
      decripDestSER105C: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,3,4 - Duplicar convenio medicamentos");
    $_this = this;
    $_this.SER105C.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER105C.ANO_LNK = $_this.SER105C.FECHA_LNK.substring(0, 2);
    $_this.SER105C.MES_LNK = $_this.SER105C.FECHA_LNK.substring(2, 4);
    $_this.SER105C.DIA_LNK = $_this.SER105C.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "GRUPOTAR",
    },
      function (data) {
        $_this.SER105C.CONVENIO = data.NOMTAR;
        $_this.SER105C.CONVENIO.pop();
        loader("hide");
        $_this._evaluarconvenios_SER105C()
      },
    );

  },
  methods: {
    _evaluarconvenios_SER105C() {
      validarInputs(
        {
          form: "#origenSER105C",
          orden: "1",
        },
        _toggleNav,
        () => {

          if (this.form.codgOrig_SER105C.trim() == '') {
            CON851("01", "01", this._evaluarconvenios_SER105C(), "error", "error");
          } else {
            const res = this.SER105C.CONVENIO.find(e => e.COD == this.form.codgOrig_SER105C);
            if (res == undefined) {
              CON851("01", "01", this._evaluarconvenios_SER105C(), "error", "error");
            } else {
              this.form.decripOrgSER105C = res.DESCRIP;
              let URL = get_url("APP/SALUD/SER105C.DLL");
              postData({ datosh: `${datosEnvio()}1|${this.form.codgOrig_SER105C}|` }, URL)
                .then(data => {
                  console.log(data)
                  this._evaluarconveniodest_SER105C()
                })
                .catch(err => {
                  console.log(err);
                  this._evaluarconvenios_SER105C()
                })
            }
          }
        },
      );
    },
    _evaluarconveniodest_SER105C(){
      validarInputs(
        {
          form: "#origenSER105C",
          orden: "1",
        },
        _toggleNav,
        () => {
          if (this.form.codgDest_SER105C.trim() == '') {
            CON851("01", "01", this._evaluarconveniodest_SER105C(), "error", "error");
          } else {
            const res = this.SER105C.CONVENIO.find(e => e.COD == this.form.codgDest_SER105C);
            if (res == undefined) {
              CON851("01", "01", this._evaluarconvenios_SER105C(), "error", "error");
            } else {
              this.form.decripDestSER105C = res.DESCRIP;
              this._evaluarrutinamov_SER105C()
            }
          }
        },
      );
    },
    _evaluarrutinamov_SER105C(){
      let URL = get_url("APP/SALUD/SER105C.DLL");
      postData({ datosh: `${datosEnvio()}2|${this.form.codgOrig_SER105C}|${this.form.codgDest_SER105C}|` }, URL)
        .then(data => {
          console.log(data)
          CON851('','Proceso terminado',_toggleNav(),'success','Exito');
        })
        .catch(err => {
          console.log(err);
          this._evaluarconveniodest_SER105C()
        })
    }, 
     
    _f8tarifamedicamentos1_SER105C() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE NOMBRES DE TARIFAS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER105C.CONVENIO,
        callback_esc: function () {
          $(".conveniosorig_SER105C").focus();
        },
        callback: function (data) {
          $_this.form.codgOrig_SER105C = data.COD
          _enterInput('.conveniosorig_SER105C');
        }
      });
    },
    _f8tarifamedicamentos2_SER105C(){
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE NOMBRES DE TARIFAS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER105C.CONVENIO,
        callback_esc: function () {
          $(".conveniodest_SER105C").focus();
        },
        callback: function (data) {
          $_this.form.codgOrig_SER105C = data.COD
          _enterInput('.conveniodest_SER105C');
        }
      });
    }
  },
});
