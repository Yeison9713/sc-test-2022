module.exports = Vue.component("content_apertura", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      paciente: this.data,
      SER108: [],
      mostrarpacientes: false,
      params_pacientes: {
        estado: false,
      },
      datos_pacientes: {},
      textos: {
        novedad_SER108: "",
        prefijo_SER108: "",
        factura_SER108: "",
        undservicio_SER108: "",
        listorips_SER108: "",
        nit_SER108: "",
        nitd_SER108: "",
        convenio_SER108: "",
        conveniod_SER108: "",
        estado_SER108: "",
        sucur_SER108: "",
        descripsucur_SER108: "",
        retencion_SER108: "",
        bloq_SER108: "",
        pic_SER108: "",
        idpaciente_SER108: "",
        idpaciented_SER108: "",
        edad_SER108: "",
        tipo_SER108: "",
        habit_SER108: "",
        porcent_SER108: "",
        anoing_SER108: "",
        mesing_SER108: "",
        diaing_SER108: "",
        horaing_SER108: "",
        anosal_SER108: "",
        messal_SER108: "",
        diasal_SER108: "",
        horasal_SER108: "",
        servicio_SER108: "",
        descripservicio_SER108: "",
        redext_SER108: "",
        contrato_SER108: "",
        precapit_SER108: "",
        capit_SER108: "",
        costos_SER108: "",
        costosd_SER108: "",
        division_SER108: "",
        formadepago_SER108: "",
        envio_SER108: "",
        ctrldi_SER108: "",
        observacion_SER108: "",
        ctrlcont_SER108: "",
        cufe_SER108: "",
        detalle_SER108: "",
        bol_SER108: "",
        tipopaci_SER108: "*",
        mostrar_SER108: "",
        nivel_SER108: "",
        nropol_SER108: "",
        ruta_SER108: "",
        est_SER108: "000",
        clasificacion_SER108: "",
        remitido_SER108: "",
        origen_SER108: "",
        origend_SER108: "",
        tipoevento_SER108: "",
        ciudad_SER108: "",
        ciudadd_SER108: "",
        funauto_SER108: "",
        funautod_SER108: "",
        factrepetida_SER108: "",
        nroauto_SER108: "",
        obserapertura_SER108: "",
        tipodoctriage_SER108: "",
        pacientetriage_SER108: "",
        epstriage_SER108: "",
        nomepstriage_SER108: "",
        creado_SER108: "",
        creadod_SER108: "",
        modificado_SER108: "",
        modificadod_SER108: "",
        bloqueo_SER108: ""
      },
    };
  },
  components: {
    ventanapacientes: require("../../SALUD/scripts/maestropacientes.vue.js"),
  },
  watch: {
    "params.estado": function (estado) {
      if (estado)
        setTimeout(() => {
          this._mascarascajas_SER108()
          CON850(this._evaluarnovedad_SER108)
        }, 400);
    },

  },
  created() {
    $_this = this;
    $_this.SER108.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER108.ANO_LNK = 20 + $_this.SER108.FECHA_LNK.substring(0, 2);
    $_this.SER108.MES_LNK = $_this.SER108.FECHA_LNK.substring(2, 4);
    $_this.SER108.DIA_LNK = $_this.SER108.FECHA_LNK.substring(4, 6);
    $_this.SER108.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SER108.ANOACTUALW = $_this.SER108.FECHAACTUAL.substring(0, 4);
    $_this.SER108.MESACTUALW = $_this.SER108.FECHAACTUAL.substring(4, 6);
    $_this.SER108.DIAACTUAL = $_this.SER108.FECHAACTUAL.substring(6, 8);
    $_this.SER108.FACTURACION = []
    $_this.SER108.FACTURACION.ESTADO_NUM = ""
    $_this.SER108.FECHARETIROW = ""
    obtenerDatosCompletos({
      nombreFd: 'UNSERV'
    }, function (data) {
      $_this.SER108.UNISERVICIO = data.UNSERV;
      $_this.SER108.UNIDADSERVICIO = [];
      for (var i in $_this.SER108.UNISERVICIO) {
        if ($_this.SER108.UNISERVICIO[i].ESTADO.trim() == 'S') {
          $_this.SER108.UNIDADSERVICIO.push($_this.SER108.UNISERVICIO[i]);
        }
      }
      for (var i in $_this.SER108.UNIDADSERVICIO) {
        $_this.SER108.UNIDADSERVICIO[i].DESCRIP = `${$_this.SER108.UNIDADSERVICIO[i].COD} - ${$_this.SER108.UNIDADSERVICIO[i].DESCRIP}`;
        $_this.SER108.UNIDADSERVICIO[i].COD = i;
      }
      obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
        data = data.PREFIJOS;
        $_this.SER108.PREFIJOS = data;
        obtenerDatosCompletos({
          nombreFd: 'SUCURSALES'
        }, function (data) {
          $_this.SER108.SUCURSAL = data.SUCURSAL
          $_this.SER108.SUCURSAL.pop()
          obtenerDatosCompletos({
            nombreFd: 'TARIFAS'
          }, function (data) {
            $_this.SER108.TARIFAS = data.TARIFAS
            $_this.SER108.TARIFAS.pop()
            obtenerDatosCompletos({
              nombreFd: 'CAMAS'
            }, function (data) {
              $_this.SER108.CAMAS = data.CAMAS
              $_this.SER108.CAMAS.pop()
              obtenerDatosCompletos({
                nombreFd: 'SERV_HOSP'
              }, function (data) {
                $_this.SER108.SERVICIO = data.SERVICIO
                $_this.SER108.SERVICIO.pop()
                obtenerDatosCompletos({
                  nombreFd: 'COSTOS'
                }, function (data) {
                  $_this.SER108.COSTOS = data.COSTOS
                  obtenerDatosCompletos({
                    nombreFd: 'DIVISION'
                  }, function (data) {
                    $_this.SER108.DIVISION = data.CODIGOS
                    obtenerDatosCompletos({
                      nombreFd: 'CONTRATOS'
                    }, function (data) {
                      $_this.SER108.CONTRATOS = data.CONTRATOS
                      obtenerDatosCompletos({
                        nombreFd: 'IPS'
                      }, function (data) {
                        $_this.SER108.IPS = data.IPS
                        obtenerDatosCompletos({
                          nombreFd: 'CIUDADES'
                        }, function (data) {
                          $_this.SER108.CIUDAD = data.CIUDAD
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })

  },
  methods: {
    _evaluarnovedad_SER108(novedad) {
      this.textos.novedad_SER108 = novedad.id;
      if (this.textos.novedad_SER108 == "F") {
        this._escape_SER108()
      } else {
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.textos.novedad_SER108 = this.textos.novedad_SER108 + " - " + novedad[this.textos.novedad_SER108];
        switch (this.textos.novedad_SER108.substring(0, 1)) {
          case '7':
          case '8':
          case '9':
            if (this.textos.novedad_SER108.substring(0, 1) == '9') {
              if (localStorage.Usuario == "ADMI" || localStorage.Usuario == "GEBC") {
                this._evaluarCON007B_SER108()
              }
              else {
                CON851('14', '14', null, 'error', 'error');
                setTimeout(() => { CON850(this._evaluarnovedad_SER108); }, 500)
              }
            }
            else {
              this._evaluarCON007B_SER108()
            }
            break;
        }
      }
    },
    _evaluarCON007B_SER108() {
      postData({
        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
      }, get_url("APP/CONTAB/CON007B.DLL"))
        .then(data => {
          console.debug(data);
          data = data.split("|");
          if (data[1].substring(0, 1) == "0" || data[1].substring(0, 1) == "3" || data[1].substring(0, 1) == "5") {
            if (this.textos.novedad_SER108.substring(0, 1) == "7") {
              this._revisarpermisos_SER108(this._evaluarprefijo_SER108, this._terminar_SER108, params = { CODIGO: 'XXXXX' })
            } else {
              this._evaluarprefijo_SER108()
            }
          } else {
            setTimeout(() => { CON850(this._evaluarnovedad_SER108); }, 500)
          }
        })
        .catch(error => {
          console.error(error);
          CON851('', 'Ocurrio un error con el usuario', null, 'error', 'Error');
          setTimeout(() => { CON850(this._evaluarnovedad_SER108); }, 500)
        });
    },
    _evaluarprefijo_SER108() {
      validarInputs(
        {
          form: "#PREFIJOS_SER108",
          orden: '1'
        },
        () => { CON850(this._evaluarnovedad_SER108) },
        () => {
          this.textos.prefijo_SER108 = this.textos.prefijo_SER108.toUpperCase()
          postData({ datosh: `${datosEnvio()}1||${this.textos.prefijo_SER108}|` },
            get_url("APP/SALUD/SER108V2.DLL"))
            .then(data => {
              this.SER108.SWCLAVE = data
              this._revisarpermisos_SER108(() => { this._revisarpermisos_SER108(this._validacionesnovedad_SER108, this._evaluarprefijo_SER108, params = { CODIGO: 'IS41XY' }) }, this._evaluarprefijo_SER108, params = { CODIGO: 'IS41X' });
            })
            .catch(err => {
              console.error(err);
              this._evaluarprefijo_SER108()
            });
        }
      )
    },
    _validacionesnovedad_SER108() {
      if (this.textos.novedad_SER108.substring(0, 1) == "7") {
        if ($_USUA_GLOBAL[0].NIT == 830511298) {
          this.SER108.SUCOPERW = $_USUA_GLOBAL[0].PREFIJ
          this.BUSCARNUMERO(this._evaluarconsecutivo_SER108);
        } else {
          let URL = get_url("APP/CONTAB/CON003.DLL");
          postData({ datosh: datosEnvio() + localStorage.Usuario }, URL)
            .then(data => {
              data = data.split('|');
              this.SER108.SUCOPERW = data[2].trim();
              if (this.SER108.SUCOPERW == '01' || this.SER108.SUCOPERW == '02' || this.SER108.SUCOPERW == '03' || this.SER108.SUCOPERW == '04' || this.SER108.SUCOPERW == '05' || this.SER108.SUCOPERW == '06'
                || this.SER108.SUCOPERW == '07' || this.SER108.SUCOPERW == '08' || this.SER108.SUCOPERW == '09' || this.SER108.SUCOPERW == '10' || this.SER108.SUCOPERW == '11' || this.SER108.SUCOPERW == '12' || this.SER108.SUCOPERW == '13' || this.SER108.SUCOPERW == '14' || this.SER108.SUCOPERW == '15'
                || this.SER108.SUCOPERW == '16' || this.SER108.SUCOPERW == '17' || this.SER108.SUCOPERW == '18' || this.SER108.SUCOPERW == '19' || this.SER108.SUCOPERW == '20' || this.SER108.SUCOPERW == '21' || this.SER108.SUCOPERW == '22' || this.SER108.SUCOPERW == '23' || this.SER108.SUCOPERW == '24'
                || this.SER108.SUCOPERW == '25' || this.SER108.SUCOPERW == '26' || this.SER108.SUCOPERW == '27' || this.SER108.SUCOPERW == '28' || this.SER108.SUCOPERW == '29' || this.SER108.SUCOPERW == '30' || this.SER108.SUCOPERW == '31' || this.SER108.SUCOPERW == '32' || this.SER108.SUCOPERW == '33'
                || this.SER108.SUCOPERW == '34' || this.SER108.SUCOPERW == '35' || this.SER108.SUCOPERW == '36' || this.SER108.SUCOPERW == '37' || this.SER108.SUCOPERW == '38' || this.SER108.SUCOPERW == '39' || this.SER108.SUCOPERW == '40' || this.SER108.SUCOPERW == '41' || this.SER108.SUCOPERW == '42'
                || this.SER108.SUCOPERW == '43' || this.SER108.SUCOPERW == '44' || this.SER108.SUCOPERW == '45' || this.SER108.SUCOPERW == '46' || this.SER108.SUCOPERW == '47' || this.SER108.SUCOPERW == '48' || this.SER108.SUCOPERW == '49' || this.SER108.SUCOPERW == '50') {
                this.SER108.SUCUREDIT = this.SER108.SUCOPERW
              } else {
                this.SER108.SUCUREDIT = $_USUA_GLOBAL[0].PREFIJ
              }
              this.BUSCARNUMERO(this._evaluarconsecutivo_SER108);
            })
            .catch(err => {
              console.debug(err);
              this._evaluarprefijo_SER108()
            })
        }
      } else {
        this.BUSCARNUMERO(this._evaluarconsecutivo_SER108);
      }
    },
    _evaluarconsecutivo_SER108() {
      let URL = get_url("APP/CONTAB/CON007.DLL");
      postData({ datosh: datosEnvio() + this.SER108.SECUNUM }, URL)
        .then(data => {
          var data = data.split("|");
          this.SER108.ULTFECHA = data[2].trim();
          this.SER108.NUMEROCTL = data[1].substring(3, 9);
          this.SER108.LOTE = data[0].trim();
          if (this.textos.novedad_SER108.substring(0, 1) == "7") {
            this.textos.factura_SER108 = this.SER108.NUMEROCTL;
            if (this.SER108.ULTFECHA.substring(0, 2) > this.SER108.FECHA_LNK.substring(0, 2)) {
              CON851('37', '37', null, 'error', 'error');
              setTimeout(() => { CON850(this._evaluarnovedad_SER108); }, 500)
            } else {
              let prefijo = this.SER108.PREFIJOS[0].TABLA.filter(x => x.PREFIJO == this.textos.prefijo_SER108);
              if (prefijo.length > 0) {
                this.SER108.FECHAFINPREFIJO = `${prefijo[0].ANO_FIN}${prefijo[0].MES_FIN}${prefijo[0].DIA_FIN}`
                this.SER108.NROMAXIMO = prefijo[0].HASTA_NRO
                this.SER108.FECHAMAXIMA = moment(this.SER108.FECHAFINPREFIJO).subtract(5, "days").format("YYYYMMDD")
                this.SER108.CONSECUTIVOLOCAL = this.SER108.NUMEROCTL.toString().padStart(10, '0')
                if (this.SER108.CONSECUTIVOLOCAL > this.SER108.NROMAXIMO) {
                  CON851('', 'Supero numero maximo segun resolucion', null, 'error', 'error');
                  this._evaluarprefijo_SER108()
                } else {
                  if (this.SER108.FECHAMAXIMA < moment().format('YYYYMMDD') && this.SER108.FECHAFINPREFIJO > this.SER108.FECHAMAXIMA) {
                    this.SER108.VALORRESTANTE = this.SER108.FECHAFINPREFIJO - moment().format('YYYYMMDD')
                    if (this.SER108.FECHAFINPREFIJO < moment().format('YYYYMMDD')) {
                      CON851('', 'Resolucion de facturacion esta vencida', null, 'error', 'error');
                      this._evaluarprefijo_SER108()
                    } else {
                      CON851('', `${'Faltan ' + this.SER108.VALORRESTANTE + ' dia(s) para el vencimiento de la resolucion por prefijo'}`, null, 'warning', 'Advertencia!');
                      this._leernumero_SER108()
                    }
                  } else {
                    this._leernumero_SER108()
                  }
                }
              } else {
                CON851('03', '03', null, 'error', 'error');
                this._evaluarprefijo_SER108()
              }
            }
          } else {
            this.textos.factura_SER108 = parseInt(this.SER108.NUMEROCTL) - 1;
            this._evaluarnumero_SER108()
          }
        })
        .catch(err => {
          console.debug(err);
          this._evaluarprefijo_SER108()
        })
    },
    _evaluarnumero_SER108() {
      validarInputs({
        form: '#FACTURASER_SER108',
        orden: "1"
      },
        () => { this._evaluarprefijo_SER108() },
        () => {
          this._leernumero_SER108()
        },
      )
    },
    _leernumero_SER108() {
      this.textos.factura_SER108 = this.textos.factura_SER108.toString().padStart(6, '0')
      if (this.textos.factura_SER108 == 0) {
        CON851('13', '13', null, 'error', 'error');
        this._evaluarnumero_SER108()
      } else {
        this.SER108.LLAVEFACT = `${this.textos.prefijo_SER108}${this.textos.factura_SER108}`
        let URL = get_url("APP/SALUD/SER808-01.DLL");
        postData({
          datosh: datosEnvio() + this.SER108.LLAVEFACT + "|" + this.textos.novedad_SER108.substring(0, 1) + "|",
        }, URL)
          .then(data => {
            this.SER108.FACTURACION = data.NUMER19[0];
            if (this.textos.novedad_SER108.substring(0, 1) == '7') {
              CON851('00', '00', null, 'error', 'error');
              this._evaluarnumero_SER108()
            } else {
              this._mostrardatos_SER108()
            }
          })
          .catch(error => {
            if (this.textos.novedad_SER108.substring(0, 1) == '7') {
              this._evaluarnuevoregistro_SER108();
            } else if ((error.MENSAJE == "01") && (this.textos.novedad_SER108.substring(0, 1) == '8' || this.textos.novedad_SER108.substring(0, 1) == '9')) {
              this._evaluarnumero_SER108()
            } else {
              this._evaluarnumero_SER108()
            }
          });
      }
    },
    _evaluarnuevoregistro_SER108() {
      this.textos.estado_SER108 = "0 - ACTIVO"
      this._inicializar_SER108()
      this.SER108.FECHASISTEMA = moment().format('L');
      this.SER108.FECHAACT = moment().format('YYYYMMDD');
      this.SER108.ANOACT = this.SER108.FECHAACT.substring(0, 4);
      this.SER108.MESACT = this.SER108.FECHAACT.substring(4, 62);
      this.textos.sucur_SER108 = this.SER108.SUCUREDIT
      if (this.SER108.ANOALFA < this.SER108.ANOACT && this.SER108.MESALFA == 12) {
        let URL = get_url("APP/SALUD/SER108F.DLL");
        postData({
          datosh: `${datosEnvio()}${this.SER108.ANOALFA}|${this.SER108.LLAVEFACT}|`
        }, URL)
          .then(data => {
            if (data > '00') {
              CON851('2R', '2R', null, 'error', 'error');
              this._evaluarnumero_SER108()
            } else {
              this._evaluardatounidad_SER108()
            }
          }).catch(error => {
            this._evaluarnumero_SER108()
            console.error(error)
          });
      } else {
        this._evaluardatounidad_SER108()
      }
    },
    _evaluardatounidad_SER108() {
      if (this.textos.sucur_SER108 == '00' || this.textos.sucur_SER108 == '88') {
        this._evaluarCON007B_SER108()
      } else {
        POPUP({
          array: this.SER108.UNIDADSERVICIO,
          titulo: "UNIDADES DE SERVICIO",
          indices: [
            { id: 'COD', label: 'DESCRIP' }
          ],
          seleccion: this.textos.undservicio_SER108,
          callback_f: this._evaluarprefijo_SER108
        },
          data => {
            this.textos.undservicio_SER108 = data.DESCRIP
            if (($_USUA_GLOBAL[0].CTRL_FORMU == 'S') && (this.textos.prefijo_SER108 == 'P' || this.textos.prefijo_SER108 == 'T' || this.textos.prefijo_SER108 == 'O' || this.textos.prefijo_SER108 == 'Q' || this.textos.prefijo_SER108 == 'R' || this.textos.prefijo_SER108 == 'S' || this.textos.prefijo_SER108 == 'U' || this.textos.prefijo_SER108 == 'V' || this.textos.prefijo_SER108 == 'W' || this.textos.prefijo_SER108 == 'X' || this.textos.prefijo_SER108 == 'Y' || this.textos.prefijo_SER108 == 'Z')
              && (this.textos.novedad_SER108 == '7') && this.textos.undservicio_SER108 == '01') {
              console.log('VENTANA HC812AU')
            } else {
              this._validacionnit_SER108()
            }
          }
        );
      }
    },
    _validacionnit_SER108() {
      if ((localStorage.Usuario == "GEBC" || "ADMI" || "VSC1" || "CCAY" || "AMBA") || ($_USUA_GLOBAL[0].NIT == 830092718 || 900193162)) {
        this._evaluarnit_SER108()
      } else {
        this.textos.estado_SER108.substring(0, 1) == '1' ? this._evaluarhab_SER108() : this._evaluarnit_SER108()
      }
    },
    _evaluarnit_SER108() {
      this.textos.nitd_SER108 = "";
      validarInputs({
        form: "#NIT_SER108",
        orden: "1"
      }, () => { setTimeout(this._evaluardatounidad_SER108(), 300); },
        () => {

          this.textos.nit_SER108 = this.textos.nit_SER108.padStart(10, "0");
          if (this.textos.nit_SER108 == 0) {
            this._evaluarnit_SER108()
          } else {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: `${datosEnvio()}${this.textos.nit_SER108}|`
            }, URL)
              .then(data => {
                this.SER108.TERCEROS = data.TERCER[0];
                this.SER108.CONVENIOTER = this.SER108.TERCEROS.CONVENIO.trim()
                this.SER108.DESCRIPTER2 = this.SER108.TERCEROS.DESCRIP_TER2.trim()
                this.SER108.ZONATER = this.SER108.TERCEROS.ZONA.trim()
                this.SER108.NITTER = this.SER108.TERCEROS.NIT.trim()
                this.SER108.ENTIDADTER = this.SER108.TERCEROS.ENTIDAD.trim()
                this.SER108.ACTTER = this.SER108.TERCEROS.ACT_TER.trim()
                this.SER108.TIPOIDTER = this.SER108.TERCEROS.TIPO_ID.trim()
                this.SER108.REFER1TER = this.SER108.TERCEROS.REFER1.trim()
                if (this.textos.nitd_SER108.trim() == '' || this.textos.nit_SER108 != this.SER108.FACTURACION.NIT_NUM.trim() || this.textos.novedad_SER108.substring(0, 1) == '7') {
                  if (this.SER108.CONVENIOTER.trim() != '') {
                    this.textos.convenio_SER108 = this.SER108.CONVENIOTER
                  }
                }
                this.textos.nitd_SER108 = this.SER108.TERCEROS.DESCRIP_TER.trim()
                if (($_USUA_GLOBAL[0].PUC == 4 || $_USUA_GLOBAL[0].PUC == 6) && this.textos.nit_SER108 == 9999) {
                  this._revisarpermisos_SER108(this._evaluarconvenio_SER108, this._evaluarnit_SER108, params = { CODIGO: 'IS41PA' });
                } else {
                  this._evaluarconvenio_SER108()
                }
              }).catch(error => {
                console.error(error)
                if (this.SER108.SWTER == 0) {
                  console.log('SEGUNDA VENTANA DE TERCEROS')
                } else {
                  this._evaluarnit_SER108()
                }
              });
          }
        }
      )
    },
    _evaluardescripnit_SER108() {
      validarInputs({
        form: "#DESCRIPNIT_SER108",
        orden: "1"
      }, () => { this._evaluarnit_SER108() },
        () => {
          this.textos.nitd_SER108 = this.textos.nitd_SER108.toUpperCase()
          if (this.textos.nitd_SER108.trim() == '') {
            CON851("02", "02", null, "error", "error");
            return this._evaluardescripnit_SER108()
          }
          if (this.SER108.TIPOIDTER != "CC") {
            CON851("03", "03", null, "error", "error");
            return this._evaluardescripnit_SER108()
          }
          this._evaluarconvenio_SER108()
        }
      )
    },
    _evaluarconvenio_SER108() {
      validarInputs({
        form: "#CONVENIO_SER108",
        orden: "1"
      },
        () => { this._evaluarnit_SER108() },
        () => {
          this.textos.convenio_SER108 = this.textos.convenio_SER108.toUpperCase()
          if (this.SER108.CONVENIOTER != this.textos.convenio_SER108) {
            this._revisarpermisos_SER108(this._leerconvenio_SER108, this._evaluarconvenio_SER108, params = { CODIGO: 'IS41F' });
          } else {
            this._leerconvenio_SER108()
          }
        }
      )
    },
    _leerconvenio_SER108() {
      const res = this.SER108.TARIFAS.find(e => e.COD == this.textos.convenio_SER108);
      if (res == undefined) {
        CON851("01", "01", null, "error", "error");
        this._evaluarconvenio_SER108()
      } else {
        this.textos.conveniod_SER108 = res.DESCRIP;
        if (this.textos.novedad_SER108.substring(0, 1) == '7') {
          this.textos.estado_SER108 = '0 - ACTIVO'
          this._mostrarestado_SER108()
        } else {
          if (localStorage.Usuario != 'GEBC' && this.SER108.FACTURACION.FECHA_ING.substring(0, 4) > 1999) {
            setTimeout(() => {
              _ventanaclave_SALUD(() => { setTimeout(this._cambiarestado_SER108, 300) }, this._evaluarconvenio_SER108, params = { PREFIJO: this.textos.prefijo_SER108, SWCLAVE: this.SER108.SWCLAVE })
            }, 300);
          } else {
            this._cambiarestado_SER108()
          }
        }
      }
    },
    _cambiarestado_SER108() {
      obtenerDatosCompletos({ nombreFd: 'ESTADONUM' }, (data) => {
        var estado = data.ESTADONUM
        POPUP(
          {
            array: estado,
            titulo: "ESTADO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.textos.estado_SER108.substring(0, 1),
            callback_f: () => {
              this._evaluarconvenio_SER108()
            },
          },
          estado => {
            this.textos.estado_SER108 = estado.COD + " - " + estado.DESCRIP;
            this._evaluarestado1_SER108()
          },
        );
      })
    },
    _evaluarestado1_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 900147959 && this.textos.novedad_SER108 == "8" && this.SER108.FACTURACION.ESTADO_NUM.trim() == "0" && this.textos.estado_SER108.substring(0, 1) == "1") {
        this.textos.prefijo_SER108 = this.SER108.LLAVENUM.substring(0, 1)
        this.textos.factura_SER108 = this.SER108.LLAVENUM.substring(1, 7)
        if (this.textos.factura_SER108.substring(0, 1) == "9") {
          this._evaluarestado2_SER108()
        } else {
          CON851('14', '14', null, 'error', 'error');
          this.textos.estado_SER108 = this.SER108.FACTURACION.ESTADO_NUM.trim()
          return setTimeout(this._cambiarestado_SER108, 300)
        }

      } else {
        if (this.textos.estado_SER108.substring(0, 1) == '1' && this.SER108.FACTURACION.ESTADO_NUM.trim() != '1') {
          if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'JAPV') {
            this._evaluarestado2_SER108()
          } else {
            CON851('14', '14', null, 'error', 'error');
            this.textos.estado_SER108 = this.SER108.FACTURACION.ESTADO_NUM.trim()
            return setTimeout(this._cambiarestado_SER108, 300)
          }
        } else {
          this._evaluarestado2_SER108()
        }
      }
    },
    _evaluarestado2_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 844001287 && this.textos.novedad_SER108.substring(0, 1) == "8") {
        this.textos.bloqueo_SER108 = "GEBC";
      }
      if ($_USUA_GLOBAL[0].NIT == 845000038) {
        if (this.SER108.FACTURACION.ESTADO_NUM.trim() == "1" && this.textos.estado_SER108.substring(0, 1) == '0') {
          this._revisarpermisos_SER108(this._evaluarestado3_SER108, setTimeout(this._cambiarestado_SER108, 300), params = { CODIGO: 'IS41D' });
        } else {
          this._evaluarestado3_SER108()
        }
      } else {
        if (this.textos.novedad_SER108.substring(0, 1) == "8" && this.SER108.FACTURACION.ESTADO_NUM.trim() == "1" && this.SER108.FACTURACION.OPERBLOQ_NUM.trim() != localStorage.Usuario) {
          this._revisarpermisos_SER108(this._evaluarestado3_SER108, this._evaluarnumero_SER108, params = { CODIGO: 'IS41B' });
        } else {
          this._evaluarestado3_SER108()
        }
      }

    },
    _evaluarestado3_SER108() {
      if ((this.textos.novedad_SER108.substring(0, 1) == '8' && this.textos.estado_SER108.substring(0, 1) == '1') && (this.SER108.FACTURACION.ESTADO_NUM.trim() == '0' || this.SER108.FACTURACION.ESTADO_NUM.trim() == '2')) {
        if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'JAPV') {
          this._evaluarestado4_SER108()
        } else {
          CON851('14', '14', null, 'error', 'error');
          this.textos.estado_SER108 = this.SER108.FACTURACION.ESTADO_NUM.trim();
          return setTimeout(this._cambiarestado_SER108, 300)
        }
      } else {
        if (this.textos.novedad_SER108.substring(0, 1) == '8' && (this.SER108.FACTURACION.ESTADO_NUM.trim() == '1' || this.SER108.FACTURACION.ESTADO_NUM.trim() == '0') && this.textos.estado_SER108.substring(0, 1) == '2') {
          this._revisarpermisos_SER108(this._evaluarestado4_SER108, () => {
            if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI') { this._evaluarestado4_SER108 }
            else { setTimeout(this._cambiarestado_SER108, 300) }
          },
            params = { CODIGO: 'IS41X2' });
        } else {
          this._evaluarestado4_SER108()
        }
      }
    },
    _evaluarestado4_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 832002436 && this.textos.novedad_SER108.substring(0, 1) == "8" && (this.SER108.FACTURACION.ESTADO_NUM.trim() == "1" || this.SER108.FACTURACION.ESTADO_NUM.trim() == "0") && this.textos.estado_SER108.substring(0, 1) == "2") {
        CON851('14', '14', null, 'error', 'error');
        if (localStorage.Usuario != "GEBC" || localStorage.Usuario != "ADMI") {
          return setTimeout(this._cambiarestado_SER108, 300)
        }
      }
      if (this.textos.novedad_SER108.substring(0, 1) == "8" && this.textos.estado_SER108.substring(0, 1) != this.SER108.FACTURACION.ESTADO_NUM.trim() && this.SER108.FACTURACION.FECHA_RET.substring(0, 4) > 0) {
        if (this.SER108.ANOALFA != this.SER108.FACTURACION.FECHA_RET.substring(0, 4) || $_USUA_GLOBAL[0].FECHALNK.substring(2, 4) != this.SER108.FACTURACION.FECHA_RET.substring(4, 6)) {
          CON851('91', '91', null, 'error', 'error');
          if ($_USUA_GLOBAL[0].FECHALNK.substring(2, 4) == 01 || localStorage.Usuario != "GEBC" || localStorage.Usuario != "ADMI" || localStorage.Usuario != "JAPV") {
            this.textos.estado_SER108 = this.SER108.FACTURACION.ESTADO_NUM.trim();
            return setTimeout(this._cambiarestado_SER108, 300)
          }
        }
      }
      if (this.SER108.FACTURACION.ESTADO_NUM.trim() != "1" && this.textos.estado_SER108.substring(0, 1) == "1") {
        CON851('1B', '1B', null, 'error', 'error');
        if (localStorage.Usuario != "GEBC" || localStorage.Usuario != "ADMI" || localStorage.Usuario != "JAPV") {
          this.textos.estado_SER108 = this.SER108.FACTURACION.ESTADO_NUM.trim();
          return this._evaluarnumero_SER108()
        }
      } else {
        if ((this.SER108.FACTURACION.ESTADO_NUM.trim() == "1") && (this.textos.estado_SER108.substring(0, 1) != "1")) {
          this._revisarpermisos_SER108(this._mostrarestado_SER108, this._evaluarnumero_SER108, params = { CODIGO: 'IS410' });
        } else {
          this._mostrarestado_SER108()
        }
      }
    },
    _mostrarestado_SER108() {
      if (this.textos.estado_SER108.substring(0, 1) == '2' && this.textos.novedad_SER108.substring(0, 1) == "8" && $_USUA_GLOBAL[0].NIT == 892000264) {
        this._evaluarobservacion_SER108()
      } else {
        if ((this.textos.novedad_SER108.substring(0, 1) == "7" || this.textos.novedad_SER108.substring(0, 1) == "8") && (this.textos.estado_SER108.substring(0, 1) == "0") && (this.textos.prefijo_SER108 == "P" || this.textos.prefijo_SER108 == "T" || this.textos.prefijo_SER108 == "O" || this.textos.prefijo_SER108 == "Q" || this.textos.prefijo_SER108 == "R" || this.textos.prefijo_SER108 == "S" || this.textos.prefijo_SER108 == "U" || this.textos.prefijo_SER108 == "V" || this.textos.prefijo_SER108 == "W" || this.textos.prefijo_SER108 == "X" || this.textos.prefijo_SER108 == "Y" || this.textos.prefijo_SER108 == "Z")) {
          setTimeout(() => {
            _ventanaipsante_SALUD(this._evaluarretencion_SER108, () => { setTimeout(this._cambiarestado_SER108, 300) }, params = { NOMBREIPS: this.SER108.NOMBREIPSANT, VLRIPSANT: this.SER108.VLRIPSANT, VLRCOPIPSANT: this.SER108.VLRCOPIPSANT })
          }, 300);
        } else {
          this._evaluarretencion_SER108()
        }
      }

    },
    _evaluarretencion_SER108(data) {
      if (data == undefined) {
        this.SER108.NOMBREIPSANT = ""
        this.SER108.VLRIPSANT = ""
        this.SER108.VLRCOPIPSANT = ""
      } else {
        this.SER108.NOMBREIPSANT = data.NOMBREIPS
        this.SER108.VLRIPSANT = data.VALORCOP
        this.SER108.VLRCOPIPSANT = data.VALORIPS
      }
      if ($_USUA_GLOBAL[0].NIT == 844002258) {
        validarInputs({
          form: "#RETENCION_SER108",
          orden: "1"
        }, () => { this._evaluarconvenio_SER108() },
          () => {
            this.textos.retencion_SER108 = this.textos.retencion_SER108.padStart(2, '0')
            this._evaluarsucusal_SER108()
          }
        )
      } else {
        this.textos.retencion_SER108 = 00
        this._evaluarsucusal_SER108()
      }
    },
    _evaluarsucusal_SER108() {
      if (this.textos.sucur_SER108.trim() == '') this.textos.sucur_SER108 = $_USUA_GLOBAL[0].PREFIJ
      if ($_USUA_GLOBAL[0].NIT == 800037021 && this.textos.sucur_SER108 == 'GR') this.textos.sucur_SER108 = '01'
      validarInputs({
        form: "#SUCURSAL_SER108",
        orden: "1"
      }, () => { this._evaluarconvenio_SER108() },
        () => {
          this.textos.sucur_SER108 = this.textos.sucur_SER108.padStart(2, '0')
          const res = this.SER108.SUCURSAL.find(e => e.CODIGO == this.textos.sucur_SER108);
          if (res == undefined) {
            CON851("01", "01", null, "error", "error");
            this._evaluarsucusal_SER108()
          } else {
            this.textos.descripsucur_SER108 = res.DESCRIPCION
            this._evaluarpic_SER108()
          }
        }
      )
    },
    _evaluarpic_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 844001287 && this.SER108.ACTTER == "31") {
        validarInputs({
          form: "#PIC_SER108",
          orden: "1"
        }, () => { this._evaluarconvenio_SER108() },
          () => {
            this.textos.pic_SER108 = this.textos.pic_SER108.padStart(5, '0')
            if (this.textos.pic_SER108 == 0) {
              CON851("02", "02", null, "error", "error");
              this._evaluarpic_SER108()
            } else {
              this._evaluarpaciente_SER108()
            }
          }
        )
      } else {
        this.textos.pic_SER108 = "";
        this._evaluarpaciente_SER108()
      }
    },
    _evaluarpaciente_SER108() {
      if (this.textos.novedad_SER108.substring(0, 1) == '7' && this.textos.prefijo_SER108 == "A" && this.textos.idpaciente_SER108.trim() == '') {
        this.textos.idpaciente_SER108 = '1';
      }
      if (this.textos.novedad_SER108.substring(0, 1) == '7' && (this.textos.prefijo_SER108 == "P" || this.textos.prefijo_SER108 == "T" || this.textos.prefijo_SER108 == "O" || this.textos.prefijo_SER108 == "Q" || this.textos.prefijo_SER108 == "R" || this.textos.prefijo_SER108 == "S" ||
        this.textos.prefijo_SER108 == "U" || this.textos.prefijo_SER108 == "V" || this.textos.prefijo_SER108 == "W" || this.textos.prefijo_SER108 == "X" || this.textos.prefijo_SER108 == "Y" || this.textos.prefijo_SER108 == "Z")) {
        this.SER108.IDPACW2 = this.textos.idpaciente_SER108
      }
      if ($_USUA_GLOBAL[0].NIT == 844003225 || $_USUA_GLOBAL[0].NIT == 800037021 && (this.textos.prefijo_SER108 == "P" || this.textos.prefijo_SER108 == "T" || this.textos.prefijo_SER108 == "O" || this.textos.prefijo_SER108 == "Q" || this.textos.prefijo_SER108 == "R" || this.textos.prefijo_SER108 == "S" ||
        this.textos.prefijo_SER108 == "U" || this.textos.prefijo_SER108 == "V" || this.textos.prefijo_SER108 == "W" || this.textos.prefijo_SER108 == "X" || this.textos.prefijo_SER108 == "Y" || this.textos.prefijo_SER108 == "Z") && (this.textos.novedad_SER108.substring(0, 1) == '7') && (this.textos.pacientetriage_SER108.trim() != '')) {
        this.textos.idpaciente_SER108 = this.textos.pacientetriage_SER108;

      }
      if(this.paciente.idpac)this.textos.idpaciente_SER108 = this.paciente.idpac
      validarInputs({
        form: "#PACIENTE_SER108",
        orden: "1"
      }, () => { this._evaluarconvenio_SER108() },
        () => {
          this.textos.idpaciente_SER108 = this.textos.idpaciente_SER108.padStart(15, "0");
          if (this.textos.prefijo_SER108 != 'A' && this.textos.novedad_SER108.substring(0, 1) == "8" && this.textos.idpaciente_SER108 != this.SER108.IDPACW2) {
            postData({ datosh: datosEnvio() + this.SER108.LLAVEFACT + "|" }, get_url("APP/SALUD/SER835MO.DLL"))
              .then(data => {
                if (data.trim() > 0) CON851('7P', '7P', null, 'error', 'error')
                this._leerpaciente_SER108()
              })
              .catch(err => {
                console.error(err)
                this._evaluarpaciente_SER108()
              })
          } else {
            if (this.textos.idpaciente_SER108 == 0) {
              CON851('', 'Por favor escriba la identificacion de paciente', null, 'error', 'error');
              this._evaluarpaciente_SER108()
            } else {
              this._leerpaciente_SER108()
            }
          }
        }
      )
    },
    _leerpaciente_SER108() {
      if ((this.textos.prefijo_SER108 == 'T' || this.textos.prefijo_SER108 == 'V' || this.textos.prefijo_SER108 == 'W' || this.textos.prefijo_SER108 == 'Y' || this.textos.prefijo_SER108 == 'Z') && (this.textos.idpaciente_SER108 == "000000000000001") && $_USUA_GLOBAL[0].NIT != 830092719) {
        CON851('03', '03', null, 'error', 'error');
        return this._evaluarpaciente_SER108()
      } else {
        if (this.textos.idpaciente_SER108 == '000000000000001') {
          this.textos.edad_SER108 = ''
          this._validandoleerpaciente_SER108();
        } else {
          let URL = get_url("APP/SALUD/SER810-1.DLL");
          postData({
            datosh: datosEnvio() + this.textos.idpaciente_SER108 + "|",
          }, URL)
            .then(data => {
              this.SER108.PACIENTES = data["REG-PACI"][0];
              this.SER108.DERECHOPACI = this.SER108.PACIENTES.DERECHO
              this.SER108.NACIPACI = this.SER108.PACIENTES.NACIM
              this.SER108.EPSPACI = this.SER108.PACIENTES.EPS
              this.textos.idpaciented_SER108 = this.SER108.PACIENTES.DESCRIP
              var edad = calcular_edad(this.SER108.NACIPACI);
              this.textos.edad_SER108 = edad.unid_edad + edad.vlr_edad.toString().padStart('0')
              this.SER108.UNIDEDADW = edad.unid_edad;
              this.SER108.VLREDADW = edad.vlr_edad.toString().padStart('0');
              if ($_USUA_GLOBAL[0].NIT == 800037021 && (this.textos.prefijo_SER108 == 'A') || (this.textos.prefijo_SER108 == 'B') || (this.textos.prefijo_SER108 == 'D') || (this.textos.prefijo_SER108 == 'F') || (this.textos.prefijo_SER108 == 'G') || (this.textos.prefijo_SER108 == 'H') || (this.textos.prefijo_SER108 == 'I') || (this.textos.prefijo_SER108 == 'J') || (this.textos.prefijo_SER108 == 'K') || (this.textos.prefijo_SER108 == 'L') || (this.textos.prefijo_SER108 == 'M') || (this.textos.prefijo_SER108 == 'N')) {
                this._revisarbloqueos_SER108(this._validandoleerpaciente_SER108, this._evaluarpaciente_SER108, params = { CODIGO: 'IS767' });
              } else {
                this._validandoleerpaciente_SER108();
              }
            })
            .catch(error => {
              console.error(error)
              this.mostrarmaestropaciente()
              // let { ipcRenderer } = require("electron");
              // ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: this.textos.idpaciente_SER108 });
              // vector = ['on', 'Actualizando maestro de pacientes...']
              // _EventocrearSegventana(vector, this._evaluarpaciente_SER108);
            });
        }
      }
    },
    mostrarmaestropaciente() {
      console.log('NVDSKVNVKK')
      this.mostrarpacientes = true;
      this.datos_pacientes.idpaciente = this.textos.idpaciente_SER108
      this.datos_pacientes.novedad = "7"
      setTimeout(() => {
        this.params_pacientes.estado = true;
      }, 300);
    },
    validarEsc_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      this._evaluarpaciente_SER108()
    },
    validarCallback_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      this._evaluarpaciente_SER108()
    },
    _validandoleerpaciente_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 800162035 && this.SER108.DERECHOPACI == "2") {
        CON851('80', '80', null, 'error', 'error');
      }
      if ($_USUA_GLOBAL[0].NIT == 800162035 && $_USUA_GLOBAL[0].PREFIJ == "01" && (this.textos.prefijo_SER108 == 'P' || this.textos.prefijo_SER108 == 'O' || this.textos.prefijo_SER108 == 'Q' ||
        this.textos.prefijo_SER108 == 'R' || this.textos.prefijo_SER108 == 'S' || this.textos.prefijo_SER108 == 'U') && (this.textos.nit_SER108 != 222222222 || this.textos.nit_SER108 != 9999)) {
        if (this.SER108.ENTIDADTER.trim() != this.SER108.EPSPACI.trim()) {
          if (this.SER108.ENTIDADTER == 9999 && (localStorage.Usuario == "YPCL" || localStorage.Usuario == "ADMI" || localStorage.Usuario == "GEBC")) {
            this._buscarfacturarepetida_SER108();
          } else {
            CON851('9S', '9S', null, 'error', 'error');
            this._evaluarpaciente_SER108()
          }
        } else {
          this._buscarfacturarepetida_SER108();
        }
      } else {
        this._buscarfacturarepetida_SER108();
      }
    },
    _buscarfacturarepetida_SER108() {
      this.SER108.FECHABUSQ = moment().format('YYYYMMDD')
      this.SER108.ANOBUSQ = this.SER108.FECHABUSQ.substring(0, 4)
      this.SER108.MESBUSQ = this.SER108.FECHABUSQ.substring(4, 6)
      this.SER108.DIABUSQ = this.SER108.FECHABUSQ.substring(6, 8)
      if (($_USUA_GLOBAL[0].NIT == 900471031 || $_USUA_GLOBAL[0].NIT == 900004059) && this.textos.novedad_SER108.substring(0, 1) == '7' &&
        (this.textos.prefijo_SER108 != 'C' || this.textos.prefijo_SER108 == "A" || this.textos.prefijo_SER108 == "B" || this.textos.prefijo_SER108 == "D"
          || this.textos.prefijo_SER108 == "F" || this.textos.prefijo_SER108 == "G" || this.textos.prefijo_SER108 == "H" || this.textos.prefijo_SER108 == "I"
          || this.textos.prefijo_SER108 == "J" || this.textos.prefijo_SER108 == "K" || this.textos.prefijo_SER108 == "L" || this.textos.prefijo_SER108 == "M"
          || this.textos.prefijo_SER108 == "N")) {
        if (this.SER108.MESBUSQ > 1) {
          this.SER108.MESBUSQ = this.SER108.MESBUSQ - 1
          this._evaluarfactabiertas1_SER108()
        } else {
          if (this.SER108.MESBUSQ == 1) {
            this._evaluarfactabiertas1_SER108()
          } else {
            this.SER108.MESBUSQ = 12
            this.SER108.ANOBUSQ = this.SER108.ANOBUSQ - 1
            this._evaluarfactabiertas1_SER108()
          }
        }
      }
      if ($_USUA_GLOBAL[0].NIT == 800251482 && this.textos.novedad_SER108.substring(0, 1) == '7' && (this.textos.prefijo_SER108 == "A" || this.textos.prefijo_SER108 == "P" || this.textos.prefijo_SER108 == "B" || this.textos.prefijo_SER108 == "D" || this.textos.prefijo_SER108 == "F" || this.textos.prefijo_SER108 == "G" ||
        this.textos.prefijo_SER108 == "H" || this.textos.prefijo_SER108 == "I" || this.textos.prefijo_SER108 == "J" || this.textos.prefijo_SER108 == "K" || this.textos.prefijo_SER108 == "L" || this.textos.prefijo_SER108 == "M" || this.textos.prefijo_SER108 == "N" ||
        this.textos.prefijo_SER108 == "O" || this.textos.prefijo_SER108 == "Q" || this.textos.prefijo_SER108 == "R" || this.textos.prefijo_SER108 == "S" || this.textos.prefijo_SER108 == "U")) {
        this.SER108.MESBUSQ = 5
        this._evaluarfactabiertas1_SER108()
      }
      if (this.textos.novedad_SER108.substring(0, 1) == '7' && (this.textos.prefijo_SER108 == "P" || this.textos.prefijo_SER108 == "T" || this.textos.prefijo_SER108 == "O" || this.textos.prefijo_SER108 == "Q" || this.textos.prefijo_SER108 == "R" || this.textos.prefijo_SER108 == "S"
        || this.textos.prefijo_SER108 == "U" || this.textos.prefijo_SER108 == "V" || this.textos.prefijo_SER108 == "W" || this.textos.prefijo_SER108 == "X" || this.textos.prefijo_SER108 == "Y" || this.textos.prefijo_SER108 == "Z")) {
        if (this.SER108.MESBUSQ > 1) {
          this.SER108.MESBUSQ = this.SER108.MESBUSQ - 1
          this._evaluarfactabiertas2_SER108()
        } else {
          if (this.SER108.MESBUSQ == 1) {
            this._evaluarfactabiertas2_SER108()
          } else {
            this.SER108.MESBUSQ = 12
            this.SER108.ANOBUSQ = this.SER108.ANOBUSQ - 1
            this._evaluarfactabiertas2_SER108()
          }
        }
      } else {
        this._evaluartipoevento_SER108()
      }
    },
    _evaluarfactabiertas1_SER108() {
      this.SER108.FECHABUSQFINAL = this.SER108.ANOBUSQ.toString() + this.SER108.MESBUSQ.toString().padStart(2, 0) + this.SER108.DIABUSQ.toString().padStart(2, 0)
      if (this.textos.idpaciente_SER108 != '000000000000001') {
        postData({ datosh: datosEnvio() + this.textos.idpaciente_SER108 + '|' + this.SER108.FECHABUSQFINAL + '|' + this.SER108.LLAVEFACT + '|' }, get_url("APP/SALUD/SER836C.DLL"))
          .then(data => {
            this.SER108.FACTDUPLICADA = data.REPETIDO[0]
            this.SER108.FACTP = this.SER108.FACTDUPLICADA.FACTURA
            if (this.SER108.FACTP.trim() != '') {
              this.textos.factrepetida_SER108 = this.SER108.FACTP
              CON851('', `Tiene una factura abierta! ${this.textos.factrepetida_SER108}`, null, 'error', 'error');
              return this._evaluarpaciente_SER108()
            }
            this._evaluartipoevento_SER108()
          })
          .catch(err => {
            console.error(err)
            this._evaluarpaciente_SER108()
          });
      } else {
        this._evaluartipoevento_SER108()
      }
    },
    _evaluarfactabiertas2_SER108() {
      this.SER108.FECHABUSQFINAL = this.SER108.ANOBUSQ.toString() + this.SER108.MESBUSQ.toString().padStart(2, 0) + this.SER108.DIABUSQ.toString().padStart(2, 0)
      if (this.textos.idpaciente_SER108 != '000000000000001') {
        postData({ datosh: datosEnvio() + this.textos.idpaciente_SER108 + '|' + this.SER108.FECHABUSQFINAL + '|' + this.SER108.LLAVEFACT + '|' }, get_url("APP/SALUD/SER836C.DLL"))
          .then(data => {
            this.SER108.FACTDUPLICADA = data.REPETIDO[0]
            this.SER108.FACTP = this.SER108.FACTDUPLICADA.FACTURA
            if (this.SER108.FACTP.trim() != '') {
              this.textos.factrepetida_SER108 = this.SER108.FACTP
              CON851('', `Tiene una factura abierta! ${this.textos.factrepetida_SER108}`, null, 'error', 'error');
              this._revisarpermisos_SER108(() => {if ($_USUA_GLOBAL[0].NIT == 892000264) {return this._evaluarpaciente_SER108()
                } else {
                  return this._evaluartipoevento_SER108()
                }
              }, ()=>{this._evaluarpaciente_SER108()}, params = { CODIGO: 'IS41Q' });
            } else {
              this._evaluartipoevento_SER108()
            }
          })
          .catch(err => {
            console.error(err)
            this._evaluarpaciente_SER108()
          });
      } else {
        this._evaluartipoevento_SER108()
      }
    },
    _evaluartipoevento_SER108() {
      if ($_USUA_GLOBAL[0].NIT != 900004059) {
        this._evaluardescrippaci_SER108()
      } else {
        var tipofact = [
          { COD: "1", DESCRIP: "EVENTO" },
          { COD: "2", DESCRIP: "CAPITA" },
        ];
        POPUP(
          {
            array: tipofact,
            titulo: "Tipos de factura",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.tipo_SER108,
            callback_f: () => {
              this._evaluarpaciente_SER108()
            },
          },
          tipofact => {
            this.tipo_SER108 = tipofact.COD + " - " + tipofact.DESCRIP;
            this._evaluardescrippaci_SER108()
          },
        );
      }
    },
    _evaluardescrippaci_SER108() {
      if (this.textos.idpaciente_SER108 == "000000000000001") {
        validarInputs({
          form: "#DESCRIPPACI_SER108",
          orden: "1"
        },
          () => { this._evaluarpaciente_SER108() },
          () => {
            this.textos.idpaciented_SER108 = this.textos.idpaciented_SER108.toUpperCase()
            this._evaluarhabitacion_SER108();
          }
        )
      } else {
        this._evaluarhabitacion_SER108();
      }
    },
    _evaluarhabitacion_SER108() {
      validarInputs(
        {
          form: "#HABIT_SER108",
          orden: "1",
        },
        () => {
          this._evaluarpaciente_SER108();
        },
        () => {
          this.textos.habit_SER108 = this.textos.habit_SER108.toUpperCase();
          if (
            this.textos.habit_SER108.trim() == "" &&
            (this.textos.prefijo_SER108 == "P" ||
              this.textos.prefijo_SER108 == "O" ||
              this.textos.prefijo_SER108 == "Q" ||
              this.textos.prefijo_SER108 == "R" ||
              this.textos.prefijo_SER108 == "S" ||
              this.textos.prefijo_SER108 == "U")
          ) {
            CON851("02", "02", null, "error", "error");
            this._evaluarhabitacion_SER108();
          } else {
            if (this.textos.habit_SER108.trim() == "" || this.textos.habit_SER108 == "SIN") {
              this._evaluarporcentaje_SER108();
            } else {
              const res = this.SER108.CAMAS.find((e) => e.COD == this.textos.habit_SER108);
              if (res == undefined) {
                CON851("01", "01", null, "error", "error");
                this._evaluarhabitacion_SER108();
              } else {
                this.SER108.ESTADOCAMA = res.ESTADO;
                this._evaluarporcentaje_SER108();
              }
            }
          }
        }
      );
    },
    _evaluarporcentaje_SER108() {
      if (this.SER108.ESTADOCAMA > 0 && this.textos.novedad_SER108.substring(0, 1) == '7') {
        CON851("1F", "1F", null, "error", "error");
      }
      validarInputs({
        form: "#PORCENTAJE_SER108",
        orden: "1"
      },
        () => { this._evaluarhabitacion_SER108() },
        () => {
          this.SER108.PORCENCOPAGOW = this.SER108.vlrcopagoMask_SER108.value.replace(',', '');
          if (this.SER108.PORCENCOPAGOW.trim() == '') {
            this.SER108.PORCENCOPAGOW = 0
          }
          this._evaluarfechaing_SER108();
        }
      )
    },
    _evaluarfechaing_SER108() {
      if (this.textos.novedad_SER108.substring(0, 1) == '7' && this.textos.anoing_SER108.trim() == '') {
        this.SER108.FECHAING = moment().format("YYYYMMDD");
        this.textos.anoing_SER108 = this.SER108.FECHAING.substring(0, 4)
        this.textos.mesing_SER108 = this.SER108.FECHAING.substring(4, 6)
        this.textos.diaing_SER108 = this.SER108.FECHAING.substring(6, 8)
        this.textos.horaing_SER108 = moment().format('HH:mm');
      }
      if (this.SER108.FACTURACION.ESTADO_NUM.trim() == '1') {
        (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI')
          ? this._evaluardiaing_SER108()
          : this._evaluarservicio_SER108()
      } else {
        this._evaluardiaing_SER108()
      }
    },
    _evaluaranoing_SER108() {
      validarInputs({
        form: "#ANOING_SER108",
        orden: "1"
      },
        () => { this._evaluarporcentaje_SER108() },
        () => {
          if ($.isNumeric(this.textos.anoing_SER108)) {
            this._evaluarmesing_SER108()
          } else {
            CON851("57", "57", null, "error", "error");
            this._evaluaranoing_SER108()
          }
        }
      )
    },
    _evaluarmesing_SER108() {
      validarInputs({
        form: "#MESING_SER108",
        orden: "1",
        event_f5: () => {
          this._revisarpermisos_SER108(this._evaluaranoing_SER108, this._evaluarmesing_SER108, params = { CODIGO: 'IS41C' });
        }
      },
        () => { this._evaluarporcentaje_SER108() },
        () => {
          this.textos.mesing_SER108 = this.textos.mesing_SER108.padStart(2, '0');
          if (this.textos.mesing_SER108 > 12 || this.textos.mesing_SER108 < 01) {
            CON851("37", "37", null, "error", "error");
            this._evaluarmesing_SER108()
          } else {
            if ($.isNumeric(this.textos.mesing_SER108)) {
              this.SER108.FECHAING = this.textos.anoing_SER108 + this.textos.mesing_SER108 + this.textos.diaing_SER108
              if (this.textos.novedad_SER108.substring(0, 1) == '7' || (this.textos.novedad_SER108.substring(0, 1) == '8' && this.SER108.FECHAING != this.SER108.FACTURACION.FECHA_ING && this.textos.anoing_SER108 == this.SER108.ANOALFA)) {
                postData({
                  datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${this.textos.mesing_SER108}|`
                }, get_url("APP/CONTAB/CON007B.DLL"))
                  .then(data => {
                    console.debug(data);
                    data = data.split("|");
                    if (data[1].substring(0, 1) != "0") {
                      this._evaluarmesing_SER108()
                    } else {
                      this._evaluardiaing_SER108()
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    CON851('', 'Ocurrio un error con el usuario', null, 'error', 'Error');
                    this._evaluarmesing_SER108()
                  });
              } else {
                this._evaluardiaing_SER108()
              }
            } else {
              CON851("57", "57", null, "error", "error");
              this._evaluarmesing_SER108()
            }
          }
        }
      )
    },
    _evaluardiaing_SER108() {
      validarInputs({
        form: "#DIAING_SER108",
        orden: "1",
        event_f5: () => {
          this._revisarpermisos_SER108(this._evaluarmesing_SER108, this._evaluardiaing_SER108, params = { CODIGO: 'IS41C' });
        }
      },
        () => { this._evaluarporcentaje_SER108() },
        () => {
          this.textos.diaing_SER108 = this.textos.diaing_SER108.padStart(2, "0");
          switch (parseInt(this.textos.mesing_SER108)) {
            case 01:
              this.SER108.DIAMAX = 31;
              break;
            case 02:
              this.SER108.DIAMAX = 29;
              break;
            case 03:
              this.SER108.DIAMAX = 31;
              break;
            case 04:
              this.SER108.DIAMAX = 30;
              break;
            case 05:
              this.SER108.DIAMAX = 31;
              break;
            case 06:
              this.SER108.DIAMAX = 30;
              break;
            case 07:
              this.SER108.DIAMAX = 31;
              break;
            case 08:
              this.SER108.DIAMAX = 31;
              break;
            case 09:
              this.SER108.DIAMAX = 30;
              break;
            case 10:
              this.SER108.DIAMAX = 31;
              break;
            case 11:
              this.SER108.DIAMAX = 30;
              break;
            case 12:
              this.SER108.DIAMAX = 31;
              break;
          }
          if (this.textos.diaing_SER108 < 01 || this.textos.diaing_SER108 > this.SER108.DIAMAX) {
            return this._evaluardiaing_SER108()
          } else {
            if ($.isNumeric(this.textos.diaing_SER108)) {
              this.SER108.FECHAING = this.textos.anoing_SER108 + this.textos.mesing_SER108 + this.textos.diaing_SER108
              this._evaluaranosal_SER108()
            } else {
              CON851("57", "57", null, "error", "error");
              return this._evaluardiaing_SER108()
            }
          }
        }
      )
    },
    _evaluaranosal_SER108() {
      if (this.textos.estado_SER108.substring(0, 1) == '1' && this.textos.anosal_SER108 == 0) {
        this.textos.anosal_SER108 = this.SER108.FECHAING.substring(0, 4)
        this.textos.messal_SER108 = this.SER108.FECHAING.substring(4, 6)
        this.textos.diasal_SER108 = "30"
      }
      validarInputs({
        form: "#ANOSAL_SER108",
        orden: "1"
      },
        () => { this._evaluardiaing_SER108() },
        () => {

          if (this.textos.anosal_SER108 > 0 && this.textos.anosal_SER108 < this.textos.anoing_SER108) {
            CON851("37", "37", null, "error", "error");
            return this._evaluaranosal_SER108()
          } else {
            if (this.textos.anosal_SER108.trim() == '' || this.textos.anosal_SER108 == 0) {
              this.textos.anosal_SER108 = "0000"
              this.textos.messal_SER108 = "00"
              this.textos.diasal_SER108 = "00"
              this._evaluarmessal_SER108()
            } else {
              if ($.isNumeric(this.textos.anosal_SER108)) {
                this._evaluarmessal_SER108()
              } else {
                CON851("57", "57", null, "error", "error");
                this._evaluaranosal_SER108()
              }
            }
          }
        }
      )
    },
    _evaluarmessal_SER108() {
      validarInputs({
        form: "#MESSAL_SER108",
        orden: "1"
      },
        () => { this._evaluaranosal_SER108(); },
        () => {
          this.textos.messal_SER108 = this.textos.messal_SER108.padStart(2, '0');
          if (this.textos.anosal_SER108 > 0 && this.textos.messal_SER108 == 0) {
            CON851("37", "37", null, "error", "error");
            return this._evaluarmessal_SER108()
          }
          if (this.textos.estado_SER108.substring(0, 1) == "1" && this.textos.messal_SER108 == 0) {
            CON851("37", "37", null, "error", "error");
            return this._evaluarmessal_SER108()
          }
          if ($.isNumeric(this.textos.messal_SER108) && (this.textos.messal_SER108 >= 1 || this.textos.messal_SER108 <= 12)) {
            this._evaluardiasal_SER108()
          } else {
            CON851("57", "57", null, "error", "error");
            return this._evaluarmessal_SER108()
          }
        }
      )
    },
    _evaluardiasal_SER108() {
      validarInputs({
        form: "#DIASAL_SER108",
        orden: "1"
      },
        () => { this._evaluarmessal_SER108() },
        () => {
          this.textos.diasal_SER108 = this.textos.diasal_SER108.padStart(2, '0');
          this.SER108.FECHARET = this.textos.anosal_SER108 + this.textos.messal_SER108 + this.textos.diasal_SER108
          if ((this.textos.anosal_SER108 > 0 || this.textos.messal_SER108 > 0) && this.textos.diasal_SER108 == 0) {
            CON851("37", "37", null, "error", "error");
            return this._evaluardiasal_SER108()
          }
          if ((this.textos.estado_SER108.substring(0, 1) == "1" || this.textos.estado_SER108.substring(0, 1) == '2') && (this.textos.diasal_SER108 == 0)) {
            return this._evaluardiasal_SER108()
          } else {
            if (!$.isNumeric(this.textos.diasal_SER108)) {
              CON851("57", "57", null, "error", "error");
              return this._evaluardiasal_SER108()
            }
            if (this.textos.messal_SER108 > 0 && this.SER108.FECHARET < this.SER108.FECHAING) {
              CON851("", "Fecha de retiro no puede ser menor a la ingreso", null, "error", "error");
              return this._evaluardiasal_SER108()
            } else {
              switch (parseInt(this.textos.messal_SER108)) {
                case 01:
                  this.SER108.DIAMAXEDIT = 31;
                  break;
                case 02:
                  this.SER108.DIAMAXEDIT = 29;
                  break;
                case 03:
                  this.SER108.DIAMAXEDIT = 31;
                  break;
                case 04:
                  this.SER108.DIAMAXEDIT = 30;
                  break;
                case 05:
                  this.SER108.DIAMAXEDIT = 31;
                  break;
                case 06:
                  this.SER108.DIAMAXEDIT = 30;
                  break;
                case 07:
                  this.SER108.DIAMAXEDIT = 31;
                  break;
                case 08:
                  this.SER108.DIAMAXEDIT = 31;
                  break;
                case 09:
                  this.SER108.DIAMAXEDIT = 30;
                  break;
                case 10:
                  this.SER108.DIAMAXEDIT = 31;
                  break;
                case 11:
                  this.SER108.DIAMAXEDIT = 30;
                  break;
                case 12:
                  this.SER108.DIAMAXEDIT = 31;
                  break;
              }
              if (this.textos.messal_SER108 > 0 && (this.textos.diasal_SER108 < 1 || this.textos.diasal_SER108 > this.SER108.DIAMAXEDIT)) {
                this._evaluardiasal_SER108()
              } else {
                if (this.SER108.FECHARET > 0 && this.SER108.FECHARET != this.SER108.FECHARETIROW) {
                  this.textos.horasal_SER108 = moment().format('HH:mm');
                } else {
                  if (this.SER108.FECHARET == 0) {
                    this.textos.horasal_SER108 = "00:00"
                  }
                }
                this._evaluarservicio_SER108()
              }
            }
          }
        }
      )
    },
    _evaluarservicio_SER108() {
      validarInputs({
        form: "#SERVICIO_SER108",
        orden: "1"
      },
        () => { this._evaluardiasal_SER108() },
        () => {
          this.textos.servicio_SER108 = this.textos.servicio_SER108.padStart(2, '0')

          if ((this.textos.prefijo_SER108 == 'P' || this.textos.prefijo_SER108 == 'T' || this.textos.prefijo_SER108 == 'O' || this.textos.prefijo_SER108 == 'Q' || this.textos.prefijo_SER108 == 'R' || this.textos.prefijo_SER108 == 'S' || this.textos.prefijo_SER108 == 'U' || this.textos.prefijo_SER108 == 'V' ||
            this.textos.prefijo_SER108 == 'W' || this.textos.prefijo_SER108 == 'X' || this.textos.prefijo_SER108 == 'Y' || this.textos.prefijo_SER108 == 'Z') && (this.textos.servicio_SER108 == "00" || this.textos.servicio_SER108.trim() == "")) {
            CON851('02', '02', null, 'error', 'error');
            return this._evaluarservicio_SER108()
          }

          if (this.textos.servicio_SER108 == "00" || this.textos.servicio_SER108.trim() == "") {
            this.textos.descripservicio_SER108 = 'NO APLICA'
            this._evaluarcontrato_SER108()
          } else {
            const res = this.SER108.SERVICIO.find(e => e.ID == this.textos.servicio_SER108)
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarservicio_SER108()
            } else {
              this.textos.descripservicio_SER108 = res.DESCRIPCION
              this._evaluarcontrato_SER108()
            }
          }
        }
      )
    },
    _evaluarcontrato_SER108() {
      if (($_USUA_GLOBAL[0].NIT == 800037979) && (this.textos.prefijo_SER108 == "A" || this.textos.prefijo_SER108 ==
        "B" || this.textos.prefijo_SER108 == "D" || this.textos.prefijo_SER108 == "F" || this.textos.prefijo_SER108 == "G" || this.textos.prefijo_SER108 == "H" || this.textos.prefijo_SER108 == "I" || this.textos.prefijo_SER108 == "J" || this.textos.prefijo_SER108 ==
        "K" || this.textos.prefijo_SER108 == "L" || this.textos.prefijo_SER108 == "M" || this.textos.prefijo_SER108 == "N")) {
        this.textos.contrato_SER108 = this.SER108.REFER1TER.substring(0, 19)
      }
      validarInputs({
        form: "#CONTRATO_SER108",
        orden: "1"
      },
        () => { this._evaluarservicio_SER108() },
        () => {
          this.textos.contrato_SER108 = this.textos.contrato_SER108.toUpperCase()
          if (($_USUA_GLOBAL[0].PUC == "4" || $_USUA_GLOBAL[0].PUC == "6") && this.SER108.ACTTER == "31" && this.textos.contrato_SER108.trim() == "") {
            CON851('02', '02', null, 'error', 'error');
          }
          if (this.SER108.ZONATER == '01' && $_USUA_GLOBAL[0].NIT != 892000264) {
            this._evaluarcosto_SER108()
          } else {
            this._evaluarcapita_SER108()
          }
        }
      )
    },
    _evaluarcapita_SER108() {
      validarInputs({
        form: "#PRECAPIT_SER108",
        orden: "1"
      },
        () => { this._evaluarcontrato_SER108() },
        () => {
          this.textos.precapit_SER108 = this.textos.precapit_SER108.toUpperCase()
          if (this.SER108.ZONATER == "02" && this.textos.precapit_SER108.trim() == "" && $_USUA_GLOBAL[0].NIT != 892000264) {
            CON851('02', '02', null, 'error', 'error');
            this._evaluarcapita_SER108()
          } else {
            switch (this.textos.precapit_SER108) {
              case 'A':
              case 'B':
              case 'D':
              case 'F':
              case 'G':
              case 'H':
              case 'I':
              case 'J':
              case 'K':
              case 'L':
              case 'M':
              case 'N':
                this._evaluarnrocapita_SER108()
                break;
              default:
                if ($_USUA_GLOBAL[0].NIT == 800162035 && (this.textos.nit_SER108 == 830006405 || this.textos.nit_SER108 == 830003565
                  || this.textos.nit_SER108 == 860525150)) {
                  CON851('02', '02', null, 'error', 'error');
                  this._evaluarcapita_SER108()
                } else {
                  this.textos.capit_SER108 = ''
                  this._evaluarcosto_SER108()
                }
                break;
            }
          }
        }
      )
    },
    _evaluarnrocapita_SER108() {
      validarInputs({
        form: "#CAPIT_SER108",
        orden: "1"
      },
        () => { this._evaluarcapita_SER108(); },
        () => {

          this.textos.capit_SER108 = this.textos.capit_SER108.padStart(6, "0");
          this.SER108.FACTCAPITA = this.textos.precapit_SER108 + this.textos.capit_SER108
          if (this.textos.capit_SER108 == 0) {
            this._evaluarnrocapita_SER108()
          } else {
            if (this.SER108.FACTCAPITA != this.SER108.LLAVEFACT) {
              postData({ datosh: `${datosEnvio()}${this.textos.prefijo_SER108}|${this.SER108.FACTCAPITA}|${this.textos.nit_SER108}|${this.SER108.FECHAING}|${this.SER108.FECHARET}` },
                get_url("APP/SALUD/SER108C.DLL"))
                .then(data => {
                  this._evaluarredexterna_SER108()
                })
                .catch(err => {
                  console.error(err);
                  this._evaluarnrocapita_SER108()
                });
            } else {
              this._evaluarredexterna_SER108()
            }
          }
        }
      )
    },
    _evaluarredexterna_SER108() {
      if (this.textos.prefijo_SER108 == "P" || this.textos.prefijo_SER108 == "T" || this.textos.prefijo_SER108 == "O" || this.textos.prefijo_SER108 == "Q" || this.textos.prefijo_SER108 == "R" || this.textos.prefijo_SER108 == "S"
        || this.textos.prefijo_SER108 == "U" || this.textos.prefijo_SER108 == "V" || this.textos.prefijo_SER108 == "W" || this.textos.prefijo_SER108 == "X" || this.textos.prefijo_SER108 == "Y" || this.textos.prefijo_SER108 == "Z") {
        this.textos.redext_SER108 = "N"
        this._evaluardivision_SER108()
      } else {
        if (this.textos.redext_SER108.trim() == '') this.textos.redext_SER108 = 'N'
        validarInputs({
          form: "#REDEXT_SER108",
          orden: "1"
        },
          () => { this._evaluarcapita_SER108() },
          () => {
            this.textos.redext_SER108 = this.textos.redext_SER108.toUpperCase()
            if (this.textos.redext_SER108 == 'S' || this.textos.redext_SER108 == 'N') {
              if ($_USUA_GLOBAL[0].NIT == 800162035 && (localStorage.Usuario == "MILE" || localStorage.Usuario == "YPCL")) {
                this._evaluarcosto_SER108()
              } else {
                if (this.textos.redext_SER108 == "S" && $_USUA_GLOBAL[0].NIT == 800162035 && this.textos.novedad_SER108.substring(0, 1) == "7") {
                  this.SER108.SECUNUM = "9x"
                  let URL = get_url("APP/CONTAB/CON007.DLL");
                  postData({ datosh: datosEnvio() + this.SER108.SECUNUM }, URL)
                    .then(data => {
                      var data = data.split("|");
                      this.SER108.ULTFECHA = data[2].trim();
                      this.SER108.NUMEROCTL = data[1].substring(3, 9);
                      this.SER108.LOTE = data[0].trim();
                      if (this.textos.novedad_SER108.substring(0, 1) == "7") {
                        this.textos.factura_SER108 = this.SER108.NUMEROCTL;
                      } else {
                        this.textos.factura_SER108 = parseInt(this.SER108.NUMEROCTL) - 1;
                      }
                      this._evaluarcosto_SER108()
                    })
                    .catch(err => {
                      this._evaluarredexterna_SER108()
                    })
                } else {
                  this._evaluarcosto_SER108()
                }
              }
            } else {
              this._evaluarredexterna_SER108()
            }
          }
        )
      }
    },
    _evaluarcosto_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 844004197 || $_USUA_GLOBAL[0].NIT == 900198903 || $_USUA_GLOBAL[0].NIT == 892001990
        || $_USUA_GLOBAL[0].NIT == 845000038 || $_USUA_GLOBAL[0].NIT == 800251482 || $_USUA_GLOBAL[0].NIT == 900565371
        || $_USUA_GLOBAL[0].NIT == 900658867 || $_USUA_GLOBAL[0].NIT == 900566047 || $_USUA_GLOBAL[0].NIT == 900541158
        || $_USUA_GLOBAL[0].NIT == 900471031 || $_USUA_GLOBAL[0].NIT == 901120152) {
        validarInputs({
          form: "#COSTOS_SER108",
          orden: "1"
        },
          () => { this._evaluarredexterna_SER108() },
          () => {
            this.textos.costos_SER108 = this.textos.costos_SER108.padStart(4, '0')
            const res = this.SER108.COSTOS.find(e => e.COD == this.textos.costos_SER108)
            if (res == undefined) {
              CON851('01', '01', null, 'error', 'error');
              this._evaluarcosto_SER108()
            } else {
              this.textos.costosd_SER108 = res.NOMBRE
              this._evaluardivision_SER108()
            }
          }
        )
      } else {
        this.textos.costos_SER108 = '0000'
        this._evaluardivision_SER108()
      }
    },
    _evaluardivision_SER108() {
      validarInputs({
        form: "#DIVISION_SER108",
        orden: "1"
      },
        () => { this._evaluarcontrato_SER108() },
        () => {
          if (this.textos.division_SER108.trim() == '') {
            this._evaluarformacopago_SER108()
          } else {
            const res = this.SER108.DIVISION.find(e => e.COD == this.textos.division_SER108)
            if (res == undefined) {
              CON851('01', '01', null, 'error', 'error');
              this._evaluardivision_SER108()
            } else {
              this._evaluarformacopago_SER108()
            }
          }
        }
      )
    },
    _evaluarformacopago_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 892000264 && this.textos.novedad_SER108.substring(0, 1) == "7") {
        this.textos.formadepago_SER108 = '1'
      }
      obtenerDatosCompletos({ nombreFd: 'PAGO' }, (data) => {
        var pago = data.PAGO;
        POPUP(
          {
            array: pago,
            titulo: "FORMAS DE PAGO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.textos.formadepago_SER108.substring(0, 1),
            callback_f: () => {
              this._evaluardivision_SER108()
            },
            teclaAlterna: true
          },
          pago => {
            this.textos.formadepago_SER108 = pago.COD + " - " + pago.DESCRIP;
            this._evaluarcontroldiag_SER108()
          },
        );
      })
    },
    _evaluarenvio_SER108() {
      validarInputs({
        form: "#ENVIO_SER108",
        orden: "1"
      },
        () => { this._evaluardivision_SER108() },
        () => {
          this.textos.envio_SER108 = this.textos.envio_SER108.toUpperCase()
          this._evaluarcontroldiag_SER108()
        }
      )
    },

    _evaluarcontroldiag_SER108() {
      if (this.textos.ctrldi_SER108.trim() == '') {
        if ($_USUA_GLOBAL[0].NIT == 890102044 || $_USUA_GLOBAL[0].NIT == 102044) {
          this.textos.ctrldi_SER108 = "S"
        } else {
          this.textos.ctrldi_SER108 = "N"
        }
      }
      validarInputs({
        form: "#CTRLDIAG_SER108",
        orden: "1"
      },
        () => { setTimeout(this._evaluarformacopago_SER108, 300); },
        () => {
          this.textos.ctrldi_SER108 = this.textos.ctrldi_SER108.toUpperCase()
          if (this.textos.ctrldi_SER108 == 'S' || this.textos.ctrldi_SER108 == 'N') {
            this._evaluarobservacion_SER108()
          } else {
            this._evaluarcontroldiag_SER108()
          }
        }
      )
    },
    _evaluarobservacion_SER108() {
      validarInputs({
        form: "#OBSERVACIONES_SER108",
        orden: "1",
        event_f5: this._evaluarenvio_SER108,
        event_f3: () => {
          if (this.textos.observacion_SER108.trim() != '') {
            CON851P('01', this._evaluarobservacion_SER108, this._validacionesgrabarcambio_SER108)
          } else {
            CON851("", "Dato obligatorio!", null, "error", "error");
            return this._evaluarobservacion_SER108()
          }
        }
      },
        () => { this._evaluarcontroldiag_SER108() },
        () => {
          this.textos.observacion_SER108 = this.textos.observacion_SER108.toUpperCase()
          if (this.textos.observacion_SER108.trim() == '' && this.textos.estado_SER108.substring(0, 1) == '2' && this.textos.novedad_SER108.substring(0, 1) == "8" && $_USUA_GLOBAL[0].NIT == 892000264) {
            CON851("", "Dato obligatorio!", null, "error", "error");
            return this._evaluarobservacion_SER108()
          }
          this._evaluarcontrolcap_SER108()
        }
      )
    },
    _evaluarcontrolcap_SER108() {
      _FloatText({ estado: 'on', msg: [{ mensaje: 'DIGITE 9999 SI NO HAY CONTRATO!' }] })
      validarInputs({
        form: "#CTRLCONT_SER108",
        orden: "1"
      },
        () => { this._evaluarobservacion_SER108() },
        () => {
          this.textos.ctrlcont_SER108 = this.textos.ctrlcont_SER108.padStart(4, '0')
          if (this.textos.ctrlcont_SER108 == 0) {
            CON851('02', '02', null, 'error', 'error');
            this._evaluarcontrolcap_SER108()
          } else {
            if (this.textos.ctrlcont_SER108 == 9999) {
              this._evaluardetalle_SER108()
            } else {
              const res = this.SER108.CONTRATOS.find(e => e.CUENTA == this.textos.ctrlcont_SER108)
              if (res == undefined) {
                CON851('01', '01', null, 'error', 'error');
                this._evaluarcontrolcap_SER108()
              } else {
                this.SER108.ESTADOCNCAP = res.ESTADO
                this.SER108.NTCNCAP = res.NIT
                this.SER108.FECHAINICNCAP = res.FECHAINI
                this.SER108.FECHAFINCNCAP = res.FECHAFIN
                if (this.SER108.ESTADOCNCAP == '1') {
                  CON851('13', '13', null, 'error', 'error');
                  return this._evaluarcontrolcap_SER108()
                }
                if ($_USUA_GLOBAL[0].NIT == 800251482) {
                  // PEDIENTE AGREGAR VALIDACIONES 
                  this._evaluardetalle_SER108()
                } else {
                  if ($_USUA_GLOBAL[0].NIT == 900520317) {
                    this._validacionesctrl_SER108()
                  } else {
                    if (this.SER108.NTCNCAP != this.textos.nit_SER108) {
                      if (this.SER108.NTCNCAP == this.SER108.NITTER) {
                        this._validacionesctrl_SER108()
                      } else {
                        CON851('06', '06', null, 'error', 'error');
                        return this._evaluarcontrolcap_SER108()
                      }
                    } else {
                      this._validacionesctrl_SER108()
                    }
                  }
                }
              }
            }
          }
        }
      )
    },
    _validacionesctrl_SER108() {
      if (this.textos.precapit_SER108.trim() == '') {
        if (this.SER108.FECHAINICNCAP > this.SER108.FECHAING || this.SER108.FECHAFINCNCAP < this.SER108.FECHARET) {
          CON851('37', '37', null, 'error', 'error');
          if ($_USUA_GLOBAL[0].NIT == 845000038 || $_USUA_GLOBAL[0].NIT == 830512772
            && (localStorage.Usuario == "ADMI" || localStorage.Usuario == "DAVI" || localStorage.Usuario == "GEBC")) {
            this._evaluardetalle_SER108()
          } else {
            this._evaluarcontrolcap_SER108()
          }
        } else {
          this._evaluardetalle_SER108()
        }
      } else {
        this._evaluardetalle_SER108()
      }
    },
    _evaluardetalle_SER108() {
      _FloatText({ estado: 'off' })
      validarInputs({
        form: "#DETALLE_SER108",
        orden: "1"
      },
        () => { this._evaluarobservacion_SER108() },
        () => {
          this.textos.detalle_SER108 = this.textos.detalle_SER108.toUpperCase()
          this._revisarbloqueos_SER108(this._evaluarbol_SER108, this._evaluardetalle_SER108, params = { CODIGO: 'IS41S' });
        }
      )
    },
    _evaluarbol_SER108() {
      if (this.textos.novedad_SER108.substring(0, 1) == "8") {
        validarInputs({
          form: "#BOL_SER108",
          orden: "1"
        },
          () => { this._evaluardetalle_SER108() },
          () => {
            this.textos.bol_SER108 = this.textos.bol_SER108.padStart(10, '0')
            this._evaluarctlpaci_SER108()
          }
        )
      } else {
        this.textos.bol_SER108 = '0000000000';
        this._evaluarctlpaci_SER108()
      }

    },
    _evaluarctlpaci_SER108() {
      if (this.textos.prefijo_SER108 == 'P' || this.textos.prefijo_SER108 == 'T' || this.textos.prefijo_SER108 == 'O' || this.textos.prefijo_SER108 == 'Q' || this.textos.prefijo_SER108 == 'R' || this.textos.prefijo_SER108 == 'S' || this.textos.prefijo_SER108 == 'U' || this.textos.prefijo_SER108 == 'V' ||
        this.textos.prefijo_SER108 == 'W' || this.textos.prefijo_SER108 == 'X' || this.textos.prefijo_SER108 == 'Y' || this.textos.prefijo_SER108 == 'Z') {
        this.textos.mostrar_SER108 = 'N';
        this._evaluarnivel_SER108()
      } else {
        if (this.textos.mostrar_SER108.trim() == '') {
          this.textos.mostrar_SER108 = 'N';
        }
        validarInputs({
          form: "#COMPROBANTE_SER108",
          orden: "1"
        },
          () => { this._evaluardetalle_SER108() },
          () => {
            this.textos.mostrar_SER108 = this.textos.mostrar_SER108.toUpperCase()
            if (this.textos.mostrar_SER108 == 'N' || this.textos.mostrar_SER108 == 'S') {
              this._evaluarnivel_SER108()
            } else {
              CON851('03', '03', null, 'error', 'error');
              this._evaluarctlpaci_SER108()
            }
          }
        )
      }
    },
    _evaluarnivel_SER108() {
      if (this.textos.nivel_SER108.trim() == '') this.textos.nivel_SER108 = "*"
      validarInputs({
        form: "#NIVEL_SER108",
        orden: "1"
      },
        () => { this._evaluarctlpaci_SER108() },
        () => {
          if (this.textos.nivel_SER108 == "*" || this.textos.nivel_SER108 == "1" || this.textos.nivel_SER108 == "2" || this.textos.nivel_SER108 == "3" || this.textos.nivel_SER108 == "4") {
            this._evaluarcis_SER108()
          }
          else {
            CON851('03', '03', null, 'error', 'error');
            this._evaluarnivel_SER108()
          }
        }
      )
    },
    _evaluarcis_SER108() {
      if (this.SER108.cisMask_SER108.value.trim() == '') this.SER108.cisMask_SER108.typedValue = 'N';
      validarInputs({
        form: "#CIS_SER108",
        orden: "1"
      },
        () => { this._evaluarnivel_SER108() },
        () => {
          this._evaluartipopaci_SER108()
        }
      )
    },
    _evaluartipopaci_SER108() {
      if (this.textos.prefijo_SER108 == 'T' || this.textos.prefijo_SER108 == 'V' || this.textos.prefijo_SER108 == 'W' || this.textos.prefijo_SER108 == 'X' || this.textos.prefijo_SER108 == 'Y' || this.textos.prefijo_SER108 == 'Z') {
        this.textos.tipopaci_SER108 = '* - TODOS'
        this.SER108.mytMask_SER108.typedValue = ''
        this.SER108.C19Mask_SER108.typedValue = ''
        this.SER108.NpbsMask_SER108.typedValue = ''
        this.SER108.CtrlservMask_SER108.typedValue = ''
        this.SER108.MedMask_SER108.typedValue = ''
        this.SER108.CirugMask_SER108.typedValue = ''
        this.SER108.LabMask_SER108.typedValue = ''
        this.SER108.RxMask_SER108.typedValue = ''
        this.SER108.OtroMask_SER108.typedValue = ''
        this.SER108.ConsMask_SER108.typedValue = ''
        this.SER108.PatoMask_SER108.typedValue = ''
        this.SER108.PypMask_SER108.typedValue = ''
        this.SER108.ArtivaMask_SER108.typedValue = ''
        this._evaluarnropol_SER108();
      } else {
        var tipac = [
          { "COD": "*", "DESCRIP": "TODOS" },
          { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
          { "COD": "S", "DESCRIP": "SUBSIDIADO" },
          { "COD": "V", "DESCRIP": "VINCULADO" },
          { "COD": "P", "DESCRIP": "PARTICULAR" },
          { "COD": "O", "DESCRIP": "OTRO TIPO" },
          { "COD": "D", "DESCRIP": "DESP.CONT" },
          { "COD": "E", "DESCRIP": "DESP. SUBS" },
          { "COD": "F", "DESCRIP": "DESP. VINC" }
        ]
        POPUP(
          {
            array: tipac,
            titulo: "TIPO PACIENTE",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.textos.tipopaci_SER108.substring(0, 1),
            callback_f: () => {
              this._evaluarcis_SER108();
            },
          },
          tipac => {
            this.textos.tipopaci_SER108 = tipac.COD + " - " + tipac.DESCRIP;
            this._evaluarctlmyt_SER108()
          },
        );
      }
    },
    _evaluarctlmyt_SER108() {
      if (this.textos.tipopaci_SER108 == 'S') {
        if (this.SER108.mytMask_SER108.value.trim() == '') this.SER108.mytMask_SER108.typedValue = 'N'
        validarInputs({
          form: "#MYT_SER108",
          orden: "1",
        },
          () => { setTimeout(this._evaluartipopaci_SER108, 300) },
          () => {
            this._evaluarcovid19_SER108()
          }
        )
      } else {
        this.SER108.mytMask_SER108.typedValue = 'N'
        this._evaluarcovid19_SER108()
      }
    },
    _evaluarcovid19_SER108() {
      if (this.SER108.C19Mask_SER108.value.trim() == '') this.SER108.C19Mask_SER108.typedValue = 'N'
      validarInputs({
        form: "#C19_SER108",
        orden: "1",
      },
        () => { setTimeout(this._evaluartipopaci_SER108, 300) },
        () => {
          this._evaluarnopbs_SER108()
        }
      )
    },
    _evaluarnopbs_SER108() {
      if (this.SER108.NpbsMask_SER108.value.trim() == '') this.SER108.NpbsMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#PBS_SER108",
        orden: "1",
      },
        () => { this._evaluarcovid19_SER108() },
        () => {
          this._evaluarcontrolxserv_SER108()
        }
      )
    },
    _evaluarcontrolxserv_SER108() {
      if (this.SER108.CtrlservMask_SER108.value.trim() == '') this.SER108.CtrlservMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#CTRLXSERV_SER108",
        orden: "1",
      },
        () => { this._evaluarnopbs_SER108() },
        () => {
          if (this.SER108.CtrlservMask_SER108.value == 'N') {
            // MedMask_SER108.typedValue = ' '
            // this.SER108.CirugMask_SER108 = ' '
            // this.SER108.LabMask_SER108 = ' '
            // this.SER108.RxMask_SER108 = ' '
            // this.SER108.OtroMask_SER108 = ' '
            // this.SER108.ConsMask_SER108 = ' '
            // this.SER108.PatoMask_SER108 = ' '
            // this.SER108.PypMask_SER108 = ' '
            // this.SER108.ArtivaMask_SER108 = ' '
            this._evaluariva_SER108()
          } else {
            this._evaluarcontrol0_SER108()
          }
        }
      )
    },
    _evaluarcontrol0_SER108() {
      if (this.SER108.MedMask_SER108.value.trim() == '') this.SER108.MedMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#MED_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrolxserv_SER108() },
        () => {
          this._evaluarcontrol1_SER108()
        }
      )
    },
    _evaluarcontrol1_SER108() {
      if (this.SER108.CirugMask_SER108.value.trim() == '') this.SER108.CirugMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#CIRUG_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol0_SER108() },
        () => {
          this._evaluarcontrol2_SER108()
        }
      )
    },
    _evaluarcontrol2_SER108() {
      if (this.SER108.LabMask_SER108.value.trim() == '') this.SER108.LabMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#LAB_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol1_SER108() },
        () => {
          this._evaluarcontrol3_SER108()
        }
      )
    },
    _evaluarcontrol3_SER108() {
      if (this.SER108.RxMask_SER108.value.trim() == '') this.SER108.RxMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#RX_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol2_SER108() },
        () => {
          this._evaluarcontrol4_SER108()
        }
      )
    },
    _evaluarcontrol4_SER108() {
      if (this.SER108.OtroMask_SER108.value.trim() == '') this.SER108.OtroMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#OTRO_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol3_SER108() },
        () => {
          this._evaluarcontrol5_SER108()
        }
      )
    },
    _evaluarcontrol5_SER108() {
      if (this.SER108.ConsMask_SER108.value.trim() == '') this.SER108.ConsMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#CONS_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol4_SER108() },
        () => {
          this._evaluarcontrol6_SER108()
        }
      )
    },
    _evaluarcontrol6_SER108() {
      if (this.SER108.PatoMask_SER108.value.trim() == '') this.SER108.PatoMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#PATO_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol5_SER108() },
        () => {
          this._evaluarcontrol7_SER108()
        }
      )
    },
    _evaluarcontrol7_SER108() {
      if (this.SER108.PypMask_SER108.value.trim() == '') this.SER108.PypMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#PYP_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol6_SER108() },
        () => {
          this._evaluariva_SER108()
        }
      )
    },
    _evaluariva_SER108() {
      if (this.SER108.ArtivaMask_SER108.value.trim() == '') this.SER108.ArtivaMask_SER108.typedValue = 'N'
      validarInputs({
        form: "#ARTCONIVA_SER108",
        orden: "1",
      },
        () => { this._evaluarcontrol6_SER108() },
        () => {
          this._evaluarnropol_SER108()
        }
      )
    },
    _evaluarnropol_SER108() {
      validarInputs({
        form: "#NROPOL_SER108",
        orden: "1"
      },
        () => { this._evaluarcontrolxserv_SER108() },
        () => {
          if (this.textos.nropol_SER108.trim() == '' && this.textos.prefijo_SER108 == 'T') {
            if (this.textos.novedad_SER108.substring(0, 1) == '7') {
              CON851('02', '02', null, 'error', 'error');
              return this._evaluarnropol_SER108()
            } else {
              postData({ datosh: `${datosEnvio()}2||${this.textos.prefijo_SER108}|${this.textos.factura_SER108}|` },
                get_url("APP/SALUD/SER108V2.DLL"))
                .then(data => {
                  this.textos.nropol_SER108 = data
                  this._evaluarzona_SER108()
                })
                .catch(err => {
                  console.error(err);
                  this._evaluarnropol_SER108()
                });
            }
          } else {
            this._evaluarzona_SER108()
          }
        }
      )
    },
    _evaluarzona_SER108() {
      if ($_USUA_GLOBAL[0].NIT == 844001287 && this.SER108.ACTTER == 31 && this.textos.anoing_SER108 > 2011) {
        this.SER108.RUTA = [];
        let URL = get_url("APP/" + "CONTAB/CON810" + ".DLL");
        postData({
          datosh: datosEnvio() + localStorage['Usuario'] + "|"
        }, URL)
          .then((data) => {
            loader("hide");
            this.SER108.RUTA = data.ZONAS;
            this.SER108.FILTROZONAS = this.SER108.RUTA.filter(zona => (zona.TIPO == "2"))
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
              _ventanaDatos({
                titulo: "VENTANA DE ZONAS",
                columnas: ["ZONA", "NOMBRE"],
                data: this.SER108.FILTROZONAS,
                callback_esc: function () {
                  $(".rutas_SER108").focus();
                },
                callback: function (data) {
                  this.textos.ruta_SER108 = data.ZONA;
                  setTimeout(this._evaluardiasest_SER108, 300);
                }
              });
            }
          })
          .catch((error) => {
            console.log(error)
            this._evaluarnropol_SER108()
          });
      } else {
        this.textos.ruta_SER108 = ''
        this._evaluardiasest_SER108()
      }
    },
    _evaluardiasest_SER108() {
      validarInputs({
        form: "#DIASEST_SER108",
        orden: "1",
      },
        () => { this._evaluarnropol_SER108() },
        () => {
          if ($_USUA_GLOBAL[0].NIT == 800037021 || $_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993
            || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900870633) {
            this.textos.clasificacion_SER108 = "3 - NO APLICA"
            this._evaluarremitido_SER108()
          } else {
            this._evaluarclasificacion_SER108()
          }
        }
      )
    },
    _evaluarclasificacion_SER108() {
      if (this.textos.clasificacion_SER108.trim() == '') this.textos.clasificacion_SER108 = "3 - NO APLICA"
      if ($_USUA_GLOBAL[0].PUC == 3 || $_USUA_GLOBAL[0].PUC == 4 || $_USUA_GLOBAL[0].PUC == 6) {
        obtenerDatosCompletos({ nombreFd: 'CLASIF' }, (data) => {
          var clasificacion = data.CLASIF
          POPUP(
            {
              array: clasificacion,
              titulo: "CLASIFICACION",
              indices: [
                {
                  id: "COD",
                  label: "DESCRIP",
                },
              ],
              seleccion: this.textos.clasificacion_SER108.substring(0, 1),
              callback_f: () => {
                this._evaluardiasest_SER108()
              },
            },
            clasificacion => {
              this.textos.clasificacion_SER108 = clasificacion.COD + " - " + clasificacion.DESCRIP;
              this._evaluarremitido_SER108()
            },
          );
        })
      } else {
        this.textos.clasificacion_SER108 = "3 - NO APLICA"
        this._evaluarremitido_SER108()
      }
    },
    _evaluarremitido_SER108() {
      if (this.textos.remitido_SER108.trim() == '') this.textos.remitido_SER108 = 'N'
      validarInputs({
        form: "#REMITE_SER108",
        orden: "1",
      },
        () => { this._evaluardiasest_SER108() },
        () => {
          if (this.textos.remitido_SER108 == 'S' || this.textos.remitido_SER108 == 'N') {
            this.textos.remitido_SER108 == 'S'
              ? this._evaluarorigenremit_SER108()
              : this.textos.origen_SER108 = '', this._evaluarevento_SER108()
          } else {
            CON851('03', '03', null, 'error', 'error');
            this._evaluarremitido_SER108()
          }
        }
      )
    },
    _evaluarorigenremit_SER108() {
      validarInputs({
        form: "#ORIGEN_SER108",
        orden: "1",
      },
        () => { this._evaluarremitido_SER108() },
        () => {
          if (this.textos.origen_SER108.trim() == '') {
            CON851('03', '03', null, 'error', 'error');
            this._evaluarorigenremit_SER108()
          } else {
            const res = this.SER108.IPS.find(e => e.COD == this.textos.origen_SER108)
            if (res == undefined) {
              CON851('01', '01', null, 'error', 'error');
              this._evaluarorigenremit_SER108()
            } else {
              this.textos.origend_SER108 = res.DESCRIP
              this._evaluarevento_SER108()
            }
          }
        }
      )
    },
    _evaluarevento_SER108() {
      if (this.textos.novedad_SER108.substring(0, 1) == '7' && this.textos.prefijo_SER108 != "T") {
        this.textos.tipoevento_SER108 = '00 - NO APLICA';
        this._evaluarciudad_SER108()
      } else {
        if (this.textos.novedad_SER108.substring(0, 1) == '7' && this.textos.prefijo_SER108 == "T") {
          this.textos.tipoevento_SER108 = '01'
        }
        obtenerDatosCompletos({ nombreFd: 'EVENTO' }, (data) => {
          var evento = data.EVENTO;
          POPUP(
            {
              array: evento,
              titulo: "TIPO EVENTO",
              indices: [
                {
                  id: "COD",
                  label: "DESCRIP",
                },
              ],
              seleccion: this.textos.tipoevento_SER108.substring(0, 2),
              callback_f: () => {
                this._evaluarremitido_SER108()
              },
              teclaAlterna: true
            },
            evento => {
              this.textos.tipoevento_SER108 = evento.COD + " - " + evento.DESCRIP;
              if ((this.textos.prefijo_SER108 == "T" || this.textos.prefijo_SER108 == "V" || this.textos.prefijo_SER108 == "W" || this.textos.prefijo_SER108 == "X" || this.textos.prefijo_SER108 == "Y" || this.textos.prefijo_SER108 == "Z") && (this.textos.tipoevento_SER108 == '00')) {
                CON851('02', '02', null, 'error', 'error');
                this._evaluarevento_SER108()
              } else {
                this._evaluarciudad_SER108()
              }
            },
          );
        })
      }
    },
    _evaluarciudad_SER108() {
      if (this.textos.ciudad_SER108.trim() == '') this.textos.ciudad_SER108 = $_USUA_GLOBAL[0].COD_CIUD
      validarInputs({
        form: "#CIUDAD_SER108",
        orden: "1",
      },
        () => { this._evaluarremitido_SER108() },
        () => {
          const res = this.SER108.CIUDAD.find(e => e.COD == this.textos.ciudad_SER108)
          if (res == undefined) {
            CON851('01', '01', null, 'error', 'error');
            this._evaluarciudad_SER108()
          } else {
            this.textos.ciudadd_SER108 = res.NOMBRE
            this._evaluarfuncautoriza_SER108()
          }
        }
      )
    },
    _evaluarfuncautoriza_SER108() {
      validarInputs({
        form: "#FUNCAUTO_SER108",
        orden: "1",
      },
        () => { this._evaluarciudad_SER108() },
        () => {
          this.textos.funauto_SER108 = this.textos.funauto_SER108.padStart(10, '0')
          if (this.textos.funauto_SER108 == 0) {
            this.textos.funautod_SER108 = ''
            this._evaluarnroautorizacion_SER108()
          } else {
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.textos.funauto_SER108 + "|",
            }, URL)
              .then(data => {
                this.SER108.TERCEROS = data.TERCER[0];
                this.textos.funautod_SER108 = this.SER108.TERCEROS.DESCRIP_TER
                this._evaluarnroautorizacion_SER108()
              }).catch(error => {
                this._evaluarfuncautoriza_SER108()
              });
          }
        }
      )
    },
    _evaluarnroautorizacion_SER108() {
      if (this.textos.prefijo_SER108 == "T" || this.textos.prefijo_SER108 == "V" || this.textos.prefijo_SER108 == "W" || this.textos.prefijo_SER108 == "X" || this.textos.prefijo_SER108 == "Y" || this.textos.prefijo_SER108 == "Z") {
        this._evaluarobservapert_SER108()
      } else {
        validarInputs({
          form: "#NROAUTO_SER108",
          orden: "1",
        },
          () => {
            if (this.SER108.OPCIONACTIVA == '097415') {
              this._evaluarnroautorizacion_SER108()
            } else {
              this._evaluarfuncautoriza_SER108()
            }
          },
          () => {
            // this.textos.nroauto_SER108 = this.textos.nroauto_SER108.padStart(15, ' ')
            if ($_USUA_GLOBAL[0].NIT == 800037021 && (this.textos.prefijo_SER108 == "P" || this.textos.prefijo_SER108 == "O" || this.textos.prefijo_SER108 == "Q" || this.textos.prefijo_SER108 == "R" || this.textos.prefijo_SER108 == "S" || this.textos.prefijo_SER108 == "U") && this.textos.nroauto_SER108.trim() != '') {
              this.SER108.FECHABUSQ2 = moment().format('YYYYMMDD')
              this.SER108.ANOBUSQ2 = this.SER108.FECHABUSQ2.substring(0, 4)
              this.SER108.MESBUSQ2 = this.SER108.FECHABUSQ2.substring(4, 6)
              this.SER108.DIABUSQ2 = this.SER108.FECHABUSQ2.substring(6, 8)
              if (this.SER108.MESBUSQ2 > 3) {
                this.SER108.MESBUSQ2 = this.SER108.MESBUSQ2 - 3
                this._consultaSER836AU_SER108()
              } else {
                if (this.SER108.MESBUSQ2 = 01) {
                  this._consultaSER836AU_SER108()
                } else {
                  this.SER108.MESBUSQ2 = 12
                  this.SER108.ANOBUSQ2 = this.SER108.ANOBUSQ2 - 1
                  this._consultaSER836AU_SER108()
                }
              }
            } else {
              if (this.textos.nroauto_SER108.trim() == '') {
                this._evaluarobservapert_SER108()
              } else {
                this._evaluarfechaaten_SER108()
              }
            }
          }
        )
      }
    },
    _consultaSER836AU_SER108() {
      if (this.textos.idpaciente_SER108 != '000000000000001') {
        postData({ datosh: datosEnvio() + this.textos.idpaciente_SER108 + '|' + this.SER108.FECHABUSQFINAL + '|' + this.SER108.LLAVEFACT + '|' }, get_url("APP/SALUD/SER836AU.DLL"))
          .then(data => {
            this.SER108.FACTDUPLICADA2 = data.REPETIDO[0]
            this.SER108.FACTP2 = this.SER108.FACTDUPLICADA2.FACTURA
            if (this.SER108.FACTP2.trim() != '') {
              this.textos.factrepetida_SER108 = this.SER108.FACTP2
              CON851('8U', '8U', null, 'error', 'error');
            }
            this._evaluarfechaaten_SER108()
          })
          .catch(err => {
            console.error(err)
            this._evaluarnroautorizacion_SER108()
          });
      } else {
        this._evaluarfechaaten_SER108()
      }

    },
    _evaluarfechaaten_SER108() {
      setTimeout(() => {
        _ventanafechaatenc_SALUD(this._evaluarobservapert_SER108, this._evaluarnroautorizacion_SER108, params = { FECHAINIATEN: this.SER108.FECHAINGAUT, HORAINIATEN: this.SER108.HORAINGAUT, FECHAFINATEN: this.SER108.FECHAFINAUT, HORAFINATEN: this.SER108.HORAFINAUT, FECHAINGNUM: this.SER108.FECHAING, FECHASALNUM: this.SER108.FECHARET }
        )
      }, 300);
    },
    _evaluarobservapert_SER108(data) {
      if (data == undefined) {
        this.SER108.FECHAINGAUT = ''
        this.SER108.HORAINGAUT = ''
        this.SER108.FECHAFINAUT = ''
        this.SER108.HORAFINAUT = ''
      } else {
        this.SER108.FECHAINGAUT = data.FECHAATENINI
        this.SER108.HORAINGAUT = data.HORAATENINI
        this.SER108.FECHAFINAUT = data.FECHAATENFIN
        this.SER108.HORAFINAUT = data.HORAATENFIN
      }
      validarInputs({
        form: "#OBSERAPERTURA_SER108",
        orden: "1",
      },
        () => { this._evaluarfuncautoriza_SER108() },
        () => {
          this.textos.obserapertura_SER108 = this.textos.obserapertura_SER108.toUpperCase()
          if (this.textos.novedad_SER108.substring(0, 1) == '8') {
            if (this.SER108.OPCIONACTIVA == '097415') {
              // CON851P('01', this._evaluarfuncautoriza_SER108, this._grabarcambio_SER108T)
            } else {
              CON851P('01', this._evaluarfuncautoriza_SER108, this._validacionesgrabarcambio_SER108)
            }
          } else {
            CON851P('01', this._evaluarfuncautoriza_SER108, this._grabarregistro_SER108);
          }
        }
      )
    },
    _grabarregistro_SER108() {
      this.textos.creado_SER108 = localStorage.Usuario
      this.textos.creadod_SER108 = moment().format('YYYYMMDD')
      this.textos.modificado_SER108 = '';
      this.textos.modificadod_SER108 = '';
      this.textos.horaing_SER108 = this.textos.horaing_SER108.replace(/:/, '');
      this.textos.horasal_SER108 = this.textos.horasal_SER108.replace(/:/, '');
      let datos_envio = {};
      datos_envio.datosh = `${datosEnvio()}${3}|${this.textos.novedad_SER108.substring(0, 1)}|${this.textos.prefijo_SER108}|${this.textos.factura_SER108}|${this.textos.undservicio_SER108.substring(0, 2)}|${this.textos.nit_SER108}|${this.textos.nitd_SER108}|${this.textos.convenio_SER108}|${this.textos.estado_SER108.substring(0, 1)}|${this.textos.sucur_SER108.substring(0, 2)}|`
      datos_envio.datosh += `${this.textos.retencion_SER108}|${this.textos.bloq_SER108}|${this.textos.pic_SER108}|${this.textos.idpaciente_SER108}|${this.textos.idpaciented_SER108}|${this.textos.tipo_SER108}|${this.textos.habit_SER108}|${this.SER108.PORCENCOPAGOW}|`
      datos_envio.datosh += `${this.SER108.FECHAING}|${this.SER108.FECHARET}|${this.textos.horaing_SER108}|${this.textos.horasal_SER108}|${this.textos.servicio_SER108}|${this.textos.redext_SER108}|${this.textos.contrato_SER108}|${this.textos.division_SER108}|${this.textos.precapit_SER108 + this.textos.capit_SER108}|`
      datos_envio.datosh += `${this.textos.formadepago_SER108.substring(0, 1)}|${this.textos.costos_SER108}|${this.textos.envio_SER108}|${this.textos.ctrlcont_SER108}|${this.textos.observacion_SER108}|${this.textos.tipopaci_SER108.substring(0, 1)}|${this.textos.detalle_SER108}|${this.textos.mostrar_SER108}|${this.SER108.cisMask_SER108.value}|${this.SER108.mytMask_SER108.value}|`
      datos_envio.datosh += `${this.SER108.CtrlservMask_SER108.value}|${this.SER108.MedMask_SER108.value}|${this.SER108.CirugMask_SER108.value}|${this.SER108.LabMask_SER108.value}|${this.SER108.RxMask_SER108.value}|${this.SER108.OtroMask_SER108.value}|${this.SER108.ConsMask_SER108.value}|${this.SER108.PatoMask_SER108.value}|`
      datos_envio.datosh += `${this.SER108.PypMask_SER108.value}|${this.SER108.ArtivaMask_SER108.value}|${this.textos.nropol_SER108}|${this.textos.ruta_SER108}|${this.textos.est_SER108}|${this.textos.clasificacion_SER108.substring(0, 1)}|${this.textos.remitido_SER108}|${this.textos.origen_SER108}|${this.textos.tipoevento_SER108.substring(0, 2)}|${this.textos.ciudad_SER108}|`
      datos_envio.datosh += `${this.textos.funauto_SER108}|${this.textos.nroauto_SER108}|${this.textos.obserapertura_SER108}|${this.textos.creado_SER108}|${this.textos.creadod_SER108}|${this.textos.modificadod_SER108}|${this.textos.modificado_SER108}|${this.textos.bloqueo_SER108}|${this.SER108.FECHAINGAUT}|`
      datos_envio.datosh += `${this.SER108.HORAINGAUT}|${this.SER108.FECHAFINAUT}|${this.SER108.HORAFINAUT}|${this.textos.ctrldi_SER108}|${this.textos.bol_SER108}|${this.textos.nivel_SER108}|${this.SER108.C19Mask_SER108.value}|${this.SER108.NpbsMask_SER108.value}|${this.textos.listorips_SER108}`
      postData(datos_envio
        , get_url("APP/SALUD/SER108V2.DLL"))
        .then((data) => {
          console.log(data);
          this.SER108.ULTCONSECUTIVO = data
          this.BUSCARNUMERO(this._grabarconsecutivo_SER108);
        })
        .catch((error) => {
          console.error(error);
          CON851('', 'Registro no quedo grabado', null, 'error', 'error');
          this._evaluarfuncautoriza_SER108()
        });
    },

    _grabarconsecutivo_SER108() {
      let URL = get_url("APP/CONTAB/CON007X.DLL");
      postData({ datosh: datosEnvio() + this.SER108.SECUNUM + '|' + moment().format('YYMMDD') + '|' + this.SER108.ULTCONSECUTIVO.substring(1, 7) + '|' }, URL)
        .then(data => {
          grabar_auditoria_SALUD(
            {
              'TIPO': 'IS41',
              'NOVED': this.textos.novedad_SER108.substring(0, 1),
              'LLAVE': this.SER108.ULTCONSECUTIVO,
              'ARCH': "NUMERACION     "
            },
            () => {
              loader("hide")
              if ($_USUA_GLOBAL[0].NIT == 844003225) {
                this._grabarfacttriage2_SER108(this._evaluarotrocodigo_SER108);
              } else {
                this._evaluarotrocodigo_SER108();
              }
            }
          )
        })
        .catch(err => {
          console.debug(err);
          CON851('', 'Error al grabar el consecutivo', null, 'error', 'error');
          this._evaluarfuncautoriza_SER108()
        })
    },
    _validacionesgrabarcambio_SER108() {
      if ((this.textos.estado_SER108.substring(0, 1) != this.SER108.FACTURACION.ESTADO_NUM.trim()) && (this.SER108.FACTURACION.ESTADO_NUM.trim() == '1' || this.SER108.FACTURACION.ESTADO_NUM.trim() == '2')) {
        this.SER108.SWESTADO = '1'
      } else {
        if (this.SER108.FACTURACION.ESTADO_NUM.trim() == '0') {
          this.SER108.SWESTADO = '1'
        } else {
          this.SER108.SWESTADO = '0'
        }
      }
      grabar_auditoria_SALUD(
        {
          'TIPO': 'I46',
          'NOVED': this.textos.novedad_SER108.substring(0, 1),
          'LLAVE': this.SER108.LLAVEFACT,
          'ARCH': "NUMERACION     "
        },
        () => {
          loader("hide")
          if ($_USUA_GLOBAL[0].NIT == 844003225) {
            this._grabarfacttriage2_SER108(this._grabarcambio_SER108);
          } else {
            this._grabarcambio_SER108();
          }
        }
      )
    },
    _grabarcambio_SER108() {
      if (this.textos.estado_SER108.substring(0, 1) == '0') {
        this.textos.bloqueo_SER108 = ''
      }
      this.textos.modificado_SER108 = localStorage.Usuario
      this.textos.modificadod_SER108 = moment().format('YYYYMMDD')
      this.textos.horaing_SER108 = this.textos.horaing_SER108.replace(/:/, '');
      this.textos.horasal_SER108 = this.textos.horasal_SER108.replace(/:/, '');
      let datos_envio = {};
      datos_envio.datosh = `${datosEnvio()}${3}|${this.textos.novedad_SER108.substring(0, 1)}|${this.textos.prefijo_SER108}|${this.textos.factura_SER108}|${this.textos.undservicio_SER108.substring(0, 2)}|${this.textos.nit_SER108}|${this.textos.nitd_SER108}|${this.textos.convenio_SER108}|${this.textos.estado_SER108.substring(0, 1)}|${this.textos.sucur_SER108.substring(0, 2)}|`
      datos_envio.datosh += `${this.textos.retencion_SER108}|${this.textos.bloq_SER108}|${this.textos.pic_SER108}|${this.textos.idpaciente_SER108}|${this.textos.idpaciented_SER108}|${this.textos.tipo_SER108}|${this.textos.habit_SER108}|${this.SER108.PORCENCOPAGOW}|`
      datos_envio.datosh += `${this.SER108.FECHAING}|${this.SER108.FECHARET}|${this.textos.horaing_SER108}|${this.textos.horasal_SER108}|${this.textos.servicio_SER108}|${this.textos.redext_SER108}|${this.textos.contrato_SER108}|${this.textos.division_SER108}|${this.textos.precapit_SER108 + this.textos.capit_SER108}|`
      datos_envio.datosh += `${this.textos.formadepago_SER108.substring(0, 1)}|${this.textos.costos_SER108}|${this.textos.envio_SER108}|${this.textos.ctrlcont_SER108}|${this.textos.observacion_SER108}|${this.textos.tipopaci_SER108.substring(0, 1)}|${this.textos.detalle_SER108}|${this.textos.mostrar_SER108}|${this.SER108.cisMask_SER108.value}|${this.SER108.mytMask_SER108.value}|`
      datos_envio.datosh += `${this.SER108.CtrlservMask_SER108.value}|${this.SER108.MedMask_SER108.value}|${this.SER108.CirugMask_SER108.value}|${this.SER108.LabMask_SER108.value}|${this.SER108.RxMask_SER108.value}|${this.SER108.OtroMask_SER108.value}|${this.SER108.ConsMask_SER108.value}|${this.SER108.PatoMask_SER108.value}|`
      datos_envio.datosh += `${this.SER108.PypMask_SER108.value}|${this.SER108.ArtivaMask_SER108.value}|${this.textos.nropol_SER108}|${this.textos.ruta_SER108}|${this.textos.est_SER108}|${this.textos.clasificacion_SER108.substring(0, 1)}|${this.textos.remitido_SER108}|${this.textos.origen_SER108}|${this.textos.tipoevento_SER108.substring(0, 2)}|${this.textos.ciudad_SER108}|`
      datos_envio.datosh += `${this.textos.funauto_SER108}|${this.textos.nroauto_SER108}|${this.textos.obserapertura_SER108}|${this.textos.creado_SER108}|${this.textos.creadod_SER108}|${this.textos.modificadod_SER108}|${this.textos.modificado_SER108}|${this.textos.bloqueo_SER108}|${this.SER108.FECHAINGAUT}|`
      datos_envio.datosh += `${this.SER108.HORAINGAUT}|${this.SER108.FECHAFINAUT}|${this.SER108.HORAFINAUT}|${this.textos.ctrldi_SER108}|${this.textos.bol_SER108}|${this.textos.nivel_SER108}|${this.SER108.C19Mask_SER108.value}|${this.SER108.NpbsMask_SER108.value}|${this.textos.listorips_SER108}`
      postData(datos_envio
        , get_url("APP/SALUD/SER108V2.DLL"))
        .then((data) => {
          this.SER108.ULTCONSECUTIVO = data
          if (this.textos.convenio_SER108 == this.SER108.CONVENIOACTUAL) {
            if (this.textos.nit_SER108 == this.SER108.NITACTUAL) {
              this._movimiento_SAL020E()
            } else {
              CON851P('50', this._movimiento_SAL020E, this._reliquidarcomprob_SER612R)
            }
          } else {
            CON851P('50', this._movimiento_SAL020E, this._reliquidarcomprob_SER612R)
          }
        })
        .catch((error) => {
          console.error(error);
          CON851('', 'Registro no quedo grabado', null, 'error', 'error');
          this._evaluarfuncautoriza_SER108()
        });
    },
    _reliquidarcomprob_SER612R() {
      let URL = get_url("APP/SALUD/SER612R.DLL");
      postData({ datosh: datosEnvio() + this.SER108.LLAVEFACT + '|' + localStorage.Usuario + '|' }, URL)
        .then(data => {
          this.SER108.COMPROBANTE = data['RELIQUIDA'];
          this.SER108.COMPROBANTE.pop()
          $_this = this
          var ventanaDuplicado = bootbox.dialog({
            title: 'RELIQUIDANDO FACT:' + this.SER108.LLAVEFACT,
            message: '<style type="text/css">' + '.modal-footer {' +
              +'padding: 10px;' +
              'text-align: right;' +
              'margin-top:38px;' +
              'border-top: 1px solid #e5e5e5;}' +
              '</style>' +
              '<div class="table-scrollable">' +
              '<table class="table table-striped table-hover">' +
              '<thead><tr>' +
              '<th>Sucursal</th>' +
              '<th>Cl fact</th>' +
              '<th>Nro fact</th>' +
              '<th>Fecha fact</th>' +
              '</tr></thead>' +
              '<tbody id= "COMPROBANTES">' +
              `${$_this.obtenerComprobantes($_this.SER108.COMPROBANTE = data['RELIQUIDA'])}` +
              '</tbody>' +
              '</table>' +
              '</div>'
            ,
            buttons: {
              Aceptar: {
                span: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                  ventanaDuplicado.off('show.bs.modal');
                  setTimeout($_this._movimiento_SAL020E, 300)
                }
              }
            }
          })

        })
        .catch(err => {
          console.log(err);
          CON851('', 'Error en reliquidar comprobantes', null, 'error', 'error');
          this._evaluarfuncautoriza_SER108()
        })
    },
    obtenerComprobantes(arrCompr) {
      let comprobantes = '';
      for (let i = 0; i < arrCompr.length; i++) {
        if (arrCompr[i].SUCURSAL.trim() != '') {
          comprobantes += (`<tr><td >${arrCompr[i].SUCURSAL}</td>` + `<td >${arrCompr[i].CLFACT}</td>` + `<td >${arrCompr[i].NROFACT}</td>` + `<td >${arrCompr[i].FECHAFAT}</td></tr>`);
        }
      }
      return comprobantes;
    },
    _movimiento_SAL020E() {
      if ((this.textos.prefijo_SER108 != 'U' || this.textos.prefijo_SER108 != 'C' || this.textos.prefijo_SER108 != 'V' || this.textos.prefijo_SER108 != 'E' || this.textos.prefijo_SER108 != 'Ñ')
        && (this.SER108.SWESTADO == '1') && (this.SER108.FACTURACION.FECHA_RET.substring(0, 4) > 1999) && (this.textos.cufe_SER108.trim() == '')) {
        let URL = get_url("APP/SALUD/SAL020E.DLL");
        postData({ datosh: datosEnvio() + this.SER108.LLAVEFACT + '|' + localStorage.Usuario + '|' }, URL)
          .then(data => {
            console.debug(data);
          })
          .catch(err => {
            console.debug(err);
          })
      }
      if (this.textos.nit_SER108 != this.SER108.NITANT) {
        let URL = get_url("APP/SALUD/SER168A.DLL");
        postData({ datosh: datosEnvio() + this.SER108.LLAVEFACT + '|' + this.SER108.FACTURACION.NIT_NUM.trim() + '|' + this.SER108.FACTURACION.FECHA_ING + '|' }, URL)
          .then(data => {
            console.debug(data);
          })
          .catch(err => {
            console.debug(err);
          })
      }
      this._evaluarotrocodigo_SER108()
    },

    _evaluarotrocodigo_SER108() {
      if (this.textos.redext_SER108 == 'S' && $_USUA_GLOBAL[0].NIT == 800162035) {
        this.textos.redext_SER108 = 'N'
        console.log('BUSCA EL NUMERO pero debo preguntar')
      }
      if ($_USUA_GLOBAL[0].NIT == 900264583) {
        this._grabarcorresponsalia_SER108()
      } else {
        // NOSE AGREGAN VALIDACIONES DE HISTORIA CLINICA O TRIAGE YA Q NO VA FUNCIONAR COMO SEGUNDA VENTANA
        if(this.paciente.triage){
          postData({ datosh: datosEnvio() + this.paciente.llavetriage + "|" + this.SER108.ULTCONSECUTIVO + '|' }, get_url("APP/SALUD/SER405A.DLL"))
          .then(data => {
              console.log(data)
              CON851P('00', this._terminar_SER108, this._imprimirfactura_SER108)
          })
          .catch(err => {
              console.error(err)
              this._evaluarfuncautoriza_SER108()
          }); 
        }else{
          CON851P('00', this._terminar_SER108, this._imprimirfactura_SER108)
        }        
      }
    },
    _imprimirfactura_SER108() {
      console.log('IMPRIMIR DLL')
      loader("show");
      var $_this = this
      var datos_envio = datosEnvio();
      datos_envio += 4 + '||' + this.SER108.ULTCONSECUTIVO.substring(0, 1) + '|' + this.SER108.ULTCONSECUTIVO.substring(1, 7) + '|'
      let URL = get_url("APP/SALUD/SER108V2.DLL");
      postData({ datosh: datos_envio }, URL)
        .then(function (data) {
          console.log(data, 'FACT')
          // $_this = this
          $_this.SER108.FACTURAS = data.FACTURAS[0];
          console.log($_this.SER108.FACTURAS, 'IMPRESION FACTURA')
          if ($_this.SER108.FACTURAS.ANORET == '0000') {
            $_this.SER108.FACTURAS.MESRET = ' '
            $_this.SER108.FACTURAS.DIARET = ' '
            $_this.SER108.FACTURAS.ANORET = ' '
            $_this.SER108.FECHARETCOMPLETA = $_this.SER108.FACTURAS.MESRET + $_this.SER108.FACTURAS.DIARET + $_this.SER108.FACTURAS.ANORET
          } else {
            $_this.SER108.FECHARETCOMPLETA = $_this.SER108.FACTURAS.MESRET + ' ' + $_this.SER108.FACTURAS.DIARET + '/' + $_this.SER108.FACTURAS.ANORET
          }
          let datosimpresionSER108 = {
            pageSize: "A4",
            pageMargins: [18, 100, 15, 20],
            header: function (currentPage, pageCount, pageSize) {
              return [
                { text: ' ' },

                {
                  image: "logo",
                  fit: [60, 60],
                  absolutePosition: { x: 40, y: 25 },
                },
                { text: ' ' },
                {
                  columns: [
                    { text: 'HOJA DE ADMISION', width: '50%', style: 'titulos1', margin: [120, 0, 0, 0] },
                    { text: 'CUENTA NRO:', width: '16%', style: 'titulos1' },
                    { text: $_this.SER108.FACTURAS.FACTURA, width: '15%', style: 'titulos2' },
                  ],
                },
                { text: ' ' },
                {
                  columns: [
                    { text: $_USUA_GLOBAL[0].NOMBRE, width: '56%', style: 'titulos3', margin: [120, 0, 0, 0] },
                    { text: 'NIT', width: '8%', style: 'titulos3' },
                    { text: $_USUA_GLOBAL[0].NIT, width: '10%', style: 'titulos3' },
                  ],
                },
              ]
            },
            content: [
              { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 550, y2: 3, lineWidth: 1 }] },
              { text: ' ' },
              {
                columns: [
                  { text: 'PACIENTE: ', width: "15%", style: "textheadertitle" },
                  { text: $_this.SER108.FACTURAS.CEDULA.replace(/^0+/, ''), width: "17%", style: "texto" },
                  { text: $_this.SER108.FACTURAS.PACIENTE, width: "50%", style: "titulos3" },
                ],
              },
              { text: ' ' },
              {
                columns: [
                  { text: 'ENTIDAD: ', width: "15%", style: "textheadertitle" },
                  { text: $_this.SER108.FACTURAS.EPS.replace(/^0+/, ''), width: "30%", style: "texto" },
                  { text: $_this.SER108.FACTURAS.NOMBREEPS, width: "50%", style: "texto" },
                ],
              },
              {
                columns: [
                  { text: 'FECHA INGRESO: ', width: "15%", style: "textheadertitle" },
                  { text: $_this.SER108.FACTURAS.MESING + ' ' + $_this.SER108.FACTURAS.DIAING + '/' + $_this.SER108.FACTURAS.ANOING, width: "30%", style: "texto" },
                  { text: 'HABITACION : ', width: "13%", style: "textheadertitle" },
                  { text: $_this.SER108.FACTURAS.HABITACION, width: "15%", style: "texto" },
                ],
              },
              {
                columns: [
                  { text: 'FECHA SALIDA: ', width: "15%", style: "textheadertitle" },
                  { text: $_this.SER108.FECHARETCOMPLETA, width: "30%", style: "texto" },
                ],
              },
              { text: ' ' },
              { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 550, y2: 3, lineWidth: 1 }] },
              { text: ' ' },
              {
                columns: [
                  { text: 'AUTORIZO: ', width: "15%", style: "textheadertitle" },
                  { text: $_this.SER108.FACTURAS.FUNCIONARIO.replace(/^0+/, ''), width: "45%", style: "texto" },
                  { text: '____________________________________________________', width: "50%", style: "texto" },
                ],
              },
              {
                columns: [
                  { text: ' ', width: "60%", style: "textheadertitle" },
                  { text: $_this.SER108.FACTURAS.NOMBREFUNC, width: "50%", style: "texto" },
                ],
              },
              { text: ' ' },
              {
                columns: [
                  { text: 'OBSERVACION: ', width: "15%", style: "textheadertitle" },
                  { text: $_this.SER108.FACTURAS.OBSERVACION, width: "60%", style: "texto" },
                ],
              },
              { text: ' ' },
              { text: ' ' },
              {
                columns: [
                  { text: " ", width: "54%", style: "textheader" },
                  { text: "CREO:", width: "4%", style: "textheader" },
                  { text: $_this.SER108.FACTURAS.OPERCREADO + ' ' + $_this.SER108.FACTURAS.FECHACREADO, width: "10%", style: "textheader" },
                  { text: "MODI:", width: "4%", style: "textheader" },
                  { text: $_this.SER108.FACTURAS.OPERMODIF + ' ' + $_this.SER108.FACTURAS.FECHAMODIF, width: "10%", style: "textheader" },
                  { text: "BLOQ:", width: "4%", style: "textheader" },
                  { text: $_this.SER108.FACTURAS.OPERBLOQ, width: "5%", style: "textheader" },
                  { text: "IMP:", width: "4%", style: "textheader" },
                  { text: localStorage.Usuario, width: "5%", style: "textheader" },
                ]
              },
              { text: ' ' },
              { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 550, y2: 3, lineWidth: 1 }] },
            ],
            styles: {
              titulos1: {
                alignment: 'center',
                fontSize: 15,
              },
              titulos2: {
                alignment: 'center',
                fontSize: 15,
                bold: true,
              },
              titulos3: {
                alignment: 'center',
                fontSize: 11,
                bold: true,
              },
              texto: {
                fontSize: 9,
              },
              textheader: {
                alignment: 'rigth',
                fontSize: 7,
              },
              textheadertitle: {
                alignment: 'rigth',
                fontSize: 9,
                bold: true
              },
            }
          };
          datosimpresionSER108.images = {
            logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png"
          };
          _impresion2({
            tipo: 'pdf',
            content: datosimpresionSER108,
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
          })
            .then(() => {
              loader("hide");
              $_this._terminar_SER108()
            })
            .catch((err) => {
              console.error(err);
              $_this._evaluarfuncautoriza_SER108()
            });
        })
        .catch(err => {
          console.debug(err);
          loader("hide");
          console.log('ERROR')
          this._terminar_SER108()
        })
    },
    _grabarcorresponsalia_SER108() {
      _revisarbloqueos_SER108(() => { CON851P('24', this._saliropcion_SER108, this._ventanaactualizarcorresponsalia) }, this._terminar_SER108, params = { CODIGO: 'IS767C' });
    },
    _ventanaactualizarcorresponsalia() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110CFAC.html', factura: this.SER108.ULTCONSECUTIVO });
      vector = ['on', 'Actualizando corresponsalia de factura...']
      _EventocrearSegventana(vector, this._saliropcion_97411);
    },

    _saliropcion_SER108() {
      loader("hide")
      _inputControl("reset");
      _inputControl("disabled");
      this._terminar_SER108()
    },

    // MOSTRAR TODO PACIENTES////////
    _mostrardatos_SER108() {
      let unidadservicio = this.SER108.UNISERVICIO.filter(x => x.DESCRIP.substring(0, 2) == this.SER108.FACTURACION.UNSERV.trim());
      if (unidadservicio.length > 0) {
        this.textos.undservicio_SER108 = unidadservicio[0].DESCRIP
      } else {
        this.textos.undservicio_SER108 = `${SER108.UNSERV} - NO EXISTE UNIDAD DE SERVICIO`
      }
      let estado = { '0': 'ACTIVO', '1': 'INACTIVO', '2': 'ANULADO', '3': 'BLOQUEO' };
      let tipofact = { '1': 'EVENTO', '2': 'CAPITA"' };
      let pago = { '1': 'ACEPTA COPAGO', '2': 'NO ACEPT COPAGO', '3': 'COPAGO INGRESO', '4': 'COPAGO PGP' };
      let tipopac = { '*': 'TODOS', 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR', 'O': 'OTRO TIPO', 'D': 'DESP.CONT', 'E': 'DESP. SUBS', 'F': 'DESP. VINC' };
      let clafisicacion = { '1': 'POS', '2': 'NO POS', '3': 'NO APLICA' };
      let evento = {
        '00': 'NO APLICA', '01': 'ACCIDENTE DE TRANSI', '02': 'SISMO', '03': 'MAREMOTO', '04': 'ERUPCIONES VOLCANIC', '05': 'DESLIZAMIENTO TIERR', '06': 'INUNDACIONES',
        '07': 'AVALANCHA', '08': 'INCENDIO NATURAL', '09': 'EXPLOSION TERRORIST', '10': 'INCENDIO TERRORISTA', '11': 'COMBATE', '12': 'ATAQUE A MUNICIPIOS', '13': 'MASACRE', '14': 'DESPLAZADOS',
        '15': 'OTRO', '16': 'HURACAN', '18': 'MINA ANTIPERSONAL'
      };
      if (estado[this.SER108.FACTURACION.ESTADO_NUM.trim()] == undefined) {
        this.textos.estado_SER108 = ''
      } else {
        this.textos.estado_SER108 = this.SER108.FACTURACION.ESTADO_NUM.trim() + ' - ' + estado[this.SER108.FACTURACION.ESTADO_NUM.trim()]
      }
      if (tipofact[this.SER108.FACTURACION.TIPOFAC_NUM.trim()] == undefined) {
        this.textos.tipo_SER108 = ''
      } else {
        this.textos.tipo_SER108 = this.SER108.FACTURACION.TIPOFAC_NUM.trim() + ' - ' + tipofact[this.SER108.FACTURACION.TIPOFAC_NUM.trim()]
      }
      if (pago[this.SER108.FACTURACION.FORMACOPAG_NUM.trim()] == undefined) {
        this.textos.formadepago_SER108 = ''
      } else {
        this.textos.formadepago_SER108 = this.SER108.FACTURACION.FORMACOPAG_NUM.trim() + ' - ' + pago[this.SER108.FACTURACION.FORMACOPAG_NUM.trim()]
      }
      if (tipopac[this.SER108.FACTURACION.TIPOPACI_NUM.trim()] == undefined) {
        this.textos.tipopaci_SER108 = ''
      } else {
        this.textos.tipopaci_SER108 = this.SER108.FACTURACION.TIPOPACI_NUM.trim() + ' - ' + tipopac[this.SER108.FACTURACION.TIPOPACI_NUM.trim()]
      }
      if (clafisicacion[this.SER108.FACTURACION.CLASIF_NUM.trim()] == undefined) {
        this.textos.clasificacion_SER108 = ''
      } else {
        this.textos.clasificacion_SER108 = this.SER108.FACTURACION.CLASIF_NUM.trim() + ' - ' + clafisicacion[this.SER108.FACTURACION.CLASIF_NUM.trim()]
      }
      if (evento[this.SER108.FACTURACION.TIPOEVENT_NUM.trim()] == undefined) {
        this.textos.tipoevento_SER108 = ''
      } else {
        this.textos.tipoevento_SER108 = this.SER108.FACTURACION.TIPOEVENT_NUM.trim() + ' - ' + evento[this.SER108.FACTURACION.TIPOEVENT_NUM.trim()]
      }
      this.textos.nit_SER108 = this.SER108.FACTURACION.NIT_NUM.trim()
      this.textos.nitd_SER108 = this.SER108.FACTURACION.DESCRIP_NUM.trim()
      this.textos.convenio_SER108 = this.SER108.FACTURACION.CONVENIO_NUM.trim()
      this.textos.conveniod_SER108 = this.SER108.FACTURACION.DESCRIP_TAR.trim()
      this.textos.sucur_SER108 = this.SER108.FACTURACION.SUCUR_NUM.trim()
      this.textos.descripsucur_SER108 = this.SER108.FACTURACION.DESCRIP_SUC.trim()
      this.textos.retencion_SER108 = this.SER108.FACTURACION.PORCRETENC_NUM.trim()
      this.textos.bloq_SER108 = this.SER108.FACTURACION.OPERBLOQ_NUM.trim()
      this.textos.pic_SER108 = this.SER108.FACTURACION.CTAPIC_NUM.trim()
      this.textos.idpaciente_SER108 = this.SER108.FACTURACION.IDPAC_NUM.trim()
      this.textos.idpaciented_SER108 = this.SER108.FACTURACION.PACIENTE_NUM.trim()
      var edad = calcular_edad(this.SER108.FACTURACION.NAC_PACI.trim());
      this.textos.edad_SER108 = edad.unid_edad + edad.vlr_edad.toString().padStart('0')
      this.SER108.UNIDEDADW = edad.unid_edad;
      this.SER108.VLREDADW = edad.vlr_edad.toString().padStart('0');
      this.textos.habit_SER108 = this.SER108.FACTURACION.HAB_NUM.trim()
      this.SER108.vlrcopagoMask_SER108.typedValue = this.SER108.FACTURACION.PORCENTCOP_NUM.trim()
      this.textos.anoing_SER108 = this.SER108.FACTURACION.FECHA_ING.substring(0, 4)
      this.textos.mesing_SER108 = this.SER108.FACTURACION.FECHA_ING.substring(4, 6)
      this.textos.diaing_SER108 = this.SER108.FACTURACION.FECHA_ING.substring(6, 8)
      this.textos.horaing_SER108 = this.SER108.FACTURACION.HORAING_NUM.substring(0, 2) + ':' + this.SER108.FACTURACION.HORAING_NUM.substring(2, 4)
      this.textos.anosal_SER108 = this.SER108.FACTURACION.FECHA_RET.substring(0, 4)
      this.textos.messal_SER108 = this.SER108.FACTURACION.FECHA_RET.substring(4, 6)
      this.textos.diasal_SER108 = this.SER108.FACTURACION.FECHA_RET.substring(6, 8)
      this.textos.horasal_SER108 = this.SER108.FACTURACION.HORARET_NUM.substring(0, 2) + ':' + this.SER108.FACTURACION.HORARET_NUM.substring(2, 4)
      this.textos.servicio_SER108 = this.SER108.FACTURACION.SERVIC_NUM.trim()
      this.textos.descripservicio_SER108 = this.SER108.FACTURACION.DESCRIP_HOSP.trim()
      this.textos.redext_SER108 = this.SER108.FACTURACION.REDEXTER_NUM.trim()
      this.textos.contrato_SER108 = this.SER108.FACTURACION.CONTRATO_NUM.trim()
      this.textos.division_SER108 = this.SER108.FACTURACION.DIVISION_NUM.trim()
      this.SER108.FACTCAPITA = this.SER108.FACTURACION.FACTCAPIT_NUM
      this.textos.precapit_SER108 = this.SER108.FACTURACION.FACTCAPIT_NUM.substring(0, 1);
      this.textos.capit_SER108 = this.SER108.FACTURACION.FACTCAPIT_NUM.substring(1, 7);
      this.textos.costos_SER108 = this.SER108.FACTURACION.COSTO_NUM.trim()
      this.textos.costosd_SER108 = this.SER108.FACTURACION.DESCRIP_COST.trim()
      this.textos.envio_SER108 = this.SER108.FACTURACION.ENVIO_NUM.trim()
      this.textos.ctrlcont_SER108 = this.SER108.FACTURACION.CONTROLCAP_NUM.trim()
      this.textos.observacion_SER108 = this.SER108.FACTURACION.OBSERV_NUM.trim()
      this.textos.detalle_SER108 = this.SER108.FACTURACION.DETALLE_NUM.trim()
      this.textos.mostrar_SER108 = this.SER108.FACTURACION.CTLNROPACI_NUM.trim()
      this.SER108.cisMask_SER108.typedValue = this.SER108.FACTURACION.CIS_NUM.trim()
      this.SER108.mytMask_SER108.typedValue = this.SER108.FACTURACION.MYT_NUM.trim()
      this.textos.bol_SER108 = this.SER108.FACTURACION.LLAVESALID_NUM.trim()
      this.textos.nivel_SER108 = this.SER108.FACTURACION.NIVELCUPS_NUM.trim()
      this.textos.ctrldi_SER108 = this.SER108.FACTURACION.CTRLXDIAG_NUM.trim()
      this.textos.cufe_SER108 = this.SER108.FACTURACION.CUFEELEC_NUM.trim()
      this.SER108.C19Mask_SER108.typedValue = this.SER108.FACTURACION.CONVID19.trim()
      this.SER108.NpbsMask_SER108.typedValue = this.SER108.FACTURACION.NOPBS.trim()
      this.SER108.CtrlservMask_SER108.typedValue = this.SER108.FACTURACION.CTRLSERV_NUM.trim()
      this.SER108.MedMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCLO_NUM.trim()
      this.SER108.CirugMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCL1_NUM.trim()
      this.SER108.LabMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCL2_NUM.trim()
      this.SER108.RxMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCL3_NUM.trim()
      this.SER108.OtroMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCL4_NUM.trim()
      this.SER108.ConsMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCL5_NUM.trim()
      this.SER108.PatoMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCL6_NUM.trim()
      this.SER108.PypMask_SER108.typedValue = this.SER108.FACTURACION.CTRLCL7_NUM.trim()
      this.SER108.ArtivaMask_SER108.typedValue = this.SER108.FACTURACION.ARTIVA_NUM.trim()
      this.textos.nropol_SER108 = this.SER108.FACTURACION.NROPOL_NUM.trim()
      this.textos.ruta_SER108 = this.SER108.FACTURACION.DIVNUM_NUM.trim()
      this.textos.est_SER108 = this.SER108.FACTURACION.DIASEST_NUM.trim()
      this.textos.remitido_SER108 = this.SER108.FACTURACION.ENTRAREMIT_NUM.trim()
      this.textos.origen_SER108 = this.SER108.FACTURACION.ORIGREMIT_NUM.trim()
      this.textos.origend_SER108 = this.SER108.FACTURACION.NOMBRE_IPS.trim()
      this.textos.ciudad_SER108 = this.SER108.FACTURACION.CIUDAD_NUM.trim()
      this.textos.ciudadd_SER108 = this.SER108.FACTURACION.DESCRIP_CIUD.trim()
      this.textos.funauto_SER108 = this.SER108.FACTURACION.FUNCAUTO_NUM.trim()
      this.textos.funautod_SER108 = this.SER108.FACTURACION.DESCRIP_AUT.trim()
      this.textos.nroauto_SER108 = this.SER108.FACTURACION.NROAUTORI_NUM.trim()
      this.textos.obserapertura_SER108 = this.SER108.FACTURACION.OBSERVCRE_NUM.trim()
      this.textos.creado_SER108 = this.SER108.FACTURACION.OPER_NUM.trim()
      this.textos.creadod_SER108 = this.SER108.FACTURACION.FECHACRE_NUM.trim()
      this.textos.modificado_SER108 = this.SER108.FACTURACION.OPERMOD_NUM.trim()
      this.textos.modificadod_SER108 = this.SER108.FACTURACION.FECHAMOD_NUM.trim()
      this.textos.bloqueo_SER108 = this.SER108.FACTURACION.OPERBLOQ_NUM.trim()
      this.SER108.FECHAING = this.textos.anoing_SER108 + this.textos.mesing_SER108 + this.textos.diaing_SER108
      this.SER108.FECHARET = this.textos.anosal_SER108 + this.textos.messal_SER108 + this.textos.diasal_SER108
      this.SER108.FECHANACPAC = this.SER108.FACTURACION.NAC_PACI.trim()
      this.SER108.TOTALFACT = this.SER108.FACTURACION.SALDO_NETO.trim()
      this.SER108.FECHAINGAUT = this.SER108.FACTURACION.FECHAINGAUT_NUM.trim()
      this.SER108.HORAINGAUT = this.SER108.FACTURACION.HORAAINGAUT_NUM.trim()
      this.SER108.FECHAFINAUT = this.SER108.FACTURACION.FECHARETAUT_NUM.trim()
      this.SER108.HORAFINAUT = this.SER108.FACTURACION.HORARETAUT_NUM.trim()
      this.SER108.NITACTUAL = this.SER108.FACTURACION.NIT_NUM.trim()
      this.SER108.NITANT = this.SER108.FACTURACION.NIT_NUM.trim()
      this.SER108.CONVENIOACTUAL = this.SER108.FACTURACION.CONVENIO_NUM.trim()
      this.SER108.LLAVENUM = this.SER108.FACTURACION.LLAVE_NUM
      this.SER108.FECHARETIROW = this.SER108.FACTURACION.FECHA_RET
      this.SER108.NOMBREIPSANT = this.SER108.FACTURACION.IPSANT_NUM
      this.SER108.VLRIPSANT = this.SER108.FACTURACION.VLRIPSANT_NUM
      this.SER108.VLRCOPIPSANT = this.SER108.FACTURACION.VLRCOPIP_NUM
      this.SER108.ENVIORIPS = this.SER108.FACTURACION.ENVIO_NUM
      this.SER108.ENVIOELECTRONICO = this.SER108.FACTURACION.ELENVIO
      this.SER108.FACTURATRIA = this.SER108.FACTURACION.FACT_TRIA.trim()
      this.textos.listorips_SER108 = this.SER108.FACTURACION.SEGRIPS_NUM

      if (this.SER108.FACTURACION.CUFEELEC_NUM.trim() == '') {
        $('#CUFE_SER108').removeClass('hidden');
      }
      let URL = get_url("APP/CONTAB/CON802_01.DLL");
      postData({
        datosh: `${datosEnvio()}${this.SER108.FACTURACION.NIT_NUM}|`
      }, URL)
        .then(data => {
          this.SER108.TERCEROS = data.TERCER[0];
          this.SER108.CONVENIOTER = this.SER108.TERCEROS.CONVENIO.trim()
          this.SER108.DESCRIPTER2 = this.SER108.TERCEROS.DESCRIP_TER2.trim()
          this.SER108.ZONATER = this.SER108.TERCEROS.ZONA.trim()
          this.SER108.NITTER = this.SER108.TERCEROS.NIT.trim()
          this.SER108.ENTIDADTER = this.SER108.TERCEROS.ENTIDAD.trim()
          this.SER108.ACTTER = this.SER108.TERCEROS.ACT_TER.trim()
          this.SER108.TIPOIDTER = this.SER108.TERCEROS.TIPO_ID.trim()
          this.SER108.REFER1TER = this.SER108.TERCEROS.REFER1.trim()
        }).catch(error => {
          console.error(error)
        });
      if (this.textos.estado_SER108.substring(0, 1) != "0" && this.textos.cufe_SER108.trim() != '') {
        CON851('R9', `Bloqueado por cufe fact electro, en el envio: ${this.SER108.ENVIOELECTRONICO}`, null, 'error', 'error');
        return this._evaluarnumero_SER108()
      }
      if (this.textos.estado_SER108.substring(0, 1) == '1' && this.SER108.FACTURACION.SEGRIPS_NUM.trim() == 'S') {
        CON851('72', `Factura bloqueada por RIPS, en el envio: ${this.SER108.ENVIORIPS}`, null, 'error', 'error');
        if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'LYRC' || localStorage.Usuario == 'MSBR') {
          if (this.SER108.ENVIORIPS.trim() == '' || this.SER108.ENVIORIPS == 0) {
            $('#BLOQUEORIPS').removeClass('hidden');
            return this._evaluarlistarips_SER108();
          } else {
            return this._evaluarconvenio_SER108()
          }
        } else {
          return this._evaluarnumero_SER108()
        }
      }
      if ($_USUA_GLOBAL[0].NIT == 800037021 && localStorage.Usuario == 'JASP' && SER108.FACTURACION.OPER_NUM != localStorage.Usuario) {
        CON851('15', '15', null, 'error', 'error');
        return this._evaluarnumero_SER108()
      }
      if (this.textos.novedad_SER108.substring(0, 1) == '9') {
        return this._evaluarretiroregistro_SER108();
      }
      if (this.SER108.OPCIONACTIVA == '097415') {
        return this._evaluarnroautorizacion();
      } else {
        this._evaluarconvenio_SER108();
      }
    },

    _evaluarlistarips_SER108() {
      validarInputs({
        form: "#BLOQRIPS_SER108",
        orden: "1"
      }, () => { setTimeout(this._evaluardatounidad_SER108(), 300); },
        () => {
          this.textos.listorips_SER108 = this.textos.listorips_SER108.toUpperCase()
          if (this.textos.listorips_SER108 == 'S' || this.textos.listorips_SER108 == 'N') {
            this._evaluarconvenio_SER108()
          } else {
            this._evaluarlistarips_SER108()
          }
        }
      )
    },
    _evaluarretiroregistro_SER108() {
      grabar_auditoria_SALUD(
        {
          'TIPO': 'IS41',
          'NOVED': this.textos.novedad_SER108.substring(0, 1),
          'LLAVE': this.SER108.LLAVEFACT,
          'ARCH': "NUMERACION     "
        },
        () => {
          loader('hide');
          if (this.SER108.TOTALFACT == 0 && this.SER108.FACTURACION.ESTADO_NUM.trim() == '0') {
            CON851P('54', this._evaluarnumero_SER108, this._eliminarregistro_SER108)
          } else {
            if ($_USUA_GLOBAL[0].NIT == 70100111) {
              CON851P('54', this._evaluarnumero_SER108, this._eliminarregistro_SER108)
            } else {
              CON851('52', '52', null, 'error', 'error')
              this._evaluarprefijo_SER108()
            }
          }
        }
      )
    },
    _eliminarregistro_SER108() {
      this.textos.modificado_SER108 = localStorage.Usuario
      this.textos.modificadod_SER108 = moment().format('YYYYMMDD')
      this.textos.horaing_SER108 = this.textos.horaing_SER108.replace(/:/, '');
      this.textos.horasal_SER108 = this.textos.horasal_SER108.replace(/:/, '');
      let datos_envio = {};
      datos_envio.datosh = `${datosEnvio()}${3}|${this.textos.novedad_SER108.substring(0, 1)}|${this.textos.prefijo_SER108}|${this.textos.factura_SER108}|${this.textos.undservicio_SER108.substring(0, 2)}|${this.textos.nit_SER108}|${this.textos.nitd_SER108}|${this.textos.convenio_SER108}|${this.textos.estado_SER108.substring(0, 1)}|${this.textos.sucur_SER108.substring(0, 2)}|`
      datos_envio.datosh += `${this.textos.retencion_SER108}|${this.textos.bloq_SER108}|${this.textos.pic_SER108}|${this.textos.idpaciente_SER108}|${this.textos.idpaciented_SER108}|${this.textos.tipo_SER108}|${this.textos.habit_SER108}|${this.SER108.PORCENCOPAGOW}|`
      datos_envio.datosh += `${this.SER108.FECHAING}|${this.SER108.FECHARET}|${this.textos.horaing_SER108}|${this.textos.horasal_SER108}|${this.textos.servicio_SER108}|${this.textos.redext_SER108}|${this.textos.contrato_SER108}|${this.textos.division_SER108}|${this.textos.precapit_SER108 + this.textos.capit_SER108}|`
      datos_envio.datosh += `${this.textos.formadepago_SER108.substring(0, 1)}|${this.textos.costos_SER108}|${this.textos.envio_SER108}|${this.textos.ctrlcont_SER108}|${this.textos.observacion_SER108}|${this.textos.tipopaci_SER108.substring(0, 1)}|${this.textos.detalle_SER108}|${this.textos.mostrar_SER108}|${this.SER108.cisMask_SER108.value}|${this.SER108.mytMask_SER108.value}|`
      datos_envio.datosh += `${this.SER108.CtrlservMask_SER108.value}|${this.SER108.MedMask_SER108.value}|${this.SER108.CirugMask_SER108.value}|${this.SER108.LabMask_SER108.value}|${this.SER108.RxMask_SER108.value}|${this.SER108.OtroMask_SER108.value}|${this.SER108.ConsMask_SER108.value}|${this.SER108.PatoMask_SER108.value}|`
      datos_envio.datosh += `${this.SER108.PypMask_SER108.value}|${this.SER108.ArtivaMask_SER108.value}|${this.textos.nropol_SER108}|${this.textos.ruta_SER108}|${this.textos.est_SER108}|${this.textos.clasificacion_SER108.substring(0, 1)}|${this.textos.remitido_SER108}|${this.textos.origen_SER108}|${this.textos.tipoevento_SER108.substring(0, 2)}|${this.textos.ciudad_SER108}|`
      datos_envio.datosh += `${this.textos.funauto_SER108}|${this.textos.nroauto_SER108}|${this.textos.obserapertura_SER108}|${this.textos.creado_SER108}|${this.textos.creadod_SER108}|${this.textos.modificadod_SER108}|${this.textos.modificado_SER108}|${this.textos.bloqueo_SER108}|${this.SER108.FECHAINGAUT}|`
      datos_envio.datosh += `${this.SER108.HORAINGAUT}|${this.SER108.FECHAFINAUT}|${this.SER108.HORAFINAUT}|${this.textos.ctrldi_SER108}|${this.textos.bol_SER108}|${this.textos.nivel_SER108}|${this.SER108.C19Mask_SER108.value}|${this.SER108.NpbsMask_SER108.value}|`
      postData(datos_envio
        , get_url("APP/SALUD/SER108V2.DLL"))
        .then((data) => {
          this.SER108.ULTCONSECUTIVO = data
          toastr.success('Se ha retirado', 'APERTURA DE FACTURACION');
          this._revisarbloqueos_SER108(() => { CON851P('24', this._saliropcion_97411, this._ventanaactualizarcorresponsalia) }, this._terminar_SER108, params = { CODIGO: 'IS767C' });
        })
        .catch((error) => {
          console.error(error);
          CON851('', 'Registro no quedo grabado', null, 'error', 'error');
          this._evaluarfuncautoriza_SER108()
        });
    },

    _inicializar_SER108() {
      this.textos.undservicio_SER108 = ""
      this.textos.nit_SER108 = ""
      this.textos.nitd_SER108 = ""
      this.textos.convenio_SER108 = ""
      this.textos.conveniod_SER108 = ""
      this.textos.sucur_SER108 = ""
      this.textos.descripsucur_SER108 = ""
      this.textos.retencion_SER108 = ""
      this.textos.bloq_SER108 = ""
      this.textos.pic_SER108 = ""
      this.textos.idpaciente_SER108 = ""
      this.textos.idpaciented_SER108 = ""
      this.textos.edad_SER108 = ""
      this.textos.tipo_SER108 = ""
      this.textos.habit_SER108 = ""
      this.SER108.vlrcopagoMask_SER108.typedValue = ""
      this.textos.anoing_SER108 = ""
      this.textos.mesing_SER108 = ""
      this.textos.diaing_SER108 = ""
      this.textos.horaing_SER108 = ""
      this.textos.anosal_SER108 = ""
      this.textos.messal_SER108 = ""
      this.textos.diasal_SER108 = ""
      this.textos.horasal_SER108 = ""
      this.textos.servicio_SER108 = ""
      this.textos.descripservicio_SER108 = ""
      this.textos.redext_SER108 = ""
      this.textos.contrato_SER108 = ""
      this.textos.division_SER108 = ""
      this.SER108.FACTCAPITA = ""
      this.textos.precapit_SER108 = ""
      this.textos.capit_SER108 = ""
      this.textos.formadepago_SER108 = ""
      this.textos.costos_SER108 = ""
      this.textos.costosd_SER108 = ""
      this.textos.envio_SER108 = ""
      this.textos.ctrlcont_SER108 = ""
      this.textos.observacion_SER108 = ""
      this.textos.tipopaci_SER108 = ""
      this.textos.detalle_SER108 = ""
      this.textos.mostrar_SER108 = ""
      this.SER108.cisMask_SER108.typedValue = ""
      this.SER108.mytMask_SER108.typedValue = ""
      this.textos.bol_SER108 = ""
      this.textos.nivel_SER108 = ""
      this.textos.ctrldi_SER108 = ""
      this.textos.cufe_SER108 = ""
      this.SER108.C19Mask_SER108.typedValue = ""
      this.SER108.NpbsMask_SER108.typedValue = ""
      this.SER108.CtrlservMask_SER108.typedValue = ""
      this.SER108.MedMask_SER108.typedValue = ""
      this.SER108.CirugMask_SER108.typedValue = ""
      this.SER108.LabMask_SER108.typedValue = ""
      this.SER108.RxMask_SER108.typedValue = ""
      this.SER108.OtroMask_SER108.typedValue = ""
      this.SER108.ConsMask_SER108.typedValue = ""
      this.SER108.PatoMask_SER108.typedValue = ""
      this.SER108.PypMask_SER108.typedValue = ""
      this.SER108.ArtivaMask_SER108.typedValue = ""
      this.textos.nropol_SER108 = ""
      this.textos.ruta_SER108 = ""
      this.textos.est_SER108 = ""
      this.textos.clasificacion_SER108 = ""
      this.textos.remitido_SER108 = ""
      this.textos.origen_SER108 = ""
      this.textos.origend_SER108 = ""
      this.textos.tipoevento_SER108 = ""
      this.textos.ciudad_SER108 = ""
      this.textos.ciudadd_SER108 = ""
      this.textos.funauto_SER108 = ""
      this.textos.funautod_SER108 = ""
      this.textos.nroauto_SER108 = ""
      this.textos.obserapertura_SER108 = ""
      this.textos.creado_SER108 = ""
      this.textos.creadod_SER108 = ""
      this.textos.modificado_SER108 = ""
      this.textos.modificadod_SER108 = ""
      this.textos.bloqueo_SER108 = ""
      this.SER108.FECHAINGAUT = ""
      this.SER108.HORAINGAUT = ""
      this.SER108.FECHAFINAUT = ""
      this.SER108.HORAFINAUT = ""
      this.SER108.NOMBREIPSANT = ""
      this.SER108.VLRIPSANT = ""
      this.SER108.VLRCOPIPSANT = ""
    },

    //////////////////////OTRA FUNCIONES DEL PROGRAMA 
    _grabarfacttriage2_SER108(callback) {
      //////FALTA HACER ESTE FUNCION 
      console.log('grabarfacttriage2')
      // if ($_PREFIJOW = "P" || "T" || "O" || "Q" || "R" || "S" || "U" || "V" || "W" || "X" || "Y" || "Z") {
      //   let URL = get_url("APP/SALUD/108.DLL");
      //   postData({
      //     datosh: datosEnvio() + SER108.LLAVETRIAGEW + '|' + this.SER108.LLAVEFACT + '|'
      //   }, URL)
      //     .then(data => {
      //       callback();
      //     })
      //     .catch(error => {
      //       console.log(error);
      //       callback();
      //     });
      // }
    },

    BUSCARNUMERO(callback) {
      this.SER108.SECU1NUM = "9";
      this.SER108.SECU2NUM = this.textos.prefijo_SER108

      if ($_USUA_GLOBAL[0].NIT == 800162035) {
        switch (this.SER108.SUCOPERW) {
          case "01":
            break;
          case "02":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "03":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "04":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "05":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "06":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "07":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "08":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "09":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "10":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "11":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "12":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "13":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "14":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "15":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "16":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
          case "09":
            switch (this.textos.prefijo_SER108) {
              case "B":
                this.SER108.SECU2NUM = "b";
              case "Q":
                this.SER108.SECU2NUM = "q";
              case "V":
                this.SER108.SECU2NUM = "v";
                break;
            }
            break;
          default:
            break;
        }
      }

      if (this.textos.redext_SER108 == "S" && $_USUA_GLOBAL[0].NIT == 800162035) {
        this.SER108.SECU2NUM = "X";
      }
      this.SER108.SECUNUM = this.SER108.SECU1NUM + this.SER108.SECU2NUM;
      callback();
    },

    _revisarpermisos_SER108(callback, back, params) {
      postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${params.CODIGO}|` },
        get_url("APP/CONTAB/CON904.DLL"))
        .then(data => {
          callback(data);
        })
        .catch(err => {
          console.error(err);
          back();
        });
    },
    _revisarbloqueos_SER108(callback, back, params) {
      postData({
        datosh: `${datosEnvio()}${localStorage.Usuario}|${params.CODIGO}|`
      },
        get_url("APP/CONTAB/CON904S.DLL"))
        .then(data => {
          callback(data);
        })
        .catch(error => {
          console.error(error);
          back();
        });
    },



    /////////////////DIFERENTESCONSULTAS//////////////
    _escape_SER108() {
      this.$emit("callback_esc");
    },
    _terminar_SER108() {
      this.$emit("callback");
    },
    _cambioEvento_SER108(e) {
      _fin_validar_form();
      let funcion = e.srcElement.getAttribute("data-validar");
      this[funcion]();
    },
    _mascarascajas_SER108() {
      this.SER108.vlrcopagoMask_SER108 = new IMask(document.getElementById('porcent_SER108'),
        { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
      );

      this.SER108.cisMask_SER108 = IMask($('#codcis_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.mytMask_SER108 = IMask($('#myt_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.C19Mask_SER108 = IMask($('#covid19_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.NpbsMask_SER108 = IMask($('#npbs_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.CtrlservMask_SER108 = IMask($('#ctrlxserv_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.MedMask_SER108 = IMask($('#controlcl0_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.CirugMask_SER108 = IMask($('#controlcl1_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.LabMask_SER108 = IMask($('#controlcl2_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.RxMask_SER108 = IMask($('#controlcl3_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.OtroMask_SER108 = IMask($('#controlcl4_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.ConsMask_SER108 = IMask($('#controlcl5_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.PatoMask_SER108 = IMask($('#controlcl6_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.PypMask_SER108 = IMask($('#controlcl7_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });

      this.SER108.ArtivaMask_SER108 = IMask($('#artconiva_SER108')[0], {
        mask: 'a',
        definitions: {
          'a': /[SN]/
        },
        prepare: function (str) {
          if (str.trim() == '') {
            return false
          } else {
            return str.toUpperCase()
          }
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase()
        }
      });
    },


    /////////////////VENTANA F8///////////////////////
    _f8factura_SER108() {
      $_this = this
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_this.textos.prefijo_SER108 = data.COD.substring(0, 1)
          $_this.textos.factura_SER108 = data.COD.substring(1, 7)
          _enterInput('.factura_SER10');
        },
        cancel: () => {
          _enterInput('.factura_SER10');
        }
      };
      F8LITE(parametros);
    },
    _f8sucursal_SER108() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE SUCURSALES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $_this.SER108.SUCURSAL,
        callback_esc: function () {
          $(".sucursal_SER108").focus();
        },
        callback: function (data) {
          this.textos.sucur_SER108 = data.CODIGO
          _enterInput('.sucursal_SER108');
        }
      });
    },
    _f8terceros_SER108() {
      $_this = this
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          $_this.textos.nit_SER108 = data.COD.trim();
          _enterInput('.cliente_SER108');
        },
        cancel: () => {
          _enterInput('.cliente_SER108');
        }
      };
      F8LITE(parametros);
    },
    _f8convenio_SER108() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE CONVENIOS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER108.TARIFAS,
        callback_esc: function () {
          $(".convenio_SER108").focus();
        },
        callback: function (data) {
          $_this.textos.convenio_SER108 = data.COD;
          _enterInput('.convenio_SER108');
        }
      });
    },
    _f8paciente_SER108() {
      $_this = this
      parametros = {
        dll: 'PACIENTES',
        valoresselect: ['Nombre del paciente'],
        f8data: 'PACIENTES',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
        callback: (data) => {
          $_this.textos.idpaciente_SER108 = data.COD;
          _enterInput('.paciente_SER108');
        },
        cancel: () => {
          _enterInput('.paciente_SER108');
        }
      };
      F8LITE(parametros);
    },
    _f8serviciohosp_SER108() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
        columnas: ["ID", "DESCRIPCION"],
        data: $_this.SER108.SERVICIO,
        callback_esc: function () {
          $(".servicio_SER108").focus();
        },
        callback: function (data) {
          $_this.textos.servicio_SER108 = data.ID.trim();
          _enterInput('.servicio_SER108');
        }
      });
    },
    _f8costos_SER108() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
        columnas: ["COD", "NOMBRE"],
        data: $_this.SER108.COSTOS,
        callback_esc: function () {
          $(".costo_SER108").focus();
        },
        callback: function (data) {
          $_this.textos.costos_SER108 = data.COD.trim()
          _enterInput('.costo_SER108');
        }
      });
    },
    _f8division_SER108() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE DIVISION",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER108.DIVISION,
        callback_esc: function () {
          $(".division_SER108").focus();
        },
        callback: function (data) {
          $_this.textos.division_SER108 = data.COD.trim();
          _enterInput('.division_SER108')
        }
      });
    },
    _f8control_SER108() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE CONTROL CONTRATOS",
        columnas: ["CUENTA", "NIT", 'DESCRIP', 'ESTADO'],
        data: $_this.SER108.CONTRATOS,
        callback_esc: function () {
          $(".contrato_SER108").focus();
        },
        callback: function (data) {
          $_this.textos.ctrlcont_SER108 = data.CUENTA;
          _enterInput('.contrato_SER108');
        }
      });
    },
    _f8ipsorigen_SER108() {
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE IPS",
        columnas: ["COD", "DESCRIP", "TEL", "FUNCIONARIO", "CODCIUDAD", "CIUDAD"],
        data: $_this.SER108.IPS,
        callback_esc: function () {
          $(".origen_SER108").focus();
        },
        callback: function (data) {
          $_this.textos.origen_SER108 = data.COD.trim();
          _enterInput('.origen_SER108');
        }
      });
    },
    _f8ciudad_SER108() {
      $_this = this
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE CIUDADES",
        columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
        data: $_CIUDAD_108.CIUDAD,
        callback_esc: function () {
          $(".ciudad_SER108").focus();
        },
        callback: function (data) {
          $_this.textos.ciudad_SER108 = data.COD.trim();
          _enterInput('.ciudad_SER108');
        }
      });
    },
    _f8funcionario_SER108() {
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }, { title: 'ENTIDAD' }],
        callback: (data) => {
          $_this.textos.funauto_SER108 = data.COD.trim();
          _enterInput('.funcionario_SER108');
        },
        cancel: () => {
          _enterInput('.funcionario_SER108');
        }
      };
      F8LITE(parametros);
    },
  },

  template: `<div class="col-md-12" style= "overflow-y: scroll; height: 650px" > 
        <form class="form-horizontal">
        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
        <div class="col-md-3 col-sm-2 col-xs-6">
            <div class="inline-inputs">
                <label class="col-md-5 col-sm-8 col-xs-12">Novedad</label>
                <div class="input-group col-md-8 col-sm-4 col-xs-12">
                    <input v-model='textos.novedad_SER108' type="text"
                        class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-6">
            <div class="inline-inputs">
                <label class="col-md-8 col-sm-8 col-xs-12">Prefijo</label>
                <div class="input-group col-md-4 col-sm-4 col-xs-12" id="PREFIJOS_SER108">
                    <input v-model='textos.prefijo_SER108' type="text"
                        class="form-control col-md-12 col-sm-12 col-xs-12" 
                        data-orden="1" maxlength="1" disabled="disabled">
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-2 col-xs-6">
            <div class="inline-inputs">
                <label class="col-md-6 col-sm-8 col-xs-12">N. Factura</label>
                <div class="input-group col-md-6 col-sm-4 col-xs-12" id="FACTURASER_SER108">
                    <input v-model='textos.factura_SER108' type="text" v-on:keyup.119='_f8factura_SER108'
                        class="form-control col-md-12 col-sm-12 col-xs-12 factura_SER108" maxlength="6"
                        data-orden="1" disabled="disabled">
                </div>
                <button type="button" @click='_f8factura_SER108' disabled="disabled"
                    class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                    <i class="icon-magnifier"></i>
                </button>
            </div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
            <div class="inline-inputs">
                <label class="col-md-4 col-sm-8 col-xs-12">Unidad Serv.</label>
                <div class="input-group col-md-8 col-sm-4 col-xs-12" id="UNIDSERV_SER108">
                    <input v-model='textos.undservicio_SER108' type="text"
                        class="form-control col-md-12 col-sm-12 col-xs-12" 
                        maxlength="2" data-orden="1" disabled="disabled">
                </div>
            </div>
        </div>
        <div class="salto-linea"></div>
        <div class="col-md-6 col-sm-2 col-xs-6">
            <div class="inline-inputs">
                <label class="col-md-6 col-sm-8 col-xs-12">Nit cliente</label>
                <div class="input-group col-md-5 col-sm-4 col-xs-12" id="NIT_SER108">
                    <input v-model='textos.nit_SER108' type="text" v-on:keyup.119='_f8terceros_SER108'
                        class="form-control col-md-12 col-sm-12 col-xs-12 cliente_SER108" maxlength="10"
                        data-orden="1" disabled="disabled">
                </div>
                <button type="button" @click='_f8terceros_SER108' disabled="disabled"
                    class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                    <i class="icon-magnifier"></i>
                </button>
                <div class="input-group col-md-12 col-sm-4 col-xs-12" id="DESCRIPNIT_SER108">
                    <input v-model='textos.nitd_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="40" data-orden="1">
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-4 col-xs-12">
            <div class="inline-inputs">
                <label class="col-md-5 col-sm-8 col-xs-12">Convenio</label>
                <div class="input-group col-md-5 col-sm-4 col-xs-12" id="CONVENIO_SER108">
                    <input v-model='textos.convenio_SER108' type="text" v-on:keyup.119='_f8convenio_SER108'
                        class="form-control col-md-12 col-sm-12 col-xs-12 convenio_SER108" maxlength="2"
                        data-orden="1" disabled="disabled">
                </div>
                <button type="button" @click='_f8convenio_SER108' disabled="disabled"
                    class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                    <i class="icon-magnifier"></i>
                </button>
                <div class="input-group col-md-12 col-sm-4 col-xs-12">
                    <input v-model='textos.conveniod_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12">
                </div>
            </div>
        </div>
        <div class="salto-linea"></div>
        <div class="col-md-3 col-sm-4 col-xs-12">
            <div class="inline-inputs">
                <label class="col-md-6 col-sm-8 col-xs-12">Estado</label>
                <div class="input-group col-md-6 col-sm-4 col-xs-12" id="ESTADO_SER108">
                    <input v-model='textos.estado_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1">
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-4 col-xs-12">
            <div class="inline-inputs">
                <label class="col-md-6 col-sm-8 col-xs-12">Sucursal</label>
                <div class="input-group col-md-3 col-sm-4 col-xs-12" id="SUCURSAL_SER108">
                    <input v-model='textos.sucur_SER108' type="text" v-on:keyup.119='_f8sucursal_SER108'
                        class="form-control col-md-12 col-sm-12 col-xs-12 sucursal_SER108" maxlength="2"
                        data-orden="1" disabled="disabled">
                </div>
                <button type="button" @click='_f8sucursal_SER108' disabled="disabled"
                    class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                    <i class="icon-magnifier"></i>
                </button>
                <div class="input-group col-md-9 col-sm-4 col-xs-12">
                    <input v-model='textos.descripsucur_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12">
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
            <div class="inline-inputs">
                <label class="col-md-6 col-sm-8 col-xs-12">% Retenc</label>
                <div class="input-group col-md-6 col-sm-4 col-xs-12" id="RETENCION_SER108">
                    <input v-model='textos.retencion_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1">
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12 hidden" id="BLOQUEOOTRO">
            <div class="inline-inputs">
                <label class="col-md-7 col-sm-8 col-xs-12">Bloq rips? </label>
                <div class="input-group col-md-6 col-sm-4 col-xs-12" id="BLOQ_SER108">
                    <input v-model='textos.bloq_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                        placeholder="S/N">
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12 hidden" id="BLOQUEORIPS">
            <div class="inline-inputs">
                <label class="col-md-7 col-sm-8 col-xs-12">Lista rips? </label>
                <div class="input-group col-md-6 col-sm-4 col-xs-12" id="BLOQRIPS_SER108">
                    <input v-model='textos.listorips_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                        placeholder="S/N">
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
            <div class="inline-inputs">
                <label class="col-md-4 col-sm-8 col-xs-12">Pic</label>
                <div class="input-group col-md-8 col-sm-4 col-xs-12" id="PIC_SER108">
                    <input v-model='textos.pic_SER108' type="text" disabled="disabled"
                        class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1">
                </div>
            </div>
        </div>
    </div>
    <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12 head-box">
                    <label>Datos del Paciente:</label>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-8 col-xs-12">Id</label>
                        <div class="input-group col-md-12 col-sm-4 col-xs-12" id="PACIENTE_SER108">
                            <input v-model='textos.idpaciente_SER108' type="text" v-on:keyup.119='_f8paciente_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 paciente_SER108" maxlength="15"
                                data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8paciente_SER108' disabled="disabled"
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-5 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-8 col-xs-12">Nombre</label>
                        <div class="input-group col-md-12 col-sm-4 col-xs-12" id="DESCRIPPACI_SER108">
                            <input v-model='textos.idpaciented_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="40" data-orden="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-4 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-8 col-xs-12">Edad</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model='textos.edad_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-4 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-8 col-xs-12">Tipo</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model='textos.tipo_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-10 col-sm-8 col-xs-12">Habitación</label>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="HABIT_SER108">
                            <input v-model='textos.habit_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-8 col-xs-12">%Copago</label>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="PORCENTAJE_SER108">
                            <input id='porcent_SER108' type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="5" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-8 col-xs-12">Fecha Ing</label>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="ANOING_SER108">
                            <input v-model='textos.anoing_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" data-orden="1"
                                placeholder="AAAA">
                        </div>
                        <div class="input-group col-md-5 col-sm-4 col-xs-12" id="MESING_SER108">
                            <input v-model='textos.mesing_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1"
                                placeholder="MM">
                        </div>
                        <div class="input-group col-md-5 col-sm-4 col-xs-12" id="DIAING_SER108">
                            <input v-model='textos.diaing_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1"
                                placeholder="DD">
                        </div>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="HORAING_SER108">
                            <input v-model='textos.horaing_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" placeholder="HH:MM">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-8 col-xs-12">Fecha Sal</label>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="ANOSAL_SER108">
                            <input v-model='textos.anosal_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" data-orden="1"
                                placeholder="AAAA">
                        </div>
                        <div class="input-group col-md-5 col-sm-4 col-xs-12" id="MESSAL_SER108">
                            <input v-model='textos.messal_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1"
                                placeholder="MM">
                        </div>
                        <div class="input-group col-md-5 col-sm-4 col-xs-12" id="DIASAL_SER108">
                            <input v-model='textos.diasal_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1"
                                placeholder="MM">
                        </div>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="HORASAL_SER108">
                            <input v-model='textos.horasal_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" placeholder="HH:MM">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Serv. Hospital</label>
                        <div class="input-group col-md-3 col-sm-4 col-xs-12" id="SERVICIO_SER108">
                            <input v-model='textos.servicio_SER108' type="text" v-on:keyup.119='_f8serviciohosp_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 servicio_SER108" maxlength="2"
                                data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8serviciohosp_SER108'
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-9 col-sm-4 col-xs-12">
                            <input v-model='textos.descripservicio_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-8 col-xs-12">Red Externa</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12" id="REDEXT_SER108">
                            <input v-model='textos.redext_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-10 col-sm-8 col-xs-12">Contrato </label>
                        <div class="input-group col-md-10 col-sm-4 col-xs-12" id="CONTRATO_SER108">
                            <input v-model='textos.contrato_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="21" data-orden="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-8 col-xs-12">Fact. Capitación</label>
                        <div class="input-group col-md-3 col-sm-4 col-xs-12" id="PRECAPIT_SER108">
                            <input v-model='textos.precapit_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1">
                        </div>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="CAPIT_SER108">
                            <input v-model='textos.capit_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1">
                        </div>

                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-8 col-xs-12">C. Costos</label>
                        <div class="input-group col-md-3 col-sm-4 col-xs-12" id="COSTOS_SER108">
                            <input v-model='textos.costos_SER108' type="text" v-on:keyup.119='_f8costos_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 costo_SER108" maxlength="4"
                                data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8costos_SER108'
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-9 col-sm-4 col-xs-12">
                            <input v-model='textos.costosd_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">División </label>
                        <div class="input-group col-md-12 col-sm-4 col-xs-12" id="DIVISION_SER108">
                            <input v-model='textos.division_SER108' type="text" v-on:keyup.119='_f8division_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 division_SER108" maxlength="2"
                                data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8division_SER108'
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-12">Forma de pago</label>
                        <div class="input-group col-md-12 col-sm-4 col-xs-12">
                            <input v-model='textos.formadepago_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Envio</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12" id="ENVIO_SER108">
                            <input v-model='textos.envio_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" data-orden="1">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-8 col-xs-12">Ctrl Di</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12 " id="CTRLDIAG_SER108">
                            <input v-model='textos.ctrldi_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N">
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-8 col-xs-12">Observación</label>
                        <div class="input-group col-md-12 col-sm-4 col-xs-12" id="OBSERVACIONES_SER108">
                            <input v-model='textos.observacion_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="240" data-orden="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Ctrl Cont</label>
                        <div class="input-group col-md-6 col-sm-4 col-xs-12" id="CTRLCONT_SER108">
                            <input v-model='textos.ctrlcont_SER108' type="text" v-on:keyup.119='_f8control_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 contrato_SER108" maxlength="4"
                                data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8control_SER108' disabled="disabled"
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-2 col-xs-6 hidden" id='CUFE_SER108'>
                    <div class="inline-inputs">
                        <label class="col-md-2 col-sm-8 col-xs-12">Cufe </label>
                        <div class="input-group col-md-12 col-sm-4 col-xs-12 ">
                            <input v-model='textos.cufe_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="128" data-orden="1">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-12 col-xs-12 head-box"></div>
                <div class="salto-linea"></div>

                <div class="col-md-7 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-6 col-xs-12">Detalle Cartera</label>
                        <div class="input-group col-md-10 col-sm-6 col-xs-12" id="DETALLE_SER108">
                            <input v-model='textos.detalle_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="40" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-6 col-xs-12">Bol</label>
                        <div class="input-group col-md-8 col-sm-6 col-xs-12" id="BOL_SER108">
                            <input v-model='textos.bol_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Tipo de Paci</label>
                        <div class="input-group col-md-6 col-sm-6 col-xs-12" id="TIPODEPACI_SER108">
                            <input v-model='textos.tipopaci_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="8" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-6 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-12 col-sm-6 col-xs-12" id="MOSTRAR_SER108">Mostrar cuantos pacientes
                            van a elaborar comprobante?</label>
                        <div class="input-group col-md-3 col-sm-6 col-xs-12" id='COMPROBANTE_SER108'>
                            <input v-model='textos.mostrar_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-6 col-xs-12">Nivel</label>
                        <div class="input-group col-md-8 col-sm-6 col-xs-12" id="NIVEL_SER108">
                            <input v-model='textos.nivel_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="*,1,2,3,4" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-9 col-sm-6 col-xs-12">Solo cod cis</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="CIS_SER108">
                            <input id='codcis_SER108' class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1"
                                maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-6 col-xs-12">Myt</label>
                        <div class="input-group col-md-8 col-sm-6 col-xs-12" id="MYT_SER108">
                            <input id='myt_SER108' class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1"
                                maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-6 col-xs-12">C19</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="C19_SER108">
                            <input id='covid19_SER108' class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1"
                                maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">N-PBS</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="PBS_SER108">
                            <input id='npbs_SER108' class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1"
                                maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Ctrl X cl serv</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="CTRLXSERV_SER108">
                            <input id='ctrlxserv_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Med</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="MED_SER108">
                            <input id='controlcl0_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Cirg</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="CIRUG_SER108">
                            <input id='controlcl1_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Lab</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="LAB_SER108">
                            <input id='controlcl2_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Rx</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="RX_SER108">
                            <input id='controlcl3_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Otro</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="OTRO_SER108">
                            <input id='controlcl4_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Cons</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="CONS_SER108">
                            <input id='controlcl5_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Pato</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="PATO_SER108">
                            <input id='controlcl6_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-6 col-xs-12">Pyp</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="PYP_SER108">
                            <input id='controlcl7_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-6 col-xs-12">Art con iva</label>
                        <div class="input-group col-md-5 col-sm-6 col-xs-12" id="ARTCONIVA_SER108">
                            <input id='artconiva_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-6 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-6 col-xs-12">Poliza soat</label>
                        <div class="input-group col-md-9 col-sm-6 col-xs-12" id="NROPOL_SER108">
                            <input v-model='textos.nropol_SER108' class="form-control col-md-12 col-sm-12 col-xs-12"
                                data-orden="1" maxlength="30" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-6 col-xs-12">Ruta</label>
                        <div class="input-group col-md-8 col-sm-6 col-xs-12" id="ZONA_SER108">
                            <input v-model='textos.ruta_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 rutas_SER108" data-orden="1"
                                maxlength="3" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-6 col-xs-12">Est</label>
                        <div class="input-group col-md-8 col-sm-6 col-xs-12" id="DIASEST_SER108">
                            <input v-model='textos.est_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="3">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>
                <div class="col-md-3 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-8 col-xs-12">Clasificación</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model='textos.clasificacion_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Entra remitido?</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="REMITE_SER108">
                            <input v-model='textos.remitido_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1"
                                placeholder="S/N">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-8 col-xs-12">Cod. Ips origen</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="ORIGEN_SER108">
                            <input v-model='textos.origen_SER108' type="text" v-on:keyup.119='_f8ipsorigen_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 origen_SER108" data-orden="1"
                                maxlength="20" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8ipsorigen_SER108' disabled="disabled"
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model='textos.origend_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-8 col-xs-12">Tipo de Evento</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12">
                            <input v-model='textos.tipoevento_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-8 col-xs-12">Ciudad</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="CIUDAD_SER108">
                            <input v-model='textos.ciudad_SER108' type="text" v-on:keyup.119='_f8ciudad_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 ciudad_SER108" data-orden="1"
                                maxlength="5" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8ciudad_SER108' disabled="disabled"
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-10 col-sm-4 col-xs-12" id="NOMCIUDAD_SER108">
                            <input v-model='textos.ciudadd_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-8 col-xs-12">Fun. autoriza</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="FUNCAUTO_SER108">
                            <input v-model='textos.funauto_SER108' type="text" v-on:keyup.119='_f8funcionario_SER108'
                                class="form-control col-md-12 col-sm-12 col-xs-12 funcionario_SER108" data-orden="1"
                                maxlength="10" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8funcionario_SER108' disabled="disabled"
                            class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-10 col-sm-4 col-xs-12" id="NOMFUNCAUTO_SER108">
                            <input v-model='textos.funautod_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-8 col-xs-12">Fact abierta</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="FACTURAREP_SER108">
                            <input v-model='textos.factrepetida_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Nro. autorización</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="NROAUTO_SER108">
                            <input v-model='textos.nroauto_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="15">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-8 col-xs-12">Obser. Apertura</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="OBSERAPERTURA_SER108">
                            <input v-model='textos.obserapertura_SER108' type="text" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="30">
                        </div>
                    </div>
                </div>
            </div>
    </form>
    <form class="form-horizontal">
            <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                    <div class="col-md-12 col-sm-4 col-xs-4 hidden" id='DATOSTRIAGE_SER108'>
                        <div class="inline-inputs">
                            <label class="col-md-2 col-sm-8 col-xs-12">Pac triage</label>
                            <div class="input-group col-md-2 col-sm-4 col-xs-12">
                                <input v-model='textos.tipodoctriage_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                            <div class="input-group col-md-5 col-sm-4 col-xs-12">
                                <input v-model='textos.pacientetriage_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                            <div class="input-group col-md-1 col-sm-4 col-xs-12">
                                <input v-model='textos.epstriage_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                            <div class="input-group col-md-4 col-sm-4 col-xs-12">
                                <input v-model='textos.nomepstriage_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                        </div>
                    </div>
                    <div class="salto-linea"></div>
                    <div class="col-md-5 col-sm-4 col-xs-4">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-12">Creado</label>
                            <div class="input-group col-md-4 col-sm-4 col-xs-12">
                                <input v-model='textos.creado_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                            <div class="input-group col-md-5 col-sm-4 col-xs-12">
                                <input v-model='textos.creadod_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 col-sm-4 col-xs-4">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-12">Modificado</label>
                            <div class="input-group col-md-4 col-sm-4 col-xs-12">
                                <input v-model='textos.modificado_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                            <div class="input-group col-md-5 col-sm-5 col-xs-12">
                                <input v-model='textos.modificadod_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-4 col-xs-4">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-12">Bloq</label>
                            <div class="input-group col-md-8 col-sm-4 col-xs-12">
                                <input v-model='textos.bloqueo_SER108' type="text" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <transition v-if="mostrarpacientes">
        <div class="overlay_prosoft">
            <div class="modal_prosoft" style="width: 90%">
                <div class="container_prosoft">
                    <div class="col-md-12 no-padding">
                        <ventanapacientes :data="datos_pacientes" :params="params_pacientes"
                            @callback_esc="validarEsc_pacientes" @callback="validarCallback_pacientes">
                        </ventanapacientes>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    </div> `,
});





































