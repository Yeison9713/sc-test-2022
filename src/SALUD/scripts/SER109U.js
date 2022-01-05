// 23/07/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER109U",
  data: {
    SER109U: [],
    form: {
      envio_SER109U: "",
      nitcliente_SER109U: "",
      descripcliente_SER109U: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,3,C - Impresion factura digital");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;
    obtenerDatosCompletos({
      nombreFd: "ENVIOS",
    },
      function (data) {
        $_this.SER109U.ENVIOS = data.ENVIOS;
        $_this.SER109U.ENVIOS.pop();
        loader("hide");
        $_this._validarenvio_SER109u();
      },
    );


  },
  methods: {
    _validarenvio_SER109u() {
      validarInputs({
        form: "#VALIDAR1_SER109U",
        orden: "1"
      }, _toggleNav,
        () => {
          if (this.form.envio_SER109U.trim() == '') {
            CON851("01", "01", this._validarenvio_SER109u(), "error", "error");
          } else {
            this.form.envio_SER109U = this.form.envio_SER109U.padStart(6, "0")
            console.log(this.form.envio_SER109U, 'envio')
            let res = this.SER109U.ENVIOS.find(e => e.NRO == this.form.envio_SER109U);
            if (res == undefined) {
              CON851("01", "01", this._validarenvio_SER109u(), "error", "error");
            } else {
              this.form.nitcliente_SER109U = res.NIT;
              this.form.descripcliente_SER109U = res.DESCRIPCION_TERCERO
              this.form.periodo_SER109U = res.PER
              this.form.observacion_SER109U = res.OBSERVACION
              let URL = get_url("APP/CONTAB/CON802_01.DLL");
              postData({
                datosh: datosEnvio() + this.form.nitcliente_SER109U + '|'
              }, URL)
                .then(data => {
                  console.log(data, 'TERCEROS')
                  this.SER109U.TERCEROS = data.TERCER[0]
                  this.SER109U.ENTIDADTER = this.SER109U.TERCEROS.ENTIDAD
                  if(this.SER109U.ENTIDADTER.trim() == '') CON851("9U", "9U", this._validarenvio_SER109u(), "error", "error");
                  this._generacionarchivoplano_SER109U()
                })
                .catch(error => {
                  this._validarenvio_SER109u(); 
                });
            }
          }
        }
      )
    },
    _generacionarchivoplano_SER109U(){
      console.log('DLL DE TXT ')

    }, 

    _f8envio_SER109U() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENVIOS",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
        data: $_this.SER109U.ENVIOS,
        callback_esc: function () {
          $(".envio_SER109U").focus();
        },
        callback: function (data) {
          $_this.form.envio_SER109U = data.NRO;
          console.log($_this.form.envio_SER109U)
          _enterInput(".envio_SER109U");
        },
      });
    },
  },
});
