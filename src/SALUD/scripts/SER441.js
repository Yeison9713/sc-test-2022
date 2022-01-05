// 30/12/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER441",
  data: {
    SER441: [],
    form: {
      anoini_SER441: "",
      mesini_SER441: "",
      anofin_SER441: "",
      mesfin_SER441: "",
      nit_SER441: "",
      nitdescrip_SER441: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,7,4,1 - Listado control de envios");
    $_this = this;
    $_this.SER441.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER441.ANO_LNK = 20 + $_this.SER441.FECHA_LNK.substring(0, 2);
    $_this.SER441.MES_LNK = $_this.SER441.FECHA_LNK.substring(2, 4);
    $_this.SER441.DIA_LNK = $_this.SER441.FECHA_LNK.substring(4, 6);
    loader("hide");
    $_this._validarfechaini_SER441("1")
  },
  methods: {
    _validarfechaini_SER441(orden) {
      if (this.form.mesini_SER441.trim() == '') {
        this.form.anoini_SER441 = this.SER441.ANO_LNK
        this.form.mesini_SER441 = this.SER441.MES_LNK
      }
      validarInputs({
        form: "#FECHAINICIO_SER441",
        orden: orden
      }, () => { _toggleNav() },
        () => {
          this.form.anoini_SER441 = this.form.anoini_SER441.toString()
          if (this.form.anoini_SER441.trim() == '') {
            CON851("", "Año incorrecto! ", this._validarfechaini_SER441("1"), "error", "error");
          } else {
            this.form.mesini_SER441 = this.form.mesini_SER441.toString().padStart(2, "0")
            if (this.form.mesini_SER441.trim() == "" || this.form.mesini_SER441 < 1 || this.form.mesini_SER441 > 12) {
              CON851("", "Mes incorrecto! ", this._validarfechaini_SER441("2"), "error", "error");
            } else {
              this.SER441.FECHAINIW = this.form.anoini_SER441 + this.form.mesini_SER441
              this._evaluarfechafin_SER441("1")
            }
          }

        }
      )
    },
    _evaluarfechafin_SER441(orden) {
      if (this.form.mesfin_SER441.trim() == '') {
        this.form.anofin_SER441 = this.SER441.ANO_LNK
        this.form.mesfin_SER441 = this.SER441.MES_LNK
      }
      validarInputs({
        form: "#FECHAFIN_SER441",
        orden: orden
      }, () => { this._validarfechaini_SER441("2") },
        () => {
          this.form.mesfin_SER441 = this.form.mesfin_SER441.toString()
          if (this.form.mesfin_SER441.trim() == '') {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SER441("1"), "error", "error");
          } else {
            this.form.mesfin_SER441 = this.form.mesfin_SER441.toString().padStart(2, "0")
            if (this.form.mesfin_SER441.trim() == "" || this.form.mesfin_SER441 < 1 || this.form.mesfin_SER441 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SER441("2"), "error", "error");
            } else {
              this.SER441.FECHAFINW = this.form.anofin_SER441 + this.form.mesfin_SER441
              if(this.SER441.FECHAFINW < this.SER441.FECHAINIW){
                CON851("37", "37", this._evaluarfechafin_SER441("2"), "error", "error");
              }else{
                this._evaluarnit_SER441()
              }
            }
          }

        }
      )
    },
    _evaluarnit_SER441() {
      if(this.form.nit_SER441.trim() == "") this.form.nit_SER441 = "99"
      validarInputs(
        {
          form: "#NIT_SER441",
          orden: '1',
        },
        () => { CON850(this._validarnovedad_SER613G) },
        () => {
          if (this.form.nit_SER441.toString().trim() == "") {
            CON851("01", "01", this._evaluarnit_SER441(), "error", "error");
          } else {
            if(this.form.nit_SER441 == "99"){
              this.form.nitdescrip_SER441 = "PROCESO TOTAL"
              this._evaluardll_SER441()
            }else{
              this.SER441.CODTERCERO = this.form.nit_SER441.toString().padStart(10, "0")
              let URL = get_url("APP/CONTAB/CON802_01.DLL");
              postData({
                datosh: datosEnvio() + this.SER441.CODTERCERO + "|",
              }, URL)
                .then(data => {
                  this.SER441.TERCEROS = data.TERCER[0];
                  this.form.nitdescrip_SER441 = this.SER441.TERCEROS.DESCRIP_TER.trim()
                  this._evaluardll_SER441()
                
                }).catch(error => {
                  console.error(error)
                  this._evaluarnit_SER441()
                });
            }
          }
        }
      )
    },
    _evaluardll_SER441(){
      CON851P('00', this._evaluarnit_SER441, this._evaluarlistado_SER441)
    },
    _evaluarlistado_SER441() {
      let URL = get_url("APP/" + "SALUD/SER441" + ".DLL");
      postData({
        datosh: datosEnvio() + "2|" + this.SER441.FECHAINIW + "|" +  this.SER441.FECHAFINW + "|" + this.form.nit_SER441 + "|"
      }, URL)
        .then((data) => {
          data = data.LSTADOENVIOS
          data.pop()
          columnas = [
            {
              title: "ENVIO",
              value: 'NRO',
            },
            {
              title: "PERIODO",
              value: 'PER',
            },
            {
              title: "FECHA ENV",
              value: 'FECHA',
            },
            {
              title: "CODIGO",
              value: 'NIT',
            },
            {
              title: "ENTIDAD",
              value: 'DESCRIPCION_TERCERO',
            },
            {
              title: "OBSERVACION",
              value: 'OBSERVACION',
            },
            {
              title: "VALOR TOTAL",
              value: 'VALOR',
            },
            {
              title: "OPER",
              value: 'OPER',
            },
            {
              title: "CORR",
              value: 'CORRE',
            },
          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
              `RELACION DE ENVIOS DESDE: `  + this.SER441.FECHAINIW + 'HASTA: ' + this.SER441.FECHAFINW,
              `FECHA DE LA IMPRESION: `+ moment().format('YYYY/MM/DD'),
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
        .catch((error) => {
          console.log(error)
          CON851("", "Error en la impresión", _toggleNav, "error", "error");
        });
    },
    _f8terceros_SER441() {
      $_this = this
      parametros = {
          dll: 'TERCEROS',
          valoresselect: ['Buscar por nombre tercero'],
          f8data: 'TERCEROS',
          columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
          callback: (data) => {
              $_this.form.nit_SER441 = data.COD.trim();
              _enterInput('.nit_SER441');
          },
          cancel: () => {
              _enterInput('.nit_SER441');
          }
      };
      F8LITE(parametros);
    }
  },
})
