//  CAMILO FRANCO - Creacion
new Vue({
    el:'#INV543',
    data: {
        form:{
            facturacion_INV543: '',
            facturaciond_INV543: '',
            formapago_INV543: '',
            formapagod_INV543: '',
            puertaingreso_INV543: '',
            puertaingresod_INV543: '',
            medico_INV543: '',
            medicod_INV543: '',
            paciente_INV543: '',
            paciented_INV543: '',
            entidad_INV543: '',
            entidadd_INV543: '',
            grupo_INV543: '',
            grupod_INV543: '',
            fechainicioaño_INV543: '',
            fechainiciomes_INV543: '',
            fechainiciodia_INV543: '',
            fechafinalaño_INV543: '',
            fechafinalmes_INV543: '',
            fechafinaldia_INV543: '',
            discriminarcodigo_INV543: '',
            valorencero_INV543: '',
            sucursal_INV543: ''
        },
        INV543:[],
        estado_loader: false,
        progreso: {},
        label_loader: null,
        loader: 1,
    },
    components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
	},
    created(){
        nombreOpcion('9,5,4,1,1 - Relación comprobantes por tipo')
        _toggleNav()
        _inputControl('disabled')
        loader('show')
        let $_this = this
        this.form.medicod_INV543 = '99 TODOS LOS MEDICOS'
        this.form.paciented_INV543 = '** TODOS LOS PACIENTES'
        this.form.entidadd_INV543 = '99 TODAS LAS ENTIDADES'
        this.form.grupod_INV543 = '** TODOS LOS GRUPOS'
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, (data) => {
            loader('hide')
            this.INV543.PREFIJOS = data.PREFIJOS[0].TABLA
            this.INV543.PREFIJOS.pop()
            obtenerDatosCompletos({ nombreFd: 'SERVICIOS' }, data => {
                data.SERVICIOS.push({ 'COD': '*', 'DESCRIPCION': 'TODOS LOS SERVICIOS' })
                $_this.INV543.FORMAPAGO = data.SERVICIOS
                $_this._validartiposdeservicio_INV543()
            })
        });
    },
    methods:{
        _validartiposdeservicio_INV543(){
            POPUP({
                array: this.INV543.FORMAPAGO,
                titulo: "TIPOS DE SERVICIO",
                indices: [
                    { id: 'COD', label: 'DESCRIPCION' }
                ],
                teclaAlterna: true,
                callback_f: _toggleNav
            },
                data => {
                    this.form.facturacion_INV543 = data.COD
                    this.form.facturaciond_INV543 = data.DESCRIPCION
                    this._evaluarformadepago_INV543()
                }
            )
        },
        _evaluarformadepago_INV543(){
            POPUP({
                array: this.INV543.PREFIJOS,
                titulo: "FORMA DE PAGO",
                indices: [
                    { id: 'PREFIJO', label: 'DESCRIPCION' }
                ],
                teclaAlterna: true,
                callback_f: () => setTimeout(this._validartiposdeservicio_INV543, 300)
            },
                data => {
                    this.form.formapago_INV543 = data.PREFIJO
                    this.form.formapagod_INV543 = data.DESCRIPCION
                    this._evaluarpuertaingreso_INV543()
                }
            )
        },
        _evaluarpuertaingreso_INV543(){
            POPUP({
                array: [
                    {COD:'1', DESCRIPCION:'URGENCIAS'},
                    {COD:'2', DESCRIPCION:'CONSULTA EXTERNA'},
                    {COD:'3', DESCRIPCION:'TODAS'}
                ],
                titulo: "PUERTA DE INGRESO",
                indices: [
                    { id: 'COD', label: 'DESCRIPCION' }
                ],
                teclaAlterna: true,
                callback_f: () => setTimeout(this._evaluarformadepago_INV543, 300)
            },
                data => {
                    this.form.puertaingreso_INV543 = data.COD
                    this.form.puertaingresod_INV543 = data.DESCRIPCION
                    this._evaluarmedico_INV543()
                }
            )
        },
        _evaluarmedico_INV543(){
            if (this.form.medico_INV543.trim() == '') this.form.medico_INV543 = '99'
            validarInputs(
                {
                    form: '#VALIDAR1_INV543',
                    orden: '1'
                },
                () => setTimeout(this._evaluarpuertaingreso_INV543, 300),
                () => {
                    this.form.medico_INV543 = this.form.medico_INV543.padStart(10,'0')

                    if (parseInt(this.form.medico_INV543) == 99) {
                        this.form.medicod_INV543 = 'TODOS LOS MEDICOS'
                        return this._evaluarpaciente_INV543()
                    }

                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.medico_INV543.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                    .then(data => {
                        this.form.medicod_INV543 = data.TERCER[0].DESCRIP_TER
                        this._evaluarpaciente_INV543()
                    })
                    .catch(error => {
                        console.error(error)
                        this._evaluarmedico_INV543()
                    })
                }
            )
        },
        _evaluarpaciente_INV543(){
            if (this.form.paciente_INV543.trim() == '') this.form.paciente_INV543 = '**'
            validarInputs(
                {
                    form: '#VALIDAR2_INV543',
                    orden: '1'
                },
                this._evaluarmedico_INV543,
                () => {
                    this.form.paciente_INV543 = this.form.paciente_INV543.padStart(15,'0')

                    if (this.form.paciente_INV543 == '0000000000000**') {
                        this.form.paciented_INV543 = 'TODOS LOS PACIENTES'
                        return this._evaluarentidad_INV543()
                    }

                    postData(
                        {
                            datosh: datosEnvio() + this.form.paciente_INV543 + "|",
                        }, 
                        get_url("APP/SALUD/SER810-1.DLL")
                    )
                    .then(data => {
                        this.form.paciented_INV543 = data["REG-PACI"][0].DESCRIP
                        this._evaluarentidad_INV543()
                    })
                    .catch(error => {
                        console.error(error)
                        this._evaluarpaciente_INV543()
                    })
                }
            )
        },
        _evaluarentidad_INV543(){
            if (this.form.entidad_INV543.trim() == '') this.form.entidad_INV543 = '99'
            validarInputs(
                {
                    form: '#VALIDAR3_INV543',
                    orden: '1'
                },
                this._evaluarpaciente_INV543,
                () => {
                    this.form.entidad_INV543 = this.form.entidad_INV543.padStart(10,'0')

                    if (this.form.entidad_INV543 == '0000000099') {
                        this.form.entidadd_INV543 = 'TODAS LOS ENTIDADES'
                        return this._evaluargrupo_INV543()
                    }

                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.entidad_INV543.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                    .then(data => {
                        this.form.entidadd_INV543 = data.TERCER[0].DESCRIP_TER
                        this._evaluargrupo_INV543()
                    })
                    .catch(error => {
                        console.error(error)
                        this._evaluarentidad_INV543()
                    })
                }
            )
        },
        _evaluargrupo_INV543(){
            if (this.form.grupo_INV543.trim() == '') this.form.grupo_INV543 = '**'
            validarInputs(
                {
                    form: '#VALIDAR4_INV543',
                    orden: '1'
                },
                this._evaluarentidad_INV543,
                () => {
                    if (this.form.grupo_INV543.trim() == '**') {
                        this.form.grupod_INV543 = 'TODOS LOS GRUPOS'
                        return this._evaluarfechainicio_INV543('1')
                    }
                    if (this.form.facturacion_INV543 == '0') {
                        return postData(
                            { 
                                datosh: datosEnvio(), 
                                filtro: `0${this.form.grupo_INV543.trim()}` 
                            }, 
                            get_url('APP/INVENT/INV804.DLL')
                        )
                        .then((data) => {
                            this.form.grupod_INV543 = data.GRUPOS.DESCRIP
                            this._evaluarfechainicio_INV543('1')
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluargrupo_INV543()
                        })
                    }

                    postData(
                        {
                            datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
                            grupo: `${this.form.grupo_INV543}|`
                        },
                        get_url('app/SALUD/SER801.DLL')
                    )
                    .then((data) => {
                        this.form.grupod_INV543 = data.DESCRIP
                        this._evaluarfechainicio_INV543('1')
                    })
                    .catch((error) => {
                        console.error(error)
                        this._evaluargrupo_INV543()
                    })
                }
            )
        },
        _evaluarfechainicio_INV543(data){
            let fecha = moment().format('YYYYMMDD')
            this.form.fechainicioaño_INV543 = fecha.substring(0,4)
            this.form.fechainiciomes_INV543 = fecha.substring(4,6)
            this.form.fechainiciodia_INV543 = '01'
            validarInputs(
                {
                    form: '#VALIDAR5_INV543',
                    orden: data
                },
                this._evaluargrupo_INV543,
                () => {
                    this.form.fechainicioaño_INV543 = this.form.fechainicioaño_INV543.padStart(4,'0')
                    this.form.fechainiciomes_INV543 = this.form.fechainiciomes_INV543.padStart(2,'0')
                    this.form.fechainiciodia_INV543 = this.form.fechainiciodia_INV543.padStart(2,'0')
                    if (moment(`${this.form.fechainicioaño_INV543}${this.form.fechainiciomes_INV543}${this.form.fechainiciodia_INV543}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarfechainicio_INV543('3')
                    }
                    this._evaluarfechafinal_INV543('1')
                }
            )
        },
        _evaluarfechafinal_INV543(data){
            let fecha = moment().endOf('month').format('YYYYMMDD')
            this.form.fechafinalaño_INV543 = fecha.substring(0,4)
            this.form.fechafinalmes_INV543 = fecha.substring(4,6)
            this.form.fechafinaldia_INV543 = fecha.substring(6,8)
            validarInputs(
                {
                    form: '#VALIDAR6_INV543',
                    orden: data
                },
                () => this._evaluarfechainicio_INV543('3'),
                () => {
                    this.form.fechafinalaño_INV543 = this.form.fechafinalaño_INV543.padStart(4,'0')
                    this.form.fechafinalmes_INV543 = this.form.fechafinalmes_INV543.padStart(2,'0')
                    this.form.fechafinaldia_INV543 = this.form.fechafinaldia_INV543.padStart(2,'0')
                    if (moment(`${this.form.fechafinalaño_INV543}${this.form.fechafinalmes_INV543}${this.form.fechafinaldia_INV543}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarfechafinal_INV543('3')
                    }
                    if (this.form.grupo_INV543.trim() == '**') {
                        this.form.discriminarcodigo_INV543 = 'S'
                        return this._evaluarvalorencero_INV543()
                    }
                    this.form.discriminarcodigo_INV543 = 'N'
                    this._evaluardiscriminarcodigo_INV543()
                }
            )
        },
        _evaluardiscriminarcodigo_INV543(){
            validarInputs(
                {
                    form: '#VALIDAR7_INV543',
                    orden: '1'
                },
                () => this._evaluarfechafinal_INV543('3'),
                () => {
                    this.form.discriminarcodigo_INV543 = this.form.discriminarcodigo_INV543.toUpperCase()
                    if (this.form.discriminarcodigo_INV543.trim() == 'S' || this.form.discriminarcodigo_INV543.trim() == 'N') {
                        return this._evaluarvalorencero_INV543()
                    }

                    CON851('03','03',null,'error','Error')
                    this._evaluardiscriminarcodigo_INV543()
                }
            )
        },
        _evaluarvalorencero_INV543() {
            if (this.form.valorencero_INV543.trim() == '') this.form.valorencero_INV543 = 'N'
            validarInputs(
                {
                    form: '#VALIDAR8_INV543',
                    orden: '1'
                },
                this._evaluardiscriminarcodigo_INV543,
                () => {
                    this.form.valorencero_INV543 = this.form.valorencero_INV543.toUpperCase()
                    if (this.form.valorencero_INV543.trim() == 'S' || this.form.valorencero_INV543.trim() == 'N') {
                        return this._evaluarsucursal_INV543()
                    }

                    CON851('03','03',null,'error','Error')
                    this._evaluarvalorencero_INV543()
                }
            )
        },
        _evaluarsucursal_INV543() {
            if (this.form.sucursal_INV543.trim() == '') this.form.sucursal_INV543 = '**'
            validarInputs(
                {
                    form: '#VALIDAR9_INV543',
                    orden: '1'
                },
                this._evaluarvalorencero_INV543,
                () => {
                    if (this.form.sucursal_INV543.trim() == '') {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarsucursal_INV543()
                    }

                    CON851P('04',this._evaluarsucursal_INV543, this._validardatos_INV543)
                }
            )
        },
        _validardatos_INV543(){
            loader('show')
            let enviodatos = `${datosEnvio()}${this.form.sucursal_INV543}|${this.form.paciente_INV543.padStart(15,'0')}|${this.form.puertaingreso_INV543}|${this.form.facturacion_INV543}|`
            enviodatos += `${this.form.formapago_INV543}|${this.form.medico_INV543.padStart(10,'0')}|${this.form.entidad_INV543.padStart(10,'0')}|${this.form.grupo_INV543}|`
            enviodatos += `${this.form.valorencero_INV543}|${this.form.discriminarcodigo_INV543}|${localStorage.Usuario.trim()}|`
            enviodatos += `${this.form.fechainicioaño_INV543}${this.form.fechainiciomes_INV543}${this.form.fechainiciodia_INV543}|${this.form.fechafinalaño_INV543}${this.form.fechafinalmes_INV543}${this.form.fechafinaldia_INV543}|`
            postData(
                {
                    datosh: enviodatos,
                },
                get_url('app/SALUD/INV543.DLL')
            )
            .then((data) => {
                console.log(data)
                data.DATOS.pop()
                loader('hide')
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
                    title: "ARTICULO",
                    value: 'ARTICULO',
                },
                {
                    title: "DESCRIPCION ARTICULO",
                    value: 'DESCRIPCION',
                },
                {
                    title: "CANTIDAD",
                    value: 'CANTIDAD',
                },
                {
                    title: "VALOR",
                    value: 'VALOR',
                },
                {
                    title: "VALOR ULTIMA COMPRA",
                    value: 'VALOR_ULTIMA_COMPRA',
                },
                {
                    title: "VALOR RBO",
                    value: 'VALOR_RBO',
                },
                {
                    title: "FECHA ATENCION",
                    value: 'FECHA_ATENCION',
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
                    title: "DIAGNOSTIO 1",
                    value: 'DIAGNOSTIO1',
                },
                {
                    title: "DIAGNOSTIO 2",
                    value: 'DIAGNOSTIO2',
                },
                {
                    title: "DIAGNOSTIO 3",
                    value: 'DIAGNOSTIO3',
                },
                {
                    title: "DIAGNOSTIO 4",
                    value: 'DIAGNOSTIO4',
                },
                {
                    title: "OPERADOR",
                    value: 'OPERADOR',
                },
                {
                    title: "UNIDAD SERVICIO",
                    value: 'UNIDAD_SERVICIO',
                },
                {
                    title: "FECHA NACIMIENTO",
                    value: 'FECHA_NACIMIENTO',
                },
                {
                    title: "ESPECIALIDAD",
                    value: 'ESPECIALIDAD',
                }

                ]
                _impresion2({
                tipo: 'excel',
                header: [
                    { text: `${$_USUA_GLOBAL[0].NOMBRE}`, center: { left: 0.5, top: 0.5 }, bold: true, size: 16 },
                    { text: `${$_USUA_GLOBAL[0].NIT}`, horizontalCentered: 'true', size: 14 },
                    { text: `${$_USUA_GLOBAL[0].DIRECC}` + 'TEL: ' + `${$_USUA_GLOBAL[0].TEL}` + ' ' + `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, size: 14 },
                    `FECHA DESDE: ` + moment(`${this.form.fechainicioaño_INV543}${this.form.fechainiciomes_INV543}${this.form.fechainiciodia_INV543}`).format('MMMM DD YYYY').toUpperCase() + ' FECHA HASTA:' + moment(`${this.form.fechafinaloaño_INV543}${this.form.fechafinalmes_INV543}${this.form.fechafinaldia_INV543}`).format('MMMM DD YYYY').toUpperCase(),

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
                    CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
                })
                .catch(() => {
                    loader("hide");
                    CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
                })
            })
            .catch((error) => {
                console.error(error)
                this._evaluarsucursal_INV543()
            })
        },
        _ventanaprofesionales_INV543(){
            this.estado_loader = true
            this.label_loader = `Consultando profesionales`
            this.progreso = { transferred: 0, speed: 0 }
            postData(
                { datosh: datosEnvio() }, 
                get_url("APP/SALUD/SER819.DLL"),
                {
                    onProgress: (progress) => {
                        this.progreso = progress
                    }
                }
            )
            .then((data) => {
                this.loader = false
                this.estado_loader = true
                data.ARCHPROF.pop();
                let $_this = this;
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                    data: data.ARCHPROF,
                    callback_esc: function () {
                        $('.medico_INV543').focus();
                    },
                    callback: function (data) {
                        $_this.form.medico_INV543 = data.IDENTIFICACION.trim()
                        _enterInput('.medico_INV543');
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                $('.medico_INV543').focus();
            });
        },
        _ventanapaciente_INV543(){
            let $_this = this;
            let parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                ancho: '95%',
                columnas: [
                    { title: 'COD' }, 
                    { title: 'NOMBRE' },
                    { title: 'EPS' }, 
                    { title: 'EDAD'}
                ],
                callback: data => {
                    $_this.form.paciente_INV543 = data.COD;
                    _enterInput('.paciente_INV543');
                },
                cancel: () => {
                    $('.paciente_INV543').focus();
                }
            };
            F8LITE(parametros);
        },
        _ventanaentidad_INV543(){
            let $_this = this;
            let parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.entidad_INV543 = parseInt(data.COD).toString();
                    _enterInput('.entidad_INV543');
                },
                cancel: () => {
                    $('.entidad_INV543').focus();
                }
            };
            F8LITE(parametros);
        },
        _ventanagrupo_INV543(){
            let $_this = this;
            if (this.form.facturacion_INV543 == '0') {
                this.estado_loader = true
                this.label_loader = `Consultando grupos`
                this.progreso = { transferred: 0, speed: 0 }
                return postData(
                    { datosh: datosEnvio() }, 
                    get_url("APP/INVENT/INV804.DLL"),
                    {
                        onProgress: (progress) => {
                            this.progreso = progress
                        }
                    }
                )
                .then((data) => {
                    this.loader = false
                    this.estado_loader = true
                    data.GRUPOS.pop();
                    let grupos = data.GRUPOS
                    let grupo = grupos.filter(data => data.TIPO == '0')
                    data.GRUPOS = grupo
                    _ventanaDatos({
                        titulo: 'VENTANA DE GRUPOS',
                        columnas: ["GRUPO", "DESCRIP"],
                        data: data.GRUPOS,
                        callback_esc: function () {
                            $('.grupo_INV543').focus();
                        },
                        callback: function (data) {
                            $_this.estado_loader = false
                            $_this.form.grupo_INV543 = data.GRUPO.trim()
                            _enterInput('.grupo_INV543');
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                    CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                    $('.grupo_INV543').focus();
                });
            }

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
                        $('.grupo_INV543').focus();
                    },
                    callback: function (data) {
                        $_this.estado_loader = false
                        $_this.form.grupo_INV543 = data.COD.trim()
                        _enterInput('.grupo_INV543');
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                $('.grupo_INV543').focus();
            });
        }
    }
})