
// CREACION - SANTIAGO.F - SEPT 13/2021

new Vue({
  el: '#SER166',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      ano_listar: '',
      mes_listar: '',
      prefijo: '',
      descripPrefijo: '',
      fecha: '',
    },

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    _vm = this;
    nombreOpcion('9-5-4-2-1-4-6 - Listado facturado por mes');
    this.llenarDatosFecha();
  },
  methods: {
    llenarDatosFecha() {
      this.form.ano_listar = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`
      this.form.mes_listar = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4)
      this.form.fecha = $_USUA_GLOBAL[0].FECHALNK
      this.validarPrefijo();
    },

    validarPrefijo() {
      validarInputs({
        form: '#prefijo'
      }, () => {
        _toggleNav();
      }, () => {
        this.form.prefijo = this.form.prefijo.toUpperCase() || '*';
        let prefijo = this.form.prefijo;

        if (prefijo == '*') {
          this.form.descripPrefijo = 'Todos los prefijos';
          this._envioImpresion();
        } else if (['A', 'P', 'T', 'B', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S', 'V', 'W', 'X', 'Y', 'Z'].includes(prefijo)) {
          this._envioImpresion();
        } else {
          this.validarPrefijo();
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          this.validarPrefijo();
        },
        () => {
          this.estado_loader = true;
          // this.label_loader = `Procesando: ${moment(this.form.fecha.toString()).format("YYYY/MM")})}`;
          this.label_loader = `Procesando: ${moment(`20${this.form.fecha}`).format("YYYY/MM")}`;
          this.progreso = { transferred: 0, speed: 0 };

          var datos_envio = [
            localStorage.Usuario,
            `20${this.form.fecha}`,
            this.form.prefijo,
          ]

          // var datos_envio = datosEnvio()
          //   + localStorage.Usuario
          //   + '|' + $this.form.undServ
          //   + '|' + $this.form.atiende
          //   + '|' + $this.form.tipoPersonal
          //   + '|' + $this.form.paciente
          //   + '|' + $this.form.fechaIni.toString()
          //   + '|' + $this.form.fechaFin.toString()
          //   + '|' + $this.form.tipoFormu;

          postData({ datosh: datosEnvio() + datos_envio.join('|') }, get_url("app/SALUD/SER166.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_SER166(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validarPrefijo();
            });
        }
      );
    },

    _montarImpresion_SER166(data) {
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
        this.validarPrefijo();
      } else {
        var columnas = [
          {
            title: "FACT.",
            value: "LLAVE",
            format: "string",
          },
          {
            title: "TOTAL FACT",
            value: "TOTAL_FACT",
          },
          {
            title: "DROGUERIA", 
            value: "DROGUERIA",
          },
          {
            title: "CIRUGIA", 
            value: "CIRUGIA",
          },
          {
            title: "LABORATORIO", 
            value: "LABORATORIO",
          },
          {
            title: "IMAGENOLOGIA", 
            value: "IMAGENOLOGIA",
          },
          {
            title: "OTROS SERV.", 
            value: "OTROS_SERV",
          },
          {
            title: "CONSULTAS Y TER", 
            value: "CONSULT_TER",
          },
          {
            title: "PATOLOG CITOLOG", 
            value: "PATOL_CITOL",
          },
          {
            title: "PROM. Y PREVEN", 
            value: "PROM_PREV",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `LISTADO DE FACTURACION     NIT: ${nit}`,
          `PERIODO: ${this.form.fecha.substring(0, 2)}/${this.form.fecha.substring(2, 4)}/${this.form.fecha.substring(4, 6)}`,
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

    cargarUnidServ_hc9058() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unserv = data.UNSERV;
          this._unserv.pop();
          this.cargarProfesionales_hc9058();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _toggleNav();
        });
    },

    cargarProfesionales_hc9058() {
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
          _toggleNav();
        });
    },
  },
})