// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER7C8",
  data: {
    SER7C8: [],
    form: {
      idorigen_SER7C8: "",
      descripcionidorigen_SER7C8: "",
      iddestino_SER7C8: "",
      descripcioniddestino_SER7C8: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,C,8,1 - Traslado por medico");
    $_this = this;
    $_this.SER7C8.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER7C8.ANO_LNK = $_this.SER7C8.FECHA_LNK.substring(0, 2);
    obtenerDatosCompletos({
      nombreFd: "PROFESIONALES",
    },
      function (data) {
        console.log(data, 'PROFESIONAL')
        $_this.SER7C8.PROFESIONAL = data.ARCHPROF;
        $_this.SER7C8.PROFESIONAL.pop();
        loader("hide");
        $_this._validarprofesionalorig_SER7C8()
      },
    );
  },
  methods: {

    _validarprofesionalorig_SER7C8() {
      validarInputs({
        form: "#VALIDAR1_SER7C8",
        orden: "1"
      }, _toggleNav,
        () => {
          if (this.form.idorigen_SER7C8.trim() == '' || this.form.idorigen_SER7C8 == 0) {
            CON851('01', '01', this._validarprofesionalorig_SER7C8(), 'error', 'error');
          } else {
            const res = this.SER7C8.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.idorigen_SER7C8);
            if (res == undefined) {
              CON851('01', '01', this._validarprofesionalorig_SER7C8(), 'error', 'error');
            } else {
              this.form.descripcionidorigen_SER7C8 = res.NOMBRE;
              postData({ datosh: datosEnvio() + '1|' + this.SER7C8.ANO_LNK + '|' + this.form.idorigen_SER7C8.padStart(10, '0') + "|" }, get_url("APP/SALUD/SER7C8.DLL"))
                .then(data => {
                  this._evaluarfechaorigen_SER7C8()
                })
                .catch(err => {
                  console.error(err)
                  this._validarprofesionalorig_SER7C8()
                });
            }
          }


        }
      )
    },
    _evaluarfechaorigen_SER7C8() {
      if (fechaorigenMask_SER7C8.value.trim() == '') fechaorigenMask_SER7C8.typedValue = moment().format("YYYYMMDD")
      validarInputs({
        form: "#VALIDAR2_SER7C8",
        orden: "1"
      }, () => { this._validarprofesionalorig_SER7C8(); },
        () => {
          if (moment(fechaorigenMask_SER7C8.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
            this._evaluarfechalista_INV103()
          } else {
            postData({ datosh: datosEnvio() + '2|' + this.SER7C8.ANO_LNK + '|' + this.form.idorigen_SER7C8.padStart(10, '0') + '|' + fechaorigenMask_SER7C8.value.replace(/-/g, '') + "|" }, get_url("APP/SALUD/SER7C8.DLL"))
              .then(data => {
                console.log(data, 'PROFE')
                this._evaluarprofesionaldesti_SER7C8()
              })
              .catch(err => {
                console.error(err)
                this._evaluarfechaorigen_SER7C8()
              });

          }
        }
      )
    },
    _evaluarprofesionaldesti_SER7C8() {
      validarInputs({
        form: "#VALIDAR3_SER7C8",
        orden: "1"
      }, () => { this._evaluarfechaorigen_SER7C8(); },
        () => {

          if (this.form.iddestino_SER7C8.trim() == '' || this.form.iddestino_SER7C8 == 0) {
            CON851('01', '01', this._evaluarprofesionaldesti_SER7C8(), 'error', 'error');
          } else {
            const res = this.SER7C8.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.iddestino_SER7C8);
            if (res == undefined) {
              CON851('01', '01', this._evaluarprofesionaldesti_SER7C8(), 'error', 'error');
            } else {
              this.form.descripcioniddestino_SER7C8 = res.NOMBRE;
              if (this.form.idorigen_SER7C8 == this.form.iddestino_SER7C8) {
                CON851('05', '05', this._evaluarprofesionaldesti_SER7C8(), 'error', 'error');
              } else {
                this._evaluarfechadestino_SER7C8()
              }
            }
          }
        }
      )
    },
    _evaluarfechadestino_SER7C8() {
      this.SER7C8.FECHAACTW = moment().format("YYYYMMDD")
      validarInputs({
        form: "#VALIDAR4_SER7C8",
        orden: "1"
      }, () => { this._evaluarfechaorigen_SER7C8(); },
        () => {
          if (moment(fechadestinoMask_SER7C8.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
            this._evaluarfechalista_INV103()
          } else {
            if (fechadestinoMask_SER7C8.value.replace(/-/g,'') < this.SER7C8.FECHAACTW) {
              CON851('37', '37', this._evaluarfechadestino_SER7C8(), 'error', 'error');
            } else {
              CON851P('04', this._evaluarfechadestino_SER7C8, this._evaluargrabar_SER7C8)
            }
          }
        }
      )
    },
    _evaluargrabar_SER7C8() {
      postData({ datosh: datosEnvio() + '3|' + this.SER7C8.ANO_LNK + '|' + this.form.idorigen_SER7C8.padStart(10, '0') + "|" +  fechaorigenMask_SER7C8.value.replace(/-/g,'') + "|" + this.form.iddestino_SER7C8.padStart(10, '0') + "|" + fechadestinoMask_SER7C8.value.replace(/-/g,'') + "|"}, get_url("APP/SALUD/SER7C8.DLL"))
      .then(data => {
        CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
      })
      .catch(err => {
        console.error(err)
        this._evaluarfechadestino_SER7C8()
      });
    },


    _f8profesional_SER7C8() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE PROFESIONALES',
        columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_this.SER7C8.PROFESIONAL,
        ancho: '95%',
        callback_esc: function () {
          $(".idorigen_SER7C8").focus();
        },
        callback: function (data) {
          console.log(data, 'PROFE')
          $_this.form.idorigen_SER7C8 = data.IDENTIFICACION;
          _enterInput(".idorigen_SER7C8");
        }
      });
    },
    _f8profesional2_SER7C8() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE PROFESIONALES',
        columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "LU", "MA", "MI", "JU", "VI", "SA"],
        data: $_this.SER7C8.PROFESIONAL,
        ancho: '95%',
        callback_esc: function () {
          $(".iddestino_SER7C8").focus();
        },
        callback: function (data) {
          $_this.form.iddestino_SER7C8 = data.IDENTIFICACION;
          _enterInput(".iddestino_SER7C8");
        }
      }); 7
    }
  },
});

var fechaorigenMask_SER7C8 = IMask($("#fechadesde_SER7C8")[0], {
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
var fechadestinoMask_SER7C8 = IMask($("#fechahasta_SER7C8")[0], {
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
