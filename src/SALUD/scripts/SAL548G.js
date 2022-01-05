//  22/03/2021 - DIANA ESCOBAR: CREADO 

const { Console } = require("console");

new Vue({
	el: "#SAL548G",
	components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
	},
	data: {
		estado_loader: false,
		progreso: {},
		label_loader: null,
		loader: 1,
		tipo_impresion: null,
		SAL548G: [],
		form: {
			facturacionpor_SAL548G: '',
			medicoejecutar_SAL548G: '',
			tipofact_SAL548G: '',
			descriptipofact_SAL548G: '',
			formapago_SAL548G: '',
			descripformapago_SAL548G: '',
			discrifact_SAL548G: '',
			mostraresp_SAL548G: '',
			medicos_SAL548G: '',
			decripmedicos_SAL548G: '',
			prefijo_SAL548G: '',
			facturacion_SAL548G: '',
			descripfact_SAL548G: '',
			entidades_SAL548G: '',
			descripentidades_SAL548G: '',
			anolistarini_SAL548G: '',
			meslistarini_SAL548G: '',
			dialistarini_SAL548G: '',
			anolistarfin_SAL548G: '',
			meslistarfin_SAL548G: '',
			dialistarfin_SAL548G: '',
			grupo_SAL548G: '',
			descripgrupo_SAL548G: '',
			articulo_SAL548G: '',
			discricod_SAL548G: '',
			costos_SAL548G: '',
			descripcosto_SAL548G: '',
			especialidad_SAL548G: '',
			descripespec_SAL548G: '',
			finalidadcons_SAL548G: '',
			unidadserv_SAL548G: '',
			descripunidad_SAL548G: '',
		},
	},
	created() {
		_toggleNav();
		_inputControl("disabled");
		loader("show");
		nombreOpcion("9,5,4,1,3,1 - Informe de productividad por medico");
		if ($_USUA_GLOBAL[0].FECHALNK.substring(0, 2) < 20) {
			this.SAL548G.ANONUM = 90 + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2)
		} else {
			this.SAL548G.ANONUM = 20 + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2)
		}
		this.SAL548G.FECHANUM = this.SAL548G.ANONUM + $_USUA_GLOBAL[0].FECHALNK.substring(2, 4) + $_USUA_GLOBAL[0].FECHALNK.substring(4, 6)
		$_this = this;
		obtenerDatosCompletos(
			{
				nombreFd: 'SERVICIOS',
			},
			function (data) {
				$_this.SAL548G.SERVICIOS = data.SERVICIOS
				obtenerDatosCompletos(
					{
						nombreFd: 'FORMAPAGO',
					},
					function (data) {
						$_this.SAL548G.FORMAPAGO = data.FORMAPAGO
						obtenerDatosCompletos(
							{
								nombreFd: "PROFESIONALES",
							},
							function (data) {
								$_this.SAL548G.PROFESIONAL = data.ARCHPROF;
								$_this.SAL548G.PROFESIONAL.pop();
								obtenerDatosCompletos(
									{
										nombreFd: "ENTIDADES",
									},
									function (data) {
										$_this.SAL548G.ENTIDAD = data.ENTIDADES;
										$_this.SAL548G.ENTIDAD.pop();
										loader("hide");
										$_this._evaluarfacturacion_SAL548G();
										obtenerDatosCompletos(
											{
												nombreFd: "GRUPO-SER",
											},
											function (data) {
												$_this.SAL548G.GRUPOSER = data.CODIGOS;
												$_this.SAL548G.GRUPOSER.pop();
												obtenerDatosCompletos(
													{
														nombreFd: "GRUPOS",
													},
													function (data) {
														$_this.SAL548G.GRUPOS = data.GRUPOS;
														$_this.SAL548G.GRUPOS.pop();
														$_this.SAL548G.GRUPOS = $_this.SAL548G.GRUPOS.filter(e => e.TIPO.trim() == 0);
														obtenerDatosCompletos(
															{
																nombreFd: "COSTOS",
															},
															function (data) {
																$_this.SAL548G.COSTOS = data.COSTO;
																$_this.SAL548G.COSTOS.pop();

																obtenerDatosCompletos(
																	{
																		nombreFd: "ESPECIALIDAD",
																	},
																	function (data) {
																		$_this.SAL548G.ESPECIALIDAD = data.ESPECIALIDADES;
																		$_this.SAL548G.ESPECIALIDAD.pop();
																		obtenerDatosCompletos(
																			{
																				nombreFd: "ARTICULOS",
																			},
																			function (data) {
																				$_this.SAL548G.ARTICULOS = data.ARTICULOS;
																				$_this.SAL548G.ARTICULOS.pop();
																				$_this.SAL548G.ARTICULOS = $_this.SAL548G.ARTICULOS.filter(e => e.TIPO_ART == 0);
																				obtenerDatosCompletos(
																					{
																						nombreFd: 'CUPS'
																					}, function (data) {
																						$_this.SAL548G.CUPS = data.CODIGOS;
																						$_this.SAL548G.CUPS.pop()

																						obtenerDatosCompletos(
																							{
																								nombreFd: "UNSERV",
																							},
																							function (data) {
																								$_this.SAL548G.UNIDADSERV = data.UNSERV;
																								$_this.SAL548G.UNIDADSERV.pop();
																							},
																						);
																					},
																				);
																			},
																		);
																	},
																);
															},
														);
													},
												);
											},
										);
									},
								);
							},
						);
					},
				);
			},
		);
	},
	methods: {
		_evaluarfacturacion_SAL548G() {
			var SWARCH = [
				{ COD: "1", DESCRIP: "Segun facturacion" },
				{ COD: "2", DESCRIP: "Segun solicitud servicios" },
			];
			POPUP(
				{
					array: SWARCH,
					titulo: "FACTURACION POR",
					indices: [
						{
							id: "COD",
							label: "DESCRIP",
						},
					],
					callback_f: () => { _toggleNav(); },
				},
				SWARCH => {
					this.form.facturacionpor_SAL548G = SWARCH.COD + " - " + SWARCH.DESCRIP;
					setTimeout(this._evaluartipomed_SAL548G, 300);
				},
			);
		},
		_evaluartipomed_SAL548G() {
			var SWMED = [
				{ COD: "1", DESCRIP: "Medico ejecutor " },
				{ COD: "2", DESCRIP: "Medico remitente" }
			];
			POPUP(
				{
					array: SWMED,
					titulo: "TIPO MEDICO",
					indices: [
						{
							id: "COD",
							label: "DESCRIP",
						},
					],
					callback_f: () => {
						setTimeout(this._evaluarfacturacion_SAL548G, 300)
					},
				},
				SWMED => {
					this.form.medicoejecutar_SAL548G = SWMED.COD + " - " + SWMED.DESCRIP;
					this._evaluartipofact_SAL548G();
				},
			);
		},
		_evaluartipofact_SAL548G() {
			if (this.form.tipofact_SAL548G.trim() == '') {
				this.form.tipofact_SAL548G = '*'
			}
			validarInputs(
				{
					form: "#validartipofact_548",
					orden: '1'
				},
				() => { setTimeout(this._evaluartipomed_SAL548G, 300) },
				() => {
					if(this.form.tipofact_SAL548G == '*'){
						this.form.descriptipofact_SAL548G = 'TODOS LOS TIPOS'
						this._evaluarformapago_SAL548G();
					}else{
						const res = this.SAL548G.SERVICIOS.find(e => e.COD == this.form.tipofact_SAL548G);
						if (res == undefined) {
							CON851('03', '03', null, 'error', 'error');
							this._evaluartipofact_SAL548G();
						} else {
							this.form.descriptipofact_SAL548G = res.DESCRIPCION
							this._evaluarformapago_SAL548G();
						}
	
					}
				}
			)
		},
		_evaluarformapago_SAL548G() {
			if (this.form.formapago_SAL548G.trim() == '') {
				this.form.formapago_SAL548G = '*'
			}
			validarInputs(
				{
					form: "#validarformapago_548",
					orden: '1'
				}, this._evaluartipofact_SAL548G,
				() => {
					var formapago = this.form.formapago_SAL548G;
					if (formapago == '*') {
						this.form.descripformapago_SAL548G = 'PROCESO TOTAL'
						this._evaluardiscriminarfact_SAL548G();
					} else {
						const res = this.SAL548G.FORMAPAGO.find(e => e.COD == formapago);
						if (res == undefined) {
							CON851('03', '03', this._evaluarformapago_SAL548G(), 'error', 'error');
						} else {
							this.form.descripformapago_SAL548G = res.DESCRIP
							this._evaluardiscriminarfact_SAL548G();
						}
					}
				}
			)
		},
		_evaluardiscriminarfact_SAL548G() {
			if (this.form.discrifact_SAL548G.trim() == '') {
				this.form.discrifact_SAL548G = 'N'
			}
			validarInputs(
				{
					form: "#validardiscrifact_548",
					orden: '1'
				}, this._evaluarformapago_SAL548G,
				() => {
					this.form.discrifact_SAL548G = this.form.discrifact_SAL548G.toUpperCase();
					if (this.form.discrifact_SAL548G == 'S' || this.form.discrifact_SAL548G == 'N') {
						this._evaluarmostrarespec_SAL548G()
					} else {
						CON851('03', '03', this._evaluardiscriminarfact_SAL548G(), 'error', 'error');
					}
				}
			)
		},
		_evaluarmostrarespec_SAL548G() {
			if (this.form.mostraresp_SAL548G.trim() == '') {
				this.form.mostraresp_SAL548G = 'N'
			}
			validarInputs(
				{
					form: "#validarmostraresp_548",
					orden: '1'
				}, this._evaluarformapago_SAL548G,
				() => {
					this.form.mostraresp_SAL548G = this.form.mostraresp_SAL548G.toUpperCase();
					if (this.form.mostraresp_SAL548G == 'S' || this.form.mostraresp_SAL548G == 'N') {
						this._evaluarmedico_SAL548G()
					} else {
						CON851('03', '03', this._evaluarmostrarespec_SAL548G(), 'error', 'error');
					}
				}
			)
		},
		_evaluarmedico_SAL548G() {
			if (this.form.medicos_SAL548G.trim() == '') {
				this.form.medicos_SAL548G = '99'
			}
			validarInputs(
				{
					form: "#validarmedicos_548",
					orden: '1'
				}, this._evaluarmostrarespec_SAL548G,
				() => {
					if (this.form.medicos_SAL548G == '99') {
						this.form.decripmedicos_SAL548G = 'TODOS LOS MEDICOS'
						this._evaluarprefijo_SAL548G();
					} else {
						const res = this.SAL548G.PROFESIONAL.find(e => e.IDENTIFICACION == this.form.medicos_SAL548G);
						if (res == undefined) {
							CON851('01', '01', this._evaluarmedico_SAL548G(), 'error', 'error');
						} else {
							this.form.decripmedicos_SAL548G = res.NOMBRE;
							this._evaluarprefijo_SAL548G();
						}
					}
				}
			)
		},
		_evaluarprefijo_SAL548G() {
			if (this.form.prefijo_SAL548G.trim() == '') {
				this.form.prefijo_SAL548G = '*'
			}
			validarInputs(
				{
					form: "#validarprefijo_548",
					orden: '1'
				}, this._evaluarmedico_SAL548G,
				() => {
					if (this.form.prefijo_SAL548G == '*') {
						this.form.facturacion_SAL548G = '000000'
						this.form.descripfact_SAL548G = 'TODAS LAS FACTURAS'
						this._valicacionfecha_SAL548G()
					} else {
						if (this.form.prefijo_SAL548G == 'A' || this.form.prefijo_SAL548G == 'P' || this.form.prefijo_SAL548G == 'T' || this.form.prefijo_SAL548G == 'R' ||
							this.form.prefijo_SAL548G == 'Q' || this.form.prefijo_SAL548G == 'V' || this.form.prefijo_SAL548G == 'B' || this.form.prefijo_SAL548G == 'S') {
							validarInputs(
								{
									form: "#validarfactura_548",
									orden: '1'
								},
								() => { this._evaluarprefijo_SAL548G },
								() => {
									this.form.facturacion_SAL548G = this.form.facturacion_SAL548G.padStart(6, '0')
									let URL = get_url("APP/SALUD/SER808-01.DLL");
									postData({ datosh: datosEnvio() + this.form.prefijo_SAL548G + this.form.facturacion_SAL548G + '|' }, URL)
										.then(data => {
											this.form.descripfact_SAL548G = data.NUMER19[0].DESCRIP_NUM
											this.SAL548G.FECHAINGNUM = data.NUMER19[0].FECHA_ING
											this._valicacionfecha_SAL548G()
										})
										.catch(err => {
											console.debug(err);
											this._evaluarprefijo_SAL548G()
										})
								}
							)
						} else {
							CON851('03', '03', this._evaluarprefijo_SAL548G(), 'error', 'error');
						}
					}
				}
			)

		},
		_valicacionfecha_SAL548G() {
			if (this.form.meslistarini_SAL548G.trim() == '') {
				if (this.form.prefijo_SAL548G == '*') {
					this.form.anolistarini_SAL548G = 20 + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2)
					this.form.meslistarini_SAL548G = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4)
					this.form.dialistarini_SAL548G = '01'
				} else {
					this.form.anolistarini_SAL548G = this.SAL548G.FECHAINGNUM.substring(0, 4)
					this.form.meslistarini_SAL548G = this.SAL548G.FECHAINGNUM.substring(4, 6)
					this.form.dialistarini_SAL548G = this.SAL548G.FECHAINGNUM.substring(6, 8)
				}
				this._evaluarentidad_SAL548G()
			} else {
				this._evaluarentidad_SAL548G()
			}
		},
		_evaluarentidad_SAL548G() {
			if (this.form.prefijo_SAL548G == '*') {
				if (this.form.entidades_SAL548G.trim() == '') this.form.entidades_SAL548G = '99'
				validarInputs(
					{
						form: "#validarentidad_548",
						orden: '1'
					}, this._evaluarprefijo_SAL548G,
					() => {
						if (this.form.entidades_SAL548G == '99') {
							this.form.descripentidades_SAL548G = 'TODAS LAS ENTIDADES'
							this._evaluarfechaini_SAL548G('1')
						} else {
							const res = this.SAL548G.ENTIDAD.find(e => e["COD-ENT"] == this.form.entidades_SAL548G);
							if (res == undefined) {
								CON851('01', '01', this._evaluarentidad_SAL548G(), 'error', 'error');
							} else {
								this.form.descripentidades_SAL548G = res['NOMBRE-ENT'];
								this._evaluarfechaini_SAL548G('1')
							}
						}
					}
				)
			} else {
				this.form.entidades_SAL548G = '99'
				this.form.descripentidades_SAL548G = 'TODAS LAS ENTIDADES'
				this._evaluarfechaini_SAL548G('1')
			}
		},
		_evaluarfechaini_SAL548G(orden) {
			validarInputs(
				{
					form: "#fechalistarInicial_548",
					orden: orden,
				}, this._evaluarentidad_SAL548G,
				() => {
					if (this.form.anolistarini_SAL548G.trim() == "") {
						CON851("", "Año incorrecto! ", this._evaluarfechaini_SAL548G("1"), "error", "error");
					} else {
						var mesinilistar = this.form.meslistarini_SAL548G.padStart(2, "0");
						if (mesinilistar.trim() == "" || mesinilistar < 1 || mesinilistar > 12) {
							CON851("", "Mes incorrecto! ", this._evaluarfechaini_SAL548G("2"), "error", "error");
						} else {
							var diainilistar = this.form.dialistarini_SAL548G.padStart(2, "0");
							if (diainilistar.trim() == "" || diainilistar < 1 || diainilistar > 31) {
								CON851("", "Dia incorrecto! ", this._evaluarfechaini_SAL548G("3"), "error", "error");
							} else {
								this.SAL548G.FECHAINIW = this.form.anolistarini_SAL548G + this.form.meslistarini_SAL548G.padStart(2, "0") + this.form.dialistarini_SAL548G.padStart(2, "0")
								this.SAL548G.FECHAFINW = 00000000
								this._leerfact_sak548();
							}
						}
					}
				},
			)
		},
		_leerfact_sak548() {
			let URL = get_url("APP/SALUD/SAL548G.DLL");
			postData({ datosh: datosEnvio() + '1|' + this.form.facturacionpor_SAL548G.substring(0, 1) + '|||||||||' + this.SAL548G.FECHAINIW + '|' }, URL)
				.then(data => {
					if (this.SAL548G.FECHAFINW < this.SAL548G.FECHAINIW) {
						this.SAL548G.FECHAFINW = this.SAL548G.FECHAINIW;
						this.form.anolistarfin_SAL548G = this.SAL548G.FECHAFINW.substring(0, 4)
						this.form.meslistarfin_SAL548G = this.SAL548G.FECHAFINW.substring(4, 6)
						this.form.dialistarfin_SAL548G = this.SAL548G.FECHAFINW.substring(6, 8)
					}
					this._evaluarfechafin_SAL548G('1')
				})
				.catch(err => {
					console.debug(err);
					this._evaluarfechaini_SAL548G('3')
				})

		},
		_evaluarfechafin_SAL548G(orden) {
			validarInputs(
				{
					form: "#fechalistarFinal_548",
					orden: orden,
				},
				() => { this._evaluarfechaini_SAL548G('3') },
				() => {
					if (this.form.anolistarfin_SAL548G.trim() == "") {
						CON851("", "Año incorrecto! ", this._evaluarfechafin_SAL548G("1"), "error", "error");
					} else {
						var mesfinlistar = this.form.meslistarfin_SAL548G.padStart(2, "0");
						if (mesfinlistar.trim() == "" || mesfinlistar < 1 || mesfinlistar > 12) {
							CON851("", "Mes incorrecto! ", this._evaluarfechafin_SAL548G("2"), "error", "error");
						} else {
							var diafinlistar = this.form.dialistarfin_SAL548G.padStart(2, "0");
							if (diafinlistar.trim() == "" || diafinlistar < 1 || diafinlistar > 31) {
								CON851("", "Dia incorrecto! ", this._evaluarfechafin_SAL548G("3"), "error", "error");
							} else {
								this.SAL548G.FECHAFINW = this.form.anolistarfin_SAL548G + this.form.meslistarfin_SAL548G.padStart(2, "0") + this.form.dialistarfin_SAL548G.padStart(2, "0")
								if (this.SAL548G.FECHAINIW > this.SAL548G.FECHAFINW) {
									this._evaluarfechafin_SAL548G("1")
								} else {
									this._evaluargrupo_SAL548G();
								}
							}
						}
					}
				},
			)
		},
		_evaluargrupo_SAL548G() {
			if (this.form.grupo_SAL548G.trim() == '') {
				this.form.grupo_SAL548G = '**'
			}
			validarInputs(
				{
					form: "#validargrupo_548",
					orden: '1'
				}, () => {
					this._evaluarfechafin_SAL548G('3')
				},
				() => {
					if (this.form.grupo_SAL548G == '**') {
						this.form.articulo_SAL548G = '*'
						this.form.descripgrupo_SAL548G = 'TODOS LOS GRUPOS'
						this._evaluardiscriminarcod_SAL548G();
					} else if (this.form.tipofact_SAL548G == '0') {
						const res = this.SAL548G.GRUPOS.find(e => e.GRUPO == this.form.grupo_SAL548G);
						if (res == undefined) {
							this.form.descripgrupo_SAL548G = 'GRUPO NO EXISTE!'
							CON851('01', '01', this._evaluargrupo_SAL548G(), 'error', 'error');
						} else {
							this.SAL548G.FILTROARTICULOS = $_this.SAL548G.ARTICULOS.filter(e => e.GRUPO_ART == this.form.grupo_SAL548G);
							this.form.descripgrupo_SAL548G = res.DESCRIP;
							this._evaluararticulo_SAL548G()
						}
					} else {
						const res = this.SAL548G.GRUPOSER.find(e => e.COD == this.form.grupo_SAL548G);
						if (res == undefined) {
							this.form.descripgrupo_SAL548G = 'GRUPO NO EXISTE!'
							CON851('01', '01', this._evaluargrupo_SAL548G(), 'error', 'error');
						} else {
							this.form.descripgrupo_SAL548G = res.DESCRIP;
							this._evaluararticulo_SAL548G()
						}
					}
				}
			)
		},
		_evaluararticulo_SAL548G() {
			if (this.form.articulo_SAL548G.trim() == '') {
				this.form.articulo_SAL548G = '*'
			}
			validarInputs(
				{
					form: "#validararticulo_548",
					orden: '1'
				}, this._evaluargrupo_SAL548G,
				() => {
					if (this.form.articulo_SAL548G == '*') {
						this._evaluardiscriminarcod_SAL548G()
					} else if (this.form.articulo_SAL548G.trim() == '') {
						this._evaluargrupo_SAL548G()
					} else {
						if (this.form.tipofact_SAL548G == '0') {
							const res = this.SAL548G.FILTROARTICULOS.find(e => e.LLAVE_ART == this.form.articulo_SAL548G);
							if (res == undefined) {
								CON851('01', '01', this._evaluararticulo_SAL548G(), 'error', 'error');
							} else {
								this._evaluardiscriminarcod_SAL548G()
							}
						} else {
							let URL = get_url("APP/SALUD/SAL548G.DLL");
							postData({ datosh: datosEnvio() + '2||||||||||' + this.SAL548G.FECHAINIW + '||' + this.form.grupo_SAL548G + '|' + this.form.articulo_SAL548G + '|' }, URL)
								.then(data => {
									this._evaluardiscriminarcod_SAL548G()
								})
								.catch(err => {
									console.debug(err);
									_evaluararticulo_SAL548G()
								})
						}
					}
				}
			)
		},
		_evaluardiscriminarcod_SAL548G() {
			if (this.form.grupo_SAL548G == '**' || this.form.articulo_SAL548G == '*') {
				if (this.form.discricod_SAL548G.trim() == '') {
					this.form.discricod_SAL548G = 'N'
				}
				validarInputs(
					{
						form: "#validardiscricod_548",
						orden: '1'
					}, this._evaluararticulo_SAL548G,
					() => {
						this.form.discricod_SAL548G = this.form.discricod_SAL548G.toUpperCase();
						if (this.form.discricod_SAL548G == 'S' || this.form.discricod_SAL548G == 'N') {
							this._evaluarcentrocosoto_SAL548G();
						} else {
							CON851('03', '03', this._evaluardiscriminarcod_SAL548G(), 'error', 'error');
						}
					}
				)
			} else {
				this.form.discricod_SAL548G = 'S';
				this._evaluarcentrocosoto_SAL548G();
			}
		},
		_evaluarcentrocosoto_SAL548G() {
			if (this.form.costos_SAL548G.trim() == '') {
				this.form.costos_SAL548G = '****'
			}
			validarInputs(
				{
					form: "#validarcostos_548",
					orden: '1'
				}, this._evaluargrupo_SAL548G,
				() => {
					if (this.form.costos_SAL548G == '****') {
						this.form.descripcosto_SAL548G = 'TODOS LOS COSTOS'
						this._evaluarcodespecilidad_SAL548G();
					} else {
						const res = this.SAL548G.COSTOS.find(e => e.COD == this.form.costos_SAL548G.padStart(4, '0'));
						if (res == undefined) {
							CON851('01', '01', this._evaluarcentrocosoto_SAL548G(), 'error', 'error');
						} else {
							this.form.descripcosto_SAL548G = res.NOMBRE
							this._evaluarcodespecilidad_SAL548G()
						}
					}
				}
			)

		},
		_evaluarcodespecilidad_SAL548G() {
			if (this.form.especialidad_SAL548G.trim() == '') {
				this.form.especialidad_SAL548G = '***'
			}
			validarInputs(
				{
					form: "#validarespecialidad_548",
					orden: '1'
				}, this._evaluarcentrocosoto_SAL548G,
				() => {
					if (this.form.especialidad_SAL548G == '***') {
						this.form.descripespec_SAL548G = 'TODAS LAS ESPECIALIDADES'
						this._evaluarfinalildad_SAL548G()
					} else {
						this.SAL548G.CODESP1W = this.form.especialidad_SAL548G.substring(0, 2)
						this.SAL548G.CODESP2W = this.form.especialidad_SAL548G.substring(2, 3)
						if (this.SAL548G.CODESP2W == '*') {
							this.SAL548G.CODESP = this.SAL548G.CODESP1W + 0;
						} else {
							this.SAL548G.CODESP = this.form.especialidad_SAL548G
						}
						const res = this.SAL548G.ESPECIALIDAD.find(e => e.CODIGO == this.SAL548G.CODESP);
						if (res == undefined) {
							CON851('01', '01', this._evaluarcodespecilidad_SAL548G(), 'error', 'error');
						} else {
							this.form.descripespec_SAL548G = res.NOMBRE;
							this._evaluarfinalildad_SAL548G()
						}
					}
				}
			)
		},
		_evaluarfinalildad_SAL548G() {
			if (this.form.tipofact_SAL548G == '7') {
				if (this.form.finalidadcons_SAL548G.trim() == '') {
					this.form.finalidadcons_SAL548G = '99 -TODAS LAS FINALID'
				}
				var finalidadw = [
					{ COD: "01", DESCRIP: "ATENCION PARTO" },
					{ COD: "02", DESCRIP: "ATENCION REC.NACID" },
					{ COD: "03", DESCRIP: "ATENC.PLANIF.FAMIL" },
					{ COD: "04", DESCRIP: "DET.ALT CRECIM <10" },
					{ COD: "05", DESCRIP: "DET.ALT.DESA.JOVEN" },
					{ COD: "06", DESCRIP: "DET.ALT.EMBARAZO" },
					{ COD: "07", DESCRIP: "DET.ALT. ADULTO" },
					{ COD: "08", DESCRIP: "DET.ALT.AGUD.VISUA" },
					{ COD: "09", DESCRIP: "DET.ENFERM.PROFES" },
					{ COD: "10", DESCRIP: "NO APLICA" },
					{ COD: "99", DESCRIP: "TODAS LAS FINALID" },
				];
				POPUP(
					{
						array: finalidadw,
						titulo: "ORDENAR",
						indices: [
							{
								id: "COD",
								label: "DESCRIP",
							},
						],
						seleccion: this.form.finalidadcons_SAL548G,
						callback_f: () => { this._evaluarcodespecilidad_SAL548G() },
					},
					finalidadw => {
						this.form.finalidadcons_SAL548G = finalidadw.COD + " - " + finalidadw.DESCRIP;
						this._evaluarunidadserv_SAL548G()
					},
				);
			} else {
				this.form.finalidadcons_SAL548G = '99 -TODAS LAS FINALID'
				this._evaluarunidadserv_SAL548G()
			}
		},

		_evaluarunidadserv_SAL548G() {
			if (this.form.unidadserv_SAL548G.trim() == '') {
				this.form.unidadserv_SAL548G = '**'
			}
			validarInputs(
				{
					form: "#validarunidadserv_548",
					orden: '1'
				},
				() => { setTimeout(this._evaluartipoafil_SAL548G, 300) },
				() => {
					this.form.unidadserv_SAL548G = this.form.unidadserv_SAL548G.padStart(2, '0')
					if (this.form.unidadserv_SAL548G == '**') {
						this.form.descripunidadserv_SAL548G = 'TODAS LAS UNIDADES SERV'
						this._grabaropcion_SAL548G()
					} else {
						let URL = get_url("APP/SALUD/SAL548G.DLL");
						postData({ datosh: datosEnvio() + '3||||||||||' + this.SAL548G.FECHAINIW + '||' + this.form.grupo_SAL548G + '|' + this.form.articulo_SAL548G + '|||||' + this.form.unidadserv_SAL548G }, URL)
							.then(data => {
								this._grabaropcion_SAL548G()
							})
							.catch(err => {
								console.debug(err);
								this._evaluarunidadserv_SAL548G()
							})
					}
				}
			)
		},
		async _grabaropcion_SAL548G() {
			this.SAL548G.FECHAACTUAL = moment().format('YYYY/MM/DD');
			this.SAL548G.ACTUAL = moment().format('YYYYMMDDHHmmss');
			this.SAL548G.HORAACTUAL = moment().format('HH:mm');

			let fecha_ini = this.SAL548G.FECHAINIW
			let fecha_fin = this.SAL548G.FECHAFINW
			let rango_fechas = rango_fecha_meses(fecha_ini, fecha_fin)

			let datos_envio = [
				'4',
				this.form.facturacionpor_SAL548G.substring(0, 1),
				this.form.medicoejecutar_SAL548G.substring(0, 1),
				this.form.tipofact_SAL548G,
				this.form.formapago_SAL548G,
				this.form.discrifact_SAL548G,
				this.form.mostraresp_SAL548G,
				this.form.medicos_SAL548G,
				this.form.prefijo_SAL548G + this.form.facturacion_SAL548G,
				this.form.entidades_SAL548G,
				null,
				null,
				this.form.grupo_SAL548G,
				this.form.articulo_SAL548G,
				this.form.discricod_SAL548G,
				this.form.costos_SAL548G,
				this.form.especialidad_SAL548G,
				this.form.finalidadcons_SAL548G.substring(0, 2),
				this.form.unidadserv_SAL548G,
				localStorage.Usuario,
				''
			]

			let consulta_general = []
			this.estado_loader = true;
			for (const fecha of rango_fechas) {
				this.label_loader = `Procesando mes: ${fecha.label.toUpperCase()}`;
				datos_envio[10] = fecha.ini
				datos_envio[11] = fecha.fin
				let data = await this.procesar_envio(datos_envio)
				consulta_general = consulta_general.concat(data)
				this.progreso = { transferred: 0, speed: 0 }
			}
			this.loader = false
			this.label_loader = `GENERANDO IMPRESIÓN...`;
			this.progreso.completado = true
			setTimeout(() => { this.format_impresion(consulta_general) }, 700)
		},
		procesar_envio(datos_envio) {
			const _this = this
			return new Promise((resolve) => {
				let URL = get_url("APP/SALUD/SAL548G.DLL");
				postData({
					datosh: datosEnvio() + datos_envio.join('|')
				}, URL, {
					onProgress: (progress) => {
						_this.progreso = progress;
					}
				})
					.then(data => {
						this.SAL548G.MEDICO = data.CONSULTA
						this.SAL548G.MEDICO.pop()
						resolve(this.SAL548G.MEDICO)
					})
					.catch(err => {
						console.error('Ha ocurrido un error durante la consulta:', err)
						resolve([])
					})
			})
		},
		format_impresion(data) {
			this.SAL548G.MEDICOS = data
			var valormedico = 0, valorcantidad = 0, valorurg = 0, valorext = 0, valorhosp = 0, valorpyp = 0;
			var totalmedic = 0, totalcantidad = 0, totalurg = 0, totalext = 0, totalhosp = 0, totalpyp = 0;
			let NUEVOARRAY = [];
			let idmedico = this.SAL548G.MEDICOS
			idmedico.sort((a, b) => {
				if (a.MEDIC > b.MEDIC) {
					return 1;
				}
				if (a.MEDIC < b.MEDIC) {
					return -1;
				}
				return 0;
			})
			console.log(this.SAL548G.MEDICOS, 'MEDICOS ORDENADOS')
			for (var i in this.SAL548G.MEDICOS) {
				NUEVOARRAY.push(this.SAL548G.MEDICOS[i]);
				let siguiente = parseInt(i) + 1;
				if (this.SAL548G.MEDICOS[i].URGE.trim() == '') this.SAL548G.MEDICOS[i].URGE = 0
				if (this.SAL548G.MEDICOS[i].EXTER.trim() == '') this.SAL548G.MEDICOS[i].EXTER = 0
				if (this.SAL548G.MEDICOS[i].HOSP.trim() == '') this.SAL548G.MEDICOS[i].HOSP = 0
				if (this.SAL548G.MEDICOS[i].PYP.trim() == '') this.SAL548G.MEDICOS[i].PYP = 0
				if (this.SAL548G.MEDICOS[siguiente] == undefined) {
					let valor = parseFloat(this.SAL548G.MEDICOS[i].VALOR)
					let cantidad = parseFloat(this.SAL548G.MEDICOS[i].CANT);
					let urgencias = parseFloat(this.SAL548G.MEDICOS[i].URGE);
					let externa = parseFloat(this.SAL548G.MEDICOS[i].EXTER);
					let hospitalizacion = parseFloat(this.SAL548G.MEDICOS[i].HOSP);
					let pyp = parseFloat(this.SAL548G.MEDICOS[i].PYP);
					valormedico = valormedico + valor;
					valorcantidad = valorcantidad + cantidad;
					valorurg = valorurg + urgencias;
					valorext = valorext + externa
					valorhosp = valorhosp + hospitalizacion
					valorpyp = valorpyp + pyp
					NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': 'SUBTOTAL MEDICO', 'CANT': valorcantidad, 'VALOR': valormedico, 'URGE': valorurg, 'EXTER': valorext, 'HOSP': valorhosp, 'PYP': valorpyp, 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
					NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': '                ', 'CANT': ' ', 'VALOR': ' ', 'URGE': ' ', 'EXTER': ' ', 'HOSP': ' ', 'PYP': ' ', 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
				} else {
					if (this.SAL548G.MEDICOS[i].CODMEDIC != this.SAL548G.MEDICOS[siguiente].CODMEDIC && this.SAL548G.MEDICOS[siguiente].CODMEDIC.trim() != '') {
						let valor = parseFloat(this.SAL548G.MEDICOS[i].VALOR)
						let cantidad = parseFloat(this.SAL548G.MEDICOS[i].CANT);
						let urgencias = parseFloat(this.SAL548G.MEDICOS[i].URGE);
						let externa = parseFloat(this.SAL548G.MEDICOS[i].EXTER);
						let hospitalizacion = parseFloat(this.SAL548G.MEDICOS[i].HOSP);
						let pyp = parseFloat(this.SAL548G.MEDICOS[i].PYP);
						valormedico = valormedico + valor;
						valorcantidad = valorcantidad + cantidad;
						valorurg = valorurg + urgencias;
						valorext = valorext + externa
						valorhosp = valorhosp + hospitalizacion
						valorpyp = valorpyp + pyp
						NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': 'SUBTOTAL MEDICO', 'CANT': valorcantidad, 'VALOR': valormedico, 'URGE': valorurg, 'EXTER': valorext, 'HOSP': valorhosp, 'PYP': valorpyp, 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
						NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': '               ', 'CANT': ' ', 'VALOR': ' ', 'URGE': ' ', 'EXTER': ' ', 'HOSP': ' ', 'PYP': ' ', 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
						valormedico = 0;
						valorcantidad = 0;
						valorurg = 0;
						valorext = 0;
						valorhosp = 0;
						valorpyp = 0;
					} else {
						let valor = parseFloat(this.SAL548G.MEDICOS[i].VALOR)
						let cantidad = parseFloat(this.SAL548G.MEDICOS[i].CANT);
						let urgencias = parseFloat(this.SAL548G.MEDICOS[i].URGE);
						let externa = parseFloat(this.SAL548G.MEDICOS[i].EXTER);
						let hospitalizacion = parseFloat(this.SAL548G.MEDICOS[i].HOSP);
						let pyp = parseFloat(this.SAL548G.MEDICOS[i].PYP);
						valormedico = valormedico + valor;
						valorcantidad = valorcantidad + cantidad;
						valorurg = valorurg + urgencias;
						valorext = valorext + externa
						valorhosp = valorhosp + hospitalizacion
						valorpyp = valorpyp + pyp
					}
				}
			}
			columnas = [
				{
					title: "Medico",
					value: 'MEDIC',
				},
				{
					title: "Articulo",
					value: 'ARTIC',
					format: "string"
				},
				{
					title: "Descripcion",
					value: 'DESCRIP_ART',
					format: "string"
				},
				{
					title: "Cantidad",
					value: 'CANT',
				},
				{
					title: "Valor venta",
					value: 'VALOR',
					format: 'money',
				},
				{
					title: "Urgencias",
					value: 'URGE',
				},

				{
					title: "C. Externa",
					value: 'EXTER',
				},
				{
					title: "Hospital.",
					value: 'HOSP',
				},
				{
					title: "PYP",
					value: 'PYP',
				},
				{
					title: "Id paciente",
					value: 'ID_PAC',
					format: 'string',
				},
				{
					title: "Nombre paciente",
					value: 'NOM_PACI',
				},
				{
					title: "Edad",
					value: 'EDAD',
					format: "string"
				},
				{
					title: "Eps",
					value: 'EPS',
					format: "string"
				},
				{
					title: "Nombre Eps",
					value: 'NOM_EPS',
					format: "string"
				},
				{
					title: "Costo",
					value: 'COSTO',
					format: "string"
				},
				{
					title: "Mes proceso",
					value: 'MES',
					format: "string"
				},

			]
			_impresion2({
				tipo: 'excel',
				header: [
					{ text: `${$_USUA_GLOBAL[0].NOMBRE}` + 'NIT: ' + `${$_USUA_GLOBAL[0].NIT}` + ' ' + this.form.decripmedicos_SAL548G + ' Opc: 954131 ' + this.form.decripmedicos_SAL548G + 'PRODUCTIVIDAD POR MEDICO', bold: true, size: 13 },
					`RESUMEN DE TIPO: ` + this.form.descriptipofact_SAL548G + ' ' + this.form.descripentidades_SAL548G + ' DESDE: ' + this.SAL548G.FECHAINIW + ' HASTA: ' + this.SAL548G.FECHAFINW,
					`FORMA DE PAGO: ` + this.form.descripformapago_SAL548G + ' Imp: ' + this.SAL548G.FECHAACTUAL + ' Hora:' + this.SAL548G.HORAACTUAL + ' Factura: ' + this.form.prefijo_SAL548G + this.form.facturacion_SAL548G
				],
				logo: `${$_USUA_GLOBAL[0].NIT}.png`,
				tabla: {
					columnas,
					data: NUEVOARRAY,
				},
				archivo: 'LISTADO-DE-RESUMEN' + `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
			})
				.then(() => {
					this.estado_loader = false
					CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
					_toggleNav()
				})
				.catch(() => {
					this.estado_loader = false
					CON851('', 'Hubo un error en la impresión', null, 'error', 'Error')
					this._evaluarunidadserv_SAL548G()
				})
		},

		_grabaropcion2_SAL548G() {
			loader("show");
			this.SAL548G.FECHAACTUAL = moment().format('YYYY/MM/DD');
			this.SAL548G.ACTUAL = moment().format('YYYYMMDDHHmmss');
			this.SAL548G.HORAACTUAL = moment().format('HH:mm');
			let URL = get_url("APP/SALUD/SAL548G.DLL");
			postData({ datosh: datosEnvio() + '4|' + this.form.facturacionpor_SAL548G.substring(0, 1) + '|' + this.form.medicoejecutar_SAL548G.substring(0, 1) + '|' + this.form.tipofact_SAL548G + '|' + this.form.formapago_SAL548G + '|' + this.form.discrifact_SAL548G + '|' + this.form.mostraresp_SAL548G + '|' + this.form.medicos_SAL548G + '|' + this.form.prefijo_SAL548G + this.form.facturacion_SAL548G + '|' + this.form.entidades_SAL548G + '|' + this.SAL548G.FECHAINIW + '|' + this.SAL548G.FECHAFINW + '|' + this.form.grupo_SAL548G + '|' + this.form.articulo_SAL548G + '|' + this.form.discricod_SAL548G + '|' + this.form.costos_SAL548G + '|' + this.form.especialidad_SAL548G + '|' + this.form.finalidadcons_SAL548G.substring(0, 2) + '|' + this.form.unidadserv_SAL548G + '|' + localStorage.Usuario + '|' }, URL)
				.then(data => {
					this.SAL548G.MEDICOS = data.CONSULTA
					this.SAL548G.MEDICOS.pop()
					var valormedico = 0, valorcantidad = 0, valorurg = 0, valorext = 0, valorhosp = 0, valorpyp = 0;
					var totalmedic = 0, totalcantidad = 0, totalurg = 0, totalext = 0, totalhosp = 0, totalpyp = 0;
					let NUEVOARRAY = [];
					for (var i in this.SAL548G.MEDICOS) {
						NUEVOARRAY.push(this.SAL548G.MEDICOS[i]);
						let siguiente = parseInt(i) + 1;
						if (this.SAL548G.MEDICOS[i].URGE.trim() == '') this.SAL548G.MEDICOS[i].URGE = 0
						if (this.SAL548G.MEDICOS[i].EXTER.trim() == '') this.SAL548G.MEDICOS[i].EXTER = 0
						if (this.SAL548G.MEDICOS[i].HOSP.trim() == '') this.SAL548G.MEDICOS[i].HOSP = 0
						if (this.SAL548G.MEDICOS[i].PYP.trim() == '') this.SAL548G.MEDICOS[i].PYP = 0
						if (this.SAL548G.MEDICOS[siguiente] == undefined) {
							let valor = parseFloat(this.SAL548G.MEDICOS[i].VALOR)
							let cantidad = parseFloat(this.SAL548G.MEDICOS[i].CANT);
							let urgencias = parseFloat(this.SAL548G.MEDICOS[i].URGE);
							let externa = parseFloat(this.SAL548G.MEDICOS[i].EXTER);
							let hospitalizacion = parseFloat(this.SAL548G.MEDICOS[i].HOSP);
							let pyp = parseFloat(this.SAL548G.MEDICOS[i].PYP);
							valormedico = valormedico + valor;
							valorcantidad = valorcantidad + cantidad;
							valorurg = valorurg + urgencias;
							valorext = valorext + externa
							valorhosp = valorhosp + hospitalizacion
							valorpyp = valorpyp + pyp
							NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': 'SUBTOTAL MEDICO', 'CANT': valorcantidad, 'VALOR': valormedico, 'URGE': valorurg, 'EXTER': valorext, 'HOSP': valorhosp, 'PYP': valorpyp, 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
							NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': '                ', 'CANT': ' ', 'VALOR': ' ', 'URGE': ' ', 'EXTER': ' ', 'HOSP': ' ', 'PYP': ' ', 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
						} else {
							if (this.SAL548G.MEDICOS[i].CODMEDIC != this.SAL548G.MEDICOS[siguiente].CODMEDIC && this.SAL548G.MEDICOS[siguiente].CODMEDIC.trim() != '') {
								let valor = parseFloat(this.SAL548G.MEDICOS[i].VALOR)
								let cantidad = parseFloat(this.SAL548G.MEDICOS[i].CANT);
								let urgencias = parseFloat(this.SAL548G.MEDICOS[i].URGE);
								let externa = parseFloat(this.SAL548G.MEDICOS[i].EXTER);
								let hospitalizacion = parseFloat(this.SAL548G.MEDICOS[i].HOSP);
								let pyp = parseFloat(this.SAL548G.MEDICOS[i].PYP);
								valormedico = valormedico + valor;
								valorcantidad = valorcantidad + cantidad;
								valorurg = valorurg + urgencias;
								valorext = valorext + externa
								valorhosp = valorhosp + hospitalizacion
								valorpyp = valorpyp + pyp
								NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': 'SUBTOTAL MEDICO', 'CANT': valorcantidad, 'VALOR': valormedico, 'URGE': valorurg, 'EXTER': valorext, 'HOSP': valorhosp, 'PYP': valorpyp, 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
								NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': '               ', 'CANT': ' ', 'VALOR': ' ', 'URGE': ' ', 'EXTER': ' ', 'HOSP': ' ', 'PYP': ' ', 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
								valormedico = 0;
								valorcantidad = 0;
								valorurg = 0;
								valorext = 0;
								valorhosp = 0;
								valorpyp = 0;
							} else {
								let valor = parseFloat(this.SAL548G.MEDICOS[i].VALOR)
								let cantidad = parseFloat(this.SAL548G.MEDICOS[i].CANT);
								let urgencias = parseFloat(this.SAL548G.MEDICOS[i].URGE);
								let externa = parseFloat(this.SAL548G.MEDICOS[i].EXTER);
								let hospitalizacion = parseFloat(this.SAL548G.MEDICOS[i].HOSP);
								let pyp = parseFloat(this.SAL548G.MEDICOS[i].PYP);
								valormedico = valormedico + valor;
								valorcantidad = valorcantidad + cantidad;
								valorurg = valorurg + urgencias;
								valorext = valorext + externa
								valorhosp = valorhosp + hospitalizacion
								valorpyp = valorpyp + pyp
							}
						}
					}
					// totalmedic = totalmedic + valormedico
					// totalcantidad = totalcantidad + valorcantidad
					// totalurg = totalurg + valorurg
					// totalext = totalext + valorext
					// totalhosp = totalhosp + valorhosp
					// totalpyp = totalpyp + valorpyp
					// NUEVOARRAY.push({ 'MEDIC': ' ', 'ARTI': ' ', 'DESCRIP_ART': 'TOTAL GENERAL', 'CANT': totalcantidad, 'VALOR': totalmedic, 'URGE': totalurg, 'EXTER': totalext, 'HOSP': totalhosp, 'PYP': totalpyp, 'ID_PAC': ' ', 'NOM_PACI': ' ', 'EDAD': ' ', 'COSTO': ' ' });
					columnas = [
						{
							title: "Medico",
							value: 'MEDIC',
						},
						{
							title: "Articulo",
							value: 'ARTIC',
							format: "string"
						},
						{
							title: "Descripcion",
							value: 'DESCRIP_ART',
							format: "string"
						},
						{
							title: "Cantidad",
							value: 'CANT',
						},
						{
							title: "Valor venta",
							value: 'VALOR',
							format: 'money',
						},
						{
							title: "Urgencias",
							value: 'URGE',
						},

						{
							title: "C. Externa",
							value: 'EXTER',
						},
						{
							title: "Hospital.",
							value: 'HOSP',
						},
						{
							title: "PYP",
							value: 'PYP',
						},
						{
							title: "Id paciente",
							value: 'ID_PAC',
							format: 'string',
						},
						{
							title: "Nombre paciente",
							value: 'NOM_PACI',
						},
						{
							title: "Edad",
							value: 'EDAD',
							format: "string"
						},
						{
							title: "Eps",
							value: 'EPS',
							format: "string"
						},
						{
							title: "Nombre Eps",
							value: 'NOM_EPS',
							format: "string"
						},
						{
							title: "Costo",
							value: 'COSTO',
							format: "string"
						},

					]
					_impresion2({
						tipo: 'excel',
						header: [
							{ text: `${$_USUA_GLOBAL[0].NOMBRE}` + 'NIT: ' + `${$_USUA_GLOBAL[0].NIT}` + ' ' + this.form.decripmedicos_SAL548G + ' Opc: 954131 ' + this.form.decripmedicos_SAL548G + 'PRODUCTIVIDAD POR MEDICO', bold: true, size: 13 },
							`RESUMEN DE TIPO: ` + this.form.descriptipofact_SAL548G + ' ' + this.form.descripentidades_SAL548G + ' DESDE: ' + this.SAL548G.FECHAINIW + ' HASTA: ' + this.SAL548G.FECHAFINW,
							`FORMA DE PAGO: ` + this.form.descripformapago_SAL548G + ' Imp: ' + this.SAL548G.FECHAACTUAL + ' Hora:' + this.SAL548G.HORAACTUAL + ' Factura: ' + this.form.prefijo_SAL548G + this.form.facturacion_SAL548G
						],
						logo: `${$_USUA_GLOBAL[0].NIT}.png`,
						tabla: {
							columnas,
							// totalsRow: true,
							data: NUEVOARRAY,
						},
						archivo: 'LISTADO-DE-RESUMEN' + `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
					})
						.then(() => {
							loader("hide");
							CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
						})
						.catch(() => {
							loader("hide");
							CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
						})

				})
				.catch(err => {
					console.log(err);
					loader("hide");
					this._evaluarunidadserv_SAL548G();
				})
		},


		_f8medicos_SAL548G() {
			var $_this = this;
			_ventanaDatos({
				titulo: "VENTANA DE PROFESIONALES",
				columnas: ["NOMBRE", "IDENTIFICACION"],
				data: $_this.SAL548G.PROFESIONAL,
				callback_esc: function () {
					$(".medicos_SAL548G").focus()
				},
				callback: function (data) {
					$_this.form.medicos_SAL548G = data.IDENTIFICACION
					_enterInput('.medicos_SAL548G');
				}
			});

		},
		_f8costos_SAL548G() {
			var $_this = this;
			_ventanaDatos({
				titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
				columnas: ["COD", "NOMBRE"],
				data: $_this.SAL548G.COSTOS,
				callback_esc: function () {
					$(".costos_SAL548G").focus();
				},
				callback: function (data) {
					$_this.form.costos_SAL548G = data.COD.trim();
					_enterInput(".costos_SAL548G");
				},
			});
		},
		_f8tiposerv_SAL548G() {
			var $_this = this;
			_ventanaDatos({
				titulo: "TIPO DE SERVICIO",
				columnas: ["COD", "DESCRIPCION"],
				data: $_this.SAL548G.SERVICIOS,
				callback_esc: function () {
					$(".tipofact_SAL548G").focus();
				},
				callback: function (data) {
					$_this.form.tipofact_SAL548G = (data.COD)
					_enterInput('.tipofact_SAL548G');
				}
			});

		},
		_f8formapago_SAL548G() {
			var $_this = this;
			_ventanaDatos({
				titulo: "FORMAS DE PAGO",
				columnas: ["COD", "DESCRIP"],
				data: $_this.SAL548G.FORMAPAGO,
				callback_esc: function () {
					$(".formapago_SAL548G").focus();
				},
				callback: function (data) {
					$_this.form.formapago_SAL548G = (data.COD)
					_enterInput('.formapago_SAL548G');
				}
			});

		},
		_f8grupo_SAL548G() {
			var $_this = this;
			if ($_this.form.tipofact_SAL548G == '0') {
				_ventanaDatos({
					titulo: "VENTANA DE GRUPOS",
					columnas: ["TIPO", "GRUPO", "DESCRIP"],
					data: $_this.SAL548G.GRUPOS,
					callback_esc: function () {
						$(".grupo_SAL548G").focus();
					},
					callback: function (data) {
						$_this.form.grupo_SAL548G = data.GRUPO.trim()
						_enterInput('.grupo_SAL548G');
					}
				});
			} else {
				_ventanaDatos({
					titulo: "VENTANA DE GRUPOS DE SERVICIOS",
					columnas: ["COD", "DESCRIP"],
					data: $_this.SAL548G.GRUPOSER,
					callback_esc: function () {
						$(".grupo_SAL548G").focus();
					},
					callback: function (data) {
						$_this.form.grupo_SAL548G = data.COD.trim()
						_enterInput('.grupo_SAL548G');
					}
				});

			}
		},
		_f8entidades_SAL548G() {
			var $_this = this;
			_ventanaDatos({
				titulo: 'VENTANA DE ENTIDADES',
				columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
				// label: ["codigo", "nombre"],
				data: $_this.SAL548G.ENTIDAD,
				callback_esc: function () {
					$(".entidad_SAL548G").focus();
				},
				callback: function (data) {
					$_this.form.entidades_SAL548G = data["COD-ENT"]
					_enterInput('.entidad_SAL548G');
				}
			});
		},
		_f8articulo_SAL548G() {
			var $_this = this;
			if ($_this.form.tipofact_SAL548G == '0') {
				_ventanaDatos({
					titulo: 'VENTANA DE ARTICULOS',
					columnas: ['LLAVE_ART', 'DESCRIP_ART'],
					data: $_this.SAL548G.FILTROARTICULOS,
					callback_esc: function () {
						$(".articulo_SAL548G").focus();
					},
					callback: function (data) {
						$_this.form.articulo_SAL548G = data.LLAVE_ART
						_enterInput('.articulo_SAL548G');
					}
				});
			} else {
				_ventanaDatos({
					titulo: "VENTANA DE CODIGOS CUPS",
					columnas: ["LLAVE", "DESCRIP"],
					data: $_this.SAL548G.CUPS,
					callback_esc: function () {
						$(".articulo_SAL548G").focus();
					},
					callback: function (data) {
						$_this.SAL548G.LLAVECUPS = data.LLAVE.trim()
						$_this.SAL548G.GRUPO_71G = $_this.SAL548G.LLAVECUPS.substring(0, 2);
						$_this.SAL548G.CUPS_71G = $_this.SAL548G.LLAVECUPS.substring(2, 12);
						$_this.form.articulo_SAL548G = $_this.SAL548G.CUPS_71G
						$_this.form.grupo_SAL548G = $_this.SAL548G.GRUPO_71G
						_enterInput('.articulo_SAL548G');
					}
				});
			}
		},
		_f8especialidad_SAL548G() {
			var $_this = this;
			_ventanaDatos({
				titulo: 'VENTANA DE ESPECIALIDADES',
				columnas: ["CODIGO", "NOMBRE"],
				data: $_this.SAL548G.ESPECIALIDAD,
				callback_esc: function () {
					$(".especialidad_SAL548G").focus();
				},
				callback: function (data) {
					$_this.form.especialidad_SAL548G = data.CODIGO
					_enterInput('.especialidad_SAL548G');
				}
			});
		},
		_f8unidadserv_SAL548G() {
			var $_this = this;
			_ventanaDatos({
				titulo: 'VENTANA UNIDADES DE SERVICIO',
				data: $_this.SAL548G.UNIDADSERV,
				columnas: ["COD", "DESCRIP", "DESCRIPEST"],
				callback_esc: function () {
					$(".unidadserv_SAL548G").focus();
				},
				callback: function (data) {
					$_this.form.unidadserv_SAL548G = data.COD;
					_enterInput('.unidadserv_SAL548G');
				}
			});

		},
		_f8facturacion_SAL548G() {
			var $_this = this;
			parametros = {
				dll: 'NUMERACION',
				valoresselect: ['Nombre del tercero', 'buscar paciente'],
				f8data: 'NUMERACION',
				columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
				callback: (data) => {
					$_NROW = data.COD;
					$_NROW = $_NROW.substring(1, 7)
					$_this.form.facturacion_SAL548G = $_NROW;
					_enterInput('.numeracion_SAL548G');
				},
				cancel: () => {
					_enterInput('.numeracion_SAL548G');
				}
			};
			F8LITE(parametros);
		}
	},
});
