// INFORME CARTERA DEUDOR
// DAVID.M - CREACION - 29/07/2020 - OPCION 9-7-5-H-1 SALUD

var $this;
new Vue({
	el: '#SER508H',
	data: {
		_actividades: [],
		_terceros: [],
		form: {
			añoInicial_508H: '',
			mesInicial_508H: '',
			diaInicial_508H: '',
			añoFinal_508H: '',
			mesFinal_508H: '',
			diaFinal_508H: '',
			tercero_SER508H: '',
			descripTercero_SER508H: '',
			actividad_SER508H: '',
			descripActividad_SER508H: '',
			discFact_SER508H: '',
			factCanc_SER508H: '',
			discClie_SER508H: '',
		}
	},
	created() {
		loader('show')
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-7-5-H-1 - Informe cartera deudor');
		this._cargarActividades();
	},
	watch: {
	},
	methods: {
		datoInicialSER508H() {
			this.form.diaInicial_508H = "01";
			this.form.mesInicial_508H = '01'
			this.form.añoInicial_508H = '1998'

			this.form.diaFinal_508H = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.form.mesFinal_508H = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFinal_508H = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			this.validarFechaInicialSER508H('1');
		},
		validarFechaInicialSER508H(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaInicial_508H',
						orden: orden
					},
					() => {
						_toggleNav()
					},
					() => {
						$this.form.diaInicial_508H = cerosIzq($this.form.diaInicial_508H, 2);
						$this.form.mesInicial_508H = cerosIzq($this.form.mesInicial_508H, 2);
						$this.fechaInicial = $this.form.añoInicial_508H + $this.form.mesInicial_508H + $this.form.diaInicial_508H;
						var diaIni = parseFloat($this.form.diaInicial_508H);
						var mesIni = parseFloat($this.form.mesInicial_508H);
						var añoIni = parseFloat($this.form.añoInicial_508H);
						if (parseInt(añoIni) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaInicialSER508H('1');
						} else {
							if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER508H('3');
							} else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaInicialSER508H('2');
							} else {
								$this.validarFechaFinalSER508H('1');
							}
						}
					}
				);
			}, 100);
		},
		validarFechaFinalSER508H(orden) {
			$this = this;
			setTimeout(function () {
				validarInputs(
					{
						form: '#fechaFinal_508H',
						orden: orden
					},
					() => {
						$this.validarFechaInicialSER508H('1')
					},
					() => {
						$this.form.diaFinal_508H = cerosIzq($this.form.diaFinal_508H, 2);
						$this.form.mesFinal_508H = cerosIzq($this.form.mesFinal_508H, 2);
						$this.fechaFinal = $this.form.añoFinal_508H + $this.form.mesFinal_508H + $this.form.diaFinal_508H;
						var diaFin = parseFloat($this.form.diaFinal_508H);
						var mesFin = parseFloat($this.form.mesFinal_508H);
						var añoFin = parseFloat($this.form.añoFinal_508H);
						if (parseInt(añoFin) < 1900) {
							CON851('37', '37', null, 'error', 'error');
							$this.validarFechaFinalSER508H('1');
						} else {
							if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER508H('3');
							} else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
								CON851('37', '37', null, 'error', 'error');
								$this.validarFechaFinalSER508H('2');
							} else if ($this.fechaFinal < $this.fechaInicial) {
								CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
								$this.validarFechaFinalSER508H('2');
							} else {
								$this.validarTerceroSER508H();
							}
						}
					}
				);
			}, 100);
		},
		validarTerceroSER508H() {
			this.form.tercero_SER508H == '' ? this.form.tercero_SER508H = "99" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarTercero_508H",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarFechaFinalSER508H('1');
					}, 250);
				},
				() => {
					var tercero = $this.form.tercero_SER508H;
					const res = $this._terceros.find(e => e.COD.trim() == tercero);
					if (tercero == '99') {
						$this.form.descripTercero_SER508H = "PROCESO TOTAL";
						$this.validarActividadSER508H();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarTerceroSER508H();
						} else {
							$this.form.descripTercero_SER508H = res.NOMBRE;
							console.log($this.form.tercero_SER508H, 'ter')
							$this.validarActividadSER508H();
						}
					}
				}
			)
		},
		validarActividadSER508H() {
			this.form.actividad_SER508H == '' ? this.form.actividad_SER508H = "**" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarActividad_508H",
					orden: "1"
				},
				() => {
					setTimeout(() => {
						$this.validarTerceroSER508H();
					}, 250);
				},
				() => {
					var activ = $this.form.actividad_SER508H;
					const res = $this._actividades.find(e => e.COD.trim() == activ);
					if (activ == '**') {
						$this.form.descripActividad_SER508H = "TODAS LAS ACTIVIDADES";
						$this.validarArchDiscSER508H();
					} else {
						if (res == undefined) {
							CON851('01', '01', null, 'error', 'error');
							$this.validarActividadSER508H();
						} else {
							$this.form.descripActividad_SER508H = res.DESCRIP;
							$this.validarArchDiscSER508H();
						}
					}
				}
			)
		},
		validarArchDiscSER508H() {
			this.form.discFact_SER508H == '' ? this.form.discFact_SER508H = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarDiscFact_508H",
					orden: "1"
				},
				() => {
					$this.validarActividadSER508H();
				},
				() => {
					var archDisc = $this.form.discFact_SER508H.toUpperCase();
					if (archDisc == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarArchDiscSER508H();
					} else {
						if (archDisc != 'N' && archDisc != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarArchDiscSER508H();
						} else {
							$this.validarFactCancSER508H();
						}
					}
				}
			)
		},
		validarFactCancSER508H() {
			this.form.factCanc_SER508H == '' ? this.form.factCanc_SER508H = "N" : false;
			$this = this;
			validarInputs(
				{
					form: "#validarFactCanc_508H",
					orden: "1"
				},
				() => {
					$this.validarArchDiscSER508H();
				},
				() => {
					var factCanc = $this.form.factCanc_SER508H.toUpperCase();
					if (factCanc == "") {
						CON851('03', '03', null, 'error', 'error');
						$this.validarFactCancSER508H();
					} else {
						if (factCanc != 'N' && factCanc != 'S') {
							CON851('03', '03', null, 'error', 'error');
							$this.validarFactCancSER508H();
						} else {
							$this.validarTotalClieSER508H();
						}
					}
				}
			)
		},
		validarTotalClieSER508H() {
			if(this.form.discFact_SER508H.toUpperCase() == 'S') {
				this.form.discClie_SER508H = 'S'
				this._envioImpresion()
			} else {
				this.form.discClie_SER508H == '' ? this.form.discClie_SER508H = "N" : false;
				$this = this;
				validarInputs(
					{
						form: "#validarDiscClie_508H",
						orden: "1"
					},
					() => {
						$this.validarFactCancSER508H();
					},
					() => {
						var totalClie = $this.form.discClie_SER508H.toUpperCase();
						if (totalClie == "") {
							CON851('03', '03', null, 'error', 'error');
							$this.validarTotalClieSER508H();
						} else {
							if (totalClie != 'N' && totalClie != 'S') {
								CON851('03', '03', null, 'error', 'error');
								$this.validarTotalClieSER508H();
							} else {
								$this._envioImpresion();
							}
						}
					}
				)
			}
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
						+ '|' + $this.form.tercero_SER508H
						+ '|' + $this.form.actividad_SER508H
						+ '|' + $this.form.discFact_SER508H.toUpperCase()
						+ '|' + $this.form.factCanc_SER508H.toUpperCase()
						+ '|' + $this.form.discClie_SER508H.toUpperCase() 
						+ '|' + moment().format('YYYYMMDD') + '|'

					console.log(datos_envio, "datos_envio");

					postData({ datosh: datos_envio }, get_url('app/SALUD/SER508H.DLL'))
						.then($this._montarImpresion_SER508H)
						.catch(err => {
							console.log(err)
							loader('hide')
							$this.validarTotalClieSER508H();
						})
				} else {
					if($this.form.discFact_SER508H.toUpperCase() == 'S') {
						$this.validarFactCancSER508H()
					} else $this.validarTotalClieSER508H();
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
					$this._cargarTerceros();
				}).catch(err => {
					loader('hide')
					console.log(err, 'err')
					_toggleNav();
				})
		},
		_cargarTerceros() {
			var $this = this
			postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
				.then(data => {
					$this._terceros = data.TERCEROS;
					$this._terceros.pop();
					loader('hide')
					$this.datoInicialSER508H();
				}).catch(err => {
					loader('hide')
					console.log(err, 'err')
					_toggleNav();
				})
		},
		_ventanaActividadesSER508H() {
			_ventanaDatos({
				titulo: "VENTANA DE ACTIVIDADES",
				columnas: ["COD", "DESCRIP"],
				data: $this._actividades,
				callback_esc: function () {
					document.querySelector('.actividad_SER508H').focus();
				},
				callback: function (data) {
					$this.form.actividad_SER508H = data.COD.trim();
					_enterInput('.actividad_SER508H');
				}
			});
		},
		_ventanaTercerosSER508H() {
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
					document.querySelector('.tercero_SER508H').focus();
				},
				callback: function (data) {
					$this.form.tercero_SER508H = data.COD.trim();
					_enterInput('.tercero_SER508H');
				}
			});
		},
		_montarImpresion_SER508H(data) {
			$this = this;
			data.LISTADO.pop();
			data.ENCABEZADO = [];

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			for (i in data.LISTADO) {
				data.LISTADO[i]['ENTIDAD_LN'] = data.LISTADO[i]['ENTIDAD_LN'].replace(/\�/g, "Ñ")
				data.LISTADO[i]['VLR_BRUTO_LN'] = data.LISTADO[i]['VLR_BRUTO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_ABONOS_LN'] = data.LISTADO[i]['VLR_ABONOS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_GLOSA_LN'] = data.LISTADO[i]['VLR_GLOSA_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_NOTAS_LN'] = data.LISTADO[i]['VLR_NOTAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_COPAGOS_LN'] = data.LISTADO[i]['VLR_COPAGOS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['NETO_LN'] = data.LISTADO[i]['NETO_LN'].replace(/\ /g, "")
				data.LISTADO[i]['VLR_SIN_RADIC_LN'] = data.LISTADO[i]['VLR_SIN_RADIC_LN'].replace(/\ /g, "")
				data.LISTADO[i]['HASTA_60_DIAS_LN'] = data.LISTADO[i]['HASTA_60_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['61_90_DIAS_LN'] = data.LISTADO[i]['61_90_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['91_180_DIAS_LN'] = data.LISTADO[i]['91_180_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['181_360_DIAS_LN'] = data.LISTADO[i]['181_360_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['MAS_360_DIAS_LN'] = data.LISTADO[i]['MAS_360_DIAS_LN'].replace(/\ /g, "")
				data.LISTADO[i]['TOTAL_CART_LN'] = data.LISTADO[i]['TOTAL_CART_LN'].replace(/\ /g, "")
				data.LISTADO[i]['SALDO_X_ID_LN'] = data.LISTADO[i]['SALDO_X_ID_LN'].replace(/\ /g, "")
				data.LISTADO[i]['SALDO_REAL_LN'] = data.LISTADO[i]['SALDO_REAL_LN'].replace(/\ /g, "")
				data.LISTADO[i]['GLOSA_INI_LN'] = data.LISTADO[i]['GLOSA_INI_LN'].replace(/\ /g, "")
			}

			if (data.LISTADO.length < 1) {
				CON851('08', '08', null, 'error', 'error');
				loader('hide')
				this.validarTotalClieSER508H();
			} else {
				if($this.form.discFact_SER508H.toUpperCase() == 'S'){
					var columnas = [
						{
							title: "NIT",
							value: "NIT_LN",
							filterButton: true,
							format: 'string'
						},
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
							title: "VLR ABONOS",
							value: "VLR_ABONOS_LN",
							format: 'money'
						},
						{
							title: "VLR GLOSAS",
							value: "VLR_GLOSA_LN",
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
							title: "HASTA 60 DIAS",
							value: "HASTA_60_DIAS_LN",
							format: 'money'
						},
						{
							title: "61 - 90 DIAS",
							value: "61_90_DIAS_LN",
							format: 'money'
						},
						{
							title: "91 - 180 DIAS",
							value: "91_180_DIAS_LN",
							format: 'money'
						},
						{
							title: "181 - 360 DIAS",
							value: "181_360_DIAS_LN",
							format: 'money'
						},
						{
							title: "MAS DE 360 DIAS",
							value: "MAS_360_DIAS_LN",
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
				}else if($this.form.discFact_SER508H.toUpperCase() == 'N'){
					var columnas = [
						{
							title: "NIT",
							value: "NIT_LN",
							filterButton: true,
							format: 'string'
						},
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
							title: "HASTA 60 DIAS",
							value: "HASTA_60_DIAS_LN",
							format: 'money'
						},
						{
							title: "61 - 90 DIAS",
							value: "61_90_DIAS_LN",
							format: 'money'
						},
						{
							title: "91 - 180 DIAS",
							value: "91_180_DIAS_LN",
							format: 'money'
						},
						{
							title: "181 - 360 DIAS",
							value: "181_360_DIAS_LN",
							format: 'money'
						},
						{
							title: "MAS DE 360 DIAS",
							value: "MAS_360_DIAS_LN",
							format: 'money'
						},
						{
							title: "TOTAL SIN RADIICAR",
							value: "VLR_SIN_RADIC_LN",
							format: 'money'
						},
						{
							title: "TOTAL CARTERA",
							value: "NETO_LN",
							format: 'money'
						},
						{
							title: "TOTAL CART MENOS SIN RADICAR",
							value: "TOTAL_CART_LN",
							format: 'money'
						},
						{
							title: "TOTAL X IDENTIFICAR",
							value: "SALDO_X_ID_LN",
							format: 'money'
						},
						{
							title: "SALDO REAL",
							value: "SALDO_REAL_LN",
							format: 'money'
						},
						{
							title: "GLOSA INICIAL",
							value: "GLOSA_INI_LN",
							format: 'money'
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
						$this.datoInicialSER508H()
						loader('hide')
					})
					.catch(() => {
						console.log('Proceso error')
					})
			}
		}
	}
})