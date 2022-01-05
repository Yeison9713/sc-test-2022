// 26/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#SAL211A",
    data: {
        SAL211A: [],
        form: {
            articulo1_SAL211A: "",
            articulo2_SAL211A: "",
            descriparticulo2_SAL211A: "",
            mesproceso_SAL211A: ""
        },
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        $_this = this;
        $_this.SAL211A.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SAL211A.LLAVENROART = '';
        $_this.SAL211A.LLAVENROART2 = '';
        $_this.SAL211A.LLAVENROART1 = '';
        obtenerDatosCompletos({
            nombreFd: 'ARTICULOS',
            filtro: "|" + localStorage.Usuario
        }, function (data) {
            $_this.SAL211A.ARTICULOS = data.ARTICULOS
            $_this.SAL211A.ARTICULOS.pop()
            loader("hide");
            $_this._leerusuario_SAL211A()
        });
    },
    methods: {
        _leerusuario_SAL211A() {
            OPCIONES = new Object;
            OPCIONES = {
                '092B': this._evaluararticulo1_SAL211A,
                '092C': this._evaluararticulo1_SAL211A,
            }
            let active = $('#navegacion').find('li.opcion-menu.active');
            this.SAL211A.OPCIONACTIVA = active[0].attributes[2].nodeValue;
            let Nombreopcion = {
                '092B': '9,2,B - Traslado articulos almacen SIN99',
                '092C': '9,2,C - Traslado articulos almacen DR001',
            }
            nombreOpcion(Nombreopcion[this.SAL211A.OPCIONACTIVA]);
            let opcion = new Function();
            opcion = OPCIONES[active[0].attributes[2].nodeValue];
            opcion();
        },
        _evaluararticulo1_SAL211A() {
            this.form.articulo1_SAL211A = ""
            this.form.articulo2_SAL211A = ""
            this.form.descriparticulo2_SAL211A = ""
            this.form.mesproceso_SAL211A = ""
            validarInputs({
                form: '#ART1_SAL211A',
                orden: "1"
            },
                () => { _toggleNav() },
                () => {
                    this.form.articulo1_SAL211A = this.form.articulo1_SAL211A.padEnd(15, ' ').toUpperCase()
                    if (this.SAL211A.LLAVENROART1.trim() != '') this.form.articulo1_SAL211A = this.SAL211A.LLAVENROART1
                    if (this.form.articulo1_SAL211A.trim() == '') {
                        this._evaluararticulo1_SAL211A()
                    } else {
                        this._evaluararticulo2_SAL211A()
                    }
                }
            )
        },
        _evaluararticulo2_SAL211A() {
            validarInputs({
                form: '#ART2_SAL211A',
                orden: "1"
            },
                () => { this._evaluararticulo1_SAL211A() },
                () => {
                    this.form.articulo2_SAL211A = this.form.articulo2_SAL211A.padEnd(15, ' ').toUpperCase()
                    if (this.SAL211A.LLAVENROART.trim() != '') this.form.articulo2_SAL211A = this.SAL211A.LLAVENROART
                    if (this.form.articulo2_SAL211A.trim() == '') {
                        this._evaluararticulo2_SAL211A()
                    } else {
                        this.SAL211A.LLAVENROART2 = `0${this.form.articulo2_SAL211A}`
                        postData({ datosh: datosEnvio() + this.SAL211A.LLAVENROART2 + "||" }, get_url("APP/INVENT/INV803-01.DLL"))
                            .then(data => {
                                this.SAL211A.FACTURACION = data.ARTICULOS[0];
                                this.form.descriparticulo2_SAL211A = this.SAL211A.FACTURACION.DESCRIP_ART.trim()
                                this._evaluarmes_SAL211A()


                            })
                            .catch(error => {
                                console.error(error)
                                this._evaluararticulo2_SAL211A()
                            });

                    }
                }
            )
        },
        _evaluarmes_SAL211A() {
            if(this.form.mesproceso_SAL211A.trim() == '') this.form.mesproceso_SAL211A = $_USUA_GLOBAL[0].FECHALNK.substring(2,4)
            validarInputs({
                form: '#MES1_SAL211A',
                orden: "1"
            },
                () => { this._evaluararticulo2_SAL211A() },
                () => {
                    this.form.mesproceso_SAL211A = this.form.mesproceso_SAL211A.padStart(2, '0')
                    if (this.form.mesproceso_SAL211A > 0 || this.form.mesproceso_SAL211A < 13) {
                        CON851P("01", this._evaluarmes_SAL211A, this._traslados_SAL211A)
                    } else {
                        this._evaluarmes_SAL211A()
                    }
                }
            )
        },
        _traslados_SAL211A() {
            loader('show')
            if (this.SAL211A.OPCIONACTIVA == '092B') {
                postData({ datosh: datosEnvio() + this.form.articulo1_SAL211A + '|' + this.form.articulo2_SAL211A + '|' + this.form.mesproceso_SAL211A + '|' + `${'20'+$_USUA_GLOBAL[0].FECHALNK}` + '|'}, get_url("APP/SALUD/ARRE-ARTICULOAOTRO2.DLL"))
                    .then(data => {
                        loader('hide')
                        this.SAL211A.LISTADO = data.DATOS;
                        this._impresionlistado_SAL211A()
                    })
                    .catch(error => {
                        console.error(error)
                        loader('hide')
                        this._evaluararticulo2_SAL211A()
                    });
            } else {
                postData({ datosh: datosEnvio() + this.form.articulo1_SAL211A + '|' + this.form.articulo2_SAL211A + '|' + this.form.mesproceso_SAL211A + '|' + `${'20'+$_USUA_GLOBAL[0].FECHALNK}` + '|'}, get_url("APP/SALUD/ARRE-ARTICULOAOTRO.DLL"))
                    .then(data => {
                        loader('hide')
                        this.SAL211A.LISTADO = data.DATOS;
                        this._impresionlistado_SAL211A()
                    })
                    .catch(error => {
                        console.error(error)
                        loader('hide')
                        this._evaluararticulo2_SAL211A()
                    });
            }
        },
        _impresionlistado_SAL211A() {
            loader('show')
            if (this.SAL211A.LISTADO[0].COMPROBANTE.trim() != '') {
                columnas = [
                    {
                        title: "COMPROBANTE",
                        value: 'COMPROBANTE',
                        format: 'string'
                    },
                    {
                        title: "ARTICULO ANTERIOR",
                        value: 'ARTICULO_ANT',
                        format: 'string'
                    },
                    {
                        title: "ARTICULO NUEVO",
                        value: 'ARTICULO',
                        format: 'string'
                    }
                ]
                _impresion2({
                    tipo: 'excel',
                    header: [
                        { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 14 },
                        ``,
                    ],
                    logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                    ruta_logo: 'P:\\PROG\\LOGOS\\',
                    tabla: {
                        columnas,
                        data: this.SAL211A.LISTADO
                    },
                    archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                    scale: 65,
                    orientation: 'landscape'
                })
                    .then(() => {
                        loader('hide')
                        CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                        _toggleNav();
                    })
                    .catch(() => {
                        CON851('', 'Hubo un error en la impresión', null, 'error', 'Error')
                        loader('hide')
                        this._evaluararticulo1_SAL211A()
                    })
            } else {
                CON851('', 'Articulo no tiene movimiento en los comprobantes', null, 'success', 'Exito')
                loader('hide')
                _toggleNav();
            }

        },
        _f8articulos1_SAL211A() {
            // loader('show')
            // let URL = get_url("APP/INVENT/INV803.DLL");
            // postData({
            //     datosh: datosEnvio() + " |" + localStorage['Usuario'] + "|"
            // }, URL)
            //     .then((data) => {
            //         loader("hide");
            //         $_this.SAL211A.ARTICULOS = data.ARTICULOS;
            //         $_this.SAL211A.ARTICULOS.pop()
            //         _ventanaDatos({
            //             titulo: 'BUSQUEDA DE ARTICULOS',
            //             columnas: ["LLAVE_ART", "DESCRIP_ART"],
            //             data: $_this.SAL211A.ARTICULOS,
            //             callback_esc: function () {
            //                 $('.numeroart1_SAL211A').focus();
            //             },
            //             callback: function (data) {
            //                 $_this.SAL211A.LLAVENROART1 = data.LLAVE_ART.substring(1, 18)
            //                 _enterInput('.numeroart1_SAL211A');
            //             }
            //         });
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     });
            _ventanaDatos({
                titulo: 'BUSQUEDA DE ARTICULOS',
                columnas: ["LLAVE_ART", "DESCRIP_ART"],
                data: $_this.SAL211A.ARTICULOS,
                callback_esc: function () {
                    $('.numeroart1_SAL211A').focus();
                },
                callback: function (data) {
                    $_this.SAL211A.LLAVENROART1 = data.LLAVE_ART.substring(1, 18)
                    _enterInput('.numeroart1_SAL211A');
                }
            });

        },
        _f8articulos2_SAL211A() {
            _ventanaDatos({
                titulo: 'BUSQUEDA DE ARTICULOS',
                columnas: ["LLAVE_ART", "DESCRIP_ART"],
                data: $_this.SAL211A.ARTICULOS,
                callback_esc: function () {
                    $('.numeroart2_SAL211A').focus();
                },
                callback: function (data) {
                    $_this.SAL211A.LLAVENROART = data.LLAVE_ART.substring(1, 18)
                    _enterInput('.numeroart2_SAL211A');
                }
            });
        }
    },
});










