const { get, init_resp_w, CORR405P } = require('../../COR/scripts/COR.ctrl.js')

new Vue({
    el: '#COR404',
    data() {
        return {
            novedad: {},
            reg: init_resp_w(),
            reg_radicado: {
                cont_llave: null,
                ano_llave: null,
                esta: null,
            },
            original: null,
            sw_paso: 0,

            terceros: [],
            dependencias_remit: [],
            tipos_corres: [],
            aux_corres: [],
            servicios: [],
            dependencias: [],
            macros: [],

            format_estado_inpt: null,
            format_procedencia: null
        }
    },
    computed: {
        fecha_num() {
            let fecha = $_USUA_GLOBAL[0].FECHALNK
            return {
                ano_num: moment().format('YYYY'),
                mes_num: fecha.substring(2, 4),
                dia_num: fecha.substring(4, 6),
            }
        },
    },
    created() {
        console.clear();
        _vm = this

        nombreOpcion('4-4 - Reimprime respuesta');
        _inputControl('reset');
        _inputControl('disabled');
        loader('show');
        this.get_json();
    },
    methods: {
        dato_1() {
            this.reset_form();
            this.validar_anio_res()
        },
        validar_anio_res() {
            const _this = this
            validarInputs({
                form: '#validar_anio_res_COR404',
                orden: '1',
            },
                _toggleNav,
                () => {
                    let ano_res = this.reg.ano_llave_w || ''
                    this.reg.ano_llave_w = ano_res.toString().padStart(4, '0')

                    _this.validar_cont_res()
                }
            )
        },
        validar_cont_res() {
            const _this = this
            validarInputs({
                form: '#validar_cont_res_COR404',
                orden: '1',
            },
                _this.validar_anio_res,
                () => {
                    let cont_res = this.reg.cont_w || ''
                    this.reg.cont_w = cont_res.toString().padStart(6, '0')
                    _this.leer_resp_correspondencia()
                }
            )
        },
        leer_resp_correspondencia() {
            const _this = this;
            let novedad = '8'

            let ano_llave = _this.reg.ano_llave_w
            let cont = _this.reg.cont_w
            let llave_w = ano_llave + cont

            loader('show')
            postData({
                datosh: datosEnvio(),
                paso: '2',
                novedad,
                codigo: llave_w
            }, get_url("APP/COR/CORR864.DLL"))
                .then(data => {
                    loader('hide')
                    console.log('Respuesta', data)
                    _this.original = data
                    _this.cambio(data)
                }).catch((err) => {
                    loader('hide')
                    console.error('-> Error', err)
                    setTimeout(_this.validar_cont_res, 200)
                })
        },
        cambio(data) {
            const _this = this;
            let reg = JSON.parse(JSON.stringify(_this.original))

            let llave_rad = reg.llave_radi
            let ano_rad = llave_rad.substring(0, 4)
            let cont_rad = llave_rad.substring(4, 10)
            _this.reg_radicado = {
                cont_llave: cont_rad,
                ano_llave: ano_rad,
                fecha: reg.fecha_radi,
                hora: reg.hora_radi,
                descripcion: reg.descripcion,
            }

            let sw_radi_w = reg.sw_radi

            let nit_w = parseInt(reg.nit)
            let busqueda_nit = _this.terceros.find(el => el.COD == nit_w)
            document.getElementById('nombre_remitente_COR404').value = busqueda_nit ? busqueda_nit.NOMBRE : ''

            let dptoremi = parseInt(reg.cod_unifun)
            let dptoremi_w = dptoremi.toString().padStart(5, '0')
            let busqueda_dpto = _this.dependencias_remit.find(el => el.codigo.padStart(5, '0') == dptoremi_w)
            document.getElementById('descrip_depto_remit_COR404').value = busqueda_dpto ? busqueda_dpto.descripcion : ''

            let procedencia = parseInt(reg.procedencia)
            let proceden_w = procedencia.toString()
            if (procedencia == 1) _this.format_procedencia = '1 - EXTERNO'
            else if (procedencia == 2) _this.format_procedencia = '2 - INTERNO'

            let tipo_corres = parseInt(reg.tipo_corr)
            let tipo_corres_w = tipo_corres.toString().padStart(2, '0')
            let busqueda_tipo = _this.tipos_corres.find(el => el.codigo.padStart(2, '0') == tipo_corres_w)
            document.getElementById('descrip_tipo_corr_COR404').value = busqueda_tipo ? busqueda_tipo.descripcion : ''

            let cod_aux = parseInt(reg.cod_auxco)
            let cod_auxco_w = cod_aux.toString().padStart(3, '0')
            let busqueda_aux = _this.aux_corres.find(el => el.codigo.padStart(3, '0') == cod_auxco_w)
            document.getElementById('descrip_aux_corr_COR404').value = busqueda_aux ? busqueda_aux.descripcion : ''

            let serv = parseInt(reg.cod_serco)
            let serv_w = serv.toString().padStart(2, '0')
            let busqueda_serv = _this.servicios.find(el => el.codigo.padStart(2, '0') == serv_w)
            document.getElementById('descrip_servicio_COR404').value = busqueda_serv ? busqueda_serv.descripcion : ''

            let dep = parseInt(reg.cod_depen)
            let dep_w = dep.toString().padStart(3, '0')
            let busqueda_dep = _this.dependencias.find(el => el.codigo.padStart(3, '0') == dep_w)
            document.getElementById('descrip_personal_COR404').value = busqueda_dep ? busqueda_dep.descripcion : ''

            let cl_macro_w = reg.llave_macro.substring(0, 2)
            let codigo_macro_w = reg.llave_macro.substring(2, 8)

            let fecha_w = moment(reg.fecha).format('YYYY-MM-DD')
            let hora_w = moment(reg.hora).format('HH:mm')

            _this.format_estado_inpt = `${reg.esta} - ${reg.descrip_esta}`

            _this.reg = {
                ..._this.reg,
                sw_radi_w,
                nit_w,
                dptoremi_w,
                proceden_w,
                tipo_corres_w,
                cod_auxco_w,
                serv_w,
                dep_w,
                asunto_w: reg.asunto,
                cl_macro_w,
                codigo_macro_w,
                fecha_w,
                hora_w,
                firma_w: reg.firma,
                respon_w: reg.responsable,
                cargo_w: reg.cargo
            }

            _this.bb(data)
        },
        bb(data) {
            const _this = this;
            loader('hide')
            CON851P(
                '00',
                _this.dato_1,
                () => {
                    setTimeout(() => {
                        _this.impresion(data)
                    }, 300)
                }
            );
        },
        impresion(data) {
            let descrip_responsable = document.getElementById('descrip_personal_COR404').value
            let descrip_destino = document.getElementById('nombre_remitente_COR404').value

            let fecha_format = moment(data.fecha).format('MMM DD/YYYY')

            let hora_format = `${data.hora.substring(0, 2)}:${data.hora.substring(2, 4)}`

            let dato_impresion = {
                ...data,
                descrip_responsable,
                descrip_destino,
                fecha_format,
                hora_format
            }

            loader('show')
            CORR405P(dato_impresion)
                .then(() => {
                    loader('hide')
                    this.dato_1()
                })
        },
        reset_form() {
            this.sw_paso = 0
            this.reg = init_resp_w()
            this.reg_radicado = {
                cont_llave: null,
                ano_llave: null,
                esta: null,
            }

            this.format_procedencia = null
            this.format_estado_inpt = null
            _inputControl('reset');
        },
        async get_json() {
            let dependencias_remit = await get('dependencias_remit')
            this.dependencias_remit = dependencias_remit.remitentes

            let tipos_corres = await get('tipos')
            this.tipos_corres = tipos_corres.tipos

            let aux_corres = await get('aux_tipos')
            this.aux_corres = aux_corres.aux_tipo_corr

            let servicios = await get('servicios')
            this.servicios = servicios.servicios

            let dependencias = await get('dependencias')
            this.dependencias = dependencias.depen_cor

            let macros = await get('macros')
            this.macros = macros.macros_corr

            loader('hide');
            this.dato_1()

            let terceros = await get('terceros')
            this.terceros = terceros.TERCEROS

            console.log('-> Carga terminada')
        },
    }
})