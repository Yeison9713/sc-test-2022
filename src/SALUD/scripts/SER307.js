// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER307",
  data: {
    SER307: [],
    form: {
      ruta_SER307: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,3,7 - Subir restricciones cups por entidad");
    $_this = this;
    $_this.SER307.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER307.ANO_LNK = $_this.SER307.FECHA_LNK.substring(0, 2);
    $_this.SER307.MES_LNK = $_this.SER307.FECHA_LNK.substring(2, 4);
    $_this.SER307.DIA_LNK = $_this.SER307.FECHA_LNK.substring(4, 6);
    $_this.SER307.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SER307.ANOACTUAL = $_this.SER307.FECHAACTUAL.substring(0, 4)
    $_this.SER307.MESACTUAL = $_this.SER307.FECHAACTUAL.substring(4, 6)
    $_this.SER307.DIAACTUAL = $_this.SER307.FECHAACTUAL.substring(6, 8)
    loader("hide");
    this._evaluarplano_SER307()
  },
  methods: {
    _evaluarplano_SER307() {
      this.form.ruta_SER307 = '\\PLANOS\\REST-CUPS.CSV'
      validarInputs(
        {
          form: "#VALIDAR1_SER307",
          orden: "1",
        },
        _toggleNav,
        () => {
          postData({ datosh: `${datosEnvio()}${this.form.ruta_SER307}|` }, get_url("APP/SALUD/SER307.DLL"))
          .then(data => {
            console.log(data)
            CON851('', 'Se han realizado las resticciones correctamente', _toggleNav, 'success', 'Exito');
          })
          .catch(err => {
            console.log(err);
            this._evaluarplano_SER307();
          })
        },
      );
    },
  },
});
