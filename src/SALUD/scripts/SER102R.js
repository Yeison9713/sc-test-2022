// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER102R",
  data: {
    SER102R: [],
    form: {
      novedad_SER102R: "",
      nit_SER102R: "",
      descripnit_SER102R: "",
      codgrupo_SER102R: "",
      descripgrupo_SER102R: "",
      codigo_SER102R: "",
      descripcups_SER102R: "",
      fechacreacion_SER102R: "",
      opercreacion_SER102R: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,3,6 - Restringir cups por entidad");
    $_this = this;
    $_this.SER102R.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER102R.ANO_LNK = $_this.SER102R.FECHA_LNK.substring(0, 2);
    $_this.SER102R.MES_LNK = $_this.SER102R.FECHA_LNK.substring(2, 4);
    $_this.SER102R.DIA_LNK = $_this.SER102R.FECHA_LNK.substring(4, 6);
    $_this.SER102R.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SER102R.ANOACTUAL = $_this.SER102R.FECHAACTUAL.substring(0, 4)
    $_this.SER102R.MESACTUAL = $_this.SER102R.FECHAACTUAL.substring(4, 6)
    $_this.SER102R.DIAACTUAL = $_this.SER102R.FECHAACTUAL.substring(6, 8)

    obtenerDatosCompletos({
      nombreFd: "TERCEROS",
    },
      function (data) {
        $_this.SER102R.TERCEROS = data.TERCEROS;
        $_this.SER102R.TERCEROS.pop();
        loader("hide");
        CON850($_this._validarnovedad_SER102R);
        obtenerDatosCompletos({
          nombreFd: "GRUPO-SER",
        }, function (data) {
          $_this.SER102R.GRUPOSER = data.CODIGOS;
          $_this.SER102R.GRUPOSER.pop();
          obtenerDatosCompletos({
            nombreFd: 'CUPS'
          }, function (data) {
            $_this.SER102R.CUPS = data.CODIGOS;
            $_this.SER102R.CUPS.pop()
          })
        },
        );
      },
    );
  },
  methods: {
    _validarnovedad_SER102R(novedad) {
      this.form.novedad_SER102R = novedad.id;
      if (this.form.novedad_SER102R == "F") {
        _toggleNav();
      } else {
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.form.novedad_SER102R = this.form.novedad_SER102R + " - " + novedad[this.form.novedad_SER102R];
        this._evaluarnit_SER102R()
      }
    },
    _evaluarnit_SER102R() {
      validarInputs(
        {
          form: "#VALIDAR1_SER102R",
          orden: "1",
        },
        () => {
          CON850(this._validarnovedad_SER102R);
        },
        () => {
          if (this.form.nit_SER102R.trim() == "") {
            CON851("01", "01", this._evaluarnit_SER102R(), "error", "error");
          } else {
            let res = this.SER102R.TERCEROS.find(e => e.COD == this.form.nit_SER102R.padStart(10, " "));
            if (res == undefined) {
              CON851("01", "01", this._evaluarnit_SER102R(), "error", "error");
            } else {
              if (this.form.novedad_SER102R.substring(0, 1) == '8') {
                var $_this = this;
                let URL = get_url("APP/" + "SALUD/SER802R" + ".DLL");
                postData({
                  datosh: datosEnvio() + this.form.nit_SER102R.trim().padStart(10, "0") + "|"
                }, URL)
                  .then((data) => {
                    $_this.SER102R.RESTRICCION = data.RESTRICCION
                    $_this.SER102R.RESTRICCION.pop()
                    _ventanaDatos({
                      titulo: "VENTANA DE RESTRICCION DE CUPS POR NIT",
                      columnas: ["CUP", "NOMBRE"],
                      data: $_this.SER102R.RESTRICCION,
                      callback_esc: function () {
                        $_this._evaluarnit_SER102R()
                      },
                      callback: function (data) {
                        setTimeout( CON850($_this._validarnovedad_SER102R), 500)
                      }
                    });
                  })
                  .catch((error) => {
                    console.log(error)
                    CON850($_this._validarnovedad_SER102R);
                  });
              } else {
                this.form.descripnit_SER102R = res.NOMBRE;
                this._evaluargrupo_SER102R()
              }
            }
          }
        },
      );
    },
    _evaluargrupo_SER102R() {
      validarInputs(
        {
          form: "#VALIDAR2_SER102R",
          orden: "1",
        },
        this._evaluarnit_SER102R,
        () => {
          if (this.form.codgrupo_SER102R.trim() == '') {
            CON851("01", "01", this._evaluargrupo_SER102R(), "error", "error");
          } else {
            let res = this.SER102R.GRUPOSER.find(e => e.COD == this.form.codgrupo_SER102R);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              if (this.form.novedad_SER102R.substring(0, 1) == '9') {
                this.form.descripgrupo_SER102R = '*'
                this._evaluarnumero_SER102R()
              } else {
                this._evaluargrupo_SER102R()
              }
            } else {
              this.form.descripgrupo_SER102R = res.DESCRIP;
              this._evaluarnumero_SER102R()
            }
          }
        },
      );
    },
    _evaluarnumero_SER102R() {
      validarInputs(
        {
          form: "#VALIDAR3_SER102R",
          orden: "1",
        },
        this._evaluargrupo_SER102R,
        () => {
          if (this.form.codigo_SER102R.trim() == '') {
            CON851("02", "02", this._evaluarnumero_SER102R(), "error", "error");
          } else {
            this.SER102R.LLAVECUP = this.form.codgrupo_SER102R + this.form.codigo_SER102R.trim();
            let res = this.SER102R.CUPS.find(e => e.LLAVE.trim() == this.SER102R.LLAVECUP);

            if (res == undefined) {
              jAlert({ titulo: 'Error ', mensaje: 'Atencion! Este proceso No esta codificado en los cups, Puede actualizar los cups por la opc 7.1.8' }, this._evaluarnumero_SER102R);
            } else {
              this.form.descripcups_SER102R = res.DESCRIP.trim()
              this.SER102R.LLAVELIMICUP = this.form.nit_SER102R.trim().padStart(10, "0") + this.SER102R.LLAVECUP
              let URL = get_url("APP/SALUD/SER102R.DLL");
              postData({ datosh: datosEnvio() + '1| |' + this.SER102R.LLAVELIMICUP }, URL)
                .then(data => {
                  this.SER102R.LIMICUPS = data.LIMICUPS[0]
                  this.form.fechacreacion_SER102R = this.SER102R.LIMICUPS.FECHA_ACT
                  this.form.opercreacion_SER102R = this.SER102R.LIMICUPS.OPERARIO
                  if (this.form.novedad_SER102R.substring(0, 1) == '7') {
                    CON851("00", "00", this._evaluarnumero_SER102R(), "error", "error");
                  } else {
                    CON851P('02', this._evaluarnumero_SER102R, this._evaluardllmodificacion_SER102R)
                  }
                })
                .catch(error => {
                  console.log(error);
                  if (error.MENSAJE == "01" && this.form.novedad_SER102R.substring(0, 1) == '7') {
                    this.form.fechacreacion_SER102R = moment().format('YYYYMMDD');
                    this.form.opercreacion_SER102R = localStorage.Usuario
                    CON851P('01', this._evaluarnumero_SER102R, this._evaluardllmodificacion_SER102R)
                  } else {
                    this._evaluarnumero_SER102R()
                  }
                })
            }
          }
        },
      );
    },
    _evaluardllmodificacion_SER102R() {
      let URL = get_url("APP/SALUD/SER102R.DLL");
      postData({ datosh: datosEnvio() + '2|' + this.form.novedad_SER102R.substring(0, 1) + '|' + this.SER102R.LLAVELIMICUP + '|' + this.form.opercreacion_SER102R + '|' + this.form.fechacreacion_SER102R + '|' }, URL)
        .then(data => {
          CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(error => {
          this._evaluarnumero_SER102R()
        })
    },

    _f8terceros_SER102R() {
      var $_this = this;
      _ventanaDatos_lite_v2({
        titulo: "VENTANA DE TERCEROS",
        data: $_this.SER102R.TERCEROS,
        indice: ["COD", "NOMBRE", "CIUDAD", "ACT"],
        mascara: [
          {
            COD: "Identificacion",
            NOMBRE: "Nombre",
            DIRREC: "direccion",
            TELEF: "telefono",
          },
        ],
        minLength: 3,
        callback_esc: function () {
          $(".terceros_SER102R").focus();
        },
        callback: function (data) {
          $_this.form.nit_SER102R = data.COD
          _enterInput(".terceros_SER102R");
        },
      });
    },
    _f8grupo_SER102R() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE GRUPOS DE SERVICIOS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER102R.GRUPOSER,
        callback_esc: function () {
          $(".grupo_SER102R").focus();
        },
        callback: function (data) {
          $_this.form.codgrupo_SER102R = data.COD.trim()
          _enterInput('.grupo_SER102R');
        }
      });

    },
    _f8codcups_SER102R() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER102C.html' });
      vector = ['on', 'Actualizando maestro de terceros...']
      _EventocrearSegventana(vector, _evaluarnumero_SER102R);
    }


  },
});
