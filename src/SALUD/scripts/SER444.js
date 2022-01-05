// 23/07/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER444",
  data: {
    SER444: [],
    form: {
      envio_SER444: "",
      nitcliente_SER444: "",
      descripcliente_SER444: "",
      bloquear_SER444: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,7,4,4 - Bloqueo de facturas por rips");
    this.SER444.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    this.SER444.ANO_LNK = 20 + this.SER444.FECHA_LNK.substring(0, 2);
    this.SER444.MES_LNK = this.SER444.FECHA_LNK.substring(2, 4);
    this.SER444.DIA_LNK = this.SER444.FECHA_LNK.substring(4, 6);
    $_this = this;
    obtenerDatosCompletos({
      nombreFd: "ENVIOS",
    }, function (data) {
      $_this.SER444.ENVIOS = data.ENVIOS;
      $_this.SER444.ENVIOS.pop();
      $_this.SER444.FILTROENVIO = $_this.SER444.ENVIOS.filter(e => e.PER.trim() == $_this.SER444.ANO_LNK + $_this.SER444.MES_LNK);
      loader("hide");
      $_this._validarenvio_SER444();
    },
    );
  },
  methods: {
    _validarenvio_SER444() {
      validarInputs({
        form: "#VALIDAR1_SER444",
        orden: "1"
      }, _toggleNav,
        () => {
          if (this.form.envio_SER444.trim() == '') {
            CON851("01", "01", this._validarenvio_SER444(), "error", "error");
          } else {
            this.form.envio_SER444 = this.form.envio_SER444.padStart(6, "0")
            let res = this.SER444.ENVIOS.find(e => e.NRO == this.form.envio_SER444);
            if (res == undefined) {
              CON851("01", "01", this._validarenvio_SER444(), "error", "error");
            } else {
              this.form.nitcliente_SER444 = res.NIT;
              this.form.descripcliente_SER444 = res.DESCRIPCION_TERCERO
              this.form.periodo_SER444 = res.PER
              this.SER444.MESPER = this.form.periodo_SER444.substring(4, 6)
              this.form.observacion_SER444 = res.OBSERVACION
              if (this.SER444.MESPER != this.SER444.MES_LNK) {
                CON851("91", "91", this._validarenvio_SER444(), "error", "error");
              } else {
                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                postData({
                  datosh: datosEnvio() + this.form.nitcliente_SER444 + '|'
                }, URL)
                  .then(data => {
                    console.log(data, 'TERCEROS')
                    this.SER444.TERCEROS = data.TERCER[0]
                    this.SER444.ENTIDADTER = this.SER444.TERCEROS.ENTIDAD
                    this._evaluarbloqueo_SER444()
                  })
                  .catch(error => {
                    this._validarenvio_SER444();
                  });
              }
            }
          }
        }
      )
    },
    _evaluarbloqueo_SER444() {
      if (this.form.bloquear_SER444.trim() == '') this.form.bloquear_SER444 = 'N'
      validarInputs({
        form: "#VALIDAR2_SER444",
        orden: "1"
      }, this._validarenvio_SER444,
        () => {
          this.form.bloquear_SER444 = this.form.bloquear_SER444.toUpperCase();
          if (this.form.bloquear_SER444 == 'S' || this.form.bloquear_SER444 == 'N') {
            if (this.form.bloquear_SER444 == 'N') {
              _toggleNav()
            } else {
              this._evaluargrabado_SER444()
            }
          } else {
            CON851("02", "02", this._evaluarbloqueo_SER444(), "error", "error");
          }
        })
    },
    _evaluargrabado_SER444() {
      postData({ datosh: datosEnvio() + this.form.envio_SER444 + "|" }, get_url("APP/SALUD/SER444.DLL"))
        .then(data => {
              CON851('', 'Proceso finalizado', null, 'success', 'Exito');
              _toggleNav()
        })
        .catch(err => {
          this._validarenvio_SER444() 
        });
    },
    _f8envio_SER444() {
      var $_this = this;
      if ($_this.SER444.FILTROENVIO.length == 0) {
        CON851("08", "08 ", this._validarenvio_SER444(), "error", "error");
      } else {
        _ventanaDatos({
          titulo: "VENTANA DE ENVIOS",
          columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
          data: $_this.SER444.FILTROENVIO,
          callback_esc: function () {
            $(".envio_SER444").focus();
          },
          callback: function (data) {
            $_this.form.envio_SER444 = data.NRO;
            console.log($_this.form.envio_SER444)
            _enterInput(".envio_SER444");
          },
        });
      }
    },
  },
});
