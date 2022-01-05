new Vue({
    el: '#SER515D',
    data: {
        form: {
            novedad_SER515D: '',
            fecha_SER515D: '',
            hora_SER515D: '',
            remite_SER515D: '',
            remited_SER515D: '',
            concepto_SER515D: '',
            conceptod_SER515D: '',
            descripcionevento_SER4C2: '',
            prefijofactura_SER515D: '',
            numerofactura_SER515D: '',
            vlrfactura_SER515D: '',
            añofactura_SER515D: '',
            mesfactura_SER515D: '',
            diafactura_SER515D: '',
            añoentrega_SER515D: '',
            mesentrega_SER515D: '',
            diaentrega_SER515D: '',
            persona_SER515D: '',
        },
        SER515D: [],
    },
    created() {
        _toggleNav();
        _inputControl('disabled');
        let active = $('#navegacion').find('li.opcion-menu.active');
        this.SER515D.OPCIONACTIVA = active[0].attributes[2].nodeValue;
        let NombreOpcion = {
            '097AJ1': '9,7,A,J,1 - Devolucion de factura',
            '097AJ2': '9,7,A,J,2 - Reimprimir una devolución'
        }
        nombreOpcion(NombreOpcion[this.SER515D.OPCIONACTIVA]);
        if (this.SER515D.OPCIONACTIVA == '097AJ2') {
            this.form.novedad_SER515D = '8 - Cambio';
            return this._evaluardevolcion_SER515D()
        }
        if (moment().format('YYYY') == `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}` || `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}` == parseInt(moment().format('YYYY') - 1).toString()) {
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER515D.FIRMAS = data;
            })
            return CON850(this._evaluarCON850_SER515D);
        }

        CON851('91', '91', null, 'error', 'Error')
        _toggleNav();
    },
    methods: {
        _evaluarCON850_SER515D(data) {
            this.form.novedad_SER515D = `${data.id} - ${data.descripcion}`;
            if (
                this.form.novedad_SER515D.substring(0, 1) == '7' ||
                this.form.novedad_SER515D.substring(0, 1) == '8' ||
                this.form.novedad_SER515D.substring(0, 1) == '9'
            ) {
                this.form.fecha_SER515D = moment().format('YYYY/MM/DD');
                this.form.hora_SER515D = moment().format('HH:mm');
                this.SER515D.OPERMOD = this.SER515D.FECHAMOD = '';
                // CONSULTAR CONSECUTIVO
                if (data.id == '7') {
                    this.SER515D.OPERCRE = localStorage.Usuario
                    postData(
                        {
                            datosh: datosEnvio(),
                            paso: '1'
                        },
                        get_url("APP/SALUD/SER515D.DLL")
                    )
                        .then(data => {
                            numerodevolucionMask_SER515D.typedValue = data.NRO;
                            return this._evaluardevolcion_SER515D();
                        })
                        .catch(error => {
                            console.error(error);
                            return setTimeout(() => CON850(this._evaluarCON850_SER515D), 300)
                        })
                }
                if (data.id == '8' || data.id == '9') {
                    postData(
                        {
                            datosh: datosEnvio(),
                            paso: '2'
                        },
                        get_url("APP/SALUD/SER515D.DLL")
                    )
                        .then(data => {
                            numerodevolucionMask_SER515D.typedValue = data.NRO;
                            return this._evaluardevolcion_SER515D();
                        })
                        .catch(error => {
                            console.error(error);
                            return setTimeout(() => CON850(this._evaluarCON850_SER515D), 300)
                        })
                }

            } else {
                _toggleNav();
            }
        },
        _evaluardevolcion_SER515D() {
            validarInputs(
                {
                    form: '#VALIDAR1_SER515D',
                    orden: '1'
                },
                () => {
                    CON850(this._evaluarCON850_SER515D);
                },
                () => {
                    if (numerodevolucionMask_SER515D.value == 0) {
                        CON851('03', '03', null, 'error', 'Error');
                        return this._evaluardevolcion_SER515D();
                    }

                    postData(
                        {
                            datosh: datosEnvio(),
                            llave: numerodevolucionMask_SER515D.value.padStart(6, '0')
                        },
                        get_url("APP/SALUD/SER515A.DLL")
                    )
                        .then(data => {
                            if (this.form.novedad_SER515D.substring(0, 1) == '7') {
                                CON851('00', '00', null, 'error', 'Error');
                                return this._evaluardevolcion_SER515D();
                            }
                            this.form.fecha_SER515D = data.FECHA_DEVOLUCION
                            this.form.hora_SER515D = data.HORA_DEVOLUCION
                            this.form.remite_SER515D = data.REMITE
                            this.form.remited_SER515D = data.DESCRIPCION_REMITE
                            this.form.concepto_SER515D = data.CONCEPTO
                            this.form.conceptod_SER515D = data.DESCRIPCION_CONCEPTO
                            this.form.descripcionevento_SER4C2 = data.DESCRIPCION.replace(/&/g, '\n')
                            this.form.prefijofactura_SER515D = data.FACTURA.substring(0, 1)
                            numerofacturaMask_SER515D.typedValue = parseInt(data.FACTURA.substring(1, 7))
                            vlrfacturaMask_SER515D.typedValue = data.VALOR
                            this.form.añofactura_SER515D = data.FECHA_FACTURA.substring(0, 4)
                            this.form.mesfactura_SER515D = data.FECHA_FACTURA.substring(4, 6)
                            this.form.diafactura_SER515D = data.FECHA_FACTURA.substring(6, 8)
                            añoentregaMask_SER515D.typedValue = data.FECHA_ENTREGA.substring(0, 4)
                            mesentregaMask_SER515D.typedValue = data.FECHA_ENTREGA.substring(4, 6)
                            diaentregaMask_SER515D.typedValue = data.FECHA_ENTREGA.substring(6, 8)
                            this.form.persona_SER515D = data.PERSONA;
                            this.SER515D.OPERCRE = data.OPERADOR_CREO
                            this.SER515D.OPERMOD = localStorage.Usuario
                            this.SER515D.FECHAMOD = moment().format('YYYYMMDD');
                            if (this.SER515D.OPCIONACTIVA == '097AJ2') {
                                return this._impresion_SER515D()
                            }
                            this._evaluarnit_SER515D();
                        })
                        .catch(error => {
                            console.error(error);
                            if (error.MENSAJE == '01') {
                                if (this.form.novedad_SER515D.substring(0, 1) == '7') {
                                    return this._evaluarnit_SER515D();
                                }
                            }

                            this._evaluardevolcion_SER515D();
                        })

                }
            )
        },
        _evaluarnit_SER515D() {
            validarInputs(
                {
                    form: '#VALIDAR2_SER515D',
                    orden: '1'
                },
                this._evaluardevolcion_SER515D,
                () => {
                    postData(
                        {
                            datosh: datosEnvio(),
                            tercero: this.form.remite_SER515D.padStart(10, '0')
                        },
                        get_url("APP/CONTAB/CON802.DLL")
                    )
                        .then(data => {
                            this.SER515D.TERCERO = data;
                            this.form.remited_SER515D = data.NOMBRE;
                            this._evaluarconcepto_SER515D();
                        })
                        .catch(error => {
                            console.error(error);
                            this._evaluarnit_SER515D();
                        })
                }
            )
        },
        _evaluarconcepto_SER515D() {
            validarInputs(
                {
                    form: '#VALIDAR3_SER515D',
                    orden: '1'
                },
                this._evaluarnit_SER515D,
                () => {
                    postData(
                        {
                            datosh: datosEnvio(),
                            motivo: this.form.concepto_SER515D
                        },
                        get_url("APP/SALUD/SER-A81.DLL")
                    )
                        .then(data => {
                            this.SER515D.MOTIVO = data;
                            this.form.conceptod_SER515D = data.NOMBRE;
                            this._evaluardescripcion_SER515D();
                        })
                        .catch(error => {
                            console.error(error);
                            this._evaluarconcepto_SER515D();
                        })
                }
            )
        },
        _evaluardescripcion_SER515D() {
            validarInputs(
                {
                    form: '#VALIDAR4_SER515D',
                    orden: '1'
                },
                this._evaluarconcepto_SER515D,
                this._evaluarprefijofactura_SER515D
            )
        },
        _evaluarprefijofactura_SER515D() {
            if (this.form.prefijofactura_SER515D.trim() == '') this.form.prefijofactura_SER515D = 'A'
            validarInputs(
                {
                    form: '#VALIDAR5_SER515D',
                    orden: '1'
                },
                this._evaluardescripcion_SER515D,
                () => {
                    this.form.prefijofactura_SER515D = this.form.prefijofactura_SER515D.toUpperCase();
                    console.log(this.form.prefijofactura_SER515D);
                    if (this.form.prefijofactura_SER515D.trim() == '') {
                        CON851('03', '03', null, 'error', 'Error');
                        return this._evaluarprefijofactura_SER515D();
                    }
                    if (this.form.prefijofactura_SER515D == 'C' || this.form.prefijofactura_SER515D == 'E' || this.form.prefijofactura_SER515D == 'Ñ') {
                        CON851('03', '03', null, 'error', 'Error');
                        return this._evaluarprefijofactura_SER515D();
                    }
                    this._evaluarnumerofactura_SER515D();
                }
            )
        },
        _evaluarnumerofactura_SER515D() {
            validarInputs(
                {
                    form: '#VALIDAR6_SER515D',
                    orden: '1'
                },
                this._evaluarprefijofactura_SER515D,
                () => {
                    postData(
                        {
                            datosh: datosEnvio() + `${this.form.prefijofactura_SER515D}${numerofacturaMask_SER515D.value.padStart(6, '0')}|8|`,
                        },
                        get_url("APP/SALUD/SER808-01.DLL")
                    )
                        .then(data => {
                            this.form.añofactura_SER515D = data.NUMER19[0].FECHA_ING.substring(0, 4);
                            this.form.mesfactura_SER515D = data.NUMER19[0].FECHA_ING.substring(4, 6);
                            this.form.diafactura_SER515D = data.NUMER19[0].FECHA_ING.substring(6, 8);
                            this.form.persona_SER515D = data.NUMER19[0].DESCRIP_NUM;
                            if (data.NUMER19[0].NIT_NUM != this.form.remite_SER515D.padStart(10,'0')) {
                                CON851('','Entidad diferente a la factura',null,'error','Error')
                                return this._evaluarnumerofactura_SER515D()
                            }
                            let fact = data.NUMER19[0].TABLA_FACT.filter(x => parseInt(x.VLR_FACT) > 0);
                            this.tablafact_SER515D = fact;
                            let totalfact = 0;
                            for (var i in this.tablafact_SER515D) {
                                if (parseInt(this.tablafact_SER515D[i].VLR_FACT) > 0) {
                                    totalfact = totalfact + parseInt(this.tablafact_SER515D[i].VLR_FACT);
                                }
                            }
                            this.SER515D.VLRABONOW = data.NUMER19[0].VLRTOTALABON.padStart(16, '0')
                            let abono = this.SER515D.VLRABONOW.indexOf('-');
                            if (abono >= 0) this.SER515D.VLRABONOW = parseInt(this.SER515D.VLRABONOW) * -1
                            vlrfacturaMask_SER515D.typedValue = totalfact + parseInt(this.SER515D.VLRABONOW) - parseInt(data.NUMER19[0].COPAGOS_NUM) - parseFloat(data.NUMER19[0].COPAGOEST_NUM);
                            this._evaluarvlrfactura_SER515D();
                        })
                        .catch(err => {
                            console.error(err);
                            this._evaluarnumerofactura_SER515D();
                        })
                }
            )
        },
        _evaluarvlrfactura_SER515D() {
            validarInputs(
                {
                    form: '#VALIDAR7_SER515D',
                    orden: '1'
                },
                this._evaluarnumerofactura_SER515D,
                () => {
                    this._evaluarfechaentrega_SER515D('1');
                }
            )
        },
        _evaluarfechaentrega_SER515D(data) {
            añoentregaMask_SER515D.typedValue = moment().format('YYYY');
            mesentregaMask_SER515D.typedValue = moment().format('MM');
            diaentregaMask_SER515D.typedValue = moment().format('DD');
            validarInputs(
                {
                    form: '#VALIDAR8_SER515D',
                    orden: data
                },
                this._evaluarvlrfactura_SER515D,
                () => {
                    let fechaentrega = `${añoentregaMask_SER515D.value.padEnd(4, '0')}${mesentregaMask_SER515D.value.padStart(2, '0')}${diaentregaMask_SER515D.value.padStart(2, '0')}`;
                    if (moment(fechaentrega).format('YYYYMMDD') == 'Invalid Date') {
                        CON851('03', '03', null, 'error', 'Error');
                        return this._evaluarfechaentrega_SER515D('1');
                    }

                    CON851P('01', () => this._evaluarfechaentrega_SER515D('1'), this._guardado_SER515D);
                }
            )
        },
        _guardado_SER515D() {
            // GUARDADO
            let datos = `${numerodevolucionMask_SER515D.value.padStart(6, '0')}|${this.form.prefijofactura_SER515D}${numerofacturaMask_SER515D.value.padStart(6, '0')}|`
            datos += `${this.form.fecha_SER515D.replace(/\//g, '')}|${this.form.hora_SER515D.replace(/:/g, '')}|${this.form.remite_SER515D.padStart(10, '0')}|${this.form.concepto_SER515D.padStart(3, '0')}|`
            datos += `${this.form.descripcionevento_SER4C2.substring(0, 180).replace(/\n/g, '&')}|${vlrfacturaMask_SER515D.value.replace(/,/g, '').padStart(11, '0')}|`
            datos += `${añoentregaMask_SER515D.value.padEnd(4, '0')}${mesentregaMask_SER515D.value.padStart(2, '0')}${diaentregaMask_SER515D.value.padStart(2, '0')}|`
            datos += `${this.form.persona_SER515D}|${this.SER515D.OPERCRE}|${this.SER515D.FECHAMOD}|${this.SER515D.OPERMOD}|`
            postData(
                {
                    datosh: datosEnvio(),
                    llave: numerodevolucionMask_SER515D.value.padStart(6, '0'),
                    novedad: this.form.novedad_SER515D.substring(0, 1),
                    registro: datos
                },
                get_url("APP/SALUD/SER515D.DLL")
            )
                .then(data => {
                    this._impresion_SER515D();
                })
                .catch(error => {
                    console.error(error);
                    this._evaluarfechaentrega_SER515D('3');
                })
        },
        _impresion_SER515D() {
            datosimpresion_SER515D = new Object();
            datosimpresion_SER515D.DEVOLUCION = numerodevolucionMask_SER515D.value.padStart(6, '0')
            datosimpresion_SER515D.NITREMITE = this.form.remite_SER515D;
            datosimpresion_SER515D.DESCRIPCION_REMITE = this.form.remited_SER515D;
            datosimpresion_SER515D.CONCEPTO = this.form.concepto_SER515D;
            datosimpresion_SER515D.DESCRIPCION_CONCEPTO = this.form.conceptod_SER515D;
            datosimpresion_SER515D.DESCRIPCION = this.form.descripcionevento_SER4C2;
            datosimpresion_SER515D.FACTURA = `${this.form.prefijofactura_SER515D}${numerofacturaMask_SER515D.value.padStart(6, '0')}`;
            datosimpresion_SER515D.VLRFACTURA = vlrfacturaMask_SER515D.value;
            datosimpresion_SER515D.FECHA_FACTURA = `${this.form.añofactura_SER515D}${this.form.mesfactura_SER515D}${this.form.diafactura_SER515D}`;
            datosimpresion_SER515D.FECHA_ENTREGA = `${añoentregaMask_SER515D.value}${mesentregaMask_SER515D.value.padStart(2, '0')}${diaentregaMask_SER515D.value.padStart(2, '0')}`;
            _impresionSER515DA(
                datosimpresion_SER515D,
                () => {
                    CON851('39', '39', null, 'success', 'Exito');
                    this._inicializar_SER515D();
                    CON850(this._evaluarCON850_SER515D);
                },
                () => this._evaluarfechaentrega_SER515D('3')
            )
        },
        _inicializar_SER515D() {
            this.form.novedad_SER515D = ''
            this.form.remite_SER515D = ''
            this.form.remited_SER515D = ''
            this.form.concepto_SER515D = ''
            this.form.conceptod_SER515D = ''
            this.form.descripcionevento_SER4C2 = ''
            this.form.prefijofactura_SER515D = ''
            this.form.numerofactura_SER515D = ''
            this.form.vlrfactura_SER515D = ''
            this.form.añofactura_SER515D = ''
            this.form.mesfactura_SER515D = ''
            this.form.diafactura_SER515D = ''
            this.form.añoentrega_SER515D = ''
            this.form.mesentrega_SER515D = ''
            this.form.diaentrega_SER515D = ''
            this.form.persona_SER515D = ''
            numerodevolucionMask_SER515D.typedValue = ''
            numerofacturaMask_SER515D.typedValue = ''
            this.form.fecha_SER515D = ''
            this.form.hora_SER515D = ''
            añoentregaMask_SER515D.typedValue = ''
            mesentregaMask_SER515D.typedValue = ''
            diaentregaMask_SER515D.typedValue = ''
            vlrfacturaMask_SER515D.typedValue = ''
        },
        // VENTANAS F8
        _ventanaDevoluciones_SER515D() {
            loader('show');
            postData(
                {
                    datosh: datosEnvio()
                },
                get_url("APP/SALUD/SER515A.DLL")
            )
                .then(data => {
                    loader('hide');
                    data.DEVOLUCIONES.pop();
                    if (data.DEVOLUCIONES.length == 0) {
                        CON851('', 'No hay datos registrados', null, 'error', 'Error');
                        return $(".devlucion_SER515D").focus();
                    }
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["DEVOLUCION", "FACTURA", "FECHA_FACTURA", "REMITE", "DESCRIPCION_REMITE", "CONCEPTO", "DESCRIPCION_CONCEPTO"],
                        data: data.DEVOLUCIONES,
                        ancho: '95%',
                        callback_esc: () => {
                            $(".devlucion_SER515D").focus();
                        },
                        callback: data => {
                            numerodevolucionMask_SER515D.typedValue = data.DEVOLUCION;
                            _enterInput('.devlucion_SER515D');
                        }
                    });
                })
                .catch(error => {
                    loader('hide');
                    console.error(error);
                    $(".devlucion_SER515D").focus();
                })
        },
        _ventanaTerceros_SER515D() {
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: data => {
                    this.form.remite_SER515D = parseInt(data.COD).toString();
                    _enterInput('.remite_SER515D');
                },
                cancel: () => {
                    $('.remite_SER515D').focus();
                }
            };
            F8LITE(parametros);
        },
        _ventanaMotivos_SER515D() {
            let _this = this
            loader('show');
            postData(
                {
                    datosh: datosEnvio()
                },
                get_url("APP/SALUD/SER-A81.DLL")
            )
                .then(data => {
                    loader('hide');
                    data.MOTIVOS.pop();
                    if (data.MOTIVOS.length == 0) {
                        CON851('', 'No hay datos registrados', null, 'error', 'Error');
                        return $(".concepto_SER515D").focus();
                    }
                    _ventanaDatos({
                        titulo: 'VENTANA DE MOTIVOS',
                        columnas: ["CUENTA", "NOMBRE"],
                        data: data.MOTIVOS,
                        ancho: '95%',
                        callback_esc: () => {
                            $(".concepto_SER515D").focus();
                        },
                        callback: data => {
                            _this.form.concepto_SER515D = data.CUENTA;
                            _enterInput('.concepto_SER515D');
                        }
                    });
                })
                .catch(error => {
                    loader('hide');
                    console.error(error);
                    $(".concepto_SER515D").focus();
                })
        },
        _ventanaPrefijos_SER515D() {
            let _this = this;
            loader('show');
            postData(
                {
                    datosh: datosEnvio()
                },
                get_url("APP/INVENT/INV109.DLL")
            )
                .then(data => {
                    loader('hide');
                    data.PREFIJOS[0].TABLA.pop();
                    if (data.PREFIJOS[0].TABLA.length == 0) {
                        CON851('', 'No hay datos registrados', null, 'error', 'Error');
                        return $(".prefijofactura_SER515D").focus();
                    }
                    _ventanaDatos({
                        titulo: 'VENTANA DE PREFIJOS',
                        columnas: ["PREFIJO", "DESCRIPCION"],
                        data: data.PREFIJOS[0].TABLA,
                        ancho: '95%',
                        callback_esc: () => {
                            $(".prefijofactura_SER515D").focus();
                        },
                        callback: data => {
                            console.log(data);
                            _this.form.prefijofactura_SER515D = data.PREFIJO;
                            _enterInput('.prefijofactura_SER515D');
                        }
                    });
                })
                .catch(error => {
                    loader('hide');
                    console.error(error);
                    $(".prefijofactura_SER515D").focus();
                })
        },
        _ventanaNumerofactura_SER515D() {
            parametros = {
                dll: 'NUMERACION',
                valoresselect: ['Nombre del tercero', 'buscar paciente'],
                f8data: 'NUMERACION',
                columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                filtro: this.form.prefijofactura_SER515D.toUpperCase().trim(),
                fecha: `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 4)}00`,
                prefijo: this.form.prefijofactura_SER515D.toUpperCase().trim(),
                callback: data => {
                    numerofacturaMask_SER515D.typedValue = data.COD.substring(1, 7).toString();
                    _enterInput('#numerofactura_SER515D');
                },
                cancel: () => {
                    $('#numerofactura_SER515D').focus();
                }
            };
            F8LITE(parametros);
        },
    }
})

var numerodevolucionMask_SER515D = IMask($('#numerodevolucion_SER515D')[0], { mask: Number });
var numerofacturaMask_SER515D = IMask($('#numerofactura_SER515D')[0], { mask: Number });
var vlrfacturaMask_SER515D = IMask(
    $('#vlrfactura_SER515D')[0],
    {
        mask: Number,
        thousandsSeparator: ',',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: '.',
        mapToRadix: ['.'],
        scale: 2
    }
);

var añoentregaMask_SER515D = IMask($('#añoentrega_SER515D')[0], { mask: Number });
var mesentregaMask_SER515D = IMask($('#mesentrega_SER515D')[0], { mask: Number });
var diaentregaMask_SER515D = IMask($('#diaentrega_SER515D')[0], { mask: Number });