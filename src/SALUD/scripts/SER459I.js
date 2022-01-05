// 28/09/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER459I",
  data: {
    SER459I: [],
    form: {
      anolistarini_SER459I: "",
      meslistarini_SER459I: "",
      dialistarini_SER459I: "",
      anolistarfin_SER459I: "",
      meslistarfin_SER459I: "",
      dialistarfin_SER459I: "",
      nit_SER459I: "",
      descripnit_SER459I: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,3,L,3 - Informe de contraloria");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_ANO_LNK = $_ANO_LNK + 20;
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_FECHAACTUAL = moment().format('YYYYMMDD');
    $_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
    $_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
    $_DIAACTUALW = $_FECHAACTUAL.substring(6, 8);
    var $_this = this;
    obtenerDatosCompletos({
      nombreFd: "TERCEROS",
    }, function (data) {
      console.log(data, 'TERCEROS')
      $_this.SER459I.TERCEROS = data.TERCEROS;
      $_this.SER459I.TERCEROS.pop();
      $_this._evaluarfechaini_SER459I('1')
    });
  },
  methods: {
    _evaluarfechaini_SER459I(orden) {
      console.log('FECHAINI')
      loader("hide");
      this.form.anolistarini_SER459I = $_ANO_LNK;
      this.form.meslistarini_SER459I = $_MES_LNK;
      this.form.dialistarini_SER459I = "01";
      this.form.anolistarfin_SER459I = $_ANOACTUALW 
      this.form.meslistarfin_SER459I = $_MESACTUALW
      this.form.dialistarfin_SER459I = $_DIAACTUALW
      validarInputs(
        {
          form: "#fechalistarInicial_458I",
          orden: orden,
        },
        _toggleNav,
        () => {
          if (this.form.anolistarini_SER459I.trim() == "" || this.form.anolistarini_SER459I < 1990) {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SER459I("1"), "error", "error");
          } else {
            this.form.meslistarini_SER459I = this.form.meslistarini_SER459I.padStart(2, "0");
            if (this.form.meslistarini_SER459I.trim() == "" || this.form.meslistarini_SER459I < 1 || this.form.meslistarini_SER459I > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER459I("2"), "error", "error");
            } else {
              this.form.dialistarini_SER459I = this.form.dialistarini_SER459I.padStart(2, "0");
              if (this.form.dialistarini_SER459I.trim() == "" || this.form.dialistarini_SER459I < 1 || this.form.dialistarini_SER459I > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SER459I("3"), "error", "error");
              } else {
                this.SER459I.FECHAINICIO = this.form.anolistarini_SER459I + this.form.meslistarini_SER459I + this.form.dialistarini_SER459I
                console.log(this.SER459I.FECHAINICIO, 'INICIO')
                this._validarfechafinal_SER459I("1");
              }
            }
          }
        },
      );
    },
    _validarfechafinal_SER459I(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_458I",
          orden: orden,
        },
        () => { this._evaluarfechaini_SER459I("3") },
        () => {
          if (this.form.anolistarfin_SER459I.trim() == "" || this.form.anolistarfin_SER459I < 1990) {
            CON851("", "Año incorrecto! ", this._validarfechafinal_SER459I("1"), "error", "error");
          } else {
            this.form.meslistarfin_SER459I = this.form.meslistarfin_SER459I.padStart(2, "0");
            if (this.form.meslistarfin_SER459I.trim() == "" || this.form.meslistarfin_SER459I < 1 || this.form.meslistarfin_SER459I > 12) {
              CON851("", "Mes incorrecto! ", this._validarfechafinal_SER459I("2"), "error", "error");
            } else {
              this.form.dialistarfin_SER459I = this.form.dialistarfin_SER459I.padStart(2, "0");
              if (this.form.dialistarfin_SER459I.trim() == "" || this.form.dialistarfin_SER459I < 1 || this.form.dialistarfin_SER459I > 31) {
                CON851("", "Dia incorrecto! ", this._validarfechafinal_SER459I("3"), "error", "error");
              } else {
                this.SER459I.FECHAFINAL = this.form.anolistarfin_SER459I + this.form.meslistarfin_SER459I + this.form.dialistarfin_SER459I
                if (this.SER459I.FECHAFINAL < this.SER459I.FECHAINICIO) {
                  this._validarfechafinal_SER459I("1")
                } else {
                  console.log(this.SER459I.FECHAFINAL, 'FINAL')
                  this._evaluarnit_SER459I()
                }
              }
            }
          }
        },
      );
    },
    _evaluarnit_SER459I() {
      if (this.form.nit_SER459I.trim() == '') this.form.nit_SER459I = '99'
      validarInputs(
        {
          form: "#validanit_458I",
          orden: "1",
        },
        () => { this._validarfechafinal_SER459I("2"); },
        () => {

          if (this.form.nit_SER459I == '99') {
            this.form.descripnit_SER459I = 'PROCESO TOTAL'
            this._evaluadll_SER459I()
          } else {
            const res = this.SER459I.TERCEROS.find(e => e.COD == this.form.nit_SER459I);
            if (res == undefined) {
              CON851('01', '01', this._evaluarnit_SER459I(), 'error', 'error');
            } else {
              this.form.descripnit_SER459I = res.NOMBRE;
              this._evaluadll_SER459I()
            }
          }
        },
      );
    },
    
    _evaluadll_SER459I() {
      loader('show');
      postData({ datosh: datosEnvio() + this.SER459I.FECHAINICIO + '|' + this.SER459I.FECHAFINAL + '|' +  this.form.nit_SER459I.padStart(10, '0') + '|' + localStorage.getItem('Usuario') + '|'}, get_url("APP/SALUD/SER459I.DLL"))
        .then(data => {
          console.log(data, 'FACTURAR')
          loader('hide');
          data = data.FACTURA
          columnas = [
              {
                title: "1.NIT",
                value: 'NIT',
              },
              {
                title: "2.NOMBRE",
                value: 'NOMBRE',
              },
              {
                title: "3.TIPO",
                value: 'TIPO',
              },
              {
                title: "4.TIPO ID",
                value: 'TIPOID',
              },
              {
                title: "5.NRO DOC",
                value: 'NRODOC',
              },
              {
                title: "6.1ER APEL",
                value: 'PRAPEL',
              },
              {
                title: "7.1DO APEL",
                value: 'SEGAPEL',
              },
              {
                title: "8.1ER NOMB",
                value: 'PRANOM',
              },
              {
                title: "9.2DO NOMB",
                value: 'SEGNOM',
              },
              {
                title: "10.SEXO",
                value: 'SEXO',
              },
              {
                title: "11.FEC.NACI",
                value: 'NAC',
              },
              {
                title: "12.CODDANACIU",
                value: 'CIUDAD',
              },
              {
                title: "13.TIP REGIME",
                value: 'TIPOPAC',
              },
              {
                title: "14.CODEPS",
                value: 'EPS',
              },
              {
                title: "15.CODDIAG",
                value: 'DIAG',
              },
              {
                title: "16.ENTIDADPRESTO",
                value: 'NOMBREENT',
              },
              {
                title: "17.RADICOPRUEBA",
                value: 'FACT',
              },
              {
                title: "18.CUMMEDICAME",
                value: 'CUM',
              },
              {
                title: "19.TIPDOCMEDI",
                value: 'TIPMED',
              },
              {
                title: "20.NRODOCMEDI",
                value: 'DOCMED',
              },
               {
                title: "21.1ER APELMEDI",
                value: 'APEL1TER',
              },
              {
                title: "22.2DO APELMED",
                value: 'APEL2TER',
              },
              {
                title: "23.1ER NOMMEDI",
                value: 'NOMB1TER',
              },
              {
                title: "24.FECHASERV",
                value: 'FECHASER',
              },
              {
                title: "25.CANTIDAD",
                value: 'CANT',
              },
              {
                title: "26.NITPREST",
                value: 'NITPRES',
              },
              {
                title: "27.CODDANECIU",
                value: 'CIUDPRES',
              },
              {
                title: "28.NRORADICA",
                value: 'NRORAD',
              },
              {
                title: "29.NRORADIINT",
                value: 'NRORADINT',
              },
              {
                title: "30.FECHARAD",
                value: 'FECHAPRE',
              },
              {
                title: "31.TIPOORIGEN",
                value: 'TIPOORIG',
              },
              {
                title: "32.CANTIDAD",
                value: 'CANTSUMI',
              },
              {
                title: "33.VLRUNIDAD",
                value: 'VLRUNI',
              },
              {
                title: "34.VLRTOTAL",
                value: 'VLRTOT',
              },
              {
                title: "35.VLRPAGAD",
                value: 'VLRPAG',
              },
              {
                title: "36.VLRGLOSA",
                value: 'VLRGLO',
              },
              {
                title: "37.FECHAPAGO",
                value: 'FECHABO',
              },
          ]
          _impresion2({
            tipo: 'excel',
            // sheetName: 'Listado validación',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
              `LISTA DE FACTURACION`,
            ],
            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
            ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
            tabla: {
              columnas,
              // totalsRow: true,
              data: data,
              // heightRow: 35,
              // theme: 'TableStyleDark1'
            },
            archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
            scale: 65,
            orientation: 'landscape'
          })
            .then(() => {
              CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
            })
            .catch(() => {
              loader('hide');
              CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
            })
        })
        .catch(err => {
          loader('hide');
          CON851("", "Error en la impresión", this._evaluarnit_SER459I(), "error", "error");
        });
    },
    _f8nit_SER459I() {
      var $_this = this
      _ventanaDatos_lite_v2({
        titulo: 'VENTANA DE TERCEROS',
        data: $_this.SER459I.TERCEROS,
        indice: ["COD", "NOMBRE", "CIUDAD", "ACT"],
        mascara: [{
          "COD": 'Identificacion',
          "NOMBRE": 'Nombre',
          "DIRREC": "direccion",
          "TELEF": "telefono"
        }],
        minLength: 3,
        callback_esc: function () {
          $(".nit_SER459I").focus();
        },
        callback: function (data) {
          $_this.form.nit_SER459I = data.COD
          _enterInput('.nit_SER459I');
        }
      });
    },
    
    
  },
});

