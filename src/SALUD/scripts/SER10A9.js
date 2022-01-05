// // 16-09-2020 DIANA E: creado 
new Vue({
    el: "#SER10A9",
    data: {
        SER10A9: [],
        form: {
            numeroprefijo_SER10A9: "",
            entidad_SER10A9: "",
            nombrepaciente_SER10A9: ""
        }
    },
    created() {
        _inputControl("disabled");
        loader("show");
        nombreOpcion('9,7,4,3,M - Imprimir resumen por paciente');
        this.SER10A9.PREFIJOW = 'A';
        this.SER10A9.FECHALNK = '20' + $_USUA_GLOBAL[0].FECHALNK;
        var $_this = this;
        console.log('CREATE FIN')
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER10A9.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER10A9.FIRMAS = data;
                $_this._evaluarprefijo_SER10A9();
            })
        })
    },
    methods: {
        _evaluarprefijo_SER10A9() {
            console.log('PREFIJO')
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER10A9',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER10A9.PREFIJOW = prefijoMask_SER10A9.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER10A9.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER10A9 = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER10A9();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER10A9() {
            console.log('NUMERO')
            validarInputs({
                form: '#VALIDAR2_SER10A9',
                orden: '1'
            },
                this._evaluarprefijo_SER10A9,
                () => {
                    this.SER10A9.LLAVEW = this.SER10A9.PREFIJOW + this.form.numeroprefijo_SER10A9.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER10A9.LLAVEW }, this._validarfactura_SER10A9, this._evaluarnumeroprefijo_SER10A9)
                }
            )
        },
        _validarfactura_SER10A9(data1, data2) {
            this.SER10A9.NUMERACION = data1;
            if (this.SER10A9.NUMERACION.TIPOPACI_NUM == "X") this.SER10A9.NUMERACION.TIPOPACI_NUM == '*';
            this.SER10A9.FECHAPRENUM = this.SER10A9.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER10A9 = this.SER10A9.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER10A9 = this.SER10A9.NUMERACION.NOMBREPAC_NUM.trim();
            this.SER10A9.observacion_SER10A9 = this.SER10A9.NUMERACION.OBSERV_NUM
            this.SER10A9.anexos_SER10A9 = this.SER10A9.NUMERACION.ANEXOS_NUM
            this.SER10A9.estadofactura_SER10A9 = this.SER10A9.NUMERACION.ESTADO
            this._grabarnumeracion_SER10A9()
        },

        _grabarnumeracion_SER10A9() {
            console.log('GRABAR NUMERACON')
            if (this.SER10A9.observacion_SER10A9.trim() != this.SER10A9.NUMERACION.OBSERV_NUM.trim() || this.SER10A9.anexos_SER10A9.trim() != this.SER10A9.NUMERACION.ANEXOS_NUM.trim() || this.SER10A9.estadofactura_SER10A9 != this.SER10A9.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER10A9.LLAVEW + '|' + this.form.observacion_SER10A9 + '|' + this.form.anexos_SER10A9 + '|' + this.form.estadofactura_SER10A9.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarfiltrosimpresion_SER10A9()
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarnumeroprefijo_SER10A9()
                        }
                    })
            } else {
                this._evaluarfiltrosimpresion_SER10A9()
            }
        },
        _evaluarfiltrosimpresion_SER10A9() {
            ///////////////FALTA HACER DLL DE CONSULTA IMRESION////////
            let URL = get_url("APP/SALUD/SER10A9.DLL");
            postData({
                datosh: datosEnvio() + this.SER10A9.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    console.log(data)
                    SER10A9.FACTURA = data.FACTURA;
                    SER10A9.FACTURA.pop()
                    this._evaluarlistarmedico_SER10A9()
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MENSAJE == '08') {
                        $('#VACIA_SER10A9').removeClass('hidden');
                        facturavaciaMask_SER10A9.typedValue = 'N';
                        this._evaluarimprimirvacia_SER10A9();
                    } else {
                        CON851('', 'Hubo un error con el cierre', this._evaluarnumeroprefijo_SER10A9(), 'error', 'error');
                    }
                })
        },
        _evaluarlistarmedico_SER10A9() {
            console.log('listar medio')
            listarmedicoMask_SER10A9.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR3_SER10A9',
                orden: '1'
            },
                () => { this._evaluarnumeroprefijo_SER10A9('2') },
                () => {
                    if (listarmedicoMask_SER10A9.value.trim() == '') listarmedicoMask_SER10A9.typedValue = 'N'
                    this._evaluarfacturaoriginal_SER10A9()
                }
            )
        },
        _evaluarfacturaoriginal_SER10A9() {
            facturaoriginalMask_SER10A9.typedValue = 'N'
            validarInputs({
                form: '#VALIDAR4_SER10A9',
                orden: '1'
            },
                () => { this._evaluarlistarmedico_SER10A9() },
                () => {
                    if (facturaoriginalMask_SER10A9.value.trim() == '') facturaoriginalMask_SER10A9.typedValue = 'N'
                    if (parseFloat(this.SER10A9.NUMERACION.PORCECOPAGO_NUM) > 0 && (this.SER10A9.PREFIJOW == 'P' || this.SER10A9.PREFIJOW == 'T' || this.SER10A9.PREFIJOW == 'O' || this.SER10A9.PREFIJOW == 'Q' || this.SER10A9.PREFIJOW == 'R' || this.SER10A9.PREFIJOW == 'U' || this.SER10A9.PREFIJOW == 'V' || this.SER10A9.PREFIJOW == 'W' || this.SER10A9.PREFIJOW == 'X' || this.SER10A9.PREFIJOW == 'Y' || this.SER10A9.PREFIJOW == 'Z')) {
                        if (this.SER10A9.estadofactura_SER10A9 == '0' || this.SER10A9.estadofactura_SER10A9 == '3') {
                            postData({
                                datosh: datosEnvio() + this.SER10A9.LLAVEW + '|' + this.SER109.NUMERACION.IDPAC_NUM + '|' + this.SER109.NUMERACION.DESCRIP_PACI.substring(0, 5) + '|' + '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|'
                            }, get_url("APP/SALUD/SER836E.DLL"))
                                .then((data) => {
                                    console.debug(data);
                                    this.SER10A9.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    this._ventanacopagos_SER10A9();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER10A9();
                                });
                        }
                    } else {
                        this._datosimpresion_SER10A9()
                    }
                }
            )
        },
        _ventanacopagos_SER10A9() {
            $_this = this
            var ventanacierre_SER10A9 = bootbox.dialog({
                size: 'medium',
                title: 'LIQUIDACION DE COPAGOS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "% COPAGO:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1VENTANACOPAGO_SER10A9"> ' +
                    '<input id="porcentcopago_SER10A9" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="4"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-12"> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR2VENTANACOPAGO_SER10A9"> ' +
                    '<input id="montocopago_SER10A9" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label">' + "COPAGOS ACUMULADOS :" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<input id="copagoacumulado_SER10A9" class="form-control col-md-12 col-sm-12 col-xs-12"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanacierre_SER10A9.off('show.bs.modal');
                            setTimeout(() => { $_this._datosimpresion_SER10A9() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanacierre_SER10A9.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarfacturaoriginal_SER10A9() }, 500)

                        }
                    }
                }
            });
            ventanacierre_SER10A9.init($('.modal-footer').hide());
            ventanacierre_SER10A9.init(this._evaluarporcentcopago_SER10A9());
            ventanacierre_SER10A9.on('shown.bs.modal', function () {
                $("#porcentcopago_SER10A9").focus();
            });
        },
        _evaluarporcentcopago_SER10A9() {
            _inputControl('disabled');
            this.SER10A9.COPAGOESTW = this.SER10A9.NUMERACION.COPAGO_NUM;
            this.SER10A9.PORCECOPAGOW = this.SER10A9.NUMERACION.PORCECOPAGO_NUM;
            $('#porcentcopago_SER10A9').val(this.SER10A9.PORCECOPAGOW.trim());
            $('#copagoacumulado_SER10A9').val(this.SER10A9.COPAGOSACUMW);
            validarInputs({
                form: '#VALIDAR1VENTANACOPAGO_SER10A9',
                orden: '1',
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER10A9.PORCECOPAGOW = porcentcopagoMask_SER10A9($('#porcentcopago_SER10A9').val().replace(',', '.'));
                    if (parseInt(this.SER10A9.PORCECOPAGOW) == 0) {
                        this.SER10A9.COPAGOESTW = 0
                        this._validarcopago_SER10A9();
                    } else if (parseInt(this.SER10A9.PORCECOPAGOW) > 100) {
                        CON851('', 'Revise el valor del porcentaje', this._evaluarporcentcopago_SER10A9(), 'error', 'Error');
                    } else {
                        if (parseFloat(this.SER10A9.PORCECOPAGOW) == 9) {
                            this._evaluarcopagoest_SER10A9();
                        } else {
                            this.SER10A9.COPAGOESTW = parseInt((this.SER10A9.TOTBASECOPAGO * this.SER10A9.PORCECOPAGOW) / 100)
                            this._validarcopago_SER10A9();
                        }
                    }
                }
            )
        },
        _evaluarcopagoest_SER10A9() {
            validarInputs({
                form: '#VALIDAR2VENTANACOPAGO_SER10A9',
                orden: '1',
            },
                this._evaluarporcentcopago_SER10A9,
                () => {
                    this.SER10A9.COPAGOESTW = $('#montocopago_SER10A9').val();
                    if (isNumeric(this.SER10A9.COPAGOESTW)) {
                        this._validarcopago_SER10A9();
                    } else {
                        CON851('', 'Revise el valor digitado', this._evaluarcopagoest_SER10A9(), 'error', 'Error');
                    }
                }
            )
        },
        _validarcopago_SER10A9() {
            if (this.SER10A9.NUMERACION.ESTRATO_PACI != '1' && this.SER10A9.NUMERACION.ESTRATO_PACI != '2' && this.NUMERACION.ESTRATO_PACI != '3') {
                this.SER10A9.NUMERACION.ESTRATO_PACI = '3'
            }
            switch (this.SER10A9.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER10A9.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER10A9.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER10A9.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 115) / 100
                            break;
                        case '3':
                            this.SER10A9.COPALIQMESW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER10A9.COPALIQMESW = (this.SER10A9.TOTBASECOPAGO * 10) / 100
                    break;
            }
            switch (this.SER10A9.NUMERACION.TIPOPACI_NUM) {
                case 'C':
                    switch (this.SER10A9.NUMERACION.ESTRATO_PACI) {
                        case '1':
                            this.SER10A9.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 57.5) / 100
                            break;
                        case '2':
                            this.SER10A9.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 230) / 100
                            break;
                        case '3':
                            this.SER10A9.COPALIQANOW = (parseFloat($_USUA_GLOBAL[0].SAL_MIN) * 460) / 100
                            break;
                    }
                    break;
                case 'S':
                    this.SER10A9.COPALIQANOW = parseFloat($_USUA_GLOBAL[0].SAL_MIN) / 2
                    if (this.SER10A9.COPALIQMESW > this.SER10A9.COPALIQANOW) {
                        this.SER10A9.COPALIQMESW = this.SER10A9.COPALIQANOW;
                    }
                    break;
            }
            if (this.SER10A9.COPAGOESTW != this.SER10A9.NUMERACION.COPAGO_NUM || this.SER10A9.PORCECOPAGOW != this.SER10A9.NUMERACION.PORCECOPAGO_NUM) {
                postData({
                    datosh: datosEnvio() + this.SER10A9.LLAVEW + '|' + this.SER10A9.PORCECOPAGOW.replace('.', '').padStart(4, '0') + '|' + this.SER10A9.COPAGOESTW + '|'
                }, get_url("APP/SALUD/SER109A.DLL"))
                    .then((data) => {
                        console.debug(data);
                        this.SER10A9.NUMERACION.COPAGO_NUM = this.SER10A9.COPAGOESTW;
                        this.SER10A9.NUMERACION.PORCECOPAGO_NUM = this.SER10A9.PORCECOPAGOW;
                        $('.btn-primary').click()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                $('.btn-primary').click()
            }
        },

        _evaluarimprimirvacia_SER10A9() {
            validarInputs({
                form: '#VALIDAR4_SER10A9',
                orden: '1'
            },
                () => { this._evaluarlistarmedico_SER10A9() },
                () => {
                    if (facturavaciaMask_SER10A9.value.trim() == '') facturavaciaMask_SER10A9.typedValue = 'N'
                    if (facturavaciaMask_SER10A9 == 'S') {
                        this._datosimpresion_SER10A9()
                    } else {
                        _toggleNav()
                    }

                }
            )
        },
        //////////////////////IMPRESION//////////////
        _datosimpresion_SER10A9() {
            console.log('impresion')
            let impresion_SER10A9 = new Object;
            impresion_SER10A9.FORMATOTABLA = 1;
            // impresion_SER10A9.TARIF = 1;
            impresion_SER10A9.OBSERVACION = 2;
            impresion_SER10A9.ANEXO = 2;
            impresion_SER10A9.FIRMA = 1;
            impresion_SER10A9.MARGIN = [10, 160, 10, 20];
            impresion_SER10A9.WIDTH = ['5%', '8%', '17%',  '4%', '25%', '3%', '4%', '7%', '8%', '8%'];
            impresion_SER10A9.COLUMNAS = ["CODIGO", "FECHA", "NOMBRE", "EDAD", "SEXO", "CONCEPTO", "CANT", "VALOR", "COPAGO", "AUTOR"];
            if (listarmedicoMask_SER10A9.value == 'S') {
                impresion_SER10A9.estilohoja = 2, impresion_SER10A9.FORMATOTABLA = 5
                impresion_SER10A9.WIDTH = ['5%', '6%', '17%', '4%', '4%', '20%', '5%', '7%', '5%', '5%','5%', '5%','11%'];
                impresion_SER10A9.COLUMNAS = ["CODIGO", "FECHA", "NOMBRE", "EDAD", "SEXO", "CONCEPTO", "CANT", "VALOR", "UNSERV", "CUM", "AUTOR", "COPAGO", "NOMBRE_MED"];
            }
            if (facturaoriginalMask_SER10A9.value.trim() == 'S') impresion_SER10A9.ORIGINAL = '***ORIGINAL***'
            else impresion_SER10A9.ORIGINAL = '***COPIA***'
            impresion_SER10A9.FECHAVENCE = moment(this.SER10A9.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
            impresion_SER10A9.FECHA = moment(this.SER10A9.FECHA).format('MMMM DD YYYY').toUpperCase();
            impresion_SER10A9.FECHAVENCE = moment(this.SER10A9.FECHA).add(1, 'months').format('MMMM DD YYYY').toUpperCase();
            impresion_SER10A9.FECHA = moment(this.SER10A9.FECHA).format('MMMM DD YYYY').toUpperCase();
            impresion_SER10A9.LLAVE = this.SER10A9.LLAVEW;
            impresion_SER10A9.NOMTER = this.SER10A9.NUMERACION.DESCRIP_TER;
            impresion_SER10A9.NITTER = this.SER10A9.NUMERACION.NIT_TER;
            impresion_SER10A9.DVTER = this.SER10A9.NUMERACION.DV_TER;
            impresion_SER10A9.DIRECCTER = this.SER10A9.NUMERACION.DIRECC_TER;
            impresion_SER10A9.TELTER = this.SER10A9.NUMERACION.TEL_TER;
            impresion_SER10A9.CIUDADTER = this.SER10A9.NUMERACION.CIUDAD_TER;
            impresion_SER10A9.DESCRIPTAR = this.SER10A9.NUMERACION.CONVENIO_NUM;
            impresion_SER10A9.FACTURAS = SER10A9.FACTURA;
            impresion_SER10A9.TABLARBOS_NUM = this.SER10A9.NUMERACION.TABLARBOS_NUM.filter(x => parseInt(x.VLRABON_NUM) > 0);
            impresion_SER10A9.OBSERVNUM = this.SER10A9.NUMERACION.OBSERV_NUM;
            impresion_SER10A9.ANEXOSNUM = this.SER10A9.NUMERACION.ANEXOS_NUM;
            impresion_SER10A9.OPERBLOQNUM = this.SER10A9.NUMERACION.OPERBLOQ_NUM;
            impresion_SER10A9.OPERNUM = this.SER10A9.NUMERACION.OPER_NUM;
            impresion_SER10A9.ADMINW = localStorage.getItem('Usuario');
            impresion_SER10A9.IDPACNUM = this.SER10A9.NUMERACION.IDPAC_NUM;
            impresion_SER10A9.NOMBREPACNUM = this.SER10A9.NUMERACION.NOMBREPAC_NUM;
            if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                    impresion_SER10A9.IVA = 'IVA Regimen Comun - Retenedor Iva'
                } else {
                    impresion_SER10A9.IVA = 'IVA Regimen Comun'
                }
            } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                    impresion_SER10A9.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                } else {
                    impresion_SER10A9.IVA = 'IVA Regimen Simplificado'
                }
            } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
                impresion_SER10A9.IVA = 'No somos responsables de IVA'
            } else {
                impresion_SER10A9.IVA = '';
            }
            let prefijo = this.SER10A9.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == this.SER10A9.PREFIJOW)
            if (prefijo.length == 0) {
                prefijo[0] = new Object;
                prefijo[0].AUT_DIAN = '';
                prefijo[0].PREFIJO = $_PREFIJOFACT;
                prefijo[0].DESDE_NRO = '';
                prefijo[0].HASTA_NRO = '';
            }
            var vlr = 0;
            for (var i in SER10A9.FACTURA) {
                vlr = vlr + parseInt(SER10A9.FACTURA[i].VALOR.replace(/,/g, ''));
            }
            var abono = 0;
            for (var i in this.SER10A9.NUMERACION.TABLARBOS_NUM) {
                if (this.SER10A9.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM != '') {
                    abono = parseInt(this.SER10A9.NUMERACION.TABLARBOS_NUM[i].VLRABON_NUM.replace(/,/g, '')) + abono;
                }
            }
            var saldocopago = 0;
            if ($_USUA_GLOBAL[0] == 891855847) {
                saldocopago = 0;
            } else if (($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') && (parseInt(this.SER10A9.NUMERACION.NIT_NUM) == 9990 || parseInt(this.SER10A9.NUMERACION.NIT_NUM) == 9999) && (parseInt(this.SER10A9.NUMERACION.FECHA_ING) > 20070930)) {
                saldocopago = parseInt(this.SER10A9.NUMERACION.COPAGO_NUM) + abono
            } else {
                if (abono != 0) {
                    saldocopago = 0
                } else {
                    saldocopago = parseInt(this.SER10A9.NUMERACION.COPAGO_NUM);
                }
            }
            let neto = vlr - saldocopago;
            impresion_SER10A9.VLRTOTAL = vlr;
            impresion_SER10A9.SALDOCOPAGO = saldocopago;
            impresion_SER10A9.SALDO = neto;
            impresion_SER10A9.PREFIJO = prefijo;
            impresion_SER10A9.COPAGONUM = parseInt(this.SER10A9.NUMERACION.COPAGO_NUM)
            impresion_SER10A9.IMPRESION = 'SER109N';
            let valorenletras = FAC146(impresion_SER10A9.VLRTOTAL);
            impresion_SER10A9.NUMEROENLETRAS = 'SON: ' + valorenletras;
            if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133 || $_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900161116 || $_USUA_GLOBAL[0].NIT == 900424844 || $_USUA_GLOBAL[0].NIT == 900870633) {
                impresion_SER10A9.FIRMA1 = localStorage.getItem('IDUSU')
            } else {
                impresion_SER10A9.FIRMA1 = this.SER10A9.FIRMAS[0].DATOS_GER.substring(0, 10)
            }
            _impresionformatoSER109(impresion_SER10A9, this._cerrarnumeracion_SER10A9, this._evaluarfacturaoriginal_SER10A9)


        },
        ////////////////CERRARFACT//////////////////
        _cerrarnumeracion_SER10A9() {
            console.log('cerrarnumeracion');
            if (this.SER10A9.estadofactura_SER10A9 == '0' || this.SER10A9.estadofactura_SER10A9 == '3') {
                if (this.SER10A9.PREFIJOW == 'A' || this.SER10A9.PREFIJOW == 'B' || this.SER10A9.PREFIJOW == 'D' || this.SER10A9.PREFIJOW == 'F' || this.SER10A9.PREFIJOW == 'G' ||
                    this.SER10A9.PREFIJOW == 'H' || this.SER10A9.PREFIJOW == 'I' || this.SER10A9.PREFIJOW == 'J' || this.SER10A9.PREFIJOW == 'K') {
                    if (this.SER10A9.FECHALNK.substring(0, 4) == this.SER10A9.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER10A9.FECHALNK.substring(4, 6) == this.SER10A9.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        this._cerrarnumeracion2_SER10A9();
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    this._cerrarnumeracion2_SER10A9();
                }
            } else {
                _toggleNav();
            }
        },
        _cerrarnumeracion2_SER10A9() {
            let URL = get_url("APP/SALUD/SAL020I.DLL");
            postData({
                datosh: datosEnvio() + SER10A9.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    this.SER10A9.FECHAULTIMAFACT = data.FECHAULTIMAFACT
                    this.SER10A9.FECHAULTIMAFACT.pop();
                    this.SER10A9.FECHALIMI = '00000000';
                    if (this.SER10A9.FECHAULTIMAFACT != '') { this.SER10A9.FECHALIMI = this.SER10A9.FECHAULTIMAFACT[this.SER10A9.FECHAULTIMAFACT.length - 1] };
                    if (parseInt(this.SER10A9.FECHALIMI) > parseInt(this.SER10A9.FECHALNK)) {
                        CON851('', 'LA FECHA DEL ULT. COMP > A FECHA DEL MES', null, 'error', 'Error');
                        if (this.SER10A9.PREFIJOW != 'C' && this.SER10A9.PREFIJOW != 'E' && this.SER10A9.PREFIJOW != 'Ñ' && this.SER10A9.PREFIJOW != 'O' && this.SER10A9.PREFIJOW != 'P' && this.SER10A9.PREFIJOW != 'T' && this.SER10A9.PREFIJOW != 'U') {
                            this._ventanacierrefact_SER10A9();
                        } else {
                            _toggleNav();
                        }
                    } else {
                        this._ventanacierrefact_SER10A9();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this._evaluarprefijo_SER10A9();
                })
        },
        _ventanacierrefact_SER10A9() {
            $_this = this
            var ventanacierre = bootbox.dialog({
                size: 'medium',
                title: 'CIERRE DE FACTURAS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Desea cerrar la factura?:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="CERRARFACT_SER10A9"> ' +
                    '<input id="cerrar_SER10A9" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-10 col-sm-6 col-xs-6" id="FECHACIE_SER10A9"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha cierre:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="anocierre_SER10A9" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="mescierre_SER10A9" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="diacierre_SER10A9" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD"> ' +
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
                            setTimeout(() => { $_this._grabarcierre_SER10A9() }, 500)

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
            ventanacierre.init(this._Evaluarcierrefact_SER10A9());
            ventanacierre.on('shown.bs.modal', function () {
                $("#cerrar_SER10A9").focus();
            });
        },
        _Evaluarcierrefact_SER10A9() {
            _inputControl("disabled");
            validarInputs({
                form: '#CERRARFACT_SER10A9',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER10A9.CERRARFACT = $('#cerrar_SER10A9').val().toUpperCase();
                    if ((this.SER10A9.CERRARFACT == 'S') || (this.SER10A9.CERRARFACT == 'N')) {
                        if (this.SER10A9.CERRARFACT == 'N') {
                            $('.btn-danger').click();
                        } else {
                            this._evaluarfechacierre_SER10A9('3');
                        }
                    } else {
                        this._Evaluarcierrefact_SER10A9();
                    }
                }
            )
        },
        _evaluarfechacierre_SER10A9(orden) {
            let fechasistema = moment().format('YYYYMMDD');
            let fechacierre = moment().format('YYYYMMDD');
            this.SER10A9.HORARETNUM = moment().format('HHmm');
            $('#anocierre_SER10A9').val(fechacierre.substring(0, 4));
            $('#mescierre_SER10A9').val(fechacierre.substring(4, 6));
            this.SER10A9.ANORET = $('#anocierre_SER10A9').val();
            this.SER10A9.MESRET = $('#mescierre_SER10A9').val();
            $('#diacierre_SER10A9').val(fechacierre.substring(6, 8));
            validarInputs({
                form: '#FECHACIE_SER10A9',
                orden: orden,
            },
                this._Evaluarcierrefact_SER10A9,
                () => {
                    this.SER10A9.DIARET = $('#diacierre_SER10A9').val().padStart(2, '0');
                    this.SER10A9.FECHARETNUM = this.SER10A9.ANORET + this.SER10A9.MESRET + this.SER10A9.DIARET;
                    if ((parseInt(this.SER10A9.DIARET) < 1) || (parseInt(this.SER10A9.DIARET) > parseInt(this.SER10A9.FECHALNK.substring(6, 8))) || parseInt(this.SER10A9.FECHARETNUM) < (this.SER10A9.FECHAING_NUM)) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER10A9').val('N');
                        this._Evaluarcierrefact_SER10A9()
                    } else if (fechasistema > SER10A9.FECHARETNUM) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER10A9').val('N');
                        this._Evaluarcierrefact_SER10A9()
                    } else {
                        $('.btn-primary').click();
                    }
                }
            )
        },
        _grabarcierre_SER10A9() {
            let URL = get_url("APP/SALUD/SER109D.DLL");
            postData({
                datosh: datosEnvio() + '4|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER10A9.LLAVEW + '| | |' + this.form.estadofactura_SER10A9.substring(0, 1) + '| | | | | |' + localStorage.getItem('Usuario').trim() + '| | | |' + SER10A9.FECHARETNUM + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    if (this.SER10A9.PREFIJOW == 'P' || this.SER10A9.PREFIJOW == 'T' || this.SER10A9.PREFIJOW == 'Q' || this.SER10A9.PREFIJOW == 'V') {
                        let URL = get_url("APP/SALUD/SAL020C.DLL");
                        postData({
                            datosh: datosEnvio() + this.SER10A9.LLAVEW + '|' + this.SER10A9.FECHALNK + '|'
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
                            datosh: datosEnvio() + SER10A9.LLAVEW + '|' + SER10A9.FECHALNK + '|'
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
                    this._evaluarprefijo_SER10A9();
                })
        }
    }
})

var prefijoMask_SER10A9 = IMask($('#prefijo_SER10A9')[0], {
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

var listarmedicoMask_SER10A9 = IMask($('#medico_SER10A9')[0], {
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
var facturaoriginalMask_SER10A9 = IMask($('#facturaoriginal_SER10A9')[0], {
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

var facturavaciaMask_SER10A9 = IMask($('#facturavacia_SER10A9')[0], {
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





