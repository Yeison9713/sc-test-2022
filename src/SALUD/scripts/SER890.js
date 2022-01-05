// import { SetupCalendar, Calendar, DatePicker } from './../frameworks/v-calendar';
// Vue.use(VCalendar);
// import 'v-calendar/lib/v-calendar.min.css';
// var $_this = null;
new Vue({
    el: '#SER890',
    data: {
        form: {
            novedad_SER890: '',
            paciente_SER890: '',
            paciented_SER890: '',
            edadpaciente_SER890: '',
            epspaciente_SER890: '',
            epspaciented_SER890: '',
            unidaddeservicio_SER890: '',
            unidaddeserviciod_SER890: '',
            sucursal_SER890: '',
            sucursald_SER890: '',
            tipoprofesion_SER890: '',
            tipoprofesiond_SER890: '',
            fechadesea_SER890: '',
            fechacita_SER890: '',
            medico_SER890: '',
            medicod_SER890: '',
            duracion_SER890: '',
            clasedeservicio_SER890: '',
            clasedeserviciod_SER890: '',
            cantidaddeterapias_SER890: '',
            procedimiento_SER890: '',
            procedimientod_SER890: '',
            contrato_SER890: '',
            contratod_SER890: '',
            convenio_SER890: '',
            conveniod_SER890: '',
            embarazo_SER890: '',
            embarazod_SER890: '',
            telefonouno_SER890: '',
            telefonodos_SER890: '',
            viaasignacion_SER890: '',
            viaasignaciond_SER890: '',
            finalidad_SER890: '',
            finalidadd_SER890: '',
            citadoble_SER890: '',
            citadobled_SER890: '',
            tipoanestesia_SER890: '',
            tipoanestesiad_SER890: '',
            observacion_SER890: '',
        },
        botondisponibleAgendamiento_SER890: 'botondisponibleAgendamiento_SER890',
        botonnodisponibleAgendamiento_SER890: 'botonnodisponibleAgendamiento_SER890',
        SER890: [],
        PROFESIONALES: [],
        FECHAS: [],
        ESTADO_VENTANA_AGENDAMIENTO: false,
        inputValue: {
            start: new Date(2020, 0, 1),
            end: new Date(2020, 0, 5)
        },
        inputEvents: {
            start: new Date(2020, 0, 1),
            end: new Date(2020, 0, 5)
        },
        range: {
            start: new Date(2020, 0, 1),
            end: new Date(2020, 0, 5)
        },
        themeStyles: {
            wrapper: {
                border: '1'
            },
            header: {
                color: '#fafafa',
                backgroundColor: '#f142f4',
                borderColor: '#404c59',
                borderWidth: '1px 1px 0 1px'
            },
            headerVerticalDivider: {
                borderLeft: '1px solid #404c59'
            },
            weekdays: {
                color: '#ffffff',
                backgroundColor: '#f142f4',
                borderColor: '#ff0098',
                borderWidth: '0 1px',
                padding: '5px 0 10px 0'
            },
            weekdaysVerticalDivider: {
                borderLeft: '1px solid #404c59'
            },
            weeks: {
                border: '1px solid #dadada'
            }
        },
    },
    created() {
        loader('show');
        let $_this = this;
        _toggleNav();
        _inputControl('disabled');
        this.SER890.FECHAACTUAL = moment().format('YYYYMMDD');
        let active = $('#navegacion').find('li.opcion-menu.active');
        if (active.length > 0) this.SER890.OPCIONACTIVA = active[0].attributes[2].nodeValue;
        else this.SER890.OPCIONACTIVA = '097C11';
        let Nombreopcion = {
            '097C11': '9,7,C,1,1 - Actualizar Citas',
            '097C12': '9,7,C,1,2 - Reimprime Citas',
            '097C13': '9,7,C,1,3 - Cancelacion de Citas'
        };
        nombreOpcion(Nombreopcion[this.SER890.OPCIONACTIVA]);
        if (this.SER890.OPCIONACTIVA == '097C12' || this.SER890.OPCIONACTIVA == '097C13')
            this.form.novedad_SER890 = '8- Cambio';
        if ($_USUA_GLOBAL[0].NIT == '0800156469') {
            this.SER890.SERVICIOS = [
                { COD: '0', DESCRIPCION: 'DROGUERIA' },
                { COD: '1', DESCRIPCION: 'CIRUGIAS' },
                { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
                { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
                { COD: '4', DESCRIPCION: 'DOPPLER' },
                { COD: '5', DESCRIPCION: 'T.A.C.' },
                { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
                { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' }
            ];
        } else {
            this.SER890.SERVICIOS = [
                { COD: '0', DESCRIPCION: 'DROGUERIA' },
                { COD: '1', DESCRIPCION: 'CIRUGIAS' },
                { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
                { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
                { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
                { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
                { COD: '6', DESCRIPCION: 'PATOLOGIA' },
                { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' }
            ];
        }
        obtenerDatosCompletos({ nombreFd: 'PROFESION' }, function (data) {
            loader('hide');
            $_this.SER890.PROFESION = data.PROFESION;
            for (var i in $_this.SER890.PROFESION) {
                if (
                    $_this.SER890.PROFESION[i].COD.trim() == '3' ||
                    $_this.SER890.PROFESION[i].COD.trim() == '9' ||
                    $_this.SER890.PROFESION[i].COD.trim() == 'B' ||
                    $_this.SER890.PROFESION[i].COD.trim() == 'I'
                ) {
                    $_this.SER890.PROFESION.splice(i, 1);
                }
            }
            OPCIONES = new Object();
            OPCIONES = {
                '097C11': () => {
                    CON850($_this._evaluarCON850_SER890);
                },
                '097C12': $_this._evaluarpaciente_SER890,
                '097C13': $_this._evaluarpaciente_SER890
            };
            let opcion = new Function();
            opcion = OPCIONES[$_this.SER890.OPCIONACTIVA];
            opcion();

            obtenerDatosCompletos({ nombreFd: 'UNSERV' }, function (data) {
                $_this.SER890.UNSERV = [];
                var conteo = 1;
                for (var i in data.UNSERV) {
                    if (data.UNSERV[i].ESTADO.trim() == 'S') {
                        if (data.UNSERV[i].COD.trim() != '') {
                            $_this.SER890.UNSERV.push({
                                ID: conteo,
                                DESCRIP:
                                    `${data.UNSERV[i].COD}` + ' - ' + `${data.UNSERV[i].DESCRIP}`
                            });
                            conteo++;
                        }
                    }
                }
                obtenerDatosCompletos({ nombreFd: 'SUCURSALES' }, function (data) {
                    data.SUCURSAL.pop();
                    $_this.SER890.SUCURSALES = [];
                    var conteo = 1;
                    for (var i in data.SUCURSAL) {
                        if (data.SUCURSAL[i].CODIGO.trim() != '') {
                            $_this.SER890.SUCURSALES.push({
                                ID: conteo,
                                DESCRIPCION:
                                    `${data.SUCURSAL[i].CODIGO}` +
                                    ' - ' +
                                    `${data.SUCURSAL[i].DESCRIPCION}`
                            });
                            conteo++;
                        }
                    }
                });
            });
        });
    },
    watch: {
        range: function () {
            this.ESTADO_VENTANA_AGENDAMIENTO = false;
            let day = moment(moment().format('YYYYMMDD'), 'YYYYMMDD').day();
            if (day == 0) day = 7;
            loader('show');
            postData(
                {
                    datosh: `${datosEnvio()}${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}|`,
                    FECHAINICIAL: `${moment(this.range.start).format('YYYYMMDD')}`,
                    FECHAFINAL: `${moment(this.range.end).format('YYYYMMDD')}`,
                    DIA: day,
                    ATIENDE: this.form.tipoprofesion_SER890,
                    PASO: '1'
                },
                get_url('APP/SALUD/SER890.DLL')
            )
            .then((data) => {
                loader('hide');
                console.log(data);
                this.PROFESIONALES = data.PROFESIONALES;
                this.SER890.VENTANAIDAGENDA = 'AGENDAMIENTOMEDICOS';
                this.ESTADO_VENTANA_AGENDAMIENTO = true;
                let fechaactual = new Date();
                let fechafinal = fechaactual.setDate(fechaactual.getDate() + '7');
                this.FECHAS = data.PROFESIONALES[0].HORARIO;
                this.range.start = fechaactual;
                this.range.end = fechafinal;
            })
            .catch((error) => {
                this.ESTADO_VENTANA_AGENDAMIENTO = false;
                loader('hide');
                console.error(error);
                CON851(
                    '',
                    'Ocurrio un error consultando los horarios de los profesionales',
                    null,
                    'error',
                    'Error'
                );
                this._evaluartipoprofesion_SER890();
            });
        }
    },
    methods: {
        _evaluarCON850_SER890(data) {
            this.form.novedad_SER890 = `${data.id} - ${data.descripcion}`;
            if (
                this.form.novedad_SER890.substring(0, 1) == '7' ||
                this.form.novedad_SER890.substring(0, 1) == '8' ||
                this.form.novedad_SER890.substring(0, 1) == '9'
            ) {
                this._evaluarpaciente_SER890();
            } else {
                _toggleNav();
            }
        },
        _evaluarpaciente_SER890() {
            validarInputs(
                {
                    form: '#VALIDAR1_SER890',
                    orden: '1'
                },
                () => {
                    if (this.SER890.OPCIONACTIVA == '097C11') {
                        setTimeout(() => {
                            CON850(this._evaluarCON850_SER890);
                        }, 300);
                    } else {
                        _toggleNav();
                    }
                },
                () => {
                    if (this.form.paciente_SER890.trim() == '' || this.form.paciente_SER890 == 0) {
                        CON851('03', '03', null, 'error', 'Error');
                        this._evaluarpaciente_SER890();
                    } else {
                        postData(
                            {
                                datosh: `${datosEnvio()}${this.form.paciente_SER890.padStart(
                                    15,
                                    '0'
                                )}|`
                            },
                            get_url('APP/SALUD/SER810-1.DLL')
                        )
                            .then((data) => {
                                this.SER890.PACIENTE = data['REG-PACI'][0];
                                this.form.paciented_SER890 = this.SER890.PACIENTE.DESCRIP;
                                this.form.epspaciente_SER890 = this.SER890.PACIENTE.EPS;
                                let FECHALNK = moment($_USUA_GLOBAL[0].FECHALNK, 'YYMMDD').format(
                                    'YYYYMMDD'
                                );
                                let AÑOPACIENTE = this.SER890.PACIENTE['FECHA-CORR'].substring(
                                    0,
                                    4
                                );
                                let MESPACIENTE = this.SER890.PACIENTE['FECHA-CORR'].substring(
                                    4,
                                    6
                                );
                                if (AÑOPACIENTE == '0000' && MESPACIENTE == '00') {
                                    // this._consultarpacientesegundaventana_SER890();
                                    this._validarpaciente_SER890();
                                } else {
                                    if (AÑOPACIENTE == FECHALNK.substring(0, 4)) {
                                        if (MESPACIENTE > FECHALNK.substring(4, 6)) {
                                            this._consultarpacientesegundaventana_SER890();
                                        } else {
                                            this._validarpaciente_SER890();
                                        }
                                    } else {
                                        this._consultarpacientesegundaventana_SER890();
                                    }
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                if (this.SER890.OPCIONACTIVA == '097C11') {
                                    if (error.MENSAJE == '01') {
                                        // segunda ventana
                                        this._evaluarpaciente_SER890();
                                    } else {
                                        CON851(
                                            '',
                                            'Error en paciente consulte a Prosoft',
                                            null,
                                            'error',
                                            'Error'
                                        );
                                        this._evaluarpaciente_SER890();
                                    }
                                } else {
                                    CON851('', 'Paciente no existe', null, 'error', 'Error');
                                    this._evaluarpaciente_SER890();
                                }
                            });
                    }
                }
            );
        },
        _consultarpacientesegundaventana_SER890() {
            // SEGUNDA VENTANA
        },
        _validarpaciente_SER890() {
            if (
                $_USUA_GLOBAL[0].NIT == 844003225 &&
                this.SER890.PACIENTE.CIUDAD == 85001 &&
                this.form.paciente_SER890 > 100
            ) {
                this.SER890.PACIENTE.DERECHO = 2;
            }
            postData(
                {
                    datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
                    ENTIDAD: `${this.SER890.PACIENTE.EPS}|`
                },
                get_url('APP/SALUD/SER853.DLL')
            )
                .then((data) => {
                    console.debug(data);
                    this.form.epspaciented_SER890 = data['NOMBRE-ENT'];
                })
                .catch((error) => {
                    console.error(error);
                });
            if (this.SER890.PACIENTE['NIT-FACT'] > 0) {
                postData(
                    {
                        datosh: `${datosEnvio()}${this.SER890.PACIENTE['NIT-FACT']}|8|`
                    },
                    get_url('APP/CONTAB/CON802_01.DLL')
                )
                    .then((data) => {
                        console.debug(data);
                        this.SER890.TERCERO = data.TERCER[0];
                        this.form.epspaciented_SER890 = this.SER890.TERCERO.DESCRIP_TER;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            if (this.SER890.PACIENTE.TUTELA == 'S') {
                CON851('5B', '5B', null, 'error', 'Error');
            }
            if (this.SER890.PACIENTE['ALT-COS'] == 'S') {
                CON851('5J', '5J', null, 'error', 'Error');
            }
            if (this.SER890.PACIENTE['PROG-ESP'] == 'S') {
                CON851('5Q', '5Q', null, 'error', 'Error');
            }
            if (this.SER890.PACIENTE.CRONICO == 'S') {
                CON851('7A', '7A', null, 'error', 'Error');
            }
            if (this.SER890.PACIENTE.MULTICONSUL == 'S') {
                CON851('5V', '5V', null, 'error', 'Error');
            }
            if (this.SER890.PACIENTE['RESULT_COVID'] == 'S') {
                CON851('K1', 'K1', null, 'error', 'Error');
            }
            if (this.SER890.PACIENTE['EMB-ALTO-RIESG'] == 'S') {
                CON851('EH', 'EH', null, 'error', 'Error');
            }
            if ($_USUA_GLOBAL[0].NIT == 845000038) {
                this.SER890.PACIENTE.EDAD = calcular_edad(
                    moment(this.SER890.PACIENTE.NACIM).format('YYYY-MM-DD')
                );
                if (this.SER890.PACIENTE.EDAD.unid_edad == 'A') {
                    if (
                        this.SER890.PACIENTE.EDAD.vlr_edad == 45 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 50 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 55 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 60 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 65 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 70 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 75 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 80 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 85 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 90 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 95 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 100 ||
                        this.SER890.PACIENTE.EDAD.vlr_edad == 105
                    ) {
                        CON851('8T', '8T', null, 'error', 'Error');
                    }
                }
            }
            if (this.SER890.PACIENTE['MED-FAMI'] > 0) {
                postData(
                    {
                        datosh: `${datosEnvio()}${this.SER890.PACIENTE['MED-FAMI']}|8|`
                    },
                    get_url('APP/CONTAB/CON802_01.DLL')
                )
                    .then((data) => {
                        console.debug(data);
                        this.SER890.TERCERO = data.TERCER[0];
                        this.form.medicofamiliar_SER890 = this.SER890.TERCERO.DESCRIP_TER;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            if (this.form.paciente_SER890 > 100) {
                _preguntascovid_VENTANA(
                    this._mostrarfacturado_SER890,
                    this._evaluarpaciente_SER890
                );
            } else {
                // Falta llenar datos en espacios covid y vacunacion covid
                _mostrarfacturado_SER890();
            }
        },
        _mostrarfacturado_SER890(data) {
            console.log(data);
            this.SER890.SINTOMASERAW2 = data.SINTOMAS;
            this.SER890.FIEBREW2 = data.FIEBRE;
            this.SER890.COVDIGESTIVOW2 = data.DIGESTIVO;
            this.SER890.COVCANSANW2 = data.CANSANCIO;
            this.SER890.COVGUSOLFW2 = data.GUSTO;
            this.SER890.CONTATOCOVIDW2 = data.CONTACTO;
            this.SER890.ENFCOVDW2 = data.ENFERMEDAD;
            this.SER890.SIGUECUARW2 = data.CUARENTENA;
            this.SER890.LLAVEANTW = '';

            if (this.form.novedad_SER890.substring(0, 1) == '7') {
                if (this.SER890.PACIENTE.DERECHO == '6') {
                    CON851('2T', '2T', null, 'error', 'Error');
                }
                if (
                    (this.SER890.PACIENTE.DERECHO == '2' ||
                        this.SER890.PACIENTE.DERECHO == '4' ||
                        this.SER890.PACIENTE.DERECHO == '7' ||
                        this.SER890.PACIENTE.DERECHO == '8' ||
                        this.SER890.PACIENTE.DERECHO == 'A') &&
                    ($_USUA_GLOBAL[0].NIT == 891855847 ||
                        $_USUA_GLOBAL[0].NIT == 800037979 ||
                        $_USUA_GLOBAL[0].NIT == 800162035 ||
                        $_USUA_GLOBAL[0].NIT == 900405505 ||
                        $_USUA_GLOBAL[0].NIT == 822002688)
                ) {
                    CON851('80', '80', null, 'error', 'Error');
                    this.form.paciente_SER890 = '';
                    this._evaluarpaciente_SER890();
                } else if (this.SER890.PACIENTE.DERECHO == '5') {
                    CON851('2N', '2N', null, 'error', 'Error');
                    this.form.paciente_SER890 = '';
                    this._evaluarpaciente_SER890();
                } else {
                    SER835(
                        {
                            PACIENTE: this.form.paciente_SER890,
                            CLFACT: '9',
                            NITUSU: $_USUA_GLOBAL[0].NIT,
                            DESCRIPPACI: this.form.paciented_SER890
                        },
                        (data) => {
                            setTimeout(() => {
                                this._SER836_SER890(data);
                            }, 300);
                        },
                        (data) => {
                            setTimeout(() => {
                                this._SER836_SER890(data);
                            }, 300);
                        }
                    );
                }
            } else {
                if (
                    this.form.novedad_SER890.substring(0, 1) == '8' ||
                    this.form.novedad_SER890.substring(0, 1) == '9'
                ) {
                    // postData(
                    //     {
                    //         datosh: `${datosEnvio()}H| | | | | | | | |${$_USUA_GLOBAL[0].FECHALNK.substring(
                    //             0,
                    //             2
                    //         )}| | | | | | | | | | | | | | | | | | | | | | | | |${this.form.paciente_SER890.padStart(
                    //             15,
                    //             '0'
                    //         )}|`
                    //     },
                    //     get_url('APP/SALUD/SAL97C11.DLL')
                    // )
                    //     .then((data) => {
                    //         data.CITAS.pop();
                    //         this.SER890.CITAS = data.CITAS;
                    //         if (this.SER890B.CITAS.length == 0) {
                    //             CON851(
                    //                 '',
                    //                 'No tiene ninguna cita agendada',
                    //                 null,
                    //                 'error',
                    //                 'Error'
                    //             );
                    //             pacienteMask_SAL97C11.typedValue = '';
                    //             this._evaluarpaciente_SER890();
                    //         } else {
                    //             _ventanaDatos({
                    //                 titulo: 'CITAS AGENDADAS',
                    //                 columnas: [
                    //                     'FECHA_CITA',
                    //                     'HORA_CITA',
                    //                     'SUCURSAL',
                    //                     'TIPO',
                    //                     'ID_MEDICO',
                    //                     'NOMBRE_MEDICO',
                    //                     'ID_PACIENTE',
                    //                     'NOMBRE_PACIENTE'
                    //                 ],
                    //                 data: this.SER890.CITAS,
                    //                 ancho: '95%',
                    //                 callback_esc: function () {
                    //                     this._evaluarpaciente_SER890();
                    //                 },
                    //                 callback: function (data) {
                    //                     console.log(data, 'VENTANA');
                    //                     SAL97C11.PACIW = data.ID_PACIENTE.replace(
                    //                         /,/g,
                    //                         ''
                    //                     )
                    //                         .trim()
                    //                         .padStart(15, '0');
                    //                     this.form.paciente_SER890 =
                    //                         SAL97C11.PACIW;
                    //                     this.form.paciented_SER890 =
                    //                         data.NOMBRE_PACIENTE;
                    //                     SAL97C11.MEDW = data.ID_MEDICO.replace(
                    //                         /,/g,
                    //                         ''
                    //                     )
                    //                         .trim()
                    //                         .padStart(10, '0');
                    //                     medicoMask_SAL97C11.typedValue =
                    //                         SAL97C11.MEDW;
                    //                     $('#medicod_97C11').val(
                    //                         data.NOMBRE_MEDICO
                    //                     );
                    //                     SAL97C11.DESCRIPMEDW =
                    //                         data.NOMBRE_MEDICO;
                    //                     SAL97C11.TIPOFACTW = data.TIPO;
                    //                     claseMask_SAL7C11.typedValue =
                    //                         SAL97C11.TIPOFACTW;
                    //                     SAL97C11.CUPSW = data.CUP;
                    //                     SAL97C11.DESCRIPCUP = data.NOMBRE_CUP;
                    //                     $('#procedimiento_97C11').val(
                    //                         SAL97C11.CUPSW
                    //                     );
                    //                     $('#procedid_97C11').val(
                    //                         data.NOMBRE_CUP
                    //                     );
                    //                     // $('#hora_97C11').val(data.HORA_CITA);
                    //                     horaMask_SAL97C11.typedValue =
                    //                         data.HORA_CITA;
                    //                     SAL97C11.HORAW = data.HORA_CITA;
                    //                     $('#telefonouno_97C11').val(
                    //                         data.TEL_CITA
                    //                     );
                    //                     $('#telefonodos_97C11').val(
                    //                         data.TEL2_CITA
                    //                     );
                    //                     $('#sucursal_97C11').val(data.SUCURSAL);
                    //                     $('#finalidad_97C11').val(
                    //                         data.FINALID_CIT
                    //                     );
                    //                     SAL97C11.FINALIDADW = data.FINALID_CIT;
                    //                     $('#tipoprofesion_97C11').val(
                    //                         data.ATIENDE_PROF
                    //                     );
                    //                     SAL97C11.ATIENDEPROF =
                    //                         data.ATIENDE_PROF;
                    //                     SAL97C11.CONTRATOW = data.CONTRATO_CIT;
                    //                     SAL97C11.CONVENIOCNCAP =
                    //                         data.CONVENIO_CIT;
                    //                     SAL97C11.EMBARAZOW = data.EMBARAZO_CIT;
                    //                     SAL97C11.VALORW = data.VALOR;
                    //                     SAL97C11.EPSPACIW = data.EPS;
                    //                     SAL97C11.CLAVECANCW = data.CLAVE;
                    //                     SAL97C11.TELW = data.TEL_CITA;
                    //                     SAL97C11.TEL2W = data.TEL2_CITA;
                    //                     SAL97C11.DOBLEW = data.DOBLE_CIT;
                    //                     SAL97C11.ESTADOW = data.ESTADO_CITA;
                    //                     SAL97C11.OPERELABW = data.OPERELAB;
                    //                     SAL97C11.HORAELABW = data.HORAELAB;
                    //                     SAL97C11.FECHASOLICW = data.FECHASOLIC;
                    //                     SAL97C11.TIPOANESTW = data.TIPOANES;
                    //                     SAL97C11.NOMBREW = data.NOMBRE_PACIENTE;
                    //                     SAL97C11.OBSERW = data.OBSERV;
                    //                     fechadeseadaMask_SAL7C11.typedValue = data.FECHA_CITA.replace(
                    //                         /\//g,
                    //                         ''
                    //                     );
                    //                     fechacitaaMask_SAL7C11.typedValue = data.FECHA_CITA.replace(
                    //                         /\//g,
                    //                         ''
                    //                     );
                    //                     SAL97C11.FECHACIT = data.FECHA_CITA.replace(
                    //                         /\//g,
                    //                         ''
                    //                     );
                    //                     SAL97C11.FECHAW = data.FECHA_CITA;
                    //                     SAL97C11.FECHACITAMASK =
                    //                         data.FECHA_CITA;
                    //                     SAL97C11.ATIENDEW = data.ATIENDE_PROF.trim();
                    //                     SAL97C11.UNSERVW = data.UNSERV_CIT;
                    //                     SAL97C11.FECHAELABW = data.FECHAELAB;
                    //                     let OPCIONES = {
                    //                         ' ': 'VIGENTE',
                    //                         '*': 'ATENDIDA',
                    //                         C: 'CANCELADA'
                    //                     };
                    //                     $('#estadocita_97C11').val(
                    //                         data.ESTADO_CITA +
                    //                             ' ' +
                    //                             OPCIONES[data.ESTADO_CITA]
                    //                     );
                    //                     OPCIONES = {
                    //                         S: 'DOBLE',
                    //                         N: 'SENCILLA',
                    //                         T: 'TRIPLE'
                    //                     };
                    //                     $('#citadoble_97C11').val(
                    //                         data.DOBLE_CIT +
                    //                             ' ' +
                    //                             OPCIONES[data.DOBLE_CIT]
                    //                     );
                    //                     SAL97C11.LLAVEW =
                    //                         SAL97C11.FECHACIT +
                    //                         SAL97C11.MEDW +
                    //                         SAL97C11.PACIW +
                    //                         SAL97C11.TIPOFACTW +
                    //                         SAL97C11.CUPSW.padEnd(12, ' ') +
                    //                         data.SUCURSAL;
                    //                     SAL97C11.LLAVEALTW =
                    //                         SAL97C11.MEDW +
                    //                         SAL97C11.FECHACIT +
                    //                         data.HORA_CITA;
                    //                     SAL97C11.LLAVEANTW =
                    //                         SAL97C11.FECHACIT +
                    //                         SAL97C11.MEDW +
                    //                         SAL97C11.PACIW +
                    //                         SAL97C11.TIPOFACTW +
                    //                         SAL97C11.CUPSW.padEnd(12, ' ') +
                    //                         data.SUCURSAL;
                    //                     if (SAL97C11.OPCIONACTIVA == '097C11') {
                    //                         if (SAL97C11.NOVEDADW == '9') {
                    //                             setTimeout(() => {
                    //                                 CON851P(
                    //                                     '02',
                    //                                     SER890C,
                    //                                     _retiro_SAL97C11
                    //                                 );
                    //                             }, 300);
                    //                         } else {
                    //                             let URL = get_url(
                    //                                 'APP/CONTAB/CON904.DLL'
                    //                             );
                    //                             postData(
                    //                                 {
                    //                                     datosh:
                    //                                         datosEnvio() +
                    //                                         $_ADMINW +
                    //                                         '|ISCZ|'
                    //                                 },
                    //                                 URL
                    //                             )
                    //                                 .then((data) => {
                    //                                     _datounidad_7C11();
                    //                                 })
                    //                                 .catch((err) => {
                    //                                     CON851(
                    //                                         '',
                    //                                         'No cuenta con permisos para cambiar la cita',
                    //                                         null,
                    //                                         'error',
                    //                                         'Error'
                    //                                     );
                    //                                     let Window = BrowserWindow.getAllWindows();
                    //                                     if (Window > 1) {
                    //                                         setTimeout(
                    //                                             _cerrarSegundaVentana,
                    //                                             300
                    //                                         );
                    //                                     } else {
                    //                                         _toggleNav();
                    //                                     }
                    //                                 });
                    //                         }
                    //                     } else if (
                    //                         SAL97C11.OPCIONACTIVA == '097C13'
                    //                     ) {
                    //                         _datoestado_SAL97C11();
                    //                     } else {
                    //                         setTimeout(() => {
                    //                             SAL97C11.IMPRESION = new Object();
                    //                             SAL97C11.IMPRESION.NIT =
                    //                                 $_USUA_GLOBAL[0].NIT;
                    //                             SAL97C11.IMPRESION.NOMBREUSU =
                    //                                 $_USUA_GLOBAL[0].NOMBRE;
                    //                             SAL97C11.IMPRESION.FECHACITA =
                    //                                 SAL97C11.FECHAW;
                    //                             SAL97C11.IMPRESION.HORACITA = `${SAL97C11.HORAW.substring(
                    //                                 0,
                    //                                 2
                    //                             )}:${SAL97C11.HORAW.substring(
                    //                                 2,
                    //                                 4
                    //                             )}`;
                    //                             // SAL97C11.IMPRESION.MEDICOCITA = medicoMask_SAL97C11.value
                    //                             SAL97C11.IMPRESION.CUP =
                    //                                 SAL97C11.CUPSW;
                    //                             SAL97C11.IMPRESION.DESCRIPCUP =
                    //                                 SAL97C11.DESCRIPCUP;
                    //                             SAL97C11.IMPRESION.ENTIDAD =
                    //                                 SAL97C11.NOMBREENTW;
                    //                             SAL97C11.IMPRESION.APELLIDO1 =
                    //                                 SAL97C11.APELLIDO1;
                    //                             SAL97C11.IMPRESION.APELLIDO2 =
                    //                                 SAL97C11.APELLIDO2;
                    //                             SAL97C11.IMPRESION.NOMBRE1 =
                    //                                 SAL97C11.NOMBRE1;
                    //                             SAL97C11.IMPRESION.NOMBRE2 =
                    //                                 SAL97C11.NOMBRE2;
                    //                             SAL97C11.IMPRESION.NOMBREMEDICO =
                    //                                 SAL97C11.DESCRIPMEDW;
                    //                             SAL97C11.IMPRESION.CC =
                    //                                 pacienteMask_SAL97C11.value;
                    //                             SAL97C11.IMPRESION.HORACREA =
                    //                                 SAL97C11.FECHAELABW +
                    //                                 ' / ' +
                    //                                 SAL97C11.HORAELABW.substring(
                    //                                     0,
                    //                                     2
                    //                                 ) +
                    //                                 ':' +
                    //                                 SAL97C11.HORAELABW.substring(
                    //                                     2,
                    //                                     4
                    //                                 );
                    //                             SAL97C11.IMPRESION.OPERCREA =
                    //                                 SAL97C11.OPERELABW;
                    //                             SAL97C11.IMPRESION.TELESALUD = false;
                    //                             if (SAL97C11.UNSERVW == '63')
                    //                                 SAL97C11.IMPRESION.TELESALUD = true;
                    //                             CON851P(
                    //                                 '00',
                    //                                 () => {
                    //                                     let Window = BrowserWindow.getAllWindows();
                    //                                     if (Window.length > 1) {
                    //                                         _cerrarSegundaVentana();
                    //                                     } else {
                    //                                         _toggleNav();
                    //                                     }
                    //                                 },
                    //                                 () => {
                    //                                     _impresioncitas(
                    //                                         SAL97C11.IMPRESION,
                    //                                         () => {
                    //                                             let Window = BrowserWindow.getAllWindows();
                    //                                             if (
                    //                                                 Window.length >
                    //                                                 1
                    //                                             ) {
                    //                                                 setTimeout(
                    //                                                     _cerrarSegundaVentana,
                    //                                                     1000
                    //                                                 );
                    //                                             } else {
                    //                                                 _toggleNav();
                    //                                             }
                    //                                         },
                    //                                         () => {
                    //                                             CON851(
                    //                                                 '',
                    //                                                 'Ocurrio un error imprimiendo',
                    //                                                 _datoobser_SAL97C11(),
                    //                                                 'error',
                    //                                                 'Error'
                    //                                             );
                    //                                         }
                    //                                     );
                    //                                 }
                    //                             );
                    //                         }, 300);
                    //                     }
                    //                 }
                    //             });
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         console.error(err);
                    //         this.form.paciente_SER890 = '';
                    //         this._evaluarpaciente_SER890();
                    //     });
                }
            }
        },
        _SER836_SER890(data) {
            SER836(
                {
                    PACIENTE: this.form.paciente_SER890,
                    FECHA: this.SER890.FECHAACTUAL,
                    ANO: this.SER890.FECHAACTUAL.substring(2, 4)
                },
                this._datounidaddeservicio_SER890,
                this._datounidaddeservicio_SER890
            );
        },
        _datounidaddeservicio_SER890() {
            let unidadseleccionada = '1';
            if (this.form.novedad_SER890.substring(0, 1) == '8') {
                console.log('seleccionar la anterior');
            }
            POPUP(
                {
                    array: this.SER890.UNSERV,
                    titulo: 'UNIDADES DE SERVICIO',
                    indices: [
                        {
                            id: 'ID',
                            label: 'DESCRIP'
                        }
                    ],
                    seleccion: unidadseleccionada,
                    callback_f: this._evaluarpaciente_SER890
                },
                (data) => {
                    this.form.unidaddeservicio_SER890 = data.DESCRIP.substring(0, 2);
                    this.form.unidaddeserviciod_SER890 = data.DESCRIP.substring(3, 30);
                    this._evaluarsucursal_SER890();
                }
            );
        },
        _evaluarsucursal_SER890() {
            let sucursalseleccionada = '1';
            if (this.form.novedad_SER890.substring(0, 1) == '8') {
                console.log('seleccionar la anterior');
            }
            POPUP(
                {
                    array: this.SER890.SUCURSALES,
                    titulo: 'SUCURSALES',
                    indices: [
                        {
                            id: 'ID',
                            label: 'DESCRIPCION'
                        }
                    ],
                    seleccion: sucursalseleccionada,
                    callback_f: this._datounidaddeservicio_SER890
                },
                (data) => {
                    console.log(data);
                    this.form.sucursal_SER890 = data.DESCRIPCION.substring(0, 2);
                    this.form.sucursald_SER890 = data.DESCRIPCION.substring(5, 30);
                    this._evaluartipoprofesion_SER890();
                }
            );
        },
        _evaluartipoprofesion_SER890() {
            let personalseleccionado = '2';
            if (this.form.novedad_SER890.substring(0, 1) == '8') {
                console.log('seleccionar anterior');
            }
            POPUP(
                {
                    array: this.SER890.PROFESION,
                    titulo: 'Personal que atiende',
                    indices: [{ id: 'COD', label: 'DESCRIP' }],
                    seleccion: personalseleccionado,
                    teclaAlterna: true,
                    callback_f: this._evaluarsucursal_SER890
                },
                (data) => {
                    this.form.tipoprofesion_SER890 = data.COD;
                    this.form.tipoprofesiond_SER890 = data.DESCRIP;
                    this._evaluarmedico_SER890();
                }
            );
        },
        _evaluarmedico_SER890() {
            let day = moment(moment().format('YYYYMMDD'), 'YYYYMMDD').day();
            if (day == 0) day = 7;
            loader('show');
            postData(
                {
                    datosh: `${datosEnvio()}${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}|`,
                    FECHAINICIAL: `${moment().format('YYYYMMDD')}`,
                    FECHAFINAL: `${moment(moment().format('YYYYMMDD'))
                        .add(7, 'd')
                        .format('YYYYMMDD')}`,
                    DIA: day,
                    ATIENDE: this.form.tipoprofesion_SER890,
                    PASO: '1'
                },
                get_url('APP/SALUD/SER890.DLL')
            )
                .then((data) => {
                    loader('hide');
                    console.log(data);
                    this.PROFESIONALES = data.PROFESIONALES;
                    this.SER890.VENTANAIDAGENDA = 'AGENDAMIENTOMEDICOS';
                    this.ESTADO_VENTANA_AGENDAMIENTO = true;
                    let fechaactual = new Date();
                    let fechafinal = `${moment(moment().format('YYYYMMDD')).add(7, 'd').format('YYYYMMDD')}`;
                    fechafinal = new Date(fechafinal.substring(0,4),parseInt(fechafinal.substring(4,6)) - 1,fechafinal.substring(6,8));
                    this.FECHAS = data.PROFESIONALES[0].HORARIO;
                    this.range.start = fechaactual;
                    this.range.end = fechafinal;
                })
                .catch((error) => {
                    loader('hide');
                    console.error(error);
                    CON851(
                        '',
                        'Ocurrio un error consultando los horarios de los profesionales',
                        null,
                        'error',
                        'Error'
                    );
                    this._evaluartipoprofesion_SER890();
                });
            // postData(
            //     {
            //         datosh: `${datosEnvio()}|${this.form.tipoprofesion_SER890.substring(0, 1)}|`
            //     },
            //     get_url('APP/SALUD/SER819.DLL')
            // )
            //     .then((data) => {
            //         data.ARCHPROF.pop();
            //         this.PROFESIONALES = data.ARCHPROF;
            //         this.PROFESIONALES.filter(
            //             (x) => x.ATIENDE_PROF == this.form.tipoprofesion_SER890
            //         );
            //         this.SER890.VENTANAIDAGENDA = 'AGENDAMIENTOMEDICOS';
            //         this.ESTADO_VENTANA_AGENDAMIENTO = true;
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //         _toggleNav();
            //     });
        },
        // FUNCIONES DE LA VENTANA DE AGENDAMIENTO
        salirventanaagendamiento_esc() {
            this.ESTADO_VENTANA_AGENDAMIENTO = false;
            this.PROFESIONALES = [];
            this._evaluarpaciente_SER890();
        },
        cambiofocoventanaagendamiento(data) {
            console.log(data);
            this.FECHAS = this.PROFESIONALES[data].HORARIO;
            $_this = this;
        },
        salirventanaagendamiento(data) {
            this.ESTADO_VENTANA_AGENDAMIENTO = false;
            this._evaluarpaciente_SER890();
        },
        callbackfecha(data) {
            this.ESTADO_VENTANA_AGENDAMIENTO = false;
            if (data.DISPONIBLE.trim() != 'CITA DISPONIBLE') {
                CON851('03','03',null,'error','Error');
                return this._evaluarmedico_SER890();
            }

            this.form.medico_SER890 = document.getElementsByClassName(
                'tablaActivo'
            )[0].children[0].textContent;
            // this.form.medicod_SER890 = document.getElementsByClassName(
            //     'tablaActivo'
            // )[0].children[1].textContent;
            this.form.fechacita_SER890 = data.FECHA;
            this.form.horacita_SER890 = data.HORA;
            // this._evaluarclasedeservicio_SER890();
            postData(
                {
                    datosh: `${datosEnvio()}`,
                    paso: '1', codigo: this.form.medico_SER890
                },
                get_url('APP/SALUD/SER819.DLL')
            )
                .then((data) => {
                    console.log(data);
                    this.SER890.PROFESIONAL = data;
                    this.form.medicod_SER890 = data.NOMBRE;
                    this._evaluarclasedeservicio_SER890();
                })
                .catch((error) => {
                    console.error(error);
                    CON851(
                        '',
                        'Ocurrio un error consultando el profesional',
                        null,
                        'error',
                        'Error'
                    );
                    this._evaluarmedico_SER890();
                });
        },
        _evaluarclasedeservicio_SER890(){
            validarInputs(
                {
                    form: '#VALIDAR2_SER890',
                    orden: '1'
                },
                this._evaluarmedico_SER890,
                () => {
                    if (this.form.clasedeservicio_SER890.trim() == '') {
                        CON851('03','03',null,'error','Error');
                        return this._evaluarclasedeservicio_SER890();
                    }
                    let servicios = this.SER890.SERVICIOS;
                    let servicio = servicios.filter(data => data.COD == this.form.clasedeservicio_SER890);
                    if (servicio.length == 0) {
                        CON851('03','03',null,'error','Error');
                        return this._evaluarclasedeservicio_SER890();
                    }

                    console.log(servicio);
                    this.form.clasedeserviciod_SER890 = servicio[0].DESCRIPCION;
                    if (this.form.unidaddeservicio_SER890.trim() == '08' && this.form.clasedeservicio_SER890.trim() == '5') {
                        CON851('03','03',null,'error','Error');
                        return this._evaluarclasedeservicio_SER890();
                    }

                    if (this.form.clasedeservicio_SER890.trim() != '1' && ((this.SER890.PROFESIONAL.OPERAUTPROF != localStorage.Usuario) && (this.SER890.PROFESIONAL.OPERAUTCIRUPROF != localStorage.Usuario) && (this.SER890.PROFESIONAL.OPERAUTOTROPROF != localStorage.Usuario) && (this.SER890.PROFESIONAL.OPERAUT4PROF != localStorage.Usuario) && (this.SER890.PROFESIONAL.OPERAUT5PROF != localStorage.Usuario)  && (this.SER890.PROFESIONAL.OPERAUTPROF != 'XXXX') && (this.SER890.PROFESIONAL.OPERAUTPROF != '****'))) {
                        CON851('15','15',null,'error','Error');
                        return this._evaluarclasedeservicio_SER890();
                    }

                    this._evaluarcup_SER890();
                }
            )
        },
        _evaluarcup_SER890(){
            validarInputs(
                {
                    form: '#VALIDAR3_SER890',
                    orden: '1'
                },
                this._evaluarclasedeservicio_SER890,
                () => {
                    if (this.form.procedimiento_SER890.trim() == '') {
                        CON851('03','03',null, 'error', 'Error');
                        return this._evaluarcup_SER890();
                    }

                    postData(
                        {
                            datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
                            cup: this.form.procedimiento_SER890
                        },
                        get_url('APP/SALUD/SER802C.DLL')
                    )
                        .then((data) => {
                            console.log(data);
                            this.form.procedimientod_SER890 = data.DESCRIP;
                            if (this.form.procedimiento_SER890.substring(0,2) == '93' || this.form.procedimiento_SER890.trim() == '890210' || this.form.procedimiento_SER890.trim() == '890211' || this.form.procedimiento_SER890.trim() == '890212' || this.form.procedimiento_SER890.trim() == '890310' || this.form.procedimiento_SER890.trim() == '890311' || this.form.procedimiento_SER890.trim() == '890312' || this.form.procedimiento_SER890.trim() == '890410' || this.form.procedimiento_SER890.trim() == '890411' || this.form.procedimiento_SER890.trim() == '890412' || this.form.procedimiento_SER890.trim() == '890610' || this.form.procedimiento_SER890.trim() == '890611' || this.form.procedimiento_SER890.trim() == '890612') {
                                $('#TERAPIAS_SER890').removeClass('hide');
                                this._evaluarcantidaddeterapias_SER890();
                            } else {
                                postData({ datosh: `${datosEnvio()}2|${this.form.procedimiento_SER890}||${this.SER890.PACIENTE['NIT-FACT']}|${this.form.clasedeservicio_SER890}|${$_USUA_GLOBAL[0].SAL_MIN}|${this.form.medico_SER890}|` }, 
                                get_url("APP/SALUD/SAL97C11.DLL"))
                                .then(data => {
                                    console.debug(data);
                                    this._evaluarcontrato_SER890();
                                })
                                .catch(err => {
                                    console.error(err);
                                    this._evaluarcup_SER890()
                                })
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            this._evaluarcup_SER890();
                        });
                }
            )
        },
        _evaluarcantidaddeterapias_SER890(){
            validarInputs(
                {
                    form: '#VALIDAR4_SER890',
                    orden: '1'
                },
                this._evaluarcup_SER890,
                () => {
                    if (this.form.cantidaddeterapias_SER890.trim() == '' || this.form.cantidaddeterapias_SER890 < 2) {
                        CON851('03','03',null,'error','Error');
                        return this._evaluarcantidaddeterapias_SER890();
                    }

                    if (isNaN(this.form.cantidaddeterapias_SER890)) {
                        CON851('03','03',null,'error','Error');
                        return this._evaluarcantidaddeterapias_SER890();
                    }

                    this._evaluarcontrato_SER890();
                }
            )
        },
        _evaluarcontrato_SER890() {
            validarInputs(
                {
                    form: '#VALIDAR5_SER890',
                    orden: '1'
                },
                this._evaluarcup_SER890,
                () => {
                    this.SER890.VALORW = '000000000000';
                    if (this.form.contrato_SER890.trim() == '' || this.form.contrato_SER890 == 0){
                        this.form.contrato_SER890 = '0000';
                        this.form.convenio_SER890 = 'S0';
                        this.form.conveniod_SER890 = 'SOAT 2423'
                        return this._evaluardatoeducacion_SER890();
                    }

                    let URL = get_url("APP/SALUD/SAL97C11.DLL");
                    postData({ datosh: datosEnvio() + '3|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' }, 
                    get_url("APP/SALUD/SAL97C11.DLL"))
                    .then(data => {
                        console.debug(data);
                        this.SER890.CNCAP = data.CONSULTA[0];
                        this.form.contrato_SER890 = this.SER890.CNCAP.CONTRATO;
                        this.form.convenio_SER890 = this.SER890.CNCAP.CONVENIO_CNCAP;
                        this.form.conveniod_SER890 = this.SER890.CNCAP.DESCRIP_TAR;

                        this.SER890.VENTANACONVENIO ='VENTANACONVENIOSER890'
                        _ventanaalterna_SALUD(data = {
                            ID: this.SER890.VENTANACONVENIO,
                            titulo: 'VENTANA DE CONVENIO',
                            html: `
                            <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                                <div class="col-md-3 col-sm-3 col-xs-12">
                                    <div class="inline-inputs">
                                        <label class="col-md-4 col-sm-4 col-xs-4">Estudio</label>
                                        <div class="input-group col-md-8 col-sm-8 col-xs-8">
                                            <input id="estudio_VENTANASER890" class="form-control col-md-12 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-3 col-xs-12">
                                    <div class="inline-inputs">
                                        <label class="col-md-7 col-sm-7 col-xs-7">Insumos</label>
                                        <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                            <input id="insumos_VENTANASER890" class="form-control col-md-12 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-3 col-xs-12">
                                    <div class="inline-inputs">
                                        <label class="col-md-7 col-sm-7 col-xs-7">Total</label>
                                        <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                            <input id="total_VENTANASER890" class="form-control col-md-12 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-3 col-xs-12">
                                    <div class="inline-inputs">
                                        <label class="col-md-7 col-sm-7 col-xs-7">Desea continuar?</label>
                                        <div class="input-group col-md-5 col-sm-5 col-xs-5" id="VALIDAR1VENTANACONVENIO_SER890">
                                            <input id="continuar_VENTANASER890" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        });
                        this._evaluarcontinuarventanaconvenio_SER890();
                    })
                    .catch(err => {
                        console.error(err);
                        this._evaluarcontrato_SER890();
                    })
                }
            )
        },
        _evaluarcontinuarventanaconvenio_SER890(){
            validarInputs(
                {
                    form: '#VALIDAR1VENTANACONVENIO_SER890',
                    orden: '1'
                },
                () => {
                    $(`#${this.SER890.VENTANACONVENIO}`).remove();
                    this._evaluarcontrato_SER890();
                },
                () => {
                    $(`#${this.SER890.VENTANACONVENIO}`).remove();
                    this._evaluardatoeducacion_SER890()
                }
            )
        },
        _evaluardatoeducacion_SER890(){
            if ($_USUA_GLOBAL[0].NIT == 800162035 && this.SER890.PACIENTE['TIPO-AFIL'] == '1' && (this.SER890.PACIENTE.EPS == 'RES004' || this.SER890.PACIENTE.EPS == 'EAR000' || this.SER890.PACIENTE.EPS == 'EAR001' || this.SER890.PACIENTE.EPS == 'EAR002' || this.SER890.PACIENTE.EPS == 'EAR003' || this.SER890.PACIENTE.EPS == 'EAR004' || this.SER890.PACIENTE.EPS == 'EAR005')) {
                console.error('LEER COLEGIOS');
                return this._evaluartelefono_SER890('1');
            }

            this._evaluartelefono_SER890('1');
        },
        _evaluartelefono_SER890(input){
            validarInputs(
                {
                    form: '#VALIDAR6_SER890',
                    orden: input
                },
                this._evaluarcontrato_SER890,
                () => {
                    if (this.form.clasedeservicio_SER890 == '1') {
                        let TIPOSANES = [
                            { CODIGO: '1', DESCRIPCION: 'GENERAL' },
                            { CODIGO: '2', DESCRIPCION: 'EPIDURAL' },
                            { CODIGO: '3', DESCRIPCION: 'RAQUIDEA' },
                            { CODIGO: '4', DESCRIPCION: 'SEDACION' },
                            { CODIGO: '5', DESCRIPCION: 'BLOQUEO' },
                            { CODIGO: '6', DESCRIPCION: 'LOCAL ASISTIDA' },
                            { CODIGO: '7', DESCRIPCION: 'LOCAL' },
                            { CODIGO: '8', DESCRIPCION: 'SIN ANESTECIA' }
                        ];
                        return POPUP({
                                array: TIPOSANES,
                                titulo: "TIPO DE ANESTECIA",
                                indices: [
                                    { label: 'DESCRIPCION' }
                                ],
                                callback_f: () => { this._evaluartelefono_SER890('1') }
                            },
                                data => {
                                    this.form.tipoanestesia_SER890 = data.CODIGO
                                    this.form.tipoanestesiad_SER890 = data.DESCRIPCION
                                    this._evaluarembarazo_SER890();
                            });
                    }

                    this.form.tipoanestesia_SER890 = '';
                    this.form.tipoanestesiad_SER890 = 'NO APLICA'
                    this._evaluarembarazo_SER890();
                }
            )
        },
        _evaluarembarazo_SER890(){
            // let fechanacim = $_REG_PACI[0].NACIM;
            this.SER890.EDAD = calcular_edad(moment(this.SER890.PACIENTE.NACIM).format('YYYY-MM-DD'));

            if (this.SER890. PACIENTE.SEXO == 'F' && this.SER890.EDAD.unid_edad == 'A' && this.SER890.EDAD.vlr_edad > 8 && this.SER890.EDAD.vlr_edad < 60) {
                return POPUP(
                        {
                            array: [
                                { CODIGO: '1', DESCRIPCION: 'EMBARAZO PRIMER TRIMESTRE' },
                                { CODIGO: '2', DESCRIPCION: 'EMBARAZO SEGUND TRIMESTRE' },
                                { CODIGO: '3', DESCRIPCION: 'EMBARAZO TERCER TRIMESTRE' },
                                { CODIGO: '4', DESCRIPCION: 'NO ESTA EMBARAZADA' }
                            ],
                            titulo: "CONDICION USUARIA",
                            indices: [
                                { label: 'DESCRIPCION' }
                            ],
                            callback_f: () => { this._evaluartelefono_SER890('2') }
                        },
                            data => {
                                this.form.embarazo_SER890 = data.CODIGO;
                                this.form.embarazod_SER890 = data.DESCRIPCION;

                                if (this.form.unidaddeservicio_SER890 == '08' && (data.CODIGO == '1' || data.CODIGO == '2' || data.CODIGO == '3')) {
                                    CON851('6U', '6U', null, 'warning', 'Advertencia');
                                }

                                this._evaluarfinalidadobservacion_SER890();
                            }
                        );
            }

            this.form.embarazo_SER890 = '9';
            this.form.embarazod_SER890 = 'NO APLICA';
            this._evaluarfinalidadobservacion_SER890();
        },
        _evaluarfinalidadobservacion_SER890(){
            if (this.form.clasedeservicio_SER890 != '7') {
                this.form.finalidad_SER890 = '10';
                this.form.finalidadd_SER890 = 'NO APLICA'
                return this._evaluardatoobservacion_SER890();
            }

            this.SER890.DATOFINALIDAD = datos_finalidad($_USUA_GLOBAL[0].NIT, this.SER890.PACIENTE.SEXO, this.SER890.EDAD);

            this._evaluarfinalidad_SER890();
        },
        _evaluarfinalidad_SER890() {
            let seleccion = '1';
            this.form.finalidad_SER890.trim() == '' ? null : seleccion = this.form.finalidad_SER890.substring(0,2)
            POPUP(
                    {
                        array: this.SER890.DATOFINALIDAD,
                        titulo: 'DATO FINALIDAD',
                        indices: [
                            { label: 'descripcion' }
                        ],
                        seleccion: seleccion,
                        callback_f: () => { this._evaluartelefono_SER890('2') }
                    },
                    data => {
                        this.form.finalidad_SER890 = data.codigo;
                        this.form.finalidadd_SER890 = data.descripcion.toUpperCase();

                        if (this.form.embarazo_SER890.substring(0,1) == '4' && (data.codigo == '1' || data.codigo == '6')){
                            CON851('03', '03', null, 'error', 'Error');
                            return this._evaluarfinalidad_SER890();
                        }

                        if ((this.SER890.EDAD.vlr_edad == 'M' || this.SER890.EDAD.vlr_edad == 'A') && data.CODIGO == '2') {
                            CON851('03', '03', null, 'error', 'Error');
                            return this._evaluarfinalidad_SER890();
                        }

                        if (data.CODIGO == '6') {
                            if (this.form.embarazo_SER890.substring(0,1) == '4') {
                                CON851('83', '83', null, 'error', 'Error');
                                return this._evaluarfinalidad_SER890();
                            }
                        }

                        if (data.CODIGO == '10') {
                            if ($_USUA_GLOBAL[0].NIT == 845000038 || $_USUA_GLOBAL[0].NIT == 900405505) {
                                CON851('4K', '4K', null, 'error', 'Error');
                            }
                        }

                        this._evaluardatoobservacion_SER890();
                    }
                )
        },
        _evaluardatoobservacion_SER890(){
            validarInputs(
                {
                    form: "#VALIDAR7_SER890",
                    orden: "1"
                },
                () => { 
                    this._evaluartelefono_SER890('2');
                },
                () => {
                    this._evaluarviasdeasignacion_SER890();
                }
            )
        },
        _evaluarviasdeasignacion_SER890(){
            let seleccion = '1'
            this.form.viaasignacion_SER890.trim() == '' ? null : seleccion = this.form.viaasignacion_SER890.substring(0, 1)
            SER861A(
                    data => {
                        this.form.viaasignacion_SER890 = data.CODIGO;
                        this.form.viaasignaciond_SER890 = data.DESCRIPCION;
                        this._evaluarventanarecomendaciones_SER890();
                    },
                    this._evaluardatoobservacion_SER890,
                    seleccion
            )
        },
        _evaluarventanarecomendaciones_SER890(){
            if (this.form.clasedeservicio_SER890 == '1') {
                this.SER890.VENTANARECOMENDACIONES = 'VENTANARECOMENDACIONES'
                _ventanaalterna_SALUD(data = {
                    ID: this.SER890.VENTANARECOMENDACIONES,
                    titulo: 'VENTANA DE RECOMENDACIONES',
                    html: `
                    <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;" id="VALIDARVENTANARECOMENDACIONES_SER890">
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-8 col-sm-8 col-xs-8">Nada via oral despues de las 22:00 horas o 10 pm</label>
                                <div class="input-group col-md-4 col-sm-4 col-xs-4">
                                    <input id="nadaviaoral_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="1">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Debe asistir en Ayunas</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="asistirayunas_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="2">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Dieta Liquida el dia anterior</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="dietaliquida_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="3">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Si la cirugia es en la tarde puede tomar JUGO 5 am</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="cirugiatarde_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="4">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Traer ropa comoda, zapatos planos</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="ropacomoda_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="5">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Avise con 3 dias de anticipacion si presenta algunos de estos sintomas, Fiebre, gripe, diarrea</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="avisartresdias_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="6">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Si toma Aspirina, Asawin , Asa, o cualquier tipo de anticoagulante, suspender 10 dias antes de QX</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="aspirinaasawinasa_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="6">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Debe venir con acompañante mayor de 18 años</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="veniracompañante_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="7">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Asitir sin ,maquillaje, esmalte en uñas , rasurada en area de QX , sin Joyas</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="sinmaquillaje_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="8">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Todo menor de edad debe venir con los padres</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="menordeedad_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="9">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Debe hacer copago</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="hacercopago_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="10">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Traer Maleta con pijama y utiles de aseo</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="maletapijamaaseo_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="11">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Si toma medicamentos de control traer la formula y si trae medicamento entregar medico servicio</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="medicamentoscontrol_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="12">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Traer Frasco de boca ancha con tapa</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="frasco_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="13">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Traer Radiografias ,TAC,Resonacias, Ecografias</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="radiografias_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="14">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Pañales desechables</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="pañales_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="15">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Traer una cobija termica limpia</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="cobijatermica_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="16">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">Reserva GRE</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="reservaGRE_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="17">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                                <label class="col-md-7 col-sm-7 col-xs-7">FORMOL X 500ML</label>
                                <div class="input-group col-md-5 col-sm-5 col-xs-5">
                                    <input id="formolx500_VENTANARECOMENDACION" class="form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="1" data-orden="18">
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                });
                return this._evaluarrecomendaciones_SER890();
            }

            this._evaluarestadocita_SER890();
        },
        _evaluarrecomendaciones_SER890(){
            validarInputs(
                {
                    form: "#VALIDARVENTANARECOMENDACIONES_SER890",
                    orden: "1"
                },
                () => {
                    $(`#${this.SER890.VENTANARECOMENDACIONES}`).remove()
                    this._evaluardatoobservacion_SER890()
                },
                () => {
                    this.SER890.NADAVIAORARECOME = $('#nadaviaoral_VENTANARECOMENDACION').val();
                    this.SER890.ASISAYUNASRECOME = $('#asistirayunas_VENTANARECOMENDACION').val();
                    this.SER890.DIETALIQUIRECOME = $('#dietaliquida_VENTANARECOMENDACION').val();
                    this.SER890.JUGOCINCARECOME = $('#cirugiatarde_VENTANARECOMENDACION').val();
                    this.SER890.ROPAZAPATOARECOME = $('#ropacomoda_VENTANARECOMENDACION').val();
                    this.SER890.GRIPEFEIBRRECOME = $('#avisartresdias_VENTANARECOMENDACION').val();
                    this.SER890.ASPIRINASRECOME = $('#aspirinaasawinasa_VENTANARECOMENDACION').val();
                    this.SER890.ACOMPANANTARECOME = $('#veniracompañante_VENTANARECOMENDACION').val();
                    this.SER890.MAQUILLAJERECOME = $('#sinmaquillaje_VENTANARECOMENDACION').val();
                    this.SER890.MENOREDADDERECOME = $('#menordeedad_VENTANARECOMENDACION').val();
                    this.SER890.COPAGOMORDERECOME = $('#hacercopago_VENTANARECOMENDACION').val();
                    this.SER890.PIJAMAUTILRECOME = $('#maletapijamaaseo_VENTANARECOMENDACION').val();
                    this.SER890.MEDICONTRORECOME = $('#medicamentoscontrol_VENTANARECOMENDACION').val();
                    this.SER890.FRASCOBOCARECOME = $('#frasco_VENTANARECOMENDACION').val();
                    this.SER890.PANALESDESRECOME = $('#pañales_VENTANARECOMENDACION').val();
                    this.SER890.RADIOGRTACRECOME = $('#radiografias_VENTANARECOMENDACION').val();
                    this.SER890.COBIJATERMRECOME = $('#cobijatermica_VENTANARECOMENDACION').val();
                    this.SER890.RESERVAFREMRECOME = $('#reservaGRE_VENTANARECOMENDACION').val();
                    this.SER890.FORMOLX500RECOME = $('#formolx500_VENTANARECOMENDACION').val();
                    $(`#${this.SER890.VENTANARECOMENDACIONES}`).remove()
                    this._evaluarestadocita_SER890();
                }
            )
        },
        _evaluarestadocita_SER890(){
            let seleccion = '1';
            this.SER890.CLAVECANCW = '';
            POPUP({
                array: [
                    {ID:'1', DESCRIPCION:'VIGENTE'},
                    {ID:'2', DESCRIPCION:'ATENDIDA'},
                    {ID:'3', DESCRIPCION:'CANCELADA'},
                ],
                titulo: "ESTADO CITA",
                seleccion: seleccion,
                indices: [
                    { id: 'ID', label: 'DESCRIPCION' }
                ],
                callback_f: this._evaluarventanarecomendaciones_SER890
            },
                data => {
                    if (data.ID == '1') this.form.estadocita_SER890 = ' ';
                    if (data.ID == '2') this.form.estadocita_SER890 = '*';
                    if (data.ID == '3') this.form.estadocita_SER890 = 'C';
                    this.form.estadocitad_SER890 = data.DESCRIPCION;
                    this.SER890.CALVECANCW = '';
                    if (data.ID == '3') {
                        if (data.ID != this.SER890.ESTADOANT){
                            this.SER890.CLAVECANCW = `${localStorage.Usuario}${moment.format('DD')}${moment().format('HHmm')}`;
                        }
                    }
                    this._evaluardatocausa_SER890();
                }
            );
        },
        _evaluardatocausa_SER890() {
            this.form.causancancelacion_SER890 = '';
            if (this.form.estadocita_SER890.trim() == 'C') {
                let seleccion = '1';
                return POPUP(
                    {
                        array: [
                            { CODIGO: '1', DESCRIPCION: 'CANCEL X URGEN' },
                            { CODIGO: '2', DESCRIPCION: 'FALTA SANGRE' },
                            { CODIGO: '3', DESCRIPCION: 'FALTA MAT. MQ' },
                            { CODIGO: '4', DESCRIPCION: 'FALTA APOYO DX' },
                            { CODIGO: '5', DESCRIPCION: 'FALTA MEDICO' },
                            { CODIGO: '6', DESCRIPCION: 'FALTA SALA' },
                            { CODIGO: '7', DESCRIPCION: 'FALTA CUID INS' },
                            { CODIGO: '8', DESCRIPCION: 'FALTA CUID PAC' },
                            { CODIGO: '9', DESCRIPCION: 'CUDARO CLINICO' },
                            { CODIGO: 'A', DESCRIPCION: 'DECISION PACI.' },
                            { CODIGO: 'B', DESCRIPCION: 'OTRO MOTIVO' },
                            { CODIGO: 'C', DESCRIPCION: 'DECISION PROFE' }
                        ],
                        titulo: "MOTIVO CANCELACION",
                        teclaAlterna: true,
                        seleccion: seleccion,
                        indices: [
                            { id:'CODIGO', label: 'DESCRIPCION' }
                        ],
                        callback_f: this._evaluarestadocita_SER890
                    },
                    data => {
                        this.form.causancancelacion_SER890 = data.CODIGO;
                        this.form.causacancelaciond_SER890 = data.DESCRIPCION;

                        if (this.SER890.OPCIONACTIVA == '097C11') {
                            return this._evaluardatodoble_SER890();
                        }
                    }
                );
            }

            this._evaluardatodoble_SER890();
        },
        _evaluardatodoble_SER890(){
            let seleccion = 'N';
            POPUP(
                {
                    array: [
                        { CODIGO: 'S', DESCRIPCION: 'DOBLE' },
                        { CODIGO: 'N', DESCRIPCION: 'SENCILLA' },
                        { CODIGO: 'T', DESCRIPCION: 'TRIPLE' },
                    ],
                    titulo: "ES CITA DOBLE?",
                    teclaAlterna: true,
                    seleccion: seleccion,
                    indices: [  
                        { id:'CODIGO', label: 'DESCRIPCION' }
                    ],
                    callback_f: this._evaluarestadocita_SER890
                },
                data => {
                    this.form.citadoble_SER890 = data.CODIGO;
                    this.form.citadobled_SER890 = data.DESCRIPCION;

                    if (data.CODIGO.trim() == 'N') this.SER890.FACTORW = '0'
                    if (data.CODIGO.trim() == 'S') this.SER890.FACTORW = '2'
                    if (data.CODIGO.trim() == 'T') this.SER890.FACTORW = '3'
                    CON851P('01', this._evaluardatoobservacion_SER890, this._evaluarguardado_SER890);
                }
            );
        },
        _evaluarguardado_SER890() {
            // this.SER890.LLAVEW = `${this.form-fechacita_SER890}${this.form.medico_SER890}${this.form.paciente_SER890}${this.form.clasedeservicio_SER890}${this.form.procedimiento_SER890.padEnd(12,' ')}${this.form.sucursal_SER890}`;
            this.SER890.LLAVEALTW = `${this.form.medico_SER890.padStart(10,'0')}${this.form.fechacita_SER890}${this.form.horacita_SER890}`
            // SAL97C11.LLAVEANTW = SAL97C11.FECHACIT + SAL97C11.MEDW + SAL97C11.PACIW + SAL97C11.TIPOFACTW + SAL97C11.CUPSW.padEnd(12, ' ') + data.SUCURSAL;
            if (this.form.novedad_SER890.substring(0,1) == '8') {
                this.SER890.FECHAELABW = moment().format('YYYYMMDD');
                this.SER890.HORAELABW = moment().format('HH:mm');
            }

            if (this.form.novedad_SER890.substring(0,1) == '7') {
                this.SER890.OPERW = localStorage.Usuario;
                this.SER890.FECHAELABW = moment().format('YYYYMMDD');
                this.SER890.HORAELABW = moment().format('HH:mm');
            }

            let fechaw = moment(this.form.fechacita_SER890).format('YYYYMMDD');
            let ano = fechaw.substring(2, 4);
            this.SER890.LLAVEW = fechaw + this.form.medico_SER890.padStart(10, '0') + this.form.paciente_SER890.padStart(15,'0') + this.form.clasedeservicio_SER890 + this.form.procedimiento_SER890.padEnd(12, ' ') + this.form.sucursal_SER890;
            let cod = 'A';
            if (this.form.novedad_SER890.substring(0,1) == '8') cod = '9';
            datos_envio = datosEnvio() + cod + '|' + this.form.procedimiento_SER890 + '|' + this.form.contrato_SER890 + '|' + this.SER890.PACIENTE['NIT-FACT'] + '|' + this.form.clasedeservicio_SER890 + '|' + $_USUA_GLOBAL[0].SAL_MIN + '|' + this.form.medico_SER890.padStart(10,'0') + '|' + this.SER890.PACIENTE.EPS + '|' + fechaw + '|' + ano + '|'
            datos_envio += this.SER890.LLAVEW + '|' + this.SER890.LLAVEALTW + '|' + this.form.tipoprofesion_SER890 + '|' + this.form.paciented_SER890 + '|' + this.form.observacion_SER890.padEnd(30, ' ') + this.form.viaasignacion_SER890 + '|'; // FALTAN LAS OTRAS DOS OBSERV
            datos_envio += this.form.contrato_SER890.padStart(4, ' ') + '|' + this.form.convenio_SER890.padStart(2, ' ') + '|' + this.SER890.VALORW.padEnd(12, '0') + '|' + this.SER890.CLAVECANCW + '|' + this.form.finalidad_SER890.padStart(2, '0') + '|' + this.form.embarazo_SER890 + '|' + this.form.fechadesea_SER890.replace(/-/g, '') + '|'
            datos_envio += this.form.horacita_SER890.replace(/:/g, '') + '|' + this.SER890.PACIENTE.EPS.padStart(6, ' ') + '|' + this.form.estadocita_SER890.padStart(1, ' ') + '|' + this.form.causancancelacion_SER890.padStart(1, ' ') + '|' + this.form.telefonouno_SER890.padStart(12, ' ') + '|' + this.form.telefonodos_SER890.padStart(12, ' ') + '|' 
            datos_envio += this.form.unidaddeservicio_SER890.padStart(2, ' ') + '|' + this.form.tipoanestesia_SER890.padStart(1, ' ') + '|' + this.form.citadoble_SER890.padStart(1, ' ') + '|' + localStorage.getItem('Usuario') + '|' + this.SER890.FECHAELABW + '|' + this.SER890.FACTORW + '|' + this.form.paciente_SER890.padStart(15,'0') + '|' + this.SER890.LLAVEANTW + '|';
            datos_envio += `${this.SER890.COVDIGESTIVOW2}|${this.SER890.COVCANSANW2}|${this.SER890.COVGUSOLFW2}|${this.SER890.CONTATOCOVIDW2}|${this.SER890.ENFCOVDW2}|${this.SER890.SIGUECUARW2}|${this.SER890.SINTOMASERAW2}|${this.SER890.FIEBREW2}|`
            console.debug(datos_envio);
            postData(
                { datosh: datos_envio },
                get_url("APP/SALUD/SAL97C11.DLL")
            )
            .then(data => {
                console.debug(data);
                if (this.form.novedad_SER890.substring(0,1) == '7') CON851('', 'Se ha agendado la cita correctamente', null, 'success', 'Exito');
                if (this.form.novedad_SER890.substring(0,1) == '8') CON851('', 'Se ha realizado el cambio en la cita correctamente', null, 'success', 'Exito');
                IMPRESION = new Object;
                IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
                IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
                IMPRESION.FECHACITA = this.form.fechacita_SER890
                IMPRESION.HORACITA = this.form.horacita_SER890
                // SAL97C11.IMPRESION.MEDICOCITA = medicoMask_SAL97C11.value
                IMPRESION.CUP = this.form.procedimiento_SER890;
                IMPRESION.DESCRIPCUP = this.form.procedimientod_SER890;
                IMPRESION.ENTIDAD = this.SER890.PACIENTE['NOMBRE-EPS'];
                IMPRESION.APELLIDO1 = this.SER890.PACIENTE['APELL-PACI1'];
                IMPRESION.APELLIDO2 = this.SER890.PACIENTE['APELL-PACI2'];
                IMPRESION.NOMBRE1 = this.SER890.PACIENTE['NOM-PACI1'];
                IMPRESION.NOMBRE2 = this.SER890.PACIENTE['NOM-PACI2'];
                IMPRESION.NOMBREMEDICO = this.form.medicod_SER890;
                IMPRESION.CC = this.form.paciente_SER890;
                IMPRESION.HORACREA = moment().format('YYYYMMDD') +" / "+ moment().format('HH:mm');
                IMPRESION.OPERCREA = localStorage.Usuario;
                IMPRESION.TELESALUD = false;
                if (this.unidaddeservicio_SER890.trim() == '63') IMPRESION.TELESALUD = true
            
                CON851P('00', 
                    _toggleNav
                    , 
                    () => {
                        _impresioncitas(IMPRESION, _toggleNav, 
                            () => {
                                CON851('', 'Ocurrio un error imprimiendo', null, 'error', 'Error');
                                return this._evaluardatoobservacion_SER890();
                            }
                        );
                    }
                );
            })
            .catch(err => {
                console.error(err);
                this._evaluartelefono_SER890();
            })
        },
        // MASCARAS VENTANA DE RECOMENDACIONES
        _mascarasventanarecomendaciones_SER890() {
            var nadaviaoraMask_SAL97C11 = IMask($("#nadaviaoral_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var asisayunasMask_SAL97C11 = IMask($("#asistirayunas_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var dietaliquiMask = IMask($("#dietaliquida_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var jugocincamMask = IMask($("#cirugiatarde_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var ropazapatoMask = IMask($("#ropacomoda_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var gripefeibrMask = IMask($("#avisartresdias_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var aspirinasaMask = IMask($("#aspirinaasawinasa_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var acompanantMask = IMask($("#veniracompañante_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var maquillajeMask = IMask($("#sinmaquillaje_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var menoredadeMask = IMask($("#menordeedad_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var copagomodeMask = IMask($("#hacercopago_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var pijamautilMask = IMask($("#maletapijamaaseo_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var medicontroMask = IMask($("#medicamentoscontrol_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var frascobocaMask = IMask($("#frasco_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var radiogrtacMask = IMask($("#radiografias_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var panalesdesMask = IMask($("#pañales_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var cobijatermMask = IMask($("#cobijatermica_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var reservafremMask = IMask($("#reservaGRE_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
            var formolx500Mask = IMask($("#formolx500_VENTANARECOMENDACION")[0], {
                mask: '*',
                definitions: {
                    '*': /[S,N]/
                },
                prepare: function (str) {
                    console.debug(str);
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toLowerCase()
                }
            });
        }
    }
});
