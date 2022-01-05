//  20/10/2020 - DIANA ESCOBAR: CREADO 

new Vue({
  el: "#SERA07",
  data: {
    SERA07: [],
    form: {
      busqueda_SERA07: '',
      entidad_SERA07: '',
      descripentidad_SERA07: '',
      anolistarini_SERA07: '',
      meslistarini_SERA07: '',
      dialistarini_SERA07: '',
      anolistarfin_SERA07: '',
      meslistarfin_SERA07: '',
      dialistarfin_SERA07: '',
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,7 - Informe de oportunidad glosa");
    $_this = this;
    $_this.SERA07.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA07.ANO_LNK = "20" + $_this.SERA07.FECHA_LNK.substring(0, 2);
    $_this.SERA07.MES_LNK = $_this.SERA07.FECHA_LNK.substring(2, 4);
    $_this.SERA07.DIA_LNK = $_this.SERA07.FECHA_LNK.substring(4, 6);
    $_this.SERA07.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SERA07.ANOACTUALW = $_this.SERA07.FECHAACTUAL.substring(0, 4);
    $_this.SERA07.MESACTUALW = $_this.SERA07.FECHAACTUAL.substring(4, 6);
    $_this.SERA07.DIAACTUALW = $_this.SERA07.FECHAACTUAL.substring(6, 8);
    obtenerDatosCompletos(
      {
        nombreFd: "TERCEROS",
      },
      function (data) {
        $_this.SERA07.TERCEROS = data.TERCEROS;
        $_this.SERA07.TERCEROS.pop();
        console.log($_this.SERA07.TERCEROS)
        loader("hide");
        $_this._validardiscriminacion_SERA07();
      },
    );
  },
  methods: {
    _validardiscriminacion_SERA07() {
      descriminarMask_SERA07.typedValue = 'N';
      validarInputs(
        {
          form: "#validardiscri_SERA07",
          orden: '1'
        }, _toggleNav,
        () => {
          if (descriminarMask_SERA07.value.trim() == '') descriminarMask_SERA07.typedValue = 'N';
          this._evaluarbusqueda_SERA07()
        }
      )
    },
    _evaluarbusqueda_SERA07() {
      var DESCRIM = [
        { COD: "1", DESCRIP: "Basado en fecha expedicion" },
        { COD: "2", DESCRIP: "Basado en fecha radicacion" },
        { COD: "3", DESCRIP: "Basado en fecha de factura" },
        { COD: "4", DESCRIP: "Basado en fecha respuesta" },
      ];
      POPUP(
        {
          array: DESCRIM,
          titulo: "BUSQUEDAD",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: "2",
          callback_f: () => { this._validardiscriminacion_SERA07() },
        },
        DESCRIM => {
          this.form.busqueda_SERA07 = DESCRIM.COD + " - " + DESCRIM.DESCRIP;
          this._evaluarentidad_SERA07()
        },
      );
    },
    _evaluarentidad_SERA07() {
      if (this.form.entidad_SERA07.trim() == '') {
        this.form.entidad_SERA07 = '99'
      }
      validarInputs(
        {
          form: "#validarentidad_SERA07",
          orden: '1'
        }, () => {
          setTimeout(this._evaluarbusqueda_SERA07, 300)
        },
        () => {
          if (this.form.entidad_SERA07 == '99') {
            this.form.descripentidad_SERA07 = 'TODAS LAS ENTIDADES'
            this._evaluarfechaini_SERA07('1');
          } else {
            const res = this.SERA07.TERCEROS.find(e => e.COD == this.form.entidad_SERA07);
            if (res == undefined) {
              CON851('01', '01', this._evaluarentidad_SERA07(), 'error', 'error');
            } else {
              this.form.descripentidad_SERA07 = res.NOMBRE;
              this._evaluarfechaini_SERA07('1');
            }
          }
        }
      )
    },
    _evaluarfechaini_SERA07(orden) {
      if (this.form.meslistarini_SERA07.trim() == '' || this.form.meslistarfin_SERA07.trim() == '') {
        console.log(this.SERA07.ANO_LNK)
        if (this.SERA07.ANOACTUALW == this.SERA07.ANO_LNK && this.SERA07.MESACTUALW == this.SERA07.MES_LNK) {
          this.form.anolistarini_SERA07 = this.SERA07.ANOACTUALW
          this.form.meslistarini_SERA07 = this.SERA07.MESACTUALW
          this.form.dialistarini_SERA07 = "01"
          this.form.anolistarfin_SERA07 = this.SERA07.ANOACTUALW
          this.form.meslistarfin_SERA07 = this.SERA07.MESACTUALW
          this.form.dialistarfin_SERA07 = this.SERA07.DIAACTUALW
        } else {
          this.form.anolistarini_SERA07 = this.SERA07.ANO_LNK
          this.form.meslistarini_SERA07 = this.SERA07.MES_LNK
          this.form.dialistarini_SERA07 = "01"
          this.form.anolistarfin_SERA07 = this.SERA07.ANO_LNK
          this.form.meslistarfin_SERA07 = this.SERA07.MES_LNK
          this.form.dialistarfin_SERA07 = this.SERA07.DIA_LNK
        }
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SERA07",
          orden: orden,
        }, this._evaluarentidad_SERA07,
        () => {
          if (this.form.anolistarini_SERA07.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SERA07("1"), "error", "error");
          } else {
            this.form.meslistarini_SERA07 = this.form.meslistarini_SERA07.padStart(2, "0");
            if (this.form.meslistarini_SERA07.trim() == "" || this.form.meslistarini_SERA07 < 1 || this.form.meslistarini_SERA07 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SERA07("2"), "error", "error");
            } else {
              this.form.dialistarini_SERA07 = this.form.dialistarini_SERA07.padStart(2, "0");
              if (this.form.dialistarini_SERA07.trim() == "" || this.form.dialistarini_SERA07 < 1 || this.form.dialistarini_SERA07 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SERA07("3"), "error", "error");
              } else {
                this.SERA07.FECHAINIW = this.form.anolistarini_SERA07 + this.form.meslistarini_SERA07.padStart(2, "0") + this.form.dialistarini_SERA07.padStart(2, "0")
                postData({ datosh: datosEnvio() + "1| | | |" + this.SERA07.FECHAINIW + "|" }, get_url("APP/SALUD/SER-A07.DLL"))
                  .then(data => {
                    console.log(data)
                    this._evaluarfechafin_SERA07('1')
                  })
                  .catch(err => {
                    console.error(err);
                    this._evaluarfechaini_SERA07('3');
                  });
              }
            }
          }
        },
      )
    },
    _evaluarfechafin_SERA07(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_SERA07",
          orden: orden,
        },
        () => { this._evaluarfechaini_SERA07('3') },
        () => {
          if (this.form.anolistarfin_SERA07.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SERA07("1"), "error", "error");
          } else {
            var mesfinlistar = this.form.meslistarfin_SERA07.padStart(2, "0");
            if (mesfinlistar.trim() == "" || mesfinlistar < 1 || mesfinlistar > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SERA07("2"), "error", "error");
            } else {
              var diafinlistar = this.form.dialistarfin_SERA07.padStart(2, "0");
              if (diafinlistar.trim() == "" || diafinlistar < 1 || diafinlistar > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SERA07("3"), "error", "error");
              } else {
                this.SERA07.FECHAFINW = this.form.anolistarfin_SERA07 + this.form.meslistarfin_SERA07.padStart(2, "0") + this.form.dialistarfin_SERA07.padStart(2, "0")
                if (this.SERA07.FECHAINIW > this.SERA07.FECHAFINW) {
                  this._evaluarfechafin_SERA07("1")
                } else {
                  this._evaluarestado_SERA07()
                }
              }
            }
          }
        },
      )
    },
    _evaluarestado_SERA07() {
      estadoMask_SERA07.typedValue = 'N';
      validarInputs(
        {
          form: "#validarestado_SERA07",
          orden: '1'
        }, () => {
          this._evaluarfechafin_SERA07("3")
        },
        () => {
          if (estadoMask_SERA07.value.trim() == '') estadoMask_SERA07.typedValue = 'N';
          this._evaluarlistado_SERA07();
        }
      )
    },
    _evaluarlistado_SERA07() {
      postData({ datosh: datosEnvio() + "2|" + descriminarMask_SERA07.value + "|" + this.form.busqueda_SERA07.substring(0, 1) + "|" + this.form.entidad_SERA07.padStart(10, "0") + "|" + this.SERA07.FECHAINIW + "|" + this.SERA07.FECHAFINW + "|" + estadoMask_SERA07.value + "|" }, get_url("APP/SALUD/SER-A07.DLL"))
        .then(data => {
          console.log(data, 'ARRAY LISTADO')
          data = data.INFORME
          data.pop()
          SERA07.FECHAINICIAL = data[0].FECHAINI
          SERA07.FECHAFINAL = data[0].FECHAFIN

          
          if (descriminarMask_SERA07.value == 'S') {
            columnas = [
              {
                title: "ANO",
                value: 'ANO',
              },
              {
                title: "GLOSA",
                value: 'NRO',
              },
              {
                title: "NIT",
                value: 'NIT',
              },
              {
                title: "ENTIDAD",
                value: 'ENTIDAD',
              },
              {
                title: "FACT",
                value: 'FACTURA',
              },
              {
                title: "COD GLOSA",
                value: 'CODGLOSA',
              },
              {
                title: "FECHA PRESE",
                value: 'FECHA_PRESET',
              },
              {
                title: "FECHA RECEP",
                value: 'FECHA_RECEP',
              },
              {
                title: "FECHA RESP",
                value: 'FECHA_RESP',
              },
              {
                title: "OPORT PRESE RECEP",
                value: 'DIAS',
              },
              {
                title: "OPORT RECEP RESP",
                value: 'DIAS_OP',
              },
              {
                title: "VALOR FACTURA",
                value: 'VLR_FACTURA',
              },
              {
                title: "VALOR TOT GLOSA",
                value: 'VLRTOT_GLOSA',
              },
              {
                title: "VALOR SOPORT",
                value: 'VLR_SOPORT',
              },
              {
                title: "VALOR ACEPT",
                value: 'VLR_ACEPT',
              },
              {
                title: "PENDTE RESP",
                value: 'PENDTE_RESP',
              },
              {
                title: "VALOR LEVANT",
                value: 'VLR_LEVANT',
              },
              {
                title: "CREO",
                value: 'CREO',
              },
              {
                title: "MODIF",
                value: 'MODIF',
              },
              {
                title: "RENG OBJE",
                value: 'RENG_OBJE',
              },
              {
                title: "RESPUESTA GLOSA",
                value: 'RESPUESTA',
              },
              {
                title: "GLOSA OBJE",
                value: 'GLOSA_OBJE',
              },
              {
                title: "SEGUNDA RESP GLOSA",
                value: 'SEGUNDA_RESP',
              },
              {
                title: "CONCILIACION GLOSA",
                value: 'CONCILIACION',
              },
              {
                title: "GLOSA INICIO",
                value: 'MOTIVO',
              },
              {
                title: "DESCRIP GLOSA",
                value: 'DESCRIP_GLOSA',
              },
              {
                title: "VALOR NETO FACT",
                value: 'VLR_NETO',
              },
              {
                title: "RESPONSABLE",
                value: 'RESPONSABLE',
              }
            ]
            _impresion2({
              tipo: 'excel',
              header: [
                { text: `${$_USUA_GLOBAL[0].NOMBRE}` + ' ESTADISTICA DE GLOSAS ' + 'DESDE: ' + SERA07.FECHAINICIAL + ' HASTA: ' + SERA07.FECHAFINAL + ' FECHA IMPRESION: ' +  this.SERA07.FECHAACTUAL, bold: true, size: 14 },

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

          } else {
            columnas = [
              {
                title: "ANO",
                value: 'ANO',
              },
              {
                title: "GLOSA",
                value: 'NRO',
              },
              {
                title: "NIT",
                value: 'NIT',
              },
              {
                title: "ENTIDAD",
                value: 'ENTIDAD',
              },
              {
                title: "FACT",
                value: 'FACTURA',
              },
              {
                title: "COD GLOSA",
                value: 'CODGLOSA',
              },
              {
                title: "FECHA PRESE",
                value: 'FECHA_PRESET',
              },
              {
                title: "FECHA RECEP",
                value: 'FECHA_RECEP',
              },
              {
                title: "FECHA RESP",
                value: 'FECHA_RESP',
              },
              {
                title: "OPORT PRESE RECEP",
                value: 'DIAS',
              },
              {
                title: "OPORT RECEP RESP",
                value: 'DIAS_OP',
              },
              {
                title: "VALOR FACTURA",
                value: 'VLR_FACTURA',
              },
              {
                title: "COD GLOSA1",
                value: 'COD_GLOSA1',
              },
              {
                title: "VALOR CONCEP1",
                value: 'VLRCONCEP1',
              },
              {
                title: "COD GLOSA2",
                value: 'COD_GLOSA2',
              },
              {
                title: "VALOR CONCEP2",
                value: 'VLRCONCEP2',
              },
              {
                title: "COD GLOSA3",
                value: 'COD_GLOSA3',
              },
              {
                title: "VALOR CONCEP3",
                value: 'VLRCONCEP3',
              },
              {
                title: "COD GLOSA4",
                value: 'COD_GLOSA4',
              },
              {
                title: "VALOR CONCEP4",
                value: 'VLRCONCEP4',
              },
              {
                title: "COD GLOSA5",
                value: 'COD_GLOSA5',
              },
              {
                title: "VALOR CONCEP5",
                value: 'VLRCONCEP5',
              },
              {
                title: "COD GLOSA6",
                value: 'COD_GLOSA6',
              },
              {
                title: "VALOR CONCEP6",
                value: 'VLRCONCEP6',
              },
              {
                title: "COD GLOSA7",
                value: 'COD_GLOSA7',
              },
              {
                title: "VALOR CONCEP7",
                value: 'VLRCONCEP7',
              },
              {
                title: "COD GLOSA8",
                value: 'COD_GLOSA8',
              },
              {
                title: "VALOR CONCEP8",
                value: 'VLRCONCEP8',
              },
              {
                title: "COD GLOSA9",
                value: 'COD_GLOSA9',
              },
              {
                title: "VALOR CONCEP9",
                value: 'VLRCONCEP9',
              },
              {
                title: "COD GLOSA10",
                value: 'COD_GLOSA10',
              },
              {
                title: "VALOR CONCEP10",
                value: 'VLRCONCEP10',
              },
              {
                title: "COD GLOSA11",
                value: 'COD_GLOSA11',
              },
              {
                title: "VALOR CONCEP11",
                value: 'VLRCONCEP11',
              },
              {
                title: "COD GLOSA12",
                value: 'COD_GLOSA12',
              },
              {
                title: "VALOR CONCEP12",
                value: 'VLRCONCEP12',
              },
              {
                title: "VALOR TOT GLOSA",
                value: 'VLRTOT_GLOSA',
              },
              {
                title: "VALOR SOPORT",
                value: 'VLR_SOPORT',
              },
              {
                title: "VALOR ACEPT",
                value: 'VLR_ACEPT',
              },
              {
                title: "PENDTE RESP",
                value: 'PENDTE_RESP',
              },
              {
                title: "VALOR LEVANT",
                value: 'VLR_LEVANT',
              },
              {
                title: "CREO",
                value: 'CREO',
              },
              {
                title: "MODIF",
                value: 'MODIF',
              },
              {
                title: "RENG OBJE",
                value: 'RENG_OBJE',
              },
              {
                title: "RESPUESTA GLOSA",
                value: 'RESPUESTA',
              },
              {
                title: "GLOSA OBJE",
                value: 'GLOSA_OBJE',
              },
              {
                title: "SEGUNDA RESP GLOSA",
                value: 'SEGUNDA_RESP',
              },
              {
                title: "CONCILIACION GLOSA",
                value: 'CONCILIACION',
              },
              {
                title: "GLOSA INICIO",
                value: 'MOTIVO',
              },
              {
                title: "DESCRIP GLOSA",
                value: 'DESCRIP_GLOSA',
              },
              {
                title: "VALOR NETO FACT",
                value: 'VLR_NETO',
              },
              {
                title: "RESPONSABLE",
                value: 'RESPONSABLE',
              }
            ]
            _impresion2({
              tipo: 'excel',
              header: [
                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 14 },
                ' ESTADISTICA DE GLOSAS ' 

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
          }
        })
        .catch(err => {
          console.error(err);
          this._evaluarestado_SERA07()
        });
    },
    _f8entidad_SERA07() {
      var $_this = this;
      _ventanaDatos_lite_v2({
        titulo: "VENTANA DE TERCEROS",
        data: $_this.SERA07.TERCEROS,
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
          $(".entidad_SERA07").focus();
        },
        callback: function (data) {
          $_this.form.entidad_SERA07 = data.COD
          _enterInput(".entidad_SERA07");
        },
      });
    }

  },
});

var descriminarMask_SERA07 = IMask($('#discriminar_SERA07')[0], {
  mask: 'a',
  definitions: {
    'a': /[SN]/
  },
  prepare: function (str) {
    if (str.trim() == '') {
      return false
    } else {
      return str.toUpperCase()
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase()
  }
});

var estadoMask_SERA07 = IMask($('#buscarestado_SERA07')[0], {
  mask: 'a',
  definitions: {
    'a': /[SN]/
  },
  prepare: function (str) {
    if (str.trim() == '') {
      return false
    } else {
      return str.toUpperCase()
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase()
  }
});