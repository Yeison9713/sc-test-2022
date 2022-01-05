
// Registro de consultas CREACION - CARLOS R. - 17-11-2021

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
			dia_ini: '',
			ano_fin: '',
			mes_fin: '',
			dia_fin: '',
      medico: '',
      unidad: '',
      descrip_medico: '',
      descrip_unidad: '',
    },

    _profesionales: [],
    _unidades: [],
 
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    _inputControl("disabled");
    _inputControl('reset');
    loader("show");
    nombreOpcion('9-5-4-2-1-5-3 - Registro de consultas');
    this.cargarProfesionales();
  },
  methods: {
    llenarDatosFecha() {
      this.form.ano_ini = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mes_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.dia_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

      this.form.ano_fin = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mes_fin = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.dia_fin = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

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
					if (mes < 1 || mes > 12) {
						this.validarMesIni();
					} else {
						this.validarDiaIni();
					}
				}
			);
		},

		validarDiaIni() {
			validarInputs(
				{
					form: '#dia_inicial',
					orden: '1'
				},
				() => {
					this.validarAnoIni();
				},
				() => {
					this.form.dia_ini = cerosIzq(this.form.dia_ini, 2);
					let dia = parseInt(this.form.dia_ini);
					if (dia < 1 || dia > 31) {
						this.validarDiaIni();
					} else {
						// continue
						this.validarAnoFin();
					}
				}
			);
		},

		validarAnoFin() {
			validarInputs(
				{
					form: '#ano_final',
					orden: '1'
				},
				() => {
					this.validarAnoIni();
				},
				() => {
					let año = parseInt(this.form.ano_fin);
					if (año < 1990) {
						CON851('03', '03', null, 'error', 'error');
						this.validarAnoFin();
					} else {
						this.validarMesFin();
					}
				}
			);
		},

		validarMesFin() {
			validarInputs(
				{
					form: '#mes_final',
					orden: '1'
				}, 	() => {
					this.validarAnoFin();
				}, 	() => {
					this.form.mes_fin = cerosIzq(this.form.mes_fin, 2);
					let mes = parseInt(this.form.mes_fin);
					if (mes < 1 || mes > 12) {
						this.validarMesFin();
					} else {
						this.validarDiaFin();
					}
				}
			);
		},

		validarDiaFin() {
			validarInputs(
				{
					form: '#dia_final',
				}, () => {
					this.validarAnoFin();
				}, () => {
					this.form.dia_fin = cerosIzq(this.form.dia_fin, 2);
					let dia = parseInt(this.form.dia_fin);
					this.form.fechaInicial = parseInt(`${this.form.ano_ini}${this.form.mes_ini}${this.form.dia_ini}`);
					this.form.fechaFinal = parseInt(`${this.form.ano_fin}${this.form.mes_fin}${this.form.dia_fin}`);
					if (dia < 1 || dia > 31) {
						this.validarDiaFin();
					} else if (this.form.fechaFinal < this.form.fechaInicial) {
						CON851('37', '37', null, 'error', 'error');
						this.validarAnoFin();
					} else {
						this.validar_Medico();
					}
				}
			);
		},

    validar_Medico() {
			validarInputs(
				{
					form: '#dato_medico',
					orden: '1'
				},
				() => {
					this.validarAnoFin();
				},
				() => {
					this.form.medico = this.form.medico || '99';
					let medico = this.form.medico;
					if (medico == '99') {
						this.$refs.descrip_medico.value = 'Todos los médicos';
						this.validar_Unidad();
					} else {
						let busq = this._profesionales.find((a) => a.IDENTIFICACION == medico);
						if (busq != undefined) {
							this.$refs.descrip_medico.value = busq.NOMBRE;
							this.validar_Unidad();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupo();
						}
					}
				}
			);
		},

    validar_Unidad() {
			validarInputs(
				{
					form: '#dato_unidad',
					orden: '1'
				},
				() => {
					this.validar_Medico();
				},
				() => {
					this.form.unidad = this.form.unidad || '**';
					let unidad = this.form.unidad;
					if (unidad == '**') {
						this.$refs.descrip_unidad.value = 'Todas las unidades';
						this._envioImpresion();
					} else {
						let busq = this._unidades.find((a) => a.COD == unidad);
						if (busq != undefined) {
							this.$refs.descrip_unidad.value = busq.DESCRIP;
							this._envioImpresion();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Unidad();
						}
					}
				}
			);
		},

    _envioImpresion() {
			CON851P(
        "00",
        () => {
          this.validar_Medico();
        },
        () => {
          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.form.fechaInicial.toString()).format("YYYY/MM/DD")} - ${moment(this.form.fechaFinal.toString()).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

					let data = {};

					data["datosh"] = datosEnvio();
          data["admin_w"] = localStorage.Usuario;
					data["fecha_inicial"] = this.form.fechaInicial.toString();
					data["fecha_final"] = this.form.fechaFinal.toString();
					data["medico_w"] = this.form.medico;
					data["unidad_w"] = this.form.unidad;

          postData(data, get_url("app/SALUD/SER161.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
							this._montarImpresion_SER161(data);							
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validar_Medico();
            });
        }
      );
		},

    _montarImpresion_SER161(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        // data.LISTADO[i]['DESCRIPCION'] = data.LISTADO[i]['DESCRIPCION'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_Medico();
      } else {
        var columnas = [
          {
            title: "ITEM",
            value: "ITEM",
          },
          {
            title: "FECHA",
            value: "FECHA",
          },
          {
            title: "HORA", 
            value: "HORA",
          },
          {
            title: "IDENTIFICACION",
            value: "IDENTIFICACION",
          },
          {
            title: "1ER_APELLIDO", 
            value: "1ER_APELLIDO",
          },
          {
            title: "2DO_APELLIDO",
            value: "2DO_APELLIDO",
          },
          {
            title: "NOMBRE", 
            value: "NOMBRE",
          },
          {
            title: "SERVICIO",
            value: "SERVICIO",
          },
          {
            title: "EDAD",
            value: "EDAD",
          },
          {
            title: "EPS",
            value: "EPS",
          },
					{
            title: "DIAGNOSTICO",
            value: "DIAGNOSTICO",
          },
          {
            title: "DROG", 
            value: "DROG",
					
          },
					{
            title: "LABOR",
            value: "LABOR",
          },
					{
            title: "IMAG",
            value: "IMAG",
          },
					{
            title: "CONS",
            value: "CONS",
          },
					{
            title: "OTROS",
            value: "OTROS",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `RESUMEN DE FACTURACION   NIT: ${nit}`,
          `PERIODO DESDE: ${this.form.ano_ini}/${this.form.mes_ini}/${this.form.dia_ini} 
          HASTA: ${this.form.ano_fin}/${this.form.mes_fin}/${this.form.dia_fin}`,
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

    _ventanaMedicos() {
      _ventanaDatos({
        titulo: 'VENTANA DE PROFESIONALES',
        columnas: ['NOMBRE', 'IDENTIFICACION'],
        data: this._profesionales,
        callback_esc: () => {
          document.querySelector('.medico').focus()
        },
        callback: (data) => {
          this.form.medico = data.IDENTIFICACION;
          setTimeout(() => { _enterInput('.medico') }, 100);
        }
      })
    },

    _ventanaUnidades() {
      _ventanaDatos({
        titulo: 'VENTANA UNIDADES DE SERVICIO',
        columnas: ['COD', 'DESCRIP'],
        data: this._unidades,
        callback_esc: () => {
          document.querySelector('.unidad').focus()
        },
        callback: (data) => {
          this.form.unidad = data.COD;
          setTimeout(() => { _enterInput('.unidad') }, 100);
        }
      })
    },

    // Cargar DLLS
    cargarProfesionales() {
      postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER819.DLL'))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
         // loader('hide');
          this.cargarUnidades();
        })
        .catch((err) => {
          console.log(err);
          loader('hide');
          _toggleNav();
        });
    },

    cargarUnidades() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unidades = data.UNSERV;
          this._unidades.pop();
          loader('hide');
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