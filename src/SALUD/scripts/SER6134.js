new Vue({
    el: '#SER6134',
    data: {
        SER6134: [],
        form: {
            prefijod_SER6134: '',
            fechainicialaño_SER6134: '',
            fechainicialmes_SER6134: '',
            fechafinalaño_SER6134: '',
            fechafinalmes_SER6134: '',
        }
    },
    created() {
        loader('show');
        _inputControl('disabled');
        nombreOpcion("9,7,6,G,3 - Envio factura electronica contado");
        let $_this = this;
        $_this.SER6134.FECHAMAXIMA = moment().subtract(9, "days").format("YYYYMMDD")
        $_this.SER6134.SWFECHAMAXIMA = "N"
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
            console.log(data);
            data = data.FIRMAS[0];
            $_this.SER6134.FIRMAS = data;
            obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
                console.log(data);
                $_this.SER6134.PREFIJOS = data.PREFIJOS;
                loader('hide');
                $_this._evaluarprefijo_SER6134();
            })
        })
    },
    methods: {
        _evaluarprefijo_SER6134() {
            this.form.fechainicialaño_SER6134 = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
            this.form.fechafinalaño_SER6134 = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
            this.form.fechainicialmes_SER6134 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
            diainicialMask_SER614E.typedValue = '1';
            this.form.fechafinalmes_SER6134 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
            diafinalMask_SER614E.typedValue = parseInt(moment().format('DD')).toString();
            validarInputs(
                {
                    form: "#VALIDAR1_SER6134",
                    orden: '1'
                },
                _toggleNav,
                () => {
                    if (prefijoMask_SER6134.value.trim() == '') {
                        this._evaluarprefijo_SER6134()
                    } else {
                        this.form.prefijod_SER6134 = 'CONTADO';
                        if (localStorage.Usuario == 'GEBC') {
                            this._evaluarmesfechamesini_SER6134()
                        } else {
                            this._evaluarfechainicial_SER6134();
                        }
                    }
                }
            )
        },
        _evaluarmesfechamesini_SER6134(){
            validarInputs(
                {
                    form: "#VALIDAR20_SER6134",
                    orden: '1'
                },
                this._evaluarprefijo_SER6134,
                () => {
                    if (this.form.fechainicialmes_SER6134.trim() == '' || this.form.fechainicialmes_SER6134 > 12 || this.form.fechainicialmes_SER6134 < 1) {
                        this._evaluarmesfechamesini_SER6134();
                    } else {
                        if($.isNumeric(this.form.fechainicialmes_SER6134)){
                            this._evaluarfechainicial_SER6134()
                        }else{
                            this._evaluarmesfechamesini_SER6134();
                        }
                    }
                }
            )
        }, 
        _evaluarfechainicial_SER6134() {
            validarInputs(
                {
                    form: "#VALIDAR2_SER6134",
                    orden: '1'
                },
                this._evaluarprefijo_SER6134,
                () => {
                    if (diainicialMask_SER614E.value.trim() == '' || diainicialMask_SER614E.value > 31 || diainicialMask_SER614E.value < 1) {
                        this._evaluarfechainicial_SER6134();
                    } else {
                        this.SER6134.FECHAINIW = `${this.form.fechainicialaño_SER6134}${this.form.fechainicialmes_SER6134}${diainicialMask_SER614E.value.padStart(2, '0')}`
                        if (moment().format(`${this.form.fechainicialaño_SER6134}${this.form.fechainicialmes_SER6134}${diainicialMask_SER614E.value.padStart(2, '0')}`) == 'Invalid Date') {
                            this._evaluarfechainicial_SER6134();
                        } else {
                            let URL = get_url("APP/SALUD/SER6134.DLL");
                            postData({
                                datosh: datosEnvio() + `1|${prefijoMask_SER6134.value}||${this.form.fechainicialaño_SER6134}${this.form.fechainicialmes_SER6134}${diainicialMask_SER614E.value.padStart(2, '0')}|`
                            }, URL)
                                .then((data) => {
                                    console.log(data, 'SI HAY');
                                    if (localStorage.Usuario == 'GEBC') {
                                        this._evaluarmesfechamesfin_SER6134()
                                    } else {
                                        this._evaluarfechafinal_SER6134();
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                    this._evaluarfechainicial_SER6134()
                                })
                        }
                    }
                }
            )
        },
        _evaluarmesfechamesfin_SER6134(){
            validarInputs(
                {
                    form: "#VALIDAR30_SER6134",
                    orden: '1'
                },
                this._evaluarfechainicial_SER6134,
                () => {
                    if (this.form.fechafinalmes_SER6134.trim() == '' || this.form.fechafinalmes_SER6134 > 12 || this.form.fechafinalmes_SER6134 < 1) {
                        this._evaluarmesfechamesfin_SER6134()
                    } else {
                        if($.isNumeric(this.form.fechafinalmes_SER6134)){
                            this._evaluarfechafinal_SER6134()
                        }else{
                            this._evaluarmesfechamesfin_SER6134()
                        }
                    }
                }
            )
        }, 
        _evaluarfechafinal_SER6134() {
            validarInputs(
                {
                    form: "#VALIDAR3_SER6134",
                    orden: '1'
                },
                this._evaluarfechainicial_SER6134,
                () => {
                    if (diafinalMask_SER614E.value.trim() == '' || diafinalMask_SER614E.value > 31 || diafinalMask_SER614E.value < 1) {
                        this._evaluarfechafinal_SER6134();
                    } else {
                        if (moment().format(`${this.form.fechafinalaño_SER6134}${this.form.fechafinalmes_SER6134}${diafinalMask_SER614E.value.padStart(2, '0')}`) == 'Invalid Date') {
                            this._evaluarfechafinal_SER6134();
                        } else {
                            this._evaluarordenar_SER6134();
                        }
                    }
                }
            )
        },
        _evaluarordenar_SER6134() {
            ordenarMask_SER6134.typedValue = 'N';
            validarInputs(
                {
                    form: "#VALIDAR4_SER6134",
                    orden: '1'
                },
                this._evaluarfechafinal_SER6134,
                () => {
                    if (ordenarMask_SER6134.value.trim() == '') ordenarMask_SER6134.typedValue = 'N'
                    console.log(this.SER6134.FECHAINIW, 'FECHA INICIO')
                    console.log(this.SER6134.FECHAMAXIMA, 'FECHA MAXIMA')
                    if (this.SER6134.FECHAINIW < this.SER6134.FECHAMAXIMA) {
                        CON851P("Desea ajustar fecha", () => { return this._evaluarordenar_SER6134() }, () => {
                            this.SER6134.SWFECHAMAXIMA = "S"
                            return this._evaluarconsultafact_SER6134()
                        })
                    } else {
                        this._evaluarconsultafact_SER6134()
                    }
                }
            )
        },
        _evaluarconsultafact_SER6134() {
            postData({ datosh: datosEnvio() + `2|${prefijoMask_SER6134.value}|${ordenarMask_SER6134.value}|${this.form.fechainicialaño_SER6134}${this.form.fechainicialmes_SER6134}${diainicialMask_SER614E.value.padStart(2, '0')}|${this.form.fechafinalaño_SER6134}${this.form.fechafinalmes_SER6134}${diafinalMask_SER614E.value.padStart(2, '0')}|${localStorage.Usuario}|` },
                get_url("APP/SALUD/SER6134.DLL"))
                .then((data) => {
                    console.log(data);
                    this.SER6134.CONTEO = 0;
                    this.SER6134.TEMPORAL = data.TEMPORAL;
                    this.SER6134.FACTURAS = data.FACTURAS;
                    this.SER6134.FACTURAS.pop()
                    let array = new Set(this.SER6134.FACTURAS.map(JSON.stringify))
                    this.SER6134.FACTURAS = Array.from(array).map(JSON.parse);
                    loader('show');
                    this._generarfacturaelectronica_SER6134();
                })
                .catch((error) => {
                    console.error(error);
                    CON851('', 'HUBO UN ERROR CON LAS FACTURAS', this._evaluarordenar_SER6134(), 'error', 'Error')
                })
        },
        _generarfacturaelectronica_SER6134() {
            loader('hide');
            console.log(this.SER6134.FACTURAS);
            if (this.SER6134.CONTEO > this.SER6134.FACTURAS.length - 1) {
                loader('hide');
                CON851('', 'Factura/s enviada', null, 'success', 'Exito');
                _toggleNav();
            } else {
                let prefijo = this.SER6134.FACTURAS[this.SER6134.CONTEO].LLAVE.substring(0, 1);
                let numero = this.SER6134.FACTURAS[this.SER6134.CONTEO].LLAVE.substring(1, 7);
                console.log(prefijo, numero);
                postData({
                    datosh: `${datosEnvio()}${prefijo}${numero}|8|`,
                }, get_url("APP/SALUD/SER808-01.DLL"))
                    .then(factura => {
                        if (factura.NUMER19[0].CUFEELEC_NUM.trim() == '') {
                            postData({ datosh: datosEnvio() + `${localStorage.Usuario}|${this.SER6134.FACTURAS[this.SER6134.CONTEO].LLAVE}|${this.SER6134.TEMPORAL}|${this.SER6134.SWFECHAMAXIMA}|${this.SER6134.FECHAMAXIMA}|` }, get_url("APP/SALUD/SER6134FEC.DLL"))
                                .then((data) => {
                                    console.log(data);
                                    let pruebatoken = this.SER6134.PREFIJOS[0].PRUEBA_TOKEN;
                                    let proveedor = this.SER6134.PREFIJOS[0].PROV_FACT_ELECT;
                                    if (data[0].TOTALES.SALUD) data[0].TOTALES.SALUD = data[0].TOTALES.SALUD.replace(/�/g, "Ñ");
                                    console.log(pruebatoken, proveedor);
                                    _factura_electronica({ proveedor: proveedor, tipo_ser: pruebatoken, dataJson: data })
                                        .then(data => {
                                            data = data[0];
                                            console.log(data);
                                            if (data.ESTADO_ENVIO.substring(0, 2).trim() == '01') {
                                                loader('hide');
                                                CON851('', 'FACTURA RECHAZADA POR LA DIAN', this._evaluarordenar_SER6134(), 'error', 'Error');
                                            } else {
                                                if (data.CUFE.CODE) {
                                                    if (data.CUFE.CODE.trim() == 'ERROR') {
                                                        postData({ datosh: `${datosEnvio()}5||||${prefijo}|${numero}|||||||||${parseInt(data.ESTADO_ENVIO.substring(0, 2)).toString()}|${data.FECHA.substring(6, 10)}${data.FECHA.substring(3, 5)}${data.FECHA.substring(0, 2)}|` },
                                                            get_url("APP/SALUD/SER513.DLL"))
                                                            .then((data) => {
                                                                console.debug(data);
                                                                this.SER6134.CONTEO++;
                                                                setTimeout(this._generarfacturaelectronica_SER6134, 300);
                                                            })
                                                            .catch(error => {
                                                                loader('hide');
                                                                console.error(error);
                                                                CON851('', 'HUBO UN ERROR GRABANDO EL ESTADO DE LA FACTURA', null, 'error', 'Error');
                                                                this._evaluarordenar_SER6134();
                                                            });
                                                    } else {
                                                        postData({ datosh: `${datosEnvio()}5||||${prefijo}|${numero}||||||||${data.CUFE.CODE.trim()}|${parseInt(data.ESTADO_ENVIO.substring(0, 2)).toString()}|${data.FECHA.substring(6, 10)}${data.FECHA.substring(3, 5)}${data.FECHA.substring(0, 2)}|` },
                                                            get_url("APP/SALUD/SER513.DLL"))
                                                            .then((data) => {
                                                                console.debug(data);
                                                                this.SER6134.CONTEO++;
                                                                setTimeout(this._generarfacturaelectronica_SER6134, 300);
                                                            })
                                                            .catch(error => {
                                                                loader('hide');
                                                                console.error(error);
                                                                CON851('', 'HUBO UN ERROR GRABANDO EL ESTADO DE LA FACTURA', null, 'error', 'Error');
                                                                this._evaluarordenar_SER6134();
                                                            });
                                                    }
                                                } else {
                                                    postData({ datosh: `${datosEnvio()}5||||${prefijo}|${numero}|||||||||${parseInt(data.ESTADO_ENVIO.substring(0, 2)).toString()}|${data.FECHA.substring(6, 10)}${data.FECHA.substring(3, 5)}${data.FECHA.substring(0, 2)}|` },
                                                        get_url("APP/SALUD/SER513.DLL"))
                                                        .then((data) => {
                                                            console.debug(data);
                                                            this.SER6134.CONTEO++;
                                                            setTimeout(this._generarfacturaelectronica_SER6134, 300);
                                                        })
                                                        .catch(error => {
                                                            loader("hide");
                                                            console.error(error);
                                                            CON851('', 'HUBO UN ERROR GRABANDO EL ESTADO DE LA FACTURA', null, 'error', 'Error');
                                                            this._evaluarordenar_SER6134();
                                                        });
                                                }
                                            }
                                        })
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarordenar_SER6134();
                                })
                        } else {
                            CON851('', 'Factura ya tiene CUFE', null, 'success', 'Exito');
                            this.SER6134.CONTEO++;
                            setTimeout(this._generarfacturaelectronica_SER6134, 300);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        loader("hide");
                        CON851('', 'ERROR AL CONSULTAR LA FACTURA', null, 'error', 'Error');
                        this._evaluarordenar_SER6134();
                    })


            }
        }
    }
})

var prefijoMask_SER6134 = IMask($('#prefijo_SER6134')[0], {
    mask: 'a',
    definitions: {
        'a': /[E]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var ordenarMask_SER6134 = IMask($('#ordenar_SER6134')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var diainicialMask_SER614E = IMask($('#fechainicialdia_SER6134')[0], { mask: Number });
var diafinalMask_SER614E = IMask($('#fechafinaldia_SER6134')[0], { mask: Number });