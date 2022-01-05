// 22/02/2021 - - DIANA ESCOBAR: CREADO 
new Vue({
	el: '#SER767',
	data: {
		SER767: [],
		form: {
			anoini_SER767: '',
			mesini_SER767: '',
			diaini_SER767: '',
			anofin_SER767: '',
			mesfin_SER767: '',
			diafin_SER767: '',
			codentidad_SER767: '',
			descripentidad_SER767: '',
			codcosto_SER767: '',
			descripcosto_SER767: '',
			medico_SER767: '',
			descripmedi_SER767: '',
			tipocomp_SER767: '',
			citascontrol_SER767: '',
			estadocita_SER767: '',
			descriptipo_SER767: ''
		},
	},
	created() {
		loader('show')
		_inputControl('disabled');
		nombreOpcion('9-7-C-6-3 - Resumen de citas por Inasistidas');
		$_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
		$_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
		$_this = this
		$_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
		$_ANO_LNK = 20 + $_FECHA_LNK.substring(0, 2)
		$_MES_LNK = $_FECHA_LNK.substring(2, 4)
		$_DIA_LNK = $_FECHA_LNK.substring(4, 6)
		$_NITUSU = $_USUA_GLOBAL[0].NIT;
		$_FECHAACTUAL = moment().format('YYYYMMDD');
		$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
		$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
		$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);
		if ($_USUA_GLOBAL[0].NIT == '0800156469') {
			$_this.SER767.SERVICIOS = [
				{ COD: '0', DESCRIPCION: 'DROGUERIA' },
				{ COD: '1', DESCRIPCION: 'CIRUGIAS' },
				{ COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
				{ COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
				{ COD: '4', DESCRIPCION: 'DOPPLER' },
				{ COD: '5', DESCRIPCION: 'T.A.C.' },
				{ COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
				{ COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
			]
		} else {
			$_this.SER767.SERVICIOS = [
				{ COD: '0', DESCRIPCION: 'DROGUERIA' },
				{ COD: '1', DESCRIPCION: 'CIRUGIAS' },
				{ COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
				{ COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
				{ COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
				{ COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
				{ COD: '6', DESCRIPCION: 'PATOLOGIA' },
				{ COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
			]
		}
		obtenerDatosCompletos({
			nombreFd: 'ENTIDADES'
		}, function (data) {
			$_this.SER767.ENTIDADES = data.ENTIDADES
			$_this.SER767.ENTIDADES.pop()
			loader('hide')
			$_this._evaluarfechaini_SER767('1')
			obtenerDatosCompletos({
				nombreFd: 'COSTOS'
			}, function (data) {
				$_this.SER767.COSTO = data.COSTO;
				$_this.SER767.COSTO.pop();
			})
		});

	},
	methods: {
		_evaluarfechaini_SER767(orden) {
			this.form.anoini_SER767 = $_ANO_LNK
			this.form.mesini_SER767 = $_MES_LNK
			this.form.diaini_SER767 = '01'
			validarInputs(
				{
					form: "#fechaInicial_SER767",
					orden: orden
				},
				() => { _toggleNav() },
				() => {
					if (this.form.anoini_SER767.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._validarfecha_SER767('1');
					} else {
						if (this.form.mesini_SER767.trim() == '' || this.form.mesini_SER767 < 01 || this.form.mesini_SER767 > 12) {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._validarfecha_SER767('2');
						} else {
							if (this.form.diaini_SER767.trim() == '' || this.form.diaini_SER767 < 01 || this.form.diaini_SER767 > 31) {
								CON851('', 'dia incorrecto! ', this._validarfecha_SER767('3'), 'error', 'error');
							} else {
								this.SER767.FECHAINIW = this.form.anoini_SER767 + this.form.mesini_SER767 + this.form.diaini_SER767
								postData({ datosh: datosEnvio() + '1|' + this.SER767.FECHAINIW + "|" }, get_url("APP/SALUD/SER767.DLL"))
									.then(data => {
										console.log(data, 'PASO 1 ')
										this._evaluarfechafin_SER767('1')
									})
									.catch(err => {
										console.error(err)
										this._evaluarfechaini_SER767('1')
									});
							}
						}
					}
				}
			)
		},
		_evaluarfechafin_SER767(orden) {
			this.form.anofin_SER767 = $_ANO_LNK
			this.form.mesfin_SER767 = $_MES_LNK
			this.form.diafin_SER767 = $_DIA_LNK
			validarInputs(
				{
					form: "#fechaFinal_SER767",
					orden: orden
				},
				() => { this._evaluarfechaini_SER767() },
				() => {
					if (this.form.anofin_SER767.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._evaluarfechafin_SER767('1');
					} else {
						if (this.form.mesfin_SER767.trim() == '' || this.form.mesfin_SER767 < 01 || this.form.mesfin_SER767 > 12) {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._evaluarfechafin_SER767('2');
						} else {
							if (this.form.diafin_SER767.trim() == '' || this.form.diafin_SER767 < 01 || this.form.diafin_SER767 > 31) {
								CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER767('3'), 'error', 'error');
							} else {
								this.FECHAFINW = this.form.anofin_SER767 + this.form.mesfin_SER767 + this.form.diafin_SER767
								if (this.FECHAFINW < this.SER767.FECHAINIW) {
									CON851('37', '37', this._evaluarfechafin_SER767('3'), 'error', 'error');
								} else {
									this._evaluarentidad_SER767()
								}
							}
						}
					}
				}
			)
		},
		_evaluarentidad_SER767() {
			if (this.form.codentidad_SER767.trim() == '') this.form.codentidad_SER767 = '******'
			validarInputs(
				{
					form: "#validarentidad_SER767",
					orden: '1'
				},
				() => { this._evaluarfechafin_SER767('3') },
				() => {
					this.form.codentidad_SER767 = this.form.codentidad_SER767.toUpperCase();
					if (this.form.codentidad_SER767 == '******') {
						this.form.descripentidad_SER767 = 'TODAS LAS ENTIDADES'
						this._evaluarcosto_SER767()
					} else {
						const res = this.SER767.ENTIDADES.find(e => e['COD-ENT'] == this.form.codentidad_SER767);
						if (res == undefined) {
							CON851("01", "01", this._evaluarentidad_SER767(), "error", "error");
						} else {
							this.form.descripentidad_SER767 = res['NOMBRE-ENT'];
							this._evaluarcosto_SER767()
						}
					}
				}
			)
		},
		_evaluarcosto_SER767() {
			if (this.form.codcosto_SER767.trim() == '') this.form.codcosto_SER767 = '****'
			validarInputs(
				{
					form: "#validarcosto_SER767",
					orden: '1'
				},
				() => { this._evaluarentidad_SER767() },
				() => {
					this.form.codcosto_SER767 = this.form.codcosto_SER767.padStart(4, "0")
					if (this.form.codcosto_SER767 == '****') {
						this.form.descripcosto_SER767 = 'TODAS LOS COSTOS'
						this._estadocita_SER767()
					} else {
						const res = this.SER767.COSTO.find(e => e.COD == this.form.codcosto_SER767);
						if (res == undefined) {
							CON851("01", "01", this._evaluarcosto_SER767(), "error", "error");
						} else {
							this.form.descripcosto_SER767 = res.NOMBRE
							this._estadocita_SER767()
						}
					}
				}
			)
		},
		_estadocita_SER767() {
			var estado = [
				{ COD: "I", DESCRIP: "Inasistidas" },
				{ COD: "C", DESCRIP: "Canceladas" },
			];
			POPUP(
				{
					array: estado,
					titulo: "Estado cita",
					indices: [
						{
							id: "COD",
							label: "DESCRIP",
						},
					],
					seleccion: 'I',
					teclaAlterna: true,
					callback_f: () => {
						setTimeout(this._evaluarcosto_SER767, 300)
					},
				},
				estado => {
					this.SER767.ESTADOCIT = estado.DESCRIP
					this.form.estadocita_SER767 = estado.COD + " - " + estado.DESCRIP;
					this._evaluarmedico_SER767()
				},
			);
		},
		_evaluarmedico_SER767() {
			if (this.form.medico_SER767.trim() == '') this.form.medico_SER767 = '99'
			validarInputs(
				{
					form: "#validarmedico_SER767",
					orden: '1'
				},
				() => { setTimeout(this._estadocita_SER767, 300); },
				() => {

					if (this.form.medico_SER767 == '99') {
						this.form.descripmedi_SER767 = 'TODOS LOS MEDICOS'
						this._evaluartipocomp_SER767()
					} else {
						this.form.medico_SER767 = this.form.medico_SER767.padStart(10, '0')
						postData({ datosh: datosEnvio() + '3|||||||||||' + this.form.medico_SER767 + '|' }, get_url("APP/SALUD/SER766.DLL"))
							.then(data => {
								this.form.descripmedi_SER767 = data
								this._evaluartipocomp_SER767()
							})
							.catch(err => {
								console.error(err)
								this.form.descripmedi_SER767 = 'MEDICO NO EXISTE'
								this._evaluartipocomp_SER767()
							});
					}
				}
			)
		},
		_evaluartipocomp_SER767() {
			if (this.form.tipocomp_SER767.trim() == '') this.form.tipocomp_SER767 = '*'
			validarInputs(
				{
					form: "#validartipocomp_SER767",
					orden: '1'
				},
				() => { this._evaluarmedico_SER767() },
				() => {
					if (this.form.tipocomp_SER767 == '*') {
						this.form.descriptipo_SER767 = 'TODOS LOS TIPOS'
						this._evaluarcontrol_SER767()
					} else {
						let clases = $_this.SER767.SERVICIOS;
						let array = clases.filter(x => x.COD == this.form.tipocomp_SER767);
						if (array.length > 0) {
							this.form.descriptipo_SER767 = array[0].DESCRIPCION
							this._evaluarcontrol_SER767()
						} else {
							CON851('03', '03', this._evaluartipocomp_SER767(), 'error', 'error');
						}
					}
				}
			)
		},
		_evaluarcontrol_SER767() {
			if (this.form.citascontrol_SER767.trim() == '') this.form.citascontrol_SER767 = 'N'
			validarInputs(
				{
					form: "#validarcontrol_SER767",
					orden: '1'
				},
				() => { this._evaluartipocomp_SER767() },
				() => {
					this.form.citascontrol_SER767 = this.form.citascontrol_SER767.toUpperCase()
					if (this.form.citascontrol_SER767 == 'S' || this.form.citascontrol_SER767 == 'N') {
						this._evaluarlistado_SER767()
					} else {
						CON851('03', '03', this._evaluarcontrol_SER767(), 'error', 'error');
					}
				}
			)
		},

		_evaluarlistado_SER767() {
			let URL = get_url("APP/SALUD/SER767.DLL");
			postData({ datosh: datosEnvio() + '2|' + this.SER767.FECHAINIW + '|' + this.FECHAFINW + '|' + this.form.codentidad_SER767 + '|' + this.form.codcosto_SER767 + '|' + this.form.estadocita_SER767.substring(0, 1) + '|' + this.form.medico_SER767 + '|' + this.form.tipocomp_SER767 + '|' + this.form.citascontrol_SER767 + '|' }, URL)
				.then(data => {
					console.log(data, 'IMPRESION')
					data = data.RESUMEN;
					data.pop()
					console.log(data.length)
					if (data.length < 1) {
						CON851('', 'No tiene ninguna cita en este intervalo', this._evaluarcontrol_SER767(), 'error', 'Error')
					} else {
						columnas = [
							{
								title: "Item",
								value: 'ITEM',

							},
							{
								title: "Fecha",
								value: 'FECHA',
								format: "fecha"
							},
							{
								title: "Hora",
								value: 'HORA',
								format: "string"
							},
							{
								title: "Identificacion",
								value: 'ID_PAC',
							},
							{
								title: "1er apellido",
								value: 'PRIAPEL_PAC',
							},
							{
								title: "2do apellido ",
								value: 'SEGAPEL_PAC',
							},
							{
								title: "1er nombre",
								value: 'PRINOMB_PAC',
							},
							{
								title: "2do nombre",
								value: 'SEGNOMB_PAC',
							},
							{
								title: "Telefono",
								value: 'TELEFONO',
							},
							{
								title: "Nombre medico",
								value: 'NOMBRE_MED',
								format: "string"
							},
							{
								title: "Edad pac",
								value: 'EDAD_PAC',
							},
							{
								title: "Entidad",
								value: 'ENTIDAD',
							},
							{
								title: "Nombre Entidad",
								value: 'NOMBRE_ENT',
							},
							{
								title: "Motivo de cancelacion",
								value: 'CANCELACION',
							},
						]
						_impresion2({
							tipo: 'excel',
							header: [
								{ text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
								`RESUMEN DE CITAS  ${this.SER767.ESTADOCIT} `,
								`${this.form.anoini_SER767}/${this.form.mesini_SER767.padStart(2, '0')}/${this.form.diaini_SER767.substring(2, '0')} HASTA EL DIA ${this.form.anofin_SER767}/${this.form.mesfin_SER767.padStart(2, '0')}/${this.form.diafin_SER767.substring(2, '0')}`,
							],
							logo: `${$_USUA_GLOBAL[0].NIT}.png`,
							ruta_logo: 'P:\\PROG\\LOGOS\\',
							tabla: {
								columnas,
								data: data,
							},
							archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
							scale: 65,
							orientation: 'landscape'
						})
							.then(() => {
								CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
								_toggleNav();
							})
							.catch(() => {
								CON851('', 'Hubo un error en la impresión', this._evaluarcontrol_SER767(), 'error', 'Error')
							})
					}

				})
				.catch(err => {
					console.error(err);
					CON851('', 'Error de la impresión ', null, 'error', 'error');
					this._evaluarcontrol_SER767()
				})
		},

		_f8tipocomp_SER767() {
			var $_this = this;
			_ventanaDatos({
				titulo: "TIPO DE SERVICIO",
				columnas: ["COD", "DESCRIPCION"],
				data: $_this.SER767.SERVICIOS,
				callback_esc: function () {
					$(".servicios_SER767").focus();
				},
				callback: function (data) {
					$_this.form.tipocomp_SER767 = (data.COD)
					_enterInput('.servicios_SER767');
				}
			});

		},
		_f8entidad_SER767() {
			var $_this = this;
			_ventanaDatos({
				titulo: 'VENTANA DE ENTIDADES',
				columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
				data: $_this.SER767.ENTIDADES,
				callback_esc: function () {
					$(".entidades_SER767").focus();
				},
				callback: function (data) {
					$_this.form.codentidad_SER767 = data["COD-ENT"]
					_enterInput('.entidades_SER767');
				}
			});
		},
		_f8costos_SER767() {
			var $_this = this;
			_ventanaDatos({
				titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
				columnas: ["COD", "NOMBRE"],
				data: $_this.SER767.COSTO,
				callback_esc: function () {
					$(".costo_SER767").focus();
				},
				callback: function (data) {
					$_this.form.codcosto_SER767 = data.COD.trim();
					_enterInput(".costo_SER767");
				},
			});
		},


		_f8profesionales_SER767() {
			var $_this = this;
			let URL = get_url("APP/" + "SALUD/SER819" + ".DLL");
			postData({
				datosh: datosEnvio() + localStorage['Usuario'] + "|"
			}, URL)
				.then((data) => {
					loader("hide");
					$_this.SER767.PROFES = data;
					$_this.SER767.PROFES.ARCHPROF.pop();
					_ventanaDatos({
						titulo: "VENTANA DE PROFESIONALES",
						columnas: ["NOMBRE", "IDENTIFICACION"],
						data: $_this.SER767.PROFES.ARCHPROF,
						callback_esc: function () {
							$(".medico_SER767").focus()
						},
						callback: function (data) {
							$_this.form.medico_SER767 = data.IDENTIFICACION.trim();
							_enterInput('.medico_SER767');
						}
					});
				})
				.catch((error) => {
					console.log(error)
				});
		},



	}
})
