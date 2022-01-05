// 30/12/2020 - DIANA ESCOBAR: CREADO
new Vue({
  el: "#SER405A",
  data: {
    SER405A: [],
    form: {
      atencimedica_SER405A: "",
      paciente_SER405A: "",
      descrippaciente_SER405A: "",
      atendido_SER405A: "",
      fecha_SER405A: "",
      hora_SER405A: "",
      faccapita_SER405A: "",
      ingreseprefijo_SER405A: "",
      factura_SER405A: "",
      ingresenumero_SER405A: "",
      DESCRIPEPS_SER405A: "",
      EPS_SER405A: "",
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
    nombreOpcion("9,4,5,2 - Consulta de triage por fecha");
    this.SER405A.UNSERW = "";
    this.SER405A.MESW = "";
    $_this = this;
    $_this.SER405A.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER405A.ANO_LNK = $_this.SER405A.FECHA_LNK.substring(0, 2);
    $_this.SER405A.MES_LNK = $_this.SER405A.FECHA_LNK.substring(2, 4);
    $_this.SER405A.DIA_LNK = $_this.SER405A.FECHA_LNK.substring(4, 6);
    $_this.SER405A.FECHAACTUAL = moment().format("YYYYMMDD");
    $_this.SER405A.ANOACTUAL = $_this.SER405A.FECHAACTUAL.substring(0, 4);
    $_this.SER405A.MESACTUAL = $_this.SER405A.FECHAACTUAL.substring(4, 6);
    $_this.SER405A.DIAACTUAL = $_this.SER405A.FECHAACTUAL.substring(6, 8);
    loader("hide");
    obtenerDatosCompletos(
      {
        nombreFd: "UNSERV",
      },
      function (data) {
        $_this.SER405A.UNISERVICIO = data.UNSERV;
        loader("hide");
        $_this._evaluarinicio_SER405A();
        $_this.SER405A.UNIDADSERVICIO = [];
        for (var i in $_this.SER405A.UNISERVICIO) {
          if ($_this.SER405A.UNISERVICIO[i].ESTADO.trim() == "S") {
            $_this.SER405A.UNIDADSERVICIO.push($_this.SER405A.UNISERVICIO[i]);
          }
        }
      },
    );
  },
  methods: {
    _evaluarinicio_SER405A() {
      validarInputs(
        {
          form: "#validaratencion_SER405A",
          orden: "1",
        }, () => {
          console.log('SALIDO')
          _toggleNav()
        },
        () => {
          this._evaluarinicio_SER405A()
        },
      );
    },
    _f8atencion_SER405A() {
      $_this = this;
      var ventanaconsultahc = bootbox.dialog({
        size: "large",
        title: "CONSULTA DE ATENCION TRIAGE POR FECHA",
        message:
          '<div class="row"> ' +
          '<div class="col-md-12"> ' +
          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' +
          "Fecha de proceso" +
          "</label> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAPROCESO_SER405A"> ' +
          '<input id="ano_SER405A" class="form-control input-md" data-orden="1" maxlength="4" placeholder= "AAAA"> ' +
          "</div> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAPROCESO_SER405A"> ' +
          '<input id="mes_SER405A" class="form-control input-md" data-orden="2" maxlength="2" placeholder= "MM"> ' +
          "</div> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAPROCESO_SER405A"> ' +
          '<input id="dia_SER405A" class="form-control input-md" data-orden="3" maxlength="2" placeholder= "DD"> ' +
          "</div> " +
          "</div> " +
          '<div class="salto-linea"></div>' +
          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' +
          "Prioridad de triage? " +
          "</label> " +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="PRIORIDAD_SER405A"> ' +
          '<input id="priroridadtri_SER405A" class="form-control input-md" data-orden="1" maxlength="1" placeholder= "1,2,3"> ' +
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
              setTimeout($_this._evaluarfacturacapita_SER405A, 300);
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanaconsultahc.off("show.bs.modal");
              setTimeout($_this._evaluarinicio_SER405A, 500);
            },
          },
        },
      });
      ventanaconsultahc.init($(".modal-footer").hide());
      ventanaconsultahc.init($_this._evaluarfecha_SER405A("1"));
      ventanaconsultahc.on("shown.bs.modal", function () {
        $("#ano_SER405A").focus();
      });
    },
    _evaluarfecha_SER405A(orden) {
      _inputControl("disabled");
      set_Event_validar('#validaratencion_SER405A', 'off');

      this.SER405A.ANOW = this.SER405A.ANOACTUAL
      this.SER405A.MESW = this.SER405A.MESACTUAL
      this.SER405A.DIAW = this.SER405A.DIAACTUAL
      $("#ano_SER405A").val(this.SER405A.ANOW);
      $("#mes_SER405A").val(this.SER405A.MESW);
      $("#dia_SER405A").val(this.SER405A.DIAW);
      validarInputs(
        {
          form: "#FECHAPROCESO_SER405A",
          orden: orden,
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          this.SER405A.ANOW = $("#ano_SER405A").val();
          this.SER405A.MESW = $("#mes_SER405A").val();
          this.SER405A.DIAW = $("#dia_SER405A").val();
          if (this.SER405A.ANOW.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfecha_SER405A("1"), "error", "error");
          } else {
            this.SER405A.MESW = this.SER405A.MESW.padStart(2, "0");
            if (this.SER405A.MESW.trim() == "" || this.SER405A.MESW < 1 || this.SER405A.MESW > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfecha_SER405A("2"), "error", "error");
            } else {
              this.SER405A.DIAW = this.SER405A.DIAW.padStart(2, "0");
              if (this.SER405A.DIAW.trim() == "" || this.SER405A.DIAW < 1 || this.SER405A.DIAW > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfecha_SER405A("3"), "error", "error");
              } else {
                this.SER405A.FECHAW = this.SER405A.ANOW + this.SER405A.MESW + this.SER405A.DIAW;
                this._evaluarprioridadtriage_SER405A();
              }
            }
          }
        },
      );
    },
    _evaluarprioridadtriage_SER405A() {
      $("#priroridadtri_SER405A").val('*')
      validarInputs(
        {
          form: "#PRIORIDAD_SER405A",
          orden: "1",
        },
        () => {
          this._evaluarfecha_SER405A("3");
        },
        () => {
          this.SER405A.PRIORIDAD = $("#priroridadtri_SER405A").val().toUpperCase();
          if (this.SER405A.PRIORIDAD == "1" || this.SER405A.PRIORIDAD == "2" || this.SER405A.PRIORIDAD == '3' || this.SER405A.PRIORIDAD == '*') {
            let URL = get_url("APP/HICLIN/HC812.DLL");
            postData({ datosh: datosEnvio() + this.SER405A.FECHAW + '|' + localStorage.Usuario + '|S|S|' }, URL,)
              .then(data => {
                console.log("DEL DIA", data);
                this.SER405A.TRIAGE = data['REG-URG']
                this.SER405A.TRIAGE.pop()
                this.SER405A.TRIAGE.sort((a, b) => {
                  if (a.FACTURA_TRIA > b.FACTURA_TRIA) {
                    return 1;
                  }
                  if (a.FACTURA_TRIA < b.FACTURA_TRIA) {
                      return -1;
                  }
                  return 0;
                });
                if (this.SER405A.PRIORIDAD == '*') {
                  $_this = this
                  _ventanaDatos({
                    titulo: "CONSULTA DE ATENCION AL TRIAGE POR FECHA " + this.SER405A.TRIAGE[0].FECHA_TRIA,
                    columnas: ["HORA_TRIA", "COD_TRIA", "DESCRIP_PACI_TRIA", "EDAD_TRIA", "FACTURA_TRIA", "OPER_TRIA", "PRIORIDAD_TRIA"],
                    data: $_this.SER405A.TRIAGE,
                    ancho: "90%",
                    callback_esc: function () {
                      $(".btn-danger").click();
                    },
                    callback: function (data) {
                      $_this.form.paciente_SER405A = data.COD_TRIA;
                      $_this.form.descrippaciente_SER405A = data.DESCRIP_PACI_TRIA;
                      $_this.form.atendido_SER405A = data.OPER_TRIA;
                      $_this.form.fecha_SER405A = data.FECHA_TRIA;
                      $_this.form.hora_SER405A = data.HORA_TRIA;
                      $_this.form.coducta_SER405A = data.CONDUCTA_TRIA
                      $_this.form.prioridad_SER405A = data.PRIORIDAD_TRIA;
                      $_this.SER405A.FACTURA = data.FACTURA_TRIA
                      $_this.SER405A.LLAVETRIA = data.LLAVE_TRIA
                      $(".btn-primary").click();
                    },
                  });
                } else {
                  this.SER405A.TRIAGE2 = this.SER405A.TRIAGE.filter(clase => clase.PRIORIDAD_TRIA == this.SER405A.PRIORIDAD);
                  $_this = this
                  _ventanaDatos({
                    titulo: "CONSULTA DE ATENCION AL TRIAGE POR FECHA " + this.SER405A.TRIAGE[0].FECHA_TRIA,
                    columnas: ["HORA_TRIA", "COD_TRIA", "DESCRIP_PACI_TRIA", "EDAD_TRIA", "FACTURA_TRIA", "OPER_TRIA", "PRIORIDAD_TRIA"],
                    data: $_this.SER405A.TRIAGE2,
                    ancho: "90%",
                    callback_esc: function () {
                      $(".btn-danger").click();
                    },
                    callback: function (data) {
                      $_this.form.paciente_SER405A = data.COD_TRIA;
                      $_this.form.descrippaciente_SER405A = data.DESCRIP_PACI_TRIA;
                      $_this.form.atendido_SER405A = data.OPER_TRIA;
                      $_this.form.fecha_SER405A = data.FECHA_TRIA;
                      $_this.form.hora_SER405A = data.HORA_TRIA;
                      $_this.form.coducta_SER405A = data.CONDUCTA_TRIA
                      $_this.form.prioridad_SER405A = data.PRIORIDAD_TRIA;
                      $_this.SER405A.FACTURA = data.FACTURA_TRIA
                      $_this.SER405A.LLAVETRIA = data.LLAVE_TRIA
                      $(".btn-primary").click();
                    },
                  });
                }
              })
              .catch(error => {
                console.error(error);
                this._evaluarprioridadtriage_SER405A()
              });
          } else {
            CON851("03", "03", this._evaluarprioridadtriage_SER405A(), "error", "error");
          }
        },
      );
    },
    _evaluarfacturacapita_SER405A() {
      this._consultapaciente_SER405A()
      if (this.form.faccapita_SER405A.trim() == '') this.form.faccapita_SER405A = 'N'
      validarInputs(
        {
          form: "#VALIDACAPITA_SER405A",
          orden: "1",
        },
        () => {
          this._evaluarinicio_SER405A()
        },
        () => {
          this.form.faccapita_SER405A = this.form.faccapita_SER405A.toUpperCase();
          if (this.form.faccapita_SER405A == 'S' || this.form.faccapita_SER405A == 'N') {
            if (this.form.faccapita_SER405A == 'S') {
              this._evaluaringresofact_SER405A()
            } else {
              this._ventanacrearfact_SER405A()
            }

          } else {
            CON851("03", "03", this._evaluarfacturacapita_SER405A(), "error", "error");
          }
        },
      );
    },
    _consultapaciente_SER405A() {
      let URL = get_url("APP/SALUD/SER810-1.DLL");
      postData({
        datosh: datosEnvio() + this.form.paciente_SER405A + "|",
      }, URL)
        .then(data => {
          this.SER405A.PACIENTES = data["REG-PACI"];
          this.SER405A.NITPACIENTE = this.SER405A.PACIENTES[0]["NIT-FACT"].trim();
          this.SER405A.DESCRIPPACIENTE = this.SER405A.PACIENTES[0]["DESCRIP-NIT-FACT"].trim();
          this.form.DESCRIPEPS_SER405A = this.SER405A.NITPACIENTE
          this.form.EPS_SER405A = this.SER405A.DESCRIPPACIENTE
        })
        .catch(error => {
          console.error(error)
          this._evaluarinicio_SER405()
        });
    },
    _evaluaringresofact_SER405A() {
      this.form.ingreseprefijo_SER405A = 'A'
      validarInputs(
        {
          form: "#VALIDAINGRESO_SER405A",
          orden: "1",
        },
        () => {
          this._evaluarfacturacapita_SER405A()
        },
        () => {
          if (this.form.ingresenumero_SER405A.trim() == '') {
            CON851("03", "03", this._evaluaringresofact_SER405A(), "error", "error");
          } else {
            this.SER405A.LLAVEW = this.form.ingreseprefijo_SER405A + this.form.ingresenumero_SER405A.toString().padStart(6, '0')
            let URL = get_url("APP/SALUD/SER808-01.DLL");
            postData({
              datosh: datosEnvio() + this.SER405A.LLAVEW + "|",
            }, URL)
              .then(data => {
                this.SER405A.FACTURACION = data.NUMER19[0];
                this.SER405A.NITNUM = this.SER405A.FACTURACION.NIT_NUM.trim()
                if (this.SER405A.NITPACIENTE != this.SER405A.NITNUM) {
                  CON851("", "factura no corresponde a entidad paciente", this._evaluaringresofact_SER405A(), "error", "error");
                } else {
                  if (this.SER405A.FACTURA.trim() == '' || this.SER405A.FACTURA == 000000) {
                    postData({ datosh: datosEnvio() + this.SER405A.LLAVETRIA + "|" + this.SER405A.LLAVEW + '|' }, get_url("APP/SALUD/SER405A.DLL"))
                      .then(data => {
                        console.log(data)
                        this._grabartriage_SER405A()
                      })
                      .catch(err => {
                        console.error(err)
                        this._evaluaringresofact_SER405A()
                      });
                  } else {
                    CON851("", "Triage ya tiene cargada factura", this._evaluaringresofact_SER405A(), "error", "error");
                  }
                }
              })
              .catch(error => {
                console.error(error)
                this._evaluaringresofact_SER405A()
              });
          }
        },
      );
    },
    _ventanacrearfact_SER405A() {
      validarInputs(
        {
          form: "#VALIDAFACT_SER405A",
          orden: "1",
        },
        () => {
          this._evaluarfacturacapita_SER405A();
        },
        () => {
          this.form.factura_SER405A = this.form.factura_SER405A.toUpperCase();
          if (this.form.factura_SER405A == 'S' || this.form.factura_SER405A == 'N') {
            if (this.form.factura_SER405A == 'S') {
              if (this.SER405A.FACTURA.trim() == '' || this.SER405A.FACTURA == 000000) {
                this.mostrarapertura = true;
                this.datos_apertura.triage = true;
                this.datos_apertura.idpac = this.form.paciente_SER405A;
                this.datos_apertura.llavetriage = this.SER405A.LLAVETRIA
                setTimeout(() => {
                  this.params_apertura.estado = true;
                }, 300);
              } else {
                CON851("", "Triage ya tiene cargada factura", this._ventanacrearfact_SER405A(), "error", "error");
              }
            } else {
              _toggleNav()
            }
          } else {
            CON851("03", "03", null, "error", "error");
            this._ventanacrearfact_SER405A()
          }
        },
      );
    },
    validarEsc_apertura() {
        this.mostrarapertura = false;
        setTimeout(() => {
            this.params_apertura.estado = false;
        }, 300);
        this._ventanacrearfact_SER405A()
    },
    validarCallback_apertura() {
        this.mostrarapertura = false;
        setTimeout(() => {
            this.params_apertura.estado = false;
        }, 300);
        this._grabartriage_SER405A()
    },
    _grabartriage_SER405A() {
      toastr.success('Se ha guardado factura en triage', 'EXITOSAMENTE');
      _toggleNav()
    },
    _f8capita_SER405A() {
      var $_this = this;
      let URL = get_url("APP/SALUD/SER818A" + ".DLL");
      postData({
        datosh: datosEnvio() + this.SER405A.NITPACIENTE + "|"
      }, URL)
        .then((data) => {
          loader("hide");
          $_this.SER405A.FACTURANIT = data.NITFACT
          $_this.SER405A.FACTURANIT.pop()
          if ($_this.SER405A.FACTURANIT.length == 0) {
            CON851("", "No existen facturas con ese nit", null, "error", "error");
          } else {
            $_this.SER405A.FILTROESTADO = $_this.SER405A.FACTURANIT.filter(clase => clase.EST_NUM == '0');
            $_this.SER405A.FILTROPREFIJO = $_this.SER405A.FILTROESTADO.filter(clase => clase.PREF_NUM == 'A');
            _ventanaDatos({
              titulo: "VENTANA DE FACTURAS CAPITA - ABIERTAS: " + this.SER405A.DESCRIPPACIENTE,
              columnas: ["FACTURA", "NIT_NUM", "NOM_NUM", "NOM_PACI"],
              data: $_this.SER405A.FILTROPREFIJO,
              callback_esc: function () {
                $(".factura_SER405A").focus();
              },
              callback: function (data) {
                $_this.form.ingresenumero_SER405A = data.FACTURA.substring(1, 7)
                _enterInput(".factura_SER405A");
              },
            });
          }
        })
        .catch((error) => {
          console.log(error)
          this._evaluaringresofact_SER405A()
        });
    }
  },
});
