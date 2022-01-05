// LISTADO DE TRAZABILIDAD DE FACTURAS
// SANTIAGO - CREACION - 26/08/2020 - OPCION 9-7-4-2-4 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, nit_SER424;
new Vue({
    el: '#SER424',
    data: {
        form: {
            prefijo_424: '',
            añoIni_424: '',
            mesIni_424: '',
            diaIni_424: '',
            añoFin_424: '',
            mesFin_424: '',
            diaFin_424: '',
            añoPago_424: '',
            mesPago_424: '',
            diaPago_424: '',
            orden_424: '',
            nit_424: '',
            descripNit_SER424: '',
            listar_424: '',
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-4-2-4 - Informe de trazabilidad factura');
        this._consultarNitSER424();
    },
    watch: {
    },
    mounted: function () {
        this.validarPrefijoSER424();
    },
    methods: {
        validarPrefijoSER424() {
            this.form.prefijo_424 == '' ? this.form.prefijo_424 = "*" : false;
            $this = this
			validarInputs(
				{
					form: "#prefijo_SER424",
					orden: "1"
				},
				() => {
					_toggleNav();
				},
				() => {
                    var prefijo = $this.form.prefijo_424.toUpperCase();
                    if (prefijo.trim() == "*" ){
                        this.datoInicialIniSER424();
                    }else {
                        prefijo = $this.form.prefijo_424.toUpperCase();
                        const res = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q", "R", "S", "V", "W", "X", "Y", "Z"].find(e => e == prefijo);
                        if (res == undefined) {
                            $this.form.prefijo_424 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarPrefijoSER424()
                        }else {
                            this.datoInicialIniSER424();
                        }
                    }
				}
			)
        },

        datoInicialIniSER424() {
			this.form.mesIni_424 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_424 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_424 = '01';
			this.validarFechaIniSER424("1")
        },
        
        validarFechaIniSER424(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_424",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarPrefijoSER424();
				},
				() => {
                    $this.form.diaIni_424 = cerosIzq($this.form.diaIni_424, 2);
                    $this.form.mesIni_424 = cerosIzq($this.form.mesIni_424, 2);
                    $this.fechaInicial = this.form.añoIni_424 + $this.form.mesIni_424 + $this.form.diaIni_424;
                    var añoInicial = parseFloat($this.form.añoIni_424);
					var diaInicial = parseFloat($this.form.diaIni_424);
                    var mesInicial = parseFloat($this.form.mesIni_424);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER424('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER424('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER424('2');
                        } else {
                            $this.datoInicialFinSER424();
                        }
                    }
				}
			)
        },

        datoInicialFinSER424() {
			this.form.mesFin_424 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_424 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_424 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER424("1")
        },
        
        validarFechaFinSER424(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_424",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER424("1");
				},
				() => {
					$this.form.diaFin_424 = cerosIzq($this.form.diaFin_424, 2);
                    $this.form.mesFin_424 = cerosIzq($this.form.mesFin_424, 2);
                    $this.fechaFinal = this.form.añoFin_424 + $this.form.mesFin_424 + $this.form.diaFin_424;
                    var añoPago = parseFloat($this.form.añoFin_424);
					var diaPago = parseFloat($this.form.diaFin_424);
                    var mesPago = parseFloat($this.form.mesFin_424);
                    if (parseInt(añoPago) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER424('1');
                    } else {
                        if (parseInt(diaPago) < 1 || parseInt(diaPago) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER424('3');
                        } else if (parseInt(mesPago) < 1 || parseInt(mesPago) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER424('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER424('2');
                        } else {
                            $this.datoInicialPagoSER424();
                        }
                    }
				}
			)
        },

        datoInicialPagoSER424() {
			this.form.mesPago_424 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoPago_424 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaPago_424 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaPagoSER424("1")
        },
        
        validarFechaPagoSER424(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaPago_424",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaFinSER424("1");
				},
				() => {
					$this.form.diaPago_424 = cerosIzq($this.form.diaPago_424, 2);
                    $this.form.mesPago_424 = cerosIzq($this.form.mesPago_424, 2);
                    $this.fechaPago = this.form.añoPago_424 + $this.form.mesPago_424 + $this.form.diaPago_424;
                    var añoPago = parseFloat($this.form.añoPago_424);
					var diaPago = parseFloat($this.form.diaPago_424);
                    var mesPago = parseFloat($this.form.mesPago_424);
                    if (parseInt(añoPago) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaPagoSER424('1');
                    } else {
                        if (parseInt(diaPago) < 1 || parseInt(diaPago) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaPagoSER424('3');
                        } else if (parseInt(mesPago) < 1 || parseInt(mesPago) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaPagoSER424('2');
                        } else if ($this.fechaPago < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaPagoSER424('2');
                        } else {
                            $this.validarOrdenSER424();
                        }
                    }
				}
			)
        },

        validarOrdenSER424() {
            this.form.orden_424 == '' ? this.form.orden_424 = "1" : false;
            $this = this
			validarInputs(
				{
					form: "#orden_SER424",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaPagoSER424("1");
				},
				() => {
                    var orden = $this.form.orden_424;
                    if (orden == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarOrdenSER424();
                    } else if (orden == "1" || orden == "2") {
                        this.validarNitSER424()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarOrdenSER424();
                    }
				}
			)
        },

        validarNitSER424() {
            this.form.nit_424 == '' ? this.form.nit_424 = "99" : false;
            $this = this
			validarInputs(
				{
					form: "#nit_SER424",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarOrdenSER424();
				},
				() => {
                    var nit = $this.form.nit_424;
                    if (nit.trim() == "99" ){
                        $this.form.descripNit_SER424 = "Proceso total"
                        this.validarListarSER424();
                    }else {
                        const res = $this.nit_SER424.find(e => e.COD.trim() == nit );
                        if (res == undefined) {
                            $this.form.nit_424 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarNitSER424()
                        }else {
                            $this.form.descripNit_SER424 = res.NOMBRE;
                            this.validarListarSER424();
                        }
                    }
				}
			)
        },

        validarListarSER424() {
            $this = this
            this.form.listar_424 == '' ? this.form.listar_424 = "N" : false;
            validarInputs(
				{
					form: "#listar_SER424",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarNitSER424();
				},
                () => {
                    var temp = $this.form.listar_424.toUpperCase();
                    if (temp == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarListarSER424();
                    } else if (temp == "S" || temp == "N") {
                        this._envioImpresion()
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarListarSER424();
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
                        + '|' + $this.form.prefijo_424.toUpperCase()
                        + '|' + $this.fechaInicial.toString()
                        + '|' + $this.fechaFinal.toString()
                        + '|' + $this.fechaPago.toString()
                        + '|' + $this.form.orden_424
                        + '|' + $this.form.nit_424
                        + '|' + $this.form.listar_424.toUpperCase()
                        + '|' + moment().format('YYMMDD');

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER424.DLL'))
                        .then($this._montarImpresion_SER424)
                        .catch(err => {
                            console.log(err)
                            $this.validarListarSER424();
                        })
                } else {
                    $this.validarListarSER424();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _consultarNitSER424() {
            $this = this;
            postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
                .then(data => {
                    loader("hide");
                    $this.nit_SER424 = data.TERCEROS;
                    $this.nit_SER424.pop();
                    console.log(nit_SER424);
                }).catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },

        _ventanaNitSER424() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE TERCEROS",
                columnas: ["COD", "NOMBRE"],
                data: $this.nit_SER424,
                callback_esc: function () {
                    document.querySelector('.nit_424').focus();
                },
                callback: function (data) {
                    $this.form.nit_424 = data.COD.trim();
                    _enterInput('.nit_424');
                }
            })
        },

        _montarImpresion_SER424(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.Listado) {
                data.Listado[i]['DESCRIP_J'] = data.Listado[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
                data.Listado[i]['CLIENTE_DEVOL_J'] = data.Listado[i]['CLIENTE_DEVOL_J'].replace(/\�/g, "Ñ")
            }

            if (data.Listado.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader("hide");
        		validarAsociarNitSER504();
        	} else {
        		var columnas = [
        			{
        				title: "FAC.",
                        value: "FACT_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "CONV",
                        value: "CONVENIO_J",
                        format: "string",
        			},
        			{
        				title: "ENTIDAD",
                        value: "DESCRIP_J",
                        format: "string",
                    },
                    {
        				title: "F.INGRES",
                        value: "FECHA_ING_J",
                        format: "string"
                    },
                    {
        				title: "F.EGRESO",
                        value: "FECHA_RET_J",
                        format: "string"
                    },
                    {
        				title: "F.PRESEN",
                        value: "FECHA_PRE_J",
                        format: "string"
                    },
                    {
        				title: "2DA PRESEN",
                        value: "FECHA_PRE2_J",
                        format: "string"
                    },
                    {
        				title: "FACT-ARMAD",
                        value: "FECHA_FACT_ARMA_J",
                        format: "string"
                    },
                    {
        				title: "ARMAD-FACT",
                        value: "FECHA_ARMA_FACT_J",
                        format: "string"
                    },
                    {
        				title: "ARMAD-RADI",
                        value: "FECHA_ARMA_RADI_J",
                        format: "string"
                    },
                    {
        				title: "RADIC-ARM",
                        value: "FECHA_RADI_ARMA_J",
                        format: "string"
                    },
        			{
        				title: "NRO ENV",
                        value: "ENVIO_J",
                        format: 'string'
                    },
                    {
        				title: "ESTADO",
                        value: "ESTADO_J",
                        format: 'string'
                    },
                    {
        				title: "VLR BRUTO",
                        value: "VLR_BRUTO_J",
                        format: 'money'
        			},
                    {
        				title: "COPAGOS",
                        value: "VLR_COPAGOS_J",
                        format: 'money'
                    },
                    {
        				title: "NETO",
                        value: "NETO_J",
                        format: 'money'
                    },
                    {
        				title: "F. GLOSA",
                        value: "FECHA_GLO1_J",
                        format: "string"
                    },
                    {
        				title: "VLR GLOSA",
                        value: "VLR_GLOSA1_J",
                        format: "money"
                    },
                    {
        				title: "F. RESPUESTA",
                        value: "FECHA_GLO2_J",
                        format: "string"
                    },
                    {
        				title: "VLR ACEPTADO",
                        value: "VLR_ACEP2_J",
                        format: "money"
                    },
                    {
        				title: "VLR SOPORTADO",
                        value: "VLR_RESP2_J",
                        format: "money"
                    },
                    {
        				title: "F. REITERAC",
                        value: "FECHA_GLO3_J",
                        format: "string"
                    },
                    {
        				title: "VLR REITERACION",
                        value: "VLR_GLOSA3_J",
                        format: "money"
                    },
                    {
        				title: "2a RESP",
                        value: "FECHA_GLO4_J",
                        format: "string"
                    },
                    {
        				title: "VLR ACEPTADO 2",
                        value: "VLR_ACEP4_J",
                        format: "money"
                    },
                    {
        				title: "VLR SOPORTADO 2",
                        value: "VLR_RESP4_J",
                        format: "money"
                    },
                    {
        				title: "CONCIL.",
                        value: "FECHA_GLO5_J",
                        format: "string"
                    },
                    {
        				title: "VLR ACEPTADO EN CONCIL",
                        value: "VLR_ACEP5_J",
                        format: "money"
                    },
                    {
        				title: "TOTAL ACEPTADO",
                        value: "TOT_GLOSA_J",
                        format: "money"
                    },
                    {
        				title: "SALDO FACTURA",
                        value: "SALDO_GLOSA_J",
                        format: "money"
                    },
                    {
        				title: "F. PAGO 1",
                        value: "FECHA_PAG1_J",
                        format: "string"
                    },
                    {
        				title: "VLR 1ER PAGO",
                        value: "VLR_PAGO1_J",
                        format: "money"
                    },
                    {
        				title: "F. PAGO 2",
                        value: "FECHA_PAG2_J",
                        format: "string"
                    },
                    {
        				title: "VLR 2DO PAGO",
                        value: "VLR_PAGO2_J",
                        format: "money"
                    },
                    {
        				title: "F. PAGO 3",
                        value: "FECHA_PAG3_J",
                        format: "string"
                    },
                    {
        				title: "VLR 3ER PAGO",
                        value: "VLR_PAGO3_J",
                        format: "money"
                    },
                    {
        				title: "SALDO CARTERA",
                        value: "SALDO_CART_J",
                        format: "money"
                    },
                    {
        				title: "FECHA DEVOLUVION",
                        value: "FECHA_DEVOL_J",
                        format: "string"
                    },
                    {
        				title: "NRO DEVOL",
                        value: "NRO_DEVOLNUM_J",
                        format: 'string'
                    },
                    {
        				title: "CONCEP DEVOL",
                        value: "CONCEPTO_DEVOL_J",
                        format: 'string'
                    },
                    {
        				title: "CLIENTE DEVOLU",
                        value: "CLIENTE_DEVOL_J",
                        format: 'string'
                    },
        		]

        		var header_format = [
        			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
        			`TRAZABILIDAD DE FACTURACION     NIT: ${nit}`,
        			`FECHA: ${fecha}`,
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
        				$this.validarPrefijoSER424();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})