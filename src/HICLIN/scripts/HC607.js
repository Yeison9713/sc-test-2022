// ELABORA RESUMEN DE HISTORIA (EPICRISIS, REMISION) - DAVID.M - 11-01-2020

var array_702R_607 = [];
var array_702A_607 = [];
var aiepi_w;

var tipo_epi_w;
var sw_epi_w;
var opc_evo_w;

new Vue({
    el: "#HC607",
    data: {
        params_ser110c_ac: {
            estado: false,
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
                { nro: '01', cod: '', descrip: '' },
                { nro: '02', cod: '', descrip: '' },
                { nro: '03', cod: '', descrip: '' },
                { nro: '04', cod: '', descrip: '' },
                { nro: '05', cod: '', descrip: '' },
            ],
            salida_HC607: '',
            remitido_HC607: '',
            nivelAtencion_HC607: '',
            diagMuerte_HC607: '',
            descripDiagMuerte_HC607: '',
            tabla_epi: '',
            plan_epi: '',
            tabla_motivo: '',
            ResultProcedDiag_epi: '',
        },
        banderaSalir: 0,
        llave_hc: $_REG_HC.llave_hc,
        fecha_act: moment().format("YYYYMMDD"),
        hora_act: moment().format("HHmm"),
        nit_usu: $_USUA_GLOBAL[0].NIT,
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
        reg_epi: {},
        fecha_act: moment().format("YYYYMMDD"),
    },
    components: {
        acomp: component_acomp,
    },

    // watch: {
    //     'global_HC607.tabla_epi': function (val) {
    //       this.global_HC607.tabla_epi = val ? val.replaceEsp() : ''
    //     },

    //     'global_HC607.plan_epi': function (val) {
    //         this.global_HC607.plan_epi = val ? val.replaceEsp() : ''
    //       },
    // },

    async created() {
        loader("show");
        _inputControl("disabled");
        _inputControl("reset");
        nombreOpcion('EPICRISIS');
        $this = this;
        this._cargarEnfermedades_HC607();
        await this._cargarProfesionales_HC607();
    },
    methods: {
        async leerHistoria() {
            if ($_REG_HC.novedad_hc == '7') {
                CON851('', 'Falta crear historia clínica', null, 'error', 'error');
                this.salir_HC607();
            } else {
                switch ($_REG_HC.edad_hc.unid_edad) {
                    case 'D':
                        $this.unid_edad_evo_w = 1;
                        break;
                    case 'M':
                        $this.unid_edad_evo_w = 2;
                        break;
                    case 'A':
                        $this.unid_edad_evo_w = 3;
                        break;
                    default:
                        $this.unid_edad_evo_w = 0;
                        break;
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
                validarInputs({
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
                    if (this.busqProf.ATIENDE_PROF == 1 || this.busqProf.ATIENDE_PROF == 2 || this.busqProf.ATIENDE_PROF == 5 || this.busqProf.ATIENDE_PROF == 6 || this.busqProf.ATIENDE_PROF == 7 || this.busqProf.ATIENDE_PROF == 'A' || this.busqProf.ATIENDE_PROF == 'O') {
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

            if (localStorage.Usuario == 'GEBC') {
                this.validarFecha_HC607('1');
            } else {
                this.secuenciaDoc();
            }
        },

        validarFecha_HC607(orden) {
            validarInputs({
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
                    if (this.global_HC607.año_HC607 < 1950) {
                        this.validarFecha_HC607('1');
                    } else if (this.global_HC607.mes_HC607 < 1 || this.global_HC607.mes_HC607 > 12) {
                        this.validarFecha_HC607('2');
                    } else if (this.global_HC607.dia_HC607 < 1 || this.global_HC607.dia_HC607 > 31) {
                        this.validarFecha_HC607('3');
                    } else if (this.fecha_HC607 > this.fecha_act) {
                        this.validarFecha_HC607('1');
                    } else {
                        this.validarHora_HC607('1');
                    }
                }
            );
        },

        validarHora_HC607(orden) {
            validarInputs({
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
                        this.validarHora_HC607('1');
                    } else if (this.global_HC607.min_HC607 > 59) {
                        this.validarHora_HC607('2');
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
                    $this.global_HC607.oper_HC607 = data.OPER_ELAB_J;
                    $this.global_HC607.acomp_HC607 = data.ACOMPA_J;
                    $this.global_HC607.medico_HC607 = $this.global_HC607.medico_HC607.trim() == '' ? data.MED_J : $this.global_HC607.medico_HC607;
                    $this.global_HC607.espec_HC607 = data.ESPEC_REF_J;
                    $this.global_HC607.tipoMacro_HC607 = data.CL_MACRO_J;
                    $this.global_HC607.codMacro_HC607 = data.COD_MACRO_J;
                    $this.global_HC607.viaMacro_HC607 = data.VIA_J;
                    $this.global_HC607.tabla_epi = data.TABLA_EPI ? data.TABLA_EPI.replace(/\&/g, "\n").trim() : '';
                    $this.global_HC607.plan_epi = data.PLAN_EPI ? data.PLAN_EPI.replace(/\&/g, "\n").trim() : '';
                    $this.global_HC607.ResultProcedDiag_epi = data.RESULT_PROCED_DIAG_EPI ? data.RESULT_PROCED_DIAG_EPI.replace(/\&/g, "\n").trim() : '';
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
                    }
                }
            });
        },

        crearEpicrisis_HC607() {
            this.global_HC607.novedad_w = 7;
            this.global_HC607.medico_HC607 = this.global_HC607.medico_HC607;
            this.global_HC607.edad_HC607 = $_REG_HC.edad_hc.unid_edad + cerosIzq($_REG_HC.edad_hc.vlr_edad, 3)
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
                { titulo: "ATENCIÓN", mensaje: `Ese paciente ya tiene RESUMEN HISTORIA abierta, con fecha ${fecha} \nPUEDE CONTINUAR AMPLIANDO INFORMACION`, },
                () => {
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
            );
        },

        async mostrarPag01_HC607() {
            if (!this.global_HC607.fecha_HC607) {
                this.global_HC607.fecha_HC607 = this.global_HC607.año_HC607 + this.global_HC607.mes_HC607 + this.global_HC607.dia_HC607;
            }
            if (this.global_HC607.novedad_w == 8) {
                toastr.success("ACTUALIZANDO");
            } else {
                toastr.success("CREANDO");
            }

            this.aux = '';
            switch (this.global_HC607.tipoMacro_HC607) {
                case '1':
                    this.aux = 'CIRUGIAS';
                    break;
                case '2':
                    this.aux = 'PROCEDIMIENTOS';
                    break;
                case '4':
                    this.aux = 'ENFERMERIA';
                    break;
                case '5':
                    this.aux = 'MEDICINA GENERAL';
                    break;
                case '6':
                    this.aux = 'MEDICINA ESPECIALIZ';
                    break;
                case '7':
                    this.aux = 'RESUMENES HISTORIA';
                    break;
                case '8':
                    this.aux = 'TERAPIAS';
                    break;
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

            if (this.global_HC607.plan_epi) this.global_HC607.plan_epi = this.global_HC607.plan_epi.substring(0, 1900).trim();
        },

        ventanaUnserv_HC607() {
            SER873(() => { this._confirmarSalir_HC607('ventanaUnserv_HC607') }, this.datoUnidad_HC607, 1)
        },

        datoUnidad_HC607(data) {
            this.global_HC607.codServIni_HC607 = data.COD;
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
            POPUP({
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
                    if (this.global_HC607.novedad_w == 8) {
                        if (this.global_HC607.tipoFormato_HC607 == data.COD) {
                            this.global_HC607.tipoFormato_HC607 = data.COD;
                            this.global_HC607.formato_HC607 = data.COD + ' - ' + data.DESCRIP;
                            this.global_HC607.titulo_HC607 = data.DESCRIP;
                            this.datoTitulo_HC607();
                        } else {
                            CON851('03', '03', null, 'error', 'error');
                            setTimeout(() => { this.tituloDoc_HC607(); }, 250);
                        }
                    } else {
                        this.global_HC607.tipoFormato_HC607 = data.COD;
                        this.global_HC607.formato_HC607 = data.COD + ' - ' + data.DESCRIP;
                        this.global_HC607.titulo_HC607 = data.DESCRIP;
                        this.datoTitulo_HC607();
                    }
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
                validarInputs({
                    form: "#validarAcomp_HC607",
                    event_f5: () => { this._confirmarSalir_HC607('validarAcomp_HC607') }
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
                validarInputs({
                    form: "#validarEspec_HC607",
                    event_f5: () => { this._confirmarSalir_HC607('validarServSolicita_HC607') }
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
            } else {
                this.global_HC607.tipoMacro_HC607
                var tipoMacro = this.global_HC607.tipoMacro_HC607;
                if (tipoMacro == '1' || tipoMacro == '2' || tipoMacro == '4' || tipoMacro == '5' || tipoMacro == '6' || tipoMacro == '7') {
                    this.leerTipoMacro_HC607();
                } else {
                    this.validarMacro_HC607();
                }
            }
        },

        _ventanaTipoMacro_HC607() {
            POPUP({
                array: this._tipoMacro,
                titulo: "TIPO DE MACRO",
                indices: [{ id: "CODIGO", label: "DESCRIP" }],
                seleccion: this.global_HC607.tipoMacro_HC607,
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
                case '1':
                    $this.global_HC607.descripTipoMacro_HC607 = 'CIRUGIAS'
                    this.validarMacro_HC607()
                    break;
                case '2':
                    $this.global_HC607.descripTipoMacro_HC607 = 'PROCEDIMIENTOS'
                    this.validarMacro_HC607()
                    break;
                case '4':
                    $this.global_HC607.descripTipoMacro_HC607 = 'ENFERMERIA'
                    this.validarMacro_HC607()
                    break;
                case '5':
                    $this.global_HC607.descripTipoMacro_HC607 = 'MEDICINA GENERAL'
                    this.validarMacro_HC607()
                    break;
                case '6':
                    $this.global_HC607.descripTipoMacro_HC607 = 'MEDICINA ESPECIALIZ'
                    this.validarMacro_HC607()
                    break;
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
                    this.validarMacro_HC607()
                    break;
                case ' ':
                    $this.salir_HC607()
                    break;
                default:
                    CON851('03', '03', null, 'error', 'error')
                    this.validarTipoMacro_HC607()
                    break;
            }
        },

        validarMacro_HC607() {
            if (this.global_HC607.tabla_epi.trim() == '') {
                validarInputs({
                    form: "#validarCodMacro_HC607",
                    event_f5: () => { this._confirmarSalir_HC607('validarMacro_HC607') }
                },
                    () => {
                        this.validarTipoMacro_HC607();
                    },
                    () => {
                        this.leerMacro_HC607();
                    }
                );
            } else {
                this.validarTablaEpi_HC607();
            }
        },

        async leerMacro_HC607() {
            await this.traerMacroSeleccionada_HC607();

            if (this.global_HC607.codMacro_HC607 == 0) {
                if (this.global_HC607.tipoMacro_HC607 == 1 && this.global_HC607.tabla_epi.trim() == '') {
                    this.encabezarCirugia_HC607();
                }
                if ($this.macro_escogida == null) {
                    this.ventanaOpcionResumida_HC607()
                } else {
                    this.validarVia_HC607();
                }
            } else {
                if (this.global_HC607.tipoMacro_HC607 + cerosIzq(this.global_HC607.codMacro_HC607, 6) == '7000010' && this.global_HC607.tabla_epi.trim() == '') {
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

        encabezarCirugia_HC607() {
            this.global_HC607.tabla_epi =
                `DESCRIPCION QUIRURGICA
        FECHA PROCEDIMIENTO: 
        HORA INICIO:        HORA FINAL: 
        CIRUJANO: 
        ANESTESIOLOGO: 
        AYUDANTE: 
        INSTRUMENTADORA: 
        SALA DE CIRUGÍA: 
        PROCEDIMIENTOS: 
        HALLAZGOS: 
        PATOLOGIAS: 
        DESCRIPCION:       `
        },

        leerFurips_HC607() {
            // PENDIENTE FURIPS
            this.ventanaOpcionResumida_HC607();
        },

        async traerMacroSeleccionada_HC607() {
            loader('show')
            var llave = this.global_HC607.tipoMacro_HC607 + cerosIzq(this.global_HC607.codMacro_HC607.trim(), 6)
            await postData({ datosh: datosEnvio() + llave + '|' }, get_url("APP/HICLIN/HC808-02.DLL"))
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
                        $this.ventanaOpcionResumida_HC607()
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
                async () => {
                    await $this.leerTablaEvo_HC607();
                    await $this.generarEpicrisis_HC607();
                });
        },

        datoResumen_HC607() {
            console.log('dato resumen');

            this.validarTablaEpi_HC607();
        },

        async generarEpicrisis_HC607() {
            toastr.success('F3 PARA CONTINUAR');
            console.log('generar epic');

            this.global_HC607.tabla_motivo = $this._hcprc.motivo.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

            if ($this.enf_act_hc != undefined) {
                $this.global_HC607.tabla_epi = $this.enf_act_hc.DETALLE.replace(/\&/g, "\n").trim();
            }

            if ($this.analisis_hc != undefined) {
                $this.global_HC607.tabla_epi += '\n' + $this.analisis_hc.DETALLE.replace(/\&/g, "\n").trim();
            }

            // if (this.ultima_evo) {
            //     if (this.ultima_evo.length > 0) {
            //         this.global_HC607.tabla_epi = this.ultima_evo.ANALISIS_EVO.replace(/\&/g, "\n").trim();
            //         this.global_HC607.tabla_epi += '\n' + this.ultima_evo.TABLA_EVO.replace(/\&/g, "\n").trim();
            //     }
            // }

            for (var i in this.ultima_evo) {
                if (this.ultima_evo[i].FECHA_EVO) {
                    this.ultima_evo[i].fecha_total = this.ultima_evo[i].FECHA_EVO + this.ultima_evo[i].HORA_EVO;
                } else {
                    this.ultima_evo[i].fecha_total = this.ultima_evo[i].fecha + this.ultima_evo[i].hora;
                }
            }
            await this.ordenarDatos_HC607();

            var item = parseInt(this.ultima_evo.length) - 1;

            for (var i in this.ultima_evo) {
                if (this.ultima_evo[i].ANALISIS_EVO != "") {
                    this.global_HC607.tabla_epi += this.ultima_evo[i].ANALISIS_EVO.replace(/\&/g, "\n").trim();
                    this.global_HC607.tabla_epi += '\n' + this.ultima_evo[i].TABLA_EVO.replace(/\&/g, "\n").trim();
                }

                if (this.ultima_evo[i].PLAN_EVO != "") {
                    if (i != item) {
                        this.global_HC607.tabla_epi += '\n' + this.ultima_evo[i].PLAN_EVO.replace(/\&/g, "\n").trim();
                        this.global_HC607.tabla_epi += '\n';
                    }
                }
            }

            // for (var i in this.ultima_evo) {
            //     if (this.ultima_evo[i].PLAN_EVO != "") {
            //         this.global_HC607.plan_epi += this.ultima_evo[i].PLAN_EVO.replace(/\&/g, "\n").trim();
            //         this.global_HC607.plan_epi += '\n';
            //     }
            // }

            if (item > 0) {
                this.global_HC607.plan_epi = this.ultima_evo[item].PLAN_EVO.replace(/\&/g, "\n").trim();
            }

            this.validarTablaEpi_HC607();
        },

        async ordenarDatos_HC607() {
            await this.ultima_evo.sort((a, b) => {
                if (parseInt(a.fecha_total) > parseInt(b.fecha_total)) {
                    return 1;
                }
                if (parseInt(a.fecha_total) < parseInt(b.fecha_total)) {
                    return -1;
                }
                return 0;
            });
        },

        validarTablaEpi_HC607() {
            validarInputs({
                form: "#validarTabla_epi_HC607",
                orden: '1',
            },
                () => {
                    this._confirmarSalir_HC607('validarTablaEpi_HC607')
                    // this.validarTablaEpi_HC607();
                },
                () => {
                    this.global_HC607.tabla_epi = this.global_HC607.tabla_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').toUpperCase().trim();
                    this.validarPlanEpi_HC607();
                }
            )
        },

        validarPlanEpi_HC607() {
            validarInputs({
                form: "#validarPlan_epi_HC607",
                orden: '1',
            },
                () => {
                    this.validarTablaEpi_HC607();
                },
                () => {
                    this.global_HC607.plan_epi = this.global_HC607.plan_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').toUpperCase().trim();
                    if (this.global_HC607.tipoFormato_HC607 == '1') {
                        this.validarResultProced_HC607();
                    } else {
                        this.datoDiagnostico_HC607();
                    }
                }
            )
        },

        validarResultProced_HC607() {
            validarInputs({
                form: "#validarResultProcedDiag_epi_HC607",
                orden: '1',
            },
                () => {
                    this.validarPlanEpi_HC607();
                },
                () => {
                    this.global_HC607.ResultProcedDiag_epi = this.global_HC607.ResultProcedDiag_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').toUpperCase().trim();
                    this.datoDiagnostico_HC607();
                }
            )
        },

        datoDiagnostico_HC607() {
            // if (this.global_HC607.diagnosticos[0].cod.trim() == '') {
            //   this.global_HC607.diagnosticos[0].cod = $this._hcprc.cierre.tabla_diag_egr[0].diag_egr;

            //   var busq0 = $this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagnosticos[0].cod);
            //   if (busq0 != undefined) {
            //     this.global_HC607.diagnosticos[0].descrip = busq0.NOMBRE_ENF;
            //   } else {
            //     this.global_HC607.diagnosticos[0].descrip = "";
            //   }

            //   this.global_HC607.diagnosticos[1].cod = $this._hcprc.cierre.tabla_diag_egr[1].diag_egr;

            //   var busq0 = $this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagnosticos[1].cod);
            //   if (busq0 != undefined) {
            //     this.global_HC607.diagnosticos[1].descrip = busq0.NOMBRE_ENF;
            //   } else {
            //     this.global_HC607.diagnosticos[1].descrip = "";
            //   }

            //   this.global_HC607.diagnosticos[2].cod = $this._hcprc.cierre.tabla_diag_egr[2].diag_egr;

            //   var busq0 = $this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagnosticos[2].cod);
            //   if (busq0 != undefined) {
            //     this.global_HC607.diagnosticos[2].descrip = busq0.NOMBRE_ENF;
            //   } else {
            //     this.global_HC607.diagnosticos[2].descrip = "";
            //   }

            //   this.global_HC607.diagnosticos[3].cod = $this._hcprc.cierre.tabla_diag_egr[3].diag_egr;

            //   var busq0 = $this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagnosticos[3].cod);
            //   if (busq0 != undefined) {
            //     this.global_HC607.diagnosticos[3].descrip = busq0.NOMBRE_ENF;
            //   } else {
            //     this.global_HC607.diagnosticos[3].descrip = "";
            //   }

            //   this.global_HC607.diagnosticos[4].cod = $this._hcprc.cierre.tabla_diag_egr[4].diag_egr;

            //   var busq0 = $this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagnosticos[4].cod);
            //   if (busq0 != undefined) {
            //     this.global_HC607.diagnosticos[4].descrip = busq0.NOMBRE_ENF;
            //   } else {
            //     this.global_HC607.diagnosticos[4].descrip = "";
            //   }
            // }

            // se muestra siempre los primeros 5 diagnosticos de la historia clinica

            this.global_HC607.diagnosticos[0].cod = $this._hcprc.rips.tabla_diag[0].diagn;
            this.global_HC607.diagnosticos[0].descrip = $this._hcprc.rips.tabla_diag[0].descrip;

            this.global_HC607.diagnosticos[1].cod = $this._hcprc.rips.tabla_diag[1].diagn;
            this.global_HC607.diagnosticos[1].descrip = $this._hcprc.rips.tabla_diag[1].descrip;

            this.global_HC607.diagnosticos[2].cod = $this._hcprc.rips.tabla_diag[2].diagn;
            this.global_HC607.diagnosticos[2].descrip = $this._hcprc.rips.tabla_diag[2].descrip;

            this.global_HC607.diagnosticos[3].cod = $this._hcprc.rips.tabla_diag[3].diagn;
            this.global_HC607.diagnosticos[3].descrip = $this._hcprc.rips.tabla_diag[3].descrip;

            this.global_HC607.diagnosticos[4].cod = $this._hcprc.rips.tabla_diag[4].diagn;
            this.global_HC607.diagnosticos[4].descrip = $this._hcprc.rips.tabla_diag[4].descrip;

            aux = '';
            switch ($this._hcprc.rips.estado_sal) {
                case '1':
                    aux = 'VIVO (A)';
                    break;
                case '2':
                    aux = 'MUERTO (A)';
                    break;
                case '3':
                    aux = 'REMITIDO A: ';
                    break;
                case '4':
                    aux = 'HOSPITALIZADO';
                    break;
                default:
                    aux = '  ';
                    break;
            }

            this.global_HC607.salida_HC607 = aux;

            this.validarCod_diagnosticos(0);
        },

        async validarCod_diagnosticos(pos) {
            if (pos > 4) {
                this.estad_salida_HC607();
            } else {
                validarInputs({
                    form: "#validarCod_diag_" + pos + "_HC607",
                    orden: '1',
                    event_f3: () => {
                        if (this.global_HC607.diagnosticos[0].cod.trim() == '') {
                            CON851('02', '02', null, 'error', 'Error')
                            this.validarCod_diagnosticos(pos)
                        } else {
                            this.estad_salida_HC607()
                        }
                    },
                    event_f5: () => { this._confirmarSalir_HC607('validarCod_diagnosticos'), pos }
                },
                    () => {
                        if (pos == 0) {
                            this._confirmarSalir_HC607(`validarCod_diagnosticos`, pos);
                        } else {
                            this.validarCod_diagnosticos(pos - 1)
                        }
                    },
                    () => {
                        this.global_HC607.diagnosticos[pos].cod = this.global_HC607.diagnosticos[pos].cod.toUpperCase();
                        var diagn = this.global_HC607.diagnosticos[pos].cod;
                        if (diagn.trim() == '' && pos == 0) {
                            CON851('01', '01', null, 'error', 'error');
                            this.validarCod_diagnosticos(pos);
                        } else {
                            if (this.global_HC607.diagnosticos[pos].cod.trim() == '') {
                                for (var i in this.global_HC607.diagnosticos) {
                                    if (i >= pos) {
                                        this.global_HC607.diagnosticos[i].cod = '';
                                        this.global_HC607.diagnosticos[i].descrip = '';
                                    }
                                }
                                this.estad_salida_HC607();
                            } else {
                                this.busqEnf = this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagnosticos[pos].cod);

                                if (this.busqEnf) {
                                    this.global_HC607.diagnosticos[pos].descrip = this.busqEnf.NOMBRE_ENF;
                                    if (this.busqEnf.SEXO_ENF.trim() != '' && this.busqEnf.SEXO_ENF != this.SEXO_W) {
                                        CON851('73', '73', null, 'error', 'error');
                                        this.validarCod_diagnosticos(pos);
                                    } else if (this.global_HC607.diagnosticos[pos].cod.substring(0, 2) == 'O8') {
                                        CON851('1I', '1I', null, 'error', 'error');
                                        this.validarCod_diagnosticos(pos + 1);
                                    } else {
                                        this.validarCod_diagnosticos(pos + 1);
                                    }
                                } else {
                                    CON851('01', '01', null, 'error', 'error');
                                    this.validarCod_diagnosticos(pos);
                                }
                            }
                        }
                    }
                )
            }
        },

        estad_salida_HC607() {
            POPUP({
                array: [
                    { COD: '1', DESCRIP: 'VIVO (A)' },
                    { COD: '2', DESCRIP: 'MUERTO (A)' },
                    { COD: '3', DESCRIP: 'REMITIDO' },
                    { COD: '4', DESCRIP: 'HOSPITALIZACION' },
                ],
                titulo: "ESTADO SALIDA",
                indices: [{ id: "COD", label: "DESCRIP" }],
                seleccion: this.global_HC607.salida_HC607,
                callback_f: () => {
                    this.validarCod_diagnosticos(0);
                },
            },
                (data) => {
                    this.global_HC607.salida_HC607 = data.COD + ' - ' + data.DESCRIP;
                    this.validarSalida_HC607(data.COD);
                }
            );
        },

        validarSalida_HC607(cod) {
            switch (cod) {
                case '1':
                    // continue guardar
                    this.global_HC607.remitido_HC607 = '';
                    this.global_HC607.nivelAtencion_HC607 = '';
                    this.global_HC607.diagMuerte_HC607 = '';
                    this.global_HC607.descripDiagMuerte_HC607 = '';
                    this.cerrarDiagnosticos_HC607();
                    break;
                case '2':
                    // dato muerto
                    this.global_HC607.remitido_HC607 = '';
                    this.global_HC607.nivelAtencion_HC607 = '';
                    this.validarDiagMuerte_HC607();
                    break;
                case '3':
                    // dato remitido
                    this.global_HC607.diagMuerte_HC607 = '';
                    this.global_HC607.descripDiagMuerte_HC607 = '';
                    this.validarRemitido_HC607();
                    break;
                case '4':
                    // dato hospitalizacion
                    this.global_HC607.remitido_HC607 = '';
                    this.global_HC607.nivelAtencion_HC607 = '';
                    this.global_HC607.diagMuerte_HC607 = '';
                    this.global_HC607.descripDiagMuerte_HC607 = '';
                    this.cerrarDiagnosticos_HC607();
                    break;
                default:
                    this.estad_salida_HC607();
                    break;
            }
        },

        validarRemitido_HC607() {
            validarInputs({
                form: "#validarRemitido_HC607",
                orden: '1'
            },
                () => {
                    this.estad_salida_HC607();
                },
                () => {
                    this.global_HC607.remitido_HC607 = this.global_HC607.remitido_HC607.toUpperCase();
                    if (this.global_HC607.remitido_HC607.trim() == '') {
                        CON851('02', '02', null, 'error', 'error');
                        this.validarRemitido_HC607();
                    } else {
                        this.validarAtencion_HC607();
                    }
                }
            )
        },

        validarAtencion_HC607() {
            validarInputs({
                form: "#validarAtencion_HC607",
                orden: '1'
            },
                () => {
                    this.validarRemitido_HC607();
                },
                () => {
                    niv = this.global_HC607.nivelAtencion_HC607;
                    if (niv == 1 || niv == 2 || niv == 3 || niv == 4 || niv == 5 || niv == 6) {
                        this.cerrarDiagnosticos_HC607();
                    } else {
                        CON851('03', '03', null, 'error', 'error');
                        this.validarAtencion_HC607();
                    }
                }
            )
        },

        validarDiagMuerte_HC607() {
            validarInputs({
                form: "#validarDiagMuerte_HC607",
                orden: '1'
            },
                () => {
                    this.estad_salida_HC607();
                },
                () => {
                    if (this.global_HC607.diagMuerte_HC607.trim() == '') {
                        this.global_HC607.diagMuerte_HC607 = '';
                        this.global_HC607.descripDiagMuerte_HC607 = '';
                        this.cerrarDiagnosticos_HC607();
                    } else {
                        var busqEnf = this._enfermedades.find(e => e.COD_ENF == this.global_HC607.diagMuerte_HC607);
                        if (busqEnf) {
                            this.global_HC607.descripDiagMuerte_HC607 = busqEnf.NOMBRE_ENF;
                            this.cerrarDiagnosticos_HC607();
                        } else {
                            CON851('01', '01', null, 'error', 'error');
                            this.validarDiagMuerte_HC607();
                        }
                    }
                }
            )
        },

        cerrarDiagnosticos_HC607() {
            this.confirmar_HC607();
        },

        confirmar_HC607() {
            CON851P('01', () => { this.validarCod_diagnosticos(0) }, () => { $this.demandaInducida_HC607() });
        },

        demandaInducida_HC607() {
            if ((this.nit_usu == 900450008 || this.nit_usu == 901146885) && $_REG_HC.serv == 01 || $_REG_HC.serv == 03) {
                // llena demanda inducida // PENDIENTE POR NIT
                this.grabar_HC607();
            } else {
                this.grabar_HC607();
            }
        },

        grabar_HC607() {
            var data = {};

            var llave_w = $_REG_HC.llave_hc;
            var secu_w = $this.global_HC607.consecutivo_HC607;
            var cod_dethcepi = '7503';
            var cod_dethProcedEpi = '9090';

            data['datosh'] = datosEnvio() + llave_w + '|' + secu_w + '|' + cod_dethcepi + '|' + cod_dethProcedEpi + '|';

            data['medico_w'] = $this.global_HC607.medico_HC607;
            data['edad_w'] = $this.global_HC607.edad_HC607;
            data['fecha_w'] = $this.global_HC607.fecha_HC607;
            data['hora_w'] = $this.global_HC607.hora_HC607 + $this.global_HC607.min_HC607;
            data['admin_w'] = $this.global_HC607.oper_HC607;

            data['tipo_w'] = $this.global_HC607.tipoFormato_HC607;
            data['titulo_w'] = $this.global_HC607.titulo_HC607;
            data['acompa_w'] = $this.global_HC607.acomp_HC607;
            data['espec_ref_w'] = $this.global_HC607.espec_HC607;
            data['cl_macro_w'] = $this.global_HC607.tipoMacro_HC607;
            data['cod_macro_w'] = $this.global_HC607.codMacro_HC607;
            data['via_w'] = $this.global_HC607.viaMacro_HC607;
            data['unserv_w'] = $this.global_HC607.codServIni_HC607;

            data['diag_egr1_w'] = $this.global_HC607.diagnosticos[0].cod;
            data['diag_egr2_w'] = $this.global_HC607.diagnosticos[1].cod;
            data['diag_egr3_w'] = $this.global_HC607.diagnosticos[2].cod;
            data['diag_egr4_w'] = $this.global_HC607.diagnosticos[3].cod;
            data['diag_egr5_w'] = $this.global_HC607.diagnosticos[4].cod;

            data['estado_salida_w'] = $this.global_HC607.salida_HC607.substring(0, 1);
            data['diag_muer_w'] = $this.global_HC607.diagMuerte_HC607;
            data['remitido_w'] = $this.global_HC607.remitido_HC607;

            // guarda detalle epi

            this.global_HC607.tabla_epi = this.global_HC607.tabla_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').toUpperCase().trim();
            var tabla_epi_content = this.global_HC607.tabla_epi.enterReplace().strToTable("TABLA_EPI");

            // guardar plan epi

            this.global_HC607.plan_epi = this.global_HC607.plan_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').toUpperCase().trim();
            var plan_epi_content = this.global_HC607.plan_epi.enterReplace().strToTable("PLAN_EPI");

            // guardar proced diag epi

            this.global_HC607.ResultProcedDiag_epi = this.global_HC607.ResultProcedDiag_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').toUpperCase().trim();
            var procedDiag_epi_content = this.global_HC607.ResultProcedDiag_epi.enterReplace().strToTable("PLAN_EPI");

            data = {
                ...data,
                ...tabla_epi_content,
                ...plan_epi_content,
                ...procedDiag_epi_content
            }

            $this.data = data;

            postData(data, get_url("APP/HICLIN/HC607.DLL"))
                .then(data => {
                    console.log(data)
                    toastr.success("Información guardada");
                    this.confirmarImprimir_HC607();
                }).catch(err => {
                    toastr.error("Error en guardado");
                    this.cerrarDiagnosticos_HC607()
                    console.log(err, 'error')
                    loader('hide')
                })
        },

        confirmarImprimir_HC607() {
            array_702R_607.titulo_epi = $this.global_HC607.titulo_HC607;
            array_702R_607.tipo_epi = $this.global_HC607.tipoFormato_HC607;
            array_702R_607.fecha_epi = $this.global_HC607.año_HC607 + $this.global_HC607.mes_HC607 + $this.global_HC607.dia_HC607;
            array_702R_607.hora_epi = $this.global_HC607.hora_HC607 + $this.global_HC607.min_HC607;
            array_702R_607.edad = $this.global_HC607.edad_HC607;
            array_702R_607.acompa_epi = $this.global_HC607.acomp_HC607;
            array_702R_607.unser_descrip = $this.global_HC607.servIni_HC607;
            array_702R_607.espec_ref = $this.global_HC607.espec_HC607;
            array_702R_607.reng_epi = $this.global_HC607.tabla_epi;
            array_702R_607.plan_epi = $this.global_HC607.plan_epi;
            array_702R_607.result_proced_diag_epi = $this.global_HC607.ResultProcedDiag_epi;
            array_702R_607.diag_egr = $this.global_HC607.diagnosticos;
            array_702R_607.cl_macro = $this.global_HC607.tipoMacro_HC607;
            array_702R_607.cod_macro = $this.global_HC607.codMacro_HC607;
            array_702R_607.via_j = $this.global_HC607.viaMacro_HC607;
            array_702R_607.oper_elab_j = $this.global_HC607.oper_HC607;
            array_702R_607.medico = $this.global_HC607.medico_HC607;

            CON851P('00',
                () => {
                    this.llamarReferencia_HC607()
                },
                () => {
                    this.imprimir_HC607()
                });
        },

        async imprimir_HC607() {
            if ($this.global_HC607.tipoFormato_HC607 == '2' || $this.global_HC607.tipoFormato_HC607 == '3') {
                await _iniciarHC702R(array_702R_607);
                await this.llamarReferencia_HC607();
            } else {
                switch ($_REG_HC.clase_hc) {
                    case '1':
                        aiepi_w = '1';
                        // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
                        await this.continue_HC607();
                        break;
                    case '2':
                        aiepi_w = '2';
                        await this.continue_HC607();
                        break;
                    default:
                        aiepi_w = '0';
                        await this.continue_HC607();
                        break;
                }
            }
        },

        async continue_HC607() {
            await this.llamarArchivoEpi_HC607();
            await this.buscarEpicrisis_HC607();
        },

        async buscarEpicrisis_HC607() {
            $this = this;

            tipo_epi_w = this._datos[0]['TIPO_EPI_J'];
            sw_epi_w = this._datos[0]['SW_EPI_J'];

            console.log(tipo_epi_w);
            console.log(sw_epi_w);

            console.log("aqui:", aiepi_w);

            if ($_USUA_GLOBAL[0].NIT == 892000264) {
                if (localStorage.Usuario == "APCF" || localStorage.Usuario == "LYRC") {
                    if (aiepi_w == '0') {
                        if (sw_epi_w.trim() == '') {
                            await this.seleccionMetodo_HC607();
                        } else if (sw_epi_w == '2') {
                            opc_evo_w = "S";
                            await this.procesos_HC607();
                        }
                    }

                    if (aiepi_w == '1' || aiepi_w == '2') {
                        // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
                        if (sw_epi_w.trim() == '') {
                            await this.seleccionMetodo_HC607();
                        } else if (sw_epi_w == '2') {
                            opc_evo_w = "S";
                            await this.procesos_HC607();
                        }
                    }
                } else {
                    if (aiepi_w == '0') {
                        if (sw_epi_w.trim() == '') {
                            sw_epi_w = '1';
                            await _iniciarHCI107(array_702R_607);
                            await this.llamarReferencia_HC607();
                        } else if (sw_epi_w == '2') {
                            opc_evo_w = "S";
                            await this.procesos_HC607();
                        }
                    }

                    if (aiepi_w == '1' || aiepi_w == '2') {
                        if (sw_epi_w.trim() == '') {
                            sw_epi_w = '1';
                            await this.procesos_HC607();
                        } else if (sw_epi_w == '2') {
                            opc_evo_w = "S";
                            await this.procesos_HC607();
                        }
                    }
                }
            } else {
                if (aiepi_w == '0') {
                    if (sw_epi_w.trim() == '') {
                        await this.seleccionMetodo_HC607();
                    } else if (sw_epi_w == '2') {
                        opc_evo_w = "S";
                        await this.procesos_HC607();
                    }
                }

                if (aiepi_w == '1' || aiepi_w == '2') {
                    // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
                    if (sw_epi_w.trim() == '') {
                        await this.seleccionMetodo_HC607();
                    } else if (sw_epi_w == '2') {
                        opc_evo_w = "S";
                        await this.procesos_HC607();
                    }
                }
            }

        },

        async seleccionMetodo_HC607() {
            var fuente = '<div>' +
                '<div class="col-md-12">' +
                '<div class="portlet light no-padding">' +
                '<div class="portlet-body no-padding">' +
                '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

                '<div class="col-md-12" style="display: flex" id="divVentanaFecha_HC607">' +

                '<div class="col-md-2">' +
                '</div>' +

                '<div class="col-md-8">' +
                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-8 col-xs-12">1. Imprimir resumen digitado por medico</label>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="col-md-2">' +
                '</div>' +

                '</div>' +


                '<div class="salto-linea"></div>' +


                '<div class="col-md-12" style="display: flex" id="divVentanaFecha_HC607">' +

                '<div class="col-md-2">' +
                '</div>' +

                '<div class="col-md-8">' +
                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-8 col-xs-12">2. Resumen extraido por el sistema</label>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="col-md-2">' +
                '</div>' +

                '</div>' +


                '<div class="salto-linea"></div>' +


                '<div class="col-md-12" style="display: flex" id="divVentanaFecha_HC607">' +

                '<div class="col-md-2">' +
                '</div>' +

                '<div class="col-md-8">' +
                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-10 col-sm-8 col-xs-12">Que metodo de resumen desea:</label>' +
                '<div class="input-group col-md-2 col-sm-5 col-xs-5" id="metodo_HC607">' +
                '<input id="metodo_607" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="1" data-orden="1" required="true">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="col-md-2">' +
                '</div>' +

                '</div>' +


                '<div class="salto-linea"></div>' +
                '<div class="salto-linea"></div>' +
                '<div class="salto-linea"></div>' +

                '</div>' +

                '</div>' +
                '</div>' +
                '</div>' +
                '<div style="clear:both;"></div>' +
                '</div>'

            $this.ventanaInicial = bootbox.dialog({
                title: 'SELECCIONAR METODO',
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

            $this.ventanaInicial.on('shown.bs.modal', async function (e) {
                $('.modal-content').css({ 'width': '750px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })

                await $this.datoVentana_HC607();
            })
        },

        async datoVentana_HC607() {
            $this = this
            validarInputs({
                form: "#metodo_HC607",
                orden: "1"
            },
                () => {
                    $('[data-bb-handler="main"]').click()
                    _regresar_menuhis();
                },
                async () => {
                    sw_epi_w = document.getElementById("metodo_607").value;

                    if (sw_epi_w != '1' && sw_epi_w != '2') {
                        CON851('03', '03', null, 'error', 'error');
                        this.datoVentana_HC607();
                    } else {
                        switch (sw_epi_w) {
                            case '1':
                                $('[data-bb-handler="main"]').click();
                                // si selecciona 1 imprime el hci07 que es resumen de historia toca agregarlo

                                if (aiepi_w == '1' || aiepi_w == '2') {
                                    this.procesos_HC607();
                                } else {
                                    await _iniciarHCI107(array_702R_607);
                                    await this.llamarReferencia_HC607();
                                }
                                break;
                            case '2':
                                $('[data-bb-handler="main"]').click();
                                opc_evo_w = "S";
                                this.procesos_HC607();
                                break;
                            default:
                                this.datoVentana_HC607();
                                break;
                        }
                    }
                }
            )
        },

        async procesos_HC607() {
            $this = this;
            loader('show');

            $this.fechadesde = $_REG_HC.fecha_hc;
            $this.fechahasta = $this.fecha_act;

            if (aiepi_w == '0') {
                array_702A_607.tipo_epi_w = tipo_epi_w;
                array_702A_607.sw_epi_w = sw_epi_w;
                array_702A_607.sw_espec = "";

                await _iniciarHC702A(array_702A_607);
                await this.llamarReferencia_HC607();
            }

            if (aiepi_w == '2') {
                await this.llamarAIEPI010_HC607();
                await this.llamarReferencia_HC607();
            }

            if (aiepi_w == '1') {
                // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
                await this.llamarAIEPI020_HC607();
                await this.llamarReferencia_HC607();
            }
        },

        async llamarAIEPI010_HC607() {
            $this.crearJsonOpc();
            $this.dataBase64 = await iniciar_AIEPI010($this.opcionesHC607, $this.arrayDatos);
        },

        async llamarAIEPI020_HC607() {
            $this.crearJsonOpc();
            $this.dataBase64 = await iniciar_AIEPI020($this.opcionesHC607, $this.arrayDatos);
        },

        crearJsonOpc() {
            $this.opcionesHC607 = {
                opc_aper: "S",
                opc_evo: opc_evo_w,
                opc_enf: "N",
                opc_ter: "N",
                opc_for: "N",
                opc_lab: "N",
                opc_ima: "N",
                opc_ord: "N",
                opc_con: "N",
                opc_inc: "N",
                opc_resu: "N",
                fecha_ini_opc: $this.fechadesde,
                fecha_fin_opc: $this.fechahasta,
                opc_macro: ""
            },

                $this.arrayDatos = {
                    _ciudades: this._ciudades,
                    _entidades: this._entidades,
                    _ocupaciones: this._ocupaciones,
                    reg_pac: $this._paci,
                    _profesionales: this._profesionales,
                    _unserv: this._unserv,
                    _paisesRips: this._paisesRips,
                    _hcpac: this._hcprc,
                    _especialidades: $this._especialidades,
                    _detalles: this._detalles,
                    $_reg_hc: $_REG_HC,
                    $_reg_paci: $_REG_PACI,
                    tipo_epic: $this.global_HC607.tipoFormato_HC607
                }
        },

        async llamarArchivoEpi_HC607() {
            await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + $this.global_HC607.consecutivo_HC607 }, get_url("APP/HICLIN/HC702.DLL"))
                .then((data) => {
                    this._datos = data.DATOS;
                    this._datos.pop();
                })
                .catch((err) => {
                    console.log(err, 'err')
                    loader('hide')
                    _regresar_menuhis();
                });
        },

        async llamarReferencia_HC607() {
            if (this.global_HC607.novedad_w == 7 && this.global_HC607.tipoFormato_HC607 == 2) {
                $_REG_HC.fecha_ref_w = 0;
                $_REG_HC.medico_w = this.global_HC607.medico_HC607;
                $_REG_HC.especia_remi_ref_w = this.global_HC607.espec_HC607;
                $_REG_HC.diag_prin_ref_w = this.global_HC607.diagnosticos[0].cod;
                $("#body_main").load("../../HICLIN/paginas/HCB06.html");
            } else {
                this.salir_HC607();
            }
        },

        _confirmarSalir_HC607(callback_esc, orden) {
            console.log(callback_esc, 'call', orden, 'ord');
            CON851P('03', () => { orden != undefined ? $this[callback_esc](orden) : $this[callback_esc]() }, () => { $this.salir_HC607() });
        },

        _salirF5_HC607(callback_esc) {
            console.log(callback_esc, 'esc');
            CON851P('03', () => { document.querySelector(`.${callback_esc}`).focus() }, () => { _regresar_menuhis() });
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
                    this._cargarPaisesRips_HC607();
                })
                .catch((err) => {
                    console.log(err, "err");
                    loader("hide");
                    $this.salir_HC607();
                });
        },

        async _cargarPaisesRips_HC607() {
            await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
                .then(data => {
                    this._paisesRips = data.PAISESRIPS;
                    this._paisesRips.pop();
                    this._cargarUnidadesServ_HC607();
                }).catch(err => {
                    console.log(err, 'error')
                    loader('hide')
                    _regresar_menuhis();
                })
        },

        async _cargarUnidadesServ_HC607() {
            await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
                .then((data) => {
                    this._unserv = data.UNSERV;
                    this._unserv.pop();
                    this._cargarCiudades_HC607();
                })
                .catch((err) => {
                    console.log(err, 'err')
                    loader('hide')
                    _regresar_menuhis();
                });
        },

        async _cargarCiudades_HC607() {
            await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
                .then(data => {
                    this._ciudades = data.CIUDAD;
                    this._ciudades.pop();
                    this._cargarEntidades_HC607();
                }).catch(err => {
                    console.log(err, 'error')
                    loader('hide')
                    _regresar_menuhis();
                })
        },

        async _cargarEntidades_HC607() {
            await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
                .then(data => {
                    this._entidades = data.ENTIDADES;
                    this._entidades.pop();
                    this._cargarOcupaciones();
                }).catch(err => {
                    console.log(err, 'error')
                    loader('hide')
                    _regresar_menuhis();
                })
        },

        async _cargarOcupaciones() {
            await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
                .then(data => {
                    this._ocupaciones = data.OCUPACIONES;
                    this._ocupaciones.pop();
                    this._cargarTipoMacros_HC607();
                }).catch(err => {
                    console.log(err, 'error')
                    loader('hide')
                    _regresar_menuhis();
                })
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
                    this.leerHistoria_HCI02();
                })
                .catch((err) => {
                    console.log(err, "err");
                    loader("hide");
                    $this.salir_HC607();
                });
        },

        async leerTablaEvo_HC607() {
            loader('show');
            await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|1||' }, get_url("APP/HICLIN/HC002B.DLL"))
                .then(async (data) => {
                    this.ultima_evo = data.EVOLUCIONES;
                    this.ultima_evo.pop();
                    loader("hide");
                    // if (data.EVOLUCIONES[0]) {
                    //     this.ultima_evo = data.EVOLUCIONES[0];
                    // }
                    // this.leerHistoria_HCI02();
                })
                .catch((err) => {
                    console.log(err, "err");
                    loader("hide");
                });
        },

        async leerHistoria_HCI02() {
            await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
                .then(data => {
                    this._hcprc = data.HCPAC;
                    this._cargarViasAcceso_HC607();
                }).catch(err => {
                    console.log(err, 'error')
                    loader('hide')
                    _regresar_menuhis();
                });
        },

        async _cargarViasAcceso_HC607() {
            await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER856.DLL"))
                .then((data) => {
                    this._vias = data.VIAS_ACCESO;
                    this._vias.pop();
                    this._cargarEpicrisis_HC607();
                })
                .catch((err) => {
                    console.log(err, "err");
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
                    this._epicrisis.reverse();
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
            $this.params_ser110c_ac.estado = true;
        },

        _ventanaEspecialidades_HC607() {
            _ventanaDatos({
                titulo: "ESPECIALIDADES",
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
            var busqMacros = $this._codigos.filter(e => e.CLASE == this.global_HC607.tipoMacro_HC607);
            _ventanaDatos({
                titulo: "VENTANA MACROS",
                columnas: ["CLASE", "CODIGO", "DETALLE"],
                data: busqMacros,
                callback_esc: function () {
                    document.querySelector(".codMacro_HC607").focus();
                },
                callback: function (data) {
                    $this.global_HC607.codMacro_HC607 = data.CODIGO.trim();
                    _enterInput(".codMacro_HC607");
                },
            });
        },

        async _ventanaDiagnosticos_HC607(pos) {
            await _ventanaDatos({
                titulo: "VENTANA DE ENFERMEDADES",
                columnas: ["COD_ENF", "NOMBRE_ENF"],
                data: $this._enfermedades,
                callback_esc: function () {
                    if (pos == 'muerte') {
                        document.querySelector(`.diagMuerte_HC607`).focus();
                    } else {
                        document.querySelector(`.codDiag_${pos}_HC607`).focus();
                    }
                },
                callback: async function (data) {
                    if (pos == 'muerte') {
                        $this.global_HC607.diagMuerte_HC607 = data['COD_ENF'].trim();
                        $this.global_HC607.descripDiagMuerte_HC607 = data['NOMBRE_ENF'].trim();
                        setTimeout(() => { _enterInput(`.diagMuerte_HC607`); }, 200);
                    } else {
                        $this.global_HC607.diagnosticos[pos].cod = data['COD_ENF'].trim();
                        $this.global_HC607.diagnosticos[pos].descrip = data['NOMBRE_ENF'].trim();
                        setTimeout(() => {
                            _enterInput(`.codDiag_${pos}_HC607`);
                            console.log('sale')
                        }, 200);
                    }
                }
            });
        },

        validarEsc_acomp(data) {
            this.params_ser110c_ac.estado = false;
            this.acomp = data;
            this.leerAcomp_HC607();
        },
        validarCallback_acomp(data) {
            this.params_ser110c_ac.estado = false;
            this.acomp = data;
            this.leerAcomp_HC607();
        }
    }
});