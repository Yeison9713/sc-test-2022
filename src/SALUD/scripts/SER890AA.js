new Vue({
    el:"#SER890AA",
    data: {
        SER890AA:[],
        form: {
            descripmedi_SER890AA:"",
        },
        tablacitasmedico_SER890AA:[],
    },
    created() {
        $_this = this;
        loader('show');
        _inputControl('disabled');
        nombreOpcion('9-7-C-1-4 - Ventana de estado citas');
        this.SER890AA.FECHAACT = moment().format('YYYYMMDD');
        this.SER890AA.FECHASIST = moment().format('YYYYMMDD');
        this.SER890AA.HORAACT = moment().format('HHmm');
        obtenerDatosCompletos({ nombreFd: 'PROFESIONALES' }, function (data) {
            $_this.SER890AA.PROFESIONALES = data.ARCHPROF
            $_this.SER890AA.PROFESIONALES.pop();
            obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, function (data) {
                loader('hide');
                $_this.SER890AA.TERCEROS = data.TERCEROS
                $_this.SER890AA.TERCEROS.pop();
                $_this._evaluarmedico_SER890AA();
            })
        })
    },
    methods: {
        _evaluarmedico_SER890AA() {
            validarInputs({
                form: "#VALIDAR1_SER890AA",
                orden: '1'
            },
                _toggleNav,
                () => {
                    if (medicoMask_SER890AA.unmaskedValue.trim() == '' || medicoMask_SER890AA.unmaskedValue.trim() == 0) {
                        CON851('02','02',this._evaluarmedico_SER890AA(),'error','Error')
                    } else {
                        let tercero = this.SER890AA.TERCEROS.filter(x => x.COD.trim() == medicoMask_SER890AA.unmaskedValue)
                        if (tercero.length > 0) {
                            let medico = this.SER890AA.PROFESIONALES.filter(x => x.IDENTIFICACION.trim() == medicoMask_SER890AA.unmaskedValue)
                            if (medico.length > 0) {
                                this.form.descripmedi_SER890AA = medico[0].NOMBRE;
                                if (medico[0].ESTADO == '2') {
                                    CON851('13','13',this._evaluarmedico_SER890AA(),'error','Error')    
                                } else {
                                    this._evaluarano_SER890AA();
                                }
                            } else {
                                CON851('9X','9X',this._evaluarmedico_SER890AA(),'error','Error')
                            }
                        } else {
                            CON851('01','01',this._evaluarmedico_SER890AA(),'error','Error')
                        }
                    }
                }
            )
        },
        _evaluarano_SER890AA() {
            if(anoMask_SER890AA.value == 0) 
            anoMask_SER890AA.typedValue = this.SER890AA.FECHAACT.substring(0, 4);
            mesMask_SER890AA.typedValue = this.SER890AA.FECHAACT.substring(4, 6);
            diaMask_SER890AA.typedValue = this.SER890AA.FECHAACT.substring(6, 8);
            validarInputs({
                form: "#VALIDAR2_SER890AA",
                orden: '1'
            },
                this._evaluarmedico_SER890AA,
                () => {
                    if (anoMask_SER890AA.unmaskedValue.length > 3) {
                        this._evaluarmes_SER890AA();
                    } else {
                        this._evaluarano_SER890AA();
                    }
                }
            )
        },
        _evaluarmes_SER890AA() {
            validarInputs({
                form: "#VALIDAR3_SER890AA",
                orden: '1'
            },
                this._evaluarano_SER890AA,
                () => {
                    if (mesMask_SER890AA.unmaskedValue < 1 || mesMask_SER890AA.unmaskedValue > 12) {
                        CON851('03','03',this._evaluarmes_SER890AA(),'error','Error');
                    } else {
                        this._evaluardia_SER890AA();
                    }
                }
            )
        },
        _evaluardia_SER890AA() {
            validarInputs({
                form: "#VALIDAR4_SER890AA",
                orden: '1'
            },
                this._evaluarano_SER890AA,
                () => {
                    let fecha = moment(`${anoMask_SER890AA.unmaskedValue}${mesMask_SER890AA.unmaskedValue.padStart(2,'0')}${diaMask_SER890AA.unmaskedValue.padStart(2,'0')}`).format('YYYYMMDD');
                    console.log(fecha);
                    if (fecha == 'Invalid date') {
                        CON851('03','03',this._evaluardia_SER890AA(),'error','Error');
                    } else {
                        postData( { datosh: `${datosEnvio()}${medicoMask_SER890AA.unmaskedValue.padStart(10,'0')}|${anoMask_SER890AA.unmaskedValue}${mesMask_SER890AA.unmaskedValue.padStart(2,'0')}${diaMask_SER890AA.unmaskedValue.padStart(2,'0')}|` },
                        get_url("APP/SALUD/SER890B.DLL"))
                        .then(data => {
                            var $_this = this;
                            _ventanaDatos({
                                titulo: `CITAS DE ${this.form.descripmedi_SER890AA}`,
                                columnas: ["HORA", "SUCURSAL", "COD", "DESCRIP", "TIPO_CITA", "DOBLE", "COMPROB", "DESCRIP_EST"],
                                data: data.CITAS,
                                ancho: '95%',
                                callback_esc: function () {
                                    $_this._evaluarmedico_SER890AA();
                                },
                                callback: function (data) {
                                    let { ipcRenderer } = require("electron");
                                    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER890P.html', medico: medicoMask_SER890AA.value.replace(/,/g, ''), ano: anoMask_SER890AA.unmaskedValue, mes: mesMask_SER890AA.unmaskedValue.padStart(2,'0'), dia: diaMask_SER890AA.unmaskedValue.padStart(2, '0') });
                                    _EventocrearSegventana(['on', ' Imprimiendo citas...'], $_this._evaluarmedico_SER890AA);
                                }
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            this._evaluardia_SER890AA();
                        });
                    }
                }
            )
        },
        // F8
        _f8Profesionales_SER809AA(e) {
            $_this = this;
            if (e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                    data: $_this.SER890AA.PROFESIONALES,
                    callback_esc: function () {
                        $('#medico_SER890AA').focus();
                    },
                    callback: function (data) {
                        medicoMask_SER890AA.typedValue = parseInt(data.IDENTIFICACION).toString();
                        _enterInput('#medico_SER890AA');
                    }
                });
            }
        },
    },
})
// MASCARAS
var medicoMask_SER890AA = IMask($('#medico_SER890AA')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var anoMask_SER890AA = IMask($('#ano_SER890AA')[0], { mask: Number });
var mesMask_SER890AA = IMask($('#mes_SER890AA')[0], { mask: Number });
var diaMask_SER890AA = IMask($('#dia_SER890AA')[0], { mask: Number });