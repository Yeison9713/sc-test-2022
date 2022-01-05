// listado de numeraciones, compara vlr comprobantes contra cartera
// SANTIAGO - CREACION - 25/08/2020 - OPCION 9-7-4-2-3 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, nit_SER422;
new Vue({
    el: '#SER423',
    data: {
        form: {
            prefijo_423: '',
            nit_423: '',
            descripNit_SER423: '',
            añoIni_423: '',
            mesIni_423: '',
            diaIni_423: '',
            añoFin_423: '',
            mesFin_423: '',
            diaFin_423: '',
            orden_423: '',
            tem_423: '',
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-4-2-3 - Incosistencias contra comp.');
        this._consultarNitSER423();
    },
    watch: {
    },
    mounted: function () {
        this.validarPrefijoSER423();
    },
    methods: {
        validarPrefijoSER423() {
            this.form.prefijo_423 == '' ? this.form.prefijo_423 = "*" : false;
            $this = this
			validarInputs(
				{
					form: "#prefijo_SER423",
					orden: "1"
				},
				() => {
					_toggleNav();
				},
				() => {
                    var prefijo = $this.form.prefijo_423.toUpperCase();
                    if (prefijo.trim() == "*" ){
                        this.validarNitSER423();
                    }else {
                        prefijo = $this.form.prefijo_423.toUpperCase();
                        const res = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q", "R", "S", "V", "W", "X", "Y", "Z"].find(e => e == prefijo);
                        if (res == undefined) {
                            $this.form.prefijo_423 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarPrefijoSER423()
                        }else {
                            this.validarNitSER423();
                        }
                    }
				}
			)
        },

        validarNitSER423() {
            this.form.nit_423 == '' ? this.form.nit_423 = "99" : false;
            $this = this
			validarInputs(
				{
					form: "#nit_SER423",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarPrefijoSER423();
				},
				() => {
                    var nit = $this.form.nit_423;
                    if (nit.trim() == "99" ){
                        $this.form.descripNit_SER423 = "Proceso total"
                        this.datoInicialIniSER423();
                    }else {
                        const res = $this.nit_SER423.find(e => e.COD.trim() == nit );
                        if (res == undefined) {
                            $this.form.nit_423 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarNitSER423()
                        }else {
                            $this.form.descripNit_SER423 = res.NOMBRE;
                            this.datoInicialIniSER423();
                        }
                    }
				}
			)
        },

        datoInicialIniSER423() {
			this.form.mesIni_423 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_423 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_423 = '01';
			this.validarFechaIniSER423("1")
        },
        
        validarFechaIniSER423(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_423",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarNitSER423();
				},
				() => {
                    $this.form.diaIni_423 = cerosIzq($this.form.diaIni_423, 2);
                    $this.form.mesIni_423 = cerosIzq($this.form.mesIni_423, 2);
                    $this.fechaInicial = this.form.añoIni_423 + $this.form.mesIni_423 + $this.form.diaIni_423;
                    var añoInicial = parseFloat($this.form.añoIni_423);
					var diaInicial = parseFloat($this.form.diaIni_423);
                    var mesInicial = parseFloat($this.form.mesIni_423);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER423('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER423('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER423('2');
                        } else {
                            $this.datoInicialFinSER423();
                        }
                    }
				}
			)
        },

        datoInicialFinSER423() {
			this.form.mesFin_423 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_423 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_423 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER423("1")
        },
        
        validarFechaFinSER423(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_423",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER423("1");
				},
				() => {
					$this.form.diaFin_423 = cerosIzq($this.form.diaFin_423, 2);
                    $this.form.mesFin_423 = cerosIzq($this.form.mesFin_423, 2);
                    $this.fechaFinal = this.form.añoFin_423 + $this.form.mesFin_423 + $this.form.diaFin_423;
                    var añoFinal = parseFloat($this.form.añoFin_423);
					var diaFinal = parseFloat($this.form.diaFin_423);
                    var mesFinal = parseFloat($this.form.mesFin_423);
                    if (parseInt(añoFinal) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER423('1');
                    } else {
                        if (parseInt(diaFinal) < 1 || parseInt(diaFinal) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER423('3');
                        } else if (parseInt(mesFinal) < 1 || parseInt(mesFinal) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER423('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER423('2');
                        } else {
                            $this.validarOrdenSER423();
                        }
                    }
				}
			)
        },

        validarOrdenSER423() {
            this.form.orden_423 == '' ? this.form.orden_423 = "1" : false;
            $this = this
			validarInputs(
				{
					form: "#orden_SER423",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER423("1");
				},
				() => {
                    var orden = $this.form.orden_423;
                    if (orden == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarOrdenSER423();
                    } else if (orden == "1" || orden == "2") {
                        this.validarCapitacionSER423()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarOrdenSER423();
                    }
				}
			)
        },

        validarCapitacionSER423() {
            $this = this
            this.form.tem_423 == '' ? this.form.tem_423 = "S" : false;
            validarInputs(
				{
					form: "#tem_SER423",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarOrdenSER423();
				},
                () => {
                    var temp = $this.form.tem_423.toUpperCase();
                    if (temp == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCapitacionSER423();
                    } else if (temp == "S" || temp == "N") {
                        this._envioImpresion()
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCapitacionSER423();
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
                        + '|' + $this.form.prefijo_423.toUpperCase()
                        + '|' + $this.form.nit_423
                        + '|' + $this.fechaInicial.toString()
                        + '|' + $this.fechaFinal.toString()
                        + '|' + $this.form.orden_423
                        + '|' + $this.form.tem_423.toUpperCase()
                        + '|' + moment().format('YYMMDD');

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER423.DLL'))
                        .then($this._montarImpresion_SER423)
                        .catch(err => {
                            console.log(err)
                            $this.validarCapitacionSER423();
                        })
                } else {
                    $this.validarCapitacionSER423();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _consultarNitSER423() {
            $this = this;
            postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
                .then(data => {
                    loader("hide");
                    $this.nit_SER423 = data.TERCEROS;
                    $this.nit_SER423.pop();
                    console.log(nit_SER423);
                }).catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },

        _ventanaNitSER423() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE TERCEROS",
                columnas: ["COD", "NOMBRE"],
                data: $this.nit_SER423,
                callback_esc: function () {
                    document.querySelector('.nit_423').focus();
                },
                callback: function (data) {
                    $this.form.nit_423 = data.COD.trim();
                    _enterInput('.nit_423');
                }
            })
        },

        _montarImpresion_SER423(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.Listado) {
                data.Listado[i]['ENTIDAD_J'] = data.Listado[i]['ENTIDAD_J'].replace(/\�/g, "Ñ")
            }

            if (data.Listado.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader("hide");
        		validarAsociarNitSER504();
        	} else {
        		var columnas = [
        			{
        				title: "FACTURA",
                        value: "FACT_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "NIT",
                        value: "NIT_J",
                        format: "string",
        			},
        			{
        				title: "ENTIDAD",
                        value: "ENTIDAD_J",
                        format: "string",
                    },
                    {
        				title: "FECHA ING",
                        value: "FECHA_ING_J",
                        format: "fecha"
                    },
                    {
        				title: "FECHA CIE",
                        value: "FECHA_RET_J",
                        format: "fecha"
        			},
        			{
        				title: "FACT CAPIT",
                        value: "FACT_CAPIT_J",
                        format: 'string'
                    },
                    {
        				title: "VLR COMPROBANTES",
                        value: "VLR_COMP_J",
                        format: 'money'
        			},
                    {
        				title: "TOT. COMPROB",
                        value: "VLR_BRUTO_J",
                        format: 'money'
                    },
                    {
        				title: "DIF. CARTERA",
                        value: "VLR_DESCU_J",
                        format: 'money'
                    },
        		]

        		var header_format = [
        			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
        			`FACTURACION POR CLASE DE COMPROBANTE     NIT: ${nit}`,
        			`DESDE: ${$this.fechaInicial}  HASTA: ${$this.fechaFinal}`,
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
        				$this.validarPrefijoSER423();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})