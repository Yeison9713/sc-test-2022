$_HC890L = new Vue({
    el: '#HC890L',
    data: {
        global_HC890L: {
            fisica: '',
            mental: '',
            cognitiva: '',
            auditiva: '',
            visual: ''
        },
        preguntaLllenado: '',
        callbackAtras: null,
        callbackSiguiente: null
    },
    created() {
    },
    watch: {

    },
    methods: {
        validarLlenadoDiscapacidad() {
            validarInputs(
                {
                    form: "#validarLlenadoDiscapacidad_HC890L",
                    orden: '1'
                }, () => {
                    this.callbackAtras(this.global_HC890L)
                },
                () => {
                    this.preguntaLllenado = this.preguntaLllenado.toUpperCase().trim() != 'S' ? "N" : "S"

                    if (this.preguntaLllenado == 'S') {
                        this.validarDiscapacidadFisica()
                    } else {
                        global_HC890L = {
                            fisica: '',
                            mental: '',
                            cognitiva: '',
                            auditiva: '',
                            visual: ''
                        }
                        
                        this.salir_HC890L()
                    }
                }
            )
        },
        validarDiscapacidadFisica() {
            validarInputs(
                {
                    form: "#validarDiscapacidadFisica_HC890L",
                    orden: '1'
                }, () => {
                    this.validarLlenadoDiscapacidad()
                },
                () => {
                    this.global_HC890L.fisica = this.global_HC890L.fisica.toUpperCase().trim() != 'S' ? "N" : "S"

                    this.validarDiscapacidadMental()
                }
            )
        },
        validarDiscapacidadMental() {
            validarInputs(
                {
                    form: "#validarDiscapacidadMental_HC890L",
                    orden: '1'
                }, () => {
                    this.validarDiscapacidadFisica()
                },
                () => {
                    this.global_HC890L.mental = this.global_HC890L.mental.toUpperCase().trim() != 'S' ? "N" : "S"

                    this.validarDiscapacidadCognitiva()
                }
            )
        },
        validarDiscapacidadCognitiva() {
            validarInputs(
                {
                    form: "#validarDiscapacidadCognitiva_HC890L",
                    orden: '1'
                }, () => {
                    this.validarDiscapacidadMental()
                },
                () => {
                    this.global_HC890L.cognitiva = this.global_HC890L.cognitiva.toUpperCase().trim() != 'S' ? "N" : "S"

                    this.validarDiscapacidadAuditiva()
                }
            )
        },
        validarDiscapacidadAuditiva() {
            validarInputs(
                {
                    form: "#validarDiscapacidadAuditiva_HC890L",
                    orden: '1'
                }, () => {
                    this.validarDiscapacidadCognitiva()
                },
                () => {
                    this.global_HC890L.auditiva = this.global_HC890L.auditiva.toUpperCase().trim() != 'S' ? "N" : "S"

                    this.validarDiscapacidadVisual()
                }
            )
        },
        validarDiscapacidadVisual() {
            validarInputs(
                {
                    form: "#validarDiscapacidadVisual_HC890L",
                    orden: '1'
                }, () => {
                    this.validarDiscapacidadAuditiva()
                },
                () => {
                    this.global_HC890L.visual = this.global_HC890L.visual.toUpperCase().trim() != 'S' ? "N" : "S"

                    this.salir_HC890L()
                }
            )
        },
        salir_HC890L() {
            this.callbackSiguiente(this.global_HC890L)
        }
    }
})