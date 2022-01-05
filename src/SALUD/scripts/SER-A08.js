//  20/10/2020 - DIANA ESCOBAR: CREADO 

new Vue({
  el: "#SERA08",
  data: {
    SERA08: [],
    form: {
      ano_SERA08: '',
      mes_SERA08: '',
      dia_SERA08: '',
      numerotabla_SERA08: 0,
      anoglosa_SERA08: '',
      nroglosa_SERA08: '',
      fechaglosa_SERA08: '',
      estadoglosa_SERA08: '',
      descripentidad_SERA08: '',
      factura_SERA08: '',
      valorlevant_SERA08: '',
    },
    tablaglosaslevant_SERA08: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,8 - Levantamiento de glosas");
    $_this = this;
    $_this.SERA08.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA08.ANO_LNK = "20" + $_this.SERA08.FECHA_LNK.substring(0, 2);
    $_this.SERA08.MES_LNK = $_this.SERA08.FECHA_LNK.substring(2, 4);
    $_this.SERA08.DIA_LNK = $_this.SERA08.FECHA_LNK.substring(4, 6);
    $_this.SERA08.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SERA08.ANOACTUALW = $_this.SERA08.FECHAACTUAL.substring(0, 4);
    $_this.SERA08.MESACTUALW = $_this.SERA08.FECHAACTUAL.substring(4, 6);
    $_this.SERA08.DIAACTUALW = $_this.SERA08.FECHAACTUAL.substring(6, 8);
    obtenerDatosCompletos(
      {
        nombreFd: "TERCEROS",
      },
      function (data) {
        $_this.SERA08.TERCEROS = data.TERCEROS;
        $_this.SERA08.TERCEROS.pop();
        console.log($_this.SERA08.TERCEROS)
        loader("hide");
        $_this._validardiscriminacion_SERA08();
      },
    );
  },
  methods: {
    _validardiscriminacion_SERA08() {
      if (this.SERA08.ANOACTUALW == this.SERA08.ANO_LNK && this.SERA08.MESACTUALW == this.SERA08.MES_LNK) {
        this.form.dia_SERA08 = this.SERA08.DIAACTUALW
      } else {
        this.form.dia_SERA08 = this.SERA08.DIA_LNK
      }
      this.form.ano_SERA08 = this.SERA08.ANO_LNK
      this.form.mes_SERA08 = this.SERA08.MES_LNK
      validarInputs(
        {
          form: "#VALIDAR0_SERA08",
          orden: '1'
        }, _toggleNav,
        () => {
          this.form.dia_SERA08 = this.form.dia_SERA08.padStart(2, "0")
          if (this.form.dia_SERA08 < 1 || this.form.dia_SERA08 > this.SERA08.DIA_LNK) {
            CON851('03', '03', this._validardiscriminacion_SERA08(), 'error', 'error');
          } else {
            this.SERA08.FECHAW = this.form.ano_SERA08 + this.form.mes_SERA08 + this.form.dia_SERA08
            this._evaluardato1_SERA08()
          }
        }
      )
    },
    _evaluardato1_SERA08() {
      if (parseInt(this.form.numerotabla_SERA08) < 1) {
        this.form.numerotabla_SERA08 = 1;
      } else if (this.numerotabla_SERA08 > 500) {
        this.form.numerotabla_SERA08 = 500;
      }
      this._evaluaranoglosa_SERA08()
    },
    _evaluaranoglosa_SERA08() {
      if (this.form.anoglosa_SERA08.trim() == '') this.form.anoglosa_SERA08 = this.SERA08.ANO_LNK
      validarInputs(
        {
          form: "#VALIDAR1_SERA08",
          orden: '1',
          event_f3: () => {
            CON851P("01", this._evaluaranoglosa_SERA08, this._evaluargrabardatos);
          },
          event_f5: () => {
            CON851P("03", this._evaluaranoglosa_SERA08, _toggleNav);
          },
        }, this._evaluardato1_SERA08,
        () => {

          if (this.form.anoglosa_SERA08.trim() == '' || this.form.anoglosa_SERA08 == 0) {
            this._evaluaranoglosa_SERA08()
          } else {
            this._evaluarnroglosa_SERA08()
          }
        }
      )
    },
    _evaluarnroglosa_SERA08() {
      validarInputs(
        {
          form: "#VALIDAR2_SERA08",
          orden: '1'
        }, this._evaluaranoglosa_SERA08,
        () => {
          this.form.nroglosa_SERA08 = this.form.nroglosa_SERA08.padStart(6, "0")
          if (this.form.nroglosa_SERA08 == 0) {
            this._evaluarnroglosa_SERA08()
          } else {
            postData({ datosh: datosEnvio() + "1|" + this.form.anoglosa_SERA08 + this.form.nroglosa_SERA08 + "|" }, get_url("APP/SALUD/SER-A08.DLL"))
              .then(data => {
                console.log(data)
                this.SERA08.GLOSA = data.LEVANTAMIENTO[0]
                this.form.fechaglosa_SERA08 = this.SERA08.GLOSA.FECHAGLOSA
                this.form.estadoglosa_SERA08 = this.SERA08.GLOSA.ESTADO
                this.form.descripentidad_SERA08 = this.SERA08.GLOSA.ENTIDAD
                this.form.factura_SERA08 = this.SERA08.GLOSA.FACTURA
                this.form.valorlevant_SERA08 = this.SERA08.GLOSA.VALORRESP.trim()
                this._evaluarvalorlevantado_SERA08()
              })
              .catch(err => {
                console.error(err);
                this._evaluarnroglosa_SERA08();
              });
          }
        }
      )
    },
    _evaluarvalorlevantado_SERA08() {
      if (this.form.valorlevant_SERA08.trim() == '' || this.form.valorlevant_SERA08 == 0) this.form.valorlevant_SERA08 = this.SERA08.VLRRESP
      validarInputs(
        {
          form: "#VALIDAR3_SERA08",
          orden: '1',

        }, this._evaluarnroglosa_SERA08,
        () => {
          if (this.form.valorlevant_SERA08 > this.SERA08.VLRRESP) {
            CON851('07', '07', this._evaluarvalorlevantado_SERA08(), 'error', 'error');
          } else if (this.form.valorlevant_SERA08 == 0) {
            CON851('07', '07', this._evaluarvalorlevantado_SERA08(), 'error', 'error');
          } else {
            this.tablaglosaslevant_SERA08.push({
              NROGLOSA: this.form.anoglosa_SERA08 + this.form.nroglosa_SERA08,
              FECHAGLOSA: this.form.fechaglosa_SERA08,
              ESTADO: this.form.estadoglosa_SERA08,
              NOMBREENTIDAD: this.form.descripentidad_SERA08,
              FACTURA: this.form.factura_SERA08,
              VLRLEVANTADO: this.form.valorlevant_SERA08.padStart(15, '0'),
            });
            this._limpiartabla_SERA08()
          }
        }
      )
    },
    _limpiartabla_SERA08() {
      this.form.nroglosa_SERA08 = ''
      this.form.fechaglosa_SERA08 = ''
      this.form.estadoglosa_SERA08 = ''
      this.form.descripentidad_SERA08 = ''
      this.form.factura_SERA08 = 000000
      this.form.valorlevant_SERA08 = 0
      this.form.numerotabla_SERA08++
      this._evaluaranoglosa_SERA08()
    },
    _evaluargrabardatos() {
      console.log('GRABAR DATOS')
      var data = {};
      var lin = 1;
      for (var i in this.tablaglosaslevant_SERA08) {
        data['LIN-' + lin.toString().padStart(3, '0')] = this.tablaglosaslevant_SERA08[i].NROGLOSA + '|' + this.tablaglosaslevant_SERA08[i].FACTURA + '|' + this.tablaglosaslevant_SERA08[i].NOMBREENTIDAD + '|' + this.tablaglosaslevant_SERA08[i].ESTADO + '|' + this.tablaglosaslevant_SERA08[i].FECHAGLOSA + '|' + this.tablaglosaslevant_SERA08[i].VLRLEVANTADO + '|';
        lin++;
      }
      data.datosh = `${datosEnvio()}2|${this.form.anoglosa_SERA08}${this.form.nroglosa_SERA08}|${this.SERA08.FECHAW}|${localStorage.Usuario}|`
      postData(data, get_url("APP/SALUD/SER-A08.DLL"))
        .then(data => {
          console.log(data, 'GRABADO')
          CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err);
          this._evaluarnroglosa_SERA08();
        });
    },

    _f8nroglosa_SERA08() {
      // var $_this = this;
      // var fuente = '<div id="popUp_factura_SERA08">' +
      //   '<div class="col-md-12">' +
      //   '<div class="portlet light no-padding">' +
      //   '<div class="portlet-body no-padding">' +
      //   '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
      //   '<div class="col-md-12 col-sm-12 col-xs-12" id="validar_factura_SERA08" style="display: flex;justify-content: center">' +
      //   '<div class="col-md-4">' +
      //   '<label>Prefijo:</label>' +
      //   '<div class="input-group col-md-5 col-sm-5 col-xs-5">' +
      //   '<input type="text" id="prefijo_SERA08" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1" required="true" disabled="disabled">' +
      //   '</div>' +
      //   '</div>' +

      //   '<div class="col-md-8">' +
      //   '<label>Numero factura:</label>' +
      //   '<div class="input-group col-md-10 col-sm-10 col-xs-10">' +
      //   '<input type="text" id="factura_SERA08" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="7" data-orden="2" required="true" disabled="disabled">' +
      //   '</div>' +
      //   '</div>' +
      //   '</div>' +
      //   '</div>' +
      //   '</div>' +
      //   '</div>' +
      //   '</div>' +
      //   '<div style="clear:both;"></div>' +
      //   '</div>'
      // var dialogo = bootbox.dialog({
      //   title: "Consulta por factura:",
      //   message: fuente,
      //   closeButton: false,
      //   buttons: {
      //     main: {
      //       label: "Aceptar",
      //       className: "blue hidden",
      //       callback: function () {

      //       }
      //     }
      //   },
      // });
      // dialogo.on('shown.bs.modal', function (e) {
      //   $('.modal-content').css({ 'width': '500px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
      //   factura_SERA08('1')
      // });




      // let URL = get_url("APP/SALUD/SER-A84.DLL");
      // postData({
      //   datosh: datosEnvio() + this.form.entidad_SERA04.trim().padStart(10, '0') + "|"
      // }, URL)
      //   .then((data) => {
      //     console.log(data, 'ENTIDAD')
      //     loader("hide");
      //     $_this.SERA04.GLOSASRAD = data.RADICGLOSAS
      //     $_this.SERA04.GLOSASRAD.pop()
      //     _ventanaDatos({
      //       titulo: $_this.SERA04.GLOSASRAD.TERCERO,
      //       columnas: ["FACTURA", "NROGLOSA", "TERCERO", 'FECHAGLO', 'PACIENTE', 'RADICADO'],
      //       data: $_this.SERA04.GLOSASRAD,
      //       callback_esc: function () {
      //         $(".radicado_SERA04").focus();
      //       },
      //       callback: function (data) {
      //         console.log(data, 'DATOS')
      //         $_this.form.radicado_SERA04 = data.RADICADO.trim()
      //         _enterInput(".radicado_SERA04");
      //       }
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     this._evaluarradicado_SERA04()
      //   });
    },
    // factura_SERA08(orden) {
      // _toggleF8([{
      //   input: 'paciente', app: 'SER825', funct: (e) => {
      //     if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
      //       set_Event_validar('#validar_paciente_SER825', 'off')
      //       $('#paciente_SER825').attr('disabled', 'true')
      //       $('[data-bb-handler="main"]').click();

      //       f8Pacientes_SER825(callbackAtras, callbackSig, orden_w)
      //     }
      //   }
      // },])
    //   validarInputs(
    //     {
    //         form: "#validar_factura_SERA08",
    //         orden: orden
    //     },
    //     function () {
    //         $('[data-bb-handler="main"]').click();
    //         $('#prefijo_SERA08').val('')
    //         callbackAtras(callbackAtras)
    //     },
    //     function () {
    //         var prefijo = $('#prefijo_SERA08').val()
           

    //         llamado_ventana_SER825(id_historia, callbackAtras, callbackSig, orden_w, '1')
    //     }

    // )
    // }
  },
});


