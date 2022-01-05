const { isNumeric } = require("jquery");
const { relativeTimeThreshold } = require("moment");

new Vue({
    el: "#FAC138",
    data: {
        form: {
            nombreusu_FAC138: '',
            nombrelote_FAC138: '',
            comprobante_FAC138: '',
            anoelab_FAC138: '',
            meselab_FAC138: '',
            diaelab_FAC138: '',
            prefijo_FAC138: '',
            factura_FAC138: '',
            anocheque_FAC138: '',
            mescheque_FAC138: '',
            diacheque_FAC138: '',
            tercero_FAC138: '',
            fechavence_FAC138: '',
            anodir_FAC138: '',
            sucursal_FAC138: '',
            prefijotabla_FAC138: '',
            facturatabla_FAC138: '',
            descripfact_FAC138: '',
            tipofact_FAC138: '',
            numerotabla_FAC138: 0,
            codcontable_FAC138: '',
            nombrecta_FAC138: '',
            tercerotabla_FAC138: '',
            debito_FAC138: '',
            credito_FAC138: '',
            detalle_FAC138: '',
            totaldebito_FAC138: '',
            totalcredito_FAC138: '',
            centrocosto_FAC138: '',
            documento_FAC138: '',
            referencia_FAC138: '',
            diferencia_FAC138: '',
        },
        tablareccaja_FAC138: [],
        FAC138: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("3,2 - Comprobantes de egreso");
        var $_this = this;
        this.FAC138.COMP_LIMI = '99999'
        this.FAC138.LOTEW = '1C';
        this.form.nombreusu_FAC138 = `${this.FAC138.LOTEW} ${$_USUA_GLOBAL[0].NOMBRE}`;
        this.form.nombrelote_FAC138 = 'COMP. EGRESO';
        let array = {
            '1': {
                    MAYILIMI1: 2365,
                    MAYRET1: 2365,
                    MAYRET2: 2367,
                    MAYDEUD1: 1305,
                    MAYINV: 14,
                    MAYDIF: 17,
                    SCRAOTROS: 80,
                    SCTARETSAL1: 236505,
                    SCTARETSAL2: 236505
                },
            '2': {
                    MAYILIMI1: 2320,
                    MAYRET1: 2335,
                    MAYRET2: 2330,
                    MAYDEUD1: 1615,
                    MAYINV: 13,
                    MAYDIF: 17,
                    SCRAOTROS: 80,
                    SCTARETSAL1: 233005,
                    SCTARETSAL2: 233005
                },
            '3': {
                    MAYILIMI1: 2365,
                    MAYRET1: 2365,
                    MAYRET2: 2367,
                    MAYDEUD1: 1305,
                    MAYINV: 14,
                    MAYDIF: 17,
                    SCRAOTROS: 80,
                    SCTARETSAL1: 236505,
                    SCTARETSAL2: 236505
                },
            '4': {
                    MAYILIMI1: 2436,
                    MAYRET1: 2436,
                    MAYRET2: 2436,
                    MAYDEUD1: 1409,
                    MAYINV: 16,
                    MAYDIF: 17,
                    SCRAOTROS: 95,
                    SCTARETSAL1: 243615,
                    SCTARETSAL2: 243615
                },
            '5': {
                    MAYILIMI1: 2201,
                    MAYRET1: 2365,
                    MAYRET2: 2365,
                    MAYDEUD1: 1301,
                    MAYINV: 14,
                    MAYDIF: 17,
                    SCRAOTROS: 80,
                    SCTARETSAL1: 236505,
                    SCTARETSAL2: 236505
                },
            '6': {
                    MAYILIMI1: 2491,
                    MAYRET1: 2436,
                    MAYRET2: 2436,
                    MAYDEUD1: 1319,
                    MAYINV: 16,
                    MAYDIF: 17,
                    SCRAOTROS: 95,
                    SCTARETSAL1: 243615,
                    SCTARETSAL2: 243615
                },
        }
        this.FAC138 = array[$_USUA_GLOBAL[0].PUC];
        obtenerDatosCompletos({
            nombreFd: 'CTA-MAYOR', filtro: '4'
        }, function (data) {
            console.log(data)
            $_this.FAC138.MAESTROS = data.MAESTROS
            $_this.FAC138.MAESTROS.pop();
            obtenerDatosCompletos({
                nombreFd: "TERCEROS",
            }, function (data) {
                console.log(data, 'TERCEROS')
                $_this.FAC138.TERCEROS = data.TERCEROS;
                $_this.FAC138.TERCEROS.pop();
                loader('hide')
                postData({ datosh: `${datosEnvio()}1C|` }, get_url("APP/CONTAB/CON007.DLL"))
                    .then(data => {
                        var data = data.split("|");
                        $_this.FAC138.FECHAANTS = data[2];
                        $_this.FAC138.COMPINGRESO = data[1];
                        $_this.form.comprobante_FAC138 = parseInt(data[1].substring(3, 9)).toString().padStart(6, '0')
                        let $_FECHAELAB = moment().format("YYYYMMDD");
                        $_this.form.anoelab_FAC138 = $_FECHAELAB.substring(0, 4);
                        $_this.form.meselab_FAC138 = $_FECHAELAB.substring(4, 6);
                        $_this.form.diaelab_FAC138 = $_FECHAELAB.substring(6, 8);
                        $_this.form.anocheque_FAC138 = $_FECHAELAB.substring(0, 4);
                        $_this.form.mescheque_FAC138 = $_FECHAELAB.substring(4, 6);
                        $_this.form.diacheque_FAC138 = $_FECHAELAB.substring(6, 8);
                        $_this._evaluardia_FAC138();
                        obtenerDatosCompletos({
                            nombreFd: "COSTOS",
                        }, function (data) {
                            $_this.FAC138.COSTOS = data.COSTO;
                            $_this.FAC138.COSTOS.pop();
                            obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
                                $_this.FAC138.PREFIJOS = data.PREFIJOS;
                            })
                        })
                    })
                    .catch(err => {
                        console.debug(err);
                    })
            })

        })
    },
    methods: {
        _evaluardia_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR1_FAC138",
                    orden: '1'
                },
                _toggleNav,
                () => {
                    let fecha = moment(`${this.form.anoelab_FAC138}${this.form.meselab_FAC138}${this.form.diaelab_FAC138}`).format('YYYYMMDD');
                    if (fecha == 'Invalid date'){
                        CON851('','Verifique el dia digitado',this._evaluardia_FAC138(),'error','Error');
                    } else {
                        if (parseInt(fecha) > parseInt(`20${$_USUA_GLOBAL[0].FECHALNK}`) || parseInt(fecha) < parseInt(this.FAC138.FECHAANTS)){
                            CON851('37','37',this._evaluardia_FAC138(),'error','Error');
                        } else {
                            this._evaluarfechacheque_FAC138('1');
                        }
                    }
                }
            )
        },
        _evaluarfechacheque_FAC138(orden){
            validarInputs(
                {
                    form: "#VALIDAR2_FAC138",
                    orden: orden
                },
                this._evaluardia_FAC138,
                () => {
                    let fecha = moment(`${this.form.anocheque_FAC138}${this.form.mescheque_FAC138}${this.form.diacheque_FAC138}`).format('YYYYMMDD');
                    if (fecha == 'Invalid date'){
                        CON851('','Verifique la fecha digitada',this._evaluarfechacheque_FAC138('1'),'error','Error');
                    } else {
                        if (parseInt(fecha) > parseInt(`20${$_USUA_GLOBAL[0].FECHALNK}`) || parseInt(fecha) < parseInt(this.FAC138.FECHAANTS)){
                            CON851('37','37',this._evaluarfechacheque_FAC138('1'),'error','Error');
                        } else {
                            // this._evaluarmacro_FAC138(); PREGUNTAR A ROBER POR QUE MACROS NO SIRVE
                            this._evaluarcodcontable_FAC138();
                        }
                    }
                }
            )
        },
        _evaluarmacro_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR3_FAC138",
                    orden: '1'
                },
                () => { _evaluarfechacheque_FAC138('3') },
                () => { }
            )
        },
        _evaluarcodcontable_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR6_FAC138",
                    orden: '1',
                    event_f3: this._subtotal_FAC138
                },
                () => { this._evaluarfechacheque_FAC138('3') },
                () => {
                    this.FAC138.MAYORW = this.form.codcontable_FAC138.substring(0,4);
                    this.FAC138.SUBCTAW = this.form.codcontable_FAC138.substring(4,6);
                    this.FAC138.AUXILW = this.form.codcontable_FAC138.substring(6,11);
                    if (parseInt(this.FAC138.MAYORW) == 0 || this.FAC138.MAYORW.trim() == ''){
                        CON851('','Digite un codigo contable valido', this._evaluarcodcontable_FAC138(),'error','Error');
                    } else if (!isNumeric(this.FAC138.MAYORW) || parseInt(this.FAC138.MAYORW) < 1000 || this.FAC138.SUBCTAW.trim() == '' || parseInt(this.FAC138.SUBCTAW) == 0 || this.FAC138.AUXILW.trim() == '' || parseInt(this.FAC138.AUXILW) == 0){
                        CON851('03','03',this._evaluarcodcontable_FAC138(),'error','Error');
                    } else {
                        let cuenta = this.FAC138.MAESTROS.filter(x => x.LLAVE_MAE.substring(0,11) == this.form.codcontable_FAC138.trim());
                        if (cuenta.length > 0){
                            this.FAC138.PORCENTRETMAE = cuenta[0].PORCENT_RET;
                            if (cuenta[0].NOMBRE_MAE.trim().substring(0,1) == '*'){
                                CON851('13','13',this._evaluarcodcontable_FAC138(),'error','Error');
                            } else {
                                this.form.nombrecta_FAC138 = cuenta[0].NOMBRE_MAE;
                                if ($_USUA_GLOBAL[0].PUC != '4' && $_USUA_GLOBAL[0].PUC != '6' && this.FAC138.SUBCTAW != '25'){
                                    if ($_USUA_GLOBAL[0].RETENEDOR.trim() == 'S'){
                                        CON851('66','66',this._evaluarcodcontable_FAC138(),'error','Error');
                                    } else {
                                        this._evaluarnit_FAC138();
                                    }
                                } else {
                                    this._evaluarnit_FAC138();
                                }
                            }
                        } else {
                            CON851('01','01',this._evaluarcodcontable_FAC138(),'error','Error');
                        }
                    }
                }
            )
        },
        _evaluarnit_FAC138(){
            // if (this.FAC138.MAYORW == '1105' || this.FAC138.MAYORW == '1110' || this.FAC138.MAYORW == '1125' || this.FAC138.MAYORW == '1245'){
            // }
            validarInputs(
                {
                    form: "#VALIDAR6_1_FAC138",
                    orden: '1'
                },
                this._evaluarcodcontable_FAC138,
                () => {
                    if (parseInt(this.form.tercerotabla_FAC138) == 0 || this.form.tercerotabla_FAC138.trim() == '' || isNaN(parseInt(this.form.tercerotabla_FAC138))){
                        CON851('02','02',this._evaluarnit_FAC138(),'error','Error');
                    } else {
                        let tercero = this.FAC138.TERCEROS.filter(x => x.COD == this.form.tercerotabla_FAC138.trim().padStart(10,' '))
                        if (tercero.length > 0){
                            if (tercero[0].EMBARGOS.trim() != '' || tercero[0].EMBARGOS.trim().substring(0,3) != 'DES'){
                                CON851('2S','2S',null,'warning','Advertencia');
                            }
                            if ($_USUA_GLOBAL[0].COSTO == 'S'){
                                if ($_USUA_GLOBAL[0].NIT == 900541158 || $_USUA_GLOBAL[0].NIT == 900566047 || $_USUA_GLOBAL[0].NIT == 900658867 || $_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152){
                                    if (parseInt(this.form.codcontable_FAC138.substring(0,2)) == this.FAC138.MAYINV || parseInt(this.form.codcontable_FAC138.substring(0,2)) == this.FAC138.MAYDIF || (parseInt(this.form.codcontable_FAC138.substring(0,4)) > 5000 && parseInt(this.form.codcontable_FAC138.substring(0,4)) < 8000) || $_USUA_GLOBAL[0].COSTO_DEUD == 'S'){
                                        this._evaluarcosto_FAC138();
                                    } else {
                                        this.form.centrocosto_FAC138 = '0000';
                                        this._evaluardatofact_FAC138();
                                    }
                                } else {
                                    if (parseInt(this.form.codcontable_FAC138.substring(0,2)) == this.FAC138.MAYINV || parseInt(this.form.codcontable_FAC138.substring(0,2)) == this.FAC138.MAYDIF || (parseInt(this.form.codcontable_FAC138.substring(0,4)) > 5000 && parseInt(this.form.codcontable_FAC138.substring(0,4)) < 8000) || $_USUA_GLOBAL[0].COSTO_DEUD == 'S'){
                                        this._evaluarcosto_FAC138();
                                    } else {
                                        this.form.centrocosto_FAC138 = '0000';
                                        this._evaluardatofact_FAC138();
                                    }
                                }
                            } else {
                                this._evaluardatofact_FAC138();
                            }
                        } else { 
                            CON851('01','01',this._evaluarnit_FAC138(),'error','Error');
                        }
                    }
                }
            )
        },
        _evaluarcosto_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR10_FAC138",
                    orden: '1'
                },
                this._evaluarnit_FAC138,
                () => {
                    this.form.centrocosto_FAC138 = this.form.centrocosto_FAC138.padStart(4,'0');
                    if (this.form.centrocosto_FAC138.trim() == ''){
                        CON851('03','03',this._evaluarcosto_FAC138(),'error','Error');
                    } else {
                        let costo = this.FAC138.COSTOS.filter(x => x.COD == this.form.centrocosto_FAC138)
                        if (costo.length > 0){
                            if (costo[0].NOMBRE.substring(0,1) == '*'){
                                CON851('13','13',this._evaluarcosto_FAC138(),'error','Error');
                            } else {
                                if (costo[0].MAY_COSTO[0].trim() == ''){
                                    this._evaluardatofact_FAC138();
                                } else {
                                    let swbuscar = costo[0].MAY_COSTO.filter(x => x.trim() == this.FAC138.MAYORW.trim());
                                    if (swbuscar.length == 0){
                                        CON851('61','61',this._evaluarcosto_FAC138(),'error','Error');
                                    } else {
                                        this._evaluardatofact_FAC138();
                                    }
                                }
                            }
                        } else {
                            CON851('01','01',this._evaluarcosto_FAC138(),'error','Error');
                        }
                    }
                }
            )
        },
        _evaluardatofact_FAC138(){
            if ($_USUA_GLOBAL[0].CARTERA == 'S' && (parseInt(this.form.codcontable_FAC138.substring(0,4)) == this.FAC138.MAYDEUD1) && (parseInt(this.FAC138.SUBCTAW) == this.FAC138.SCTAOTROS)){
                // this._evaluardatocartera_FAC138(); releer el codcontable
                this._evaluardatotipofact_FAC138();
            } else {
                $('#TIPOFACT_FAC138').addClass('hidden');
                $('#PROVEEDOR_FAC138').removeClass('hidden');
                this._evaluardatoproveedor_FAC138();
            }
        },
        _evaluardatotipofact_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR6_2_FAC138",
                    orden: '1'
                },
                this._evaluarnit_FAC138,
                () =>{
                    this.form.prefijotabla_FAC138 = this.form.prefijotabla_FAC138.toUpperCase();
                    if (this.form.prefijotabla_FAC138 == 'A' || this.form.prefijotabla_FAC138 == 'P' || this.form.prefijotabla_FAC138 == 'T' || this.form.prefijotabla_FAC138 == 'C'){
                        this._evaluardatonrofact_FAC138();
                    } else {
                        this._evaluardatotipofact_FAC138();
                    }
                }
            )
        },
        _evaluardatonrofact_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR6_3_FAC138",
                    orden: '1'
                },
                this._evaluarcodcontable_FAC138,
                () => {
                    console.log('DLL DE CONSULTA FACTURA');
                    this._evaluardato3_FAC138();
                }
            )
        },
        _evaluardatoproveedor_FAC138(){
            if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0,2)) < 02){
                this._evaluardatoobligacion_FAC138();
            } else if ($_USUA_GLOBAL[0].PUC == '2' && this.form.codcontable_FAC138.substring(0,4) == '2445'){
                this._evaluardatoobligacion_FAC138();
            } else if (this.form.codcontable_FAC138 == '1330' || (parseInt(this.form.codcontable_FAC138.substring(0,4)) > 2000 && parseInt(this.from.codcontable_FAC138.substring(0,4)) < this.FAC138.MAYLIMI1) || this.form.codcontable_FAC138 == '28150500015'){
                this._evaluardatoproveedor2_FAC138();
            } else {
                if (($_USUA_GLOBAL[0].NIT == 900541158 || $_USUA_GLOBAL[0].NIT == 900566047 || $_USUA_GLOBAL[0].NIT == 900658867 || $_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) && this.form.codcontable_FAC138.substring(0,2) == '13'){
                    this._evaluardatoproveedor2_FAC138();
                } else{
                    if ($_USUA_GLOBAL[0].NIT == 800037021 && this.form.codcontable_FAC138 == '11050200001'){
                        this._evaluarfechapro_FAC138();
                    } else {
                        this._evaluardatoobligacion_FAC138();
                    }
                }
            }
        },
        _evaluardatoproveedor2_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR6_4_FAC138",
                    orden: '1'
                },
                this._evaluarcodcontable_FAC138,
                () => {
                    if (parseInt(this.form.documtabla_FAC138) == 0){
                        CON851('03','03',this._evaluardatoproveedor2_FAC138(),'error','Error');
                    } else {
                        if ($_USUA_GLOBAL[0].NIT == 845000038){
                            // CONSULTA DLL CON320
                        } else {
                            // DLL CONSULTA DE PROVEEDOR
                        }
                    }
                }
            )
        },
        _evaluardatoobligacion_FAC138(){
            if ($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6'){
                if ($_USUA_GLOBAL[0].NIT == 800037021 && this.form.codcontable_FAC138.substring(0,6) == '110502'){
                    this._ventanaobligacion_FAC138();
                } else {
                    switch($_USUA_GLOBAL[0].PUC){
                        case '4':   if ((parseInt(this.form.codcontable_FAC138.substring(0,4)) < 1429) || (parseInt(this.form.codcontable_FAC138.substring(0,4)) < this.FAC138.MAYRET1) || (parseInt(this.form.codcontable_FAC138.substring(0,4)) < this.FAC138.MAYRET2) || this.form.codcontable_FAC138.substring(0,4) == '1384' || this.form.codcontable_FAC138.substring(0,4) == '2445' || this.form.codcontable_FAC138.substring(0,4) == '2450' || this.form.codcontable_FAC138.substring(0,4) == '2455'){
                                        this.FAC138.OBLIGACIONARR = '99999';
                                        this._evaluardato3_FAC138();
                                    }
                                    break;
                        case '6':   if ((parseInt(this.form.codcontable_FAC138.substring(0,4)) < 1328) || (parseInt(this.form.codcontable_FAC138.substring(0,4)) < this.FAC138.MAYRET1) || (parseInt(this.form.codcontable_FAC138.substring(0,4)) < this.FAC138.MAYRET2) || this.form.codcontable_FAC138.substring(0,4) == '1384' || this.form.codcontable_FAC138.substring(0,4) == '2445' || this.form.codcontable_FAC138.substring(0,4) == '2450' || this.form.codcontable_FAC138.substring(0,4) == '2455'){
                                        this.FAC138.OBLIGACIONARR = '99999';
                                        this._evaluardato3_FAC138();
                                    }
                                    break;
                        default:    this._ventanaobligacion_FAC138();
                                    break;
                    }
                }
            } else {
                this._evaluardato3_FAC138();
            }
        },
        _evaluardato3_FAC138(){
            if ((parseInt(this.form.codcontable_FAC138.substring(0,6)) == this.FAC138.SCTARETSAL1 || parseInt(this.form.codcontable_FAC138.substring(0,6)) == this.FAC138.SCTARETSAL2) && this.form.codcontable_FAC138.substring(6,11) == '00016'){
                //  CALL DIAN801
            } else {
                if (parseInt(this.form.codcontable_FAC138.substring(0,4)) >= this.FAC138.MAYRET1 && parseInt(this.form.codcontable_FAC138.substring(0,4)) <= this.FAC138.MAYRET2){
                    this._evaluardatobaseret_FAC138();
                } else {
                    this.FAC138.BASERETARR = '0';
                    this._evaluardatovlr_FAC138();
                }
            }
        },
        _evaluardatovlr_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR7_FAC138",
                    orden: '1'
                },
                this._evaluarcodcontable_FAC138,
                () => {
                    if (parseInt(this.form.debito_FAC138) == 0 || this.form.debito_FAC138.trim() == ''){
                        CON851('','Digite un valor',this._evaluardatovlr_FAC138(),'error','Error');
                    } else {
                        // evaluar porcentajemae y baseret arr y valor arr
                        if (this.form.debito_FAC138.indexOf('-') < 0){
                            if (parseFloat(this.FAC138.PORCENTRETMAE) > 0 && this.FAC138.BASERETARR == 0){
                                this._evaluardatobaseret_FAC138();
                            } else {
                                this._mostrarvalor_FAC138();
                            }
                        } else {
                            this._mostrarvalor_FAC138();
                        }
                    }
                }
            )
        },
        _evaluardatobaseret_FAC138(){
            if (parseFloat(this.FAC138.PORCENTRETMAE) == 0){
                CON851('04','04',this._evaluarcodcontable_FAC138(),'error','Error');
            } else {
                if (this.form.codcontable_FAC138.substring(0,4) == '2425' && this.form.codcontable_FAC138.substring(4,6) == '32'){
                    this.FAC138.PORCENTRETW = parseFloat(this.FAC138.PORCENTRETMAE) / 1000;
                } else {
                    this.FAC138.PORCENTRETW = parseFloat(this.FAC138.PORCENTRETMAE) / 100;
                }
                setTimeout(this._evaluarventanabaseret_FAC138, 300);
            }
        },
        _evaluarventanabaseret_FAC138(){
            $_this = this
            var ventanabaseret_FAC138 = bootbox.dialog({
                size: 'small',
                title: 'Retencion en la fuente',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "BASE GRAVABLE:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDARVENTANAGRAVABLE_FAC138"> ' +
                    '<input id="baseret_FAC138" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="5"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanabaseret_FAC138.off('show.bs.modal');
                            $_this.FAC138.BASERETARR = $('#baseret_FAC138').val();
                            $_this.form.debito_FAC138 = $_this.FAC138.VLRRETW;
                            $_this._mostrarvalor_FAC138();
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanabaseret_FAC138.off('show.bs.modal');
                            $_this._evaluardatovlr_FAC138();
                        }
                    }
                }
            });
            ventanabaseret_FAC138.init($('.modal-footer').hide());
            ventanabaseret_FAC138.init(this._evaluarbaseret_FAC138());
            ventanabaseret_FAC138.on('shown.bs.modal', function () {
                $("#baseret_FAC138").focus();
            });
        },
        _evaluarbaseret_FAC138(){
            var baseMask_FAC138 = IMask($("#baseret_FAC138")[0], {
                mask: Number,
                thousandsSeparator: ",",
                scale: 2,
                radix: ".",
                thousandsSeparator: ",",
                normalizeZeros: true,
                padFractionalZeros: true,
              });
            validarInputs(
                {
                    form: "#VALIDARVENTANAGRAVABLE_FAC138",
                    orden: '1'
                },
                () => { $('.btn-danger').click() },
                () => {
                    let base = baseMask_FAC138.value;
                    if (parseFloat(base) == 0){
                        $('.btn-danger').click()
                    } else {
                        if (parseFloat(base) > 99.99){
                            // DLL SC-ICAV
                        } else {
                            this.FAC138.VLRRETW = parseFloat(base) * this.FAC138.PORCENTRETW * -1
                        }
                        $('.btn-primary').click();
                    }
                }
            )
        },
        _mostrarvalor_FAC138(){
            if ((this.form.codcontable_FAC138.substring(0,4) == '1105' || this.form.codcontable_FAC138.substring(0,4) == '1110' || this.form.codcontable_FAC138.substring(0,4) == '1125' || this.form.codcontable_FAC138.substring(0,4) == '1225' || this.form.codcontable_FAC138.substring(0,4) == '11032') && (parseFloat(this.form.debito_FAC138) > this.FAC138.SALDOCTAW)){
                CON851('07','07',null,'error','Error');
                if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && ($_USUA_GLOBAL[0].NIT != 822000593 && $_USUA_GLOBAL[0].NIT != 822000593)){
                    this._evaluardatovlr_FAC138();
                } else {
                    this._calcularpac_FAC138();
                }
            } else {
                this._calcularpac_FAC138();
            }
        },
        _calcularpac_FAC138(){
            if ($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') {
                switch($_USUA_GLOBAL[0].PUC){
                    case '4':   if (this.FAC138.OBLIGACIONARR == '99999' || parseInt(this.FAC138.OBLIGACIONARR) > parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0,2)) * 1000 || (parseInt(this.form.codcontable_FAC138.substring(0,4)) < 1328) || this.form.codcontable_FAC138.substring(0,4) == '1384' || this.form.codcontable_FAC138.substring(0,4) == '2445' || this.form.codcontable_FAC138.substring(0,4) == '2450' || this.form.codcontable_FAC138.substring(0,4) == '2455' || this.form.codcontable_FAC138.substring(0,6) == '249011'){
                                    this._evaluardetalle_FAC138();
                                }
                                break;
                    case '6':   if (this.FAC138.OBLIGACIONARR == '99999' || parseInt(this.FAC138.OBLIGACIONARR) > parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0,2)) * 1000 || (parseInt(this.form.codcontable_FAC138.substring(0,4)) < 1420) || this.form.codcontable_FAC138.substring(0,4) == '1384' || this.form.codcontable_FAC138.substring(0,4) == '2445' || this.form.codcontable_FAC138.substring(0,4) == '2450' || this.form.codcontable_FAC138.substring(0,4) == '2455' || this.form.codcontable_FAC138.substring(0,6) == '242511'){
                                    this._evaluardetalle_FAC138();
                                }
                                break;
                    default:    this._consultapac_FAC138();
                                break;
                }
            } else {
                this._evaluardetalle_FAC138();
            }
        },
        _evaluardetalle_FAC138(){
            validarInputs(
                {
                    form: "#VALIDAR9_FAC138",
                    orden: '1'
                },
                this._evaluardato3_FAC138,
                () => {
                    if (this.form.detalle_FAC138.trim() == ''){
                        this._evaluardetalle_FAC138();
                    } else {
                        this.form.numerotabla_FAC138 = this.form.numerotabla_FAC138 + 1;
                        if (this.form.debito_FAC138.indexOf('-') >= 0) {
                            this.form.credito_FAC138 = this.form.debito_FAC138
                            this.form.debito_FAC138 = '0';
                        } else {
                            this.form.credito_FAC138 = '0'
                        }
                        if (!this.FAC138.FECHAVENCEARR) this.FAC138.FECHAVENCEARR = '00000000';
                        if (!this.FAC138.FLUJOARR) this.FAC138.FLUJOARR = '';
                        if (!this.FAC138.OTROARR) this.FAC138.OTROARR = '';
                        if (!this.FAC138.RESTRPAGOARR) this.FAC138.RESTRPAGOARR = '';
                        if (!this.FAC138.TIPODOCARR) this.FAC138.TIPODOCARR = '';
                        this.tablareccaja_FAC138.push({ CODIGO_CONTROL: this.form.codcontable_FAC138, NOMBRE: this.form.nombrecta_FAC138, COSTO: this.form.centrocosto_FAC138, NIT: this.form.tercerotabla_FAC138, SUCURSAL: this.form.prefijotabla_FAC138, DOCUM: this.form.facturatabla_FAC138, VALORDEBITO: this.form.debito_FAC138, VALORCREDITO: this.form.credito_FAC138, BASERETARR: this.FAC138.BASERETARR, TIPODOCARR: this.FAC138.TIPODOCARR, RESTRPAGOARR: this.FAC138.RESTRPAGOARR, FECHAVENCE: this.FAC138.FECHAVENCEARR, OTROARR: this.FAC138.OTROARR, OBLIGACION: this.FAC138.OBLIGACIONARR, FLUJOARR: this.FAC138.FLUJOARR, DETALLE: this.form.detalle_FAC138})
                        this.form.codcontable_FAC138 = '';
                        this.form.tercerotabla_FAC138 = '';
                        this.form.prefijotabla_FAC138 = '';
                        this.form.facturatabla_FAC138 = '';
                        this.form.documtabla_FAC138 = '';
                        this.form.debito_FAC138 = '';
                        this.form.credito_FAC138 = '';
                        this.form.detalle_FAC138 = '';
                        this.form.centrocosto_FAC138 = '';
                        this.form.nombrecta_FAC138 = '';
                        console.log(this.tablareccaja_FAC138);
                        if (this.form.numerotabla_FAC138 > 899){
                            CON851('9O','9O',this._subtotal_FAC138(),'warning','Advertencia');
                        } else {
                            this._evaluarcodcontable_FAC138();
                        }
                    }
                }
            )
        },
        _subtotal_FAC138(){
            let totaldebitos = 0;
            let totalcreditos = 0;
            this.FAC138.GASTO = 0;
            this.FAC138.SWRET = 0;
            for (var i in this.tablareccaja_FAC138){
                totaldebitos = totaldebitos + parseFloat(this.tablareccaja_FAC138[i].VALORDEBITO);
                totalcreditos = totalcreditos + parseFloat(this.tablareccaja_FAC138[i].VALORCREDITO);
                if (this.tablareccaja_FAC138[i].CODIGO_CONTROL.substring(0,1) == '5' || this.tablareccaja_FAC138[i].CODIGO_CONTROL.substring(0,1) == '7'){
                    this.FAC138.GASTO = this.FAC138.GASTO = parseFloat(this.tablareccaja_FAC138[i].VALORDEBITO) + parseFloat(this.tablareccaja_FAC138[i].VALORCREDITO);
                }
                if (parseInt(this.tablareccaja_FAC138[i].CODIGO_CONTROL.substring(0,4)) == this.FAC138.MAYRET1 || parseInt(this.tablareccaja_FAC138[i].CODIGO_CONTROL.substring(0,4)) == this.FAC138.MAYRET2){
                    this.FAC138.SWRET = 1;
                }
            }
            this.form.totalcredito_FAC138 = totalcreditos;
            this.form.totaldebito_FAC138 = totaldebitos;
            let descuadre = totaldebitos + totalcreditos;
            this.form.diferencia_FAC138 = descuadre.toString();
            if (descuadre == 0){
                this._evaluardatorefer_FAC138();
            } else {
                CON851('','Verifique el descuadre',this._evaluarcodcontable_FAC138(),'error','Error');
            }
        },
        _evaluardatorefer_FAC138(){
            if (this.FAC138.GASTO > (parseInt($_USUA_GLOBAL[0].SAL_MIN) / 5)){
                CON851('45','45',null,'error','Error');
            }
            $('#VALIDAR12_FAC138').removeClass('hidden');
            validarInputs(
                {
                    form: "#VALIDAR12_FAC138",
                    orden: '1'
                },
                this._evaluarcodcontable_FAC138,
                () => {
                    if (this.form.referencia_FAC138.trim() == ''){
                        CON851('02','02',this._evaluardatorefer_FAC138(),'error','Error');
                    } else {
                        if ($_USUA_GLOBAL[0].CTL_CHEQ.trim() == 'S'){
                            //  CONSULTAR CON388A
                            this._confirmar_FAC138();
                        } else {
                            this._confirmar_FAC138();
                        }
                    }
                }
            )
        },
        _confirmar_FAC138(){
            setTimeout( () => {
                CON851P('00', this._evaluardatorefer_FAC138, this._grabarsecuencia_FAC138)
            }, 300 )
        },
        _grabarsecuencia_FAC138(){
            postData({ datosh: `${datosEnvio()}1C|` }, get_url("APP/CONTAB/CON007.DLL"))
            .then(data => {
                data = data.split("|");
                this.form.comprobante_FAC138 = (parseInt(data[1].substring(3,9))).toString().padStart(6,'0');
                postData({ datosh: `${datosEnvio()}1C|${moment().format('YYMMDD')}|${this.form.comprobante_FAC138}|` }, get_url("APP/CONTAB/CON007X.DLL"))
                .then(data => {
                    data = data.split("|");
                    console.debug(data);
                    var data = {};
                    data.datosh = `${datosEnvio()}1|1C|${localStorage.Usuario}|${this.form.comprobante_FAC138}|${this.form.anoelab_FAC138.substring(2,4)}${this.form.meselab_FAC138}${this.form.diaelab_FAC138}|`;
                    var lin = 1;
                    for (var i in this.tablareccaja_FAC138) {
                        if (parseInt(this.tablareccaja_FAC138[i].OBLIGACION) > 0 && parseInt(this.tablareccaja_FAC138[i].OBLIGACION) < 99999){
                            this.tablareccaja_FAC138[i].FACT = this.tablareccaja_FAC138[i].OBLIGACION;
                        } else {
                            if (this.tablareccaja_FAC138[i].DOCUM.trim() != '' && parseInt(this.tablareccaja_FAC138[i].DOCUM.substring(1,7)) > 0){
                                this.tablareccaja_FAC138[i].FACT = this.tablareccaja_FAC138[i].DOCUM.substring(1,7);
                            } else {
                                this.tablareccaja_FAC138[i].FACT = '';
                            }
                        }
                    }
                    for (var i in this.tablareccaja_FAC138) {
                        let valor = '';
                        if (parseFloat(this.tablareccaja_FAC138[i].VALORDEBITO) > 0) valor = this.tablareccaja_FAC138[i].VALORDEBITO
                        else valor = this.tablareccaja_FAC138[i].VALORCREDITO
                        data['LIN-' + lin.toString().padStart(3, '0')] = this.tablareccaja_FAC138[i].CODIGO_CONTROL + '|' + this.tablareccaja_FAC138[i].COSTO + '|' + this.tablareccaja_FAC138[i].NIT + '|' + this.tablareccaja_FAC138[i].SUCURSAL + '|' + this.tablareccaja_FAC138[i].DOCUM + '|' + valor + '|' + this.tablareccaja_FAC138[i].BASERETARR + '|' + this.tablareccaja_FAC138[i].DETALLE + '|' + this.tablareccaja_FAC138[i].TIPODOCARR + '|' + this.tablareccaja_FAC138[i].FECHAVENCE + '|' + this.tablareccaja_FAC138[i].FLUJOARR + '|' + this.tablareccaja_FAC138[i].RESTRPAGOARR + '|' + this.tablareccaja_FAC138[i].OTROARR + '|' + this.tablareccaja_FAC138[i].OBLIGACION + '|';
                        lin++;
                    }
                    let URL = get_url("APP/SALUD/FAC138.DLL");
                    postData(
                        data, URL)
                        .then(data => {
                            console.log(data);
                            this.FAC138.BANCO = data;
                            this._impresion_FAC138();
                        })
                        .catch(err => {
                            console.error(err);
                            this._evaluarcodcontable_FAC138();
                        })
                })
                .catch(err => {
                    console.error(err);
                    CON851('','Ocurrio un error grabando la secuencia',this._evaluarcodcontable_FAC138(),'error','Error');
                });
            })
            .catch(err => {
                CON851('','Ocurrio un error consultando la secuencia',this._evaluarcodcontable_FAC138(),'error','Error');
                console.error(err);
            });
        },
        _impresion_FAC138(){
            let datosimpresion = new Object;
            datosimpresion.LOTE = this.form.nombreusu_FAC138.substring(0,2);
            datosimpresion.NOMBRELOTE = this.form.nombrelote_FAC138.trim();
            datosimpresion.FECHA = `${this.form.anoelab_FAC138}${this.form.meselab_FAC138}${this.form.diaelab_FAC138}`
            datosimpresion.TABLA = this.tablareccaja_FAC138;
            datosimpresion.WIDTH = ['15%', '4%', '20%', '5%', '10%', '20%', '12%', '12%'];
            datosimpresion.COLUMNAS = ['CODIGO_CONTROL','COSTO','NOMBRE','FACT','NIT','DETALLE','VALORDEBITO','VALORCREDITO'];
            let valorcredito = 0;
            let valordebito = 0;
            for (var i in this.tablareccaja_FAC138) {
                valorcredito = valorcredito + parseInt(this.tablareccaja_FAC138[i].VALORCREDITO);
                valordebito = valordebito + parseInt(this.tablareccaja_FAC138[i].VALORDEBITO);
            }
            datosimpresion.VLRDEBITO = valordebito;
            datosimpresion.VLRCREDITO = valorcredito;
            datosimpresion.DOCUMENTO = this.form.referencia_FAC138;
            let ultimo = this.tablareccaja_FAC138.length - 1;
            console.log(ultimo);
            console.log(this.tablareccaja_FAC138[ultimo]);
            if ($_USUA_GLOBAL[0].PUC == '4' && parseInt(this.tablareccaja_FAC138[ultimo].OBLIGACION) > 0 && parseInt(this.form.tablareccaja_FAC138[ultimo].OBLIGACION)) datosimpresion.COMPROMISO = this.tablareccaja_FAC138[ultimo].OBLIGACION
            else datosimpresion.COMPROMISO = ''
            if (parseInt(this.tablareccaja_FAC138[ultimo].OTROARR) > 0 ) datosimpresion.RUBRO = this.tablareccaja_FAC138[ultimo].OTROARR
            else datosimpresion.RUBRO = ''
            datosimpresion.NROCHEQUE = '';
            datosimpresion.BANCO = this.FAC138.BANCO;
            datosimpresion.ELABORO = `${localStorage.Usuario.trim()} ${this.form.anoelab_FAC138.substring(2,4)}${this.form.meselab_FAC138}${this.form.diaelab_FAC138}`
            datosimpresion.IMPRIMIO = localStorage.Usuario.trim();
            // FALTA NRO DE CHEQUE PARA UN USUARIO EN ESPECIFICO
            datosimpresion.TIPOFACTURA = 'FAC138';
            console.log(datosimpresion)
            _impresioncopagosyrecibosdecaja(datosimpresion, this._evaluardatorefer_FAC138, () => {
                CON851('','Proceso terminado', _toggleNav(),'success','Exito');
            })
        },
        _f8ctacontable_FAC138() {
            $_this = this;
            _ventanaDatos({
                titulo: 'VENTANA COD CONTABLE',
                columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
                data: this.FAC138.MAESTROS,
                callback_esc: function () {
                    $(".codcontable_FAC138").focus();
                },
                callback: function (data) {
                    $_this.form.codcontable_FAC138 = data.LLAVE_MAE.substring(0, 11).trim()
                    _enterInput('.codcontable_FAC138');
                }
            });
        },
        _f8terceros_FAC138() {
            $_this = this;
            _ventanaDatos_lite_v2({
                titulo: "VENTANA DE TERCEROS",
                data: this.FAC138.TERCEROS,
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
                    $(".tercero_FAC138").focus();
                },
                callback: function (data) {
                    $_this.form.tercerotabla_FAC138 = data.COD.trim().padStart(10, " ");
                    _enterInput(".tercero_FAC138");
                },
            });

        },
    }
})