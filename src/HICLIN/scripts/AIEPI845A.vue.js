var component_AIEPI845A = Vue.component("content_aiepi845a", {
    props: {
        estado: false,
        unidad_serv: '',
        detalle_historia: {
            antec_perinatal: {}
        }
    },
    data() {
        return {
            DETALLE: this.detalle_historia,
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
                serologia_madre: '',
                lactancia_materna: ''
            }
        }
    },
    watch: {
        estado: function (data) {
            var _this = this
            switch (data) {
                case 1:
                    if (_this.unidad_serv == '08') _this.validarEmbarazoDeseado()
                    else _this.validarAntecedentes_text()
                    break;
                case 2:
                    if (_this.unidad_serv == '08') _this.validarPatologiasFam()
                    else _this.validarAntecedentes_text()
                    break;
            }
        },
        "DETALLE.antec_perinatal.serologia_madre": function (data) {
            var consulta = this.serologia.find(x => x.COD == data)
            if (consulta) this.textos.serologia_madre = consulta.DESCRIP
        },
        "DETALLE.antec_perinatal.lactan_materna": function (data) {
            var consulta = this.lactancia.find(x => x.COD == data)
            if (consulta) this.textos.lactancia_materna = consulta.DESCRIP
        }
    },
    methods: {
        salirAtrasComponente() {
            console.log('sale')
            this.$emit('callback_esc', this.DETALLE, false)
        },
        validarAntecedentes_text() {
            validarInputs(
                {
                    form: "#validar_Antecedentes_text_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.salirAtrasComponente()
                },
                () => {
                    this.DETALLE.antec_perinatal_text = this.DETALLE.antec_perinatal_text.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').trim();
                    this.salirAdelanteComponente()
                }
            )
        },
        validarEmbarazoDeseado() {
            validarInputs(
                {
                    form: "#validarEmbarazoDeseado_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.salirAtrasComponente()
                },
                () => {
                    this.DETALLE.antec_perinatal.embarazo_deseado = this.DETALLE.antec_perinatal.embarazo_deseado.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.embarazo_deseado) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarPatolEmbarazo()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.embarazo_deseado = 'N'
                            this.validarPatolEmbarazo()
                            break;
                    }
                }
            )
        },
        validarPatolEmbarazo() {
            validarInputs(
                {
                    form: "#validarPatolEmbarazo_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarEmbarazoDeseado()
                },
                () => {
                    this.DETALLE.antec_perinatal.patol_embarazo = this.DETALLE.antec_perinatal.patol_embarazo.trim().toUpperCase()
                    this.validarPatolParto()
                }
            )
        },
        validarPatolParto() {
            validarInputs(
                {
                    form: "#validarPatolParto_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarPatolEmbarazo()
                },
                () => {
                    this.DETALLE.antec_perinatal.patol_parto = this.DETALLE.antec_perinatal.patol_parto.trim().toUpperCase()
                    this.validarPatolPuerperio()
                }
            )
        },
        validarPatolPuerperio() {
            validarInputs(
                {
                    form: "#validarPatolPuerperio_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarPatolParto()
                },
                () => {
                    this.DETALLE.antec_perinatal.patol_puerperio = this.DETALLE.antec_perinatal.patol_puerperio.trim().toUpperCase()
                    this.validarLugarNacim()
                }
            )
        },
        validarLugarNacim() {
            validarInputs(
                {
                    form: "#validarLugarNacim_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarPatolPuerperio()
                },
                () => {
                    this.DETALLE.antec_perinatal.lugar_nacimiento = this.DETALLE.antec_perinatal.lugar_nacimiento.trim()
                    this.validarApgar01()
                }
            )
        },
        validarApgar01() {
            var _this = this
            var select = ''

            if (this.DETALLE.antec_perinatal.apgar_1_min == '10') {
                select = 'A'
            } else if (this.DETALLE.antec_perinatal.apgar_1_min == 'NR') {
                select = 'B'
            } else {
                select = parseInt(this.DETALLE.antec_perinatal.apgar_1_min) ? parseInt(this.DETALLE.antec_perinatal.apgar_1_min).toString() : ''
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
                    _this.DETALLE.antec_perinatal.apgar_1_min = data.DESCRIP

                    _this.validarApgar05()
                })
            }, 300)
        },
        validarApgar05() {
            var _this = this
            var select = ''

            if (this.DETALLE.antec_perinatal.apgar_5_min == '10') {
                select = 'A'
            } else if (this.DETALLE.antec_perinatal.apgar_5_min == 'NR') {
                select = 'B'
            } else {
                select = parseInt(this.DETALLE.antec_perinatal.apgar_5_min) ? parseInt(this.DETALLE.antec_perinatal.apgar_5_min).toString() : ''
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
                    _this.DETALLE.antec_perinatal.apgar_5_min = data.DESCRIP

                    _this.validarApgar10()
                })
            }, 300)
        },
        validarApgar10() {
            var _this = this
            var select = ''

            if (this.DETALLE.antec_perinatal.apgar_10_min == '10') {
                select = 'A'
            } else if (this.DETALLE.antec_perinatal.apgar_10_min == 'NR') {
                select = 'B'
            } else {
                select = parseInt(this.DETALLE.antec_perinatal.apgar_10_min) ? parseInt(this.DETALLE.antec_perinatal.apgar_10_min).toString() : ''
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
                    _this.DETALLE.antec_perinatal.apgar_10_min = data.DESCRIP

                    _this.validarAtencionPerinatal()
                })
            }, 300)
        },
        validarAtencionPerinatal() {
            validarInputs(
                {
                    form: "#validarAtencionPerinatal_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarApgar10()
                },
                () => {
                    this.DETALLE.antec_perinatal.atencion_perinatal = this.DETALLE.antec_perinatal.atencion_perinatal.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.atencion_perinatal) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarReanimacion()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.atencion_perinatal = 'N'
                            this.validarReanimacion()
                            break;
                    }
                }
            )
        },
        validarReanimacion() {
            validarInputs(
                {
                    form: "#validarReanimacion_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarAtencionPerinatal()
                },
                () => {
                    this.DETALLE.antec_perinatal.reanimacion = this.DETALLE.antec_perinatal.reanimacion.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.reanimacion) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarGrpSangMadre()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.reanimacion = 'N'
                            this.validarGrpSangMadre()
                            break;
                    }
                }
            )
        },
        validarGrpSangMadre() {
            validarInputs(
                {
                    form: "#validarGrupoSangMadre_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarReanimacion()
                },
                () => {
                    this.DETALLE.antec_perinatal.grupo_sang_madre = this.DETALLE.antec_perinatal.grupo_sang_madre.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.grupo_sang_madre) {
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
                    form: "#validarRhMadre_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarGrpSangMadre()
                },
                () => {
                    switch (this.DETALLE.antec_perinatal.rh_madre) {
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
                    seleccion: _this.DETALLE.antec_perinatal.serologia_madre,
                    teclaAlterna: true,
                }, data => {
                    _this.DETALLE.antec_perinatal.serologia_madre = data.COD

                    _this.validarLactanciaMaterna()
                })
            }, 300)
        },
        validarLactanciaMaterna() {
            var _this = this

            setTimeout(() => {
                POPUP({
                    titulo: "Lactancia materna",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.lactancia,
                    callback_f: () => this.validarSerologiaMadre(),
                    seleccion: _this.DETALLE.antec_perinatal.lactan_materna,
                    teclaAlterna: true,
                }, data => {
                    _this.DETALLE.antec_perinatal.lactan_materna = data.COD
                    _this.textos.lactancia_materna = data.DESCRIP

                    _this.validarSano()
                })
            }, 300)
        },
        validarSano() {
            validarInputs(
                {
                    form: "#validarSano_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarLactanciaMaterna()
                },
                () => {
                    this.DETALLE.antec_perinatal.sano = this.DETALLE.antec_perinatal.sano.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.sano) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarHemorragias()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.sano = 'N'
                            this.validarHemorragias()
                            break;
                    }
                }
            )
        },
        validarHemorragias() {
            validarInputs(
                {
                    form: "#validarHemorragias_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarSano()
                },
                () => {
                    this.DETALLE.antec_perinatal.hemorragias = this.DETALLE.antec_perinatal.hemorragias.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.hemorragias) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarInfecciones()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.hemorragias = 'N'
                            this.validarInfecciones()
                            break;
                    }
                }
            )
        },
        validarInfecciones() {
            validarInputs(
                {
                    form: "#validarInfecciones_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarHemorragias()
                },
                () => {
                    this.DETALLE.antec_perinatal.infecciones = this.DETALLE.antec_perinatal.infecciones.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.infecciones) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarDeformaciCongeni()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.infecciones = 'N'
                            this.validarDeformaciCongeni()
                            break;
                    }
                }
            )
        },
        validarDeformaciCongeni() {
            validarInputs(
                {
                    form: "#validarDeformasCongeni_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarInfecciones()
                },
                () => {
                    this.DETALLE.antec_perinatal.deforma_cong = this.DETALLE.antec_perinatal.deforma_cong.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.deforma_cong) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarHipoglicemia()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.deforma_cong = 'N'
                            this.validarHipoglicemia()
                            break;
                    }
                }
            )
        },
        validarHipoglicemia() {
            validarInputs(
                {
                    form: "#validarHipoglicemia_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarDeformaciCongeni()
                },
                () => {
                    this.DETALLE.antec_perinatal.hipoglicemia = this.DETALLE.antec_perinatal.hipoglicemia.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.hipoglicemia) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarApnea()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.hipoglicemia = 'N'
                            this.validarApnea()
                            break;
                    }
                }
            )
        },
        validarApnea() {
            validarInputs(
                {
                    form: "#validarApnea_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarHipoglicemia()
                },
                () => {
                    this.DETALLE.antec_perinatal.apnea = this.DETALLE.antec_perinatal.apnea.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.apnea) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarIctericia()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.apnea = 'N'
                            this.validarIctericia()
                            break;
                    }
                }
            )
        },
        validarIctericia() {
            validarInputs(
                {
                    form: "#validarIctericia_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarApnea()
                },
                () => {
                    this.DETALLE.antec_perinatal.ictericia = this.DETALLE.antec_perinatal.ictericia.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.ictericia) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarBroncoAsp()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.ictericia = 'N'
                            this.validarBroncoAsp()
                            break;
                    }
                }
            )
        },
        validarBroncoAsp() {
            validarInputs(
                {
                    form: "#validarBroncoaspiracion_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarIctericia()
                },
                () => {
                    this.DETALLE.antec_perinatal.broncoasp = this.DETALLE.antec_perinatal.broncoasp.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.broncoasp) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarNeurologia()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.broncoasp = 'N'
                            this.validarNeurologia()
                            break;
                    }
                }
            )
        },
        validarNeurologia() {
            validarInputs(
                {
                    form: "#validarNeurologias_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarBroncoAsp()
                },
                () => {
                    this.DETALLE.antec_perinatal.neurologia = this.DETALLE.antec_perinatal.neurologia.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.neurologia) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarMembHialina()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.neurologia = 'N'
                            this.validarMembHialina()
                            break;
                    }
                }
            )
        },
        validarMembHialina() {
            validarInputs(
                {
                    form: "#validarMembHialina_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarNeurologia()
                },
                () => {
                    this.DETALLE.antec_perinatal.memb_hialina = this.DETALLE.antec_perinatal.memb_hialina.toUpperCase().trim()

                    switch (this.DETALLE.antec_perinatal.memb_hialina) {
                        case 'S':
                        case 'N':
                        case 'I':
                            this.validarNroHermanos()
                            break;
                        default:
                            this.DETALLE.antec_perinatal.memb_hialina = 'N'
                            this.validarNroHermanos()
                            break;
                    }
                }
            )
        },
        validarNroHermanos() {
            validarInputs(
                {
                    form: "#validarNroHermanos_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarMembHialina()
                },
                () => {
                    var NroHermanos = cerosIzq(this.DETALLE.antec_perinatal.nro_hermanos.trim(), 2)

                    if (NroHermanos == '00') {
                        this.DETALLE.antec_perinatal.nro_hermanos = '00'
                        this.DETALLE.antec_perinatal.hermanos_muer = '00'
                        this.DETALLE.antec_perinatal.hermanos_vivos = '00'
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
                    form: "#validarHermanosMuertos_AIEPI845A",
                    orden: '1'
                }, () => {
                    this.validarNroHermanos()
                },
                () => {
                    var NroHermanos = parseInt(this.DETALLE.antec_perinatal.nro_hermanos.trim())
                    var HermanosMuer = parseInt(this.DETALLE.antec_perinatal.hermanos_muer.trim())

                    if (NroHermanos < HermanosMuer) {
                        CON851('03', '03', null, 'error', 'Error')
                        this.validarHermanosMuertos()
                    } else {
                        var vivos = NroHermanos - HermanosMuer
                        this.DETALLE.antec_perinatal.hermanos_vivos = vivos.toString()
                        this.validarPatologiasFam()
                    }
                }
            )
        },
        validarPatologiasFam() {
            validarInputs(
                {
                    form: "#validarPatologiasFamiliares_AIEPI845A",
                    orden: '1'
                }, () => {
                    var NroHermanos = parseInt(this.DETALLE.antec_perinatal.nro_hermanos.trim())

                    if (NroHermanos == 0) {
                        this.validarNroHermanos()
                    } else {
                        this.validarHermanosMuertos()
                    }
                },
                () => {
                    this.salirAdelanteComponente()
                }
            )
        },
        salirAdelanteComponente() {
            this.$emit('callback', this.DETALLE, false)
        }
    },
    template: /*html*/ `
    <div v-if="unidad_serv == '08'" class="form-group col-md-12 col-sm-12 col-xs-12 box-center">

        <div class="col-md-12 no-padding">

            <div class="col-md-6 no-padding" style="text-align: left;border-right:  1.5px solid #ececec">

                <div class="col-md-6" style="display: flex;justify-content: space-between;top: 8px;">

                    <div class="col-md-11 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                        id="validarEmbarazoDeseado_AIEPI845A">
                        <label style="position: relative;top: 6px;">Embarazo deseado ?</label>
                        <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                            <input v-model="DETALLE.antec_perinatal.embarazo_deseado" type="text" maxlength="1"
                                placeholder="N" data-orden="1" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-4 col-xs-12" id="validarPatolEmbarazo_AIEPI845A" style="text-align: left">
                    <label>Patología embarazo</label>
                    <div class="inline-inputs">
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input data-orden="1" maxlength="30" type="text"
                                v-model="DETALLE.antec_perinatal.patol_embarazo" style="text-align: left;"
                                required="true" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase"
                                disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>

                <div class="col-md-6 col-sm-4 col-xs-12" id="validarPatolParto_AIEPI845A" style="text-align: left">
                    <label>Patología parto</label>
                    <div class="inline-inputs">
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input data-orden="1" maxlength="30" type="text"
                                v-model="DETALLE.antec_perinatal.patol_parto" style="text-align: left;"
                                required="true" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase"
                                disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-4 col-xs-12" id="validarPatolPuerperio_AIEPI845A" style="text-align: left">
                    <label>Patología puerperio</label>
                    <div class="inline-inputs">
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input data-orden="1" maxlength="30" type="text"
                                v-model="DETALLE.antec_perinatal.patol_puerperio" style="text-align: left;"
                                required="true" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase"
                                disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>

                <div class="col-md-6 col-sm-12 col-xs-12" id="validarLugarNacim_AIEPI845A" style="text-align: left">
                    <label>Lugar nacimiento</label>
                    <div class="inline-inputs">
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input data-orden="1" maxlength="20" type="text"
                                v-model="DETALLE.antec_perinatal.lugar_nacimiento" style="text-align: left;"
                                required="true" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase"
                                disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="col-md-6 no-padding" style="display: flex;justify-content: space-between;">

                    <div class="col-md-4 col-sm-4 col-xs-12" style="text-align: left">
                        <label>Apgar 1 Min</label>
                        <div class="inline-inputs">
                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                <input type="text" v-model="DETALLE.antec_perinatal.apgar_1_min"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-4 col-xs-12" style="text-align: left; padding-left: 8px;">
                        <label>Apgar 5 Min</label>
                        <div class="inline-inputs">
                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                <input type="text" v-model="DETALLE.antec_perinatal.apgar_5_min"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-4 col-xs-12" style="text-align: left; padding-left: 6px;">
                        <label>Apgar 10 Min</label>
                        <div class="inline-inputs">
                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input type="text" v-model="DETALLE.antec_perinatal.apgar_10_min"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>

                <div class="col-md-12 no-padding" style="display: flex;justify-content: space-between;">

                    <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                        id="validarAtencionPerinatal_AIEPI845A">
                        <label style="position: relative;top: 6px;">Atención perinatal ?</label>
                        <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                            <input v-model="DETALLE.antec_perinatal.atencion_perinatal" type="text"
                                maxlength="1" placeholder="N" data-orden="1" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                        </div>
                    </div>

                    <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarReanimacion_AIEPI845A">
                        <label style="position: relative;top: 6px;">Reanimación ?</label>
                        <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                            <input type="text" maxlength="1" placeholder="N" data-orden="1"
                                v-model="DETALLE.antec_perinatal.reanimacion" disabled="disabled"
                                class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>

                <div class="col-md-12 no-padding" style="display: flex;justify-content: space-between;">

                    <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarGrupoSangMadre_AIEPI845A">
                        <label style="position: relative;top: 6px;">Grupo sang Madre</label>
                        <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                            <input v-model="DETALLE.antec_perinatal.grupo_sang_madre" type="text" maxlength="2"
                                data-orden="1" disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                                style="text-align: center;">
                        </div>
                    </div>

                    <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarRhMadre_AIEPI845A">
                        <label style="position: relative;top: 6px;">RH Madre </label>
                        <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                            <input v-model="DETALLE.antec_perinatal.rh_madre" type="text" maxlength="1"
                                data-orden="1" disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                                style="text-align: center;">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>

                <div class="col-md-12 no-padding" style="display: flex;justify-content: space-around;">

                    <div class="col-md-4 col-sm-4 col-xs-12" style="text-align: left">
                        <label>Serología Madre</label>
                        <div class="inline-inputs">
                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                <input data-orden="1" type="text" v-model="textos.serologia_madre"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-4 col-xs-12" style="text-align: left">
                        <label>Lactancia materna</label>
                        <div class="inline-inputs">
                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                <input data-orden="1" type="text" v-model="textos.lactancia_materna"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-md-6" style="padding-left: 15px;">

                <div class="col-md-12 no-padding" style="text-align: left;border-bottom:  1.5px solid #ececec">

                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="text-align: center;">
                        <label>Patologias del recién nacido</label>
                        <div class="tooltip-proft left-text">
                            <span class="icon-proft icon-info"></span>
                            <span class="tiptext">
                                <div>Opciones respuesta: S (si),N (no),I (ignora)</div>
                            </span>
                        </div>
                    </div>

                    <div class="salto-linea"></div>

                    <div class="col-md-12 no-padding" style="display: flex;justify-content: space-between;">

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarSano_AIEPI845A">
                            <label style="position: relative;top: 6px;">Sano ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.sano" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarHemorragias_AIEPI845A">
                            <label style="position: relative;top: 6px;">Hemorragias ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.hemorragias" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>
                    </div>

                    <div class="salto-linea"></div>

                    <div class="col-md-12 no-padding" style="display: flex;justify-content: space-between;">

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarInfecciones_AIEPI845A">
                            <label style="position: relative;top: 6px;">Infecciones ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.infecciones" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                            id="validarDeformasCongeni_AIEPI845A">
                            <label style="position: relative;top: 6px;">Deformac congeni ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.deforma_cong" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>
                    </div>

                    <div class="salto-linea"></div>

                    <div class="col-md-12 no-padding" style="display: flex;justify-content: space-between;">

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                            id="validarHipoglicemia_AIEPI845A">
                            <label style="position: relative;top: 6px;">Hipoglicemia ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.hipoglicemia" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarApnea_AIEPI845A">
                            <label style="position: relative;top: 6px;">Apnea ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.apnea" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>
                    </div>

                    <div class="salto-linea"></div>

                    <div class="col-md-12 no-padding" style="display: flex;justify-content: space-between;">

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarIctericia_AIEPI845A">
                            <label style="position: relative;top: 6px;">Ictericia ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input type="text" maxlength="1" placeholder="N" data-orden="1"
                                    v-model="DETALLE.antec_perinatal.ictericia" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                            id="validarBroncoaspiracion_AIEPI845A">
                            <label style="position: relative;top: 6px;">Broncoaspiración ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input type="text" maxlength="1" placeholder="N" data-orden="1"
                                    v-model="DETALLE.antec_perinatal.broncoasp" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>
                    </div>

                    <div class="salto-linea"></div>

                    <div class="col-md-12 no-padding" style="display: flex;justify-content: space-between;">

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarNeurologias_AIEPI845A">
                            <label style="position: relative;top: 6px;">Neurologías ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.neurologia" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarMembHialina_AIEPI845A">
                            <label style="position: relative;top: 6px;">Membrana Hialina ?</label>
                            <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                                <input v-model="DETALLE.antec_perinatal.memb_hialina" type="text" maxlength="1"
                                    placeholder="N" data-orden="1" disabled="disabled"
                                    class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                            </div>
                        </div>
                    </div>

                    <div class="salto-linea"></div>

                </div>

                <div class="salto-linea"></div>

                <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="text-align: center;">
                    <label>Hermanos</label>
                </div>

                <div class="salto-linea"></div>

                <div class="col-md-4 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarNroHermanos_AIEPI845A">
                    <label style="position: relative;top: 8px;"># de hermanos</label>
                    <div class="col-md-4 no-padding inline-inputs" style="float: right;">
                        <input v-model="DETALLE.antec_perinatal.nro_hermanos" type="number" maxlength="2"
                            data-orden="1" disabled="disabled" class="form-control col-md-12 col-sm-12 col-xs-12"
                            style="text-align: center;">
                    </div>
                </div>

                <div v-if="DETALLE.antec_perinatal.nro_hermanos != '00' && DETALLE.antec_perinatal.nro_hermanos != ''"
                    class="col-md-5 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="validarHermanosMuertos_AIEPI845A">
                    <label style="position: relative;top: 8px;">Muertos < 5 años</label>
                    <div class="col-md-3 no-padding inline-inputs" style="float: right;">
                         <input v-model="DETALLE.antec_perinatal.hermanos_muer" type="number"
                                maxlength="2" data-orden="1" disabled="disabled" required="true"
                                class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                    </div>
                </div>


                <div v-if="DETALLE.antec_perinatal.nro_hermanos != '00' && DETALLE.antec_perinatal.nro_hermanos != ''"
                    class="col-md-3 col-sm-12 col-xs-12 form-group form-md-checkboxes">
                    <label style="position: relative;top: 8px;">Vivos</label>
                    <div class="col-md-5 no-padding inline-inputs" style="float: right;">
                        <input v-model="DETALLE.antec_perinatal.hermanos_vivos" type="text" disabled="disabled"
                            class="form-control col-md-12 col-sm-12 col-xs-12" style="text-align: center;">
                    </div>
                </div>

            </div>
        </div>

        <div class="salto-linea"></div>

        <div class="col-md-12 no-padding" style="border-top: 1.5px solid #ececec">

            <div class="salto-linea"></div>
            <div class="salto-linea"></div>

            <div class="col-md-12 col-sm-12 col-xs-12" style="display: flex; justify-content: space-around">
                <div class="col-md-2" style="top: 19px;">
                    <label>Patologías familiares</label>
                    <label>(300 caracteres máximo)</label>
                </div>

                <div class="col-md-9 col-sm-12 col-xs-12" id="validarPatologiasFamiliares_AIEPI845A">
                    <div class="col-md-12">

                        <textarea v-model="DETALLE.antec_perinatal.patologias_familiares" class="form-control"
                            rows="3" maxlength="300" data-orden="1" disabled="disabled"
                            style="resize: none;font-size: 15px; text-align: justify" required="true"></textarea>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="validar_Antecedentes_text_AIEPI845A">
            <div class="col-md-12 col-sm-12 col-xs-12 head-box"
                style="display: flex; justify-content:space-between; padding-right: 0; padding-left: 0;">
                <label>Digite:</label>
                <label>(19,000 caracteres máximo)</label>
            </div>
            <textarea class="form-control" v-model="DETALLE.antec_perinatal_text" disabled="disabled" rows="15"
                maxlength="19000" data-orden="1" required="true" style="resize: none; text-align: justify"></textarea>
            </div>
    </div>`,
});
