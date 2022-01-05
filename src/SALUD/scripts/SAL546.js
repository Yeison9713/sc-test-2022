// 23/01/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SAL546",
  data: {
    SAL546: [],
    form: {
      anoini_SAL546: "",
      mesini_SAL546: "",
      diaini_SAL546: "",
      anofin_SAL546: "",
      mesfin_SAL546: "",
      diafin_SAL546: "",
      tipocomp_SAL546: "",
      descriptipo_SAL546: "",
      farmacia_SAL546: "",
      grupo_SAL546: "",
      descripgrupo_SAL546: "",

      terceros_SAL546: "",
      descripterceros_SAL546: "",
      especilidad_SAL546: "",
      descripespec_SAL546: "",
      ciudad_SAL546: "",
      descripciudad_SAL546: "",
      medico_SAL546: "",
      descripmedico_SAL546: "",
      inconsistencia_SAL546: "",
      finalidad_SAL546: "",
      descripfinal_SAL546: "",
      sede_SAL544: "",
      descripsede_SAL546: "",
      sucursal_SAL546: "",
      descripsuc_SAL546: "",
      formato_SAL546: "",
      epspaci_SAL546: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,1,2 - Relación de comprobantes por fecha");
    $_this = this;
    $_this.SAL546.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SAL546.ANO_LNK = $_this.SAL546.FECHA_LNK.substring(0, 2);
    $_this.SAL546.MES_LNK = $_this.SAL546.FECHA_LNK.substring(2, 4);
    $_this.SAL546.DIA_LNK = $_this.SAL546.FECHA_LNK.substring(4, 6);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
      $_this.SAL546.SERVICIOS = [
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
      $_this.SAL546.SERVICIOS = [
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
    obtenerDatosCompletos(
      {
        nombreFd: "GRUPO-SER",
      },
      function (data) {
        $_this.SAL546.GRUPOSER = data.CODIGOS;
        $_this.SAL546.GRUPOSER.pop();
        obtenerDatosCompletos(
          {
            nombreFd: "GRUPOS",
          },
          function (data) {
            $_this.SAL546.GRUPOS = data.GRUPOS;
            $_this.SAL546.GRUPOS.pop();
            $_this.SAL546.GRUPOSW = $_this.SAL546.GRUPOS.filter(e => e.TIPO.trim() == 0);
            loader("hide")
            $_this._evaluarfechaini_SAL546('1')
            obtenerDatosCompletos(
              {
                nombreFd: "PROFESIONALES",
              },
              function (data) {
                $_this.SAL546.PROFESIONAL = data.ARCHPROF;
                $_this.SAL546.PROFESIONAL.pop();
                obtenerDatosCompletos(
                  {
                    nombreFd: "TABLAS",
                  },
                  function (data) {
                    $_this.SAL546.TABLA = data.TABLA;
                    $_this.SAL546.TABLA.pop();
                    obtenerDatosCompletos({
                      nombreFd: 'DIVISION'
                    }, function (data) {
                      $_this.SAL546.DIVISION = data.CODIGOS
                      obtenerDatosCompletos({
                        nombreFd: "SUCURSALES",
                      }, function (data) {
                        $_this.SAL546.SUCURSAL = data.SUCURSAL;
                        // $_this.SAL546.SUCURSAL.pop();
                      })
                    })
                  })
              })
          })
      })
  },
  methods: {
    _evaluarfechaini_SAL546(orden) {
      this.form.anoini_SAL546 = 20 + this.SAL546.ANO_LNK
      this.form.mesini_SAL546 = this.SAL546.MES_LNK
      this.form.diaini_SAL546 = '01'
      validarInputs(
        {
          form: "#fechaInicial_SAL546",
          orden: orden
        },
        () => { _toggleNav() },
        () => {
          if (this.form.anoini_SAL546.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SAL546('1');
          } else {
            if (this.form.mesini_SAL546.trim() == '' || this.form.mesini_SAL546 < 01 || this.form.mesini_SAL546 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SAL546('2');
            } else {
              if (this.form.diaini_SAL546.trim() == '' || this.form.diaini_SAL546 < 01 || this.form.diaini_SAL546 > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SAL546('3'), 'error', 'error');
              } else {
                this.SAL546.FECHAINIW = this.form.anoini_SAL546 + this.form.mesini_SAL546 + this.form.diaini_SAL546
                postData({ datosh: datosEnvio() + '1|' + this.SAL546.FECHAINIW + "|" }, get_url("APP/SALUD/SAL544C.DLL"))
                  .then(data => {
                    console.log(data, 'PASO 1 ')
                    this._evaluarfechafin_SAL546('1')
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarfechaini_SAL546('1')
                  });
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SAL546(orden) {
      this.form.anofin_SAL546 = 20 + this.SAL546.ANO_LNK
      this.form.mesfin_SAL546 = this.SAL546.MES_LNK
      this.form.diafin_SAL546 = this.SAL546.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SAL546",
          orden: orden
        },
        () => { this._evaluarfechaini_SAL546('3') },
        () => {
          if (this.form.anofin_SAL546.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SAL546('1');
          } else {
            if (this.form.mesfin_SAL546.trim() == '' || this.form.mesfin_SAL546 < 01 || this.form.mesfin_SAL546 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SAL546('2');
            } else {
              if (this.form.diafin_SAL546.trim() == '' || this.form.diafin_SAL546 < 01 || this.form.diafin_SAL546 > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SAL546('3'), 'error', 'error');
              } else {
                this.SAL546.FECHAFINW = this.form.anofin_SAL546 + this.form.mesfin_SAL546 + this.form.diafin_SAL546
                if (this.SAL546.FECHAFINW < this.SAL546.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SAL546('3'), 'error', 'error');
                } else {
                  this._evaluartipo_SAL546()
                }
              }
            }
          }
        }
      )
    },
    _evaluartipo_SAL546() {
      if (this.form.tipocomp_SAL546.trim() == '') this.form.tipocomp_SAL546 = '*'
      validarInputs({
        form: "#VALIDAR1_SAL546",
        orden: "1"
      }, () => { this._evaluarfechafin_SAL546('3') },
        () => {
          if (this.form.tipocomp_SAL546 == '*') {
            this.form.descriptipo_SAL546 = 'TODOS LOS SERVICIOS'
            this._evaluarfarmacia_SAL546()
          } else {
            let array = this.SAL546.SERVICIOS.filter(x => x.COD == this.form.tipocomp_SAL546.trim());
            if (array.length > 0) {
              this.form.tipocomp_SAL546 = array[0].COD
              this.form.descriptipo_SAL546 = array[0].DESCRIPCION
              this._evaluarfarmacia_SAL546()
            } else {
              CON851('03', '03', this._datotipo_SAL546(), 'error', 'error');
            }
          }
        }
      )
    },
    _evaluarfarmacia_SAL546() {
      this.SAL546.CODTABW = 'SO'
      if (this.form.farmacia_SAL546.trim() == '') this.form.farmacia_SAL546 = 'N'
      validarInputs({
        form: "#VALIDAR2_SAL546",
        orden: "1"
      }, () => { this._evaluartipo_SAL546(); },
        () => {
          this.form.farmacia_SAL546 = this.form.farmacia_SAL546.toUpperCase();
          if (this.form.farmacia_SAL546 == 'S' || this.form.farmacia_SAL546 == 'N') {
            this._evaluargrupos_SAL546()
          } else {
            CON851("03", "03", this._evaluarfarmacia_SAL546(), "error", "Error");
          }
        }
      )
    },
    _evaluargrupos_SAL546() {
      validarInputs({
        form: "#VALIDAR3_SAL546",
        orden: "1"
      }, () => { this._evaluartipo_SAL546(); },
        () => {
          this.grupo_SAL546 = this.form.grupo_SAL546.toUpperCase();
          if (this.grupo_SAL546.trim() == '') {
            this._evaluargrupos_SAL546()
          } else {
            if (this.grupo_SAL546 == '**') {
              this.form.descripgrupo_SAL546 = 'TODOS LOS GRUPOS'
              this._evaluarcodarticulo_SAL546()
            } else {
              if (this.form.tipocomp_SAL546 == '0') {
                const res = this.SAL546.GRUPOSW.find(e => e["COD"] == this.grupo_SAL5466);
                if (res == undefined) {
                  CON851("01", "01", this._evaluargrupos_SAL546(), "error", "error");
                } else {
                  this.form.descripgrupo_SAL546 = res['DESCRIP'];
                  this._evaluarcodarticulo_SAL546()
                }
              } else {
                const res = this.SAL546.GRUPOSER.find(e => e["GRUPO"] == this.grupo_SAL546);
                if (res == undefined) {
                  CON851("01", "01", this._evaluargrupos_SAL546(), "error", "error");
                } else {
                  this.form.descripgrupo_SAL546 = res['DESCRIP'];
                  this._evaluarcodarticulo_SAL546()
                }
              }
            }
          }
        }
      )
    },
    _evaluarcodarticulo_SAL546() {
      if (this.form.articulos_SAL546 == '') this.form.articulos_SAL546 == '*'
      validarInputs({
        form: "#VALIDAR4_SAL546",
        orden: "1"
      }, () => { this._evaluargrupos_SAL546(); },
        () => {
          if (this.form.tipocomp_SAL546 != '0' || this.form.articulos_SAL546.substring(0, 1) == '*') {
            this.SAL546.CLASEW = ''
            this._evaluarclase_SAL546();
          } else {
            if (this.form.articulos_SAL546 == '*') {
              this.form.descriparticulos_SAL546 = 'TODOS'
            } else {
              this._leerarticulo_SAL546();
            }
          }
        }
      )
    },
    _evaluarclase_SAL546() {
      validarInputs({
        form: "#VALIDAR41_SAL546",
        orden: "1"
      }, () => { this._evaluarcodarticulo_SAL546(); },
        () => {
          this.form.claseart_SAL546 = this.form.claseart_SAL546.toUpperCase();
          this._leerarticulo_SAL546();
        }
      )
    },
    _leerarticulo_SAL546() {
      if (this.form.tipocomp_SAL546 == '0') {
        this.SAL546.LLAVENROART = this.grupo_SAL546 + this.form.articulos_SAL546 + this.form.claseart_SAL546
        postData({ datosh: datosEnvio() + this.SAL546.LLAVENROART + "||" }, get_url("APP/INVENT/INV803-01.DLL"))
          .then(data => {
            this.SAL546.ARTICULOS = data.ARTICULOS[0];
            this.form.descriparticulos_SAL546 = this.SAL546.ARTICULOS.DESCRIP_ART
            this._evaluarprefijo_SAL546()
          })
          .catch(error => {
            console.error(error)
            this._evaluarcodarticulo_SAL546()
          });
      } else {
        // this.SAL546.LLAVETAB = this.SAL546.CODTABW + this.form.tipocomp_SAL546 + this.grupo_SAL546 + this.form.articulos_SAL546.trim()
        // const res = this.SAL546.TABLA.find(e => e["COD"] == this.SAL546.LLAVETAB);
        // if (res == undefined) {
        //   CON851("01", "01", this._evaluargrupos_SAL546(), "error", "error");
        // } else {
        //   this.form.descripgrupo_SAL546 = res['DESCRIP'];
        this._evaluarcodarticulo_SAL546()
        // }
      }
    },
    _evaluarprefijo_SAL546() {
      if (this.form.prefijos_SAL546.trim() == '') this.form.prefijos_SAL546 = '*'
      validarInputs({
        form: "#VALIDAR5_SAL546",
        orden: "1"
      }, () => { this._evaluarcodarticulo_SAL546(); },
        () => {
          switch (this.form.prefijos_SAL546) {
            case 'E':
              this.form.descripprefijos_SAL546 = 'CONTADO CREDITO'
              this._evaluarnitentidad_SAL546()
              break;
            case 'C':
              this.form.descripprefijos_SAL546 = 'CONTADO CREDITO'
              this._evaluarnitentidad_SAL546()
              break;
            case 'A':
              this.form.descripprefijos_SAL546 = 'AMBULATORIO'
              this._evaluarnitentidad_SAL546()
              break;
            case 'P':
              this.form.descripprefijos_SAL546 = 'HOSPITALIZADOS'
              this._evaluarnitentidad_SAL546()
              break;
            case 'P':
              this.form.descripprefijos_SAL546 = 'ACCID. TRANSITO'
              this._evaluarnitentidad_SAL546()
              break;
            case '*':
              this.form.descripprefijos_SAL546 = 'TODOS LOS PREFIJOS'
              this._evaluarnitentidad_SAL546()
              break;
            default:
              this._evaluarprefijo_SAL546()
              break;
          }
        }
      )
    },
    _evaluarnitentidad_SAL546() {
      if (this.form.terceros_SAL546.trim() == '') this.form.terceros_SAL546 = '99'
      validarInputs({
        form: "#VALIDAR6_SAL546",
        orden: "1"
      }, () => { this._evaluarentidad_SAL546() },
        () => {
          if (this.form.terceros_SAL546 == '99') {
            this.form.descripterceros_SAL546 = 'PARA PROCESO TOTAL'
            this._evaluarmedico_SAL546()
          } else {
            this.form.terceros_SAL546 = this.form.terceros_SAL546.padStart(10, '0');
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.terceros_SAL546 + "|",
            }, URL)
              .then(data => {
                this.SAL546.TERCEROS = data.TERCER[0];
                this.form.descripterceros_SAL546 = this.SAL546.TERCEROS.DESCRIP_TER.trim()
                this._evaluarmedico_SAL546()
              }).catch(error => {
                console.error(error)
                this._evaluarnitentidad_SAL546()
              });
          }
        }
      )
    },
    _evaluarmedico_SAL546() {
      if (this.form.medico_SAL546.trim() == '') this.form.medico_SAL546 = '99'
      validarInputs({
        form: "#VALIDAR7_SAL546",
        orden: "1"
      }, () => { this._evaluarnitentidad_SAL546() },
        () => {
          if (this.form.medico_SAL546 == '99') {
            this.form.descripmedico_SAL546 = 'TODAS LOS MEDICOS'
            this._evaluardivision_SAL546()
          } else {
            this.form.medico_SAL546 = this.form.medico_SAL546.padStart(10, '0');
            const res = this.SAL546.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.medico_SAL546);
            if (res == undefined) {
              CON851("01", "01", this._evaluarmedico_SAL546(), "error", "error");
            } else {
              this.form.descripmedico_SAL546 = res.NOMBRE;
              this._evaluardivision_SAL546()
            }
          }
        }
      )
    },
    _evaluardivision_SAL546() {
      if (this.form.division_SAL546.trim() == '') this.form.division_SAL546 = '**'
      if (this.form.tipocomp_SAL546 == '0') {
        this.form.division_SAL546 = '**'
        this.form.descripdiv_SAL546 = 'TODAS LAS DIVISIONES'
        this._evaluarusuario_SAL546()
      } else {
        validarInputs({
          form: "#VALIDAR8_SAL546",
          orden: "1"
        }, () => { this._evaluarmedico_SAL546(); },
          () => {
            this.form.division_SAL546 = this.form.division_SAL546.toUpperCase();
            const res = this.SAL546.DIVISION.find(e => e.COD == this.form.division_SAL546);
            if (res == undefined) {
              CON851("01", "01", this._evaluardivision_SAL546(), "error", "error");
            } else {
              // this.form.descripdiv_SAL546 = res.DESCRIP;
              this._evaluarusuario_SAL546()
            }
          }
        )
      }
    },
    _evaluarusuario_SAL546() {
      if (this.form.usuario_SAL546 == '*') {
        this.form.usuario_SAL546 = '*'
      }
      validarInputs({
        form: "#VALIDAR9_SAL546",
        orden: "1"
      }, () => { this._evaluardivision_SAL546(); },
        () => {
          this.this.form.usuario_SAL546 = this.this.form.usuario_SAL546.toUpperCase();
          switch (this.form.usuario_SAL546) {
            case "C":
              this.form.descripusua_SAL546 = 'CONTRIBUTIVO'
              this._evaluardiag_SER442()
              break;
            case "S":
              this.form.descripusua_SAL546 = 'SUBSIDIADO'
              this._evaluardiag_SER442()
              break;
            case "V":
              this.form.descripusua_SAL546 = 'VINCULADO'
              this._evaluardiag_SER442()
              break;
            case "P":
              this.form.descripusua_SAL546 = 'PARTICULAR'
              this._evaluardiag_SER442()
              break;
            case "O":
              this.form.descripusua_SAL546 = 'OTRO TIPO'
              this._evaluardiag_SER442()
              break;
            case "D":
              this.form.descripusua_SAL546 = 'DESPLAZ CONT'
              this._evaluardiag_SER442()
              break;
            case "E":
              this.form.descripusua_SAL546 = 'DESPLAZ SUBS'
              this._evaluardiag_SER442()
              break;
            case "G":
              this.form.descripusua_SAL546 = 'DESPLAZ VINC'
              this._evaluardiag_SER442()
              break;
            case "*":
              this.form.descripusua_SAL546 = 'TODOS LOS TIPOS'
              this._evaluardiag_SER442()
              break;
            default:
              this._evaluarusuario_SAL546()
              break;
          }
        }
      )
    },
    _evaluardiag_SER442(){

    }, 
    _evaluarsucursal_SAL546() {
      if (this.form.sucursal_SAL546.trim() == '') this.form.sucursal_SAL546 = '**'
      validarInputs({
        form: "#VALIDAR11_SAL546",
        orden: "1"
      }, () => { setTimeout(this._evaluarfinalidad_SAL546, 300); },
        () => {
          this.form.sucursal_SAL546 = this.form.sucursal_SAL546.toUpperCase();
          if (this.form.sucursal_SAL546 == '**') {
            this.form.descripsuc_SAL546 = 'TODAS LAS SUCURSALES'
            this._evaluarformato_SAL546()
          } else {
            const res = this.SAL546.SUCURSAL.find(e => e.CODIGO == this.form.sucursal_SAL546);
            if (res == undefined) {
              CON851("01", "01", this._evaluarsucursal_SAL546(), "error", "error");
            } else {
              this.form.descripsuc_SAL546 = res.DESCRIPCION;
              this._evaluargrabado_SAL546()
            }
          }
        }
      )
    },





    _f8tipo_SAL546() {
      var $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIPCION"],
        data: this.SAL546.SERVICIOS,
        callback_esc: function () {
          $(".tipocomp_SAL546").focus();
        },
        callback: function (data) {
          $_this.form.tipocomp_SAL546 = data.COD;
          _enterInput('.tipocomp_SAL546');
        }
      });
    },
    _f8grupo_SAL546() {

    },
    _f8articulo_SAL546() {

    },
    _f8terceros_SAL546() {
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          console.log(data, 'TERCERO')
          this.form.terceros_SAL546 = data.COD.trim();
          _enterInput('.terceros_SAL546');
        },
        cancel: () => {
          _enterInput('.terceros_SAL546');
        }
      };
      F8LITE(parametros);
    },
    _f8medico_SAL546() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE PROFESIONALES",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: $_this.SAL546.PROFESIONAL,
        callback_esc: function () {
          $(".medico_SAL546").focus()
        },
        callback: function (data) {
          $_this.form.medico_SAL546 = data.IDENTIFICACION
          _enterInput('.medico_SAL546');
        }
      });
    },

    _f8division_SAL546() {

    },
    _f8tipousu_SAL546() {
      obtenerDatosCompletos({ nombreFd: 'TIPOUSUARIO' }, (data) => {
        var tipouser = data.TIPOUSUARIO
        POPUP(
          {
            array: tipouser,
            titulo: "TIPO USUARIO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.usuario_SAL546.substring(0, 1),
            callback_f: () => {
              this._evaluardivision_SAL546()
            },
          },
          tipouser => {
            this.form.usuario_SAL546 = tipouser.COD + " - " + tipouser.DESCRIP;

          },
        );
      })
    },
    _f8sucursal_SAL546() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SUCURSALES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $_this.SAL546.SUCURSAL,
        callback_esc: function () {
          $(".Sucursal_SAL546").focus();
        },
        callback: function (data) {
          $_this.form.sucursal_SAL546 = data.CODIGO.trim();
          _enterInput(".Sucursal_SAL546");
        },
      });
    },
    _f8costo_SAL546() {

    },
  },
});
