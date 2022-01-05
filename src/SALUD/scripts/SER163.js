//RESUMEN GENERAL CIRUGIAS  - CARLOS R. - 11-11-2021

new Vue({
  el: "#SER163",
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
      clase_serv: '',
      grupo: '',
      codigo: '',
      prefijo: '',
      cliente: '',
      medico: '',
      descrip_grupo: '',
      descrip_codigo: '',
      descrip_cliente: '',
      descrip_med: '',

    },

    arr_clase_serv: [
			{ COD: '2', DESCRIP: 'QUIR' },
			{ COD: '3', DESCRIP: 'AYUD' },
			{ COD: '4', DESCRIP: 'ANEST' },
			{ COD: '5', DESCRIP: 'INSTR' },
			{ COD: '6', DESCRIP: 'SALA' },
      { COD: '9', DESCRIP: 'TODOS' },
		],

		arr_prefijos: [
			{ COD: '*', DESCRIP: 'TODOS LOS PREFIJOS' },
			{ COD: 'E', DESCRIP: 'CONTADO-EFECTIVO' },
			{ COD: 'C', DESCRIP: 'CONTADO-CREDITO' },
			{ COD: 'A', DESCRIP: 'AMBULATORIO' },
			{ COD: 'P', DESCRIP: 'PENSIONADOS' },
			{ COD: 'T', DESCRIP: 'ACC. DE TRANSITO' }
		],

    _terceros: [],
    _grupos: [],
    _articulos: [],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    Fecha_act: moment().format("YYYYMMDD"),
  },
  async created() {
    _inputControl("disabled");
    _inputControl('reset');
    loader("show");
    nombreOpcion("9,5,4,1,5,2 - Resumen general cirugias");
    this.cargarGrupos()
   },
  
  computed: {
		descrip_clase() {
			let tipo = this.arr_clase_serv.find((el) => el.COD == this.form.clase_serv);
			return tipo ? tipo.DESCRIP : '';
		},
		descrip_prefijo() {
      let tipo = this.arr_prefijos.find((el) => el.COD == this.form.prefijo);
      return tipo ? tipo.DESCRIP : '';
    },
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
						this.validar_clase();
					}
				}
			);
		},

    validar_clase() {
			POPUP(
				{
					array: this.arr_clase_serv,
					titulo: 'Clase de servicio',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '9',
					teclaAlterna: true,
					id_input: '#dato_clase',
					callback_f: () => {
						this.validarDiaFin();
					}
				},
				(data) => {
					this.form.clase_serv = data.COD;
					setTimeout(() => {
						this.validar_grupo();
					}, 100);
				}
			);
		},

		validar_grupo() {
			validarInputs(
				{
					form: '#dato_grupo',
					orden: '1'
				},
				() => {
					this.validar_clase();
				},
				() => {
					this.form.grupo = this.form.grupo || '**';
					let grupo = this.form.grupo;
					if (grupo == '**') {
						this.$refs.descrip_grupo.value = 'Todos los grupos';
						this.validar_codigo();
					} else {
						let busq = this._grupos.find((a) => a.COD == grupo);
						if (busq != undefined) {
							this.$refs.descrip_grupo.value = busq.DESCRIP;
							this.validar_codigo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupo();
						}
					}
				}
			);
		},

		validar_codigo() {
			validarInputs(
				{
					form: '#dato_codigo',
					orden: '1'
				},
				() => {
					this.validar_grupo();
				},
				() => {
					this.form.codigo = this.form.codigo || '**';
					let codigo = this.form.codigo;
					if (codigo == '**') {
						this.$refs.descrip_codigo.value = 'Proceso Total';
						this.validar_prefijo();
					} else {
						let busq = this._articulos.find((a) => a.COD_SER == codigo);
						if (busq != undefined) {
							this.$refs.descrip_codigo.value = busq.DESCRIP;
							this.validar_prefijo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_codigo();
						}
					}
				}
			);
		},

		validar_prefijo() {
			POPUP(
				{
					array: this.arr_prefijos,
					titulo: 'FORMA DE PAGO',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '*',
					teclaAlterna: true,
					id_input: '#dato_prefijo',
					callback_f: () => {
						this.validar_codigo();
					}
				},
				(data) => {
					this.form.prefijo = data.COD;
					setTimeout(() => {
						this.validar_Cliente();
					}, 100);
				}
			);
		},

		validar_Cliente() {
			validarInputs(
				{
					form: '#dato_cliente',
					orden: '1'
				},
				() => {
					this.validar_prefijo();
				},
				() => {
					this.form.cliente = this.form.cliente || '99';
					let cliente = this.form.cliente;

					if (cliente == '99') {
						this.$refs.descrip_cliente.value = 'Procesa todos los clientes';
						this.validar_Medico();
					} else {
						let busq = this._terceros.find(a => a.COD == cliente);
						if (busq != undefined) {
							this.$refs.descrip_cliente.value = busq.NOMBRE;
							this.validar_Medico();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Cliente();
						}
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
					this.validar_Cliente();
				},
				() => {
					this.form.medico = this.form.medico || '99';
					let medico = this.form.medico;

					if (medico == '99') {
						this.$refs.descrip_med.value = 'Procesa todos los medicos';
						this._envioImpresion();
					} else {
						let busq = this._terceros.find(a => a.COD == medico);
						if (busq != undefined) {
							this.$refs.descrip_med.value = busq.NOMBRE;
							this._envioImpresion();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Medico();
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
					data["clase_w"] = this.form.clase_serv;
					data["grupo_w"] = this.form.grupo;
					data["codigo_w"] = this.form.codigo;
					data["pago_w"] = this.form.pago;
					data["cliente_w"] = this.form.cliente;
					data["medico_w"] = this.form.medico;



          postData(data, get_url("app/SALUD/SER163.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
							this._montarImpresion_SER163(data);							
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.dato_Entidad();
            });
        }
      );
		},

		_montarImpresion_SER163(data) {
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
        this.dato_Entidad();
      } else {
        var columnas = [
          {
            title: "FECHA",
            value: "FECHA",
          },
          {
            title: "COMP",
            value: "COMP",
          },
          {
            title: "FACTURA", 
            value: "FACTURA",
          },
          {
            title: "CLIENTE",
            value: "CLIENTE",
          },
          {
            title: "DETALLE", 
            value: "DETALLE",
          },
          {
            title: "CONTADO",
            value: "CONTADO",
          },
          {
            title: "CREDITO", 
            value: "CREDITO",
          },
          {
            title: "PENSIONADO",
            value: "PENSIONADO",
          },
          {
            title: "AMBULATORIO",
            value: "AMBULATORIO",
          },
					{
            title: "ACC_TRANS",
            value: "ACC_TRANS",
          },
          {
            title: "TOTAL", 
            value: "TOTAL",
					
          },
					{
            title: "ID_MEDICO",
            value: "ID_MEDICO",
          },
					{
            title: "MEDICO",
            value: "MEDICO",
          },
					{
            title: "ID_PACIENTE",
            value: "ID_PACIENTE",
          },
					{
            title: "PACIENTE",
            value: "PACIENTE",
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

  // ventanas f8
  
	_ventanaGrupos() {
		_ventanaDatos({
			titulo: 'VENTANA DE GRUPOS DE SERVICIOS',
			columnas: ['COD', 'DESCRIP'],
			data: this._grupos,
			callback_esc: () => {
				document.querySelector('.grupo').focus();
			},
			callback: (data) => {
				this.form.grupo = data.COD;
				this.$refs.descrip_grupo.value = data.DESCRIP;
				setTimeout(() => {
					_enterInput(".grupo");
				}, 100);
			}
		});
	},

	_ventanaArt() {
		_ventanaDatos({
			titulo: 'VENTANA TABLA DE TARIFAS',
			columnas: ['COD_SER', 'DESCRIP'],
			data: this._articulos,
			callback_esc: () => {
				document.querySelector('.codigo').focus();
			},
			callback: (data) => {
				this.form.codigo = data.COD_SER;
				this.$refs.descrip_codigo.value = data.DESCRIP;
				setTimeout(() => {
					_enterInput(".codigo");
				}, 100);
			}
		});
	},

	_ventanaCliente() {
		_ventanaDatos({
			titulo: 'VENTANA TERCEROS',
			
			columnas: ['COD', 'NOMBRE'],
			data: this._terceros,
			callback_esc: () => {
				document.querySelector('.cliente').focus()
			},
			callback: (data) => {
				this.form.cliente = data.COD;
				setTimeout(() => { _enterInput('.cliente') }, 100);
			}
		})
	},

	_ventanaMed() {
		_ventanaDatos({
			titulo: 'VENTANA TERCEROS',
			columnas: ['COD', 'NOMBRE'],
			data: this._terceros,
			callback_esc: () => {
				document.querySelector('.medico').focus()
			},
			callback: (data) => {
				this.form.medico = data.COD;
				setTimeout(() => { _enterInput('.medico') }, 100);
			}
		})
	},
// Cargar DLLS
 cargarGrupos() {
 	postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER801.DLL'))
 		.then((data) => {
 			this._grupos = data.CODIGOS;
			// loader('hide');
 			this.cargarTablas();
 		})
 		.catch((err) => {
 			console.log(err);
 			loader('hide');
 			_toggleNav();
 		});
 },

 cargarTablas() {
	postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER802.DLL'))
		.then((data) => {
			this._articulos = data.TABLA;
			// this._tablas.pop();
			// loader('hide');
			this.cargarTerceros();
		})
		.catch((err) => {
			console.log(err);
			loader('hide');
			_toggleNav();
		});
},

cargarTerceros() {
	postData({ datosh: datosEnvio() + '|' }, get_url('APP/CONTAB/CON802.DLL'))
		.then((data) => {
			this._terceros = data.TERCEROS;
			loader('hide');
			this.llenarDatosFecha();
		})
		.catch((err) => {
			console.log(err);
			loader('hide');
			_toggleNav();
		});
},
	
  },
});
