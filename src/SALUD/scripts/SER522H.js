// LISTADO GENERAL DE CARTERA POR ORDEN DE ACTIVIDAD ECONOMICA > 1800
// SANTIAGO - CREACION - 05/08/2020 - OPCION 9-7-5-H-3 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, act_SER522H;
new Vue({
    el: '#SER522H',
    data: {
        form: {
            añoIni_522H: '',
            mesIni_522H: '',
            diaIni_522H: '',
            añoFin_522H: '',
            mesFin_522H: '',
            diaFin_522H: '',
            actividad_522H: '',
            descripActividad_SER522H: '',
            cancel_522H: '',
            cliente_522H: '',
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-H-3 - Listado general de cartera por orden de actividad economica > 1800');
        this._consultarActividadSER522H();
    },
    watch: {
    },
    mounted: function () {
        this.datoInicialIniSER522H();
    },
    methods: {
        datoInicialIniSER522H() {
			this.form.mesIni_522H = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_522H = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_522H = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaIniSER522H("1")
        },
        
        validarFechaIniSER522H(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_522H",
					orden: orden
				},
				() => {
					_toggleNav();
				},
				() => {
                    $this.form.diaIni_522H = cerosIzq($this.form.diaIni_522H, 2);
                    $this.form.mesIni_522H = cerosIzq($this.form.mesIni_522H, 2);
                    $this.fechaInicial = this.form.añoIni_522H + $this.form.mesIni_522H + $this.form.diaIni_522H;
                    var añoInicial = parseFloat($this.form.añoIni_522H);
					var diaInicial = parseFloat($this.form.diaIni_522H);
                    var mesInicial = parseFloat($this.form.mesIni_522H);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER522H('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER522H('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER522H('2');
                        } else {
                            $this.datoInicialFinSER522H();
                        }
                    }
				}
			)
        },

        datoInicialFinSER522H() {
			this.form.mesFin_522H = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_522H = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_522H = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER522H("1")
        },
        
        validarFechaFinSER522H(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_522H",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER522H("1");
				},
				() => {
					$this.form.diaFin_522H = cerosIzq($this.form.diaFin_522H, 2);
                    $this.form.mesFin_522H = cerosIzq($this.form.mesFin_522H, 2);
                    $this.fechaFinal = this.form.añoFin_522H + $this.form.mesFin_522H + $this.form.diaFin_522H;
                    var añoFinal = parseFloat($this.form.añoFin_522H);
					var diaFinal = parseFloat($this.form.diaFin_522H);
                    var mesFinal = parseFloat($this.form.mesFin_522H);
                    if (parseInt(añoFinal) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER522H('1');
                    } else {
                        if (parseInt(diaFinal) < 1 || parseInt(diaFinal) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER522H('3');
                        } else if (parseInt(mesFinal) < 1 || parseInt(mesFinal) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER522H('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER522H('2');
                        } else {
                            $this.validarActividadSER522H();
                        }
                    }
				}
			)
        },

        validarActividadSER522H() {
            this.form.actividad_522H == '' ? this.form.actividad_522H = "**" : false;
            $this = this
			validarInputs(
				{
					form: "#actividad_SER522H",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER522H("1");
				},
				() => {
                    var actividad = $this.form.actividad_522H;
                    if (actividad.trim() == "**" ){
                        $this.form.descripActividad_SER522H = "Proceso total"
                        this.validarCancelSER522H();
                    }else {
                        const res = $this.act_SER522H.find(e => e.COD.trim() == actividad );
                        if (res == undefined) {
                            $this.form.actividad_522H = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarActividadSER522H()
                        }else {
                            $this.form.descripActividad_SER522H = res.DESCRIP;
                            this.validarCancelSER522H();
                        }
                    }
				}
			)
        },

        validarCancelSER522H() {
            this.form.cancel_522H == '' ? this.form.cancel_522H = "N" : false;
            $this = this
			validarInputs(
				{
					form: "#cancel_SER522H",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarActividadSER522H();
				},
				() => {
                    var cancel = $this.form.cancel_522H.toUpperCase();
                    if (cancel == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCancelSER522H();
                    } else if (cancel == "S" || cancel == "N") {
                        this.validarClienteSER522H()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCancelSER522H();
                    }
				}
			)
        },

        validarClienteSER522H() {
            this.form.cliente_522H == '' ? this.form.cliente_522H = "N" : false;
            $this = this
			validarInputs(
				{
					form: "#cliente_SER522H",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarCancelSER522H();
				},
				() => {
                    var cancel = $this.form.cliente_522H.toUpperCase();
                    if (cancel == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarClienteSER522H();
                    } else if (cancel == "S" || cancel == "N") {
                        this._envioImpresion()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarClienteSER522H();
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
                        + '|' + $this.form.actividad_522H
                        + '|' + $this.form.cancel_522H.toUpperCase()
                        + '|' + $this.form.cliente_522H.toUpperCase()
                        + '|' + moment().format('YYYYMMDD');

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER522H.DLL'))
                        .then($this._montarImpresion_SER522H)
                        .catch(err => {
                            console.log(err)
                            $this.validarClienteSER522H();
                        })
                } else {
                    $this.validarClienteSER522H();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _consultarActividadSER522H() {
            $this = this;
            let URL = get_url("APP/" + "CONTAB/CON806" + ".DLL");
            postData({
                datosh: datosEnvio() + localStorage['Usuario'] + "|"
            }, URL)
                .then(data => {
                    loader("hide");
                    $this.act_SER522H = data.ACTIVIDADES;
                    $this.act_SER522H.pop();
                    console.log(act_SER522H);
                }).catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },

        _ventanaActividadesSER522H() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE ACTIVIDADES",
                columnas: ["COD", "DESCRIP"],
                data: $this.act_SER522H,
                callback_esc: function () {
                    document.querySelector('.actividad_522H').focus();
                },
                callback: function (data) {
                    $this.form.actividad_522H = data.COD.trim();
                    _enterInput('.actividad_522H');
                }
            })
        },

        _montarImpresion_SER522H(data) {
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
        				title: "ENTIDAD",
                        value: "DESCRIP_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "FACTURA",
                        value: "CTA_J",
                        format: "string",
        			},
        			{
        				title: "FECHA",
                        value: "FECHA_J",
                        format: 'fecha',
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
        				title: "VLR ABONOS ANT",
                        value: "ABONOS_ANT_J",
                        format: 'money'
                    },
                    {
        				title: "VLR ABONOS ACT",
                        value: "ABONOS_ACT_J",
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
        				title: "VLR GLOSA",
                        value: "GLOSA_J",
                        format: 'money'
                    },
                    {
        				title: "SALDO NETO",
                        value: "SALDO_J",
                        format: 'money'
                    },
                    {
        				title: "VLR SIN RADIC",
                        value: "VLR_SINRAD_J",
                        format: 'money'
                    },
                    {
        				title: "POR VENCER",
                        value: "VLR_00_J",
                        format: 'money'
                    },
                    {
        				title: "DE 1 A 30",
                        value: "VLR_30_J",
                        format: 'money'
                    },
                    {
        				title: "DE 31 A 60",
                        value: "VLR_60_J",
                        format: 'money'
                    },
                    {
        				title: "DE 61 A 90",
                        value: "VLR_90_J",
                        format: 'money'
                    },
                    {
        				title: "DE 91 A 120",
                        value: "VLR_120_J",
                        format: 'money'
                    },
                    {
        				title: "DE 121 A 180",
                        value: "VLR_180_J",
                        format: 'money'
                    },
                    {
        				title: "DE 181 A 270",
                        value: "VLR_270_J",
                        format: 'money'
                    },
                    {
        				title: "DE 271 A 360",
                        value: "VLR_360_J",
                        format: 'money'
                    },
                    {
        				title: "DE 361 A 720",
                        value: "VLR_720_J",
                        format: 'money'
                    },
                    {
        				title: "DE 721 A 1080",
                        value: "VLR_1080_J",
                        format: 'money'
                    },
                    {
        				title: "DE 1081 A 1440",
                        value: "VLR_1440_J",
                        format: 'money'
                    },
                    {
        				title: "DE 1441 A 1800",
                        value: "VLR_1800_J",
                        format: 'money'
                    },
                    {
        				title: "MAS DE 1800",
                        value: "VLR_MAS_J",
                        format: 'money'
                    },
                    {
        				title: "ESTADO RADIC",
                        value: "RADICA_J",
                    },
                    {
        				title: "RUBRO",
                        value: "CTA_PRESUP_J",
                        format: "string",
                    },
                    {
        				title: "CTA CONTA",
                        value: "CUENTA_J",
                    },
                    {
        				title: "ACT",
                        value: "ACTIV_J",
                    },
        		]

        		var header_format = [
        			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
        			`LISTADO DE CARTERA POR ORDEN DE ACTIVIDAD     NIT: ${nit}`,
        			`PERIODO: ${fecha}`,
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
        				$this.datoInicialIniSER522H();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})