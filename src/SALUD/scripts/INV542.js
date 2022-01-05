new Vue({
    el:'#INV542',
    data: {
        form:{
            formatoimpresion_INV542: '',
            formatoimpresiond_INV542: '',
            claseservicio_INV542: '',
            claseserviciod_INV542: '',
            entidad_INV542: '',
            entidadd_INV542: '',
            valorencero_INV542: '',
            sucursal_INV542: ''
        },
        INV542:[],
        estado_loader: false,
        progreso: {},
        label_loader: null,
        loader: 1,
    },
    components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
	},
    created(){
        nombreOpcion('9,5,4,1,4 - Relación comprobantes cliente pago')
        _toggleNav()
        _inputControl('disabled')
        loader('show')
        this.form.entidadd_INV542 = 'ENTIDAD'
        this.form.claseserviciod_INV542 = 'CLASE DE SERVICIO'
        this.form.formatoimpresiond_INV542 = 'FORMATO'
        obtenerDatosCompletos({ nombreFd: 'SERVICIOS' }, data => {
            loader('hide')
            this.INV542.FORMAPAGO = data.SERVICIOS
            this._validarformatoimpresion_INV542()
        })
    },
    methods:{
        _validarformatoimpresion_INV542(){
            POPUP(
                {
                    array: [
                        {COD:'1', DESCRIPCION:'CSV'},
                        {COD:'2', DESCRIPCION:'PDF'},
                    ],
                    titulo: "FORMATO DE IMPRESION",
                    indices: [
                        { id: 'COD', label: 'DESCRIPCION' }
                    ],
                    teclaAlterna: true,
                    callback_f: _toggleNav
                },
                data => {
                    this.form.formatoimpresion_INV542 = data.COD
                    this.form.formatoimpresiond_INV542 = data.DESCRIPCION
                    setTimeout(this._validartiposdeservicio_INV542, 300)
                }
            )
        },
        _validartiposdeservicio_INV542(){
            POPUP(
                {
                    array: this.INV542.FORMAPAGO,
                    titulo: "TIPOS DE SERVICIO",
                    indices: [
                        { id: 'COD', label: 'DESCRIPCION' }
                    ],
                    teclaAlterna: true,
                    callback_f: () => setTimeout(this._validarformatoimpresion_INV542, 300)
                },
                data => {
                    this.form.claseservicio_INV542 = data.COD
                    this.form.claseserviciod_INV542 = data.DESCRIPCION
                    this._evaluarentidad_INV542()
                }
            )
        },
        _evaluarentidad_INV542(){
            validarInputs(
                {
                    form: '#VALIDAR1_INV542',
                    orden: '1'
                },
                () => setTimeout(this._validartiposdeservicio_INV542, 300),
                () => {
                    this.form.entidad_INV542 = this.form.entidad_INV542.padStart(10,'0')

                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.entidad_INV542.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                    .then(data => {
                        this.form.entidadd_INV542 = data.TERCER[0].DESCRIP_TER
                        CON851P('04',this._evaluarentidad_INV542, this._validardatos_INV542)
                    })
                    .catch(error => {
                        console.error(error)
                        this._evaluarentidad_INV542()
                    })
                }
            )
        },
        _validardatos_INV542(){
            this.estado_loader = true
            this.label_loader = `Consultando comprobantes`
            this.progreso = { transferred: 0, speed: 0 }
            postData(
                {
                    datosh: `${datosEnvio()}${this.form.entidad_INV542.padStart(10,'0')}|${this.form.claseservicio_INV542}|${localStorage.Usuario}|`,
                },
                get_url('app/SALUD/INV542.DLL'),
                {
                    onProgress: (progress) => {
                        this.progreso = progress
                    }
                }
            )
            .then(data => {
                this.loader = false
                this.label_loader = `GENERANDO IMPRESIÓN...`
                this.progreso.completado = true
                if (this.form.formatoimpresion_INV542 == '1') return this._validarimpresioncsv_INV542(data)
                if (this.form.formatoimpresion_INV542 == '2') return this._validarimpresionpdf_INV542(data)

                this.estado_loader = false
                CON851('','Error en el formato de impresion',null,'error','Error')
                this._evaluarentidad_INV542()
            })
            .catch(error => {
                this.estado_loader = false
                console.error(error)
                this._evaluarentidad_INV542()
            })
        },
        _validarimpresioncsv_INV542(data){
            columnas = [
                {
                    title: "COMPROBANTE",
                    value: 'COMPROBANTE',
                },
                {
                    title: "FECHA",
                    value: 'FECHA',
                },
                {
                    title: "FACTURA",
                    value: 'FACTURA',
                },
                {
                    title: "VALOR CONTADO",
                    value: 'VALOR_CONT',
                },
                {
                    title: "VALOR CREDITO",
                    value: 'VALOR_CRED',
                },
                {
                    title: "VALOR PENSIONADO",
                    value: 'VALOR_PEN',
                },
                {
                    title: "VALOR AMBULATORIO",
                    value: 'VALOR_AMB',
                },
                {
                    title: "VALOR TOTAL",
                    value: 'VALOR_TOT',
                },
                {
                    title: "DETALLE",
                    value: 'DETALLE',
                }
            ]
            _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
                    { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
                    { text: `${$_USUA_GLOBAL[0].DIRECC}` + 'TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },
                    `FECHA ${moment().format('MMMM DD YYYY').toUpperCase()}`,
                ],
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
            _toggleNav();
        })
        .catch(() => {
            loader("hide");
            CON851('', 'Hubo un error en la impresión', null, 'error', 'Error')
            _toggleNav();
        })
    },
    _validarimpresionpdf_INV542(data){
        let variables = ['COMPROBANTE','FECHA','FACTURA','VALOR_CONT','VALOR_CRED','VALOR_PEN','VALOR_AMB','VALOR_TOT','DETALLE'];
        let tamaños = ['10%','10%','10%','10%','10%','10%','10%','10%','20%'];
        $_this = this;
        let datosimpresion = {
            pageSize: 'LETTER',
            pageMargins: [10, 110, 10, 20],
            header: function (currentPage, pageCount, pageSize) {
                return [
                    { text: ' ' },
                    {
                        image: 'logo',
                        fit: [60, 20],
                        absolutePosition: { x: 38, y: 25 }
                    },
                    {
                        text: $_USUA_GLOBAL[0].NOMBRE,
                        style: 'titulos',
                    },
                        {
                            text: `NIT - ${$_USUA_GLOBAL[0].NIT}`,
                            style: 'titulos',
                        },
                        {
                            text: `DIRECCIÓN: ${$_USUA_GLOBAL[0].DIRECC}      TEL. ${$_USUA_GLOBAL[0].TEL}      PAGINA ${currentPage} DE ${pageCount}`,
                            style: 'titulos2',
                        },
                        {
                            text: `ENTIDAD:   ${$_this.form.entidadd_INV542}`,
                            style: 'titulos',
                        },
                        { text: ' '},
                        {
                            style: 'tableExample',
                            table: {
                                widths: ['10%','10%','10%','10%','10%','10%','10%','10%','20%'],
                                headerRows: 1,
                                body: [
                                    [
                                        {text: 'COMPROBANTE', style: 'tableHeader', border: [false]},
                                        {text: 'FECHA', style: 'tableHeader', border: [false]},
                                        {text: 'FACTURA', style: 'tableHeader', border: [false]},
                                        {text: 'VALOR CONTADO', style: 'tableHeader', border: [false]},
                                        {text: 'VALOR CREDITO', style: 'tableHeader', border: [false]},
                                        {text: 'VALOR PENSIONADO', style: 'tableHeader', border: [false]},
                                        {text: 'VALOR AMBULATORIO', style: 'tableHeader', border: [false]},
                                        {text: 'VALOR TOTAL', style: 'tableHeader', border: [false]},
                                        {text: 'DETALLE', style: 'tableHeader', border: [false]},
                                        
                                    ],
                                ]
                            },
                            margin: [10,0,10,0]
                        },
                    ];
                },
                content: [
                    construirtablaimpresiones(data.DATOS, variables, tamaños),
                    { text: ' '},
                    {
                        columns: [
                            { text: 'OPER IMP :', width: '10%', style: 'textheadertable' },
                            { text: localStorage.Usuario, width: '5%', style: 'textheadertable' },
                        ],
                        margin:[10,0,10,0]
                    }
                ],
                styles: {
                    titulos: {
                        alignment: 'center',
                        fontSize: 13,
                        bold: true
                    },
                    titulos2: {
                        alignment: 'center',
                        fontSize: 10,
                        bold: true
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 6,
                    },
                    textheadertable: {
                        fontSize: 6
                    }
                }
            }
            datosimpresion.images = {
                logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png'
            };
            _impresion2({
                tipo: 'pdf',
                content: datosimpresion,
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`
            })
                .then(() => {
                    CON851('39','39',null,'success','Exito');
                    _toggleNav();
                })
                .catch((err) => {
                    console.error(err);
                    this._evaluarentidad_INV542();
                });
        },
        _ventanaentidades_INV542(){
            let $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.entidad_INV542 = parseInt(data.COD).toString()
                    _enterInput('.entidad_INV542')
                },
                cancel: () => {
                    $('.entidad_INV542').focus()
                }
            }
            F8LITE(parametros)
        }
    }
})