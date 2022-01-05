// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER7CH2",
  data: {
    SER7CH2: [],
    form: {
      idorigen_SER7CH2: "",
      descripcionidorigen_SER7CH2: "",
      iddestino_SER7CH2: "",
      descripcioniddestino_SER7CH2: "",
      desdejornad_SER7CH2: "",
      hastajornad_SER7CH2: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,C,8,2 - Traslado por fecha");
    $_this = this;
    $_this.SER7CH2.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER7CH2.ANO_LNK = $_this.SER7CH2.FECHA_LNK.substring(0, 2);
    obtenerDatosCompletos({
      nombreFd: "PROFESIONALES",
    },
      function (data) {
        console.log(data, 'PROFESIONAL')
        $_this.SER7CH2.PROFESIONAL = data.ARCHPROF;
        $_this.SER7CH2.PROFESIONAL.pop();
        loader("hide");
        $_this._validarprofesionalorig_SER7CH2()
      },
    );
  },
  methods: {
    _validarprofesionalorig_SER7CH2() {
      validarInputs({
        form: "#VALIDAR1_SER7CH2",
        orden: "1"
      }, _toggleNav,
        () => {
          if (this.form.idorigen_SER7CH2.trim() == '' || this.form.idorigen_SER7CH2 == 0) {
            CON851('01', '01', this._validarprofesionalorig_SER7CH2(), 'error', 'error');
          } else {
            const res = this.SER7CH2.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.idorigen_SER7CH2);
            if (res == undefined) {
              CON851('01', '01', this._validarprofesionalorig_SER7CH2(), 'error', 'error');
            } else {
              this.form.descripcionidorigen_SER7CH2 = res.NOMBRE;
              postData({ datosh: datosEnvio() + '1|' + this.SER7CH2.ANO_LNK + '|' + this.form.idorigen_SER7CH2.padStart(10, '0') + "|" }, get_url("APP/SALUD/SER7CH2.DLL"))
                .then(data => {
                  this._evaluarfechaorigen_SER7CH2()
                })
                .catch(err => {
                  console.error(err)
                  this._validarprofesionalorig_SER7CH2()
                });
            }
          }
        }
      )
    },
    _evaluarfechaorigen_SER7CH2() {
      if (fechaorigenMask_SER7CH2.value.trim() == '') fechaorigenMask_SER7CH2.typedValue = moment().format("YYYYMMDD")
      validarInputs({
        form: "#VALIDAR2_SER7CH2",
        orden: "1"
      }, () => { this._validarprofesionalorig_SER7CH2(); },
        () => {
          if (moment(fechaorigenMask_SER7CH2.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
            this._evaluarfechalista_INV103()
          } else {
            postData({ datosh: datosEnvio() + '2|' + this.SER7CH2.ANO_LNK + `|${this.form.idorigen_SER7CH2.padStart(10, '0')}|` + fechaorigenMask_SER7CH2.value.replace(/-/g,'') + "|" }, get_url("APP/SALUD/SER7CH2.DLL"))
              .then(data => {
                this._evaluarprofesionaldesti_SER7CH2()
              })
              .catch(err => {
                console.error(err)
                this._evaluarfechaorigen_SER7CH2()
              });
          }
        }
      )
    },
    _evaluarprofesionaldesti_SER7CH2() {
      validarInputs({
        form: "#VALIDAR3_SER7CH2",
        orden: "1"
      }, () => { this._evaluarfechaorigen_SER7CH2(); },
        () => {

          if (this.form.iddestino_SER7CH2.trim() == '' || this.form.iddestino_SER7CH2 == 0) {
            CON851('01', '01', this._evaluarprofesionaldesti_SER7CH2(), 'error', 'error');
          } else {
            const res = this.SER7CH2.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.iddestino_SER7CH2);
            if (res == undefined) {
              CON851('01', '01', this._evaluarprofesionaldesti_SER7CH2(), 'error', 'error');
            } else {
              this.form.descripcioniddestino_SER7CH2 = res.NOMBRE;
              if (this.form.idorigen_SER7CH2 != this.form.iddestino_SER7CH2) {
                this._evaluarfechadestino_SER7CH2()
              } else {
                this._evaluarfechaorigen_SER7CH2()
              }
            }
          }
        }
      )
    },

    _evaluarfechadestino_SER7CH2() {
      this.SER7CH2.FECHAACTW = moment().format("YYYYMMDD")
      if (fechadestinoMask_SER7CH2.value.trim() == '') fechadestinoMask_SER7CH2.typedValue = fechaorigenMask_SER7CH2.value
        validarInputs({
          form: "#VALIDAR4_SER7CH2",
          orden: "1"
        }, () => { this._evaluarprofesionaldesti_SER7CH2(); },
          () => {
            if (moment(fechadestinoMask_SER7CH2.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
              this._evaluarfechadestino_SER7CH2()
            } else {
              if (fechadestinoMask_SER7CH2.value.replace(/-/g,'') < this.SER7CH2.FECHAACTW) {
                CON851('37', '37', this._evaluarfechadestino_SER7CH2(), 'error', 'error');
              } else {
                CON851P('04', this._evaluarprofesionaldesti_SER7CH2, this._evaluarjornadaorig_SER7CH2)
              }
            }
          }
        )
    },
    
    _evaluarjornadaorig_SER7CH2() {
      if (this.form.desdejornad_SER7CH2.trim() == '') this.form.desdejornad_SER7CH2 = 'AM'
      validarInputs({
        form: "#VALIDAR5_SER7CH2",
        orden: "1"
      }, () => { this._evaluarfechadestino_SER7CH2(); },
        () => {
          if (this.form.desdejornad_SER7CH2 == 'AM' || this.form.desdejornad_SER7CH2 == 'PM') {
            this._evaluarjornadadest_SER7CH2()
          } else {
            CON851('03', '03', this._evaluarjornadaorig_SER7CH2(), 'error', 'error');
          }
        }
      )
    },
    _evaluarjornadadest_SER7CH2() {
      if (this.form.idorigen_SER7CH2 == this.form.iddestino_SER7CH2) {
        if (this.form.desdejornad_SER7CH2 == "AM") {
          this.form.hastajornad_SER7CH2 = 'PM'
        } else {
          this.form.hastajornad_SER7CH2 = 'AM'
        }
        this._validarjornadadest_SER7CH2()
      } else {
        validarInputs({
          form: "#VALIDAR6_SER7CH2",
          orden: "1"
        }, () => { this._evaluarjornadaorig_SER7CH2(); },
          () => {
            this._validarjornadadest_SER7CH2()
          }
        )
      }
    },
    _validarjornadadest_SER7CH2() {
      if (this.form.hastajornad_SER7CH2 == 'AM' || this.form.hastajornad_SER7CH2 == 'PM') {
        this._evaluarincremento_SER7CH2()
      } else {
        CON851('03', '03', this._evaluarjornadadest_SER7CH2(), 'error', 'error');
      }
    },

    _evaluarincremento_SER7CH2() {
      if (incrementoMask_SER7CH2.value == 0) {
        if (this.form.desdejornad_SER7CH2 == "AM") {
          incrementoMask_SER7CH2.typedValue = 6
        } else {
          incrementoMask_SER7CH2.typedV = (-6)
        }
      }
      validarInputs({
        form: "#VALIDAR7_SER7CH2",
        orden: "1"
      }, () => { this._evaluarjornadadest_SER7CH2(); },
        () => {
          if (this.form.desdejornad_SER7CH2 == "AM" && incrementoMask_SER7CH2.value < 0) {
            CON851('46', '46', this._evaluarincremento_SER7CH2(), 'error', 'error');
          } else {
            if (this.form.desdejornad_SER7CH2 == "PM" && incrementoMask_SER7CH2.value > 0) {
              CON851('46', '46', this._evaluarincremento_SER7CH2(), 'error', 'error');
            } else {
              CON851P('04', this._evaluarincremento_SER7CH2, this._evaluargrabar_SER7CH2)
            }
          }
        }
      )
    },
    _evaluargrabar_SER7CH2() {
      console.log(incrementoMask_SER7CH2.value, 'GRABADO')
      postData({ datosh: datosEnvio() + '4|' + this.SER7CH2.ANO_LNK + '|' + this.form.idorigen_SER7CH2.padStart(10, '0') + "|" +  fechaorigenMask_SER7CH2.value.replace(/-/g,'') + "|" + this.form.iddestino_SER7CH2.padStart(10, '0') + "|" + fechadestinoMask_SER7CH2.value.replace(/-/g,'') + "|" + this.form.desdejornad_SER7CH2 + "|" + this.form.hastajornad_SER7CH2 + "|" + incrementoMask_SER7CH2.value + "|"}, 
      get_url("APP/SALUD/SER7CH2.DLL"))
      .then(data => {
        CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
      })
      .catch(err => {
        console.error(err)
        this._evaluarincremento_SER7CH2()
      });
    },

    _f8profesional_SER7CH2() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE PROFESIONALES',
        columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_this.SER7CH2.PROFESIONAL,
        ancho: '95%',
        callback_esc: function () {
          $(".idorigen_SER7CH2").focus();
        },
        callback: function (data) {
          console.log(data, 'PROFE')
          $_this.form.idorigen_SER7CH2 = data.IDENTIFICACION;
          _enterInput(".idorigen_SER7CH2");
        }
      });
    },
    _f8profesional2_SER7CH2() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE PROFESIONALES',
        columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_this.SER7CH2.PROFESIONAL,
        ancho: '95%',
        callback_esc: function () {
          $(".iddestino_SER7CH2").focus();
        },
        callback: function (data) {
          $_this.form.iddestino_SER7CH2 = data.IDENTIFICACION;
          _enterInput(".iddestino_SER7CH2");
        }
      });
    }
  },
});

var incrementoMask_SER7CH2 = new IMask(document.getElementById('incrementohoras_SER7CH2'),
  { mask: Number }
);
var fechaorigenMask_SER7CH2 = IMask($("#fechadesde_SER7CH2")[0], {
  mask: Date,
  pattern: 'Y-m-d',
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '0000', to: '9000', maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY-MM-DD");
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY-MM-DD');
    if (fecha == "Invalid date") return "0000-00-00";
    return str;
  }
});
var fechadestinoMask_SER7CH2 = IMask($("#fechahasta_SER7CH2")[0], {
  mask: Date,
  pattern: 'Y-m-d',
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '0000', to: '9000', maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY-MM-DD");
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY-MM-DD');
    if (fecha == "Invalid date") return "0000-00-00";
    return str;
  }
});
