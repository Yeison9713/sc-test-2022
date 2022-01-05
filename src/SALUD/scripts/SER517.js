// RELACION DE RECIBOS DE FACTURAS
// SANTIAGO - CREACION - 27/07/2020 - OPCION 9-7-5-B SALUD
(() => {
    Vue.component('v-select', VueSelect.VueSelect)
})();

var $this, indice = 1;
new Vue({
    el: '#SER517',
    data: {
        _lotes: [],
        form: {
            lote1_517: '',
            descripLote1_SER517: '',
            lote2_517: '',
            descripLote2_SER517: '',
            lote3_517: '',
            descripLote3_SER517: '',
            lote4_517: '',
            descripLote4_SER517: '',
            lote5_517: '',
            descripLote5_SER517: '',
            _arrayLotes: []
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-B - Relacion de recibos de caja aplicado a cartera');
        this._cargarLotes();
        // this.validarLote1SER517();
    },
    watch: {
    },
    // mounted: function () {
    //     this.validarLote1SER517();
    // },
    methods: {
        validarLoteSER517() {
            console.log('array', this.form._arrayLotes)
            if (indice > 5) {
                this._envioImpresion();
            } else {
                if (indice < 2) {
                    this.form[`lote${indice}_517`] == '' ? this.form[`lote${indice}_517`] = "1R" : false;
                }
                $this = this
                validarInputs(
                    {
                        form: `#lote${indice}_SER517`,
                        orden: "1"
                    },
                    () => {
                        if (indice < 2) {
                            _toggleNav();
                        } else {
                            $this.form._arrayLotes.pop();
                            $this.form[`descripLote${indice}_SER517`] = "";
                            $this.form[`lote${indice}_517`] = "";
                            indice = (indice - 1);
                            $this.validarLoteSER517();
                        }
                    },
                    () => {
                        console.log('this', $this.form._arrayLotes)
                        var lote = $this.form[`lote${indice}_517`].toUpperCase();
                        var busq = $this.form._arrayLotes.find(e => e == lote && lote.trim() != '');
                        if (lote == "30" || lote == "40" || lote == "50" || lote == "1F" || lote.substring(0, 1) == "0" || lote.substring(0, 1) == "G" || lote.substring(0, 1) == "R") {
                            $this.form[`lote${indice}_517`] = "";
                            CON851('49', '49', null, 'error', 'error');
                            this.validarLoteSER517();
                        } else {
                            if (busq == undefined) {
                                const res = $this._lotes.find(e => e.LOTE.trim() == lote)
                                if (indice < 2) {
                                    if (res == undefined) {
                                        $this.form[`lote${indice}_517`] = "";
                                        CON851('02', '02', null, 'error', 'error');
                                        this.validarLoteSER517();
                                    } else {
                                        $this.form._arrayLotes.push(lote);
                                        $this.form[`descripLote${indice}_SER517`] = res.NOMBRE;
                                        indice = (indice + 1);
                                        this.validarLoteSER517();
                                    }
                                } else {
                                    $this.form._arrayLotes.push(lote);
                                    if (lote.trim() == "") {
                                        $this.form[`descripLote${indice}_SER517`] = "";
                                        indice = (indice + 1);
                                        this.validarLoteSER517();
                                    } else {
                                        if (res == undefined) {
                                            $this.form[`lote${indice}_517`] = "";
                                            CON851('01', '01', null, 'error', 'error');
                                            this.validarLoteSER517();
                                        } else {
                                            $this.form[`descripLote${indice}_SER517`] = res.NOMBRE;
                                            indice = (indice + 1);
                                            this.validarLoteSER517();
                                        }
                                    }
                                }
                            } else {
                                $this.form[`lote${indice}_517`] = "";
                                CON851('05', '05', null, 'error', 'error');
                                this.validarLoteSER517();
                            }
                        }
                    }
                )
            }
        },

        _envioImpresion() {
            $this = this;
            CON850_P(function (e) {
                if (e.id == 'S') {
                    loader('show')
                    var datos_envio = datosEnvio()
                        + localStorage.Usuario
                        + '|' + $this.form.lote1_517.toUpperCase()
                        + '|' + $this.form.lote2_517.toUpperCase()
                        + '|' + $this.form.lote3_517.toUpperCase()
                        + '|' + $this.form.lote4_517.toUpperCase()
                        + '|' + $this.form.lote5_517.toUpperCase();

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER517.DLL'))
                        .then($this._montarImpresion_SER517)
                        .catch(err => {
                            console.log(err)
                            indice = (indice - 1);
                            $this.form._arrayLotes.pop();
                            $this.validarLoteSER517();
                        })
                } else {
                    indice = (indice - 1);
                    $this.form._arrayLotes.pop();
                    $this.validarLoteSER517();
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
                    $this.validarLoteSER517();
                }).catch(err => {
                    console.log('sale', err)
                    loader('hide')
                    _toggleNav();
                })
        },

        _montarImpresion_SER517(data) {
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
        				filterButton: true
        			},
        			{
        				title: "FACTURA",
                        value: "LLAVE_J",
                        format: "string",
        			},
        			{
        				title: "FECHA RADICADO",
                        value: "FECHA2_J",
                        format: 'fecha',
                    },
                    {
        				title: "FECHA VENCE",
                        value: "FECHA3_J",
                        format: 'fecha',
                    },
                    {
        				title: "MORA",
                        value: "MORA_J",
                    },
                    {
        				title: "VLR COPAGOS",
                        value: "VALOR_COP_J",
                        format: 'money'
                    },
                    {
        				title: "0 A 180 DIAS",
                        value: "VALOR_180_J",
                        format: 'money'
                    },
                    {
        				title: "181 A 360 DIAS",
                        value: "VALOR_360_J",
                        format: 'money'
                    },
                    {
        				title: "MAS DE 360 DIAS",
                        value: "VALOR_MAS_J",
                        format: 'money'
                    },
                    {
        				title: "VLR RECAUDO",
                        value: "VALOR_RBO_J",
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
                        $this.form.lote1_517 = "";
                        $this.form.lote2_517 = "";
                        $this.form.lote3_517 = "";
                        $this.form.lote4_517 = "";
                        $this.form.lote5_517 = "";
                        $this.form.descripLote1_SER517 = "";
                        $this.form.descripLote2_SER517 = "";
                        $this.form.descripLote3_SER517 = "";
                        $this.form.descripLote4_SER517 = "";
                        $this.form.descripLote5_SER517 = "";
                        _inputControl('reset');
                        indice = 1;
        				$this.validarLoteSER517();
        				loader('hide')
        			})
        			.catch(() => {
        				console.log('Proceso error')
        			})
        	}
        },
    }
})