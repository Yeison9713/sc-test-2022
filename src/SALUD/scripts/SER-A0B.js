// 15/10/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA0B",
  data: {
    SERA0B: [],
    form: {
      prefijo_SERA0B: "",
      factura_SERA0B: "",
      entidad_SERA0B: "",
      decripentidad_SERA0B: "",
      decrippaci_SERA0B: "",
      radicado_SERA0B: "",
      anolistarini_SERA0B: "",
      meslistarini_SERA0B: "",
      dialistarini_SERA0B: "",
      anolistarfin_SERA0B: "",
      meslistarfin_SERA0B: "",
      dialistarfin_SERA0B: "",
      // totalfact_SERA0B: "",
      totalglosa_SERA0B: "",
      totalsopor_SERA0B: "",
      totalacep_SERA0B: "",
      valorrecobro_SERA0B: "",
      responsable_SERA0B: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,B - Informe de respuesta de glosas");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;
    $_this.SERA0B.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SERA0B.ANOACTUALW = $_this.SERA0B.FECHAACTUAL.substring(0, 4);
    $_this.SERA0B.MESACTUALW = $_this.SERA0B.FECHAACTUAL.substring(4, 6);
    $_this.SERA0B.DIAACTUALW = $_this.SERA0B.FECHAACTUAL.substring(6, 8);

    obtenerDatosCompletos(
      {
        nombreFd: "TERCEROS",
      },
      function (data) {
        $_this.SERA0B.TERCEROS = data.TERCEROS;
        $_this.SERA0B.TERCEROS.pop();
        console.log($_this.SERA0B.TERCEROS)
        loader("hide");
        $_this._validarprefijo_SERA0B();
      },
    );
  },
  methods: {

    _validarprefijo_SERA0B() {
      this.form.prefijo_SERA0B = ""
      this.form.factura_SERA0B = ""
      this.form.entidad_SERA0B = ""
      this.form.decripentidad_SERA0B = ""
      this.form.decrippaci_SERA0B = ""
      this.form.radicado_SERA0B = ""
      this.form.anolistarini_SERA0B = ""
      this.form.meslistarini_SERA0B = ""
      this.form.dialistarini_SERA0B = ""
      this.form.anolistarfin_SERA0B = ""
      this.form.meslistarfin_SERA0B = ""
      this.form.dialistarfin_SERA0B = ""
      totalfactMask_SERA0B.typedValue = "";
      this.form.totalglosa_SERA0B = ""
      this.form.totalsopor_SERA0B = ""
      this.form.totalacep_SERA0B = ""
      this.form.valorrecobro_SERA0B = ""
      this.form.responsable_SERA0B = ""
      validarInputs(
        {
          form: "#validarprefijo_SERA0B",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.form.prefijo_SERA0B = this.form.prefijo_SERA0B.toUpperCase();
          if (this.form.prefijo_SERA0B == "A" || this.form.prefijo_SERA0B == "P" || this.form.prefijo_SERA0B == "T" || this.form.prefijo_SERA0B == "B" ||
            this.form.prefijo_SERA0B == "D" || this.form.prefijo_SERA0B == "F" || this.form.prefijo_SERA0B == "G" || this.form.prefijo_SERA0B == "H" ||
            this.form.prefijo_SERA0B == "I" || this.form.prefijo_SERA0B == "J" || this.form.prefijo_SERA0B == "K" || this.form.prefijo_SERA0B == "L" ||
            this.form.prefijo_SERA0B == "M" || this.form.prefijo_SERA0B == "N" || this.form.prefijo_SERA0B == "O" || this.form.prefijo_SERA0B == "Q" ||
            this.form.prefijo_SERA0B == "R" || this.form.prefijo_SERA0B == "S" || this.form.prefijo_SERA0B == "V" || this.form.prefijo_SERA0B == "W" ||
            this.form.prefijo_SERA0B == "X" || this.form.prefijo_SERA0B == "Y" || this.form.prefijo_SERA0B == "Z" || this.form.prefijo_SERA0B == "*") {
            if (this.form.prefijo_SERA0B == '*') {
              this._evaluarentidad_SERA0B();
            } else {
              this._evaluarnrofact_SERA0B();
            }
          } else {
            CON851("", "Prefijo incorrecto! ", null, "error", "error");
            this._validarprefijo_SERA0B();
          }
        },
      );
    },
    _evaluarnrofact_SERA0B() {
      validarInputs(
        {
          form: "#validarfact_SERA0B",
          orden: "1",
        },
        this._validarprefijo_SERA0B,
        () => {
          if (this.form.factura_SERA0B.trim() == "") {
            CON851("02", "02", this._evaluarnrofact_SERA0B(), "error", "error");
          } else {
            postData({ datosh: datosEnvio() + this.form.prefijo_SERA0B.trim() + this.form.factura_SERA0B.padStart(6, '0') + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
              .then(data => {
                this.SERA0B.FACTURA = data.NUMER19[0];
                this.form.entidad_SERA0B = this.SERA0B.FACTURA.NIT_NUM;
                this.form.decripentidad_SERA0B = this.SERA0B.FACTURA.DESCRIP_NUM;
                this._sumarfact_SERA0B()
              })
              .catch(err => {
                console.error(err);
                this._evaluarnrofact_SERA0B();
              });
          }
        },
      );
    },

    _sumarfact_SERA0B() {
      let vlr = 0;
      for (var i in this.SERA0B.FACTURA.TABLA_FACT) {
        let vlrfact = 0;
        vlrfact = parseFloat(this.SERA0B.FACTURA.TABLA_FACT[i].VLR_FACT);
        if (isNaN(vlrfact)) vlrfact = 0;
        vlr = vlrfact + vlr;
      }
      totalfactMask_SERA0B.typedValue = vlr.toString();
      postData({ datosh: datosEnvio() + '1|' + this.form.prefijo_SERA0B.trim() + this.form.factura_SERA0B.padStart(6, '0') + "|" }, get_url("APP/SALUD/SER-A04.DLL"))
        .then(data => {
          this.SERA0B.VALORES = data.VALORES[0]
          this.form.totalglosa_SERA0B = valores_SERA0B(this.SERA0B.VALORES.VLRGLOSA)
          this.form.totalsopor_SERA0B = valores_SERA0B(this.SERA0B.VALORES.VLRRESP)
          this.form.totalacep_SERA0B = valores_SERA0B(this.SERA0B.VALORES.VLRACEPT)
          CON851P('00', this._validarprefijo_SERA0B, this._evaluarimpresion_SERA0B)
        })
        .catch(err => {
          console.error(err);
          this._evaluarnrofact_SERA0B()
        });
    },



    _evaluarentidad_SERA0B() {
      validarInputs(
        {
          form: "#validarentidad_SERA0B",
          orden: "1",
        },
        this._validarprefijo_SERA0B,
        () => {

          if (this.form.entidad_SERA0B.trim() == '' || this.form.entidad_SERA0B == '0000000000') {
            CON851("02", "02", this._evaluarentidad_SERA0B(), "error", "error");
          } else {
            console.log(this.form.entidad_SERA0B.padStart(10, ' '), 'entidad', this.SERA0B.TERCEROS)
            let res = this.SERA0B.TERCEROS.find(e => e.COD == this.form.entidad_SERA0B.padStart(10, ' '));
            if (res == undefined) {
              CON851("01", "01", this._evaluarentidad_SERA0B(), "error", "error");
            } else {
              this.form.decripentidad_SERA0B = res.NOMBRE;
              this._evaluarradicado_SERA0B()
            }
          }
        },
      );
    },

    _evaluarradicado_SERA0B() {
      console.log('radicado')
      if (this.form.radicado_SERA0B.trim() == '') this.form.radicado_SERA0B = '*'
      validarInputs(
        {
          form: "#validarradicado_SERA0B",
          orden: "1",
        },
        this._evaluarentidad_SERA0B,
        () => {
          this.SERA0B.rad1 = this.form.radicado_SERA0B.substring(0, 1)
          this.SERA0B.rad2 = this.form.radicado_SERA0B.substring(1, 20)
          if (this.SERA0B.rad1 == '*') {
            this._evaluarfechaini_SERA0B('1')
          } else {
            postData({ datosh: datosEnvio() + '2| |' + this.form.radicado_SERA0B + "|" }, get_url("APP/SALUD/SER-A04.DLL"))
              .then(data => {
                this._evaluarfechaini_SERA0B('1')
              })
              .catch(err => {
                console.error(err);
                this._evaluarradicado_SERA0B();
              });
          }
        },
      );
    },


    _evaluarfechaini_SERA0B(orden) {

      if (this.form.meslistarini_SERA0B.trim() == '' || this.form.meslistarfin_SERA0B.trim() == '') {
        this.form.anolistarini_SERA0B = this.SERA0B.ANOACTUALW
        this.form.meslistarini_SERA0B = this.SERA0B.MESACTUALW
        this.form.dialistarini_SERA0B = this.SERA0B.DIAACTUALW
        this.form.anolistarfin_SERA0B = this.SERA0B.ANOACTUALW
        this.form.meslistarfin_SERA0B = this.SERA0B.MESACTUALW
        this.form.dialistarfin_SERA0B = this.SERA0B.DIAACTUALW
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SERA0B",
          orden: orden,
        },
        this._evaluarentidad_SERA0B,
        () => {
          if (this.form.anolistarini_SERA0B.trim() == "" || this.form.anolistarini_SERA0B < 1990) {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SERA0B("1"), "error", "error");
          } else {
            this.form.meslistarini_SERA0B = this.form.meslistarini_SERA0B.padStart(2, "0");
            if (this.form.meslistarini_SERA0B.trim() == "" || this.form.meslistarini_SERA0B == '00' || this.form.meslistarini_SERA0B < 1 || this.form.meslistarini_SERA0B > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SERA0B("2"), "error", "error");
            } else {
              this.form.dialistarini_SERA0B = this.form.dialistarini_SERA0B.padStart(2, "0");
              if (this.form.dialistarini_SERA0B.trim() == "" || this.form.dialistarini_SERA0B == '00' || this.form.dialistarini_SERA0B < 1 || this.form.dialistarini_SERA0B > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SERA0B("3"), "error", "error");
              } else {
                this.SERA0B.FECHAINIW = this.form.anolistarini_SERA0B + this.form.meslistarini_SERA0B + this.form.dialistarini_SERA0B
                this._evaluarfechafin_SERA0B("1");
              }
            }
          }
        },
      );
    },
    _evaluarfechafin_SERA0B(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_SERA0B",
          orden: orden,
        },
        () => { this._evaluarfechaini_SERA0B('3') },
        () => {
          if (this.form.anolistarfin_SERA0B.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SERA0B("1"), "error", "error");
          } else {
            this.form.meslistarfin_SERA0B = this.form.meslistarfin_SERA0B.padStart(2, "0")
            if (this.form.meslistarfin_SERA0B.trim() == "" || this.form.meslistarfin_SERA0B == '00' || this.form.meslistarfin_SERA0B < 1 || this.form.meslistarfin_SERA0B > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SERA0B("2"), "error", "error");
            } else {
              this.form.dialistarfin_SERA0B = this.form.dialistarfin_SERA0B.padStart(2, "0")
              if (this.form.dialistarfin_SERA0B.trim() == "" || this.form.dialistarfin_SERA0B == '00' || this.form.dialistarfin_SERA0B < 1 || this.form.dialistarfin_SERA0B > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SERA0B("3"), "error", "error");
              } else {
                this.SERA0B.FECHAFINW = this.form.anolistarfin_SERA0B + this.form.meslistarfin_SERA0B + this.form.dialistarfin_SERA0B
                if (this.SERA0B.FECHAFINW < this.SERA0B.FECHAINIW) {
                  CON851("37", "37", this._evaluarfechafin_SERA0B('1'), "error", "error");
                } else {
                  CON851P('00', this._validarprefijo_SERA0B, this._evaluarimpresion_SERA0B)
                }
              }
            }
          }
        },
      );
    },
    _evaluarimpresion_SERA0B() {
      console.log('_evaluarimpresion_SERA0B')
      loader("show");
      postData({ datosh: datosEnvio() + this.form.prefijo_SERA0B.trim() + this.form.factura_SERA0B.padStart(6, '0') + "|" + this.form.radicado_SERA0B + "|" + this.form.entidad_SERA0B.padStart(10, '0') + "|" + this.SERA0B.FECHAINIW + "|" + this.SERA0B.FECHAFINW + "|" }, get_url("APP/SALUD/SER-A0B.DLL"))
        .then(data => {
          loader("hide");
          console.log(data, 'RESPUESTA LISTADP')
          let totalglosa = '', totalacept = '', totalsoport = ''

          for (var i in data.TOTALES) {
            if (data.TOTALES[i].VLRT_GLOSA.trim() != '') {
              totalglosa = data.TOTALES[i].VLRT_GLOSA.trim()
              totalacept = data.TOTALES[i].VLRT_ACEPT.trim()
              totalsoport = data.TOTALES[i].VLRT_RESPT.trim()
            }
          }
          for(var i in data.RESPUESTA){
            data.RESPUESTA[i].TOTALGLOSA = totalglosa
            data.RESPUESTA[i].TOTALACEPT = totalacept
            data.RESPUESTA[i].TOTALSOPORT = totalsoport
          }
          data = data.RESPUESTA
          data.pop()
          columnas = [
            {
              title: "GLOSA",
              value: 'NRO_GLOSA',
            },
            {
              title: "Factura",
              value: 'FACTURA',
            },
            {
              title: "Paciente",
              value: 'COD',
            },
            {
              title: "1er apellido",
              value: 'APELLIDO1',
            },
            {
              title: "2do apellido",
              value: 'APELLIDO2',
            },
            {
              title: "1er nombre",
              value: 'NOMBRE1',
            },
            {
              title: "2do nombre",
              value: 'NOMBRE2',
            },
            {
              title: "Motivo",
              value: 'MOTIVO',
            },
            {
              title: "Descrip motivo",
              value: 'DESCRIP_MOT',
            },
            {
              title: "Vlr glosa",
              value: 'VLR_GLOSA',
            },
            {
              title: "Vlr aceptado",
              value: 'VLR_ACEPT',
            },
            {
              title: "Vlr soportado",
              value: 'VLR_RESPU',
            },
            {
              title: "Descripcion de  la glosa",
              value: 'MOTIVO1',
            },
            {
              title: 'Respuesta',
              value: 'RESP1',
            },
            {
              title: 'Total glosa',
              value: 'TOTALGLOSA',
            },
            {
              title: 'Total aceptado',
              value: 'TOTALACEPT',
            },
            {
              title: 'Total soportado',
              value: 'TOTALSOPORT',
            },

          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}` + ' NIT ' + `${$_USUA_GLOBAL[0].NIT}` + '-' + `${$_USUA_GLOBAL[0].DV}`, bold: true, size: 13 },
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
          loader("hide");
          console.error(err);
          this._evaluarnrofact_SERA0B()
        });
    },


    _f8numeracion_SERA0B() {
      var $_this = this;
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_this.form.factura_SERA0B = data.COD.substring(1, 7);
          _enterInput('.numeracion_SERA0B');
        },
        cancel: () => {
          _enterInput('.numeracion_SERA0B');
        }
      };
      F8LITE(parametros);
    },
    _f8entidad_SERA0B() {
      var $_this = this;
      _ventanaDatos_lite_v2({
        titulo: "VENTANA DE TERCEROS",
        data: $_this.SERA0B.TERCEROS,
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
          $(".entidad_SERA0B").focus();
        },
        callback: function (data) {
          $_this.form.entidad_SERA0B = data.COD
          _enterInput(".entidad_SERA0B");
        },
      });
    },
    _f8radicado_SERA0B() {
      var $_this = this;
      let URL = get_url("APP/" + "SALUD/SER-A84" + ".DLL");
      postData({
        datosh: datosEnvio() + this.form.entidad_SERA0B.trim().padStart(10, '0') + "|"
      }, URL)
        .then((data) => {
          console.log(data, 'ENTIDAD')
          loader("hide");
          $_this.SERA0B.GLOSASRAD = data.RADICGLOSAS
          $_this.SERA0B.GLOSASRAD.pop()
          _ventanaDatos({
            titulo: $_this.SERA0B.GLOSASRAD.TERCERO,
            columnas: ["FACTURA", "NROGLOSA", "TERCERO", 'FECHAGLO', 'PACIENTE', 'RADICADO'],
            data: $_this.SERA0B.GLOSASRAD,
            callback_esc: function () {
              $(".radicado_SERA0B").focus();
            },
            callback: function (data) {
              console.log(data, 'DATOS')
              $_this.form.radicado_SERA0B = data.RADICADO.trim()
              _enterInput(".radicado_SERA0B");
            }
          });
        })
        .catch((error) => {
          console.log(error)
          this._evaluarradicado_SERA0B()
        });
    },
  },
});

var totalfactMask_SERA0B = IMask($("#totalfact_SERA0B")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});

var valores_SERA0B = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: '.',
  thousandsSeparator: ',',
  normalizeZeros: true,
  padFractionalZeros: true,
});