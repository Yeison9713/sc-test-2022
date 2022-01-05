new Vue({
  el: "#SER614",

  data: {
    SER614: [],
    contab_614: '',
    fecha_614: '',
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    nombreOpcion("9,7,6,B - Contabilizar facturas radicadas");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = 20 + $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_FECHAACTUAL = moment().format('YYYYMMDD');
    $_this = this
    $_this._evaluarmovimiento_SER614()
  },
  methods: {
    _evaluarmovimiento_SER614() {
      postData(
        {
          datosh:
            datosEnvio() + "1||" + moment().format('YYYYMMDD') + '|',
        },
        get_url("APP/SALUD/SER614.DLL")
      )
        .then((data) => {
          console.log(data)
          data = data.RESP[0]
          this.SER614.FECHAINIW = data.INICIO
          this.SER614.FECHAFINW = data.FINAL
          this.SER614.ESTADOW = data.ESTADO
          this.contab_614 = this.SER614.FECHAINIW
          this.fecha_614 = this.SER614.FECHAFINW
          if (this.SER614.ESTADOW == '07') {
            CON851P("07", () => { setTimeout(_toggleNav, 300) }, () => { setTimeout(this._reprocesar_SER614, 300) });
          } else {
            CON851P("04", () => { setTimeout(_toggleNav, 300) }, () => { setTimeout(this._reprocesar_SER614, 300) });
          }
        })
        .catch((error) => {
          console.error(error)
          setTimeout(_toggleNav, 400)
        });
    },
    _reprocesar_SER614() {
      postData({ datosh: datosEnvio() + "2|" + localStorage.getItem("Usuario").trim() + '||' + this.SER614.FECHAINIW + '|' + this.SER614.FECHAFINW + '|',},
        get_url("APP/SALUD/SER614.DLL")
      )
        .then((data) => {
          console.log(data)
          CON851("", "Proceso terminado", null, "success", "Exito")
          setTimeout(_toggleNav, 300)
        })
        .catch((error) => {
          console.error(error)
          setTimeout(_toggleNav, 300)
        });
    },
  },
});