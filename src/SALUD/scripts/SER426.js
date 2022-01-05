// LISTADO DE FACTURACION RADICADAS
// SANTIAGO - CREACION - 27/08/2020 - OPCION 9-7-4-2-6 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, nit_SER426;
new Vue({
    el: '#SER426',
    data: {
        form: {
            añoIni_426: '',
            mesIni_426: '',
            diaIni_426: '',
            añoFin_426: '',
            mesFin_426: '',
            diaFin_426: '',
            nit_426: '',
            descripNit_SER426: '',
            radica_426: '',
            cancel_426: '',
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-4-2-6 - Listado de radicación');
        this._consultarNitSER426();
    },
    watch: {
    },
    mounted: function () {
        this.datoInicialIniSER426();
    },
    methods: {
        datoInicialIniSER426() {
			this.form.mesIni_426 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_426 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_426 = '01';
			this.validarFechaIniSER426("1")
        },
        
        validarFechaIniSER426(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_426",
					orden: orden
				},
				() => {
					_toggleNav();
				},
				() => {
                    $this.form.diaIni_426 = cerosIzq($this.form.diaIni_426, 2);
                    $this.form.mesIni_426 = cerosIzq($this.form.mesIni_426, 2);
                    $this.fechaInicial = this.form.añoIni_426 + $this.form.mesIni_426 + $this.form.diaIni_426;
                    var añoInicial = parseFloat($this.form.añoIni_426);
					var diaInicial = parseFloat($this.form.diaIni_426);
                    var mesInicial = parseFloat($this.form.mesIni_426);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER426('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER426('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER426('2');
                        } else {
                            $this.datoInicialFinSER426();
                        }
                    }
				}
			)
        },

        datoInicialFinSER426() {
			this.form.mesFin_426 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_426 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_426 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER426("1")
        },
        
        validarFechaFinSER426(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_426",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER426("1");
				},
				() => {
					$this.form.diaFin_426 = cerosIzq($this.form.diaFin_426, 2);
                    $this.form.mesFin_426 = cerosIzq($this.form.mesFin_426, 2);
                    $this.fechaFinal = this.form.añoFin_426 + $this.form.mesFin_426 + $this.form.diaFin_426;
                    var añoPago = parseFloat($this.form.añoFin_426);
					var diaPago = parseFloat($this.form.diaFin_426);
                    var mesPago = parseFloat($this.form.mesFin_426);
                    if (parseInt(añoPago) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER426('1');
                    } else {
                        if (parseInt(diaPago) < 1 || parseInt(diaPago) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER426('3');
                        } else if (parseInt(mesPago) < 1 || parseInt(mesPago) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER426('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER426('2');
                        } else {
                            $this.validarNitSER426();
                        }
                    }
				}
			)
        },

        validarNitSER426() {
            this.form.nit_426 == '' ? this.form.nit_426 = "99" : false;
            $this = this
			validarInputs(
				{
					form: "#nit_SER426",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaFinSER426("1");
				},
				() => {
                    var nit = $this.form.nit_426;
                    if (nit.trim() == "99" ){
                        $this.form.descripNit_SER426 = "Proceso total"
                        this.validarRadicaSER426();
                    }else {
                        const res = $this.nit_SER426.find(e => e.COD.trim() == nit );
                        if (res == undefined) {
                            $this.form.nit_424 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarNitSER426()
                        }else {
                            $this.form.descripNit_SER426 = res.NOMBRE;
                            this.validarRadicaSER426();
                        }
                    }
				}
			)
        },

        validarRadicaSER426() {
            $this = this
            this.form.radica_426 == '' ? this.form.radica_426 = "S" : false;
            validarInputs(
				{
					form: "#radica_SER426",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarNitSER426();
				},
                () => {
                    var temp = $this.form.radica_426.toUpperCase();
                    if (temp == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarRadicaSER426();
                    } else if (temp == "S" || temp == "N") {
                        this.validarCancelSER426()
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarRadicaSER426();
                    }
                }
			)
        },

        validarCancelSER426() {
            $this = this
            this.form.cancel_426 == '' ? this.form.cancel_426 = "S" : false;
            validarInputs(
				{
					form: "#cancel_SER426",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarRadicaSER426();
				},
                () => {
                    var temp = $this.form.cancel_426.toUpperCase();
                    if (temp == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCancelSER426();
                    } else if (temp == "S" || temp == "N") {
                        this._envioImpresion()
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCancelSER426();
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
                        + '|' + $this.form.nit_426
                        + '|' + $this.form.radica_426.toUpperCase()
                        + '|' + $this.form.cancel_426.toUpperCase();

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER426.DLL'))
                        .then($this._montarImpresion_SER426)
                        .catch(err => {
                            console.log(err)
                            $this.validarCancelSER426();
                        })
                } else {
                    $this.validarCancelSER426();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _consultarNitSER426() {
            $this = this;
            postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
                .then(data => {
                    loader("hide");
                    $this.nit_SER426 = data.TERCEROS;
                    $this.nit_SER426.pop();
                    console.log(nit_SER426);
                }).catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },

        _ventanaNitSER426() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE TERCEROS",
                columnas: ["COD", "NOMBRE"],
                data: $this.nit_SER426,
                callback_esc: function () {
                    document.querySelector('.nit_426').focus();
                },
                callback: function (data) {
                    $this.form.nit_426 = data.COD.trim();
                    _enterInput('.nit_426');
                }
            })
        },

        _montarImpresion_SER426(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.Listado) {
                data.Listado[i]['DESCRIP_J'] = data.Listado[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
            }

            if (data.Listado.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader("hide");
        		validarAsociarNitSER504();
        	} else {
        		var columnas = [
        			{
        				title: "NIT",
                        value: "NIT_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "ENTIDAD",
                        value: "DESCRIP_J",
                        format: "string",
        			},
        			{
        				title: "FACTURA",
                        value: "CTA_J",
                        format: "string",
                    },
                    {
        				title: "ESTADO",
                        value: "ESTADO_J",
                        format: "string"
                    },
                    {
        				title: "FECHA APER",
                        value: "FECHAING_J",
                        format: "fecha"
                    },
                    {
        				title: "FECHA CIERRE",
                        value: "FECHARET_J",
                        format: "fecha"
                    },
                    {
        				title: "FECHA RADICA",
                        value: "FECHA_RAD_J",
                        format: "fecha"
                    },
                    {
        				title: "FECHA RADGLO",
                        value: "FECHA_RADG_J",
                        format: "fecha"
                    },
                    {
        				title: "FECHA INGGLO",
                        value: "FECHA_INGG_J",
                        format: "fecha"
                    },
                    {
        				title: "ENVIO",
                        value: "ENVIO_J",
                        format: "string"
                    },
                    {
        				title: "DIAS",
                        value: "DIAS_J",
                        format: "string"
                    },
        			{
        				title: "VLR BRUTO",
                        value: "BRUTO_J",
                        format: 'money'
                    },
                    {
        				title: "VLR ABONOS",
                        value: "ABONOS_J",
                        format: 'money'
                    },
                    {
        				title: "VLR GLOSAS",
                        value: "GLOSA_J",
                        format: 'money'
        			},
                    {
        				title: "VLR NOTAS",
                        value: "NOTAS_J",
                        format: 'money'
                    },
                    {
        				title: "VLR COPAGOS",
                        value: "COPAGOS_J",
                        format: 'money'
                    },
                    {
        				title: "SALDO NETO",
                        value: "SALDO_J",
                        format: "money"
                    },
                    {
        				title: "VLR SIN RADIC.",
                        value: "VLR_SINRAD_J",
                        format: "money"
                    },
                    {
        				title: "RADICDA",
                        value: "RADICAR_J",
                        format: "string"
                    },
                    {
        				title: "ACTIVIDAD",
                        value: "ACTIV_J",
                        format: "string"
                    },
                    {
        				title: "FECHA DE CONTABILIZACION",
                        value: "PER_CONT_RAD_J",
                        format: "string"
                    },
                    {
        				title: "COD EPS",
                        value: "EPS_J",
                        format: "string"
                    },
                    
        		]

        		var header_format = [
        			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
        			`LISTADO DE FACTURACION     NIT: ${nit}`,
        			`FECHA DE CORTE: ${$this.fechaFinal}`,
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
        				data: data.Listado,
        				// heightRow: 35,
        				// theme: 'TableStyleDark1'
                    },
                    archivo: `${localStorage.Usuario + moment().format(`YYMMDD-HHmmss`)}`
        			// archivo: 'LISTADO-CARTERA-ACTIVIDAD',
        			// scale: 65,
        			// orientation: 'landscape'
        		})
        			.then(() => {
                        console.log('Proceso terminado')
                        _inputControl('reset');
        				$this.datoInicialIniSER426();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})