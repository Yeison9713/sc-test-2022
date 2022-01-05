// // 01-09-2020 DIANA E: creado 
// const moment = require("moment");
moment.locale('es')
var fecha_SER109J8 = IMask.createPipe({
    mask: Date,
    pattern: "Y-m-d",
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "0000", to: "9000", maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "00", to: "12", maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "31", maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format("YYYY-MM-DD");
        if (fecha == 'Invalid date') return '0000-00-00'
        return str;
    },
});

new Vue({
    el: "#SER109J8",
    data: {
        SER109J8: [],
        form: {
            numeroprefijo_SER109J8: "",
            entidad_SER109J8: "",
            nombrepaciente_SER109J8: "",
            estadofactura_SER109J8: "",
            fechafactura_SER109J8: "",
            operbloq_SER109J8: "",
            observacion_SER109J8: "",
            anexos_SER109J8: "",
            fechafacturaano_SER109J8: "",
            fechafacturames_SER109J8: "",
            fechafacturadia_SER109J8: "",
            valorsalmin_SER109J8: "",
            topepoliza_SER109J8: "",
            totalfact_SER109J8: "",
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion('9,7,4,3,J - Imprimir fact hogares de paso');
        this.SER109J8.PREFIJOW = 'A';
        this.SER109J8.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        this.SER109J8.PUCUSU = $_USUA_GLOBAL[0].PUC;
        this.SER109J8.NITUSU = $_USUA_GLOBAL[0].NIT;
        this.SER109J8.PEDIDOUSU = $_USUA_GLOBAL[0].PEDIDO;
        this.SER109J8.FECHAHOSPINICIO = '00000000'
        this.SER109J8.FECHAHOSPFINAL = '00000000'
        this.SER109J8.TOTALDIASHOSP = ''
        this.SER109J8.FECHAALBERGINICIO = '00000000'
        this.SER109J8.FECHAALBERGFINAL = '00000000'
        this.SER109J8.TOTALDIASALBERG = ''
        this.SER109J8.FECHAALBACOMPINI = '00000000'
        this.SER109J8.FECHAALBACOMPFIN = '00000000'
        this.SER109J8.TOTALDIASALBACOMP = ''
        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            $_this.SER109J8.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                $_this.SER109J8.FIRMAS = data;
                $_this._evaluarprefijo_SER109J8();
            })
        })
    },
    methods: {

        _evaluarprefijo_SER109J8() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER109J8',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER109J8.PREFIJOW = prefijoMask_SER109J8.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER109J8.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER109J8 = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER109J8();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER109J8() {
            console.log('numero prefijo')
            validarInputs({
                form: '#VALIDAR2_SER109J8',
                orden: '1'
            },
                this._evaluarprefijo_SER109J8,
                () => {
                    this.SER109J8.LLAVEW = this.SER109J8.PREFIJOW + this.form.numeroprefijo_SER109J8.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER109J8.LLAVEW }, this._validarfactura_SER109J8, this._evaluarnumeroprefijo_SER109J8)
                }
            )
        },
        _validarfactura_SER109J8(data1, data2) {
            console.log(data1, data2, 'VALLIDAR FACT',)
            this.SER109J8.NUMERACION = data1;
            if (this.SER109J8.NUMERACION.TIPOPACI_NUM == "X") this.SER109J8.NUMERACION.TIPOPACI_NUM == '*';
            this.SER109J8.FECHAPRENUM = this.SER109J8.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER109J8 = this.SER109J8.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER109J8 = this.SER109J8.NUMERACION.NOMBREPAC_NUM.trim();
            let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
            this.form.estadofactura_SER109J8 = this.SER109J8.NUMERACION.ESTADO_NUM + ' - ' + estado[this.SER109J8.NUMERACION.ESTADO_NUM];
            if (this.SER109J8.NUMERACION.ESTADO_NUM == '0' || this.SER109J8.NUMERACION.ESTADO_NUM == '1') {
                $('#FECHARET_SER109J8').removeClass('hidden');
                this.form.fechafactura_SER109J8 = fecha_SER109J8(this.SER109J8.NUMERACION.FECHARET_NUM)
            } else {
                $('#OPERBLOQ_SER109J8').removeClass('hidden');
                this.form.operbloq_SER109J8 = this.SER109J8.NUMERACION.OPERBLOQ_NUM
            }
            this.form.observacion_SER109J8 = this.SER109J8.NUMERACION.OBSERV_NUM.trim()
            this.form.anexos_SER109J8 = this.SER109J8.NUMERACION.ANEXOS_NUM.trim()
            this.SER109J8.ANOINGNUM = this.SER109J8.NUMERACION.FECHAING_NUM.substring(0, 4)
            if (parseInt(this.SER109J8.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(this.SER109J8.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER109J8 = this.SER109J8.NUMERACION.FECHARET_NUM.substring(0, 4)
                    this.form.fechafacturames_SER109J8 = this.SER109J8.NUMERACION.FECHARET_NUM.substring(4, 6)
                    this.form.fechafacturadia_SER109J8 = this.SER109J8.NUMERACION.FECHARET_NUM.substring(6, 8)
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    this.form.fechafacturaano_SER109J8 = fechaactual.substring(0, 4)
                    this.form.fechafacturames_SER109J8 = fechaactual.substring(4, 6)
                    this.form.fechafacturadia_SER109J8 = fechaactual.substring(6, 8)
                }
            } else {
                this.form.fechafacturaano_SER109J8 = this.SER109J8.NUMERACION.FECHAPRE_NUM.substring(0, 4)
                this.form.fechafacturames_SER109J8 = this.SER109J8.NUMERACION.FECHAPRE_NUM.substring(4, 6)
                this.form.fechafacturadia_SER109J8 = this.SER109J8.NUMERACION.FECHAPRE_NUM.substring(6, 8)
            }
            if (this.SER109J8.PREFIJOW == 'T') {
                // if(data2)
                this.SER109J8.VALORES = data2
                $('#VALORESCARTERA_109F').removeClass('hidden');
                this.form.valorsalmin_SER109J8 = this.SER109J8.VALORES.SALMIN
                this.form.topepoliza_SER109J8 = this.SER109J8.VALORES.TOPE
                this.form.totalfact_SER109J8 = this.SER109J8.VALORES.TOTAL
            }
            this._afectarnumeracion_SER109J8()
        },
        _afectarnumeracion_SER109J8() {
            console.log('afctar numeracion')
            if (this.SER109J8.NUMERACION.ESTADO_NUM == '0' || this.SER109J8.NUMERACION.ESTADO_NUM == '3') {
                this._evaluarobservaciones_SER109J8('1')
            } else {
                this._evaluarfechaimpresion_SER109J8('1')
            }
        },
        _evaluarobservaciones_SER109J8(orden) {
            console.log('observaciones', orden)
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR3_SER109J8',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER109J8() },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER109J8 = this.form.observacion_SER109J8.toUpperCase();
                    this.form.anexos_SER109J8 = this.form.anexos_SER109J8.toUpperCase();
                    if (this.form.estadofactura_SER109J8.substring(0, 1) == '3' || this.form.estadofactura_SER109J8.substring(0, 1) == '0') {
                        this._evaluarbloqueofactura_SER109J8()
                    } else {
                        this._evaluarfechaimpresion_SER109J8('1');
                    }
                }
            )
        },
        _evaluarbloqueofactura_SER109J8() {
            _FloatText({ estado: 'off' })
            if (this.form.estadofactura_SER109J8.substring(0, 1) == '3') {
                this._grabarnumeracion_SER109J8()
            } else {
                bloqueoMask_SER109J8.typedValue = 'N'
                validarInputs({
                    form: '#VALIDAR4_SER109J8',
                    orden: '1'
                },
                    () => { this._evaluarobservaciones_SER109J8('2') },
                    () => {
                        if (bloqueoMask_SER109J8.value.trim() == '') bloqueoMask_SER109J8.typedValue = 'N'
                        if (bloqueoMask_SER109J8.value == 'S') this.form.estadofactura_SER109J8 = '3', this.form.operbloq_SER109J8 = localStorage.getItem('Usuario').trim();
                        this._grabarnumeracion_SER109J8()
                    }
                )
            }
        },
        _grabarnumeracion_SER109J8() {
            if (this.form.observacion_SER109J8.trim() != this.SER109J8.NUMERACION.OBSERV_NUM.trim() || this.form.anexos_SER109J8.trim() != this.SER109J8.NUMERACION.ANEXOS_NUM.trim() || this.form.estadofactura_SER109J8.substring(0, 1) != this.SER109J8.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER109J8.LLAVEW + '|' + this.form.observacion_SER109J8 + '|' + this.form.anexos_SER109J8 + '|' + this.form.estadofactura_SER109J8.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarfechaimpresion_SER109J8('1')
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarbloqueofactura_SER109J8();
                        }
                    })
            } else {
                this._evaluarfechaimpresion_SER109J8('1')
            }
        },
        _evaluarfechaimpresion_SER109J8(orden) {
            validarInputs({
                form: '#VALIDAR5_SER109J8',
                orden: orden,
            },
                this._evaluarbloqueofactura_SER109J8,
                () => {
                    this.SER109J8.FECHA = this.form.fechafacturaano_SER109J8 + this.form.fechafacturames_SER109J8.padStart(2, '0') + this.form.fechafacturadia_SER109J8.padStart(2, '0')
                    // this._ventanadias_SER109J8()
                    this._evaluarfiltrosimpresion_SER109J8()
                }
            )
        },
        _evaluarfiltrosimpresion_SER109J8() {
            ///////////SER109Q- 9743A///////////////FALTA HACERLO
            let URL = get_url("APP/SALUD/SER109J8.DLL");
            postData({
                datosh: datosEnvio() + this.SER109J8.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    console.log(data)
                    this.SER109J8.FACTURAS = data.FACTURA;
                    this.SER109J8.FACTURAS.pop()
                    this.SER109J8.FECHAHOSPINICIO = this.SER109J8.FACTURAS[0].FECHA_INI_HOSP.trim()
                    this.SER109J8.FECHAHOSPFINAL = this.SER109J8.FACTURAS[0].FECHA_FIN_HOSP.trim()
                    this.SER109J8.FECHAALBERGINICIO = this.SER109J8.FACTURAS[0].FECHA_INI_ALBP.trim()
                    this.SER109J8.FECHAALBERGFINAL = this.SER109J8.FACTURAS[0].FECHA_FIN_ALBP.trim()
                    this.SER109J8.FECHAALBACOMPINI = this.SER109J8.FACTURAS[0].FECHA_INI_ALBA.trim()
                    this.SER109J8.FECHAALBACOMPFIN = this.SER109J8.FACTURAS[0].FECHA_FIN_ALBA.trim()
                    this._ventanadias_SER109J8()
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MENSAJE == '08') {
                        $('#VACIA_SER109J8').removeClass('hidden');
                        facturavaciaMask_SER109J8.typedValue = 'N';
                        this._evaluarimprimirvacia_SER109J8();
                    } else {
                        console.error(error);
                        CON851('', 'Hubo un error con el cierre', this._evaluarfechaimpresion_SER109J8('3'), 'error', 'Error');
                    }
                })
        },
        _evaluarimprimirvacia_SER109J8() {
            validarInputs({
                form: '#VALIDAR5_SER109J8',
                orden: '1'
            },
                () => { this._evaluarfechaimpresion_SER109J8('3') },
                () => {
                    if (facturavaciaMask_SER109J8.value.trim() == '') facturavaciaMask_SER109J8.typedValue = 'N'
                    if (facturavaciaMask_SER109J8 == 'S') {
                        console.log('IMPRESION EN BLANCO')
                        this._datosimpresion_SER109J8()
                    } else {
                        _toggleNav()
                    }
                }
            )
        },
        _ventanadias_SER109J8() {
            $_this = this
            var ventanainffactura_SER109J8 = bootbox.dialog({
                size: 'large',
                title: 'INFORMACION DE LA FACTURA',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +
                    '<div class="col-md-4 col-sm-12 col-xs-12 head-box">' +
                    '<label>Descrip</label>' +
                    '</div>' +
                    '<div class="col-md-3 col-sm-12 col-xs-12 head-box">' +
                    '<label>Desde</label>' +
                    '</div>' +
                    '<div class="col-md-3 col-sm-12 col-xs-12 head-box">' +
                    '<label>hasta</label>' +
                    '</div>' +
                    '<div class="col-md-2 col-sm-12 col-xs-12 head-box">' +
                    '<label>Total dias</label>' +
                    '</div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label">' + "HOSPITALIZACION:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAINIHOSP_SER109J8"> ' +
                    '<input id="fechahospini_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10" title="AÑO/MES/DIA" data-toggle="tooltip" data-placement="bottom" rel="fechainiHospTooltip"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAFINHOSP_SER109J8"> ' +
                    '<input id="fechahospfin_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10" title="AÑO/MES/DIA" data-toggle="tooltip" data-placement="bottom" rel="fechafinHospTooltip"> ' +
                    '</div> ' +
                    '<div class="col-md-2 col-sm-6 col-xs-6" id="TOTALDIASHOSP_SER109J8"> ' +
                    '<input id="totaldiashos_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="3" > ' +
                    '</div> ' +
                    '</div> ' +


                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label">' + "ALBERGUE PACIENTE:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAINIALB_SER109J8"> ' +
                    '<input id="fechaalbergini_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10" title="AÑO/MES/DIA" data-toggle="tooltip" data-placement="bottom" rel="fechainiPaciTooltip"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAFINALB_SER109J8"> ' +
                    '<input id="fechaalbergfin_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10" title="AÑO/MES/DIA" data-toggle="tooltip" data-placement="bottom" rel="fechafinPaciTooltip"> ' +
                    '</div> ' +
                    '<div class="col-md-2 col-sm-6 col-xs-6" id="TOTALDIASALB_SER109J8"> ' +
                    '<input id="totaldiasalberg_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="3"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label">' + "ALBERGUE ACOMPAÑANTE:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAINICIOACOMP_SER109J8"> ' +
                    '<input id="fechaalbpacini_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10" title="AÑO/MES/DIA" data-toggle="tooltip" data-placement="bottom" rel="fechainiAcomTooltip"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="FECHAFINALACOMP_SER109J8"> ' +
                    '<input id="fechaalbpacfin_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10" title="AÑO/MES/DIA" data-toggle="tooltip" data-placement="bottom" rel="fechafinAcomTooltip"> ' +
                    '</div> ' +
                    '<div class="col-md-2 col-sm-6 col-xs-6" id="TOTALDIAACOMP_SER109J8"> ' +
                    '<input id="totalalbpacfin_SER109J8" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="3"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanainffactura_SER109J8.off('show.bs.modal');
                            setTimeout(() => {
                                $_this._evaluarfacturaoriginal_SER109J8()
                            }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanainffactura_SER109J8.off('show.bs.modal');
                            setTimeout(() => {
                                $_this._evaluarfechaimpresion_SER109J8('1')
                            }, 500)

                        }
                    }
                }
            });
            ventanainffactura_SER109J8.init($('.modal-footer').hide());
            ventanainffactura_SER109J8.init(this._evaluarfechainihosp_SER109J8());
            ventanainffactura_SER109J8.on('shown.bs.modal', function () {
                $("#fechahospini_SER109J8").focus();
            });
        },

        _evaluarfechainihosp_SER109J8() {
            $('input[rel="fechainiHospTooltip"]').tooltip();
            _inputControl('disabled');
            $('#fechahospini_SER109J8').val(this.SER109J8.FECHAHOSPINICIO);
            $('#fechahospfin_SER109J8').val(this.SER109J8.FECHAHOSPFINAL);
            $('#totaldiashos_SER109J8').val(this.SER109J8.TOTALDIASHOSP);
            $('#fechaalbergini_SER109J8').val(this.SER109J8.FECHAALBERGINICIO);
            $('#fechaalbergfin_SER109J8').val(this.SER109J8.FECHAALBERGFINAL);
            $('#totaldiasalberg_SER109J8').val(this.SER109J8.TOTALDIASALBERG);
            $('#fechaalbpacini_SER109J8').val(this.SER109J8.FECHAALBACOMPINI);
            $('#fechaalbpacfin_SER109J8').val(this.SER109J8.FECHAALBACOMPFIN);
            $('#totalalbpacfin_SER109J8').val(this.SER109J8.TOTALDIASALBACOMP);
            if (this.SER109J8.FECHAHOSPINICIO.trim() == '' || this.SER109J8.FECHAHOSPINICIO == '00000000') $('#fechahospini_SER109J8').val(this.SER109J8.NUMERACION.FECHAING_NUM);
            validarInputs({
                form: '#FECHAINIHOSP_SER109J8',
                orden: '1',
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER109J8.FECHAHOSPINICIO = $('#fechahospini_SER109J8').val()
                    $('#fechahospini_SER109J8').val(fecha_SER109J8(this.SER109J8.FECHAHOSPINICIO))
                    if (this.SER109J8.FECHAHOSPINICIO.trim() == '' || this.SER109J8.FECHAHOSPINICIO.trim() == 0) {
                        $('#fechahospini_SER109J8').val(this.SER109J8.FECHAHOSPINICIO);
                        this._evaluarfechainihosp_SER109J8();
                    } else {
                        if (this.SER109J8.FECHAHOSPINICIO == 'Invalid date') {
                            CON851('', 'Fecha invalida!', this._evaluarfechainihosp_SER109J8(), 'error', 'error');
                        } else {
                            this._evaluarfechafinhosp_SER109J8()
                        }
                    }
                }
            )
        },
        _evaluarfechafinhosp_SER109J8() {
            $('input[rel="fechafinHospTooltip"]').tooltip();
            validarInputs({
                form: '#FECHAFINHOSP_SER109J8',
                orden: '1',
            },
                this._evaluarfechainihosp_SER109J8,
                () => {
                    this.SER109J8.FECHAHOSPFINAL = $('#fechahospfin_SER109J8').val()
                    $('#fechahospfin_SER109J8').val(fecha_SER109J8(this.SER109J8.FECHAHOSPFINAL))
                    if (this.SER109J8.FECHAHOSPFINAL.trim() == '' || this.SER109J8.FECHAHOSPFINAL.trim() == 0) {
                        $('#fechahospfin_SER109J8').val($('#fechahospini_SER109J8').val().trim());
                        this.SER109J8.FECHAHOSPFINAL = this.SER109J8.FECHAHOSPINICIO;
                        this._evaluartotaldiashops_SER109J8();
                    } else {
                        if (this.SER109J8.FECHAHOSPFINAL == 'Invalid date') {
                            CON851('', 'Fecha invalida!', this._evaluarfechafinhosp_SER109J8(), 'error', 'error');
                        } else {
                            if (this.SER109J8.FECHAHOSPINICIO > this.SER109J8.FECHAHOSPFINAL) {
                                CON851('03', '03', this._evaluarfechafinhosp_SER109J8(), 'error', 'Error');
                            } else {
                                this._evaluartotaldiashops_SER109J8()
                            }
                        }
                    }
                }
            )
        },
        _evaluartotaldiashops_SER109J8() {
            console.log(this.SER109J8.FECHAHOSPFINAL, this.SER109J8.FECHAHOSPINICIO)
            var a = moment(this.SER109J8.FECHAHOSPINICIO)
            var b = moment(this.SER109J8.FECHAHOSPFINAL)
            this.SER109J8.TOTALDIASHOSP = a.diff(b, 'days')
            this.SER109J8.TOTALDIASHOSP = this.SER109J8.TOTALDIASHOSP * (-1)
            console.log(this.SER109J8.TOTALDIASHOSP, 'TOTAL DIAS')
            if (this.SER109J8.TOTALDIASHOSP == 0) this.SER109J8.TOTALDIASHOSP = 1;
            $('#totaldiashos_SER109J8').val(this.SER109J8.TOTALDIASHOSP)
            validarInputs({
                form: '#TOTALDIASHOSP_SER109J8',
                orden: '1',
            },
                this._evaluarfechafinhosp_SER109J8,
                () => {
                    this.SER109J8.TOTALDIASHOSP = $('#totaldiashos_SER109J8').val()
                    this._evaluarfechaalberginicio_SER109J8()
                }
            )
        },
        _evaluarfechaalberginicio_SER109J8() {
            $('input[rel="fechainiPaciTooltip"]').tooltip();
            if (this.SER109J8.FECHAALBERGINICIO.trim() == '' || this.SER109J8.FECHAALBERGINICIO == '00000000') $('#fechaalbergini_SER109J8').val(this.SER109J8.NUMERACION.FECHAING_NUM);
            validarInputs({
                form: '#FECHAINIALB_SER109J8',
                orden: '1',
            },
                this._evaluartotaldiashops_SER109J8,
                () => {
                    this.SER109J8.FECHAALBERGINICIO = $('#fechaalbergini_SER109J8').val();
                    if (this.SER109J8.FECHAALBERGINICIO.trim() == '' || this.SER109J8.FECHAALBERGINICIO.trim() == 0) {
                        $('#fechaalbergini_SER109J8').val(this.SER109J8.FECHAALBERGINICIO);
                        this._evaluarfechaalberginicio_SER109J8();
                    } else {
                        $('#fechaalbergini_SER109J8').val(fecha_SER109J8(this.SER109J8.FECHAALBERGINICIO))
                        if (this.SER109J8.FECHAALBERGINICIO == 'Invalid date') {
                            CON851('', 'Fecha invalida!', this._evaluarfechaalberginicio_SER109J8(), 'error', 'error');
                        } else {
                            this._evaluarfechaalbergfinal_SER109J8();
                        }
                    }
                }
            )
        },
        _evaluarfechaalbergfinal_SER109J8() {
            $('input[rel="fechafinPaciTooltip"]').tooltip();
            validarInputs({
                form: '#FECHAFINALB_SER109J8',
                orden: '1',
            },
                this._evaluarfechaalberginicio_SER109J8,
                () => {
                    this.SER109J8.FECHAALBERGFINAL = $('#fechaalbergfin_SER109J8').val();
                    $('#fechaalbergfin_SER109J8').val(fecha_SER109J8(this.SER109J8.FECHAALBERGFINAL))
                    if (this.SER109J8.FECHAALBERGFINAL.trim() == '' || this.SER109J8.FECHAALBERGFINAL.trim() == 0) {
                        $('#fechaalbergfin_SER109J8').val($('#fechaalbergini_SER109J8').val().trim());
                        this.SER109J8.FECHAALBERGFINAL = this.SER109J8.FECHAALBERGINICIO;
                        this._evaluartotalalbergpac_SER109J8();
                    } else {
                        if (this.SER109J8.FECHAALBERGFINAL == 'Invalid date') {
                            CON851('', 'Fecha invalida!', this._evaluarfechaalbergfinal_SER109J8(), 'error', 'error');
                        } else {
                            if (this.SER109J8.FECHAALBERGINICIO > this.SER109J8.FECHAALBERGFINAL) {
                                CON851('03', '03', this._evaluarfechaalbergfinal_SER109J8(), 'error', 'Error');
                            } else {
                                this._evaluartotalalbergpac_SER109J8();
                            }
                        }
                    }
                }
            )
        },
        _evaluartotalalbergpac_SER109J8() {
            var c = moment(this.SER109J8.FECHAALBERGINICIO)
            var d = moment(this.SER109J8.FECHAALBERGFINAL)
            this.SER109J8.TOTALDIASALBERG = c.diff(d, 'days')
            this.SER109J8.TOTALDIASALBERG = this.SER109J8.TOTALDIASALBERG * (-1)
            if (this.SER109J8.TOTALDIASALBERG == 0) this.SER109J8.TOTALDIASALBERG = 1;
            $('#totaldiasalberg_SER109J8').val(this.SER109J8.TOTALDIASALBERG)
            this._evaluarfechainiacomp_SER109J8();
            // validarInputs({
            //     form: '#TOTALDIASALB_SER109J8',
            //     orden: '1',
            // },
            //     this._evaluarfechaalbergfinal_SER109J8,
            //     () => {
            //         this.SER109J8.TOTALDIASALBERG = $('#totaldiasalberg_SER109J8').val();
            //     }
            // )
        },
        _evaluarfechainiacomp_SER109J8() {
            validarInputs({
                form: '#FECHAINICIOACOMP_SER109J8',
                orden: '1',
            },
                this._evaluartotalalbergpac_SER109J8,
                () => {
                    this.SER109J8.FECHAALBACOMPINI = $('#fechaalbpacini_SER109J8').val();
                    $('#fechaalbpacini_SER109J8').val(fecha_SER109J8(this.SER109J8.FECHAALBACOMPINI))
                    if (this.SER109J8.FECHAALBACOMPINI.trim() == '' || this.SER109J8.FECHAALBACOMPINI.trim() == 0) {
                        $('#fechaalbpacini_SER109J8').val('0000-00-00');
                        this._evaluarfechafinacomp_SER109J8();
                    } else {
                        if (this.SER109J8.FECHAALBACOMPINI == 'Invalid date') {
                            CON851('', 'Fecha invalida!', this._evaluarfechainiacomp_SER109J8(), 'error', 'error');
                        } else {
                            this._evaluarfechafinacomp_SER109J8();
                        }
                    }
                }
            )
        },
        _evaluarfechafinacomp_SER109J8() {
            validarInputs({
                form: '#FECHAFINALACOMP_SER109J8',
                orden: '1',
            },
                this._evaluarfechainiacomp_SER109J8,
                () => {
                    this.SER109J8.FECHAALBACOMPFIN = $('#fechaalbpacfin_SER109J8').val();
                    $('#fechaalbpacfin_SER109J8').val(fecha_SER109J8(this.SER109J8.FECHAALBACOMPFIN))
                    if (this.SER109J8.FECHAALBACOMPINI.trim() == '' || this.SER109J8.FECHAALBACOMPINI.trim() == 0) {
                        $('#fechaalbpacfin_SER109J8').val('0000-00-00');
                        this._evaluartotalalbergacomp_SER109J8();
                    } else {
                        if (this.SER109J8.FECHAALBACOMPFIN == 'Invalid date') {
                            CON851('', 'Fecha invalida!', this._evaluarfechafinacomp_SER109J8(), 'error', 'error');
                        } else {
                            if (this.SER109J8.FECHAALBACOMPINI > this.SER109J8.FECHAALBACOMPFIN) {
                                CON851('03', '03', this._evaluarfechafinacomp_SER109J8(), 'error', 'Error');
                            } else {
                                this._evaluartotalalbergacomp_SER109J8();
                            }
                        }
                    }
                }
            )
        },
        _evaluartotalalbergacomp_SER109J8() {
            var e = moment(this.SER109J8.FECHAALBACOMPINI)
            var f = moment(this.SER109J8.FECHAALBACOMPFIN)
            this.SER109J8.TOTALDIASALBACOMP = e.diff(f, 'days')
            if (isNaN(this.SER109J8.TOTALDIASALBACOMP)) this.SER109J8.TOTALDIASALBACOMP = 0
            this.SER109J8.TOTALDIASALBACOMP = this.SER109J8.TOTALDIASALBACOMP * (-1)
            $('#totalalbpacfin_SER109J8').val(this.SER109J8.TOTALDIASALBACOMP)
            $('.btn-primary').click()
            // validarInputs({
            //     form: '#TOTALDIAACOMP_SER109J8',
            //     orden: '1',
            // },
            //     this._evaluarfechafinacomp_SER109J8,
            //     () => {
            //         this.SER109J8.TOTALDIASALBACOMP = $('#totalalbpacfin_SER109J8').val();
            //     }
            // )
        },

        _evaluarfacturaoriginal_SER109J8() {
            this.SER109J8.TOTBASECOPAGO = this.SER109J8.TOTCOPAGOFAME = this.SER109J8.TOTCTAMODFAME = 0;
            for (var i in this.SER109J8.FACTURAS){
                let valor = parseInt(this.SER109J8.FACTURAS[i].VALOR.replace(/,/g,''));
                if (isNaN(valor)) valor = 0;
                if (this.SER109J8.NUMERACION.ACUERDO260.trim() == 'S'){
                    this.SER109J8.TOTBASECOPAGO = this.SER109J8.TOTBASECOPAGO + valor;
                } else {
                    if (this.SER109J8.FACTURAS[i].LLAVE.trim() != '890701'){
                        this.SER109J8.TOTBASECOPAGO = this.SER109J8.TOTBASECOPAGO + valor;
                    }
                }
            }
            validarInputs({
                form: '#VALIDAR6_SER109J8',
                orden: '1',
            },
                () => { this._evaluarlistarmedico_SER109J8() },
                () => {
                    if (facturaoriginalMask_SER109J8.value.trim() == '') facturaoriginalMask_SER109J8.typedValue = 'N';
                    this.SER109J8.SWORIGINALN = facturaoriginalMask_SER109J8.value;
                    if (parseFloat(this.SER109J8.NUMERACION.PORCECOPAGO_NUM) > 0 && (this.SER109J8.PREFIJOW == 'P' || this.SER109J8.PREFIJOW == 'T' || this.SER109J8.PREFIJOW == 'O' || this.SER109J8.PREFIJOW == 'Q' || this.SER109J8.PREFIJOW == 'R' || this.SER109J8.PREFIJOW == 'U' || this.SER109J8.PREFIJOW == 'V' || this.SER109J8.PREFIJOW == 'W' || this.SER109J8.PREFIJOW == 'X' || this.SER109J8.PREFIJOW == 'Y' || this.SER109J8.PREFIJOW == 'Z')) {
                        if (this.this.form.estadofactura_SER109J8.substring(0, 1) == '0' || this.this.form.estadofactura_SER109J8.substring(0, 1) == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER109J8.LLAVEW + '|' + this.SER109.NUMERACION.IDPAC_NUM + '|' + this.SER109.NUMERACION.DESCRIP_PACI.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER109J8.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    setTimeout( () => {
                                        _liquidacioncopagos_SALUD(this._datosimpresion_SER109J8, this._evaluarfacturaoriginal_SER109J8, params = { NUMERACION: this.SER109J8.NUMERACION, LLAVE_NUM: this.SER109J8.LLAVEW, TOTBASECOPAGO: this.SER109J8.TOTBASECOPAGO });
                                    }, 300 );
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109J8();
                                });
                        }
                    } else {
                        this._datosimpresion_SER109J8();
                    }
                }
            )
        },
        /////////////////IMPRESIONFAC////////////////////
        _datosimpresion_SER109J8() {
            console.log('IMPRESION SER109J8 SER109AB')
            let impresionSER109J8 = new Object;
            let fecha = '';
            if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4)) < 90) {
                fecha = moment('20' + $_USUA_GLOBAL[0].FECHALNK.substring(0,4) + moment().format('DD'), 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
            } else {
                fecha = moment('19' + $_USUA_GLOBAL[0].FECHALNK.substring(0,4) + moment().format('DD'), 'YYYYMMDD', 'es', true).format('MMMM DD YYYY');
            }
            impresionSER109J8.FECHAFACT = fecha.toUpperCase();
            let prefijo = this.SER109J8.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109J8.value.trim())
            if (prefijo.length == 0) {
                prefijo[0] = new Object;
                prefijo[0].AUT_DIAN = '';
                prefijo[0].PREFIJO = prefijoMask_SER109J8.value.trim();
                prefijo[0].DESDE_NRO = '';
                prefijo[0].HASTA_NRO = '';
            }
            let tipocontrato = {
                'C':'CONTRIBUTIVO',
                'S':'SUBSIDIADO',
                'V':'VINCULADO',
                'P':'PARTICULAR',
                'O':'OTRO TIPO',
                'D':'DESPLAZ CONTRIBUTIVO',
                'E':'DESPLAZ SUBSIDIADO',
                'F':'DESPLAZ VINCULADO'
            }
            impresionSER109J8.CONTRATO = tipocontrato[this.SER109J8.NUMERACION.TIPOPACI_NUM];
            if (impresionSER109J8.CONTRATO == undefined) impresionSER109J8.CONTRATO = 'SIN DEFINIR'
            impresionSER109J8.PREFIJO = prefijo;
            if (this.SER109J8.NUMERACION.PLAZO_TER.trim() == '000') impresionSER109J8.FECHAVENCE = '030'
            else impresionSER109J8.FECHAVENCE = this.SER109J8.NUMERACION.PLAZO_TER.trim();
            impresionSER109J8.REFER1TER = this.SER109J8.NUMERACION.REFER1_TER;
            impresionSER109J8.REFER2TER = this.SER109J8.NUMERACION.REFER2_TER;
            impresionSER109J8.LLAVE = `${prefijoMask_SER109J8.value.trim()}${this.form.numeroprefijo_SER109J8.toString().trim().padStart(6, '0')}`
            impresionSER109J8.NOMBRETER = this.SER109J8.NUMERACION.DESCRIP_TER;
            impresionSER109J8.NITTER = this.SER109J8.NUMERACION.NIT_TER;
            impresionSER109J8.DVTER = this.SER109J8.NUMERACION.DV_TER;
            impresionSER109J8.DIRECCTER = this.SER109J8.NUMERACION.DIRECC_TER;
            impresionSER109J8.TELTER = this.SER109J8.NUMERACION.TEL_TER;
            impresionSER109J8.CIUDADTER = this.SER109J8.NUMERACION.CIUDAD_TER;
            impresionSER109J8.NOMBREPACI = this.SER109J8.NUMERACION.DESCRIP_PACI.substring(0,30);
            impresionSER109J8.APELLIDOPACI = this.SER109J8.NUMERACION.DESCRIP_PACI.substring(30,60);
            impresionSER109J8.IDPACI = numeroencomas(parseInt(this.SER109J8.NUMERACION.IDPAC_NUM));
            impresionSER109J8.OBSERVACION = this.SER109J8.NUMERACION.OBSERV_NUM;
            let edad = calcular_edad(moment(this.SER109J8.NUMERACION.NACIPACI_NUM).format('YYYY-MM-DD'));
            impresionSER109J8.EDAD = `${edad.unid_edad}${edad.vlr_edad}`;
            impresionSER109J8.NOMBREACOMPAÑANTE = this.SER109J8.NUMERACION.ACOMPA_PACI;
            let ingreso = moment(this.SER109J8.NUMERACION.FECHAING_NUM).format('YYYY/MM/DD');
            if (ingreso == 'Invalid date') ingreso = '0000/00/00';
            impresionSER109J8.INGRESO = ingreso;
            impresionSER109J8.TIPOCUENTA = this.SER109J8.NUMERACION.OBSERV_NUM.substring(60,120);
            impresionSER109J8.HOSPDESDE = this.SER109J8.FECHAHOSPINICIO;
            impresionSER109J8.HOSPHASTA = this.SER109J8.FECHAHOSPFINAL;
            impresionSER109J8.TOTALHOSP = this.SER109J8.TOTALDIASHOSP;
            impresionSER109J8.ALBDESDE = this.SER109J8.FECHAALBERGINICIO;
            impresionSER109J8.ALBHASTA = this.SER109J8.FECHAALBERGFINAL;
            impresionSER109J8.ALBTOTAL = this.SER109J8.TOTALDIASALBERG;
            impresionSER109J8.ALBADESDE = this.SER109J8.FECHAALBACOMPINI;
            impresionSER109J8.ALBAHASTA = this.SER109J8.FECHAALBACOMPFIN;
            impresionSER109J8.ALBATOTAL = this.SER109J8.TOTALDIASALBACOMP;
            let valorfact = 0;
            for (var i in this.SER109J8.FACTURAS){
                valorfact = valorfact + parseFloat(this.SER109J8.FACTURAS[i].VALOR.replace(/,/g,''));
            }
            impresionSER109J8.TOTALFACT = valorfact;
            impresionSER109J8.VALORENLETRAS = FAC146(valorfact);
            impresionSER109J8.OPERNUM = this.SER109J8.NUMERACION.OPER_NUM;
            impresionSER109J8.OPERMODNUM = this.SER109J8.NUMERACION.OPERMOD_NUM;
            impresionSER109J8.OPERBLOQNUM = this.SER109J8.NUMERACION.OPERBLOQ_NUM;
            impresionSER109J8.ADMINW = localStorage.getItem('Usuario').trim();
            impresionSER109J8.FECHAIMPRESION = moment().format('YYMMDD');
            impresionSER109J8.FECHAOPER = moment(this.SER109J8.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
            if (impresionSER109J8.FECHAOPER == 'Invalid date') impresionSER109J8.FECHAOPER = '000000'
            impresionSER109J8.FECHAMODOPER = moment(this.SER109J8.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
            if (impresionSER109J8.FECHAMODOPER == 'Invalid date') impresionSER109J8.FECHAMODOPER = '000000'
            impresionSER109J8.FECHARETOPER = moment(this.SER109J8.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
            if (impresionSER109J8.FECHARETOPER == 'Invalid date') impresionSER109J8.FECHARETOPER = '000000'
            impresionSER109J8.WIDTH = [ '13%', '15%', '33%', '10%', '15%', '10%' ];
            impresionSER109J8.COLUMNAS = ["LLAVE_COMP", "NRO_COMP", "DESCRIP", "CANT", "VALOR_UNITARIO","VALOR"];
            impresionSER109J8.TABLA = this.SER109J8.FACTURAS;
            impresionSER109J8.MARGIN = [ 10, 250, 10, 20 ];
            console.log(impresionSER109J8);
            _impresionformatoSER109J(impresionSER109J8, this._cerrarnumeracion_SER109J8, () => { this._evaluarfechaimpresion_SER109J8('3') })
        },
        ///////////////////CERRARFACTURAS////////////////
        _cerrarnumeracion_SER109J8() {
            console.log('cerrarnumeracion');
            if (this.form.estadofactura_SER109J8.substring(0, 1) == '0' || this.form.estadofactura_SER109J8.substring(0, 1) == '3') {
                if (this.SER109J8.PREFIJOW == 'A' || this.SER109J8.PREFIJOW == 'B' || this.SER109J8.PREFIJOW == 'D' || this.SER109J8.PREFIJOW == 'F' || this.SER109J8.PREFIJOW == 'G' ||
                    this.SER109J8.PREFIJOW == 'H' || this.SER109J8.PREFIJOW == 'I' || this.SER109J8.PREFIJOW == 'J' || this.SER109J8.PREFIJOW == 'K') {
                    if (this.SER109J8.FECHALNK.substring(0, 4) == this.SER109J8.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER109J8.FECHALNK.substring(4, 6) == this.SER109J8.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109J8, params = { LLAVE_NUM: `${this.SER109J8.PREFIJOW}${this.form.numeroprefijo_SER109J8.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109J8.PREFIJOW , FECHAING_NUM: this.SER109J8.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109J8.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    _cerrarnumeracion_VENTANA(_toggleNav, this._evaluarprefijo_SER109J8, params = { LLAVE_NUM: `${this.SER109J8.PREFIJOW}${this.form.numeroprefijo_SER109J8.toString().trim().padStart(6,'0')}` , PREFIJOW: this.SER109J8.PREFIJOW , FECHAING_NUM: this.SER109J8.NUMERACION.FECHAING_NUM, ESTADOW: this.form.estadofactura_SER109J8.substring(0,1), FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}` });
                }
            } else {
                _toggleNav();
            }
        },
    }
})

var porcentcopagoMask_SER109J8 = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true,
});

var prefijoMask_SER109J8 = IMask($('#prefijo_SER109J8')[0], {
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

var bloqueoMask_SER109J8 = IMask($('#bloquearfactura_SER109J8')[0], {
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

var facturaoriginalMask_SER109J8 = IMask($('#facturaoriginal_SER109J8')[0], {
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

var facturavaciaMask_SER109J8 = IMask($('#facturavacia_SER109J8')[0], {
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
