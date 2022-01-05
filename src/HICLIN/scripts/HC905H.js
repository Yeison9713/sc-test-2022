
// CREACION - SANTIAGO.F - MAYO 25/2021

new Vue({
  el: '#HC905H',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      unserv: '',
      descripUnserv: '',

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
    nombreOpcion('9-5-H - Informe Oportunidad M.General');
    this.cargarUnidServ_hc905E();
  },
  methods: {
    validarUnidadServ() {
      this.form.unserv = '01';

      var unserv = this.form.unserv;

      let busq = this._unserv.find(a => a.COD == unserv);
      if (busq != undefined) {
        this.form.descripUnserv = busq.DESCRIP;
        // continue
        this.validarPaciente();
      } else {
        CON851('01', '01', null, 'error', 'error')
        this.validarUnidadServ();
      }
    },

    validarPaciente() {
      if (!this.form.paciente.trim()) this.form.paciente = "99";
      validarInputs(
        {
          form: "#paciente_HC905H",
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          if (this.form.paciente == "99") {
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

      if (diaIni > 1) {
        diaIni = diaIni - 1;
      } else {
        if (mesIni == 1) {
          anoIni = anoIni - 1;
          mesIni = 12;
          diaIni = 31;
        } else {
          mesIni = mesIni - 1
          switch (mesIni) {
            case '1': diaIni = 31;
            case '2': diaIni = 28;
            case '3': diaIni = 31;
            case '4': diaIni = 30;
            case '5': diaIni = 31;
            case '6': diaIni = 30;
            case '7': diaIni = 31;
            case '8': diaIni = 31;
            case '9': diaIni = 30;
            case '10': diaIni = 31;
            case '11': diaIni = 30;
            case '12': diaIni = 31;
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
        this.validarPaciente();
      }, () => {
        var ano = parseInt(this.form.ano_inicial);
        if (ano < 2008) {
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
          $this.validarFechaIni();
        },
        () => {
          $this.estado_loader = true;
          $this.label_loader = `Procesando: ${moment($this.form.fechaIni.toString()).format("YYYY/MM/DD")} - ${moment($this.form.fechaFin.toString()).format(
            "YYYY/MM/DD"
          )}`;
          $this.progreso = { transferred: 0, speed: 0 };

          var datos_envio = datosEnvio()
            + localStorage.Usuario
            + '|' + $this.form.paciente
            + '|' + $this.form.fechaIni.toString()
            + '|' + $this.form.fechaFin.toString()

          console.log(datos_envio, "datos_envio");

          postData({ datosh: datos_envio }, get_url("app/HICLIN/HC905H.DLL"), {
            onProgress: (progress) => {
              $this.progreso = progress;
            },
          })
            .then((data) => {
              $this.loader = false;
              $this.label_loader = `GENERANDO IMPRESIÓN...`;
              $this.progreso.completado = true;
              $this._montarImpresion_HC905H(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              $this.loader = false;
              $this.estado_loader = false;
              $this.validarFechaIni();
            });
        }
      );
    },

    _montarImpresion_HC905H(data) {
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
        this.validarUnidadServ();
      } else {
        var columnas = [
          {
            title: "Folio",
            value: "FOLIO",
            format: "string",
          },
          {
            title: "Fecha atenc",
            value: "FECHA",
            format: "string",
          },
          {
            title: "Hora atenc",
            value: "HORA",
            format: "string",
          },
          {
            title: "Unidad de servicio",
            value: "DESCRIP_UNID_SERV",
            format: "string",
          },
          {
            title: "ID prof atiende",
            value: "MED",
            format: "string",
            filterButton: true
          },
          {
            title: "Descrip profesional",
            value: "DESCRIP_PROF",
            format: "string",
          },
          {
            title: "Tipo id",
            value: "TIPO_ID",
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
            value: "SEXO",
            format: "string",
          },
          {
            title: "Edad",
            value: "EDAD",
            format: "string",
          },
          {
            title: "Estado salida",
            value: "ESTADO_SAL",
            format: "string",
          },
          {
            title: "Fecha evo",
            value: "FECHA_EVO",
            format: "string",
          },
          {
            title: "Hora evo",
            value: "HORA_EVO",
            format: "string",
          },
          {
            title: "ID prof atiende",
            value: "MED_EVO",
            format: "string",
          },
          {
            title: "Descrip prof",
            value: "DESCRIP_PROF_EVO",
            format: "string",
          },
          {
            title: "Estado salida",
            value: "ESTADO_SAL_EVO",
            format: "string",
          },
          {
            title: "Conducta",
            value: "CONDUCTA_EVO",
            format: "string",
          },
          {
            title: "Dias espera",
            value: "DIAS_DIF",
          },
          {
            title: "Horas espera",
            value: "HR_DIF",
          },
          {
            title: "Minutos espera",
            value: "MN_DIF",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE OPORTUNIDAD M.GENERAL     NIT: ${nit}`,
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
            this.estado_loader = false;
            _regresar_menuhis();
          })
          .catch(() => {
            console.log('Proceso error')
            this.estado_loader = false;
          })
      }
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

    cargarUnidServ_hc905E() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unserv = data.UNSERV;
          this._unserv.pop();
          loader('hide')
          this.validarUnidadServ();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _regresar_menuhis();
        });
    },

  },
})