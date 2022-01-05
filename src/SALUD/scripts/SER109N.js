// // 01-09-2020 DIANA E: creado 
moment.locale('es')
var fecha_SER109N = IMask.createPipe({
    mask: Date,
    pattern: "Y/m/d",
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "0000", to: "9000", maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "00", to: "12", maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "31", maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY/MM/DD");
    },
    parse: function (str) {
        var fecha = moment(str).format("YYYY/MM/DD");
        if (fecha == 'Invalid date') return '0000/00/00'
        return str;
    },
});

new Vue({
    el: "#SER109N",
    data: {
        SER109N: [],
        form: {
            numeroprefijo_SER109N: "",
            entidad_SER109N: "",
            nombrepaciente_SER109N: "",
            estadofactura_SER109N: "",
            fechafactura_SER109N: "",
            operbloq_SER109N: "",
            anexos_SER109N: "",
            fechafacturaano_SER109N: "",
            fechafacturames_SER109N: "",
            fechafacturadia_SER109N: "",
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        this.SER109N.PREFIJOW = 'A';
        this.SER109N.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        this.SER109N.PUCUSU = $_USUA_GLOBAL[0].PUC;
        this.SER109N.NITUSU = $_USUA_GLOBAL[0].NIT;
        this.SER109N.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;
        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER109N.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER109N.FIRMAS = data;
                $_this._evaluarinicio_SER109N();
            })
        })
    },
    methods: {
        _evaluarinicio_SER109N() {
            let OPCIONES = new Object;
            OPCIONES = {
                '09743D': this._mostrarcajasopc_SER109N,
                '09743E': this._mostrarcajasopc_SER109N,
            }
            console.log(OPCIONES)
            let active = $('#navegacion').find('li.opcion-menu.active');
            SER109N.OPCIONACTIVA = active[0].attributes[2].nodeValue;
            let Nombreopcion = {
                '09743D': '9,7,4,3,D - Imprimir fact. de capitacion',
                '09743E': '9,7,4,3,E - Imprimir fact. resumen por cups',
            }
            nombreOpcion(Nombreopcion[SER109N.OPCIONACTIVA]);
            let opcion = new Function();
            opcion = OPCIONES[active[0].attributes[2].nodeValue];
            console.log(opcion)
            opcion();
        },
        _mostrarcajasopc_SER109N() {
            console.log(SER109N.OPCIONACTIVA)
            if (SER109N.OPCIONACTIVA == '09743E') {
                $("#VALIDAR4_SER109N").removeClass("hidden");
                this._evaluarprefijo_SER109N()
            } else {
                this._evaluarprefijo_SER109N()
            }
        },
        _evaluarprefijo_SER109N() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER109N',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER109N.PREFIJOW = prefijoMask_SER109N.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER109N.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER109N = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER109N();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER109N() {
            validarInputs({
                form: '#VALIDAR2_SER109N',
                orden: '1'
            },
                this._evaluarprefijo_SER109N,
                () => {
                    this.SER109N.LLAVEW = this.SER109N.PREFIJOW + this.form.numeroprefijo_SER109N.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER109N.LLAVEW }, this._validarfactura_SER109N, this._evaluarnumeroprefijo_SER109N)
                }
            )
        },
        _validarfactura_SER109N(data) {
            this.SER109N.NUMERACION = data;
            if (this.SER109N.NUMERACION.TIPOPACI_NUM == "X") this.SER109N.NUMERACION.TIPOPACI_NUM == '*';
            this.SER109N.FECHAPRENUM = this.SER109N.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER109N = this.SER109N.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER109N = this.SER109N.NUMERACION.NOMBREPAC_NUM.trim();
            let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
            this.form.estadofactura_SER109N = this.SER109N.NUMERACION.ESTADO_NUM + ' - ' + estado[this.SER109N.NUMERACION.ESTADO_NUM];
            if (this.SER109N.NUMERACION.ESTADO_NUM == '0' || this.SER109N.NUMERACION.ESTADO_NUM == '1') {
                $('#FECHARET_SER109N').removeClass('hidden');
                this.form.fechafactura_SER109N = fecha_SER109N(this.SER109N.NUMERACION.FECHARET_NUM)
            } else {
                $('#OPERBLOQ_SER109N').removeClass('hidden');
                this.form.operbloq_SER109N = this.SER109N.NUMERACION.OPERBLOQ_NUM
            }
            this.form.observacion_SER109N = this.SER109N.NUMERACION.OBSERV_NUM.trim()
            this.form.anexos_SER109N = this.SER109N.NUMERACION.ANEXOS_NUM.trim()
            if (this.SER109N.NUMERACION.FECHARET_NUM.substring(0, 4) > 0 && this.SER109N.NUMERACION.FECHARET_NUM.substring(0, 4) != this.SER109N.FECHALNK.substring(0, 4)) {
                CON851('2R', '2R', this._evaluarprefijo_SER109N(), 'error', 'Error');
            }
            if (parseInt(this.SER109N.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(this.SER109N.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER109N = this.SER109N.NUMERACION.FECHARET_NUM.substring(0, 4)
                    this.form.fechafacturames_SER109N = this.SER109N.NUMERACION.FECHARET_NUM.substring(4, 6)
                    this.form.fechafacturadia_SER109N = this.SER109N.NUMERACION.FECHARET_NUM.substring(6, 8)
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    this.form.fechafacturaano_SER109N = fechaactual.substring(0, 4)
                    this.form.fechafacturames_SER109N = fechaactual.substring(4, 6)
                    this.form.fechafacturadia_SER109N = fechaactual.substring(6, 8)
                }
            } else {
                this.form.fechafacturaano_SER109N = this.SER109N.NUMERACION.FECHAPRE_NUM.substring(0, 4)
                this.form.fechafacturames_SER109N = this.SER109N.NUMERACION.FECHAPRE_NUM.substring(4, 6)
                this.form.fechafacturadia_SER109N = this.SER109N.NUMERACION.FECHAPRE_NUM.substring(6, 8)
            }

            if (SER109N.OPCIONACTIVA == '09743E') {
                this._evaluarobservaciones_SER109N('1')
            } else {
                this._afectarnumeracion_SER109W()
            }
        },
        _afectarnumeracion_SER109W() {
            console.log('afctar numeracion')
            if (this.SER109N.LLAVEW != this.SER109N.NUMERACION.FACTCAPIT_NUM) {
                CON851("5C", "5C", this._evaluarnumeroprefijo_SER109N(), "error", "error");
            } else if (this.SER109N.NUMERACION.ESTADO_NUM == '0' || this.SER109N.NUMERACION.ESTADO_NUM == '3') {
                this._evaluarobservaciones_SER109N('1')
            } else {
                this._evaluarfechaimpresion_SER109N('1')
            }
        },
        _evaluarobservaciones_SER109N(orden) {
            console.log('EVALUAR OBSERVACIONE')
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR3_SER109N',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER109N('2') },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER109N = this.form.observacion_SER109N.toUpperCase();
                    this.form.anexos_SER109N = this.form.anexos_SER109N.toUpperCase();
                    if (this.form.estadofactura_SER109N.substring(0, 1) == '3' || this.form.estadofactura_SER109N.substring(0, 1) == '0') {
                        console.log(SER109N.OPCIONACTIVA)
                        if (SER109N.OPCIONACTIVA == '09743E') {
                            console.log('BLOQ FACT')
                            this._evaluarbloqueofactura_SER109N()
                        } else {
                            console.log('GRABAR NUMER')
                            this._grabarnumeracion_SER109N()
                        }
                    } else {
                        console.log('FECHA FACTURA')
                        this._evaluarfechaimpresion_SER109N('1');
                    }
                }
            )
        },
        _evaluarbloqueofactura_SER109N() {
            _FloatText({ estado: 'off' })
            if (this.form.estadofactura_SER109N.substring(0, 1) == '3') {
                this._grabarnumeracion_SER109N()
            } else {
                validarInputs({
                    form: '#VALIDAR4_SER109N',
                    orden: '1'
                },
                    () => { this._evaluarobservaciones_SER109N('2') },
                    () => {
                        if (bloqueoMask_SER109N.value.trim() == '') bloqueoMask_SER109N.typedValue = 'N'
                        if (bloqueoMask_SER109N.value == 'S') this.form.estadofactura_SER109N = '3', this.form.operbloq_SER109N = localStorage.getItem('Usuario').trim();
                        this._grabarnumeracion_SER109N()
                    }
                )
            }
        },
        _grabarnumeracion_SER109N() {
            if (this.form.observacion_SER109N.trim() != this.SER109N.NUMERACION.OBSERV_NUM.trim() || this.form.anexos_SER109N.trim() != this.SER109N.NUMERACION.ANEXOS_NUM.trim() || this.form.estadofactura_SER109N.substring(0, 1) != this.SER109N.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109N.LLAVEW + '|' + this.form.observacion_SER109N + '|' + this.form.anexos_SER109N + '|' + this.form.estadofactura_SER109N.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarfechaimpresion_SER109N('1')
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarbloqueofactura_SER109N();
                        }
                    })
            } else {
                this._evaluarfechaimpresion_SER109N('1')
            }
        },
        _evaluarfechaimpresion_SER109N(orden) {
            console.log('IMPRESION FECHA', orden)
            validarInputs({
                form: '#VALIDAR6_SER109N',
                orden: orden,
            },
                this._evaluarbloqueofactura_SER109N,
                () => {
                    this.SER109N.FECHA = this.form.fechafacturaano_SER109N + this.form.fechafacturames_SER109N.padStart(2, '0') + this.form.fechafacturadia_SER109N.padStart(2, '0')
                    this.SER109N.ANONUM = this.SER109N.FECHA.substring(4, 6)
                    this._evaluarfiltrosimpresion_SER109N()
                }
            )
        },
        _evaluarfiltrosimpresion_SER109N() {
            ///////////////FALTA HACER DLL DE CONSULTA IMRESION////////
            if (SER109N.OPCIONACTIVA == '09743E') {
                let URL = get_url("APP/SALUD/SER109N.DLL");
                postData({
                    datosh: datosEnvio() + this.SER109N.LLAVEW + '|'
                }, URL)
                    .then((data) => {
                        SER109N.FACTURAS = data.FACTURAS;
                        SER109N.FACTURAS.pop()
                        this._evaluarfacturaoriginal_SER109N()
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '08') {
                            $('#VACIA_SER109N').removeClass('hidden');
                            facturavaciaMask_SER109N.typedValue = 'N';
                            this._evaluarimprimirvacia_SER109N();
                        } else {
                            console.error(error);
                            CON851('', 'Hubo un error con el cierre', this._evaluarnumeroprefijo_SER109N(), 'error', 'Error');
                        }
                    })
            } else {
                let URL = get_url("APP/SALUD/SER109W.DLL");
                postData({
                    datosh: datosEnvio() + this.SER109N.LLAVEW + '|'
                }, URL)
                    .then((data) => {
                        SER109N.FACTURAS2 = data.FACTURA;
                        SER109N.FACTURAS2.pop();
                        this._evaluarfacturaoriginal_SER109N()  
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '08') {
                            $('#VACIA_SER109N').removeClass('hidden');
                            facturavaciaMask_SER109N.typedValue = 'N';
                            this._evaluarimprimirvacia_SER109N();
                        } else {
                            console.error(error);
                            CON851('', 'Hubo un error con el cierre', this._evaluarnumeroprefijo_SER109N(), 'error', 'Error');
                        }
                    })
            }


        },
        _evaluarimprimirvacia_SER109N() {
            validarInputs({
                form: '#VALIDAR5_SER109N',
                orden: '1'
            },
                () => { this._evaluarlistarmedico_SER109N() },
                () => {
                    if (facturavaciaMask_SER109N.value.trim() == '') facturavaciaMask_SER109N.typedValue = 'N'
                    if (facturavaciaMask_SER109N == 'S') {
                        this._datosimpresion_SER109N()
                    } else {
                        _toggleNav()
                    }

                }
            )
        },
        _evaluarfacturaoriginal_SER109N() {
            validarInputs({
                form: '#VALIDAR11_SER109N',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109N('1') },
                () => {
                    if (facturaoriginalMask_SER109N.value.trim() == '') facturaoriginalMask_SER109N.typedValue = 'N';
                    this.SER109N.SWORIGINALN = facturaoriginalMask_SER109N.value;
                    if (parseFloat(this.SER109N.NUMERACION.PORCECOPAGO_NUM) > 0 && (SER109N.OPCIONACTIVA == '09743E') && (this.SER109N.PREFIJOW == 'P' || this.SER109N.PREFIJOW == 'T' || this.SER109N.PREFIJOW == 'O' || this.SER109N.PREFIJOW == 'Q' || this.SER109N.PREFIJOW == 'R' || this.SER109N.PREFIJOW == 'U' || this.SER109N.PREFIJOW == 'V' || this.SER109N.PREFIJOW == 'W' || this.SER109N.PREFIJOW == 'X' || this.SER109N.PREFIJOW == 'Y' || this.SER109N.PREFIJOW == 'Z')) {
                        if (this.this.form.estadofactura_SER109N.substring(0, 1) == '0' || this.this.form.estadofactura_SER109N.substring(0, 1) == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER109N.LLAVEW + '|' + this.SER109.NUMERACION.IDPAC_NUM + '|' + this.SER109.NUMERACION.DESCRIP_PACI.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER109N.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    this._ventanacopagos_SER109N();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109N();
                                });
                        }
                    } else {
                        this._datosimpresion_SER109N();
                    }
                }
            )
        },
        _ventanacopagos_SER109N() {
            $_this = this
            var ventanacierre_SER109N = bootbox.dialog({
                size: 'medium',
                title: 'LIQUIDACION DE COPAGOS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "% COPAGO:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1VENTANACOPAGO_SER109N"> ' +
                    '<input id="porcentcopago_SER109N" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="4"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR2VENTANACOPAGO_SER109N"> ' +
                    '<input id="montocopago_SER109N" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "COPAGOS ACUMULADOS :" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<input id="copagoacumulado_SER109N" class="form-control col-md-12 col-sm-12 col-xs-12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanacierre_SER109N.off('show.bs.modal');
                            setTimeout(() => { $_this._datosimpresion_SER109N() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanacierre_SER109N.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarimpresionorig_SER109N('1') }, 500)

                        }
                    }
                }
            });
            ventanacierre_SER109N.init($('.modal-footer').hide());
            ventanacierre_SER109N.init(this._evaluarporcentcopago_SER109N());
            ventanacierre_SER109N.on('shown.bs.modal', function () {
                $("#porcentcopago_SER109N").focus();
            });
        },
        _evaluarporcentcopago_SER109N() {
            _inputControl('disabled');
            this.SER109N.COPAGOESTW = this.SER109N.NUMERACION.COPAGO_NUM;
            this.SER109N.PORCECOPAGOW = this.SER109N.NUMERACION.PORCECOPAGO_NUM;
            $('#porcentcopago_SER109N').val(this.SER109N.PORCECOPAGOW.trim());
            $('#copagoacumulado_SER109N').val(this.SER109N.COPAGOSACUMW);
            validarInputs({
                form: '#VALIDAR1VENTANACOPAGO_SER109N',
                orden: '1',
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER109N.PORCECOPAGOW = porcentcopagoMask_SER109N($('#porcentcopago_SER109N').val().replace(',', '.'));
                    if (parseInt(this.SER109N.PORCECOPAGOW) == 0) {
                        this.SER109N.COPAGOESTW = 0
                        this._validarcopago_SER109N();
                    } else if (parseInt(this.SER109N.PORCECOPAGOW) > 100) {
                        CON851('', 'Revise el valor del porcentaje', this._evaluarporcentcopago_SER109N(), 'error', 'Error');
                    } else {
                        if (parseFloat(this.SER109N.PORCECOPAGOW) == 9) {
                            this._evaluarcopagoest_SER109N();
                        } else {
                            this.SER109N.COPAGOESTW = parseInt((this.SER109N.TOTBASECOPAGO * this.SER109N.PORCECOPAGOW) / 100)
                            this._validarcopago_SER109N();
                        }
                    }
                }
            )
        },
        _evaluarcopagoest_SER109N() {
            validarInputs({
                form: '#VALIDAR2VENTANACOPAGO_SER109N',
                orden: '1',
            },
                this._evaluarporcentcopago_SER109N,
                () => {
                    this.SER109N.COPAGOESTW = $('#montocopago_SER109N').val();
                    if (isNumeric(this.SER109N.COPAGOESTW)) {
                        this._validarcopago_SER109N();
                    } else {
                        CON851('', 'Revise el valor digitado', this._evaluarcopagoest_SER109N(), 'error', 'Error');
                    }
                }
            )
        },
        _validarcopago_SER109N() {
            if (this.SER109N.NUMERACION.ESTRATO_PACI != '1' && this.SER109N.NUMERACION.ESTRATO_PACI != '2' && this.NUMERACION.ESTRATO_PACI != '3') {
                this.SER109N.NUMERACION.ESTRATO_PACI = '3'
            }
            switch (this.SER109N.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER109N.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER109N.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER109N.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 115) / 100
                            break;
                        case '3':
                            this.SER109N.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER109N.COPALIQMESW = (this.SER109N.TOTBASECOPAGO * 10) / 100
                    break;
            }
            switch (this.SER109N.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER109N.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER109N.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER109N.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                        case '3':
                            this.SER109N.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 460) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER109N.COPALIQANOW = parseFloat($_USUA_GLOBAL[0].SAL_MIN) / 2
                    if (this.SER109N.COPALIQMESW > this.SER109N.COPALIQANOW) {
                        this.SER109N.COPALIQMESW = this.SER109N.COPALIQANOW;
                    }
                    break;
            }
            if (this.SER109N.COPAGOESTW != this.SER109N.NUMERACION.COPAGO_NUM || this.SER109N.PORCECOPAGOW != this.SER109N.NUMERACION.PORCECOPAGO_NUM) {
                postData({
                    datosh: datosEnvio() + this.SER109N.LLAVEW + '|' + this.SER109N.PORCECOPAGOW.replace('.', '').padStart(4, '0') + '|' + this.SER109N.COPAGOESTW + '|'
                }, get_url("APP/SALUD/SER109A.DLL"))
                    .then((data) => {
                        console.debug(data);
                        this.SER109N.NUMERACION.COPAGO_NUM = this.SER109N.COPAGOESTW;
                        this.SER109N.NUMERACION.PORCECOPAGO_NUM = this.SER109N.PORCECOPAGOW;
                        $('.btn-primary').click()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                $('.btn-primary').click()
            }
        },

        _datosimpresion_SER109N() {
            console.log('ACOMODAR IMPRESION')
            if(SER109N.OPCIONACTIVA == '09743E'){
                // SER109N.FACTURAS
                let impresion_SER109N = new Object;
                impresion_SER109N.FORMATOTABLA = 2;
                impresion_SER109N.OBSERVACION = 1;
                impresion_SER109N.ANEXO = 1;
                impresion_SER109N.FIRMA = 1;
                impresion_SER109N.FINALIMPRESION = 1; 
                impresion_SER109N.MARGIN = [10, 160, 10, 20];
                impresion_SER109N.WIDTH = ['13%', '27%', '15%', '10%', '15%', '15%'];
                impresion_SER109N.COLUMNAS = ["LLAVE", "DESCRIPCION", "CUP", "CANTIDAD", "VALOR_UNIT", "VALOR"];
                if (facturaoriginalMask_SER109N.value.trim() == 'S') impresion_SER109N.ORIGINAL = '***ORIGINAL***'
                else impresion_SER109N.ORIGINAL = '***COPIA***'
                impresion_SER109N.FECHAVENCE = moment(this.SER109N.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
                impresion_SER109N.FECHA = moment(this.SER109N.FECHA).format('MMMM DD YYYY').toUpperCase();
                impresion_SER109N.FECHAVENCE = moment(this.SER109N.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
                impresion_SER109N.FECHA = moment(this.SER109N.FECHA).format('MMMM DD YYYY').toUpperCase();
                impresion_SER109N.LLAVE = this.SER109N.LLAVEW;
                impresion_SER109N.NOMTER = this.SER109N.NUMERACION.DESCRIP_TER;
                impresion_SER109N.NITTER = this.SER109N.NUMERACION.NIT_TER;
                impresion_SER109N.DVTER = this.SER109N.NUMERACION.DV_TER;
                impresion_SER109N.DIRECCTER = this.SER109N.NUMERACION.DIRECC_TER;
                impresion_SER109N.TELTER = this.SER109N.NUMERACION.TEL_TER;
                impresion_SER109N.CIUDADTER = this.SER109N.NUMERACION.CIUDAD_TER;
                impresion_SER109N.DESCRIPTAR = this.SER109N.NUMERACION.CONVENIO_NUM;
                impresion_SER109N.FACTURAS = SER109N.FACTURAS;
                impresion_SER109N.TABLARBOS_NUM = this.SER109N.NUMERACION.TABLARBOS_NUM.filter(x => parseInt(x.VLRABON_NUM) > 0);
                impresion_SER109N.OPERBLOQNUM = this.SER109N.NUMERACION.OPERBLOQ_NUM;
                impresion_SER109N.OPERNUM = this.SER109N.NUMERACION.OPER_NUM;
                impresion_SER109N.ADMINW = localStorage.getItem('Usuario');
                impresion_SER109N.IDPACNUM = this.SER109N.NUMERACION.IDPAC_NUM;
                impresion_SER109N.NOMBREPACNUM = this.SER109N.NUMERACION.NOMBREPAC_NUM;
                if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                        impresion_SER109N.IVA = 'IVA Regimen Comun - Retenedor Iva'
                    } else {
                        impresion_SER109N.IVA = 'IVA Regimen Comun'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                        impresion_SER109N.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                    } else {
                        impresion_SER109N.IVA = 'IVA Regimen Simplificado'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
                    impresion_SER109N.IVA = 'No somos responsables de IVA'
                } else {
                    impresion_SER109N.IVA = '';
                }
                let prefijo = this.SER109N.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == this.SER109N.PREFIJOW)
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = $_PREFIJOFACT;
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                var vlr = 0;
                for (var i in SER109N.FACTURAS) {
                    vlr = vlr + parseInt(SER109N.FACTURAS[i].VALOR.replace(/,/g, ''));
                }
                var abono = 0;
                for (var i in this.SER109N.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109N.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM != '') {
                        abono = parseInt(this.SER109N.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.replace(/,/g, '')) + abono;
                    }
                }
                var saldocopago = 0;
                if ($_USUA_GLOBAL[0] == 891855847) {
                    saldocopago = 0;
                } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER109N.NUMERACION.NIT_NUM) == 9990 || parseInt(this.SER109N.NUMERACION.NIT_NUM) == 9999) && (parseInt(this.SER109N.NUMERACION.FECHA_ING) > 20070930)) {
                    saldocopago = parseInt(this.SER109N.NUMERACION.CO_PAGO_NUM) + abono
                } else {
                    if (abono != 0) {
                        saldocopago = 0
                    } else {
                        saldocopago = parseInt(this.SER109N.NUMERACION.CO_PAGO_NUM);
                    }
                }
                let neto = vlr - saldocopago;
                impresion_SER109N.VLRTOTAL = vlr;
                impresion_SER109N.SALDOCOPAGO = saldocopago;
                impresion_SER109N.SALDO = neto;
                impresion_SER109N.PREFIJO = prefijo;
                impresion_SER109N.TOTCOPAGO = parseInt(this.SER109N.NUMERACION.CO_PAGO_NUM)
                impresion_SER109N.IMPRESION = 'SER109W';
                let valorenletras = FAC146(impresion_SER109N.VLRTOTAL);
                impresion_SER109N.NUMEROENLETRAS = 'SON: ' + valorenletras;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion_SER109N.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion_SER109N.FIRMA1 = this.SER109N.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                _impresionformatoSER109(impresion_SER109N, this._cerrarnumeracion_SER109N, this._evaluarfacturaoriginal_SER109N)
            } else {
                // SER109N.FACTURAS2
                let impresion_SER109W = new Object;
                impresion_SER109W.FORMATOTABLA = 6;
                impresion_SER109W.TARIF = 2;
                impresion_SER109W.FINALIMPRESION = 1; 
                impresion_SER109W.OBSERVACION = 2;
                impresion_SER109W.ANEXO = 2;
                impresion_SER109W.MARGIN = [10, 160, 10, 20];
                impresion_SER109W.WIDTH = ['30%', '30%', '20%', '10%', '10%'];
                impresion_SER109W.COLUMNAS = ["VLR_UPC", "CONCEPTO", "USUAR", "CANT", "VALOR"];
                if (facturaoriginalMask_SER109N.value.trim() == 'S') impresion_SER109W.ORIGINAL = '***ORIGINAL***'
                else impresion_SER109W.ORIGINAL = '***COPIA***'
                impresion_SER109W.FECHA = moment(this.SER109N.FECHA).format('MMMM DD YYYY').toUpperCase();
                impresion_SER109W.FECHA = moment(this.SER109N.FECHA).format('MMMM DD YYYY').toUpperCase();
                impresion_SER109W.LLAVE = this.SER109N.LLAVEW;
                impresion_SER109W.NOMTER = this.SER109N.NUMERACION.DESCRIP_TER;
                impresion_SER109W.NITTER = this.SER109N.NUMERACION.NIT_TER;
                impresion_SER109W.DVTER = this.SER109N.NUMERACION.DV_TER;
                impresion_SER109W.DIRECCTER = this.SER109N.NUMERACION.DIRECC_TER;
                impresion_SER109W.TELTER = this.SER109N.NUMERACION.TEL_TER;
                impresion_SER109W.CIUDADTER = this.SER109N.NUMERACION.CIUDAD_TER;
                impresion_SER109W.CONTRATONUM = SER109N.FACTURAS2[0].CONTRATO;
                impresion_SER109W.FACTURAS = SER109N.FACTURAS2;
                impresion_SER109W.TABLARBOS_NUM = this.SER109N.NUMERACION.TABLARBOS_NUM.filter(x => parseInt(x.VLRABON_NUM) > 0);
                impresion_SER109W.OBSERVNUM = this.SER109N.NUMERACION.OBSERV_NUM;
                impresion_SER109W.ANEXOSNUM = this.SER109N.NUMERACION.ANEXOS_NUM;
                impresion_SER109W.OPERNUM = this.SER109N.NUMERACION.OPER_NUM;
                impresion_SER109W.OPERMODNUM = this.SER109N.NUMERACION.OPERMOD_NUM;
                impresion_SER109W.OPERBLOQNUM = this.SER109N.NUMERACION.OPERBLOQ_NUM;
                impresion_SER109W.ADMINW = localStorage.getItem('Usuario').trim();
                impresion_SER109W.FECHAIMPRESION = moment().format('YYMMDD');
                impresion_SER109W.FECHAOPER = moment(this.SER109N.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109W.FECHAOPER == 'Invalid date') impresion_SER109W.FECHAOPER = '000000'
                impresion_SER109W.FECHAMODOPER = moment(this.SER109N.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109W.FECHAMODOPER == 'Invalid date') impresion_SER109W.FECHAMODOPER = '000000'
                impresion_SER109W.FECHARETOPER = moment(this.SER109N.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109W.FECHARETOPER == 'Invalid date') impresion_SER109W.FECHARETOPER = '000000'
                impresion_SER109W.IDPACNUM = this.SER109N.NUMERACION.IDPAC_NUM;
                impresion_SER109W.NOMBREPACNUM = this.SER109N.NUMERACION.NOMBREPAC_NUM;
                if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                        impresion_SER109W.IVA = 'IVA Regimen Comun - Retenedor Iva'
                    } else {
                        impresion_SER109W.IVA = 'IVA Regimen Comun'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                        impresion_SER109W.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                    } else {
                        impresion_SER109W.IVA = 'IVA Regimen Simplificado'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
                    impresion_SER109W.IVA = 'No somos responsables de IVA'
                } else {
                    impresion_SER109W.IVA = '';
                }
                let prefijo = this.SER109N.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == this.SER109N.PREFIJOW)
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = $_PREFIJOFACT;
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                var vlr = 0;
                for (var i in SER109N.FACTURAS2) {
                    vlr = vlr + parseInt(SER109N.FACTURAS2[i].VALOR.replace(/,/g, ''));
                }
                var abono = 0;
                for (var i in this.SER109N.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109N.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM != '') {
                        abono = parseInt(this.SER109N.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.replace(/,/g, '')) + abono;
                    }
                }
                var saldocopago = 0;
                if ($_USUA_GLOBAL[0] == 891855847) {
                    saldocopago = 0;
                } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER109N.NUMERACION.NIT_NUM) == 9990 || parseInt(this.SER109N.NUMERACION.NIT_NUM) == 9999) && (parseInt(this.SER109N.NUMERACION.FECHA_ING) > 20070930)) {
                    saldocopago = parseInt(this.SER109N.NUMERACION.CO_PAGO_NUM) + abono
                } else {
                    if (abono != 0) {
                        saldocopago = 0
                    } else {
                        saldocopago = parseInt(this.SER109N.NUMERACION.CO_PAGO_NUM);
                    }
                }
                let neto = vlr - saldocopago;
                impresion_SER109W.VLRTOTAL = vlr;
                impresion_SER109W.SALDOCOPAGO = saldocopago;
                impresion_SER109W.SALDO = neto;
                impresion_SER109W.PREFIJO = prefijo;
                impresion_SER109W.TOTCOPAGO = parseInt(this.SER109N.NUMERACION.CO_PAGO_NUM);
                impresion_SER109W.IMPRESION = 'SER109W';
                let valorenletras = FAC146(impresion_SER109W.VLRTOTAL);
                impresion_SER109W.NUMEROENLETRAS = 'SON: ' + valorenletras;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion_SER109W.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion_SER109W.FIRMA1 = this.SER109N.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                _impresionformatoSER109(impresion_SER109W, this._cerrarnumeracion_SER109N, this._evaluarfacturaoriginal_SER109N)

            }
        },
        _cerrarnumeracion_SER109N() {
            console.log('cerrarnumeracion');
            if (this.form.estadofactura_SER109N.substring(0, 1) == '0' || this.form.estadofactura_SER109N.substring(0, 1) == '3') {
                if (this.SER109N.PREFIJOW == 'A' || this.SER109N.PREFIJOW == 'B' || this.SER109N.PREFIJOW == 'D' || this.SER109N.PREFIJOW == 'F' || this.SER109N.PREFIJOW == 'G' ||
                    this.SER109N.PREFIJOW == 'H' || this.SER109N.PREFIJOW == 'I' || this.SER109N.PREFIJOW == 'J' || this.SER109N.PREFIJOW == 'K') {
                    if (this.SER109N.FECHALNK.substring(0, 4) == this.SER109N.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109N.FECHALNK.substring(4, 6) == this.SER109N.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        this._cerrarnumeracion2_SER109N();
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    this._cerrarnumeracion2_SER109N();
                }
            } else {
                _toggleNav();
            }
        },
        _cerrarnumeracion2_SER109N() {
            let URL = get_url("APP/SALUD/SAL020I.DLL");
            postData({
                datosh: datosEnvio() + SER109N.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    this.SER109N.FECHAULTIMAFACT = data.FECHAULTIMAFACT
                    this.SER109N.FECHAULTIMAFACT.pop();
                    this.SER109N.FECHALIMI = '00000000';
                    if (this.SER109N.FECHAULTIMAFACT != '') { this.SER109N.FECHALIMI = this.SER109N.FECHAULTIMAFACT[this.SER109N.FECHAULTIMAFACT.length - 1] };
                    if (parseInt(this.SER109N.FECHALIMI) > parseInt(this.SER109N.FECHALNK)) {
                        CON851('', 'LA FECHA DEL ULT. COMP > A FECHA DEL MES', null, 'error', 'Error');
                        if (this.SER109N.PREFIJOW != 'C' && this.SER109N.PREFIJOW != 'E' && this.SER109N.PREFIJOW != 'Ñ' && this.SER109N.PREFIJOW != 'O' && this.SER109N.PREFIJOW != 'P' && this.SER109N.PREFIJOW != 'T' && this.SER109N.PREFIJOW != 'U') {
                            this._ventanacierrefact_SER109N();
                        } else {
                            _toggleNav();
                        }
                    } else {
                        this._ventanacierrefact_SER109N();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this._evaluarprefijo_SER109N();
                })
        },
        _ventanacierrefact_SER109N() {
            $_this = this
            var ventanacierre = bootbox.dialog({
                size: 'medium',
                title: 'CIERRE DE FACTURAS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Desea cerrar la factura?:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="CERRARFACT_SER109N"> ' +
                    '<input id="cerrar_SER109N" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-10 col-sm-6 col-xs-6" id="FECHACIE_SER109N"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha cierre:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="anocierre_SER109N" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="mescierre_SER109N" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="diacierre_SER109N" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanacierre.off('show.bs.modal');
                            setTimeout(() => { $_this._grabarcierre_SER109N() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanacierre.off('show.bs.modal');
                            _toggleNav();
                        }
                    }
                }
            });
            ventanacierre.init($('.modal-footer').hide());
            ventanacierre.init(this._Evaluarcierrefact_SER109N());
            ventanacierre.on('shown.bs.modal', function () {
                $("#cerrar_SER109N").focus();
            });
        },
        _Evaluarcierrefact_SER109N() {
            _inputControl("disabled");
            validarInputs({
                form: '#CERRARFACT_SER109N',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER109N.CERRARFACT = $('#cerrar_SER109N').val().toUpperCase();
                    if ((this.SER109N.CERRARFACT == 'S') || (this.SER109N.CERRARFACT == 'N')) {
                        if (this.SER109N.CERRARFACT == 'N') {
                            $('.btn-danger').click();
                        } else {
                            this._evaluarfechacierre_SER109N('3');
                        }
                    } else {
                        this._Evaluarcierrefact_SER109N();
                    }
                }
            )
        },
        _evaluarfechacierre_SER109N(orden) {
            let fechasistema = moment().format('YYYYMMDD');
            let fechacierre = moment().format('YYYYMMDD');
            this.SER109N.HORARETNUM = moment().format('HHmm');
            $('#anocierre_SER109N').val(fechacierre.substring(0, 4));
            $('#mescierre_SER109N').val(fechacierre.substring(4, 6));
            this.SER109N.ANORET = $('#anocierre_SER109N').val();
            this.SER109N.MESRET = $('#mescierre_SER109N').val();
            $('#diacierre_SER109N').val(fechacierre.substring(6, 8));
            validarInputs({
                form: '#FECHACIE_SER109N',
                orden: orden,
            },
                this._Evaluarcierrefact_SER109N,
                () => {
                    this.SER109N.DIARET = $('#diacierre_SER109N').val().padStart(2, '0');
                    this.SER109N.FECHARETNUM = this.SER109N.ANORET + this.SER109N.MESRET + this.SER109N.DIARET;
                    if ((parseInt(this.SER109N.DIARET) < 1) || (parseInt(this.SER109N.DIARET) > parseInt(this.SER109N.FECHALNK.substring(6, 8))) || parseInt(this.SER109N.FECHARETNUM) < (this.SER109N.FECHAING_NUM)) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER109N').val('N');
                        this._Evaluarcierrefact_SER109N()
                    } else if (fechasistema > SER109N.FECHARETNUM) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER109N').val('N');
                        this._Evaluarcierrefact_SER109N()
                    } else {
                        $('.btn-primary').click();
                    }
                }
            )
        },
        _grabarcierre_SER109N() {
            let URL = get_url("APP/SALUD/SER109D.DLL");
            postData({
                datosh: datosEnvio() + '4|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109N.LLAVEW + '| | |' + this.form.estadofactura_SER109N.substring(0, 1) + '| | | | | |' + localStorage.getItem('Usuario').trim() + '| | | |' + SER109N.FECHARETNUM + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    if (this.SER109N.PREFIJOW == 'P' || this.SER109N.PREFIJOW == 'T' || this.SER109N.PREFIJOW == 'Q' || this.SER109N.PREFIJOW == 'V') {
                        let URL = get_url("APP/SALUD/SAL020C.DLL");
                        postData({
                            datosh: datosEnvio() + this.SER109N.LLAVEW + '|' + this.SER109N.FECHALNK + '|'
                        }, URL)
                            .then((data) => {
                                console.debug(data);
                                CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
                                _toggleNav();
                            })
                            .catch((error) => {
                                console.log(error);
                                CON851('', 'Ocurrio un problema contactese con prosoft', null, 'error', 'Error');
                                _toggleNav();
                            })
                    } else {
                        let URL = get_url("APP/SALUD/SAL020B.DLL");
                        postData({
                            datosh: datosEnvio() + SER109N.LLAVEW + '|' + SER109N.FECHALNK + '|'
                        }, URL)
                            .then((data) => {
                                console.debug(data);
                                CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
                                _toggleNav();
                            })
                            .catch((error) => {
                                console.log(error);
                                CON851('', 'Ocurrio un problema contactese con prosoft', null, 'error', 'Error');
                                _toggleNav();
                            })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    CON851('', 'Hubo un error con el cierre', null, 'error', 'Error');
                    this._evaluarprefijo_SER109N();
                })
        }
    }
})

var prefijoMask_SER109N = IMask($('#prefijo_SER109N')[0], {
    mask: 'a',
    definitions: {
        'a': /[APTBDFGHIJKLMNQRSVWXYZ]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var bloqueoMask_SER109N = IMask($('#bloquearfactura_SER109N')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});


var facturaoriginalMask_SER109N = IMask($('#facturaoriginal_SER109N')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});


var facturavaciaMask_SER109N = IMask($('#facturavacia_SER109N')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});



