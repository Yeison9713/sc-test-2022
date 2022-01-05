// 18/02/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#FT025",
  data: {
    FT025: [],
    form: {
      anoini_FT025: "",
      mesini_FT025: "",
      diaini_FT025: "",
      anofin_FT025: "",
      mesfin_FT025: "",
      diafin_FT025: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("6-D-6 - Listado de cartera por eps");
    $_this = this;
    $_this.FT025.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.FT025.ANO_LNK = 20 + $_this.FT025.FECHA_LNK.substring(0, 2);
    $_this.FT025.MES_LNK = $_this.FT025.FECHA_LNK.substring(2, 4);
    $_this.FT025.DIA_LNK = $_this.FT025.FECHA_LNK.substring(4, 6);
    loader("hide");
    $_this._evaluarfechaini_FT025('1')
  },
  methods: {
    _evaluarfechaini_FT025(orden) {
      this.form.anoini_FT025 = "1998"
      this.form.mesini_FT025 = "01"
      this.form.diaini_FT025 = "01"
      validarInputs(
        {
          form: "#fechaInicial_FT025",
          orden: orden
        },
        () => { _toggleNav() },
        () => {
          if (this.form.anoini_FT025.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_FT025('1');
          } else {
            if (this.form.mesini_FT025.trim() == '' || this.form.mesini_FT025 < 01 || this.form.mesini_FT025 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_FT025('2');
            } else {
              if (this.form.diaini_FT025.trim() == '' || this.form.diaini_FT025 < 01 || this.form.diaini_FT025 > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_FT025('3'), 'error', 'error');
              } else {
                this.FT025.FECHAINIW = this.form.anoini_FT025 + this.form.mesini_FT025 + this.form.diaini_FT025
                this._evaluarfechafin_FT025('1')
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_FT025(orden) {
      this.form.anofin_FT025 = this.FT025.ANO_LNK
      this.form.mesfin_FT025 = this.FT025.MES_LNK
      this.form.diafin_FT025 = this.FT025.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_FT025",
          orden: orden
        },
        () => { this._evaluarfechaini_FT025('3') },
        () => {
          if (this.form.anofin_FT025.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_FT025('1');
          } else {
            if (this.form.mesfin_FT025.trim() == '' || this.form.mesfin_FT025 < 01 || this.form.mesfin_FT025 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_FT025('2');
            } else {
              if (this.form.diafin_FT025.trim() == '' || this.form.diafin_FT025 < 01 || this.form.diafin_FT025 > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_FT025('3'), 'error', 'error');
              } else {
                this.FT025.FECHAFINW = this.form.anofin_FT025 + this.form.mesfin_FT025 + this.form.diafin_FT025
                if (this.FT025.FECHAFINW < this.FT025.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_FT025('3'), 'error', 'error');
                } else {
                  this._evaluardiasact_FT025()
                }
              }
            }
          }
        }
      )
    },
    _evaluardiasact_FT025() {
      loader("show")
      let _this = this;
      postData({ datosh: datosEnvio() + this.FT025.FECHAINIW + "|" + this.FT025.FECHAFINW + '|' + localStorage.Usuario + '|' + this.FT025.ANO_LNK + '|' }, get_url("APP/SALUD/FT025.DLL"))
        .then(data => {
          console.log(data, 'GRABADO')
          loader("hide");
          this.FT025.RUTA = data.FT025.TXT;
          this.FT025.FACTURAS = data.FT025.LISTADO;
          // this.FT025.RUTA = this.FT025.RUTA.trim()
          var nombretxt = data.FT025.TXT.padStart(26, ' ').replace('.txt', '');
          console.log(nombretxt, 'nombre')
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
              // fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, data, function (err) {
              //   if (err) return console.error(err);
              // });
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

              data = _this.FT025.FACTURAS;
              columnas = [
                {
                  title: "FACTURA",
                  value: 'FACTURA',
                },
                {
                  title: "NIT",
                  value: 'NIT',
                },
                {
                  title: "DESCRIPCION_NIT",
                  value: 'DESCRIPCION',
                },{
                  title: "TIPASEGURA",
                  value: 'TIPASEGURA',
                },
                {
                  title: "CONTRATO",
                  value: 'CONTRATO',
                },
                {
                  title: "INGRESOS",
                  value: 'INGRESOS',
                },
                {
                  title: "VALOR",
                  value: 'VALOR',
                }
              ]
              _impresion2({
                tipo: 'excel',
                header: [
                  { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
                  { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
                  { text: `${$_USUA_GLOBAL[0].DIRECC}` + 'TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },
                ],
                logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
                tabla: {
                  columnas,
                  data: data,
                },
                archivo: `DISCRIMINADOFT025_${localStorage.getItem('Usuario')}${moment().format('YYYYMMDDHHmmssS')}`,
                scale: 65,
                orientation: 'landscape'
              })
              .then(() => {
                loader("hide");
                CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                _toggleNav()
              })
              .catch(() => {
                loader("hide");
                CON851('', 'Hubo un error en la impresión', null, 'error', 'Error')
                _toggleNav()
              })
    
            }
          });
        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarfechafin_FT025('3')
        });
    },
  },
});
