$_AIEPI845A = new Vue({
    el: '#AIEPI845A',
    data: {
        unidad_serv: $_REG_HC.serv_hc,
        DETALLE_HISTORIA: {
            antec_perinatal: {
                embarazo_deseado: '',
                patol_embarazo: '',
                patol_parto: '',
                patol_puerperio: '',
                lugar_nacimiento: '',
                apgar_1_min: '',
                apgar_5_min: '',
                apgar_10_min: '',
                atencion_perinatal: '',
                reanimacion: '',
                grupo_sang_madre: '',
                rh_madre: '',
                serologia_madre: '',
                sano: '',
                hemorragias: '',
                infecciones: '',
                deforma_cong: '',
                hipoglicemia: '',
                apnea: '',
                ictericia: '',
                broncoasp: '',
                neurologia: '',
                memb_hialina: '',
                lactan_materna: '',
                nro_hermanos: '',
                hermanos_muer: '',
                hermanos_vivos: '',
                patologias_familiares: ''
            },
            antec_perinatal_text: ''
        },
        resultado_examen: [
            { COD: '1', DESCRIP: 'NORMAL' },
            { COD: '2', DESCRIP: 'ANORMAL' },
            { COD: '3', DESCRIP: 'POSITIVO' },
            { COD: '4', DESCRIP: 'NEGATIVO' },
            { COD: '5', DESCRIP: 'NO SE HIZO' },
            { COD: '6', DESCRIP: 'REPORTE PENDIENTE' },
            { COD: '7', DESCRIP: 'REACTIVO' },
            { COD: '8', DESCRIP: 'NO REACTIVO' }
        ],
        si_no_ignora: [
            { COD: 'S', DESCRIP: 'SI' },
            { COD: 'N', DESCRIP: 'NO' },
            { COD: 'I', DESCRIP: 'IGNORA' }
        ],
        serologia: [
            { COD: '1', DESCRIP: 'REACTIVA' },
            { COD: '2', DESCRIP: 'NO REACTIVA' },
            { COD: '3', DESCRIP: 'NO SABE' }
        ],
        lactancia: [
            { COD: '1', DESCRIP: 'EXCLUSIVA' },
            { COD: '2', DESCRIP: 'COMPLEMENTARIA' },
            { COD: '3', DESCRIP: 'NO DA LACTANCIA' }
        ],
        array_apgar: [
            { COD: '1', DESCRIP: '01' },
            { COD: '2', DESCRIP: '02' },
            { COD: '3', DESCRIP: '03' },
            { COD: '4', DESCRIP: '04' },
            { COD: '5', DESCRIP: '05' },
            { COD: '6', DESCRIP: '06' },
            { COD: '7', DESCRIP: '07' },
            { COD: '8', DESCRIP: '08' },
            { COD: '9', DESCRIP: '09' },
            { COD: 'A', DESCRIP: '10' },
            { COD: 'B', DESCRIP: 'NR' }
        ],
        textos: {
            resultado_examen: '',
            embarazo_deseado: '',
            serologia_madre: '',
            lactancia_materna: ''
        },
        callbackAtras: null,
        callbackSiguiente: null
    },
    created() {
    },
    watch: {

    },
    methods: {
        validarAntecedentesPerinatales() {
            if (this.unidad_serv == '08') {
                this.validarEmbarazoDeseado()
            } else {
                this.validarAntecedentes_text()
            }
        },
        validarAntecedentes_text() {
            validarInputs(
                {
                    form: "#validar_Antecedentes_text",
                    orden: '1'
                }, () => {
                    this.callbackAtras(this.DETALLE_HISTORIA)
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal_text = this.DETALLE_HISTORIA.antec_perinatal_text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').trim();
                    this.salir_AIEPI845A()
                }
            )
        },
        validarEmbarazoDeseado() {
            validarInputs(
                {
                    form: "#validarEmbarazoDeseado",
                    orden: '1'
                }, () => {
                    this.callbackAtras(this.DETALLE_HISTORIA)
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.embarazo_deseado = this.DETALLE_HISTORIA.antec_perinatal.embarazo_deseado.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.embarazo_deseado) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarPatolEmbarazo()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.embarazo_deseado = 'N'
                            this.validarPatolEmbarazo()
                            break;
                    }
                }
            )
        },
        validarPatolEmbarazo() {
            validarInputs(
                {
                    form: "#validarPatolEmbarazo",
                    orden: '1'
                }, () => {
                    this.validarEmbarazoDeseado()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.patol_embarazo = this.DETALLE_HISTORIA.antec_perinatal.patol_embarazo.trim().toUpperCase()
                    this.validarPatolParto()
                }
            )
        },
        validarPatolParto() {
            validarInputs(
                {
                    form: "#validarPatolParto",
                    orden: '1'
                }, () => {
                    this.validarPatolEmbarazo()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.patol_parto = this.DETALLE_HISTORIA.antec_perinatal.patol_parto.trim().toUpperCase()
                    this.validarPatolPuerperio()
                }
            )
        },
        validarPatolPuerperio() {
            validarInputs(
                {
                    form: "#validarPatolPuerperio",
                    orden: '1'
                }, () => {
                    this.validarPatolParto()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.patol_puerperio = this.DETALLE_HISTORIA.antec_perinatal.patol_puerperio.trim().toUpperCase()
                    this.validarLugarNacim()
                }
            )
        },
        validarLugarNacim() {
            validarInputs(
                {
                    form: "#validarLugarNacim",
                    orden: '1'
                }, () => {
                    this.validarPatolPuerperio()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.lugar_nacimiento = this.DETALLE_HISTORIA.antec_perinatal.lugar_nacimiento.trim()
                    this.validarApgar01()
                }
            )
        },
        validarApgar01() {
            var _this = this
            var select = ''

            if (this.DETALLE_HISTORIA.antec_perinatal.apgar_1_min == '10') {
                select = 'A'
            } else if (this.DETALLE_HISTORIA.antec_perinatal.apgar_1_min == 'NR') {
                select = 'B'
            } else {
                select = parseInt(this.DETALLE_HISTORIA.antec_perinatal.apgar_1_min) ? parseInt(this.DETALLE_HISTORIA.antec_perinatal.apgar_1_min).toString() : ''
            }

            setTimeout(() => {
                POPUP({
                    titulo: "Apgar 1 Min ?",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.array_apgar,
                    callback_f: () => this.validarLugarNacim(),
                    seleccion: select,
                    teclaAlterna: true,
                }, data => {
                    _this.DETALLE_HISTORIA.antec_perinatal.apgar_1_min = data.DESCRIP

                    _this.validarApgar05()
                })
            }, 300)
        },
        validarApgar05() {
            var _this = this
            var select = ''

            if (this.DETALLE_HISTORIA.antec_perinatal.apgar_5_min == '10') {
                select = 'A'
            } else if (this.DETALLE_HISTORIA.antec_perinatal.apgar_5_min == 'NR') {
                select = 'B'
            } else {
                select = parseInt(this.DETALLE_HISTORIA.antec_perinatal.apgar_5_min) ? parseInt(this.DETALLE_HISTORIA.antec_perinatal.apgar_5_min).toString() : ''
            }
            console.log(select)

            setTimeout(() => {
                POPUP({
                    titulo: "Apgar 5 Min ?",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.array_apgar,
                    callback_f: () => this.validarApgar01(),
                    seleccion: select,
                    teclaAlterna: true,
                }, data => {
                    _this.DETALLE_HISTORIA.antec_perinatal.apgar_5_min = data.DESCRIP

                    _this.validarApgar10()
                })
            }, 300)
        },
        validarApgar10() {
            var _this = this
            var select = ''

            if (this.DETALLE_HISTORIA.antec_perinatal.apgar_10_min == '10') {
                select = 'A'
            } else if (this.DETALLE_HISTORIA.antec_perinatal.apgar_10_min == 'NR') {
                select = 'B'
            } else {
                select = parseInt(this.DETALLE_HISTORIA.antec_perinatal.apgar_10_min) ? parseInt(this.DETALLE_HISTORIA.antec_perinatal.apgar_10_min).toString() : ''
            }

            setTimeout(() => {
                POPUP({
                    titulo: "Apgar 10 Min ?",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.array_apgar,
                    callback_f: () => this.validarApgar05(),
                    seleccion: select,
                    teclaAlterna: true,
                }, data => {
                    _this.DETALLE_HISTORIA.antec_perinatal.apgar_10_min = data.DESCRIP

                    _this.validarAtencionPerinatal()
                })
            }, 300)
        },
        validarAtencionPerinatal() {
            validarInputs(
                {
                    form: "#validarAtencionPerinatal",
                    orden: '1'
                }, () => {
                    this.validarApgar10()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.atencion_perinatal = this.DETALLE_HISTORIA.antec_perinatal.atencion_perinatal.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.atencion_perinatal) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarReanimacion()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.atencion_perinatal = 'N'
                            this.validarReanimacion()
                            break;
                    }
                }
            )
        },
        validarReanimacion() {
            validarInputs(
                {
                    form: "#validarReanimacion",
                    orden: '1'
                }, () => {
                    this.validarAtencionPerinatal()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.reanimacion = this.DETALLE_HISTORIA.antec_perinatal.reanimacion.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.reanimacion) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarGrpSangMadre()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.reanimacion = 'N'
                            this.validarGrpSangMadre()
                            break;
                    }
                }
            )
        },
        validarGrpSangMadre() {
            validarInputs(
                {
                    form: "#validarGrupoSangMadre",
                    orden: '1'
                }, () => {
                    this.validarReanimacion()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.grupo_sang_madre = this.DETALLE_HISTORIA.antec_perinatal.grupo_sang_madre.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.grupo_sang_madre) {
                        case 'O':
                        case 'A':
                        case 'B':
                        case 'AB':
                            this.validarRhMadre()
                            break;
                        default:
                            CON851('03', '03', null, 'error', 'Error')
                            this.validarGrpSangMadre()
                            break;
                    }
                }
            )
        },
        validarRhMadre() {
            validarInputs(
                {
                    form: "#validarRhMadre",
                    orden: '1'
                }, () => {
                    this.validarGrpSangMadre()
                },
                () => {
                    switch (this.DETALLE_HISTORIA.antec_perinatal.rh_madre) {
                        case '+':
                        case '-':
                            this.validarSerologiaMadre()
                            break;
                        default:
                            CON851('03', '03', null, 'error', 'Error')
                            this.validarRhMadre()
                            break;
                    }
                }
            )
        },
        validarSerologiaMadre() {
            var _this = this

            setTimeout(() => {
                POPUP({
                    titulo: "Serología madre",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.serologia,
                    callback_f: () => this.validarRhMadre(),
                    seleccion: _this.DETALLE_HISTORIA.antec_perinatal.serologia_madre,
                    teclaAlterna: true,
                }, data => {
                    _this.DETALLE_HISTORIA.antec_perinatal.serologia_madre = data.COD
                    _this.textos.serologia_madre = data.DESCRIP

                    _this.validarLactanciaMaterna()
                })
            }, 300)
        },
        validarLactanciaMaterna() {
            var _this = this

            setTimeout(() => {
                POPUP({
                    titulo: "Serología madre",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.lactancia,
                    callback_f: () => this.validarSerologiaMadre(),
                    seleccion: _this.DETALLE_HISTORIA.antec_perinatal.lactan_materna,
                    teclaAlterna: true,
                }, data => {
                    _this.DETALLE_HISTORIA.antec_perinatal.lactan_materna = data.COD
                    _this.textos.lactancia_materna = data.DESCRIP

                    _this.validarSano()
                })
            }, 300)
        },
        validarSano() {
            validarInputs(
                {
                    form: "#validarSano",
                    orden: '1'
                }, () => {
                    this.validarLactanciaMaterna()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.sano = this.DETALLE_HISTORIA.antec_perinatal.sano.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.sano) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarHemorragias()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.sano = 'N'
                            this.validarHemorragias()
                            break;
                    }
                }
            )
        },
        validarHemorragias() {
            validarInputs(
                {
                    form: "#validarHemorragias",
                    orden: '1'
                }, () => {
                    this.validarSano()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.hemorragias = this.DETALLE_HISTORIA.antec_perinatal.hemorragias.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.hemorragias) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarInfecciones()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.hemorragias = 'N'
                            this.validarInfecciones()
                            break;
                    }
                }
            )
        },
        validarInfecciones() {
            validarInputs(
                {
                    form: "#validarInfecciones",
                    orden: '1'
                }, () => {
                    this.validarHemorragias()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.infecciones = this.DETALLE_HISTORIA.antec_perinatal.infecciones.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.infecciones) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarDeformaciCongeni()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.infecciones = 'N'
                            this.validarDeformaciCongeni()
                            break;
                    }
                }
            )
        },
        validarDeformaciCongeni() {
            validarInputs(
                {
                    form: "#validarDeformasCongeni",
                    orden: '1'
                }, () => {
                    this.validarInfecciones()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.deforma_cong = this.DETALLE_HISTORIA.antec_perinatal.deforma_cong.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.deforma_cong) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarHipoglicemia()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.deforma_cong = 'N'
                            this.validarHipoglicemia()
                            break;
                    }
                }
            )
        },
        validarHipoglicemia() {
            validarInputs(
                {
                    form: "#validarHipoglicemia",
                    orden: '1'
                }, () => {
                    this.validarDeformaciCongeni()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.hipoglicemia = this.DETALLE_HISTORIA.antec_perinatal.hipoglicemia.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.hipoglicemia) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarApnea()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.hipoglicemia = 'N'
                            this.validarApnea()
                            break;
                    }
                }
            )
        },
        validarApnea() {
            validarInputs(
                {
                    form: "#validarApnea",
                    orden: '1'
                }, () => {
                    this.validarHipoglicemia()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.apnea = this.DETALLE_HISTORIA.antec_perinatal.apnea.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.apnea) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarIctericia()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.apnea = 'N'
                            this.validarIctericia()
                            break;
                    }
                }
            )
        },
        validarIctericia() {
            validarInputs(
                {
                    form: "#validarIctericia",
                    orden: '1'
                }, () => {
                    this.validarApnea()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.ictericia = this.DETALLE_HISTORIA.antec_perinatal.ictericia.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.ictericia) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarBroncoAsp()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.ictericia = 'N'
                            this.validarBroncoAsp()
                            break;
                    }
                }
            )
        },
        validarBroncoAsp() {
            validarInputs(
                {
                    form: "#validarBroncoaspiracion",
                    orden: '1'
                }, () => {
                    this.validarIctericia()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.broncoasp = this.DETALLE_HISTORIA.antec_perinatal.broncoasp.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.broncoasp) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarNeurologia()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.broncoasp = 'N'
                            this.validarNeurologia()
                            break;
                    }
                }
            )
        },
        validarNeurologia() {
            validarInputs(
                {
                    form: "#validarNeurologias",
                    orden: '1'
                }, () => {
                    this.validarBroncoAsp()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.neurologia = this.DETALLE_HISTORIA.antec_perinatal.neurologia.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.neurologia) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarMembHialina()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.neurologia = 'N'
                            this.validarMembHialina()
                            break;
                    }
                }
            )
        },
        validarMembHialina() {
            validarInputs(
                {
                    form: "#validarMembHialina",
                    orden: '1'
                }, () => {
                    this.validarNeurologia()
                },
                () => {
                    this.DETALLE_HISTORIA.antec_perinatal.memb_hialina = this.DETALLE_HISTORIA.antec_perinatal.memb_hialina.toUpperCase().trim()

                    switch (this.DETALLE_HISTORIA.antec_perinatal.memb_hialina) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarNroHermanos()
                            break;
                        default:
                            this.DETALLE_HISTORIA.antec_perinatal.memb_hialina = 'N'
                            this.validarNroHermanos()
                            break;
                    }
                }
            )
        },
        validarNroHermanos() {
            validarInputs(
                {
                    form: "#validarNroHermanos",
                    orden: '1'
                }, () => {
                    this.validarMembHialina()
                },
                () => {
                    var NroHermanos = cerosIzq(this.DETALLE_HISTORIA.antec_perinatal.nro_hermanos.trim(), 2)

                    if (NroHermanos == '00') {
                        this.DETALLE_HISTORIA.antec_perinatal.nro_hermanos = '00'
                        this.DETALLE_HISTORIA.antec_perinatal.hermanos_muer = '00'
                        this.DETALLE_HISTORIA.antec_perinatal.hermanos_vivos = '00'
                        this.validarPatologiasFam()
                    } else {
                        this.validarHermanosMuertos()
                    }
                }
            )
        },
        validarHermanosMuertos() {
            validarInputs(
                {
                    form: "#validarHermanosMuertos",
                    orden: '1'
                }, () => {
                    this.validarNroHermanos()
                },
                () => {
                    var NroHermanos = parseInt(this.DETALLE_HISTORIA.antec_perinatal.nro_hermanos.trim())
                    var HermanosMuer = parseInt(this.DETALLE_HISTORIA.antec_perinatal.hermanos_muer.trim())

                    if (NroHermanos < HermanosMuer) {
                        CON851('03', '03', null, 'error', 'Error')
                        this.validarHermanosMuertos()
                    } else {
                        var vivos = NroHermanos - HermanosMuer
                        this.DETALLE_HISTORIA.antec_perinatal.hermanos_vivos = vivos.toString()
                        this.validarPatologiasFam()
                    }
                }
            )
        },
        validarPatologiasFam() {
            validarInputs(
                {
                    form: "#validarPatologiasFamiliares",
                    orden: '1'
                }, () => {
                    var NroHermanos = parseInt(this.DETALLE_HISTORIA.antec_perinatal.nro_hermanos.trim())

                    if (NroHermanos == 0) {
                        this.validarNroHermanos()
                    } else {
                        this.validarHermanosMuertos()
                    }
                },
                () => {
                    this.salir_AIEPI845A()
                }
            )
        },
        botonFlujo(param) {

        },
        salir_AIEPI845A() {
            this.callbackSiguiente(this.DETALLE_HISTORIA)
        }
    }
})