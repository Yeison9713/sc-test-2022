// 15/10/20 - DIANA ESCOBAR: CREADO
new Vue({
  el: "#SERA04",
  data: {
    SERA04: [],
    form: {
      prefijo_SERA04: "",
      factura_SERA04: "",
      entidad_SERA04: "",
      decripentidad_SERA04: "",
      paciente_SERA04: "",
      decrippaci_SERA04: "",
      radicado_SERA04: "",
      anolistarini_SERA04: "",
      meslistarini_SERA04: "",
      dialistarini_SERA04: "",
      anolistarfin_SERA04: "",
      meslistarfin_SERA04: "",
      dialistarfin_SERA04: "",
      // totalfact_SERA04: "",
      totalglosa_SERA04: "",
      totalsopor_SERA04: "",
      totalacep_SERA04: "",
      valorrecobro_SERA04: "",
      responsable_SERA04: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,4 - Imprimir respuesta de glosas");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;
    $_this.SERA04.FECHAINIW = '00000000'
    $_this.SERA04.FECHAFINW = '00000000'
    $_this.SERA04.FECHAACTUAL = moment().format("YYYYMMDD");
    $_this.SERA04.ANOACTUALW = $_this.SERA04.FECHAACTUAL.substring(0, 4);
    $_this.SERA04.MESACTUALW = $_this.SERA04.FECHAACTUAL.substring(4, 6);
    $_this.SERA04.DIAACTUALW = $_this.SERA04.FECHAACTUAL.substring(6, 8);
    obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
      data = data.FIRMAS[0];
      console.log(data)
      $_this.SERA04.FIRMAS = data;
    })
    setTimeout(() => {
      $_this._validarprefijo_SERA04();
      loader("hide");
    }, 50);
  },
  methods: {
    _validarprefijo_SERA04() {
      this.form.prefijo_SERA04 = "";
      this.form.factura_SERA04 = "";
      this.form.entidad_SERA04 = "";
      this.form.decripentidad_SERA04 = "";
      this.form.paciente_SERA04 = "";
      this.form.decrippaci_SERA04 = "";
      this.form.radicado_SERA04 = "";
      this.form.anolistarini_SERA04 = "";
      this.form.meslistarini_SERA04 = "";
      this.form.dialistarini_SERA04 = "";
      this.form.anolistarfin_SERA04 = "";
      this.form.meslistarfin_SERA04 = "";
      this.form.dialistarfin_SERA04 = "";
      totalfactMask_SERA04.typedValue = "";
      this.form.totalglosa_SERA04 = "";
      this.form.totalsopor_SERA04 = "";
      this.form.totalacep_SERA04 = "";
      this.form.valorrecobro_SERA04 = "";
      this.form.responsable_SERA04 = "";
      motivoMask_SERA04.typedValue = "";
      validarInputs(
        {
          form: "#validarprefijo_SERA04",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.form.prefijo_SERA04 = this.form.prefijo_SERA04.toUpperCase();
          if (this.form.prefijo_SERA04 != "E" && this.form.prefijo_SERA04 != "C" && this.form.prefijo_SERA04 != "Ñ" && this.form.prefijo_SERA04 != "U") {
            if (this.form.prefijo_SERA04 == "*") {
              this._evaluarentidad_SERA04();
            } else {
              this._evaluarnrofact_SERA04();
            }
          } else {
            CON851("", "Prefijo incorrecto! ", null, "error", "error");
            this._validarprefijo_SERA04();
          }
        },
      );
    },
    _evaluarnrofact_SERA04() {
      this.form.radicado_SERA04 = "*";
      validarInputs(
        {
          form: "#validarfact_SERA04",
          orden: "1",
        },
        this._validarprefijo_SERA04,
        () => {
          if (this.form.factura_SERA04.trim() == "") {
            CON851("02", "02", this._evaluarnrofact_SERA04(), "error", "error");
          } else {
            postData({ datosh: datosEnvio() + this.form.prefijo_SERA04.trim() + this.form.factura_SERA04.padStart(6, "0") + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
              .then(data => {
                this.SERA04.FACTURA = data.NUMER19[0];
                this.form.entidad_SERA04 = this.SERA04.FACTURA.NIT_NUM;
                this.form.decripentidad_SERA04 = this.SERA04.FACTURA.DESCRIP_NUM;
                if (
                  this.form.prefijo_SERA04 == "A" ||
                  this.form.prefijo_SERA04 == "P" ||
                  this.form.prefijo_SERA04 == "T" ||
                  this.form.prefijo_SERA04 == "B" ||
                  this.form.prefijo_SERA04 == "D" ||
                  this.form.prefijo_SERA04 == "F" ||
                  this.form.prefijo_SERA04 == "G" ||
                  this.form.prefijo_SERA04 == "H" ||
                  this.form.prefijo_SERA04 == "I" ||
                  this.form.prefijo_SERA04 == "J" ||
                  this.form.prefijo_SERA04 == "K" ||
                  this.form.prefijo_SERA04 == "L" ||
                  this.form.prefijo_SERA04 == "M" ||
                  this.form.prefijo_SERA04 == "N" ||
                  this.form.prefijo_SERA04 == "O" ||
                  this.form.prefijo_SERA04 == "Q" ||
                  this.form.prefijo_SERA04 == "R" ||
                  this.form.prefijo_SERA04 == "S" ||
                  this.form.prefijo_SERA04 == "V" ||
                  this.form.prefijo_SERA04 == "W" ||
                  this.form.prefijo_SERA04 == "X" ||
                  this.form.prefijo_SERA04 == "Y" ||
                  this.form.prefijo_SERA04 == "Z" ||
                  this.form.prefijo_SERA04 == "*"
                ) {
                  this._evaluarpaciente_SERA04();
                } else {
                  this._sumarfact_SERA04();
                }
              })
              .catch(err => {
                console.error(err);
                this._evaluarnrofact_SERA04();
              });
          }
        },
      );
    },
    _evaluarpaciente_SERA04() {
      if (this.form.paciente_SERA04.trim() == "") this.form.paciente_SERA04 = "000000000000099";
      validarInputs(
        {
          form: "#validarpaciente_SERA04",
          orden: "1",
        },
        this._evaluarnrofact_SERA04,
        () => {
          if (this.form.paciente_SERA04 == "000000000000099") {
            this.form.decrippaci_SERA04 = "TODOS LOS PACIENTES";
            this._sumarfact_SERA04();
          } else {
            postData({ datosh: datosEnvio() + this.form.paciente_SERA04 + "|" }, get_url("APP/SALUD/SER810-1.DLL"))
              .then(data => {
                SERA04.PACIENTE = data["REG-PACI"];
                this.form.decrippaci_SERA04 = SERA04.PACIENTE[0]["DESCRIP"].trim();
                this._sumarfact_SERA04();
              })
              .catch(err => {
                console.error(err);
                this._evaluarpaciente_SERA04();
              });
          }
        },
      );
    },
    _sumarfact_SERA04() {
      let vlr = 0;
      for (var i in this.SERA04.FACTURA.TABLA_FACT) {
        let vlrfact = 0;
        vlrfact = parseFloat(this.SERA04.FACTURA.TABLA_FACT[i].VLR_FACT);
        if (isNaN(vlrfact)) vlrfact = 0;
        vlr = vlrfact + vlr;
      }
      totalfactMask_SERA04.typedValue = vlr.toString();
      postData({ datosh: datosEnvio() + "1|" + this.form.prefijo_SERA04.trim() + this.form.factura_SERA04.padStart(6, "0") + "|" }, get_url("APP/SALUD/SER-A04.DLL"))
        .then(data => {
          console.log(data, "VALORES");
          this.SERA04.VALORES = data.VALORES[0];
          console.log(this.SERA04.VALORES);
          this.form.totalglosa_SERA04 = valores_SERA04(this.SERA04.VALORES.VLRGLOSA);
          this.form.totalsopor_SERA04 = valores_SERA04(this.SERA04.VALORES.VLRRESP);
          this.form.totalacep_SERA04 = valores_SERA04(this.SERA04.VALORES.VLRACEPT);
          CON851P("00", this._validarprefijo_SERA04, this._evaluarmotivo_SERA04);
        })
        .catch(err => {
          console.error(err);
          this._evaluarpaciente_SERA04();
        });
    },
    _evaluarentidad_SERA04() {
      this.form.paciente_SERA04 = "000000000000099";
      validarInputs(
        {
          form: "#validarentidad_SERA04",
          orden: "1",
        },
        this._validarprefijo_SERA04,
        () => {
          if (this.form.entidad_SERA04.trim() == "" || this.form.entidad_SERA04 == "0000000000") {
            CON851("02", "02", this._evaluarentidad_SERA04(), "error", "error");
          } else {
            this.SERA04.CODTERCERO = this.form.entidad_SERA04.toString().padStart(10, "0");
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData(
              {
                datosh: datosEnvio() + this.SERA04.CODTERCERO + "|",
              },
              URL,
            )
              .then(data => {
                this.SERA04.TERCEROS = data.TERCER[0];
                this.form.decripentidad_SERA04 = this.SERA04.TERCEROS.DESCRIP_TER.trim();
                this._evaluarradicado_SERA04();
              })
              .catch(error => {
                this._evaluarentidad_SERA04();
              });
          }
        },
      );
    },

    _evaluarradicado_SERA04() {
      console.log("radicado");
      if (this.form.radicado_SERA04.trim() == "") this.form.radicado_SERA04 = "*";
      validarInputs(
        {
          form: "#validarradicado_SERA04",
          orden: "1",
        },
        this._evaluarentidad_SERA04,
        () => {
          this.SERA04.rad1 = this.form.radicado_SERA04.substring(0, 1);
          this.SERA04.rad2 = this.form.radicado_SERA04.substring(1, 20);
          if (this.SERA04.rad1 == "*") {
            this._evaluarfechaini_SERA04("1");
          } else {
            postData({ datosh: datosEnvio() + "2| |" + this.form.radicado_SERA04 + "|" }, get_url("APP/SALUD/SER-A04.DLL"))
              .then(data => {
                this._evaluarfechaini_SERA04("1");
              })
              .catch(err => {
                console.error(err);
                this._evaluarradicado_SERA04();
              });
          }
        },
      );
    },

    _evaluarfechaini_SERA04(orden) {
      if (this.form.meslistarini_SERA04.trim() == "" || this.form.meslistarfin_SERA04.trim() == "") {
        this.form.anolistarini_SERA04 = this.SERA04.ANOACTUALW;
        this.form.meslistarini_SERA04 = this.SERA04.MESACTUALW;
        this.form.dialistarini_SERA04 = this.SERA04.DIAACTUALW;
        this.form.anolistarfin_SERA04 = this.SERA04.ANOACTUALW;
        this.form.meslistarfin_SERA04 = this.SERA04.MESACTUALW;
        this.form.dialistarfin_SERA04 = this.SERA04.DIAACTUALW;
      }
      validarInputs(
        {
          form: "#fechalistarInicial_SERA04",
          orden: orden,
        },
        this._evaluarentidad_SERA04,
        () => {
          if (this.form.anolistarini_SERA04.trim() == "" || this.form.anolistarini_SERA04 < 1990) {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_SERA04("1"), "error", "error");
          } else {
            this.form.meslistarini_SERA04 = this.form.meslistarini_SERA04.padStart(2, "0");
            if (this.form.meslistarini_SERA04.trim() == "" || this.form.meslistarini_SERA04 == "00" || this.form.meslistarini_SERA04 < 1 || this.form.meslistarini_SERA04 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_SERA04("2"), "error", "error");
            } else {
              this.form.dialistarini_SERA04 = this.form.dialistarini_SERA04.padStart(2, "0");
              if (this.form.dialistarini_SERA04.trim() == "" || this.form.dialistarini_SERA04 == "00" || this.form.dialistarini_SERA04 < 1 || this.form.dialistarini_SERA04 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_SERA04("3"), "error", "error");
              } else {
                this.SERA04.FECHAINIW = this.form.anolistarini_SERA04 + this.form.meslistarini_SERA04 + this.form.dialistarini_SERA04;
                this._evaluarfechafin_SERA04("1");
              }
            }
          }
        },
      );
    },
    _evaluarfechafin_SERA04(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_SERA04",
          orden: orden,
        },
        () => {
          this._evaluarfechaini_SERA04("3");
        },
        () => {
          if (this.form.anolistarfin_SERA04.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechafin_SERA04("1"), "error", "error");
          } else {
            this.form.meslistarfin_SERA04 = this.form.meslistarfin_SERA04.padStart(2, "0");
            if (this.form.meslistarfin_SERA04.trim() == "" || this.form.meslistarfin_SERA04 == "00" || this.form.meslistarfin_SERA04 < 1 || this.form.meslistarfin_SERA04 > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechafin_SERA04("2"), "error", "error");
            } else {
              this.form.dialistarfin_SERA04 = this.form.dialistarfin_SERA04.padStart(2, "0");
              if (this.form.dialistarfin_SERA04.trim() == "" || this.form.dialistarfin_SERA04 == "00" || this.form.dialistarfin_SERA04 < 1 || this.form.dialistarfin_SERA04 > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechafin_SERA04("3"), "error", "error");
              } else {
                this.SERA04.FECHAFINW = this.form.anolistarfin_SERA04 + this.form.meslistarfin_SERA04 + this.form.dialistarfin_SERA04;
                if (this.SERA04.FECHAFINW < this.SERA04.FECHAINIW) {
                  CON851("37", "37", this._evaluarfechafin_SERA04("1"), "error", "error");
                } else {
                  CON851P("00", this._validarprefijo_SERA04, this._evaluarmotivo_SERA04);
                }
              }
            }
          }
        },
      );
    },
    _evaluarmotivo_SERA04() {
      validarInputs(
        {
          form: "#validarmotivo_SERA04",
          orden: "1",
        },
        () => {
          if (this.form.factura_SERA04 != "") {
            this._evaluarnrofact_SERA04();
          } else {
            this._evaluarfechafin_SERA04("3");
          }
        },
        () => {
          if (motivoMask_SERA04.value.trim() == "") motivoMask_SERA04.typedValue = "N";
          this._evaluarimpresion_SERA04();
        },
      );
    },
    _evaluarimpresion_SERA04() {
      console.log("_evaluarimpresion_SERA04");
      loader("show");
      postData({ datosh: datosEnvio() + "3|" + this.form.prefijo_SERA04.trim() + this.form.factura_SERA04.padStart(6, "0") + "|" + this.form.radicado_SERA04 + "|" + this.form.entidad_SERA04.padStart(10, "0") + "|" + this.form.paciente_SERA04 + "|" + this.SERA04.FECHAINIW + "|" + this.SERA04.FECHAFINW + "|" + motivoMask_SERA04.value + "|" }, get_url("APP/SALUD/SER-A04.DLL"))
        .then(data => {
          console.log(data.RESPUESTA, "RESPUESTA IMPRESION");
          this.SERA04.TABLARESP = data.RESPUESTA
          this.SERA04.TABLARESP.pop()
          if(this.SERA04.TABLARESP.length == 0){
            loader("hide");
            CON851("", "Glosa no tiene estado 2", this._validarprefijo_SERA04(), "error", "error");
          }else{
            this.SERA04.TOTALES = data.TOTALES
            this.SERA04.RESPUESTA = data.RESPUESTA[0];
            $_this = this
            console.log('SEGUNDA IMPRESION')
            let impresionrespuesta = {
              pageMargins: [38, 100, 15, 50],
              pageSize: "A4",
              header: function (currentPage, pageCount, pageSize) {
                return {
                  margin: [35, 30, 35, 0],
                  stack: [
                    {
                      fontSize: 11,
                      bold: true,
                      alignment: 'center',
                      table: {
                        widths: ['20%', '80%'],
                        heights: [30, 10],
                        body: [
                          [
                            {
                              margin: [0, 2, 0, 0],
                              rowSpan: 2,
                              stack: [
                                {
                                  image: 'logo',
                                  width: 60,
                                  height: 50
                                }
                              ],
                              width: '20%'
                            },
                            {
                              marginTop: 2,
                              stack: [
                                { text: $_USUA_GLOBAL[0].NOMBRE, style: "titulos3" },
                                { text: "NIT " + $_USUA_GLOBAL[0].NIT, style: "titulos3" },
                              ],
                            }
                          ],
                          [
                            {
                            },
                            {
                              marginTop: 6,
                              text: "INFORME RESPUESTA DE " + $_this.SERA04.RESPUESTA.TITULO, width: "18%", style: "titulos3"
                            }
                          ]
                        ]
                      }
                    },
                  ]
                }
              },
              content: [
                { text: " " },
                {
                  columns: [
                    { text: $_USUA_GLOBAL[0].NOMBRE_CIU, width: "10%", style: "textheadertitle" },
                    { text: $_this.SERA04.RESPUESTA.FECHA, width: "25%", style: "textheadertitle" },
                  ],
                },
                { text: " " },
                {
                  columns: [{ text: "Señores,", width: "25%", style: "textheadertitle" }],
                },
                {
                  columns: [
                    { text: $_this.SERA04.RESPUESTA.DESCRIPNIT, width: "25%", style: "textheadertitle" },
  
                  ],
                },
                {
                  columns: [{ text: "NIT", width: "5%", style: "textheadertitle" },
                  { text: parseInt($_this.SERA04.RESPUESTA.NITFACT), width: "25%", style: "textheadertitle" },],
                },
                {
                  columns: [
                    { text: $_this.SERA04.RESPUESTA.CIUDADNIT, width: "25%", style: "textheadertitle" },
  
                  ],
                },
                { text: " " },
              ],
              styles: {
                titulos1: {
                  alignment: "center",
                  fontSize: 15,
                },
                titulos2: {
                  alignment: "center",
                  fontSize: 14,
                  bold: true,
                },
                titulos3: {
                  alignment: "center",
                  fontSize: 11,
                  bold: true,
                },
                texto: {
                  fontSize: 8,
                },
                textheader: {
                  alignment: "rigth",
                  fontSize: 9,
                  bold: true,
                },
                textheader2: {
                  alignment: "rigth",
                  fontSize: 10,
                },
                textheadertitle: {
                  alignment: "rigth",
                  fontSize: 10,
                  bold: true,
                },
                titulotabla: {
                  fontSize: 9,
                  bold: true,
                },
              },
            };
            if (this.form.prefijo_SERA04 == "*") {
              for (var i in this.SERA04.TABLARESP) {
                if (this.SERA04.TABLARESP[i].MOTIVO.trim() != "") {
  
                  impresionrespuesta.content.push(
                    { text: " " },
                    {
                      columns: [
                        { text: "Asunto: ", width: "15%", style: "textheader" },
                        { text: "Respuesta a objeciones de la facturación", width: "45%", style: "textheader" },
                      ],
                    },
                    { text: " " },
                    { text: " " },
                    {
                      columns: [
                        { text: "Paciente: ", width: "15%", style: "textheadertitle" },
                        { text: $_this.SERA04.TABLARESP[i].IDPACI, width: "25%", style: "textheadertitle" },
                        { text: $_this.SERA04.TABLARESP[i].APEL1 + " " + $_this.SERA04.TABLARESP[i].APEL2, width: "17%", style: "textheadertitle" },
                        { text: $_this.SERA04.TABLARESP[i].NOMB1 + " " + $_this.SERA04.TABLARESP[i].NOMB2, width: "17%", style: "textheadertitle" },
                      ],
                    },
                    {
                      columns: [
                        { text: "FACTURA: ", width: "12%", style: "textheadertitle" },
                        { text: $_this.SERA04.TABLARESP[i].FACTURA, width: "15%", style: "titulos3" },
                        { text: "Radicado: ", width: "10%", style: "textheader2" },
                        { text: $_this.SERA04.TABLARESP[i].RADIC, width: "12%", style: "textheader2" },
                        { text: "Nro interno: ", width: "15%", style: "textheader2" },
                        { text: $_this.SERA04.TABLARESP[i].NRO_GLOSA, width: "12%", style: "textheader2" },
                        { text: "ANO:", width: "5%", style: "textheader2" },
                        { text: $_this.SERA04.TABLARESP[i].ANO_GLOSA, width: "15%", style: "textheader2" },
                      ],
                    },
                    { text: " " },
  
                    {
                      columns: [
                        { text: "Ref: ", width: "4%", style: "textheader2" },
                        { text: $_this.SERA04.TABLARESP[i].REFER, width: "15%", style: "texto" },
                        { text: "Motivo: ", width: "7%", style: "textheader2" },
                        { text: $_this.SERA04.TABLARESP[i].MOTIVO + " " + $_this.SERA04.TABLARESP[i].DESCRIP_MOT, width: "40%", style: "textheader2" },
                      ],
                    },
                    {
                      columns: [
                        { text: $_this.SERA04.TABLARESP[i].MOTIVO1, width: "85%", style: "textheader2" },
                        { text: $_this.SERA04.TABLARESP[i].MOTIVO2, width: "85%", style: "textheader2" },
                      ],
                    },
                    { text: " " },
                    {
                      columns: [
                        { text: $_this.SERA04.TABLARESP[i].RESPUEST1, width: "85%", style: "textheader2" },
                        { text: $_this.SERA04.TABLARESP[i].RESPUEST2, width: "85%", style: "textheader2" },
                      ],
                    },
                    { text: " " },
                    {
                      columns: [
                        { text: $_this.SERA04.TABLARESP[i].RESP, width: "9%", style: "textheadertitle" },
                        { text: "Vlr glosa:", width: "12%", style: "textheadertitle" },
                        { text: $_this.SERA04.TABLARESP[i].VLRGLOSA, width: "15%", style: "textheadertitle" },
                        { text: "Vlr aceptado:", width: "12%", style: "textheadertitle" },
                        { text: $_this.SERA04.TABLARESP[i].VLRACEP, width: "15%", style: "textheadertitle" },
                        { text: "Vlr soportado:", width: "12%", style: "textheadertitle" },
                        { text: $_this.SERA04.TABLARESP[i].VLRRESP, width: "15%", style: "textheadertitle" },
                      ],
                    },
                    { text: " " },
                  )
                }
              }
            } else {
              impresionrespuesta.content.push(
                { text: " " },
                {
                  columns: [
                    { text: "Asunto: ", width: "15%", style: "textheader" },
                    { text: "Respuesta a objeciones a la facturación", width: "45%", style: "textheader" },
                  ],
                },
                { text: " " },
                { text: " " },
                {
                  columns: [
                    { text: "Paciente: ", width: "15%", style: "textheadertitle" },
                    { text: parseInt($_this.SERA04.RESPUESTA.IDPACI), width: "15%", style: "textheadertitle" },
                    { text: $_this.SERA04.RESPUESTA.APEL1 + " " + $_this.SERA04.RESPUESTA.APEL2, width: "20%", style: "textheadertitle" },
                    { text: $_this.SERA04.RESPUESTA.NOMB1 + " " + $_this.SERA04.RESPUESTA.NOMB2, width: "20%", style: "textheadertitle" },
                  ],
                },
                {
                  columns: [
                    { text: "Radicado: ", width: "15%", style: "textheadertitle" },
                    { text: $_this.SERA04.RESPUESTA.RADIC, width: "15%", style: "textheader2" },
                    { text: "Nro interno: ", width: "15%", style: "textheadertitle" },
                    { text: $_this.SERA04.RESPUESTA.NRO_GLOSA, width: "12%", style: "textheader2" },
                    { text: "ANO:", width: "5%", style: "textheadertitle" },
                    { text: $_this.SERA04.RESPUESTA.ANO_GLOSA, width: "15%", style: "textheader2" },
                  ],
                },
              )
              for (var i in this.SERA04.TABLARESP) {
                if (this.SERA04.TABLARESP[i].MOTIVO.trim() != "") {
                  if (this.SERA04.TABLARESP[i].VLRGLOSA.trim() == '') this.SERA04.TABLARESP[i].VLRGLOSA = 0
                  if (this.SERA04.TABLARESP[i].VLRACEP.trim() == '') this.SERA04.TABLARESP[i].VLRACEP = 0
                  if (this.SERA04.TABLARESP[i].VLRRESP.trim() == '') this.SERA04.TABLARESP[i].VLRRESP = 0
  
                  impresionrespuesta.content.push(
                    {
                      columns: [
                        { text: "Ref: ", width: "15%", style: "textheadertitle" },
                        { text: this.SERA04.TABLARESP[i].REFER, width: "15%", style: "texto" },
                        { text: "Motivo: ", width: "7%", style: "textheadertitle" },
                        { text: this.SERA04.TABLARESP[i].MOTIVO + " " + this.SERA04.TABLARESP[i].DESCRIP_MOT, width: "40%", style: "textheader2" },
                      ],
                    },
                    {
                      columns: [
                        { text: "Objeción: ", width: "15%", style: "textheadertitle" },
                        { text: this.SERA04.TABLARESP[i].MOTIVO1, width: "80%", style: "textheader2" },
                      ],
                    },
                    {
                      columns: [
                        { text: "", width: "15%", style: "textheadertitle" },
                        { text: this.SERA04.TABLARESP[i].MOTIVO2, width: "80%", style: "textheader2" },
                      ],
                    },
                    { text: " " },
                    {
                      columns: [
                        { text: "Respuesta: ", width: "15%", style: "textheadertitle" },
                        { text: this.SERA04.TABLARESP[i].RESPUEST1, width: "80%", style: "textheader2" },
                      ],
                    },
                    {
                      columns: [
                        { text: "", width: "15%", style: "textheadertitle" },
                        { text: this.SERA04.TABLARESP[i].RESPUEST2, width: "80%", style: "textheader2" },
                      ],
                    },
                    { text: " " },
                    {
                      columns: [
                        { text: '', width: '3%', style: 'titulotabla' },
                        { text: 'Mot.', width: '11%', style: 'titulotabla' },
                        { text: 'No. Factura', width: '18%', style: 'titulotabla' },
                        { text: 'Vlr glosa', width: '20%', style: 'titulotabla' },
                        { text: 'Vlr aceptado', width: '20%', style: 'titulotabla' },
                        { text: 'Vlr soportado', width: '20%', style: 'titulotabla' },
  
                      ]
                    },
                    {
                      fontSize: 11,
                      bold: true,
                      alignment: 'center',
                      table: {
                        widths: [50, 70, 110, 110, 110],
                        body: [
                          [
                            {
                              marginTop: 2,
                              text: this.SERA04.TABLARESP[i].RESP, style: "textheadertable"
                            },
                            {
                              marginTop: 2,
                              text: this.SERA04.TABLARESP[i].FACTURA, style: "textheadertable"
                            },
                            {
                              marginTop: 2,
                              text: this.SERA04.TABLARESP[i].VLRGLOSA, style: "textheadertable"
                            },
                            {
                              marginTop: 2,
                              text: this.SERA04.TABLARESP[i].VLRACEP, style: "textheadertable"
                            },
                            {
                              marginTop: 2,
                              text: this.SERA04.TABLARESP[i].VLRRESP, style: "textheadertable"
                            }
                          ]
                        ]
                      }
                    }
                  )
                }
              }
            }
  
  
            /////////////////////fuera///////////////////////
            if (this.SERA04.TOTALES[0].TOTALGLOSA.trim() == '') this.SERA04.TOTALES[0].TOTALGLOSA = 0
            if (this.SERA04.TOTALES[0].TOTALACEP.trim() == '') this.SERA04.TOTALES[0].TOTALACEP = 0
            if (this.SERA04.TOTALES[0].TOTALRESP.trim() == '') this.SERA04.TOTALES[0].TOTALRESP = 0
            impresionrespuesta.content.push(
              { text: " " },
              {
                columns: [{ text: "Resumen general:", width: "40%", style: "textheadertitle" }],
              },
              { text: " " },
              { canvas: [{ type: "line", x1: 1, y1: 1, x2: 494, y2: 1, lineWidth: 1 }] },
              {
                columns: [
                  { text: this.SERA04.TOTALES[0].RESPTOTAL, width: "20%", style: "textheadertitle" },
                  { text: "Vlr glosa:", width: "8%", style: "textheadertitle" },
                  { text: this.SERA04.TOTALES[0].TOTALGLOSA, width: "13%", style: "textheadertitle" },
                  { text: "Vlr aceptado:", width: "11%", style: "textheadertitle" },
                  { text: this.SERA04.TOTALES[0].TOTALACEP, width: "13%", style: "textheadertitle" },
                  { text: "Vlr soportado:", width: "12%", style: "textheadertitle" },
                  { text: this.SERA04.TOTALES[0].TOTALRESP, width: "13%", style: "textheadertitle" },
                ], 
  
              },
              { text: " " },
              {
                columns: [{ text: "Atentamente:", width: "40%", style: "textheadertitle" }],
              },
              { text: " " },
              [
                {
                  image: "firma",
                  fit: [100, 40],
                },
              ],
              {
                columns: [
                  { text: "_______________________________", width: "50%", style: "textheadertitle" },
                  // { text: "_______________________________", width: "50%", style: "textheadertitle" },
                ],
              },
              {
                columns: [
                  { text: "", width: "80%", style: "textheadertitle" },
                  { text: "Audito:", width: "6%", style: "textheader2" },
                  { text: this.SERA04.RESPUESTA.OPERMOD, width: "10%", style: "textheader2" },
                ],
              },
              {
                columns: [
                  { text: this.SERA04.FIRMAS.NOMBRE_GERENTE, width: "50%", style: "textheadertitle" },
                  // { text: $_this.SERA04.RESPUESTA.FIRMA2, width: "50%", style: "textheadertitle" },
                ],
              },
              {
                columns: [
                  { text: "Gerente", width: "40%", style: "textheadertitle" },
                  // { text: $_this.SERA04.RESPUESTA.CARGO2, width: "40%", style: "textheadertitle" },
                ],
              },
            )
  
            impresionrespuesta.images = {
              logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png",
              firma: "P:\\PROG\\FIRMAS\\" + parseInt(this.SERA04.FIRMAS.DATOS_GER).toString() + ".png",
            };
            _impresion2({
              tipo: "pdf",
              content: impresionrespuesta,
              archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
            })
              .then(() => {
                loader("hide");
                _toggleNav();
              })
              .catch(err => {
                loader("hide");
                console.error(err);
                this._validarprefijo_SERA04();
              });
          }
          
        })
        .catch(err => {
          loader("hide");
          console.error(err);
          this._validarprefijo_SERA04();
        });
    },
    construirtablaimpresioneslineal(data, columns) {
      console.log(data, columns, 'TABLA DE IMPRESION ')
      return {
        table: {
          widths: [50, 70, 110, 110, 110],
          // heights: [25],
          body: this.buildTableBody2(data, columns)
        }
      };
    },
    buildTableBody2(data, columns) {
      console.log('SEGUNDA TABLA')
      var body = [];
      data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
          dataRow.push({ text: row[column].toString(), style: 'textheadertable' });
        })
        body.push(dataRow);
      });

      return body;
    },





    _f8numeracion_SERA04() {
      var $_this = this;
      parametros = {
        dll: "NUMERACION",
        valoresselect: ["Nombre del tercero", "buscar paciente"],
        f8data: "NUMERACION",
        columnas: [{ title: "COD" }, { title: "FECHA_ING" }, { title: "DESCRIP" }, { title: "NOM_PAC" }, { title: "CONVENIO" }, { title: "ESTADO" }],
        callback: data => {
          $_this.form.factura_SERA04 = data.COD.substring(1, 7);
          _enterInput(".numeracion_SERA04");
        },
        cancel: () => {
          _enterInput(".numeracion_SERA04");
        },
      };
      F8LITE(parametros);
    },
    _f8entidad_SERA04() {
      $_this = this;
      parametros = {
        dll: "TERCEROS",
        valoresselect: ["Buscar por nombre tercero"],
        f8data: "TERCEROS",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "DIRREC" }, { title: "TELEF" }, { title: "ACT" }],
        callback: data => {
          $_this.form.entidad_SERA04 = data.COD.trim();
          _enterInput(".entidad_SERA04");
        },
        cancel: () => {
          _enterInput(".entidad_SERA04");
        },
      };
      F8LITE(parametros);
    },

    _f8paciente_SERA04() {
      var $_this = this;
      let URL = get_url("APP/SALUD/SER810G.DLL");
      postData(
        {
          datosh: datosEnvio() + this.form.prefijo_SERA04 + this.form.factura_SERA04.trim().padStart(6, "0") + "|",
        },
        URL,
      )
        .then(data => {
          loader("hide");
          $_this.SERA04.COMPROB = data.COMPROBANTE;
          $_this.SERA04.COMPROB.pop();
          _ventanaDatos({
            titulo: "COMPROBANTES DE LA FACTURA " + this.form.prefijo_SERA04 + this.form.factura_SERA04.trim().padStart(6, "0"),
            columnas: ["ID", "PACIENTE", "FECHA", "COMPROBANTE", "CODIGO", "MEDICO", "VALOR"],
            data: $_this.SERA04.COMPROB,
            callback_esc: function () {
              $(".paciente_SERA04").focus();
            },
            callback: function (data) {
              console.log(data, "DATOS");
              $_this.form.paciente_SERA04 = data.ID.trim();
              _enterInput(".paciente_SERA04");
            },
          });
        })
        .catch(error => {
          console.log(error);
          this._evaluarpaciente_SERA04();
        });
    },

    _f8radicado_SERA04() {
      var $_this = this;
      let URL = get_url("APP/" + "SALUD/SER-A84" + ".DLL");
      postData(
        {
          datosh: datosEnvio() + this.form.entidad_SERA04.trim().padStart(10, "0") + "|",
        },
        URL,
      )
        .then(data => {
          console.log(data, "ENTIDAD");
          loader("hide");
          $_this.SERA04.GLOSASRAD = data.RADICGLOSAS;
          $_this.SERA04.GLOSASRAD.pop();
          _ventanaDatos({
            titulo: $_this.SERA04.GLOSASRAD.TERCERO,
            columnas: ["FACTURA", "NROGLOSA", "TERCERO", "FECHAGLO", "PACIENTE", "RADICADO"],
            data: $_this.SERA04.GLOSASRAD,
            callback_esc: function () {
              $(".radicado_SERA04").focus();
            },
            callback: function (data) {
              console.log(data, "DATOS");
              $_this.form.radicado_SERA04 = data.RADICADO.trim();
              _enterInput(".radicado_SERA04");
            },
          });
        })
        .catch(error => {
          console.log(error);
          this._evaluarradicado_SERA04();
        });
    },
  },
});
var valores_SERA04 = IMask.createPipe({
  mask: Number,
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});

var totalfactMask_SERA04 = IMask($("#totalfact_SERA04")[0], {
  mask: Number,
  thousandsSeparator: ",",
  scale: 2,
  radix: ".",
  thousandsSeparator: ",",
  normalizeZeros: true,
  padFractionalZeros: true,
});

var motivoMask_SERA04 = IMask($("#motivo_SERA04")[0], {
  mask: "a",
  definitions: {
    a: /[SN]/,
  },
  prepare: function (str) {
    if (str.trim() == "") {
      return false;
    } else {
      return str.toUpperCase();
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
