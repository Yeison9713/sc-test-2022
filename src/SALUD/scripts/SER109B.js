// // 01-09-2020 DIANA E: creado 
moment.locale('es')
var fecha_SER109B = IMask.createPipe({
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
    el: "#SER109B",
    data: {
        SER109B: [],
        form: {
            numeroprefijo_SER109B: "",
            entidad_SER109B: "",
            nombrepaciente_SER109B: "",
            estadofactura_SER109B: "",
            fechafactura_SER109B: "",
            operbloq_SER109B: "",
            observacion_SER109B: "",
            anexos_SER109B: "",
            fechafacturaano_SER109B: "",
            fechafacturames_SER109B: "",
            fechafacturadia_SER109B: "",
            valorsalmin_SER109B: "",
            topepoliza_SER109B: "",
            totalfact_SER109B: "",
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion('9,7,4,3,2 - Imprimir facturas resumidas');
        this.SER109B.PREFIJOW = 'A';
        this.SER109B.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        this.SER109B.PUCUSU = $_USUA_GLOBAL[0].PUC;
        this.SER109B.NITUSU = $_USUA_GLOBAL[0].NIT;
        this.SER109B.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;

        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER109B.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER109B.FIRMAS = data;
                $_this._evaluarprefijo_SER109B();
            })
        })
    },
    methods: {
        _evaluarprefijo_SER109B() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER109B',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER109B.PREFIJOW = prefijoMask_SER109B.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER109B.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER109B = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER109B();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER109B() {
            console.log('numero prefijo')
            validarInputs({
                form: '#VALIDAR2_SER109B',
                orden: '1'
            },
                this._evaluarprefijo_SER109B,
                () => {
                    this.SER109B.LLAVEW = this.SER109B.PREFIJOW + this.form.numeroprefijo_SER109B.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER109B.LLAVEW }, this._validarfactura_SER109B, this._evaluarnumeroprefijo_SER109B)
                }
            )
        },
        _validarfactura_SER109B(data1, data2) {
            console.log(data1, data2, 'VALLIDAR FACT',)
            this.SER109B.NUMERACION = data1;
            if (this.SER109B.NUMERACION.TIPOPACI_NUM == "X") this.SER109B.NUMERACION.TIPOPACI_NUM == '*';
            this.SER109B.FECHAPRENUM = this.SER109B.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER109B = this.SER109B.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER109B = this.SER109B.NUMERACION.NOMBREPAC_NUM.trim();
            let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
            this.form.estadofactura_SER109B = this.SER109B.NUMERACION.ESTADO_NUM + ' - ' + estado[this.SER109B.NUMERACION.ESTADO_NUM];
            if (this.SER109B.NUMERACION.ESTADO_NUM == '0' || this.SER109B.NUMERACION.ESTADO_NUM == '1') {
                $('#FECHARET_SER109B').removeClass('hidden');
                this.form.fechafactura_SER109B = fecha_SER109B(this.SER109B.NUMERACION.FECHARET_NUM)
            } else {
                $('#OPERBLOQ_SER109B').removeClass('hidden');
                this.form.operbloq_SER109B = this.SER109B.NUMERACION.OPERBLOQ_NUM
            }
            this.form.observacion_SER109B = this.SER109B.NUMERACION.OBSERV_NUM.trim()
            this.form.anexos_SER109B = this.SER109B.NUMERACION.ANEXOS_NUM.trim()
            this.SER109B.ANOINGNUM = this.SER109B.NUMERACION.FECHAING_NUM.substring(0, 4)
            if (parseInt(this.SER109B.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(this.SER109B.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER109B = this.SER109B.NUMERACION.FECHARET_NUM.substring(0, 4)
                    this.form.fechafacturames_SER109B = this.SER109B.NUMERACION.FECHARET_NUM.substring(4, 6)
                    this.form.fechafacturadia_SER109B = this.SER109B.NUMERACION.FECHARET_NUM.substring(6, 8)
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    this.form.fechafacturaano_SER109B = fechaactual.substring(0, 4)
                    this.form.fechafacturames_SER109B = fechaactual.substring(4, 6)
                    this.form.fechafacturadia_SER109B = fechaactual.substring(6, 8)
                }
            } else {
                this.form.fechafacturaano_SER109B = this.SER109B.NUMERACION.FECHAPRE_NUM.substring(0, 4)
                this.form.fechafacturames_SER109B = this.SER109B.NUMERACION.FECHAPRE_NUM.substring(4, 6)
                this.form.fechafacturadia_SER109B = this.SER109B.NUMERACION.FECHAPRE_NUM.substring(6, 8)
            }
            if (this.SER109B.PREFIJOW == 'T') {
                this.SER109B.VALORES = data2
                $('#VALORESCARTERA_109B').removeClass('hidden');
                this.form.valorsalmin_SER109B = this.SER109B.VALORES.SALMIN
                this.form.topepoliza_SER109B = this.SER109B.VALORES.TOPE
                this.form.totalfact_SER109B = this.SER109B.VALORES.TOTAL
            }
            this._afectarnumeracion_SER109B()
        },
        _afectarnumeracion_SER109B() {
            console.log('afctar numeracion')
            if (this.SER109B.NUMERACION.ESTADO_NUM == '0' || this.SER109B.NUMERACION.ESTADO_NUM == '3') {
                this._evaluarobservaciones_SER109B('1')
            } else {
                this._evaluarcups_SER109B()
            }
        },
        _evaluarobservaciones_SER109B(orden) {
            console.log('observaciones', orden)
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR3_SER109B',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER109B() },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER109B = this.form.observacion_SER109B.toUpperCase();
                    this.form.anexos_SER109B = this.form.anexos_SER109B.toUpperCase();
                    this._evaluarbloqueofactura_SER109B(); 
                }
            )
        },
        _evaluarbloqueofactura_SER109B() {
            _FloatText({ estado: 'off' })
            if (this.form.estadofactura_SER109B.substring(0, 1) == '3') {
                this._grabarnumeracion_SER109B()
            } else {
                bloqueoMask_SER109B.typedValue = 'N'
                validarInputs({
                    form: '#VALIDAR4_SER109B',
                    orden: '1'
                },
                    () => { this._evaluarobservaciones_SER109B('2') },
                    () => {
                        if (bloqueoMask_SER109B.value.trim() == '') bloqueoMask_SER109B.typedValue = 'N'
                        if (bloqueoMask_SER109B.value == 'S') this.form.estadofactura_SER109B = '3', this.form.operbloq_SER109B = localStorage.getItem('Usuario').trim();
                        this._grabarnumeracion_SER109B()
                    }
                )
            }
        },
        _grabarnumeracion_SER109B() {
            if (this.form.observacion_SER109B.trim() != this.SER109B.NUMERACION.OBSERV_NUM.trim() || this.form.anexos_SER109B.trim() != this.SER109B.NUMERACION.ANEXOS_NUM.trim() || this.form.estadofactura_SER109B.substring(0, 1) != this.SER109B.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109B.LLAVEW + '|' + this.form.observacion_SER109B + '|' + this.form.anexos_SER109B + '|' + this.form.estadofactura_SER109B.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarcups_SER109B()
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarbloqueofactura_SER109B();
                        }
                    })
            } else {
                this._evaluarcups_SER109B()
            }
        },
        _evaluarcups_SER109B() {
            separarcupsMask_SER109B.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR5_SER109B',
                orden: '1'
            },
                () => { this._evaluarobservaciones_SER109B('2') },
                () => {
                    if (separarcupsMask_SER109B.value.trim() == '') separarcupsMask_SER109B.typedValue = 'N'
                    this._evaluardiscriminaresp_SER109B()
                }
            )
        },
        _evaluardiscriminaresp_SER109B() {
            if (separarcupsMask_SER109B.value == 'S') {
                discriminarespecMask_SER109B.typedValue = 'N'
                this._evaluarimpresioncis_SER109B()
            } else {
                discriminarespecMask_SER109B.typedValue = 'N'
                validarInputs({
                    form: '#VALIDAR6_SER109B',
                    orden: '1'
                },
                    () => { this._evaluarcups_SER109B() },
                    () => {
                        if (discriminarespecMask_SER109B.value.trim() == '') discriminarespecMask_SER109B.typedValue = 'N'
                        this._evaluarimpresioncis_SER109B()
                    }
                )
            }
        },
        _evaluarimpresioncis_SER109B() {
            imprimircisMask_SER109B.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR7_SER109B',
                orden: '1'
            },
                () => { this._evaluardiscriminaresp_SER109B() },
                () => {
                    if (imprimircisMask_SER109B.value.trim() == '') imprimircisMask_SER109B.typedValue = 'N'
                    this._evaluarresumidoclase_SER109B()
                }
            )
        },
        _evaluarresumidoclase_SER109B() {
            resumidoclaseMask_SER109B.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR8_SER109B',
                orden: '1'
            },
                () => { this._evaluarimpresioncis_SER109B() },
                () => {
                    if (resumidoclaseMask_SER109B.value.trim() == '') resumidoclaseMask_SER109B.typedValue = 'N'
                    this._evaluarfechaimpresion_SER109B('1')
                }
            )
        },
        _evaluarfechaimpresion_SER109B(orden) {
            validarInputs({
                form: '#VALIDAR9_SER109B',
                orden: orden,
            },
                this._evaluarresumidoclase_SER109B,
                () => {
                    this.SER109B.FECHA = this.form.fechafacturaano_SER109B + this.form.fechafacturames_SER109B.padStart(2, '0') + this.form.fechafacturadia_SER109B.padStart(2, '0')
                    this.SER109B.ANONUM = this.SER109B.FECHA.substring(4, 6)
                    this._evaluarresumidocomp_SER109B()
                }
            )
        },
        _evaluarresumidocomp_SER109B() {
            resumidocompMask_SER109B.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR10_SER109B',
                orden: '1'
            },
                () => { this._evaluarfechaimpresion_SER109B('1') },
                () => {
                    if (resumidocompMask_SER109B.value.trim() == '') resumidocompMask_SER109B.typedValue = 'N'
                    this._evaluarfiltrosimpresion_SER109B()
                }
            )

        },
        _evaluarfiltrosimpresion_SER109B() {
            let URL = get_url("APP/SALUD/SER109B.DLL");
            postData({
                datosh: datosEnvio() + this.SER109B.LLAVEW + '|' + resumidoclaseMask_SER109B.value + '|' + separarcupsMask_SER109B.value + '|'
            }, URL)
                .then((data) => {
                    console.log(data,'FACTURA');
                    this.SER109B.FACTURAS = data.FACTURA;
                    this.SER109B.FACTURAS.pop();
                    console.log(this.SER109B.FACTURAS)
                    $('#IMPRESION_SER109B').removeClass('hidden');
                    this._evaluarfacturaoriginal_SER109B();
                })
                .catch((error) => {
                    console.error(error);
                    if (error.MENSAJE == '01') {
                        _toggleNav();
                    } else {
                        $('#VACIA_SER109B').removeClass('hidden');
                        this._evaluarimprimirvacia_SER109B();
                    }
                });
        },
        _evaluarfacturaoriginal_SER109B() {
            this.SER109B.TOTBASECOPAGO = this.SER109B.TOTCOPAGOFAME = this.SER109B.TOTCTAMODFAME = 0;
            for (var i in this.SER109B.FACTURAS){
                let valor = parseInt(this.SER109B.FACTURAS[i].VALOR.replace(/,/g,''));
                if (isNaN(valor)) valor = 0;
                if (this.SER109B.NUMERACION.ACUERDO260.trim() == 'S'){
                    this.SER109B.TOTBASECOPAGO = this.SER109B.TOTBASECOPAGO + valor;
                } else {
                    if (this.SER109B.FACTURAS[i].CUP.trim() != '890701'){
                        this.SER109B.TOTBASECOPAGO = this.SER109B.TOTBASECOPAGO + valor;
                    }
                }
                if (this.SER109B.PREFIJOW != 'C' && this.SER109B.PREFIJOW != 'E' && this.SER109B.PREFIJOW != 'Ñ' && this.SER109B.PREFIJOW != 'O' && this.SER109B.PREFIJOW != 'T' && this.SER109B.PREFIJOW != 'V' && this.SER109B.PREFIJOW != 'X' && this.SER109B.PREFIJOW != 'Y' && this.SER109B.PREFIJOW != 'Z' && this.SER109B.PREFIJOW != 'W'){
                    if (this.SER109B.FACTURAS[i].TIPO_COPAGO == '1'){
                        if (this.SER109B.FACTURAS[i].COPAGO.trim() != ''){
                            this.SER109B.TOTCOPAGOFAME = this.SER109B.TOTCOPAGOFAME + valor
                        }
                    } else if (this.SER109B.FACTURAS[i].TIPO_COPAGO == '2'){
                        if (this.SER109B.FACTURAS[i].COPAGO.trim() != ''){
                            this.SER109B.TOTCTAMODFAME = this.SER109B.TOTCTAMODFAME + valor
                        }
                    } else {
                        if (this.SER109B.FACTURAS[i].COPAGO.trim() != ''){
                            this.SER109B.TOTCTAMODFAME = this.SER109B.TOTCTAMODFAME + valor
                        }
                    }
                }
            }
            validarInputs({
                form: '#VALIDAR11_SER109B',
                orden: '1',
            },
                () => { this._evaluarresumidocomp_SER109B() },
                () => {
                    if (facturaoriginalMask_SER109B.value.trim() == '') facturaoriginalMask_SER109B.typedValue = 'N';
                    this.SER109B.SWORIGINALN = facturaoriginalMask_SER109B.value;
                    if (parseFloat(this.SER109B.NUMERACION.PORCECOPAGO_NUM) > 0 && (this.SER109B.PREFIJOW == 'P' || this.SER109B.PREFIJOW == 'T' || this.SER109B.PREFIJOW == 'O' || this.SER109B.PREFIJOW == 'Q' || this.SER109B.PREFIJOW == 'R' || this.SER109B.PREFIJOW == 'U' || this.SER109B.PREFIJOW == 'V' || this.SER109B.PREFIJOW == 'W' || this.SER109B.PREFIJOW == 'X' || this.SER109B.PREFIJOW == 'Y' || this.SER109B.PREFIJOW == 'Z')) {
                        if (this.form.estadofactura_SER109B.substring(0, 1) == '0' || this.form.estadofactura_SER109B.substring(0, 1) == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER109B.LLAVEW + '|' + this.SER109B.NUMERACION.IDPAC_NUM + '|' + this.SER109B.NUMERACION.DESCRIP_PACI.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER109B.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    setTimeout( () => {
                                        _liquidacioncopagos_SALUD(this._datosimpresion_SER109B, this._evaluarfacturaoriginal_SER109B, params = { NUMERACION: this.SER109B.NUMERACION, LLAVE_NUM: this.SER109B.LLAVEW, TOTBASECOPAGO: this.SER109B.TOTBASECOPAGO });
                                    }, 300 );
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109B();
                                });
                        }
                    } else {
                        this._datosimpresion_SER109B();
                    }
                }
            )
        },
        _evaluarimprimirvacia_SER109B() {
            validarInputs({
                form: '#VALIDAR12_SER109B',
                orden: '1'
            },
                () => { this._evaluarfechaimpresion_SER109B('1') },
                () => {
                    if (facturavaciaMask_SER109B.value.trim() == '') facturavaciaMask_SER109B.typedValue = 'N'
                    if (facturavaciaMask_SER109B.value == 'S') {
                        console.log('IMPRESION EN BLANCO')
                        this._datosimpresion_SER109B()
                    } else {
                        _toggleNav()
                    }

                }
            )
        },
        /////////////////IMPRESION////////////////////////////////////
        _datosimpresion_SER109B() {
            let impresion_SER109B = new Object;
            let original = {
                'S': '*** ORIGINAL ***',
                'N': '*** COPIA ***'
            };
            impresion_SER109B.FIRMA = 1
            impresion_SER109B.ORIGINAL = original[facturaoriginalMask_SER109B.value.trim()];
            impresion_SER109B.FECHAVENCE = moment(this.SER109B.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
            impresion_SER109B.FECHA = moment(this.SER109B.FECHA).format('MMMM DD YYYY').toUpperCase();
            impresion_SER109B.FECHAVENCE = moment(this.SER109B.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
            impresion_SER109B.FECHA = moment(this.SER109B.FECHA).format('MMMM DD YYYY').toUpperCase();
            impresion_SER109B.LLAVE = `${prefijoMask_SER109B.value.trim()}${this.form.numeroprefijo_SER109B.toString().trim().padStart(6, '0')}`
            impresion_SER109B.NOMTER = this.SER109B.NUMERACION.DESCRIP_TER;
            impresion_SER109B.NITTER = this.SER109B.NUMERACION.NIT_TER;
            impresion_SER109B.DVTER = this.SER109B.NUMERACION.DV_TER;
            impresion_SER109B.DIRECCTER = this.SER109B.NUMERACION.DIRECC_TER;
            impresion_SER109B.TELTER = this.SER109B.NUMERACION.TEL_TER;
            impresion_SER109B.CIUDADTER = this.SER109B.NUMERACION.CIUDAD_TER;
            impresion_SER109B.TARIF = 1;
            impresion_SER109B.DESCRIPTAR = this.SER109B.NUMERACION.CONVENIO_NUM;
            impresion_SER109B.PREFIJOW = prefijoMask_SER109B.value.trim();
            if (this.SER109B.NUMERACION.FACTCAPIT_NUM == `${prefijoMask_SER109B.value.trim()}${this.form.numeroprefijo_SER109B.toString().trim().padStart(6, '0')}`) {
                impresion_SER109B.REGIMEN = 'CAPITA'
            } else {
                impresion_SER109B.REGIMEN = 'EVENTO'
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
            impresion_SER109B.TIPOPACI = tipopaci[this.SER109B.NUMERACION.TIPOPACI_NUM];
            impresion_SER109B.OBSERVACION = 1
            impresion_SER109B.ANEXO = 1
            impresion_SER109B.FORMATOTABLA = 7;
            impresion_SER109B.WIDTH = ['40%', '19%', '20%'];
            impresion_SER109B.COLUMNAS = ["CONCEPTO", "CANTIDAD", "VALOR"];
            impresion_SER109B.FACTURAS = this.SER109B.FACTURAS;
            impresion_SER109B.TABLARBOS_NUM = this.SER109B.NUMERACION.TABLARBOS_NUM;
            console.log(this.SER109B.NUMERACION);
            impresion_SER109B.COPAGO = this.SER109B.NUMERACION.COPAGO_NUM;
            let valorfact = 0;
            let copago = 0;
            let iva = 0;
            for (var i in this.SER109B.FACTURAS) {
                valorfact = parseFloat(this.SER109B.FACTURAS[i].VALOR.replace(/,/g,'').trim().padStart(15, '0')) + valorfact;
                copago = parseFloat(this.SER109B.FACTURAS[i].COPAGO.trim().padStart(15, '0')) + copago;
                // iva = parseFloat(this.SER109B.FACTURAS[i].IVA.trim().padStart(15, '0')) + iva;
            }
            let abonocopago = 0;
            for (var i in this.SER109B.NUMERACION.TABLARBOS_NUM) {
                if (this.SER109B.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(0, 1) != 'G' && this.SER109B.NUMERACION.TABLARBOS_NUM[i].LOTEABON_NUM.substring(1, 2) == 'R' && this.SER109B.NUMERACION.COPAGO_NUM != 0) {
                    if (parseInt(this.SER109B.NUMERACION.TABLARBOS_NUM[i].FECHAABON_NUM) <= parseInt(this.SER109B.NUMERACION.FECHAPRE_NUM)) {
                        abonocopago = parseFloat(this.SER109B.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM) + abonocopago;
                    }
                }
            }
            if ($_USUA_GLOBAL[0].NIT == 891855847) {
                impresion_SER109B.SALDOCOPAGO = 0;
            } else {
                if (($_USUA_GLOBAL[0].PUC == '6' || $_USUA_GLOBAL[0].PUC == '4') && ($_USUA_GLOBAL[0].NIT == 9990 || $_USUA_GLOBAL[0].NIT == 9999) && parseInt(this.SER109B.NUMERACION.FECHAING_NUM) > 20070903) {
                    impresion_SER109B.SALDOCOPAGO = parseInt(this.SER109B.NUMERACION.COPAGO_NUM) + abonocopago;
                } else {
                    if (abonocopago != 0) {
                        impresion_SER109B.SALDOCOPAGO = 0;
                    } else {
                        impresion_SER109B.SALDOCOPAGO = parseInt(this.SER109B.NUMERACION.COPAGO_NUM);
                    }
                }
            }
            impresion_SER109B.COPAGO = parseInt(this.SER109B.NUMERACION.CO_PAGO_NUM);
            impresion_SER109B.SALDO = valorfact - parseInt(this.SER109B.NUMERACION.CO_PAGO_NUM) - impresion_SER109B.SALDOCOPAGO;
            console.log(valorfact, this.SER109B.NUMERACION.CO_PAGO_NUM, impresion_SER109B.SALDOCOPAGO);
            impresion_SER109B.VLRTOTAL = valorfact;
            let valorenletras = FAC146(valorfact);
            impresion_SER109B.NUMEROENLETRAS = valorenletras;
            let prefijo = this.SER109B.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109B.value.trim())
            if (prefijo.length == 0) {
                prefijo[0] = new Object;
                prefijo[0].AUT_DIAN = '';
                prefijo[0].PREFIJO = prefijoMask_SER109B.value.trim();
                prefijo[0].DESDE_NRO = '';
                prefijo[0].HASTA_NRO = '';
            }
            impresion_SER109B.PREFIJO = prefijo;
            if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                impresion_SER109B.FIRMA1 = localStorage.getItem('IDUSU')
            } else {
                impresion_SER109B.FIRMA1 = this.SER109B.FIRMAS[0].DATOS_GER.substring(0, 10)
            }
            impresion_SER109B.OPERNUM = this.SER109B.NUMERACION.OPER_NUM;
            impresion_SER109B.OPERBLOQNUM = this.SER109B.NUMERACION.OPERBLOQ_NUM;
            impresion_SER109B.ADMINW = localStorage.getItem('Usuario').trim();
            impresion_SER109B.MARGIN = [10, 160, 10, 20];
            impresion_SER109B.IDPACNUM = this.SER109B.NUMERACION.IDPAC_NUM;
            impresion_SER109B.NOMBREPACNUM = this.SER109B.NUMERACION.NOMBREPAC_NUM;
            impresion_SER109B.IMPRESION = 'SER109N';
            impresion_SER109B.OBSERVNUM = this.SER109B.NUMERACION.OBSERV_NUM
            impresion_SER109B.ANEXOSNUM = this.SER109B.NUMERACION.ANEXOS_NUM
             
            _impresionformatoSER109(impresion_SER109B, this._cerrarnumeracion_SER109B, this._evaluarfacturaoriginal_SER109B);
        },
        ///////////////CERRARFACT//////////////////////////////////
        _cerrarnumeracion_SER109B() {
            console.log('cerrarnumeracion');
            if (this.form.estadofactura_SER109B.substring(0, 1) == '0' || this.form.estadofactura_SER109B.substring(0, 1) == '3') {
                if (this.SER109B.PREFIJOW == 'A' || this.SER109B.PREFIJOW == 'B' || this.SER109B.PREFIJOW == 'D' || this.SER109B.PREFIJOW == 'F' || this.SER109B.PREFIJOW == 'G' ||
                    this.SER109B.PREFIJOW == 'H' || this.SER109B.PREFIJOW == 'I' || this.SER109B.PREFIJOW == 'J' || this.SER109B.PREFIJOW == 'K') {
                    if (this.SER109B.FECHALNK.substring(0, 4) == this.SER109B.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109B.FECHALNK.substring(4, 6) == this.SER109B.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109B, params = { LLAVE_NUM: this.SER109B.LLAVEW , PREFIJOW: this.SER109B.PREFIJOW , FECHAING_NUM: this.SER109B.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109B.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109B, params = { LLAVE_NUM: this.SER109B.LLAVEW , PREFIJOW: this.SER109B.PREFIJOW , FECHAING_NUM: this.SER109B.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109B.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                }
            } else {
                _toggleNav();
            }
        },
    }
})

var porcentcopagoMask_SER109B = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true,
});

var prefijoMask_SER109B = IMask($('#prefijo_SER109B')[0], {
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

var bloqueoMask_SER109B = IMask($('#bloquearfactura_SER109B')[0], {
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

var facturaoriginalMask_SER109B = IMask($('#facturaoriginal_SER109B')[0], {
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

var facturavaciaMask_SER109B = IMask($('#facturavacia_SER109B')[0], {
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

var separarcupsMask_SER109B = IMask($('#separarcups_SER109B')[0], {
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

var discriminarespecMask_SER109B = IMask($('#discriminarespec_SER109B')[0], {
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

var imprimircisMask_SER109B = IMask($('#imprimircis_SER109B')[0], {
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

var resumidoclaseMask_SER109B = IMask($('#resumidoclase_SER109B')[0], {
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

var resumidocompMask_SER109B = IMask($('#resumidocomprob_SER109B')[0], {
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











// var SER109B = new Object;

// $(document).ready(() => {
//     _inputControl('disabled');
//     _inputControl('reset');
//     nombreOpcion('9,7,4,3,2 Imprimir fact. resumida');
//     _evaluarprefijo_SER109B();
// })

// function _evaluarprefijo_SER109B() {
//     validarInputs({
//         form: '#VALIDAR1_SER109B',
//         orden: '1'
//     },
//         _toggleNav,
//         () => {
//             console.debug('validarprefijo');
//             SER109B.PREFIJOW = prefijoMask_SER109B.value;
//             let URL = get_url("APP/CONTAB/CON007.DLL");
//             postData({
//                 datosh: datosEnvio() + '9' + SER109B.PREFIJOW + '|'
//             }, URL)
//                 .then(data => {
//                     console.debug(data);
//                     data = data.split('|');
//                     $('#numeroprefijo_SER109B').val(parseInt(data[1].substring(3, 9)) - 1);
//                     _evaluarnumeroprefijo_SER109B();
//                 })
//                 .catch(error => {
//                     console.log(error);
//                     _toggleNav();
//                 });
//         }
//     )
// }

// function _evaluarnumeroprefijo_SER109B() {
//     validarInputs({
//         form: '#VALIDAR2_SER109B',
//         orden: '1'
//     },
//         _evaluarprefijo_SER109B,
//         () => {
//             SER109B.NUMEROW = $('#numeroprefijo_SER109B').val();
//             SER109B.LLAVEW = SER109B.PREFIJOW + SER109B.NUMEROW.padStart(6, '0');
//             _ImpresionesActualizarCopagos({ LLAVENUM: SER109B.LLAVEW }, _validarfactura_SER109B, _evaluarnumeroprefijo_SER109B)
//         }
//     )
// }

// function _validarfactura_SER109B(data1, data2) {
//     SER109B.NUMERACION = data1;
//     SER109B.VALORES = data2;
//     SER109B.FECHAPRENUM = SER109B.NUMERACION.FECHAPRE_NUM;
//     $('#entidad_SER109B').val(SER109B.NUMERACION.DESCRIP_NUM.trim());
//     $('#nombrepaciente_SER109B').val(SER109B.NUMERACION.NOMBREPAC_NUM.trim());
//     let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
//     $('#estadofactura_SER109B').val(SER109B.NUMERACION.ESTADO_NUM + ' - ' + estado[SER109B.NUMERACION.ESTADO_NUM]);
//     $('#observacion_SER109B').val(SER109B.NUMERACION.OBSERV_NUM);
//     $('#anexos_SER109B').val(SER109B.NUMERACION.ANEXOS_NUM);
//     if (SER109B.NUMERACION.FECHAPRE_NUM.substring(4, 6) == '00') {
//         if (parseInt(SER109B.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
//             $('#fechafacturaano_SER109B').val(SER109B.NUMERACION.FECHAPRE_NUM.substring(0, 4));
//             $('#fechafacturames_SER109B').val(SER109B.NUMERACION.FECHAPRE_NUM.substring(4, 6));
//             $('#fechafacturadia_SER109B').val(SER109B.NUMERACION.FECHAPRE_NUM.substring(6, 8));
//         } else {
//             let fechaactual = moment().format('YYYYMMDD');
//             $('#fechafacturaano_SER109B').val(fechaactual.substring(0, 4));
//             $('#fechafacturames_SER109B').val(fechaactual.substring(4, 6));
//             $('#fechafacturadia_SER109B').val(fechaactual.substring(6, 8));
//         }
//     } else {
//         $('#fechafacturaano_SER109B').val(SER109B.NUMERACION.FECHAPRE_NUM.substring(0, 4));
//         $('#fechafacturames_SER109B').val(SER109B.NUMERACION.FECHAPRE_NUM.substring(4, 6));
//         $('#fechafacturadia_SER109B').val(SER109B.NUMERACION.FECHAPRE_NUM.substring(6, 8));
//     }
//     if(SER109B.PREFIJOW == 'T'){
//         $('#VALORESCARTERA_109B').removeClass('hidden');
//         $('#valorsalmin_SER109B').val(SER109B.VALORES.SALMIN);
//         $('#topepoliza_SER109B').val(SER109B.VALORES.TOPE);
//         $('#totalfact_SER109B').val(SER109B.VALORES.TOTAL);
//     }
//     if (SER109B.NUMERACION.ESTADO_NUM == '0' || SER109B.NUMERACION.ESTADO_NUM == '3') {
//         _evaluarobservaciones_SER109B('1');
//     } else {
//         _evaluarfiltros_SER109B();
//     }
// }


// function _evaluarobservaciones_SER109B(orden) {
//     validarInputs({
//         form: '#VALIDAR3_SER109B',
//         orden: orden,
//         key: 'keydown'
//     },
//         () => { _evaluarnumeroprefijo_SER109B('1') },
//         () => {
//             SER109B.OBSERVW = $('#observacion_SER109B').val();
//             SER109B.ANEXOSW = $('#anexos_SER109B').val();
//             SER109B.ESTADOW = $('#estadofactura_SER109B').val().substring(0, 1);
//             if (SER109B.NUMERACION.ESTADO_NUM == '3') {
//                 _grabarnumeracion_SER109B();
//             } else {
//                 _evaluarbloqueofactura_SER109B();
//             }
//         }
//     )
// }

// function _evaluarbloqueofactura_SER109B() {
//     bloqueoMask_SER109B.typedValue = 'N';
//     validarInputs({
//         form: '#VALIDAR4_SER109B',
//         orden: '1',
//     },
//         () => { _evaluarobservaciones_SER109B('2') },
//         () => {
//             if (bloqueoMask_SER109B.value == 'S') SER109B.ESTADOW = '3', SER109B.OPERBLOQNUM = localStorage.getItem('Usuario').trim();
//             _grabarnumeracion_SER109B()
//         }
//     )
// }

// function _grabarnumeracion_SER109B() {
//     if (SER109B.OBSERVW.trim() != SER109B.NUMERACION.OBSERV_NUM.trim() || SER109B.ANEXOSW.trim() != SER109B.NUMERACION.ANEXOS_NUM.trim() || SER109B.ESTADOW != SER109B.NUMERACION.ESTADO_NUM) {
//         let URL = get_url("APP/SALUD/SER109D.DLL");
//         postData({
//             datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + SER109B.LLAVENUM + '|' + SER109B.OBSERVW + '|' + SER109B.ANEXOSW + '|' + SER109B.ESTADOW + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
//         }, URL)
//             .then((data) => {
//                 _evaluarfiltros_SER109B();
//                 console.debug(data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     } else {
//         separarcupsMask_SER109B.typedValue = 'N';
//         imprimirservicioMask_SER109B.typedValue = 'N';
//         resumidoclaseMask_SER109B.typedValue = 'N';
//         _evaluarfiltros_SER109B();
//     }
// }

// function _evaluarfiltros_SER109B(orden) {
//     validarInputs({
//         form: '#VALIDAR5_SER109B',
//         orden: orden,
//     },
//         _evaluarbloqueofactura_SER109B,
//         () => {
//             _evaluarfechaimpresion_SER109B('1');
//             mostrarcomprobanteMask_SER109B.typedValue = 'N';
//             originalMask_SER109B.typedValue = 'N';
//         }
//     )
// }

// function _evaluarfechaimpresion_SER109B(orden) {
//     validarInputs({
//         form: '#VALIDAR6_SER109B',
//         orden: orden,
//     },
//         _evaluarbloqueofactura_SER109B,
//         () => {
//             SER109B.FECHA = $('#fechafacturaano_SER109B').val() + $('#fechafacturames_SER109B').val() + $('#fechafacturadia_SER109B').val();
//             _evaluarfiltrosimpresion_SER109B('1');

//         }
//     )
// }

// function _evaluarfiltrosimpresion_SER109B(orden) {
//     validarInputs({
//         form: '#VALIDAR7_SER109B',
//         orden: orden,
//     },
//         () => { _evaluarfechaimpresion_SER109B('3') },
//         () => {
//             let URL = get_url("APP/SALUD/SER109B.DLL");
//             postData({
//                 datosh: datosEnvio() + SER109B.LLAVEW + '|' + resumidoclaseMask_SER109B.value + '|' + separarcupsMask_SER109B.value + '|'
//             }, URL)
//                 .then((data) => {
//                     console.debug(data);
//                     SER109B.FACTURAS = data.FACTURA;
//                     if (SER109B.FACTURAS[0] != '') {
//                         _evaluarfacturaoriginal_SER109B();
//                     } else {
//                         $('#VACIA_SER109B').removeClass('hidden');
//                         _evaluarimpresionvacia_SER109B();
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     if (error.MENSAJE == '01'){
//                         $('#VACIA_SER109B').removeClass('hidden');
//                         _evaluarimpresionvacia_SER109B();
//                     }
//                 });
//         }
//     )
// }

// function _evaluarimpresionvacia_SER109B() {
//     validarInputs({
//         form: '#VALIDAR9_SER109B',
//         orden: '1',
//     },
//         () => { _evaluarfechaimpresion_SER109B('3') },
//         () => {
//             if (vaciaMask_SER109B.value == 'S') {
//                 _imprimir_SER109B();
//             } else {
//                 _toggleNav();
//             }
//         }
//     )
// }


// function _evaluarfacturaoriginal_SER109B() {
//     validarInputs({
//         form: '#VALIDAR8_SER109B',
//         orden: '1',
//     },
//         () => { _evaluarfiltrosimpresion_SER109B('3') },
//         () => {
//             SER109B.SWORIGINAL = originalMask_SER109B.value;
//             _imprimir_SER109B();
//         }
//     )
// }

// function _imprimir_SER109B() {
//     SER109B.IMPRESION = new Object;
//     let iva = {
//         'C': () => {
//             if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
//                 return 'IVA Regimen Comun - Retenedor Iva'
//             } else {
//                 return 'IVA Regimen Comun'
//             }
//         },
//         'S': () => {
//             if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
//                 return 'Somos Responsables de IVA - Actividad Excluida de IVA'
//             } else {
//                 return 'IVA Regimen Simplificado'
//             }
//         },
//         'N': 'No somos responsables de IVA'
//     }
//     SER109B.IMPRESION.IVA = iva[$_USUA_GLOBAL[0].IVA_S];
//     let original = {
//         'S': '*** ORIGINAL ***',
//         'N': '*** COPIA ***'
//     };
//     if (SER109B.FACTURAS != '') SER109B.FACTURAS.pop();
//     SER109B.IMPRESION.ORIGINAL = original[SER109B.SWORIGINAL];
//     SER109B.IMPRESION.RESOLDIAN = $_USUA_GLOBAL[0].RESOL_DIAN;
//     SER109B.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT.toString().substring(1, 9);
//     SER109B.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
//     SER109B.IMPRESION.NITUSU = $_USUA_GLOBAL[0].NIT;
//     SER109B.IMPRESION.DVUSU = $_USUA_GLOBAL[0].DV;
//     SER109B.IMPRESION.TELUSU = $_USUA_GLOBAL[0].TEL;
//     SER109B.IMPRESION.DIRECCUSU = $_USUA_GLOBAL[0].DIRECC;
//     SER109B.IMPRESION.NOMBRECIU = $_USUA_GLOBAL[0].NOMBRE_CIU;
//     let fecha = () => {
//         if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2) > 90)) {
//             return momentes('20' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'MMMM DD YYYY')
//             // return moment('20' + $_USUA_GLOBAL[0].FECHALNK).format('MMMM DD YYYY');
//         } else {
//             return momentes('19' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'MMMM DD YYYY')
//             // return moment('19' + $_USUA_GLOBAL[0].FECHALNK).format('MMMM DD YYYY');
//         }
//     };
//     SER109B.IMPRESION.FECHA = fecha().toUpperCase();
//     SER109B.IMPRESION.PREFIJOFACT = SER109B.PREFIJOW;
//     SER109B.IMPRESION.NUMEROFACT = SER109B.NUMEROW;
//     SER109B.IMPRESION.DESCRIPNUM = SER109B.NUMERACION.DESCRIP_NUM;
//     SER109B.IMPRESION.DIRECCTER = SER109B.NUMERACION.DIRECC_TER;
//     SER109B.IMPRESION.TELTER = SER109B.NUMERACION.TEL_TER;
//     SER109B.IMPRESION.NOMBREPACNUM = SER109B.NUMERACION.NOMBRE_PACI;
//     SER109B.IMPRESION.TIPOIDPACI = SER109B.NUMERACION.TIPOID_PACI;
//     SER109B.IMPRESION.NITTER = SER109B.NUMERACION.NIT_TER;
//     SER109B.IMPRESION.CIUDADTER = SER109B.NUMERACION.CIUDAD_TER;
//     SER109B.IMPRESION.IDPACNUM = SER109B.NUMERACION.IDPAC_NUM;
//     SER109B.IMPRESION.CONVENIONUM = SER109B.NUMERACION.CONVENIO_NUM;
//     SER109B.IMPRESION.OPERNUM = SER109B.NUMERACION.OPER_NUM;
//     SER109B.IMPRESION.FECHAINGNUM = SER109B.NUMERACION.FECHAING_NUM;
//     SER109B.IMPRESION.OPERMODNUM = SER109B.NUMERACION.OPERMOD_NUM;
//     SER109B.IMPRESION.FECHAMODNUM = SER109B.NUMERACION.FECHAMOD_NUM;
//     SER109B.IMPRESION.OPERBLOQNUM = SER109B.NUMERACION.OPERBLOQ_NUM;
//     SER109B.IMPRESION.FECHARETNUM = SER109B.NUMERACION.FECHARET_NUM;
//     SER109B.IMPRESION.FECHAIMP = moment().format('YYMMDD');
//     SER109B.IMPRESION.ADMINW = localStorage.getItem('Usuario');
//     SER109B.IMPRESION.FACTURAS = SER109B.FACTURAS;
//     SER109B.IMPRESION.TOTAL = 0;
//     for (var i in SER109B.FACTURAS) {
//         if (!isNaN(parseInt(SER109B.FACTURAS[i].VALOR))) {
//             SER109B.IMPRESION.TOTAL = SER109B.IMPRESION.TOTAL + parseInt(SER109B.FACTURAS[i].VALOR);
//         }
//     }
//     SER109B.IMPRESION.COPAGO = 0;
//     for (var i in SER109B.FACTURAS) {
//         if (!isNaN(parseInt(SER109B.FACTURAS[i].COPAGO))) {
//             SER109B.IMPRESION.COPAGO = SER109B.IMPRESION.COPAGO + parseInt(SER109B.FACTURAS[i].COPAGO);
//         }
//     }
//     SER109B.IMPRESION.TOTALENLETRAS = FAC146(SER109B.IMPRESION.TOTAL);
//     opcionesImpresion_SER109B = {
//         datos: SER109B.IMPRESION,
//         tipo: 'pdf',
//         formato: 'salud/SER109B.formato.html',
//         nombre: 'SER109B.IMPRESION.NOMBREPDF'
//     };
//     imprimir(opcionesImpresion_SER109B, () => { _toggleNav() });
// }

// //// MASCARAS
// var prefijoMask_SER109B = IMask($('#prefijo_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[APTBDFGHIJKLMNQRSVWXYZ]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });

// var separarcupsMask_SER109B = IMask($('#separarcups_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[SN]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });


// var bloqueoMask_SER109B = IMask($('#bloquearfactura_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[SN]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });

// var imprimirservicioMask_SER109B = IMask($('#imprimircis_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[SN]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });

// var resumidoclaseMask_SER109B = IMask($('#resumidoclase_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[SN]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });

// var mostrarcomprobanteMask_SER109B = IMask($('#mostrarcomprob_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[SN]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });

// var originalMask_SER109B = IMask($('#facturaoriginal_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[SN]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });

// var vaciaMask_SER109B = IMask($('#facturavacia_SER109B')[0], {
//     mask: 'a',
//     definitions: {
//         'a': /[SN]/
//     },
//     prepare: function (str) {
//         if (str.trim() == '') {
//             return false
//         } else {
//             return str.toUpperCase()
//         }
//     },
//     commit: function (value, masked) {
//         masked._value = value.toLowerCase()
//     }
// });