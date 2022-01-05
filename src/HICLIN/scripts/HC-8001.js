// CITOLOGIA TOMA Y CONTROL - DAVID.M - 10-02-2021

const { getObjRegHC } = require('../../HICLIN/scripts/reg_hc.js');
const { grabarDetalles } = require('../../HICLIN/scripts/reg_dethc.js');
const { grabarDetallesText } = require('../../HICLIN/scripts/reg_dethc.js');
const { detallesHc } = require('../../HICLIN/scripts/reg_dethc.js');

new Vue({
    el: "#HC8001",
    data: {
        iniciales: {
            año: '',
            mes: '',
            dia: '',
            hr: '',
            mn: '',
            medico: '',
            descripMedico: '',
            consultando: '',
            ano_prox_cita: 0,
            mes_prox_cita: 0,
            dia_prox_cita: 0,
            fecha_regla_w: {},
            fecha_citol_w: {}
        },

        dato_8001: detallesHc.WS_8001(),

        dato_4040: {
            gineco_esq_w: {
                gestaciones_esq_w: 0,
                partos_esq_w: 0,
                cesareas_esq_w: 0,
                gine_vivos_esq_w: 0,
                partos_termino_esq_w: 0,
                partos_prematuro_esq_w: 0,
                abortos_esq_w: 0,
                fecha_regla_esq_w: 0,
                fecha_citol_esq_w: 0
            },

            obstetric_esq_w: {
                lactancia_esq_w: ''
            }
        },
        hcprc: getObjRegHC(),
        fecha_act: moment().format("YYYYMMDD"),
        hora_act: moment().format("HHmm"),
        nit_usu: $_USUA_GLOBAL[0].NIT,
        nro_ult_comp: '',
        edad_hc_w: 0,
        array_respuesta: _tipoJsonHc('respuesta'),
        array_parentesco: _tipoJsonHc('parentesco'),
        array_aspecto_cuell: _tipoJsonHc('aspecto_cuell'),
        embarazo: [
            { COD: '1', DESCRIP: 'EMBARAZO PRIMER TRIMESTRE' },
            { COD: '2', DESCRIP: 'EMBARAZO SEGUNDO TRIMESTRE' },
            { COD: '3', DESCRIP: 'EMBARAZO TERCER TRIMESTRE' },
            { COD: '4', DESCRIP: 'NO ESTA EMBARAZADA' },
            { COD: '9', DESCRIP: 'NO APLICA' },
        ],
        params_hc890h: {
            estado: false,
            pregunta: 0,
            ciudades: [],
            paises: []
        },
        params_hc890d: {
            estado: false,
            unserv: null,
            finalidad: null,
            sexo: null,
        },
        params_creatinina: {
            estado: false
        },
        datos_creatinina: {},
        covid19: getObjRegHC().covid19,
        formats: {},
        entidades: [],
        especialidades: [],
        enfermedades: [],
        analisis: '',
        plan: '',
        flagSalir: false,
        flagVolver: false,
        edadMaxW: 0,
        edadMinW: 0,
        form_sintomatico: {
            sintom_resp: null,
            sintom_piel: null,
            contacto_lepra: null,
            victi_maltrato: null,
            victi_violencia: null,
            enfer_mental: null,
            enfer_its: null,
            cual_its: null,
            trata_its: null,
            cancer_seno: null,
            cancer_cervis: null,
            edu_autoexa_seno: null,
            citologia_previa: null,
            fecha_cito_previa: null,
            resul_cito_previa: null,
            fecha_ult_mamo: null,
        },
        mostrarSintomaticos: false,
        reg_paci: $_REG_PACI,
        array_planificacion: _tipoJsonHc('planific'),
        array_causa: _tipoJsonHc('causa'),
        array_atiende: _tipoJsonHc('atiende'),
        array_finalid: _tipoJsonHc('finalid'),
        array_tipo_diag: _tipoJsonHc('tipo_diagnostico'),
        array_salida: _tipoJsonHc('salida'),
        detalles: []
    },
    components: {
        covid19: component_hc890h,
        sintomaticos: component_hc890d,
        creatinina: require("../../HICLIN/scripts/HC890A.vue.js")
    },
    async created() {
        loader("show")
        _inputControl("disabled")
        _inputControl("reset")
        nombreOpcion('Historia Clinica Citologia Toma y Control')
        $this = this
        await this.revisarDato()
    },
    watch: {
        'flagSalir': (val) => {
            if (val) _regresar_menuhis()
        },

        'dato_8001.dato_per.otros_antec_per': function(val) {
            this.dato_8001.dato_per.otros_antec_per = val.replaceEsp()
        },

        'dato_8001.dato_soc_cul.cual_apoy_social': function(val) {
            this.dato_8001.dato_soc_cul.cual_apoy_social = val.replaceEsp()
        },

        'dato_8001.dato_soc_cul.que_trabajo': function(val) {
            this.dato_8001.dato_soc_cul.que_trabajo = val.replaceEsp()
        },

        'dato_8001.dato_soc_cul.cual_sustacias': function(val) {
            this.dato_8001.dato_soc_cul.cual_sustacias = val.replaceEsp()
        },

        'dato_8001.especuloscopia.otro_aspecto': function(val) {
            this.dato_8001.especuloscopia.otro_aspecto = val.replaceEsp()
        },

        'dato_8001.recepcion_entrega.resultado': function(val) {
            this.dato_8001.recepcion_entrega.resultado = val.replaceEsp()
        },

        'dato_8001.recepcion_entrega.educacion': function(val) {
            this.dato_8001.recepcion_entrega.educacion = val.enterPut().replaceEsp()
        },

        'dato_8001.recepcion_entrega.seguimiento': function(val) {
            this.dato_8001.recepcion_entrega.seguimiento = val.enterPut().replaceEsp()
        },

        'dato_8001.recepcion_entrega.descripcion': function(val) {
            this.dato_8001.recepcion_entrega.descripcion = val.enterPut().replaceEsp()
        },

        'dato_8001.control.conduc_manejo': function(val) {
            this.dato_8001.control.conduc_manejo = val.enterPut().replaceEsp()
        },

        'dato_8001.control.aspect_geni': function(val) {
            this.dato_8001.control.aspect_geni = val.enterPut().replaceEsp()
        },

        'dato_8001.control.flujo_car': function(val) {
            this.dato_8001.control.flujo_car = val.enterPut().replaceEsp()
        },

        'dato_8001.control.educa_prev': function(val) {
            this.dato_8001.control.educa_prev = val.enterPut().replaceEsp()
        },

        'dato_8001.control.observ_contr': function(val) {
            this.dato_8001.control.observ_contr = val.enterPut().replaceEsp()
        },

        'analisis': function(val) {
            this.analisis = val.enterPut().replaceEsp()
        },

        'plan': function(val) {
            this.plan = val.enterPut().replaceEsp()
        },

        'hcprc.rips.remitido': function(val) {
            this.hcprc.rips.remitido = val.replaceEsp()
        },
    },
    computed: {
        mostrarCovid() {
            switch (this.hcprc.serv) {
                case '01':
                case '02':
                case '08':
                case '09':
                case '63':
                    return true;
            }
        },

        fecha_regla_w() {
            console.log(this.dato_4040.gineco_esq_w.fecha_regla_esq_w, 'FECHA')
            return getObjectDate(this.dato_4040.gineco_esq_w.fecha_regla_esq_w)
        },

        fecha_citol_w() {
            return getObjectDate(this.dato_4040.gineco_esq_w.fecha_citol_esq_w)
        },

        descrip_embarazo() {
            let busqueda = this.embarazo.find(el => parseInt(el.COD) == parseInt(this.hcprc.rips.embarazo))
            return busqueda ? busqueda.DESCRIP : ''
        },

        descrip_metodo_planif() {
            let plan = this.array_planificacion.find(el => el.COD == this.hcprc.planific)
            return plan ? plan.DESCRIP : ''
        },

        descrip_aspecto_cuell() {
            let aspecto = this.array_aspecto_cuell.find(el => el.COD == this.dato_8001.especuloscopia.aspecto_cuell)
            return aspecto ? aspecto.DESCRIP : ''
        },

        descrip_ips_lect() {
            let ips = this.entidades.find(el => el['COD-ENT'].trim() == this.dato_8001.recepcion_entrega.ips_lect.trim())
            return ips ? ips['NOMBRE-ENT'] : ''
        },

        info_profesional() {
            return $_REG_PROF ? $_REG_PROF.IDENTIFICACION + '  -  ' + $_REG_PROF.NOMBRE : ''
        },

        descrip_especialidad() {
            let espec = this.especialidades.find(el => el.CODIGO.trim() == this.dato_8001.control.remision_cod)
            return espec ? espec.NOMBRE : ''
        },

        descrip_atiende() {
            let busqueda = this.array_atiende.find(el => el.COD.trim() == this.hcprc.rips.atiende)
            return busqueda ? busqueda.DESCRIP : ''
        },

        descrip_causa() {
            let busqueda = this.array_causa.find(el => el.COD.trim() == this.hcprc.rips.causa)
            return busqueda ? busqueda.DESCRIP : ''
        },

        descrip_tipo_diag() {
            let busqueda = this.array_tipo_diag.find(el => el.COD.trim() == this.hcprc.rips.tipo_diag)
            return busqueda ? busqueda.DESCRIP : ''
        },

        descrip_finalid() {
            let busqueda = this.array_finalid.find(el => el.COD.trim() == this.hcprc.rips.finalid)
            return busqueda ? busqueda.DESCRIP : ''
        },

        descrip_estado_sal() {
            let busqueda = this.array_salida.find(el => el.COD.trim() == this.hcprc.rips.estado_sal)
            return busqueda ? busqueda.DESCRIP : ''
        },

        descrip_diag_muer() {
            let busqueda = this.enfermedades.find(el => el.COD_ENF.trim() == this.hcprc.cierre.diag_muer)
            return busqueda ? busqueda.NOMBRE_ENF : ''
        }
    },
    methods: {
        validar_formato_fam(formato) {
            let x = this.array_respuesta.find(el => el.COD == this.dato_8001.dato_fam[formato]);
            let descripcion = x ? x.DESCRIP : ''
            Vue.set(this.formats, formato, descripcion)
        },

        validar_formato_per(formato) {
            let x = this.array_respuesta.find(el => el.COD == this.dato_8001.dato_per[formato]);
            let descripcion = x ? x.DESCRIP : ''
            Vue.set(this.formats, formato, descripcion)
        },

        async revisarDato() {
            switch ($_REG_HC.edad_hc.unid_edad) {
                case 'D':
                    this.edad_hc_w = 1;
                    break;
                case 'M':
                    this.edad_hc_w = 2;
                    break;
                case 'A':
                    this.edad_hc_w = 3;
                    break;
                default:
                    this.edad_hc_w = 0;
                    break;
            }

            this.edad_hc_w += $_REG_HC.edad_hc.vlr_edad.toString().padStart(3, '0')

            await this.abrirArchivos()

            this.hcprc.serv = $_REG_HC.serv_hc;
            this.hcprc.unid_edad = $_REG_HC.edad_hc.unid_edad
            this.hcprc.vlr_edad = cerosIzq($_REG_HC.edad_hc.vlr_edad.toString(), 3)
            this.hcprc.edad_dias = SC_DIAS($_REG_PACI.NACIM, this.fecha_act)
            this.hcprc.med = $_REG_PROF.IDENTIFICACION
        },

        async pantalla_01() {
            loader("hide")

            this.hcprc.med = $_REG_PROF.IDENTIFICACION
            this.hcprc.descrip_med = $_REG_PROF.NOMBRE

            this.iniciales.año = this.fecha_act.substring(0, 4)
            this.iniciales.mes = this.fecha_act.substring(4, 6)
            this.iniciales.dia = this.fecha_act.substring(6, 8)

            this.iniciales.hr = this.hora_act.substring(0, 2)
            this.iniciales.mn = this.hora_act.substring(2, 4)

            this.iniciales.folio = this.hcprc.llave.substring(15, 23)

            if (this.dato_8001.tipo == 1) {
                this.tipo_encabezado = 'CITOL. PRIMERA'
            } else {
                this.tipo_encabezado = 'CONTROL CITOL.'
            }

            await postData({ datosh: datosEnvio() + $_REG_HC.serv_hc + '|' }, get_url("APP/SALUD/SER873-1.DLL"))
                .then(async(data) => {
                    data = data.UNSERV
                    this.hcprc.descrip_serv = data.DESCRIP
                })
                .catch((err) => {
                    CON851('', 'Error consultando unidades de servicio', null, 'error', 'error')
                    console.log(err)
                })

            this.datoHipertensionFam()
        },

        // antecedentes familiares

        async datoHipertensionFam() {
            if (this.dato_8001.dato_fam.hiper_fam.toString().trim() == '') this.dato_8001.dato_fam.hiper_fam = 2

            validarInputs({
                form: '#hiper_fam'
            }, () => {
                this.salir()
            }, () => {
                var hiper = this.dato_8001.dato_fam.hiper_fam
                if (hiper == 1 || hiper == 2 || hiper == 3) {
                    if (hiper == 1) {
                        this.parentescoAntec('paren_hiper_fam', 'datoHipertensionFam', 'datoDiabetesFam')
                    } else {
                        this.dato_8001.dato_fam.paren_hiper_fam = ''
                        this.datoDiabetesFam()
                    }
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoHipertensionFam()
                }
            })
        },

        async datoDiabetesFam() {
            if (this.dato_8001.dato_fam.diabet_fam.toString().trim() == '') this.dato_8001.dato_fam.diabet_fam = 2

            validarInputs({
                form: '#diabet_fam'
            }, () => {
                this.datoHipertensionFam()
            }, () => {
                var diabet = this.dato_8001.dato_fam.diabet_fam
                if (diabet == 1 || diabet == 2 || diabet == 3) {
                    if (diabet == 1) {
                        this.parentescoAntec('paren_diabet_fam', 'datoHipertensionFam', 'datoCardiopatFam')
                    } else {
                        this.dato_8001.dato_fam.paren_diabet_fam = ''
                        this.datoCardiopatFam()
                    }
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoDiabetesFam()
                }
            })
        },

        async datoCardiopatFam() {
            if (this.dato_8001.dato_fam.cardiopat_fam.toString().trim() == '') this.dato_8001.dato_fam.cardiopat_fam = 2

            validarInputs({
                form: '#cardiopat_fam'
            }, () => {
                this.datoDiabetesFam()
            }, () => {
                var cardio = this.dato_8001.dato_fam.cardiopat_fam
                if (cardio == 1 || cardio == 2 || cardio == 3) {
                    if (cardio == 1) {
                        this.parentescoAntec('paren_cardiopat_fam', 'datoDiabetesFam', 'datoCancerCuellFam')
                    } else {
                        this.dato_8001.dato_fam.paren_cardiopat_fam = ''
                        this.datoCancerCuellFam()
                    }
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCardiopatFam()
                }
            })
        },

        async datoCancerCuellFam() {
            if (this.dato_8001.dato_fam.can_cuell_fam.toString().trim() == '') this.dato_8001.dato_fam.can_cuell_fam = 2

            validarInputs({
                form: '#can_cuell_fam'
            }, () => {
                this.datoCardiopatFam()
            }, () => {
                var cuell = this.dato_8001.dato_fam.can_cuell_fam
                if (cuell == 1 || cuell == 2 || cuell == 3) {
                    if (cuell == 1) {
                        this.parentescoAntec('paren_can_cuell_fam', 'datoCardiopatFam', 'datoCancerMamaFam')
                    } else {
                        this.dato_8001.dato_fam.paren_can_cuell_fam = ''
                        this.datoCancerMamaFam()
                    }
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCancerCuellFam()
                }
            })
        },

        async datoCancerMamaFam() {
            if (this.dato_8001.dato_fam.can_mama_fam.toString().trim() == '') this.dato_8001.dato_fam.can_mama_fam = 2

            validarInputs({
                form: '#can_mama_fam'
            }, () => {
                this.datoCancerCuellFam()
            }, () => {
                var mama = this.dato_8001.dato_fam.can_mama_fam
                if (mama == 1 || mama == 2 || mama == 3) {
                    if (mama == 1) {
                        this.parentescoAntec('paren_can_mama_fam', 'datoCancerCuellFam', 'datoOtroCancerFam')
                    } else {
                        this.dato_8001.dato_fam.paren_can_mama_fam = ''
                        this.datoOtroCancerFam()
                    }
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCancerMamaFam()
                }
            })
        },

        async datoOtroCancerFam() {
            if (this.dato_8001.dato_fam.otro_can_fam.toString().trim() == '') this.dato_8001.dato_fam.otro_can_fam = 2

            validarInputs({
                form: '#otro_can_fam'
            }, () => {
                this.datoCancerMamaFam()
            }, () => {
                var otro = this.dato_8001.dato_fam.otro_can_fam
                if (otro == 1 || otro == 2 || otro == 3) {
                    if (otro == 1) {
                        this.parentescoAntec('paren_otro_can_fam', 'datoCancerMamaFam', 'datoHipertensionPer')
                    } else {
                        this.dato_8001.dato_fam.paren_otro_can_fam = ''
                        this.datoHipertensionPer()
                    }
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoOtroCancerFam()
                }
            })
        },

        // antecedentes personales

        datoHipertensionPer() {
            if (this.dato_8001.dato_per.hiper_per.toString().trim() == '') this.dato_8001.dato_per.hiper_per = 2

            validarInputs({
                form: '#hiper_per'
            }, () => {
                this.datoOtroCancerFam()
            }, () => {
                var dato = this.dato_8001.dato_per.hiper_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoDiabetesPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoHipertensionPer()
                }
            })
        },

        datoDiabetesPer() {
            if (this.dato_8001.dato_per.diabet_per.toString().trim() == '') this.dato_8001.dato_per.diabet_per = 2

            validarInputs({
                form: '#diabet_per'
            }, () => {
                this.datoHipertensionPer()
            }, () => {
                var dato = this.dato_8001.dato_per.diabet_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoTumoresPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoDiabetesPer()
                }
            })
        },

        datoTumoresPer() {
            if (this.dato_8001.dato_per.tumores_per.toString().trim() == '') this.dato_8001.dato_per.tumores_per = 2

            validarInputs({
                form: '#tumores_per'
            }, () => {
                this.datoDiabetesPer()
            }, () => {
                var dato = this.dato_8001.dato_per.tumores_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoInfecPelviPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoTumoresPer()
                }
            })
        },

        datoInfecPelviPer() {
            if (this.dato_8001.dato_per.infec_pelvi_per.toString().trim() == '') this.dato_8001.dato_per.infec_pelvi_per = 2

            validarInputs({
                form: '#infec_pelvi_per'
            }, () => {
                this.datoTumoresPer()
            }, () => {
                var dato = this.dato_8001.dato_per.infec_pelvi_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoInfecCerviPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoInfecPelviPer()
                }
            })
        },

        datoInfecCerviPer() {
            if (this.dato_8001.dato_per.infec_cervi_per.toString().trim() == '') this.dato_8001.dato_per.infec_cervi_per = 2

            validarInputs({
                form: '#infec_cervi_per'
            }, () => {
                this.datoInfecPelviPer()
            }, () => {
                var dato = this.dato_8001.dato_per.infec_cervi_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoFlujoVagPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoInfecCerviPer()
                }
            })
        },

        datoFlujoVagPer() {
            if (this.dato_8001.dato_per.flujo_vag_per.toString().trim() == '') this.dato_8001.dato_per.flujo_vag_per = 2

            validarInputs({
                form: '#flujo_vag_per'
            }, () => {
                this.datoInfecCerviPer()
            }, () => {
                var dato = this.dato_8001.dato_per.flujo_vag_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoCanCuellPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoFlujoVagPer()
                }
            })
        },

        datoCanCuellPer() {
            if (this.dato_8001.dato_per.can_cuell_per.toString().trim() == '') this.dato_8001.dato_per.can_cuell_per = 2

            validarInputs({
                form: '#can_cuell_per'
            }, () => {
                this.datoFlujoVagPer()
            }, () => {
                var dato = this.dato_8001.dato_per.can_cuell_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoCanMamaPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCanCuellPer()
                }
            })
        },

        datoCanMamaPer() {
            if (this.dato_8001.dato_per.can_mama_per.toString().trim() == '') this.dato_8001.dato_per.can_mama_per = 2

            validarInputs({
                form: '#can_mama_per'
            }, () => {
                this.datoCanCuellPer()
            }, () => {
                var dato = this.dato_8001.dato_per.can_mama_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoFumaPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCanMamaPer()
                }
            })
        },

        datoFumaPer() {
            if (this.dato_8001.dato_per.fuma_per.toString().trim() == '') this.dato_8001.dato_per.fuma_per = 2

            validarInputs({
                form: '#fuma_per'
            }, () => {
                this.datoCanMamaPer()
            }, () => {
                var dato = this.dato_8001.dato_per.fuma_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoViolGenPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoFumaPer()
                }
            })
        },

        datoViolGenPer() {
            if (this.dato_8001.dato_per.viol_gen_per.toString().trim() == '') this.dato_8001.dato_per.viol_gen_per = 2

            validarInputs({
                form: '#viol_gen_per'
            }, () => {
                this.datoFumaPer()
            }, () => {
                var dato = this.dato_8001.dato_per.viol_gen_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoDiabetesPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoViolGenPer()
                }
            })
        },

        datoViolGenPer() {
            if (this.dato_8001.dato_per.viol_gen_per.toString().trim() == '') this.dato_8001.dato_per.viol_gen_per = 2

            validarInputs({
                form: '#viol_gen_per'
            }, () => {
                this.datoFumaPer()
            }, () => {
                var dato = this.dato_8001.dato_per.viol_gen_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoSangradoVagPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoViolGenPer()
                }
            })
        },

        datoSangradoVagPer() {
            if (this.dato_8001.dato_per.sangrado_vag_per.toString().trim() == '') this.dato_8001.dato_per.sangrado_vag_per = 2

            validarInputs({
                form: '#sangrado_vag_per'
            }, () => {
                this.datoViolGenPer()
            }, () => {
                var dato = this.dato_8001.dato_per.sangrado_vag_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoCirugPelPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoSangradoVagPer()
                }
            })
        },

        datoCirugPelPer() {
            if (this.dato_8001.dato_per.cirug_pel_per.toString().trim() == '') this.dato_8001.dato_per.cirug_pel_per = 2

            validarInputs({
                form: '#cirug_pel_per'
            }, () => {
                this.datoSangradoVagPer()
            }, () => {
                var dato = this.dato_8001.dato_per.cirug_pel_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoCrioterapiaPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCirugPelPer()
                }
            })
        },

        datoCrioterapiaPer() {
            if (this.dato_8001.dato_per.crioterapia_per.toString().trim() == '') this.dato_8001.dato_per.crioterapia_per = 2

            validarInputs({
                form: '#crioterapia_per'
            }, () => {
                this.datoCirugPelPer()
            }, () => {
                var dato = this.dato_8001.dato_per.crioterapia_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoRadioTerapiaPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCrioterapiaPer()
                }
            })
        },

        datoRadioTerapiaPer() {
            if (this.dato_8001.dato_per.radioterapia_per.toString().trim() == '') this.dato_8001.dato_per.radioterapia_per = 2

            validarInputs({
                form: '#radioterapia_per'
            }, () => {
                this.datoCrioterapiaPer()
            }, () => {
                var dato = this.dato_8001.dato_per.radioterapia_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoHisterectomiaPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoRadioTerapiaPer()
                }
            })
        },

        datoHisterectomiaPer() {
            if (this.dato_8001.dato_per.histerectomia_per.toString().trim() == '') this.dato_8001.dato_per.histerectomia_per = 2

            validarInputs({
                form: '#histerectomia_per'
            }, () => {
                this.datoRadioTerapiaPer()
            }, () => {
                var dato = this.dato_8001.dato_per.histerectomia_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoConizacionPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoHisterectomiaPer()
                }
            })
        },

        datoConizacionPer() {
            if (this.dato_8001.dato_per.conizacion_per.toString().trim() == '') this.dato_8001.dato_per.conizacion_per = 2

            validarInputs({
                form: '#conizacion_per'
            }, () => {
                this.datoHisterectomiaPer()
            }, () => {
                var dato = this.dato_8001.dato_per.conizacion_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoExeresisPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoConizacionPer()
                }
            })
        },

        datoExeresisPer() {
            if (this.dato_8001.dato_per.exeresis_per.toString().trim() == '') this.dato_8001.dato_per.exeresis_per = 2

            validarInputs({
                form: '#exeresis_per'
            }, () => {
                this.datoConizacionPer()
            }, () => {
                var dato = this.dato_8001.dato_per.exeresis_per
                if (dato == 1 || dato == 2 || dato == 3) {
                    this.datoOtroAntecPer()
                } else {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoExeresisPer()
                }
            })
        },

        datoOtroAntecPer() {
            if (this.dato_8001.dato_per.otros_antec_per.trim() == '') this.dato_8001.dato_per.otros_antec_per = 'N/A'

            validarInputs({
                form: '#otros_antec_per'
            }, () => {
                this.datoExeresisPer()
            }, () => {
                this.dato_8001.dato_per.otros_antec_per = this.dato_8001.dato_per.otros_antec_per.toUpperCase().replaceEsp()
                this.datoCovid19()
            })
        },

        datoCovid19() {
            switch (this.hcprc.serv) {
                case '01':
                case '02':
                case '08':
                case '09':
                case '63':
                    if (this.nit_usu == 900541158 && this.hcprc.serv == 09) {
                        this.grabarPag1()
                    } else {
                        this.covid19 = this.hcprc.covid19
                        this.params_hc890h.pregunta = 1;
                        this.params_hc890h.estado = true;
                    }
                    break;
                default:
                    this.covid19 = {
                        consenti_acomp_covid19: '',
                        contacto_covid19: '',
                        disnea_covid19: '',
                        fiebre_covid19: '',
                        lugar_dentro_covid19: '',
                        lugar_fuera_covid19: '',
                        malestar_covid19: '',
                        odinofagia_covid19: '',
                        personal_salud_covid19: '',
                        recomendacion_covid19: '',
                        rinorrea_covid19: '',
                        tiempo_dentro_covid19: '',
                        tiempo_fuera_covid19: '',
                        tos_covid19: '',
                        viaje_covid19: '',
                        viaje_dentro_covid19: '',
                        viaje_fuera_covid19: ''
                    }
                    this.grabarPag1()
                    break;
            }
        },

        EscpreguntasCovid(pregunta) {
            this.params_hc890h.pregunta = 0
            this.params_hc890h.estado = false

            switch (parseFloat(pregunta)) {
                case 1:
                    this.datoOtroAntecPer()
                    break;
                case 2:
                    this.validarCod_diagnosticos(0)
                    break;
                default:
                    this.datoOtroAntecPer()
                    break;
            }
        },

        recibirPreguntasCovid(pregunta, param) {
            this.hcprc.covid19 = param
            this.params_hc890h.pregunta = 0
            this.params_hc890h.estado = false

            switch (parseFloat(pregunta)) {
                case 1:
                    this.grabarPag1()
                    break;
                case 2:
                    this.ventanaSintomRespi()
                    break;
                default:
                    this.grabarPag1()
                    break;
            }

        },

        async grabarPag1() {
            await this.grabar()
            this.pantalla_02()
        },

        pantalla_02() {
            this.datoGestaciones()
        },

        datoGestaciones() {
            validarInputs({
                form: '#gestaciones_esq_w'
            }, () => {
                this.datoCovid19()
            }, () => {
                var dato = this.dato_4040.gineco_esq_w.gestaciones_esq_w
                if (dato > 30 || dato < 0) {
                    CON851('02', '02', null, 'error', 'error')
                    this.datoGestaciones()
                } else if (dato < 1) {
                    this.dato_4040.gineco_esq_w.gestaciones_esq_w = 0
                    this.dato_4040.gineco_esq_w.partos_esq_w = 0
                    this.dato_4040.gineco_esq_w.cesareas_esq_w = 0
                    this.dato_4040.gineco_esq_w.gine_vivos_esq_w = 0
                    this.dato_4040.gineco_esq_w.partos_termino_esq_w = 0
                    this.dato_4040.gineco_esq_w.partos_prematuro_esq_w = 0
                    this.dato_4040.gineco_esq_w.abortos_esq_w = 0
                    this.dato_4040.gineco_esq_w.fecha_primer_embar_esq_W = 0
                    this.dato_4040.gineco_esq_w.ult_parto_esq_w = 0
                    this.datoInicioRelSex()
                } else {
                    this.datoPartos()
                }
            })
        },

        datoPartos() {
            validarInputs({
                form: '#partos_esq_w'
            }, () => {
                this.datoGestaciones()
            }, () => {
                if ((parseFloat(this.dato_4040.gineco_esq_w.partos_esq_w) > parseFloat(this.dato_4040.gineco_esq_w.gestaciones_esq_w)) || this.dato_4040.gineco_esq_w.partos_esq_w < 0) {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoPartos()
                } else {
                    this.datoCesareas()
                }
            })
        },

        datoCesareas() {
            validarInputs({
                form: '#cesareas_esq_w'
            }, () => {
                this.datoPartos()
            }, () => {
                if ((parseFloat(this.dato_4040.gineco_esq_w.cesareas_esq_w) > (parseFloat(this.dato_4040.gineco_esq_w.gestaciones_esq_w) - parseFloat(this.dato_4040.gineco_esq_w.partos_esq_w))) || this.dato_4040.gineco_esq_w.cesareas_esq_w < 0) {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCesareas()
                } else {
                    this.datoNacVivos()
                }
            })
        },

        datoNacVivos() {
            if (this.dato_4040.gineco_esq_w.partos_esq_w == 0 && this.dato_4040.gineco_esq_w.cesareas_esq_w == 0) {
                this.dato_4040.gineco_esq_w.gine_vivos_esq_w = 0
                this.datoAbortos()
            } else {
                validarInputs({
                    form: '#gine_vivos_esq_w'
                }, () => {
                    this.datoCesareas()
                }, () => {
                    if ((parseFloat(this.dato_4040.gineco_esq_w.gine_vivos_esq_w) > (parseFloat(this.dato_4040.gineco_esq_w.partos_esq_w) + parseFloat(this.dato_4040.gineco_esq_w.cesareas_esq_w))) || this.dato_4040.gineco_esq_w.gine_vivos_esq_w < 0) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoNacVivos()
                    } else {
                        this.datoPartosTermino()
                    }
                })
            }
        },

        datoPartosTermino() {
            validarInputs({
                form: '#partos_termino_esq_w'
            }, () => {
                this.datoNacVivos()
            }, () => {
                if ((parseFloat(this.dato_4040.gineco_esq_w.partos_termino_esq_w) > parseFloat(this.dato_4040.gineco_esq_w.gine_vivos_esq_w)) || this.dato_4040.gineco_esq_w.partos_termino_esq_w < 0) {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoPartosTermino()
                } else {
                    this.datoPartosPrematuro()
                }
            })
        },

        datoPartosPrematuro() {
            validarInputs({
                form: '#partos_prematuro_esq_w'
            }, () => {
                this.datoPartosTermino()
            }, () => {
                if ((parseFloat(this.dato_4040.gineco_esq_w.partos_prematuro_esq_w) > (parseFloat(this.dato_4040.gineco_esq_w.gine_vivos_esq_w) - parseFloat(this.dato_4040.gineco_esq_w.partos_termino_esq_w)) ||
                        parseFloat(this.dato_4040.gineco_esq_w.partos_prematuro_esq_w) > parseFloat(this.dato_4040.gineco_esq_w.gine_vivos_esq_w) ||
                        parseFloat(this.dato_4040.gineco_esq_w.partos_prematuro_esq_w) < (parseFloat(this.dato_4040.gineco_esq_w.gine_vivos_esq_w) - parseFloat(this.dato_4040.gineco_esq_w.partos_termino_esq_w))) ||
                    this.dato_4040.gineco_esq_w.partos_prematuro_esq_w < 0) {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoPartosPrematuro()
                } else {
                    this.datoAbortos()
                }
            })
        },

        datoAbortos() {
            validarInputs({
                form: '#abortos_esq_w'
            }, () => {
                if (this.dato_4040.gineco_esq_w.gine_vivos_esq_w == 0) this.datoGestaciones()
                else this.datoNacVivos()
            }, () => {
                if ((parseFloat(this.dato_4040.gineco_esq_w.abortos_esq_w) > (parseFloat(this.dato_4040.gineco_esq_w.gestaciones_esq_w) - parseFloat(this.dato_4040.gineco_esq_w.partos_esq_w) - parseFloat(this.dato_4040.gineco_esq_w.cesareas_esq_w))) || this.dato_4040.gineco_esq_w.abortos_esq_w < 0) {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoAbortos()
                } else {
                    this.datoInicioRelSex()
                }
            })
        },

        datoInicioRelSex() {
            validarInputs({
                form: '#inicio_rel_sex'
            }, () => {
                this.datoGestaciones()
            }, () => {
                if (this.dato_8001.dato_gineco.inicio_rel_sex < 1) {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoInicioRelSex()
                } else {
                    this.datoEmbarazo(this.datoInicioRelSex, this.datoPlanifica)
                }
            })
        },

        datoEmbarazo(callbackAtras, callbackSig) {
            POPUP({
                    array: this.embarazo,
                    titulo: "Embarazo",
                    indices: [{ id: "COD", label: "DESCRIP" }],
                    seleccion: this.hcprc.rips.embarazo,
                    callback_f: () => {
                        callbackAtras()
                    },
                },
                async(data) => {
                    this.hcprc.rips.embarazo = data.COD;
                    callbackSig()
                }
            )
        },

        datoPlanifica() {
            validarInputs({
                form: '#planifica'
            }, () => {
                this.datoEmbarazo()
            }, () => {
                this.dato_8001.dato_gineco.planifica = this.dato_8001.dato_gineco.planifica.toUpperCase()
                if (this.dato_8001.dato_gineco.planifica != 'S') this.dato_8001.dato_gineco.planifica = 'N'
                if (this.dato_8001.dato_gineco.planifica == 'S') {
                    this.datoCualMetodo()
                } else {
                    this.hcprc.planific = ''
                    this.datoLactancia()
                }
            })
        },

        datoCualMetodo() {
            POPUP({
                    array: this.array_planificacion,
                    titulo: "Método de planificación",
                    indices: [{ id: "COD", label: "DESCRIP" }],
                    seleccion: this.hcprc.planific,
                    callback_f: () => {
                        this.datoPlanifica()
                    },
                },
                async(data) => {
                    this.hcprc.planific = data.COD;
                    this.datoLactancia()
                }
            )
        },

        datoLactancia() {
            validarInputs({
                form: '#lactancia_esq_w'
            }, () => {
                this.datoPlanifica()
            }, () => {
                this.dato_4040.obstetric_esq_w.lactancia_esq_w = this.dato_4040.obstetric_esq_w.lactancia_esq_w.toUpperCase()
                if (this.dato_4040.obstetric_esq_w.lactancia_esq_w != 'S') this.dato_4040.obstetric_esq_w.lactancia_esq_w = 'N'
                this.datoPosparto()
            })
        },

        datoPosparto() {
            validarInputs({
                form: '#posparto'
            }, () => {
                this.datoLactancia()
            }, () => {
                this.dato_8001.dato_gineco.posparto = this.dato_8001.dato_gineco.posparto.toUpperCase()
                if (this.dato_8001.dato_gineco.posparto != 'S') this.dato_8001.dato_gineco.posparto = 'N'
                this.datoMenopausia()
            })
        },

        datoMenopausia() {
            validarInputs({
                form: '#menopausia'
            }, () => {
                this.datoPosparto()
            }, () => {
                this.dato_8001.dato_gineco.menopausia = this.dato_8001.dato_gineco.menopausia.toUpperCase()
                if (this.dato_8001.dato_gineco.menopausia != 'S') this.dato_8001.dato_gineco.menopausia = 'N'
                this.datoFechaRegla('1')
            })
        },

        datoFechaRegla(orden) {
            validarInputs({
                    form: "#fecha_regla",
                    orden: orden
                },
                () => {
                    $this.datoMenopausia()
                },
                () => {
                    this.fecha_regla_w.ano_w = cerosIzq(this.fecha_regla_w.ano_w, 4)
                    this.fecha_regla_w.mes_w = cerosIzq(this.fecha_regla_w.mes_w, 2)
                    this.fecha_regla_w.dia_w = cerosIzq(this.fecha_regla_w.dia_w, 2)
                    this.dato_4040.gineco_esq_w.fecha_regla_esq_w = `${this.fecha_regla_w.ano_w}${this.fecha_regla_w.mes_w}${this.fecha_regla_w.dia_w}`

                    if (this.fecha_regla_w.ano_w >= 0 && this.fecha_regla_w.ano_w < 1950) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaRegla('1')
                    } else if (this.fecha_regla_w.mes_w < 1 || this.fecha_regla_w.mes_w > 12) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaRegla('2')
                    } else if (this.fecha_regla_w.dia_w < 1 || this.fecha_regla_w.dia_w > 31) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaRegla('3')
                    } else if (parseFloat(this.dato_4040.gineco_esq_w.fecha_regla_esq_w) > parseFloat(this.fecha_act)) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaRegla('1')
                    } else {
                        this.datoFechaCitol('1')
                    }
                }
            )
        },

        datoFechaCitol(orden) {
            validarInputs({
                    form: "#fecha_citol",
                    orden: orden
                },
                () => {
                    $this.datoFechaRegla('3')
                },
                () => {
                    this.fecha_citol_w.ano_w = cerosIzq(this.fecha_citol_w.ano_w, 4)
                    this.fecha_citol_w.mes_w = cerosIzq(this.fecha_citol_w.mes_w, 2)
                    this.fecha_citol_w.dia_w = cerosIzq(this.fecha_citol_w.dia_w, 2)

                    this.dato_4040.gineco_esq_w.fecha_citol_esq_w = `${this.fecha_citol_w.ano_w}${this.fecha_citol_w.mes_w}${this.fecha_citol_w.dia_w}`

                    if (this.fecha_citol_w.ano_w == 0) {
                        this.fecha_citol_w.ano_w = 0
                        this.fecha_citol_w.mes_w = 0
                        this.fecha_citol_w.dia_w = 0
                        this.saltoPag2()
                    } else if (this.fecha_citol_w.mes_w < 1 || this.fecha_citol_w.mes_w > 12) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaCitol('2')
                    } else if (this.fecha_citol_w.dia_w < 1 || this.fecha_citol_w.dia_w > 31) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaCitol('3')
                    } else if (parseFloat(this.dato_4040.gineco_esq_w.fecha_citol_esq_w) > parseFloat(this.fecha_act)) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaCitol('1')
                    } else {
                        this.saltoPag2()
                    }
                }
            )
        },

        async saltoPag2() {
            await this.grabar()
            this.pantalla_03()
        },

        pantalla_03() {
            this.datoReciApoySocial()
        },

        datoReciApoySocial() {
            validarInputs({
                form: '#reci_apoy_social'
            }, () => {
                this.datoFechaCitol('3')
            }, () => {
                this.dato_8001.dato_soc_cul.reci_apoy_social = this.dato_8001.dato_soc_cul.reci_apoy_social.toUpperCase()
                if (this.dato_8001.dato_soc_cul.reci_apoy_social != 'S') this.dato_8001.dato_soc_cul.reci_apoy_social = 'N'
                if (this.dato_8001.dato_soc_cul.reci_apoy_social == 'S') {
                    this.datoCualApoySocial()
                } else {
                    this.dato_8001.dato_soc_cul.cual_apoy_social = ''
                    this.datoViviendaPropia()
                }
            })
        },

        datoCualApoySocial() {
            validarInputs({
                form: '#cual_apoy_social'
            }, () => {
                this.datoReciApoySocial()
            }, () => {
                this.dato_8001.dato_soc_cul.cual_apoy_social = this.dato_8001.dato_soc_cul.cual_apoy_social.toUpperCase().replaceEsp()
                this.datoViviendaPropia()
            })
        },

        datoViviendaPropia() {
            validarInputs({
                form: '#vivienda_propia'
            }, () => {
                this.datoReciApoySocial()
            }, () => {
                this.dato_8001.dato_soc_cul.vivienda_propia = this.dato_8001.dato_soc_cul.vivienda_propia.toUpperCase()
                if (this.dato_8001.dato_soc_cul.vivienda_propia != 'S') this.dato_8001.dato_soc_cul.vivienda_propia = 'N'
                this.datoViviendaHacina()
            })
        },

        datoViviendaHacina() {
            validarInputs({
                form: '#vivienda_hacina'
            }, () => {
                this.datoViviendaPropia()
            }, () => {
                this.dato_8001.dato_soc_cul.vivienda_hacina = this.dato_8001.dato_soc_cul.vivienda_hacina.toUpperCase()
                if (this.dato_8001.dato_soc_cul.vivienda_hacina != 'S') this.dato_8001.dato_soc_cul.vivienda_hacina = 'N'
                this.datoCasa()
            })
        },

        datoCasa() {
            validarInputs({
                form: '#casa'
            }, () => {
                this.datoViviendaHacina()
            }, () => {
                this.dato_8001.dato_soc_cul.casa = this.dato_8001.dato_soc_cul.casa.toUpperCase()
                if (this.dato_8001.dato_soc_cul.casa != 'S') this.dato_8001.dato_soc_cul.casa = 'N'
                this.datoApto()
            })
        },

        datoApto() {
            validarInputs({
                form: '#apto'
            }, () => {
                this.datoCasa()
            }, () => {
                this.dato_8001.dato_soc_cul.apto = this.dato_8001.dato_soc_cul.apto.toUpperCase()
                if (this.dato_8001.dato_soc_cul.apto != 'S') this.dato_8001.dato_soc_cul.apto = 'N'
                this.datoInvasion()
            })
        },

        datoInvasion() {
            validarInputs({
                form: '#invasion'
            }, () => {
                this.datoApto()
            }, () => {
                this.dato_8001.dato_soc_cul.invasion = this.dato_8001.dato_soc_cul.invasion.toUpperCase()
                if (this.dato_8001.dato_soc_cul.invasion != 'S') this.dato_8001.dato_soc_cul.invasion = 'N'
                this.datoLote()
            })
        },

        datoLote() {
            validarInputs({
                form: '#lote'
            }, () => {
                this.datoInvasion()
            }, () => {
                this.dato_8001.dato_soc_cul.lote = this.dato_8001.dato_soc_cul.lote.toUpperCase()
                if (this.dato_8001.dato_soc_cul.lote != 'S') this.dato_8001.dato_soc_cul.lote = 'N'
                this.datoEstudiaAct()
            })
        },

        datoEstudiaAct() {
            validarInputs({
                form: '#estudia_act'
            }, () => {
                this.datoLote()
            }, () => {
                this.dato_8001.dato_soc_cul.estudia_act = this.dato_8001.dato_soc_cul.estudia_act.toUpperCase()
                if (this.dato_8001.dato_soc_cul.estudia_act != 'S') this.dato_8001.dato_soc_cul.estudia_act = 'N'
                this.datoTrabajaAct()
            })
        },

        datoTrabajaAct() {
            validarInputs({
                form: '#trabaja_act'
            }, () => {
                this.datoEstudiaAct()
            }, () => {
                this.dato_8001.dato_soc_cul.trabaja_act = this.dato_8001.dato_soc_cul.trabaja_act.toUpperCase()
                if (this.dato_8001.dato_soc_cul.trabaja_act != 'S') this.dato_8001.dato_soc_cul.trabaja_act = 'N'
                if (this.dato_8001.dato_soc_cul.trabaja_act == 'S') {
                    this.datoQueTrabajo()
                } else {
                    this.dato_8001.dato_soc_cul.que_trabajo = ''
                    this.datoActividadFisica()
                }
            })
        },

        datoQueTrabajo() {
            validarInputs({
                form: '#que_trabajo'
            }, () => {
                this.datoTrabajaAct()
            }, () => {
                this.dato_8001.dato_soc_cul.que_trabajo = this.dato_8001.dato_soc_cul.que_trabajo.toUpperCase().replaceEsp()
                this.datoActividadFisica()
            })
        },

        datoActividadFisica() {
            if (this.dato_8001.dato_soc_cul.actividad_fisica == 0) this.dato_8001.dato_soc_cul.actividad_fisica = 0

            validarInputs({
                form: '#actividad_fisica'
            }, () => {
                this.datoTrabajaAct()
            }, () => {
                if (this.dato_8001.dato_soc_cul.actividad_fisica < 0) this.dato_8001.dato_soc_cul.actividad_fisica = 0
                this.datoActividadRecrea()
            })
        },

        datoActividadRecrea() {
            validarInputs({
                form: '#actividad_recrea'
            }, () => {
                this.datoActividadFisica()
            }, () => {
                if (this.dato_8001.dato_soc_cul.actividad_recrea < 0) this.dato_8001.dato_soc_cul.actividad_recrea = 0
                this.datoAlimentacionAdec()
            })
        },

        datoAlimentacionAdec() {
            validarInputs({
                form: '#alimentacion_adec'
            }, () => {
                this.datoActividadRecrea()
            }, () => {
                this.dato_8001.dato_soc_cul.alimentacion_adec = this.dato_8001.dato_soc_cul.alimentacion_adec.toUpperCase()
                if (this.dato_8001.dato_soc_cul.alimentacion_adec != 'S') this.dato_8001.dato_soc_cul.alimentacion_adec = 'N'
                this.datoCuantosPorDia()
            })
        },

        datoCuantosPorDia() {
            validarInputs({
                form: '#cuantas_x_dia'
            }, () => {
                this.datoAlimentacionAdec()
            }, () => {
                if (this.dato_8001.dato_soc_cul.cuantas_x_dia < 0) this.dato_8001.dato_soc_cul.cuantas_x_dia = 0
                this.datoCuantasConFamilia()
            })
        },

        datoCuantasConFamilia() {
            validarInputs({
                form: '#cuantas_con_famil'
            }, () => {
                this.datoCuantosPorDia()
            }, () => {
                if (this.dato_8001.dato_soc_cul.cuantas_con_famil < 0) this.dato_8001.dato_soc_cul.cuantas_con_famil = 0
                if (parseFloat(this.dato_8001.dato_soc_cul.cuantas_con_famil) > parseFloat(this.dato_8001.dato_soc_cul.cuantas_x_dia)) {
                    CON851('03', '03', null, 'error', 'error')
                    this.datoCuantasConFamilia()
                } else this.datoSuenoNormal()
            })
        },

        datoSuenoNormal() {
            validarInputs({
                form: '#sueno_normal'
            }, () => {
                this.datoCuantasConFamilia()
            }, () => {
                this.dato_8001.dato_soc_cul.sueno_normal = this.dato_8001.dato_soc_cul.sueno_normal.toUpperCase()
                if (this.dato_8001.dato_soc_cul.sueno_normal != 'S') this.dato_8001.dato_soc_cul.sueno_normal = 'N'
                this.datoHorasSueno()
            })
        },

        datoHorasSueno() {
            validarInputs({
                form: '#horas_sueno'
            }, () => {
                this.datoSuenoNormal()
            }, () => {
                if (this.dato_8001.dato_soc_cul.horas_sueno < 0) this.dato_8001.dato_soc_cul.horas_sueno = 0
                this.datoTabaco()
            })
        },

        datoTabaco() {
            validarInputs({
                form: '#tabaco'
            }, () => {
                this.datoHorasSueno()
            }, () => {
                this.dato_8001.dato_soc_cul.tabaco = this.dato_8001.dato_soc_cul.tabaco.toUpperCase()
                if (this.dato_8001.dato_soc_cul.tabaco != 'S') this.dato_8001.dato_soc_cul.tabaco = 'N'
                this.datoAlcohol()
            })
        },

        datoAlcohol() {
            validarInputs({
                form: '#alcohol'
            }, () => {
                this.datoTabaco()
            }, () => {
                this.dato_8001.dato_soc_cul.alcohol = this.dato_8001.dato_soc_cul.alcohol.toUpperCase()
                if (this.dato_8001.dato_soc_cul.alcohol != 'S') this.dato_8001.dato_soc_cul.alcohol = 'N'
                this.datoOtrasSustancias()
            })
        },

        datoOtrasSustancias() {
            validarInputs({
                form: '#otras_sustacias'
            }, () => {
                this.datoAlcohol()
            }, () => {
                this.dato_8001.dato_soc_cul.otras_sustacias = this.dato_8001.dato_soc_cul.otras_sustacias.toUpperCase()
                if (this.dato_8001.dato_soc_cul.otras_sustacias != 'S') this.dato_8001.dato_soc_cul.otras_sustacias = 'N'
                if (this.dato_8001.dato_soc_cul.otras_sustacias == 'S') {
                    this.datoCualSustancias()
                } else {
                    this.dato_8001.dato_soc_cul.cual_sustacias = ''
                    this.datoAspectoCuell()
                }
            })
        },

        datoCualSustancias() {
            validarInputs({
                form: '#cual_sustacias'
            }, () => {
                this.datoOtrasSustancias()
            }, () => {
                this.dato_8001.dato_soc_cul.cual_sustacias = this.dato_8001.dato_soc_cul.cual_sustacias.toUpperCase().replaceEsp()
                this.datoAspectoCuell()
            })
        },

        datoAspectoCuell() {
            POPUP({
                array: this.array_aspecto_cuell,
                titulo: "Aspecto del Cuello",
                indices: [{ id: "COD", label: "DESCRIP" }],
                seleccion: this.dato_8001.especuloscopia.aspecto_cuell,
                callback_f: () => {
                    this.datoOtrasSustancias()
                },
            }, async(data) => {
                this.dato_8001.especuloscopia.aspecto_cuell = data.COD;
                if (data.COD == 6) {
                    this.datoOtroAspecto()
                } else {
                    this.dato_8001.especuloscopia.otro_aspecto = ''
                    this.pantalla_04()
                }
            })
        },

        datoOtroAspecto() {
            validarInputs({
                form: '#otro_aspecto'
            }, () => {
                this.datoAspectoCuell()
            }, () => {
                this.dato_8001.especuloscopia.otro_aspecto = this.dato_8001.especuloscopia.otro_aspecto.toUpperCase().replaceEsp()
                this.pantalla_04()
            })
        },

        async pantalla_04() {
            await this.grabar()
            this.datoIpsLect()
        },

        datoIpsLect() {
            validarInputs({
                form: '#ips_lect'
            }, () => {
                this.datoAspectoCuell()
            }, () => {
                let ips = this.dato_8001.recepcion_entrega.ips_lect
                if (ips.trim() == '') {
                    this.datoFechaEntrega('1')
                } else {
                    let busqueda = this.entidades.find(el => el['COD-ENT'].trim() == ips.trim())
                    if (busqueda) this.datoFechaEntrega('1')
                    else {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoIpsLect()
                    }
                }
            })
        },

        datoFechaEntrega(orden) {
            if (!this.fecha_entre || this.fecha_entre == 0) {
                this.dato_8001.recepcion_entrega.ano_entre = this.fecha_act.substring(0, 4)
                this.dato_8001.recepcion_entrega.mes_entre = this.fecha_act.substring(4, 6)
                this.dato_8001.recepcion_entrega.dia_entre = this.fecha_act.substring(6, 8)
            }

            validarInputs({
                    form: "#fecha_entre",
                    orden: orden
                },
                () => {
                    $this.datoIpsLect()
                },
                () => {
                    this.dato_8001.recepcion_entrega.ano_entre = cerosIzq(this.dato_8001.recepcion_entrega.ano_entre, 4)
                    this.dato_8001.recepcion_entrega.mes_entre = cerosIzq(this.dato_8001.recepcion_entrega.mes_entre, 2)
                    this.dato_8001.recepcion_entrega.dia_entre = cerosIzq(this.dato_8001.recepcion_entrega.dia_entre, 2)
                    this.fecha_entre = this.dato_8001.recepcion_entrega.ano_entre.toString() + this.dato_8001.recepcion_entrega.mes_entre.toString() + this.dato_8001.recepcion_entrega.dia_entre.toString()

                    if (this.dato_8001.recepcion_entrega.ano_entre < 1000) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaEntrega('1')
                    } else if (this.dato_8001.recepcion_entrega.mes_entre < 1 || this.dato_8001.recepcion_entrega.mes_entre > 12) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaEntrega('2')
                    } else if (this.dato_8001.recepcion_entrega.dia_entre < 1 || this.dato_8001.recepcion_entrega.dia_entre > 31) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaEntrega('3')
                    } else {
                        this.datoResultado()
                    }
                }
            )
        },

        datoResultado() {
            validarInputs({
                form: '#resultado'
            }, () => {
                this.datoFechaEntrega('3')
            }, () => {
                this.dato_8001.recepcion_entrega.resultado = this.dato_8001.recepcion_entrega.resultado.toUpperCase().replaceEsp()
                this.datoAtenMedico()
            })
        },

        datoAtenMedico() {
            validarInputs({
                form: '#aten_medico'
            }, () => {
                this.datoResultado()
            }, () => {
                this.dato_8001.recepcion_entrega.aten_medico = this.dato_8001.recepcion_entrega.aten_medico.toUpperCase()
                if (this.dato_8001.recepcion_entrega.aten_medico != 'S') this.dato_8001.recepcion_entrega.aten_medico = 'N'
                this.datoEducacion()
            })
        },

        datoEducacion() {
            validarInputs({
                form: '#educacion'
            }, () => {
                this.datoAtenMedico()
            }, () => {
                this.dato_8001.recepcion_entrega.educacion = this.dato_8001.recepcion_entrega.educacion.toUpperCase().replaceEsp()
                this.datoSeguimiento()
            })
        },

        datoSeguimiento() {
            validarInputs({
                form: '#seguimiento'
            }, () => {
                this.datoEducacion()
            }, () => {
                this.dato_8001.recepcion_entrega.seguimiento = this.dato_8001.recepcion_entrega.seguimiento.toUpperCase().replaceEsp()
                this.datoDescripcion()
            })
        },

        datoDescripcion() {
            validarInputs({
                form: '#descripcion'
            }, () => {
                this.datoSeguimiento()
            }, () => {
                this.dato_8001.recepcion_entrega.descripcion = this.dato_8001.recepcion_entrega.descripcion.toUpperCase().replaceEsp()
                this.datoFechaConsulta('1')
            })
        },

        datoFechaConsulta(orden) {
            if (!this.fecha_consul || this.fecha_consul == 0) {
                this.dato_8001.recepcion_entrega.ano_consul = this.fecha_act.substring(0, 4)
                this.dato_8001.recepcion_entrega.mes_consul = this.fecha_act.substring(4, 6)
                this.dato_8001.recepcion_entrega.dia_consul = this.fecha_act.substring(6, 8)
            }

            validarInputs({
                    form: "#fecha_consul",
                    orden: orden
                },
                () => {
                    $this.datoDescripcion()
                },
                () => {
                    this.dato_8001.recepcion_entrega.ano_consul = cerosIzq(this.dato_8001.recepcion_entrega.ano_consul, 4)
                    this.dato_8001.recepcion_entrega.mes_consul = cerosIzq(this.dato_8001.recepcion_entrega.mes_consul, 2)
                    this.dato_8001.recepcion_entrega.dia_consul = cerosIzq(this.dato_8001.recepcion_entrega.dia_consul, 2)
                    this.fecha_consul = this.dato_8001.recepcion_entrega.ano_consul.toString() + this.dato_8001.recepcion_entrega.mes_consul.toString() + this.dato_8001.recepcion_entrega.dia_consul.toString()

                    if (this.dato_8001.recepcion_entrega.ano_consul < 2000) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaConsulta('1')
                    } else if (this.dato_8001.recepcion_entrega.mes_consul < 1 || this.dato_8001.recepcion_entrega.mes_consul > 12) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaConsulta('2')
                    } else if (this.dato_8001.recepcion_entrega.dia_consul < 1 || this.dato_8001.recepcion_entrega.dia_consul > 31) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaConsulta('3')
                    } else if (parseFloat(this.fecha_consul) > parseFloat(this.fecha_act)) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaConsulta('1')
                    } else {
                        this.controlCitologia()
                    }
                }
            )
        },

        async controlCitologia() {
            await this.grabar()
            if (this.dato_8001.tipo == 2) this.pantalla_05()
            else this.mostrarPantalla_08()
        },

        async pantalla_05() {
            this.datoFechaToma('1')
        },

        datoFechaToma(orden) {
            if (!this.fecha_toma || this.fecha_toma == 0) {
                this.dato_8001.control.ano_toma = this.fecha_act.substring(0, 4)
                this.dato_8001.control.mes_toma = this.fecha_act.substring(4, 6)
                this.dato_8001.control.dia_toma = this.fecha_act.substring(6, 8)
            }

            validarInputs({
                    form: "#fecha_toma",
                    orden: orden
                },
                () => {
                    $this.datoFechaConsulta('3')
                },
                () => {
                    this.dato_8001.control.ano_toma = cerosIzq(this.dato_8001.control.ano_toma, 4)
                    this.dato_8001.control.mes_toma = cerosIzq(this.dato_8001.control.mes_toma, 2)
                    this.dato_8001.control.dia_toma = cerosIzq(this.dato_8001.control.dia_toma, 2)
                    this.fecha_toma = this.dato_8001.control.ano_toma.toString() + this.dato_8001.control.mes_toma.toString() + this.dato_8001.control.dia_toma.toString()

                    if (this.dato_8001.control.ano_toma >= 0 && this.dato_8001.control.ano_toma < 2000) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaToma('1')
                    } else if (this.dato_8001.control.ano_toma < 0) {
                        this.dato_8001.control.ano_toma = 0
                        this.dato_8001.control.mes_toma = 0
                        this.dato_8001.control.dia_toma = 0
                        this.datoConduc()
                    } else if (this.dato_8001.control.mes_toma < 1 || this.dato_8001.control.mes_toma > 12) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaToma('2')
                    } else if (this.dato_8001.control.dia_toma < 1 || this.dato_8001.control.dia_toma > 31) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaToma('3')
                    } else {
                        this.datoConduc()
                    }
                }
            )
        },

        datoConduc() {
            validarInputs({
                form: '#conduc_manejo'
            }, () => {
                this.datoFechaToma('3')
            }, () => {
                this.dato_8001.control.conduc_manejo = this.dato_8001.control.conduc_manejo.toUpperCase().replaceEsp()
                this.datoAspect()
            })
        },

        datoAspect() {
            validarInputs({
                form: '#aspect_geni'
            }, () => {
                this.datoConduc()
            }, () => {
                this.dato_8001.control.aspect_geni = this.dato_8001.control.aspect_geni.toUpperCase().replaceEsp()
                this.datoFlujo()
            })
        },

        datoFlujo() {
            validarInputs({
                form: '#flujo_car'
            }, () => {
                this.datoAspect()
            }, () => {
                this.dato_8001.control.flujo_car = this.dato_8001.control.flujo_car.toUpperCase().replaceEsp()
                this.datoEdu()
            })
        },

        datoEdu() {
            validarInputs({
                form: '#educa_prev'
            }, () => {
                this.datoFlujo()
            }, () => {
                this.dato_8001.control.educa_prev = this.dato_8001.control.educa_prev.toUpperCase().replaceEsp()
                this.datoEspecialidad()
            })
        },

        datoEspecialidad() {
            validarInputs({
                form: '#remision_cod'
            }, () => {
                this.datoEdu()
            }, () => {
                let espec = this.dato_8001.control.remision_cod
                if (espec.trim() == '') {
                    this.datoFechaCuando('1')
                } else {
                    let busqueda = this.especialidades.find(el => el.CODIGO.trim() == espec.trim())
                    if (busqueda) this.datoFechaCuando('1')
                    else {
                        CON851('01', '01', null, 'error', 'error')
                        this.datoEspecialidad()
                    }
                }
            })
        },

        datoFechaCuando(orden) {
            if (!this.fecha_cuando || this.fecha_cuando == 0) {
                this.dato_8001.control.ano_cuando = this.fecha_act.substring(0, 4)
                this.dato_8001.control.mes_cuando = this.fecha_act.substring(4, 6)
                this.dato_8001.control.dia_cuando = this.fecha_act.substring(6, 8)
            }

            validarInputs({
                    form: "#fecha_cuando",
                    orden: orden
                },
                () => {
                    $this.datoEspecialidad()
                },
                () => {
                    this.dato_8001.control.ano_cuando = cerosIzq(this.dato_8001.control.ano_cuando, 4)
                    this.dato_8001.control.mes_cuando = cerosIzq(this.dato_8001.control.mes_cuando, 2)
                    this.dato_8001.control.dia_cuando = cerosIzq(this.dato_8001.control.dia_cuando, 2)
                    this.fecha_cuando = this.dato_8001.control.ano_cuando.toString() + this.dato_8001.control.mes_cuando.toString() + this.dato_8001.control.dia_cuando.toString()

                    if (this.dato_8001.control.ano_cuando >= 0 && this.dato_8001.control.ano_cuando < 1950) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaCuando('1')
                    } else if (this.dato_8001.control.ano_cuando < 0) {
                        this.dato_8001.control.ano_cuando = 0
                        this.dato_8001.control.mes_cuando = 0
                        this.dato_8001.control.dia_cuando = 0
                        this.datoObser()
                    } else if (this.dato_8001.control.mes_cuando < 1 || this.dato_8001.control.mes_cuando > 12) {
                        CON851('03', '03', null, 'error', 'error')
                        this.datoFechaCuando('2')
                    } else if (this.dato_8001.control.dia_cuando < 1 || this.dato_8001.control.dia_cuando > 31) {
                        CON851('37', '37', null, 'error', 'error')
                        this.datoFechaCuando('3')
                    } else {
                        this.datoObser()
                    }
                }
            )
        },

        datoObser() {
            validarInputs({
                form: '#observ_contr'
            }, () => {
                this.datoFechaCuando('3')
            }, () => {
                this.dato_8001.control.observ_contr = this.dato_8001.control.observ_contr.toUpperCase().replaceEsp()
                this.saltoPag5()
            })
        },

        async saltoPag5() {
            await this.grabar()
            this.mostrarPantalla_08()
        },

        mostrarPantalla_08() {
            console.log('pantalla 08')
            this.validarCod_diagnosticos(0)
        },

        async validarCod_diagnosticos(pos) {
            if (pos > 9) {
                this.ventanaImprimirCovid19()
            } else {
                validarInputs({
                        form: "#datoDiagn_" + pos,
                        event_f3: () => {
                            if (this.hcprc.rips.tabla_diagn[0].cod_diagn.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                this.validarCod_diagnosticos(pos)
                            } else {
                                if(!this.hcprc.rips.tabla_diagn[pos].cod_diagn.trim()) {
                                    this.ventanaImprimirCovid19()
                                } else this.val_diagn();
                            }
                        },
                        event_f5: () => { this._confirmarSalir_HC607('validarCod_diagnosticos'), pos }
                    },
                    () => {
                        if (pos == 0) {
                            if (this.dato_8001.tipo == 2) this.pantalla_05()
                            else this.pantalla_04()
                        } else this.validarCod_diagnosticos(pos - 1)
                    },
                    () => {
                        this.val_diagn();
                    })
            }
        },

        async val_diagn() {
            this.hcprc.rips.tabla_diagn[pos].cod_diagn = this.hcprc.rips.tabla_diagn[pos].cod_diagn.toUpperCase();
            var diagn = this.hcprc.rips.tabla_diagn[pos].cod_diagn;
            if (diagn.trim() == '' && pos == 0) {
                CON851('01', '01', null, 'error', 'error')
                this.validarCod_diagnosticos(pos)
            } else {
                if (this.hcprc.rips.tabla_diagn[pos].cod_diagn.trim() == '') {
                    this.hcprc.rips.tabla_diagn = this.hcprc.rips.tabla_diagn.filter(el => el.cod_diagn.trim());

                    while (this.hcprc.rips.tabla_diagn.length < 10) {
                        this.hcprc.rips.tabla_diagn.push({ cod_diagn: '', descrip_diagn: '' })
                    }
                    this.ventanaImprimirCovid19()
                } else {
                    await this.validaciones_diagn(pos).then((data) => {
                        this.validarCod_diagnosticos(pos + 1)
                    }).catch((error) => {
                        this.hcprc.rips.tabla_diagn[pos].descrip_diagn = ''
                        this.validarCod_diagnosticos(pos)
                    })
                }
            }
        },

        async validaciones_diagn(pos) {
            return new Promise((resolve, reject) => {
                if (this.nit_usu == 800037979 || this.nit_usu == 900077520) {
                    if (this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1) == 'Z' && (this.hcprc.serv == 01 || this.hcprc.serv == 02)) {
                        CON851('03', '03', null, 'error', 'error')
                        reject()
                    }
                };

                if (this.nit_usu == 800037021 && this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1) == 'R') {
                    CON851('03', '03', null, 'error', 'error')
                    reject()
                };

                let busqEnf = this.enfermedades.find(e => e.COD_ENF == this.hcprc.rips.tabla_diagn[pos].cod_diagn)

                if (!busqEnf) {
                    CON851('01', '01', null, 'error', 'error')
                    reject()
                }

                this.hcprc.rips.tabla_diagn[pos].descrip_diagn = busqEnf.NOMBRE_ENF

                if (busqEnf.HUERFA_ENF == 'S') {
                    CON851('03', '03', null, 'error', 'error')
                }

                // PYP SOLO APLICA PARA "Z" Y DIABETICOS, HIPERTENSOS, HIPELIPIDEMIA
                if (pos == 0 && this.hcprc.serv == 08) {
                    var array_buscar = ["I10X", "I151", "I158", "I159", "O16X", "E782", "E784", "E785", "E119"]
                    if (this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1) == 'Z' ||
                        this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 2) == 'E1' ||
                        array_buscar.find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn)
                    ) {
                        // continue
                    } else {
                        CON851('G0', 'G0', null, 'error', 'error')
                        this.hcprc.rips.tabla_diagn[0].cod_diagn = ''
                        reject()
                    }
                }

                if ([02, 03, 06, 08, 63].find(el => el == this.hcprc.serv)) {
                    // continue
                } else {
                    var array_buscar = ["Z000", "Z001", "Z002", "Z003", "Z006", "Z021", "Z022", "Z023", "Z024", "Z025", "Z026", "Z027", "Z028", "Z029", "Z100", "Z101", "Z102", "Z103", "Z108", "Z300", "Z301", "Z700", "Z701", "Z702", "Z713", "Z714", "Z715", "Z716", "Z717", "Z718", "Z719"]
                    if (array_buscar.find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn)) {
                        CON851('G1', 'G1', null, 'error', 'error')
                        this.hcprc.rips.tabla_diagn[0].cod_diagn = ''
                        reject()
                    }
                }

                this.editarEdad(busqEnf)

                if (busqEnf.SEXO_ENF.trim() != '' && busqEnf.SEXO_ENF != $_REG_PACI.SEXO) {
                    CON851('73', '73', null, 'error', 'error')
                    reject()
                }

                if (busqEnf.EDAD_MIN_ENF > 0 && parseInt(this.edad_hc_w) < parseInt(this.edadMinW)) {
                    CON851('74', '74', null, 'error', 'error')
                    reject()
                }

                if (busqEnf.EDAD_MAX_ENF > 0 && parseInt(this.edad_hc_w) > parseInt(this.edadMaxW)) {
                    CON851('74', '74', null, 'error', 'error')
                    reject()
                }


                if (this.hcprc.rips.tabla_diagn[pos].cod_diagn.trim() != '') {
                    let busqueda = this.enfermedades_trans.find(el => el.COD_ENF_J == this.hcprc.rips.tabla_diagn[pos].cod_diagn)
                    if (busqueda) {
                        CON851('2Z', '2Z', null, 'error', 'error')
                    } else {
                        // continue
                    }
                }

                resolve()
            })
        },

        async editarEdad(enfermedad) {
            switch (enfermedad.UNID_EDAD_ENF) {
                case 'D':
                    this.edadMinW = 1;
                    this.edadMaxW = 1;
                    break;
                case 'M':
                    this.edadMinW = 2;
                    this.edadMaxW = 2;
                    break;
                case 'A':
                    this.edadMinW = 3;
                    this.edadMaxW = 3;
                    break;
                default:
                    this.edadMinW = 0;
                    this.edadMaxW = 0;
                    break;
            }

            this.edadMinW += enfermedad.EDAD_MIN_ENF.padStart(3, "0")
            this.edadMaxW += enfermedad.EDAD_MAX_ENF.padStart(3, "0")
        },

        async ventanaImprimirCovid19() {
            let array_buscar = ["J00X", "J010", "J011", "J012", "J013", "J014", "J018", "J019", "J020", "J028", "J029", "J030", "J038", "J039", "J040", "J041", "J042", "J050", "J051", "J060", "J068", "J069", "J100", "J101", "J108", "J110", "J111", "J118", "J120", "J121", "J122", "J128", "J129", "J13X", "J14X", "J150", "J151", "J152", "J153", "J154", "J155", "J156", "J157", "J158", "J159", "J160", "J168", "J170", "J171", "J172", "J173", "J178", "J180", "J181", "J182", "J188", "J189", "J200", "J201", "J202", "J203", "J204", "J205", "J206", "J207", "J208", "J209", "J210", "J218", "J219", "J22X", "J300", "J301", "J302", "J303", "J304", "J310", "J311", "J312", "J320", "J321", "J322", "J323", "J324", "J328", "J329", "U071", "U072"]
            let flagDiagn = false

            for (var i in this.hcprc.rips.tabla_diagn) {
                if (array_buscar.find(el => el == this.hcprc.rips.tabla_diagn)) flagDiagn = true
            }

            if (flagDiagn) {
                this.hcprc.covid19.recomendacion_covid19 = 'S'
                this.ventanaSintomRespi()
            } else if (this.nit_usu == 900541158 && this.hcprc.serv == 09) {
                this.hcprc.covid19.recomendacion_covid19 = 'N'
                this.ventanaSintomRespi()
            } else if (![01, 02, 08, 09, 63].find(el => el == this.hcprc.serv)) {
                this.hcprc.covid19.recomendacion_covid19 = 'N'
                this.ventanaSintomRespi()
            } else {
                this.covid19 = this.hcprc.covid19
                this.params_hc890h.pregunta = 2;
                this.params_hc890h.estado = true;
            }
        },

        ventanaSintomRespi() {
            if ($_REG_PROF.ATIENDE_PROF != 2) {
                this.hcprc.signos.sintom_respi = ''
                this.hcprc.signos.sintom_piel = ''
                this.hcprc.signos.victi_maltrato = ''
                this.hcprc.signos.victi_violencia = ''
                this.hcprc.signos.enfer_mental = ''
                this.hcprc.signos.enfer_its = ''
                this.hcprc.signos.cancer_seno = ''
                this.hcprc.signos.cancer_cervis = ''
                this.hcprc.signos.edu_autoexa_seno = ''
                this.ventanaCreatinina()
            } else {
                this.mostrarSintomaticos = true
                setTimeout(() => {
                    this.params_hc890d.estado = true
                    this.params_hc890d.unserv = this.hcprc.cierre.unserv
                    this.params_hc890d.finalidad = this.hcprc.rips.finalid
                    this.params_hc890d.sexo = $_REG_PACI.SEXO
                }, 300);
            }
        },

        validarEsc_sintomatico() {
            this.mostrarSintomaticos = false
            this.params_hc890d.estado = false
            this.validarCod_diagnosticos(0)
        },

        validarCallback_sintomatico(data) {
            this.mostrarSintomaticos = false
            this.params_hc890d.estado = false
            this.hcprc.signos = data
            this.ventanaCreatinina()
        },

        ventanaCreatinina() {
            let unserv = this.hcprc.serv
            let finalidad = this.hcprc.rips.finalid

            if ((this.nit_usu == 800037021) ||
                (($_REG_PACI.CRONICO == 'S') &&
                    (unserv == 08 || (this.nit_usu == 892000458 && unserv == 02) ||
                        (this.nit_usu == 900005594 && unserv == 02) ||
                        (this.nit_usu == 900556047 && unserv == 02) ||
                        (this.nit_usu == 900541158 && unserv == 02) ||
                        (this.nit_usu == 844003225 && (finalidad == 05 || finalidad == 07))))) {

                this.datos_creatinina = {
                    fecha: this.hcprc.fecha,
                    peso: this.hcprc.signos.peso,
                    edad: $_REG_HC.edad_hc.vlr_edad,
                    unserv: this.hcprc.cierre.unserv,
                    tabla_diagn: this.hcprc.rips.tabla_diagn,

                    creatinina2: this.hcprc.signos.creatinina2,
                    hemo_glicosilada: this.hcprc.signos.hemo_glicosilada,
                    hemo_glico_fecha: this.hcprc.signos.hemo_glico_fecha,
                    microalbuminuria: this.hcprc.signos.microalbuminuria,
                    fecha_microalbuminuria: this.hcprc.signos.fecha_microalbuminuria,
                    riesgo_cardio: this.hcprc.signos.riesgo_cardio,
                    rela_albumi_creatini_1: this.hcprc.signos.rela_albumi_creatini_1,
                    rela_albumi_creatini_2: this.hcprc.signos.rela_albumi_creatini_2,
                    erc: this.hcprc.signos.erc,
                    fecha_dx_erc: this.hcprc.signos.fecha_dx_erc,
                    fecha_creatinina: this.hcprc.signos.fecha_creatinina,
                    estadio_erc: this.hcprc.signos.estadio_erc,
                }

                this.params_creatinina.estado = true;
            } else {
                this.datoAnalisis();
            }
        },

        validarEsc_creatinina() {
            this.params_creatinina.estado = false;
            this.validarCod_diagnosticos(0)
        },

        validarCallback_creatinina(data) {
            console.log('return creatinina: ', data);
            // this.reg_evo = {
            //     ...this.reg_evo,
            //     ...data
            // }
            this.params_creatinina.estado = false;
            this.datoAnalisis();
        },

        datoAnalisis() {
            validarInputs({
                form: '#analisis'
            }, () => {
                this.validarCod_diagnosticos(0)
            }, () => {
                this.analisis = this.analisis.toUpperCase().replaceEsp()
                grabarDetallesText(this.analisis, $_REG_HC.llave_hc + '7501')
                this.datoPlan()
            })
        },

        datoPlan() {
            validarInputs({
                form: '#plan'
            }, () => {
                this.datoAnalisis()
            }, () => {
                this.plan = this.plan.toUpperCase().replaceEsp()
                grabarDetallesText(this.plan, $_REG_HC.llave_hc + '7503')
                this.mostrarPantallaRips()
            })
        },

        mostrarPantallaRips() {
            if (this.dato_8001.tipo == 1) this.hcprc.rips.primera_vez = 'S'
            else this.hcprc.rips.primera_vez = 'N'

            if (this.hcprc.rips.planific == 0) this.hcprc.rips.planific = ''

            this.hcprc.rips.cronico = ''

            setTimeout(() => { this.aceptarEstado() }, 200);
        },

        aceptarEstado() {
            if (this.hcprc.rips.embarazo == 1 || this.hcprc.rips.embarazo == 2 || this.hcprc.rips.embarazo == 3) {
                this.leerEstado()
            } else {
                if ($_REG_PACI.SEXO == 'M') {
                    this.hcprc.rips.embarazo = '9'
                } else {
                    if ($_REG_HC.edad_hc.unid_edad == 'D' || $_REG_HC.edad_hc.unid_edad == 'M' || ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad < 11)) {
                        this.hcprc.rips.embarazo = '9'
                    } else {
                        setTimeout(() => { this.datoEmbarazo(this.datoAnalisis, this.leerEstado) }, 200);
                    }
                }
            }
        },

        leerEstado() {
            if (this.hcprc.rips.embarazo == 9) {
                if ($_REG_PACI.SEXO == 'F' && ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad > 10)) {
                    this.aceptarEstado()
                } else {
                    this.aceptarCausa()
                }
            } else this.aceptarCausa()
        },

        aceptarCausa() {
            if (this.hcprc.serv == 08) {
                if (this.nit_usu == 830511298 || this.hcprc.rips.causa == 00 || (this.hcprc.rips.finalid >= 0 && this.hcprc.rips.finalid <= 09)) {
                    this.hcprc.rips.causa = 15
                }
            }

            setTimeout(() => { this.SER828() }, 200);
        },

        SER828() {
            POPUP({
                    array: this.array_causa,
                    titulo: "CAUSA EXTERNA",
                    indices: [{ id: "COD", label: "DESCRIP" }],
                    seleccion: this.hcprc.rips.causa,
                    callback_f: () => {
                        if (this.dato_8001.tipo == 2) this.pantalla_05()
                        else this.pantalla_04()
                    },
                },
                (data) => {
                    this.hcprc.rips.causa = data.COD;

                    if (["T781", "T782", "T783", "T784", "T788", "T789", "T803"].find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn)) {
                        this.datoTipoDiag()
                    } else {
                        var diagn1 = this.hcprc.rips.tabla_diagn[0].cod_diagn.substring(0, 1)
                        if (this.hcprc.rips.causa == 13 || this.hcprc.rips.causa == 15 && (diagn1 == 'S' || diagn1 == 'T')) {
                            CON851('7E', '7E', null, 'error', 'Error')
                            this.aceptarCausa()
                        } else {
                            this.datoTipoDiag()
                        }
                    }
                }
            );
        },

        datoTipoDiag() {
            setTimeout(() => { this.SER827() }, 200);
        },

        SER827() {
            POPUP({
                    array: this.array_tipo_diag,
                    titulo: "TIPO DE DIAGNOSTICO",
                    indices: [{ id: "COD", label: "DESCRIP" }],
                    seleccion: this.hcprc.rips.tipo_diag,
                    callback_f: () => {
                        this.aceptarCausa()
                    },
                },
                (data) => {
                    this.hcprc.rips.tipo_diag = data.COD;

                    let diagn = this.hcprc.rips.tabla_diagn[0].cod_diagn

                    if (['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[0].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[1].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[2].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[3].cod_diagn) || ['K359', "K350", "K351", "K37X"].find(el => el == this.hcprc.rips.tabla_diagn[4].cod_diagn)) {
                        if (this.hcprc.rips.tipo_diag == 2) {
                            CON851('EF', 'EF', null, 'error', 'Error')
                        }
                    }

                    this.datoNroControl()

                }
            );
        },

        datoNroControl() {
            if (this.hcprc.rips.finalid == 06) {
                if (this.hcprc.rips.primera_vez == 'S') {
                    this.hcprc.rips.nro_contr = 1
                    this.datoTannerPubico()
                } else {
                    validarInputs({
                        form: '#nro_contr'
                    }, () => {
                        this.datoTipoDiag()
                    }, () => {
                        if (this.hcprc.rips.nro_contr > 25) {
                            CON851('03', 'LIMITE MAXIMO 25', null, 'error', 'Error')
                            this.datoNroControl()
                        } else if (this.hcprc.rips.nro_contr < 2) {
                            CON851('03', 'NO MARCO 1RA VEZZ!', null, 'error', 'Error')
                            this.datoNroControl()
                        } else {
                            datoTannerPubico()
                        }
                    })
                }
            } else {
                this.hcprc.rips.nro_contr = 0
                this.datoTannerPubico()
            }
        },

        datoTannerPubico() {
            if (this.hcprc.rips.finalid == 05) {
                validarInputs({
                    form: '#tanner_pubico'
                }, () => {
                    this.datoTipoDiag()
                }, () => {
                    if ([0, 1, 2, 3, 4, 5].find(el => el == parseInt(this.hcprc.signos.tanner_pubico))) {
                        this.datoTannerGenit()
                    } else {
                        CON851('03', '03', null, 'error', 'Error')
                        this.datoTannerPubico()
                    }
                })
            } else {
                this.datoFechaProxCita('1')
            }
        },

        datoTannerGenit() {
            if (this.hcprc.rips.finalid == 05) {
                validarInputs({
                    form: '#tanner_genit'
                }, () => {
                    this.datoTipoDiag()
                }, () => {
                    if ([0, 1, 2, 3, 4, 5].find(el => el == parseInt(this.hcprc.signos.tanner_genit))) {
                        this.datoFechaProxCita('1')
                    } else {
                        CON851('03', '03', null, 'error', 'Error')
                        this.datoTannerGenit()
                    }
                })
            } else {
                this.datoFechaProxCita('1')
            }
        },

        datoFechaProxCita(orden) {
            if (this.hcprc.serv == 08) {
                validarInputs({
                        form: "#fecha_prox_cita",
                        orden: orden
                    },
                    () => {
                        $this.mostrarPantallaRips()
                    },
                    () => {
                        this.iniciales.ano_prox_cita = cerosIzq(this.iniciales.ano_prox_cita, 4)
                        this.iniciales.mes_prox_cita = cerosIzq(this.iniciales.mes_prox_cita, 2)
                        this.iniciales.dia_prox_cita = cerosIzq(this.iniciales.dia_prox_cita, 2)
                        this.hcprc.fecha_prox_cita = this.iniciales.ano_prox_cita.toString() + this.iniciales.mes_prox_cita.toString() + this.iniciales.dia_prox_cita.toString()

                        if (this.iniciales.ano_prox_cita < 1) {
                            this.iniciales.ano_prox_cita = 0
                            this.iniciales.mes_prox_cita = 0
                            this.iniciales.dia_prox_cita = 0
                            this.hcprc.fecha_prox_cita = '00000000'
                            this.datoSalida()
                        } else if (this.iniciales.ano_prox_cita < parseFloat(this.fecha_act.substring(0, 4)) || (this.iniciales.ano_prox_cita > parseFloat(this.fecha_act.substring(0, 4)) + 1) || this.hcprc.fecha_prox_cita < parseFloat(this.fecha_act)) {
                            CON851('37', '37', null, 'error', 'error')
                            this.datoFechaProxCita('1')
                        } else if (this.iniciales.mes_prox_cita < 1 || this.iniciales.mes_prox_cita > 12) {
                            CON851('03', '03', null, 'error', 'error')
                            this.datoFechaProxCita('2')
                        } else if (this.iniciales.dia_prox_cita < 1 || this.iniciales.dia_prox_cita > 31) {
                            CON851('37', '37', null, 'error', 'error')
                            this.datoFechaProxCita('3')
                        } else {
                            this.datoSalida()
                        }
                    }
                )
            } else {
                this.hcprc.fecha_prox_cita == '00000000'
                this.datoSalida()
            }
        },

        datoSalida() {
            this.SER831()
        },

        SER831() {
            POPUP({
                    array: this.array_salida,
                    titulo: "ESTADO SALIDA",
                    indices: [{ id: "COD", label: "DESCRIP" }],
                    seleccion: this.hcprc.rips.estado_sal,
                    callback_f: () => {
                        this.datoTipoDiag()
                    },
                },
                (data) => {
                    this.hcprc.rips.estado_sal = data.COD

                    if (this.hcprc.serv == 02 || this.hcprc.serv == 08) {
                        if (this.hcprc.rips.estado_sal == 4) {
                            this.hcprc.cierre.unserv = 03
                        } else {
                            this.hcprc.cierre.unserv = 05
                        }
                    }

                    if (this.hcprc.rips.estado_sal == 6) {
                        if (this.hcprc.rips.tabla_diagn[0].cod_diagn == 'Z538') {
                            this.datoRemitido()
                        } else {
                            this.datoSalida()
                        }
                    } else {
                        this.datoRemitido()
                    }
                }
            );
        },

        datoRemitido() {
            if (this.hcprc.rips.estado_sal == 3) {
                validarInputs({
                    form: '#remitido'
                }, () => {
                    this.datoSalida()
                }, () => {
                    if (this.hcprc.rips.remitido.trim() == '') {
                        CON851('03', '03', null, 'error', 'Error')
                        this.datoRemitido()
                    } else {
                        this.aceptarDiagnMuerte()
                    }
                })
            } else {
                this.hcprc.rips.remitido = ''
                this.aceptarDiagnMuerte()
            }
        },

        aceptarDiagnMuerte() {
            if (this.hcprc.rips.estado_sal == 2) {
                validarInputs({
                    form: '#diag_muer'
                }, () => {
                    this.datoSalida()
                }, async() => {
                    let busqEnf = this.enfermedades.find(e => e.COD_ENF == this.hcprc.cierre.diag_muer)
                    if (busqEnf) {
                        await this.editarEdad(busqEnf)

                        if (busqEnf.SEXO_ENF.trim() != '' && busqEnf.SEXO_ENF != $_REG_PACI.SEXO) {
                            CON851('73', '73', null, 'error', 'error')
                            this.aceptarDiagnMuerte()
                        } else if (busqEnf.EDAD_MIN_ENF > 0 && parseFloat(this.edad_hc_w) < parseFloat(this.edadMinW)) {
                            CON851('74', '74', null, 'error', 'error')
                            this.aceptarDiagnMuerte()
                        } else if (busqEnf.EDAD_MAX_ENF > 0 && parseFloat(this.edad_hc_w) > parseFloat(this.edadMaxW)) {
                            CON851('74', '74', null, 'error', 'error')
                            this.aceptarDiagnMuerte()
                        } else if (this.hcprc.cierre.diag_muer.substring(3, 4) == 'X') {
                            SolicitarDll({ datosh: datosEnvio() + this.hcprc.cierre.diag_muer }, dato => {
                                var date = dato.split("|");
                                var swinvalid = date[0];
                                if (swinvalid == '00') {
                                    this.confirmar();
                                } else if (swinvalid == '93') {
                                    this.aceptarDiagnMuerte();
                                }
                            }, get_url('APP/SALUD/SER851A.DLL'));
                        } else {
                            this.confirmar();
                        }
                    } else {
                        CON851('01', '01', null, 'error', 'error')
                        this.aceptarDiagnMuerte()
                    }
                })
            } else {
                this.hcprc.cierre.diag_muer = ''
                this.confirmar()
            }
        },

        confirmar() {
            CON851P('01', this.mostrarPantallaRips,
                async() => {
                    if (this.hcprc.serv > 02 && this.hcprc.serv != 08) {
                        this.hcprc.cierre.estado = 1
                    } else {
                        if (this.nit_usu == 845800138) {
                            if (this.hcprc.serv == 02 && this.hcprc.rips.estado_sal == 4) {
                                this.hcprc.cierre.estado = 1
                            } else {
                                this.hcprc.cierre.estado = 2
                                this.hcprc.cierre.egreso = this.fecha_act
                                this.hcprc.cierre.hora_egres = moment().format('HHmm')
                            }
                        } else {
                            this.hcprc.cierre.estado = 2
                            this.hcprc.cierre.egreso = this.fecha_act
                        }
                    }

                    if (this.hcprc.cierre.estado == 2) {
                        // LIBERAR CAMA
                    }

                    this.hcprc.cierre.temporal = 0
                    this.hcprc.cierre.clase = 0

                    await this.grabar()
                    this.actualizarRipsFactura()
                });
        },

        actualizarRipsFactura() {
            var data = {}
            data['datosh'] = datosEnvio() + this.nro_ult_comp + '|'
            data['paso'] = '1'

            postData(data, get_url("APP/SALUD/SER448C.DLL"))
                .then((data) => {
                    console.log(data)
                    this.marcarCita()
                })
                .catch(error => {
                    console.error(error)
                    this.marcarCita()
                });
        },

        marcarCita() {
            postData({ datosh: datosEnvio() + this.fecha_act + '|' + localStorage.IDUSU + '|' + $_REG_PACI.COD + '|' }, get_url("APP/HICLIN/HC-101.DLL"))
                .then(this.llamarFormulacion)
                .catch((err) => {
                    console.error(err)
                    setTimeout(() => {
                        this.llamarFormulacion()
                    }, 300);
                });
        },

        llamarFormulacion() {
            $_REG_HC.fecha_lnk = this.fecha_act;
            $_REG_HC.hora_lnk = this.hora_act;
            $_REG_HC.oper_lnk = localStorage.Usuario;
            $_REG_HC.opc_llamado = "1";
            $("#body_main").load("../../HICLIN/paginas/HC002F.html");
        },

        async grabar() {
            console.log('LLEGA A GRABAR')

            var datos = _getObjetoSaveHc($this.hcprc, filtroArray.tablasHC)

            postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
                .then((data) => {
                    console.log(data, 'GUARDA')
                })
                .catch((error) => {
                    console.log(error, 'ERROR')
                });

            let detalles = {
                "8001": _getObjetoSaveHc($this.dato_8001, []),
                "4040": _getObjetoSaveHc($this.dato_4040, [])
            }

            grabarDetalles(detalles, $_REG_HC.llave_hc)
        },

        async parentescoAntec(select, escape, siguiente) {
            POPUP({
                    array: this.array_parentesco,
                    titulo: "Parentesco",
                    indices: [{ id: "COD", label: "DESCRIP" }],
                    seleccion: this.dato_8001.dato_fam[select],
                    callback_f: () => {
                        this[escape]()
                    },
                },
                async(data) => {
                    this.dato_8001.dato_fam[select] = data.DESCRIP;
                    this[siguiente]()
                }
            )
        },

        salir() {
            this.flagSalir = true;
        },

        async abrirArchivos() {
            await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario.trim() + "|1|" }, get_url("APP/HICLIN/GET_HC.DLL"))
                .then(async(data) => {
                    this.hcprc = data
                    this.covid19 = this.hcprc.covid19
                    this.traerCiudades()
                    this.buscarComprobantes()
                })
                .catch((err) => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.log(err, "err");
                    loader('hide');
                    this.salir();
                });
        },

        async buscarComprobantes() {
            if ($_REG_HC.serv_hc == 02 || $_REG_HC.serv_hc == 08) {
                this.buscarConsultaExterna()
            }
            // FAMEDIC QUIERE BUSCAR COMPROBANTE PARA TELESALUD
            else if (this.nit_usu == 900405505 && $_REG_HC.serv_hc == 63) {
                this.buscarConsultaExterna()
            }
            // HOSPITAL DE SAN MARTIN QUIERE BUSCAR comprobante tambien para urgencias
            else if (this.nit_usu == 892000458 && $_REG_HC.serv_hc == 01) {
                this.buscarConsultaExterna()
            } else {
                this.verificarCrearHistoria()
            }
        },

        async buscarConsultaExterna() {
            postData({ datosh: datosEnvio() + localStorage.Usuario + '|' + $_REG_PACI.COD + '|' + $_REG_HC.serv_hc + '|' + moment().format('YYYYMMDD') + '|' }, get_url("APP/HICLIN/HC811B.DLL"))
                .then(data => {
                    console.log(data);
                    this.nro_ult_comp = data;
                    this.verificarCrearHistoria()
                })
                .catch(err => {
                    console.error(err)
                    this.salir();
                });
        },

        async verificarCrearHistoria() {
            this.hcprc.rips.finalid = $_REG_HC.finalid_hc

            if ($_REG_HC.novedad_hc == '7') {
                this.crearHistoria()

            } else {
                await this.errorYaExiste()

                if (localStorage.Usuario == 'GEBC' || this.hcprc.cierre.temporal == 1 || (this.nit_usu == 800037021 && localStorage.Usuario == 'ADMI') || (this.nit_usu == 892000401 && localStorage.Usuario == 'ADMI')) {
                    await this.traerDetalles()
                    if (!this.flagSalir) {
                        await this.leerAntecedentes_8001()
                        await this.leerAntecedentes_4040()
                        await this.consultarDetalle_7501()
                        await this.consultarDetalle_7503()
                        this.hcprc.cierre.estado = '1';
                        this.datoEmbarazada()
                    }
                } else {
                    this.salir()
                }
            }
        },

        async leerAntecedentes_8001() {
            // Antecedentes 8001 
            await this.consultarAntecedentes_WS8001()

            let tipo_w = this.dato_8001.tipo == 2 ? 2 : 1

            let busqDetalle = this.detalles.find(el => el['COD-DETHC'] == '8001' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
            if (busqDetalle) {
                this.dato_8001 = busqDetalle.DETALLE
                this.dato_8001.tipo = tipo_w
            }
        },

        async leerAntecedentes_4040() {
            // Antecedentes 4040
            let busqDetalle = this.detalles.find(el => el['COD-DETHC'] == '4040' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
            if (busqDetalle) {
                this.dato_4040 = busqDetalle.DETALLE
            } else {
                await this.consultarAntecedentes_WS4040()
            }
        },

        async consultarDetalle_7501() {
            // Detalle 7501 - ANALISIS
            let busqDetalle = this.detalles.find(el => el['COD-DETHC'] == '7501' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
            if (busqDetalle) this.analisis = busqDetalle.DETALLE
        },

        async consultarDetalle_7503() {
            // Detalle 7503 - PLAN
            let busqDetalle = this.detalles.find(el => el['COD-DETHC'] == '7503' && el['LLAVE-HC'] == $_REG_HC.llave_hc)
            if (busqDetalle) this.plan = busqDetalle.DETALLE
        },

        async errorYaExiste() {
            await postData({ datosh: datosEnvio(), paso: 1, codigo: $_REG_PROF.IDENTIFICACION }, get_url("APP/SALUD/SER819.DLL"))
                .then((data) => {
                    if (data.NOMBRE.trim() == 'Personal no atiende') {
                        CON851('9X', '9X', null, 'error', 'Error')
                        this.salir()
                    }
                }).catch((error) => {
                    CON851('', 'Error leyendo datos', null, 'error', 'Error')
                    this.salir()
                })

            jAlert({
                titulo: "ATENCIÓN",
                mensaje: `Ese paciente ya tiene historia clinica abierta, con fecha ${_editFecha2(this.hcprc.fecha)} ${this.hcprc.cierre.temporal == 1 ? '\n No fue totalmente diligenciada' : ''}`
            });
        },

        async datoEmbarazada() {
            if ($_REG_PROF.ATIENDE_PROF == 1) {
                if (($_REG_PROF.TAB_ESPEC[0].COD == 340 || $_REG_PROF.TAB_ESPEC[0].COD == 341) ||
                    ($_REG_PROF.TAB_ESPEC[0].COD == 340 || $_REG_PROF.TAB_ESPEC[0].COD == 341)) {
                    if ($_REG_PACI.SEXO == 'F' && $_REG_HC.edad_hc.unid_edad == 'A' && ($_REG_HC.edad_hc.vlr_edad > 8 && $_REG_HC.edad_hc.vlr_edad < 55)) {
                        if ($_REG_HC.serv_hc == 01 && (this.hcprc.embarazo == 1 || this.hcprc.embarazo == 2 || this.hcprc.embarazo == 3))
                            CON851('6E', '6E', null, 'error', 'error')
                    }
                } else this.pantalla_01()
            } else this.pantalla_01()
        },

        crearHistoria() {
            var data = {}
            data['datosh'] = datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + this.hcprc.novedad + '|';
            data['datos_basicos'] = this.fecha_act + '|' + this.hora_act + '|' + this.hcprc.med + '|' + $_REG_HC.serv_hc + '|' + this.hcprc.unid_edad + this.hcprc.vlr_edad + '|' + this.hcprc.edad_dias + '|8001|0|';

            postData(data, get_url("APP/HICLIN/SAVE_TEMP_HC.DLL"))
                .then(async(data) => {
                    console.log(data, 'data CREAR_HISTORIA')

                    if ($_REG_HC.serv_hc == 1 || $_REG_HC.serv_hc == 4) {
                        this.hcprc.proceden = data.PROCEDENCIA.trim()
                        this.hcprc.motiv = data.MOTIV.trim()
                        this.hcprc.signos.peso = parseFloat(data.PESO.trim()).toString()
                        this.hcprc.signos.talla = parseInt(data.TALLA).toString()
                        this.hcprc.rips.triage = data.TRIAGE.trim()
                        this.hcprc.rips.causa = data.CAUSA.trim()
                        this.hcprc.rips.finalid = data.FINALID.trim()
                        this.hcprc.rips.estado_sal = data.ESTADO_SAL.trim()
                        this.hcprc.rips.remitido = data.REMITIDO.trim()
                        this.hcprc.embarazo = data.EMBARAZO
                    }

                    this.hcprc.novedad = '8'

                    await this.consultarAntecedentes_WS8001()
                    await this.consultarAntecedentes_WS4040()
                    this.pantalla_01()
                })
                .catch(error => {
                    console.log(error)
                    CON851('', 'Ha ocurrido un error creando historia', null, 'error', 'Error')
                    this.salir()
                });
        },

        async consultarAntecedentes_WS8001() {
            await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc }, get_url("APP/HICLIN/HC8001-A.DLL"))
                .then((data) => {
                    this.dato_8001 = data
                })
                .catch((err) => {
                    CON851('', 'Error leyendo datos', null, 'error', 'Error')
                    console.log(err)
                });
        },

        async consultarAntecedentes_WS4040() {
            await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc }, get_url("APP/HICLIN/HCE4040-A.DLL"))
                .then((data) => {
                    this.dato_4040 = data
                    CON851('', 'Antecedentes cargados correctamente!', null, 'success', 'Detalles')
                })
                .catch((err) => {
                    CON851('', 'Error leyendo datos', null, 'error', 'Error')
                    console.log(err)
                });
        },

        _ventanaEntidades() {
            _ventanaDatos({
                titulo: 'ENTIDADES',
                columnas: ['COD-ENT', 'NOMBRE-ENT'],
                data: this.entidades,
                callback_esc: () => {
                    document.querySelector('.ips_lect')
                },
                callback: (data) => {
                    this.dato_8001.recepcion_entrega.ips_lect = data['COD-ENT']
                    setTimeout(() => { _enterInput('.ips_lect') }, 200);
                }
            })
        },

        _ventanaEspecialidades() {
            _ventanaDatos({
                titulo: 'ESPECIALIDADES',
                columnas: ['CODIGO', 'NOMBRE'],
                data: this.especialidades,
                callback_esc: () => {
                    document.querySelector('.remision_cod')
                },
                callback: (data) => {
                    this.dato_8001.control.remision_cod = data.CODIGO
                    setTimeout(() => { _enterInput('.remision_cod') }, 100);
                }
            })
        },

        _ventanaDiagnosticos(pos) {
            _ventanaDatos({
                titulo: "VENTANA DE ENFERMEDADES",
                columnas: ["COD_ENF", "NOMBRE_ENF"],
                data: this.enfermedades,
                callback_esc: function() {
                    document.querySelector(`.cod_diagn_${pos}`).focus()
                },
                callback: async function(data) {
                    $this.hcprc.rips.tabla_diagn[pos].cod_diagn = data['COD_ENF'].trim()
                    $this.hcprc.rips.tabla_diagn[pos].descrip_diagn = data['NOMBRE_ENF'].trim()
                    setTimeout(() => { _enterInput(`.cod_diagn_${pos}`) }, 200)
                }
            })
        },

        _ventanaDiagnosticosMuerte() {
            _ventanaDatos({
                titulo: "VENTANA DE ENFERMEDADES",
                columnas: ["COD_ENF", "NOMBRE_ENF"],
                data: this.enfermedades,
                callback_esc: function() {
                    document.querySelector(`.diag_muer`).focus()
                },
                callback: async function(data) {
                    $this.hcprc.cierre.diag_muer = data['COD_ENF'].trim()
                    setTimeout(() => { _enterInput(`.diag_muer`) }, 200)
                }
            })
        },

        traerCiudades() {
            postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
                .then((data) => {
                    this.params_hc890h.ciudades = data.CIUDAD
                    this.params_hc890h.ciudades.pop()
                    this.traerPaises()
                })
                .catch(error => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.error(error)
                    loader('hide')
                    this.salir()
                });
        },

        traerPaises() {
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
                .then((data) => {
                    this.params_hc890h.paises = data.PAISESRIPS
                    this.params_hc890h.paises.pop()
                    this.traerEntidades()
                })
                .catch(error => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.error(error)
                    loader('hide')
                    this.salir()
                });
        },

        traerEntidades() {
            postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
                .then((data) => {
                    this.entidades = data.ENTIDADES;
                    this.entidades.pop();
                    this.traerEspecialidades()
                })
                .catch((error) => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.log(error);
                    loader("hide");
                    this.salir();
                });
        },

        traerEspecialidades() {
            postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
                .then((data) => {
                    this.especialidades = data.ESPECIALIDADES;
                    this.especialidades.pop();
                    this.traerEnfermedades()
                })
                .catch((err) => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.log(err, "error");
                    loader("hide");
                    this.salir();
                });
        },

        traerEnfermedades() {
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
                .then((data) => {
                    this.enfermedades = data.ENFERMEDADES
                    this.enfermedades.pop()

                    for (var i in $this.enfermedades) {
                        this.enfermedades[i].NOMBRE_ENF = this.enfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
                    }

                    this.traerEnfermedadesTrans()
                })
                .catch(error => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.error(error);
                    loader('hide');
                    this.salir();
                });
        },

        traerEnfermedadesTrans() {
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER753A.DLL"))
                .then((data) => {
                    this.enfermedades_trans = data.TRANSMISIBLES
                    this.enfermedades_trans.pop()
                })
                .catch(error => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.error(error);
                    loader('hide');
                    this.salir();
                });
        },

        async traerDetalles() {
            await postData({
                    datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + '  ' + '|' + '  ' + '|' + '8001;4040;7501;7503' + '|' + $_REG_HC.serv_hc + '|'
                }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
                .then((data) => {
                    this.detalles = data["DETHC"]
                    this.detalles.pop()
                })
                .catch((error) => {
                    CON851('', 'Error consultando datos', null, 'error', 'error')
                    console.log(error)
                    loader("hide")
                    this.salir()
                });
        }
    }
});