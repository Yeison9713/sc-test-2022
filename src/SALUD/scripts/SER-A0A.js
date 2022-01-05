// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA0A",
  data: {
    SERA0A: [],
    form: {
      fecha_SERA0A: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    $_this = this;
    $_this.SERA0A.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA0A.ANO_LNK = "20" + $_this.SERA0A.FECHA_LNK.substring(0, 2);
    $_this.SERA0A.MES_LNK = $_this.SERA0A.FECHA_LNK.substring(2, 4);
    $_this.SERA0A.DIA_LNK = $_this.SERA0A.FECHA_LNK.substring(4, 6);
    nombreOpcion("9,7,A,A - Recalculo fecha glosa cartera");
    loader("hide");
    $_this._validarclases_SERA0A()
  },
  methods: {
    _validarclases_SERA0A() {
      this.form.fecha_SERA0A = this.SERA0A.FECHA_LNK;
      let URL = get_url("APP/" + "SALUD/SER-A0A" + ".DLL");
      postData({
        datosh: datosEnvio() + "1|" + this.SERA0A.ANO_LNK + "|"
      }, URL)
        .then((data) => {
          CON851P('04', _toggleNav, this._evaluarrecalculo_SERA0A)
        })
        .catch((error) => {
          console.log(error)
          CON851("", "Error DLL", _toggleNav, "error", "error");
        });
      
    },
    _evaluarrecalculo_SERA0A() {
      loader("show");
      let URL = get_url("APP/" + "SALUD/SER-A0A" + ".DLL");
      postData({
        datosh: datosEnvio() + "2|"
      }, URL)
        .then((data) => {
          console.log(data, 'RECALCULA')
          loader("hide");
          CON851('','Proceso terminado',_toggleNav(),'success','Exito');
        })
        .catch((error) => {
          console.log(error)
          CON851("", "Error en la impresión", _toggleNav, "error", "error");
        });
    },
  },
})
