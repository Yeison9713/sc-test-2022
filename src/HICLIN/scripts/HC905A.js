
// CREACION - SANTIAGO.F - MAYO 7/2021

new Vue({
  el: '#HC905A',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      undServ: '',
      descripUnidServ: '',

      atiende: '',
      descripAtiende: '',

      ano_inicial: '',
      mes_inicial: '',
      dia_inicial: '',

      ano_final: '',
      mes_final: '',
      dia_final: '',

      fechaIni: '',
      fechaFin: '',

      may72Hor: '',
      medicinaGen: '',
    },

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    $this = this;
    loader('show');
    _inputControl('disabled');
    _inputControl('reset');
    nombreOpcion('9-5-A - Informe solicitud especialista');
    this.cargarProfesionales_hc905A();
  },
  methods: {
    validarUnidServ() {
      this.form.undServ == '' ? this.form.undServ = '**' : false;
      validarInputs({
        form: '#unidServ_HC905A'
      }, () => {
        _regresar_menuhis();
      }, () => {
        let unserv = this.form.undServ;

        if (unserv == '02') {
          CON851('03', '03', null, 'error', 'error')
          this.validarUnidServ();
        } else if (unserv == '**') {
          this.form.descripUnidServ = 'TODOS LOS HOSPITALIZ.';
          // continue
          this.validarMedico();
        } else {
          let busq = this._unserv.find(a => a.COD == unserv);
          if (busq != undefined) {
            this.form.descripUnidServ = busq.DESCRIP;
            // continue
            this.validarMedico();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarUnidServ();
          }
        }
      })
    },

    validarMedico() {
      this.form.atiende == '' ? this.form.atiende = $_REG_PROF.IDENTIFICACION : false;
      validarInputs({
        form: '#personalAtiende_HC905A'
      }, () => {
        this.validarUnidServ();
      }, () => {
        let atiende = this.form.atiende;
        if (atiende == '99') {
          this.form.descripAtiende = 'Todos los medicos';
          // continue
          this.validarFechaIni();
        } else {
          let busq = this._profesionales.find(a => a.IDENTIFICACION == atiende);
          if (busq != undefined) {
            this.form.descripAtiende = busq.NOMBRE;
            // continue
            this.validarFechaIni();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarMedico();
          }
        }
      })
    },

    validarFechaIni() {
      var anoIni = parseInt(this.fecha_act.substring(0, 4));
      var mesIni = parseInt(this.fecha_act.substring(4, 6));
      var diaIni = parseInt(this.fecha_act.substring(6, 8));

      if (diaIni > 1) {
        diaIni = diaIni - 1;
      } else {
        if (mesIni == 1) {
          anoIni = anoIni - 1;
          mesIni = 12;
          diaIni = 31;
        } else {
          mesIni = mesIni - 1;
          switch (mesIni) {
            case "1": diaIni = 31; break;
            case "2": diaIni = 28; break;
            case "3": diaIni = 31; break;
            case "4": diaIni = 30; break;
            case "5": diaIni = 31; break;
            case "6": diaIni = 30; break;
            case "7": diaIni = 31; break;
            case "8": diaIni = 31; break;
            case "9": diaIni = 30; break;
            case "10": diaIni = 31; break;
            case "11": diaIni = 30; break;
            case "12": diaIni = 31; break;
          }
        }
      }

      this.form.ano_inicial = anoIni;
      this.form.mes_inicial = mesIni;
      this.form.dia_inicial = diaIni;
      this.validarAnoIni();
    },

    validarAnoIni() {
      validarInputs({
        form: '#anoInicial'
      }, () => {
        this.validarMedico();
      }, () => {
        var ano = parseInt(this.form.ano_inicial);
        if (ano < 1900) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAnoIni();
        } else {
          // continue
          this.validarMesIni();
        }
      })
    },

    validarMesIni() {
      validarInputs({
        form: '#mesInicial'
      }, () => {
        this.validarAnoIni();
      }, () => {
        this.form.mes_inicial = cerosIzq(this.form.mes_inicial, 2);
        var mes = parseInt(this.form.mes_inicial);
        if (mes < 1 || mes > 12) {
          this.validarMesIni();
        } else {
          // continue
          this.validarDiaIni();
        }
      })
    },

    validarDiaIni() {
      validarInputs({
        form: '#diaInicial'
      }, () => {
        this.validarMesIni();
      }, () => {
        this.form.dia_inicial = cerosIzq(this.form.dia_inicial, 2);
        var dia = parseInt(this.form.dia_inicial);
        if (dia < 1 || dia > 31) {
          this.validarDiaIni();
        } else {
          // continue
          this.validarAnoFin();
        }
      })
    },

    validarAnoFin() {
      this.form.ano_final == '' ? this.form.ano_final = this.fecha_act.substring(0, 4) : false;
      validarInputs({
        form: '#anoFinal'
      }, () => {
        this.validarAnoIni();
      }, () => {
        var ano = parseInt(this.form.ano_final);
        if (ano < 1900) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          // continue
          this.validarMesFin();
        }
      })
    },

    validarMesFin() {
      this.form.mes_final == '' ? this.form.mes_final = this.fecha_act.substring(4, 6) : false;
      validarInputs({
        form: '#mesFinal'
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.mes_final = cerosIzq(this.form.mes_final, 2);
        var mes = parseInt(this.form.mes_final);
        if (mes < 1 || mes > 12) {
          this.validarMesFin();
        } else {
          // continue
          this.validarDiaFin();
        }
      })
    },

    validarDiaFin() {
      this.form.dia_final == '' ? this.form.dia_final = this.fecha_act.substring(6, 8) : false;
      validarInputs({
        form: '#diaFinal'
      }, () => {
        this.validarMesFin();
      }, () => {
        this.form.dia_final = cerosIzq(this.form.dia_final, 2);
        var dia = parseInt(this.form.dia_final);
        this.form.fechaIni = parseInt(`${this.form.ano_inicial}${this.form.mes_inicial}${this.form.dia_inicial}`);
        this.form.fechaFin = parseInt(`${this.form.ano_final}${this.form.mes_final}${this.form.dia_final}`);
        if (dia < 1 || dia > 31) {
          this.validarDiaFin();
        } else if (this.form.fechaFin < this.form.fechaIni) {
          CON851('37', '37', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          // continue
          this.validarDatoMaxi();
        }
      })
    },

    validarDatoMaxi() {
      this.form.may72Hor == '' ? this.form.may72Hor = 'N' : false;
      validarInputs({
        form: '#may72Hor_HC905A'
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.may72Hor = this.form.may72Hor.toUpperCase();
        var temp = this.form.may72Hor;
        if (temp == 'S' || temp == 'N') {
          // continue
          this.validarDatoIncluirGeneral();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.validarDatoMaxi();
        }
      })
    },

    validarDatoIncluirGeneral() {
      this.form.medicinaGen == '' ? this.form.medicinaGen = 'N' : false;
      validarInputs({
        form: '#medicinaGen_HC905A'
      }, () => {
        this.validarDatoMaxi();
      }, () => {
        this.form.medicinaGen = this.form.medicinaGen.toUpperCase();
        var temp = this.form.medicinaGen;
        if (temp == 'S' || temp == 'N') {
          // continue
          this._envioImpresion();
        } else {
          CON851('03', '03', null, 'error', 'error')
          this.validarDatoIncluirGeneral();
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          $this.validarDatoIncluirGeneral();
        },
        () => {
          $this.estado_loader = true;
          $this.label_loader = `Procesando: ${moment($this.form.fechaIni.toString()).format("YYYY/MM/DD")} - ${moment($this.form.fechaFin.toString()).format(
            "YYYY/MM/DD"
          )}`;
          $this.progreso = { transferred: 0, speed: 0 };

          var datos_envio = datosEnvio()
            + localStorage.Usuario
            + '|' + $this.form.undServ
            + '|' + $this.form.atiende
            + '|' + $this.form.fechaIni.toString()
            + '|' + $this.form.fechaFin.toString()
            + '|' + $this.form.may72Hor
            + '|' + $this.form.medicinaGen;

          console.log(datos_envio, "datos_envio");

          postData({ datosh: datos_envio }, get_url("app/HICLIN/HC905A.DLL"), {
            onProgress: (progress) => {
              $this.progreso = progress;
            },
          })
            .then((data) => {
              $this.loader = false;
              $this.label_loader = `GENERANDO IMPRESIÓN...`;
              $this.progreso.completado = true;
              $this._montarImpresion_HC905A(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              $this.loader = false;
              $this.estado_loader = false;
              $this.validarDatoIncluirGeneral();
            });
        }
      );
    },

    _montarImpresion_HC905A(data) {
      $this = this;
      data.LISTADO.pop();
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        // data.LISTADO[i]['DESCRIP_J'] = data.LISTADO[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validarDatoIncluirGeneral();
      } else {
        var columnas = [
          {
            title: "Fecha",
            value: "FECHA",
            format: "string",
          },
          {
            title: "Hora",
            value: "HORA",
            format: "string",
          },
          {
            title: "Folio",
            value: "FOLIO",
            filterButton: true
          },
          {
            title: "Tipo identificacion",
            value: "TIPO_ID_PACI",
            format: "string",
          },
          {
            title: "ID paciente",
            value: "ID",
            filterButton: true
          },
          {
            title: "1er apellido",
            value: "1ER_APEL_PACI",
            format: "string",
          },
          {
            title: "2do apellido",
            value: "2DO_APEL_PACI",
            format: "string",
          },
          {
            title: "1er nombre",
            value: "1ER_NOM_PACI",
            format: "string",
          },
          {
            title: "2do nombre",
            value: "2DO_NOM_PACI",
            format: "string",
          },
          {
            title: "Sexo",
            value: "SEXO_PACI",
            format: "string",
          },
          {
            title: "Edad",
            value: "EDAD",
            format: "string",
          },
          {
            title: "Especialidad remite",
            value: "NOMBRE_ESP",
            format: "string",
          },
          {
            title: "Unidad servicio solicit",
            value: "UNID_SERV",
            format: "string",
          },
          {
            title: "Medico solicito",
            value: "DESCRIP_PROF",
            format: "string",
          },
          {
            title: "Fecha aten",
            value: "FECHA_ATEN",
            format: "string",
          },
          {
            title: "Hora aten",
            value: "HORA_ATEM",
            format: "string",
          },
          {
            title: "Unidad serv aten",
            value: "UNID_SERV_ATEN",
            format: "string",
          },
          {
            title: "Medico atendio",
            value: "DESCRIP_PROF_ATEN",
            format: "string",
          },
          {
            title: "Entidad",
            value: "ENTIDAD",
            format: "string",
          },
          {
            title: "Fecha nacim",
            value: "FECHA_PACI",
            format: "string",
          },
          {
            title: "Direccion",
            value: "DIRECC_PACI",
            format: "string",
          },
          {
            title: "Ciudad",
            value: "NOMBRE_CIU",
            format: "string",
          },
          {
            title: "Telefono",
            value: "TELEFONO_PACI",
            format: "string",
          },
          {
            title: "Espera dias",
            value: "DIAS_DIF",
          },
          {
            title: "Espera horas",
            value: "HORAS_DIF",
          },
          {
            title: "Espera minutos",
            value: "MINUTOS_DIF",
          },
          {
            title: "Cod cups",
            value: "COD_FORMU",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE REMISION ESPECIALISTA    NIT: ${nit}`,
          `DESDE: ${this.form.dia_inicial}/${this.form.mes_inicial}/${this.form.ano_inicial}  HASTA: ${this.form.dia_final}/${this.form.mes_final}/${this.form.ano_final}`,
        ]

        _impresion2({
          tipo: 'excel',
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.LISTADO,
          },
          archivo: `${localStorage.Usuario + moment().format(`YYMMDD-HHmmss`)}`
        })
          .then(() => {
            console.log('Proceso terminado')
            _regresar_menuhis();
            this.estado_loader = false;
          })
          .catch(() => {
            this.estado_loader = false;
            console.log('Proceso error')
          })
      }
    },

    _ventanaUnidServ() {
      _ventanaDatos({
        titulo: 'VENTANA UNIDADES DE SERVICIO',
        columnas: ['COD', 'DESCRIP'],
        data: this._unserv,
        callback_esc: () => {
          document.querySelector('.undServ')
        },
        callback: (data) => {
          $this.form.undServ = data.COD;
          setTimeout(() => { _enterInput('.undServ') }, 100);
        }
      })
    },

    _ventanaProfesionales() {
      _ventanaDatos({
        titulo: 'VENTANA PROFESIONALES',
        columnas: ['IDENTIFICACION', 'NOMBRE', 'DESCRIPCION'],
        data: this._profesionales,
        callback_esc: () => {
          document.querySelector('.atiende')
        },
        callback: (data) => {
          $this.form.atiende = data.IDENTIFICACION;
          setTimeout(() => { _enterInput('.atiende') }, 100);
        }
      })
    },

    cargarProfesionales_hc905A() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
          loader('hide')
          this.cargarUnidServ_hc905A();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    cargarUnidServ_hc905A() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unserv = data.UNSERV;
          this._unserv.pop();
          this.validarUnidServ();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _regresar_menuhis();
        });
    },
  },
})