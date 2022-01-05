// VENTANA LISTA DE CEQUEO   27/01/2021 JAVIER.L

var lista_chequeo_9003 = Vue.component('lista-chequeo-9003', {
    props: {
        data: {}
    },
    data() {
        return {
            lista_chequeo: this.data
        }
    },
    created() {
        console.log('created lista-chequeo');
        this.datoPaciConfirEnf();
    },
    methods: {
        datoPaciConfirEnf() {
            let _this = this;

            validarInputs({
                form: '#paci_confir_enf_9003',
                orden: '1'
            }, () => {
                this.$emit('callback_esc');
            }, () => {
                let value = _this.lista_chequeo.paci_confir_enf_9003.trim().toUpperCase();
                console.log('value:', value)
                if (value == 'S' || value == 'N') {
                    _this.datoAyunoConfirEnf();
                } else {
                    _this.datoPaciConfirEnf();
                }
            })
        },

        datoAyunoConfirEnf() {
            _this = this;
            console.log('ayuno')
            validarInputs({
                form: '#ayuno_confir_enf_9003',
                orden: '1'
            }, () => {
                _this.datoPaciConfirEnf();
            }, () => {
                let value = _this.lista_chequeo.ayuno_confir_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoAptoCirEnf();
                } else {
                    _this.datoAyunoConfirEnf();
                }
            })
        },

        datoAptoCirEnf() {
            _this = this;

            validarInputs({
                form: '#apto_cir_enf_9003',
                orden: '1'
            }, () => {
                _this.datoAyunoConfirEnf();
            }, () => {
                let value = _this.lista_chequeo.apto_cir_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoSinAccesoriosEnf();
                } else {
                    _this.datoAyunoConfir();
                }
            })
        },

        datoSinAccesoriosEnf() {
            _this = this;

            validarInputs({
                form: '#sin_accesorios_enf_9003',
                orden: '1'
            }, () => {
                _this.datoAptoCirEnf();
            }, () => {
                let value = _this.lista_chequeo.sin_accesorios_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoLugarCuerpoInterEnf();
                } else {
                    _this.datoSinAccesoriosEnf();
                }
            })
        },

        datoLugarCuerpoInterEnf() {
            _this = this;

            validarInputs({
                form: '#lugar_cuerpo_inter_enf_9003',
                orden: '1'
            }, () => {
                _this.datoSinAccesoriosEnf();
            }, () => {
                let value = _this.lista_chequeo.lugar_cuerpo_inter_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoProcediConfirEnfer();
                } else {
                    _this.datoLugarCuerpoInterEnf();
                }
            })
        },

        datoProcediConfirEnfer() {
            _this = this;

            validarInputs({
                form: '#procedi_confir_enf_9003',
                orden: '1'
            }, () => {
                _this.datoLugarCuerpoInterEnf();
            }, () => {
                let value = _this.lista_chequeo.procedi_confir_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoAntMedEnf();
                } else {
                    _this.datoProcediConfirEnfer();
                }
            })
        },

        datoAntMedEnf() {
            _this = this;

            validarInputs({
                form: '#ant_med_enf_9003',
                orden: '1'
            }, () => {
                _this.datoProcediConfirEnfer();
            }, () => {
                let value = _this.lista_chequeo.ant_med_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoAlergiasConocidadEnf();
                } else {
                    _this.datoAntMedEnf();
                }
            })
        },

        datoAlergiasConocidadEnf() {
            _this = this;

            validarInputs({
                form: '#alergias_conocidas_enf_9003',
                orden: '1'
            }, () => {
                _this.datoAntMedEnf();
            }, () => {
                let value = _this.lista_chequeo.alergias_conocidas_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoRiesgoViaAereaEnf();
                } else {
                    _this.datoAlergiasConocidadEnf();
                }
            })
        },

        datoRiesgoViaAereaEnf() {
            _this = this;

            validarInputs({
                form: '#riego_via_aerea_enf_9003',
                orden: '1'
            }, () => {
                _this.datoAlergiasConocidadEnf();
            }, () => {
                let value = _this.lista_chequeo.riego_via_aerea_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoRiesgoSangradoEnf();
                } else {
                    _this.datoRiesgoViaAereaEnf();
                }
            })
        },

        datoRiesgoSangradoEnf() {
            _this = this;

            validarInputs({
                form: '#riego_sangrado_enf_9003',
                orden: '1'
            }, () => {
                _this.datoRiesgoViaAereaEnf();
            }, () => {
                let value = _this.lista_chequeo.riego_sangrado_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoConsentimientEnf();
                } else {
                    _this.datoRiesgoSangradoEnf();
                }
            })
        },

        datoConsentimientEnf() {
            _this = this;

            validarInputs({
                form: '#consentimient_enf_9003',
                orden: '1'
            }, () => {
                _this.datoRiesgoSangradoEnf();
            }, () => {
                let value = _this.lista_chequeo.consentimient_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoTratNoSuspenEnf();
                } else {
                    _this.datoConsentimientEnf();
                }
            })
        },

        datoTratNoSuspenEnf() {
            _this = this;

            validarInputs({
                form: '#trat_no_suspen_enf_9003',
                orden: '1'
            }, () => {
                _this.datoConsentimientEnf();
            }, () => {
                let value = _this.lista_chequeo.trat_no_suspen_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.datoOrdenEntidadEnf();
                } else {
                    _this.datoTratNoSuspenEnf();
                }
            })
        },

        datoOrdenEntidadEnf() {
            _this = this;

            validarInputs({
                form: '#orden_entidad_enf_9003',
                orden: '1'
            }, () => {
                _this.datoTratNoSuspenEnf();
            }, () => {
                let value = _this.lista_chequeo.orden_entidad_enf_9003.trim().toUpperCase();
                if (value == 'S' || value == 'N') {
                    _this.$emit('callback', _this.lista_chequeo)
                } else {
                    _this.datoOrdenEntidadEnf();
                }
            })
        }
    },

    template: /*html*/ `
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="col-md-6 col-sm-6 col-xs-12 no-padding">
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                            <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                                <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">

                                    <div class="col-md-12 col-sm-12 col-xs-12 head-box">
                                        <label>Lista de chequeo admisión</label>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="paci_confir_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Id paciente confirmado
                                                ?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.paci_confir_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center; text-transform: uppercase;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="ayuno_confir_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Estado ayuno confirmado?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.ayuno_confir_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="apto_cir_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Estado salud apto para cirugía?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.apto_cir_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="sin_accesorios_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Paciente sin maquillaje, joyas, licra, etc?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.sin_accesorios_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="lugar_cuerpo_inter_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Lugar a ser intervenido?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.lugar_cuerpo_inter_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="procedi_confir_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Procedimiento a realizar confirmado?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.procedi_confir_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="ant_med_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Antecedentes médicos confirmados?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.ant_med_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="alergias_conocidas_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Alergias conocidas?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.alergias_conocidas_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="riego_via_aerea_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Riesgo de vía aérea difícil?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.riego_via_aerea_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="riego_sangrado_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Riesgo de sangrado?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.riego_sangrado_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="consentimient_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Consentimientos informados?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.consentimient_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="trat_no_suspen_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Tratamiento médico no suspendido?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.trat_no_suspen_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                    <div class="col-md-12 no-padding"
                                        style="display: flex; justify-content: center">
                                        <div id="orden_entidad_enf_9003"
                                            class="col-md-9 col-sm-12 col-xs-12 form-group form-md-checkboxes"
                                            style="text-align: left">
                                            <label style="position: relative;top: 6px;">Orden correcta y actualizada?</label>
                                            <div class="col-md-2 no-padding inline-inputs"
                                                style="float: right;">
                                                <input v-model="lista_chequeo.orden_entidad_enf_9003" type="text"
                                                    maxlength="1" placeholder="S/N" data-orden="1"
                                                    disabled="disabled"
                                                    class="form-control col-md-12 col-sm-12 col-xs-12 paciConfirmado"
                                                    style="text-align: center;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="salto-linea"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    `
});