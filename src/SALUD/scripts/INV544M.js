//INFORME DE ATENCION X EDADES  - CARLOS R. - 29-09-2021

new Vue({
	el: '#INV544M',
	components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
	},
	data: {
		form: {
			tipo_fact: '',
			prefijo: '',
			numero_fact: '',
			discri_paciente: '',
			discri_ciudad: '',
			discri_factura: '',
			discri_espec: '',
			fechaInicial: '',
			fechaFinal: '',
			ano_ini: '',
			mes_ini: '',
			dia_ini: '',
			ano_fin: '',
			mes_fin: '',
			dia_fin: '',
			grupo: '',
			articulo: '',
			discri_codigo: '',
			primera_vez: '',
			mayor15: '',
			embarazadas: '',
			trimestre: '',
			descrip_trimestre: '',
			nit: '',
			descrip_nit: '',
			especialidad: '',
			descrip_espec: '',
			valor: '',
			contrato: '',
			descrip_contrato: '',
			costos: '',
			descrip_costos: '',
			ultmamo: ''
		},

		arr_tipo_fact: [
			{ COD: '*', DESCRIP: 'TODOS LOS SERVICIOS' },
			{ COD: '0', DESCRIP: 'DROGUERIA' },
			{ COD: '1', DESCRIP: 'CIRUGIAS' },
			{ COD: '2', DESCRIP: 'LAB. Y OTROS DIAG ' },
			{ COD: '3', DESCRIP: 'RX- IMAGENOLOGIA' },
			{ COD: '4', DESCRIP: 'OTROS SERVICIOS' },
			{ COD: '5', DESCRIP: 'CONSULTAS Y TERAPIAS' },
			{ COD: '6', DESCRIP: 'PATOLOGIAs-CITOLOGIAS' },
			{ COD: '7', DESCRIP: 'PROMOCION Y PREVENCION' }
		],

		_terceros: [],
		_numer: [],
		_grupos: [],
		_grser: [],
		_articulos: [],
		_especialidades: [],
		_costos: [],
		_cups: [],
		_contratos: [],

		estado_loader: false,
		progreso: {},
		label_loader: null,
		loader: 1,

		fecha_act: moment().format('YYYYMMDD')
	},
	async created() {
		 _vm = this;
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-5-4-1-2-2 - Informe de atenciones x edades');
		loader('show');
		this.cargarGrupos();
	},
	computed: {
		descrip_tipo_fact() {
			let tipo = this.arr_tipo_fact.find((el) => el.COD == this.form.tipo_fact);
			return tipo ? tipo.DESCRIP : '';
		},
	},

	methods: {
		validar_factura() {
			POPUP(
				{
					array: this.arr_tipo_fact,
					titulo: 'Tipo de servicio',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '*',
					teclaAlterna: true,
					id_input: '#tipoFact',
					callback_f: () => {
						_toggleNav();
					}
				},
				(data) => {
					this.form.tipo_fact = data.COD;
					setTimeout(() => {
						this.validar_prefijo();
					}, 100);
				}
			);
		},

		validar_prefijo() {
			validarInputs(
				{
					form: '#prefijo'
				},
				() => {
					this.validar_factura();
				},
				() => {
					this.form.prefijo = this.form.prefijo.toUpperCase() || '*';
					let prefijo = this.form.prefijo;

					if (prefijo == '*' || prefijo == 'C') {
						this.form.numero_fact = '999999';
						this.$refs.descrip_fact.value = 'Todas las facturas';
						this.validar_discriminar_paciente();
					} else if (
						[
							'A',
							'P',
							'T',
							'B',
							'D',
							'F',
							'G',
							'H',
							'I',
							'J',
							'K',
							'L',
							'M',
							'N',
							'O',
							'Q',
							'R',
							'S',
							'V',
							'W',
							'X',
							'Y',
							'Z'
						].includes(prefijo)
					) {
						this.aceptar_nro_factura();
					} else {
						this.validar_prefijo();
					}
				}
			);
		},

		aceptar_nro_factura() {
			validarInputs(
				{ form: '#aceptar_nro_factura' },
				() => {
					this.validar_prefijo();
				},
				() => {
					this.form.numero_fact = this.form.numero_fact.trim();
					if (this.form.numero_fact) {
						this.form.numero_fact = this.form.numero_fact.padStart(6, '0');

						postData({ datosh: datosEnvio() + `${this.form.prefijo}${this.form.numero_fact}` }, get_url('APP/SALUD/SER808-01.DLL'))
							.then((data) => {
								this._numer = data.NUMER19[0]
								this.$refs.descrip_fact.value = this._numer.DESCRIP_NUM;
								this.validar_discriminar_paciente();
							})
							.catch((err) => {
								console.error('Error consultando factura: ', err);
								CON851('', 'Error consultando factura', null, 'error');
								this.aceptar_nro_factura();
							});

					} else {
						CON851('03', '03', null, 'warning', '');
						this.aceptar_nro_factura();
					}
				}
			);
		},

		validar_discriminar_paciente() {
			validarInputs(
				{
					form: '#validar_dpaciente',
					orden: '1'
				},
				() => {
					this.validar_prefijo();
				},
				() => {
					let discri_paciente = this.form.discri_paciente.toUpperCase() || 'S';
					this.form.discri_paciente = discri_paciente;

					if (discri_paciente == 'S' || discri_paciente == 'N') {
						this.validar_discriminar_ciudad();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.validar_discriminar_paciente();
					}
				}
			);
		},

		validar_discriminar_ciudad() {
			validarInputs(
				{
					form: '#validar_dciudad',
					orden: '1'
				},
				() => {
					this.validar_discriminar_paciente();
				},
				() => {
					let discri_ciudad = this.form.discri_ciudad.toUpperCase() || 'N';
					this.form.discri_ciudad = discri_ciudad;

					if (discri_ciudad == 'S' || discri_ciudad == 'N') {
						this.validar_discriminar_factura();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.validar_discriminar_ciudad();
					}
				}
			);
		},

		validar_discriminar_factura() {
			validarInputs(
				{
					form: '#validar_dfactura',
					orden: '1'
				},
				() => {
					this.validar_discriminar_ciudad();
				},
				() => {
					let discri_factura = this.form.discri_factura.toUpperCase() || 'N';
					this.form.discri_factura = discri_factura;

					if (discri_factura == 'S' || discri_factura == 'N') {
						this.validar_discriminar_espec();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.validar_discriminar_factura();
					}
				}
			);
		},

		validar_discriminar_espec() {
			validarInputs(
				{
					form: '#validar_despec',
					orden: '1'
				},
				() => {
					this.validar_discriminar_factura();
				},
				() => {
					let discri_espec = this.form.discri_espec.toUpperCase() || 'N';
					this.form.discri_espec = discri_espec;

					if (discri_espec == 'S' || discri_espec == 'N') {
						this.llenarDatosFecha();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.validar_discriminar_espec();
					}
				}
			);
		},

		llenarDatosFecha() {
			if (this.form.mes_ini == 0 || this.form.mes_ini == '') {
				if (this.form.prefijo == '*' || this.form.prefijo == 'C') {
					this.form.ano_ini = parseFloat(this.fecha_act.substring(0, 4));
					this.form.mes_ini = parseFloat(this.fecha_act.substring(4, 6));
					this.form.dia_ini = 1;

					this.form.ano_fin = parseFloat(this.fecha_act.substring(0, 4));
					this.form.mes_fin = parseFloat(this.fecha_act.substring(4, 6));
					this.form.dia_fin = 31;
				} else {
					this.form.ano_ini = parseFloat(this._numer.FECHA_ING.substring(0, 4));
					this.form.mes_ini = parseFloat(this._numer.FECHA_ING.substring(4, 6));
					this.form.dia_ini = parseFloat(this._numer.FECHA_ING.substring(6, 8));

					this.form.ano_fin = parseFloat(this._numer.FECHA_ING.substring(0, 4));
					this.form.mes_fin = parseFloat(this._numer.FECHA_ING.substring(4, 6));
					this.form.dia_fin = 31;
				}
			}
			this.validarAnoIni();
		},

		validarAnoIni() {
			validarInputs(
				{
					form: '#ano_inicial',
					orden: '1'
				},
				() => {
					this.validar_discriminar_espec();
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
				},
				() => {
					this.validarAnoFin();
				},
				() => {
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
					orden: '1'
				},
				() => {
					this.validarAnoFin();
				},
				() => {
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
						this.validar_grupo();
					}
				}
			);
		},

		validar_grupo() {
			validarInputs(
				{
					form: '#validar_grupo',
					orden: '1'
				},
				() => {
					this.validarAnoIni();
				},
				() => {
					this.form.grupo = this.form.grupo || '**';
					let grupo = this.form.grupo;
					if (grupo == '**') {
						this.form.articulo = '*';
						this.$refs.descrip_grupo.value = 'Todos los grupos';
						this.$refs.descrip_art.value = 'Todos los articulos';
						this.validar_discriminar_codigo();
					} else if (this.form.tipo_fact == '0') {
						let busq = this._grupos.find((a) => a.GRUPO == grupo);
						if (busq != undefined) {
							this.$refs.descrip_grupo.value = busq.DESCRIP;
							this.validar_articulo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupo();
						}
					} else {
						let busq = this._grser.find((a) => a.COD == grupo);
						if (busq != undefined) {
							this.$refs.descrip_grupo.value = busq.DESCRIP;
							this.validar_articulo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupo();
						}
					}
				}
			);
		},

		validar_articulo() {
			validarInputs(
				{
					form: '#validar_articulo',
					orden: '1'
				},
				() => {
					this.validar_grupo();
				},
				() => {
					this.form.articulo = this.form.articulo || '*';
					let articulo = this.form.articulo;

					if (articulo == '*') {
						this.$refs.descrip_art.value = 'Todos los articulos';
						this.validar_discriminar_codigo();
					} else if (this.form.tipo_fact == '0') {
						let busq = this._articulos.find((a) => a.LLAVE_ART == articulo);
						if (busq != undefined) {
							this.$refs.descrip_art.value == busq.DESCRIP_ART;
							this.validar_discriminar_codigo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_articulo();
						}
					} else {
						let busq = this._cups.find((a) => a.LLAVE == articulo);
						if (busq != undefined) {
							this.$refs.descrip_art.value = busq.DESCRIP;
							this.validar_discriminar_codigo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_articulo();
						}
					}
				}
			);
		},

		validar_discriminar_codigo() {
			if (this.form.grupo == "**" || this.form.articulo == "*") {
				validarInputs(
					{
						form: "#validar_codigo",
					},
					() => {
						this.validar_grupo();
					},
					() => {
						this.form.discri_codigo = this.form.discri_codigo.toUpperCase() || 'S';
						let discri_codigo = this.form.discri_codigo;
						if (['S', 'N'].includes(discri_codigo)) {
							if (this.form.discri_factura == 'N' &&
								this.form.discri_paciente == 'N' &&
								this.form.discri_ciudad == 'N' &&
								this.form.discri_espec == 'N' &&
								this.form.discri_codigo == 'N') {
								CON851("", "03", null, "error", "error");
								this.validar_discriminar_codigo();
							} else {
								this.validar_repet()
							}
						} else {
							CON851("03", "03", null, "error", "error");
							this.validar_discriminar_codigo()
						}
					}
				);
			} else {
				this.form.discri_codigo = 'S';
				this.validar_repet();
			}
		},

		validar_repet() {
			if (
				(this.form.tipo_fact == '5' || this.form.tipo_fact == '7') &&
				this.form.discri_paciente == "S"
			) {
				if (this.form.tipo_fact == '7' && this.form.grupo != '89') {
					this.form.primera_vez = "N";
					this.validar_solo_mayor15();
				} else {
					validarInputs(
						{
							form: "#validar_primera_vez",
						},
						() => {
							this.validar_grupo();
						},
						() => {
							this.form.primera_vez = this.form.primera_vez.toUpperCase() || 'N';
							let primera_vez = this.form.primera_vez;

							if (['S', 'N'].includes(primera_vez)) {
								this.validar_solo_mayor15();
							} else {
								CON851('03', '03', null, 'error', 'error');
								this.validar_repet()
							}
						}
					);
				}
			} else {
				this.form.primera_vez = "N";
				this.form.mayor15 = "N";
				this.validar_embarazada();
			}
		},

		validar_solo_mayor15() {
			if (this.form.tipo_fact == '5') {
				validarInputs(
						{
							form: '#validar_mayor15',
							orden: '1'
						},
						() => {
							this.validar_discriminar_codigo();
						},
						() => {
							let mayor15 = this.form.mayor15.toUpperCase() || 'N';
							this.form.mayor15 = mayor15;

							if (mayor15 == 'S' || mayor15 == 'N') {
								this.validar_embarazada();
							} else {
								CON851('03', '03', null, 'error', 'error');
								this.validar_solo_mayor15();
							}
						}
					);
			} else {
				this.form.mayor15 = "N";
				this.validar_embarazada();
			}
		},

		validar_embarazada() {
			if (this.form.discri_paciente == 'N') {
				this.form.embarazadas = 'N'
				this.validar_trimestre();
			} else {
				validarInputs(
					{
						form: '#validar_embarazadas',
						orden: '1'
					},
					() => {
						this.validar_grupo();
					},
					() => {
						let embarazadas = this.form.embarazadas.toUpperCase() || 'N';
						
						if (['N', 'S'].includes(embarazadas)) {
							this.form.embarazadas = embarazadas;
							this.validar_trimestre();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.validar_embarazada();
						}
					}
				);
			}
		},

		validar_trimestre() {
			this.form.descrip_trimestre = '5 Para todos'
			if (this.form.embarazadas == 'N'){
				this.form.trimestre = '5'
				this.validar_entidad();
			} else {
				validarInputs(
					{
						form: '#validar_trimestre',
						orden: '1'
					},
					() => {
						this.validar_grupo();
					},
					() => {
						let trimestre = this.form.trimestre.toUpperCase() || '5';
						
						if (['1', '2', '3', '5'].includes(trimestre)) {
							this.form.trimestre = trimestre;
							this.validar_entidad();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.validar_trimestre();
						}
					}
				);
			}
		},

		validar_entidad() {
			validarInputs(
				{
					form: '#validar_nit',
					orden: '1'
				},
				() => {
					this.validar_grupo();
				},
				() => {
					this.form.nit = this.form.nit || '99';
					let nit = this.form.nit;

					if (nit == '99') {
						this.form.descrip_nit = 'Todas las entidades';
						this.validar_especialidad();
					} else {
						let busq = this._terceros.find(a => a.COD == nit);
						if (busq != undefined) {
							this.form.descrip_nit = busq.NOMBRE;
							this.validar_especialidad();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_entidad();
						}
					}
				}
			);
		},

		validar_especialidad() {
			validarInputs(
				{
					form: '#validar_espec',
					orden: '1'
				},
				() => {
					this.validar_entidad();
				},
				() => {
					this.form.especialidad = this.form.especialidad || '***';
					let especialidad = this.form.especialidad;
					
					if (especialidad == '***') {
						this.form.descrip_espec = 'Todas las especialidades';
						this.validar_valor();
					} else {
						let busq = this._especialidades.find(a => a.CODIGO == especialidad);
						if (busq != undefined) {
							this.form.descrip_espec = busq.NOMBRE;
							this.validar_valor();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_especialidad();
						}
					}
				}
			);
		},

		validar_valor() {
			if (this.form.tipo_fact == "0" || (this.form.tipo_fact == "*" && this.form.discri_codigo == "N")) {
				validarInputs(
					{
						form: "#validar_valor",
						orden: '1'
					},
					() => {
						this.validar_especialidad();
					},
					() => {
						this.form.valor = this.form.valor.toUpperCase() || 'S';
						let valor = this.form.valor;
						if (valor == 'S' || valor == 'N') {
							this.validar_contratos();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.validar_valor();
						}
					}
				);
			} else {
				this.validar_contratos();
			}
		},
		

		validar_contratos() {
			validarInputs(
				{
					form: '#validar_contrato',
					orden: '1'
				},
				() => {
					this.validar_especialidad();
				},
				() => {
					this.form.contrato = this.form.contrato || '****';
					this.form.contrato = this.form.contrato.padStart(4, '0');
					let contrato = this.form.contrato;

					if (contrato == '****') {
						this.form.descrip_contrato = 'Todos los contratos';
						this.validar_costos();
					} else {
						let busq = this._contratos.find(a => a.CUENTA == contrato);
						if (busq != undefined) {
							this.form.descrip_contrato = busq.DESCRIP;
							this.validar_costos();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_contratos();
						}
					}
				}
			);
		},

		validar_costos() {
			validarInputs(
				{
					form: '#validar_costos',
					orden: '1'
				},
				() => {
					this.validar_contratos();
				},
				() => {
					this.form.costos = this.form.costos || '**';
					this.form.costos = this.form.costos.padStart(2, '0')
					let costos = this.form.costos;

					let costo1 = costos.substring(0, 1);
					let costo2 = costos.substring(1, 2);

					if (costos == '**') {
						this.form.descrip_costos = 'Todos los centros costos';
						this.validar_ultmamo();
					} else if (costo2 == '*') {
						costos = `${costo1}0`;
						let busq1 = this._costos.find((a) => a.COD == costos.padStart(4, '0'));
						console.log(costos)
						console.log(busq1)
						if (busq1 == undefined) {
							this.form.descrip_costos = `Generaliza costo ${costo1}`;
							this.validar_ultmamo();
						} else {
							this.validar_ultmamo();
						}
					} else {
						let busq = this._costos.find((a) => a.COD == costos.padStart(4, '0'));
						if (busq != undefined) {
							this.form.descrip_costos = busq.NOMBRE;
							this.validar_ultmamo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_costos();
						}
					}
				}
			);
		},

		validar_ultmamo() {
			if (this.form.grupo == "87" && (this.form.articulo == '6801' || this.form.articulo == '6802')) {
				validarInputs(
					{
						form: "#validar_ultmamo",
						orden: '1'
					},
					() => {
						this.validar_costos();
					},
					() => {
						this.form.ultmamo = this.form.ultmamo.toUpperCase() || 'S';
						let ultmamo = this.form.ultmamo;
						if (ultmamo == 'S' || ultmamo == 'N') {
							this._envioImpresion();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.validar_ultmamo();
						}
					}
				);
			} else {
				this._envioImpresion();
			}
		},

		_envioImpresion() {
			CON851P(
        "00",
        () => {
          this.validar_grupo();
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
					data["tipo_w"] = this.form.tipo_fact;
					data["prefijo_w"] = this.form.prefijo;
					data["numero_w"] = this.form.numero_fact;
					data["paci_w"] = this.form.discri_paciente;
					data["ciudad_w"] = this.form.discri_ciudad;
					data["fact_w"] = this.form.discri_factura;
					data["espe_w"] = this.form.discri_espec;
					data["fecha_inicial"] = this.form.fechaInicial.toString();
					data["fecha_final"] = this.form.fechaFinal.toString();
					data["grupo_w"] = this.form.grupo;
					data["art_w"] = this.form.articulo;
					data["codi_w"] = this.form.discri_codigo;
					data["repet_w"] = this.form.primera_vez;
					data["mayor_w"] = this.form.mayor15;
					data["embar_w"] = this.form.embarazadas;
					data["trimes_w"] = this.form.trimestre;
					data["entidad_w"] = this.form.nit;
					data["espec_w"] = this.form.especialidad;
					data["valor_w"] = this.form.valor;
					data["contrato_w"] = this.form.contrato;
					data["costo_w"] = this.form.costos;
					data["ultmamo_w"] = this.form.ultmamo;

          postData(data, get_url("app/SALUD/INV544M.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
							if (this.form.discri_factura == 'S'){
								this._montarImpresion1_INV544M(data);
							}else {
              	this._montarImpresion2_INV544M(data);
							}
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validar_grupo();
            });
        }
      );
		},

		_montarImpresion1_INV544M(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        data.LISTADO[i]['DESCRIP'] = data.LISTADO[i]['DESCRIP'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_grupo();
      } else {
        var columnas = [
          {
            title: "ARTICULO",
            value: "ARTICULO",
            format: "string",
          },
          {
            title: "DESCRIPCION",
            value: "DESCRIP",
						format: "string",
          },
          {
            title: "CANTIDAD", 
            value: "CANTIDAD",
          },
          {
            title: "VALOR VENTA",
            value: "VALOR_VENTA",
          },
          {
            title: "0 A 30 DIAS", 
            value: "0_A_30_DIAS",
          },
          {
            title: "1 A 12 MESES",
            value: "1_A_12_MESES",
          },
          {
            title: "1 A 4 AÑOS", 
            value: "1_A_4_ANOS",
          },
          {
            title: "5 A 14 AÑOS",
            value: "5_A_14_ANOS",
          },
          {
            title: "15 A 44 AÑOS", 
            value: "15_A_44_ANOS",
          },
          {
            title: "45 A 59 AÑOS", 
            value: "45_A_59_ANOS",
          },
          {
            title: "60 O MAS", 
            value: "60_O_MAS",
          },
          {
            title: "PACIENTE", 
            value: "PACIENTE",
          },
          {
            title: "COMPROBANTE", 
            value: "FACTURA",
          },
          {
            title: "FECHA COMPROBANTE", 
            value: "FECHA",
          },
					{
            title: "EDAD", 
            value: "EDAD",
          },
					{
            title: "CIUDAD", 
            value: "CIUDAD",
          },
					{
            title: "ESPECIALIDAD", 
            value: "ESPEC",
          },
					{
            title: "COSTO", 
            value: "C_COST",
          },
					{
            title: "EMBARAZO", 
            value: "EMBARAZO",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE ATENCION EN SALUD: ${nit}`,
          `RESUMEN TIPO: ${this.descrip_tipo_fact}    -    
					DESDE: ${this.form.ano_ini}/${this.form.mes_ini}/${this.form.dia_ini} -
					 HASTA: ${this.form.ano_fin}/${this.form.mes_fin}/${this.form.dia_fin} 
					- ${this.form.descrip_espec}`,
					`PREFIJO: ${this.form.prefijo}   -   ENTIDAD: ${this.form.descrip_nit}`,
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

		_montarImpresion2_INV544M(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        data.LISTADO[i]['DESCRIP'] = data.LISTADO[i]['DESCRIP'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_grupo();
      } else {
        var columnas = [
          {
            title: "ARTICULO",
            value: "ARTICULO",
            format: "string",
          },
          {
            title: "DESCRIPCION",
            value: "DESCRIP",
						format: "string",
          },
          {
            title: "CANTIDAD", 
            value: "CANTIDAD",
          },
          {
            title: "VALOR VENTA",
            value: "VALOR_VENTA",
          },
          {
            title: "0 A 30 DIAS", 
            value: "0_A_30_DIAS",
          },
          {
            title: "1 A 12 MESES",
            value: "1_A_12_MESES",
          },
          {
            title: "1 A 4 AÑOS", 
            value: "1_A_4_ANOS",
          },
          {
            title: "5 A 14 AÑOS",
            value: "5_A_14_ANOS",
          },
          {
            title: "15 A 44 AÑOS", 
            value: "15_A_44_ANOS",
          },
          {
            title: "45 A 59 AÑOS", 
            value: "45_A_59_ANOS",
          },
          {
            title: "60 O MAS", 
            value: "60_O_MAS",
          },
					{
            title: "EDAD", 
            value: "EDAD",
          },
					{
            title: "CIUDAD", 
            value: "CIUDAD",
          },
					{
            title: "COSTO", 
            value: "C_COST",
          },
					{
            title: "EMBARAZO", 
            value: "EMBARAZO",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE ATENCION EN SALUD: ${nit}`,
          `RESUMEN TIPO: ${this.descrip_tipo_fact}    -    
					DESDE: ${this.form.ano_ini}/${this.form.mes_ini}/${this.form.dia_ini} -
					 HASTA: ${this.form.ano_fin}/${this.form.mes_fin}/${this.form.dia_fin} 
					- ${this.form.descrip_espec}`,
					`PREFIJO: ${this.form.prefijo}   -   ENTIDAD: ${this.form.descrip_nit}`,
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

		_validarVentanaGrupos() {
			if (this.form.tipo_fact == '0') {
				this._ventanaGrupos();
			} else {
				this._ventanaGruposServ();
			}
		},

		_ventanaGrupos() {
			_ventanaDatos({
				titulo: 'VENTANA DE GRUPOS',
				columnas: ['TIPO', 'GRUPO', 'DESCRIP'],
				data: this._grupos,
				callback_esc: () => {
					document.querySelector('.grupo').focus();
				},
				callback: (data) => {
					this.form.grupo = data.GRUPO;
					this.$refs.descrip_grupo.value = data.DESCRIP;
					setTimeout(() => {
						_enterInput(".grupo");
					}, 100);
				}
			});
		},

		_ventanaGruposServ() {
			_ventanaDatos({
				titulo: 'VENTANA DE GRUPOS DE SERVICIOS',
				columnas: ['COD', 'DESCRIP'],
				data: this._grser,
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

		_validarVentanaArt() {
			if (this.form.tipo_fact == '0') {
				this._ventanaArt();
			} else {
				this._ventanaCodCups();
			}
		},

		_ventanaArt() {
			_ventanaDatos({
				titulo: 'VENTANA DE ARTICULOS',
				columnas: ['LLAVE_ART', 'TIPO_ART', 'GRUPO_ART', 'DESCRIP_ART'],
				data: this._articulos,
				callback_esc: () => {
					document.querySelector('.articulo').focus();
				},
				callback: (data) => {
					this.form.articulo = data.LLAVE_ART;
					this.$refs.descrip_art.value = data.DESCRIP_ART;
					setTimeout(() => {
						_enterInput(".articulo");
					}, 100);
				}
			});
		},

		_ventanaCodCups() {
			_ventanaDatos({
				titulo: 'VENTANA DE CODIGOS CUPS',
				columnas: ['LLAVE', 'DESCRIP'],
				data: this._cups,
				callback_esc: () => {
					document.querySelector('.articulo').focus();
				},
				callback: (data) => {
					this.form.articulo = data.LLAVE;
					this.$refs.descrip_art.value = data.DESCRIP;
					setTimeout(() => {
						_enterInput(".articulo");
					}, 100);
				}
			});
		},

		_ventanaNit() {
      _ventanaDatos({
        titulo: 'VENTANA TERCEROS',
        columnas: ['COD', 'NOMBRE'],
        data: this._terceros,
        callback_esc: () => {
          document.querySelector('.nit').focus()
        },
        callback: (data) => {
          this.form.nit = data.COD;
          setTimeout(() => { _enterInput('.nit') }, 100);
        }
      })
		},

		_ventanaEspec() {
      _ventanaDatos({
        titulo: 'VENTANA DE ESPECIALIDADES',
        columnas: ['CODIGO', 'NOMBRE'],
        data: this._especialidades,
        callback_esc: () => {
          document.querySelector('.especialidad').focus()
        },
        callback: (data) => {
          this.form.especialidad = data.CODIGO;
          setTimeout(() => { _enterInput('.especialidad') }, 100);
        }
      })
		},

		_ventanaCostos() {
      _ventanaDatos({
        titulo: 'VENTANA DE CENTROS DE COSTO',
        columnas: ['COD', 'NOMBRE'],
        data: this._costos,
        callback_esc: () => {
          document.querySelector('.costos').focus()
        },
        callback: (data) => {
          this.form.costos = data.COD;
          setTimeout(() => { _enterInput('.costos') }, 100);
        }
      })
		},

		cargarGrupos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/INVENT/INV804.DLL'))
				.then((data) => {
					this._grupos = data.GRUPOS;
					this.cargarGrpSer();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarGrpSer() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER801.DLL'))
				.then((data) => {
					this._grser = data.CODIGOS;
					this.cargarArticulos();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarArticulos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/INVENT/INV803.DLL'))
				.then((data) => {
					this._articulos = data.ARTICULOS;
					this._articulos.pop();
					this.cargarCups();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarCups() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER802C.DLL'))
				.then((data) => {
					this._cups = data.CODIGOS;
					this.cargarEntidades();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarEntidades() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/CONTAB/CON802.DLL'))
				.then((data) => {
					this._terceros = data.TERCEROS;
					this.cargarEspecialidades();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarEspecialidades() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER855.DLL'))
				.then((data) => {
					this._especialidades = data.ESPECIALIDADES;
					this.cargarCostos();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarCostos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/CONTAB/CON803.DLL'))
				.then((data) => {
					this._costos = data.COSTO;
					this._costos.pop();
					this.cargarContr();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarContr() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER872.DLL'))
				.then((data) => {
					this._contratos = data.CONTRATOS;
					this._contratos.pop();
					loader('hide');
					this.validar_factura();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		}
	}
});
