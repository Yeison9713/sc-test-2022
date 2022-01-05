// 02/02/2021 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER548A",
  data: {
    SER548A: [],
    form: {
      codentidad_SER548A: "",
      descripentidad_SER548A: "",
      anoini_SER548A: "",
      mesini_SER548A: "",
      diaini_SER548A: "",
      anofin_SER548A: "",
      mesfin_SER548A: "",
      diafin_SER548A: "",
      codgrupo_SER548A: "",
      descripgrupo_SER548A: "",
      discriminar_SER548A: "",
      sucursal_SER548A: "",
      descripsuc_SER548A: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,2,I - Informe producción decreto 2193");
    $_this = this;
    $_this.SER548A.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER548A.ANO_LNK = $_this.SER548A.FECHA_LNK.substring(0, 2);
    $_this.SER548A.MES_LNK = $_this.SER548A.FECHA_LNK.substring(2, 4);
    $_this.SER548A.DIA_LNK = $_this.SER548A.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "SUCURSALES",
    },
      function (data) {
        $_this.SER548A.SUCURSAL = data.SUCURSAL;
        // $_this.SER548A.SUCURSAL.pop();
        loader("hide");
        $_this._evaluarnitentidad_SER548A()
        obtenerDatosCompletos(
          {
            nombreFd: "GRUPO-SER",
          },
          function (data) {
            $_this.SER548A.GRUPOSER = data.CODIGOS;
            $_this.SER548A.GRUPOSER.pop();
            obtenerDatosCompletos(
              {
                nombreFd: "GRUPOS",
              },
              function (data) {
                $_this.SER548A.GRUPOS = data.GRUPOS;
                $_this.SER548A.GRUPOS.pop();
              },
            );
          },
        );
      },
    );
  },
  methods: {
    _evaluarnitentidad_SER548A() {
      if (this.form.codentidad_SER548A.trim() == '') this.form.codentidad_SER548A = '99'
      validarInputs({
        form: "#VALIDAR1_SER548A",
        orden: "1"
      }, () => { _toggleNav() },
        () => {
          if (this.form.codentidad_SER548A == '99') {
            this.form.descripentidad_SER548A = 'TODOS LAS ENTIDADES'
            this._evaluarfechaini_SER548A('1')
          } else {
            this.form.codentidad_SER548A = this.form.codentidad_SER548A.padStart(10, '0');
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.codentidad_SER548A + "|",
            }, URL)
              .then(data => {
                this.SER548A.TERCEROS = data.TERCER[0];
                this.form.descripentidad_SER548A = this.SER548A.TERCEROS.DESCRIP_TER.trim()
                this._evaluarfechaini_SER548A('1')
              }).catch(error => {
                console.error(error)
                this._evaluarnitentidad_SER548A()
              });
          }
        }
      )
    },
    _evaluarfechaini_SER548A(orden) {
      this.form.anoini_SER548A = 20 + this.SER548A.ANO_LNK
      this.form.mesini_SER548A = this.SER548A.MES_LNK
      this.form.diaini_SER548A = '01'
      validarInputs(
        {
          form: "#fechaInicial_SER548A",
          orden: orden
        },
        () => { this._evaluarnitentidad_SER548A() },
        () => {
          if (this.form.anoini_SER548A.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SER548A('1');
          } else {
            if (this.form.mesini_SER548A.trim() == '' || this.form.mesini_SER548A < 01 || this.form.mesini_SER548A > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SER548A('2');
            } else {
              if (this.form.diaini_SER548A.trim() == '' || this.form.diaini_SER548A < 01 || this.form.diaini_SER548A > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SER548A('3'), 'error', 'error');
              } else {
                this.SER548A.FECHAINIW = this.form.anoini_SER548A + this.form.mesini_SER548A + this.form.diaini_SER548A
                postData({ datosh: datosEnvio() + '1|' + this.SER548A.FECHAINIW + "|" }, get_url("APP/SALUD/SER5407.DLL"))
                  .then(data => {
                    console.log(data, 'PASO 1 ')
                    this._evaluarfechafin_SER548A('1')
                  })
                  .catch(err => {
                    console.error(err)
                    this._evaluarfechaini_SER548A('1')
                  });
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SER548A(orden) {
      this.form.anofin_SER548A = 20 + this.SER548A.ANO_LNK
      this.form.mesfin_SER548A = this.SER548A.MES_LNK
      this.form.diafin_SER548A = this.SER548A.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SER548A",
          orden: orden
        },
        () => { this._evaluarfechaini_SER548A('3') },
        () => {
          if (this.form.anofin_SER548A.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SER548A('1');
          } else {
            if (this.form.mesfin_SER548A.trim() == '' || this.form.mesfin_SER548A < 01 || this.form.mesfin_SER548A > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SER548A('2');
            } else {
              if (this.form.diafin_SER548A.trim() == '' || this.form.diafin_SER548A < 01 || this.form.diafin_SER548A > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER548A('3'), 'error', 'error');
              } else {
                this.SER548A.FECHAFINW = this.form.anofin_SER548A + this.form.mesfin_SER548A + this.form.diafin_SER548A
                if (this.SER548A.FECHAFINW < this.SER548A.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SER548A('3'), 'error', 'error');
                } else {
                  this._evaluargrupo_SER548A()
                }
              }
            }
          }
        }
      )
    },
    _evaluargrupo_SER548A() {
      if (this.form.codgrupo_SER548A.trim() == '') {
        this.form.codgrupo_SER548A = '**'
      }
      validarInputs(
        {
          form: "#VALIDAR2SER548A",
          orden: '1'
        }, () => {
          this._evaluarfechafin_SER548A('3')
        },
        () => {
          if (this.form.codgrupo_SER548A == '**') {
            this.form.descripgrupo_SER548A = 'TODOS LOS GRUPOS'
            this._evaluarcodigo_SER548A();
          } else if (this.form.tipofact_SAL548 == '0') {
            const res = this.SER548A.GRUPOS.find(e => e.GRUPO == this.form.codgrupo_SER548A);
            if (res == undefined) {
              this.form.descripgrupo_SER548A = 'GRUPO NO EXISTE!'
              CON851('01', '01', this._evaluargrupo_SER548A(), 'error', 'error');
            } else {
              this.form.descripgrupo_SER548A = res.DESCRIP;
              this._evaluararticulo_sal548()
            }
          } else {
            const res = this.SER548A.GRUPOSER.find(e => e.COD == this.form.codgrupo_SER548A);
            if (res == undefined) {
              this.form.descripgrupo_SER548A = 'GRUPO NO EXISTE!'
              CON851('01', '01', this._evaluargrupo_SER548A(), 'error', 'error');
            } else {
              this.form.descripgrupo_SER548A = res.DESCRIP;
              this._evaluarcodigo_SER548A();
            }
          }
        }
      )
    },
    _evaluarcodigo_SER548A(){
      if(this.form.codgrupo_SER548A == '**'){
        if (this.form.discriminar_SER548A.trim() == '') this.form.discriminar_SER548A = 'N'
        validarInputs({
          form: "#VALIDAR3_SER548A",
          orden: "1"
        }, () => { this._evaluargrupo_SER548A(); },
          () => {
            this.form.discriminar_SER548A = this.form.discriminar_SER548A.toUpperCase();
            if (this.form.discriminar_SER548A == 'S' || this.form.discriminar_SER548A == 'N') {
              this._evaluarsucursal_SER548A()
            } else {
              CON851("03", "03", this._evaluarcodigo_SER548A(), "error", "Error");
            }
          }
        )
      }else{
        this.form.discriminar_SER548A = 'S'
        this._evaluarsucursal_SER548A()
      }
    }, 
    _evaluarsucursal_SER548A() {
      if (this.form.sucursal_SER548A.trim() == '') this.form.sucursal_SER548A = '**'
      validarInputs({
        form: "#VALIDAR4_SER548A",
        orden: "1"
      }, () => { this._evaluargrupo_SER548A() },
        () => {
          this.form.sucursal_SER548A = this.form.sucursal_SER548A.toUpperCase();
          if (this.form.sucursal_SER548A == '**') {
            this.form.descripsuc_SER548A = 'TODAS LAS SUCURSALES'
            this._evaluargrabado_SER548A()
          } else {
            const res = this.SER548A.SUCURSAL.find(e => e.CODIGO == this.form.sucursal_SER548A);
            if (res == undefined) {
              CON851("01", "01", this._evaluarsucursal_SER548A(), "error", "error");
            } else {
              this.form.descripsuc_SER548A = res.DESCRIPCION;
              this._evaluargrabado_SER548A()
            }
          }
        }
      )
    },
    _evaluargrabado_SER548A() {
      loader("show")
      postData({ datosh: datosEnvio() + this.form.codentidad_SER548A + '|' + this.SER548A.FECHAINIW + "|" + this.SER548A.FECHAFINW + '|' + this.form.codgrupo_SER548A + '|' + this.form.discriminar_SER548A + '|' + this.form.sucursal_SER548A + '|' + localStorage.Usuario + '|'}, 
      get_url("APP/SALUD/SER548A.DLL"))
        .then(data => {
          console.log(data, 'GRABADO');
          loader("hide");
          var totalcontributivo = totalsubsidiado = totalvinculado = totalotros = 0;
          for (var key of data.RESUMEN) {
            let totalfila = 0;
            let contributivo = parseInt(key.CONTRIBUTIVO);
            let subsidiado = parseInt(key.SUBSIDIADO);
            let vinculado = parseInt(key.VINCULADO);
            let otros = parseInt(key.OTROS);
            if (isNaN(contributivo)) contributivo = 0
            if (isNaN(subsidiado)) subsidiado = 0
            if (isNaN(vinculado)) vinculado = 0
            if (isNaN(otros)) otros = 0
            if (contributivo == 0) key.CONTRIBUTIVO = ''
            if (subsidiado == 0) key.SUBSIDIADO = ''
            if (vinculado == 0) key.VINCULADO = ''
            if (otros == 0) key.OTROS = ''
            totalcontributivo = totalcontributivo + contributivo;
            totalsubsidiado = totalsubsidiado + subsidiado;
            totalvinculado = totalvinculado + vinculado;
            totalotros = totalotros + otros;
            totalfila = contributivo + subsidiado + vinculado + otros;
            key.TOTAL = totalfila;
          }
          var totalgeneral = totalcontributivo + totalsubsidiado + totalvinculado + totalotros;
          data.RESUMEN.push(
              {
                'NROLINEA':'',
                'DESCRIPCION':
                'TOTAL GENERAL',
                'CONTRIBUTIVO': totalcontributivo,
                'SUBSIDIADO': totalsubsidiado,
                'VINCULADO': totalvinculado,
                'OTROS': totalotros,
                'TOTAL': totalgeneral
              }
            )
          data = data.RESUMEN
          columnas = [
            {
              title: "NRO LINEA",
              value: 'NROLINEA',
            },
            {
              title: "DESCRIPCION",
              value: 'DESCRIPCION',
            },
            {
              title: "Poblacion No Asegurada",
              value: 'VINCULADO',
            },{
              title: "Subsidiado",
              value: 'SUBSIDIADO',
            },
            {
              title: "Contributivo",
              value: 'CONTRIBUTIVO',
            },
            {
              title: "Otros",
              value: 'OTROS',
            },
            {
              title: "Total",
              value: 'TOTAL',
            },
          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
              { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
              { text: `${$_USUA_GLOBAL[0].DIRECC}` + 'TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },

            ],
            // footer:[
            //   `TOTAL FACTURA: ` + this.SER109H.VLRTOTAL,
            //   `SALDO: ` + this.SER109H.SALDO,
            // ],
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
            loader("hide");
            CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
          })
          .catch(() => {
            loader("hide");
            CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
          })
        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarsucursal_SER548A()
        });
    },

    _f8entidad_SER548A() {
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          console.log(data, 'TERCERO')
          this.form.codentidad_SER548A = data.COD.trim();
          _enterInput('.entidad_SER548A');
        },
        cancel: () => {
          // _enterInput('.entidad_SER548A');
          $_this._evaluarnitentidad_SER548A()
        }
      };
      F8LITE(parametros);
    },
    _f8grupo_SER548A() {

    },
    _f8suc_SER548A() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SUCURSALES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $_this.SER548A.SUCURSAL,
        callback_esc: function () {
          $(".Sucursal_SER548A").focus();
        },
        callback: function (data) {
          $_this.form.sucursal_SER548A = data.CODIGO.trim();
          _enterInput(".Sucursal_SER548A");
        },
      });
    }
  },
});
