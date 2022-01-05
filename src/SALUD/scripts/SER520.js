// LISTADO DE CARTERA X ACTIVIDAD
// DAVID.M - CREACION - 28/07/2020 - OPCION 9-7-5-E SALUD

var $this;
new Vue({
	el: '#SER520',
	data: {
		_actividades: [],
		form: {
			añoInicial_520: '',
			mesInicial_520: '',
			diaInicial_520: '',
			añoFinal_520: '',
			mesFinal_520: '',
			diaFinal_520: '',
			actividad_SER520: '',
			descripActividad_SER520: '',
			factCanc_SER520: '',
			totalClie_SER520: '',
		}
	},
	created() {
		loader('show')
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-7-5-E - Listado de cartera por orden de actividad');
		this._cargarActividades();
	},
	watch: {
	},
	methods: {
		datoInicialSER520() {
			this.form.diaInicial_520 = "01";
			this.form.mesInicial_520 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoInicial_520 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.form.diaFinal_520 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesFinal_520 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFinal_520 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.validarFechaInicialSER520('1');
		},
		validarFechaInicialSER520(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaInicial_520',
						orden: orden
					},
					() => {
						_toggleNav()
					},
					() => {
						$this.form.diaInicial_520 = cerosIzq($this.form.diaInicial_520, 2);
						$this.form.mesInicial_520 = cerosIzq($this.form.mesInicial_520, 2);
						$this.fechaInicial = $this.form.añoInicial_520 + $this.form.mesInicial_520 + $this.form.diaInicial_520;
						var diaIni = parseFloat($this.form.diaInicial_520);
						var mesIni = parseFloat($this.form.mesInicial_520);
						var añoIni = parseFloat($this.form.añoInicial_520);
						if (parseInt(añoIni) < 2000) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaInicialSER520('1');
						} else {
							if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER520('3');
							} else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER520('2');
							} else {
								$this.validarFechaFinalSER520('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaFinalSER520(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaFinal_520',
						orden: orden
					},
					() => {
						$this.validarFechaInicialSER520('1')
					},
					() => {
						$this.form.diaFinal_520 = cerosIzq($this.form.diaFinal_520, 2);
						$this.form.mesFinal_520 = cerosIzq($this.form.mesFinal_520, 2);
						$this.fechaFinal = $this.form.añoFinal_520 + $this.form.mesFinal_520 + $this.form.diaFinal_520;
						var diaFin = parseFloat($this.form.diaFinal_520);
						var mesFin = parseFloat($this.form.mesFinal_520);
						var añoFin = parseFloat($this.form.añoFinal_520);
						if (parseInt(añoFin) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaFinalSER520('1');
						} else {
							if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER520('3');
							} else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER520('2');
							} else if ($this.fechaFinal < $this.fechaInicial) {
								CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
								$this.validarFechaFinalSER520('2');
							} else {
								$this.validarActividadSER520();
							}
						}
					}
				);
			}, 100);
		},
		validarActividadSER520() {
			this.form.actividad_SER520 == '' ? this.form.actividad_SER520 = "**" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarActividad_520",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarFechaFinalSER520('1');
					}, 250);
				},
				() => {
					var activ = $this.form.actividad_SER520;
					const res = $this._actividades.find(e => e.COD.trim() == activ);
					if (activ == '**') {
						$this.form.descripActividad_SER520 = "TODAS LAS ACTIVIDADES";
						$this.validarFactCancSER520();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarActividadSER520();
						} else {
							$this.form.descripActividad_SER520 = res.DESCRIP;
							$this.validarFactCancSER520();
						}
					}
				}
			)
		},
		validarFactCancSER520() {
			this.form.factCanc_SER520 == '' ? this.form.factCanc_SER520 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarFactCanc_520",
					orden: "1"
				},
				() => {
					$this.validarActividadSER520();
				},
				() => {
					var factCanc = $this.form.factCanc_SER520.toUpperCase();
					if (factCanc == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarFactCancSER520();
					} else {
						if (factCanc != 'N' && factCanc != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarFactCancSER520();
						} else {
							$this.validarTotalClieSER520();
						}
					}
				}
			)
		},
		validarTotalClieSER520() {
			this.form.totalClie_SER520 == '' ? this.form.totalClie_SER520 = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarTotalClie_520",
					orden: "1"
				},
				() => {
					$this.validarFactCancSER520();
				},
				() => {
					var totalClie = $this.form.totalClie_SER520.toUpperCase();
					if (totalClie == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarTotalClieSER520();
					} else {
						if (totalClie != 'N' && totalClie != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarTotalClieSER520();
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
						+ '|' + $this.form.actividad_SER520
						+ '|' + $this.form.factCanc_SER520.toUpperCase()
						+ '|' + $this.form.totalClie_SER520.toUpperCase() + '|';

					console.log(datos_envio, "datos_envio");

					postData({ datosh: datos_envio }, get_url('app/SALUD/SER520.DLL'))
						.then($this._montarImpresion_SER520)
						.catch(err => {
							console.log(err)
							loader('hide')
							$this.validarTotalClieSER520();
						})
				} else {
					$this.validarTotalClieSER520();
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
					$this.datoInicialSER520();
				}).catch(err => {
					loader('hide')
					_toggleNav();
				})
		},
		_ventanaActividadesSER520() {
			_ventanaDatos({
				titulo: "VENTANA DE ACTIVIDADES",
				columnas: ["COD", "DESCRIP"],
				data: $this._actividades,
				callback_esc: function () {
					document.querySelector('.actividad_SER520').focus();
				},
				callback: function (data) {
					$this.form.actividad_SER520 = data.COD.trim();
					_enterInput('.actividad_SER520');
				}
			});
		},
		_montarImpresion_SER520(data) {
			$this = this;
			data.LISTADO.pop();
			data.ENCABEZADO = [];

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			for (i in data.LISTADO) {
				data.LISTADO[i]['NOM_CLIENTE_LN'] = data.LISTADO[i]['NOM_CLIENTE_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['FECHA_LN'] = data.LISTADO[i]['FECHA_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['VLR_BRUTO_LN'] = data.LISTADO[i]['VLR_BRUTO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONOS_LN'] = data.LISTADO[i]['VLR_ABONOS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_NOTAS_LN'] = data.LISTADO[i]['VLR_NOTAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_COPAGOS_LN'] = data.LISTADO[i]['VLR_COPAGOS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['NETO_LN'] = data.LISTADO[i]['NETO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_SIN_RADIC_LN'] = data.LISTADO[i]['VLR_SIN_RADIC_LN'].replace(/\ /g, "")
				data.LISTADO[i]['POR_VENCER_LN'] = data.LISTADO[i]['POR_VENCER_LN'].replace(/\ /g, "")
				data.LISTADO[i]['1_30_DIAS_LN'] = data.LISTADO[i]['1_30_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['31_60_DIAS_LN'] = data.LISTADO[i]['31_60_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['61_90_DIAS_LN'] = data.LISTADO[i]['61_90_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['91_120_DIAS_LN'] = data.LISTADO[i]['91_120_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['121_180_DIAS_LN'] = data.LISTADO[i]['121_180_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['181_360_DIAS_LN'] = data.LISTADO[i]['181_360_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['361_720_DIAS_LN'] = data.LISTADO[i]['361_720_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['MAS_720_DIAS_LN'] = data.LISTADO[i]['MAS_720_DIAS_LN'].replace(/\ /g, "")
			}

			if (data.LISTADO.length < 1) {
				CON851('08', '08', null, 'error', 'error');
				loader('hide')
				this.validarTotalClieSER520();
			} else {
				if ($this.form.totalClie_SER520.toUpperCase() == "S") {
					var columnas = [
						{
							title: "NOMBRE CLIENTE",
							value: "NOM_CLIENTE_LN",
							filterButton: true,
							format: 'string'
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
							title: "VLR ABONOS",
							value: "VLR_ABONOS_LN",
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
							title: "181 - 360 DIAS",
							value: "181_360_DIAS_LN",
							format: 'money'
						},
						{
							title: "361 - 720 DIAS",
							value: "361_720_DIAS_LN",
							format: 'money'
						},
						{
							title: "MAS DE 720 DIAS",
							value: "MAS_720_DIAS_LN",
							format: 'money'
						},
						{
							title: "NIT",
							value: "NIT_FIN_LN",
							format: 'string'
						}
					]
				}else if($this.form.totalClie_SER520.toUpperCase() == "N"){
					var columnas = [
						{
							title: "ENTIDAD",
							value: "NOM_CLIENTE_LN",
							filterButton: true,
							format: 'string'
						},
						{
							title: "FACTURA",
							value: "NIT_LN",
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
							title: "VLR ABONOS",
							value: "VLR_ABONOS_LN",
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
							title: "181 - 360 DIAS",
							value: "181_360_DIAS_LN",
							format: 'money'
						},
						{
							title: "361 - 720 DIAS",
							value: "361_720_DIAS_LN",
							format: 'money'
						},
						{
							title: "MAS DE 720 DIAS",
							value: "MAS_720_DIAS_LN",
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
				}

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
						$this.datoInicialSER520()
						loader('hide')
					})
					.catch(() => {
						console.log('Proceso error')
					})
			}
		}
	}
})