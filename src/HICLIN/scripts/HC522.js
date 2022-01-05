// REGISTRO SIGNOS VITALES - DAVID.M - 04-12-2020

new Vue({
  el: "#HC522",
  data: {
    _hcprc: [],
    _profesionales: [],
    _unserv: [],
    _ciudades: [],
    _signosTabla: [],
    datosIni: {
      medico_HC522: '',
      descripMedico_HC522: '',
      especMedico_HC522: '',
      consultando_HC522: '',
      folio_HC522: ''
    },
    form: {
      año_HC522: '',
      mes_HC522: '',
      dia_HC522: '',
      hora_HC522: '',
      min_HC522: '',
      temp_HC522: '',
      fcard_HC522: '',
      fresp_HC522: '',
      tens1_HC522: '',
      tens2_HC522: '',
      tens2_HC522: '',
      pvc_HC522: '',
      oxi_HC522: '',
      fc_fet_HC522: '',
      oper_HC522: '',
    },
    llave_hc: $_REG_HC.llave_hc,
    llave_w: $_REG_PACI.COD,
    signos_vitales: [],
    fecha_act: moment().format('YYYYMMDD'),
    año_act: moment().format('YYYY'),
    mes_act: moment().format('MM'),
    dia_act: moment().format('DD'),
    admin_w: localStorage.Usuario,
    nit_usu: $_USUA_GLOBAL[0].NIT,
    hora_act: moment().format('HHmm'),
    arrayFechasEvo: [],
    indice: 0
  },
  async created() {
    $("#nombreOpcion").remove();
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion('5-2-2 - Registro Signos vitales.');
    $this = this;
    this.cargarHc_HC522();
  },
  methods: {
    async iniciar_HC522() {
      if (localStorage.idOpciondata == '07C2') {
        $("#nombreOpcion").remove();
        nombreOpcion('7-C-2 - Registro Signos vitales.');
        $('#HC522').hide();
        $this.ventanaOpcionesImp_HC522();
      } else {
        this.llenarDatos_HC522();
      }
    },
    async llenarDatos_HC522() {
      $this.SW_GRAF = 0;
      switch ($_REG_HC.edad_hc.unid_edad) {
        case 'D': $this.unid_edad_hc_w = 1; break;
        case 'M': $this.unid_edad_hc_w = 2; break;
        case 'A': $this.unid_edad_hc_w = 3; break;
        default: $this.unid_edad_hc_w = 0; break;
      }
      $this.vlr_edad_hc_w = $_REG_HC.edad_hc.vlr_edad;

      $this.busqProf = this._profesionales.find(e => parseInt(e.IDENTIFICACION) == parseInt(this._hcprc.med));

      if ($this.busqProf != undefined) {
        this.datosIni.medico_HC522 = $this.busqProf.IDENTIFICACION;
        this.datosIni.descripMedico_HC522 = $this.busqProf.NOMBRE.replace(/\�/g, "Ñ");
        this.datosIni.especMedico_HC522 = consult_atiendProf($this.busqProf.ATIENDE_PROF);
      } else {
        CON851('9X', '9X', null, 'error', 'error');
        this.banderaSalir = true;
        this.cerrarArchivos();
      }

      const busqUnserv = await this._unserv.find(e => parseInt(e.COD) == parseInt(this._hcprc.cierre.unserv));
      $this._unservDescrip = busqUnserv['DESCRIP'];
      $this._unservCod = busqUnserv['COD'];

      if (busqUnserv != undefined) {
        this.datosIni.consultando_HC522 = busqUnserv.DESCRIP.trim();
      }

      this.datosIni.folio_HC522 = $_REG_HC.llave_hc.substr(15, 2) + $_REG_HC.llave_hc.substr(17, 6);

      this.llenarTabla_HC522('iniciarSignos_HC522');
    },

    async llenarTabla_HC522(callback) {
      this.indice += 1;
      $this.signos_vitales = [];
      await postData({ datosh: datosEnvio() + $this.llave_hc + '|' }, get_url("APP/HICLIN/HC522.DLL"))
        .then(async (data) => {
          $this._signosTabla = data['EVO-SIG'];
          $this._signosTabla.pop();

          $this._signosTabla = $this._signosTabla.reverse();

          for (var i in $this._signosTabla) {
            $this.indice = parseInt(i) + 1;
            $this.signos_vitales.push(
              {
                item: cerosIzq($this.indice, 3),
                año: $this._signosTabla[i].FECHA.substring(0, 4),
                mes: $this._signosTabla[i].FECHA.substring(4, 6),
                dia: $this._signosTabla[i].FECHA.substring(6, 8),
                hora: $this._signosTabla[i].HORA.substring(0, 2),
                min: $this._signosTabla[i].HORA.substring(2, 4),
                temp: $this._signosTabla[i].TEMP,
                fcard: $this._signosTabla[i].FCARD,
                fresp: $this._signosTabla[i].FRESP,
                tens: $this._signosTabla[i].TENS1 + ' / ' + $this._signosTabla[i].TENS2,
                pvc: $this._signosTabla[i].PVC,
                oxi: $this._signosTabla[i].OXIMETRIA,
                fc_fet: $this._signosTabla[i].FCARD_FET,
                oper: $this._signosTabla[i].OPER,
                tens1: $this._signosTabla[i].TENS1,
                tens2: $this._signosTabla[i].TENS2,
                fecha: _editarFecha($this._signosTabla[i].FECHA),
                horaComp: $this._signosTabla[i].HORA.substring(0, 2) + ':' + $this._signosTabla[i].HORA.substring(2, 4),
                fechaN: $this._signosTabla[i].FECHA.trim(),
                nombreOper: $this._signosTabla[i].NOMBRE_OPER.trim()
              }
            )
          }
          callback != 'null' ? $this[callback]() : false;
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide');
          _regresar_menuhis();
        });
    },

    iniciarSignos_HC522() {
      this.LLAVE_PACI_W = this.llave_w;
      this.FECHA_EVO_W = this.fecha_act;
      this.HORA_EVO_W = this.hora_act;
      this.OPER_ELAB_W = this.admin_w;

      this.form.año_HC522 = this.FECHA_EVO_W.substring(0, 4);
      this.form.mes_HC522 = this.FECHA_EVO_W.substring(4, 6);
      this.form.dia_HC522 = this.FECHA_EVO_W.substring(6, 8);
      this.form.hora_HC522 = this.HORA_EVO_W.substring(0, 2);
      this.form.min_HC522 = this.HORA_EVO_W.substring(2, 4);
      this.form.oper_HC522 = this.OPER_ELAB_W;

      $this.minSignos_HC522();
    },

    datoAnoSignos_HC522() {
      if ((this.mes_act == 01 && this.dia_act < 3) || (this.admin_w == 'GEBC' || this.admin_w == 'NSZL')) {
        validarInputs(
          {
            form: '#año_HC522',
            orden: '1',
            event_f5: () => { this._confirmarSalir_HC522('datoAnoSignos_HC522') },
            event_f11: $this.ventanaOpcionesImp_HC522
          },
          () => {
            _regresar_menuhis();
          },
          () => {
            $this.form.año_HC522 = cerosIzq($this.form.año_HC522, 4);
            var año = $this.form.año_HC522;
            if (año == $this.año_act || año == (parseFloat(año) - 1)) {
              $this.datoMesSignos_HC522();
            } else {
              CON851('37', '37', null, 'error', 'error');
              $this.datoAnoSignos_HC522();
            }
          }
        );
      }
    },

    datoMesSignos_HC522() {
      if (this.dia_act < 3 || (this.admin_w == 'GEBC' || this.admin_w == 'NSZL') || ($this.nit_usu == 800037021)) {
        validarInputs(
          {
            form: '#mes_HC522',
            orden: '1',
            event_f5: () => { this._confirmarSalir_HC522('datoMesSignos_HC522') },
            event_f11: $this.ventanaOpcionesImp_HC522
          },
          () => {
            if ($this.mes_act == '01') {
              $this.datoAnoSignos_HC522();
            } else {
              $this.datoMesSignos_HC522();
            }
          },
          () => {
            $this.form.mes_HC522 = cerosIzq($this.form.mes_HC522, 2);
            var mes = $this.form.mes_HC522;
            if ($this.nit_usu == 800037021) {
              if (parseFloat(mes) < 01 || parseFloat(mes) > 12) {
                CON851('37', '37', null, 'error', 'error');
                $this.datoMesSignos_HC522();
              } else if ($this.año_act == $this.form.año_HC522) {
                if ((parseFloat(mes) > parseFloat($this.mes_act)) || parseFloat(mes) < (parseFloat($this.mes_act) - 1)) {
                  CON851('37', '37', null, 'error', 'error');
                  $this.datoMesSignos_HC522();
                }
              } else if ($this.admin_w == 'GEBC' || $this.admin_w == 'NSZL') {
                $this.datoDiaSignos_HC522();
              } else {
                if ($this.año_act != $this.form.año_HC522 && mes != '12') {
                  CON851('37', '37', null, 'error', 'error');
                  $this.datoMesSignos_HC522();
                }
              }
            } else {
              $this.datoDiaSignos_HC522();
            }
          }
        );
      }
    },

    datoDiaSignos_HC522() {
      validarInputs(
        {
          form: '#dia_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('datoDiaSignos_HC522') },
          event_f11: this.ventanaOpcionesImp_HC522
        },
        () => {
          if ($this.dia_act < 3 || $this.nit_usu == 800037021) {
            $this.datoMesSignos_HC522();
          } else {
            $this.datoDiaSignos_HC522();
          }
        },
        () => {
          $this.form.dia_HC522 = cerosIzq($this.form.dia_HC522, 2);
          $this.FECHA_EVO_W = $this.form.año_HC522 + $this.form.mes_HC522 + $this.form.dia_HC522
          var dia = $this.form.dia_HC522;
          if ($this.FECHA_EVO_W > $this.fecha_act) {
            CON851('37', '37', null, 'error', 'error');
            $this.datoDiaSignos_HC522();
          } else if ($this.nit_usu == 800037021) {
            $this.horaSignos_HC522();
          } else {
            if ($this.form.mes_HC522 != $this.mes_act && $this.form.dia_HC522 < 28) {
              CON851('37', '37', null, 'error', 'error');
              $this.datoDiaSignos_HC522();
            } else if ($this.admin_w == 'GEBC' || $this.admin_w == 'NSZL') {
              $this.horaSignos_HC522();
            } else {
              if ($this.form.año_HC522 == $this.año_act && $this.form.mes_HC522 == $this.mes_act && $this.form.dia_HC522 < ($this.dia_act - 1)) {
                CON851('37', '37', null, 'error', 'error');
                $this.datoDiaSignos_HC522();
              } else {
                $this.horaSignos_HC522();
              }
            }
          }
        }
      );
    },

    horaSignos_HC522() {
      validarInputs(
        {
          form: '#hora_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('horaSignos_HC522') },
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.datoDiaSignos_HC522();
        },
        () => {
          $this.form.hora_HC522 = cerosIzq($this.form.hora_HC522, 2);
          var hora = $this.form.hora_HC522;
          if (hora > 23) {
            CON851('9Q', '9Q', null, 'error', 'error');
            $this.horaSignos_HC522();
          } else if ($this.form.dia_HC522 == $this.dia_act && hora > $this.hora_act) {
            CON851('9Q', '9Q', null, 'error', 'error');
            $this.horaSignos_HC522();
          } else {
            $this.minSignos_HC522();
          }
        }
      );
    },

    minSignos_HC522() {
      validarInputs(
        {
          form: '#min_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('minSignos_HC522') },
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.horaSignos_HC522();
        },
        () => {
          $this.form.min_HC522 = cerosIzq($this.form.min_HC522, 2);
          $this.HORA_EVO_W = $this.form.hora_HC522 + $this.form.min_HC522;
          var min = $this.form.min_HC522;
          if (min > 59) {
            $this.horaSignos_HC522();
          } else {
            $this.comprobarEvo_HC522('datoTemp_HC522');
          }
        }
      );
    },

    comprobarEvo_HC522(callback) {
      loader('show');
      $this.LLAVE_EVO_W = $this.llave_hc + $this.FECHA_EVO_W + $this.HORA_EVO_W + $this.admin_w;

      postData({ datosh: datosEnvio() + $this.LLAVE_EVO_W + '|' }, get_url("APP/HICLIN/HC522-2.DLL"))
        .then((data) => {
          if (data == '8') {
            CON851('05', '05', null, 'error', 'error');
            $this.minSignos_HC522();
          } else {
            $this[callback]();
          }
          loader('hide');
        }).catch((err) => {
          $this.minSignos_HC522();
          console.log(err, 'err');
          loader('hide');
        });
    },

    datoTemp_HC522() {
      validarInputs(
        {
          form: '#temp_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('datoTemp_HC522') },
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.minSignos_HC522();
        },
        () => {
          var temp = parseFloat($this.form.temp_HC522).toFixed(2);
          $this.form.temp_HC522 = temp;
          if (temp > 0 && (temp < 35.5 || temp > 38)) {
            CON851('BM', 'BM', null, 'warning', 'error');
          }
          if (temp > 45) {
            CON851('03', '03', null, 'error', 'error');
            $this.datoTemp_HC522();
          } else {
            $this.datoFcard_HC522();
          }
        }
      );
    },

    datoFcard_HC522() {
      validarInputs(
        {
          form: '#fcard_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('datoFcard_HC522') },
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.datoTemp_HC522();
        },
        () => {
          var fcard = $this.form.fcard_HC522;
          if (fcard > 0) {
            if ($_REG_HC.edad_hc.unid_edad == 'D' || ($_REG_HC.edad_hc.unid_edad == 'M' && $_REG_HC.edad_hc.vlr_edad < 3)) {
              if (fcard < 120 || fcard > 160) {
                CON851('BK', 'BK', null, 'warning', 'error');
              }
            } else {
              if ($_REG_HC.edad_hc.unid_edad == 'M' || ($_REG_HC.edad_hc.unid_edad == 'A' && $_REG_HC.edad_hc.vlr_edad < 5)) {
                if (fcard < 60 || fcard > 100) {
                  CON851('BK', 'BK', null, 'warning', 'error');
                }
              } else {
                if (fcard < 60 && 90) {
                  CON851('BK', 'BK', null, 'warning', 'error');
                }
              }
            }
          }
          $this.datoFresp_HC522();
        }
      );
    },

    datoFresp_HC522() {
      validarInputs(
        {
          form: '#fresp_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('datoFresp_HC522') },
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.datoFcard_HC522();
        },
        () => {
          var fresp = $this.form.fresp_HC522;
          if (fresp > 0) {
            switch ($_REG_HC.edad_hc.unid_edad) {
              case 'D':
                fresp < 30 || fresp > 60 ? CON851('BL', 'BL', null, 'warning', 'error') : false;
                break;
              case 'M':
                if ($_REG_HC.edad_hc.vlr_edad < 3) {
                  fresp < 30 || fresp > 60 ? CON851('BL', 'BL', null, 'warning', 'error') : false;
                } else {
                  fresp < 20 || fresp > 50 ? CON851('BL', 'BL', null, 'warning', 'error') : false;
                }
                break;
              case 'A':
                if ($_REG_HC.edad_hc.vlr_edad < 5) {
                  fresp < 16 || fresp > 40 ? CON851('BL', 'BL', null, 'warning', 'error') : false;
                } else {
                  fresp < 16 || fresp > 30 ? CON851('BL', 'BL', null, 'warning', 'error') : false;
                }
                break;
            }
          }
          $this.datoTens_HC522('1');
        }
      );
    },

    datoTens_HC522(orden) {
      validarInputs(
        {
          form: '#tens_HC522',
          orden: orden,
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.datoFresp_HC522();
        },
        () => {
          var tens1 = $this.form.tens1_HC522;
          var tens2 = $this.form.tens2_HC522;

          if (tens1 > 300) {
            CON851('03', '03', null, 'error', 'error');
            $this.datoTens_HC522('1');
          } else if (tens2 > 200) {
            CON851('03', '03', null, 'error', 'error');
            $this.datoTens_HC522('2');
          } else {
            $this.datoPvc_HC522();
          }
        }
      );
    },

    datoPvc_HC522() {
      validarInputs(
        {
          form: '#pvc_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('datoPvc_HC522') },
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.datoTens_HC522('2');
        },
        () => {
          $this.datoSat_HC522();
        }
      );
    },

    datoSat_HC522() {
      validarInputs(
        {
          form: '#oxi_HC522',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC522('datoSat_HC522') },
          event_f11: $this.ventanaOpcionesImp_HC522
        },
        () => {
          $this.datoPvc_HC522();
        },
        () => {
          $this.datoFrecFet_HC522();
        }
      );
    },

    datoFrecFet_HC522() {
      if ($_REG_PACI.SEXO == 'F') {
        validarInputs(
          {
            form: '#fc_fet_HC522',
            orden: '1',
            event_f5: () => { this._confirmarSalir_HC522('datoFrecFet_HC522') },
            event_f11: $this.ventanaOpcionesImp_HC522
          },
          () => {
            $this.datoSat_HC522();
          },
          () => {
            $this.confirmar_HC522();
          }
        );
      } else {
        $this.confirmar_HC522();
      }
    },

    confirmar_HC522() {
      console.log('llega a confirmar')
      $this.comprobarEvo_HC522('preguntar_HC522');
    },

    preguntar_HC522() {
      CON851P('01', () => { $this.llenarTabla_HC522('iniciarSignos_HC522') }, () => { $this.grabar_HC522(); });
    },

    async grabar_HC522() {
      var data = {}
      data['datosh'] = datosEnvio();
      data['llave_evo'] = this.llave_hc + this.FECHA_EVO_W + this.HORA_EVO_W + this.OPER_ELAB_W;
      data['medico'] = cerosIzq(this.datosIni.medico_HC522.trim(), 10);
      data['unserv'] = this._unservCod != undefined ? this._unservCod : '  ';
      data['edad'] = $_REG_HC.edad_hc.unid_edad + cerosIzq($_REG_HC.edad_hc.vlr_edad, 3);
      data['hab'] = this._hcprc.cierre.hab;

      data['temp'] = this.form.temp_HC522;
      data['fcard'] = this.form.fcard_HC522;
      data['fresp'] = this.form.fresp_HC522;
      data['pvc'] = this.form.pvc_HC522;
      data['oxi'] = this.form.oxi_HC522;
      data['fc_fet'] = this.form.fc_fet_HC522;
      data['oper'] = this.form.oper_HC522;
      data['tens1'] = this.form.tens1_HC522;
      data['tens2'] = this.form.tens2_HC522;

      await postData(data, get_url("app/HICLIN/HC522-1.DLL"))
        .then(data => {
          if (data == '1') {
            toastr.success("Guardado correctamente");
            $this.reset_HC522();
            $this.adicionarRegistros_HC522();
          } else {
            toastr.error("Error en guardado");
            $this.cerrarArchivos_HC522();
          }
        }).catch(err => {
          toastr.error("Error en guardado");
          console.log(err, 'error')
          loader('hide')
        })
    },

    reset_HC522() {
      this.form.año_HC522 = '';
      this.form.mes_HC522 = '';
      this.form.dia_HC522 = '';
      this.form.hora_HC522 = '';
      this.form.min_HC522 = '';
      this.form.temp_HC522 = '';
      this.form.fcard_HC522 = '';
      this.form.fresp_HC522 = '';
      this.form.tens1_HC522 = '';
      this.form.tens2_HC522 = '';
      this.form.tens2_HC522 = '';
      this.form.pvc_HC522 = '';
      this.form.oxi_HC522 = '';
      this.form.fc_fet_HC522 = '';
    },

    adicionarRegistros_HC522() {
      CON851P('14', () => { setTimeout(() => { $this.datoImprimir_HC522() }, 500) }, () => { setTimeout(() => { $this.llenarTabla_HC522('iniciarSignos_HC522') }, 500) });
    },

    datoImprimir_HC522() {
      CON851P('00', () => { $this.cerrarArchivos_HC522() }, () => { setTimeout(() => { $this.ventanaOpcionesImp_HC522(); }, 300) });
    },

    ventanaOpcionesImp_HC522() {
      // if ($this.SW_GRAF == 0) {
      $this.titulo = 'IMPRESION SIGNOS VITALES';
      // } else {
      //   $this.titulo = 'IMPRESION GRAFICO SIG.VITALES';
      // }

      this._ventanaImp_HC522();
    },

    datoCierre() {
      $this._hcprc.cierre.estado = '1';
      $this._hcprc.cierre.temporal == '1' && parseInt($this._hcprc.cierre.estado) > 0 ? $this._hcprc.cierre.temporal = '0' : false;
      $this.confirmar();
    },

    cargarHc_HC522() {
      postData({ datosh: datosEnvio() + this.llave_hc + '|' + localStorage["Usuario"].trim() + '|1|' }, get_url("APP/HICLIN/HC_PRC.DLL"))
        .then((data) => {
          $this._hcprc = data["HCPAC"];
          if ($this._hcprc.novedad == 7) {
            loader('hide')
            CON851('3A', '3A', null, 'error', 'error');
            _regresar_menuhis();
          } else {
            $this.cargarProf_HC522();
          }
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide');
          _regresar_menuhis();
        });
    },
    cargarProf_HC522() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          $this._profesionales = data.ARCHPROF;
          $this._profesionales.pop();
          $this.cargarUnserv_HC522();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide');
          _regresar_menuhis();
        });
    },
    cargarUnserv_HC522() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          $this._unserv = data.UNSERV;
          $this._unserv.pop();
          loader('hide');
          $this.iniciar_HC522();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide');
          _regresar_menuhis();
        });
    },

    _ventanaImp_HC522() {
      var fuente = '<div id="IMP_HC522" style="width: 400px">' +
        '<div class="col-md-12 no-padding">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

        // INPUTS FECHAS INI
        '<div class="col-md-12 no-padding" id="divFechaIni_HC522">' +
        '<div class="salto-linea"></div>' +

        '<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Inicial:</label>' +

        '<div class="col-md-12 no-padding">' +
        '<div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="validarFechaIni_HC522">' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="añoIni_HC522" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
        'data-orden="1" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="mesIni_HC522" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
        'data-orden="2" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="diaIni_HC522" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
        'data-orden="3" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '</div>' +
        // 

        // INPUTS FECHAS FIN
        '<div class="col-md-12 no-padding" id="divFechaFin_HC522">' +
        '<div class="salto-linea"></div>' +

        '<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Final:</label>' +

        '<div class="col-md-12 no-padding">' +
        '<div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="validarFechaFin_HC522">' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="añoFin_HC522" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
        'data-orden="1" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="mesFin_HC522" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
        'data-orden="2" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="diaFin_HC522" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
        'data-orden="3" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '</div>' +
        // 

        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>'

      $this.dialogo = bootbox.dialog({
        title: 'IMPRESIÓN SIGNOS VITALES',
        message: fuente,
        size: 2500,
        closeButton: false,
        buttons: {
          main: {
            label: "Aceptar",
            className: "blue hidden",
            callback: function () {

            }
          }
        },
      });

      $this.dialogo.on('shown.bs.modal', async function (e) {
        $('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
        $('.modal-header h4').css({ 'color': '#476fad', 'font-weight': '500' })
        $('h5').css({ 'margin-top': '-3px', 'float': 'left' });

        $this.validarFechaIni_HC522();
      })
    },

    validarFechaIni_HC522() {
      document.querySelector('#añoIni_HC522').value.trim() == '' ? document.querySelector('#añoIni_HC522').value = $this._hcprc.fecha.substring(0, 4) : false;
      document.querySelector('#mesIni_HC522').value.trim() == '' ? document.querySelector('#mesIni_HC522').value = $this._hcprc.fecha.substring(4, 6) : false;
      document.querySelector('#diaIni_HC522').value.trim() == '' ? document.querySelector('#diaIni_HC522').value = $this._hcprc.fecha.substring(6, 8) : false;
      validarInputs(
        {
          form: "#validarFechaIni_HC522",
          orden: '1',
        },
        () => {
          $('[data-bb-handler="main"]').click();
          if (localStorage.idOpciondata != '07C2') {
            setTimeout(() => { $this.adicionarRegistros_HC522(); }, 400);
          } else {
            $this.cerrarArchivos_HC522();
          }
        },
        async () => {
          document.querySelector('#añoIni_HC522').value = cerosIzq(document.querySelector('#añoIni_HC522').value, 4);
          document.querySelector('#mesIni_HC522').value = cerosIzq(document.querySelector('#mesIni_HC522').value, 2);
          document.querySelector('#diaIni_HC522').value = cerosIzq(document.querySelector('#diaIni_HC522').value, 2);
          var añoIni = document.querySelector('#añoIni_HC522').value;
          var mesIni = document.querySelector('#mesIni_HC522').value;
          var diaIni = document.querySelector('#diaIni_HC522').value;
          $this.fechaIni = añoIni.toString() + mesIni.toString() + diaIni.toString();

          $this.validarFechaFin_HC522();
        }
      )
    },

    validarFechaFin_HC522() {
      document.querySelector('#añoFin_HC522').value.trim() == '' ? document.querySelector('#añoFin_HC522').value = moment().format('YYYY') : false;
      document.querySelector('#mesFin_HC522').value.trim() == '' ? document.querySelector('#mesFin_HC522').value = moment().format('MM') : false;
      document.querySelector('#diaFin_HC522').value.trim() == '' ? document.querySelector('#diaFin_HC522').value = moment().format('DD') : false;
      validarInputs(
        {
          form: "#validarFechaFin_HC522",
          orden: '1',
        },
        () => {
          $this.validarFechaIni_HC522();
        },
        async () => {
          document.querySelector('#añoFin_HC522').value = cerosIzq(document.querySelector('#añoFin_HC522').value, 4);
          document.querySelector('#mesFin_HC522').value = cerosIzq(document.querySelector('#mesFin_HC522').value, 2);
          document.querySelector('#diaFin_HC522').value = cerosIzq(document.querySelector('#diaFin_HC522').value, 2);
          var añoFin = document.querySelector('#añoFin_HC522').value;
          var mesFin = document.querySelector('#mesFin_HC522').value;
          var diaFin = document.querySelector('#diaFin_HC522').value;
          $this.fechaFin = añoFin.toString() + mesFin.toString() + diaFin.toString();

          $this.llamarImpresion_HC522();
        }
      )
    },

    async llamarImpresion_HC522() {
      loader('show');
      await this.llenarTabla_HC522('null');

      var datos = {};
      datos['paciente'] = {};
      datos.paciente['fecha'] = moment().format('YYYY/MM/DD');
      datos.paciente['hora'] = moment().format('HH:mm');
      datos.paciente['tipoId'] = $_REG_PACI['TIPO-ID'];
      isNaN($_REG_PACI.COD) == true ? datos.paciente['id'] = $_REG_PACI.COD : datos.paciente['id'] = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
      datos.paciente['nombre'] = $_REG_PACI.DESCRIP.replace(/\s+/g, ' ');
      datos.paciente['edad'] = $this._hcprc.edad;
      $_REG_PACI.SEXO == 'F' ? datos.paciente['sexo'] = 'Femenino' : datos.paciente['sexo'] = 'Masculino';

      await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then(data => {
          $this._ciudades = data.CIUDAD;
          var busq = $this._ciudades.find(e => e.COD.trim() == $_REG_PACI.CIUDAD.trim());
          datos.paciente['municipio'] = busq.NOMBRE.replace(/\s+/g, ' ');
        }).catch(err => {
          console.log(err, 'error')
        })

      datos.paciente['telefono'] = $_REG_PACI.TELEFONO;
      datos.paciente['unserv'] = $this._unservDescrip;
      datos.paciente['fact'] = $this._hcprc.cierre.prefijo + $this._hcprc.cierre.nro_fact;

      datos.titulo = $this.titulo;

      datos['signos_vitales'] = []
      for (var i in $this.signos_vitales) {
        if ($this.signos_vitales[i].fechaN >= $this.fechaIni && $this.signos_vitales[i].fechaN <= $this.fechaFin) {
          datos.signos_vitales.push($this.signos_vitales[i]);
        }
      }

      await _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
        content: await _imprimirHC522(datos),
      }).then(data => {
        toastr.success("Cargando impresión");
        $('[data-bb-handler="main"]').click();
        setTimeout(() => { $this.cerrarArchivos_HC522(); }, 300);
      }).catch((err) => {
        console.error(err);
      });

      loader('hide');
    },

    _confirmarSalir_HC522(callback_esc, orden) {
      CON851P('03', () => { orden ? $this[callback_esc](orden) : $this[callback_esc]() }, () => { $this.cerrarArchivos_HC522() });
    },

    cerrarArchivos_HC522() {
      _regresar_menuhis();
    },
  }
})