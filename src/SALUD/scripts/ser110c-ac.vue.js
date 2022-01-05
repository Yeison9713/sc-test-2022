var component_acomp = Vue.component("content_acomp", {
  props: {
    params: {
      estado: false,
    },
    data: {}
  },
  data() {
    return {
      acomp: this.data
    }
  },
  watch: {
    "params.estado": function (val) {
      if (val) {
        ser110c_ac = this;
        this._cargarCiudades_AC();
      }
    },
  },
  methods: {
    validarId_AC() {
      validarInputs(
        {
          form: "#validarId_AC",
        },
        () => {
            this.$emit('callback_esc', this.acomp)
        },
        async () => {
          await this._cargarPaciente_AC();
        }
      );
    },
    validarTipoId_AC() {
      if (this.acomp.novedad == 7 && isNaN(this.acomp.id_AC) && this.acomp.tipoId_AC.trim() == '') {
        this.tipoId = 'NUI';
      }
      POPUP(
        {
          array: _tipoJsonHc('tipo_identicacion'),
          titulo: "Tipo identificación",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.tipoId,
          callback_f: () => {
            this.validarId_AC();
          },
        },
        (data) => {
          this.acomp.tipoId_AC = data.COD + ' - ' + data.DESCRIP;
          this.tipoId = data.COD;
          if ((this.tipoId == 'CC' || this.tipoId == 'TI' || this.tipoId == 'RC') && isNaN(this.acomp.id_AC)) {
            CON851('57', '57', null, 'error', 'error');
            setTimeout(() => { this.validarTipoId_AC(); }, 200)
          } else if (this.tipoId == 'CC') {
            if (this.acomp.id_AC < 1000 || this.acomp.id_AC > 1999000000 || (this.acomp.id_AC > 100000000 && this.acomp.id_AC < 1000000000)) {
              CON851('78', '78', null, 'error', 'error');
              setTimeout(() => { this.validarTipoId_AC(); }, 200)
            } else {
              this.validarApel1_AC()
            }
          } else {
            this.validarApel1_AC()
          }
        }
      );
    },
    validarApel1_AC() {
      validarInputs(
        {
          form: "#validarApel1_AC",
        },
        () => {
          this.validarId_AC();
        },
        () => {
          if (this.acomp.apellido1_AC.trim() == '') {
            CON851('02', '02', null, 'error', 'error');
            this.validarApel1_AC();
          } else {
            this.acomp.apellido1_AC = this.acomp.apellido1_AC.trim().toUpperCase();
            this.validarApel2_AC();
          }
        }
      );
    },
    validarApel2_AC() {
      validarInputs(
        {
          form: "#validarApel2_AC",
        },
        () => {
          this.validarApel1_AC();
        },
        () => {
          this.acomp.apellido2_AC = this.acomp.apellido2_AC.trim().toUpperCase();
          this.validarNom1_AC();
        }
      );
    },
    validarNom1_AC() {
      validarInputs(
        {
          form: "#validarNom1_AC",
        },
        () => {
          this.validarApel2_AC();
        },
        () => {
          if (this.acomp.nombre1_AC.trim() == '') {
            CON851('02', '02', null, 'error', 'error');
            this.validarNom1_AC();
          } else {
            this.acomp.nombre1_AC = this.acomp.nombre1_AC.trim().toUpperCase();
            this.validarNom2_AC();
          }
        }
      );
    },
    validarNom2_AC() {
      validarInputs(
        {
          form: "#validarNom2_AC",
        },
        () => {
          this.validarNom1_AC();
        },
        () => {
          this.acomp.nombre2_AC = this.acomp.nombre2_AC.trim().toUpperCase();
          this.validarTel_AC();
        }
      );
    },
    validarTel_AC() {
      validarInputs(
        {
          form: "#validarTel_AC",
        },
        () => {
          this.validarNom2_AC();
        },
        () => {
          if (this.acomp.telefono_AC.trim() == '') {
            CON851('02', '02', null, 'error', 'error');
            this.validarTel_AC();
          } else {
            this.acomp.telefono_AC = this.acomp.telefono_AC.trim().toUpperCase();
            this.validarCiudad_AC();
          }
        }
      );
    },
    validarCiudad_AC() {
      validarInputs(
        {
          form: "#validarCiudad_AC",
        },
        () => {
          this.validarTel_AC();
        },
        async () => {
          var busqCiu = await this._ciudades.find(e => e.COD.trim() == this.acomp.ciudad_AC.trim());
          console.log(busqCiu, 'busq', this.acomp.ciudad_AC, 'cod');
          if (busqCiu) {
            this.acomp.descripCiudad_AC = busqCiu.NOMBRE.trim();
            this.validarDireccion_AC();
          } else {
            CON851('01', '01', null, 'error', 'error');
            this.validarCiudad_AC();
          }
        }
      );
    },
    validarDireccion_AC() {
      validarInputs(
        {
          form: "#validarDireccion_AC",
        },
        () => {
          this.validarCiudad_AC();
        },
        () => {
          if (this.acomp.direccion_AC.trim() == '') {
            CON851('84', '84', null, 'error', 'error');
            this.validarDireccion_AC();
          } else {
            this.acomp.direccion_AC = this.acomp.direccion_AC.trim().toUpperCase();
            this.confirmar_AC();
          }
        }
      );
    },

    confirmar_AC() {
      this.diferente = false;
      if (cerosIzq(this.acomp.id_AC, 15) != cerosIzq(this._paci['COD'].toUpperCase(), 15)) this.diferente = true;
      if (this.tipoId != this._paci['TIPO-ID'].toUpperCase()) this.diferente = true;
      if (this.acomp.apellido1_AC != this._paci['APELL-PACI1'].toUpperCase()) this.diferente = true;
      if (this.acomp.apellido2_AC != this._paci['APELL-PACI2'].toUpperCase()) this.diferente = true;
      if (this.acomp.nombre1_AC != this._paci['NOM-PACI1'].toUpperCase()) this.diferente = true;
      if (this.acomp.nombre2_AC != this._paci['NOM-PACI2'].toUpperCase()) this.diferente = true;
      if (this.acomp.telefono_AC != this._paci['TELEFONO'].toUpperCase()) this.diferente = true;
      if (this.acomp.ciudad_AC != this._paci['CIUDAD'].toUpperCase()) this.diferente = true;
      if (this.acomp.direccion_AC != this._paci['DIRECC'].toUpperCase()) this.diferente = true;

      if (this.diferente != true) {
        this.salir_AC();
      } else {
        CON851P(
          '01',
          () => { this.validarDireccion_AC(); },
          () => { this.grabar_AC(); }
        );
      }
    },

    async grabar_AC() {
      var data = {}
      data['datosh'] = datosEnvio();
      data['id_paci'] = cerosIzq(this.acomp.id_AC, 15);
      data['tipo_id_paci'] = this.tipoId;
      data['apellido1_paci'] = this.acomp.apellido1_AC;
      data['apellido2_paci'] = this.acomp.apellido2_AC;
      data['nombre1_paci'] = this.acomp.nombre1_AC;
      data['nombre2_paci'] = this.acomp.nombre2_AC;
      data['telefono_paci'] = this.acomp.telefono_AC;
      data['ciudad_paci'] = this.acomp.ciudad_AC;
      data['direccion_paci'] = this.acomp.direccion_AC;
      data['grp_sang_paci'] = this._paci['GRP-SANG'];
      data['rh_paci'] = this._paci['RH'];
      data['admin_w'] = localStorage.Usuario;
      data['victi_conflicto'] = this._paci['VICTI-CONFLICTO'];
      data['diabetes'] = this._paci['DIABETES'];

      await postData(data, get_url("app/SALUD/SER110C-AC.DLL"))
        .then(data => {
          if (data == '7') {
            toastr.success("Creado correctamente");
            this.acomp.novedad = 8;
            this.salir_AC();
          } else {
            console.log(data, 'data');
            toastr.success("Actualizado correctamente");
            this.acomp.novedad = 8;
            this.salir_AC();
          }
        }).catch(err => {
          toastr.error("Error en guardado");
          console.log(err, 'error')
          loader('hide')
        })
    },

    salir_AC() {
        this.$emit('callback', this.acomp)
    },

    async _cargarCiudades_AC() {
      await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          this._ciudades = data.CIUDAD;
          this._ciudades.pop();
          this._cargarPaciente_AC();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    async _cargarPaciente_AC() {
      loader('show');
      await postData({ datosh: datosEnvio() + cerosIzq(this.acomp.id_AC, 15) + '|2|' }, get_url("app/SALUD/SER810-1.DLL"))
        .then((data) => {
          this._paci = data["REG-PACI"][0];
          if (this._paci.DESCRIP != 'NO EXITS PACIENTE!') {
            this.acomp.novedad = 8;
            var busqTipoId = _tipoJsonHc('tipo_identicacion').find(e => e.COD == this._paci['TIPO-ID']);
            this.acomp.tipoId_AC = busqTipoId ? this._paci['TIPO-ID'] + ' - ' + busqTipoId.DESCRIP : this._paci['TIPO-ID'];
            this.acomp.apellido1_AC = this._paci['APELL-PACI1'];
            this.acomp.apellido2_AC = this._paci['APELL-PACI2'];
            this.acomp.nombre1_AC = this._paci['NOM-PACI1'];
            this.acomp.nombre2_AC = this._paci['NOM-PACI2'];
            this.acomp.telefono_AC = this._paci['TELEFONO'];
            var busqCiudad = this._ciudades.find(e => e.COD == this._paci['CIUDAD']);
            this.acomp.ciudad_AC = this._paci['CIUDAD'];
            this.acomp.descripCiudad_AC = busqCiudad ? busqCiudad['NOMBRE'] : '';
            this.acomp.direccion_AC = this._paci['DIRECC'];
            this.acomp.descrip = this._paci.DESCRIP.replace(/\s+/g, ' ');
            this.tipoId = this._paci['TIPO-ID'];
          } else {
            this.acomp.novedad = 7;
            this.acomp.tipoId_AC = '';
            this.acomp.apellido1_AC = '';
            this.acomp.apellido2_AC = '';
            this.acomp.nombre1_AC = '';
            this.acomp.nombre2_AC = '';
            this.acomp.telefono_AC = '';
            this.acomp.ciudad_AC = '';
            this.acomp.descripCiudad_AC = '';
            this.acomp.direccion_AC = '';
            this.acomp.descrip = '';
            this.tipoId = '';
          }
          loader('hide');
          this.validarTipoId_AC();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },
    ventanaCiudades_AC() {
      _ventanaDatos({
        titulo: "CIUDADES",
        columnas: ["COD", "NOMBRE"],
        data: this._ciudades,
        callback_esc: function () {
          document.querySelector('.ciudad_AC').focus();
        },
        callback: function (data) {
          ser110c_ac.acomp.ciudad_AC = data['COD'].trim();
          ser110c_ac.acomp.descripCiudad_AC = data['NOMBRE'].trim();
          setTimeout(() => { _enterInput('.ciudad_AC'); }, 200);
        }
      });
    }
  },
  template: `<transition name="modal_prosoft" v-if="params.estado">
  <div class="overlay_prosoft">
      <div class="modal_prosoft" style="width: 35%;">
          <div class="container_prosoft">
              <div class="header_prosoft">
                  <div class="head-textarea" style="display: flex; justify-content: center;">
                      <div>
                          <label for="title-textarea"> Actualizar datos acompañante </label>
                      </div>
                  </div>
              </div>
              <div class="body_prosoft" style="padding-bottom: 15px;">
                  <div class="col-md-12">
                      <div class="portlet light no-padding">
                          <div class="portlet-body">
                              <form class="form-horizontal" onsubmit="return false;">
                                  <div class="col-md-12 text-left" id="validarId_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Nro. documento</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.id_AC" class="form-control" disabled="disabled" maxlength="15" data-orden="1" />
                                      </div>
                                  </div>

                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left" id="validarTipoId_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Tipo documento</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.tipoId_AC" class="form-control" disabled="disabled" data-orden="1" />
                                      </div>
                                  </div>
                                  
                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left" id="validarApel1_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Primer apellido</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.apellido1_AC" class="form-control" disabled="disabled" maxlength="15" data-orden="1" />
                                      </div>
                                  </div>

                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left" id="validarApel2_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Segundo apellido</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.apellido2_AC" class="form-control" disabled="disabled" maxlength="15" data-orden="1" />
                                      </div>
                                  </div>

                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left" id="validarNom1_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Primer nombre</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.nombre1_AC" class="form-control" disabled="disabled" maxlength="12" data-orden="1" />
                                      </div>
                                  </div>

                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left" id="validarNom2_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Segundo nombre</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.nombre2_AC" class="form-control" disabled="disabled" maxlength="12" data-orden="1" />
                                      </div>
                                  </div>

                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left" id="validarTel_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Telefono</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.telefono_AC" class="form-control" disabled="disabled" maxlength="10" data-orden="1" />
                                      </div>
                                  </div>

                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left">
                                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                      <div class="inline-inputs">
                                        <label class="col-md-5" style="text-align: left; background: none; padding-left: 14px;">Ciudad:</label>
                                        <div class="input-group col-md-2 col-sm-2 col-xs-2" id="validarCiudad_AC">
                                            <input @keyup.f8="ventanaCiudades_AC" v-model="acomp.ciudad_AC"type="text" 
                                            class="form-control uppercase ciudad_AC" disabled="disabled"
                                            maxlength="5" data-orden="1" required="true">
                                        </div>
                                        <button @click="ventanaCiudades_AC" type="button" disabled="disabled"
                                            class="btn col-md-1 col-sm-1 col-xs-1 f8-Btn">
                                            <i class="icon-magnifier"></i>
                                        </button>
                                        <div class="input-group col-md-4 col-sm-4 col-xs-4">
                                            <input v-model="acomp.descripCiudad_AC" type="text" disabled="disabled"
                                                class="form-control uppercase descripCiudad_AC"
                                                maxlength="50" data-orden="1">
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="salto-linea"></div>
                                  
                                  <div class="col-md-12 text-left" id="validarDireccion_AC">
                                      <label class="col-md-5" style="margin-top: 5px;">Dirección</label>
                                      <div class="input-group col-md-7 col-sm-7 col-xs-7"> 
                                      <input type="text" v-model="acomp.direccion_AC" class="form-control" disabled="disabled" maxlength="30" data-orden="1" />
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
                  <div style="clear: both;"></div>
              </div>
          </div>
      </div>
  </div>
</transition>`

});
