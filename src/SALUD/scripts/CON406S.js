new Vue({
  el: "#CON406S",
  data: {
    CON406S: [],
    form: {
      lote1_CON406S: "",
      lote2_CON406S: "",
      dia_CON406S: "",
      operador_CON406S: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("3,6,7 - Relacion de recibos de caja");
    this.CON406S.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    this.CON406S.MESANO = this.CON406S.FECHA_LNK.substring(0, 4)
    var $_this = this;
    obtenerDatosCompletos({nombreFd: "LOTES"}, data => {
      console.log(data);
      data.LOTES.pop();
      this.CON406S.LOTES = data.LOTES;
      obtenerDatosCompletos({nombreFd: "OPERADOR"}, data => {
        data.ARCHREST.pop();
        $_this.CON406S.OPERADORES = data.ARCHREST;
        loader("hide");
        $_this._evaluarlote1_CON406S();
      });
    });
  },
  methods: {
    _evaluarlote1_CON406S() {
      if (this.form.lote1_CON406S == "") {
        this.form.lote1_CON406S = "*";
        this.form.lote2_CON406S = "R";
      }
      validarInputs(
        {
          form: "#VALIDAR1_CON406S",
          orden: "1",
        },
        _toggleNav,
        () => {
          if (this.form.lote1_CON406S.trim() == "" || this.form.lote1_CON406S == "0") CON851("49", "49", this._evaluarlote1_CON406S(), "error", "Error");
          else this._evaluarlote2_CON406S();
        },
      );
    },
    _evaluarlote2_CON406S() {
      validarInputs(
        {
          form: "#VALIDAR2_CON406S",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.CON406S.LOTEW = this.form.lote1_CON406S + this.form.lote2_CON406S;
          if (this.CON406S.LOTEW == "1F" || this.CON406S.LOTEW == "30" || this.CON406S.LOTEW == "40" || this.CON406S.LOTEW == "50") {
            CON851("49", "49", this._evaluarlote1_CON406S(), "error", "Error");
          } else {
            if (this.form.lote1_CON406S.trim() != "*") {
              let lote = this.CON406S.LOTES.filter(x => x.LOTE == this.CON406S.LOTEW);
              console.log(lote);
              if (lote.length > 0) {
                this._evaluarfecha_CON406S();
                if (lote.PREFIJO.trim() == "") {
                  this.CON406S.PREFIJO = $_USUA_GLOBAL[0].PREFIJ;
                }
              } else {
                CON851("01", "01", this._evaluarlote1_CON406S(), "error", "Error");
              }
            } else {
              this._evaluarfecha_CON406S();
            }
          }
        },
      );
    },
    _evaluarfecha_CON406S() {
      validarInputs(
        {
          form: "#VALIDAR3_CON406S",
          orden: "1",
        },
        this._evaluarlote2_CON406S,
        () => {
          if (parseInt(this.form.dia_CON406S) == 0 || parseInt(this.form.dia_CON406S) == 99) {
            this.form.operador_CON406S = "****";
            this.form.descripoperador_CON406S = "TODOS LOS OPERADORES";
            this._evaluarpresupuesto_CON406S();
          } else {
            postData(
              {
                datosh: datosEnvio() + "1|" + this.form.dia_CON406S.padStart(2, "0") + "|",
              },
              get_url("APP/SALUD/CON406S.DLL"),
            )
              .then(data => {
                console.log(data);
                this._evaluaroperador_CON406S();
              })
              .catch(error => {
                this._evaluarfecha_CON406S();
              });
          }
        },
      );
    },
    _evaluaroperador_CON406S() {
      if (this.form.operador_CON406S.trim() == "") this.form.operador_CON406S = "****";
      validarInputs(
        {
          form: "#VALIDAR4_CON406S",
          orden: "1",
        },
        this._evaluarfecha_CON406S,
        () => {
          if (this.form.operador_CON406S.trim() == "****") {
            this.form.descripoperador_CON406S = "TODOS LOS OPERADORES";
            this._impresion_CON406S();
          } else {
            postData(
              {
                datosh: datosEnvio() + localStorage.getItem("Usuario") + "|",
              },
              get_url("APP/CONTAB/CON003.DLL"),
            )
              .then(data => {
                data = data.split("|");
                if (data[0].trim() == "") CON851("01", "01", this._evaluaroperador_CON406S(), "error", "Error");
                else this._evaluarpresupuesto_CON406S();
              })
              .catch(error => {
                this._evaluaroperador_CON406S();
              });
          }
        },
      );
    },
    _evaluarpresupuesto_CON406S(){
      validarInputs(
        {
          form: "#VALIDAR5_CON406S",
          orden: "1",
        },
        this._evaluaroperador_CON406S,
        () => {
          if (presupuestoMask_CON406S.value.trim() == 'S' || presupuestoMask_CON406S.value.trim() == 'N') {
            this._impresion_CON406S();
          } else {
            CON851('','Debe digitar S o N',null, 'error', 'Error')
            presupuestoMask_CON406S.typedValue = 'N';
            this._evaluarpresupuesto_CON406S();
          }
        },
      );
    },
    _impresion_CON406S() {
      postData(
        {
          datosh: datosEnvio() + "3|" + this.form.dia_CON406S.padStart(2, "0") + "|" + this.form.lote1_CON406S.trim() + this.form.lote2_CON406S.trim() + "|" + this.form.operador_CON406S.trim() + "|" + localStorage.getItem("Usuario") + "|" + presupuestoMask_CON406S.value.trim() + '|',
        },
        get_url("APP/SALUD/CON406S.DLL"),
      )
        .then(data => {
          data = data.DATOS;
          console.log(data);
          var impresion = [];
          if (data.length > 0) {
            if (this.form.dia_CON406S == 0) {
              var totalingreso = totalneto = descuentos = cultura = 0;
              for (var i in data) {
                let y = parseInt(i) + 1;
                if (y < data.length - 1) {
                  if (data[i].COMPROBANTES.FECHA == data[y].COMPROBANTES.FECHA) {
                    let ingreso = parseInt(data[i].COMPROBANTES.VALOR_INGRESO);
                    let neto = parseInt(data[i].COMPROBANTES.VALOR_NETO);
                    let dscto = parseInt(data[i].COMPROBANTES.DESCUENTOS);
                    let pro_cultura = parseInt(data[i].COMPROBANTES.PRO_CULTURA);
                    if (isNaN(ingreso)) ingreso = 0;
                    if (isNaN(neto)) neto = 0;
                    if (isNaN(dscto)) dscto = 0;
                    if (isNaN(pro_cultura)) pro_cultura = 0;
                    totalingreso = totalingreso + ingreso;
                    totalneto = totalneto + neto;
                    descuentos = descuentos + dscto;
                    cultura = cultura + pro_cultura;
                    impresion.push(data[i].COMPROBANTES);
                  } else {
                    impresion.push(data[i].COMPROBANTES);
                    impresion.push({COMPROBANTE:'', FECHA:'',CTA_PRESUPUESTO:'',DESCUENTOS:descuentos,FACTURA:'',PRO_CULTURA:cultura,TERCERO:'TOTAL',VALOR_INGRESO:totalingreso,VALOR_NETO:totalneto});
                    var unico = 0;
                    console.log(unico);
                    // for (var x = 0; x < i; x++) {
                    //   console.log(x);
                    //   if (data[x].RESUMEN.CONCEPTO.trim() != '') {
                    //     impresion.push({COMPROBANTE:data[x].RESUMEN.RUBRO, FECHA:data[x].RESUMEN.CONCEPTO,CTA_PRESUPUESTO:'',DESCUENTOS:'',FACTURA:'',PRO_CULTURA:'',TERCERO:data[x].RESUMEN.VALOR,VALOR_INGRESO:'',VALOR_NETO:''});
                    //   }
                    // }
                    // unico = 0;
                    // for (var x = 0; x < i; x++) {
                    //   console.log(x);
                    //   if (data[x].RESUMEN.CONCEPTO.trim() != '' && unico == 1) {
                    //     impresion.push({COMPROBANTE:data[x].RESUMENNIT.RUBRO, FECHA:data[x].RESUMENNIT.CONCEPTO,CTA_PRESUPUESTO:'',DESCUENTOS:'',FACTURA:'',PRO_CULTURA:'',TERCERO:data[x].RESUMENNIT.TERCERO,VALOR_INGRESO:data[x].RESUMENNIT.VALOR,VALOR_NETO:''});
                    //     unico = 1;
                    //   }
                    // }
                  }
                }
              }
              // for (var i in data) {
              //   let y = parseInt(i) + 1;
              //   if (y < data.length - 1) {
              //     if (data[i].RESUMEN.CONCEPTO.trim() != '') {
              //       impresion.push({COMPROBANTE:data[i].RESUMEN.RUBRO, FECHA:data[i].RESUMEN.CONCEPTO,CTA_PRESUPUESTO:'',DESCUENTOS:'',FACTURA:'',PRO_CULTURA:'',TERCERO:data[i].RESUMEN.VALOR,VALOR_INGRESO:'',VALOR_NETO:''});
              //     } else {
              //       impresion.push({COMPROBANTE:'', FECHA:'',CTA_PRESUPUESTO:'',DESCUENTOS:'',FACTURA:'',PRO_CULTURA:'',TERCERO:'',VALOR_INGRESO:'',VALOR_NETO:''});
              //       impresion.push({COMPROBANTE:'', FECHA:'',CTA_PRESUPUESTO:'',DESCUENTOS:descuentos,FACTURA:'',PRO_CULTURA:cultura,TERCERO:'TOTAL',VALOR_INGRESO:totalingreso,VALOR_NETO:totalneto});
              //     }
              //   }
              // }
              console.log(impresion);
            } else {
              var totalingreso = totalneto = descuentos = cultura = 0;
              for (var i in data) {
                if (i < data.length - 1) {
                  let ingreso = parseInt(data[i].COMPROBANTES.VALOR_INGRESO);
                  let neto = parseInt(data[i].COMPROBANTES.VALOR_NETO);
                  let dscto = parseInt(data[i].COMPROBANTES.DESCUENTOS);
                  let pro_cultura = parseInt(data[i].COMPROBANTES.PRO_CULTURA);
                  if (isNaN(ingreso)) ingreso = 0;
                  if (isNaN(neto)) neto = 0;
                  if (isNaN(dscto)) dscto = 0;
                  if (isNaN(pro_cultura)) pro_cultura = 0;
                  totalingreso = totalingreso + ingreso;
                  totalneto = totalneto + neto;
                  descuentos = descuentos + dscto;
                  cultura = cultura + pro_cultura;
                  impresion.push(data[i].COMPROBANTES);
                  if (i == data.length - 2) {
                    impresion.push({COMPROBANTE:'', FECHA:'',CTA_PRESUPUESTO:'',DESCUENTOS:descuentos.toString(),FACTURA:'',PRO_CULTURA:cultura.toString(),TERCERO:'TOTAL',VALOR_INGRESO:totalingreso.toString(),VALOR_NETO:totalneto.toString()});
                  }
                }
              }
              var resumen = 0;
              impresion.push({COMPROBANTE:'', FECHA:'',CTA_PRESUPUESTO:'',DESCUENTOS:'',FACTURA:'',PRO_CULTURA:'',TERCERO:'',VALOR_INGRESO:'',VALOR_NETO:''});
              impresion.push({COMPROBANTE:'RUBRO', FECHA:"CONCEPTO",CTA_PRESUPUESTO:'',DESCUENTOS:'',FACTURA:'',PRO_CULTURA:'',TERCERO:"VALOR",VALOR_INGRESO:'',VALOR_NETO:''});
              for (var i in data) {
                let y = parseInt(i) + 1;
                if (y < data.length - 1) {
                  if (data[i].RESUMEN.CONCEPTO.trim() != '') {
                    impresion.push({COMPROBANTE:data[i].RESUMEN.RUBRO, FECHA:data[i].RESUMEN.CONCEPTO,CTA_PRESUPUESTO:'',DESCUENTOS:'',FACTURA:'',PRO_CULTURA:'',TERCERO:data[i].RESUMEN.VALOR,VALOR_INGRESO:'',VALOR_NETO:''});
                    resumen++;
                  }
                }
              }
              console.log(impresion);
            }
            columnas = [
              {
                title: "RUBRO",
                value: 'CTA_PRESUPUESTO',
              },
              {
                title: "FECHA",
                value: 'FECHA',
              },
              {
                title: "COMPROBANTE",
                value: 'COMPROBANTE',
                format:'string',
              },
              {
                title: "TERCERO",
                value: 'TERCERO',
              },
              {
                title: "VALOR INGRESO",
                value: 'VALOR_INGRESO',
                format: 'money',
              },
              {
                title: "CULTURA",
                value: 'PRO_CULTURA',
              },
              {
                title: "DESCUENTOS",
                value: 'DESCUENTOS',
              },
              {
                title: "VALOR NETO",
                value: 'VALOR_NETO',
                format: 'money',
              },
              {
                title: "OPERADOR ELABORO",
                value: 'OPER_ELAB',
              },
              {
                title: "VALOR NETO",
                value: 'OPER_MOD',
              }
            ]
            _impresion2({
              tipo: 'excel',
              header: [
                { text: `${$_USUA_GLOBAL[0].NOMBRE}` + 'NIT: ' + `${$_USUA_GLOBAL[0].NIT}`, bold: true, size: 16 },
                `RELACION DE RECIBOS DE CAJA POR EL LOTE ${this.form.lote1_CON406S}${this.form.lote2_CON406S} - ${ this.CON406S.MESANO}${ this.form.dia_CON406S.padStart(2, "0") }`,
                `  `
              ],
              logo: `${$_USUA_GLOBAL[0].NIT}.png`,
              ruta_logo: 'P:\\PROG\\LOGOS\\',
              tabla: {
                columnas,
                data: impresion,
              },
              archivo: 'LISTADO-DE-RESUMEN' + `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
            })
              .then(() => {
                loader("hide");
                CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
              })
              .catch(() => {
                loader("hide");
                CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
              })
          } else {
            CON851("", "No hay ningun movimeinto", this._evaluarlote1_CON406S(), "error", "Error");
          }
        })
        .catch(error => {
          console.error(error);
          this._evaluarfecha_CON406S();
        });
    },
  },
});


var presupuestoMask_CON406S = IMask($("#presupuesto_CON406S")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
