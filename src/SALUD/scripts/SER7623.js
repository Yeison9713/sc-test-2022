new Vue({
    el: '#SER7623',
    data: {
        form: {
            pacienteOri: '',
            sucursalOri: '',
            folioOri: '',
            pacienteDest: '',
            sucursalDest: '',
            folioDest: '',
            nombrePaciDest: '',
            nombrePaciOri: '',
            tipoevo: '',
            tipoevoDescrip: '',
            anoini: '',
            mesini: '',
            diaini: '',
            horaini: '',
            minutini: '',
            anofin: '',
            mesfin: '',
            diafin: '',
            horafin: '',
            minutfin: ''
        },
        SER7623: []
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,7,7,6,2,3 - Traslado de folio de evolucion hc");
        $_this = this;
        obtenerDatosCompletos({
            nombreFd: "SUCURSALES",
        },
            function (data) {
                $_this.SER7623.SUCURSAL = data.SUCURSAL;
                // $_this.SER7623.SUCURSAL.pop();
                loader("hide");
                $_this._evaluarPacienteDeOrigen()
            },
        );
    },
    methods: {
        _evaluarPacienteDeOrigen() {
            validarInputs(
                {
                    form: '#validarPacienteOrigen',
                    orden: "1"
                }, _toggleNav,
                () => {
                    this.form.pacienteOri = this.form.pacienteOri.toString().padStart(15, "0")
                    let URL = get_url("APP/SALUD/SER810-1.DLL");
                    postData({
                        datosh: datosEnvio() + this.form.pacienteOri + "|",
                    }, URL)
                        .then(data => {
                            this.SER7623.PACIENTEORIGEW = data["REG-PACI"];
                            this.form.nombrePaciOri = this.SER7623.PACIENTEORIGEW[0].DESCRIP
                            this._evaluarfolio_7623()
                        })
                        .catch(error => {
                            console.error(error)
                            this.form.pacienteOri = '000000000000000'
                            this.form.nombrePaciOri = '******************'
                            this._evaluarfolio_7623()
                        });
                }
            )
        },
        _evaluarfolio_7623() {
            validarInputs(
                {
                    form: '#validarsucursalOrigen',
                    orden: "1"
                }, this._evaluarPacienteDeOrigen,
                () => {
                    if (this.form.sucursalOri.trim() == '' || this.form.sucursalOri.trim() == '**') {
                        this._evaluarfolio_7623()
                    } else {
                        this.form.sucursalOri = this.form.sucursalOri.padStart(2, "0")
                        this._evaluarfolionro_SER7623()
                    }
                }
            )
        },
        _evaluarfolionro_SER7623() {
            validarInputs(
                {
                    form: '#validarFolioOrigen',
                    orden: "1"
                }, this._evaluarfolio_7623,
                () => {
                    this.form.folioOri = this.form.folioOri.padStart(6, '0')
                    postData({ datosh: datosEnvio() + '1|' + this.form.pacienteOri + this.form.sucursalOri + this.form.folioOri + '|' }, get_url("APP/SALUD/SER7623.DLL"))
                        .then((data) => {
                            console.log(data)
                            this._evaluartipoevol_SER7623()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluarfolionro_SER7623()
                        })
                    // if (this.form.folioOri == '999999') {
                    //     this._evaluarpacientedest_7623()
                    // } else {
                    //     this.form.folioOri = this.form.folioOri.padStart(8, '0')
                    //     postData({ datosh: datosEnvio() + '1|' + this.form.pacienteOri + this.form.sucursalOri + this.form.folioOri + '|' }, get_url("APP/SALUD/SER7623.DLL"))
                    //         .then((data) => {
                    //             console.log(data)
                    //             this._evaluartipoevol_SER7623()

                    //         })
                    //         .catch(error => {
                    //             console.error(error)
                    //             this._evaluarfolionro_SER7623()
                    //         })
                    // }
                }
            )
        },
        _evaluartipoevol_SER7623() {
            var tipoevo = [
                { COD: "1", DESCRIP: "EVOLUCION MEDICA" },
                { COD: "2", DESCRIP: "NOTAS ENFERMERIA" },
                { COD: "3", DESCRIP: "TERAPIAS" },
                { COD: "4", DESCRIP: "ADMISION CIRUGIA" },
                { COD: "5", DESCRIP: "APLICACION MEDIC" },
                { COD: "6", DESCRIP: "NOTA INSTRUMENTAL" },
                { COD: "7", DESCRIP: "CONS. PRE-ANESTESIA" },
                { COD: "8", DESCRIP: "APLICA. ANESTECIA" },
                { COD: "*", DESCRIP: "TODOS LOS TIPOS" },
            ];
            POPUP({
                array: tipoevo,
                titulo: "TIPO DE EVOLUCION",
                indices: [{ id: "COD", label: "DESCRIP" }],
                seleccion: '1',
                callback_f: () => {
                    setTimeout(() => { this._evaluarfolionro_SER7623(); }, 300);
                },
            },
                async (data) => {
                    this.form.tipoevo = data.COD;
                    this.form.tipoevoDescrip = data.DESCRIP;
                    setTimeout(() => { this._evaluarpacientedest_7623(); }, 300);
                }
            );
        },

        _evaluarpacientedest_7623() {
            if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC') {
                validarInputs(
                    {
                        form: '#validarPacienteDestino',
                        orden: "1"
                    }, this._evaluarPacienteDeOrigen,
                    () => {
                        this.form.pacientedesti = this.form.pacientedesti.toString().padStart(15, "0")

                        if (this.form.pacientedesti.trim() == '') {
                            this._evaluarpacientedest_7623()
                        } else {
                            this._leerpacientedest_7623()
                        }
                    }
                )
            } else {
                this.form.pacientedesti = this.form.pacienteOri
                this._leerpacientedest_7623()
            }
        },

        _leerpacientedest_7623() {
            let URL = get_url("APP/SALUD/SER810-1.DLL");
            postData({
                datosh: datosEnvio() + this.form.pacientedesti + "|",
            }, URL)
                .then(data => {
                    this.SER7623.PACIENTEDESTINOW = data["REG-PACI"];
                    this.form.nombrePaciDest = this.SER7623.PACIENTEDESTINOW[0].DESCRIP
                    this._evaluarsucudest_SER7623()
                })
                .catch(error => {
                    console.error(error)
                    this._evaluarpacientedest_7623()
                });
        },

        _evaluarsucudest_SER7623() {
            validarInputs(
                {
                    form: '#validarsucDestino',
                    orden: "1"
                }, this._evaluarpacientedest_7623,
                () => {
                    if (this.form.sucursalDest.trim() == '' || this.form.sucursalDest == "**") {
                        this._evaluarsucudest_SER7623()
                    } else {
                        this.form.sucursalDest = this.form.sucursalDest.padStart(2, "0")
                        this._leerfoliodest_7623()
                    }
                }
            )
        },

        _leerfoliodest_7623() {
            validarInputs(
                {
                    form: '#validarFolioDestino',
                    orden: "1"
                }, this._evaluarpacientedest_7623,
                () => {
                    this.form.folioDest = this.form.folioDest.padStart(6, '0')
                    if (this.form.folioDest.trim() == '') {
                        this._evaluarsucudest_SER7623()
                    } else {
                        if (this.form.folioDest == this.form.folioOri && this.form.pacientedesti == this.form.pacienteOri) {
                            CON851('05', '05', this._leerfoliodest_7623(), 'error', 'Error');
                            this._evaluarsucudest_SER7623()
                        } else {
                            this._buscarpacientes_7623()
                        }
                    }
                }
            )
        },

        _buscarpacientes_7623() {
            let URL = get_url("APP/SALUD/SER7623.DLL");
            postData({
                datosh: datosEnvio() + "2||" + this.form.pacientedesti + this.form.sucursalDest + this.form.folioDest + "|",
            }, URL)
                .then(data => {
                    this.SER7623.DATODESTINO = data.PACIDESTINO
                    this.cargarHc_HC8031()
                })
                .catch(error => {
                    console.error(error)
                    this._leerfoliodest_7623()
                });
        },

        cargarHc_HC8031() {
            postData({ datosh: datosEnvio() + this.form.pacientedesti + this.form.sucursalDest + this.form.folioDest + "|" + localStorage.Usuario.trim() + "|1|" }, get_url("APP/HICLIN/GET_HC.DLL"))
                .then(async (data) => {
                    this._Hc_prc = data;
                    this._evaluarfechaini_7623("1");
                })
                .catch((err) => {
                    console.error(error)
                    this._leerfoliodest_7623()
                });
        },

        _evaluarfechaini_7623(orden) {
            if (this.form.mesini.trim() == '') {
                this.form.anoini = this._Hc_prc.fecha.substring(0, 4);
                this.form.mesini = this._Hc_prc.fecha.substring(4, 6);
                this.form.diaini = this._Hc_prc.fecha.substring(6, 8);

                if (parseInt(this._Hc_prc.cierre.egreso) > 0) {
                    this.form.anofin = this._Hc_prc.fecha.substring(0, 4);
                    this.form.mesfin = this._Hc_prc.fecha.substring(4, 6);
                    this.form.diafin = this._Hc_prc.fecha.substring(6, 8);
                } else {
                    this.form.anofin = this.form.anoini;
                    this.form.mesfin = this.form.mesini;
                    this.form.diafin = this.form.diaini;
                }
            }
            validarInputs(
                {
                    form: "#validarfechaini",
                    orden: orden,
                },
                this._leerfoliodest_7623,
                () => {
                    if (this.form.anoini.trim() == "") {
                        CON851("", "Año incorrecto! ", this._evaluarfechaini_7623("1"), "error", "error");
                    } else {
                        this.form.mesini = this.form.mesini.padStart(2, "0");
                        if (this.form.mesini.trim() == "" || this.form.mesini < 1 || this.form.mesini > 12) {
                            CON851("", "Mes incorrecto! ", this._evaluarfechaini_7623("2"), "error", "error");
                        } else {
                            this.form.diaini = this.form.diaini.padStart(2, "0");
                            if (this.form.diaini.trim() == "" || this.form.diaini < 1 || this.form.diaini > 31) {
                                CON851("", "Dia incorrecto! ", this._evaluarfechaini_7623("3"), "error", "error");
                            } else {
                                this.SER7623.FECHAINIW = this.form.anoini + this.form.mesini + this.form.diaini
                                if (this.form.horaini > 23) {
                                    CON851("", "hora incorrecto! ", this._evaluarfechaini_7623("4"), "error", "error");
                                } else {
                                    if (this.form.minutini > 59) {
                                        CON851("", "minuto incorrecto! ", this._evaluarfechaini_7623("4"), "error", "error");
                                    } else {
                                        this.SER7623.HORAINIW = this.form.horaini + this.form.minutini
                                        this._evaluarfechafin_7623("1");
                                    }
                                }
                            }
                        }
                    }
                },
            );
        },
        _evaluarfechafin_7623(orden) {
            validarInputs(
                {
                    form: "#validarfechafin",
                    orden: orden,
                },
                this._leerfoliodest_7623,
                () => {
                    if (this.form.anofin.trim() == "") {
                        CON851("", "Año incorrecto! ", this._evaluarfechafin_7623("1"), "error", "error");
                    } else {
                        this.form.mesfin = this.form.mesfin.padStart(2, "0");
                        if (this.form.mesfin.trim() == "" || this.form.mesfin < 1 || this.form.mesfin > 12) {
                            CON851("", "Mes incorrecto! ", this._evaluarfechafin_7623("2"), "error", "error");
                        } else {
                            this.form.diafin = this.form.diafin.padStart(2, "0");
                            if (this.form.diafin.trim() == "" || this.form.diafin < 1 || this.form.diafin > 31) {
                                CON851("", "Dia incorrecto! ", this._evaluarfechafin_7623("3"), "error", "error");
                            } else {
                                this.SER7623.FECHAFINW = this.form.anofin + this.form.mesfin + this.form.diafin
                                if (this.SER7623.FECHAFINW < this.SER7623.FECHAINIW) {
                                    CON851("37", "37", this._evaluarfechafin_7623("3"), "error", "error");
                                } else {
                                    if (this.form.horafin > 23) {
                                        CON851("", "hora incorrecto! ", this._evaluarfechafin_7623("4"), "error", "error");
                                    } else {
                                        if (this.form.minutfin > 59) {
                                            CON851("", "minuto incorrecto! ", this._evaluarfechafin_7623("4"), "error", "error");
                                        } else {
                                            this.SER7623.HORAFINW = this.form.horafin + this.form.minutfin
                                            if (this.SER7623.FECHAFINW == this.SER7623.FECHAINIW && this.SER7623.HORAFINW < this.SER7623.HORAINIW) {
                                                CON851("37", "37", this._evaluarfechafin_7623("3"), "error", "error");
                                            } else {
                                                this._evaluargrabado_SER7623()
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            );
        },
        _evaluargrabado_SER7623() {
            CON851P(
                "04",
                () => {
                    this._leerfoliodest_7623();
                },
                () => {
                    let URL = get_url("APP/SALUD/SER7623.DLL");
                    postData({
                        datosh: datosEnvio() + '3|' + this.form.pacienteOri + this.form.sucursalOri + this.form.folioOri + '|' + this.form.pacientedesti + this.form.sucursalDest + this.form.folioDest + '|' + this.form.tipoevo + '|' + this.SER7623.FECHAINIW + '|' + this.SER7623.HORAINIW + '|' + this.SER7623.FECHAFINW + '|' + this.SER7623.HORAFINW + '|',
                    }, URL)
                        .then(data => {
                            console.log(data)
                            CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                        })
                        .catch(error => {
                            console.error(error)
                            this._leerfoliodest_7623();
                        });
                }
            );

        },

        _f8Pacienteorig() {
            $_this = this
            parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
                callback: (data) => {
                    $_this.SER7623.CODORIGW = data.COD
                    $_this.SER7623.CODORIGW = $_this.SER7623.CODORIGW.padStart(15, '0')
                    $_this.form.pacienteOri = $_this.SER7623.CODORIGW
                    _enterInput('.pacienteOrigen_SER7623');
                },
                cancel: () => {
                    _enterInput('.pacienteOrigen_SER7623');

                }
            };
            F8LITE(parametros);
        },
        _f8Pacientedestino() {
            $_this = this
            parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
                callback: (data) => {
                    $_this.SER7623.CODDESTW = data.COD
                    $_this.SER7623.CODDESTW = $_this.SER7623.CODDESTW.padStart(15, '0')
                    $_this.form.pacientedesti = $_this.SER7623.CODDESTW
                    _enterInput('.pacientedestino_SER7623');
                },
                cancel: () => {
                    _enterInput('.pacientedestino_SER762');

                }
            };
            F8LITE(parametros);
        },
        salir_SER7623() {
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()
        }
    }
})