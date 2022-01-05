// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER4B4",
  data: {
    SER4B4: [],
    form: {
      anolistarini_SER4B4: "",
      meslistarini_SER4B4: "",
      dialistarini_SER4B4: "",
      anolistarfin_SER4B4: "",
      meslistarfin_SER4B4: "",
      dialistarfin_SER4B4: "",
      paciente_SER4B4: "",
      descrippaciente_SER4B4: "",
      eps_SER4B4: "",
      descrippeps_SER4B4: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,B,4 - Cambios en la base de datos de pacientes");
    $_this = this;
    $_this.SER4B4.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER4B4.ANO_LNK = $_this.SER4B4.FECHA_LNK.substring(0, 2);
    $_this.SER4B4.MES_LNK = $_this.SER4B4.FECHA_LNK.substring(2, 4);
    $_this.SER4B4.DIA_LNK = $_this.SER4B4.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "ENTIDADES",
    },
      function (data) {
        $_this.SER4B4.ENTIDADES = data.ENTIDADES;
        $_this.SER4B4.ENTIDADES.pop();
        loader("hide");
        $_this._evaluarpaciente_SER4B4()
      },
    );
  },
  methods: {
    _evaluarpaciente_SER4B4() {
      if (this.form.paciente_SER4B4.trim() == '') this.form.paciente_SER4B4 = '*'
      validarInputs(
        {
          form: "#validarpaciente_SER4B4",
          orden: '1'
        }, _toggleNav,
        () => {
          if (this.form.paciente_SER4B4 == '*') {
            this.form.descrippaciente_SER4B4 = "TODOS LOS PACIENTES"
            this._evaluarepspaciente_SER4B4()
          } else {
            this.form.paciente_SER4B4 = this.form.paciente_SER4B4.padStart(15, '0')
            let URL = get_url("APP/SALUD/SER810-1.DLL");
            postData({
              datosh: datosEnvio() + this.form.paciente_SER4B4 + "|",
            }, URL)
              .then(data => {
                this.SER4B4.PACIENTEW = data["REG-PACI"];
                this.form.descrippaciente_SER4B4 = this.SER4B4.PACIENTEW[0].DESCRIP.trim();
                this._evaluarepspaciente_SER4B4()
              })
              .catch(error => {
                this._evaluarpaciente_SER4B4()
              });
          }
        }
      )
    },
    _evaluarepspaciente_SER4B4() {
      if (this.form.eps_SER4B4.trim() == '') this.form.eps_SER4B4 = '******'
      validarInputs(
        {
          form: "#validareps_SER4B4",
          orden: '1'
        }, this._evaluarpaciente_SER4B4,
        () => {
          if (this.form.eps_SER4B4 == '******') {
            this.form.descrippeps_SER4B4 = 'TODOS LOS CODIGOS'
            this._evaluarfechaini_SER4B4('1')
          } else {
            const res = this.SER4B4.ENTIDADES.find(e => e["COD-ENT"] == this.form.eps_SER4B4);
            if (res == undefined) {
              CON851("01", "01", this._evaluarepspaciente_SER4B4(), "error", "error");
            } else {
              this.form.descrippeps_SER4B4 = res["NOMBRE-ENT"]
              this._evaluarfechaini_SER4B4('1')
            }
          }
        }
      )
    },
    _evaluarfechaini_SER4B4(orden) {

      if (this.form.meslistarini_SER4B4.toString().trim() == '') {
        this.form.anolistarini_SER4B4 = 2000 + parseInt(this.SER4B4.ANO_LNK)
        this.form.meslistarini_SER4B4 = 01
        this.form.dialistarini_SER4B4 = 01
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SER4B4",
          orden: orden,
        }, this._evaluarepspaciente_SER4B4,
        () => {
          if (this.form.anolistarini_SER4B4 == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SER4B4("1"), "error", "error");
          } else {
            this.form.meslistarini_SER4B4 = this.form.meslistarini_SER4B4.toString().padStart(2, "0");
            if (this.form.meslistarini_SER4B4.trim() == "" || this.form.meslistarini_SER4B4 == '00' || this.form.meslistarini_SER4B4 < 1 || this.form.meslistarini_SER4B4 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER4B4("2"), "error", "error");
            } else {
              this.form.dialistarini_SER4B4 = this.form.dialistarini_SER4B4.toString().padStart(2, "0");
              if (this.form.dialistarini_SER4B4.trim() == "" || this.form.dialistarini_SER4B4 == '00' || this.form.dialistarini_SER4B4 < 1 || this.form.dialistarini_SER4B4 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SER4B4("3"), "error", "error");
              } else {
                this.SER4B4.FECHAINIW = this.form.anolistarini_SER4B4 + this.form.meslistarini_SER4B4 + this.form.dialistarini_SER4B4
                this._evaluarfechafin_SER4B4('1')
              }
            }
          }
        },
      );
    },
    _evaluarfechafin_SER4B4(orden) {
      if (this.form.anolistarfin_SER4B4.toString().trim() == '') {
        this.form.anolistarfin_SER4B4 = 2000 + parseInt(this.SER4B4.ANO_LNK)
        this.form.meslistarfin_SER4B4 = this.SER4B4.MES_LNK
        this.form.dialistarfin_SER4B4 = this.SER4B4.DIA_LNK
      }
      validarInputs(
        {
          form: "#fechalistarFinal_SER4B4",
          orden: orden,
        },
        () => { this._evaluarfechaini_SER4B4('3') },
        () => {
          if (this.form.anolistarfin_SER4B4.toString().trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SER4B4("1"), "error", "error");
          } else {
            this.form.meslistarfin_SER4B4 = this.form.meslistarfin_SER4B4.toString().padStart(2, "0")
            if (this.form.meslistarfin_SER4B4.trim() == "" || this.form.meslistarfin_SER4B4 == '00' || this.form.meslistarfin_SER4B4 < 1 || this.form.meslistarfin_SER4B4 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SER4B4("2"), "error", "error");
            } else {
              this.form.dialistarfin_SER4B4 = this.form.dialistarfin_SER4B4.toString().padStart(2, "0")
              if (this.form.dialistarfin_SER4B4.trim() == "" || this.form.dialistarfin_SER4B4 == '00' || this.form.dialistarfin_SER4B4 < 1 || this.form.dialistarfin_SER4B4 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SER4B4("3"), "error", "error");
              } else {
                this.SER4B4.FECHAFINW = this.form.anolistarfin_SER4B4 + this.form.meslistarfin_SER4B4 + this.form.dialistarfin_SER4B4
                if (this.SER4B4.FECHAINIW > this.SER4B4.FECHAFINW) {
                  CON851("37", "37", this._evaluarfechafin_SER4B4("1"), "error", "error");
                } else {
                  this._evaluargrabado_SER4B4()
                }
              }
            }
          }
        },
      );
    },
    _evaluargrabado_SER4B4() {
      this.SER4B4.FECHASISTEMA = moment().format('YYMMDD');
      this.SER4B4.ANOSISTEMA = this.SER4B4.FECHASISTEMA.substring(0, 2)
      this.SER4B4.MESSISTEMA = this.SER4B4.FECHASISTEMA.substring(2, 4)
      postData({ datosh: datosEnvio() + this.form.paciente_SER4B4 + "|" + this.form.eps_SER4B4 + "|" + this.SER4B4.FECHAINIW + "|" + this.SER4B4.FECHAFINW + "|" + localStorage.getItem('Usuario') + "|"}, get_url("APP/SALUD/SER4B4.DLL"))
        .then(data => {
          console.log(data, 'listado')
          loader("hide");
          data = data.BASEDATOS
          data.pop()
          columnas = [
            {
              title: "Documento",
              value: 'PACI',
            },
            {
              title: "Cod Novedad",
              value: 'NOVEDAD',
            },
            {
              title: "Fecha modificacion",
              value: 'FECHA',
            },
            {
              title: "Nro campo",
              value: 'CAMPO',
            },
            {
              title: "Nombre campo",
              value: 'DESCIP_CAMPO',
            },
            {
              title: "Paciente",
              value: 'NOM_PACI',
            },
            {
              title: "Dato actual",
              value: 'DATOACT',
            },
            {
              title: "Dato anterior",
              value: 'DATOANT',
            },
            {
              title: "Modificado por",
              value: 'ADMI',
            },
            {
              title: "Observaciones",
              value: 'OBSERV_PACI',
            }
          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}` + 'FECHA INICIO: ' + this.SER4B4.FECHAINIW + ' FECHA FINAL: ' + this.SER4B4.FECHAFINW, bold: true, size: 14 },
            ],
            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
            ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
            tabla: {
              columnas,
              data: data,
            },
            archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
            scale: 65,
            orientation: 'landscape'
          })
            .then(() => {
              CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
            })
            .catch(() => {
              CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
            })

        })
        .catch(err => {
          console.error(err);
          this._evaluarfechafin_SER4B4('1')
        });
    },


    _f8paciente_SER4B4() {
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
          $_this.form.paciente_SER4B4 = data.COD;
          _enterInput('.paciente_SER4B4');
        },
        cancel: () => {
          _enterInput(() => { this._evaluarpaciente_SER4B4() });
        }
      };
      F8LITE(parametros);
    },
    _f8eps_SER4B4() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ENTIDADES',
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        // label: ["codigo", "nombre"],
        data: $_this.SER4B4.ENTIDADES,
        ancho: '90%',
        callback_esc: function () {
          $(".eps_SER4B4").focus();
        },
        callback: function (data) {
          $_this.form.eps_SER4B = data["COD-ENT"];
          _enterInput('.eps_SER4B4');
        }
      });
    },
  },
});
