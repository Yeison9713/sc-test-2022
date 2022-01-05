// 2021/02/11 GABY CREACION

var ventana_agendamiento = Vue.component('ventana_agendamiento', {
    props: {
        data: {},
        paciente: ''
    },
    data() {
        return {};
    },
    created() {
        this.focoTabla(0);
    },
    computed: {},
    methods: {
        focoTabla(order) {
            validarTabla(
                {
                    tabla: '#tablaIzq_VentanaDatosDoble',
                    orden: order,
                    cambioFoco: (a) => this.$emit('cambiofocotabla', a),
                    Esc: () => this.$emit('callback_esc')
                },
                () => this.focoTabla(0),
                () => this.focoTabla(0),
                () => this.focoTabla(tablaIzq_VentanaDatosDoble.rows.length - 1)
            );
        }
    },
    template: /*html*/ `
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding">

                    <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center" style="text-align: left">

                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="text-align:center">
                            <slot name="titulo">Sin Titulo</slot>
                        </div>

                        <div class="salto-linea"></div>
                        <div class="salto-linea"></div>

                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="display:flex; justify-content: space-around">

                                <div class="col-md-3 no-padding">
                                    <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="text-align:center;">
                                        <slot name="Busqueda">Sin Opciones de Búsqueda</slot>
                                    </div>
                                    <div style="max-height: 232px; display: inline-block;width: 100%">
                                    <table class="table table-light table-striped" style="margin-bottom: 0px; width: 97%;">
                                        <thead>
                                            <slot name="EncabezadoTablaIzquierda">Sin Encabezado</slot>
                                        </thead>
                                    </table>
                               </div>

                               <div style="max-height: 300px; overflow-y: scroll; display: inline-block;width: 100%">
                                  <table id="tablaIzq_VentanaDatosDoble" class="table table-light table-striped" style="margin-bottom: 0px">
                                      <tbody>
                                          <slot name="ContenidoTablaIzquierda">Sin Contenido</slot>
                                      </tbody>
                                  </table>
                               </div>
                            </div>

                            <div class="col-md-9 no-padding">

                                <table class="table table-light table-striped col-md-12" style="margin-bottom: 0px; width: 97%;">
                                     <thead>
                                         <slot name="EncabezadoTablaDerecha">Sin Encabezado</slot>
                                      </thead>
                                </table>

                                <div style="max-height: 550px; overflow-y: scroll; display: inline-block;width: 100%">
                                  <table class="col-md-12" style="margin-bottom: 0px;">
                                        <slot name="ContenidoTablaDerecha">Sin Contenido</slot>
                                  </table>
                                </div>

                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </transition>
    `
});
