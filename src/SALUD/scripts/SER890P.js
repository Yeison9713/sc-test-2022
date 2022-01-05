// 20/07/2020 - - DIANA ESCOBAR: CREADO 
new Vue({
	el: '#ser890p',
	data: {
		ser890p: {
			_profesional: [],
			_servicios: []
		},
		form: {
			cedmedico_SER890P: '',
			descripmedi_SER890P: '',
			anoini_SER890P: '',
			mesini_SER890P: '',
			diaini_SER890P: '',
			anofin_SER890P: '',
			mesfin_SER890P: '',
			diafin_SER890P: '',
			jornada_SER890P: '',
			tipofact_SER890P: '',
			imprimirfact_SER890P: '',
			salacirug_SER890P: '',
			tipoform_SER890P: '',
			observac_SER890P: '',
			cotizante_SER890P: '',
		},
		$_FORMATO890P: null,
		$_DIAMAX: null,
		$_TIPOW: null,
		$_FACTW: null,
		$_SWCOTIZ: null,
		$_FORMATOW: null,
		$_SWOBSER: null,
	},
	created() {
		loader('show')
		_inputControl('disabled');
		nombreOpcion('9-7-C-1-6 - Impresion de citas medicas');
		$_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
		$_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
		$_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
		$_ANO_LNK = $_FECHA_LNK.substring(0, 2)
		$_MES_LNK = $_FECHA_LNK.substring(2, 4)
		$_DIA_LNK = $_FECHA_LNK.substring(4, 6)
		$_NITUSU = $_USUA_GLOBAL[0].NIT; 
		$_FECHAACTUAL = moment().format('YYYYMMDD');
		$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
		$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
		$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);
		this._consultaprofesionales_SER890P();
		let Window = BrowserWindow.getAllWindows();
		if (Window.length > 1) {
			this.form.cedmedico_SER890P = $_MESSAGE[2].medico;
			this.form.anoini_SER890P = $_MESSAGE[2].ano;
			this.form.mesini_SER890P = $_MESSAGE[2].mes;
			this.form.diaini_SER890P = $_MESSAGE[2].dia;
		}
	},
	methods: {
		_consultaprofesionales_SER890P() {
			$_this = this;
			obtenerDatosCompletos({
				nombreFd: 'PROFESIONALES'
			}, function (data) {
				$_this.ser890p._profesional = data.ARCHPROF
				$_this.ser890p._profesional.pop();
				obtenerDatosCompletos({
					nombreFd: 'SERVICIOS'
				}, function (data) {
					$_this.ser890p._servicios = data.SERVICIOS
					loader('hide')
					$_this._validarmedico_SER890P();
				})
			})
		},
		_validarmedico_SER890P() {
			validarInputs(
				{
					form: "#validarmedico_890P",
					orden: '1'
				},
				() => { 
						let Window = BrowserWindow.getAllWindows();
						if (Window.length > 1) {
							_cerrarSegundaVentana();
						} else {
							_toggleNav();
						}
				},
				() => {
					let Window = BrowserWindow.getAllWindows();
					if (Window.length < 2) {
						this.form.anoini_SER890P = 20 + $_ANO_LNK;
						this.form.mesini_SER890P = $_MES_LNK;
						this.form.diaini_SER890P = $_DIAACTUAL;
					}
					if (this.form.cedmedico_SER890P == 99) {
						this.form.descripmedi_SER890P = 'TODOS';
						return this._validarfecha_SER890P('1');
					}

					var medico = this.form.cedmedico_SER890P.padStart(10, '');
					const res = this.ser890p._profesional.find(e => e.IDENTIFICACION == medico);
					if (res == undefined) {
						CON851('01', '01', null, 'error', 'error');
						return this._validarmedico_SER890P();
					}

					this.form.descripmedi_SER890P = res.NOMBRE;
					return this._validarfecha_SER890P('1');
				}
			)
		},
		_validarfecha_SER890P(orden) {
			validarInputs(
				{
					form: "#fechaInicial_890P",
					orden: orden
				},
				() => { this._validarmedico_SER890P(); },
				() => {

					if (this.form.anoini_SER890P.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._validarfecha_SER890P('1');
					} else {
						if (this.form.mesini_SER890P.trim() == '') {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._validarfecha_SER890P('2');
						} else {
							switch (this.form.mesini_SER890P) {
								case 01:
									$_DIAMAX = '31';
									break;
								case 02:
									$_DIAMAX = '29';
									break;
								case 03:
									$_DIAMAX = '31';
									break;
								case 04:
									$_DIAMAX = '30';
									break;
								case 05:
									$_DIAMAX = '31';
									break;
								case 06:
									$_DIAMAX = '30';
									break;
								case 07:
									$_DIAMAX = '31';
									break;
								case 08:
									$_DIAMAX = '31';
									break;
								case 09:
									$_DIAMAX = '30';
									break;
								case 10:
									$_DIAMAX = '31';
									break;
								case 11:
									$_DIAMAX = '30';
									break;
								case 12:
									$_DIAMAX = '31';
									break;
								default:
									$_DIAMAX = '31';
									break;
							}
							if (this.form.diaini_SER890P.trim() == '') {
								CON851('', 'Dia incorrecto! ', null, 'error', 'error');
								this._validarfecha_SER890P('3');
							} else {
								if ((this.form.diaini_SER890P < 1) || (this.form.diaini_SER890P > $_DIAMAX)) {
									CON851('', 'Dia incorrecto! ', null, 'error', 'error');
									this._validarfecha_SER890P('3');
								} else {
									this.form.anofin_SER890P = this.form.anoini_SER890P;
									this.form.mesfin_SER890P = this.form.mesini_SER890P;
									this.form.diafin_SER890P = this.form.diaini_SER890P;
									this._validarfechafin_SER890P('1');
								}
							}
						}
					}
				}
			)
		},
		_validarfechafin_SER890P(orden) {
			validarInputs(
				{
					form: "#fechaFinal_890P",
					orden: orden
				},
				() => {
					this._validarfecha_SER890P('3');
				},
				() => {
					if (this.form.anofin_SER890P.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._validarfechafin_SER890P('1');
					} else {
						if (this.form.mesfin_SER890P.trim == '') {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._validarfechafin_SER890P('2');
						} else {
							switch (this.form.mesfin_SER890P) {
								case 01:
									$_DIAMAX = '31';
									break;
								case 02:
									$_DIAMAX = '29';
									break;
								case 03:
									$_DIAMAX = '31';
									break;
								case 04:
									$_DIAMAX = '30';
									break;
								case 05:
									$_DIAMAX = '31';
									break;
								case 06:
									$_DIAMAX = '30';
									break;
								case 07:
									$_DIAMAX = '31';
									break;
								case 08:
									$_DIAMAX = '31';
									break;
								case 09:
									$_DIAMAX = '30';
									break;
								case 10:
									$_DIAMAX = '31';
									break;
								case 11:
									$_DIAMAX = '30';
									break;
								case 12:
									$_DIAMAX = '31';
									break;
								default:
									$_DIAMAX = '31';
									break;
							}
							if (this.form.diafin_SER890P.trim() == '') {
								CON851('', 'Dia incorrecto! ', null, 'error', 'error');
								this._validarfechafin_SER890P('3');
							} else {
								if ((this.form.diafin_SER890P < 1) || (this.form.diafin_SER890P > $_DIAMAX)) {
									CON851('', 'Dia incorrecto! ', null, 'error', 'error');
									this._validarfechafin_SER890P('3');
								} else {
									this._validarjornada_SER890P();
								}
							}
						}
					}
				}
			)
		},
		_validarjornada_SER890P() {
			if (this.form.jornada_SER890P.trim() == ''){
				this.form.jornada_SER890P = '*';
			}
			validarInputs(
				{
					form: "#validarjornada_890P",
					orden: '1'
				},
				() => { this._validarfechafin_SER890P('3') },
				() => {
					this.form.jornada_SER890P = this.form.jornada_SER890P.toUpperCase()
					if ((this.form.jornada_SER890P == 'M') || (this.form.jornada_SER890P == 'T') || (this.form.jornada_SER890P == '*')) {
						switch ($_NITUSU) {
							case 830092718:
								$_TIPOW = 3;
								$_FACTW = 'N';
								$_SWCOTIZ = 'N';
								$_FORMATOW = '1';
								$_SWOBSER = 'S';
								break;
							case 800156469:
								$_TIPOW = 3;
								break;
							default:
								$_TIPOW = '*';
								break;
						}
						this._validartipofact_SER890P();
					} else {
						CON851('', 'Dato incorrecto! ', null, 'error', 'error');
						this._validarjornada_SER890P();
					}
				}
			)

		},
		_validartipofact_SER890P() {
			if (this.form.tipofact_SER890P.trim() == ''){
				this.form.tipofact_SER890P = '*'
			} else {
				this.form.tipofact_SER890P = this.form.tipofact_SER890P.substring(0,1);
			}
			validarInputs(
				{
					form: "#validartipofact_890P",
					orden: '1'
				},
				() => { this._validarjornada_SER890P() },
				() => {
					var tiposerv = this.form.tipofact_SER890P;
					if (tiposerv == '*') {
						this._validarfact_SER890P();
					} else {
						const res = this.ser890p._servicios.find(e => e.COD == tiposerv);
						if (res == undefined) {
							CON851('03', '03', null, 'error', 'error');
							this._validartipofact_SER890P();
						} else {
							$_this1 = this;
							this.form.tipofact_SER890P = tiposerv + ' - ' + res.DESCRIPCION;
							$_this1._validarfact_SER890P();
						}
					}
				}
			)
		},
		_validarfact_SER890P() {
			if (this.form.imprimirfact_SER890P.trim() == '') {
				this.form.imprimirfact_SER890P == 'S'
			}
			validarInputs(
				{
					form: "#validarimprimir_890P",
					orden: '1'
				},
				() => { this._validartipofact_SER890P() },
				() => {
					this.form.imprimirfact_SER890P = this.form.imprimirfact_SER890P.toUpperCase()
					if ((this.form.imprimirfact_SER890P == 'S') || (this.form.imprimirfact_SER890P == 'N')) {
						this._validarcirugia_SER890P();
					} else {
						CON851('', 'Dato incorrecto! ', null, 'error', 'error');
						this._validarfact_SER890P();
					}
				}
			)

		},
		_validarcirugia_SER890P() {
			if (this.form.salacirug_SER890P.trim() == ''){
				this.form.salacirug_SER890P = '**';
			}
			validarInputs(
				{
					form: "#validarcirugia_890P",
					orden: '1'
				},
				() => { this._validarfact_SER890P() },
				() => {
					if (this.form.salacirug_SER890P == '**') {
						this._validartipoform_SER890P();
					} else {
						CON851('', 'Dato incorrecto! ', null, 'error', 'error');
						this._validarcirugia_SER890P();
					}
				}
			)
		},
		_validartipoform_SER890P() {
			var tipoformato = [{ "COD": "1", "DESCRIP": "CIRUG." },
			{ "COD": "3", "DESCRIP": "IMAGEN" },
			{ "COD": "4", "DESCRIP": "OTROS" },
			{ "COD": "5", "DESCRIP": "CONSUL" },
			{ "COD": "7", "DESCRIP": "P Y P" },
			{ "COD": "T", "DESCRIP": "TODOS" }]
			POPUP({
				array: tipoformato,
				titulo: 'TIPO IMPRESIÓN',
				indices: [{
					id: 'COD',
					label: 'DESCRIP'
				}],
				teclaAlterna: true,
				callback_f: () => {
					this._validarcirugia_SER890P()
				}
			},
				(tipoformato) => {
					console.log(tipoformato)
					if (tipoformato.COD == 'T') tipoformato.COD = '*'
					this.form.tipoform_SER890P = tipoformato.COD + " - " + tipoformato.DESCRIP
					switch (tipoformato.COD) {
						case '1':
						case '3':
						case '4':
						case '5':
						case '7':
						case '*':
							if (this.form.tipoform_SER890P.substring(0, 1) > 1) {
								this._asignarformato_SER890P();
							} else {
								this._validarobservac_SER890P();
							}
							break;
					}
				});
		},
		_validarobservac_SER890P() {
			validarInputs(
				{
					form: "#validarobservac_890P",
					orden: '1'
				},
				() => { this._validarcirugia_SER890P() },
				() => {
					this.form.observac_SER890P = this.form.observac_SER890P.toUpperCase()
					if ((this.form.observac_SER890P == 'S') || (this.form.observac_SER890P == 'N')) {
						this._validarcotizante_SER890P();
					} else {
						CON851('', 'Dato incorrecto! ', null, 'error', 'error');
						this._validarobservac_SER890P();
					}
				}
			)

		},
		_validarcotizante_SER890P() {
			validarInputs(
				{
					form: "#validarcotizante_890P",
					orden: '1'
				},
				() => { this._validarobservac_SER890P },
				() => {
					this.form.cotizante_SER890P = this.form.cotizante_SER890P.toUpperCase()
					if ((this.form.cotizante_SER890P == 'S') || (this.form.cotizante_SER890P == 'N')) {
						this._asignarformato_SER890P();
					} else {
						CON851('', 'Dato incorrecto! ', null, 'error', 'error');
						this._validarcotizante_SER890P();
					}
				}
			)
		},
		_asignarformato_SER890P() {
			let URL = get_url("APP/SALUD/SER890P.DLL");
			postData({ datosh: datosEnvio() + $_ANO_LNK + '|' + this.form.cedmedico_SER890P.padStart(10, '0') + this.form.anoini_SER890P + this.form.mesini_SER890P.padStart(2,'0') + this.form.diaini_SER890P.padStart(2,'0') + '|' + this.form.imprimirfact_SER890P + '|' + this.form.jornada_SER890P + '|' + this.form.tipoform_SER890P.substring(0, 1) + '|' + this.form.salacirug_SER890P + '|' + this.form.anofin_SER890P + this.form.mesfin_SER890P.padStart(2,'0') + this.form.diafin_SER890P.padStart(2,'0') + '|' }, URL)
				.then(data => {
					console.log(data, 'IMPRESION')
					data = data.CITAS;
					data.pop()
					if (data.length < 1) CON851('','No tiene ninguna cita en este intervalo',this._validarcotizante_SER890P(),'error','Error')
					columnas = [
						{
                            title: "FECHA CITA",
							value:'FECHA_CIT',
						},
						{
							title: "HORA CITA",
							value:'HORA_CIT',
							format: 'string'
						},
						{
							title: "MEDICO",
							value:'DESCRIP_PROF',
						},
						{
							title: "PRIMER APELLIDO",
							value:'1ER_APEL',
						},
						{
							title: "SEGUNDO APELLIDO",
							value:'2DO_APEL',
						},
						{
							title: "PRIMER NOMBRE",
							value:'1ER_NOM',
						},
						{
							title: "SEGUNDO NOMBRE",
							value:'2DO_NOM',
						},
						{
							title: "SEXO PACIENTE",
							value:'SEXO_PACI',
						},
						{
							title: "TELEFONO",
							value:'TEL_CIT',
						},
						{
							title: "IDENTIFICACION PACIENTE",
							value:'COD_PACI',
					
						},
						{
							title: "TIPO ID PACIENTE",
							value:'TIPOID_PACI',
						},
						{
							title: "DIRECCION PACIENTE",
							value:'DIRECC_PACI',
						},
						{
							title: "EPS PACI",
							value:'EPS_PACI',
						},
						{
							title: "FECHA NACIMIENTO",
							value:'FECHA_NACI',
						},
						{
							title: "EDAD PACIENTE",
							value:'EDAD',
						},
						{
							title: "NOMBRE ENTIDAD",
							value:'NOMBRE_ENT',
						},
						{
							title: "OPERADOR ELABORO",
							value:'OPERCRE_CIT',
						},
						{
							title: "OPERADOR CORRIGIO",
							value:'OPERCORR_CIT',
						},
					]

					if (this.form.observac_SER890P == "S") {
						columnas.push({ title: "OBSERVACIONES", value:'OBSER_CIT'})
					}

					_impresion2({
						tipo: 'excel',
						// sheetName: 'Listado validación',
						header: [
							{text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold:true, size:16},
							`LISTA DE CITAS DESDE EL DIA ${this.form.anoini_SER890P}/${this.form.mesini_SER890P.padStart(2,'0')}/${this.form.diaini_SER890P.substring(2,'0')} HASTA EL DIA ${this.form.anofin_SER890P}/${this.form.mesfin_SER890P.padStart(2,'0')}/${this.form.diafin_SER890P.substring(2,'0')}`,
							`PROFESIONAL QUE ATIENDE:${this.form.descripmedi_SER890P}`
						],
						logo: `${$_USUA_GLOBAL[0].NIT}.png`,
						ruta_logo: 'P:\\PROG\\LOGOS\\',
						tabla: {
							columnas,
							// totalsRow: true,
							data: data,
							// heightRow: 35,
							// theme: 'TableStyleDark1'
						},
						archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
						scale: 65,
						orientation: 'landscape'
					})
					.then(() => {
								CON851('','Impreso Correctamente',null,'success','Exito')
								console.log('aca')
								let Window = BrowserWindow.getAllWindows();
								if (Window.length > 1) {
									setTimeout(_cerrarSegundaVentana, 1000);
								} else {
									_toggleNav();
								}
					})
					.catch(() => {
								CON851('','Hubo un error en la impresión',this._validarcotizante_SER890P(),'error','Error')
					})
				})
				.catch(err => {
					console.error(err);
					CON851('', 'Error de la impresión ', null, 'error', 'error');
					this._validarcirugia_SER890P();
				})
		},
		_f8Profesionales_SER809P() {
			var $_this = this;
			_ventanaDatos({
				titulo: "VENTANA DE PROFESIONALES",
				columnas: ["NOMBRE", "IDENTIFICACION"],
				data: $_this.ser890p._profesional,
				callback_esc: function () {
					$(".medicos_ser890p").focus()
				},
				callback: function (data) {
					$_this.form.cedmedico_SER890P = data.IDENTIFICACION.trim();
					$_this.form.descripmedi_SER890P = data.NOMBRE.trim();
					_enterInput('.medicos_ser890p');
				}
			});
		},
		_f8clasesserv_SER890P() {
			var $_this = this;
			_ventanaDatos({
				titulo: "TIPO DE SERVICIO",
				columnas: ["COD", "DESCRIPCION"],
				data: $_this.ser890p._servicios,
				callback_esc: function () {
					$(".servicios_ser890p").focus();
				},
				callback: function (data) {
					$_this.form.tipofact_SER890P = data.COD
					// + ' - ' + data.DESCRIP
					_enterInput('.servicios_ser890p');
				}
			});

		}
	}
})
