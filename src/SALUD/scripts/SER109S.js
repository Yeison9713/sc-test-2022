const moment = require("moment");

new Vue({
    el: '#SER109S',
    data: {
        SER109S: [],
        form: {
            entidad_SER109S: '',
            paciente_SER109S: '',
            estado_SER109S: '',
            pacienteFOSYGA_SER109S: '',
            pacientedFOSYGA_SER109S: '',
            poliza_SER109S: '',
            histclinica_SER109S: '',
        }
    },
    created() {
        nombreOpcion('9,7,4,3,7,1 - Cuenta cobro soat FOSYGA');
        _inputControl("reset");
        _inputControl("disabled");
        loader('show');
        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            $_this.SER109S.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                loader('hide');
                data = data.FIRMAS;
                $_this.SER109S.FIRMAS = data;
                $_this._evaluarprefijo_SER109S();
            })
        })
    },
    methods: {
        _evaluarprefijo_SER109S() {
            validarInputs({
                form: '#VALIDAR1_SER109S',
                orden: '1'
            },
                _toggleNav,
                () => {
                    postData({
                        datosh: datosEnvio() + `9${prefijoMask_SER109S.value.trim()}|`
                    }, get_url("APP/CONTAB/CON007.DLL"))
                        .then(data => {
                            data = data.split('|');
                            let numeroanterior = parseInt(data[1].substring(3, 9)) - 1
                            numeroctaMask_SER109S.typedValue = numeroanterior.toString();
                            this._evaluarnumeroprefijo_SER109S();
                        })
                        .catch(error => {
                            console.error(error);
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER109S() {
            validarInputs({
                form: '#VALIDAR2_SER109S',
                orden: '1',
            },
                this._evaluarprefijo_SER109S,
                () => {
                    loader('show');
                    postData({
                        datosh: datosEnvio() + `1||${prefijoMask_SER109S.value}${numeroctaMask_SER109S.value.trim().padStart(6, '0')}|`
                    }, get_url("APP/SALUD/SER109D.DLL"))
                        .then((data) => {
                            this.SER109S.NUMERACION = data.NUMERACION[0];
                            this.SER109S.FECHARETNUM = this.SER109S.NUMERACION.FECHARET_NUM;
                            this.SER109S.FACTCAPITNUM = this.SER109S.NUMERACION.FACTCAPIT_NUM;
                            this.SER109S.FECHAPRENUM = this.SER109S.NUMERACION.FECHAPRE_NUM.trim();
                            this.SER109S.DIASESTW = this.SER109S.NUMERACION.DIASEST_NUM.trim();
                            this.SER109S.POLIZAW = this.SER109S.NUMERACION.NROPOL_NUM.trim();
                            this.SER109S.NROHISTW = this.SER109S.NUMERACION.NROHIST_NUM.trim();
                            $('#diasestancia_SER109S').val(this.SER109S.DIASESTW);
                            this.form.poliza_SER109S = this.SER109S.POLIZAW.trim();
                            this.form.histclinica_SER109S = this.SER109S.NROHISTW.trim();
                            this.form.entidad_SER109S = this.SER109S.NUMERACION.DESCRIP_NUM.trim();
                            this.form.paciente_SER109S = this.SER109S.NUMERACION.NOMBREPAC_NUM.trim();
                            this.form.pacienteFOSYGA_SER109S = this.SER109S.NUMERACION.IDPAC_NUM.trim()
                            let estado = { '0': 'ACTIVA', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
                            this.form.estado_SER109S = `${this.SER109S.NUMERACION.ESTADO_NUM}  -  ${estado[this.SER109S.NUMERACION.ESTADO_NUM]}`;
                            if (parseInt(this.SER109S.FECHARETNUM) > 0 && this.SER109S.FECHARETNUM.substring(2, 4) == $_USUA_GLOBAL[0].FECHALNK) {
                                CON851('2R', '2R', null, 'error', 'Error');
                                this._evaluarnumeroprefijo_SER109S();
                            } else {
                                postData({
                                    datosh: datosEnvio() + `3||${prefijoMask_SER109S.value}${numeroctaMask_SER109S.value.trim().padStart(6, '0')}|`
                                }, get_url("APP/SALUD/SER109D.DLL"))
                                    .then((data) => {
                                        loader('hide')
                                        this._datopaciente_SER109S();
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        loader('hide')
                                        if (error.MENSAJE == '08') {
                                            this._evaluarprefijo_SER109S();
                                        } else {
                                            _toggleNav();
                                        }
                                    });
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            if (error.MENSAJE == '01') {
                                this._evaluarnumeroprefijo_SER109S('1');
                            } else {
                                _toggleNav();
                            }
                        });
                }
            )
        },
        _datopaciente_SER109S() {
            validarInputs({
                form: '#VALIDAR3_SER109S',
                orden: '1',
            },
                this._evaluarnumeroprefijo_SER109S,
                () => {
                    medicocodigoMask_SER109S.typedValue = 'N';
                    if ($.isNumeric(this.form.pacienteFOSYGA_SER109S)) {
                        if (this.form.pacienteFOSYGA_SER109S == '99') {
                            this.form.pacientedFOSYGA_SER109S = 'PROCESO TOTAL' ;
                            _ImpresionesActualizarCopagos({ LLAVENUM: prefijoMask_SER109S.value + numeroctaMask_SER109S.value.trim().padStart(6, '0') }, () => { this._evaluardatosimpresion_SER109S('1') }, this._datopaciente_SER109S);
                        } else {
                            postData(
                                {
                                    datosh: datosEnvio() + this.form.pacienteFOSYGA_SER109S.trim().padStart(15,'0') + "|",
                                },
                                get_url("APP/SALUD/SER810-1.DLL"),
                            )
                                .then(data => {
                                    this.SER109S.PACIENTE = data["REG-PACI"];
                                    this.form.pacientedFOSYGA_SER109S = this.SER109S.PACIENTE[0].DESCRIP;
                                    _ImpresionesActualizarCopagos({ LLAVENUM: prefijoMask_SER109S.value + numeroctaMask_SER109S.value.trim().padStart(6, '0') }, () => { this._evaluardatosimpresion_SER109S('1') }, this._datopaciente_SER109S);
                                })
                                .catch(err => {
                                    console.error(err);
                                    this._datopaciente_SER109S();
                                });
                        }
                    } else {
                        this._datopaciente_SER109S();
                    }
                }
            )
        },
        _evaluardatosimpresion_SER109S(orden) {
            originalMask_SER109S.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR4_SER109S',
                orden: orden,
            },
                this._datopaciente_SER109S,
                () => {
                    this.SER109S.DIASESTW = $('#diasestancia_SER109S').val().padStart(3, '0');
                    this.SER109S.ACU51W = medicocodigoMask_SER109S.value;
                    if (this.SER109S.NUMERACION.DIASEST_NUM.trim() != this.SER109S.DIASESTW || this.SER109S.NUMERACION.NROPOL_NUM.trim() != this.form.poliza_SER109S.trim() || this.SER109S.NUMERACION.NROHIST_NUM.trim() != this.form.histclinica_SER109S.trim()) {
                        let URL = get_url("APP/SALUD/SER109D.DLL");
                        postData({
                            datosh: datosEnvio() + '5||' + prefijoMask_SER109S.value + numeroctaMask_SER109S.value.trim().padStart(6, '0') + '||||||||||' + this.SER109S.DIASESTW + '|' + this.form.poliza_SER109S.trim() + '|' + this.form.histclinica_SER109S.trim() + '|'
                        }, URL)
                            .then((data) => {
                                this._evaluarfacturaoriginal_SER109S();
                            })
                            .catch((err) => {
                                console.error(err);
                                this._evaluardatosimpresion_SER109S('3');
                            });
                    } else {
                        this._evaluarfacturaoriginal_SER109S();
                    }
                }
            )
        },
        _evaluarfacturaoriginal_SER109S() {
            validarInputs({
                form: '#VALIDAR5_SER109S',
                orden: '1',
            },
                () => { this._evaluardatosimpresion_SER109S('4') },
                () => {
                    this.SER109S.SWORIGINAL = originalMask_SER109S.value;
                    postData({
                        datosh: datosEnvio() +  `${prefijoMask_SER109S.value + numeroctaMask_SER109S.value.trim().padStart(6, '0')}|${this.form.pacienteFOSYGA_SER109S.padStart(15,'0')}|`
                    }, get_url("APP/SALUD/SER109S.DLL"))
                        .then((data) => {
                            data.FACTURA.pop();
                            if (data.FACTURA.length == 0) {
                                CON851('','No hay facturas con ese paciente', this._datopaciente_SER109S(),'error','Error')
                            }  else {
                                let impresion_SER109S = new Object;
                                impresion_SER109S.NROFACTURA = numeroctaMask_SER109S.value.trim();
                                if (originalMask_SER109S.value.trim() == 'S') impresion_SER109S.ORIGINAL = 'ORIGINAL'
                                else impresion_SER109S.ORIGINAL = 'COPIA'
                                impresion_SER109S.NOMBREENTIDAD = this.SER109S.NUMERACION.DESCRIP_NUM;
                                impresion_SER109S.NITENTIDAD = this.SER109S.NUMERACION.NIT_NUM;
                                impresion_SER109S.DVENTIDAD = this.SER109S.NUMERACION.DV_TER;
                                impresion_SER109S.POLIZA = this.form.poliza_SER109S.trim();
                                impresion_SER109S.DEBEA = $_USUA_GLOBAL[0].NOMBRE;
                                impresion_SER109S.NITDEBE = $_USUA_GLOBAL[0].NIT;
                                impresion_SER109S.DIRECCIONDEBE = $_USUA_GLOBAL[0].DIRECC;
                                impresion_SER109S.CIUDADDEBE = $_USUA_GLOBAL[0].NOMBRE_CIU;;
                                let valortotal = 0;
                                for (var i in data.FACTURA) {
                                    valortotal = valortotal + parseFloat(data.FACTURA[i].VALOR);
                                }
                                impresion_SER109S.VALORENLETRAS = FAC146(valortotal)
                                impresion_SER109S.VALOR = numeroencomas(valortotal);
                                impresion_SER109S.TOTALFACT = numeroencomas(valortotal);

                                impresion_SER109S.NOMBREPACIENTE = this.SER109S.NUMERACION.NOMBREPAC_NUM;
                                impresion_SER109S.IDPACIENTE = numeroencomas(parseInt(this.SER109S.NUMERACION.IDPAC_NUM));
                                impresion_SER109S.HISTORIA = this.form.histclinica_SER109S.trim();
                                impresion_SER109S.AÑOINGRESO = this.SER109S.NUMERACION.FECHAING_NUM.substring(0,4);
                                impresion_SER109S.MESINGRESO = this.SER109S.NUMERACION.FECHAING_NUM.substring(4,6);
                                impresion_SER109S.DIAINGRESO = this.SER109S.NUMERACION.FECHAING_NUM.substring(6,8);

                                impresion_SER109S.DIASESTANCIA = this.SER109S.DIASESTW;

                                impresion_SER109S.AÑORETIRO = this.SER109S.NUMERACION.FECHARET_NUM.substring(0,4);
                                impresion_SER109S.MESRETIRO = this.SER109S.NUMERACION.FECHARET_NUM.substring(4,6);
                                impresion_SER109S.DIARETIRO = this.SER109S.NUMERACION.FECHARET_NUM.substring(6,8);

                                if (this.SER109S.NUMERACION.FECHAPRE_NUM == '00000000'){
                                    impresion_SER109S.FECHAENTREGA = ' ';
                                } else {
                                    impresion_SER109S.FECHAENTREGA = moment(this.SER109S.NUMERACION.FECHAPRE_NUM).format('MMMM DD YYYY').toUpperCase();
                                }

                                let prefijo = this.SER109S.PREFIJOS[0].TABLA.filter(x => x.PREFIJO.trim() == prefijoMask_SER109S.value.trim())
                                if (prefijo.length == 0) {
                                    prefijo[0] = new Object;
                                    prefijo[0].AUT_DIAN = '';
                                    prefijo[0].PREFIJO = prefijoMask_SER109S.value.trim();
                                    prefijo[0].DESDE_NRO = '';
                                    prefijo[0].HASTA_NRO = '';
                                }
                                impresion_SER109S.PREFIJO = prefijo
                                
                                impresion_SER109S.RESOLDIANUSU = $_USUA_GLOBAL[0].RESOL_DIAN;

                                if ($_USUA_GLOBAL[0].IVA_S == 'C'){
                                    if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                                        impresion_SER109S.IVA = 'IVA Regimen Comun - Retenedor Iva'
                                    } else {
                                        impresion_SER109S.IVA = 'IVA Regimen Comun'
                                    }
                                } else if ($_USUA_GLOBAL[0].IVA_S == 'C'){
                                    if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                                        impresion_SER109S.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA'
                                    } else {
                                        impresion_SER109S.IVA = 'IVA Regimen Simplificado'
                                    }
                                } else if ($_USUA_GLOBAL[0].IVA_S == 'N'){
                                    impresion_SER109S.IVA = 'No somos responsables de IVA'
                                } else {
                                    impresion_SER109S.IVA = '';
                                }

                                impresion_SER109S.OPERNUM = this.SER109S.NUMERACION.OPER_NUM;
                                impresion_SER109S.OPERMODNUM = this.SER109S.NUMERACION.OPERMOD_NUM;
                                impresion_SER109S.OPERBLOQNUM = this.SER109S.NUMERACION.OPERBLOQ_NUM;
                                impresion_SER109S.ADMINW = localStorage.getItem('Usuario').trim();
                                impresion_SER109S.FECHAIMPRESION = moment().format('YYMMDD');
                                impresion_SER109S.FECHAOPER = moment(this.SER109S.NUMERACION.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
                                if (impresion_SER109S.FECHAOPER == 'Invalid date') impresion_SER109S.FECHAOPER = '000000'
                                impresion_SER109S.FECHAMODOPER = moment(this.SER109S.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
                                if (impresion_SER109S.FECHAMODOPER == 'Invalid date') impresion_SER109S.FECHAMODOPER = '000000'
                                impresion_SER109S.FECHARETOPER = moment(this.SER109S.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
                                if (impresion_SER109S.FECHARETOPER == 'Invalid date') impresion_SER109S.FECHARETOPER = '000000'
                                impresion_SER109S.TABLA = data.FACTURA;
                                if(prefijoMask_SER109S.value = 'T'){
                                    impresion_SER109S.COLUMNAS = ['NRO_COMP', 'SOAT', 'DETALLE', 'CANT', 'VALOR_UNIT', 'VALOR'];
                                }else{
                                    impresion_SER109S.COLUMNAS = ['NRO_COMP', 'ART', 'DETALLE', 'CANT', 'VALOR_UNIT', 'VALOR'];
                                }
                                impresion_SER109S.WIDTH = [ '13%', '15%', '33%', '10%', '15%', '10%' ];
                                impresion_SER109S.MARGIN = [ 10, 40, 10, 20 ];
                                _impresionformatoSER109T(impresion_SER109S, _toggleNav, this._evaluarfacturaoriginal_SER109S);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            this._evaluarfacturaoriginal_SER109S();
                        });
                }
            )
        },
        _ventanaPacientes_SER109S(e) {
            if (e.which == 119 || e.type == 'click') {
                parametros = {
                    dll: 'PACIENTES',
                    valoresselect: ['Nombre del paciente'],
                    f8data: 'PACIENTES',
                    columnas: [{
                        title: 'COD'
                    }, {
                        title: 'NOMBRE'
                    }, {
                        title: 'EPS'
                    }, {
                        title: 'EDAD'
                    }],
                    callback: data => {
                        this.form.pacienteFOSYGA_SER109S = data.COD;
                        _enterInput('.pacienteFOSYGA_SER109S');
                    },
                    cancel: () => {
                        $('.pacienteFOSYGA_SER109S').focus();
                    }
                };
                F8LITE(parametros);
            }
        }
    }
})

//////////////////////////////////// MASCARAS ///////////////////////////////////////////////////////
var prefijoMask_SER109S = IMask($('#prefijo_SER109S')[0], {
    mask: 'a',
    definitions: {
        'a': /[APTBDFGHIJKLMNOQRSVWXYZ]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var medicocodigoMask_SER109S = IMask($('#mediccodigo_SER109S')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var originalMask_SER109S = IMask($('#original_SER109S')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        return str.toUpperCase()
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var numeroctaMask_SER109S = new IMask($('#numeroprefijo_SER109S')[0], { mask: Number });
/////////////////////////////////////////////////////////////////////////////////////////////////////