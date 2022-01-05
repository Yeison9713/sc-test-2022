// LISTADO DE CARTERA CON GLOSAS
// DAVID.M - CREACION - 13/07/2020 - OPCION 9-7-5-8 SALUD

var $this;
new Vue({
	el: '#SER511',
	data: {
		_terceros: [],
		form: {
			swFecha_SER511: '',
			añoInicial_511: '',
			mesInicial_511: '',
			diaInicial_511: '',
			añoFinal_511: '',
			mesFinal_511: '',
			diaFinal_511: '',
			tercero_SER511: '',
			descripTercero_SER511: '',
			discFact_SER511: '',
			factCanc_SER511: '',
			glosadas_SER511: '',
			selected: 0,
		},
		formatos: [
			{ text: 'Seleccione', value: 0 },
			{ text: 'En formato .PDF', value: 1 },
			{ text: 'En formato .CSV', value: 2 },
			{ text: 'Salir', value: 3 },
		],
		$_formato_511: null,
	},
	created() {
		loader('show')
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-7-5-8 - Listado cartera con glosas');
		this._cargarTerceros();
	},
	watch: {
	},
	methods: {
		validarSwFechaSER511() {
			this.form.swFecha_SER511 == '' ? this.form.swFecha_SER511 = "1" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarSwFecha_511",
					orden: "1"
				},
				() => {
					_toggleNav()
				},
				() => {
					var sw_fecha = $this.form.swFecha_SER511;
					if (sw_fecha == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarSwFechaSER511();
					} else {
						console.log(sw_fecha)
						if (sw_fecha != "1" && sw_fecha != "2") {
							CON851('03', '03', null, 'error', 'error');
							$this.validarSwFechaSER511();
						} else {
							$this.datoInicialSER511();
						}
					}
				}
			)
		},
		datoInicialSER511() {
			this.form.diaInicial_511 = "01";
			this.form.mesInicial_511 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoInicial_511 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.form.diaFinal_511 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesFinal_511 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFinal_511 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.validarFechaInicialSER511('1');
		},
		validarFechaInicialSER511(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaInicial_511',
						orden: orden
					},
					() => {
						$this.validarSwFechaSER511();
					},
					() => {
						$this.form.diaInicial_511 = cerosIzq($this.form.diaInicial_511, 2);
						$this.form.mesInicial_511 = cerosIzq($this.form.mesInicial_511, 2);
						$this.fechaInicial = $this.form.añoInicial_511 + $this.form.mesInicial_511 + $this.form.diaInicial_511;
						var diaIni = parseFloat($this.form.diaInicial_511);
						var mesIni = parseFloat($this.form.mesInicial_511);
						var añoIni = parseFloat($this.form.añoInicial_511);
						if (parseInt(añoIni) < 2000) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaInicialSER511('1');
						} else {
							if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER511('3');
							} else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER511('2');
							} else {
								$this.validarFechaFinalSER511('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaFinalSER511(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaFinal_511',
						orden: orden
					},
					() => {
						$this.validarFechaInicialSER511('1')
					},
					() => {
						$this.form.diaFinal_511 = cerosIzq($this.form.diaFinal_511, 2);
						$this.form.mesFinal_511 = cerosIzq($this.form.mesFinal_511, 2);
						$this.fechaFinal = $this.form.añoFinal_511 + $this.form.mesFinal_511 + $this.form.diaFinal_511;
						var diaFin = parseFloat($this.form.diaFinal_511);
						var mesFin = parseFloat($this.form.mesFinal_511);
						var añoFin = parseFloat($this.form.añoFinal_511);
						if (parseInt(añoFin) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaFinalSER511('1');
						} else {
							if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER511('3');
							} else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER511('2');
							} else if ($this.fechaFinal < $this.fechaInicial) {
								CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
								$this.validarFechaFinalSER511('2');
							} else {
								$this.validarTerceroSER511();
							}
						}
					}
				);
			}, 100);
		},
		validarTerceroSER511() {
			this.form.tercero_SER511 == '' ? this.form.tercero_SER511 = "99" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarTercero_511",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarFechaFinalSER511('1');
					}, 250);
				},
				() => {
					var tercero = $this.form.tercero_SER511;
					const res = $this._terceros.find(e => e.COD.trim() == tercero);
					if (tercero == '99') {
						$this.form.descripTercero_SER511 = "PROCESO TOTAL";
						$this.validarDiscFactSER511();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarTerceroSER511();
						} else {
							$this.form.descripTercero_SER511 = res.NOMBRE;
							console.log($this.form.tercero_SER511, 'ter')
							$this.validarDiscFactSER511();
						}
					}
				}
			)
		},
		validarDiscFactSER511() {
			this.form.discFact_SER511 == '' ? this.form.discFact_SER511 = "S" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarDiscFact_511",
					orden: "1"
				},
				() => {
					$this.validarTerceroSER511();
				},
				() => {
					var discFact = $this.form.discFact_SER511.toUpperCase();
					console.log(discFact, 'disc1')
					if (discFact == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarDiscFactSER511();
					} else {
						console.log(discFact, 'disc')
						if (discFact != 'N' && discFact != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarDiscFactSER511();
						} else {
							$this.validarFactCancSER511();
						}
					}
				}
			)
		},
		validarFactCancSER511() {
			this.form.factCanc_SER511 == '' ? this.form.factCanc_SER511 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarFactCanc_511",
					orden: "1"
				},
				() => {
					$this.validarDiscFactSER511();
				},
				() => {
					var factCanc = $this.form.factCanc_SER511.toUpperCase();
					if (factCanc == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarFactCancSER511();
					} else {
						if (factCanc != 'N' && factCanc != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarFactCancSER511();
						} else {
							$this.validarGlosadasSER511();
						}
					}
				}
			)
		},
		validarGlosadasSER511() {
			this.form.glosadas_SER511 == '' ? this.form.glosadas_SER511 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarGlosadas_511",
					orden: "1"
				},
				() => {
					$this.validarFactCancSER511();
				},
				() => {
					var glosadas = $this.form.glosadas_SER511.toUpperCase();
					if (glosadas == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarGlosadasSER511();
					} else {
						if (glosadas != 'N' && glosadas != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarGlosadasSER511();
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
						+ $this.form.swFecha_SER511
						+ '|' + $this.fechaInicial.toString()
						+ '|' + $this.fechaFinal.toString()
						+ '|' + $this.form.tercero_SER511
						+ '|' + $this.form.discFact_SER511.toUpperCase()
						+ '|' + $this.form.factCanc_SER511.toUpperCase()
						+ '|' + $this.form.glosadas_SER511.toUpperCase();

					console.log(datos_envio, "datos_envio");

					postData({ datosh: datos_envio }, get_url('app/SALUD/SER511.DLL'))
						.then($this._montarImpresion_SER511)
						.catch(err => {
							console.log(err)
							loader('hide')
							$this.validarGlosadasSER511();
						})
				} else {
					$this.validarGlosadasSER511();
				}
			}, {
				msj: '00',
				overlay_show: true
			})
		},
		_cargarTerceros() {
			var $this = this
			postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
				.then(data => {
					loader('hide')
					$this._terceros = data.TERCEROS;
					$this._terceros.pop();
					$this.validarSwFechaSER511();
				}).catch(err => {
					loader('hide')
					_toggleNav();
				})
		},
		_ventanaTercerosSER511() {
			for (i in $this._terceros) {
				$this._terceros[i]['IDENTIFICACION'] = $this._terceros[i].COD;
				$this._terceros[i]['TELEFONO'] = $this._terceros[i].TELEF;
				$this._terceros[i]['ACTIVIDAD'] = $this._terceros[i].ACT;
			}
			_ventanaDatos({
				titulo: "VENTANA DE TERCEROS",
				columnas: ["IDENTIFICACION", "NOMBRE", "TELEFONO", "CIUDAD", "ACTIVIDAD"],
				data: $this._terceros,
				ancho: 900,
				callback_esc: function () {
					document.querySelector('.tercero_SER511').focus();
				},
				callback: function (data) {
					$this.form.tercero_SER511 = data.COD.trim();
					_enterInput('.tercero_SER511');
				}
			});
		},
		_montarImpresion_SER511(data) {
			$this = this;
			data.LISTADO.pop();
			data.ENCABEZADO = [];

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			for (i in data.LISTADO) {
				data.LISTADO[i]['FACTURA_LN'] = data.LISTADO[i]['FACTURA_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['VLR_BRUTO_LN'] = data.LISTADO[i]['VLR_BRUTO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONOS_LN'] = data.LISTADO[i]['VLR_ABONOS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_NOTAS_LN'] = data.LISTADO[i]['VLR_NOTAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_COPAGOS_LN'] = data.LISTADO[i]['VLR_COPAGOS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['SALDO_NETO_LN'] = data.LISTADO[i]['SALDO_NETO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_GLOSA_LN'] = data.LISTADO[i]['VLR_GLOSA_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_RESPUESTA_LN'] = data.LISTADO[i]['VLR_RESPUESTA_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ACEPTADO_LN'] = data.LISTADO[i]['VLR_ACEPTADO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['PENDIENTE_LN'] = data.LISTADO[i]['PENDIENTE_LN'].replace(/\ /g, "")
				data.LISTADO[i]['SALDO_GLOSA_LN'] = data.LISTADO[i]['SALDO_GLOSA_LN'].replace(/\ /g, "")
				data.LISTADO[i]['SALDO_FACTURA_LN'] = data.LISTADO[i]['SALDO_FACTURA_LN'].replace(/\ /g, "")
				data.LISTADO[i]['LEVANTAMIENTO_LN'] = data.LISTADO[i]['LEVANTAMIENTO_LN'].replace(/\ /g, "")
			}

			if (data.LISTADO.length < 1) {
				CON851('08', '08', null, 'error', 'error');
				loader('hide')
				this.validarGlosadasSER511();
			} else {
				var columnas = [
					{
						title: "FACT",
						value: "FACTURA_LN",
						filterButton: true
					},
					{
						title: "FECHA",
						value: "FECHA_LN",
						format: 'fecha',
						filterButton: true
					},
					{
						title: "DIAS",
						value: "DIAS_LN",
					},
					{
						title: "VALOR BRUTO",
						value: "VLR_BRUTO_LN",
						format: 'money'
					},
					{
						title: "VALOR ABONOS",
						value: "VLR_ABONOS_LN",
						format: 'money'
					},
					{
						title: "VALOR NOTAS",
						value: "VLR_NOTAS_LN",
						format: 'money'
					},
					{
						title: "VALOR COPAGOS",
						value: "VLR_COPAGOS_LN",
						format: 'money'
					},
					{
						title: "SALDO NETO",
						value: "SALDO_NETO_LN",
						format: 'money'
					},
					{
						title: "FECHA GLOSA",
						value: "FECHA_GLOSA_LN",
						format: 'fecha'
					},
					{
						title: "NR RAD",
						value: "NRO_RAD_LN"
					},
					{
						title: "VALOR GLOSA",
						value: "VLR_GLOSA_LN",
						format: 'money'
					},
					{
						title: "VALOR RESPUESTA",
						value: "VLR_RESPUESTA_LN",
						format: 'money'
					},
					{
						title: "VALOR ACEPTADO",
						value: "VLR_ACEPTADO_LN",
						format: 'money'
					},
					{
						title: "PENDIENTE RESP",
						value: "PENDIENTE_LN",
						format: 'money'
					},
					{
						title: "SALDO GLOSA",
						value: "SALDO_GLOSA_LN",
						format: 'money'
					},
					{
						title: "SALDO FACTURA",
						value: "SALDO_FACTURA_LN",
						format: 'money'
					},
					{
						title: "LEVANTAMIENTO",
						value: "LEVANTAMIENTO_LN",
						format: 'money'
					}
				]

				var header_format = [
					{ text: `${nombreEmpresa}`, bold: true, size: 16 },
					`LISTADO DETALLADO DE CARTERA     NIT: ${nit}`,
					`Fecha de reporte: ${fecha}`,
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
					archivo: 'LISTADO-CARTERA-GLOSAS',
					scale: 65,
					orientation: 'landscape'
				})
					.then(() => {
						console.log('Proceso terminado')
						_inputControl('reset');
						$this.datoInicialSER511()
						loader('hide')
					})
					.catch(() => {
						console.log('Proceso error')
					})
			}
		}
	}
})