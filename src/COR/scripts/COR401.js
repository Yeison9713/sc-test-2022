const { get, init_datos_w } = require('../../COR/scripts/COR.ctrl.js')

new Vue({
    el: '#COR401',
    data() {
        return {
            reg: {
                cont_w: null,
                ano_llave_w: null,
                datos_w: init_datos_w()
            },
            original: null,
            nit_usu: $_USUA_GLOBAL[0].NIT,
            format_manejo: null,
            format_procedencia: null,
            format_estado_inpt: null,

            terceros: null,
            dependencias_remit: null,
            tipos_corres: null,
            aux_corres: null,
            servicios: null,
            dependencias: null,
            centro_costos: null,
            correspondencia: null,

            monto_mask: null
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
    mounted() {
        this.monto_mask = new IMask(
            this.$refs.monto_input_COR401,
            { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
        )
    },
    created() {
        console.clear()
        _vm = this

        nombreOpcion('4-1 - Imprime correspondencia');
        _inputControl('reset');
        _inputControl('disabled');
        loader('show')
        this.get_json()
    },
    methods: {
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

            this.dato_1()
            loader('hide')

            let correspondencia = await get('correspondencia')
            this.correspondencia = correspondencia.depencias
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
        dato_1() {
            this.reset_form()

            let ano_num = this.fecha_num.ano_num
            this.reg.ano_llave_w = parseInt(ano_num) + 2000

            this.buscar_comprobante()
                .then(cont_w => {
                    this.reg.cont_w = cont_w
                    this.validar_anio_rad()
                })
                .catch(this.validar_anio_rad)
        },
        validar_anio_rad() {
            validarInputs({
                form: '#validar_anio_rad_COR401',
                orden: '1',
            },
                _toggleNav,
                this.validar_radicado
            )
        },
        validar_radicado() {
            validarInputs({
                form: '#validar_radicado_COR401',
                orden: '1',
            },
                this.validar_anio_rad,
                () => {
                    setTimeout(this.leer_correspondencia, 300)
                }
            )
        },
        leer_correspondencia() {
            const _this = this;
            let reg = _this.reg
            this.reg.datos_w = init_datos_w()

            let anio_corr = reg.ano_llave_w
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
                    _this.reg.cont_w = cont_w_format
                    _this.cambio(data)
                }).catch((err) => {
                    loader('hide')
                    setTimeout(_this.validar_radicado, 200)
                })
        },
        cambio(data) {
            const _this = this;

            this.original = JSON.parse(JSON.stringify(data))

            let fecha_w = {
                ano_w: data.fecha.substring(0, 4),
                mes_w: data.fecha.substring(4, 6),
                dia_w: data.fecha.substring(6, 8),
            }

            let hora = data.hora
            let hora_w = `${hora.substring(0, 2)}:${hora.substring(2, 4)}`

            let dptoremi = parseInt(data.dpto_remi) || 0
            let dptoremi_w = dptoremi.toString().padStart(5, '0')
            let dptoremi_busc = _this.dependencias_remit.find(el => el.codigo.padStart(5, '0') == dptoremi_w)

            let manejo_w = parseInt(data.manejo) || 1
            if (manejo_w == 1) _this.format_manejo = `1 - INFORMATIVO`
            else if (manejo_w == 2) _this.format_manejo = `2 - RESOLUTIVO`

            let proceden_w = parseInt(data.procedencia) || 1
            if (proceden_w == 1) _this.format_procedencia = `1 - EXTERNO`
            else if (proceden_w == 2) _this.format_procedencia = `2 - INTERNO`

            let tipo_corr = parseInt(data.tipo_corr) || 0
            let tipo_corres_w = tipo_corr.toString().padStart(2, '0')
            let tipo_corres_busc = _this.tipos_corres.find(el => el.codigo.padStart(2, '0') == tipo_corres_w)

            let cod_auxco = parseInt(data.cod_aux_cod) || 0
            let cod_auxco_w = cod_auxco.toString().padStart(3, '0')
            let cod_auxco_busc = _this.aux_corres.find(el => el.codigo.padStart(3, '0') == cod_auxco_w)

            let descrip_w = data.descripcion

            let serv = parseInt(data.cod_serco) || 0
            let serv_w = serv.toString().padStart(2, '0')
            let serv_busc = _this.servicios.find(el => el.codigo.padStart(2, '0') == serv_w)

            let dep = parseInt(data.cod_depen) || 0
            let dep_w = dep.toString().padStart(3, '0')
            let dep_busc = _this.dependencias.find(el => el.codigo.padStart(3, '0') == dep_w)

            let fol_w = data.folio
            let fold_w = data.folio_d

            let anex_w = data.anexo
            let tipo_anexo_w = data.tip_anex
            let otro_anexo_w = data.otr_anex

            let nro_fact_w = data.nro_fact

            let monto = parseFloat(data.monto) || 0
            _this.monto_mask.unmaskedValue = monto.toString()

            let fecha_fact_w = {
                ano_w: data.fecha_fact.substring(0, 2),
                mes_w: data.fecha_fact.substring(2, 4),
                dia_w: data.fecha_fact.substring(4, 6),
            }

            let fecha_entre_w = {
                ano_w: data.fecha_entr.substring(0, 2),
                mes_w: data.fecha_entr.substring(2, 4),
                dia_w: data.fecha_entr.substring(4, 6),
            }

            let centro_cos_w = data.centro_costo.trim().padStart(4, '0')
            let nro_guia_w = data.nro_guia
            let persentre_w = data.presente
            let observ_w = data.observacion.trim().enterPut()

            _this.format_estado_inpt = `${data.esta} - ${data.descrip_esta}`

            this.reg.datos_w = {
                ...this.reg.datos_w,
                fecha_w,
                hora_w,
                nit_w: parseInt(data.nit),
                dptoremi_w,
                manejo_w,
                proceden_w,
                tipo_corres_w,
                cod_auxco_w,
                descrip_w,
                serv_w,
                dep_w,
                fol_w,
                fold_w,
                anex_w,
                tipo_anexo_w,
                otro_anexo_w,
                nro_fact_w,
                fecha_fact_w,
                fecha_entre_w,
                centro_cos_w,
                nro_guia_w,
                persentre_w,
                observ_w
            }

            document.getElementById('nombre_remitente_COR401').value = data.descrip_ter || ''
            document.getElementById('descrip_depto_remit_COR401').value = dptoremi_busc ? dptoremi_busc.descripcion : ''
            document.getElementById('descrip_tipo_corr_COR401').value = tipo_corres_busc ? tipo_corres_busc.descripcion : ''
            document.getElementById('descrip_aux_corr_COR401').value = cod_auxco_busc ? cod_auxco_busc.descripcion : ''
            document.getElementById('descrip_servicio_COR401').value = serv_busc ? serv_busc.descripcion : ''
            document.getElementById('descrip_personal_COR401').value = dep_busc ? dep_busc.descripcion : ''
            _this.bb(data)
        },
        bb(data) {
            const _this = this;
            loader('hide')
            CON851P(
                '00',
                _this.validar_radicado,
                () => {
                    setTimeout(() => {
                        _this.mostrar_adjunto()
                    }, 300)
                }
            );
        },
        mostrar_adjunto() {
            const _this = this
            let ano_radicado = this.reg.ano_llave_w
            let radicado = this.reg.cont_w
            let nombre_archivo = `${ano_radicado}/${radicado}.PDF`
            let ruta = `${get_url("adjuntos/cor/")}${nombre_archivo}`
            child(`start ${ruta}`)
            _this.validar_radicado()
        },
        ventana_correspondencia() {
            const _this = this;
            _ventanaDatos({
                titulo: "VENTANA DE CORRESPONDENCIA",
                columnas: ["llave", "descrip_ter", "descrip_tipco", "fecha", "operdiri", "descrip_esta"],
                data: _this.correspondencia,
                callback_esc: function () {
                    document.getElementById('radicado_COR401').focus()
                },
                callback: function (data) {
                    _this.reg.cont_w = data['cont_llave'];
                    _this.reg.ano_llave_w = data['ano_llave'];
                    _enterInput('#radicado_COR401');
                }
            });
        },
        reset_form() {
            _inputControl('reset');
            _inputControl('disabled');
            this.reg.datos_w = init_datos_w()
        },
    },
})