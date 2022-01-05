new Vue({
    el: '#SAL543',
    data: {
        SAL543: [],
        form: {
            entidad_SAL543: "",
            descripentid_SAL543: "",
            clasecomp_SAL543: "",
            descripclase_SAL543: "",
            sucursal_SAL543: "",
            prefijo_SAL543: "",
            factura_SAL543: "",
            descripfact_SAL543: "",
            anoini_SAL543: "",
            mesini_SAL543: "",
            diaini_SAL543: "",
            anofin_SAL543: "",
            mesfin_SAL543: "",
            diafin_SAL543: "",
            operadorelab_SAL543: "",
            descripoperelab_SAL543: "",
            operadorrecauda_SAL543: "",
            descripoperrec_SAL543: "",
        },
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,5,4,1,6,1 - Comparativo facturas / recibos de caja");
        $_this = this;
        $_this.SAL543.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SAL543.ANOLNK = 20 + $_this.SAL543.FECHA_LNK.substring(0, 2)
        $_this.SAL543.MESLNK = $_this.SAL543.FECHA_LNK.substring(2, 4)
        $_this.SAL543.DIALNK = $_this.SAL543.FECHA_LNK.substring(4, 6)
        obtenerDatosCompletos(
            {
                nombreFd: 'SERVICIOS',
            },
            function (data) {
                $_this.SAL543.SERVICIOS = data.SERVICIOS
                loader("hide");
                $_this._evaluarentidad_SAL543()
                obtenerDatosCompletos(
                    {
                        nombreFd: "OPERADOR",
                    },
                    function (data) {
                        $_this.SAL543.OPERADOR = data.ARCHREST;
                        $_this.SAL543.OPERADOR.pop();
                    },
                );
            },
        );
    },
    methods: {
        _evaluarentidad_SAL543() {
            if (this.form.entidad_SAL543.trim() == '') this.form.entidad_SAL543 = "99"
            validarInputs({
                form: "#VALIDAR1_SAL543",
                orden: "1"
            },
                () => { _toggleNav() },
                () => {

                    if (this.form.entidad_SAL543 == "99") {
                        this.form.descripentid_SAL543 = 'TODAS LAS ENTIDADES';
                        this._evaluarclase_SAL543();
                    } else {
                        let URL = get_url("APP/CONTAB/CON802_01.DLL");
                        postData({
                            datosh: datosEnvio() + this.form.entidad_SAL543.padStart(10, "0") + "|",
                        }, URL)
                            .then(data => {
                                this.SAL543.TERCERO = data.TERCER[0]
                                this.form.descripentid_SAL543 = this.SAL543.TERCERO.DESCRIP_TER
                                this._evaluarclase_SAL543();
                            }).catch(error => {
                                console.error(error)
                                this._evaluarentidad_SAL543()
                            });
                    }
                }
            )
        },
        _evaluarclase_SAL543() {
            if (this.form.clasecomp_SAL543.trim() == '') {
                this.form.clasecomp_SAL543 = '*'
            }
            validarInputs(
                {
                    form: "#VALIDAR2_SAL543",
                    orden: '1'
                },
                () => { this._evaluarentidad_SAL543() },
                () => {
                    if (this.form.clasecomp_SAL543 == '*') {
                        this.form.descripclase_SAL543 = 'TODOS LOS TIPOS'
                        this._evaluarsuc_SAL543()
                    } else {
                        const res = this.SAL543.SERVICIOS.find(e => e.COD == this.form.clasecomp_SAL543);
                        if (res == undefined) {
                            CON851('03', '03', null, 'error', 'error');
                            this._evaluarclase_SAL543()
                        } else {
                            this.form.descripclase_SAL543 = res.DESCRIPCION
                            this._evaluarsuc_SAL543()
                        }
                    }

                }
            )
        },
        _evaluarsuc_SAL543() {
            if (this.form.sucursal_SAL543.trim() == '') {
                this.form.sucursal_SAL543 = '**'
            }
            validarInputs(
                {
                    form: "#VALIDAR3_SAL543",
                    orden: '1'
                },
                () => { this._evaluarclase_SAL543() },
                () => {
                    this.form.sucursal_SAL543 = this.form.sucursal_SAL543.padStart(2, '0')
                    this._evaluarprefijo_SAL543()
                }
            )
        },
        _evaluarprefijo_SAL543() {
            if (this.form.prefijo_SAL543.trim() == '') {
                this.form.prefijo_SAL543 = '*'
            }
            validarInputs(
                {
                    form: "#VALIDAR4_SAL543",
                    orden: '1'
                }, this._evaluarsuc_SAL543,
                () => {
                    if (this.form.prefijo_SAL543 == '*') {
                        this.form.factura_SAL543 = '000000'
                        this._mostrarfactura_SAL543();
                    } else {
                        this.form.prefijo_SAL543 = this.form.prefijo_SAL543.toUpperCase()
                        if (this.form.prefijo_SAL543 == 'A' || this.form.prefijo_SAL543 == 'P' || this.form.prefijo_SAL543 == 'T' || this.form.prefijo_SAL543 == 'R' ||
                            this.form.prefijo_SAL543 == 'Q' || this.form.prefijo_SAL543 == 'V' || this.form.prefijo_SAL543 == 'B' || this.form.prefijo_SAL543 == 'S') {
                            validarInputs(
                                {
                                    form: "#VALIDAR5_SAL543",
                                    orden: '1'
                                },
                                () => { this._evaluarprefijo_SAL543() },
                                () => {
                                    this.form.factura_SAL543 = this.form.factura_SAL543.padStart(6, '0')
                                    this._mostrarfactura_SAL543();
                                }
                            )
                        } else {
                            CON851('03', '03', this._evaluarprefijo_SAL543(), 'error', 'error');
                        }
                    }
                }
            )
        },
        _mostrarfactura_SAL543() {
            switch (this.form.prefijo_SAL543) {
                case '*':
                    this.form.descripfact_SAL543 = 'TODAS LAS FACTURAS'
                    this._valicacioncomprobante_SAL543();
                    break;
                case 'C':
                    this.form.descripfact_SAL543 = 'FACTURAS CREDITO'
                    this._valicacioncomprobante_SAL543();
                    break;
                case 'E':
                    this.form.descripfact_SAL543 = 'COMPROB. CONTADO'
                    this._valicacioncomprobante_SAL543();
                    break;
                default:
                    if (this.form.factura_SAL543 == 0) {
                        this.form.descripfact_SAL543 = 'TODAS LAS FACTURAS ' + this.form.prefijo_SAL543
                        this._valicacioncomprobante_SAL543();
                    } else {
                        let URL = get_url("APP/SALUD/SER808-01.DLL");
                        postData({ datosh: datosEnvio() + this.form.prefijo_SAL543 + this.form.facturacion_SAL543 + '|' }, URL)
                            .then(data => {
                                this.form.descripfact_SAL543 = data.NUMER19[0].DESCRIP_NUM
                                this.SAL543.FECHAINGNUM = data.NUMER19[0].FECHA_ING
                                this._valicacioncomprobante_SAL543();
                            })
                            .catch(err => {
                                console.debug(err);
                                this._evaluarprefijo_SAL543()
                            })
                    }
                    break;
            }
        },
        _valicacioncomprobante_SAL543() {
            if (this.form.prefijo_SAL543 == '*' || this.form.factura_SAL543 == 0) {
                if (this.form.anoini_SAL543.trim() == '') {
                    this.form.anoini_SAL543 = this.SAL543.ANOLNK
                    this.form.mesini_SAL543 = this.SAL543.MESLNK
                    this.form.diaini_SAL543 = '01'
                }
                this._evaluarfechaini_SAL543()
            } else {
                let URL = get_url("APP/SALUD/SAL543.DLL");
                postData({
                    datosh: `${datosEnvio()}`,
                    paso: '1',
                    factura: `${this.form.prefijo_SAL543}${this.form.facturacion_SAL543}`
                }, URL)
                    .then(data => {
                        this.form.anoini_SAL543 = this.SAL543.FECHAINGNUM.substring(0, 4)
                        this.form.mesini_SAL543 = this.SAL543.FECHAINGNUM.substring(4, 6)
                        this.form.diaini_SAL543 = this.SAL543.FECHAINGNUM.substring(6, 8)
                        this._evaluarfechaini_SAL543()
                    })
                    .catch(err => {
                        console.debug(err);
                        this._evaluarprefijo_SAL543()
                    })
            }
        },
        _evaluarfechaini_SAL543() {
            validarInputs(
                {
                    form: "#fechaInicial_SAL543",
                    orden: "1"
                }, this._evaluarprefijo_SAL543,
                () => {
                    if (this.form.diaini_SAL543.trim() == '' || this.form.diaini_SAL543 < 01 || this.form.diaini_SAL543 > 31) {
                        CON851('', 'dia incorrecto! ', this._evaluarfechaini_SAL543(), 'error', 'error');
                    } else {
                        this.SAL543.FECHAINIW = `${this.form.anoini_SAL543}${this.form.mesini_SAL543}${this.form.diaini_SAL543}`
                        let URL = get_url("APP/SALUD/SAL543.DLL");
                        postData({
                            datosh: `${datosEnvio()}`,
                            paso: '2',
                            fecha: `${this.SAL543.FECHAINIW}`
                        }, URL)
                            .then(data => {
                                this.form.anofin_SAL543 = this.form.anoini_SAL543
                                this.form.mesfin_SAL543 = this.form.mesini_SAL543
                                this.form.diafin_SAL543 = this.form.diaini_SAL543
                                this._evaluarfechafin_SAL543()
                            })
                            .catch(err => {
                                console.debug(err);
                                this._evaluarfechaini_SAL543()
                            })

                    }
                }
            )
        },
        _evaluarfechafin_SAL543() {
            validarInputs(
                {
                    form: "#fechaFinal_SAL543",
                    orden: "1"
                },
                () => { this._evaluarfechaini_SAL543() },
                () => {
                    if (this.form.diafin_SAL543.trim() == '' || this.form.diafin_SAL543 < 01 || this.form.diafin_SAL543 > 31) {
                        CON851('', 'dia incorrecto! ', this._evaluarfechafin_SAL543(), 'error', 'error');
                    } else {
                        this.SAL543.FECHAFINW = `${this.form.anofin_SAL543}${this.form.mesfin_SAL543}${this.form.diafin_SAL543}`
                        if (this.SAL543.FECHAINIW > this.SAL543.FECHAFINW) {
                            CON851('37', '37', this._evaluarfechafin_SAL543(), 'error', 'error');
                        } else {
                            this._evaluaroperador1_SAL543()
                        }
                    }
                }
            )
        },
        _evaluaroperador1_SAL543() {
            if (this.form.operadorelab_SAL543.trim() == '') this.form.operadorelab_SAL543 = "****";
            validarInputs(
                {
                    form: "#VALIDAR6_SAL543",
                    orden: "1",
                },
                this._evaluarfechafin_SAL543,
                () => {
                    if (this.form.operadorelab_SAL543.trim() == "" || this.form.operadorelab_SAL543 == "****") {
                        if (this.form.operadorelab_SAL543 == "****") this.form.descripoperelab_SAL543 = 'TODOS LOS FACTURADORES'
                        this._evaluaroperador2_SAL543()
                    } else {
                        postData({ datosh: (datos_envio = datosEnvio() + this.form.operadorelab_SAL543 + "|") }, get_url("app/CONTAB/CON003.DLL"),)
                            .then(data => {
                                // this.form.descripoperelab_SAL543
                                this._evaluaroperador2_SAL543()
                            })
                            .catch(error => {
                                this._evaluaroperador1_SAL543()
                            });
                    }
                },
            );
        },
        _evaluaroperador2_SAL543() {
            console.log('OPERADOR 2')
            if (this.form.operadorrecauda_SAL543.trim() == '') this.form.operadorrecauda_SAL543 = "****";
            validarInputs(
                {
                    form: "#VALIDAR7_SAL543",
                    orden: "1",
                },
                this._evaluaroperador1_SAL543,
                () => {
                    if (this.form.operadorrecauda_SAL543.trim() == "" || this.form.operadorrecauda_SAL543 == "****") {
                        if (this.form.operadorrecauda_SAL543 == "****") this.form.descripoperrec_SAL543 = 'TODOS LOS RECAUDADORES'
                        this._evaluardescuadre_SAL543()
                    } else {
                        postData({ datosh: (datos_envio = datosEnvio() + this.form.operadorrecauda_SAL543 + "|") }, get_url("app/CONTAB/CON003.DLL"),)
                            .then(data => {
                                // this.form.descripoperrec_SAL543
                                this._evaluardescuadre_SAL543()
                            })
                            .catch(error => {
                                this._evaluaroperador2_SAL543()
                            });
                    }
                },
            );
        },
        _evaluardescuadre_SAL543() {
            console.log('DESCUADRE')
            if (descuadreMask_SAL543.value.trim() == '') descuadreMask_SAL543.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR8_SAL543',
                orden: "1",
            },
                this._evaluaroperador2_SAL543,
                () => {
                    this._evaluarexterna_SAL543()
                }
            )
        },
        _evaluarexterna_SAL543() {
            console.log('EXTERNA')
            if (externaMask_SAL543.value.trim() == '') externaMask_SAL543.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR9_SAL543',
                orden: "1",
            },
                this._evaluardescuadre_SAL543,
                () => {
                    this._evaluarcopago_SAL543()
                }
            )
        },
        _evaluarcopago_SAL543() {
            console.log('COPAGOS')
            if (copagoMask_SAL543.value.trim() == '') copagoMask_SAL543.typedValue = 'S'
            validarInputs({
                form: '#VALIDAR10_SAL543',
                orden: "1",
            },
                this._evaluarexterna_SAL543,
                () => {
                    this._evaluarpaciente_SAL543()
                }
            )
        },
        _evaluarpaciente_SAL543() {
            if (pacienteMask_SAL543.value.trim() == '') pacienteMask_SAL543.typedValue = 'S'
            validarInputs({
                form: '#VALIDAR11_SAL543',
                orden: "1",
            },
                this._evaluarcopago_SAL543,
                () => {
                    this._evaluardescuadrados_SAL543()
                }
            )
        },
        _evaluardescuadrados_SAL543() {
            if (descuadradoMask_SAL543.value.trim() == '') descuadradoMask_SAL543.typedValue = 'S'
            validarInputs({
                form: '#VALIDAR12_SAL543',
                orden: "1",
            },
                this._evaluarpaciente_SAL543,
                () => {
                    this._validarreporte_SAL543()
                }
            )
        },
        _validarreporte_SAL543() {
            loader('show')
            let URL = get_url("APP/SALUD/SAL543.DLL");
            postData(
                {
                    datosh: `${datosEnvio()}`,
                    filtrado: `${this.form.entidad_SAL543}|${this.form.clasecomp_SAL543}|${this.form.sucursal_SAL543}|${this.form.prefijo_SAL543}${this.form.factura_SAL543}|${this.SAL543.FECHAINIW}|${this.SAL543.FECHAFINW}|${this.form.operadorelab_SAL543}|${this.form.operadorrecauda_SAL543}|${descuadreMask_SAL543.value}|${externaMask_SAL543.value}|${copagoMask_SAL543.value}|${pacienteMask_SAL543.value}|${descuadradoMask_SAL543.value}|${localStorage.Usuario}|`
                }, URL)
                .then(data => {
                    data = data.CONSULTA
                    loader('hide')
                    console.log(data, 'LISTADO')
                    columnas = [
                        {
                            title: "COMPROBANTE",
                            value: "COMPROBANTE",
                            format: "string"
                        },
                        {
                            title: "FACTURA",
                            value: "FACTURA",
                            
                        },
                        {
                            title: "FECHA COMPROB",
                            value: "FECHA_COMPROBANTE",
                            format: "fecha"
                        },
                        {
                            title: "ID",
                            value: "ID_PACIENTE",
                        },
                        {
                            title: "DESCRIP",
                            value: "DESCRIP_FACT",
                            
                        },
                        {
                            title: "TIPO AFILIACION",
                            value: "TIPO_AFILIACION_PACI",
                        },
                        {
                            title: "ESTRATO",
                            value: "ESTRATO_PACIENTE",
                            format: 'string'
                        },
                        {
                            title: "TIPO PAC",
                            value: "TIPO_PACIENTE",
                        },
                        {
                            title: "TIPO COPAGO",
                            value: "TIPO_COPAGO",
                        },
                        {
                            title: "TIPO FACT",
                            value: "TIPO_FAC"
                        },
                        {
                            title: "ELABORA",
                            value: "OPERADOR_CREO",
                        },
                        {
                            title: "NOMBRE QUIEN ELABORA",
                            value: "DECRIPOPER_CREO",
                        },
                        {
                            title: "CIUDAD ELABORA",
                            value: "CIUDOPER_CREO",
                        },
                        {
                            title: "MODIFICADO",
                            value: "OPERADOR_MOD",
                        },

                        {
                            title: "OPER REC",
                            value: "OPERADOR_REC",
                        },
                        {
                            title: "FECHA ELAB",
                            value: "FECHA_ELAB",
                            format: "fecha"
                        },
                        {
                            title: "FECHA REC",
                            value: "FECHA_REC",
                            format: "string"
                        },
                        {
                            title: "LOTE REC",
                            value: "LOTE_REC",
                        },
                        {
                            title: "NRO REC",
                            value: "NRO_REC",
                        },
                        {
                            title: "EPS",
                            value: "EPS_PACIENTE",
                            format: "string"
                        },
                        {
                            title: "VALOR BRUTO",
                            value: "VALOR_COMPROBANTE",
                            format: 'money',
                            totalsRowFunction: 'sum'
                        },
                        {
                            title: "COPAGO",
                            value: "COPAGO_COMPROBANTE",
                            format: 'money',
                            totalsRowFunction: 'sum'
                        },
                        {
                            title: "VALOR REC",
                            value: "VALOR_REC",
                            format: 'money',
                            totalsRowFunction: 'sum'
                        },
                        {
                            title: "SALDO",
                            value: "NETO",
                            format: 'money',
                            totalsRowFunction: 'sum'
                        },
                        {
                            title: "DETALLE COMP",
                            value: "OBSERV",
                            format: "string"
                        },
                        {
                            title: "AUTORIZACION",
                            value: "AUTORIZACION",
                        },
                        {
                            title: "CUPS 1ER",
                            value: "ARTICULO",
                        },
                        {
                            title: "UNIDAD SERVICIO",
                            value: "UNIDAD_SERVICIO",
                        }            
                    ]
                    _impresion2({
                        tipo: 'excel',
                        header: [
                            { text: `${$_USUA_GLOBAL[0].NOMBRE} NIT ${$_USUA_GLOBAL[0].NIT}`,  bold: true, size: 16 },
                            `Comparativo de facturacion contra recibos de caja ${this.SAL543.FECHAINIW} HASTA EL DIA ${this.SAL543.FECHAFINW}`,
                            `IMPRESO:${moment().format('YYYY/MM/DD')}`
                        ],
                        logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                        ruta_logo: 'P:\\PROG\\LOGOS\\',
                        tabla: {
                            columnas,
                            data: data,
                            totalsRow: true
                        },
                        archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                        scale: 65,
                        orientation: 'landscape'
                    })
                        .then(() => {
                            CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                            console.log('aca')
                            _toggleNav();
                        })
                        .catch(() => {
                            CON851('', 'Hubo un error en la impresión', this._evaluareps_SAL544C(), 'error', 'Error')
                        })

                })
                .catch(err => {
                    console.debug(err);
                    this._evaluardescuadrados_SAL543()
                })
        },
        _f8entidad_SAL543() {
            $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.entidad_SAL543 = data.COD.trim();
                    _enterInput('.entidad_SAL543');
                },
                cancel: () => {
                    _enterInput('.entidad_SAL543');
                }
            };
            F8LITE(parametros);
        },
        _f8clasecomp_SAL543() {
            var $_this = this;
            _ventanaDatos({
                titulo: "TIPO DE SERVICIO",
                columnas: ["COD", "DESCRIPCION"],
                data: $_this.SAL543.SERVICIOS,
                callback_esc: function () {
                    $(".clase_SAL543").focus();
                },
                callback: function (data) {
                    $_this.form.clasecomp_SAL543 = data.COD
                    _enterInput('.clase_SAL543');
                }
            });
        },
        _f8operadorelab_SAL543() {
            var $_this = this;
            _ventanaDatos({
                titulo: "GRUPOS DE OPERADORES",
                columnas: ["CODIGO", "DESCRIPCION", "ID"],
                data: $_this.SAL543.OPERADOR,
                callback_esc: function () {
                    $(".operadorelab_SAL543").focus();
                },
                callback: function (data) {
                    $_this.form.operadorelab_SAL543 = data.CODIGO.trim();
                    _enterInput(".operadorelab_SAL543");
                },
            });
        },
        _f8operadorrec_SAL543() {
            var $_this = this;
            _ventanaDatos({
                titulo: "GRUPOS DE OPERADORES",
                columnas: ["CODIGO", "DESCRIPCION", "ID"],
                data: $_this.SAL543.OPERADOR,
                callback_esc: function () {
                    $(".operadorrec_SAL543").focus();
                },
                callback: function (data) {
                    $_this.form.operadorrecauda_SAL543 = data.CODIGO.trim();
                    _enterInput(".operadorrec_SAL543");
                },
            });
        }

    }
})

var descuadreMask_SAL543 = IMask($('#reportedesc_SAL543')[0], {
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

var externaMask_SAL543 = IMask($('#incluiraut_SAL543')[0], {
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

var copagoMask_SAL543 = IMask($('#listarcopago_SAL543')[0], {
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

var pacienteMask_SAL543 = IMask($('#mostrarpac_SAL543')[0], {
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

var descuadradoMask_SAL543 = IMask($('#mostrarcomp_SAL543')[0], {
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