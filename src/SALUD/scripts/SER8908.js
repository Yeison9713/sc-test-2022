new Vue({
    el:"#SER8908",
    data: {
        SER8908:[],
        form: {
            descripmedi_SER8908:"",
        },
        tablacitasmedico_SER8908:[],
    },
    created() {
        $_this = this;
        loader('show');
        _inputControl('disabled');
        nombreOpcion('9-7-C-1-8 - Cancelacion de citas por profesional');
        this.SER8908.FECHAACT = moment().format('YYYYMMDD');
        this.SER8908.FECHASIST = moment().format('YYYYMMDD');
        this.SER8908.HORAACT = moment().format('HHmm');
        obtenerDatosCompletos({ nombreFd: 'PROFESIONALES' }, function (data) {
            $_this.SER8908.PROFESIONALES = data.ARCHPROF
            $_this.SER8908.PROFESIONALES.pop();
            obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, function (data) {
                loader('hide');
                $_this.SER8908.TERCEROS = data.TERCEROS
                $_this.SER8908.TERCEROS.pop();
                $_this._evaluarmedico_SER8908();
            })
        })
    },
    methods: {
        _evaluarmedico_SER8908() {
            validarInputs({
                form: "#VALIDAR1_SER8908",
                orden: '1',
                event_f3: () => {
                    if (this.tablacitasmedico_SER8908.length > 0) {
                        this._evaluarcausacancelacion_SER8908();
                    } else {
                        CON851('01','01',this._evaluarmedico_SER8908(),'error','Error');
                    }
                }
            },
                _toggleNav,
                () => {
                    if (medicoMask_SER8908.unmaskedValue.trim() == '' || medicoMask_SER8908.unmaskedValue.trim() == 0) {
                        CON851('02','02',this._evaluarmedico_SER8908(),'error','Error')
                    } else {
                        let tercero = this.SER8908.TERCEROS.filter(x => x.COD.trim() == medicoMask_SER8908.unmaskedValue)
                        if (tercero.length > 0) {
                            let medico = this.SER8908.PROFESIONALES.filter(x => x.IDENTIFICACION.trim() == medicoMask_SER8908.unmaskedValue)
                            if (medico.length > 0) {
                                this.form.descripmedi_SER8908 = medico[0].NOMBRE;
                                if (medico[0].ESTADO == '2') {
                                    CON851('13','13',this._evaluarmedico_SER8908(),'error','Error')    
                                } else {
                                    this._evaluarano_SER8908();
                                }
                            } else {
                                CON851('9X','9X',this._evaluarmedico_SER8908(),'error','Error')
                            }
                        } else {
                            CON851('01','01',this._evaluarmedico_SER8908(),'error','Error')
                        }
                    }
                }
            )
        },
        _evaluarano_SER8908() {
            validarInputs({
                form: "#VALIDAR2_SER8908",
                orden: '1'
            },
                this._evaluarmedico_SER8908,
                () => {
                    if (anoMask_SER8908.unmaskedValue.length > 3) {
                        this._evaluarmes_SER8908();
                    } else {
                        this._evaluarano_SER8908();
                    }
                }
            )
        },
        _evaluarmes_SER8908() {
            validarInputs({
                form: "#VALIDAR3_SER8908",
                orden: '1'
            },
                this._evaluarano_SER8908,
                () => {
                    if (mesMask_SER8908.unmaskedValue < 1 || mesMask_SER8908.unmaskedValue > 12) {
                        CON851('03','03',this._evaluarmes_SER8908(),'error','Error');
                    } else {
                        this._evaluardia_SER8908();
                    }
                }
            )
        },
        _evaluardia_SER8908() {
            validarInputs({
                form: "#VALIDAR4_SER8908",
                orden: '1'
            },
                this._evaluarano_SER8908,
                () => {
                    let fecha = moment(`${anoMask_SER8908.unmaskedValue}${mesMask_SER8908.unmaskedValue.padStart(2,'0')}${diaMask_SER8908.unmaskedValue.padStart(2,'0')}`).format('YYYYMMDD');
                    console.log(fecha);
                    if (fecha == 'Invalid date') {
                        CON851('03','03',this._evaluardia_SER8908(),'error','Error');
                    } else {
                        this._evaluarhorainicial_SER8098()
                    }
                }
            )
        },
        _evaluarhorainicial_SER8098() {
            validarInputs({
                form: "#VALIDAR5_SER8908",
                orden: '1'
            },
                this._evaluardia_SER8908,
                () => {
                    horainicialMask_SER8908.typedValue = horainicialMask_SER8908.unmaskedValue.padEnd(4,'0');
                    if (horainicialMask_SER8908.unmaskedValue.trim().substring(0,2) > 23 || horainicialMask_SER8908.unmaskedValue.trim().substring(0,2) < 0) {
                        CON851('03','03',this._evaluarhorainicial_SER8098(),'error','Error');
                    } else if (horainicialMask_SER8908.unmaskedValue.trim().substring(2,4) > 59 || horainicialMask_SER8908.unmaskedValue.trim().substring(2,4) < 0) {
                        CON851('03','03',this._evaluarhorainicial_SER8098(),'error','Error');
                    } else {
                        this._evaluarhorafinal_SER8098();
                    }
                }
            )
        },
        _evaluarhorafinal_SER8098() {
            validarInputs({
                form: "#VALIDAR6_SER8908",
                orden: '1'
            },
                this._evaluardia_SER8908,
                () => {
                    horafinalMask_SER8908.typedValue = horafinalMask_SER8908.unmaskedValue.padEnd(4,'0');
                    if (horafinalMask_SER8908.unmaskedValue.trim().substring(0,2) > 23 || horafinalMask_SER8908.unmaskedValue.trim().substring(0,2) < 0) {
                        CON851('03','03',this._evaluarhorainicial_SER8098(),'error','Error');
                    } else if (horafinalMask_SER8908.unmaskedValue.trim().substring(2,4) > 59 || horafinalMask_SER8908.unmaskedValue.trim().substring(2,4) < 0) {
                        CON851('03','03',this._evaluarhorainicial_SER8098(),'error','Error');
                    } else {
                        loader('show');
                        postData( { datosh: `${datosEnvio()}${moment().format('YY')}|${medicoMask_SER8908.unmaskedValue.padStart(10,'0')}${anoMask_SER8908.unmaskedValue}${mesMask_SER8908.unmaskedValue.padStart(2,'0')}${diaMask_SER8908.unmaskedValue.padStart(2,'0')}|${horainicialMask_SER8908.unmaskedValue}|${horafinalMask_SER8908.unmaskedValue}|1|` },
                        get_url("APP/SALUD/SER8908.DLL"))
                        .then(data => {
                            loader('hide');
                            var $_this = this;
                            _ventanaDatos({
                                titulo: `CITAS DE ${this.form.descripmedi_SER8908}`,
                                columnas: ["HORA", "APELLIDO", "NOMBRE", "TIPOFACT", "EPS", "NOMBREENT", "ID"],
                                data: data.CITAS,
                                pluss: true,
                                ancho: '95%',
                                callback_esc: function () {
                                    $_this._evaluarmedico_SER8908();
                                },
                                callback: function (data) {
                                    console.log(data);
                                    for (var i in data) {
                                        $_this.tablacitasmedico_SER8908.push(data[i]);
                                    }
                                    $_this._evaluarmedico_SER8908();
                                }
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            this._evaluardia_SER8908();
                        });
                    }
                }
            )
        },
        _evaluarcausacancelacion_SER8908() {
            setTimeout(() => {
                SER837(data => {
                    this.SER8908.CAUSA = data.CODIGO;
                    setTimeout(() => {
                        CON851P('01', this._evaluarmedico_SER8908, this._grabarcancelaciondecitas_SER8908);
                    }, 300);
                }, this._evaluarmedico_SER8908, '1')
            }, 300);
        },
        _grabarcancelaciondecitas_SER8908() {
            loader('show');
            for (var i in this.tablacitasmedico_SER8908) {
                postData( { datosh: `${datosEnvio()}${moment().format('YY')}|${medicoMask_SER8908.unmaskedValue.padStart(10,'0')}${anoMask_SER8908.unmaskedValue}${mesMask_SER8908.unmaskedValue.padStart(2,'0')}${diaMask_SER8908.unmaskedValue.padStart(2,'0')}|${horainicialMask_SER8908.unmaskedValue}|${horafinalMask_SER8908.unmaskedValue}|2|${this.SER8908.CAUSA}|${this.tablacitasmedico_SER8908[i].LLAVECIT}|` },
                get_url("APP/SALUD/SER8908.DLL"))
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
                if (this.tablacitasmedico_SER8908.length - 1 == i)  {
                    loader('hide');
                    CON851('39','39',_toggleNav(),'success','Exito')
                }
            }
        },
        // F8
        _f8Profesionales_SER809AA(e) {
            $_this = this;
            if (e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                    data: $_this.SER8908.PROFESIONALES,
                    callback_esc: function () {
                        $('#medico_SER8908').focus();
                    },
                    callback: function (data) {
                        medicoMask_SER8908.typedValue = parseInt(data.IDENTIFICACION).toString();
                        _enterInput('#medico_SER8908');
                    }
                });
            }
        },
    },
})
// MASCARAS
var medicoMask_SER8908 = IMask($('#medico_SER8908')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var anoMask_SER8908 = IMask($('#ano_SER8908')[0], { mask: Number });
var mesMask_SER8908 = IMask($('#mes_SER8908')[0], { mask: Number });
var diaMask_SER8908 = IMask($('#dia_SER8908')[0], { mask: Number });
var horainicialMask_SER8908 = IMask($('#horainicial_SER8908')[0], { mask: '0000' });
var horafinalMask_SER8908 = IMask($('#horafinal_SER8908')[0], { mask: '0000' });