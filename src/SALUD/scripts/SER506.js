// LISTADO DE INTERESES DE CARTERA
// DAVID.M - CREACION - 09/07/2020 - OPCION 9-7-5-4 SALUD

(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this;
new Vue({
	el: '#SER506',
	data: {
		_terceros: [],
		form: {
			añoInicial_506: '',
			mesInicial_506: '',
			diaInicial_506: '',
			añoFinal_506: '',
			mesFinal_506: '',
			diaFinal_506: '',
			tercero_SER506: '',
			descripTercero_SER506: '',
			tasa_SER506: '',
			tasaMask: IMask.createMask({ mask: Number, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }),
		},
		message: "0102030405",
	},
	created() {
		loader('show')
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-7-5-4 - Listado de intereses de cartera');
		this._cargarTerceros();
	},
	watch: {
	},
	methods: {
		datoInicialSER506() {
			this.form.diaInicial_506 = "01";
			this.form.mesInicial_506 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoInicial_506 = "1998";

			this.form.diaFinal_506 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesFinal_506 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFinal_506 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.validarFechaInicialSER506('1');
		},
		validarFechaInicialSER506(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaInicial_506',
						orden: orden
					},
					() => {
						_toggleNav();
					},
					() => {
						$this.form.diaInicial_506 = cerosIzq($this.form.diaInicial_506, 2);
						$this.form.mesInicial_506 = cerosIzq($this.form.mesInicial_506, 2);
						$this.fechaInicial = $this.form.añoInicial_506 + $this.form.mesInicial_506 + $this.form.diaInicial_506;
						var diaIni = parseFloat($this.form.diaInicial_506);
						var mesIni = parseFloat($this.form.mesInicial_506);
						var añoIni = parseFloat($this.form.añoInicial_506);
						if (parseInt(añoIni) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaInicialSER506('1');
						} else {
							if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER506('3');
							} else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER506('2');
							} else {
								$this.validarFechaFinalSER506('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaFinalSER506(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaFinal_506',
						orden: orden
					},
					() => {
						$this.validarFechaInicialSER506('1')
					},
					() => {
						$this.form.diaFinal_506 = cerosIzq($this.form.diaFinal_506, 2);
						$this.form.mesFinal_506 = cerosIzq($this.form.mesFinal_506, 2);
						$this.fechaFinal = $this.form.añoFinal_506 + $this.form.mesFinal_506 + $this.form.diaFinal_506;
						var diaFin = parseFloat($this.form.diaFinal_506);
						var mesFin = parseFloat($this.form.mesFinal_506);
						var añoFin = parseFloat($this.form.añoFinal_506);
						if (parseInt(añoFin) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaFinalSER506('1');
						} else {
							if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER506('3');
							} else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER506('2');
							} else if ($this.fechaFinal < $this.fechaInicial) {
								CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
								$this.validarFechaFinalSER506('2');
							} else {
								$this.validarTerceroSER506();
							}
						}
					}
				);
			}, 100);
		},
		validarTerceroSER506() {
			this.form.tercero_SER506 == '' ? this.form.tercero_SER506 = "99" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarTercero_506",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarFechaFinalSER506('1');
					}, 250);
				},
				() => {
					var tercero = $this.form.tercero_SER506;
					const res = $this._terceros.find(e => e.COD.trim() == tercero);
					if (tercero == '99') {
						$this.form.descripTercero_SER506 = "PROCESO TOTAL";
						$this.validarTasaSER506();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarTerceroSER506();
						} else {
							$this.form.descripTercero_SER506 = res.NOMBRE;
							console.log($this.form.tercero_SER506, 'ter')
							$this.validarTasaSER506();
						}
					}
				}
			)
		},
		validarTasaSER506() {
			this.form.tasa_SER506 == '' ? this.form.tasa_SER506 = "3.00" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarTasa_506",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarTerceroSER506();
					}, 350);
				},
				() => {
					$this.form.tasa_SER506 = $this.form.tasaMask.resolve($this.form.tasa_SER506)
					var tasa = $this.form.tasa_SER506;
					if (tasa == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarTasaSER506();
					} else {
						if (parseFloat(tasa) < 1 || parseFloat(tasa) > 10) {
							CON851('03', '03', null, 'error', 'error');
							$this.validarTasaSER506();
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
						+ $this.fechaInicial.toString()
						+ '|' + $this.fechaFinal.toString()
						+ '|' + $this.form.tercero_SER506
						+ '|' + $this.form.tasa_SER506;

					console.log(datos_envio, "datos_envio");

					postData({ datosh: datos_envio }, get_url('app/SALUD/SER506.DLL'))
						.then($this._montarImpresion_SER506)
						.catch(err => {
							console.log(err)
							$this.validarTasaSER506();
						})
				} else {
					$this.validarTasaSER506();
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
					console.log('llega')
					$this.datoInicialSER506();
				}).catch(err => {
					console.log('sale')
					loader('hide')
					_toggleNav();
				})
		},
		_ventanaTercerosSER506() {
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
					document.querySelector('.tercero_SER506').focus();
				},
				callback: function (data) {
					$this.form.tercero_SER506 = data.COD.trim();
					_enterInput('.tercero_SER506');
				}
			});
		},
		_montarImpresion_SER506(data) {
			$this = this;
			data.LISTADO.pop();
			data.ENCABEZADO = [];

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			for (i in data.LISTADO) {
				data.LISTADO[i]['PACIENTE_LN'] = data.LISTADO[i]['PACIENTE_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['DIAS_VEN_LN'] = data.LISTADO[i]['DIAS_VEN_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['SALDO_X_VENC_LN'] = data.LISTADO[i]['SALDO_X_VENC_LN'].replace(/\ /g, "")
				data.LISTADO[i]['SALDO_VENCIDO_LN'] = data.LISTADO[i]['SALDO_VENCIDO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['INTERESES_LN'] = data.LISTADO[i]['INTERESES_LN'].replace(/\ /g, "")
			}
		
			if (data.LISTADO.length < 1) {
				CON851('08', '08', null, 'error', 'error');
				this.validarAsociarNitSER504();
			} else {
				var columnas = [
					{
						title: "FACT",
						value: "FACT_LN",
						filterButton: true
					},
					{
						title: "FECHA",
						value: "FECHA_LN",
						format: 'fecha',
						filterButton: true
					},
					{
						title: "PACIENTE",
						value: "PACIENTE_LN",
					},
					{
						title: "DIAS VEN",
						value: "DIAS_VEN_LN"
					},
					{
						title: "DIAS INT",
						value: "DIAS_INT_LN",
					},
					{
						title: "SALDO X VENC",
						value: "SALDO_X_VENC_LN",
						format: 'money'
					},
					{
						title: "SALDO VENCIDO",
						value: "SALDO_VENCIDO_LN",
						format: 'money'
					},
					{
						title: "INTERESES",
						value: "INTERESES_LN",
						format: 'money'
					},
				]
		
				var header_format = [
					{ text: `${nombreEmpresa}`, bold: true, size: 16 },
					`FACTURACION RESUMEN GENERAL DE CARTERA     NIT: ${nit}`,
					`Fecha de reporte: ${fecha}`,
					`Periodo desde: ${this.fechaInicial}  Hasta: ${this.fechaFinal}`,
				]
		
				_impresion2({
					tipo: 'excel',
					// sheetName: 'Listado validación',
					header: header_format,
					logo: '892000458.bmp',
					ruta_logo: 'C:\\LOGOS\\', //
					tabla: {
						columnas,
						// totalsRow: true,
						data: data.LISTADO,
						// heightRow: 35,
						// theme: 'TableStyleDark1'
					},
					archivo: 'LISTADO-INTERESES-CARTERA',
					scale: 65,
					orientation: 'landscape'
				})
					.then(() => {
						console.log('Proceso terminado')
						_inputControl('reset');
						$this.datoInicialSER506()
						loader('hide')
					})
					.catch((err) => {
						console.log('Proceso error')
						console.log(err)
					})
			}
		},
	}
})