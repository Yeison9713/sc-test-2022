new Vue({
    el:'#SAL543K',
    data: {
        form: {
            nit_SAL543K: '',
            nitd_SAL543K: '',
            hospitalizacion_SAL543K: ''
        },
        SAL543K:[]
    },
    created() {
        this.form.nitd_SAL543K = '99 PARA PROCESAR TODOS LOS NIT'
        _toggleNav()
        _inputControl("disabled")
        nombreOpcion("9,5,4,1,6,6 - Comparativo Facturación/Contabilidad")
        this._evaluarnit_SAL543K()
    },
    methods: {
        _evaluarnit_SAL543K(){
            validarInputs(
                {
                  form: "#VALIDAR1_SAL543K",
                  orden: '1'
                },
                _toggleNav,
                () => {
                    if (isNaN(this.form.nit_SAL543K) || this.form.nit_SAL543K.trim() == '' || parseInt(this.form.nit_SAL543K) == 0) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarnit_SAL543K()
                    }

                    this.form.nit_SAL543K = this.form.nit_SAL543K.padStart(10,'0')
                    if (this.form.nit_SAL543K == '0000000099'){
                        return this._evaluarhospitalizacion_SAL543K()
                    }
                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.nit_SAL543K.padStart(10, '0')}|8|`,
                        }, 
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                    .then(data => {
                        this.form.nitd_SAL543K = data.TERCER[0].DESCRIP_TER
                        postData(
                            {
                                datosh: datosEnvio(),
                                PASO: '1',
                                NIT: this.form.nit_SAL543K
                            }, 
                            get_url("APP/SALUD/SAL543K.DLL")
                        )
                        .then(data => {
                            this._evaluarhospitalizacion_SAL543K()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluarnit_SAL543K()
                        })
                    })
                    .catch(error => {
                        console.error(error)
                        this._evaluarnit_SAL543K()
                    })
                }
              )
        },
        _evaluarhospitalizacion_SAL543K(){
            validarInputs(
                {
                  form: "#VALIDAR2_SAL543K",
                  orden: '1'
                },
                this._evaluarnit_SAL543K,
                () => {
                    this.form.hospitalizacion_SAL543K = this.form.hospitalizacion_SAL543K.toUpperCase()

                    if (this.form.nit_SAL543K.trim() == '') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhospitalizacion_SAL543K()
                    }

                    if (this.form.hospitalizacion_SAL543K.trim() != 'S' && this.form.hospitalizacion_SAL543K.trim() != 'N') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhospitalizacion_SAL543K()
                    }

                    setTimeout(() => CON851P('04', this._evaluarhospitalizacion_SAL543K, this._consultarcontabilidad_SAL543K), 300)
                }
              )
        },
        _consultarcontabilidad_SAL543K(){
            loader('show')
            postData(
                {
                    datosh: datosEnvio(),
                    PASO: '2',
                    NIT: this.form.nit_SAL543K,
                    TEMPORAL: `C:\\PROSOFT\\TEMP\\${localStorage.Usuario}${moment().format('YYYYMMDDHHmmss')}`,
                    HOSPITALIZACION: this.form.hospitalizacion_SAL543K
                }, 
                get_url("APP/SALUD/SAL543K.DLL")
            )
            .then(data => {
                console.log(data)
                loader('hide')
                data.DATOS.pop()
                columnas = [
                {
                    title: "FACTURA",
                    value: 'FACTURA',
                },
                {
                    title: "NIT",
                    value: 'NIT',
                },
                {
                    title: "CLIENTE",
                    value: 'CLIENTE',
                },{
                    title: "VALOR CONTABILIDAD",
                    value: 'VALOR_CONTABILIDAD',
                },
                {
                    title: "VALOR FACTURACION",
                    value: 'VALOR_FACTURACION',
                },
                {
                    title: "DIFERENCIA",
                    value: 'DIFERENCIA',
                },
                {
                    title: "ESTADO FACTURA",
                    value: 'ESTADO_FACTURA',
                },
                {
                    title: "COMPROBANTE",
                    value: 'COMPROBANTE',
                },
                {
                    title: "ABONO",
                    value: 'SECUENCIA',
                },
                {
                    title: "TIPO FACTURA",
                    value: 'TIPO_FACTURA',
                },
                {
                    title: "FECHA INGRESO",
                    value: 'FECHA_INGRESO',
                },
                {
                    title: "FECHA RETIRO",
                    value: 'FECHA_RETIRO',
                }

                ]
                _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
                    { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
                    { text: `${$_USUA_GLOBAL[0].DIRECC}` + 'TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },
                    `FECHA: ` + moment().format('MMMM DD YYYY').toUpperCase(),
                ],
                // footer:[
                //   `TOTAL FACTURA: ` + this.SER109H.VLRTOTAL,
                //   `SALDO: ` + this.SER109H.SALDO,
                // ],
                logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
                tabla: {
                    columnas,
                    data: data.DATOS,
                },
                archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                scale: 65,
                orientation: 'landscape'
                })
                .then(() => {
                    loader("hide");
                    CON851('', 'Impreso Correctamente', null, 'success', 'Exito')
                    _toggleNav()
                })
                .catch(() => {
                    loader("hide");
                    CON851('', 'Hubo un error en la impresión', null, 'error', 'Error')
                    _toggleNav()
                })
            })
            .catch(error => {
                console.error(error)
                this._evaluarhospitalizacion_SAL543K()
            })
        },
        _ventanaClientes_SAL543K() {
            let $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.nit_SAL543K = data.COD
                    _enterInput('.nit_SAL543K')
                },
                cancel: () => {
                    $('.nit_SAL543K').focus()
                }
            }
            F8LITE(parametros)
        },
    }
})