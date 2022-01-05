// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA01",
  data: {
    SERA01: [],
    form: {
      novedad_SERA01: "",
      clase_SERA01: "",
      codmotglosa_SERA01: "",
      descripmotivo_SERA01: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,1,1 - Actualizar conceptos glosas");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;
    obtenerDatosCompletos({
      nombreFd: "MOTIVOSGLOSA",
    },
      function (data) {
        $_this.SERA01.MOTIVOS = data.MOTIVOS;
        $_this.SERA01.MOTIVOS.pop();
        console.log($_this.SERA01.MOTIVOS, 'MOTIVOS')
        loader("hide");
        CON850($_this._validarnovedad_SERA01);
      },
    );
  },
  methods: {
    _validarnovedad_SERA01(novedad) {
      console.log(novedad, 'OPCIONES')
      this.form.novedad_SERA01 = novedad.id;
      if (this.form.novedad_SERA01 == "F") {
        _toggleNav();
      } else {
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.form.novedad_SERA01 = this.form.novedad_SERA01 + " - " + novedad[this.form.novedad_SERA01];
        this._validarclases_SERA01();
      }
    },
    _validarclases_SERA01(){
      var clasemot = [
        { COD: "1", DESCRIP: "Facturación" },
        { COD: "2", DESCRIP: "Tarifas" },
        { COD: "3", DESCRIP: "Soportes" },
        { COD: "4", DESCRIP: "Autorización" },
        { COD: "5", DESCRIP: "Cobertura" },
        { COD: "6", DESCRIP: "Pertinencia medica" },
        { COD: "8", DESCRIP: "Devolución" },
        { COD: "9", DESCRIP: "Repuesta a glosa" },
      ];
      POPUP(
        {
          array: clasemot,
          titulo: "CLASE DE GLOSAS",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          callback_f: () => {
            setTimeout(CON850(this._validarnovedad_SERA01), 300)
            // CON850(this._validarnovedad_SERA01);
          },
        },
        clasemot => {
          this.form.clase_SERA01 = clasemot.COD + " - " + clasemot.DESCRIP;
          this._evaluarcodmotivos_SERA01()
        },
      );

    }, 
    _evaluarcodmotivos_SERA01() {
      validarInputs({
        form: "#VALIDAR2_SERA01",
        orden: "1"
      }, () => {
        setTimeout(this._validarclases_SERA01, 300)
      },
        () => {
          if (this.form.codmotglosa_SERA01.trim() == '') {
            CON851("03", "03", this._evaluarcodmotivos_SERA01(), "error", "Error");
          } else {
            let res = this.SERA01.MOTIVOS.find(e => e.CUENTA == this.form.clase_SERA01.substring(0,1) + this.form.codmotglosa_SERA01);
            if (res == undefined) {
              if (this.form.novedad_SERA01.substring(0, 1) == '7') {
                this._evaluardescripmotivos_SERA01()
              } else if (this.form.novedad_SERA01.substring(0, 1) == '8') {
                CON851("01", "01", this._evaluarcodmotivos_SERA01(), "error", "Error");
              } else {
                CON851("01", "01", this._evaluarcodmotivos_SERA01(), "error", "Error");
              }
            } else {
              if (this.form.novedad_SERA01.substring(0, 1) == '7') {
                CON851("00", "00", this._evaluarcodmotivos_SERA01(), "error", "Error");
              } else if (this.form.novedad_SERA01.substring(0, 1) == '8') {
                this.form.descripmotivo_SERA01 = res.NOMBRE.trim();
                this._evaluardescripmotivos_SERA01()
              } else {
                this.form.descripmotivo_SERA01 = res.NOMBRE.trim();
                CON851P('54', this._evaluarcodmotivos_SERA01, this._evaluargrabar_SERA01)
              }
            }
          }
        }
      )
    },
    _evaluardescripmotivos_SERA01() {
      validarInputs({
        form: "#VALIDAR3_SERA01",
        orden: "1"
      }, () => { this._evaluarcodmotivos_SERA01(); },
        () => {
          if (this.form.descripmotivo_SERA01.trim() == '') {
            CON851("02", "02", this._evaluardescripmotivos_SERA01(), "error", "Error");
          } else {
            CON851P('01', this._evaluarcodmotivos_SERA01, this._evaluargrabar_SERA01)
          }
        }
      )
    },
    _evaluargrabar_SERA01() {
      console.log(this.form.novedad_SERA01, 'NOVEDAD PRA GRABAR')
      postData({ datosh: datosEnvio() + this.form.clase_SERA01.substring(0,1) + this.form.codmotglosa_SERA01 + "|" + this.form.descripmotivo_SERA01 + '|' + this.form.novedad_SERA01.substring(0,1) + '|' }, get_url("APP/SALUD/SER-A01.DLL"))
        .then(data => {
          CON851('','Proceso terminado',_toggleNav(),'success','Exito');
        })
        .catch(err => {
          this._validarcodetnias_SERA01()
        });
    },


    _f8motivoglosas_SERA01() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE MOTIVOS DE GLOSA',
        columnas: ["CUENTA", "NOMBRE"],
        data: $_this.SERA01.MOTIVOS,
        callback_esc: function () {
          $(".motivoglosas_SERA01").focus();
        },
        callback: function (data) {
          if(data.CUENTA.substring(0,1) !=  $_this.form.clase_SERA01){
            let clase = { '1': 'Facturación', '2': 'Tarifas', '3': 'Soportes', '4': 'Autorización', '5': 'Cobertura', '6': 'Pertinencia medica', '8': 'Devolución', '9': 'Repuesta a glosa' };
            $_this.form.clase_SERA01 = data.CUENTA.trim().substring(0,1) + ' - ' + clase[data.CUENTA.trim().substring(0,1)];
          }
          $_this.form.codmotglosa_SERA01 = data.CUENTA.trim().substring(1,3);
          _enterInput(".motivoglosas_SERA01");
        }
      });
    },
  },
});
