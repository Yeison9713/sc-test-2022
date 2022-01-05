////27/07/2020 - DIANA ESCOBAR: CREADO 

const { Console } = require("console");
const { unwatchFile } = require("fs");
const moment = require("moment");

var valores_FAC135 = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    thousandsSeparator: ',',
    normalizeZeros: true,
    padFractionalZeros: true,
});

new Vue({
    el: "#FAC135",
    data: {
        fac135: {
            _numeracion: [],
            _maestrocta: [],
            _terceros: []
        },
        tablareccaja_FAC135: [],
        form: {
            lote_FAC135: '',
            nombreusu_FAC135: '',
            nombrelote_FAC135: '',
            comprobante_FAC135: '',
            anoelab_FAC135: '',
            meselab_FAC135: '',
            diaelab_FAC135: '',
            prefijo_FAC135: '',
            factura_FAC135: '',
            fecharecaudo_FAC135: '',
            tercero_FAC135: '',
            // fechavence_FAC135: '',
            diferencia_FAC135: '',
            anodir_FAC135: '',
            sucursal_FAC135: '',
            prefijotabla_FAC135: '',
            facturatabla_FAC135: '',
            descripfact_FAC135: '',
            tipofact_FAC135: '',
            numerotabla_FAC135: 1,
            codcontable_FAC135: '',
            nombrecta_FAC135: '',
            tercerotabla_FAC135: '',
            debito_FAC135: '',
            credito_FAC135: '',
            detalle_FAC135: '',
            totaldebito_FAC135: '',
            totalcredito_FAC135: '',
            centrocosto_FAC135: '',
            documento_FAC135: '',
        },
        FAC135: [],
        $_HORACORTE: null,
        $_MESNUM: null,
        $_COPAGOESTW: null,
        $_SERVICIOSFAC135: null,

    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion("3,1 - Recibos de Caja");

        this.form.lote_FAC135 = '1R';
        if (SUCURSAL_0A) this.form.lote_FAC135 = SUCURSAL_0A;
        this.form.nombreusu_FAC135 = $_USUA_GLOBAL[0].NOMBRE;

        if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) < 90) {
            this.FAC135.FECHALNK = "20" + $_USUA_GLOBAL[0].FECHALNK;
        } else {
            this.FAC135.FECHALNK = "19" + $_USUA_GLOBAL[0].FECHALNK;
        }
        this.FAC135.FECHAACTUAL = moment().format("YYYYMMDD");
        this.FAC135.SCMARCA = '0';
        var $_this = this;
        if ($_USUA_GLOBAL[0].NIT == 800156469) {
            $_SERVICIOSFAC135 = [
                { 'COD': '0', 'DESCRIP': 'DROGUERIA' },
                { 'COD': '1', 'DESCRIP': 'CIRUGIAS' },
                { 'COD': '2', 'DESCRIP': 'ECOGRAFIAS' },
                { 'COD': '3', 'DESCRIP': 'RX - IMAGENOLOGIA' },
                { 'COD': '4', 'DESCRIP': 'DOPPLER' },
                { 'COD': '5', 'DESCRIP': 'T.A.C.' },
                { 'COD': '6', 'DESCRIP': 'RESONANCIA NUCLEAR' },
                { 'COD': '7', 'DESCRIP': 'PROMOCION Y PREVENCION' },
            ]
        } else {
            $_SERVICIOSFAC135 = [
                { 'COD': '0', 'DESCRIP': 'DROGUERIA' },
                { 'COD': '1', 'DESCRIP': 'CIRUGIAS' },
                { 'COD': '2', 'DESCRIP': 'LAB. Y OTROS DIAG.' },
                { 'COD': '3', 'DESCRIP': 'RX - IMAGENOLOGIA' },
                { 'COD': '4', 'DESCRIP': 'OTROS SERVICIOS' },
                { 'COD': '5', 'DESCRIP': 'CONSULTAS Y TERAPIAS' },
                { 'COD': '6', 'DESCRIP': 'PATOLOGIA' },
                { 'COD': '7', 'DESCRIP': 'PROMOCION Y PREVENCION' },
            ]
        }
        loader("show");
        obtenerDatosCompletos({ nombreFd: 'CTA-MAYOR', filtro: '4'}, function (data) {
            $_this.fac135._maestrocta = data.MAESTROS
            $_this.fac135._maestrocta.pop();
            obtenerDatosCompletos({nombreFd: "TERCEROS" }, function (data) {
                $_this.fac135._terceros = data.TERCEROS;
                $_this.fac135._terceros.pop();
                loader('hide')
                $_this._evaluarinicio_FAC135();
                obtenerDatosCompletos({ nombreFd: "COSTOS" }, function (data) {
                    $_this.fac135._costos = data.COSTO;
                    $_this.fac135._costos.pop();
                })
            })
        })
    },
    methods: {
        _evaluarinicio_FAC135() {
            let params = {
                2: { MAYLIMI1: '2320', MAYDEUD1: '1605', MAYDEUD2: '', MAYINV: '13', MAYDIF: '17', MAYRET1: '2330', MAYRET2: '2330', MAYMEDI: '2815', SCTAOTROS: '80', CTACAJA: '11050100001', CTACOPAGO: '28150500010', CTACAPITA: '168090CAP01', ACTPARTIC1: '25', ACTPARTIC2: '30' },
                3: { MAYLIMI1: '2365', MAYDEUD1: '1305', MAYDEUD2: '1306', MAYINV: '14', MAYDIF: '17', MAYRET1: '2365', MAYRET2: '2367', MAYMEDI: '2815', SCTAOTROS: '80', CTACAJA: '11050100001', CTACOPAGO: '28150500010', CTACAPITA: '138090CAP01', ACTPARTIC1: '25', ACTPARTIC2: '30' },
                4: { MAYLIMI1: '2325', MAYDEUD1: '1409', MAYDEUD2: '', MAYINV: '17', MAYRET1: '2436', MAYRET2: '2436', MAYMEDI: '2815', CTACAJA: '11050100001', CTACOPAGO: '29050500010', CTACAPITA: '147090CAP01', ACTPARTIC1: '27', ACTPARTIC2: '27' },
                5: { MAYLIMI1: '2201', MAYDEUD1: '1301', MAYDEUD2: '1301', MAYINV: '14', MAYDIF: '17', MAYRET1: '2201', MAYRET2: '2201', MAYMEDI: '2815', SCTAOTROS: '80', CTACAJA: '11050500001', CTACOPAGO: '28150500010', CTACAPITA: '138090CAP01', ACTPARTIC1: '25', ACTPARTIC2: '30' },
                6: { MAYLIMI1: '2425', MAYDEUD1: '1319', MAYDEUD2: '1319', MAYINV: '17', MAYRET1: '2436', MAYRET2: '2436', MAYMEDI: '2815', SCTAOTROS: '95', CTACAJA: '11050100001', CTACOPAGO: '24070600010', CTACAPITA: '138490CAP01', ACTPARTIC1: '27', ACTPARTIC2: '27' }
            }
            this.FAC135.CTASEXEP = params[parseInt($_USUA_GLOBAL[0].PUC)];
            this.FAC135.CTASEXEP.AUXILCAJA = this.FAC135.CTASEXEP.CTACAJA.substring(10, 11)
            if ($_USUA_GLOBAL[0].NIT == 900005594) this.FAC135.CTASEXEP.AUXILCAJA = this.form.lote_FAC135.substring(0, 1)
            if (($_USUA_GLOBAL[0].NIT == 892001990) && (localStorage.getItem('Usuario').trim() == "FABY" || "NPVP")) this.FAC135.CTASEXEP.AUXILCAJA = '2'
            let URL = get_url("APP/SALUD/FAC135.DLL");
            postData({ datosh: `${datosEnvio()}1|${this.form.lote_FAC135}|` }, URL)
            .then(data => {
                this.form.nombrelote_FAC135 = data.CONSULTA[0].NOMBRE_LOTE;
                this.FAC135.CONSECLOTE = data.CONSULTA[0].CONSEC_LOTE;
                this.FAC135.PREFIJOLOTE = data.CONSULTA[0].PREFIJO_LOTE;
                this._evaluarprefijolote_FAC135();
            })
            .catch(err => {
                console.error(err);
                this.form.nombrelote_FAC135 = 'RECIBOS DE CAJA'
                this.FAC135.CONSECLOTE = '1'
                this.FAC135.PREFIJOLOTE = ''
                this._evaluarprefijolote_FAC135();
            })
        },
        _evaluarprefijolote_FAC135() {
            if (this.FAC135.PREFIJOLOTE.trim() == '') {
                if ($_USUA_GLOBAL[0].NIT == 900161116) {
                    let datos_envio = datosEnvio()
                    datos_envio += localStorage.getItem('Usuario').trim();
                    SolicitarDll({ datosh: datos_envio }, data => {
                        var date = dato.split("|");
                        this.SUCOPERW = date[1].substr(8, 10);
                        this.form.sucursal_FAC135 = this.SUCOPERW;
                    }, get_url('APP/CONTAB/CON003.DLL'));
                } else {
                    this.form.sucursal_FAC135 = $_USUA_GLOBAL[0].PREFIJ;
                }
            } else {
                this.form.sucursal_FAC135 = $_USUA_GLOBAL[0].PREFIJ;
            }
            this._numercomprobante_FAC135();
        },
        _numercomprobante_FAC135() {
            let data = {};
            if (this.FAC135.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|${this.form.lote_FAC135.substring(0, 2)}|`
            else data.datosh = `${datosEnvio()}${this.form.lote_FAC135.substring(0, 2)}|`
            postData(data,
            get_url("APP/CONTAB/CON007.DLL"))
            .then(data => {
                var data = data.split("|");
                this.FAC135.FECHAANTS = data[2];
                this.FAC135.COMPINGRESO = parseInt(data[1].substring(3, 9)).toString().padStart(6, '0');
                this.form.comprobante_FAC135 = parseInt(data[1].substring(3, 9)).toString().padStart(6, '0')
                let $_FECHACOMP 
                if (this.FAC135.FECHALNK.substring(0,6) != moment().format("YYYYMMDD").substring(0,6)) {
                    $_FECHACOMP = this.FAC135.FECHALNK
                } else {
                    $_FECHACOMP = moment().format("YYYYMMDD");
                }
                this.FAC135.HORAW = moment().format('HHmm');
                this.form.anoelab_FAC135 = $_FECHACOMP.substring(0, 4);
                this.form.meselab_FAC135 = $_FECHACOMP.substring(4, 6);
                this.form.diaelab_FAC135 = $_FECHACOMP.substring(6, 8);
                this.FAC135.DIAW = this.form.diaelab_FAC135;
                $_this = this;
                let params = {
                    900004059: { $_HORACORTE: '0600', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    800037021: { $_HORACORTE: '1900', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    800162035: { $_HORACORTE: '1900', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    892000401: { $_HORACORTE: '0700', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    900648993: { $_HORACORTE: '0700', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    900755133: { $_HORACORTE: '0700', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    900804411: { $_HORACORTE: '0700', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    900870633: { $_HORACORTE: '0700', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') },
                    892001990: { $_HORACORTE: '0500', $_FECHACOMP: moment($_FECHACOMP).subtract(1, 'days') }
                }
                var $_nitvalidacion = params[$_USUA_GLOBAL[0].NIT];
                if ($_nitvalidacion == undefined) {
                    $_nitvalidacion = '0000'
                    $_HORACORTE = '0000'
                    $_this._evaluardiaelaboracion_FAC135();
                } else {
                    if ($_HORACORTE == '0600' || $_HORACORTE == '0700' || $_HORACORTE == '0500') {
                        if (this.FAC135.HORAW < $_HORACORTE) {
                            this.form.diaelab_FAC135 = this.form.diaelab_FAC135 - 1
                        } else {
                            if (this.form.meselab_FAC135 == 01) {
                                this.form.meselab_FAC135 = 12
                                this.form.diaelab_FAC135 = 31
                                this.form.anoelab_FAC135 = this.form.anoelab_FAC135 - 1
                            } else {
                                this.form.meselab_FAC135 = this.form.meselab_FAC135 - 1
                                this.form.diaelab_FAC135 = 31
                                this._buscarlimite_FAC135()
                                if (this.form.diaelab_FAC135 > this.FAC135.DIAMAX) {
                                    this.form.diaelab_FAC135 = this.FAC135.DIAMAX
                                }
                            }
                        }
                        this._evaluardiaelaboracion_FAC135()
                    } else {
                        if (this.FAC135.HORAW >= $_HORACORTE) {
                            this.form.diaelab_FAC135 = this.form.diaelab_FAC135 + 1
                            if (this.form.diaelab_FAC135 > this.FAC135.DIAMAX) {
                                this.form.meselab_FAC135 = this.form.meselab_FAC135 + 1
                                this.form.diaelab_FAC135 = 1
                                if (this.form.meselab_FAC135 > 12) {
                                    this.form.meselab_FAC135 = 01
                                    this.form.anoelab_FAC135 = this.form.anoelab_FAC135 + 1
                                }
                            }
                        }
                        this._evaluardiaelaboracion_FAC135()
                    }
                }
            })
            .catch(err => {
                console.error(err);
                _toggleNav();
            })
        },
        _evaluardiaelaboracion_FAC135() {
            this.form.numerotabla_FAC135 = 1;
            this.tablareccaja_FAC135 = []
            this.form.prefijo_FAC135 = ''
            this.form.factura_FAC135 = ''
            this.form.codcontable_FAC135 = ''
            this.form.nombrecta_FAC135 = ''
            this.form.tercerotabla_FAC135 = ''
            this.form.prefijotabla_FAC135 = ''
            this.form.facturatabla_FAC135 = ''
            this.form.debito_FAC135 = ''
            this.form.credito_FAC135 = ''
            validarInputs(
                {
                    form: "#VALIDAR1_FAC135",
                    orden: '1'
                },
                () => { _toggleNav(); },
                () => {
                    this.form.diaelab_FAC135 = this.form.diaelab_FAC135.padStart(2, '0');
                    this.FAC135.FECHAELAB = moment(this.form.anoelab_FAC135 + this.form.meselab_FAC135 + this.form.diaelab_FAC135).format('YYYYMMDD');
                    if (this.FAC135.FECHAELAB == 'Invalid date') {
                        CON851('', 'Dia invalido!', this._evaluardiaelaboracion_FAC135(), 'error', 'error');
                    } else {
                        if (this.FAC135.FECHAELAB > this.FAC135.FECHAACTUAL || this.FAC135.FECHAELAB.substring(2, 8) < this.FAC135.FECHAANTS) {
                            this._evaluardiaelaboracion_FAC135()
                        } else {
                            this._evaluarubicarmacro_FACC135();
                        }
                    }
                }
            )
        },
        _evaluarubicarmacro_FACC135() {
            if ($_USUA_GLOBAL[0].NIT == 891855847 && this.form.lote_FAC135 == '2R') {
                this._evaluarmacro_SER135();
            } else if ($_USUA_GLOBAL[0].NIT == 891855847 && this.form.lote_FAC135 == '5R') {
                this.form.codcontable_FAC135 = '110505000024'
                this.form.codcontable_FAC135 = '281505000024'
                this._leercodigo2_FAC135();
            } else {
                this._evaluarsuc_FAC135()
            }
        },
        _evaluarsuc_FAC135() {
            validarInputs(
                {
                    form: "#VALIDAR2_FAC135",
                    orden: '1'
                }, this._evaluardiaelaboracion_FAC135,
                () => {
                    if ($_USUA_GLOBAL[0].NIT == 800162035) {
                        this.form.prefijo_FAC135 = 'Q';
                    } else {
                        this.form.prefijo_FAC135 = "P"
                    }
                    this._evaluarprefijo_FAC135();
                }
            )
        },
        _evaluarprefijo_FAC135() {
            validarInputs(
                {
                    form: "#VALIDAR3_FAC135",
                    orden: '1'
                }, this._evaluarsuc_FAC135,
                () => {
                    this.form.prefijo_FAC135 = this.form.prefijo_FAC135.toUpperCase();
                    if (this.form.prefijo_FAC135.trim() == '') {
                        this.FAC135.MAYORW = ''
                        this._evaluarcodigo_FAC135();
                    } else {
                        if (this.form.prefijo_FAC135 == 'C' || this.form.prefijo_FAC135 == 'E' || this.form.prefijo_FAC135 == 'P' || this.form.prefijo_FAC135 == 'T' || this.form.prefijo_FAC135 == 'D' ||
                            this.form.prefijo_FAC135 == 'O' || this.form.prefijo_FAC135 == 'Q' || this.form.prefijo_FAC135 == 'R' || this.form.prefijo_FAC135 == 'S' || this.form.prefijo_FAC135 == 'U' ||
                            this.form.prefijo_FAC135 == 'V' || this.form.prefijo_FAC135 == 'W' || this.form.prefijo_FAC135 == 'X' || this.form.prefijo_FAC135 == 'Y' || this.form.prefijo_FAC135 == 'Z') {
                            this._evaluarfactura_FAC135C();
                        } else {
                            this._evaluarprefijo_FAC135();
                        }
                    }
                }
            )
        },
        _evaluarfactura_FAC135C() {
            if (this.form.prefijo_FAC135 == 'C' || this.form.prefijo_FAC135 == 'E') {
                this.form.factura_FAC135 = '';
            }
            validarInputs(
                {
                    form: "#VALIDAR4_FAC135",
                    orden: '1'
                }, this._evaluarprefijo_FAC135,
                () => {
                    this.form.factura_FAC135 = this.form.factura_FAC135.padStart(6, "0");
                    if (this.form.factura_FAC135.trim() == '' || this.form.factura_FAC135 == '0') {
                        CON851('03', '03', this._evaluarfactura_FAC135C(), 'error', 'error')
                    } else {
                        if (this.form.prefijo_FAC135 == 'C' || this.form.prefijo_FAC135 == 'E' || this.form.prefijo_FAC135 == 'D') {
                            this._tiposervicio_FAC135()
                        } else {
                            this.form.tipofact_FAC135 = '';
                            this._leercopagos_FAC135();
                        }
                    }
                }
            )
        },
        _tiposervicio_FAC135() {
            POPUP(
                {
                    array: $_SERVICIOSFAC135,
                    titulo: "TIPO DE SERVICIO",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    seleccion: this.form.tipofact_FAC135.substring(0, 1),
                    callback_f: () => {
                        this._evaluarprefijo_FAC135();
                    },
                    teclaAlterna: true
                },
                ordenar => {
                    this.form.tipofact_FAC135 = ordenar.COD + " - " + ordenar.DESCRIP;
                    this._leercopagos_FAC135();
                },
            );
        },
        _leercopagos_FAC135() {
            let URL = get_url("APP/SALUD/FAC135.DLL");
            postData({ datosh: datosEnvio() + '2|' + ' |' + this.form.tipofact_FAC135.substring(0, 1) + '|' + this.form.sucursal_FAC135 + '|' + this.form.prefijo_FAC135 + this.form.factura_FAC135 }, URL)
                .then(data => {
                    this.FAC135.TABLA = data.CONSULTA;
                    for (var i in this.FAC135.TABLA) {
                        this.FAC135.TABLA[i].NIT = parseInt(this.FAC135.TABLA[i].NIT)
                        this.FAC135.TABLA[i].CODIGO_CONTROL = this.FAC135.TABLA[i].CODIGO_CONTROL.substring(0, 11)
                        if (this.FAC135.TABLA[i].VALOR.trim() == '') {
                            this.FAC135.TABLA[i].VALORCREDITO = 000000000000
                            this.FAC135.TABLA[i].VALORDEBITO = 000000000000
                        } else if (this.FAC135.TABLA[i].VALOR.indexOf('-') > 0) {
                            this.FAC135.TABLA[i].VALORCREDITO = parseInt(this.FAC135.TABLA[i].VALOR.replace('-', '')) * (-1)
                        } else {
                            this.FAC135.TABLA[i].VALORDEBITO = parseInt(this.FAC135.TABLA[i].VALOR)
                        }
                    }
                    this.tablareccaja_FAC135 = this.FAC135.TABLA
                    this._ingresartabla_FAC135();
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarfactura_FAC135C();
                })
        },
        ////////////////////////////////INICIAN VALIDACIONES DE LA TABLA//////////////////////////////
        _ingresartabla_FAC135() {
            if (this.form.numerotabla_FAC135 <= this.tablareccaja_FAC135.length) {
                this.FAC135.invalid = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].SW_INVALID
                if (this.FAC135.invalid == '8K') CON851('8K', 'Actualmente no tiene fecha de radicación esta factura', null, 'error', 'error')
                this.form.codcontable_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].CODIGO_CONTROL.substring(0, 11)
                this.form.nombrecta_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].DESCRIP_CODIGO
                this.form.tercerotabla_FAC135 = parseInt(this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].NIT)
                this.form.tercero_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].DESCRIP_NIT
                this.form.prefijotabla_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].SUCURSAL
                this.form.facturatabla_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].DOCUM
                this.form.debito_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].VALOR.trim()
                this.form.detalle_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].DETALLE.trim()
                this.form.fechavence_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].FECHA_VENCE
                this.form.centrocosto_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].COSTO;
                this.form.descripcosto_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].DESCRIP_COSTO
                this.FAC135.MAYORW = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].CODIGO_CONTROL.substring(1, 4);
                this.FAC135.COPAGOESTNUM = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].COPAGO_NUM
                this.form.refencia_FAC135 = this.FAC135.TABLA[1].REFER
                this.form.documento_FAC135 = this.FAC135.TABLA[1].REFER
                this.FAC135.BASERET = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].BASE_RET.trim()
                this.FAC135.FLUJOARR = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].FLUJO
                this.FAC135.tipodoc_FAC135 = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].TIPO_DOC
                this.FAC135.FECHAVENCE = this.FAC135.TABLA[this.form.numerotabla_FAC135 - 1].FECHA_VENCE
                this.form.anorecaudo_FAC135 = this.FAC135.FECHAVENCE.substring(0, 2)
                this.form.mesrecaudo_FAC135 = this.FAC135.FECHAVENCE.substring(2, 4)
                this.form.diarecaudo_FAC135 = this.FAC135.FECHAVENCE.substring(4, 6)
                if (this.form.prefijo_FAC135 == 'C' || this.form.prefijo_FAC135 == 'D' || this.form.prefijo_FAC135 == 'E') {
                    for (var i in this.FAC135.TABLA) {
                        if (this.FAC135.TABLA[i].VALOR.indexOf('-') > 0) {
                            this.form.totalcredito_FAC135 = parseInt(this.FAC135.TABLA[i].VALOR.replace('-', '')) * (-1)
                        } else {
                            this.form.totaldebito_FAC135 = parseInt(this.FAC135.TABLA[i].VALOR)
                        }
                    }
                    if (this.form.totalcredito_FAC135 != 0) {
                        this.FAC135.DESCUADRE = 0
                        this.form.totalcredito_FAC135 = this.form.totalcredito_FAC135.toString().replace('-', '')
                        if (this.form.totalcredito_FAC135 != this.form.totaldebito_FAC135) {
                            $('#VALIDAR13_FAC135').removeClass('hidden');
                            this.FAC135.DESCUADRE = this.form.totaldebito_FAC135 - this.form.totalcredito_FAC135
                            this.form.diferencia_FAC135 = this.FAC135.DESCUADRE
                        }
                    }
                }
                this._evaluarcodigo_FAC135();
            } else {
                this._evaluarcodigo_FAC135();
            }

        },
        _evaluarcodigo_FAC135() {
            if (this.FAC135.MAYORW.trim() == '') {
                if (this.form.numerotabla_FAC135 == '1') {
                    if (($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) && (this.form.lote_FAC135 == '2R')) {
                        this.form.codcontable_FAC135 = '28105000001';
                    } else {
                        this.form.codcontable_FAC135 = this.FAC135.CTASEXEP.CTACAJA;
                    }
                } else {
                    if (this.FAC135.DESCUADRE != 0) {
                        this.FAC135.MAYORW = this.FAC135.CTASEXEP.MAYDEUD1;
                        this.FAC135.AUXILW = '00001';
                        if ($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') {
                            this.FAC135.SUBCTAW = '01';
                        } else {
                            this.FAC135.SUBCTAW = '25';
                        }
                        this.form.codcontable_FAC135 = this.FAC135.MAYORW + this.FAC135.SUBCTAW + this.FAC135.AUXILW;
                    }
                }
            }
            _FloatText({
                estado: "on",
                msg: [{ mensaje: "Oprima para F3 para continuar" }, { mensaje: "Oprima para F4 para editar tabla" }, { mensaje: "Oprima para F5 Salir de la tabla" }, { mensaje: "Oprima F9 para repetir ant tabla" }],
            });

            validarInputs(
                {
                    form: "#VALIDAR6_FAC135",
                    orden: '1',
                    event_f3: this._total_FAC135,
                    event_f4: this._validartabla_FAC135,
                    event_f5: this._evaluardiaelaboracion_FAC135,
                    event_f9: this._repiteanterior_FAC135,
                },
                () => { this._evaluarcodigo_FAC135() },
                () => {
                    this._leercodigo_FAC135();
                }
            )
        },
        _leercodigo_FAC135() {
            this.FAC135.CODSUBW = this.form.codcontable_FAC135.substring(0, 6)
            this.FAC135.MAYORW = this.form.codcontable_FAC135.substring(0, 4);
            this.FAC135.MAY1W = this.form.codcontable_FAC135.substring(0, 2);
            this.FAC135.MAY2W = this.form.codcontable_FAC135.substring(2, 4);
            this.FAC135.SUBCTAW = this.form.codcontable_FAC135.substring(4, 6);
            this.FAC135.AUXILW = this.form.codcontable_FAC135.substring(6, 11);
            if (this.FAC135.MAYORW.trim() == '' || this.FAC135.MAYORW == 0) {
                this.form.codcontable_FAC135 = '';
                this.form.nombrecta_FAC135 = '';
                this.form.tercerotabla_FAC135 = '';
                this.form.facturatabla_FAC135 = '';
                this.form.debito_FAC135 = '';
                this.form.credito_FAC135 = '';
                this._evaluarsubtotal_FAC135();

            } else if ((!$.isNumeric(this.FAC135.MAYORW) || this.FAC135.MAYORW < 100 || this.FAC135.SUBCTAW == 0 || this.FAC135.SUBCTAW.trim() == '' || this.FAC135.AUXILW == 0 || this.FAC135.AUXILW.trim() == '') || (this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYMED && this.FAC135.SUBCTAW == 10)) {
                CON851('03', '03', this._evaluarcodigo_FAC135(), 'error', 'error')
            } else {
                const res = this.fac135._maestrocta.find(e => e.LLAVE_MAE == this.form.codcontable_FAC135 + 4);
                if (res == undefined) {
                    CON851("01", "01", this._evaluarcodigo_FAC135(), "error", "error");
                } else {
                    this.form.nombrecta_FAC135 = res.NOMBRE_MAE;
                    this.FAC135.PORCENTRETMAE = res.PORCENT_RET;
                    if (res.NOMBRE_MAE.substring(0, 1) == '*') {
                        CON851("13", "13", this._evaluarcodigo_FAC135(), "error", "error");
                    } else {
                        this._evaluarnit_FAC135();
                    }
                }
            }
        },
        _evaluarnit_FAC135() {
            _FloatText({ estado: "off" });
            validarInputs(
                {
                    form: "#VALIDAR6_1_FAC135",
                    orden: '1'
                }, this._evaluarcodigo_FAC135,
                () => {
                    this.form.tercerotabla_FAC135 = this.form.tercerotabla_FAC135.toString().padStart(10, "0");
                    if (this.form.tercerotabla_FAC135 == 0) {
                        CON851("02", "02", this._evaluarnit_FAC135(), "error", "error");
                    } else {
                        const res = this.fac135._terceros.find(e => e.COD.trim().padStart(10, '0') == this.form.tercerotabla_FAC135);
                        if (res == undefined) {
                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: this.form.tercerotabla_FAC135.padStart(10, "0") });
                            vector = ['on', 'Actualizando maestro de terceros...']
                            _EventocrearSegventana(vector, this._evaluarnit_FAC135);
                        } else {
                            this.form.tercero_FAC135 = res.NOMBRE
                            if (res.NOMBRE.substring(0, 1) == '*') {
                                CON851("13", "13", this._evaluarnit_FAC135(), "error", "error");
                            } else {
                                if ($_USUA_GLOBAL[0].COSTO == 'S') {
                                    if (this.FAC135.MAY1W == this.FAC135.CTASEXEP.MAYINV || this.FAC135.MAY1W == this.FAC135.CTASEXEP.DIF || (this.FAC135.MAYORW > 4000 && this.FAC135.MAYORW < 8000) || $_USUA_GLOBAL[0].NIT == 822000593) {
                                        this._evaluarcosto_FAC135();
                                    } else {
                                        this.form.centrocosto_FAC135 = '0000';
                                        this._evaluardatofact_FAC135();
                                    }
                                } else {
                                    this.form.centrocosto_FAC135 = '0000';
                                    this._evaluardatofact_FAC135();
                                }
                            }
                        }
                    }
                }
            )
        },
        _evaluarcosto_FAC135() {
            validarInputs(
                {
                    form: "#VALIDAR10_FAC135",
                    orden: '1'
                }, this._evaluarcodigo_FAC135,
                () => {
                    this.form.centrocosto_FAC135 = this.form.centrocosto_FAC135.padStart(4, "0")
                    const res = this.ser110._costos.find(e => e.COD == this.form.costos_SER110);
                    if (res == undefined) {
                        CON851("01", "01", this._evaluarcentrocosto_SER110(), "error", "error");
                    } else {
                        this.form.descripcosto_FAC135 = res.NOMBRE;
                        if (res.NOMBRE.substring(0, 1)) {
                            CON851("13", "13", this._evaluarcosto_FAC135(), "error", "error");
                        } else {
                            this._evaluardatofact_FAC135();
                        }
                    }
                }
            )
        },
        _evaluardatofact_FAC135() {
            console.log('DATO FACT')
            // $_USUA_GLOBAL[0].CARTERA = 'N'
            console.log(this.FAC135.MAYORW, this.FAC135.CTASEXEP.MAYDEUD1, this.FAC135.CTASEXEP.MAYDEUD2, this.FAC135.CTASEXEP.CTACOPAGO, this.FAC135.SUBCTAW, this.FAC135.CTASEXEP.SCTAOTROS)
            if (($_USUA_GLOBAL[0].CARTERA == 'S') && (this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYDEUD1 || this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYDEUD2 || this.form.codcontable_FAC135.substring(0, 11) == this.FAC135.CTASEXEP.CTACOPAGO)
                && (this.FAC135.SUBCTAW != this.FAC135.CTASEXEP.SCTAOTROS) && (this.form.prefijo_FAC135 != 'D')) {
                console.log('VA IR - DATO CARTERA')
                this._evaluardatocartera_FAC135();
            } else {
                console.log('VA IR - DATO PROVEEDOR')
                this._evaluardatoproveedor_FAC135();
            }
        },

        _evaluardatocartera_FAC135() {
            console.log('DATO CARTERA- PREFIJO TABLA')
            if (this.form.prefijotabla_FAC135.trim() == '') {
                this.form.prefijotabla_FAC135 = 'P';
            }
            validarInputs(
                {
                    form: "#VALIDAR6_2_FAC135",
                    orden: '1'
                }, this._evaluarcodigo_FAC135,
                () => {

                    this.form.prefijotabla_FAC135 = this.form.prefijotabla_FAC135.toUpperCase();
                    // SE ELIMINA EL PREFIJO A DEBIDO A QUE ESE PREFIJO SE UTILIZA COMO UN 4R
                    if (this.form.prefijotabla_FAC135 == 'C' || this.form.prefijotabla_FAC135 == 'P' || this.form.prefijotabla_FAC135 == 'T' || this.form.prefijotabla_FAC135 == 'B' ||
                        this.form.prefijotabla_FAC135 == 'D' || this.form.prefijotabla_FAC135 == 'F' || this.form.prefijotabla_FAC135 == 'G' || this.form.prefijotabla_FAC135 == 'H' || this.form.prefijotabla_FAC135 == 'I' ||
                        this.form.prefijotabla_FAC135 == 'J' || this.form.prefijotabla_FAC135 == 'K' || this.form.prefijotabla_FAC135 == 'L' || this.form.prefijotabla_FAC135 == 'M' || this.form.prefijotabla_FAC135 == 'N' ||
                        this.form.prefijotabla_FAC135 == 'O' || this.form.prefijotabla_FAC135 == 'Q' || this.form.prefijotabla_FAC135 == 'R' || this.form.prefijotabla_FAC135 == 'S' || this.form.prefijotabla_FAC135 == 'U' ||
                        this.form.prefijotabla_FAC135 == 'V' || this.form.prefijotabla_FAC135 == 'W' || this.form.prefijotabla_FAC135 == 'X' || this.form.prefijotabla_FAC135 == 'Y' || this.form.prefijotabla_FAC135 == 'Z') {
                        this._evaluarnrofact_FAC135();
                    } else {
                        if (this.FAC135.CODSUBW == '140981' || this.FAC135.CODSUBW == '131980' || this.FAC135.CODSUBW == '138490' || this.FAC135.CODSUBW == '138439') {
                            if (this.form.prefijotabla_FAC135.trim() == '') {
                                this._evaluardato3_FAC135();
                            } else {
                                this._evaluarnrofact_FAC135();
                            }
                        } else {
                            if (($_USUA_GLOBAL[0].NIT == 845000038 || $_USUA_GLOBAL[0].NIT == 892000458 || $_USUA_GLOBAL[0].NIT == 900005594 ||
                                $_USUA_GLOBAL[0].NIT == 822001570 || $_USUA_GLOBAL[0].NIT == 800037979 || $_USUA_GLOBAL[0].NIT == 800037202 ||
                                $_USUA_GLOBAL[0].NIT == 830512772 || $_USUA_GLOBAL[0].NIT == 900004059 || $_USUA_GLOBAL[0].NIT == 900077520) &&
                                (this.form.codcontable_FAC135 == 14092000092 || this.form.codcontable_FAC135 == 14092100092 || this.form.codcontable_FAC135 == 14092200092 || this.form.codcontable_FAC135 == 14092300092 || this.form.codcontable_FAC135 == 14092400092
                                    || this.form.codcontable_FAC135 == 14092500092 || this.form.codcontable_FAC135 == 14092600092 || this.form.codcontable_FAC135 == 14092700092
                                    || this.form.codcontable_FAC135 == 14092800092 || this.form.codcontable_FAC135 == 14092900092 || this.form.codcontable_FAC135 == 14093000092
                                    || this.form.codcontable_FAC135 == 14093100092 || this.form.codcontable_FAC135 == 14093200092 || this.form.codcontable_FAC135 == 14092000093
                                    || this.form.codcontable_FAC135 == 14092100093 || this.form.codcontable_FAC135 == 14092200093 || this.form.codcontable_FAC135 == 14092300093
                                    || this.form.codcontable_FAC135 == 14092400093 || this.form.codcontable_FAC135 == 14092500093 || this.form.codcontable_FAC135 == 14092600093
                                    || this.form.codcontable_FAC135 == 14092700093 || this.form.codcontable_FAC135 == 14092800093 || this.form.codcontable_FAC135 == 14092900093
                                    || this.form.codcontable_FAC135 == 14093000093 || this.form.codcontable_FAC135 == 14093100093 || this.form.codcontable_FAC135 == 14093200093
                                    || this.form.codcontable_FAC135 == 13190200092 || this.form.codcontable_FAC135 == 13190400092 || this.form.codcontable_FAC135 == 13190900092
                                    || this.form.codcontable_FAC135 == 13190600092 || this.form.codcontable_FAC135 == 13191300092 || this.form.codcontable_FAC135 == 13191600092
                                    || this.form.codcontable_FAC135 == 13192800092 || this.form.codcontable_FAC135 == 13191100092 || this.form.codcontable_FAC135 == 13191500092
                                    || this.form.codcontable_FAC135 == 13192200092 || this.form.codcontable_FAC135 == 13192400092 || this.form.codcontable_FAC135 == 13191800092
                                    || this.form.codcontable_FAC135 == 13192600092 || this.form.codcontable_FAC135 == 13192000092 || this.form.codcontable_FAC135 == 13191900092
                                    || this.form.codcontable_FAC135 == 13190200093 || this.form.codcontable_FAC135 == 13190400093 || this.form.codcontable_FAC135 == 13190900093
                                    || this.form.codcontable_FAC135 == 13190600093 || this.form.codcontable_FAC135 == 13191300093 || this.form.codcontable_FAC135 == 13191600093
                                    || this.form.codcontable_FAC135 == 13192800093 || this.form.codcontable_FAC135 == 13191100093 || this.form.codcontable_FAC135 == 13191500093
                                    || this.form.codcontable_FAC135 == 13192200093 || this.form.codcontable_FAC135 == 13192400093 || this.form.codcontable_FAC135 == 13191800093
                                    || this.form.codcontable_FAC135 == 13192600093 || this.form.codcontable_FAC135 == 13192000093 || this.form.codcontable_FAC135 == 13191900093
                                    || this.form.codcontable_FAC135 == 24079000090 || this.form.codcontable_FAC135 == 13060500092 || this.form.codcontable_FAC135 == 13060600092
                                    || this.form.codcontable_FAC135 == 13191400092)) {
                                if (this.form.prefijotabla_FAC135.trim() == '') {
                                    this._evaluardato3_FAC135();
                                } else {
                                    this._evaluarnrofact_FAC135();
                                }
                            } else {
                                this._evaluardatocartera_FAC135()
                            }
                        }
                    }
                }
            )
        },
        _evaluarnrofact_FAC135() {
            console.log(' NUMERO FACT TABLA')
            this.FAC135.STOP = '1'
            validarInputs(
                {
                    form: "#VALIDAR6_3_FAC135",
                    orden: '1'
                },
                this._evaluarcodigo_FAC135,
                () => {
                    if (this.FAC135.SCMARCA == '1') {
                        let tabla1 = 0;
                        for (var i in this.FAC135.FACTSALDOS) {
                            this.FAC135.TOTALFACT2 = ''
                            this.FAC135.VLRSALDOS = this.FAC135.FACTSALDOS[i].SALDO.replace(/,/g, '')
                            this.FAC135.TOTALFACT1 = parseInt(this.FAC135.VLRSALDOS.replace('-', '')) * (-1)
                            this.form.prefijotabla_FAC135 = this.FAC135.FACTSALDOS[i].FACTURA.substring(0, 1)
                            this.form.facturatabla_FAC135 = this.FAC135.FACTSALDOS[i].FACTURA.substring(1, 7)
                            if (this.tablareccaja_FAC135[tabla1]){
                                if (tabla1 <= 1) {
                                    if (this.tablareccaja_FAC135[tabla1].VALORDEBITO == 0 && this.tablareccaja_FAC135[tabla1].VALORCREDITO == 0) {
                                        this.tablareccaja_FAC135[tabla1] = {
                                            CODIGO_CONTROL: this.form.codcontable_FAC135,
                                            DESCRIP_CODIGO: this.form.nombrecta_FAC135,
                                            COSTO: '0000',
                                            NIT: this.form.tercerotabla_FAC135.padStart(10, '0'),
                                            SUCURSAL: this.FAC135.FACTSALDOS[i].FACTURA.substring(0, 1),
                                            DOCUM: this.FAC135.FACTSALDOS[i].FACTURA.substring(1, 7),
                                            FECHA_VENCE: this.FAC135.FECHAVENCE,
                                            BASE_RET: this.FAC135.BASERET,
                                            DETALLE: 'PAGO FACTURA',
                                            FLUJOARR: this.FAC135.FLUJOARR,
                                            TIPO_DOC: '',
                                            VALORDEBITO: this.FAC135.TOTALFACT2,
                                            VALORCREDITO: this.FAC135.TOTALFACT1,
                                        }
                                        tabla1++;
                                    } else {
                                        this.tablareccaja_FAC135.push({
                                            CODIGO_CONTROL: this.form.codcontable_FAC135,
                                            DESCRIP_CODIGO: this.form.nombrecta_FAC135,
                                            COSTO: '0000',
                                            NIT: this.form.tercerotabla_FAC135.padStart(10, '0'),
                                            SUCURSAL: this.FAC135.FACTSALDOS[i].FACTURA.substring(0, 1),
                                            DOCUM: this.FAC135.FACTSALDOS[i].FACTURA.substring(1, 7),
                                            FECHA_VENCE: this.FAC135.FECHAVENCE,
                                            BASE_RET: this.FAC135.BASERET,
                                            DETALLE: 'PAGO FACTURA',
                                            FLUJOARR: this.FAC135.FLUJOARR,
                                            TIPO_DOC: '',
                                            VALORDEBITO: this.FAC135.TOTALFACT2,
                                            VALORCREDITO: this.FAC135.TOTALFACT1,
                                        });
                                    }
                                }
                            } else {
                                this.tablareccaja_FAC135.push({
                                    CODIGO_CONTROL: this.form.codcontable_FAC135,
                                    DESCRIP_CODIGO: this.form.nombrecta_FAC135,
                                    COSTO: '0000',
                                    NIT: this.form.tercerotabla_FAC135.padStart(10, '0'),
                                    SUCURSAL: this.FAC135.FACTSALDOS[i].FACTURA.substring(0, 1),
                                    DOCUM: this.FAC135.FACTSALDOS[i].FACTURA.substring(1, 7),
                                    FECHA_VENCE: this.FAC135.FECHAVENCE,
                                    BASE_RET: this.FAC135.BASERET,
                                    DETALLE: 'PAGO FACTURA',
                                    FLUJOARR: this.FAC135.FLUJOARR,
                                    TIPO_DOC: '',
                                    VALORDEBITO: this.FAC135.TOTALFACT2,
                                    VALORCREDITO: this.FAC135.TOTALFACT1,
                                });
                            }
                            this._leerfact2_FAC135();
                        }
                        this.form.numerotabla_FAC135 = this.tablareccaja_FAC135.length - 1;
                        setTimeout(() => {
                            this._inicializatabla_FAC135();
                            this.form.numerotabla_FAC135 = this.form.numerotabla_FAC135 + 1
                        }, 800)
                    } else {
                        if (this.form.prefijotabla_FAC135 == 'C' || this.form.prefijotabla_FAC135 == 'D' || this.form.prefijotabla_FAC135 == 'E') {
                            this._evaluardatocopagos_FAC135();
                        } else {
                            this.form.facturatabla_FAC135 = this.form.facturatabla_FAC135.padStart(6, '0')
                            this._leerfact_FAC135();
                        }
                    }

                }
            )
        },
        _leerfact_FAC135() {
            console.log('LEER FACT 1')
            if (this.form.facturatabla_FAC135 == 000000 || this.form.facturatabla_FAC135.trim() == '') {
                CON851("02", "02", _evaluarnrofact_FAC135(), "error", "error");
            } else {
                if ((this.form.prefijotabla_FAC135 == 'A' || this.form.prefijotabla_FAC135 == 'B' || this.form.prefijotabla_FAC135 == 'D' || this.form.prefijotabla_FAC135 == 'F' || this.form.prefijotabla_FAC135 == 'G' || this.form.prefijotabla_FAC135 == 'H' || this.form.prefijotabla_FAC135 == 'I' ||
                    this.form.prefijotabla_FAC135 == 'J' || this.form.prefijotabla_FAC135 == 'K' || this.form.prefijotabla_FAC135 == 'L' || this.form.prefijotabla_FAC135 == 'M' || this.form.prefijotabla_FAC135 == 'N') && (this.form.facturatabla_FAC135 == '999999')) {
                    this._evaluardato3_FAC135();
                } else {
                    this.FAC135.LLAVENUMTABLA = this.form.prefijotabla_FAC135 + this.form.facturatabla_FAC135
                    let URL = get_url("APP/SALUD/SER808-01.DLL");
                    postData({ datosh: datosEnvio() + this.FAC135.LLAVENUMTABLA + '|' }, URL)
                        .then(data => {
                            this.FAC135.NROCAPITNUM = data.NUMER19[0].FACTCAPIT_NUM.substring(0, 1)
                            this.FAC135.FACTCAPITNUM = data.NUMER19[0].FACTCAPIT_NUM.substring(1, 7)
                            this.FAC135.FECHARETNUM = data.NUMER19[0].FECHA_RET
                            this.FAC135.MESRETNUM = data.NUMER19[0].FECHA_RET.substring(2, 4)
                            this.FAC135.FECHAPRENUM = data.NUMER19[0].FECHA_PRE
                            this.FAC135.MESPRENUM = data.NUMER19[0].FECHA_PRE.substring(2, 4)
                            this.FAC135.NITNUM = data.NUMER19[0].NIT_NUM
                            if (data.NUMER19[0].GLOSA_NUM > 0) {
                                SER505C({ PREFIJO: this.form.prefijotabla_FAC135, FACTURA: this.form.facturatabla_FAC135 }, this._evaluarnrofact_FAC135, this._validacionesfactura_FAC135);
                            } else {
                                if ($_USUA_GLOBAL[0].NIT == 900077520) {
                                    SER505C({ PREFIJO: this.form.prefijotabla_FAC135, FACTURA: this.form.facturatabla_FAC135 }, this._evaluarnrofact_FAC135, this._validacionesfactura_FAC135);
                                } else {
                                    this._validacionesfactura_FAC135()
                                }
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            this._evaluarnrofact_FAC135()
                        })

                }
            }
        },
        _validacionesfactura_FAC135() {
            console.log('VALIDACIONES DE FACT')
            if ((this.FAC135.NROCAPITNUM > 0) && (this.FAC135.FACTCAPITNUM != this.FAC135.LLAVENUMTABLA)) {
                CON851("5C", "5C", this._evaluardatofact_FAC135(), "error", "error");
            } else {
                if (this.FAC135.MESPRENUM > 0) {
                    this.FAC135.FECHALIMI = this.FAC135.FECHAPRENUM
                } else {
                    if (this.FAC135.MESRETNUM > 0) {
                        this.FAC135.FECHALIMI = this.FAC135.FECHARETNUM
                        this.FAC135.MESLIMI = this.FAC135.FECHALIMI.substring(2, 4)
                        if (this.FAC135.MESLIMI == 12) {
                            this.FAC135.MESLIMI = 01;
                            this.FAC135.ANOLIMI = this.FAC135.ANOLIMI + 1;
                        } else {
                            this.FAC135.MESLIMI = this.FAC135.MESLIMI + 1;
                        }
                    }
                }
                this._validarcodigo_FAC135()
            }
        },
        _validarcodigo_FAC135() {
            if (!this.FAC135.tipodoc_FAC135) this.FAC135.tipodoc_FAC135 = this.form.tipofact_FAC135;
            let URL = get_url("APP/SALUD/FAC135.DLL");
            postData({
                datosh: datosEnvio() + '4|' + ' |' + this.form.tipofact_FAC135.substring(0, 1) + '|' + this.form.sucursal_FAC135 + '|' + this.form.prefijo_FAC135 + this.form.factura_FAC135 + '|'
                    + this.form.prefijotabla_FAC135 + this.form.facturatabla_FAC135 + '|' + this.form.codcontable_FAC135 + '|' + this.form.prefijotabla_FAC135 + '|' + this.FAC135.COMPINGRESO + '|'
                    + localStorage.Usuario + '|' + this.FAC135.datosch + '|' + this.form.documento_FAC135 + '|' + this.form.tercerotabla_FAC135.trim().padStart(10, '0') + '|' + this.form.fechavence_FAC135 + '|'
                    + this.FAC135.tipodoc_FAC135.substring(0, 1) + '|'
            }, URL)
                .then(data => {
                    console.log(data, 'VALIDAR CODIGO PASO 4');
                    this.FAC135.RESPUESTA = data.CONSULTA;
                    this.FAC135.invalid = this.FAC135.RESPUESTA[0].SW_INVALID;
                    this.form.debito_FAC135 = this.FAC135.RESPUESTA[0].VALOR.trim();
                    this.FAC135.BASERET = this.FAC135.RESPUESTA[0].BASE_RET.trim();
                    // this.FAC135.PORCENTRETMAE = this.FAC135.RESPUESTA[1].PORCENT_MAE;
                    if (this.FAC135.RESPUESTA[0].SW_INVALID == '8K') CON851('8K', '8K', null, 'error', 'error')
                    this._calcularsaldo_FAC135()

                })
                .catch(err => {
                    console.log(err);
                    this._evaluarnrofact_FAC135();
                })
        },

        _calcularsaldo_FAC135() {
            console.log('calcular saldo')
            if (this.FAC135.NITNUM != this.form.tercerotabla_FAC135.trim().padStart(10, '0')) {
                CON851('06', '06', this._evaluardatofact_FAC135(), 'error', 'error')
            } else {
                let repetido = this.tablareccaja_FAC135.filter(x => x.CODIGO_CONTROL == this.FAC135.MAYORW.trim());
                let repetido2 = this.tablareccaja_FAC135.filter(x => x.SUCURSAL == this.form.prefijotabla_FAC135.trim());
                let repetido3 = this.tablareccaja_FAC135.filter(x => x.DOCUM == this.form.facturatabla_FAC135.trim());
                if (repetido.length > 0 && repetido2 > 0 && repetido3 > 0) {
                    CON851("05", "05", this._evaluardatofact_FAC135(), "error", "Error");
                } else {
                    this._evaluardato3_FAC135()
                }
            }
        },

        _inicializatabla_FAC135() {
            this.form.tercero_FAC135 = ''
            this.form.codcontable_FAC135 = ''
            this.form.nombrecta_FAC135 = ''
            this.form.tercerotabla_FAC135 = ''
            this.form.prefijotabla_FAC135 = ''
            this.form.facturatabla_FAC135 = ''
            this.form.debito_FAC135 = ''
            this.form.credito_FAC135 = ''
            this.form.detalle_FAC135 = ''
            this.form.numerotabla_FAC135++;
            this.form.totalcredito_FAC135 = 0;
            this.form.totaldebito_FAC135 = 0;
            this._evaluarsubtotal_FAC135()
        },
        _leerfact2_FAC135() {
            if (this.form.facturatabla_FAC135 == 000000 || this.form.facturatabla_FAC135.trim() == '') {
                CON851("02", "02", null, "error", "error");
            } else {
                this.FAC135.LLAVENUMTABLA = this.form.prefijotabla_FAC135 + this.form.facturatabla_FAC135
                let URL = get_url("APP/SALUD/SER808-01.DLL");
                postData({ datosh: datosEnvio() + this.FAC135.LLAVENUMTABLA + '|' }, URL)
                    .then(data => {
                        this.FAC135.NROCAPITNUM = data.NUMER19[0].FACTCAPIT_NUM.substring(0, 1)
                        this.FAC135.FACTCAPITNUM = data.NUMER19[0].FACTCAPIT_NUM.substring(1, 7)
                        this.FAC135.FECHARETNUM = data.NUMER19[0].FECHA_RET
                        this.FAC135.MESRETNUM = data.NUMER19[0].FECHA_RET.substring(2, 4)
                        this.FAC135.FECHAPRENUM = data.NUMER19[0].FECHA_PRE
                        this.FAC135.MESPRENUM = data.NUMER19[0].FECHA_PRE.substring(2, 4)
                        this.FAC135.NITNUM = data.NUMER19[0].NIT_NUM
                        if (data.NUMER19[0].GLOSA_NUM > 0) {
                            SER505C({ PREFIJO: this.form.prefijotabla_FAC135, FACTURA: this.form.facturatabla_FAC135 }, this._evaluarnrofact_FAC135, this.__validarcodigo_FAC135);
                        } else {
                            if ($_USUA_GLOBAL[0].NIT == 900077520) {
                                SER505C({ PREFIJO: this.form.prefijotabla_FAC135, FACTURA: this.form.facturatabla_FAC135 }, this._evaluarnrofact_FAC135, this.__validarcodigo_FAC135);
                            } else {
                                if ((this.FAC135.NROCAPITNUM > 0) && (this.FAC135.FACTCAPITNUM != this.FAC135.LLAVENUMTABLA)) {
                                    CON851("5C", "5C", this._evaluardatofact_FAC135(), "error", "error");
                                } else {
                                    if (this.FAC135.MESPRENUM > 0) {
                                        this.FAC135.FECHALIMI = this.FAC135.FECHAPRENUM
                                    } else {
                                        if (this.FAC135.MESRETNUM > 0) {
                                            this.FAC135.FECHALIMI = this.FAC135.FECHARETNUM
                                            this.FAC135.MESLIMI = this.FAC135.FECHALIMI.substring(2, 4)
                                            if (this.FAC135.MESLIMI == 12) {
                                                this.FAC135.MESLIMI = 01;
                                                this.FAC135.ANOLIMI = this.FAC135.ANOLIMI + 1;
                                            } else {
                                                this.FAC135.MESLIMI = this.FAC135.MESLIMI + 1;
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },


        //////////////////// VENTANA C Y E ///////////////////////////
        _evaluardatocopagos_FAC135() {
            $_this = this
            var ventanaactualizacop = bootbox.dialog({
                size: 'medium',
                title: 'ACTUALIZA COPAGOS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Tipo de comprobante:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="TIPOC_FAC135"> ' +
                    '<input id="tipocomprobante_FAC135" class="form-control input-md" data-orden="1" maxlength="1" > ' +
                    '</div> ' +
                    '<button type="button" id="tipocomprobanteBtn_FAC135" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
                    '<i class="icon-magnifier"></i>' +
                    '</button>' +
                    '</div>' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanaactualizacop.off('show.bs.modal');
                            setTimeout(() => { $_this._validacionestipocomp_FAC135() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanaactualizacop.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarnrofact_FAC135() }, 500)
                        }
                    }
                }
            });
            ventanaactualizacop.init($('.modal-footer').hide());
            ventanaactualizacop.init(this._Evaluartipocomprob_FAC135());
            ventanaactualizacop.on('shown.bs.modal', function () {
                $("#tipocomprobante_FAC135").focus();
            });
            ventanaactualizacop.init(_toggleF8([{
                input: 'tipocomprobante',
                app: 'FAC135',
                funct: this._f8tiposervicio
            },]));
        },
        _Evaluartipocomprob_FAC135() {
            _inputControl("disabled");
            validarInputs({
                form: '#TIPOC_FAC135',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.FAC135.tipodoc_FAC135 = $('#tipocomprobante_FAC135').val()
                    if (this.FAC135.tipodoc_FAC135 == '*') {
                        $('#tipocomprobante_FAC135').val(this.FAC135.tipodoc_FAC135 + ' TODOS LOS TIPOS');
                        $('.btn-primary').click();
                    } else if ((this.FAC135.tipodoc_FAC135 > 0) && (this.FAC135.tipodoc_FAC135 < 8)) {
                        for (var i in $_SERVICIOSFAC135) {
                            if (this.FAC135.tipodoc_FAC135 == $_SERVICIOSFAC135[i].COD) {
                                $('#tipocomprobante_FAC135').val($_SERVICIOSFAC135[i].COD + ' - ' + $_SERVICIOSFAC135[i].DESCRIP);
                                $('.btn-primary').click();
                            }
                        }
                    } else {
                        CON851('03', '03', null, 'error', 'error');
                        this._Evaluartipocomprob_FAC135();
                    }
                }
            )
        },
        _validacionestipocomp_FAC135() {
            let datos_envio = datosEnvio() + localStorage.Usuario + '|';
            SolicitarDll({ datosh: datos_envio }, dato => {
                var date = dato.split("|");
                this.FAC135.SUCOPERW = date[1].substr(8, 10);
                if ($_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900541158 || $_USUA_GLOBAL[0].NIT == 800162035) {
                    if (this.FAC135.SUCOPERW.trim() == '') {
                        this.FAC135.SUCOPERW = '01';
                    } else {
                        this.FAC135.SUCFACT = this.FAC135.SUCOPERW
                    }
                } else {
                    this.FAC135.SUCFACT = this.FAC135.PREFIJOLOTE
                }
                let URL = get_url("APP/SALUD/FAC135.DLL");
                postData({
                    datosh: datosEnvio() + '5|' + ' |' + this.form.tipofact_FAC135.substring(0, 1) + '|' + this.form.sucursal_FAC135 + '|' + this.form.prefijo_FAC135 + this.form.factura_FAC135 + '|'
                        + this.form.prefijotabla_FAC135 + this.form.facturatabla_FAC135 + '|' + this.form.codcontable_FAC135 + '|' + this.form.prefijotabla_FAC135 + '|' + this.FAC135.COMPINGRESO + '|'
                        + localStorage.Usuario + '|' + this.FAC135.datosch + '|' + this.form.documento_FAC135 + '|' + this.form.tercerotabla_FAC135.trim().padStart(10, '0') + '|' + this.form.fechavence_FAC135 + '|'
                        + this.FAC135.tipodoc_FAC135.substring(0, 1) + '|'
                }, URL)
                    .then(data => {
                        this.form.detalle_FAC135 = data.CONSULTA[0].DETALLE;
                        this.form.debito_FAC135 = data.CONSULTA[0].VALOR
                        this._evaluardato3_FAC135()

                    })
                    .catch(err => {
                        console.log(err);
                        this._evaluarnrofact_FAC135();
                    })

            }, get_url('APP/CONTAB/CON003.DLL'));
        },
        _evaluardato3_FAC135() {
            if (this.FAC135.PORCENTRETMAE > 0) {
                this._ventanabaseret_fac135();
            } else {
                this.FAC135.BASERET = 0
                this._evaluardatovalor_FAC135();
            }
        },
        _evaluardatovalor_FAC135() {
            validarInputs(
                {
                    form: "#VALIDAR7_FAC135",
                    orden: '1'
                },
                this._evaluarcodigo_FAC135,
                () => {
                    this.FAC135.VALORARR = this.form.debito_FAC135
                    if (this.FAC135.VALORARR.toString().trim() == '') {
                        this._evaluardatovalor_FAC135();
                    } else if (this.FAC135.VALORARR == 0 && this.FAC135.MAYORW > 1200) {
                        this._evaluardato3_FAC135();
                    } else {
                        if (this.FAC135.VALORARR.indexOf('-') >= 0) {
                            this.FAC135.TOTALFACT2 = ''
                            this.FAC135.TOTALFACT1 = parseInt(this.FAC135.VALORARR.replace('-', '')) * (-1)
                            if (this.FAC135.MAYORW == 1105) {
                                CON851("46", "46", null, "error", "error");
                                if ($_USUA_GLOBAL[0].NIT == 800037021 && this.FAC135.CODSUBW == 110502) {
                                    this._mostrarvalor_FAC135();
                                } else {
                                    this.FAC135.VALORARR = '';
                                    this._evaluardatovalor_FAC135();
                                }
                            } else {
                                this._mostrarvalor_FAC135();
                            }
                        } else {
                            this.FAC135.TOTALFACT2 = parseInt(this.FAC135.VALORARR)
                            this.FAC135.TOTALFACT1 = ''
                            if (this.FAC135.MAYORW == 1105) {
                                this.FAC135.VLREFECTW = this.FAC135.VALORARR;
                            }
                            this._mostrarvalor_FAC135();
                        }
                    }
                }
            )
        },
        _mostrarvalor_FAC135() {
            if (($_USUA_GLOBAL[0].CARTERA == 'S') && (this.form.prefijotabla_FAC135 == 'A') && (this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYDEUD1 || this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYDEUD2)) {
                this.FAC135.VALORTOTALCOPAGO = this.form.debito_FAC135 + this.FAC135.COPAGOESTNUM;
            }
            if (($_USUA_GLOBAL[0].CARTERA == 'S') && ($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (this.form.prefijotabla_FAC135 == 'P' || this.form.prefijotabla_FAC135 == 'O' || this.form.prefijotabla_FAC135 == 'Q' || this.form.prefijotabla_FAC135 == 'R' || this.form.prefijotabla_FAC135 == 'S' || this.form.prefijotabla_FAC135 == 'U') &&
                (this.form.tercerotabla_FAC135 == 9990 || this.form.tercerotabla_FAC135 == 9991 || this.form.tercerotabla_FAC135 == 9993
                    || this.form.tercerotabla_FAC135 == 9999 || this.form.tercerotabla_FAC135 == 892099243) && (this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYDEUD1 || this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYDEUD2)) {
                this.FAC135.VALORTOTALCOPAGO = this.form.debito_FAC135 + this.FAC135.COPAGOESTNUM;
                if (this.FAC135.VALORTOTALCOPAGO >= 0) {
                    this.FAC135.SUBCTAW = 13
                } else {
                    this.FAC135.SUBCTAW = 11
                }
                this.form.codcontable_FAC135 = this.FAC135.MAYORW + this.FAC135.SUBCTAW + this.FAC135.AUXILW;
            }
            this._agregartabla_FAC135()
        },
        _agregartabla_FAC135() {
            if (this.form.numerotabla_FAC135 <= this.tablareccaja_FAC135.length) {
                if (this.form.prefijo_FAC135 == 'C' || this.form.prefijo_FAC135 == 'D' || this.form.prefijo_FAC135 == 'E') {
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].CODIGO_CONTROL = this.form.codcontable_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].DESCRIP_CODIGO = this.form.nombrecta_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].COSTO = this.form.centrocosto_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].NIT = this.form.tercerotabla_FAC135.padStart(10, '0');
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].BASE_RET = this.FAC135.BASERET;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].FECHA_VENCE = this.FAC135.FECHAVENCE;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].FLUJOARR = this.FAC135.FLUJOARR;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].TIPO_DOC = this.FAC135.tipodoc_FAC135.substring(0, 1);
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].SUCURSAL = this.form.prefijotabla_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].DOCUM = this.form.facturatabla_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].VALORDEBITO = this.FAC135.TOTALFACT2;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].VALORCREDITO = this.FAC135.TOTALFACT1;
                } else {
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].CODIGO_CONTROL = this.form.codcontable_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].DESCRIP_CODIGO = this.form.nombrecta_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].COSTO = this.form.centrocosto_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].NIT = this.form.tercerotabla_FAC135.padStart(10, '0');
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].BASE_RET = this.FAC135.BASERET;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].FECHA_VENCE = this.FAC135.FECHAVENCE;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].FLUJOARR = this.FAC135.FLUJOARR;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].SUCURSAL = this.form.prefijotabla_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].DOCUM = this.form.facturatabla_FAC135;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].VALORDEBITO = this.FAC135.TOTALFACT2;
                    this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].VALORCREDITO = this.FAC135.TOTALFACT1;
                }
            } else {
                if (this.form.prefijo_FAC135 == 'C' || this.form.prefijo_FAC135 == 'D' || this.form.prefijo_FAC135 == 'E') {
                    this.tablareccaja_FAC135.push({
                        CODIGO_CONTROL: this.form.codcontable_FAC135,
                        DESCRIP_CODIGO: this.form.nombrecta_FAC135,
                        COSTO: this.form.centrocosto_FAC135,
                        NIT: this.form.tercerotabla_FAC135.padStart(10, '0'),
                        SUCURSAL: this.form.prefijotabla_FAC135,
                        DOCUM: this.form.facturatabla_FAC135,
                        FECHA_VENCE: this.FAC135.FECHAVENCE,
                        BASE_RET: this.FAC135.BASERET,
                        FLUJOARR: this.FAC135.FLUJOARR,
                        TIPO_DOC: this.FAC135.tipodoc_FAC135.substring(0, 1),
                        VALORDEBITO: this.FAC135.TOTALFACT2,
                        VALORCREDITO: this.FAC135.TOTALFACT1,
                    });
                } else {
                    this.tablareccaja_FAC135.push({
                        CODIGO_CONTROL: this.form.codcontable_FAC135,
                        DESCRIP_CODIGO: this.form.nombrecta_FAC135,
                        COSTO: this.form.centrocosto_FAC135,
                        NIT: this.form.tercerotabla_FAC135.padStart(10, '0'),
                        SUCURSAL: this.form.prefijotabla_FAC135,
                        DOCUM: this.form.facturatabla_FAC135,
                        FECHA_VENCE: this.FAC135.FECHAVENCE,
                        BASE_RET: this.FAC135.BASERET,
                        FLUJOARR: this.FAC135.FLUJOARR,
                        TIPO_DOC: '',
                        VALORDEBITO: this.FAC135.TOTALFACT2,
                        VALORCREDITO: this.FAC135.TOTALFACT1,
                    });
                }
            }
            this._evaluardatodetalle_FAC135();
        },
        _ventanabaseret_fac135() {

            $_this = this
            var ventanabaseret = bootbox.dialog({
                size: 'medium',
                title: 'RETENCION EN LA FUENTE',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Base gravable:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="BASEGRAV_FAC135"> ' +
                    '<input id="basegravable_FAC135" class="form-control input-md" data-orden="1" maxlength="13"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanabaseret.off('show.bs.modal');
                            setTimeout(() => { $_this._mostrarvalor_FAC135() }, 500)
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanabaseret.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarcodigo_FAC135(); }, 500)
                        }
                    }
                }
            });
            ventanabaseret.init($('.modal-footer').hide());
            ventanabaseret.init(this._Evaluarbaseret_FAC135);
            ventanabaseret.on('shown.bs.modal', function () {
                $("#basegravable_FAC135").focus();
            });
        },
        _Evaluarbaseret_FAC135() {
            _inputControl("disabled");
            var baseret_FAC135Mask = new IMask(document.getElementById('basegravable_FAC135'),
                { mask: Number, min: 0, max: 99999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
            );
            $('#basegravable_FAC135').val(this.FAC135.BASERET);
            if (this.FAC135.BASERET == 0) {
                this.FAC135.BASERET = this.FAC135.DESCUADRE;
            }
            validarInputs({
                form: '#BASEGRAV_FAC135',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.FAC135.BASERET = baseret_FAC135Mask.value.replace(',', '');
                    this.FAC135.VALORARR = this.FAC135.BASERET * this.FAC135.PORCENTRETMAE * -0.01
                    if (this.FAC135.VALORARR.toString().indexOf('-') >= 0) {
                        console.log('es negativo')
                        this.FAC135.TOTALFACT2 = ''
                        this.FAC135.TOTALFACT1 = parseFloat(this.FAC135.VALORARR.toString().replace('-', '')) * (-1)
                    } else {
                        console.log('es positivo')
                        this.FAC135.TOTALFACT2 = parseInt(this.FAC135.VALORARR)
                        this.FAC135.TOTALFACT1 = ''
                    }
                    $('.btn-primary').click();
                }
            )
        },

        _evaluardatodetalle_FAC135() {
            console.log('dato detalle', this.form.numerotabla_FAC135)
            validarInputs(
                {
                    form: "#VALIDAR9_FAC135",
                    orden: '1'
                },
                this._evaluardato3_FAC135,
                () => {
                    this.form.detalle_FAC135 = this.form.detalle_FAC135.toUpperCase().trim();
                    if (this.form.detalle_FAC135.trim() == '') {
                        CON851('02', '02', this._evaluardatodetalle_FAC135(), 'error', 'error')
                    } else {
                        if (this.form.numerotabla_FAC135 > 300) {
                            CON851('90', '90', this._evaluarsubtotal_FAC135(), 'error', 'error')
                        } else {
                            this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].DETALLE = this.form.detalle_FAC135
                            if (this.form.numerotabla_FAC135 < this.tablareccaja_FAC135.length - 1) {
                                this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 1].DETALLE = this.form.detalle_FAC135;
                            }
                            this.form.tercero_FAC135 = ''
                            this.form.codcontable_FAC135 = ''
                            this.form.nombrecta_FAC135 = ''
                            this.form.tercerotabla_FAC135 = ''
                            this.form.prefijotabla_FAC135 = ''
                            this.form.facturatabla_FAC135 = ''
                            this.form.debito_FAC135 = ''
                            this.form.credito_FAC135 = ''
                            this.form.detalle_FAC135 = ''
                            this.form.numerotabla_FAC135++;
                            this.form.totalcredito_FAC135 = 0;
                            this.form.totaldebito_FAC135 = 0;
                            this._evaluarsubtotal_FAC135()
                        }
                    }
                }
            )
        },
        _evaluarsubtotal_FAC135() {
            this.form.diferencia_FAC135 = ''
            this.form.totalcredito_FAC135 = 0;
            this.form.totaldebito_FAC135 = 0;
            for (var i in this.tablareccaja_FAC135) {
                if (this.tablareccaja_FAC135[i].VALORCREDITO == undefined) this.tablareccaja_FAC135[i].VALORCREDITO = 0;
                if (this.tablareccaja_FAC135[i].VALORDEBITO == undefined) this.tablareccaja_FAC135[i].VALORDEBITO = 0;
                this.form.totalcredito_FAC135 = this.tablareccaja_FAC135[i].VALORCREDITO + parseInt(this.form.totalcredito_FAC135)
                this.form.totaldebito_FAC135 = this.tablareccaja_FAC135[i].VALORDEBITO + parseInt(this.form.totaldebito_FAC135)
            }
            if (this.form.totalcredito_FAC135 != 0) {
                this.FAC135.DESCUADRE = 0
                this.form.totalcredito_FAC135 = this.form.totalcredito_FAC135.toString().replace('-', '')
                if (this.form.totalcredito_FAC135.toString() != this.form.totaldebito_FAC135.toString()) {
                    $('#VALIDAR13_FAC135').removeClass('hidden');
                    this.FAC135.DESCUADRE = this.form.totaldebito_FAC135 - this.form.totalcredito_FAC135
                    this.form.diferencia_FAC135 = this.FAC135.DESCUADRE
                }
            }
            if (this.FAC135.SCMARCA == '1') {
                this._evaluarcodigo_FAC135()
            } else {
                this._ingresartabla_FAC135();
            }

        },
        _total_FAC135() {
            if (this.form.totaldebito_FAC135 == 0 && this.form.totalcredito_FAC135 == 0 && this.FAC135.MAYORW.trim() == '') {
                this.form.numerotabla_FAC135 = '0'
                if (this.FAC135.SCMARCA == '1') {
                    this._evaluarcodigo_FAC135()
                } else {
                    this._ingresartabla_FAC135();
                }
            } else if (this.FAC135.DESCUADRE == 0) {
                this._evaluardatorefencia_FAC135()
            } else {
                if (this.FAC135.SCMARCA == '1') {
                    this._evaluarcodigo_FAC135()
                } else {
                    CON851('', 'Los valores no son iguales', this._ingresartabla_FAC135(), 'error', 'error')
                }
            }
        },
        _evaluardatorefencia_FAC135() {
            if (this.FAC135.CONTRATOLOTE == 'S') {
                $('#vVALIDAR12_FAC135').removeClass('hidden');
                validarInputs(
                    {
                        form: "#VALIDAR12_FAC135",
                        orden: '1'
                    },
                    () => { this._evaluarcodigo_FAC135(); },
                    () => {
                        this.FAC135.REFERENCIAW = this.form.refencia_FAC135
                        if (this.form.refencia_FAC135.trim() == '') {
                            CON851('02', '02', this._evaluardatorefencia_FAC135(), 'error', 'error')
                        } else {
                            this._evaluarcheque_FAC135();
                        }
                    }
                )

            } else {
                $('#VALIDAR11_FAC135').removeClass('hidden');
                validarInputs(
                    {
                        form: "#VALIDAR11_FAC135",
                        orden: '1'
                    },
                    () => { this._evaluarcodigo_FAC135(); },
                    () => {
                        this.FAC135.REFERENCIAW = this.form.documento_FAC135.toUpperCase();
                        if (this.FAC135.REFERENCIAW.trim() == '') {
                            CON851('02', '02', this._evaluardatorefencia_FAC135(), 'error', 'error')
                        } else {
                            this._evaluarcheque_FAC135();
                        }
                    }
                )
            }
        },
        _evaluarcheque_FAC135() {
            if (this.FAC135.REFERENCIAW.substring(0, 1) == 'E') {
                this.FAC135.DATOSCHW = ' ';
                if (this.FAC135.VLREFECTW > 0) {
                    var $_this = this;
                    var venatanacambio = bootbox.dialog({
                        size: 'medium',
                        title: 'CALCULAR CAMBIO',
                        message: '<div class="row"> ' +
                            '<div class="col-md-12"> ' +

                            '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Valor factura:" + '</label> ' +
                            '<div class="col-md-6 col-sm-6 col-xs-6" id="VALORFACT_FAC135"> ' +
                            '<input id="valorfactura_FAC135" class="form-control input-md" data-orden="1" maxlength="13"> ' +
                            '</div> ' +
                            '</div> ' +
                            '<div class="salto-linea"></div>' +
                            '<div class="col-md-10 col-sm-6 col-xs-6 head-box"> ' +
                            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Valor recibido:" + '</label> ' +
                            '<div class="col-md-6 col-sm-6 col-xs-6" id="VALORRECIB_FAC135"> ' +
                            '<input id="valorrecibido_FAC135" class="form-control input-md" data-orden="1" maxlength="13"> ' +
                            '</div> ' +
                            '</div> ' +

                            '<div class="salto-linea"></div>' +
                            '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Valor cambio:" + '</label> ' +
                            '<div class="col-md-6 col-sm-6 col-xs-6" id="VALORCAMB_FAC135"> ' +
                            '<input id="valorcambio_FAC135" class="form-control input-md" data-orden="1" maxlength="13"> ' +
                            '</div> ' +
                            '</div> ' +
                            '</div>' +
                            '</div>',
                        buttons: {
                            confirm: {
                                label: 'Aceptar',
                                className: 'btn-primary',
                                callback: function () {
                                    venatanacambio.off('show.bs.modal');
                                    setTimeout(() => { $_this._confirmargrabar_FAC135() }, 500)

                                }
                            },
                            cancelar: {
                                label: 'Cancelar',
                                className: 'btn-danger',
                                callback: function () {
                                    venatanacambio.off('show.bs.modal');
                                    setTimeout(() => { $_this._confirmargrabar_FAC135() }, 500)
                                }
                            }
                        }
                    });
                    venatanacambio.init($('.modal-footer').hide());
                    venatanacambio.init(this._evaluarrecibido_FAC135());
                    venatanacambio.on('shown.bs.modal', function () {
                        $("#valorrecibido_FAC135").focus();
                    });
                }
            } else {
                var $_this = this;
                var ventanacheque = bootbox.dialog({
                    size: 'medium',
                    title: 'DATOS DEL CHEQUE',
                    message: '<div class="row"> ' +
                        '<div class="col-md-12"> ' +

                        '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                        '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Base gravable:" + '</label> ' +
                        '<div class="col-md-6 col-sm-6 col-xs-6" id="DATOSCHW_FAC135"> ' +
                        '<input id="datoch_FAC135" class="form-control input-md" data-orden="1" maxlength="13"> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +
                        '</div>',
                    buttons: {
                        confirm: {
                            label: 'Aceptar',
                            className: 'btn-primary',
                            callback: function () {
                                ventanacheque.off('show.bs.modal');
                                setTimeout(() => { $_this._confirmargrabar_FAC135() }, 500)

                            }
                        },
                        cancelar: {
                            label: 'Cancelar',
                            className: 'btn-danger',
                            callback: function () {
                                ventanacheque.off('show.bs.modal');
                                setTimeout(() => { $_this._evaluardatorefencia_FAC135()() }, 500)
                            }
                        }
                    }
                });
                ventanacheque.init($('.modal-footer').hide());
                ventanacheque.init(this._Evaluardech_FAC135());
                ventanacheque.on('shown.bs.modal', function () {
                    $("#datoch_FAC135").focus();
                });

            }
        },
        _Evaluardech_FAC135() {
            _inputControl("disabled");
            validarInputs({
                form: '#DATOSCHW_FAC135',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.FAC135.DATOSCHW = $('#datoch_FAC135').val().toUpperCase();
                    $('.btn-primary').click();
                }
            )
        },
        _evaluarrecibido_FAC135() {
            var valores_FAC135 = IMask.createPipe({ mask: Number, scale: 2, radix: '.', thousandsSeparator: ',', normalizeZeros: true, padFractionalZeros: true, });
            var recibido_FAC135Mask = new IMask(document.getElementById('valorrecibido_FAC135'), { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
            $('#valorfactura_FAC135').val(valores_FAC135(this.FAC135.VLREFECTW))
            _inputControl("disabled");
            validarInputs({
                form: '#VALORRECIB_FAC135',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.FAC135.BILLETEW = recibido_FAC135Mask.value.replace(',', '');
                    this.FAC135.VALORVEN = this.FAC135.VLREFECTW - this.FAC135.BILLETEW
                    $('#valorcambio_FAC135').val(valores_FAC135(this.FAC135.VALORVEN.toString()))
                    if (this.FAC135.BILLETEW > 0 && this.FAC135.VALORVEN > 0) {
                        CON851('07', '07', this._evaluarrecibido_FAC135(), 'error', 'error')
                    } else {
                        $('.btn-primary').click();
                    }
                }
            )
        },
        ////////////////////////////////////GRABAR OPCION////////////////////////////////////////////////////////////

        _confirmargrabar_FAC135() {
            _FloatText({ estado: "off" });
            CON851P("01", this._evaluardatorefencia_FAC135, this._grabar_FAC135);
        },
        _grabar_FAC135() {
            var dataenvio = {};
            if (this.FAC135.CONSECLOTE == '1') dataenvio.datosh = `|${localStorage.Contab}|\\CONTROL\\|${this.form.lote_FAC135.substring(0, 2)}|`
            else dataenvio.datosh = `${datosEnvio()}${this.form.lote_FAC135.substring(0, 2)}|`
            postData(dataenvio, get_url("APP/CONTAB/CON007.DLL"))
                .then(data => {
                    console.debug(data);
                    data = data.split("|");
                    this.FAC135.COMPINGRESO = parseInt(data[1].substring(3, 9)).toString().padStart(6, '0');
                    this.form.comprobante_FAC135 = data[1].substring(3, 9);
                    if (this.FAC135.CONSECLOTE == '1') dataenvio.datosh = `|${localStorage.Contab}|\\CONTROL\\|${this.form.lote_FAC135.substring(0, 2)}|${this.form.anoelab_FAC135.substring(2, 4)}${this.form.meselab_FAC135}${this.form.diaelab_FAC135}|${this.form.comprobante_FAC135}|`
                    else dataenvio.datosh = `${datosEnvio()}${this.form.lote_FAC135.substring(0, 2)}|${this.form.anoelab_FAC135.substring(2, 4)}${this.form.meselab_FAC135}${this.form.diaelab_FAC135}|${this.form.comprobante_FAC135}|`
                    SolicitarDll(dataenvio, data => {
                        console.log(data)
                        data = data.split('|');
                        this.form.comprobante_FAC135 = data[1].substring(3, 9);
                        // if (this.FAC135.CONSECLOTE == '1') dataenvio.datosh = `|${localStorage.Contab}|\\CONTROL\\|7|${this.form.lote_FAC135.substring(0, 2)}|${this.form.tipofact_FAC135.substring(0, 1)}|${this.form.sucursal_FAC135}|${this.form.prefijo_FAC135}${this.form.factura_FAC135}|${this.form.prefijotabla_FAC135}${this.form.facturatabla_FAC135}|${this.form.codcontable_FAC135}|${this.form.prefijotabla_FAC135}|${this.FAC135.COMPINGRESO}|${localStorage.Usuario}||||${this.form.anoelab_FAC135.substring(2, 4)}${this.form.meselab_FAC135}${this.form.diaelab_FAC135}|`
                        // else dataenvio.datosh = `${datosEnvio()}7|${this.form.lote_FAC135.substring(0, 2)}|${this.form.tipofact_FAC135.substring(0, 1)}|${this.form.sucursal_FAC135}|${this.form.prefijo_FAC135}|${this.form.factura_FAC135}|${this.form.prefijotabla_FAC135}${this.form.facturatabla_FAC135}|${this.form.codcontable_FAC135}|${this.form.prefijotabla_FAC135}|${this.FAC135.COMPINGRESO}|${localStorage.Usuario}||||${this.form.anoelab_FAC135.substring(2, 4)}${this.form.meselab_FAC135}${this.form.diaelab_FAC135}|`
                        dataenvio.datosh = `${datosEnvio()}7|${this.form.lote_FAC135.substring(0, 2)}|${this.form.tipofact_FAC135.substring(0, 1)}|${this.form.sucursal_FAC135}|${this.form.prefijo_FAC135}${this.form.factura_FAC135}|${this.form.prefijotabla_FAC135}${this.form.facturatabla_FAC135}|${this.form.codcontable_FAC135}|${this.form.prefijotabla_FAC135}|${this.FAC135.COMPINGRESO}|${localStorage.Usuario}||||${this.form.anoelab_FAC135.substring(2, 4)}${this.form.meselab_FAC135}${this.form.diaelab_FAC135}|`
                        var lin = 1;
                        for (var i in this.tablareccaja_FAC135) {
                            if (this.tablareccaja_FAC135[i].VALORCREDITO == '') valor = this.tablareccaja_FAC135[i].VALORDEBITO
                            else valor = this.tablareccaja_FAC135[i].VALORCREDITO
                            dataenvio['LIN-' + lin.toString().padStart(3, '0')] = this.tablareccaja_FAC135[i].CODIGO_CONTROL + '|' + this.tablareccaja_FAC135[i].COSTO + '|' + this.tablareccaja_FAC135[i].NIT + '|' + this.tablareccaja_FAC135[i].SUCURSAL + '|' + this.tablareccaja_FAC135[i].DOCUM + '|' + valor + '|' + this.tablareccaja_FAC135[i].BASE_RET + '|' + this.tablareccaja_FAC135[i].DETALLE + '|' + this.tablareccaja_FAC135[i].TIPO_DOC + '|' + this.tablareccaja_FAC135[i].FECHA_VENCE + '|' + this.tablareccaja_FAC135[i].FLUJOARR + '|';
                            lin++;
                        }
                        console.log(data);
                        postData(dataenvio, get_url("APP/SALUD/FAC135.DLL"))
                        .then(data => {
                            CON851('', 'Grabado Correctamente', null, 'success', 'Exito');
                            this._impresion_FAC135();
                        })
                        .catch(err => {
                            console.error(err);
                            this._evaluardatodetalle_FAC135();
                        })
                    }, get_url('APP/CONTAB/CON007X.DLL'));
                })
                .catch(err => {
                    console.error(err);
                    this._evaluardatodetalle_FAC135();
                })
        },
        _impresion_FAC135() {
            let impresion = {
                NIT: $_USUA_GLOBAL[0].NIT,
                NOMBREUSU: $_USUA_GLOBAL[0].NOMBRE,
                LOTE: this.form.nombreusu_FAC135.substring(0, 2),
                SUCURSAL: this.form.sucursal_FAC135,
                NITUSU: $_USUA_GLOBAL[0].NIT,
                NOMBRELOTE: this.form.nombrelote_FAC135,
                COMPROBANTE: this.form.comprobante_FAC135,
                DIRECCIONUSU: $_USUA_GLOBAL[0].DIRECC,
                TELOFONOUSU: $_USUA_GLOBAL[0].TEL,
                FECHA: this.form.anoelab_FAC135 + this.form.meselab_FAC135 + this.form.diaelab_FAC135,
                NOMBRECIUDADUSU: $_USUA_GLOBAL[0].NOMBRE_CIUD,
                VLRCREDITO: this.form.totalcredito_FAC135,
                VLRDEBITO: this.form.totaldebito_FAC135,
                VALORENLETRAS: FAC146(this.form.totalcredito_FAC135),
                TABLA: this.tablareccaja_FAC135,
                COLUMNAS: ['CODIGO_CONTROL', 'DESCRIP_CODIGO', 'DOCUM', 'VALORDEBITO', 'VALORCREDITO'],
                WIDTH: ['13%', '43%', '15%', '15%', '15%'],
                DESCRIPCIONTERCERO: ' ',
                IDTERCERO: ' ',
                DIRECCIONTERCERO: ' ',
                REFERMOV: this.FAC135.REFERENCIAW,
                OTROMOV: this.FAC135.DATOSCHW,
                TIPOCOMP: ' ',
                IDMOV: ' ',
                DESCRIPCIONID: ' ',
            }
            for (var i in this.tablareccaja_FAC135) {
                if (this.tablareccaja_FAC135[i].VALORDEBITO.toString().trim() != '') {
                    impresion.DETALLEMOV = this.tablareccaja_FAC135[i].DETALLE;
                    let tercero = this.fac135._terceros.filter(x => parseInt(this.tablareccaja_FAC135[i].NIT).toString() == x.COD.trim());
                    console.log(tercero);
                    impresion.DESCRIPCIONTERCERO = tercero[0].NOMBRE;
                    impresion.IDTERCERO = tercero[0].COD;
                    impresion.DIRECCIONTERCERO = tercero[0].TELEF;
                } else {
                    let tercero = this.fac135._terceros.filter(x => parseInt(this.tablareccaja_FAC135[i].NIT).toString() == x.COD.trim());
                    console.log(tercero);
                    impresion.DESCRIPCIONID = tercero[0].NOMBRE;
                    impresion.IDMOV = tercero[0].COD;
                }
            }
            _impresioncopagosyrecibosdecaja(impresion, this._evaluardatodetalle_FAC135, _toggleNav);
        },
        _evaluardatoproveedor_FAC135() {
            console.log('DATO PROVEEDOR')
            if (this.FAC135.MAYORW > 2000 && this.FAC135.MAYORW < this.FAC135.CTASEXEP.MAYLIMI1) {
                this.FAC135.STOP = '0'
                validarInputs(
                    {
                        form: "#VALIDAR6_3_FAC135",
                        orden: '1'
                    },
                    () => { this._evaluardiaelaboracion_FAC135(); },
                    () => {
                        this.form.facturatabla_FAC135 = this.form.facturatabla_FAC135.padStart(6, '0')
                        if ((this.form.facturatabla_FAC135 == '0000000') || (this.form.facturatabla_FAC135.trim() == '')) {
                            CON851("03", "03", this._evaluardatoproveedor_FAC135(), "error", "error");
                        } else {
                            this._sumarproveedor_FAC135()
                        }
                    }
                )
            } else {
                console.log('EVALUAR DATO CITA')
                this._evaluardatocita_FAC135();
            }
        },
        _sumarproveedor_FAC135() {
            console.log('SUMAR PROVEEDORES')
            let URL = get_url("APP/SALUD/FAC135.DLL");
            postData({ datosh: datosEnvio() + '3| | | | | | | | | | |' + this.form.prefijotabla_FAC135 + this.form.facturatabla_FAC135 + '|' + this.form.tercerotabla_FAC135.trim().padStart(10, '0') + '| | |' }, URL)
                .then(data => {
                    this.FAC135.FECHAVENCEMOVI = data.CONSULTA[0].FECHA_VENCE;
                    this.FAC135.VALOR = data.CONSULTA[0].VALOR
                    this.FAC135.TOTAL_FACT = data.CONSULTA[0].TOTAL_FACT
                    let valor = this.FAC135.VALOR;
                    console.log(valor);
                    if (isNaN(parseInt(valor))) this.FAC135.VALOR = '0'
                    if (this.FAC135.VALOR.indexOf('-') > 0) {
                        this.form.credito_FAC135 = parseInt(this.FAC135.VALOR.replace('-', '')) * (-1)
                    } else {
                        this.form.debito_FAC135 = parseInt(this.FAC135.VALOR)
                    }
                    this._evaluarfechapro_FAC135()
                })
                .catch(err => {
                    console.log(err);
                    if (err.MENSAJE == '01') {
                        this._evaluarnrofact_FAC135();
                    } else {
                        this._evaluardatoproveedor_FAC135()
                    }
                })
        },
        _evaluarfechapro_FAC135() {
            if (this.FAC135.TOTAL_FACT < 0) {
                this._evaluardato3_FAC135();
            } else {
                if (this.FAC135.FECHAVENCE.trim() == '' || this.FAC135.FECHAVENCE == "000000") {
                    this.FAC135.FECHASISTEMA = moment().format("YYMMDD");
                    this.FAC135.FECHAVENCE = this.FAC135.FECHASISTEMA
                    this.form.anorecaudo_FAC135 = this.FAC135.FECHAVENCE.substring(0, 2)
                    this.form.mesrecaudo_FAC135 = this.FAC135.FECHAVENCE.substring(2, 4)
                    this.form.diarecaudo_FAC135 = this.FAC135.FECHAVENCE.substring(4, 6)
                }
                validarInputs(
                    {
                        form: "#VALIDARRECAUDO_FAC135",
                        orden: '1'
                    }, this._evaluardatoproveedor_FAC135,
                    () => {
                        if (this.form.anorecaudo_FAC135.trim() == "") {
                            CON851("", "Año incorrecto! ", this._evaluarfechapro_FAC135("1"), "error", "error");
                        } else {
                            this.form.mesrecaudo_FAC135 = this.form.mesrecaudo_FAC135.padStart(2, "0");
                            if (this.form.mesrecaudo_FAC135.trim() == "" || this.form.mesrecaudo_FAC135 < 1 || this.form.mesrecaudo_FAC135 > 12) {
                                CON851("", "Mes incorrecto! ", this._evaluarfechapro_FAC135("2"), "error", "error");
                            } else {
                                this.form.diarecaudo_FAC135 = this.form.diarecaudo_FAC135.padStart(2, "0");
                                if (this.form.diarecaudo_FAC135.trim() == "" || this.form.diarecaudo_FAC135 < 1 || this.form.diarecaudo_FAC135 > 31) {
                                    CON851("", "Dia incorrecto! ", this._evaluarfechapro_FAC135("3"), "error", "error");
                                } else {
                                    this.FAC135.FECHAVENCE = this.form.anorecaudo_FAC135 + this.form.mesrecaudo_FAC135 + this.form.diarecaudo_FAC135
                                    this._evaluardato3_FAC135();
                                }
                            }
                        }
                    }
                )
            }
        },
        _evaluardatocita_FAC135() {
            console.log('DATO CITA')
            // this.form.codcontable_FAC135 = '42954100001'
            if (this.form.codcontable_FAC135 == '42954100001') {
                CON851("3J", "3J", null, "error", "error");
                console.log('SER836I', 'falta revisarlo')
                $_this = this
                var ventanapacientecita = bootbox.dialog({
                    size: "medium",
                    title: "CITAS PENDIENTES",
                    message:
                        '<div class="row"> ' +
                        '<div class="col-md-12"> ' +


                        '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "Doc. Identidad:" + '</label> ' +
                        '<div class="col-md-9 col-sm-6 col-xs-6" id="DOCCITA_FAC135"> ' +
                        '<input id="docpaccita_FAC135" class="form-control input-md" data-orden="1" maxlength="15" > ' +
                        '</div> ' +
                        '<button type="button" id="docpaccitaBtn_FAC135" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
                        '<i class="icon-magnifier"></i>' +
                        '</button>' +
                        '</div>' +
                        '</div> ' +

                        "</div> " +
                        "</div> " +
                        "</div>",
                    buttons: {
                        confirm: {
                            label: "Aceptar",
                            className: "btn-primary",
                            callback: function () {
                                ventanapacientecita.off("show.bs.modal");
                                // setTimeout(_editarpaci_7767, 300);
                            },
                        },
                        cancelar: {
                            label: "Cancelar",
                            className: "btn-danger",
                            callback: function () {
                                ventanapacientecita.off("show.bs.modal");
                                setTimeout($_this._evaluarnit_FAC135, 300);
                            },
                        },
                        f8pacientescitas: {
                            label: 'Pacientes',
                            className: 'btn-info',
                            callback: function () {
                                ventanapacientecita.off('show.bs.modal');
                                setTimeout($_this._ventanapacientecita_FAC135, 300);
                            }
                        }
                    },
                });
                ventanapacientecita.init($(".modal-footer").hide());
                ventanapacientecita.init(this._evaluardoccita_FAC135());
                ventanapacientecita.on("shown.bs.modal", function () {
                    $("#docpaccita_FAC135").focus();
                });
                ventanapacientecita.on('shown.bs.modal', function (e) {
                    _toggleF8([{
                        input: 'docpaccita', app: 'FAC135', funct: (e) => {
                            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                                set_Event_validar('#DOCCITA_FAC135', 'off')
                                $('.btn-info').click();
                            }
                        }
                    },])
                });
            } else {
                this._evaluardatodocum_FAC135();
            }
        },
        _evaluardoccita_FAC135() {
            _inputControl("disabled");
            validarInputs({
                form: "#DOCCITA_FAC135",
                orden: "1",
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.FAC135.CODCITA = $("#docpaccita_FAC135").val().padStart(15, "0");
                    console.log(this.FAC135.CODCITA)
                    $("#docpaccita_FAC135").val(this.FAC135.CODCITA)
                    if (this.FAC135.CODCITA == 0) {
                        this._evaluardoccita_FAC135()
                    } else {
                        let URL = get_url("APP/SALUD/SER810-1.DLL");
                        postData({
                            datosh: datosEnvio() + this.FAC135.CODCITA + "|",
                        }, URL)
                            .then(data => {
                                console.log(data)
                                // this.FAC135.PACICITAW = data["REG-PACI"];
                                SER836({ PACIENTE: this.FAC135.CODCITA, FECHA: this.FAC135.FECHAACTUAL, ANO: this.FAC135.FECHAACTUAL.substring(0, 4) }, () => {
                                    // this._validarcodigo_SAL401();
                                }, data => {
                                    console.log(data);
                                    this.FAC135.CITAS = data;
                                    // $('.btn-primary').click();
                                });
                            })
                            .catch(error => {
                                console.error(error)
                                this._evaluardoccita_FAC135()
                            });
                    }
                }
            )
        },
        _consultadecitas_FAC135() {
            ///////////////////////////////////////////
            // postData({
            //     datosh: datosEnvio() + '6|' + ' |'
            // }, URL)
            //     .then(data => {
            //         console.log(data, 'VALIDAR CODIGO PASO 6');
            //         _evaluardatodocum_FAC135()
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         if (err.MENSAJE == '01'){
            //             this._evaluarnrofact_FAC135();
            //         }else{
            //             this._evaluardatoproveedor_FAC135()
            //         }
            //     })
        },
        _evaluardatodocum_FAC135() {
            this.FAC135.STOP = '0'
            validarInputs(
                {
                    form: "#VALIDAR6_3_FAC135",
                    orden: '1'
                }, this._evaluarcodigo_FAC135,
                () => {
                    this.form.facturatabla_FAC135 = this.form.facturatabla_FAC135.padStart(6, "0");
                    this._evaluardato3_FAC135()
                }
            )
        },
        paciente_FAC135(callbackAtras, callbackSig) {
            _toggleF8([{
                input: 'paciente', app: 'FAC135', funct: (e) => {
                    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                        set_Event_validar('#validar_paciente_FAC135', 'off')
                        $('#paciente_FAC135').attr('disabled', 'true')
                        $('[data-bb-handler="main"]').click();

                        f8Pacientes_FAC135(callbackAtras, callbackSig)
                    }
                }
            },])
            validarInputs(
                {
                    form: "#validar_paciente_FAC135",
                    orden: '1'
                },
                function () {
                    $('[data-bb-handler="main"]').click();
                    $('#paciente_FAC135').val('')
                    callbackAtras(callbackAtras)
                },
                function () {
                    var id_historia = cerosIzq($('#paciente_FAC135').val(), 15)
                    $('#paciente_FAC135').val(id_historia)

                    llamado_ventana_FAC135(id_historia, callbackAtras, callbackSig)
                }

            )
        },
        //////OTRAS VALIDACIONES //////////////////

        /////////////////////////////PENDIENTE POR REVISAR FUNCIONALIDAD
        _leercodigo2_FAC135() {
            this.FAC135.CODSUBW = this.form.codcontable_FAC135.substrin(0, 6)
            this.FAC135.MAYORW = this.form.codcontable_FAC135.substring(0, 4);
            this.FAC135.MAY1W = this.form.codcontable_FAC135.substring(0, 2);
            this.FAC135.MAY2W = this.form.codcontable_FAC135.substring(2, 4);
            this.FAC135.SUBCTAW = this.form.codcontable_FAC135.substring(4, 6);
            this.FAC135.AUXILW = this.form.codcontable_FAC135.substring(6, 11);

            if (this.FAC135.MAYORW.trim() == '' || this.FAC135.MAYORW == 0) {
                this.form.codcontable_FAC135 = '';
                this.form.nombrecta_FAC135 = '';
                this.form.tercerotabla_FAC135 = '';
                this.form.prefijotabla_FAC135 = '',
                    this.form.facturatabla_FAC135 = '';
                this.form.debito_FAC135 = '';
                this.form.credito_FAC135 = '';
                this._evaluarsubtotal_FAC135();

            } else if ((!$.isNumeric(this.FAC135.MAYORW) || this.FAC135.MAYORW < 100 || this.FAC135.SUBCTAW == 0 || this.FAC135.SUBCTAW.trim() == '' || this.FAC135.AUXILW == 0 || this.FAC135.AUXILW.trim() == '') || (this.FAC135.MAYORW == this.FAC135.CTASEXEP.MAYMED && this.FAC135.SUBCTAW == 10)) {
                CON851('03', '03', this._evaluarcodigo_FAC135(), 'error', 'error')
            } else {
                const res = this.fac135._maestrocta.find(e => e.LLAVE_MAE == this.form.codcontable_FAC135);
                if (res == undefined) {
                    CON851("01", "01", this._evaluarcodigo_FAC135(), "error", "error");
                } else {
                    this.form.nombrecta_FAC135 = res.NOMBRE_MAE;
                }
            }
        },
        /////////////////////////////////////////////////////////////////////////
        _evaluarmacro_SER135() {
            console.log('FUNCIONES DE MACRO')

        },
        _buscarlimite_FAC135() {
            if (this.form.meselab_FAC135 == 01 || this.form.meselab_FAC135 == 03 || this.form.meselab_FAC135 == 05 || this.form.meselab_FAC135 == 08 || this.form.meselab_FAC135 == 10 || this.form.meselab_FAC135 == 12) {
                this.FAC135.DIAMAX = 31
            } else {
                if (this.form.meselab_FAC135 == 04 || this.form.meselab_FAC135 == 06 || this.form.meselab_FAC135 == 07 || this.form.meselab_FAC135 == 09 || this.form.meselab_FAC135 == 11) {
                    this.FAC135.DIAMAX = 30
                } else {
                    this.FAC135.DIAMAX = 29
                }
            }
        },
        _repiteanterior_FAC135() {
            if (this.form.numerotabla_FAC135 - 1 != 0) {
                this.form.codcontable_FAC135 = this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 2].CODIGO_CONTROL
                this.form.nombrecta_FAC135 = this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 2].DESCRIP_CODIGO
                this.form.centrocosto_FAC135 = this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 2].COSTO
                this.form.tercerotabla_FAC135 = this.tablareccaja_FAC135[this.form.numerotabla_FAC135 - 2].NIT
                this.form.numerotabla_FAC135 = this.form.numerotabla_FAC135 - 1
                this.form.numerotabla_FAC135++;
                this._evaluarnit_FAC135()
            } else {
                this._evaluarcodigo_FAC135()
            }
        },

        _validartabla_FAC135() {
            if ($("#TABLARECIBOSCAJA_FAC135 tbody tr").length == 0) {
                this._evaluarcodigo_FAC135();
            } else {
                validarTabla(
                    {
                        tabla: "#TABLARECIBOSCAJA_FAC135",
                        orden: "0",
                        Supr: data => {
                            this.tablareccaja_FAC135.splice(parseInt(data.cells[0].textContent.trim()) - 1, 1);
                            // this._evaluarcodigo_FAC135();
                        },
                    },
                    this._editartabla,
                    this._evaluarcodigo_FAC135
                );
            }

        },
        _editartabla(data) {
            this.form.numerotabla_FAC135 = data.cells[0].textContent.trim();
            this.form.codcontable_FAC135 = data.cells[1].textContent.trim();
            this.form.nombrecta_FAC135 = data.cells[2].textContent.trim();
            this.form.tercerotabla_FAC135 = data.cells[3].textContent.trim();
            this.form.prefijotabla_FAC135 = data.cells[4].textContent.trim().substring(0, 1);
            this.form.facturatabla_FAC135 = data.cells[4].textContent.trim().substring(1, 7);
            this.form.debito_FAC135 = data.cells[5].textContent.trim();
            this.form.credito_FAC135 = data.cells[6].textContent.trim();
            this._evaluarcodigo_FAC135();
        },








        // VENTANAS DE F8 DE CONSULTAS 
        _f8ctacontable_FAC135() {
            var $_this = this;
            let llave = this.fac135._maestrocta;
            let llaves = llave.filter(x => x.LLAVE_MAE.substring(0, 4) == this.form.codcontable_FAC135.substring(0, 4))
            _ventanaDatos({
                titulo: 'VENTANA COD CONTABLE',
                columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
                data: llaves,
                callback_esc: function () {
                    $(".codcontable_fac135").focus();
                },
                callback: function (data) {
                    console.log(data);
                    if (data.length) {
                        $_this.form.codcontable_FAC135 = data[0].LLAVE_MAE.substring(0, 11).trim()
                    } else {
                        $_this.form.codcontable_FAC135 = data.LLAVE_MAE.substring(0, 11).trim()
                    }
                    _enterInput('.codcontable_fac135');
                }
            });
        },
        _f8terceros_FAC135() {
            var $_this = this;
            _ventanaDatos_lite_v2({
                titulo: "VENTANA DE TERCEROS",
                data: $_this.fac135._terceros,
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
                    $(".tercero_fac135").focus();
                },
                callback: function (data) {
                    $_this.form.tercerotabla_FAC135 = data.COD.trim().padStart(10, "0");
                    _enterInput(".tercero_fac135");
                },
            });

        },
        _f8numeracion_FAC135() {
            if (this.form.prefijo_FAC135 == 'E' || this.form.prefijo_FAC135 == 'C') {
                set_Event_validar('#VALIDAR4_FAC135', 'off')
                $('.factura_fac135').attr('disabled', 'true');
                SER825(this._evaluarfactura_FAC135C, this._validarcomprobante, '1')
            } else {
                var $_this = this;
                parametros = {
                    dll: 'NUMERACION',
                    valoresselect: ['Nombre del tercero', 'buscar paciente'],
                    f8data: 'NUMERACION',
                    columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                    callback: (data) => {
                        $_NROW = data.COD;
                        $_NROW = $_NROW.substring(1, 7)
                        $_this.form.factura_FAC135 = $_NROW;
                        _enterInput('.factura_fac135');
                    },
                    cancel: () => {
                        _enterInput('.factura_fac135');
                    }
                };
                F8LITE(parametros);
            }
        },
        _validarcomprobante(data) {
            var datos = data.FACTURA[0];
            this.form.prefijo_FAC135 = datos.PREFIJO
            this.form.factura_FAC135 = datos.NRO
            this.form.tipofact_FAC135 = datos.CLASE
            this._tiposervicio_FAC135();
        },
        _f8tiposervicio(e) {
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "TIPO DE SERVICIO",
                    columnas: ["COD", "DESCRIP"],
                    data: $_SERVICIOSFAC135,
                    callback_esc: function () {
                        $("#tipocomprobante_FAC135").focus();
                    },
                    callback: function (data) {
                        $("#tipocomprobante_FAC135").val(data.COD);
                        _enterInput('#tipocomprobante_FAC135');
                    }
                });
            }
        },
        _f8factura_FAC135() {
            $_this = this
            if (this.form.prefijotabla_FAC135 == 'C' && this.FAC135.STOP == '1') {
                var INV805B = [];
                let URL = get_url("APP/SALUD/INV805B.DLL");
                postData({
                    datosh: datosEnvio() + this.form.tercerotabla_FAC135 + '|'
                }, URL)
                    .then(data => {
                        console.log(data)
                        INV805B = data.COMPROBANTES;
                        INV805B.pop();
                        _ventanaDatos({
                            titulo: 'COMPROBANTE CON SALDO ACTUAL',
                            columnas: ["LLAVE", "SALDO", "FECHA", "FACTURA", "CLASE", "ABONOS", "VLR_BRUTO"],
                            data: INV805E,
                            // pluss: true,
                            callback_esc: () => {
                                _enterInput('.facturatabla_FAC135');
                            },
                            callback: data => {
                                _enterInput('.facturatabla_FAC135');
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this._evaluarnrofact_FAC135();
                    });

            } else if (this.FAC135.STOP == '1') {
                var INV805E = [];
                let URL = get_url("APP/INVENT/INV805E.DLL");
                postData({
                    datosh: datosEnvio() + this.form.tercerotabla_FAC135.trim() + '|'
                }, URL)
                    .then(data => {
                        INV805E = data.FACTURAS;
                        INV805E.pop();
                        _ventanaDatos({
                            titulo: 'FACTURA SALDO ACTUAL - (CON + PARA SELECCIONAR)',
                            columnas: ["FACTURA", "SALDO", "DESCRIPCION", "FECHA_PRE", "VLR_BRUTO"],
                            data: INV805E,
                            pluss: true,
                            callback_esc: () => {
                                _enterInput('.facturatabla_FAC135');
                            },
                            callback: data => {
                                console.log(data)
                                this.FAC135.SCMARCA = '1';
                                this.FAC135.FACTSALDOS = data
                                _enterInput('.facturatabla_FAC135');
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        CON851('01', 'Este nit no tiene facturas', null, 'error', 'error');
                        this._evaluarnrofact_FAC135();
                    });
            }

        },
        _ventanapacientecita_FAC135(e) {
            console.log('vventana d8 cita')
            parametros = {
                dll: 'PACIBASE09',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIBASE09',
                columnas: [{
                    title: 'COD'
                }, {
                    title: 'NOMBRE'
                }, {
                    title: 'EPS'
                }],
                callback: (data) => {
                    setTimeout(this._evaluardatocita_FAC135, 300)
                    setTimeout(() => { $('#docpaccita_FAC135').val(data.COD) }, 400);
                },
                cancel: () => {
                    setTimeout(this._evaluardatocita_FAC135, 300)
                }
            };
            F8LITE(parametros);
        }

    }
})



