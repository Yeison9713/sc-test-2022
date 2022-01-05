/*nit clientes
  * 892000401 - Nn
  * 800162035 - Nn
  * 800074996 - Nn
  * 901146885 - Nn
  * 900450008 - Nn
  * 900541158 - Nn
  * 832002436 - Nn
  * 900566047 - Nn
  * 822001570 - Nn
  * 900565371 - Nn
  * 800037202 - Nn

  * 844003225 - Ese Yopal
  * 900005594 - Ese Granada
  * 892000264 - ese acacias
  * 
  * 800037021 - H. Granada
  * 830511298 - multisalud
  * 900405505 - famedic
  * 845000038 - H. Mitu
  * 892000458 - H. San martin
  * 800037979 - H. Puerto lopez
  * 
  * 900004059 - H. Castilla
  * 844001287 - H. tauramena
  * 900306771 - MATSULDANY
  * 900077520 - San carlos de guaroa

  * 800175901 - Clinica emperatriz
*/

const Chart = require("chart.js");
const { modular } = require("../../frameworks/scripts/modular");

new Vue({
    el: "#hc_01",
    data: {
        header: {
            fecha_hc: {
                anio: null,
                mes: null,
                dia: null,
            },
            hora_hc: {
                hr: null,
                min: null,
            },
            novedad: null,
            unidad_serv: null,
            medico: null,
            descrip_medico: null,
            operador: null
        },
        info: {
            usuar: $_USUA_GLOBAL[0],
            profesional: JSON.parse(JSON.stringify($_REG_PROF)),
            paciente: $_REG_PACI,
            enfermedades: [],
            regHc: $_REG_HC,
            detallesHc: [],
            obj_triage: {},
            profesionales: [],
            patologias: [],
            TABLAS_OMS: [],
            SISVAN: {
                TABLA: [],
                CONTROL_MATERNO: [],
                talla_ant: 0,
                talla_ant_grafica: null,
            },
            graficas: {
                peso_edad: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                peso_talla: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                talla: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                imc: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                per_cef: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                imc_sem_gest: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                alt_sem_gest: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                gan_peso_sem_gest: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
                tension: {
                    info: {
                        meses: [],
                        oms_2: [],
                        oms_1: [],
                        oms_0: [],
                        oms_M1: [],
                        oms_M2: [],
                        paci: [],
                    },
                    graf: null,
                    img: null,
                    mostrar: false
                },
            },
            graficasPDF: {
                tallaXedad: null,
                imcXedad: null,
                pesoXtalla: null,
                pesoXedad: null,
                perCefXedad: null,
                imcXsemGest: null,
                altUterXsemGest: null,
                ganPesoXsemGest: null,
                tensXsemGest: null,
            },
        },
        form: modular.getObjRegHC,
        formDetalles: {
            enfer_act: { cod: 1001, text: null, change: false },
            af: {
                cod: 2002,
                text: null,
                _2002_1: { ...modular.detalle.WS_2002_1 },
                _2002_2: { ...modular.detalle.WS_2002_2 },
                antec_perinatal: { ...modular.detalle.WS_2002_3 },
                _2002_4: { ...modular.detalle.WS_2002_4 },
            },
            am: { cod: 2010, text: null, change: false },
            aq: { cod: 2020, text: null, change: false },
            aFame: { cod: 2030, text: null, change: false },
            alergicos: { cod: 2035, text: null, change: false },
            aTrauma: { cod: 2040, text: null, change: false },
            aOcupa: { cod: 2050, text: null, change: false },
            ago: { cod: 2060, text: null, change: false },
            otros: {
                cod: 2070,
                text: null,
                _2070_1: { ...modular.detalle.ws_2070_1 }
            },
            genograma: { cod: 2080, obj: modular.detalle.WS_2080 },
            os: {
                cod: 3010,
                text: null,
                _3010_1: { ...modular.detalle.WS_3010_1 }
            },
            cp: { cod: 3020, text: null, change: false },
            sd: { cod: 3030, text: null, change: false },
            sDermat: { cod: 3040, text: null, change: false },
            sist_oeste: { cod: 3050, text: null, change: false },
            sn: { cod: 3060, text: null, change: false },
            sis_psiq: { cod: 3070, text: null, change: false },
            sis_gent: { cod: 3080, text: null, change: false },
            sis_gine: { cod: 3090, text: null, change: false },
            sis_ago: { cod: 3095, text: null, change: false },
            examen: { cod: 4005, text: null, change: false },
            analisis: { cod: 7501, text: null, change: false },
            plan: { cod: 7503, text: null, change: false },
            "4040": { cod: 4040, ...modular.detalle.WS_4040 }
        },
        mostrarDesarrollo: false,
        mostrarEmbarazo: false,
        ultComprobante: {
            sucursal: null,
            cl: null,
            nro: null
        },
        modifica: {
            modal: false,
            label: null,
        },
        sw_var: {
            embar: true,
            urg: false,

            notificacion: false,
            recordatorios: false,

            grafico: false,
            covid: false,
            agudeza: true,
            epoc: false,
            ipa: false,
            minimental: false,

            _9011: false,
            pyp2: false,

            sintomatico: false,
            barthel: false,
            karnosky: false,
            findrisk: false,

            indiceEmbar: "",

            _2002Text: false,
            _2070Text: false,
            _3010Text: false,

            btnOmitir: false,
        },
        params_noti: {
            estado: false,
            llave_hc: null,
            admin: null,
            callback: null,
            callback_esc: null
        },
        params_conflicto: {
            modal: false,
            victima: null
        },
        params_vacunacion_covid: {
            estado: false,
            modal: false,
            paso: null,
        },
        params_aiepi845: {
            estado: false,
            llave_hc: null,
        },
        params_hc845a: {
            estado: false,
            llave_hc: null,
        },
        params_aiepi845a: {
            modal: false,
            estado: false,
            llave_hc: null,
        },
        params_hc845b: {
            estado: false,
            llave_hc: null,
        },

        params_otros_ant: {
            modal: false,
            vacuna: null,
            salud_oral: null,
        },
        params_hc890r: {
            llave_hc: false
        },
        params_ipa: {
            fuma: null,
            nroCigarrillosDiario: null,
            edad: null,
            ipa: null
        },
        params_fuma: {
            modal: false,
            fuma: null,
            dejarFumar: null,
            telefono: null,
            direcion: null
        },
        params_recordatorios: {
            paso: null,
            admin: null,
        },
        params_hc890h: {
            estado: false,
            pregunta: 0,
            ciudades: [],
            paises: [],
        },
        params_hc890i: {
            modal: false,
            estado: false,
        },
        params_viol_embar: {
            modal: false,
            curso_psicoprofilactico: null,
            ult_ano_humi_insul_ame: null,
            ult_ano_golp_bofe_fisi: null,
            gest_golp_bofe_fisi: null,
            ult_ano_forzada_sex: null,
        },
        params_aiepi847: {
            estado: false,
            llave_hc: null,
        },
        params_hc845se: {
            estado: false,
            llave_hc: null,
        },
        params_hc890g: {
            modal: false,
            estado: false,
        },
        params_hc890l: {
            modal: false,
            estado: false,
        },
        params_hc890O: {
            modal: false,
            estado: false,
        },
        params_uterina: {
            modal: false
        },
        params_hc890q: {
            estado: false,
            edadPaci: {}
        },

        // despues de examen fisico
        params_hc9010: {
            modal: false,
        },
        params_hc9011: {
            estado: false,
        },
        params_pyp2: {
            estado: false
        },
        params_hc890d: {
            estado: false,
            unserv: null,
            finalidad: null,
            sexo: null,
        },
        params_hc890b: {
            estado: false
        },
        params_hc890c: {
            estado: false
        },
        params_hc890e: {
            estado: false
        },
        params_hc890f: {
            modal: false,
            heridas: null,
            estado: null
        },
        params_hc890a: {
            modal: false,
        },
        params_sifilis: {
            enabled: false,
            estado: false,
        },
        params_hc832a: {
            estado: false,
        },
        params_citolAnorm: {
            modal: false,
            fecha_colpos: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_biopsia: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_patol: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_valorMedica: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_valorGine: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_contCitol: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_cancerCuello: {
                anio: null,
                mes: null,
                dia: null
            },
        },
        params_violGenero: {
            modal: false,
            fecha_remiPsiq: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_atenMedGen: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_atenPsicol: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_notifi: {
                anio: null,
                mes: null,
                dia: null
            },
        },
        params_violGenero2: {
            modal: false,
            fecha_segSem2: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_segSem4: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_segMes3: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_segMes6: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_seg1ano: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_cierreCaso: {
                anio: null,
                mes: null,
                dia: null
            }
        },

        requMamo: false,

        params_trastornos: {
            enabled: false,
            estado: false,
        },

        // rips

        params_primera_vez: {
            modal: false,
            fecha: {
                anio: null,
                mes: null,
                dia: null,
            }
        },
        params_proxima_cita: {
            modal: false,
            fecha: {
                anio: null,
                mes: null,
                dia: null,
            }
        },
        params_edad_gest: {
            modal: false
        },
        params_controles: {
            modal: false
        },

        params_4040: {
            fecha_ult_regla: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_parto: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_citol: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_aseso_pre: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_aseso_pos: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_eco_obst: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_eco_morfo: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_eco_percen: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_vac_influ: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_vac_tdap: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_vac_dpt: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_vac_tt: {
                anio: null,
                mes: null,
                dia: null
            },

            fecha_vih: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_vdrl: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_glucosa: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_ptog: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_gota_grues: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_estrep_b: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_igm: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_rubeo_igg: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_rubeo_igm: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_chagas_tot: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_chagas_sint: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_tsh: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_citolo_cerv: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_serolo: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_hemog: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_igg: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_glicem: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_hemogra: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_hemopara: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_fta_abs: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_uroanali: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_uroculti: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_frotisv: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_glicemia: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_hepatB: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_gineco: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_odonto: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_nutri: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_psicol: {
                anio: null,
                mes: null,
                dia: null
            },
            grupo: "",
            rh: "",
        },

        params_total: {
            modal: false,
            subtotal1: null,
            subtotal2: null,
            subtotal3: null,
            subtotal4: null,
            total: null,
        },

        params_etv: {
            modal: false,
            fecha_inicio_tto: {
                anio: null,
                mes: null,
                dia: null
            },
            fecha_fin_tto: {
                anio: null,
                mes: null,
                dia: null
            },
        },

        params_hc890s: {
            estado: false,
            llave_hc: null,
            serv_hc: null
        },

        cod_diagn: "",
        datos_findrisk: {
            peso_lnk: "",
            talla_lnk: "",
            imc_lnk: "",
            vlr_edad_lnk: "",
            per_abdo_lnk: "",
            tens1_lnk: ""
        },
        datos_heridas: {},
        datos_creatinina: {},

        label: {
            af: "Antecedentes familiares, F3 Graba.",
            salud_oral: "Salud oral ultimos 6 meses:",
            otrosAnt: "Otros antecedentes.",
        },

        // 
        fecha_lnk: null,
        fecha_limi_regla: null,

        ventanaPacienteCronico: false,
        ventanaValoradoPorCronic: false,
        ventanaMultidrogoresistente: false,

        descrip: {
            bisiesto: '',
            ano_diagDm: '',
            mes_diagDm: '',
            dia_diagDm: '',

            ano_diagHta: '',
            mes_diagHta: '',
            dia_diagHta: '',

            ano_ingProg: '',
            mes_ingProg: '',
            dia_ingProg: '',

            descripRecibeIeca: '',
            descripRecibeAraii: '',

            ano_mi: '',
            mes_mi: '',
            dia_mi: '',

            ano_endocri: '',
            mes_endocri: '',
            dia_endocri: '',

            ano_cardio: '',
            mes_cardio: '',
            dia_cardio: '',

            ano_oftal: '',
            mes_oftal: '',
            dia_oftal: '',

            ano_nefro: '',
            mes_nefro: '',
            dia_nefro: '',

            ano_psicol: '',
            mes_psicol: '',
            dia_psicol: '',

            ano_nutri: '',
            mes_nutri: '',
            dia_nutri: '',

            ano_trabajoSoc: '',
            mes_trabajoSoc: '',
            dia_trabajoSoc: '',
        },

        params_sintomaticos: {
            sintom_resp: "",
            sintom_piel: "",
            contacto_lepra: "",
            victi_maltrato: "",
            victi_violencia: "",
            enfer_mental: "",
            enfer_its: "",
            cual_its: "",
            trata_its: "",
            cancer_seno: "",
            cancer_cervis: "",
            edu_autoexa_seno: "",
            citologia_previa: "",
            fecha_cito_previa: "",
            resul_cito_previa: "",
            fecha_ult_mamo: "",
        },

        datos_tacto: {
            tacto_rectal: "",
            nota_tacto_rectal: "",
        },
        examen_visual: {
            agudeza_visual_oi_1: "",
            agudeza_visual_oi_2: "",
            agudeza_visual_od_1: "",
            agudeza_visual_od_2: "",
            estructuras_oculares_oi: "",
            estructuras_oculares_od: "",
            distancia_agud: "",
        },

        tituloCronico: '',
    },
    components: {
        notificaiones: require("../../HICLIN/scripts/HC002N.vue"),

        vacunacion_covid: require("../../HICLIN/scripts/HC-9012.vue"),
        hc890r: require("../../HICLIN/scripts/HC890R.vue"),
        ipa: require("../../HICLIN/scripts/IPA.vue"),
        recordatorios: require("../../CONTAB/scripts/CON880RV.vue"),
        covid19: require("../../HICLIN/scripts/hc890h-1.vue"),
        sifilis: require("../../HICLIN/scripts/hc890i.vue"),

        agudeza_visual: require("../../HICLIN/scripts/HC890G.vue"),
        discapacidad: require("../../HICLIN/scripts/hc890l.vue"),
        tacto_rectal: require("../../HICLIN/scripts/HC890O.vue"),
        minimental: require("../../HICLIN/scripts/HC890Q.vue"),

        vales: require("../../HICLIN/scripts/HC-9010.vue"),
        apgar: require("../../HICLIN/scripts/HC-9011.vue"),
        pyp2: require("../../HICLIN/scripts/PYP2.vue"),

        sintomaticos: component_hc890d,
        barthel: require("../../HICLIN/scripts/HC890B.vue"),
        karnosky: require("../../HICLIN/scripts/HC890C.vue"),
        findrisk: require("../../HICLIN/scripts/HC890E.vue"),
        heridas: require("../../HICLIN/scripts/HC890F.vue"),
        creatinina: require("../../HICLIN/scripts/HC890A.vue"),

        enfer_mental: require("../../HICLIN/scripts/TRASTORNOS-MENTALES.vue"),
        diagn_sifilis: require("../../HICLIN/scripts/SIFILIS.vue"),
        anomalias: require("../../HICLIN/scripts/HC832A.vue"),
        informal: require("../../HICLIN/scripts/HC890S.vue"),

        // 2002
        aiepi845: require("../../HICLIN/scripts/AIEPI845.vue"), // 1
        hc845a: require("../../HICLIN/scripts/HC845A.vue"), // 2
        aiepi845a: component_AIEPI845A, // 3
        hc845b: require("../../HICLIN/scripts/HC845B.vue"), // 4

        // 2070
        aiepi847: require("../../HICLIN/scripts/AIEPI847.vue"), // 1

        // 3010
        hc845se: require("../../HICLIN/scripts/HC845SE.vue"), // 1
    },
    mounted() {
        _vm = this;
        loader("show");
        _inputControl("reset");
        _inputControl("disabled");

        this.fecha_actual = this._currentDate().fecha;
        this.fecha_lnk = this._currentDate().fecha;

        this._getCiudades();
        let serv = this.info.regHc.serv_hc;
        let nit = this.info.usuar.NIT;
        if (
            serv == 02 ||
            serv == 08 ||
            ([900405505, 892000264].includes(nit) && serv == 63) ||
            (nit == 892000458 && serv == 01)
        ) {
            this._buscarConsultaExterna();
        } else {
            this._setNroFolio();
        }

        console.clear();
    },
    computed: {
        cambios_findrisk: function () {
            return {
                peso_lnk: this.form.signos.peso,
                talla_lnk: this.form.signos.talla,
                imc_lnk: this.form.signos.imc_corp,
                vlr_edad_lnk: this.info.regHc.edad_hc.vlr_edad,
                per_abdo_lnk: this.form.signos.per_abdo,
                tens1_lnk: this.form.signos.tens1,
            };
        },
    },
    watch: {
        formDetalles: {
            handler(obj) {
                Object.getOwnPropertyNames(obj).forEach(val => {
                    this._modificarArrayDetalles(obj[val]);
                });
            },
            deep: true
        },
        "formDetalles.4040.gineco_esq_w.fecha_regla_esq_w": function (val) {
            this.params_4040.fecha_ult_regla = _getObjDate(val)
        },

        "formDetalles.4040.gineco_esq_w.fecha_citol_esq_w": function (val) {
            this.params_4040.fecha_citol = _getObjDate(val)
        },
        "formDetalles.4040.gineco_esq_w.ult_parto_esq_w": function (val) {
            this.params_4040.fecha_parto = _getObjDate(val)
        },
        "formDetalles.4040.gineco_esq_w.ult_regla_esq_w": function (val) {
            let consulta = modular.arrays.ult_regla_esq_w.find((e) => e.value == val);
            console.log(val, consulta)
            if (consulta) this.$refs.ult_regla_esq_w.value = consulta.text;
        },

        "formDetalles.4040.prenatal2_esq_w": {
            handler(obj) {

                Object.getOwnPropertyNames(obj).forEach(val => {

                    if (val == "fecha_eco_morfo_esq_w") {
                        this.params_4040.fecha_eco_morfo = _getObjDate(obj[val])
                    }

                    if (val == "fecha_eco_percen_esq_w") {
                        this.params_4040.fecha_eco_percen = _getObjDate(obj[val])
                    }

                    if (val == "fecha_vac_dpt_esq_w") {
                        this.params_4040.fecha_vac_dpt = _getObjDate(obj[val])
                    }

                });
            }, deep: true
        },

        "formDetalles.4040.prenatal_esq_w": {
            handler(obj) {

                Object.getOwnPropertyNames(obj).forEach(val => {

                    if (val == "fecha_aseso_pre_esq_w") {
                        this.params_4040.fecha_aseso_pre = _getObjDate(obj[val])
                    }

                    if (val == "fecha_aseso_pos_esq_w") {
                        this.params_4040.fecha_aseso_pos = _getObjDate(obj[val])
                    }

                    if (val == "fecha_eco_obst_esq_w") {
                        this.params_4040.fecha_eco_obst = _getObjDate(obj[val])
                    }

                    if (val == "fecha_vac_influ_esq_w") {
                        this.params_4040.fecha_vac_influ = _getObjDate(obj[val])
                    }

                    if (val == "fecha_vac_tdap_esq_w") {
                        this.params_4040.fecha_vac_tdap = _getObjDate(obj[val])
                    }

                    if (val == "fecha_vac_tt_esq_w") {
                        this.params_4040.fecha_vac_tt = _getObjDate(obj[val])
                    }

                });
            }, deep: true
        },
        "formDetalles.4040.fecha_interconsulta_esq_w": {
            handler(obj) {

                Object.getOwnPropertyNames(obj).forEach(val => {

                    if (val == "fecha_gineco_esq_w") {
                        this.params_4040.fecha_gineco = _getObjDate(obj[val])
                    }

                    if (val == "fecha_odonto_esq_w") {
                        this.params_4040.fecha_odonto = _getObjDate(obj[val])
                    }

                    if (val == "fecha_nutri_esq_w") {
                        this.params_4040.fecha_nutri = _getObjDate(obj[val])
                    }

                    if (val == "fecha_psicol_esq_w") {
                        this.params_4040.fecha_psicol = _getObjDate(obj[val])
                    }

                });
            }, deep: true
        },

        "form.signos.aper_ocul": function (val) {
            let consulta = modular.arrays.resp_ocular.find((e) => e.value == val);
            if (consulta) this.$refs.resp_ocular.value = consulta.text;
            this._calcularIndiceGlasgow();
        },
        "form.signos.resp_verb": function (val) {
            let consulta = modular.arrays.resp_verbal.find((e) => e.value == val);
            if (consulta) this.$refs.resp_verbal.value = consulta.text;
            this._calcularIndiceGlasgow();
        },
        "form.signos.resp_moto": function (val) {
            let consulta = modular.arrays.resp_moto.find((e) => e.value == val);
            if (consulta) this.$refs.resp_moto.value = consulta.text;

            this._calcularIndiceGlasgow();
        },

        "form.signos": {
            handler(obj) {
                // sintomaticos
                let filtro_hc890d = [
                    "sintom_respi",
                    "sintom_piel",
                    "contacto_lepra",
                    "victi_maltrato",
                    "victi_violencia",
                    "enfer_mental",
                    "enfer_its",
                    "cual_its",
                    "trata_its",
                    "cancer_seno",
                    "cancer_cervis",
                    "edu_autoexa_seno",
                    "citologia_previa",
                    "fecha_cito_previa",
                    "resul_cito_previa",
                    "fecha_ult_mamo"
                ]

                Object.getOwnPropertyNames(obj).forEach(val => {

                    if (filtro_hc890d.includes(val)) {
                        if (val == "sintom_respi") {
                            this.params_sintomaticos.sintom_resp = obj[val]
                        } else this.params_sintomaticos[val] = obj[val]
                    }
                })

            },
            deep: true
        },

        cambios_findrisk: function (data) {
            this.datos_findrisk = data;
        },

        "form.rips": {
            handler(obj) {
                let filtro = ["atiende", "causa", "tipo_diag", "finalid", "estado_sal"]

                Object.getOwnPropertyNames(obj).forEach(val => {
                    if (filtro.includes(val) && obj[val]) {
                        let consulta = modular.arrays[val].find(e => e.value == obj[val]);

                        if (consulta) {
                            this.$refs[val].value = `${consulta.value} - ${consulta.text}`
                        }
                    }
                })
            },
            deep: true
        },

        "form.rips.embarazo": function (val) {
            let consulta = modular.arrays.embarazo.find(e => e.value == val);

            if (consulta) {
                this.$refs.embarazo.value = `${consulta.value} - ${consulta.text}`

                if (this.sw_var.embar) {
                    this.$refs.embarazo_4040.value = consulta.text
                }
            }
        },

        "form.planific": function (val) {
            let consulta = modular.arrays.planific.find(e => e.value == val);
            if (consulta) { this.$refs.planific.value = `${val} - ${consulta.text}` }
        },

        "formDetalles.4040.obstetric_esq_w.presentac_esq_w": function (val) {
            let consulta = modular.arrays.presentac_esq.find((e) => e.value == val);
            if (consulta) this.$refs.presentac_esq_w.value = consulta.text;
        },
        "formDetalles.4040.obstetric_esq_w.situacion_esq_w": function (val) {
            let consulta = modular.arrays.situacion_esq.find((e) => e.value == val);
            if (consulta) this.$refs.situacion_esq_w.value = consulta.text;
        },
        "formDetalles.4040.obstetric_esq_w.dorso_obs_esq_w": function (val) {

            let index = parseFloat(this.formDetalles['4040'].obstetric_esq_w.situacion_esq_w) || 0;

            if (index > 0) {
                let consulta = modular.arrays.dorso_obs_esq[index - 1].find((e) => e.value == val);
                if (consulta) this.$refs.dorso_obs_esq_w.value = consulta.text;
            }
        },
        "formDetalles.4040.obstetric_esq_w.implantacion_esq_w": function (val) {
            val = parseFloat(val) || 0;
            let consulta = modular.arrays.implantacion_esq.find((e) => e.value == val);
            if (consulta) this.$refs.implantacion_esq_w.value = consulta.text;
        },
    },
    methods: {
        _buscarConsultaExterna() {
            let fecha = this._currentDate().fecha;

            let datosh =
                datosEnvio() +
                localStorage.Usuario +
                "|" +
                this.info.paciente.COD +
                "|" +
                this.info.regHc.serv_hc +
                "|" +
                fecha +
                "|";

            postData({ datosh }, get_url("APP/HICLIN/HC811B.DLL"))
                .then((data) => {
                    let llave = data.trim() || "";

                    this.ultComprobante = {
                        sucursal: llave.substring(0, 2),
                        cl: llave.substring(2, 3),
                        nro: llave.substring(3, 9),
                    }

                    this._setNroFolio();
                })
                .catch((err) => {
                    _regresar_menuhis();
                });
        },

        _setNroFolio() {
            // multisalud se asigna el folio y sucursal segun la sucursal del comprobante
            let nit = this.info.usuar.NIT;

            if ([830511298].includes(nit)) {
                let sucursal = this.ultComprobante.sucursal || "";

                let datos = {
                    datosh: datosEnvio(),
                    paciente: this.info.paciente.COD || "",
                    sucursal,
                    llave: this.info.regHc.llave_hc
                }

                postData(datos, get_url("APP/HICLIN/HC811A.DLL"))
                    .then(res => {
                        this.info.regHc.llave_hc = res
                        this._getHistoria();
                    })
                    .catch(err => {
                        loader("hide");
                        _regresar_menuhis();
                    })
            } else this._getHistoria();

        },

        _getHistoria() {
            let datosh =
                datosEnvio() +
                this.info.regHc.llave_hc +
                "|" +
                localStorage.Usuario +
                "|";

            postData({ datosh }, get_url("APP/HICLIN/GET_HC.DLL"))
                .then((res) => {
                    let data = res;

                    data.paciente = this.info.regHc.id_paciente;
                    data.folio_suc = this.info.regHc.llave_hc.substring(15, 17);
                    data.folio_nro = this.info.regHc.llave_hc.substring(17, 23);

                    let new_array = [];
                    let tabla_diagn = data.rips.tabla_diagn.filter((e) => e.cod_diagn.trim() != "");

                    tabla_diagn.forEach((item, index) => {
                        new_array.push(
                            {
                                nro: index + 1,
                                ...item
                            }
                        )
                    })

                    data.rips.tabla_diagn = new_array || [];

                    // se modifica en caso de novedad 8
                    data.serv = this.info.regHc.serv_hc;
                    data.cierre.unserv = this.info.regHc.serv_hc;
                    data.rips.finalid = this.info.regHc.finalid_hc;

                    data.edad = this.info.regHc.edad_hc;
                    data.edad_dias = this._calcularEdadDias(this.info.paciente.NACIM, this.fecha_lnk);

                    this.form = JSON.parse(JSON.stringify(data));
                    let motiv = this.form.motiv || "";
                    this.form.motiv = motiv.enterPut();

                    // IMPRESION EVOLUCIONES ANTERIORES DE ELECTRON
                    loader("hide");
                    this.imprimir_HC002B().then(() => {
                        loader("show");
                        if (data.novedad == 8) {
                            this._errorYaExiste();
                        } else this._getUnser();
                    })

                })
                .catch((error) => {
                    loader("hide");
                    _regresar_menuhis();
                });
        },

        _errorYaExiste() {
            loader("hide");
            let data = this.form;

            if (data.cierre.temporal == "1") {
                this.modifica.label = "No fue totalmente diligenciada";
            }

            this.modifica.modal = true;
        },

        _validarYaExiste() {
            this.modifica.modal = false;

            let data = this.form;
            let admin = localStorage.Usuario;
            let nit = this.info.usuar.NIT;

            if (
                admin == "GEBC" ||
                (data.cierre.temporal == "1" && data.oper_elab == admin) ||
                ([800037021, 892000401].includes(nit) && admin == "ADMI") ||
                (nit == 800162035 && admin == "NCCP")
            ) {
                loader("show");
                let embarazo = this.form.rips.embarazo;
                if (["1", "2", "3"].includes(embarazo)) this.sw_var.embar = true;

                this._getUnser();
            } else {
                _regresar_menuhis();
            }
        },

        _getUnser() {
            let datos = {
                datosh: datosEnvio(),
                paso: 1,
                codigo: this.form.serv,
            };

            postData(datos, get_url("APP/SALUD/SER873.dll"))
                .then((data) => {
                    this.header.unidad_serv = `${data.COD} - ${data.DESCRIP}`;
                    this._getDetallesHc();
                })
                .catch((err) => {
                    loader("hide");
                    _regresar_menuhis();
                });
        },

        _getDetallesHc() {
            let folio = parseFloat(this.form.folio_nro),
                llave = "",
                data_w = this.form;

            if (data_w.novedad == "7") {
                folio = folio - 1;
            }

            if (folio < 1) llave = data_w.llave;
            else {
                llave =
                    data_w.paciente +
                    data_w.folio_suc +
                    folio.toString().padStart(6, "0");
            }

            let cod_detalles = ""
            let array = Object.getOwnPropertyNames(this.formDetalles);
            array.forEach(e => { cod_detalles += this.formDetalles[e].cod + ";" })

            let datos = {
                datosh: datosEnvio() + llave + "|||" + cod_detalles + "|"
            }

            postData(datos, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
                .then((data) => {
                    let detalles = Regexp_detalle(
                        data.DETHC.filter((e) => e["LLAVE-HC"].trim() != "")
                    );

                    this.info.detallesHc = JSON.parse(JSON.stringify(detalles));
                    this._mostrarFechas();
                })
                .catch((error) => {
                    console.log(error);
                    loader("hide");
                    _regresar_menuhis();
                });
        },

        _mostrarFechas() {
            loader("hide")

            var date = this._currentDate(),
                fecha = date.fecha,
                novedad = this.form.novedad,
                hora = date.hora.split(":").join(""),
                admin = localStorage.Usuario,
                nit = this.info.usuar.NIT;

            if (novedad == "7") {
                this.form.cierre.temporal = "1";
                this.form.cierre.estado = "0";
                this.form.esquema = "HC01";
                this.header.novedad = "Creando";
                this.form.oper_elab = admin;
                this.header.operador = admin;

                this.form.med = this.info.profesional.IDENTIFICACION;
            } else {
                if (parseFloat(this.form.fecha) != 0) {
                    hora = this.form.hora;
                    fecha = this.form.fecha;
                }
                this.header.operador = this.form.oper_elab;
                this.header.novedad = "Actualizando";
            }

            this.header.fecha_hc.anio = fecha.substring(0, 4);
            this.header.fecha_hc.mes = fecha.substring(4, 6);
            this.header.fecha_hc.dia = fecha.substring(6, 8);
            this.header.hora_hc.hr = hora.substring(0, 2);
            this.header.hora_hc.min = hora.substring(2, 4);

            this.header.medico = this.info.profesional.IDENTIFICACION;
            this.header.descrip_medico = this.info.profesional.DESCRIPCION


            if (this.form.cierre.estado == 2) {
                CON851("70", "70", null, "error", "error");
                if (
                    admin == "GEBC" ||
                    ([800037021, 892000401].includes(nit) && admin == "ADMI") ||
                    (nit == 800162035 && admin == "NCCP")
                ) {
                    this._datoFecha();
                } else {
                    _regresar_menuhis();
                }
            } else {
                let medico_lnk = this.info.profesional.IDENTIFICACION;
                let medico_hc = this.form.med;
                if (
                    admin == "GEBC" ||
                    medico_lnk == medico_hc ||
                    ([800037021, 892000401].includes(nit) && admin == "ADMI") ||
                    (nit == 800162035 && admin == "NCCP")
                ) {
                    this._montarPrincipal();
                } else {
                    CON851("70", "70", null, "error", "error");
                    _regresar_menuhis();
                }
            }
        },

        _datoFecha() {
            let admin = localStorage.Usuario,
                nit = this.info.usuar.NIT;
            if (
                admin == "GEBC" ||
                ([800037021, 892000401].includes(nit) && admin == "ADMI") ||
                (nit == 800162035 && admin == "NCCP") ||
                [900450008, 901146885].includes(nit)
            ) {
                this._validarFecha();
            } else {
                this._montarPrincipal();
            }
        },

        _validarFecha() {
            validarInputs(
                {
                    form: "#faseFecha",
                    orden: "1",
                },
                () => {
                    CON851P(
                        "03",
                        () => {
                            this._validarFecha();
                        },
                        _regresar_menuhis
                    );
                },
                () => {
                    let { fecha_hc } = this.header;
                    if (_validarFecha(fecha_hc.anio, fecha_hc.mes, fecha_hc.dia)) {
                        this._validarHora();
                    } else this._validarFecha();
                }
            );
        },
        _validarHora() {
            validarInputs(
                {
                    form: "#faseHora",
                    orden: "1",
                },
                () => {
                    this._validarFecha();
                },
                () => {
                    let { hr, min } = this.header.hora_hc;
                    if (
                        parseFloat(hr) > 23 ||
                        parseFloat(hr) < 0 ||
                        parseFloat(min) > 59 ||
                        parseFloat(min) < 0
                    ) {
                        this._validarHora();
                    } else this._validarProfesionales();
                }
            );
        },

        _validarProfesionales() {
            loader("show");

            if (this.info.profesionales.length > 0) {
                this._validarMedico()
                loader("hide");
            } else {
                postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
                    .then(res => {
                        loader("hide");
                        this.info.profesionales = res.ARCHPROF
                        this.info.profesionales.pop();
                        this._validarMedico()
                    }).catch(err => {
                        console.log(err)
                        loader("hide");
                        this._validarHora()
                    })
            }
        },

        _validarMedico() {
            validarInputs(
                {
                    form: "#faseMedico",
                    orden: "1",
                },
                () => {
                    this._validarHora();
                },
                () => {
                    let medico = this.header.medico;
                    let consulta = this.info.profesionales.find(e => parseFloat(e.IDENTIFICACION) == parseFloat(medico));

                    if (consulta) {
                        this.info.profesional = consulta
                        this._montarPrincipal();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarMedico()
                    }
                }
            );
        },

        _ventanaProfesionales() {
            let data = this.info.profesionales;

            _ventanaDatos({
                titulo: "Busqueda de profesionales",
                columnas: [
                    { value: "IDENTIFICACION", label: "Identificacion", },
                    { value: "NOMBRE", label: "Nombre", },
                    { value: "DESCRIPCION", label: "Descripcion", }
                ],
                data,
                callback_esc: () => {
                    this.$refs.header_medico.focus();
                },
                callback: (data) => {
                    this.header.medico = data.IDENTIFICACION;
                    this.$refs.header_medico.focus();
                    _enterInput(`[ref="header_medico"`);
                },
            });
        },

        _montarPrincipal() {
            loader("show")
            this.form.rips.atiende = this.info.profesional.ATIENDE_PROF;
            this.header.medico = this.info.profesional.IDENTIFICACION;
            this.header.descrip_medico = this.info.profesional.DESCRIPCION

            // consulta historia anterior y consulta triage

            if (
                (this.form.novedad == "7" || this.form.cierre.temporal == "1") &&
                (this.form.serv == 01 || this.form.serv == 04)
            ) {
                this._buscarTriage();
            } else this._validarConsultaCompFact();
        },

        _buscarTriage() {
            this.form.cierre.nit_contab = this.info.usuar.NIT;

            let fecha = this.header.fecha_hc;
            let hora = this.header.hora_hc;
            let datosh =
                datosEnvio() +
                this.form.llave +
                "|" +
                fecha.año +
                fecha.mes +
                fecha.dia +
                "|" +
                hora.hr +
                hora.min +
                "|";

            postData({ datosh }, get_url("APP/HICLIN/TRIAGE.DLL"))
                .then((data) => {
                    if (data.llave) {
                        Object.keys(data).forEach((a) => {
                            data[a] = data[a].enterPut();
                        });

                        this.info.obj_triage = JSON.parse(JSON.stringify(data));
                    }

                    if (data.llave && this.form.novedad == "7") {
                        this.form.proceden = data.procedencia;
                        this.form.motiv = data.motiv.enterPut();
                        this.form.signos.peso = data.peso;
                        this.form.signos.talla = data.talla;
                        this.form.signos.temp = data.temp;

                        this.form.signos.fcard = data.fcard;
                        this.form.signos.fresp = data.fresp;
                        this.form.signos.tens1 = data.tens1;
                        this.form.signos.tens2 = data.tens2;
                        this.form.signos.oximetria = data.oximetria;

                        this.form.signos.aper_ocul = data.glasg.substring(0, 1)
                        this.form.signos.resp_verb = data.glasg.substring(1, 2)
                        this.form.signos.resp_moto = data.glasg.substring(2, 3)

                        this.form.rips.embarazo = data.embar;
                        this.form.rips.triage = data.triage;
                        this.form.rips.causa = data.causa;

                        this.form.rips.finalid = data.finalidad;
                        this.form.rips.remitido = data.remitido;
                        if (!this.form.cierre.eps) this.form.cierre.eps = data.eps;

                        if (!data.prefijo && !data.nro_fact) {
                            this.form.cierre.nro_fact = `${data.prefijo}${data.nro_fact}`
                        }

                        let { enf_act, af, aq, alergicos, analisis, examen } = data;
                        this.formDetalles.enfer_act.text = enf_act;
                        this.formDetalles.af.text = af;
                        this.formDetalles.aq.text = aq;
                        this.formDetalles.alergicos.text = alergicos;
                        this.formDetalles.analisis.text = analisis;
                        this.formDetalles.examen.text = analisis;

                        this._validarConsultaCompFact();
                    } else this._validarConsultaCompFact();
                })
                .catch((err) => {
                    console.log(err);
                    loader("hide");
                    _regresar_menuhis();
                });
        },

        _validarConsultaCompFact() {
            if (this.form.serv != "02") this._buscarFactura();
            else this._validarCompFact();
        },

        _buscarFactura() {
            let prefijo = this.info.obj_triage.prefijo,
                nro_fact = this.info.obj_triage.nro_fact || "0",
                fecha = this.header.fecha_hc,
                datosh =
                    datosEnvio() +
                    this.form.llave +
                    "|" +
                    fecha.anio +
                    fecha.mes +
                    fecha.dia +
                    "|" +
                    prefijo +
                    "|" +
                    nro_fact.padStart(6, "0") +
                    "|";

            postData({ datosh }, get_url("APP/HICLIN/CON_NUMER.DLL"))
                .then((data) => {
                    this.form.cierre.nro_fact = `${data.prefijo}${data.nro_fact}`;
                    this._validarCompFact();
                })
                .catch((err) => {
                    console.log(err);
                    loader("hide");
                    _regresar_menuhis();
                });
        },
        _validarCompFact() {
            let fecha = parseFloat(this._currentDate().fecha);
            let nit = this.info.usuar.NIT;

            // se agrega nit de acacias, que sea obligatorio creacion de factura
            // antes de la atencion

            if (this.form.serv == 01 && ([844003225, 892000264].includes(nit))) {
                if (fecha > 20190331) {
                    let prefijo = this.info.usuar.PREFIJ;
                    if (
                        (prefijo != "EM" ||
                            prefijo != "CH" ||
                            prefijo != "TL" ||
                            prefijo != "CS") &&
                        this.form.cierre.prefijo == ""
                    ) {
                        loader("hide");
                        plantillaError("9A", "9A", "HC-01", _regresar_menuhis);
                    } else this._llenarDatosPag1();
                } else this._llenarDatosPag1();
            } else this._llenarDatosPag1();
        },

        _llenarDatosPag1() {
            loader("hide");
            _inputControl("disabled");
            this._montarDatosPantalla();
            this._validarDatoEmbarazada();
        },

        _validarDatoEmbarazada() {
            /* 
                Se habilita preguntas de embarazadas
            */

            let { profesional } = this.info;
            let perinatal = true;

            if (profesional.ATIENDE_PROF == 1) {
                const intersection = profesional.TAB_ESPEC.find((e) =>
                    ["340", "341"].includes(e.COD)
                );

                if (!intersection) perinatal = false;
            }

            if (this.form.rips.finalid == '11') {
                this.tituloCronico = 'Patol. cronica';
            } else {
                this.tituloCronico = 'Cronico';
            }

            if (
                perinatal &&
                this.info.paciente.SEXO == "F" &&
                this.form.edad.unid_edad == "A" &&
                this.form.edad.vlr_edad > 8 &&
                this.form.edad.vlr_edad < 55
            ) {
                if (
                    this.form.serv == "01" &&
                    (this.form.rips.embarazo == "1" ||
                        this.form.rips.embarazo == "2" ||
                        this.form.rips.embarazo == "3")
                ) {
                    plantillaToast("6E", "6E", null, "warning", "");
                    this.sw_var.embar = true;
                    this._disableInputs();
                } else if (this.form.serv == "08" && this.form.rips.finalid == "06") {
                    this.sw_var.embar = true;
                    this._disableInputs();
                } else {
                    CON851P(
                        "29",
                        () => {
                            this.sw_var.embar = false;
                            this._disableInputs();
                        },
                        () => {
                            this.sw_var.embar = true;
                            this._disableInputs();
                        }
                    );
                }
            } else this._disableInputs(), this.sw_var.embar = false;
        },

        _disableInputs() {
            setTimeout(() => {
                _inputControl("disabled");
                this._validarProcedencia()
            }, 150);
        },

        _validarProcedencia() {
            if (this.sw_var.embar) {
                if (!this.form.motiv) this.form.motiv = "Evaluacion perinatal";
            }

            validarInputs(
                {
                    form: "#fase_procedencia",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarProcedencia",
                            callback_esc: "_validarProcedencia"
                        })
                    },
                    event_f5: () => {
                        let admin = localStorage.Usuario;
                        let nit = this.info.usuar.NIT;

                        if (admin == "GEBC" ||
                            ([800037021, 892000401].includes(nit) && admin == "ADMI") ||
                            nit == 800162035 && admin == "NCCP" ||
                            nit == 900450008
                        ) {
                            this._validarFecha()
                        } else {
                            CON851P("03",
                                () => {
                                    this._validarProcedencia()
                                },
                                () => {
                                    // eliminar h.c. - pediente if (temporal == 1 and proceden == "")
                                    _regresar_menuhis()
                                }
                            );
                        }
                    }
                },
                () => {
                    CON851P("03",
                        () => {
                            this._validarProcedencia()
                        }, _regresar_menuhis
                    );
                },
                () => {
                    this._activarModalVictima()
                }
            );
        },

        _activarModalVictima() {
            let victima = this.info.paciente["VICTI-CONFLICTO"] || ""
            this.params_conflicto.victima = victima;

            this.params_conflicto.modal = true;
            this._validarDatoVictimaConflic()
        },

        _validarDatoVictimaConflic() {
            validarInputs(
                {
                    form: "#faseVictimaConflicto",
                },
                () => {
                    this.params_conflicto.modal = false;
                    this._validarProcedencia();
                },
                async () => {
                    victima = this.params_conflicto.victima || "";
                    victima = victima.toUpperCase();

                    this.params_conflicto.victima = victima
                    this.info.paciente["VICTI-CONFLICTO"] = victima

                    if (victima == "S" || victima == "N") {
                        await this._actualizarDatosPaciente();
                        this.params_conflicto.modal = false;
                        this._validarAcompañante();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoVictimaConflic();
                    }
                }
            );
        },

        _validarAcompañante() {
            validarInputs(
                {
                    form: "#fase_acompa",
                    orden: "1",
                },
                () => {
                    this._validarProcedencia()
                },
                () => {
                    this._validarMotivo()
                }
            );
        },
        _validarMotivo() {
            validarInputs(
                {
                    form: "#fase_motivo",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarMotivo",
                            callback_esc: "_validarMotivo"
                        })
                    }
                },
                () => {
                    this._validarAcompañante()
                },
                () => {
                    this._validarEnferActual()
                }
            );
        },
        _validarEnferActual() {
            validarInputs(
                {
                    form: "#fase_enferActual",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarEnferActual",
                            callback_esc: "_validarEnferActual"
                        })
                    }
                },
                () => {
                    this._validarMotivo()
                },
                () => {
                    this.formDetalles.enfer_act.change = true
                    this.validarVacunacionCovid19()
                }
            );
        },
        validarVacunacionCovid19() {
            this.params_vacunacion_covid.modal = true;
            setTimeout(() => {
                this.params_vacunacion_covid.paso = 1;
                this.params_vacunacion_covid.estado = true;
            }, 200);
        },

        validarEsc_vacunacion_covid() {
            this.params_vacunacion_covid.estado = false
            this.params_vacunacion_covid.modal = false;
            this._validarEnferActual();
        },

        validarCallback_vacunacion_covid() {
            this.params_vacunacion_covid.estado = false
            this.params_vacunacion_covid.modal = false;
            this._activarVentanaRecordatorio();
        },

        _activarVentanaRecordatorio() {
            this.params_recordatorios.paso = 1
            this.params_recordatorios.admin = localStorage.Usuario
            this.sw_var.recordatorios = true;
        },

        _validarCallbackRecordatorio() {
            this.sw_var.recordatorios = false;
            this._validarPag_01()
        },

        _validarPag_01() {
            this.form.cierre.nit_fact = this.info.paciente["NIT-FACT"];

            if (this.form.cierre.eps == "") {
                this.form.cierre.eps = this.info.paciente.EPS;
            }

            let { fecha_hc, hora_hc } = this.header
            this.form.fecha = `${fecha_hc.anio}${fecha_hc.mes}${fecha_hc.dia}`;
            this.form.hora = `${hora_hc.hr}${hora_hc.min}`;


            loader("show")
            this._guardarHistoria().then(() => {
                this.form.novedad = "8";
                this._guardarDetallesHc().then(() => {
                    loader("hide")
                    this._asumirAntecedentes()
                    this._validarVentanaAf();
                }).catch((err) => {
                    console.log(err)
                    loader("hide")
                    this._validarEnferActual();
                });
            }).catch((err) => {
                console.log(err)
                loader("hide")
                this._validarEnferActual();
            });

        },

        _asumirAntecedentes() {
            if (this.info.profesional.ATIENDE_PROF == "1") {
                let data = this.formDetalles
                if (!data.af.text) this.formDetalles.af.text = "NO REFIERE";
                if (!data.am.text) this.formDetalles.am.text = "NO REFIERE";
                if (!data.aq.text) this.formDetalles.aq.text = "NO REFIERE";
                if (!data.aFame.text) this.formDetalles.aFame.text = "NO REFIERE";
                if (!data.aTrauma.text) this.formDetalles.aTrauma.text = "NO REFIERE";
                if (!data.aOcupa.text) this.formDetalles.aOcupa.text = "NO REFIERE";
                if (!data.ago.text) this.formDetalles.ago.text = "NO REFIERE";
                if (!data.otros.text) this.formDetalles.otros.text = "NO REFIERE";
            }

            if (this.form.serv == "01") this.label.af = "Antecedentes generales, F3 Graba";
            else this.label.af = "Antecedentes familiares, F3 Graba";
        },

        _validarVentanaAf() {
            this.params_aiepi845.llave_hc = this.form.llave
            this.params_hc845a.llave_hc = this.form.llave
            this.params_aiepi845a.llave_hc = this.form.llave
            this.params_hc845b.llave_hc = this.form.llave

            let consulta = this._validar2002();

            switch (consulta) {
                case "01": this.params_aiepi845.estado = true; break;
                case "02": this.params_hc845a.estado = true; break;

                case "03":
                    this.params_aiepi845a.modal = true;
                    setTimeout(() => {
                        this.params_aiepi845a.estado = 1
                    }, 500);
                    break;

                case "04": this.params_hc845b.estado = true; break;
                default:
                    this.sw_var._2002Text = true;
                    this._validarAf(); break;
            }
        },


        _validar2002() {
            let retorna = "PL";
            let _2002 = this.info.detallesHc.find(e => e["LLAVE-HC"] == this.form.llave && e["COD-DETHC"] == "2002");

            if (_2002) {
                _2002 = { ..._2002.DETALLE }

                if (["01", "02", "03", "04"].includes(_2002.tipo_ws)) {
                    retorna = _2002.tipo_ws;
                }
            } else {
                if (this.sw_var.embar) {
                    retorna = "01"
                } else {
                    const intersection = this.info.profesional.TAB_ESPEC.find((e) =>
                        ["550", "551"].includes(e.COD)
                    );

                    if (intersection) {
                        retorna = "02"
                    } else {
                        if (this.form.serv == "08") {
                            if (this.form.edad.vlr_edad < 10) {
                                retorna = "03"
                            } else {
                                retorna = "04"
                            }
                        }
                    }
                }
            }
            return retorna;
        },

        _validarAf() {
            validarInputs(
                {
                    form: "#fase_af",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarAf",
                            callback_esc: "_validarAf"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "af",
                                callback_esc: "_validarAf",
                                callback: "_guardarAntPerinatales"
                            }
                        )
                    },
                    event_av_pag: () => {
                        this._validarGenograma()
                    },
                },
                () => { this._validarDatoEmbarazada() },
                () => { this._guardarAntPerinatales() }
            );
        },

        _escape_2002() {
            this._cerrarVentanas2002()
            this._validarEnferActual()
        },

        _cerrarVentanas2002() {
            this.params_aiepi845.estado = false
            this.params_hc845a.estado = false

            this.params_aiepi845a.modal = false
            this.params_aiepi845a.estado = false

            this.params_hc845b.estado = false
        },

        _guardarAntPerinatales(data = {}) {
            data = { ...data.antec_perinatal }
            let datos = {}
            let llave = this.form.llave;

            if (this.form.serv == "08") {
                let patologias = data.patologias_familiares || ""
                data.patologias_familiares = patologias.enterReplace();
                data.tipo_ws = "03";
                datos = { 2002: data };
            } else {
                data = this.formDetalles.af.text.enterReplace().strToTable("RENG_DETHC");
                data.tipo_ws = "PL";
                datos = { 2002: data };
            }

            modular.grabarDetalles(datos, llave)
                .then(() => {
                    CON851("", "Antecedentes perinatales guardados", null, "success", "Correcto");
                    this._onValidarAf();
                })
                .catch((err) => {
                    console.error(err);
                    CON851("", "Error Guardando antecedentes perinatales", null, "error", "Error");
                    this._escape_2002();
                });
        },

        _onValidarAf() {
            this._cerrarVentanas2002()
            if (this.sw_var.urg) this._validarAlergicos();
            else this._validarAm();
        },

        _validarAm() {
            validarInputs(
                {
                    form: "#fase_am",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarAm",
                            callback_esc: "_validarAm"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "am",
                                callback_esc: "_validarAm",
                                callback: "_validarAq"
                            }
                        )
                    },
                },
                () => { this._validarVentanaAf() },
                () => {
                    this.formDetalles.am.change = true
                    this._validarAq()
                }
            );
        },

        _validarAq() {
            validarInputs(
                {
                    form: "#fase_aq",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarAq",
                            callback_esc: "_validarAq"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "aq",
                                callback_esc: "_validarAq",
                                callback: "_validarAfame"
                            }
                        )
                    },
                },
                () => { this._validarAm() },
                () => {
                    this.formDetalles.aq.change = true
                    this._validarAfame()
                }
            );
        },

        _validarAfame() {
            validarInputs(
                {
                    form: "#fase_aFame",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarAfame",
                            callback_esc: "_validarAfame"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "aFame",
                                callback_esc: "_validarAfame",
                                callback: "_validarAlergicos"
                            }
                        )
                    },
                },
                () => { this._validarAq() },
                () => {
                    this.formDetalles.aFame.change = true
                    this._validarAlergicos()
                }
            );
        },

        _validarAlergicos() {
            validarInputs(
                {
                    form: "#fase_alergicos",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarAlergicos",
                            callback_esc: "_validarAlergicos"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "alergicos",
                                callback_esc: "_validarAlergicos",
                                callback: "_ventanaOtrosAnt"
                            }
                        )
                    },
                },
                () => {
                    if (this.sw_var.urg) this._validarVentanaAf();
                    else this._validarAfame();
                },
                () => {
                    this.formDetalles.alergicos.change = true
                    this._ventanaOtrosAnt()
                }
            );
        },

        _ventanaOtrosAnt() {
            this.params_otros_ant.vacuna = this.form.esq_vacuna_completo;

            if (this.form.rips.finalid == 7) {
                this.label.salud_oral = "Salud oral ultimos 12 meses:"
                this.params_otros_ant.salud_oral = this.form.salud_oral_ult_12mes;
            } else {
                this.label.salud_oral = "Salud oral ultimos 6 meses:"
                this.params_otros_ant.salud_oral = this.form.salud_oral_ult_6mes;
            }

            this.params_otros_ant.salud_oral = this.form.esq_vacuna_completo;
            this.params_otros_ant.modal = true;
            this._validarVacunaCompleta()
        },

        _validarVacunaCompleta() {
            validarInputs(
                {
                    form: "#faseVacunaCompleta",
                    orden: "1"
                },
                () => {
                    this.params_otros_ant.modal = false
                    this._validarAlergicos();
                },
                () => {
                    let vacuna = this.params_otros_ant.vacuna || "N";
                    vacuna = vacuna.toUpperCase()
                    this.params_otros_ant.vacuna = vacuna;

                    if (["S", "N"].includes(vacuna)) {
                        this.form.esq_vacuna_completo = vacuna;
                        this._validarSaludOral()
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarVacunaCompleta()
                    }
                }
            )
        },

        _validarSaludOral() {
            validarInputs(
                {
                    form: "#faseSaludOral",
                    orden: "1"
                },
                () => {
                    this._validarVacunaCompleta()
                },
                () => {
                    let salud_oral = this.params_otros_ant.salud_oral || "N"
                    salud_oral = salud_oral.toUpperCase()
                    this.params_otros_ant.salud_oral = salud_oral;

                    if (["S", "N"].includes(salud_oral)) {

                        if (this.form.rips.finalid == 7) {
                            this.form.salud_oral_ult_12mes = salud_oral
                            this.form.salud_oral_ult_6mes = ""
                        } else {
                            this.form.salud_oral_ult_12mes = ""
                            this.form.salud_oral_ult_6mes = salud_oral
                        }

                        this.params_otros_ant.modal = false;
                        this._llenarEpoc();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarSaludOral()
                    }
                }
            )
        },
        _llenarEpoc() {
            let edad = this.form.edad;

            if (
                this.form.serv == 08
                && edad.unid_edad == "A"
                && edad.vlr_edad >= 18
                && ["07", "11"].includes(this.form.rips.finalid)
            ) {
                this.sw_var.epoc = true;
                this.params_hc890r.llave_hc = this.form.llave;
            } else this._llenarIpa()
        },

        _callbackEpoc() {
            this.params_hc890r.estado = false
            this.sw_var.epoc = false;

            this._llenarIpa()
        },
        _validarEscEpoc() {
            this.params_hc890r.estado = false
            this.sw_var.epoc = false;
            this._ventanaOtrosAnt()
        },

        _llenarIpa() {
            let edad = this.form.edad;

            if (
                this.form.serv == 08
                && edad.unid_edad == "A"
                && edad.vlr_edad >= 18
            ) {
                this.sw_var.ipa = true;
                this.params_ipa.fuma = this.form.cierre.paciente_cronic.fuma;
                this.params_ipa.nroCigarrillosDiario = this.form.signos.nro_cigarrillos_diario;
                this.params_ipa.nroAnosFumando = this.form.signos.nro_anos_fumando;
                this.params_ipa.ipa = this.form.signos.ipa;
            } else this._ventanaFuma();
        },

        _callbackIpa(data) {
            this.form.cierre.paciente_cronic.fuma = data.fuma;
            this.form.signos.nro_cigarrillos_diario = data.nroCigarrillosDiario;
            this.form.signos.nro_anos_fumando = data.nroAnosFumando;
            this.form.signos.ipa = data.ipa

            this.sw_var.ipa = false;
            this._ventanaFuma()
        },

        _validarEscIpa() {
            this.sw_var.ipa = false;
            this._ventanaOtrosAnt()
        },

        _ventanaFuma() {
            let nit = this.info.usuar.NIT;
            let edad = this.form.edad;
            if (([900541158, 900405505].includes(nit) && this.form.serv == 09)
                || (edad.unid_edad == "A" && edad.vlr_edad < 12)) {
                this._ventanaCovid19()
            } else {
                if (!this.params_fuma.fuma) {
                    this.params_fuma.fuma = this.form.cierre.paciente_cronic.fuma;
                    this.params_fuma.dejarFumar = this.form.signos.dejar_fumar;
                }

                this.params_fuma.modal = true;
                this._validarFuma();
            }
        },

        _validarFuma() {
            validarInputs(
                {
                    form: "#faseFuma",
                    orden: "1"
                },
                () => {
                    this.params_fuma.modal = false;
                    this._ventanaOtrosAnt()
                },
                () => {
                    let fuma = this.params_fuma.fuma || "";
                    fuma = fuma.toUpperCase();
                    this.params_fuma.fuma = fuma

                    if (["S", "N"].includes(fuma)) {
                        if (fuma == "S") {
                            this.form.cierre.paciente_cronic.fuma = fuma;
                            this._validarDejarFumar();
                        } else {
                            this.form.signos.dejar_fumar = ""
                            this._cerrarVentanaFuma()
                        }
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarFuma()
                    }
                }
            )
        },

        _validarDejarFumar() {
            validarInputs(
                {
                    form: "#faseDejarFumar",
                    orden: "1"
                },
                () => {
                    this._validarFuma()
                },
                () => {
                    let dejarFumar = this.params_fuma.dejarFumar || ""
                    dejarFumar = dejarFumar.toUpperCase();
                    this.params_fuma.dejarFumar = dejarFumar;

                    if (["S", "N"].includes(dejarFumar)) {
                        this.form.signos.dejar_fumar = dejarFumar;

                        if (dejarFumar == "S") this._validarTelFuma();
                        else this._cerrarVentanaFuma()

                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarDejarFumar()
                    }
                }
            )
        },
        _validarTelFuma() {
            if (!this.params_fuma.telefono) {
                this.params_fuma.telefono = this.info.paciente.TELEFONO
            }

            validarInputs(
                {
                    form: "#faseTelFuma",
                    orden: "1"
                },
                () => {
                    this._validarDejarFumar()
                },
                () => {
                    this._validarDirFuma()
                }
            )
        },

        _validarDirFuma() {
            if (!this.params_fuma.direcion) {
                this.params_fuma.direcion = this.info.paciente.DIRECC || ""
            }

            validarInputs(
                {
                    form: "#faseDirFuma",
                    orden: "1"
                },
                () => {
                    this._validarTelFuma()
                },
                async () => {
                    this.info.paciente.TELEFONO = this.params_fuma.telefono;
                    this.info.paciente.DIRECC = this.params_fuma.direcion;

                    await this._actualizarDatosPaciente()
                    this._cerrarVentanaFuma();

                }
            )
        },

        _cerrarVentanaFuma() {
            this.params_fuma.modal = false
            this._ventanaCovid19()
        },

        _ventanaCovid19() {
            if (this.sw_var.covid) {
                this.params_hc890h.pregunta = 1;
                this.params_hc890h.estado = true;
            } else {
                this._cerrarPag1Covid19()
            }
        },

        _cerrarPag1Covid19() {
            if (this.sw_var.urg && this.info.usuar.NIT != 892000458) {
                this._saltoPag2();
            } else this._validarATrauma()
        },

        _validarATrauma() {
            validarInputs(
                {
                    form: "#fase_aTrauma",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarATrauma",
                            callback_esc: "_validarATrauma"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "aTrauma",
                                callback_esc: "_validarATrauma",
                                callback: "_validarAOcupa"
                            }
                        )
                    },
                },
                () => { this._validarAlergicos() },
                () => {
                    this.formDetalles.aTrauma.change = true;
                    this._validarAOcupa()
                }
            );
        },

        _validarAOcupa() {
            validarInputs(
                {
                    form: "#fase_aOcupa",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarAOcupa",
                            callback_esc: "_validarAOcupa"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "aOcupa",
                                callback_esc: "_validarAOcupa",
                                callback: "_validarObstetricos"
                            }
                        )
                    },
                },
                () => { this._validarATrauma() },
                () => {
                    this.formDetalles.aOcupa.change = true;
                    this._validarObstetricos()
                }
            );
        },

        _validarObstetricos() {
            if (this.info.paciente.SEXO == "M") {
                this._validarVentanaOtros();
            } else {
                this._validarAgo();
            }
        },
        _validarAgo() {
            validarInputs(
                {
                    form: "#fase_ago",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarAgo",
                            callback_esc: "_validarAgo"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "ago",
                                callback_esc: "_validarAgo",
                                callback: "_validarVentanaOtros"
                            }
                        )
                    },
                },
                () => { this._validarAOcupa() },
                () => {
                    this.formDetalles.ago.change = true;
                    this._validarVentanaOtros()
                }
            );
        },

        _validarVentanaOtros() {
            this.params_aiepi847.llave_hc = this.form.llave
            let _2070 = this.info.detallesHc.find(e => e["LLAVE-HC"] == this.form.llave && e["COD-DETHC"] == "2070");

            if (_2070) {
                _2070 = { ..._2070.DETALLE }

                if (_2070.tipo_ws == "01") {
                    this.params_aiepi847.estado = true
                } else {
                    this.sw_var._2070Text = true;
                    this._validarOtros()
                }
            } else {
                if (this.sw_var.embar) {
                    this.params_aiepi847.estado = true
                } else {
                    this.sw_var._2070Text = true;
                    this._validarOtros()
                }
            }
        },

        _validarOtros() {
            validarInputs(
                {
                    form: "#fase_otros_ant",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarOtros",
                            callback_esc: "_validarOtros"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "otros",
                                callback_esc: "_validarOtros",
                                callback: "_validarGenograma"
                            }
                        )
                    },
                },
                () => { this._validarAOcupa() },
                () => { this._guardarOtrosAntecedentes() }
            );
        },

        _guardarOtrosAntecedentes() {
            let llave = this.form.llave;
            let data = this.formDetalles.otros.text.enterReplace().strToTable("RENG_DETHC");

            data.tipo_ws = "PL";
            let datos = { 2070: data };

            modular.grabarDetalles(datos, llave)
                .then(() => {
                    this._ventanaSifilis();
                })
                .catch((err) => {
                    console.error(err);
                    CON851("", "Error Guardando otros antecedentes", null, "error", "Error");
                    this._validarVentanaOtros();
                });
        },

        _onValidarOtros() {
            this.params_aiepi847.estado = false;
            this._ventanaSifilis();
        },

        _escape_2070() {
            this.params_aiepi847.estado = false;
            this._validarAOcupa()
        },

        _ventanaSifilis() {
            if (this.sw_var.embar && this.form.serv == 08) {
                this.params_hc890i.modal = true

                setTimeout(() => {
                    this.params_hc890i.estado = true
                }, 350);
            } else {
                this._VentanaEmbarViolencia()
            }
        },

        EscSifilis() {
            this.params_hc890i.estado = false
            this.params_hc890i.modal = false
            this._validarVentanaOtros()
        },

        callbackSifilis() {
            this.params_hc890i.estado = false
            this.params_hc890i.modal = false
            this._VentanaEmbarViolencia();
        },

        _VentanaEmbarViolencia() {
            if (this.sw_var.embar && this.form.serv == 08) {
                let signos = this.form.signos;

                this.params_viol_embar.curso_psicoprofilactico = signos.curso_psicoprofilactico;
                this.params_viol_embar.ult_ano_humi_insul_ame = signos.ult_ano_humi_insul_ame;
                this.params_viol_embar.ult_ano_golp_bofe_fisi = signos.ult_ano_golp_bofe_fisi;
                this.params_viol_embar.gest_golp_bofe_fisi = signos.gest_golp_bofe_fisi;
                this.params_viol_embar.ult_ano_forzada_sex = signos.ult_ano_forzada_sex;

                this.params_viol_embar.modal = true;
                this._validarPsicoprofilactico()
            } else this._validarGenograma();
        },

        _validarPsicoprofilactico() {
            validarInputs(
                {
                    form: "#fasePsicopro",
                    orden: "1"
                },
                () => {
                    this.params_viol_embar.modal = false;
                    this._validarVentanaOtros()
                },
                () => {
                    let psicoprofilactico = this.params_viol_embar.curso_psicoprofilactico || ""
                    psicoprofilactico = psicoprofilactico.toUpperCase();

                    if (["S", "N"].includes(psicoprofilactico)) {
                        this.params_viol_embar.curso_psicoprofilactico = psicoprofilactico;
                        this._validarUltAnoHumi()
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarPsicoprofilactico()
                    }
                }
            )
        },

        _validarUltAnoHumi() {
            validarInputs(
                {
                    form: "#faseUltAnoHumi",
                    orden: "1"
                },
                () => {
                    this._validarPsicoprofilactico()
                },
                () => {
                    let ult_ano_humi_insul_ame = this.params_viol_embar.ult_ano_humi_insul_ame || ""
                    ult_ano_humi_insul_ame = ult_ano_humi_insul_ame.toUpperCase()

                    if (["S", "N"].includes(ult_ano_humi_insul_ame)) {
                        this.params_viol_embar.ult_ano_humi_insul_ame = ult_ano_humi_insul_ame;
                        this._validarUltAnotGolp()
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarUltAnoHumi()
                    }

                }
            )
        },

        _validarUltAnotGolp() {
            validarInputs(
                {
                    form: "#faseUltAnoGolp",
                    orden: "1"
                },
                () => {
                    this._validarUltAnoHumi()
                },
                () => {
                    let ult_ano_golp_bofe_fisi = this.params_viol_embar.ult_ano_golp_bofe_fisi || ""
                    ult_ano_golp_bofe_fisi = ult_ano_golp_bofe_fisi.toUpperCase();

                    if (["S", "N"].includes(ult_ano_golp_bofe_fisi)) {
                        this.params_viol_embar.ult_ano_golp_bofe_fisi = ult_ano_golp_bofe_fisi;
                        this._validarGestGolp()
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarUltAnotGolp()
                    }
                }
            )
        },
        _validarGestGolp() {
            validarInputs(
                {
                    form: "#faseGestGolp",
                    orden: "1"
                },
                () => {
                    this._validarUltAnotGolp()
                },
                () => {
                    let gest_golp_bofe_fisi = this.params_viol_embar.gest_golp_bofe_fisi || ""
                    gest_golp_bofe_fisi = gest_golp_bofe_fisi.toUpperCase()

                    if (["S", "N"].includes(gest_golp_bofe_fisi)) {
                        this.params_viol_embar.gest_golp_bofe_fisi = gest_golp_bofe_fisi
                        this._validarUltAnoForzada();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarGestGolp()
                    }
                }
            )
        },
        _validarUltAnoForzada() {
            validarInputs(
                {
                    form: "#faseUltAnoForzada",
                    orden: "1"
                },
                () => {
                    this._validarGestGolp()
                },
                () => {
                    let ult_ano_forzada_sex = this.params_viol_embar.ult_ano_forzada_sex || "";
                    ult_ano_forzada_sex = ult_ano_forzada_sex.toUpperCase();

                    if (["S", "N"].includes(ult_ano_forzada_sex)) {
                        this.params_viol_embar.ult_ano_forzada_sex = ult_ano_forzada_sex;
                        this._cerrarVentanaViolEmbar()
                    } else {
                        CON851("03", "03", null, "error", "error")
                        this._validarUltAnoForzada()
                    }
                }
            )
        },

        _cerrarVentanaViolEmbar() {
            let data = this.params_viol_embar;

            this.form.signos.curso_psicoprofilactico = data.curso_psicoprofilactico;
            this.form.signos.ult_ano_humi_insul_ame = data.ult_ano_humi_insul_ame;
            this.form.signos.ult_ano_golp_bofe_fisi = data.ult_ano_golp_bofe_fisi;
            this.form.signos.gest_golp_bofe_fisi = data.gest_golp_bofe_fisi;
            this.form.signos.ult_ano_forzada_sex = data.ult_ano_forzada_sex;

            this.params_viol_embar.modal = false
            this._validarGenograma()
        },

        _validarGenograma() {
            if (
                this.form.edad.unid_edad == "D" ||
                this.form.edad.unid_edad == "M" ||
                this.form.edad.vlr_edad < 15
            ) {
                let { profesional } = this.info;
                const intersection = profesional.TAB_ESPEC.find((e) =>
                    ["431", "442", "490", "492", "550", "551"].includes(e.COD)
                );

                if (this.form.rips.atiende == 2 || intersection) {
                    this.formDetalles.genograma.obj.edad1_pad_esq_w = "A";
                    this.formDetalles.genograma.obj.edad1_mad_esq_w = "A";

                    this._validarGenogPad();
                } else this._saltoPag2()
            } else this._saltoPag2()
        },

        _validarGenogPad() {
            validarInputs(
                {
                    form: "#faseEdadPadre",
                    orden: "1"
                },
                () => {
                    this._validarVentanaOtros();
                },
                () => {
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_pad_esq_w) || 0;

                    if ((edad > 0 && edad < 12) || edad > 120) {
                        this._validarGenogPad();
                    } else {
                        this._validarGenogMad();
                    }
                }
            );
        },

        _validarGenogMad() {
            validarInputs(
                {
                    form: "#faseEdadMadre",
                    orden: "1"
                },
                () => {
                    this._validarGenogPad();
                },
                () => {
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_mad_esq_w) || 0;

                    if ((edad > 0 && edad < 12) || edad > 120) {
                        this._validarGenogMad();
                    } else {
                        this._validarGenogHer1Sex();
                    }
                }
            );
        },

        _validarGenogHer1Sex() {
            validarInputs(
                {
                    form: "#FaseH1Sexo",
                    orden: "1",
                },
                () => {
                    this._validarGenogMad();
                },
                () => {
                    let sexo = this.formDetalles.genograma.obj.sexo_her1_esq_w || "";
                    sexo = sexo.toUpperCase();

                    if (["M", "F"].includes(sexo)) {
                        this.formDetalles.genograma.obj.sexo_her1_esq_w = sexo;
                        this._validarGenogHer1Ed1();
                    } else if (sexo == "") {
                        this.formDetalles.genograma.obj.edad1_her1_esq_w = "";
                        this.formDetalles.genograma.obj.edad2_her1_esq_w = "";
                        this._validarGenogHer2Sex();
                    } else {
                        this._validarGenogHer1Sex();
                    }
                }
            );
        },

        _validarGenogHer1Ed1() {
            if (!this.formDetalles.genograma.obj.edad1_her1_esq_w) {
                this.formDetalles.genograma.obj.edad1_her1_esq_w = "A"
            }

            validarInputs(
                {
                    form: "#FaseH1UnidadEdad",
                    orden: "1",
                },
                () => {
                    this._validarGenogHer1Sex();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her1_esq_w || "";
                    unidad = unidad.toUpperCase();

                    if (["D", "M", "A"].includes(unidad)) {
                        this.formDetalles.genograma.obj.edad1_her1_esq_w = unidad;
                        this._validarGenogHer1Ed2();
                    } else {
                        this._validarGenogHer1Ed1();
                    }
                }
            );
        },

        _validarGenogHer1Ed2() {
            if (!this.formDetalles.genograma.obj.edad2_her1_esq_w) {
                this.formDetalles.genograma.obj.edad2_her1_esq_w = 0
            }

            validarInputs(
                {
                    form: "#FaseH1Edad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer1Ed1();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her1_esq_w;
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_her1_esq_w) || 0;
                    let edadMadre = parseInt(this.formDetalles.genograma.obj.edad2_mad_esq_w) || 0;

                    if (
                        edad == 0 ||
                        (unidad == "D" && edad > 29) ||
                        (unidad == "M" && edad > 11) ||
                        (edadMadre > 0 && edad > edadMadre)
                    ) {
                        this._validarGenogHer1Ed2();
                    } else {
                        this._validarGenogHer2Sex();
                    }
                }
            );
        },

        _validarGenogHer2Sex() {
            validarInputs(
                {
                    form: "#FaseH2Sexo",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer1Sex();
                },
                () => {
                    let sexo = this.formDetalles.genograma.obj.sexo_her2_esq_w || "";
                    sexo = sexo.toUpperCase();

                    if (["M", "F"].includes(sexo)) {
                        this.formDetalles.genograma.obj.sexo_her2_esq_w = sexo;
                        this._validarGenogHer2Ed1();
                    } else if (sexo == "") {
                        this.formDetalles.genograma.obj.edad1_her2_esq_w = "";
                        this.formDetalles.genograma.obj.edad2_her2_esq_w = "";
                        this._validarGenogHer3Sex();
                    } else {
                        this._validarGenogHer2Sex();
                    }
                }
            );
        },

        _validarGenogHer2Ed1() {
            if (!this.formDetalles.genograma.obj.edad1_her2_esq_w) {
                this.formDetalles.genograma.obj.edad1_her2_esq_w = "A"
            }

            validarInputs(
                {
                    form: "#FaseH2UnidadEdad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer2Sex();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her2_esq_w || "";
                    unidad = unidad.toUpperCase();

                    if (["D", "M", "A"].includes(unidad)) {
                        this.formDetalles.genograma.obj.edad1_her2_esq_w = unidad
                        this._validarGenogHer2Ed2();
                    } else {
                        this._validarGenogHer2Ed1();
                    }
                }
            );
        },

        _validarGenogHer2Ed2() {
            if (!this.formDetalles.genograma.obj.edad2_her2_esq_w) {
                this.formDetalles.genograma.obj.edad2_her2_esq_w = 0
            }

            validarInputs(
                {
                    form: "#FaseH2Edad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer2Ed1();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her2_esq_w;
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_her2_esq_w) || 0;
                    let edadMadre = parseInt(this.formDetalles.genograma.obj.edad2_mad_esq_w) || 0;

                    if (
                        edad == 0 ||
                        (unidad == "D" && edad > 29) ||
                        (unidad == "M" && edad > 11) ||
                        (edadMadre > 0 && edad > edadMadre)
                    ) {
                        this._validarGenogHer2Ed2();
                    } else {
                        this._validarGenogHer3Sex();
                    }
                }
            );
        },

        _validarGenogHer3Sex() {
            validarInputs(
                {
                    form: "#FaseH3Sexo",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer2Sex();
                },
                () => {
                    let sexo = this.formDetalles.genograma.obj.sexo_her3_esq_w || "";
                    sexo = sexo.toUpperCase();

                    if (["M", "F"].includes(sexo)) {
                        this.formDetalles.genograma.obj.sexo_her3_esq_w = sexo
                        this._validarGenogHer3Ed1();
                    } else if (sexo == "") {
                        this.formDetalles.genograma.obj.edad1_her3_esq_w = "";
                        this.formDetalles.genograma.obj.edad2_her3_esq_w = "";
                        this._validarGenogHer4Sex();
                    } else {
                        this._validarGenogHer3Sex();
                    }
                }
            );
        },

        _validarGenogHer3Ed1() {
            if (!this.formDetalles.genograma.obj.edad1_her3_esq_w) {
                this.formDetalles.genograma.obj.edad1_her3_esq_w = "A"
            }

            validarInputs(
                {
                    form: "#FaseH3UnidadEdad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer3Sex();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her3_esq_w || "";
                    unidad = unidad.toUpperCase();

                    if (["D", "M", "A"].includes(unidad)) {
                        this.formDetalles.genograma.obj.edad1_her3_esq_w = unidad
                        this._validarGenogHer3Ed2();
                    } else {
                        this._validarGenogHer3Ed1();
                    }
                }
            );
        },

        _validarGenogHer3Ed2() {
            if (!this.formDetalles.genograma.obj.edad2_her3_esq_w) {
                this.formDetalles.genograma.obj.edad2_her3_esq_w = 0
            }

            validarInputs(
                {
                    form: "#FaseH3Edad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer3Ed1();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her3_esq_w;
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_her3_esq_w) || 0;
                    let edadMadre = parseInt(this.formDetalles.genograma.obj.edad2_mad_esq_w) || 0;

                    if (
                        edad == 0 ||
                        (unidad == "D" && edad > 29) ||
                        (unidad == "M" && edad > 11) ||
                        (edadMadre > 0 && edad > edadMadre)
                    ) {
                        this._validarGenogHer3Ed2();
                    } else {
                        this._validarGenogHer4Sex();
                    }
                }
            );
        },

        _validarGenogHer4Sex() {
            validarInputs(
                {
                    form: "#FaseH4Sexo",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer3Sex();
                },
                () => {
                    let sexo = this.formDetalles.genograma.obj.sexo_her4_esq_w || "";
                    sexo = sexo.toUpperCase();

                    if (["M", "F"].includes(sexo)) {
                        this.formDetalles.genograma.obj.sexo_her4_esq_w = sexo;
                        this._validarGenogHer4Ed1();
                    } else if (sexo == "") {
                        this.formDetalles.genograma.obj.edad1_her4_esq_w = "";
                        this.formDetalles.genograma.obj.edad2_her4_esq_w = "";
                        this._validarGenogHer5Sex();
                    } else {
                        this._validarGenogHer4Sex();
                    }
                }
            );
        },

        _validarGenogHer4Ed1() {
            if (!this.formDetalles.genograma.obj.edad1_her4_esq_w) {
                this.formDetalles.genograma.obj.edad1_her4_esq_w = "A"
            }

            validarInputs(
                {
                    form: "#FaseH4UnidadEdad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer4Sex();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her4_esq_w || "";
                    unidad = unidad.toUpperCase();

                    if (["D", "M", "A"].includes(unidad)) {
                        this.formDetalles.genograma.obj.edad1_her4_esq_w = unidad
                        this._validarGenogHer4Ed2();
                    } else {
                        this._validarGenogHer4Ed1();
                    }
                }
            );
        },

        _validarGenogHer4Ed2() {
            if (!this.formDetalles.genograma.obj.edad2_her4_esq_w) {
                this.formDetalles.genograma.obj.edad2_her4_esq_w = 0
            }

            validarInputs(
                {
                    form: "#FaseH4Edad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer4Ed1();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her4_esq_w;
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_her4_esq_w) || 0;
                    let edadMadre = parseInt(this.formDetalles.genograma.obj.edad2_mad_esq_w) || 0;

                    if (
                        edad == 0 ||
                        (unidad == "D" && edad > 29) ||
                        (unidad == "M" && edad > 11) ||
                        (edadMadre > 0 && edad > edadMadre)
                    ) {
                        this._validarGenogHer4Ed2();
                    } else {
                        this._validarGenogHer5Sex();
                    }
                }
            );
        },

        _validarGenogHer5Sex() {
            validarInputs(
                {
                    form: "#FaseH5Sexo",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer4Sex();
                },
                () => {
                    let sexo = this.formDetalles.genograma.obj.sexo_her5_esq_w || "";
                    sexo = sexo.toUpperCase();

                    if (["M", "F"].includes(sexo)) {
                        this.formDetalles.genograma.obj.sexo_her5_esq_w = sexo;
                        this._validarGenogHer5Ed1();
                    } else if (sexo == "") {
                        this.formDetalles.genograma.obj.edad1_her5_esq_w = "";
                        this.formDetalles.genograma.obj.edad2_her5_esq_w = "";
                        this._validarGenogHer6Sex();
                    } else {
                        this._validarGenogHer5Sex();
                    }
                }
            );
        },

        _validarGenogHer5Ed1() {
            if (!this.formDetalles.genograma.obj.edad1_her5_esq_w) {
                this.formDetalles.genograma.obj.edad1_her5_esq_w = "A"
            }

            validarInputs(
                {
                    form: "#FaseH5UnidadEdad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer5Sex();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her5_esq_w || "";
                    unidad = unidad.toUpperCase();

                    if (["D", "M", "A"].includes(unidad)) {
                        this.formDetalles.genograma.obj.edad1_her5_esq_w = unidad
                        this._validarGenogHer5Ed2();
                    } else {
                        this._validarGenogHer5Ed1();
                    }
                }
            );
        },

        _validarGenogHer5Ed2() {
            if (!this.formDetalles.genograma.obj.edad2_her5_esq_w) {
                this.formDetalles.genograma.obj.edad2_her5_esq_w = 0
            }

            validarInputs(
                {
                    form: "#FaseH5Edad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer5Ed1();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her5_esq_w;
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_her5_esq_w) || 0;
                    let edadMadre = parseInt(this.formDetalles.genograma.obj.edad2_mad_esq_w) || 0;

                    if (
                        edad == 0 ||
                        (unidad == "D" && edad > 29) ||
                        (unidad == "M" && edad > 11) ||
                        (edadMadre > 0 && edad > edadMadre)
                    ) {
                        this._validarGenogHer5Ed2();
                    } else {
                        this._validarGenogHer6Sex();
                    }
                }
            );
        },

        _validarGenogHer6Sex() {
            validarInputs(
                {
                    form: "#FaseH6Sexo",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer5Sex();
                },
                () => {
                    let sexo = this.formDetalles.genograma.obj.sexo_her6_esq_w || "";
                    sexo = sexo.toUpperCase();

                    if (["M", "F"].includes(sexo)) {
                        this.formDetalles.genograma.obj.sexo_her6_esq_w = sexo;
                        this._validarGenogHer6Ed1();
                    } else if (sexo == "") {
                        this.formDetalles.genograma.obj.edad1_her6_esq_w = "";
                        this.formDetalles.genograma.obj.edad2_her6_esq_w = "";
                        this._grabarDetalle_2080();
                    } else {
                        this._validarGenogHer6Sex();
                    }
                }
            );
        },

        _validarGenogHer6Ed1() {
            if (!this.formDetalles.genograma.obj.edad1_her6_esq_w) {
                this.formDetalles.genograma.obj.edad1_her6_esq_w = "A"
            }

            validarInputs(
                {
                    form: "#FaseH6UnidadEdad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer6Sex();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her6_esq_w || "";
                    unidad = unidad.toUpperCase();

                    if (["D", "M", "A"].includes(unidad)) {
                        this.formDetalles.genograma.obj.edad1_her6_esq_w = unidad
                        this._validarGenogHer6Ed2();
                    } else {
                        this._validarGenogHer6Ed1();
                    }
                }
            );
        },

        _validarGenogHer6Ed2() {
            if (!this.formDetalles.genograma.obj.edad2_her6_esq_w) {
                this.formDetalles.genograma.obj.edad2_her6_esq_w = 0
            }

            validarInputs(
                {
                    form: "#FaseH6Edad",
                    orden: "1"
                },
                () => {
                    this._validarGenogHer6Ed1();
                },
                () => {
                    let unidad = this.formDetalles.genograma.obj.edad1_her6_esq_w;
                    let edad = parseInt(this.formDetalles.genograma.obj.edad2_her6_esq_w) || 0;
                    let edadMadre = parseInt(this.formDetalles.genograma.obj.edad2_mad_esq_w) || 0;

                    if (
                        edad == 0 ||
                        (unidad == "D" && edad > 29) ||
                        (unidad == "M" && edad > 11) ||
                        (edadMadre > 0 && edad > edadMadre)
                    ) {
                        this._validarGenogHer6Ed2();
                    } else {
                        this._grabarDetalle_2080();
                    }
                }
            );
        },

        _grabarDetalle_2080() {
            let llave = this.form.llave;
            let dato = this.formDetalles.genograma.obj;

            let detalles = {
                2080: _getObjetoSaveHc(dato, []),
            };

            modular.grabarDetalles(detalles, llave).then(res => {
                this._saltoPag2();
            })
        },

        _saltoPag2() {
            loader("show")
            this._guardarHistoria().then(() => {
                this._guardarDetallesHc().then(() => {
                    loader("hide")
                    this._validarVentanaOs();
                }).catch((err) => {
                    loader("hide")
                    this._validarVentanaOtros();
                });
            }).catch((err) => {
                loader("hide")
                this._validarVentanaOtros();
            });
        },

        _validarVentanaOs() {
            let edad = this.form.edad;
            this.params_hc845se.llave_hc = this.form.llave
            let _3010 = this.info.detallesHc.find(e => e["LLAVE-HC"] == this.form.llave && e["COD-DETHC"] == "3010");

            if (_3010) {
                _3010 = { ..._3010.DETALLE }

                if (_3010.tipo_ws == "01") {
                    this.params_hc845se.estado = true;
                } else {
                    this.sw_var._3010Text = true;
                    this._validarOS();
                }
            } else {
                if (this.form.serv == "08"
                    && edad.unid_edad == "A"
                    && edad.vlr_edad < 10
                ) {
                    this.params_hc845se.estado = true
                } else {
                    this.sw_var._3010Text = true;
                    this._validarOS()
                }
            }
        },

        _validarOS() {
            this.sw_var.btnOmitir = true;
            validarInputs(
                {
                    form: "#fase_os",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarOS",
                            callback_esc: "_validarOS"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "os",
                                callback_esc: "_validarOS",
                                callback: "_validarCP"
                            }
                        )
                    },
                    event_av_pag: () => {
                        this._saltoPag3();
                    },
                },
                () => {
                    this._validarVentanaAf();
                },
                () => {
                    this._guardarOrganoSentidos()
                }
            );
        },

        _guardarOrganoSentidos() {
            let llave = this.form.llave;
            let data = this.formDetalles.os.text.enterReplace().strToTable("RENG_DETHC");

            data.tipo_ws = "PL";
            let datos = { 3010: data };

            modular.grabarDetalles(datos, llave)
                .then(() => {
                    this._validarCP();
                })
                .catch((err) => {
                    console.error(err);
                    CON851("", "Error Guardando organo de los sentidos", null, "error", "Error");
                    this._validarVentanaOs();
                });
        },

        _onValidarOS() {
            this.params_hc845se.estado = false;
            this._validarCP()
        },

        _escape_3010() {
            this.params_hc845se.estado = false
            this._validarVentanaAf();
        },

        _validarCP() {
            validarInputs(
                {
                    form: "#fase_cp",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarCP",
                            callback_esc: "_validarCP"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "cp",
                                callback_esc: "_validarCP",
                                callback: "_validarSD"
                            }
                        )
                    },
                },
                () => {
                    this._validarVentanaOs()
                },
                () => {
                    this.formDetalles.cp.change = true;
                    this._validarSD()
                }
            );
        },
        _validarSD() {
            validarInputs(
                {
                    form: "#fase_sd",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSD",
                            callback_esc: "_validarSD"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sd",
                                callback_esc: "_validarSD",
                                callback: "_validarSDemart"
                            }
                        )
                    },
                },
                () => {
                    this._validarCP()
                },
                () => {
                    this.formDetalles.sd.change = true;
                    this._validarSDemart()
                }
            );
        },
        _validarSDemart() {
            validarInputs(
                {
                    form: "#fase_sdermat",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSDemart",
                            callback_esc: "_validarSDemart"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sDermat",
                                callback_esc: "_validarSDemart",
                                callback: "_validarSOeste"
                            }
                        )
                    },
                },
                () => {
                    this._validarSD()
                },
                () => {
                    this.formDetalles.sDermat.change = true;
                    this._validarSOeste()
                }
            );
        },
        _validarSOeste() {
            validarInputs(
                {
                    form: "#fase_oeste",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSOeste",
                            callback_esc: "_validarSOeste"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sist_oeste",
                                callback_esc: "_validarSOeste",
                                callback: "_validarSN"
                            }
                        )
                    },
                },
                () => {
                    this._validarSDemart()
                },
                () => {
                    this.formDetalles.sist_oeste.change = true;
                    this._validarSN()
                }
            );
        },
        _validarSN() {
            validarInputs(
                {
                    form: "#fase_sn",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSN",
                            callback_esc: "_validarSN"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sn",
                                callback_esc: "_validarSN",
                                callback: "_validarSPsiq"
                            }
                        )
                    },
                },
                () => {
                    this._validarSOeste()
                },
                () => {
                    this.formDetalles.sn.change = true;
                    this._validarSPsiq()
                }
            );
        },
        _validarSPsiq() {
            validarInputs(
                {
                    form: "#fase_sPsiq",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSPsiq",
                            callback_esc: "_validarSPsiq"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sis_psiq",
                                callback_esc: "_validarSPsiq",
                                callback: "_validarSGeni"
                            }
                        )
                    },
                },
                () => {
                    this._validarSN()
                },
                () => {
                    this.formDetalles.sis_psiq.change = true;
                    this._validarSGeni()
                }
            );
        },
        _validarSGeni() {
            validarInputs(
                {
                    form: "#fase_sgeni",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSGeni",
                            callback_esc: "_validarSGeni"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sis_gent",
                                callback_esc: "_validarSGeni",
                                callback: "_validarSGine"
                            }
                        )
                    },
                },
                () => {
                    this._validarSPsiq()
                },
                () => {
                    this.formDetalles.sis_gent.change = true;
                    this._validarSGine()
                }
            );
        },
        _validarSGine() {
            validarInputs(
                {
                    form: "#fase_sGine",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSGine",
                            callback_esc: "_validarSGine"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sis_gine",
                                callback_esc: "_validarSGine",
                                callback: "_validarS_obst"
                            }
                        )
                    },
                },
                () => {
                    this._validarSGeni()
                },
                () => {
                    this.formDetalles.sis_gine.change = true;
                    this._validarS_obst()
                }
            );
        },
        _validarS_obst() {
            if (this.info.paciente.SEXO == "M") {
                this._saltoPag3();
            } else {
                this._validarSAgo();
            }
        },
        _validarSAgo() {
            validarInputs(
                {
                    form: "#fase_sAgo",
                    orden: "1",
                    event_f2: () => {
                        this._activarVentanaF2({
                            callback: "_validarSAgo",
                            callback_esc: "_validarSAgo"
                        })
                    },
                    event_f8: () => {
                        this._hc828(
                            {
                                detalle: "sis_ago",
                                callback_esc: "_validarSAgo",
                                callback: "_saltoPag3"
                            }
                        )
                    },
                },
                () => {
                    this._validarSGine()
                },
                () => {
                    this.formDetalles.sis_ago.change = true;
                    this._saltoPag3()
                }
            );
        },

        _saltoPag3() {
            loader("show")

            this._guardarDetallesHc().then(() => {
                loader("hide")

                // embarazadas
                if (this.sw_var.embar) { this._validarMenarquia() }
                else this.validarPeso();

            }).catch((err) => {
                loader("hide")

                if (this.info.paciente.SEXO == "M") {
                    this._validarSGine();
                } else {
                    this._validarSAgo();
                }
            });
        },

        _saltoOmitir() {
            this.formDetalles.os.text = '';
            this.formDetalles.cp.text = '';
            this.formDetalles.sd.text = '';
            this.formDetalles.sDermat.text = '';
            this.formDetalles.sist_oeste.text = '';
            this.formDetalles.sn.text = '';
            this.formDetalles.sis_psiq.text = '';
            this.formDetalles.sis_gent.text = '';
            this.formDetalles.sis_gine.text = '';
            this.formDetalles.sis_ago.text = '';
            this._validarMenarquia();
        },

        _validarMenarquia() {
            this.sw_var.btnOmitir = false;
            validarInputs(
                {
                    form: "#menarquia_esq",
                    orden: "1"
                },
                () => {
                    this._validarEnferActual()
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']
                    let menarq = parseFloat(gineco_esq_w.menarquia_esq_w) || 0;

                    if (menarq == 0) {
                        if (this.form.edad.vlr_edad > 17) {
                            CON851("74", "74", null, "error", "error");
                            this._validarMenarquia();
                        } else {
                            gineco_esq_w.fecha_regla_esq_w = "";
                            gineco_esq_w.dismenorrea_esq_w = "";
                            gineco_esq_w.ciclos_esq_w = "";

                            this._validarDatoEmbarazo();
                        }
                    } else {
                        if (menarq < 9) {
                            CON851("03", "03", null, "error", "error");
                            this._validarMenarquia();
                        } else {
                            this._validarDatoCiclos();
                        }
                    }
                }
            );
        },

        _validarDatoCiclos() {
            let seleccion = this.formDetalles['4040'].gineco_esq_w.ciclos_esq_w

            let params = {
                titulo: "Ciclos",
                array: "ciclos_menstruales",
                seleccion,
                callback_esc: "_validarMenarquia",
                callback: (data) => {
                    this.formDetalles['4040'].gineco_esq_w.ciclos_esq_w = data.value;

                    if (parseFloat(data.value) == 1) {
                        this.formDetalles['4040'].gineco_esq_w.ciclo_irreg_esq_w = "";
                        this._validarDatoGestaciones();
                    } else this._validarDatoIrregular();

                    this.$refs.ciclo_mestrual.value = data.text;
                }
            }

            this._hc828_2(params);
        },

        _validarDatoIrregular() {
            validarInputs(
                {
                    form: "#ciclo_irreg_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoCiclos();
                },
                () => {
                    this._validarDatoGestaciones();
                }
            );
        },

        _validarDatoGestaciones() {
            validarInputs(
                {
                    form: "#gestaciones_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoCiclos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']
                    let gest = parseFloat(gineco_esq_w.gestaciones_esq_w) || 0

                    if (gest > 30) {
                        CON851("02", "02", null, "error", "error");
                        this._validarDatoGestaciones();
                    } else if (gest == 0) {
                        gineco_esq_w.gestaciones_esq_w = 0;
                        gineco_esq_w.partos_esq_w = 0;
                        gineco_esq_w.cesareas_esq_w = 0;
                        gineco_esq_w.abortos_esq_w = 0;
                        gineco_esq_w.ectopicos_esq_w = 0;
                        gineco_esq_w.gine_molas_esq_w = 0;
                        gineco_esq_w.gine_obito_esq_w = 0;
                        gineco_esq_w.gine_gemel_esq_w = 0;
                        gineco_esq_w.gine_vivos_esq_w = 0;

                        this._ventanaSabeUltRegla();
                    } else {
                        this._validarDatoPartos();
                    }
                }
            );
        },

        _validarDatoPartos() {
            validarInputs(
                {
                    form: "#partos_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoGestaciones();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;
                    let gest = parseFloat(gineco_esq_w.gestaciones_esq_w) || 0;

                    if (partos > gest) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoPartos();
                    } else if (partos == gest) {
                        gineco_esq_w.cesareas_esq_w = 0;
                        gineco_esq_w.abortos_esq_w = 0;
                        gineco_esq_w.ectopicos_esq_w = 0;
                        gineco_esq_w.gine_molas_esq_w = 0;
                        gineco_esq_w.gine_obito_esq_w = 0;
                        this._validarDatoGemelares();
                    } else {
                        this._validarDatocesareas();
                    }
                }
            );
        },

        _validarDatocesareas() {
            validarInputs(
                {
                    form: "#cesareas_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoPartos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let cesarea = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
                    let gest = parseFloat(gineco_esq_w.gestaciones_esq_w) || 0;
                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;

                    if (cesarea > (gest - partos)) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatocesareas();
                    } else if (cesarea == (gest - partos)) {
                        gineco_esq_w.abortos_esq_w = 0;
                        gineco_esq_w.ectopicos_esq_w = 0;
                        gineco_esq_w.gine_molas_esq_w = 0;
                        gineco_esq_w.gine_obito_esq_w = 0;
                        this._validarDatoGemelares();
                    } else {
                        this._validarDatoAbortos();
                    }
                }
            );
        },

        _validarDatoAbortos() {
            validarInputs(
                {
                    form: "#abortos_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoPartos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let cesarea = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
                    let gest = parseFloat(gineco_esq_w.gestaciones_esq_w) || 0;
                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;
                    let abort = parseFloat(gineco_esq_w.abortos_esq_w) || 0;

                    if (abort > (gest - partos - cesarea)) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoAbortos();
                    } else if (abort == (gest - partos - cesarea)) {
                        gineco_esq_w.ectopicos_esq_w = 0;
                        gineco_esq_w.gine_molas_esq_w = 0;
                        gineco_esq_w.gine_obito_esq_w = 0;
                        this._validarDatoGemelares();
                    } else {
                        this._validarDatoEctopicos();
                    }
                }
            );
        },

        _validarDatoEctopicos() {
            if (!this.formDetalles['4040'].gineco_esq_w.abortos_esq_w) {
                this.formDetalles['4040'].gineco_esq_w.abortos_esq_w = 0;
            }

            validarInputs(
                {
                    form: "#ectopicos_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoPartos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let cesarea = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
                    let gest = parseFloat(gineco_esq_w.gestaciones_esq_w) || 0;
                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;
                    let abort = parseFloat(gineco_esq_w.abortos_esq_w) || 0;
                    let ectop = parseFloat(gineco_esq_w.ectopicos_esq_w) || 0;

                    if (ectop > (gest - partos - cesarea - abort)) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoEctopicos();
                    } else if (ectop == (gest - partos - cesarea - abort)) {
                        gineco_esq_w.gine_molas_esq_w = 0;
                        gineco_esq_w.gine_obito_esq_w = 0;
                        this._validarDatoGemelares();
                    } else {
                        this._validarDatoMolas();
                    }
                }
            );
        },

        _validarDatoMolas() {
            validarInputs(
                {
                    form: "#gine_molas_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoPartos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let cesarea = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
                    let gest = parseFloat(gineco_esq_w.gestaciones_esq_w) || 0;
                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;
                    let abort = parseFloat(gineco_esq_w.abortos_esq_w) || 0;
                    let ectop = parseFloat(gineco_esq_w.ectopicos_esq_w) || 0;
                    let molas = parseFloat(gineco_esq_w.gine_molas_esq_w) || 0;

                    if (molas > (gest - partos - cesarea - abort - ectop)) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoMolas();
                    } else if (molas == (gest - partos - cesarea - abort - ectop)) {
                        gineco_esq_w.gine_obito_esq_w = 0;
                        this._validarDatoGemelares();
                    } else {
                        this._validarDatoObitos();
                    }
                }
            );
        },

        _validarDatoObitos() {
            validarInputs(
                {
                    form: "#gine_obito_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoPartos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let cesarea = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
                    let gest = parseFloat(gineco_esq_w.gestaciones_esq_w) || 0;
                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;
                    let abort = parseFloat(gineco_esq_w.abortos_esq_w) || 0;
                    let ectop = parseFloat(gineco_esq_w.ectopicos_esq_w) || 0;
                    let molas = parseFloat(gineco_esq_w.gine_molas_esq_w) || 0;
                    let obitos = parseFloat(gineco_esq_w.gine_obito_esq_w) || 0;

                    if (obitos == (gest - partos - cesarea - abort - ectop - molas)) {
                        this._validarDatoGemelares();
                    } else {
                        CON851("51", "51", null, "error", "error");
                        this._validarDatoObitos();
                    }
                }
            );
        },

        _validarDatoGemelares() {
            let { gineco_esq_w } = this.formDetalles['4040']

            if (!gineco_esq_w.partos_esq_w && !gineco_esq_w.cesareas_esq_w) {
                this.formDetalles['4040'].gineco_esq_w.gine_gemel_esq_w = 0;
            }


            validarInputs(
                {
                    form: "#gine_gemel_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoPartos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let cesarea = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;
                    let gemel = parseFloat(gineco_esq_w.gine_gemel_esq_w) || 0;
                    if (gemel > partos + cesarea) {
                        CON851("51", "51", null, "error", "error");
                        this._validarDatoGemelares();
                    } else {
                        this._validarDatoNaciVivos();
                    }
                }
            );
        },

        _validarDatoNaciVivos() {
            let { gineco_esq_w } = this.formDetalles['4040']

            if (!gineco_esq_w.partos_esq_w && !gineco_esq_w.cesareas_esq_w) {
                this.formDetalles['4040'].gineco_esq_w.gine_vivos_esq_w = 0;
            }

            validarInputs(
                {
                    form: "#gine_vivos_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoPartos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let cesarea = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
                    let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;
                    let gemel = parseFloat(gineco_esq_w.gine_gemel_esq_w) || 0;
                    let vivos = parseFloat(gineco_esq_w.gine_vivos_esq_w) || 0;

                    if (gemel == 0 && vivos > partos + cesarea) {
                        CON851("51", "51", null, "error", "error");
                        this._validarDatoNaciVivos();
                    } else {
                        this._validarDatoNacPesoInf();
                    }
                }
            );
        },

        _validarDatoNacPesoInf() {
            if (!this.formDetalles['4040'].gineco_esq_w.gine_vivos_esq_w) {
                this.formDetalles['4040'].gineco_esq_w.gine_25_esq_w = 0
            }

            validarInputs(
                {
                    form: "#gine_25_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoNaciVivos();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let gine25 = parseFloat(gineco_esq_w.gine_25_esq_w);
                    let vivos = parseFloat(gineco_esq_w.gine_vivos_esq_w);
                    if (gine25 > vivos) {
                        CON851("51", "51", null, "error", "error");
                        this._validarDatoNacPesoInf();
                    } else {
                        this._validarDatoNacPesoSup();
                    }
                }
            );
        },

        _validarDatoNacPesoSup() {
            let gine25 = parseFloat(this.formDetalles['4040'].gineco_esq_w.gine_25_esq_w);
            let vivos = parseFloat(this.formDetalles['4040'].gineco_esq_w.gine_vivos_esq_w);

            if (vivos == 0 || vivos == gine25) {
                this.formDetalles['4040'].gineco_esq_w.gine_40_esq_w = 0;
                this._ventanaSabeUltRegla();
            } else {
                validarInputs(
                    {
                        form: "#gine_40_esq",
                        orden: "1"
                    },
                    () => {
                        this._validarDatoNacPesoInf();
                    },
                    () => {
                        let { gineco_esq_w } = this.formDetalles['4040']

                        let gine25 = parseFloat(gineco_esq_w.gine_25_esq_w);
                        let gine40 = parseFloat(gineco_esq_w.gine_40_esq_w);
                        let vivos = parseFloat(gineco_esq_w.gine_vivos_esq_w);

                        if (gine40 > (vivos - gine25)) {
                            CON851("51", "51", null, "error", "error");
                            this._validarDatoNacPesoSup();
                        } else {
                            this._ventanaSabeUltRegla();
                        }
                    }
                );
            }
        },

        _ventanaSabeUltRegla() {
            let { gineco_esq_w } = this.formDetalles['4040'];
            POPUP(
                {
                    array: modular.arrays.ult_regla_esq_w,
                    titulo: "Sabe la fecha ultima regla",
                    indices: [{ id: "value", label: "text" }],
                    seleccion: gineco_esq_w.ult_regla_esq_w,
                    callback_f: () => {
                        this._validarDatoGestaciones()
                    },
                },
                (data) => {
                    gineco_esq_w.ult_regla_esq_w = data.value
                    this._validarDatoAnoRegla();
                }
            )
        },

        _validarDatoAnoRegla() {
            let fecha_limi_regla = this._currentDate().fecha;

            let ano = parseFloat(fecha_limi_regla.substring(0, 4));
            let mes = parseFloat(fecha_limi_regla.substring(4, 6));
            let dia = parseFloat(fecha_limi_regla.substring(6, 8));

            if (mes > 10) {
                mes = mes - 10;
            } else {
                ano = ano - 1;
                mes = mes + 2;
            }
            dia = 1;

            mes = mes.toString().padStart(2, "0")
            dia = dia.toString().padStart(2, "0")

            fecha_limi_regla = `${ano}${mes}${dia}`
            this.fecha_limi_regla = parseFloat(fecha_limi_regla);


            validarInputs(
                {
                    form: "#anoRegla",
                    orden: "1"
                },
                () => {
                    this._ventanaSabeUltRegla();
                },
                () => {
                    ano = parseFloat(this.params_4040.fecha_ult_regla.anio) || 0;

                    if (ano >= 0 && ano < 1950) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoAnoRegla();
                    } else {
                        this._validarDatoMesRegla();
                    }
                }
            );
        },

        _validarDatoMesRegla() {
            validarInputs(
                {
                    form: "#mesRegla",
                    orden: "1"
                },
                () => {
                    this._validarDatoAnoRegla();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_ult_regla.mes) || 0;

                    if (mes > 12 || mes < 1) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoMesRegla();
                    } else {
                        this._validarDatoDiaRegla();
                    }
                }
            );
        },

        _validarDatoDiaRegla() {
            validarInputs(
                {
                    form: "#diaRegla",
                    orden: "1"
                },
                () => {
                    this._validarDatoMesRegla();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_ult_regla.dia) || 0;


                    if (dia > 31 || dia < 1) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoDiaRegla();
                    } else {
                        let fecha = this.params_4040.fecha_ult_regla || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w = fecha;
                        let fechaRegla = parseFloat(fecha);

                        if (fechaRegla > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this._validarDatoAnoRegla();
                        } else {
                            if (this.sw_var.embar && fechaRegla < this.fecha_limi_regla) {
                                CON851("37", "37", null, "error", "error");
                                this._validarDatoAnoRegla();
                            } else {
                                this._datoCalcularEdadGestRegla();
                            }
                        }
                    }
                }
            );
        },

        _datoCalcularEdadGestRegla() {
            let fechaRegla = this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w;
            let mes = this.params_4040.fecha_ult_regla.mes;
            let edad_gest = ""

            if (!this.sw_var.embar || !mes) {
                this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w = ""
            } else {
                // falta verificar si es fecha-lnk

                let nro_dias = this._calcularEdadDias(fechaRegla, this.fecha_lnk);
                edad_gest = nro_dias / 7
            }

            this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w = edad_gest.toString().substring(0, 4);
            this._validarDatoAnoParto();
        },

        _validarDatoAnoParto() {
            let { gineco_esq_w } = this.formDetalles['4040']
            let cesaria = parseFloat(gineco_esq_w.cesareas_esq_w) || 0;
            let partos = parseFloat(gineco_esq_w.partos_esq_w) || 0;


            if (partos == 0 && cesaria == 0) {
                this.formDetalles['4040'].gineco_esq_w.ult_parto_esq_w = "";
                this._validarDatoAnoCitol();
            } else {
                validarInputs(
                    {
                        form: "#anoParto",
                        orden: "1"
                    },
                    () => {
                        this._validarDatoAnoRegla();
                    },
                    () => {
                        let ano = parseFloat(this.params_4040.fecha_parto.anio) || 0;

                        if (ano >= 0 && ano < 1950) {
                            CON851("03", "03", null, "error", "error");
                            this._validarDatoAnoParto();
                        } else {
                            this._validarDatoMesParto();
                        }
                    }
                );
            }
        },

        _validarDatoMesParto() {
            validarInputs(
                {
                    form: "#mesParto",
                    orden: "1"
                },
                () => {
                    this._validarDatoAnoParto();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_parto.mes) || 0;

                    if (mes > 12 || mes < 1) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoMesParto();
                    } else {
                        this._validarDatoDiaParto();
                    }
                }
            );
        },

        _validarDatoDiaParto() {
            validarInputs(
                {
                    form: "#diaParto",
                    orden: "1"
                },
                () => {
                    this._validarDatoMesParto();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_parto.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoDiaParto();
                    } else {
                        let fecha = this.params_4040.fecha_parto || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.formDetalles['4040'].gineco_esq_w.ult_parto_esq_w = fecha;
                        let fechaParto = parseFloat(fecha);
                        if (fechaParto > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this._validarDatoAnoParto();
                        } else {
                            this._validarDatoAnoCitol();
                        }
                    }
                }
            );
        },

        _validarDatoAnoCitol() {
            validarInputs(
                {
                    form: "#anoCitol",
                    orden: "1"
                },
                () => {
                    let cesaria = parseFloat(this.formDetalles['4040'].gineco_esq_w.cesareas_esq_w);
                    let partos = parseFloat(this.formDetalles['4040'].gineco_esq_w.partos_esq_w);

                    if (partos == 0 && cesaria == 0) {
                        this._validarDatoAnoRegla();
                    } else {
                        this._validarDatoAnoRegla();
                    }
                },
                () => {
                    let anio = parseFloat(this.params_4040.fecha_citol.anio) || 0;

                    if (anio > 0 && anio < 2000) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoanioCitol();
                    } else if (anio == "" || anio == 0) {
                        this.params_4040.fecha_citol.anio = ""
                        this.params_4040.fecha_citol.mes = ""
                        this.params_4040.fecha_citol.dia = ""

                        this.formDetalles['4040'].gineco_esq_w.result_citol_esq_w = ""
                        this.formDetalles['4040'].gineco_esq_w.citol_anormal_esq_w = ""

                        this._validarDatoInfec();
                    } else {
                        this._validarDatoMesCitol();
                    }
                }
            );
        },

        _validarDatoMesCitol() {
            validarInputs(
                {
                    form: "#mesCitol",
                    orden: "1"
                },
                () => {
                    this._validarDatoAnoCitol();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_citol.mes) || 0;

                    if (mes > 12 || mes < 1) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoMesCitol();
                    } else {
                        this._validarDatoDiaCitol();
                    }
                }
            );
        },

        _validarDatoDiaCitol() {
            validarInputs(
                {
                    form: "#diaCitol",
                    orden: "1"
                },
                () => {
                    this._validarDatoMesCitol();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_citol.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoDiaCitol();
                    } else {
                        let fecha = this.params_4040.fecha_citol || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.formDetalles['4040'].gineco_esq_w.fecha_citol_esq_w = fecha;

                        if (parseFloat(fecha) > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this._validarDatoAnoCitol();
                        } else {
                            this._ventanaResultCitol();
                        }
                    }
                }
            );
        },

        _ventanaResultCitol() {
            let { gineco_esq_w } = this.formDetalles['4040'];

            let params = {
                titulo: "Resultado Citologia",
                array: "resul_citol",
                seleccion: gineco_esq_w.result_citol_esq_w,
                callback_esc: "_validarDatoAnoCitol",
                callback: (data) => {
                    gineco_esq_w.result_citol_esq_w = data.value;
                    this.$refs.result_citol.value = data.text;

                    if (data.value == "1" || data.value == "3" || data.value == "4") {
                        gineco_esq_w.citol_anormal_esq_w = "";
                        this._validarDatoInfec();
                    } else {
                        this._validarDatoAnorCitol();
                    }
                }
            }

            this._hc828_2(params);
        },

        _validarDatoAnorCitol() {
            validarInputs(
                {
                    form: "#citol_anormal_esq",
                    orden: "1"
                },
                () => {
                    this._ventanaResultCitol();
                },
                () => {
                    this.formDetalles['4040'].gineco_esq_w.citol_anormal_esq_w = this.formDetalles['4040'].gineco_esq_w.citol_anormal_esq_w.replace(
                        /[\!\*\]\[\}\{\"\'\&\t]/g,
                        ""
                    );

                    this._validarDatoInfec();
                }
            );
        },

        _validarDatoInfec() {

            validarInputs(
                {
                    form: "#infec_pelvic_esq",
                },
                () => {
                    this._validarDatoAnoCitol();
                },
                () => {
                    this.formDetalles['4040'].gineco_esq_w.infec_pelvic_esq_w = this.formDetalles['4040'].gineco_esq_w.infec_pelvic_esq_w.replace(
                        /[\!\*\]\[\}\{\"\'\&\t]/g,
                        ""
                    );

                    this._validarDatoEndomec();
                }
            );
        },

        _validarDatoEndomec() {
            validarInputs(
                {
                    form: "#endometros_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoInfec();
                },
                () => {
                    let endometros_esq_w = this.formDetalles['4040'].gineco_esq_w.endometros_esq_w || ""
                    endometros_esq_w = endometros_esq_w.toUpperCase();

                    if (["S", "N", ""].includes(endometros_esq_w)) {
                        this.formDetalles['4040'].gineco_esq_w.endometros_esq_w = endometros_esq_w;
                        this._validarDatoEspeculo();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoEndomec();
                    }
                }
            );
        },

        _validarDatoEspeculo() {
            let { gineco_esq_w } = this.formDetalles['4040'];

            let params = {
                titulo: "Resultado Especuloscopia",
                array: "resul_citol",
                seleccion: gineco_esq_w.especuloscop_esq_w,
                callback_esc: "_validarDatoEndomec",
                callback: (data) => {
                    gineco_esq_w.especuloscop_esq_w = data.value
                    this.$refs.result_espec.value = data.text;

                    if (data.value == "1" || data.value == "3" || data.value == "4") {
                        gineco_esq_w.especul_anormal_esq_w = "";
                        this._validarDatoUtero();
                    } else {
                        this._validarDatoAnormalEspec();
                    }
                }
            }

            this._hc828_2(params);
        },

        _validarDatoAnormalEspec() {
            validarInputs(
                {
                    form: "#especul_anormal_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoEspeculo();
                },
                () => {
                    let text = this.formDetalles['4040'].gineco_esq_w.especul_anormal_esq_w || ""
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
                    this.formDetalles['4040'].gineco_esq_w.especul_anormal_esq_w = text;

                    this._validarDatoUtero();
                }
            );
        },

        _validarDatoUtero() {
            validarInputs(
                {
                    form: "#ultrason_utero_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoEspeculo();
                },
                () => {
                    let text = this.formDetalles['4040'].gineco_esq_w.ultrason_utero_esq_w || ""
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.formDetalles['4040'].gineco_esq_w.ultrason_utero_esq_w = text

                    if (!text) {
                        CON851("EG", "EG", null, "error", "error");
                    }

                    this._validarDatoOvarios();
                }
            );
        },

        _validarDatoOvarios() {
            validarInputs(
                {
                    form: "#ultrason_ovario_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoUtero();
                },
                () => {
                    let text = this.formDetalles['4040'].gineco_esq_w.ultrason_ovario_esq_w || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.formDetalles['4040'].gineco_esq_w.ultrason_ovario_esq_w = text;
                    this._validarDatoTrompas();
                }
            );
        },

        _validarDatoTrompas() {
            validarInputs(
                {
                    form: "#ultrason_trompa_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoOvarios();
                },
                () => {
                    let text = this.formDetalles['4040'].gineco_esq_w.ultrason_trompa_esq_w || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.formDetalles['4040'].gineco_esq_w.ultrason_trompa_esq_w = text;

                    this._validarDatoOtrosUlt();
                }
            );
        },

        _validarDatoOtrosUlt() {
            validarInputs(
                {
                    form: "#ultrason_otros_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoTrompas();
                },
                () => {
                    let text = this.formDetalles['4040'].gineco_esq_w.ultrason_otros_esq_w || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.formDetalles['4040'].gineco_esq_w.ultrason_otros_esq_w = text

                    this._validarDatoEmbarazo();
                }
            );
        },


        _validarDatoEmbarazo() {
            let { rips } = this.form;
            let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;

            if (this.info.paciente.SEXO == "M") {
                rips.embarazo = "9";
                this._validarDatoEstado();
            } else {
                if (
                    this.form.edad.unid_edad == "D" ||
                    this.form.edad.unid_edad == "M" ||
                    (this.form.edad.unid_edad == "A" && this.form.edad.vlr_edad < 10) ||
                    (this.form.edad.unid_edad == "A" && this.form.edad.vlr_edad > 60) ||
                    !this.sw_var.embar
                ) {
                    rips.embarazo = "4";
                    this._validarDatoEstado();
                } else {
                    if (edad_gest == 0 || edad_gest == "") {
                        this._ventanaEmbarazo();
                    } else {
                        if (edad_gest < 13) {
                            rips.embarazo = "1";
                            this._validarDatoEstado();
                        } else {
                            if (edad_gest < 26) {
                                rips.embarazo = "2";
                                this._validarDatoEstado();
                            } else {
                                rips.embarazo = "3";
                                this._validarDatoEstado();
                            }
                        }
                    }
                }
            }
        },

        _ventanaEmbarazo() {
            let seleccion = this.form.rips.embarazo || 0;
            POPUP(
                {
                    array: modular.arrays.embarazo,
                    titulo: "Condicion de usuaria",
                    indices: [{ id: "value", label: "text" }],
                    seleccion,
                    callback_f: () => {
                        if (!this.formDetalles["4040"].gineco_esq_w.menarquia_esq_w) {
                            this._validarMenarquia()
                        } else this._validarDatoOtrosUlt()
                    },
                },
                (data) => {
                    this.form.rips.embarazo = data.value
                    this._validarDatoEstado();
                }
            )
        },


        _validarDatoEstado() {
            let rips = this.form.rips;

            [0, 1, 2].forEach(e => {
                switch (rips.embarazo) {
                    case "1":
                        if (e > 0) {
                            this.formDetalles['4040'].tabla_vih_esq_w[e].fecha_vih_esq_w = ""
                            this.formDetalles['4040'].tabla_vih_esq_w[e].resultado_vih_esq_w = ""

                            this.formDetalles['4040'].tabla_serolo_esq_w[e].fecha_serolo_esq_w = ""
                            this.formDetalles['4040'].tabla_serolo_esq_w[e].resultado_serolo_esq_w = ""

                            this.formDetalles['4040'].tabla_vdrl_esq_w[e].fecha_vdrl_esq_w = ""
                            this.formDetalles['4040'].tabla_vdrl_esq_w[e].resultado_vdrl_esq_w = ""

                            this.formDetalles['4040'].tabla_hemogra_esq_w[e].fecha_hemogra_esq_w = ""
                            this.formDetalles['4040'].tabla_hemogra_esq_w[e].resultado_hemogra_esq_w = ""

                            this.formDetalles['4040'].tabla_hemogl_esq_w[e].fecha_hemogl_esq_w = ""
                            this.formDetalles['4040'].tabla_hemogl_esq_w[e].resultado_hemogl_esq_w = ""

                            this.formDetalles['4040'].tabla_glucosa_esq_w[e].fecha_glucosa_esq_w = ""
                            this.formDetalles['4040'].tabla_glucosa_esq_w[e].resultado_glucosa_esq_w = ""

                            this.formDetalles['4040'].tabla_ptog_esq_w[e].fecha_ptog_esq_w = ""
                            this.formDetalles['4040'].tabla_ptog_esq_w[e].resultado_ptog_esq_w = ""

                            this.formDetalles['4040'].tabla_uroanali_esq_w[e].fecha_uroanali_esq_w = ""
                            this.formDetalles['4040'].tabla_uroanali_esq_w[e].resultado_uroanali_esq_w = ""

                            this.formDetalles['4040'].tabla_uroculti_esq_w[e].fecha_uroculti_esq_w = ""
                            this.formDetalles['4040'].tabla_uroculti_esq_w[e].resultado_uroculti_esq_w = ""

                            this.formDetalles['4040'].tabla_frotisv_esq_w[e].fecha_frotisv_esq_w = ""
                            this.formDetalles['4040'].tabla_frotisv_esq_w[e].resultado_frotisv_esq_w = ""

                            this.formDetalles['4040'].tabla_gota_grues_esq_w[e].fecha_gota_grues_esq_w = ""
                            this.formDetalles['4040'].tabla_gota_grues_esq_w[e].resultado_gota_grues_esq_w = ""

                            this.formDetalles['4040'].tabla_estrep_b_esq_w[e].fecha_estrep_b_esq_w = ""
                            this.formDetalles['4040'].tabla_estrep_b_esq_w[e].resultado_estrep_b_esq_w = ""

                            this.formDetalles['4040'].tabla_igm_esq_w[e].fecha_igm_esq_w = ""
                            this.formDetalles['4040'].tabla_igm_esq_w[e].resultado_igm_esq_w = ""

                            this.formDetalles['4040'].tabla_igg_esq_w[e].fecha_igg_esq_w = ""
                            this.formDetalles['4040'].tabla_igg_esq_w[e].resultado_igg_esq_w = ""

                            this.formDetalles['4040'].tabla_rubeo_igg_esq_w[e].fecha_rubeo_igg_esq_w = ""
                            this.formDetalles['4040'].tabla_rubeo_igg_esq_w[e].resultado_rubeo_igg_esq_w = ""

                            this.formDetalles['4040'].tabla_rubeo_igm_esq_w[e].fecha_rubeo_igm_esq_w = ""
                            this.formDetalles['4040'].tabla_rubeo_igm_esq_w[e].resultado_rubeo_igm_esq_w = ""

                            this.formDetalles['4040'].tabla_chagas_tot_esq_w[e].fecha_chagas_tot_esq_w = ""
                            this.formDetalles['4040'].tabla_chagas_tot_esq_w[e].resultado_chagas_tot_esq_w = ""

                            this.formDetalles['4040'].tabla_chagas_sint_esq_w[e].fecha_chagas_sint_esq_w = ""
                            this.formDetalles['4040'].tabla_chagas_sint_esq_w[e].resultado_chagas_sint_esq_w = ""

                            this.formDetalles['4040'].tabla_tsh_esq_w[e].fecha_tsh_esq_w = ""
                            this.formDetalles['4040'].tabla_tsh_esq_w[e].resultado_tsh_esq_w = ""

                            this.formDetalles['4040'].tabla_citolo_cerv_esq_w[e].fecha_citolo_cerv_esq_w = ""
                            this.formDetalles['4040'].tabla_citolo_cerv_esq_w[e].resultado_citolo_cerv_esq_w = ""
                        }
                        break;
                    case "2":
                        if (e == 2) {
                            this.formDetalles['4040'].tabla_vih_esq_w[e].fecha_vih_esq_w = ""
                            this.formDetalles['4040'].tabla_vih_esq_w[e].resultado_vih_esq_w = ""

                            this.formDetalles['4040'].tabla_serolo_esq_w[e].fecha_serolo_esq_w = ""
                            this.formDetalles['4040'].tabla_serolo_esq_w[e].resultado_serolo_esq_w = ""

                            this.formDetalles['4040'].tabla_vdrl_esq_w[e].fecha_vdrl_esq_w = ""
                            this.formDetalles['4040'].tabla_vdrl_esq_w[e].resultado_vdrl_esq_w = ""

                            this.formDetalles['4040'].tabla_hemogra_esq_w[e].fecha_hemogra_esq_w = ""
                            this.formDetalles['4040'].tabla_hemogra_esq_w[e].resultado_hemogra_esq_w = ""

                            this.formDetalles['4040'].tabla_hemogl_esq_w[e].fecha_hemogl_esq_w = ""
                            this.formDetalles['4040'].tabla_hemogl_esq_w[e].resultado_hemogl_esq_w = ""

                            this.formDetalles['4040'].tabla_glucosa_esq_w[e].fecha_glucosa_esq_w = ""
                            this.formDetalles['4040'].tabla_glucosa_esq_w[e].resultado_glucosa_esq_w = ""

                            this.formDetalles['4040'].tabla_ptog_esq_w[e].fecha_ptog_esq_w = ""
                            this.formDetalles['4040'].tabla_ptog_esq_w[e].resultado_ptog_esq_w = ""

                            this.formDetalles['4040'].tabla_uroanali_esq_w[e].fecha_uroanali_esq_w = ""
                            this.formDetalles['4040'].tabla_uroanali_esq_w[e].resultado_uroanali_esq_w = ""

                            this.formDetalles['4040'].tabla_uroculti_esq_w[e].fecha_uroculti_esq_w = ""
                            this.formDetalles['4040'].tabla_uroculti_esq_w[e].resultado_uroculti_esq_w = ""

                            this.formDetalles['4040'].tabla_frotisv_esq_w[e].fecha_frotisv_esq_w = ""
                            this.formDetalles['4040'].tabla_frotisv_esq_w[e].resultado_frotisv_esq_w = ""

                            this.formDetalles['4040'].tabla_gota_grues_esq_w[e].fecha_gota_grues_esq_w = ""
                            this.formDetalles['4040'].tabla_gota_grues_esq_w[e].resultado_gota_grues_esq_w = ""

                            this.formDetalles['4040'].tabla_estrep_b_esq_w[e].fecha_estrep_b_esq_w = ""
                            this.formDetalles['4040'].tabla_estrep_b_esq_w[e].resultado_estrep_b_esq_w = ""

                            this.formDetalles['4040'].tabla_igm_esq_w[e].fecha_igm_esq_w = ""
                            this.formDetalles['4040'].tabla_igm_esq_w[e].resultado_igm_esq_w = ""

                            this.formDetalles['4040'].tabla_igg_esq_w[e].fecha_igg_esq_w = ""
                            this.formDetalles['4040'].tabla_igg_esq_w[e].resultado_igg_esq_w = ""

                            this.formDetalles['4040'].tabla_rubeo_igg_esq_w[e].fecha_rubeo_igg_esq_w = ""
                            this.formDetalles['4040'].tabla_rubeo_igg_esq_w[e].resultado_rubeo_igg_esq_w = ""

                            this.formDetalles['4040'].tabla_rubeo_igm_esq_w[e].fecha_rubeo_igm_esq_w = ""
                            this.formDetalles['4040'].tabla_rubeo_igm_esq_w[e].resultado_rubeo_igm_esq_w = ""

                            this.formDetalles['4040'].tabla_chagas_tot_esq_w[e].fecha_chagas_tot_esq_w = ""
                            this.formDetalles['4040'].tabla_chagas_tot_esq_w[e].resultado_chagas_tot_esq_w = ""

                            this.formDetalles['4040'].tabla_chagas_sint_esq_w[e].fecha_chagas_sint_esq_w = ""
                            this.formDetalles['4040'].tabla_chagas_sint_esq_w[e].resultado_chagas_sint_esq_w = ""

                            this.formDetalles['4040'].tabla_tsh_esq_w[e].fecha_tsh_esq_w = ""
                            this.formDetalles['4040'].tabla_tsh_esq_w[e].resultado_tsh_esq_w = ""

                            this.formDetalles['4040'].tabla_citolo_cerv_esq_w[e].fecha_citolo_cerv_esq_w = ""
                            this.formDetalles['4040'].tabla_citolo_cerv_esq_w[e].resultado_citolo_cerv_esq_w = ""
                        }
                        break;
                    default:
                        this.formDetalles['4040'].tabla_vih_esq_w[e].fecha_vih_esq_w = ""
                        this.formDetalles['4040'].tabla_vih_esq_w[e].resultado_vih_esq_w = ""

                        this.formDetalles['4040'].tabla_serolo_esq_w[e].fecha_serolo_esq_w = ""
                        this.formDetalles['4040'].tabla_serolo_esq_w[e].resultado_serolo_esq_w = ""

                        this.formDetalles['4040'].tabla_vdrl_esq_w[e].fecha_vdrl_esq_w = ""
                        this.formDetalles['4040'].tabla_vdrl_esq_w[e].resultado_vdrl_esq_w = ""

                        this.formDetalles['4040'].tabla_hemogra_esq_w[e].fecha_hemogra_esq_w = ""
                        this.formDetalles['4040'].tabla_hemogra_esq_w[e].resultado_hemogra_esq_w = ""

                        this.formDetalles['4040'].tabla_hemogl_esq_w[e].fecha_hemogl_esq_w = ""
                        this.formDetalles['4040'].tabla_hemogl_esq_w[e].resultado_hemogl_esq_w = ""

                        this.formDetalles['4040'].tabla_glucosa_esq_w[e].fecha_glucosa_esq_w = ""
                        this.formDetalles['4040'].tabla_glucosa_esq_w[e].resultado_glucosa_esq_w = ""

                        this.formDetalles['4040'].tabla_ptog_esq_w[e].fecha_ptog_esq_w = ""
                        this.formDetalles['4040'].tabla_ptog_esq_w[e].resultado_ptog_esq_w = ""

                        this.formDetalles['4040'].tabla_uroanali_esq_w[e].fecha_uroanali_esq_w = ""
                        this.formDetalles['4040'].tabla_uroanali_esq_w[e].resultado_uroanali_esq_w = ""

                        this.formDetalles['4040'].tabla_uroculti_esq_w[e].fecha_uroculti_esq_w = ""
                        this.formDetalles['4040'].tabla_uroculti_esq_w[e].resultado_uroculti_esq_w = ""

                        this.formDetalles['4040'].tabla_frotisv_esq_w[e].fecha_frotisv_esq_w = ""
                        this.formDetalles['4040'].tabla_frotisv_esq_w[e].resultado_frotisv_esq_w = ""

                        this.formDetalles['4040'].tabla_gota_grues_esq_w[e].fecha_gota_grues_esq_w = ""
                        this.formDetalles['4040'].tabla_gota_grues_esq_w[e].resultado_gota_grues_esq_w = ""

                        this.formDetalles['4040'].tabla_estrep_b_esq_w[e].fecha_estrep_b_esq_w = ""
                        this.formDetalles['4040'].tabla_estrep_b_esq_w[e].resultado_estrep_b_esq_w = ""

                        this.formDetalles['4040'].tabla_igm_esq_w[e].fecha_igm_esq_w = ""
                        this.formDetalles['4040'].tabla_igm_esq_w[e].resultado_igm_esq_w = ""

                        this.formDetalles['4040'].tabla_igg_esq_w[e].fecha_igg_esq_w = ""
                        this.formDetalles['4040'].tabla_igg_esq_w[e].resultado_igg_esq_w = ""

                        this.formDetalles['4040'].tabla_rubeo_igg_esq_w[e].fecha_rubeo_igg_esq_w = ""
                        this.formDetalles['4040'].tabla_rubeo_igg_esq_w[e].resultado_rubeo_igg_esq_w = ""

                        this.formDetalles['4040'].tabla_rubeo_igm_esq_w[e].fecha_rubeo_igm_esq_w = ""
                        this.formDetalles['4040'].tabla_rubeo_igm_esq_w[e].resultado_rubeo_igm_esq_w = ""

                        this.formDetalles['4040'].tabla_chagas_tot_esq_w[e].fecha_chagas_tot_esq_w = ""
                        this.formDetalles['4040'].tabla_chagas_tot_esq_w[e].resultado_chagas_tot_esq_w = ""

                        this.formDetalles['4040'].tabla_chagas_sint_esq_w[e].fecha_chagas_sint_esq_w = ""
                        this.formDetalles['4040'].tabla_chagas_sint_esq_w[e].resultado_chagas_sint_esq_w = ""

                        this.formDetalles['4040'].tabla_tsh_esq_w[e].fecha_tsh_esq_w = ""
                        this.formDetalles['4040'].tabla_tsh_esq_w[e].resultado_tsh_esq_w = ""

                        this.formDetalles['4040'].tabla_citolo_cerv_esq_w[e].fecha_citolo_cerv_esq_w = ""
                        this.formDetalles['4040'].tabla_citolo_cerv_esq_w[e].resultado_citolo_cerv_esq_w = ""
                        break;
                }
            })

            // var embar = consult_embar(rips.embarazo);
            // hc_01.descrip.codEmba = rips.embarazo;
            // hc_01.descrip.descripEmba = embar;

            switch (rips.embarazo) {
                case '1': this.$refs.embarazo.value = '1er trim. Emba'; break;
                case '2': this.$refs.embarazo.value = '2do trim. Emba'; break;
                case '3': this.$refs.embarazo.value = '3er trim. Emba'; break;
                case '4': this.$refs.embarazo.value = 'No declara'; break;
                case '9':
                    if (this.info.paciente.SEXO == "M") {
                        this.$refs.embarazo.value = 'No aplica'
                    } else {
                        this._validarDatoEmbarazo();
                    }
                    break;
                default: this._validarDatoEmbarazo(); break;
            }

            if (this.sw_var.embar && (rips.embarazo == "4" || rips.embarazo == "9")) {
                CON851("03", "03", null, "error", "error");
                this._validarDatoEmbarazo();
            } else {

                if (this.sw_var.embar) this._validarDatoPlaneado();
                else {
                    this.formDetalles['4040'].gineco_esq_w.gine_plane_esq_w = ""
                    this.formDetalles['4040'].gineco_esq_w.gine_acept_esq_w = ""
                    this.form.niv_estud = "";
                    this._saltoPag4()
                }
            }

        },

        _validarDatoPlaneado() {
            validarInputs(
                {
                    form: "#gine_plane_esq",
                    orden: "1"
                },
                () => {
                    this._validarDatoAnoRegla();
                },
                () => {
                    let gine_plane_esq_w = this.formDetalles['4040'].gineco_esq_w.gine_plane_esq_w || ""
                    gine_plane_esq_w = gine_plane_esq_w.toUpperCase();

                    if (["S", "N"].includes(gine_plane_esq_w)) {
                        this.formDetalles['4040'].gineco_esq_w.gine_plane_esq_w = gine_plane_esq_w;
                        this.validarDatoAceptado();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._validarDatoPlaneado();
                    }
                }
            );
        },

        validarDatoAceptado() {
            let plane_esq_w = this.formDetalles['4040'].gineco_esq_w.gine_plane_esq_w

            if (plane_esq_w == 'S') {
                this.formDetalles['4040'].gineco_esq_w.gine_acept_esq_w = 'S'
                this.validarDatoEstudio()
            } else {
                validarInputs(
                    {
                        form: "#gine_acept_esq",
                        orden: "1"
                    },
                    () => {
                        this._validarDatoPlaneado();
                    },
                    () => {
                        let gine_acept_esq_w = this.formDetalles['4040'].gineco_esq_w.gine_acept_esq_w || ""
                        gine_acept_esq_w = gine_acept_esq_w.toUpperCase();

                        if (["S", "N"].includes(gine_acept_esq_w)) {
                            this.formDetalles['4040'].gineco_esq_w.gine_acept_esq_w = gine_acept_esq_w;
                            this.validarDatoEstudio();
                        } else {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAceptado();
                        }
                    }
                );
            }
        },

        validarDatoEstudio() {
            let niv_estud = this.form.niv_estud || this.info.paciente["NIV-ESTUD"];

            let params = {
                titulo: "Nivel Estudio",
                array: "Niv_estudio",
                seleccion: niv_estud,
                callback_esc: "_validarDatoPlaneado",
                callback: (data) => {
                    this.form.niv_estud = data.value;
                    this.$refs.nivel_est.value = data.text;
                    this.validarDatoPesoPrevio();
                }
            }
            this._hc828_2(params);
        },

        validarDatoPesoPrevio() {
            validarInputs(
                {
                    form: "#peso_prev",
                    orden: "1"
                },
                () => {
                    this.validarDatoEstudio();
                },
                () => {
                    var temp = parseFloat(this.form.signos.peso_prev);

                    if (temp < 30) {
                        CON851("02", "02", null, "error", "error");
                        this.validarDatoPesoPrevio();
                    } else {
                        this.validarDatoHemoglob();
                    }
                }
            );
        },

        validarDatoHemoglob() {
            validarInputs(
                {
                    form: "#hemoglob_esq",
                },
                () => {
                    this.validarDatoPesoPrevio();
                },
                () => {
                    this.validarDatoTomaHierro();
                }
            );
        },

        validarDatoTomaHierro() {
            validarInputs(
                {
                    form: "#toma_hierro_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoHemoglob();
                },
                () => {
                    let toma_hierro_esq_w = this.formDetalles['4040'].gineco_esq_w.toma_hierro_esq_w || ''
                    toma_hierro_esq_w = toma_hierro_esq_w.toUpperCase();

                    if (["S", "N"].includes(toma_hierro_esq_w)) {
                        this.formDetalles['4040'].gineco_esq_w.toma_hierro_esq_w = toma_hierro_esq_w;
                        this.validarDatoTomaAcido();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoTomaHierro();
                    }
                }
            );
        },

        validarDatoTomaAcido() {
            validarInputs(
                {
                    form: "#toma_acidof_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoTomaHierro();
                },
                () => {
                    let toma_acidof_esq_w = this.formDetalles['4040'].gineco_esq_w.toma_acidof_esq_w || ''
                    toma_acidof_esq_w = toma_acidof_esq_w.toUpperCase();

                    if (["S", "N"].includes(toma_acidof_esq_w)) {
                        this.formDetalles['4040'].gineco_esq_w.toma_acidof_esq_w = toma_acidof_esq_w;
                        this.validarDatoTomaCalcio();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoTomaAcido();
                    }
                }
            );
        },

        validarDatoTomaCalcio() {
            validarInputs(
                {
                    form: "#toma_calcio_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoTomaAcido();
                },
                () => {
                    let toma_calcio_esq_w = this.formDetalles['4040'].gineco_esq_w.toma_calcio_esq_w || ''
                    toma_calcio_esq_w = toma_calcio_esq_w.toUpperCase();

                    if (["S", "N"].includes(toma_calcio_esq_w)) {
                        this.formDetalles['4040'].gineco_esq_w.toma_calcio_esq_w = toma_calcio_esq_w;
                        this.validarDatoAltoRiesgo();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoTomaCalcio();
                    }
                }
            );
        },

        validarDatoAltoRiesgo() {
            validarInputs(
                {
                    form: "#emb_alto_riesg_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoTomaCalcio();
                },
                () => {
                    let emb_alto_riesg_esq_w = this.formDetalles['4040'].gineco_esq_w.emb_alto_riesg_esq_w || ''
                    emb_alto_riesg_esq_w = emb_alto_riesg_esq_w.toUpperCase();

                    if (["S", "N"].includes(emb_alto_riesg_esq_w)) {
                        this.formDetalles['4040'].gineco_esq_w.emb_alto_riesg_esq_w = emb_alto_riesg_esq_w;
                        if (["S"].includes(emb_alto_riesg_esq_w)) {
                            CON851("EH", "EH", null, "error", "error");
                            this.validarDatoAnoAsePre();
                        } else {
                            this.validarDatoAnoAsePre();
                        }
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoAltoRiesgo();
                    }
                }
            );
        },

        validarDatoAnoAsePre() {
            validarInputs(
                {
                    form: "#ano_aseso_pre",
                    orden: "1"
                },
                () => {
                    this.validarDatoAltoRiesgo();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_aseso_pre.anio) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_aseso_pre.anio = ano.toString()
                        this.params_4040.fecha_aseso_pre.mes = 1
                        this.params_4040.fecha_aseso_pre.dia = 1
                        this.validarDatoAnoAsePos()
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoAsePre()
                    } else if (ano == 0) {
                        if (nit_usu == 900004059) {
                            CON851("02", "02", null, "error", "error");
                            this.validarDatoAnoAsePre();
                        } else {
                            this.params_4040.fecha_aseso_pre.anio = 0;
                            this.params_4040.fecha_aseso_pre.mes = 0;
                            this.params_4040.fecha_aseso_pre.dia = 0;
                            this.validarDatoAnoAsePos();
                        }
                    } else {
                        this.validarDatoMesAsePre();
                    }
                }
            );
        },

        validarDatoMesAsePre() {
            validarInputs(
                {
                    form: "#mes_aseso_pre",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoAsePre();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_aseso_pre.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesAsePre();
                    } else {
                        this.validarDatoDiaAsePre();
                    }
                }
            );
        },

        validarDatoDiaAsePre() {
            validarInputs(
                {
                    form: "#dia_aseso_pre",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoAsePre();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_aseso_pre.dia) || 0;

                    if (dia > 31 || dia < 1 || dia == 0) {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoDiaAsePre();
                    } else {
                        let fecha = this.params_4040.fecha_aseso_pre || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal_esq_w.fecha_aseso_pre_esq_w = fecha;
                        let fechaAsesoPre = parseFloat(fecha);

                        if (fechaAsesoPre > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoAsePre();
                        } else {
                            this.validarDatoAnoAsePos()
                        }
                    }
                }
            );
        },

        validarDatoAnoAsePos() {
            validarInputs(
                {
                    form: "#ano_aseso_pos",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoAsePre();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_aseso_pos.anio) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_aseso_pos.anio = ano.toString()
                        this.params_4040.fecha_aseso_pos.mes = 1
                        this.params_4040.fecha_aseso_pos.dia = 1
                        this.validarDatoAnoEcoObst()
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoAsePos()
                    } else if (ano == 0) {
                        if (nit_usu == 900004059) {
                            CON851("02", "02", null, "error", "error");
                            this.validarDatoAnoAsePos();
                        } else {
                            this.params_4040.fecha_aseso_pos.anio = 0;
                            this.params_4040.fecha_aseso_pos.mes = 0;
                            this.params_4040.fecha_aseso_pos.dia = 0;
                            this.validarDatoAnoEcoObst();
                        }
                    } else {
                        this.validarDatoMesAsePos();
                    }
                }
            );
        },

        validarDatoMesAsePos() {
            validarInputs(
                {
                    form: "#mes_aseso_pos",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoAsePos();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_aseso_pos.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesAsePos();
                    } else {
                        this.validarDatoDiaAsePos();
                    }
                }
            );
        },

        validarDatoDiaAsePos() {
            validarInputs(
                {
                    form: "#dia_aseso_pos",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesAsePos();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_aseso_pos.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaAsePos();
                    } else {
                        let fecha = this.params_4040.fecha_aseso_pos || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal_esq_w.fecha_aseso_pos_esq_w = fecha;
                        let fechaAsesoPos = parseFloat(fecha);

                        if (fechaAsesoPos > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoAsePos();
                        } else {
                            this.validarDatoAnoEcoObst()
                        }
                    }
                }
            );
        },

        validarDatoAnoEcoObst() {
            validarInputs(
                {
                    form: "#ano_eco_obst",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoAsePos();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_eco_obst.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoEcoObst()
                    } else if (ano == 0) {
                        this.params_4040.fecha_eco_obst.anio = 0;
                        this.params_4040.fecha_eco_obst.mes = 0;
                        this.params_4040.fecha_eco_obst.dia = 0;
                        this.validarDatoAnoEcoMorfo();
                    } else {
                        this.validarDatoMesEcoObst();
                    }
                }
            );
        },

        validarDatoMesEcoObst() {
            validarInputs(
                {
                    form: "#mes_eco_obst",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEcoObst();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_eco_obst.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesEcoObst();
                    } else {
                        this.validarDatoDiaEcoObst();
                    }
                }
            );
        },

        validarDatoDiaEcoObst() {
            validarInputs(
                {
                    form: "#dia_eco_obst",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesEcoObst();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_eco_obst.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaEcoObst();
                    } else {
                        let fecha = this.params_4040.fecha_eco_obst || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal_esq_w.fecha_eco_obst_esq_w = fecha;
                        let fechaEcoObst = parseFloat(fecha);

                        if (fechaEcoObst > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoEcoObst();
                        } else {
                            this.validarDatoAnoEcoMorfo()
                        }
                    }
                }
            );
        },

        validarDatoAnoEcoMorfo() {
            validarInputs(
                {
                    form: "#ano_eco_morfo",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEcoObst();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_eco_morfo.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoEcoMorfo()
                    } else if (ano == 0) {
                        this.params_4040.fecha_eco_morfo.anio = 0;
                        this.params_4040.fecha_eco_morfo.mes = 0;
                        this.params_4040.fecha_eco_morfo.dia = 0;
                        this.validarDatoAnoEcoPercen();
                    } else {
                        this.validarDatoMesEcoMorfo();
                    }
                }
            );
        },

        validarDatoMesEcoMorfo() {
            validarInputs(
                {
                    form: "#mes_eco_morfo",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEcoMorfo();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_eco_morfo.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesEcoMorfo();
                    } else {
                        this.validarDatoDiaEcoMorfo();
                    }
                }
            );
        },

        validarDatoDiaEcoMorfo() {
            validarInputs(
                {
                    form: "#dia_eco_morfo",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesEcoMorfo();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_eco_morfo.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaEcoMorfo();
                    } else {
                        let fecha = this.params_4040.fecha_eco_morfo || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal2_esq_w.fecha_eco_morfo_esq_w = fecha;
                        let fechaEcoMorfo = parseFloat(fecha);

                        if (fechaEcoMorfo > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoEcoMorfo();
                        } else {
                            this.validarDatoAnoEcoPercen()
                        }
                    }
                }
            );
        },

        validarDatoAnoEcoPercen() {
            validarInputs(
                {
                    form: "#ano_eco_percen",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEcoMorfo();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_eco_percen.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoEcoPercen()
                    } else if (ano == 0) {
                        this.params_4040.fecha_eco_percen.anio = 0;
                        this.params_4040.fecha_eco_percen.mes = 0;
                        this.params_4040.fecha_eco_percen.dia = 0;
                        this.validarDatoAnoVacInflu();
                    } else {
                        this.validarDatoMesEcoPercen();
                    }
                }
            );
        },

        validarDatoMesEcoPercen() {
            validarInputs(
                {
                    form: "#mes_eco_percen",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEcoPercen();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_eco_percen.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesEcoPercen();
                    } else {
                        this.validarDatoDiaEcoPercen();
                    }
                }
            );
        },

        validarDatoDiaEcoPercen() {
            validarInputs(
                {
                    form: "#dia_eco_percen",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesEcoPercen();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_eco_percen.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaEcoPercen();
                    } else {
                        let fecha = this.params_4040.fecha_eco_percen || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal2_esq_w.fecha_eco_percen_esq_w = fecha;
                        let fechaEcoPercen = parseFloat(fecha);

                        if (fechaEcoPercen > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoEcoPercen();
                        } else {
                            this.validarDatoAnoVacInflu()
                        }
                    }
                }
            );
        },

        validarDatoAnoVacInflu() {
            validarInputs(
                {
                    form: "#ano_vac_influ",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEcoPercen();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_vac_influ.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoVacInflu()
                    } else if (ano == 0) {
                        this.params_4040.fecha_vac_influ.anio = 0;
                        this.params_4040.fecha_vac_influ.mes = 0;
                        this.params_4040.fecha_vac_influ.dia = 0;
                        this.validarDatoAnoVacTdap();
                    } else {
                        this.validarDatoMesVacInflu();
                    }
                }
            );
        },

        validarDatoMesVacInflu() {
            validarInputs(
                {
                    form: "#mes_vac_influ",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacInflu();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_vac_influ.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesVacInflu();
                    } else {
                        this.validarDatoDiaVacInflu();
                    }
                }
            );
        },

        validarDatoDiaVacInflu() {
            validarInputs(
                {
                    form: "#dia_vac_influ",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesVacInflu();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_vac_influ.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaVacInflu();
                    } else {
                        let fecha = this.params_4040.fecha_vac_influ || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal_esq_w.fecha_vac_influ_esq_w = fecha;
                        let fechaInflu = parseFloat(fecha);

                        if (fechaInflu > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoVacInflu();
                        } else {
                            this.validarDatoAnoVacTdap()
                        }
                    }
                }
            );
        },

        validarDatoAnoVacTdap() {
            validarInputs(
                {
                    form: "#ano_vac_tdap",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacInflu();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_vac_tdap.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoVacTdap()
                    } else if (ano == 0) {
                        this.params_4040.fecha_vac_tdap.anio = 0;
                        this.params_4040.fecha_vac_tdap.mes = 0;
                        this.params_4040.fecha_vac_tdap.dia = 0;
                        this.validarDatoAnoVacDpt();
                    } else {
                        this.validarDatoMesVacTdap();
                    }
                }
            );
        },

        validarDatoMesVacTdap() {
            validarInputs(
                {
                    form: "#mes_vac_tdap",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacTdap();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_vac_tdap.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesVacTdap();
                    } else {
                        this.validarDatoDiaVacTdap();
                    }
                }
            );
        },

        validarDatoDiaVacTdap() {
            validarInputs(
                {
                    form: "#dia_vac_tdap",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesVacTdap();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_vac_tdap.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaVacTdap();
                    } else {
                        let fecha = this.params_4040.fecha_vac_tdap || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal_esq_w.fecha_vac_tdap_esq_w = fecha;
                        let fechaTdap = parseFloat(fecha);

                        if (fechaTdap > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoVacTdap();
                        } else {
                            this.validarDatoAnoVacDpt()
                        }
                    }
                }
            );
        },

        validarDatoAnoVacDpt() {
            validarInputs(
                {
                    form: "#ano_vac_dpt",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacTdap();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_vac_dpt.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoVacDpt()
                    } else if (ano == 0) {
                        this.params_4040.fecha_vac_dpt.anio = 0;
                        this.params_4040.fecha_vac_dpt.mes = 0;
                        this.params_4040.fecha_vac_dpt.dia = 0;
                        this.validarDatoAnoVacTt();
                    } else {
                        this.validarDatoMesVacDpt();
                    }
                }
            );
        },

        validarDatoMesVacDpt() {
            validarInputs(
                {
                    form: "#mes_vac_dpt",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacDpt();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_vac_dpt.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesVacDpt();
                    } else {
                        this.validarDatoDiaVacDpt();
                    }
                }
            );
        },

        validarDatoDiaVacDpt() {
            validarInputs(
                {
                    form: "#dia_vac_dpt",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesVacDpt();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_vac_dpt.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaVacDpt();
                    } else {
                        let fecha = this.params_4040.fecha_vac_dpt || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal2_esq_w.fecha_vac_dpt_esq_w = fecha;
                        let fechaDpt = parseFloat(fecha);

                        if (fechaDpt > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoVacDpt();
                        } else {
                            this.validarDatoAnoVacTt()
                        }
                    }
                }
            );
        },

        validarDatoAnoVacTt() {
            validarInputs(
                {
                    form: "#ano_vac_tt",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacDpt();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_vac_tt.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoVacTt()
                    } else if (ano == 0) {
                        this.params_4040.fecha_vac_tt.anio = 0;
                        this.params_4040.fecha_vac_tt.mes = 0;
                        this.params_4040.fecha_vac_tt.dia = 0;
                        this.validarDatoGrupo();
                    } else {
                        this.validarDatoMesVacTt();
                    }
                }
            );
        },

        validarDatoMesVacTt() {
            validarInputs(
                {
                    form: "#mes_vac_tt",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacTt();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_vac_tt.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesVacTt();
                    } else {
                        this.validarDatoDiaVacTt();
                    }
                }
            );
        },

        validarDatoDiaVacTt() {
            validarInputs(
                {
                    form: "#dia_vac_tt",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesVacTt();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_vac_tt.dia) || 0;

                    if (dia > 31 || dia < 1) {
                        this.validarDatoDiaVacTt();
                    } else {
                        let fecha = this.params_4040.fecha_vac_tt || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`

                        this.formDetalles['4040'].prenatal_esq_w.fecha_vac_tt_esq_w = fecha;
                        this.validarDatoNroDosis();
                        // let fechaTt = parseFloat(fecha);

                        // if (fechaTt > this.fecha_lnk) {
                        //     CON851("37", "37", null, "error", "error");
                        //     this.validarDatoAnoVacTt();
                        // } else {
                        //     this.validarDatoNroDosis()
                        // }
                    }
                }
            );
        },

        validarDatoNroDosis() {
            validarInputs(
                {
                    form: "#nro_dosis_tt_esq",
                },
                () => {
                    this.validarDatoAnoVacTt();
                },
                () => {
                    this.validarDatoGrupo();
                }
            );
        },

        validarDatoGrupo() {
            if (!this.params_4040.grupo) {
                this.params_4040.grupo = this.info.paciente["GRP-SANG"];
                this.params_4040.rh = this.info.paciente.RH
            }

            validarInputs(
                {
                    form: "#grupo",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacTt();
                },
                () => {
                    let grupo = this.params_4040.grupo || ''
                    grupo = grupo.toUpperCase();

                    if (['O', 'A', 'B', 'AB'].includes(grupo)) {
                        this.params_4040.grupo = grupo;
                        this.validarDatoRh()
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoGrupo();
                    }
                }
            );
        },

        validarDatoRh() {
            validarInputs(
                {
                    form: "#rh",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVacTt();
                },
                async () => {
                    let rh = this.params_4040.rh || ''

                    if (['+', '-'].includes(rh)) {
                        await this._actualizarDatosPaciente();
                        this.validarDatosVentanaTrimestral();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoRh();
                    }
                }
            );
        },

        validarDatosVentanaTrimestral() {
            this.validarDatoAnoVih();
        },

        validarDatoAnoVih() {
            validarInputs(
                {
                    form: "#ano_vih",
                    orden: "1"
                },
                () => {
                    if ($_USUA_GLOBAL[0].NIT == 844003225) {
                        this.validarDatoAltoRiesgo();
                    } else {
                        this.validarDatoAnoAsePre();
                    }
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_vih_esq_w) {
                        this.formDetalles['4040'].tabla_vih_esq_w[i].fecha_vih_esq_w = '';
                        this.formDetalles['4040'].tabla_vih_esq_w[i].resultado_vih_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_vih.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_vih.mes = 1;
                        this.params_4040.fecha_vih.dia = 1;
                        let fecha = this.params_4040.fecha_vih || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].fecha_vih_esq_w = fecha;
                        this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].resultado_vih_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_vih1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_vih2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_vih3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoSerolo();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoVih();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoVih();
                        } else {
                            this.params_4040.fecha_vih.anio = 0
                            this.params_4040.fecha_vih.mes = 0
                            this.params_4040.fecha_vih.dia = 0
                            this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].fecha_vih_esq_w = ''
                            this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].resultado_vih_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_vih1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_vih2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_vih3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoSerolo()
                        }
                    } else {
                        this.validarDatoMesVih();
                    }
                }
            );
        },

        validarDatoMesVih() {
            validarInputs(
                {
                    form: "#mes_vih",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVih();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_vih.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesVih();
                    } else {
                        this.validarDatoDiaVih();
                    }
                }
            );
        },

        validarDatoDiaVih() {
            validarInputs(
                {
                    form: "#dia_vih",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesVih();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_vih.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaVih()
                    } else {
                        let fecha = this.params_4040.fecha_vih || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].fecha_vih_esq_w = fecha;

                        let fechaVihEsq = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaVihEsq > this.fecha_lnk || fechaVihEsq < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoVih();
                        } else {
                            fechaVihEsq = fechaVihEsq.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaVihEsq);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultVih();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_vih_esq_w[embarazo_temp].fecha_vih_esq_w = this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].fecha_vih_esq_w
                                this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].fecha_vih_esq_w = ''
                                this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].resultado_vih_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultVih();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultVih() {
            let result = this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].resultado_vih_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoVih",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_vih_esq_w[this.sw_var.indiceEmbar].resultado_vih_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_vih${indice}`].value = data.text;
                    this.validarDatoAnoSerolo();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoSerolo() {
            validarInputs(
                {
                    form: "#ano_serolo",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVih();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_serolo_esq_w) {
                        this.formDetalles['4040'].tabla_serolo_esq_w[i].fecha_serolo_esq_w = '';
                        this.formDetalles['4040'].tabla_serolo_esq_w[i].resultado_serolo_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_serolo.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_serolo.mes = 1;
                        this.params_4040.fecha_serolo.dia = 1;
                        let fecha = this.params_4040.fecha_serolo || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].fecha_serolo_esq_w = fecha;
                        this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].resultado_serolo_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_serolo1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_serolo2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_serolo3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoVdrl();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoSerolo();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoSerolo();
                        } else {
                            this.params_4040.fecha_serolo.anio = 0
                            this.params_4040.fecha_serolo.mes = 0
                            this.params_4040.fecha_serolo.dia = 0
                            this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].fecha_serolo_esq_w = ''
                            this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].resultado_serolo_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_serolo1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_serolo2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_serolo3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoVdrl()
                        }
                    } else {
                        this.validarDatoMesSerolo();
                    }
                }
            );
        },

        validarDatoMesSerolo() {
            validarInputs(
                {
                    form: "#mes_serolo",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoSerolo();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_serolo.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesSerolo();
                    } else {
                        this.validarDatoDiaSerolo();
                    }
                }
            );
        },

        validarDatoDiaSerolo() {
            validarInputs(
                {
                    form: "#dia_serolo",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesSerolo();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_serolo.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaSerolo()
                    } else {
                        let fecha = this.params_4040.fecha_serolo || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].fecha_serolo_esq_w = fecha;

                        let fechaSerolo = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaSerolo > this.fecha_lnk || fechaSerolo < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoSerolo();
                        } else {
                            fechaSerolo = fechaSerolo.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaSerolo);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultSerolo();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_serolo_esq_w[embarazo_temp].fecha_serolo_esq_w = this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].fecha_serolo_esq_w
                                this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].fecha_serolo_esq_w = ''
                                this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].resultado_serolo_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultSerolo();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultSerolo() {
            let result = this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].resultado_serolo_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_serolo",
                seleccion: result,
                callback_esc: "validarDatoAnoSerolo",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_serolo_esq_w[this.sw_var.indiceEmbar].resultado_serolo_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_serolo${indice}`].value = data.text;
                    this.validarDatoAnoVdrl();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoVdrl() {
            validarInputs(
                {
                    form: "#ano_vdrl",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoSerolo();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_vdrl_esq_w) {
                        this.formDetalles['4040'].tabla_vdrl_esq_w[i].fecha_vdrl_esq_w = '';
                        this.formDetalles['4040'].tabla_vdrl_esq_w[i].resultado_vdrl_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_vdrl.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_vdrl.mes = 1;
                        this.params_4040.fecha_vdrl.dia = 1;
                        let fecha = this.params_4040.fecha_vdrl || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].fecha_vdrl_esq_w = fecha;
                        this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].resultado_vdrl_esq_w = '3';
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_vdrl1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_vdrl2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_vdrl3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoHemogra();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoVdrl();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoVdrl();
                        } else {
                            this.params_4040.fecha_vdrl.anio = 0
                            this.params_4040.fecha_vdrl.mes = 0
                            this.params_4040.fecha_vdrl.dia = 0
                            this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].fecha_vdrl_esq_w = ''
                            this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].resultado_vdrl_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_vdrl1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_vdrl2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_vdrl3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoHemogra()
                        }
                    } else {
                        this.validarDatoMesVdrl();
                    }
                }
            );
        },

        validarDatoMesVdrl() {
            validarInputs(
                {
                    form: "#mes_vdrl",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVdrl();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_vdrl.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesVdrl();
                    } else {
                        this.validarDatoDiaVdrl();
                    }
                }
            );
        },

        validarDatoDiaVdrl() {
            validarInputs(
                {
                    form: "#dia_vdrl",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesVdrl();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_vdrl.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaVdrl()
                    } else {
                        let fecha = this.params_4040.fecha_vdrl || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].fecha_vdrl_esq_w = fecha;

                        let fechaVdrl = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaVdrl > this.fecha_lnk || fechaVdrl < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoVdrl();
                        } else {
                            fechaVdrl = fechaVdrl.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaVdrl);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResulVdrl();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_vdrl_esq_w[embarazo_temp].fecha_vdrl_esq_w = this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].fecha_vdrl_esq_w
                                this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].fecha_vdrl_esq_w = ''
                                this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].resultado_vdrl_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResulVdrl();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResulVdrl() {
            let result = this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].resultado_vdrl_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_serolo",
                seleccion: result,
                callback_esc: "validarDatoAnoVdrl",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_vdrl_esq_w[this.sw_var.indiceEmbar].resultado_vdrl_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_vdrl${indice}`].value = data.text;
                    this.validarDatoAnoHemogra();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoHemogra() {
            validarInputs(
                {
                    form: "#ano_hemogra",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoVdrl();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_hemogra_esq_w) {
                        this.formDetalles['4040'].tabla_hemogra_esq_w[i].fecha_hemogra_esq_w = '';
                        this.formDetalles['4040'].tabla_hemogra_esq_w[i].resultado_hemogra_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_hemogra.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_hemogra.mes = 1;
                        this.params_4040.fecha_hemogra.dia = 1;
                        let fecha = this.params_4040.fecha_hemogra || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].fecha_hemogra_esq_w = fecha;
                        this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].resultado_hemogra_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_hemogra1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_hemogra2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_hemogra3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoHemog();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoHemogra();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoHemogra();
                        } else {
                            this.params_4040.fecha_hemogra.anio = 0
                            this.params_4040.fecha_hemogra.mes = 0
                            this.params_4040.fecha_hemogra.dia = 0
                            this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].fecha_hemogra_esq_w = ''
                            this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].resultado_hemogra_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_hemogra1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_hemogra2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_hemogra3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoHemog()
                        }
                    } else {
                        this.validarDatoMesHemogra();
                    }
                }
            );
        },

        validarDatoMesHemogra() {
            validarInputs(
                {
                    form: "#mes_hemogra",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoHemogra();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_hemogra.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesHemogra();
                    } else {
                        this.validarDatoDiaHemogra();
                    }
                }
            );
        },

        validarDatoDiaHemogra() {
            validarInputs(
                {
                    form: "#dia_hemogra",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesHemogra();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_hemogra.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaHemogra()
                    } else {
                        let fecha = this.params_4040.fecha_hemogra || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].fecha_hemogra_esq_w = fecha;

                        let fechaHemog = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaHemog > this.fecha_lnk || fechaHemog < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoHemogra();
                        } else {
                            fechaHemog = fechaHemog.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaHemog);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultHemogra();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_hemogra_esq_w[embarazo_temp].fecha_hemogra_esq_w = this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].fecha_hemogra_esq_w
                                this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].fecha_hemogra_esq_w = ''
                                this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].resultado_hemogra_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultHemogra();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultHemogra() {
            let result = this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].resultado_hemogra_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_hemogra",
                seleccion: result,
                callback_esc: "validarDatoAnoHemogra",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_hemogra_esq_w[this.sw_var.indiceEmbar].resultado_hemogra_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_hemogra${indice}`].value = data.text;
                    this.validarDatoAnoHemog();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoHemog() {
            validarInputs(
                {
                    form: "#ano_hemog",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoSerolo();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_hemogl_esq_w) {
                        this.formDetalles['4040'].tabla_hemogl_esq_w[i].fecha_hemogl_esq_w = '';
                        this.formDetalles['4040'].tabla_hemogl_esq_w[i].resultado_hemogl_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_hemog.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_hemog.mes = 1;
                        this.params_4040.fecha_hemog.dia = 1;
                        let fecha = this.params_4040.fecha_hemog || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].fecha_hemogl_esq_w = fecha;
                        this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].resultado_hemogl_esq_w = ''
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_hemog1.value = ''; break;
                            case 1: this.$refs.resultado_hemog2.value = ''; break;
                            case 2: this.$refs.resultado_hemog3.value = ''; break;
                        }
                        this.validarDatoAnoGlucosa();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoHemog();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoHemog();
                        } else {
                            this.params_4040.fecha_hemog.anio = 0
                            this.params_4040.fecha_hemog.mes = 0
                            this.params_4040.fecha_hemog.dia = 0
                            this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].fecha_hemogl_esq_w = ''
                            this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].resultado_hemogl_esq_w = ''
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_hemog1.value = ''; break;
                                case 1: this.$refs.resultado_hemog2.value = ''; break;
                                case 2: this.$refs.resultado_hemog3.value = ''; break;
                            }
                            this.validarDatoAnoGlucosa()
                        }
                    } else {
                        this.validarDatoMesHemog();
                    }
                }
            );
        },

        validarDatoMesHemog() {
            validarInputs(
                {
                    form: "#mes_hemog",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoHemog();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_hemog.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesHemog();
                    } else {
                        this.validarDatoDiaHemog();
                    }
                }
            );
        },

        validarDatoDiaHemog() {
            validarInputs(
                {
                    form: "#dia_hemog",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesHemog();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_hemog.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaHemog()
                    } else {
                        let fecha = this.params_4040.fecha_hemog || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].fecha_hemogl_esq_w = fecha;

                        let fechaHemog = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaHemog > this.fecha_lnk || fechaHemog < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoHemog();
                        } else {
                            fechaHemog = fechaHemog.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaHemog);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultHemog();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_hemogl_esq_w[embarazo_temp].fecha_hemogl_esq_w = this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].fecha_hemogl_esq_w
                                this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].fecha_hemogl_esq_w = ''
                                this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].resultado_hemogl_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultHemog();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultHemog() {
            let indice = this.sw_var.indiceEmbar + 1
            validarInputs(
                {
                    form: `#result_hemog${indice}`,
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoHemog();
                },
                () => {
                    let result = this.$refs[`resultado_hemog${indice}`].value || 0
                    this.formDetalles['4040'].tabla_hemogl_esq_w[this.sw_var.indiceEmbar].resultado_hemogl_esq_w = result
                    this.validarDatoAnoGlucosa();
                }
            );
        },

        validarDatoAnoGlucosa() {
            validarInputs(
                {
                    form: "#ano_glucosa",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoHemog();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_glucosa_esq_w) {
                        this.formDetalles['4040'].tabla_glucosa_esq_w[i].fecha_glucosa_esq_w = '';
                        this.formDetalles['4040'].tabla_glucosa_esq_w[i].resultado_glucosa_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_glucosa.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_glucosa.mes = 1;
                        this.params_4040.fecha_glucosa.dia = 1;
                        let fecha = this.params_4040.fecha_glucosa || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].fecha_glucosa_esq_w = fecha;
                        this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].resultado_glucosa_esq_w = ''
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_glucosa1.value = ''; break;
                            case 1: this.$refs.resultado_glucosa2.value = ''; break;
                            case 2: this.$refs.resultado_glucosa3.value = ''; break;
                        }
                        this.validarDatoAnoPtog();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoGlucosa();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoGlucosa();
                        } else {
                            this.params_4040.fecha_glucosa.anio = 0
                            this.params_4040.fecha_glucosa.mes = 0
                            this.params_4040.fecha_glucosa.dia = 0
                            this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].fecha_glucosa_esq_w = ''
                            this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].resultado_glucosa_esq_w = ''
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_glucosa1.value = ''; break;
                                case 1: this.$refs.resultado_glucosa2.value = ''; break;
                                case 2: this.$refs.resultado_glucosa3.value = ''; break;
                            }
                            this.validarDatoAnoPtog()
                        }
                    } else {
                        this.validarDatoMesGlucosa();
                    }
                }
            );
        },

        validarDatoMesGlucosa() {
            validarInputs(
                {
                    form: "#mes_glucosa",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoGlucosa();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_glucosa.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesGlucosa();
                    } else {
                        this.validarDatoDiaGlucosa();
                    }
                }
            );
        },

        validarDatoDiaGlucosa() {
            validarInputs(
                {
                    form: "#dia_glucosa",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesGlucosa();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_glucosa.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaGlucosa()
                    } else {
                        let fecha = this.params_4040.fecha_glucosa || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].fecha_glucosa_esq_w = fecha;

                        let fechaGluco = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaGluco > this.fecha_lnk || fechaGluco < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoGlucosa();
                        } else {
                            fechaGluco = fechaGluco.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaGluco);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultGlucosa();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_glucosa_esq_w[embarazo_temp].fecha_glucosa_esq_w = this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].fecha_glucosa_esq_w
                                this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].fecha_glucosa_esq_w = ''
                                this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].resultado_glucosa_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultGlucosa();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultGlucosa() {
            let indice = this.sw_var.indiceEmbar + 1
            validarInputs(
                {
                    form: `#result_glucosa${indice}`,
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoGlucosa();
                },
                () => {
                    let result = this.$refs[`resultado_glucosa${indice}`].value || 0
                    this.formDetalles['4040'].tabla_glucosa_esq_w[this.sw_var.indiceEmbar].resultado_glucosa_esq_w = result
                    this.validarDatoAnoPtog();
                }
            );
        },

        validarDatoAnoPtog() {
            validarInputs(
                {
                    form: "#ano_ptog",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoGlucosa();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_ptog_esq_w) {
                        this.formDetalles['4040'].tabla_ptog_esq_w[i].fecha_ptog_esq_w = '';
                        this.formDetalles['4040'].tabla_ptog_esq_w[i].resultado_ptog_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_ptog.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_ptog.mes = 1;
                        this.params_4040.fecha_ptog.dia = 1;
                        let fecha = this.params_4040.fecha_ptog || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].fecha_ptog_esq_w = fecha;
                        this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].resultado_ptog_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_ptog1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_ptog2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_ptog3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoUroanali();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoPtog();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoPtog();
                        } else {
                            this.params_4040.fecha_ptog.anio = 0
                            this.params_4040.fecha_ptog.mes = 0
                            this.params_4040.fecha_ptog.dia = 0
                            this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].fecha_ptog_esq_w = ''
                            this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].resultado_ptog_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_ptog1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_ptog2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_ptog3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoUroanali()
                        }
                    } else {
                        this.validarDatoMesPtog();
                    }
                }
            );
        },

        validarDatoMesPtog() {
            validarInputs(
                {
                    form: "#mes_ptog",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoPtog();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_ptog.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesPtog();
                    } else {
                        this.validarDatoDiaPtog();
                    }
                }
            );
        },

        validarDatoDiaPtog() {
            validarInputs(
                {
                    form: "#dia_ptog",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesPtog();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_ptog.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaPtog()
                    } else {
                        let fecha = this.params_4040.fecha_ptog || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].fecha_ptog_esq_w = fecha;

                        let fechaPtog = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaPtog > this.fecha_lnk || fechaPtog < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoGlucosa();
                        } else {
                            fechaPtog = fechaPtog.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaPtog);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultPtog();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_ptog_esq_w[embarazo_temp].fecha_ptog_esq_w = this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].fecha_ptog_esq_w
                                this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].fecha_ptog_esq_w = ''
                                this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].resultado_ptog_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultPtog();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultPtog() {
            let result = this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].resultado_ptog_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoPtog",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_ptog_esq_w[this.sw_var.indiceEmbar].resultado_ptog_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_ptog${indice}`].value = data.text;
                    this.validarDatoAnoUroanali();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoUroanali() {
            validarInputs(
                {
                    form: "#ano_uroanali",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoPtog();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_uroanali_esq_w) {
                        this.formDetalles['4040'].tabla_uroanali_esq_w[i].fecha_uroanali_esq_w = '';
                        this.formDetalles['4040'].tabla_uroanali_esq_w[i].resultado_uroanali_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_uroanali.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_uroanali.mes = 1;
                        this.params_4040.fecha_uroanali.dia = 1;
                        let fecha = this.params_4040.fecha_uroanali || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].fecha_uroanali_esq_w = fecha;
                        this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].resultado_uroanali_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_uroanali1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_uroanali2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_uroanali3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoUroculti();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoUroanali();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoUroanali();
                        } else {
                            this.params_4040.fecha_uroanali.anio = 0
                            this.params_4040.fecha_uroanali.mes = 0
                            this.params_4040.fecha_uroanali.dia = 0
                            this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].fecha_uroanali_esq_w = ''
                            this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].resultado_uroanali_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_uroanali1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_uroanali2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_uroanali3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoUroculti()
                        }
                    } else {
                        this.validarDatoMesUroanali();
                    }
                }
            );
        },

        validarDatoMesUroanali() {
            validarInputs(
                {
                    form: "#mes_uroanali",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoUroanali();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_uroanali.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesUroanali();
                    } else {
                        this.validarDatoDiaUroanali();
                    }
                }
            );
        },

        validarDatoDiaUroanali() {
            validarInputs(
                {
                    form: "#dia_uroanali",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesUroanali();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_uroanali.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaUroanali()
                    } else {
                        let fecha = this.params_4040.fecha_uroanali || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].fecha_uroanali_esq_w = fecha;

                        let fechaUroanali = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaUroanali > this.fecha_lnk || fechaUroanali < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoUroanali();
                        } else {
                            fechaUroanali = fechaUroanali.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaUroanali);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultUroanali();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_uroanali_esq_w[embarazo_temp].fecha_uroanali_esq_w = this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].fecha_uroanali_esq_w
                                this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].fecha_uroanali_esq_w = ''
                                this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].resultado_uroanali_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultUroanali();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultUroanali() {
            let result = this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].resultado_uroanali_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_hemogra",
                seleccion: result,
                callback_esc: "validarDatoAnoUroanali",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_uroanali_esq_w[this.sw_var.indiceEmbar].resultado_uroanali_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_uroanali${indice}`].value = data.text;
                    this.validarDatoAnoUroculti();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoUroculti() {
            validarInputs(
                {
                    form: "#ano_uroculti",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoUroanali();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_uroculti_esq_w) {
                        this.formDetalles['4040'].tabla_uroculti_esq_w[i].fecha_uroculti_esq_w = '';
                        this.formDetalles['4040'].tabla_uroculti_esq_w[i].resultado_uroculti_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_uroculti.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_uroculti.mes = 1;
                        this.params_4040.fecha_uroculti.dia = 1;
                        let fecha = this.params_4040.fecha_uroculti || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].fecha_uroculti_esq_w = fecha;
                        this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].resultado_uroculti_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_uroculti1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_uroculti2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_uroculti3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoFrotisV();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoUroculti();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoUroculti();
                        } else {
                            this.params_4040.fecha_uroculti.anio = 0
                            this.params_4040.fecha_uroculti.mes = 0
                            this.params_4040.fecha_uroculti.dia = 0
                            this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].fecha_uroculti_esq_w = ''
                            this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].resultado_uroculti_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_uroculti1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_uroculti2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_uroculti3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoFrotisV()
                        }
                    } else {
                        this.validarDatoMesUroculti();
                    }
                }
            );
        },

        validarDatoMesUroculti() {
            validarInputs(
                {
                    form: "#mes_uroculti",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoUroculti();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_uroculti.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesUroculti();
                    } else {
                        this.validarDatoDiaUroculti();
                    }
                }
            );
        },

        validarDatoDiaUroculti() {
            validarInputs(
                {
                    form: "#dia_uroculti",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesUroculti();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_uroculti.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaUroculti()
                    } else {
                        let fecha = this.params_4040.fecha_uroculti || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].fecha_uroculti_esq_w = fecha;

                        let fechaUroculti = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaUroculti > this.fecha_lnk || fechaUroculti < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoUroculti();
                        } else {
                            fechaUroculti = fechaUroculti.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaUroculti);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultUroculti();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_uroculti_esq_w[embarazo_temp].fecha_uroculti_esq_w = this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].fecha_uroculti_esq_w
                                this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].fecha_uroculti_esq_w = ''
                                this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].resultado_uroculti_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultUroculti();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultUroculti() {
            let result = this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].resultado_uroculti_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_hemogra",
                seleccion: result,
                callback_esc: "validarDatoAnoUroculti",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_uroculti_esq_w[this.sw_var.indiceEmbar].resultado_uroculti_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_uroculti${indice}`].value = data.text;
                    this.validarDatoAnoFrotisV();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoFrotisV() {
            validarInputs(
                {
                    form: "#ano_frotisv",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoUroculti();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_frotisv_esq_w) {
                        this.formDetalles['4040'].tabla_frotisv_esq_w[i].fecha_frotisv_esq_w = '';
                        this.formDetalles['4040'].tabla_frotisv_esq_w[i].resultado_frotisv_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_frotisv.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_frotisv.mes = 1;
                        this.params_4040.fecha_frotisv.dia = 1;
                        let fecha = this.params_4040.fecha_frotisv || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].fecha_frotisv_esq_w = fecha;
                        this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].resultado_frotisv_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_frotisv1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_frotisv2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_frotisv3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoGotaGrues()
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoFrotisV();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoFrotisV();
                        } else {
                            this.params_4040.fecha_frotisv.anio = 0
                            this.params_4040.fecha_frotisv.mes = 0
                            this.params_4040.fecha_frotisv.dia = 0
                            this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].fecha_frotisv_esq_w = ''
                            this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].resultado_frotisv_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_frotisv1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_frotisv2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_frotisv3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoGotaGrues()
                        }
                    } else {
                        this.validarDatoMesFrotisV();
                    }
                }
            );
        },

        validarDatoMesFrotisV() {
            validarInputs(
                {
                    form: "#mes_frotisv",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoFrotisV();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_frotisv.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesFrotisV();
                    } else {
                        this.validarDatoDiaFrotisV();
                    }
                }
            );
        },

        validarDatoDiaFrotisV() {
            validarInputs(
                {
                    form: "#dia_frotisv",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesFrotisV();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_frotisv.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaFrotisV()
                    } else {
                        let fecha = this.params_4040.fecha_frotisv || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].fecha_frotisv_esq_w = fecha;

                        let fechaFrotis = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaFrotis > this.fecha_lnk || fechaFrotis < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoFrotisV();
                        } else {
                            fechaFrotis = fechaFrotis.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaFrotis);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultFrotisV();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_frotisv_esq_w[embarazo_temp].fecha_frotisv_esq_w = this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].fecha_frotisv_esq_w
                                this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].fecha_frotisv_esq_w = ''
                                this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].resultado_frotisv_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultFrotisV();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultFrotisV() {
            let result = this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].resultado_frotisv_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_hemogra",
                seleccion: result,
                callback_esc: "validarDatoAnoFrotisV",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_frotisv_esq_w[this.sw_var.indiceEmbar].resultado_frotisv_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_frotisv${indice}`].value = data.text;
                    this.validarDatoAnoGotaGrues();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoGotaGrues() {
            validarInputs(
                {
                    form: "#ano_gota_grues",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoFrotisV();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_gota_grues_esq_w) {
                        this.formDetalles['4040'].tabla_gota_grues_esq_w[i].fecha_gota_grues_esq_w = '';
                        this.formDetalles['4040'].tabla_gota_grues_esq_w[i].resultado_gota_grues_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_gota_grues.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_gota_grues.mes = 1;
                        this.params_4040.fecha_gota_grues.dia = 1;
                        let fecha = this.params_4040.fecha_gota_grues || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].fecha_gota_grues_esq_w = fecha;
                        this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].resultado_gota_grues_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_gota_grues1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_gota_grues2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_gota_grues3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoEstrepB()
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoGotaGrues();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoGotaGrues();
                        } else {
                            this.params_4040.fecha_gota_grues.anio = 0
                            this.params_4040.fecha_gota_grues.mes = 0
                            this.params_4040.fecha_gota_grues.dia = 0
                            this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].fecha_gota_grues_esq_w = ''
                            this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].resultado_gota_grues_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_gota_grues1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_gota_grues2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_gota_grues3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoEstrepB()
                        }
                    } else {
                        this.validarDatoMesGotaGrues();
                    }
                }
            );
        },

        validarDatoMesGotaGrues() {
            validarInputs(
                {
                    form: "#mes_gota_grues",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoGotaGrues();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_gota_grues.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesGotaGrues();
                    } else {
                        this.validarDatoDiaGotaGrues();
                    }
                }
            );
        },

        validarDatoDiaGotaGrues() {
            validarInputs(
                {
                    form: "#dia_gota_grues",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesGotaGrues();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_gota_grues.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaFrotisV()
                    } else {
                        let fecha = this.params_4040.fecha_gota_grues || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].fecha_gota_grues_esq_w = fecha;

                        let fechaGotaGrues = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaGotaGrues > this.fecha_lnk || fechaGotaGrues < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoGotaGrues();
                        } else {
                            fechaGotaGrues = fechaGotaGrues.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaGotaGrues);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultGotaGrues();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_gota_grues_esq_w[embarazo_temp].fecha_gota_grues_esq_w = this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].fecha_gota_grues_esq_w
                                this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].fecha_gota_grues_esq_w = ''
                                this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].resultado_gota_grues_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultGotaGrues();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultGotaGrues() {
            let result = this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].resultado_gota_grues_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_hemogra",
                seleccion: result,
                callback_esc: "validarDatoAnoGotaGrues",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_gota_grues_esq_w[this.sw_var.indiceEmbar].resultado_gota_grues_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_gota_grues${indice}`].value = data.text;
                    this.validarDatoAnoEstrepB();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoEstrepB() {
            validarInputs(
                {
                    form: "#ano_estrep_b",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoGotaGrues();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_estrep_b_esq_w) {
                        this.formDetalles['4040'].tabla_estrep_b_esq_w[i].fecha_estrep_b_esq_w = '';
                        this.formDetalles['4040'].tabla_estrep_b_esq_w[i].resultado_estrep_b_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_estrep_b.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_estrep_b.mes = 1;
                        this.params_4040.fecha_estrep_b.dia = 1;
                        let fecha = this.params_4040.fecha_estrep_b || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].fecha_estrep_b_esq_w = fecha;
                        this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].resultado_estrep_b_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_estrep_b1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_estrep_b2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_estrep_b3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoIgm()
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoEstrepB();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoEstrepB();
                        } else {
                            this.params_4040.fecha_estrep_b.anio = 0
                            this.params_4040.fecha_estrep_b.mes = 0
                            this.params_4040.fecha_estrep_b.dia = 0
                            this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].fecha_estrep_b_esq_w = ''
                            this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].resultado_estrep_b_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_estrep_b1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_estrep_b2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_estrep_b3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoIgm()
                        }
                    } else {
                        this.validarDatoMesEstrepB();
                    }
                }
            );
        },

        validarDatoMesEstrepB() {
            validarInputs(
                {
                    form: "#mes_estrep_b",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEstrepB();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_estrep_b.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesEstrepB();
                    } else {
                        this.validarDatoDiaEstrepB();
                    }
                }
            );
        },

        validarDatoDiaEstrepB() {
            validarInputs(
                {
                    form: "#dia_estrep_b",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesEstrepB();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_estrep_b.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaEstrepB()
                    } else {
                        let fecha = this.params_4040.fecha_estrep_b || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].fecha_estrep_b_esq_w = fecha;

                        let fechaEstrepB = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaEstrepB > this.fecha_lnk || fechaEstrepB < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoEstrepB();
                        } else {
                            fechaEstrepB = fechaEstrepB.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaEstrepB);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultEstrepB();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_estrep_b_esq_w[embarazo_temp].fecha_estrep_b_esq_w = this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].fecha_estrep_b_esq_w
                                this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].fecha_estrep_b_esq_w = ''
                                this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].resultado_estrep_b_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultEstrepB();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultEstrepB() {
            let result = this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].resultado_estrep_b_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_hemogra",
                seleccion: result,
                callback_esc: "validarDatoAnoEstrepB",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_estrep_b_esq_w[this.sw_var.indiceEmbar].resultado_estrep_b_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_estrep_b${indice}`].value = data.text;
                    this.validarDatoAnoIgm();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoIgm() {
            validarInputs(
                {
                    form: "#ano_igm",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoEstrepB();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_igm_esq_w) {
                        this.formDetalles['4040'].tabla_igm_esq_w[i].fecha_igm_esq_w = '';
                        this.formDetalles['4040'].tabla_igm_esq_w[i].resultado_igm_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_igm.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_igm.mes = 1;
                        this.params_4040.fecha_igm.dia = 1;
                        let fecha = this.params_4040.fecha_igm || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].fecha_igm_esq_w = fecha;
                        this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].resultado_igm_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_igm1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_igm2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_igm3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoIgg();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoIgm();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoIgm();
                        } else {
                            this.params_4040.fecha_igm.anio = 0
                            this.params_4040.fecha_igm.mes = 0
                            this.params_4040.fecha_igm.dia = 0
                            this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].fecha_igm_esq_w = ''
                            this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].resultado_igm_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_igm1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_igm2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_igm3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoIgg()
                        }
                    } else {
                        this.validarDatoMesIgm();
                    }
                }
            );
        },

        validarDatoMesIgm() {
            validarInputs(
                {
                    form: "#mes_igm",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoIgm();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_igm.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesIgm();
                    } else {
                        this.validarDatoDiaIgm();
                    }
                }
            );
        },

        validarDatoDiaIgm() {
            validarInputs(
                {
                    form: "#dia_igm",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesIgm();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_igm.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaIgm()
                    } else {
                        let fecha = this.params_4040.fecha_igm || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].fecha_igm_esq_w = fecha;

                        let fechaIgm = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaIgm > this.fecha_lnk || fechaIgm < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoIgm();
                        } else {
                            fechaIgm = fechaIgm.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaIgm);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultIgm();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_igm_esq_w[embarazo_temp].fecha_igm_esq_w = this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].fecha_igm_esq_w
                                this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].fecha_igm_esq_w = ''
                                this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].resultado_igm_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultIgm();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultIgm() {
            let result = this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].resultado_igm_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoIgm",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_igm_esq_w[this.sw_var.indiceEmbar].resultado_igm_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_igm${indice}`].value = data.text;
                    this.validarDatoAnoIgg();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoIgg() {
            validarInputs(
                {
                    form: "#ano_igg",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoIgm();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_igg_esq_w) {
                        this.formDetalles['4040'].tabla_igg_esq_w[i].fecha_igg_esq_w = '';
                        this.formDetalles['4040'].tabla_igg_esq_w[i].resultado_igg_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_igg.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_igg.mes = 1;
                        this.params_4040.fecha_igg.dia = 1;
                        let fecha = this.params_4040.fecha_igg || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].fecha_igg_esq_w = fecha;
                        this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].resultado_igg_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_igg1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_igg2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_igg3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoRubeoIgg();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoIgg();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoIgg();
                        } else {
                            this.params_4040.fecha_igg.anio = 0
                            this.params_4040.fecha_igg.mes = 0
                            this.params_4040.fecha_igg.dia = 0
                            this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].fecha_igg_esq_w = ''
                            this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].resultado_igg_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_igg1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_igg2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_igg3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoRubeoIgg()
                        }
                    } else {
                        this.validarDatoMesIgg();
                    }
                }
            );
        },

        validarDatoMesIgg() {
            validarInputs(
                {
                    form: "#mes_igg",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoIgg();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_igg.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesIgg();
                    } else {
                        this.validarDatoDiaIgg();
                    }
                }
            );
        },

        validarDatoDiaIgg() {
            validarInputs(
                {
                    form: "#dia_igg",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesIgg();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_igg.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaIgg()
                    } else {
                        let fecha = this.params_4040.fecha_igg || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].fecha_igg_esq_w = fecha;

                        let fechaIgg = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaIgg > this.fecha_lnk || fechaIgg < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoIgg();
                        } else {
                            fechaIgg = fechaIgg.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaIgg);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultIgg();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_igg_esq_w[embarazo_temp].fecha_igg_esq_w = this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].fecha_igg_esq_w
                                this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].fecha_igg_esq_w = ''
                                this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].resultado_igg_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultIgg();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultIgg() {
            let result = this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].resultado_igg_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoIgg",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_igg_esq_w[this.sw_var.indiceEmbar].resultado_igg_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_igg${indice}`].value = data.text;
                    this.validarDatoAnoRubeoIgg();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoRubeoIgg() {
            validarInputs(
                {
                    form: "#ano_rubeo_igg",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoIgg();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_rubeo_igg_esq_w) {
                        this.formDetalles['4040'].tabla_rubeo_igg_esq_w[i].fecha_rubeo_igg_esq_w = '';
                        this.formDetalles['4040'].tabla_rubeo_igg_esq_w[i].resultado_rubeo_igg_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_rubeo_igg.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_rubeo_igg.mes = 1;
                        this.params_4040.fecha_rubeo_igg.dia = 1;
                        let fecha = this.params_4040.fecha_rubeo_igg || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igg_esq_w = fecha;
                        this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igg_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_rubeo_igg1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_rubeo_igg2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_rubeo_igg3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoRubeoIgm();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoRubeoIgg();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoRubeoIgg();
                        } else {
                            this.params_4040.fecha_rubeo_igg.anio = 0
                            this.params_4040.fecha_rubeo_igg.mes = 0
                            this.params_4040.fecha_rubeo_igg.dia = 0
                            this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igg_esq_w = ''
                            this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igg_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_rubeo_igg1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_rubeo_igg2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_rubeo_igg3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoRubeoIgm()
                        }
                    } else {
                        this.validarDatoMesRubeoIgg();
                    }
                }
            );
        },

        validarDatoMesRubeoIgg() {
            validarInputs(
                {
                    form: "#mes_rubeo_igg",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoRubeoIgg();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_rubeo_igg.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesRubeoIgg();
                    } else {
                        this.validarDatoDiaRubeoIgg();
                    }
                }
            );
        },

        validarDatoDiaRubeoIgg() {
            validarInputs(
                {
                    form: "#dia_rubeo_igg",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesRubeoIgg();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_rubeo_igg.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaRubeoIgg()
                    } else {
                        let fecha = this.params_4040.fecha_rubeo_igg || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igg_esq_w = fecha;

                        let fechaRubeoIgg = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaRubeoIgg > this.fecha_lnk || fechaRubeoIgg < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoRubeoIgg();
                        } else {
                            fechaRubeoIgg = fechaRubeoIgg.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaRubeoIgg);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultRubeoIgg();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_rubeo_igg_esq_w[embarazo_temp].fecha_rubeo_igg_esq_w = this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igg_esq_w
                                this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igg_esq_w = ''
                                this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igg_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultRubeoIgg();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultRubeoIgg() {
            let result = this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igg_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoRubeoIgg",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_rubeo_igg_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igg_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_rubeo_igg${indice}`].value = data.text;
                    this.validarDatoAnoRubeoIgm();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoRubeoIgm() {
            validarInputs(
                {
                    form: "#ano_rubeo_igm",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoRubeoIgg();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_rubeo_igm_esq_w) {
                        this.formDetalles['4040'].tabla_rubeo_igm_esq_w[i].fecha_rubeo_igm_esq_w = '';
                        this.formDetalles['4040'].tabla_rubeo_igm_esq_w[i].resultado_rubeo_igm_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_rubeo_igm.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_rubeo_igm.mes = 1;
                        this.params_4040.fecha_rubeo_igm.dia = 1;
                        let fecha = this.params_4040.fecha_rubeo_igm || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igm_esq_w = fecha;
                        this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igm_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_rubeo_igm1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_rubeo_igm2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_rubeo_igm3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoChagasTot();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoRubeoIgm();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoRubeoIgm();
                        } else {
                            this.params_4040.fecha_rubeo_igm.anio = 0
                            this.params_4040.fecha_rubeo_igm.mes = 0
                            this.params_4040.fecha_rubeo_igm.dia = 0
                            this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igm_esq_w = ''
                            this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igm_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_rubeo_igm1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_rubeo_igm2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_rubeo_igm3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoChagasTot()
                        }
                    } else {
                        this.validarDatoMesRubeoIgm();
                    }
                }
            );
        },

        validarDatoMesRubeoIgm() {
            validarInputs(
                {
                    form: "#mes_rubeo_igm",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoRubeoIgm();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_rubeo_igm.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesRubeoIgm();
                    } else {
                        this.validarDatoDiaRubeoIgm();
                    }
                }
            );
        },

        validarDatoDiaRubeoIgm() {
            validarInputs(
                {
                    form: "#dia_rubeo_igm",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesRubeoIgm();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_rubeo_igm.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaRubeoIgg()
                    } else {
                        let fecha = this.params_4040.fecha_rubeo_igm || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igm_esq_w = fecha;

                        let fechaRubeoIgm = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaRubeoIgm > this.fecha_lnk || fechaRubeoIgm < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoRubeoIgm();
                        } else {
                            fechaRubeoIgm = fechaRubeoIgm.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaRubeoIgm);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultRubeoIgm();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_rubeo_igm_esq_w[embarazo_temp].fecha_rubeo_igm_esq_w = this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igm_esq_w
                                this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].fecha_rubeo_igm_esq_w = ''
                                this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igm_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultRubeoIgm();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultRubeoIgm() {
            let result = this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igm_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoRubeoIgm",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_rubeo_igm_esq_w[this.sw_var.indiceEmbar].resultado_rubeo_igm_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_rubeo_igm${indice}`].value = data.text;
                    this.validarDatoAnoChagasTot();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoChagasTot() {
            validarInputs(
                {
                    form: "#ano_chagas_tot",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoRubeoIgm();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_chagas_tot_esq_w) {
                        this.formDetalles['4040'].tabla_chagas_tot_esq_w[i].fecha_chagas_tot_esq_w = '';
                        this.formDetalles['4040'].tabla_chagas_tot_esq_w[i].resultado_chagas_tot_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_chagas_tot.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_chagas_tot.mes = 1;
                        this.params_4040.fecha_chagas_tot.dia = 1;
                        let fecha = this.params_4040.fecha_chagas_tot || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].fecha_chagas_tot_esq_w = fecha;
                        this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].resultado_chagas_tot_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_chagas_tot1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_chagas_tot2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_chagas_tot3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoChagasSint();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoChagasTot();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoChagasTot();
                        } else {
                            this.params_4040.fecha_chagas_tot.anio = 0
                            this.params_4040.fecha_chagas_tot.mes = 0
                            this.params_4040.fecha_chagas_tot.dia = 0
                            this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].fecha_chagas_tot_esq_w = ''
                            this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].resultado_chagas_tot_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_chagas_tot1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_chagas_tot2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_chagas_tot3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoChagasSint()
                        }
                    } else {
                        this.validarDatoMesChagasTot();
                    }
                }
            );
        },

        validarDatoMesChagasTot() {
            validarInputs(
                {
                    form: "#mes_chagas_tot",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoChagasTot();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_chagas_tot.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesChagasTot();
                    } else {
                        this.validarDatoDiaChagasTot();
                    }
                }
            );
        },

        validarDatoDiaChagasTot() {
            validarInputs(
                {
                    form: "#dia_chagas_tot",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesChagasTot();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_chagas_tot.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaChagasTot()
                    } else {
                        let fecha = this.params_4040.fecha_chagas_tot || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].fecha_chagas_tot_esq_w = fecha;

                        let fechaChagasTot = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaChagasTot > this.fecha_lnk || fechaChagasTot < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoChagasTot();
                        } else {
                            fechaChagasTot = fechaChagasTot.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaChagasTot);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultChagasTot();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_chagas_tot_esq_w[embarazo_temp].fecha_chagas_tot_esq_w = this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].fecha_chagas_tot_esq_w
                                this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].fecha_chagas_tot_esq_w = ''
                                this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].resultado_chagas_tot_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultChagasTot();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultChagasTot() {
            let result = this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].resultado_chagas_tot_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoChagasTot",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_chagas_tot_esq_w[this.sw_var.indiceEmbar].resultado_chagas_tot_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_chagas_tot${indice}`].value = data.text;
                    this.validarDatoAnoChagasSint();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoChagasSint() {
            validarInputs(
                {
                    form: "#ano_chagas_sint",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoChagasTot();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_chagas_sint_esq_w) {
                        this.formDetalles['4040'].tabla_chagas_sint_esq_w[i].fecha_chagas_sint_esq_w = '';
                        this.formDetalles['4040'].tabla_chagas_sint_esq_w[i].resultado_chagas_sint_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_chagas_sint.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_chagas_sint.mes = 1;
                        this.params_4040.fecha_chagas_sint.dia = 1;
                        let fecha = this.params_4040.fecha_chagas_sint || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].fecha_chagas_sint_esq_w = fecha;
                        this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].resultado_chagas_sint_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_chagas_sint1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_chagas_sint2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_chagas_sint3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoTsh();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoChagasSint();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoChagasSint();
                        } else {
                            this.params_4040.fecha_chagas_sint.anio = 0
                            this.params_4040.fecha_chagas_sint.mes = 0
                            this.params_4040.fecha_chagas_sint.dia = 0
                            this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].fecha_chagas_sint_esq_w = ''
                            this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].resultado_chagas_sint_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_chagas_sint1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_chagas_sint2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_chagas_sint3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoTsh()
                        }
                    } else {
                        this.validarDatoMesChagasSint();
                    }
                }
            );
        },

        validarDatoMesChagasSint() {
            validarInputs(
                {
                    form: "#mes_chagas_sint",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoChagasSint();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_chagas_sint.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesChagasSint();
                    } else {
                        this.validarDatoDiaChagasSint();
                    }
                }
            );
        },

        validarDatoDiaChagasSint() {
            validarInputs(
                {
                    form: "#dia_chagas_sint",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesChagasSint();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_chagas_sint.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaChagasSint()
                    } else {
                        let fecha = this.params_4040.fecha_chagas_sint || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].fecha_chagas_sint_esq_w = fecha;

                        let fechaChagasSint = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaChagasSint > this.fecha_lnk || fechaChagasSint < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoChagasSint();
                        } else {
                            fechaChagasSint = fechaChagasSint.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaChagasSint);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultChagasSint();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_chagas_sint_esq_w[embarazo_temp].fecha_chagas_sint_esq_w = this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].fecha_chagas_sint_esq_w
                                this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].fecha_chagas_sint_esq_w = ''
                                this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].resultado_chagas_sint_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultChagasSint();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultChagasSint() {
            let result = this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].resultado_chagas_sint_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoChagasSint",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_chagas_sint_esq_w[this.sw_var.indiceEmbar].resultado_chagas_sint_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_chagas_sint${indice}`].value = data.text;
                    this.validarDatoAnoTsh();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoTsh() {
            validarInputs(
                {
                    form: "#ano_tsh",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoChagasSint();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_tsh_esq_w) {
                        this.formDetalles['4040'].tabla_tsh_esq_w[i].fecha_tsh_esq_w = '';
                        this.formDetalles['4040'].tabla_tsh_esq_w[i].resultado_tsh_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_tsh.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_tsh.mes = 1;
                        this.params_4040.fecha_tsh.dia = 1;
                        let fecha = this.params_4040.fecha_tsh || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].fecha_tsh_esq_w = fecha;
                        this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].resultado_tsh_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_tsh1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_tsh2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_tsh3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoCitoloCerv();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoTsh();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoTsh();
                        } else {
                            this.params_4040.fecha_tsh.anio = 0
                            this.params_4040.fecha_tsh.mes = 0
                            this.params_4040.fecha_tsh.dia = 0
                            this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].fecha_tsh_esq_w = ''
                            this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].resultado_tsh_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_tsh1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_tsh2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_tsh3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoCitoloCerv()
                        }
                    } else {
                        this.validarDatoMesTsh();
                    }
                }
            );
        },

        validarDatoMesTsh() {
            validarInputs(
                {
                    form: "#mes_tsh",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoTsh();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_tsh.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesTsh();
                    } else {
                        this.validarDatoDiaTsh();
                    }
                }
            );
        },

        validarDatoDiaTsh() {
            validarInputs(
                {
                    form: "#dia_tsh",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesTsh();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_tsh.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaChagasSint()
                    } else {
                        let fecha = this.params_4040.fecha_tsh || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].fecha_tsh_esq_w = fecha;

                        let fechaTsh = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaTsh > this.fecha_lnk || fechaTsh < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoTsh();
                        } else {
                            fechaTsh = fechaTsh.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaTsh);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultTsh();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_tsh_esq_w[embarazo_temp].fecha_tsh_esq_w = this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].fecha_tsh_esq_w
                                this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].fecha_tsh_esq_w = ''
                                this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].resultado_tsh_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultTsh();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultTsh() {
            let result = this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].resultado_tsh_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoTsh",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_tsh_esq_w[this.sw_var.indiceEmbar].resultado_tsh_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_tsh${indice}`].value = data.text;
                    this.validarDatoAnoCitoloCerv();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoCitoloCerv() {
            validarInputs(
                {
                    form: "#ano_citolo_cerv",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoTsh();
                },
                () => {
                    for (i in this.formDetalles['4040'].tabla_citolo_cerv_esq_w) {
                        this.formDetalles['4040'].tabla_citolo_cerv_esq_w[i].fecha_citolo_cerv_esq_w = '';
                        this.formDetalles['4040'].tabla_citolo_cerv_esq_w[i].resultado_citolo_cerv_esq_w = '';
                    }

                    this.sw_var.indiceEmbar = parseInt(this.form.rips.embarazo) - 1;

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_citolo_cerv.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_citolo_cerv.mes = 1;
                        this.params_4040.fecha_citolo_cerv.dia = 1;
                        let fecha = this.params_4040.fecha_citolo_cerv || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].fecha_citolo_cerv_esq_w = fecha;
                        this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].resultado_citolo_cerv_esq_w = '3'
                        switch (this.sw_var.indiceEmbar) {
                            case 0: this.$refs.resultado_citolo_cerv1.value = 'Pendiente'; break;
                            case 1: this.$refs.resultado_citolo_cerv2.value = 'Pendiente'; break;
                            case 2: this.$refs.resultado_citolo_cerv3.value = 'Pendiente'; break;
                        }
                        this.validarDatoAnoHepatB();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoCitoloCerv();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoCitoloCerv();
                        } else {
                            this.params_4040.fecha_citolo_cerv.anio = 0
                            this.params_4040.fecha_citolo_cerv.mes = 0
                            this.params_4040.fecha_citolo_cerv.dia = 0
                            this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].fecha_citolo_cerv_esq_w = ''
                            this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].resultado_citolo_cerv_esq_w = '3'
                            switch (this.sw_var.indiceEmbar) {
                                case 0: this.$refs.resultado_citolo_cerv1.value = 'Pendiente'; break;
                                case 1: this.$refs.resultado_citolo_cerv2.value = 'Pendiente'; break;
                                case 2: this.$refs.resultado_citolo_cerv3.value = 'Pendiente'; break;
                            }
                            this.validarDatoAnoHepatB()
                        }
                    } else {
                        this.validarDatoMesCitoloCerv();
                    }
                }
            );
        },

        validarDatoMesCitoloCerv() {
            validarInputs(
                {
                    form: "#mes_citolo_cerv",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoCitoloCerv();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_citolo_cerv.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesCitoloCerv();
                    } else {
                        this.validarDatoDiaCitoloCerv();
                    }
                }
            );
        },

        validarDatoDiaCitoloCerv() {
            validarInputs(
                {
                    form: "#dia_citolo_cerv",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesCitoloCerv();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_citolo_cerv.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaCitoloCerv()
                    } else {
                        let fecha = this.params_4040.fecha_citolo_cerv || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].fecha_citolo_cerv_esq_w = fecha;

                        let fechaCitolCerv = parseFloat(fecha);
                        let fechaRegla = parseFloat(this.formDetalles['4040'].gineco_esq_w.fecha_regla_esq_w);

                        if (fechaCitolCerv > this.fecha_lnk || fechaCitolCerv < fechaRegla) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoCitoloCerv();
                        } else {
                            fechaCitolCerv = fechaCitolCerv.toString();
                            fechaRegla = fechaRegla.toString();

                            let nro_dias = SC_DIAS(fechaRegla, fechaCitolCerv);

                            let edad_gest_temp = nro_dias / 7;
                            let embarazo_temp;

                            if (edad_gest_temp < 13) {
                                embarazo_temp = "1";
                            } else if (edad_gest_temp < 26) {
                                embarazo_temp = "2";
                            } else {
                                embarazo_temp = "3";
                            }

                            if (this.form.rips.embarazo == embarazo_temp) {
                                this.validarDatoResultCitoloCerv();
                            } else {
                                embarazo_temp = parseFloat(embarazo_temp) - 1;

                                this.formDetalles['4040'].tabla_citolo_cerv_esq_w[embarazo_temp].fecha_citolo_cerv_esq_w = this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].fecha_citolo_cerv_esq_w
                                this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].fecha_citolo_cerv_esq_w = ''
                                this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].resultado_citolo_cerv_esq_w = ''
                                this.sw_var.indiceEmbar = embarazo_temp;

                                this.validarDatoResultCitoloCerv();
                            }
                        }
                    }
                }
            );
        },

        validarDatoResultCitoloCerv() {
            let result = this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].resultado_citolo_cerv_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoCitoloCerv",
                callback: (data) => {
                    this.formDetalles['4040'].tabla_citolo_cerv_esq_w[this.sw_var.indiceEmbar].resultado_citolo_cerv_esq_w = data.value

                    let indice = this.sw_var.indiceEmbar + 1
                    this.$refs[`resultado_citolo_cerv${indice}`].value = data.text;
                    this.validarDatoAnoHepatB();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoHepatB() {
            validarInputs(
                {
                    form: "#ano_hepatB",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoCitoloCerv();
                },
                () => {
                    this.formDetalles['4040'].hepatitis_b_esq_w.fecha_hepat_b_esq_w = '';
                    this.formDetalles['4040'].hepatitis_b_esq_w.resultado_hepat_b_esq_w = '';

                    let edad_gest = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;
                    let ano = parseFloat(this.params_4040.fecha_hepatB.anio) || 0;

                    if (nit_usu == 900004059 && ano == 1800) {
                        this.params_4040.fecha_hepatB.mes = 1;
                        this.params_4040.fecha_hepatB.dia = 1;
                        let fecha = this.params_4040.fecha_hepatB || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].hepatitis_b_esq_w.fecha_hepat_b_esq_w = fecha;
                        this.formDetalles['4040'].hepatitis_b_esq_w.resultado_hepat_b_esq_w = '3'
                        this.$refs.resultado_hepatB.value = 'Pendiente'
                        this.validarDatoAnoGineco();
                    } else if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoHepatB();
                    } else if (ano == 0) {
                        if (nit_usu == 900004059 && edad_gest >= 20) {
                            CON851("03", "03", null, "error", "error");
                            this.validarDatoAnoHepatB();
                        } else {
                            this.params_4040.fecha_hepatB.anio = 0
                            this.params_4040.fecha_hepatB.mes = 0
                            this.params_4040.fecha_hepatB.dia = 0
                            this.formDetalles['4040'].hepatitis_b_esq_w.fecha_hepat_b_esq_w = ''
                            this.formDetalles['4040'].hepatitis_b_esq_w.resultado_hepat_b_esq_w = '3'
                            this.$refs.resultado_hepatB.value = 'Pendiente'
                            this.validarDatoAnoGineco()
                        }
                    } else {
                        this.validarDatoMesHepatB();
                    }
                }
            );
        },

        validarDatoMesHepatB() {
            validarInputs(
                {
                    form: "#mes_hepatB",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoHepatB();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_hepatB.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesHepatB();
                    } else {
                        this.validarDatoDiaHepatB();
                    }
                }
            );
        },

        validarDatoDiaHepatB() {
            validarInputs(
                {
                    form: "#dia_hepatB",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesHepatB();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_hepatB.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaHepatB()
                    } else {
                        let fecha = this.params_4040.fecha_hepatB || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].hepatitis_b_esq_w.fecha_hepat_b_esq_w = fecha;

                        let fechaHepat = parseFloat(fecha);

                        if (fechaHepat > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoHepatB();
                        } else {
                            this.validarDatoResultHepatB();
                        }
                    }
                }
            );
        },

        validarDatoResultHepatB() {
            let result = this.formDetalles['4040'].hepatitis_b_esq_w.resultado_hepat_b_esq_w || 1

            let params = {
                titulo: "Resultado",
                array: "result_vih",
                seleccion: result,
                callback_esc: "validarDatoAnoHepatB",
                callback: (data) => {
                    this.formDetalles['4040'].hepatitis_b_esq_w.resultado_hepat_b_esq_w = data.value
                    this.$refs.resultado_hepatB.value = data.text;
                    this.validarDatoAnoGineco();
                }
            }
            this._hc828_2(params);
        },

        validarDatoAnoGineco() {
            validarInputs(
                {
                    form: "#ano_gineco",
                    orden: "1"
                },
                () => {
                    this.validarDatosVentanaTrimestral();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_gineco.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoGineco();
                    } else if (ano == 0 || ano == "") {
                        this.params_4040.fecha_gineco.anio = 0;
                        this.params_4040.fecha_gineco.mes = 0;
                        this.params_4040.fecha_gineco.dia = 0;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_gineco_esq_w = '';
                        this.validarDatoAnoOdonto();
                    } else {
                        this.validarDatoMesGineco();
                    }
                }
            );
        },

        validarDatoMesGineco() {
            validarInputs(
                {
                    form: "#mes_gineco",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoGineco();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_gineco.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesGineco();
                    } else {
                        this.validarDatoDiaGineco();
                    }
                }
            );
        },

        validarDatoDiaGineco() {
            validarInputs(
                {
                    form: "#dia_gineco",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesGineco();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_gineco.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaGineco()
                    } else {
                        let fecha = this.params_4040.fecha_gineco || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_gineco_esq_w = fecha;

                        let fechaGinec = parseFloat(fecha);

                        if (fechaGinec > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoGineco();
                        } else {
                            this.validarDatoAnoOdonto();
                        }
                    }
                }
            );
        },

        validarDatoAnoOdonto() {
            validarInputs(
                {
                    form: "#ano_odonto",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoGineco();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_odonto.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoOdonto();
                    } else if (ano == 0 || ano == "") {
                        this.params_4040.fecha_odonto.anio = 0;
                        this.params_4040.fecha_odonto.mes = 0;
                        this.params_4040.fecha_odonto.dia = 0;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_odonto_esq_w = '';
                        this.validarDatoAnoNutri();
                    } else {
                        this.validarDatoMesOdonto();
                    }
                }
            );
        },

        validarDatoMesOdonto() {
            validarInputs(
                {
                    form: "#mes_odonto",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoOdonto();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_odonto.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesOdonto();
                    } else {
                        this.validarDatoDiaOdonto();
                    }
                }
            );
        },

        validarDatoDiaOdonto() {
            validarInputs(
                {
                    form: "#dia_odonto",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesOdonto();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_odonto.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaOdonto()
                    } else {
                        let fecha = this.params_4040.fecha_odonto || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_odonto_esq_w = fecha;

                        let fechaOdont = parseFloat(fecha);

                        if (fechaOdont > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoOdonto();
                        } else {
                            this.validarDatoAnoNutri();
                        }
                    }
                }
            );
        },

        validarDatoAnoNutri() {
            validarInputs(
                {
                    form: "#ano_nutri",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoOdonto();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_nutri.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoNutri();
                    } else if (ano == 0 || ano == "") {
                        this.params_4040.fecha_nutri.anio = 0;
                        this.params_4040.fecha_nutri.mes = 0;
                        this.params_4040.fecha_nutri.dia = 0;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_nutri_esq_w = '';
                        this.validarDatoAnoPsicol();
                    } else {
                        this.validarDatoMesNutri();
                    }
                }
            );
        },

        validarDatoMesNutri() {
            validarInputs(
                {
                    form: "#mes_nutri",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoNutri();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_nutri.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesNutri();
                    } else {
                        this.validarDatoDiaNutri();
                    }
                }
            );
        },

        validarDatoDiaNutri() {
            validarInputs(
                {
                    form: "#dia_nutri",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesNutri();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_nutri.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaNutri()
                    } else {
                        let fecha = this.params_4040.fecha_nutri || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_nutri_esq_w = fecha;

                        let fechaNutri = parseFloat(fecha);

                        if (fechaNutri > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoNutri();
                        } else {
                            this.validarDatoAnoPsicol();
                        }
                    }
                }
            );
        },

        validarDatoAnoPsicol() {
            validarInputs(
                {
                    form: "#ano_psicol",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoNutri();
                },
                () => {
                    let ano = parseFloat(this.params_4040.fecha_psicol.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.validarDatoAnoPsicol();
                    } else if (ano == 0 || ano == "") {
                        this.params_4040.fecha_psicol.anio = 0;
                        this.params_4040.fecha_psicol.mes = 0;
                        this.params_4040.fecha_psicol.dia = 0;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_psicol_esq_w = '';
                        this._saltoPag4();
                    } else {
                        this.validarDatoMesPsicol();
                    }
                }
            );
        },

        validarDatoMesPsicol() {
            validarInputs(
                {
                    form: "#mes_psicol",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnoPsicol();
                },
                () => {
                    let mes = parseFloat(this.params_4040.fecha_psicol.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.validarDatoMesPsicol();
                    } else {
                        this.validarDatoDiaPsicol();
                    }
                }
            );
        },

        validarDatoDiaPsicol() {
            validarInputs(
                {
                    form: "#dia_psicol",
                    orden: "1"
                },
                () => {
                    this.validarDatoMesPsicol();
                },
                () => {
                    let dia = parseFloat(this.params_4040.fecha_psicol.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.validarDatoDiaPsicol()
                    } else {
                        let fecha = this.params_4040.fecha_psicol || {};
                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`;
                        this.formDetalles['4040'].fecha_interconsulta_esq_w.fecha_psicol_esq_w = fecha;

                        let fechaPsic = parseFloat(fecha);

                        if (fechaPsic > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.validarDatoAnoPsicol();
                        } else { this._saltoPag4(); }
                    }
                }
            );
        },

        _saltoPag4() {
            loader("show")
            this._guardarHistoria().then(() => {
                this._grabarDetalle_4040_pag4()
            }).catch((err) => {
                console.log(err)
                loader("hide")
                this.validarDatoDiaPsicol()
            });
        },

        _grabarDetalle_4040_pag4() {
            let _4040 = this.formDetalles["4040"];

            let detalles = {
                4040: _getObjetoSaveHc(_4040, filtroArray.tabla4040),
            };

            modular.grabarDetalles(detalles, this.form.llave)
                .then((res => {
                    loader("hide")
                    this._llenarDatosPag4E()
                }))
                .catch(err => {
                    console.log(err)
                    loader("hide")
                    this.validarDatoDiaPsicol()
                })
        },

        _llenarDatosPag4E() {
            this.$refs.edad.value = this.form.edad.unid_edad + this.form.edad.vlr_edad;
            let atiende = this.info.profesional.ATIENDE_PROF;

            if (this.form.serv == 8 && ["2", "6"].includes(atiende)) {
                this.validarDatoAbortHab();
            } else this.validarPeso();
        },

        validarDatoAbortHab() {
            validarInputs(
                {
                    form: "#infertilidad_aborto_esq",
                    orden: "1"
                },
                () => {
                    // this._llenarDatosPag4();
                    this.validarDatoAnoPsicol();
                },
                () => {
                    let infertilidad_aborto_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w || ""
                    infertilidad_aborto_esq_w = infertilidad_aborto_esq_w.toUpperCase();

                    if (["S", "N"].includes(infertilidad_aborto_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w = infertilidad_aborto_esq_w;
                        this.validarDatoRetePace();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoAbortHab();
                    }
                }
            );
        },

        validarDatoRetePace() {
            validarInputs(
                {
                    form: "#retencion_pacentaria_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoAbortHab();
                },
                () => {
                    let { gineco_esq_w } = this.formDetalles['4040']

                    let retencion_pacentaria_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w || ""
                    retencion_pacentaria_esq_w = retencion_pacentaria_esq_w.toUpperCase();

                    if (["S", "N"].includes(retencion_pacentaria_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w = retencion_pacentaria_esq_w;

                        let gemel = parseFloat(gineco_esq_w.gine_gemel_esq_w);
                        let cesarias = parseFloat(gineco_esq_w.cesareas_esq_w);

                        if (gemel > 0 || cesarias > 0) {
                            this.$refs.geme_cesa.value = "S";
                        } else {
                            this.$refs.geme_cesa.value = "N";
                        }
                        this.validarDatoHtaInducida();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoRetePace();
                    }
                }
            );
        },

        validarDatoHtaInducida() {
            validarInputs(
                {
                    form: "#hta_inducida_embar_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoRetePace();
                },
                () => {
                    let hta_inducida_embar_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w || ""
                    hta_inducida_embar_esq_w = hta_inducida_embar_esq_w.toUpperCase();

                    if (["S", "N"].includes(hta_inducida_embar_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w = hta_inducida_embar_esq_w;
                        this.validarDatoMortiMuerte();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoHtaInducida();
                    }
                }
            );
        },

        validarDatoMortiMuerte() {
            validarInputs(
                {
                    form: "#mortinato_muerte_neo_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoHtaInducida();
                },
                () => {
                    let mortinato_muerte_neo_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w || ""
                    mortinato_muerte_neo_esq_w = mortinato_muerte_neo_esq_w.toUpperCase();

                    if (["S", "N"].includes(mortinato_muerte_neo_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w = mortinato_muerte_neo_esq_w;
                        this.validarDatoDificilEsq();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoMortiMuerte();
                    }
                }
            );
        },

        validarDatoDificilEsq() {
            validarInputs(
                {
                    form: "#tp_dificil_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoMortiMuerte();
                },
                () => {
                    let tp_dificil_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.tp_dificil_esq_w || ""
                    tp_dificil_esq_w = tp_dificil_esq_w.toUpperCase();

                    if (["S", "N"].includes(tp_dificil_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.tp_dificil_esq_w = tp_dificil_esq_w;
                        this.validarDatoGinecoEct();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoDificilEsq();
                    }
                }
            );
        },

        validarDatoGinecoEct() {
            validarInputs(
                {
                    form: "#qx_gineco_ectopico_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoDificilEsq();
                },
                () => {
                    let qx_gineco_ectopico_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w || ""
                    qx_gineco_ectopico_esq_w = qx_gineco_ectopico_esq_w.toUpperCase();

                    if (["S", "N"].includes(qx_gineco_ectopico_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w = qx_gineco_ectopico_esq_w;
                        this.validarDatoRenalCro();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoGinecoEct();
                    }
                }
            );
        },

        validarDatoRenalCro() {
            validarInputs(
                {
                    form: "#enf_renal_cronica_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoGinecoEct();
                },
                () => {
                    let enf_renal_cronica_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w || ""
                    enf_renal_cronica_esq_w = enf_renal_cronica_esq_w.toUpperCase();

                    if (["S", "N"].includes(enf_renal_cronica_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w = enf_renal_cronica_esq_w;
                        this.validarDatoDiabGes();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoRenalCro();
                    }
                }
            );
        },

        validarDatoDiabGes() {
            validarInputs(
                {
                    form: "#diab_gestacional_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoRenalCro();
                },
                () => {
                    let diab_gestacional_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w || ""
                    diab_gestacional_esq_w = diab_gestacional_esq_w.toUpperCase();

                    if (["S", "N"].includes(diab_gestacional_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w = diab_gestacional_esq_w;
                        this.validarDatoDiabMelli();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoDiabGes();
                    }
                }
            );
        },

        validarDatoDiabMelli() {
            validarInputs(
                {
                    form: "#diab_mellitus_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoDiabGes();
                },
                () => {
                    let diab_mellitus_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w || ""
                    diab_mellitus_esq_w = diab_mellitus_esq_w.toUpperCase();

                    if (["S", "N"].includes(diab_mellitus_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w = diab_mellitus_esq_w;
                        this.validarDatoEnfCardiaca();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoDiabMelli();
                    }
                }
            );
        },

        validarDatoEnfCardiaca() {
            validarInputs(
                {
                    form: "#enf_cardiaca_esq_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoDiabMelli();
                },
                () => {
                    let enf_cardiaca_esq_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w || ""
                    enf_cardiaca_esq_esq_w = enf_cardiaca_esq_esq_w.toUpperCase();

                    if (["S", "N"].includes(enf_cardiaca_esq_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w = enf_cardiaca_esq_esq_w;
                        this.validarDatoInfecAgudas();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoEnfCardiaca();
                    }
                }
            );
        },

        validarDatoInfecAgudas() {
            validarInputs(
                {
                    form: "#enf_infec_agudas_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoEnfCardiaca();
                },
                () => {
                    let enf_infec_agudas_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w || ""
                    enf_infec_agudas_esq_w = enf_infec_agudas_esq_w.toUpperCase();

                    if (["S", "N"].includes(enf_infec_agudas_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w = enf_infec_agudas_esq_w;
                        this.validarDatoAutoinAgudas();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoInfecAgudas();
                    }
                }
            );
        },

        validarDatoAutoinAgudas() {
            validarInputs(
                {
                    form: "#enf_autoinmunes_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoInfecAgudas();
                },
                () => {
                    let enf_autoinmunes_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w || ""
                    enf_autoinmunes_esq_w = enf_autoinmunes_esq_w.toUpperCase();

                    if (["S", "N"].includes(enf_autoinmunes_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w = enf_autoinmunes_esq_w;
                        this.validarDatoAnemiaHb();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoAutoinAgudas();
                    }
                }
            );
        },

        validarDatoAnemiaHb() {
            validarInputs(
                {
                    form: "#anemia_hb_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoAutoinAgudas();
                },
                () => {
                    let anemia_hb_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.anemia_hb_esq_w || ""
                    anemia_hb_esq_w = anemia_hb_esq_w.toUpperCase();

                    if (["S", "N"].includes(anemia_hb_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.anemia_hb_esq_w = anemia_hb_esq_w;
                        this.validarDatoHemorraMen();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoAnemiaHb();
                    }
                }
            );
        },

        validarDatoHemorraMen() {
            validarInputs(
                {
                    form: "#hemorragia_men_20_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoAnemiaHb();
                },
                () => {
                    let hemorragia_men_20_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w || ""
                    hemorragia_men_20_esq_w = hemorragia_men_20_esq_w.toUpperCase();

                    if (["S", "N"].includes(hemorragia_men_20_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w = hemorragia_men_20_esq_w;
                        this.validarDatoHemorraMay();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoHemorraMen();
                    }
                }
            );
        },

        validarDatoHemorraMay() {
            validarInputs(
                {
                    form: "#hemorragia_may_20_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoHemorraMen();
                },
                () => {
                    let hemorragia_may_20_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w || ""
                    hemorragia_may_20_esq_w = hemorragia_may_20_esq_w.toUpperCase();

                    if (["S", "N"].includes(hemorragia_may_20_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w = hemorragia_may_20_esq_w;
                        this.validarDatoEmbProlong();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoHemorraMay();
                    }
                }
            );
        },

        validarDatoEmbProlong() {
            validarInputs(
                {
                    form: "#emb_prolongado_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoHemorraMay();
                },
                () => {
                    let emb_prolongado_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w || ""
                    emb_prolongado_esq_w = emb_prolongado_esq_w.toUpperCase();

                    if (["S", "N"].includes(emb_prolongado_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w = emb_prolongado_esq_w;
                        this.validarDatoHtaEsq();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoEmbProlong();
                    }
                }
            );
        },

        validarDatoHtaEsq() {
            validarInputs(
                {
                    form: "#hta_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoEmbProlong();
                },
                () => {
                    let hta_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hta_esq_w || ""
                    hta_esq_w = hta_esq_w.toUpperCase();

                    if (["S", "N"].includes(hta_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hta_esq_w = hta_esq_w;
                        this.validarDatoRpmEsq();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoHtaEsq();
                    }
                }
            );
        },

        validarDatoRpmEsq() {
            validarInputs(
                {
                    form: "#rpm_esq_w",
                    orden: "1"
                },
                () => {
                    this.validarDatoHtaEsq();
                },
                () => {
                    let rpm_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.rpm_esq_w || ""
                    rpm_esq_w = rpm_esq_w.toUpperCase();

                    if (["S", "N"].includes(rpm_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.rpm_esq_w = rpm_esq_w;
                        this.validarDatoPolihidramEsq();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoRpmEsq();
                    }
                }
            );
        },

        validarDatoPolihidramEsq() {
            validarInputs(
                {
                    form: "#polihidram_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoRpmEsq();
                },
                () => {
                    let polihidram_esq_w = this.formDetalles['4040'].obstetric_esq_w.polihidram_esq_w || ""
                    polihidram_esq_w = polihidram_esq_w.toUpperCase();

                    if (["S", "N"].includes(polihidram_esq_w)) {
                        this.formDetalles['4040'].obstetric_esq_w.polihidram_esq_w = polihidram_esq_w;
                        this.validarDatoRciuEsq();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoPolihidramEsq();
                    }
                }
            );
        },

        validarDatoRciuEsq() {
            validarInputs(
                {
                    form: "#rciu_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoPolihidramEsq();
                },
                () => {
                    let rciu_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.rciu_esq_w || ""
                    rciu_esq_w = rciu_esq_w.toUpperCase();

                    if (["S", "N"].includes(rciu_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.rciu_esq_w = rciu_esq_w;
                        this.validarDatoEmbMultiple();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoRciuEsq();
                    }
                }
            );
        },

        validarDatoEmbMultiple() {
            validarInputs(
                {
                    form: "#emb_multiple_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoRciuEsq();
                },
                () => {
                    let emb_multiple_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.emb_multiple_esq_w || ""
                    emb_multiple_esq_w = emb_multiple_esq_w.toUpperCase();

                    if (["S", "N"].includes(emb_multiple_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.emb_multiple_esq_w = emb_multiple_esq_w;
                        this.validarDatoMalaPrese();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoEmbMultiple();
                    }
                }
            );
        },

        validarDatoMalaPrese() {
            validarInputs(
                {
                    form: "#mala_presenta_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoEmbMultiple();
                },
                () => {
                    let mala_presenta_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.mala_presenta_esq_w || ""
                    mala_presenta_esq_w = mala_presenta_esq_w.toUpperCase();

                    if (["S", "N"].includes(mala_presenta_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.mala_presenta_esq_w = mala_presenta_esq_w;
                        this.validarDatoInsinmRh();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoMalaPrese();
                    }
                }
            );
        },

        validarDatoInsinmRh() {
            validarInputs(
                {
                    form: "#isoinm_rh_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoMalaPrese();
                },
                () => {
                    let isoinm_rh_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w || ""
                    isoinm_rh_esq_w = isoinm_rh_esq_w.toUpperCase();

                    if (["S", "N"].includes(isoinm_rh_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w = isoinm_rh_esq_w;
                        this.validarDatoTensionEmocional();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoInsinmRh();
                    }
                }
            );
        },

        validarDatoTensionEmocional() {
            validarInputs(
                {
                    form: "#tension_emocional_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoInsinmRh();
                },
                () => {
                    let tension_emocional_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.tension_emocional_esq_w || ""
                    tension_emocional_esq_w = tension_emocional_esq_w.toUpperCase();

                    if (["S", "N"].includes(tension_emocional_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.tension_emocional_esq_w = tension_emocional_esq_w;
                        this.validarDatoHumorDespresivo();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoTensionEmocional();
                    }
                }
            );
        },

        validarDatoHumorDespresivo() {
            validarInputs(
                {
                    form: "#humor_depresivo_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoTensionEmocional();
                },
                () => {
                    let humor_depresivo_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w || ""
                    humor_depresivo_esq_w = humor_depresivo_esq_w.toUpperCase();

                    if (["S", "N"].includes(humor_depresivo_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w = humor_depresivo_esq_w;
                        this.validarDatoSintoNeurovege();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoHumorDespresivo();
                    }
                }
            );
        },

        validarDatoSintoNeurovege() {
            validarInputs(
                {
                    form: "#sinto_neurovegeta_esq",
                    orden: "1"
                },
                () => {
                    this.validarDatoHumorDespresivo();
                },
                () => {
                    let sinto_neurovegeta_esq_w = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w || ""
                    sinto_neurovegeta_esq_w = sinto_neurovegeta_esq_w.toUpperCase();

                    if (["S", "N"].includes(sinto_neurovegeta_esq_w)) {
                        this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w = sinto_neurovegeta_esq_w;
                        this.validarDatoTiempoFami();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.validarDatoSintoNeurovege();
                    }
                }
            );
        },

        validarDatoTiempoFami() {
            let select = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_tiempo_esq_w || 1

            let params = {
                titulo: "Soporte familiar",
                array: "soporte_fam",
                seleccion: select,
                callback_esc: "validarDatoSintoNeurovege",
                callback: (data) => {
                    this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_tiempo_esq_w = data.value
                    this.$refs.tiempo_esq.value = data.text;
                    this.validarDatoEspacioFami();
                }
            }
            this._hc828_2(params);
        },

        validarDatoEspacioFami() {
            let select = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_espacio_esq_w || 1

            let params = {
                titulo: "Soporte familiar",
                array: "soporte_fam",
                seleccion: select,
                callback_esc: "validarDatoTiempoFami",
                callback: (data) => {
                    this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_espacio_esq_w = data.value
                    this.$refs.espacio.value = data.text;
                    this.validarDatoDineroFami();
                }
            }
            this._hc828_2(params);
        },

        validarDatoDineroFami() {
            let select = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_dienro_esq_w || 1

            let params = {
                titulo: "Soporte familiar",
                array: "soporte_fam",
                seleccion: select,
                callback_esc: "validarDatoEspacioFami",
                callback: (data) => {
                    this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_dienro_esq_w = data.value
                    this.$refs.dinero.value = data.text;
                    this.validarDatoTotalRiesgo();
                }
            }
            this._hc828_2(params);
        },

        validarDatoTotalRiesgo() {
            _fin_validar_form();
            this.params_total.modal = true;
            this.parte1Total();
        },

        async parte1Total() {
            let dato_w;
            let subtotal1_w = 0;
            let subtotal2_w = 0;
            let subtotal3_w = 0;
            let subtotal4_w = 0;

            let unidadEdad = this.form.edad.unid_edad;
            let vlrEdad = this.form.edad.vlr_edad;

            if (unidadEdad == "A") {
                if (vlrEdad < 16) {
                    dato_w = 1;
                } else {
                    if (vlrEdad >= 16 && vlrEdad <= 35) {
                        dato_w = 0;
                    } else {
                        dato_w = 2;
                    }
                }
            } else {
                dato_w = 1;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var gest = parseInt(this.formDetalles['4040'].gineco_esq_w.gestaciones_esq_w);

            if (gest == 0) {
                dato_w = 1;
            } else {
                if (gest >= 1 || gest <= 4) {
                    dato_w = 0;
                } else {
                    dato_w = 2;
                }
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var inferAbort = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w;

            if (inferAbort == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var retenPace = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.retencion_pacentaria_esq_w;

            if (retenPace == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            // si tiene hijos con peso > 4000g

            var gine40 = parseInt(this.formDetalles['4040'].gineco_esq_w.gine_40_esq_w);

            if (gine40 > 0) {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var gine25 = parseInt(this.formDetalles['4040'].gineco_esq_w.gine_25_esq_w);

            if (gine25 > 0) {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var htaIndu =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hta_inducida_embar_esq_w;

            if (htaIndu == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var gemel = parseInt(this.formDetalles['4040'].gineco_esq_w.gine_gemel_esq_w);
            var cesarias = parseInt(this.formDetalles['4040'].gineco_esq_w.cesareas_esq_w);

            if (gemel > 0 || cesarias > 0) {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var mortMuerte =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.mortinato_muerte_neo_esq_w;

            if (mortMuerte == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            var tpDificil =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.tp_dificil_esq_w;

            if (tpDificil == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal1_w = parseInt(dato_w) + parseInt(subtotal1_w);

            // parte 2

            var qxGine =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.qx_gineco_ectopico_esq_w;

            if (qxGine == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            var enfCron =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_renal_cronica_esq_w;

            if (enfCron == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            var diabGest =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.diab_gestacional_esq_w;

            if (diabGest == "S") {
                dato_w = 2;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            var diabMell =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.diab_mellitus_esq_w;

            if (diabMell == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            var enfCard =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_cardiaca_esq_esq_w;

            if (enfCard == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            var enfAgud =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_infec_agudas_esq_w;

            if (enfAgud == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            var enfAuto =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.enf_autoinmunes_esq_w;

            if (enfAuto == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            var anemiaHb =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.anemia_hb_esq_w;

            if (anemiaHb == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal2_w = parseInt(dato_w) + parseInt(subtotal2_w);

            // parte 3

            var hemoMen20 =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hemorragia_men_20_esq_w;

            if (hemoMen20 == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var hemoMay20 =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hemorragia_may_20_esq_w;

            if (hemoMay20 == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var embProlon =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.emb_prolongado_esq_w;

            if (embProlon == "S") {
                dato_w = 1;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var hta = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.hta_esq_w;

            if (hta == "S") {
                dato_w = 2;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var rpm = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.rpm_esq_w;

            if (rpm == "S") {
                dato_w = 2;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var polihi = this.formDetalles['4040'].obstetric_esq_w.polihidram_esq_w;

            if (polihi == "S") {
                dato_w = 2;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var rciu = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.rciu_esq_w;

            if (rciu == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var embMulti =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.emb_multiple_esq_w;

            if (embMulti == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var malaPresen =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.mala_presenta_esq_w;

            if (malaPresen == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            var insoinm = this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.isoinm_rh_esq_w;

            if (insoinm == "S") {
                dato_w = 3;
            } else {
                dato_w = 0;
            }
            subtotal3_w = parseInt(dato_w) + parseInt(subtotal3_w);

            // parte 4

            var texto;
            var texto2;
            dato_w = "";

            var tensionEmo =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.tension_emocional_esq_w;

            if (tensionEmo == "S") {
                texto = "INTENSO";
                dato_w = parseInt(dato_w) + 1;
            } else {
                texto = "AUSENTE";
            }

            var humorDepre =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.humor_depresivo_esq_w;

            if (humorDepre == "S") {
                texto = "INTENSO";
                dato_w = parseInt(dato_w) + 1;
            } else {
                texto = "AUSENTE";
            }

            var sintoNeuro =
                this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.sinto_neurovegeta_esq_w;

            if (sintoNeuro == "S") {
                texto = "INTENSO";
                dato_w = parseInt(dato_w) + 1;
            } else {
                texto = "AUSENTE";
            }

            if (dato_w >= 2) {
                dato_w = 1;
                subtotal4_w = parseInt(subtotal4_w) + 1;
            } else {
                dato_w = "";
            }

            switch (
            this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_tiempo_esq_w
            ) {
                case "1":
                    texto2 = "CASI SIEMPRE";
                    break;
                case "2":
                    texto2 = "A VECES";
                    break;
                case "3":
                    texto2 = "NUNCA";
                    dato_w = parseInt(dato_w) + 1;
                    break;
                default:
                    texto2 = "";
                    break;
            }

            switch (
            this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_espacio_esq_w
            ) {
                case "1":
                    texto2 = "CASI SIEMPRE";
                    break;
                case "2":
                    texto2 = "A VECES";
                    break;
                case "3":
                    texto2 = "NUNCA";
                    dato_w = parseInt(dato_w) + 1;
                    break;
                default:
                    texto2 = "";
                    break;
            }

            switch (
            this.formDetalles['4040'].riesgo_biopsicosocial_esq_w.soporte_fami_dienro_esq_w
            ) {
                case "1":
                    texto2 = "CASI SIEMPRE";
                    break;
                case "2":
                    texto2 = "A VECES";
                    break;
                case "3":
                    texto2 = "NUNCA";
                    dato_w = parseInt(dato_w) + 1;
                    break;
                default:
                    texto2 = "";
                    break;
            }

            if (dato_w >= 2) {
                dato_w = 1;
                subtotal4_w = parseInt(subtotal4_w) + 1;
            } else {
                dato_w = 0;
            }

            // parte final

            var total_w =
                parseInt(subtotal1_w) +
                parseInt(subtotal2_w) +
                parseInt(subtotal3_w) +
                parseInt(subtotal4_w);

            this.params_total.subtotal1 = subtotal1_w;
            this.params_total.subtotal2 = subtotal2_w;
            this.params_total.subtotal3 = subtotal3_w;
            this.params_total.subtotal4 = subtotal4_w;
            this.params_total.total = total_w;
        },

        _AceptarVentanaTotal() {
            this.params_total.modal = false;
            this._saltoPag4e();
        },

        _saltoPag4e() {
            loader("show")
            this._guardarHistoria().then(() => {
                this._grabarDetalle_4040_pag4e()
            }).catch((err) => {
                loader("hide")
                this.validarDatoDineroFami()
            });
        },

        _grabarDetalle_4040_pag4e() {
            let _4040 = this.formDetalles["4040"];

            let detalles = {
                4040: _getObjetoSaveHc(_4040, filtroArray.tabla4040),
            };

            modular.grabarDetalles(detalles, this.form.llave)
                .then((res => {
                    loader("hide")
                    this.validarPeso()
                }))
                .catch(err => {
                    loader("hide")
                    this.validarDatoDineroFami()
                })
        },

        validarPeso() {
            validarInputs(
                {
                    form: "#fase_peso",
                    orden: "1",
                },
                () => {
                    if (this.info.paciente.SEXO == "M") {
                        this._validarSAgo();
                    } else {
                        this._validarSGine();
                    }
                },
                () => {
                    this
                        ._onValidarPeso()
                        .then((data) => {
                            this.form.signos.peso = this.formatNumero(data);
                            this.validarTalla();
                        })
                        .catch((err) => {
                            this.form.signos.peso = "";
                            this.validarPeso();
                        });
                }
            );
        },

        _onValidarPeso() {
            let codigo = false,
                retorno = true,
                unidad = parseFloat(this.form.signos.und_peso) || 1,
                peso = parseFloat(this.form.signos.peso) || 0,
                consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
                    e == this.info.profesional.ATIENDE_PROF;
                });

            peso = peso == 0 ? 1 : peso;

            return new Promise((resolve, reject) => {
                if (unidad == 1 && peso < 2.5) {
                    retorno = false;
                    codigo = "03";
                }

                if (
                    this.info.usuar.NIT == 800037021 &&
                    this.info.profesional.ATIENDE_PROF == 1 &&
                    peso == 0
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (!consult_atiende) {
                    if (peso == 0 && this.form.serv > 01) {
                        retorno = false;
                        codigo = "02";
                    }
                }

                if (!retorno) {
                    plantillaError(codigo, codigo, "HC-01", () => {
                        reject();
                    });
                } else {
                    if (codigo) {
                        plantillaToast("", codigo, null, "warning", "");
                    }
                    resolve(peso.toString());
                }
            });
        },

        validarTalla() {
            validarInputs(
                {
                    form: "#fase_talla",
                    orden: "1",
                },
                () => { this.validarPeso() },
                () => {
                    var peso = this.form.signos.peso;
                    var talla = this.formatNumero(this.form.signos.talla);

                    if (talla == 0 && peso > 0) {
                        plantillaError("02", "02", "HC-01", () => {
                            this.form.signos.talla = "";
                            this.validarTalla();
                        });
                    } else if (talla > 230) {
                        plantillaError("03", "03", "HC-01", () => {
                            this.form.signos.talla = "";
                            this.validarTalla();
                        });
                    } else {
                        this.form.signos.talla = talla;
                        this._calcularindices();
                    }
                }
            );
        },
        _calcularindices() {
            var peso = this.form.signos.peso,
                talla = this.form.signos.talla,
                imc = 0,
                sup_cop = 0,
                resultado = 0,
                resultadop = 0;

            if (!peso == 0 || !talla == 0) {
                resultado = parseInt(talla) / 100;
                resultadop = Math.pow(resultado, 2);

                imc = parseInt(peso) / resultadop;
                this.form.signos.imc_corp = this.formatNumero(imc);

                sup_cop = (parseInt(peso) + parseInt(talla) - 60) / 100;
                this.form.signos.sup_corp = this.formatNumero(sup_cop);

                if (imc >= 30) {
                    plantillaToast("", "BC", null, "warning", "");
                } else if (imc >= 25) {
                    plantillaToast("", "BB", null, "warning", "");
                } else if (imc < 18.5) {
                    plantillaToast("", "H2", null, "warning", "");
                } else if (imc < 25) {
                    plantillaToast("", "H1", null, "success", "");
                }
                this.validarTemp();
            }
        },

        validarTemp() {
            validarInputs(
                {
                    form: "#fase_temp",
                    orden: "1",
                },
                () => { this.validarTalla() },
                () => {
                    this._onValidarTemp()
                        .then((data) => {
                            this.form.signos.temp = this.formatNumero(data);
                            this.validarFcard();
                        })
                        .catch((err) => {
                            this.form.signos.temp = "";
                            this.validarTemp();
                        });
                }
            );
        },
        _onValidarTemp() {
            let retorno = true,
                codigo = false,
                temp = parseFloat(this.form.signos.temp) || 0,
                peso = parseFloat(this.form.signos.peso) || 0,
                consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
                    e == this.info.profesional.ATIENDE_PROF;
                });

            return new Promise((resolve, reject) => {
                if (this.form.serv > 02 && temp == 0) {
                    retorno = false;
                    codigo = "02";
                }

                if (
                    this.info.usuar.NIT == 800037021 &&
                    this.info.profesional.ATIENDE_PROF == 1 &&
                    temp == 0
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (
                    temp == 0 &&
                    this.form.serv == 02 &&
                    this.info.usuar.NIT == 800037021
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (!consult_atiende) {
                    if (temp == 0 && peso > 0) {
                        retorno = false;
                        codigo = "02";
                    }
                }

                if ((temp > 0 && temp < 35.5) || temp > 38) {
                    codigo = "BM";
                }

                if (temp > 45) {
                    retorno = false;
                    codigo = "03";
                }

                if (!retorno) {
                    plantillaError(codigo, codigo, "HC-01", () => {
                        reject();
                    });
                } else {
                    if (codigo) {
                        plantillaToast("", codigo, null, "warning", "");
                    }
                    resolve(temp.toString());
                }
            });
        },

        validarFcard() {
            validarInputs(
                {
                    form: "#fase_fcard",
                    orden: "1",
                },
                () => { this.validarTemp() },
                () => {
                    this._onValidarFcard()
                        .then((data) => {
                            this.form.signos.fcard = data;
                            this.validarFresp();
                        })
                        .catch((err) => {
                            this.form.signos.fcard = "";
                            this.validarFcard();
                        });
                }
            );
        },

        _onValidarFcard() {
            let retorno = true,
                codigo = false,
                edad = calcular_edad(this.info.paciente.NACIM),
                peso = parseFloat(this.form.signos.peso) || 0,
                fcard = parseFloat(this.form.signos.fcard) || 0,
                consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
                    e == this.info.profesional.ATIENDE_PROF;
                });

            return new Promise((resolve, reject) => {
                if (
                    fcard == 0 &&
                    this.form.serv == 02 &&
                    this.info.usuar.NIT == 800037021
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (
                    this.info.usuar.NIT == 800037021 &&
                    this.info.profesional.ATIENDE_PROF == 1 &&
                    fcard == 0
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (!consult_atiende) {
                    if (fcard == 0 && peso > 0) {
                        retorno = false;
                        codigo = "02";
                    }
                }

                switch (edad.unid_edad) {
                    case "D":
                        if (fcard < 100 || fcard > 150) {
                            codigo = "BK";
                        }
                        break;
                    case "M":
                        if (fcard < 80 || fcard > 120) {
                            codigo = "BK";
                        }
                        break;
                    case "A":
                        if (edad.vlr_edad > 10) {
                            if (fcard < 60 || fcard > 100) {
                                codigo = "BK";
                            }
                        } else {
                            if (fcard < 70 || fcard > 120) {
                                codigo = "BK";
                            }
                        }
                        break;
                }

                if (fcard > 200) {
                    retorno = false;
                    codigo = "03";
                }

                if (!retorno) {
                    plantillaError(codigo, codigo, "HC-01", () => {
                        reject();
                    });
                } else {
                    if (codigo) {
                        plantillaToast("", codigo, null, "warning", "");
                    }
                    resolve(fcard.toString());
                }
            });
        },
        validarFresp() {
            validarInputs(
                {
                    form: "#fase_resp",
                    orden: "1",
                },
                () => { this.validarFcard() },
                () => {
                    this._onValidarFResp()
                        .then((data) => {
                            this.form.signos.fresp = data;
                            this.validarTens1();
                        })
                        .catch((err) => {
                            this.form.signos.fresp = "";
                            this.validarFresp();
                        });
                }
            );
        },

        _onValidarFResp() {
            let retorno = true,
                codigo = false,
                edad = calcular_edad(this.info.paciente.NACIM),
                peso = parseFloat(this.form.signos.peso) || 0,
                fresp = parseFloat(this.form.signos.fresp) || 0,
                consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
                    e == this.info.profesional.ATIENDE_PROF;
                });

            return new Promise((resolve, reject) => {
                if (
                    fresp == 0 &&
                    this.form.serv == 02 &&
                    this.info.usuar.NIT == 800037021
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (
                    this.info.usuar.NIT == 800037021 &&
                    this.info.profesional.ATIENDE_PROF == 1 &&
                    fresp == 0
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (!consult_atiende) {
                    if (fresp == 0 && peso > 0) {
                        retorno = false;
                        codigo = "02";
                    }
                }

                switch (edad.unid_edad) {
                    case "D":
                        if (fresp < 30 || fresp > 80) {
                            codigo = "BL";
                        }
                        break;
                    case "M":
                        if (fresp < 20 || fresp > 40) {
                            codigo = "BL";
                        }
                        break;
                    case "A":
                        if (edad.vlr_edad > 8) {
                            if (fresp < 15 || fresp > 20) {
                                codigo = "BL";
                            }
                        } else {
                            if (fresp < 20 || fresp > 30) {
                                codigo = "BL";
                            }
                        }
                        break;
                }

                if (fresp > 100) {
                    retorno = false;
                    codigo = "03";
                }

                if (!retorno) {
                    plantillaError(codigo, codigo, "HC-01", () => {
                        reject();
                    });
                } else {
                    if (codigo) {
                        plantillaToast("", codigo, null, "warning", "");
                    }
                    resolve(fresp.toString());
                }
            });
        },

        validarTens1() {
            validarInputs(
                {
                    form: "#fase_tens1",
                    orden: "1",
                },
                () => { this.validarFresp() },
                () => {
                    this._onValidarTens1()
                        .then((data) => {
                            this.form.signos.tens1 = data;
                            this.validarTens2();
                        })
                        .catch((err) => {
                            this.form.signos.tens1 = "";
                            this.validarTens1();
                        });
                }
            );
        },

        _onValidarTens1() {
            let retorno = true,
                codigo = false,
                peso = parseFloat(this.form.signos.peso) || 0,
                tens1 = parseFloat(this.form.signos.tens1) || 0,
                consult_atiende = ["1", "5", "7", "8", "A", "H", "I", "O"].find((e) => {
                    e == this.info.profesional.ATIENDE_PROF;
                });

            return new Promise((resolve, reject) => {
                if (
                    tens1 == 0 &&
                    this.form.serv == 02 &&
                    this.info.usuar.NIT == 800037021
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (
                    this.info.usuar.NIT == 800037021 &&
                    this.info.profesional.ATIENDE_PROF == 1 &&
                    tens1 == 0
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (!consult_atiende) {
                    if (tens1 == 0 && peso > 0) {
                        retorno = false;
                        codigo = "02";
                    }
                }

                if (tens1 > 300) {
                    retorno = false;
                    codigo = "03";
                }

                if (!retorno) {
                    plantillaError(codigo, codigo, "HC-01", () => {
                        reject();
                    });
                } else {
                    if (codigo) {
                        plantillaToast("", codigo, null, "warning", "");
                    }
                    resolve(tens1.toString());
                }
            });
        },

        validarTens2() {
            validarInputs(
                {
                    form: "#fase_tens2",
                    orden: "1",
                },
                () => { this.validarTens1() },
                () => {
                    this._onValidarTens2()
                        .then((data) => {
                            this.form.signos.tens2 = data;
                            this.validarPvc();
                        })
                        .catch((err) => {
                            this.form.signos.tens2 = "";
                            this.validarTens2();
                        });
                }
            );
        },

        _onValidarTens2() {
            let retorno = true,
                codigo = false,
                tens1 = parseFloat(this.form.signos.tens1) || 0,
                tens2 = parseFloat(this.form.signos.tens2) || 0;

            return new Promise((resolve, reject) => {
                if (tens1 > 0 && tens2 == 0) {
                    retorno = false;
                    codigo = "02";
                }

                if (
                    this.info.usuar.NIT == 800037021 &&
                    this.info.profesional.ATIENDE_PROF == 1 &&
                    tens2 == 0
                ) {
                    retorno = false;
                    codigo = "02";
                }

                if (tens2 > 300) {
                    retorno = false;
                    codigo = "03";
                }

                if (!retorno) {
                    plantillaError(codigo, codigo, "HC-01", () => {
                        reject();
                    });
                } else {
                    if (codigo) {
                        plantillaToast("", codigo, null, "warning", "");
                    }
                    let tens_media = (parseInt(tens1) + parseInt(tens2) * 2) / 3;
                    this.form.signos.tens_media = this.formatNumero(tens_media);
                    resolve(tens2.toString());
                }
            });
        },

        validarPvc() {
            validarInputs(
                {
                    form: "#fase_pvc",
                    orden: "1",
                },
                () => { this.validarTens2() },
                () => {
                    const intersection = this.info.profesional.TAB_ESPEC.find((e) =>
                        ["521", "522"].includes(e.COD)
                    );

                    if (intersection) { this.validarExamenHc(); }
                    else this._validarResOcular();
                }
            );
        },
        _validarResOcular() {
            let seleccion = this.form.signos.aper_ocul || 4;

            if (seleccion == '' || seleccion == 0) {
                seleccion = 4
            }

            POPUP(
                {
                    array: modular.arrays.resp_ocular,
                    titulo: "Respuesta ocular",
                    indices: [{ id: "value", label: "text" }],
                    seleccion,
                    callback_f: () => { this.validarPvc() },
                },
                (data) => {
                    this.form.signos.aper_ocul = data.value;
                    this._validarRespVerbal();
                }
            );
        },
        _validarRespVerbal() {
            let seleccion = this.form.signos.resp_verb || 5;

            if (seleccion == '' || seleccion == 0) {
                seleccion = 5
            }

            POPUP(
                {
                    array: modular.arrays.resp_verbal,
                    titulo: "Respuesta verbal",
                    indices: [{ id: "value", label: "text" }],
                    seleccion,
                    callback_f: () => { this._validarResOcular() },
                },
                (data) => {
                    this.form.signos.resp_verb = data.value;
                    this._validarRespMotora();
                }
            );
        },

        _validarRespMotora() {
            let seleccion = this.form.signos.resp_moto || 6

            if (seleccion == '' || seleccion == 0) {
                seleccion = 6
            }

            POPUP(
                {
                    array: modular.arrays.resp_moto,
                    titulo: "Respuesta motora",
                    indices: [{ id: "value", label: "text" }],
                    seleccion,
                    callback_f: () => { this._validarRespVerbal() },
                },
                (data) => {
                    this.form.signos.resp_moto = data.value;
                    this._validarPerTor();
                }
            );
        },

        _calcularIndiceGlasgow() {
            let ocular = this.form.signos.aper_ocul || 0;
            let verbal = this.form.signos.resp_verb || 0;
            let motora = this.form.signos.resp_moto || 0;

            var glasg = parseFloat(ocular) + parseFloat(verbal) + parseFloat(motora);
            this.form.signos.vlr_glasg = `${glasg} / 15`;
        },

        _validarPerTor() {
            validarInputs(
                {
                    form: "#fase_per_tor",
                    orden: "1",
                },
                () => { this.validarPvc() },
                () => { this._validarPerAbdo() }
            );
        },
        _validarPerAbdo() {
            validarInputs(
                {
                    form: "#fase_per_abdo",
                    orden: "1",
                },
                () => { this._validarPerTor() },
                () => {
                    let serv = this.form.serv;

                    if (serv == 01) {
                        this._validarOximetria();
                    } else {
                        let abdo = this.form.signos.per_abdo;

                        if (abdo == 0 || abdo > 300) {
                            plantillaToast("03", "03", null, "warning", "");
                            this.form.signos.per_abdo = "";
                            this._validarPerAbdo();
                        } else this._validarOximetria();
                    }
                }
            );
        },
        _validarOximetria() {
            validarInputs(
                {
                    form: "#fase_oximetria",
                    orden: "1",
                },
                () => { this._validarPerAbdo() },
                () => {
                    let oximetria = parseFloat(this.form.signos.oximetria) || 0;

                    if (oximetria > 100) {
                        plantillaError("03", "03", "HC-01", () => {
                            this.form.signos.oximetria = "";
                            this._validarOximetria();
                        });
                    } else {
                        if (
                            this.form.edad.unid_edad == "A" &&
                            this.form.edad.vlr_edad > 5
                        ) {
                            this._validarPerBraquial();
                        } else this._validarPerCefalico();
                    }
                }
            );
        },
        _validarPerCefalico() {
            validarInputs(
                {
                    form: "#fase_per_cefalico",
                    orden: "1",
                },
                () => { this._validarOximetria() },
                () => { this._validarPerBraquial() },

            );
        },
        _validarPerBraquial() {
            validarInputs(
                {
                    form: "#fase_per_braquial",
                    orden: "1",
                },
                () => {
                    if (
                        this.form.edad.unid_edad == "A" &&
                        this.form.edad.vlr_edad > 5
                    ) {
                        this._validarOximetria();
                    } else this._validarPerCefalico();
                },
                () => { this._validarPerMuñeca() }
            );
        },
        _validarPerMuñeca() {
            validarInputs(
                {
                    form: "#fase_per_muneca",
                    orden: "1",
                },
                () => { this._validarPerBraquial() },
                () => {
                    let per_mune = parseFloat(this.form.signos.per_mune) || 0;

                    // if (per_mune == 0 && this.info.usuar.NIT == 830511298) {
                    //     CON851("02", "02", null, "error", "error");
                    //     this._validarPerMuñeca()
                    // } else this.preguntarGraficas()

                    if (per_mune == 0 && this.info.usuar.NIT == 830511298) {
                        CON851("02", "02", null, "error", "error");
                        this._validarPerMuñeca()
                    } else {
                        if (this.info.paciente.SEXO == "M") {
                            this.preguntarGraficas()
                        } else {
                            const intersection = this.info.profesional.TAB_ESPEC.find((e) =>
                                ["340", "341"].includes(e.COD)
                            );

                            if (this.sw_var.embar || intersection) {
                                this.params_uterina.modal = true;
                                this._datoUterina();
                            } else { this.preguntarGraficas() }
                        }
                    }
                }
            );
        },

        _datoUterina() {
            validarInputs(
                {
                    form: "#faseAlturaUterina",
                    orden: "1"
                },
                () => {
                    this.params_uterina.modal = false;
                    this._validarPerAbdo();
                },
                () => {
                    let altura = parseFloat(this.form.signos.alt_uter) || 0;

                    let edad_gest_regla_esq_w = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
                    let edad_gest_ultra_esq_w = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_ultra_esq_w) || 0;
                    let dia_max = 0;

                    if (edad_gest_regla_esq_w == 0) {
                        dia_max = edad_gest_ultra_esq_w + 10;
                    } else {
                        dia_max = edad_gest_regla_esq_w + 10;
                    }

                    if (edad_gest_regla_esq_w > 15 && altura == 0) {
                        CON851("02", "02", null, "error", "error");
                        this._datoUterina()
                    } else {

                        if (altura > dia_max) {
                            CON851("03", "03", null, "error", "error");
                            this._datoUterina()
                        } else {
                            this.params_uterina.modal = false;
                            this.preguntarGraficas()
                        }
                    }
                }
            )
        },

        preguntarGraficas() {
            let parametro = null
            // let texto = ""
            console.log(this.form.serv, this.sw_var.embar, this.form.edad.unid_edad, this.form.edad.vlr_edad)
            if (this.form.serv == '08' && !this.sw_var.embar && this.form.edad.unid_edad == "A" && this.form.edad.vlr_edad < 19) {
                parametro = 1
                // texto = "Desea generar gráficas de desarrollo ?"
            }

            let semanas_gesta = parseInt(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w)
            if (this.sw_var.embar && semanas_gesta > 9) {
                parametro = 2
                // texto = "Desea generar gráficas de embarazo ?"
            }

            if (parametro) {
                this.traerSisvan(parametro)
            } else {
                this.validarAgudeza_y_Disca()
            }

            // if (parametro) CON851P(texto, this.validarAgudeza_y_Disca, () => this.traerSisvan(parametro))
            // else this.validarAgudeza_y_Disca()
        },

        traerSisvan(parametro) {
            var _this = this;

            loader('show')
            postData({ datosh: datosEnvio() + this.info.paciente.COD + "|" }, get_url("APP/SALUD/SER134-03.DLL"))
                .then(function (data) {
                    console.log(data);
                    _this.info.SISVAN.TABLA = data.TABLA;
                    _this.info.SISVAN.CONTROL_MATERNO = data.CONTROL_MATERNO;

                    _this.traerTablasOms(parametro);
                })
                .catch((err) => {
                    console.error(err);
                    loader("hide");
                    CON851("", "Error consultando sisvan !", null, "error", "Error");
                    _this.validarAgudeza_y_Disca()
                });
        },

        traerTablasOms(parametro) {
            var _this = this;

            postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/AIE-DESA.DLL"))
                .then(function (data) {
                    console.log(data);
                    _this.info.TABLAS_OMS = data.TABLAS_OMS;

                    switch (parametro) {
                        case 1: _this.graficasDESA();
                            break;
                        case 2: _this.graficasEmbar()
                            break;
                    }
                })
                .catch((err) => {
                    console.error(err);
                    loader("hide");
                    CON851("", "Error consultando tablas oms !", null, "error", "Error");
                    _this.validarAgudeza_y_Disca()
                });
        },

        async graficasDESA() {
            let _this = this
            this.mostrarDesarrollo = true
            let unidad = this.form.edad.unid_edad
            let edad = this.form.edad.vlr_edad

            console.log(unidad, edad, "DESARROLLO")
            if ((unidad == "A" && edad < 6) || unidad == "M" || unidad == "D") {
                this.info.graficas.peso_edad.info = await this.calcularGraficasDESA("PXE");
                this.graficarPesoEdad();

                this.info.graficas.per_cef.info = await this.calcularGraficasDESA("CEF");
                this.graficarPerCef();

                this.info.graficas.peso_talla.info = await this.calcularGraficasDESA("PXT");
                this.graficarPesoTalla();
            }

            this.info.graficas.talla.info = await this.calcularGraficasDESA("TXE");
            this.graficarTalla();
            this.info.SISVAN.talla_ant_grafica = parseInt(this.form.signos.talla);

            this.info.graficas.imc.info = await this.calcularGraficasDESA("IMC");
            this.graficarIMC()
                .then((param) => {
                    console.log(param)
                    const { imprimir_GRAF_DES } = require("../../frameworks/pdf/hiclin/GRAF_DES.formato");

                    imprimir_GRAF_DES({
                        hcprc: _this.form,
                        paci: $_REG_PACI,
                        graficas: _this.info.graficasPDF,
                        callback: () => {
                            // Correcto
                            loader("hide");
                            _this.validarAgudeza_y_Disca()
                        },
                    });
                })
        },

        async graficasEmbar() {
            let _this = this
            this.mostrarEmbarazo = true
            let edad_Gesta = parseInt(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w)
            console.log(edad_Gesta, "EMBAR")

            if (edad_Gesta > 12) {
                this.info.graficas.alt_sem_gest.info = await this.calcularGraficasEMBAR("AXS");
                this.graficarALT_X_semana();
            }

            if (edad_Gesta > 15) {
                this.info.graficas.gan_peso_sem_gest.info = await this.calcularGraficasEMBAR("GXS");
                this.graficarGXS_X_semana();
            }

            // SIEMPRE SALE GRAFICA TENSION MEDIA Y IMC
            this.info.graficas.tension.info = await this.calcularGraficasEMBAR("TXS");
            this.graficarTension();

            this.info.graficas.imc_sem_gest.info = await this.calcularGraficasEMBAR("IXS");
            this.graficarIMC_X_semana()
                .then((param) => {
                    console.log(param)
                    const { imprimir_GRAF_EMBA } = require("../../frameworks/pdf/hiclin/GRAF_EMBA.formato");

                    imprimir_GRAF_EMBA({
                        hcprc: _this.form,
                        paci: $_REG_PACI,
                        graficas: _this.info.graficasPDF,
                        callback: () => {
                            // Correcto
                            loader("hide");
                            _this.validarAgudeza_y_Disca()
                        },
                    });
                })
        },

        validarAgudeza_y_Disca() {
            if (this.sw_var.agudeza) this.LlamarHC890G()
            else this._validarDiscapacidad();
        },

        escHC890G() {
            this.params_hc890g.estado = false;
            this._validarPerMuñeca();
        },

        LlamarHC890G() {
            let { examen_visual } = this.form;
            this.examen_visual.agudeza_visual_od_1 = examen_visual.agud_visual_od_1
            this.examen_visual.agudeza_visual_od_2 = examen_visual.agud_visual_od_2
            this.examen_visual.agudeza_visual_oi_1 = examen_visual.agud_visual_oi_1
            this.examen_visual.agudeza_visual_oi_2 = examen_visual.agud_visual_oi_2
            this.examen_visual.distancia_agud = examen_visual.distancia_agud

            this.examen_visual.estructuras_oculares_od = examen_visual.estructuras_oculares_od
            this.examen_visual.estructuras_oculares_oi = examen_visual.estructuras_oculares_oi

            scrollProsoft("fase_examen", "smooth", "start");
            this.params_hc890g.estado = true;
        },

        evaluarSalidaHC890G(agudeza) {
            this.params_hc890g.estado = false;
            var examen_visual = agudeza;

            this.form.examen_visual.agud_visual_od_1 = examen_visual.agudeza_visual_od_1;
            this.form.examen_visual.agud_visual_od_2 = examen_visual.agudeza_visual_od_2;
            this.form.examen_visual.agud_visual_oi_1 = examen_visual.agudeza_visual_oi_1;
            this.form.examen_visual.agud_visual_oi_2 = examen_visual.agudeza_visual_oi_2;
            this.form.examen_visual.distancia_agud = examen_visual.distancia_agud;
            this.form.examen_visual.estructuras_oculares_od = examen_visual.estructuras_oculares_od;
            this.form.examen_visual.estructuras_oculares_oi = examen_visual.estructuras_oculares_oi;

            this._validarDiscapacidad();
        },

        validarEsc_discap() {
            this.params_hc890l.modal = false;
            this.params_hc890l.estado = false;
            this._validarPerAbdo();
        },

        _validarDiscapacidad() {
            let nit = this.info.usuar.NIT;
            let serv = parseFloat(this.form.serv) || 0;

            if ([900541158, 900405505].includes(nit) && serv == 9) {
                this._valaidarTactoRectal()
            } else {
                if ([3, 52, 53, 54, 55].includes(serv)) {
                    this._valaidarTactoRectal()
                } else {
                    this.params_hc890l.modal = true;
                    setTimeout(() => {
                        this.params_hc890l.estado = true;
                    }, 150);
                }
            }
        },

        validarCallback_discap(data) {
            this.params_hc890l.modal = false;
            this.params_hc890l.estado = false;
            this.form.rips.discapacidades = data;
            this._valaidarTactoRectal();
        },

        validarEsc_tacto() {
            this.params_hc890O.modal = false;
            this.params_hc890O.estado = false;
            this._validarPerAbdo();
        },

        _valaidarTactoRectal() {
            if (this.form.serv == 8 &&
                this.form.rips.finalid == 7 &&
                this.form.edad.unid_edad == "A" &&
                this.form.edad.vlr_edad > 50 &&
                this.info.paciente.SEXO == "M"
            ) {
                this.datos_tacto.tacto_rectal = this.form.signos.tacto_rectal
                this.datos_tacto.nota_tacto_rectal = this.form.signos.nota_tacto_rectal

                this.params_hc890O.modal = true;
                setTimeout(() => {
                    this.params_hc890O.estado = true;
                }, 150);
            } else this.validarCallback_tacto();
        },

        validarCallback_tacto(data = {}) {
            this.params_hc890O.estado = false
            this.params_hc890O.modal = false

            this.form.signos.tacto_rectal = data.tacto_rectal;
            this.form.signos.nota_tacto_rectal = data.nota_tacto_rectal;


            // if (this.info.paciente.SEXO == "M") {
            //     this.validarExamenHc()
            // } else {
            //     const intersection = this.info.profesional.TAB_ESPEC.find((e) =>
            //         ["340", "341"].includes(e.COD)
            //     );

            //     if (this.sw_var.embar || intersection) {
            //         this.params_uterina.modal = true;
            //         this._datoUterina();
            //     } else { this.validarExamenHc() }
            // }
            this.validarExamenHc()
        },

        // _datoUterina() {
        //     validarInputs(
        //         {
        //             form: "#faseAlturaUterina",
        //             orden: "1"
        //         },
        //         () => {
        //             this.params_uterina.modal = false;
        //             this._validarPerAbdo();
        //         },
        //         () => {
        //             let altura = parseFloat(this.form.signos.alt_uter) || 0;

        //             let edad_gest_regla_esq_w = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w) || 0;
        //             let edad_gest_ultra_esq_w = parseFloat(this.formDetalles['4040'].obstetric_esq_w.edad_gest_ultra_esq_w) || 0;
        //             let dia_max = 0;

        //             if (edad_gest_regla_esq_w == 0) {
        //                 dia_max = edad_gest_ultra_esq_w + 10;
        //             } else {
        //                 dia_max = edad_gest_regla_esq_w + 10;
        //             }

        //             if (edad_gest_regla_esq_w > 15 && altura == 0) {
        //                 CON851("02", "02", null, "error", "error");
        //                 this._datoUterina()
        //             } else {

        //                 if (altura > dia_max) {
        //                     CON851("03", "03", null, "error", "error");
        //                     this._datoUterina()
        //                 } else {
        //                     this.params_uterina.modal = false;
        //                     this.validarExamenHc()
        //                 }
        //             }
        //         }
        //     )
        // },

        validarExamenHc() {
            validarInputs(
                {
                    form: "#fase_examen",
                    orden: "1",
                },
                () => { this._validarPerMuñeca() },
                () => {
                    this.formDetalles.examen.change = true;
                    if (this.sw_var.minimental) {
                        this._activarMinimental();
                    } else {
                        this._saltoPag5()
                    }
                }
            );
        },

        _activarMinimental() {
            this.params_hc890q.edadPaci.unid = this.form.edad.unid_edad
            this.params_hc890q.edadPaci.vlr = this.form.edad.vlr_edad
            this.params_hc890q.estado = true
        },

        escape_hc890q() {
            this.validarExamenHc()
        },

        siguiente_hc890q() {
            this._saltoPag5()
        },

        _saltoPag5() {
            loader("show")
            this._guardarHistoria().then(() => {
                this._guardarDetallesHc().then(() => {
                    loader("hide")
                    this._ubicar_pag_6();
                }).catch((err) => {
                    loader("hide")
                    this.validarExamenHc();
                });
            }).catch((err) => {
                loader("hide")
                this.validarExamenHc();
            });
        },

        _ubicar_pag_6() {
            let embarazo = parseFloat(this.form.rips.embarazo) || 0;
            if (this.info.paciente.SEXO == "M") {
                this._validarVale();
            } else {
                const intersection = this.info.profesional.TAB_ESPEC.find((e) =>
                    ["340", "341"].includes(e.COD)
                );

                if (
                    [1, 2, 3].includes(embarazo) ||
                    this.sw_var.embar ||
                    intersection
                ) {
                    this.$refs.fur.value = "Por F.U.R."
                    this.$refs.por_ultra_sonido.value = "Por ultrasonido"


                    this.$refs.Semanas.value = "Semanas"
                    this.$refs.Semanas2.value = "Semanas"
                    this._mostrar_pantalla_07();
                } else {
                    this._validarVale();
                }
            }
        },

        _mostrar_pantalla_07() {
            let { gineco_esq_w, obstetric_esq_w } = this.formDetalles['4040'];

            if (!gineco_esq_w.ultrason_utero_esq_w) {
                obstetric_esq_w.edad_gest_ultra_esq_w = 0;
                obstetric_esq_w.presentac_esq_w = 4;
                obstetric_esq_w.situacion_esq_w = 4;
                obstetric_esq_w.dorso_obs_esq_w = "";
                obstetric_esq_w.liq_amniot_vol_esq_w = 0;
                // obstetric_esq_w.liq_amniot_vol_esq_w = 0;
                obstetric_esq_w.oligoamnio_esq_w = "N";
                obstetric_esq_w.implantacion_esq_w = 15;
                obstetric_esq_w.dist_cervix_esq_w = 0;
                obstetric_esq_w.frec_card_fetal_esq_w = 0;

                obstetric_esq_w.umbil_ir_esq_w = 0;
                obstetric_esq_w.umbil_ip_esq_w = 0;
                obstetric_esq_w.umbil_sd_esq_w = 0;

                obstetric_esq_w.cereb_ir_esq_w = 0;
                obstetric_esq_w.cereb_ip_esq_w = 0;
                obstetric_esq_w.cereb_sd_esq_w = 0;

                obstetric_esq_w.utder_ir_esq_w = 0;
                obstetric_esq_w.utder_ip_esq_w = 0;
                obstetric_esq_w.utder_sd_esq_w = 0;

                obstetric_esq_w.utizq_ir_esq_w = 0;
                obstetric_esq_w.utizq_ip_esq_w = 0;
                obstetric_esq_w.utizq_sd_esq_w = 0;
            }

            let edad_gest = parseFloat(obstetric_esq_w.edad_gest_regla_esq_w) || 0;

            if (edad_gest == 0) {
                obstetric_esq_w.fecha_parto_fur_esq_w = "";
                obstetric_esq_w.fecha_parto_fur_cale_esq_w = "";
            } else {
                obstetric_esq_w.fecha_parto_fur_esq_w = 40 - edad_gest
                this._calcularFechaPartoFurCale()
            }

            if (!gineco_esq_w.ultrason_utero_esq_w) {
                this._saltoPag7();
            } else {
                this._validarEdadUltra()
            }
        },

        _validarEdadUltra() {
            validarInputs(
                {
                    form: "#fase_edad_ultra",
                    orden: "1"
                },
                () => { this.validarExamenHc(); },
                () => {
                    let { obstetric_esq_w } = this.formDetalles['4040'];
                    let edad_gest = parseFloat(obstetric_esq_w.edad_gest_ultra_esq_w) || 0;

                    if (edad_gest == 0) {
                        obstetric_esq_w.fecha_parto_son_esq_w = ""
                        obstetric_esq_w.fecha_parto_son_cale_esq_w = ""
                    } else {
                        obstetric_esq_w.fecha_parto_son_esq_w = 40 - edad_gest;
                        this._calcularFechaPartoSonCale();
                    }

                    let embar = this.form.rips.embarazo;

                    if ([2, 3].includes(2, 3) && edad_gest > 8) {
                        CON851('4R', '4R', null, 'warning', 'error')
                    }

                    this._validarPresentacion();
                }
            )
        },

        _validarPresentacion() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            POPUP(
                {
                    array: modular.arrays.presentac_esq,
                    titulo: "Presentacion",
                    indices: [{ id: "value", label: "text" }],
                    seleccion: obstetric_esq_w.presentac_esq_w,
                    callback_f: () => { this._validarEdadUltra() },
                },
                (data) => {
                    obstetric_esq_w.presentac_esq_w = data.value;
                    this._validarSituacion()
                }
            );
        },

        _validarSituacion() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            POPUP(
                {
                    array: modular.arrays.situacion_esq,
                    titulo: "Situacion",
                    indices: [{ id: "value", label: "text" }],
                    seleccion: obstetric_esq_w.situacion_esq_w,
                    callback_f: () => { this._validarPresentacion() },
                },
                (data) => {
                    obstetric_esq_w.situacion_esq_w = data.value;
                    this._validarDorso()
                }
            );
        },

        _validarDorso() {
            let { obstetric_esq_w } = this.formDetalles['4040']

            let index = parseFloat(obstetric_esq_w.situacion_esq_w) || 0;
            if ([1, 2, 3].includes(index)) {
                POPUP(
                    {
                        array: modular.arrays.dorso_obs_esq[index - 1],
                        titulo: "Dorso",
                        indices: [{ id: "value", label: "text" }],
                        seleccion: obstetric_esq_w.dorso_obs_esq_w,
                        callback_f: () => { this._validarSituacion() },
                    },
                    (data) => {
                        obstetric_esq_w.dorso_obs_esq_w = data.value;
                        this._validarVolLiq()
                    }
                );
            } else {
                obstetric_esq_w.dorso_obs_esq_w = "4";
                this._validarVolLiq()
            }

        },

        _validarVolLiq() {
            validarInputs(
                {
                    form: "#faseVolumen",
                    orden: "1"
                },
                () => { this._validarDorso() },
                () => { this._validarPlihidram() }
            )
        },

        _validarPlihidram() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            obstetric_esq_w.polihidram_esq_w = obstetric_esq_w.polihidram_esq_w || "N"

            validarInputs(
                {
                    form: "#fasePolihidram",
                    orden: "1"
                },
                () => { this._validarVolLiq() },
                () => {
                    obstetric_esq_w.polihidram_esq_w = obstetric_esq_w.polihidram_esq_w.toUpperCase()

                    if (["S", "N"].includes(obstetric_esq_w.polihidram_esq_w)) {
                        this._validarOligoanmios()
                    } else this._validarPlihidram()
                }
            )
        },

        _validarOligoanmios() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            obstetric_esq_w.oligoamnio_esq_w = obstetric_esq_w.oligoamnio_esq_w || "N"

            validarInputs(
                {
                    form: "#faseOlig",
                    orden: "1"
                },
                () => { this._validarPlihidram() },
                () => {
                    obstetric_esq_w.oligoamnio_esq_w = obstetric_esq_w.oligoamnio_esq_w.toUpperCase()

                    if (["S", "N"].includes(obstetric_esq_w.oligoamnio_esq_w)) {
                        this._validarImplantacion()
                    } else this._validarOligoanmios()
                }
            )
        },

        _validarImplantacion() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            POPUP(
                {
                    array: modular.arrays.implantacion_esq,
                    titulo: "Implantancion",
                    indices: [{ id: "value", label: "text" }],
                    seleccion: parseFloat(obstetric_esq_w.implantacion_esq_w) || 0,
                    callback_f: () => { this._validarOligoanmios() },
                },
                (data) => {
                    obstetric_esq_w.implantacion_esq_w = data.value;
                    this._validarDistanciaCervix()
                }
            );
        },

        _validarDistanciaCervix() {
            validarInputs(
                {
                    form: "#faseCervix",
                    orden: "1"
                },
                () => { this._validarImplantacion() },
                () => {
                    this._validarFrecuencia()
                }
            )
        },

        _validarFrecuencia() {
            validarInputs(
                {
                    form: "#faseFrecuencia",
                    orden: "1"
                },
                () => { this._validarDistanciaCervix() },
                () => { this._validarUmbilicalIr() }
            )
        },

        // umbilical

        _validarUmbilicalIr() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUmbilicalIr",
                    orden: "1"
                },
                () => { this._validarFrecuencia() },
                () => {
                    let umbil = parseFloat(obstetric_esq_w.umbil_ir_esq_w) || 0;
                    obstetric_esq_w.umbil_ir_esq_w = umbil;

                    if (umbil > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUmbilicalIr()
                    } else {
                        if (umbil == 0) {
                            obstetric_esq_w.umbil_ip_esq_w = 0
                            obstetric_esq_w.umbil_sd_esq_w = 0
                            this._validarCerebralIr()
                        } else { this._validarUmbilicalIp() }
                    }
                }
            )
        },

        _validarUmbilicalIp() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUmbilicalIp",
                    orden: "1"
                },
                () => { this._validarUmbilicalIr() },
                () => {
                    let umbil = parseFloat(obstetric_esq_w.umbil_ip_esq_w) || 0;

                    if (umbil > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUmbilicalIp();
                    } else {
                        obstetric_esq_w.umbil_ip_esq_w = umbil;
                        this._validarUmbilicalSd()
                    }

                }
            )
        },

        _validarUmbilicalSd() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUmbilicalSd",
                    orden: "1"
                },
                () => { this._validarUmbilicalIp() },
                () => {
                    let umbil = parseFloat(obstetric_esq_w.umbil_sd_esq_w) || 0;

                    if (umbil > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUmbilicalSd()
                    } else {
                        obstetric_esq_w.umbil_sd_esq_w = umbil;
                        this._validarCerebralIr()
                    }
                }
            )
        },

        // cerebral

        _validarCerebralIr() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseCerebralIr",
                    orden: "1"
                },
                () => { this._validarUmbilicalIr() },
                () => {
                    let cereb = parseFloat(obstetric_esq_w.cereb_ir_esq_w) || 0;
                    obstetric_esq_w.cereb_ir_esq_w = cereb;

                    if (cereb > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarCerebralIr()
                    } else {
                        if (cereb == 0) {
                            obstetric_esq_w.cereb_ip_esq_w = 0
                            obstetric_esq_w.cereb_sd_esq_w = 0

                            this._validarUterinoDerIr()
                        } else { this._validarCerebralIp() }
                    }

                }
            )
        },

        _validarCerebralIp() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseCerebralIp",
                    orden: "1"
                },
                () => { this._validarCerebralIr() },
                () => {
                    let cereb = parseFloat(obstetric_esq_w.cereb_ip_esq_w) || 0;

                    if (cereb > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarCerebralIp()
                    } else {
                        obstetric_esq_w.cereb_ip_esq_w = cereb;
                        this._validarCerebralSd()
                    }
                }
            )
        },

        _validarCerebralSd() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseCerebralSd",
                    orden: "1"
                },
                () => { this._validarCerebralIp() },
                () => {
                    let cereb = parseFloat(obstetric_esq_w.cereb_sd_esq_w) || 0;
                    if (cereb > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarCerebralSd()
                    } else {
                        obstetric_esq_w.cereb_sd_esq_w = cereb;
                        this._validarUterinoDerIr()
                    }
                }
            )
        },

        // uterino derecha

        _validarUterinoDerIr() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUterinoDerIr",
                    orden: "1"
                },
                () => { this._validarCerebralIr() },
                () => {
                    let uterino = parseFloat(obstetric_esq_w.utder_ir_esq_w) || 0;
                    obstetric_esq_w.utder_ir_esq_w = uterino;

                    if (uterino > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUterinoDerIr()
                    } else {
                        if (uterino == 0) {
                            obstetric_esq_w.utder_ip_esq_w = 0
                            obstetric_esq_w.utder_sd_esq_w = 0
                            this._validarUterinoIzqIr()
                        } else { this._validarUterinoDerIp() }
                    }
                }
            )
        },

        _validarUterinoDerIp() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUterinoDerIp",
                    orden: "1"
                },
                () => { this._validarUterinoDerIr() },
                () => {
                    let uterino = parseFloat(obstetric_esq_w.utder_ip_esq_w) || 0;

                    if (uterino > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUterinoDerIp()
                    } else {
                        obstetric_esq_w.utder_ip_esq_w = uterino;
                        this._validarUterinoDerSd()
                    }
                }
            )
        },

        _validarUterinoDerSd() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUterinoDerSd",
                    orden: "1"
                },
                () => { this._validarUterinoDerIp() },
                () => {
                    let uterino = parseFloat(obstetric_esq_w.utder_sd_esq_w) || 0;
                    if (uterino > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUterinoDerSd()
                    } else {
                        obstetric_esq_w.utder_sd_esq_w = uterino;
                        this._validarUterinoIzqIr()
                    }
                }
            )
        },

        // uterino izquierda

        _validarUterinoIzqIr() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUterinoIzqIr",
                    orden: "1"
                },
                () => { this._validarUterinoDerIr() },
                () => {
                    let uterino = parseFloat(obstetric_esq_w.utizq_ir_esq_w) || 0;
                    obstetric_esq_w.utizq_ir_esq_w = uterino;

                    if (uterino > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUterinoIzqIr()
                    } else {
                        if (uterino == 0) {
                            obstetric_esq_w.utizq_ip_esq_w = 0
                            obstetric_esq_w.utizq_sd_esq_w = 0
                            this._validarObservFlujoMet()
                        } else { this._validarUterinoIzqIp() }
                    }

                }
            )
        },

        _validarUterinoIzqIp() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUterinoIzqIp",
                    orden: "1"
                },
                () => { this._validarUterinoIzqIr() },
                () => {
                    let uterino = parseFloat(obstetric_esq_w.utizq_ip_esq_w) || 0;
                    if (uterino > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUterinoIzqIp()
                    } else {
                        obstetric_esq_w.utizq_ip_esq_w = uterino;
                        this._validarUterinoIzqSd()
                    }
                }
            )
        },

        _validarUterinoIzqSd() {
            let { obstetric_esq_w } = this.formDetalles['4040']
            validarInputs(
                {
                    form: "#faseUterinoIzqSd",
                    orden: "1"
                },
                () => { this._validarUterinoIzqIp() },
                () => {
                    let uterino = parseFloat(obstetric_esq_w.utizq_sd_esq_w) || 0;
                    if (uterino > 9) {
                        CON851('03', '03', null, 'warning', 'error')
                        this._validarUterinoIzqSd()
                    } else {
                        obstetric_esq_w.utizq_sd_esq_w = uterino;
                        this._validarObservFlujoMet()
                    }
                }
            )
        },

        // observaciones

        _validarObservFlujoMet() {
            validarInputs(
                {
                    form: "#faseObservFlujoMet",
                    orden: "1"
                },
                () => { this._validarUterinoIzqIr() },
                () => { this._saltoPag7() }
            )
        },

        _saltoPag7() {
            let _4040 = this.formDetalles["4040"];

            let detalles = {
                4040: _getObjetoSaveHc(_4040, filtroArray.tabla4040),
            };

            loader("show")

            modular.grabarDetalles(detalles, this.form.llave)
                .then((res => {
                    loader("hide")
                    this._validarVale()
                }))
                .catch(err => {
                    loader("hide")
                    this._validarObservFlujoMet()
                })
        },

        _calcularFechaPartoFurCale() {
            let { gineco_esq_w, obstetric_esq_w } = this.formDetalles['4040'];
            let fecha = this._addicionarMes(gineco_esq_w.fecha_regla_esq_w, 9)
            obstetric_esq_w.fecha_parto_fur_cale_esq_w = fecha.split("/").reverse().join("");

            this.$refs.fecha_parto_fur_cale_esq_w.value = fecha.split("/").reverse().join("/");
        },

        _calcularFechaPartoSonCale() {
            let _cuurent = this._currentDate().fecha;
            let { obstetric_esq_w } = this.formDetalles['4040'];
            let fecha = this._addicionarMes(_cuurent, 9)
            obstetric_esq_w.fecha_parto_son_cale_esq_w = fecha.split("/").reverse().join("");

            this.$refs.fecha_parto_son_cale_esq_w.value = fecha.split("/").reverse().join("/");
        },

        _addicionarMes(fecha, addMes) {
            let obj = _getObjDate(fecha);
            let formato = new Date(`${obj.anio}-${obj.mes}-${obj.dia}`);
            formato.setMonth(formato.getMonth() + addMes);

            return formato.toLocaleDateString(
                "es-CO",
                {
                    year: 'numeric', month: '2-digit', day: '2-digit'
                }
            )
        },

        _validarVale() {
            let serv = this.form.serv;
            let finalidad = parseFloat(this.form.rips.finalid) || 0;
            let edad = this.form.edad;

            if (serv == 8 && [4, 6].includes(finalidad)) {
                if (["D", "M"].includes(edad.unid_edad) || (edad.unid_edad == "A" && edad.vlr_edad < 13)) {
                    this.params_hc9010.modal = true;
                } else this._validarApgar()
            } else this._validarApgar()

        },

        escHC_9010() {
            params_hc9010.modal = false;
            this._validarApgar()
        },

        finHC_9010() {
            this.params_hc9010.modal = false;
            this._validarApgar()
        },

        _validarApgar() {
            if (this.sw_var._9011) {
                this.params_hc9011.estado = true;
            } else this._buscarNacimientos();
        },

        _validarEsc9011() {
            this.params_hc9011.estado = false;
            this._buscarNacimientos()

        },
        _validarCallback9011() {
            this.params_hc9011.estado = false;
            this._buscarNacimientos()
        },

        _buscarNacimientos() {
            if (this.sw_var.pyp2) {
                this.params_pyp2.estado = 1
            } else this._getEnfermedades()
        },

        escPYP2() {
            this.params_pyp2.estado = false
            this._getEnfermedades()
        },

        salirPYP2() {
            this.params_pyp2.estado = false
            this._getEnfermedades()
        },

        _getEnfermedades() {
            if (this.info.enfermedades.length > 0) {
                this._validarDiagnosticos();
            } else {
                loader("show")
                let datosh = datosEnvio();

                postData({ datosh }, get_url("APP/SALUD/SER851.DLL"))
                    .then((data) => {
                        this.info.enfermedades = data.ENFERMEDADES.filter(
                            (e) => e.COD_ENF.trim() != ""
                        );

                        this._validarDiagnosticos();
                        loader("hide")
                    })
                    .catch((err) => {
                        console.error(err);
                        this.validarExamenHc();
                        loader("hide")
                    });
            }
        },

        _validarDiagnosticos() {
            validarInputs(
                {
                    form: "#fase_diagnosticos",
                    orden: "1",
                    event_f3: () => {
                        let length = this.form.rips.tabla_diagn.length;
                        if (length > 0) this._evaluarPacienteConfirmado();
                        else {
                            plantillaToast("", "02", null, "warning", "");
                            this._validarDiagnosticos();
                        }
                    },
                },
                () => {
                    this.validarExamenHc()
                },
                () => {
                    this._addItemDiagn()
                }
            );
        },

        _addItemDiagn() {
            let data = this._validarCodDiag();
            if (data.error != "00") {
                plantillaError("", data.error, "HC-01", () => {
                    this.cod_diagn = "";
                    setTimeout(this._validarDiagnosticos, 150);
                });
            } else {
                let cod_diag = this.cod_diagn || "";
                var verificar = this.form.rips.tabla_diagn.find(
                    (e) => e.cod_diagn == cod_diag.toUpperCase()
                );

                let length = this.form.rips.tabla_diagn.length + 1;

                if (length > 10) {
                    plantillaError("", "Tabla en su limite!", "HC-01", () => {
                        this.cod_diagn = "";
                        setTimeout(this._validarDiagnosticos, 150);
                    });
                } else {
                    if (!verificar) {
                        this.form.rips.tabla_diagn.push({
                            nro: length,
                            cod_diagn: data.item.COD_ENF,
                            descrip_diagn: data.item.NOMBRE_ENF,
                        });

                        if (data.item.COD_ENF.substr(0, 1) == "A") {
                            CON851("", "Diagnostico de notificación", null, "warning", "Advertencia");
                        }

                        this.cod_diagn = "";
                        this._validarDiagnosticos();
                    } else {
                        plantillaToast("", "05", null, "warning", "");
                        this.cod_diagn = "";
                        this._validarDiagnosticos();
                    }
                }
            }
        },

        _validarCodDiag() {
            let nit = this.info.usuar.NIT,
                serv = parseFloat(this.form.serv) || 0,
                retornar = { item: false, error: "00" },
                cod_diag = this.cod_diagn.toUpperCase() || "";

            let consulta = this.info.enfermedades.find((e) => e.COD_ENF == cod_diag);

            let length = this.form.rips.tabla_diagn.length + 1;

            if (consulta) {
                retornar.item = consulta;
                if (consulta.HUERFA_ENF.trim() == "S") {
                    plantillaToast("G3", "G3", "", "warning", "");
                }

                if (length == 1) {
                    if (serv == 8) {
                        if (
                            cod_diag.substr(0, 1) == "Z" ||
                            cod_diag.substr(0, 2) == "E1" ||
                            [
                                "I10X",
                                "I151",
                                "I158",
                                "I159",
                                "O16X",
                                "E782",
                                "E784",
                                "E785",
                                "E119"].includes(cod_diag)
                        ) {
                            retornar.item = consulta;
                        } else {
                            retornar.error = "G0";
                        }
                    }

                    if (nit == 800037021) {
                        if (
                            (cod_diag.substr(0, 1) == "Z" && serv == 1) ||
                            cod_diag.substr(0, 1) == "R"
                        ) {
                            retornar.error = "03";
                        }
                    }

                    if (nit == 830511298) {
                        if (cod_diag != "Z539" && this.info.profesional.ATIENDE_PROF != "1") {
                            if (cod_diag.substr(0, 1) == "Z" && serv == 2) {
                                retornar.error = "03";
                            }
                        }
                    }

                    if (nit == 800037979 || nit == 900077520) {
                        if (cod_diag.substr(0, 1) == "Z" && [1, 2].includes(serv)) {
                            retornar.error = "03";
                        }
                    }

                    // ese de granada

                    if (
                        nit == 900005594 ||
                        nit == 845000038 ||
                        nit == 900004059 ||
                        nit == 822001570 ||
                        nit == 800037979 ||
                        nit == 892000458 ||
                        nit == 900077520 ||
                        (nit == 900306771 && [1, 2, 3].includes(serv))
                    ) {
                        if (cod_diag.substr(0, 1) == "Z") {
                            if (cod_diag != "Z000" && cod_diag != "Z519") {
                                retornar.error = "03";
                            }
                        }
                    }

                    if (![2, 3, 6, 8, 63, 65].includes(serv)) {
                        let espejo_diagnosticos = [
                            "Z000",
                            "Z001",
                            "Z002",
                            "Z003",
                            "Z006",
                            "Z021",
                            "Z022",
                            "Z023",
                            "Z024",
                            "Z025",
                            "Z026",
                            "Z027",
                            "Z028",
                            "Z029",
                            "Z100",
                            "Z101",
                            "Z102",
                            "Z103",
                            "Z108",
                            "Z300",
                            "Z301",
                            "Z700",
                            "Z701",
                            "Z702",
                            "Z713",
                            "Z714",
                            "Z715",
                            "Z716",
                            "Z717",
                            "Z718",
                            "Z719",
                        ];

                        if (espejo_diagnosticos.includes(cod_diag)) {
                            retornar.error = "G1";
                        }
                    }

                    if (
                        consulta.SEXO_ENF.trim() != "" &&
                        consulta.SEXO_ENF.trim() != this.info.paciente.SEXO
                    ) {
                        retornar.error = "73";
                    }

                    let edad_paci = this._editarEdad(this.form.edad.unid_edad, "");
                    let vlr_edad = this.form.edad.vlr_edad;
                    edad_paci = `${edad_paci}${vlr_edad.toString().padStart(3, "0")}`;

                    let vlr_unidad = this._editarEdad(consulta.UNID_EDAD_ENF, "");
                    let edad_max_enf = `${vlr_unidad}${consulta.EDAD_MAX_ENF}`;
                    let edad_min_enf = `${vlr_unidad}${consulta.EDAD_MIN_ENF}`;

                    if (
                        parseFloat(consulta.EDAD_MIN_ENF) > 0 &&
                        parseFloat(edad_paci) < parseFloat(edad_min_enf)
                    ) {
                        retornar.error = "74";
                    }

                    if (
                        parseFloat(consulta.EDAD_MAX_ENF) > 0 &&
                        parseFloat(edad_paci) > parseFloat(edad_max_enf)
                    ) {
                        retornar.error = "74";
                    }
                }
            } else {
                retornar.error = "01";
            }
            return retornar;
        },

        _editarEdad(unidad, vlr) {
            switch (unidad) {
                case "D":
                    unidad = "1";
                    break;
                case "M":
                    unidad = "2";
                    break;
                case "A":
                    unidad = "3";
                    break;
                default:
                    unidad = "0";
                    break;
            }
            return `${unidad}${vlr}`;
        },

        _evaluarPacienteConfirmado() {
            let consulta = this.form.rips.tabla_diagn.find((e) => e.cod_diagn == "U071");
            let serv = parseFloat(this.form.serv) || 0;

            if (consulta) {
                let nit = this.info.usuar.NIT;
                if (
                    ([900541158, 900405505].includes(nit)) && serv == 9
                ) {
                    this._initPacienteConfimado();
                    this._evaluarImprimirCovid19();

                } else if ([1, 2, 8, 9, 63].includes(serv)) {
                    //  init ventana covid
                    this.params_hc890h.pregunta = 4;
                    this.params_hc890h.estado = true;
                } else {
                    this._initPacienteConfimado();
                    this._evaluarImprimirCovid19();
                }
            } else {
                this._initPacienteConfimado();
                this._evaluarImprimirCovid19();
            }
        },

        _initPacienteConfimado() {
            this.form.covid19.paci_confirmado_covid19 = { ...modular.getObjRegHC.covid19.paci_confirmado_covid19 };
        },

        _evaluarImprimirCovid19() {
            let consulta = this._validarDiagnRecomendacionCovid();
            let serv = parseFloat(this.form.serv) || 0;

            if (consulta) {
                this.form.covid19.recomendacion_covid19 = "S";
                this._datoAcompañanteCovid19();
            } else {
                let nit = this.info.usuar.NIT;
                if ([900541158, 900405505].includes(nit) && serv == 9) {

                    this.form.covid19.recomendacion_covid19 = "N";
                    this.form.covid19.consenti_acomp_covid19 = "N";
                    this._vetanaSintomaticoRespiratorio();
                } else if ([1, 2, 8, 9, 63].includes(serv)) {

                    this.params_hc890h.pregunta = 2;
                    this.params_hc890h.estado = true;
                } else {

                    this.form.covid19.recomendacion_covid19 = "N";
                    this.form.covid19.consenti_acomp_covid19 = "N";
                    this._vetanaSintomaticoRespiratorio();
                }
            }
        },

        _datoAcompañanteCovid19() {
            let consulta = this._validarDiagnAcompañanteCovid();
            let serv = parseFloat(this.form.serv);

            if (consulta) {
                let nit = this.info.usuar.NIT;

                if ([900541158, 900405505].includes(nit) && serv == 09) {

                    this._inicializarAcompañanteCovid();
                    this._vetanaSintomaticoRespiratorio();
                } else if ([1, 2, 8, 9, 63].includes(serv)) {
                    this.params_hc890h.pregunta = 3;
                    this.params_hc890h.estado = true;
                } else {
                    this._inicializarAcompañanteCovid();
                    this._vetanaSintomaticoRespiratorio();
                }
            } else {
                this._inicializarAcompañanteCovid();
                this._vetanaSintomaticoRespiratorio();
            }
        },
        _inicializarAcompañanteCovid() {
            this.form.covid19.acompanante_covid19 = modular.getObjRegHC.covid19.acompanante_covid19;
            this.form.covid19.consenti_acomp_covid19 = "N";
        },

        _vetanaSintomaticoRespiratorio() {
            if (this.sw_var.sintomatico) {
                this.params_hc890d.estado = true;
                this.params_hc890d.unserv = this.form.cierre.unserv;
                this.params_hc890d.finalidad = this.form.rips.finalid;
                this.params_hc890d.sexo = this.info.paciente.SEXO;
            } else {
                this._validar_barthel()
            }
        },

        validarEsc_sintomatico() {
            this.params_hc890d.estado = false;
            this._validarDiagnosticos();
        },

        validarCallback_sintomatico(data) {
            let { signos } = this.form;

            Object.getOwnPropertyNames(data).forEach(val => {
                if (val == "sintom_resp") {
                    signos.sintom_respi = data[val]
                } else signos[val] = data[val];
            })

            this.params_hc890d.estado = false;
            this._validar_barthel();
        },

        _validar_barthel() {
            if (this.sw_var.barthel) {
                this.params_hc890b.estado = 1
                scrollProsoft("div_barthel", "smooth", "start");
            } else {
                this.validarFindrisk()
            }
        },
        _validarEsc_barthel() {
            this.params_hc890b.estado = false
            this._validarDiagnosticos();
        },

        _validarCallback_barthel() {
            if (this.params_hc890b.estado == 1) {
                this.params_hc890b.estado = false;
                this._validarkarnosky()
            } else {
                this.params_hc890b.estado = false;
                this.validarFindrisk()
            }
        },

        _validarkarnosky() {
            if (this.sw_var.karnosky) {
                this.params_hc890c.estado = true
                scrollProsoft("div_karnosky", "smooth", "start");
            } else {
                this.validarDependFuncional()
            }
        },

        _validarEsc_karnosky() {
            this.params_hc890c.estado = false;
            this._validarDiagnosticos();
        },

        validarDependFuncional() {
            this.params_hc890c.estado = false;
            if (this.sw_var.barthel) {
                this.params_hc890b.estado = 2
            } else {
                this.ventanaFindrisk()
            }
        },

        validarFindrisk() {
            if (this.sw_var.karnosky) {
                this._validarVentanaHeridasEvaluar();
            } else if (this.sw_var.findrisk) {
                this.datos_findrisk.vlr_edad_lnk = this.form.edad.vlr_edad

                this.datos_findrisk.peso_lnk = this.form.signos.peso
                this.datos_findrisk.talla_lnk = this.form.signos.talla
                this.datos_findrisk.imc_lnk = this.form.signos.imc_corp
                this.datos_findrisk.per_abdo_lnk = this.form.signos.per_abdo
                this.datos_findrisk.tens1_lnk = this.form.signos.tens1;

                this.ventanaFindrisk();
            } else {
                this._validarVentanaHeridasEvaluar();
            }
        },

        ventanaFindrisk() {
            setTimeout(() => {
                this.params_hc890e.estado = true;
            }, 300);
        },

        validarEsc_findrisk() {
            this.params_hc890e.estado = false;
            this._validarDiagnosticos();
        },

        validarCallback_findrisk(data) {
            this.params_hc890e.estado = false
            this.form.requiere_findrisk = data.requiere_findrisk;
            this._validarVentanaHeridasEvaluar();
        },

        _validarVentanaHeridasEvaluar() {
            if (this.form.cierre.unserv == '09') {
                this.params_hc890f.modal = true;
                this._ventanaHeridasEvaluar();
            } else {
                this._validarVentanaCreatinina();
            }
        },

        _ventanaHeridasEvaluar() {
            validarInputs(
                {
                    form: "#evaluarHeridas",
                    orden: "1"
                },
                () => {
                    this.params_hc890f.modal = false;
                    this._validarDiagnosticos();
                },
                async () => {
                    let heridas = this.params_hc890f.heridas || "";
                    heridas = heridas.toUpperCase();
                    this.params_hc890f.heridas = heridas

                    if (heridas == "S") {
                        setTimeout(() => {
                            this.params_hc890f.estado = true;
                        }, 150);
                    } else if (heridas == "N") {
                        this.params_hc890f.modal = false;
                        this.params_hc890f.estado = false;
                        this._validarVentanaCreatinina();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this._ventanaHeridasEvaluar();
                    }
                }
            );
        },

        validarEsc_heridas() {
            this.params_hc890f.estado = false;
            this._ventanaHeridasEvaluar();
        },

        validarCallback_heridas(data) {
            this.params_hc890f.modal = false;
            this.params_hc890f.estado = false
            this._validarVentanaCreatinina();
        },

        _validarVentanaCreatinina() {
            let nit = this.info.usuar.NIT;
            let unserv = parseFloat(this.form.cierre.unserv) || 0;
            let finalidad = this.form.rips.finalid;
            let cronico = this.info.paciente.CRONICO;

            if ([800037021, 900306771].includes(nit)) {
                this._initCreatinina()
            } else {
                if (cronico == "S") {
                    if (
                        (unserv == 08 &&
                            ([10, 11].includes(finalidad) ||
                                (nit == 844003225 && [05, 07].includes(finalidad)))) ||
                        unserv == 02
                    ) {
                        this._initCreatinina()
                    } else {
                        this.ventana_soloCronico();
                    }
                } else {
                    this.ventana_soloCronico();
                }
            }
        },

        _validarEsc_creatinina() {
            this.params_hc890a.modal = false;
            this._validarDiagnosticos();
        },

        _initCreatinina() {
            let fecha = this.form.fecha;
            let peso = this.form.signos.peso || "";
            let vlr_edad = this.form.edad.vlr_edad.toString() || "";
            let form = { ...this.form };

            let creatinina2 = form.signos.creatinina2;
            let hemo_glicosilada = form.signos.hemo_glicosilada;
            let hemo_glico_fecha = form.signos.hemo_glico_fecha;
            let microalbuminuria = form.signos.microalbuminuria;
            let fecha_microalbuminuria = form.signos.fecha_microalbuminuria;

            let riesgo_cardio = form.signos.riesgo_cardio;
            let rela_albumi_creatini_1 = form.signos.rela_albumi_creatini_1
            let rela_albumi_creatini_2 = form.signos.rela_albumi_creatini_2
            let erc = form.signos.erc;
            let fecha_dx_erc = form.signos.fecha_dx_erc;

            let fecha_creatinina = form.signos.fecha_creatinina || "";
            let estadio_erc = form.signos.estadio_erc || "";

            this.datos_creatinina = {
                fecha: fecha,
                peso: peso,
                edad: vlr_edad,
                unserv: form.cierre.unserv,
                tabla_diagn: form.rips.tabla_diagn,

                creatinina2: creatinina2,
                hemo_glicosilada: hemo_glicosilada,
                hemo_glico_fecha: hemo_glico_fecha,
                microalbuminuria: microalbuminuria,
                fecha_microalbuminuria: fecha_microalbuminuria,
                riesgo_cardio: riesgo_cardio,
                rela_albumi_creatini_1: rela_albumi_creatini_1,
                rela_albumi_creatini_2: rela_albumi_creatini_2,
                erc: erc,
                fecha_dx_erc: fecha_dx_erc,
                fecha_creatinina: fecha_creatinina,
                estadio_erc: estadio_erc,
            };

            this.params_hc890a.modal = true;
        },

        _validarCallback_creatinina(data) {
            this.form.signos.creatinina2 = data.creatinina2;
            this.form.signos.hemo_glicosilada = data.hemo_glicosilada;
            this.form.signos.hemo_glico_fecha = data.hemo_glico_fecha;
            this.form.signos.microalbuminuria = data.microalbuminuria;
            this.form.signos.fecha_microalbuminuria = data.fecha_microalbuminuria;
            this.form.signos.riesgo_cardio = data.riesgo_cardio;
            this.form.signos.rela_albumi_creatini_1 = data.rela_albumi_creatini_1;
            this.form.signos.rela_albumi_creatini_2 = data.rela_albumi_creatini_2;
            this.form.signos.erc = data.erc;
            this.form.signos.fecha_dx_erc = data.fecha_dx_erc;
            this.form.signos.fecha_creatinina = data.fecha_creatinina;
            this.form.signos.estadio_erc = data.estadio_erc;

            this.params_hc890a.modal = false;
            this.params_hc890a.estado = false;
            this.ventana_soloCronico();
        },

        ventana_soloCronico() {
            let cronico = this.info.paciente.CRONICO;
            if (cronico == "S") {
                this.ventanaPacienteCronico = true;

                this.descrip.ano_diagDm = this.form.datos_cronic_2.fecha_diag_dm.substring(0, 4);
                this.descrip.mes_diagDm = this.form.datos_cronic_2.fecha_diag_dm.substring(4, 6);
                this.descrip.dia_diagDm = this.form.datos_cronic_2.fecha_diag_dm.substring(6, 8);

                this.descrip.ano_diagHta = this.form.datos_cronic_2.fecha_diag_hta.substring(0, 4);
                this.descrip.mes_diagHta = this.form.datos_cronic_2.fecha_diag_hta.substring(4, 6);
                this.descrip.dia_diagHta = this.form.datos_cronic_2.fecha_diag_hta.substring(6, 8);

                this.descrip.ano_ingProg = this.form.datos_cronic_2.fecha_prog_cro.substring(0, 4);
                this.descrip.mes_ingProg = this.form.datos_cronic_2.fecha_prog_cro.substring(4, 6);
                this.descrip.dia_ingProg = this.form.datos_cronic_2.fecha_prog_cro.substring(6, 8);

                switch (this.form.datos_cronic_2.ieca) {
                    case '01': this.descrip.descripRecibeIeca = 'SI RECIBE'; break;
                    case '02': this.descrip.descripRecibeIeca = 'NO FUE FORMULADO DENTRO DEL PLAN TERAPEUTICO'; break;
                    case '03': this.descrip.descripRecibeIeca = 'NO RECIBE, AUNQUE FUE FORMULADO DENTRO DEL PLAN'; break;
                    case '98': this.descrip.descripRecibeIeca = 'NO APLICA, PACIENTE CON ERC SIN HTA NI DM'; break;
                }

                switch (this.form.datos_cronic_2.araii) {
                    case '01': this.descrip.descripRecibeAraii = 'SI RECIBE'; break;
                    case '02': this.descrip.descripRecibeAraii = 'NO FUE FORMULADO DENTRO DEL PLAN TERAPEUTICO'; break;
                    case '03': this.descrip.descripRecibeAraii = 'NO RECIBE, AUNQUE FUE FORMULADO DENTRO DEL PLAN'; break;
                    case '98': this.descrip.descripRecibeAraii = 'NO APLICA, PACIENTE CON ERC SIN HTA NI DM'; break;
                }

                this.dato_expTabaco();
            } else {
                this._validarMultidrogoresistente()
            }
        },

        dato_expTabaco() {
            validarInputs(
                {
                    form: '#expTabaco',
                    orden: "1"
                },
                () => {
                    this.ventanaPacienteCronico = false;
                    this._validarDiagnosticos();
                }, () => {
                    let exp_tabaco = this.form.cierre.paciente_cronic.exp_tabaco || "";
                    exp_tabaco = exp_tabaco.toUpperCase()

                    if (["S", "N"].includes(exp_tabaco)) {
                        this.form.cierre.paciente_cronic.exp_tabaco = exp_tabaco
                        this.dato_fuma();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_expTabaco();
                    }
                })
        },

        dato_fuma() {
            validarInputs(
                {
                    form: '#fumaActualmente',
                    orden: "1"
                },
                () => {
                    this.dato_expTabaco();
                },
                () => {
                    let fuma = this.form.cierre.paciente_cronic.fuma || "";
                    fuma = fuma.toUpperCase()

                    if (["S", "N"].includes(fuma)) {
                        this.form.cierre.paciente_cronic.fuma = fuma
                        this.dato_humoLeña();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_fuma();
                    }
                })
        },

        dato_humoLeña() {
            validarInputs(
                {
                    form: '#expoHumoLeña',
                    orden: "1"
                },
                () => {
                    this.dato_fuma();
                },
                () => {
                    let humo_lena = this.form.cierre.paciente_cronic.humo_lena || "";
                    humo_lena = humo_lena.toUpperCase()

                    if (["S", "N"].includes(humo_lena)) {
                        this.form.cierre.paciente_cronic.humo_lena = humo_lena;
                        this.dato_alcohol();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_humoLeña();
                    }
                })
        },

        dato_alcohol() {
            validarInputs(
                {
                    form: '#alcohol'
                },
                () => {
                    this.dato_humoLeña();
                },
                () => {
                    let alcohol = this.form.cierre.paciente_cronic.alcohol || "";
                    alcohol = alcohol.toUpperCase()

                    if (["S", "N"].includes(alcohol)) {
                        this.form.cierre.paciente_cronic.alcohol = alcohol
                        this.dato_sedentarismo();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_alcohol();
                    }
                })
        },

        dato_sedentarismo() {
            validarInputs(
                {
                    form: '#sedentarismo'
                },
                () => {
                    this.dato_alcohol();
                },
                () => {
                    let sedentarismo = this.form.cierre.paciente_cronic.sedentarismo || "";
                    sedentarismo = sedentarismo.toUpperCase()
                    if (["S", "N"].includes(sedentarismo)) {
                        this.form.cierre.paciente_cronic.sedentarismo = sedentarismo
                        this.dato_diagDm();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_sedentarismo();
                    }
                })
        },

        dato_diagDm() {
            validarInputs(
                {
                    form: '#diagDm',
                    orden: "1"
                },
                () => {
                    this.dato_sedentarismo();
                },
                () => {
                    let diag_dm = this.form.datos_cronic_2.diag_dm || "";
                    diag_dm = diag_dm.toUpperCase()

                    if (diag_dm == 'S') {
                        this.form.datos_cronic_2.diag_dm = diag_dm

                        this.descrip.ano_diagDm = this.fecha_actual.substring(0, 4);
                        this.descrip.mes_diagDm = this.fecha_actual.substring(4, 6);
                        this.dato_anoDiagDm();
                    } else if (diag_dm == 'N') {
                        this.form.datos_cronic_2.diag_dm = diag_dm

                        this.descrip.ano_diagDm = 0;
                        this.descrip.mes_diagDm = 0;
                        this.descrip.dia_diagDm = 0;
                        this.form.datos_cronic_2.fecha_diag_dm = '';
                        this.dato_diagHta();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_diagDm();
                    }
                })
        },

        dato_anoDiagDm() {
            validarInputs(
                {
                    form: '#ano_diagDm',
                    orden: "1"
                },
                () => {
                    this.dato_diagDm();
                },
                () => {
                    let ano = parseInt(this.descrip.ano_diagDm);
                    if (ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_anoDiagDm();
                    } else {
                        this.descrip.bisiesto = _validarBisiesto(ano);
                        this.dato_mesDiagDm();
                    }
                })
        },

        dato_mesDiagDm() {
            validarInputs(
                {
                    form: '#mes_diagDm',
                    orden: "1"
                },
                () => {
                    this.dato_anoDiagDm();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_diagDm);

                    if (mes > 12 || mes == 0 || mes < 0) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesDiagDm();
                    } else {
                        this.descrip.mes_diagDm = cerosIzq(this.descrip.mes_diagDm, 2);
                        this.dato_diaDiagDm();
                    }
                })
        },

        dato_diaDiagDm() {
            validarInputs({
                form: '#dia_diagDm'
            }, () => {
                this.dato_mesDiagDm();
            }, () => {
                var ano = parseInt(this.descrip.ano_diagDm);
                var mes = parseInt(this.descrip.mes_diagDm);
                var dia = parseInt(this.descrip.dia_diagDm);

                if (((mes == 01 || mes == 03 || mes == 05 || mes == 07 || mes == 08 || mes == 10 || mes == 12) && (dia < 01 && dia < 31))
                    || ((mes == 04 || mes == 06 || mes == 09 || mes == 11) && (dia < 01 && dia < 30))
                    || (mes == 02 && this.descrip.bisiesto && (dia < 01 && dia < 29))
                    || (mes == 02 && !this.descrip.bisiesto && (dia < 01 && dia < 28))) {
                    CON851('37', '37', null, 'error', 'error')
                    this.dato_diaDiagDm();
                } else {
                    this.descrip.dia_diagDm = cerosIzq(this.descrip.dia_diagDm, 2);
                    this.form.datos_cronic_2.fecha_diag_dm = `${this.descrip.ano_diagDm}${this.descrip.mes_diagDm}${this.descrip.dia_diagDm}`;
                    this.dato_diagHta();
                }
            })
        },

        dato_diagHta() {
            validarInputs(
                {
                    form: '#diagHta',
                    orden: "1"
                },
                () => {
                    this.dato_diagDm();
                },
                () => {
                    let diag_hta = this.form.datos_cronic_2.diag_hta || "";
                    diag_hta = diag_hta.toUpperCase()

                    if (diag_hta == 'S') {
                        this.form.datos_cronic_2.diag_hta = diag_hta

                        this.descrip.ano_diagHta = this.fecha_actual.substring(0, 4);
                        this.descrip.mes_diagHta = this.fecha_actual.substring(4, 6);
                        this.dato_anoDiagHta();
                    } else if (diag_hta == 'N') {
                        this.form.datos_cronic_2.diag_hta = diag_hta

                        this.descrip.ano_diagHta = 0;
                        this.descrip.mes_diagHta = 0;
                        this.descrip.dia_diagHta = 0;
                        this.form.datos_cronic_2.fecha_diag_hta = '';
                        this.dato_progCro();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_diagHta();
                    }
                })
        },

        dato_anoDiagHta() {
            validarInputs(
                {
                    form: '#ano_diagHta',
                    orden: "1"
                },
                () => {
                    this.dato_diagHta();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_diagHta);
                    if (ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_anoDiagHta();
                    } else {
                        this.descrip.bisiesto = _validarBisiesto(ano);
                        this.dato_mesDiagHta();
                    }
                })
        },

        dato_mesDiagHta() {
            validarInputs(
                {
                    form: '#mes_diagHta',
                    orden: "1"
                },
                () => {
                    this.dato_anoDiagHta();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_diagHta);
                    if (mes > 12 || mes == 0 || mes < 0) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesDiagHta();
                    } else {
                        this.descrip.mes_diagHta = cerosIzq(this.descrip.mes_diagHta, 2);
                        this.dato_diaDiagHta();
                    }
                })
        },

        dato_diaDiagHta() {
            validarInputs(
                {
                    form: '#dia_diagHta',
                    orden: "1"
                },
                () => {
                    this.dato_mesDiagHta();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_diagHta);
                    var mes = parseInt(this.descrip.mes_diagHta);
                    var dia = parseInt(this.descrip.dia_diagHta);

                    if (((mes == 01 || mes == 03 || mes == 05 || mes == 07 || mes == 08 || mes == 10 || mes == 12) && (dia < 01 && dia < 31))
                        || ((mes == 04 || mes == 06 || mes == 09 || mes == 11) && (dia < 01 && dia < 30))
                        || (mes == 02 && this.descrip.bisiesto && (dia < 01 && dia < 29))
                        || (mes == 02 && !this.descrip.bisiesto && (dia < 01 && dia < 28))) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaDiagHta();
                    } else {
                        this.descrip.dia_diagHta = cerosIzq(this.descrip.dia_diagHta, 2);
                        this.form.datos_cronic_2.fecha_diag_hta = `${this.descrip.ano_diagHta}${this.descrip.mes_diagHta}${this.descrip.dia_diagHta}`;
                        this.dato_progCro();
                    }
                })
        },

        dato_progCro() {
            validarInputs(
                {
                    form: '#progCronicos',
                    orden: "1"
                },
                () => {
                    this.dato_diagHta();
                },
                () => {
                    let prog_cro = this.form.datos_cronic_2.prog_cro || "";
                    prog_cro = prog_cro.toUpperCase()

                    if (prog_cro == 'S') {
                        this.form.datos_cronic_2.prog_cro = prog_cro

                        this.descrip.ano_ingProg = this.fecha_actual.substring(0, 4);
                        this.descrip.mes_ingProg = this.fecha_actual.substring(4, 6);
                        this.dato_anoProgCro();
                    } else if (prog_cro == 'N') {
                        this.form.datos_cronic_2.prog_cro = prog_cro

                        this.descrip.ano_ingProg = 0;
                        this.descrip.mes_ingProg = 0;
                        this.descrip.dia_ingProg = 0;
                        this.form.datos_cronic_2.fecha_prog_cro = '';
                        this.dato_ieca();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_progCro();
                    }
                })
        },

        dato_anoProgCro() {
            validarInputs(
                {
                    form: '#ano_ingProg',
                    orden: "1"
                },
                () => {
                    this.dato_progCro();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_ingProg);
                    if (ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_anoProgCro();
                    } else {
                        this.descrip.bisiesto = _validarBisiesto(ano);
                        this.dato_mesProgCro();
                    }
                })
        },

        dato_mesProgCro() {
            validarInputs(
                {
                    form: '#mes_ingProg',
                    orden: "1"
                },
                () => {
                    this.dato_anoProgCro();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_ingProg);
                    if (mes > 12 || mes == 0 || mes < 0) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesProgCro();
                    } else {
                        this.descrip.mes_ingProg = cerosIzq(this.descrip.mes_ingProg, 2);
                        this.dato_diaProgCro();
                    }
                })
        },

        dato_diaProgCro() {
            validarInputs(
                {
                    form: '#dia_ingProg',
                    orden: "1"
                },
                () => {
                    this.dato_mesProgCro();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_ingProg);
                    var mes = parseInt(this.descrip.mes_ingProg);
                    var dia = parseInt(this.descrip.dia_ingProg);

                    if (((mes == 01 || mes == 03 || mes == 05 || mes == 07 || mes == 08 || mes == 10 || mes == 12) && (dia < 01 && dia < 31))
                        || ((mes == 04 || mes == 06 || mes == 09 || mes == 11) && (dia < 01 && dia < 30))
                        || (mes == 02 && this.descrip.bisiesto && (dia < 01 && dia < 29))
                        || (mes == 02 && !this.descrip.bisiesto && (dia < 01 && dia < 28))) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaProgCro();
                    } else {
                        this.descrip.dia_ingProg = cerosIzq(this.descrip.dia_ingProg, 2);
                        this.form.datos_cronic_2.fecha_prog_cro = `${this.descrip.ano_ingProg}${this.descrip.mes_ingProg}${this.descrip.dia_ingProg}`;
                        this.dato_progCroTrr();
                    }
                })
        },

        dato_progCroTrr() {
            validarInputs(
                {
                    form: '#pacienTrr',
                    orden: "1"
                },
                () => {
                    this.dato_progCro();
                },
                () => {
                    let prog_cro_trr = this.form.datos_cronic_2.prog_cro_trr || "";
                    prog_cro_trr = prog_cro_trr.toUpperCase()

                    if (["S", "N"].includes(prog_cro_trr)) {
                        this.form.datos_cronic_2.prog_cro_trr = prog_cro_trr
                        this.dato_inasProgCro();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_progCroTrr();
                    }
                })
        },

        dato_inasProgCro() {
            validarInputs(
                {
                    form: '#pteIngreAsist',
                    orden: "1"
                },
                () => {
                    this.dato_progCroTrr();
                },
                () => {
                    let inas_prog_cro = this.form.datos_cronic_2.inas_prog_cro || "";

                    if (["S", "N"].includes(inas_prog_cro)) {
                        this.form.datos_cronic_2.inas_prog_cro = inas_prog_cro
                        this.dato_ieca();
                    } else {
                        CON851('03', '03', null, 'error', 'error')
                        this.dato_inasProgCro();
                    }
                })
        },

        dato_ieca() {
            let select = 0;

            if (this.form.datos_cronic_2.ieca == '98') {
                select = 4
            } else {
                select = parseInt(this.form.datos_cronic_2.ieca);
            }
            POPUP(
                {
                    titulo: "Respuesta IECA",
                    indices: [{ id: "value", label: "text" }],
                    array: modular.arrays.resp_Ieca_araii,
                    seleccion: select,
                    callback_f: () => {
                        setTimeout(() => { this.dato_progCro(); }, 200)
                    },
                },
                (data) => {
                    var dato_w = parseInt(data.value);
                    if (dato_w == 4) {
                        this.form.datos_cronic_2.ieca = 98;
                    } else {
                        this.form.datos_cronic_2.ieca = dato_w;
                    }
                    this.descrip.descripRecibeIeca = data.text;
                    setTimeout(() => { this.dato_araii(); }, 200);
                }
            );
        },

        dato_araii() {
            let select = 0;
            if (this.form.datos_cronic_2.araii == '98') {
                select = 4
            } else {
                select = parseInt(this.form.datos_cronic_2.araii);
            }
            POPUP(
                {
                    titulo: "Respuesta ARAII",
                    indices: [{ id: "value", label: "text" }],
                    array: modular.arrays.resp_Ieca_araii,
                    seleccion: select,
                    callback_f: () => {
                        setTimeout(() => { this.dato_ieca(); }, 200)
                    },
                },
                (data) => {
                    var dato_w = parseInt(data.value);
                    if (dato_w == 4) {
                        this.form.datos_cronic_2.araii = 98;
                    } else {
                        this.form.datos_cronic_2.araii = dato_w;
                    }
                    this.descrip.descripRecibeAraii = data.text;
                    this.ventanaPacienteCronico = false;
                    setTimeout(() => { this.validar_ventanaFechaCronic(); }, 200);
                }
            );
        },

        validar_ventanaFechaCronic() {
            this.ventanaValoradoPorCronic = true;
            this.dato_añoMi();
        },

        dato_añoMi() {
            validarInputs(
                {
                    form: '#ano_mi',
                    orden: "1"
                },
                () => {
                    this.ventanaValoradoPorCronic = false;
                    this.ventana_soloCronico();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_mi);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoMi();
                    } else if (ano == 0) {
                        this.descrip.ano_mi = 0;
                        this.descrip.mes_mi = 0;
                        this.descrip.dia_mi = 0;
                        this.form.cierre.fecha_mi = '00000000';
                        this.dato_añoEndocri();
                    } else {
                        this.dato_mesMi();
                    }
                }
            )
        },

        dato_mesMi() {
            validarInputs(
                {
                    form: '#mes_mi',
                    orden: "1"
                },
                () => {
                    this.dato_añoMi();
                },
                () => {
                    let mes = parseInt(this.descrip.mes_mi);

                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesMi();
                    } else {
                        this.descrip.mes_mi = cerosIzq(this.descrip.mes_mi, 2);
                        this.dato_diaMi();
                    }
                }
            )
        },

        dato_diaMi() {
            validarInputs(
                {
                    form: '#dia_mi',
                    orden: "1"
                },
                () => {
                    this.dato_mesMi();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_mi);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaMi();
                    } else {
                        this.descrip.dia_mi = cerosIzq(this.descrip.dia_mi, 2);

                        this.form.cierre.fecha_mi = `${this.descrip.ano_mi}${this.descrip.mes_mi}${this.descrip.dia_mi}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_mi);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoMi();
                        } else {
                            this.dato_añoEndocri();
                        }
                    }
                })
        },

        dato_añoEndocri() {
            validarInputs(
                {
                    form: '#ano_endocri',
                    orden: "1"
                },
                () => {
                    this.dato_añoMi();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_endocri);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoEndocri();
                    } else if (ano == 0) {
                        this.descrip.ano_endocri = 0;
                        this.descrip.mes_endocri = 0;
                        this.descrip.dia_endocri = 0;
                        this.form.cierre.fecha_emdocro = '0';
                        this.dato_añoCardio();
                    } else {
                        this.dato_mesEndocri();
                    }
                }
            )
        },

        dato_mesEndocri() {
            validarInputs(
                {
                    form: '#mes_endocri',
                    orden: "1"
                },
                () => {
                    this.dato_añoEndocri();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_endocri);
                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesEndocri();
                    } else {
                        this.descrip.mes_endocri = cerosIzq(this.descrip.mes_endocri, 2);
                        this.dato_diaEndocri();
                    }
                }
            )
        },

        dato_diaEndocri() {
            validarInputs(
                {
                    form: '#dia_endocri',
                    orden: "1"
                },
                () => {
                    this.dato_mesEndocri();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_endocri);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaEndocri();
                    } else {
                        this.descrip.dia_endocri = cerosIzq(this.descrip.dia_endocri, 2);

                        this.form.cierre.fecha_emdocro = `${this.descrip.ano_endocri}${this.descrip.mes_endocri}${this.descrip.dia_endocri}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_emdocro);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoEndocri();
                        } else {
                            this.dato_añoCardio();
                        }
                    }
                }
            )
        },

        dato_añoCardio() {
            validarInputs(
                {
                    form: '#ano_cardio',
                    orden: "1"
                },
                () => {
                    this.dato_añoEndocri();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_cardio);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoCardio();
                    } else if (ano == 0) {
                        this.descrip.ano_cardio = 0;
                        this.descrip.mes_cardio = 0;
                        this.descrip.dia_cardio = 0;
                        this.form.cierre.fecha_cardio = '00000000';
                        this.dato_añoOftalmol();
                    } else {
                        this.dato_mesCardio();
                    }
                }
            )
        },

        dato_mesCardio() {
            validarInputs(
                {
                    form: '#mes_cardio',
                    orden: "1"
                },
                () => {
                    this.dato_añoCardio();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_cardio);
                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesCardio();
                    } else {
                        this.descrip.mes_cardio = cerosIzq(this.descrip.mes_cardio, 2);
                        this.dato_diaCardio();
                    }
                }
            )
        },

        dato_diaCardio() {
            validarInputs(
                {
                    form: '#dia_cardio',
                    orden: "1"
                },
                () => {
                    this.dato_mesCardio();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_cardio);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaCardio();
                    } else {
                        this.descrip.dia_cardio = cerosIzq(this.descrip.dia_cardio, 2);

                        this.form.cierre.fecha_cardio = `${this.descrip.ano_cardio}${this.descrip.mes_cardio}${this.descrip.dia_cardio}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_cardio);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoCardio();
                        } else {
                            this.dato_añoOftalmol();
                        }
                    }
                }
            )
        },

        dato_añoOftalmol() {
            validarInputs(
                {
                    form: '#ano_oftal',
                    orden: "1"
                },
                () => {
                    this.dato_añoCardio();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_oftal);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoOftalmol();
                    } else if (ano == 0) {
                        this.descrip.ano_oftal = 0;
                        this.descrip.mes_oftal = 0;
                        this.descrip.dia_oftal = 0;
                        this.form.cierre.fecha_oftamol = '00000000';
                        this.dato_añoNefro();
                    } else {
                        this.dato_mesOftalmol();
                    }
                }
            )
        },

        dato_mesOftalmol() {
            validarInputs(
                {
                    form: '#mes_oftal',
                    orden: "1"
                },
                () => {
                    this.dato_añoOftalmol();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_oftal);

                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesOftalmol();
                    } else {
                        this.descrip.mes_oftal = cerosIzq(this.descrip.mes_oftal, 2);
                        this.dato_diaOftalmol();
                    }
                }
            )
        },

        dato_diaOftalmol() {
            validarInputs(
                {
                    form: '#dia_oftal',
                    orden: "1"
                },
                () => {
                    this.dato_mesOftalmol();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_oftal);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaOftalmol();
                    } else {
                        this.descrip.dia_oftal = cerosIzq(this.descrip.dia_oftal, 2);

                        this.form.cierre.fecha_oftamol = `${this.descrip.ano_oftal}${this.descrip.mes_oftal}${this.descrip.dia_oftal}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_oftamol);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoOftalmol();
                        } else {
                            this.dato_añoNefro();
                        }
                    }
                }
            )
        },

        dato_añoNefro() {
            validarInputs(
                {
                    form: '#ano_nefro',
                    orden: "1"
                },
                () => {
                    this.dato_añoOftalmol();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_nefro);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoNefro();
                    } else if (ano == 0) {
                        this.descrip.ano_nefro = 0;
                        this.descrip.mes_nefro = 0;
                        this.descrip.dia_nefro = 0;
                        this.form.cierre.fecha_nefro = '00000000';
                        this.dato_añoPsicol();
                    } else {
                        this.dato_mesNefro();
                    }
                }
            )
        },

        dato_mesNefro() {
            validarInputs(
                {
                    form: '#mes_nefro',
                    orden: "1"
                },
                () => {
                    this.dato_añoNefro();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_nefro);

                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesNefro();
                    } else {
                        this.descrip.mes_nefro = cerosIzq(this.descrip.mes_nefro, 2);
                        this.dato_diaNefro();
                    }
                }
            )
        },

        dato_diaNefro() {
            validarInputs(
                {
                    form: '#dia_nefro',
                    orden: "1"
                },
                () => {
                    this.dato_mesNefro();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_nefro);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaNefro();
                    } else {
                        this.descrip.dia_nefro = cerosIzq(this.descrip.dia_nefro, 2);

                        this.form.cierre.fecha_nefro = `${this.descrip.ano_nefro}${this.descrip.mes_nefro}${this.descrip.dia_nefro}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_nefro);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoNefro();
                        } else {
                            this.dato_añoPsicol();
                        }
                    }
                }
            )
        },

        dato_añoPsicol() {
            validarInputs(
                {
                    form: '#ano_psicol',
                    orden: "1"
                },
                () => {
                    this.dato_añoNefro();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_psicol);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoPsicol();
                    } else if (ano == 0) {
                        this.descrip.ano_psicol = 0;
                        this.descrip.mes_psicol = 0;
                        this.descrip.dia_psicol = 0;
                        this.form.cierre.fecha_psicol = '00000000';
                        this.dato_añoNutri();
                    } else {
                        this.dato_mesPsicol();
                    }
                }
            )
        },

        dato_mesPsicol() {
            validarInputs(
                {
                    form: '#mes_psicol',
                    orden: "1"
                },
                () => {
                    this.dato_añoPsicol();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_psicol);
                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesPsicol();
                    } else {
                        this.descrip.mes_psicol = cerosIzq(this.descrip.mes_psicol, 2);
                        this.dato_diaPsicol();
                    }
                }
            )
        },

        dato_diaPsicol() {
            validarInputs(
                {
                    form: '#dia_psicol',
                    orden: "1"
                },
                () => {
                    this.dato_mesPsicol();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_psicol);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaPsicol();
                    } else {
                        this.descrip.dia_psicol = cerosIzq(this.descrip.dia_psicol, 2);

                        this.form.cierre.fecha_psicol = `${this.descrip.ano_psicol}${this.descrip.mes_psicol}${this.descrip.dia_psicol}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_psicol);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoPsicol();
                        } else {
                            this.dato_añoNutri();
                        }
                    }
                }
            )
        },

        dato_añoNutri() {
            validarInputs(
                {
                    form: '#ano_nutri',
                    orden: "1"
                },
                () => {
                    this.dato_añoPsicol();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_nutri);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoNutri();
                    } else if (ano == 0) {
                        this.descrip.ano_nutri = 0;
                        this.descrip.mes_nutri = 0;
                        this.descrip.dia_nutri = 0;
                        this.form.cierre.fecha_nutri = '00000000';
                        this.dato_añoTrabSoc();
                    } else {
                        this.dato_mesNutri();
                    }
                }
            )
        },

        dato_mesNutri() {
            validarInputs(
                {
                    form: '#mes_nutri',
                    orden: "1"
                },
                () => {
                    this.dato_añoNutri();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_nutri);
                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesNutri();
                    } else {
                        this.descrip.mes_nutri = cerosIzq(this.descrip.mes_nutri, 2);
                        this.dato_diaNutri();
                    }
                }
            )
        },

        dato_diaNutri() {
            validarInputs(
                {
                    form: '#dia_nutri',
                    orden: "1"
                },
                () => {
                    this.dato_mesNutri();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_nutri);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaNutri();
                    } else {
                        this.descrip.dia_nutri = cerosIzq(this.descrip.dia_nutri, 2);

                        this.form.cierre.fecha_nutri = `${this.descrip.ano_nutri}${this.descrip.mes_nutri}${this.descrip.dia_nutri}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_nutri);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoNutri();
                        } else {
                            this.dato_añoTrabSoc();
                        }
                    }
                }
            )
        },

        dato_añoTrabSoc() {
            validarInputs(
                {
                    form: '#ano_trabajoSoc',
                    orden: "1"
                },
                () => {
                    this.dato_añoNutri();
                },
                () => {
                    var ano = parseInt(this.descrip.ano_trabajoSoc);
                    if (ano > 0 && ano < 1950) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_añoNutri();
                    } else if (ano == 0) {
                        this.descrip.ano_trabajoSoc = 0;
                        this.descrip.mes_trabajoSoc = 0;
                        this.descrip.dia_trabajoSoc = 0;
                        this.form.cierre.fecha_trasboc = '00000000';
                        this.ventanaValoradoPorCronic = false;
                        this._validarMultidrogoresistente();
                    } else {
                        this.dato_mesTrabSoc();
                    }
                }
            )
        },

        dato_mesTrabSoc() {
            validarInputs(
                {
                    form: '#mes_trabajoSoc',
                    orden: "1"
                },
                () => {
                    this.dato_añoTrabSoc();
                },
                () => {
                    var mes = parseInt(this.descrip.mes_trabajoSoc);

                    if (mes > 12 || mes < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_mesTrabSoc();
                    } else {
                        this.descrip.mes_trabajoSoc = cerosIzq(this.descrip.mes_trabajoSoc, 2);
                        this.dato_diaTrabSoc();
                    }
                })
        },

        dato_diaTrabSoc() {
            validarInputs(
                {
                    form: '#dia_trabajoSoc',
                    orden: "1"
                },
                () => {
                    this.dato_mesTrabSoc();
                },
                () => {
                    var dia = parseInt(this.descrip.dia_trabajoSoc);

                    if (dia > 31 || dia < 1) {
                        CON851('37', '37', null, 'error', 'error')
                        this.dato_diaTrabSoc();
                    } else {
                        this.descrip.dia_trabajoSoc = cerosIzq(this.descrip.dia_trabajoSoc, 2);

                        this.form.cierre.fecha_trasboc = `${this.descrip.ano_trabajoSoc}${this.descrip.mes_trabajoSoc}${this.descrip.dia_trabajoSoc}`;
                        let fecha_w = parseInt(this.form.cierre.fecha_trasboc);

                        if (fecha_w > this.fecha_actual) {
                            CON851('37', '37', null, 'error', 'error')
                            this.dato_añoTrabSoc();
                        } else {
                            this.ventanaValoradoPorCronic = false;
                            this._validarMultidrogoresistente();
                        }
                    }
                }
            )
        },

        _validarMultidrogoresistente() {
            let codigos_validar = [
                "A150",
                "A159",
            ];

            const intersection = this.form.rips.tabla_diagn.find((e) =>
                codigos_validar.includes(e.cod_diagn)
            );

            if (intersection) {
                this.ventanaMultidrogoresistente = true;
                this.dato_multidrogoresistente();
            } else {
                this._validarEtv();
            }
        },

        dato_multidrogoresistente() {
            validarInputs(
                {
                    form: "#multidrogoresis",
                    orden: "1"
                },
                () => {
                    this._validarDiagnosticos();
                    this.ventanaMultidrogoresistente = false;
                },
                () => {
                    let multidrogoresis = this.form.multidrogoresis || "";
                    multidrogoresis = multidrogoresis.toUpperCase()

                    if (multidrogoresis == 'S') {
                        this.dato_cualMto();
                        this.form.multidrogoresis = multidrogoresis
                    } else if (multidrogoresis == 'N') {

                        this.form.cual_multidrogoresis = '';
                        this.ventanaMultidrogoresistente = false;
                        this._validarEtv();

                        this.form.multidrogoresis = multidrogoresis
                    } else {
                        this.dato_multidrogoresistente();
                        CON851('03', '03', null, 'error', 'error')
                    }
                })
        },

        dato_cualMto() {
            validarInputs(
                {
                    form: "#fasecualMto",
                    orden: "1"
                },
                () => {
                    this.dato_multidrogoresistente();
                },
                () => {
                    let cual_multidrogoresis = this.form.cual_multidrogoresis || ""
                    cual_multidrogoresis = cual_multidrogoresis.toUpperCase();

                    this.form.cual_multidrogoresis = cual_multidrogoresis
                    this.ventanaMultidrogoresistente = false;
                    this._validarEtv();
                })
        },
        _validarEtv() {
            let codigos_validar = [
                "A90",
                "A91",
                "B50",
                "B51",
                "B52",
                "B53",
                "B54",
                "B55",
                "Z260",
            ];

            const intersection = this.form.rips.tabla_diagn.find((e) =>
                codigos_validar.includes(e.cod_diagn)
            );

            if (intersection) {
                this.params_etv.modal = true
                this.dato_resultLabor();
            } else {
                this._validarSifilis()
            }
        },


        dato_resultLabor() {
            validarInputs(
                {
                    form: "#resul_laborat",
                    orden: "1"
                },
                () => {
                    this.params_etv.modal = false
                    this._validarDiagnosticos()
                },
                () => {
                    let text = this.form.cierre.resul_laborat || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.cierre.resul_laborat = text.toUpperCase();
                    this.dato_añoIniTto();
                }
            );
        },

        dato_añoIniTto() {
            validarInputs(
                {
                    form: "#ano_ini_tto",
                    orden: "1"
                },
                () => {
                    this.dato_resultLabor();
                },
                () => {
                    let ano = parseFloat(this.params_etv.fecha_inicio_tto.anio) || 0;
                    let nit_usu = $_USUA_GLOBAL[0].NIT;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoIniTto();
                    } else if ((nit_usu == 900541158 || nit_usu == 900566047) && ano == 0) {
                        this.dato_añoIniTto();
                    } else if (ano == 0) {
                        this.params_etv.fecha_inicio_tto.anio = 0
                        this.params_etv.fecha_inicio_tto.mes = 0
                        this.params_etv.fecha_inicio_tto.dia = 0

                        this.params_etv.fecha_fin_tto.anio = 0
                        this.params_etv.fecha_fin_tto.mes = 0
                        this.params_etv.fecha_fin_tto.dia = 0

                        this.dato_ctlMal3dia();
                    } else {
                        this.dato_mesIniTto();
                    }
                }
            );
        },

        dato_mesIniTto() {
            validarInputs(
                {
                    form: "#mes_ini_tto",
                    orden: "1"
                },
                () => {
                    this.dato_añoIniTto();
                },
                () => {
                    let mes = parseFloat(this.params_etv.fecha_inicio_tto.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesIniTto();
                    } else {
                        this.dato_diaIniTto();
                    }
                }
            );
        },

        dato_diaIniTto() {
            validarInputs(
                {
                    form: "#dia_ini_tto",
                    orden: "1"
                },
                () => {
                    this.dato_mesIniTto();
                },
                () => {
                    let dia = parseFloat(this.params_etv.fecha_inicio_tto.dia) || 0;

                    if (dia > 31 || dia < 1 || dia == 0) {
                        this.dato_diaIniTto();
                    } else {
                        let fecha = this.params_etv.fecha_inicio_tto || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.cierre.fecha_ini_tto = fecha;
                        this.dato_añoFinTto();
                    }
                }
            );
        },

        dato_añoFinTto() {
            validarInputs(
                {
                    form: "#ano_fin_tto",
                    orden: "1"
                },
                () => {
                    this.dato_añoIniTto();
                },
                () => {
                    let ano = parseFloat(this.params_etv.fecha_fin_tto.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoFinTto();
                    } else if (ano == 0) {
                        this.params_etv.fecha_fin_tto.anio = 0
                        this.params_etv.fecha_fin_tto.mes = 0
                        this.params_etv.fecha_fin_tto.dia = 0
                        this.dato_ctlMal3dia();
                    } else {
                        this.dato_mesFinTto();
                    }
                }
            );
        },

        dato_mesFinTto() {
            validarInputs(
                {
                    form: "#mes_fin_tto",
                    orden: "1"
                },
                () => {
                    this.dato_añoFinTto();
                },
                () => {
                    let mes = parseFloat(this.params_etv.fecha_fin_tto.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesFinTto();
                    } else {
                        this.dato_diaFinTto();
                    }
                }
            );
        },

        dato_diaFinTto() {
            validarInputs(
                {
                    form: "#dia_fin_tto",
                    orden: "1"
                },
                () => {
                    this.dato_mesFinTto();
                },
                () => {
                    let dia = parseFloat(this.params_etv.fecha_fin_tto.dia) || 0;

                    if (dia > 31 || dia < 1 || dia == 0) {
                        this.dato_diaIniTto();
                    } else {
                        let fecha = this.params_etv.fecha_fin_tto || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.cierre.fecha_fin_tto = fecha;

                        let fecha_ini = parseFloat(this.form.cierre.fecha_ini_tto);
                        let fecha_fin = parseFloat(this.form.cierre.fecha_fin_tto);

                        if (fecha_fin < fecha_ini) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoFinTto();
                        } else {
                            this.dato_ctlMal3dia();
                        }
                    }
                }
            );
        },

        dato_ctlMal3dia() {
            validarInputs(
                {
                    form: "#ctl_mal_3dia_hc",
                    orden: "1"
                },
                () => {
                    this.dato_añoIniTto();
                },
                () => {
                    let text = this.form.cierre.ctl_mal_3dia_hc || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.cierre.ctl_mal_3dia_hc = text.toUpperCase();
                    this.dato_ctlMal7dia();
                }
            );
        },

        dato_ctlMal7dia() {
            validarInputs(
                {
                    form: "#ctl_mal_7dia_hc",
                    orden: "1"
                },
                () => {
                    this.dato_ctlMal3dia();
                },
                () => {
                    let text = this.form.cierre.ctl_mal_7dia_hc || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.cierre.ctl_mal_7dia_hc = text.toUpperCase();
                    this.dato_ctlMal14dia();
                }
            );
        },

        dato_ctlMal14dia() {
            validarInputs(
                {
                    form: "#ctl_mal_14dia_hc",
                    orden: "1"
                },
                () => {
                    this.dato_ctlMal7dia();
                },
                () => {
                    let text = this.form.cierre.ctl_mal_14dia_hc || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.cierre.ctl_mal_14dia_hc = text.toUpperCase();
                    this.dato_ctlMal45dia();
                }
            );
        },

        dato_ctlMal45dia() {
            validarInputs(
                {
                    form: "#ctl_leis_45dias",
                    orden: "1"
                },
                () => {
                    this.dato_ctlMal14dia();
                },
                () => {
                    let text = this.form.cierre.ctl_leis_45dias || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.cierre.ctl_leis_45dias = text.toUpperCase();
                    this.dato_ctlLeis6meses();
                }
            );
        },

        dato_ctlLeis6meses() {
            validarInputs(
                {
                    form: "#ctl_leis_6meses",
                    orden: "1"
                },
                () => {
                    this.dato_ctlMal45dia();
                },
                () => {
                    let text = this.form.cierre.ctl_leis_6meses || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.cierre.ctl_leis_6meses = text.toUpperCase();

                    this.params_etv.modal = false;
                    this._validarSifilis();
                }
            );
        },

        _validarEsc_sifilis() {
            this._validarDiagnosticos();
            this.params_sifilis.estado = false
        },

        _validarSifilis() {
            let codigos_validar = [
                "A50",
                "A51",
                "A52",
                "A53",
                "A65",
                "I980",
                "B54",
                "M031",
                "N290",
                "N742",
                "O981",
                "R762",
            ];
            const intersection = this.form.rips.tabla_diagn.find((e) =>
                codigos_validar.includes(e.cod_diagn)
            );

            if (intersection) {
                this.params_sifilis.enabled = true
                setTimeout(() => {
                    this.params_sifilis.estado = true
                }, 150);
            } else {
                this._init_anomalias()
            }
        },

        _validarCallback_sifilis() {
            this.params_sifilis.estado = false
            this._init_anomalias();
        },

        _init_anomalias() {
            let codigos_validar = [
                "E00",
                "E03",
                "E25",
                "E32",
                "E70",
                "E71",
                "E72",
                "E74",
                "E75",
                "E76",
                "E77",
                "E78",
                "E79",
                "E80",
                "E83",
                "E84",
                "E85",
                "E88",
                "H90",
                "H91",
                "Q00",
                "Q01",
                "Q02",
                "Q03",
                "Q05",
                "Q35",
                "Q36",
                "Q37",
                "Q41",
                "Q54",
                "Q56",
                "Q60",
                "Q66",
                "Q69",
                "Q70",
                "Q71",
                "Q72",
                "Q77",
                "Q90",
                "Q96",
            ];

            let codigos_validar2 = [
                "E703",
                "H470",
                "H55X",
                "H355",
                "Q042",
                "Q070",
                "Q111",
                "Q112",
                "Q120",
                "Q150",
                "Q160",
                "Q172",
                "Q200",
                "Q203",
                "Q204",
                "Q210",
                "Q211",
                "Q212",
                "Q213",
                "Q220",
                "Q221",
                "Q224",
                "Q225",
                "Q226",
                "Q230",
                "Q231",
                "Q250",
                "Q251",
                "Q262",
                "Q300",
                "Q330",
                "Q390",
                "Q391",
                "Q422",
                "Q423",
                "Q431",
                "Q522",
                "Q614",
                "Q620",
                "Q641",
                "Q645",
                "Q743",
                "Q750",
                "Q780",
                "Q790",
                "Q792",
                "Q793",
                "Q794",
                "Q860",
                "Q894",
                "Q913",
                "Q917",
            ];

            const intersection = this.form.rips.tabla_diagn.find((e) =>
                codigos_validar.includes(e.cod_diagn.slice(0, 3)) || codigos_validar2.includes(e.cod_diagn)
            );

            if (intersection) {
                this.params_hc832a.estado = true;
            } else {
                this.params_hc832a.estado = false;
                this._validarCitologiaAnormal();
            }
        },

        esc_anomalias() {
            this.params_hc832a.estado = false;
            this._validarDiagnosticos()
        },

        callback_anomalias(data) {
            this.form.anomalias_congenitas = { ...data }

            this.params_hc832a.estado = false;
            this._validarCitologiaAnormal()
        },

        _validarCitologiaAnormal() {
            let consulta = this.form.rips.tabla_diagn.find(e => e.cod_diagn == "R876");

            if (consulta) {
                this.params_citolAnorm.modal = true;
                this.dato_colposcopia();
            } else this._validarViolenciaGenero();
        },

        dato_colposcopia() {
            validarInputs(
                {
                    form: "#colposcopia",
                    orden: "1"
                },
                () => {
                    this.params_citolAnorm.modal = false;
                    this._validarDiagnosticos();
                },
                () => {
                    let colposcopia = this.form.citologia_anormal.colposcopia || "N";
                    colposcopia = colposcopia.toUpperCase();

                    if (colposcopia == 'S') {
                        this.form.citologia_anormal.colposcopia = colposcopia;
                        this.dato_añoColpos();
                    } else if (colposcopia == 'N') {
                        this.form.citologia_anormal.colposcopia = colposcopia;
                        this.params_citolAnorm.fecha_colpos.anio = 0
                        this.params_citolAnorm.fecha_colpos.mes = 0
                        this.params_citolAnorm.fecha_colpos.dia = 0
                        this.dato_biopsia();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_colposcopia();
                    }
                }
            );
        },

        dato_añoColpos() {
            validarInputs(
                {
                    form: "#ano_colpos",
                    orden: "1"
                },
                () => {
                    this.dato_colposcopia();
                },
                () => {
                    let ano = parseFloat(this.params_citolAnorm.fecha_colpos.anio) || 0;

                    if (ano >= 0 && ano < 1950) {
                        this.dato_añoColpos();
                    } else {
                        this.dato_mesColpos();
                    }
                }
            );
        },

        dato_mesColpos() {
            validarInputs(
                {
                    form: "#mes_colpos",
                    orden: "1"
                },
                () => {
                    this.dato_añoColpos();
                },
                () => {
                    let mes = parseFloat(this.params_citolAnorm.fecha_colpos.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesColpos();
                    } else {
                        this.dato_diaColpos();
                    }
                }
            );
        },

        dato_diaColpos() {
            validarInputs(
                {
                    form: "#dia_colpos",
                    orden: "1"
                },
                () => {
                    this.dato_mesColpos();
                },
                () => {
                    let dia = parseFloat(this.params_citolAnorm.fecha_colpos.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaColpos();
                    } else {
                        let fecha = this.params_citolAnorm.fecha_colpos || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.citologia_anormal.fecha_colposcopia = fecha;

                        let fecha_colpos = parseFloat(fecha);

                        if (fecha_colpos > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoColpos();
                        } else {
                            this.dato_biopsia();
                        }
                    }
                }
            );
        },

        dato_biopsia() {
            validarInputs(
                {
                    form: "#biopsia",
                    orden: "1"
                },
                () => {
                    this.dato_colposcopia();
                },
                () => {
                    let biopsia = this.form.citologia_anormal.biopsia || "N";
                    biopsia = biopsia.toUpperCase();

                    if (biopsia == 'S') {
                        this.form.citologia_anormal.biopsia = biopsia;
                        this.dato_añoBiopsia();
                    } else if (biopsia == 'N') {
                        this.form.citologia_anormal.biopsia = biopsia;
                        this.params_citolAnorm.fecha_biopsia.anio = 0
                        this.params_citolAnorm.fecha_biopsia.mes = 0
                        this.params_citolAnorm.fecha_biopsia.dia = 0
                        this.dato_añoPatol();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_biopsia();
                    }
                }
            );
        },

        dato_añoBiopsia() {
            validarInputs(
                {
                    form: "#ano_biopsia",
                    orden: "1"
                },
                () => {
                    this.dato_biopsia();
                },
                () => {
                    let ano = parseFloat(this.params_citolAnorm.fecha_biopsia.anio) || 0;

                    if (ano >= 0 && ano < 1950) {
                        this.dato_añoBiopsia();
                    } else {
                        this.dato_mesBiopsia();
                    }
                }
            );
        },

        dato_mesBiopsia() {
            validarInputs(
                {
                    form: "#mes_biopsia",
                    orden: "1"
                },
                () => {
                    this.dato_añoBiopsia();
                },
                () => {
                    let mes = parseFloat(this.params_citolAnorm.fecha_biopsia.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesBiopsia();
                    } else {
                        this.dato_diaBiopsia();
                    }
                }
            );
        },

        dato_diaBiopsia() {
            validarInputs(
                {
                    form: "#dia_biopsia",
                    orden: "1"
                },
                () => {
                    this.dato_mesBiopsia();
                },
                () => {
                    let dia = parseFloat(this.params_citolAnorm.fecha_biopsia.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaBiopsia();
                    } else {
                        let fecha = this.params_citolAnorm.fecha_biopsia || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.citologia_anormal.fecha_biopsia = fecha;

                        let fecha_citol = parseFloat(fecha);

                        if (fecha_citol > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoBiopsia();
                        } else {
                            this.dato_añoPatol();
                        }
                    }
                }
            );
        },

        dato_añoPatol() {
            validarInputs(
                {
                    form: "#ano_patol",
                    orden: "1"
                },
                () => {
                    this.dato_biopsia();
                },
                () => {
                    let ano = parseFloat(this.params_citolAnorm.fecha_patol.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoPatol();
                    } else if (ano == 0) {
                        this.params_citolAnorm.fecha_patol.mes = 0;
                        this.params_citolAnorm.fecha_patol.dia = 0;
                        this.diagCitol();
                    } else {
                        this.dato_mesPatol();
                    }
                }
            );
        },

        dato_mesPatol() {
            validarInputs(
                {
                    form: "#mes_patol",
                    orden: "1"
                },
                () => {
                    this.dato_añoPatol();
                },
                () => {
                    let mes = parseFloat(this.params_citolAnorm.fecha_patol.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesPatol();
                    } else {
                        this.dato_diaPatol();
                    }
                }
            );
        },

        dato_diaPatol() {
            validarInputs(
                {
                    form: "#dia_patol",
                    orden: "1"
                },
                () => {
                    this.dato_mesPatol();
                },
                () => {
                    let dia = parseFloat(this.params_citolAnorm.fecha_patol.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaPatol();
                    } else {
                        let fecha = this.params_citolAnorm.fecha_patol || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.citologia_anormal.fecha_patologia = fecha;

                        let fecha_patol = parseFloat(fecha);

                        if (fecha_patol > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoPatol();
                        } else {
                            this.diagCitol();
                        }
                    }
                }
            );
        },

        diagCitol() {
            validarInputs(
                {
                    form: "#diagn_citologia",
                    orden: "1"
                },
                () => {
                    this.dato_añoPatol();
                },
                () => {
                    let text = this.form.citologia_anormal.diagn_citologia || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.citologia_anormal.diagn_citologia = text.toUpperCase();
                    this.dato_valorMed();
                }
            );
        },

        dato_valorMed() {
            validarInputs(
                {
                    form: "#valoracion_medi",
                    orden: "1"
                },
                () => {
                    this.diagCitol();
                },
                () => {
                    let valoracion_medi = this.form.citologia_anormal.valoracion_medi || "N";
                    valoracion_medi = valoracion_medi.toUpperCase();

                    if (valoracion_medi == 'S') {
                        this.form.citologia_anormal.valoracion_medi = valoracion_medi;
                        this.dato_añoValorMed();
                    } else if (valoracion_medi == 'N') {
                        this.form.citologia_anormal.valoracion_medi = valoracion_medi;
                        this.params_citolAnorm.fecha_valorMedica.anio = 0
                        this.params_citolAnorm.fecha_valorMedica.mes = 0
                        this.params_citolAnorm.fecha_valorMedica.dia = 0
                        this.dato_valorGine();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_valorMed();
                    }
                }
            );
        },

        dato_añoValorMed() {
            validarInputs(
                {
                    form: "#ano_valrMed",
                    orden: "1"
                },
                () => {
                    this.dato_valorMed();
                },
                () => {
                    let ano = parseFloat(this.params_citolAnorm.fecha_valorMedica.anio) || 0;

                    if (ano < 1 && ano < 1950) {
                        this.dato_añoValorMed();
                    } else {
                        this.dato_mesValorMed();
                    }
                }
            );
        },

        dato_mesValorMed() {
            validarInputs(
                {
                    form: "#mes_valrMed",
                    orden: "1"
                },
                () => {
                    this.dato_añoValorMed();
                },
                () => {
                    let mes = parseFloat(this.params_citolAnorm.fecha_valorMedica.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesValorMed();
                    } else {
                        this.dato_diaValorMed();
                    }
                }
            );
        },

        dato_diaValorMed() {
            validarInputs(
                {
                    form: "#dia_valrMed",
                    orden: "1"
                },
                () => {
                    this.dato_mesValorMed();
                },
                () => {
                    let dia = parseFloat(this.params_citolAnorm.fecha_valorMedica.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaValorMed();
                    } else {
                        let fecha = this.params_citolAnorm.fecha_valorMedica || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.citologia_anormal.fecha_valoracion_medi = fecha;

                        let fecha_valorMed = parseFloat(fecha);

                        if (fecha_valorMed > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoValorMed();
                        } else {
                            this.dato_valorGine();
                        }
                    }
                }
            );
        },

        dato_valorGine() {
            validarInputs(
                {
                    form: "#valoracion_gine",
                    orden: "1"
                },
                () => {
                    this.dato_valorMed();
                },
                () => {
                    let valoracion_gine = this.form.citologia_anormal.valoracion_gine || "N";
                    valoracion_gine = valoracion_gine.toUpperCase();

                    if (valoracion_gine == 'S') {
                        this.form.citologia_anormal.valoracion_gine = valoracion_gine;
                        this.dato_añoValorGine();
                    } else if (valoracion_gine == 'N') {
                        this.form.citologia_anormal.valoracion_gine = valoracion_gine;
                        this.params_citolAnorm.fecha_valorGine.anio = 0
                        this.params_citolAnorm.fecha_valorGine.mes = 0
                        this.params_citolAnorm.fecha_valorGine.dia = 0
                        this.dato_controlCitol();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_valorGine();
                    }
                }
            );
        },



        dato_añoValorGine() {
            validarInputs(
                {
                    form: "#ano_vlrGine",
                    orden: "1"
                },
                () => {
                    this.dato_valorGine();
                },
                () => {
                    let ano = parseFloat(this.params_citolAnorm.fecha_valorGine.anio) || 0;

                    if (ano < 1 && ano < 1950) {
                        this.dato_añoValorGine();
                    } else {
                        this.dato_mesValorGine();
                    }
                }
            );
        },

        dato_mesValorGine() {
            validarInputs(
                {
                    form: "#mes_vlrGine",
                    orden: "1"
                },
                () => {
                    this.dato_añoValorGine();
                },
                () => {
                    let mes = parseFloat(this.params_citolAnorm.fecha_valorGine.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesValorGine();
                    } else {
                        this.dato_diaValorGine();
                    }
                }
            );
        },

        dato_diaValorGine() {
            validarInputs(
                {
                    form: "#dia_vlrGine",
                    orden: "1"
                },
                () => {
                    this.dato_mesValorGine();
                },
                () => {
                    let dia = parseFloat(this.params_citolAnorm.fecha_valorGine.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaValorGine();
                    } else {
                        let fecha = this.params_citolAnorm.fecha_valorGine || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.citologia_anormal.fecha_valoracion_gine = fecha;

                        let fecha_valorGine = parseFloat(fecha);

                        if (fecha_valorGine > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoValorGine();
                        } else {
                            this.dato_controlCitol();
                        }
                    }
                }
            );
        },

        dato_controlCitol() {
            validarInputs(
                {
                    form: "#control_citol",
                    orden: "1"
                },
                () => {
                    this.dato_valorGine();
                },
                () => {
                    let control_citol = this.form.citologia_anormal.control_citol || "N";
                    control_citol = control_citol.toUpperCase();

                    if (control_citol == 'S') {
                        this.form.citologia_anormal.control_citol = control_citol;
                        this.dato_añoValorCont();
                    } else if (control_citol == 'N') {
                        this.form.citologia_anormal.control_citol = control_citol;
                        this.params_citolAnorm.fecha_contCitol.anio = 0
                        this.params_citolAnorm.fecha_contCitol.mes = 0
                        this.params_citolAnorm.fecha_contCitol.dia = 0
                        this.dato_añoCancerCuelllo();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_controlCitol();
                    }
                }
            );
        },

        dato_añoValorCont() {
            validarInputs(
                {
                    form: "#ano_contCitol",
                    orden: "1"
                },
                () => {
                    this.dato_valorGine();
                },
                () => {
                    let ano = parseFloat(this.params_citolAnorm.fecha_contCitol.anio) || 0;

                    if (ano < 1 && ano < 1950) {
                        this.dato_añoValorCont();
                    } else {
                        this.dato_mesValorCont();
                    }
                }
            );
        },

        dato_mesValorCont() {
            validarInputs(
                {
                    form: "#mes_contCitol",
                    orden: "1"
                },
                () => {
                    this.dato_añoValorCont();
                },
                () => {
                    let mes = parseFloat(this.params_citolAnorm.fecha_contCitol.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesValorCont();
                    } else {
                        this.dato_diaValorCont();
                    }
                }
            );
        },

        dato_diaValorCont() {
            validarInputs(
                {
                    form: "#dia_contCitol",
                    orden: "1"
                },
                () => {
                    this.dato_mesValorCont();
                },
                () => {
                    let dia = parseFloat(this.params_citolAnorm.fecha_contCitol.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaValorCont();
                    } else {
                        let fecha = this.params_citolAnorm.fecha_contCitol || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.citologia_anormal.fecha_control_citol = fecha;

                        let fecha_contCitol = parseFloat(fecha);

                        if (fecha_contCitol > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoValorCont();
                        } else {
                            this.dato_añoCancerCuelllo();
                        }
                    }
                }
            );
        },

        dato_añoCancerCuelllo() {
            validarInputs(
                {
                    form: "#ano_cancerCuello",
                    orden: "1"
                },
                () => {
                    this.dato_controlCitol();
                },
                () => {
                    let ano = parseFloat(this.params_citolAnorm.fecha_cancerCuello.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoCancerCuelllo();
                    } else if (ano == 0) {
                        this.params_citolAnorm.fecha_cancerCuello.mes = 0;
                        this.params_citolAnorm.fecha_cancerCuello.dia = 0;

                        this._cerrarVentanaCitologiaAnormal()
                    } else {
                        this.dato_mesCancerCuelllo();
                    }
                }
            );
        },

        dato_mesCancerCuelllo() {
            validarInputs(
                {
                    form: "#mes_cancerCuello",
                    orden: "1"
                },
                () => {
                    this.dato_añoCancerCuelllo();
                },
                () => {
                    let mes = parseFloat(this.params_citolAnorm.fecha_cancerCuello.mes) || 0;

                    if (mes < 1 || mes > 12) {
                        this.dato_mesCancerCuelllo();
                    } else {
                        this.dato_diaCancerCuelllo();
                    }
                }
            );
        },

        dato_diaCancerCuelllo() {
            validarInputs(
                {
                    form: "#dia_cancerCuello",
                    orden: "1"
                },
                () => {
                    this.dato_mesCancerCuelllo();
                },
                () => {
                    let dia = parseFloat(this.params_citolAnorm.fecha_cancerCuello.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaCancerCuelllo();
                    } else {
                        let fecha = this.params_citolAnorm.fecha_cancerCuello || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.citologia_anormal.fecha_cancer_cuello = fecha;

                        let fecha_citolAnorm = parseFloat(fecha);

                        if (fecha_citolAnorm > this.fecha_lnk) {
                            CON851("37", "37", null, "error", "error");
                            this.dato_añoCancerCuelllo();
                        } else {
                            this._cerrarVentanaCitologiaAnormal()
                        }
                    }
                }
            );
        },

        _cerrarVentanaCitologiaAnormal() {
            this.params_citolAnorm.modal = false;
            this._validarViolenciaGenero();
        },

        _validarViolenciaGenero() {
            let codigos_validar = [
                "T32",
                "T74",
                "X85",
                "X86",
                "X87",
                "X88",
                "X89",
                "X90",
                "X92",
                "X93",
                "X94",
                "X95",
                "X96",
                "X97",
                "X98",
                "X99",
                "Y00",
                "Y01",
                "Y02",
                "Y03",
                "Y04",
                "Y05",
                "Y06",
                "Y07",
                "Y08",
                "Y09",
                "Y10",
                "Y11",
                "Y12",
                "Y13",
                "Y14",
                "Y15",
                "Y16",
                "Y17",
                "Y18",
                "Y19",
                "Y20",
                "Y21",
                "Y22",
                "Y23",
                "Y24",
                "Y25",
                "Y26",
                "Y27",
                "Y28",
                "Y29",
                "Y30",
                "Y31",
                "Y32",
                "Y33",
                "Y34",
                "Y35",
                "Y36",
                "Y91",

                "T204",
                "T205",
                "T206",
                "T214",
                "T215",
                "T216",
                "T217",
                "T224",
                "T225",
                "T226",
                "T227",
                "T244",
                "T245",
                "T246",
                "T247",
                "T254",
                "T255",
                "T256",
                "T257",
                "T265",
                "T266",
                "T267",
                "T268",
                "T269",
                "T274",
                "T275",
                "T276",
                "T277",
                "T285",
                "T286",
                "T287",
                "T288",
                "T289",
                "T294",
                "T295",
                "T296",
                "T297",
                "T304",
                "T305",
                "T306",
                "T307",
                "T738",
                "T739",
                "X850",
                "Z601",
                "Z610",
                "Z611",
                "Z612",
                "Z613",
                "Z614",
                "Z615",
                "Z616",
                "Z617",
                "Z618",
                "Z619",
                "Z624",
                "Z625",
                "Z630",
                "Z631",
                "Z632",
            ];

            const intersection = this.form.rips.tabla_diagn.find((e) =>
                codigos_validar.includes(e.cod_diagn)
            );

            if (intersection) {
                this.params_violGenero.modal = true
                this.dato_orientacionSex()
            } else {
                this._validarVentanaTrastornos()
            }
        },

        _escapeViolenciaGenero() {
            this.params_violGenero.modal = false;
            this._validarDiagnosticos()
        },

        dato_orientacionSex() {
            let params = {
                titulo: "Orientación sexual",
                array: "orientSexual",
                seleccion: this.form.violencia_gen_esc.orientacion_sex,
                callback_esc: "_escapeViolenciaGenero",
                callback: (data) => {
                    this.form.violencia_gen_esc.orientacion_sex = data.value;
                    this.$refs.orientSex.value = data.text;
                    this.dato_discapacidad();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_discapacidad() {
            let params = {
                titulo: "Presenta discapacidad",
                array: "presentDiscap",
                seleccion: this.form.violencia_gen_esc.discapacidad,
                callback_esc: "dato_orientacionSex",
                callback: (data) => {
                    this.form.violencia_gen_esc.discapacidad = data.value;
                    this.$refs.presentDiscap.value = data.text;
                    this.dato_condicionVulnerab();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_condicionVulnerab() {
            let params = {
                titulo: "Condición vulnerabilidad",
                array: "condicVulnera",
                seleccion: this.form.violencia_gen_esc.vulnerabilidad,
                callback_esc: "dato_discapacidad",
                callback: (data) => {
                    this.form.violencia_gen_esc.vulnerabilidad = data.value;
                    this.$refs.CondVulnerab.value = data.text;
                    this.dato_existeRiesgPsicosocial();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_existeRiesgPsicosocial() {
            let params = {
                titulo: "Existe riesgo psicosocial",
                array: "exisRiesgPsico",
                seleccion: this.form.violencia_gen_esc.riesgo_psicos,
                callback_esc: "dato_condicionVulnerab",
                callback: (data) => {
                    this.form.violencia_gen_esc.riesgo_psicos = data.value;
                    this.$refs.riesgPsico.value = data.text;
                    this.dato_accionesRealizad();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_accionesRealizad() {
            let params = {
                titulo: "Acciones realizadas",
                array: "accionesRealizad",
                seleccion: this.form.violencia_gen_esc.acciones_reali,
                callback_esc: "dato_existeRiesgPsicosocial",
                callback: (data) => {
                    this.form.violencia_gen_esc.acciones_reali = data.value;
                    this.$refs.AccionesReali.value = data.text;
                    this.dato_tipoViolencia();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_tipoViolencia() {
            let params = {
                titulo: "Tipo de violencia",
                array: "tipoViolencia",
                seleccion: this.form.violencia_gen_esc.tipo_violencia,
                callback_esc: "dato_accionesRealizad",
                callback: (data) => {
                    this.form.violencia_gen_esc.tipo_violencia = data.value;
                    this.$refs.tipoViolenc.value = data.text;

                    if (data.value == '1') {
                        this.dato_penetracionAnal();
                    } else {
                        this.form.violencia_gen_esc.penetracion_anal = ''
                        this.dato_dilingViolencia();
                    }
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_penetracionAnal() {
            validarInputs(
                {
                    form: "#penetAnal",
                    orden: "1"
                },
                () => {
                    this.dato_tipoViolencia();
                },
                () => {
                    let penetracion_anal = this.form.violencia_gen_esc.penetracion_anal || "N";
                    penetracion_anal = penetracion_anal.toUpperCase();

                    if (['S', 'N'].includes(penetracion_anal)) {
                        this.form.violencia_gen_esc.penetracion_anal = penetracion_anal;
                        this.dato_dilingViolencia();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_penetracionAnal();
                    }
                }
            );
        },

        dato_dilingViolencia() {
            let params = {
                titulo: "Tipo de violencia",
                array: "dilingTipoViolencia",
                seleccion: this.form.violencia_gen_esc.diligencia_viole,
                callback_esc: "dato_tipoViolencia",
                callback: (data) => {
                    this.form.violencia_gen_esc.diligencia_viole = data.value;
                    this.$refs.dilingViolSex.value = data.text;
                    this.dato_añoRemPsiquiatria();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_añoRemPsiquiatria() {
            validarInputs(
                {
                    form: "#ano_remiPsiq",
                    orden: "1"
                },
                () => {
                    this.dato_dilingViolencia();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero.fecha_remiPsiq.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoRemPsiquiatria();
                    } else if (ano == 0) {
                        this.params_violGenero.fecha_remiPsiq.anio = 0
                        this.params_violGenero.fecha_remiPsiq.mes = 0
                        this.params_violGenero.fecha_remiPsiq.dia = 0
                        this.dato_añoAteMedicGral();
                    } else {
                        this.dato_mesRemPsiquiatria();
                    }
                }
            );
        },

        dato_mesRemPsiquiatria() {
            validarInputs(
                {
                    form: "#mes_remiPsiq",
                    orden: "1"
                },
                () => {
                    this.dato_añoRemPsiquiatria();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero.fecha_remiPsiq.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesRemPsiquiatria();
                    } else {
                        this.dato_diaRemPsiquiatria();
                    }
                }
            );
        },

        dato_diaRemPsiquiatria() {
            validarInputs(
                {
                    form: "#dia_remiPsiq",
                    orden: "1"
                },
                () => {
                    this.dato_mesRemPsiquiatria();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero.fecha_remiPsiq.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaRemPsiquiatria();
                    } else {
                        let fecha = this.params_violGenero.fecha_remiPsiq || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_rem_psiquiatria = fecha;
                        this.dato_añoAteMedicGral();
                    }
                }
            );
        },


        dato_añoAteMedicGral() {
            validarInputs(
                {
                    form: "#ano_atenMedGen",
                    orden: "1"
                },
                () => {
                    this.dato_añoRemPsiquiatria();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero.fecha_atenMedGen.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoAteMedicGral();
                    } else if (ano == 0) {
                        this.params_violGenero.fecha_atenMedGen.anio = 0
                        this.params_violGenero.fecha_atenMedGen.mes = 0
                        this.params_violGenero.fecha_atenMedGen.dia = 0
                        this.dato_trabajoSocial();
                    } else {
                        this.dato_mesAteMedicGral();
                    }
                }
            );
        },

        dato_mesAteMedicGral() {
            validarInputs(
                {
                    form: "#mes_atenMedGen",
                    orden: "1"
                },
                () => {
                    this.dato_añoAteMedicGral();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero.fecha_atenMedGen.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesAteMedicGral();
                    } else {
                        this.dato_diaAteMedicGral();
                    }
                }
            );
        },

        dato_diaAteMedicGral() {
            validarInputs(
                {
                    form: "#dia_atenMedGen",
                    orden: "1"
                },
                () => {
                    this.dato_mesAteMedicGral();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero.fecha_atenMedGen.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaAteMedicGral();
                    } else {
                        let fecha = this.params_violGenero.fecha_atenMedGen || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_ate_medicgral = fecha;
                        this.dato_trabajoSocial();
                    }
                }
            );
        },

        dato_trabajoSocial() {
            validarInputs(
                {
                    form: "#trabSocial",
                    orden: "1"
                },
                () => {
                    this.dato_añoAteMedicGral();
                },
                () => {
                    let trabajo_social = this.form.violencia_gen_esc.trabajo_social || "N";
                    trabajo_social = trabajo_social.toUpperCase();

                    if (['S', 'N'].includes(trabajo_social)) {
                        this.form.violencia_gen_esc.trabajo_social = trabajo_social;
                        this.dato_añoAtePsicologia();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_trabajoSocial();
                    }
                }
            );
        },

        dato_añoAtePsicologia() {
            validarInputs(
                {
                    form: "#ano_atenPsicol",
                    orden: "1"
                },
                () => {
                    this.dato_trabajoSocial();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero.fecha_atenPsicol.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoAtePsicologia();
                    } else if (ano == 0) {
                        this.params_violGenero.fecha_atenPsicol.anio = 0
                        this.params_violGenero.fecha_atenPsicol.mes = 0
                        this.params_violGenero.fecha_atenPsicol.dia = 0
                        this.dato_psicoterapiaIndiv();
                    } else {
                        this.dato_mesAtePsicologia();
                    }
                }
            );
        },

        dato_mesAtePsicologia() {
            validarInputs(
                {
                    form: "#mes_atenPsicol",
                    orden: "1"
                },
                () => {
                    this.dato_añoAtePsicologia();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero.fecha_atenPsicol.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesAtePsicologia();
                    } else {
                        this.dato_diaAtePsicologia();
                    }
                }
            );
        },

        dato_diaAtePsicologia() {
            validarInputs(
                {
                    form: "#dia_atenPsicol",
                    orden: "1"
                },
                () => {
                    this.dato_mesAtePsicologia();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero.fecha_atenPsicol.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaAtePsicologia();
                    } else {
                        let fecha = this.params_violGenero.fecha_atenPsicol || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_ate_psicologia = fecha;
                        this.dato_psicoterapiaIndiv();
                    }
                }
            );
        },

        dato_psicoterapiaIndiv() {
            validarInputs(
                {
                    form: "#PsicoIndivProg",
                    orden: "1"
                },
                () => {
                    this.dato_añoAtePsicologia();
                },
                () => {
                    let psicoterapia_individual = this.form.violencia_gen_esc.psicoterapia_individual || "N";
                    psicoterapia_individual = psicoterapia_individual.toUpperCase();

                    if (['S', 'N'].includes(psicoterapia_individual)) {
                        this.form.violencia_gen_esc.psicoterapia_individual = psicoterapia_individual;
                        this.dato_psicoterapiaIndEjecu();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_psicoterapiaIndiv();
                    }
                }
            );
        },

        dato_psicoterapiaIndEjecu() {
            validarInputs(
                {
                    form: "#PsicoIndivEjec",
                    orden: "1"
                },
                () => {
                    this.dato_psicoterapiaIndiv();
                },
                () => {
                    this.form.violencia_gen_esc.psicoterapia_ind_ejecu = this.form.violencia_gen_esc.psicoterapia_ind_ejecu || 0;
                    this.dato_psicoterapiaFam()
                }
            );
        },

        dato_psicoterapiaFam() {
            validarInputs(
                {
                    form: "#PsicoFamProg",
                    orden: "1"
                },
                () => {
                    this.dato_psicoterapiaIndiv();
                },
                () => {
                    let psicoterapia_familiar = this.form.violencia_gen_esc.psicoterapia_familiar || "N";
                    psicoterapia_familiar = psicoterapia_familiar.toUpperCase();

                    if (['S', 'N'].includes(psicoterapia_familiar)) {
                        this.form.violencia_gen_esc.psicoterapia_familiar = psicoterapia_familiar;
                        this.dato_psicoterapiaFamEjecu();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_psicoterapiaFam();
                    }
                }
            );
        },

        dato_psicoterapiaFamEjecu() {
            validarInputs(
                {
                    form: "#PsicoFamEjec",
                    orden: "1"
                },
                () => {
                    this.dato_psicoterapiaFam();
                },
                () => {
                    this.form.violencia_gen_esc.psicoterapia_fam_ejecu = this.form.violencia_gen_esc.psicoterapia_fam_ejecu || 0;
                    this.dato_añoNotificacion()
                }
            );
        },

        dato_añoNotificacion() {
            validarInputs(
                {
                    form: "#ano_notifi",
                    orden: "1"
                },
                () => {
                    this.dato_psicoterapiaFam();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero.fecha_notifi.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoNotificacion();
                    } else if (ano == 0) {
                        this.params_violGenero.fecha_notifi.anio = 0
                        this.params_violGenero.fecha_notifi.mes = 0
                        this.params_violGenero.fecha_notifi.dia = 0
                        this.dato_prevencionItsVsx();
                    } else {
                        this.dato_mesNotificacion();
                    }
                }
            );
        },

        dato_mesNotificacion() {
            validarInputs(
                {
                    form: "#mes_notifi",
                    orden: "1"
                },
                () => {
                    this.dato_añoNotificacion();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero.fecha_notifi.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesNotificacion();
                    } else {
                        this.dato_diaNotificacion();
                    }
                }
            );
        },

        dato_diaNotificacion() {
            validarInputs(
                {
                    form: "#dia_notifi",
                    orden: "1"
                },
                () => {
                    this.dato_mesNotificacion();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero.fecha_notifi.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaNotificacion();
                    } else {
                        let fecha = this.params_violGenero.fecha_notifi || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_notificacion = fecha;
                        this.dato_prevencionItsVsx();
                    }
                }
            );
        },

        dato_prevencionItsVsx() {
            validarInputs(
                {
                    form: "#prevenItsVsxEmb",
                    orden: "1"
                },
                () => {
                    this.dato_añoNotificacion();
                },
                () => {
                    let prevencion_its_vsx = this.form.violencia_gen_esc.prevencion_its_vsx || "N";
                    prevencion_its_vsx = prevencion_its_vsx.toUpperCase();

                    if (['S', 'N'].includes(prevencion_its_vsx)) {
                        this.form.violencia_gen_esc.prevencion_its_vsx = prevencion_its_vsx;
                        this.dato_anticoncepcionEmer();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_prevencionItsVsx();
                    }
                }
            );
        },

        dato_anticoncepcionEmer() {
            validarInputs(
                {
                    form: "#anticoncepEmer72Hor",
                    orden: "1"
                },
                () => {
                    this.dato_prevencionItsVsx();
                },
                () => {
                    let anticoncepcion_emer = this.form.violencia_gen_esc.anticoncepcion_emer || "N";
                    anticoncepcion_emer = anticoncepcion_emer.toUpperCase();

                    if (['S', 'N'].includes(anticoncepcion_emer)) {
                        this.form.violencia_gen_esc.anticoncepcion_emer = anticoncepcion_emer;
                        this.dato_tipoMetodo();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_anticoncepcionEmer();
                    }
                }
            );
        },

        dato_tipoMetodo() {
            validarInputs(
                {
                    form: "#tipoMetod",
                    orden: "1"
                },
                () => {
                    this.dato_anticoncepcionEmer();
                },
                () => {
                    let tipo_metodo = this.form.violencia_gen_esc.tipo_metodo || "N";
                    tipo_metodo = tipo_metodo.toUpperCase();

                    if (['S', 'N'].includes(tipo_metodo)) {
                        this.form.violencia_gen_esc.tipo_metodo = tipo_metodo;
                        this.dato_asesorConsej();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_tipoMetodo();
                    }
                }
            );
        },

        dato_asesorConsej() {
            validarInputs(
                {
                    form: "#asesoConseIve72Hor",
                    orden: "1"
                },
                () => {
                    this.dato_tipoMetodo();
                },
                () => {
                    let asesoria_consejeria = this.form.violencia_gen_esc.asesoria_consejeria || "N";
                    asesoria_consejeria = asesoria_consejeria.toUpperCase();

                    if (['S', 'N'].includes(asesoria_consejeria)) {
                        this.form.violencia_gen_esc.asesoria_consejeria = asesoria_consejeria;
                        this.dato_aceptConsej();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_asesorConsej();
                    }
                }
            );
        },

        dato_aceptConsej() {
            let params = {
                titulo: "Consejeria Ive",
                array: "consejIve",
                seleccion: this.form.violencia_gen_esc.consejeria_ive,
                callback_esc: "dato_asesorConsej",
                callback: (data) => {
                    this.form.violencia_gen_esc.consejeria_ive = data.value;
                    this.$refs.accionesConsejIve.value = data.text;
                    this.dato_aceptRutaProtec()
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_aceptRutaProtec() {
            let params = {
                titulo: "Ruta protección",
                array: "rutaProteccion",
                seleccion: this.form.violencia_gen_esc.ruta_proteccion,
                callback_esc: "dato_aceptConsej",
                callback: (data) => {
                    this.form.violencia_gen_esc.ruta_proteccion = data.value;
                    this.$refs.activRutaProteccion.value = data.text;
                    this.dato_aceptRutaJusticia()
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_aceptRutaJusticia() {
            let params = {
                titulo: "Ruta justicia",
                array: "rutaJusticia",
                seleccion: this.form.violencia_gen_esc.ruta_justicia,
                callback_esc: "dato_aceptRutaProtec",
                callback: (data) => {
                    this.form.violencia_gen_esc.ruta_justicia = data.value;
                    this.$refs.activRutaJust.value = data.text;

                    this._cerrarVentanaViolenciaGenero()
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        _cerrarVentanaViolenciaGenero() {
            this.params_violGenero.modal = false;

            this.params_violGenero2.modal = true
            this.dato_añoSegRes459Sem2()
        },

        dato_añoSegRes459Sem2() {
            validarInputs(
                {
                    form: "#ano_segSem2",
                    orden: "1"
                },
                () => {
                    this.params_violGenero2.modal = false
                    this._validarDiagnosticos();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero2.fecha_segSem2.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoSegRes459Sem2();
                    } else if (ano == 0) {
                        this.params_violGenero2.fecha_segSem2.anio = 0
                        this.params_violGenero2.fecha_segSem2.mes = 0
                        this.params_violGenero2.fecha_segSem2.dia = 0
                        this.dato_añoSegRes459Sem4();
                    } else {
                        this.dato_mesSegRes459Sem2();
                    }
                }
            );
        },

        dato_mesSegRes459Sem2() {
            validarInputs(
                {
                    form: "#mes_segSem2",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Sem2();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero2.fecha_segSem2.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesSegRes459Sem2();
                    } else {
                        this.dato_diaSegRes459Sem2();
                    }
                }
            );
        },

        dato_diaSegRes459Sem2() {
            validarInputs(
                {
                    form: "#dia_segSem2",
                    orden: "1"
                },
                () => {
                    this.dato_mesSegRes459Sem2();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero2.fecha_segSem2.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaSegRes459Sem2();
                    } else {
                        let fecha = this.params_violGenero2.fecha_segSem2 || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_segui_res459_sem2 = fecha;
                        this.dato_añoSegRes459Sem4();
                    }
                }
            );
        },

        dato_añoSegRes459Sem4() {
            validarInputs(
                {
                    form: "#ano_segSem4",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Sem2();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero2.fecha_segSem4.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoSegRes459Sem4();
                    } else if (ano == 0) {
                        this.params_violGenero2.fecha_segSem4.anio = 0
                        this.params_violGenero2.fecha_segSem4.mes = 0
                        this.params_violGenero2.fecha_segSem4.dia = 0
                        this.dato_añoSegRes459Meses3();
                    } else {
                        this.dato_mesSegRes459Sem4();
                    }
                }
            );
        },

        dato_mesSegRes459Sem4() {
            validarInputs(
                {
                    form: "#mes_segSem4",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Sem4();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero2.fecha_segSem4.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesSegRes459Sem4();
                    } else {
                        this.dato_diaSegRes459Sem4();
                    }
                }
            );
        },

        dato_diaSegRes459Sem4() {
            validarInputs(
                {
                    form: "#dia_segSem4",
                    orden: "1"
                },
                () => {
                    this.dato_mesSegRes459Sem4();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero2.fecha_segSem4.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaSegRes459Sem4();
                    } else {
                        let fecha = this.params_violGenero2.fecha_segSem4 || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_segui_res459_sem4 = fecha;
                        this.dato_añoSegRes459Meses3();
                    }
                }
            );
        },

        dato_añoSegRes459Meses3() {
            validarInputs(
                {
                    form: "#ano_segMes3",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Sem4();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero2.fecha_segMes3.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoSegRes459Meses3();
                    } else if (ano == 0) {
                        this.params_violGenero2.fecha_segMes3.anio = 0
                        this.params_violGenero2.fecha_segMes3.mes = 0
                        this.params_violGenero2.fecha_segMes3.dia = 0
                        this.dato_añoSegRes459Meses6();
                    } else {
                        this.dato_mesSegRes459Meses3();
                    }
                }
            );
        },

        dato_mesSegRes459Meses3() {
            validarInputs(
                {
                    form: "#mes_segMes3",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Meses3();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero2.fecha_segMes3.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesSegRes459Meses3();
                    } else {
                        this.dato_diaSegRes459Meses3();
                    }
                }
            );
        },

        dato_diaSegRes459Meses3() {
            validarInputs(
                {
                    form: "#dia_segMes3",
                    orden: "1"
                },
                () => {
                    this.dato_mesSegRes459Meses3();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero2.fecha_segMes3.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaSegRes459Meses3();
                    } else {
                        let fecha = this.params_violGenero2.fecha_segMes3 || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_segui_res459_3mes = fecha;
                        this.dato_añoSegRes459Meses6();
                    }
                }
            );
        },

        dato_añoSegRes459Meses6() {
            validarInputs(
                {
                    form: "#ano_segMes6",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Meses3();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero2.fecha_segMes6.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoSegRes459Meses6();
                    } else if (ano == 0) {
                        this.params_violGenero2.fecha_segMes6.anio = 0
                        this.params_violGenero2.fecha_segMes6.mes = 0
                        this.params_violGenero2.fecha_segMes6.dia = 0
                        this.dato_añoSegRes459Año1();
                    } else {
                        this.dato_mesSegRes459Meses6();
                    }
                }
            );
        },

        dato_mesSegRes459Meses6() {
            validarInputs(
                {
                    form: "#mes_segMes6",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Meses6();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero2.fecha_segMes6.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesSegRes459Meses6();
                    } else {
                        this.dato_diaSegRes459Meses6();
                    }
                }
            );
        },

        dato_diaSegRes459Meses6() {
            validarInputs(
                {
                    form: "#dia_segMes6",
                    orden: "1"
                },
                () => {
                    this.dato_mesSegRes459Meses6();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero2.fecha_segMes6.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaSegRes459Meses6();
                    } else {
                        let fecha = this.params_violGenero2.fecha_segMes6 || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_segui_res459_6mes = fecha;
                        this.dato_añoSegRes459Año1();
                    }
                }
            );
        },

        dato_añoSegRes459Año1() {
            validarInputs(
                {
                    form: "#ano_seg1ano",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Meses6();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero2.fecha_seg1ano.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoSegRes459Año1();
                    } else if (ano == 0) {
                        this.params_violGenero2.fecha_seg1ano.anio = 0
                        this.params_violGenero2.fecha_seg1ano.mes = 0
                        this.params_violGenero2.fecha_seg1ano.dia = 0
                        this.dato_seguiMenor();
                    } else {
                        this.dato_mesSegRes459Año1();
                    }
                }
            );
        },

        dato_mesSegRes459Año1() {
            validarInputs(
                {
                    form: "#mes_seg1ano",
                    orden: "1"
                },
                () => {
                    this.dato_añoSegRes459Año1();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero2.fecha_seg1ano.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesSegRes459Año1();
                    } else {
                        this.dato_diaSegRes459Año1();
                    }
                }
            );
        },

        dato_diaSegRes459Año1() {
            validarInputs(
                {
                    form: "#dia_seg1ano",
                    orden: "1"
                },
                () => {
                    this.dato_mesSegRes459Año1();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero2.fecha_seg1ano.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaSegRes459Año1();
                    } else {
                        let fecha = this.params_violGenero2.fecha_seg1ano || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_segui_res459_1ano = fecha;
                        this.dato_seguiMenor();
                    }
                }
            );
        },

        dato_seguiMenor() {
            let params = {
                titulo: "Seguimiento al menor maltratado",
                array: "seguiMenorMaltra",
                seleccion: this.form.violencia_gen_esc.seguimiento_menor,
                callback_esc: "dato_añoSegRes459Año1",
                callback: (data) => {
                    this.form.violencia_gen_esc.seguimiento_menor = data.value;
                    this.$refs.segMenorMaltGuia.value = data.text;
                    this.dato_seguiMujer();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_seguiMujer() {
            let params = {
                titulo: "Seguimiento mujer maltratada",
                array: "seguiMujerMaltra",
                seleccion: this.form.violencia_gen_esc.seguimiento_mujer,
                callback_esc: "dato_seguiMenor",
                callback: (data) => {
                    this.form.violencia_gen_esc.seguimiento_mujer = data.value;
                    this.$refs.segMujerMaltGuia.value = data.text;
                    this.dato_añoCierreCaso();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_añoCierreCaso() {
            validarInputs(
                {
                    form: "#ano_cierreCaso",
                    orden: "1"
                },
                () => {
                    this.dato_seguiMujer();
                },
                () => {
                    let ano = parseFloat(this.params_violGenero2.fecha_cierreCaso.anio) || 0;

                    if (ano > 0 && ano < 1950) {
                        this.dato_añoCierreCaso();
                    } else if (ano == 0) {
                        this.params_violGenero2.fecha_cierreCaso.anio = 0
                        this.params_violGenero2.fecha_cierreCaso.mes = 0
                        this.params_violGenero2.fecha_cierreCaso.dia = 0
                        this.dato_captacionPobl();
                    } else {
                        this.dato_mesCierreCaso();
                    }
                }
            );
        },

        dato_mesCierreCaso() {
            validarInputs(
                {
                    form: "#mes_cierreCaso",
                    orden: "1"
                },
                () => {
                    this.dato_añoCierreCaso();
                },
                () => {
                    let mes = parseFloat(this.params_violGenero2.fecha_cierreCaso.mes) || 0;

                    if (mes < 1 && mes > 12) {
                        this.dato_mesCierreCaso();
                    } else {
                        this.dato_diaCierreCaso();
                    }
                }
            );
        },

        dato_diaCierreCaso() {
            validarInputs(
                {
                    form: "#dia_cierreCaso",
                    orden: "1"
                },
                () => {
                    this.dato_mesCierreCaso();
                },
                () => {
                    let dia = parseFloat(this.params_violGenero2.fecha_cierreCaso.dia) || 0;

                    if (dia < 1 || dia > 31) {
                        this.dato_diaSegRes459Año1();
                    } else {
                        let fecha = this.params_violGenero2.fecha_cierreCaso || {};

                        fecha = `${fecha.anio}${cerosIzq(fecha.mes, 2)}${cerosIzq(fecha.dia, 2)}`
                        this.form.violencia_gen_esc.fecha_cierre_res459 = fecha;
                        this.dato_captacionPobl();
                    }
                }
            );
        },

        dato_captacionPobl() {
            let params = {
                titulo: "Captación de la población",
                array: "captacionPobl",
                seleccion: this.form.violencia_gen_esc.captacion_poblacion,
                callback_esc: "dato_añoCierreCaso",
                callback: (data) => {
                    this.form.violencia_gen_esc.captacion_poblacion = data.value;
                    this.$refs.captacionPobl.value = data.text;
                    this.dato_observacionesRes549();
                }
            }
            this._ventanaViolenciaGenero(params);
        },

        dato_observacionesRes549() {
            validarInputs(
                {
                    form: "#observaciones_res459",
                    orden: "1"
                },
                () => {
                    this.dato_captacionPobl();
                },
                () => {
                    let text = this.form.violencia_gen_esc.observaciones_res459 || "";
                    text = text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
                    this.form.violencia_gen_esc.observaciones_res459 = text.toUpperCase();

                    this.mostrarViolenciaGen2 = false
                    this._validarVentanaTrastornos();
                }
            );
        },

        _ventanaViolenciaGenero(params) {
            POPUP(
                {
                    array: modular.arrays[params.array],
                    titulo: params.titulo,
                    indices: [{ id: "value", label: "text" }],
                    seleccion: params.seleccion || 1,
                    callback_f: () => {
                        this[params.callback_esc]();
                    },
                },
                (res) => {
                    setTimeout(() => {
                        params.callback(res)
                    }, 150);
                },
            );
        },

        _validarVentanaTrastornos() {
            let nit = this.info.usuar.NIT;
            let serv = this.form.serv

            if ([900541158, 900565371, 900405505].includes(nit) && serv == 9) {
                this.ventanaRequiereMamog()
            } else {
                let consulta = this.form.rips.tabla_diagn.find(e => e.cod_diagn.substring(0, 1) == "F")

                if (consulta) {
                    this.params_trastornos.enabled = true;

                    setTimeout(() => {
                        this.params_trastornos.estado = true;
                    }, 150);
                } else {
                    this.ventanaRequiereMamog()
                }
            }
        },

        esc_trastorno() {
            this.params_trastornos.estado = true;
            this._validarDiagnosticos()
        },
        callback_trastorno() {
            this.params_trastornos.estado = true;
            this.validarAnalisis()
        },

        ventanaRequiereMamog() {
            if (this.info.paciente.SEXO == "F"
                && this.form.edad.unid_edad == "A"
                && this.form.edad.vlr_edad >= 45
            ) {
                this.requMamo = true
                this.dato_requiereMamog()

            } else {
                this.validarAnalisis()
            }
        },

        dato_requiereMamog() {
            validarInputs(
                {
                    form: "#reqMamog",
                    orden: "1"
                },
                () => {
                    this.requMamo = false;
                    this._validarDiagnosticos()
                },
                () => {
                    let requiere_mamografia = this.form.requiere_mamografia || "N";
                    requiere_mamografia = requiere_mamografia.toUpperCase();

                    if (['S', 'N'].includes(requiere_mamografia)) {
                        this.form.requiere_mamografia = requiere_mamografia;
                        this.validarAnalisis();
                    } else {
                        CON851("03", "03", null, "error", "error");
                        this.dato_requiereMamog();
                    }
                }
            );
        },

        validarAnalisis() {
            setTimeout(() => {
                scrollProsoft("fase_analisis", "smooth", "center");
            }, 100);

            validarInputs(
                {
                    form: "#fase_analisis",
                    orden: "1",
                },
                () => { this._validarDiagnosticos() },
                () => {
                    this.formDetalles.analisis.change = true;
                    this._validarPlan()
                }
            );

        },
        _validarPlan() {
            validarInputs(
                {
                    form: "#fase_plan",
                    orden: "1",
                },
                () => { this.validarAnalisis() },
                () => {
                    this.formDetalles.plan.change = true;
                    this._saltoPag8()
                }
            );
        },

        _saltoPag8() {
            loader("show")

            this._guardarHistoria().then(() => {
                this._guardarDetallesHc().then(() => {
                    loader("hide")
                    this.evaluarEstadoEmbarazo()
                }).catch((err) => {
                    console.log(err)
                    loader("hide")
                    this._validarPlan();
                });
            }).catch((err) => {
                console.log(err)
                loader("hide")
                this._validarPlan();
            });
        },

        evaluarEstadoEmbarazo() {
            let embarazo = this.form.rips.embarazo;
            let edad = this.form.edad;

            if (this.sw_var.embar && ["1", "2", "3"].includes(embarazo)) {
                this.leerEstadoEmbarazo(embarazo);
            } else {
                if (this.info.paciente.SEXO == "M") {
                    this.leerEstadoEmbarazo("9");
                } else {
                    if (
                        edad.unid_edad == "D" ||
                        edad.unid_edad == "M" ||
                        (edad.unid_edad == "A" && edad.vlr_edad < 11) ||
                        (edad.unid_edad == "A" && edad.vlr_edad > 60)
                    ) {
                        this.leerEstadoEmbarazo("9");
                    } else {
                        POPUP(
                            {
                                array: modular.arrays.embarazo.filter((e) => e.value != "9"),
                                titulo: "Estado embarazo",
                                indices: [{ id: "value", label: "text" }],
                                seleccion: embarazo,
                                callback_f: () => {
                                    this._validarPlan();
                                },
                            },
                            (data) => {
                                this.leerEstadoEmbarazo(data.value);
                            }
                        );
                    }
                }
            }
        },

        leerEstadoEmbarazo(embarazo) {
            let edad = this.form.edad;
            if (embarazo == "9") {
                if (
                    this.info.paciente.SEXO == "F" &&
                    edad.unid_edad == "A" &&
                    edad.vlr_edad > 10 &&
                    edad.vlr_edad < 61
                ) {
                    this.evaluarEstadoEmbarazo();
                } else {
                    this.evaluarCausa();
                }
            } else {
                setTimeout(() => { this.evaluarCausa() }, 250);
            }

            this.form.rips.embarazo = embarazo;
        },

        evaluarCausa() {
            let causa = parseFloat(this.form.rips.causa) || 15;
            if (this.form.serv == 02) {
                if (causa == "00" || causa == "") causa = "15";
            }

            POPUP(
                {
                    array: modular.arrays.causa,
                    titulo: "Causa externa",
                    indices: [{ id: "value", label: "text" }],
                    seleccion: causa,
                    tipo_listado: true,
                    callback_f: () => {
                        this.validarAnalisis()
                    },
                },
                (data) => {
                    this.form.rips.causa = data.value;
                    this.validarCausa(data.value);
                }
            );
        },

        validarCausa(causa) {
            let espejo_diagnosticos = [
                "T781",
                "T782",
                "T783",
                "T784",
                "T788",
                "T789",
            ];

            let cod_diag1 = this.form.rips.tabla_diagn.find(e => {
                espejo_diagnosticos.includes(e.cod_diagn)
            })

            cod_diag1 = cod_diag1 || "";

            if (cod_diag1 || (this.info.usuar.NIT == 900005594 &&
                (cod_diag1.substr(1, 1) == "S" || cod_diag1.substr(1, 1) == "T"))
            ) {
                this.evaluarTipoDiagnostico();
            } else {

                if (
                    (["13", "15"].includes(causa)) &&
                    (cod_diag1.substr(1, 1) == "S" || cod_diag1.substr(1, 1) == "T")
                ) {
                    CON851('7E', '7E', null, 'warning', 'error')
                    this.evaluarCausa();
                } else {
                    if (causa == 5
                        && this.info.usuar.NIT == 892000458
                    ) {
                        this._activarVentanaHc890s()
                    } else {
                        if (causa == 1 && this.info.usuar.NIT != 892000458) {
                            this._trabajadorInformal();
                        } else this.evaluarTipoDiagnostico();
                    }
                }
            }
        },

        _trabajadorInformal() {
            CON851P(
                "Es trabajador informal ?",
                () => {
                    this.evaluarTipoDiagnostico()
                },
                () => {
                    this._activarVentanaHc890s()
                }
            );
        },

        _activarVentanaHc890s() {
            this.params_hc890s.llave_hc = this.form.llave;
            this.params_hc890s.serv_hc = this.form.serv;
            this.params_hc890s.estado = true;
        },

        _validarEscHc890s() {
            this.params_hc890s.estado = false;
            this.evaluarCausa();
        },

        _validarCallbackHc890s() {
            this.params_hc890s.estado = false;
            this.evaluarTipoDiagnostico();
        },

        evaluarTipoDiagnostico() {
            let seleccion = this.form.rips.tipo_diag || 0;
            POPUP(
                {
                    array: modular.arrays.tipo_diag,
                    titulo: "Tipo diagnostico",
                    indices: [{ id: "value", label: "text" }],
                    seleccion,
                    callback_f: () => {
                        setTimeout(() => { this.evaluarCausa() }, 500);
                    },
                },
                (data) => {
                    this.form.rips.tipo_diag = data.value;
                    this.validarTipoDiagnostico();
                }
            );
        },

        validarTipoDiagnostico() {
            let finalidad = this.form.rips.finalid;

            if (this.form.serv != 08) { finalidad = "10"; }
            this.form.rips.finalid = finalidad

            if (finalidad == "10" || finalidad == "00") {
                this._validarDatoControl()
            } else this._validarPrimeraVez();
        },

        _validarPrimeraVez() {
            validarInputs(
                {
                    form: "#fase_primera_vez",
                    orden: "1"
                },
                () => { this.evaluarCausa() },
                () => {
                    let primera_vez = this.form.rips.primera_vez || "";
                    primera_vez = primera_vez.toUpperCase()

                    if (["S", "N"].includes(primera_vez)) {
                        this.form.rips.primera_vez = primera_vez

                        if (primera_vez == "N") {
                            let fecha_1ra_vez = this.form.rips.fecha_1ra_vez || "";
                            this.params_primera_vez.fecha.anio = parseFloat(fecha_1ra_vez.substring(0, 4))
                            this.params_primera_vez.fecha.mes = parseFloat(fecha_1ra_vez.substring(4, 6))
                            this.params_primera_vez.fecha.dia = parseFloat(fecha_1ra_vez.substring(6, 8))

                            this.params_primera_vez.modal = true;
                            this._validarFechaPrimeraVez()
                        } else {
                            this.form.edad_gest_1ra_vez = ""
                            this.form.razon_ingr_tardi = ""
                            this.form.ips_reali = ""
                            this._validarDatoControl();
                        }


                    } else this._validarPrimeraVez()
                }
            )
        },

        _validarFechaPrimeraVez() {
            validarInputs(
                {
                    form: "#fase_fecha_primera",
                    orden: "1"
                },
                () => {
                    this.params_primera_vez.modal = false;
                    this.evaluarCausa()
                },
                () => {
                    let { fecha } = this.params_primera_vez;

                    if (parseFloat(fecha.anio) == 0
                        && parseFloat(fecha.mes) == 0
                        && parseFloat(fecha.dia) == 0) {
                        this.params_primera_vez.modal = false;
                        this._validarDatoControl()
                    } else {
                        if (_validarFecha(fecha.anio, fecha.mes, fecha.dia)) {
                            this.form.rips.fecha_1ra_vez = `${fecha.anio.toString().padStart(4, "0")}${fecha.mes.toString().padStart(2, "0")}${fecha.dia.toString().padStart(2, "0")}`
                            this.params_primera_vez.modal = false;
                            this._validarEdadGest();
                        } else this._validarFechaPrimeraVez();
                    }
                }
            )
        },

        _validarEdadGest() {
            if (this.sw_var.embar) {
                this.params_edad_gest.modal = true
                this._validarSemanas();
            } else this._validarDatoControl();
        },

        _validarSemanas() {
            validarInputs(
                {
                    form: "#fase_semanas_gest",
                    orden: "1"
                },
                () => {
                    this.params_edad_gest.modal = false;
                    this.evaluarCausa()
                },
                () => {
                    let edad = parseFloat(this.form.edad_gest_1ra_vez) || 0;
                    if (edad > 10) {
                        this._validarRazon()
                    } else {
                        this.form.razon_ingr_tardi = ""
                        this._validarIpsReali();
                    }
                }
            )
        },

        _validarRazon() {
            validarInputs(
                {
                    form: "#fase_razon_ing",
                    orden: "1"
                },
                () => { this._validarSemanas() },
                () => { this._validarIpsReali() }
            )
        },

        _validarIpsReali() {
            validarInputs(
                {
                    form: "#fase_ips_realizo",
                    orden: "1"
                },
                () => {
                    this._validarSemanas()
                },
                () => {
                    this.params_edad_gest.modal = false;
                    this._validarDatoControl()
                }
            )
        },
        _validarDatoControl() {
            if (this.form.rips.finalid == 06) {
                if (this.form.rips.primera_vez == "S") {
                    this.form.rips.nro_contr = 1;
                    this._validarDatoPlanifica()
                } else {
                    this.params_controles.modal = true;
                    this._validarControl();
                }
            } else {
                this._validarDatoPlanifica()
                this.form.rips.nro_contr = 0;
            }
        },

        _validarControl() {
            validarInputs(
                {
                    form: "#fase_nro_control",
                    orden: "1"
                },
                () => {
                    this.params_controles.modal = false;
                    this.evaluarCausa()
                },
                () => {
                    let nro_contr = parseFloat(this.form.rips.nro_contr) || 0;

                    if (nro_contr > 25) {
                        CON851('', 'Limite maximo 25', null, 'error', 'error')
                        this._validarControl()
                    } else {
                        if (nro_contr < 2) {
                            CON851('', 'No marco 1era vez', null, 'error', 'error')
                            this._validarControl()
                        } else {
                            this.params_controles.modal = false;
                            this._validarDatoPlanifica()
                        }
                    }
                }
            )
        },

        _validarDatoPlanifica() {
            let retornar = false;
            let atiende = this.info.profesional.ATIENDE_PROF;

            let nit = this.info.usuar.NIT;
            let serv = this.form.serv;
            let edad = this.form.edad

            let especialidades = this.info.profesional.TAB_ESPEC.find(e => {
                ["340", "341"].includes(e.COD)
            });

            if (atiende == 2 || (atiende == 1 && especialidades)) {
                retornar = true
            }

            if (serv != 1 || nit != 800175901) {
                retornar = true
            }

            if (![900541158, 900565371, 900405505].includes(nit) && serv != 09) {
                retornar = true
            }
            if (edad.unid_edad == "A" && (edad.vlr_edad < 10 && edad.vlr_edad < 60)) {
                // 
            } else {
                retornar = true;
            }

            if (retornar) { this._validarPlanifica() }
            else this._datoCronico()

        },
        _validarPlanifica() {
            let seleccion = this.form.planific;

            POPUP(
                {
                    array: modular.arrays.planific,
                    titulo: "Planifica",
                    indices: [{ id: "value", label: "text" }],
                    seleccion,
                    callback_f: () => {
                        this.evaluarCausa();
                    },
                },
                (data) => {
                    this.form.planific = data.value;

                    if (this.info.paciente.SEXO == "M") {
                        if (["3", "4", "5", "6", "H", "I", "J", "K", "L"].includes(data.value)) {
                            CON851('73', '73', null, 'warning', 'error')
                            setTimeout(() => {
                                this._validarPlanifica()
                            }, 150);

                        } else this._datoCronico();
                    } else this._datoCronico();
                }
            );



        },

        _datoCronico() {
            if (this.form.rips.finalid == 11) {
                loader("show")
                postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER858.DLL"))
                    .then(e => {
                        this.info.patologias = e.PATOLOGIAS.filter(e => e.COD != "")
                        this._validarCronico()
                        loader("hide")
                    })
                    .catch(err => {
                        this._datoProximaCita()
                        loader("hide")
                    })
            } else this._datoProximaCita();

        },

        _validarCronico() {
            validarInputs(
                {
                    form: "#fase_cronico",
                    orden: "1",
                    event_f8: () => { this._ventanaPatologias() }
                },
                () => { this.evaluarCausa() },
                () => { this._validarPatologia() }
            )
        },

        _validarPatologia() {
            let cronico = this.form.rips.cronico || ""
            cronico = cronico.toUpperCase()

            let consulta = this.info.patologias.find(e => e.COD == cronico)
            if (consulta) {
                this._datoProximaCita()
            } else {
                CON851('02', '02', null, 'warning', 'error')
                this._validarCronico()
            }
        },

        _ventanaPatologias() {
            let data = this.info.patologias;

            _ventanaDatos({
                titulo: "Busqueda de patologias",
                columnas: [
                    { value: "COD", label: "Codigo", },
                    { value: "DESCRIP", label: "Descripcion", }
                ],
                data,
                callback_esc: () => {
                    this._validarCronico();
                },
                callback: (data) => {
                    this.form.rips.cronico = data.COD;
                    this._validarPatologia()
                },
            })
        },

        _datoProximaCita() {
            if (this.form.serv == 08) {
                this.params_proxima_cita.modal = true;
                this._validarProximaCita()
            } else this.evaluarDatoSalida()
        },

        _validarProximaCita() {
            validarInputs(
                {
                    form: "#fase_fecha_cita",
                    orden: "1"
                },
                () => {
                    this.params_proxima_cita.modal = false
                    this.evaluarCausa()
                },
                () => {
                    let { fecha } = this.params_proxima_cita;

                    fecha.anio = fecha.anio || 0
                    fecha.mes = fecha.mes || 0
                    fecha.dia = fecha.dia || 0

                    if (parseFloat(fecha.anio) == 0
                        && parseFloat(fecha.mes) == 0
                        && parseFloat(fecha.dia) == 0) {
                        this.params_proxima_cita.modal = false;
                        this.evaluarDatoSalida()
                    } else {
                        if (_validarFecha(fecha.anio, fecha.mes, fecha.dia)) {
                            this.form.fecha_prox_cita = `${fecha.anio.toString().padStart(4, "0")}${fecha.mes.toString().padStart(2, "0")}${fecha.dia.toString().padStart(2, "0")}`
                            this.params_proxima_cita.modal = false;
                            // this.params_primera_vez.modal = false;
                            this.evaluarDatoSalida();
                        } else this._validarProximaCita();
                    }
                }
            )
        },

        evaluarDatoSalida() {
            let seleccion = this.form.rips.estado_sal || 0;
            POPUP(
                {
                    array: modular.arrays.estado_sal,
                    titulo: "Estado salida",
                    indices: [{ id: "value", label: "text" }],
                    seleccion,
                    callback_f: () => {
                        setTimeout(() => { this.evaluarTipoDiagnostico() }, 500);
                    },
                },
                (data) => {
                    this.form.rips.estado_sal = data.value;
                    if (data.value == "3") {
                        this.evaluarDatoRemitido();
                    } else {
                        if (data.value == "2") {
                            this.evaluarDiagMuerte();
                        } else {
                            this.validarDiagMueter();
                        }
                    }

                }
            );
        },

        evaluarDatoRemitido() {
            validarInputs(
                {
                    form: "#fase_remitido",
                    orden: "1",
                },
                () => { this.evaluarDatoSalida() },
                () => {
                    if (this.form.rips.remitido) {
                        this.evaluarDiagMuerte();
                    } else {
                        plantillaToast("", "02", null, "warning", "error");
                        this.evaluarDatoRemitido();
                    }
                }
            );
        },

        evaluarDiagMuerte() {
            validarInputs(
                {
                    form: "#fase_diag_muerte",
                    orden: "1",
                },
                () => { this.evaluarDatoSalida() },
                () => {
                    this.validarDiagMueter();
                }
            );
        },

        validarDiagMueter() {
            if (
                this.form.rips.estado_sal == "2" &&
                this.form.cierre.diag_muer == ""
            ) {
                plantillaToast("", "02", null, "warning", "error");
                this.evaluarDiagMuerte();
            } else {
                let diag = this.form.cierre.diag_muer || "";
                diag = diag.toUpperCase()

                let consulta = this.info.enfermedades.find(
                    (e) => e.COD_ENF == diag
                );

                if (consulta) {
                    this.$refs.diag_muer.value = consulta.NOMBRE_ENF

                    let retornar = null;

                    if (
                        consulta.SEXO_ENF.trim() != "" &&
                        consulta.SEXO_ENF.trim() != this.info.paciente.SEXO
                    ) {
                        retornar = "73";
                    }

                    let edad_paci = this._editarEdad(this.form.edad.unid_edad, "");
                    let vlr_edad = this.form.edad.vlr_edad;
                    edad_paci = `${edad_paci}${vlr_edad.toString().padStart(3, "0")}`;

                    let vlr_unidad = this._editarEdad(consulta.UNID_EDAD_ENF, "");
                    let edad_max_enf = `${vlr_unidad}${consulta.EDAD_MAX_ENF}`;
                    let edad_min_enf = `${vlr_unidad}${consulta.EDAD_MIN_ENF}`;

                    if (
                        parseFloat(consulta.EDAD_MIN_ENF) > 0 &&
                        parseFloat(edad_paci) < parseFloat(edad_min_enf)
                    ) {
                        retornar = "74";
                    }

                    if (
                        parseFloat(consulta.EDAD_MAX_ENF) > 0 &&
                        parseFloat(edad_paci) > parseFloat(edad_max_enf)
                    ) {
                        retornar = "74";
                    }

                    if (retornar) {
                        CON851('', retornar, null, 'error', 'error')
                        this.evaluarDiagMuerte();

                    } else this._datoObservacion()
                } else this._datoObservacion()
            }
        },

        _datoObservacion() {
            if (this.form.unserv == 01) {
                this._validarDatoObservacion()
            } else this._confirmar();
        },

        _validarDatoObservacion() {
            validarInputs(
                {
                    form: "#fase_dato_observacion",
                    orden: "1",
                },
                () => { this.evaluarDatoSalida() },
                () => {
                    let observ = this.form.rips.observ || ""
                    observ = observ.toUpperCase()

                    if (["S", "N"].includes(observ)) {
                        this.form.rips.observ = observ;
                        this._validarTriage();
                    } else {
                        this._validarDatoObservacion();
                    }
                }
            );
        },
        _validarTriage() {

            validarInputs(
                {
                    form: "#fase_triage",
                    orden: "1",
                },
                () => { this._validarDatoObservacion() },
                () => {
                    let triage = this.form.rips.triage;

                    if (triage == 1 || triage == 2 || triage == 3) {
                        this._confirmar();
                    } else {
                        if (this.info.usuar.NIT == 800162035 && triage == 4) {
                            this._confirmar();
                        } else {
                            this._validarTriage();
                        }
                    }
                }
            );
        },

        _datoAcompañante() {
            if (this.form.serv != 1 && this.form.rips.causa != 2) {
                this._confirmar()
            } else this.validarIdAcompa()
        },
        validarIdAcompa() {
            validarInputs(
                {
                    form: "#fas_id_acompa",
                    orden: "1"
                },
                () => { this._validarTriage() },
                () => { this.validarNombreAcompa() }
            )
        },
        validarNombreAcompa() {
            validarInputs(
                {
                    form: "#fase_nombre_acompa",
                    orden: "1"
                },
                () => { this.validarIdAcompa() },
                () => { this.validarEmbriaguez() }
            )
        },
        validarEmbriaguez() {
            validarInputs(
                {
                    form: "#fase_nombre_acompa",
                    orden: "1"
                },
                () => { this.validarNombreAcompa() },
                () => { this._confirmar() }
            )
        },

        _confirmar() {
            CON851P("01", () => {
                this.evaluarCausa()
            },
                () => {
                    this._finGuardarHc01()
                }
            );
        },

        _finGuardarHc01() {
            var date = new Date(),
                hora = `${date
                    .getHours()
                    .toString()
                    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`;

            if (
                (this.form.serv > 02 && this.form.serv != 08) ||
                (this.form.serv == 01 && this.form.rips.observ == "S") ||
                (this.form.serv == 01 && this.form.rips.estado_sal == 3) ||
                (this.form.serv == 01 && this.form.rips.estado_sal == 4) ||
                (this.form.serv == 02 && this.form.rips.observ == "S") ||
                (this.form.serv == 02 && this.form.rips.estado_sal == 4)
            ) {
                this.form.cierre.estado = "1";
            } else {
                if (this.info.usuar.NIT == 845000038) {
                    if (this.form.serv == 02 && this.form.rips.estado_sal == 4) {
                        this.form.cierre.estado = "1";
                    } else {
                        this.form.egreso = this.form.fecha;
                        this.form.hora_egres = hora;
                        this.form.cierre.estado = "2";
                    }
                } else {
                    this.form.egreso = this.form.fecha;
                    this.form.hora_egres = hora;
                    this.form.cierre.estado = "2";
                }
            }

            this.form.cierre.temporal = "0";

            loader("show")

            this._guardarHistoria().then(() => {

                if (this.form.edad.unid_edad == "A" && this.form.edad.vlr_edad > 18) {
                    this._validarSisbanMaternas()
                } else {
                    if (this.form.serv == "08") {
                        this._grabarSisban();
                    } else {
                        this._validarSisbanMaternas()
                    }
                }

            }).catch(err => {
                loader("hide")
                console.log(err)
                this.evaluarCausa()
            })
        },

        _grabarSisban() {
            let data = {};

            data["datosh"] = datosEnvio() + this.info.paciente.COD + "|";

            data["operador"] = localStorage.Usuario;
            data["fecha"] = this.form.fecha;
            data["embarazo"] = "";
            data["tens_media"] = this.form.signos.tens_media;

            data["edad_dias"] = this.form.edad_dias;
            data["peso"] = this.form.signos.peso;
            data["talla"] = this.form.signos.talla;
            data["per_cef"] = this.form.signos.per_cef;
            data["imc"] = this.form.signos.imc;

            data["estad_peso"] = "0";
            data["estad_talla"] = "0";
            data["estad_peso_talla"] = "0";
            data["estad_per_cef"] = "0";
            data["estad_imc"] = this.form.signos.imc_estad;
            data["finalidad"] = this.form.rips.finalid;

            this.form.rips.tabla_diag.forEach((el, index) => {
                let index_label = (index + 1).toString().padStart(3, "0");
                data[`DIAGN_${index_label}`] = el.cod_diagn || "";
            });

            console.log(data);

            postData(data, get_url("APP/SALUD/SER134X.DLL"))
                .then((res) => {
                    this._validarSisbanMaternas();
                })
                .catch((error) => {
                    console.log(error);
                    CON851("", "Ha ocurrido un error guardando SISVAN ", null, "error", "Error");
                    this.evaluarCausa();
                });
        },

        _validarSisbanMaternas() {
            let embarazo = parseFloat(this.form.rips.embarazo) || 0;
            let imc = parseFloat(this.form.signos.imc_corp) || 0;

            if ([1, 2, 3].includes(embarazo)
                && imc > 0
            ) {
                let { obstetric_esq_w, gineco_esq_w } = this.formDetalles['4040'];
                var data = {};
                var edad_gest;

                if (obstetric_esq_w.edad_gest_ultra_esq_w > 0) {
                    edad_gest = obstetric_esq_w.edad_gest_ultra_esq_w;
                } else {
                    edad_gest = obstetric_esq_w.edad_gest_regla_esq_w;
                }

                data['datosh'] = datosEnvio() + $_REG_PACI['COD'] + '|';

                data['operador'] = localStorage.Usuario;
                data['fecha'] = this.form.fecha;
                data['gesta_prev'] = gineco_esq_w.gestaciones_esq_w;
                data['edad_gesta'] = edad_gest;
                data['peso'] = this.form.signos.peso;
                data['talla'] = this.form.signos.talla;
                data['imc'] = this.form.signos.imc_corp;
                data['embarazo'] = this.form.rips.embarazo;
                data['fur'] = gineco_esq_w.fecha_regla_esq_w;
                data['alt_uter'] = this.form.signos.alt_uter;
                data['est_nut'] = this.form.signos.est_nutri;
                data['tens_media'] = this.form.signos.tens_media;
                data['hemoglob'] = gineco_esq_w.hemoglob_esq_w;
                data['toma_calcio'] = gineco_esq_w.toma_calcio_esq_w;
                data['toma_hierro'] = gineco_esq_w.toma_hierro_esq_w;
                data['toma_acidof'] = gineco_esq_w.toma_acidof_esq_w;

                postData(data, get_url("APP/SALUD/SER134M.DLL"))
                    .then((data) => {
                        this._acualizarRipsFactura();
                        console.log('grabo sisvan maternas correctamente');
                    })
                    .catch(error => {
                        console.error(error)
                        console.log('error al grabar sisvan maternas')
                        this.evaluarCausa()
                    });

            } else this._acualizarRipsFactura();
        },

        _acualizarRipsFactura() {
            let { sucursal, cl, nro } = this.ultComprobante;

            let datos = {
                datosh: datosEnvio() + `${sucursal}${cl}${nro}` + "|",
                paso: 1,
            };

            postData(datos, get_url("APP/SALUD/SER448C.DLL"))
                .then(() => { this._marcarCitaHc01() })
                .catch(() => { this._marcarCitaHc01() });
        },

        _marcarCitaHc01() {
            var fecha = this.form.fecha;
            var medico = this.info.profesional.IDENTIFICACION.trim();
            var paciente = this.info.paciente.COD.padStart(15, "0");
            var datosh = `${datosEnvio()}${fecha}|${medico}|${paciente}|`;

            postData({ datosh }, get_url("APP/HICLIN/HC-101.DLL"))
                .then(() => { this._callHc002f() })
                .catch((error) => { this._callHc002f(); });
        },

        _callHc002f() {
            loader("hide")
            $_REG_HC.fecha_lnk = this.form.fecha;
            $_REG_HC.hora_lnk = this.form.hora;
            $_REG_HC.oper_lnk = this.form.oper_elab;
            $_REG_HC.opc_llamado = "1";
            $_REG_HC.embar = this.sw_var.embar;
            $("#body_main").load("../../HICLIN/paginas/HC002F.html");
        },

        _guardarHistoria() {
            return new Promise((resolve, reject) => {
                let array = JSON.parse(JSON.stringify(this.form));

                let tabla = array.rips.tabla_diagn.map(e => {
                    const { nro, ...newDiagn } = e;
                    return newDiagn;
                })

                array.rips.tabla_diagn = tabla;
                let datos = _getObjetoSaveHc(array, filtroArray.tablasHC);

                postData(datos, get_url("APP/HICLIN/SAVE_HC_2.DLL"))
                    .then(resolve)
                    .catch((err) => {
                        CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
                        reject();
                    });
            });
        },
        _guardarDetallesHc() {
            return new Promise((resolve, reject) => {
                let filtro = ["2002", "2070", "3010", "9012"];
                let detalles = this.info.detallesHc.filter(e =>
                    e["LLAVE-HC"] == this.form.llave && !filtro.includes(e["COD-DETHC"])
                );

                let datos = _getObjetoHcDetal(detalles, this.form.llave);

                postData(datos, get_url("APP/HICLIN/SAVE_DETALLE.DLL"))
                    .then(resolve)
                    .catch((err) => {
                        reject();
                        CON851("", "Error guardando datos, intente nuevamente", null, "error", "Error");
                    });
            });
        },

        async _actualizarDatosPaciente() {
            let paciente = this.info.paciente;

            if (this.params_4040.grupo) {
                paciente["GRP-SANG"] = this.params_4040.grupo
            }

            if (this.params_4040.rh) {
                paciente.RH = this.params_4040.rh
            }

            let datos = {
                datosh: datosEnvio(),
                id_paci: paciente.COD,
                tipo_id_paci: paciente["TIPO-ID"],
                apellido1_paci: paciente["APELL-PACI1"],
                apellido2_paci: paciente["APELL-PACI2"],
                nombre1_paci: paciente["NOM-PACI1"],
                nombre2_paci: paciente["NOM-PACI2"],
                telefono_paci: paciente.TELEFONO,
                ciudad_paci: paciente.CIUDAD,
                direccion_paci: paciente.DIRECC,
                grp_sang_paci: paciente["GRP-SANG"],
                rh_paci: paciente.RH,
                admin_w: paciente["OPER-CORR"],
                victi_conflicto: paciente["VICTI-CONFLICTO"],
                diabetes: paciente.DIABETES
            }

            await postData(datos, get_url("app/SALUD/SER110C-AC.DLL"))
                .then((data) => {

                })
                .catch((err) => {
                    console.log(err, "error");
                    toastr.error("Error en guardado");
                });
        },

        _getCiudades() {
            postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
                .then((data) => {
                    this.params_hc890h.ciudades = data.CIUDAD;
                    this._getPaises();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        _getPaises() {
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
                .then((data) => {
                    this.params_hc890h.paises = data.PAISESRIPS;
                })
                .catch((err) => {
                    console.error(err);
                });
        },

        _montarDatosPantalla() {
            let nit = this.info.usuar.NIT;
            let serv = parseFloat(this.form.serv) || 0;
            let edad = this.form.edad;
            let atiende = this.info.profesional.ATIENDE_PROF;

            if (this.form.novedad != "7") {
                this.formDetalles.enfer_act.text = this._consultaDetalle("1001");
            }

            this.form.proceden =
                this.form.proceden || this.info.paciente["DESCRIP-CIUDAD"].trim();

            if ([900004059, 844001287].includes(nit)) {
                this.sw_var.urg = false;
            } else {
                if (serv == 1 || nit == 800074996) {
                    this.sw_var.urg = true;
                } else this.sw_var.urg = false;
            }

            // if ((serv == 8 || serv == 2 && nit == 830511298)
            //     && atiende == 2
            //     && (edad.unid_edad == "A" && edad.vlr_edad > 2)
            // ) {
            //     this.sw_var.agudeza = true;
            // } else {
            //     this.sw_var.agudeza = false;
            // }
            this.sw_var.agudeza = true;

            if ([1, 2, 8, 9, 63].includes(serv)) {
                this.sw_var.covid = true;
            }

            // datos antencedentes
            let _2002 = this._consultaDetalle("2002");

            if (_2002.tipo_ws == "PL") {
                this.formDetalles.af.text = _2002
            } else {
                if (serv == 8
                    && edad.vlr_edad < 10
                    && _2002.tipo_ws == "03"
                ) {
                    this.formDetalles.af.antec_perinatal = _2002
                }
            }

            this.formDetalles.alergicos.text = this._consultaDetalle("2035");

            if (serv != 1) {
                this.formDetalles.am.text = this._consultaDetalle("2010");
                this.formDetalles.aq.text = this._consultaDetalle("2020");
                this.formDetalles.aFame.text = this._consultaDetalle("2030");

                this.formDetalles.aTrauma.text = this._consultaDetalle("2040");
                this.formDetalles.aOcupa.text = this._consultaDetalle("2050");

                let _2070 = this._consultaDetalle("2070");

                if (_2070.tipo_ws == "01") {
                    this.formDetalles.otros._2070_1 = _2070
                } else {
                    this.formDetalles.otros.text = _2070
                }

                this.formDetalles.ago.text = this._consultaDetalle("2060");
            }

            if (this.sw_var.urg) {
                let detalle =
                    "- FAMILIARES: \n" +
                    "- MEDICO-QUIRURGICOS: \n" +
                    "- FARMACOLOGICOS: \n" +
                    "- TOXICOLOGICOS: \n" +
                    "- TRAUMATOLOGICOS: \n" +
                    "- OCUPACIONALES:";

                if (
                    this.info.paciente.SEXO == "F" &&
                    edad.unid_edad == "A" &&
                    edad.vlr_edad > 8
                ) {
                    detalle = detalle + "\n- GINECO-OBSTETRICOS:";
                }

                if (!this.formDetalles.af.text) this.formDetalles.af.text = detalle;
            }

            // genograma

            let _2080 = this._consultaDetalle("2080");
            if (_2080) {
                this.formDetalles.genograma.obj = _2080;
            }

            // datos revision de sistemas
            if (serv != 1 || (serv == 1 && this.form.novedad == "8")) {
                let _3010 = this._consultaDetalle("3010");

                if (_3010.tipo_ws == "01") {
                    this.formDetalles.os._3010 = _3010
                } else {
                    this.formDetalles.os.text = _3010
                }

                this.formDetalles.cp.text = this._consultaDetalle("3020");
                this.formDetalles.sd.text = this._consultaDetalle("3030");
                this.formDetalles.sDermat.text = this._consultaDetalle("3040");
                this.formDetalles.sist_oeste.text = this._consultaDetalle("3050");
                this.formDetalles.sn.text = this._consultaDetalle("3060");
                this.formDetalles.sis_psiq.text = this._consultaDetalle("3070");
                this.formDetalles.sis_gent.text = this._consultaDetalle("3080");
                this.formDetalles.sis_gine.text = this._consultaDetalle("3090");
                this.formDetalles.sis_ago.text = this._consultaDetalle("3095");
            }

            // embarazadas 4040

            let _4040 = this._consultaDetalle("4040");
            if (_4040) { this.formDetalles["4040"] = { cod: 4040, ..._4040 } }

            // datos signos vitales
            let examen = this._consultaDetalle("4005");

            if (!examen) {
                examen =
                    "" +
                    "- INSPECCION GENERAL \n" +
                    "- CABEZA / CUELLO \n" +
                    "- CARDIOVASCULAR \n" +
                    "- PULMONAR \n" +
                    "- ABDOMEN \n" +
                    "- GENITOURINARIOS \n" +
                    "- COLUMNA / DORSO \n" +
                    "- EXTREMIDADES \n" +
                    "- NEUROLOGICO \n" +
                    "- PIEL";
            }

            this.formDetalles.examen.text = examen;
            // datos diagnosticos y otros

            this.formDetalles.analisis.text = this._consultaDetalle("7501");
            this.formDetalles.plan.text = this._consultaDetalle("7503");

            // - faltan validar
            // 2002

            let finalidad = parseFloat(this.form.rips.finalid) || 0;
            if (serv == 8 && finalidad == 7) {
                this.sw_var.minimental = true
            }

            // validacion componentes despues de examen fisico
            if (serv == 8 && [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(finalidad)) {
                this.sw_var._9011 = true;
            }

            if (serv == 8 && edad.unid_edad == "A" && edad.vlr_edad < 7) {
                this.sw_var.pyp2 = true;
            }

            if (["2", "6"].includes(atiende)) {
                if (
                    ([900541158, 900565371, 900405505].includes(nit))
                    && serv == 9) {
                    this.sw_var.sintomatico = false;
                } else {
                    this.sw_var.sintomatico = true;
                }
            }

            if ([900541158, 900565371, 900405505].includes(nit) && serv == 09) {
                if (([900541158].includes(nit) && serv == 09) ||
                    ([901146885, 900450008].includes(nit) && [52, 53, 54, 55, 56].includes(serv)) ||
                    (serv == 08 && finalidad == 7)) {
                    this.sw_var.barthel = true
                }
                this.sw_var.karnosky = true
            }

            console.log(edad, serv, atiende)

            if ((edad.unid_edad == 'A' && edad.vlr_edad > 17) &&
                [2, 8].includes(serv) && ["2", "6"].includes(atiende)) {
                this.sw_var.findrisk = true
            }
        },

        _consultaDetalle(cod) {
            let { llave } = this.form;
            let antecedente = this.info.detallesHc.find(a => a["COD-DETHC"] == cod) || {};

            let detalle = this.info.detallesHc.find(e =>
                e["COD-DETHC"] == cod && e["LLAVE-HC"] == llave
            );

            if (detalle) detalle = detalle.DETALLE;
            else detalle = antecedente.DETALLE || "";
            return detalle;
        },

        _modificarArrayDetalles(item = {}) {
            if (item.text && item.change) {
                let llave = this.form.llave
                let detalle = item.text.replaceEsp();
                let index = this.info.detallesHc.findIndex(e => e["LLAVE-HC"] == llave && e["COD-DETHC"] == item.cod);

                if (index == -1) {
                    this.info.detallesHc.push({
                        "LLAVE-HC": llave,
                        "COD-DETHC": item.cod.toString(),
                        DETALLE: detalle,
                    });
                } else this.info.detallesHc[index].DETALLE = detalle;
            }

        },

        validarEsc_covid(esc) {
            this.params_hc890h.estado = false;
            this.params_hc890h.pregunta = 0;

            switch (parseInt(esc)) {
                case 1:
                    this._validarVentanaAf();
                    break;
                case 2:
                case 3:
                case 4:
                    this._validarDiagnosticos();
                    break;
            }
        },
        validarCallback_covid(call, data) {
            this.form.covid19 = data;
            this.params_hc890h.estado = false;
            this.params_hc890h.pregunta = 0;

            switch (parseInt(call)) {
                case 1:
                    this._cerrarPag1Covid19();
                    break;
                case 2:
                    setTimeout(() => {
                        this._datoAcompañanteCovid19();
                    }, 500);
                    break;
                case 3:
                    this._vetanaSintomaticoRespiratorio();
                    break;
                case 4:
                    setTimeout(() => {
                        this._evaluarImprimirCovid19();
                    }, 500);
                    break;
            }
        },

        _ventanaDiagnosticos() {
            let enfermedades = this.info.enfermedades || [];
            _ventanaDatos({
                titulo: "Busqueda de enfermedades",
                columnas: [
                    { value: "COD_ENF", label: "Codigo", },
                    { value: "NOMBRE_ENF", label: "Nombre", },
                ],
                data: enfermedades,
                callback_esc: () => {
                    this.$refs.cod_diagn.focus();
                },
                callback: (data) => {
                    this.cod_diagn = data.COD_ENF;
                    this.$refs.cod_diagn.focus();
                    _enterInput(`[ref="cod_diag"`);
                },
            });
        },
        _deleteItemDiagn(element) {
            let cod = element.srcElement.value;

            if (element.srcElement.checked) {
                CON851P(
                    "Desea eliminar el item ?",
                    () => {
                        element.srcElement.checked = false;
                        this.$refs.cod_diagn.focus();
                    },
                    () => {
                        element.srcElement.checked = false;

                        let filter = this.form.rips.tabla_diagn.filter(
                            (e) => e.cod_diagn != cod
                        );

                        this.form.rips.tabla_diagn = JSON.parse(JSON.stringify(filter));

                        this.form.rips.tabla_diagn.map((a, b) => {
                            a.nro = b + 1;
                            return a;
                        });

                        this.$refs.cod_diagn.focus();
                    }
                );
            } else element.srcElement.checked = false;
        },



        _validarDiagnRecomendacionCovid() {
            var codigos_validar = [
                "J00X",
                "J010",
                "J011",
                "J012",
                "J013",
                "J014",
                "J018",
                "J019",
                "J020",
                "J028",
                "J029",
                "J030",
                "J038",
                "J039",
                "J040",
                "J041",
                "J042",
                "J050",
                "J051",
                "J060",
                "J068",
                "J069",
                "J100",
                "J101",
                "J108",
                "J110",
                "J111",
                "J118",
                "J120",
                "J121",
                "J122",
                "J128",
                "J129",
                "J13X",
                "J14X",
                "J150",
                "J151",
                "J152",
                "J153",
                "J154",
                "J155",
                "J156",
                "J157",
                "J158",
                "J159",
                "J160",
                "J168",
                "J170",
                "J171",
                "J172",
                "J173",
                "J178",
                "J180",
                "J181",
                "J182",
                "J188",
                "J189",
                "J200",
                "J201",
                "J202",
                "J203",
                "J204",
                "J205",
                "J206",
                "J207",
                "J208",
                "J209",
                "J210",
                "J218",
                "J219",
                "J22X",
                "J300",
                "J301",
                "J302",
                "J303",
                "J304",
                "J310",
                "J311",
                "J312",
                "J320",
                "J321",
                "J322",
                "J323",
                "J324",
            ];

            const intersection = this.form.rips.tabla_diagn.find((e) =>
                codigos_validar.includes(e.cod_diagn)
            );

            return intersection || false;
        },

        _validarDiagnAcompañanteCovid() {
            let codigos_validar = [
                "J00X",
                "J010",
                "J011",
                "J012",
                "J013",
                "J014",
                "J018",
                "J019",
                "J020",
                "J028",
                "J029",
                "J030",
                "J038",
                "J039",
                "J040",
                "J041",
                "J042",
                "J050",
                "J051",
                "J060",
                "J068",
                "J069",
                "J100",
                "J101",
                "J108",
                "J110",
                "J111",
                "J118",
                "J120",
                "J121",
                "J122",
                "J128",
                "J129",
                "J13X",
                "J14X",
                "J150",
                "J151",
                "J152",
                "J153",
                "J154",
                "J155",
                "J156",
                "J157",
                "J158",
                "J159",
                "J160",
                "J168",
                "J170",
                "J171",
                "J172",
                "J173",
                "J178",
                "J180",
                "J181",
                "J182",
                "J188",
                "J189",
                "J200",
                "J201",
                "J202",
                "J203",
                "J204",
                "J205",
                "J206",
                "J207",
                "J208",
                "J209",
                "J210",
                "J218",
                "J219",
                "J22X",
                "J300",
                "J301",
                "J302",
                "J303",
                "J304",
                "J310",
                "J311",
                "J312",
                "J320",
                "J321",
                "J322",
                "J323",
                "J324",
                "J328",
                "J329",
                "U071",
                "U072",
            ];

            const intersection = this.form.rips.tabla_diagn.find((e) =>
                codigos_validar.includes(e.cod_diagn)
            );

            return intersection || false;
        },

        _activarVentanaF2(data = {}) {
            this.sw_var.notificacion = true;
            this.params_noti.estado = true;

            this.params_noti.llave_hc = this.form.llave
            this.params_noti.admin = localStorage.Usuario;

            this.params_noti.callback = data.callback
            this.params_noti.callback_esc = data.callback_esc
        },
        _validarCallbackNotificacion(data) {
            this.sw_var.notificacion = false;
            this.params_noti.estado = false;
            this[data.callback]();
        },
        _validarEscNotificacion(data) {
            this.sw_var.notificacion = false;
            this.params_noti.estado = false;
            this[data.callback_esc]();
        },

        _hc828(params) {
            POPUP(
                {
                    array: modular.arrays.f8_antecedente,
                    titulo: "Ventana de selecion de antecedentes",
                    indices: [{ id: "value", label: "text" }],
                    seleccion: 1,
                    callback_f: () => {
                        this[params.callback_esc]();
                    },
                },
                (res) => {
                    this.formDetalles[params.detalle].text = res.text;
                    this[params.callback]();
                }
            );
        },

        _hc828_2(params) {
            POPUP(
                {
                    array: modular.arrays[params.array],
                    titulo: params.titulo,
                    indices: [{ id: "value", label: "text" }],
                    seleccion: params.seleccion || 1,
                    callback_f: () => {
                        this[params.callback_esc]();
                    },
                },
                (res) => {
                    setTimeout(() => {
                        params.callback(res)
                    }, 150);
                },
            );
        },

        _calcularEdadDias(fecha1 = null, fecha2 = null) {
            let format = null
            let milliseconds = 86400000;

            if (fecha1) {
                format = `${fecha1.substr(0, 4)}-${fecha1.substr(4, 2)}-${fecha1.substr(6, 2)}`
            }

            let date_1 = new Date(format).getTime();

            if (fecha2) {
                format = `${fecha2.substr(0, 4)}-${fecha2.substr(4, 2)}-${fecha2.substr(6, 2)}`
            }

            let date_2 = new Date(format);
            return parseInt((date_2 - date_1) / milliseconds);
        },

        _currentDate() {
            let date = new Date()
            let options = {};

            options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            let fecha = date.toLocaleDateString("es-CO", options).split("/").reverse().join("")

            options = { hour: '2-digit', minute: '2-digit' }
            let hora = date.toLocaleTimeString("es-CO", options).split(" ")[0];

            return { fecha, hora }
        },

        _fieldEdit(e) {
            let funcion = e.srcElement.getAttribute("data-edit");
            if (funcion) _fin_validar_form(), this[funcion]();
        },
        formatNumero: function (val) {
            var mask = IMask.createMask({
                mask: Number,
                min: 0,
                max: 99999.99,
                scale: 2,
                thousandsSeparator: ",",
                radix: ".",
            });
            mask.resolve(val.toString());
            return `${mask.value}`;
        },
        async calcularGraficasDESA(codigo) {
            var _this = this;

            var fecha_Actual = moment();
            var fecha_Nacim = moment(this.info.paciente.NACIM).format("YYYYMMDD");
            var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");
            var limite = parseInt(edadMeses) + 2;

            var info_grafica = {
                meses: [],
                oms_3: [],
                oms_2: [],
                oms_1: [],
                oms_0: [],
                oms_M1: [],
                oms_M2: [],
                oms_M3: [],
                paci: [],
                mostrar: true
            };

            if (codigo != "PXT") {

                for (var i = 1; i < limite; i++) {
                    var busqueda_oms = _this.info.TABLAS_OMS.find(
                        (x) => x.CODIGO.trim() == codigo && x.SEXO == _this.info.paciente.SEXO && parseInt(x.RANGO) == i
                    );

                    info_grafica.meses.push(i);

                    if (busqueda_oms) {
                        info_grafica.oms_2.push({ x: i, y: parseFloat(busqueda_oms.DATO_2) });
                        info_grafica.oms_1.push({ x: i, y: parseFloat(busqueda_oms.DATO_1) });
                        info_grafica.oms_0.push({ x: i, y: parseFloat(busqueda_oms.DATO_0) });
                        info_grafica.oms_M1.push({ x: i, y: parseFloat(busqueda_oms.DATO_M1) });
                        info_grafica.oms_M2.push({ x: i, y: parseFloat(busqueda_oms.DATO_M2) });
                    }

                    var busqueda_sisvan_tabla = _this.info.SISVAN.TABLA.find((x) => parseInt(x.EDAD_MES) == i);

                    if (busqueda_sisvan_tabla) {
                        switch (codigo) {
                            case "TXE":
                                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan_tabla.TALLA) });
                                break;
                            case "PXE":
                                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan_tabla.PESO) });
                                break;
                            case "IMC":
                                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan_tabla.IMC) });
                                break;
                            case "CEF":
                                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan_tabla.PER_CEF) });
                                break;
                        }
                    }

                }
            } else {
                this.info.SISVAN.TABLA.forEach((element) => {
                    if (parseInt(element.TALLA) > 0 && parseInt(element.PESO) > 0) {
                        info_grafica.paci.push({ x: parseInt(element.TALLA), y: parseFloat(element.PESO) });
                    }
                });

                for (var i = 450; i < 1340; i++) {
                    var busqueda_oms_pxt = _this.info.TABLAS_OMS.find(
                        (x) => x.CODIGO.trim() == codigo && x.SEXO == _this.info.paciente.SEXO && parseInt(x.RANGO) == i
                    );

                    info_grafica.meses.push(i / 10);

                    if (busqueda_oms_pxt) {
                        info_grafica.oms_3.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_3) });
                        info_grafica.oms_2.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_2) });
                        info_grafica.oms_1.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_1) });
                        info_grafica.oms_0.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_0) });
                        info_grafica.oms_M1.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_M1) });
                        info_grafica.oms_M2.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_M2) });
                        info_grafica.oms_M3.push({ x: i / 10, y: parseFloat(busqueda_oms_pxt.DATO_M3) });
                    } else if (!busqueda_oms_pxt && i > 1230) {
                        i = 1340;
                    }
                }
            }

            let talla = parseInt(this.form.signos.talla)
            let edad_mes_num = parseInt(edadMeses)
            let imc = parseFloat(this.form.signos.imc_corp)
            let per_cef = parseFloat(this.form.signos.per_cef)
            let peso = parseFloat(this.form.signos.peso)
            let index_edad = info_grafica.paci.findIndex((x) => parseInt(x.x) == edad_mes_num);
            let posicion_Y = null

            // agrega los datos digitados en el formulario

            if (codigo == "PXT") {
                var index_peso_talla;
                if (this.info.SISVAN.talla_ant_grafica) {
                    index_peso_talla = info_grafica.paci.findIndex((x) => parseInt(x.x) == this.info.SISVAN.talla_ant_grafica);
                } else {
                    index_peso_talla = info_grafica.paci.findIndex((x) => parseInt(x.x) == talla);
                }

                if (index_peso_talla != -1) {
                    info_grafica.paci[index_peso_talla].x = talla;
                    info_grafica.paci[index_peso_talla].y = peso;
                } else {
                    info_grafica.paci.push({ x: talla, y: peso });
                }
            } else {
                switch (codigo) {
                    case "TXE": posicion_Y = talla
                        break;
                    case "PXE": posicion_Y = peso
                        break;
                    case "IMC": posicion_Y = imc
                        break;
                    case "CEF": posicion_Y = per_cef
                        break;
                }

                if (posicion_Y) {
                    if (index_edad != -1) {
                        info_grafica.paci[index_edad].y = posicion_Y;
                    } else {
                        info_grafica.paci.push({ x: edad_mes_num, y: posicion_Y });
                    }
                }
            }

            // console.log(info_grafica);
            return info_grafica;
        },
        async calcularGraficasEMBAR(codigo) {
            var _this = this;

            var info_grafica = {
                meses: [],
                oms_3: [],
                oms_2: [],
                oms_1: [],
                oms_0: [],
                oms_M1: [],
                oms_M2: [],
                oms_M3: [],
                paci: [],
                mostrar: true
            };

            var j = 0
            var inicio = 10
            switch (codigo) {
                case "GXS":
                    inicio = 16
                    break;
                case "AXS":
                    inicio = 13
                    break;
            }

            var peso_prev = parseFloat(this.form.signos.peso_prev)

            if (codigo != "TXS") {

                for (var i = inicio; i < 40; i++) {
                    var busqueda_oms = _this.info.TABLAS_OMS.find(
                        (x) => x.CODIGO.trim() == codigo && x.SEXO == _this.info.paciente.SEXO && parseInt(x.RANGO) == i
                    );

                    info_grafica.meses.push(i);

                    if (busqueda_oms) {
                        info_grafica.oms_2.push({ x: i, y: parseFloat(busqueda_oms.DATO_2) });
                        info_grafica.oms_1.push({ x: i, y: parseFloat(busqueda_oms.DATO_1) });
                        info_grafica.oms_0.push({ x: i, y: parseFloat(busqueda_oms.DATO_0) });
                        info_grafica.oms_M1.push({ x: i, y: parseFloat(busqueda_oms.DATO_M1) });
                        info_grafica.oms_M2.push({ x: i, y: parseFloat(busqueda_oms.DATO_M2) });
                    }

                    var busqueda_sisvan_materno = _this.info.SISVAN.CONTROL_MATERNO[j]
                    // console.log(busqueda_sisvan_materno)

                    if (busqueda_sisvan_materno) {
                        switch (codigo) {
                            case "IXS":
                                info_grafica.paci.push({ x: i, y: parseFloat(busqueda_sisvan_materno.IMC_MAT) });
                                break;
                            case "AXS":
                                let altura_uterina = parseFloat(busqueda_sisvan_materno.ALTUTE_MAT)
                                if (altura_uterina != 0) {
                                    info_grafica.paci.push({ x: i, y: altura_uterina });
                                }
                                break;
                            case "GXS": // GANANCIA PESO
                                var peso_mat = parseFloat(busqueda_sisvan_materno.PESO_MAT) || 0
                                var ganancia = 0
                                if (peso_mat != 0) {
                                    ganancia = peso_mat - peso_prev
                                    console.log(peso_mat, peso_prev, ganancia, 'RESTA')
                                    info_grafica.paci.push({ x: i, y: ganancia });
                                }
                                break;
                        }
                    }
                    j++
                }
            } else { // TENSION MEDIA
                this.info.SISVAN.CONTROL_MATERNO.forEach((element, i) => {
                    let tension = parseInt(element.TENS_MEDIA_MAT)
                    info_grafica.meses.push(i);
                    if (tension != 0) info_grafica.paci.push({ x: i, y: tension });
                });
            }

            let imc = parseFloat(this.form.signos.imc_corp)
            let altura = parseFloat(this.form.signos.alt_uter)
            let tension = parseInt(this.form.signos.tens_media)
            let peso = parseFloat(this.form.signos.peso)
            let semanas = parseInt(this.formDetalles['4040'].obstetric_esq_w.edad_gest_regla_esq_w)
            let index_semana = info_grafica.paci.findIndex((x) => parseInt(x.x) == semanas);
            let posicion_Y = null

            // agrega los datos digitados en el formulario
            switch (codigo) {
                case "IXS": posicion_Y = imc
                    break;
                case "AXS": posicion_Y = altura
                    break;
                case "TXS": posicion_Y = tension
                    break;
                case "GXS": if (peso != 0) posicion_Y = peso - peso_prev
                    break;
            }

            if (posicion_Y) {
                if (index_semana != -1) {
                    info_grafica.paci[index_semana].y = posicion_Y;
                } else {
                    info_grafica.paci.push({ x: semanas, y: posicion_Y });
                }
            }

            return info_grafica;
        },
        graficarTalla() {
            var $this = this;
            if (this.info.graficas.talla.graf) this.info.graficas.talla.graf.destroy();

            this.info.graficas.talla.graf = new Chart(document.getElementById("grafica_talla_HC_01").getContext("2d"), {
                type: "line",
                data: {
                    labels: this.info.graficas.talla.info.meses,
                    datasets: [
                        {
                            fill: false,
                            label: "Paciente",
                            data: this.info.graficas.talla.info.paci,
                            backgroundColor: "rgb(15, 15, 15)",
                            borderColor: "rgb(15, 15, 15)",
                            borderWidth: 1,
                            pointRadius: 2,
                        },
                        {
                            fill: false,
                            label: "+2",
                            data: this.info.graficas.talla.info.oms_2,
                            backgroundColor: "rgb(173, 71, 71)",
                            borderColor: "rgb(173, 71, 71)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "+1",
                            data: this.info.graficas.talla.info.oms_1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                        {
                            fill: false,
                            label: "Normal",
                            data: this.info.graficas.talla.info.oms_0,
                            backgroundColor: "rgb(37, 170, 79)",
                            borderColor: "rgb(37, 170, 79)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "-1",
                            data: this.info.graficas.talla.info.oms_M1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                        {
                            fill: false,
                            label: "-2",
                            data: this.info.graficas.talla.info.oms_M2,
                            backgroundColor: "rgb(173, 71, 71)",
                            borderColor: "rgb(173, 71, 71)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    tooltips: {
                        mode: "x",
                        // intersect: true
                    },
                    hover: {
                        mode: "x",
                        // intersect: true
                    },
                    animation: {
                        onComplete: function (animation) {
                            $this.info.graficasPDF.tallaXedad = this.toBase64Image();
                        }
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Talla en cm",
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                    autoSkip: true,
                                    maxTicksLimit: 24,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Edad en meses",
                                },
                            },
                        ],
                    },
                },
            });
        },

        graficarPesoEdad() {
            var $this = this;
            if (this.info.graficas.peso_edad.graf) this.info.graficas.peso_edad.graf.destroy();

            this.info.graficas.peso_edad.graf = new Chart(document.getElementById("grafica_peso_edad_HC_01").getContext("2d"), {
                type: "line",
                data: {
                    labels: this.info.graficas.peso_edad.info.meses,
                    datasets: [
                        {
                            fill: false,
                            label: "Paciente",
                            data: this.info.graficas.peso_edad.info.paci,
                            backgroundColor: "rgb(15, 15, 15)",
                            borderColor: "rgb(15, 15, 15)",
                            borderWidth: 1,
                            pointRadius: 2,
                        },
                        {
                            fill: false,
                            label: "+2",
                            data: this.info.graficas.peso_edad.info.oms_2,
                            backgroundColor: "rgb(173, 71, 71)",
                            borderColor: "rgb(173, 71, 71)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "+1",
                            data: this.info.graficas.peso_edad.info.oms_1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                        {
                            fill: false,
                            label: "Normal",
                            data: this.info.graficas.peso_edad.info.oms_0,
                            backgroundColor: "rgb(37, 170, 79)",
                            borderColor: "rgb(37, 170, 79)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "-1",
                            data: this.info.graficas.peso_edad.info.oms_M1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                        {
                            fill: false,
                            label: "-2",
                            data: this.info.graficas.peso_edad.info.oms_M2,
                            backgroundColor: "rgb(173, 71, 71)",
                            borderColor: "rgb(173, 71, 71)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    tooltips: {
                        mode: "x",
                        // intersect: true
                    },
                    hover: {
                        mode: "x",
                        // intersect: true
                    },
                    animation: {
                        onComplete: function (animation) {
                            $this.info.graficasPDF.pesoXedad = this.toBase64Image();
                        },
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Peso en kg",
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                    autoSkip: true,
                                    maxTicksLimit: 18,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Edad en meses",
                                },
                            },
                        ],
                    },
                },
            });
        },

        graficarPerCef() {
            var $this = this;
            if (this.info.graficas.per_cef.graf) this.info.graficas.per_cef.graf.destroy();

            this.info.graficas.per_cef.graf = new Chart(document.getElementById("grafica_percef_HC_01").getContext("2d"), {
                type: "line",
                data: {
                    labels: this.info.graficas.per_cef.info.meses,
                    datasets: [
                        {
                            fill: false,
                            label: "Paciente",
                            data: this.info.graficas.per_cef.info.paci,
                            backgroundColor: "rgb(15, 15, 15)",
                            borderColor: "rgb(15, 15, 15)",
                            borderWidth: 1,
                            pointRadius: 2,
                        },
                        {
                            fill: false,
                            label: "+2",
                            data: this.info.graficas.per_cef.info.oms_2,
                            backgroundColor: "rgb(173, 71, 71)",
                            borderColor: "rgb(173, 71, 71)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "+1",
                            data: this.info.graficas.per_cef.info.oms_1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                        {
                            fill: false,
                            label: "Normal",
                            data: this.info.graficas.per_cef.info.oms_0,
                            backgroundColor: "rgb(37, 170, 79)",
                            borderColor: "rgb(37, 170, 79)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "-1",
                            data: this.info.graficas.per_cef.info.oms_M1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                        {
                            fill: false,
                            label: "-2",
                            data: this.info.graficas.per_cef.info.oms_M2,
                            backgroundColor: "rgb(173, 71, 71)",
                            borderColor: "rgb(173, 71, 71)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    tooltips: {
                        mode: "x",
                        // intersect: true
                    },
                    hover: {
                        mode: "x",
                        // intersect: true
                    },
                    animation: {
                        onComplete: function (animation) {
                            $this.info.graficasPDF.perCefXedad = this.toBase64Image();
                        },
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Per. cef en CM",
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                    autoSkip: true,
                                    maxTicksLimit: 18,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Edad en meses",
                                },
                            },
                        ],
                    },
                },
            });
        },

        graficarIMC() {
            return new Promise((resolve, reject) => {
                var $this = this;
                if (this.info.graficas.imc.graf) this.info.graficas.imc.graf.destroy();

                this.info.graficas.imc.graf = new Chart(document.getElementById("grafica_imc_HC_01").getContext("2d"), {
                    type: "line",
                    data: {
                        labels: this.info.graficas.imc.info.meses,
                        datasets: [
                            {
                                fill: false,
                                label: "Paciente",
                                data: this.info.graficas.imc.info.paci,
                                backgroundColor: "rgb(15, 15, 15)",
                                borderColor: "rgb(15, 15, 15)",
                                borderWidth: 1,
                                pointRadius: 2,
                            },
                            {
                                fill: false,
                                label: "+2",
                                data: this.info.graficas.imc.info.oms_2,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "+1",
                                data: this.info.graficas.imc.info.oms_1,
                                backgroundColor: "rgba(255,165,0)",
                                borderColor: "rgba(255,165,0)",
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [10, 5],
                            },
                            {
                                fill: false,
                                label: "Normal",
                                data: this.info.graficas.imc.info.oms_0,
                                backgroundColor: "rgb(37, 170, 79)",
                                borderColor: "rgb(37, 170, 79)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "-1",
                                data: this.info.graficas.imc.info.oms_M1,
                                backgroundColor: "rgba(255,165,0)",
                                borderColor: "rgba(255,165,0)",
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [10, 5],
                            },
                            {
                                fill: false,
                                label: "-2",
                                data: this.info.graficas.imc.info.oms_M2,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                        ],
                    },
                    options: {
                        tooltips: {
                            mode: "x",
                            // intersect: true
                        },
                        hover: {
                            mode: "x",
                            // intersect: true
                        },
                        animation: {
                            onComplete: function (animation) {
                                $this.info.graficasPDF.imcXedad = this.toBase64Image();

                                resolve('termina')
                            },
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        labelFontWeight: "bold",
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelFontWeight: "bold",
                                        labelString: "IMC",
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        labelFontWeight: "bold",
                                        autoSkip: true,
                                        maxTicksLimit: 18,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelFontWeight: "bold",
                                        labelString: "Edad en meses",
                                    },
                                },
                            ],
                        },
                    },
                });
            })
        },

        graficarPesoTalla() {
            var $this = this;
            if (this.info.graficas.peso_talla.graf) this.info.graficas.peso_talla.graf.destroy();

            this.info.graficas.peso_talla.graf = new Chart(
                document.getElementById("grafica_peso_talla_HC_01").getContext("2d"),
                {
                    type: "line",
                    data: {
                        labels: this.info.graficas.peso_talla.info.meses,
                        datasets: [
                            {
                                fill: false,
                                label: "Paciente",
                                data: this.info.graficas.peso_talla.info.paci,
                                backgroundColor: "rgb(15, 15, 15)",
                                borderColor: "rgb(15, 15, 15)",
                                borderWidth: 1,
                                pointRadius: 2,
                            },
                            {
                                fill: false,
                                label: "+3",
                                data: this.info.graficas.peso_talla.info.oms_3,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "+2",
                                data: this.info.graficas.peso_talla.info.oms_2,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [10, 5],
                            },
                            {
                                fill: false,
                                label: "+1",
                                data: this.info.graficas.peso_talla.info.oms_1,
                                backgroundColor: "rgba(255,165,0)",
                                borderColor: "rgba(255,165,0)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "Normal",
                                data: this.info.graficas.peso_talla.info.oms_0,
                                backgroundColor: "rgb(37, 170, 79)",
                                borderColor: "rgb(37, 170, 79)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "-1",
                                data: this.info.graficas.peso_talla.info.oms_M1,
                                backgroundColor: "rgba(255,165,0)",
                                borderColor: "rgba(255,165,0)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "-2",
                                data: this.info.graficas.peso_talla.info.oms_M2,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [10, 5],
                            },
                            {
                                fill: false,
                                label: "-3",
                                data: this.info.graficas.peso_talla.info.oms_M3,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                        ],
                    },
                    options: {
                        tooltips: {
                            mode: "x",
                            // intersect: true
                        },
                        hover: {
                            mode: "x",
                            // intersect: true
                        },
                        animation: {
                            onComplete: function (animation) {
                                $this.info.graficasPDF.pesoXtalla = this.toBase64Image();
                            },
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        labelFontWeight: "bold",
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelFontWeight: "bold",
                                        labelString: "Peso en kg",
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        labelFontWeight: "bold",
                                        autoSkip: true,
                                        maxTicksLimit: 15,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelFontWeight: "bold",
                                        labelString: "Talla en cm",
                                    },
                                },
                            ],
                        },
                    },
                }
            );
        },

        graficarIMC_X_semana() {
            return new Promise((resolve, reject) => {
                var $this = this;
                if (this.info.graficas.imc_sem_gest.graf) this.info.graficas.imc_sem_gest.graf.destroy();

                this.info.graficas.imc_sem_gest.graf = new Chart(
                    document.getElementById("grafica_imc_sem_gest_HC_01").getContext("2d"),
                    {
                        type: "line",
                        data: {
                            labels: this.info.graficas.imc_sem_gest.info.meses,
                            datasets: [
                                {
                                    fill: false,
                                    label: "Paciente",
                                    data: this.info.graficas.imc_sem_gest.info.paci,
                                    backgroundColor: "rgb(15, 15, 15)",
                                    borderColor: "rgb(15, 15, 15)",
                                    borderWidth: 1,
                                    pointRadius: 2,
                                },
                                {
                                    fill: false,
                                    label: "+1",
                                    data: this.info.graficas.imc_sem_gest.info.oms_1,
                                    backgroundColor: "rgb(173, 71, 71)",
                                    borderColor: "rgb(173, 71, 71)",
                                    borderWidth: 1,
                                    pointRadius: 0,
                                },
                                {
                                    fill: false,
                                    label: "Normal",
                                    data: this.info.graficas.imc_sem_gest.info.oms_0,
                                    backgroundColor: "rgb(37, 170, 79)",
                                    borderColor: "rgb(37, 170, 79)",
                                    borderWidth: 1,
                                    pointRadius: 0,
                                },
                                {
                                    fill: false,
                                    label: "-1",
                                    data: this.info.graficas.imc_sem_gest.info.oms_M1,
                                    backgroundColor: "rgb(173, 71, 71)",
                                    borderColor: "rgb(173, 71, 71)",
                                    borderWidth: 1,
                                    pointRadius: 0,
                                },
                            ],
                        },
                        options: {
                            tooltips: {
                                mode: "x",
                                // intersect: true
                            },
                            hover: {
                                mode: "x",
                                // intersect: true
                            },
                            animation: {
                                onComplete: function (animation) {
                                    $this.info.graficasPDF.imcXsemGest = this.toBase64Image();
                                    resolve('termina')
                                },
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                            labelFontWeight: "bold",
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelFontWeight: "bold",
                                            labelString: "IMC",
                                        },
                                    },
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                            labelFontWeight: "bold",
                                            autoSkip: true,
                                            maxTicksLimit: 15,
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelFontWeight: "bold",
                                            labelString: "Semana de gestación",
                                        },
                                    },
                                ],
                            },
                        },
                    }
                );
            })
        },

        graficarALT_X_semana() {
            var $this = this;
            if (this.info.graficas.alt_sem_gest.graf) this.info.graficas.alt_sem_gest.graf.destroy();

            this.info.graficas.alt_sem_gest.graf = new Chart(
                document.getElementById("grafica_alt_sem_gest_HC_01").getContext("2d"),
                {
                    type: "line",
                    data: {
                        labels: this.info.graficas.alt_sem_gest.info.meses,
                        datasets: [
                            {
                                fill: false,
                                label: "Paciente",
                                data: this.info.graficas.alt_sem_gest.info.paci,
                                backgroundColor: "rgb(15, 15, 15)",
                                borderColor: "rgb(15, 15, 15)",
                                borderWidth: 1,
                                pointRadius: 2,
                            },
                            {
                                fill: false,
                                label: "+2",
                                data: this.info.graficas.alt_sem_gest.info.oms_2,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "+1",
                                data: this.info.graficas.alt_sem_gest.info.oms_1,
                                backgroundColor: "rgba(255,165,0)",
                                borderColor: "rgba(255,165,0)",
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [10, 5],
                            },
                            {
                                fill: false,
                                label: "Normal",
                                data: this.info.graficas.alt_sem_gest.info.oms_0,
                                backgroundColor: "rgb(37, 170, 79)",
                                borderColor: "rgb(37, 170, 79)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                            {
                                fill: false,
                                label: "-1",
                                data: this.info.graficas.alt_sem_gest.info.oms_M1,
                                backgroundColor: "rgba(255,165,0)",
                                borderColor: "rgba(255,165,0)",
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [10, 5],
                            },
                            {
                                fill: false,
                                label: "-2",
                                data: this.info.graficas.alt_sem_gest.info.oms_M2,
                                backgroundColor: "rgb(173, 71, 71)",
                                borderColor: "rgb(173, 71, 71)",
                                borderWidth: 1,
                                pointRadius: 0,
                            },
                        ],
                    },
                    options: {
                        tooltips: {
                            mode: "x",
                            // intersect: true
                        },
                        hover: {
                            mode: "x",
                            // intersect: true
                        },
                        animation: {
                            onComplete: function (animation) {
                                $this.info.graficasPDF.altUterXsemGest = this.toBase64Image();
                            },
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        labelFontWeight: "bold",
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelFontWeight: "bold",
                                        labelString: "",
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        labelFontWeight: "bold",
                                        autoSkip: true,
                                        maxTicksLimit: 15,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelFontWeight: "bold",
                                        labelString: "Semana de gestación",
                                    },
                                },
                            ],
                        },
                    },
                }
            );
        },

        graficarGXS_X_semana() {
            var $this = this;
            if (this.info.graficas.gan_peso_sem_gest.graf) this.info.graficas.gan_peso_sem_gest.graf.destroy();

            this.info.graficas.gan_peso_sem_gest.graf = new Chart(document.getElementById("grafica_gan_peso_sem_gest_HC_01").getContext("2d"), {
                type: "line",
                data: {
                    labels: this.info.graficas.gan_peso_sem_gest.info.meses,
                    datasets: [
                        {
                            fill: false,
                            label: "Paciente",
                            data: this.info.graficas.gan_peso_sem_gest.info.paci,
                            backgroundColor: "rgb(15, 15, 15)",
                            borderColor: "rgb(15, 15, 15)",
                            borderWidth: 1,
                            pointRadius: 2,
                        },
                        {
                            fill: false,
                            label: "+2",
                            data: this.info.graficas.gan_peso_sem_gest.info.oms_2,
                            backgroundColor: "rgb(173, 71, 71)",
                            borderColor: "rgb(173, 71, 71)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "+1",
                            data: this.info.graficas.gan_peso_sem_gest.info.oms_1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                        {
                            fill: false,
                            label: "Normal",
                            data: this.info.graficas.gan_peso_sem_gest.info.oms_0,
                            backgroundColor: "rgb(37, 170, 79)",
                            borderColor: "rgb(37, 170, 79)",
                            borderWidth: 1,
                            pointRadius: 0,
                        },
                        {
                            fill: false,
                            label: "-1",
                            data: this.info.graficas.gan_peso_sem_gest.info.oms_M1,
                            backgroundColor: "rgba(255,165,0)",
                            borderColor: "rgba(255,165,0)",
                            borderWidth: 1,
                            pointRadius: 0,
                            borderDash: [10, 5],
                        },
                    ],
                },
                options: {
                    tooltips: {
                        mode: "x",
                        // intersect: true
                    },
                    hover: {
                        mode: "x",
                        // intersect: true
                    },
                    animation: {
                        onComplete: function (animation) {
                            $this.info.graficasPDF.ganPesoXsemGest = this.toBase64Image();
                        },
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Peso en kg",
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                    autoSkip: true,
                                    maxTicksLimit: 18,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Semana de gestación",
                                },
                            },
                        ],
                    },
                },
            });
        },

        graficarTension() {
            var $this = this;
            if (this.info.graficas.tension.graf) this.info.graficas.tension.graf.destroy();

            this.info.graficas.tension.graf = new Chart(document.getElementById("grafica_tension_HC_01").getContext("2d"), {
                type: "line",
                data: {
                    labels: this.info.graficas.tension.info.meses,
                    datasets: [
                        {
                            fill: false,
                            label: "Paciente",
                            data: this.info.graficas.tension.info.paci,
                            backgroundColor: "rgb(15, 15, 15)",
                            borderColor: "rgb(15, 15, 15)",
                            borderWidth: 1,
                            pointRadius: 2,
                        },
                    ],
                },
                options: {
                    tooltips: {
                        mode: "x",
                        // intersect: true
                    },
                    hover: {
                        mode: "x",
                        // intersect: true
                    },
                    animation: {
                        onComplete: function (animation) {
                            $this.info.graficasPDF.tensXsemGest = this.toBase64Image();
                        },
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Tensión",
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    labelFontWeight: "bold",
                                    autoSkip: true,
                                    maxTicksLimit: 18,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelFontWeight: "bold",
                                    labelString: "Semana de gestación",
                                },
                            },
                        ],
                    },
                },
            });
        },
        imprimir_HC002B() {
            return new Promise((resolve) => {
                CON851P(
                    "¿Desea ver las evoluciones anteriores?",
                    resolve,
                    () => {
                        iniciar_HC002B(2);
                        resolve();
                    })
            })
        },
    }
})