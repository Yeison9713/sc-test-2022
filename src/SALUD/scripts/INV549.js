new Vue({
    el:'#INV549',
    data: {
        form:{
            operador_INV549: '',
            operadord_INV549: '',
            entidad_INV549: '',
            entidadd_INV549: '',
            discriminar_INV549: '',
            discriminard_INV549: '',
            grupo_INV549: '',
            grupod_INV549: '',
            fechainicioaño_INV549: '',
            fechainiciomes_INV549: '',
            fechainiciodia_INV549: '',
            fechafinalaño_INV549: '',
            fechafinalmes_INV549: '',
            fechafinaldia_INV549: '',
            discriminarcodigo_INV549: '',
            ordenar_INV549: '',
        },
        INV549:[],
        estado_loader: false,
        progreso: {},
        label_loader: null,
        loader: 1,
    },
    components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
	},
    created(){
        nombreOpcion('9,5,4,1,1,3 - Relación comprobantes por operador')
        _toggleNav()
        _inputControl('disabled')
        this.form.operadord_INV549 = '**** TODOS LOS OPERADORES'
        this.form.entidadd_INV549 = '99 TODAS LAS ENTIDADES'
        this.form.grupod_INV549 = '** TODOS LOS GRUPOS'
        this.form.operador_INV549 = localStorage.Usuario.trim()
        this._evaluaroperador_INV549()
    },
    methods:{
        _evaluaroperador_INV549(){
            validarInputs(
                {
                    form: '#VALIDAR1_INV549',
                    orden: '1'
                },
                _toggleNav,
                () => {
                    if (this.form.operador_INV549 == '****') {
                        this.form.operadord_INV549 = 'TODOS LOS OPERADORES'
                        return this._evaluarentidad_INV549()
                    }

                    postData(
                        {
                          datosh: `${datosEnvio()}${this.form.operador_INV549}|`,
                        },
                        get_url("APP/CONTAB/CON003.DLL")
                    )
                    .then(data => {
                        this.form.operadord_INV549 = data.split("|")[0];
                        this._evaluarentidad_INV549();
                    })
                    .catch(err => {
                        console.error(err);
                        this._evaluaroperador_INV549();
                    });
                }
            )
        },
        _evaluarentidad_INV549(){
            if (this.form.entidad_INV549.trim() == '') this.form.entidad_INV549 = '99'
            validarInputs(
                {
                    form: '#VALIDAR2_INV549',
                    orden: '1'
                },
                this._evaluaroperador_INV549,
                () => {
                    this.form.entidad_INV549 = this.form.entidad_INV549.padStart(10,'0')

                    if (this.form.entidad_INV549 == '0000000099') {
                        this.form.entidadd_INV549 = 'TODAS LOS ENTIDADES'
                        return this._evaluardiscriminarfacturas_INV549()
                    }

                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.entidad_INV549.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                    .then(data => {
                        this.form.entidadd_INV549 = data.TERCER[0].DESCRIP_TER
                        this._evaluardiscriminarfacturas_INV549()
                    })
                    .catch(error => {
                        console.error(error)
                        this._evaluarentidad_INV549()
                    })
                }
            )
        },
        _evaluardiscriminarfacturas_INV549(){
            POPUP({
                array: [
                    {COD:'1', DESCRIPCION:'MOSTRAR COMPROBANTES'},
                    {COD:'2', DESCRIPCION:'MOSTRAR FACTURAS'},
                    {COD:'3', DESCRIPCION:'NO MOSTRAR'}
                ],
                titulo: "DESCRIMINAR FACTURAS",
                indices: [
                    { id: 'COD', label: 'DESCRIPCION' }
                ],
                teclaAlterna: true,
                callback_f: () => setTimeout(this._evaluarentidad_INV549, 300)
            },
                data => {
                    this.form.discriminar_INV549 = data.COD
                    this.form.discriminard_INV549 = data.DESCRIPCION
                    this._evaluargrupo_INV549()
                }
            )
        },
        _evaluargrupo_INV549(){
            if (this.form.grupo_INV549.trim() == '') this.form.grupo_INV549 = '**'
            validarInputs(
                {
                    form: '#VALIDAR4_INV549',
                    orden: '1'
                },
                this._evaluarentidad_INV549,
                () => {
                    if (this.form.grupo_INV549.trim() == '**') {
                        this.form.grupod_INV549 = 'TODOS LOS GRUPOS'
                        return this._evaluarfechainicio_INV549('1')
                    }
                    if (this.form.facturacion_INV549 == '0') {
                        return postData(
                            { 
                                datosh: datosEnvio(), 
                                filtro: this.form.grupo_INV549.trim() 
                            }, 
                            get_url('APP/INVENT/INV804.DLL')
                        )
                        .then((data) => {
                            this.form.grupod_INV549 = data.GRUPOS.DESCRIP
                            this._evaluarfechainicio_INV549('1')
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluargrupo_INV549()
                        })
                    }

                    postData(
                        {
                            datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
                            grupo: `${this.form.grupo_INV549}|`
                        },
                        get_url('app/SALUD/SER801.DLL')
                    )
                    .then((data) => {
                        this.form.grupod_INV549 = data.DESCRIP
                        this._evaluarfechainicio_INV549('1')
                    })
                    .catch((error) => {
                        console.error(error)
                        this._evaluargrupo_INV549()
                    })
                }
            )
        },
        _evaluarfechainicio_INV549(data){
            let fecha = moment().format('YYYYMMDD')
            this.form.fechainicioaño_INV549 = fecha.substring(0,4)
            this.form.fechainiciomes_INV549 = fecha.substring(4,6)
            this.form.fechainiciodia_INV549 = '01'
            validarInputs(
                {
                    form: '#VALIDAR5_INV549',
                    orden: data
                },
                this._evaluargrupo_INV549,
                () => {
                    this.form.fechainicioaño_INV549 = this.form.fechainicioaño_INV549.padStart(4,'0')
                    this.form.fechainiciomes_INV549 = this.form.fechainiciomes_INV549.padStart(2,'0')
                    this.form.fechainiciodia_INV549 = this.form.fechainiciodia_INV549.padStart(2,'0')
                    if (moment(`${this.form.fechainicioaño_INV549}${this.form.fechainiciomes_INV549}${this.form.fechainiciodia_INV549}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarfechainicio_INV549('3')
                    }
                    this._evaluarfechafinal_INV549('1')
                }
            )
        },
        _evaluarfechafinal_INV549(data){
            let fecha = moment().endOf('month').format('YYYYMMDD')
            this.form.fechafinalaño_INV549 = fecha.substring(0,4)
            this.form.fechafinalmes_INV549 = fecha.substring(4,6)
            this.form.fechafinaldia_INV549 = fecha.substring(6,8)
            validarInputs(
                {
                    form: '#VALIDAR6_INV549',
                    orden: data
                },
                () => this._evaluarfechainicio_INV549('3'),
                () => {
                    this.form.fechafinalaño_INV549 = this.form.fechafinalaño_INV549.padStart(4,'0')
                    this.form.fechafinalmes_INV549 = this.form.fechafinalmes_INV549.padStart(2,'0')
                    this.form.fechafinaldia_INV549 = this.form.fechafinaldia_INV549.padStart(2,'0')
                    if (moment(`${this.form.fechafinalaño_INV549}${this.form.fechafinalmes_INV549}${this.form.fechafinaldia_INV549}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarfechafinal_INV549('3')
                    }
                    if (this.form.grupo_INV549.trim() == '**') {
                        this.form.discriminarcodigo_INV549 = 'S'
                        return this._evaluardiscriminarcodigo_INV549()
                    }
                    this.form.discriminarcodigo_INV549 = 'N'
                    this._evaluardiscriminarcodigo_INV549()
                }
            )
        },
        _evaluardiscriminarcodigo_INV549(){
            validarInputs(
                {
                    form: '#VALIDAR7_INV549',
                    orden: '1'
                },
                () => this._evaluarfechafinal_INV549('3'),
                () => {
                    this.form.discriminarcodigo_INV549 = this.form.discriminarcodigo_INV549.toUpperCase()
                    if (this.form.discriminarcodigo_INV549.trim() == 'S' || this.form.discriminarcodigo_INV549.trim() == 'N') {
                        return this._evaluarordenarporentidad_INV549()
                    }

                    CON851('03','03',null,'error','Error')
                    this._evaluardiscriminarcodigo_INV549()
                }
            )
        },
        _evaluarordenarporentidad_INV549() {
            if (this.form.ordenar_INV549.trim() == '') this.form.ordenar_INV549 = 'N'
            validarInputs(
                {
                    form: '#VALIDAR8_INV549',
                    orden: '1'
                },
                this._evaluardiscriminarcodigo_INV549,
                () => {
                    this.form.ordenar_INV549 = this.form.ordenar_INV549.toUpperCase()
                    if (this.form.ordenar_INV549.trim() == 'S' || this.form.ordenar_INV549.trim() == 'N') {
                        return CON851P('04',this._evaluarordenarporentidad_INV549, this._validardatos_INV549)
                    }

                    CON851('03','03',null,'error','Error')
                    return this._evaluarordenarporentidad_INV549()
                }
            )
        },
        _validardatos_INV549(){
            this.estado_loader = true;
            this.label_loader = `Consultando comprobantes desde ${this.form.fechainicioaño_INV549}${this.form.fechainiciomes_INV549}${this.form.fechainiciodia_INV549} hasta ${this.form.fechafinalaño_INV549}${this.form.fechafinalmes_INV549}${this.form.fechafinaldia_INV549}`;
            this.progreso = { transferred: 0, speed: 0 };
            let enviodatos = `${datosEnvio()}${this.form.entidad_INV549.padStart(10,'0')}|${this.form.grupo_INV549}|${this.form.ordenar_INV549}|`
            enviodatos += `${this.form.discriminar_INV549}|${this.form.discriminarcodigo_INV549}|${this.form.operador_INV549}|`
            enviodatos += `${this.form.fechainicioaño_INV549}${this.form.fechainiciomes_INV549}${this.form.fechainiciodia_INV549}|${this.form.fechafinalaño_INV549}${this.form.fechafinalmes_INV549}${this.form.fechafinaldia_INV549}|${localStorage.Usuario.trim()}|`
            postData(
                {
                    datosh: enviodatos,
                },
                get_url('app/SALUD/INV549.DLL'),
                {
                    onProgress: (progress) => {
                        this.progreso = progress
                    }
                }
            )
            .then((data) => {
                data.DATOS.pop()
                this.loader = false;
                this.label_loader = `GENERANDO IMPRESIÓN...`;
                this.progreso.completado = true;
                columnas = [
                {
                    title: "ORDEN SALIDA",
                    value: 'ORDEN_SALID',
                },
                {
                    title: "CLIENTE",
                    value: 'CLIENTE',
                },
                {
                    title: "DESCRIPCION",
                    value: 'DESCRIPCION',
                },
                {
                    title: "CANTIDAD",
                    value: 'CANTIDAD',
                },
                {
                    title: "VALOR CONT",
                    value: 'VALOR_CONT',
                },
                {
                    title: "VALOR CRED",
                    value: 'VALOR_CRED',
                },
                {
                    title: "VALOR HOSP",
                    value: 'VALOR_HOSP',
                },
                {
                    title: "VALOR AMBU",
                    value: 'VALOR_AMBU',
                },
                {
                    title: "VALOR TRAN",
                    value: 'VALOR_TRAN',
                },
                {
                    title: "ARTICULO",
                    value: 'ARTICULO',
                },
                {
                    title: "CLASE",
                    value: 'CLASE',
                },
                {
                    title: "ID PACIENTE",
                    value: 'ID_PACIENTE',
                },
                {
                    title: "DESCRIPCION PACIENTE",
                    value: 'DESCRIPCION_PACIENTE',
                },
                {
                    title: "OPERADOR",
                    value: 'OPERADOR',
                },
                {
                    title: "CUENTA",
                    value: 'CUENTA',
                },
                {
                    title: "NRO COMPROBANTE",
                    value: 'NRO_COMPROBANTE',
                }

                ]
                _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
                    { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
                    { text: `${$_USUA_GLOBAL[0].DIRECC}` + 'TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },
                    `FECHA DESDE: ` + moment(`${this.form.fechainicioaño_INV549}${this.form.fechainiciomes_INV549}${this.form.fechainiciodia_INV549}`).format('MMMM DD YYYY').toUpperCase() + ' FECHA HASTA:' + moment(`${this.form.fechafinalaño_INV549}${this.form.fechafinalmes_INV549}${this.form.fechafinaldia_INV549}`).format('MMMM DD YYYY').toUpperCase(),

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
                    this.estado_loader = false
                    loader("hide");
                    CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
                })
                .catch(() => {
                    loader("hide");
                    CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
                })
            })
            .catch((error) => {
                loader('hide')
                this.loader = false
                this.estado_loader = false
                console.error(error)
                this._evaluarordenarporentidad_INV549()
            })
        },
        _ventanaentidad_INV549(){
            let $_this = this;
            let parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.entidad_INV549 = parseInt(data.COD).toString();
                    _enterInput('.entidad_INV549');
                },
                cancel: () => {
                    $('.entidad_INV549').focus();
                }
            };
            F8LITE(parametros);
        },
        _ventanagrupo_INV549(){
            let $_this = this;
            this.estado_loader = true
            this.label_loader = `Consultando grupos`
            this.progreso = { transferred: 0, speed: 0 }
            postData(
                { datosh: datosEnvio() }, 
                get_url("APP/SALUD/SER801.DLL"),
                {
                    onProgress: (progress) => {
                        this.progreso = progress
                    }
                }
            )
            .then((data) => {
                this.loader = false
                this.estado_loader = true
                data.CODIGOS.pop();
                _ventanaDatos({
                    titulo: 'VENTANA DE GRUPOS',
                    columnas: ["COD", "DESCRIP"],
                    data: data.CODIGOS,
                    callback_esc: function () {
                        $('.grupo_INV549').focus();
                    },
                    callback: function (data) {
                        $_this.estado_loader = false
                        $_this.form.grupo_INV549 = data.COD.trim()
                        _enterInput('.grupo_INV549');
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                $('.grupo_INV549').focus();
            });
        },
        _ventanaoperador_INV549(){
            let $_this = this;
            this.estado_loader = true
            this.label_loader = `Consultando operadores`
            this.progreso = { transferred: 0, speed: 0 }
            postData(
                { datosh: datosEnvio() }, 
                get_url("APP/CONTAB/CON982.DLL"),
                {
                    onProgress: (progress) => {
                        this.progreso = progress
                    }
                }
            )
            .then((data) => {
                this.loader = false
                this.estado_loader = true
                data.ARCHREST.pop();
                _ventanaDatos({
                    titulo: 'VENTANA DE OPERADORES',
                    columnas: ["CODIGO", "DESCRIPCION"],
                    data: data.ARCHREST,
                    callback_esc: function () {
                        $('.operador_INV549').focus();
                    },
                    callback: function (data) {
                        $_this.estado_loader = false
                        $_this.form.operador_INV549 = data.CODIGO.trim()
                        _enterInput('.operador_INV549');
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                $('.operador_INV549').focus();
            });
        }
    }
})