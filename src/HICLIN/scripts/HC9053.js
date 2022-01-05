
// CREACION - SANTIAGO.F - MAYO 4/2021

new Vue({
  el: '#HC9053',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      undServ: '',
      descripUnidServ: '',

      atiende: '',
      descripAtiende: '',

      tipoPersonal: '',

      paciente: '',
      descripPaciente: '',

      ano_inicial: '',
      mes_inicial: '',
      dia_inicial: '',

      ano_final: '',
      mes_final: '',
      dia_final: '',

      fechaIni: '',
      fechaFin: '',

      tipoFormu: '',
      descripTipoFormu: '',
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
    nombreOpcion('9-5-3 - Informe de formulacion');
    this.cargarUnidServ_hc9053();
  },
  methods: {
    validarUnidServ() {
      this.form.undServ == '' ? this.form.undServ = '**' : false;
      validarInputs({
        form: '#unidServ_HC9053'
      }, () => {
        _regresar_menuhis();
      }, () => {
        let unserv = this.form.undServ;
        if (unserv == '**') {
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
        form: '#personalAtiende_HC9053'
      }, () => {
        this.validarUnidServ();
      }, () => {
        let atiende = this.form.atiende;
        if (atiende == '99') {
          this.form.descripAtiende = 'TODOS LOS MEDICOS';
          // continue
          this.validarProfesional();
        } else {
          let busq = this._profesionales.find(a => a.IDENTIFICACION == atiende);
          if (busq != undefined) {
            this.form.descripAtiende = busq.NOMBRE;
            // continue
            this.validarProfesional();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarMedico();
          }
        }
      })
    },

    validarProfesional() {
      if (!this.form.tipoPersonal.trim()) this.form.tipoPersonal = "*";
      validarInputs({
        form: '#tipoPersonal_HC9053'
      }, () => {
        this.validarMedico();
      }, () => {
        let tipoPer = this.form.tipoPersonal;
        let atiende = this.form.atiende;
        if (atiende == '99') {
          this.form.tipoPersonal = '*';
          // continue
          this.validarPaciente();
        } else if (tipoPer == '1' || tipoPer == '2' || tipoPer == '*') {
          // continue
          this.validarPaciente();
        } else {
          this.validarProfesional();
        }
      })
    },

    validarPaciente() {
      if (!this.form.paciente.trim()) this.form.paciente = "*";
      validarInputs(
        {
          form: "#paciente_HC9053",
        },
        () => {
          this.validarProfesional();
        },
        () => {
          if (this.form.paciente == "*") {
            this.form.descripPaciente = "Todos los pacientes";
            // continue
            this.validarFechaIni();
          } else {
            if (this.form.paciente.trim()) {
              postData({ datosh: datosEnvio() + this.form.paciente.padStart(15, "0") }, get_url("APP/SALUD/SER810-1.DLL"))
                .then((data) => {
                  this.form.paciente = data["REG-PACI"][0].COD;
                  this.form.descripPaciente = data["REG-PACI"][0].DESCRIP;
                  // continue
                  this.validarFechaIni();
                })
                .catch((error) => {
                  console.error(error);
                  CON851("", "Error consultando paciente", null, "error", "");
                  this.validarPaciente();
                });
            } else {
              CON851("", "01", null, "error", "");
              this.validarPaciente();
            }
          }
        }
      );
    },

    validarFechaIni() {
      var anoIni = parseInt(this.fecha_act.substring(0, 4));
      var mesIni = parseInt(this.fecha_act.substring(4, 6));
      var diaIni = parseInt(this.fecha_act.substring(6, 8));

      if (mesIni > 1) {
        mesIni = mesIni - 1;
      } else {
        anoIni = anoIni - 1;
        mesIni = 12;
      }
      diaIni = 1;

      this.form.ano_inicial = anoIni;
      this.form.mes_inicial = mesIni;
      this.form.dia_inicial = diaIni;
      this.validarAnoIni();
    },

    validarAnoIni() {
      validarInputs({
        form: '#anoInicial'
      }, () => {
        this.validarPaciente();
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
      this.form.ano_final == '' ? this.form.ano_final = this.form.ano_inicial : false;
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
      this.form.mes_final == '' ? this.form.mes_final = this.form.mes_inicial : false;
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
      this.form.dia_final == '' ? this.form.dia_final = this.form.dia_inicial : false;
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
          this.validarTipoForm();
        }
      })
    },

    validarTipoForm() {
      if (!this.form.tipoFormu.trim()) this.form.tipoFormu = "*";
      validarInputs({
        form: '#tipoFormu_HC9053'
      }, () => {
        this.validarAnoFin();
      }, () => {
        let tipoFor = this.form.tipoFormu;
        switch (tipoFor) {
          case '1':
            this.form.descripTipoFormu = 'DROG.';
            // continue
            this._envioImpresion();
            break;
          case '2':
            this.form.descripTipoFormu = 'LABO.';
            // continue
            this._envioImpresion();
            break;
          case '3':
            this.form.descripTipoFormu = 'IMAG.';
            // continue
            this._envioImpresion();
            break;
          case '4':
            this.form.descripTipoFormu = 'ORDEN';
            // continue
            this._envioImpresion();
            break;
          case '5':
            this.form.descripTipoFormu = 'CONSU';
            // continue
            this._envioImpresion();
            break;
          case '6':
            this.form.descripTipoFormu = 'INCAP';
            // continue
            this._envioImpresion();
            break;
          case '*':
            this.form.descripTipoFormu = 'TODOS';
            // continue
            this._envioImpresion();
            break;
          default:
            this.validarTipoForm();
            break;
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          $this.validarTipoForm();
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
            + '|' + $this.form.tipoPersonal
            + '|' + $this.form.paciente
            + '|' + $this.form.fechaIni.toString()
            + '|' + $this.form.fechaFin.toString()
            + '|' + $this.form.tipoFormu;

          console.log(datos_envio, "datos_envio");

          postData({ datosh: datos_envio }, get_url("app/HICLIN/HC9053.DLL"), {
            onProgress: (progress) => {
              $this.progreso = progress;
            },
          })
            .then((data) => {
              $this.loader = false;
              $this.label_loader = `GENERANDO IMPRESIÓN...`;
              $this.progreso.completado = true;
              $this._montarImpresion_HC9053(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              $this.loader = false;
              $this.estado_loader = false;
              $this.validarTipoForm();
            });
        }
      );
    },

    _montarImpresion_HC9053(data) {
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
        this.validarTipoForm();
      } else {
        var columnas = [
          {
            title: "Docum",
            value: "DOC",
            format: "string",
            filterButton: true
          },
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
            title: "Telefono",
            value: "TELEFONO_PACI",
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
            title: "Diagn",
            value: "DIAGN",
            format: "string",
          },
          {
            title: "Descripcion del diagnostico",
            value: "NOMBRE_ENF",
            format: "string",
          },
          {
            title: "Estado salida",
            value: "EST_SAL",
            format: "string",
          },
          {
            title: "Unidad de servicio",
            value: "DESCRIP_UNID_SERV",
            format: "string",
          },
          {
            title: "Finalidad",
            value: "FINALID",
            format: "string",
          },
          {
            title: "Causa externa",
            value: "CAUSA",
            format: "string",
          },
          {
            title: "Atendio",
            value: "DESCRIP_PROF",
            format: "string",
          },
          {
            title: "EPS",
            value: "NOMBRE_ENT",
            format: "string",
          },
          {
            title: "Entidad",
            value: "ENTIDAD",
            format: "string",
          },
          {
            title: "Formula",
            value: "FORMULA",
            format: "string",
          },
          {
            title: "Tipo",
            value: "TIPO_FORM",
            format: "string",
          },
          {
            title: "Descripcion",
            value: "DESCRIP",
            format: "string",
          },
          {
            title: "Cant",
            value: "CANT",
          },
          {
            title: "Indicacion orden formula",
            value: "INDICA_FORMU",
            format: "string",
          },
          {
            title: "Codigo cups",
            value: "CUP",
            format: "string",
          },
          {
            title: "Nro fact",
            value: "FACT",
            format: "string",
          },
          {
            title: "Prof interpreta",
            value: "MEDICO_INTERP",
            format: "string",
          },
          {
            title: "Fecha de interp",
            value: "FECHA_INTERP",
            format: "string",
          },
          {
            title: "Resultado interp",
            value: "RESULT_INTERP",
            format: "string",
          },
          {
            title: "Direccion",
            value: "DIRECC_PACI",
            format: "string",
          },
          {
            title: "Correo electronico",
            value: "E_MAIL_PACI",
            format: "string",
          },
          {
            title: "Comp facturado",
            value: "LLAVE_FACT",
            format: "string",
          },
          {
            title: "Fecha fact",
            value: "FECHA_COMP",
            format: "string",
          },
          {
            title: "Hora fact",
            value: "HORA_ELAB_FACT",
            format: "string",
          },
          {
            title: "Cta fact",
            value: "FACT2",
            format: "string",
          },
          {
            title: "Cantidad fact",
            value: "CANT_FACT",
            format: "string",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE ATENCION     NIT: ${nit}`,
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

    _ventanaPacientes() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
        cancel: () => {
          document.querySelector(".paciente").focus();
        },
        callback: (data) => {
          console.log(data);
          $this.form.paciente = cerosIzq(data.COD, 15);
          $this.form.descripPaciente = data.NOMBRE;
          _enterInput(".paciente");
        },
      };
      F8LITE(parametros);
    },

    cargarUnidServ_hc9053() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unserv = data.UNSERV;
          this._unserv.pop();
          this.cargarProfesionales_hc9053();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _regresar_menuhis();
        });
    },

    cargarProfesionales_hc9053() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
          loader('hide')
          this.validarUnidServ();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },
  },
})