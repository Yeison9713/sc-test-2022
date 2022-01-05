module.exports = Vue.component("component-createrceros", {
template: /*html*/ `\
<div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Crear tercero</h4>
        </div>
        <div class="modal-body" style="margin: 0 !important;">
          <div class="portlet-body form">
            <form class="form-horizontal" role="form">
              <div class="form-body" style="padding: 0 !important;">
              <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                    <div class="inline-inputs">
                    <label class="col-md-6 col-sm-6 col-xs-6">Novedad:</label>
                    <div class="input-group col-md-8 col-sm-8 col-xs-8">
                        <input
                        type="text"
                        class="form-control col-md-12 col-sm-12 col-xs-12"
                        v-model="novedad.descripcion"
                        />
                    </div>
                    </div>
                </div>
                </div>
                <div class="form-group">
                  <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        CC o NIT:
                      </label>
                      <div
                        class="input-group col-md-8 col-sm-8 col-xs-8"
                        id="modal_nit_cor201"
                      >
                        <input
                          type="number"
                          data-orden="1"
                          maxlength="10"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.id"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                      <label class="col-md-7 col-sm-7 col-xs-7">
                        Tipo identificación:
                      </label>
                      <div class="input-group col-md-5 col-sm-5 col-xs-5">
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="12"
                          class="form-control col-md-12"
                          v-model="format_tipo_id"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-12 col-sm-12 col-xs-12 margin-top-10"
                    v-if="modal_ter.tipo_identificacion === '7'"
                  >
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        Razón social:
                      </label>
                      <div
                        class="input-group col-md-8 col-sm-8 col-xs-8"
                        id="modal_razon_cor201"
                      >
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="50"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.razon_social"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-12 col-sm-12 col-xs-12 margin-top-10"
                    v-if="modal_ter.tipo_identificacion !== '7'"
                  >
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        Primer apellido:
                      </label>
                      <div
                        class="input-group col-md-8 col-sm-8 col-xs-8"
                        id="modal_apellido1_cor201"
                      >
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="15"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.apellido_1"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-12 col-sm-12 col-xs-12 margin-top-10"
                    v-if="modal_ter.tipo_identificacion !== '7'"
                  >
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        Segundo apellido:
                      </label>
                      <div
                        class="input-group col-md-8 col-sm-8 col-xs-8"
                        id="modal_apellido2_cor201"
                      >
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="15"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.apellido_2"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-12 col-sm-12 col-xs-12 margin-top-10"
                    v-if="modal_ter.tipo_identificacion !== '7'"
                  >
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        Nombres:
                      </label>
                      <div
                        class="input-group col-md-8 col-sm-8 col-xs-8"
                        id="modal_nombres_cor201"
                      >
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="20"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.nombres"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 margin-top-10">
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        Dirección:
                      </label>
                      <div
                        class="input-group col-md-8 col-sm-8 col-xs-8"
                        id="modal_dirreccion_cor201"
                      >
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="20"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.direccion"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 margin-top-10">
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        Telefono:
                      </label>
                      <div
                        class="input-group col-md-6 col-sm-6 col-xs-6"
                        id="modal_telefono_cor201"
                      >
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="12"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.telefono"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 margin-top-10">
                    <div class="inline-inputs">
                      <label class="col-md-4 col-sm-4 col-xs-4">
                        Email:
                      </label>
                      <div
                        class="input-group col-md-8 col-sm-8 col-xs-8"
                        id="modal_email_cor201"
                      >
                        <input
                          type="text"
                          data-orden="1"
                          maxlength="50"
                          class="form-control col-md-12 col-sm-12 col-xs-12"
                          v-model="modal_ter.email"
                          required="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    `,
});