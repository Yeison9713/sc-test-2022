/** @format */

'use strict';

/**
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Procesos de enfermería - Control liquidos.
 * @date       12/04/2020. CREACION
 */
var _vm;
new Vue({
  el: '#HC526',
  data: {
    indice: 1,
    medico: {cod: '', descripcion: '', especialidad: ''},
    fecha_evo: {anio: '', mes: '', dia: '', completa: ''},
    hora_evo: {hora: '', min: '', completa: ''},
    control: {
      administrados: {oral: '', venosa: '', tran: '', total: ''},
      eliminados: {
        orina: '',
        mfecal: '',
        sng: '',
        otros: '',
        observaciones: '',
        total: '',
      },
      balance: '',
      gasto_urinario: '',
    },
    unserv: '',
    folio: '',
    admin_w: '',
    nit_usu: '',
    fecha_act: '',
    anio_act: '',
    mes_act: '',
    dia_act: '',
    get hora_act() {
      return moment().format('HHmm');
    },
    llave_hc: '',
    llave_w: '',
    anoIni: '',
    mesIni: '',
    diaIni: '',
    hcprc: [],
    profesionales: [],
    fechas_evo: [],
    unidades_servicio: [],
    ciudades: [],
    tabla_controles: [],
    original_data: {},
    salir: false,
    sw_fin: false,
    sw_prn: false,
    sw_primer: false,
    bandera: false,
    sw_peso: false,
  },
  async beforeCreate() {
    this.data = null;
    delete this.data;
  },
  async created() {
    console.clear();
    $('#nombreOpcion').remove();
    localStorage.idOpciondata != '07C6'
      ? nombreOpcion('5-2-6 - Control de liquidos.')
      : nombreOpcion('7-C-5 - Reimpresión control de liquidos.');

    _inputControl('disabled');
    _inputControl('reset');

    _vm = this;
    await _vm.iniciarProcesoEnfer();
  },
  computed: {
    controles() {
      return this.tabla_controles.slice();
    },
    llaveEvo() {
      return `${this.llave_hc}${this.fechaEvo}${this.horaEvo}${this.admin_w}`;
    },
    fechaHora() {
      return `${this.control.anio}-${this.control.mes}-${this.control.dia}T${this.control.hora}:${this.control.minutos}`;
    },
    fechaEvo() {
      return this.control.anio + this.control.mes + this.control.dia;
    },

    horaEvo() {
      return this.control.hora + this.control.minutos;
    },
    fechaHorario() {
      let fechaCurrent = new Date();
      fechaCurrent = {
        ano: fechaCurrent.getFullYear(),
        mes: parseInt(fechaCurrent.getMonth()),
        dia: fechaCurrent.getDate(),
        hora: '07',
        minutos: '00',
      };
      return moment(Object.values(fechaCurrent)).format('YYYYMMDDHHmm');
    },
  },
  methods: {
    devolverFecha: (fecha) => [
      fecha ? parseInt(fecha.substring(0, 4)) : '',
      fecha ? parseInt(fecha.substring(4, 6)).toString().padStart(2, '0') : '',
      fecha ? parseInt(fecha.substring(6, 8)).toString().padStart(2, '0') : '',
    ],
    validarFecha(t, f = parseInt(f) || 0) {
      const now = new Date();
      const check_fecha =
        f != 0
          ? [String(f).substring(0, 4), String(f).substring(4, 6), String(f).substring(6, 8)]
          : ['0000', '00', '00'];
      let prev = parseInt(`${check_fecha[0]}${check_fecha[1]}${check_fecha[2]}`);
      let next = parseInt(moment().format('YYYYMMDD'));
      let fecha = {
        anio: f < now.getFullYear() || f > now.getFullYear(),
        mes: f < 1 || f > 12 || f > Number(now.getMonth()) + 1,
        dia: f < 1 || f > 31,
        fin: _validarFecha(check_fecha[0], check_fecha[1], check_fecha[2]) && prev <= next,
      };
      return t == 'fin' ? fecha[t] : !fecha[t];
    },
    async iniciarProcesoEnfer() {
      try {
        await _vm.inicializarProceso();
        await _vm.cargarHistoriaPaciente();
      } catch (e) {
        console.error('error ' + e);
        _vm.terminarEjecucion();
      }
    },
    async llenarFormulario() {
      const {und_edad, val_edad} = {
        und_edad: $_REG_HC.edad_hc.unid_edad,
        val_edad: $_REG_HC.edad_hc.vlr_edad,
      };
      _vm.unid_edad_hc_w = {D: 1, M: '2', A: 3}[und_edad] || 0;
      _vm.vlr_edad_hc_w = val_edad;

      const medico = parseInt(localStorage.IDUSU);
      let profesional = _vm.profesionales.find((p) => parseInt(p.IDENTIFICACION) == medico);
      profesional = profesional || 0;

      if (profesional) {
        const atiende = consult_atiendProf(profesional.ATIENDE_PROF);
        _vm.medico.descripcion = profesional.NOMBRE.replace(/\�/g, 'Ñ');

        _vm.medico.cod = new Intl.NumberFormat('ja-JP').format(medico);
        _vm.medico.especialidad = `${profesional.ATIENDE_PROF}.${atiende}`;
      } else {
        _vm.terminarEjecucion(), CON851('9X', '9X', null, 'error', 'error');
      }

      _vm.folio = `${$_REG_HC.llave_hc.substr(15, 2)}${$_REG_HC.llave_hc.substr(17, 6)}`;

      try {
        [this.fecha_evo.anio, _vm.fecha_evo.mes, _vm.fecha_evo.dia] = [
          _vm.control.anio,
          _vm.control.mes,
          _vm.control.dia,
        ] = await _vm.devolverFecha(this.fecha_evo.completa);
        _vm.tabla_controles = [];
        await _vm.llenarTablaControles();

        localStorage.idOpciondata != '07C6'
          ? setTimeout(_vm.ventanaUnserv, 400)
          : ((this.unserv = `${this.unserv_cod}.${this.unserv_descrip}`),
            _vm.continuarControl(),
            $('#inputs-tabla').hide(),
            $('#opciones').hide());
      } catch (e) {
        console.error('error' + e);
        vm.terminarEjecucion();
      }
    },
    async llenarTablaControles() {
      _vm.tabla_controles = [];
      let [controles, llave_hc] = [_vm.tabla_controles, _vm.llave_hc];

      await postData({datosh: `${datosEnvio()}${llave_hc}| `}, get_url('APP/HICLIN/HC526.DLL'))
        .then(function (data) {
          let evo = data.EVO_LIQUIDOS;
          evo.length > 1 ? evo.pop() : (evo = evo.reverse());
          for (const i in evo) {
            let fecha = evo[i].FECHA || '00000000';
            if (parseInt(fecha) != 0) {
              const totales = {
                eliminados: Object.values(evo[i]['ELIMINADOS']).reduce(
                  (a, b) => (parseInt(a) || 0) + (parseInt(b) || 0),
                ),
                administrados: Object.values(evo[i]['ADMINISTRADOS']).reduce(
                  (a, b) => parseInt(a) + parseInt(b),
                ),
              };
              var balance = Number(totales.administrados) - Number(totales.eliminados);
              controles.push({
                llave: evo[i].LLAVE,
                anio: _vm.devolverFecha(evo[i].FECHA)[0] || '0000',
                mes: _vm.devolverFecha(evo[i].FECHA)[1] || '00',
                dia: _vm.devolverFecha(evo[i].FECHA)[2] || '00',
                fecha: fecha,
                hora: evo[i].HORA.substring(0, 2) || '00',
                min: evo[i].HORA.substring(2, 4) || '00',
                oper: evo[i].OPER_ELAB,
                administrados: {
                  oral: parseInt(evo[i]['ADMINISTRADOS'].ORAL).toString().padStart(2, '0') || 0,
                  venosa: parseInt(evo[i]['ADMINISTRADOS'].VENA).toString().padStart(2, '0') || 0,
                  otros: parseInt(evo[i]['ADMINISTRADOS'].TRAN).toString().padStart(2, '0') || 0,
                  total: totales.administrados,
                },
                eliminados: {
                  orina: parseInt(evo[i]['ELIMINADOS'].ORINA).toString().padStart(2, '0') || 0,
                  darrea: parseInt(evo[i]['ELIMINADOS'].DIAR).toString().padStart(2, '0') || 0,
                  sng: parseInt(evo[i]['ELIMINADOS'].SOND).toString().padStart(2, '0') || 0,
                  otros: parseInt(evo[i]['ELIMINADOS'].OTR1.toString().padStart(2, '0')) || 0,
                  total: totales.eliminados,
                },
                fecha_grab: evo[i]['FECHA_GRAB'],
                hora_grab: evo[i]['HORA_GRAB'],
                fechaHoraGrab: parseInt(evo[i]['FECHA_GRAB'] + evo[i]['HORA_GRAB']),
                fechaHora: parseInt(fecha + evo[i].HORA),
                observaciones: evo[i].DETALLE,
                peso: evo[i].PESO,
                oper_nombre: evo[i].NOMBRE_OPER,
                balance: balance,
              });
            }
          }
          _vm.indice = _vm.indice < 1 ? 1 : parseInt(evo.length) + 1;
          _vm.tabla_controles = controles;
          _vm.tabla_controles = _vm.tabla_controles.sort(
            (a, b) => (b.fechaHoraGrab < a.fechaHoraGrab ? 1 : -1),
            0,
          );
          let i = 0;
          for (i; i < _vm.tabla_controles.length; i++)
            _vm.tabla_controles[i].item = _vm.tabla_controles.length - i;
          _vm.indice = _vm.indice < 1 ? 1 : parseInt(_vm.tabla_controles.length) + 1;
        })
        .catch(
          (e) => (CON851(e, 'Error trayendo datos', null, 'error', 'error'), _vm.terminarEjecucion),
        );
    },
    datoUnidad(data) {
      _vm.unserv_cod = data.COD;
      _vm.unserv_descrip = data.DESCRIP.trim();
      _vm.unserv = `${this.unserv_cod}.${this.unserv_descrip}`;
      data.ESTADO == 'N'
        ? (CON851('13', '13', null, 'error', 'error'), _vm.ventanaUnserv())
        : _vm.datoMinutosControl();
    },
    datoAnioControl() {
      validarInputs(
        {
          form: '#dato_anio_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoAnioControl, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          CON851P('03', this.datoAnioControl, this.terminarEjecucion);
        },
        () => {
          const anio = _vm.control.anio || 0;
          if (_vm.validarFecha('anio', anio)) _vm.datoMesControl();
          else {
            CON851('37', '37', null, 'error', 'error');
            _vm.datoAnioControl();
          }
        },
      );
    },
    datoMesControl() {
      validarInputs(
        {
          form: '#dato_mes_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoAnioControl, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoAnioControl();
        },
        () => {
          const mes = _vm.control.mes || 0;
          if (_vm.validarFecha('mes', mes)) _vm.datoDiaControl();
          else {
            CON851('37', '37', null, 'error', 'error');
            _vm.datoAnioControl();
          }
        },
      );
    },
    datoDiaControl() {
      validarInputs(
        {
          form: '#dato_dia_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoDiaControl, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoMesControl();
        },
        () => {
          _vm.control.fecha = [_vm.control.anio, _vm.control.mes, _vm.control.dia].join('');
          const dia = _vm.control.dia || 0,
            fecha = Number(this.control.fecha) || '00000000';
          if (_vm.validarFecha('dia', dia) && _vm.validarFecha('fin', fecha)) {
            _vm.datoHoraControl();
          } else {
            CON851('37', '37', null, 'error', 'error');
            _vm.datoAnioControl();
          }
        },
      );
    },
    datoHoraControl() {
      validarInputs(
        {
          form: '#dato_hora_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoHoraControl, this.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          this.datoDiaControl();
        },
        () => {
          let hora = (this.control.hora = this.control.hora.padStart(2, '0'));
          const [fecha_control, fecha_act] = [
            `${this.control.anio}${this.control.mes}${this.control.dia}`,
            this.fecha_act,
          ];
          if (
            hora < 0 ||
            hora > 23 ||
            (parseInt(fecha_control) == parseInt(fecha_act) && hora > this.hora_act)
          ) {
            CON851('9Q', '9Q', null, 'warning', 'Advertencia');
            this.datoHoraControl();
          } else {
            this.datoMinutosControl();
          }
        },
      );
    },
    datoMinutosControl() {
      validarInputs(
        {
          form: '#dato_minutos_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoMinutosControl, this.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          this.datoHoraControl();
        },
        () => {
          let hora = (this.control.hora = this.control.hora.padStart(2, '0'));
          let minuto = parseInt((this.control.minutos = this.control.minutos.padStart(2, '0')));
          const [fecha_control, fecha_act] = [
            `${this.control.anio}${this.control.mes}${this.control.dia}`,
            this.fecha_act,
          ];
          if (
            minuto < 0 ||
            minuto > 59 ||
            parseInt(fecha_control + hora) > parseInt(fecha_act + this.hora_act)
          ) {
            CON851('9Q', '9Q', null, 'warning', 'Advertencia');
            this.datoHoraControl();
          } else {
            _vm.control['peso'] = _vm.control['peso'] || 0;
            _vm.comprobarEvolucion();
          }
        },
      );
    },
    /*LIQUIDOS ADMINISTRADOS*/
    datoAdministradosOral() {
      validarInputs(
        {
          form: '#dato_adm_oral',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoAdministradosOral, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoHoraControl();
        },
        () => {
          _vm.control.administrados.oral = _vm.control.administrados.oral || 0;
          _vm.datoAdministradosVenosa();
        },
      );
    },
    datoAdministradosVenosa() {
      validarInputs(
        {
          form: '#dato_adm_venosa',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoAdministradosVenosa, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoAdministradosOral();
        },
        () => {
          _vm.control.administrados.venosa = _vm.control.administrados.venosa || 0;
          _vm.datoAdministradosOtros();
        },
      );
    },
    datoAdministradosOtros() {
      validarInputs(
        {
          form: '#dato_adm_otros',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoAdministradosOtros, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoAdministradosVenosa();
        },
        () => {
          let control = _vm.control;
          control.administrados.otros = control.administrados.otros || 0;
          control.administrados.total = 0;

          let arrayTotalAdmin = Object.values(control.administrados);
          arrayTotalAdmin = arrayTotalAdmin.map((m) => (!isNaN(m) ? m : 0)).filter((x) => x != '');

          let totalAdministrados =
            arrayTotalAdmin != '' ? arrayTotalAdmin.reduce((a, b) => parseInt(a) + parseInt(b)) : 0;
          _vm.control.administrados.total = totalAdministrados;
          _vm.datoEliminadosOrina();
        },
      );
    },
    /*LIQUIDOS ELIMINADOS*/
    datoEliminadosOrina() {
      validarInputs(
        {
          form: '#dato_elim_orina',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoEliminadosOrina, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoAdministradosOtros();
        },
        () => {
          _vm.control.eliminados.orina = _vm.control.eliminados.orina || 0;
          _vm.datoEliminadosDarrea();
        },
      );
    },
    datoEliminadosDarrea() {
      validarInputs(
        {
          form: '#dato_elim_diarrea',
          orden: '1',
          event_f5: () =>
            CON851P(
              '03',
              () => _vm.datoEliminadosDarrea(),
              () => _vm.terminarEjecucion(),
            ),
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoEliminadosOrina();
        },
        () => {
          _vm.control.eliminados.darrea = _vm.control.eliminados.darrea || 0;
          _vm.datoEliminadosSng();
        },
      );
    },
    datoEliminadosSng() {
      validarInputs(
        {
          form: '#dato_elim_sng',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoEliminadosSng, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoEliminadosDarrea();
        },
        () => {
          _vm.control.eliminados.sng = _vm.control.eliminados.sng || 0;
          _vm.datoEliminadosOtros();
        },
      );
    },
    datoEliminadosOtros() {
      validarInputs(
        {
          form: '#dato_elim_otros',
          orden: '1',
          event_f5: () => {
            CON851P('03', _vm.datoEliminadosOtros, _vm.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {
          _vm.datoEliminadosSng();
        },
        () => {
          let control = _vm.control;
          control.eliminados.otros = control.eliminados.otros || 0;
          control.eliminados.total = 0;
          try {
            let arrayTotalEliminados = Object.values(control.eliminados);
            arrayTotalEliminados = arrayTotalEliminados
              .map((m) => (!isNaN(m) ? m : 0))
              .filter((x) => x != '');

            let totalEliminados =
              arrayTotalEliminados != ''
                ? arrayTotalEliminados.reduce((a, b) => parseInt(a) + parseInt(b))
                : 0;

            _vm.control.eliminados.total = totalEliminados;
            setTimeout(() => {
              _vm.validarEntradasControl();
              _vm.sw_fin = true;
              _vm.datoObservacion();
            }, 300);
          } catch (e) {
            console.error('error ' + e);
            _vm.datoEliminadosOtros();
          }
        },
      );
    },
    datoObservacion() {
      validarInputs(
        {
          form: '#dato_observaciones',
          orden: '1',
          event_f3: () => _vm.confirmar(),
        },
        () => {
          _vm.sw_fin = false;
          setTimeout(_vm.datoEliminadosOtros, 100);
        },
        () => {
          _vm.sw_fin = false;
          setTimeout(_vm.confirmar, 100);
        },
      );
    },
    datoPeso() {
      loader('hide');
      validarInputs(
        {
          form: '#dato_pesoHc',
          orden: '1',
        },
        () => {
          _vm.sw_peso = !1;
          setTimeout(_vm.datoHoraControl, 200);
        },
        () => {
          _vm.sw_peso = false;
          _vm.control['peso'] = parseFloat(_vm.control['peso']).toFixed(2);
          _vm.datoAdministradosOral();
        },
      );
    },
    async grabarRegistros() {
      var data = {datosh: datosEnvio()};
      data['medico'] = cerosIzq(this.medico.cod.replace(/\,/g, '').trim(), 10);
      data['unserv'] = _vm.unserv_cod || '    ';
      data['edad'] = `${$_REG_HC.edad_hc.unid_edad}${cerosIzq($_REG_HC.edad_hc.vlr_edad, 3)}`;
      data['llave_evo'] = _vm.llaveEvo;
      data['hab'] = _vm._hcprc.cierre.hab || ' ';
      data['oral'] = _vm.control.administrados.oral || 0;
      data['peso'] = _vm.control.peso || 0;
      data['venosa'] = _vm.control.administrados.venosa || 0;
      data['otros_adm'] = _vm.control.administrados.otros || 0;
      data['orina'] = _vm.control.eliminados.orina || 0;
      data['darrea'] = _vm.control.eliminados.darrea || 0;
      data['sng'] = _vm.control.eliminados.sng || 0;
      data['otros_elim'] = _vm.control.eliminados.otros || 0;
      data['observaciones'] = _vm.control.observaciones || ' ';
      data['oper'] = _vm.oper_elab;

      try {
        if (await _vm.envioRegistros(data)) {
          toastr.success('Guardado correctamente');
          _vm.data = this.original_data;
          _vm.AdicionarRegistros();
        } else {
          toastr.error('Error en guardado');
          _vm.terminarEjecucion();
        }
      } catch (e) {
        console.error('Hubo un error al intentar grabar el registro, Error: ' + e);
        _vm.datoHoraControl();
      }
    },
    envioRegistros(data) {
      return new Promise(async (resolve, reject) => {
        await postData(data, get_url('app/HICLIN/HC526-1.DLL'))
          .then((data) => (data.trim() == '1' ? resolve(true) : reject(false)))
          .catch((err) => {
            toastr.error('Error en guardado', err);
            loader('hide');
            _vm.terminarEjecucion();
          });
      });
    },
    ventanaOpcionesImp() {
      _vm.sw_prn = true;
      _vm.anoFin = 0;
      _vm.mesFin = 0;
      _vm.diaFin = 0;
      _inputControl('disabled');
      _inputControl('reset');
      var fechaHistoria = moment(_vm._hcprc.fecha).format('YYYYMMDD');
      [_vm.anoIni, _vm.mesIni, _vm.diaIni] = _vm.devolverFecha(fechaHistoria);
      _vm.datoAnioRangoIni();
    },
    validarFechaIni(t) {
      let enter_input = {
        y: () => {
          _vm.datoAnioRangoIni();
        },
        m: () => {
          _vm.datoMesRangoIni();
        },
        d: () => {
          _vm.datoDiaRangoIni();
        },
      };
      setTimeout(eval(enter_input[t]), 1);
    },
    datoAnioRangoIni() {
      validarInputs(
        {
          form: '#dato_anio_ini',
          orden: '1',
        },
        () => {
          _vm.sw_prn = false;
          setTimeout(() => _vm.confirmarImpresion(), 300);
        },
        () => {
          _vm.validarFecha('anio', _vm.anoIni)
            ? _vm.validarFechaIni('m')
            : (CON851('03', 'año no valido', null, 'error', 'Error'), _vm.validarFechaIni('y'));
        },
      );
    },
    datoMesRangoIni() {
      validarInputs(
        {
          form: '#dato_mes_ini',
          orden: '1',
        },
        () => {
          _vm.validarFechaIni('y');
        },
        () => {
          _vm.validarFecha('mes', _vm.mesIni)
            ? _vm.validarFechaIni('d')
            : (CON851('03', 'mes no valido', null, 'error', 'Error'), _vm.validarFechaIni('m'));
        },
      );
    },
    datoDiaRangoIni() {
      validarInputs(
        {
          form: '#dato_dia_ini',
          orden: '1',
        },
        () => {
          _vm.validarFechaIni('m');
        },
        () => {
          _vm.anoIni = _vm.anoIni.toString().padStart(2, '0');
          _vm.mesIni = _vm.mesIni.toString().padStart(2, '0');
          _vm.diaIni = _vm.diaIni.toString().padStart(2, '0');
          let fecha_ini = `${_vm.anoIni}${_vm.mesIni}${_vm.diaIni}`;
          _vm.fechaIni = fecha_ini;
          if (_vm.validarFecha('dia', _vm.diaIni)) {
            if (_vm.validarFecha('fin', fecha_ini)) {
              _vm.llamarImpresion();
            } else {
              CON851('37', '37', null, 'error', 'Error'), _vm.validarFechaIni('y');
            }
          } else {
            CON851('03', 'dia no valido', null, 'error', 'Error');
            _vm.validarFechaFin('d');
          }
        },
      );
    },
    async llamarImpresion() {
      var reg_paci = $_REG_PACI;
      var datos = {paciente: {}};
      const id_paci = Number(reg_paci.COD)
        ? reg_paci.COD
        : new Intl.NumberFormat('ja-JP').format(reg_paci.COD);
      const sexo_paci = reg_paci.SEXO.toUpperCase() == 'F' ? 'Femenino' : 'Masculino';

      await postData({datosh: datosEnvio()}, get_url('app/CONTAB/CON809.DLL'))
        .then((data) => {
          _vm.ciudades = data.CIUDAD;
          const ciudadPaci = reg_paci.CIUDAD.trim();
          const ciudad = _vm.ciudades.find((c) => c.COD.trim() == ciudadPaci);
          datos.paciente['municipio'] = ciudad.NOMBRE.replace(/\s+/g, ' ');
        })
        .catch((err) => console.log(err, 'error'));

      datos.titulo = 'CONTROL DE LIQUIDOS';
      datos.paciente['fecha'] = datos.fecha = moment(_vm._hcprc.fecha).format('YYYY/MM/DD');
      datos.paciente['hora'] = datos.hora = moment(_vm._hcprc.hora).format('HH:mm');
      datos.paciente['unserv'] = _vm.unserv_descrip;
      datos.paciente['folio'] = _vm.folio;
      datos.paciente['fact'] = `${_vm._hcprc.cierre.prefijo}${_vm._hcprc.cierre.nro_fact}`;
      datos.paciente['id'] = id_paci;
      datos.paciente['tipoId'] = reg_paci['TIPO-ID'];
      datos.paciente['nombre'] = reg_paci.DESCRIP.replace(/\s+/g, ' ');
      datos.paciente['edad'] = _vm._hcprc.edad;
      datos.paciente['telefono'] = reg_paci.TELEFONO;
      datos.paciente['sexo'] = sexo_paci;

      // filtro controles
      datos.controles = [];
      if (_vm.tabla_controles) datos.controles = _vm.filtrarControles(_vm.tabla_controles);
      else [{peso: 0}];
      datos.controles = datos.controles ? (datos.controles.length > 0 ? datos.controles : []) : [];
      try {
        let tabla = [...datos.controles];
        let peso = 0;
        peso = datos.controles.find((c) => parseInt(c.peso) > 0 || c.peso != '');
        _vm.control.peso = peso = peso.peso || 0;
        datos.paciente['gasto_urinario'] = _vm.calcularGastoUrinario(tabla);
        setTimeout(() => {
          datos['paciente'].peso = peso || 0;
          if (datos.controles == [] || (datos.controles == '' && _vm.bandera == false)) {
            let msj = 'No se encontraron controles en el rango de fechas';
            setTimeout(() => toastr.warning(msj), 1);
            loader('hide');
            setTimeout(() => _vm.validarFechaIni('y'), 200);
          } else if (_vm.bandera == false) _vm.enviarImpresion(datos);
        }, 400);
      } catch (e) {
        console.error('error ' + e);
        _vm.datoAnioRangoIni();
      }
    },
    async enviarImpresion(datos) {
      _vm.bandera = true;

      const format = '-YYMMDD-HHmmssS';
      const nombrePDF = `${localStorage.Usuario}${moment().format(format)}`;
      let opciones = {
        tipo: 'pdf',
        archivo: `${nombrePDF}.pdf`,
        content: await _imprimirHC526(datos),
      };

      _impresion2(opciones)
        .then(() => {
          setTimeout(_vm.terminarEjecucion, 1);
        })
        .catch((err) => {
          console.error(err);
          _vm.terminarEjecucion();
        });
    },
    async ventanaUnserv() {
      await SER873(
        () => {
          _vm.terminarEjecucion();
        },
        _vm.datoUnidad,
        1,
      );
    },
    confirmar() {
      CON851P(
        '01',
        () => {
          _vm.datoHoraControl();
        },
        () => {
          _vm.grabarRegistros();
        },
      );
    },
    AdicionarRegistros() {
      CON851P(
        '14',
        () =>
          setTimeout(() => {
            _vm.inicializarProceso();
            _vm.llenarTablaControles();
            _vm.confirmarImpresion();
          }, 1),

        () =>
          setTimeout(() => {
            _vm.inicializarProceso();
            _vm.llenarTablaControles();
            _vm.llenarFormulario();
          }, 1),
      );
    },
    confirmarImpresion() {
      CON851P('00', _vm.terminarEjecucion, _vm.ventanaOpcionesImp);
    },
    /*----------- CONSULTAS & RUTINAS --------- */
    cargarHistoriaPaciente() {
      console.log('cargando historia');
      let _vm = this;
      postData(
        {
          datosh: datosEnvio() + this.llave_hc + '|' + localStorage.Usuario.trim() + '|1|',
        },
        get_url('APP/HICLIN/HC_PRC.DLL'),
      )
        .then((data) => {
          _vm._hcprc = data.HCPAC;
          7 == _vm._hcprc.novedad
            ? (loader('hide'), CON851('3A', '3A', null, 'error', 'error'), _regresar_menuhis())
            : _vm.cargarProfesionales();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          loader('hide'), _regresar_menuhis();
        });
    },
    cargarProfesionales() {
      console.log('cargando profesionales');
      postData({datosh: datosEnvio()}, get_url('APP/SALUD/SER819.DLL'))
        .then((data) => {
          let profesionales = (_vm.profesionales = data.ARCHPROF);
          profesionales.length > 1 ? profesionales.pop() : (profesionales = profesionales);
          _vm.llenarFormulario();
        })
        .catch((err) => {
          CON851('Profesionales', 'Error trayendo datos', null, 'error', 'error'),
            loader('hide'),
            _regresar_menuhis();
        });
    },
    comprobarEvolucion() {
      loader('show');
      postData({datosh: datosEnvio() + this.llaveEvo + '|'}, get_url('APP/HICLIN/HC522-2.DLL'))
        .then((data) => {
          loader('hide');
          if ('8' == data) {
            [
              this.control.anio,
              this.control.mes,
              this.control.dia,
              this.control.hora,
              this.control.minutos,
            ] = moment(this.fechaHora).add(1, 'm').format('YYYY-MM-DD-HH-mm').split('-');
            _vm.comprobarEvolucion();
          } else {
            _vm.consultasEvo();
          }
        })
        .catch((err) => {
          loader('hide');
          CON851('', 'Error validando evolucion: ', null, 'error', 'Error');
          console.error('Error validarEvolucion: ', err);
          this.datoMinutosControl();
        });
    },
    async consultarPesoEvoluciones() {
      var arrayEvo = [],
        dataEvo = [],
        llaveHc = null,
        operElab = null,
        medicoEvo = null,
        fechaEvo = null,
        horaEvo = null;
      var ArrayEscalaPeso = [];
      return new Promise(async (resolve) => {
        arrayEvo = await _vm.obtenerArrayEvo();
        llaveHc = `${$_REG_HC.llave_hc}|`;
        arrayEvo = arrayEvo.filter((e) => e.FECHA_EVO == _vm.fechaEvo);

        for (let evolucion of arrayEvo) {
          loader('show');
          operElab = `${evolucion.OPER_ELAB_EVO}|`;
          medicoEvo = `${evolucion.MEDICO_EVO}|`;
          fechaEvo = `${evolucion.FECHA_EVO}|`;
          horaEvo = `${evolucion.HORA_EVO}|`;

          const dataEnv = `${datosEnvio()}${llaveHc}${operElab}${medicoEvo}${fechaEvo}${horaEvo}CONS|`;

          dataEvo = await _vm.obtenerDataEvo(dataEnv);
          const dataEscalaPeso = [dataEvo['SIGNOS_VITALES'].PESO || 0, dataEvo['PESO_NEW'] || 0];
          const fechaHora = fechaEvo + horaEvo;
          let pesoEvo = 0;
          pesoEvo = dataEscalaPeso.find((x) => x > 0);
          ArrayEscalaPeso.push({
            peso: pesoEvo,
            fecha: dataEvo['FECHA_EVO'],
            hora: dataEvo['HORA_EVO'],
            fechaHora: fechaHora,
          });
          // ArrayEscalaPeso.length > 1 ? ArrayEscalaPeso.shift() : ArrayEscalaPeso;
        }
        loader('hide');
        resolve(ArrayEscalaPeso);
      });
    },
    async obtenerArrayEvo() {
      loader('show');
      var evoluciones = null;
      let codPaci = `${$_REG_PACI['COD']}|`;
      let folio = `${$_REG_HC['suc_folio_hc']}${$_REG_HC['nro_folio_hc']}|`;

      let dataEnv = [datosEnvio(), codPaci, folio, '2|'].join('');
      return new Promise(async (resolve) => {
        var url = get_url('app/HICLIN/HC705B.DLL');
        await postData({datosh: dataEnv}, url)
          .then(function (data) {
            evoluciones = data.EVOLUCIONES;
            evoluciones.length > 1 ? evoluciones.pop() : (evoluciones = evoluciones.reverse());
          })
          .catch((err) => {
            console.log(err, 'error al consultar Array Evoluciones');
            loader('hide');
            _vm.terminarEjecucion();
          });
        resolve(evoluciones);
      });
    },
    async obtenerDataEvo(dataEnv) {
      var evolucion;
      return new Promise(async (resolve) => {
        var url = get_url('app/HICLIN/HC002.DLL');
        await postData({datosh: dataEnv}, url)
          .then(function (data) {
            evolucion = data['EVOLUCION'][0];
          })
          .catch((err) => {
            const msj = `${err} error al consultar data Evolucion ${evolucion.LLAVE_EVO}`;
            console.log(msj);
          });
        resolve(evolucion);
      });
    },
    calcularGastoUrinario(tabla) {
      console.log({tabla});
      let [arrayTotalesOrina, gastoUrinario, peso] = [[], 0, parseFloat(_vm.control.peso)];
      for (let control of tabla) arrayTotalesOrina.push(parseInt(control.eliminados['orina']) || 0);

      let acumVolumenOrina = arrayTotalesOrina.reduce((a, b) => a + b, 0);
      let volumenOrina = parseFloat(acumVolumenOrina);
      gastoUrinario = volumenOrina / peso;

      if (_vm.fecha_act == _vm.fechaIni) {
        gastoUrinario = volumenOrina / peso;
        gastoUrinario /= parseInt(_vm.hora_act.substr(0, 2)) - 7;
      } else {
        gastoUrinario = volumenOrina / peso;
        gastoUrinario /= 24;
      }

      console.log({
        arrayTotalesOrina,
        acumVolumenOrina,
        gastoUrinario: parseFloat(gastoUrinario),
        swFecha: _vm.fecha_act == _vm.fechaIni,
      });
      const calculo = isNaN(gastoUrinario) == true ? 0 : gastoUrinario;
      return parseFloat(calculo.toFixed(2));
    },
    async consultasEvo() {
      await _vm.traerPeso();
    },
    async traerPeso() {
      var peso,
        ArrayEscalaPeso,
        pesoControles = [{peso: 0, fecha: 0, hora: 0}],
        pesoEvo = [],
        arrayPesos = [];

      ArrayEscalaPeso = async function () {
        return await _vm.consultarPesoEvoluciones();
      };

      let tabla = _vm.tabla_controles;
      tabla = tabla.length > 0 ? tabla : [{peso: 0, fecha: 0, hora: 0}];
      tabla = tabla.filter((t) => t.fecha == _vm.fechaEvo);

      let consultaPeso = '';
      await ArrayEscalaPeso().then((data) => {
        consultaPeso = data;
        pesoEvo = consultaPeso.filter((p) => p.fecha == _vm.fechaEvo) || [
          {peso: 0, fecha: 0, hora: 0},
        ];
        pesoControles = tabla.length == 0 ? [{peso: 0, fecha: 0, hora: 0}] : tabla;

        arrayPesos = pesoEvo.concat(pesoControles);

        _vm.sw_primer = tabla.length == 0 ? true : false;

        arrayPesos = arrayPesos.find((x) => x.peso > 0);

        arrayPesos = arrayPesos || {peso: 0};
        peso = arrayPesos.peso;
        peso = peso || 0;
        _vm.control.peso = peso;

        console.log(arrayPesos, peso, _vm.sw_primer);

        if (_vm.sw_primer) {
          loader('hide');
          _vm.sw_peso = true;
          _vm.datoPeso();
        } else {
          loader('hide');
          if (peso == 0) {
            _vm.sw_peso = true;
            _vm.datoPeso();
          } else {
            _vm.sw_peso = false;
            setTimeout(_vm.datoAdministradosOral, 50);
          }
        }
      });
    },
    validarEntradasControl() {
      let [totalEliminados, totalAdministrados] = [
        parseInt(_vm.control.eliminados.total),
        parseInt(_vm.control.administrados.total),
      ];
      let balance = parseInt(totalAdministrados) - parseInt(totalEliminados);
      _vm.control.balance = balance;
      return balance != NaN ? balance : 0;
    },
    async continuarControl() {
      if (localStorage.idOpciondata != '07C6') await _vm.consultasEvo();
      else {
        _vm.ventanaOpcionesImp();
      }
    },
    filtrarControles(jsonTablaControles) {
      let jsonFiltrado = [];
      let fechaPrn = _vm.fechaIni;
      for (let control of jsonTablaControles) {
        if (parseInt(fechaPrn) == parseInt(control.fecha)) jsonFiltrado.push(control);
      }
      return jsonFiltrado;
    },
    inicializarProceso() {
      _vm.original_data = this;
      _vm.admin_w = _vm.oper_elab = localStorage.Usuario;
      _vm.nit_usu = $_USUA_GLOBAL[0].NIT;
      _vm.fecha_act = _vm.fecha_evo.completa = moment().format('YYYYMMDD');
      _vm.anio_act = moment().format('YYYY');
      _vm.mes_act = moment().format('MM');
      _vm.dia_act = moment().format('DD');
      _vm.llave_hc = $_REG_HC.llave_hc;
      _vm.llave_w = _vm.llave_paci_w = $_REG_PACI.COD;
      _vm.hora_evo = {
        hora: _vm.hora_act.substring(0, 2),
        min: _vm.hora_act.substring(2, 4),
        completa: _vm.hora_act,
      };
      let control = {
        anio: _vm.anio_act,
        mes: _vm.mes_act,
        dia: _vm.dia_act,
        hora: _vm.hora_act.substring(0, 2),
        min: _vm.hora_act.substring(2, 4),
        fecha: _vm.fecha_act,
        administrados: {
          oral: '',
          venosa: '',
          otros: '',
          total: '',
        },
        peso: '',
        eliminados: {
          orina: '',
          darrea: '',
          sng: '',
          otros: '',
          total: '',
        },
        observaciones: '',
        balance: '',
        gasto_urinario: '',
      };
      _vm.control = control;
    },
    async ordenImprimir() {
      setTimeout(_vm.confirmarImpresion, 300);
    },
    terminarEjecucion() {
      delete _vm.data;
      _vm.data = _vm.original_data;
      _regresar_menuhis();
    },
  },
});
