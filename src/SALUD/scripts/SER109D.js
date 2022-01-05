const { TouchBarScrubber } = require("electron");

// // 01-09-2020 DIANA E: creado 
moment.locale('es')
var fecha_SER109D = IMask.createPipe({
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
    el: "#SER109D",
    data: {
        SER109D: [],
        form: {
            numeroprefijo_SER109D: "",
            entidad_SER109D: "",
            nombrepaciente_SER109D: "",
            estadofactura_SER109D: "",
            fechafactura_SER109D: "",
            operbloq_SER109D: "",
            observacion_SER109D: "",
            anexos_SER109D: "",
            fechafacturaano_SER109D: "",
            fechafacturames_SER109D: "",
            fechafacturadia_SER109D: "",
            compsucur_SER109D: "",
            valorsalmin_SER109D: "",
            topepoliza_SER109D: "",
            totalfact_SER109D: "",
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion('9,7,4,3,5 - Imprimir facturas por orden de fecha');
        this.SER109D.PREFIJOW = 'A';
        this.SER109D.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        this.SER109D.PUCUSU = $_USUA_GLOBAL[0].PUC;
        this.SER109D.NITUSU = $_USUA_GLOBAL[0].NIT;
        this.SER109D.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;

        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER109D.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER109D.FIRMAS = data;
                $_this._evaluarprefijo_SER109D();
            })
        })
    },
    methods: {
        _evaluarprefijo_SER109D() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER109D',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER109D.PREFIJOW = prefijoMask_SER109D.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER109D.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER109D = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER109D();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER109D() {
            console.log('numero prefijo')
            validarInputs({
                form: '#VALIDAR2_SER109D',
                orden: '1'
            },
                this._evaluarprefijo_SER109D,
                () => {
                    this.SER109D.LLAVEW = this.SER109D.PREFIJOW + this.form.numeroprefijo_SER109D.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER109D.LLAVEW }, this._validarfactura_SER109D, this._evaluarnumeroprefijo_SER109D)
                }
            )
        },
        _validarfactura_SER109D(data1, data2) {
            console.log(data1, data2, 'VALLIDAR FACT',)
            this.SER109D.NUMERACION = data1;
            if (this.SER109D.NUMERACION.TIPOPACI_NUM == "X") this.SER109D.NUMERACION.TIPOPACI_NUM == '*';
            this.SER109D.FECHAPRENUM = this.SER109D.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER109D = this.SER109D.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER109D = this.SER109D.NUMERACION.NOMBREPAC_NUM.trim();
            let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
            this.form.estadofactura_SER109D = this.SER109D.NUMERACION.ESTADO_NUM + ' - ' + estado[this.SER109D.NUMERACION.ESTADO_NUM];
            if (this.SER109D.NUMERACION.ESTADO_NUM == '0' || this.SER109D.NUMERACION.ESTADO_NUM == '1') {
                $('#FECHARET_SER109D').removeClass('hidden');
                this.form.fechafactura_SER109D = fecha_SER109D(this.SER109D.NUMERACION.FECHARET_NUM)
            } else {
                $('#OPERBLOQ_SER109D').removeClass('hidden');
                this.form.operbloq_SER109D = this.SER109D.NUMERACION.OPERBLOQ_NUM
            }
            this.form.observacion_SER109D = this.SER109D.NUMERACION.OBSERV_NUM.trim()
            this.form.anexos_SER109D = this.SER109D.NUMERACION.ANEXOS_NUM.trim()
            this.SER109D.ANOINGNUM = this.SER109D.NUMERACION.FECHAING_NUM.substring(0, 4)
            if (parseInt(this.SER109D.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(this.SER109D.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER109D = this.SER109D.NUMERACION.FECHARET_NUM.substring(0, 4)
                    this.form.fechafacturames_SER109D = this.SER109D.NUMERACION.FECHARET_NUM.substring(4, 6)
                    this.form.fechafacturadia_SER109D = this.SER109D.NUMERACION.FECHARET_NUM.substring(6, 8)
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    this.form.fechafacturaano_SER109D = fechaactual.substring(0, 4)
                    this.form.fechafacturames_SER109D = fechaactual.substring(4, 6)
                    this.form.fechafacturadia_SER109D = fechaactual.substring(6, 8)
                }
            } else {
                this.form.fechafacturaano_SER109D = this.SER109D.NUMERACION.FECHAPRE_NUM.substring(0, 4)
                this.form.fechafacturames_SER109D = this.SER109D.NUMERACION.FECHAPRE_NUM.substring(4, 6)
                this.form.fechafacturadia_SER109D = this.SER109D.NUMERACION.FECHAPRE_NUM.substring(6, 8)
            }
            if (this.SER109D.PREFIJOW == 'T') {
                this.SER109D.VALORES = data2
                $('#VALORESCARTERA_109B').removeClass('hidden');
                this.form.valorsalmin_SER109D = this.SER109D.VALORES.SALMIN
                this.form.topepoliza_SER109D = this.SER109D.VALORES.TOPE
                this.form.totalfact_SER109D = this.SER109D.VALORES.TOTAL
            }
            this._afectarnumeracion_SER109D()
        },
        _afectarnumeracion_SER109D() {
            console.log('afctar numeracion')
            if (this.SER109D.NUMERACION.ESTADO_NUM == '0' || this.SER109D.NUMERACION.ESTADO_NUM == '3') {
                this._evaluarobservaciones_SER109D('1')
            } else {
                this._evaluarfechaimpresion_SER109D('1')
            }
        },
        _evaluarobservaciones_SER109D(orden) {
            console.log('observaciones', orden)
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR3_SER109D',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER109D() },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER109D = this.form.observacion_SER109D.toUpperCase();
                    this.form.anexos_SER109D = this.form.anexos_SER109D.toUpperCase();
                    this._evaluarbloqueofactura_SER109D();
                }
            )
        },
        _evaluarbloqueofactura_SER109D() {
            _FloatText({ estado: 'off' })
            if (this.form.estadofactura_SER109D.substring(0, 1) == '3') {
                this._grabarnumeracion_SER109D()
            } else {
                bloqueoMask_SER109D.typedValue = 'N'
                validarInputs({
                    form: '#VALIDAR4_SER109D',
                    orden: '1'
                },
                    () => { this._evaluarobservaciones_SER109D('2') },
                    () => {
                        if (bloqueoMask_SER109D.value.trim() == '') bloqueoMask_SER109D.typedValue = 'N'
                        if (bloqueoMask_SER109D.value == 'S') this.form.estadofactura_SER109D = '3', this.form.operbloq_SER109D = localStorage.getItem('Usuario').trim();
                        this._grabarnumeracion_SER109D()
                    }
                )
            }
        },
        _grabarnumeracion_SER109D() {
            if (this.form.observacion_SER109D.trim() != this.SER109D.NUMERACION.OBSERV_NUM.trim() || this.form.anexos_SER109D.trim() != this.SER109D.NUMERACION.ANEXOS_NUM.trim() || this.form.estadofactura_SER109D.substring(0, 1) != this.SER109D.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109D.LLAVEW + '|' + this.form.observacion_SER109D + '|' + this.form.anexos_SER109D + '|' + this.form.estadofactura_SER109D.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarfechaimpresion_SER109D('1')
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarbloqueofactura_SER109D();
                        }
                    })
            } else {
                this._evaluarfechaimpresion_SER109D('1')
            }
        },
        _evaluarfechaimpresion_SER109D(orden) {
            validarInputs({
                form: '#VALIDAR5_SER109D',
                orden: orden,
            },
                () => { this._evaluarobservaciones_SER109D('2') },
                () => {
                    this.SER109D.FECHA = this.form.fechafacturaano_SER109D + this.form.fechafacturames_SER109D.padStart(2, '0') + this.form.fechafacturadia_SER109D.padStart(2, '0')
                    this.SER109D.ANONUM = this.SER109D.FECHA.substring(4, 6)
                    this._evaluardroga_SER109D()
                }
            )
        },
        _evaluardroga_SER109D() {
            bloqueardrogMask_SER109D.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR6_SER109D',
                orden: '1'
            },
                () => { this._evaluarfechaimpresion_SER109D('3') },
                () => {
                    if (bloqueardrogMask_SER109D.value.trim() == '') bloqueardrogMask_SER109D.typedValue = 'N'
                    this._evaluarsucursal_SER109D()
                }
            )
        },
        _evaluarsucursal_SER109D() {
            if (this.form.compsucur_SER109D.trim() == '') this.form.compsucur_SER109D = '**'
            validarInputs({
                form: '#VALIDAR7_SER109D',
                orden: '1'
            },
                () => { this._evaluardroga_SER109D() },
                () => {
                    switch (this.form.compsucur_SER109D) {
                        case '**':
                        case 'BC':
                        case 'CA':
                        case 'CS':
                        case 'CV':
                        case 'EM':
                        case 'JL':
                        case 'LC':
                        case 'PV':
                        case 'UM':
                        case 'HT':
                            this._evaluarcambiarfecha_SER109D()
                            break;
                        default:
                            this._evaluarsucursal_SER109D()
                            break;
                    }
                }
            )
        },
        _evaluarcambiarfecha_SER109D() {
            cambfechaMask_SER109D.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR8_SER109D',
                orden: '1'
            },
                () => { this._evaluarsucursal_SER109D() },
                () => {
                    if (cambfechaMask_SER109D.value.trim() == '') cambfechaMask_SER109D.typedValue = 'N'
                    this._evaluarfiltrosimpresion_SER109D()
                }
            )
        },
        _evaluarfiltrosimpresion_SER109D() {
            let URL = get_url("APP/SALUD/SER109D.DLL");
            postData({
                datosh: datosEnvio() + '3|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109D.LLAVEW + '|' + this.form.observacion_SER109D.trim() + '|' + this.form.anexos_SER109D.trim() + '|' + cambfechaMask_SER109D.value + '|' + this.SER109D.SWFECHA + '|' + this.form.compsucur_SER109D + '|' + parseInt(this.SER109D.NITUSU) + '|' + this.SER109D.PUCUSU + '|' + bloqueardrogMask_SER109D.value + '|'
            }, URL)
                .then(data => {
                    console.log(data, 'NUMERACION');
                    this.SER109D.FACTURAS = data.FACTURA;
                    this.SER109D.FACTURAS.pop();
                    let facturas = [];
                    for (var i in this.SER109D.FACTURAS){
                        for (var x in this.SER109D.FACTURAS[i].TABLA){
                            if (this.SER109D.FACTURAS[i].TABLA[x].CONCEPTO_TEM.trim() != ''){
                                facturas.push({FECHA_TEM: this.SER109D.FACTURAS[i].FECHA_TEM, CONCEPTO: this.SER109D.FACTURAS[i].TABLA[x].CONCEPTO_TEM, CANT_TEM: this.SER109D.FACTURAS[i].TABLA[x].CANT_TEM, ARTICULO: this.SER109D.FACTURAS[i].TABLA[x].CUPS_TEM, VALOR: this.SER109D.FACTURAS[i].TABLA[x].VALOR_TEM, DETALLE_TEM: this.SER109D.FACTURAS[i].DETALLE_TEM, EDAD_TEM: this.SER109D.FACTURAS[i].EDAD_TEM, SEXO_TEM: this.SER109D.FACTURAS[i].SEXO_TEM, COPAGO: this.SER109D.FACTURAS[i].COPAGO_TEM, NRO_AUTOR: this.SER109D.FACTURAS[i].AUTOR_TEM, COMP: this.SER109D.FACTURAS[i].LLAVEFACT_TEM.substring(3,9)})
                            }
                        }
                    }
                    this.SER109D.FACTURAS = facturas;
                    this._evaluarsubtotalcomp_SER109D()
                })
                .catch(error => {
                    console.error(error);
                    $('#VACIA_SER109D').removeClass('hidden');
                    this._evaluarimprimirvacia_SER109D();
                });
        },
        _evaluarsubtotalcomp_SER109D() {
            subtotalMask_SER109D.typedValue = 'N'
            nombremedicoMask_SER109D.typedValue = 'N'
            incluirabonosMask_SER109D.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR9_SER109D',
                orden: '1'
            },
                () => { this._evaluarsucursal_SER109D() },
                () => {
                    if (subtotalMask_SER109D.value.trim() == '') subtotalMask_SER109D.typedValue = 'N'
                    if (nombremedicoMask_SER109D.value.trim() == '') nombremedicoMask_SER109D.typedValue = 'N'
                    if (incluirabonosMask_SER109D.value.trim() == '') incluirabonosMask_SER109D.typedValue = 'N'
                    this._evaluarfacturaoriginal_SER109D()
                }
            )
        },
        _evaluarfacturaoriginal_SER109D() {
            this.SER109D.TOTBASECOPAGO = this.SER109D.TOTCOPAGOFAME = this.SER109D.TOTCTAMODFAME = 0;
            for (var i in this.SER109D.FACTURAS){
                let valor = 0;
                valor = parseInt(this.SER109D.FACTURAS[i].VALOR.replace(/,/g,''))
                if (isNaN(valor)) valor = 0;
                if (this.SER109D.NUMERACION.ACUERDO260.trim() == 'S'){
                    this.SER109D.TOTBASECOPAGO = this.SER109D.TOTBASECOPAGO + valor;
                } else {
                    if (this.SER109D.FACTURAS[i].ARTICULO.trim() != '890701'){
                        this.SER109D.TOTBASECOPAGO = this.SER109D.TOTBASECOPAGO + valor;
                    }
                }
                if (this.SER109D.PREFIJOW != 'C' && this.SER109D.PREFIJOW != 'E' && this.SER109D.PREFIJOW != 'Ñ' && this.SER109D.PREFIJOW != 'O' && this.SER109D.PREFIJOW != 'T' && this.SER109D.PREFIJOW != 'V' && this.SER109D.PREFIJOW != 'X' && this.SER109D.PREFIJOW != 'Y' && this.SER109D.PREFIJOW != 'Z' && this.SER109D.PREFIJOW != 'W'){
                    if (this.SER109D.FACTURAS[i].TIPO_COPAGO == '1'){
                        if (this.SER109D.FACTURAS[i].ARTICULO.trim() != '890701'){
                            if (this.SER109D.FACTURAS[i].COPAGO.trim() != ''){
                                this.SER109D.TOTCOPAGOFAME = this.SER109D.TOTCOPAGOFAME + valor
                            }
                        } 
                    } else if (this.SER109D.FACTURAS[i].TIPO_COPAGO == '2'){
                        if (this.SER109D.FACTURAS[i].COPAGO.trim() != ''){
                            this.SER109D.TOTCTAMODFAME = this.SER109D.TOTCTAMODFAME + valor
                        }
                    } else {
                        if (this.SER109D.FACTURAS[i].COPAGO.trim() != ''){
                            this.SER109D.TOTCTAMODFAME = this.SER109D.TOTCTAMODFAME + valor
                        }
                    }
                }
            }
            validarInputs({
                form: '#VALIDAR10_SER109D',
                orden: '1',
            },
                () => { this._evaluarresumidocomp_SER109D() },
                () => {
                    if (facturaoriginalMask_SER109D.value.trim() == '') facturaoriginalMask_SER109D.typedValue = 'N';
                    this.SER109D.SWORIGINALN = facturaoriginalMask_SER109D.value;
                    if (parseFloat(this.SER109D.NUMERACION.PORCECOPAGO_NUM) > 0 && (this.SER109D.PREFIJOW == 'P' || this.SER109D.PREFIJOW == 'T' || this.SER109D.PREFIJOW == 'O' || this.SER109D.PREFIJOW == 'Q' || this.SER109D.PREFIJOW == 'R' || this.SER109D.PREFIJOW == 'U' || this.SER109D.PREFIJOW == 'V' || this.SER109D.PREFIJOW == 'W' || this.SER109D.PREFIJOW == 'X' || this.SER109D.PREFIJOW == 'Y' || this.SER109D.PREFIJOW == 'Z')) {
                        if (this.this.form.estadofactura_SER109D.substring(0, 1) == '0' || this.this.form.estadofactura_SER109D.substring(0, 1) == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER109D.LLAVEW + '|' + this.SER109.NUMERACION.IDPAC_NUM + '|' + this.SER109.NUMERACION.DESCRIP_PACI.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER109D.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    setTimeout( () => {
                                        _liquidacioncopagos_SALUD(this._datosimpresion_SER109D, this._evaluarfacturaoriginal_SER109D, params = { NUMERACION: this.SER109D.NUMERACION, LLAVE_NUM: this.SER109D.LLAVEW, TOTBASECOPAGO: this.SER109D.TOTBASECOPAGO });
                                    }, 300 );
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109D();
                                });
                        }
                    } else {
                        this._datosimpresion_SER109D();
                    }
                }
            )
        },
        _evaluarimprimirvacia_SER109D() {
            validarInputs({
                form: '#VALIDAR11_SER109D',
                orden: '1'
            },
                () => { this._evaluarfechaimpresion_SER109D('1') },
                () => {
                    if (facturavaciaMask_SER109D.value.trim() == '') facturavaciaMask_SER109D.typedValue = 'N'
                    if (facturavaciaMask_SER109D.value == 'S') {
                        console.log('IMPRESION EN BLANCO')
                        this._datosimpresion_SER109D()
                    } else {
                        _toggleNav()
                    }

                }
            )
        },
        /////////////////IMPRESION////////////////////////////////////
        _datosimpresion_SER109D() {
            let impresion_SER109D = new Object;
            impresion_SER109D.FORMATOTABLA = 1;
            impresion_SER109D.TARIF = 1;
            impresion_SER109D.OBSERVACION = 2;
            impresion_SER109D.ANEXO = 2;
            impresion_SER109D.FIRMA = 1;
            impresion_SER109D.MARGIN = [10, 160, 10, 20];
            impresion_SER109D.WIDTH = ['5%', '8%', '19%', '5%', '4%', '25%', '3%', '8%', '8%', '5%', '8%'];
            impresion_SER109D.COLUMNAS = ["COMP", "FECHA_TEM", "DETALLE_TEM", "EDAD_TEM", "SEXO_TEM", "CONCEPTO", "CANT_TEM", "VALOR", "COPAGO", "NRO_AUTOR", "ARTICULO"];
            if (nombremedicoMask_SER109D.value == 'S') {
                impresion_SER109D.estilohoja = 2, impresion_SER109D.FORMATOTABLA = 5
                impresion_SER109D.WIDTH = ['5%', '6%', '17%', '4%', '4%', '20%', '4%', '7%', '7%', '5%', '5%', '6%', '11%'];
                impresion_SER109D.COLUMNAS = ["COMP", "FECHA", "DETALLE", "EDAD", "SEXO", "CONCEPTO", "CANT", "VALOR", "ARTICULO", "CUM", "NRO_AUTOR", "COPAGO", "NOMBRE_MED"];
            }
            if (facturaoriginalMask_SER109D.value.trim() == 'S') impresion_SER109D.ORIGINAL = '***ORIGINAL***'
            else impresion_SER109D.ORIGINAL = '***COPIA***'
            impresion_SER109D.FECHAVENCE = moment(this.SER109D.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
            impresion_SER109D.FECHA = moment(this.SER109D.FECHA).format('MMMM DD YYYY').toUpperCase();
            impresion_SER109D.FECHAVENCE = moment(this.SER109D.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
            impresion_SER109D.FECHA = moment(this.SER109D.FECHA).format('MMMM DD YYYY').toUpperCase();
            impresion_SER109D.LLAVE = this.SER109D.LLAVEW;
            impresion_SER109D.NOMTER = this.SER109D.NUMERACION.DESCRIP_TER;
            impresion_SER109D.NITTER = this.SER109D.NUMERACION.NIT_TER;
            impresion_SER109D.DVTER = this.SER109D.NUMERACION.DV_TER;
            impresion_SER109D.DIRECCTER = this.SER109D.NUMERACION.DIRECC_TER;
            impresion_SER109D.TELTER = this.SER109D.NUMERACION.TEL_TER;
            impresion_SER109D.CIUDADTER = this.SER109D.NUMERACION.CIUDAD_TER;
            impresion_SER109D.DESCRIPTAR = this.SER109D.NUMERACION.CONVENIO_NUM;
            impresion_SER109D.REGIMEN = this.SER109D.FACTURAS[0].CUENTA;
            let tipo = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR ', 'O': 'OTRO TIPOP', 'D': 'DESP. CONT', 'E': 'DESP. SUBS', 'F': 'DESP. VINC' };
            if (tipo == undefined) impresion_SER109D.TIPOPACI = '';
            impresion_SER109D.TIPOPACI = tipo[this.SER109D.NUMERACION.TIPOPACI_NUM]
            impresion_SER109D.FACTURAS = this.SER109D.FACTURAS;
            impresion_SER109D.TABLARBOS_NUM = this.SER109D.NUMERACION.TABLARBOS_NUM.filter(x => parseInt(x.VLRABON_NUM) > 0);
            impresion_SER109D.OBSERVNUM = this.SER109D.NUMERACION.OBSERV_NUM;
            impresion_SER109D.ANEXOSNUM = this.SER109D.NUMERACION.ANEXOS_NUM;
            impresion_SER109D.OPERBLOQNUM = this.SER109D.NUMERACION.OPERBLOQ_NUM;
            impresion_SER109D.OPERNUM = this.SER109D.NUMERACION.OPER_NUM;
            impresion_SER109D.ADMINW = localStorage.getItem('Usuario');
            impresion_SER109D.IDPACNUM = this.SER109D.NUMERACION.IDPAC_NUM;
            impresion_SER109D.NOMBREPACNUM = this.SER109D.NUMERACION.NOMBREPAC_NUM;
            if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                    impresion_SER109D.IVA = 'IVA Regimen Comun - Retenedor Iva'
                } else {
                    impresion_SER109D.IVA = 'IVA Regimen Comun'
                }
            } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                    impresion_SER109D.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                } else {
                    impresion_SER109D.IVA = 'IVA Regimen Simplificado'
                }
            } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
                impresion_SER109D.IVA = 'No somos responsables de IVA'
            } else {
                impresion_SER109D.IVA = '';
            }
            let prefijo = this.SER109D.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == this.SER109D.PREFIJOW)
            if (prefijo.length == 0) {
                prefijo[0] = new Object;
                prefijo[0].AUT_DIAN = '';
                prefijo[0].PREFIJO = $_PREFIJOFACT;
                prefijo[0].DESDE_NRO = '';
                prefijo[0].HASTA_NRO = '';
            }
            var vlr = 0;
            for (var i in this.SER109D.FACTURAS) {
                vlr = vlr + parseInt(this.SER109D.FACTURAS[i].VALOR.replace(/,/g, ''));
            }
            var abono = 0;
            for (var i in this.SER109D.NUMERACION.TABLARBOS_NUM) {
                if (this.SER109D.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM != '') {
                    abono = parseInt(this.SER109D.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.replace(/,/g, '')) + abono;
                }
            }
            var saldocopago = 0;
            if ($_USUA_GLOBAL[0] == 891855847) {
                saldocopago = 0;
            } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER109D.NUMERACION.NIT_NUM) == 9990 || parseInt(this.SER109D.NUMERACION.NIT_NUM) == 9999) && (parseInt(this.SER109D.NUMERACION.FECHA_ING) > 20070930)) {
                saldocopago = parseInt(this.SER109D.NUMERACION.CO_PAGO_NUM) + abono
            } else {
                if (abono != 0) {
                    saldocopago = 0
                } else {
                    saldocopago = parseInt(this.SER109D.NUMERACION.CO_PAGO_NUM);
                }
            }
            console.log(saldocopago);
            let neto = vlr - saldocopago - parseInt(this.SER109D.NUMERACION.CO_PAGO_NUM);
            impresion_SER109D.VLRTOTAL = vlr;
            impresion_SER109D.SALDOCOPAGO = saldocopago;
            impresion_SER109D.SALDO = neto;
            impresion_SER109D.PREFIJO = prefijo;
            impresion_SER109D.TOTCOPAGO = parseInt(this.SER109D.NUMERACION.CO_PAGO_NUM);
            impresion_SER109D.IMPRESION = 'SER109W';
            let valorenletras = FAC146(impresion_SER109D.VLRTOTAL);
            impresion_SER109D.NUMEROENLETRAS = 'SON: ' + valorenletras;
            if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                impresion_SER109D.FIRMA1 = localStorage.getItem('IDUSU')
            } else {
                impresion_SER109D.FIRMA1 = this.SER109D.FIRMAS[0].DATOS_GER.substring(0, 10)
            }
            console.log(impresion_SER109D);
            _impresionformatoSER109(impresion_SER109D, this._cerrarnumeracion_SER109D, this._evaluarfacturaoriginal_SER109D);
        },
        ///////////////CERRARFACT//////////////////////////////////
        _cerrarnumeracion_SER109D() {
            console.log('cerrarnumeracion');
            if (this.form.estadofactura_SER109D.substring(0, 1) == '0' || this.form.estadofactura_SER109D.substring(0, 1) == '3') {
                if (this.SER109D.PREFIJOW == 'A' || this.SER109D.PREFIJOW == 'B' || this.SER109D.PREFIJOW == 'D' || this.SER109D.PREFIJOW == 'F' || this.SER109D.PREFIJOW == 'G' ||
                    this.SER109D.PREFIJOW == 'H' || this.SER109D.PREFIJOW == 'I' || this.SER109D.PREFIJOW == 'J' || this.SER109D.PREFIJOW == 'K') {
                    if (this.SER109D.FECHALNK.substring(0, 4) == this.SER109D.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109D.FECHALNK.substring(4, 6) == this.SER109D.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109D, params = { LLAVE_NUM: `${this.SER109D.PREFIJOW}${this.form.numeroprefijo_SER109D.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109D.PREFIJOW , FECHAING_NUM: this.SER109D.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109D.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109D, params = { LLAVE_NUM: `${this.SER109D.PREFIJOW}${this.form.numeroprefijo_SER109D.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109D.PREFIJOW , FECHAING_NUM: this.SER109D.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109D.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                }
            } else {
                _toggleNav();
            }
        },
    }
})

var porcentcopagoMask_SER109D = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true,
});

var prefijoMask_SER109D = IMask($('#prefijo_SER109D')[0], {
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

var bloqueoMask_SER109D = IMask($('#bloquearfactura_SER109D')[0], {
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

var facturaoriginalMask_SER109D = IMask($('#facturaoriginal_SER109D')[0], {
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

var facturavaciaMask_SER109D = IMask($('#facturavacia_SER109D')[0], {
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

var bloqueardrogMask_SER109D = IMask($('#bloqueardrogueria_SER109D')[0], {
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

var cambfechaMask_SER109D = IMask($('#cambfecha_SER109D')[0], {
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

var subtotalMask_SER109D = IMask($('#subtotal_SER109D')[0], {
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

var nombremedicoMask_SER109D = IMask($('#nommedico_SER109D')[0], {
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

var incluirabonosMask_SER109D = IMask($('#abonos_SER109D')[0], {
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









