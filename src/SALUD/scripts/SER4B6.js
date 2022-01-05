// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER4B6",
  data: {
    SER4B6: [],
    form: {
      anolistarini_SER4B6: "",
      meslistarini_SER4B6: "",
      dialistarini_SER4B6: "",
      anolistarfin_SER4B6: "",
      meslistarfin_SER4B6: "",
      dialistarfin_SER4B6: "",
      paciente_SER4B6: "",
      descrippaciente_SER4B6: "",
      eps_SER4B6: "",
      descrippeps_SER4B6: "",
      basepaciente_SER4B: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,B,5 - Anexo tecnico nro 1 paciente");
    $_this = this;
    $_this.SER4B6.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER4B6.ANO_LNK = $_this.SER4B6.FECHA_LNK.substring(0, 2);
    $_this.SER4B6.MES_LNK = $_this.SER4B6.FECHA_LNK.substring(2, 4);
    $_this.SER4B6.DIA_LNK = $_this.SER4B6.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "ENTIDADES",
    },
      function (data) {
        $_this.SER4B6.ENTIDADES = data.ENTIDADES;
        $_this.SER4B6.ENTIDADES.pop();
        loader("hide");
        $_this._evaluarpaciente_SER4B6()
      },
    );
  },
  methods: {
    _evaluarpaciente_SER4B6() {
      if (this.form.paciente_SER4B6.trim() == '') this.form.paciente_SER4B6 = '*'
      validarInputs(
        {
          form: "#validarpaciente_SER4B6",
          orden: '1'
        }, _toggleNav,
        () => {
          if (this.form.paciente_SER4B6 == '*') {
            this.form.descrippaciente_SER4B6 = "TODOS LOS PACIENTES"
            this._evaluarepspaciente_SER4B6()
          } else {
            this.form.paciente_SER4B6 = this.form.paciente_SER4B6.padStart(15, '0')
            let URL = get_url("APP/SALUD/SER810-1.DLL");
            postData({
              datosh: datosEnvio() + this.form.paciente_SER4B6 + "|",
            }, URL)
              .then(data => {
                this.SER4B6.PACIENTEW = data["REG-PACI"];
                this.form.descrippaciente_SER4B6 = this.SER4B6.PACIENTEW[0].DESCRIP.trim();
                this._evaluarepspaciente_SER4B6()
              })
              .catch(error => {
                this._evaluarpaciente_SER4B6()
              });
          }
        }
      )
    },
    _evaluarepspaciente_SER4B6() {
      if (this.form.eps_SER4B6.trim() == '') this.form.eps_SER4B6 = '******'
      validarInputs(
        {
          form: "#validareps_SER4B6",
          orden: '1'
        }, this._evaluarpaciente_SER4B6,
        () => {
          if (this.form.eps_SER4B6 == '******') {
            this.form.descrippeps_SER4B6 = 'TODOS LOS CODIGOS'
            this._evaluarfechaini_SER4B6('1')
          } else {
            const res = this.SER4B6.ENTIDADES.find(e => e["COD-ENT"] == this.form.eps_SER4B6);
            if (res == undefined) {
              CON851("01", "01", this._evaluarepspaciente_SER4B6(), "error", "error");
            } else {
              this.form.descrippeps_SER4B6 = res["NOMBRE-ENT"]
              this._evaluarfechaini_SER4B6('1')
            }
          }
        }
      )
    },
    _evaluarfechaini_SER4B6(orden) {

      if (this.form.meslistarini_SER4B6.toString().trim() == '') {
        this.form.anolistarini_SER4B6 = 2000 + parseInt(this.SER4B6.ANO_LNK)
        this.form.meslistarini_SER4B6 = 01
        this.form.dialistarini_SER4B6 = 01
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SER4B6",
          orden: orden,
        }, this._evaluarepspaciente_SER4B6,
        () => {
          if (this.form.anolistarini_SER4B6 == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SER4B6("1"), "error", "error");
          } else {
            this.form.meslistarini_SER4B6 = this.form.meslistarini_SER4B6.toString().padStart(2, "0");
            if (this.form.meslistarini_SER4B6.trim() == "" || this.form.meslistarini_SER4B6 == '00' || this.form.meslistarini_SER4B6 < 1 || this.form.meslistarini_SER4B6 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER4B6("2"), "error", "error");
            } else {
              this.form.dialistarini_SER4B6 = this.form.dialistarini_SER4B6.toString().padStart(2, "0");
              if (this.form.dialistarini_SER4B6.trim() == "" || this.form.dialistarini_SER4B6 == '00' || this.form.dialistarini_SER4B6 < 1 || this.form.dialistarini_SER4B6 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SER4B6("3"), "error", "error");
              } else {
                this.SER4B6.FECHAINIW = this.form.anolistarini_SER4B6 + this.form.meslistarini_SER4B6 + this.form.dialistarini_SER4B6
                this._evaluarfechafin_SER4B6('1')
              }
            }
          }
        },
      );
    },
    _evaluarfechafin_SER4B6(orden) {
      if (this.form.anolistarfin_SER4B6.toString().trim() == '') {
        this.form.anolistarfin_SER4B6 = 2000 + parseInt(this.SER4B6.ANO_LNK)
        this.form.meslistarfin_SER4B6 = this.SER4B6.MES_LNK
        this.form.dialistarfin_SER4B6 = this.SER4B6.DIA_LNK
      }
      validarInputs(
        {
          form: "#fechalistarFinal_SER4B6",
          orden: orden,
        },
        () => { this._evaluarfechaini_SER4B6('3') },
        () => {
          if (this.form.anolistarfin_SER4B6.toString().trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SER4B6("1"), "error", "error");
          } else {
            this.form.meslistarfin_SER4B6 = this.form.meslistarfin_SER4B6.toString().padStart(2, "0")
            if (this.form.meslistarfin_SER4B6.trim() == "" || this.form.meslistarfin_SER4B6 == '00' || this.form.meslistarfin_SER4B6 < 1 || this.form.meslistarfin_SER4B6 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SER4B6("2"), "error", "error");
            } else {
              this.form.dialistarfin_SER4B6 = this.form.dialistarfin_SER4B6.toString().padStart(2, "0")
              if (this.form.dialistarfin_SER4B6.trim() == "" || this.form.dialistarfin_SER4B6 == '00' || this.form.dialistarfin_SER4B6 < 1 || this.form.dialistarfin_SER4B6 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SER4B6("3"), "error", "error");
              } else {
                this.SER4B6.FECHAFINW = this.form.anolistarfin_SER4B6 + this.form.meslistarfin_SER4B6 + this.form.dialistarfin_SER4B6
                if (this.SER4B6.FECHAINIW > this.SER4B6.FECHAFINW) {
                  CON851("37", "37", this._evaluarfechafin_SER4B6("1"), "error", "error");
                } else {
                  this._evaluarpacnuevo_SER4B6()
                }
              }
            }
          }
        },
      );
    },
    _evaluarpacnuevo_SER4B6() {
      validarInputs(
        {
          form: "#validarbasedatos_SER4B6",
          orden: '1'
        }, this._evaluarpaciente_SER4B6,
        () => {
          this.form.basepaciente_SER4B = this.form.basepaciente_SER4B.toUpperCase()
          if (this.form.basepaciente_SER4B == 'S' || this.form.basepaciente_SER4B == 'N') {
            this._evaluargrabado_SER4B6()
          } else {
            CON851("03", "03", this._evaluarpacnuevo_SER4B6(), "error", "error");
          }
        }
      )
    },
    _evaluargrabado_SER4B6() {
      this.SER4B6.FECHASISTEMA = moment().format('YYMMDD');
      this.SER4B6.ANOSISTEMA = this.SER4B6.FECHASISTEMA.substring(0, 2)
      this.SER4B6.MESSISTEMA = this.SER4B6.FECHASISTEMA.substring(2, 4)
      postData({ datosh: datosEnvio() + this.form.paciente_SER4B6 + "|" + this.form.eps_SER4B6 + "|" + this.SER4B6.FECHAINIW + "|" + this.SER4B6.FECHAFINW + "|" + this.SER4B6.ANOSISTEMA + "|" + this.SER4B6.MESSISTEMA + "|" }, get_url("APP/SALUD/SER4B6.DLL"))
        .then(data => {
          console.log(data, 'falta conectar impresion')
          CON851('','Proceso terminado',_toggleNav(),'success','Exito');
        })
        .catch(err => {
          console.error(err);
          this._evaluarpacnuevo_SER4B6()
        });
    },


    _f8paciente_SER4B6() {
      var $_this = this;
      parametros = {
        dll: 'PACIENTES',
        valoresselect: ['Nombre del paciente'],
        f8data: 'PACIENTES',
        columnas: [{
          title: 'COD'
        }, {
          title: 'NOMBRE'
        }, {
          title: 'EPS'
        }],
        callback: (data) => {
          $_this.form.paciente_SER4B6 = data.COD;
          _enterInput('.paciente_SER4B6');
        },
        cancel: () => {
          _enterInput(() => { this._evaluarpaciente_SER4B6() });
        }
      };
      F8LITE(parametros);
    },
    _f8eps_SER4B6() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ENTIDADES',
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        // label: ["codigo", "nombre"],
        data: $_this.SER4B6.ENTIDADES,
        ancho: '90%',
        callback_esc: function () {
          $(".eps_SER4B6").focus();
        },
        callback: function (data) {
          $_this.form.eps_SER4B = data["COD-ENT"];
          _enterInput('.eps_SER4B6');
        }
      });
    },
  },
});
