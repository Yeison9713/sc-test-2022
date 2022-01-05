//INFORME DE ATENCION X EDADES  - CARLOS R. - 12-12-2021

new Vue({
	el: '#INV541C',
	components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
		con802: require("../../CONTAB/scripts/CON802S.vue.js"),
		ser819: require("../../SALUD/scripts/SER819.vue.js"),
	},
	data: {
		form: {
			tipo_fact: '',
			tipo_pago: '',
			puerta_ingreso: '',
			medico: '',
			descrip_medico: '',
			paciente: '',
			descrip_paciente: '',
			entidad: '',
			descrip_entidad: '',
			grupo: '',
			descrip_grupo: '',
			sucursal: '',
			descrip_sucursal: '',
			fechaInicial: '',
			fechaFinal: '',
			ano_ini: '',
			mes_ini: '',
			dia_ini: '',
			ano_fin: '',
			mes_fin: '',
			dia_fin: '',
		},

		ventanaTerceros: false,
		ventanaProfesionales: false,
		paramsEspec: [],
    paramsAtiende: [],

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

		arr_tipo_pago: [
			{ COD: 'E', DESCRIP: 'EFECTIVO' },
			{ COD: 'C', DESCRIP: 'CREDITO' },
			{ COD: 'P', DESCRIP: 'PENSIONADO' },
			{ COD: 'A', DESCRIP: 'AMBULATORIO ' },
			{ COD: 'T', DESCRIP: 'ACC. TRANSITO' },
		],

		arr_puerta_ingreso: [
			{ COD: '1', DESCRIP: 'URGENCIAS' },
			{ COD: '2', DESCRIP: 'C. EXTERNA' },
			{ COD: '3', DESCRIP: 'TODAS' },
		],

		_terceros: [],
		_grupos: [],
		_sucursales: [],

		estado_loader: false,
		progreso: {},
		label_loader: null,
		loader: 1,

		fecha_act: moment().format('YYYYMMDD')
	},
	async created() {
		//  _vm = this;
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-5-4-2-1-1-C - Relac. ccirugias x componente');
		loader('show');
		this.cargarGrupos();
	},
	computed: {
		descrip_tipo_fact() {
			let tipo = this.arr_tipo_fact.find((el) => el.COD == this.form.tipo_fact);
			return tipo ? tipo.DESCRIP : '';
		},
		descrip_tipo_pago() {
			let tipo = this.arr_tipo_pago.find((el) => el.COD == this.form.tipo_pago);
			return tipo ? tipo.DESCRIP : '';
		},
		descrip_puerta_ingreso() {
			let tipo = this.arr_puerta_ingreso.find((el) => el.COD == this.form.puerta_ingreso);
			return tipo ? tipo.DESCRIP : '';
		},
	},
	methods: {
		validar_factura() {
			setTimeout(() => {
				POPUP(
					{
						array: this.arr_tipo_fact,
						titulo: 'Tipo de servicio',
						indices: [{ id: 'COD', label: 'DESCRIP' }],
						seleccion: '1',
						teclaAlterna: true,
						// id_input: '#dato_tipo_fact',
						callback_f: () => {
							_toggleNav();
						}
					},
					(data) => {
						this.form.tipo_fact = data.COD;
						setTimeout(() => {
							this.validar_pago();
						}, 100);
					}
				);
			}, 300);
		},

		validar_pago() {
			setTimeout(() => {
				POPUP(
					{
						array: this.arr_tipo_pago,
						titulo: 'Forma de pago',
						indices: [{ id: 'COD', label: 'DESCRIP' }],
						seleccion: 'A',
						teclaAlterna: true,
						// id_input: '#dato_pago',
						callback_f: () => {
							this.validar_factura();
						}
					},
					(data) => {
						this.form.tipo_pago = data.COD;
						setTimeout(() => {
							this.validar_puerta_ingreso();
						}, 100);
					}
				);
			}, 300);
		},

		validar_puerta_ingreso() {
			setTimeout(() => {
				POPUP(
					{
						array: this.arr_puerta_ingreso,
						titulo: 'Puerta de ingreso',
						indices: [{ id: 'COD', label: 'DESCRIP' }],
						seleccion: '3',
						teclaAlterna: true,
						// id_input: '#dato_puerta',
						callback_f: () => {
							this.validar_pago();
						}
					},
					(data) => {
						this.form.puerta_ingreso = data.COD;
						setTimeout(() => {
							this.validar_medico();
						}, 100);
					}
				);
			}, 300);		
		},


		validar_medico() {
			validarInputs(
				{
					form: '#dato_medico',
					orden: '1'
				},
				() => {
					this.validar_puerta_ingreso();
				},
				async () => {
					this.form.medico = this.form.medico || '99';
					let medico = this.form.medico;

					if (medico == '99') {
						this.$refs.descrip_medico.value = 'Procesa todos los medicos';
						this.validar_Paciente();
					} else {
						let busq = await this.buscarMedico()

						if (busq) {
							this.$refs.descrip_medico.value = busq.NOMBRE;
							this.validar_Paciente();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_medico();
						}
					}
				}
			);
		},

		buscarMedico() {
      loader("show");
      return new Promise(async (resolve, reject) => {
        let envio = {
          datosh: datosEnvio(),
          codigo: this.form.medico.padStart(10, "0"),
          paso: '1'
        };
        await postData(envio, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            if (data.NOMBRE.trim() == "Personal no atiende")resolve(false);
            else resolve(data);
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            resolve(false);
          });
      });
    },

		validar_Paciente() {
			validarInputs(
				{
					form: "#dato_paciente",
					orden: "1"
				}, () => {
					this.validar_medico();
				},
				() => {
					this.form.paciente = this.form.paciente || '*';
					let paciente = this.form.paciente;

					if (paciente == '*') {
						this.$refs.descrip_paciente.value = 'Todas los pacientes';
						this.validar_entidad();
					} else {
						postData({ datosh: datosEnvio() + this.form.paciente.padStart(15, "0") }, get_url("APP/SALUD/SER810-1.DLL"))
							.then((data) => {
								this.form.paciente = data["REG-PACI"][0].COD;
								this.$refs.descrip_paciente.value = data["REG-PACI"][0].DESCRIP;
								// continue
								this.validar_entidad();
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

		validar_entidad() {
			validarInputs(
				{
					form: '#dato_entidad',
					orden: '1'
				},
				() => {
					this.validar_Paciente();
				},
				async () => {
					this.form.entidad = this.form.entidad || '99';
					let entidad = this.form.entidad;

					if (entidad == '99') {
						this.$refs.descrip_entidad.value = 'Todas las entidades';
						this.validar_grupo();
					} else {
						let busq = await this.consultaTercero()
						console.log(busq)
						if (busq) {
							this.$refs.descrip_entidad.value = busq.NOMBRE;
							this.validar_grupo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_entidad();
						}
					}
				}
			);
		},

		consultaTercero() {
			loader("show");
			return new Promise(async (resolve, reject) => {
				let envio = {
					datosh: datosEnvio(),
					tercero: this.form.entidad.padStart(10, "0"),
				};
				await postData(envio, get_url("APP/CONTAB/CON802.DLL"))
					.then((data) => {
						loader("hide");
						resolve(data);
					})
					.catch((error) => {
						console.error(error);
						loader("hide");
						resolve(false);
					});
			});
		},

		validar_grupo() {
			validarInputs(
				{
					form: '#dato_grupo',
					orden: '1'
				},
				() => {
					this.validar_entidad();
				},
				() => {
					this.form.grupo = this.form.grupo || '**';
					let grupo = this.form.grupo;
					if (grupo == '**') {
						this.$refs.descrip_grupo.value = 'Todos los grupos';
						this.validar_Sucursal();
					} else {
						let busq = this._grupos.find((a) => a.COD == grupo);
						if (busq != undefined) {
							this.$refs.descrip_grupo.value = busq.DESCRIP;
							this.validar_Sucursal();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupo();
						}
					}
				}
			);
		},

		validar_Sucursal() {
			validarInputs({
				form: '#dato_sucursal',
				orden: "1",
			}, () => {
				this.validar_grupo();
			}, () => {
				this.form.sucursal = this.form.sucursal || "**";
				let sucursal = this.form.sucursal;

				if (sucursal == '**') {
					this.$refs.descrip_sucursal.value = 'Todas las sucursales.';
					this.llenarDatosFecha();
				} else {
					let busq = this._sucursales.find(a => a.CODIGO == sucursal);
					if (busq != undefined) {
						this.$refs.descrip_sucursal.value = busq.DESCRIPCION;
						this.llenarDatosFecha();
					} else {
						CON851('01', '01', null, 'error', 'error')
						this.validar_Sucursal();
					}
				}
			})
		},

		llenarDatosFecha() {
			this.form.ano_ini = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
			this.form.mes_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
			this.form.dia_ini = 1;

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
					this.validar_Sucursal();
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
						this._envioImpresion();
					}
				}
			);
		},

		_envioImpresion() {
			CON851P(
				"00",
				() => {
					this.llenarDatosFecha();
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
					data["pago_w"] = this.form.tipo_pago;
					data["puerta_w"] = this.form.puerta_ingreso;
					data["medico_w"] = this.form.medico;
					data["paciente_w"] = this.form.paciente;
					data["entidad_w"] = this.form.entidad;
					data["grupo_w"] = this.form.grupo;
					data["suc_w"] = this.form.sucursal;
					data["fecha_inicial"] = this.form.fechaInicial.toString();
					data["fecha_final"] = this.form.fechaFinal.toString();


					postData(data, get_url("app/SALUD/INV541C.DLL"), {
						onProgress: (progress) => {
							this.progreso = progress;
						},
					})
						.then((data) => {
							this.loader = false;
							this.label_loader = `GENERANDO IMPRESIÓN...`;
							this.progreso.completado = true;
							this._montarImpresion_INV541C(data);
						})
						.catch((err) => {
							console.error(err);
							CON851("", "Error consultando datos", null, "error", "Error");
							this.loader = false;
							this.estado_loader = false;
							this.llenarDatosFecha();
						});
				}
			);
		},

		_montarImpresion_INV541C(data) {
			data.ENCABEZADO = [];

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			for (i in data.LISTADO) {
				data.LISTADO[i].descripcion = data.LISTADO[i].descripcion.replace(/\�/g, "Ñ")
				// data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
			}

			if (data.LISTADO.length < 1) {
				CON851('08', '08', null, 'error', 'error');
				this.estado_loader = false;
				this.llenarDatosFecha();
			} else {
				var columnas = [
					{
						title: "tipo",
						value: "tipo",
					},
					{
						title: "comprob",
						value: "comprob",
					},
					{
						title: "factura",
						value: "factura",
					},
					{
						title: "fecha",
						value: "fecha",
					},
					{
						title: "paciente",
						value: "paciente",
					},
					{
						title: "entidad",
						value: "entidad",
					},
					{
						title: "cups",
						value: "cups",
					},
					{
						title: "descripcion",
						value: "descripcion",
					},
					{
						title: "CANTIDAD",
						value: "cantidad",
					},
					{
						title: "valor_global",
						value: "valor_global",
					},
					{
						title: "vlr_hon_quirur",
						value: "vlr_hon_quirur",
					},
					{
						title: "vlr_ayudantia",
						value: "vlr_ayudantia",
					},
					{
						title: "vlr__hon_aneste",
						value: "vlr__hon_aneste",
					},
					{
						title: "vlr_mat_quirurg",
						value: "vlr_mat_quirurg",
					},
					{
						title: "vlr_derechos_sala",
						value: "vlr_derechos_sala",
					},
					{
						title: "total_cirugia",
						value: "total_cirugia",
					},
					{
						title: "especialidad",
						value: "especialidad",
					},
					{
						title: "medico",
						value: "medico",
					},
					{
						title: "uni_servicios",
						value: "uni_servicios",
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

		// VENTANAS F8

		_ventanaMedico() {
			// _ventanaDatos({
			// 	titulo: 'VENTANA TERCEROS',
			// 	columnas: ['COD', 'NOMBRE'],
			// 	data: this._terceros,
			// 	callback_esc: () => {
			// 		document.querySelector('.medico').focus()
			// 	},
			// 	callback: (data) => {
			// 		this.form.medico = data.COD;
			// 		setTimeout(() => { _enterInput('.medico') }, 100);
			// 	}
			// })
			_fin_validar_form();
			this.ventanaProfesionales = true
		},

		escVentanaTerce() {
			this.ventanaTerceros = false
			this.validar_entidad()
		},

		successVentanaTerce(data) {
			this.ventanaTerceros = false
			this.form.entidad = data.cod
			this.validar_entidad()
			setTimeout(() => { _enterInput('.entidad') }, 100);
		},

		escVentanaProfe() {
			this.ventanaProfesionales = false
			this.validar_medico()
		},

		successVentanaProfe(data) {
			this.ventanaProfesionales = false
			this.form.medico = data.identificacion
			this.validar_medico()
			setTimeout(() => { _enterInput('.medico') }, 100);
		},


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

		_ventanaEntidad() {
			_fin_validar_form();
			this.ventanaTerceros = true
		},

		_VentanaGrupos() {
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

		_ventanaSucursal() {
			_ventanaDatos({
				titulo: 'VENTANA DE SUCURSALES',
				columnas: ['CODIGO', 'DESCRIPCION'],
				data: this._sucursales,
				callback_esc: () => {
					document.querySelector('.sucursal').focus()
				},
				callback: (data) => {
					this.form.sucursal = data.CODIGO;
					setTimeout(() => { _enterInput('.sucursal') }, 100);
				}
			})
		},

		// CARGAR DLLS


		cargarGrupos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER801.DLL'))
				.then((data) => {
					this._grupos = data.CODIGOS;
					// loader('hide');
					this.cargarSucursal();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarSucursal() {
			postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON823.DLL"))
				.then((data) => {
					this._sucursales = data.SUCURSAL;
					loader('hide')
					this.validar_factura()
				})
				.catch((err) => {
					console.log(err, 'err')
					loader('hide')
					_toggleNav();
				});
		},

	}
});
