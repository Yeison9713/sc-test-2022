
// Registro de consultas CREACION - CARLOS R. - 23-11-2021

new Vue({
  el: '#SER161',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      fechaInicial: '',
      fechaFinal: '',
      ano_ini: '',
      mes_ini: '',
      paciente: '',
    },

    _pacientes: [],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    _inputControl("disabled");
    _inputControl('reset');
    nombreOpcion('9-5-4-2-1-5-5 - Informe de act. x paciente');
    this.llenarDatosFecha();
  },
  methods: {
    llenarDatosFecha() {
      this.form.ano_ini = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mes_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.validarAnoIni();
    },

    validarAnoIni() {
      validarInputs(
        {
          form: '#ano_inicial',
          orden: '1'
        },
        () => {
          _toggleNav();
        },
        () => {
          let año = parseFloat(this.form.ano_ini) || 0;
          if (año < 1990) {
            CON851('03', '03', null, 'error', 'error');
            this.validarAnoIni();
          } else {
            this.validarMesIni();
          }
        }
      );
    },

    validarMesIni() {
      validarInputs(
        {
          form: '#mes_inicial',
          orden: '1'
        },
        () => {
          this.validarAnoIni();
        },
        () => {
          this.form.mes_ini = cerosIzq(this.form.mes_ini, 2);
          let mes = parseInt(this.form.mes_ini);
          this.form.fechaInicial = parseInt(`${this.form.ano_ini}${this.form.mes_ini}`);
          if (mes < 1 || mes > 12) {
            this.validarMesIni();
          } else {
            this.validar_Paciente();
          }
        }
      );
    },

    validar_Paciente() {
      validarInputs(
        {
          form: "#dato_paciente",
          orden: "1"
        }, () => {
          this.validarMesIni();
        },
        () => {
          this.form.paciente = this.form.paciente.padStart(15, '0')
          if (this.form.paciente == 0 || this.form.paciente == '') {
            CON851("01", "01", this.validar_Paciente(), "error", "error");
          } else {
            postData({ datosh: datosEnvio() + this.form.paciente.padStart(15, "0") }, get_url("APP/SALUD/SER810-1.DLL"))
              .then((data) => {
                this.form.paciente = data["REG-PACI"][0].COD;
                this.$refs.descrip_paciente.value = data["REG-PACI"][0].DESCRIP;
                // continue
                this._envioImpresion();
              })
              .catch((error) => {
                console.error(error);
                CON851("", "Error consultando paciente", null, "error", "");
                this.validar_Paciente();
              });
          }
        }
      )
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          this.validar_Paciente();
        },
        () => {
          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.form.fechaInicial.toString()).format("YYYY/MM")}`;
          this.progreso = { transferred: 0, speed: 0 };

          let data = {};

          data["datosh"] = datosEnvio();
          data["admin_w"] = localStorage.Usuario;
          data["fecha_inicial"] = this.form.fechaInicial.toString();
          data["paciente_w"] = this.form.paciente;

          postData(data, get_url("app/SALUD/INV548S.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_INV548S(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validar_Paciente();
            });
        }
      );
    },

    _montarImpresion_INV548S(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MM/DD/YY');

      for (i in data.LISTADO) {
        data.LISTADO[i]['ACTIVIDAD'] = data.LISTADO[i]['ACTIVIDAD'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_Medico();
      } else {
        var columnas = [

          {
            title: "ENTIDAD",
            value: "ENTIDAD",
          },
          {
            title: "IPS",
            value: "IPS",
          },
          {
            title: "PACIENTE",
            value: "PACIENTE",
          },
          {
            title: "ACOMPANANTE",
            value: "ACOMPANANTE",
          },
          {
            title: "DIA",
            value: "DIA",
          },
          {
            title: "ACTIVIDAD",
            value: "ACTIVIDAD",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `RESUMEN DE FACTURACION   NIT: ${nit}`,
          `PERIODO DESDE: ${this.form.ano_ini}/${this.form.mes_ini}`,
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
            _toggleNav();
          })
          .catch(() => {
            this.estado_loader = false;
            console.log('Proceso error')
            _toggleNav();
          })
      }
    },


    //  Ventanas F8

    _ventanaPacientes() {
      _this = this;
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
          _this.form.paciente = cerosIzq(data.COD, 15);
          _this.$refs.descrip_paciente.value = data.NOMBRE;
          _enterInput(".paciente");
        },
      };
      F8LITE(parametros);
    },

    //   _ventanaPacientes() {
    //     parametros = {
    //         dll: 'PACIENTES',
    //         valoresselect: ['Nombre del paciente'],
    //         f8data: 'PACIENTES',
    //         columnas: [{
    //             title: 'COD'
    //         }, {
    //             title: 'NOMBRE'
    //         }, {
    //             title: 'EPS'
    //         }],
    //         callback: (data) => {
    //             this.form.paciente_SER120 = data.COD;
    //             _enterInput('.paciente');
    //         },
    //         cancel: () => {
    //             _enterInput('.pacienteS');
    //         }
    //     };
    //     F8LITE(parametros);
    // },



    // Cargar DLLS


    // cargarPacientes() {
    //   postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER810.DLL"))
    //     .then((data) => {
    //       this._pacientes = data.PACIENTES;
    //       this._pacientes.pop();
    //       loader('hide');
    //       this.llenarDatosFecha();
    //     })
    //     .catch((err) => {
    //       console.log(err, 'err')
    //       loader('hide')
    //       _toggleNav();
    //     });
    // },

  },
})