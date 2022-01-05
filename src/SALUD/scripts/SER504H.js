// LISTADO DE CARTERA POR ORDEN DE ACTIVIDAD
// SANTIAGO - CREACION - 04/08/2020 - OPCION 9-7-5-H-2 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, act_SER504H;
new Vue({
    el: '#SER504H',
    data: {
        form: {
            añoIni_504H: '',
            mesIni_504H: '',
            diaIni_504H: '',
            añoFin_504H: '',
            mesFin_504H: '',
            diaFin_504H: '',
            actividad_504H: '',
            descripActividad_SER504H: '',
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-H-2 - Listado de cartera por orden de actividad');
        this._consultarActividadSER504H();
    },
    watch: {
    },
    mounted: function () {
        this.datoInicialIniSER504H();
    },
    methods: {
        datoInicialIniSER504H() {
			this.form.mesIni_504H = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_504H = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_504H = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaIniSER504H("1")
        },
        
        validarFechaIniSER504H(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_504H",
					orden: orden
				},
				() => {
					_toggleNav();
				},
				() => {
                    $this.form.diaIni_504H = cerosIzq($this.form.diaIni_504H, 2);
                    $this.form.mesIni_504H = cerosIzq($this.form.mesIni_504H, 2);
                    $this.fechaInicial = this.form.añoIni_504H + $this.form.mesIni_504H + $this.form.diaIni_504H;
                    var añoInicial = parseFloat($this.form.añoIni_504H);
					var diaInicial = parseFloat($this.form.diaIni_504H);
                    var mesInicial = parseFloat($this.form.mesIni_504H);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER504H('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER504H('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER504H('2');
                        } else {
                            $this.datoInicialFinSER504H();
                        }
                    }
				}
			)
        },

        datoInicialFinSER504H() {
			this.form.mesFin_504H = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_504H = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_504H = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER504H("1")
        },
        
        validarFechaFinSER504H(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_504H",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER504H("1");
				},
				() => {
					$this.form.diaFin_504H = cerosIzq($this.form.diaFin_504H, 2);
                    $this.form.mesFin_504H = cerosIzq($this.form.mesFin_504H, 2);
                    $this.fechaFinal = this.form.añoFin_504H + $this.form.mesFin_504H + $this.form.diaFin_504H;
                    var añoFinal = parseFloat($this.form.añoFin_504H);
					var diaFinal = parseFloat($this.form.diaFin_504H);
                    var mesFinal = parseFloat($this.form.mesFin_504H);
                    if (parseInt(añoFinal) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER504H('1');
                    } else {
                        if (parseInt(diaFinal) < 1 || parseInt(diaFinal) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER504H('3');
                        } else if (parseInt(mesFinal) < 1 || parseInt(mesFinal) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER504H('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER504H('2');
                        } else {
                            $this.validarActividadSER504H();
                        }
                    }
				}
			)
        },

        validarActividadSER504H() {
            this.form.actividad_504H == '' ? this.form.actividad_504H = "**" : false;
            $this = this
			validarInputs(
				{
					form: "#actividad_SER504H",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER504H("1");
				},
				() => {
                    var actividad = $this.form.actividad_504H;
                    if (actividad.trim() == "**" ){
                        $this.form.descripActividad_SER504H = "Proceso total"
                        this._envioImpresion();
                    }else {
                        const res = $this.act_SER504H.find(e => e.COD.trim() == actividad );
                        if (res == undefined) {
                            $this.form.actividad_504H = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarActividadSER504H()
                        }else {
                            $this.form.descripActividad_SER504H = res.DESCRIP;
                            this._envioImpresion();
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
                        + '|' + $this.form.actividad_504H;

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER504H.DLL'))
                        .then($this._montarImpresion_SER504H)
                        .catch(err => {
                            console.log(err)
                            $this.validarActividadSER504H();
                        })
                } else {
                    $this.validarActividadSER504H();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _consultarActividadSER504H() {
            $this = this;
            let URL = get_url("APP/" + "CONTAB/CON806" + ".DLL");
            postData({
                datosh: datosEnvio() + localStorage['Usuario'] + "|"
            }, URL)
                .then(data => {
                    loader("hide");
                    $this.act_SER504H = data.ACTIVIDADES;
                    $this.act_SER504H.pop();
                    console.log(act_SER504H);
                }).catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },

        _ventanaActividadesSER504H() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE ACTIVIDADES",
                columnas: ["COD", "DESCRIP"],
                data: $this.act_SER504H,
                callback_esc: function () {
                    document.querySelector('.actividad_504H').focus();
                },
                callback: function (data) {
                    $this.form.actividad_504H = data.COD.trim();
                    _enterInput('.actividad_504H');
                }
            })
        },

        _montarImpresion_SER504H(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.Listado) {
                data.Listado[i]['CTA_J'] = data.Listado[i]['CTA_J'].replace(/\�/g, "Ñ")
            }

            if (data.Listado.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader("hide");
        		validarAsociarNitSER504();
        	} else {
        		var columnas = [
        			{
        				title: "TIPO DE PAGADOR",
                        value: "CTA_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "CONTRATADO",
                        value: "BRUTO_CAP_J",
                        format: 'money'
        			},
        			{
        				title: "FACTURADO",
                        value: "BRUTO_EVE_J",
                        format: 'money'
                    },
                    {
        				title: "HIJA CAP",
                        value: "BRUTO_HIJ_J",
                        format: 'money'
        			},
        			{
        				title: "GLOSA INICIAL",
                        value: "GLOSA_INIC_J",
                        format: 'money'
        			},
        			{
        				title: "GLOSA DEFINITIVA",
                        value: "GLOSA_ACEP_J",
                        format: 'money'
                    },
                    {
        				title: "RECAUDO VIGENCIA ACTUAL",
                        value: "COPAGOS_ACT_J",
                        format: 'fecha',
                    },
                    {
        				title: "COPAGOS VIGENCIA ANTERIOR",
                        value: "COPAGOS_ANT_J",
                        format: 'money'
                    },
                    {
        				title: "TOTAL RECAUDOS",
                        value: "COPAGOS_J",
                        format: 'money'
                    },
                    {
        				title: "TOTAL NETO",
                        value: "SALDO_J",
                        format: 'money'
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
        				$this.datoInicialIniSER504H();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})