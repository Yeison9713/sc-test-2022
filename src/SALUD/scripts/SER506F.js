
// CREACION - Carlos - SEPT 15/2021

new Vue({
  el: '#SER506F',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      fechaInicial: '',
      fechaFinal: '',
      fechaBase: '',
      prefijo: '',

      entidad: '',
      descripEntidad: '',

      actividad: '',
      descripActividad: '',

      añoInicial: '',
      mesInicial: '',
      diaInicial: '',

      mesFinal: '',
      añoFinal: '',
      diaFinal: '',

      descripFechaBase: '',
    },

    _terceros: [],
    _actividades: [],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    _vm = this
    loader("show");
    nombreOpcion('9-5-4-2-1-4-5 - Listado facturado por entidad');
    this.cargarTerceros();
  },

  methods: {
    llenarDatosFecha() {
      this.form.añoInicial = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mesInicial = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.diaInicial = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

      this.form.añoFinal = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mesFinal = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.diaFinal = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

      loader('hide')
      this.validarAñoIni();
    },

    validarAñoIni() {
      validarInputs({
        form: '#añoInicial',
        orden: "1"
      }, () => {
        _toggleNav();
      }, () => {
        let año = parseFloat(this.form.añoInicial) || 0
        if (año < 1990) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAñoIni();
        } else {
          this.validarMesIni();
        }
      })
    },

    validarMesIni() {
      validarInputs({
        form: '#mesInicial',
        orden: "1"
      }, () => {
        this.validarAñoIni();
      }, () => {
        this.form.mesInicial = cerosIzq(this.form.mesInicial, 2);
        let mes = parseInt(this.form.mesInicial);
        if (mes < 1 || mes > 12) {
          this.validarMesIni();
        } else {
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
        this.form.diaInicial = cerosIzq(this.form.diaInicial, 2);
        let dia = parseInt(this.form.diaInicial);
        if (dia < 1 || dia > 31) {
          this.validarDiaIni();
        } else {
          // continue
          this.validarAñoFin();
        }
      })
    },

    validarAñoFin() {
      validarInputs({
        form: '#añoFinal'
      }, () => {
        this.validarAñoIni();
      }, () => {
        let año = parseInt(this.form.añoFinal);
        if (año < 1990) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAñoFin();
        } else {
          this.validarMesFin();
        }
      })
    },

    validarMesFin() {
      validarInputs({
        form: '#mesFinal'
      }, () => {
        this.validarAñoFin();
      }, () => {
        this.form.mesFinal = cerosIzq(this.form.mesFinal, 2);
        let mes = parseInt(this.form.mesFinal);
        if (mes < 1 || mes > 12) {
          this.validarMesFin();
        } else {
          this.validarDiaFin();
        }
      })
    },

    validarDiaFin() {
      validarInputs({
        form: '#diaFinal'
      }, () => {
        this.validarMesFin();
      }, () => {
        this.form.diaFinal = cerosIzq(this.form.diaFinal, 2);
        let dia = parseInt(this.form.diaFinal);
        this.form.fechaInicial = parseInt(`${this.form.añoInicial}${this.form.mesFinal}${this.form.diaInicial}`);
        this.form.fechaFinal = parseInt(`${this.form.añoFinal}${this.form.mesFinal}${this.form.diaFinal}`);
        if (dia < 1 || dia > 31) {
          this.validarDiaFin();
        } else if (this.form.fechaFinal < this.form.fechaInicial) {
          CON851('37', '37', null, 'error', 'error')
          this.validarAñoFin();
        } else {
          this.validarPrefijo();
        }
      })
    },

    validarPrefijo() {
      validarInputs({
        form: '#prefijo'
      }, () => {
        this.validarAñoIni();
      }, () => {
        this.form.prefijo = this.form.prefijo.toUpperCase() || '*';
        let prefijo = this.form.prefijo;

        if (prefijo == '*') {
          this.validarEntidad();
        } else if (['A', 'P', 'T', 'B', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S', 'V', 'W', 'X', 'Y', 'Z'].includes(prefijo)) {
          this.validarEntidad();
        } else {
          this.validarPrefijo();
        }
      })
    },

    validarEntidad() {
      validarInputs({
        form: '#entidad'
      }, () => {
        this.validarPrefijo();
      }, () => {
        this.form.entidad = this.form.entidad || "99";    
        let entidad = this.form.entidad;

        if (entidad == '99') {
          this.form.descripEntidad = 'Procesa todos los clientes';
          this.validarActividad();
        } else {
          let busq = this._terceros.find(a => a.COD == entidad);
          if (busq != undefined) {
            this.form.descripEntidad = busq.NOMBRE;
            this.validarActividad();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarEntidad();
          }
        }
      })
    },

    validarActividad() {
      validarInputs({
        form: '#actividad'
      }, () => {
        this.validarEntidad();
      }, () => {
        this.form.actividad = this.form.actividad || "**";    
        let actividad = this.form.actividad;

        if (actividad == '**') {
          this.form.descripActividad = 'Todas las actividades';
          this.validarFechabase();
        } else {
          let busq = this._actividades.find(a => a.COD == actividad);
          if (busq != undefined) {
            this.form.descripActividad = busq.DESCRIP;
            this.validarFechabase();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarActividad();
          }
        }
      })
    },

    validarFechabase() {
      validarInputs({
        form: '#fechaBase'
      }, () => {
        this.validarActividad();
      }, () => {

        this.form.fechaBase = this.form.fechaBase || 2;    
        let fechaBase = this.form.fechaBase;

        if (fechaBase == 2) {
          this.form.descripFechaBase = 'F. Cierre';
          this._envioImpresion();
          // continue
        } else if (fechaBase == 1) {
          this.form.descripFechaBase = 'Prestacion';
          this._envioImpresion();
          // continue
        } else {
          this.validarFechabase();
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          this.validarFechabase();
        },
        () => {
          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.form.fechaInicial.toString()).format("YYYY/MM/DD")} - ${moment(this.form.fechaFinal.toString()).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

          var datos_envio = [
            this.form.prefijo,
            this.form.fechaInicial,
            this.form.fechaFinal,
            this.form.entidad,
            this.form.actividad,
            this.form.fechaBase,
          ]

          postData({ datosh: datosEnvio() + datos_envio.join('|') }, get_url("app/SALUD/SER506F.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_SER506F(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validarFechabase();
            });
        }
      );
    },

    _montarImpresion_SER506F(data) {
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
        this.validarFechabase();
      } else {
        var columnas = [
          {
            title: "ENTIDAD.",
            value: "ENTIDAD",
            format: "string",
          },
          {
            title: "ACTIVIDAD",
            value: "ACTIVIDAD",
            format: "string",
          },
          {
            title: "VLR BRUTO", 
            value: "BRUTO",
          },
          {
            title: "ABONOS", 
            value: "ABONOS",
          },
          {
            title: "COPAGOS", 
            value: "COPAGOS",
          },
          {
            title: "NETO", 
            value: "NETO",
          },

        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `LISTADO DE FACTURACION   NIT: ${nit}`,
          `PERIODO DESDE: ${this.form.añoInicial}/${this.form.mesInicial}/${this.form.diaInicial} 
          HASTA: ${this.form.añoFinal}/${this.form.mesFinal}/${this.form.diaFinal} -  ${this.form.descripFechaBase}`,
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

    
    _ventanaEntidad() {
      _ventanaDatos({
        titulo: 'VENTANA TERCEROS',
        columnas: ['COD', 'NOMBRE'],
        data: this._terceros,
        callback_esc: () => {
          document.querySelector('.entidad').focus()
        },
        callback: (data) => {
          this.form.entidad = data.COD;
          setTimeout(() => { _enterInput('.entidad') }, 100);
        }
      })
    },

    _ventanaActividad() {
      _ventanaDatos({
        titulo: 'VENTANA ACTIVIDADES',
        columnas: ['COD', 'DESCRIP'],
        data: this._actividades,
        callback_esc: () => {
          document.querySelector('.actividad').focus()
        },
        callback: (data) => {
          this.form.actividad = data.COD;
          setTimeout(() => { _enterInput('.actividad') }, 100);
        }
      })
    },

    cargarTerceros() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON802.DLL"))
        .then((data) => {
          this._terceros = data.TERCEROS;
          this.cargarActividades();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _toggleNav();
        });
    },

    cargarActividades() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON806.DLL"))
        .then((data) => {
          this._actividades = data.ACTIVIDADES;
          this.llenarDatosFecha();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _toggleNav();
        });
    },


  },
})