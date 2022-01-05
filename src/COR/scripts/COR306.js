const { get } = require('../../COR/scripts/COR.ctrl.js')

new Vue({
    el: '#COR304',
    data() {
        let fecha_actual = moment().format('YYYY/MM/DD')
        let obj = {
            ano_w: fecha_actual.split('/')[0],
            mes_w: fecha_actual.split('/')[1],
            dia_w: fecha_actual.split('/')[2],
        }

        return {
            formato: {},
            reg: {
                nit_w: null,
                dep_w: null,
                tipo_corres_w: null,
                fecha_inicial: JSON.parse(JSON.stringify(obj)),
                fecha_final: JSON.parse(JSON.stringify(obj)),
                jornada: {},
                procedencia: {},
                manejo: {},
            },
            format_formato: null,
            format_jornada: null,
            format_procedencia: null,
            format_manejo: null,
            format_descartar: null,
            format_repuesta: null,

            terceros: [],
            dependencias: [],
            tipos_corres: [],
        }
    },
    created() {
        console.clear()
        _vm = this

        nombreOpcion('3-6 - Informe de distribución externa');
        _inputControl('reset');
        _inputControl('disabled');

        // this.formato_impresion()
        loader('show')
        this.get_json()

    },
    methods: {
        async get_json() {
            let terceros = await get('terceros')
            this.terceros = terceros.TERCEROS

            let dependencias = await get('dependencias')
            this.dependencias = dependencias.depen_cor

            let tipos_corres = await get('tipos')
            this.tipos_corres = tipos_corres.tipos

            loader('hide')
            this.datos_fijos()
        },
        datos_fijos() {
            this.reg.nit_w = '99'
            document.getElementById('nombre_entidad_COR304').value = 'TODAS LAS ENTIDADES'

            this.reg.dep_w = '***'
            document.getElementById('descripcion_dep_COR304').value = 'TODAS LAS DEPENDENCIAS'

            this.reg.tipo_corres_w = '**'
            document.getElementById('descrip_tipo_COR304').value = 'TODOS LOS TIPOS'

            this.format_jornada = '* - Todas'
            this.format_procedencia = '** - Todas'
            this.format_manejo = '* - Todas'

            this.solicitar_formato()
        },
        solicitar_formato() {
            this.formato = { id: 1, label: 'Formato PDF' }
            this.format_formato = `1 - Formato PDF`
            this.validar_entidad()
        },
        validar_entidad() {
            const _this = this;

            validarInputs({
                form: '#validar_entidad_COR304',
                orden: '1',
            },
                _toggleNav,
                () => {
                    let nit = _this.reg.nit_w

                    if (_this.terceros && nit && nit.toString().trim()) {
                        let busqueda = _this.terceros.find(el => el.COD == nit)
                        if (!busqueda && nit != '99') {
                            document.getElementById('nombre_entidad_COR304').value = ''
                            _this.validar_entidad()
                            CON851('01', '01', null, 'error', 'Advertencia');
                        } else {
                            if (nit == '99') document.getElementById('nombre_entidad_COR304').value = 'TODAS LAS ENTIDADES'
                            else document.getElementById('nombre_entidad_COR304').value = busqueda.NOMBRE

                            _this.validar_dependencia()
                        }
                    } else _this.validar_entidad()
                }
            )
        },
        validar_dependencia() {
            const _this = this;
            validarInputs({
                form: '#validar_dependencia_COR304',
                orden: '1',
            },
                _this.validar_entidad,
                () => {
                    let servicio = _this.reg.dep_w || ''
                    let servicio_format = servicio.padStart(3, '0')
                    _this.reg.dep_w = servicio_format

                    let busqueda = _this.dependencias.find(el => el.codigo.padStart(3, '0') == servicio_format)
                    if (!busqueda && servicio != '***') {
                        document.getElementById('descripcion_dep_COR304').value = ''
                        _this.validar_dependencia()
                        CON851('01', '01', null, 'error', 'Advertencia');
                    } else {
                        let envio_final = () => {
                            if (servicio == '***') document.getElementById('descripcion_dep_COR304').value = 'TODAS LAS DEPENDENCIAS'
                            else document.getElementById('descripcion_dep_COR304').value = busqueda.responsable

                            _this.validar_tipo()
                        }

                        if (servicio == '***' || busqueda.oper != localStorage.Usuario) {
                            _this.buscar_restric('R31X')
                                .then(envio_final)
                                .catch(_this.validar_dependencia)
                        } else envio_final()
                    }
                }
            )
        },
        validar_tipo() {
            const _this = this;
            validarInputs({
                form: '#validar_tipo_COR304',
                orden: '1',
            },
                _this.validar_dependencia,
                () => {
                    let tipo = _this.reg.tipo_corres_w || ''
                    let tipo_format = tipo.padStart(2, '0')
                    _this.reg.tipo_corres_w = tipo_format

                    let busqueda_tipo = _this.tipos_corres.find(el => el.codigo.padStart(2, '0') == tipo_format)
                    if (!busqueda_tipo && tipo != '**') {
                        document.getElementById('descrip_tipo_COR304').value = ''
                        _this.validar_tipo()
                        CON851('01', '01', null, 'error', 'Advertencia');
                    } else {
                        if (tipo == '**') document.getElementById('descrip_tipo_COR304').value = 'TODOS LOS TIPOS'
                        else document.getElementById('descrip_tipo_COR304').value = busqueda_tipo.descripcion

                        setTimeout(this.ano_inicial, 300)
                    }
                }
            )
        },
        ano_inicial() {
            const _this = this;
            validarInputs({
                form: '#validar_anio_ini_COR304',
                orden: '1',
            },
                _this.validar_tipo,
                _this.mes_inicial
            )
        },
        mes_inicial() {
            const _this = this;
            validarInputs({
                form: '#validar_mes_ini_COR304',
                orden: '1',
            },
                _this.ano_inicial,
                () => {
                    let mes = parseInt(_this.reg.fecha_inicial.mes_w) || 0
                    if (mes < 1 || mes > 12) _this.mes_inicial()
                    else _this.dia_inicial()
                }
            )
        },
        dia_inicial() {
            const _this = this;
            validarInputs({
                form: '#validar_dia_ini_COR304',
                orden: '1',
            },
                _this.mes_inicial,
                () => {
                    let dia = parseInt(_this.reg.fecha_inicial.dia_w) || 0
                    if (dia < 1 || dia > 31) _this.dia_inicial()
                    else _this.ano_final()
                }
            )
        },
        ano_final() {
            const _this = this;
            validarInputs({
                form: '#validar_anio_fin_COR304',
                orden: '1',
            },
                _this.dia_inicial,
                _this.mes_final
            )
        },
        mes_final() {
            const _this = this;
            validarInputs({
                form: '#validar_mes_fin_COR304',
                orden: '1',
            },
                _this.ano_final,
                () => {
                    let mes = parseInt(_this.reg.fecha_final.mes_w) || 0
                    if (mes < 1 || mes > 12) _this.mes_final()
                    else _this.dia_final()
                }
            )
        },
        dia_final() {
            const _this = this;
            validarInputs({
                form: '#validar_dia_fin_COR304',
                orden: '1',
            },
                _this.mes_final,
                () => {
                    let dia = parseInt(_this.reg.fecha_final.dia_w) || 0
                    if (dia < 1 || dia > 31) _this.mes_final()
                    else _this.validar_jornada()
                }
            )
        },
        validar_jornada() {
            POPUP({
                titulo: "JORNADA",
                indices: [{ id: 'id', label: 'label' }],
                seleccion: this.reg.jornada.id || '*',
                array: [
                    { id: 'M', label: 'Mañana' },
                    { id: 'T', label: 'Tarde' },
                    { id: '*', label: 'Todas' },
                ],
                teclaAlterna: true,
                callback_f: this.dia_final,
            }, (data) => {
                this.reg.jornada = data
                this.format_jornada = `${data.id} - ${data.label}`
                setTimeout(this.validar_procedencia, 300)
            })
        },
        validar_procedencia() {
            POPUP({
                titulo: "PROCEDENCIA",
                indices: [{ id: 'id', label: 'label' }],
                seleccion: this.reg.procedencia.id || '**',
                array: [
                    { id: 1, label: 'Externo' },
                    { id: 2, label: 'Interno' },
                    { id: '**', label: 'Todas' },
                ],
                teclaAlterna: true,
                callback_f: () => { setTimeout(this.validar_jornada, 300) },
            }, (data) => {
                this.reg.procedencia = data
                this.format_procedencia = `${data.id} - ${data.label}`
                setTimeout(this.validar_manejo, 300)
            })
        },
        validar_manejo() {
            POPUP({
                titulo: "MANEJO",
                indices: [{ id: 'id', label: 'label' }],
                seleccion: this.reg.manejo.id || '*',
                array: [
                    { id: 1, label: 'Informativo' },
                    { id: 2, label: 'Resolutivo' },
                    { id: '*', label: 'Todas' },
                ],
                teclaAlterna: true,
                callback_f: () => { setTimeout(this.validar_procedencia, 300) },
            }, (data) => {
                this.reg.manejo = data
                this.format_manejo = `${data.id} - ${data.label}`
                setTimeout(this.validar_envio, 300)
            })
        },
        validar_envio() {
            const _this = this;
            const reg = this.reg

            let nit = reg.nit_w
            let dep = reg.dep_w
            let tipo_corr = reg.tipo_corres_w

            let inicial = reg.fecha_inicial
            let ini_format = this.fecha_edit(inicial)
            let fecha_ini = `${ini_format.ano_w}${ini_format.mes_w}${ini_format.dia_w}`

            let final = reg.fecha_final
            let fin_format = this.fecha_edit(final)
            let fecha_fin = `${fin_format.ano_w}${fin_format.mes_w}${fin_format.dia_w}`

            let jor = reg.jornada.id
            let procedencia = reg.procedencia.id != '**' ? reg.procedencia.id.toString().padStart(2, '0') : '**'
            let manejo = reg.manejo.id != '*' ? reg.manejo.id.toString().padStart(2, '0') : '*'

            let paso = 1

            let datos_envio = {
                datosh: datosEnvio(),
                nit,
                dep,
                tipo_corr,
                fecha_ini,
                fecha_fin,
                jor,
                procedencia,
                manejo,
                paso
            }

            loader('show')
            postData(datos_envio, get_url("APP/COR/CORR304.DLL"))
                .then((res) => {
                    loader('hide')
                    let data = res.resp_corresp
                    let filtro = data.filter(el => el.cont && el.cont.trim())
                    if (filtro.length > 0) _this.formato_impresion(data, { fecha_ini, fecha_fin })
                    else {
                        CON851('08', '08', null, 'error', 'Advertencia');
                        this.validar_entidad()
                    }
                })
                .catch(error => {
                    loader('hide')
                    console.error('Error ->', error)
                    this.validar_entidad()
                })
        },
        formato_impresion(data = [], fechas = {}) {
            const _this = this;

            let empresa = $_USUA_GLOBAL[0].NOMBRE
            let nit = $_USUA_GLOBAL[0].NIT
            let fecha_ini = moment(fechas.fecha_ini).format('DD/MM/YYYY')
            let fecha_fin = moment(fechas.fecha_fin).format('DD/MM/YYYY')

            var data_format = data.map(el => {
                el.fecha_format = moment(el.fecha).format('DD/MM/YYYY')
                el.hora_format = `${el.hora.substring(0, 2)}:${el.hora.substring(2, 4)}`
                el.llave = el.cont + '-S'
                el.llave_entrada = el.cont_corr + '-E'

                return el
            })

            const header_tabla = [
                {
                    text: 'Nro. Resp.',
                    title: 'Nro. Resp.',
                    value: 'llave',
                    format: 'string'
                },
                {
                    text: 'Fecha',
                    title: 'Fecha',
                    value: 'fecha_format',
                    format: 'fecha'
                },
                {
                    text: 'Hora',
                    title: 'Hora',
                    value: 'hora_format',
                    format: 'string'
                },
                {
                    text: 'Dependencia',
                    title: 'Dependencia',
                    value: 'descrip_serco'
                },
                {
                    text: 'Nro. Radi.',
                    title: 'Nro. Radi.',
                    value: 'cont_corr'
                },
                
                { 
                    text: 'Firma', 
                    title: 'Firma' 
                }
            ]

            let width_tabla_pdf = ['auto', 'auto', 'auto', '*', 'auto', 'auto']

            let header_tabla_pdf = header_tabla.map(el => {
                el.style = 'headerTabla'
                return el
            })

            const detalle_tabla_pdf = []
            detalle_tabla_pdf.push(header_tabla_pdf)
            data_format.forEach(el => {
                let obj = [
                    { text: el.llave, },
                    { text: el.fecha_format },
                    { text: el.hora_format },
                    { text: el.descrip_serco },
                    { text: el.llave_entrada },
                    { text: '' }
                ]

                detalle_tabla_pdf.push(obj)
            })

            var content = {
                pageMargins: [20, 110, 20, 60],
                images: { logo: `P:\\PROG\\LOGOS\\${nit}.png` },
                // images: { logo: `C:\\PROSOFT\\LOGOS\\00037021.png` },
                header: function (currentPage, pageCount, pageSize) {
                    return [
                        {
                            margin: [20, 20],
                            canvas: [
                                {
                                    type: 'rect',
                                    x: 0,
                                    y: 0,
                                    w: pageSize.width - 40,
                                    h: 80,
                                    r: 0,
                                    lineWidth: 1,
                                    lineColor: '#000',
                                }
                            ],
                        },
                        {
                            margin: [20, -80],
                            columns: [
                                {
                                    width: '20%',
                                    margin: [15, -5, 0, 0],
                                    stack: [
                                        {
                                            image: 'logo',
                                            width: 50,
                                            height: 50
                                        }
                                    ]
                                },
                                {
                                    width: '60%',
                                    text: [
                                        {
                                            text: `${empresa.toUpperCase()}\n`,
                                            fontSize: 16,
                                            bold: true
                                        },
                                        {
                                            text: 'PLANILLA REGISTRO DE SALIDAS\n',
                                            style: 'subTitulo'
                                        },
                                        {
                                            text: `FECHA: ${fecha_ini} - ${fecha_fin}`,
                                            style: 'subTitulo'
                                        }
                                    ]
                                },
                                {
                                    width: '20%',
                                    text: '\nOpc. 3.6'
                                }
                            ]
                        }
                    ]
                },
                content: [
                    {
                        style: 'contentTabla',
                        table: {
                            headerRows: 1,
                            widths: width_tabla_pdf,
                            body: detalle_tabla_pdf
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return 1
                              },
                              vLineWidth: function (i) {
                                return 1
                              },
                              hLineColor: function (i) {
                                return '#aaa'
                              },
                              vLineColor: function (i) {
                                return '#aaa'
                              },
                        }
                    }
                ],
                styles: {
                    subTitulo: {
                        fontSize: 10,
                        bold: true
                    },
                    headerTabla: {
                        fontSize: 7,
                        bold: true
                    },
                    contentTabla: {
                        fontSize: 8,
                    },
                },
            }
            
            let formato = this.formato.id
            let config = {
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`
            }

            if (formato == 1) {
                config = {
                    ...config,
                    archivo: config.archivo + '.pdf',
                    tipo: 'pdf',
                    content
                }
            } 

            _impresion2(config)
                .then(() => {
                    _this.datos_fijos()
                })
                .catch((error) => {
                    console.error('Error durante la impresión', error)
                    _this.datos_fijos()
                })
        },

        fecha_edit(obj) {
            return {
                ano_w: obj.ano_w.toString().padStart(4, '0'),
                mes_w: obj.mes_w.toString().padStart(2, '0'),
                dia_w: obj.dia_w.toString().padStart(2, '0'),
            }
        },
        buscar_restric(opcion) {
            return new Promise((resolve, reject) => {
                let admin = localStorage.Usuario
                postData({ datosh: `${datosEnvio()}${admin}|${opcion}|` },
                    get_url("APP/CONTAB/CON904.DLL"))
                    .then(resolve)
                    .catch(reject)
            })
        },
        ventana_tipo() {
            const _this = this;
            _ventanaDatos({
                titulo: "VENTANA TIPO CORRESPONDENCIA",
                columnas: ["codigo", "descripcion", "dias"],
                data: _this.tipos_corres,
                callback_esc: function () {
                    document.getElementById('tipo_COR304').focus()
                },
                callback: function (data) {
                    _this.reg.tipo_corres_w = data['codigo'];
                    _enterInput('#tipo_COR304');
                }
            });
        },
        ventana_dependencias() {
            const _this = this;
            _ventanaDatos({
                titulo: "VENTANA DE DEPENDENCIA CORRESP",
                columnas: ["codigo", "descripcion", "responsable", "cod_serco"],
                data: _this.dependencias,
                callback_esc: function () {
                    document.getElementById('dependencia_COR304').focus()
                },
                callback: function (data) {
                    _this.reg.dep_w = data['codigo'];
                    _enterInput('#dependencia_COR304');
                }
            });
        },
        ventana_terceros() {
            const _this = this;
            if (!_this.terceros) _this.validar_entidad()
            else {
                _ventanaDatos_lite_v2({
                    titulo: "VENTANA DE TERCEROS",
                    indice: ["COD", "NOMBRE", "TELEF", "CIUDAD", "ACT"],
                    mascara: [
                        {
                            COD: "Identificacion",
                            NOMBRE: "Nombre",
                            TELEF: "Telefono",
                            CIUDAD: "Ciudad",
                            ACT: "Actividad",
                        },
                    ],
                    data: _this.terceros,
                    minLength: 3,
                    callback_esc: function () {
                        document.getElementById('nit_entidad_COR304').focus()
                    },
                    callback: function (data) {
                        _this.reg.nit_w = data['COD'];
                        _enterInput('#nit_entidad_COR304');
                    }
                });
            }
        },
    }
})