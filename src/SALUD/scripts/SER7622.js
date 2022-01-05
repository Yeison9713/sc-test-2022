new Vue({
    el: '#SER7622',
    data: {
        form: {
            pacienteOri: '',
            sucursalOri: '',
            folioOri: '',
            pacienteDest: '',
            sucursalDest: '',
            folioDest: '',
            nombrePaciDest: '',
            nombrePaciOri: ''
        },
        SER7622: []
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,7,7,6,2,2- Traslado de historia a otra historia");
        $_this = this;
        obtenerDatosCompletos({
            nombreFd: "SUCURSALES",
        },
            function (data) {
                $_this.SER7622.SUCURSAL = data.SUCURSAL;
                // $_this.SER7622.SUCURSAL.pop();
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
                            this.SER7622.PACIENTEORIGEW = data["REG-PACI"];
                            this.form.nombrePaciOri = this.SER7622.PACIENTEORIGEW[0].DESCRIP
                            this._buscarpaciente_7622();
                        })
                        .catch(error => {
                            console.error(error)
                            this.form.pacienteOri = '000000000000000'
                            this.form.nombrePaciOri = '******************'
                            this._buscarpaciente_7622();
                        });
                }
            )
        },
        _buscarpaciente_7622() {
            postData({ datosh: datosEnvio() + '1|' + this.form.pacienteOri + '|' }, get_url("APP/SALUD/SER7622.DLL"))
                .then((data) => {
                    console.log(data)
                    this._evaluarfolio_7622()

                })
                .catch(error => {
                    console.error(error)
                    this._evaluarPacienteDeOrigen()
                })
        },
        _evaluarfolio_7622() {
            if (this.form.sucursalOri.trim() == '') this.form.sucursalOri = "**"
            validarInputs(
                {
                    form: '#validarsucursalOrigen',
                    orden: "1"
                }, this._evaluarPacienteDeOrigen,
                () => {
                    if (this.form.sucursalOri.trim() == '') {
                        this._evaluarfolio_7622()
                    } else {
                        if (this.form.sucursalOri == '**') {
                            this.form.folioOri = "999999"
                            this._evaluarpacientedest_7622()
                        } else {
                            this.form.sucursalOri = this.form.sucursalOri.padStart(2, "0")
                            this._evaluarfolionro_SER7622()
                        }
                    }
                }
            )
        },
        _evaluarfolionro_SER7622() {
            if (this.form.folioOri.trim() == '') this.form.folioOri = '999999'
            validarInputs(
                {
                    form: '#validarFolioOrigen',
                    orden: "1"
                }, this._evaluarfolio_7622,
                () => {
                    if (this.form.folioOri == '999999') {
                        this._evaluarpacientedest_7622()
                    } else {
                        this.form.folioOri = this.form.folioOri.padStart(8, '0')
                        postData({ datosh: datosEnvio() + '2|' + this.form.pacienteOri + this.form.sucursalOri + this.form.folioOri + '|' }, get_url("APP/SALUD/SER7622.DLL"))
                            .then((data) => {
                                console.log(data)
                                this._evaluarpacientedest_7622()

                            })
                            .catch(error => {
                                console.error(error)
                                this._evaluarfolionro_SER7622()
                            })
                    }
                }
            )
        },
        _evaluarpacientedest_7622() {
            validarInputs(
                {
                    form: '#validarPacienteDestino',
                    orden: "1"
                }, this._evaluarPacienteDeOrigen,
                () => {
                    this.form.pacientedesti = this.form.pacientedesti.toString().padStart(15, "0")

                    if (this.form.pacientedesti.trim() == '') {
                        this._evaluarpacientedest_7622()
                    } else {
                       if(this.form.pacienteOri == this.form.pacientedesti){
                        CON851("05", "05", this._evaluarpacientedest_7622, "error", "error");
                       }else{
                        let URL = get_url("APP/SALUD/SER810-1.DLL");
                        postData({
                            datosh: datosEnvio() + this.form.pacientedesti + "|",
                        }, URL)
                            .then(data => {
                                this.SER7622.PACIENTEDESTINOW = data["REG-PACI"];
                                this.form.nombrePaciDest = this.SER7622.PACIENTEDESTINOW[0].DESCRIP
                                CON851P("04", this._evaluarpacientedest_7622, this._evaluargrabado_7622);
                            })
                            .catch(error => {
                                console.error(error)
                                this._evaluarpacientedest_7622()
                            });
                       }
                    }
                }
            )
        },
        _evaluargrabado_7622(){
            $_this = this
            var ventanahc_SER7622 = bootbox.dialog({
                size: "medium",
                title: "Unifica la Historia Clinica",
                message:
                    '<div class="row"> ' +
                    '<div class="col-md-12"> ' +
        
                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-10 col-xs-12 control-label" for="name">' +
                    "Folio Origen: " +
                    "</label> " +
                    '<div class="input-group col-md-6 col-sm-2 col-xs-12"> ' +
                    '<input id="folio_SER7622" class="form-control col-md-12 col-sm-12 col-xs-12"> ' +
                    "</div> " +
                    "</div>" +
        
                    '<div class="salto-linea"></div>' +
        
                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-10 col-xs-12 control-label" for="name">' +
                    "Desea mover este folio? " +
                    "</label> " +
                    '<div class="input-group col-md-6 col-sm-2 col-xs-12" id="VALIDAR2_SER7622"> ' +
                    '<input id="moverfolio_SER7622" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" placeholder="S/N" > ' +
                    "</div> " +
                    "</div>" +
        
                    '<div class="salto-linea"></div>' +
        
                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-10 col-xs-12 control-label" for="name">' +
                    "Sucursal Destino: " +
                    "</label> " +
                    '<div class="input-group col-md-6 col-sm-2 col-xs-12" id="VALIDAR3_SER7622"> ' +
                    '<input id="sucusal_SER7622" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2" > ' +
                    "</div> " +
                    "</div>" +
        
                    '<div class="salto-linea"></div>' +
        
                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-10 col-xs-12 control-label" for="name">' +
                    "Nro folio destino:  " +
                    "</label> " +
                    '<div class="input-group col-md-6 col-sm-2 col-xs-12" id="VALIDAR4_SER7622"> ' +
                    '<input id="nrofolio_SER7622" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="6" > ' +
                    "</div> " +
                    "</div>" +
        
                    "</div> " +
                    "</div>",
                buttons: {
                    confirm: {
                        label: "Aceptar",
                        className: "btn-primary",
                        callback: function () {
                            ventanahc_SER7622.off("show.bs.modal");
                            setTimeout($_this.salir_SER7622, 300);
        
                        },
                    },
                    cancelar: {
                        label: "Cancelar",
                        className: "btn-danger",
                        callback: function () {
                            ventanahc_SER7622.off("show.bs.modal");
                            setTimeout($_this._evaluarpacientedest_7622, 500);
                        },
                    },
                },
            });
            ventanahc_SER7622.init($(".modal-footer").hide());
            ventanahc_SER7622.init(this._evaluarmoverfolio_SER7622);
            ventanahc_SER7622.on("shown.bs.modal", function () {
                $("#moverfolio_SER7622").focus();
            });
        }, 
        _evaluarmoverfolio_SER7622() {
            _inputControl("disabled");
            let URL = get_url("APP/SALUD/SER7621H.DLL");
            postData({
                datosh: datosEnvio() + this.form.pacienteOri + "||" + localStorage.Usuario + "||||**000000|1|",
            }, URL)
                .then(data => {
                    console.log(data);
                    $('#folio_SER7622').val(data);
                })
                .catch(error => {
                    console.error(error);
                });
            validarInputs({
                form: "#VALIDAR2_SER7621",
                orden: "1",
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER7622.MOVERFOLIO = $('#moverfolio_SER7622').val();
                    if (this.SER7622.MOVERFOLIO == 'S' || this.SER7622.MOVERFOLIO == 'N') {
                        if (this.SER7622.MOVERFOLIO == 'N') {
                            $('.btn-primary').click();
                        } else {
                            this._evaluarsucursal_SER7621()
                        }
                    } else {
                        CON851('03', '03', null, 'error', 'error');
                        this._evaluarmoverfolio_SER7622()
                    }
                }
            )
        }, 
        _evaluarsucursal_SER7621() {
            $('#sucusal_SER7621').val('01');
            validarInputs({
                form: "#VALIDAR3_SER7621",
                orden: "1"
            },
                () => { this._evaluarmoverfolio_SER7621() },
                () => {
                    this.SER7622.SUCURSALHC = $('#sucusal_SER7621').val();
                    this._evaluarfoliohc_SER7621();
                }
            )
        },
        _evaluarfoliohc_SER7621() {
            validarInputs({
                form: "#VALIDAR4_SER7621",
                orden: "1"
            },
                () => { _evaluarsucursal_SER7621() },
                () => {
                    if (isNaN(this.SER7622.FOLIOHC)) {
                        CON851('03', '03', this._evaluarfoliohc_SER7621(), 'error', 'Error');
                    } else {
                        this.SER7622.FOLIOHC = $('#nrofolio_SER7621').val();
                        this.SER7622.FOLIOHC = this.SER7622.FOLIOHC.padStart(6, '0');
                        $('#nrofolio_SER7621').val(this.SER7622.FOLIOHC);
                        this._consultahistoria_SER7621();
                    }
                }
            )
        },
        _consultahistoria_SER7621() {
            let URL = get_url("APP/SALUD/SER7621H.DLL");
            postData({
                datosh: datosEnvio() + this.form.pacienteOri + "|" + this.form.pacientedesti + "|" + localStorage.Usuario + "|" + SER7622.MOVERFOLIO + "|" + SER7622.SUCURSALHC + "|" + SER7622.FOLIOHC + '|**000000||',
            }, URL)
                .then(data => {
                    console.log(data);
                    CON851('39', '39', null, 'success', 'Exito');
                    $('#moverfolio_SER7621').val('');
                    $('.btn-primary').click();
                })
                .catch(error => {
                    console.error(error);
                    this._evaluarmoverfolio_SER7621();
                });
        },
        _f8Pacienteorig() {
            $_this = this
            parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
                callback: (data) => {
                    $_this.SER7622.CODORIGW = data.COD
                    $_this.SER7622.CODORIGW = SER7622.CODORIGW.padStart(15, '0')
                    $_this.form.pacienteOri = $_this.SER7622.CODORIGW
                    _enterInput('.pacienteOrigen_SER7622');
                },
                cancel: () => {
                    _enterInput('.pacienteOrigen_SER7622');

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
                    $_this.SER7622.CODDESTW = data.COD
                    $_this.SER7622.CODDESTW = SER7622.CODDESTW.padStart(15, '0')
                    $_this.form.pacientedesti = $_this.SER7622.CODDESTW
                    _enterInput('.pacientedestino_SER7622');
                },
                cancel: () => {
                    _enterInput('.pacientedestino_SER762');

                }
            };
            F8LITE(parametros);
        },
        salir_SER7622() {
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()
        }
    }
})