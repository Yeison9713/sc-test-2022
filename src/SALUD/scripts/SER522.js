// LISTADO DE CARTERA X ACTIVIDAD
// DAVID.M - CREACION - 28/07/2020 - OPCION 9-7-5-G SALUD

var $this;
new Vue({
	el: '#SER522',
	data: {
		_actividades: [],
		form: {
			añoInicial_522: '',
			mesInicial_522: '',
			diaInicial_522: '',
			añoFinal_522: '',
			mesFinal_522: '',
			diaFinal_522: '',
			añoFinalRad_522: '',
			mesFinalRad_522: '',
			diaFinalRad_522: '',
			actividad_SER522: '',
			descripActividad_SER522: '',
			factRad_SER522: '',
			factCanc_SER522: '',
			totalClie_SER522: '',
		}
	},
	created() {
		loader('show')
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-7-5-G - Listado de cartera por orden de actividad > 1800 dias');
		this._cargarActividades();
	},
	watch: {
	},
	methods: {
		datoInicialSER522() {
			this.form.diaInicial_522 = "01";
			this.form.mesInicial_522 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoInicial_522 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.form.diaFinal_522 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesFinal_522 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFinal_522 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.form.diaFinalRad_522 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesFinalRad_522 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFinalRad_522 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.validarFechaInicialSER522('1');
		},
		validarFechaInicialSER522(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaInicial_522',
						orden: orden
					},
					() => {
						_toggleNav()
					},
					() => {
						$this.form.diaInicial_522 = cerosIzq($this.form.diaInicial_522, 2);
						$this.form.mesInicial_522 = cerosIzq($this.form.mesInicial_522, 2);
						$this.fechaInicial = $this.form.añoInicial_522 + $this.form.mesInicial_522 + $this.form.diaInicial_522;
						var diaIni = parseFloat($this.form.diaInicial_522);
						var mesIni = parseFloat($this.form.mesInicial_522);
						var añoIni = parseFloat($this.form.añoInicial_522);
						if (parseInt(añoIni) < 2000) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaInicialSER522('1');
						} else {
							if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER522('3');
							} else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER522('2');
							} else {
								$this.validarFechaFinalSER522('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaFinalSER522(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaFinal_522',
						orden: orden
					},
					() => {
						$this.validarFechaInicialSER522('1')
					},
					() => {
						$this.form.diaFinal_522 = cerosIzq($this.form.diaFinal_522, 2);
						$this.form.mesFinal_522 = cerosIzq($this.form.mesFinal_522, 2);
						$this.fechaFinal = $this.form.añoFinal_522 + $this.form.mesFinal_522 + $this.form.diaFinal_522;
						var diaFin = parseFloat($this.form.diaFinal_522);
						var mesFin = parseFloat($this.form.mesFinal_522);
						var añoFin = parseFloat($this.form.añoFinal_522);
						if (parseInt(añoFin) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaFinalSER522('1');
						} else {
							if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER522('3');
							} else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER522('2');
							} else if ($this.fechaFinal < $this.fechaInicial) {
								CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
								$this.validarFechaFinalSER522('2');
							} else {
								$this.validarFechaFinalRadSER522('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaFinalRadSER522(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaFinalRad_522',
						orden: orden
					},
					() => {
						$this.validarFechaFinalSER522('1')
					},
					() => {
						$this.form.diaFinalRad_522 = cerosIzq($this.form.diaFinalRad_522, 2);
						$this.form.mesFinalRad_522 = cerosIzq($this.form.mesFinalRad_522, 2);
						$this.fechaFinalRad = $this.form.añoFinalRad_522 + $this.form.mesFinalRad_522 + $this.form.diaFinalRad_522;
						var diaFinRad = parseFloat($this.form.diaFinalRad_522);
						var mesFinRad = parseFloat($this.form.mesFinalRad_522);
						var añoFinRad = parseFloat($this.form.añoFinalRad_522);
						if (parseInt(añoFinRad) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaFinalRadSER522('1');
						} else {
							if (parseInt(diaFinRad) < 1 || parseInt(diaFinRad) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalRadSER522('3');
							} else if (parseInt(mesFinRad) < 1 || parseInt(mesFinRad) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalRadSER522('2');
							} else if ($this.fechaFinalRad < $this.fechaInicial) {
								CON851('03', 'Fecha debe ser mayor', null, 'error', 'error');
								$this.validarFechaFinalRadSER522('2');
							} else {
								$this.validarActividadSER522();
							}
						}
					}
				);
			}, 100);
		},
		validarActividadSER522() {
			this.form.actividad_SER522 == '' ? this.form.actividad_SER522 = "**" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarActividad_522",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarFechaFinalSER522('1');
					}, 250);
				},
				() => {
					var activ = $this.form.actividad_SER522;
					const res = $this._actividades.find(e => e.COD.trim() == activ);
					if (activ == '**') {
						$this.form.descripActividad_SER522 = "TODAS LAS ACTIVIDADES";
						$this.validarFactRadSER522();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarActividadSER522();
						} else {
							$this.form.descripActividad_SER522 = res.DESCRIP;
							$this.validarFactRadSER522();
						}
					}
				}
			)
		},
		validarFactRadSER522() {
			this.form.factRad_SER522 == '' ? this.form.factRad_SER522 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarFactRad_522",
					orden: "1"
				},
				() => {
					$this.validarActividadSER522();
				},
				() => {
					var factRad = $this.form.factRad_SER522.toUpperCase();
					if (factRad == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarFactRadSER522();
					} else {
						if (factRad != 'N' && factRad != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarFactRadSER522();
						} else {
							$this.validarFactCancSER522();
						}
					}
				}
			)
		},
		validarFactCancSER522() {
			this.form.factCanc_SER522 == '' ? this.form.factCanc_SER522 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarFactCanc_522",
					orden: "1"
				},
				() => {
					$this.validarFactRadSER522();
				},
				() => {
					var factCanc = $this.form.factCanc_SER522.toUpperCase();
					if (factCanc == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarFactCancSER522();
					} else {
						if (factCanc != 'N' && factCanc != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarFactCancSER522();
						} else {
							$this.validarTotalClieSER522();
						}
					}
				}
			)
		},
		validarTotalClieSER522() {
			this.form.totalClie_SER522 == '' ? this.form.totalClie_SER522 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarTotalClie_522",
					orden: "1"
				},
				() => {
					$this.validarFactCancSER522();
				},
				() => {
					var totalClie = $this.form.totalClie_SER522.toUpperCase();
					if (totalClie == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarTotalClieSER522();
					} else {
						if (totalClie != 'N' && totalClie != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarTotalClieSER522();
						} else {
							$this._envioImpresion();
						}
					}
				}
			)
		},
		_envioImpresion() {
			$this = this;
			CON850_P(function (e) {
				if (e.id == 'S') {
					loader('show')
					var datos_envio = datosEnvio()
						+ localStorage.Usuario
						+ '|' + $this.fechaInicial.toString()
						+ '|' + $this.fechaFinal.toString()
						+ '|' + $this.fechaFinalRad.toString()
						+ '|' + $this.form.actividad_SER522
						+ '|' + $this.form.factRad_SER522.toUpperCase()
						+ '|' + $this.form.factCanc_SER522.toUpperCase()
						+ '|' + $this.form.totalClie_SER522.toUpperCase() + '|';

					console.log(datos_envio, "datos_envio");

					postData({ datosh: datos_envio }, get_url('app/SALUD/SER522.DLL'))
						.then($this._montarImpresion_SER522)
						.catch(err => {
							console.log(err)
							loader('hide')
							$this.validarTotalClieSER522();
						})
				} else {
					$this.validarTotalClieSER522();
				}
			}, {
				msj: '00',
				overlay_show: true
			})
		},
		_cargarActividades() {
			var $this = this
			postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON806.DLL"))
				.then(data => {
					$this._actividades = data.ACTIVIDADES;
					$this._actividades.pop();
					loader('hide')
					$this.datoInicialSER522();
				}).catch(err => {
					loader('hide')
					_toggleNav();
				})
		},
		_ventanaActividadesSER522() {
			_ventanaDatos({
				titulo: "VENTANA DE ACTIVIDADES",
				columnas: ["COD", "DESCRIP"],
				data: $this._actividades,
				callback_esc: function () {
					document.querySelector('.actividad_SER522').focus();
				},
				callback: function (data) {
					$this.form.actividad_SER522 = data.COD.trim();
					_enterInput('.actividad_SER522');
				}
			});
		},
		_montarImpresion_SER522(data) {
			$this = this;
			data.LISTADO.pop();
			data.ENCABEZADO = [];

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			for (i in data.LISTADO) {
				data.LISTADO[i]['ENTIDAD_LN'] = data.LISTADO[i]['ENTIDAD_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['FECHA_LN'] = data.LISTADO[i]['FECHA_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['VLR_BRUTO_LN'] = data.LISTADO[i]['VLR_BRUTO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONOS_ANT_LN'] = data.LISTADO[i]['VLR_ABONOS_ANT_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONOS_ACT_LN'] = data.LISTADO[i]['VLR_ABONOS_ACT_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_NOTAS_LN'] = data.LISTADO[i]['VLR_NOTAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_COPAGOS_LN'] = data.LISTADO[i]['VLR_COPAGOS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_GLOSA_LN'] = data.LISTADO[i]['VLR_GLOSA_LN'].replace(/\ /g, "")
				data.LISTADO[i]['NETO_LN'] = data.LISTADO[i]['NETO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_SIN_RADIC_LN'] = data.LISTADO[i]['VLR_SIN_RADIC_LN'].replace(/\ /g, "")
				data.LISTADO[i]['POR_VENCER_LN'] = data.LISTADO[i]['POR_VENCER_LN'].replace(/\ /g, "")
				data.LISTADO[i]['1_30_DIAS_LN'] = data.LISTADO[i]['1_30_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['31_60_DIAS_LN'] = data.LISTADO[i]['31_60_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['61_90_DIAS_LN'] = data.LISTADO[i]['61_90_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['91_120_DIAS_LN'] = data.LISTADO[i]['91_120_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['121_180_DIAS_LN'] = data.LISTADO[i]['121_180_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['181_270_DIAS_LN'] = data.LISTADO[i]['181_270_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['271_360_DIAS_LN'] = data.LISTADO[i]['271_360_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['361_720_DIAS_LN'] = data.LISTADO[i]['361_720_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['721_1080_DIAS_LN'] = data.LISTADO[i]['721_1080_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['1081_1440_DIAS_LN'] = data.LISTADO[i]['1081_1440_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['1441_1800_DIAS_LN'] = data.LISTADO[i]['1441_1800_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['MAS_1800_DIAS_LN'] = data.LISTADO[i]['MAS_1800_DIAS_LN'].replace(/\ /g, "")
			}

			if (data.LISTADO.length < 1) {
				CON851('08', '08', null, 'error', 'error');
				loader('hide')
				this.validarTotalClieSER522();
			} else {
					var columnas = [
						{
							title: "ENTIDAD",
							value: "ENTIDAD_LN",
							filterButton: true,
							format: 'string'
						},
						{
							title: "FACTURA",
							value: "FACTURA_LN",
							filterButton: true,
							format: 'string'
						},
						{
							title: "FECHA",
							value: "FECHA_LN",
							filterButton: true,
							format: 'fecha'
						},
						{
							title: "DIAS",
							value: "DIAS_LN",
						},
						{
							title: "VLR BRUTO",
							value: "VLR_BRUTO_LN",
							format: 'money'
						},
						{
							title: "VLR ABONOS ANT",
							value: "VLR_ABONOS_ANT_LN",
							format: 'money'
						},
						{
							title: "VLR ABONOS ACT",
							value: "VLR_ABONOS_ACT_LN",
							format: 'money'
						},
						{
							title: "VLR NOTAS",
							value: "VLR_NOTAS_LN",
							format: 'money'
						},
						{
							title: "VLR COPAGOS",
							value: "VLR_COPAGOS_LN",
							format: 'money'
						},
						{
							title: "VLR GLOSA",
							value: "VLR_GLOSA_LN",
							format: 'money'
						},
						{
							title: "SALDO NETO",
							value: "NETO_LN",
							format: 'money'
						},
						{
							title: "VLR SIN RADIC",
							value: "VLR_SIN_RADIC_LN",
							format: 'money'
						},
						{
							title: "POR VENCER",
							value: "POR_VENCER_LN",
							format: 'money'
						},
						{
							title: "1 - 30 DIAS",
							value: "1_30_DIAS_LN",
							format: 'money'
						},
						{
							title: "31 - 60 DIAS",
							value: "31_60_DIAS_LN",
							format: 'money'
						},
						{
							title: "61 - 90 DIAS",
							value: "61_90_DIAS_LN",
							format: 'money'
						},
						{
							title: "91 - 120 DIAS",
							value: "91_120_DIAS_LN",
							format: 'money'
						},
						{
							title: "121 - 180 DIAS",
							value: "121_180_DIAS_LN",
							format: 'money'
						},
						{
							title: "181 - 270 DIAS",
							value: "181_270_DIAS_LN",
							format: 'money'
						},
						{
							title: "271 - 360 DIAS",
							value: "271_360_DIAS_LN",
							format: 'money'
						},
						{
							title: "361 - 720 DIAS",
							value: "361_720_DIAS_LN",
							format: 'money'
						},
						{
							title: "721 - 1080 DIAS",
							value: "721_1080_DIAS_LN",
							format: 'money'
						},
						{
							title: "1081 - 1440 DIAS",
							value: "1081_1440_DIAS_LN",
							format: 'money'
						},
						{
							title: "1441 - 1800 DIAS",
							value: "1441_1800_DIAS_LN",
							format: 'money'
						},
						{
							title: "MAS DE 1800 DIAS",
							value: "MAS_1800_DIAS_LN",
							format: 'money'
						},
						{
							title: "EST RADI",
							value: "EST_RAD_LN",
						},
						{
							title: "RUBRO PRESUPUESTO",
							value: "RUBRO_PRE_LN",
							format: 'string'
						},
						{
							title: "CUENTA CONTABLE",
							value: "CTA_CONTABLE_LN",
							format: 'string'
						},
						{
							title: "ACT",
							value: "ACT_LN",
							format: 'string'
						}
					]
					
				var header_format = [
					{ text: `${nombreEmpresa}`, bold: true, size: 16 },
					`LISTADO DE CARTERA POR ORDEN DE ACTIVIDAD     NIT: ${nit}`,
					`Fecha: ${fecha}`,
					`Periodo desde: ${this.fechaInicial}  Hasta: ${this.fechaFinal}`,
				]

				_impresion2({
					tipo: 'excel',
					header: header_format,
					logo: `${nit}.bmp`,
					// ruta_logo: 'C:\\LOGOS\\', //
					tabla: {
						columnas,
						data: data.LISTADO,
					},
					archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
					scale: 65,
					orientation: 'landscape'
				})
					.then(() => {
						console.log('Proceso terminado')
						_inputControl('reset');
						$this.datoInicialSER522()
						loader('hide')
					})
					.catch(() => {
						console.log('Proceso error')
					})
			}
		}
	}
})