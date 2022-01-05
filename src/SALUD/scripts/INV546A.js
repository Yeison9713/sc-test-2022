//  CAMILO FRANCO - Creacion
new Vue({
    el:'#INV546A',
    data: {
        form:{
            prefijo_INV546A: '',
            numerofactura_INV546A: '',
            entidad_INV546A: '',
            vlrencero_INV546A: '',
            fechainicioaño_INV546A: '',
            fechainiciomes_INV546A: '',
            fechainiciodia_INV546A: '',
            fechafinalaño_INV546A: '',
            fechafinalmes_INV546A: '',
            fechafinaldia_INV546A: '',
        },
        INV546A:[],
        estado_loader: false,
        progreso: {},
        label_loader: null,
        loader: 1,
    },
    components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
	},
    created(){
        nombreOpcion('9,5,4,1,1,5 - Relación comprobantes con descto')
        _toggleNav()
        _inputControl('disabled')
        loader('show')
        let $_this = this
        this.form.entidad_INV546A = 'ENTIDAD FACTURA';
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, (data) => {
            loader('hide')
            this.INV546A.PREFIJOS = data.PREFIJOS[0].TABLA
            this.INV546A.PREFIJOS.pop()
            $_this._evaluarformadepago_INV546A()
        });
    },
    methods:{
        _evaluarformadepago_INV546A(){
            POPUP({
                array: this.INV546A.PREFIJOS,
                titulo: "FORMA DE PAGO",
                indices: [
                    { id: 'PREFIJO', label: 'DESCRIPCION' }
                ],
                teclaAlterna: true,
                callback_f: _toggleNav
            },
                data => {
                    this.form.prefijo_INV546A = data.PREFIJO
                    this._evaluarnumerodefactura_INV546A()
                }
            )
        },
        _evaluarnumerodefactura_INV546A(){
            validarInputs(
                {
                    form: '#VALIDAR1_INV546A',
                    orden: '1'
                },
                () => setTimeout(this._evaluarformadepago_INV546A, 300),
                () => {
                    this.form.numerofactura_INV546A = this.form.numerofactura_INV546A.padStart(6,'0');
                    if (this.form.numerofactura_INV546A.trim() == '' || this.form.numerofactura_INV546A == 0) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarnumerodefactura_INV546A()
                    }
                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.prefijo_INV546A}${this.form.numerofactura_INV546A}|8|`,
                        }, 
                        get_url("APP/SALUD/SER808-01.DLL")
                    )
                    .then(data => {
                        this.form.entidad_INV546A = data.NUMER19[0].DESCRIP_NUM;
                        this.form.fechainicioaño_INV546A = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0,2)}`;
                        this.form.fechainiciomes_INV546A = $_USUA_GLOBAL[0].FECHALNK.substring(2,4);
                        this.form.fechainiciodia_INV546A = '01';
                        this.form.vlrencero_INV546A = 'N';
                        this._evaluarvlrencero_INV546A();
                    })
                    .catch(error => {
                        console.error(error);
                        this._evaluarnumerodefactura_INV546A();
                    });
                }
            )
        },
        _evaluarvlrencero_INV546A(){
            validarInputs(
                {
                    form: '#VALIDAR2_INV546A',
                    orden: '1'
                },
                this._evaluarnumerodefactura_INV546A,
                () => {
                    this.form.vlrencero_INV546A = this.form.vlrencero_INV546A.toUpperCase()
                    if (this.form.vlrencero_INV546A.trim() == 'S' || this.form.vlrencero_INV546A.trim() == 'N') {
                        return this._evaluarfechainicio_INV546A('1')
                    }

                    CON851('03','03',null,'error','Error')
                    this._evaluarvlrencero_INV546A()
                }
            )
        },
        _evaluarfechainicio_INV546A(data){
            let fecha = moment().format('YYYYMMDD')
            this.form.fechainicioaño_INV546A = fecha.substring(0,4)
            this.form.fechainiciomes_INV546A = fecha.substring(4,6)
            this.form.fechainiciodia_INV546A = '01'
            validarInputs(
                {
                    form: '#VALIDAR3_INV546A',
                    orden: data
                },
                this._evaluarvlrencero_INV546A,
                () => {
                    this.form.fechainicioaño_INV546A = this.form.fechainicioaño_INV546A.padStart(4,'0')
                    this.form.fechainiciomes_INV546A = this.form.fechainiciomes_INV546A.padStart(2,'0')
                    this.form.fechainiciodia_INV546A = this.form.fechainiciodia_INV546A.padStart(2,'0')
                    if (moment(`${this.form.fechainicioaño_INV546A}${this.form.fechainiciomes_INV546A}${this.form.fechainiciodia_INV546A}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarfechainicio_INV546A('3')
                    }
                    this.form.fechafinalaño_INV546A = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0,2)}`;
                    this.form.fechafinalmes_INV546A = this.form.fechainiciomes_INV546A;
                    this.form.fechafinaldia_INV546A = moment(`${this.form.fechainicioaño_INV546A}${this.form.fechainiciomes_INV546A}01`).endOf('month').format('DD');
                    this._evaluarfechafinal_INV546A('1')
                }
            )
        },
        _evaluarfechafinal_INV546A(data){
            validarInputs(
                {
                    form: '#VALIDAR4_INV546A',
                    orden: data
                },
                () => this._evaluarfechainicio_INV546A('3'),
                () => {
                    this.form.fechafinalaño_INV546A = this.form.fechafinalaño_INV546A.padStart(4,'0')
                    this.form.fechafinalmes_INV546A = this.form.fechafinalmes_INV546A.padStart(2,'0')
                    this.form.fechafinaldia_INV546A = this.form.fechafinaldia_INV546A.padStart(2,'0')
                    if (moment(`${this.form.fechafinalaño_INV546A}${this.form.fechafinalmes_INV546A}${this.form.fechafinaldia_INV546A}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarfechafinal_INV546A('3')
                    }

                    CON851P('04',() => this._evaluarfechafinal_INV546A('3'), this._validardatos_INV546A)
                }
            )
        },
        _validardatos_INV546A(){
            this.estado_loader = true
            this.label_loader = `Consultando comprobantes`
            this.progreso = { transferred: 0, speed: 0 }
            let enviodatos = `${datosEnvio()}${this.form.prefijo_INV546A}|${this.form.numerofactura_INV546A.padStart(6,'0')}|${this.form.vlrencero_INV546A}|`
            enviodatos += `${this.form.fechainicioaño_INV546A}${this.form.fechainiciomes_INV546A}${this.form.fechainiciodia_INV546A}|${this.form.fechafinalaño_INV546A}${this.form.fechafinalmes_INV546A}${this.form.fechafinaldia_INV546A}|`
            postData(
                {
                    datosh: enviodatos,
                },
                get_url('app/SALUD/INV546A.DLL'),
                {
                    onProgress: (progress) => {
                        this.progreso = progress
                    }
                }
            )
            .then((data) => {
                console.log(data)
                columnas = [
                    {
                        title: "COMPROBANTE",
                        value: 'COMPROBANTE',
                        format: 'string'
                    },
                    {
                        title: "FECHA",
                        value: 'FECHA',
                    },
                    {
                        title: "CODIGO",
                        value: 'CODIGO',
                    },
                    {
                        title: "AUTORIZACION",
                        value: 'AUTORIZACION',
                    },
                    {
                        title: "IDENTIFICACION",
                        value: 'NRO_DOC',
                    },
                    {
                        title: "TIPO IDENTIFICACION",
                        value: 'TIPO_DOC',
                    },
                    {
                        title: "PRIMER APELLIDO",
                        value: 'APELLIDO_1',
                    },
                    {
                        title: "SEGUNDO APELLIDO",
                        value: 'APELLIDO_2',
                    },
                    {
                        title: "NOMBRES",
                        value: 'NOMBRE',
                    },
                    {
                        title: "DETALLE",
                        value: 'DETALLE',
                    },
                    {
                        title: "VALOR PROCEDIMIENTO",
                        value: 'VALOR_PROC',
                    },
                    {
                        title: "VALOR INSUMO",
                        value: 'VALOR_INSU',
                    },
                    {
                        title: "DESCTO",
                        value: 'DESCTO',
                    },
                    {
                        title: "VALOR NETO",
                        value: 'VALOR_NETO',
                    },
                    {
                        title: "COPAGO",
                        value: 'COPAGO',
                    },
                    {
                        title: "MODERADORA",
                        value: 'MODERADORA',
                    },
                    {
                        title: "SALDO",
                        value: 'SALDO',
                    }

                ]
                _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
                    { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
                    { text: `${$_USUA_GLOBAL[0].DIRECC}` + '   TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },
                    `FECHA DESDE: ` + moment(`${this.form.fechainicioaño_INV546A}${this.form.fechainiciomes_INV546A}${this.form.fechainiciodia_INV546A}`).format('MMMM DD YYYY').toUpperCase() + ' FECHA HASTA:' + moment(`${this.form.fechafinalaño_INV546A}${this.form.fechafinalmes_INV546A}${this.form.fechafinaldia_INV546A}`).format('MMMM DD YYYY').toUpperCase(),

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
                    this.estado_loader = false
                    loader("hide");
                    CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
                })
            })
            .catch((error) => {
                console.error(error)
                this.estado_loader = false
                this._evaluarfechafinal_INV546A('3')
            })
        },
        _ventanaNumeracion_INV546A(){
            parametros = {
                dll: 'NUMERACION',
                valoresselect: ['Nombre del tercero', 'buscar paciente'],
                f8data: 'NUMERACION',
                columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                filtro: this.form.prefijo_INV546A,
                fecha: `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 4)}00`,
                prefijo: this.form.prefijo_INV546A,
                callback: (data) => {
                    this.form.numerofactura_INV546A = data.COD.substring(1, 7).toString();
                    _enterInput('.numerofactura_INV546A');
                },
                cancel: () => {
                    _enterInput('.numerofactura_INV546A');
                }
            };
            F8LITE(parametros);
        }
    }
})