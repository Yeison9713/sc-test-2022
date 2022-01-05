// 05/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER447",
  data: {
    SER447: [],
    form: {
      clavecart_SER447: "",
      envio_SER447: "",
      nitcliente_SER447: "",
      descripcliente_SER447: "",
      desbloquear_SER447: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,7,4,7 - Desbloqueo de facturas por rips");
    this.SER447.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    this.SER447.CLAVECARUSU = $_USUA_GLOBAL[0].CLAVE_CAR.trim()
    this.SER447.ANO_LNK = 20 + this.SER447.FECHA_LNK.substring(0, 2);
    this.SER447.MES_LNK = this.SER447.FECHA_LNK.substring(2, 4);
    this.SER447.DIA_LNK = this.SER447.FECHA_LNK.substring(4, 6);
    $_this = this;
    obtenerDatosCompletos({
      nombreFd: "ENVIOS",
    }, function (data) {
      $_this.SER447.ENVIOS = data.ENVIOS;
      $_this.SER447.ENVIOS.pop();
      loader("hide");
      $_this._validarbloqueo_SER447();
      // $_this.SER447.FILTROENVIO = $_this.SER447.ENVIOS.filter(e => e.PER.trim() == $_this.SER447.ANO_LNK + $_this.SER447.MES_LNK);
    },
    );
  },
  methods: {
    _validarbloqueo_SER447() {
      validarInputs({
        form: "#VALIDAR0_SER447",
        orden: "1"
      }, _toggleNav,
        () => {
          this.form.clavecart_SER447 = this.form.clavecart_SER447.toUpperCase();
          if (this.form.clavecart_SER447 == this.SER447.CLAVECARUSU) {
            this._validarenvio_SER447()
          } else {
            CON851("26", "26", this._validarbloqueo_SER447(), "error", "error");
          }
        })
    },
    _validarenvio_SER447() {
      validarInputs({
        form: "#VALIDAR1_SER447",
        orden: "1"
      }, this._validarbloqueo_SER447,
        () => {
          if (this.form.envio_SER447.trim() == '') {
            CON851("01", "01", this._validarenvio_SER447(), "error", "error");
          } else {
            this.form.envio_SER447 = this.form.envio_SER447.padStart(6, "0")
            console.log(this.form.envio_SER447, 'envio')
            let res = this.SER447.ENVIOS.find(e => e.NRO == this.form.envio_SER447);
            console.log(res)
            if (res == undefined) {
              CON851("01", "01", this._validarenvio_SER447(), "error", "error");
            } else {
              this.form.nitcliente_SER447 = res.NIT;
              this.form.descripcliente_SER447 = res.DESCRIPCION_TERCERO
              this.form.periodo_SER447 = res.PER
              this.SER447.MESPER = this.form.periodo_SER447.substring(4, 6)
              this.form.observacion_SER447 = res.OBSERVACION
              if (this.SER447.MESPER != this.SER447.MES_LNK) {
                CON851("91", "91", this._validarenvio_SER447(), "error", "error");
              } else {
                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                postData({
                  datosh: datosEnvio() + this.form.nitcliente_SER447 + '|'
                }, URL)
                  .then(data => {
                    console.log(data, 'TERCEROS')
                    this.SER447.TERCEROS = data.TERCER[0]
                    this.SER447.ENTIDADTER = this.SER447.TERCEROS.ENTIDAD
                    this._evaluarbloqueo_SER447()
                  })
                  .catch(error => {
                    this._validarenvio_SER447();
                  });
              }
            }
          }
        }
      )
    },
    _evaluarbloqueo_SER447() {
      if (this.form.desbloquear_SER447.trim() == '') this.form.desbloquear_SER447 = 'N'
      validarInputs({
        form: "#VALIDAR2_SER447",
        orden: "1"
      }, this._validarenvio_SER447,
        () => {
          this.form.desbloquear_SER447 = this.form.desbloquear_SER447.toUpperCase();
          if (this.form.desbloquear_SER447 == 'S' || this.form.desbloquear_SER447 == 'N') {
            if (this.form.desbloquear_SER447 == 'N') {
              _toggleNav()
            } else {
              this._evaluargrabado_SER447()
            }
          } else {
            CON851("02", "02", this._evaluarbloqueo_SER447(), "error", "error");
          }
        })
    },
    _evaluargrabado_SER447() {
      console.log('GRABADO')
      postData({ datosh: datosEnvio() + this.form.envio_SER447 + "|" }, get_url("APP/SALUD/SER447.DLL"))
        .then(data => {
          CON851('', 'Proceso finalizado', null, 'success', 'Exito');
          _toggleNav()
        })
        .catch(err => {
          this._validarenvio_SER447()
        });
    },
    _f8envio_SER447() {
      var $_this = this;
      // if ($_this.SER447.FILTROENVIO.length == 0) {
      //   CON851("08", "08 ", this._validarenvio_SER447(), "error", "error");
      // } else {
      _ventanaDatos({
        titulo: "VENTANA DE ENVIOS",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
        data: $_this.SER447.ENVIOS,
        callback_esc: function () {
          $(".envio_SER447").focus();
        },
        callback: function (data) {
          $_this.form.envio_SER447 = data.NRO;
          console.log($_this.form.envio_SER447)
          _enterInput(".envio_SER447");
        },
      });
      //   }
    },
  },
});
