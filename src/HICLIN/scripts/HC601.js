const { TouchBarSlider } = require("electron");
const { trim } = require("jquery");

// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#HC601",
  data: {
    HC601: [],
    form: {
      paciente_HC601: "",
      nompaciente_HC601: "",
      folio_HC601: "",
      servicioinicial_HC601: "",
      servicioactual_HC601: "",
      descripservactual_HC601: "",
      fechaingreso_HC601: "",
      fechaegreso_HC601: "",
      estado_HC601: "",
      hacitacion_HC601: "",
      camaactual_HC601: "",
      servhosp_HC601: "",
      descriphosp_HC601: "",
      uniontemp_HC601: "",
      prefijo_HC601: "",
      factura_HC601: "",
      hora_HC601: "",
      entidad_HC601: "",
      nomentidad_HC601: "",
      fechacierre_HC601: "",
      horacierre_HC601: "",
      opercierre_HC601: "",
      codultcierre_HC601: "",
      fechareapertura_HC601: "",
      horareapertura_HC601: "",
      operreapertura_HC601: "",
      codultreapertura_HC601: "",
      descripnum_HC601: "",
      descripcama_HC601: "",
      numeroestado_HC601: "",
      estadocama_HC601: ""

    },
  },
  created() {
    _inputControl("disabled");
    loader("show");
    nombreOpcion("6,1 - Asignar cama o factura");
    $_this = this;
    $_this.HC601.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.HC601.ANO_LNK = 20 + $_this.HC601.FECHA_LNK.substring(0, 2);
    $_this.HC601.MES_LNK = $_this.HC601.FECHA_LNK.substring(2, 4);
    $_this.HC601.DIA_LNK = $_this.HC601.FECHA_LNK.substring(4, 6);
    loader("hide");
    $_this.HC601.DATOSPACIENTE = $_REG_HC
    console.log($_this.HC601.DATOSPACIENTE, 'DATOS PAC')
    obtenerDatosCompletos({
      nombreFd: 'UNSERV'
    }, function (data) {
      $_this.HC601.UNISERVICIO = data.UNSERV;
      loader("hide");
      $_this._leerpaciente_HC601()
      $_this.HC601.UNIDADSERVICIO = [];
      for (var i in $_this.HC601.UNISERVICIO) {
        if ($_this.HC601.UNISERVICIO[i].ESTADO.trim() == 'S') {
          $_this.HC601.UNIDADSERVICIO.push($_this.HC601.UNISERVICIO[i]);
        }
      }
      obtenerDatosCompletos({
        nombreFd: 'CAMAS'
      }, function (data) {
        $_this.HC601.CAMAS = data.CAMAS;
        $_this.HC601.CAMAS.pop();
        obtenerDatosCompletos({
          nombreFd: 'SERV_HOSP'
        }, function (data) {
          $_this.HC601.SERHOSP = data.SERVICIO;
          $_this.HC601.SERHOSP.pop();
        })
      })
    })
  },
  methods: {

    _leerpaciente_HC601() {
      let URL = get_url("APP/HICLIN/HC601.DLL");
      postData({
        datosh: datosEnvio() + "1|" + this.HC601.DATOSPACIENTE.llave_hc + "|",
      }, URL)
        .then(data => {
          console.log(data)
          this.HC601.DATOSHC = data.CONSULTAHC[0];
          this.form.paciente_HC601 = this.HC601.DATOSPACIENTE.llave_hc.substring(0, 15)
          this.form.nompaciente_HC601 = this.HC601.DATOSHC.NOM_PACI
          this.form.folio_HC601 = this.HC601.DATOSPACIENTE.llave_hc.substring(15, 23)
          this.form.servicioinicial_HC601 = this.HC601.DATOSHC.NOM1_UNIDSER
          this.form.servicioactual_HC601 = this.HC601.DATOSHC.UNIDSER
          this.form.descripservactual_HC601 = this.HC601.DATOSHC.NOM2_UNIDSER
          this.form.fechaingreso_HC601 = fecha_HC601(this.HC601.DATOSHC.FECHA_HC)
          this.form.fechaegreso_HC601 = fecha_HC601(this.HC601.DATOSHC.FECHA_EGRESO)
          this.form.estado_HC601 = this.HC601.DATOSHC.ESTADO
          this.form.hacitacion_HC601 = this.HC601.DATOSHC.HAB.trim()
          this.form.servhosp_HC601 = this.HC601.DATOSHC.COD_SERH
          this.form.descriphosp_HC601 = this.HC601.DATOSHC.NOM_SERH
          if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133
            || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900870633) {
            $('#UNION_HC601').removeClass('hidden');
            this.form.uniontemp_HC601 = this.HC601.DATOSHC.UTC
          } else {
            this.form.uniontemp_HC601 = ""
          }
          this.form.prefijo_HC601 = this.HC601.DATOSHC.FACTURA.substring(0, 1).trim()
          this.form.factura_HC601 = this.HC601.DATOSHC.FACTURA.substring(1, 7).trim()
          if (this.form.prefijo_HC601 == 0) this.form.prefijo_HC601 = ''; this.form.factura_HC601 = ''
          this.form.descripnum_HC601 = this.HC601.DATOSHC.NOM_NUM
          this.form.hora_HC601 = this.HC601.DATOSHC.HORA
          this.form.entidad_HC601 = this.HC601.DATOSHC.NIT_FACT.trim()
          this.form.nomentidad_HC601 = this.HC601.DATOSHC.NOM_FACT
          this.form.fechacierre_HC601 = fecha_HC601(this.HC601.DATOSHC.FECHA_CIERRE)
          this.form.horacierre_HC601 = this.HC601.DATOSHC.HORA_CIERRE
          this.form.opercierre_HC601 = this.HC601.DATOSHC.OPER_CIERRE
          this.form.codultcierre_HC601 = this.HC601.DATOSHC.COD_CIERRE
          this.form.fechareapertura_HC601 = fecha_HC601(this.HC601.DATOSHC.FECHA_REAPER)
          this.form.horareapertura_HC601 = this.HC601.DATOSHC.HORA_REAPER
          this.form.operreapertura_HC601 = this.HC601.DATOSHC.OPER_REAPER
          this.form.codultreapertura_HC601 = this.HC601.DATOSHC.COD_REAPER
          this.HC601.HABANT = this.HC601.DATOSHC.HAB_ANT
          this.HC601.EDADHC = this.HC601.DATOSHC.EDAD
          let URL = get_url("APP/HICLIN/HC890N.DLL");
          postData({
            datosh: datosEnvio() + this.form.paciente_HC601 + "|",
          }, URL)
            .then(data => {
              console.log(data)
              this.form.camaactual_HC601 = data
            })
            .catch(error => {
              console.error(error)
              this.form.camaactual_HC601 = ''
            });
          this._evaluarunserv_HC601()
        })
        .catch(error => {
          console.error(error)
          setTimeout(_regresar_menuhis, 500);
        });
    },
    _evaluarunserv_HC601() {
      let usuario = localStorage.Usuario,
        nit = $_USUA_GLOBAL[0].NIT;

      if (
        usuario == "GEBC" ||
        usuario == "ADMI" ||
        usuario == "LYRC" ||
        nit == 89200040 ||
        nit == 900648993 ||
        nit == 900804411 ||
        nit == 900870633 ||
        nit == 900264583
      ) {
        validarInputs(
          {
            form: "#VALIDAR1_HC601",
            orden: "1",
          },
          _regresar_menuhis,
          () => {
            if (this.form.servicioactual_HC601.trim() == "") {
              CON851("01", "01", this._evaluarunserv_HC601(), "error", "error");
            } else {
              this._consultarunidadserv_HC601();
            }
          }
        );
      } else {
        this._consultarunidadserv_HC601();
      }
    },
    _consultarunidadserv_HC601() {
      let URL = get_url("APP/HICLIN/HC601.DLL");
      postData({
        datosh: datosEnvio() + "2||" + this.form.servicioactual_HC601 + "|",
      }, URL)
        .then(data => {
          console.log(data)
          this.form.descripservactual_HC601 = data
          this._validacionhacitacion_HC601()
        })
        .catch(error => {
          console.error(error)
          if (this.form.servicioactual_HC601 == '88') {
            this._evaluarunserv_HC601()
          } else {
            this.form.descripservactual_HC601 = "****************"
            this._validacionhacitacion_HC601()
          }
        });
    },
    _validacionhacitacion_HC601() {
      let URL = get_url("APP/HICLIN/HC601.DLL");
      postData({
        datosh: datosEnvio() + "3|" + this.HC601.DATOSPACIENTE.llave_hc + "||" + this.form.hacitacion_HC601 + "|" + this.HC601.HABANT + "|",
      }, URL)
        .then(data => {
          this.HC601.ASIGCAMASW = data
          if (this.HC601.ASIGCAMASW == 'S') {
            this._evaluarhabitacion_HC601()
          } else {
            CON851P('51', this._evaluarnumero_SERA06F, this._evaluardll_SERA06F)
          }
        })
        .catch(error => {
          console.error(error)
          this._evaluarserviciohosp_HC601()
        });
    },
    _evaluarhabitacion_HC601() {
      validarInputs(
        {
          form: "#VALIDAR2_HC601",
          orden: "1",
        }, () => {
          if ((localStorage.getItem('Usuario') == 'GEBC' || localStorage.getItem('Usuario') == 'ADMI') || ($_USUA_GLOBAL[0].NIT == 89200040 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900870633 || $_USUA_GLOBAL[0].NIT == 900264583)) {
            this._evaluarunserv_HC601()
          } else {
            _regresar_menuhis();
          }
        },
        () => {
          this.form.hacitacion_HC601 = this.form.hacitacion_HC601.toUpperCase();
          if (this.form.hacitacion_HC601.trim() == '' && this.form.servicioactual_HC601 > 02) {
            CON851("02", "02", this._evaluarhabitacion_HC601(), "error", "error");
          } else {
            if (this.form.hacitacion_HC601.trim() == '' || this.form.hacitacion_HC601.trim() == 'SIN') {
              this.form.numeroestado_HC601 = ''
              this.form.estadocama_HC601 = ''
              this.form.descripcama_HC601 = ''
              this._evaluaruniontemp_HC601()
            } else {
              const res = this.HC601.CAMAS.find(e => e.COD == this.form.hacitacion_HC601);
              console.log(res, this.form.hacitacion_HC601)
              if (res == undefined) {
                CON851("01", "01", this._evaluarhabitacion_HC601(), "error", "error");
              } else {
                this.form.descripcama_HC601 = res.DESCRIPCION
                this.form.numeroestado_HC601 = res.ESTADO
                this.form.estadocama_HC60 = res.DESCRIP_EST
                this.HC601.SERVHOSPCAMA = res.SERVHO
                this.HC601.ESTADOCAMA = res.ESTADO
                this.HC601.PACICAMA = res.PACI
                this.HC601.NOMBPACICAMA = res.NOM_PACI
                if (this.HC601.PACICAMA == this.form.paciente_HC601) {
                  this._evaluarserviciohosp_HC601()
                } else {
                  if (this.HC601.ESTADOCAMA > 0 && this.form.hacitacion_HC601 != this.HC601.HABANT) {
                    CON851("1F", "1F", this._evaluarhabitacion_HC601(), "error", "error");
                  } else {
                    this._evaluarserviciohosp_HC601()
                  }
                }
              }
            }
          }
        },
      );
    },
    _evaluarserviciohosp_HC601() {
      if (this.form.hacitacion_HC601.trim() == '') {
        this.form.servhosp_HC601 = ''
        this._evaluaruniontemp_HC601()
      } else {
        if ($_USUA_GLOBAL[0].NIT == 800037021) {
          this.form.servhosp_HC601 = this.HC601.SERVHOSPCAMA
          this._evaluaruniontemp_HC601()
        } else {
          if (this.form.servhosp_HC601.trim() == '') this.form.servhosp_HC601 = this.HC601.SERVHOSPCAMA
          validarInputs(
            {
              form: "#VALIDAR3_HC601",
              orden: "1",
            }, this._evaluarhabitacion_HC601,
            () => {
              if (this.form.servhosp_HC601.trim() == '') {
                this.form.descriphosp_HC601 = ''
              } else {
                const res = this.HC601.SERHOSP.find(e => e.ID == this.form.servhosp_HC601);
                if (res == undefined) {
                  CON851("01", "01", this._evaluarserviciohosp_HC601(), "error", "error");
                } else {
                  this.form.descriphosp_HC601 = res.DESCRIPCION
                  this._evaluaruniontemp_HC601()
                }
              }
            },
          );
        }
      }
    },
    _evaluaruniontemp_HC601() {
      if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133
        || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900870633) {
        $('#UNION_HC601').removeClass('hidden');
        validarInputs(
          {
            form: "#UNION_HC601",
            orden: "1",
          }, this._evaluarserviciohosp_HC601,
          () => {
            this.form.uniontemp_HC601 = this.form.uniontemp_HC601.toUpperCase();
            if (this.form.uniontemp_HC601 == "S" || this.form.uniontemp_HC601 == 'N') {
              this._evaluarprefijofact_HC601()
            } else {
              CON851("03", "03", this._evaluaruniontemp_HC601(), "error", "error");
            }
          },
        );
      } else {
        this.form.uniontemp_HC601 = "N"
        this._evaluarprefijofact_HC601()
      }
    },
    _evaluarprefijofact_HC601() {
      validarInputs(
        {
          form: "#VALIDAR4_HC601",
          orden: "1",
        }, () => {
          if (this.form.hacitacion_HC601.trim() == '' || this.form.hacitacion_HC601.trim() == 'SIN') {
            this._evaluarhabitacion_HC601()
          } else {
            this._evaluarserviciohosp_HC601()
          }
        },
        () => {
          this.form.prefijo_HC601 = this.form.prefijo_HC601.toUpperCase();
          if (this.form.prefijo_HC601.trim() == '') {
            this._leernumero_HC601()
          } else {
            if (this.form.prefijo_HC601 == "A" || this.form.prefijo_HC601 == "B" || this.form.prefijo_HC601 == "D" || this.form.prefijo_HC601 == "F" || this.form.prefijo_HC601 == "G" || this.form.prefijo_HC601 == "H"
              || this.form.prefijo_HC601 == "I" || this.form.prefijo_HC601 == "J" || this.form.prefijo_HC601 == "K" || this.form.prefijo_HC601 == "L" || this.form.prefijo_HC601 == "M" || this.form.prefijo_HC601 == "N"
              || this.form.prefijo_HC601 == "P" || this.form.prefijo_HC601 == "T" || this.form.prefijo_HC601 == "C" || this.form.prefijo_HC601 == "E" || this.form.prefijo_HC601 == "O" || this.form.prefijo_HC601 == "Q"
              || this.form.prefijo_HC601 == "R" || this.form.prefijo_HC601 == "S" || this.form.prefijo_HC601 == "U" || this.form.prefijo_HC601 == "V" || this.form.prefijo_HC601 == "W" || this.form.prefijo_HC601 == "X"
              || this.form.prefijo_HC601 == "Y" || this.form.prefijo_HC601 == "Z") {
              this._evaluarrnumero_HC601()
            } else {
              this._evaluarprefijofact_HC601()
            }
          }
        },
      );
    },
    _evaluarrnumero_HC601() {
      validarInputs(
        {
          form: "#VALIDAR5_HC601",
          orden: "1",
        },
        () => {
          this._evaluarprefijofact_HC601()
        },
        () => {
          this.form.factura_HC601 = this.form.factura_HC601.toString().padStart(6, "0");
          this._leernumero_HC601()
        },
      );
    },
    _leernumero_HC601() {
      if (this.form.prefijo_HC601.trim() == '') {
        this.form.factura_HC601 = ''
        this.form.descripnum_HC601 = ''
        this.HC601.NITNUM = 0
        this.HC601.PACIENTENUM = 0
        this.HC601.FECHARETNUM = '00000000'
        this._validacionesnumeracion_HC601()
      } else {
        let URL = get_url("APP/SALUD/SER808-01.DLL");
        postData({
          datosh: datosEnvio() + this.form.prefijo_HC601 + this.form.factura_HC601 + "|",
        }, URL)
          .then(data => {
            this.HC601.FACTURACION = data.NUMER19[0];
            this.form.hora_HC601 = this.HC601.FACTURACION.HORAING_NUM.trim()
            this.form.descripnum_HC601 = this.HC601.FACTURACION.DESCRIP_NUM.trim()
            this.HC601.NITNUM = this.HC601.FACTURACION.NIT_NUM.trim()
            this.HC601.PACIENTENUM = this.HC601.FACTURACION.PACIENTE_NUM.trim()
            this.HC601.FECHARETNUM = this.HC601.FACTURACION.FECHA_RET.trim()
            this._validacionesnumeracion_HC601()
          })
          .catch(error => {
            console.error(error)
            this._evaluarrnumero_HC601()
          });
      }
    },
    _validacionesnumeracion_HC601() {
      if ((this.form.prefijo_HC601 == "P" || this.form.prefijo_HC601 == "T" || this.form.prefijo_HC601 == "O" || this.form.prefijo_HC601 == "Q" || this.form.prefijo_HC601 == "R" || this.form.prefijo_HC601 == "S"
        || this.form.prefijo_HC601 == "U" || this.form.prefijo_HC601 == "V" || this.form.prefijo_HC601 == "W" || this.form.prefijo_HC601 == "X" || this.form.prefijo_HC601 == "Y" || this.form.prefijo_HC601 == "Z")
        && (this.HC601.PACIENTENUM > 000000000000001) && (this.HC601.EDADHC.substring(0, 1) != 'D') && (this.form.paciente_HC601 != this.HC601.PACIENTENUM)) {
        CON851("06", "06", this._evaluarrnumero_HC601(), "error", "error");
      } else {
        if (this.HC601.FECHARETNUM.substring(4, 6) > 0 && this.HC601.FECHARETNUM < this.form.fechaingreso_HC601) {
          CON851("37", "37", null, "error", "error");
          if (localStorage.getItem('Usuario') == 'GEBC' || localStorage.getItem('Usuario') == 'ADMI') {
            this._evaluarnit_HC601()
          } else {
            this._evaluarrnumero_HC601()
          }
        } else {
          this._evaluarnit_HC601()
        }
      }
    },
    _evaluarnit_HC601() {
      if (this.form.prefijo_HC601.trim() != '' && this.form.entidad_HC601 == 0) this.form.entidad_HC601 = this.HC601.NITNUM
      if (this.form.entidad_HC601 != this.HC601.NITNUM) this.form.entidad_HC601 = this.HC601.NITNUM
      validarInputs(
        {
          form: "#VALIDAR6_HC601",
          orden: "1",
        }, () => {
          if (this.form.prefijo_HC601.trim() == '') {
            this._evaluarprefijofact_HC601()
          } else {
            this._evaluarrnumero_HC601()
          }
        },
        () => {
          this.form.entidad_HC601 = this.form.entidad_HC601.toString().padStart(10, "0");
          if (this.form.entidad_HC601.trim() == '' || this.form.entidad_HC601 == 0) {
            this.form.nomentidad_HC601 = ''
            CON851P("01", this._evaluarprefijofact_HC601, this._evaluargrabado_HC601);
          } else {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.entidad_HC601 + "|",
            }, URL)
              .then(data => {
                this.HC601.TERCEROS = data.TERCER[0];
                this.form.nomentidad_HC601 = this.HC601.TERCEROS.DESCRIP_TER
                CON851P("01", this._evaluarprefijofact_HC601, this._evaluargrabado_HC601);
              }).catch(error => {
                console.error(error)
                if (this.form.prefijo_HC601.trim() == '') {
                  this._evaluarnit_HC601()
                } else {
                  this._evaluarprefijofact_HC601()
                }
              });
          }
        },
      );
    },
    _evaluargrabado_HC601() {
      let URL = get_url("APP/HICLIN/HC601.DLL");
      postData({
        datosh: datosEnvio() + '4|' + this.HC601.DATOSPACIENTE.llave_hc + "|" + this.form.servicioactual_HC601 + "|" + this.form.hacitacion_HC601 + "|" + this.HC601.HABANT + "|" + this.form.servhosp_HC601 + "|" + this.form.uniontemp_HC601 + "|" + this.form.prefijo_HC601 + this.form.factura_HC601 + "|" + this.form.entidad_HC601 + "|" + localStorage.getItem('Usuario') + "|" + this.HC601.ASIGCAMASW + "|",
      }, URL)
        .then(data => {
          console.log(data)
          _inputControl('disabled');
          _inputControl('reset');
          _regresar_menuhis()

        }).catch(error => {
          console.error(error)
          this._evaluarnit_HC601()
        });
    },
    _f8factura_HC601() {
      $_this = this
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Buscar por tercero', 'buscar por paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_this.HC601.FACT = data.COD;
          $_this.form.factura_HC601 = $_this.HC601.FACT.substring(1, 7)
          _enterInput('.factura_HC601');
        },
        cancel: () => {
          _enterInput('.factura_HC601');
        }
      };
      F8LITE(parametros);
    },
    _f8cama_HC601() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE CAMAS',
        columnas: ["COD", "DESCRIPCION", "PACI", "DESCRIP_EST"],
        data: $_this.HC601.CAMAS,
        callback_esc: function () {
          $(".habitacion_HC601").focus();
        },
        callback: function (data) {
          $_this.form.hacitacion_HC601 = data.COD
          _enterInput('.habitacion_HC601');
        }
      });
    },
    _f8hospital_HC601() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
        columnas: ["ID", "DESCRIPCION"],
        data: $_this.HC601.SERHOSP,
        callback_esc: function () {
          $(".hospital_HC601").focus();
        },
        callback: function (data) {
          $_this.form.servhosp_HC601 = data.ID.trim();
          _enterInput('.hospital_HC601');
        }
      });
    },
    _f8terceros_HC601() {
      $_this = this
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          $_this.form.entidad_HC601 = data.COD.trim();
          _enterInput('.terceros_HC601');
        },
        cancel: () => {
          _enterInput('.terceros_HC601');
        }
      };
      F8LITE(parametros);
    },
    _f8uniservico_HC601() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE UNIDADES DE SERVICIOS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.HC601.UNIDADSERVICIO,
        callback_esc: function () {
          $(".uniservicio_HC601").focus();
        },
        callback: function (data) {
          $_this.form.servhosp_HC601 = data.COD.trim();
          _enterInput('.uniservicio_HC601');
        }
      });
    }

  },
});

var fecha_HC601 = IMask.createPipe({
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