// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER449",
  data: {
    SER449: [],
    form: {
      nuir_SER449: "",
      codentidad_SER449: "",
      descripentidad_SER449: "",
      anoini_SER449: "",
      mesini_SER449: "",
      diaini_SER449: "",
      anofin_SER449: "",
      mesfin_SER449: "",
      diafin_SER449: "",
      pyp_SER449: "",
      tipousuario_SER449: "",
      codsucursal_SER449: "",
      descripsuc_SER449: "",
      unidadserv_SER449: "",
      capita_SER449: "",
      extrajero_SER449: "",
      ripsextrajero_SER449: "",
      droga_SER449: "",
      comprobantes_SER449: "",
      factura_SER449: "",
      saldo_SER449: "",
      diagnosticoIRA_SER449: "",
      discFechaAten_SER449: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,7,4,9 - Generando archivos planos sivigila");
    $_this = this;
    $_this.SER449.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER449.ANO_LNK = 20 + $_this.SER449.FECHA_LNK.substring(0, 2);
    $_this.SER449.MES_LNK = $_this.SER449.FECHA_LNK.substring(2, 4);
    $_this.SER449.DIA_LNK = $_this.SER449.FECHA_LNK.substring(4, 6);
    $_this.form.tipousuario_SER449 = '*'


    obtenerDatosCompletos({
      nombreFd: "SUCURSALES",
    },
      function (data) {
        $_this.SER449.SUCURSAL = data.SUCURSAL;
        // $_this.SER449.SUCURSAL.pop();
        loader("hide");
        $_this._evaluarnuir_SER449()
        obtenerDatosCompletos({
          nombreFd: 'UNSERV'
        }, function (data) {
          console.log(data, 'UNIDAD')
          $_this.SER449.UNISERVICIO = data.UNSERV;
          $_this.SER449.UNIDADSERVICIO = [];
          for (var i in $_this.SER449.UNISERVICIO) {
            if ($_this.SER449.UNISERVICIO[i].ESTADO.trim() == 'S') {
              $_this.SER449.UNIDADSERVICIO.push($_this.SER449.UNISERVICIO[i]);
            }
          }
        },
        );
      },
    );
  },
  methods: {
    _evaluarnuir_SER449() {
      if (this.form.nuir_SER449.trim() == '') this.form.nuir_SER449 = 'S'
      validarInputs({
        form: "#VALIDARNUIR_SER449",
        orden: "1"
      }, () => { _toggleNav() },
        () => {
          this.form.nuir_SER449 = this.form.nuir_SER449.toUpperCase();
          if (this.form.nuir_SER449 == 'S' || this.form.nuir_SER449 == 'N') {
            this._evaluarentidad_SER449()
          } else {
            CON851("03", "03", this._evaluarnuir_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluarentidad_SER449() {
      if (this.form.codentidad_SER449.trim() == '') this.form.codentidad_SER449 = '99'
      validarInputs(
        {
          form: "#VALIDARNIT_SER449",
          orden: '1'
        }, this._evaluarnuir_SER449,
        () => {
          if (this.form.codentidad_SER449 == '99') {
            this.form.descripentidad_SER449 = 'TODAS LAS ENTIDADES'
            this._evaluarfechaini_SER449('1')
          } else {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.codentidad_SER449 + "|",
            }, URL)
              .then(data => {
                this.SER449.TERCERO = data.TERCER[0]
                this.form.descripentidad_SER449 = this.SER449.TERCERO.DESCRIP_TER
                this._evaluarfechaini_SER449('1')
              }).catch(error => {
                console.error(error)
                _evaluarentidad_SER449()
              });
          }
        }
      )
    },
    _evaluarfechaini_SER449(orden) {
      this.form.anoini_SER449 = this.SER449.ANO_LNK
      this.form.mesini_SER449 = this.SER449.MES_LNK
      this.form.diaini_SER449 = '01'
      validarInputs(
        {
          form: "#fechaInicial_SER449",
          orden: orden
        },
        () => { this._evaluarentidad_SER449() },
        () => {
          if (this.form.anoini_SER449.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._validarfecha_SER449('1');
          } else {
            if (this.form.mesini_SER449.trim() == '' || this.form.mesini_SER449 < 01 || this.form.mesini_SER449 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._validarfecha_SER449('2');
            } else {
              if (this.form.diaini_SER449.trim() == '' || this.form.diaini_SER449 < 01 || this.form.diaini_SER449 > 31) {
                CON851('', 'dia incorrecto! ', this._validarfecha_SER449('3'), 'error', 'error');
              } else {
                this.SER449.FECHAINIW = this.form.anoini_SER449 + this.form.mesini_SER449 + this.form.diaini_SER449
                this._evaluarfechafin_SER449('1')
              }
            }
          }
        }
      )
    },
    _evaluarfechafin_SER449(orden) {
      this.form.anofin_SER449 = this.SER449.ANO_LNK
      this.form.mesfin_SER449 = this.SER449.MES_LNK
      this.form.diafin_SER449 = this.SER449.DIA_LNK
      validarInputs(
        {
          form: "#fechaFinal_SER449",
          orden: orden
        },
        () => { this._evaluarfechaini_SER449() },
        () => {
          if (this.form.anofin_SER449.trim() == '') {
            CON851('', 'Año incorrecto! ', null, 'error', 'error');
            this._evaluarfechafin_SER449('1');
          } else {
            if (this.form.mesfin_SER449.trim() == '' || this.form.mesfin_SER449 < 01 || this.form.mesfin_SER449 > 12) {
              CON851('', 'Mes incorrecto! ', null, 'error', 'error');
              this._evaluarfechafin_SER449('2');
            } else {
              if (this.form.diafin_SER449.trim() == '' || this.form.diafin_SER449 < 01 || this.form.diafin_SER449 > 31) {
                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER449('3'), 'error', 'error');
              } else {
                this.SER449.FECHAFINW = this.form.anofin_SER449 + this.form.mesfin_SER449 + this.form.diafin_SER449
                if (this.SER449.FECHAFINW < this.SER449.FECHAINIW) {
                  CON851('37', '37', this._evaluarfechafin_SER449('3'), 'error', 'error');
                } else {
                  this._evaluarpyp_SER449()
                }
              }
            }
          }
        }
      )
    },
    _evaluarpyp_SER449() {
      if (this.form.pyp_SER449.trim() == '') this.form.pyp_SER449 = 'N'
      validarInputs({
        form: "#VALIDARPYP_SER449",
        orden: "1"
      }, () => { this._evaluarfechafin_SER449('3') },
        () => {
          this.form.pyp_SER449 = this.form.pyp_SER449.toUpperCase();
          if (this.form.pyp_SER449 == 'S' || this.form.pyp_SER449 == 'N') {
            this._evaluartipousuario_SER449()
          } else {
            CON851("03", "03", this._evaluarpyp_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluartipousuario_SER449() {
      var TIPOUSU = [
        { COD: "C", DESCRIP: "Contributivo " },
        { COD: "S", DESCRIP: "Subsidiado" },
        { COD: "V", DESCRIP: "Vinculado" },
        { COD: "P", DESCRIP: "Particular" },
        { COD: "O", DESCRIP: "Otro tipo" },
        { COD: "D", DESCRIP: "Desplaz contributivo" },
        { COD: "E", DESCRIP: "Desplaz subsiado" },
        { COD: "F", DESCRIP: "Desplaz vinculado" },
        { COD: "*", DESCRIP: "Todos los usuarios" }
      ];
      POPUP(
        {
          array: TIPOUSU,
          titulo: "Tipo de usuario",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: this.form.tipousuario_SER449,
          callback_f: () => {
            setTimeout(this._evaluarpyp_SER449, 300)
          },
        },
        TIPOUSU => {
          this.form.tipousuario_SER449 = TIPOUSU.COD + " - " + TIPOUSU.DESCRIP;
          this._evaluarsucursal_SER449()
        },
      );
    },
    _evaluarsucursal_SER449() {
      if (this.form.codsucursal_SER449.trim() == '') this.form.codsucursal_SER449 = '**'
      validarInputs(
        {
          form: "#VALIDARCODSUC_SER449",
          orden: "1",
        }, () => {
          setTimeout(this._evaluartipousuario_SER449, 300)
        },
        () => {
          if (this.form.codsucursal_SER449 == "**") {
            this.form.descripsuc_SER449 = "TODAS LAS SUCURSALES";
            this._evaluarunidadserv_SER449()
          } else {
            const res = this.SER449.SUCURSAL.find(e => e.CODIGO == this.form.codsucursal_SER449);
            if (res == undefined) {
              CON851("01", "01", this._evaluarsucursal_SER449(), "error", "error");
            } else {
              this.form.descripsuc_SER449 = res.DESCRIPCION;
              this._evaluarunidadserv_SER449()
            }
          }
        },
      );
    },
    _evaluarunidadserv_SER449() {
      if (this.form.unidadserv_SER449.trim() == '') this.form.unidadserv_SER449 = '**'
      validarInputs(
        {
          form: "#VALIDARUNIDAD_SER449",
          orden: "1",
        }, () => {
          this._evaluarsucursal_SER449()
        },
        () => {
          if (this.form.unidadserv_SER449.substring(0, 2) == "**") {
            this.form.unidadserv_SER449 = "** - TODAS LAS UNIDADES SERV.";
            this._evaluarcapita_SER449()
          } else {
            const res = this.SER449.UNIDADSERVICIO.find(e => e.COD == this.form.unidadserv_SER449.substring(0, 2));
            if (res == undefined) {
              CON851("01", "01", this._evaluarunidadserv_SER449(), "error", "error");
            } else {
              console.log(res.DESCRIP)
              this.form.unidadserv_SER449 = res.COD + ' - ' + res.DESCRIP
              this._evaluarcapita_SER449()
            }
          }
        })
    },
    _evaluarcapita_SER449() {
      if (this.form.capita_SER449.trim() == '') this.form.capita_SER449 = 'N'
      validarInputs({
        form: "#VALIDARCAPITA_SER449",
        orden: "1"
      }, () => { this._evaluarunidadserv_SER449() },
        () => {
          this.form.capita_SER449 = this.form.capita_SER449.toUpperCase();
          if (this.form.capita_SER449 == 'S' || this.form.capita_SER449 == 'N') {
            this._evaluarpacienteextr_SER449()
          } else {
            CON851("03", "03", this._evaluarcapita_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluarpacienteextr_SER449() {
      if (this.form.extrajero_SER449.trim() == '') this.form.extrajero_SER449 = 'N'
      validarInputs({
        form: "#VALIDAREXTRAJERO_SER449",
        orden: "1"
      }, () => { this._evaluarcapita_SER449() },
        () => {
          this.form.extrajero_SER449 = this.form.extrajero_SER449.toUpperCase();
          if (this.form.extrajero_SER449 == 'S' || this.form.extrajero_SER449 == 'N') {
            this._evaluarrips_SER449()
          } else {
            CON851("03", "03", this._evaluarpacienteextr_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluarrips_SER449() {
      if (this.form.ripsextrajero_SER449.trim() == '') this.form.ripsextrajero_SER449 = 'N'
      validarInputs({
        form: "#VALIDARRIPS_SER449",
        orden: "1"
      }, () => { this._evaluarpacienteextr_SER449() },
        () => {
          this.form.ripsextrajero_SER449 = this.form.ripsextrajero_SER449.toUpperCase();
          if (this.form.ripsextrajero_SER449 == 'S' || this.form.ripsextrajero_SER449 == 'N') {
            if (this.form.droga_SER449.trim() == '' && $_USUA_GLOBAL[0].NIT == 845000038) {
              this.form.droga_SER449 = '3'
            } else {
              this.form.droga_SER449 = '2'
            }
            this._evaluardrogueria_SER449()
          } else {
            CON851("03", "03", this._evaluarrips_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluardrogueria_SER449() {
      var DROGUERIA = [
        { COD: "1", DESCRIP: "299" },
        { COD: "2", DESCRIP: "ATC" },
        { COD: "3", DESCRIP: "CUM" },
      ];
      POPUP(
        {
          array: DROGUERIA,
          titulo: "FACTURACION POR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: this.form.droga_SER449,
          callback_f: () => { this._evaluarrips_SER449() },
        },
        DROGUERIA => {
          this.form.droga_SER449 = DROGUERIA.COD + " - " + DROGUERIA.DESCRIP;
          this._evaluarcomprobantes_SER449()
        },
      );
    },
    _evaluarcomprobantes_SER449() {
      if (this.form.comprobantes_SER449.trim() == '') this.form.comprobantes_SER449 = 'N'
      validarInputs({
        form: "#VALIDARCOMPROBANTE_SER449",
        orden: "1"
      }, () => { setTimeout(this._evaluardrogueria_SER449, 300) },
        () => {
          this.form.comprobantes_SER449 = this.form.comprobantes_SER449.toUpperCase();
          if (this.form.comprobantes_SER449 == 'S' || this.form.comprobantes_SER449 == 'N') {
            this._evaluarprefijo_SER449()
          } else {
            CON851("03", "03", this._evaluarcomprobantes_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluarprefijo_SER449() {
      if (this.form.factura_SER449.trim() == '') this.form.factura_SER449 = '*'
      validarInputs({
        form: "#VALIDARFACTURAS_SER449",
        orden: "1"
      }, () => { this._evaluarcomprobantes_SER449() },
        () => {
          this.form.factura_SER449 = this.form.factura_SER449.toUpperCase();
          if (this.form.factura_SER449 == 'A' || this.form.factura_SER449 == 'P' || this.form.factura_SER449 == 'T' || this.form.factura_SER449 == '*') {
            this._evaluarsaldo_SER449()
          } else {
            CON851("03", "03", this._evaluarprefijo_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluarsaldo_SER449() {
      if (this.form.saldo_SER449.trim() == '') this.form.saldo_SER449 = 'N'
      validarInputs({
        form: "#VALIDARSALDO_SER449",
        orden: "1"
      }, () => { this._evaluarprefijo_SER449() },
        () => {
          this.form.saldo_SER449 = this.form.saldo_SER449.toUpperCase();
          if (this.form.saldo_SER449 == 'S' || this.form.saldo_SER449 == 'N') {
            this._evaluarpacienteIRA_SER449()
          } else {
            CON851("03", "03", this._evaluarsaldo_SER449(), "error", "Error");
          }
        }
      )
    },
    _evaluarpacienteIRA_SER449() {
      if (this.form.diagnosticoIRA_SER449.trim() == '') this.form.diagnosticoIRA_SER449 = 'N'
      validarInputs({
        form: "#VALIDARDIAGIRA_SER449",
        orden: "1"
      }, () => { this._evaluarsaldo_SER449() },
        () => {
          this.form.diagnosticoIRA_SER449 = this.form.diagnosticoIRA_SER449.toUpperCase();
          if (this.form.diagnosticoIRA_SER449 == 'S' || this.form.diagnosticoIRA_SER449 == 'N') {
            this._evaluarDiscFechaAten()
          } else {
            CON851("03", "03", this._evaluarpacienteIRA_SER449(), "error", "Error");
          }
        }
      )
    },

    _evaluarDiscFechaAten() {
      validarInputs(
        { form: "#_evaluarDiscFechaAten" },
        () => {
          this._evaluarpacienteIRA_SER449()
        },
        () => {
          this.form.discFechaAten_SER449 = this.form.discFechaAten_SER449.trim().toUpperCase();
          if (this.form.discFechaAten_SER449 == "S" || this.form.discFechaAten_SER449 == "N") {
            CON851P('01', this._evaluarDiscFechaAten, this._evaluartrasacciones_SER449)
          } else {
            CON851("03", "03", null, "error", "Error");
            this._evaluarDiscFechaAten();
          }
        }
      );
    },


    _evaluartrasacciones_SER449() {
      loader("show")
      $_this = this
      postData({ datosh: datosEnvio() + this.SER449.FECHAINIW + "|" + this.SER449.FECHAFINW + '|' + this.form.codentidad_SER449 + '|' + localStorage.Usuario + '|' + this.form.capita_SER449 + '|' + this.form.extrajero_SER449 + '|' + this.form.ripsextrajero_SER449 + '|' + this.form.factura_SER449 + '|' + this.form.saldo_SER449 + '|' }, get_url("APP/SALUD/SER449A.DLL"))
        .then(data => {
          console.log(data, 'ser449A')
          postData({ datosh: datosEnvio() + this.SER449.FECHAINIW + "|" + this.SER449.FECHAFINW + '|' + this.form.pyp_SER449 + '|' + this.form.unidadserv_SER449.substring(0, 2) + '|' + this.form.nuir_SER449 + '|' + this.form.codentidad_SER449 + '|' + localStorage.Usuario + '|' + this.form.tipousuario_SER449.substring(0, 1) + '|' + this.form.codsucursal_SER449 + '|' + this.form.capita_SER449 + '|' + this.form.extrajero_SER449 + '|' + this.form.ripsextrajero_SER449 + '|' + this.form.droga_SER449.substring(0, 1) + '|' + this.form.comprobantes_SER449 + '|' + this.form.factura_SER449 + '|' + this.form.saldo_SER449 + '|' + this.form.diagnosticoIRA_SER449 + '|' + this.form.discFechaAten_SER449 + '|' }, get_url("APP/SALUD/SER449B.DLL"))
            .then(data => {
              console.log(data, 'ser449B')
              for (var i in data.RUTAS) {
                var nombretxt = data.RUTAS[i].replace('.TXT', '');
                let datosEnvio = {
                  nombre_txt: nombretxt,
                };
                $.ajax({
                  data: datosEnvio,
                  type: 'POST',
                  async: false,
                  url: get_url('app/Inc/_crearRIPS.php')
                }).done(function (data) {
                  if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                    console.error('problemas para crear el txt');
                  } else {
                    let texto = data.split(/\r\n/);
                    let datos = '';
                    for (var i in texto) {
                      if (i == 0) {
                        datos = `${texto[i].trim()}`;
                      } else {
                        if (texto[i].trim() != '') {
                          datos = `${datos}\r\n${texto[i].trim()}`;
                        }
                      }
                    }
                    const buffer = Buffer.from(datos, 'latin1');
                    fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, { encoding: 'binary' }, function (err) {
                      if (err) return console.error(err);
                    });
                  }
                });
              }
              postData({ datosh: datosEnvio() + this.SER449.FECHAFINW + '|' + this.form.nuir_SER449 + '|' + localStorage.Usuario + '|' + this.form.extrajero_SER449 + '|' + this.form.ripsextrajero_SER449 + '|' }, get_url("APP/SALUD/SER449D.DLL"))
                .then(data => {
                  console.log(data, 'ser449D')
                  for (var i in data.RUTAS2) {
                    console.log(data.RUTAS2)
                    var nombretxt = data.RUTAS2[i].replace('.TXT', '');
                    let datosEnvio = {
                      nombre_txt: nombretxt,
                    };
                    $.ajax({
                      data: datosEnvio,
                      type: 'POST',
                      async: false,
                      url: get_url('app/Inc/_crearRIPS.php')
                    }).done(function (data) {
                      if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                        console.error('problemas para crear el txt');
                      } else {
                        let texto = data.split(/\r\n/);
                        let datos = '';
                        for (var i in texto) {
                          if (i == 0) {
                            datos = `${texto[i].trim()}`;
                          } else {
                            if (texto[i].trim() != '') {
                              datos = `${datos}\r\n${texto[i].trim()}`;
                            }
                          }
                        }
                        const buffer = Buffer.from(datos, 'latin1');
                        fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, { encoding: 'binary' }, function (err) {
                          if (err) return console.error(err);
                        });
                      }
                    });
                  }
                  postData({ datosh: datosEnvio() + this.SER449.FECHAFINW + '|' + this.form.nuir_SER449 + '|' + localStorage.Usuario + '|' + this.form.extrajero_SER449 + '|' + this.form.ripsextrajero_SER449 + '|' }, get_url("APP/SALUD/SER449E.DLL"))
                    .then(data => {
                      console.log(data, 'ser449D')
                      for (var i in data.RUTAS3) {
                        console.log(data.RUTAS3)
                        var nombretxt = data.RUTAS3[i].replace('.TXT', '');
                        let datosEnvio = {
                          nombre_txt: nombretxt,
                        };
                        $.ajax({
                          data: datosEnvio,
                          type: 'POST',
                          async: false,
                          url: get_url('app/Inc/_crearRIPS.php')
                        }).done(function (data) {
                          if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                            console.error('problemas para crear el txt');
                          } else {
                            let texto = data.split(/\r\n/);
                            let datos = '';
                            for (var i in texto) {
                              if (i == 0) {
                                datos = `${texto[i].trim()}`;
                              } else {
                                if (texto[i].trim() != '') {
                                  datos = `${datos}\r\n${texto[i].trim()}`;
                                }
                              }
                            }
                            const buffer = Buffer.from(datos, 'latin1');
                            fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, { encoding: 'binary' }, function (err) {
                              if (err) return console.error(err);
                            });
                          }
                        });
                      }

                      data = data.RESPUESTA
                      columnas = [
                        {
                          title: "COMPROBANTE",
                          value: 'COMPROB',
                          format: "String"
                        },
                        {
                          title: "FACTURA",
                          value: 'FACTURA',
                        },
                        {
                          title: "DESCRIPCIÓN",
                          value: 'DESCRIP',
                        },
                        {
                          title: "CUP",
                          value: 'CUPS',
                        },
                      ]
                      _impresion2({
                        tipo: 'excel',
                        header: [
                          { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                          `LISTA DE INCOSISTENCIAS`,
                        ],
                        logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                        tabla: {
                          columnas,
                          data: data,
                        },
                        archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
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
                      this._evaluarDiscFechaAten()
                    });

                })
                .catch(err => {
                  console.error(err)
                  loader("hide");
                  this._evaluarDiscFechaAten()
                });
            })
            .catch(err => {
              console.error(err)
              loader("hide");
              this._evaluarDiscFechaAten()
            });
        })
        .catch(err => {
          console.error(err)
          loader("hide");
          this._evaluarDiscFechaAten()
        });
    },
    _f8sucursal_SER449() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE SUCURSALES',
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $_this.SER449.SUCURSAL,
        callback_esc: function () {
          $(".sucursal_SER449").focus();
        },
        callback: function (data) {
          $_this.form.codsucursal_SER449 = data.CODIGO
          _enterInput('.sucursal_SER449');
        }
      });
    },
    _f8unidadserv_SER449() {
      _ventanaDatos({
        titulo: 'VENTANA DE UNIDADES DE SERVICIO',
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER449.UNIDADSERVICIO,
        callback_esc: function () {
          $(".unidadservicio_SER449").focus();
        },
        callback: function (data) {
          $_this.form.unidadserv_SER449 = data.COD
          _enterInput('.unidadservicio_SER449');
        }
      });
    },
    _f8entidad_SER449() {
      $_this = this
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          $_this.form.codentidad_SER449 = data.COD.trim();
          _enterInput('.entidad_SER449');
        },
        cancel: () => {
          _enterInput('.entidad_SER449');
        }
      };
      F8LITE(parametros);
    },
  },
});
