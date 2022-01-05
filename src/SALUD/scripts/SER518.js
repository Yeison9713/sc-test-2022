// RELACION DE RECIBOS DE FACTURAS POR REGIMEN
// SANTIAGO - CREACION - 31/07/2020 - OPCION 9-7-5-C SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, indice = 1;
new Vue({
    el: '#SER518',
    data: {
        _lotes: [],
        form: {
            lote1_518: '',
            descripLote1_SER518: '',
            lote2_518: '',
            descripLote2_SER518: '',
            lote3_518: '',
            descripLote3_SER518: '',
            lote4_518: '',
            descripLote4_SER518: '',
            lote5_518: '',
            descripLote5_SER518: '',
            discMov_518: '',
            _arrayLotes: []
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-C - Informe de recaudos por regimen del cliente');
        this._cargarLotes();
        // this.validarLote1SER517();
    },
    watch: {
    },
    // mounted: function () {
    //     this.validarLote1SER517();
    // },
    methods: {
        validarLoteSER518() {
            console.log('array', this.form._arrayLotes)
            if (indice > 5) {
                this.validarDiscMovSER518();
            } else {
                if (indice < 2) {
                    this.form[`lote${indice}_518`] == '' ? this.form[`lote${indice}_518`] = "1R" : false;
                }
                $this = this
                validarInputs(
                    {
                        form: `#lote${indice}_SER518`,
                        orden: "1"
                    },
                    () => {
                        if (indice < 2) {
                            _toggleNav();
                        } else {
                            $this.form._arrayLotes.pop();
                            $this.form[`descripLote${indice}_SER518`] = "";
                            $this.form[`lote${indice}_518`] = "";
                            indice = (indice - 1);
                            $this.validarLoteSER518();
                        }
                    },
                    () => {
                        console.log('this', $this.form._arrayLotes)
                        var lote = $this.form[`lote${indice}_518`].toUpperCase();
                        var busq = $this.form._arrayLotes.find(e => e == lote && lote.trim() != '');
                        if (lote == "30" || lote == "40" || lote == "50" || lote == "1F" || lote.substring(0, 1) == "0" || lote.substring(0, 1) == "G" || lote.substring(0, 1) == "R") {
                            $this.form[`lote${indice}_518`] = "";
                            CON851('49', '49', null, 'error', 'error');
                            this.validarLoteSER518();
                        } else {
                            if (busq == undefined) {
                                const res = $this._lotes.find(e => e.LOTE.trim() == lote)
                                if (indice < 2) {
                                    if (res == undefined) {
                                        $this.form[`lote${indice}_518`] = "";
                                        CON851('02', '02', null, 'error', 'error');
                                        this.validarLoteSER518();
                                    } else {
                                        $this.form._arrayLotes.push(lote);
                                        $this.form[`descripLote${indice}_SER518`] = res.NOMBRE;
                                        indice = (indice + 1);
                                        this.validarLoteSER518();
                                    }
                                } else {
                                    $this.form._arrayLotes.push(lote);
                                    if (lote.trim() == "") {
                                        $this.form[`descripLote${indice}_SER518`] = "";
                                        indice = (indice + 1);
                                        this.validarLoteSER518();
                                    } else {
                                        if (res == undefined) {
                                            $this.form[`lote${indice}_518`] = "";
                                            CON851('01', '01', null, 'error', 'error');
                                            this.validarLoteSER518();
                                        } else {
                                            $this.form[`descripLote${indice}_SER518`] = res.NOMBRE;
                                            indice = (indice + 1);
                                            this.validarLoteSER518();
                                        }
                                    }
                                }
                            } else {
                                $this.form[`lote${indice}_518`] = "";
                                CON851('05', '05', null, 'error', 'error');
                                this.validarLoteSER518();
                            }
                        }
                    }
                )
            }
        },

        validarDiscMovSER518() {
            this.form.discMov_518 == '' ? this.form.discMov_518 = "N" : false;
            $this = this
			validarInputs(
				{
					form: "#discMov_SER518",
					orden: "1"
				},
				() => {
					this.selected = '';                    
                    indice = (indice - 1);
                    $this.form._arrayLotes.pop();
                    $this.validarLoteSER518();
				},
				() => {
                    var cliente = $this.form.discMov_518.toUpperCase();
                    if (cliente == '') {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarDiscMovSER518();
                    } else if (cliente == "S" || cliente == "N") {
                        this._envioImpresion()
                    }else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarDiscMovSER518();
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
                        + '|' + $this.form.lote1_518.toUpperCase()
                        + '|' + $this.form.lote2_518.toUpperCase()
                        + '|' + $this.form.lote3_518.toUpperCase()
                        + '|' + $this.form.lote4_518.toUpperCase()
                        + '|' + $this.form.lote5_518.toUpperCase()
                        + '|' + $this.form.discMov_518.toUpperCase();

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER518.DLL'))
                        .then($this._montarImpresion_SER518)
                        .catch(err => {
                            console.log(err)
                            $this.validarDiscMovSER518();
                        })
                } else {
                    $this.validarDiscMovSER518();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _cargarLotes() {
            var $this = this
            postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON110I.DLL"))
                .then(data => {
                    $this._lotes = data.LOTES;
                    $this._lotes.pop();
                    loader('hide')
                    console.log($this._lotes);
                    $this.validarLoteSER518();
                }).catch(err => {
                    console.log('sale', err)
                    loader('hide')
                    _toggleNav();
                })
        },

        _montarImpresion_SER518(data) {
            $this = this;
            data.Listado.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.Listado) {
                data.Listado[i]['DESCRIP_J'] = data.Listado[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
                data.Listado[i]['CODIGO_J'] = data.Listado[i][`LOTE_J`] + data.Listado[i][`COMPROB_J`]
                // data.Listado[i]['BRUTO_J'] = data.Listado[i]['BRUTO_J'].replace(/\ /g, "")
            }

            if (data.Listado.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader("hide");
        		validarAsociarNitSER504();
        	} else {
        		var columnas = [
        			{
        				title: "REG",
                        value: "ACTIV_J",
                        format: "string",
                        filterButton: true
        			},
        			{
        				title: "COMPROB",
                        value: "CODIGO_J",
                        format: "string",
        			},
        			{
        				title: "FECHA RECIBO",
                        value: "FECHA_J",
                        format: 'fecha',
                        filterButton: true
        			},
        			{
        				title: "BENEFICIARIO",
                        value: "DESCRIP_J",
        			},
        			{
        				title: "FACTURA",
                        value: "LLAVE_J",
                    },
                    {
        				title: "FECHA RADICADO",
                        value: "FECHA2_J",
                        format: 'fecha',
                    },
                    {
        				title: "COPAGOS",
                        value: "COPAGOS-J",
                        format: 'money'
                    },
                    {
        				title: "RECAUDOS VIGENCIA ACT.",
                        value: "ACTUAL-J",
                        format: 'money'
                    },
                    {
        				title: "VIGENCIA ANTERIOR",
                        value: "ANTERIOR-J",
                        format: 'money'
                    },
                    {
        				title: "RECUPERACION CARTERA",
                        value: "RECUP-CART-J",
                        format: 'money'
                    },
        		]

        		var header_format = [
        			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
        			`RELACION DE RECAUDOS APLICADOS     NIT: ${nit}`,
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
                        indice = 1;
                        $this.form._arrayLotes = [];
                        $this.form.lote1_518 = "";
                        $this.form.lote2_518 = "";
                        $this.form.lote3_518 = "";
                        $this.form.lote4_518 = "";
                        $this.form.lote5_518 = "";
                        $this.form.descripLote1_SER518 = "";
                        $this.form.descripLote2_SER518 = "";
                        $this.form.descripLote3_SER518 = "";
                        $this.form.descripLote4_SER518 = "";
                        $this.form.descripLote5_SER518 = "";
                        $this.form.discMov_518 = "";
                        _inputControl('reset');
                        indice = 1;
        				$this.validarLoteSER518();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})