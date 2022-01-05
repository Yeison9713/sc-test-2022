// INFORME RECAUDOS POR PERIODO - CARTERA
// DAVID.M - CREACION - 22/07/2020 - OPCION 9-7-5-A SALUD

const { format } = require("mysql");

var $this;
new Vue({
	el: '#SER516',
	data: {
		_terceros: [],
		_servicios: [],
		form: {
			añoInicial_516: '',
			mesInicial_516: '',
			diaInicial_516: '',
			añoFinal_516: '',
			mesFinal_516: '',
			diaFinal_516: '',
			añoAbonosInicial_516: '',
			mesAbonosInicial_516: '',
			diaAbonosInicial_516: '',
			añoAbonosFinal_516: '',
			mesAbonosFinal_516: '',
			diaAbonosFinal_516: '',
			tercero_SER516: '',
			descripTercero_SER516: '',
			prefijo_SER516: '',
			discFact_SER516: '',
			servHosp_SER516: '',
			descripServHosp_SER516: '',
			factRadic_SER516: '',
		}
	},
	created() {
		loader('show')
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-7-5-A - Informe recaudos por periodo');
		this._cargarTerceros();
	},
	watch: {
	},
	methods: {
		datoInicialSER516() {
			this.form.diaInicial_516 = "01";
			this.form.mesInicial_516 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoInicial_516 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.form.diaFinal_516 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesFinal_516 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFinal_516 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.form.diaAbonosInicial_516 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesAbonosInicial_516 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoAbonosInicial_516 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.form.diaAbonosFinal_516 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesAbonosFinal_516 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoAbonosFinal_516 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.validarFechaInicialSER516('1');
		},
		validarFechaInicialSER516(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaInicial_516',
						orden: orden
					},
					() => {
						_toggleNav()
					},
					() => {
						$this.form.diaInicial_516 = cerosIzq($this.form.diaInicial_516, 2);
						$this.form.mesInicial_516 = cerosIzq($this.form.mesInicial_516, 2);
						$this.fechaInicial = $this.form.añoInicial_516 + $this.form.mesInicial_516 + $this.form.diaInicial_516;
						var diaIni = parseFloat($this.form.diaInicial_516);
						var mesIni = parseFloat($this.form.mesInicial_516);
						var añoIni = parseFloat($this.form.añoInicial_516);
						if (parseInt(añoIni) < 2000) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaInicialSER516('1');
						} else {
							if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER516('3');
							} else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER516('2');
							} else {
								$this.validarFechaFinalSER516('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaFinalSER516(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaFinal_516',
						orden: orden
					},
					() => {
						$this.validarFechaInicialSER516('1')
					},
					() => {
						$this.form.diaFinal_516 = cerosIzq($this.form.diaFinal_516, 2);
						$this.form.mesFinal_516 = cerosIzq($this.form.mesFinal_516, 2);
						$this.fechaFinal = $this.form.añoFinal_516 + $this.form.mesFinal_516 + $this.form.diaFinal_516;
						var diaFin = parseFloat($this.form.diaFinal_516);
						var mesFin = parseFloat($this.form.mesFinal_516);
						var añoFin = parseFloat($this.form.añoFinal_516);
						if (parseInt(añoFin) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaFinalSER516('1');
						} else {
							if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER516('3');
							} else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER516('2');
							} else if ($this.fechaFinal < $this.fechaInicial) {
								CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
								$this.validarFechaFinalSER516('2');
							} else {
								$this.validarFechaAbonosInicialSER516('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaAbonosInicialSER516(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaAbonosInicial_516',
						orden: orden
					},
					() => {
						$this.validarFechaFinalSER516('1')
					},
					() => {
						$this.form.diaAbonosInicial_516 = cerosIzq($this.form.diaAbonosInicial_516, 2);
						$this.form.mesAbonosInicial_516 = cerosIzq($this.form.mesAbonosInicial_516, 2);
						$this.fechaAbonosInicial = $this.form.añoAbonosInicial_516 + $this.form.mesAbonosInicial_516 + $this.form.diaAbonosInicial_516;
						var diaAbIni = parseFloat($this.form.diaAbonosInicial_516);
						var mesAbIni = parseFloat($this.form.mesAbonosInicial_516);
						var añoAbIni = parseFloat($this.form.añoAbonosInicial_516);
						if (parseInt(añoAbIni) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaAbonosInicialSER516('1');
						} else {
							if (parseInt(diaAbIni) < 1 || parseInt(diaAbIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaAbonosInicialSER516('3');
							} else if (parseInt(mesAbIni) < 1 || parseInt(mesAbIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaAbonosInicialSER516('2');
							} else if ($this.fechaAbonosInicial < $this.fechaInicial) {
								CON851('03', 'Fecha debe ser mayor', null, 'error', 'error');
								$this.validarFechaAbonosInicialSER516('2');
							} else {
								$this.validarFechaAbonosFinalSER516('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaAbonosFinalSER516(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaAbonosFinal_516',
						orden: orden
					},
					() => {
						$this.validarFechaAbonosInicialSER516('1')
					},
					() => {
						$this.form.diaAbonosFinal_516 = cerosIzq($this.form.diaAbonosFinal_516, 2);
						$this.form.mesAbonosFinal_516 = cerosIzq($this.form.mesAbonosFinal_516, 2);
						$this.fechaAbonosFinal = $this.form.añoAbonosFinal_516 + $this.form.mesAbonosFinal_516 + $this.form.diaAbonosFinal_516;
						var diaAbIni = parseFloat($this.form.diaAbonosFinal_516);
						var mesAbIni = parseFloat($this.form.mesAbonosFinal_516);
						var añoAbIni = parseFloat($this.form.añoAbonosFinal_516);
						if (parseInt(añoAbIni) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaAbonosFinalSER516('1');
						} else {
							if (parseInt(diaAbIni) < 1 || parseInt(diaAbIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaAbonosFinalSER516('3');
							} else if (parseInt(mesAbIni) < 1 || parseInt(mesAbIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaAbonosFinalSER516('2');
							} else if ($this.fechaAbonosFinal < $this.fechaInicial) {
								CON851('03', 'Fecha debe ser mayor', null, 'error', 'error');
								$this.validarFechaAbonosFinalSER516('2');
							} else {
								$this.validarTerceroSER516();
							}
						}
					}
				);
			}, 100);
		},
		validarTerceroSER516() {
			this.form.tercero_SER516 == '' ? this.form.tercero_SER516 = "99" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarTercero_516",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarFechaAbonosFinalSER516('1');
					}, 250);
				},
				() => {
					var tercero = $this.form.tercero_SER516;
					const res = $this._terceros.find(e => e.COD.trim() == tercero);
					if (tercero == '99') {
						$this.form.descripTercero_SER516 = "PROCESO TOTAL";
						$this.validarPrefijoSER516();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarTerceroSER516();
						} else {
							$this.form.descripTercero_SER516 = res.NOMBRE;
							console.log($this.form.tercero_SER516, 'ter')
							$this.validarPrefijoSER516();
						}
					}
				}
			)
		},
		validarPrefijoSER516() {
			this.form.prefijo_SER516 == '' ? this.form.prefijo_SER516 = "*" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarPrefijo_516",
					orden: "1"
				},
				() => {
					$this.validarTerceroSER516()
				},
				() => {
					var prefijo = $this.form.prefijo_SER516.toUpperCase();
					if (prefijo.trim() == '') {
						$this.validarPrefijoSER516();
					} else {
						const res = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N",
							"O", "Q", "R", "S", "V", "W", "X", "Y", "Z", "*"].find(e => e == prefijo);
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarPrefijoSER516();
						} else {
							$this.validarDiscFactSER516();
						}
					}
				}
			)
		},
		validarDiscFactSER516() {
			this.form.discFact_SER516 == '' ? this.form.discFact_SER516 = "S" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarDiscFact_516",
					orden: "1"
				},
				() => {
					$this.validarPrefijoSER516();
				},
				() => {
					var discFact = $this.form.discFact_SER516.toUpperCase();
					console.log(discFact, 'disc1')
					if (discFact == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarDiscFactSER516();
					} else {
						console.log(discFact, 'disc')
						if (discFact != 'N' && discFact != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarDiscFactSER516();
						} else {
							$this.validarServHospSER516();
						}
					}
				}
			)
		},
		validarServHospSER516() {
			this.form.servHosp_SER516 == '' ? this.form.servHosp_SER516 = "**" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarServHosp_516",
					orden: "1"
				},
				() => {
					$this.validarDiscFactSER516();
				},
				() => {
					var servHosp = $this.form.servHosp_SER516.toUpperCase();
					const res = $this._servicios.find(e => e.ID.trim() == servHosp);
					if (servHosp == '**') {
						$this.form.descripServHosp_SER516 = "TODOS LOS SERVICIOS";
						$this.validarFactRadicSER516();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarServHospSER516();
						} else {
							$this.form.descripServHosp_SER516 = res.DESCRIPCION;
							$this.validarFactRadicSER516();
						}
					}
				}
			)
		},
		validarFactRadicSER516() {
			this.form.factRadic_SER516 == '' ? this.form.factRadic_SER516 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarFactRadic_516",
					orden: "1"
				},
				() => {
					$this.validarServHospSER516();
				},
				() => {
					var factRadic = $this.form.factRadic_SER516.toUpperCase();
					if (factRadic == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarFactRadicSER516();
					} else {
						if (factRadic != 'N' && factRadic != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarFactRadicSER516();
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
						+ '|' + $this.fechaAbonosInicial.toString()
						+ '|' + $this.fechaAbonosFinal.toString()
						+ '|' + $this.form.tercero_SER516
						+ '|' + $this.form.prefijo_SER516.toUpperCase()
						+ '|' + $this.form.discFact_SER516.toUpperCase()
						+ '|' + $this.form.servHosp_SER516.toUpperCase()
						+ '|' + $this.form.factRadic_SER516.toUpperCase() + '|';

					console.log(datos_envio, "datos_envio");

					postData({ datosh: datos_envio }, get_url('app/SALUD/SER516.DLL'))
						.then($this._montarImpresion_SER516)
						.catch(err => {
							console.log(err)
							loader('hide')
							$this.validarFactRadicSER516();
						})
				} else {
					$this.validarFactRadicSER516();
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
					$this._terceros = data.TERCEROS;
					$this._terceros.pop();
					$this._cargarServHos();
				}).catch(err => {
					loader('hide')
					_toggleNav();
				})
		},
		_cargarServHos() {
			var $this = this
			postData({ datosh: datosEnvio() + '1' + '|||' }, get_url("app/SALUD/SER812.DLL"))
				.then(data => {
					$this._servicios = data.SERVICIO;
					loader('hide');
					$this.datoInicialSER516();
				}).catch(err => {
					loader('hide');
					console.log(err, 'err')
					_toggleNav();
				})
		},
		_ventanaTercerosSER516() {
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
					document.querySelector('.tercero_SER516').focus();
				},
				callback: function (data) {
					$this.form.tercero_SER516 = data.COD.trim();
					_enterInput('.tercero_SER516');
				}
			});
		},
		_ventanaServiciosHospSER516() {
			_ventanaDatos({
				titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
				columnas: ["ID", "DESCRIPCION"],
				data: $this._servicios,
				callback_esc: function () {
					document.querySelector('.servHosp_SER516').focus();
				},
				callback: function (data) {
					$this.form.servHosp_SER516 = data.ID;
					_enterInput('.servHosp_SER516');
				}
			});
		},
		_montarImpresion_SER516(data) {
			$this = this;
			data.LISTADO.pop();
			data.ENCABEZADO = [];

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			for (i in data.LISTADO) {
				data.LISTADO[i]['DETALLE_LN'] = data.LISTADO[i]['DETALLE_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['TOTAL_FACT_LN'] = data.LISTADO[i]['TOTAL_FACT_LN'].replace(/\ /g, "")
				data.LISTADO[i]['GLOSAS_ACEP_LN'] = data.LISTADO[i]['GLOSAS_ACEP_LN'].replace(/\ /g, "")
				data.LISTADO[i]['ABONOS_ANT_LN'] = data.LISTADO[i]['ABONOS_ANT_LN'].replace(/\ /g, "")
				data.LISTADO[i]['ABONOS_PER_LN'] = data.LISTADO[i]['ABONOS_PER_LN'].replace(/\ /g, "")
				data.LISTADO[i]['SALDO_FACT_LN'] = data.LISTADO[i]['SALDO_FACT_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONO1_LN'] = data.LISTADO[i]['VLR_ABONO1_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONO2_LN'] = data.LISTADO[i]['VLR_ABONO2_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONO3_LN'] = data.LISTADO[i]['VLR_ABONO3_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONO4_LN'] = data.LISTADO[i]['VLR_ABONO4_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONO5_LN'] = data.LISTADO[i]['VLR_ABONO5_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONO6_LN'] = data.LISTADO[i]['VLR_ABONO6_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONO7_LN'] = data.LISTADO[i]['VLR_ABONO7_LN'].replace(/\ /g, "")
			}

			if (data.LISTADO.length < 1) {
				CON851('08', '08', null, 'error', 'error');
				loader('hide')
				this.validarFactRadicSER516();
			} else {
				var columnas = [
					{
						title: "FACT",
						value: "FACTURA_LN",
						filterButton: true,
						format: 'string'
					},
					{
						title: "FECHA",
						value: "FECHA_LN",
						format: 'fecha',
						filterButton: true
					},
					{
						title: "FECHA VENCE",
						value: "FECHA_VENCE_LN",
						format: 'fecha',
						filterButton: true
					},
					{
						title: "DETALLE",
						value: "DETALLE_LN",
					},
					{
						title: "NRO DIAS",
						value: "NRO_DIAS_LN",
					},
					{
						title: "TOTAL FACTURA",
						value: "TOTAL_FACT_LN",
						format: 'money'
					},
					{
						title: "GLOSAS ACEPTADAS",
						value: "GLOSAS_ACEP_LN",
						format: 'money'
					},
					{
						title: "ABONOS ANTERIORES",
						value: "ABONOS_ANT_LN",
						format: 'money'
					},
					{
						title: "ABONOS DEL PERIODO",
						value: "ABONOS_PER_LN",
						format: 'money'
					},
					{
						title: "SALDO FACTURA",
						value: "SALDO_FACT_LN",
						format: 'money'
					},
					{
						title: "FECHA 1",
						value: "FECHA1_LN",
						format: 'fecha'
					},
					{
						title: "ABONO 1",
						value: "ABONO1_LN",
						format: 'string'
					},
					{
						title: "VLR ABONO 1",
						value: "VLR_ABONO1_LN",
						format: 'money'
					},
					{
						title: "FECHA 2",
						value: "FECHA2_LN",
						format: 'fecha'
					},
					{
						title: "ABONO 2",
						value: "ABONO2_LN",
						format: 'string'
					},
					{
						title: "VLR ABONO 2",
						value: "VLR_ABONO2_LN",
						format: 'money'
					},
					{
						title: "FECHA 3",
						value: "FECHA3_LN",
						format: 'fecha'
					},
					{
						title: "ABONO 3",
						value: "ABONO3_LN",
						format: 'string'
					},
					{
						title: "VLR ABONO 3",
						value: "VLR_ABONO3_LN",
						format: 'money'
					},
					{
						title: "FECHA 4",
						value: "FECHA4_LN",
						format: 'fecha'
					},
					{
						title: "ABONO 4",
						value: "ABONO4_LN",
						format: 'string'
					},
					{
						title: "VLR ABONO 4",
						value: "VLR_ABONO4_LN",
						format: 'money'
					},
					{
						title: "FECHA 5",
						value: "FECHA5_LN",
						format: 'fecha'
					},
					{
						title: "ABONO 5",
						value: "ABONO5_LN",
						format: 'string'
					},
					{
						title: "VLR ABONO 5",
						value: "VLR_ABONO5_LN",
						format: 'money'
					},
					{
						title: "FECHA 6",
						value: "FECHA6_LN",
						format: 'fecha'
					},
					{
						title: "ABONO 6",
						value: "ABONO6_LN",
						format: 'string'
					},
					{
						title: "VLR ABONO 6",
						value: "VLR_ABONO6_LN",
						format: 'money'
					},
					{
						title: "FECHA 7",
						value: "FECHA7_LN",
						format: 'fecha'
					},
					{
						title: "ABONO 7",
						value: "ABONO7_LN",
						format: 'string'
					},
					{
						title: "VLR ABONO 7",
						value: "VLR_ABONO7_LN",
						format: 'money'
					}
				]

				var header_format = [
					{ text: `${nombreEmpresa}`, bold: true, size: 16 },
					`INFORME DE RECAUDOS     NIT: ${nit} --- ${fecha}`,
					`Periodo desde: ${this.fechaInicial}  Hasta: ${this.fechaFinal}`,
					`Abonos desde: ${this.fechaAbonosInicial}  Hasta: ${this.fechaAbonosFinal}`,
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
						$this.datoInicialSER516()
						loader('hide')
					})
					.catch(() => {
						console.log('Proceso error')
					})
			}
		}
	}
})