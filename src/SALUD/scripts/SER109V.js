// // 10-09-2020 DIANA E: creado 
moment.locale('es')
var fecha_SER109V = IMask.createPipe({
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
    el: "#SER109V",
    data: {
        SER109V: [],
        form: {
            cliente_SER109V: "",
            decripcliente_SER109V: "",
            numerodesde_SER109V: "",
            descripnumerodesde_SER109V: "",
            numerohasta_SER109V: "",
            descripnumerohasta_SER109V: "",
            ciudad_SER109V: "",
            decripciudad_SER109V: "",
            observacion_SER109V: "",
            anexos_SER109V: "",
            fechafacturaano_SER109V: "",
            fechafacturames_SER109V: "",
            fechafacturadia_SER109V: "",
            numerocpias_SER109V: ""
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion('9,7,4,3,B Imprimir y cerrar facturas masivamente');
        this.SER109V.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        this.SER109V.PUCUSU = $_USUA_GLOBAL[0].PUC;
        this.SER109V.NITUSU = $_USUA_GLOBAL[0].NIT;
        this.SER109V.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;

        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER109V.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER109V.FIRMAS = data;
                obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, data => {
                    data = data.TERCEROS;
                    this.SER109V.TERCEROS = data;
                    $_this._evaluarcliente_SER109V();
                    obtenerDatosCompletos({ nombreFd: 'CIUDADES' }, data => {
                        data = data.CIUDAD;
                        this.SER109V.CIUDAD = data;
                    })
                })
            })
        })
    },
    methods: {
        _evaluarcliente_SER109V() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER109V',
                orden: '1'
            },
                _toggleNav,
                () => {
                    if (this.form.cliente_SER109V.trim() == '' || this.form.cliente_SER109V == '00000000') {
                        CON851("01", "01", this._evaluarcliente_SER109V(), "error", "error");
                    } else {
                        this.form.cliente_SER109V = this.form.cliente_SER109V.padStart(10, " ")
                        let res = this.SER109V.TERCEROS.find(e => e.COD == this.form.cliente_SER109V);
                        if (res == undefined) {
                            CON851("01", "01", this._evaluarcliente_SER109V(), "error", "error");
                        } else {
                            this.form.decripcliente_SER109V = res.NOMBRE;
                            this._evaluarprefijo_SER109V();
                        }
                    }
                }
            )
        },
        _evaluarprefijo_SER109V() {
            validarInputs({
                form: '#VALIDAR2_SER109V',
                orden: '1'
            },
                this._evaluarcliente_SER109V,
                () => {
                    this.SER109V.PREFIJOW = prefijoMask_SER109V.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER109V.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER109V = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroinicio_SER109V();
                        })
                        .catch(error => {
                            this._evaluarcliente_SER109V();
                        });
                }
            )
        },
        _evaluarnumeroinicio_SER109V() {
            validarInputs({
                form: '#VALIDAR3_SER109V',
                orden: '1'
            },
                this._evaluarprefijo_SER109V,
                () => {
                    this.SER109V.LLAVEW = this.SER109V.PREFIJOW + this.form.numerodesde_SER109V.toString().padStart(6, '0');
                    let URL = get_url("APP/SALUD/SER808-01.DLL");
                    postData({
                        datosh: datosEnvio() + this.SER109V.LLAVEW + '|'
                    }, URL)
                        .then(data => {
                            this.SER109V.FACTURA = data.NUMER19[0];
                            this.form.descripnumerodesde_SER109V = this.SER109V.FACTURA.DESCRIP_NUM;
                            this.SER109V.ESTADONUM = this.SER109V.FACTURA.ESTADO_NUM;
                            if (this.form.cliente_SER109V.padStart(10, "0") == this.SER109V.FACTURA.NIT_NUM) {
                                CON851("06", "06", this._evaluarnumeroinicio_SER109V(), "error", "error");
                            } else {
                                this._evaluarnumerodestino_SER109V()
                            }
                        })
                        .catch(error => {
                            this._evaluarnumeroinicio_SER109V();
                        });

                }
            )
        },
        _evaluarnumerodestino_SER109V() {
            validarInputs({
                form: '#VALIDAR4_SER109V',
                orden: '1'
            },
                this._evaluarnumeroinicio_SER109V,
                () => {
                    this.SER109V.LLAVE2W = this.SER109V.PREFIJOW + this.form.numerohasta_SER109V.toString().padStart(6, '0');
                    console.log(this.SER109V.LLAVE2W)
                    let URL = get_url("APP/SALUD/SER808-01.DLL");
                    postData({
                        datosh: datosEnvio() + this.SER109V.LLAVE2W + '|'
                    }, URL)
                        .then(data => {
                            console.log(data)
                            this.SER109V.FACTURA2 = data.NUMER19[0];
                            this._evaluarciudad_SER109V()
                        })
                        .catch(error => {
                            this._evaluarnumerodestino_SER109V();
                        });

                }
            )
        },
        _evaluarciudad_SER109V() {
            if(this.form.ciudad_SER109V.trim() == '') this.form.ciudad_SER109V = '*****'
            validarInputs({
                form: '#VALIDAR5_SER109V',
                orden: '1'
            },
                this._evaluarnumerodestino_SER109V,
                () => {
                    if (this.form.ciudad_SER109V == '*****') {
                        this.form.decripciudad_SER109V = 'Todas las ciudades'
                        if ($_USUA_GLOBAL[0].NIT == 800251482) this._datosimpresion_SER109V()
                        this._validarfactura_SER109V()
                    } else {
                        let res = this.SER109V.CIUDAD.find(e => e.COD == this.form.ciudad_SER109V);
                        if (res == undefined) {
                            CON851("01", "01", this._evaluarciudad_SER109V(), "error", "error");
                        } else {
                            this.form.decripciudad_SER109V = res.NOMBRE;
                            if ($_USUA_GLOBAL[0].NIT == 800251482) this._datosimpresion_SER109V()
                            this._validarfactura_SER109V()
                        }
                    }

                }
            )
        },
        _validarfactura_SER109V() {
            this.form.observacion_SER109V = this.SER109V.FACTURA2.OBSERV_NUM.trim();
            this.form.anexos_SER109V = this.SER109V.FACTURA2.ANEXOS_NUM.trim();
            if (parseInt(this.SER109V.FACTURA.FECHA_PRE.substring(4, 6)) == 0) {
                if (parseInt(this.SER109V.FACTURA.FECHA_PRE.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER109V = this.SER109V.FACTURA2.FECHA_RET.substring(0, 4);
                    this.form.fechafacturames_SER109V = this.SER109V.FACTURA2.FECHA_RET.substring(4, 6);
                    this.form.fechafacturadia_SER109V = this.SER109V.FACTURA2.FECHA_RET.substring(6, 8);
                } else {
                    let fechaactual = moment().format("YYYYMMDD");
                    this.form.fechafacturaano_SER109V = fechaactual.substring(0, 4);
                    this.form.fechafacturames_SER109V = fechaactual.substring(4, 6);
                    this.form.fechafacturadia_SER109V = fechaactual.substring(6, 8);
                }
            } else {
                this.form.fechafacturaano_SER109V = this.SER109V.FACTURA2.FECHA_ING.substring(0, 4);
                this.form.fechafacturames_SER109V = this.SER109V.FACTURA2.FECHA_ING.substring(4, 6);
                this.form.fechafacturadia_SER109V = this.SER109V.FACTURA2.FECHA_ING.substring(6, 8);
            }
            this._evaluarobservaciones_SER109V('1')
        },

        _evaluarobservaciones_SER109V(orden) {
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR6_SER109V',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER109V('2') },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER109V = this.form.observacion_SER109V.toUpperCase();
                    this.form.anexos_SER109V = this.form.anexos_SER109V.toUpperCase();
                    this._evaluarbloqueofactura_SER109V()
                }
            )
        },
        _evaluarbloqueofactura_SER109V() {
            _FloatText({ estado: 'off' })
            bloqueoMask_SER109V.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR7_SER109V',
                orden: '1'
            },
                () => { this._evaluarobservaciones_SER109V('2') },
                () => {
                    if (bloqueoMask_SER109V.value.trim() == '') bloqueoMask_SER109V.typedValue = 'N'
                    if (bloqueoMask_SER109V.value == 'S') this.SER109V.ESTADONUM = '3', this.SER109V.OPERBLOQUEO = localStorage.getItem('Usuario').trim();
                    this._evaluarfechaimpresion_SER109V('1')
                }
            )

        },
        _evaluarfechaimpresion_SER109V(orden) {
            validarInputs({
                form: '#VALIDAR8_SER109V',
                orden: orden,
            },
                this._evaluarbloqueofactura_SER109V,
                () => {
                    this.SER109V.FECHA = this.form.fechafacturaano_SER109V + this.form.fechafacturames_SER109V.padStart(2, '0') + this.form.fechafacturadia_SER109V.padStart(2, '0')
                    this.SER109V.ANONUM = this.SER109V.FECHA.substring(4, 6)
                    this._evaluardescriminardrog_SER109V()
                }
            )
        },
        _evaluardescriminardrog_SER109V() {
            discriminardrogMask_SER109V.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR9_SER109V',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109V('1') },
                () => {
                    if (discriminardrogMask_SER109V.value.trim() == '') discriminardrogMask_SER109V.typedValue = 'N';
                    this._ventanacierrefact_SER109V()
                }
            )
        },

        _ventanacierrefact_SER109V() {
            $_this = this
            var ventanacierre = bootbox.dialog({
                size: 'medium',
                title: 'CIERRE DE FACTURAS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Desea cerrar la factura?:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="CERRARFACT_SER109V"> ' +
                    '<input id="cerrar_SER109V" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-10 col-sm-6 col-xs-6" id="FECHACIE_SER109V"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha cierre:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="anocierre_SER109V" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="mescierre_SER109V" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="diacierre_SER109V" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD"> ' +
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
                            setTimeout(() => { $_this._evaluarsubtotal_SER109V() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanacierre.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluardescriminardrog_SER109V() }, 500)

                        }
                    }
                }
            });
            ventanacierre.init($('.modal-footer').hide());
            ventanacierre.init(this._Evaluarcierrefact_SER109V());
            ventanacierre.on('shown.bs.modal', function () {
                $("#cerrar_SER109V").focus();
            });
        },
        _Evaluarcierrefact_SER109V() {
            _inputControl("disabled");
            validarInputs({
                form: '#CERRARFACT_SER109V',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER109V.CERRARFACT = $('#cerrar_SER109V').val().toUpperCase();
                    if ((this.SER109V.CERRARFACT == 'S') || (this.SER109V.CERRARFACT == 'N')) {
                        if (this.SER109V.CERRARFACT == 'N') {
                            this.SER109V.FECHARETNUM = '00000000';
                            $('.btn-primary').click();
                        } else {
                            this._evaluarfechacierre_SER109V('3');
                        }
                    } else {
                        this._Evaluarcierrefact_SER109V();
                    }
                }
            )
        },
        _evaluarfechacierre_SER109V(orden) {
            let fechasistema = moment().format('YYYYMMDD');
            let fechacierre = moment().format('YYYYMMDD');
            this.SER109V.HORARETNUM = moment().format('HHmm');
            $('#anocierre_SER109V').val(fechacierre.substring(0, 4));
            $('#mescierre_SER109V').val(fechacierre.substring(4, 6));
            this.SER109V.ANORET = $('#anocierre_SER109V').val();
            this.SER109V.MESRET = $('#mescierre_SER109V').val();
            $('#diacierre_SER109V').val(fechacierre.substring(6, 8));
            validarInputs({
                form: '#FECHACIE_SER109V',
                orden: orden,
            },
                this._Evaluarcierrefact_SER109V,
                () => {
                    this.SER109V.DIARET = $('#diacierre_SER109V').val().padStart(2, '0');
                    this.SER109V.FECHARETNUM = this.SER109V.ANORET + this.SER109V.MESRET + this.SER109V.DIARET;
                    if ((parseInt(this.SER109V.DIARET) < 1) || (parseInt(this.SER109V.DIARET) > parseInt(this.SER109V.FECHALNK.substring(6, 8))) || parseInt(this.SER109V.FECHARETNUM) < (this.SER109V.FECHAING_NUM)) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER109V').val('N');
                        this._Evaluarcierrefact_SER109V()
                    } else if (fechasistema > SER109V.FECHARETNUM) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER109V').val('N');
                        this._Evaluarcierrefact_SER109V()
                    } else {
                        $('.btn-primary').click();
                    }
                }
            )
        },
        _evaluarsubtotal_SER109V() {
            subtotalMask_SER109V.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR10_SER109V',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109V('1') },
                () => {
                    if (subtotalMask_SER109V.value.trim() == '') subtotalMask_SER109V.typedValue = 'N';
                    this._evaluarfacturaoriginal_SER109V()
                }
            )
        },
        _evaluarfacturaoriginal_SER109V() {
            validarInputs({
                form: '#VALIDAR11_SER109V',
                orden: '1',
            },
                () => { this._evaluardescriminardrog_SER109V() },
                () => {
                    if (facturaoriginalMask_SER109V.value.trim() == '') facturaoriginalMask_SER109V.typedValue = 'N';
                    this._evaluarnumerocop_SER109V()
                }
            )
        },
        _evaluarnumerocop_SER109V() {
            if (this.form.numerocpias_SER109V.trim() == '') this.form.numerocpias_SER109V = '1'
            validarInputs({
                form: '#VALIDAR12_SER109V',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109V('1') },
                () => {
                    if (this.form.numerocpias_SER109V.trim() != '') {
                        this.SER109V.SWORIGINALN = facturaoriginalMask_SER109V.value;
                        CON851P('17', this._evaluarfacturaoriginal_SER109V, this._evaluarrutinacierre_SER109V)
                    }
                }
            )
        },
        _evaluarrutinacierre_SER109V() {
            switch ($_USUA_GLOBAL[0].NIT) {
                case 800251482:
                    if (parseFloat(this.SER109V.FACTURA.PORCENTCOP_NUM) > 0 && (this.SER109V.PREFIJOW == 'P' || this.SER109V.PREFIJOW == 'T' || this.SER109V.PREFIJOW == 'O' || this.SER109V.PREFIJOW == 'Q' || this.SER109V.PREFIJOW == 'R' || this.SER109V.PREFIJOW == 'U' || this.SER109V.PREFIJOW == 'V' || this.SER109V.PREFIJOW == 'W' || this.SER109V.PREFIJOW == 'X' || this.SER109V.PREFIJOW == 'Y' || this.SER109V.PREFIJOW == 'Z')) {
                        if (this.SER109V.ESTADONUM.substring(0, 1) == '0' || this.SER109V.ESTADONUM.substring(0, 1) == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER109V.LLAVEW + '|' + this.SER109V.FACTURA.IDPAC_NUM + '|' + this.SER109V.FACTURA.PACIENTE_NUM.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER109V.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    this._ventanacopagos_SER109V();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109();
                                });
                        }
                    } else {
                        this._cerrarmaloka_SER109V()
                    }
                    break;
                case 830092718:
                    if ($_USUA_GLOBAL[0].PUC == '4' && this.SER109V.PREFIJOW == 'P' && this.SER109V.FACTURA[0].VLR_ABON == 0) {
                        if (this.SER109V.ESTADONUM == 0) {
                            this._ventanacopagos_SER109V();
                        }
                    }else{
                        this._imprimirdei_SER109V()
                    }
                    break;
                default:
                    if ($_USUA_GLOBAL[0].PUC == '4' && this.SER109V.PREFIJOW == 'P' && this.SER109V.FACTURA[0].VLR_ABON == 0) {
                        if (this.SER109V.ESTADONUM == 0) {
                            this._ventanacopagos_SER109V();
                        }
                    } else{
                        this._cerrarfacturas_SER109V()
                    }
                    break;
            }
        },

        _ventanacopagos_SER109V() {
            $_this = this
            var ventanacierre_SER109V = bootbox.dialog({
                size: 'medium',
                title: 'LIQUIDACION DE COPAGOS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "% COPAGO:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1VENTANACOPAGO_SER109V"> ' +
                    '<input id="porcentcopago_SER109V" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="4"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR2VENTANACOPAGO_SER109V"> ' +
                    '<input id="montocopago_SER109V" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "COPAGOS ACUMULADOS :" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<input id="copagoacumulado_SER109V" class="form-control col-md-12 col-sm-12 col-xs-12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanacierre_SER109V.off('show.bs.modal');

                            if($_USUA_GLOBAL[0].NIT == 800251482){
                                setTimeout(() => { this._cerrarmaloka_SER109V() }, 500)
                            }else if($_USUA_GLOBAL[0].NIT == 830092718){
                                setTimeout(() => { this._imprimirdei_SER109V() }, 500)
                            }else{
                                setTimeout(() => { this._cerrarfacturas_SER109V() }, 500)
                            }
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanacierre_SER109V.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarimpresionorig_SER109V('1') }, 500)

                        }
                    }
                }
            });
            ventanacierre_SER109V.init($('.modal-footer').hide());
            ventanacierre_SER109V.init(this._evaluarporcentcopago_SER109V());
            ventanacierre_SER109V.on('shown.bs.modal', function () {
                $("#porcentcopago_SER109V").focus();
            });
        },
        _evaluarporcentcopago_SER109V() {
            _inputControl('disabled');
            this.SER109V.COPAGOESTW = this.SER109V.NUMERACION.COPAGO_NUM;
            this.SER109V.PORCECOPAGOW = this.SER109V.NUMERACION.PORCECOPAGO_NUM;
            $('#porcentcopago_SER109V').val(this.SER109V.PORCECOPAGOW.trim());
            $('#copagoacumulado_SER109V').val(this.SER109V.COPAGOSACUMW);
            validarInputs({
                form: '#VALIDAR1VENTANACOPAGO_SER109V',
                orden: '1',
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER109V.PORCECOPAGOW = porcentcopagoMask_SER109V($('#porcentcopago_SER109V').val().replace(',', '.'));
                    if (parseInt(this.SER109V.PORCECOPAGOW) == 0) {
                        this.SER109V.COPAGOESTW = 0
                        this._validarcopago_SER109V();
                    } else if (parseInt(this.SER109V.PORCECOPAGOW) > 100) {
                        CON851('', 'Revise el valor del porcentaje', this._evaluarporcentcopago_SER109V(), 'error', 'Error');
                    } else {
                        if (parseFloat(this.SER109V.PORCECOPAGOW) == 9) {
                            this._evaluarcopagoest_SER109V();
                        } else {
                            this.SER109V.COPAGOESTW = parseInt((this.SER109V.TOTBASECOPAGO * this.SER109V.PORCECOPAGOW) / 100)
                            this._validarcopago_SER109V();
                        }
                    }
                }
            )
        },
        _evaluarcopagoest_SER109V() {
            validarInputs({
                form: '#VALIDAR2VENTANACOPAGO_SER109V',
                orden: '1',
            },
                this._evaluarporcentcopago_SER109V,
                () => {
                    this.SER109V.COPAGOESTW = $('#montocopago_SER109V').val();
                    if (isNumeric(this.SER109V.COPAGOESTW)) {
                        this._validarcopago_SER109V();
                    } else {
                        CON851('', 'Revise el valor digitado', this._evaluarcopagoest_SER109V(), 'error', 'Error');
                    }
                }
            )
        },
        _validarcopago_SER109V() {
            if (this.SER109V.NUMERACION.ESTRATO_PACI != '1' && this.SER109V.NUMERACION.ESTRATO_PACI != '2' && this.NUMERACION.ESTRATO_PACI != '3') {
                this.SER109V.NUMERACION.ESTRATO_PACI = '3'
            }
            switch (this.SER109V.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER109V.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER109V.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER109V.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 115) / 100
                            break;
                        case '3':
                            this.SER109V.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER109V.COPALIQMESW = (this.SER109V.TOTBASECOPAGO * 10) / 100
                    break;
            }
            switch (this.SER109V.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER109V.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER109V.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER109V.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                        case '3':
                            this.SER109V.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 460) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER109V.COPALIQANOW = parseFloat($_USUA_GLOBAL[0].SAL_MIN) / 2
                    if (this.SER109V.COPALIQMESW > this.SER109V.COPALIQANOW) {
                        this.SER109V.COPALIQMESW = this.SER109V.COPALIQANOW;
                    }
                    break;
            }
            if (this.SER109V.COPAGOESTW != this.SER109V.NUMERACION.COPAGO_NUM || this.SER109V.PORCECOPAGOW != this.SER109V.NUMERACION.PORCECOPAGO_NUM) {
                postData({
                    datosh: datosEnvio() + this.SER109V.LLAVEW + '|' + this.SER109V.PORCECOPAGOW.replace('.', '').padStart(4, '0') + '|' + this.SER109V.COPAGOESTW + '|'
                }, get_url("APP/SALUD/SER109A.DLL"))
                    .then((data) => {
                        console.debug(data);
                        this.SER109V.NUMERACION.COPAGO_NUM = this.SER109V.COPAGOESTW;
                        this.SER109V.NUMERACION.PORCECOPAGO_NUM = this.SER109V.PORCECOPAGOW;
                        $('.btn-primary').click()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                $('.btn-primary').click()
            }
        },

        _cerrarmaloka_SER109V(){

        }, 
        _imprimirdei_SER109V(){

        },
        _cerrarfacturas_SER109V(){
            postData({
                datosh: `${datosEnvio()}${prefijoMask_SER109V.value.trim()}${this.form.numerodesde_SER109V.trim().padStart(6,'0')}|${this.form.numerohasta_SER109V.trim().padStart(6,'0')}|${discriminardrogMask_SER109V.value.trim()}|${subtotalMask_SER109V.value.trim()}|${this.SER109V.CERRARFACT}|${bloqueoMask_SER109V.value.trim()}|${this.form.cliente_SER109V.trim().padStart(10,'0')}|${this.form.observacion_SER109V.trim()}|${this.form.anexos_SER109V.trim()}|${localStorage.Usuario.trim()}|${this.form.ciudad_SER109V.trim().padStart(5,'0')}|`
            }, get_url("APP/SALUD/SER109V.DLL"))
                .then((data) => {
                    console.debug(data);
                    data.FACTURAS.pop();
                    for(var i in data.FACTURAS){
                        let impresion_SER109V = new Object;
                        if ($_USUA_GLOBAL[0].IVA_S == 'C'){
                            if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                                impresion_SER109V.IVA = 'IVA Regimen Comun - Retenedor Iva'
                            } else {
                                impresion_SER109V.IVA = 'IVA Regimen Comun'
                            }
                        } else if ($_USUA_GLOBAL[0].IVA_S == 'C'){
                            if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                                impresion_SER109V.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                            } else {
                                impresion_SER109V.IVA = 'IVA Regimen Simplificado'
                            }
                        } else if ($_USUA_GLOBAL[0].IVA_S == 'N'){
                            impresion_SER109V.IVA = 'No somos responsables de IVA'
                        } else {
                            impresion_SER109V.IVA = '';
                        }
                        let factura = Object.keys(data.FACTURAS[i]);
                        this.SER109V.FACTURAS = data.FACTURAS[i][factura[0]];
                        console.log(this.SER109V.FACTURAS);
                        impresion_SER109V.LLAVE = factura[0];
                        impresion_SER109V.FECHA = `${this.form.fechafacturaano_SER109V}${this.form.fechafacturames_SER109V}${this.form.fechafacturadia_SER109V}`
                        impresion_SER109V.NROAFILPACI = data.FACTURAS[i][factura[0]][0].NROAFILPACI;
                        impresion_SER109V.FACTURAS = data.FACTURAS[i][factura[0]];
                        impresion_SER109V.TARIF == 3;
                        impresion_SER109V.OBSERVACION = 1;
                        impresion_SER109V.ANEXO = 1;
                        let prefijo = this.SER109V.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109V.value.trim())
                        console.log(prefijo);
                        if(prefijo.length == 0) {
                            prefijo[0] = new Object;
                            prefijo[0].AUT_DIAN = '';
                            prefijo[0].PREFIJO = $_PREFIJOFACT;
                            prefijo[0].DESDE_NRO = '';
                            prefijo[0].HASTA_NRO = '';
                        }
                        impresion_SER109V.PREFIJO = prefijo;
                        impresion_SER109V.MARGIN = [10,160,10,20];
                        impresion_SER109V.TOTAL = 0
                        for (var x in data.FACTURAS[i][factura[0]]){
                            console.log(x);
                            let valor = parseFloat(data.FACTURAS[i][factura[0]][x].VALOR)
                            if (isNaN(valor)) valor = 0;
                            impresion_SER109V.TOTAL = impresion_SER109V.TOTAL + valor;
                        }
                        postData({
                            datosh: `${datosEnvio()}${impresion_SER109V.LLAVE}|`
                        }, get_url("APP/SALUD/SER808-01.DLL"))
                            .then((data) => {
                                console.debug(data);
                                impresion_SER109V.ABONOS = 0;
                                for (var i in data.NUMER19[0].TABLARBOS_NUM){
                                    if (data.NUMER19[0].TABLARBOS_NUM[i].VLRABON_NUM.trim() != ''){
                                        impresion_SER109V.ABONOS = impresion_SER109V.ABONOS + parseInt(data.NUMER19[0].TABLARBOS_NUM[i].VLRABON_NUM);
                                    }
                                }
                                impresion_SER109V.NOMTER = data.NUMER19[0].DESCRIP_NUM;
                                impresion_SER109V.NITTER = data.NUMER19[0].NIT_NUM;
                                impresion_SER109V.OPERNUM = data.NUMER19[0].OPER_NUM;
                                impresion_SER109V.OPERMODNUM = data.NUMER19[0].OPERMOD_NUM;
                                impresion_SER109V.OPERBLOQNUM = data.NUMER19[0].OPERBLOQ_NUM;
                                impresion_SER109V.ADMINW = localStorage.getItem('Usuario').trim();
                                impresion_SER109V.FECHAIMPRESION = moment().format('YYMMDD');
                                impresion_SER109V.FECHAOPER = moment(data.NUMER19[0].FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                                if (impresion_SER109V.FECHAOPER == 'Invalid date') impresion_SER109V.FECHAOPER = '000000'
                                impresion_SER109V.FECHAMODOPER = moment(data.NUMER19[0].FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                                if (impresion_SER109V.FECHAMODOPER == 'Invalid date') impresion_SER109V.FECHAMODOPER = '000000'
                                impresion_SER109V.FECHARETOPER = moment(data.NUMER19[0].FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                                if (impresion_SER109V.FECHARETOPER == 'Invalid date') impresion_SER109V.FECHARETOPER = '000000'
                                impresion_SER109V.NUMEROENLETRAS = `SON: ${FAC146(impresion_SER109V.TOTAL)}`;
                                impresion_SER109V.VLRTOTAL = impresion_SER109V.TOTAL;
                                impresion_SER109V.SALDO = impresion_SER109V.TOTAL - impresion_SER109V.ABONOS;
                                impresion_SER109V.DIRECCTER = impresion_SER109V.FACTURAS[0].DIRECCTER;
                                impresion_SER109V.TELTER = impresion_SER109V.FACTURAS[0].TELTER;
                                impresion_SER109V.CIUDADTER = impresion_SER109V.FACTURAS[0].CIUDADTER;
                                impresion_SER109V.DESCRIPTAR = impresion_SER109V.FACTURAS[0].DESCRIPTAR;
                                impresion_SER109V.CONTRATONUM = impresion_SER109V.FACTURAS[0].CONTRATONUM;
                                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633){
                                    impresion_SER109V.FIRMA1 = localStorage.getItem('IDUSU')
                                } else {
                                    impresion_SER109V.FIRMA1 = this.SER109V.FIRMAS[0].DATOS_GER.substring(0,10)
                                }
                                impresion_SER109V.IMPRESION = 'SER109V';
                                // SER109E
                                if (prefijoMask_SER109V.value.trim() == 'A' || prefijoMask_SER109V.value.trim() == 'B' || prefijoMask_SER109V.value.trim() == 'D' || prefijoMask_SER109V.value.trim() == 'F' || prefijoMask_SER109V.value.trim() == 'G' || prefijoMask_SER109V.value.trim() == 'H' || prefijoMask_SER109V.value.trim() == 'I' || prefijoMask_SER109V.value.trim() == 'J' || prefijoMask_SER109V.value.trim() == 'K' || prefijoMask_SER109V.value.trim() == 'L' || prefijoMask_SER109V.value.trim() == 'M' || prefijoMask_SER109V.value.trim() == 'N'){
                                    impresion_SER109V.FORMATOTABLA = 1;
                                    impresion_SER109V.COLUMNAS = ['NROCOMP','FECHA','CONCEPTO','EDAD','SEXO','DETALLE','CANT','VALOR','COPAGO','AUTOR','CODIGO','ESPEC'];
                                    impresion_SER109V.WIDTH = [ '5%', '8%', '19%', '5%', '4%', '25%', '3%','8%', '8%', '4%', '8%','3%' ];
                                    impresion_SER109V.MASIVO = true;
                                    _impresionformatoSER109(impresion_SER109V)
                                } else {
                                    // SER109P9
                                    impresion_SER109V.FORMATOTABLA = 9;
                                    impresion_SER109V.COLUMNAS = ['NROCOMP','FECHA','CONCEPTO','CANT','VALOR_UNIT','VALOR','CODIGO','AUTOR','NOMBREESPEC'];
                                    impresion_SER109V.WIDTH = [ '5%', '8%', '19%', '3%', '4%', '4%','8%', '4%', '15%' ];
                                    impresion_SER109V.MASIVO = true;
                                    _impresionformatoSER109(impresion_SER109V)
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                CON851('','Ha ocurrido un error en la impresion',null,'error','Error');
                            });
                    }
                    CON851('','Proceso Finalizado',_toggleNav(),'success','Exito');
                })
                .catch((error) => {
                    console.error(error);
                    this._evaluarfacturaoriginal_SER109V();
                });
        }, 

        // _datosimpresion_SER109V() {
        //     console.log('IMPRESION SER109V')
        //     let URL = get_url("APP/SALUD/SER109V.DLL");
        //     postData({
        //         datosh: datosEnvio() + this.SER109V.LLAVEW + '|'
        //     }, URL)
        //         .then((data) => {
        //             // _impresionformatoSER109(impresion, this._cerrarnumeracion_SER109V, this._evaluarfacturaoriginal_SER109)
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //             CON851('', 'Hubo un error con el cierre', null, 'error', 'Error');
        //             this._evaluarfacturaoriginal_SER109V();
        //         })
        // },
        // _cerrarnumeracion_SER109V() {
        //     console.log('cerrarnumeracion');
        //     if (this.form.estadofactura_SER109V.substring(0, 1) == '0' || this.form.estadofactura_SER109V.substring(0, 1) == '3') {
        //         if (this.SER109V.PREFIJOW == 'A' || this.SER109V.PREFIJOW == 'B' || this.SER109V.PREFIJOW == 'D' || this.SER109V.PREFIJOW == 'F' || this.SER109V.PREFIJOW == 'G' ||
        //             this.SER109V.PREFIJOW == 'H' || this.SER109V.PREFIJOW == 'I' || this.SER109V.PREFIJOW == 'J' || this.SER109V.PREFIJOW == 'K') {
        //             if (this.SER109V.FECHALNK.substring(0, 4) == this.SER109V.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109V.FECHALNK.substring(4, 6) == this.SER109V.NUMERACION.FECHAING_NUM.substring(4, 6)) {
        //                 this._cerrarnumeracion2_SER109V();
        //             } else {
        //                 CON851('3G', '3G', null, 'error', 'Error');
        //                 _toggleNav();
        //             }
        //         } else {
        //             this._cerrarnumeracion2_SER109V();
        //         }
        //     } else {
        //         _toggleNav();
        //     }
        // },
        // _cerrarnumeracion2_SER109V() {
        //     let URL = get_url("APP/SALUD/SAL020I.DLL");
        //     postData({
        //         datosh: datosEnvio() + SER109V.LLAVEW + '|'
        //     }, URL)
        //         .then((data) => {
        //             console.debug(data);
        //             this.SER109V.FECHAULTIMAFACT = data.FECHAULTIMAFACT
        //             this.SER109V.FECHAULTIMAFACT.pop();
        //             this.SER109V.FECHALIMI = '00000000';
        //             if (this.SER109V.FECHAULTIMAFACT != '') { this.SER109V.FECHALIMI = this.SER109V.FECHAULTIMAFACT[this.SER109V.FECHAULTIMAFACT.length - 1] };
        //             if (parseInt(this.SER109V.FECHALIMI) > parseInt(this.SER109V.FECHALNK)) {
        //                 CON851('', 'LA FECHA DEL ULT. COMP > A FECHA DEL MES', null, 'error', 'Error');
        //                 if (this.SER109V.PREFIJOW != 'C' && this.SER109V.PREFIJOW != 'E' && this.SER109V.PREFIJOW != 'Ñ' && this.SER109V.PREFIJOW != 'O' && this.SER109V.PREFIJOW != 'P' && this.SER109V.PREFIJOW != 'T' && this.SER109V.PREFIJOW != 'U') {
        //                     this._ventanacierrefact_SER109V();
        //                 } else {
        //                     _toggleNav();
        //                 }
        //             } else {
        //                 this._ventanacierrefact_SER109V();
        //             }
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //             this._evaluarprefijo_SER109V();
        //         })
        // },

        // _grabarcierre_SER109V() {
        //     let URL = get_url("APP/SALUD/SER109D.DLL");
        //     postData({
        //         datosh: datosEnvio() + '4|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109V.LLAVEW + '| | |' + this.form.estadofactura_SER109V.substring(0, 1) + '| | | | | |' + localStorage.getItem('Usuario').trim() + '| | | |' + SER109V.FECHARETNUM + '|'
        //     }, URL)
        //         .then((data) => {
        //             console.debug(data);
        //             if (this.SER109V.PREFIJOW == 'P' || this.SER109V.PREFIJOW == 'T' || this.SER109V.PREFIJOW == 'Q' || this.SER109V.PREFIJOW == 'V') {
        //                 let URL = get_url("APP/SALUD/SAL020C.DLL");
        //                 postData({
        //                     datosh: datosEnvio() + this.SER109V.LLAVEW + '|' + this.SER109V.FECHALNK + '|'
        //                 }, URL)
        //                     .then((data) => {
        //                         console.debug(data);
        //                         CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
        //                         _toggleNav();
        //                     })
        //                     .catch((error) => {
        //                         console.log(error);
        //                         CON851('', 'Ocurrio un problema contactese con prosoft', null, 'error', 'Error');
        //                         _toggleNav();
        //                     })
        //             } else {
        //                 let URL = get_url("APP/SALUD/SAL020B.DLL");
        //                 postData({
        //                     datosh: datosEnvio() + SER109V.LLAVEW + '|' + SER109V.FECHALNK + '|'
        //                 }, URL)
        //                     .then((data) => {
        //                         console.debug(data);
        //                         CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
        //                         _toggleNav();
        //                     })
        //                     .catch((error) => {
        //                         console.log(error);
        //                         CON851('', 'Ocurrio un problema contactese con prosoft', null, 'error', 'Error');
        //                         _toggleNav();
        //                     })
        //             }
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //             CON851('', 'Hubo un error con el cierre', null, 'error', 'Error');
        //             this._evaluarprefijo_SER109V();
        //         })
        // },
        _f8cliente_SER109V() {
            var $_this = this;
            _ventanaDatos_lite_v2({
                titulo: "VENTANA DE TERCEROS",
                data: $_this.SER109V.TERCEROS,
                indice: ["COD", "NOMBRE", "CIUDAD", "ACT"],
                mascara: [
                    {
                        COD: "Identificacion",
                        NOMBRE: "Nombre",
                        DIRREC: "direccion",
                        TELEF: "telefono",
                    },
                ],
                minLength: 3,
                callback_esc: function () {
                    $(".cliente_SER109V").focus();
                },
                callback: function (data) {
                    $_this.form.cliente_SER109V = data.COD
                    _enterInput(".cliente_SER109V");
                },
            });

        },
        _f8ciudad_SER109V() {
            var $_this = this;
            _ventanaDatos({
                titulo: "VENTANA DE CONSULTA DE CIUDADES",
                columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
                data: $_this.SER109V.CIUDAD,
                callback_esc: function () {
                    $(".ciudad_SER109V").focus();
                },
                callback: function (data) {
                    $_this.form.ciudad_SER109V = data.COD.trim();
                    _enterInput(".ciudad_SER109V");
                },
            });
        },
        _f8numerodesde_SER109V(e){
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                parametros = {
                    dll: 'NUMERACION',
                    valoresselect: ['Nombre del tercero', 'buscar paciente'],
                    f8data: 'NUMERACION',
                    columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                    fecha: '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0,4) + '00',
                    prefijo: prefijoMask_SER109V.value.trim(),
                    callback: (data) => {
                        this.form.numerohasta_SER109V = data.COD.substring(1, 7);
                        _enterInput('.numerodesde_SER109V');
                    },
                    cancel: () => {
                        $(".numerodesde_SER109V").focus();
                    }
                };
                F8LITE(parametros);
            }
        },
        _f8numerohasta_SER109V(e){
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                parametros = {
                    dll: 'NUMERACION',
                    valoresselect: ['Nombre del tercero', 'buscar paciente'],
                    f8data: 'NUMERACION',
                    columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                    filtro: $_PREFIJOFACT.toUpperCase().trim(),
                    fecha: '20' + $_ANOLNK + $_MESLNK + '00',
                    prefijo: $_PREFIJOFACT,
                    callback: (data) => {
                        this.form.numerohasta_SER109V = data.COD.substring(1, 7);
                        _enterInput('.numerodesde_SER109V');
                    },
                    cancel: () => {
                        $(".numerodesde_SER109V").focus();
                    }
                };
                F8LITE(parametros);
            }
        }
    }
})

////////////////////mascaras///////////////////////////
var porcentcopagoMask_SER109V = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true,
});

var prefijoMask_SER109V = IMask($('#prefijo_SER109V')[0], {
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

var bloqueoMask_SER109V = IMask($('#bloquearfactura_SER109V')[0], {
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
var discriminardrogMask_SER109V = IMask($('#discriminardro_SER109V')[0], {
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
var subtotalMask_SER109V = IMask($('#subtotalcomp_SER109V')[0], {
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


var facturaoriginalMask_SER109V = IMask($('#facturaoriginal_SER109V')[0], {
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





