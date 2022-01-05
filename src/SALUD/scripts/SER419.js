const { TouchBarSlider } = require("electron");

// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER419",
  data: {
    SER419: [],
    form: {
      novedad_SER419: "",
      ano_SER419: "",
      numero_SER419: "",
      prefijo_SER419: "",
      factura_SER419: "",
      nit_SER419: "",
      nombrenit_SER419: "",
      convenio_SER419: "",
      nombreconvenio_SER419: "",
      estado_SER419: "",
      idpaciente_SER419: "",
      nombrepaciente_SER419: "",
      hacitacion_SER419: "",
      fechaapert_SER419: "",
      unidadserv_SER419: "",
      copago_SER419: "",
      fechacierre_SER419: "",
      bloqueo_SER419: "",
      operelab_SER419: "",
      fechaelab_SER419: "",
      horacierre_SER419: "",
      
      horaapert_SER419: "",
      horasalida_SER419: "",
      minutossalida_SER419: "",
      boletaant_SER419: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,A,1 - Elabora boleta de salida");
    $_this = this;
    $_this.SER419.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER419.ANO_LNK = 20 + $_this.SER419.FECHA_LNK.substring(0, 2);
    $_this.SER419.MES_LNK = $_this.SER419.FECHA_LNK.substring(2, 4);
    $_this.SER419.DIA_LNK = $_this.SER419.FECHA_LNK.substring(4, 6);
    loader("hide");
    CON850($_this._validarnovedad_SER419);
  },
  methods: {
    _validarnovedad_SER419(novedad) {
      this.form.novedad_SER419 = novedad.id;
      if (this.form.novedad_SER419 == "F") {
        _toggleNav();
      } else {
        this.SER419.FECHASISTEMA = moment().format('YYYYMMDD');
        this.form.ano_SER419 = this.SER419.FECHASISTEMA.substring(0, 4)
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.form.novedad_SER419 = this.form.novedad_SER419 + " - " + novedad[this.form.novedad_SER419];
        switch (this.form.novedad_SER419.substring(0, 1)) {
          case "7":
            if (this.SER419.ANO_LNK == this.form.ano_SER419) {
              console.log('BUSCAR NUMERO')
              this._buscarnumero_SER419()
            } else {
              CON851("32", "32", setTimeout(_toggleNav, 500), "error", "Error")
            }
            break;
          case "8":
            if (this.form.novedad_SER419.substring(0, 1) == '8') {
              this.SER419.OPCSEGU = 'IS4A18'
            } else {
              this.SER419.OPCSEGU = 'IS4A19'
            }
            let URL = get_url("APP/CONTAB/CON904.DLL");
            postData({ datosh: datosEnvio() + localStorage.Usuario + '|' + this.SER419.OPCSEGU + '|' }, URL)
              .then(data => {
                this._evaluarnro_SER419()
              })
              .catch(err => {
                console.error(err)
                setTimeout(_toggleNav, 500)
              })
            break;
        }
      }
    },
    _buscarnumero_SER419() {
      let URL = get_url("APP/SALUD/SER419.DLL");
      postData({
        datosh: datosEnvio() + "1||" + this.form.ano_SER419 + "|",
      }, URL)
        .then(data => {
          this.form.numero_SER419 = data
          this._leernumeroorden_SER419()
        })
        .catch(error => {
          console.error(error)
          setTimeout(CON850(this._validarnovedad_SER419), 500)
        });

    },
    _evaluarnro_SER419() {
      validarInputs(
        {
          form: "#VALIDAR3_SER419",
          orden: "1",
        },
        () => { setTimeout(CON850(this._validarnovedad_SER419), 300) },
        () => {
          if (this.form.numero_SER419.trim() == "" || this.form.numero_SER419 == 0) {
            CON851('03', '03', this._evaluarnro_SER419(), 'error', 'error');
          } else {
            this._leernumeroorden_SER419()
          }
        },
      );
    },
    _leernumeroorden_SER419() {
      let URL = get_url("APP/SALUD/SER419.DLL");
      postData({
        datosh: datosEnvio() + "2|" + this.form.novedad_SER419.substring(0, 1) + "|" + this.form.ano_SER419 + this.form.numero_SER419.toString().padStart(6, '0') + "|",
      }, URL)
        .then(data => {
          this.SER419.ORDENSALIDA = data.ORDSALIDA[0];
          if (this.form.novedad_SER419.substring(0, 1) == '7') {
            CON851('00', '00', this._evaluarnro_SER419(), 'error', 'error');
          } else if (this.form.novedad_SER419.substring(0, 1) == '8') {
            this._mostrarordensal_SER419()
            setTimeout(this._evaluarfechasal_SER419, 300)
          } else if (this.form.novedad_SER419.substring(0, 1) == '9') {
            this._mostrarordensal_SER419()
            setTimeout(CON851P('02', this._evaluarnro_SER419, this._evaluargrabar_SER419), 300)
          }
        })
        .catch(error => {
          if (this.form.novedad_SER419.substring(0, 1) == '7') {
            this._evaluarprefijo_SER419()
          } else if (error.MENSAJE == "01" && this.form.novedad_SER419.substring(0, 1) == '8') {
            this._evaluarnro_SER419()
          } else if (error.MENSAJE == "01" && this.form.novedad_SER419.substring(0, 1) == '9') {
            this._evaluarnro_SER419()
          } else {
            this._evaluarnro_SER419()
          }
        });
    },
    _evaluarprefijo_SER419() {
      validarInputs(
        {
          form: "#VALIDAR4_SER419",
          orden: "1",
        },
        () => { this._evaluarnro_SER419() },
        () => {
          this.form.prefijo_SER419 = this.form.prefijo_SER419.toUpperCase()
          if (this.form.prefijo_SER419 == "A" || this.form.prefijo_SER419 == "P" || this.form.prefijo_SER419 == "T" || this.form.prefijo_SER419 == "B" || this.form.prefijo_SER419 == "D" || this.form.prefijo_SER419 == "F"
            || this.form.prefijo_SER419 == "G" || this.form.prefijo_SER419 == "H" || this.form.prefijo_SER419 == "I" || this.form.prefijo_SER419 == "J" || this.form.prefijo_SER419 == "K" || this.form.prefijo_SER419 == "L" || this.form.prefijo_SER419 == "M" || this.form.prefijo_SER419 == "N"
            || this.form.prefijo_SER419 == "O" || this.form.prefijo_SER419 == "Q" || this.form.prefijo_SER419 == "R" || this.form.prefijo_SER419 == "S" || this.form.prefijo_SER419 == "V" || this.form.prefijo_SER419 == "W" || this.form.prefijo_SER419 == "X" || this.form.prefijo_SER419 == "Y" || this.form.prefijo_SER419 == "Z") {
            console.log(this.form.factura_SER419, 'VACIO')
            if (this.form.factura_SER419.trim() == '') {
              this._buscarnrofact_SER419(this._leernumerofact_SER419)
            } else {
              this._leernumerofact_SER419()
            }

          } else {
            CON851('03', '03', this._evaluarprefijo_SER419(), 'error', 'error');
          }
        },
      );
    },
    _leernumerofact_SER419() {
      validarInputs(
        {
          form: "#VALIDAR5_SER419",
          orden: "1",
        },
        () => {
          $("#BOLETAANT_SER419").addClass("hidden");
          this._evaluarprefijo_SER419();
        },
        () => {
          // $('#BOLETAANT_SER419').addClass('hidden')
          if (this.form.factura_SER419 == 0 || this.form.factura_SER419.trim() == "") {
            CON851("03", "03", this._evaluarnro_SER419(), "error", "error");
          } else {
            let URL = get_url("APP/SALUD/SER808-01.DLL");
            postData(
              {
                datosh:
                  datosEnvio() +
                  this.form.prefijo_SER419 +
                  this.form.factura_SER419.toString().padStart(6, "0") +
                  "|" +
                  this.form.novedad_SER419.substring(0, 1) +
                  "|",
              },
              URL
            )
              .then((data) => {
                this.SER419.FACTURACION = data.NUMER19[0];
                this.form.unidadserv_SER419 = this.SER419.FACTURACION.UNSERV.trim();
                this.form.nit_SER419 = this.SER419.FACTURACION.NIT_NUM.trim();
                this.form.nombrenit_SER419 = this.SER419.FACTURACION.DESCRIP_NUM.trim();
                this.form.convenio_SER419 = this.SER419.FACTURACION.CONVENIO_NUM.trim();
                this.form.nombreconvenio_SER419 = this.SER419.FACTURACION.DESCRIP_TAR.trim();
                let estado = { 0: "ACTIVO", 1: "INACTIVO", 2: "ANULADO", 3: "BLOQUEO", 4: "BLOQUEO X DISPERSION" };
                if (estado[this.SER419.FACTURACION.ESTADO_NUM] == undefined) {
                  this.form.estado_SER419 = "";
                } else {
                  this.form.estado_SER419 = this.SER419.FACTURACION.ESTADO_NUM + " - " + estado[this.SER419.FACTURACION.ESTADO_NUM];
                }
                this.form.hacitacion_SER419 = this.SER419.FACTURACION.HAB_NUM.trim();
                this.form.copago_SER419 = this.SER419.FACTURACION.PORCENTCOP_NUM.trim();
                this.form.fechaapert_SER419 = this.SER419.FACTURACION.FECHA_ING.trim();
                this.form.fechacierre_SER419 = this.SER419.FACTURACION.FECHA_RET.trim();
                this.form.horaapert_SER419 = this.SER419.FACTURACION.HORAING_NUM.trim();
                this.form.horacierre_SER419 = this.SER419.FACTURACION.HORARET_NUM.trim();
                this.form.bloqueo_SER419 = this.SER419.FACTURACION.OPERBLOQ_NUM.trim();
                this.form.operelab_SER419 = this.SER419.FACTURACION.BOLSAL_NUM.substring(0, 4);
                this.form.fechaelab_SER419 = this.SER419.FACTURACION.BOLSAL_NUM.substring(4, 12);
                this._validarcierre_SER419();
              })
              .catch((error) => {
                console.error(error);
                this._leernumerofact_SER419();
              });
          }
        }
      );
    },
    _validarcierre_SER419() {
      if (this.form.prefijo_SER419 == "A") {
        this._buscarboletarepetida_SER419();
      } else {
        if (
          (this.form.prefijo_SER419 == "A" ||
            this.form.prefijo_SER419 == "P" ||
            this.form.prefijo_SER419 == "T" ||
            this.form.prefijo_SER419 == "B" ||
            this.form.prefijo_SER419 == "D" ||
            this.form.prefijo_SER419 == "F" ||
            this.form.prefijo_SER419 == "G" ||
            this.form.prefijo_SER419 == "H" ||
            this.form.prefijo_SER419 == "I" ||
            this.form.prefijo_SER419 == "J" ||
            this.form.prefijo_SER419 == "K" ||
            this.form.prefijo_SER419 == "L" ||
            this.form.prefijo_SER419 == "M" ||
            this.form.prefijo_SER419 == "N" ||
            this.form.prefijo_SER419 == "O" ||
            this.form.prefijo_SER419 == "Q" ||
            this.form.prefijo_SER419 == "R" ||
            this.form.prefijo_SER419 == "S" ||
            this.form.prefijo_SER419 == "V" ||
            this.form.prefijo_SER419 == "W" ||
            this.form.prefijo_SER419 == "X" ||
            this.form.prefijo_SER419 == "Y" ||
            this.form.prefijo_SER419 == "Z") &&
          this.form.estado_SER419.substring(0, 1) &&
          this.SER419.FACTURACION.FECHA_RET.substring(4, 6) > 0
        ) {
          this._buscarboletarepetida_SER419();
        } else {
          CON851("1B", "1B", null, "error", "error");
          if ($_USUA_GLOBAL[0].NIT == 800037021) {
            this._leernumerofact_SER419();
          } else {
            this._buscarboletarepetida_SER419();
          }
        }
      }
    },
    _buscarboletarepetida_SER419() {
      if ((this.form.novedad_SER419.substring(0, 1) == '7') && (this.form.prefijo_SER419 == "P" || this.form.prefijo_SER419 == "T" || this.form.prefijo_SER419 == "O" || this.form.prefijo_SER419 == "Q" || this.form.prefijo_SER419 == "R" || this.form.prefijo_SER419 == "S"
        || this.form.prefijo_SER419 == "U" || this.form.prefijo_SER419 == "V" || this.form.prefijo_SER419 == "W" || this.form.prefijo_SER419 == "X" || this.form.prefijo_SER419 == "Y" || this.form.prefijo_SER419 == "Z")) {
        this.SER419.FECHABUSQ = moment().format('YYYYMMDD');
        this.SER419.ANOBUSQ = this.SER419.FECHABUSQ.substring(0, 4)
        this.SER419.MESBUSQ = this.SER419.FECHABUSQ.substring(4, 6)
        this.SER419.DIABUSQ = this.SER419.FECHABUSQ.substring(6, 8)
        if (this.SER419.FECHABUSQ.substring(4, 6) > 1) {
          this.SER419.MESBUSQ = this.SER419.FECHABUSQ.substring(4, 6) - 1
        } else {
          this.SER419.MESBUSQ = 12
          this.SER419.ANOBUSQ = this.SER419.FECHABUSQ.substring(4, 6) - 1
        }
        this.SER419.FECHABUSQW = this.SER419.ANOBUSQ + this.SER419.MESBUSQ + this.SER419.DIABUSQ
        this._validarpaciente_SER419()

      } else {
        this._evaluarpaciente_SER419()
      }
    },
    _validarpaciente_SER419() {
      if (this.form.idpaciente_SER419 != '') {
        postData({ datosh: datosEnvio() + this.form.idpaciente_SER419 + "|" + this.SER419.FECHABUSQW + "|" + this.form.prefijo_SER419 + this.form.factura_SER419.toString().padStart(6, '0') + "|" }, get_url("APP/SALUD/SER836CR.DLL"))
          .then(data => {
            console.log(data)
            this.SER419.FACTP = data
            if (this.SER419.FACTP.trim() == '') {
              this._evaluarpaciente_SER419()
            } else {
              $('#BOLETAANT_SER419').removeClass('hidden');
              this.form.boletaant_SER419 = this.SER419.FACTP
              CON851('6N', '6N' + " " + this.SER419.FACTP, this._leernumerofact_SER419(), 'error', 'error');
            }
          })
          .catch(err => {
            console.error(err)
            this._leernumerofact_SER419()

          });
      } else {
        this._evaluarpaciente_SER419()
      }
    },
    _evaluarpaciente_SER419() {
      if (
        this.form.prefijo_SER419 == "P" ||
        this.form.prefijo_SER419 == "T" ||
        this.form.prefijo_SER419 == "O" ||
        this.form.prefijo_SER419 == "Q" ||
        this.form.prefijo_SER419 == "R" ||
        this.form.prefijo_SER419 == "S" ||
        this.form.prefijo_SER419 == "U" ||
        this.form.prefijo_SER419 == "V" ||
        this.form.prefijo_SER419 == "W" ||
        this.form.prefijo_SER419 == "X" ||
        this.form.prefijo_SER419 == "Y" ||
        this.form.prefijo_SER419 == "Z"
      ) {
        this.form.idpaciente_SER419 = this.SER419.FACTURACION.IDPAC_NUM.trim();
        this.nombrepaciente_SER419 = this.SER419.FACTURACION.PACIENTE_NUM.trim();
        this._validarcionespaciente1_SER419();
      } else {
        validarInputs(
          {
            form: "#VALIDAR6_SER419",
            orden: "1",
          },
          () => {
            this._leernumerofact_SER419();
          },
          () => {
            this.form.idpaciente_SER419 = this.form.idpaciente_SER419.toString().padStart(15, "0");
            this._validarcionespaciente1_SER419();
          }
        );
      }
    },
    _validarcionespaciente1_SER419() {
      if (
        ($_USUA_GLOBAL[0].NIT == 800037021 || $_USUA_GLOBAL[0].NIT == 800162035) &&
        (this.form.prefijo_SER419 == "P" ||
          this.form.prefijo_SER419 == "T" ||
          this.form.prefijo_SER419 == "O" ||
          this.form.prefijo_SER419 == "Q" ||
          this.form.prefijo_SER419 == "R" ||
          this.form.prefijo_SER419 == "S" ||
          this.form.prefijo_SER419 == "U" ||
          this.form.prefijo_SER419 == "V" ||
          this.form.prefijo_SER419 == "W" ||
          this.form.prefijo_SER419 == "X" ||
          this.form.prefijo_SER419 == "Y" ||
          this.form.prefijo_SER419 == "Z")
      ) {
        postData({ datosh: datosEnvio() + this.form.idpaciente_SER419 + "|" + localStorage.Usuario + "|" }, get_url("APP/SALUD/HC811R4.DLL"))
          .then((data) => {
            console.log(data, "HC");
            this.SER419.HISTORIAABIERTA = data.HCPACI[0];
            this.SER419.ESTADOW = this.SER419.HISTORIAABIERTA.ESTADO;
            if (this.SER419.ESTADOW == "1") {
              CON851("1C", "1C", null, "error", "error");
              if ($_USUA_GLOBAL[0].NIT == 800162035) {
                this._validacionespaciente2_SER419();
              } else {
                this._leernumerofact_SER419();
              }
            } else {
              this._validacionespaciente2_SER419();
            }
          })
          .catch((err) => {
            console.error(err);
            this._evaluarpaciente_SER419();
          });
      } else {
        this._validacionespaciente2_SER419();
      }
    },
    _validacionespaciente2_SER419() {
      if (this.form.idpaciente_SER419 == 0 || this.form.idpaciente_SER419.trim() == '') {
        CON851('3F', '3F', null, 'error', 'error');
        if (this.form.prefijo_SER419 == "A" || this.form.prefijo_SER419 == "P" || this.form.prefijo_SER419 == "T" || this.form.prefijo_SER419 == "B" || this.form.prefijo_SER419 == "D" || this.form.prefijo_SER419 == "F"
          || this.form.prefijo_SER419 == "G" || this.form.prefijo_SER419 == "H" || this.form.prefijo_SER419 == "I" || this.form.prefijo_SER419 == "J" || this.form.prefijo_SER419 == "K" || this.form.prefijo_SER419 == "L" || this.form.prefijo_SER419 == "M" || this.form.prefijo_SER419 == "N"
          || this.form.prefijo_SER419 == "O" || this.form.prefijo_SER419 == "Q" || this.form.prefijo_SER419 == "R" || this.form.prefijo_SER419 == "S" || this.form.prefijo_SER419 == "V" || this.form.prefijo_SER419 == "W" || this.form.prefijo_SER419 == "X" || this.form.prefijo_SER419 == "Y" || this.form.prefijo_SER419 == "Z") {
          this._evaluarpaciente_SER419()
        } else {
          this._leernumerofact_SER419()
        }
      } else {
        this._leerpaciente_SER419()
      }
    },
    _leerpaciente_SER419() {
      let URL = get_url("APP/SALUD/SER810-1.DLL");
      postData({
        datosh: datosEnvio() + this.form.idpaciente_SER419 + "|",
      }, URL)
        .then(data => {
          this.SER419.PACIENTEW = data["REG-PACI"];
          this.form.nombrepaciente_SER419 = this.SER419.PACIENTEW[0].DESCRIP
          let URL = get_url("APP/SALUD/SER419.DLL");
          postData({
            datosh: datosEnvio() + "3|" + this.form.novedad_SER419.substring(0, 1) + "|" + this.form.ano_SER419 + this.form.numero_SER419.toString().padStart(6, '0') + "|" + this.form.prefijo_SER419 + this.form.factura_SER419.toString().padStart(6, '0') + "|" + this.form.idpaciente_SER419 + "|",
          }, URL)
            .then(data => {
              console.log(data, 'CONSULTAS PACIENTE')
              this.SER419.SWBUSCAR = data.BUSCAR
              this._evaluarfechasal_SER419()
            })
            .catch(error => {
              console.error(error)
              if (error.MENSAJE == "01") {
                this._evaluarpaciente_SER419()
              } else if (error.MENSAJE == "9A") {
                this._evaluarfechasal_SER419()
              } else if (error.MENSAJE == "6L") {
                this._evaluarpaciente_SER419()
              } else {
                this._evaluarpaciente_SER419()
              }
            });
        })
        .catch(error => {
          console.error(error)
          if (this.form.prefijo_SER419 == "A" || this.form.prefijo_SER419 == "P" || this.form.prefijo_SER419 == "T" || this.form.prefijo_SER419 == "B" || this.form.prefijo_SER419 == "D" || this.form.prefijo_SER419 == "F"
            || this.form.prefijo_SER419 == "G" || this.form.prefijo_SER419 == "H" || this.form.prefijo_SER419 == "I" || this.form.prefijo_SER419 == "J" || this.form.prefijo_SER419 == "K" || this.form.prefijo_SER419 == "L" || this.form.prefijo_SER419 == "M" || this.form.prefijo_SER419 == "N"
            || this.form.prefijo_SER419 == "O" || this.form.prefijo_SER419 == "Q" || this.form.prefijo_SER419 == "R" || this.form.prefijo_SER419 == "S" || this.form.prefijo_SER419 == "V" || this.form.prefijo_SER419 == "W" || this.form.prefijo_SER419 == "X" || this.form.prefijo_SER419 == "Y" || this.form.prefijo_SER419 == "Z") {
            this._evaluarpaciente_SER419()
          } else {
            this._leernumerofact_SER419()
          }
        });
    },
    _evaluarfechasal_SER419() {
      if (this.form.novedad_SER419.substring(0, 1) == '7') {
        fechaMask_SER419.typedValue = moment().format('YYYY/MM/DD');
        this.SER419.HORAACTUAL = moment().format('HHmm');
        this.form.horasalida_SER419 = this.SER419.HORAACTUAL.substring(0,2)
        this.form.minutossalida_SER419 = this.SER419.HORAACTUAL.substring(2,4)
        this._evaluargrabar_SER419()
      } else {
        validarInputs(
          {
            form: "#VALIDAR7_SER419",
            orden: "1",
          },
          () => { this._evaluarpaciente_SER419() },
          () => {
            if (fechaMask_SER419.value.trim() == '' || fechaMask_SER419.value.length < 10) {
              this._evaluarfechasal_SER419()
            } else {
              if (moment(fechaMask_SER419.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
                this._evaluarfechasal_SER419()
              } else {
                this._evaluarhora_SER419('1')
              }
            }
          },
        );
      }
    },
    _evaluarhora_SER419(orden) {
      console.log('HORA')
      validarInputs(
        {
          form: "#VALIDAR8_SER419",
          orden: orden,
        },
        () => { this._evaluarfechasal_SER419() },
        ()=>{
          if (this.form.horasalida_SER419.trim() == '' || this.form.horasalida_SER419.trim() == 0 || this.form.minutossalida_SER419.trim() == '') {
            CON851("01", "01", this._evaluarhora_SER419(), "error", "error");
          } else {
            this._evaluargrabar_SER419()
          }
        }
      );
    },
    _evaluargrabar_SER419() {
      console.log('GRABADO')
      if (this.form.novedad_SER419.substring(0, 1) == '7') {
        this.SER419.OPERELABW = localStorage.getItem('Usuario')
        this.SER419.FECHAELABW = moment().format('YYYYMMDD')
        this.SER419.OPERMODW = ''
        this.SER419.FECHAMODW = '00000000'
      } else {
        this.SER419.OPERELABW = this.SER419.ORDENSALIDA.OPER_ELAB
        this.SER419.FECHAELABW = this.SER419.ORDENSALIDA.FECHA_ELAB
        this.SER419.OPERMODW = localStorage.getItem('Usuario')
        this.SER419.FECHAMODW = moment().format('YYYYMMDD')
      }
      this.SER419.FECHASALIDA = fechaMask_SER419.value.replace(/-/g, '')
      this.SER419.HORASALIDA = this.form.horasalida_SER419 + this.form.minutossalida_SER419
      this.SER419.LLAVEBOLETAW = this.form.ano_SER419 + this.form.numero_SER419.toString().padStart(6, '0')
      this.SER419.LLAVENUMW = this.form.prefijo_SER419 + this.form.factura_SER419.toString().padStart(6, '0')
      postData({ datosh: datosEnvio() + "4|" + this.form.novedad_SER419.substring(0, 1) + "|" + this.SER419.LLAVEBOLETAW + "|" + this.SER419.LLAVENUMW + "|" + this.form.idpaciente_SER419 + "|" + this.SER419.FECHASALIDA + "|" + this.SER419.HORASALIDA + "|" + this.SER419.OPERELABW + "|" + this.SER419.FECHAELABW + "|" + this.SER419.OPERMODW + "|" + this.SER419.FECHAMODW + "|" }, get_url("APP/SALUD/SER419.DLL"))
        .then(data => {
          console.log(data, 'FALTA IMPRESION')
          $_this = this
          var impresionboletasalida = {
            pageMargins: [10, 140, 10, 20],
            header: function (currentPage, pageCount, pageSize) {
              // you can apply any logic and return any valid pdfmake element
              return [
                { text: ' ' },
                {
                  image: "logo",
                  fit: [60, 60],
                  absolutePosition: { x: 40, y: 10 },
                },
                {
                  columns: ['', 'BOLETA DE SALIDA', 'FACTURA NRO:', $_this.SER419.LLAVENUMW],
                  style: 'titulos'
                },
                {
                  columns: ['', ' ', 'BOLETA NRO:', $_this.SER419.LLAVEBOLETAW],
                  style: 'titulos'
                },
                { text: ' ', style: 'titulos2' },
                { text: ' ', style: 'titulos2' },
                { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 580, y2: 5, lineWidth: 1 }] },
                { text: ' ', style: 'titulos2' },
                {
                  columns: [
                    { text: $_USUA_GLOBAL[0].NOMBRE, width: '50%', style: 'textheadertitle', margin: [20, 0] },
                    { text: 'NIT ' + $_USUA_GLOBAL[0].NIT, width: '80', style: 'textheader' },
                  ],
                },
                {
                  columns: [
                    { text: 'PACIENTE : ', width: '20%', style: 'textheadertitle', margin: [20, 0] },
                    { text: $_this.form.idpaciente_SER419.toString(), width: '30%', style: 'textheader' },
                    { text: $_this.form.nombrepaciente_SER419, width: '50%', style: 'textheader' },
                  ],
                },
                {
                  columns: [
                    { text: 'EMPRESA : ', width: '20%', style: 'textheadertitle', margin: [20, 0] },
                    { text: $_this.form.nit_SER419, width: '30%', style: 'textheader' },
                    { text: $_this.form.nombrenit_SER419, width: '50%', style: 'textheader' },
                  ],
                },
                {
                  columns: [
                    { text: 'FECHA SALIDA: ', width: '20%', style: 'textheadertitle', margin: [20, 0] },
                    { text: 'año ' + $_this.SER419.FECHASALIDA.substring(0,4) + ' mes '+  $_this.SER419.FECHASALIDA.substring(4,6) + ' dia ' + $_this.SER419.FECHASALIDA.substring(6,8), width: '30%', style: 'textheader' },
                  ],
                },
                { text: ' ', style: 'titulos2' },
                { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 2, lineWidth: 1 }] },
              ]
            },
            content: [

              {
                columns: [
                  { text: '', width: '30%', style: 'textheader' },
                  { text: '_________________________', width: '20%', style: 'textheader' },
                  { text: '', width: '5%', style: 'textheader' },
                  { text: '_________________________', width: '20%', style: 'textheader' },
                ]
              },
              {
                columns: [
                  { text: '', width: '30%', style: 'textheader' },
                  { text: 'AUTORIZO', width: '10%', style: 'textheader' },
                  { text: '', width: '15%', style: 'textheader' },
                  { text: 'ELABORO', width: '10%', style: 'textheader' },
                ]
              },
              {
                columns: [
                  { text: '', width: '30%', style: 'textheader' },
                  { text: '', width: '10%', style: 'textheader' },
                  { text: '', width: '15%', style: 'textheader' },
                  { text: 'Administrador del sistema', width: '20%', style: 'textheader' },
                  { text: '01 ADMI', width: '20%', style: 'textheader' },
                ]
              },
              {
                columns: [
                  { text: '', width: '30%', style: 'textheader' },
                  { text: '', width: '10%', style: 'textheader' },
                  { text: '', width: '15%', style: 'textheader' },
                  { text: fechaMask_SER419.value + ' ' + $_this.form.horasalida_SER419 + ':' + $_this.form.minutossalida_SER419, width: '20%', style: 'textheader' },
                  { text: 'IMPR: ' + localStorage.Usuario, width: '20%', style: 'textheader' },
                ]
              },
              { text: ' ', width: '30%', style: 'textheadertitle' },
              { text: 'OBSERVACIONES', width: '30%', style: 'textheader', margin: [20, 0] },
              { text: '_____________________________________________________________________________________', margin: [20, 0] },
              { text: '_____________________________________________________________________________________', margin: [20, 0] },
              { text: '_____________________________________________________________________________________', margin: [20, 0] },
              { text: '_____________________________________________________________________________________', margin: [20, 0] },
            ],
            styles: {
              titulos: {
                alignment: 'center',
                fontSize: 13,
                bold: true,
              },
              titulos2: {
                alignment: 'center',
                fontSize: 10,
                bold: true,
              },
              textheader: {
                alignment: 'rigth',
                fontSize: 9,
              },
              textheadertitle: {
                alignment: 'rigth',
                fontSize: 9,
                bold: true
              },
            }
          };
          impresionboletasalida.images = {
            logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png"
          };
          _impresion2({
            tipo: 'pdf',
            content: impresionboletasalida,
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
          })
            .then(() => {
              loader("hide");
              let Window = BrowserWindow.getAllWindows();
              if (Window.length > 1) {
                setTimeout(_cerrarSegundaVentana, 1000)

              } else {
                _toggleNav()
              };
            })
            .catch((err) => {
              console.error(err);
              _evaluarobservacionaper();
            });
          // CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err, 'error de grabado')
          this._evaluarhora_SER419()
        });
    },

    ////////////////MOSTRARDATOS///////////////////////////////////
    _mostrarordensal_SER419() {
      this.form.numero_SER419 = this.SER419.ORDENSALIDA.NRO_SAL
      this.form.prefijo_SER419 = this.SER419.ORDENSALIDA.FACT.substring(0, 1)
      this.form.factura_SER419 = this.SER419.ORDENSALIDA.FACT.substring(1, 7)
      fechaMask_SER419.typedValue = this.SER419.ORDENSALIDA.FECHA_SAL
      this.form.horasalida_SER419 = this.SER419.ORDENSALIDA.HORA_SAL.substring(0,2)
      this.form.minutossalida_SER419 = this.SER419.ORDENSALIDA.HORA_SAL.substring(2,4)
      this.form.operelab_SER419 = this.SER419.ORDENSALIDA.OPER_ELAB
      this.form.fechaelab_SER419 = this.SER419.ORDENSALIDA.FECHA_EL
      this.form.unidadserv_SER419 = this.SER419.SERVIC_NUM.trim() + " - "+  this.SER419.DESCRIP_HOSP.trim()
      this.form.nit_SER419 = this.SER419.ORDENSALIDA.NIT_NUM.trim()
      this.form.nombrenit_SER419 = this.SER419.ORDENSALIDA.DESCRIP_NUM.trim()
      this.form.convenio_SER419 = this.SER419.ORDENSALIDA.TAR.trim()
      this.form.nombreconvenio_SER419 = this.SER419.ORDENSALIDA.NOM_TAR.trim()
      let estado = { '0': 'ACTIVO', '1': 'INACTIVO', '2': 'ANULADO', '3': 'BLOQUEO', '4': 'BLOQUEO X DISPERSION' };
      if (estado[this.SER419.ORDENSALIDA.ESTADO] == undefined) {
        this.form.estado_SER419 = ""
      } else {
        this.form.estado_SER419 = this.SER419.ORDENSALIDA.ESTADO + ' - ' + estado[this.SER419.ORDENSALIDA.ESTADO]
      }
      this.form.idpaciente_SER419 = this.SER419.ORDENSALIDA.PACI.trim()
      this.form.nombrepaciente_SER419 = this.SER419.ORDENSALIDA.NOM_PACI.trim()
      this.form.hacitacion_SER419 = this.SER419.ORDENSALIDA.HAB.trim()
      this.form.copago_SER419 = this.SER419.ORDENSALIDA.PORCENT.trim()
      this.form.fechaapert_SER419 = this.SER419.ORDENSALIDA.FECHA_ING.trim()
      this.form.fechacierre_SER419 = this.SER419.ORDENSALIDA.FECHA_RET.trim()
      this.form.bloqueo_SER419 = this.SER419.ORDENSALIDA.OPER_BLOQ.trim()
      this.form.operelab_SER419 = this.SER419.ORDENSALIDA.OPER_BOL.trim()
      this.form.fechaelab_SER419 = this.SER419.ORDENSALIDA.FECHA_BOL.trim()
      this.form.horaapert_SER419 = this.SER419.ORDENSALIDA.HORA_ING.trim()
      this.form.horacierre_SER419 = this.SER419.ORDENSALIDA.HORA_RET.trim()
    },
    _f8numero_SER419() {

    },
    _f8factura_SER419() {
      $_this = this
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Buscar por tercero', 'buscar por paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_this.SER419.FACT = data.COD;
          $_this.form.factura_SER419 = $_this.SER419.FACT.substring(1, 7)
          _enterInput('.factura_SER419');
        },
        cancel: () => {
          _enterInput('.factura_SER419');
        }
      };
      F8LITE(parametros);
    },
    _f8paciente_SER419() {
      $_this = this
      parametros = {
        dll: 'PACIENTES',
        valoresselect: ['Nombre del paciente'],
        f8data: 'PACIENTES',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
        callback: (data) => {
          this.form.idpaciente_SER419 = data.COD;
          _enterInput('.paciente_SER419');
        },
        cancel: () => {
          _enterInput('.paciente_SER419');
        }
      };
      F8LITE(parametros);
    },
    ///////////////otrasconsultas////////////////////
    _buscarnrofact_SER419(callback) {
      console.log('BUSCAR EN EL CON007')
      this.SER419.SECUNUM = "9" + this.form.prefijo_SER419
      let URL = get_url("APP/CONTAB/CON007.DLL");
      postData({ datosh: datosEnvio() + this.SER419.SECUNUM }, URL)
        .then(data => {
          var data = data.split("|");
          this.SER419.ULTFECHANUM = data[2].trim();
          this.SER419.NUMEROCTL = data[1].substring(3, 9);
          this.SER419.NROW = parseInt(this.SER419.NUMEROCTL) - 2;
          this.form.factura_SER419 = this.SER419.NROW.toString().padStart(6, '0')
          callback()

        })
        .catch(err => {
          console.error(err);
          callback()
        })

    }

  },
});

var fechaMask_SER419 = IMask($("#fechasalida_SER419")[0], {
  mask: Date,
  pattern: 'Y-m-d',
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: moment().format('YYYY'), to: moment().format('YYYY'), maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: moment().format('MM'), to: moment().format('MM'), maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY-MM-DD");
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY-MM-DD');
    return str;
  }
});