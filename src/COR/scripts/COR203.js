const { get, enviar_correspondencia } = require('../../COR/scripts/COR.ctrl.js')

new Vue({
    el: '#COR203',
    data() {
        return {
            reg: {
                cont_w: null,
                ano_llave_w: null,
                datos_w: {}
            },
            personal_tabla: {},
            per_desc_tabla: {},
            per_oper_tabla: {},
            tramite_tabla: {},
            email_tabla: {},

            original: {},
            correspondencia: [],
            tipos_corres: [],
            dependencias: [],
            servicios: []
        }
    },
    computed: {
        fecha_num() {
            let fecha = $_USUA_GLOBAL[0].FECHALNK
            return {
                ano_num: fecha.substring(0, 2),
                mes_num: fecha.substring(2, 4),
                dia_num: fecha.substring(4, 6),
            }
        },
    },
    created() {
        console.clear()
        _vm = this

        nombreOpcion('2-3 - Traslado de correspondencia');
        _inputControl('reset');
        _inputControl('disabled');
        loader('show')
        this.get_json()
    },
    methods: {
        async get_json() {
            let tipos_corres = await get('tipos')
            this.tipos_corres = tipos_corres.tipos

            let servicios = await get('servicios')
            this.servicios = servicios.servicios

            let dependencias = await get('dependencias')
            this.dependencias = dependencias.depen_cor

            loader('hide')
            this.init_form()

            let correspondencia = await get('correspondencia')
            this.correspondencia = correspondencia.depencias
        },
        init_form() {
            let ano_num = this.fecha_num.ano_num
            this.reg = {
                cont_w: null,
                datos_w: {},
                ano_llave_w: parseInt(ano_num) + 2000
            }

            this.buscar_comprobante()
                .then(cont_w => {
                    this.reg.cont_w = cont_w
                    this.validar_anio_rad()
                })
                .catch(this.validar_anio_rad)
        },
        buscar_comprobante() {
            return new Promise((resolve, reject) => {
                postData({ datosh: `${datosEnvio()}R4` },
                    get_url("APP/CONTAB/CON007.DLL"))
                    .then(data => {
                        let res = data.split('|')
                        let consecutivo = parseInt(res[1]) || 0

                        resolve(consecutivo - 1)
                    })
                    .catch(reject)
            })
        },
        validar_anio_rad() {
            validarInputs({
                form: '#validar_anio_rad_COR203',
                orden: '1',
            },
                _toggleNav,
                this.validar_radicado
            )
        },
        validar_radicado() {
            validarInputs({
                form: '#validar_radicado_COR203',
                orden: '1',
            },
                this.validar_anio_rad,
                () => {
                    this.reset_tabla()
                    setTimeout(this.leer_correspondencia, 300)
                }
            )
        },
        leer_correspondencia() {
            const _this = this;
            let reg = _this.reg

            let anio_corr = reg.ano_llave_w || '0'
            let cont_w = reg.cont_w
            let cont_w_format = cont_w.toString().trim().padStart(6, '0')
            let llave_pon = anio_corr + cont_w_format

            loader('show')
            postData({
                datosh: datosEnvio(),
                paso: '2',
                novedad: '8',
                codigo: llave_pon
            }, get_url("APP/COR/CORR868.DLL"))
                .then(data => {
                    // console.log('Data ', data)
                    _this.reg.cont_w = cont_w_format
                    _this.cambio(data)
                }).catch((err) => {
                    loader('hide')
                    console.error('-> Error', err)
                    setTimeout(_this.validar_radicado, 200)
                })
        },
        cambio(data) {
            const _this = this;
            this.original = JSON.parse(JSON.stringify(data))

            let ano_w = parseInt(data.fecha.substring(0, 4))
            let mes_w = data.fecha.substring(4, 6)
            let dia_w = data.fecha.substring(6, 8)
            let fecha_format = `${ano_w}${mes_w}${dia_w}`
            let fecha_w = moment(fecha_format).format('DD/MM/YYYY')

            let hora = data.hora
            let hora_w = `${hora.substring(0, 2)}:${hora.substring(2, 4)}`

            let procedencia = parseInt(data.procedencia) || 1
            let proceden_w = null
            if (procedencia == 1) proceden_w = `1 - EXTERNO`
            else if (procedencia == 2) proceden_w = `2 - INTERNO`

            let tercero_w = `${data.nit} - ${data.descrip_ter}`

            let tipo_corr = parseInt(data.tipo_corr) || 0
            let tipo_corres_w = tipo_corr.toString().padStart(2, '0')
            let tipo_corres_busc = _this.tipos_corres.find(el => el.codigo.padStart(2, '0') == tipo_corres_w)
            let tipo_format = `${tipo_corres_w} - ${tipo_corres_busc.descripcion}`

            let descrip_w = data.descripcion

            let serv = data.cod_serco.trim()
            let serv_w = _this.servicios.find(el => el.codigo.padStart(2, '0') == serv)
            let serv_format = null
            if (serv_w) serv_format = `${serv_w.codigo} - ${serv_w.descripcion}`
            else serv_format = `${serv} - ***`

            let dep = data.cod_depen.trim()
            let dep_w = _this.dependencias.find(el => el.codigo.padStart(3, '0') == dep)
            let dep_format = null
            if (dep_w) dep_format = `${dep_w.codigo} - ${dep_w.descripcion} (${dep_w.correo})`
            else dep_format = `${dep} - *****`

            let folio_w = data.folio.trim()
            let folio_d_w = data.folio_d.trim()

            let anexo = parseInt(data.tip_anex) || 6
            let anexo_descrip = null
            if (anexo == 1) anexo_descrip = 'DISQUETTE'
            else if (anexo == 2) anexo_descrip = 'CD-R'
            else if (anexo == 3) anexo_descrip = 'DISCO DURO'
            else if (anexo == 4) anexo_descrip = 'USB'
            else if (anexo == 5) anexo_descrip = 'PC-CARDS'
            else if (anexo == 6) anexo_descrip = data.otr_anex
            let anexo_format = `${anexo} - ${anexo_descrip}`

            this.reg.datos_w = {
                fecha_w,
                hora_w,
                proceden_w,
                tercero_w,
                tipo_corres_w: tipo_format,
                descrip_w,
                serv_w: serv_format,
                dep_w: dep_format,
                folio_w,
                folio_d_w,
                anex_w: data.anexo,
                tipo_anexo_w: anexo_format,
            }

            let tabla_depen = data.tabla_depen
            tabla_depen.forEach((el, idx) => {
                let dependencia = el.depen
                if (dependencia.trim() && dependencia != 0) {
                    let index = (idx + 1).toString()
                    let id = `personal_${index}`

                    let busqueda = _this.dependencias.find(el => el.codigo.padStart(3, '0') == dependencia)
                    Vue.set(this.personal_tabla, id, dependencia)
                    Vue.set(this.per_desc_tabla, id, `${busqueda.descripcion} (${busqueda.correo})`)
                    Vue.set(this.per_oper_tabla, id, busqueda.oper)

                    let estado = el.esta
                    let est_descrip = null
                    if (estado == '1') est_descrip = 'INFORMATIVO'
                    else est_descrip = 'RESOLUTIVO'
                    Vue.set(_this.tramite_tabla, id, `${estado} - ${est_descrip}`)

                    Vue.set(_this.email_tabla, id, `N - NO`)
                }
            })


            loader('hide')
            _this.validar_personal(1)
        },
        validar_personal(item = 1) {
            const _this = this
            let actual = item
            // let siguiente = item + 1
            let anterior = item - 1

            validarInputs({
                form: '#personal_' + actual,
                orden: '1',
                event_f3: _this.confirmar
            },
                () => {
                    if (anterior == 0) _this.validar_radicado()
                    else _this.validar_personal(anterior)
                },
                () => {
                    let personal = 'personal_' + actual
                    let dep_w = _this.personal_tabla[personal] || ''
                    let dep_w_format = dep_w.padStart(3, '0')
                    _this.personal_tabla[personal] = dep_w_format

                    let busqueda = _this.dependencias.find(el => el.codigo.padStart(3, '0') == dep_w_format)
                    if (!busqueda) {
                        _this.validar_personal(actual)
                        Vue.set(_this.per_desc_tabla, personal, null)
                        Vue.set(_this.per_oper_tabla, personal, null)
                        Vue.set(_this.tramite_tabla, personal, null)
                        Vue.set(_this.email_tabla, personal, null)
                        CON851('01', '01', null, 'error', 'Advertencia');
                    } else if (!busqueda.correo) {
                        _this.validar_personal(actual)
                        Vue.set(_this.per_desc_tabla, personal, null)
                        Vue.set(_this.per_oper_tabla, personal, null)
                        Vue.set(_this.tramite_tabla, personal, null)
                        Vue.set(_this.email_tabla, personal, null)
                        CON851('01', 'El personal de destino no tiene correo electrónico.', null, 'error', 'Advertencia');
                    } else {
                        _this.per_desc_tabla[personal] = `${busqueda.descripcion} (${busqueda.correo})`
                        _this.per_oper_tabla[personal] = busqueda.oper

                        _this.validar_tramite(actual)
                    }
                }
            )
        },
        validar_tramite(item = 1) {
            const _this = this;
            let actual = item

            let personal = 'personal_' + actual
            let label = _this.tramite_tabla[personal] || ''
            let cod = label.split('-')[0]

            POPUP({
                titulo: "MANEJO",
                indices: [{ id: 'id', label: 'label' }],
                seleccion: cod.trim() || '',
                array: [
                    { id: 1, label: 'INFORMATIVO' },
                    { id: 2, label: 'RESOLUTIVO' },
                ],
                callback_f: () => {
                    _this.validar_personal(item)
                },
            }, (data) => {
                let descripcion = `${data.id} - ${data.label}`
                Vue.set(_this.tramite_tabla, personal, descripcion)
                setTimeout(() => {
                    if (item == 5) _this.confirmar()
                    else _this.validar_correo(actual)
                }, 300)
            })
        },
        validar_correo(item = 1) {
            const _this = this;
            let actual = item
            let siguiente = item + 1

            let personal = 'personal_' + actual
            let label = _this.email_tabla[personal] || ''
            let cod = label.split('-')[0]

            POPUP({
                titulo: "ENVIAR CORREO",
                indices: [{ id: 'id', label: 'label' }],
                seleccion: cod.trim() || 'S',
                teclaAlterna: true,
                array: [
                    { id: 'S', label: 'SI' },
                    { id: 'N', label: 'NO' },
                ],
                callback_f: () => {
                    _this.validar_tramite(item)
                },
            }, (data) => {
                let descripcion = `${data.id} - ${data.label}`
                Vue.set(_this.email_tabla, personal, descripcion)
                setTimeout(() => {
                    if (item == 5) _this.confirmar()
                    else _this.validar_personal(siguiente)
                }, 300)
            })
        },
        confirmar() {
            const _this = this
            let personal_cod = _this.personal_tabla
            let array_personal = Object.values(personal_cod)

            let tramites = _this.tramite_tabla
            let array_tramites = Object.values(tramites)

            if (array_personal.length == 0) {
                CON851('', 'Debe ingresar al menos un destino', null, 'error', 'Advertencia');
                this.validar_personal(1)
            } else if (array_personal.includes('000')) {
                this.validar_personal(1)
            } else if (array_tramites.length != array_tramites.length) {
                this.validar_personal(1)
            } else if (array_tramites.length == 0 || array_tramites.includes(null)) {
                CON851('', 'Completa el estado del personal de destino', null, 'error', 'Advertencia');
                this.validar_personal(1)
            } else {
                let personal_filtro = array_personal.filter(el => el && el.trim())
                let tramites_filtro = array_tramites.filter(el => el && el.trim())

                let email = _this.email_tabla
                let array_email = Object.values(email)
                let format_email = array_email.map(el => el ? el.split('-')[0].trim() : 'N')

                let personal_envio = {}

                let listado_email = []
                personal_filtro.forEach((el, idx) => {
                    if (el && el.trim()) {
                        let index = (idx + 1).toString().padStart(3, '0')
                        personal_envio['depend_tab_' + index] = el

                        let email = format_email[idx] || 'N'

                        if (email == 'S') listado_email.push(el)
                    }
                })

                let tramites = tramites_filtro.map(el => el.split('-')[0].trim())
                let tramites_envio = {}
                tramites.forEach((el, idx) => {
                    if (el && el.trim()) {
                        let index = (idx + 1).toString().padStart(3, '0')
                        tramites_envio['esta_tab_' + index] = el
                    }
                })

                let base = JSON.parse(JSON.stringify(_this.original))
                delete base.error_rips
                delete base.tabla_depen
                delete base.tabla_oper

                let datos_envio = {
                    ...base,
                    ...personal_envio,
                    ...tramites_envio
                }

                CON851P(
                    '01',
                    this.validar_personal,
                    () => {
                        _this.guardar(datos_envio, listado_email)
                    }
                );
            }
        },
        guardar(envio, listado_email) {
            const _this = this;
            const datos_envio = {
                datosh: datosEnvio(),
                novedad: '8',
                ...envio
            }

            let enviar_guardado = () => {
                postData(datos_envio,
                    get_url("APP/COR/CORR201.DLL"))
                    .then(data => {
                        loader('hide')
                        CON851('', 'Traslado realizado correctamente.', null, 'success', 'Correcto');
                        this.reset_tabla()
                        this.init_form()
                    })
                    .catch(err => {
                        loader('hide')
                        console.error('-> Error', err)
                        jAlert(
                            { titulo: 'Notificacion', mensaje: "Ha ocurrido un error guardando/modificado el radicado" },
                            _this.validar_personal
                        );
                    })
            }

            loader('show')
            if (listado_email.length > 0) {
                this.enviar_email(listado_email)
                    .then(() => {
                        // console.log('Datos envio', datos_envio)
                        enviar_guardado()
                    })
            } else {
                enviar_guardado()
            }

        },
        enviar_email(listado_email) {
            const _this = this;
            return new Promise((resolve, reject) => {
                let ano_radicado = _this.reg.ano_llave_w
                let cont_radicado = _this.reg.cont_w
                let nombre_archivo = `${ano_radicado}/${cont_radicado}.PDF`
                let listado = []


                listado_email.forEach(el => {
                    let personal = _this.dependencias.find(item => item.codigo.padStart(3, '0') == el)
                    if (personal) {
                        listado.push({
                            archivo: nombre_archivo,
                            correo: personal.correo
                        })
                    }
                })

                enviar_correspondencia(listado)
                    .then(resolve)
                    .catch(resolve)
            })
        },
        reset_tabla() {
            this.personal_tabla = {}
            this.per_desc_tabla = {}
            this.per_oper_tabla = {}
            this.tramite_tabla = {}
            this.email_tabla = {}
        },
        ventana_personal_dest(item) {
            const _this = this;
            let id = 'personal_' + item
            let input = 'inpt_personal_' + item

            _ventanaDatos({
                titulo: "VENTANA DE DEPENDENCIA CORRESP",
                columnas: ["codigo", "descripcion", "cod_serco"],
                data: _this.dependencias,
                callback_esc: function () {
                    document.getElementById(input).focus()
                },
                callback: function (data) {
                    Vue.set(_this.personal_tabla, id, data['codigo'])
                    _enterInput('#' + input);
                }
            });
        },
        ventana_correspondencia() {
            const _this = this;
            _ventanaDatos({
                titulo: "VENTANA DE CORRESPONDENCIA",
                columnas: ["llave", "descrip_ter", "descrip_tipco", "fecha", "operdiri", "descrip_esta"],
                data: _this.correspondencia,
                callback_esc: function () {
                    document.getElementById('radicado_COR203').focus()
                },
                callback: function (data) {
                    _this.reg.cont_w = data['cont_llave'];
                    _this.reg.ano_llave_w = data['ano_llave'];
                    _enterInput('#radicado_COR203');
                }
            });
        },
    }
})