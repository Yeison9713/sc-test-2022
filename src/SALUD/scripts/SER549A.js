// INFORME CONTRALORIA PRODUCCION ANUAL
// SANTIAGO - CREACION - 11/08/2020 - OPCION 9-7-5-H-5 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, ter_SER753B;
new Vue({
    el: '#SER549A',
    data: {
        form: {
            entidad_549A: '',
            descripEntidad_SER549A: '',
            añoIni_549A: '',
            mesIni_549A: '',
            diaIni_549A: '',
            añoFin_549A: '',
            mesFin_549A: '',
            diaFin_549A: '',
            sucursal_549A: '',
            descripSucursal_SER549A: ''
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-H-5 - Informe saneamiento fiscal');
        this._cargarEntidades();
    },
    watch: {
    },
    mounted: function () {
        this.validarTercerosSER549A();
    },
    methods: {
        validarTercerosSER549A() {
            this.form.entidad_549A == '' ? this.form.entidad_549A = "99" : false;
            $this = this
			validarInputs(
				{
					form: "#entidad_SER549A",
					orden: "1"
				},
				() => {
					_toggleNav();
				},
				() => {
                    var entidad = $this.form.entidad_549A;
                    if (entidad.trim() == "99" ){
                        $this.form.descripEntidad_SER549A = "Todas las entidades"
                        this.datoInicialIniSER549A();
                    }else {
                        const res = $this.ter_SER753B.find(e => e.COD.trim() == entidad );
                        if (res == undefined) {
                            $this.form.entidad_549A = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarTercerosSER549A()
                        }else {
                            $this.form.descripEntidad_SER549A = res.NOMBRE;
                            this.datoInicialIniSER549A();
                        }
                    }
				}
			)
        },

        datoInicialIniSER549A() {
			this.form.mesIni_549A = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_549A = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_549A = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaIniSER549A("1")
        },
        
        validarFechaIniSER549A(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_549A",
					orden: orden
				},
				() => {
					this.selected = '';
                    this.validarTercerosSER549A();
				},
				() => {
                    $this.form.diaIni_549A = cerosIzq($this.form.diaIni_549A, 2);
                    $this.form.mesIni_549A = cerosIzq($this.form.mesIni_549A, 2);
                    $this.fechaInicial = this.form.añoIni_549A + $this.form.mesIni_549A + $this.form.diaIni_549A;
                    var añoInicial = parseFloat($this.form.añoIni_549A);
					var diaInicial = parseFloat($this.form.diaIni_549A);
                    var mesInicial = parseFloat($this.form.mesIni_549A);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER549A('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER549A('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER5549A('2');
                        } else {
                            $this.datoInicialFinSER549A();
                        }
                    }
				}
			)
        },

        datoInicialFinSER549A() {
			this.form.mesFin_549A = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_549A = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_549A = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER549A("1")
        },
        
        validarFechaFinSER549A(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_549A",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER549A("1");
				},
				() => {
					$this.form.diaFin_549A = cerosIzq($this.form.diaFin_549A, 2);
                    $this.form.mesFin_549A = cerosIzq($this.form.mesFin_549A, 2);
                    $this.fechaFinal = this.form.añoFin_549A + $this.form.mesFin_549A + $this.form.diaFin_549A;
                    var añoFinal = parseFloat($this.form.añoFin_549A);
					var diaFinal = parseFloat($this.form.diaFin_549A);
                    var mesFinal = parseFloat($this.form.mesFin_549A);
                    if (parseInt(añoFinal) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER549A('1');
                    } else {
                        if (parseInt(diaFinal) < 1 || parseInt(diaFinal) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER549A('3');
                        } else if (parseInt(mesFinal) < 1 || parseInt(mesFinal) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER549A('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER549A('2');
                        } else {
                            $this.validarSucursalSER549A();
                        }
                    }
				}
			)
        },

        validarSucursalSER549A() {
            this.form.sucursal_549A == '' ? this.form.sucursal_549A = "**" : false;
            $this = this
            validarInputs(
                {
                    form: "#sucursal_SER549A",
                    orden: "1"
                },
                () => {
                    this.selected = '';
                    this.validarFechaIniSER549A("1");
                },
                () => {
                    var sucursal = $this.form.sucursal_549A;
                    if (sucursal.trim() == "**") {
                        $this.form.descripSucursal_SER549A = "Proceso total"
                        this._envioImpresion();
                    } else {
                        $this.form.descripSucursal_SER549A = res.DESCRIP;
                        this._envioImpresion();
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
                        + '|' + $this.form.entidad_549A
                        + '|' + $this.fechaInicial.toString()
                        + '|' + $this.fechaFinal.toString()
                        + '|' + $this.form.sucursal_549A.toUpperCase();

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER549A.DLL'))
                        .then($this._montarImpresion_SER549A)
                        .catch(err => {
                            console.log(err)
                            // loader('hide')
                            $this.validarSucursalSER549A();
                        })
                } else {
                    $this.validarSucursalSER549A();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _cargarEntidades() {
            $this = this;
            postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
                .then(data => {
                    $this.ter_SER753B = data.TERCEROS;
                    $this.ter_SER753B.pop();
                    console.log(ter_SER753B)
                }).catch(err => {
                    loader('hide');
                    console.log("error entidades")
                    _toggleNav();
                })
        },

        _ventanaEntidadSER549A() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE TERCEROS",
                columnas: ["COD", "NOMBRE"],
                data: $this.ter_SER753B,
                callback_esc: function () {
                    document.querySelector('.entidad_549A').focus();
                },
                callback: function (data) {
                    $this.form.entidad_549A = data.COD.trim();
                    _enterInput('.entidad_549A');
                }
            })
        },

        _montarImpresion_SER549A(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();

            for (i in data.Listado) {
                data.Listado[i]['DESCRIP_J'] = data.Listado[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
                data.Listado[i]['DESCRIP1_J'] = data.Listado[i]['DESCRIP1_J'].replace(/\�/g, "Ñ")
                data.Listado[i]['DESCRIP2_J'] = data.Listado[i]['DESCRIP2_J'].replace(/\�/g, "Ñ")
                data.Listado[i]['DESCRIP_TER_J'] = data.Listado[i]['DESCRIP_TER_J'].replace(/\�/g, "Ñ")
            }

            if (data.Listado.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader("hide");
        		validarAsociarNitSER504();
        	} else {
        		var columnas = [
        			{
        				title: "UNIDAD",
                        value: "DESCRIP_J",
                        format: "string",
        			},
        			{
        				title: "COD",
                        value: "COD_EDIT_11_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "CENTRO",
                        value: "DESCRIP1_J",
                        format: 'fecha',
                    },
                    {
        				title: "AÑO",
                        value: "ANO_J",
                        format: "string"
        			},
        			{
        				title: "COD",
                        value: "COD_J",
                        format: "string"
        			},
        			{
        				title: "SERVICIOS",
                        value: "DESCRIP2_J",
                        format: "string"
                    },
                    {
        				title: "TARIFA PROMEDIO",
                        value: "VALOR_J",
                        format: 'money'
                    },
                    {
        				title: "NRO SERVICIOS PRESTADOS",
                        value: "VALOR1_J",
                        format: "string"
                    },
                    {
        				title: "VLR VENTA",
                        value: "VALOR2_J",
                        format: 'money'
                    },
                    {
        				title: "ENTIDAD",
                        value: "DESCRIP_TER_J",
                        format: "string",
                        filterButton: true
                    },
        		]

        		var header_format = [
        			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
        			`SANEAMIENTO CONTABLE     NIT: ${nit}`,
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
        				$this.validarTercerosSER549A();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})