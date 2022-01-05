new Vue({
    el: '#SER120',
    data: {
        SER120: [],
        form: {
            formato_SER120: '',
            swarch_SER120: '',
            directorio1_SER120: '',
            directorio2_SER120: '',
            directorio3_SER120: '',
            paciente_SER120: '',
            descripentid_SER120: '',
            discriminar_SER120: '',
            valores_SER120: '',
            anoini_SER120: '',
            mesini_SER120: '',
            diaini_SER120: '',
            anofin_SER120: '',
            mesfin_SER120: '',
            diafin_SER120: '',
        },
        TABLAIMPRESION: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        this._validarformato_SER120();
    },
    methods: {
        _validarformato_SER120() {
            let formatos = [
                { CODIGO: '1', DESCRIPCION: 'FORMATO REPORTE DE COMPROBANTE' },
                { CODIGO: '2', DESCRIPCION: 'FORMATO REPORTE PARA FIRMAS' },
                { CODIGO: '3', DESCRIPCION: 'FORMATO COMPROBANTE DE SERV.' },
            ]

            POPUP({
                array: formatos,
                titulo: "TIPO DE FORMATO",
                indices: [
                    { id: 'CODIGO', label: 'DESCRIPCION' }
                ],
                seleccion: '1',
                callback_f: _toggleNav
            },
                formatos => {
                    this.SER120.FORMATOW = formatos.CODIGO;
                    this.form.formato_SER120 = formatos.DESCRIPCION;
                    this._evaluarswarch_SER120();
                });
        },
        _evaluarswarch_SER120() {
            var archivos = [
                { COD: "1", DESCRIP: "Segun facturacion" },
                { COD: "2", DESCRIP: "Segun solicitud servicios" },
            ];
            POPUP(
                {
                    array: archivos,
                    titulo: "Seleccion",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    callback_f: () => {
                        setTimeout(this._validarformato_SER120, 300);
                    },
                },
                archivos => {
                    this.form.swarch_SER120 = archivos.COD + " - " + archivos.DESCRIP;
                    this._evaluarperiodos_SER120()
                },
            );
        },
        _evaluarperiodos_SER120() {
            if (this.form.directorio1_SER120.trim() == '') this.form.directorio1_SER120 = "\\" + $_USUA_GLOBAL[0].DIRECC_USU
            validarInputs(
                {
                    form: "#VALIDAR2_SER120",
                    orden: "1"
                },
                () => { setTimeout(this._evaluarswarch_SER120, 300) },
                () => {
                    this.form.directorio1_SER120 = this.form.directorio1_SER120.toUpperCase();
                    if (this.form.directorio1_SER120.trim() == '') {
                        CON851("02", "02", this._evaluarperiodos_SER120(), "error", "error");
                    } else {
                        this._buscarfactura_SER120(this._evaluarperiodos2_SER120, this._evaluarperiodos1_SER120, params = { RUTA: `${this.form.directorio1_SER120.substring(1, 20)}` })
                    }
                }
            )
        },
        _evaluarperiodos2_SER120() {
            validarInputs(
                {
                    form: "#VALIDAR3_SER120",
                    orden: "1"
                }, this._evaluarperiodos_SER120,
                () => {
                    this.form.directorio2_SER120 = this.form.directorio2_SER120.toUpperCase();
                    if (this.form.directorio2_SER120 == this.form.directorio1_SER120 || this.form.directorio2_SER120.trim() == '') {
                        this.form.directorio2_SER120 = ''
                        this._evaluarperiodos3_SER120()
                    } else {
                        this._buscarfactura_SER120(this._evaluarperiodos3_SER120, this._evaluarperiodos2_SER120, params = { RUTA: `${this.form.directorio2_SER120.substring(1, 20)}` })
                    }
                }
            )
        },
        _evaluarperiodos3_SER120() {
            validarInputs(
                {
                    form: "#VALIDAR4_SER120",
                    orden: "1"
                }, this._evaluarperiodos2_SER120,
                () => {
                    this.form.directorio3_SER120 = this.form.directorio3_SER120.toUpperCase();
                    if (this.form.directorio3_SER120 == this.form.directorio1_SER120 || this.form.directorio3_SER120 == this.form.directorio2_SER120 || this.form.directorio3_SER120.trim() == '') {
                        this.form.directorio3_SER120 = ''
                        this._evaluarpaciente_SER120()
                    } else {
                        this._buscarfactura_SER120(this._evaluarpaciente_SER120, this._evaluarperiodos3_SER120, params = { RUTA: `${this.form.directorio3_SER120.substring(1, 20)}` })
                    }
                }
            )
        },
        _buscarfactura_SER120(callback, back, params) {
            console.log(callback, back, params)
            let URL = get_url("APP/SALUD/SER120.DLL");
            postData({
                datosh: datosEnvio() + "1|||" + params.RUTA + '|',
            }, URL)
                .then(data => {
                    console.log(data)
                    callback(data);
                })
                .catch(error => {
                    console.error(error)
                    back();
                });
        },
        _evaluarpaciente_SER120() {
            validarInputs(
                {
                    form: "#VALIDAR5_SER120",
                    orden: "1"
                }, () => {
                    this._evaluarperiodos2_SER120("2")
                },
                () => {
                    this.form.paciente_SER120 = this.form.paciente_SER120.padStart(15, '0')
                    if (this.form.paciente_SER120 == 0) {
                        CON851("01", "01", this._evaluarpaciente_SER120(), "error", "error");
                    } else {
                        let URL = get_url("APP/SALUD/SER810-1.DLL");
                        postData({
                            datosh: datosEnvio() + this.form.paciente_SER120 + "|",
                        }, URL)
                            .then(data => {
                                this.SER120.PACIENTE = data["REG-PACI"];
                                this.form.descripentid_SER120 = this.SER120.PACIENTE[0]["DESCRIP"].trim();
                                this._evaluardiscriminacion_SER120()
                            })
                            .catch(error => {
                                console.error(error)
                                this._evaluarpaciente_SER120()
                            });
                    }
                }
            )
        },
        _evaluardiscriminacion_SER120() {
            if (this.form.discriminar_SER120.trim() == '') this.form.discriminar_SER120 = 'N'
            validarInputs(
                {
                    form: "#VALIDAR6_SER120",
                    orden: "1"
                }, this._evaluarpaciente_SER120,
                () => {
                    this.form.discriminar_SER120 = this.form.discriminar_SER120.toUpperCase();
                    if (this.form.discriminar_SER120 == 'S' || this.form.discriminar_SER120 == 'N') {
                        this._mostrarceroz_SER120()
                    } else {
                        CON851("03", "03", this._evaluardiscriminacion_SER120(), "error", "error");
                    }
                }
            )
        },
        _mostrarceroz_SER120() {
            if (this.form.valores_SER120.trim() == '') this.form.valores_SER120 = 'N'
            validarInputs(
                {
                    form: "#VALIDAR7_SER120",
                    orden: "1"
                }, this._evaluardiscriminacion_SER120,
                () => {
                    this.form.valores_SER120 = this.form.valores_SER120.toUpperCase();
                    if (this.form.valores_SER120 == 'S' || this.form.valores_SER120 == 'N') {
                        if (this.SER120.FORMATOW == '2' || this.SER120.FORMATOW == '3') {
                            this._evaluarfechaini_SER120('1')
                        } else {
                            this.SER120.FECHAINIW = "00000000"
                            this.SER120.FECHAFINW = "99999999"
                            this._consultardll_SER120()
                        }
                    } else {
                        CON851("03", "03", this._mostrarceroz_SER120(), "error", "error");
                    }
                }
            )
        },
        _evaluarfechaini_SER120(orden) {
            this.form.anoini_SER120 = 20 + this.SER120.ANO_LNK
            this.form.mesini_SER120 = this.SER120.MES_LNK
            this.form.diaini_SER120 = '01'
            validarInputs(
                {
                    form: "#fechaInicial_SER120",
                    orden: orden
                }, this._mostrarceroz_SER120,
                () => {
                    if (this.form.anoini_SER120.trim() == '') {
                        CON851('', 'Año incorrecto! ', null, 'error', 'error');
                        this._evaluarfechaini_SER120('1');
                    } else {
                        if (this.form.mesini_SER120.trim() == '' || this.form.mesini_SER120 < 01 || this.form.mesini_SER120 > 12) {
                            CON851('', 'Mes incorrecto! ', null, 'error', 'error');
                            this._evaluarfechaini_SER120('2');
                        } else {
                            if (this.form.diaini_SER120.trim() == '' || this.form.diaini_SER120 < 01 || this.form.diaini_SER120 > 31) {
                                CON851('', 'dia incorrecto! ', this._evaluarfechaini_SER120('3'), 'error', 'error');
                            } else {
                                this._evaluarfechafin_SER120('1')
                            }
                        }
                    }
                }
            )
        },
        _evaluarfechafin_SER120(orden) {
            this.form.anofin_SER120 = 20 + this.SER120.ANO_LNK
            this.form.mesfin_SER120 = this.SER120.MES_LNK
            this.form.diafin_SER120 = this.SER120.DIA_LNK
            validarInputs(
                {
                    form: "#fechaFinal_SER120",
                    orden: orden
                },
                () => { this._evaluarfechaini_SER120('3') },
                () => {
                    if (this.form.anofin_SER120.trim() == '') {
                        CON851('', 'Año incorrecto! ', null, 'error', 'error');
                        this._evaluarfechafin_SER120('1');
                    } else {
                        if (this.form.mesfin_SER120.trim() == '' || this.form.mesfin_SER120 < 01 || this.form.mesfin_SER120 > 12) {
                            CON851('', 'Mes incorrecto! ', null, 'error', 'error');
                            this._evaluarfechafin_SER120('2');
                        } else {
                            if (this.form.diafin_SER120.trim() == '' || this.form.diafin_SER120 < 01 || this.form.diafin_SER120 > 31) {
                                CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER120('3'), 'error', 'error');
                            } else {
                                this.SER120.FECHAFINW = this.form.anofin_SER120 + this.form.mesfin_SER120 + this.form.diafin_SER120
                                if (this.SER120.FECHAFINW < this.SER120.FECHAINIW) {
                                    CON851('37', '37', this._evaluarfechafin_SER120('3'), 'error', 'error');
                                } else {
                                    this._consultardll_SER120()
                                }
                            }
                        }
                    }
                }
            )
        },
        _consultardll_SER120() {
            console.log('CONSULTA DLL')
            let URL = get_url("APP/SALUD/SER120.DLL");
            postData({
                datosh: datosEnvio() + '2|' + this.SER120.FORMATOW + "|" + this.form.swarch_SER120.substring(0, 1) + '| |' + this.form.directorio1_SER120.substring(1, 20) + '|' + this.form.directorio2_SER120.substring(1, 20) + '|' + this.form.directorio3_SER120.substring(1, 20) + '|' + this.form.paciente_SER120 + '|' + this.form.discriminar_SER120 + '|' + this.SER120.FECHAINIW + '|' + this.SER120.FECHAFINW + '|' + localStorage.getItem('Usuario') + '|' + this.form.valores_SER120 + '|',
            }, URL)
                .then(data => {
                    console.log(data)
                    this.SER120.LISTADO = data.LISTADO
                    this.SER120.LISTADO.pop()
                    if (this.form.discriminar_SER120 == 'S') {
                        for (i in this.SER120.LISTADO) {
                            for (y in this.SER120.LISTADO[i].TABLA_FACT) {
                                if (this.SER120.LISTADO[i].TABLA_FACT[y].CONCEPTO.trim() != '') {
                                    console.log(y, 'contador de y')
                                    if (y == 0) {
                                        this.SER120.LISTADO[i].TABLA_FACT[y].EMPRESA = this.SER120.LISTADO[i].EMPRESA
                                        this.SER120.LISTADO[i].TABLA_FACT[y].COMPROBANTE = this.SER120.LISTADO[i].LLAVE
                                        this.SER120.LISTADO[i].TABLA_FACT[y].FACTURA = this.SER120.LISTADO[i].CTA
                                        this.SER120.LISTADO[i].TABLA_FACT[y].FECHA = this.SER120.LISTADO[i].FECHA
                                        this.SER120.LISTADO[i].TABLA_FACT[y].COPAGO = this.SER120.LISTADO[i].COPAGO
                                        this.SER120.LISTADO[i].TABLA_FACT[y].COSTO = this.SER120.LISTADO[i].COSTO
                                        this.SER120.LISTADO[i].TABLA_FACT[y].OPER = this.SER120.LISTADO[i].OPER
                                        this.SER120.LISTADO[i].TABLA_FACT[y].FECHASER = this.SER120.LISTADO[i].FECHASER
                                    } else {
                                        this.SER120.LISTADO[i].TABLA_FACT[y].EMPRESA = "        "
                                        this.SER120.LISTADO[i].TABLA_FACT[y].COMPROBANTE = "        "
                                        this.SER120.LISTADO[i].TABLA_FACT[y].FACTURA = "        "
                                        this.SER120.LISTADO[i].TABLA_FACT[y].FECHA = "        "
                                        this.SER120.LISTADO[i].TABLA_FACT[y].COPAGO = "        "
                                        this.SER120.LISTADO[i].TABLA_FACT[y].COSTO = "        "
                                        this.SER120.LISTADO[i].TABLA_FACT[y].OPER = "        "
                                        this.SER120.LISTADO[i].TABLA_FACT[y].FECHASER = "        "
                                    }
                                }
                                console.log(this.SER120.LISTADO[i].TABLA_FACT[y], 'TABLA FACT')
                            }
                            this.SER120.LISTADO[i].TABLA_FACT.pop()
                            this.TABLAIMPRESION = this.TABLAIMPRESION.concat(this.SER120.LISTADO[i].TABLA_FACT);
                        }
                        console.log(this.TABLAIMPRESION)
                        columnas = [
                            {
                                title: "Entidad",
                                value: 'EMPRESA',

                            },
                            {
                                title: "Comprobante",
                                value: 'COMPROBANTE',
                                format: 'string'
                            },
                            {
                                title: "Factura",
                                value: 'FACTURA',
                            },
                            {
                                title: "Fecha",
                                value: 'FECHA',
                                format: 'fecha'
                            },
                            {
                                title: "Concepto",
                                value: 'CONCEPTO',
                            },
                            {
                                title: "Valor",
                                value: 'VLR_FACT',
                                format: 'money',
                                totalsRowFunction: 'sum'
                            },
                            {
                                title: "Copagos",
                                value: 'COPAGO',
                                format: 'money',
                            },
                            {
                                title: "Costo",
                                value: 'COSTO',
                                format: 'string'
                            },
                            {
                                title: "Oper",
                                value: 'OPER',
                            },
                            {
                                title: "F. ser",
                                value: 'FECHASER',
                                format: 'fecha'
                            },

                        ]
                        _impresion2({
                            tipo: 'excel',
                            header: [
                                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                                `PACIENTE: ${this.SER120.LISTADO[0].NOMBRE} IDENTIFICACION: ${this.SER120.LISTADO[0].ID}`,
                                ``,
                                ``,
                            ],
                            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                            ruta_logo: 'P:\\PROG\\LOGOS\\',
                            tabla: {
                                columnas,
                                data: this.TABLAIMPRESION,
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
                                CON851('', 'Hubo un error en la impresión', this._evaluardiscriminacion_SER120(), 'error', 'Error')
                            })

                    } else {

                        for (i in this.SER120.LISTADO) {
                            console.log(this.SER120.LISTADO[i].TABLA_FACT, 'TABLA')
                            console.log(this.SER120.LISTADO[i].TABLA_FACT[0].CONCEPTO)
                            this.SER120.LISTADO[i].CONCEPTO = this.SER120.LISTADO[i].TABLA_FACT[0].CONCEPTO
                            console.log(this.SER120.LISTADO[i], 'LISTADO')
                        }
                        console.log('NANANA')
                        columnas = [
                            {
                                title: "Entidad",
                                value: 'EMPRESA',

                            },
                            {
                                title: "Comprobante",
                                value: 'LLAVE',
                                format: 'string'
                            },
                            {
                                title: "Factura",
                                value: 'CTA',
                            },
                            {
                                title: "Fecha",
                                value: 'FECHA',
                                format: 'fecha'
                            },
                            {
                                title: "Concepto",
                                value: 'CONCEPTO',
                            },
                            {
                                title: "Valor",
                                value: 'VALOR',
                                format: 'money',
                                totalsRowFunction: 'sum'
                            },
                            {
                                title: "Copagos",
                                value: 'COPAGO',
                                format: 'money',
                            },
                            {
                                title: "Costo",
                                value: 'COSTO',
                                format: 'string'
                            },
                            {
                                title: "Oper",
                                value: 'OPER',
                            },
                            {
                                title: "F. ser",
                                value: 'FECHASER',
                                format: 'fecha'
                            },

                        ]
                        _impresion2({
                            tipo: 'excel',
                            header: [
                                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                                `PACIENTE: ${this.SER120.LISTADO[0].NOMBRE} IDENTIFICACION: ${this.SER120.LISTADO[0].ID}`,
                                ``,
                                ``,
                            ],
                            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                            ruta_logo: 'P:\\PROG\\LOGOS\\',
                            tabla: {
                                columnas,
                                data: this.SER120.LISTADO,
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
                                CON851('', 'Hubo un error en la impresión', this._evaluardiscriminacion_SER120(), 'error', 'Error')
                            })
                    }
                })
                .catch(error => {
                    console.error(error)
                    this._evaluardiscriminacion_SER120()
                });
        },
        _f8paciente_SER120() {
            $_this = this
            parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                columnas: [{
                    title: 'COD'
                }, {
                    title: 'NOMBRE'
                }, {
                    title: 'EPS'
                }],
                callback: (data) => {
                    $_this.form.paciente_SER120 = data.COD;
                    _enterInput('.paciente_SER120');
                },
                cancel: () => {
                    _enterInput('.paciente_SER120');
                }
            };
            F8LITE(parametros);
        }
    }
})