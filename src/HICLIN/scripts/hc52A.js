/** @format */
'use strict';

/**
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Procesos de enfermería - Control transfusiones.
 * @date       18/05/2021. CREACION
 * @date       04/06/2021. REESTRUTURACION
 * @date       15/07/2021. FIN
 */

new Vue({
  el: '#HC52A',
  data: {
    tablaTransfusiones: [],
    tablaUnidadesTransfusion: [],
    tablaSignosUnidadTransfusion: [],
    tablaDiagnosticos: [],

    unidadesServicio: [],
    ciudades: [],
    camas: [],

    historia: {
      operador: localStorage.Usuario,
      fecha: null,
      hora: null,
      folio: null,
      llave: null,
      nitUsu: null,
    },
    hcprc: {},
    paciente: {},
    medico: {
      cod: null,
      descripcion: null,
      especialidad: null,
    },
    evolucion: {
      fecha: null,
      hab: ' SIN ',
      hora: null,
      llave: null,
      folio: null,
      unserv: null,
      operador: null,
    },
    sw: {
      prn: false,
      cierre: false,
      unidad: false,
      signos: false,
      fin: false,
      mostrar: false,
    },
    form: {
      cama: null,
      productoTransfusion: null,
      grupoSanguineo: null,
      rhSanguineo: null,
      caracOrinaAnt: null,
      realizaTransfusion: null,
      nroUnidad: null,
      anioTransfusion: null,
      mesTransfusion: null,
      diaTransfusion: null,
      hraTransfusion: null,
      minTransfusion: null,
      //-vencimiento unidad
      anioVence: null,
      mesVence: null,
      diaVence: null,
      //-Inicio unidad
      anioInicio: null,
      mesInicio: null,
      diaInicio: null,
      hraInicio: null,
      minInicio: null,
      //-cierre unidad
      anioFinal: null,
      mesFinal: null,
      diaFinal: null,
      hraFinal: null,
      minFinal: null,
      //-signos unidad transfusion
      anioSignos: null,
      mesSignos: null,
      diaSignos: null,
      hraSignos: null,
      minSignos: null,
      tens1Signos: null,
      tens2Signos: null,
      tempSignos: null,
      fcardSignos: null,
      diuresisSignos: null,
      //-cierre control transfusion
      anioCierre: null,
      mesCierre: null,
      diaCierre: null,
      hraCierre: null,
      minCierre: null,
      reaccionTransfusion: null,
      volumenTransfusion: null,
      caracOrinaPos: null,
      caracCierre: null,
      tratamientoTransfusion: null,
      devolucionTransfusion: null,
      //devolucionTransfusion ? capturar : imprimir
      motivoDevolucionTransfusion: null,
      estadoProductoTransfusion: null,
      observacionesTransfusion: null,
    },
    // VARIABLES USO GENERAL
    colores: {verde: 2, rojo: 1, azul: 5, cafe: 4},
    estados: {abierto: 1, vencido: 2, cerrado: 3, nuevo: 0},
    textos: {},
    indexSignos: 0,
    indexUnidad: 0,
    nroUnidadTransfusion: null,
    regUnidad: {},
    regTransfusion: {},
    regSignos: {},

    idOpcion: localStorage.idOpciondata,
    admin: localStorage.Usuario,
    nombre: localStorage.Nombre,
    medico: localStorage.IDUSU,
    folio: $_REG_HC.llave_hc.slice(15),
    realizaOper: localStorage.Usuario + ' - ' + localStorage.Nombre,
    /* this.swpaso
        1: 'Ficha Transfusión | Inicio'
        2: 'Unidad Transfusión  grabado'
        3: 'Signos x Unidad     grabado'
        4: 'Cierre unidad       grabado'
        5: 'Cierre Transfusion  grabado'
    */
    limiteUnidades: 6,
    limiteTransfusiones: '',
    limiteCapturaSignos: 10,
    swpaso: '',
    unserv: '',
    llaveHC: $_REG_HC.llave_hc,
    opcionesImpresion: false,
  },
  async beforeCreate() {
    this.data = null;
    delete this.data;
  },
  async created() {
    this.medico = {...lowerCaseKeys($_REG_PROF)};
    this.historia = {...lowerCaseKeys($_REG_HC)};
    this.paciente = {...lowerCaseKeys($_REG_PACI)};
    console.clear();

    this.iniciarEvolucion();
  },
  mounted() {
    if (this.idOpcion == '07CA') $('#HC52A').empty();
  },
  computed: {
    msjGrabarDatos() {
      var indexSignos = parseInt(this.indexSignos) + 1;
      return {
        1: 'Ficha Transfusión grabada correctamente',
        2: 'Unidad Transfusión guardada exitosamente ' + this.form.nroUnidad,
        3:
          'Control Signos nro ' +
          indexSignos -
          1 +
          '  se ha grabado exitosamente en la unidad: ' +
          this.form.nroUnidad,
        4: 'Unidad Transfusión cerrada exitosamente  ' + this.form.nroUnidad,
        5: 'Cierre Transfusion almacenado exitosamente: ' + this.llaveEvo,
      }[this.swpaso];
    },
    msjErrorGrabarDatos() {
      var indexSignos = parseInt(this.indexSignos) + 1;
      return {
        1: 'error al grabar Ficha Transfusión ',
        2: 'error al grabar Unidad Transfusión ' + this.form.nroUnidad,
        3:
          'error al grabar Control Signos nro ' +
          indexSignos -
          1 +
          ' unidad: ' +
          this.form.nroUnidad,
        4: 'Fallo al cerrar Unidad Transfusión ' + this.form.nroUnidad,
        5: 'error al grabar cierre Transfusión del control : ' + this.llaveEvo,
      }[this.swpaso];
    },
    novedadTransfusion() {
      return this.regTransfusion.estado == 'nuevo' ? 7 : 8;
    },
    llaveEvo() {
      return `${this.llaveHC}${this.fechaEvo}${this.horaEvo}${this.admin}`;
    },
    fechaHora() {
      return `${this.form.anioTransfusion}-${this.form.mesTransfusion}-${this.form.diaTransfusion}T${this.form.hraTransfusion}:${this.form.minTransfusion}`;
    },
    fechaAct() {
      return moment().format('YYYYMMDD');
    },
    horaAct() {
      return moment().format('HHmm');
    },
    fechaHoraAct() {
      return this.fechaAct + this.horaAct;
    },
    fechaEvo() {
      return this.form.anioTransfusion + this.form.mesTransfusion + this.form.diaTransfusion;
    },
    horaEvo() {
      return this.form.hraTransfusion + this.form.minTransfusion;
    },
    fechaHoraEvo() {
      return this.fechaEvo + this.horaEvo;
    },
    // Unidad transfusión
    novedadUnidad() {
      return this.regUnidad.estado == 'nuevo' ? 7 : 8;
    },
    fechaVence() {
      return this.form.anioVence + this.form.mesVence + this.form.diaVence;
    },
    fechaInicio() {
      return this.form.anioInicio + this.form.mesInicio + this.form.diaInicio;
    },
    horaInicio() {
      return this.form.hraInicio + this.form.minInicio;
    },
    fechaFin() {
      return this.anioFinal + this.mesFinal + this.diaFinal;
    },
    horaFin() {
      return this.form.hraFinal + this.form.minFinal;
    },
    fechaSignos() {
      return this.form.anioSignos + this.form.mesSignos + this.form.diaSignos;
    },
    horaSignos() {
      return this.form.hraSignos + this.form.minSignos;
    },
    fechaCierre() {
      return this.form.anioCierre + this.form.mesCierre + this.form.diaCierre;
    },
    horaCierre() {
      return this.form.hraCierre + this.form.minCierre;
    },

    tablaSignos() {
      let tablaSignos = [...this.tablaSignosUnidadTransfusion];
      tablaSignos = tablaSignos.filter((t) => parseInt(t.fecha) > 0) || [
        {
          nrounidadSignos: this.regUnidad.nroUnidad,
          fechaSignos: '',
          horaSignos: '',
          tens1Signos: '',
          tens2Signos: '',
          tempSignos: '',
          frecardSignos: '',
          diuresisSignos: '',
        },
      ];
      return tablaSignos;
    },
    nroCapturaSignos() {
      let tablaSignos = this.tablaSignos;
      console.log({
        tablaSignos: tablaSignos,
        tam: tablaSignos.length,
        index: tablaSignos.length + 1,
      });
      this.indexSignos = tablaSignos.length + 1;
      return this.indexSignos;
    },
    tablaUnidades() {
      var tabla = this.tablaUnidadesTransfusion.map((t) => {
        return {
          ...t,
          fechaVencimiento: t.fechaVence > 0 ? _editarFecha(t.fechaVence) : '0000/00/00',
          fechaInicio: t.fechaIni > 0 ? _editarFecha(t.fechaIni) : '0000/00/00',
          horaInicio: t.horaIni > 0 ? moment(t.horaIni).format('HH:mm') : '00:00',
          fechaFinal: t.fechaFin > 0 ? _editarFecha(t.fechaFin) : '0000/00/00',
          horaFinal: t.horaFin > 0 ? moment(t.horaFin).format('HH:mm') : '00:00',
        };
      });
      return tabla.filter((t) => t.estado != 'nuevo') || [];
    },
    devolucion() {
      return this.form.devolucionTransfusion == 'S' ? true : false;
    },
  },
  methods: {
    async iniciarEvolucion() {
      console.log({
        paciente: this.paciente,
        historia: this.historia,
        medico: this.medico,
      });

      nombreOpcion('5-2-A - Control transfusión.');
      _inputControl('disabled');
      _inputControl('reset');

      await this.iniciarProcesoEnfer();
    },
    async iniciarProcesoEnfer() {
      try {
        await this.traerHistoriaPaciente();
      } catch (e) {
        console.log('error' + e);
        this.terminarEjecucion();
      }
    },
    async traerColecionDataEvo() {
      try {
        await this.traerUnidadesServicio();
        await this.buscarDiagnosticos();
        await this.traerCamas();
      } catch (e) {
        console.log('error' + e);
        this.terminarEjecucion();
      }
    },
    async cargarDatosEvo() {
      console.log({historia: this.historia, hcprc: this.hcprc});
      try {
        let profesional = this.medico || 0;

        if (profesional) {
          const atiende = consult_atiendProf(profesional.atiende_prof);
          this.medico.descripcion = profesional.nombre.replace(/\�/g, 'Ñ').toUpperCase();

          this.medico.identificacion = new Intl.NumberFormat('ja-JP').format(
            profesional.identificacion,
          );
          this.medico.especialidad = `${profesional.atiende_prof}.${atiende}`;
        } else {
          this.terminarEjecucion(), CON851('9X', '9X', null, 'error', 'error');
        }

        if (this.regTransfusion.fechaIni) {
          [this.form.anioTransfusion, this.form.mesTransfusion, this.form.diaTransfusion] =
            await this.devolverFecha(this.regTransfusion.fechaIni);
          [this.form.hraTransfusion, this.form.minTransfusion] = await this.devolverHora(
            this.regTransfusion.horaIni,
          );
        } else {
          [this.form.anioTransfusion, this.form.mesTransfusion, this.form.diaTransfusion] =
            await this.devolverFecha(this.fechaAct);
          [this.form.hraTransfusion, this.form.minTransfusion] = await this.devolverHora(
            this.horaAct,
          );
        }

        if (this.idOpcion == '052A') this.continuarFlujoTransfusion();
        else this.continuarFlujoImpresion();
      } catch (e) {
        console.error('error' + e);
        this.terminarEjecucion();
      }
    },
    /*FLUJO IMPRESION CONTROL DE TRANSFUSIONES*/
    async continuarFlujoImpresion() {
      await this.traerUnidadesTransfusion();
      await this.llamarImpresion();
    },
    async llamarImpresion() {
      const regTransfusion = this.regTransfusion;
      var datos = {},
        tablaUnidades = [];
      try {
        datos = {
          grupoRh: regTransfusion.grupoSangTransfusion,
          factorRh: regTransfusion.rhSangTransfusion,
          producto: regTransfusion.productoTransfusion,
          caracOrina: regTransfusion.caracOrinaAnt,
          fecha: regTransfusion.fechaIni,
          hora: regTransfusion.horaIni,
          oper: `${regTransfusion.operElab} ${regTransfusion.oper}`,
          cama: regTransfusion.cama,
          cierre: {
            totalOrina: regTransfusion.volumenTransfusion,
            caracOrina: regTransfusion.caracOrinaPos,
            fecha: regTransfusion.fechaFin,
            hora: regTransfusion.horaFin,
            caracteristicas: regTransfusion.caracCierre,
            devolucion: regTransfusion.devolucionTransfusion,
            estado: regTransfusion.estadoProductoTransfusion,
          },
          tablaDiagnosticos: this.tablaDiagnosticos,
          tablaUnidades: [],
        };
        tablaUnidades =
          [...this.tablaUnidades] ||
          Array(this.limiteUnidades).fill({
            nroUnidad: null,
            fechaVence: null,
            fechaInicio: null,
            fechaFin: null,
            horaInicio: null,
            horaFin: null,
          });

        for (var i in tablaUnidades) {
          await this.cargarTablaSignos(parseInt(i) + 1).then(() => {
            datos.tablaUnidades.push({
              ...tablaUnidades[i],
              tablaSignos: this.tablaSignosUnidadTransfusion,
            });
          });
        }
        datos.fecha = this.enviarImpresion();
      } catch (e) {
        this.terminarEjecucion();
      }
    },
    async enviarImpresion() {
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
    /*FIN FLUJO IMPRESION CONTROL DE TRANSFUSIONES*/
    /*--------------------------------------------------------------------------*/
    /*FLUJO FORMULARIO CONTROL DE TRANSFUSIONES*/
    continuarFlujoTransfusion() {
      if (this.novedadTransfusion == 7) setTimeout(this.ventanaUnserv, 400);
      else {
        let unidadServ = this.unidadesServicio.find(
          (u) => u.COD == this.regTransfusion.unserv || u.COD == this.historia.unser_hc,
        );
        unidadServ = unidadServ || {COD: '', DESCRIP: ''};
        this.unserv = unidadServ.COD;
        this.evolucion.unserv = `${unidadServ.COD}.${unidadServ.DESCRIP}`;
        this.traerUnidadesTransfusion();
      }
    },
    datoUnidad(data) {
      console.log({dataunserv: data});
      this.unserv = data.COD;
      this.evolucion.unserv = `${data.COD}. ${data.DESCRIP}`;
      data.ESTADO == 'N'
        ? (CON851('13', '13', null, 'error', 'error'), this.ventanaUnserv())
        : this.continuarFlujoUnidadTransfusion();
    },
    async continuarFlujoUnidadTransfusion() {
      if (this.novedadTransfusion == 7) this.datoMinutosControl();
      else {
        await this.traerUnidadesTransfusion();
      }
    },
    async cargarDatosTransfusion() {
      const regTransfusion = this.regTransfusion;
      console.log({regTransfusion});
      this.form.realizaTransfusion = regTransfusion.oper;
      this.form.caracOrinaAnt = regTransfusion.caracOrinaAnt;
      this.form.rhSanguineo = regTransfusion.rhSangTransfusion || this.paciente.rh;
      this.form.grupoSanguineo =
        regTransfusion.grupoSangTransfusion || this.paciente.grp_sang.toUpperCase();

      this.form.productoTransfusion =
        this.form.productoTransfusion == 'NUEVA TRANSFUSION'
          ? ''
          : regTransfusion.productoTransfusion;

      [this.form.anioTransfusion, this.form.mesTransfusion, this.form.diaTransfusion] =
        await this.devolverFecha(regTransfusion.fechaIni);
      [this.form.hraTransfusion, this.form.minTransfusion] = await this.devolverHora(
        regTransfusion.HoraIni,
      );

      //cierre Transfusion
      [this.form.anioCierre, this.form.mesCierre, this.form.diaCierre] = await this.devolverFecha(
        regTransfusion.fechaFin,
      );
      [this.form.hraCierre, this.form.minCierre] = await this.devolverHora(regTransfusion.HoraFin);

      this.form.caracCierre = regTransfusion.caracCierre;
      this.form.caracOrinaPos = regTransfusion.caracOrinaPos;

      this.form.reaccionTransfusion = regTransfusion.reaccionTransfusion;
      this.form.devolucionTransfusion = regTransfusion.devolucionTransfusion;
      this.form.volumenTransfusion = regTransfusion.volumenTransfusion;
      this.form.tratamientoTransfusion = regTransfusion.tratamientoTransfusion;
      this.form.motivoDevolucionTransfusion = regTransfusion.motivoDevolucionTransfusion;

      this.traerColecionDataEvo();
    },
    async cargarDatosUnidad() {
      const regUnidad = this.regUnidad;
      [this.form.anioVence, this.form.mesVence, this.form.diaVence] = await this.devolverFecha(
        regUnidad.fechaVence,
      );

      [this.form.anioInicio, this.form.mesInicio, this.form.diaInicio] = await this.devolverFecha(
        regUnidad.fechaIni,
      );
      [this.form.hraInicio, this.form.minInicio] = await this.devolverHora(regUnidad.horaIni);

      [this.form.anioFinal, this.form.mesFinal, this.form.diaFinal] = await this.devolverFecha(
        regUnidad.fechaFin,
      );
      [this.form.hraInicio, this.form.minInicio] = await this.devolverHora(regUnidad.horaIni);

      this.nroUnidad = regUnidad.nroUnidad;
      this.form.nroUnidad = this.nroUnidad.indexOf('NUEVA') != -1 ? '' : this.nroUnidad;
      console.log({regunidadindice: regUnidad.indice, regunidad: regUnidad});

      // Comprueba si unidad esta cerrada
      var cerrada = parseInt(regUnidad.fechaFin) > 0 ? true : false;
      if (!cerrada) {
        // Comprueba si unidad esta vencida
        var vencida = regUnidad.fechaVence ? regUnidad.fechaVence <= this.fechaAct : false;

        if (!vencida) {
          const signosxUnidad = this.cargarTablaSignos(regUnidad.indice);
          signosxUnidad.then(() => {
            if (regUnidad.estado != 'nuevo') {
              !this.sw.unidad
                ? this.capturarSignosUnidad()
                : this.limiteCapturaSignos > this.nroCapturaSignos
                ? this.finalizarUnidadTransfusion()
                : this.capturarSignosUnidad();
            } else {
              this.indexUnidad = 0;
              this.datoUnidadTransfusion();
            }
          });
        } else {
          toastr.warning('La unidad de transfusión selecionada ya caduco');
          setTimeout(this.traerUnidadesTransfusion, 200);
        }
      } else {
        toastr.warning('La unidad de transfusión selecionada ya esta cerrada');
        setTimeout(this.traerUnidadesTransfusion, 200);
      }
    },
    async cargarTablaSignos(index) {
      this.tablaSignosUnidadTransfusion = [];
      var tabla = [];
      const datosh = [datosEnvio(), `${this.llaveHC}|`, this.admin].join('');
      const url = get_url('APP/HICLIN/HC52A.DLL');
      return new Promise(async (resolve) => {
        await postData(
          {datosh, paso: '03', llaveEvo: this.llaveEvo, indice: parseInt(index)},
          url,
        ).then((data) => {
          data.SIGNOS_UNIDAD.pop();
          tabla = data.SIGNOS_UNIDAD;
          tabla.forEach((el) => {
            this.tablaSignosUnidadTransfusion.push({
              nroUnidad: el.nrounidadSignos,
              fecha: el.fechaSignos,
              hora: el.horaSignos,
              tens1: el.tens1Signos,
              tens2: el.tens2Signos,
              temp: el.tempSignos,
              fcard: el.frecardSignos,
              diuresis: el.diuresisSignos,
            });
          });
          resolve(this.tablaSignosUnidadTransfusion);
        });
      });
    },
    datoAnioControl() {
      validarInputs(
        {
          form: '#dato_anio_control',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoAnioControl, this.terminarEjecucion);
          },
        },
        () => {
          CON851P('03', this.datoAnioControl, this.terminarEjecucion);
        },
        () => {
          const anio = this.form.anioTransfusion || 0;
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
        },
        () => {
          this.datoAnioControl();
        },
        () => {
          const mes = this.form.mesTransfusion || 0;
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
        },
        () => {
          this.datoMesControl();
        },
        () => {
          let dia = this.form.diaTransfusion || 0;
          let fecha = this.fechaEvo;
          if (this.validarFecha('dia', dia) && this.validarFecha('fin', parseInt(fecha))) {
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
        },
        () => {
          this.datoDiaControl();
        },
        () => {
          const hora = this.horaEvo.substr(0, 2);
          const fecha = this.fechaEvo;
          if (
            parseInt(hora) < 0 ||
            parseInt(hora) > 23 ||
            (parseInt(fecha) == parseInt(this.fechaAct) &&
              hora > parseInt(this.horaAct.substr(0, 2)))
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
        },
        () => {
          this.datoHoraControl();
        },
        () => {
          const hora = this.horaEvo;
          const fecha = this.fechaEvo;
          const minuto = hora.substr(2, 2);

          if (
            minuto < 0 ||
            minuto > 59 ||
            parseInt(fecha + hora) > parseInt(this.fechaAct + this.horaAct)
          ) {
            CON851('9Q', '9Q', null, 'warning', 'Advertencia');
            this.datoHoraControl();
          } else {
            this.comprobarEvolucion();
          }
        },
      );
    },
    comprobarEvolucion() {
      loader('show');
      let _this = this;
      postData({datosh: datosEnvio() + this.llaveEvo + '|'}, get_url('APP/HICLIN/HC522-2.DLL'))
        .then((data) => {
          loader('hide');
          if ('8' == data) {
            [
              _this.form.anioTransfusion,
              _this.form.mesTransfusion,
              _this.form.diaTransfusion,
              _this.form.hraTransfusion,
              _this.form.minTransfusion,
            ] = moment(_this.fechaHora).add(1, 'm').format('YYYY-MM-DD-HH-mm').split('-');

            _this.comprobarEvolucion();
          } else _this.datoCama();
        })
        .catch((err) => {
          loader('hide');
          CON851('', 'Error validando evolucion: ', null, 'error', 'Error');
          console.error('Error validarEvolucion: ', err);
          this.datoMinutosControl();
        });
    },
    datoCama() {
      this.form.cama = this.hcprc.cierre.hab || 'SIN';
      validarInputs(
        {
          form: '#dato_cama',
          orden: '1',
          event_f8: (data) => {
            console.log('presione f8', data);
            this.ventanaCamas();
          },
        },
        () => {
          this.datoHoraControl();
        },
        () => {
          let cama = this.form.cama || 'SIN';
          if (cama != 'SIN') {
            cama = this.camas.find((c) => c.COD == cama);
            this.evolucion.hab = cama.COD;
            this.form.cama = cama.COD + '. ' + cama.DESCRIP;
          } else {
            this.form.cama = 'SIN';
          }
          this.datoProductoTransfusion();
        },
      );
    },
    datoProductoTransfusion() {
      validarInputs(
        {
          form: '#dato_producto_transfusion',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoProductoTransfusion, this.terminarEjecucion);
          },
        },
        () => {
          if (this.novedadTransfusion == 7) this.datoCama();
          else {
            CON851P('03', this.datoProductoTransfusion, this.terminarEjecucion);
          }
        },
        () => {
          this.datoGrupoTransfusion();
        },
      );
    },
    datoGrupoTransfusion() {
      validarInputs(
        {
          form: '#dato_grupo_transfusion',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoGrupoTransfusion, this.terminarEjecucion);
          },
        },
        () => {
          this.datoProductoTransfusion();
        },
        () => {
          const grupoFactor =
            String(this.form.grupoSanguineo).toUpperCase() || this.paciente.grp_sang.toUpperCase();
          this.form.grupoSanguineo = grupoFactor;
          if (['A', 'B', 'AB', 'O'].includes(grupoFactor)) this.datoFactorTransfusion();
          else {
            CON851('03', '03', null, 'error', 'erro');
            this.datoGrupoTransfusion();
          }
        },
      );
    },
    datoFactorTransfusion() {
      validarInputs(
        {
          form: '#dato_rh_transfusion',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoFactorTransfusion, this.terminarEjecucion);
          },
        },
        () => {
          this.datoGrupoTransfusion();
        },
        () => {
          const factorRH = String(this.form.rhSanguineo) || this.paciente.rh;
          this.form.rhSanguineo = factorRH || '+';
          if (['+', '-'].includes(factorRH)) this.datoOrinaPre();
          else {
            CON851('03', '03', null, 'error', 'erro');
            this.datoGrupoTransfusion();
          }
        },
      );
    },
    datoOrinaPre() {
      validarInputs(
        {
          form: '#dato_carac_orina_ant',
          orden: '1',
          event_f5: () => {
            CON851P('03', this.datoOrinaPre, this.terminarEjecucion);
          },
        },
        () => {
          this.datoFactorTransfusion();
        },
        () => {
          this.grabarInicioTransfusion();
        },
      );
    },
    async grabarInicioTransfusion() {
      loader('show');
      let datos = {datosh: datosEnvio() + this.historia.llave_hc};
      try {
        this.swpaso = 1;
        datos.paso = '01';
        datos.llaveEvo = this.llaveEvo;
        datos.medico = this.medico.identificacion.toString().replace(/\,/g, '').padStart(10, '0');
        datos.unserv = this.unserv;
        datos.hab = this.evolucion.hab || '    ';
        datos.productoTransfusion = this.form.productoTransfusion;
        datos.grupoSanguineo = this.form.grupoSanguineo;
        datos.rhSanguineo = this.form.rhSanguineo == '+' ? 'p' : 'n';
        datos.caracOrinaAnt = this.form.caracOrinaAnt;
        console.log('grabandoInicioTransfusion', {datos});

        const callback =
          this.novedadTransfusion == 7 ? this.traerUnidadesTransfusion : this.capturarSignosUnidad;

        const escCallback =
          this.novedadTransfusion == 7 ? this.traerControlesTransfusiones : this.datoOrinaPre;

        this.grabarRegistros(datos, callback, escCallback);
      } catch (e) {
        console.error(e);
        this.datoOrinaPre();
      }
    },
    /* FLUJO UNIDADES DE TRANSFUSIÓN */
    datoUnidadTransfusion() {
      validarInputs(
        {
          form: '#dato_nro_unidad',
          orden: '1',
        },
        () => {
          if (this.novedadTransfusion == 7) this.datoOrinaPre();
          else {
            setTimeout(() => {
              this.traerUnidadesTransfusion();
            }, 300);
          }
        },
        () => {
          console.log({novedadUnidad: this.novedadUnidad});
          if (this.novedadUnidad == 7) {
            [this.form.anioVence, this.form.mesVence, this.form.diaVence] = this.devolverFecha(
              this.fechaEvo,
            );
            this.datoAnioVencimiento();
          } else {
            // Valida unidad vencida
            this.regUnidad.estado == 'vencida'
              ? (toastr.warning('unidad transfusion vencida'), this.finalizarUnidadTransfusion())
              : this.capturarSignosUnidad();
          }
        },
      );
    },
    async finalizarUnidadTransfusion() {
      [this.anioFinal, this.mesFinal, this.diaFinal] = this.devolverFecha(this.fechaAct);
      [this.horaFinal, this.minFinal] = this.devolverHora(this.horaAct);

      CON851P(
        'Desea finalizar unidad de transfusión?',
        this.traerUnidadesTransfusion,
        this.datoAnioFinal,
      );
    },
    // Datos Vencimiento Unidad
    datoAnioVencimiento() {
      this.form.diaVence = String(this.form.diaVence++).padStart(2, '0');
      validarInputs(
        {
          form: '#dato_anio_vencimiento',
          orden: '1',
        },
        () => {
          this.datoUnidadTransfusion();
        },
        () => {
          const anio_vence = this.form.anioVence || 0;
          if (this.validarFecha('anio', anio_vence)) this.datoMesVencimiento();
          else {
            CON851('03', 'año no valido', null, 'error', 'Error');
            this.datoAnioVencimiento();
          }
        },
      );
    },
    datoMesVencimiento() {
      validarInputs(
        {
          form: '#dato_mes_vencimiento',
          orden: '1',
        },
        () => {
          this.datoAnioVencimiento();
        },
        () => {
          const mes_vence = this.form.mesVence || 0;
          if (this.validarFecha('mes', mes_vence)) this.datoDiaVencimiento();
          else {
            CON851('03', 'mes no valido', null, 'error', 'Error');
            this.datoMesVencimiento();
          }
        },
      );
    },
    datoDiaVencimiento() {
      validarInputs(
        {
          form: '#dato_dia_vencimiento',
          orden: '1',
        },
        () => {
          this.datoMesVencimiento();
        },
        () => {
          const dia_vence = parseInt(this.form.diaVence) || 0;
          if (this.validarFecha('dia', dia_vence)) {
            const esMenor = parseInt(this.fechaVence) >= parseInt(this.fechaAct) ? false : true;
            if (esMenor) {
              toastr.error('Fecha Vencimiento menor a fecha evolución');
              this.datoAnioVencimiento();
            } else {
              this.fechaVence == this.fechaAct
                ? (toastr.error('Fecha Vencimiento no puede ser igual a  fecha actual'),
                  this.datoAnioVencimiento())
                : this.datoAnioInicio();
            }
          } else {
            CON851('37', '37', null, 'error', 'error'), this.datoAnioVencimiento();
          }
        },
      );
    },
    // Datos Inicio Unidad
    datoAnioInicio() {
      [this.form.anioInicio, this.form.mesInicio, this.form.diaInicio] = this.devolverFecha(
        this.fechaEvo,
      );
      validarInputs(
        {
          form: '#dato_anio_inicio',
          orden: '1',
        },
        () => {
          this.datoAnioVencimiento();
        },
        () => {
          const anio_inicio = this.form.anioInicio || 0;
          this.validarFecha('anio', anio_inicio)
            ? this.datoMesInicio()
            : (CON851('03', 'año no valido', null, 'error', 'Error'), this.datoAnioInicio());
        },
      );
    },
    datoMesInicio() {
      validarInputs(
        {
          form: '#dato_mes_inicio',
          orden: '1',
        },
        () => {
          this.datoAnioInicio();
        },
        () => {
          const mes_inicio = this.form.mesInicio || 0;
          this.validarFecha('mes', mes_inicio)
            ? this.datoDiaInicio()
            : (CON851('03', 'mes no valido', null, 'error', 'Error'), this.datoMesInicio());
        },
      );
    },
    datoDiaInicio() {
      validarInputs(
        {
          form: '#dato_dia_inicio',
          orden: '1',
        },
        () => {
          this.datoMesInicio();
        },
        () => {
          const dia_inicio = this.form.diaInicio || 0;
          if (this.validarFecha('dia', dia_inicio)) {
            const esMenor = parseInt(this.fechaInicio) < parseInt(this.fechaEvo) ? true : false;
            const esMayor = parseInt(this.fechaInicio) > parseInt(this.fechaVence) ? true : false;
            if (esMenor) {
              toastr.error('Fecha Inicio menor a fecha evolución');
              this.datoAnioInicio();
            } else if (esMayor) {
              toastr.error('Fecha Inicio superior o igual a fecha Vencimiento');
              this.datoAnioInicio();
            } else this.datoHoraInicio();
          } else {
            CON851('37', '37', null, 'error', 'error');
            this.datoAnioInicio();
          }
        },
      );
    },
    datoHoraInicio() {
      [this.form.hraInicio, this.form.minInicio] = this.devolverHora(this.horaEvo);
      validarInputs(
        {
          form: '#dato_hra_inicio',
          orden: '1',
        },
        () => {
          this.datoDiaInicio();
        },
        () => {
          const hora = parseInt(this.horaInicio.substr(0, 2));
          const horaEvo = parseInt(this.horaEvo.substr(0, 2));
          const horaAct = parseInt(this.horaAct.substr(0, 2));
          if (
            hora < 0 ||
            hora > 23 ||
            (hora > horaAct && this.fechaInicio.substr(6, 2) == this.fechaAct.substr(6, 2))
          ) {
            CON851('9Q', '9Q', null, 'error', 'error');
            this.datoHoraInicio();
          } else {
            if (
              this.form.diaInicio.substr(6, 2) == this.fechaAct.substring(6, 2) &&
              hora < horaEvo
            ) {
              toastr.error('Hora inicio superior a hora evolución');
              this.datoHoraInicio();
            } else this.datoMinutosInicio();
          }
        },
      );
    },
    datoMinutosInicio() {
      validarInputs(
        {
          form: '#dato_minutos_inicio',
          orden: '1',
        },
        () => {
          this.datoHoraInicio();
        },
        () => {
          const minuto = parseInt(this.form.minInicio);

          const esMayor =
            parseInt(this.horaAct.substr(2, 2)) > minuto &&
            this.horaInicio.substr(0, 2) == this.horaAct.substr(0, 2) &&
            this.form.diaInicio == this.fechaAct.substr(6, 2);
          const esMenor =
            minuto < parseInt(this.horaEvo.substr(2, 2)) &&
            this.horaInicio.substr(0, 2) == this.horaAct.substr(0, 2) &&
            this.form.diaInicio == this.fechaEvo.substr(6, 2);
          const validaciones = [
            this.form.diaInicio == this.fechaAct.substr(6, 2) && esMayor,
            this.form.diaInicio == this.fechaEvo.substring(6, 2) && esMenor,
          ];
          if (minuto < 0 || minuto > 59) {
            CON851('9Q', '9Q', null, 'error', 'error');
            this.datoMinutosInicio();
          } else {
            //Valida si hora Inicio > hora actual
            validaciones[0]
              ? (CON851('9Q', '9Q', null, 'error', 'error'), this.datoMinutosInicio())
              : //Valida si hora Inicio < hora evolución
              validaciones[1]
              ? (toastr.error('Rango hora < rango hora evolución'), this.datoHoraInicio())
              : this.grabarDatosUnidad();
          }
        },
      );
    },
    // Datos Final Unidad
    datoAnioFinal() {
      [this.form.anioFinal, this.form.mesFinal, this.form.diaFinal] = this.devolverFecha(
        this.fechaAct,
      );
      validarInputs(
        {
          form: '#dato_anio_fin',
          orden: '1',
        },
        () => {
          CON851P(
            '03',
            () => {
              this.datoAnioFinal();
            },
            () => {
              this.traerControlesTransfusiones();
            },
          );
        },
        () => {
          const anio_final = this.form.anioFinal || 0;
          this.validarFecha('anio', anio_final)
            ? this.datoMesFinal()
            : (CON851('03', 'año no valido', null, 'error', 'Error'), this.datoAnioFinal());
        },
      );
    },
    datoMesFinal() {
      validarInputs(
        {
          form: '#dato_mes_fin',
          orden: '1',
        },
        () => {
          this.datoAnioFinal();
        },
        () => {
          const mes_final = this.form.mesFinal || 0;
          this.validarFecha('mes', mes_final)
            ? this.datoDiaFinal()
            : (CON851('03', 'mes no valido', null, 'error', 'Error'), this.datoMesFinal());
        },
      );
    },
    datoDiaFinal() {
      validarInputs(
        {
          form: '#dato_dia_fin',
          orden: '1',
        },
        () => {
          this.datoMesFinal();
        },
        () => {
          const dia_fin = this.form.diaFinal || 0;
          const validaciones = [
            parseInt(this.fechaFin) > parseInt(this.fechaAct),
            parseInt(this.fechaFin) < parseInt(this.fechaEvo),
            parseInt(this.fechaFin < parseInt(this.fechaInicio)),
          ];
          if (this.validarFecha('dia', dia_fin)) {
            validaciones[0]
              ? (toastr.error('Fecha Final es mayor a fecha Actual'), this.datoAnioFinal())
              : validaciones[1]
              ? (toastr.error('Fecha Final es menor a fecha Evolución'), this.datoAnioFinal())
              : validaciones[2]
              ? (toastr.error('Fecha Final es menor a fecha Inicial'), this.datoAnioFinal())
              : this.datoHraFinal();
          } else {
            CON851('37', '37', null, 'error', 'error');
            this.datoAnioFinal();
          }
        },
      );
    },
    datoHraFinal() {
      [this.form.hraFinal, this.form.minFinal] = this.devolverHora(this.horaAct);
      validarInputs(
        {
          form: '#dato_hra_fin',
          orden: '1',
        },
        () => {
          this.datoDiaFinal();
        },
        () => {
          const hora = parseInt(this.horaFinal.substr(0, 2));
          const horaEvo = parseInt(this.horaEvo.substr(0, 2));
          const horaAct = parseInt(this.horaAct.substr(0, 2));
          const horaInicio = parseInt(this.horaInicio.substr(0, 2));
          console.log(this.fechaFin.substr(6, 2), this.fechaAct.substr(6, 2));
          var validaciones = [
            this.fechaFin.substr(6, 2) == this.fechaAct.substr(6, 2) && hora > horaAct,
            this.fechaFin.substr(6, 2) == this.fechaEvo.substr(6, 2) && hora < horaEvo,
            this.fechaFin.substr(6, 2) == this.fechaInicio.substr(6, 2) && hora < horaInicio,
          ];
          if (hora < 0 || hora > 23) {
            CON851('9Q', '9Q', null, 'error', 'error'), this.datoHraFinal();
          } else {
            validaciones[0]
              ? (toastr.error('Hora final mayor a hora Actual'), this.datoHraFinal())
              : validaciones[1]
              ? (toastr.error('Hora final menor a hora Evolución'), this.datoHraFinal())
              : validaciones[2]
              ? (toastr.error('Hora final menor a hora Inicio'), this.datoHraFinal())
              : setTimeout(this.datoMinutosFinal, 100);
          }
        },
      );
    },
    datoMinutosFinal() {
      validarInputs(
        {
          form: '#dato_minutos_fin',
          orden: '1',
        },
        () => {
          setTimeout(this.datoHraFinal, 100);
        },
        () => {
          const minuto = parseInt(this.form.minFinal);
          const validaciones = [
            this.fechaAct.substr(6, 2) == this.fechaFin.substr(6, 2) &&
              this.horaAct.substr(0, 2) == this.horaFin.substr(0, 2) &&
              parseInt(this.fechaHoraAct.substr(10, 2)) > minuto,

            this.fechaEvo.substr(6, 2) == this.fechaFin.substr(6, 2) &&
              this.horaAct.substr(0, 2) == this.horaFin.substr(0, 2) &&
              minuto < parseInt(this.horaEvo.substr(2, 2)),

            parseInt(minuto) < parseInt(this.horaInicio.substr(2, 2)) &&
              this.horaFin.substr(0, 2) == this.horaEvo.substr(0, 2) &&
              this.fechaFin.substr(6, 2) == this.fechaEvo.substr(6, 2),
          ];

          if (minuto < 0 || minuto > 59) {
            CON851('9Q', '9Q', null, 'error', 'error'), this.datoMinutosFinal();
          } else {
            //Valida si hora final > hora actual
            validaciones[0]
              ? (toastr.error('hora fin menor a hora actual'), this.datoHoraFinal())
              : //Valida si hora final < hora evolución
              validaciones[1]
              ? (toastr.error('hora fin menor a hora evolución'), this.datoHoraFinal())
              : //Valida si hora final < hora incio
              validaciones[2]
              ? (toastr.error('hora fin menor a hora inicio'), this.datoHoraFinal())
              : this.grabarDatosUnidad();
          }
        },
      );
    },
    async grabarDatosUnidad() {
      loader('show');
      var regUnidad = this.regUnidad;
      let datos = {datosh: datosEnvio()};
      this.indexUnidad = this.tablaUnidadesTransfusion.length + 1;
      let indice = this.indexUnidad <= 0 ? 1 : this.indexUnidad;
      console.log(this.swunidad, indice, this.indexUnidad);
      try {
        datos.indice = indice;
        datos.paso = '02';
        this.swpaso = this.swunidad ? 2 : 4;
        datos.llaveEvo = this.llaveEvo;

        datos.unserv = this.unserv;
        datos.hab = this.evolucion.hab || '    ';
        datos.medico = this.medico.identificacion.toString().replace(/\,/g, '').padStart(10, '0');

        datos.nroUnidad = this.form.nroUnidad;
        datos.fechaVence = this.fechaVence;
        datos.fechaIni = this.fechaInicio;
        datos.horaIni = this.horaInicio;
        datos.fechaFin = this.fechaFin || 0;
        datos.horaFin = this.horaFin || 0;

        console.log('grabando registro Unidad ' + this.form.nroUnidad, {datos});

        this.grabarRegistros(
          datos,
          () => {
            if (datos.fechaFin > 0) {
              this.regUnidad.estado = 'cerrado';
              this.traerUnidadesTransfusion();
            } else {
              this.regUnidad.estado = 'abierto';
              this.capturarSignosUnidad();
            }
          },
          () => {
            setTimeout(this.traerUnidadesTransfusion, 200);
          },
        );
      } catch (e) {
        console.error(e);
        if (['vencido', 'cerrado'].includes(regUnidad.estado)) this.traerUnidadesTransfusion();
        else if (['abierto', 'nuevo'].includes(regUnidad.estado)) this.datoUnidadTransfusion();
        else this.traerControlesTransfusiones();
      }
    },
    /*****CAPTURA SIGNOS X UNIDAD****/
    async capturarSignosUnidad() {
      //Inicializar datos signos
      this.indexSignos = this.nroCapturaSignos;
      this.sw.signos = true;
      [this.form.anioSignos, this.form.mesSignos, this.form.diaSignos] = await this.devolverFecha(
        this.fechaEvo,
      );
      [this.form.hraSignos, this.form.minSignos] = await this.devolverHora(this.fechaHora);

      //Evaluar si se supero limite Signos
      const limite = this.limiteCapturaSignos;
      let ultIndice = parseInt(this.indexSignos);

      ultIndice = ultIndice < 0 ? 0 : ultIndice;
      if (ultIndice < limite) this.datoAnioSignos();
      else setTimeout(this.traerUnidadesTransfusion, 400);
    },
    datoAnioSignos() {
      [this.form.anioSignos, this.form.mesSignos, this.form.diaSignos] = this.devolverFecha(
        this.fechaAct,
      );
      [this.form.hraSignos, this.form.minSignos] = this.devolverHora(this.horaAct);
      validarInputs(
        {
          form: '#dato_anio_signos',
          orden: '1',
        },
        () => {
          CON851P('03', this.datoAnioSignos, () => {
            this.sw.signos = false;
            this.traerUnidadesTransfusion();
          });
        },
        () => {
          const anio_signos = this.form.anioSignos || 0;
          this.validarFecha('anio', anio_signos)
            ? this.datoMesSignos()
            : (CON851('03', 'año no valido', null, 'error', 'Error'), this.datoAnioSignos());
        },
      );
    },
    datoMesSignos() {
      validarInputs(
        {
          form: '#dato_mes_signos',
          orden: '1',
        },
        () => {
          this.datoAnioSignos();
        },
        () => {
          const mes_signos = this.form.mesSignos || 0;
          this.validarFecha('mes', mes_signos)
            ? this.datoDiaSignos()
            : (CON851('03', 'mes no valido', null, 'error', 'Error'), this.datoMesSignos());
        },
      );
    },
    datoDiaSignos() {
      validarInputs(
        {
          form: '#dato_dia_signos',
          orden: '1',
        },
        () => {
          this.datoMesSignos();
        },
        () => {
          const dia_signos = this.form.diaSignos || 0;
          if (this.validarFecha('dia', dia_signos)) {
            const esMenor = parseInt(this.fechaSignos) < parseInt(this.fechaEvo) ? true : false;
            if (esMenor) {
              toastr.error('Fecha Signos menor a fecha evolución');
              this.datoAnioSignos();
            } else {
              parseInt(this.fechaSignos) < parseInt(this.fechaInicio)
                ? (toastr.error('Fecha Signos menor a fecha Inicio'), this.datoAnioSignos())
                : this.datoHraSignos();
            }
          } else {
            CON851('37', '37', null, 'error', 'error'), this.datoAnioSignos();
          }
        },
      );
    },
    datoHraSignos() {
      validarInputs(
        {
          form: '#dato_hra_signos',
          orden: '1',
        },
        () => {
          this.datoDiaSignos();
        },
        () => {
          const hora = parseInt(this.horaSignos.substr(0, 2));
          const horaEvo = parseInt(this.horaEvo.substr(0, 2));
          if (hora < 0 || hora > 23) {
            CON851('9Q', '9Q', null, 'error', 'error');
            this.datoHraSignos();
          } else if (this.fechaSignos == this.fechaEvo && hora > horaEvo)
            toastr.error('Hora final superior a hora evolución'), this.datoHraSignos();
          else this.datoMinutosSignos();
        },
      );
    },
    datoMinutosSignos() {
      validarInputs(
        {
          form: '#dato_minutos_signos',
          orden: '1',
        },
        () => {
          this.datoHraSignos();
        },
        () => {
          const minuto = parseInt(this.form.minSignos);

          const esMayor = parseInt(this.horaAct.substr(2, 2)) > minuto;
          const esMenor = minuto < parseInt(this.horaEvo.substr(2, 2));

          const validaciones = [
            this.fechaAct == this.fechaSignos && esMayor,
            this.fechaHoraEvo == this.fechaSignos && esMenor,
          ];

          if (minuto < 0 || minuto > 59) {
            CON851('9Q', '9Q', null, 'error', 'error');
            this.datoMinutosSignos();
          } else {
            //Valida si hora Signos > hora actual
            if (validaciones[0]) {
              CON851('9Q', '9Q', null, 'error', 'error');
              this.datoMinutosSignos();
            }
            //Valida si hora Signos < hora evolución
            else if (validaciones[1]) {
              toastr.error('Rango hora < rango hora evolución');
              this.datoHraSignos();
            } else {
              this.datoTens1Signos();
            }
          }
        },
      );
    },
    datoTens1Signos() {
      validarInputs(
        {
          form: '#dato_signos_tens1',
          orden: '1',
        },
        () => {
          this.datoMinutosSignos();
        },
        () => {
          const tens1 = parseInt(this.form.tens1Signos) || 0;
          this.form.tens1Signos = tens1;
          const validaciones = [tens1 == 0, tens1 > 300];
          validaciones[0]
            ? (CON851('02', '02', null, 'error', 'error'), this.datoTens1Signos())
            : validaciones[1]
            ? (CON851('03', '03', null, 'error', 'error'), this.datoTens1Signos())
            : this.datoTens2Signos();
        },
      );
    },
    datoTens2Signos() {
      validarInputs(
        {
          form: '#dato_signos_tens2',
          orden: '1',
        },
        () => {
          this.datoTens1Signos();
        },
        () => {
          const tens2 = parseInt(this.form.tens2Signos) || 0;
          this.form.tens2Signos = tens2;
          const validaciones = [tens2 == 0, tens2 > 300];
          validaciones[0]
            ? (CON851('02', '02', null, 'error', 'error'), this.datoTens2Signos())
            : validaciones[1]
            ? (CON851('03', '03', null, 'error', 'error'), this.datoTens2Signos())
            : this.datoTempSignos();
        },
      );
    },
    datoTempSignos() {
      validarInputs(
        {
          form: '#dato_signos_temperatura',
          orden: '1',
        },
        () => {
          this.datoTens2Signos();
        },
        () => {
          const temperatura = parseFloat(this.form.tempSignos) || 0;
          this.form.tempSignos = temperatura;
          const validaciones = [
            temperatura == 0,
            temperatura < 35.5 || temperatura > 38,
            temperatura > 45,
          ];
          validaciones[0]
            ? (CON851('02', '02', null, 'error', 'error'), this.datoTempSignos())
            : validaciones[1]
            ? (CON851('BM', 'BM', null, 'error', 'error'), this.datoTempSignos())
            : validaciones[2]
            ? (CON851('03', '03', null, 'error', 'error'), this.datoTempSignos())
            : this.datoFCardSignos();
        },
      );
    },
    datoFCardSignos() {
      validarInputs(
        {
          form: '#dato_signos_fcard',
          orden: '1',
        },
        () => {
          this.datoTempSignos();
        },
        () => {
          const fcard = parseInt(this.form.fcardSignos) || 0;
          this.form.fcardSignos = fcard;
          const validaciones = [fcard == 0, fcard > 200];
          validaciones[0]
            ? (CON851('02', '02', null, 'error', 'error'), this.datoFCardSignos())
            : validaciones[1]
            ? (CON851('03', '03', null, 'error', 'error'), this.datoFCardSignos())
            : this.datoDiuresisSignos();
        },
      );
    },
    datoDiuresisSignos() {
      validarInputs(
        {
          form: '#dato_signos_diuresis',
          orden: '1',
        },
        () => {
          this.datoFCardSignos();
        },
        () => {
          const diuresis = parseInt(this.form.diuresisSignos) || 0;
          this.form.diuresisSignos = diuresis;
          const validaciones = [diuresis == 0];
          validaciones[0]
            ? (CON851('02', '02', null, 'error', 'error'), this.datoDiuresisSignos())
            : validaciones[1]
            ? (CON851('03', '03', null, 'error', 'error'), this.datoDiuresisSignos())
            : this.llenarRegSignos();
        },
      );
    },
    async llenarRegSignos() {
      var indice = parseInt(this.indexSignos) - 1;
      this.tablaSignosUnidadTransfusion[indice] = {
        fecha: this.fechaSignos,
        hora: this.horaSignos,
        tens1: this.form.tens1Signos,
        tens2: this.form.tens2Signos,
        temp: this.form.tempSignos,
        fcard: this.form.fcardSignos,
        diuresis: this.form.diuresisSignos,
      };
      console.log({
        indice,
        reg: this.tablaSignosUnidadTransfusion[indice + 1],
      });
      await this.grabarSignosUnidad();
    },
    async grabarSignosUnidad() {
      loader('show');
      let datos = {datosh: datosEnvio()};
      var tabla = this.tablaSignosUnidadTransfusion;
      var stringSignos = '';
      try {
        this.swpaso = 3;
        datos.paso = '03';
        datos.llaveEvo = this.llaveEvo;
        datos.medico = this.medico.identificacion.toString().replace(/\,/g, '').padStart(10, '0');
        datos.unserv = this.unserv;
        datos.hab = this.evolucion.hab || '    ';
        datos.indice = this.regUnidad.indice;

        tabla.forEach((el, index) => {
          let i = String(index + 1);
          stringSignos = [
            el.fecha,
            el.hora,
            el.tens1,
            el.tens2,
            el.temp,
            el.fcard,
            el.diuresis,
          ].join('|');
          datos[`tablaSignos_${i.padStart(3, '0')}`] = stringSignos;
        });
        console.log(
          'grabando Control signos ' +
            parseInt(this.indexSignos) -
            1 +
            ' de ' +
            this.limiteCapturaSignos,
          {datos},
        );

        this.grabarRegistros(
          datos,
          () => {
            this.form.anioSignos = null;
            this.form.mesSignos = null;
            this.form.diaSignos = null;
            this.form.hraSignos = null;
            this.form.minSignos = null;
            this.form.tens1Signos = null;
            this.form.tens2Signos = null;
            this.form.tempSignos = null;
            this.form.fcardSignos = null;
            this.form.diuresisSignos = null;
            this.traerUnidadesTransfusion();
          },
          this.datoDiuresisSignos,
        );
      } catch (e) {
        console.error(e);
        this.terminarEjecucion();
        // this.datoDiuresisSignos();
      }
    },
    /*****CERRAR CONTROL TRANSFUSIONES***/
    finalizarControlTransfusiones() {
      this.sw.cierre = true;
      CON851P(
        '52',
        () => {
          setTimeout(this.traerControlesTransfusiones, 200);
        },
        this.cierreTransfusion,
      );
    },
    async cierreTransfusion() {
      [this.form.anioCierre, this.form.mesCierre, this.form.diaCierre] = this.devolverFecha(
        this.fechaAct,
      );
      this.datoAnioCierre();
    },
    datoAnioCierre() {
      validarInputs(
        {
          form: '#dato_anio_cierre',
          orden: '1',
        },
        () => {
          CON851P('03', this.datoAnioCierre, this.traerControlesTransfusiones);
        },
        () => {
          const anio_cierre = this.form.anioCierre || 0;
          this.validarFecha('anio', anio_cierre)
            ? this.datoMesCierre()
            : (CON851('03', 'año no valido', null, 'error', 'Error'), this.datoAnioInicio());
        },
      );
    },
    datoMesCierre() {
      validarInputs(
        {
          form: '#dato_mes_cierre',
          orden: '1',
        },
        () => {
          this.datoAnioCierre();
        },
        () => {
          const mes_cierre = this.form.mesCierre || 0;
          this.validarFecha('mes', mes_cierre)
            ? this.datoDiaCierre()
            : (CON851('03', 'mes no valido', null, 'error', 'Error'), this.datoMesCierre());
        },
      );
    },
    datoDiaCierre() {
      validarInputs(
        {
          form: '#dato_dia_cierre',
          orden: '1',
        },
        () => {
          this.datoMesCierre();
        },
        () => {
          const dia_cierre = this.form.diaCierre || 0;
          if (this.validarFecha('dia', dia_cierre)) {
            const esMenor = parseInt(this.fechaCierre) < parseInt(this.fechaEvo) ? true : false;
            const esMayor = parseInt(this.fechaCierre) > parseInt(this.fechaAct) ? true : false;

            if (esMenor) {
              toastr.error('Fecha Cierre menor a fecha evolución');
              this.datoAnioCierre();
            } else if (esMayor) {
              toastr.error('Fecha Cierre superior o igual a fecha Actual');
              this.datoAnioCierre();
            } else this.datoHraCierre();
          } else {
            CON851('37', '37', null, 'error', 'error');
            this.datoAnioCierre();
          }
        },
      );
    },
    datoHraCierre() {
      [this.form.hraCierre, this.form.minCierre] = this.devolverHora(this.horaAct);
      validarInputs(
        {
          form: '#dato_hra_cierre',
          orden: '1',
        },
        () => {
          this.datoDiaCierre();
        },
        () => {
          const hora = parseInt(this.horaCierre.substr(0, 2));
          const horaAct = parseInt(this.horaAct.substr(0, 2));

          if (hora < 0 || hora > 23) {
            CON851('9Q', '9Q', null, 'error', 'error');
            this.datoHraCierre();
          } else if (this.diaCierre == this.fechaAct.substring(6, 2) && hora > horaAct) {
            toastr.error('Hora Cierre superior a hora actual');
            this.datoHraCierre();
          } else this.datoMinutosCierre();
        },
      );
    },
    datoMinutosCierre() {
      validarInputs(
        {
          form: '#dato_minutos_cierre',
          orden: '1',
        },
        () => {
          this.datoHraCierre();
        },
        () => {
          const minuto = parseInt(this.form.minCierre);

          const esMayor = parseInt(this.horaAct.substr(2, 2)) > minuto;
          const esMenor = minuto < parseInt(this.horaEvo.substr(2, 2));

          const validaciones = [
            this.form.diaCierre == this.fechaAct.substr(6, 2) && esMayor,
            this.form.diaCierre == this.fechaEvo.substring(6, 2) && esMenor,
          ];
          if (minuto < 0 || minuto > 59) {
            CON851('9Q', '9Q', null, 'error', 'error');
            this.datoMinutosCierre();
          } else {
            //Valida si hora Cierre > hora actual
            validaciones[0]
              ? (CON851('9Q', '9Q', null, 'error', 'error'), this.datoMinutosCierre())
              : //Valida si hora Cierre < hora evolución
              validaciones[1]
              ? (toastr.error('Rango hora < rango hora evolución'), this.datoHoraCierre())
              : this.datoReaccion();
          }
        },
      );
    },
    datoReaccion() {
      validarInputs(
        {
          form: '#dato-reaccion',
          orden: '1',
        },
        () => {
          this.datoMinutosCierre();
        },
        () => {
          this.form.reaccionTransfusion = this.form.reaccionTransfusion || 'N';
          this.datoDevolucion();
        },
      );
    },
    datoDevolucion() {
      validarInputs(
        {
          form: '#dato_devolucion',
          orden: '1',
        },
        () => {
          this.datoReaccion();
        },
        () => {
          this.form.devolucionTransfusion = this.form.devolucionTransfusion || 'N';
          this.datoVolumen();
        },
      );
    },
    datoVolumen() {
      validarInputs(
        {
          form: '#dato_volumen',
          orden: '1',
        },
        () => {
          this.datoDevolucion();
        },
        () => {
          const volumen = Number(this.form.volumenTransfusion) || 0;
          this.form.volumenTransfusión = volumen;
          volumen == 0
            ? (CON851('03', '03', null, 'error', 'erro'), this.datoVolumen())
            : this.datoCaracteristicaCierre();
        },
      );
    },
    datoCaracteristicaCierre() {
      validarInputs(
        {
          form: '#dato_carac_cierre',
          orden: '1',
        },
        () => {
          this.datoVolumen();
        },
        () => {
          const carac = String(this.form.caracCierre) || ' ';
          this.form.caracCierre = carac.toUpperCase();
          this.datoOrinaPos();
        },
      );
    },
    datoOrinaPos() {
      validarInputs(
        {
          form: '#dato_orina_pos',
          orden: '1',
        },
        () => {
          this.datoCaracteristicaCierre();
        },
        () => {
          const orinaPos = String(this.form.caracOrinaPos) || ' ';
          this.form.caracOrinaPos = orinaPos.toUpperCase();
          this.datoTratamiento();
        },
      );
    },
    datoTratamiento() {
      validarInputs(
        {
          form: '#dato_tratamiento',
          orden: '1',
        },
        () => {
          this.datoOrinaPos();
        },
        () => {
          const tratamiento = String(this.form.tratamientoTransfusion) || ' ';
          this.form.tratamientoTransfusion = tratamiento.toUpperCase();
          this.evaluarDevolucion();
        },
      );
    },
    async evaluarDevolucion() {
      if (this.devolucion) this.grabarCierreTransfusion();
      else this.datoMotivoDevolucion();
    },
    datoMotivoDevolucion() {
      validarInputs(
        {
          form: '#dato_moti_devol',
          orden: '1',
        },
        () => {
          this.datoTratamiento();
        },
        () => {
          const motivoDevolucion = String(this.form.motivoDevolucionTransfusion) || ' ';
          this.form.motivoDevolucionTransfusion = motivoDevolucion.toUpperCase();
          this.datoEstadoComponenteSang();
        },
      );
    },
    datoEstadoComponenteSang() {
      validarInputs(
        {
          form: '#dato_estado',
          orden: '1',
        },
        () => {
          this.datoTratamiento();
        },
        () => {
          const estadoComponente = String(this.form.estadoProductoTransfusion) || ' ';
          this.form.estadoProductoTransfusion = estadoComponente.toUpperCase();
          sw.fin = true;
          this.datoObservaciones();
        },
      );
    },
    datoObservaciones() {
      validarInputs(
        {
          form: '#dato_observaciones',
          orden: '1',
        },
        () => {
          this.sw.fin = false;
          this.datoEstadoComponenteSang();
        },
        () => {
          const observaciones = String(this.form.observacionesTransfusion) || ' ';
          this.form.observacionesTransfusion = observaciones.toUpperCase();
          sw.fin = false;
          this.grabarCierreTransfusion();
        },
      );
    },
    grabarCierreTransfusion() {
      loader('show');
      let datos = {datosh: datosEnvio() + this.historia.llave_hc};
      try {
        this.swpaso = 5;
        datos.paso = '04';
        datos.llaveEvo = this.llaveEvo;
        datos.medico = this.medico.identificacion.toString().replace(/\,/g, '').padStart(10, '0');
        datos.unserv = this.unserv;
        datos.hab = this.evolucion.hab || '    ';

        datos.fecha_cierre = this.fechaCierre;
        datos.hora_cierre = this.horaCierre;
        datos.reaccion_cierre = this.form.reaccionTransfusion;
        datos.volumen_cierre = this.form.volumenTransfusion;

        datos.tratamiento_cierre = this.form.tratamientoTransfusion;
        datos.caracteristicas_cierre = this.form.caracCierre;

        datos.devolucion_cierre = this.form.devolucionTransfusion.toUpperCase();

        datos.estadoComponente_cierre = this.form.estadoProductoTransfusion;
        datos.motivoDevolucion_cierre = this.form.motivoDevolucionTransfusion;
        datos.observacion_cierre = this.form.observacionesTransfusion;

        console.log('grabandoCierreTransfusion', {datos});

        const callback = this.traerControlesTransfusiones;
        const escCallback = this.datoAnioCierre;
        this.grabarRegistros(datos, callback, escCallback);
      } catch (e) {
        console.error(e);
        this.datoAnioCierre();
      }
    },
    /* FIN -- FLUJO FORMULARIO CONTROL DE TRANSFUSIONES*/
    /*****OTRAS RUTINAS***/
    async grabarRegistros(datos, callback, esc_callback) {
      /* this.swpaso
        1: 'Ficha Transfusión | Inicio'
        2: 'Unidad Transfusión  grabado'
        3: 'Signos x Unidad     grabado'
        4: 'Cierre unidad       grabado'
        5: 'Cierre Transfusion  grabado'
    */
      await postData(datos, get_url('app/HICLIN/HC52A-1.DLL'))
        .then((data) => {
          loader('hide');
          if (data == 1) {
            console.log('Éxito', this.msjGrabarDatos);
            toastr.success(this.msjGrabarDatos);
            eval(callback)();
          } else {
            console.error('Error', this.msjErrorGrabarDatos);
            toastr.error(this.msjErrorGrabarDatos);
            eval(esc_callback)();
          }
        })
        .catch((e) => {
          console.error(e);
          toastr.error(this.msjErrorGrabarDatos);
          eval(esc_callback)();
        });
    },
    async ventanaUnserv() {
      await SER873(
        () => {
          this.traerControlesTransfusiones();
        },
        this.datoUnidad,
        1,
      );
    },
    devolverFecha: (fecha) => [
      fecha ? parseInt(fecha.substring(0, 4)) : '',
      fecha ? parseInt(fecha.substring(4, 6)).toString().padStart(2, '0') : '',
      fecha ? parseInt(fecha.substring(6, 8)).toString().padStart(2, '0') : '',
    ],
    devolverHora: (hora) => [
      hora ? parseInt(hora.substring(0, 2)).toString().padStart(2, '0') : '',
      hora ? parseInt(hora.substring(2, 4)).toString().padStart(2, '0') : '',
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
        mes: f < 1 || f > 12,
        dia: f < 1 || f > 31,
        fin: _validarFecha(check_fecha[0], check_fecha[1], check_fecha[2]) && prev <= next,
      };
      return t == 'fin' ? fecha[t] : !fecha[t];
    },
    async traerControlesTransfusiones() {
      console.log('Consultando Controles Transfusiones');
      await postData(
        {datosh: `${datosEnvio()}${this.llaveHC}| `, paso: '01'},
        get_url('APP/HICLIN/HC52A.DLL'),
      ).then(async (data) => {
        this.tablaTransfusiones = [];
        let colores = Object.values(this.colores);
        let estados = Object.keys(this.estados);
        data.EVO_TRANSFUSION.pop();
        var tabla = data.EVO_TRANSFUSION;
        tabla.forEach((el, index) => {
          let cierre = el.cierre;
          this.tablaTransfusiones.push({
            item: index + 1,
            cama: null,
            fechaIni: el.fecha || null,
            horaIni: el.hora || null,
            fecha: el.fecha ? _editarFecha(el.fecha) : ' / / ',
            hora: el.hora ? _editHora(el.hora) : ' : ',
            unserv: el.unserv,
            llave: el.llave,
            operElab: el.oper_elab || ' ',
            oper: el.nombre_oper || ' ',
            color: colores[el.estado - 1],
            estado: estados[el.estado - 1],
            productoTransfusion: el.producto_sang || ' ',
            grupoSangTransfusion: el.grp_sanguineo,
            rhSangTransfusion: el.rh_sanguineo,
            caracOrinaAnt: el.carac_orina,
            //Cierre transfusion
            fechaFin: null,
            horaFin: null,
            fechaCierre: cierre.fecha_ctransf ? _editarFecha(cierre.fecha_ctransf) : ' / / ',
            horaCierre: cierre.hora_ctransf ? _editHora(cierre.hora_ctransf) : ' : ',
            volumenTransfusion: cierre.total_ctransf,
            reaccionTransfusion: cierre.reaccion_ctransf,
            caracOrinaPos: cierre.orinapos_ctransf,
            caracCierre: cierre.carac_ctransf,
            tratamientoTransfusion: cierre.tratamiento_ctransf,
            devolucionTransfusion: cierre.devolucion_ctransf,
            motivoDevolucionTransfusion: cierre.devolucion_ctransf
              ? cierre.motivo_devol_transf
              : '',
            estadoProductoTransfusion: cierre.devolucion_ctransf
              ? cierre.compsanguineo_ctransf
              : '',
          });
        });
        if (this.idOpcion != '07CA') {
          this.tablaTransfusiones.unshift({
            fecha: ' / / ',
            hora: ' : ',
            fechaIni: null,
            horaIni: null,
            operElab: null,
            oper: localStorage.Usuaio,
            color: Object.values(this.colores)[3],
            estado: Object.keys(this.estados)[3],
            unserv: null,
            indice: 1,
            productoTransfusion: 'NUEVA  TRANSFUSIÓN',
            fechaCierre: null,
            horaCierre: null,
            fechaFin: null,
            horaFin: null,
            tablaUnidades: [],
          });
        }
        this.ventanaConsultaControles();
      });
    },
    async traerUnidadesTransfusion() {
      var _this = this;
      var tabla = [];
      this.tablaSignosUnidadTransfusion = [];

      var datosh = [datosEnvio(), `${this.llaveHC}|`, localStorage.Usuario.trim()].join('');
      const url = get_url('APP/HICLIN/HC52A.DLL');
      await postData({datosh, paso: '02', llaveEvo: this.llaveEvo}, url).then((data) => {
        data.UNIDADES_CONTROL.pop();
        tabla = data.UNIDADES_CONTROL;
        tabla = tabla.map((t) => {
          return {
            ...t,
            color: Object.values(_this.colores)[parseInt(t.estado) - 1],
            estado: Object.keys(_this.estados)[parseInt(t.estado) - 1],
          };
        });

        this.tablaUnidadesTransfusion = tabla;

        let limiteUnidades = this.limiteUnidades;
        tabla = [...this.tablaUnidades];

        let tablaUnidades = tabla.filter((t) => parseInt(t.fechaFin) > 0) || [];

        if (tablaUnidades.length >= limiteUnidades) {
          if (this.idOpcion == '052A') this.finalizarControlTransfusiones();
        } else {
          if (this.idOpcion == '052A') setTimeout(this.ventanaUnidadesTransfusion, 300);
        }
      });
    },
    async traerHistoriaPaciente() {
      console.log('cargando historia');
      var datosh = [datosEnvio(), `${this.llaveHC}|`, localStorage.Usuario.trim(), '|1|'].join('');
      let _this = this;
      const url = get_url('APP/HICLIN/HC_PRC.DLL');
      await postData({datosh}, url).then((data) => {
        _this.hcprc = data.HCPAC;
        _this.traerControlesTransfusiones();
      });
      // .catch(() => _this.errorJsonConsulta('hc'));
    },
    async traerUnidadesServicio() {
      console.log('cargando unidades de servicio');
      let _this = this;
      const url = get_url('APP/SALUD/SER873.DLL');
      await postData({datosh: datosEnvio()}, url).then(function (data) {
        _this.unidadesServicio = data.UNSERV;
        _this.unidadesServicio.length > 1 ? _this.unidadesServicio.pop() : _this.unidadesServicio;
        loader('hide');
      });
      // .catch(() => _this.errorJsonConsulta('un'));
    },
    async traerCamas() {
      console.log('cargando camas');
      let _this = this;
      const url = get_url('APP/HICLIN/HC809.DLL');
      await postData({datosh: datosEnvio()}, url).then(function (data) {
        _this.camas = data.CAMAS;
        _this.camas.length > 1 ? _this.camas.pop() : _this.camas;
        loader('hide');
        _this.cargarDatosEvo();
      });
      // .catch((e) => console.error(e), this.errorJsonConsulta('un'));
    },
    async buscarDiagnosticos() {
      console.log('consultando diagnosticos');
      let diagnostico = '';
      const tabla_diag = this.hcprc.rips.tabla_diag;
      var datos_envio = [datosEnvio(), '2|', localStorage.Usuario].join('');

      const obtenerDiagnostico = async function (cod) {
        return new Promise(async (resolve) => {
          var url = get_url('APP/SALUD/SER851.DLL');
          await postData({datosh: datos_envio, codigo: cod.padStart(4, ' '), paso: 1}, url)
            .then(function (data) {
              diagnostico = data;
            })
            .catch((err) => {
              console.log(err, `error al consultar diagnostico [${cod}]`);
              loader('hide');
              _this.terminarEjecucion();
            });
          resolve(diagnostico);
        });
      };
      this.tablaDiagnosticos = null;
      this.tablaDiagnosticos = [];
      for (let dx of tabla_diag) {
        if (dx.diagn != '') {
          const consulta = await obtenerDiagnostico(dx.diagn);
          console.log(consulta);
          if (consulta) {
            const id = dx.nro;
            let codigo = consulta.COD_ENF || 0;
            const nombre_enf = consulta.NOMBRE_ENF.replace(/\�/g, 'Ñ').trim();
            this.tablaDiagnosticos.push({
              cod: codigo,
              descrip: nombre_enf.toUpperCase(),
            });
          }
          this.tablaDiagnosticos = this.tablaDiagnosticos;
        }
      }
    },
    ventanaConsultaControles() {
      var _this = this;
      var tabla = [...this.tablaTransfusiones];
      _ventanaDatos({
        titulo: 'Consulta Controles',
        columnas: [
          {value: 'fecha', label: 'FECHA'},
          {value: 'hora', label: 'HORA'},
          {value: 'productoTransfusion', label: 'PRODUCTO'},
          {value: 'operElab', label: 'OPERADOR'},
          {value: 'fechaCierre', label: 'FECHA CIERRE'},
          {value: 'horaCierre', label: 'HORA CIERRE'},
        ],
        data: tabla,
        orden: false,
        callback_esc: this.terminarEjecucion,
        ancho: window.innerWidth <= 1102 ? '95%' : '90%',
        callback: function (data) {
          console.log('seleccionada', data);
          _this.regTransfusion = data;
          _this.regTransfusion.productoTransfusion =
            data.estado != 'nuevo' ? data.productoTransfusion : '';
          if (_this.regTransfusion.estado != 'cerrado') _this.cargarDatosTransfusion();
          else _this.ventanaConsultaControles();
        },
      });
    },
    ventanaUnidadesTransfusion() {
      var _this = this;
      var tabla = this.tablaUnidades;
      tabla = this.tablaUnidades.filter((t) => t.fechaIni != '') || [];
      if (tabla.length < this.limiteUnidades) {
        tabla.unshift({
          nroUnidad: 'NUEVA UNIDAD',
          color: Object.values(_this.colores)[3],
          estado: Object.keys(_this.estados)[3],
          indice: 1,
          fechaVence: '',
          fechaIni: '',
          horaIni: '',
          fechaFin: '',
          horaFin: '',
          fechaVencimiento: '0000/00/00',
          fechaInicio: '0000/00/00',
          horaInicio: '00:00',
          fechaFinal: '0000/00/00',
          horaFinal: '00:00',
        });
      }
      _ventanaDatos({
        titulo: 'Unidades de transfusión',
        columnas: [
          {value: 'nrounidad', label: 'NRO UNIDAD'},
          {value: 'fechaVencimiento', label: 'FECHA VENCE'},
          {value: 'fechaInicio', label: 'FECHA INICIO'},
          {value: 'horaInicio', label: 'HORA INICIO'},
          {value: 'fechaFinal', label: 'FECHA FINAL'},
          {value: 'horaFinal', label: 'HORA FINAL'},
        ],
        data: tabla,
        orden: false,
        footer_global: 'F3 - Salir y guardar &nbsp;&nbsp;&nbsp;&nbsp; F6 Finalizar la unidad',
        callback_esc: () => {
          _this.traerControlesTransfusiones();
        },
        ancho: window.innerWidth <= 1102 ? '95%' : '90%',
        callback: function (data) {
          console.log('seleccionada', data);
          _this.sw.unidad = false;
          _this.regUnidad = data;
          _this.cargarDatosUnidad();
        },
        event_f3: (data) => {
          console.log('presione f3', data);
          _this.sw.unidad = false;
          CON851P('03', _this.traerUnidadesTransfusion, _this.terminarEjecucion);
        },
        event_f6: async (data) => {
          console.log('presione f6', data);
          _this.sw.unidad = true;
          _this.regUnidad = data;
          _this.cargarDatosUnidad();
        },
      });
    },
    ventanaCamas() {
      _ventanaDatos({
        titulo: 'VENTANA DE CAMAS',
        columnas: ['COD', 'DESCRIPCION', 'DESCRIP_EST'],
        data: this.camas,
        callback_esc: this.datoCama,
        callback: function (data) {
          this.evolucion.cama = data.COD.trim();
          this.form.cama = data.COD + '. ' + data.DESCIPCION;
          this.datoProductoTransfusion();
        },
      });
    },
    terminarEjecucion() {
      delete this.data;
      this.data = this.original_data;
      _regresar_menuhis();
    },
    errorJsonConsulta(tipo) {
      let [t, m, e, te1, te2] = ['', 'Error trayendo datos', null, 'error', 'error'];

      let objErrores = {
        'un': () => (t = 'Unidades servicio'),
        'pr': () => (t = 'Profesionales'),
        'hc': () => (t = 'Historia clinica'),
        'ci': () => (t = 'Ciudades'),
        'pa': () => (t = 'Paises'),
        'ct': () => (t = 'Registros controles'),
        '05': () => (t = `Control ya existente: ${this.llave_w}`),
      };
      loader('hide');
      eval(objErrores[tipo]);

      CON851(t, m, e, te1, te2);
      t != '05' ? _regresar_menuhis() : false;
    },
  },
});

function devolverSN(val) {
  return val.toUpperCase() == 'S' && isNaN(val) ? 'S' : 'N';
}
function lowerCaseKeys(obj) {
  obj = Object.keys(obj).reduce(
    (c, k) => ((c[k.toLowerCase().replace(/\-/g, '_')] = obj[k]), c),
    {},
  );
  return obj;
}
