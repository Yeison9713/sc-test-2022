
// CREACION - SANTIAGO.F - MAYO 7/2021

new Vue({
  el: '#HC9055',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      atiende: '',
      descripAtiende: '',

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
    nombreOpcion('9-5-5 - Registro diario de triage');
    this.cargarProfesionales_hc9053();
  },
  methods: {
    validarMedico() {
      this.form.atiende == '' ? this.form.atiende = '99' : false;
      validarInputs({
        form: '#personalAtiende_HC9055'
      }, () => {
        _regresar_menuhis();
      }, () => {
        let atiende = this.form.atiende;
        if (atiende == '99') {
          this.form.descripAtiende = 'Todos los medicos';
          // continue
          this.validarPaciente();
        } else {
          let busq = this._profesionales.find(a => a.IDENTIFICACION == atiende);
          if (busq != undefined) {
            this.form.descripAtiende = busq.NOMBRE;
            // continue
            this.validarPaciente();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarMedico();
          }
        }
      })
    },

    validarPaciente() {
      if (!this.form.paciente.trim()) this.form.paciente = "99";
      validarInputs(
        {
          form: "#paciente_HC9055",
        },
        () => {
          this.validarMedico();
        },
        () => {
          this.form.paciente = cerosIzq(this.form.paciente, 15);
          if (this.form.paciente == "000000000000099") {
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

      if (this.form.paciente == '000000000000099') {
        anoIni = anoIni - 1;
      }

      if (mesIni == 1) {
        anoIni = anoIni - 1;
        mesIni = 12;
      } else {
        mesIni = mesIni - 1;
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
          this._envioImpresion();
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          $this.validarAnoFin();
        },
        () => {
          $this.estado_loader = true;
          $this.label_loader = `Procesando: ${moment($this.form.fechaIni.toString()).format("YYYY/MM/DD")} - ${moment($this.form.fechaFin.toString()).format(
            "YYYY/MM/DD"
          )}`;
          $this.progreso = { transferred: 0, speed: 0 };

          var datos_envio = datosEnvio()
            + localStorage.Usuario
            + '|' + $this.form.atiende
            + '|' + $this.form.paciente
            + '|' + $this.form.fechaIni.toString()
            + '|' + $this.form.fechaFin.toString()

          console.log(datos_envio, "datos_envio");

          postData({ datosh: datos_envio }, get_url("app/HICLIN/HC9055.DLL"), {
            onProgress: (progress) => {
              $this.progreso = progress;
            },
          })
            .then((data) => {
              $this.loader = false;
              $this.label_loader = `GENERANDO IMPRESIÓN...`;
              $this.progreso.completado = true;
              $this._montarImpresion_HC9055(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              $this.loader = false;
              $this.estado_loader = false;
              $this.validarAnoFin();
            });
        }
      );
    },

    _montarImpresion_HC9055(data) {
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
        this.validarAnoFin();
      } else {
        var columnas = [
          {
            title: "Fecha de atencion",
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
            title: "Prioridad",
            value: "PRIORIDAD",
            format: "string",
          },
          {
            title: "Fecha solicitud",
            value: "FECHA_ING",
            format: "string",
          },
          {
            title: "Hora",
            value: "HORA_ING",
            format: "string",
          },
          {
            title: "Oportunidad",
            value: "OPORT",
          },
          {
            title: "Motivo consulta",
            value: "MOTIVO",
            format: "string",
          },
          {
            title: "Observaciones",
            value: "OBSERV",
            format: "string",
          },
          {
            title: "Entidad",
            value: "ENTIDAD",
            format: "string",
          },
          {
            title: "Regimen",
            value: "REGIMEN",
            format: "string",
          },
          {
            title: "Sucursal triage",
            value: "SUCURSAL",
          },
          {
            title: "Estado",
            value: "ESTADO",
            format: "string",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE TRIAGE     NIT: ${nit}`,
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
            console.log('Proceso error')
            this.estado_loader = false;
          })
      }
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

    cargarProfesionales_hc9053() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
          loader('hide')
          this.validarMedico();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },
  },
})