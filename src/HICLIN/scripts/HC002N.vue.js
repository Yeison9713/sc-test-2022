// HISTORIAS CLINICAS NOTIFICACIONES A FACTURACION - julio 23/2021 - santiago franco

module.exports = Vue.component("content_hc002n", {
  props: {
    params: {},
  },
  data() {
    return {
      notifi: {},

      datos_notifi: this.params,

      form: {
        tablaNotif: '',
        fecha: '',
        fecha_not: '',
      },

      stylesHC002N: {
        flexRow: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
        flexIzq: {
          textAlign: "left",
          paddingLeft: "9px",
        },
      },

      fecha_act: moment().format("YYMMDD"),
      hora_act: moment().format("HHmm"),
    };
  },
  watch: {
    'form.tablaNotif': function (val) {
      this.form.tablaNotif = val ? val.replaceEsp() : ''
    },
  },
  created() {
    _compHC002N = this;
    this.cargarNotifi();
  },
  methods: {
    async llenarDatos() {
      var fecha = new Date();
      var diaActual = fecha.getDay();
      var diaString;
      switch (diaActual.toString()) {
        case '0': diaString = 'Domingo'; break;
        case '1': diaString = 'Lunes'; break;
        case '2': diaString = 'Martes'; break;
        case '3': diaString = 'Miercoles'; break;
        case '4': diaString = 'Jueves'; break;
        case '5': diaString = 'Viernes'; break;
        case '6': diaString = 'Sabado'; break;
      }

      var mesActual = fecha.getMonth() + 1;
      var mesString;
      switch (mesActual.toString()) {
        case '1': mesString = 'Ene'; break;
        case '2': mesString = 'Feb'; break;
        case '3': mesString = 'Mar'; break;
        case '4': mesString = 'Abr'; break;
        case '5': mesString = 'May'; break;
        case '6': mesString = 'Jun'; break;
        case '7': mesString = 'Jul'; break;
        case '8': mesString = 'Agt'; break;
        case '9': mesString = 'Sep'; break;
        case '10': mesString = 'Oct'; break;
        case '11': mesString = 'Nov'; break;
        case '12': mesString = 'Dic'; break;
      }

      var dia = moment().format("DD");
      var año = moment().format("YYYY");

      this.form.fecha = `${diaString} ${dia} ${mesString}/${año}`;

      if (this.notifi.length > 0) {
        this.form.fecha_not = `${this.notifi[0].OPER_ELAB} ${this.notifi[0].HORA} ${this.notifi[0].FECHA}`;
        this.form.tablaNotif = this.notifi[0].TABLA.replace(/(?:\&)/g, "\n");
      }

      this.datoTabla();
    },

    datoTabla() {
      validarInputs({
        form: '#tablaNotif',
        orden: '1',
        event_f5: () => {
          CON851P(
            "03",
            () => {
              this.datoTabla();
            },
            () => {
              this._terminar();
            }
          );
        },
      }, () => {
        CON851P(
          "03",
          () => {
            this.datoTabla();
          },
          () => {
            this._escape();
          }
        );
      }, () => {
        this.form.tablaNotif = this.form.tablaNotif.toUpperCase();
        this.confirmar();
      })
    },

    confirmar() {
      CON851P(
        "01",
        () => {
          this.datoTabla();
        },
        () => {
          this.grabar();
        }
      );
    },

    grabar() {
      loader('show');
      var data = {};

      var llave_w = this.params.llave_hc;

      data['datosh'] = datosEnvio() + this.params.admin + '|' + llave_w + '|' + this.fecha_act + '|' + this.hora_act + '|';

      data['tabla'] = this.form.tablaNotif.replace(/(\r\n|\n|\r)/gm, "&");

      postData(data, get_url("APP/HICLIN/HC002N-2.DLL"))
        .then(data => {
          console.log(data)
          toastr.success("Información guardada");
          loader('hide')
          this._terminar();
        }).catch(err => {
          toastr.error("Error en guardado");
          console.log(err, 'error')
          loader('hide')
          this._escape();
        })
    },

    async cargarNotifi() {
      loader('show');
      await postData({
        datosh: datosEnvio() + this.params.admin + '|' + this.params.llave_hc
      }, get_url("app/HICLIN/HC002N.DLL"))
        .then((data) => {
          this.notifi = data.NOTIFICACION_HISTORIA;
          this.notifi.pop()
          loader('hide')
          this.llenarDatos();
        })
        .catch((error) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.log(error)
          loader('hide')
          this._escape();
        });
    },

    _escape() {
      this.$emit("callback_esc", this.datos_notifi);
    },
    _terminar() {
      this.$emit("callback", this.datos_notifi);
    },

  },
  template: /*html*/ ` 
  <transition name="modal_prosoft" v-if="params.estado">
    <div class="overlay_prosoft">
        <div class="modal_prosoft" style="width: 60%;">
            <div class="container_prosoft">
                <div class="body_prosoft">
                    <div class="col-md-12">
                        <div class="portlet light no-padding">
                            <div class="portlet-body">
                                <div class="form-horizontal">
                                  <div class="col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC002N.flexRow">
                                                
                                    <div class="col-md-5 col-sm-5 col-xs-5" style="padding-left: 0px;">
                                      <div class="portlet light box-center box-title" style="display: flex;" :style="stylesHC002N.flexIzq">
                                        <div class="portlet-title">
                                          <div class="caption">
                                            <span class="caption-subject bold">Notificaciones a facturación</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="input-group col-md-3 col-sm-3 col-xs-3" id=''>
                                      <input v-model="form.fecha" type="text"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                      data-orden="1" maxlength="10" disabled="disabled">
                                    </div>
                                    <label class="col-md-1 col-sm-1 col-xs-1" :style="stylesHC002N.flexIzq">Notif. ant</label>
                                    <div class="input-group col-md-3 col-sm-3 col-xs-3" id=''>
                                      <input v-model="form.fecha_not" type="text"
                                      class="form-control col-md-12 col-sm-12 col-xs-12 text-left" required="true"
                                      data-orden="1" maxlength="10" disabled="disabled">
                                    </div>
                                  </div>
                
                                  <div class="col-md-12 col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesHC002N.flexRow">
                                    <div class="input-group col-md-12 col-md-12 col-sm-12 col-xs-12" id='tablaNotif'>
                                      <textarea v-model="form.tablaNotif" class="form-control tablaNotif uppercase"
                                      disabled="disabled" rows="4" style="resize: none; text-align: justify" data-orden="1"
                                      maxlength="500"></textarea>
                                    </div>
                                  </div>
                
                                  <div class="salto-linea"></div>
                
                                  <label class="col-md-12 col-sm-12 col-xs-12" :style="stylesHC002N.flexIzq">F3 Graba, F5 Salir sin grabar</label>
                                </div>
                              </div>
                          </div>
                      </div>
                      <div style="clear: both"></div>
                  </div>
              </div>
          </div>
      </div>
  </transition>
`,
});
