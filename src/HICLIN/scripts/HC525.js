/** @format */

'use strict';
/**
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Procesos de enfermería - Control neurológico.
 * @date       12/04/2020. CREACION
 */
new Vue({
  el: '#HC525',
  data: {
    indice: 1,
    medico: {cod: '', descripcion: '', especialidad: ''},
    fecha_evo: {anio: '', mes: '', dia: '', completa: ''},
    hora_evo: {hora: '', min: '', completa: ''},
    control: {},
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
    anoFin: '',
    mesFin: '',
    diaFin: '',
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
    mascaras: {
      temp: IMask.createMask({
        mask: Number,
        radix: '.',
        padFractionalZeros: true,
        signed: false,
        scale: 2,
        min: '0000',
        max: 99.99,
      }),
    },
    muscular: '',
    bandera: false,
  },
  async beforeCreate() {
    this.data = null;
    delete this.data;
  },
  async created() {
    console.clear();
    $('#nombreOpcion').remove();

    localStorage.idOpciondata != '07C5'
      ? nombreOpcion('5-2-5 - Control neurológico.')
      : nombreOpcion('7-C-5 - Reimpresión control neurológico.');

    _inputControl('disabled');
    _inputControl('reset');

    await this.iniciarProcesoEnfer();
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
      await this.inicializarProceso();
      this.cargarHistoriaPaciente();
    },
    async llenarFormulario() {
      let $this = this;
      const {und_edad, val_edad} = {
        und_edad: $_REG_HC.edad_hc.unid_edad,
        val_edad: $_REG_HC.edad_hc.vlr_edad,
      };
      this.unid_edad_hc_w = {D: 1, M: '2', A: 3}[und_edad] || 0;
      this.vlr_edad_hc_w = val_edad;

      let profesional =
        this.profesionales.find(
          (p) => parseInt(p.IDENTIFICACION) == parseInt(localStorage.IDUSU),
        ) || 0;

      profesional
        ? (($this.medico.cod = new Intl.NumberFormat('ja-JP').format(profesional.IDENTIFICACION)),
          ($this.medico.descripcion = profesional.NOMBRE.replace(/\�/g, 'Ñ')),
          ($this.medico.especialidad = `${profesional.ATIENDE_PROF}.${consult_atiendProf(
            profesional.ATIENDE_PROF,
          )}`))
        : ($this.terminarEjecucion(), CON851('9X', '9X', null, 'error', 'error'));

      let unserv = this.unidades_servicio.find(
        (o) => parseInt(o.COD) == parseInt(this._hcprc.cierre.unserv),
      );
      this.unserv_descrip = '' != unserv.COD.trim() ? unserv.DESCRIP : 'UNSERV INEXISTENTE';
      this.unserv_cod = '' != unserv.COD.trim() ? unserv.COD : '**';
      this.folio = `${$_REG_HC.llave_hc.substr(15, 2)}${$_REG_HC.llave_hc.substr(17, 6)}`;

      try {
        [this.fecha_evo.anio, this.fecha_evo.mes, this.fecha_evo.dia] = [
          this.control.anio,
          this.control.mes,
          this.control.dia,
        ] = await this.devolverFecha(this.fecha_evo.completa);

        await this.llenarTablaControles();
        localStorage.idOpciondata != '07C5'
          ? setTimeout($this.ventanaUnserv, 400)
          : ((this.unserv = `${this.unserv_cod}.${this.unserv_descrip}`),
            setTimeout(() => $this.confirmarImpresion()),
            $('#inputs-tabla').hide(),
            $('#opciones').hide());
      } catch (e) {
        console.error('error' + e);
        vm.terminarEjecucion();
      }
    },
    async llenarTablaControles() {
      let $this = this;
      $this.tabla_controles = [];
      let [controles, llave_hc] = [this.tabla_controles, this.llave_hc];
      await postData({datosh: `${datosEnvio()}${llave_hc}| `}, get_url('APP/HICLIN/HC525.DLL'))
        .then(function (data) {
          let evo = data.EVO_NEURO;
          evo.length > 1 ? evo.pop() : (evo = evo.reverse());
          for (const i in evo) {
            let fecha = evo[i].FECHA || '00000000';
            if (parseInt(fecha) != 0) {
              let glasg =
                (parseInt(evo[i].APER_OCUL) || 0) +
                (parseInt(evo[i].RESP_VERB) || 0) +
                (parseInt(evo[i].RESP_MOTO) || 0);

              const fmuscular = [
                evo[i].MUSCULAR.substr(0, 1) || ' ',
                evo[i].MUSCULAR.substr(1, 1) || ' ',
                evo[i].MUSCULAR.substr(2, 1) || ' ',
                evo[i].MUSCULAR.substr(3, 1) || ' ',
              ];
              const pupilas = [
                evo[i].PUPILAS.substr(0, 1) || ' ',
                evo[i].PUPILAS.substr(1, 1) || ' ',
                evo[i].PUPILAS.substr(2, 1) || ' ',
                evo[i].PUPILAS.substr(3, 1) || ' ',
              ];

              controles.push({
                item: parseInt(i) + 1,
                anio: $this.devolverFecha(evo[i].FECHA)[0] || '0000',
                mes: $this.devolverFecha(evo[i].FECHA)[1] || '00',
                dia: $this.devolverFecha(evo[i].FECHA)[2] || '00',
                fecha: evo[i].FECHA,
                hora: evo[i].HORA.substring(0, 2) || '00',
                min: evo[i].HORA.substring(2, 4) || '00',
                temp: evo[i].TEMP || 0,
                fcard: evo[i].FCARD || 0,
                fresp: evo[i].FRESP || 0,
                tens: `${evo[i].TENS1 || 0}/${evo[i].TENS2 || 0}`,
                pvc: evo[i].PVC || 0,
                odt: getCpupilas(pupilas[0], 't'),
                odr: getCpupilas(pupilas[1], 'r'),
                oit: getCpupilas(pupilas[2], 't'),
                oir: getCpupilas(pupilas[3], 'r'),
                glasgow_total:
                  (parseInt(evo[i].VLR_GLASG) || glasg).toString().padStart(2, '0') + '/ 15',
                glasgow_aper_ocul: evo[i].APER_OCUL || 0,
                glasgow_verbal_resp: evo[i].RESP_VERB || 0,
                glasgow_motora_resp: evo[i].RESP_MOTO || 0,
                msd: getFmusc(fmuscular[0]).substr(0, 1) || '',
                msi: getFmusc(fmuscular[1]).substr(0, 1) || '',
                mii: getFmusc(fmuscular[2]).substr(0, 1) || '',
                mid: getFmusc(fmuscular[3]).substr(0, 1) || '',
                observaciones: evo[i].RENG1,
                oper: evo[i].OPER_ELAB,
                oper_nombre: evo[i].NOMBRE_OPER,
                pupilas: pupilas.join(''),
                muscular: fmuscular.join(''),
              });
            }
          }
          $this.indice = $this.indice < 1 ? 1 : parseInt(evo.length) + 1;
          $this.tabla_controles = controles;

          var tabla = $this.tabla_controles;
          tabla = tabla.map((t) => t.item).reverse();
          let i = 0;
          for (i; i < $this.tabla_controles.length; i++) $this.tabla_controles[i].item = tabla[i];
          $this.indice = $this.indice < 1 ? 1 : parseInt($this.tabla_controles.length) + 1;
        })
        .catch(
          (e) => (
            CON851(e, 'Error trayendo datos', null, 'error', 'error'), $this.terminarEjecucion
          ),
        );
    },
    datoUnidad(data) {
      let $this = this;
      this.unserv_cod = data.COD;
      this.unserv_descrip = data.DESCRIP.trim();
      this.unserv = `${this.unserv_cod}.${this.unserv_descrip}`;
      data.ESTADO == 'N'
        ? (CON851('13', '13', null, 'error', 'error'), this.ventanaUnserv())
        : $this.datoMinutosControl();
    },
    datoAnioControl() {
      validarInputs(
        {
          form: '#dato_anio_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoAnioControl, this.terminarEjecucion);
          },
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          CON851P('03', this.datoAnioControl, this.terminarEjecucion);
        },
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
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoAnioControl();
        },
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
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoMesControl();
        },
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
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
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
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
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
            this.comprobarEvolucion();
          }
        },
      );
    },
    datoTempControl() {
      validarInputs(
        {
          form: '#dato_temp_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoTempControl, this.terminarEjecucion);
          },
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoMinutosControl();
        },
        () => {
          this.control.temp = this.mascaras.temp.resolve(this.control.temp) || 0;
          const temp = parseFloat(this.control.temp);
          [temp < 35.5, temp > 38].includes(true)
            ? (CON851('BM', 'BM', null, 'warning', 'Advertencia'), this.datoFcardControl())
            : this.datoFcardControl();
        },
      );
    },
    datoFcardControl() {
      validarInputs(
        {
          form: '#dato_fcard_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoFcardControl, this.terminarEjecucion);
          },
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoTempControl();
        },
        () => {
          this.control.fcard = this.control.fcard || 0;
          if (parseInt(this.control.fcard) > 200) {
            CON851('03', '03', null, 'error', 'Error');
            this.datoFcardControl();
          } else if (parseInt(this.control.fcard) < 60 || parseInt(this.control.fcard) > 100) {
            CON851('BK', 'BK', null, 'warning', 'Advertencia');
            this.datoFrespControl();
          } else this.datoFrespControl();
        },
      );
    },
    datoFrespControl() {
      validarInputs(
        {
          form: '#dato_fresp_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoFrespControl, this.terminarEjecucion);
          },
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoFcardControl();
        },
        () => {
          let fresp = (this.control.fresp = this.control.fresp || 0);
          let unidad_edad = $_REG_HC.edad_hc.unid_edad;
          let edad = parseInt(cerosIzq($_REG_HC.edad_hc.vlr_edad, 3));
          const advertencias = {
            D: () => fresp < 30 || fr > 60,
            M: () => fresp < 30 || fr > 60,
            A: () => edad < 5 && (fresp < 16 || fresp > 40 || fresp < 16 || fresp > 30),
          };
          if (advertencias[unidad_edad]) {
            CON851('BL', 'BL', null, 'warning', 'Advertencia');
            this.datoTension1Control();
          } else this.datoTension1Control();
        },
      );
    },
    datoTension1Control() {
      validarInputs(
        {
          form: '#dato_tens1_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoTension1Control, this.terminarEjecucion);
          },
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoFrespControl();
        },
        () => {
          this.control.tens1 = this.control.tens1 || 0;
          if (parseInt(this.control.tens1) > 300) {
            CON851('03', '03', null, 'error', 'Error');
            this.datoTension1Control();
          } else this.datoTension2Control();
        },
      );
    },
    datoTension2Control() {
      validarInputs(
        {
          form: '#dato_tens2_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoTension2Control, this.terminarEjecucion);
          },
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoTension1Control();
        },
        () => {
          this.control.tens2 = this.control.tens2 || 0;
          if (parseInt(this.control.tens2) > 300) {
            CON851('03', '03', null, 'error', 'Error');
            this.datoTension2Control();
          } else this.datoPvcControl();
        },
      );
    },
    datoPvcControl() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_pvc_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoPvcControl, this.terminarEjecucion);
          },
          event_f11: () => {
            setTimeout(this.confirmarImpresion, 300);
          },
        },
        () => {
          this.datoTension1Control();
        },
        () => {
          this.control.pvc = this.control.pvc || 0;
          setTimeout(() => $this.datoOdtControl(), 300);
        },
      );
    },
    datoOdtControl() {
      let $this = this;
      const [seleccion, t, e] = [this.control.odt, 'Tamano pupila ojo derecho', 'tamano_pupila'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoPvcControl(), 300),
        },
        function (data) {
          $this.control.odt = getCpupilas(data.COD, 't');
          $this.control.pupilas += data.COD.toString();
          setTimeout(() => $this.datoOdrControl(), 300);
        },
      );
    },
    datoOdrControl() {
      let $this = this;
      const [seleccion, t, e] = [
        this.control.odr,
        'Reacción pupila ojo derecho',
        'reaccion_pupila',
      ];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoOdtControl(), 300),
        },
        function (data) {
          $this.control.odr = getCpupilas(data.COD, 'r');
          $this.control.pupilas += data.COD.toString();
          setTimeout(() => $this.datoOitControl(), 300);
        },
      );
    },
    datoOitControl() {
      let $this = this;
      const [seleccion, t, e] = [this.control.oit, 'Tamano pupila ojo izquierdo', 'tamano_pupila'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoPvcControl(), 300),
        },
        function (data) {
          $this.control.oit = getCpupilas(data.COD, 't');
          $this.control.pupilas += data.COD.toString();
          setTimeout(() => $this.datoOirControl(), 300);
        },
      );
    },
    datoOirControl() {
      let $this = this;
      const [seleccion, t, e] = [
        this.control.oir,
        'Reacción pupila ojo izquierdo',
        'reaccion_pupila',
      ];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoOitControl(), 300),
        },
        function (data) {
          $this.control.oir = getCpupilas(data.COD, 'r');
          $this.control.pupilas += data.COD.toString();
          setTimeout(() => $this.datoMsdControl(), 300);
        },
      );
    },
    datoMsdControl() {
      let $this = this;
      const [seleccion, t, e] = [this.control.msd, 'Fuerza muscular MSD', 'fuerza_muscular'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoOirControl(), 300),
        },
        function (data) {
          $this.control.msd = getFmusc(data.COD).substr(0, 1);
          $this.control.muscular += data.COD.toString();
          setTimeout(() => $this.datoMsiControl(), 300);
        },
      );
    },
    datoMsiControl() {
      let $this = this;
      const [seleccion, t, e] = [this.control.msi, 'Fuerza muscular MSI', 'fuerza_muscular'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoMsdControl(), 300),
        },
        function (data) {
          $this.control.msi = getFmusc(data.COD).substr(0, 1);
          $this.control.muscular += data.COD.toString();
          setTimeout(() => $this.datoMiiControl(), 300);
        },
      );
    },
    datoMiiControl() {
      let $this = this;
      const [seleccion, t, e] = [this.control.mii, 'Fuerza muscular MII', 'fuerza_muscular'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoMsiControl(), 300),
        },
        function (data) {
          $this.control.mii = getFmusc(data.COD).substr(0, 1);
          $this.control.muscular += data.COD.toString();
          setTimeout(() => $this.datoMidControl(), 300);
        },
      );
    },
    datoMidControl() {
      let $this = this;
      const [seleccion, t, e] = [this.control.mid, 'Fuerza muscular MID', 'fuerza_muscular'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoMsiControl(), 300),
        },
        function (data) {
          $this.control.mid = getFmusc(data.COD).substr(0, 1);
          $this.control.muscular += data.COD.toString();
          setTimeout(() => $this.datoAperOcul(), 300);
        },
      );
    },
    datoAperOcul() {
      let $this = this;
      const [seleccion, t, e] = [this.control.glasgow_aper_ocul, 'Apertura ocular', 'aper_ocul'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoMidControl(), 300),
        },
        function (data) {
          $this.control.glasgow_aper_ocul = data.COD;
          setTimeout(() => $this.datoRespVerbal(), 300);
        },
      );
    },
    datoRespVerbal() {
      let $this = this;
      const [seleccion, t, e] = [this.control.glasgow_verbal_resp, 'Respuesta verbal', 'resp_verb'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoAperOcul(), 300),
        },
        function (data) {
          $this.control.glasgow_verbal_resp = data.COD;
          setTimeout(() => $this.datoRespMotora(), 300);
        },
      );
    },
    datoRespMotora() {
      let $this = this;
      const [seleccion, t, e] = [this.control.glasgow_motora_resp, 'Respuesta motora', 'resp_moto'];
      POPUP(
        {
          array: _tipoJsonHc(e),
          titulo: t,
          indices: [{id: 'COD', label: 'DESCRIP'}],
          seleccion: seleccion,
          callback_f: () => setTimeout(() => $this.datoAperOcul(), 300),
        },
        function (data) {
          setTimeout(async () => {
            $this.control.glasgow_motora_resp = data.COD;
            await $this.devolverGlasgow();
            $this.sw_fin = true;
            $this.datoObservacion();
          }, 300);
        },
      );
    },
    datoObservacion() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_observaciones',
          orden: '1',
          event_f3: () => $this.confirmar(),
        },
        () => {
          $this.sw_fin = false;
          setTimeout(() => {
            $this.datoRespMotora();
          }, 300);
        },
        () => {
          $this.sw_fin = false;
          $this.confirmar();
        },
      );
    },
    devolverGlasgow() {
      let a = this.control.glasgow_aper_ocul,
        m = this.control.glasgow_motora_resp,
        v = this.control.glasgow_verbal_resp;

      var total = parseFloat(a) + parseFloat(v) + parseFloat(m);
      this.control.glasgow_total = `${total}/15`;
    },
    ventanaOpcionesImp() {
      let $this = this;
      $this.sw_prn = true;
      $this.anoIni = '';
      $this.anoFin = '';
      $this.mesIni = '';
      $this.mesFin = '';
      $this.diaIni = '';
      $this.diaFin = '';
      $this.datoAnioRangoIni();
      var fechaHistoria = moment($this._hcprc.fecha).format('YYYYMMDD');
      var fechaActual = moment().format('YYYYMMDD');
      [$this.anoIni, $this.mesIni, $this.diaIni] = $this.devolverFecha(fechaHistoria);
      [$this.anoFin, $this.mesFin, $this.diaFin] = $this.devolverFecha(fechaActual);
    },
    validarFechaIni(t) {
      let $this = this;
      let enter_input = {
        y: () => {
          $this.datoAnioRangoIni();
        },
        m: () => {
          $this.datoMesRangoIni();
        },
        d: () => {
          $this.datoDiaRangoIni();
        },
      };
      setTimeout(eval(enter_input[t]), 100);
    },
    datoAnioRangoIni() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_anio_ini',
          orden: '1',
        },
        () => {
          $this.sw_prn = false;
          setTimeout($this.confirmarImpresion, 300);
        },
        () => {
          $this.validarFecha('anio', $this.anoIni)
            ? $this.validarFechaIni('m')
            : (CON851('03', 'año no valido', null, 'error', 'Error'), $this.validarFechaIni('y'));
        },
      );
    },
    datoMesRangoIni() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_mes_ini',
          orden: '1',
        },
        () => $this.validarFechaIni('y'),
        () => {
          $this.validarFecha('mes', $this.mesIni)
            ? $this.validarFechaIni('d')
            : (CON851('03', 'mes no valido', null, 'error', 'Error'), $this.validarFechaIni('m'));
        },
      );
    },
    datoDiaRangoIni() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_dia_ini',
          orden: '1',
        },
        () => $this.validarFechaIni('m'),
        () => {
          $this.anoIni = $this.anoIni.toString().padStart(2, '0');
          $this.mesIni = $this.mesIni.toString().padStart(2, '0');
          $this.diaIni = $this.diaIni.toString().padStart(2, '0');
          let fecha_ini = `${$this.anoIni}${$this.mesIni}${$this.diaIni}`;
          $this.fechaIni = fecha_ini;
          if ($this.validarFecha('dia', $this.diaIni)) {
            if ($this.validarFecha('fin', fecha_ini)) {
              $this.datoAnioRangoFin('y');
            } else {
              CON851('37', '37', null, 'error', 'Error'), $this.validarFechaIni('y');
            }
          } else {
            CON851('03', 'dia no valido', null, 'error', 'Error');
            $this.validarFechaFin('d');
          }
        },
      );
    },
    validarFechaFin(t) {
      let $this = this;
      let enter_input = {
        y: () => {
          $this.datoAnioRangoFin();
        },
        m: () => {
          $this.datoMesRangoFin();
        },
        d: () => {
          $this.datoDiaRangoFin();
        },
      };
      setTimeout(eval(enter_input[t]), 100);
    },
    datoAnioRangoFin() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_anio_fin',
          orden: '1',
        },
        () => $this.validarFechaIni('y'),
        () => {
          $this.anoFin = $this.anoFin || 0;
          if (0 == $this.anoFin) $this.validarFechaFin('m');
          else {
            $this.validarFecha('anio', $this.anoFin)
              ? $this.validarFechaFin('m')
              : (CON851('03', 'año no valido', null, 'error', 'Error'), $this.validarFechaFin('y'));
          }
        },
      );
    },
    datoMesRangoFin() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_mes_fin',
          orden: '1',
        },
        () => $this.validarFechaFin('y'),
        () => {
          $this.mesFin = $this.mesFin || 0;
          if (0 == $this.mesFin) $this.validarFechaFin('d');
          else {
            $this.validarFecha('mes', $this.mesFin)
              ? $this.validarFechaFin('d')
              : (CON851('03', 'mes no valido', null, 'error', 'Error'), $this.validarFechaFin('m'));
          }
        },
      );
    },
    datoDiaRangoFin() {
      let $this = this;
      validarInputs(
        {
          form: '#dato_dia_fin',
          orden: '1',
        },
        () => $this.validarFechaFin('m'),
        () => {
          $this.diaFin = $this.diaFin || 0;
          $this.anoFin = $this.anoFin.toString().padStart(2, '0');
          $this.mesFin = $this.mesFin.toString().padStart(2, '0');
          $this.diaFin = $this.diaFin.toString().padStart(2, '0');
          let fecha_fin = `${$this.anoFin}${$this.mesFin}${$this.diaFin}`;
          $this.fechaFin = fecha_fin;
          if ($this.validarFecha('dia', $this.diaFin) && $this.validarFecha('fin', fecha_fin)) {
            if ($this.fechaIni > $this.fechaFin)
              CON851('37', '37', null, 'error', 'Error'), $this.validarFechaIni('y');
            else $this.llamarImpresion();
          } else CON851('37', '37', null, 'error', 'Error'), $this.validarFechaFin('y');
        },
      );
    },
    async llamarImpresion() {
      let $this = this;
      var datos = {paciente: {}};

      await postData({datosh: datosEnvio()}, get_url('app/CONTAB/CON809.DLL'))
        .then((data) => {
          $this.ciudades = data.CIUDAD;
          const ciudadPaci = $_REG_PACI.CIUDAD.trim();
          const ciudad = $this.ciudades.find((c) => c.COD.trim() == ciudadPaci);
          datos.paciente['municipio'] = ciudad.NOMBRE.replace(/\s+/g, ' ');
        })
        .catch((err) => console.log(err, 'error'));

      try {
        loader('show');
        await $this.llenarTablaControles();
        let [fechaInicio, fechaFin] = [Number($this.fechaIni) || 0, Number($this.fechaFin) || 0];

        if ($this.fechaFin == 0) $this.fechaFin = $this.fechaIni;
        if (fechaInicio > fechaFin) {
          CON851('37', '37', null, 'error', 'Error');
          $this.validarFechaIni('y');
        }

        datos.titulo = 'CONTROL NEUROLÓGICO';
        datos.paciente['fecha'] = datos.fecha = moment($this._hcprc.fecha).format('YYYY/MM/DD');
        datos.paciente['hora'] = datos.hora = moment($this._hcprc.hora).format('HH:mm');
        datos.paciente['tipoId'] = $_REG_PACI['TIPO-ID'];
        datos.paciente['nombre'] = $_REG_PACI.DESCRIP.replace(/\s+/g, ' ');
        datos.paciente['edad'] = $this._hcprc.edad;
        datos.paciente['telefono'] = $_REG_PACI.TELEFONO;
        datos.paciente['unserv'] = $this.unserv_descrip;
        datos.paciente['folio'] = $this.folio;
        datos.paciente['fact'] = $this._hcprc.cierre.prefijo + $this._hcprc.cierre.nro_fact;
        isNaN($_REG_PACI.COD) == true
          ? (datos.paciente['id'] = $_REG_PACI.COD)
          : (datos.paciente['id'] = new Intl.NumberFormat('ja-JP').format($_REG_PACI.COD));
        $_REG_PACI.SEXO == 'F'
          ? (datos.paciente['sexo'] = 'Femenino')
          : (datos.paciente['sexo'] = 'Masculino');

        // filtro controles
        datos.controles = [];
        for (var control of $this.tabla_controles) {
          if (control.fecha >= $this.fechaIni && control.fecha <= $this.fechaFin)
            datos.controles.push(control);
        }

        let msj = 'No se encontraron controles en el rango de fechas';
        if (datos.controles == [] || datos.controles == '') {
          setTimeout(() => toastr.warning(msj), 100);
          loader('hide');
          $this.validarFechaIni('y');
        } else if ($this.bandera == false) await $this.enviarImpresion(datos);
      } catch (e) {
        console.error('error' + e);
        $this.terminarEjecucion();
      }
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

            this.comprobarEvolucion();
          } else {
            this.datoTempControl();
          }
        })
        .catch((err) => {
          loader('hide');
          CON851('', 'Error validando evolucion: ', null, 'error', 'Error');
          console.error('Error validarEvolucion: ', err);
          this.datoMinutosControl();
        });
    },
    async grabarRegistros() {
      let $this = this;
      var data = {datosh: datosEnvio()};
      let pupilas = `${$this.control.pupilas}`;
      let muscular = `${$this.control.muscular}`;
      data['llave_evo'] = $this.llaveEvo;
      data['medico'] = cerosIzq($this.medico.cod.replace(/\,/g, '').trim(), 10);
      data['unserv'] = $this.unserv_cod || '    ';
      data['edad'] = `${$_REG_HC.edad_hc.unid_edad}${cerosIzq($_REG_HC.edad_hc.vlr_edad, 3)}`;
      data['hab'] = $this._hcprc.cierre.hab || ' ';
      data['temp'] = $this.control.temp;
      data['fcard'] = $this.control.fcard;
      data['fresp'] = $this.control.fresp;
      data['tens1'] = $this.control.tens1;
      data['tens2'] = $this.control.tens2;
      data['pvc'] = $this.control.pvc || 0;
      data['glasg'] = $this.control.glasgow_total.split('/')[0];
      data['verbal_resp'] = $this.control.glasgow_verbal_resp;
      data['motora_resp'] = $this.control.glasgow_motora_resp;
      data['aper_ocul'] = $this.control.glasgow_aper_ocul;
      data['pupilas'] = `${pupilas}`;
      data['muscular'] = `${muscular}`;
      data['observaciones'] = $this.control.observaciones.replaceEsp();
      data['oper'] = $this.oper_elab;

      try {
        await postData(data, get_url('app/HICLIN/HC525-1.DLL'))
          .then((data) => {
            if ('1' == data) {
              toastr.success('Guardado correctamente');
              $this.data = this.original_data;
              $this.AdicionarRegistros();
            } else {
              toastr.error('Error en guardado');
              $this.terminarEjecucion();
            }
          })
          .catch((err) => {
            console.error(err);
            toastr.error('Error en guardado'), loader('hide');
          });
      } catch (e) {
        console.error('error' + e);
        $this.terminarEjecucion();
      }
    },
    async enviarImpresion(datos) {
      let opciones = {
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
        content: await _imprimirHC525(datos),
      };
      let $this = this;
      $this.bandera = true;
      _impresion2(opciones)
        .then(() => setTimeout(() => $this.terminarEjecucion(), 400))
        .catch((err) => {
          console.error(err);
          $this.terminarEjecucion();
        });
    },
    cargarHistoriaPaciente() {
      console.log('cargando historia');
      let $this = this;
      postData(
        {
          datosh: datosEnvio() + this.llave_hc + '|' + localStorage.Usuario.trim() + '|1|',
        },
        get_url('APP/HICLIN/HC_PRC.DLL'),
      )
        .then((data) => {
          $this._hcprc = data.HCPAC;
          7 == $this._hcprc.novedad
            ? (loader('hide'), CON851('3A', '3A', null, 'error', 'error'), _regresar_menuhis())
            : $this.cargarProfesionales();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error');
          loader('hide'), _regresar_menuhis();
        });
    },
    cargarProfesionales() {
      console.log('cargando profesionales');
      let $this = this;
      postData({datosh: datosEnvio()}, get_url('APP/SALUD/SER819.DLL'))
        .then((data) => {
          let profesionales = ($this.profesionales = data.ARCHPROF);
          profesionales.length > 1 ? profesionales.pop() : (profesionales = profesionales);
          $this.cargarUnidadesServicio();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error'),
            loader('hide'),
            _regresar_menuhis();
        });
    },
    cargarUnidadesServicio() {
      console.log('cargando unidades de servicio');
      let $this = this;
      postData({datosh: datosEnvio()}, get_url('APP/SALUD/SER873.DLL'))
        .then((data) => {
          $this.unidades_servicio = data.UNSERV;
          $this.unidades_servicio.length > 1
            ? $this.unidades_servicio.pop()
            : $this.unidades_servicio;
          loader('hide');
          $this.llenarFormulario();
        })
        .catch((err) => {
          CON851('', 'Error trayendo datos', null, 'error', 'error'),
            loader('hide'),
            _regresar_menuhis();
        });
    },
    async ventanaUnserv() {
      let $this = this;
      await SER873(
        () => {
          $this.terminarEjecucion();
        },
        $this.datoUnidad,
        1,
      );
    },
    confirmar() {
      let $this = this;
      CON851P(
        '01',
        () => {
          $this.datoHoraControl();
        },
        () => $this.grabarRegistros(),
      );
    },
    AdicionarRegistros() {
      let $this = this;
      CON851P(
        '14',
        () => {
          setTimeout(() => {
            $this.inicializarProceso();
            $this.llenarTablaControles();
            $this.confirmarImpresion();
          }, 500);
        },
        () => {
          setTimeout(() => {
            $this.inicializarProceso();
            $this.llenarTablaControles();
            $this.llenarFormulario();
          }, 500);
        },
      );
    },
    confirmarImpresion() {
      let $this = this;
      CON851P(
        '00',
        () => $this.terminarEjecucion(),
        () => {
          setTimeout(() => {
            $this.ventanaOpcionesImp();
          }, 300);
        },
      );
    },
    inicializarProceso() {
      this.original_data = this;
      this.admin_w = this.oper_elab = localStorage.Usuario;
      this.nit_usu = $_USUA_GLOBAL[0].NIT;
      this.fecha_act = this.fecha_evo.completa = moment().format('YYYYMMDD');
      this.anio_act = moment().format('YYYY');
      this.mes_act = moment().format('MM');
      this.dia_act = moment().format('DD');
      this.llave_hc = $_REG_HC.llave_hc;
      this.llave_w = this.llave_paci_w = $_REG_PACI.COD;
      this.hora_evo = {
        hora: this.hora_act.substring(0, 2),
        min: this.hora_act.substring(2, 4),
        completa: this.hora_act,
      };
      let control = {
        anio: this.anio_act,
        mes: this.mes_act,
        dia: this.dia_act,
        hora: this.hora_act.substring(0, 2),
        min: this.hora_act.substring(2, 4),
        fecha: this.fecha_act,
        temp: '',
        fcard: '',
        tens1: '',
        tens2: '',
        tens: '',
        pvc: '',
        odt: '',
        odr: '',
        oit: '',
        oir: '',
        msd: '',
        msi: '',
        mii: '',
        mid: '',
        glasgow_total: '',
        glasgow_aper_ocul: '',
        glasgow_motora_resp: '',
        glasgow_verbal_resp: '',
        observaciones: '',
        muscular: '',
        pupilas: '',
      };
      this.control = control;
    },
    terminarEjecucion() {
      this.data = this.original_data;
      _regresar_menuhis();
    },
  },
});

const getFmusc = (cod) => {
  const json_muscul = _tipoJsonHc('fuerza_muscular');
  let retorno = json_muscul.find((x) => x.COD == cod);
  retorno = retorno ? retorno['DESCRIP'] : 'N';
  return retorno;
};
const getCpupilas = (cod, t) => {
  let res = '';
  let res_json = {
    tamano: { N: 1, D: 2, C: 3 },
    reaccion: { N: 1, F: 2, P: 3 },
  };
  if (t == 't') {
    for (const [k, v] of Object.entries(res_json['tamano'])) if (v == cod) res = k;
    return res;
  } else {
    for (const [k, v] of Object.entries(res_json['reaccion'])) if (v == cod) res = k;
    return res;
  }
};
