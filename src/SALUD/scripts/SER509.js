// 9/10/2020 - DIANA ESCOBAR: CREADO 


new Vue({
  el: "#SER509",
  data: {
    SER509: [],
    form: {
      prefijo_SER509: '',
      factura_SER509: '',
      convenio_SER509: '',
      conveniod_SER509: '',
      historia_SER509: '',
      historiad_SER509: '',
      estado_SER509: '',
      nit_SER509: '',
      nitd_SER509: '',
      cufe_SER509: '',
      bloq_SER509: '',
      envrips_SER509: '',
      envelec_SER509: '',
      cobranza_SER509: '',
      idpacientes_SER509: '',
      nombrepaci_SER509: '',
      edadpaci_SER509: '',
      habit_SER509: '',
      porcent_SER509: '', 
      fechaing_SER509: '',
      fecharet_SER509: '',
      nrocontrato_SER509: '',
      factcapitacion_SER509: '',
      observacion_SER509: '',
      detallecart_SER509: '',
      polizasoat_SER509: '',
      estancia_SER509: '',
      valorfact_SER509: '',
      copagos_SER509: '',
      abonos_SER509: '',
      saldo_SER509: '',
      anoglosa_SER509: '',
      mesglosa_SER509: '',
      Operelim_SER509: '',
      fechaelim_SER509: '',
      // radicaclosa_SER509: '',
      // valorglosa_SER509: '',
      // repuestaglosa_SER509: '',
      // trasladoglosa_SER509: '',
      opercreado_SER509: '',
      fechacreado_SER509: '',
      opermodificado_SER509: '',
      fechamodificado_SER509: ''
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,5,1,2 - Act. Novedad de cartera");
    SER509.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    SER509.ANO_LNK = SER509.FECHA_LNK.substring(0, 2);
    SER509.MES_LNK = SER509.FECHA_LNK.substring(2, 4);
    SER509.DIA_LNK = SER509.FECHA_LNK.substring(4, 6);
    $_this = this;
    loader("hide");
    obtenerDatosCompletos({
        nombreFd: "ESTADO",
      },function (data) {
        $_this.SER509.ESTADO = data.ESTADOS;
        loader("hide");
        $_this._evaluarprefijo_SER509()
      },
    );
    
  },
  methods: {
    _evaluarprefijo_SER509() {
      validarInputs(
        {
          form: "#PREFIJOS_SER509",
          orden: '1',
        }, _toggleNav,
        () => {
          this.form.prefijo_SER509 = this.form.prefijo_SER509.toUpperCase();
          switch (this.form.prefijo_SER509) {
            case 'A':
            case 'B':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'H':
            case 'I':
            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
            case 'O':
            case 'Q':
            case 'R':
            case 'S':
            case 'W':
            case 'V':
            case 'X':
            case 'Y':
            case 'Z':
            case 'P':
              this.SER509.SWCLAVE = $_USUA_GLOBAL[0].CLAVE_MEN
              this._evaluarnumero_SER509()
              break;
            case 'T':
              this.SER509.SWCLAVE = $_USUA_GLOBAL[0].CLAVE_MEN_INV
              this._evaluarnumero_SER509()
              break;
            default:
              this._evaluarprefijo_SER509()
              break;
          }
        },
      );
    },
    _evaluarnumero_SER509() {
      validarInputs(
        {
          form: "#FACTURASER_SER509",
          orden: '1',
        },
        this._evaluarprefijo_SER509,
        () => {
          this.form.factura_SER509 = this.form.factura_SER509.toString().padStart(6, '0')
          if (this.form.factura_SER509 == '000000') {
            CON851("01", "01", this._evaluarnumero_SER509(), "error", "Error");
          } else {
            postData({ datosh: datosEnvio() + this.form.prefijo_SER509 + this.form.factura_SER509 + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
              .then(data => {
                this.SER509.FACTURA = data.NUMER19[0];
                this.form.convenio_SER509 = this.SER509.FACTURA.CONVENIO_NUM;
                this.form.conveniod_SER509 = this.SER509.FACTURA.DESCRIP_TAR
                let estado = { '0': 'Activo', '1': 'Retirado', '2': 'Anulado', '3': 'Bloqueo' }
                this.form.estado_SER509 = this.SER509.FACTURA.ESTADO_NUM + '  -  ' + estado[this.SER509.FACTURA.ESTADO_NUM];
                this.form.bloq_SER509 = this.SER509.FACTURA.SEGRIPS_NUM
                this.form.envrips_SER509 = this.SER509.FACTURA.ENVIO_NUM
                this.form.envelec_SER509 = this.SER509.FACTURA.ELENVIO
                this.form.cobranza_SER509 = this.SER509.FACTURA.ESTCOB_NUM
                // this.form.cobranzad_SER509 = this.SER509.FACTURA.DESCRIP_EST
                this.form.nit_SER509 = this.SER509.FACTURA.NIT_NUM;
                this.form.nitd_SER509 = this.SER509.FACTURA.DESCRIP_NUM;
                this.form.idpacientes_SER509 = this.SER509.FACTURA.IDPAC_NUM
                this.form.nombrepaci_SER509 = this.SER509.FACTURA.PACIENTE_NUM
                var edad = calcular_edad(this.SER509.FACTURA.NAC_PACI);
                this.form.edadpaci_SER509 = edad.unid_edad + edad.vlr_edad.toString().padStart('0')
                this.form.habit_SER509 = this.SER509.FACTURA.HAB_NUM
                this.form.cufe_SER509 = this.SER509.FACTURA.CUFEELEC_NUM.trim()
                this.form.porcent_SER509  = valores_SER509(this.SER509.FACTURA.PORCENTCOP_NUM)
                this.form.fechaing_SER509 = fecha_SER509(this.SER509.FACTURA.FECHA_ING)
                this.form.fecharet_SER509 = fecha_SER509(this.SER509.FACTURA.FECHA_RET)
                this.form.nrocontrato_SER509 = this.SER509.FACTURA.CONTRATO_NUM
                this.form.factcapitacion_SER509 = this.SER509.FACTURA.FACTCAPIT_NUM
                this.form.observacion_SER509 = this.SER509.FACTURA.OBSERV_NUM.trim()
                this.form.detallew_SER509 = this.SER509.FACTURA.DETALLE_NUM.trim()
                this.form.detallecart_SER509 =  this.SER509.FACTURA.DETCARTERA_NUM.trim()
                // this.SER509.FACTURA.ENVIOFURIPS_NUM
                this.form.polizasoat_SER509 = this.SER509.FACTURA.NROPOL_NUM.trim()
                this.form.estancia_SER509 = this.SER509.FACTURA.DIASEST_NUM
                this.form.opercreado_SER509 =  this.SER509.FACTURA.OPER_NUM
                this.form.fechacreado_SER509 =  this.SER509.FACTURA.FECHACRE_NUM
                this.form.opermodificado_SER509 = this.SER509.FACTURA.OPERMOD_NUM
                this.form.fechamodificado_SER509 = this.SER509.FACTURA.FECHAMOD_NUM
                this.form.Operelim_SER509 = this.SER509.FACTURA.OPERELIM_RIPS
                this.form.fechaelim_SER509 = this.SER509.FACTURA.FECHAELIM_RIPS
                let tabla = this.SER509.FACTURA.TABLA_ABON.filter(x => parseInt(x.VLR_ABON) > 0)
                let fact = this.SER509.FACTURA.TABLA_FACT.filter(x => parseInt(x.VLR_FACT) > 0);

                let totalfact = 0;
                for (var i in fact) {
                  if (parseInt(fact[i].VLR_FACT) > 0) {
                    totalfact = totalfact + parseInt(fact[i].VLR_FACT);
                  }
                }
                let totalabon = 0;
                for (var i in tabla) {
                  if (parseInt(tabla[i].VLR_ABON) > 0) {
                    totalabon = totalabon + parseInt(tabla[i].VLR_ABON);
                  }
                }

                this.form.valorfact_SER509 = valores_SER509(totalfact.toString());
                this.form.abonos_SER509 = valores_SER509(totalabon.toString());
                this.form.copagos_SER509 = valores_SER509(parseInt(this.SER509.FACTURA.COPAGOS_NUM).toString());
                this.form.saldo_SER509 = totalfact + totalabon - parseInt(this.SER509.FACTURA.COPAGOS_NUM);
                this.form.saldo_SER509 = valores_SER509(this.form.saldo_SER509.toString())
                this.form.anoglosa_SER509 = this.SER509.FACTURA.FECHAGLOSA_NUM.substring(0, 4)
                this.form.mesglosa_SER509 = this.SER509.FACTURA.FECHAGLOSA_NUM.substring(4, 6)
                this.form.radicaclosa_SER509 = this.SER509.FACTURA.RADIC_NUM
                valorglosaMask_SER509.typedValue = this.SER509.FACTURA.GLOSA_NUM
                respglosaMask_SER509.typedValue = this.SER509.FACTURA.RESPGLOSA_NUM
                definitivaMask_SER509.typedValue = this.SER509.FACTURA.GLOSADISC_NUM
                trasladoglosaMask_SER509.typedValue = this.SER509.FACTURA.TRASLGLOSA_NUM
                this._evaluarsegrips_SER509()
              })
              .catch(err => {
                console.error(err);
                this._evaluarnumero_SER509()
              });
          }
        },
      );
    },
    _evaluarsegrips_SER509() {
      if (this.form.estado_SER509.substring(0, 1) == '1') {
        if(this.form.bloq_SER509.trim() == '') this.form.bloq_SER509 = 'N'
        validarInputs(
          {
            form: "#BLOQUEO_SER509",
            orden: '1',
          }, this._evaluarnumero_SER509,
          () => {
            this.form.bloq_SER509 = this.form.bloq_SER509.toUpperCase();
            if (this.form.bloq_SER509 == 'S' || this.form.bloq_SER509 == 'N') {
              this._evaluarestcob_SER509()
            } else {
              CON851("03", "03", this._evaluarsegrips_SER509(), "error", "Error");
            }
          },
        );
      } else {
        this._evaluarestcob_SER509()
      }
    },
    _evaluarenvio_SER509() {
      if (this.form.bloq_SER509 == 'S') {
        CON851("7T", "7T", null, "error", "Error");
        this._evaluarestcob_SER509()
      } else {
        validarInputs(
          {
            form: "#ENVIORIPS_SER509",
            orden: '1',
          }, this._evaluarprefijo_SER509,
          () => {
            this.form.envrips_SER509 = this.form.envrips_SER509.padStart(6, '0')
            if (this.SER509.FACTURA.ENVIO_NUM == this.form.envrips_SER509 || this.form.envrips_SER509 == 0) {
              this._evaluarenvioelec_SER509()
            } else {
              CON851("03", "03", this._evaluarenvio_SER509(), "error", "Error");
              this.form.envrips_SER509 = this.SER509.FACTURA.ENVIO_NUM
            }
          },
        );
      }
    },
    _evaluarenvioelec_SER509(){
      validarInputs(
        {
          form: "#ENVIOELEC_SER509",
          orden: '1',
        }, this._evaluarprefijo_SER509,
        () => {
          this.form.envelec_SER509 = this.form.envelec_SER509.padStart(6, '0')
          if (this.SER509.FACTURA.ELENVIO == this.form.envelec_SER509 || this.form.envelec_SER509 == 0) {
            this._evaluarestcob_SER509()
          } else {
            CON851("03", "03", this._evaluarenvioelec_SER509(), "error", "Error");
          }
        },
      );
    }, 
    _evaluarestcob_SER509(){
      if(!$.isNumeric(this.form.cobranza_SER509)) this.form.cobranza_SER509 == 00
      console.log('ESTADO COB')
      validarInputs(
        {
          form: "#ESTADOCOBR_SER509",
          orden: '1',
          event_f5: ()=>{
            if(this.form.bloq_SER509 == 'N'){
              this._evaluarenvio_SER509()
            }else{
              if(localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI'){
                this._evaluarenvio_SER509()
              }else{
                this._evaluarestcob_SER509()
              }
            }
          } 
        }, this._evaluarsegrips_SER509,
        () => {
          if(this.form.cobranza_SER509.trim() == ''){
            this.form.cobranza_SER509 = 00
            if(localStorage.Usuario == 'GEBC'){
              this._evaluarcufe_SER509()
            }else{
              this._evaluardetallew_SER509()
            }
          }else{
            let res = this.SER509.ESTADO.find(e => e.ID == this.form.cobranza_SER509.padStart(2, '0'));
            if (res == undefined) {
              CON851("01", "01", this._evaluarestcob_SER509(), "error", "error");
            } else {
              // this.form.cobranzad_SER509 = res.DESCRIPCION;
              if(localStorage.Usuario == 'GEBC'){
                this._evaluarcufe_SER509()
              }else{
                this._evaluardetallew_SER509()
              }
            }
          }
        },
      );
    },
    _evaluarcufe_SER509(){
      validarInputs(
        {
          form: "#CUFE_SERSER509",
          orden: '1',
        }, this._evaluarestcob_SER509,
        () => {
          if(this.form.cufe_SER509.trim() == ''){
            this.SER509.ESTADOELECW  = 0
            this._evaluardetallew_SER509()
          }else{
            this._evaluardetallew_SER509()
          }
        },
      );
    }, 
    _evaluardetallew_SER509(){
      validarInputs(
        {
          form: "#DETALLEW_SER509",
          orden: '1',
        }, this._evaluarestcob_SER509,
        () => {
          this._evaluardetallecart_SER509()
        },
      );
    },
    _evaluardetallecart_SER509(){
      validarInputs(
        {
          form: "#DETALLECART_SER509",
          orden: '1',
        }, this._evaluardetallew_SER509,
        () => {
          this._evaluarpoliza_SER509()
        },
      );
    },
    _evaluarpoliza_SER509(){
      validarInputs(
        {
          form: "#POLIZA_SER509",
          orden: '1',
        }, this._evaluardetallecart_SER509,
        () => {
          this._evaluarfechaglosa_SER509('1')
        },
      );
    },
    _evaluarfechaglosa_SER509(orden){
      validarInputs(
        {
          form: "#ANOGLOSA_SER509",
          orden: orden,
        }, this._evaluarpoliza_SER509,
        () => {
          this.form.mesglosa_SER509 = this.form.mesglosa_SER509.padStart(2, '0')
         if(this.form.mesglosa_SER509 > 12){
          CON851("", "mes no valido!", this._evaluarfechaglosa_SER509('2'), "error", "error");
         }else{
          this._evaluarnumglosas_SER509('1')
         }
        },
      );
    }, 
    _evaluarnumglosas_SER509(orden){
      validarInputs(
        {
          form: "#NUMGLOSAS_SER509",
          orden: orden,
        }, ()=>{
          this._evaluarfechaglosa_SER509('2')
        },
        () => {
          this._evaluargrabado_SER509()
        },
      );
    }, 
    _evaluargrabado_SER509(){
      postData({ datosh: datosEnvio() + this.form.prefijo_SER509 + this.form.factura_SER509 + "|" + this.form.bloq_SER509 + '|' + this.form.envrips_SER509 + '|' + this.form.envelec_SER509 + '|' + this.form.cobranza_SER509 + '|' + this.form.cufe_SER509 + '|' + this.form.detallew_SER509  + '|' + this.form.detallecart_SER509 + '|'+ this.form.polizasoat_SER509 + '|' + this.form.anoglosa_SER509 + '|'+ this.form.mesglosa_SER509 + '|' + this.form.radicaclosa_SER509 + '|' + valorglosaMask_SER509.unmaskedValue.padStart(9, '0') + '|' + respglosaMask_SER509.unmaskedValue.padStart(9, '0') + '|' + definitivaMask_SER509.unmaskedValue + '|' + trasladoglosaMask_SER509.unmaskedValue.padStart(9, '0') + '|'}, get_url("APP/SALUD/SER509.DLL"))
      .then(data => {
        console.log(data, 'GRABADO')
        CON851('','Proceso terminado',_toggleNav(),'success','Exito');
      })
      .catch(err => {
        this._evaluarnumglosas_SER509('5')
      });
    }, 
    _f8estadocobro_SER509(){
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE ESTADOS CARTERA",
        columnas: ["ID", "DESCRIPCION"],
        data: $_this.SER509.ESTADO,
        callback_esc: function () {
          $(".cobranza_SER509").focus();
        },
        callback: function (data) {
          $_this.form.cobranza_SER509 = data.ID.trim()
          _enterInput(".cobranza_SER509");
        }
      });
    },

  },
});

var fecha_SER509 = IMask.createPipe({
  mask: Date,
  pattern: "Y/m/d",
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "0000", to: "9000", maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "00", to: "12", maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "31", maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY/MM/DD");
  },
  parse: function (str) {
    var fecha = moment(str).format("YYYY/MM/DD");
    if (fecha == 'Invalid date') return '0000/00/00'
    return str;
  },
});

var valores_SER509 = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: '.',
  thousandsSeparator: ',',
  normalizeZeros: true,
  padFractionalZeros: true,
});


var valorglosaMask_SER509 = new IMask(document.getElementById('valorglosa_SER509'),
{ mask: Number, min: 0, max: 999999999, thousandsSeparator: ',', padFractionalZeros: true }
);

var respglosaMask_SER509 = new IMask(document.getElementById('repuestaglosa_SER509'),
{ mask: Number, min: 0, max: 999999999, thousandsSeparator: ',', padFractionalZeros: true }
);

var definitivaMask_SER509 = new IMask(document.getElementById('definitivaglosa_SER509'),
{ mask: Number, scale: 1, thousandsSeparator: ',', padFractionalZeros: true, signed: true, mapToRadix: ['.']}
);

var trasladoglosaMask_SER509 = new IMask(document.getElementById('trasladoglosa_SER509'),
{ mask: Number, min: 0, max: 999999999, thousandsSeparator: ',', padFractionalZeros: true }
);
