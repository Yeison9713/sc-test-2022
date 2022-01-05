// 23/01/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SAL544U",
  data: {
    SAL544U: [],
    form: {
      anoini_SAL544U: "",
      mesini_SAL544U: "",
      diaini_SAL544U: "",
      anofin_SAL544U: "",
      mesfin_SAL544U: "",
      diafin_SAL544U: "",
      entidad_SAL544U: "",
      descripentidad_SAL544U: "",
      medico_SAL544U: "",
      descripmedico_SAL544U: "",
      excluir_SAL544U: "",

    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,2,9 - Informe de oportunidad de urgencias");
    $_this = this;
    $_this.SAL544U.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SAL544U.ANO_LNK = $_this.SAL544U.FECHA_LNK.substring(0, 2);
    $_this.SAL544U.MES_LNK = $_this.SAL544U.FECHA_LNK.substring(2, 4);
    $_this.SAL544U.DIA_LNK = $_this.SAL544U.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "ENTIDADES",
    },
      function (data) {
        $_this.SAL544U.ENTIDADES = data.ENTIDADES;
        $_this.SAL544U.ENTIDADES.pop();
        loader("hide");
        $_this._evaluarfechaini_SAL544U('1')

        obtenerDatosCompletos(
          {
            nombreFd: "PROFESIONALES",
          },
          function (data) {
            $_this.SAL544U.PROFESIONAL = data.ARCHPROF;
            $_this.SAL544U.PROFESIONAL.pop();
          })
      })
  },
  methods: {
    _evaluarfechaini_SAL544U(orden) {
      this.form.anoini_SAL544U = 20 + this.SAL544U.ANO_LNK
      this.form.mesini_SAL544U = this.SAL544U.MES_LNK
      this.form.diaini_SAL544U = '01'
      validarInputs(
        {
          form: "#fechaInicial_SAL544U",
          orden: orden
        },
        () => { _toggleNav() },
        () => {
          if (this.form.anoini_SAL544U.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SAL544U('1');
          } else {
            if (this.form.mesini_SAL544U.trim() == '' || this.form.mesini_SAL544U < 01 || this.form.mesini_SAL544U > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SAL544U('2');
            } else {
              if (this.form.diaini_SAL544U.trim() == '' || this.form.diaini_SAL544U < 01 || this.form.diaini_SAL544U > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SAL544U('3'), 'error', 'error');
              } else {
                this.SAL544U.FECHAINIW = this.form.anoini_SAL544U + this.form.mesini_SAL544U + this.form.diaini_SAL544U
                postData({ datosh: datosEnvio() + '1|' + this.SAL544U.FECHAINIW + "|" }, get_url("APP/SALUD/SAL544U.DLL"))
                  .then(data => {
                    console.log(data, 'PASO 1 ')
                    this._evaluarfechafin_SAL544U('1')
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarfechaini_SAL544U('1')
                  });
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SAL544U(orden) {
      this.form.anofin_SAL544U = 20 + this.SAL544U.ANO_LNK
      this.form.mesfin_SAL544U = this.SAL544U.MES_LNK
      this.form.diafin_SAL544U = this.SAL544U.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SAL544U",
          orden: orden
        },
        () => { this._evaluarfechaini_SAL544U('3') },
        () => {
          if (this.form.anofin_SAL544U.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SAL544U('1');
          } else {
            if (this.form.mesfin_SAL544U.trim() == '' || this.form.mesfin_SAL544U < 01 || this.form.mesfin_SAL544U > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SAL544U('2');
            } else {
              if (this.form.diafin_SAL544U.trim() == '' || this.form.diafin_SAL544U < 01 || this.form.diafin_SAL544U > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SAL544U('3'), 'error', 'error');
              } else {
                this.SAL544U.FECHAFINW = this.form.anofin_SAL544U + this.form.mesfin_SAL544U + this.form.diafin_SAL544U
                if (this.SAL544U.FECHAFINW < this.SAL544U.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SAL544U('3'), 'error', 'error');
                } else {
                  this._evaluarentidad_SAL544U()
                }
              }
            }
          }
        }
      )
    },
    _evaluarentidad_SAL544U() {
      if (this.form.entidad_SAL544U.trim() == '') this.form.entidad_SAL544U = '******'
      validarInputs({
        form: "#VALIDAR1_SAL544U",
        orden: "1"
      }, () => { this._evaluarfechafin_SAL544U('3') },
        () => {
          this.form.entidad_SAL544U = this.form.entidad_SAL544U.toUpperCase();
          if (this.form.entidad_SAL544U == '******') {
            this.form.descripentidad_SAL544U = 'TODAS LAS ENTIDADES'
            this._evaluarmedico_SAL544U()
          } else {
            const res = this.SAL544U.ENTIDADES.find(e => e["COD-ENT"] == this.form.entidad_SAL544U);
            if (res == undefined) {
              CON851("01", "01", this._evaluarentidad_SAL544U(), "error", "error");
            } else {
              this.form.descripentidad_SAL544U = res['NOMBRE-ENT'];
              this._evaluarmedico_SAL544U()
            }
          }
        }
      )
    },
    _evaluarmedico_SAL544U() {
      if (this.form.medico_SAL544U.trim() == '') this.form.medico_SAL544U = '99'
      validarInputs({
        form: "#VALIDAR2_SAL544U",
        orden: "1"
      }, () => { this._evaluarentidad_SAL544U() },
        () => {
          if (this.form.medico_SAL544U == '99') {
            this.form.descripmedico_SAL544U = 'TODAS LOS MEDICOS'
            this._evaluarexcluir_SAL544U()
          } else {
            this.form.medico_SAL544U = this.form.medico_SAL544U.padStart(10, '');
            const res = this.SAL544U.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.medico_SAL544U);
            if (res == undefined) {
              CON851("01", "01", this._evaluarmedico_SAL544U(), "error", "error");
            } else {
              this.form.descripmedico_SAL544U = res.NOMBRE;
              this._evaluarexcluir_SAL544U()
            }
          }
        }
      )
    },
    _evaluarexcluir_SAL544U() {
      if (this.form.excluir_SAL544U.trim() == '') this.form.excluir_SAL544U = 'S'
      validarInputs({
        form: "#VALIDAR3_SAL544U",
        orden: "1"
      }, () => { this._evaluarmedico_SAL544U(); },
        () => {
          this.form.excluir_SAL544U = this.form.excluir_SAL544U.toUpperCase();
          if (this.form.excluir_SAL544U == 'S' || this.form.excluir_SAL544U == 'N') {
            this._evaluargrabado_SAL544U()
          } else {
            CON851("03", "03", this._evaluarexcluir_SAL544U(), "error", "Error");
          }
        }
      )
    },




    _evaluargrabado_SAL544U() {
      console.log('GRABADO')
      loader("show")
      postData({ datosh: datosEnvio() + "2|" + this.SAL544U.FECHAINIW + "|" + this.SAL544U.FECHAFINW + '|' + this.form.entidad_SAL544U + '|' + this.form.medico_SAL544U + '|' + this.form.excluir_SAL544U + '|' }, get_url("APP/SALUD/SAL544U.DLL"))
        .then(data => {
          console.log(data, 'GRABADO')
          loader("hide");
          var totales = data.TOTALES[0];
          data = data.URGENCIAS
          data.pop()
          data.push({
            ITEM: '',
            FECHA_ING_TRIA: '',
            HORA_ING_TRIA: '',
            FECHA_ATEN_TRIA: 'min. promed',
            HORA_ATEN_TRIA: '',
            MINDIF: totales.MINPROM,
            FECHA_HC: 'min. promed',
            HORA_HC: '',
            MINDIF2: totales.MINPROM2,
            MINDIF3: totales.MINPROM3,
            DOC_PACI: 'minutos acumulados',
            TIPO_PACI: totales.TOTALMIN,
            PRIAPEL_PACI: '',
            SEGAPEL_PACI: '',
            PRINOM_PACI: '',
            SEGNOM_PACI: '',
            NAC_PACI: '',
            SEXO_PACI: '',
            TEL_PACI: '',
            CIU_PACI: '',
            NOM_PROFE: '',
            PRIORIDAD: '',
            UMI: '',
            EPS: '',
            NOM_EPS: '',
            ERA: '',
            REINGRESO: '',
          }) 
          for (i in data) {
            data[i]['PRIAPEL_PACI'] = data[i]['PRIAPEL_PACI'].replace(/\�/g, "Ñ")
            data[i]['SEGAPEL_PACI'] = data[i]['SEGAPEL_PACI'].replace(/\�/g, "Ñ")
            data[i]['PRINOM_PACI'] = data[i]['PRINOM_PACI'].replace(/\�/g, "Ñ")
            data[i]['SEGNOM_PACI'] = data[i]['SEGNOM_PACI'].replace(/\�/g, "Ñ")
            
          }
          columnas = [
            {
              title: "Item",
              value: 'ITEM',

            },
            {
              title: "Fecha ingreso",
              value: 'FECHA_ING_TRIA',
              format: "fecha"
            },
            {
              title: "Hora ingreso",
              value: 'HORA_ING_TRIA',
              format: "string"
            },
            {
              title: "Fecha atencion",
              value: 'FECHA_ATEN_TRIA',
              format: "fecha"
            },
            {
              title: "Hora antencion",
              value: 'HORA_ATEN_TRIA',
              format: "string"
            },
            {
              title: "Opor tria",
              value: 'MINDIF',
            },
            {
              title: "Fecha Urgencias",
              value: 'FECHA_HC',
              format: "fecha"
            },
            {
              title: "Hora Urgencias",
              value: 'HORA_HC',
              format: "string"
            },
            {
              title: "Opor Urge vs Ingre",
              value: 'MINDIF2',
            },
            {
              title: "Opor Urge vs Triag",
              value: 'MINDIF3',
            },
            {
              title: "Identificacion",
              value: 'DOC_PACI',
            },
            {
              title: "Tipo ident",
              value: 'TIPO_PACI',
            },
            {
              title: "1erApellido",
              value: 'PRIAPEL_PACI',
            },
            {
              title: "2doApellido",
              value: 'SEGAPEL_PACI',
            },
            {
              title: "1erNombre",
              value: 'PRINOM_PACI',
            },
            {
              title: "2doNombre",
              value: 'SEGNOM_PACI',
            },
            {
              title: "Fecha Nac",
              value: 'NAC_PACI',
              format: "fecha"
            },
            {
              title: "Sexo",
              value: 'SEXO_PACI',
            },
            {
              title: "Telefono",
              value: 'TEL_PACI',
            },
            {
              title: "ciudad pac",
              value: 'CIU_PACI',
            },
            {
              title: "Nombre del medico",
              value: 'NOM_PROFE',

            },
            {
              title: "Prioridad",
              value: 'PRIORIDAD',
            },
            // {
            //   title: "Sign",
            //   value: 'SIGNO',
            // },
            {
              title: "Umi",
              value: 'UMI',
            },
            {
              title: "Entidad",
              value: 'EPS',
              format: "string"
            },
            {
              title: "Nombre de la entidad",
              value: 'NOM_EPS',
            },
            {
              title: "Era",
              value: 'ERA',
            },
            {
              title: "Reingreso",
              value: 'REINGRESO',
            },

          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
              `RESUMEN DE OPORTUNIDAD EN URGENCIAS DESDE ${this.form.anoini_SAL544U}/${this.form.mesini_SAL544U.padStart(2, '0')}/${this.form.diaini_SAL544U.substring(2, '0')} HASTA EL DIA ${this.form.anofin_SAL544U}/${this.form.mesfin_SAL544U.padStart(2, '0')}/${this.form.diafin_SAL544U.substring(2, '0')}`,
              `IMPRESO:${moment().format('YYYY/MM/DD')}`
            ],
            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
            ruta_logo: 'P:\\PROG\\LOGOS\\',
            tabla: {
              columnas,
              data: data,
            },
            archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
            scale: 65,
            orientation: 'landscape'
          })
            .then(() => {
              loader("hide");
              CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
              _toggleNav();
            })
            .catch(() => {
              loader("hide");
              CON851('', 'Hubo un error en la impresión', this._evaluarexcluir_SAL544U(), 'error', 'Error')
            })

        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarexcluir_SAL544U()
        });
    },
    _f8entidad_SAL544U() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ENTIDADES',
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        data: $_this.SAL544U.ENTIDADES,
        callback_esc: function () {
          $(".entidad_SAL544U").focus();
        },
        callback: function (data) {
          $_this.form.entidad_SAL544U = data["COD-ENT"]
          _enterInput('.entidad_SAL544U');
        }
      });
    },
    _f8medico_SAL544U() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE PROFESIONALES",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: $_this.SAL544U.PROFESIONAL,
        callback_esc: function () {
          $(".medico_SAL544U").focus()
        },
        callback: function (data) {
          $_this.form.medico_SAL544U = data.IDENTIFICACION
          _enterInput('.medico_SAL544U');
        }
      });
    },
  },
});
