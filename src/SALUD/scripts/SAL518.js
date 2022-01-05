const { isNumeric, trim } = require("jquery");
const { TouchBarScrubber } = require("electron");
const moment = require('moment');
new Vue({
  el: "#SAL518",
  data: {
    SAL518: [],
    form: {
      almacen_SAL518: "",
      descripalmac_SAL518: "",
      nit_SAL518: "",
      descripnit_SAL518: "",
      vendedor_SAL518: "",
      descripvend_SAL518: "",
      grupo_SAL518: "",
      descripgrupo_SAL518: "",
      clase_SAL518: "",
      descripclase_SAL518: "",
      trasaccion1_SAL518: "",
      trasaccion2_SAL518: "",
      trasaccion3_SAL518: "",
      trasaccion4_SAL518: "",
      division_SAL518: "",
      descripdiv_SAL518: "",
      anoini_SAL518: "",
      mesini_SAL518: "",
      diaini_SAL518: "",
      anofin_SAL518: "",
      mesfin_SAL518: "",
      diafin_SAL518: "",
      itemtabla_SAL518: "",
      directoriotabla_SAL518: "",
      mestabla_SAL518: "",
      rutatabla_SAL518: "",
    },
    tablainventarios_SAL518: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    this.SAL518.FECHAACTUAL = moment().format("YYYYMMDD");
    this.SAL518.ANOINIW = this.SAL518.FECHAACTUAL.substring(0, 4)
    this.SAL518.ANOSIST = this.SAL518.FECHAACTUAL.substring(0, 4)
    this.SAL518.ANOLNK = 20 + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
    this.SAL518.MESLNK = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
    this.SAL518.DIALNK = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6)
    this.SAL518.ANOALFA = parseInt(this.SAL518.ANOLNK);
    this.SAL518.ANOALFAW = parseInt(this.SAL518.ANOALFA) + 1;
    var $_this = this;
    obtenerDatosCompletos({
      nombreFd: 'LOCALIZACION',
    }, function (data) {
      $_this.SAL518.ALMACEN = data.LOCALIZACION;
      $_this.SAL518.ALMACEN.pop();
      obtenerDatosCompletos({
        nombreFd: 'VENDEDOR',
      }, function (data) {
        $_this.SAL518.VENDEDOR = data.VENDEDOR;
        $_this.SAL518.VENDEDOR.pop()
        loader("hide");
        $_this._evaluaropcion_SAL518()
        obtenerDatosCompletos({
          nombreFd: 'GRUPOS',
        }, function (data) {
          $_this.SAL518.GRUPOS = data.GRUPOS;
          $_this.SAL518.GRUPOS.pop()
          obtenerDatosCompletos({
            nombreFd: 'USO',
          }, function (data) {
            $_this.SAL518.USO = data.USO;
            $_this.SAL518.USO.pop()
            $_this.SAL518.USOFILTRO = $_this.SAL518.USO.filter(clase => clase.TIPO == '1');
            obtenerDatosCompletos({
              nombreFd: 'TRANSACCIONES',
            }, function (data) {
              $_this.SAL518.TRANSACCIONES = data.TRANSACCIONES;
              $_this.SAL518.TRANSACCIONES.pop()
              obtenerDatosCompletos({
                nombreFd: 'DIVISION',
              }, function (data) {
                $_this.SAL518.DIVISION = data.CODIGOS;
                $_this.SAL518.DIVISION.pop()
              })
            })
          })
        })
      })
    })
  },
  methods: {
    _evaluaropcion_SAL518() {
      OPCIONES = new Object;
      OPCIONES = {
        '0954229': this._evaluaralmacen_SAL518,
        '095422B': this._evaluaralmacen_SAL518,
      }
      let active = $('#navegacion').find('li.opcion-menu.active');
      this.SAL518.OPCIONACTIVA = active[0].attributes[2].nodeValue;
      let Nombreopcion = {
        '0954229': "9,5,4,2,9 - Informe Sismed",
        '095422B': "9,5,4,2,B - Informe Sismed circulación 06 2018",
      }
      nombreOpcion(Nombreopcion[this.SAL518.OPCIONACTIVA]);
      let opcion = new Function();
      opcion = OPCIONES[active[0].attributes[2].nodeValue];
      opcion();
    },
    _evaluaralmacen_SAL518() {
      if (this.SAL518.OPCIONACTIVA == '095422B') $('#VALIDAR4_1_SAL518').removeClass('hidden')
      if (this.SAL518.OPCIONACTIVA == '0954229') $('#VALIDAR9_SAL518').removeClass('hidden')

      if (this.form.almacen_SAL518.trim() == '') this.form.almacen_SAL518 = '*****'
      validarInputs(
        {
          form: "#VALIDAR1_SAL518",
          orden: "1",
        }, () => {
          _toggleNav()
        },
        () => {
          this.form.almacen_SAL518 = this.form.almacen_SAL518.padStart(5, '0')
          if (this.form.almacen_SAL518 == '*****') {
            this.form.descripalmac_SAL518 = 'TODOS LOS ALMACENES'
            this._evaluarnit_SAL518()
          } else {
            let res = this.SAL518.ALMACEN.find(e => e.CODIGO == this.form.almacen_SAL518);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluaralmacen_SAL518()
            } else {
              this.form.descripalmac_SAL518 = res.DESCRIPCION;
              this._evaluarnit_SAL518()
            }
          }
        },
      );
    },
    _evaluarnit_SAL518() {
      if (this.form.nit_SAL518.trim() == '') this.form.nit_SAL518 = '99'
      validarInputs(
        {
          form: "#VALIDAR2_SAL518",
          orden: "1",
        }, () => {
          this._evaluaralmacen_SAL518()
        },
        () => {
          if (this.form.nit_SAL518 == '99') {
            this.form.descripnit_SAL518 = 'PROCESO TOTAL'
            this._evaluarvendedor_SAL518()
          } else {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.nit_SAL518.padStart(10, '0') + "|",
            }, URL)
              .then(data => {
                this.SAL518.TERCEROS = data.TERCER[0];
                this.form.descripnit_SAL518 = this.SAL518.TERCEROS.DESCRIP_TER.trim()
                this.form.vendedor_SAL518 = '*****'
                this.form.descripvend_SAL518 = 'TODOS LOS VENDEDORES'
                this._evaluargrupo_SAL518()
              }).catch(error => {
                console.error(error)
                this._evaluarnit_SAL518()
              });
          }
        },
      );
    },
    _evaluarvendedor_SAL518() {
      if (this.form.vendedor_SAL518.trim() == '') this.form.vendedor_SAL518 = '*****'
      validarInputs(
        {
          form: "#VALIDAR3_SAL518",
          orden: "1",
        }, () => {
          this._evaluarnit_SAL518()
        },
        () => {
          this.form.vendedor_SAL518 = this.form.vendedor_SAL518.toUpperCase();
          if (this.form.vendedor_SAL518 == '*****') {
            this.form.descripvend_SAL518 = 'TODOS LOS VENDEDORES'
            this._evaluargrupo_SAL518()
          } else {
            let res = this.SAL518.VENDEDOR.find(e => e.CUENTA == this.form.vendedor_SAL518);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarvendedor_SAL518()
            } else {
              let URL = get_url("APP/CONTAB/CON805A.DLL");
              postData({
                datosh: datosEnvio() + res.NIT + "|0|",
              }, URL)
                .then(data => {
                  this.form.descripalmac_SAL518 = data;
                  this._evaluargrupo_SAL518()
                }).catch(error => {
                  console.error(error)
                  this._evaluarvendedor_SAL518()
                });
            }
          }
        },
      );
    },
    _evaluargrupo_SAL518() {
      if (this.form.grupo_SAL518.trim() == '') this.form.grupo_SAL518 = '***'
      validarInputs(
        {
          form: "#VALIDAR4_SAL518",
          orden: "1",
        }, () => {
          this._evaluarnit_SAL518()
        },
        () => {
          this.form.grupo_SAL518 = this.form.grupo_SAL518.toUpperCase();
          if (this.form.grupo_SAL518 == '***') {
            this.form.descripgrupo_SAL518 = 'TODOS LOS GRUPOS'
            this._evaluarclase_SAL518()
          } else {
            this.SAL518.GRUPOFILTRO = this.SAL518.GRUPOS.filter(clase => clase.TIPO == this.form.grupo_SAL518.substring(0, 1));
            let res = this.SAL518.GRUPOFILTRO.find(e => e.GRUPO == this.form.grupo_SAL518.substring(1, 3));
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluargrupo_SAL518()
            } else {
              this.form.descripgrupo_SAL518 = res.DESCRIP;
              this._evaluarclase_SAL518()
            }
          }
        },
      );
    },
    _evaluarclase_SAL518() {
      if (this.form.clase_SAL518.trim() == '') this.form.clase_SAL518 = '**'
      validarInputs(
        {
          form: "#VALIDAR5_SAL518",
          orden: "1",
        }, () => {
          this._evaluargrupo_SAL518()
        },
        () => {
          this.form.clase_SAL518 = this.form.clase_SAL518.toUpperCase();
          if (this.SAL518.OPCIONACTIVA == '095422B') {
            this._evaluarcompras_SAL518()
          } else {
            this._evaluaruso_SAL518()
          }
        },
      );
    },
    _evaluarcompras_SAL518() {
      validarInputs({
        form: '#VALIDAR4_1_SAL518',
        orden: '1',
      },
        () => { this._evaluarclase_SAL518() },
        () => {
          if (Maskcompras_SAL518.value.trim() == '') Maskcompras_SAL518.typedValue = 'N';
          this._evaluaruso_SAL518()
        }
      )
    },
    _evaluaruso_SAL518() {
      if (this.form.clase_SAL518 == '**') {
        this.form.descripclase_SAL518 = 'PROCESO TOTAL'
        this._evaluartrans1_SAL518()
      } else {
        let res = this.SAL518.USOFILTRO.find(e => e.COD == this.form.clase_SAL518);
        if (res == undefined) {
          CON851("01", "01", null, "error", "error");
          this._evaluarclase_SAL518()
        } else {
          this.form.descripclase_SAL518 = res.DESCRIP;
          this._evaluartrans1_SAL518()
        }

      }
    },
    _evaluartrans1_SAL518() {
      if (this.SAL518.OPCIONACTIVA == '095422B') {
        if (Maskcompras_SAL518.value == 'N') {
          this.form.trasaccion1_SAL518 = '201'
          this.form.trasaccion2_SAL518 = '121'
          this.form.trasaccion3_SAL518 = '1A1'
          this.form.trasaccion4_SAL518 = '101'
        } else {
          this.form.trasaccion1_SAL518 = '1A1'
          this.form.trasaccion2_SAL518 = '101'
        }
        this._evaluardivision_SAL518()
      } else {
        validarInputs(
          {
            form: "#VALIDAR6_1_SAL518",
            orden: "1",
          }, () => {
            this._evaluarclase_SAL518()
          },
          () => {
            this.form.trasaccion1_SAL518 = this.form.trasaccion1_SAL518.toUpperCase();
            let res = this.SAL518.TRANSACCIONES.find(e => e.LLAVE_TRANS == this.form.trasaccion1_SAL518);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluartrans1_SAL518()
            } else {
              if (this.form.trasaccion1_SAL518 == '201') this.form.trasaccion2_SAL518 = '121'
              this._evaluartrans2_SAL518()
            }
          },
        );
      }
    },
    _evaluartrans2_SAL518() {
      validarInputs(
        {
          form: "#VALIDAR6_2_SAL518",
          orden: "1",
        }, () => {
          this._evaluartrans1_SAL518()
        },
        () => {
          this.form.trasaccion2_SAL518 = this.form.trasaccion2_SAL518.toUpperCase();
          if (this.form.trasaccion2_SAL518.trim() == '') {
            this._evaluartrans3_SAL518()
          } else {
            let res = this.SAL518.TRANSACCIONES.find(e => e.LLAVE_TRANS == this.form.trasaccion2_SAL518);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluartrans2_SAL518()
            } else {
              this._evaluartrans3_SAL518()
            }
          }
        },
      );
    },
    _evaluartrans3_SAL518() {
      validarInputs(
        {
          form: "#VALIDAR6_3_SAL518",
          orden: "1",
        }, () => {
          this._evaluartrans2_SAL518()
        },
        () => {
          this.form.trasaccion3_SAL518 = this.form.trasaccion3_SAL518.toUpperCase();
          if (this.form.trasaccion3_SAL518.trim() == '') {
            this._evaluartrans4_SAL518()
          } else {
            let res = this.SAL518.TRANSACCIONES.find(e => e.LLAVE_TRANS == this.form.trasaccion3_SAL518);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluartrans3_SAL518()
            } else {
              this._evaluartrans4_SAL518()
            }
          }
        },
      );
    },
    _evaluartrans4_SAL518() {
      validarInputs(
        {
          form: "#VALIDAR6_4_SAL518",
          orden: "1",
        }, () => {this._evaluartrans3_SAL518()},
        () => {
          this.form.trasaccion4_SAL518 = this.form.trasaccion4_SAL518.toUpperCase();
          if (this.form.trasaccion4_SAL518.trim() == '') {
            this._evaluardivision_SAL518()
          } else {
            let res = this.SAL518.TRANSACCIONES.find(e => e.LLAVE_TRANS == this.form.trasaccion4_SAL518);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluartrans4_SAL518()
            } else {
              this._evaluardivision_SAL518()
            }
          }
        },
      );
    },
    _evaluardivision_SAL518() {
      if (this.form.division_SAL518.trim() == '') this.form.division_SAL518 = '**'
      validarInputs(
        {
          form: "#VALIDAR7_SAL518",
          orden: "1",
        }, () => {
          if (this.SAL518.OPCIONACTIVA == '095422B') {
            this._evaluarcompras_SAL518()
          } else {
            this._evaluartrans4_SAL518()
          }
        },
        () => {
          if (this.form.division_SAL518 == '**') {
            this.form.descripdiv_SAL518 = 'TODAS LAS DIVISIONES'
            this._evaluardetalle_SAL518()
          } else {
            this.form.division_SAL518 = this.form.division_SAL518.padStart(2, '0')
            let res = this.SAL518.DIVISION.find(e => e.COD == this.form.division_SAL518);
            if (res == undefined) {
              if ($_USUA_GLOBAL[0].NIT == 891855847) {
                this._evaluardetalle_SAL518()
              } else {
                CON851("01", "01", null, "error", "error");
                this._evaluardivision_SAL518()
              }
            } else {
              this.form.descripdiv_SAL518 = res.DESCRIP
              this._evaluardetalle_SAL518()
            }
          }
        },
      );
    },
    _evaluardetalle_SAL518() {
      validarInputs({
        form: '#VALIDAR8_SAL518',
        orden: '1',
      },
        () => { this._evaluardivision_SAL518() },
        () => {
          if (Maskdetalle_SAL518.value.trim() == '') Maskdetalle_SAL518.typedValue = 'N';
          if (this.SAL518.OPCIONACTIVA == '095422B') {
            this._evaluarfechaini_SAL518('1')
          } else {
            this._evaluarsisdis_SAL518()
          }
        }
      )
    },
    _evaluarsisdis_SAL518() {
      validarInputs({
        form: '#VALIDAR9_SAL518',
        orden: '1',
      },
        () => { this._evaluardetalle_SAL518() },
        () => {
          if (Masksisdis_SAL518.value.trim() == '') Masksisdis_SAL518.typedValue = 'N';
          this._evaluarfechaini_SAL518('1')
        }
      )
    },
    _evaluarfechaini_SAL518(orden) {
      if (this.form.mesini_SAL518.trim() == '') {
        this.form.anoini_SAL518 = this.SAL518.ANOLNK
        this.form.mesini_SAL518 = this.SAL518.MESLNK
        this.form.diaini_SAL518 = "01"
      }
      validarInputs(
        {
          form: "#fechaInicial_SAL518",
          orden: orden,
        },
        this._evaluardetalle_SAL518,
        () => {
          if (this.form.anoini_SAL518.trim() == "" || this.form.anoini_SAL518 < 1990) {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SAL518("1"), "error", "error");
          } else {
            this.form.mesini_SAL518 = this.form.mesini_SAL518.padStart(2, "0");
            if (this.form.mesini_SAL518 == "00" || this.form.mesini_SAL518 < 1 || this.form.mesini_SAL518 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SAL518("2"), "error", "error");
            } else {
              this.form.diaini_SAL518 = this.form.diaini_SAL518.padStart(2, "0");
              if (this.form.diaini_SAL518 == "00" || this.form.diaini_SAL518 < 1 || this.form.diaini_SAL518 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SAL518("3"), "error", "error");
              } else {
                this.SAL518.FECHAINIW = this.form.anoini_SAL518 + this.form.mesini_SAL518 + this.form.diaini_SAL518
                this._evaluarfechafin_SAL518("1");
              }
            }
          }
        },
      );
    },
    _evaluarfechafin_SAL518(orden) {
      if (this.form.mesfin_SAL518.trim() == '') {
        this.form.anofin_SAL518 = this.SAL518.ANOLNK
        this.form.mesfin_SAL518 = this.SAL518.MESLNK
        this.form.diafin_SAL518 = this.SAL518.DIALNK
      }

      validarInputs(
        {
          form: "#fechaFinal_SAL518",
          orden: orden,
        },
        () => { this._evaluarfechaini_SAL518("3") },
        () => {
          if (this.form.anofin_SAL518.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SAL518("1"), "error", "error");
          } else {
            if (this.form.mesfin_SAL518 == "00" || this.form.mesfin_SAL518 < 1 || this.form.mesfin_SAL518 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SAL518("2"), "error", "error");
            } else {
              if (this.form.diafin_SAL518 == "00" || this.form.diafin_SAL518 < 1 || this.form.diafin_SAL518 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SAL518("3"), "error", "error");
              } else {
                this.SAL518.FECHAFINALW = this.form.anofin_SAL518 + this.form.mesfin_SAL518.padStart(2, '0') + this.form.diafin_SAL518.padStart(2, '0')
                switch (this.form.mesfin_SAL518) {
                  case '01':
                    this.SAL518.MESFINCTL = 'FEB'
                    break;
                  case '02':
                    this.SAL518.MESFINCTL = 'MAR'
                    break;
                  case '03':
                    this.SAL518.MESFINCTL = 'ABR'
                    break;
                  case '04':
                    this.SAL518.MESFINCTL = 'MAY'
                    break;
                  case '05':
                    this.SAL518.MESFINCTL = 'JUN'
                    break;
                  case '06':
                    this.SAL518.MESFINCTL = 'JUL'
                    break;
                  case '07':
                    this.SAL518.MESFINCTL = 'AGT'
                    break;
                  case '08':
                    this.SAL518.MESFINCTL = 'SEP'
                    break;
                  case '09':
                    this.SAL518.MESFINCTL = 'OCT'
                    break;
                  case '10':
                    this.SAL518.MESFINCTL = 'NOV'
                    break;
                  case '11':
                    this.SAL518.MESFINCTL = 'DIC'
                    break;
                  case '12':
                    this.SAL518.MESFINCTL = 'CIE'
                    break;
                }
                CON851P('04', ()=>{this._evaluarfechafin_SAL518("1")}, this._validacionesinitabla_SAL518)
              }
            }
          }
        },
      );
    },
    _validacionesinitabla_SAL518() {
      this.form.directoriotabla_SAL518 = '\\' + $_USUA_GLOBAL[0].DIRECC_USU
      switch (this.form.mesini_SAL518) {
        case '01':
          this.form.mestabla_SAL518 = 'ENE'
          break;
        case '02':
          this.form.mestabla_SAL518 = 'FEB'
          break;
        case '03':
          this.form.mestabla_SAL518 = 'MAR'
          break;
        case '04':
          this.form.mestabla_SAL518 = 'ABR'
          break;
        case '05':
          this.form.mestabla_SAL518 = 'MAY'
          break;
        case '06':
          this.form.mestabla_SAL518 = 'JUN'
          break;
        case '07':
          this.form.mestabla_SAL518 = 'JUL'
          break;
        case '08':
          this.form.mestabla_SAL518 = 'AGT'
          break;
        case '09':
          this.form.mestabla_SAL518 = 'SEP'
          break;
        case '10':
          this.form.mestabla_SAL518 = 'OCT'
          break;
        case '11':
          this.form.mestabla_SAL518 = 'NOV'
          break;
        case '12':
          this.form.mestabla_SAL518 = 'DIC'
          break;
        default:
          this.form.mestabla_SAL518 = 'ENE'
          break;
      }
      this.form.itemtabla_SAL518 = 1
      this._evaluaradato0tabla_SAL518()
    },
    _evaluaradato0tabla_SAL518() {
      if (this.form.itemtabla_SAL518 > 20) this._consultadll_SAL518()
      if (this.form.itemtabla_SAL518 > 1 && this.form.mesini_SAL518 != this.form.mesfin_SAL518) {
        switch (this.form.mestabla_SAL518) {
          case 'ENE':
            this.form.mestabla_SAL518 = 'FEB'
            break;
          case 'FEB':
            this.form.mestabla_SAL518 = 'MAR'
            break;
          case 'MAR':
            this.form.mestabla_SAL518 = 'ABR'
            break;
          case 'ABR':
            this.form.mestabla_SAL518 = 'MAY'
            break;
          case 'MAY':
            this.form.mestabla_SAL518 = 'JUN'
            break;
          case 'JUN':
            this.form.mestabla_SAL518 = 'JUL'
            break;
          case 'JUL':
            this.form.mestabla_SAL518 = 'AGT'
            break;
          case 'AGT':
            this.form.mestabla_SAL518 = 'SEP'
            break;
          case 'SEP':
            this.form.mestabla_SAL518 = 'OCT'
            break;
          case 'OCT':
            this.form.mestabla_SAL518 = 'NOV'
            break;
          case 'NOV':
            this.form.mestabla_SAL518 = 'DIC'
            break;
          case 'DIC':
            this.form.mestabla_SAL518 = '  '
            break;
        }
        if (this.MESFINCTL == this.form.mestabla_SAL518) {
          this.form.mestabla_SAL518 = ''
        }
      }
      this._evaluarmestabla_SAL518()
    },
    _evaluardirectoriotabla_SAL518() {
      _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para Grabar' }] })
      validarInputs(
        {
          form: "#DIRECTORIO_SAL518",
          orden: '1',
          event_f3: this._consultadll_SAL518
        },
        () => {
          this._evaluarfechafin_SAL518("3")
        },
        () => {
          this.form.directoriotabla_SAL518 = this.form.directoriotabla_SAL518.toUpperCase()
          _FloatText({ estado: 'off' })
          if (this.form.directoriotabla_SAL518.trim() == '') {
            this.form.mestabla_SAL518 = ''
            this.form.rutatabla_SAL518 = ''
            this._evaluarmovimiento_SAL518()
          } else {
            this._evaluarmestabla_SAL518()
          }
        }
      )
    },
    _evaluarmestabla_SAL518() {
      _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para Grabar' }] })
      validarInputs(
        {
          form: "#MES_SAL518",
          orden: '1',
          event_f3: this._consultadll_SAL518
        },
        () => {
          this._evaluardirectoriotabla_SAL518()
        },
        () => {
          this.form.mestabla_SAL518 = this.form.mestabla_SAL518.toUpperCase()
          _FloatText({ estado: 'off' })
          if (this.form.mestabla_SAL518.trim() == '') {
            this.form.mestabla_SAL518 = ''
            this.form.rutatabla_SAL518 = ''
            this._evaluarmovimiento_SAL518()
          } else {
            this.form.rutatabla_SAL518 = this.form.directoriotabla_SAL518 + '/' + this.form.mestabla_SAL518 + '/SC-MOVINV.DAT'
            this._evaluarmovimiento_SAL518()
          }
        }
      )
    },
    _evaluarmovimiento_SAL518() {
      if (this.form.rutatabla_SAL518.trim() == '') {
        this.form.itemtabla_SAL518++
        this._evaluaradato0tabla_SAL518()
      } else {
        let ruta = this.tablainventarios_SAL518.filter(x => x.Ruta == this.form.rutatabla_SAL518);
        if (ruta.length > 0) {
          CON851("05", "05", this._evaluarmestabla_SAL518(), "error", "Error");
        } else {
          $_this = this
          switch ($_this.SAL518.OPCIONACTIVA) {
            case "095422B":
              let URL1 = get_url("APP/SALUD/SAL520.DLL");
              postData({
                datosh: datosEnvio() + '1|' + $_this.form.rutatabla_SAL518 + "|",
              }, URL1)
                .then(data => {
                  $_this._ingresartabla_SAL518()
                }).catch(error => {
                  console.error(error)
                  $_this._evaluarmestabla_SAL518()
                });
              break;
            case "0954229":
              let URL2 = get_url("APP/SALUD/SAL518.DLL");
              postData({
                datosh: datosEnvio() + '1|' + $_this.form.rutatabla_SAL518 + "|",
              }, URL2)
                .then(data => {
                  $_this._ingresartabla_SAL518()
                }).catch(error => {
                  console.error(error)
                  $_this._evaluarmestabla_SAL518()
                });
              break;
            // default:
            //   break;
          }
        }
      }
    },
    _ingresartabla_SAL518() {
      this.tablainventarios_SAL518.push({
        Directorio: this.form.directoriotabla_SAL518,
        Mes: this.form.mestabla_SAL518,
        Ruta: this.form.rutatabla_SAL518
      });
      this._inicializa_SAL518()
      this.form.itemtabla_SAL518++
      this._evaluarmestabla_SAL518()
    },

    _inicializa_SAL518() {
      this.form.mestabla_SAL518 = ''
      this.form.rutatabla_SAL518 = ''
    },

    _consultadll_SAL518() {
      _FloatText({ estado: 'off' })
      loader("show")
      if (this.tablainventarios_SAL518.length == 0) {
        loader("hide");
        CON851('', 'Tabla vacia', this._evaluarmestabla_SAL518(), 'error', 'error');
      } else {
        var data = {};
        var lin = 1;
        for (var i in this.tablainventarios_SAL518) {
          data['LIN-' + lin.toString().padStart(3, '0')] = this.tablainventarios_SAL518[i].Ruta + '|';
          lin++;
        }
        var $_this = this;
        switch ($_this.SAL518.OPCIONACTIVA) {
          case '095422B':
            data.datosh = `${datosEnvio()}2|${$_this.form.rutatabla_SAL518}|${$_this.form.almacen_SAL518}|${$_this.form.nit_SAL518}|${$_this.form.vendedor_SAL518}|${$_this.form.grupo_SAL518}|${$_this.form.clase_SAL518}|${Maskcompras_SAL518.value}|${$_this.form.trasaccion1_SAL518.substring(0,2) }|${$_this.form.trasaccion2_SAL518.substring(0,2)}|${$_this.form.trasaccion3_SAL518.substring(0,2)}|${$_this.form.trasaccion4_SAL518.substring(0,2)}|${$_this.form.division_SAL518}|${Maskdetalle_SAL518.value}|${$_this.SAL518.FECHAINIW}|${$_this.SAL518.FECHAFINALW}|${localStorage.Usuario}|`
            postData(data, get_url("APP/SALUD/SAL520.DLL"))
              .then(data => {
                loader("hide");
                $_this.SAL518.RUTA = data
                var nombretxt = data.replace('.TXT', '');
                let datosEnvio = {
                  nombre_txt: nombretxt,
                };
                $.ajax({
                  data: datosEnvio,
                  type: 'POST',
                  async: false,
                  url: get_url('app/Inc/_crearRIPS.php')
                }).done(function (data) {
                  if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                    console.error('problemas para crear el txt');
                  } else {
                    let texto = data.split(/\r\n/);
                    let datos = '';
                    for (var i in texto) {
                      if (i == 0) {
                        datos = `${texto[i].trim()}`;
                      } else {
                        if (texto[i].trim() != '') {
                          datos = `${datos}\r\n${texto[i].trim()}`;
                        }
                      }
                    }
                    const buffer = Buffer.from(datos, 'latin1');
                    fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, { encoding: 'binary' }, function (err) {
                      if (err) return console.error(err);
                    });
                  }
                });
                CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
              }).catch(error => {
                console.error(error)
                loader("hide");
                $_this._evaluarmestabla_SAL518()
              });
            break;
          case '0954229':
            let URL2 = get_url("APP/SALUD/SAL518.DLL");
            postData({
              datosh: datosEnvio() + '2|' + $_this.form.rutatabla_SAL518 + '|',
            }, URL2)
              .then(data => {
                console.log(data, 'GRABADO')

              }).catch(error => {
                console.error(error)
                $_this._evaluarmestabla_SAL518()
              });
            break;
          // default:
          //   break;
        }
      }

    },

    /////////////////VENTANAS F8////////////////////
    _f8almacen_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE ALMACENCES",
        columnas: ["CODIGO", "DESCRIPCION", "RESPONSABLE"],
        data: $_this.SAL518.ALMACEN,
        callback_esc: function () {
          $(".almacen_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.almacen_SAL518 = data.CODIGO.trim()
          _enterInput('.almacen_SAL518');
        }
      });
    },
    _f8nit_SAL518() {
      $_this = this
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          $_this.form.nit_SAL518 = data.COD.padStart(10, '0');
          _enterInput('.tercero_SAL518');
        },
        cancel: () => {
          _enterInput('.tercero_SAL518');
        }
      };
      F8LITE(parametros);
    },
    _f8vendedor_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE VENDEDORES",
        columnas: ["CUENTA", "NOMBRE", "ACTIVI", "SUC"],
        data: $_this.SAL518.VENDEDOR,
        callback_esc: function () {
          $(".vendedor_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.vendedor_SAL518 = data.CUENTA.trim()
          _enterInput('.vendedor_SAL518');
        }
      });
    },
    _f8grupo_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE GRUPOS",
        columnas: ["TIPO", "GRUPO", "DESCRIP"],
        data: $_this.SAL518.GRUPOS,
        callback_esc: function () {
          $(".grupo_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.grupo_SAL518 = data.TIPO.trim() + data.GRUPO.trim()
          _enterInput('.grupo_SAL518');
        }
      });
    },
    _f8clase_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE CLASES",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SAL518.USOFILTRO,
        callback_esc: function () {
          $(".clase_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.clase_SAL518 = data.COD.trim()
          _enterInput('.clase_SAL518');
        }
      });
    },
    _f8trasaccion1_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE TRASACCIONES",
        columnas: ["LLAVE_TRANS", "DESCRIP_TRANS"],
        data: $_this.SAL518.TRANSACCIONES,
        callback_esc: function () {
          $(".trasaccion1_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.trasaccion1_SAL518 = data.LLAVE_TRANS
          _enterInput('.trasaccion1_SAL518');
        }
      });
    },
    _f8trasaccion2_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE TRASACCIONES",
        columnas: ["LLAVE_TRANS", "DESCRIP_TRANS"],
        data: $_this.SAL518.TRANSACCIONES,
        callback_esc: function () {
          $(".trasaccion2_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.trasaccion2_SAL518 = data.LLAVE_TRANS
          _enterInput('.trasaccion2_SAL518');
        }
      });
    },
    _f8trasaccion3_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE TRASACCIONES",
        columnas: ["LLAVE_TRANS", "DESCRIP_TRANS"],
        data: $_this.SAL518.TRANSACCIONES,
        callback_esc: function () {
          $(".trasaccion3_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.trasaccion3_SAL518 = data.LLAVE_TRANS
          _enterInput('.trasaccion3_SAL518');
        }
      });
    },
    _f8trasaccion4_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE TRASACCIONES",
        columnas: ["LLAVE_TRANS", "DESCRIP_TRANS"],
        data: $_this.SAL518.TRANSACCIONES,
        callback_esc: function () {
          $(".trasaccion4_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.trasaccion4_SAL518 = data.LLAVE_TRANS
          _enterInput('.trasaccion4_SAL518');
        }
      });
    },
    _f8division_SAL518() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE DIVISIONES",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SAL518.DIVISION,
        callback_esc: function () {
          $(".division_SAL518").focus();
        },
        callback: function (data) {
          $_this.form.division_SAL518 = data.COD.trim()
          _enterInput('.division_SAL518');
        }
      });
    }

  },
});

var Maskdetalle_SAL518 = IMask($('#detalle_SAL518')[0], {
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

var Masksisdis_SAL518 = IMask($('#sisdis_SAL518')[0], {
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

var Maskcompras_SAL518 = IMask($('#compras_SAL518')[0], {
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
