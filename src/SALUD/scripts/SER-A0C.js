// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA0C",
  data: {
    SERA0C: [],
    form: {
      anolistarini_SERA0C: "",
      meslistarini_SERA0C: "",
      dialistarini_SERA0C: "",
      anolistarfin_SERA0C: "",
      meslistarfin_SERA0C: "",
      dialistarfin_SERA0C: "",
      operador_SERA0C: "",
      decripoperador_SERA0C: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,C - Informe general de glosas");
    $_this = this;
    $_this.SERA0C.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA0C.ANO_LNK = $_this.SERA0C.FECHA_LNK.substring(0, 2);
    $_this.SERA0C.MES_LNK = $_this.SERA0C.FECHA_LNK.substring(2, 4);
    $_this.SERA0C.DIA_LNK = $_this.SERA0C.FECHA_LNK.substring(4, 6);

    obtenerDatosCompletos({
      nombreFd: "OPERADOR",
    },
      function (data) {
        $_this.SERA0C.OPERADOR = data.ARCHREST;
        $_this.SERA0C.OPERADOR.pop();
        loader("hide");
        $_this._evaluarfechaini_SERA0C("1")
      },
    );
  },
  methods: {

    _evaluarfechaini_SERA0C(orden) {

      if (this.form.meslistarini_SERA0C.trim() == '') {
        this.form.anolistarini_SERA0C = 1998 + parseInt(this.SERA0C.ANO_LNK) 
        this.form.meslistarini_SERA0C = '01'
        this.form.dialistarini_SERA0C = '01'
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SERA0C",
          orden: orden,
        },_toggleNav,
        () => {
          if (this.form.anolistarini_SERA0C == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SERA0C("1"), "error", "error");
          } else {
            this.form.meslistarini_SERA0C = this.form.meslistarini_SERA0C.padStart(2, "0");
            if (this.form.meslistarini_SERA0C.trim() == "" || this.form.meslistarini_SERA0C == '00' || this.form.meslistarini_SERA0C < 1 || this.form.meslistarini_SERA0C > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SERA0C("2"), "error", "error");
            } else {
              this.form.dialistarini_SERA0C = this.form.dialistarini_SERA0C.padStart(2, "0");
              if (this.form.dialistarini_SERA0C.trim() == "" || this.form.dialistarini_SERA0C == '00' || this.form.dialistarini_SERA0C < 1 || this.form.dialistarini_SERA0C > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SERA0C("3"), "error", "error");
              } else {
                this.SERA0C.FECHABUSQ = this.form.anolistarini_SERA0C + this.form.meslistarini_SERA0C + this.form.dialistarini_SERA0C
                postData({ datosh: datosEnvio() + '1|' + this.SERA0C.FECHABUSQ }, get_url("APP/SALUD/SER-A0C.DLL"))
                  .then(data => {
                    this._evaluarfechafin_SERA0C('1')
                    })
                    .catch(err => {
                      this._evaluarfechaini_SERA0C("1")
                    });

              }
            }
          }
        },
      );
    },
    _evaluarfechafin_SERA0C(orden) {
      if (this.form.anolistarfin_SERA0C.trim() == '') {
        this.form.anolistarfin_SERA0C = 20 + this.SERA0C.ANO_LNK
        this.form.meslistarfin_SERA0C = this.SERA0C.MES_LNK
        this.form.dialistarfin_SERA0C = this.SERA0C.DIA_LNK
      }
      validarInputs(
        {
          form: "#fechalistarFinal_SERA0C",
          orden: orden,
        },
        () => { this._evaluarfechaini_SERA0C('3') },
        () => {
          if (this.form.anolistarfin_SERA0C.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SERA0C("1"), "error", "error");
          } else {
            this.form.meslistarfin_SERA0C = this.form.meslistarfin_SERA0C.padStart(2, "0")
            if (this.form.meslistarfin_SERA0C.trim() == "" || this.form.meslistarfin_SERA0C == '00' || this.form.meslistarfin_SERA0C < 1 || this.form.meslistarfin_SERA0C > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SERA0C("2"), "error", "error");
            } else {
              this.form.dialistarfin_SERA0C = this.form.dialistarfin_SERA0C.padStart(2, "0")
              if (this.form.dialistarfin_SERA0C.trim() == "" || this.form.dialistarfin_SERA0C == '00' || this.form.dialistarfin_SERA0C < 1 || this.form.dialistarfin_SERA0C > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SERA0C("3"), "error", "error");
              } else {
                this.SERA0C.FECHAFIN = this.form.anolistarfin_SERA0C + this.form.meslistarfin_SERA0C + this.form.dialistarfin_SERA0C
                this._evaluaroperador_SERA0C()
              }
            }
          }
        },
      );
    },
    _evaluaroperador_SERA0C() {
      if (this.form.operador_SERA0C.trim() == '') {
        this.form.operador_SERA0C = '****'
      }
      validarInputs(
        {
          form: "#validaroperador_SERA0C",
          orden: '1'
        }, this._evaluarembarazo_SERA0C,
        () => {
          if (this.form.operador_SERA0C == '****') {
            this.form.decripoperador_SERA0C = 'TODOS LOS OPERADORES'
            this._evaluarlistado_SERA0C();
          } else {
            let datos_envio = datosEnvio() + localStorage.Usuario + '|';
            SolicitarDll({ datosh: datos_envio }, dato => {
              var date = dato.split("|");
              this.form.decripoperador_SERA0C = date[0];
              this._evaluarlistado_SERA0C();
            }, get_url('APP/CONTAB/CON003.DLL'));
          }
        }
      )
    },
    _evaluarlistado_SERA0C() {
      loader("show");
      this.SERA0C.FECHAACTUAL = moment().format('YYYYMMDD');
      postData({ datosh: datosEnvio() +'2|' + this.SERA0C.FECHABUSQ + "|" + this.SERA0C.FECHAFIN + '|' + this.form.operador_SERA0C + '|' }, get_url("APP/SALUD/SER-A0C.DLL"))
        .then(data => {
          loader("hide");
          data = data.GLOSAS
          data.pop()
          columnas = [
            {
              title: "NRO GLOSA",
              value: 'GLOSA',
            },
            {
              title: "FACTURA",
              value: 'FACTURA',
            },
            {
              title: "NIT",
              value: 'NIT',
            },
            {
              title: "ENTIDAD",
              value: 'DESCRIPNIT',
            },
            {
              title: "EST",
              value: 'ESTADO',
            },
            {
              title: "VLR FACTURA",
              value: 'VLR_FACTURA',
              format: 'money'
            },
            {
              title: "VLR GLOSA",
              value: 'VLR_GLOSA',
              format: 'money'
            },
            {
              title: "VLR SOPORTADO",
              value: 'VLR_SOPORT',
              format: 'money'
            },
            {
              title: "2 VLR ACEPTADO",
              value: 'VLR_ACEP2',
              format: 'money'
            },
            {
              title: "4 VLR ACEPTADO",
              value: 'VLR_ACEP4',
              format: 'money'
            },
            {
              title: "5 VLR ACEPTADO",
              value: 'VLR_ACEP5',
              format: 'money'
            },
            {
              title: "VLR LEVANTADO",
              value: 'VLR_LEVAN',
              format: 'money'
            },
            {
              title: "TOTAL ACEPTADO",
              value: 'VLR_ACEP',
              format: 'money'
            },
            {
              title: "PEND. RESPOND",
              value: 'VLR_PEND',
              format: 'money'
            },
            {
              title: "ABONOS",
              value: 'ABONOS',
              format: 'money'
            },
            {
              title: "SALDO FACT",
              value: 'NETO',
              format: 'money'
            },
            {
              title: "FECHA ULT ABONO",
              value: 'FECHA_ABONO',
              format: "fecha"
            },
            {
              title: "CREA",
              value: 'OPER_CRE',
            },
            {
              title: "FECHA CREA",
              value: 'FECHA_CRE',
              format: "fecha"
            },
            {
              title: "MODIF",
              value: 'OPER_MOD',
            },
            {
              title: "FECHA MODIF",
              value: 'FECHA_MOD',
              format: "fecha"
            },
            {
              title: "FECHA FACT",
              value: 'FECHA_ING',
              format: "fecha"
            },
            {
              title: "FECHA CIERRE",
              value: 'FECHA_RET',
              format: "fecha"
            },
            {
              title: "FECHA RADIC",
              value: 'FECHA_PRE',
              format: "fecha"
            },
            {
              title: "ACTIVIDAD",
              value: 'ACTIVIDAD',
            },
            {
              title: "COD MOT GLOSA",
              value: 'MOTIVO_GLO',
            },
            {
              title: "DESCRIP MOTIV GLOSA",
              value: 'DESCRIP_MOT',
            }
          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}` + 'INFORME GENERAL DE GLOSAS ' + 'HASTA: ' + this.SERA0C.FECHAFIN + ' IMPRESO: ' +  this.SERA0C.FECHAACTUAL, bold: true, size: 14 },
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
        .catch(err => {
         console.error(err);
         CON851("", "Error en la impresión", _toggleNav, "error", "error");
        });
    },

    _f8operador_SERA0C() {
      var $_this = this;
      _ventanaDatos({
        titulo: "GRUPOS DE OPERADORES",
        columnas: ["CODIGO", "DESCRIPCION", "ID"],
        data: $_this.SERA0C.OPERADOR,
        callback_esc: function () {
          $(".operador_SERA0C").focus();
        },
        callback: function (data) {
          $_this.form.operador_SERA0C = data.CODIGO.trim();
          _enterInput(".operador_SERA0C");
        },
      });
    },


  },
});
