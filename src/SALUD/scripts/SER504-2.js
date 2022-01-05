// LISTADO DE CARTERA X EDADES - OPCIONAL - DAVID.M - 16-02-2021

new Vue({
	el: '#SER504-2',
	data: {
		año_ini: 0,
		mes_ini: 0,
		dia_ini: 0,
		año_fin: 0,
		mes_fin: 0,
		dia_fin: 0,
		año_abo: 0,
		mes_abo: 0,
		dia_abo: 0,
		fecha_act: moment().format('YYYYMMDD')
	},
	created() {
		_inputControl('disabled')
		_inputControl('reset')
		nombreOpcion('9-7-5-L - Listado de cartera por edades OPCIONAL');
		$this = this
		this.fecha_inicial('1')
	},
	methods: {
		fecha_inicial(orden) {
			if (this.año_ini == 0) {
				this.año_ini = this.fecha_act.substring(0, 4)
				this.mes_ini = this.fecha_act.substring(4, 6)
				this.dia_ini = 01
			}
			validarInputs(
				{
					form: "#fecha_inicial",
					orden: orden
				},
				() => {
					_toggleNav()
				},
				() => {
					this.año_ini = cerosIzq(this.año_ini, 4);
					this.mes_ini = cerosIzq(this.mes_ini, 2);
					this.dia_ini = cerosIzq(this.dia_ini, 2);

					this.inicial = this.año_ini.toString() + this.mes_ini.toString() + this.dia_ini.toString();

					if (this.año_ini < 2000) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_inicial('1');
					} else if (this.mes_ini < 1 || this.mes_ini > 12) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_inicial('2');
					} else if (this.dia_ini < 1 || this.dia_ini > 31) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_inicial('3');
					} else {
						this.fecha_final('1');
					}
				}
			)
		},

		fecha_final(orden) {
			if (this.año_fin == 0) {
				this.año_fin = this.fecha_act.substring(0, 4)
				this.mes_fin = this.fecha_act.substring(4, 6)
				this.dia_fin = this.fecha_act.substring(6, 8)
			}
			validarInputs(
				{
					form: "#fecha_final",
					orden: orden
				},
				() => {
					_toggleNav()
				},
				() => {
					this.año_fin = cerosIzq(this.año_fin, 4);
					this.mes_fin = cerosIzq(this.mes_fin, 2);
					this.dia_fin = cerosIzq(this.dia_fin, 2);

					this.final = this.año_fin.toString() + this.mes_fin.toString() + this.dia_fin.toString();

					if (this.año_fin < 2000) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_final('1');
					} else if (this.mes_fin < 1 || this.mes_fin > 12) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_final('2');
					} else if (this.dia_fin < 1 || this.dia_fin > 31) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_final('3');
					} else if (this.final < this.inicial) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_final('1');
					} else {
						this.fecha_abonos('1');
					}
				}
			)
		},

		fecha_abonos(orden) {
			if (this.año_abo == 0) {
				this.año_abo = this.fecha_act.substring(0, 4)
				this.mes_abo = this.fecha_act.substring(4, 6)
				this.dia_abo = this.fecha_act.substring(6, 8)
			}
			validarInputs(
				{
					form: "#fecha_abonos",
					orden: orden
				},
				() => {
					_toggleNav()
				},
				() => {
					this.año_abo = cerosIzq(this.año_abo, 4);
					this.mes_abo = cerosIzq(this.mes_abo, 2);
					this.dia_abo = cerosIzq(this.dia_abo, 2);

					this.abonos = this.año_abo.toString() + this.mes_abo.toString() + this.dia_abo.toString();

					if (this.año_abo < 2000) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_abonos('1');
					} else if (this.mes_abo < 1 || this.mes_abo > 12) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_abonos('2');
					} else if (this.dia_abo < 1 || this.dia_abo > 31) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_abonos('3');
					} else if (this.abonos < this.inicial) {
						CON851('37', '37', null, 'error', 'error');
						this.fecha_abonos('1');
					} else {
						this._cargarFacturas()
					}
				}
			)
		},

		_cargarFacturas() {
			loader('show')
			postData({ datosh: datosEnvio() + this.inicial + '|' + this.final + '|' + this.fecha_abonos + '|' }, get_url("APP/SALUD/SER504-PRUEBA.DLL"))
				.then(data => {
					console.log(data);
					this._montarImpresion(data)
				})
				.catch(err => {
					console.error(err)
				});
		},

		async _montarImpresion(data) {
			var LISTADO = data.LISTADO;
			LISTADO.pop();

			LISTADO = LISTADO.filter(e => e.FECHA_CIERRE_LN > 20000000 && e.FECHA_CIERRE_LN < 20210101);

			await LISTADO.sort((a, b) => {
				if (parseInt(a.FECHA_CIERRE_LN) > parseInt(b.FECHA_CIERRE_LN)) {
					return 1;
				}
				if (parseInt(a.FECHA_CIERRE_LN) < parseInt(b.FECHA_CIERRE_LN)) {
					return -1;
				}
				return 0;
			});

			for (var i in LISTADO) {
				if (LISTADO[i].FECHA_PRE_LN.substring(4, 6) > 0) {
					LISTADO[i]['FECHA_VENCE_LN'] = LISTADO[i].FECHA_PRE_LN;
				} else {
					LISTADO[i]['FECHA_VENCE_LN'] = LISTADO[i].FECHA_RET_LN;
				}
			}

			LISTADO = await this.calcularDias(LISTADO);

			console.log(LISTADO, 'LISTADO')

			this.LISTADO = LISTADO

			let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
			let nit = $_USUA_GLOBAL[0].NIT.toString();
			let fecha = moment().format('MMM DD/YY');

			var columnas = [
				{
					title: "Factura",
					value: "FACT_LN",
					filterButton: true
				},
				{
					title: "Fecha Cierre",
					value: "FECHA_CIERRE_LN",
					format: 'fecha',
					filterButton: true
				},
				{
					title: "Fecha Pres",
					value: "FECHA_PRE_LN",
					format: 'fecha',
					filterButton: true
				},
				{
					title: "Fecha Vence",
					value: "FECHA_VENCE_LN",
					format: 'fecha',
					filterButton: true
				},
				{
					title: "Paciente",
					value: "DESCRIP_PACI_LN"
				},
				{
					title: "Tercero",
					value: "DESCRIP_TER_LN"
				},
				{
					title: "Nro Dias",
					value: "DIAS_TOT",
					filterButton: true
				},
				{
					title: "Por Vencer",
					value: "MENOS_1_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "1 a 30 Dias",
					value: "0_30_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "31 a 60 Dias",
					value: "31_60_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "61 a 90 Dias",
					value: "61_90_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "91 a 120 Dias",
					value: "91_120_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "121 a 180 Dias",
					value: "121_180_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "181 a 360 Dias",
					value: "181_360_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "Más de 360 Dias",
					value: "MAS_360_DIAS",
					format: 'money',
					totalsRowFunction: 'sum'
				},
				{
					title: "Acumulado",
					value: "ACUMULADO",
					format: 'money',
					totalsRowFunction: 'sum'
				}
			]

			var header_format = [
				{ text: `${nombreEmpresa}`, bold: true, size: 16 },
				`FACTURACION RESUMEN GENERAL DE CARTERA     NIT: ${nit}`,
				`Fecha de reporte: ${fecha}`,
				`Periodo desde: ${this.inicial}  Hasta: ${this.final}`,
			]

			_impresion2({
				tipo: 'excel',
				header: header_format,
				logo: `${nit}.bmp`,
				tabla: {
					columnas,
					data: LISTADO,
					totalsRow: true
				},
				archivo: localStorage.Usuario + moment().format('-YYYY-MM-DD-HHmmss'),
				scale: '75',
				orientation: 'landscape'
			})
				.then(() => {
					console.log('Proceso terminado')
					loader('hide')
					_toggleNav()
				})
				.catch(() => {
					console.log('Proceso error')
				})
		},

		async calcularDias(LISTADO) {
			for (var i in LISTADO) {
				ini = moment(LISTADO[i].FECHA_VENCE_LN);
				fin = moment(this.final);

				LISTADO[i].DIAS_TOT = fin.diff(ini, "days");

				LISTADO[i]['MENOS_1_DIAS'] = 0
				LISTADO[i]['0_30_DIAS'] = 0
				LISTADO[i]['31_60_DIAS'] = 0
				LISTADO[i]['61_90_DIAS'] = 0
				LISTADO[i]['91_120_DIAS'] = 0
				LISTADO[i]['121_180_DIAS'] = 0
				LISTADO[i]['181_360_DIAS'] = 0
				LISTADO[i]['MAS_360_DIAS'] = 0
				LISTADO[i]['ACUMULADO'] = 0

				if (LISTADO[i].DIAS_TOT < 1) {
					LISTADO[i]['MENOS_1_DIAS'] = LISTADO[i].VLR_CARTERA_LN
				} else if (LISTADO[i].DIAS_TOT > 0 && LISTADO[i].DIAS_TOT < 31) {
					LISTADO[i]['0_30_DIAS'] = LISTADO[i].VLR_CARTERA_LN
				} else if (LISTADO[i].DIAS_TOT > 30 && LISTADO[i].DIAS_TOT < 61) {
					LISTADO[i]['31_60_DIAS'] = LISTADO[i].VLR_CARTERA_LN
				} else if (LISTADO[i].DIAS_TOT > 60 && LISTADO[i].DIAS_TOT < 91) {
					LISTADO[i]['61_90_DIAS'] = LISTADO[i].VLR_CARTERA_LN
				} else if (LISTADO[i].DIAS_TOT > 90 && LISTADO[i].DIAS_TOT < 121) {
					LISTADO[i]['91_120_DIAS'] = LISTADO[i].VLR_CARTERA_LN
				} else if (LISTADO[i].DIAS_TOT > 120 && LISTADO[i].DIAS_TOT < 181) {
					LISTADO[i]['121_180_DIAS'] = LISTADO[i].VLR_CARTERA_LN
					if (LISTADO[i]['FACT_LN'] == 'Z215334') {
						console.log('entra fact = Z215334', LISTADO[i]['121_180_DIAS'], 'vlr')
					}
				} else if (LISTADO[i].DIAS_TOT > 180 && LISTADO[i].DIAS_TOT < 361) {
					LISTADO[i]['181_360_DIAS'] = LISTADO[i].VLR_CARTERA_LN
				} else if (LISTADO[i].DIAS_TOT > 360) {
					LISTADO[i]['MAS_360_DIAS'] = LISTADO[i].VLR_CARTERA_LN
				}

				LISTADO[i]['ACUMULADO'] = LISTADO[i].VLR_CARTERA_LN

				LISTADO[i].DESCRIP_TER_LN = LISTADO[i].DESCRIP_TER_LN.replace(/\s+/g, ' ')
				LISTADO[i].DESCRIP_PACI_LN = LISTADO[i].DESCRIP_PACI_LN.replace(/\s+/g, ' ')
			}

			return LISTADO
		}
	}
})