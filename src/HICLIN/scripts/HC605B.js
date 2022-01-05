// RE-ABRE HISTORIA CLINICA - DAVID.M - 22-10-2020

new Vue({
  el: "#HC605B",
  data: {
    _hcprc: [],
    _evoluciones: [],
    _detalles: [],
    datosIni: {
      añoEnc_605B: '',
      mesEnc_605B: '',
      diaEnc_605B: '',
      hr_605B: '',
      mn_605B: '',
      medico_HC605B: '',
      descripMedico_HC605B: '',
      consultando_HC605B: '',
      enfAct_605B: ''
    },
    llave_hc: $_REG_HC.llave_hc,
    form: {
      factura_HC605B: '',
      fechaIng_HC605B: '',
      añoEgr_605B: '',
      mesEgr_605B: '',
      diaEgr_605B: '',
      hrEgr_HC605B: '',
      mnEgr_HC605B: '',
      estadoSalida_HC605B: '',
      descripEstadoSalida_HC605B: '',
      diagMuerte_HC605B: '',
      descripDiagMuerte_HC605B: '',
      diagSalida1_HC605B: '',
      descripDiagSalida1_HC605B: '',
      diagSalida2_HC605B: '',
      descripDiagSalida2_HC605B: '',
      diagSalida3_HC605B: '',
      descripDiagSalida3_HC605B: '',
      diagSalida4_HC605B: '',
      descripDiagSalida4_HC605B: '',
      diagSalida5_HC605B: '',
      descripDiagSalida5_HC605B: '',
      observaciones_HC605B: '',
      f8Estado: ''
    },
    fecha_act: moment().format('YYYYMMDD'),
    hora_act: moment().format('HH:mm'),
    arrayFechasEvo: []
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion('6-5-2 - Reapertura historia clinica.');
    $this = this;
    await this._cargarHHistoria();
  },
  methods: {
    async iniciarHC605B() {
      $this.banderaSalir != true ? this.llenarDatos() : false;
    },
    async llenarDatos() {
      $this.enf_act_hc = await $this._detalles.find(e => e['COD-DETHC'] == '1001' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
      if ($this.enf_act_hc != undefined) {
        $this.enf_act_hc = $this.enf_act_hc.DETALLE;
        $this.enf_act_hc = $this.enf_act_hc.replace(/\&/g, "\n").trim()
        $this.enf_act_hc = $this.enf_act_hc.replace(/\�/g, "Ñ");
      }
      $this.enf_act_hc != undefined ? $this.datosIni.enfAct_605B = $this.enf_act_hc.toUpperCase() : false;

      this.datosIni.añoEnc_605B = this._hcprc.fecha.substring(0, 4);
      this.datosIni.mesEnc_605B = this._hcprc.fecha.substring(4, 6);
      this.datosIni.diaEnc_605B = this._hcprc.fecha.substring(6, 8);

      this.datosIni.hr_605B = this._hcprc.hora.substring(0, 2);
      this.datosIni.mn_605B = this._hcprc.hora.substring(2, 4);

      if ($this.busqProf) {
        this.datosIni.medico_HC605B = $this.busqProf.IDENTIFICACION;
        this.datosIni.descripMedico_HC605B = $this.busqProf.DESCRIP.replace(/\�/g, "Ñ");
      } else {
        this.datosIni.medico_HC605B = '*****';
        this.datosIni.descripMedico_HC605B = '**************';
      }

      if ($this.busqUnserv) {
        $this._unservDescrip = $this.busqUnserv['DESCRIP'];
        $this._unservCod = $this.busqUnserv['COD'];
        this.datosIni.consultando_HC605B = $this.busqUnserv.DESCRIP.trim();
      }

      this.form.añoEgr_605B = $this._hcprc.egreso.substring(0, 4);
      this.form.mesEgr_605B = $this._hcprc.egreso.substring(4, 6);
      this.form.diaEgr_605B = $this._hcprc.egreso.substring(6, 8);

      aux = '';
      switch ($this._hcprc.rips.estado_sal) {
        case '1': aux = '1 - VIVO'; break;
        case '2': aux = '2 - MUERTO'; break;
        case '3': aux = '3 - REMITIDO'; break;
      }
      this.form.estadoSalida_HC605B = aux;
      this.form.descripEstadoSalida_HC605B = $this._hcprc.rips.remitido;

      this.form.diagMuerte_HC605B = $this._hcprc.cierre.diag_muer;

      if ($this._hcprc.cierre.diag_muer.trim() != '') {
        await postData({ datosh: datosEnvio() + $this._hcprc.cierre.diag_muer }, get_url("app/HICLIN/HCI-8031-1.DLL"))
          .then(data => {
            $this.enf_muerte = data;
            if ($this.enf_muerte[0].cod_diagn.trim() != '') {
              this.form.descripDiagMuerte_HC605B = $this.enf_muerte[0].nom_diagn;
            } else {
              this.form.descripDiagMuerte_HC605B = '********************************'
            }
          }).catch(err => {
            console.log(err, 'error')
          })
      }

      document.querySelector('#folio_HC605B').innerHTML = $_REG_HC.llave_hc.substr(15, 2) + $_REG_HC.llave_hc.substr(17, 6);

      $this._mostrarDiagnosticosHC605B();

      if ($this._hcprc.cierre.prefijo.trim() == '') {
        $this.descrip_num = '   ';
      } else {
        await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER808.DLL"))
          .then((data) => {
            $this._numer = data.NUMERACION;
            $this._numer.pop();
          })
          .catch((err) => {
            loader('hide')
            $this.banderaSalir = true;
            $this.cerrarArchivos();
            console.log(err);
          });

        $this.busqNum = await $this._numer.find(e => e.COD == $this._hcprc.cierre.prefijo + $this._hcprc.cierre.nro_fact);
      }

      if ($this.busqNum == undefined) {
        $this.busqNum = [];
        $this.busqNum.FECHA_ING = '        ';
        $this.busqNum.HORA_ING = '    ';
      }

      this.form.factura_HC605B = $this._hcprc.cierre.prefijo + $this._hcprc.cierre.nro_fact;
      this.form.fechaIng_HC605B = $this.busqNum.FECHA_ING + '  ' + $this.busqNum.HORA_ING.substring(0, 2) + ':' + $this.busqNum.HORA_ING.substring(2, 4);

      this.form.estadoHistoria_HC605B = $this._hcprc.cierre.estado;
      this.form.observaciones_HC605B = $this._hcprc.observ_egres.replace(/\&/g, "\n").trim();

      document.querySelector('#oper_cie_HC605B').innerHTML = $this._hcprc.cierre.oper_cie;

      this.datoFecha()
    },
    datoFecha() {
      $this._hcprc.egreso = '00000000';
      this.form.añoEgr_605B = '0000';
      this.form.mesEgr_605B = '00';
      this.form.diaEgr_605B = '00';
      $this.datoHora();
    },
    datoHora() {
      $this._hcprc.hora_egres = '0000';
      $this.form.hrEgr_HC605B = '00'
      $this.form.mnEgr_HC605B = '00';
      $this.datoObservacion();
    },
    datoObservacion() {
      console.log('llega a datoObserv');
      validarInputs(
        {
          form: "#observaciones_605B",
          orden: "1"
        },
        () => {
          $this.cerrarArchivos();
        },
        () => {
          $this._hcprc.observ_egres = $this.form.observaciones_HC605B.replace(/(\r\n|\n|\r)/gm, "&").trim();
          $this._hcprc.observ_egres = $this._hcprc.observ_egres.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');
          $this.datoCierre();
        }
      )
    },
    datoCierre() {
      $this._hcprc.cierre.estado = '1';
      $this._hcprc.cierre.temporal == '1' && parseInt($this._hcprc.cierre.estado) > 0 ? $this._hcprc.cierre.temporal = '0' : false;
      $this.confirmar();
    },
    async confirmar() {
      CON851P(
        '01',
        () => { $this.datoObservacion() },
        async () => {
          if ($this._hcprc.cierre.estado == '1') {
            $this._hcprc.cierre.fecha_ult_reaper = moment().format('YYYYMMDD');
            $this._hcprc.cierre.hora_ult_reaper = moment().format('HHmm');
            $this._hcprc.cierre.oper_ult_reaper = localStorage.Usuario;
            $this._hcprc.cierre.cod_ult_reaper = 'H';
          }

          if ($this._hcprc.cierre.estado == '2') {
            $this._hcprc.cierre.fecha_ult_cierre = moment().format('YYYYMMDD');
            $this._hcprc.cierre.hora_ult_cierre = moment().format('HHmm');
            $this._hcprc.cierre.oper_ult_cierre = localStorage.Usuario;
            $this._hcprc.cierre.cod_ult_cierre = 'H';
          }

          (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC') ? false : $this._hcprc.cierre.oper_cie = localStorage.Usuario;

          $this._hcprc.paciente = $_REG_HC.id_paciente;
          $this._hcprc.folio_suc = $_REG_HC.llave_hc.substr(15, 2);
          $this._hcprc.folio_nro = $_REG_HC.llave_hc.substr(17, 6);

          var datos = await _getObjetoHc($this._hcprc);
          datos.datosh = datos.datosh + '1|'
          await postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
            .then((data) => {
              toastr.success("Reapertura correcta");
            })
            .catch((err) => {
              toastr.error("Error en guardado");
            });

          $this.cerrarArchivos();
        });
    },
    async _mostrarDiagnosticosHC605B() {
      $this.diagArray = [];

      for (i in $this._hcprc.cierre.tabla_diag_egr) {
        await $this.diagArray.push($this._hcprc.cierre.tabla_diag_egr[i].diag_egr)
      }

      $this.diagArray = $this.diagArray.toString().replace(/\,/g, "")

      if ($this.diagArray.trim() != '') {
        await postData({ datosh: datosEnvio() + $this.diagArray }, get_url("app/HICLIN/HCI-8031-1.DLL"))
          .then(data => {
            console.log('data hci-8031', data)
            $this.enf_egr = data;
            for (var i in $this.enf_egr) {
              if (i <= 5) {
                $this.form[`diagSalida${(parseInt(i) + 1)}_HC605B`] = $this.enf_egr[i].cod_diagn;
                $this.form[`descripDiagSalida${(parseInt(i) + 1)}_HC605B`] = $this.enf_egr[i].nom_diagn;
              }
            }
          }).catch(err => {
            console.log(err, 'error')
          })
      }
    },
    _confirmarSalir() {
      CON851P('03', () => { $this.aceptarDiagn() }, () => { _regresar_menuhis() });
    },
    cerrarArchivos() {
      _regresar_menuhis();
    },
    _cargarHHistoria() {
      postData({ datosh: datosEnvio() + this.llave_hc + '|' + localStorage["Usuario"].trim() + '|1|' }, get_url("APP/HICLIN/HC_PRC.DLL"))
        .then((data) => {
          this._hcprc = data["HCPAC"];
          if (this._hcprc.rips.estado_sal == '2' && (localStorage.Usuario != 'ADMI' && localStorage.Usuario != 'GEBC')) {
            CON851('EL', 'EL', null, 'error', 'error');
            this.cerrarArchivos();
          } else this._cargarRestriccion();
        })
        .catch((err) => {
          loader('hide')
          console.error(err);
          CON851("", "Error consultando datos", null, "error", "Error");
          _regresar_menuhis();
        });
    },
    _cargarRestriccion() {
      if (this._hcprc.cierre.estado == '2') {
        postData({ datosh: datosEnvio() + localStorage.Usuario + `|ISH652|` }, get_url("APP/CONTAB/CON904.DLL"))
          .then(data => {
            this.usuarioValido = true;
            this._cargarProfesional();
          })
          .catch(err => {
            loader("hide");
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            _regresar_menuhis();
          });
      } else {
        loader("hide");
        CON851('1C', '1C', null, 'error', 'error');
        _regresar_menuhis();
      }
    },
    _cargarProfesional() {
      postData({ datosh: datosEnvio() + cerosIzq(this._hcprc.med.trim(), 10) }, get_url("APP/SALUD/SAL719-01.DLL"))
        .then((data) => {
          this.busqProf = data.PERSATI[0];
          this._cargarUnserv();
        })
        .catch((err) => {
          loader('hide')
          console.error(err);
          CON851("", "Error consultando datos", null, "error", "Error");
          _regresar_menuhis();
        });
    },
    _cargarUnserv() {
      postData(
        { datosh: datosEnvio(), paso: 1, codigo: this._hcprc.cierre.unserv },
        get_url("APP/SALUD/SER873.DLL")
      )
        .then((data) => {
          this.busqUnserv = data;
          this._cargarDetalles();
        })
        .catch((err) => {
          loader("hide");
          console.error(err);
          CON851("", "Error consultando datos", null, "error", "Error");
          _regresar_menuhis();
        });
    },
    _cargarDetalles() {
      postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|**|**||' }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
      .then(data => {
        this._detalles = data['DETHC'];
        this._detalles.pop();
        this._cargarEvoluciones();
      }).catch(err => {
        loader('hide')
        console.error(err);
        CON851("", "Error consultando datos", null, "error", "Error");
        _regresar_menuhis();
      })
    },
    _cargarEvoluciones() {
      postData({ datosh: datosEnvio() + `${$_REG_PACI['COD']}|${$_REG_HC['suc_folio_hc'] + $_REG_HC['nro_folio_hc']}|1|` }, get_url("app/HICLIN/HC705B.DLL"))
      .then(data => {
        this._evoluciones = data.EVOLUCIONES;
        this._evoluciones.pop()
        loader('hide');
        this.iniciarHC605B();
      }).catch(err => {
        loader('hide');
        console.error(err);
        CON851("", "Error consultando datos", null, "error", "Error");
        _regresar_menuhis();
      })
    },
    async _cargarArchivos_HC605B() {
      if ($this.banderaSalir != true) {
        
      }
    },
  }
})