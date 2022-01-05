// 21/01/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#SAL450G",
    data: {
        SAL450G: [],
        form: {
            sucursal_SAL450G: "",
            clasedeservicio_SAL450G: "",
            clasedeserviciod_SAL450G: "",
            comprobante_SAL450G: "",
            fecha_SAL450G: "",
            prefijofactura_SAL450G: "",
            numerofactura_SAL450G: "",
            puertaingreso_SAL450G: "",
            cliente_SAL450G: "",
            cliented_SAL450G: "",
            paciente_SAL450G: "",
            paciented_SAL450G: "",
            sexo_SAL450G: "",
            edad_SAL450G: "",
            codigodeservicio_SAL450G: "",
            codigodeserviciod_SAL450G: "",
            almacen_SAL450G: "",
            cantidad_SAL450G: "",
            unidad_SAL450G: "",
            vlrunit_SAL450G: "",
            vlrtotal_SAL450G: "",
            valortotalcomprobante_SAL450G: "",
            valoriva_SAL450G: "",
            porcentcopago_SAL450G: "",
            copagoestimfact_SAL450G: "",
            netofact_SAL450G: "",
            formacopago_SAL450G: "",
            tipopago_SAL450G: "",
            especialidad_SAL450G: "",
            especialidadd_SAL450G: "",
            centrocostos_SAL450G: "",
            centroccostosd_SAL450G: "",
            convenio_SAL450G: "",
            estrato_SAL450G: "",
            ciudad_SAL450G: "",
            atendido_SAL450G: "",
            atendidod_SAL450G: "",
            solic_SAL450G: "",
            solicd_SAL450G: "",
            tipoafiliacion_SAL450G: "",
            cap_SAL450G: "",
            claseserv_SAL450: "",
            unidaddeservicio_SAL450G: ""
        },
        numerotabla_SAL450G: 0,
        tablafacturacion_SAL450G: [],
        FACTURACION: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        $_this = this;
        $_this.SAL450G.CTRMESFACT = ''
        $_this.SAL450G.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SAL450G.ANO_LNK = $_this.SAL450G.FECHA_LNK.substring(0, 2);
        $_this.SAL450G.MES_LNK = $_this.SAL450G.FECHA_LNK.substring(2, 4);
        $_this.SAL450G.DIA_LNK = $_this.SAL450G.FECHA_LNK.substring(4, 6);
        if ($_USUA_GLOBAL[0].NIT == '0800156469') {
            this.SAL450G.SERVICIOS = [
                { COD: '0', DESCRIPCION: 'DROGUERIA' },
                { COD: '1', DESCRIPCION: 'CIRUGIAS' },
                { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
                { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
                { COD: '4', DESCRIPCION: 'DOPPLER' },
                { COD: '5', DESCRIPCION: 'T.A.C.' },
                { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
                { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
            ]
        } else {
            this.SAL450G.SERVICIOS = [
                { COD: '0', DESCRIPCION: 'DROGUERIA' },
                { COD: '1', DESCRIPCION: 'CIRUGIAS' },
                { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
                { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
                { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
                { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
                { COD: '6', DESCRIPCION: 'PATOLOGIA' },
                { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
            ]
        }
        $_this = this;
        console.log('DATOS COMPLETOS')
        obtenerDatosCompletos({ nombreFd: 'UNSERV' }, data => {
            data = data.UNSERV;
            data.pop();
            $_this.SAL450G.UNSERV = data;
            $_this.SAL450G.UNIDSERVICIO = [];
            for (var i in $_this.SAL450G.UNSERV) {
                if ($_this.SAL450G.UNSERV[i].ESTADO.trim() == 'S') {
                    if ($_this.SAL450G.UNSERV[i].COD.trim() != '') {
                        $_this.SAL450G.UNIDSERVICIO.push($_this.SAL450G.UNSERV[i]);
                    }
                }
            }
            for (var i in $_this.SAL450G.UNIDSERVICIO) {
                $_this.SAL450G.UNIDSERVICIO[i].DESCRIP = `${$_this.SAL450G.UNIDSERVICIO[i].COD} - ${$_this.SAL450G.UNIDSERVICIO[i].DESCRIP}`;
                $_this.SAL450G.UNIDSERVICIO[i].COD = i;
            }
            loader("hide");
            this._validaropcion_SAL450G()
            obtenerDatosCompletos({ nombreFd: 'ESPECIALIDAD' }, data => {
                data = data.ESPECIALIDADES;
                data.pop();
                $_this.SAL450G.ESPECIALIDADES = data;

            });
        });

    },
    methods: {
        _validaropcion_SAL450G() {
            console.log('ELEGIR OPCION')
            OPCIONES = new Object;
            OPCIONES = {
                '094294': this._revisardato_SAL450G,
                '094295': this._revisardato_SAL450G,
                '094296': this._revisardato_SAL450G,
                '094297': this._revisardato_SAL450G,
                '094298': this._revisardato_SAL450G,
                '094299': this._revisardato_SAL450G,
            }
            let active = $('#navegacion').find('li.opcion-menu.active');
            this.SAL450G.OPCIONACTIVA = active[0].attributes[2].nodeValue;
            let Nombreopcion = {
                '094294': '9, 4, 2, 9, 4 - Cambio numero de autorización',
                '094295': '9, 4, 2, 9, 5 - Cambio medico a un comprobante',
                '094296': '9, 4, 2, 9, 6 - Cambio almacen a un comprobante',
                '094297': '9, 4, 2, 9, 7 - Cambio numero de comprobante',
                '094298': '9, 4, 2, 9, 8 - Cambio de unidad de servicio',
                '094299': '9, 4, 2, 9, 9 - Cambio por remision automatica',
            }
            nombreOpcion(Nombreopcion[this.SAL450G.OPCIONACTIVA]);
            let opcion = new Function();
            opcion = OPCIONES[active[0].attributes[2].nodeValue];
            opcion();
        },
        _revisardato_SAL450G() {
            console.log('VALIDAR USUARIO')
            if ($_USUA_GLOBAL[0].LOTE_FARM == 'S' || $_USUA_GLOBAL[0].LOTE_FARM == 'N') {
                this._clavedeacceso_SAL450G()
            } else {
                if ($_USUA_GLOBAL[0].PUC == 4 || $_USUA_GLOBAL[0].PUC == 6) {
                    $_USUA_GLOBAL[0].LOTE_FARM = 'S'
                } else {
                    $_USUA_GLOBAL[0].LOTE_FARM = 'N'
                }
                this._clavedeacceso_SAL450G()
            }
        },
        _clavedeacceso_SAL450G() {
            $_this = this;
            var ventanaclaveacceso = bootbox.dialog({
                size: 'small',
                onEscape: false,
                title: 'CLAVE DE ACCESO',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +
                    '<div class="form-group"> ' +
                    '<div class="col-md-12" id="VALIDAR1VENTANAACCESO_SAL450G"> ' +
                    '<input id="claveacceso_SAL450G" type="text" class="form-control input-md" data-orden="1" maxlength="6"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanaclaveacceso.off('show.bs.modal');
                            $_this._leerimpresora_SAL450G();
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanaclaveacceso.off('show.bs.modal');
                            _toggleNav();
                        }
                    }
                }
            });
            ventanaclaveacceso.init($('.modal-footer').hide());
            ventanaclaveacceso.on('shown.bs.modal', function () {
                $("#claveacceso_SAL450G").focus();
            });
            this._evaluaracceso_SAL450G();
        },
        _evaluaracceso_SAL450G() {
            validarInputs({
                form: "#VALIDAR1VENTANAACCESO_SAL450G",
                orden: '1'
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SAL450G.CLAVEACCESO = $('#claveacceso_SAL450G').val();
                    if (this.SAL450G.CLAVEACCESO.trim() == $_USUA_GLOBAL[0].CLAVE.trim()) {
                        $('.btn-primary').click();
                    } else {
                        CON851('03', '03', this._evaluaracceso_SAL450G(), 'error', 'error');
                    }
                }
            )
        },
        _leerimpresora_SAL450G() {
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario}|` }, get_url("APP/CONTAB/CON003A.DLL"))
                .then(data => {
                    postData({
                        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
                    }, get_url("APP/CONTAB/CON007B.DLL"))
                        .then(data => {
                            console.debug(data);
                            data = data.split("|");
                            this.SAL450G.SEGW = data
                            if (data[1].substring(0, 1) == "0" || data[1].substring(0, 1) == "3" || data[1].substring(0, 1) == "5") {
                                if ($_USUA_GLOBAL[0].PREFIJ.trim() == '') {
                                    $_USUA_GLOBAL[0].PREFIJ = '00';
                                    this._datosucursal_SAL450G();
                                } else {
                                    this._datosucursal_SAL450G();
                                }
                            } else {
                                CON851('', 'Mes bloqueado', _toggleNav(), 'error', 'Error');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            CON851('', 'Ocurrio un error con el usuario', null, 'error', 'Error');
                            _toggleNav();
                        });
                })
                .catch(err => {
                    console.debug(err);
                    _toggleNav();
                })
        },

        _datosucursal_SAL450G() {
            postData({
                datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
            }, get_url("app/CONTAB/CON003.DLL"))
                .then((data) => {
                    data = data.split('|');
                    let OBJECT = {
                        '844003225': ['JL', 'CA', 'CS', 'PV', 'BC', 'LC', 'CV', 'HT', 'EM', 'HY', 'TL', 'MR', '01'],
                        '800162035': ['01', '03', '05', '06', '07', '08', '10', '11', '12', '14', '15', '17'],
                        '900405505': ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
                        '800156469': ['00', '01', '02', '03'],
                    }
                    if ($_USUA_GLOBAL[0].PREFIJ.trim() == '') $_USUA_GLOBAL[0].PREFIJ == '00'
                    if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI') {
                        this.form.sucursal_SAL450G = $_USUA_GLOBAL[0].PREFIJ;
                        if ($_this.SAL450G.OPCIONACTIVA == '094296') {
                            this.form.clasedeservicio_SAL450G = '0'
                            this.form.clasedeserviciod_SAL450G = 'DROGUERIA'
                            this._revisarpermiso_SAL450G()
                        } else {
                            this._datotipo_SAL450G();
                        }
                    } else {
                        let array = OBJECT[$_USUA_GLOBAL[0].NIT];
                        if (array == undefined) {
                            this.form.sucursal_SAL450G = $_USUA_GLOBAL[0].PREFIJ;
                            if ($_this.SAL450G.OPCIONACTIVA == '094296') {
                                this.form.clasedeservicio_SAL450G = '0'
                                this.form.clasedeserviciod_SAL450G = 'DROGUERIA'
                                this._revisarpermiso_SAL450G()()
                            } else {
                                this._datotipo_SAL450G();
                            }
                        } else {
                            for (var i in array) {
                                if (data[2].trim() == array[i]) {
                                    $_USUA_GLOBAL[0].PREFIJ = data[2].trim();
                                    this.form.sucursal_SAL450G = $_USUA_GLOBAL[0].PREFIJ;
                                    if ($_this.SAL450G.OPCIONACTIVA == '094296') {
                                        this.form.clasedeservicio_SAL450G = '0'
                                        this.form.clasedeserviciod_SAL450G = 'DROGUERIA'
                                        this._revisarpermiso_SAL450G()
                                    } else {
                                        this._datotipo_SAL450G();
                                    }
                                    break;
                                } else if (i == array.length - 1) {
                                    CON851('48', '48', _toggleNav(), 'error', 'Error');
                                }
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                    _toggleNav();
                });
        },

        _evaluarsucursal_SAL450G() {
            validarInputs({
                form: "#VALIDAR1_SAL450G",
                orden: "1"
            }, () => { _toggleNav() },
                () => {
                    console.log(this.SAL450G.SERVICIOS)
                    this.form.sucursal_SAL450G = this.form.sucursal_SAL450G.padStart(2, '0')
                    this._datotipo_SAL450G()
                }
            )
        },

        _datotipo_SAL450G() {
            validarInputs({
                form: "#VALIDAR2_SAL450G",
                orden: "1"
            }, () => { this._evaluarsucursal_SAL450G() },
                () => {
                    console.log(this.SAL450G.SERVICIOS)
                    let array = this.SAL450G.SERVICIOS.filter(x => x.COD == this.form.clasedeservicio_SAL450G.trim());
                    if (array.length > 0) {
                        this.form.clasedeservicio_SAL450G = array[0].COD
                        this.form.clasedeserviciod_SAL450G = array[0].DESCRIPCION
                        if (this.form.clasedeservicio_SAL450G == '0' && this.SAL450G.SEGW == '3') {
                            CON851B(this.SAL450G.SEGW, this._datotipo_SAL450G);
                        } else {
                            this._evaluarcomprobante_SAL450G()
                        }
                    } else {
                        CON851('03', '03', this._datotipo_SAL450G(), 'error', 'error');
                    }
                }
            )
        },
        _evaluarcomprobante_SAL450G() {
            validarInputs({
                form: "#VALIDAR3_SAL450G",
                orden: "1"
            },
                () => {
                    this._datotipo_SAL450G()
                },
                () => {
                    if (this.form.comprobante_SAL450G.trim() == '' || this.form.comprobante_SAL450G == 0) {
                        CON851('03', '03', this._evaluarcomprobante_SAL450G(), 'error', 'error');
                    } else {
                        this._consultafactura_SAL450G()
                    }
                }
            )
        },
        _consultafactura_SAL450G() {
            postData({ datosh: `${datosEnvio()}${this.form.sucursal_SAL450G.trim()}${this.form.clasedeservicio_SAL450G}${this.form.comprobante_SAL450G.trim().padStart(6, '0')}|` },
                get_url("APP/SALUD/SAL450A.DLL"))
                .then(data => {
                    console.log(data)
                    this.SAL450G.COMPROBANTE = data.FACTURA[0];
                    this.form.fecha_SAL450G = this.SAL450G.COMPROBANTE.FECHA
                    this.SAL450G.ANOFACT = this.SAL450G.COMPROBANTE.FECHA.substring(0, 4)
                    this.SAL450G.MESFACT = this.SAL450G.COMPROBANTE.FECHA.substring(4, 6)
                    this.SAL450G.DIAFACT = this.SAL450G.COMPROBANTE.FECHA.substring(6, 8)
                    this.form.prefijofactura_SAL450G = this.SAL450G.COMPROBANTE.PREFIJO
                    this.form.numerofactura_SAL450G = this.SAL450G.COMPROBANTE.NRO_CTA
                    this.form.puertaingreso_SAL450G = this.SAL450G.COMPROBANTE.PUERTA_ESTAD + ' - ' + this.SAL450G.COMPROBANTE.DESCRIP_PUERTA
                    this.form.cliente_SAL450G = this.SAL450G.COMPROBANTE.NIT
                    this.form.cliented_SAL450G = this.SAL450G.COMPROBANTE.DESCRIP_TER
                    this.form.paciente_SAL450G = this.SAL450G.COMPROBANTE.ID_PACIENTE
                    this.form.paciented_SAL450G = this.SAL450G.COMPROBANTE.DESCRIP_PACI
                    this.form.sexo_SAL450G = this.SAL450G.COMPROBANTE.SEXO
                    this.form.edad_SAL450G = this.SAL450G.COMPROBANTE.EDAD
                    this.form.valortotalcomprobante_SAL450G = this.SAL450G.COMPROBANTE.VALOR_BRUTO - this.SAL450G.COMPROBANTE.COPAGO_ESTIM_PAGO
                    this.form.copagoestimfact_SAL450G = this.SAL450G.COMPROBANTE.COPAGO_ESTIM_PAGO
                    this.form.netofact_SAL450G = this.SAL450G.COMPROBANTE.VALOR_BRUTO
                    this.form.especialidad_SAL450G = this.SAL450G.COMPROBANTE.ESPEC
                    this.form.especialidadd_SAL450G = this.SAL450G.COMPROBANTE.DESCRIP_ESPEC
                    this.form.centrocostos_SAL450G = this.SAL450G.COMPROBANTE.COSTO_FACT
                    this.form.centroccostosd_SAL450G = this.SAL450G.COMPROBANTE.DESCRIP_TAR
                    this.form.convenio_SAL450G = this.SAL450G.COMPROBANTE.TARIF
                    this.form.estrato_SAL450G = this.SAL450G.COMPROBANTE.ESTRATO
                    this.form.ciudad_SAL450G = this.SAL450G.COMPROBANTE.CIUDAD_PACI
                    this.form.atendido_SAL450G = this.SAL450G.COMPROBANTE.MED_OTR_FACT
                    this.form.atendidod_SAL450G = this.SAL450G.COMPROBANTE.DESCRIP_MED1
                    this.form.solic_SAL450G = this.SAL450G.COMPROBANTE.REMITE_FACT
                    this.form.solicd_SAL450G = this.SAL450G.COMPROBANTE.DESCRIP_MED2
                    this.SAL450G.MACROFACTW = this.SAL450G.COMPROBANTE.MACRO_FACT
                    let unidadservicio = this.SAL450G.UNIDSERVICIO.filter(x => x.DESCRIP.substring(0, 2) == this.SAL450G.COMPROBANTE.UNIDAD_SERVICIO.trim());
                    if (unidadservicio.length == 0) unidadservicio.push({ DESCRIP: '', EDADMAX: ' 000', EDADMIN: ' 000' })
                    this.form.unidaddeservicio_SAL450G = unidadservicio[0].DESCRIP;
                    // this.form.codigodeservicio_SAL450G =
                    // this.form.codigodeserviciod_SAL450G =
                    // this.form.almacen_SAL450G= 
                    // this.form.cantidad_SAL450G= 
                    // this.form.unidad_SAL450G= 
                    // this.form.vlrunit_SAL450G= 
                    // this.form.vlrtotal_SAL450G= 
                    // this.form.valoriva_SAL450G= 
                    // this.form.porcentcopago_SAL450G= 
                    // this.form.formacopago_SAL450G= 
                    // this.form.tipopago_SAL450G= 
                    // this.form.tipoafiliacion_SAL450G= 
                    // this.form.cap_SAL450G= 
                    this.FACTURACION = [];
                    for (var i in this.SAL450G.COMPROBANTE.TABLA) {
                        if (this.SAL450G.COMPROBANTE.TABLA[i].ARTICULO.trim() != '') {
                            this.FACTURACION.push({ ARTICULO: this.SAL450G.COMPROBANTE.TABLA[i].ARTICULO, DESCRIPCIONART: this.SAL450G.COMPROBANTE.TABLA[i].DESCRIP_ART, ALMACEN: this.SAL450G.COMPROBANTE.TABLA[i].ALMACEN, CANTIDAD: this.SAL450G.COMPROBANTE.TABLA[i].CANTIDAD, UNIDAD: this.SAL450G.COMPROBANTE.TABLA[i].UNIDAD, VALORUNIT: this.SAL450G.COMPROBANTE.TABLA[i].VALOR_UNIT, VALORTOTAL: this.SAL450G.COMPROBANTE.TABLA[i].VALOR_FACT, CODIGOLOTE: this.SAL450G.COMPROBANTE.TABLA[i].COD_LOTE, DIASTRATA: this.SAL450G.COMPROBANTE.TABLA[i].DIASTRATAFACT });
                        }
                    }
                    this.SAL450G.ALMFACTW = this.FACTURACION[0].ALMACEN
                    console.log('VA CONSULTAR')
                    postData({ datosh: datosEnvio() + this.SAL450G.COMPROBANTE.PREFIJO + this.SAL450G.COMPROBANTE.NRO_CTA + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
                        .then(data => {
                            console.log(data)
                            $_this = this
                            $_this.SAL450G.FACT = data.NUMER19[0];
                            $_this.SAL450G.AUTORI_NUM = $_this.SAL450G.FACT.NROAUTORI_NUM.trim()
                            OPCIONES = new Object;
                            OPCIONES = {
                                '094294': $_this._modificarautorizacion_SAL450G,
                                '094295': $_this._modificarnedico_SAL450G,
                                '094296': $_this._modificaralmacen_SAL450G,
                                '094297': $_this._modificarcomprobante,
                                '094298': $_this._modificarunidadserv_SAL450G,
                                // '094299': $_this._revisardato_SAL450G,
                            }
                            let opcion2 = new Function();
                            opcion2 = OPCIONES[$_this.SAL450G.OPCIONACTIVA];
                            opcion2();
                        })
                        .catch(err => {
                            console.error(err)
                            this._evaluarcomprobante_SAL450G()
                        });
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarcomprobante_SAL450G()
                })
        },
        /////////////////////OPCION 4 //////////////////////////////////
        _modificarautorizacion_SAL450G() {
            console.log('AUTORIZACION')
            $_this = this;
            var ventanadetallefactura = bootbox.dialog({
                size: 'medium',
                title: 'DETALLE FACTURA',
                closeButton: false,
                message: '<div class="row" style="display:float!important">' +
                    '<div class="col-md-12 col-sm-12 col-xs-12">' +
                    '<div class="col-md-12" id="VALIDAR1VENTANADETALLE_SAL450G"> ' +
                    '<input id="detallefactura_SAL450G" class="form-control input-md" data-orden="1" maxlength="300"> ' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                buttons: {
                    aceptar: {
                        label: 'Aceptar',
                        callback: function () {
                            ventanadetallefactura.off('shown.bs.modal');
                            setTimeout(() => {
                                CON851P('01', $_this._evaluarcomprobante_SAL450G, $_this._grabardetalle_SAL450G)
                            }, 300);


                        },
                        className: 'btn-primary'
                    },
                    cancelar: {
                        label: 'Cancelar',
                        callback: function () {
                            ventanadetallefactura.off('shown.bs.modal');
                            setTimeout($_this._evaluarcomprobante_SAL450G, 300);
                        },
                        className: 'btn-danger'
                    }
                },

            });
            ventanadetallefactura.init($('.modal-footer').hide());
            ventanadetallefactura.on('shown.bs.modal', function () {
                $('#detallefactura_SAL450G').focus();
            });
            this._evaluardetalle_SAL450G();
        },
        _evaluardetalle_SAL450G() {
            console.log('_evaluardetalle_SAL450G', this.SAL450G.COMPROBANTE.DETALLE_FACT)
            $('#detallefactura_SAL450G').val(this.SAL450G.COMPROBANTE.DETALLE_FACT)
            validarInputs({
                form: "#VALIDAR1VENTANADETALLE_SAL450G",
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SAL450G.DETALLE = $('#detallefactura_SAL450G').val().toUpperCase(); $('#detallefactura_SAL450G').val(this.SAL450G.DETALLE)
                    console.log(this.SAL450G.DETALLE, 'DETALLE')
                    this._aceptarautorizacion2_SAL450G()

                }
            )
        },
        _aceptarautorizacion2_SAL450G() {
            console.log('autorizacion')
            $('.modal-body .row').append('<div class="salto-linea"></div>' +
                '<div class="col-md-12 col-sm-12 col-xs-12"' +
                '<div class="inline-inputs">' +
                '<label class="col-md-4 col-sm-4 col-xs-4">AUTORIZACION EPS : </label>' +
                '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR3VENTANADETALLE_SAL450G">' +
                '<input id="autorizacion_SAL450G" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="27" data-orden="1">' +
                '</div>' +
                '</div>' +
                '</div>');
            if (this.form.factura_SAL450G != 'P' && this.SAL450G.COMPROBANTE.NRO_AUTOR_ELAB.trim() == '') {
                this.SAL450G.COMPROBANTE.NRO_AUTOR_ELAB = this.SAL450G.AUTORI_NUM
            }
            this._evaluarautorizacion_SAL450G();
        },
        _evaluarautorizacion_SAL450G() {

            $('#autorizacion_SAL450G').val(this.SAL450G.COMPROBANTE.NRO_AUTOR_ELAB)
            validarInputs({
                form: "#VALIDAR3VENTANADETALLE_SAL450G",
                orden: "1"
            },
                this._evaluardetalle_SAL450G,
                () => {
                    this.SAL450G.NROAUTOR = $('#autorizacion_SAL450G').val().trim();
                    $('.btn-primary').click();
                }
            )
        },

        _grabardetalle_SAL450G() {
            console.log('GRABAR DETALLE')
            postData({ datosh: datosEnvio() + "1|" + localStorage.Usuario + '|' + this.form.sucursal_SAL450G + this.form.clasedeservicio_SAL450G + this.form.comprobante_SAL450G.trim().padStart(6, '0') + '|' + this.SAL450G.DETALLE + '|' + this.SAL450G.NROAUTOR + '|' }, get_url("APP/SALUD/SAL450G.DLL"))
                .then(data => {
                    CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                })
                .catch(err => {
                    this._evaluarcomprobante_SAL450G()
                });
        },
        /////////////////////OPCION 5 //////////////////////////////////
        _modificarnedico_SAL450G() {
            validarInputs({
                form: '#VALIDAR17_SAL450G',
                orden: "1"
            },
                this._evaluarcomprobante_SAL450G,
                () => {
                    if ((this.form.atendido_SAL450G.trim() == '' && this.form.clasedeservicio_SAL450G > 1) || (this.form.atendido_SAL450G == 0 && this.form.clasedeservicio_SAL450G > 1)) {
                        CON851('', 'Digite un medico', this._modificarnedico_SAL450G(), 'error', 'Error');
                    } else {
                        postData({ datosh: `${datosEnvio()}5||||${this.form.atendido_SAL450G.padStart(10, '0')}|||||||||||` },
                            get_url("APP/SALUD/SAL401.DLL"))
                            .then((data) => {
                                console.log(data, 'PROFESIOONAL');
                                this.form.atendidod_SAL450G = data.DESCRIPCION;
                                this.SAL450G.PERSONALELAB = data.ATIENDE;
                                let j = {
                                    '0': '1',
                                    '1': '2',
                                    '2': '3',
                                    '3': '4',
                                    '4': '5',
                                    '5': '6',
                                    '6': '2',
                                    '7': '7',
                                }
                                if (data.ESTADO == '2') {
                                    CON851('13', '13', this._modificarnedico_SAL450G(), 'error', 'Error');
                                } else {
                                    this._evaluarremite_SAL450G()
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                this._modificarnedico_SAL450G()
                            });

                    }
                }
            )
        },
        _evaluarremite_SAL450G() {
            validarInputs({
                form: '#VALIDAR18_SAL450G',
                orden: '1'
            },
                this._modificarnedico_SAL450G,
                () => {
                    if (this.form.solic_SAL450G.trim() == '' || this.form.solic_SAL450G.trim() == 0) {
                        if (this.form.clasedeservicio_SAL450G == '0' || this.form.clasedeservicio_SAL450G == '2' || this.form.clasedeservicio_SAL450G == '3') {
                            CON851('02', '02', this._evaluarremite_SAL450G(), 'error', 'Error');
                        } else {
                            this.form.solicd_SAL450G = ''
                            CON851P('01', $_this._evaluarremite_SAL450G, $_this._grabarmedico_SAL450G)
                        }
                    } else {
                        postData({ datosh: `${datosEnvio()}5||||${this.form.solic_SAL450G.trim().padStart(10, '0')}|` },
                            get_url("APP/SALUD/SAL401.DLL"))
                            .then((data) => {
                                this.form.solicd_SAL450G = data.DESCRIPCION;
                                CON851P('01', $_this._evaluarremite_SAL450G, $_this._grabarmedico_SAL450G)
                            })
                            .catch(error => {
                                console.error(error);
                                this._evaluarremite_SAL450G();
                            });
                    }
                }
            )
        },
        _grabarmedico_SAL450G() {
            console.log('GRABAR MEDICO')
            postData({ datosh: datosEnvio() + "2|" + localStorage.Usuario + '|' + this.form.sucursal_SAL450G + this.form.clasedeservicio_SAL450G + this.form.comprobante_SAL450G.trim().padStart(6, '0') + '| | |' + this.form.atendido_SAL450G + '|' + this.form.solic_SAL450G + '|' }, get_url("APP/SALUD/SAL450G.DLL"))
                .then(data => {
                    CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                })
                .catch(err => {
                    this._evaluarcomprobante_SAL450G()
                });
        },
        /////////////////////OPCION 6 //////////////////////////////////

        _revisarpermiso_SAL450G() {
            this.SAL450G.OPCSEGU = 'I46' + this.form.clasedeservicio_SAL450G
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${this.SAL450G.OPCSEGU}|` },
                get_url("APP/CONTAB/CON904.DLL"))
                .then(data => {
                    console.log(data)
                    this._evaluarcomprobante_SAL450G()
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarsucursal_SAL450G()
                });
        },
        _modificaralmacen_SAL450G() {
            console.log('MODIFICAR ALMACEN')
            this.form.codigodeservicio_SAL450G = this.FACTURACION[this.numerotabla_SAL450G].ARTICULO
            this.form.codigodeserviciod_SAL450G = this.FACTURACION[this.numerotabla_SAL450G].DESCRIPCIONART
            this.form.almacen_SAL450G = this.FACTURACION[this.numerotabla_SAL450G].ALMACEN
            this.form.cantidad_SAL450G = this.FACTURACION[this.numerotabla_SAL450G].CANTIDAD
            this.form.unidad_SAL450G = this.FACTURACION[this.numerotabla_SAL450G].UNIDAD
            this.form.vlrunit_SAL450G = this.FACTURACION[this.numerotabla_SAL450G].VALORUNIT
            this.form.vlrtotal_SAL450G = this.FACTURACION[this.numerotabla_SAL450G].VALORTOTAL
            this._evaluaralmacen_SAL450G()

        },
        _evaluaralmacen_SAL450G() {
            validarInputs({
                form: "#VALIDAR10_SAL450G",
                orden: "1"
            },
                this._evaluarcomprobante_SAL450G,
                () => {
                    if (this.form.almacen_SAL450G.trim() == '') {
                        CON851('03', '03', this._evaluaralmacen_SAL450G(), 'error', 'Error');
                    } else {
                        postData({ datosh: `${datosEnvio()}9|||||||||||${this.form.almacen_SAL450G.trim()}|` },
                            get_url("APP/SALUD/SAL401.DLL"))
                            .then((data) => {
                                console.log(data, 'ALMACEN')
                                this.SAL450G.RESTRIC = data.RESTIRC;
                                if (this.SAL450G.RESTRIC == 'N') {
                                    CON851('13', '13', this._evaluaralmacen_SAL450G(), 'error', 'Error');
                                } else {
                                    if (this.form.almacen_SAL450G == this.SAL450G.ALMFACTW) {
                                        CON851('6V', '6V', this._evaluarcomprobante_SAL450G(), 'error', 'Error');
                                    } else {
                                        CON851P('01', this._evaluaralmacen_SAL450G, this._grabaralmacen_SAL450G)

                                    }
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                this._evaluaralmacen_SAL450G()
                            });
                    }
                }
            )
        },
        _grabaralmacen_SAL450G() {
            console.log('FALTA ENVIAR ALMACEN AL GRABADO')
            postData({ datosh: datosEnvio() + "3|" + localStorage.Usuario + '|' + this.form.sucursal_SAL450G + this.form.clasedeservicio_SAL450G + this.form.comprobante_SAL450G.trim().padStart(6, '0') + '| | |' + this.form.atendido_SAL450G + '|' + this.form.solic_SAL450G + '|' }, get_url("APP/SALUD/SAL450G.DLL"))
                .then(data => {
                    // CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                    if (($_USUA_GLOBAL[0].INVENT == 'S') && (this.form.clasedeservicio_SAL450G == 0 && this.SAL450G.MACROFACTW == '1') && (this.SAL450G.CTRMESFACT != '1')) {
                        postData({ datosh: `${datosEnvio()}${this.form.sucursal_SAL450G}${this.form.clasedeservicio_SAL450G}${this.form.comprobante_SAL450G.trim().padStart(6, '0')}|0|` },
                            get_url("APP/SALUD/SAL030.DLL"))
                            .then(data => {
                                console.debug(data);
                                console.log('FALTA HACE PASO 2 REVISAL SALDO')
                                postData({ datosh: datosEnvio() + "B|" + localStorage.Usuario + '|' + this.form.sucursal_SAL450G + this.form.clasedeservicio_SAL450G + this.form.comprobante_SAL450G.trim().padStart(6, '0') + '|' }, get_url("APP/SALUD/SAL450G.DLL"))
                                    .then(data => {
                                        CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                                    })
                                    .catch(err => {
                                        this._evaluarcomprobante_SAL450G()
                                    });

                            })
                            .catch(err => {
                                console.error(err);
                                CON851('', 'Hubo un problema en inventario', _evaluarcomprobante_SAL450G(), 'error', 'Error');
                            })
                    } else {
                        CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                    }
                })
                .catch(err => {
                    console.error(err)
                    this._evaluarcomprobante_SAL450G()
                });
        },
        /////////////////////OPCION 7 //////////////////////////////////
        _modificarcomprobante() {
            $_this = this
            var ventanadestino = bootbox.dialog({
                size: 'small',
                title: 'Datos de la factura destino',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Sucursal' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="EVALUARSUC_SAL450G"> ' +
                    '<input id="suc2_SAL450G" class="form-control input-md" data-orden="1" maxlength=2"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Clase' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="EVALUACLASE_SAL450G"> ' +
                    '<input id="clase2_SAL450G" class="form-control input-md" data-orden="1" maxlength="2"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Comprobante' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="EVALUACOMP_SAL450G"> ' +
                    '<input id="comprobante2_SAL450G" class="form-control input-md" data-orden="1" maxlength="6"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Prefijo' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="EVALUAPREF_SAL450G"> ' +
                    '<input id="prefijo2_SAL450G" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Factura' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="EVALUAFACT_SAL450G"> ' +
                    '<input id="factura2_SAL450G" class="form-control input-md" data-orden="1" maxlength="6" > ' +
                    '</div> ' +
                    '</div> ' +


                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanadestino.off('show.bs.modal');
                            if ($_this.SAL450G.TARIFAFACT != $_this.form.convenio_SAL450G) {
                                setTimeout($_this._ventanatarifa_SAL450G, 500);
                            } else {
                                setTimeout(() => { CON851P('01', $_this._evaluarcomprobante_SAL450G, $_this._grabarfactura2_SAL450G) }, 500)
                            }
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanadestino.off('show.bs.modal');
                            setTimeout($_this._evaluarcomprobante_SAL450G, 300)
                        }
                    }
                }
            });
            ventanadestino.init($('.modal-footer').hide());
            ventanadestino.init(this._evaluarclase2_SAL450G);
            ventanadestino.on('shown.bs.modal', function () {
                $("#clase2_SAL450G").focus();
            });
        },
        _evaluarsucusal2_SAL450G() {
            validarInputs({
                form: '#EVALUARSUC_SAL450G',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SAL450G.SUC2 = $('#suc2_SAL450G').val().toUpperCase();
                    $('#suc2_SAL450G').val(this.SAL450G.SUC2)
                    this._evaluarclase2_SAL450G()
                }
            )
        },
        _evaluarclase2_SAL450G() {
            _inputControl("disabled");
            $('#suc2_SAL450G').val(this.form.sucursal_SAL450G)
            this.SAL450G.SUC2 = this.form.sucursal_SAL450G
            $('#clase2_SAL450G').val(this.form.clasedeservicio_SAL450G)

            validarInputs({
                form: '#EVALUACLASE_SAL450G',
                orden: "1"
            },
                () => { this._evaluarsucusal2_SAL450G() },
                () => {
                    this.SAL450G.CLASE2 = $('#clase2_SAL450G').val()
                    $('#clase2_SAL450G').val(this.SAL450G.CLASE2)
                    this._evaluarcomprobante2_SAL450G()
                }
            )
        },
        _evaluarcomprobante2_SAL450G() {
            $('#comprobante2_SAL450G').val(this.form.comprobante_SAL450G.trim().padStart(6, '0'))
            validarInputs({
                form: '#EVALUACOMP_SAL450G',
                orden: "1"
            },
                () => { this._evaluarclase2_SAL450G() },
                () => {
                    this.SAL450G.COMPROB2 = $('#comprobante2_SAL450G').val()
                    $('#comprobante2_SAL450G').val(this.SAL450G.COMPROB2)
                    this._evaluarprefijo2_SAL450G()
                }
            )
        },
        _evaluarprefijo2_SAL450G() {
            $('#prefijo2_SAL450G').val(this.form.prefijofactura_SAL450G)
            validarInputs({
                form: '#EVALUAPREF_SAL450G',
                orden: "1"
            },
                () => { this._evaluarcomprobante2_SAL450G() },
                () => {
                    this.SAL450G.PREFIJO2 = $('#prefijo2_SAL450G').val().toUpperCase();
                    $('#prefijo2_SAL450G').val(this.SAL450G.PREFIJO2)
                    if (($_USUA_GLOBAL[0].PUC == 4 || $_USUA_GLOBAL[0].PUC == 6) && this.SAL450G.PREFIJO2 == 'E') {
                        this.SAL450G.PREFIJO2 = 'C'
                        $('#prefijo2_SAL450G').val(this.SAL450G.PREFIJO2)
                        this._evaluarnumero2_SAL450G()
                    } else {
                        if (this.SAL450G.PREFIJO2 != 'U' || this.SAL450G.PREFIJO2 != 'Ñ' || this.SAL450G.PREFIJO2 != 'V') {
                            this._evaluarnumero2_SAL450G()
                        } else {
                            CON851('03', '03', this._evaluarprefijo2_SAL450G(), 'error', 'Error');
                        }
                    }
                }
            )

        },
        _evaluarnumero2_SAL450G() {
            $('#factura2_SAL450G').val(this.form.numerofactura_SAL450G)
            validarInputs({
                form: '#EVALUAFACT_SAL450G',
                orden: "1"
            },
                () => { this._evaluarprefijo2_SAL450G() },
                () => {
                    this.SAL450G.NUMERO2 = $('#factura2_SAL450G').val()
                    $('#factura2_SAL450G').val(this.SAL450G.NUMERO2)
                    if (this.SAL450G.NUMERO2 == 'E' || this.SAL450G.NUMERO2 == 'C') {
                        $('.btn-primary').click();
                    } else {
                        postData({ datosh: datosEnvio() + this.SAL450G.PREFIJO2 + this.SAL450G.NUMERO2.padStart(6, '0') + "|" }, get_url("APP/SALUD/SER808-01.DLL"))
                            .then(data => {
                                console.log(data)
                                this.SAL450G.FACT2 = data.NUMER19[0];
                                this.SAL450G.ANOINGNUM = this.SAL450G.FACT2.FECHA_ING.substring(0, 4)
                                this.SAL450G.MESINGNUM = this.SAL450G.FACT2.FECHA_ING.substring(4, 6)
                                this.SAL450G.ESTADONUM = this.SAL450G.FACT2.ESTADO_NUM
                                this.SAL450G.BLOQNUM = this.SAL450G.FACT2.OPERBLOQ_NUM
                                this.SAL450G.TARIFANUM = this.SAL450G.FACT2.CONVENIO_NUM
                                if (this.SAL450G.ANOINGNUM == this.SAL450G.ANOFACT && this.SAL450G.MESINGNUM == this.SAL450G.MESFACT) {
                                    this._validacacionesnum2_SAL450G()
                                } else {
                                    CON851('', 'Factura de otro mes', this._validacacionesnum2_SAL450G(), 'error', 'Error');
                                }
                            })
                            .catch(err => {
                                console.error(err)
                                this._evaluarprefijo2_SAL450G()
                            });
                    }
                }
            )
        },
        _validacacionesnum2_SAL450G() {
            if (this.SAL450G.ESTADONUM == '1') {
                CON851('', 'Paciente retirado', null, 'error', 'Error');
            }
            if (this.SAL450G.ESTADONUM == '2') {
                CON851('', 'Factura anulada!', null, 'error', 'Error');
            }
            if (this.SAL450G.ESTADONUM == '3' && localStorage.Usuario != this.SAL450G.BLOQNUM) {
                CON851('', 'FACTURA BLOQUEADA ' + this.SAL450G.BLOQNUM, null, 'error', 'Error');
            }
            postData({ datosh: datosEnvio() + "A|" + localStorage.Usuario + '|' + this.form.sucursal_SAL450G + this.form.clasedeservicio_SAL450G + this.form.comprobante_SAL450G.trim().padStart(6, '0') + '| | | | | | | | | |' + this.SAL450G.TARIFANUM + '|' }, get_url("APP/SALUD/SAL450G.DLL"))
                .then(data => {
                    console.log(data, 'TARIFA')
                    this.SAL450G.TARIFAFACT = data
                    $('.btn-primary').click();
                })
                .catch(err => {
                    console.error(err)
                    this._evaluarcomprobante_SAL450G()
                });
        },
        _ventanatarifa_SAL450G() {
            $_this = this
            var ventanatarifa = bootbox.dialog({
                size: 'small',
                title: 'Atención! se cambio la tarifa',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Tarifa anterior' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="TARIFAANT_SAL450G"> ' +
                    '<input id="anterior_SAL450G" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Actual' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="TARIFAACT_SAL450G"> ' +
                    '<input id="actual_SAL450G" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="PARE_SAL450G"> ' +
                    '<input id="pare_SAL450G" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanatarifa.off('show.bs.modal');
                            setTimeout(() => { CON851P('01', $_this._evaluarcomprobante_SAL450G, $_this._grabarfactura2_SAL450G) }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanatarifa.off('show.bs.modal');
                            setTimeout(() => { CON851P('01', $_this._evaluarcomprobante_SAL450G, $_this._grabarfactura2_SAL450G) }, 500)
                        }
                    }
                }
            });
            ventanatarifa.init($('.modal-footer').hide());
            ventanatarifa.init(this._evaluarpare_SAL450G);
            ventanatarifa.on('shown.bs.modal', function () {
                $("#pare_SAL450G").focus();
            });
        },
        _evaluarpare_SAL450G() {
            _inputControl("disabled");
            $('#anterior_SAL450G').val($_this.form.convenio_SAL450G)
            $('#actual_SAL450G').val($_this.SAL450G.TARIFAFACT)
            validarInputs({
                form: '#PARE_SAL450G',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SAL450G.PARE = $('#pare_SAL450G').val()
                    $('.btn-primary').click();
                }
            )
        },
        _grabarfactura2_SAL450G() {
            postData({ datosh: datosEnvio() + "4|" + localStorage.Usuario + '|' + this.form.sucursal_SAL450G + this.form.clasedeservicio_SAL450G + this.form.comprobante_SAL450G.trim().padStart(6, '0') + '| | | | | |' + this.SAL450G.SUC2 + this.SAL450G.CLASE2 + this.SAL450G.COMPROB2.trim().padStart(6, '0') + '|' + this.SAL450G.PREFIJO2 + this.SAL450G.NUMERO2.padStart(6, '0') + '| | |' }, get_url("APP/SALUD/SAL450G.DLL"))
                .then(data => {
                    CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                })
                .catch(err => {
                    console.error(err)
                    this._evaluarcomprobante_SAL450G()
                });
        },
        ////////////////////////////OPCION 8 ///////////////////////////
        _modificarunidadserv_SAL450G() {
            var select = 0;
            for (var i in this.SAL450G.UNIDSERVICIO) {
                if (this.SAL450G.UNIDSERVICIO[i].DESCRIP.substring(0, 2).trim() == this.form.unidaddeservicio_SAL450G.substring(0, 2).trim()) {
                    select = i;
                }
            }
            console.log(select, 'SELECCION')
            POPUP({
                array: this.SAL450G.UNIDSERVICIO,
                titulo: "UNIDADES DE SERVICIO",
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                teclaAlterna: true,
                seleccion: select,
                callback_f: this._evaluarcomprobante_SAL450G
            },
                data => {
                    console.log(data.DESCRIP, 'UNIDAD DE SERVICIO NUEVA')
                    this.form.unidaddeservicio_SAL450G = data.DESCRIP;
                    this.SAL450G.UNDEDADMAXSERV = data.EDADMAX.substring(0, 1);
                    this.SAL450G.VLREDADMAXSERV = data.EDADMAX.substring(1, 4);
                    this.SAL450G.UNDEDADMINSERV = data.EDADMIN.substring(0, 1);
                    this.SAL450G.VLREDADMINSERV = data.EDADMIN.substring(1, 4);
                    this.SAL450G.CCOSTOSERV = data.CENCOS;
                    if ($_USUA_GLOBAL[0].NIT == 800037021 && localStorage.Usuario == 'JASP' && this.form.unidaddeservicio_SAL450G.substring(0, 2) < 11) {
                        CON851('03', '03', null, 'error', 'Error');
                        setTimeout(this._modificarunidadserv_SAL450G, 300);
                    } else {
                        if (this.form.clasedeservicio_SAL450G == '7') {
                            if (this.form.unidaddeservicio_SAL450G.substring(0, 2)) {
                                this._evaluarespecialidad_SAL450G()
                            } else {
                                CON851('03', '03', null, 'error', 'Error');
                                setTimeout(this._modificarunidadserv_SAL450G, 300);
                            }
                        } else {
                            this._evaluarespecialidad_SAL450G()
                        }
                    }
                }
            );
        },
        _evaluarespecialidad_SAL450G() {
            validarInputs({
                form: "#VALIDAR15_SAL450G",
                orden: "1"
            },
                () => { setTimeout(this._modificarunidadserv_SAL450G, 300) },
                () => {
                    if (this.form.especialidad_SAL450G.trim() == '') {
                        if (this.form.clasedeservicio_SAL450G == '0') {
                            this.form.especialidadd_SAL450G = ''
                            CON851P('01', $_this._evaluarcomprobante_SAL450G, $_this._grabarunidadserv_SAL450G)
                        } else {
                            CON851('02', '02', this._evaluarespecialidad_SAL450G(), 'error', 'Error');
                        }
                    } else {
                        postData({ datosh: `${datosEnvio()}C||||||||||||||${this.form.especialidad_SAL450G.trim()}|` },
                            get_url("APP/SALUD/SAL401.DLL"))
                            .then((data) => {
                                this.SAL450G.ESPECIALIDAD = data;
                                this.form.especialidadd_SAL450G = data.NOMBRE;
                                CON851P('01', $_this._evaluarcomprobante_SAL450G, $_this._grabarunidadserv_SAL450G)
                            })
                            .catch(error => {
                                console.error(error);
                                this._evaluarespecialidad_SAL450G()
                            });
                    }
                }
            )
        },
        _grabarunidadserv_SAL450G() {
            postData({ datosh: datosEnvio() + "5|" + localStorage.Usuario + '|' + this.form.sucursal_SAL450G + this.form.clasedeservicio_SAL450G + this.form.comprobante_SAL450G.trim().padStart(6, '0') + '| | | | | | | |' + this.form.unidaddeservicio_SAL450G.substring(0, 2) + '|' + this.form.especialidad_SAL450G + '|' }, get_url("APP/SALUD/SAL450G.DLL"))
                .then(data => {
                    CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                })
                .catch(err => {
                    console.error(err)
                    this._evaluarcomprobante_SAL450G()
                });

        },

        ////////////////////////////OPCION 9 /////////////////////////////////////////////





        ////////////////////////////////FINALIZA SUBMENU////////////////////////
        _ventanaclases_SAL450G() {

        },
        _ventanaformasdepago_SAL450G() {

        },
        _ventananumerodefactura_SAL450G() {

        },
        _ventanacomprobantes_SAL450G() {

        },
        _ventanaclientes_SAL450G() {

        },
        _ventanaalmacenes_SAL450G() {

        },

        _ventanaespecialidades_SAL450G() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE ESPECIALIDADES',
                columnas: ["CODIGO", "NOMBRE"],
                data: $_this.SAL450G.ESPECIALIDADES,
                callback_esc: function () {
                    $('.especialidad_SAL450G').focus();
                },
                callback: function (data) {
                    $_this.form.especialidad_SAL450G = data.CODIGO;
                    _enterInput('.especialidad_SAL450G');
                }
            });
        },
        _ventanaprofesionales_SAL450G() {
            loader("show");
            $_this = this;
            var PROFESIONALES_SAL450G = [];
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
                .then((data) => {
                    loader("hide");
                    data.ARCHPROF.pop();
                    PROFESIONALES_SAL450G = data.ARCHPROF;
                    let ESPECFILTER = PROFESIONALES_SAL450G.filter(x => {
                        for (var i in x.TAB_ESPEC) {
                            if (x.TAB_ESPEC[i].COD == $_this.form.especialidad_SAL450G) return x
                        }
                    })
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                        data: ESPECFILTER,
                        callback_esc: function () {
                            $('.atendido_SAL450G').focus();
                        },
                        callback: function (data) {
                            $_this.form.atendido_SAL450G = parseInt(data.IDENTIFICACION).toString();
                            _enterInput('.atendido_SAL450G');
                        }
                    });
                })
                .catch((error) => {
                    loader("hide");
                    console.error(error);
                    CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                    $('.atendido_SAL450G').focus();
                });
        },
        _ventanaprofesionalesremite_SAL450G() {
            loader('show');
            var PROFESIONALES_SAL450G = [];
            postData({ datosh: datosEnvio() },
                get_url("APP/SALUD/SER819.DLL"))
                .then((data) => {
                    loader("hide");
                    PROFESIONALES_SAL450G = data.ARCHPROF;
                    PROFESIONALES_SAL450G.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                        data: PROFESIONALES_SAL450G,
                        callback_esc: function () {
                            $('.solic_SAL450G').focus();
                        },
                        callback: function (data) {
                            $_this.form.solic_SAL450G = parseInt(data.IDENTIFICACION).toString();
                            _enterInput('.solic_SAL450G');
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                    CON851('', 'Ocurrio un error consultando los profesionales', null, 'error', 'Error');
                    $('.solic_SAL450G').focus();
                });

        },


    },
});





























