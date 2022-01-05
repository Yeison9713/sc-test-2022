// INFORME CONTRALORIA PRODUCCION ANUAL
// SANTIAGO - CREACION - 11/08/2020 - OPCION 9-7-5-H-5 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, act_SER5086;
new Vue({
    el: '#SER5086',
    data: {
        form: {
            añoIni_5086: '',
            mesIni_5086: '',
            diaIni_5086: '',
            añoFin_5086: '',
            mesFin_5086: '',
            diaFin_5086: '',
            actividad_5086: '',
            descripActividad_SER5086: '',
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-H-6 - Mecanismo de pago');
        this._cargarActividades();
    },
    watch: {
    },
    mounted: function () {
        this.datoInicialIniSER5086();
    },
    methods: {
        datoInicialIniSER5086() {
			this.form.mesIni_5086 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_5086 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_5086 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaIniSER5086("1")
        },
        
        validarFechaIniSER5086(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_5086",
					orden: orden
				},
				() => {
					_toggleNav();
				},
				() => {
                    $this.form.diaIni_5086 = cerosIzq($this.form.diaIni_5086, 2);
                    $this.form.mesIni_5086 = cerosIzq($this.form.mesIni_5086, 2);
                    $this.fechaInicial = this.form.añoIni_5086 + $this.form.mesIni_5086 + $this.form.diaIni_5086;
                    var añoInicial = parseFloat($this.form.añoIni_5086);
					var diaInicial = parseFloat($this.form.diaIni_5086);
                    var mesInicial = parseFloat($this.form.mesIni_5086);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER5086('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER5086('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER55086('2');
                        } else {
                            $this.datoInicialFinSER5086();
                        }
                    }
				}
			)
        },

        datoInicialFinSER5086() {
			this.form.mesFin_5086 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_5086 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_5086 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER5086("1")
        },
        
        validarFechaFinSER5086(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_5086",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER5086("1");
				},
				() => {
					$this.form.diaFin_5086 = cerosIzq($this.form.diaFin_5086, 2);
                    $this.form.mesFin_5086 = cerosIzq($this.form.mesFin_5086, 2);
                    $this.fechaFinal = this.form.añoFin_5086 + $this.form.mesFin_5086 + $this.form.diaFin_5086;
                    var añoFinal = parseFloat($this.form.añoFin_5086);
					var diaFinal = parseFloat($this.form.diaFin_5086);
                    var mesFinal = parseFloat($this.form.mesFin_5086);
                    if (parseInt(añoFinal) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER5086('1');
                    } else {
                        if (parseInt(diaFinal) < 1 || parseInt(diaFinal) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER5086('3');
                        } else if (parseInt(mesFinal) < 1 || parseInt(mesFinal) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER5086('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER5086('2');
                        } else {
                            $this.validarActividadSER5086();
                        }
                    }
				}
			)
        },

        validarActividadSER5086() {
            this.form.actividad_5086 == '' ? this.form.actividad_5086 = "**" : false;
            $this = this
			validarInputs(
				{
					form: "#actividad_SER5086",
					orden: "1"
				},
				() => {
                    this.selected = '';                    
                    this.validarFechaIniSER5086("1");
				},
				() => {
                    var actividad = $this.form.actividad_5086;
                    if (actividad.trim() == "**" ){
                        $this.form.descripActividad_SER5086 = "Proceso total"
                        this._envioImpresion();
                    }else {
                        const res = $this.act_SER5086.find(e => e.COD.trim() == actividad );
                        if (res == undefined) {
                            $this.form.actividad_5086 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarActividadSER5086()
                        }else {
                            $this.form.descripActividad_SER5086 = res.DESCRIP;
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
                        + '|' + $this.form.actividad_5086

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER5086.DLL'))
                        .then($this._montarImpresion_SER5086)
                        .catch(err => {
                            console.log(err)
                            $this.validarActividadSER5086();
                        })
                } else {
                    $this.validarActividadSER5086();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _cargarActividades() {
            $this = this;
            let URL = get_url("APP/" + "CONTAB/CON806" + ".DLL");
            postData({
                datosh: datosEnvio() + localStorage['Usuario'] + "|"
            }, URL)
                .then(data => {
                    $this.act_SER5086 = data.ACTIVIDADES;
                    $this.act_SER5086.pop();
                    console.log(act_SER5086)
                }).catch(err => {
                    loader('hide');
                    console.log("error entidades")
                    _toggleNav();
                })
        },

        _ventanaActividadSER5086() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA ACTIVIDADES",
                columnas: ["COD", "DESCRIP"],
                data: $this.act_SER5086,
                callback_esc: function () {
                    document.querySelector('.actividad_5086').focus();
                },
                callback: function (data) {
                    $this.form.actividad_5086 = data.COD.trim();
                    _enterInput('.actividad_5086');
                }
            })
        },

        _montarImpresion_SER5086(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();

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
        				title: "REGIMEN SEGUN COMPRADOR",
                        value: "CTA_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "CAPITACION CONTRATADA",
                        value: "BRUTO_CAP_J",
                        format: 'money'
        			},
        			{
        				title: "CAPITACION RECAUDADO",
                        value: "COPAGOS_J",
                        format: 'money'
                    },
                    {
        				title: "EVENTO CONTRATADO",
                        value: "BRUTO_EVE_J",
                        format: 'money'
        			},
        			{
        				title: "EVENTO RECAUDADO",
                        value: "COPAGOS1_J",
                        format: 'money'
        			},
        		]

        		var header_format = [
        			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
        			`LISTADO DE CARTERA POR ORDEN DE ACTIVIDAD     NIT: ${nit}`,
        			`DESDE: ${$this.fechaInicial}      HASTA:${$this.fechaFinal} `,
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
        				$this.datoInicialIniSER5086();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})