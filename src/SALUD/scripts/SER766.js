// 20/07/2020 - - DIANA ESCOBAR: CREADO 
new Vue({
	el: '#SER766',
	data: {
		SER766: {
			_profesional: [],
			_servicios: []
		},
		form: {
			anoini_SER766: '',
			mesini_SER766: '',
			diaini_SER766: '',
			anofin_SER766: '',
			mesfin_SER766: '',
			diafin_SER766: '',
			tiposerv_SER766: '',
			descripserv_SER766: '',
			codentidad_SER766: '',
			descripentidad_SER766: '',
			codcosto_SER766: '',
			descripcosto_SER766: '',
			discrimcups_SER766: '',
			grupo_SER766: '',
			descripgrupo_SER766: '',
			codart_SER766: '',
			descripartic_SER766: '',
			discrimpac_SER766: '',
			medico_SER766: '',
			descripmedi_SER766: '',
			operador_SER766: '',
			finalidad_SER766: '',
		},
	},
	created() {
		loader('show')
		_inputControl('disabled');
		nombreOpcion('9-7-C-6-3 - Resumen de citas por mes');
		$_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
		$_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
		$_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
		$_ANO_LNK = 20 + $_FECHA_LNK.substring(0, 2)
		$_MES_LNK = $_FECHA_LNK.substring(2, 4)
		$_DIA_LNK = $_FECHA_LNK.substring(4, 6)
		$_NITUSU = $_USUA_GLOBAL[0].NIT;
		$_FECHAACTUAL = moment().format('YYYYMMDD');
		$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
		$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
		$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);
		$_this = this
		if ($_USUA_GLOBAL[0].NIT == '0800156469') {
			$_this.SER766.SERVICIOS = [
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
			$_this.SER766.SERVICIOS = [
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
		$_this.SER766.FINALIDAD = [
			{ COD: '0', DESCRIPCION: '' },
			{ COD: '1', DESCRIPCION: 'ATENCION PARTO' },
			{ COD: '2', DESCRIPCION: 'ATENCION REC.NACID' },
			{ COD: '3', DESCRIPCION: 'ATENC.PLANIF.FAMIL' },
			{ COD: '4', DESCRIPCION: 'DET.ALT CRECIM <10' },
			{ COD: '5', DESCRIPCION: 'DET.ALT.DESA.JOVEN' },
			{ COD: '6', DESCRIPCION: 'DET.ALT.EMBARAZO' },
			{ COD: '7', DESCRIPCION: 'DET.ALT. ADULTO' },
			{ COD: '8', DESCRIPCION: 'DET.ALT.AGUD.VISUA' },
			{ COD: '9', DESCRIPCION: 'DET.ENFERM.PROFES' },
			{ COD: '10', DESCRIPCION: 'NO APLICA' },
			{ COD: '11', DESCRIPCION: 'PATOLOGIA CRONICA' },
		]
		obtenerDatosCompletos({
			nombreFd: 'ENTIDADES'
		}, function (data) {
			$_this.SER766.ENTIDADES = data.ENTIDADES
			$_this.SER766.ENTIDADES.pop()
			obtenerDatosCompletos({
				nombreFd: 'COSTOS'
			}, function (data) {
				$_this.SER766.COSTO = data.COSTO;
				$_this.SER766.COSTO.pop();
				obtenerDatosCompletos({
					nombreFd: 'GRUPO-SER'
				}, function (data) {
					$_this.SER766.GRUPOSER = data.CODIGOS;
					$_this.SER766.GRUPOSER.pop();
					obtenerDatosCompletos(
						{
							nombreFd: "OPERADOR",
						},
						function (data) {
							$_this.SER766.OPERADOR = data.ARCHREST;
							$_this.SER766.OPERADOR.pop();
						})
				})
			})
		});
		loader('hide')
		this._evaluarfechaini_SER766('1')
	},
	methods: {
		_evaluarfechaini_SER766(orden) {
			this.form.anoini_SER766 = $_ANO_LNK
			this.form.mesini_SER766 = $_MES_LNK
			this.form.diaini_SER766 = '01'
			validarInputs(
				{
					form: "#fechaInicial_SER766",
					orden: orden
				},
				() => { _toggleNav() },
				() => {
					if (this.form.anoini_SER766.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._validarfecha_SER766('1');
					} else {
						if (this.form.mesini_SER766.trim() == '' || this.form.mesini_SER766 < 01 || this.form.mesini_SER766 > 12) {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._validarfecha_SER766('2');
						} else {
							if (this.form.diaini_SER766.trim() == '' || this.form.diaini_SER766 < 01 || this.form.diaini_SER766 > 31) {
								CON851('', 'dia incorrecto! ', this._validarfecha_SER766('3'), 'error', 'error');
							} else {
								this.SER766.FECHAINIW = this.form.anoini_SER766 + this.form.mesini_SER766 + this.form.diaini_SER766
								postData({ datosh: datosEnvio() + '1|' + this.SER766.FECHAINIW + "|" }, get_url("APP/SALUD/SER766.DLL"))
									.then(data => {
										console.log(data, 'PASO 1 ')
										this._evaluarfechafin_SER766('1')
									})
									.catch(err => {
										console.error(err)
										this._evaluarfechaini_SER766('1')
									});
							}
						}
					}
				}
			)
		},
		_evaluarfechafin_SER766(orden) {
			this.form.anofin_SER766 = $_ANO_LNK
			this.form.mesfin_SER766 = $_MES_LNK
			this.form.diafin_SER766 = $_DIA_LNK
			validarInputs(
				{
					form: "#fechaFinal_SER766",
					orden: orden
				},
				() => { this._evaluarfechaini_SER766() },
				() => {
					if (this.form.anofin_SER766.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._evaluarfechafin_SER766('1');
					} else {
						if (this.form.mesfin_SER766.trim() == '' || this.form.mesfin_SER766 < 01 || this.form.mesfin_SER766 > 12) {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._evaluarfechafin_SER766('2');
						} else {
							if (this.form.diafin_SER766.trim() == '' || this.form.diafin_SER766 < 01 || this.form.diafin_SER766 > 31) {
								CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER766('3'), 'error', 'error');
							} else {
								this.FECHAFINW = this.form.anofin_SER766 + this.form.mesfin_SER766 + this.form.diafin_SER766
								if (this.FECHAFINW < this.SER766.FECHAINIW) {
									CON851('37', '37', this._evaluarfechafin_SER766('3'), 'error', 'error');
								} else {
									this._evaluarservicio_SER766()
								}
							}
						}
					}
				}
			)
		},
		_evaluarservicio_SER766() {
			if (this.form.tiposerv_SER766.trim() == '') this.form.tiposerv_SER766 = '*'
			validarInputs(
				{
					form: "#validarservicio_SER766",
					orden: '1'
				},
				() => { this._evaluarfechafin_SER766('3') },
				() => {
					if (this.form.tiposerv_SER766 == '*') {
						this.form.descripserv_SER766 = 'TODOS LOS TIPOS'
						this._evaluarentidad_SER766()
					} else {
						let clases = $_this.SER766.SERVICIOS;
						let array = clases.filter(x => x.COD == this.form.tiposerv_SER766);
						if (array.length > 0) {
							this.form.descripserv_SER766 = array[0].DESCRIPCION
							this._evaluarentidad_SER766()
						} else {

							CON851('03', '03', this._evaluartiposervicio_SER766(), 'error', 'error');

						}
					}
				}
			)
		},
		_evaluarentidad_SER766() {
			if (this.form.codentidad_SER766.trim() == '') this.form.codentidad_SER766 = '******'
			validarInputs(
				{
					form: "#validarentidad_SER766",
					orden: '1'
				},
				() => { this._evaluarservicio_SER766() },
				() => {
					this.form.codentidad_SER766 = this.form.codentidad_SER766.toUpperCase();
					if (this.form.codentidad_SER766 == '******') {
						this.form.descripentidad_SER766 = 'TODAS LAS ENTIDADES'
						this._evaluarcosto_SER766()
					} else {
						const res = this.SER766.ENTIDADES.find(e => e['COD-ENT'] == this.form.codentidad_SER766);
						if (res == undefined) {
							CON851("01", "01", this._evaluarentidad_SER766(), "error", "error");
						} else {
							this.form.descripentidad_SER766 = res['NOMBRE-ENT'];
							this._evaluarcosto_SER766()
						}
					}
				}
			)
		},
		_evaluarcosto_SER766() {
			if (this.form.codcosto_SER766.trim() == '') this.form.codcosto_SER766 = '****'
			validarInputs(
				{
					form: "#validarcosto_SER766",
					orden: '1'
				},
				() => { this._evaluarentidad_SER766() },
				() => {
					this.form.codcosto_SER766 = this.form.codcosto_SER766.padStart(4, "0")
					if (this.form.codcosto_SER766 == '****') {
						this.form.descripcosto_SER766 = 'TODAS LOS COSTOS'
						this._evaluardescripcups_SER766()
					} else {
						const res = this.SER766.COSTO.find(e => e.COD == this.form.codcosto_SER766);
						if (res == undefined) {
							CON851("01", "01", this._evaluarcosto_SER766(), "error", "error");
						} else {
							this.form.descripcosto_SER766 = res.NOMBRE
							this._evaluardescripcups_SER766()
						}
					}
				}
			)
		},
		_evaluardescripcups_SER766() {
			if (this.form.discrimcups_SER766.trim() == '') this.form.discrimcups_SER766 = 'N'
			validarInputs(
				{
					form: "#validardiscriminar_SER766",
					orden: '1'
				},
				() => { this._evaluarcosto_SER766() },
				() => {
					this.form.discrimcups_SER766 = this.form.discrimcups_SER766.toUpperCase();
					if (this.form.discrimcups_SER766 == 'S' || this.form.discrimcups_SER766 == 'N') {
						if (this.form.discrimcups_SER766 == 'S') {
							this.form.discrimpac_SER766 = 'N'
							this._aceptargrupo_SER766()
						} else {
							this._evaluarpaciente_SER766()
						}
					} else {
						this._evaluarpaciente_SER766()
					}
				}
			)
		},
		_evaluarpaciente_SER766() {
			if (this.form.discrimpac_SER766.trim() == '') this.form.discrimpac_SER766 = 'N'
			this.form.grupo_SER766 = ""
			this.form.codart_SER766 = ""
			validarInputs(
				{
					form: "#validardiscripac_SER766",
					orden: '1'
				},
				() => { this._evaluardescripcups_SER766() },
				() => {
					this.form.discrimpac_SER766 = this.form.discrimpac_SER766.toUpperCase();
					if (this.form.discrimpac_SER766 == 'S' || this.form.discrimpac_SER766 == 'N') {
						this._aceptargrupo_SER766()
					} else {
						this._evaluarpaciente_SER766()
					}
				}
			)
		},
		_aceptargrupo_SER766() {
			if (this.form.tiposerv_SER766 == '*') {
				this.form.grupo_SER766 = "**"
				this.form.descripgrupo_SER766 = 'TODOS LOS GRUPOS'
				this.form.codart_SER766 = "*"
				this.form.descripartic_SER766 = 'TODOS LOS CUPS'
				this._evaluarmedico_SER766()
			} else {
				if (this.form.grupo_SER766.trim() == '') this.form.grupo_SER766 = "**"
				validarInputs(
					{
						form: "#validargrupos_SER766",
						orden: '1'
					},
					() => { this._evaluarpaciente_SER766() },
					() => {
						if (this.form.grupo_SER766.trim() == '') {
							this._aceptargrupo_SER766()
						} else {
							if (this.form.grupo_SER766 == '**') {
								this.form.descripgrupo_SER766 = 'TODOS LOS GRUPOS'
								this._evaluarcodigo_SER766()
							} else {
								const res = this.SER766.GRUPOSER.find(e => e.COD == this.form.grupo_SER766);
								if (res == undefined) {
									CON851("01", "01", this._aceptargrupo_SER766(), "error", "error");
								} else {
									this.form.descripgrupo_SER766 = res.NOMBRE
									this._evaluarcodigo_SER766()
								}
							}
						}
					}
				)
			}
		},
		_evaluarcodigo_SER766() {
			if (this.form.codart_SER766.trim() == '') this.form.codart_SER766 == '*'
			validarInputs(
				{
					form: "#validararticulo_SER766",
					orden: '1'
				},
				() => { this._evaluardescripcups_SER766() },
				() => {
					this.form.codart_SER766 = this.form.codart_SER766.toUpperCase();
					if (this.form.codart_SER766 == '*') {
						this.form.descripartic_SER766 = ''
						this._evaluarmedico_SER766()
					} else {
						this.SER766.CODTAB = 'SO'
						this.SER766.TIPOTAB = this.form.tiposerv_SER766
						this.SER766.GRUPOTAB = this.form.grupo_SER766
						this.SER766.CODART = this.form.codart_SER766
						postData({ datosh: datosEnvio() + '2||' + this.SER766.CODTAB + this.SER766.TIPOTAB + this.SER766.GRUPOTAB + this.SER766.CODART + '|' }, get_url("APP/SALUD/SER766.DLL"))
							.then(data => {
								console.log(data, 'PASO 2 ')
								this.form.descripartic_SER766 = data
								this._evaluarmedico_SER766()
							})
							.catch(err => {
								console.error(err)
								this._evaluarcodigo_SER766()
							});
					}
				}
			)
		},
		_evaluarmedico_SER766() {
			if (this.form.medico_SER766.trim() == '') this.form.medico_SER766 = '99'
			validarInputs(
				{
					form: "#validarmedico_SER766",
					orden: '1'
				},
				() => { this._evaluardescripcups_SER766() },
				() => {

					if (this.form.medico_SER766 == '99') {
						this.form.descripmedi_SER766 = 'TODOS LOS MEDICOS'
						this._evaluaroperador_SER766()
					} else {
						this.form.medico_SER766 = this.form.medico_SER766.padStart(10, '0')
						postData({ datosh: datosEnvio() + '3|||||||||||' + this.form.medico_SER766 + '|' }, get_url("APP/SALUD/SER766.DLL"))
							.then(data => {
								console.log(data, 'PASO 3 ')
								this.form.descripmedi_SER766 = data
								this._evaluaroperador_SER766()
							})
							.catch(err => {
								console.error(err)
								this.form.descripmedi_SER766 = 'MEDICO NO EXISTE'
								this._evaluaroperador_SER766()
							});
					}
				}
			)
		},
		_evaluaroperador_SER766() {
			if (this.form.operador_SER766.trim() == '') this.form.operador_SER766 = '****'
			validarInputs(
				{
					form: "#validaroperador_SER766",
					orden: '1'
				},
				() => { this._evaluarmedico_SER766() },
				() => {
					this.form.operador_SER766 = this.form.operador_SER766.toUpperCase();
					if (this.form.operador_SER766 == '****') {
						this.form.descripoperador_SER766 = 'TODOS LOS OPERADORES'
						this._evaluarfinalidad_SER766()
					} else {
						let URL = get_url("APP/CONTAB/CON003.DLL");
						postData({ datosh: datosEnvio() + this.form.operador_SER766 + '|' }, URL)
							.then(data => {
								console.log(data)
								date = data.split('|');
								this.SER766.NOMOPER = date[0].trim()
								this.form.descripoperador_SER766 = this.SER766.NOMOPER
								this.SER766.NOMOPER2 = this.SER766.NOMOPER.substring(1, 30)
								if (this.SER766.NOMOPER2.trim() == '') {
									CON851("01", "01", this._evaluaroperador_SER766(), "error", "error");
								} else {
									this._evaluarfinalidad_SER766()
								}
							})
							.catch(err => {
								console.debug(err);
								this._evaluaroperador_SER766()
							})
					}
				}
			)
		},
		_evaluarfinalidad_SER766() {
			this.form.finalidad_SER766 = '99'
			validarInputs(
				{
					form: "#validarfinalidad_SER766",
					orden: '1'
				},
				() => { this._evaluaroperador_SER766() },
				() => {
					if (this.form.finalidad_SER766 == '99') {
						this.form.descripfinalidad_SER766 = 'TODAS LAS FINALIDADES'
						this._evaluarlistado_SER766()
					} else {
						let finalidad = $_this.SER766.FINALIDAD;
						let array = finalidad.filter(x => x.COD == this.form.finalidad_SER766);
						if (array.length > 0) {
							this.form.descripfinalidad_SER766 = array[0].DESCRIPCION
							this._evaluarlistado_SER766()
						} else {
							CON851('03', '03', this._evaluarfinalidad_SER766(), 'error', 'error');
						}
					}
				}
			)
		},
		_evaluarlistado_SER766() {
			loader('show')
			let URL = get_url("APP/SALUD/SER766.DLL");
			postData({ datosh: datosEnvio() + '4|' + this.SER766.FECHAINIW + '|' + this.SER766.CODTAB + this.SER766.TIPOTAB + this.SER766.GRUPOTAB + this.SER766.CODART + '|' + this.FECHAFINW + '|' + this.form.tiposerv_SER766 + '|' + this.form.codentidad_SER766 + '|' + this.form.codcosto_SER766 + '|' + this.form.discrimcups_SER766 + '|' + this.form.grupo_SER766 + '|' + this.form.codart_SER766 + '|' + this.form.discrimpac_SER766 + '|' + this.form.medico_SER766 + '|' + this.form.operador_SER766 + '|' + this.form.finalidad_SER766 + '|' }, URL)
				.then(data => {
					console.log(data, 'IMPRESION')
					data = data.CITASMES;
					data.pop()
					loader('hide')
					if (data.length < 1) CON851('', 'No tiene ninguna cita en este intervalo', _evaluarfinalidad_SER766(), 'error', 'Error')
					columnas = [
						{
							title: "TIPO ID",
							value: 'TIPO_ID',

						},
						{
							title: "ID PACIENTE",
							value: 'PACI',

						},
						{
							title: "1ERAPEL PACIENTE",
							value: 'APEL1_PACI',
							format: 'string'
						},
						{
							title: "2DOAPEL PACIENTE",
							value: 'APEL2_PACI',
							format: 'string'
						},
						{
							title: "1ERNOMB PACIENTE",
							value: 'NOM1_PACI',
							format: 'string'
						},
						{
							title: "2DONOMB PACIENTE",
							value: 'NOM2_PACI',
							format: 'string'
						},
						{
							title: "TIPO",
							value: 'TIPO_AFIL',
						},
						{
							title: "NOMBRE DEL MEDICO",
							value: 'NOM_TEM',
						},
						{
							title: "NRO DE CITAS",
							value: 'CITAS',
							totalsRowFunction: 'sum'
						},
						{
							title: "ASISTIDAS",
							value: 'ASIST',
							totalsRowFunction: 'sum'
						},
						{
							title: "INASISTIDAS",
							value: 'INASI',
							totalsRowFunction: 'sum'
						},
						{
							title: "CANCELADAS",
							value: 'CANCE',
							totalsRowFunction: 'sum'
						},
						{
							title: "CONTROLES",
							value: 'CONTR',
							totalsRowFunction: 'sum'
						},
						{
							title: "PRA VEZ",
							value: 'PRAVEZ',
							totalsRowFunction: 'sum'
						},
						{
							title: "REPETIDA",
							value: 'REPET',
							totalsRowFunction: 'sum'
						},
						{
							title: "PRIORITARIA",
							value: 'PRIOR',
							totalsRowFunction: 'sum'
						},
						{
							title: "HORA CITA",
							value: 'HORA_CIT',
							format: 'string'
						},
						{
							title: "FECHA CITA",
							value: 'FECHA_CIT',
							format: 'fecha'
						},
						{
							title: "HORA ATENC MEDICA",
							value: 'HORA_ATEN',
							format: 'string'
						},
						{
							title: "FECHA ATENC MEDICA",
							value: 'FECHA_EGRE',
							format: 'fecha'
						},
						{
							title: "HORA FACT",
							value: 'HORA_FACT',
							format: 'string'
						},
						{
							title: "FECHA FACT",
							value: 'FECHA_FACT',
							format: 'fecha'
						},
						{
							title: "COMPROBANTE",
							value: 'COMPROBANTE',
							format: 'string'
						},
						{
							title: "FACTURADO",
							value: 'ESTADO_FACT',
							format: 'string'
						},
						{
							title: "HORA FINAL ATENC MEDICA",
							value: 'HORAFINATEN',
							format: 'string'
						},
						{
							title: "FECHA FINAL ATENC MEDICA",
							value: 'FECHA_HC',
							format: 'fecha'
						},
						{
							title: "DIAGNOSTICO",
							value: 'DIAG',
						},

						{
							title: "OPERADOR",
							value: 'OPER',
						},
						{
							title: "SEXO",
							value: 'SEXO',
						},
						{
							title: "EDAD",
							value: 'EDAD',
						},
						{
							title: "DIRECCION",
							value: 'DIRECC',
						},
						{
							title: "TELEFONO",
							value: 'TEL_PACI',
						},
						{
							title: "FINALIDAD",
							value: 'FINA',
						},
						{
							title: "EPS PACIE",
							value: 'EPS',
						},
						{
							title: "NOMBRE ENTIDAD",
							value: 'NOMEPS_PACI',
						},
						{
							title: "CUPS",
							value: 'CUP',
						},
						{
							title: "DESCRIP CUPS",
							value: 'NOM_CUP',
						},
						{
							title: "UNID. SERV",
							value: 'UNSERV',
						},
						{
							title: "FECHA NACIM",
							value: 'FECHA_NACI',
							format: 'fecha'
						},
						{
							title: "ACOMP PACIE",
							value: 'ACOMP_PAC',
						},
						{
							title: "ENTIDAD FACT PAC",
							value: 'DESCRIPFACT',
						},
						{
							title: "MODALIDAD",
							value: 'DESCRIPZONA_TER',
						},
						{
							title: "CIUDAD PACIE",
							value: 'CIU_PACI',
						},
						{
							title: "SUCURSAL",
							value: 'SUC',
						},
						{
							title: "VIA ASIG",
							value: 'TIPO_CITA',
						},
						{
							title: "MOTIVO CANCELACION",
							value: 'CAUSA_CITA',
						},
						{
							title: "REGIMEN",
							value: 'REG_PACI',
						},
						{
							title: "SINTOMASERA",
							value: 'SINTOMAERA',
						},
						{
							title: "CONTACTOCOVID19",
							value: 'CONTCOVID',
						},
						{
							title: "FIEBRE 38 14 DIAS",
							value: 'FIEBRECOVID',
						},
						{
							title: "PROBLEMA DIGES",
							value: 'DIGESCOVID',
						},
						{
							title: "C-19 CASANCIO",
							value: 'CANSANCOVID',
						},
						{
							title: "PERDIDA GUS OLFA",
							value: 'GUSTOCOVID',
						},
						{
							title: "PRESENTE C-19",
							value: 'ENFCOVID',
						},
						{
							title: "SIGUE EN CUARENTENA",
							value: 'CUARCOVID',
						},
						{
							title: "SIGUE EN CUARENTENA",
							value: 'CUARCOVID',
						},
						
					]
					_impresion2({
						tipo: 'excel',
						header: [
							{ text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
							`RESUMEN DE CITAS DESDE EL DIA ${this.form.anoini_SER766}/${this.form.mesini_SER766.padStart(2, '0')}/${this.form.diaini_SER766.substring(2, '0')} HASTA EL DIA ${this.form.anofin_SER766}/${this.form.mesfin_SER766.padStart(2, '0')}/${this.form.diafin_SER766.substring(2, '0')}`,
							`PROFESIONAL QUE ATIENDE:${this.form.descripmedi_SER766}`
						],
						logo: `${$_USUA_GLOBAL[0].NIT}.png`,
						ruta_logo: 'P:\\PROG\\LOGOS\\',
						tabla: {
							columnas,
							data: data,
							totalsRow: true
						},
						archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
						scale: 65,
						orientation: 'landscape'
					})
						.then(() => {
							CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
							console.log('aca')
							_toggleNav();
						})
						.catch(() => {
							CON851('', 'Hubo un error en la impresión', this._evaluarfinalidad_SER766(), 'error', 'Error')
						})
				})
				.catch(err => {
					console.error(err);
					CON851('', 'Error de la impresión ', null, 'error', 'error');
					this._evaluarfinalidad_SER766()
				})
		},

		_f8servicio_SER766() {
			var $_this = this;
			console.log($_this.SER766.SERVICIOS)
			_ventanaDatos({
				titulo: "TIPO DE SERVICIO",
				columnas: ["COD", "DESCRIPCION"],
				data: $_this.SER766.SERVICIOS,
				callback_esc: function () {
					$(".servicios_SER766").focus();
				},
				callback: function (data) {
					$_this.form.tiposerv_SER766 = (data.COD)
					_enterInput('.servicios_SER766');
				}
			});

		},
		_f8entidad_SER766() {
			var $_this = this;
			_ventanaDatos({
				titulo: 'VENTANA DE ENTIDADES',
				columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
				data: $_this.SER766.ENTIDADES,
				callback_esc: function () {
					$(".entidades_SER766").focus();
				},
				callback: function (data) {
					$_this.form.codentidad_SER766 = data["COD-ENT"]
					_enterInput('.entidades_SER766');
				}
			});
		},
		_f8costos_SER766() {
			var $_this = this;
			_ventanaDatos({
				titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
				columnas: ["COD", "NOMBRE"],
				data: $_this.SER766.COSTO,
				callback_esc: function () {
					$(".costo_SER766").focus();
				},
				callback: function (data) {
					$_this.form.codcosto_SER766 = data.COD.trim();
					_enterInput(".costo_SER766");
				},
			});
		},
		_f8grupos_SER766() {
			var $_this = this;
			_ventanaDatos({
				titulo: "VENTANA DE GRUPOS DE SERVICIOS",
				columnas: ["COD", "DESCRIP"],
				data: $_this.SER766.GRUPOSER,
				callback_esc: function () {
					$(".grupo_SER766").focus();
				},
				callback: function (data) {
					$_this.form.grupo_SER766 = data.COD.trim()
					_enterInput('.grupo_SER766');
				}
			});
		},

		_f8profesionales_SER766() {
			var $_this = this;
			let URL = get_url("APP/" + "SALUD/SER819" + ".DLL");
			postData({
				datosh: datosEnvio() + localStorage['Usuario'] + "|"
			}, URL)
				.then((data) => {
					loader("hide");
					$_this.SER766.PROFES = data;
					$_this.SER766.PROFES.ARCHPROF.pop();
					_ventanaDatos({
						titulo: "VENTANA DE PROFESIONALES",
						columnas: ["NOMBRE", "IDENTIFICACION"],
						data: $_this.SER766.PROFES.ARCHPROF,
						callback_esc: function () {
							$(".medico_SER766").focus()
						},
						callback: function (data) {
							$_this.form.medico_SER766 = data.IDENTIFICACION.trim();
							_enterInput('.medico_SER766');
						}
					});
				})
				.catch((error) => {
					console.log(error)
				});
		},
		_f8operador_SER766() {
			var $_this = this;
			_ventanaDatos({
				titulo: "GRUPOS DE OPERADORES",
				columnas: ["CODIGO", "DESCRIPCION", "ID"],
				data: $_this.SER766.OPERADOR,
				callback_esc: function () {
					$(".operador_SER766").focus();
				},
				callback: function (data) {
					$_this.form.operador_SER766 = data.CODIGO.trim();
					_enterInput(".operador_SER766");
				},
			});
		},

		_f8finalidad_SER766() {
			var $_this = this;
			_ventanaDatos({
				titulo: "VENTANA DE FINALIDAD",
				columnas: ["COD", "DESCRIPCION"],
				data: $_this.SER766.FINALIDAD,
				callback_esc: function () {
					$(".finalidad_SER766").focus()
				},
				callback: function (data) {
					$_this.form.finalidad_SER766 = data.COD.trim();
					_enterInput('.finalidad_SER766');
				}
			});
		},


	}
})
