// listado de numeraciones
// SANTIAGO - CREACION - 21/08/2020 - OPCION 9-7-4-2-2 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, nit_SER422;
new Vue({
    el: '#SER422',
    data: {
        form: {
            prefijo_422: '',
            nit_422: '',
            descripNit_SER422: '',
            añoIni_422: '',
            mesIni_422: '',
            diaIni_422: '',
            añoFin_422: '',
            mesFin_422: '',
            diaFin_422: '',
            discri_422: '',
            orden_422: '',
            tem_422: '',
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-4-2-2 - Facturación por clase de comp.');
        this._consultarNitSER422();
    },
    watch: {
    },
    mounted: function () {
        this.validarPrefijoSER422();
    },
    methods: {
        validarPrefijoSER422() {
            this.form.prefijo_422 == '' ? this.form.prefijo_422 = "*" : false;
            $this = this
			validarInputs(
				{
					form: "#prefijo_SER422",
					orden: "1"
				},
				() => {
					_toggleNav();
				},
				() => {
                    var prefijo = $this.form.prefijo_422.toUpperCase();
                    if (prefijo.trim() == "*" ){
                        this.validarNitSER422();
                    }else {
                        prefijo = $this.form.prefijo_422.toUpperCase();
                        const res = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q", "R", "S", "V", "W", "X", "Y", "Z"].find(e => e == prefijo);
                        if (res == undefined) {
                            $this.form.prefijo_422 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarPrefijoSER422()
                        }else {
                            this.validarNitSER422();
                        }
                    }
				}
			)
        },

        validarNitSER422() {
            this.form.nit_422 == '' ? this.form.nit_422 = "99" : false;
            $this = this
			validarInputs(
				{
					form: "#nit_SER422",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarPrefijoSER422();
				},
				() => {
                    var nit = $this.form.nit_422;
                    if (nit.trim() == "99" ){
                        $this.form.descripNit_SER422 = "Proceso total"
                        this.datoInicialIniSER422();
                    }else {
                        const res = $this.nit_SER422.find(e => e.COD.trim() == nit );
                        if (res == undefined) {
                            $this.form.nit_422 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarNitSER422()
                        }else {
                            $this.form.descripNit_SER422 = res.NOMBRE;
                            this.datoInicialIniSER422();
                        }
                    }
				}
			)
        },

        datoInicialIniSER422() {
			this.form.mesIni_422 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_422 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_422 = '01';
			this.validarFechaIniSER422("1")
        },
        
        validarFechaIniSER422(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_422",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarNitSER422();
				},
				() => {
                    $this.form.diaIni_422 = cerosIzq($this.form.diaIni_422, 2);
                    $this.form.mesIni_422 = cerosIzq($this.form.mesIni_422, 2);
                    $this.fechaInicial = this.form.añoIni_422 + $this.form.mesIni_422 + $this.form.diaIni_422;
                    var añoInicial = parseFloat($this.form.añoIni_422);
					var diaInicial = parseFloat($this.form.diaIni_422);
                    var mesInicial = parseFloat($this.form.mesIni_422);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER422('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER422('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER422('2');
                        } else {
                            $this.datoInicialFinSER422();
                        }
                    }
				}
			)
        },

        datoInicialFinSER422() {
			this.form.mesFin_422 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_422 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_422 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER422("1")
        },
        
        validarFechaFinSER422(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_422",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER422("1");
				},
				() => {
					$this.form.diaFin_422 = cerosIzq($this.form.diaFin_422, 2);
                    $this.form.mesFin_422 = cerosIzq($this.form.mesFin_422, 2);
                    $this.fechaFinal = this.form.añoFin_422 + $this.form.mesFin_422 + $this.form.diaFin_422;
                    var añoFinal = parseFloat($this.form.añoFin_422);
					var diaFinal = parseFloat($this.form.diaFin_422);
                    var mesFinal = parseFloat($this.form.mesFin_422);
                    if (parseInt(añoFinal) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER422('1');
                    } else {
                        if (parseInt(diaFinal) < 1 || parseInt(diaFinal) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER422('3');
                        } else if (parseInt(mesFinal) < 1 || parseInt(mesFinal) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER422('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER422('2');
                        } else {
                            $this.validarDiscriminarSER422();
                        }
                    }
				}
			)
        },

        validarDiscriminarSER422(){
            var nit = $this.form.nit_422;
            if (nit == "99") {
                this.form.discri_422 == '' ? this.form.discri_422 = "S" : false;
                $this.validarOrdenSER422();
            }else {
                $this.validarDiscriSER422();
            }
        },

        validarDiscriSER422() {
            $this = this
            this.form.discri_422 == '' ? this.form.discri_422 = "S" : false;
            validarInputs(
				{
					form: "#discri_SER422",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER422("1");
				},
                () => {
                    var discri = $this.form.discri_422.toUpperCase();
                    if (discri == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarDiscriSER422();
                    } else if (discri == "S" || discri == "N") {
                        this.validarOrdenSER422()
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarDiscriSER422();
                    }
                }
			)
        },

        validarOrdenSER422() {
            this.form.orden_422 == '' ? this.form.orden_422 = "1" : false;
            $this = this
			validarInputs(
				{
					form: "#orden_SER422",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER422("1");
				},
				() => {
                    var orden = $this.form.orden_422;
                    if (orden == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarOrdenSER422();
                    } else if (orden == "1" || orden == "2") {
                        this.validarCapitacionSER422()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarOrdenSER422();
                    }
				}
			)
        },

        validarCapitacionSER422() {
            $this = this
            this.form.tem_422 == '' ? this.form.tem_422 = "S" : false;
            validarInputs(
				{
					form: "#tem_SER422",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarOrdenSER422();
				},
                () => {
                    var temp = $this.form.tem_422.toUpperCase();
                    if (temp == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCapitacionSER422();
                    } else if (temp == "S" || temp == "N") {
                        this._envioImpresion()
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCapitacionSER422();
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
                        + '|' + $this.form.prefijo_422.toUpperCase()
                        + '|' + $this.form.nit_422
                        + '|' + $this.fechaInicial.toString()
                        + '|' + $this.fechaFinal.toString()
                        + '|' + $this.form.discri_422.toUpperCase()
                        + '|' + $this.form.orden_422
                        + '|' + $this.form.tem_422.toUpperCase()

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER422.DLL'))
                        .then($this._montarImpresion_SER422)
                        .catch(err => {
                            console.log(err)
                            $this.validarCapitacionSER422();
                        })
                } else {
                    $this.validarCapitacionSER422();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _consultarNitSER422() {
            $this = this;
            postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
                .then(data => {
                    loader("hide");
                    $this.nit_SER422 = data.TERCEROS;
                    $this.nit_SER422.pop();
                    console.log(nit_SER422);
                }).catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },

        _ventanaNitSER422() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE TERCEROS",
                columnas: ["COD", "NOMBRE"],
                data: $this.nit_SER422,
                callback_esc: function () {
                    document.querySelector('.nit_422').focus();
                },
                callback: function (data) {
                    $this.form.nit_422 = data.COD.trim();
                    _enterInput('.nit_422');
                }
            })
        },

        _montarImpresion_SER422(data) {
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
        				title: "CAPITACION",
                        value: "FACT_CAPIT_J",
                        format: 'string'
        			},
        			{
        				title: "MEDICAMENTOS",
                        value: "VLR_DROG_J",
                        format: 'money'
                    },
                    {
        				title: "CIRUGIAS",
                        value: "VLR_CIRU_J",
                        format: 'money'
                    },
                    {
        				title: "LABORATORIOS",
                        value: "VLR_LABO_J",
                        format: 'money'
                    },
                    {
        				title: "IMAGENOLOGIA",
                        value: "VLR_IMAG_J",
                        format: 'money'
                    },
                    {
        				title: "ESTANCIAS",
                        value: "VLR_ESTAN_J",
                        format: 'money'
                    },
                    {
        				title: "TRASL PACIENTES",
                        value: "VLR_TRASL_J",
                        format: 'money'
                    },
                    {
        				title: "OTROS SERV",
                        value: "VLR_OTRO_J",
                        format: 'money'
                    },
                    {
        				title: "CONSULTAS Y TERAP",
                        value: "VLR_CONS_J",
                        format: 'money'
                    },
                    {
        				title: "P Y P",
                        value: "VLR_PYP_J",
                        format: 'money'
                    },
                    {
        				title: "TOT. COMPROB",
                        value: "VLR_BRUTO_J",
                        format: 'money'
                    },
                    {
        				title: "BRUTO CARTERA",
                        value: "VLR_CARTERA_J",
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
        				$this.validarPrefijoSER422();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})