// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER308",
  data: {
    SER308: [],
    form: {
      entidad_SER308: "",
      decripentidad_SER308: "",
      anolistarini_SER308: "",
      meslistarini_SER308: "",
      dialistarini_SER308: "",
      anolistarfin_SER308: "",
      meslistarfin_SER308: "",
      dialistarfin_SER308: "",
      comprobante_SER308: "",
      descripcomprob_SER308: "",
      archivo_SER308: ""

    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,3,8 - Reliquida los comprobantes de prestación de servicios");
    $_this = this;
    $_this.SER308.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER308.ANO_LNK = $_this.SER308.FECHA_LNK.substring(0, 2);
    $_this.SER308.MES_LNK = $_this.SER308.FECHA_LNK.substring(2, 4);
    $_this.SER308.DIA_LNK = $_this.SER308.FECHA_LNK.substring(4, 6);
    $_this.SER308.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SER308.ANOACTUAL = $_this.SER308.FECHAACTUAL.substring(0, 4)
    $_this.SER308.MESACTUAL = $_this.SER308.FECHAACTUAL.substring(4, 6)
    $_this.SER308.DIAACTUAL = $_this.SER308.FECHAACTUAL.substring(6, 8)
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
      $_this.SER308.SERVICIOS = [
        { 'COD': '0', 'DESCRIP': 'DROGUERIA' },
        { 'COD': '1', 'DESCRIP': 'CIRUGIAS' },
        { 'COD': '2', 'DESCRIP': 'ECOGRAFIAS' },
        { 'COD': '3', 'DESCRIP': 'RX - IMAGENOLOGIA' },
        { 'COD': '4', 'DESCRIP': 'DOPPLER' },
        { 'COD': '5', 'DESCRIP': 'T.A.C.' },
        { 'COD': '6', 'DESCRIP': 'RESONANCIA NUCLEAR' },
        { 'COD': '7', 'DESCRIP': 'PROMOCION Y PREVENCION' },
      ]
    } else {
      $_this.SER308.SERVICIOS = [
        { 'COD': '0', 'DESCRIP': 'DROGUERIA' },
        { 'COD': '1', 'DESCRIP': 'CIRUGIAS' },
        { 'COD': '2', 'DESCRIP': 'LAB. Y OTROS DIAG.' },
        { 'COD': '3', 'DESCRIP': 'RX - IMAGENOLOGIA' },
        { 'COD': '4', 'DESCRIP': 'OTROS SERVICIOS' },
        { 'COD': '5', 'DESCRIP': 'CONSULTAS Y TERAPIAS' },
        { 'COD': '6', 'DESCRIP': 'PATOLOGIA' },
        { 'COD': '7', 'DESCRIP': 'PROMOCION Y PREVENCION' },
      ]
    }
    loader("hide");
    $_this._evaluarnitentidad_SER308()
  },
  methods: {
    _evaluarnitentidad_SER308() {
      if (this.form.entidad_SER308.trim() == "") this.form.entidad_SER308 = "99";
      validarInputs(
        {
          form: "#VALIDAR1_SER308",
          orden: "1",
        },
        _toggleNav,
        () => {
          if (this.form.entidad_SER308 == "99") {
            this.form.decripentidad_SER308 = "PROCESO TOTAL";
            $_this._evaluarfechaini_SER308("1")
          } else {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.entidad_SER308 + "|",
            }, URL)
              .then(data => {
                this.SER308.TERCERO = data.TERCER[0]
                this.form.decripentidad_SER308 = this.SER308.TERCERO.DESCRIP_TER
                $_this._evaluarfechaini_SER308("1")
              }).catch(error => {
                console.error(error)
                this._evaluarnitentidad_SER308()
              });
          }
        },
      );
    },

    _evaluarfechaini_SER308(orden) {

      if (this.form.meslistarini_SER308.trim() == '') {
        this.form.anolistarini_SER308 = this.SER308.ANOACTUAL
        this.form.meslistarini_SER308 = this.SER308.MESACTUAL
        this.form.dialistarini_SER308 = this.SER308.DIAACTUAL
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SER308",
          orden: orden,
        },
        this._evaluarnitentidad_SER308,
        () => {
          if (this.form.anolistarini_SER308 == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SER308("1"), "error", "error");
          } else {
            this.form.meslistarini_SER308 = this.form.meslistarini_SER308.padStart(2, "0");
            if (this.form.meslistarini_SER308.trim() == "" || this.form.meslistarini_SER308 == '00' || this.form.meslistarini_SER308 < 1 || this.form.meslistarini_SER308 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER308("2"), "error", "error");
            } else {
              this.form.dialistarini_SER308 = this.form.dialistarini_SER308.padStart(2, "0");
              if (this.form.dialistarini_SER308.trim() == "" || this.form.dialistarini_SER308 == '00' || this.form.dialistarini_SER308 < 1 || this.form.dialistarini_SER308 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SER308("3"), "error", "error");
              } else {
                this.SER308.FECHABUSQ = this.form.anolistarini_SER308 + this.form.meslistarini_SER308 + this.form.dialistarini_SER308
                postData({ datosh: datosEnvio() + '1|' + this.SER308.FECHABUSQ }, get_url("APP/SALUD/SER-A0C.DLL"))
                  .then(data => {
                    this._evaluarfechafin_SER308('1')
                  })
                  .catch(err => {
                    this._evaluarfechaini_SER308("1")
                  });

              }
            }
          }
        },
      );
    },
    _evaluarfechafin_SER308(orden) {
      if (this.form.anolistarfin_SER308.trim() == '') {
        this.form.anolistarfin_SER308 = this.SER308.ANOACTUAL
        this.form.meslistarfin_SER308 = this.SER308.MESACTUAL
        this.form.dialistarfin_SER308 = this.SER308.DIA_LNK
      }
      validarInputs(
        {
          form: "#fechalistarFinal_SER308",
          orden: orden,
        },
        () => { this._evaluarfechaini_SER308('3') },
        () => {
          if (this.form.anolistarfin_SER308.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SER308("1"), "error", "error");
          } else {
            this.form.meslistarfin_SER308 = this.form.meslistarfin_SER308.padStart(2, "0")
            if (this.form.meslistarfin_SER308.trim() == "" || this.form.meslistarfin_SER308 == '00' || this.form.meslistarfin_SER308 < 1 || this.form.meslistarfin_SER308 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SER308("2"), "error", "error");
            } else {
              this.form.dialistarfin_SER308 = this.form.dialistarfin_SER308.padStart(2, "0")
              if (this.form.dialistarfin_SER308.trim() == "" || this.form.dialistarfin_SER308 == '00' || this.form.dialistarfin_SER308 < 1 || this.form.dialistarfin_SER308 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SER308("3"), "error", "error");
              } else {
                this.SER308.FECHAFIN = this.form.anolistarfin_SER308 + this.form.meslistarfin_SER308 + this.form.dialistarfin_SER308
                this._evaluartipocomprobante_SER308()
              }
            }
          }
        },
      );
    },
    _evaluartipocomprobante_SER308() {
      console.log(this.form.comprobante_SER308, 'VACIO')
      validarInputs({
        form: '#VALIDAR2_SER308',
        orden: "1"
      },
        () => { this._evaluarfechafin_SER308("3") },
        () => {
          console.log(this.form.comprobante_SER308)
          if (this.form.comprobante_SER308 == '*') {
            console.log(this.form.comprobante_SER308, '1')
            this.form.descripcomprob_SER308 = 'TODOS LOS TIPOS'
            this._evaluararchivoprocesar_SER308()
          } else if (parseInt(this.form.comprobante_SER308) >= 0 && parseInt(this.form.comprobante_SER308) < 8) {
            if (this.SER308.SERVICIOS[this.form.comprobante_SER308]) {
              this.form.descripcomprob_SER308 = this.SER308.SERVICIOS[this.form.comprobante_SER308].DESCRIP;
              this._evaluararchivoprocesar_SER308()
            } else {
              CON851('', 'Revise el tipo de comprobante', this._evaluartipocomprobante_SER308(), 'error', 'Error');
            }
          } else {
            console.log(this.form.comprobante_SER308, '3')
            CON851('03', '03', this._evaluartipocomprobante_SER308(), 'error', 'error');
          }
        }
      )
    },
    _evaluararchivoprocesar_SER308() {
      var archivo = [
        { COD: "1", DESCRIP: "Comprob prest. servicios" },
        { COD: "2", DESCRIP: "Comprob autorizacion" },
      ];
      POPUP(
        {
          array: archivo,
          titulo: "ARCHIVO A PROCESAR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          callback_f: () => {
            setTimeout(this._evaluartipocomprobante_SER308, 300)
          },
        },
        fechabase => {
          this.form.archivo_SER308 = fechabase.COD + " - " + fechabase.DESCRIP;
          this._validardll_SER308()
        },
      );
    },
    _validardll_SER308() {
      postData({ datosh: `${datosEnvio()}${this.form.anolistarini_SER308}${this.form.meslistarini_SER308}${this.form.meslistarini_SER308}|${this.form.entidad_SER308.trim().padStart(10, '0')}|${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}|${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}|${localStorage.Usuario}|${this.form.archivo_SER308.substring(0, 1)}|` },
        get_url("APP/SALUD/SER612DA.DLL"))
        .then(data => {
          console.log(data);
          CON851('', 'Grabado Correctamente', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err);
          this._evaluartipocomprobante_SER308();
        })


    },
    _f8entidad_SER308() {
      $_this = this
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          $_this.form.entidad_SER308 = data.COD.trim();
          _enterInput('.entidad_SER308');
        },
        cancel: () => {
          _enterInput('.entidad_SER308');
        }
      };
      F8LITE(parametros);
    },
    _f8tipocomprob_SER308() {
      var $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER308.SERVICIOS,
        callback_esc: function () {
          $(".tipocomprob_SER308").focus();
        },
        callback: function (data) {
          $_this.form.comprobante_SER308 = data.COD
          _enterInput('.tipocomprob_SER308');
        }
      });
    }

  },
});
