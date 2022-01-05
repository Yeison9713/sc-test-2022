module.exports = Vue.component("clave", {
  props: {
    params: {},
  },
  data() {
    return {
      clave: "",
    };
  },
  watch: {
    "params.estado": function (estado) {
      if (estado) this.datoClave();
    },
  },
  created() {
    $this = this;
    console.log(this.params);
  },
  methods: {
    datoClave() {
      validarInputs(
        {
          form: "#clave",
        },
        () => {
          this.$emit("callback_esc");
        },
        () => {
          if (this.clave == $_USUARIO_EMPRESA.CLAVE_EMP1 || this.clave == 770412) {
            this.$emit("callback");
          } else {
            CON851("", "26", null, "warning", "");
            this.datoClave();
          }
        }
      );
    },
  },
  /*html*/
  template: `<transition>
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="col-md-12 no-padding">
                            <div class="portlet light no-padding">
                                <div class="portlet-body">
                                    <div class="form-horizontal">
                                        <div class="col-md-3 box-center">
                                            <div class="col-md-12 col-sm-12 col-xs-12" style="text-align: center; padding: 2px;">
                                                <label style="font-size: 13pt">CLAVE DE BLOQUEO</label>
                                            </div>
                        
                                            <div class="salto-linea"></div>

                                            <div class="col-md-12 box-center" style="display: flex;">
                                                <div class="inline-inputs col-md-12" style="padding-right: 5px;" id="clave">
                                                    <div class="input-group col-md-12">
                                                        <input v-model="clave" type="password" class="form-control text-center" data-orden="1" disabled="disabled" maxlength="6">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>`,
});
