// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER7CH1",
  data: {
    SER7CH1: [],
    form: {
      idorigen_SER7CH1: "",
      descripcionidorigen_SER7CH1: "",
      iddestino_SER7CH1: "",
      descripcioniddestino_SER7CH1: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,C,8,2 - Traslado por fecha");
    $_this = this;
    $_this.SER7CH1.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER7CH1.ANO_LNK = $_this.SER7CH1.FECHA_LNK.substring(0, 2);
    obtenerDatosCompletos({
      nombreFd: "PROFESIONALES",
    },
      function (data) {
        console.log(data, 'PROFESIONAL')
        $_this.SER7CH1.PROFESIONAL = data.ARCHPROF;
        $_this.SER7CH1.PROFESIONAL.pop();
        loader("hide");
        $_this._validarprofesionalorig_SER7CH1()
      },
    );
  },
  methods: {

    _validarprofesionalorig_SER7CH1() {
      validarInputs({
        form: "#VALIDAR1_SER7CH1",
        orden: "1"
      }, _toggleNav,
        () => {
          if (this.form.idorigen_SER7CH1.trim() == '' || this.form.idorigen_SER7CH1 == 0) {
            CON851('01', '01', this._validarprofesionalorig_SER7CH1(), 'error', 'error');
          } else {
            const res = this.SER7CH1.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.idorigen_SER7CH1);
            if (res == undefined) {
              CON851('01', '01', this._validarprofesionalorig_SER7CH1(), 'error', 'error');
            } else {
              this.form.descripcionidorigen_SER7CH1 = res.NOMBRE;
              postData({ datosh: datosEnvio() + '1|' + this.SER7CH1.ANO_LNK + '|' + this.form.idorigen_SER7CH1.padStart(10, '0') + "|" }, get_url("APP/SALUD/SER7C8.DLL"))
                .then(data => {
                  this._evaluarprofesionaldesti_SER7CH1()
                })
                .catch(err => {
                  console.error(err)
                  this._validarprofesionalorig_SER7CH1()
                });
            }
          }


        }
      )
    },
    _evaluarprofesionaldesti_SER7CH1() {
      validarInputs({
        form: "#VALIDAR3_SER7CH1",
        orden: "1"
      }, () => { this._evaluarfechaorigen_SER7CH1(); },
        () => {

          if (this.form.iddestino_SER7CH1.trim() == '' || this.form.iddestino_SER7CH1 == 0) {
            CON851('01', '01', this._evaluarprofesionaldesti_SER7CH1(), 'error', 'error');
          } else {
            const res = this.SER7CH1.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.iddestino_SER7CH1);
            if (res == undefined) {
              CON851('01', '01', this._evaluarprofesionaldesti_SER7CH1(), 'error', 'error');
            } else {
              this.form.descripcioniddestino_SER7CH1 = res.NOMBRE;
              if (this.form.idorigen_SER7CH1 == this.form.iddestino_SER7CH1) {
                CON851('05', '05', this._evaluarprofesionaldesti_SER7CH1(), 'error', 'error');
              } else {
                CON851P('04', this._evaluarprofesionaldesti_SER7CH1, this._evaluarfechaorigen_SER7CH1)
              }
            }
          }
        }
      )
    },
    _evaluarfechaorigen_SER7CH1() {
      if (fechaorigenMask_SER7CH1.value.trim() == '') fechaorigenMask_SER7CH1.typedValue = moment().format("YYYYMMDD")
      validarInputs({
        form: "#VALIDAR2_SER7CH1",
        orden: "1"
      }, () => { this._validarprofesionalorig_SER7CH1(); },
        () => {
          if (moment(fechaorigenMask_SER7CH1.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
            this._evaluarfechalista_INV103()
          } else {
            postData({ datosh: datosEnvio() + '2|' + this.SER7CH1.ANO_LNK + '|' +  + fechaorigenMask_SER7CH1.value + "|" }, get_url("APP/SALUD/SER7C8.DLL"))
              .then(data => {
                console.log(data, 'PROFE')
                this._evaluarfechadestino_SER7CH1()
              })
              .catch(err => {
                console.error(err)
                this._evaluarfechaorigen_SER7CH1()
              });
          }
        }
      )
    },

    _evaluarfechadestino_SER7CH1() {
      this.SER7CH1.FECHAACTW = moment().format("YYYYMMDD")
      if (fechadestinoMask_SER7CH1.value.trim() == '') fechadestinoMask_SER7CH1.typedValue = fechaorigenMask_SER7CH1.value.
        validarInputs({
          form: "#VALIDAR3_SER7CH1",
          orden: "1"
        }, () => { this._evaluarfechaorigen_SER7CH1(); },
          () => {
            if (moment(fechadestinoMask_SER7CH1.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
              this._evaluarfechalista_INV103()
            } else {
              if (fechadestinoMask_SER7CH1.value < this.SER7CH1.FECHAACTW) {
                CON851('37', '37', this._evaluarfechadestino_SER7CH1(), 'error', 'error');
              } else {
                CON851P('04', this._evaluarfechadestino_SER7CH1, this._evaluargrabar_SER7CH1)
              }
            }
          }
        )
    },
    _evaluargrabar_SER7CH1() {
      postData({ datosh: datosEnvio() + this.form.idorigen_SER7CH1.padStart(10, '0') + '|' + fechaorigenMask_SER7CH1.value + "|" + this.form.iddestino_SER7CH1.padStart(10, '0') + '|' + fechadestinoMask_SER7CH1.value + '|'}, get_url("APP/SALUD/SER7C8.DLL"))
        .then(data => {
          console.log(data, 'GRAABADO')
          CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err)
          this._evaluarfechadestino_SER7CH1()
        });
    },
    _f8profesional_SER7CH1() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE PROFESIONALES',
        columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_this.SER7CH1.PROFESIONAL,
        ancho: '95%',
        callback_esc: function () {
          $(".idorigen_SER7CH1").focus();
        },
        callback: function (data) {
          console.log(data, 'PROFE')
          $_this.form.idorigen_SER7CH1 = data.IDENTIFICACION;
          _enterInput(".idorigen_SER7CH1");
        }
      });
    },
    _f8profesional2_SER7CH1() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE PROFESIONALES',
        columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_this.SER7CH1.PROFESIONAL,
        ancho: '95%',
        callback_esc: function () {
          $(".iddestino_SER7CH1").focus();
        },
        callback: function (data) {
          $_this.form.iddestino_SER7CH1 = data.IDENTIFICACION;
          _enterInput(".iddestino_SER7CH1");
        }
      }); 7
    }
  },
});

var fechaorigenMask_SER7CH1 = IMask($("#fechadesde_SER7CH1")[0], {
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
var fechadestinoMask_SER7CH1 = IMask($("#fechahasta_SER7CH1")[0], {
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
