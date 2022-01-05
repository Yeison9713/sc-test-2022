// REGISTRO GLUCOMETRIA - DAVID.M - 09-12-2020

new Vue({
  el: "#HC523",
  data: {
    _hcprc: [],
    _profesionales: [],
    _unserv: [],
    _ciudades: [],
    _medicamentos: [],
    datosIni: {
      medico_HC523: '',
      descripMedico_HC523: '',
      especMedico_HC523: '',
      consultando_HC523: '',
      folio_HC523: ''
    },
    form: {
      año_HC523: '',
      mes_HC523: '',
      dia_HC523: '',
      hora_HC523: '',
      min_HC523: '',
      gluco_HC523: '',
      codMed_HC523: '',
      descripMed_HC523: '',
      observ_HC523: '',
      oper_HC523: '',
      glucoText_HC523: ''
    },
    glucoFlag: null,
    llave_hc: $_REG_HC.llave_hc,
    llave_w: $_REG_PACI.COD,
    glucometrias: [],
    fecha_act: moment().format('YYYYMMDD'),
    año_act: moment().format('YYYY'),
    mes_act: moment().format('MM'),
    dia_act: moment().format('DD'),
    admin_w: localStorage.Usuario,
    nit_usu: $_USUA_GLOBAL[0].NIT,
    hora_act: moment().format('HHmm'),
    indice: 0
  },
  async created() {
    $("#nombreOpcion").remove();
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion('5-2-3 - Registro Glucometria.');
    $this = this;
    this.cargarHc_HC523();
  },
  methods: {
    async iniciar_HC523() {
      if (localStorage.idOpciondata == '07C3') {
        $("#nombreOpcion").remove();
        nombreOpcion('7-C-3 - Registro Glucometrias.');
        $('#HC523').hide();
        $this.ventanaOpcionesImp_HC523();
      } else {
        this.llenarDatos_HC523();
      }
    },
    async llenarDatos_HC523() {
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
        this.datosIni.medico_HC523 = $this.busqProf.IDENTIFICACION;
        this.datosIni.descripMedico_HC523 = $this.busqProf.NOMBRE.replace(/\�/g, "Ñ");
        this.datosIni.especMedico_HC523 = consult_atiendProf($this.busqProf.ATIENDE_PROF);
      } else {
        CON851('9X', '9X', null, 'error', 'error');
        this.banderaSalir = true;
        this.cerrarArchivos();
      }

      this.datosIni.folio_HC523 = $_REG_HC.llave_hc.substr(15, 2) + $_REG_HC.llave_hc.substr(17, 6);

      this.llenarTabla_HC523('ventanaUnserv_HC523');
    },

    async llenarTabla_HC523(callback) {
      this.indice += 1;
      $this.glucometrias = [];
      await postData({ datosh: datosEnvio() + $this.llave_hc + '|' }, get_url("APP/HICLIN/HC523.DLL"))
        .then(async (data) => {
          var tabla = data['EVO-GLUCO'];
          tabla.pop();

          tabla = tabla.reverse();

          for (var i in tabla) {
            var glucoT = '';
            switch (tabla[i].GLUCOMETRIA) {
              case '998': glucoT = 'Hi'; break;
              case '999': glucoT = 'Low'; break;
              default: glucoT = tabla[i].GLUCOMETRIA; break;
            }
            $this.indice = parseInt(i) + 1;
            $this.glucometrias.push(
              {
                item: cerosIzq($this.indice, 3),
                año: tabla[i].FECHA.substring(0, 4),
                mes: tabla[i].FECHA.substring(4, 6),
                dia: tabla[i].FECHA.substring(6, 8),
                hora: tabla[i].HORA.substring(0, 2),
                min: tabla[i].HORA.substring(2, 4),
                gluco: glucoT,
                codMed: tabla[i].COD_FORMU,
                descripMed: tabla[i].DESCRIP_COD,
                observ: tabla[i].INDIC1_FORMU,
                oper: tabla[i].OPER,
                fecha: _editarFecha(tabla[i].FECHA),
                horaComp: tabla[i].HORA.substring(0, 2) + ':' + tabla[i].HORA.substring(2, 4),
                fechaN: tabla[i].FECHA.trim(),
                nombreOper: tabla[i].NOMBRE_OPER.trim(),
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

    ventanaUnserv_HC523() {
      SER873(() => { $this._confirmarSalir_HC523('ventanaUnserv_HC523') }, $this.datoUnidad_HC523, 1)
    },

    datoUnidad_HC523(data) {
      this.UNSERV_EVO = data.COD;
      this.datosIni.consultando_HC523 = data.DESCRIP.trim();
      data.ESTADO == 'N' ? (CON851('13', '13', null, 'error', 'error'), this.ventanaUnserv_HC523()) : this.iniciarGluco_HC523();
    },

    iniciarGluco_HC523() {
      this.LLAVE_PACI_W = this.llave_w;
      this.FECHA_EVO_W = this.fecha_act;
      this.HORA_EVO_W = this.hora_act;
      this.OPER_ELAB_W = this.admin_w;

      this.form.año_HC523 = this.FECHA_EVO_W.substring(0, 4);
      this.form.mes_HC523 = this.FECHA_EVO_W.substring(4, 6);
      this.form.dia_HC523 = this.FECHA_EVO_W.substring(6, 8);
      this.form.hora_HC523 = this.HORA_EVO_W.substring(0, 2);
      this.form.min_HC523 = this.HORA_EVO_W.substring(2, 4);
      this.form.oper_HC523 = this.OPER_ELAB_W;

      $this.datoAno_HC523();
    },

    datoAno_HC523() {
      validarInputs(
        {
          form: '#año_HC523',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC523('datoAno_HC523') },
          event_f11: $this.ventanaOpcionesImp_HC523
        },
        () => {
          this._confirmarSalir_HC523();
        },
        () => {
          $this.form.año_HC523 = cerosIzq($this.form.año_HC523, 4);
          var año = $this.form.año_HC523;
          if (año < $this.año_act) {
            CON851('03', '03', null, 'error', 'error');
            $this.datoAno_HC523();
          } else {
            $this.datoMes_HC523();
          }
        }
      );
    },

    datoMes_HC523() {
      validarInputs(
        {
          form: '#mes_HC523',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC523('datoMes_HC523') },
          event_f11: $this.ventanaOpcionesImp_HC523
        },
        () => {
          $this.datoAno_HC523();
        },
        () => {
          $this.form.mes_HC523 = cerosIzq($this.form.mes_HC523, 2);
          var mes = $this.form.mes_HC523;
          if (mes < 01 || mes > 12) {
            $this.datoMes_HC523();
          } else {
            $this.datoDia_HC523();
          }
        }
      );
    },

    datoDia_HC523() {
      validarInputs(
        {
          form: '#dia_HC523',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC523('datoDia_HC523') },
          event_f11: this.ventanaOpcionesImp_HC523
        },
        () => {
          $this.datoMes_HC523();
        },
        () => {
          $this.form.dia_HC523 = cerosIzq($this.form.dia_HC523, 2);
          $this.FECHA_EVO_W = $this.form.año_HC523 + $this.form.mes_HC523 + $this.form.dia_HC523;
          var dia = $this.form.dia_HC523;
          if ((dia == 0 || dia > 31) || $this.FECHA_EVO_W > $this.fecha_act) {
            CON851('37', '37', null, 'error', 'error');
            $this.datoDia_HC523();
          } else {
            $this.datoHora_HC523();
          }
        }
      );
    },

    datoHora_HC523() {
      validarInputs(
        {
          form: '#hora_HC523',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC523('datoHora_HC523') },
          event_f11: $this.ventanaOpcionesImp_HC523
        },
        () => {
          $this.datoDia_HC523();
        },
        () => {
          $this.form.hora_HC523 = cerosIzq($this.form.hora_HC523, 2);
          var hora = $this.form.hora_HC523;
          if (hora > 23) {
            CON851('9Q', '9Q', null, 'error', 'error');
            $this.datoHora_HC523();
          } else if ($this.FECHA_EVO_W == $this.fecha_act && hora > $this.hora_act) {
            CON851('9Q', '9Q', null, 'error', 'error');
            $this.datoHora_HC523();
          } else {
            $this.datoMin_HC523();
          }
        }
      );
    },

    datoMin_HC523() {
      validarInputs(
        {
          form: '#min_HC523',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC523('datoMin_HC523') },
          event_f11: $this.ventanaOpcionesImp_HC523
        },
        () => {
          $this.datoHora_HC523();
        },
        () => {
          $this.form.min_HC523 = cerosIzq($this.form.min_HC523, 2);
          $this.HORA_EVO_W = $this.form.hora_HC523 + $this.form.min_HC523;
          var min = $this.form.min_HC523;
          if (min > 59) {
            $this.datoHora_HC523();
          } else {
            $this.comprobarEvo_HC523('datoGluco_HC523');
          }
        }
      );
    },

    comprobarEvo_HC523(callback) {
      loader('show');
      $this.LLAVE_EVO_W = $this.llave_hc + $this.FECHA_EVO_W + $this.HORA_EVO_W + $this.admin_w;

      postData({ datosh: datosEnvio() + $this.LLAVE_EVO_W + '|' }, get_url("APP/HICLIN/HC522-2.DLL"))
        .then((data) => {
          if (data == '8') {
            CON851('00', '00', null, 'error', 'error');
            $this.datoMin_HC523();
          } else {
            $this.SW_INVALID = 0;
            $this[callback]();
          }
          loader('hide');
        }).catch((err) => {
          $this.datoMin_HC523();
          console.log(err, 'err');
          loader('hide');
        });
    },

    datoGluco_HC523() {
      validarInputs(
        {
          form: '#gluco_HC523',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC523('datoGluco_HC523') },
          event_f11: $this.ventanaOpcionesImp_HC523
        },
        () => {
          $this.glucoFlag = false;
          $this.datoMin_HC523();
        },
        () => {
          var gluco = $this.form.gluco_HC523;
          $this.form.gluco_HC523 = gluco;
          console.log(gluco, 'gluco')
          if (gluco == 998) {
            $this.glucoFlag = true;
            $this.form.glucoText_HC523 = 'Hi';
            $this.datoCodigo_HC523();
          } else if (gluco == 999) {
            $this.glucoFlag = true;
            $this.form.glucoText_HC523 = 'Low';
            $this.datoCodigo_HC523();
          } else if (gluco > 600) {
            CON851('03', '03', null, 'warning', 'error');
            $this.datoGluco_HC523();
          } else if (gluco > 0) {
            $this.TIPO_FORMU_W = 0;
            $this.datoCodigo_HC523();
          } else {
            $this.datoMetodo_HC523();
          }
        }
      );
    },

    datoMetodo_HC523() {
      _HC823A(
        this.datoGluco_HC523,
        (data) => {
          $this.glucoFlag = true;
          this.form.glucoText_HC523 = data.DESCRIP;
          data.COD == 1 ? this.form.gluco_HC523 = '998' : this.form.gluco_HC523 = '999';
          this.datoCodigo_HC523();
        },
        1
      )
    },

    datoCodigo_HC523() {
      validarInputs(
        {
          form: '#medicamento_HC523',
          orden: '1',
          event_f5: () => { this._confirmarSalir_HC523('datoCodigo_HC523') },
          event_f11: $this.ventanaOpcionesImp_HC523
        },
        () => {
          $this.glucoFlag = false;
          $this.datoGluco_HC523();
        },
        () => {
          var codMed = $this.form.codMed_HC523;
          if (codMed.trim() == '') {
            $this.form.descripMed_HC523 = '';
            $this.confirmar_HC523();
          } else {
            var busq = $this._medicamentos.find(e => e.COD.trim() == codMed.trim());
            if (busq == undefined) {
              CON851('01', '01', null, 'warning', 'error');
              $this.datoCodigo_HC523();
            } else {
              if (busq.DESCRIP.substring(0, 1) == '*') {
                CON851('13', '13', null, 'warning', 'error');
                $this.datoCodigo_HC523();
              } else {
                $this.form.descripMed_HC523 = busq.DESCRIP;
                $this.datoObservaciones_HC523();
              }
            }
          }
        }
      );
    },

    datoObservaciones_HC523() {
      var fuente = '<div id="OBS_HC523" style="width: 500px">' +
        '<div class="col-md-12 no-padding">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

        '<div class="col-md-12 no-padding" id="divObserv_HC523">' +
        '<textarea id="observArea_HC523" class="form-control" disabled="disabled" rows="3" maxlength="190" data-orden="1" style="resize: none; text-align: justify"></textarea>' +
        '</div>' +

        '</div>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>'

      var titulo = '<div id="titulo" class="col-md-12 no-padding">' +
        '<div class="col-md-11 no-padding">' +
        '<h4 style="margin-top: 7px; margin-bottom: 2px;">Observaciones</h4>' +
        '</div>' +
        '<div class="tooltip-proft bottom-text" style="margin-left: 16px;">' +
        '<span class="icon-proft icon-info"></span>' +
        '<span class="tiptext" style="font-size: 13px;">' +
        '<div>Con F3 pasa de un campo a otro.</div>' +
        '</span>' +
        '</div>' +
        '</div>'

      $this.dialogoObserv = bootbox.dialog({
        title: titulo,
        message: fuente,
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

      $this.dialogoObserv.on('shown.bs.modal', async function (e) {
        $('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
        $('.modal-header').css({ 'padding': '8px' })
        $('.modal-header h4').css({ 'color': '#476fad', })
        $('.modal-footer').css({ 'padding': '0px' })

        validarInputs(
          {
            form: '#divObserv_HC523',
            orden: '1',
          },
          () => {
            $('[data-bb-handler="main"]').click();
            $this.datoHora_HC523();
          },
          () => {
            $this.form.observ_HC523 = document.querySelector('#observArea_HC523').value;
            $this.CANT_FORMU_W = 0;
            $('[data-bb-handler="main"]').click();
            setTimeout(() => { $this.confirmar_HC523(); }, 500);
          }
        );
      })
    },

    confirmar_HC523() {
      CON851P('01', () => { this.reset_HC523(); this.llenarTabla_HC523('ventanaUnserv_HC523'); }, () => { $this.SIG_W = 20; $this.grabar_HC523(); });
    },

    async grabar_HC523() {
      var data = {}
      data['datosh'] = datosEnvio();
      data['llave_evo'] = this.llave_hc + this.FECHA_EVO_W + this.HORA_EVO_W + this.OPER_ELAB_W;
      data['medico'] = cerosIzq(this.datosIni.medico_HC523.trim(), 10);
      data['unserv'] = this.UNSERV_EVO;
      data['edad'] = $_REG_HC.edad_hc.unid_edad + cerosIzq($_REG_HC.edad_hc.vlr_edad, 3);
      data['glucometria'] = this.form.gluco_HC523;
      data['tipo'] = '1';
      data['codMed'] = this.form.codMed_HC523;
      data['cant'] = this.CANT_FORMU_W || 0;
      data['indic1'] = this.form.observ_HC523;
      data['hab'] = this._hcprc.cierre.hab;
      data['oper'] = this.form.oper_HC523;

      $this.data = data;

      await postData(data, get_url("app/HICLIN/HC523-1.DLL"))
        .then(data => {
          if (data == '1') {
            toastr.success("Guardado correctamente");
            $this.reset_HC523();
            $this.adicionarRegistros_HC523();
          } else {
            toastr.error("Error en guardado");
            $this.cerrarArchivos_HC523();
          }
        }).catch(err => {
          toastr.error("Error en guardado");
          console.log(err, 'error')
          loader('hide')
        })
    },

    reset_HC523() {
      this.form.año_HC523 = '';
      this.form.mes_HC523 = '';
      this.form.dia_HC523 = '';
      this.form.hora_HC523 = '';
      this.form.min_HC523 = '';
      this.form.gluco_HC523 = '';
      this.form.codMed_HC523 = '';
      this.form.descripMed_HC523 = '';
      this.form.observ_HC523 = '';
      this.form.oper_HC523 = '';
      this.form.glucoText_HC523 = '';
      this.glucoFlag = null;
    },

    adicionarRegistros_HC523() {
      CON851P('14', () => { setTimeout(() => { $this.datoImprimir_HC523() }, 500) }, () => { setTimeout(() => { $this.llenarTabla_HC523('ventanaUnserv_HC523'), 500 }) });
    },

    datoImprimir_HC523() {
      CON851P('00', () => { $this.cerrarArchivos_HC523() }, () => { setTimeout(() => { $this.ventanaOpcionesImp_HC523(); }, 300) });
    },

    ventanaOpcionesImp_HC523() {
      $this.titulo = 'IMPRESIÓN DE GLUCOMETRIA';

      this._ventanaImp_HC523();
    },

    ventanaMedicamentos_HC523() {
      _ventanaDatos({
        titulo: "MEDICAMENTOS",
        columnas: ["COD", "DESCRIP"],
        data: $this._medicamentos,
        callback_esc: function () {
          document.querySelector('.codMed_HC523').focus();
        },
        callback: function (data) {
          $this.form.codMed_HC523 = data['COD'].trim();
          $this.form.descripMed_HC523 = data['DESCRIP'].trim();
          _enterInput('.codMed_HC523');
        }
      });
    },

    datoCierre() {
      $this._hcprc.cierre.estado = '1';
      $this._hcprc.cierre.temporal == '1' && parseInt($this._hcprc.cierre.estado) > 0 ? $this._hcprc.cierre.temporal = '0' : false;
      $this.confirmar();
    },

    cargarHc_HC523() {
      postData({ datosh: datosEnvio() + this.llave_hc + '|' + localStorage["Usuario"].trim() + '|1|' }, get_url("APP/HICLIN/HC_PRC.DLL"))
        .then((data) => {
          $this._hcprc = data["HCPAC"];
          if ($this._hcprc.novedad == 7) {
            loader('hide')
            CON851('3A', '3A', null, 'error', 'error');
            _regresar_menuhis();
          } else {
            $this.cargarMedicamentos_HC523();
          }
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide');
          _regresar_menuhis();
        });
    },
    cargarMedicamentos_HC523() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER809.DLL"))
        .then(data => {
          $this._medicamentos = data.FARMACOS;
          $this.cargarProf_HC523();
        }).catch(err => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide')
          _regresar_menuhis();
        })
    },
    cargarProf_HC523() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          $this._profesionales = data.ARCHPROF;
          $this._profesionales.pop();
          $this.cargarUnserv_HC523();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide');
          _regresar_menuhis();
        });
    },
    cargarUnserv_HC523() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          $this._unserv = data.UNSERV;
          $this._unserv.pop();
          loader('hide');
          $this.iniciar_HC523();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          console.log(err, 'err');
          loader('hide');
          _regresar_menuhis();
        });
    },

    _ventanaImp_HC523() {
      var fuente = '<div id="IMP_HC523" style="width: 400px">' +
        '<div class="col-md-12 no-padding">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

        // INPUTS FECHAS INI
        '<div class="col-md-12 no-padding" id="divFechaIni_HC523">' +
        '<div class="salto-linea"></div>' +

        '<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Inicial:</label>' +

        '<div class="col-md-12 no-padding">' +
        '<div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="validarFechaIni_HC523">' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="añoIni_HC523" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
        'data-orden="1" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="mesIni_HC523" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
        'data-orden="2" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="diaIni_HC523" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
        'data-orden="3" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '</div>' +
        // 

        // INPUTS FECHAS FIN
        '<div class="col-md-12 no-padding" id="divFechaFin_HC523">' +
        '<div class="salto-linea"></div>' +

        '<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Final:</label>' +

        '<div class="col-md-12 no-padding">' +
        '<div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="validarFechaFin_HC523">' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="añoFin_HC523" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
        'data-orden="1" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="mesFin_HC523" type="number"' +
        'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
        'data-orden="2" required="true" style="text-align: center;">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-4 col-sm-4 col-xs-4">' +
        '<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
        '<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
        '<input id="diaFin_HC523" type="number"' +
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
        title: 'IMPRESIÓN CONTROL GLUCOMETRIA',
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

        $this.validarFechaIni_HC523('1');
      })
    },

    validarFechaIni_HC523(orden) {
      document.querySelector('#añoIni_HC523').value.trim() == '' ? document.querySelector('#añoIni_HC523').value = $this._hcprc.fecha.substring(0, 4) : false;
      document.querySelector('#mesIni_HC523').value.trim() == '' ? document.querySelector('#mesIni_HC523').value = $this._hcprc.fecha.substring(4, 6) : false;
      document.querySelector('#diaIni_HC523').value.trim() == '' ? document.querySelector('#diaIni_HC523').value = $this._hcprc.fecha.substring(6, 8) : false;
      validarInputs(
        {
          form: "#validarFechaIni_HC523",
          orden: orden,
        },
        () => {
          $('[data-bb-handler="main"]').click();
          if (localStorage.idOpciondata != '07C3') {
            setTimeout(() => { $this.adicionarRegistros_HC523(); }, 400);
          } else {
            $this.cerrarArchivos_HC523();
          }
        },
        async () => {
          document.querySelector('#añoIni_HC523').value = cerosIzq(document.querySelector('#añoIni_HC523').value, 4);
          document.querySelector('#mesIni_HC523').value = cerosIzq(document.querySelector('#mesIni_HC523').value, 2);
          document.querySelector('#diaIni_HC523').value = cerosIzq(document.querySelector('#diaIni_HC523').value, 2);
          var añoIni = document.querySelector('#añoIni_HC523').value;
          var mesIni = document.querySelector('#mesIni_HC523').value;
          var diaIni = document.querySelector('#diaIni_HC523').value;
          if (añoIni < $this.año_act) {
            CON851('03', '03', null, 'error', 'error');
            $this.validarFechaIni_HC523('1');
          } else if (mesIni < 01 || mesIni > 12) {
            $this.validarFechaIni_HC523('2');
          } else if (diaIni < 01 || diaIni > 31) {
            $this.validarFechaIni_HC523('3');
          } else {
            $this.fechaIni = añoIni.toString() + mesIni.toString() + diaIni.toString();
            $this.validarFechaFin_HC523('1');
          }
        }
      )
    },

    validarFechaFin_HC523(orden) {
      document.querySelector('#añoFin_HC523').value.trim() == '' ? document.querySelector('#añoFin_HC523').value = moment().format('YYYY') : false;
      document.querySelector('#mesFin_HC523').value.trim() == '' ? document.querySelector('#mesFin_HC523').value = moment().format('MM') : false;
      document.querySelector('#diaFin_HC523').value.trim() == '' ? document.querySelector('#diaFin_HC523').value = moment().format('DD') : false;
      validarInputs(
        {
          form: "#validarFechaFin_HC523",
          orden: orden,
        },
        () => {
          $this.validarFechaIni_HC523('3');
        },
        async () => {
          document.querySelector('#añoFin_HC523').value = cerosIzq(document.querySelector('#añoFin_HC523').value, 4);
          document.querySelector('#mesFin_HC523').value = cerosIzq(document.querySelector('#mesFin_HC523').value, 2);
          document.querySelector('#diaFin_HC523').value = cerosIzq(document.querySelector('#diaFin_HC523').value, 2);
          var añoFin = document.querySelector('#añoFin_HC523').value;
          var mesFin = document.querySelector('#mesFin_HC523').value;
          var diaFin = document.querySelector('#diaFin_HC523').value;
          if (añoFin < $this.año_act) {
            CON851('03', '03', null, 'error', 'error');
            $this.validarFechaFin_HC523('1');
          } else if (mesFin < 01 || mesFin > 12) {
            $this.validarFechaFin_HC523('2');
          } else if (diaFin < 01 || diaFin > 31) {
            $this.validarFechaFin_HC523('3');
          } else {
            $this.fechaFin = añoFin.toString() + mesFin.toString() + diaFin.toString();
            $this.llamarImpresion_HC523();
          }
        }
      )
    },

    async llamarImpresion_HC523() {
      loader('show');
      await this.llenarTabla_HC523('null');

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
      datos.paciente['unserv'] = $this.datosIni.consultando_HC523;
      datos.paciente['fact'] = $this._hcprc.cierre.prefijo + $this._hcprc.cierre.nro_fact;

      datos.titulo = $this.titulo;

      datos['glucometrias'] = []
      for (var i in $this.glucometrias) {
        if ($this.glucometrias[i].fechaN >= $this.fechaIni && $this.glucometrias[i].fechaN <= $this.fechaFin) {
          datos.glucometrias.push($this.glucometrias[i]);
        }
      }

      await _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
        content: _imprimirHC523(datos),
      }).then(data => {
        toastr.success("Cargando impresión");
        $('[data-bb-handler="main"]').click();
        setTimeout(() => { $this.cerrarArchivos_HC523(); }, 300);
      }).catch((err) => {
        console.error(err);
      });

      loader('hide');
    },

    _confirmarSalir_HC523(callback_esc, orden) {
      CON851P('03', () => { orden ? $this[callback_esc](orden) : $this[callback_esc]() }, () => { $this.cerrarArchivos_HC523() });
    },

    cerrarArchivos_HC523() {
      _regresar_menuhis();
    },
  }
})