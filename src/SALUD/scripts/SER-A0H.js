// 27/07/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA0H",
  data: {
    SERA0H: [],
    form: {
      anoglosa_SERA0H: "",
      nroglosa_SERA0H: "",
      factura_SERA0H: "",
      cliente_SERA0H: "",
      estado_SERA0H: "",
      radicado_SERA0H: "",
      anorad_SERA0H: "",
      mesrad_SERA0H: "",
      diarad_SERA0H: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,H - Radicacion de glosas");
    $_this = this;
    $_this.SERA0H.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA0H.ANO_LNK = 20 + $_this.SERA0H.FECHA_LNK.substring(0, 2);
    $_this.SERA0H.MES_LNK = $_this.SERA0H.FECHA_LNK.substring(2, 4);
    $_this.SERA0H.DIA_LNK = $_this.SERA0H.FECHA_LNK.substring(4, 6);
    $_this.SERA0H.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SERA0H.ANOACTUALW = $_this.SERA0H.FECHAACTUAL.substring(0, 4);
    $_this.SERA0H.MESACTUALW = $_this.SERA0H.FECHAACTUAL.substring(4, 6);
    $_this.SERA0H.DIAACTUALW = $_this.SERA0H.FECHAACTUAL.substring(6, 8);
    loader("hide");
    $_this._evaluaranoglosa_SERA0H()
  },
  methods: {
    _evaluaranoglosa_SERA0H() {
      this.form.anoglosa_SERA0H = ""
      this.form.nroglosa_SERA0H = ""
      this.form.factura_SERA0H = ""
      this.form.cliente_SERA0H = ""
      this.form.estado_SERA0H = ""
      this.form.radicado_SERA0H = ""
      this.form.anorad_SERA0H = ""
      this.form.mesrad_SERA0H = ""
      this.form.diarad_SERA0H = ""
      if (this.form.anoglosa_SERA0H.trim() == '') this.form.anoglosa_SERA0H = this.SERA0H.ANO_LNK
      validarInputs(
        {
          form: "#VALIDAR0_SERA0H",
          orden: '1',
        }, _toggleNav,
        () => {
          if (this.form.anoglosa_SERA0H.trim() == '' || this.form.anoglosa_SERA0H > this.SERA0H.ANO_LNK) {
            CON851('03', '03', this._evaluaranoglosa_SERA0H(), 'error', 'error');
          } else {
            this._evaluarnroglosa_SERA0H()
          }
        }
      )
    },
    _evaluarnroglosa_SERA0H() {
      validarInputs(
        {
          form: "#VALIDAR1_SERA0H",
          orden: '1'
        }, this._evaluaranoglosa_SERA0H,
        () => {
          this.form.nroglosa_SERA0H = this.form.nroglosa_SERA0H.padStart(6, "0")
          if (this.form.nroglosa_SERA0H == 0) {
            this._evaluarnroglosa_SERA0H()
          } else {
            postData({ datosh: datosEnvio() + "1|" + this.form.anoglosa_SERA0H + this.form.nroglosa_SERA0H + "|" }, get_url("APP/SALUD/SER-A0H.DLL"))
              .then(data => {
                console.log(data)
                this.SERA0H.GLOSA = data.RADICACION[0]

                this.form.estado_SERA0H = this.SERA0H.GLOSA.ESTADO
                this.form.cliente_SERA0H = this.SERA0H.GLOSA.ENTIDAD
                this.form.factura_SERA0H = this.SERA0H.GLOSA.FACTURA
                this.form.radicado_SERA0H = this.SERA0H.GLOSA.RADICADO.trim()
                this.SERA0H.FECHARAD = this.SERA0H.GLOSA.FECHARAD.trim()
                this.SERA0H.ANORECEPGLO = this.SERA0H.GLOSA.ANORECEP.trim()
                this.form.anorad_SERA0H = this.SERA0H.FECHARAD.substring(0, 4)
                this.form.mesrad_SERA0H = this.SERA0H.FECHARAD.substring(4, 6)
                this.form.diarad_SERA0H = this.SERA0H.FECHARAD.substring(6, 8)
                this.SERA0H.FECHHARADANT = this.SERA0H.FECHARAD
                this.SERA0H.RADICANT = this.SERA0H.GLOSA.RADICADO.trim()
                if (this.form.estado_SERA0H == '1') {
                  CON851('30', '30', this._evaluarnroglosa_SERA0H(), 'error', 'error');
                } else {
                  this._evaluarradicadoglosa_SERA0H()
                }
              })
              .catch(err => {
                console.error(err);
                this._evaluarnroglosa_SERA0H();
              });
          }
        }
      )
    },
    _evaluarradicadoglosa_SERA0H() {
      validarInputs(
        {
          form: "#VALIDAR2_SERA0H",
          orden: '1',
        }, this._evaluarnroglosa_SERA0H,
        () => {
          if (this.form.radicado_SERA0H.trim() == '') {
            this.form.anorad_SERA0H = ''
            this.form.mesrad_SERA0H = ''
            this.form.diarad_SERA0H = ''
            this._evaluarfecharad_SERA0H('1')
          } else {
            this._evaluarfecharad_SERA0H('1')
          }
        }
      )
    },
    _evaluarfecharad_SERA0H(orden) {
      if (this.form.mesrad_SERA0H.trim() == '' || this.form.mesrad_SERA0H == 0) {
        this.form.anorad_SERA0H = this.SERA0H.ANO_LNK;
        this.form.mesrad_SERA0H = this.SERA0H.MES_LNK;
        this.form.diarad_SERA0H = this.SERA0H.DIAACTUALW
      }
      validarInputs(
        {
          form: "#fecharadicado_SERA0H",
          orden: orden,
        }, this._evaluarradicadoglosa_SERA0H,
        () => {
          if (this.form.anorad_SERA0H.trim() == "" || this.form.anorad_SERA0H < 1990) {
            CON851("", "Año incorrecto! ", this._evaluarfecharad_SERA0H("1"), "error", "error");
          } else {
            this.form.mesrad_SERA0H = this.form.mesrad_SERA0H.padStart(2, "0");
            if (this.form.mesrad_SERA0H.trim() == "" || this.form.mesrad_SERA0H == '00' || this.form.mesrad_SERA0H < 1 || this.form.mesrad_SERA0H > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfecharad_SERA0H("2"), "error", "error");
            } else {
              this.form.diarad_SERA0H = this.form.diarad_SERA0H.padStart(2, "0");
              if (this.form.diarad_SERA0H.trim() == "" || this.form.diarad_SERA0H == '00' || this.form.diarad_SERA0H < 1 || this.form.diarad_SERA0H > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfecharad_SERA0H("3"), "error", "error");
              } else {
                this.SERA0H.FECHARAD = this.form.anorad_SERA0H + this.form.mesrad_SERA0H + this.form.diarad_SERA0H
                if (this.form.anorad_SERA0H > this.SERA0H.ANOACTUALW || this.form.anorad_SERA0H < this.SERA0H.ANORECEPGLO) {
                  CON851("37", "37 ", this._evaluarfecharad_SERA0H("3"), "error", "error");
                } else {
                  CON851P("01", this._evaluarfecharad_SERA0H, this._grabarcambios_SERA0H);
                }
              }
            }
          }
        }
      )
    },
    _grabarcambios_SERA0H() {
      console.log('proceso de consulta', this.form.radicado_SERA0H)
      if (this.SERA0H.FECHARAD == this.SERA0H.FECHHARADANT && this.SERA0H.RADICANT == this.form.radicado_SERA0H) {
        this._evaluaranoglosa_SERA0H()
      } else {
        this.SERA0H.FECHAGRABRADICADO =   moment().format('YYYYMMDD');
        let URL = get_url("APP/SALUD/SER-A0H.DLL");
        postData({
          datosh: datosEnvio() + '2|' + this.form.anoglosa_SERA0H + this.form.nroglosa_SERA0H + '|' + this.form.radicado_SERA0H + '|' + this.SERA0H.FECHARAD + '|' + localStorage.Usuario + '|' + this.SERA0H.FECHAGRABRADICADO + '|'
        }, URL)
          .then(data => {
            console.log(data)
            CON851('', 'Proceso terminado', this._evaluaranoglosa_SERA0H(), 'success', 'Exito');
          })
          .catch(error => {
            this._evaluarfecharad_SERA0H('1')
          });
      }      
    }
  },
});
