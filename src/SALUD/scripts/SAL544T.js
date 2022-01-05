// 23/01/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SAL544T",
  data: {
    SAL544T: [],
    form: {
      anoini_SAL544T: "",
      mesini_SAL544T: "",
      diaini_SAL544T: "",
      anofin_SAL544T: "",
      mesfin_SAL544T: "",
      diafin_SAL544T: "",
      entidad_SAL544T: "",
      descripentidad_SAL544T: "",
      medico_SAL544T: "",
      descripmedico_SAL544T: "",
      atendidos_SAL544T: "",
      reingresos_SAL544T: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,2,8 - Informe de oportunidad de triage");
    $_this = this;
    $_this.SAL544T.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SAL544T.ANO_LNK = $_this.SAL544T.FECHA_LNK.substring(0, 2);
    $_this.SAL544T.MES_LNK = $_this.SAL544T.FECHA_LNK.substring(2, 4);
    $_this.SAL544T.DIA_LNK = $_this.SAL544T.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "ENTIDADES",
    },
      function (data) {
        $_this.SAL544T.ENTIDADES = data.ENTIDADES;
        $_this.SAL544T.ENTIDADES.pop();
        loader("hide");
        $_this._evaluarfechaini_SAL544T('1')

        obtenerDatosCompletos(
          {
            nombreFd: "PROFESIONALES",
          },
          function (data) {
            $_this.SAL544T.PROFESIONAL = data.ARCHPROF;
            $_this.SAL544T.PROFESIONAL.pop();
          })
      })
  },
  methods: {
    _evaluarfechaini_SAL544T(orden) {
      this.form.anoini_SAL544T = 20 + this.SAL544T.ANO_LNK
      this.form.mesini_SAL544T = this.SAL544T.MES_LNK
      this.form.diaini_SAL544T = '01'
      validarInputs(
        {
          form: "#fechaInicial_SAL544T",
          orden: orden
        },
        () => { _toggleNav() },
        () => {
          if (this.form.anoini_SAL544T.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SAL544T('1');
          } else {
            if (this.form.mesini_SAL544T.trim() == '' || this.form.mesini_SAL544T < 01 || this.form.mesini_SAL544T > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SAL544T('2');
            } else {
              if (this.form.diaini_SAL544T.trim() == '' || this.form.diaini_SAL544T < 01 || this.form.diaini_SAL544T > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SAL544T('3'), 'error', 'error');
              } else {
                this.SAL544T.FECHAINIW = this.form.anoini_SAL544T + this.form.mesini_SAL544T + this.form.diaini_SAL544T
                postData({ datosh: datosEnvio() + '1|' + this.SAL544T.FECHAINIW + "|" }, get_url("APP/SALUD/SAL544T.DLL"))
                  .then(data => {
                    console.log(data, 'PASO 1 ')
                    this._evaluarfechafin_SAL544T('1')
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarfechaini_SAL544T('1')
                  });
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SAL544T(orden) {
      this.form.anofin_SAL544T = 20 + this.SAL544T.ANO_LNK
      this.form.mesfin_SAL544T = this.SAL544T.MES_LNK
      this.form.diafin_SAL544T = this.SAL544T.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SAL544T",
          orden: orden
        },
        () => { this._evaluarfechaini_SAL544T('3') },
        () => {
          if (this.form.anofin_SAL544T.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SAL544T('1');
          } else {
            if (this.form.mesfin_SAL544T.trim() == '' || this.form.mesfin_SAL544T < 01 || this.form.mesfin_SAL544T > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SAL544T('2');
            } else {
              if (this.form.diafin_SAL544T.trim() == '' || this.form.diafin_SAL544T < 01 || this.form.diafin_SAL544T > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SAL544T('3'), 'error', 'error');
              } else {
                this.SAL544T.FECHAFINW = this.form.anofin_SAL544T + this.form.mesfin_SAL544T + this.form.diafin_SAL544T
                if (this.SAL544T.FECHAFINW < this.SAL544T.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SAL544T('3'), 'error', 'error');
                } else {
                  this. _evaluarentidad_SAL544T()
                }
              }
            }
          }
        }
      )
    },
    _evaluarentidad_SAL544T() {
      if (this.form.entidad_SAL544T.trim() == '') this.form.entidad_SAL544T = '******'
      validarInputs({
        form: "#VALIDAR1_SAL544T",
        orden: "1"
      }, () => { this._evaluarfechafin_SAL544T('3') },
        () => {
          this.form.entidad_SAL544T = this.form.entidad_SAL544T.toUpperCase();
          if (this.form.entidad_SAL544T == '******') {
            this.form.descripentidad_SAL544T = 'TODAS LAS ENTIDADES'
            this._evaluarmedico_SAL544T()
          } else {
            const res = this.SAL544T.ENTIDADES.find(e => e["COD-ENT"] == this.form.entidad_SAL544T);
            if (res == undefined) {
              CON851("01", "01", this._evaluarentidad_SAL544T(), "error", "error");
            } else {
              this.form.descripentidad_SAL544T = res['NOMBRE-ENT'];
              this._evaluarmedico_SAL544T()
            }
          }
        }
      )
    },
    _evaluarmedico_SAL544T() {
      if (this.form.medico_SAL544T.trim() == '') this.form.medico_SAL544T = '99'
      validarInputs({
        form: "#VALIDAR2_SAL544T",
        orden: "1"
      }, () => { this._evaluarentidad_SAL544T() },
        () => {
          if (this.form.medico_SAL544T == '99') {
            this.form.descripmedico_SAL544T = 'TODAS LOS MEDICOS'
            this._evaluarnoatendidos_SAL544T()
          } else {
            this.form.medico_SAL544T = this.form.medico_SAL544T.padStart(10, '');
            const res = this.SAL544T.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.medico_SAL544T);
            if (res == undefined) {
              CON851("01", "01", this._evaluarmedico_SAL544T(), "error", "error");
            } else {
              this.form.descripmedico_SAL544T = res.NOMBRE;
              this._evaluarnoatendidos_SAL544T()
            }
          }
        }
      )
    },
    _evaluarnoatendidos_SAL544T() {
      if (this.form.atendidos_SAL544T.trim() == '') this.form.atendidos_SAL544T = 'N'
      validarInputs({
        form: "#VALIDAR3_SAL544T",
        orden: "1"
      }, () => { this._evaluarmedico_SAL544T(); },
        () => {
          this.form.atendidos_SAL544T = this.form.atendidos_SAL544T.toUpperCase();
          if (this.form.atendidos_SAL544T == 'S' || this.form.atendidos_SAL544T == 'N') {
            this._evaluarreingresos_SAL544T()
          } else {
            CON851("03", "03", this._evaluarnoatendidos_SAL544T(), "error", "Error");
          }
        }
      )
    },
    _evaluarreingresos_SAL544T(){
      if (this.form.reingresos_SAL544T.trim() == '') this.form.reingresos_SAL544T = 'N'
      validarInputs({
        form: "#VALIDAR4_SAL544T",
        orden: "1"
      }, () => { this._evaluarnoatendidos_SAL544T(); },
        () => {
          this.form.reingresos_SAL544T = this.form.reingresos_SAL544T.toUpperCase();
          if (this.form.reingresos_SAL544T == 'S' || this.form.reingresos_SAL544T == 'N') {
            this._evaluargrabado_SAL544T()
          } else {
            CON851("03", "03", this._evaluarreingresos_SAL544T(), "error", "Error");
          }
        }
      )
    },
    _evaluargrabado_SAL544T() {
      console.log('GRABADO')
      loader("show")
      postData({ datosh: datosEnvio() + "2|" + this.SAL544T.FECHAINIW + "|" + this.SAL544T.FECHAFINW + '|' + this.form.entidad_SAL544T + '|' + this.form.medico_SAL544T +'|'+  this.form.atendidos_SAL544T + '|' + this.form.reingresos_SAL544T + '|'}, get_url("APP/SALUD/SAL544T.DLL"))
        .then(data => {
          console.log(data, 'GRABADO')
          loader("hide");
          var totales = data.TOTALES[0];
          data = data.TRIAGE
          data.push({
            ITEM: '',
            FECHA_ING_TRIA: '',
            HORA_ING_TRIA: '',
            FECHA_TRIA: 'min. promedio',
            HORA_ATEN_TRIA: '',
            MINDIF: totales.MINPROM,
            DOC_PACI: 'minutos acumulados',
            NOM_PACI: totales.TOTALMIN,
            TEL_PACI: '',
            NOM_PROFE: '',
            EPS: '',
            PRIORIDAD: '',
            SIGNO: '',
            NOM_EPS: '',
            CONDUC: '',
            NIT_FACT: '',
            NOM_NIT: '',
            OBSERV: '',
            CIUDAD: '',
          }) 
          
          // data.pop()
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
              value: 'FECHA_TRIA',
              format: "fecha"
            },
            {
              title: "Hora antencion",
              value: 'HORA_ATEN_TRIA',
              format: "string"
            },
            {
              title: "Opor",
              value: 'MINDIF',
            },
            {
              title: "Identificacion",
              value: 'DOC_PACI',
            },
            {
              title: "Nombre de paciente",
              value: 'NOM_PACI',
            },
            {
              title: "Telefono",
              value: 'TEL_PACI',
            },
            {
              title: "Nombre del medico",
              value: 'NOM_PROFE',
              
            },
            {
              title: "Entidad",
              value: 'EPS',
              format: "string"
            },
            {
              title: "Prioridad",
              value: 'PRIORIDAD',
            },
            {
              title: "Sign",
              value: 'SIGNO',
            },
            {
              title: "Nombre de la entidad",
              value: 'NOM_EPS',
            },
            {
              title: "Conducta",
              value: 'CONDUC',
            },
            {
              title: "Nit",
              value: 'NIT_FACT',
            },
            {
              title: "Ent. Facturada",
              value: 'NOM_NIT',
            },
            {
              title: "Observacion inicial",
              value: 'OBSERV',
            },
            {
              title: "Ciudad",
              value: 'CIUDAD',
            },
            
          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
              `RESUMEN DE OPORTUNIDAD DE TRIAGE DESDE ${this.form.anoini_SAL544T}/${this.form.mesini_SAL544T.padStart(2, '0')}/${this.form.diaini_SAL544T.substring(2, '0')} HASTA EL DIA ${this.form.anofin_SAL544T}/${this.form.mesfin_SAL544T.padStart(2, '0')}/${this.form.diafin_SAL544T.substring(2, '0')}`,
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
              CON851('', 'Hubo un error en la impresión', this._evaluareps_SAL544T(), 'error', 'Error')
            })
         
        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarreingresos_SAL544T()
        });
    },
    _f8entidad_SAL544T() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ENTIDADES',
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        data: $_this.SAL544T.ENTIDADES,
        callback_esc: function () {
          $(".entidad_SAL544T").focus();
        },
        callback: function (data) {
          $_this.form.entidad_SAL544T = data["COD-ENT"]
          _enterInput('.entidad_SAL544T');
        }
      });
    },
    _f8medico_SAL544T() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE PROFESIONALES",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: $_this.SAL544T.PROFESIONAL,
        callback_esc: function () {
          $(".medico_SAL544T").focus()
        },
        callback: function (data) {
          $_this.form.medico_SAL544T = data.IDENTIFICACION
          _enterInput('.medico_SAL544T');
        }
      });
    },
  },
});
