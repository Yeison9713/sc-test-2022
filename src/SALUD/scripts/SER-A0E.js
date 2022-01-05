//  27/10/2020 - DIANA ESCOBAR: CREADO 

new Vue({
  el: "#SERA0E",
  data: {
    SERA0E: [],
    form: {
      prefijo_SERA0E: '',
      factura_SERA0E: '',
      entidad_SERA0E: '',
      decripentidad_SERA0E: '',
      totalfact_SERA0E: '',
      totalglosa_SERA0E: '',
      totalsoport_SERA0E: '',
      totalaceptado_SERA0E: '',
    },
    tablaconsultafact_SERA0E: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,E - Consulta glosas por factura");
    $_this = this;
    $_this.SERA0E.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA0E.ANO_LNK = "20" + $_this.SERA0E.FECHA_LNK.substring(0, 2);
    $_this.SERA0E.MES_LNK = $_this.SERA0E.FECHA_LNK.substring(2, 4);
    $_this.SERA0E.DIA_LNK = $_this.SERA0E.FECHA_LNK.substring(4, 6);
    $_this.SERA0E.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SERA0E.ANOACTUALW = $_this.SERA0E.FECHAACTUAL.substring(0, 4);
    $_this.SERA0E.MESACTUALW = $_this.SERA0E.FECHAACTUAL.substring(4, 6);
    $_this.SERA0E.DIAACTUALW = $_this.SERA0E.FECHAACTUAL.substring(6, 8);
    loader("hide");
    $_this._validarprefijo_SERA0E();
  },
  methods: {
    _validarprefijo_SERA0E() {
      validarInputs(
        {
          form: "#validarprefijo_SERA0E",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.form.prefijo_SERA0E = this.form.prefijo_SERA0E.toUpperCase();
          if (this.form.prefijo_SERA0E == "A" || this.form.prefijo_SERA0E == "P" || this.form.prefijo_SERA0E == "T" || this.form.prefijo_SERA0E == "B" ||
            this.form.prefijo_SERA0E == "D" || this.form.prefijo_SERA0E == "F" || this.form.prefijo_SERA0E == "G" || this.form.prefijo_SERA0E == "H" ||
            this.form.prefijo_SERA0E == "I" || this.form.prefijo_SERA0E == "J" || this.form.prefijo_SERA0E == "K" || this.form.prefijo_SERA0E == "L" ||
            this.form.prefijo_SERA0E == "M" || this.form.prefijo_SERA0E == "N" || this.form.prefijo_SERA0E == "O" || this.form.prefijo_SERA0E == "Q" ||
            this.form.prefijo_SERA0E == "R" || this.form.prefijo_SERA0E == "S" || this.form.prefijo_SERA0E == "V" || this.form.prefijo_SERA0E == "W" ||
            this.form.prefijo_SERA0E == "X" || this.form.prefijo_SERA0E == "Y" || this.form.prefijo_SERA0E == "Z") {
            this._evaluarnumerofact_SERA0E()
          } else {
            CON851("", "Prefijo incorrecto! ", null, "error", "error");
            this._validarprefijo_SERA0E();
          }
        },
      );
    },
    _evaluarnumerofact_SERA0E() {
      validarInputs(
        {
          form: "#validarfact_SERA0E",
          orden: "1",
        },
        this._validarprefijo_SERA0E,
        () => {
          if (this.form.factura_SERA0E.trim() == "") {
            CON851("02", "02", this._evaluarnrofact_SERA0E(), "error", "error");
          } else {
            postData({ datosh: datosEnvio() + this.form.prefijo_SERA0E.trim() + this.form.factura_SERA0E.padStart(6, '0') + "|" }, get_url("APP/SALUD/SER-A0E.DLL"))
              .then(data => {
                this.tablaconsultafact_SERA0E = []
                console.log(data, 'NUMERACION')
                this.SERA0E.FACTURA = data.GLOSAFACT[0];
                this.form.entidad_SERA0E = this.SERA0E.FACTURA.NITFACT;
                this.form.decripentidad_SERA0E = this.SERA0E.FACTURA.DESCRIPNIT;
                this.form.totalfact_SERA0E = valores_SERA0E(this.SERA0E.FACTURA.VLRFACT)
                this.form.totalglosa_SERA0E = this.SERA0E.FACTURA.VLRGLOSA
                this.form.totalsoport_SERA0E = this.SERA0E.FACTURA.VLRRESP
                this.form.totalaceptado_SERA0E = this.SERA0E.FACTURA.VLRACEP
                this.tablaconsultafact_SERA0E.push({
                  GLOSA: this.SERA0E.FACTURA.GLOSA,
                  FECHAGLOSA: this.SERA0E.FACTURA.FECHAGLOSA,
                  VLRGLOSA: this.SERA0E.FACTURA.VLRGLOSA,
                  VLRSOPORT: this.SERA0E.FACTURA.VLRRESP,
                  FACTURA: this.SERA0E.FACTURA.VLRACEP,
                });
                this._evaluarnumerofact_SERA0E()
                
              })
              .catch(err => {
                console.error(err);
                this.form.entidad_SERA0E = ''
                this.form.decripentidad_SERA0E= ''
                this.form.totalfact_SERA0E= ''
                this.form.totalglosa_SERA0E= ''
                this.form.totalsoport_SERA0E= ''
                this.form.totalaceptado_SERA0E= ''
                this.tablaconsultafact_SERA0E = []
                this._evaluarnumerofact_SERA0E()
              });
          }
        },
      );
    }, 
    _f8numeracion_SERA0E() {
      var $_this = this;
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_this.form.factura_SERA0E = data.COD.substring(1, 7);
          _enterInput('.numeracion_SERA0E');
        },
        cancel: () => {
          _enterInput('.numeracion_SERA0E');
        }
      };
      F8LITE(parametros);
    }

  },
});

var valores_SERA0E = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: '.',
  thousandsSeparator: ',',
  normalizeZeros: true,
  padFractionalZeros: true,
});



