// 28/12/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#SER4C4",
    data: {
        SER4C4: [],
        tablafactenvio_SER4C4: [],
        form: {
            Envios_SER4C4: "",
            novedad_SER4C4: "",
            numero_SER4C4: "",
            entidad_SER4C4: "",
            descripentid_SER4C4: "",
            anoini_SER4C4: "",
            mesini_SER4C4: "",
            diaini_SER4C4: "",
            perido_SER4C4: "",
            costo_SER4C4: "",
            descripcosto_SER4C4: "",
            oper_SER4C4: "",
            md_SER4C4: "",
            eps_SER4C4: "",
            descripeps_SER4C4: "",
            prefijotabla_SER4C4: "",
            facturatabla_SER4C4: "",
            itemtabla_SER4C4: 1,
            ingreseok_SER4C4: ""
        },
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,7,4,3,7,4 - Informe furips");
        $_this = this;
        $_this.SER4C4.BUSENVIOW = ' '
        $_this.SER4C4.FECHAATEN = ' '
        $_this.SER4C4.ORGANIZAW = '1'
        $_this.SER4C4.VALID = ' '
        $_this.SER4C4.CONTADO = 0
        $_this.SER4C4.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SER4C4.ANO_LNK = $_this.SER4C4.FECHA_LNK.substring(0, 2);
        $_this.SER4C4.MES_LNK = $_this.SER4C4.FECHA_LNK.substring(2, 4);
        $_this.SER4C4.DIA_LNK = $_this.SER4C4.FECHA_LNK.substring(4, 6);
        $_this.SER4C4.FECHAACTUAL = moment().format("YYYYMMDD");
        $_this.SER4C4.ANOACTUAL = $_this.SER4C4.FECHAACTUAL.substring(0, 4)
        $_this.SER4C4.MESACTUAL = $_this.SER4C4.FECHAACTUAL.substring(4, 6)
        $_this.SER4C4.DIAACTUAL = $_this.SER4C4.FECHAACTUAL.substring(6, 8)
        obtenerDatosCompletos({
            nombreFd: 'PREFIJOS',
        }, function (data) {
            console.log(data, 'PREFIJOS');
            loader("hide");
            $_this._evaluarfechaempezar_SER4C4()
            $_this.SER4C4.PREFIJOS = data.PREFIJOS;
        })

    },
    methods: {
        _evaluarfechaempezar_SER4C4() {
            this.SER4C4.ANONUM = this.SER4C4.ANO_LNK;
            if (parseInt(this.SER4C4.ANONUM) > 90) {
                this.SER4C4.ANOINIW = parseInt(this.SER4C4.ANONUM) + 1900;
            } else {
                this.SER4C4.ANOINIW = parseInt(this.SER4C4.ANONUM) + 2000;
            }
            this.SER4C4.MESNUM = this.SER4C4.MES_LNK;
            this.SER4C4.MESINIW = this.SER4C4.MESNUM;
            this.SER4C4.DIAINIW = '01';
            // this.form.perido_SER4C4 = this.SER4C4.ANOINIW + this.SER4C4.MESINIW
            this.SER4C4.FECHAINIW = this.SER4C4.ANOINIW + this.SER4C4.MESINIW + this.SER4C4.DIAINIW
            this.SER4C4.PERINILOCAL = this.SER4C4.ANOINIW + this.SER4C4.MESINIW;
            switch (parseInt(this.SER4C4.MESINIW)) {
                case 01:
                    this.form.Envios_SER4C4 = 'ENERO' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 02:
                    this.form.Envios_SER4C4 = 'FEBRERO' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 03:
                    this.form.Envios_SER4C4 = 'MARZO' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 04:
                    this.form.Envios_SER4C4 = 'ABRIL' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 05:
                    this.form.Envios_SER4C4 = 'MAYO' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 06:
                    this.form.Envios_SER4C4 = 'JUNIO' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 07:
                    this.form.Envios_SER4C4 = 'JULIO' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 08:
                    this.form.Envios_SER4C4 = 'AGOSTO' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 09:
                    this.form.Envios_SER4C4 = 'SEPTIEMBRE' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 10:
                    this.form.Envios_SER4C4 = 'OCTUBRE' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 11:
                    this.form.Envios_SER4C4 = 'NOVIEMBRE' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
                case 12:
                    this.form.Envios_SER4C4 = 'DICIEMBE' + '/' + this.SER4C4.ANOINIW
                    this._fechaactual_SER4C4();
                    break;
            }
        },
        _fechaactual_SER4C4() {
            this.SER4C4.ANOCTL = this.SER4C4.ANOACTUAL;
            if (parseInt(this.SER4C4.DIAACTUAL >= 20)) {
                if (parseInt(this.SER4C4.MESACTUAL) == 12) {
                    this.SER4C4.ANOCTL = parseInt(this.SER4C4.ANOCTL) + 1;
                    this.SER4C4.MESCTL = '01';
                } else {
                    this.SER4C4.MESCTL = parseInt(this.SER4C4.MESCTL) + 1;
                }
                this.SER4C4.DIACTL = 10;
                this._validacionabrirarch_SER4C4()
            } else {
                this.SER4C4.MESCTL = this.SER4C4.MESACTUAL;
                this.SER4C4.DIACTL = this.SER4C4.DIAACTUAL;
                this._validacionabrirarch_SER4C4()
            }
        },
        _validacionabrirarch_SER4C4() {
            this.SER4C4.FECHACTL = this.SER4C4.ANOCTL + this.SER4C4.MESCTL + this.SER4C4.DIACTL;
            this.SER4C4.NUIRW = $_USUA_GLOBAL[0].NUIR;
            if (!$.isNumeric(this.SER4C4.NUIRW)) {
                jAlert({ titulo: 'Error ', mensaje: 'Falta asignar el codigo del prestador actualice el campo de NUIR en datos del usuario opcion 1-1-1 menu de contabilidad' }, _toggleNav);
            } else {
                CON850(this._validarnovedad_SER4C4);
            }
        },
        _validarnovedad_SER4C4(novedad) {
            this.form.novedad_SER4C4 = novedad.id;
            this.form.entidad_SER4C4 = "",
                this.form.descripentid_SER4C4 = "",
                this.form.numero_SER4C4 = "",
                this.form.entidad_SER4C4 = "",
                this.form.descripentid_SER4C4 = "",
                this.form.anoini_SER4C4 = "",
                this.form.mesini_SER4C4 = "",
                this.form.diaini_SER4C4 = "",
                this.form.costo_SER4C4 = "",
                this.form.descripcosto_SER4C4 = "",
                this.form.oper_SER4C4 = "",
                this.form.md_SER4C4 = "",
                this.form.eps_SER4C4 = "",
                this.form.descripeps_SER4C4 = "",
                this.form.prefijotabla_SER4C4 = "",
                this.form.facturatabla_SER4C4 = "",
                this.tablafactenvio_SER4C4 = []
            if (this.form.novedad_SER4C4 == "F") {
                _toggleNav();
            } else {
                let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
                this.form.novedad_SER4C4 = this.form.novedad_SER4C4 + " - " + novedad[this.form.novedad_SER4C4];
                switch (this.form.novedad_SER4C4.substring(0, 1)) {
                    case '7':
                        this._asignarnumero_SER4C4()
                        break;
                    case '8':
                        this._datonumero_SER4C4();
                        break;
                    case '9':
                        CON851('49', '49', null, 'error', 'error');
                        setTimeout(function () { CON850(this._validarnovedad_SER4C4); }, 300)
                        break;
                }
            }
        },
        _asignarnumero_SER4C4() {
            let URL = get_url("APP/SALUD/SER4C4.DLL");
            postData({ datosh: datosEnvio() + "1||" }, URL)
                .then(data => {
                    console.log(data, 'CONSECUTIVO')
                    this.form.numero_SER4C4 = data
                    this._leernumero_SER4C4();
                })
                .catch(err => {
                    console.error(err);
                    setTimeout(function () { CON850(this._validarnovedad_SER4C4); }, 300)
                })

        },
        _datonumero_SER4C4() {
            validarInputs({
                form: "#NUMERO_SER4C4",
                orden: '1'
            },
                () => {
                    setTimeout(() => { CON850(this._validarnovedad_SER4C4) }, 300)
                },
                () => {
                    this._leernumero_SER4C4();
                }
            )
        },

        _leernumero_SER4C4() {
            if (this.form.numero_SER4C4 == 0) {
                this._datonumero_SER4C4()
            } else {
                this.form.numero_SER4C4 = this.form.numero_SER4C4.toString().padStart(6, '0')
                postData({ datosh: datosEnvio() + '2|' + this.form.novedad_SER4C4.substring(0, 1) + '|' + this.form.numero_SER4C4 + '|' },
                    get_url("APP/SALUD/SER4C4.DLL"))
                    .then((data) => {
                        console.log(data)
                        this.SER4C4.FURIPSW = data.CONSULTA[0];
                        if (this.form.novedad_SER4C4.substring(0, 1) == '7') {
                            CON851('00', '00', null, 'error', 'error');
                            setTimeout(function () { CON850(this._validarnovedad_SER4C4); }, 300)
                        } else if (this.form.novedad_SER4C4.substring(0, 1) == '8') {
                            this._llenardatos_SER4C4();
                        }
                    })
                    .catch((error) => {
                        // console.error(error);
                        if (this.form.novedad_SER4C4.substring(0, 1) == '7') {
                            this._registronuevo_SER4C4();
                        } else if (error.MENSAJE == "01" && this.form.novedad_SER4C4.substring(0, 1) == '8') {
                            this._datonumero_SER4C4();
                        } else {
                            this._datonumero_SER4C4();
                        }
                    });
            }
        },
        _registronuevo_SER4C4() {
            this.SER4C4.ANOPERW = this.SER4C4.ANOINIW;
            this.SER4C4.MESPERW = this.SER4C4.MESINIW;
            this.SER4C4.PERINIW = this.SER4C4.ANOPERW + this.SER4C4.MESPERW;
            this.SER4C4.ANOINIW = this.SER4C4.ANOINIW.toString()
            this.form.anoini_SER4C4 = this.SER4C4.ANOINIW
            this.form.mesini_SER4C4 = this.SER4C4.MESACTUAL
            this.form.diaini_SER4C4 = this.SER4C4.DIAACTUAL
            this.form.perido_SER4C4 = this.SER4C4.PERINIW
            this.tablafactenvio_SER4C4 = []
            this._evaluarnit_SER4C4()
        },
        _evaluarnit_SER4C4() {
            validarInputs(
                {
                    form: "#ENTIDADES_SER4C4",
                    orden: '1',
                },
                () => { CON850(this._validarnovedad_SER4C4) },
                () => {
                    if (this.form.entidad_SER4C4.toString().trim() == "") {
                        CON851("01", "01", this._evaluarnit_SER4C4(), "error", "error");
                    } else {
                        this.SER4C4.CODTERCERO = this.form.entidad_SER4C4.toString().padStart(10, "0")
                        let URL = get_url("APP/CONTAB/CON802_01.DLL");
                        postData({
                            datosh: datosEnvio() + this.SER4C4.CODTERCERO + "|",
                        }, URL)
                            .then(data => {
                                SER4C4.TERCEROS = data.TERCER[0];
                                this.SER4C4.DVTERCERO = SER4C4.TERCEROS.DV.trim()
                                this.form.descripentid_SER4C4 = SER4C4.TERCEROS.DESCRIP_TER.trim()
                                this._evaluarfechaini_SER4C4("1")

                            }).catch(error => {
                                console.error(error)
                                this._evaluarnit_SER4C4()
                            });
                    }
                }
            )
        },

        _evaluarfechaini_SER4C4(orden) {
            if (this.form.mesini_SER4C4.trim() == '') {
                this.SER4C4.ANOINIW = this.SER4C4.ANOINIW.toString()
                this.form.anoini_SER4C4 = this.SER4C4.ANOINIW
                this.form.mesini_SER4C4 = this.SER4C4.MESACTUAL
                this.form.diaini_SER4C4 = this.SER4C4.DIAACTUAL
            }
            validarInputs(
                {
                    form: "#FECHAINI_SER4C4",
                    orden: orden,
                },
                () => { this._evaluarnit_SER4C4() },
                () => {
                    if (this.SER4C4.ANOINIW < this.form.anoini_SER4C4 || this.form.anoini_SER4C4.toString().trim() == "") {
                        CON851("", "Año incorrecto! ", this._evaluarfechaini_SER4C4("1"), "error", "error");
                    } else {
                        this.form.mesini_SER4C4 = this.form.mesini_SER4C4.padStart(2, '0')
                        if (this.form.mesini_SER4C4.toString().trim() == "" || parseInt(this.form.mesini_SER4C4) < 1 || parseInt(this.form.mesini_SER4C4) > 12) {
                            CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER4C4("2"), "error", "error");
                        } else {
                            if (this.form.novedad_SER4C4.substring(0, 1) == '7') {
                                switch (this.form.mesini_SER4C4) {
                                    case '01':
                                        this.SER4C4.DIAMAX = 31;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '02':
                                        if ((parseInt(this.form.anoini_SER4C) == 2012) || (parseInt(this.form.anoini_SER4C) == 2016) || (parseInt(this.form.anoini_SER4C) == 2020) || (parseInt(this.form.anoini_SER4C) == 2024) || (parseInt(this.form.anoini_SER4C) == 2028)) {
                                            this.SER4C4.DIAMAX = 29;
                                            this._datodiaini_SER4C4();
                                        } else {
                                            this.SER4C4.DIAMAX = 28;
                                            this._datodiaini_SER4C4();
                                        }
                                        break;
                                    case '03':
                                        this.SER4C4.DIAMAX = 31;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '04':
                                        this.SER4C4.DIAMAX = 30;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '05':
                                        this.SER4C4.DIAMAX = 31;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '06':
                                        this.SER4C4.DIAMAX = 30;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '07':
                                        this.SER4C4.DIAMAX = 31;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '08':
                                        this.SER4C4.DIAMAX = 31;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '09':
                                        this.SER4C4.DIAMAX = 30;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '10':
                                        this.SER4C4.DIAMAX = 31;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '11':
                                        this.SER4C4.DIAMAX = 30;
                                        this._datodiaini_SER4C4();
                                        break;
                                    case '12':
                                        this.SER4C4.DIAMAX = 31;
                                        this._datodiaini_SER4C4();
                                        break;
                                    default:
                                        this._evaluarfechaini_SER4C4('2')
                                        break;
                                }
                            } else {
                                this._datodiaini_SER4C4();
                            }
                        }
                    }
                },
            );
        },
        _datodiaini_SER4C4() {
            console.log('FECHA INI DIA')
            validarInputs(
                {
                    form: "#FECHADIANI_SER4C4",
                    orden: '1'
                },

                () => {
                    this._evaluarfechaini_SER4C4("1")
                },
                () => {
                    this.form.diaini_SER4C4 = this.form.diaini_SER4C4.toString().padStart(2, '0')
                    this.SER4C4.FECHAINIW = this.form.anoini_SER4C4 + this.form.mesini_SER4C4 + this.form.diaini_SER4C4;
                    if (this.form.diaini_SER4C4 == 0) {
                        this.form.diaini_SER4C4 = this.SER4C4.DIAMAX;
                        this._aceptarprefijo_SER4C4()
                    } else if (this.form.diaini_SER4C4 < 1 || this.form.diaini_SER4C4 > SER4C4.DIAMAX) {
                        this._datodiaini_SER4C4();
                    } else if (parseInt(this.SER4C4.FECHAINIW) > parseInt(this.SER4C4.FECHACTL)) {
                        CON851('37', '37', this._datodiaini_SER4C4(), 'error', 'error');
                    } else {
                        this._aceptarprefijo_SER4C4()
                    }
                }
            )
        },
        _aceptarprefijo_SER4C4() {
            if (this.form.prefijotabla_SER4C4 == '*' || this.form.prefijotabla_SER4C4.trim() == '') this.form.prefijotabla_SER4C4 = "T";
            this.form.itemtabla_SER4C4 = this.tablafactenvio_SER4C4.length + 1;
            let parametros = {
                estado: 'on',
                msg: [{
                    mensaje: 'Oprima F3 para grabar envio'
                }, {
                    mensaje: '<*> Para proceso total '
                }
                ]
            }
            _FloatText(parametros);
            validarInputs(
                {
                    form: "#PREFIJO_SER4C4",
                    orden: '1',
                    event_f3: () => {
                        CON851P("01", this._aceptarprefijo_SER4C4, this._evaluargrabado_SER4C4);
                    }
                }, this._datodiaini_SER4C4,
                () => {
                    this.form.prefijotabla_SER4C4 = this.form.prefijotabla_SER4C4.toUpperCase();
                    if ((this.form.prefijotabla_SER4C4 == "A") || (this.form.prefijotabla_SER4C4 == "B") || (this.form.prefijotabla_SER4C4 == "D") || (this.form.prefijotabla_SER4C4 == "F")
                        || (this.form.prefijotabla_SER4C4 == "G") || (this.form.prefijotabla_SER4C4 == "H") || (this.form.prefijotabla_SER4C4 == "I") || (this.form.prefijotabla_SER4C4 == "J")
                        || (this.form.prefijotabla_SER4C4 == "K") || (this.form.prefijotabla_SER4C4 == "L") || (this.form.prefijotabla_SER4C4 == "M") || (this.form.prefijotabla_SER4C4 == "N")
                        || (this.form.prefijotabla_SER4C4 == "O") || (this.form.prefijotabla_SER4C4 == "P") || (this.form.prefijotabla_SER4C4 == "Q") || (this.form.prefijotabla_SER4C4 == "R")
                        || (this.form.prefijotabla_SER4C4 == "S") || (this.form.prefijotabla_SER4C4 == "T") || (this.form.prefijotabla_SER4C4 == "V") || (this.form.prefijotabla_SER4C4 == "W")
                        || (this.form.prefijotabla_SER4C4 == "X") || (this.form.prefijotabla_SER4C4 == "Y") || (this.form.prefijotabla_SER4C4 == "Z") || (this.form.prefijotabla_SER4C4 == "*")) {
                        if (this.form.prefijotabla_SER4C4 == "*") {
                            this._buscartodas_SER4C4();
                        } else {
                            this._aceptarnumero_SER4C4();
                        }
                    } else {
                        this._aceptarprefijo_SER4C4();
                    }
                }
            )
        },
        _aceptarnumero_SER4C4() {
            _FloatText({ estado: 'off' })
            validarInputs(
                {
                    form: "#FACTURAS_SER4C4",
                    orden: '1'
                },
                () => { this._aceptarprefijo_SER4C4(); },
                () => {
                    this.form.facturatabla_SER4C4 = this.form.facturatabla_SER4C4.padStart(6, '0')
                    if (this.form.prefijotabla_SER4C4 == "*") {
                        this._buscartodas_SER4C4();
                    } else {
                        if (this.form.facturatabla_SER4C4.trim() == '') {
                            CON851('01', '01', null, 'error', 'error');
                            this._aceptarnumero_SER4C4();
                        } else {
                            this.SER4C4.LLAVENUM = this.form.prefijotabla_SER4C4 + this.form.facturatabla_SER4C4;
                            let URL = get_url("APP/SALUD/SER808-01.DLL");
                            postData({
                                datosh: datosEnvio() + this.SER4C4.LLAVENUM + "|",
                            }, URL)
                                .then(data => {
                                    this.SER4C4.NUMER = data.NUMER19[0];
                                    this.SER4C4.NITNUM = this.SER4C4.NUMER.NIT_NUM.trim()
                                    this.SER4C4.DESCRIPNUM = this.SER4C4.NUMER.DESCRIP_NUM.trim()
                                    this.SER4C4.FECHASALNUM = this.SER4C4.NUMER.FECHA_RET.trim()
                                    this.SER4C4.ANORETNUM = this.SER4C4.FECHASALNUM.substring(0, 4);
                                    this.SER4C4.MESRETNUM = this.SER4C4.FECHASALNUM.substring(4, 6);
                                    this.SER4C4.DIARETNUM = this.SER4C4.FECHASALNUM.substring(6, 8);
                                    this.SER4C4.FACTCAPITNUMW = this.SER4C4.NUMER.FACTCAPIT_NUM.trim()
                                    this.SER4C4.ENVIOFURIPS = this.SER4C4.NUMER.ENVIOFURIPS_NUM.trim()
                                    this.SER4C4.ESTADONUM = this.SER4C4.NUMER.ESTADO_NUM.trim()
                                    this._novedadtabla_SER4C4();
                                })
                                .catch(error => {
                                    this._aceptarnumero_SER4C4();
                                });
                        }
                    }
                })
        },
        _novedadtabla_SER4C4() {
            this.SER4C4.VALID = ' '
            validarInputs(
                {
                    form: "#OK_SER4C4",
                    orden: '1'
                },
                () => { this._aceptarnumero_SER4C4(); },
                () => {

                    this.form.ingreseok_SER4C4 = this.form.ingreseok_SER4C4.toUpperCase();
                    if (this.form.ingreseok_SER4C4 == 'R' || this.form.ingreseok_SER4C4.trim() == '') {
                        this._otrasvalidaciones_SER4C4();
                    } else {
                        this._novedadtabla_SER4C4()
                    }
                })
        },
        _otrasvalidaciones_SER4C4() {
            if (this.SER4C4.FACTCAPITNUMW == this.SER4C4.LLAVENUM && this.form.ingreseok_SER4C4 != 'R') {
                CON851('1W', '1W', this._aceptarnumero_SER4C4(), 'error', 'error');
            } else {
                if (this.SER4C4.ANORETNUM == this.form.anoini_SER4C4) {
                    this._cuartavalidacion_SER4C4();
                } else {
                    CON851('37', '37', null, 'error', 'error');
                    if (this.form.ingreseok_SER4C4 != 'R') {
                        this._aceptarnumero_SER4C4();
                    } else {
                        this._cuartavalidacion_SER4C4()
                    }
                }
            }
        },
        _cuartavalidacion_SER4C4() {
            if (this.SER4C4.ENVIOFURIPS > 0 && this.SER4C4.ENVIOFURIPS != this.SER4C4.ENVIOFURIPS) {
                CON851('', `Factura esta en el envio ${this.SER4C4.ENVIOFURIPS}`, null, 'error', 'error');
                if (this.form.ingreseok_SER4C4 == 'R' || $_USUA_GLOBAL[0].NIT == 900047282) {
                    this._adicionatabla_SER4C4();
                } else {
                    this._aceptarnumero_SER4C4();
                }
            } else {
                if (this.form.ingreseok_SER4C4 == 'R') {
                    this._borrartabla_SER4C4();
                } else {
                    this._adicionatabla_SER4C4();
                }
            }
        },
        //////////////VALIDACIONES DE TABLA/////////////////////
        _borrartabla_SER4C4() {
            for (var i in this.tablafactenvio_SER4C4) {
                if (this.tablafactenvio_SER4C4[i].NUMERO == this.form.facturatabla_SER4C4 && this.tablafactenvio_SER4C4[i].PREFIJO == this.form.prefijotabla_SER4C4) {
                    this.SER4C4.ITEMW = i
                    this.tablafactenvio_SER4C4.splice(this.SER4C4.ITEMW, 1);
                }
            }
            this._consultarborrartabla_SER4C4()
            setTimeout(this._inicializa_SER4C4(), 300);
            this.form.itemtabla_SER4C4 = this.form.itemtabla_SER4C4 - 1
            setTimeout(this._aceptarprefijo_SER4C4(), 500);
        },
        _consultarborrartabla_SER4C4() {
            let URL = get_url("APP/SALUD/SER4C4.DLL");
            postData({ datosh: datosEnvio() + '5|||||||' + this.form.prefijotabla_SER4C4 + this.form.facturatabla_SER4C4 + '|' }, URL)
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        _adicionatabla_SER4C4() {
            let factura = this.tablafactenvio_SER4C4.filter(x => x.NUMERO == this.form.facturatabla_SER4C4);
            if (factura.length > 0) {
                CON851("", "Factura repetida", this._aceptarnumero_SER4C4(), "error", "Error");
            } else {
                this.tablafactenvio_SER4C4.push({
                    PREFIJO: this.form.prefijotabla_SER4C4,
                    NUMERO: this.form.facturatabla_SER4C4,
                });
                this._inicializa_SER4C4()
                if (this.tablafactenvio_SER4C4.length > 300) {
                    CON851P("01", this._aceptarprefijo_SER4C4, this._evaluargrabado_SER4C4)
                } else {
                    this.form.itemtabla_SER4C4++
                    this._aceptarprefijo_SER4C4()
                }
            }
        },
        _inicializa_SER4C4() {
            this.form.prefijotabla_SER4C4 = ''
            this.form.facturatabla_SER4C4 = ''
            this.form.ingreseok_SER4C4 = ''
        },
        /////////////////////////OTRAS VALIDACIONES///////////
        _llenardatos_SER4C4() {
            this.SER4C4.FECHAINIW = this.SER4C4.FURIPSW.FECHA
            this.form.anoini_SER4C4 = this.SER4C4.FECHAINIW.substring(0, 4)
            this.form.mesini_SER4C4 = this.SER4C4.FECHAINIW.substring(4, 6)
            this.form.diaini_SER4C4 = this.SER4C4.FECHAINIW.substring(6, 8)
            this.SER4C4.PERINIW = this.SER4C4.FURIPSW.LLAVE_PER
            this.form.perido_SER4C4 = this.SER4C4.FURIPSW.LLAVE_PER
            this.SER4C4.FURIPSW.FACTURAS.pop()
            this.tablafactenvio_SER4C4 = this.SER4C4.FURIPSW.FACTURAS
            if (parseInt(this.SER4C4.FURIPSW.LLAVE_PER.substring(4, 6)) == 0) {
                this.SER4C4.PERINIW = this.SER4C4.PERINILOCAL
                this._datonumero_SER4C4()
            }
            if (this.SER4C4.PERINILOCAL != this.SER4C4.PERINIW) {
                CON851('37', '37', this._datonumero_SER4C4(), 'error', 'error');
            } else {
                this._aceptarprefijo_SER4C4()
            }
        },
        _buscartodas_SER4C4() {
            loader('show')
            this.SER4C4.ANORETNUM = this.SER4C4.ANOPERW;
            this.SER4C4.MESRETNUM = this.SER4C4.MESPERW;
            this.SER4C4.DIARETNUM = '01';
            this.SER4C4.FECHARETNUM = this.SER4C4.ANORETNUM + this.SER4C4.MESRETNUM + this.SER4C4.DIARETNUM;
            let URL = get_url("APP/SALUD/SER4C4.DLL");
            postData({ datosh: datosEnvio() + '3||' + this.form.numero_SER4C4 + '|' + this.SER4C4.ANOPERW + this.SER4C4.MESPERW + '|' + this.form.entidad_SER4C4 + '|' + this.form.anoini_SER4C4 + this.form.mesini_SER4C4 + this.form.diaini_SER4C4 + '|' + this.SER4C4.FECHARETNUM + '|' }, URL)
                .then(data => {
                    SER4C4.TODASFACT = data['FACT'];
                    SER4C4.TODASFACT.pop()
                    this.tablafactenvio_SER4C4 = SER4C4.TODASFACT
                    loader('hide')
                    if (this.tablafactenvio_SER4C4.length > 300) {
                        CON851P("01", this._aceptarprefijo_SER4C4, this._evaluargrabado_SER4C4)
                    } else {
                        this._aceptarprefijo_SER4C4()
                    }
                })
                .catch(err => {
                    loader('hide')
                    console.error(err)
                    this._aceptarprefijo_SER4C4()

                })
        },

        ///////////////GRABADO///////////////////////////////////
        _evaluargrabado_SER4C4() {
            _FloatText({ estado: 'off' })
            if (this.tablafactenvio_SER4C4.length == 0) {
                CON851('', 'Tabla vacia', this._aceptarprefijo_SER4C4(), 'error', 'error');
            } else {
                if (this.tablafactenvio_SER4C4.length > 300) {
                    CON851('', 'Supero el tamaño de la tabla', this._aceptarprefijo_SER4C4(), 'error', 'error');
                } else {
                    // CON851P("01", this._aceptarprefijo_SER4C4, this._grabar_SER4C4);
                    this._grabar_SER4C4()
                }
            }
        },
        _grabar_SER4C4() {
            loader("show");
            var data = {};
            var lin = 1;
            for (var i in this.tablafactenvio_SER4C4) {
                data['LIN-' + lin.toString().padStart(3, '0')] = this.tablafactenvio_SER4C4[i].PREFIJO + this.tablafactenvio_SER4C4[i].NUMERO + '|';
                lin++;
            }
            console.log(data, 'TABLA ENVIO')
            data.datosh = `${datosEnvio()}4|${this.form.novedad_SER4C4.substring(0, 1)}|${this.form.numero_SER4C4}|${this.SER4C4.PERINIW}|${this.form.entidad_SER4C4}|${this.SER4C4.FECHAINIW}|`
            postData(data, get_url("APP/SALUD/SER4C4.DLL"))
                .then(data => {
                    console.log(data, 'ENVIO GRABADO')
                    loader("hide");
                    CON851('', 'Proceso terminado', null, 'success', 'Exito');
                    this._generartransacc_SER4C4()
                })
                .catch(err => {
                    console.error(err);
                    loader("hide");
                    this._aceptarprefijo_SER4C4();
                });
        },

        _generartransacc_SER4C4() {
            // let parametros = {
            //     estado: 'on',
            //     msg: [{
            //         mensaje: 'Oprima F5 para salir'
            //     }
            //     ]
            // }
            // _FloatText(parametros);
            postData({
                datosh: datosEnvio() + this.form.numero_SER4C4 + '|' + localStorage.Usuario + '|'
            }, get_url("APP/SALUD/SER4C4A.DLL"))
                .then((data) => {
                    console.log(data)
                    CON851('', 'Plano creado correctamente', null, 'success', 'Exito');
                    for (var i in data.RUTAS) {
                        var nombretxt = data.RUTAS[i].replace('.TXT', '');
                        let datosEnvio = {
                            nombre_txt: nombretxt,
                        };
                        $.ajax({
                            data: datosEnvio,
                            type: 'POST',
                            async: false,
                            url: get_url('app/Inc/_crearRIPS.php')
                        }).done(function (data) {
                            if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
                                console.error('problemas para crear el txt');
                            } else {
                                let texto = data.split(/\r\n/);
                                let datos = '';
                                for (var i in texto) {
                                    if (i == 0) {
                                        datos = `${texto[i].trim()}`;
                                    } else {
                                        if (texto[i].trim() != '') {
                                            datos = `${datos}\r\n${texto[i].trim()}`;
                                        }
                                    }
                                }
                                const buffer = Buffer.from(datos, 'latin1');
                                fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, buffer, { encoding: 'binary' }, function (err) {
                                    if (err) return console.error(err);
                                });
                            }
                        });
                    }
                    _toggleNav()
                })
                .catch((error) => {
                    console.error(error);
                    this._aceptarprefijo_SER4C4();
                });

            // $_this = this
            // var ventanacopiar = bootbox.dialog({
            //     size: 'large',
            //     title: 'Copiar archivos a la unidad',
            //     message: '<div class="row"> ' +
            //         '<div class="col-md-12"> ' +

            //         '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            //         '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + 'Copiar archivos a la unidad' + '</label> ' +
            //         '<div class="col-md-8 col-sm-6 col-xs-6" id="COPIAR_SER4C4"> ' +
            //         '<input id="ruta_SER4C4" class="form-control input-md" data-orden="1" maxlength="80> ' +
            //         '</div> ' +
            //         '</div> ' +
            //         '<div class="salto-linea"></div>' +
            //         '</div>' +
            //         '</div>',
            //     buttons: {
            //         confirm: {
            //             label: 'Aceptar',
            //             className: 'btn-primary',
            //             callback: function () {
            //                 ventanacopiar.off('show.bs.modal');
            //                 setTimeout(() => { $_this._evaluarnit_SER4C4() }, 500)
            //             }
            //         },
            //         cancelar: {
            //             label: 'Cancelar',
            //             className: 'btn-danger',
            //             callback: function () {
            //                 ventanacopiar.off('show.bs.modal');
            //                 setTimeout(function () { _toggleNav }, 300)
            //             }
            //         }
            //     }
            // });
            // ventanacopiar.init($('.modal-footer').hide());
            // ventanacopiar.init(this._evaluarenvio_SER4C4);
            // ventanacopiar.on('shown.bs.modal', function () {
            //     $("#ruta_SER4C4").focus();
            // });
        },
        _evaluarenvio_SER613G() {
            _inputControl("disabled");
            if (this.SER613G.UNIDADCOPIARW.trim() == '')
                this.SER613G.UNIDADCOPIARW = "C:\FURIPS"
            validarInputs({
                form: '#COPIAR_SER4C4',
                orden: "1",
                event_f5: () => {
                    _toggleNav
                }
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER613G.UNIDADCOPIARW = $('#ruta_SER4C4').val().toUpperCase();
                    $('#ruta_SER4C4').val(this.SER613G.UNIDADCOPIARW)
                    _FloatText({ estado: 'off' })
                    $('.btn-primary').click();
                }
            )
        },

        ///////////////////////VENTANAS F8///////////////////////////

        _f8elecenvio_SER4C4() {
            var $_this = this;
            let URL = get_url("APP/SALUD/SER846F.DLL");
            postData({
                datosh: datosEnvio() + 20 + $_this.SER4C4.ANO_LNK + $_this.SER4C4.MES_LNK
            }, URL)
                .then((data) => {
                    loader("hide");
                    $_this.SER4C4.FILTROFURIPS = data.FURIPS;
                    $_this.SER4C4.FILTROFURIPS.pop()
                    _ventanaDatos({
                        titulo: "VENTANA DE ENVIOS FACTURA ELECTRONICA",
                        columnas: ["CONSECUTIVO", "FECHA", "FACT1", 'FACT2', 'FACT3', 'FACT4', 'FACT5', 'FACT6', 'FACT7', 'FACT8', 'FACT9'],
                        data: $_this.SER4C4.FILTROFURIPS,
                        ancho: '90%',
                        callback_esc: function () {
                            $(".numeroelec_SER4C4").focus();
                        },
                        callback: function (data) {
                            $_this.form.numero_SER4C4 = data.CONSECUTIVO
                            _enterInput('.numeroelec_SER4C4');
                        }
                    });

                })
                .catch((error) => {
                    console.log(error)
                    $_this.form.numero_SER4C4
                });
        },
        _f8entidad_SER4C4() {
            $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.entidad_SER4C4 = data.COD.trim();
                    _enterInput('.terceros_SER4C4');
                },
                cancel: () => {
                    _enterInput('.terceros_SER4C4');
                }
            };
            F8LITE(parametros);
        },
        _f8factura_SER4C4() {
            parametros = {
                dll: 'NUMERACION',
                valoresselect: ['Buscar por tercero', 'buscar por paciente'],
                f8data: 'NUMERACION',
                columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                callback: (data) => {
                    $_this.SER4C4.FACT = data.COD;
                    $_this.form.facturatabla_SER4C4 = $_this.SER4C4.FACT.substring(1, 7)
                    _enterInput('.numeracion_SER4C4');
                },
                cancel: () => {
                    _enterInput('.numeracion_SER4C4');
                }
            };
            F8LITE(parametros);
        }
    },
});











