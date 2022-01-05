const { isNumeric } = require("jquery");
const { TouchBarScrubber } = require("electron");

var fecha_SER451 = IMask.createPipe({
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

var valores_SER451 = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: '.',
  thousandsSeparator: ',',
  normalizeZeros: true,
  padFractionalZeros: true,
});

const moment = require("moment");

new Vue({
  el: "#SER451",
  data: {
    SER451: [],
    _ENVIOS: [],
    form: {
      prefijo_SER451: "",
      numero_SER451: "",
      estado_SER451: '',
      convenio_SER451: '',
      creado_SER451: '',
      modificado_SER451: '',
      bloq_SER451: '',
      clave_SER451: '',
      nit_SER451: '',
      fechaenvio_SER451: '',
      fechaapertura_SER451: '',
      fechacierre_SER451: '',
      numerofacturado_SER451: '',

      anopresente_SER451: '',
      mespresente_SER451: '',
      diapresente_SER451: '',
      anorepret_SER451: '0000',
      mesrepre_SER451: '00',
      diarepre_SER451: '00',
      anoperiodorad_SER451: '',
      mesperiodorad_SER451: '',
      diaperiodorad_SER451: '',
      anoradglosa_SER451: '0000',
      mesradglosa_SER451: '00',
      diaradglosa_SER451: '00',

      fechaglosa_SER451: '',
      radicacion_SER451: '',
      vlrglosa_SER451: '',
      vlrsoportado_SER451: '',
      factarm_SER451: '',
      armadfact_SER451: '',
      armarad_SER451: '',
      radicarma_SER451: '',
      fecharad_SER451: '',
      operradi_SER451: '',
      copagoesti_SER451: '',
      totalfact_SER451: '',
      totalabono_SER451: '',
      saldoneto_SER451: '',

      lotesecuencia_SER451:'',
      numerotablasecuencia_SER451:'',
    },
    tablaabon_SER451: [],
    tablafact_SER451: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,5,1,1 - Mantenimiento cartera de clientes");
    $_this = this;
    obtenerDatosCompletos( { nombreFd: 'PREFIJOS' }, function (data) {
      loader("hide");
      console.log(data, 'PREFIJOS');
      $_this.SER451.PREFIJOS = data.PREFIJOS;
      $_this._evaluarclaveusuario_SER451();
    })
  },
  methods: {
    _evaluarclaveusuario_SER451() {
      validarInputs(
        {
          form: "#VALIDAR1_SER451",
          orden: "1",
        },
        _toggleNav,
        () => {
          if ($_USUA_GLOBAL[0].CLAVE_CAR.trim() == this.form.clave_SER451.trim()) {
            this._evaluarprefijo_SER451();
          } else {
            CON851('','CLAVE ERRADA REPITA',this._evaluarclaveusuario_SER451(),'error','Error')
          }
        },
      )
    },
    _evaluarprefijo_SER451(){
      validarInputs(
        {
          form: "#VALIDAR2_SER451",
          orden: "1",
        },
        this._evaluarclaveusuario_SER451,
        () => {
          if (
            prefijoMask_SER451.value == "A" ||  
            prefijoMask_SER451.value == "P" ||
            prefijoMask_SER451.value == "T" ||
            prefijoMask_SER451.value == "B" ||
            prefijoMask_SER451.value == "D" ||
            prefijoMask_SER451.value == "F" ||
            prefijoMask_SER451.value == "G" ||
            prefijoMask_SER451.value == "H" ||
            prefijoMask_SER451.value == "I" ||
            prefijoMask_SER451.value == "J" ||
            prefijoMask_SER451.value == "K" ||
            prefijoMask_SER451.value == "L" ||
            prefijoMask_SER451.value == "M" ||
            prefijoMask_SER451.value == "N" ||
            prefijoMask_SER451.value == "O" ||
            prefijoMask_SER451.value == "Q" ||
            prefijoMask_SER451.value == "R" ||
            prefijoMask_SER451.value == "S" ||
            prefijoMask_SER451.value == "V" ||
            prefijoMask_SER451.value == "W" ||
            prefijoMask_SER451.value == "X" ||
            prefijoMask_SER451.value == "Y" ||
            prefijoMask_SER451.value == "Z" ||
            prefijoMask_SER451.value == "E" 
          ) {
            this._evaluarnumerofactura_SER451();
          } else {
            this._evaluarprefijo_SER451();
          }
        }
      );
    },
    _evaluarnumerofactura_SER451() {
      this.SER451.I = this.SER451.J =  0;
      validarInputs(
        {
          form: "#VALIDAR3_SER451",
          orden: "1",
        },
        this._evaluarprefijo_SER451,
        () => {
          postData({ datosh: `${datosEnvio()}${prefijoMask_SER451.value}${numerofacturaMask_SER451.value.padStart(6,'0')}|` }, get_url("APP/SALUD/SER808-01.DLL"))
          .then(data => {
            this.SER451.FACTURA = data.NUMER19[0];
            let estado = {
              '0': 'Activo',
              '1': 'Retirado',
              '2': 'Anulado',
              '3': 'Bloqueo'
            }
            this.form.nit_SER451 = this.SER451.FACTURA.NIT_NUM;
            this.form.descripnit_SER451 = this.SER451.FACTURA.DESCRIP_NUM;
            this.form.estado_SER451 = this.SER451.FACTURA.ESTADO_NUM + '  -  ' + estado[this.SER451.FACTURA.ESTADO_NUM];
            this.SER451.ESTADOW = this.SER451.FACTURA.ESTADO_NUM;
            this.SER451.FACTCAPITW = this.SER451.FACTURA.FACTCAPIT_NUM
            this.SER451.NROCAPITW = this.SER451.FACTURA.FACTCAPIT_NUM.substring(1, 7)
            this.form.convenio_SER451 = this.SER451.FACTURA.CONVENIO_NUM;
            this.form.fechaapertura_SER451 = fecha_SER451(this.SER451.FACTURA.FECHA_ING);

            this.SER451.ANOINGW = this.SER451.FACTURA.FECHA_ING.substring(0, 4)
            this.form.fechacierre_SER451 = fecha_SER451(this.SER451.FACTURA.FECHA_RET);
            this.SER451.ANORETW = this.SER451.FACTURA.FECHA_RET.substring(0, 4)
            this.SER451.MESRETW = this.SER451.FACTURA.FECHA_RET.substring(4, 6)
            this.SER451.DIARETW = this.SER451.FACTURA.FECHA_RET.substring(6, 8)

            this.SER451.FECHAPREW = this.SER451.FACTURA.FECHA_PRE;
            this.form.anopresente_SER451 = this.SER451.FACTURA.FECHA_PRE.substring(0, 4)
            this.form.mespresente_SER451 = this.SER451.FACTURA.FECHA_PRE.substring(4, 6)
            this.form.diapresente_SER451 = this.SER451.FACTURA.FECHA_PRE.substring(6, 8)
            this.SER451.RADICADOEXTERW = this.SER451.FACTURA.RADICADOEXT_NUM.trim()
            this.SER451.RADICADOEXTERX = this.SER451.FACTURA.RADICADOEXT_NUM.trim()
            this.SER451.FECHAREPREW = this.SER451.FACTURA.FECHAREPRE_NUM;
            this.form.anorepret_SER451 = this.SER451.FECHAREPREW.substring(0, 4)
            this.form.mesrepre_SER451 = this.SER451.FECHAREPREW.substring(4, 6)
            this.form.diarepre_SER451 = this.SER451.FECHAREPREW.substring(6, 8)
            this.form.numeroenvio_SER451 = this.SER451.FACTURA.ENVIO_NUM
            this.form.anoperiodorad_SER451 = this.SER451.FACTURA.PERCONTRAD_NUM.substring(0, 2)
            this.form.mesperiodorad_SER451 = this.SER451.FACTURA.PERCONTRAD_NUM.substring(2, 4)
            this.SER451.ANOENV = this.SER451.FACTURA.FECHAENV_NUM.substring(0, 4)
            this.SER451.MESENV = this.SER451.FACTURA.FECHAENV_NUM.substring(4, 6)
            this.SER451.DIAENV = this.SER451.FACTURA.FECHAENV_NUM.substring(6, 8)
            this.SER451.NROENVIOW = this.SER451.FACTURA.ENVIO_NUM
            let tabla = this.SER451.FACTURA.TABLA_ABON.filter(x => x.SECU_ABON.trim() != 0 && x.SECU_ABON.trim() != '')
            let fact = this.SER451.FACTURA.TABLA_FACT.filter(x => parseInt(x.FECHA_FACT) > 0);
            this.tablaabon_SER451 = tabla;
            this.tablafact_SER451 = fact;
            this.form.fechaglosa_SER451 = fecha_SER451(this.SER451.FACTURA.FECHAGLOSA_NUM);
            this.form.radicacion_SER451 = this.SER451.FACTURA.RADIC_NUM;
            this.form.vlrglosa_SER451 = valores_SER451(this.SER451.FACTURA.GLOSA_NUM);
            this.form.anoradglosa_SER451 = this.SER451.FACTURA.FECHARADGLO_NUM.substring(0, 4)
            this.form.mesradglosa_SER451 = this.SER451.FACTURA.FECHARADGLO_NUM.substring(4, 6)
            this.form.diaradglosa_SER451 = this.SER451.FACTURA.FECHARADGLO_NUM.substring(6, 8)
            this.form.vlrsoportado_SER451 = valores_SER451(this.SER451.FACTURA.RESPGLOSA_NUM);
            this.form.creado_SER451 = this.SER451.FACTURA.OPER_NUM;
            this.form.modificado_SER451 = this.SER451.FACTURA.OPERMOD_NUM;
            this.form.bloq_SER451 = this.SER451.FACTURA.OPERBLOQ_NUM;
            this.form.factarm_SER451 = this.SER451.FACTURA.DOCUMFACT_NUM + ' - ' + fecha_SER451(this.SER451.FACTURA.FECHAFACT_NUM);
            this.form.armadfact_SER451 = this.SER451.FACTURA.DOCUMARMAFACT_NUM + ' - ' + fecha_SER451(this.SER451.FACTURA.FECHAARMA_NUM);
            this.form.armarad_SER451 = this.SER451.FACTURA.DOCUMARMARAD_NUM + ' - ' + fecha_SER451(this.SER451.FACTURA.FECHAARMARADI_NUM);
            this.form.radicarma_SER451 = this.SER451.FACTURA.DOCRADIARMA_NUM + ' - ' + fecha_SER451(this.SER451.FACTURA.FECHARADIARMA_NUM);

            let totalfact = 0;
            for (var i in this.tablafact_SER451) {
              if (parseInt(this.tablafact_SER451[i].FECHA_FACT) > 0) {
                totalfact = totalfact + parseInt(this.tablafact_SER451[i].VLR_FACT.trim().padStart(12,'0'));
              }
            }
            let totalabon = 0;
            for (var i in this.tablaabon_SER451) {
              if (this.tablaabon_SER451[i].SECU_ABON.trim() != 0 && this.tablaabon_SER451[i].SECU_ABON.trim() != '') {
                totalabon = totalabon + parseInt(this.tablaabon_SER451[i].VLR_ABON.trim().padStart(12,'0'));
              }
            }
            this.form.totalfact_SER451 = valores_SER451(totalfact.toString());
            this.form.totalabono_SER451 = valores_SER451(totalabon.toString());
            copagosMask_SER451.typedValue = parseInt(this.SER451.FACTURA.COPAGOS_NUM).toString();
            this.form.saldoneto_SER451 = totalfact + totalabon - parseInt(this.SER451.FACTURA.COPAGOS_NUM);
            this.form.saldoneto_SER451 = valores_SER451(this.form.saldoneto_SER451.toString())

            postData({ datosh: datosEnvio() + this.form.numeroenvio_SER451.trim() + "|" }, get_url("APP/SALUD/SAL504D.DLL"))
              .then(data => {
                this.form.fechaenvio_SER451 = data;
                this.SER451.I = 1;
                this.form.numerofacturado_SER451 = this.SER451.I;
                this._evaluarañofacturado_SER451();
              })
              .catch(err => {
                console.error(err)
                this._evaluarnumerofactura_SER451();
              });
          })
          .catch(err => {
            console.error(err);
            this._evaluarnumerofactura_SER451();
          });
        },
      )
    },
    _evaluarañofacturado_SER451(data){
      console.debug(this.SER451.I);
      if (data) {
        this.SER451.I = parseInt(data.cells[0].textContent.trim());
        this.form.numerofacturado_SER451 = this.SER451.I;
        añofacturadoMask_SER451.typedValue = data.cells[1].textContent.trim().substring(0,4);
        mesfacturadoMask_SER451.typedValue = data.cells[1].textContent.trim().substring(4,6);
        vlrfacturadoMask_SER451.typedValue = data.cells[2].textContent.trim();
      }
      if (this.SER451.I > 10) {
        this.SER451.J = 1;
        this.form.numerotablasecuencia_SER451 = this.SER451.J;
        this._evaluarañoabonos_SER451();
      } else {
        validarInputs(
          {
            form: "#VALIDAR4_SER451",
            orden: "1",
            event_f3: () => { 
              this.SER451.J = 0; 
              this.form.numerotablasecuencia_SER451 = this.SER451.J;
              this._evaluarañoabonos_SER451();
            },
            event_f7: () => {
              validarTabla(
                {
                    tabla: '#TABLAFACTURADO1_SER451',
                    orden: '0',
                    event_f3: () => { this._evaluarañoabonos_SER451() },
                    Supr: data => {
                      this.tablafact_SER451.splice(parseInt(data.cells[0].textContent.trim()) - 1, 1);
                      this._evaluarañofacturado_SER451();
                      this.SER451.I = this.SER451.I - 1;
                      this.form.numerofacturado_SER451 = this.SER451.I;
                    },
                },
                this._evaluarañofacturado_SER451,
                () => {
                  this.SER451.I = 1;
                  this._evaluarañofacturado_SER451();
                },
                () => {this._evaluarañoabonos_SER451()}
              )
            },
          },
          this._evaluarnumerofactura_SER451,
          () => {
            if (añofacturadoMask_SER451.value.trim() == '') {
              this._evaluarañofacturado_SER451();
              this.SER451.I++;
              this.form.numerofacturado_SER451 = this.SER451.I;
            } else {
              if (añofacturadoMask_SER451.value.trim() < this.SER451.FACTURA.FECHA_ING.substring(0,4)) {
                this._evaluarañofacturado_SER451();
              } else if (añofacturadoMask_SER451.value.trim() > this.SER451.FACTURA.FECHA_RET.substring(0,4)) {
                this._evaluarañofacturado_SER451()
              } else {
                this._evaluarmesfacturado_SER451();
              }
            }
          },
        )
      }
    },
    _evaluarmesfacturado_SER451() {
      validarInputs(
        {
          form: "#VALIDAR5_SER451",
          orden: "1",
        },
        () => {this._evaluarañofacturado_SER451()},
        () => {
          if (añofacturadoMask_SER451.value.trim() == '') {
            this._evaluarmesfacturado_SER451();
          } else {
            if (mesfacturadoMask_SER451.value < 1 || mesfacturadoMask_SER451.value > 12) {
              this._evaluarmesfacturado_SER451();
            } else {
              this._evaluarvalorfacturado_SER451();
            }
          }
        },
      )
    },
    _evaluarvalorfacturado_SER451() {
      validarInputs(
        {
          form: "#VALIDAR6_SER451",
          orden: "1",
        },
        this._evaluarmesfacturado_SER451,
        () => {
          if (vlrfacturadoMask_SER451.value.trim() == '') vlrfacturadoMask_SER451.typedValue = '0.00'
          if (this.tablafact_SER451[this.SER451.I - 1]) {
            this.tablafact_SER451[this.SER451.I - 1].FECHA_FACT = `${añofacturadoMask_SER451.value}${mesfacturadoMask_SER451.value.padStart(2,'0')}`
            this.tablafact_SER451[this.SER451.I - 1].VLR_FACT = vlrfacturadoMask_SER451.value;
          } else {
            this.tablafact_SER451.push({FECHA_FACT:`${añofacturadoMask_SER451.value}${mesfacturadoMask_SER451.value.padStart(2,'0')}`, VLR_FACT:vlrfacturadoMask_SER451.value });
          }
          this.SER451.I++;
          this.form.numerofacturado_SER451 = this.SER451.I;
          añofacturadoMask_SER451.typedValue = '';
          mesfacturadoMask_SER451.typedValue = '';
          vlrfacturadoMask_SER451.typedValue = '';
          this._evaluarañofacturado_SER451();
        },
      )
    },
    _evaluarañoabonos_SER451(data) {
      if (data) {
        this.SER451.J = parseInt(data.cells[0].textContent.trim());
        this.form.numerotablasecuencia_SER451 = this.SER451.J;
        añoabonoMask_SER451.typedValue = data.cells[1].textContent.trim().substring(0,4);
        mesabonoMask_SER451.typedValue = data.cells[1].textContent.trim().substring(4,6);
        diaabonoMask_SER451.typedValue = data.cells[1].textContent.trim().substring(6,8);
        this.form.lotesecuencia_SER451 = data.cells[2].textContent.trim().substring(0,2);
        numerosecuenciaMask_SER451.typedValue = parseInt(data.cells[2].textContent.trim().substring(2,8));
        secuenciaMask_SER451.typedValue = parseInt(data.cells[2].textContent.trim().substring(8,11));
        vlrabonosMask_SER451.typedValue = data.cells[3].textContent.trim();
      }
      if (this.SER451.J > 20) {
        this._evaluarcopago_SER451();
      } else {
        validarInputs(
          {
            form: "#VALIDAR7_SER451",
            orden: "1",
            event_f3: this._evaluarcopago_SER451,
            event_f7: () => {
              validarTabla(
                {
                    tabla: '#TABLAABONOS1_SER451',
                    orden: '0',
                    event_f3: this._evaluarcopago_SER451,
                    Supr: data => {
                      this.tablaabon_SER451.splice(parseInt(data.cells[0].textContent.trim()) - 1, 1);
                      this._evaluarañoabonos_SER451();
                      this.SER451.J = this.SER451.J - 1;
                      this.form.numerotablasecuencia_SER451 = this.SER451.J;
                    },
                },
                this._evaluarañoabonos_SER451,
                () => {
                  this.SER451.J = 1;
                  this._evaluarañoabonos_SER451();
                },
                this._evaluarcopago_SER451
              )
            },
          },
          () => {
            this.SER451.I = 1;
            this.SER451.J = 1;
            this._evaluarañofacturado_SER451();
          },
          () => {
            if (añoabonoMask_SER451.value.trim() == '') {
              this.SER451.J++;
              this.form.numerotablasecuencia_SER451 = this.SER451.J;
              this._evaluarañoabonos_SER451();
            } else {
              if (añoabonoMask_SER451.value.trim() < 1996) {
                this._evaluarañoabonos_SER451();
              } else {
                this._evaluarmesabonos_SER451();
              }
            }
          },
        )
      }
    },
    _evaluarmesabonos_SER451() {
      validarInputs(
        {
          form: "#VALIDAR8_SER451",
          orden: "1",
        },
        () => { this._evaluarañoabonos_SER451() },
        () => {
          if (mesabonoMask_SER451.value.trim() == '') {
            this._evaluarmesabonos_SER451();
          } else {
            if (mesabonoMask_SER451.value < 1 || mesabonoMask_SER451.value > 12) {
              this._evaluarmesabonos_SER451();
            } else {
              this._evaluardiaabonos_SER451();
            }
          }
        },
      )
    },
    _evaluardiaabonos_SER451() {
      validarInputs(
        {
          form: "#VALIDAR9_SER451",
          orden: "1",
        },
        this._evaluarmesabonos_SER451,
        () => {
          if (diaabonoMask_SER451.value.trim() == '') {
            this._evaluardiaabonos_SER451();
          } else {
            if (diaabonoMask_SER451.value < 1 || diaabonoMask_SER451.value > 31) {
              this._evaluardiaabonos_SER451();
            } else {
              if (moment(`${añoabonoMask_SER451.value}${mesabonoMask_SER451.value.padStart(2,'0')}${diaabonoMask_SER451.value}`).format('YYYYMMDD') == 'Invalid Date') {
                this._evaluardiaabonos_SER451();
              } else {
                this._evaluarlotesecuencia_SER451();
              }
            }
          }
        },
      )
    },
    _evaluarlotesecuencia_SER451() {
      validarInputs(
        {
          form: "#VALIDAR10_SER451",
          orden: "1",
        },
        () => {
          this._evaluarañoabonos_SER451();
        },
        () => {
          if (
            this.form.lotesecuencia_SER451.trim() == "BP" ||
            this.form.lotesecuencia_SER451.trim() == "1R" ||
            this.form.lotesecuencia_SER451.trim() == "1G" ||
            this.form.lotesecuencia_SER451.trim() == "1C" ||
            this.form.lotesecuencia_SER451.trim() == "2R" ||
            this.form.lotesecuencia_SER451.trim() == "2G" ||
            this.form.lotesecuencia_SER451.trim() == "2C" ||
            this.form.lotesecuencia_SER451.trim() == "3R" ||
            this.form.lotesecuencia_SER451.trim() == "3G" ||
            this.form.lotesecuencia_SER451.trim() == "3C" ||
            this.form.lotesecuencia_SER451.trim() == "GA" ||
            this.form.lotesecuencia_SER451.trim() == "GP" ||
            this.form.lotesecuencia_SER451.trim() == "GT" ||
            this.form.lotesecuencia_SER451.trim() == "6G"
          ) {
            this._evaluarnumerosecuencia_SER451();
          } else {
            if (localStorage.Usuario == "GEBC") this._evaluarnumerosecuencia_SER451();
            else this._evaluarlotesecuencia_SER451();
          }
        }
      );
    },
    _evaluarnumerosecuencia_SER451() {
      validarInputs(
        {
          form: "#VALIDAR11_SER451",
          orden: "1",
        },
        this._evaluarlotesecuencia_SER451,
        () => {
          if (numerosecuenciaMask_SER451.value.trim() == '') {
            this._evaluarnumerosecuencia_SER451();
          } else {
            this._evaluarsecuencia_SER451();
          }
        },
      )
    },
    _evaluarsecuencia_SER451() {
      validarInputs(
        {
          form: "#VALIDAR12_SER451",
          orden: "1",
        },
        this._evaluarnumerosecuencia_SER451,
        () => {
          if (secuenciaMask_SER451.value.trim() == '') {
            this._evaluarsecuencia_SER451();
          } else {
            this._evaluarvalorabonos_SER451();
          }
        },
      )
    },
    _evaluarvalorabonos_SER451() {
      validarInputs(
        {
          form: "#VALIDAR13_SER451",
          orden: "1",
        },
        this._evaluarsecuencia_SER451,
        () => {
          if (vlrabonosMask_SER451.value.trim() == '') vlrabonosMask_SER451.typedValue = '0.00'
          if (this.tablaabon_SER451[this.SER451.J - 1]) {
            this.tablaabon_SER451[this.SER451.J - 1].FECHA_ABON = `${añoabonoMask_SER451.value}${mesabonoMask_SER451.value.padStart(2,'0')}${diaabonoMask_SER451.value.padStart(2,'0')}`
            this.tablaabon_SER451[this.SER451.J - 1].SECU_ABON = `${this.form.lotesecuencia_SER451}${numerosecuenciaMask_SER451.value.padStart(6,'0')}${secuenciaMask_SER451.value.padStart(3,'0')}`
            this.tablaabon_SER451[this.SER451.J - 1].VLR_ABON = vlrabonosMask_SER451.value;
          } else {
            this.tablaabon_SER451.push({FECHA_ABON:`${añoabonoMask_SER451.value}${mesabonoMask_SER451.value.padStart(2,'0')}${diaabonoMask_SER451.value.padStart(2,'0')}`, SECU_ABON:`${this.form.lotesecuencia_SER451}${numerosecuenciaMask_SER451.value.padStart(6,'0')}${secuenciaMask_SER451.value.padStart(3,'0')}`, VLR_ABON: vlrabonosMask_SER451.value });
          }
          this.SER451.J++;
          this._evaluarañoabonos_SER451();
        },
      )
    },
    _evaluarcopago_SER451() {
      console.log(this.tablaabon_SER451, 'TABLA DE ABONOS')
      validarInputs(
        {
          form: "#VALIDAR14_SER451",
          orden: "1",
        },
        () => {
          this.SER451.J = 1;
          this._evaluarañoabonos_SER451();
        },
        () => {
          let totalfact = 0;
          for (var i in this.tablafact_SER451) {
            if (parseInt(this.tablafact_SER451[i].VLR_FACT) > 0) {
              totalfact = totalfact + parseFloat(this.tablafact_SER451[i].VLR_FACT.replace(/,/g,''));
            }
          }
          let totalabon = 0;
          for (var i in this.tablaabon_SER451) {
            if (parseInt(this.tablaabon_SER451[i].VLR_ABON) > 0) {
              totalabon = totalabon + parseFloat(this.tablaabon_SER451[i].VLR_ABON.replace(/,/g,''));
            }
          }
          this.form.totalfact_SER451 = valores_SER451(totalfact.toString());
          this.form.totalabono_SER451 = valores_SER451(totalabon.toString());
          this.form.saldoneto_SER451 = totalfact + totalabon - parseInt(copagosMask_SER451.unmaskedValue);
          this.form.saldoneto_SER451 = valores_SER451(this.form.saldoneto_SER451.toString())
          CON851P('01', this._evaluarcopago_SER451, () => {
            console.log(this.tablaabon_SER451, 'ABONOS GRABADO')
            let data = new Object();
            data.datosh = `${datosEnvio()}${prefijoMask_SER451.value}${numerofacturaMask_SER451.value.padStart(6,'0')}|${copagosMask_SER451.unmaskedValue.padStart(9,'0')}|`
            var lin = 1;
            for (var i in this.tablafact_SER451) {
              if (parseInt(this.tablafact_SER451[i].VLR_FACT) >= 0) {
                data[`FACT-${lin.toString().padStart(3,'0')}`] = `${this.tablafact_SER451[i].FECHA_FACT}|${this.tablafact_SER451[i].VLR_FACT.replace(/,/g,'').trim().padStart(15,'0')}`
                lin++
              }
            }
            lin = 1;
            for (var i in this.tablaabon_SER451) {
              if (parseInt(this.tablaabon_SER451[i].VLR_ABON) >= 0) {
                console.log(this.tablaabon_SER451[i]);
                data[`ABON-${lin.toString().padStart(3, "0")}`] = `${this.tablaabon_SER451[i].FECHA_ABON}|${
                  this.tablaabon_SER451[i].SECU_ABON
                }|${this.tablaabon_SER451[i].VLR_ABON.replace(/,/g, "").padStart(15, "0")}`;
                lin++;
              } else if (localStorage.Usuario == "GEBC") {
                data[`ABON-${lin.toString().padStart(3, "0")}`] = `${this.tablaabon_SER451[i].FECHA_ABON}|${
                  this.tablaabon_SER451[i].SECU_ABON
                }|${this.tablaabon_SER451[i].VLR_ABON.replace(/,/g, "")}`;
                lin++;
              }
            }
            console.log(data);
            postData(data,
            get_url("APP/SALUD/SER451.DLL"))
            .then((data) => {
                console.log(data);
                // CON851('39','39',_toggleNav(),'success','Exito');
                this._evaluarnumerofactura_SER451();
            })
            .catch(error => {
                console.error(error);
                this._evaluarnumerofactura_SER451();
            });
          })
        },
      )
    },
  },
});

var prefijoMask_SER451 = IMask($('#prefijo_SER451')[0], {
  mask: 'a',
  prepare: function (str) {
      return str.toUpperCase()
  },
  commit: function (value, masked) {
      masked._value = value.toLowerCase()
  }
});
var numerofacturaMask_SER451 = IMask($('#numerofactura_SER451')[0], { mask: Number });
var añofacturadoMask_SER451 = IMask($('#añofacturado_SER451')[0], { mask: Number });
var mesfacturadoMask_SER451 = IMask($('#mesfacturado_SER451')[0], { mask: Number });
var vlrfacturadoMask_SER451 = IMask($('#vlrfacturado_SER451')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var añoabonoMask_SER451 = IMask($('#añoabono_SER451')[0], { mask: Number });
var mesabonoMask_SER451 = IMask($('#mesabono_SER451')[0], { mask: Number });
var diaabonoMask_SER451 = IMask($('#diaabono_SER451')[0], { mask: Number });
var numerosecuenciaMask_SER451 = IMask($('#numerosecuencia_SER451')[0], { mask: Number });
var secuenciaMask_SER451 = IMask($('#secsecuencia_SER451')[0], { mask: Number });
var vlrabonosMask_SER451 = IMask($("#vlrabono_SER451")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
  signed: true
});
var copagosMask_SER451 = IMask($('#copagos_SER451')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });