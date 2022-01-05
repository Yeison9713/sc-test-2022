// // 01-09-2020 DIANA E: creado 
moment.locale('es')
var fecha_SER109B1 = IMask.createPipe({
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
    el: "#SER109B1",
    data: {
        SER109B1: [],
        form: {
            numeroprefijo_SER109B1: "",
            entidad_SER109B1: "",
            nombrepaciente_SER109B1: "",
            estadofactura_SER109B1: "",
            fechafactura_SER109B1: "",
            operbloq_SER109B1: "",
            observacion_SER109B1: "",
            anexos_SER109B1: "",
            fechafacturaano_SER109B1: "",
            fechafacturames_SER109B1: "",
            fechafacturadia_SER109B1: "",
            valorsalmin_SER109B1: "",
            topepoliza_SER109B1: "",
            totalfact_SER109B1: "",
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        this.SER109B1.PREFIJOW = 'A';
        this.SER109B1.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        this.SER109B1.PUCUSU = $_USUA_GLOBAL[0].PUC;
        this.SER109B1.NITUSU = $_USUA_GLOBAL[0].NIT;
        this.SER109B1.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;

        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER109B1.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER109B1.FIRMAS = data;
                $_this._evaluarinicio_SER109B1();
            })
        })
    },
    methods: {
        _evaluarinicio_SER109B1() {
            let OPCIONES = new Object;
            OPCIONES = {
                '09743G': this._mostrarcajasopc_SER109B1,
                '09743K': this._mostrarcajasopc_SER109B1,
            }
            let active = $('#navegacion').find('li.opcion-menu.active');
            SER109B1.OPCIONACTIVA = active[0].attributes[2].nodeValue;
            let Nombreopcion = {
                '09743G': '9,7,4,3,G - Imprimir fact. orden de salida',
                '09743K': '9,7,4,3,K - Imprimir fact. de medicamentos',
            }
            nombreOpcion(Nombreopcion[SER109B1.OPCIONACTIVA]);
            let opcion = new Function();
            opcion = OPCIONES[active[0].attributes[2].nodeValue];
            opcion();
        },
        _mostrarcajasopc_SER109B1() {
            if (SER109B1.OPCIONACTIVA == '09743G') {
                console.log('9743G')
                $("#VALIDAR6_SER109B1").removeClass("hidden");
                $("#VALIDAR7_SER109B1").removeClass("hidden");
                $("#VALIDAR8_SER109B1").removeClass("hidden");
                $("#VALIDAR9_SER109B1").removeClass("hidden");
                $("#VALIDAR10_SER109B1").removeClass("hidden");
                $("#VALIDAR11_SER109B1").removeClass("hidden");
            } else {
                console.log('9743K')
                $("#VALIDAR6_SER109B1").removeClass("hidden");
                $("#VALIDAR7_SER109B1").removeClass("hidden");
                $("#VALIDAR8_SER109B1").removeClass("hidden");
                $("#VALIDAR9_SER109B1").removeClass("hidden");
                $("#VALIDAR11_SER109B1").removeClass("hidden");
            }
            this._evaluarprefijo_SER109B1()
        },
        _evaluarprefijo_SER109B1() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER109B1',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER109B1.PREFIJOW = prefijoMask_SER109B1.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER109B1.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER109B1 = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER109B1();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER109B1() {
            console.log('numero prefijo')
            validarInputs({
                form: '#VALIDAR2_SER109B1',
                orden: '1'
            },
                this._evaluarprefijo_SER109B1,
                () => {
                    this.SER109B1.LLAVEW = this.SER109B1.PREFIJOW + this.form.numeroprefijo_SER109B1.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER109B1.LLAVEW }, this._validarfactura_SER109B1, this._evaluarnumeroprefijo_SER109B1)
                }
            )
        },
        _validarfactura_SER109B1(data1, data2) {
            console.log(data1, data2, 'VALLIDAR FACT',)
            this.SER109B1.NUMERACION = data1;
            if (this.SER109B1.NUMERACION.TIPOPACI_NUM == "X") this.SER109B1.NUMERACION.TIPOPACI_NUM == '*';
            this.SER109B1.FECHAPRENUM = this.SER109B1.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER109B1 = this.SER109B1.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER109B1 = this.SER109B1.NUMERACION.NOMBREPAC_NUM.trim();
            let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
            this.form.estadofactura_SER109B1 = this.SER109B1.NUMERACION.ESTADO_NUM + ' - ' + estado[this.SER109B1.NUMERACION.ESTADO_NUM];
            if (this.SER109B1.NUMERACION.ESTADO_NUM == '0' || this.SER109B1.NUMERACION.ESTADO_NUM == '1') {
                $('#FECHARET_SER109B1').removeClass('hidden');
                this.form.fechafactura_SER109B1 = fecha_SER109B1(this.SER109B1.NUMERACION.FECHARET_NUM)
            } else {
                $('#OPERBLOQ_SER109B1').removeClass('hidden');
                this.form.operbloq_SER109B1 = this.SER109B1.NUMERACION.OPERBLOQ_NUM
            }
            this.form.observacion_SER109B1 = this.SER109B1.NUMERACION.OBSERV_NUM.trim()
            this.form.anexos_SER109B1 = this.SER109B1.NUMERACION.ANEXOS_NUM.trim()
            this.SER109B1.ANOINGNUM = this.SER109B1.NUMERACION.FECHAING_NUM.substring(0, 4)
            if (parseInt(this.SER109B1.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(this.SER109B1.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER109B1 = this.SER109B1.NUMERACION.FECHARET_NUM.substring(0, 4)
                    this.form.fechafacturames_SER109B1 = this.SER109B1.NUMERACION.FECHARET_NUM.substring(4, 6)
                    this.form.fechafacturadia_SER109B1 = this.SER109B1.NUMERACION.FECHARET_NUM.substring(6, 8)
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    this.form.fechafacturaano_SER109B1 = fechaactual.substring(0, 4)
                    this.form.fechafacturames_SER109B1 = fechaactual.substring(4, 6)
                    this.form.fechafacturadia_SER109B1 = fechaactual.substring(6, 8)
                }
            } else {
                this.form.fechafacturaano_SER109B1 = this.SER109B1.NUMERACION.FECHAPRE_NUM.substring(0, 4)
                this.form.fechafacturames_SER109B1 = this.SER109B1.NUMERACION.FECHAPRE_NUM.substring(4, 6)
                this.form.fechafacturadia_SER109B1 = this.SER109B1.NUMERACION.FECHAPRE_NUM.substring(6, 8)
            }
            if (this.SER109B1.PREFIJOW == 'T') {
                // if(data2)
                this.SER109B1.VALORES = data2
                $('#VALORESCARTERA_109F').removeClass('hidden');
                this.form.valorsalmin_SER109B1 = this.SER109B1.VALORES.SALMIN
                this.form.topepoliza_SER109B1 = this.SER109B1.VALORES.TOPE
                this.form.totalfact_SER109B1 = this.SER109B1.VALORES.TOTAL
            }
            this._afectarnumeracion_SER109B1()
        },
        _afectarnumeracion_SER109B1() {
            console.log('afctar numeracion')
            if (this.SER109B1.NUMERACION.ESTADO_NUM == '0' || this.SER109B1.NUMERACION.ESTADO_NUM == '3') {
                this._evaluarobservaciones_SER109B1('1')
            } else {
                this._evaluarfechaimpresion_SER109B1('1')
            }
        },
        _evaluarobservaciones_SER109B1(orden) {
            console.log('observaciones', orden)
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR3_SER109B1',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER109B1() },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER109B1 = this.form.observacion_SER109B1.toUpperCase();
                    this.form.anexos_SER109B1 = this.form.anexos_SER109B1.toUpperCase();
                    if (this.form.estadofactura_SER109B1.substring(0, 1) == '3' || this.form.estadofactura_SER109B1.substring(0, 1) == '0') {
                        this._evaluarbloqueofactura_SER109B1()
                    } else {
                        this._evaluarfechaimpresion_SER109B1('1');
                    }
                }
            )
        },
        _evaluarbloqueofactura_SER109B1() {
            _FloatText({ estado: 'off' })
            if (this.form.estadofactura_SER109B1.substring(0, 1) == '3') {
                this._grabarnumeracion_SER109B1()
            } else {
                bloqueoMask_SER109B1.typedValue = 'N'
                validarInputs({
                    form: '#VALIDAR4_SER109B1',
                    orden: '1'
                },
                    () => { this._evaluarobservaciones_SER109B1('2') },
                    () => {
                        if (bloqueoMask_SER109B1.value.trim() == '') bloqueoMask_SER109B1.typedValue = 'N'
                        if (bloqueoMask_SER109B1.value == 'S') this.form.estadofactura_SER109B1 = '3', this.form.operbloq_SER109B1 = localStorage.getItem('Usuario').trim();
                        this._grabarnumeracion_SER109B1()
                    }
                )
            }
        },
        _grabarnumeracion_SER109B1() {
            if (this.form.observacion_SER109B1.trim() != this.SER109B1.NUMERACION.OBSERV_NUM.trim() || this.form.anexos_SER109B1.trim() != this.SER109B1.NUMERACION.ANEXOS_NUM.trim() || this.form.estadofactura_SER109B1.substring(0, 1) != this.SER109B1.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109B1.LLAVEW + '|' + this.form.observacion_SER109B1 + '|' + this.form.anexos_SER109B1 + '|' + this.form.estadofactura_SER109B1.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarfechaimpresion_SER109B1('1')
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarbloqueofactura_SER109B1();
                        }
                    })
            } else {
                this._evaluarfechaimpresion_SER109B1('1')
            }
        },
        _evaluarfechaimpresion_SER109B1(orden) {
            validarInputs({
                form: '#VALIDAR5_SER109B1',
                orden: orden,
            },
                this._evaluarbloqueofactura_SER109B1,
                () => {
                    this.SER109B1.FECHA = this.form.fechafacturaano_SER109B1 + this.form.fechafacturames_SER109B1.padStart(2, '0') + this.form.fechafacturadia_SER109B1.padStart(2, '0')
                    this.SER109B1.ANONUM = this.SER109B1.FECHA.substring(4, 6)
                    this._evaluardiscriminardrog_SER109B1()
                }
            )
        },
        _evaluardiscriminardrog_SER109B1() {
            discriminardrogMask_SER109B1.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR6_SER109B1',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109B1('1') },
                () => {
                    if (discriminardrogMask_SER109B1.value.trim() == '') discriminardrogMask_SER109B1.typedValue = 'N';
                    this._evaluarnrocomprob_SER109B1()
                }
            )
        },
        _evaluarnrocomprob_SER109B1() {
            mostrarnrodrogMask_SER109B1.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR7_SER109B1',
                orden: '1',
            },
                () => { this._evaluardiscriminardrog_SER109B1() },
                () => {
                    if (mostrarnrodrogMask_SER109B1.value.trim() == '') mostrarnrodrogMask_SER109B1.typedValue = 'N';
                    this._evaluarmostrarfechacomp_SER109B1()
                }
            )
        },
        _evaluarmostrarfechacomp_SER109B1() {
            mostrarfechacompMask_SER109B1.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR8_SER109B1',
                orden: '1',
            },
                () => { this._evaluarnrocomprob_SER109B1() },
                () => {
                    if (mostrarfechacompMask_SER109B1.value.trim() == '') mostrarfechacompMask_SER109B1.typedValue = 'N';
                    this._evaluarfechacomp_SER109B1()
                }
            )
        },
        _evaluarfechacomp_SER109B1() {
            cambiarfechacompMask_SER109B1.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR9_SER109B1',
                orden: '1',
            },
                () => { this._evaluarmostrarfechacomp_SER109B1() },
                () => {
                    if (cambiarfechacompMask_SER109B1.value.trim() == '') cambiarfechacompMask_SER109B1.typedValue = 'N';
                    this._evaluarfiltrosimpresion_SER109B1()
                }
            )
        },
        _evaluarfiltrosimpresion_SER109B1() {
            console.log('FILTROS DE IMPRESION')
            if (SER109B1.OPCIONACTIVA == '09743G') {
                let URL = get_url("APP/SALUD/SER109B1.DLL");
                postData({
                    datosh: datosEnvio() + this.SER109B1.LLAVEW + '|' + discriminardrogMask_SER109B1.value + '|' + mostrarnrodrogMask_SER109B1.value + '|' + mostrarfechacompMask_SER109B1.value + '|' + cambiarfechacompMask_SER109B1.value + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'SER109B1')
                        this.SER109B1.FACTURAS1 = data.FACTURA;
                        this.SER109B1.FACTURAS1.pop()
                        this._evaluartotalboleta_SER109B1()
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '08') {
                            $('#VACIA_SER109B1').removeClass('hidden');
                            facturavaciaMask_SER109B1.typedValue = 'N';
                            this._evaluarimprimirvacia_SER109B1();
                        } else {
                            console.error(error);
                            CON851('', 'Hubo un error con el cierre', this._evaluarfechacomp_SER109B1(), 'error', 'Error');
                        }
                    })
            } else {
                ///////////SER109AB- 9743K///////////////
                let URL = get_url("APP/SALUD/SER109AB.DLL");
                postData({
                    datosh: datosEnvio() + this.SER109B1.LLAVEW + '|' + discriminardrogMask_SER109B1.value + '|' + mostrarnrodrogMask_SER109B1.value + '|' + mostrarfechacompMask_SER109B1.value + '|' + cambiarfechacompMask_SER109B1.value + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'SER109AB')
                        this.SER109B1.FACTURAS2 = data.FACTURA;
                        this.SER109B1.FACTURAS2.pop()
                        this._evaluarlistarmedico_SER109B1()
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '08') {
                            $('#VACIA_SER109B1').removeClass('hidden');
                            facturavaciaMask_SER109B1.typedValue = 'N';
                            this._evaluarimprimirvacia_SER109B1();
                        } else {
                            console.error(error);
                            CON851('', 'Hubo un error con el cierre', this._evaluarfechacomp_SER109B1(), 'error', 'Error');
                        }
                    })
            }
        },
        _evaluarimprimirvacia_SER109B1() {
            validarInputs({
                form: '#VALIDAR15_SER109B1',
                orden: '1'
            },
                () => { this._evaluarfechacomp_SER109B1() },
                () => {
                    if (facturavaciaMask_SER109B1.value.trim() == '') facturavaciaMask_SER109B1.typedValue = 'N'
                    if (facturavaciaMask_SER109B1 == 'S') {
                        console.log('IMPRESION EN BLANCO')
                        this._datosimpresion_SER109B1()
                    } else {
                        _toggleNav()
                    }

                }
            )
        },
        _evaluartotalboleta_SER109B1() {
            totalboletaMask_SER109B1.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR10_SER109B1',
                orden: '1',
            },
                () => { this._evaluarfechacomp_SER109B1() },
                () => {
                    if (totalboletaMask_SER109B1.value.trim() == '') totalboletaMask_SER109B1.typedValue = 'N';
                    if ($_USUA_GLOBAL[0].NIT == 900264583) {
                        listarmedicoMask_SER109B1.typedValue = 'S';
                    } else {
                        listarmedicoMask_SER109B1.typedValue = 'N';
                    }
                    this._evaluarlistarmedico_SER109B1()
                }
            )
        },
        _evaluarlistarmedico_SER109B1() {
            validarInputs({
                form: '#VALIDAR11_SER109B1',
                orden: '1',
            },
                () => { _evaluarfechacomp_SER109B1() },
                () => {
                    if (listarmedicoMask_SER109B1.value.trim() == '') listarmedicoMask_SER109B1.typedValue = 'N';
                    this._evaluarcupssoat_SER109B1()
                }
            )
        },
        _evaluarcupssoat_SER109B1() {
            if ($_USUA_GLOBAL[0].NIT == 845000038) {
                $("#VALIDAR12_SER109B1").removeClass("hidden");
                cupssoatMask_SER109B1.typedValue = 'N';
                validarInputs({
                    form: '#VALIDAR12_SER109B1',
                    orden: '1',
                },
                    () => { this._evaluarlistarmedico_SER109B1() },
                    () => {
                        if (cupssoatMask_SER109B1.value.trim() == '') cupssoatMask_SER109B1.typedValue = 'N';
                        this._evaluarfacturaoriginal_SER109B1()
                    }
                )
            } else if ($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 900405505) {
                console.log('SERVI')
                $("#VALIDAR13_SER109B1").removeClass("hidden");
                fechaserviMask_SER109B1.typedValue = 'N';
                validarInputs({
                    form: '#VALIDAR13_SER109B1',
                    orden: '1',
                },
                    () => { this._evaluarlistarmedico_SER109B1() },
                    () => {
                        if (fechaserviMask_SER109B1.value.trim() == '') fechaserviMask_SER109B1.typedValue = 'N';
                        this._evaluarfacturaoriginal_SER109B1()
                    }
                )
            } else {
                this._evaluarfacturaoriginal_SER109B1()
            }
        },

        _evaluarfacturaoriginal_SER109B1() {
            console.log('FACTURA ORIGINAL')
            validarInputs({
                form: '#VALIDAR14_SER109B1',
                orden: '1',
            },
                () => { this._evaluarlistarmedico_SER109B1() },
                () => {
                    if (facturaoriginalMask_SER109B1.value.trim() == '') facturaoriginalMask_SER109B1.typedValue = 'N';
                    this.SER109B1.SWORIGINALN = facturaoriginalMask_SER109B1.value;
                    if (parseFloat(this.SER109B1.NUMERACION.PORCECOPAGO_NUM) > 0 && (this.SER109B1.PREFIJOW == 'P' || this.SER109B1.PREFIJOW == 'T' || this.SER109B1.PREFIJOW == 'O' || this.SER109B1.PREFIJOW == 'Q' || this.SER109B1.PREFIJOW == 'R' || this.SER109B1.PREFIJOW == 'U' || this.SER109B1.PREFIJOW == 'V' || this.SER109B1.PREFIJOW == 'W' || this.SER109B1.PREFIJOW == 'X' || this.SER109B1.PREFIJOW == 'Y' || this.SER109B1.PREFIJOW == 'Z')) {
                        if (this.form.estadofactura_SER109B1.substring(0, 1) == '0' || this.form.estadofactura_SER109B1.substring(0, 1) == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER109B1.LLAVEW + '|' + this.SER109.NUMERACION.IDPAC_NUM + '|' + this.SER109.NUMERACION.DESCRIP_PACI.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER109B1.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    this._ventanacopagos_SER109B1();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109B1();
                                });
                        }
                    } else {
                        this._datosimpresion_SER109B1();
                    }
                }
            )
        },
        _ventanacopagos_SER109B1() {
            $_this = this
            var ventanacierre_SER109B1 = bootbox.dialog({
                size: 'medium',
                title: 'LIQUIDACION DE COPAGOS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "% COPAGO:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1VENTANACOPAGO_SER109B1"> ' +
                    '<input id="porcentcopago_SER109B1" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="4"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR2VENTANACOPAGO_SER109B1"> ' +
                    '<input id="montocopago_SER109B1" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "COPAGOS ACUMULADOS :" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<input id="copagoacumulado_SER109B1" class="form-control col-md-12 col-sm-12 col-xs-12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanacierre_SER109B1.off('show.bs.modal');
                            setTimeout(() => { $_this._datosimpresion_SER109B1() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanacierre_SER109B1.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarfacturaoriginal_SER109B1('1') }, 500)

                        }
                    }
                }
            });
            ventanacierre_SER109B1.init($('.modal-footer').hide());
            ventanacierre_SER109B1.init(this._evaluarporcentcopago_SER109B1());
            ventanacierre_SER109B1.on('shown.bs.modal', function () {
                $("#porcentcopago_SER109B1").focus();
            });
        },
        _evaluarporcentcopago_SER109B1() {
            _inputControl('disabled');
            this.SER109B1.COPAGOESTW = this.SER109B1.NUMERACION.COPAGO_NUM;
            this.SER109B1.PORCECOPAGOW = this.SER109B1.NUMERACION.PORCECOPAGO_NUM;
            $('#porcentcopago_SER109B1').val(this.SER109B1.PORCECOPAGOW.trim());
            $('#copagoacumulado_SER109B1').val(this.SER109B1.COPAGOSACUMW);
            validarInputs({
                form: '#VALIDAR1VENTANACOPAGO_SER109B1',
                orden: '1',
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER109B1.PORCECOPAGOW = porcentcopagoMask_SER109B1($('#porcentcopago_SER109B1').val().replace(',', '.'));
                    if (parseInt(this.SER109B1.PORCECOPAGOW) == 0) {
                        this.SER109B1.COPAGOESTW = 0
                        this._validarcopago_SER109B1();
                    } else if (parseInt(this.SER109B1.PORCECOPAGOW) > 100) {
                        CON851('', 'Revise el valor del porcentaje', this._evaluarporcentcopago_SER109B1(), 'error', 'Error');
                    } else {
                        if (parseFloat(this.SER109B1.PORCECOPAGOW) == 9) {
                            this._evaluarcopagoest_SER109B1();
                        } else {
                            this.SER109B1.COPAGOESTW = parseInt((this.SER109B1.TOTBASECOPAGO * this.SER109B1.PORCECOPAGOW) / 100)
                            this._validarcopago_SER109B1();
                        }
                    }
                }
            )
        },
        _evaluarcopagoest_SER109B1() {
            validarInputs({
                form: '#VALIDAR2VENTANACOPAGO_SER109B1',
                orden: '1',
            },
                this._evaluarporcentcopago_SER109B1,
                () => {
                    this.SER109B1.COPAGOESTW = $('#montocopago_SER109B1').val();
                    if (isNumeric(this.SER109B1.COPAGOESTW)) {
                        this._validarcopago_SER109B1();
                    } else {
                        CON851('', 'Revise el valor digitado', this._evaluarcopagoest_SER109B1(), 'error', 'Error');
                    }
                }
            )
        },
        _validarcopago_SER109B1() {
            if (this.SER109B1.NUMERACION.ESTRATO_PACI != '1' && this.SER109B1.NUMERACION.ESTRATO_PACI != '2' && this.NUMERACION.ESTRATO_PACI != '3') {
                this.SER109B1.NUMERACION.ESTRATO_PACI = '3'
            }
            switch (this.SER109B1.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER109B1.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER109B1.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER109B1.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 115) / 100
                            break;
                        case '3':
                            this.SER109B1.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER109B1.COPALIQMESW = (this.SER109B1.TOTBASECOPAGO * 10) / 100
                    break;
            }
            switch (this.SER109B1.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER109B1.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER109B1.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER109B1.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                        case '3':
                            this.SER109B1.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 460) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER109B1.COPALIQANOW = parseFloat($_USUA_GLOBAL[0].SAL_MIN) / 2
                    if (this.SER109B1.COPALIQMESW > this.SER109B1.COPALIQANOW) {
                        this.SER109B1.COPALIQMESW = this.SER109B1.COPALIQANOW;
                    }
                    break;
            }
            if (this.SER109B1.COPAGOESTW != this.SER109B1.NUMERACION.COPAGO_NUM || this.SER109B1.PORCECOPAGOW != this.SER109B1.NUMERACION.PORCECOPAGO_NUM) {
                postData({
                    datosh: datosEnvio() + this.SER109B1.LLAVEW + '|' + this.SER109B1.PORCECOPAGOW.replace('.', '').padStart(4, '0') + '|' + this.SER109B1.COPAGOESTW + '|'
                }, get_url("APP/SALUD/SER109A.DLL"))
                    .then((data) => {
                        console.debug(data);
                        this.SER109B1.NUMERACION.COPAGO_NUM = this.SER109B1.COPAGOESTW;
                        this.SER109B1.NUMERACION.PORCECOPAGO_NUM = this.SER109B1.PORCECOPAGOW;
                        $('.btn-primary').click()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                $('.btn-primary').click()
            }
        },
        _datosimpresion_SER109B1() {

            if (SER109B1.OPCIONACTIVA == '09743G') {
                console.log('IMPRESION SER109B1', 'PENDIENTE LISTAR NOMBRE DEL MEDICO')
                let impresion = new Object;
                impresion.FORMATOTABLA = 1;
                impresion.TARIF = 1;
                impresion.OBSERVACION = 2;
                impresion.ANEXO = 2;
                impresion.FIRMA = 1;
                impresion.MARGIN = [10, 160, 10, 20];
                impresion.WIDTH = ['5%', '8%', '19%', '5%', '4%', '25%', '3%', '8%', '8%', '5%', '8%'];
                impresion.COLUMNAS = ["COMP", "FECHA", "DETALLE", "EDAD", "SEXO", "CONCEPTO", "CANT", "VALOR", "COPAGO", "NRO_AUTOR", "ARTICULO"];
                if (listarmedicoMask_SER109B1.value == 'S') {
                    impresion.estilohoja = 2, impresion.FORMATOTABLA = 5
                    impresion.WIDTH = ['5%', '6%', '17%', '4%', '4%', '20%', '4%', '7%', '7%', '5%', '5%', '6%', '11%'];
                    impresion.COLUMNAS = ["COMP", "FECHA", "DETALLE", "EDAD", "SEXO", "CONCEPTO", "CANT", "VALOR", "ARTICULO", "CUM","NRO_AUTOR", "COPAGO", "NOMBRE_MED"];
                }

                if (facturaoriginalMask_SER109B1.value.trim() == 'S') impresion.ORIGINAL = '***ORIGINAL***'
                else impresion.ORIGINAL = '***COPIA***'
                impresion.FECHAVENCE = moment(this.SER109B1.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
                impresion.FECHA = moment(this.SER109B1.FECHA).format('MMMM DD YYYY').toUpperCase();
                impresion.FECHAVENCE = moment(this.SER109B1.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
                impresion.FECHA = moment(this.SER109B1.FECHA).format('MMMM DD YYYY').toUpperCase();
                impresion.LLAVE = this.SER109B1.LLAVEW;
                impresion.NOMTER = this.SER109B1.NUMERACION.DESCRIP_TER;
                impresion.NITTER = this.SER109B1.NUMERACION.NIT_TER;
                impresion.DVTER = this.SER109B1.NUMERACION.DV_TER;
                impresion.DIRECCTER = this.SER109B1.NUMERACION.DIRECC_TER;
                impresion.TELTER = this.SER109B1.NUMERACION.TEL_TER;
                impresion.CIUDADTER = this.SER109B1.NUMERACION.CIUDAD_TER;
                impresion.DESCRIPTAR = this.SER109B1.NUMERACION.CONVENIO_NUM;
                impresion.REGIMEN = this.SER109B1.FACTURAS1[0].CUENTA;
                let tipo = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR ', 'O': 'OTRO TIPOP', 'D': 'DESP. CONT', 'E': 'DESP. SUBS', 'F': 'DESP. VINC' };
                if (tipo == undefined) impresion.TIPOPACI = '';
                impresion.TIPOPACI = tipo[this.SER109B1.NUMERACION.TIPOPACI_NUM]
                impresion.FACTURAS = this.SER109B1.FACTURAS1;
                impresion.TABLARBOS_NUM = this.SER109B1.NUMERACION.TABLARBOS_NUM.filter(x => parseInt(x.VLRABON_NUM) > 0);
                impresion.OBSERVNUM = this.SER109B1.NUMERACION.OBSERV_NUM;
                impresion.ANEXOSNUM = this.SER109B1.NUMERACION.ANEXOS_NUM;
                impresion.OPERBLOQNUM = this.SER109B1.NUMERACION.OPERBLOQ_NUM;
                impresion.OPERNUM = this.SER109B1.NUMERACION.OPER_NUM;
                impresion.ADMINW = localStorage.getItem('Usuario');
                impresion.FECHAIMPRESION = moment().format('YYMMDD');
                impresion.FECHAOPER = moment(this.SER109B1.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion.FECHAOPER == 'Invalid date') impresion.FECHAOPER = '000000'
                impresion.FECHAMODOPER = moment(this.SER109B1.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion.FECHAMODOPER == 'Invalid date') impresion.FECHAMODOPER = '000000'
                impresion.FECHARETOPER = moment(this.SER109B1.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion.FECHARETOPER == 'Invalid date') impresion.FECHARETOPER = '000000'
                impresion.IDPACNUM = this.SER109B1.NUMERACION.IDPAC_NUM;
                impresion.NOMBREPACNUM = this.SER109B1.NUMERACION.NOMBREPAC_NUM;
                if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                        impresion.IVA = 'IVA Regimen Comun - Retenedor Iva'
                    } else {
                        impresion.IVA = 'IVA Regimen Comun'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                        impresion.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                    } else {
                        impresion.IVA = 'IVA Regimen Simplificado'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
                    impresion.IVA = 'No somos responsables de IVA'
                } else {
                    impresion.IVA = '';
                }
                impresion.TABLARBOS_NUM = this.SER109B1.NUMERACION.TABLARBOS_NUM;
                let prefijo = this.SER109B1.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == this.SER109B1.PREFIJOW)
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = this.SER109B1.PREFIJOW;
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                var vlr = 0;
                for (var i in this.SER109B1.FACTURAS1) {
                    vlr = vlr + parseInt(this.SER109B1.FACTURAS1[i].VALOR.replace(/,/g, ''));
                }
                var abono = 0;
                for (var i in this.SER109B1.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109B1.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM != '') {
                        abono = parseInt(this.SER109B1.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.replace(/,/g, '')) + abono;
                    }
                }
                var saldocopago = 0;
                if ($_USUA_GLOBAL[0] == 891855847) {
                    saldocopago = 0;
                } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER109B1.NUMERACION.NIT_NUM) == 9990 || parseInt(this.SER109B1.NUMERACION.NIT_NUM) == 9999) && (parseInt(this.SER109B1.NUMERACION.FECHA_ING) > 20070930)) {
                    saldocopago = parseInt(this.SER109B1.NUMERACION.CO_PAGO_NUM) + abono
                } else {
                    if (abono != 0) {
                        saldocopago = 0
                    } else {
                        saldocopago = parseInt(this.SER109B1.NUMERACION.CO_PAGO_NUM);
                    }
                }
                let neto = vlr - saldocopago;
                impresion.VLRTOTAL = vlr;
                impresion.SALDOCOPAGO = saldocopago;
                impresion.SALDO = neto;
                impresion.PREFIJO = prefijo;
                impresion.TOTCOPAGO = parseInt(this.SER109B1.NUMERACION.CO_PAGO_NUM)
                impresion.IMPRESION = 'SER109W';
                let valorenletras = FAC146(impresion.VLRTOTAL);
                impresion.NUMEROENLETRAS = 'SON: ' + valorenletras;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion.FIRMA1 = this.SER109B1.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                _impresionformatoSER109(impresion, this._cerrarnumeracion_SER109B1, this._evaluarfacturaoriginal_SER109B1)
            } else {
                console.log(this.SER109B1.NUMERACION);
                let impresion = new Object;
                if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                        impresion.IVA = 'IVA Regimen Comun - Retenedor Iva'
                    } else {
                        impresion.IVA = 'IVA Regimen Comun'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                    if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                        impresion.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                    } else {
                        impresion.IVA = 'IVA Regimen Simplificado'
                    }
                } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
                    impresion.IVA = 'No somos responsables de IVA'
                } else {
                    impresion.IVA = '';
                }
                impresion.estilohoja = '2';
                if (facturaoriginalMask_SER109B1.value.trim() == 'S') impresion.ORIGINAL = '***ORIGINAL***'
                else impresion.ORIGINAL = '***COPIA***'
                impresion.FECHAVENCE = moment(this.SER109B1.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
                impresion.FECHA = moment(this.SER109B1.FECHA).format('MMMM DD YYYY').toUpperCase();
                impresion.LLAVE = this.SER109B1.LLAVEW;
                impresion.NOMTER = this.SER109B1.NUMERACION.DESCRIP_TER;
                impresion.NITTER = this.SER109B1.NUMERACION.NIT_TER;
                impresion.DVTER = this.SER109B1.NUMERACION.DV_TER;
                impresion.DIRECCTER = this.SER109B1.NUMERACION.DIRECC_TER;
                impresion.TELTER = this.SER109B1.NUMERACION.TEL_TER;
                impresion.CIUDADTER = this.SER109B1.NUMERACION.CIUDAD_TER;
                impresion.DESCRIPTAR = this.SER109B1.NUMERACION.CONVENIO_NUM;
                impresion.REGIMEN = ' ';
                impresion.FACTURAS = this.SER109B1.FACTURAS2;
                let tipo = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR ', 'O': 'OTRO TIPOP', 'D': 'DESP. CONT', 'E': 'DESP. SUBS', 'F': 'DESP. VINC' };
                if (tipo == undefined) impresion.TIPOPACI = '';
                impresion.TIPOPACI = tipo[this.SER109B1.NUMERACION.TIPOPACI_NUM];
                impresion.TABLARBOS_NUM = this.SER109B1.NUMERACION.TABLARBOS_NUM.filter(x => parseInt(x.VLRABON_NUM) > 0);
                impresion.OBSERVNUM = this.SER109B1.NUMERACION.OBSERV_NUM;
                impresion.ANEXOSNUM = this.SER109B1.NUMERACION.ANEXOS_NUM;
                impresion.OPERBLOQNUM = this.SER109B1.NUMERACION.OPERBLOQ_NUM;
                impresion.OPERMODNUM = this.SER109B1.NUMERACION.OPERMOD_NUM;
                impresion.OPERNUM = this.SER109B1.NUMERACION.OPER_NUM;
                impresion.ADMINW = localStorage.getItem('Usuario');
                impresion.FECHAIMPRESION = moment().format('YYMMDD');
                impresion.FECHAOPER = moment(this.SER109B1.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion.FECHAOPER == 'Invalid date') impresion.FECHAOPER = '000000'
                impresion.FECHAMODOPER = moment(this.SER109B1.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion.FECHAMODOPER == 'Invalid date') impresion.FECHAMODOPER = '000000'
                impresion.FECHARETOPER = moment(this.SER109B1.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion.FECHARETOPER == 'Invalid date') impresion.FECHARETOPER = '000000'
                impresion.IDPACNUM = this.SER109B1.NUMERACION.IDPAC_NUM;
                impresion.NOMBREPACNUM = this.SER109B1.NUMERACION.NOMBREPAC_NUM;
                let prefijo = this.SER109B1.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == this.SER109B1.PREFIJOW)
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = this.SER109B1.PREFIJOW;
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                var vlr = 0;
                for (var i in this.SER109B1.FACTURAS2) {
                    vlr = vlr + parseInt(this.SER109B1.FACTURAS2[i].VALOR.replace(/,/g, ''));
                }
                var abono = 0;
                for (var i in this.SER109B1.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109B1.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM != '') {
                        abono = parseInt(this.SER109B1.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.replace(/,/g, '')) + abono;
                    }
                }
                impresion.TABLARBOS_NUM = this.SER109B1.NUMERACION.TABLARBOS_NUM;
                var saldocopago = 0;
                if ($_USUA_GLOBAL[0] == 891855847) {
                    saldocopago = 0;
                } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER109B1.NUMERACION.NIT_NUM) == 9990 || parseInt(this.SER109B1.NUMERACION.NIT_NUM) == 9999) && (parseInt(this.SER109B1.NUMERACION.FECHA_ING) > 20070930)) {
                    saldocopago = parseInt(this.SER109B1.NUMERACION.CO_PAGO_NUM) + abono
                } else {
                    if (abono != 0) {
                        saldocopago = 0
                    } else {
                        saldocopago = parseInt(this.SER109B1.NUMERACION.CO_PAGO_NUM);
                    }
                }
                let neto = vlr - saldocopago;
                impresion.VLRTOTAL = vlr;
                impresion.SALDOCOPAGO = saldocopago;
                impresion.SALDO = neto;
                impresion.PREFIJO = prefijo;
                impresion.TOTCOPAGO = parseInt(this.SER109B1.NUMERACION.CO_PAGO_NUM);
                let valorenletras = FAC146(impresion.VLRTOTAL);
                impresion.NUMEROENLETRAS = 'SON: ' + valorenletras;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion.FIRMA1 = this.SER109B1.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                impresion.MARGIN = [10, 160, 10, 20];
                impresion.WIDTH = ['4%', '7%', '19%', '10%', '7%', '8%', '5%', '9%', '5%', '5%', '5%', '5%', '5%', '5%', '5%'];
                impresion.COLUMNAS = ["COMP", "FECHA", "CONCEPTO", "REFART", "CUM", "INVIMA_LTF", "COD_LTF", "MARCA", "VENCE_LTF", "CANT", 'VALOR', 'VALOR', 'IVA_POR', 'IVA'];
                impresion.FORMATOTABLA = 10;
                impresion.IMPRESION = 'SER109W';
                _impresionformatoSER109(impresion, this._cerrarnumeracion_SER109B1, this._evaluarfacturaoriginal_SER109B1)
            }
        },
        _cerrarnumeracion_SER109B1() {
            console.log('cerrarnumeracion', this.form.estadofactura_SER109B1);
            if (this.form.estadofactura_SER109B1.substring(0, 1) == '0' || this.form.estadofactura_SER109B1.substring(0, 1) == '3') {
                if (this.SER109B1.PREFIJOW == 'A' || this.SER109B1.PREFIJOW == 'B' || this.SER109B1.PREFIJOW == 'D' || this.SER109B1.PREFIJOW == 'F' || this.SER109B1.PREFIJOW == 'G' ||
                    this.SER109B1.PREFIJOW == 'H' || this.SER109B1.PREFIJOW == 'I' || this.SER109B1.PREFIJOW == 'J' || this.SER109B1.PREFIJOW == 'K') {
                    if (this.SER109B1.FECHALNK.substring(0, 4) == this.SER109B1.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109B1.FECHALNK.substring(4, 6) == this.SER109B1.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        this._cerrarnumeracion2_SER109B1();
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    this._cerrarnumeracion2_SER109B1();
                }
            } else {
                _toggleNav();
            }
        },
        _cerrarnumeracion2_SER109B1() {
            let URL = get_url("APP/SALUD/SAL020I.DLL");
            postData({
                datosh: datosEnvio() + SER109B1.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    this.SER109B1.FECHAULTIMAFACT = data.FECHAULTIMAFACT
                    this.SER109B1.FECHAULTIMAFACT.pop();
                    this.SER109B1.FECHALIMI = '00000000';
                    if (this.SER109B1.FECHAULTIMAFACT != '') { this.SER109B1.FECHALIMI = this.SER109B1.FECHAULTIMAFACT[this.SER109B1.FECHAULTIMAFACT.length - 1] };
                    if (parseInt(this.SER109B1.FECHALIMI) > parseInt(this.SER109B1.FECHALNK)) {
                        CON851('', 'LA FECHA DEL ULT. COMP > A FECHA DEL MES', null, 'error', 'Error');
                        if (this.SER109B1.PREFIJOW != 'C' && this.SER109B1.PREFIJOW != 'E' && this.SER109B1.PREFIJOW != 'Ñ' && this.SER109B1.PREFIJOW != 'O' && this.SER109B1.PREFIJOW != 'P' && this.SER109B1.PREFIJOW != 'T' && this.SER109B1.PREFIJOW != 'U') {
                            this._ventanacierrefact_SER109B1();
                        } else {
                            _toggleNav();
                        }
                    } else {
                        this._ventanacierrefact_SER109B1();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this._evaluarprefijo_SER109B1();
                })
        },
        _ventanacierrefact_SER109B1() {
            $_this = this
            var ventanacierre = bootbox.dialog({
                size: 'medium',
                title: 'CIERRE DE FACTURAS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Desea cerrar la factura?:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="CERRARFACT_SER109B1"> ' +
                    '<input id="cerrar_SER109B1" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-10 col-sm-6 col-xs-6" id="FECHACIE_SER109B1"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha cierre:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="anocierre_SER109B1" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="mescierre_SER109B1" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="diacierre_SER109B1" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD"> ' +
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
                            setTimeout(() => { $_this._grabarcierre_SER109B1() }, 500)

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
            ventanacierre.init(this._Evaluarcierrefact_SER109B1());
            ventanacierre.on('shown.bs.modal', function () {
                $("#cerrar_SER109B1").focus();
            });
        },
        _Evaluarcierrefact_SER109B1() {
            _inputControl("disabled");
            validarInputs({
                form: '#CERRARFACT_SER109B1',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER109B1.CERRARFACT = $('#cerrar_SER109B1').val().toUpperCase();
                    $('#cerrar_SER109B1').val(this.SER109B1.CERRARFACT);
                    if ((this.SER109B1.CERRARFACT == 'S') || (this.SER109B1.CERRARFACT == 'N')) {
                        if (this.SER109B1.CERRARFACT == 'N') {
                            $('.btn-danger').click();
                        } else {
                            this._evaluarfechacierre_SER109B1('3');
                        }
                    } else {
                        this._Evaluarcierrefact_SER109B1();
                    }
                }
            )
        },
        _evaluarfechacierre_SER109B1(orden) {
            let fechasistema = moment().format('YYYYMMDD');
            let fechacierre = moment().format('YYYYMMDD');
            this.SER109B1.HORARETNUM = moment().format('HHmm');
            $('#anocierre_SER109B1').val(fechacierre.substring(0, 4));
            $('#mescierre_SER109B1').val(fechacierre.substring(4, 6));
            this.SER109B1.ANORET = $('#anocierre_SER109B1').val();
            this.SER109B1.MESRET = $('#mescierre_SER109B1').val();
            $('#diacierre_SER109B1').val(fechacierre.substring(6, 8));
            validarInputs({
                form: '#FECHACIE_SER109B1',
                orden: orden,
            },
                this._Evaluarcierrefact_SER109B1,
                () => {
                    this.SER109B1.DIARET = $('#diacierre_SER109B1').val().padStart(2, '0');
                    this.SER109B1.FECHARETNUM = this.SER109B1.ANORET + this.SER109B1.MESRET + this.SER109B1.DIARET;
                    if ((parseInt(this.SER109B1.DIARET) < 1) || (parseInt(this.SER109B1.DIARET) > parseInt(this.SER109B1.FECHALNK.substring(6, 8))) || parseInt(this.SER109B1.FECHARETNUM) < (this.SER109B1.FECHAING_NUM)) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER109B1').val('N');
                        this._Evaluarcierrefact_SER109B1()
                    } else if (fechasistema > SER109B1.FECHARETNUM) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER109B1').val('N');
                        this._Evaluarcierrefact_SER109B1()
                    } else {
                        $('.btn-primary').click();
                    }
                }
            )
        },
        _grabarcierre_SER109B1() {
            let URL = get_url("APP/SALUD/SER109D.DLL");
            postData({
                datosh: datosEnvio() + '4|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109B1.LLAVEW + '| | |' + this.form.estadofactura_SER109B1.substring(0, 1) + '| | | | | |' + localStorage.getItem('Usuario').trim() + '| | | |' + SER109B1.FECHARETNUM + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    if (this.SER109B1.PREFIJOW == 'P' || this.SER109B1.PREFIJOW == 'T' || this.SER109B1.PREFIJOW == 'Q' || this.SER109B1.PREFIJOW == 'V') {
                        let URL = get_url("APP/SALUD/SAL020C.DLL");
                        postData({
                            datosh: datosEnvio() + this.SER109B1.LLAVEW + '|' + this.SER109B1.FECHALNK + '|'
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
                            datosh: datosEnvio() + SER109B1.LLAVEW + '|' + SER109B1.FECHALNK + '|'
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
                    this._evaluarprefijo_SER109B1();
                })
        }
    }
})

var porcentcopagoMask_SER109B1 = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true,
});

var prefijoMask_SER109B1 = IMask($('#prefijo_SER109B1')[0], {
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

var bloqueoMask_SER109B1 = IMask($('#bloquearfactura_SER109B1')[0], {
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

var facturaoriginalMask_SER109B1 = IMask($('#facturaoriginal_SER109B1')[0], {
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

var discriminardrogMask_SER109B1 = IMask($('#descriminardrog_SER109B1')[0], {
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

var mostrarnrodrogMask_SER109B1 = IMask($('#mostrarcomprob_SER109B1')[0], {
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

var mostrarfechacompMask_SER109B1 = IMask($('#fechadrog_SER109B1')[0], {
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

var cambiarfechacompMask_SER109B1 = IMask($('#Cambiarfecha_SER109B1')[0], {
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

var totalboletaMask_SER109B1 = IMask($('#boleta_SER109B1')[0], {
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
var listarmedicoMask_SER109B1 = IMask($('#medico_SER109B1')[0], {
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

var cupssoatMask_SER109B1 = IMask($('#cupssoat_SER109B1')[0], {
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

var fechaserviMask_SER109B1 = IMask($('#fechaservi_SER109B1')[0], {
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

var facturavaciaMask_SER109B1 = IMask($('#facturavacia_SER109B1')[0], {
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



