// LISTADO DE CARTERA POR ORDEN DE ACTIVIDAD - CARTERA
// SANTIAGO - CREACION - 14/07/2020 - OPCION 9-7-5-7 SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, act_SER508, tercero_508;
new Vue({
    el: '#SER508',
    data: {
        form: {
            añoIni_508: '',
			mesIni_508: '',
            diaIni_508: '',
            añoFin_508: '',
			mesFin_508: '',
            diaFin_508: '',
            actividad_508: '',
            descripActividad_SER508: '',
            radica_508: '',
            tercero_508: '',
            descripTercero_SER508: '',
            cancel_508: '',
            cliente_508: ''
        },
        // selected: '',
        // formatos: [
        //     { text: 'Seleccione', value: 0 },
        //     { text: 'En formato .PDF', value: 1 },
        //     { text: 'En formato .CSV', value: 2 },
        //     { text: 'Salir', value: 3 }
        // ],
        // $_formato_508: null,
        // form_disabled: {
        //     select_dis: true
        // },
        // select: null
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-7 - Listado de cartera por orden de actividad');
        this._consultarActividadSER508();
    },
    watch: {
        // selected: function (val) {
        //     val.value != 0 ? this.validarFormato_508(val.value) : false;
        // }
    },
    mounted: function () {
        // this.select = this.$refs.select.$refs.search;
        this.datoInicialIniSER508();
    },
    methods: {
        // habilitarFormato_508() {
        //     this.select.focus();
        // },
        // validarFormato_508(val) {
        //     if (val == 1) { this.$_formato_508 = 'PDF'; this.datoInicialIniSER508(); }
        //     else if (val == 2) { this.$_formato_508 = 'CSV'; this.datoInicialIniSER508(); }
        //     else if (val == 3) { _toggleNav() }
        //     // this.form_disabled.select_dis = true;
        // },
		datoInicialIniSER508() {
			this.form.mesIni_508 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoIni_508 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaIni_508 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaIniSER508("1")
		},

		validarFechaIniSER508(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaIni_508",
					orden: orden
				},
				() => {
					_toggleNav();
				},
				() => {
                    $this.form.diaIni_508 = cerosIzq($this.form.diaIni_508, 2);
                    $this.form.mesIni_508 = cerosIzq($this.form.mesIni_508, 2);
                    $this.fechaInicial = this.form.añoIni_508 + $this.form.mesIni_508 + $this.form.diaIni_508;
                    var añoInicial = parseFloat($this.form.añoIni_508);
					var diaInicial = parseFloat($this.form.diaIni_508);
                    var mesInicial = parseFloat($this.form.mesIni_508);
                    if (parseInt(añoInicial) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaIniSER508('1');
                    } else {
                        if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER508('3');
                        } else if (parseInt(mesInicial) < 1 || parseInt(mesInicial) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaIniSER508('2');
                        } else {
                            $this.datoInicialFinSER508();
                        }
                    }
				}
			)
        },

        datoInicialFinSER508() {
			this.form.mesFin_508 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.añoFin_508 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.diaFin_508 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaFinSER508("1")
		},

        validarFechaFinSER508(orden) {
            $this = this
			validarInputs(
				{
					form: "#fechaFin_508",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER508("1");
				},
				() => {
					$this.form.diaFin_508 = cerosIzq($this.form.diaFin_508, 2);
                    $this.form.mesFin_508 = cerosIzq($this.form.mesFin_508, 2);
                    $this.fechaFinal = this.form.añoFin_508 + $this.form.mesFin_508 + $this.form.diaFin_508;
                    var añoFinal = parseFloat($this.form.añoFin_508);
					var diaFinal = parseFloat($this.form.diaFin_508);
                    var mesFinal = parseFloat($this.form.mesFin_508);
                    if (parseInt(añoFinal) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFechaFinSER508('1');
                    } else {
                        if (parseInt(diaFinal) < 1 || parseInt(diaFinal) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER508('3');
                        } else if (parseInt(mesFinal) < 1 || parseInt(mesFinal) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinSER508('2');
                        } else if ($this.fechaFinal < $this.fechaInicial) {
                            CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                            $this.validarFechaFinSER508('2');
                        } else {
                            $this.validarActividadSER508();
                        }
                    }
				}
			)
        },

        validarActividadSER508() {
            this.form.actividad_508 == '' ? this.form.actividad_508 = "**" : false;
            $this = this
			validarInputs(
				{
					form: "#actividad_SER508",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIniSER508("1");
				},
				() => {
                    var actividad = $this.form.actividad_508;
                    if (actividad.trim() == "**" ){
                        $this.form.descripActividad_SER508 = "Proceso total"
                        this.validarRadicaSER508();
                    }else {
                        const res = $this.act_SER508.find(e => e.COD.trim() == actividad );
                        if (res == undefined) {
                            $this.form.actividad_508 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarActividadSER508()
                        }else {
                            $this.form.descripActividad_SER508 = res.DESCRIP;
                            this.validarRadicaSER508();
                        }
                    }
				}
			)
        },

        validarRadicaSER508() {
            this.form.radica_508 == '' ? this.form.radica_508 = "N" : false;
            $this = this
			validarInputs(
				{
					form: "#radica_SER508",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarActividadSER508();
				},
				() => {
                    var radica = $this.form.radica_508.toUpperCase();
                    if (radica == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarRadicaSER508();
                    } else if (radica == "S" || radica == "N") {
                        this.validarTerceroSER508()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarRadicaSER508();
                    }
				}
			)
        },

        validarTerceroSER508() {
            this.form.tercero_508 == '' ? this.form.tercero_508 = "99" : false;
            $this = this
			validarInputs(
				{
					form: "#tercero_SER508",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarRadicaSER508();
				},
				() => {
                    var tercero = $this.form.tercero_508;
                    if (tercero == "99" ){
                        $this.form.descripTercero_SER508 = "Todas las entidades"
                        this.validarCancelSER508();
                    }else {
                        const res = $this._terceros.find(e => e.COD.trim() == tercero );
                        if (res == undefined) {
                            $this.form.tercero_508 = "";
                            CON851('01', '01', null, 'error', 'error');
                            this.validarTerceroSER508()
                        }else {
                            $this.form.descripTercero_SER508 = res.NOMBRE;
                            this.validarCancelSER508();
                        }
                    }
				}
			)
        },

        validarCancelSER508() {
            this.form.cancel_508 == '' ? this.form.cancel_508 = "N" : false;
            $this = this
			validarInputs(
				{
					form: "#cancel_SER508",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarTerceroSER508();
				},
				() => {
                    var cancel = $this.form.cancel_508.toUpperCase();
                    if (cancel == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCancelSER508();
                    } else if (cancel == "S" || cancel == "N") {
                        this.validarClienteSER508()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarCancelSER508();
                    }
				}
			)
        },

        validarClienteSER508() {
            this.form.cliente_508 == '' ? this.form.cliente_508 = "N" : false;
            $this = this
			validarInputs(
				{
					form: "#cliente_SER508",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    this.validarCancelSER508();
				},
				() => {
                    var cliente = $this.form.cliente_508.toUpperCase();
                    if (cliente == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarClienteSER508();
                    } else if (cliente == "S" || cliente == "N") {
                        this._envioImpresion()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarClienteSER508();
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
                    + '|' + $this.form.actividad_508
                    + '|' + $this.form.radica_508.toUpperCase()
                    + '|' + $this.form.tercero_508
                    + '|' + $this.form.cancel_508.toUpperCase()
                    + '|' + $this.form.cliente_508.toUpperCase();

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER508.DLL'))
                        .then($this._montarImpresion_SER508)
                        .catch(err => {
                            console.log(err)
                            $this.validarClienteSER508();
                        })
                } else {
                    $this.validarClienteSER508();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _consultarActividadSER508() {
            $this = this;
            let URL = get_url("APP/" + "CONTAB/CON806" + ".DLL");
            postData({
                datosh: datosEnvio() + localStorage['Usuario'] + "|"
            }, URL)
                .then(data => {
                    loader("hide");
                    $this.act_SER508 = data.ACTIVIDADES;
                    $this.act_SER508.pop();
                    console.log(act_SER508);
                    $this._cargarTerceros();
                }).catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },

        _cargarTerceros() {
			var $this = this
			postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
				.then(data => {
					loader('hide')
					$this._terceros = data.TERCEROS;
					$this._terceros.pop();
				}).catch(err => {
					console.log('sale')
					loader('hide')
					_toggleNav();
				})
		},

        _ventanaActividadesSER508() {
            $this = this;
            _ventanaDatos({
                titulo: "VENTANA DE ACTIVIDADES",
                columnas: ["COD", "DESCRIP"],
                data: $this.act_SER508,
                callback_esc: function () {
                    document.querySelector('.actividad_508').focus();
                },
                callback: function (data) {
                    $this.form.actividad_508 = data.COD.trim();
                    _enterInput('.actividad_508');
                }
            })
        },

        _ventanaTercerosSER508() {
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
					document.querySelector('.tercero_508').focus();
				},
				callback: function (data) {
					$this.form.tercero_508 = data.COD.trim();
					_enterInput('.tercero_508');
				}
			});
        },
        
        _montarImpresion_SER508(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.Listado) {
                data.Listado[i]['DESCRIP_J'] = data.Listado[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
                data.Listado[i]['BRUTO_J'] = data.Listado[i]['BRUTO_J'].replace(/\ /g, "")
                data.Listado[i]['GLOSA_J'] = data.Listado[i]['GLOSA_J'].replace(/\ /g, "")
                data.Listado[i]['NOTAS_J'] = data.Listado[i]['NOTAS_J'].replace(/\ /g, "")
                data.Listado[i]['COPAGOS_J'] = data.Listado[i]['COPAGOS_J'].replace(/\ /g, "")
                data.Listado[i]['SALDO_J'] = data.Listado[i]['SALDO_J'].replace(/\ /g, "")
                data.Listado[i]['SINRAD_J'] = data.Listado[i]['SINRAD_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_00_J'] = data.Listado[i]['VLR_00_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_30_J'] = data.Listado[i]['VLR_30_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_60_J'] = data.Listado[i]['VLR_60_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_90_J'] = data.Listado[i]['VLR_90_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_120_J'] = data.Listado[i]['VLR_120_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_180_J'] = data.Listado[i]['VLR_180_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_270_J'] = data.Listado[i]['VLR_270_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_360_J'] = data.Listado[i]['VLR_360_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_720_J'] = data.Listado[i]['VLR_720_J'].replace(/\ /g, "")
                data.Listado[i]['VLR_MAS_J'] = data.Listado[i]['VLR_MAS_J'].replace(/\ /g, "")
            }

            if (data.Listado.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader("hide");
				validarAsociarNitSER504();
			} else {
				var columnas = [
					{
						title: "NIT ENT",
						value: "NIT_J",
						filterButton: true
					},
					{
						title: "ENTIDAD",
						value: "DESCRIP_J",
					},
					{
						title: "FACTURA",
						value: "CTA_J",
					},
					{
						title: "FECHA",
                        value: "FECHA_J",
                        format: 'fecha',
					},
					{
						title: "DIAS",
						value: "DIAS_J",
					},
					{
						title: "VLR BRUTO",
						value: "BRUTO_J",
						format: 'money'
					},
					{
						title: "VLR ABONOS",
						value: "ABONO_J",
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
						title: "VLR COPAG",
						value: "COPAGOS_J",
						format: 'money'
                    },
                    {
						title: "SALDO NETO",
						value: "SALDO_J",
						format: 'money'
                    },
                    {
						title: "VLR SIN RADIC",
						value: "SINRAD_J",
						format: 'money'
                    },
                    {
						title: "POR VENCER",
						value: "VLR_00_J",
						format: 'money'
                    },
                    {
						title: "DE 1 A 30 DIAS",
						value: "VLR_30_J",
						format: 'money'
                    },
                    {
						title: "DE 31 A 60 DIAS",
						value: "VLR_60_J",
						format: 'money'
                    },
                    {
						title: "DE 61 A 90 DIAS",
						value: "VLR_90_J",
						format: 'money'
                    },
                    {
						title: "DE 91 A 120 DIAS",
						value: "VLR_120_J",
						format: 'money'
                    },
                    {
						title: "DE 121 A 180 DIAS",
						value: "VLR_180_J",
						format: 'money'
                    },
                    {
						title: "DE 181 A 270 DIAS",
						value: "VLR_270_J",
						format: 'money'
                    },
                    {
						title: "DE 271 A 360 DIAS",
						value: "VLR_360_J",
						format: 'money'
                    },
                    {
						title: "DE 361 A 720 DIAS",
						value: "VLR_720_J",
						format: 'money'
                    },
                    {
						title: "MAS DE 720 DIAS",
						value: "VLR_MAS_J",
						format: 'money'
                    },
                    {
						title: "EST RADI",
						value: "MES_RAD_J",
                    },
                    {
						title: "RUBRO PRESUPUESTO",
						value: "CTA_PRESUP_J",
                    },
                    {
						title: "CUENTA CONTABLE",
						value: "",
                    },
                    {
						title: "ACT",
						value: "ACTIV_J",
					},
				]
		
				var header_format = [
					{ text: `${nombreEmpresa}`, bold: true, size: 16 },
					`LISTADO DE CARTERA POR ORDEN DE ACTIVIDAD     NIT: ${nit}`,
					`Fecha de corte: ${fecha}`,
					`Periodo desde: ${this.fechaInicial}  Hasta: ${this.fechaFinal}`,
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
						indice = 1;
						$this.datoInicialIniSER508()
						loader('hide')
					})
					.catch(() => {
						console.log('Proceso error')
					})
			}
        },
    }
})