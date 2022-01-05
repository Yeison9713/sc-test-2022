/** @format */

'use strict';
/**
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Procesos de enfermería - Test aldrete.
 * @date       03/05/2020. CREACION
 */
/* GLOSARIO:{
    SaO2: (La saturación de oxígeno en sangre)
}*/
var _vm;
new Vue({
  el: '#HC528',
  data: {
    indice: 1,
    medico: { cod: '', descripcion: '', especialidad: '' },
    unserv: '',
    folio: '',
    nit_usu: '',
    fecha_act: '',
    anio_act: '',
    mes_act: '',
    dia_act: '',
    get hora_act() {
      return moment().format('HHmm');
    },
    llave_hc: '',
    admin_w: '',
    llave_w: '',
    fecha_evo: { anio: '', mes: '', dia: '', completa: '' },
    hora_evo: { hora: '', min: '', completa: '' },
    anoFin: '',
    mesFin: '',
    diaFin: '',
    anoIni: '',
    mesIni: '',
    diaIni: '',
    total: '',
    unidades_servicio: [],
    tabla_controles: [],
    profesionales: [],
    fechas_evo: [],
    ciudades: [],
    hcprc: [],
    original_data: {},
    salir: !1,
    bandera: !1,
    actividad: { inferiores: [0], superiores: [0] },
    textos: {
      color: '',
      conciencia: '',
      ventilacion: '',
    },
    sw: { fin: !1, prn: !1 },
    control: inicializarControl(),
    array_popups: llenarPopUps(),
  },
  async created() {
    console.clear();
    $('#nombreOpcion').remove();
    localStorage.idOpciondata != '07C8'
      ? nombreOpcion('5-2-8 - Test Aldrete.')
      : nombreOpcion('7-C-8 - Reimpresión test aldrete.');

    _inputControl('disabled');
    _inputControl('reset');

    _vm = this;
    _vm.iniciarProcesoEnfer();
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
  },
  methods: {
    devolverFecha(fecha) {
      return [
        fecha ? parseInt(fecha.substring(0, 4)) : '',
        fecha ? parseInt(fecha.substring(4, 6)).toString().padStart(2, '0') : '',
        fecha ? parseInt(fecha.substring(6, 8)).toString().padStart(2, '0') : '',
      ];
    },
    validarFecha(t, f = parseInt(f) || 0) {
      const now = new Date();
      const check_fecha =
        f != 0 ? [String(f).substring(0, 4), String(f).substring(4, 6), String(f).substring(6, 8)] : ['0000', '00', '00'];
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
      const { und_edad, val_edad } = {
        und_edad: $_REG_HC.edad_hc.unid_edad,
        val_edad: $_REG_HC.edad_hc.vlr_edad,
      };
      _vm.unid_edad_hc_w = { D: 1, M: '2', A: 3 }[und_edad] || 0;
      _vm.vlr_edad_hc_w = val_edad;

      let profesional = _vm.profesionales.find((p) => parseInt(p.IDENTIFICACION) == parseInt(localStorage.IDUSU)) || 0;

      profesional
        ? ((_vm.medico.cod = new Intl.NumberFormat('ja-JP').format(profesional.IDENTIFICACION)),
          (_vm.medico.descripcion = profesional.NOMBRE.replace(/\�/g, 'Ñ')),
          (_vm.medico.especialidad = `${profesional.ATIENDE_PROF}.${consult_atiendProf(profesional.ATIENDE_PROF)}`))
        : (_vm.terminarEjecucion(), CON851('9X', '9X', null, 'error', 'error'));

      let unserv = _vm.unidades_servicio.find((o) => parseInt(o.COD) == parseInt(_vm._hcprc.cierre.unserv));
      _vm.unserv_descrip = '' != unserv.COD.trim() ? unserv.DESCRIP : 'UNSERV INEXISTENTE';
      _vm.unserv_cod = '' != unserv.COD.trim() ? unserv.COD : '**';
      _vm.unserv = `${_vm.unserv_cod}-${_vm.unserv_descrip}`;
      _vm.folio = `${$_REG_HC.llave_hc.substr(15, 2)}${$_REG_HC.llave_hc.substr(17, 6)}`;
      try {
        [_vm.fecha_evo.anio, _vm.fecha_evo.mes, _vm.fecha_evo.dia] = [_vm.control.anio, _vm.control.mes, _vm.control.dia] =
          await _vm.devolverFecha(_vm.fecha_evo.completa);

        await _vm.llenarTablaControles();
        localStorage.idOpciondata != '07C8'
          ? setTimeout(_vm.ventanaUnserv, 400)
          : ((_vm.unserv = `${_vm.unserv_cod}.${_vm.unserv_descrip}`),
            setTimeout(() => _vm.confirmarImpresion()),
            $('#inputs-tabla').hide(),
            $('#opciones').hide());
      } catch (e) {
        console.error('error' + e);
        vm.terminarEjecucion();
      }
    },
    datoUnidad(data) {
      // 04 - Cirugía
      let unserv_activa = ['04'];
      [_vm.unserv_cod, _vm.unserv_descrip] = [data.COD, data.DESCRIP.trim()];
      _vm.unserv = `${_vm.unserv_cod}.${_vm.unserv_descrip}`;
      data.ESTADO == 'N'
        ? (CON851('13', '13', null, 'error', 'error'), setTimeout(() => _vm.ventanaUnserv(), 400))
        : unserv_activa.includes(data.COD)
        ? _vm.datoMinutosControl()
        : (CON851('B1', 'B1', null, 'error', 'error'), setTimeout(() => _vm.ventanaUnserv(), 400));
    },
    async llenarTablaControles() {
      _vm.tabla_controles = [];
      let [controles, llave_hc] = [_vm.tabla_controles, _vm.llave_hc];
      await postData({ datosh: `${datosEnvio()}${llave_hc}| ` }, get_url('APP/HICLIN/HC528.DLL'))
        .then(function (data) {
          let evo = data.EVO_ALDRETE;
          evo.length > 1 ? evo.pop() : (evo = evo.reverse());

          for (const i in evo) {
            const color = _vm.array_popups.color.find((color) => parseInt(color.COD) == evo[i].COLOR);
            const conciencia = _vm.array_popups.conciencia.find(
              (conciencia) => parseInt(conciencia.COD) == evo[i].CONCIENCIA,
            );
            const ventilacion = _vm.array_popups.ventilacion.find(
              (ventilacion) => parseInt(ventilacion.COD) == evo[i].VENTILACION,
            );
            let fecha = evo[i].FECHA || '00000000';
            if (parseInt(fecha) != 0) {
              controles.push({
                item: parseInt(i) + 1,
                fecha: evo[i].FECHA,
                anio: _vm.devolverFecha(evo[i].FECHA)[0] || '0000',
                mes: _vm.devolverFecha(evo[i].FECHA)[1] || '00',
                dia: _vm.devolverFecha(evo[i].FECHA)[2] || '00',
                hora: evo[i].HORA.substring(0, 2) || '00',
                min: evo[i].HORA.substring(2, 4) || '00',
                oper: evo[i].OPER_ELAB,
                actividad: {
                  brazoizq: evo[i]['ACTIVIDAD'].BRIZ,
                  piernaizq: evo[i]['ACTIVIDAD'].PNAIZ,
                  brazoder: evo[i]['ACTIVIDAD'].BRDER,
                  piernader: evo[i]['ACTIVIDAD'].PNDER,
                  puntaje: evo[i]['ACTIVIDAD'].PUNTAJE,
                },
                ventilacion: evo[i].VENTILACION,
                excitacion: evo[i].EXCITACION,
                conciencia: evo[i].CONCIENCIA,
                color: evo[i].COLOR,
                observaciones: evo[i].OBSERVACION,
                escalofrios: evo[i].ESCALOFRIO,
                oper_nombre: evo[i].NOMBRE_OPER,
                total: evo[i].TOTAL || 0,
                textos: {
                  ventilacion: ventilacion ? ventilacion['DESCRIP'] : '',
                  conciencia: conciencia ? conciencia['DESCRIP'] : '',
                  color: color ? color['DESCRIP'] : '',
                },
              });
            }
          }
          _vm.indice = _vm.indice < 1 ? 1 : parseInt(evo.length) + 1;
          _vm.tabla_controles = controles;

          var tabla = _vm.tabla_controles;
          tabla = tabla.map((t) => t.item).reverse();
          let i = 0;
          for (i; i < _vm.tabla_controles.length; i++) _vm.tabla_controles[i].item = tabla[i];
          _vm.indice = _vm.indice < 1 ? 1 : parseInt(_vm.tabla_controles.length) + 1;
        })
        .catch((e) => (CON851(e, 'Error trayendo datos', null, 'error', 'error'), _vm.terminarEjecucion));
    },
    datoAnioControl() {
      validarInputs(
        {
          form: '#dato_anio_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoAnioControl, this.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {this.terminarEjecucion()},
        () => {
          const anio = this.control.anio || 0;
          this.validarFecha('anio', anio)
            ? this.datoMesControl()
            : (CON851('37', '37', null, 'error', 'error'), this.datoAnioControl());
        },
      );
    },
    datoMesControl() {
      validarInputs(
        {
          form: '#dato_mes_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoAnioControl, this.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {this.datoAnioControl()},
        () => {
          const mes = this.control.mes || 0;
          this.validarFecha('mes', mes)
            ? this.datoDiaControl()
            : (CON851('37', '37', null, 'error', 'error'), this.datoAnioControl());
        },
      );
    },
    datoDiaControl() {
      validarInputs(
        {
          form: '#dato_dia_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoDiaControl, this.terminarEjecucion);
          },
          event_f11: _vm.ordenImprimir,
        },
        () => {_vm.datoMesControl()},
        () => {
          this.control.fecha = [this.control.anio, this.control.mes, this.control.dia].join('');
          const dia = this.control.dia || 0,
            fecha = Number(this.control.fecha) || '00000000';
          if (this.validarFecha('dia', dia) && this.validarFecha('fin', fecha)) {
            this.datoHoraControl();
          } else {
            CON851('37', '37', null, 'error', 'error'), this.datoAnioControl();
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
          const [fecha_control, fecha_act] = [`${this.control.anio}${this.control.mes}${this.control.dia}`, this.fecha_act];
          if (hora < 0 || hora > 23 || (parseInt(fecha_control) == parseInt(fecha_act) && hora > this.hora_act)) {
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
          const [fecha_control, fecha_act] = [`${this.control.anio}${this.control.mes}${this.control.dia}`, this.fecha_act];
          if (minuto < 0 || minuto > 59 || parseInt(fecha_control + hora) > parseInt(fecha_act + this.hora_act)) {
            CON851('9Q', '9Q', null, 'warning', 'Advertencia');
            this.datoHoraControl();
          } else {
            _vm.control['peso'] = _vm.control['peso'] || 0;
            (_vm.capturar_peso = true), _vm.comprobarEvolucion();
          }
        },
      );
    },
    datoConciencia() {
      const [seleccion, t, e] = [_vm.control.conciencia, 'Nivel de conciencia', _vm.array_popups.conciencia];
      POPUP(
        {
          array: e,
          titulo: t,
          indices: [{ id: 'COD', label: 'DESCRIP' }],
          seleccion: seleccion,
          teclaAlterna: true,
          callback_f: () => _vm.datoMinutosControl(),
        },
        function (data) {
          _vm.control.conciencia = data.COD;
          _vm.textos.conciencia = data.DESCRIP;
          setTimeout(() => _vm.datoColor(), 300);
        },
      );
    },
    datoColor() {
      const [seleccion, t, e] = [_vm.control.color, 'Color piel', _vm.array_popups.color];
      POPUP(
        {
          array: e,
          titulo: t,
          indices: [{ id: 'COD', label: 'DESCRIP' }],
          seleccion: seleccion,
          teclaAlterna: true,
          callback_f: () => setTimeout(() => _vm.datoConciencia(), 300),
        },
        function (data) {
          _vm.control.color = data.COD;
          _vm.textos.color = data.DESCRIP;
          setTimeout(() => {
            _vm.datoActividad();
          }, 300);
        },
      );
    },
    datoActividad() {
      setTimeout(() => _vm.datoExtremidadesSuperiores('brazoder'), 300);
    },
    async datoExtremidadesSuperiores(brazo) {
      const brazoder = function () {
        const [seleccion, t, e] = [
          _vm.control.actividad.brazoder,
          'Mueve brazo derecho',
          [
            { COD: 'S', DESCRIP: 'SI' },
            { COD: 'N', DESCRIP: 'NO' },
          ],
        ];
        POPUP(
          {
            array: e,
            titulo: t,
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            teclaAlterna: true,
            callback_f: () => setTimeout(() => _vm.datoColor(), 300),
          },
          function (data) {
            _vm.control.actividad.brazoder = data.COD;
            setTimeout(() => _vm.datoExtremidadesSuperiores('brazoizq'), 300);
          },
        );
      };
      const brazoizq = function () {
        const [seleccion, t, e] = [
          _vm.control.actividad.brazoizq,
          'Mueve brazo izquierdo',
          [
            { COD: 'S', DESCRIP: 'SI' },
            { COD: 'N', DESCRIP: 'NO' },
          ],
        ];
        POPUP(
          {
            array: e,
            titulo: t,
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            teclaAlterna: true,
            callback_f: () => setTimeout(() => _vm.datoExtremidadesSuperiores('brazoder'), 300),
          },
          function (data) {
            _vm.control.actividad.brazoizq = data.COD;
            setTimeout(() => _vm.datoExtremidadesInferiores('piernader'), 300);
          },
        );
      };
      eval(brazo)();
    },
    datoExtremidadesInferiores(pierna) {
      const piernader = function () {
        const [seleccion, t, e] = [
          _vm.control.actividad.piernader,
          'Mueve pierna derecha',
          [
            { COD: 'S', DESCRIP: 'SI' },
            { COD: 'N', DESCRIP: 'NO' },
          ],
        ];
        POPUP(
          {
            array: e,
            titulo: t,
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            teclaAlterna: true,
            callback_f: () => setTimeout(() => _vm.datoExtremidadesSuperiores('brazoizq'), 300),
          },
          function (data) {
            _vm.control.actividad.piernader = data.COD;
            setTimeout(() => _vm.datoExtremidadesInferiores('piernaizq'), 300);
          },
        );
      };
      const piernaizq = function () {
        const [seleccion, t, e] = [
          _vm.control.actividad.piernaizq,
          'Mueve pierna izquierda',
          [
            { COD: 'S', DESCRIP: 'SI' },
            { COD: 'N', DESCRIP: 'NO' },
          ],
        ];
        POPUP(
          {
            array: e,
            titulo: t,
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            teclaAlterna: true,
            callback_f: () => setTimeout(() => _vm.datoExtremidadesInferiores('piernader'), 300),
          },
          function (data) {
            _vm.control.actividad.piernaizq = data.COD;
            _vm.puntajeActividad();
            setTimeout(() => _vm.datoEscalofrios(), 300);
          },
        );
      };
      eval(pierna)();
    },
    puntajeActividad() {
      const actividad = _vm.control.actividad || {};

      const brazo = {
        derecha: actividad['brazoder'] == 'S' ? 2 : 1,
        izquierda: actividad['brazoizq'] == 'S' ? 2 : 1,
      };

      const pierna = {
        derecha: actividad['piernader'] == 'S' ? 2 : 1,
        izquierda: actividad['piernaizq'] == 'S' ? 2 : 1,
      };

      const total = Object.values(brazo)
        .concat(Object.values(pierna))
        .reduce((a, b) => Number(a) + Number(b));

      _vm.control.actividad.puntaje = Number(total) >= 2 ? 2 : 1;
    },
    datoEscalofrios() {
      const [seleccion, t, e] = [
        _vm.control.escalofrios,
        'Escalofrios',
        [
          { COD: 'S', DESCRIP: 'SI' },
          { COD: 'N', DESCRIP: 'NO' },
        ],
      ];
      POPUP(
        {
          array: e,
          titulo: t,
          indices: [{ id: 'COD', label: 'DESCRIP' }],
          seleccion: seleccion,
          teclaAlterna: true,
          callback_f: () => setTimeout(() => _vm.datoExtremidadesInferiores('piernaizq'), 300),
        },
        function (data) {
          _vm.control.escalofrios = data.COD;
          setTimeout(() => _vm.datoExcitacion(), 300);
        },
      );
    },
    datoExcitacion() {
      const [seleccion, t, e] = [
        _vm.control.excitacion,
        'Excitacion',
        [
          { COD: 'S', DESCRIP: 'SI' },
          { COD: 'N', DESCRIP: 'NO' },
        ],
      ];
      POPUP(
        {
          array: e,
          titulo: t,
          indices: [{ id: 'COD', label: 'DESCRIP' }],
          seleccion: seleccion,
          teclaAlterna: true,
          callback_f: () => setTimeout(() => _vm.datoEscalofrios(), 300),
        },
        function (data) {
          _vm.control.excitacion = data.COD;
          setTimeout(() => _vm.datoVentilacion(), 300);
        },
      );
    },
    datoVentilacion() {
      const [seleccion, t, e] = [_vm.control.ventilacion, 'ventilación', _vm.array_popups.ventilacion];
      POPUP(
        {
          array: e,
          titulo: t,
          indices: [{ id: 'COD', label: 'DESCRIP' }],
          seleccion: seleccion,
          teclaAlterna: true,
          callback_f: () => setTimeout(() => _vm.datoExcitacion(), 300),
        },
        function (data) {
          _vm.control.ventilacion = data.COD;
          _vm.textos.ventilacion = data.DESCRIP;
          _vm.sw.fin = true;
          setTimeout(() => {
            _vm.datoObservacion();
          }, 300);
        },
      );
    },
    datoObservacion() {
      validarInputs(
        {
          form: '#dato_observaciones',
          orden: '1',
          event_f3: () => {
            _vm.control.observaciones = _reemplazoEnterXCarac(_vm.control.observaciones);
            _vm.sw.fin = false;
            setTimeout(() => {
              _vm.confirmar();
            }, 300);
          },
        },
        () => {
          _vm.sw.fin = false;
          setTimeout(() => {
            _vm.datoVentilacion();
          }, 300);
        },
        () => {
          setTimeout(() => _vm.puntajeEscala(), 200);
          _vm.sw.fin = false;
          _vm.confirmar();
        },
      );
    },
    puntajeEscala() {
      var total_escala = 0;
      const puntaje_actividad = parseInt(_vm.control['actividad'].puntaje);
      console.log({ control: _vm.control });
      const datos = [
        _vm.control.conciencia == 'S' ? 2 : 1,
        _vm.control.color == 'S' ? 2 : 1,
        _vm.control.escalofrios == 'S' ? 1 : 2,
        _vm.control.excitacion == 'S' ? 2 : 1,
        parseInt(_vm.control.ventilacion) <= 2 ? 2 : 1,
      ];
      total_escala = datos.reduce((a, b) => a + b);
      _vm.control.total = parseInt(total_escala) + parseInt(puntaje_actividad);
    },
    ventanaOpcionesImp() {
      _vm.sw.prn = true;
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
      setTimeout(eval(enter_input[t]), 100);
    },
    datoAnioRangoIni() {
      validarInputs(
        {
          form: '#dato_anio_ini',
          orden: '1',
        },
        () => {
          _vm.sw.prn = false;
          setTimeout(_vm.confirmarImpresion, 300);
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
        () => _vm.validarFechaIni('y'),
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
        () => _vm.validarFechaIni('m'),
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
    async grabarRegistros() {
      let [data, edad, control] = [{}, $_REG_HC.edad_hc.unid_edad + cerosIzq($_REG_HC.edad_hc.vlr_edad, 3), _vm.control];
      data = {
        datosh: datosEnvio(),
        llave_evo: _vm.llaveEvo,
        medico: cerosIzq(_vm.medico.cod.replace(/\,/g, '').trim(), 10),
        unserv: _vm.unserv_cod || '    ',
        edad: edad,
        hab: _vm._hcprc.cierre.hab || ' ',
        brazoizq: control.actividad.brazoizq,
        brazoder: control.actividad.brazoder,
        piernaizq: control.actividad.piernaizq,
        piernader: control.actividad.piernader,
        puntaje: control.total,
        conciencia: control.conciencia,
        color: control.color,
        escalofrios: control.escalofrios || 'S',
        excitacion: control.excitacion || 'S',
        ventilacion: control.ventilacion,
        observaciones: control.observaciones,
      };

      console.log('datos_guardado', data);
      try {
        if (await _vm.envioRegistros(data)) {
          toastr.success('Guardado correctamente');
          _vm.data = _vm.original_data;
          _vm.AdicionarRegistros();
        } else {
          toastr.error('Error en guardado');
          _vm.terminarEjecucion();
        }
      } catch (e) {
        console.error('error' + e);
        _vm.terminarEjecucion();
      }
    },
    envioRegistros(data) {
      return new Promise(async (resolve, reject) => {
        await postData(data, get_url('app/HICLIN/HC528-1.DLL'))
          .then((data) => (data.trim() == '1' ? resolve(true) : reject(false)))
          .catch((err) => {
            toastr.error('Error en guardado', err);
            loader('hide');
            _vm.terminarEjecucion();
          });
      });
    },
    async llamarImpresion() {
      var datos = { paciente: {} };

      await postData({ datosh: datosEnvio() }, get_url('app/CONTAB/CON809.DLL'))
        .then((data) => {
          _vm.ciudades = data.CIUDAD;
          const ciudadPaci = $_REG_PACI.CIUDAD.trim();
          const ciudad = _vm.ciudades.find((c) => c.COD.trim() == ciudadPaci);
          datos.paciente['municipio'] = ciudad.NOMBRE.replace(/\s+/g, ' ');
        })
        .catch((err) => console.log(err, 'error'));

      try {
        loader('show');
        _vm.tabla_controles = [];
        await _vm.llenarTablaControles();
        datos.titulo = 'TEST ALDRETE';
        datos.paciente['fecha'] = datos.fecha = moment(_vm._hcprc.fecha).format('YYYY/MM/DD');
        datos.paciente['hora'] = datos.hora = moment(_vm._hcprc.hora).format('HH:mm');
        datos.paciente['tipoId'] = $_REG_PACI['TIPO-ID'];
        datos.paciente['nombre'] = $_REG_PACI.DESCRIP.replace(/\s+/g, ' ');
        datos.paciente['edad'] = _vm._hcprc.edad;
        datos.paciente['telefono'] = $_REG_PACI.TELEFONO;
        datos.paciente['unserv'] = _vm.unserv_descrip;
        datos.paciente['folio'] = _vm.folio;
        datos.paciente['fact'] = _vm._hcprc.cierre.prefijo + _vm._hcprc.cierre.nro_fact;
        isNaN($_REG_PACI.COD) == true
          ? (datos.paciente['id'] = $_REG_PACI.COD)
          : (datos.paciente['id'] = new Intl.NumberFormat('ja-JP').format($_REG_PACI.COD));
        $_REG_PACI.SEXO == 'F' ? (datos.paciente['sexo'] = 'Femenino') : (datos.paciente['sexo'] = 'Masculino');

        // filtro controles
        datos.controles = [];
        datos.controles = _vm.filtrarControles(_vm.tabla_controles).slice().reverse();

        let msj = 'No se encontraron controles en el rango de fechas';
        if (datos.controles == [] || datos.controles == '') {
          setTimeout(() => toastr.warning(msj), 100);
          loader('hide');
          _vm.validarFechaIni('y');
        } else if (_vm.bandera == false) await _vm.enviarImpresion(datos);
      } catch (e) {
        console.error('error' + e);
        _vm.terminarEjecucion();
      }
    },
    filtrarControles(jsonTablaControles) {
      let [jsonFiltrado, _vm] = [[], this];
      let fechaPrn = [_vm.fechaIni.substr(0, 4), _vm.fechaIni.substr(4, 2), _vm.fechaIni.substr(6, 2)].join(',');
      fechaPrn = new Date(fechaPrn);
      let filtro = {
        ultimas24Horas: (dt1) => {
          var diff = (fechaPrn.getTime() - dt1.getTime()) / 1000;
          diff /= 60 * 60;
          return Math.abs(Math.round(diff));
        },
      };
      for (let control of jsonTablaControles) {
        control.fecha = [control.fecha.substr(0, 4), control.fecha.substr(4, 2), control.fecha.substr(6, 2)].join(',');
        const dt1 = new Date(control.fecha);
        const [diffHrs] = [filtro.ultimas24Horas(dt1)];
        if (diffHrs <= 24) jsonFiltrado.push(control);
      }
      return jsonFiltrado;
    },
    async enviarImpresion(datos) {
      let opciones = {
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
        content: await _imprimirHC528(datos),
      };
      _vm.bandera = true;
      _impresion2(opciones)
        .then((data) => setTimeout(() => _vm.terminarEjecucion(), 400))
        .catch((err) => {
          console.error(err);
        });
    },
    cargarHistoriaPaciente() {
      console.log('cargando historia');
      postData(
        {
          datosh: datosEnvio() + _vm.llave_hc + '|' + localStorage.Usuario.trim() + '|1|',
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
          loader('hide'), _vm.terminarEjecucion();
        });
    },
    cargarProfesionales() {
      console.log('cargando profesionales');
      postData({ datosh: datosEnvio() }, get_url('APP/SALUD/SER819.DLL')).then((data) => {
        let profesionales = (_vm.profesionales = data.ARCHPROF);
        profesionales.length > 1 ? profesionales.pop() : (profesionales = profesionales);
        _vm.cargarUnidadesServicio();
      });
      // .catch((err) => { CON851("", "Error trayendo datos", null, "error", "error"), loader("hide"), _regresar_menuhis(); });
    },
    cargarUnidadesServicio() {
      console.log('cargando unidades de servicio');
      postData({ datosh: datosEnvio() }, get_url('APP/SALUD/SER873.DLL')).then((data) => {
        _vm.unidades_servicio = data.UNSERV;
        _vm.unidades_servicio.length > 1 ? _vm.unidades_servicio.pop() : _vm.unidades_servicio;
        loader('hide');
        _vm.llenarFormulario();
      });
      // .catch(() => { CON851("", "Error trayendo datos", null, "error", "error"), loader("hide"), _regresar_menuhis(); });
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
    AdicionarRegistros() {
      CON851P(
        '14',
        () => {
          setTimeout(() => {
            _vm.confirmarImpresion();
          }, 500);
        },
        () => {
          setTimeout(() => {
            _vm.inicializarProceso();
            _vm.llenarTablaControles();
            _vm.llenarFormulario();
          }, 500);
        },
      );
    },
    confirmarImpresion() {
      CON851P(
        '00',
        () => _vm.terminarEjecucion(),
        () => {
          setTimeout(() => {
            _vm.ventanaOpcionesImp();
          }, 300);
        },
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
    inicializarProceso() {
      _vm.original_data = this;

      _vm.original_data.control = inicializarControl();

      [_vm.admin_w = _vm.oper_elab, _vm.nit_usu] = [localStorage.Usuario, $_USUA_GLOBAL[0].NIT];

      [_vm.fecha_act, _vm.anio_act, _vm.mes_act, _vm.dia_act] = [
        (_vm.fecha_evo.completa = moment().format('YYYYMMDD')),
        moment().format('YYYY'),
        moment().format('MM'),
        moment().format('DD'),
      ];

      _vm.fecha_act = _vm.fecha_evo.completa = moment().format('YYYYMMDD');

      [_vm.anio_act, _vm.mes_act, _vm.dia_act] = moment().format('YYYY-MM-DD').split('-');

      _vm.hora_evo = {
        hora: _vm.hora_act.substring(0, 2),
        min: _vm.hora_act.substring(2, 4),
        completa: _vm.hora_act,
      };

      [_vm.llave_w, _vm.llave_hc] = [$_REG_PACI.COD, $_REG_HC.llave_hc];

      for (let key of ['conciencia', 'ventilacion', 'excitacion', 'escalofrios', 'color']) _vm.control[key] = '';
      _vm.control['actividad'] = {
        brazoizq: '',
        piernaizq: '',
        brazoder: '',
        piernader: '',
      };
      [_vm.control.anio, _vm.control.mes, _vm.control.dia] = [_vm.anio_act, _vm.mes_act, _vm.dia_act];
      [_vm.control.hora, _vm.control.min] = [_vm.hora_act.substring(0, 2), _vm.hora_act.substring(2, 4)];
    },
    comprobarEvolucion() {
      loader('show');
      postData({ datosh: datosEnvio() + _vm.llaveEvo + '|' }, get_url('APP/HICLIN/HC522-2.DLL'))
        .then((data) => {
          loader('hide');
          if ('8' == data) {
            [_vm.control.anio, _vm.control.mes, _vm.control.dia, _vm.control.hora, _vm.control.minutos] = moment(
              _vm.fechaHora,
            )
              .add(1, 'm')
              .format('YYYY-MM-DD-HH-mm')
              .split('-');

            _vm.comprobarEvolucion();
          } else {
            setTimeout(_vm.datoConciencia, 300);
          }
        })
        .catch((err) => {
          loader('hide');
          CON851('', 'Error validando evolucion: ', null, 'error', 'Error');
          console.error('Error validarEvolucion: ', err);
          _vm.datoMinutosControl();
        });
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

function llenarPopUps() {
  return {
    syn: [
      { COD: 'S', DESCRIP: 'SI' },
      { COD: 'N', DESCRIP: 'NO' },
    ],
    conciencia: [
      { COD: '1', DESCRIP: 'SIN RESPUESTA' },
      { COD: '2', DESCRIP: 'SOMNOLIENTO' },
      { COD: '3', DESCRIP: 'DESPIERTO' },
    ],
    ventilacion: [
      { COD: '1', DESCRIP: 'APNEA' },
      { COD: '2', DESCRIP: 'DIF.RESPIRATORIA' },
      { COD: '3', DESCRIP: 'VENT.RITMICA' },
      { COD: '4', DESCRIP: 'Sa - O2' },
    ],
    color: [
      { COD: '1', DESCRIP: 'ROSADO' },
      { COD: '2', DESCRIP: 'PALIDO' },
      { COD: '3', DESCRIP: 'CIANOTICO' },
    ],
  };
}

function inicializarControl() {
  return {
    item: '1',
    fecha: '',
    anio: '',
    mes: '',
    dia: '',
    hora: '',
    min: '',
    color: '',
    ventilacion: '',
    conciencia: '',
    excitacion: '',
    escalofrios: '',
    actividad: {
      brazoizq: 'S',
      piernaizq: 'S',
      brazoder: 'S',
      piernader: 'S',
      puntaje: 0,
    },
    total: 0,
    textos: {
      ventilacion: '',
      conciencia: '',
      color: '',
    },
    observaciones: '',
    oper: localStorage['Usuario'],
    oper_nombre: localStorage['Nombre'],
  };
}

function devolverSN(val) {
  return val.toUpperCase() == 'S' && isNaN(val) ? 'S' : 'N';
}
