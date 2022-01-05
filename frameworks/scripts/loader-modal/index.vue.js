module.exports = Vue.component("loader-modal", {
    props: {
        estado: false,
        progreso: {},
        loader: false,
        label: false
    },
    data() {
        return {}
    },
    methods: {
        get_progress(progreso) {
            if (progreso.completado) return '100%'
            else return !progreso.transferred || progreso.transferred == 0 ? 'Iniciando...' : (progreso.transferred / 1000000).toFixed(1) + ' MB'
        },
        get_speed(speed = 0) {
            return (speed / 100000).toFixed(1)
        }
    },
    template: /*html*/`<div>
        <transition>
            <div class="modal-mask" v-if="estado">
                <div class="modal-wrapper">
                    <div class="col-md-4 col-sm-6 col-xs-11 no-padding">
                        <div class="col-md-12 no-padding">
                            <div class="form-group col-md-12 box-center" style="margin-bottom: 0; padding: 10px;">
                                <div v-if="loader == 1">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-466.4 259.6 280.2 47.3" enable-background="new -466.4 259.6 280.2 47.3" xml:space="preserve" style="width: 90%; display: block; margin: 0 auto;">
                                        <polyline fill="none" stroke="#476fAD" class="ekg" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" points="-465.4,281 -436,281 -435.3,280.6 -431.5,275.2 -426.9,281 -418.9,281 -423.9,281 -363.2,281 -355.2,269 -345.2,303 -335.2,263 -325.2,291 -319.2,281 -187.2,281 "/>
                                    </svg>
                                </div>
                                <div v-else-if="loader == 2">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </div>
                                <div>
                                    <b v-if="label" v-html="label"></b>
                                    <br>
                                    <b>Datos procesados:</b> {{ get_progress(progreso) }} - <b>Velocidad:</b> {{ get_speed(progreso.speed) }}Mb/s
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>`
})

