// SOLICITUD DE REFENRIA - DAVID.M - 11-01-2020

new Vue({
  el: "#HC607",
  data: {
    sw_var: {
      acomp: false,
    },
    params_ser110c_ac: {
      estado: false,
      _siguiente: false,
      _atras: false,
    },
    _unserv: [],
    _tipoMacro: [],
    _codigos: [],
    global_HC607: {
      año_HC607: "",
      mes_HC607: "",
      dia_HC607: "",
      hora_HC607: "",
      min_HC607: "",
      medico_HC607: "",
      descripMedico_HC607: "",
      servIni_HC607: "",
      consecutivo_HC607: "",
      formato_HC607: "",
      acomp_HC607: "",
      descripAcomp_HC607: "",
      espec_HC607: "",
      descripEspec_HC607: "",
      tipoMacro_HC607: "",
      descripTipoMacro_HC607: "",
      codMacro_HC607: "",
      descripCodMacro_HC607: "",
      viaMacro_HC607: "",
      descripViaMacro_HC607: "",
      pendiente: "",
      tipoFormato_HC607: 0,
      edad_HC607: '',
      diagnosticos: [
        { cod: '', descrip: '' },
        { cod: '', descrip: '' },
        { cod: '', descrip: '' },
        { cod: '', descrip: '' },
        { cod: '', descrip: '' },
      ],
      salida_HC607: '',
      remitido_HC607: '',
      nivelAtencion_HC607: '',
      tabla_epi: ''
    },
    banderaSalir: 0,
    llave_hc: $_REG_HC.llave_hc,
    fecha_act: moment().format("YYYYMMDD"),
    hora_act: moment().format("HHmm"),
    dataArray: new Object(),
    data_evo: new Object(),
    admin_w: localStorage.Usuario,
    acomp: {
      id_AC: '',
      tipoId_AC: '',
      apellido1_AC: '',
      apellido2_AC: '',
      nombre1_AC: '',
      nombre2_AC: '',
      telefono_AC: '',
      ciudad_AC: '',
      descripCiudad_AC: '',
      direccion_AC: '',
      descrip: '',
      novedad: 7
    },
    reg_epi: {}
  },
  components: {
    acomp: component_acomp,
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    $this = this;
    this._cargarEnfermedades_HC607();
    await this._cargarProfesionales_HC607();
  },
  methods: {
    async leerHistoria() {
      if ($_REG_HC.novedad_hc == '7') {
        CON851('01', '01', null, 'error', 'error');
        this.salir_HC607();
      } else {
        switch ($_REG_HC.edad_hc.unid_edad) {
          case 'D': $this.unid_edad_evo_w = 1; break;
          case 'M': $this.unid_edad_evo_w = 2; break;
          case 'A': $this.unid_edad_evo_w = 3; break;
          default: $this.unid_edad_evo_w = 0; break;
        }
        $this.vlr_edad_evo_w = $_REG_HC.edad_hc.vlr_edad;

        loader('show');
        await this._leerDetalles_HC607();
        loader('hide');
        this.validarMedico_HC607()
      }
    },

    validarMedico_HC607() {
      this.global_HC607.medico_HC607 = $_REG_PROF.IDENTIFICACION;
      if ($_REG_PROF.IDENTIFICACION == 17329215) {
        validarInputs(
          {
            form: "#validarMedico_HC607",
          },
          () => {
            this.salir_HC607();
          },
          () => {
            this.leerMedico_HC607();
          }
        );
      } else {
        this.global_HC607.medico_HC607 = $_REG_PROF.IDENTIFICACION;
        this.global_HC607.descripMedico_HC607 = $_REG_PROF.NOMBRE;
        this.leerMedico_HC607();
      }
    },

    leerMedico_HC607() {
      this.busqProf = this._profesionales.find(e => e.IDENTIFICACION == this.global_HC607.medico_HC607);
      if (this.busqProf) {
        if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC' || localStorage.Usuario == '0101') {
          this.leerPaciente_HC607();
        } else {
          if (this.busqProf.ATIENDE == 1 || this.busqProf.ATIENDE == 2 || this.busqProf.ATIENDE == 5 || this.busqProf.ATIENDE == 6 || this.busqProf.ATIENDE == 7 || this.busqProf.ATIENDE == 'A' || this.busqProf.ATIENDE == 'O') {
            this.leerPaciente_HC607();
          } else {
            CON851('9X', '9X', null, 'error', 'error');
            this.salir_HC607();
          }
        }
      } else {
        CON851('9X', '9X', null, 'error', 'error');
        this.salir_HC607();
      }
    },

    leerPaciente_HC607() {
      if ($_REG_PACI.DESCRIP == 'NO EXITS PACIENTE!') {
        CON851('01', '01', null, 'error', 'error');
        this.salir_HC607();
      } else {
        this.SEXO_W = $_REG_PACI.SEXO;
        this.mostrarEncabezado_HC607();
      }
    },

    mostrarEncabezado_HC607() {
      this.global_HC607.año_HC607 = this.fecha_act.substring(0, 4);
      this.global_HC607.mes_HC607 = this.fecha_act.substring(4, 6);
      this.global_HC607.dia_HC607 = this.fecha_act.substring(6, 8);

      this.global_HC607.hora_HC607 = this.hora_act.substring(0, 2);
      this.global_HC607.min_HC607 = this.hora_act.substring(2, 4);

      this.global_HC607.medico_HC607 = this.busqProf.IDENTIFICACION;
      this.global_HC607.descripMedico_HC607 = this.busqProf.NOMBRE;

      this.secuenciaDoc();
    },

    validarFecha_HC607(orden) {
      validarInputs(
        {
          form: "#fecha_HC607",
          orden: orden
        },
        () => {
          this.salir_HC607();
        },
        () => {
          this.global_HC607.año_HC607 = cerosIzq(this.global_HC607.año_HC607, 4);
          this.global_HC607.mes_HC607 = cerosIzq(this.global_HC607.mes_HC607, 2);
          this.global_HC607.dia_HC607 = cerosIzq(this.global_HC607.dia_HC607, 2);
          this.fecha_HC607 = this.global_HC607.año_HC607 + this.global_HC607.mes_HC607 + this.global_HC607.dia_HC607;
          if (this.global_HC607.mes_HC607 < 1 || this.global_HC607.mes_HC607 > 12) {
            this.validarFecha_HC607('2');
          } else if (this.global_HC607.dia_HC607 < 1 || this.global_HC607.dia_HC607 > 31) {
            this.validarFecha_HC607('3');
          } else {
            this.validarHora_HC607('1');
          }
        }
      );
    },

    validarHora_HC607(orden) {
      validarInputs(
        {
          form: "#hora_HC607",
          orden: orden
        },
        () => {
          this.validarFecha_HC607('3');
        },
        () => {
          this.global_HC607.hora_HC607 = cerosIzq(this.global_HC607.hora_HC607, 2);
          this.global_HC607.min_HC607 = cerosIzq(this.global_HC607.min_HC607, 2);
          this.horaTotal_HC607 = this.global_HC607.hora_HC607 + this.global_HC607.min_HC607;
          if (this.global_HC607.hora_HC607 > 23) {
            this.validarHora_HC607('2');
          } else if (this.global_HC607.min_HC607 > 59) {
            this.validarHora_HC607('3');
          } else {
            this.secuenciaDoc();
          }
        }
      );
    },

    async secuenciaDoc() {
      this._ventanaEpicrisis_HC607();
    },

    _ventanaEpicrisis_HC607() {
      _ventanaDatos({
        titulo: "FORMATO DE H.C " + $_REG_HC.llave_hc,
        columnas: ["CTA_J", "NOM_J", "FECHA_J", "TIPO_J"],
        data: this._epicrisis,
        callback_esc: function () {
          if ($this.admin_w == 'ADMI' || $this.admin_w == 'GEBC') {
            $this.validarFecha_HC607('2');
          } else {
            $this.salir_HC607();
          }
        },
        callback: async function (data) {
          $this.datoSelec = data;
          $this.global_HC607.servIni_HC607 = data.UNSERV_J;
          $this.global_HC607.acomp_HC607 = data.ACOMPA_J;
          $this.global_HC607.medico_HC607 = $this.global_HC607.medico_HC607.trim() == '' ? data.MED_J : $this.global_HC607.medico_HC607;
          $this.global_HC607.espec_HC607 = data.ESPEC_REF_J;
          $this.global_HC607.tipoMacro_HC607 = data.CL_MACRO_J;
          $this.global_HC607.codMacro_HC607 = data.COD_MACRO_J;
          $this.global_HC607.viaMacro_HC607 = data.VIA_J;
          $this.global_HC607.tabla_epi = data.VIA_J;
          $this.global_HC607.edad_HC607 = data.EDAD_J;
          $this.global_HC607.tipoFormato_HC607 = data.TIPO_J;
          $this.global_HC607.titulo_HC607 = data.TITULO_J;
          $this.global_HC607.año_HC607 = data.FECHA2_J.substring(0, 4);
          $this.global_HC607.mes_HC607 = data.FECHA2_J.substring(4, 6);
          $this.global_HC607.dia_HC607 = data.FECHA2_J.substring(6, 8);
          $this.global_HC607.hora_HC607 = data.HORA_J.substring(0, 2);
          $this.global_HC607.min_HC607 = data.HORA_J.substring(2, 4);
          $this.global_HC607.consecutivo_HC607 = data.CTA_J;
          $this.llaveEpi = $_REG_HC.llave_hc + data.CTA_J;
          var busqEpi = await $this._epicrisis.find(e => e.CTA_J == data.CTA_J);
          if (!busqEpi || $this.datoSelec.NOM_J == 'NUEVO DOCUMENTO') {
            $this.global_HC607.novedad_w = 7;
            $this.crearEpicrisis_HC607();
          } else {
            $this.global_HC607.novedad_w = 8;
            $this.errorYaExiste_HC607();
            if ($_REG_HC.estado_hc == 1) {
              $this.mostrarPag01_HC607();
            } else {
              CON851('9Y', '9Y', null, 'error', 'error');
              if ($this.admin_w == 'GEBC') {
                $this.mostrarPag01_HC607();
              } else {
                $this.salir_HC607();
              }
            }
          }
        }
      });
    },

    crearEpicrisis_HC607() {
      this.global_HC607.novedad_w = 7;
      this.global_HC607.medico_HC607 = this.global_HC607.medico_HC607;
      this.global_HC607.edad_HC607 = this.unid_edad_evo_w + this.vlr_edad_evo_w;
      this.global_HC607.fecha_HC607 = this.fecha_act;
      this.global_HC607.año_HC607 = this.fecha_act.substring(0, 4);
      this.global_HC607.mes_HC607 = this.fecha_act.substring(4, 6);
      this.global_HC607.dia_HC607 = this.fecha_act.substring(6, 8);
      this.global_HC607.hora_HC607 = this.hora_act.substring(0, 2);
      this.global_HC607.min_HC607 = this.hora_act.substring(2, 4);
      this.global_HC607.oper_HC607 = this.admin_w;

      this.mostrarPag01_HC607();
    },

    async errorYaExiste_HC607() {
      var fecha = $this.global_HC607.año_HC607 + '-' + $this.global_HC607.mes_HC607 + '-' + $this.global_HC607.dia_HC607;
      jAlert(
        {
          titulo: "ATENCIÓN",
          mensaje: `Ese paciente ya tiene RESUMEN HISTORIA abierta, con fecha ${fecha} \nPUEDE CONTINUAR AMPLIANDO INFORMACION`,
        },
      );
    },

    async mostrarPag01_HC607() {
      if (this.global_HC607.novedad_w == 8) {
        toastr.warning("ACTUALIZANDO");
      } else {
        toastr.warning("CREANDO");
      }

      this.aux = '';
      switch (this.global_HC607.tipoMacro_HC607) {
        case '1': this.aux = 'CIRUGIAS'; break;
        case '2': this.aux = 'PROCEDIMIENTOS'; break;
        case '4': this.aux = 'ENFERMERIA'; break;
        case '5': this.aux = 'MEDICINA GENERAL'; break;
        case '6': this.aux = 'MEDICINA ESPECIALIZ'; break;
        case '7': this.aux = 'RESUMENES HISTORIA'; break;
        case '8': this.aux = 'TERAPIAS'; break;
      }
      this.global_HC607.descripTipoMacro_HC607 = this.aux;

      if (this.global_HC607.codMacro_HC607 == 0) {

      } else {
        var macro = this.global_HC607.tipoMacro_HC607 + this.global_HC607.codMacro_HC607;
        var busqMacro = this._codigos.find(e => e.CLASE.concat(e.CODIGO) == macro);

        if (busqMacro) {
          this.global_HC607.descripCodMacro_HC607 = busqMacro.DETALLE;
        } else {
          this.global_HC607.descripCodMacro_HC607 = '';
        }
      }

      if (this.global_HC607.viaMacro_HC607 > 0) {
        this.busqVia = this._vias.find(e => e.CODIGO == this.global_HC607.viaMacro_HC607);
        if (this.busqVia) this.global_HC607.descripViaMacro_HC607 = '';
      } else {
        this.global_HC607.descripViaMacro_HC607 = '';
      }

      await this.mostrarEpicrisis_HC607();
      this.ventanaUnserv_HC607();
    },

    async mostrarEpicrisis_HC607() {
      if (this.global_HC607.tabla_epi) this.global_HC607.tabla_epi = this.global_HC607.tabla_epi.substring(0, 1900).trim();
    },

    ventanaUnserv_HC607() {
      SER873(() => { this._confirmarSalir_HC607('ventanaUnserv_HC607') }, this.datoUnidad_HC607, 1)
    },

    datoUnidad_HC607(data) {
      this.UNSERV_EVO = data.COD;
      this.global_HC607.servIni_HC607 = data.DESCRIP.trim();
      data.ESTADO == 'N' ? (CON851('13', '13', null, 'error', 'error'), this.ventanaUnserv_HC607()) : this.tituloDoc_HC607();
    },

    datoEncabezado_HC607() {
      if (this.global_HC607.tipoFormato_HC607 == 1 || this.global_HC607.tipoFormato_HC607 == 2 || this.global_HC607.tipoFormato_HC607 == 3 || this.global_HC607.tipoFormato_HC607 == 4) {
        this.global_HC607.tipoFormato_HC607 = this.global_HC607.tipoFormato_HC607;
      } else {
        this.global_HC607.tipoFormato_HC607 = 2;
      }
      setTimeout(() => { this.tituloDoc_HC607(); }, 250);
    },

    tituloDoc_HC607() {
      POPUP(
        {
          array: [
            { COD: '1', DESCRIP: 'EPICRISIS' },
            { COD: '2', DESCRIP: 'REMISION' },
            { COD: '3', DESCRIP: 'CONTRAREFERENCIA' },
            { COD: '4', DESCRIP: 'RESUMEN HISTORIA' }
          ],
          titulo: "TITULO DEL DOCUMENTO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.global_HC607.tipoFormato_HC607,
          callback_f: () => {
            this.ventanaUnserv_HC607();
          },
        },
        (data) => {
          // this.datoSelec.TIPO_J = data.COD;
          this.global_HC607.tipoFormato_HC607 = data.COD;
          this.global_HC607.formato_HC607 = data.COD + ' - ' + data.DESCRIP;
          this.global_HC607.titulo_HC607 = data.DESCRIP;
          this.datoTitulo_HC607();
        }
      );
    },

    datoTitulo_HC607() {
      // if (this.global_HC607.titulo_HC607.trim() == '') {
      //   this.global_HC607.titulo_HC607 = this.global_HC607.titulo_HC607;
      // }
      this.validarAcomp_HC607();
      // if(this.datoSelec.TITULO_EPI_J.toUpperCase() != this.titulo_w) {
      //   this.datoSelec.TITULO_EPI_J = this.titulo_w;
      //   this.datoTitulo_HC607();
      // }
    },

    validarAcomp_HC607() {
      if (this.global_HC607.tipoFormato_HC607 == 1) {
        this.validarServSolicita_HC607();
      } else {
        validarInputs(
          {
            form: "#validarAcomp_HC607",
          },
          () => {
            this.salir_HC607();
          },
          () => {
            this.acomp.id_AC = this.global_HC607.acomp_HC607;
            if (this.acomp.id_AC == '' || this.acomp.id_AC == 0) {
              if (this.global_HC607.tipoFormato_HC607 == 2 || this.global_HC607.tipoFormato_HC607 == 3) {
                CON851('02', '02', null, 'error', 'error');
                this.validarAcomp_HC607();
              } else {
                this.validarServSolicita_HC607();
              }
            } else {
              setTimeout(() => { this._ventanaAcomp_HC607(); }, 300);
            }
          }
        );
      }
    },

    async leerAcomp_HC607() {
      if (this.acomp.novedad == 7) {
        this.global_HC607.descripAcomp_HC607 = '';
        CON851('01', '01', null, 'error', 'error');
        this.validarAcomp_HC607();
      } else {
        this.global_HC607.acomp_HC607 = this.acomp.id_AC;
        await this.verificarPaciente_HC607();
        this.global_HC607.descripAcomp_HC607 = this._paci ? this._paci.DESCRIP.replace(/\s+/g, ' ') : '';
        this.validarServSolicita_HC607();
      }
    },

    validarServSolicita_HC607() {
      console.log('entra a serv');
      if (this.global_HC607.tipoFormato_HC607 == 2 || this.global_HC607.tipoFormato_HC607 == 3) {
        validarInputs(
          {
            form: "#validarEspec_HC607",
          },
          () => {
            this.validarAcomp_HC607();
          },
          () => {
            if (this.global_HC607.espec_HC607.trim() == '' || this.global_HC607.espec_HC607.trim() == 0) {
              CON851('02', '02', null, 'error', 'error');
              this.validarServSolicita_HC607();
            } else {
              this.busqEspec = this._especialidades.find(e => e.CODIGO == this.global_HC607.espec_HC607);
              if (this.busqEspec) {
                this.global_HC607.descripEspec_HC607 = this.busqEspec.NOMBRE;
                this.validarTipoMacro_HC607();
              } else {
                CON851('01', '01', null, 'error', 'error');
                this.validarServSolicita_HC607();
              }
            }
          }
        );
      } else {
        this.validarTipoMacro_HC607();
      }
    },

    validarTipoMacro_HC607() {
      if (this.global_HC607.tabla_epi.trim() == '') {
        if (this.global_HC607.tipoMacro_HC607.toString().trim() == '') {
          this.global_HC607.tipoMacro_HC607 = 7;
        }
        setTimeout(() => { this._ventanaTipoMacro_HC607(); }, 250);
      }
    },

    _ventanaTipoMacro_HC607() {
      POPUP(
        {
          array: this._tipoMacro,
          titulo: "TIPO DE MACRO",
          indices: [{ id: "CODIGO", label: "DESCRIP" }],
          seleccion: this.global_HC607.tipoFormato_HC607,
          callback_f: () => {
            this.ventanaUnserv_HC607();
          },
        },
        (data) => {
          this.global_HC607.tipoMacro_HC607 = data.CODIGO.trim();
          this.global_HC607.descripTipoMacro_HC607 = data.DESCRIP.trim();
          this.leerTipoMacro_HC607();
        }
      );
    },

    leerTipoMacro_HC607() {
      switch ($this.global_HC607.tipoMacro_HC607) {
        case '1': $this.global_HC607.descripTipoMacro_HC607 = 'CIRUGIAS'; break;
        case '2': $this.global_HC607.descripTipoMacro_HC607 = 'PROCEDIMIENTOS'; break;
        case '4': $this.global_HC607.descripTipoMacro_HC607 = 'ENFERMERIA'; break;
        case '5': $this.global_HC607.descripTipoMacro_HC607 = 'MEDICINA GENERAL'; break;
        case '6': $this.global_HC607.descripTipoMacro_HC607 = 'MEDICINA ESPECIALIZ'; break;
        case '7':
          $this.global_HC607.descripTipoMacro_HC607 = 'RESUMENES HISTORIA';
          var buscar = $this._codigos.find(e => e.CLASE.concat(cerosIzq(e.CODIGO, 6)) == '7000010');
          if (!buscar) {
            loader('show');
            postData({ datosh: datosEnvio() + '7' + '|' + '7000010' + '|' + 'ACCIDENTE DE TRANSITO' + '|' + 'PROS' + '|' + $this.fecha_act + '|' }, get_url("APP/HICLIN/HC107.DLL"))
              .then((data) => {
                console.log(data);
                loader('hide');
              })
              .catch(error => {
                console.error(error)
                loader('hide');
              });
          }
          break;
        case ' ': $this.salir_HC607(); break;
        default: this.validarTipoMacro_HC607(); break;
      }
      this.validarMacro_HC607();
    },

    validarMacro_HC607() {
      if (this.global_HC607.tabla_epi.trim() == '') {
        validarInputs(
          {
            form: "#validarCodMacro_HC607",
          },
          () => {
            this._confirmarSalir_HC607('validarMacro_HC607');
          },
          () => {
            this.leerMacro_HC607();
          }
        );
      }
    },

    async leerMacro_HC607() {
      await this.traerMacroSeleccionada_HC607();

      if (this.global_HC607.codMacro_HC607 == 0) {
        if (this.global_HC607.tipoMacro_HC607 == 1 && this.global_HC607.tabla_epi.trim() == '') {
          this.encabezarCirugia_HC607();
        } else {
          if ($this.macro_escogida == null) {
            this.ventanaOpcionResumida_HC607()
          } else {
            this.validarVia_HC607();
          }
        }
      } else {
        if (this.global_HC607.tipoMacro_HC607 + this.global_HC607.codMacro_HC607 == 7000010 && this.global_HC607.tabla_epi.trim() == '') {
          this.global_HC607.titulo_HC607 = 'EPICRISIS SOAT';
          this.leerFurips_HC607();
        } else {
          var macro = this.global_HC607.tipoMacro_HC607 + this.global_HC607.codMacro_HC607;
          var busqMacro = this._codigos.find(e => e.CLASE.concat(e.CODIGO) == macro);
          if (!busqMacro) {
            CON851('01', '01', null, 'error', 'error');
            this.validarMacro_HC607();
          } else {
            if (this.global_HC607.tabla_epi.trim() == '') {
              $this.global_HC607.tabla_epi = $this.macro_escogida.CONTENIDO;
            }
            this.mostrarEpicrisis_HC607();
            if ($this.macro_escogida == null) {
              this.ventanaOpcionResumida_HC607()
            } else {
              this.validarVia_HC607();
            }
          }
        }
      }
    },

    traerMacroSeleccionada_HC607() {
      loader('show')
      var llave = this.global_HC607.tipoMacro_HC607 + cerosIzq(this.global_HC607.codMacro_HC607.trim(), 6)
      postData({ datosh: datosEnvio() + llave + '|' }, get_url("APP/HICLIN/HC808-02.DLL"))
        .then((data) => {
          loader('hide')
          $this.macro_escogida = data.MACRO_FULL[0];
        })
        .catch(error => {
          console.error(error)
          loader('hide');
          $this.macro_escogida = null;
        });
    },

    async validarVia_HC607() {
      for (var i in $this.macro_escogida.VIAS_ACCESO) {
        var busqVias = $this._vias.find(x => x.CODIGO.trim() == $this.macro_escogida.VIAS_ACCESO[i].VIA.trim())
        if (busqVias) $this.macro_escogida.VIAS_ACCESO[i].DESCRIP = busqVias.NOMBRE.trim()
      }

      var vias_filtrados = this.macro_escogida.VIAS_ACCESO.filter(x => x.VIA.trim() != '')
      console.log(vias_filtrados);

      if (vias_filtrados.length > 0) {
        POPUP({
          titulo: "Selección via de acceso",
          indices: [
            { id: 'VIA', label: 'DESCRIP' }
          ],
          array: vias_filtrados,
          callback_f: () => this.ventanaUnserv_HC607(),
          seleccion: this.global_HC607.viaMacro_HC607,
          teclaAlterna: true,
        },
          (data) => {
            $this.global_HC607.viaMacro_HC607 = data.VIA;
            $this.global_HC607.descripViaMacro_HC607 = data.DESCRIP;
            $this.verificarProcedimientos()
          })
      } else {
        this.global_HC607.viaMacro_HC607 = '';
        this.global_HC607.descripViaMacro_HC607 = '';
        this.ventanaOpcionResumida_HC607();
      }
    },

    ventanaOpcionResumida_HC607() {
      CON851P(
        'Desea que el sistema extraiga de la historia clinica los datos de analisis, evolucion de especialistas?',
        () => { $this.datoResumen_HC607() },
        () => { $this.generarEpicrisis_HC607() });
    },

    datoResumen_HC607() {
      console.log('dato resumen');

      // this.datoDiagnostico_HC607();

      this.llenarReferencia_HC607();
    },

    generarEpicrisis_HC607() {
      console.log('generar epic');
    },

    datoDiagnostico_HC607() {
      if (this.global_HC607.diagnosticos[1].cod.trim() == '') {
        // this.global_HC607.diagnosticos[1].diagn = this.hcprc.
      }

      // ********** PENDIENTE **************
      // switch(parseFloat(this.hcprc.estado_sal_hc)) {
      //   case 1: this.global_HC607.salida_HC607 = '1 - VIVO'; break;
      //   case 2: this.global_HC607.salida_HC607 = '2 - MUERTO'; break;
      //   case 3: 
      //     this.global_HC607.salida_HC607 = '3 - REMITIDO A:'; 
      //     this.global_HC607.remitido_HC607 = this.hcprc.remitido_hc;
      //     this.global_HC607.nivelAtencion_HC607 = this.hcprc.nivel_remit_hc;
      //     break;
      //   case 4: this.global_HC607.salida_HC607 = '4 - HOSPITALIZ.'; break;
      // }

      this.validarDiagn(1);
    },

    validarDiagn(indice) {
      console.log('validar diagn', indice);
      if (indice < 1) indice = 1;
      if (indice > 5) {
        indice = 5;
        this.validarSalida_HC607();
      }
      validarInputs(
        {
          form: `#validarDiagn${indice}`,
        },
        () => {
          if (this.indice == 1) {
            this._confirmarSalir_HC607();
          } else {
            this.indice = this.indice - 1;
            this.validarDiagn();
          }
          // this._confirmarSalir_HC607(`validarDiagn${indice}`);
        },
        () => {
          if (this.global_HC607.diagnosticos[parseInt(indice) - 1].cod.trim() == '' && indice == 1) {
            CON851('01', '01', null, 'error', 'error');
            this.validarDiagn(indice);
          } else {
            if (this.global_HC607.diagnosticos[parseInt(indice) - 1].cod.trim() == '') {
              this.validarSalida_HC607();
            } else {
              this.busqEnf = this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagnosticos[parseInt(indice) - 1].cod);
              if (this.busqEnf) {
                this.global_HC607.diagnosticos[parseInt(indice) - 1].descrip = this.busqEnf.NOMBRE_ENF;
                if (this.busqEnf.SEXO_ENF.trim() != '' && this.busqEnf.SEXO_ENF != this.SEXO_W) {
                  CON851('73', '73', null, 'error', 'error');
                  this.validarDiagn(indice);
                } else {
                  if (this.global_HC607.diagnosticos[parseInt(indice) - 1].cod.substring(0, 2) == 'O8') {
                    CON851('1I', '1I', null, 'error', 'error');
                  }
                  this.validarDiagn(parseFloat(indice) + 1);
                }
              } else {
                this.validarDiagn(indice);
              }
            }
          }
        }
      );
    },

    llenarReferencia_HC607() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send('another', datos = { directorio: 'HICLIN/paginas/HC806.html', REG_HC: $_REG_HC, REG_PROF: $_REG_PROF });
      _EventocrearSegventana(['on', 'Llenar referencia...'], $this.validarAcomp_HC607);
    },

    _confirmarSalir_HC607(callback_esc, orden) {
      CON851P('03', () => { orden ? $this[callback_esc](orden) : $this[callback_esc]() }, () => { $this.salir_HC607() });
    },

    salir_HC607() {
      $this.banderaSalir = $this.banderaSalir + 1;
      if ($this.banderaSalir < 2) {
        _regresar_menuhis();
      }
    },


    async verificarPaciente_HC607() {
      loader('show');
      await postData({ datosh: datosEnvio() + cerosIzq(this.acomp.id_AC, 15) + '|2|' }, get_url("app/SALUD/SER810-1.DLL"))
        .then((data) => {
          $this._paci = data["REG-PACI"][0];
          loader('hide');
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
        });
    },

    _cargarEnfermedades_HC607() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          $this._enfermedades = data.ENFERMEDADES
          $this._enfermedades.pop()

          for (var i in $this._enfermedades) {
            $this._enfermedades[i].NOMBRE_ENF = $this._enfermedades[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
          }
        })
        .catch(error => {
          console.error(error);
          loader('hide');
          $this.salir_HC607();
        });
    },

    async _cargarProfesionales_HC607() {
      await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
          this._cargarTipoMacros_HC607();
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          $this.salir_HC607();
        });
    },

    async _cargarTipoMacros_HC607() {
      try {
        this._tipoMacro = _SER874(this._tipoMacro);
        this._cargarCodigosMacros_HC607();
      } catch (err) {
        console.log(err, "err");
        loader("hide");
        $this.salir_HC607();
      }
    },

    async _cargarCodigosMacros_HC607() {
      postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
        .then((data) => {
          this._codigos = data.MACROS;
          this._codigos.pop();
          this._cargarViasAcceso_HC607();
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          $this.salir_HC607();
        });
    },

    async _cargarViasAcceso_HC607() {
      await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER856.DLL"))
        .then((data) => {
          this._vias = data.VIAS_ACCESO;
          this._vias.pop();
          this._cargarCiudades_HC607();
        })
        .catch((err) => {
          console.log(err, "err");
          loader("hide");
          $this.salir_HC607();
        });
    },

    async _cargarCiudades_HC607() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          this._ciudades = data.CIUDAD;
          this._ciudades.pop();
          this._cargarEpicrisis_HC607();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          $this.salir_HC607();
        });
    },

    FNFPacientes_HC607() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
        callback: async data => {
          this.global_HC607.acomp_HC607 = data.COD;
          setTimeout(() => { _enterInput('.acomp_HC607'); }, 200);
        },
        cancel: async () => {
          this.validarAcomp_HC607();
        },
      };
      F8LITE(parametros);
    },

    async _cargarEpicrisis_HC607() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + this.fecha_act }, get_url("APP/HICLIN/HC831A.DLL"))
        .then((data) => {
          this._epicrisis = data.EPICRISIS;
          this._epicrisis.pop();
          this._cargarEspecialidades_HC607();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          $this.salir_HC607();
        });
    },

    async _cargarEspecialidades_HC607() {
      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          $this._especialidades = data.ESPECIALIDADES;
          $this._especialidades.pop();
          loader('hide');
          this.leerHistoria();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          $this.salir_HC607();
        });
    },

    async _leerDetalles_HC607() {
      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|**|||**|" }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this._detalles = data["DETHC"];
          this.enf_act_hc = this._detalles.find(e => e["COD-DETHC"] == "1001" && e["LLAVE-HC"] == $_REG_HC.llave_hc);
          this.analisis_hc = this._detalles.find(e => e["COD-DETHC"] == "7501" && e["LLAVE-HC"] == $_REG_HC.llave_hc);
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          $this.salir_HC607();
        });
    },

    _ventanaMedico_HC607() {
      _ventanaDatos({
        titulo: "PROFESIONALES",
        columnas: ["IDENTIFICACION", "NOMBRE"],
        data: $this._profesionales,
        callback_esc: function () {
          document.querySelector('.medico_HC607').focus();
        },
        callback: function (data) {
          $this.global_HC607.medico_HC607 = data['IDENTIFICACION'].trim();
          $this.global_HC607.descripMedico_HC607 = data['NOMBRE'].trim();
          _enterInput('.medico_HC607');
        }
      });
    },

    _ventanaAcomp_HC607() {
      $this.sw_var.acomp = true;
      $this.params_ser110c_ac.estado = true;
      $this.params_ser110c_ac._siguiente = this.leerAcomp_HC607;
      $this.params_ser110c_ac._atras = this.leerAcomp_HC607;
    },

    _ventanaEspecialidades_HC607() {
      _ventanaDatos({
        titulo: "UNIDADES DE SERVICIO",
        columnas: ["CODIGO", "NOMBRE"],
        data: $this._especialidades,
        callback_esc: function () {
          document.querySelector('.espec_HC607').focus();
        },
        callback: function (data) {
          $this.global_HC607.espec_HC607 = data['CODIGO'].trim();
          $this.global_HC607.descripEspec_HC607 = data['NOMBRE'].trim();
          _enterInput('.espec_HC607');
        }
      });
    },

    _ventanaCodMacro_HC607() {

    },

    _ventanaDiagnosticos_HC607(orden) {
      _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: $this._enfermedades,
        callback_esc: function () {
          document.querySelector(`.diagn${orden}`).focus();
        },
        callback: function (data) {
          $this.global_HC607.diagnosticos[parseInt(orden) - 1].cod = data['COD_ENF'].trim();
          $this.global_HC607.diagnosticos[parseInt(orden) - 1].descrip = data['NOMBRE_ENF'].trim();
          _enterInput(`.diagn${orden}`);
        }
      });
    }
  }
});
