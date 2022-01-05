// // 01-09-2020 DIANA E: creado 
moment.locale('es')
var fecha_SER109F = IMask.createPipe({
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
    el: "#SER109F",
    data: {
        SER109F: [],
        form: {
            numeroprefijo_SER109F: "",
            entidad_SER109F: "",
            nombrepaciente_SER109F: "",
            estadofactura_SER109F: "",
            fechafactura_SER109F: "",
            operbloq_SER109F: "",
            observacion_SER109F: "",
            anexos_SER109F: "",
            fechafacturaano_SER109F: "",
            fechafacturames_SER109F: "",
            fechafacturadia_SER109F: "",
            valorsalmin_SER109F: "",
            topepoliza_SER109F: "",
            totalfact_SER109F: "",
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        this.SER109F.PREFIJOW = 'A';
        this.SER109F.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        this.SER109F.PUCUSU = $_USUA_GLOBAL[0].PUC;
        this.SER109F.NITUSU = $_USUA_GLOBAL[0].NIT;
        this.SER109F.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;

        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER109F.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER109F.FIRMAS = data;
                $_this._evaluarinicio_SER109F();
            })
        })
    },
    methods: {
        _evaluarinicio_SER109F() {
            let OPCIONES = new Object;
            OPCIONES = {
                '097433': this._mostrarcajasopc_SER109F,
                '097436': this._mostrarcajasopc_SER109F,
                '097439': this._mostrarcajasopc_SER109F,
                '09743A': this._mostrarcajasopc_SER109F,
            }
            let active = $('#navegacion').find('li.opcion-menu.active');
            this.SER109F.OPCIONACTIVA = active[0].attributes[2].nodeValue;
            let Nombreopcion = {
                '097433': '9,7,4,3,3 - Imprimir fact. orden de servicio',
                '097436': '9,7,4,3,6 - Imprimir fact. paquete integral',
                '097439': '9,7,4,3,9 - Imprimir fact. resolucion 3374',
                '09743A': '9,7,4,3,A - Imprimir fact. resumen tar. plena descto'
            }
            nombreOpcion(Nombreopcion[this.SER109F.OPCIONACTIVA]);
            let opcion = new Function();
            opcion = OPCIONES[active[0].attributes[2].nodeValue];
            opcion();
        },
        _mostrarcajasopc_SER109F() {
            if (this.SER109F.OPCIONACTIVA == '097433') {
                console.log('97433')
                $("#ORDENCONT_SER109F").removeClass("hidden");
                $("#VALIDAR10_SER109F").removeClass("hidden");
            } else if (this.SER109F.OPCIONACTIVA == '097436') {
                console.log('97436')
                $("#VALIDAR10_SER109J").removeClass("hidden");
            } else if (this.SER109F.OPCIONACTIVA == '097439') {
                console.log('97439')
                $("#VALIDAR10_SER109O").removeClass("hidden");
            } else {
                console.log('9743B')
                $("#VALIDAR10_SER109Q").removeClass("hidden");
            }
            this._evaluarprefijo_SER109F()
        },
        _evaluarprefijo_SER109F() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER109F',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER109F.PREFIJOW = prefijoMask_SER109F.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER109F.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER109F = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER109F();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER109F() {
            console.log('numero prefijo')
            validarInputs({
                form: '#VALIDAR2_SER109F',
                orden: '1'
            },
                this._evaluarprefijo_SER109F,
                () => {
                    this.SER109F.LLAVEW = this.SER109F.PREFIJOW + this.form.numeroprefijo_SER109F.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER109F.LLAVEW }, this._validarfactura_SER109F, this._evaluarnumeroprefijo_SER109F)
                }
            )
        },
        _validarfactura_SER109F(data1, data2) {
            console.log(data1, data2, 'VALLIDAR FACT',)
            this.SER109F.NUMERACION = data1;
            if (this.SER109F.NUMERACION.TIPOPACI_NUM == "X") this.SER109F.NUMERACION.TIPOPACI_NUM == '*';
            this.SER109F.FECHAPRENUM = this.SER109F.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER109F = this.SER109F.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER109F = this.SER109F.NUMERACION.NOMBREPAC_NUM.trim();
            let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
            this.form.estadofactura_SER109F = this.SER109F.NUMERACION.ESTADO_NUM + ' - ' + estado[this.SER109F.NUMERACION.ESTADO_NUM];
            if (this.SER109F.NUMERACION.ESTADO_NUM == '0' || this.SER109F.NUMERACION.ESTADO_NUM == '1') {
                $('#FECHARET_SER109F').removeClass('hidden');
                this.form.fechafactura_SER109F = fecha_SER109F(this.SER109F.NUMERACION.FECHARET_NUM)
            } else {
                $('#OPERBLOQ_SER109F').removeClass('hidden');
                this.form.operbloq_SER109F = this.SER109F.NUMERACION.OPERBLOQ_NUM
            }
            this.form.observacion_SER109F = this.SER109F.NUMERACION.OBSERV_NUM.trim()
            this.form.anexos_SER109F = this.SER109F.NUMERACION.ANEXOS_NUM.trim()
            this.SER109F.ANOINGNUM = this.SER109F.NUMERACION.FECHAING_NUM.substring(0, 4)
            if (parseInt(this.SER109F.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(this.SER109F.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER109F = this.SER109F.NUMERACION.FECHARET_NUM.substring(0, 4)
                    this.form.fechafacturames_SER109F = this.SER109F.NUMERACION.FECHARET_NUM.substring(4, 6)
                    this.form.fechafacturadia_SER109F = this.SER109F.NUMERACION.FECHARET_NUM.substring(6, 8)
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    this.form.fechafacturaano_SER109F = fechaactual.substring(0, 4)
                    this.form.fechafacturames_SER109F = fechaactual.substring(4, 6)
                    this.form.fechafacturadia_SER109F = fechaactual.substring(6, 8)
                }
            } else {
                this.form.fechafacturaano_SER109F = this.SER109F.NUMERACION.FECHAPRE_NUM.substring(0, 4)
                this.form.fechafacturames_SER109F = this.SER109F.NUMERACION.FECHAPRE_NUM.substring(4, 6)
                this.form.fechafacturadia_SER109F = this.SER109F.NUMERACION.FECHAPRE_NUM.substring(6, 8)
            }
            if (this.SER109F.PREFIJOW == 'T') {
                // if(data2)
                this.SER109F.VALORES = data2
                $('#VALORESCARTERA_109F').removeClass('hidden');
                this.form.valorsalmin_SER109F = this.SER109F.VALORES.SALMIN
                this.form.topepoliza_SER109F = this.SER109F.VALORES.TOPE
                this.form.totalfact_SER109F = this.SER109F.VALORES.TOTAL
            }
            if (this.SER109F.OPCIONACTIVA == '097433') {
                this._evaluarcontrato_SER109F()
            } else {
                this._afectarnumeracion_SER109F()
            }
        },
        _evaluarcontrato_SER109F() {
            console.log('contrato')
            contratoMask_SER109F.typedValue = 'N'
            validarInputs({
                form: '#ORDENCONT_SER109F',
                orden: '1'
            },
                () => { this._evaluarnumeroprefijo_SER109F() },
                () => {
                    if (contratoMask_SER109F.value.trim() == '') contratoMask_SER109F.typedValue = 'N'
                    this._afectarnumeracion_SER109F()
                }
            )
        },
        _afectarnumeracion_SER109F() {
            console.log('afctar numeracion')
            if (this.SER109F.NUMERACION.ESTADO_NUM == '0' || this.SER109F.NUMERACION.ESTADO_NUM == '3') {
                this._evaluarobservaciones_SER109F('1')
            } else {
                this._evaluarfechaimpresion_SER109F('1')
            }
        },
        _evaluarobservaciones_SER109F(orden) {
            console.log('observaciones', orden)
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR3_SER109F',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER109F() },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER109F = this.form.observacion_SER109F.toUpperCase();
                    this.form.anexos_SER109F = this.form.anexos_SER109F.toUpperCase();
                    if (this.form.estadofactura_SER109F.substring(0, 1) == '3' || this.form.estadofactura_SER109F.substring(0, 1) == '0') {
                        this._evaluarbloqueofactura_SER109F()
                    } else {
                        this._evaluarfechaimpresion_SER109F('1');
                    }
                }
            )
        },
        _evaluarbloqueofactura_SER109F() {
            _FloatText({ estado: 'off' })
            if (this.form.estadofactura_SER109F.substring(0, 1) == '3') {
                this._grabarnumeracion_SER109F()
            } else {
                bloqueoMask_SER109F.typedValue = 'N'
                validarInputs({
                    form: '#VALIDAR4_SER109F',
                    orden: '1'
                },
                    () => { this._evaluarobservaciones_SER109F('2') },
                    () => {
                        if (bloqueoMask_SER109F.value.trim() == '') bloqueoMask_SER109F.typedValue = 'N'
                        if (bloqueoMask_SER109F.value == 'S') this.form.estadofactura_SER109F = '3', this.form.operbloq_SER109F = localStorage.getItem('Usuario').trim();
                        this._grabarnumeracion_SER109F()
                    }
                )
            }
        },
        _grabarnumeracion_SER109F() {
            if (this.form.observacion_SER109F.trim() != this.SER109F.NUMERACION.OBSERV_NUM.trim() || this.form.anexos_SER109F.trim() != this.SER109F.NUMERACION.ANEXOS_NUM.trim() || this.form.estadofactura_SER109F.substring(0, 1) != this.SER109F.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109F.LLAVEW + '|' + this.form.observacion_SER109F + '|' + this.form.anexos_SER109F + '|' + this.form.estadofactura_SER109F.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarfechaimpresion_SER109F('1')
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarbloqueofactura_SER109F();
                        }
                    })
            } else {
                this._evaluarfechaimpresion_SER109F('1')
            }
        },
        _evaluarfechaimpresion_SER109F(orden) {
            validarInputs({
                form: '#VALIDAR6_SER109F',
                orden: orden,
            },
                this._evaluarbloqueofactura_SER109F,
                () => {
                    this.SER109F.FECHA = this.form.fechafacturaano_SER109F + this.form.fechafacturames_SER109F.padStart(2, '0') + this.form.fechafacturadia_SER109F.padStart(2, '0')
                    this.SER109F.ANONUM = this.SER109F.FECHA.substring(4, 6)
                    this._evaluaropcion_SER109F()
                }
            )
        },
        _evaluaropcion_SER109F() {
            if (this.SER109F.OPCIONACTIVA == '097433') {
                this._evaluarfiltrosimpresion_SER109F()
            } else if (this.SER109F.OPCIONACTIVA == '097436') {
                this._evaluardiscriminarpac_SER109J()
            } else if (this.SER109F.OPCIONACTIVA == '097439') {
                this._evaluardiscriminardrog_SER109O()
            } else {
                this._evaluartarifaplena_SER109Q();
            }
        },

        _evaluarfiltrosimpresion_SER109F() {
            ///////////SER109F- 97433///////////////FALTA HACERLO
            let URL = get_url("APP/SALUD/SER109F.DLL");
            postData({
                datosh: datosEnvio() + this.SER109F.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    this.SER109F.FACTURAS = data.FACTURA;
                    this._evaluarlistarmedico_SER109F()
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MENSAJE == '08') {
                        $('#VACIA_SER109F').removeClass('hidden');
                        facturavaciaMask_SER109F.typedValue = 'N';
                        this._evaluarimprimirvacia_SER109F();
                    } else {
                        console.error(error);
                        CON851('', 'Hubo un error con el cierre', this._evaluarnumeroprefijo_SER109F(), 'error', 'Error');
                    }
                })
        },
        _evaluardiscriminarpac_SER109J() {
            discriminarpacMask_SER109J.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR10_SER109J',
                orden: '1',
            },
                () => {
                    console.log('deberia regresar a evaluarfecha');
                    this._evaluarfechaimpresion_SER109F('1') ;
                },
                () => {
                    if (discriminarpacMask_SER109J.value.trim() == '') discriminarpacMask_SER109J.typedValue = 'N';
                    this._evaluarfiltrosimpresion_SER109J()
                }
            )
        },
        _evaluarfiltrosimpresion_SER109J() {
            ///////////SER109J- 97436///////////////FALTA HACERLO
            let URL = get_url("APP/SALUD/SER109J.DLL");
            postData({
                datosh: datosEnvio() + `${this.SER109F.LLAVEW}|${discriminarpacMask_SER109J.value.trim()}|${localStorage.Usuario}|`
            }, URL)
                .then((data) => {
                    this.SER109F.FACTURAS = data.FACTURA;
                    this._evaluarfacturaoriginal_SER109F();
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MENSAJE == '08') {
                        $('#VACIA_SER109F').removeClass('hidden');
                        facturavaciaMask_SER109F.typedValue = 'N';
                        this._evaluarimprimirvacia_SER109F();
                    } else {
                        console.error(error);
                        CON851('', 'Hubo un error con el cierre', this._evaluarnumeroprefijo_SER109F(), 'error', 'Error');
                    }
                })
        },
        _evaluardiscriminardrog_SER109O() {
            discriminardrogMask_SER109O.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR10_SER109O',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109F('1') },
                () => {
                    if (discriminardrogMask_SER109O.value.trim() == '') discriminardrogMask_SER109O.typedValue = 'N';
                    this._evaluarfiltrosimpresion_SER109O()
                }
            )
        },
        _evaluarfiltrosimpresion_SER109O() {
            ///////////SER109O- 97439///////////////FALTA HACERLO
            let URL = get_url("APP/SALUD/SER109O.DLL");
            postData({
                datosh: datosEnvio() + this.SER109F.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    this.SER109F.FACTURAS = data.FACTURA;
                    this._evaluarfacturaoriginal_SER109F()
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MENSAJE == '08') {
                        $('#VACIA_SER109F').removeClass('hidden');
                        facturavaciaMask_SER109F.typedValue = 'N';
                        this._evaluarimprimirvacia_SER109F();
                    } else {
                        console.error(error);
                        CON851('', 'Hubo un error con el cierre', this._evaluarnumeroprefijo_SER109F(), 'error', 'Error');
                    }
                })
        },
        _evaluartarifaplena_SER109Q() {
            tarifaplenaMask_SER109Q.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR10_SER109Q',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109F('1') },
                () => {
                    if (tarifaplenaMask_SER109Q.value.trim() == '') tarifaplenaMask_SER109Q.typedValue = 'N';
                    this._evaluarfiltrosimpresion_SER109Q()
                }
            )
        },
        _evaluarfiltrosimpresion_SER109Q() {
            ///////////SER109Q- 9743A///////////////FALTA HACERLO
            let URL = get_url("APP/SALUD/SER109Q.DLL");
            postData({
                datosh: datosEnvio() + `${this.SER109F.LLAVEW}|${tarifaplenaMask_SER109Q.value.trim()}|`
            }, URL)
                .then((data) => {
                    this.SER109F.FACTURAS = data.FACTURA;
                    this._evaluarfacturaoriginal_SER109F()
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MENSAJE == '08') {
                        $('#VACIA_SER109F').removeClass('hidden');
                        facturavaciaMask_SER109F.typedValue = 'N';
                        this._evaluarimprimirvacia_SER109F();
                    } else {
                        console.error(error);
                        CON851('', 'Hubo un error consultando las facturas', this._evaluarnumeroprefijo_SER109F(), 'error', 'Error');
                    }
                })
        },
        _evaluarlistarmedico_SER109F() {
            nombremedicoMask_SER109F.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR10_SER109F',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER109F('1') },
                () => {
                    if (nombremedicoMask_SER109F.value.trim() == '') nombremedicoMask_SER109F.typedValue = 'N';
                    this._evaluarfacturaoriginal_SER109F()
                }
            )
        },
        _evaluarfacturaoriginal_SER109F() {
            this.SER109F.TOTBASECOPAGO = this.SER109F.TOTCOPAGOFAME = this.SER109F.TOTCTAMODFAME = 0;
            for (var i in this.SER109F.FACTURAS){
                let valor = 0;
                if (this.SER109F.OPCIONACTIVA != '09743A') {valor = parseInt(this.SER109F.FACTURAS[i].VALOR.replace(/,/g,''))}
                else{valor = parseInt(this.SER109F.FACTURAS[i].VALOR_NETO.replace(/,/g,''))}
                console.log(valor)
                if (isNaN(valor)) valor = 0;
                if (this.SER109F.NUMERACION.ACUERDO260.trim() == 'S'){
                    this.SER109F.TOTBASECOPAGO = this.SER109F.TOTBASECOPAGO + valor;
                } else {
                    if (this.SER109F.OPCIONACTIVA != '097436'){
                        if (this.SER109F.OPCIONACTIVA != '097439'){
                            if (this.SER109F.FACTURAS[i].CUPS.trim() != '890701'){
                                this.SER109F.TOTBASECOPAGO = this.SER109F.TOTBASECOPAGO + valor;
                            }
                        } else {
                            if (this.SER109F.FACTURAS[i].CODIGO.trim() != '890701'){
                                this.SER109F.TOTBASECOPAGO = this.SER109F.TOTBASECOPAGO + valor;
                            }
                        }
                    } else {
                        this.SER109F.TOTBASECOPAGO = this.SER109F.TOTBASECOPAGO + valor;
                    }
                }
                if (this.SER109F.PREFIJOW != 'C' && this.SER109F.PREFIJOW != 'E' && this.SER109F.PREFIJOW != 'Ñ' && this.SER109F.PREFIJOW != 'O' && this.SER109F.PREFIJOW != 'T' && this.SER109F.PREFIJOW != 'V' && this.SER109F.PREFIJOW != 'X' && this.SER109F.PREFIJOW != 'Y' && this.SER109F.PREFIJOW != 'Z' && this.SER109F.PREFIJOW != 'W'){
                    if (this.SER109F.FACTURAS[i].TIPO_COPAGO == '1'){
                        if (this.SER109F.OPCIONACTIVA != '09743A'){
                            if (this.SER109F.FACTURAS[i].COPAGO.trim() != ''){
                                this.SER109F.TOTCOPAGOFAME = this.SER109F.TOTCOPAGOFAME + valor
                            }
                        } else {
                            if (this.SER109F.FACTURAS[i].COPAGO.trim() != '' || this.SER109F.FACTURAS[i].VALOR_COPAGOS.trim()){
                                this.SER109F.TOTCOPAGOFAME = this.SER109F.TOTCOPAGOFAME + valor
                            }
                        }
                    } else if (this.SER109F.FACTURAS[i].TIPO_COPAGO == '2'){
                        if (this.SER109F.OPCIONACTIVA != '09743A'){
                            if (this.SER109F.FACTURAS[i].COPAGO.trim() != ''){
                                this.SER109F.TOTCTAMODFAME = this.SER109F.TOTCTAMODFAME + valor
                            }
                        } else {
                            if (this.SER109F.FACTURAS[i].COPAGO.trim() != '' || this.SER109F.FACTURAS[i].VALOR_COPAGOS.trim()){
                                this.SER109F.TOTCTAMODFAME = this.SER109F.TOTCTAMODFAME + valor
                            }
                        }
                    } else {
                        if (this.SER109F.OPCIONACTIVA != '09743A'){
                            if (this.SER109F.FACTURAS[i].COPAGO.trim() != ''){
                                this.SER109F.TOTCTAMODFAME = this.SER109F.TOTCTAMODFAME + valor
                            }
                        } else {
                            if (this.SER109F.FACTURAS[i].COPAGO.trim() != '' || this.SER109F.FACTURAS[i].VALOR_COPAGOS.trim()){
                                this.SER109F.TOTCTAMODFAME = this.SER109F.TOTCTAMODFAME + valor
                            }
                        }
                    }
                }
            }
            validarInputs({
                form: '#VALIDAR11_SER109F',
                orden: '1',
            },
                () => { 
                    if (this.SER109F.OPCIONACTIVA == '097436'){
                        this._evaluardiscriminarpac_SER109J();
                    } else if (this.SER109F.OPCIONACTIVA == '09743A') {
                        this._evaluartarifaplena_SER109Q();
                    } else if (this.SER109F.OPCIONACTIVA == '097439') {
                        this._evaluardiscriminardrog_SER109O();
                    } else {
                        this._evaluarlistarmedico_SER109F();
                    }
                },
                () => {
                    if (facturaoriginalMask_SER109F.value.trim() == '') facturaoriginalMask_SER109F.typedValue = 'N';
                    this.SER109F.SWORIGINALN = facturaoriginalMask_SER109F.value;
                    if ((this.SER109F.PREFIJOW == 'P' || this.SER109F.PREFIJOW == 'T') && parseFloat(this.SER109F.NUMERACION.PORCECOPAGO_NUM) > 0) {
                        if (this.form.estadofactura_SER109F.substring(0, 1) == '0' || this.form.estadofactura_SER109F.substring(0, 1) == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER109F.LLAVEW + '|' + this.SER109F.NUMERACION.IDPAC_NUM + '|' + this.SER109F.NUMERACION.DESCRIP_PACI.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER109F.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    setTimeout( () => {
                                        _liquidacioncopagos_SALUD(this._datosimpresion_SER109F, this._evaluarfacturaoriginal_SER109F, params = { NUMERACION: this.SER109F.NUMERACION, LLAVE_NUM: this.SER109F.LLAVEW, TOTBASECOPAGO: this.SER109F.TOTBASECOPAGO });
                                    }, 300 );
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109F();
                                });
                        }
                    } else {
                        this._datosimpresion_SER109F();
                    }
                }
            )
        },
        _evaluarimprimirvacia_SER109F() {
            validarInputs({
                form: '#VALIDAR5_SER109F',
                orden: '1'
            },
                () => { this._evaluarfechaimpresion_SER109F('1') },
                () => {
                    if (facturavaciaMask_SER109F.value.trim() == '') facturavaciaMask_SER109F.typedValue = 'N'
                    if (facturavaciaMask_SER109F == 'S') {
                        console.log('IMPRESION EN BLANCO')
                        this._datosimpresion_SER10A9()
                    } else {
                        _toggleNav()
                    }

                }
            )
        },
        /////////////////IMPRESION////////////////////////////////////
        _datosimpresion_SER109F(data) {
            if (data){
                this.SER109F.NUMERACION.COPAGOEST_NUM = data.COPAGO;
                this.SER109F.NUMERACION.PORCECOPAGO_NUM = data.PORCENTAJE;
            }
            if (this.SER109F.OPCIONACTIVA == '097433') {
                let impresion_SER109F = new Object;
                let original = {
                    'S': '*** ORIGINAL ***',
                    'N': '*** COPIA ***'
                };
                impresion_SER109F.ORIGINAL = original[facturaoriginalMask_SER109F.value.trim()];
                // impresion_SER109F.FECHAVENCE = 
                let fecha = '';
                if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4)) < 90) {
                    fecha = moment('20' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                } else {
                    fecha = moment('19' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                }
                impresion_SER109F.FECHA = fecha.toUpperCase();
                impresion_SER109F.LLAVE = `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`
                impresion_SER109F.NOMTER = this.SER109F.NUMERACION.DESCRIP_TER;
                impresion_SER109F.NITTER = this.SER109F.NUMERACION.NIT_TER;
                impresion_SER109F.DVTER = this.SER109F.NUMERACION.DV_TER;
                impresion_SER109F.DIRECCTER = this.SER109F.NUMERACION.DIRECC_TER;
                impresion_SER109F.TELTER = this.SER109F.NUMERACION.TEL_TER;
                impresion_SER109F.CIUDADTER = this.SER109F.NUMERACION.CIUDAD_TER;
                impresion_SER109F.TARIF = 1;
                impresion_SER109F.DESCRIPTAR = this.SER109F.NUMERACION.CONVENIO_NUM;
                if (this.SER109F.NUMERACION.FACTCAPIT_NUM == `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`) {
                    impresion_SER109F.REGIMEN = 'CAPITA'
                } else {
                    impresion_SER109F.REGIMEN = 'EVENTO'
                }
                let tipopaci = {
                    'C': 'CONTRIBUTIVO',
                    'S': 'SUBSIDIADO',
                    'V': 'VINCULADO',
                    'P': 'PARTICULAR',
                    'O': 'OTRO TIPO',
                    'D': 'DESPLAZADO CONTRIBUTIV',
                    'E': 'DESPLAZADO SUBSIDIADO',
                    'F': 'DESPLAZADO VINCULADO',
                    'X': ' '
                }
                impresion_SER109F.TIPOPACI = tipopaci[this.SER109F.NUMERACION.TIPOPACI_NUM];
                impresion_SER109F.OBSERVACION = this.SER109F.NUMERACION.OBSERV_NUM;
                impresion_SER109F.ANEXOSNUM = this.SER109F.NUMERACION.ANEXOS_NUM;
                impresion_SER109F.FORMATOTABLA = 1;
                impresion_SER109F.WIDTH = ['5%', '8%', '19%', '5%', '4%', '25%', '3%', '8%', '8%', '5%', '8%', '3%'];
                impresion_SER109F.COLUMNAS = ["NRO_FACT", "FECHA", "DETALLE", "EDAD", "SEXO", "CONCEPTO", "CANT", "VALOR", "COPAGO", "AUTOR", "CUPS", "ESPEC"];
                impresion_SER109F.FACTURAS = this.SER109F.FACTURAS;
                impresion_SER109F.TABLARBOS_NUM = this.SER109F.NUMERACION.TABLARBOS_NUM;
                impresion_SER109F.COPAGO = this.SER109F.NUMERACION.COPAGO_NUM;
                let valorfact = 0;
                let copago = 0;
                let iva = 0;
                for (var i in this.SER109F.FACTURAS) {
                    let valor1 = parseFloat(this.SER109F.FACTURAS[i].VALOR.replace(/,/g,'').trim().padStart(15, '0'))
                    if (isNaN(valor1)) valor1 = 0;
                    let valor2 = parseFloat(this.SER109F.FACTURAS[i].COPAGO.replace(/,/g,'').trim().padStart(15, '0'))
                    if (isNaN(valor2)) valor2 = 0;
                    let valor3 = parseFloat(this.SER109F.FACTURAS[i].IVA.replace(/,/g,'').trim().padStart(15, '0'))
                    if (isNaN(valor3)) valor3 = 0;
                    valorfact = valor1 + valorfact;
                    copago = valor2 + copago;
                    iva = valor3 + iva;
                }
                let abonocopago = 0;
                for (var i in this.SER109F.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(0, 1) != 'G' && this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(1, 2) == 'R' && this.SER109F.NUMERACION.COPAGO_NUM != 0) {
                        if (parseInt(this.SER109F.NUMERACION.TABLARBOS_NUM[i].FECHAABON_NUM) <= parseInt(this.SER109F.NUMERACION.FECHAPRE_NUM)) {
                            let valor = parseFloat(this.SER109F.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM);
                            if (isNaN(valor)) valor = 0;
                            abonocopago = valor + abonocopago;
                        }
                    }
                }
                impresion_SER109F.TABLARBOS_NUM = this.SER109F.NUMERACION.TABLARBOS_NUM;
                if ($_USUA_GLOBAL[0].NIT == 891855847) {
                    impresion_SER109F.SALDOCOPAGO = 0;
                } else {
                    if (($_USUA_GLOBAL[0].PUC == '6' || $_USUA_GLOBAL[0].PUC == '4') && ($_USUA_GLOBAL[0].NIT == 9990 || $_USUA_GLOBAL[0].NIT == 9999) && parseInt(this.SER109F.NUMERACION.FECHAING_NUM) > 20070903) {
                        impresion_SER109F.SALDOCOPAGO = parseInt(this.SER109F.NUMERACION.COPAGOEST_NUM) + abonocopago;
                    } else {
                        if (abonocopago != 0) {
                            impresion_SER109F.SALDOCOPAGO = 0;
                        } else {
                            impresion_SER109F.SALDOCOPAGO = parseInt(this.SER109F.NUMERACION.CO_PAGO_NUM);
                        }
                    }
                }
                console.log(impresion_SER109F.SALDOCOPAGO, this.SER109F.NUMERACION.COPAGO_NUM);
                impresion_SER109F.SALDO = valorfact - parseInt(this.SER109F.NUMERACION.COPAGO_NUM) - impresion_SER109F.SALDOCOPAGO;
                impresion_SER109F.VLRTOTAL = valorfact;
                let valorenletras = FAC146(valorfact);
                impresion_SER109F.NUMEROENLETRAS = valorenletras;
                let prefijo = this.SER109F.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109F.value.trim())
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = prefijoMask_SER109F.value.trim();
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                impresion_SER109F.PREFIJO = prefijo;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion_SER109F.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion_SER109F.FIRMA1 = this.SER109F.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                impresion_SER109F.OPERNUM = this.SER109F.NUMERACION.OPER_NUM;
                impresion_SER109F.OPERMODNUM = this.SER109F.NUMERACION.OPERMOD_NUM;
                impresion_SER109F.OPERBLOQNUM = this.SER109F.NUMERACION.OPERBLOQ_NUM;
                impresion_SER109F.ADMINW = localStorage.getItem('Usuario').trim();
                impresion_SER109F.FECHAIMPRESION = moment().format('YYMMDD');
                impresion_SER109F.FECHAOPER = moment(this.SER109F.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109F.FECHAOPER == 'Invalid date') impresion_SER109F.FECHAOPER = '000000'
                impresion_SER109F.FECHAMODOPER = moment(this.SER109F.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109F.FECHAMODOPER == 'Invalid date') impresion_SER109F.FECHAMODOPER = '000000'
                impresion_SER109F.FECHARETOPER = moment(this.SER109F.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109F.FECHARETOPER == 'Invalid date') impresion_SER109F.FECHARETOPER = '000000'
                impresion_SER109F.MARGIN = [10, 160, 10, 20];
                impresion_SER109F.IMPRESION = 'SER109F';
                impresion_SER109F.PREFIJOW = prefijoMask_SER109F.value.trim();
                _impresionformatoSER109(impresion_SER109F, this._cerrarnumeracion_SER109F, this._evaluarfacturaoriginal_SER109F);
            }
            if (this.SER109F.OPCIONACTIVA == '097436') {
                let impresion_SER109J = new Object;
                let original = {
                    'S': '*** ORIGINAL ***',
                    'N': '*** COPIA ***'
                };
                impresion_SER109J.ORIGINAL = original[facturaoriginalMask_SER109F.value.trim()];
                // impresion_SER109J.FECHAVENCE = 
                let fecha = '';
                if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4)) < 90) {
                    fecha = moment('20' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                } else {
                    fecha = moment('19' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                }
                impresion_SER109J.FECHA = fecha.toUpperCase();
                impresion_SER109J.LLAVE = `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`
                impresion_SER109J.NOMTER = this.SER109F.NUMERACION.DESCRIP_TER;
                impresion_SER109J.NITTER = this.SER109F.NUMERACION.NIT_TER;
                impresion_SER109J.DVTER = this.SER109F.NUMERACION.DV_TER;
                impresion_SER109J.DIRECCTER = this.SER109F.NUMERACION.DIRECC_TER;
                impresion_SER109J.TELTER = this.SER109F.NUMERACION.TEL_TER;
                impresion_SER109J.CIUDADTER = this.SER109F.NUMERACION.CIUDAD_TER;
                impresion_SER109J.TARIF = 1;
                impresion_SER109J.DESCRIPTAR = this.SER109F.NUMERACION.CONVENIO_NUM;
                if (this.SER109F.NUMERACION.FACTCAPIT_NUM == `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`) {
                    impresion_SER109J.REGIMEN = 'CAPITA'
                } else {
                    impresion_SER109J.REGIMEN = 'EVENTO'
                }
                let tipopaci = {
                    'C': 'CONTRIBUTIVO',
                    'S': 'SUBSIDIADO',
                    'V': 'VINCULADO',
                    'P': 'PARTICULAR',
                    'O': 'OTRO TIPO',
                    'D': 'DESPLAZADO CONTRIBUTIV',
                    'E': 'DESPLAZADO SUBSIDIADO',
                    'F': 'DESPLAZADO VINCULADO',
                    'X': ' '
                }
                impresion_SER109J.TIPOPACI = tipopaci[this.SER109F.NUMERACION.TIPOPACI_NUM];
                impresion_SER109J.OBSERVACION = this.SER109F.NUMERACION.OBSERV_NUM;
                impresion_SER109J.ANEXOSNUM = this.SER109F.NUMERACION.ANEXOS_NUM;
                impresion_SER109J.FORMATOTABLA = 3;
                impresion_SER109J.WIDTH = [ '41%', '21%', '10%', '10%', '10%', '10%' ];
                impresion_SER109J.COLUMNAS = ["PACIENTE", "CONCEPTO", "VALOR", "CODIGO", "FECHA", "CODEQUIV"];
                impresion_SER109J.FACTURAS = this.SER109F.FACTURAS;
                impresion_SER109J.COPAGO = this.SER109F.NUMERACION.COPAGO_NUM;
                let valorfact = 0;
                let copago = 0;
                for (var i in this.SER109F.FACTURAS) {
                    valorfact = parseFloat(this.SER109F.FACTURAS[i].VALOR.trim().padStart(15, '0')) + valorfact;
                    copago = parseFloat(this.SER109F.FACTURAS[i].COPAGO.trim().padStart(15, '0')) + copago;
                }
                let abonocopago = 0;
                for (var i in this.SER109F.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(0, 1) != 'G' && this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(1, 2) == 'R' && this.SER109F.NUMERACION.COPAGO_NUM != 0) {
                        if (parseInt(this.SER109F.NUMERACION.TABLARBOS_NUM[i].FECHAABON_NUM) <= parseInt(this.SER109F.NUMERACION.FECHAPRE_NUM)) {
                            abonocopago = parseFloat(this.SER109F.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + abonocopago;
                        }
                    }
                }
                if ($_USUA_GLOBAL[0].NIT == 891855847) {
                    impresion_SER109J.SALDOCOPAGO = 0;
                } else {
                    if (($_USUA_GLOBAL[0].PUC == '6' || $_USUA_GLOBAL[0].PUC == '4') && ($_USUA_GLOBAL[0].NIT == 9990 || $_USUA_GLOBAL[0].NIT == 9999) && parseInt(this.SER109F.NUMERACION.FECHAING_NUM) > 20070903) {
                        impresion_SER109J.SALDOCOPAGO = parseInt(this.SER109F.NUMERACION.COPAGO_NUM) + abonocopago;
                    } else {
                        if (abonocopago != 0) {
                            impresion_SER109J.SALDOCOPAGO = 0;
                        } else {
                            impresion_SER109J.SALDOCOPAGO = parseInt(this.SER109F.NUMERACION.COPAGO_NUM);
                        }
                    }
                }
                impresion_SER109J.SALDO = valorfact - parseInt(this.SER109F.NUMERACION.COPAGO_NUM) - impresion_SER109J.SALDOCOPAGO;
                impresion_SER109J.VLRTOTAL = valorfact;
                let valorenletras = FAC146(valorfact);
                impresion_SER109J.NUMEROENLETRAS = valorenletras;
                let prefijo = this.SER109F.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109F.value.trim())
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = prefijoMask_SER109F.value.trim();
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                impresion_SER109J.PREFIJO = prefijo;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion_SER109J.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion_SER109J.FIRMA1 = this.SER109F.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                impresion_SER109J.OPERNUM = this.SER109F.NUMERACION.OPER_NUM;
                impresion_SER109J.OPERMODNUM = this.SER109F.NUMERACION.OPERMOD_NUM;
                impresion_SER109J.OPERBLOQNUM = this.SER109F.NUMERACION.OPERBLOQ_NUM;
                impresion_SER109J.ADMINW = localStorage.getItem('Usuario').trim();
                impresion_SER109J.FECHAIMPRESION = moment().format('YYMMDD');
                impresion_SER109J.FECHAOPER = moment(this.SER109F.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109J.FECHAOPER == 'Invalid date') impresion_SER109J.FECHAOPER = '000000'
                impresion_SER109J.FECHAMODOPER = moment(this.SER109F.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109J.FECHAMODOPER == 'Invalid date') impresion_SER109J.FECHAMODOPER = '000000'
                impresion_SER109J.FECHARETOPER = moment(this.SER109F.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109J.FECHARETOPER == 'Invalid date') impresion_SER109J.FECHARETOPER = '000000'
                impresion_SER109J.MARGIN = [10, 160, 10, 20];
                impresion_SER109J.IMPRESION = 'SER109F';
                _impresionformatoSER109(impresion_SER109J, this._cerrarnumeracion_SER109F, this._evaluarfacturaoriginal_SER109F);
            } if (this.SER109F.OPCIONACTIVA == '097439'){
                let impresion_SER109O = new Object;
                let original = {
                    'S': '*** ORIGINAL ***',
                    'N': '*** COPIA ***'
                };
                impresion_SER109O.ORIGINAL = original[facturaoriginalMask_SER109F.value.trim()];
                // impresion_SER109O.FECHAVENCE = 
                let fecha = '';
                if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4)) < 90) {
                    fecha = moment('20' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                } else {
                    fecha = moment('19' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                }
                impresion_SER109O.FECHA = fecha.toUpperCase();
                impresion_SER109O.LLAVE = `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`
                impresion_SER109O.NOMTER = this.SER109F.NUMERACION.DESCRIP_TER;
                impresion_SER109O.NITTER = this.SER109F.NUMERACION.NIT_TER;
                impresion_SER109O.DVTER = this.SER109F.NUMERACION.DV_TER;
                impresion_SER109O.DIRECCTER = this.SER109F.NUMERACION.DIRECC_TER;
                impresion_SER109O.TELTER = this.SER109F.NUMERACION.TEL_TER;
                impresion_SER109O.CIUDADTER = this.SER109F.NUMERACION.CIUDAD_TER;
                impresion_SER109O.TARIF = 1;
                impresion_SER109O.DESCRIPTAR = this.SER109F.NUMERACION.CONVENIO_NUM;
                if (this.SER109F.NUMERACION.FACTCAPIT_NUM == `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`) {
                    impresion_SER109O.REGIMEN = 'CAPITA'
                } else {
                    impresion_SER109O.REGIMEN = 'EVENTO'
                }
                let tipopaci = {
                    'C': 'CONTRIBUTIVO',
                    'S': 'SUBSIDIADO',
                    'V': 'VINCULADO',
                    'P': 'PARTICULAR',
                    'O': 'OTRO TIPO',
                    'D': 'DESPLAZADO CONTRIBUTIV',
                    'E': 'DESPLAZADO SUBSIDIADO',
                    'F': 'DESPLAZADO VINCULADO',
                    'X': ' '
                }
                impresion_SER109O.TIPOPACI = tipopaci[this.SER109F.NUMERACION.TIPOPACI_NUM];
                impresion_SER109O.OBSERVACION = this.SER109F.NUMERACION.OBSERV_NUM;
                impresion_SER109O.ANEXOSNUM = this.SER109F.NUMERACION.ANEXOS_NUM;
                impresion_SER109O.FORMATOTABLA = 4;
                impresion_SER109O.WIDTH = [ '6%', '3%', '4%', '20%', '21%', '21%','4%','6%', '3%','12%' ];
                impresion_SER109O.COLUMNAS = ["CODIGO", "NRO_FACT", "FECHA", "DESCRIP_MEDICO", "DETALLE", "CONCEPTO", "CANT", "VALOR", "ESPEC", "NOMBRE_ESPEC"];
                impresion_SER109O.FACTURAS = this.SER109F.FACTURAS;
                impresion_SER109O.COPAGO = this.SER109F.NUMERACION.COPAGO_NUM;
                let valorfact = 0;
                let copago = 0;
                for (var i in this.SER109F.FACTURAS) {
                    valorfact = parseFloat(this.SER109F.FACTURAS[i].VALOR.trim().padStart(15, '0')) + valorfact;
                    copago = parseFloat(this.SER109F.FACTURAS[i].COPAGO.trim().padStart(15, '0')) + copago;
                }
                let abonocopago = 0;
                for (var i in this.SER109F.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(0, 1) != 'G' && this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(1, 2) == 'R' && this.SER109F.NUMERACION.COPAGO_NUM != 0) {
                        if (parseInt(this.SER109F.NUMERACION.TABLARBOS_NUM[i].FECHAABON_NUM) <= parseInt(this.SER109F.NUMERACION.FECHAPRE_NUM)) {
                            abonocopago = parseFloat(this.SER109F.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + abonocopago;
                        }
                    }
                }
                impresion_SER109O.TABLARBOS_NUM = this.SER109F.NUMERACION.TABLARBOS_NUM;
                if ($_USUA_GLOBAL[0].NIT == 891855847) {
                    impresion_SER109O.SALDOCOPAGO = 0;
                } else {
                    if (($_USUA_GLOBAL[0].PUC == '6' || $_USUA_GLOBAL[0].PUC == '4') && ($_USUA_GLOBAL[0].NIT == 9990 || $_USUA_GLOBAL[0].NIT == 9999) && parseInt(this.SER109F.NUMERACION.FECHAING_NUM) > 20070903) {
                        impresion_SER109O.SALDOCOPAGO = parseInt(this.SER109F.NUMERACION.CO_PAGO_NUM) + abonocopago;
                    } else {
                        if (abonocopago != 0) {
                            impresion_SER109O.SALDOCOPAGO = 0;
                        } else {
                            impresion_SER109O.SALDOCOPAGO = parseInt(this.SER109F.NUMERACION.CO_PAGO_NUM);
                        }
                    }
                }
                impresion_SER109O.SALDO = valorfact - parseInt(this.SER109F.NUMERACION.COPAGO_NUM) - impresion_SER109O.SALDOCOPAGO;
                impresion_SER109O.VLRTOTAL = valorfact;
                let valorenletras = FAC146(valorfact);
                impresion_SER109O.NUMEROENLETRAS = valorenletras;
                let prefijo = this.SER109F.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109F.value.trim())
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = prefijoMask_SER109F.value.trim();
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                impresion_SER109O.PREFIJO = prefijo;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion_SER109O.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion_SER109O.FIRMA1 = this.SER109F.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                impresion_SER109O.OPERNUM = this.SER109F.NUMERACION.OPER_NUM;
                impresion_SER109O.OPERMODNUM = this.SER109F.NUMERACION.OPERMOD_NUM;
                impresion_SER109O.OPERBLOQNUM = this.SER109F.NUMERACION.OPERBLOQ_NUM;
                impresion_SER109O.ADMINW = localStorage.getItem('Usuario').trim();
                impresion_SER109O.FECHAIMPRESION = moment().format('YYMMDD');
                impresion_SER109O.FECHAOPER = moment(this.SER109F.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109O.FECHAOPER == 'Invalid date') impresion_SER109O.FECHAOPER = '000000'
                impresion_SER109O.FECHAMODOPER = moment(this.SER109F.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109O.FECHAMODOPER == 'Invalid date') impresion_SER109O.FECHAMODOPER = '000000'
                impresion_SER109O.FECHARETOPER = moment(this.SER109F.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109O.FECHARETOPER == 'Invalid date') impresion_SER109O.FECHARETOPER = '000000'
                impresion_SER109O.MARGIN = [10, 160, 10, 20];
                impresion_SER109O.IMPRESION = 'SER109F';
                impresion_SER109O.estilohoja = '2'
                _impresionformatoSER109(impresion_SER109O, this._cerrarnumeracion_SER109F, this._evaluarfacturaoriginal_SER109F);
            } if (this.SER109F.OPCIONACTIVA == '09743A'){
                let impresion_SER109Q = new Object;
                let original = {
                    'S': '*** ORIGINAL ***',
                    'N': '*** COPIA ***'
                };
                impresion_SER109Q.ORIGINAL = original[facturaoriginalMask_SER109F.value.trim()];
                // impresion_SER109Q.FECHAVENCE = 
                let fecha = '';
                if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4)) < 90) {
                    fecha = moment('20' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                } else {
                    fecha = moment('19' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
                }
                impresion_SER109Q.FECHA = fecha.toUpperCase();
                impresion_SER109Q.LLAVE = `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`
                impresion_SER109Q.NOMTER = this.SER109F.NUMERACION.DESCRIP_TER;
                impresion_SER109Q.NITTER = this.SER109F.NUMERACION.NIT_TER;
                impresion_SER109Q.DVTER = this.SER109F.NUMERACION.DV_TER;
                impresion_SER109Q.DIRECCTER = this.SER109F.NUMERACION.DIRECC_TER;
                impresion_SER109Q.TELTER = this.SER109F.NUMERACION.TEL_TER;
                impresion_SER109Q.CIUDADTER = this.SER109F.NUMERACION.CIUDAD_TER;
                impresion_SER109Q.TARIF = 1;
                impresion_SER109Q.DESCRIPTAR = this.SER109F.NUMERACION.CONVENIO_NUM;
                if (this.SER109F.NUMERACION.FACTCAPIT_NUM == `${prefijoMask_SER109F.value.trim()}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6, '0')}`) {
                    impresion_SER109Q.REGIMEN = 'CAPITA'
                } else {
                    impresion_SER109Q.REGIMEN = 'EVENTO'
                }
                let tipopaci = {
                    'C': 'CONTRIBUTIVO',
                    'S': 'SUBSIDIADO',
                    'V': 'VINCULADO',
                    'P': 'PARTICULAR',
                    'O': 'OTRO TIPO',
                    'D': 'DESPLAZADO CONTRIBUTIV',
                    'E': 'DESPLAZADO SUBSIDIADO',
                    'F': 'DESPLAZADO VINCULADO',
                    'X': ' '
                }
                impresion_SER109Q.TIPOPACI = tipopaci[this.SER109F.NUMERACION.TIPOPACI_NUM];
                impresion_SER109Q.OBSERVACION = this.SER109F.NUMERACION.OBSERV_NUM;
                impresion_SER109Q.ANEXOSNUM = this.SER109F.NUMERACION.ANEXOS_NUM;
                impresion_SER109Q.FORMATOTABLA = 7;
                impresion_SER109Q.WIDTH = [ '40.3%', '20.4%', '20%' ];
                impresion_SER109Q.COLUMNAS = ["CONCEPTO", "CANT", "VALOR_BRUTO"];
                impresion_SER109Q.FACTURAS = this.SER109F.FACTURAS;
                impresion_SER109Q.COPAGO = parseInt(this.SER109F.NUMERACION.COPAGO_NUM);
                impresion_SER109Q.COPAGOS = parseInt(this.SER109F.NUMERACION.CO_PAGO_NUM);
                let valorfact = 0;
                let valorbruto = 0;
                let iva = 0;
                let copagos = 0;
                let cuotam = 0;
                for (var i in this.SER109F.FACTURAS) {
                    valorfact = parseFloat(this.SER109F.FACTURAS[i].VALOR_NETO.trim().padStart(15, '0')) + valorfact;
                    valorbruto = parseFloat(this.SER109F.FACTURAS[i].VALOR_BRUTO.trim().padStart(15, '0')) + valorbruto;
                    iva = parseFloat(this.SER109F.FACTURAS[i].VALOR_IVA.trim().padStart(15, '0')) + iva;
                    copagos = parseFloat(this.SER109F.FACTURAS[i].VALOR_COPAGOS.trim().padStart(15, '0')) + copagos;
                    cuotam = parseFloat(this.SER109F.FACTURAS[i].COPAGO.trim().padStart(15, '0')) + cuotam;
                }
                if (valorbruto == 0) valorbruto = valorfact;
                impresion_SER109Q.VALORBRUTO = valorbruto
                impresion_SER109Q.DESCUENTOS = valorbruto - valorfact;
                impresion_SER109Q.NETOFACTURADO = valorfact;
                impresion_SER109Q.COPAGOSW = copagos;
                impresion_SER109Q.CUOTAM = cuotam;
                let abonocopago = 0;
                for (var i in this.SER109F.NUMERACION.TABLARBOS_NUM) {
                    if (this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(0, 1) != 'G' && this.SER109F.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(1, 2) == 'R' && this.SER109F.NUMERACION.COPAGO_NUM != 0) {
                        if (parseInt(this.SER109F.NUMERACION.TABLARBOS_NUM[i].FECHAABON_NUM) <= parseInt(this.SER109F.NUMERACION.FECHAPRE_NUM)) {
                            abonocopago = parseFloat(this.SER109F.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + abonocopago;
                        }
                    }
                }
                impresion_SER109Q.TABLARBOS_NUM = this.SER109F.NUMERACION.TABLARBOS_NUM;
                impresion_SER109Q.ABONOS = abonocopago;
                impresion_SER109Q.SALDO = valorfact + abonocopago + iva - copagos - cuotam;
                impresion_SER109Q.VLRTOTAL = valorfact;
                let valorenletras = FAC146(valorfact);
                impresion_SER109Q.NUMEROENLETRAS = valorenletras;
                let prefijo = this.SER109F.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109F.value.trim())
                if (prefijo.length == 0) {
                    prefijo[0] = new Object;
                    prefijo[0].AUT_DIAN = '';
                    prefijo[0].PREFIJO = prefijoMask_SER109F.value.trim();
                    prefijo[0].DESDE_NRO = '';
                    prefijo[0].HASTA_NRO = '';
                }
                impresion_SER109Q.PREFIJO = prefijo;
                if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                    impresion_SER109Q.FIRMA1 = localStorage.getItem('IDUSU')
                } else {
                    impresion_SER109Q.FIRMA1 = this.SER109F.FIRMAS[0].DATOS_GER.substring(0, 10)
                }
                impresion_SER109Q.OPERNUM = this.SER109F.NUMERACION.OPER_NUM;
                impresion_SER109Q.OPERMODNUM = this.SER109F.NUMERACION.OPERMOD_NUM;
                impresion_SER109Q.OPERBLOQNUM = this.SER109F.NUMERACION.OPERBLOQ_NUM;
                impresion_SER109Q.ADMINW = localStorage.getItem('Usuario').trim();
                impresion_SER109Q.FECHAIMPRESION = moment().format('YYMMDD');
                impresion_SER109Q.FECHAOPER = moment(this.SER109F.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109Q.FECHAOPER == 'Invalid date') impresion_SER109Q.FECHAOPER = '000000'
                impresion_SER109Q.FECHAMODOPER = moment(this.SER109F.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109Q.FECHAMODOPER == 'Invalid date') impresion_SER109Q.FECHAMODOPER = '000000'
                impresion_SER109Q.FECHARETOPER = moment(this.SER109F.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                if (impresion_SER109Q.FECHARETOPER == 'Invalid date') impresion_SER109Q.FECHARETOPER = '000000'
                impresion_SER109Q.MARGIN = [10, 160, 10, 20];
                impresion_SER109Q.IMPRESION = 'SER109Q';
                _impresionformatoSER109(impresion_SER109Q, this._cerrarnumeracion_SER109F, this._evaluarfacturaoriginal_SER109F);
            }
            console.log('IMPRESION SER109F SER109J SER109O SER109Q')

        },
        ///////////////CERRARFACT//////////////////////////////////
        _cerrarnumeracion_SER109F() {
            console.log('cerrarnumeracion');
            if (this.form.estadofactura_SER109F.substring(0, 1) == '0' || this.form.estadofactura_SER109F.substring(0, 1) == '3') {
                if (this.SER109F.PREFIJOW == 'A' || this.SER109F.PREFIJOW == 'B' || this.SER109F.PREFIJOW == 'D' || this.SER109F.PREFIJOW == 'F' || this.SER109F.PREFIJOW == 'G' ||
                    this.SER109F.PREFIJOW == 'H' || this.SER109F.PREFIJOW == 'I' || this.SER109F.PREFIJOW == 'J' || this.SER109F.PREFIJOW == 'K') {
                    if (this.SER109F.FECHALNK.substring(0, 4) == this.SER109F.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109F.FECHALNK.substring(4, 6) == this.SER109F.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109F, params = { LLAVE_NUM: `${this.SER109F.PREFIJOW}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109F.PREFIJOW , FECHAING_NUM: this.SER109F.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109F.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109F, params = { LLAVE_NUM: `${this.SER109F.PREFIJOW}${this.form.numeroprefijo_SER109F.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109F.PREFIJOW , FECHAING_NUM: this.SER109F.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109F.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                }
            } else {
                _toggleNav();
            }
        },
    }
})

var porcentcopagoMask_SER109F = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true,
});

var prefijoMask_SER109F = IMask($('#prefijo_SER109F')[0], {
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

var bloqueoMask_SER109F = IMask($('#bloquearfactura_SER109F')[0], {
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
var nombremedicoMask_SER109F = IMask($('#nombremedico_SER109F')[0], {
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

var contratoMask_SER109F = IMask($('#contrato_SER109F')[0], {
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

var facturaoriginalMask_SER109F = IMask($('#facturaoriginal_SER109F')[0], {
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

var facturavaciaMask_SER109F = IMask($('#facturavacia_SER109F')[0], {
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

var discriminarpacMask_SER109J = IMask($('#discriminarpac_SER109J')[0], {
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

var discriminardrogMask_SER109O = IMask($('#discriminardrog_SER109O')[0], {
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

var tarifaplenaMask_SER109Q = IMask($('#tarifaplena_SER109Q')[0], {
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



