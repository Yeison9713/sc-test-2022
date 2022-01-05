
// CREACION - SANTIAGO.F - MAYO 7/2021

new Vue({
  el: '#HC9056',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      ano_inicial: '',
      mes_inicial: '',
      dia_inicial: '',

      fechaIni: '',
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
    nombreOpcion('9-5-6 - Informe de egresos de pacientes');
    this.validarFechaIni();
  },
  methods: {
    validarFechaIni() {
      loader('hide')
      var anoIni = parseInt(this.fecha_act.substring(0, 4));
      var mesIni = parseInt(this.fecha_act.substring(4, 6));
      var diaIni = parseInt(this.fecha_act.substring(6, 8));

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
        _regresar_menuhis();
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
          this.form.fechaIni = parseInt(`${this.form.ano_inicial}${this.form.mes_inicial}${this.form.dia_inicial}`);
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
          $this.label_loader = `Procesando: ${moment($this.form.fechaIni.toString()).format("YYYY/MM/DD")}`;
          $this.progreso = { transferred: 0, speed: 0 };

          var datos_envio = datosEnvio()
            + $this.form.fechaIni.toString()

          console.log(datos_envio, "datos_envio");

          postData({ datosh: datos_envio }, get_url("app/HICLIN/HC9056.DLL"), {
            onProgress: (progress) => {
              $this.progreso = progress;
            },
          })
            .then((data) => {
              $this.loader = false;
              $this.label_loader = `GENERANDO IMPRESIÓN...`;
              $this.progreso.completado = true;
              $this._montarImpresion_HC9056(data);
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

    _montarImpresion_HC9056(data) {
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
        this.validarAnoIni();
      } else {
        var columnas = [
          {
            title: "Habitacion",
            value: "HAB",
            format: "string",
          },
          {
            title: "Unidad de servicio",
            value: "UNSERV",
            format: "string",
          },
          {
            title: "Identificacion",
            value: "ID",
            filterButton: true
          },
          {
            title: "Folio",
            value: "FOLIO",
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
            title: "Nombre",
            value: "NOMBRE_PACI",
            format: "string",
          },
          {
            title: "Edad",
            value: "EDAD",
            format: "string",
          },
          {
            title: "Entidad factura",
            value: "DESCRIP_NUM",
            format: "string",
          },
          {
            title: "Fecha apertura",
            value: "FECHA",
            format: "string",
          },
          {
            title: "Fecha ord. sal",
            value: "FECHA_EVO",
            format: "string",
          },
          {
            title: "Hora ord",
            value: "HORA",
            format: "string",
          },
          {
            title: "Estancia",
            value: "ESTANCIA",
            format: "string",
          },
          {
            title: "Hora dev",
            // value: "HORA",
            format: "string",
          },
          {
            title: "Hora entr fact",
            value: "HORA_FACT_ARMA_NUM",
            format: "string",
          },
          {
            title: "Fecha egreso",
            value: "FECHA_EGRES",
            format: "string",
          },
          {
            title: "Hora sal enf",
            // value: "HORA",
            format: "string",
          },
          {
            title: "# Fact",
            value: "FACT",
            format: "string",
          },
          {
            title: "Estado fact",
            value: "ESTADO",
            format: "string",
          },
          {
            title: "Fecha cierre fact",
            value: "FECHA_RET_NUM",
            format: "string",
          },
          {
            title: "Hora cierre",
            value: "HORA_RET_NUM",
            format: "string",
          },
          {
            title: "Hora bol",
            value: "HORA_BOL_NUM",
            format: "string",
          },
          {
            title: "Rbo",
            value: "NRO_ABON_NUM",
            format: "string",
          },
          {
            title: "Fecha rbo",
            value: "FECHA_ABON_NUM",
            format: "string",
          },
          {
            title: "Validacion",
            value: "VALIDA",
            format: "string",
          },
          {
            title: "Tsh",
            // value: "HORA",
            format: "string",
          },
          {
            title: "Diagnostico de muerte",
            // value: "HORA",
            format: "string",
          },
          {
            title: "Fecha de salida",
            // value: "HORA",
            format: "string",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE EGRESO DE PACIENTES     NIT: ${nit}`,
          `DESDE: ${this.form.dia_inicial}/${this.form.mes_inicial}/${this.form.ano_inicial}`,
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
  },
})