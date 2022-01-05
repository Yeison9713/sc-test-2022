// 30/12/2020 - DIANA ESCOBAR: CREADO
new Vue({
  el: "#SER405",
  data: {
    SER405: [],
    form: {
      atencimedica_SER405: "",
      paciente_SER405: "",
      descrippaciente_SER405: "",
      atendido_SER405: "",
      descrippaten_SER405: "",
      folio_SER405: "",
      tipo_SER405: "",
      fecha_SER405: "",
      hora_SER405: "",
      Descriphc_SER405: "",
      unserv_SER405: "",
      faccapita_SER405: "",
      ingreseprefijo_SER405: "",
      ingresenumero_SER405: ""
    },
    mostrarapertura: false,
    params_apertura: {
      estado: false
    },
    datos_apertura: {},
  },
  components: {
    ventanaapertura: require("../../SALUD/scripts/aperturafacturas.vue.js"),
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,4,5,1 - Consulta de historia clinicas");
    this.SER405.UNSERW = "";
    this.SER405.MESW = "";
    $_this = this;
    $_this.SER405.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER405.ANO_LNK = $_this.SER405.FECHA_LNK.substring(0, 2);
    $_this.SER405.MES_LNK = $_this.SER405.FECHA_LNK.substring(2, 4);
    $_this.SER405.DIA_LNK = $_this.SER405.FECHA_LNK.substring(4, 6);
    $_this.SER405.FECHAACTUAL = moment().format("YYYYMMDD");
    $_this.SER405.ANOACTUAL = $_this.SER405.FECHAACTUAL.substring(0, 4);
    $_this.SER405.MESACTUAL = $_this.SER405.FECHAACTUAL.substring(4, 6);
    $_this.SER405.DIAACTUAL = $_this.SER405.FECHAACTUAL.substring(6, 8);
    loader("hide");
    obtenerDatosCompletos(
      {
        nombreFd: "UNSERV",
      },
      function (data) {
        $_this.SER405.UNISERVICIO = data.UNSERV;
        loader("hide");
        $_this._evaluarinicio_SER405();
        $_this.SER405.UNIDADSERVICIO = [];
        for (var i in $_this.SER405.UNISERVICIO) {
          if ($_this.SER405.UNISERVICIO[i].ESTADO.trim() == "S") {
            $_this.SER405.UNIDADSERVICIO.push($_this.SER405.UNISERVICIO[i]);
          }
        }
      },
    );
  },
  methods: {
    _evaluarinicio_SER405() {
      validarInputs(
        {
          form: "#validaratencion_SER405",
          orden: "1",
        }, ()=> {
          console.log('SALIDO')
          _toggleNav()},
        ()=> {
          this._evaluarinicio_SER405()
        },
      );
    },
    _f8atencion_SER405() {
      console.log('VENTANA')
      $_this = this;
      var ventanaconsultahc = bootbox.dialog({
        size: "large",
        title: "CONSULTA DE ATENCION MEDICA POR FECHA",
        message:
          '<div class="row"> ' +
          '<div class="col-md-12"> ' +
          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
          "Unidad de servicio:" +
          "</label> " +
          '<div class="col-md-4 col-sm-6 col-xs-6" id="UNSER_SER405"> ' +
          '<input id="unidadservc_SER405" class="form-control input-md" data-orden="1" maxlength="2" > ' +
          "</div> " +
          '<button type="button" id="unidadservcBtn_405" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
          '<i class="icon-magnifier"></i>' +
          "</button>" +
          '<div class="col-md-8 col-sm-6 col-xs-6"> ' +
          '<input id="descripservc_SER405" class="form-control input-md" > ' +
          "</div> " +
          "</div>" +
          "</div> " +
          '<div class="salto-linea"></div>' +
          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' +
          "Fecha de proceso" +
          "</label> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAPROCESO_SER405"> ' +
          '<input id="ano_SER405" class="form-control input-md" data-orden="1" maxlength="4" placeholder= "AAAA"> ' +
          "</div> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAPROCESO_SER405"> ' +
          '<input id="mes_SER405" class="form-control input-md" data-orden="2" maxlength="2" placeholder= "MM"> ' +
          "</div> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAPROCESO_SER405"> ' +
          '<input id="dia_SER405" class="form-control input-md" data-orden="3" maxlength="2" placeholder= "DD"> ' +
          "</div> " +
          "</div> " +
          '<div class="salto-linea"></div>' +
          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
          "Mostrar los eventos marcados como leidos? " +
          "</label> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="MARCAR_SER405"> ' +
          '<input id="marcarleido_SER405" class="form-control input-md" data-orden="1" maxlength="1" placeholder= "S/N"> ' +
          "</div> " +
          "</div> " +
          '<div class="salto-linea"></div>' +
          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' +
          "Mostrar las evoluciones? " +
          "</label> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="EVOLUCION_SER405"> ' +
          '<input id="mostarevo_SER405" class="form-control input-md" data-orden="1" maxlength="1" placeholder= "S/N"> ' +
          "</div> " +
          "</div> " +
          "</div>" +
          "</div>",
        buttons: {
          confirm: {
            label: "Aceptar",
            className: "btn-primary",
            callback: function () {
              ventanaconsultahc.off("show.bs.modal");
              setTimeout($_this._mostrarventana_SER405, 300);
              // _enterInput("#unidadservc_SER405");
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanaconsultahc.off("show.bs.modal");
              console.log('ACTIVAR SALIDA')
              setTimeout($_this._evaluarinicio_SER405, 500);
              // $(".consulta_SER405").focus();
            },
          },
        },
      });
      ventanaconsultahc.init($(".modal-footer").hide());
      ventanaconsultahc.init($_this._evaluarunidadesserv_SER405);
      ventanaconsultahc.on("shown.bs.modal", function () {
        $("#unidadservc_SER405").focus();
      });
      ventanaconsultahc.init(
        _toggleF8([
          {
            input: "unidadservc",
            app: "405",
            funct: $_this._f8unidadserv_SER405,
          },
        ]),
      );
    },
    _evaluarunidadesserv_SER405() {
      _inputControl("disabled");
      set_Event_validar('#validaratencion_SER405', 'off');
      if (this.SER405.UNSERW.trim() == "") this.SER405.UNSERW = "01";
      $("#unidadservc_SER405").val(this.SER405.UNSERW);
      validarInputs(
        {
          form: "#UNSER_SER405",
          orden: "1",
        },
        () => {
          console.log('INGRESO Y SALIDA')
          $(".btn-danger").click();
        },
        () => {
          this.SER405.UNSERW = $("#unidadservc_SER405").val();
          if (this.SER405.UNSERW == "**") {
            $("#descripservc_SER405").val("TODOS LOS SERVICIOS");
            this._evaluarfecha_SER405("1");
          } else {
            const res = this.SER405.UNIDADSERVICIO.find(e => e.COD == this.SER405.UNSERW);
            if (res == undefined) {
              CON851("01", "01", this._evaluarunidadesserv_SER405(), "error", "error");
            } else {
              $("#descripservc_SER405").val(res.DESCRIP);
              this._evaluarfecha_SER405("1");
            }
          }
        },
      );
    },
    _evaluarfecha_SER405(orden) {
      if (this.SER405.MESW.trim() == "") {
        $("#ano_SER405").val(this.SER405.ANOACTUAL);
        $("#mes_SER405").val(this.SER405.MESACTUAL);
        $("#dia_SER405").val(this.SER405.DIAACTUAL);
      }
      validarInputs(
        {
          form: "#FECHAPROCESO_SER405",
          orden: orden,
        },
        () => {
          this._evaluarunidadesserv_SER405();
        },
        () => {
          this.SER405.ANOW = $("#ano_SER405").val();
          this.SER405.MESW = $("#mes_SER405").val();
          this.SER405.DIAW = $("#dia_SER405").val();
          if (this.SER405.ANOW.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfecha_SER405("1"), "error", "error");
          } else {
            this.SER405.MESW = this.SER405.MESW.padStart(2, "0");
            if (this.SER405.MESW.trim() == "" || this.SER405.MESW < 1 || this.SER405.MESW > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfecha_SER405("2"), "error", "error");
            } else {
              this.SER405.DIAW = this.SER405.DIAW.padStart(2, "0");
              if (this.SER405.DIAW.trim() == "" || this.SER405.DIAW < 1 || this.SER405.DIAW > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfecha_SER405("3"), "error", "error");
              } else {
                this.SER405.FECHAW = this.SER405.ANOW + this.SER405.MESW + this.SER405.DIAW;
                this._evaluarmarcados_SER405();
              }
            }
          }
        },
      );
    },
    _evaluarmarcados_SER405() {
      validarInputs(
        {
          form: "#MARCAR_SER405",
          orden: "1",
        },
        () => {
          this._evaluarfecha_SER405("3");
        },
        () => {
          this.SER405.MARCADOS = $("#marcarleido_SER405").val().toUpperCase();
          $("#marcarleido_SER405").val(this.SER405.MARCADOS);
          if (this.SER405.MARCADOS == "S" || this.SER405.MARCADOS == "N") {
            this._evaluarevolucion_SER405();
          } else {
            CON851("03", "03", this._evaluarmarcados_SER405(), "error", "error");
          }
        },
      );
    },
    _evaluarevolucion_SER405() {
      validarInputs(
        {
          form: "#EVOLUCION_SER405",
          orden: "1",
        },
        () => {
          this._evaluarmarcados_SER405();
        },
        () => {
          this.SER405.EVOLUCION = $("#mostarevo_SER405").val().toUpperCase();
          $("#mostarevo_SER405").val(this.SER405.EVOLUCION);
          if (this.SER405.EVOLUCION == "S" || this.SER405.EVOLUCION == "N") {
            let URL = get_url("APP/SALUD/SER818.DLL");
            postData(
              {
                datosh: datosEnvio() + this.SER405.MARCADOS + "|" + this.SER405.EVOLUCION + "|" + this.SER405.FECHAW + "||" + this.SER405.UNSERW + "|",
              },
              URL,
            )
              .then(data => {
                console.log("DEL DIA", data);
                this.SER405.HCDIA = data.PENDIENTES_FACT_HC;
                this.SER405.HCDIA.pop();
                $_this = this;
                _ventanaDatos({
                  titulo: "CONSULTA DE ATENCION MEDICA POR FECHA " + this.SER405.FECHAW,
                  columnas: ["IDENTIFICACION", "NOM_PACI", "EDAD", "FOLIO", "ATIENDE", "FACTURA", "OPERADOR", "TIPO_CONSULTA", "TRIAGE"],
                  data: $_this.SER405.HCDIA,
                  ancho: "90%",
                  callback_esc: function () {
                    $(".btn-danger").click();
                  },
                  callback: function (data) {
                    $_this.form.paciente_SER405 = data.IDENTIFICACION;
                    $_this.form.descrippaciente_SER405 = data.NOM_PACI;
                    $_this.form.atendido_SER405 = data.ATIENDE;
                    $_this.form.descrippaten_SER405 = data.NOM_ATIENDE;
                    $_this.form.fecha_SER405 = data.FECHA_HC;
                    $_this.form.hora_SER405 = data.HORA_HC;
                    $_this.form.folio_SER405 = data.FOLIO;
                    $_this.form.tipo_SER405 = data.TIPO_CONSULTA;
                    $_this.form.unserv_SER405 = data.UNID_HC;
                    $_this.SER405.OPERW = data.OPERADOR;
                    $_this.SER405.CLASEHC = data.CLASE;
                    $_this.SER405.LLAVEEVOW = data.LLAVE_EVO
                    $_this.SER405.FACTURA = data.FACTURA
                    $(".btn-primary").click();
                  },
                });
              })
              .catch(error => {
                console.error(error);
                this._evaluarevolucion_SER405();
              });
          } else {
            CON851("03", "03", this._evaluarevolucion_SER405(), "error", "error");
          }
        },
      );
    },
    _mostrarventana_SER405() {
      if (this.form.tipo_SER405.trim() == "H.C") {
        this.form.Descriphc_SER405 = "CONSULTA HISTORIA CLINICA";
      } else {
        this.SER405.OPERADOREVOW = this.SER405.OPERW;
        this.form.Descriphc_SER405 = "CONSULTA EVOLUCION MEDICA";
      }
      this._consultapaciente_SER405()
      setTimeout(this._evaluarfacturacapita_SER405, 300)
    },
    _consultapaciente_SER405() {
      let URL = get_url("APP/SALUD/SER810-1.DLL");
      postData({
        datosh: datosEnvio() + this.form.paciente_SER405 + "|",
      }, URL)
        .then(data => {
          this.SER405.PACIENTES = data["REG-PACI"];
          this.SER405.NITPACIENTE = this.SER405.PACIENTES[0]["NIT-FACT"].trim();
          this.SER405.DESCRIPPACIENTE = this.SER405.PACIENTES[0]["DESCRIP-NIT-FACT"].trim();
          
        })
        .catch(error => {
          console.error(error)
          this._evaluarinicio_SER405()
        });
    },
    _evaluarfacturacapita_SER405() {
      if (this.form.faccapita_SER405.trim() == '') this.form.faccapita_SER405 = 'N'
      validarInputs(
        {
          form: "#VALIDACAPITA_SER405",
          orden: "1",
        },
        () => {
          this._evaluarinicio_SER405()
        },
        () => {
          this.form.faccapita_SER405 = this.form.faccapita_SER405.toUpperCase();
          if (this.form.faccapita_SER405 == 'S' || this.form.faccapita_SER405 == 'N') {
            if (this.form.faccapita_SER405 == 'S') {
              this._evaluaringresofact_SER405()
            } else {
              this._ventanacrearfact_SER405()
            }

          } else {
            CON851("03", "03", this._evaluarfacturacapita_SER405(), "error", "error");
          }
        },
      );
    },
    _evaluaringresofact_SER405() {
      // if($_USUA_GLOBAL[0].NIT == 892000264) NIT DE LA ESE DE ACACIAS
      this.form.ingreseprefijo_SER405 = 'A'
      validarInputs(
        {
          form: "#VALIDAINGRESO_SER405",
          orden: "1",
        },
        () => {
          this._evaluarfacturacapita_SER405()
        },
        () => {
          if (this.form.ingresenumero_SER405.trim() == '') {
            CON851("03", "03", this._evaluaringresofact_SER405(), "error", "error");
          } else {
            this.SER405.LLAVEW = this.form.ingreseprefijo_SER405 + this.form.ingresenumero_SER405.toString().padStart(6, '0')
            let URL = get_url("APP/SALUD/SER808-01.DLL");
            postData({
              datosh: datosEnvio() + this.SER405.LLAVEW + "|",
            }, URL)
              .then(data => {
                this.SER405.FACTURACION = data.NUMER19[0];
                this.SER405.NITNUM = this.SER405.FACTURACION.NIT_NUM.trim()
                if (this.SER405.NITPACIENTE != this.SER405.NITNUM) {
                  CON851("", "factura no corresponde a entidad paciente", this._evaluaringresofact_SER405(), "error", "error");
                } else {
                  postData({ datosh: datosEnvio() + this.form.paciente_SER405 + this.form.folio_SER405 + '||3||' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|' + this.SER405.LLAVEW + '|' }, get_url("APP/SALUD/SER405.DLL"))
                    .then(data => {
                      console.log(data)
                      this._marcafactura_SER405()
                    })
                    .catch(err => {
                      console.error(err)
                      this._evaluaringresofact_SER405()
                    });
                }
              })
              .catch(error => {
                console.error(error)
                this._evaluaringresofact_SER405()
              });
          }
        },
      );
    },
    _ventanacrearfact_SER405() {
      validarInputs(
        {
          form: "#VALIDAFACT_SER405",
          orden: "1",
        },
        () => {
          this._evaluarfacturacapita_SER405();
        },
        () => {
          this.form.factura_SER405 = this.form.factura_SER405.toUpperCase();
          if (this.form.factura_SER405 == 'S' || this.form.factura_SER405 == 'N') {
            if (this.form.factura_SER405 == "S") {
              if (this.SER405.FACTURA.trim() == "" || this.SER405.FACTURA == 0) {
                this.mostrarapertura = true;
                this.datos_apertura.triage = true;
                this.datos_apertura.idpac = this.form.paciente_SER405A;
                // this.datos_apertura.llavetriage = this.SER405A.LLAVETRIA
                this.datos_apertura.llavetriage = this.form.folio_SER405;
                setTimeout(() => this.params_apertura.estado = true, 300);
              } else {
                CON851("", "Triage ya tiene cargada factura", null, "error", "");
                this._ventanacrearfact_SER405();
              }
            } else {
              _toggleNav();
            }
          } else {
            CON851("03", "03", null, "error", "error");
            this._ventanacrearfact_SER405();
          }
            
          //   if (this.form.factura_SER405 == 'S' && this.form.tipo_SER405.trim() == "H.C") {
          //     if (this.SER405.FACTURA.trim() == '' || this.SER405.FACTURA == 000000) {
          //       let { ipcRenderer } = require("electron");
          //       ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER108.html', cliente: this.form.paciente_SER405, historia: true, folio: this.form.folio_SER405 });
          //       _EventocrearSegventana(['on', 'Creando o modificando una factura...'], this._marcafactura_SER405);
          //     } else {
          //       CON851("", "HC ya tiene cargada factura", this._ventanacrearfact_SER405(), "error", "error");
          //     }
          //   } else {
          //     if (this.form.tipo_SER405.trim() == "EVO" && this.form.factura_SER405 == 'S') {
          //       CON851("", "Evolucion no permite hacer factura", this._ventanacrearfact_SER405(), "error", "error");
          //     } else {
          //       this._marcafactura_SER405()
          //     }
          //   }
          // } else {
          //   this._ventanacrearfact_SER405()
          // }
        },
      );
    },
    validarEsc_apertura() {
      this.mostrarapertura = false;
      setTimeout(() => {
          this.params_apertura.estado = false;
      }, 300);
      this._ventanacrearfact_SER405()
    },
    validarCallback_apertura() {
        this.mostrarapertura = false;
        setTimeout(() => {
            this.params_apertura.estado = false;
        }, 300);
        // this._grabartriage_SER405A()
        this._marcafactura_SER405()
    },
    _marcafactura_SER405() {
      if (this.SER405.OPERW.trim() == '') {
        CON851P("10", _toggleNav, this._grabarhistoria_SER405);
      } else {
        _toggleNav()
      }
    },
    _grabarhistoria_SER405() {
      if (this.form.tipo_SER405.trim() == "H.C" && this.SER405.OPERW.trim() == '') {
        postData({ datosh: datosEnvio() + this.form.paciente_SER405 + this.form.folio_SER405 + '||1|' + localStorage.Usuario + '|' }, get_url("APP/SALUD/SER405.DLL"))
          .then(data => {
            console.log(data)
            CON851("", "Proceso terminado", _toggleNav(), "success", "Exito");
          })
          .catch(err => {
            console.error(err)
            this._ventanacrearfact_SER405();
          });
      } else {
        if (this.form.tipo_SER405.trim() == "EVO" && this.SER405.OPERW.trim() == '') {
          postData({ datosh: datosEnvio() + ' |' + this.SER405.LLAVEEVOW + '|2|' + localStorage.Usuario + '|' + this.SER405.FECHAACTUAL.substring(2, 4) + '|' }, get_url("APP/SALUD/SER405.DLL"))
            .then(data => {
              console.log(data)
              CON851("", "Proceso terminado", _toggleNav(), "success", "Exito");
            })
            .catch(err => {
              console.error(err)
              this._ventanacrearfact_SER405();
            });
        } else {
          CON851("", "Proceso terminado", _toggleNav(), "success", "Exito");
        }
      }
    },




    _f8unidadserv_SER405(e) {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE UNIDADES DE SERVICIO",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER405.UNIDADSERVICIO,
        callback_esc: function () {
          $("#unidadservc_SER405").focus();
        },
        callback: function (data) {
          $("#unidadservc_SER405").val(data.COD);
          _enterInput("#unidadservc_SER405");
        },
      });
    },
    _f8capita_SER405() {
      var $_this = this;
      let URL = get_url("APP/SALUD/SER818A" + ".DLL");
      postData({
        datosh: datosEnvio() + this.SER405.NITPACIENTE + "|"
      }, URL)
        .then((data) => {
          loader("hide");
          $_this.SER405.FACTURANIT = data.NITFACT
          $_this.SER405.FACTURANIT.pop()
          if($_this.SER405.FACTURANIT.length == 0){
            CON851("", "No existen facturas con ese nit", null, "error", "error");
          }else{
            $_this.SER405.FILTROESTADO = $_this.SER405.FACTURANIT.filter(clase => clase.EST_NUM == '0');
            $_this.SER405.FILTROPREFIJO = $_this.SER405.FILTROESTADO.filter(clase => clase.PREF_NUM == 'A');
            _ventanaDatos({
              titulo: "VENTANA DE FACTURAS CAPITA - ABIERTAS: " +  this.SER405.DESCRIPPACIENTE,
              columnas: ["FACTURA", "NIT_NUM", "NOM_NUM", "NOM_PACI"],
              data: $_this.SER405.FILTROPREFIJO,
              callback_esc: function () {
                $(".factura_SER405").focus();
              },
              callback: function (data) {
                $_this.form.ingresenumero_SER405 = data.FACTURA.substring(1,7)
                _enterInput(".factura_SER405");
              },
            });
          }
        })
        .catch((error) => {
          console.log(error)
          this._evaluaringresofact_SER405()
        });
    }
  },
});
