new Vue({
  el: "#SER119D",
  data: {
    form: {
      novedad_SER119D: "",
      idmedicod_SER119D: "",
      observacion_SER119D: "",
      opermod_SER119D:"",
      fechamod_SER119D: "",
      horamod_SER119D:""
    },
    SER119D: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    nombreOpcion("9,7,C,C - Limitar horario profesional");
    CON850(this._evaluarCON850_SER119D);
  },
  methods: {
    _evaluarCON850_SER119D(data) {
      console.log(data);
      if (data.id == "F") {
        _toggleNav();
      } else {
        this.form.novedad_SER119D = `${data.id} - ${data.descripcion}`;
        this._evaluaridmedico_SER119D();
      }
    },
    _evaluaridmedico_SER119D() {
      validarInputs(
        {
          form: "#VALIDAR1_SER119D",
          orden: "1",
        },
        () => {
          setTimeout(() => {
            CON850(this._evaluarCON850_SER119D);
          }, 300);
        },
        () => {
          if (medicoMask_SER119D.value == 0) {
            this._evaluaridmedico_SER119D();
          } else {
            postData({datosh: `${datosEnvio()}1|${medicoMask_SER119D.unmaskedValue.padStart(10, "0")}|`}, get_url("APP/SALUD/SER119D.DLL"))
              .then(data => {
                console.log(data);
                let horarios = data.HORARIO;
                horarios.pop();
                var $_this = this
                if ($_this.form.novedad_SER119D.substring(0,1) == '7') {
                    $_this._evaluarfecha_SER119D();
                } else {
                    if (data.HORARIO.length > 0) {
                        _ventanaDatos({
                            titulo: `HORARIOS LIMITADOS DEL PROFESIONA ${data.DESCRIPCION}`,
                            columnas: ["FECHA", "HORAINICIAL", "HORAFINAL"],
                            data: horarios,
                            foco: true,
                            callback_esc: function () {
                                $_this._evaluaridmedico_SER119D();
                            },
                            callback: function (data) {
                                console.log(data);
                                if ($_this.form.novedad_SER119D.substring(0,1) == '7') {
                                    $_this._evaluarfecha_SER119D();
                                } else {
                                    fechaMask_SER119D.typedValue = data.FECHA;
                                    horainicialMask_SER119D.typedValue = data.HORAINICIAL;
                                    horafinalMask_SER119D.typedValue = data.HORAFINAL;
                                    $_this.form.observacion_SER119D = data.OBSERVACION;
                                    $_this.form.fechamod_SER119D = data.FECHA_MOD;
                                    $_this.form.opermod_SER119D = data.OPERADOR;
                                    $_this.form.horamod_SER119D = data.HORA_MOD;
                                    $_this._evaluarfecha_SER119D();
                                }
                            }
                        });
                    } else {
                        CON851('01','01',this._evaluaridmedico_SER119D(),'error','Error');
                    }
                }
              })
              .catch(err => {
                console.error(err);
                this._evaluaridmedico_SER119D();
              });
          }
        },
      );
    },
    _evaluarfecha_SER119D() {
        validarInputs({
            form: '#VALIDAR2_SER119D',
            orden: '1'
        },
            this._evaluaridmedico_SER119D,
            () => {
                if (fechaMask_SER119D.value.length < 10) {
                    CON851('03','03',this._evaluarfecha_SER119D(),'error','Error');
                } else {
                    if (fechaMask_SER119D.value.replace(/-/g,'') < moment().format('YYYYMMDD')) {
                        CON851('37','37',this._evaluarfecha_SER119D(),'error','Error');
                    } else {
                        this._evaluarhorainicial_SER119D();
                    }
                }
            }
        )
    },
    _evaluarhorainicial_SER119D() {
        validarInputs({
            form: '#VALIDAR3_SER119D',
            orden: '1'
        },
            this._evaluarfecha_SER119D,
            () => {
                if (horainicialMask_SER119D.value.length == 1) horainicialMask_SER119D.typedValue = `${horainicialMask_SER119D.value}000`
                if (horainicialMask_SER119D.value.length == 2) horainicialMask_SER119D.typedValue = `${horainicialMask_SER119D.value}00`
                if (horainicialMask_SER119D.value.length == 4) horainicialMask_SER119D.typedValue = `${horainicialMask_SER119D.value}0`
                if (horainicialMask_SER119D.value == '') {
                    CON851('03','03',this._evaluarhorainicial_SER119D(),'error','Error');
                } else {
                    this._evaluarhorafinal_SER119D();
                }
            }
        )
    },
    _evaluarhorafinal_SER119D() {
        validarInputs({
            form: '#VALIDAR4_SER119D',
            orden: '1'
        },
            this._evaluarhorainicial_SER119D,
            () => {
                if (horafinalMask_SER119D.value.length == 1) horafinalMask_SER119D.typedValue = `${horafinalMask_SER119D.value}000`
                if (horafinalMask_SER119D.value.length == 2) horafinalMask_SER119D.typedValue = `${horafinalMask_SER119D.value}00`
                if (horafinalMask_SER119D.value.length == 4) horafinalMask_SER119D.typedValue = `${horafinalMask_SER119D.value}0`
                if (horainicialMask_SER119D.value.replace(/:/g,'') >= horafinalMask_SER119D.value.replace(/:/g,'') || horafinalMask_SER119D.value == '') {
                    horafinalMask_SER119D.typedValue = '';
                    CON851('03','03',this._evaluarhorafinal_SER119D(),'error','Error');
                } else {
                    this._evaluarobservaciones_SER119D()
                }
            }
        )
    },
    _evaluarobservaciones_SER119D() {
        validarInputs({
            form: '#VALIDAR5_SER119D',
            orden: '1'
        },
            this._evaluarfecha_SER119D,
            () => {
                setTimeout(() => {
                    CON851P('01',this._evaluarobservaciones_SER119D, this._guardar_SER119D);
                }, 300);
            }
        )
    },
    _guardar_SER119D() {
        postData(
            {   datosh: `${datosEnvio()}2|${medicoMask_SER119D.unmaskedValue.padStart(10, "0")}|${this.form.novedad_SER119D.substring(0,1)}|${fechaMask_SER119D.value.replace(/-/g,'')}|${horainicialMask_SER119D.value.replace(/:/g,'')}|${horafinalMask_SER119D.value.replace(/:/g,'')}|${this.form.observacion_SER119D.trim()}|${localStorage.Usuario}|`}, 
            get_url("APP/SALUD/SER119D.DLL")
        )
        .then(data => {
            console.log(data);
            CON851('39','39',_toggleNav(),'success','Exito');
        })
        .catch(err => {
            console.error(err);
            this._evaluarobservaciones_SER119D();
        });
    },
    _ventanaprofesionales_SER119D(e){
        if (e.which == 119 || e.type == 'click') {
            var $_this = this
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
                .then((data) => {
                    loader("hide");
                    data.ARCHPROF.pop();
                    data = data.ARCHPROF;
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                        data: data,
                        callback_esc: function () {
                            $('#idmedico_SER119D').focus();
                        },
                        callback: function (data) {
                            medicoMask_SER119D.typedValue = parseInt(data.IDENTIFICACION).toString();
                            _enterInput('#idmedico_SER119D');
                        }
                    });
                })
                .catch((error) => {
                    loader("hide");
                    console.error(error);
                    CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                    $('#idmedico_SER119D').focus();
                });
        }
    }
  },
});
var medicoMask_SER119D = IMask($("#idmedico_SER119D")[0], {mask: Number, thousandsSeparator: ","});
var fechaMask_SER119D = IMask($("#fecha_SER119D")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: moment().format('YYYY'), to: moment(moment().format('YYYY'),'YYYY').add(1,'years').format('YYYY'), maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});
var horainicialMask_SER119D = IMask($("#horainicial_SER119D")[0], {
    mask: Date,
    pattern: 'H:m',
    lazy: true,
    blocks: {
        H: { mask: IMask.MaskedRange, placeholderChar: 'H', from: '00', to: '23', maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '00', to: '59', maxLength: 2 },
    },
    format: function (hour) {
        return moment(hour, 'HH:mm').format("HH:mm");
    },
    parse: function (str) {
        var fecha = moment(str, 'HH:mm').format("HH:mm");
        return str;
    }
});
var horafinalMask_SER119D = IMask($("#horafinal_SER119D")[0], {
    mask: Date,
    pattern: 'H:m',
    lazy: true,
    blocks: {
        H: { mask: IMask.MaskedRange, placeholderChar: 'H', from: '00', to: '23', maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '00', to: '59', maxLength: 2 },
    },
    format: function (hour) {
        return moment(hour, 'HH:mm').format("HH:mm");
    },
    parse: function (str) {
        var fecha = moment(str, 'HH:mm').format("HH:mm");
        return str;
    }
});