// 23/01/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SAL544C",
  data: {
    SAL544C: [],
    form: {
      anoini_SAL544C: "",
      mesini_SAL544C: "",
      diaini_SAL544C: "",
      anofin_SAL544C: "",
      mesfin_SAL544C: "",
      diafin_SAL544C: "",
      tipocomp_SAL544C: "",
      descriptipo_SAL544C: "",
      pyp_SAL544C: "",
      entidad_SAL544C: "",
      descripentidad_SAL544C: "",
      terceros_SAL544C: "",
      descripterceros_SAL544C: "",
      especilidad_SAL544C: "",
      descripespec_SAL544C: "",
      ciudad_SAL544C: "",
      descripciudad_SAL544C: "",
      medico_SAL544C: "",
      descripmedico_SAL544C: "",
      inconsistencia_SAL544C: "",
      finalidad_SAL544C: "",
      descripfinal_SAL544C: "",
      sede_SAL544: "",
      descripsede_SAL544C: "",
      sucursal_SAL544C: "",
      descripsuc_SAL544C: "",
      formato_SAL544C: "",
      epspaci_SAL544C: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,2,7 - Informe de oportunidad de citas");
    $_this = this;
    $_this.SAL544C.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SAL544C.ANO_LNK = $_this.SAL544C.FECHA_LNK.substring(0, 2);
    $_this.SAL544C.MES_LNK = $_this.SAL544C.FECHA_LNK.substring(2, 4);
    $_this.SAL544C.DIA_LNK = $_this.SAL544C.FECHA_LNK.substring(4, 6);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
      $_this.SAL544C.SERVICIOS = [
        { COD: '0', DESCRIPCION: 'DROGUERIA' },
        { COD: '1', DESCRIPCION: 'CIRUGIAS' },
        { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
        { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
        { COD: '4', DESCRIPCION: 'DOPPLER' },
        { COD: '5', DESCRIPCION: 'T.A.C.' },
        { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
        { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
      ]
    } else {
      $_this.SAL544C.SERVICIOS = [
        { COD: '0', DESCRIPCION: 'DROGUERIA' },
        { COD: '1', DESCRIPCION: 'CIRUGIAS' },
        { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
        { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
        { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
        { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
        { COD: '6', DESCRIPCION: 'PATOLOGIA' },
        { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
      ]
    }
    obtenerDatosCompletos({
      nombreFd: "ENTIDADES",
    },
      function (data) {
        $_this.SAL544C.ENTIDADES = data.ENTIDADES;
        $_this.SAL544C.ENTIDADES.pop();
        loader("hide");
        $_this._evaluarfechaini_SAL544C('1')
        obtenerDatosCompletos({
          nombreFd: "ESPECIALIDAD",
        },
          function (data) {
            $_this.SAL544C.ESPECIALIDADES = data.ESPECIALIDADES;
            $_this.SAL544C.ESPECIALIDADES.pop();
            obtenerDatosCompletos({
              nombreFd: "CIUDADES",
            },
              function (data) {
                $_this.SAL544C.CIUDAD = data.CIUDAD;
                $_this.SAL544C.CIUDAD.pop();
                obtenerDatosCompletos(
                  {
                    nombreFd: "PROFESIONALES",
                  },
                  function (data) {
                    $_this.SAL544C.PROFESIONAL = data.ARCHPROF;
                    $_this.SAL544C.PROFESIONAL.pop();
                    obtenerDatosCompletos({
                      nombreFd: "SUCURSALES",
                    },
                      function (data) {
                        $_this.SAL544C.SUCURSAL = data.SUCURSAL;
                        // $_this.SAL544C.SUCURSAL.pop();

                      });
                  })
              })
          })
      })
  },
  methods: {
    _evaluarfechaini_SAL544C(orden) {
      this.form.anoini_SAL544C = 20 + this.SAL544C.ANO_LNK
      this.form.mesini_SAL544C = this.SAL544C.MES_LNK
      this.form.diaini_SAL544C = '01'
      validarInputs(
        {
          form: "#fechaInicial_SAL544C",
          orden: orden
        },
        () => { _toggleNav() },
        () => {
          if (this.form.anoini_SAL544C.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SAL544C('1');
          } else {
            if (this.form.mesini_SAL544C.trim() == '' || this.form.mesini_SAL544C < 01 || this.form.mesini_SAL544C > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SAL544C('2');
            } else {
              if (this.form.diaini_SAL544C.trim() == '' || this.form.diaini_SAL544C < 01 || this.form.diaini_SAL544C > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SAL544C('3'), 'error', 'error');
              } else {
                this.SAL544C.FECHAINIW = this.form.anoini_SAL544C + this.form.mesini_SAL544C + this.form.diaini_SAL544C
                postData({ datosh: datosEnvio() + '1|' + this.SAL544C.FECHAINIW + "|" }, get_url("APP/SALUD/SAL544C.DLL"))
                  .then(data => {
                    console.log(data, 'PASO 1 ')
                    this._evaluarfechafin_SAL544C('1')
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarfechaini_SAL544C('1')
                  });
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SAL544C(orden) {
      this.form.anofin_SAL544C = 20 + this.SAL544C.ANO_LNK
      this.form.mesfin_SAL544C = this.SAL544C.MES_LNK
      this.form.diafin_SAL544C = this.SAL544C.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SAL544C",
          orden: orden
        },
        () => { this._evaluarfechaini_SAL544C('3') },
        () => {
          if (this.form.anofin_SAL544C.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SAL544C('1');
          } else {
            if (this.form.mesfin_SAL544C.trim() == '' || this.form.mesfin_SAL544C < 01 || this.form.mesfin_SAL544C > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SAL544C('2');
            } else {
              if (this.form.diafin_SAL544C.trim() == '' || this.form.diafin_SAL544C < 01 || this.form.diafin_SAL544C > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SAL544C('3'), 'error', 'error');
              } else {
                this.SAL544C.FECHAFINW = this.form.anofin_SAL544C + this.form.mesfin_SAL544C + this.form.diafin_SAL544C
                if (this.SAL544C.FECHAFINW < this.SAL544C.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SAL544C('3'), 'error', 'error');
                } else {
                  this._evaluartipo_SAL544C()
                }
              }
            }
          }
        }
      )
    },
    _evaluartipo_SAL544C() {
      if (this.form.tipocomp_SAL544C.trim() == '') this.form.tipocomp_SAL544C = '*'
      validarInputs({
        form: "#VALIDAR1_SAL544C",
        orden: "1"
      }, () => { this._evaluarfechafin_SAL544C('3') },
        () => {
          if (this.form.tipocomp_SAL544C == '*') {
            this.form.descriptipo_SAL544C = 'TODOS LOS TIPOS'
            this._evaluarpyp_SAL544C()
          } else {
            let array = this.SAL544C.SERVICIOS.filter(x => x.COD == this.form.tipocomp_SAL544C.trim());
            if (array.length > 0) {
              this.form.tipocomp_SAL544C = array[0].COD
              this.form.descriptipo_SAL544C = array[0].DESCRIPCION
              this._evaluarpyp_SAL544C()
            } else {
              CON851('03', '03', this._datotipo_SAL544C(), 'error', 'error');
            }
          }
        }
      )
    },
    _evaluarpyp_SAL544C() {
      if (this.form.tipocomp_SAL544C != '*') {
        this.form.pyp_SAL544C = 'S'
        this._evaluarentidad_SAL544C()
      } else {
        if (this.form.pyp_SAL544C.trim() == '') this.form.pyp_SAL544C = 'S'
        validarInputs({
          form: "#VALIDAR2_SAL544C",
          orden: "1"
        }, () => { this._evaluartipo_SAL544C(); },
          () => {
            this.form.pyp_SAL544C = this.form.pyp_SAL544C.toUpperCase();
            if (this.form.pyp_SAL544C == 'S' || this.form.pyp_SAL544C == 'N') {
              this._evaluarentidad_SAL544C()
            } else {
              CON851("03", "03", this._evaluarpyp_SAL544C(), "error", "Error");
            }
          }
        )
      }
    },
    _evaluarentidad_SAL544C() {
      if (this.form.entidad_SAL544C.trim() == '') this.form.entidad_SAL544C = '******'
      validarInputs({
        form: "#VALIDAR3_SAL544C",
        orden: "1"
      }, () => { this._evaluarpyp_SAL544C() },
        () => {
          this.form.entidad_SAL544C = this.form.entidad_SAL544C.toUpperCase();
          if (this.form.entidad_SAL544C == '******') {
            this.form.descripentidad_SAL544C = 'TODAS LAS ENTIDADES'
            this._evaluarnitentidad_SAL544C()
          } else {
            const res = this.SAL544C.ENTIDADES.find(e => e["COD-ENT"] == this.form.entidad_SAL544C);
            if (res == undefined) {
              CON851("01", "01", this._evaluarentidad_SAL544C(), "error", "error");
            } else {
              this.form.descripentidad_SAL544C = res['NOMBRE-ENT'];
              this._evaluarnitentidad_SAL544C()
            }
          }
        }
      )
    },
    _evaluarnitentidad_SAL544C() {
      if (this.form.terceros_SAL544C.trim() == '') this.form.terceros_SAL544C = '99'
      validarInputs({
        form: "#VALIDAR4_SAL544C",
        orden: "1"
      }, () => { this._evaluarentidad_SAL544C() },
        () => {
          if (this.form.terceros_SAL544C == '99') {
            this.form.descripterceros_SAL544C = 'PROCESA TODOS LOS CLIENTES'
            this._evaluarespecialidad_SAL544C()
          } else {
            this.form.terceros_SAL544C = this.form.terceros_SAL544C.padStart(10, '0');
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.terceros_SAL544C + "|",
            }, URL)
              .then(data => {
                this.SAL544C.TERCEROS = data.TERCER[0];
                this.form.descripterceros_SAL544C = this.SAL544C.TERCEROS.DESCRIP_TER.trim()
                this._evaluarespecialidad_SAL544C()
              }).catch(error => {
                console.error(error)
                this._evaluarnitentidad_SAL544C()
              });
          }
        }
      )
    },
    _evaluarespecialidad_SAL544C() {
      if (this.form.especilidad_SAL544C.trim() == '') this.form.especilidad_SAL544C = '***'
      validarInputs({
        form: "#VALIDAR5_SAL544C",
        orden: "1"
      }, () => { this._evaluarnitentidad_SAL544C() },
        () => {
          if (this.form.especilidad_SAL544C == '***') {
            this.form.descripespec_SAL544C = 'TODAS LAS ESPECIALIDADES'
            this._evaluarciudad_SAL544C()
          } else {
            this.form.especilidad_SAL544C = this.form.especilidad_SAL544C.padStart(3, '0');
            const res = this.SAL544C.ESPECIALIDADES.find(e => e.CODIGO == this.form.especilidad_SAL544C);
            if (res == undefined) {
              CON851("01", "01", this._evaluarespecialidad_SAL544C(), "error", "error");
            } else {
              this.form.descripespec_SAL544C = res.NOMBRE;
              this._evaluarciudad_SAL544C()
            }
          }
        }
      )
    },
    _evaluarciudad_SAL544C() {
      if (this.form.ciudad_SAL544C.trim() == '') this.form.ciudad_SAL544C = '*****'
      validarInputs({
        form: "#VALIDAR6_SAL544C",
        orden: "1"
      }, () => { this._evaluarespecialidad_SAL544C() },
        () => {
          if (this.form.ciudad_SAL544C == '*****') {
            this.form.descripciudad_SAL544C = 'TODAS LAS CIUDADES'
            this._evaluarmedico_SAL544C()
          } else {
            this.form.ciudad_SAL544C = this.form.ciudad_SAL544C.toUpperCase();
            const res = this.SAL544C.CIUDAD.find(e => e.COD == this.form.ciudad_SAL544C);
            if (res == undefined) {
              CON851("01", "01", this._evaluarciudad_SAL544C(), "error", "error");
            } else {
              this.form.descripciudad_SAL544C = res.NOMBRE;
              this._evaluarmedico_SAL544C()
            }
          }
        }
      )
    },
    _evaluarmedico_SAL544C() {
      if (this.form.medico_SAL544C.trim() == '') this.form.medico_SAL544C = '99'
      validarInputs({
        form: "#VALIDAR7_SAL544C",
        orden: "1"
      }, () => { this._evaluarciudad_SAL544C() },
        () => {
          if (this.form.medico_SAL544C == '99') {
            this.form.descripmedico_SAL544C = 'TODAS LOS MEDICOS'
            this._evaluarinconsistencias_SAL544C()
          } else {
            this.form.medico_SAL544C = this.form.medico_SAL544C.padStart(10, '0');
            const res = this.SAL544C.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.medico_SAL544C);
            if (res == undefined) {
              CON851("01", "01", this._evaluarmedico_SAL544C(), "error", "error");
            } else {
              this.form.descripmedico_SAL544C = res.NOMBRE;
              this._evaluarinconsistencias_SAL544C()
            }
          }
        }
      )
    },
    _evaluarinconsistencias_SAL544C() {
      if (this.form.inconsistencia_SAL544C.trim() == '') this.form.inconsistencia_SAL544C = 'S'
      validarInputs({
        form: "#VALIDAR8_SAL544C",
        orden: "1"
      }, () => { this._evaluarmedico_SAL544C(); },
        () => {
          this.form.inconsistencia_SAL544C = this.form.inconsistencia_SAL544C.toUpperCase();
          if (this.form.inconsistencia_SAL544C == 'S' || this.form.inconsistencia_SAL544C == 'N') {
            this._evaluarfinalidad_SAL544C()
          } else {
            CON851("03", "03", this._evaluarinconsistencias_SAL544C(), "error", "Error");
          }
        }
      )
    },
    _evaluarfinalidad_SAL544C() {
      var finalidad = [
        { COD: "1", DESCRIP: "ATENCION PART" },
        { COD: "2", DESCRIP: "ATENCION REC.NACID" },
        { COD: "3", DESCRIP: "ATENC.PLANIF.FAMIL" },
        { COD: "4", DESCRIP: "DET.ALT CRECIM <10" },
        { COD: "5", DESCRIP: "DET.ALT.DESA.JOVEN" },
        { COD: "6", DESCRIP: "DET.ALT.EMBARAZO" },
        { COD: "7", DESCRIP: "DET.ALT. ADULTO" },
        { COD: "8", DESCRIP: "DET.ALT.AGUD.VISUA" },
        { COD: "9", DESCRIP: "DET.ENFERM.PROFES" },
        { COD: "10", DESCRIP: "NO APLICA" },
        { COD: "11", DESCRIP: "CRONICOS" },
        { COD: "99", DESCRIP: "TODAS LAS FINALID" },
      ];
      POPUP(
        {
          array: finalidad,
          titulo: "FINALIDAD DE LA CONSULTA",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: '99',
          callback_f: () => {
            this._evaluarinconsistencias_SAL544C()
          },
        },
        finalidad => {
          this.form.finalidad_SAL544C = finalidad.COD.padStart(2, '0')
          this.form.descripfinal_SAL544C = finalidad.DESCRIP
          setTimeout(this._evaluarsede_SAL544C, 300);
        },
      );
    },
    _evaluarsede_SAL544C() {
      if ($_USUA_GLOBAL[0].NIT == 844003225) {
        var sede = [
          { COD: "BC", DESCRIP: "BICENTENARIO" },
          { COD: "CA", DESCRIP: "CAMPIDA" },
          { COD: "CS", DESCRIP: "CRESER AMOR" },
          { COD: "CV", DESCRIP: "HOSP. MAERNO" },
          { COD: "EM", DESCRIP: "EL MORRO" },
          { COD: "HT", DESCRIP: "HIPO TERAPI" },
          { COD: "JL", DESCRIP: "JUAN LUIS LOND" },
          { COD: "LC", DESCRIP: "LA CHAPARRERA" },
          { COD: "MR", DESCRIP: "MORICH" },
          { COD: "PV", DESCRIP: "PROVIVIENDA" },
          { COD: "TL", DESCRIP: "TILODIRAN" },
          { COD: "UM", DESCRIP: "UNIDAD MOVIL" },
          { COD: "**", DESCRIP: "MOSTRAR TO" },
        ];
        POPUP(
          {
            array: sede,
            titulo: "SEDE",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: '**',
            callback_f: () => {
              setTimeout(this._evaluarfinalidad_SAL544C, 300);
            },
          },
          sede => {
            this.form.sede_SAL544C = sede.COD
            this.form.descripsede_SAL544C = sede.DESCRIP
            this._evaluarsucursal_SAL544C()
          },
        );
      } else {
        this.form.sede_SAL544C = '**'
        this._evaluarsucursal_SAL544C()
      }
    },
    _evaluarsucursal_SAL544C() {
      if (this.form.sucursal_SAL544C.trim() == '') this.form.sucursal_SAL544C = '**'
      validarInputs({
        form: "#VALIDAR11_SAL544C",
        orden: "1"
      }, () => { setTimeout(this._evaluarfinalidad_SAL544C, 300); },
        () => {
          this.form.sucursal_SAL544C = this.form.sucursal_SAL544C.toUpperCase();
          if (this.form.sucursal_SAL544C == '**') {
            this.form.descripsuc_SAL544C = 'TODAS LAS SUCURSALES'
            this._evaluarformato_SAL544C()
          } else {
            const res = this.SAL544C.SUCURSAL.find(e => e.CODIGO == this.form.sucursal_SAL544C);
            if (res == undefined) {
              CON851("01", "01", this._evaluarsucursal_SAL544C(), "error", "error");
            } else {
              this.form.descripsuc_SAL544C = res.DESCRIPCION;
              this._evaluargrabado_SAL544C()
            }
          }
        }
      )
    },
    _evaluarformato_SAL544C() {
      if (this.form.formato_SAL544C.trim() == '') this.form.formato_SAL544C = 'N'
      validarInputs({
        form: "#VALIDAR12_SAL544C",
        orden: "1"
      }, () => { this._evaluarsucursal_SAL544C(); },
        () => {
          this.form.formato_SAL544C = this.form.formato_SAL544C.toUpperCase();
          if (this.form.formato_SAL544C == 'S' || this.form.formato_SAL544C == 'N') {
            if (this.form.formato_SAL544C == 'N') {
              this.form.epspaci_SAL544C = 'S'
              this._evaluargrabado_SAL544C()
            } else {
              this._evaluareps_SAL544C()
            }
          } else {
            CON851("03", "03", this._evaluarformato_SAL544C(), "error", "Error");
          }
        }
      )
    },
    _evaluareps_SAL544C() {
      $('#VALIDAR13_SAL544C').removeClass('hidden')
      if (this.form.epspaci_SAL544C.trim() == '') this.form.epspaci_SAL544C = 'S'
      validarInputs({
        form: "#VALIDAR13_SAL544C",
        orden: "1"
      }, () => {
        $('#VALIDAR13_SAL544C').addClass('hidden');
        this._evaluarformato_SAL544C();
      },
        () => {
          this.form.epspaci_SAL544C = this.form.epspaci_SAL544C.toUpperCase();
          if (this.form.epspaci_SAL544C == 'S' || this.form.epspaci_SAL544C == 'N') {
            this._evaluargrabado_SAL544C()
          } else {
            CON851("03", "03", this._evaluareps_SAL544C(), "error", "Error");
          }
        }
      )
    },
    _evaluargrabado_SAL544C() {
      console.log('GRABADO')
      loader("show")
      postData({ datosh: datosEnvio() + "2|" + this.SAL544C.FECHAINIW + "|" + this.SAL544C.FECHAFINW + '|' + this.form.tipocomp_SAL544C + '|' + this.form.pyp_SAL544C + '|' + this.form.entidad_SAL544C + '|' + this.form.terceros_SAL544C + '|' + this.form.especilidad_SAL544C + '|' + this.form.ciudad_SAL544C + '|' + this.form.medico_SAL544C + '|' + this.form.inconsistencia_SAL544C + '|' + this.form.finalidad_SAL544C + '|' + this.form.sede_SAL544C + '|' + this.form.sucursal_SAL544C + '|' + this.form.formato_SAL544C + '|' + this.form.epspaci_SAL544C + '|' + localStorage.Usuario + '|' }, get_url("APP/SALUD/SAL544C.DLL"))
        .then(data => {
          console.log(data, 'GRABADO')
          var totales = data.TOTALES[0];
          data = data.REPORTE
          data.pop()
          loader("hide");
          if (this.form.formato_SAL544C == 'N') {
            data.push({
              ACT_FACT: '',
              ATENDIDO: '',
              CIUDAD: '',
              COMPROB: '',
              CONTRATO: '',
              CORREO: '',
              CUPS: totales.DIASTOT2,
              DESCRIP_UNSERV: '',
              DIRECCI: '',
              EDAD_PACI: '',
              EMBARAZO: '',
              EPS: '',
              ESPEC: '',
              FECHA: totales.TOTALCIT,
              FECHA_ELAB: '',
              FECHA_SOLIC: 'dias asign vs us.desea.',
              FINALIDAD: '',
              HORA: '',
              HORAS_CONT: '',
              HORA_ELAB: '',
              ITEM: 'Total nro citas',
              LLAVE_USU: '',
              NACI_PACI: '',
              NIT_USU: '',
              NOMB_FINA: '',
              NOM_CIUDAD: '',
              NOM_CLASP: '',
              NOM_CUPS: '',
              NOM_EPS: '',
              NOM_ESP: '',
              OBSER2: '',
              OBSERV1: '',
              OPER: '',
              OPORDESEA: '',
              OPORRA: 'prom asignacion vs us.desea',
              PACI: '',
              PRIAPEL: 'dias asignacion vs radic.',
              PRINOMBRE: '',
              PROFES: '',
              SEDE: '',
              SEGAPEL: totales.DIASTOT1,
              SEGNOMBRE: '',
              SEXO_PACI: "prom. asign vs radicac",
              SUC: '',
              TEL: totales.DIASPROM2,
              TIPO_DOC: totales.DIASPROM1,
              TIPO_PAC: '',
              UNSERV: '',
            })
            console.log(data);
            // Me falta operador, Cod.habilitac
            columnas = [
              {
                title: "Item",
                value: 'ITEM',

              },
              {
                title: "Fecha cita",
                value: 'FECHA',
                format: "fecha"
              },
              {
                title: "Hora",
                value: 'HORA',
                format: 'string'
              },
              {
                title: "F. usuario desea",
                value: 'FECHA_SOLIC',
                format: "fecha"
              },
              {
                title: "Oport",
                value: 'OPORDESEA',
              },
              {
                title: "Fecha radica",
                value: 'FECHA_ELAB',
                format: "fecha"
              },
              {
                title: "Hora radica",
                value: 'HORA_ELAB',
                format: 'string'
              },
              {
                title: "Oport radica",
                value: 'OPORRA',
              },
              {
                title: "Tipo doc",
                value: 'TIPO_DOC',
              },
              {
                title: "Nro de documento",
                value: 'PACI',
              },
              {
                title: "1er apellido",
                value: 'PRIAPEL',
              },
              {
                title: "2do apellido",
                value: 'SEGAPEL',
              },
              {
                title: "1er nombre",
                value: 'PRINOMBRE',
              },
              {
                title: "2do nombre",
                value: 'SEGNOMBRE',
              },

              {
                title: "Genero",
                value: 'SEXO_PACI',
              },
              {
                title: "Telefono",
                value: 'TEL',
                format: "string"
              },
              {
                title: "cuidad",
                value: 'CIUDAD',
              },
              {
                title: "Nombre ciudad",
                value: 'NOM_CIUDAD',
              },
              {
                title: "Nombre del medico",
                value: 'PROFES',
              },
              {
                title: "Eps",
                value: 'EPS',
                format: "string"
              },
              {
                title: "Nombre Eps",
                value: 'NOM_EPS',
              },
              {
                title: "Especialidad",
                value: 'ESPEC',
              },
              {
                title: "Descrip. Especialidad",
                value: 'NOM_ESP',
              },
              {
                title: "Observacion",
                value: 'OBSERV1',
                format: "string"
              },
              {
                title: "Comprobante",
                value: 'COMPROB',
                format: "string"
              },
              {
                title: "Operador",
                value: 'OPER',
              },
              {
                title: "Nit ips",
                value: 'NIT_USU',
              },
              {
                title: "Cod. Habilitado",
                value: 'LLAVE_USU',
              },
              {
                title: "Estado",
                value: 'ATENDIDO',
              },
              {
                title: "Finalidad",
                value: 'NOMB_FINA',
              },
              {
                title: "Descripcion cups",
                value: 'NOM_CUPS',
              },
              {
                title: "Embarazo",
                value: 'EMBARAZO',
              },
              {
                title: "Cod Unidad serv",
                value: 'UNSERV',
              },
              {
                title: "Unidad servicio",
                value: 'DESCRIP_UNSERV',
              },
              {
                title: "Nombre de sedes",
                value: 'SEDE',
              },
              {
                title: "Fecha de nacimiento",
                value: 'NACI_PACI',
                format: "fecha"
              },
              {
                title: "Email",
                value: 'CORREO',
                format: "string"
              },
              {
                title: "Sucursal",
                value: 'SUC',
                format: "string"
              },
              {
                title: "Regimen",
                value: 'TIPO_PAC',
              },
              {
                title: "Horas contratadas",
                value: 'HORAS_CONT',
              },
              {
                title: "Cups",
                value: 'CUPS',
              },
              {
                title: "Contrato",
                value: 'CONTRATO',
                format: "string"
              },
              {
                title: "Direccion",
                value: 'DIRECCI',
              },
              {
                title: "Edad",
                value: 'EDAD_PACI',
              },
            ]
            _impresion2({
              tipo: 'excel',
              header: [
                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                `RESUMEN DE CITAS DESDE EL DIA ${this.form.anoini_SAL544C}/${this.form.mesini_SAL544C.padStart(2, '0')}/${this.form.diaini_SAL544C.substring(2, '0')} HASTA EL DIA ${this.form.anofin_SAL544C}/${this.form.mesfin_SAL544C.padStart(2, '0')}/${this.form.diafin_SAL544C.substring(2, '0')}`,
                `IMPRESO:${moment().format('YYYY/MM/DD')}`
              ],
              logo: `${$_USUA_GLOBAL[0].NIT}.png`,
              ruta_logo: 'P:\\PROG\\LOGOS\\',
              tabla: {
                columnas,
                data: data,
                // totalsRow: true
              },
              archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
              scale: 65,
              orientation: 'landscape'
            })
              .then(() => {
                CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                console.log('aca')
                _toggleNav();
              })
              .catch(() => {
                CON851('', 'Hubo un error en la impresión', this._evaluareps_SAL544C(), 'error', 'Error')
              })
          } else {
            data.push({
              ACT_FACT: '',
              ATENDIDO: '',
              CIUDAD: '',
              COMPROB: '',
              CONTRATO: '',
              CORREO: '',
              CUPS: totales.DIASTOT2,
              DESCRIP_UNSERV: '',
              DIRECCI: 'tiempo prom. asign vs usu.desea',
              EDAD_PACI: '',
              EMBARAZO: '',
              EPS: '',
              ESPEC: '',
              FECHA: '',
              FECHA_ELAB: '',
              FECHA_SOLIC: 'sumat. asignacion vs radicac',
              FINALIDAD: '',
              HORA: '',
              HORAS_CONT: 'tiempo prom. asign. vs radic.',
              HORA_ELAB: '',
              ITEM: '',
              LLAVE_USU: totales.DIASPROM2,
              NACI_PACI: '',
              NIT_USU: '',
              NOMB_FINA: '',
              NOM_CIUDAD: '',
              NOM_CLASP: '',
              NOM_CUPS: '',
              NOM_EPS: '',
              NOM_ESP: '',
              OBSER2: '',
              OBSERV1: '',
              OPER: '',
              OPORDESEA: '',
              OPORRA: '',
              PACI: totales.TOTALCIT,
              PRIAPEL: '',
              PRINOMBRE: '',
              PROFES: '',
              SEDE: '',
              SEGAPEL: 'dias asignacion vs us.desea',
              SEGNOMBRE: totales.DIASTOT1,
              SEXO_PACI: "prom. asign vs radicac",
              SUC: '',
              TEL: totales.DIASPROM1,
              TIPO_DOC: 'Total nro citas',
              TIPO_PAC: '',
              UNSERV: '',
            })
            console.log(data);
            columnas = [
              {
                title: "Tipo doc",
                value: 'TIPO_DOC',

              },
              {
                title: "Nro de documento",
                value: 'PACI',
              },
              {
                title: "1er apellido",
                value: 'PRIAPEL',
              },
              {
                title: "2do apellido",
                value: 'SEGAPEL',
              },
              {
                title: "1er nombre",
                value: 'PRINOMBRE',
              },
              {
                title: "2do nombre",
                value: 'SEGNOMBRE',
              },
              {
                title: "Direccion paciente",
                value: 'DIRECCI',
              },
              {
                title: "Telefono",
                value: 'TEL',
                format: "string"
              },
              {
                title: "Fecha radica",
                value: 'FECHA',
                format: "fecha"
              },
              {
                title: "Fecha confirma",
                value: 'FECHA_ELAB',
                format: "fecha"
              },
              {
                title: "F. usuario desea",
                value: 'FECHA_SOLIC',
                format: "fecha"
              },
              {
                title: "Cups",
                value: 'CUPS',
              },
              {
                title: "Especialidad",
                value: 'ESPEC',
              },
              {
                title: "Descrip. Especialidad",
                value: 'NOM_ESP',
              },
              {
                title: "Nro horas contratadas",
                value: 'HORAS_CONT',
                format: "string"
              },
              {
                title: "Cod. Habilitado",
                value: 'LLAVE_USU',
              },
              {
                title: "Cod eps",
                value: 'EPS',
                format: "string"
              },
              {
                title: "Nombre eps",
                value: 'NOM_EPS',
              },
            ]
            _impresion2({
              tipo: 'excel',
              header: [
                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                `RESUMEN DE CITAS DESDE EL DIA ${this.form.anoini_SAL544C}/${this.form.mesini_SAL544C.padStart(2, '0')}/${this.form.diaini_SAL544C.substring(2, '0')} HASTA EL DIA ${this.form.anofin_SAL544C}/${this.form.mesfin_SAL544C.padStart(2, '0')}/${this.form.diafin_SAL544C.substring(2, '0')}`,
                `IMPRESO:${moment().format('YYYY/MM/DD')}`
              ],
              logo: `${$_USUA_GLOBAL[0].NIT}.png`,
              ruta_logo: 'P:\\PROG\\LOGOS\\',
              tabla: {
                columnas,
                data: data,
                // totalsRow: true
              },
              archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
              scale: 65,
              orientation: 'landscape'
            })
              .then(() => {
                CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                console.log('aca')
                _toggleNav();
              })
              .catch(() => {
                CON851('', 'Hubo un error en la impresión', this._evaluareps_SAL544C(), 'error', 'Error')
              })
          }

        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarsucursal_SAL544C()
        });
    },
    _f8tipo_SAL544C() {
      var $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIPCION"],
        data: this.SAL544C.SERVICIOS,
        callback_esc: function () {
          $(".tipocomp_SAL544C").focus();
        },
        callback: function (data) {
          $_this.form.tipocomp_SAL544C = data.COD;
          _enterInput('.tipocomp_SAL544C');
        }
      });
    },
    _f8entidad_SAL544C() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ENTIDADES',
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        data: $_this.SAL544C.ENTIDADES,
        callback_esc: function () {
          $(".entidad_SAL544C").focus();
        },
        callback: function (data) {
          $_this.form.entidad_SAL544C = data["COD-ENT"]
          _enterInput('.entidad_SAL544C');
        }
      });

    },
    _f8terceros_SAL544C() {
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          console.log(data, 'TERCERO')
          this.form.terceros_SAL544C = data.COD.trim();
          _enterInput('.terceros_SAL544C');
        },
        cancel: () => {
          _enterInput('.terceros_SAL544C');
        }
      };
      F8LITE(parametros);
    },
    _f8especialidad_SAL544C() {
      $_this = this
      _ventanaDatos({
        titulo: 'VENTANA DE ESPECIALIDADES',
        columnas: ["CODIGO", "NOMBRE"],
        data: $_this.SAL544C.ESPECIALIDADES,
        callback_esc: function () {
          $('.especialidad_SAL544C').focus();
        },
        callback: function (data) {
          $_this.form.especilidad_SAL544C = data.CODIGO;
          _enterInput('.especialidad_SAL544C');
        }
      });
    },
    _f8ciudad_SAL544C() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE CIUDADES",
        columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
        data: $_this.SAL544C.CIUDAD,
        callback_esc: function () {
          $(".ciudad_SAL544C").focus();
        },
        callback: function (data) {
          $_this.form.ciudad_SAL544C = data.COD.trim();
          _enterInput('.ciudad_SAL544C');
        }
      });
    },
    _f8medico_SAL544C() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE PROFESIONALES",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: $_this.SAL544C.PROFESIONAL,
        callback_esc: function () {
          $(".medico_SAL544C").focus()
        },
        callback: function (data) {
          $_this.form.medico_SAL544C = data.IDENTIFICACION
          _enterInput('.medico_SAL544C');
        }
      });
    },
    _f8sucursal_SAL544C() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SUCURSALES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $_this.SAL544C.SUCURSAL,
        callback_esc: function () {
          $(".Sucursal_SAL544C").focus();
        },
        callback: function (data) {
          $_this.form.sucursal_SAL544C = data.CODIGO.trim();
          _enterInput(".Sucursal_SAL544C");
        },
      });
    }
  },
});
