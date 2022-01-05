// CAPTURA DATOS LIQUIDOS ADMINISTRADOS Y ELIMINADOS
// 27/01/2021 JAVIER.L

var admin_liquidos = Vue.component('admin-liquidos', {
    props: {
        data: {}
    },
    data() {
        return {
            liquidos: this.data,
            liq_elim: 0,
            liq_admin: 0,
        }
    },
    created() {
        this.datoAdminOral();
    },
    computed: {
        liq_eliminados() {
            this.liq_elim = (parseInt(this.liquidos.LIQ_ELI_DET) || 0) +
                (parseInt(this.liquidos.LIQ_ELI_DIAR) || 0) +
                (parseInt(this.liquidos.LIQ_ELI_ORIN) || 0) +
                (parseInt(this.liquidos.LIQ_ELI_SOND) || 0) +
                (parseInt(this.liquidos.LIQ_ELI_OTR1) || 0);

            return this.liq_elim;
        },

        liq_neto() {
            return parseInt(this.liq_administrados) - parseInt(this.liq_eliminados);
        },

        liq_administrados() {
            let oral = parseInt(this.liquidos.LIQ_ADM_ORAL) || 0;
            let trans = parseInt(this.liquidos.LIQ_ADM_TRAN) || 0;
            let vena = parseInt(this.liquidos.LIQ_ADM_VENA) || 0;

            return oral + trans + vena;
        },
    },
    methods: {
        datoAdminOral() {
            validarInputs({
                form: '#validar_via_oral',
                orden: '1'
            }, () => {
                this.$emit('callback_esc');
            }, () => {
                this.liquidos.LIQ_ADM_ORAL = parseInt(this.liquidos.LIQ_ADM_ORAL) || 0;
                this.datoAdminVenosa();
            })
        },

        datoAdminVenosa() {
            validarInputs({
                form: '#validar_via_venosa',
                orden: '1'
            }, () => {
                this.datoAdminOral();
            }, () => {
                this.liquidos.LIQ_ADM_VENA = parseInt(this.liquidos.LIQ_ADM_VENA) || 0;
                this.datoAdminTransf();
            })
        },

        datoAdminTransf() {
            validarInputs({
                form: '#validar_transfusion',
                orden: '1'
            }, () => {
                this.datoAdminVenosa();
            }, () => {
                this.liquidos.LIQ_ADM_TRAN = parseInt(this.liquidos.LIQ_ADM_TRAN) || 0;
                this.datoElimOrina();
            })
        },

        datoElimOrina() {
            validarInputs({
                form: '#validar_orina',
                orden: '1'
            }, () => {
                this.datoAdminTransf();
            }, () => {
                this.liquidos.LIQ_ELI_ORIN = parseInt(this.liquidos.LIQ_ELI_ORIN) || 0;
                this.datoElimDiarrea();
            })
        },

        datoElimDiarrea() {
            validarInputs({
                form: '#validar_diarrea',
                orden: '1'
            }, () => {
                this.datoElimOrina();
            }, () => {
                this.liquidos.LIQ_ELI_DIAR = parseInt(this.liquidos.LIQ_ELI_DIAR) || 0;
                this.datoElimSonda();
            })
        },

        datoElimSonda() {
            validarInputs({
                form: '#validar_sonda',
                orden: '1'
            }, () => {
                this.datoElimDiarrea();
            }, () => {
                this.liquidos.LIQ_ELI_SOND = parseInt(this.liquidos.LIQ_ELI_SOND) || 0;
                this.datoElimOtros();
            })
        },

        datoElimOtros() {
            validarInputs({
                form: '#validar_otros',
                orden: '1'
            }, () => {
                this.datoElimSonda();
            }, () => {
                this.liquidos.LIQ_ELI_OTR1 = parseInt(this.liquidos.LIQ_ELI_OTR1) || 0;
                this.datoDetalleElimOtros();
            })
        },

        datoDetalleElimOtros() {
            if (parseInt(this.liquidos.LIQ_ELI_OTR1) == 0) {
                this.liquidos.LIQ_ELI_DET = '';
                this.terminar()
            } else {
                validarInputs({
                    form: '#validar_detalle_otros',
                    orden: '1'
                }, () => {
                    this.datoElimOtros();
                }, () => {
                    if (!this.liquidos.LIQ_ELI_DET.trim()) {
                        this.datoDetalleElimOtros();
                    } else {
                        this.terminar();
                    }
                })
            };
        },

        terminar() {
            this.$emit('callback', this.liquidos)
        }
    },
    template: /*html*/ `
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="col-md-4 col-sm-6 col-xs-12 no-padding">
                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center" style="text-align: left">

                            <div class="col-md-12">
                                <div class="col-md-6 no-padding">

                                    <div class="col-md-12 col-sm-12 col-xs-12 head-box" style="padding: 10px !important">
                                        <label>Líquidos administrados</label>
                                    </div>

                                    <div class="col-md-12 no-padding">
                                        <div id="validar_via_oral" class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;">
                                            <label>Vía oral</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ADM_ORAL" data-orden="1"
                                                        type="number" maxlength="5"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;" id="validar_via_venosa">
                                            <label>Vía venosa</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ADM_VENA" data-orden="1"
                                                        type="number" maxlength="5"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;" id="validar_transfusion">
                                            <label>Transfusión</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ADM_TRAN" data-orden="1"
                                                        type="number" maxlength="5"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="salto-linea"></div>
                                        <div class="col-md-12"
                                            style="padding-top: 9px; display: flex; justify-content: space-around;">
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-top: 1.5rem;">
                                            <label>Total administrado</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liq_administrados" data-orden="1" maxlength="5"
                                                        type="number" class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-top: 1.5rem;">
                                            <label>Neto</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liq_neto" data-orden="1" maxlength="5" type="number"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 no-padding" style="border-left:  1.5px solid #ececec">

                                    <div class="col-md-12 col-sm-12 col-xs-12 head-box" style="padding: 10px !important">
                                        <label>Líquidos eliminados</label>
                                    </div>

                                    <div class="col-md-12 no-padding">
                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;" id="validar_orina">
                                            <label>Orina</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ELI_ORIN" data-orden="1"
                                                        maxlength="5" type="number"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;" id="validar_diarrea">
                                            <label>Diarrea</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ELI_DIAR" data-orden="1"
                                                        maxlength="5" type="number"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;" id="validar_sonda">
                                            <label>Sonda</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ELI_SOND" maxlength="5"
                                                        data-orden="1" type="number"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;" id="validar_otros">
                                            <label>Otros</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ELI_OTR1" data-orden="1"
                                                        type="number" maxlength="5"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12"
                                            style="text-align: left; padding-bottom: 1rem;" id="validar_detalle_otros">
                                            <label>Cual?</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liquidos.LIQ_ELI_DET" data-orden="1"
                                                        type="text" maxlength="10"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="salto-linea"></div>
                                        <div class="col-md-12"
                                            style="padding-top: 9px; display: flex; justify-content: space-around;">
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: left;">
                                            <label>Total eliminado</label>
                                            <div class="inline-inputs">
                                                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                    <input v-model="liq_eliminados" maxlength="5" data-orden="1" type="number"
                                                        class="form-control col-md-12 col-sm-12 col-xs-12"
                                                        style="text-align: center" disabled="disabled">
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
            </div>
        </div>
    </transition>
    `
})