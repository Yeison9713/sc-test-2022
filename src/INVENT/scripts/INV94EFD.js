new Vue({
    el: '#INV94E',
    data: {
        INV94EFD: [],
        form: {
            documento_INV94EFD: '',
        }
    },
    created() {
        _inputControl('disabled');
        nombreOpcion('9,4,2,E,4 Envio nota electronica');
        let $_this = this;
        $_this._evaluardocumento_INV94EFD()
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS[0];
            $_this.INV94EFD.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'GRUPOS' }, data => {
                data = data.GRUPOS;
                data.pop();
                $_this.INV94EFD.GRUPOS = data;
                $_this.INV94EFD.GRUPOS = $_this.INV94EFD.GRUPOS.filter(x => x.TIPO.trim() == '0')
                obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, data => {
                    data = data.ARTICULOS
                    data.pop();
                    $_this.INV94EFD.ARTICULOS = data;
                })
            })
        })
    },
    methods: {
        _evaluardocumento_INV94EFD() {
            var elaborar = [
                { COD: "1", DESCRIP: "Elaborar Nota Debito" },
                { COD: "2", DESCRIP: "Elaborar Nota credito" }
            ];
            POPUP(
                {
                    array: elaborar,
                    titulo: "Documento a elaborar",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    callback_f: () => {
                        _toggleNav();
                    },
                },
                elaborar => {
                    this.form.documento_INV94EFD = elaborar.COD + " - " + elaborar.DESCRIP;
                    this._evaluarprefijo_INV94EFD()
                },
            );
        },
        _evaluarprefijo_INV94EFD() {
            validarInputs({
                form: '#VALIDAR1_INV94EFD',
                orden: '1'
            },
                () => {
                    setTimeout(this._evaluardocumento_INV94EFD, 300)
                },
                this._evaluarnroinicial_INV94EFD
            )
        },
        _evaluarnroinicial_INV94EFD() {
            validarInputs({
                form: '#VALIDAR2_INV94EFD',
                orden: '1'
            },
                this._evaluarprefijo_INV94EFD,
                () => {
                    if (nroinicialMask_INV94E.value == '999999') {
                        this._evaluarfechainicial_INV94EFD()
                    } else {
                        if (nroinicialMask_INV94E.value.trim() == '') {
                            CON851('03', '03', null, "error", "Error");
                            this._evaluarnroinicial_INV94EFD()
                        } else {
                            this._evaluarnrofinal_INV94EFD()
                        }
                    }
                }
            )
        },
        _evaluarnrofinal_INV94EFD() {
            validarInputs({
                form: '#VALIDAR3_INV94EFD',
                orden: '1'
            },
                this._evaluarnroinicial_INV94EFD,
                ()=>{
                    if (nrofinalMask_INV94E.value.trim() == '') {
                        CON851('03', '03', null, "error", "Error");
                        this._evaluarnrofinal_INV94EFD()
                    } else {
                        this._evaluarfechainicial_INV94EFD()
                    }
                    
                }
            )
        },
        _evaluarfechainicial_INV94EFD() {
            fechainicialMask_INV94E.typedValue = '';
            validarInputs({
                form: '#VALIDAR4_INV94EFD',
                orden: '1'
            },
                this._evaluarnrofinal_INV94EFD,
                () => {
                    let dato = fechainicialMask_INV94E.value.replace(/-/g, '').padEnd(8, ' ').substring(6, 8);
                    if (dato.trim() == '') {
                        this._evaluarfechainicial_INV94EFD();
                    } else {
                        if (dato.trim() == '1' || dato.trim() == '2' || dato.trim() == '3' || dato.trim() == '4' || dato.trim() == '5' || dato.trim() == '6' || dato.trim() == '7' || dato.trim() == '8' || dato.trim() == '9') {
                            fechainicialMask_INV94E.typedValue = `${fechainicialMask_INV94E.value.replace(/-/g, '').substring(0, 6)}0${dato.trim()}`
                        }
                        console.log(fechainicialMask_INV94E.typedValue, 'FECHA')
                        this._evaluarfechafinal_INV94EFD();
                    }
                }
            )
        },
        _evaluarfechafinal_INV94EFD() {
            fechafinalMask_INV94E.typedValue = '';
            validarInputs({
                form: '#VALIDAR5_INV94EFD',
                orden: '1'
            },
                this._evaluarfechainicial_INV94EFD,
                () => {
                    let dato = fechafinalMask_INV94E.value.replace(/-/g, '').padEnd(8, ' ').substring(6, 8);
                    if (dato.trim() == '') {
                        this._evaluarfechafinal_INV94EFD();
                    } else {
                        if (dato.trim() == '1' || dato.trim() == '2' || dato.trim() == '3' || dato.trim() == '4' || dato.trim() == '5' || dato.trim() == '6' || dato.trim() == '7' || dato.trim() == '8' || dato.trim() == '9') {
                            fechafinalMask_INV94E.typedValue = `${fechafinalMask_INV94E.value.replace(/-/g, '').substring(0, 6)}0${dato.trim()}`
                        }
                        if (nroinicialMask_INV94E.value.trim() == '' || nroinicialMask_INV94E.value == 0) {
                            this._evaluarnroinicial_INV94EFD();
                        } else {
                            postData({ datosh: `${datosEnvio()}${prefijoMask_INV94EFD.value}|${nroinicialMask_INV94E.value.padStart(6, '0')}|${nrofinalMask_INV94E.value.padStart(6, '0')}|${fechainicialMask_INV94E.value.replace(/-/g, '')}|${fechafinalMask_INV94E.value.replace(/-/g, '')}||||${this.form.documento_INV94EFD.substring(0, 1)}|` },
                                get_url("APP/INVENT/INV94EFD.DLL"))
                                .then(data => {
                                    console.debug(data);
                                    postData({ datosh: `${datosEnvio()}${localStorage.Usuario}|${prefijoMask_INV94EFD.value}|${fechainicialMask_INV94E.value.replace(/-/g, '')}|${fechafinalMask_INV94E.value.replace(/-/g, '')}|${nroinicialMask_INV94E.value.padStart(6, '0')}|${nrofinalMask_INV94E.value.padStart(6, '0')}|${this.form.documento_INV94EFD.substring(0, 1)}|` },
                                        get_url("APP/INVENT/INV94EFDE.DLL"))
                                        .then(data => {
                                            console.debug(data, 'llamado dll');
                                            let pruebatoken = this.INV94EFD.PREFIJOS.PRUEBA_TOKEN;
                                            let proveedor = this.INV94EFD.PREFIJOS.PROV_FACT_ELECT;
                                            _factura_electronica({ proveedor: proveedor, tipo_ser: pruebatoken, dataJson: data })
                                                .then(data => {
                                                    this.INV94EFD.FACTURAS = data;
                                                    this.INV94EFD.CONTEOFACTURA = 0;
                                                    this._grabarcufefacturas_INV94EFD();
                                                })
                                        })
                                        .catch(error => {
                                            console.error(error);
                                            this._evaluarnroinicial_INV94EFD();
                                        });
                                })
                                .catch(error => {
                                    console.error(error);
                                    this._evaluarnroinicial_INV94EFD();
                                });
                        }
                    }
                }
            )
        },
        _grabarcufefacturas_INV94EFD() {
            data = this.INV94EFD.FACTURAS[this.INV94EFD.CONTEOFACTURA];
            if (this.INV94EFD.CONTEOFACTURA <= this.INV94EFD.FACTURAS.length - 1) {
                if (data.ESTADO_ENVIO.substring(0, 2).trim() == '01') {
                    loader('hide');
                    CON851('', 'FACTURA RECHAZADA POR LA DIAN', null, 'error', 'Error');
                    this._evaluarfechafinal_INV94EFD();
                } else {
                    if (data.CUFE.CODE) {
                        if (data.CUFE.CODE.trim() == 'ERROR' || data.CUFE.CODE.trim() == '') {
                            CON851('', 'REVISAR FACTURA RECHAZADA', this._evaluarprefijo_INV94EFD(), 'error', 'Error');
                            this._grabarcufefacturas_INV94EFD();
                        } else {
                            postData({ datosh: `${datosEnvio()}${prefijoMask_INV94EFD.value}|${nroinicialMask_INV94E.value.padStart(6, '0')}|${nrofinalMask_INV94E.value.padStart(6, '0')}|${fechainicialMask_INV94E.value.replace(/-/g, '')}|${fechafinalMask_INV94E.value.replace(/-/g, '')}|1|${data.FACTURA}|${data.CUFE.CODE}|${this.form.documento_INV94EFD.substring(0, 1)}|` },
                                get_url("APP/INVENT/INV94EFD.DLL"))
                                .then(data => {
                                    this.INV94EFD.CONTEOFACTURA++;
                                    this._grabarcufefacturas_INV94EFD();
                                })
                                .catch(error => {
                                    console.error(error);
                                    this._evaluarnroinicial_INV94EFD();
                                });
                        }
                    } else {
                        CON851('', 'DIAN NO GENERO CUFE', this._evaluarprefijo_INV94EFD(), 'error', 'Error');
                    }
                }
            } else {
                CON851('39', '39', _toggleNav(), 'success', 'Exito');
            }
        }
    }
})
var prefijoMask_INV94EFD = IMask($('#prefijo_INV94EFD')[0], {
    mask: '*',
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var nroinicialMask_INV94E = IMask($('#nroinicial_INV94EFD')[0], { mask: Number });
var nrofinalMask_INV94E = IMask($('#nrofinal_INV94EFD')[0], { mask: Number });
var fechainicialMask_INV94E = IMask($("#fechainicial_INV94EFD")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: moment().format('YYYY'), to: moment().format('YYYY'), maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: moment().format('MM'), to: moment().format('MM'), maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});
var fechafinalMask_INV94E = IMask($("#fechafinal_INV94EFD")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '2000', to: moment().format('YYYY'), maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: moment().format('MM'), maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});
