new Vue({
    el: '#SER446',
    data: {
        SER446: [],
        form: {
            excel_SER446: '',
            mesreportar_SER446: '',
            folio_SER446: '',
            nitd_SER446: '',
        }
    },
    created() {
        _toggleNav();
        nombreOpcion("9,7,7,4,6 - Carta de presentación");
        loader('show')
        _inputControl("disabled");
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
            data = data.FIRMAS;
            this.SER446.FIRMAS = data;
        })
        if ($_USUA_GLOBAL[0].NIT == 892000458 || $_USUA_GLOBAL[0].NIT == 892000264) {
            loader('hide');
            this._evaluarexcel_SER446();
        } else {
            loader('hide');
            this._evaluarnumeroenvio_SER446();
        }
    },
    methods: {
        _evaluarexcel_SER446() {
            if(this.form.excel_SER446.trim()== '') this.form.excel_SER446 = "N" 
            validarInputs({
                form: '#VALIDAR1_SER446',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.form.excel_SER446 = this.form.excel_SER446.toUpperCase();
                    if (this.form.excel_SER446 == 'S' || this.form.excel_SER446 == 'N') {
                        this._evaluarnumeroenvio_SER446();
                    } else {
                        CON851('', 'Digite S o N', null, 'error', 'Error');
                        this._evaluarexcel_SER446()
                    }
                }
            )
        },
        _evaluarnumeroenvio_SER446() {
            validarInputs({
                form: '#VALIDAR2_SER446',
                orden: '1'
            },
                () => {
                    if ($_USUA_GLOBAL[0].NIT == 892000458 || $_USUA_GLOBAL[0].NIT == 892000264) {
                        this._evaluarexcel_SER446();
                    } else {
                        _toggleNav();
                    }
                },
                () => {
                    if ($_USUA_GLOBAL[0].NIT == 800251482 && numeroenvioMask_SER446.value.trim().replace(/,/g, '') == '999999') {
                        $('#CODTERCERO_SER446').removeClass('hidden');
                        validarInputs({
                            form: '#VALIDAR8_SER446',
                            orden: '1'
                        },
                            this._evaluarnumeroenvio_SER446,
                            () => {
                                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                                postData({
                                    datosh: datosEnvio() + nitclientMask_SER446.replace(/,/g, '').trim().padStart(10, '0') + "|",
                                }, URL)
                                    .then(data => {
                                        this.SER449.TERCEROS = data.TERCER[0];
                                        this.form.nitd_SER446 = this.SER449.TERCEROS.DESCRIP_TER.trim()
                                        this._evaluarfechaimpresion_SER446();
                                    }).catch(error => {
                                        console.error(error)
                                        this.form.nitd_SER446 = 'NO EXISTE TERCERO';
                                        this._evaluarfechaimpresion_SER446();
                                    });
                            }
                        )
                    } else {
                        postData({
                            datosh: `${datosEnvio()}1|${numeroenvioMask_SER446.value.trim().replace(/,/g, '').padStart(6, '0')}|`
                        }, get_url("APP/SALUD/SER446.DLL"))
                            .then((data) => {
                                console.debug(data);
                                this._evaluarfechaimpresion_SER446();
                            })
                            .catch((error) => {
                                console.error(error);
                                this._evaluarnumeroenvio_SER446();
                            });
                    }
                }
            )
        },
        _evaluarfechaimpresion_SER446() {
            validarInputs({
                form: '#VALIDAR3_SER446',
                orden: '1'
            },
                this._evaluarnumeroenvio_SER446,
                () => {
                    if (fechaMask_SER446.value.trim().length < 10) {
                        CON851('', 'Digite la fecha completa', this._evaluarfechaimpresion_SER446(), 'error', 'Error');
                    } else {
                        this._evaluarmesresportar_SER446();
                    }
                }
            )
        },
        _evaluarmesresportar_SER446() {
            validarInputs({
                form: '#VALIDAR4_SER446',
                orden: '1'
            },
                this._evaluarfechaimpresion_SER446,
                () => {
                    if (parseInt(this.form.mesreportar_SER446) < 13 && parseInt(this.form.mesreportar_SER446) > 0) {
                        this._evaluarfolio_SER446();
                    } else {
                        CON851('', 'Mes invalido', this._evaluarmesresportar_SER446(), 'error', 'Error');
                    }
                }
            )
        },
        _evaluarfolio_SER446() {
            validarInputs({
                form: '#VALIDAR5_SER446',
                orden: '1'
            },
                this._evaluarmesresportar_SER446,
                () => {
                    this.form.folio_SER446 = this.form.folio_SER446.toUpperCase();
                    if (this.form.folio_SER446 == 'S' || this.form.folio_SER446 == 'N') {
                        if (numeroenvioMask_SER446.value.trim().replace(/,/g, '') == '999999' && $_USUA_GLOBAL[0].NIT == 800251482) {
                            postData({
                                datosh: `${datosEnvio()}2||${nitclientMask_SER446.value.replace(/,/g, '').trim(), padStart(10, '0')}|20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 4)}|`
                            }, get_url("APP/SALUD/SER446.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER446.ENVIOS = data.ENVIOS;
                                    this._impresion_SER446();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfolio_SER446();
                                });
                        } else {
                            postData({
                                datosh: `${datosEnvio()}3|${numeroenvioMask_SER446.value.trim().replace(/,/g, '').padStart(6, '0')}||20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 4)}|`
                            }, get_url("APP/SALUD/SER446.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER446.ENVIOS = data.ENVIOS;
                                    if (this.form.folio_SER446 == 'S') {
                                        this._evaluarcarpetasfolios_SER446();
                                    } else {
                                        this._impresion_SER446();
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfolio_SER446();
                                });
                        }
                    } else {
                        CON851('', 'Digite S o N', this._evaluarfolio_SER446(), 'error', 'Error');
                    }
                }
            )
        },
        _evaluarcarpetasfolios_SER446() {
            validarInputs({
                form: '#VALIDAR6_SER446',
                orden: '1'
            },
                this._evaluarfolio_SER446,
                this._impresion_SER446
            )
        },
        _impresion_SER446() {
            this.SER446.datosimpresion = new Object;
            this.SER446.ENVIOS.pop()
            let llavefact = this.SER446.ENVIOS
            llavefact.sort((a, b) => {
                if (a.LLAVE > b.LLAVE) {
                    return 1;
                }
                if (a.LLAVE < b.LLAVE) {
                    return -1;
                }
                return 0;
            })
            let idpaciente
            let nombrespac, apellido1pac, apellido2pac
            let cont = 0
            for (var i in this.SER446.ENVIOS) {
                idpaciente = this.SER446.ENVIOS[i].ID_PACIENTE
                this.SER446.ENVIOS[i].ID_PACIENTE = parseInt(idpaciente)
                apellido1pac = this.SER446.ENVIOS[i].NOMBRE_PACIENTE.substring(0, 14)
                apellido2pac = this.SER446.ENVIOS[i].NOMBRE_PACIENTE.substring(14, 29)
                nombrespac = this.SER446.ENVIOS[i].NOMBRE_PACIENTE.substring(29, 50)
                apellido1pac = apellido1pac.padEnd(20, ' ')
                this.SER446.ENVIOS[i].NOMBRE_PACIENTE = apellido1pac.trim() + ' ' + apellido2pac.trim() + ' ' + nombrespac.trim()
                cont++
                this.SER446.ENVIOS[i].ITEM2 = cont.toString().padStart(3, 0)
                if (this.SER446.ENVIOS[i].VALOR_NETO.trim() == '') this.SER446.ENVIOS[i].VALOR_NETO = '0.00' 
            }
            this.SER446.datosimpresion.TABLA = this.SER446.ENVIOS;
            this.SER446.datosimpresion.FECHAENCABEZADO = moment(fechaMask_SER446.value.trim().replace(/\//g, '')).format('MMMM DD [de] YYYY')
            this.SER446.datosimpresion.FECHAENCABEZADO = this.SER446.datosimpresion.FECHAENCABEZADO.charAt(0).toUpperCase() + this.SER446.datosimpresion.FECHAENCABEZADO.slice(1);
            let nitter = parseInt(this.SER446.ENVIOS[0].NIT_ENVIO)
            postData({
                datosh: `${datosEnvio()}${nitter}|`
            }, get_url("APP/CONTAB/CON802_01.DLL"))
                .then((data) => {
                    console.debug(data);
                    this.SER446.datosimpresion.NIT = nitter;
                    this.SER446.datosimpresion.DESCRIPTER = data.TERCER[0].DESCRIP_TER;
                    this.SER446.datosimpresion.DESCRIPTER = data.TERCER[0].DESCRIP_TER2;
                    this.SER446.datosimpresion.DIRECCTER = data.TERCER[0].DIRREC;
                    this.SER446.datosimpresion.CODCIUTER = data.TERCER[0].COD_CIU;
                    (this.form.excel_SER446 == 'S') 
                    ? this._listadopresentacio_SER446()
                    : this._completarimpresion_SER446()
                })
                .catch((error) => {
                    console.error(error);
                    this.SER446.datosimpresion.DESCRIPTER = ' ';
                    this.SER446.datosimpresion.DESCRIPTER = ' ';
                    this.SER446.datosimpresion.DIRECCTER = ' ';
                    this.SER446.datosimpresion.CODCIUTER = ' ';
                    (this.form.excel_SER446 == 'S') 
                    ? this._listadopresentacio_SER446()
                    : this._completarimpresion_SER446()
                });
        },
        _listadopresentacio_SER446(){
            for(var i in this.SER446.ENVIOS){
                if(this.SER446.ENVIOS[i].VALOR_NETO.length > 0){
                    this.SER446.ENVIOS[i].NETO = (parseInt(this.SER446.ENVIOS[i].VALOR_NETO.replace(/,/g, ''))).toString()
                }
                if(this.SER446.ENVIOS[i].VALOR_BRUTO.length > 0){
                    this.SER446.ENVIOS[i].BRUTO = (parseInt(this.SER446.ENVIOS[i].VALOR_BRUTO.replace(/,/g, ''))).toString()
                }
                if(this.SER446.ENVIOS[i].VALOR_ABONO.length > 0){
                    this.SER446.ENVIOS[i].ABONO = (parseInt(this.SER446.ENVIOS[i].VALOR_ABONO.replace(/,/g, ''))).toString()
                }
            }
            console.log(this.SER446.ENVIOS, 'ARRAY')
            columnas = [
                {
                    title: "ITEM",
                    value: 'ITEM2',

                },
                {
                    title: "PREFIJO",
                    value: 'PREFIJO',
                    format: "string"
                },
                {
                    title: "FACTURA",
                    value: 'NUMERO',
                    format: "string"
                },
                {
                    title: "FECHA",
                    value: 'FECHA_ENVIO',
                    format: "fecha"
                },
                {
                    title: "IDENTIFICACION",
                    value: 'ID_PACIENTE',
                },
                {
                    title: "DESCRIPCION",
                    value: 'NOMBRE_PACIENTE',
                },
                {
                    title: "VALOR ABONO",
                    value: 'ABONO',
                    format: 'money',
                },
                {
                    title: "VALOR BRUTO",
                    value: 'BRUTO',
                    format: 'money',
                    totalsRowFunction: 'sum'
                },
                {
                    title: "NETO",
                    value: 'NETO',
                    format: 'money',
                    totalsRowFunction: 'sum'
                },
            ]
            _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                    { text: `NIT ${$_USUA_GLOBAL[0].NIT}`, bold: true, size: 16 },
                    { text: `${$_USUA_GLOBAL[0].DIRECC} TEL: ${$_USUA_GLOBAL[0].TEL}`, bold: true, size: 12 },
                    { text: `${$_USUA_GLOBAL[0].NOMBRE_CIU} - ${$_USUA_GLOBAL[0].NOMBRE_DEP}`, bold: true, size: 12 },
                    { text: `RELACION DE FACTURAS`, bold: true, size: 12 },
                    
                ],
                logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                ruta_logo: 'P:\\PROG\\LOGOS\\',
                tabla: {
                    columnas,
                    data: this.SER446.ENVIOS,
                    totalsRow: true
                },
                archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                scale: 65,
                orientation: 'landscape'
            })
                .then(() => {
                    loader("hide");
                    CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                    _toggleNav();
                })
                .catch(() => {
                    loader("hide");
                    CON851('', 'Hubo un error en la impresión', this._evaluarfolio_SER446(), 'error', 'Error')
                })
        },
        _completarimpresion_SER446() {
            if ($_USUA_GLOBAL[0].NIT == 800037202 || $_USUA_GLOBAL[0].NIT == 901120152 || $_USUA_GLOBAL[0].NIT == 892000458 || $_USUA_GLOBAL[0].NIT == 900450008) {
                // SER446Z - SER446G - SER446H - SER446T
                this.SER446.datosimpresion.COLUMNAS = ['FACTURA', 'FECHA_ENVIO', 'NOMBRE_PACIENTE', 'VALOR_BRUTO', 'VALOR_ABONO', 'VALOR_NETO'];
                this.SER446.datosimpresion.WIDTH = ['14%', '10%', '25%', '11%', '12%', '12%'];
            } else if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900804411) {
                // SER446N
                this.SER446.datosimpresion.COLUMNAS = ['FACTURA', 'FECHA_ENVIO', 'NOMBRE_PACIENTE', 'VALOR_NETO'];
                this.SER446.datosimpresion.WIDTH = ['10%', '13%', '42%', '10%'];
            } else if ($_USUA_GLOBAL[0].NIT == 830515242 || $_USUA_GLOBAL[0].NIT == 800251482) {
                // SER446I - SER446V YA
                this.SER446.datosimpresion.COLUMNAS = ['FACTURA', 'NOMBRE_PACIENTE', 'ACOMPAÑANTE', 'VALOR_NETO'];
                this.SER446.datosimpresion.WIDTH = ['11%', '27%', '28%', '10%'];
            } else if ($_USUA_GLOBAL[0].NIT == 845000038) {
                // SER446M YA
                this.SER446.datosimpresion.COLUMNAS = ['FACTURA', 'FECHA_ENVIO', 'NOMBRE_PACIENTE', 'VALOR_BRUTO', 'CTA_MODE', 'VALOR_ABONO', 'VALOR_NETO'];
                this.SER446.datosimpresion.WIDTH = ['10%', '11%', '30%', '10%', '10%', '10%'];
                this.SER446.datosimpresion.CANTCARPETAS = cantidadcarpetasMask_SER446.value.trim();
                this.SER446.datosimpresion.FOLIOS = cantidadfoliosMask_SER446.value.trim();
            } else if ($_USUA_GLOBAL[0].NIT == 900471031) {
                // SER446W
                this.SER446.datosimpresion.COLUMNAS = ['ITEM2', 'FACTURA', 'FECHA_ENVIO', 'ID_PACIENTE', 'NOMBRE_PACIENTE', 'VALOR_BRUTO', 'VALOR_ABONO', 'VALOR_NETO'];
                this.SER446.datosimpresion.WIDTH = ['4%', '8%', '10%', '12%', '28%', '13%', '13%', '13%']
            } else {
                // SER446
                this.SER446.datosimpresion.COLUMNAS = ['ITEM2', 'PREFIJO', 'NUMERO', 'FECHA_ENVIO', 'ID_PACIENTE', 'NOMBRE_PACIENTE', 'VALOR_BRUTO'];
                this.SER446.datosimpresion.WIDTH = ['4%', '8%', '10%', '15%', '15%', '33%', '12%'];
            }
            this.SER446.datosimpresion.NROENV = numeroenvioMask_SER446.value.trim().replace(/,/g, '').padStart(6, '0');
            this.SER446.datosimpresion.MESLNKENLETRAS = moment(`20${$_USUA_GLOBAL[0].FECHALNK}`).format('MMMM').toUpperCase();
            this.SER446.datosimpresion.MESREPORTADOENLETRAS = moment(this.form.mesreportar_SER446.trim().padStart(2, '0')).format('MMMM').toUpperCase();
            this.SER446.datosimpresion.AÑO = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
            let valortotal = 0;
            let valorabono = 0;
            let valorneto = 0;
            for (var i in this.SER446.ENVIOS) {
                let valor = parseFloat(this.SER446.ENVIOS[i].VALOR_BRUTO.replace(/,/g, ''));
                let abono = parseFloat(this.SER446.ENVIOS[i].VALOR_ABONO.replace(/,/g, ''));
                let saldo = parseFloat(this.SER446.ENVIOS[i].VALOR_NETO.replace(/,/g, ''));
                if (isNaN(valor)) valor = 0;
                else valor = parseFloat(this.SER446.ENVIOS[i].VALOR_BRUTO.replace(/,/g, ''))
                if (isNaN(abono)) abono = 0;
                else abono = parseFloat(this.SER446.ENVIOS[i].VALOR_ABONO.replace(/,/g, ''))
                if (isNaN(saldo)) saldo = 0;
                else saldo = parseFloat(this.SER446.ENVIOS[i].VALOR_NETO.replace(/,/g, ''))
                valortotal = valortotal + valor;
                valorabono = valorabono + abono;
                valorneto = valorneto + saldo;
            }
            this.SER446.datosimpresion.TOTALVALOR = valortotal;
            this.SER446.datosimpresion.TOTALABONO = valorabono;
            this.SER446.datosimpresion.TOTALSALDO = valorneto;
            this.SER446.datosimpresion.CANTFACT = this.SER446.ENVIOS.length - 1;
            this.SER446.datosimpresion.VALORENLETRAS = FAC146(valortotal);
            this.SER446.datosimpresion.VALORTOTAL = numeroencomas(valortotal);
            this.SER446.datosimpresion.FIRMA = parseInt(this.SER446.FIRMAS[0].DATOS_GER.substring(0, 10)).toString();
            postData({
                datosh: `${datosEnvio()}${this.SER446.datosimpresion.FIRMA.padStart(10, '0')}|8|`,
            }, get_url("APP/CONTAB/CON802_01.DLL"))
                .then(data => {
                    this.SER446.datosimpresion.DESCRIPFIRMA = data.TERCER[0].DESCRIP_TER;
                    console.log(this.SER446.datosimpresion);
                    _impresionescartapresentacion(this.SER446.datosimpresion, () => {
                        CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                    }, this._evaluarfolio_SER446);
                }).catch(error => {
                    console.error(error);
                    this._evaluarfolio_SER446();
                });
        },
        _ventanaNumerosenvio_SER446(e) {
            console.log(e)
            if (e.which == 119 || e.type == 'click') {
                loader('show');
                postData({
                    datosh: `${datosEnvio()}20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 4)}|`
                }, get_url("APP/SALUD/SER846.DLL"))
                    .then((data) => {
                        loader('hide');
                        data.ENVIOS.pop();
                        _ventanaDatos({
                            titulo: 'VENTANA DE ENVIOS',
                            columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA"],
                            data: data.ENVIOS,
                            callback_esc: function () {
                                $('#numeroenvio_SER446').focus();
                            },
                            callback: function (data) {
                                numeroenvioMask_SER446.typedValue = data.NRO.trim();
                                _enterInput('#numeroenvio_SER446');
                            }
                        });
                    })
                    .catch((error) => {
                        loader('hide');
                        $('#numeroenvio_SER446').focus();
                        console.error(error);
                    });
            }
        },
        _ventanaTerceros_SER446(e) {
            if (e.which == 119 || e.type == 'click') {
                // _ventanaDatos({
                //     titulo: "VENTANA DE TERCEROS",
                //     columnas: ['COD', 'NOMBRE', "DIRREC", "TELEF", "CIUDAD", "FACTOR"],
                //     data: this.SER446.TERCEROS,
                //     callback_esc: function () {
                //         $("#nit_SER446").focus();
                //     },
                //     callback: function (data) {
                //         nitclientMask_SER446.typedValue = data.COD;
                //         _enterInput('#nit_SER446');
                //     }
                // });
                parametros = {
                    dll: 'TERCEROS',
                    valoresselect: ['Buscar por nombre tercero'],
                    f8data: 'TERCEROS',
                    columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                    callback: (data) => {
                        console.log(data, 'TERCERO')
                        nitclientMask_SER446.typedValue = data.COD.trim();
                        _enterInput('#nit_SER446');
                    },
                    cancel: () => {
                        // _enterInput('#nit_SER446');
                        _evaluarnumeroenvio_SER446()
                    }
                };
                F8LITE(parametros);
            }
        }
    }
})

/// MASCARAS
var numeroenvioMask_SER446 = IMask($('#numeroenvio_SER446')[0], { mask: Number });
var nitclientMask_SER446 = IMask($('#nit_SER446')[0], { mask: Number, thousandsSeparator: ',' });
var momentFormat = 'YYYY/MM/DD';
var fechaMask_SER446 = IMask($('#fechaimpresion_SER446')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2000, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2000,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
    }
});
var cantidadcarpetasMask_SER446 = IMask($('#cantidadcarpetas_SER446')[0], { mask: Number });
var cantidadfoliosMask_SER446 = IMask($('#cantidadfolios_SER446')[0], { mask: Number });