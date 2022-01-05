// 28/12/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#SER442",
    data: {
        SER442: [],
        tablafactenvio_SER442: [],
        mostrarbotonelim: false,
        ocultarbotonelim: false,
        form: {
            Envios_SER442: "",
            novedad_SER442: "",
            numero_SER442: "",
            entidad_SER442: "",
            descripentid_SER442: "",
            ano_SER442: "",
            mes_SER442: "",
            dia_SER442: "",
            perido_SER442: "",
            costo_SER442: "",
            descripcosto_SER442: "",
            oper_SER442: "",
            md_SER442: "",
            eps_SER442: "",
            descripeps_SER442: "",
            prefijotabla_SER442: "",
            facturatabla_SER442: "",
            itemtabla_SER442: 1,
            ingreseok_SER442: "",
            tienecufe_SER442: ""
        },
        RIPS: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,7,7,4,2,1 - Genera archivos de Rips");
        $_this = this;
        $_this.SER442.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SER442.ANO_LNK = $_this.SER442.FECHA_LNK.substring(0, 2);
        $_this.SER442.MES_LNK = $_this.SER442.FECHA_LNK.substring(2, 4);
        $_this.SER442.DIA_LNK = $_this.SER442.FECHA_LNK.substring(4, 6);
        $_this.SER442.FECHAACTUAL = moment().format("YYYYMMDD");
        $_this.SER442.ANOACTUAL = $_this.SER442.FECHAACTUAL.substring(0, 4)
        $_this.SER442.MESACTUAL = $_this.SER442.FECHAACTUAL.substring(4, 6)
        $_this.SER442.DIAACTUAL = $_this.SER442.FECHAACTUAL.substring(6, 8)
        $_this.SER442.ENTIDADTERCERO = ''
        $_this.SER442.SOAT = '';
        $_this.SER442.MINI = '';
        $_this.SER442.PYP = '';
        $_this.SER442.AUTORFACT = '';
        $_this.SER442.SWCAPI = '';
        $_this.SER442.SWDIAG = '';
        $_this.SER442.SWCONCEN = '';
        $_this.SER442.SWCOPA = '';
        $_this.SER442.SW6408 = '';
        $_this.SER442.SUCW = '';
        $_this.SER442.SWFECHASER = '';
        $_this.SER442.SWQX = '';
        $_this.SER442.SWLOTE = '';
        $_this.SER442.SWPTMV = '';
        $_this.SER442.SWMSI = '';
        $_this.SER442.SWDECI = "";
        $_this.SER442.SWSEPARAR = "";
        $_this.SER442.PREFIJO = '';
        $_this.SER442.CODCOSTO = '';
        $_this.SER442.ACU51 = '';
        $_this.SER442.SWVLRDROG = '';
        $_this.SER442.SWABONO = '';
        $_this.SER442.CODPRESTNI = '';
        obtenerDatosCompletos({
            nombreFd: 'PREFIJOS',
        }, function (data) {
            loader("hide");
            $_this._evaluarfechaempezar_SER442()
            $_this.SER442.PREFIJOS = data.PREFIJOS;
            $_this.SER442.PREFIJOS.pop()
            obtenerDatosCompletos({
                nombreFd: 'ENTIDADES'
            }, function (data) {
                $_this.SER442.ENTIDADES = data.ENTIDADES;
                $_this.SER442.ENTIDADES.pop();
                obtenerDatosCompletos({
                    nombreFd: 'COSTOS'
                }, function (data) {
                    $_this.SER442.COSTO = data.COSTO;
                    $_this.SER442.COSTO.pop();
                    obtenerDatosCompletos({
                        nombreFd: 'SERV_HOSP'
                    }, function (data) {
                        $_this.SER442.SERVICIO = data.SERVICIO;
                        $_this.SER442.SERVICIO.pop();
                        obtenerDatosCompletos({
                            nombreFd: 'SUCURSALES'
                        }, function (data) {
                            $_this.SER442.SUCURSALES = data.SUCURSAL;
                            // $_this.SER442.SUCURSALES.pop();
                        })
                    })
                })
            })
        })
    },
    methods: {
        _evaluarfechaempezar_SER442() {
            this.SER442.ANONUM = this.SER442.ANO_LNK;
            if (parseInt(this.SER442.ANONUM) > 90) {
                this.SER442.ANOINIW = parseInt(this.SER442.ANONUM) + 1900;
            } else {
                this.SER442.ANOINIW = parseInt(this.SER442.ANONUM) + 2000;
            }
            this.SER442.MESNUM = this.SER442.MES_LNK;
            this.SER442.MESINIW = this.SER442.MESNUM;
            this.SER442.DIAINIW = '01';
            this.SER442.FECHAINIW = this.SER442.ANOINIW + this.SER442.MESINIW + this.SER442.DIAINIW
            this.SER442.PERINILOCAL = this.SER442.ANOINIW + this.SER442.MESINIW;
            switch (parseInt(this.SER442.MESINIW)) {
                case 01:
                    this.form.Envios_SER442 = 'ENERO' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 02:
                    this.form.Envios_SER442 = 'FEBRERO' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 03:
                    this.form.Envios_SER442 = 'MARZO' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 04:
                    this.form.Envios_SER442 = 'ABRIL' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 05:
                    this.form.Envios_SER442 = 'MAYO' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 06:
                    this.form.Envios_SER442 = 'JUNIO' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 07:
                    this.form.Envios_SER442 = 'JULIO' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 08:
                    this.form.Envios_SER442 = 'AGOSTO' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 09:
                    this.form.Envios_SER442 = 'SEPTIEMBRE' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 10:
                    this.form.Envios_SER442 = 'OCTUBRE' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 11:
                    this.form.Envios_SER442 = 'NOVIEMBRE' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
                case 12:
                    this.form.Envios_SER442 = 'DICIEMBE' + '/' + this.SER442.ANOINIW
                    this._fechaactual_SER442();
                    break;
            }
        },
        _fechaactual_SER442() {
            this.SER442.ANOCTL = this.SER442.ANOACTUAL;
            if (parseInt(this.SER442.DIAACTUAL >= 20)) {
                if (parseInt(this.SER442.MESACTUAL) == 12) {
                    this.SER442.ANOCTL = parseInt(this.SER442.ANOCTL) + 1;
                    this.SER442.MESCTL = '01';
                } else {
                    this.SER442.MESCTL = parseInt(this.SER442.MESCTL) + 1;
                }
                this.SER442.DIACTL = 10;
                this._validacionabrirarch_SER442()
            } else {
                this.SER442.MESCTL = this.SER442.MESACTUAL;
                this.SER442.DIACTL = this.SER442.DIAACTUAL;
                this._validacionabrirarch_SER442()
            }
        },
        _validacionabrirarch_SER442() {
            this.SER442.FECHACTL = this.SER442.ANOCTL + this.SER442.MESCTL + this.SER442.DIACTL;
            this.SER442.NUIRW = $_USUA_GLOBAL[0].NUIR;
            if (!$.isNumeric(this.SER442.NUIRW)) {
                jAlert({ titulo: 'Error ', mensaje: 'Falta asignar el codigo del prestador actualice el campo de NUIR en datos del usuario opcion 1-1-1 menu de contabilidad' }, _toggleNav);
            } else {
                CON850(this._validarnovedad_SER442);
            }
        },
        _validarnovedad_SER442(novedad) {
            this.form.novedad_SER442 = novedad.id;
            this.form.numero_SER442 = ''
            this.form.entidad_SER442 = ''
            this.form.descripentid_SER442 = ''
            this.form.ano_SER442 = ''
            this.form.mes_SER442 = ''
            this.form.dia_SER442 = ''
            this.form.costo_SER442 = ''
            this.form.descripcosto_SER442 = ''
            this.form.oper_SER442 = ''
            this.form.md_SER442 = ''
            this.form.eps_SER442 = ''
            this.form.descripeps_SER442 = ''
            this.form.prefijotabla_SER442 = ''
            this.form.facturatabla_SER442 = ''
            this.tablafactenvio_SER442 = []
            this.RIPS = []
            this.ocultarbotonelim = false
            this.mostrarbotonelim = false
            if (this.form.novedad_SER442 == "F") {
                _toggleNav();
            } else {
                let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
                this.form.novedad_SER442 = this.form.novedad_SER442 + " - " + novedad[this.form.novedad_SER442];
                console.log(this.form.novedad_SER442, 'NOVEDAD')
                switch (this.form.novedad_SER442.substring(0, 1)) {
                    case '7':
                    case '8':
                        this._asignarnumero_SER442()
                        break;
                    case '9':
                        CON851('49', '49', null, 'error', 'error');
                        setTimeout(function () { CON850(this._validarnovedad_SER442); }, 300)
                        break;
                }
            }
        },
        _asignarnumero_SER442() {
            this.SER442.SECUNUM = "EN"
            let URL = get_url("APP/CONTAB/CON007.DLL");
            postData({ datosh: datosEnvio() + this.SER442.SECUNUM }, URL)
                .then(data => {
                    var data = data.split("|");
                    this.SER442.ULTFECHANUM = data[2].trim();
                    this.SER442.NUMEROCTL = data[1].substring(3, 9);
                    this.SER442.SWSTOP = '0';
                    if (this.form.novedad_SER442.substring(0, 1) == '7') {
                        this.form.numero_SER442 = this.SER442.NUMEROCTL;
                        this._leernumero_SER442();
                    } else {
                        this.form.numero_SER442 = parseInt(this.SER442.NUMEROCTL) - 1
                        this._datonumero_SER442();
                    }
                })
                .catch(err => {
                    console.debug(err);
                    setTimeout(function () { CON850(this._validarnovedad_SER442); }, 300)
                })

        },
        _datonumero_SER442() {
            validarInputs({
                form: "#NUMERO_SER442",
                orden: '1'
            },
                () => {
                    setTimeout(() => { CON850(this._validarnovedad_SER442) }, 300)
                },
                () => {
                    this.tablafactenvio_SER442 = []
                    this.RIPS = []
                    this._leernumero_SER442();
                }
            )
        },
        _leernumero_SER442() {
            if (this.form.numero_SER442 == 0) {
                this._datonumero_SER442()
            } else {
                this.form.numero_SER442 = this.form.numero_SER442.toString().padStart(6, '0')
                postData({ datosh: datosEnvio() + '1|' + this.form.novedad_SER442.substring(0, 1) + '|' + this.form.numero_SER442 + '|' },
                    get_url("APP/SALUD/SER442.DLL"))
                    .then((data) => {
                        console.log(data)
                        this.SER442.ENVIOS = data.ENVIOS[0];
                        if (this.form.novedad_SER442.substring(0, 1) == '7') {
                            CON851('00', '00', null, 'error', 'error');
                            setTimeout(function () { CON850(this._validarnovedad_SER442); }, 300)
                        } else if (this.form.novedad_SER442.substring(0, 1) == '8') {
                            this._llenardatos_SER442();

                        }
                    })
                    .catch((error) => {
                        // console.error(error);
                        if (this.form.novedad_SER442.substring(0, 1) == '7') {
                            this._registronuevo_SER442();
                        } else if (error.MENSAJE == "01" && this.form.novedad_SER442.substring(0, 1) == '8') {
                            this._datonumero_SER442();
                        } else {
                            this._datonumero_SER442();
                        }
                    });
            }
        },
        _registronuevo_SER442() {
            this.SER442.ANOPERW = this.SER442.ANOINIW;
            this.SER442.MESPERW = this.SER442.MESINIW;
            this.SER442.ANOINIW = this.SER442.ANOINIW.toString()
            this.SER442.PERINIW = this.SER442.ANOPERW + this.SER442.MESPERW;

            this.form.ano_SER442 = this.SER442.ANOINIW
            this.form.mes_SER442 = this.SER442.MESACTUAL
            this.form.dia_SER442 = this.SER442.DIAACTUAL
            this.form.perido_SER442 = this.SER442.PERINIW
            this.tablafactenvio_SER442 = []
            this._evaluarnit_SER442()
        },
        _evaluarnit_SER442() {
            validarInputs(
                {
                    form: "#ENTIDADES_SER442",
                    orden: '1',
                },
                () => { CON850(this._validarnovedad_SER442) },
                () => {
                    if (this.form.entidad_SER442.toString().trim() == "") {
                        CON851("01", "01", this._evaluarnit_SER442(), "error", "error");
                    } else {
                        this.form.entidad_SER442 = this.form.entidad_SER442.toString().padStart(10, "0")
                        let URL = get_url("APP/CONTAB/CON802_01.DLL");
                        postData({
                            datosh: datosEnvio() + this.form.entidad_SER442 + "|",
                        }, URL)
                            .then(data => {
                                this.SER442.TERCEROS = data.TERCER[0];
                                this.SER442.DVTERCERO = this.SER442.TERCEROS.DV.trim()
                                this.form.descripentid_SER442 = this.SER442.TERCEROS.DESCRIP_TER.trim()
                                this.SER442.ACTTERCERO = this.SER442.TERCEROS.ACT_TER
                                this.SER442.ENTIDADTERCERO = this.SER442.TERCEROS.ENTIDAD
                                this._asignarparticular_SER442()
                            }).catch(error => {
                                console.error(error)
                                this._evaluarnit_SER442()
                            });
                    }
                }
            )
        },
        _asignarparticular_SER442() {
            if(this.form.novedad_SER442.substring(0, 1) == '8')this.ocultarbotonelim = true
            if(this.form.novedad_SER442.substring(0, 1) == '7')this.mostrarbotonelim = true
            if (($_USUA_GLOBAL[0].NIT == 800162035) && (this.form.entidad_SER442 == 9998 || this.form.entidad_SER442 == 9999)) {
                this.SER442.SWPARTIC = '0';
            } else {
                if ((this.SER442.ACTTERCERO == '25' || this.SER442.ACTTERCERO == '30' || this.SER442.ACTTERCERO == '27') && ($_USUA_GLOBAL[0].NIT == 9998 || $_USUA_GLOBAL[0].NIT == 9999)) {
                    this.SER442.SWPARTIC = '1';
                } else {
                    this.SER442.SWPARTIC = '0';
                }
            }
            this._leerentidad_SER442()
        },
        _leerentidad_SER442() {
            const res = this.SER442.ENTIDADES.find(e => e['COD-ENT'] == this.SER442.ENTIDADTERCERO);
            if (res == undefined) {
                jAlert({ titulo: 'Error ', mensaje: 'No existe el codigo de la entidad debe actualizar el campo de la entidad en el tercero del cliente opcion 1-3-1' }, this._evaluarnit_SER442);
            } else {
                this.form.descripeps_SER442 = res['NOMBRE-ENT']
                this.form.eps_SER442 = res['COD-ENT']
                this._evaluarfechaini_SER442('1')
            }
        },
        _evaluarfechaini_SER442(orden) {
            if (this.form.mes_SER442.trim() == '') {
                this.SER442.ANOINIW = this.SER442.ANOINIW.toString()
                this.form.ano_SER442 = this.SER442.ANOINIW
                this.form.mes_SER442 = this.SER442.MESACTUAL
                this.form.dia_SER442 = this.SER442.DIAACTUAL
            }
            validarInputs(
                {
                    form: "#FECHAINI_SER442",
                    orden: orden,
                },
                () => { this._evaluarnit_SER442() },
                () => {
                    if (this.form.ano_SER442 < this.SER442.ANOINIW || this.form.ano_SER442.toString().trim() == "") {
                        CON851("", "Año incorrecto! ", this._evaluarfechaini_SER442("1"), "error", "error");
                    } else {
                        this.form.mes_SER442 = this.form.mes_SER442.padStart(2, '0')
                        if (this.form.mes_SER442.toString().trim() == "" || parseInt(this.form.mes_SER442) < 1 || parseInt(this.form.mes_SER442) > 12) {
                            CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER442("2"), "error", "error");
                        } else {
                            if (this.form.novedad_SER442.substring(0, 1) == '7') {
                                switch (this.form.mes_SER442) {
                                    case '01':
                                        this.SER442.DIAMAX = 31;
                                        this._datodia_SER442();
                                        break;
                                    case '02':
                                        if ((parseInt(this.form.ano_SER442) == 2012) || (parseInt(this.form.ano_SER442) == 2016) || (parseInt(this.form.ano_SER442) == 2020) || (parseInt(this.form.ano_SER442) == 2024) || (parseInt(this.form.ano_SER442) == 2028)) {
                                            this.SER442.DIAMAX = 29;
                                            this._datodia_SER442();
                                        } else {
                                            this.SER442.DIAMAX = 28;
                                            this._datodia_SER442();
                                        }
                                        break;
                                    case '03':
                                        this.SER442.DIAMAX = 31;
                                        this._datodia_SER442();
                                        break;
                                    case '04':
                                        this.SER442.DIAMAX = 30;
                                        this._datodia_SER442();
                                        break;
                                    case '05':
                                        this.SER442.DIAMAX = 31;
                                        this._datodia_SER442();
                                        break;
                                    case '06':
                                        this.SER442.DIAMAX = 30;
                                        this._datodia_SER442();
                                        break;
                                    case '07':
                                        this.SER442.DIAMAX = 31;
                                        this._datodia_SER442();
                                        break;
                                    case '08':
                                        this.SER442.DIAMAX = 31;
                                        this._datodia_SER442();
                                        break;
                                    case '09':
                                        this.SER442.DIAMAX = 30;
                                        this._datodia_SER442();
                                        break;
                                    case '10':
                                        this.SER442.DIAMAX = 31;
                                        this._datodia_SER442();
                                        break;
                                    case '11':
                                        this.SER442.DIAMAX = 30;
                                        this._datodia_SER442();
                                        break;
                                    case '12':
                                        this.SER442.DIAMAX = 31;
                                        this._datodia_SER442();
                                        break;
                                    default:
                                        this._evaluarfechaini_SER442('2')
                                        break;
                                }
                            } else {
                                this._datodia_SER442();
                            }
                        }
                    }
                },
            );
        },
        _datodia_SER442() {
            if (this.form.dia_SER442 == 0) {
                this.form.dia_SER442 = this.SER442.DIAMAX;
            }
            validarInputs(
                {
                    form: "#FECHADIANI_SER442",
                    orden: '1'
                },

                () => {
                    this._evaluarfechaini_SER442("2")
                },
                () => {
                    this.form.dia_SER442 = this.form.dia_SER442.toString().padStart(2, '0')
                    this.SER442.FECHAENVW = this.form.ano_SER442 + this.form.mes_SER442 + this.form.dia_SER442;
                    if (this.form.dia_SER442 < 1 || this.form.dia_SER442 > SER442.DIAMAX) {
                        return this._datodia_SER442();
                    }
                    if (parseInt(this.SER442.FECHAENVW) < parseInt(this.SER442.FECHAINIW) || parseInt(this.SER442.FECHAENVW) > parseInt(this.SER442.FECHACTL)) {
                        CON851('37', '37', null, 'error', 'error');
                        return this._datodia_SER442()
                    } else {
                        this._datocosto_SER442()
                    }
                }
            )
        },
        _datocosto_SER442() {
            console.log('dato costo')
            if (this.form.costo_SER442.trim() == '') this.form.costo_SER442 = '****';
            validarInputs(
                {
                    form: "#CCOSTO_SER442",
                    orden: '1'
                },
                () => { this._datodia_SER442(); },
                () => {
                    this.form.costo_SER442 = this.form.costo_SER442.padStart(4, '0')
                    if (SER442.CODCOSTO == '0000') {
                        CON851('02', '02', null, 'error', 'error');
                        this._datocosto_SER442()
                    } else {
                        if (this.form.costo_SER442 == '****') {
                            this.form.descripcosto_SER442 = 'TODOS';
                            this._validacionprefijo_SER442()
                        } else {
                            const res = this.SER442.COSTO.find(e => e.COD == this.form.costo_SER442);
                            if (res == undefined) {
                                CON851('01', '01', null, 'error', 'error');
                                this._datocosto_SER442()
                            } else {
                                this.form.descripcosto_SER442 = res.NOMBRE
                                this._validacionprefijo_SER442()
                            }
                        }
                    }
                }
            )
        },
        _validacionprefijo_SER442() {
            if (this.form.prefijotabla_SER442 == '*' || this.form.prefijotabla_SER442.trim() == '') this.form.prefijotabla_SER442 = "A";
            this.form.itemtabla_SER442 = this.tablafactenvio_SER442.length + 1;
            if (this.SER442.SWSTOP == '1') {
                CON851('7T', '7T', null, 'error', 'error');
                $_this = this
                $_OPSEGU = 'IS74D';
                let datos_envio = datosEnvio()
                datos_envio += localStorage.Usuario + '|' + $_OPSEGU
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        $_this._aceptarprefijo_SER442();
                    })
                    .catch(err => {
                        console.debug(err);
                        $_this._ventanasoat_SER442();
                    })
            } else {
                this._aceptarprefijo_SER442();
            }
        },

        _aceptarprefijo_SER442() {
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
            if (this.form.novedad_SER442.substring(0, 1) == '8') {
                let elementos = document.getElementsByClassName('BOTONBORRAR1')
                console.log(elementos)
                for (var i = 0; i < elementos.length; i++) {
                    elementos[i].classList.remove('hidden');
                }
            }
            validarInputs(
                {
                    form: "#PREFIJO_SER442",
                    orden: '1',
                    event_f3: this._ventanasoat_SER442
                }, this._datocosto_SER442,
                () => {
                    this.form.prefijotabla_SER442 = this.form.prefijotabla_SER442.toUpperCase();
                    if ((this.form.prefijotabla_SER442 == "A") || (this.form.prefijotabla_SER442 == "B") || (this.form.prefijotabla_SER442 == "D") || (this.form.prefijotabla_SER442 == "F")
                        || (this.form.prefijotabla_SER442 == "G") || (this.form.prefijotabla_SER442 == "H") || (this.form.prefijotabla_SER442 == "I") || (this.form.prefijotabla_SER442 == "J")
                        || (this.form.prefijotabla_SER442 == "K") || (this.form.prefijotabla_SER442 == "L") || (this.form.prefijotabla_SER442 == "M") || (this.form.prefijotabla_SER442 == "N")
                        || (this.form.prefijotabla_SER442 == "O") || (this.form.prefijotabla_SER442 == "P") || (this.form.prefijotabla_SER442 == "Q") || (this.form.prefijotabla_SER442 == "R")
                        || (this.form.prefijotabla_SER442 == "S") || (this.form.prefijotabla_SER442 == "T") || (this.form.prefijotabla_SER442 == "V") || (this.form.prefijotabla_SER442 == "W")
                        || (this.form.prefijotabla_SER442 == "X") || (this.form.prefijotabla_SER442 == "Y") || (this.form.prefijotabla_SER442 == "Z") || (this.form.prefijotabla_SER442 == "*")) {
                        if (this.form.prefijotabla_SER442 == "*" && this.SER442.SWPARTIC == '0') {
                            this._buscartodas_SER442();
                        } else {
                            this._aceptarnumero_SER442();
                        }
                    } else {
                        this._aceptarprefijo_SER442();
                    }
                }
            )
        },
        _aceptarnumero_SER442() {
            _FloatText({ estado: 'off' })
            validarInputs(
                {
                    form: "#FACTURAS_SER442",
                    orden: '1'
                },
                () => { this._aceptarprefijo_SER442(); },
                () => {
                    this.form.facturatabla_SER442 = this.form.facturatabla_SER442.padStart(6, '0')
                    if (this.form.prefijotabla_SER442 == "*") {
                        this._buscartodas_SER442();
                    } else {
                        if (this.form.facturatabla_SER442.trim() == '') {
                            CON851('01', '01', null, 'error', 'error');
                            this._aceptarnumero_SER442();
                        } else {
                            this.SER442.LLAVENUM = this.form.prefijotabla_SER442 + this.form.facturatabla_SER442;
                            let URL = get_url("APP/SALUD/SER808-01.DLL");
                            postData({
                                datosh: datosEnvio() + this.SER442.LLAVENUM + "|",
                            }, URL)
                                .then(data => {
                                    this.SER442.NUMER = data.NUMER19[0];
                                    this.SER442.NITNUM = this.SER442.NUMER.NIT_NUM.trim()
                                    this.SER442.DESCRIPNUM = this.SER442.NUMER.DESCRIP_NUM.trim()
                                    this.SER442.FECHASALNUM = this.SER442.NUMER.FECHA_RET.trim()
                                    this.SER442.ANORETNUM = this.SER442.FECHASALNUM.substring(0, 4);
                                    this.SER442.MESRETNUM = this.SER442.FECHASALNUM.substring(4, 6);
                                    this.SER442.DIARETNUM = this.SER442.FECHASALNUM.substring(6, 8);
                                    this.SER442.FACTCAPITNUM = this.SER442.NUMER.FACTCAPIT_NUM.trim()
                                    this.SER442.CCOSTONUM = this.SER442.NUMER.COSTO_NUM
                                    this.SER442.ENVIONUM = this.SER442.NUMER.ENVIO_NUM.trim()
                                    this.SER442.ESTADONUM = this.SER442.NUMER.ESTADO_NUM
                                    this.form.tienecufe_SER442 = 'NO'
                                    if(this.SER442.NUMER.CUFEELEC_NUM.trim() != ''){
                                        this.form.tienecufe_SER442 = 'SI'
                                    }
                                    if (this.SER442.ESTADONUM == '1') {
                                        if (this.form.costo_SER442 == '****') {
                                            this._novedadtabla_SER442();
                                        } else {
                                            if (this.form.costo_SER442 == this.SER442.CCOSTONUM) {
                                                this._novedadtabla_SER442();
                                            } else {
                                                CON851('61', '61', null, 'error', 'error');
                                                this._aceptarnumero_SER442();
                                            }
                                        }
                                    } else {
                                        CON851('', 'Estado de la factura no valido!', null, 'error', 'error');
                                        this._aceptarnumero_SER442()
                                    }
                                })
                                .catch(error => {
                                    console.error(error)
                                    this._aceptarnumero_SER442();
                                });
                        }
                    }
                })
        },
        _novedadtabla_SER442() {
            validarInputs(
                {
                    form: "#OK_SER442",
                    orden: '1'
                },
                () => { this._aceptarnumero_SER442(); },
                () => {

                    this.form.ingreseok_SER442 = this.form.ingreseok_SER442.toUpperCase();
                    if (this.form.ingreseok_SER442 == 'R') {
                        $_this = this
                        let datos_envio = datosEnvio()
                        datos_envio += localStorage.Usuario + '|IS74D|'
                        let URL = get_url("APP/CONTAB/CON904.DLL");
                        postData({ datosh: datos_envio }, URL)
                            .then(function (data) {
                                $_this._otrasvalidaciones_SER442();
                            })
                            .catch(err => {
                                console.debug(err);
                                $_this._novedadtabla_SER442();
                            })

                    } else {
                        this._otrasvalidaciones_SER442();
                    }
                })
        },
        _otrasvalidaciones_SER442() {
            if (this.form.ingreseok_SER442 == 'R') {
                this._borrartabla_SER442();
            } else if (this.form.ingreseok_SER442.trim() == '') {
                if (this.SER442.NITNUM != this.form.entidad_SER442) {
                    CON851('06', '06', null, 'error', 'error');
                    if (this.form.ingreseok_SER442 != 'R') {
                        this._aceptarnumero_SER442();
                    } else {
                        this._borrartabla_SER442();
                    }
                } else if (this.SER442.FACTCAPITNUM == this.SER442.LLAVENUM) {
                    if (this.form.ingreseok_SER442 == 'R') {
                        this._cuartavalidacion_SER442();
                    } else {
                        if ($_USUA_GLOBAL[0].NIT == 800162035) {
                            this._cuartavalidacion_SER442();
                        } else {
                            CON851('1W', '1W', null, 'error', 'error');
                            this._aceptarnumero_SER442();
                        }
                    }
                } else {
                    if (this.SER442.FACTCAPITNUM == 0 || this.SER442.FACTCAPITNUM == "0") this.SER442.FACTCAPITNUM = " "
                    this.SER442.FACTCAPITNUM.trim() != '' ? this._consultafactacapita_SER442() : this._cuartavalidacion_SER442()
                }
            } else {
                this._novedadtabla_SER442();
            }
        },
        _consultafactacapita_SER442() {
            let URL = get_url("APP/SALUD/SER808-01.DLL");
            postData({
                datosh: datosEnvio() + this.SER442.FACTCAPITNUM + "|",
            }, URL)
                .then(data => {
                    this.SER442.NUMCAPITA = data.NUMER19[0];
                    this.SER442.ESTADOCAPITANUM = this.SER442.NUMCAPITA.ESTADO_NUM
                    if (this.SER442.ESTADOCAPITANUM == '1') {
                        this._cuartavalidacion_SER442()
                    } else {
                        CON851('', `${'Factura capita esta abierta '}${this.SER442.FACTCAPITNUM}`, null, 'error', 'error')
                        this._novedadtabla_SER442()
                    }
                })
                .catch(error => {
                    console.error(error)
                    this._novedadtabla_SER442()
                });
        },
        _cuartavalidacion_SER442() {
            if (this.SER442.ANORETNUM == this.SER442.ANOINIW && this.SER442.MESRETNUM == this.SER442.MESINIW) {
                this._quintavalidacion_SER442();
            } else {
                if ($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 845000038) {
                    this._quintavalidacion_SER442();
                } else {
                    CON851('', 'Factura con fecha fuera de rango', null, 'error', 'error');
                    if (this.form.ingreseok_SER442 != 'R') {
                        this._aceptarnumero_SER442();
                    }
                }
            }
        },
        _quintavalidacion_SER442() {
            if ((parseInt(this.SER442.ENVIONUM) > 0) && (parseInt(this.SER442.ENVIONUM) != parseInt(this.form.numero_SER442))) {
                CON851('9J', '9J', null, 'error', 'error');
                if (this.form.ingreseok_SER442 == 'R' || $_USUA_GLOBAL[0].NIT == 0900047282) {
                    this._adicionatabla_SER442();
                } else {
                    this._aceptarnumero_SER442();
                }
            } else {
                this._adicionatabla_SER442();
            }
        },
        //////////////VALIDACIONES DE TABLA/////////////////////
        _borrartabla_SER442() {
            if (this.form.novedad_SER442.substring(0, 1) == '8') {
                $_this = this
                let URL = get_url("APP/SALUD/SER442.DLL");
                postData({ datosh: datosEnvio() + '4|' + '|||||||||||||||' + $_this.form.prefijotabla_SER442 + $_this.form.facturatabla_SER442 + '|' + localStorage.Usuario + '|' }, URL)
                    .then((data) => {
                        console.log(data, '-', this.form.prefijotabla_SER442 + this.form.facturatabla_SER442)
                        CON851('', `${'Factura Eliminada: '}${$_this.form.prefijotabla_SER442 + $_this.form.facturatabla_SER442}`, null, 'error', 'error');
                        CON851("", "Recuerde grabar el envio porfavor! ya que realizo una eliminación ", "", "warning", "");
                        $_this.RIPS = []
                        for (var i in $_this.tablafactenvio_SER442) {
                            if ($_this.tablafactenvio_SER442[i].NUMERO == $_this.form.facturatabla_SER442 && $_this.tablafactenvio_SER442[i].PREFIJO == $_this.form.prefijotabla_SER442) {
                                $_this.SER442.ITEMW = i
                                $_this.tablafactenvio_SER442.splice($_this.SER442.ITEMW, 1);
                            }
                        }
                        $_this.RIPS.push($_this.tablafactenvio_SER442)
                        setTimeout($_this._inicializa_SER442(), 300);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                for (var i in this.tablafactenvio_SER442) {
                    if (this.tablafactenvio_SER442[i].NUMERO == this.form.facturatabla_SER442 && this.tablafactenvio_SER442[i].PREFIJO == this.form.prefijotabla_SER442) {
                        this.SER442.ITEMW = i
                        this.tablafactenvio_SER442.splice(this.SER442.ITEMW, 1);
                    }
                }
                setTimeout(this._inicializa_SER442(), 300);
            }
            this.form.itemtabla_SER442 = this.tablafactenvio_SER442.length
            setTimeout(this._aceptarprefijo_SER442(), 500);
        },
        _adicionatabla_SER442() {
            let factura = this.RIPS.filter(x => x.FACTURA == this.form.prefijotabla_SER442 + this.form.facturatabla_SER442);
            if (factura.length > 0) {
                CON851("", "Factura repetida", this._aceptarnumero_SER442(), "error", "Error");
            } else {
                this.tablafactenvio_SER442.push({
                    PREFIJO: this.form.prefijotabla_SER442,
                    NUMERO: this.form.facturatabla_SER442,
                    ELECT: this.form.tienecufe_SER442
                });
                this.RIPS.push({ FACTURA: this.form.prefijotabla_SER442 + this.form.facturatabla_SER442 })
                this._inicializa_SER442()
                if (this.tablafactenvio_SER442.length > 4500) {
                    CON851P("01", this._aceptarprefijo_SER442, this._evaluargrabado_SER442)
                } else {
                    this.form.itemtabla_SER442++
                    let numerofact = this.tablafactenvio_SER442
                    numerofact.sort((a, b) => {
                        if (a.NUMERO > b.NUMERO) {
                            return 1;
                        }
                        if (a.NUMERO < b.NUMERO) {
                            return -1;
                        }
                        return 0;
                    })
                    this._aceptarprefijo_SER442()
                }
            }
        },
        _inicializa_SER442() {
            this.form.prefijotabla_SER442 = ''
            this.form.facturatabla_SER442 = ''
            this.form.ingreseok_SER442 = ''
            this.form.tienecufe_SER442 = ''
        },
        /////////////////////////OTRAS VALIDACIONES///////////
        _llenardatos_SER442() {
            this.form.entidad_SER442 = this.SER442.ENVIOS.NIT
            this.form.descripentid_SER442 = this.SER442.ENVIOS.DESCRIPTER
            this.form.ano_SER442 = this.SER442.ENVIOS.FECHA_ENV.substring(0, 4)
            this.form.mes_SER442 = this.SER442.ENVIOS.FECHA_ENV.substring(4, 6)
            this.form.dia_SER442 = this.SER442.ENVIOS.FECHA_ENV.substring(6, 8)
            this.form.oper_SER442 = this.SER442.ENVIOS.OPER + ' ' + this.SER442.ENVIOS.FECHA_CRE
            this.form.md_SER442 = this.SER442.ENVIOS.OPER_MOD + ' ' + this.SER442.ENVIOS.FECHA_MOD
            this.form.eps_SER442 = this.SER442.ENVIOS.ENTIDAD
            this.form.descripeps_SER442 = this.SER442.ENVIOS.DESCRIPENT
            this.form.perido_SER442 = this.SER442.ENVIOS.PER_ENV
            this.SER442.OBSERV = this.SER442.ENVIOS.OBSERV
            this.SER442.SOAT = this.SER442.ENVIOS.SOAT
            this.SER442.MINI = this.SER442.ENVIOS.MINI
            this.SER442.PERINIW = this.SER442.ENVIOS.PER_ENV
            this.SER442.ENVIOS.TAB_REG_ENV.pop()
            let numerofact = this.SER442.ENVIOS.TAB_REG_ENV
            numerofact.sort((a, b) => {
                if (a.NUMERO > b.NUMERO) {
                    return 1;
                }
                if (a.NUMERO < b.NUMERO) {
                    return -1;
                }
                return 0;
            })
            this.tablafactenvio_SER442 = this.SER442.ENVIOS.TAB_REG_ENV
            for (var i in this.tablafactenvio_SER442) {
                this.RIPS.push({ FACTURA: this.tablafactenvio_SER442[i].PREFIJO + this.tablafactenvio_SER442[i].NUMERO })
            }
            this.SER442.FECHACRE = this.SER442.ENVIOS.FECHA_CRE
            this.SER442.OPER = this.SER442.ENVIOS.OPER
            this.SER442.ENTIDADTERCERO = this.SER442.ENVIOS.ENTIDAD
            this.SER442.ACTTERCERO = this.SER442.ENVIOS.ACTTER
            if (parseInt(this.SER442.ENVIOS.PER_ENV.substring(4, 6)) == 0) {
                this.SER442.PERINIW = this.SER442.PERINILOCAL
                return this._datonumero_SER442()
            }
            if (this.SER442.ENVIOS.SEG == 'S') this.SER442.SWSTOP = '1'
            if (this.SER442.PERINILOCAL != this.SER442.PERINIW) {
                CON851('37', '37', this._datonumero_SER442(), 'error', 'error');
            } else {
                this._asignarparticular_SER442()
            }

        },
        _buscartodas_SER442() {
            loader('show')
            this.SER442.SERVICIOW = '**';
            this.SER442.CIUDADW = '*****';
            this.SER442.ANORETNUM = this.SER442.ANOPERW;
            this.SER442.MESRETNUM = this.SER442.MESPERW;
            this.SER442.DIARETNUM = '01';
            this.SER442.FECHARETNUM = this.SER442.ANORETNUM + this.SER442.MESRETNUM + this.SER442.DIARETNUM;
            postData({ datosh: datosEnvio() + '2|' + this.form.novedad_SER442.substring(0, 1) + '|' + this.form.numero_SER442 + '|' + this.form.entidad_SER442 + '||||||||||' + this.SER442.FECHARETNUM + '|' + this.form.costo_SER442 + '|' + this.SER442.SERVICIOW },
                get_url("APP/SALUD/SER442.DLL"))
                .then((data) => {
                    console.log(data)
                    loader('hide')
                    this.SER442.TODASFACT = data['FACT'];
                    this.SER442.TODASFACT.pop()
                    let numerofact = this.SER442.TODASFACT
                    numerofact.sort((a, b) => {
                        if (a.NUMERO > b.NUMERO) {
                            return 1;
                        }
                        if (a.NUMERO < b.NUMERO) {
                            return -1;
                        }
                        return 0;
                    })
                    this.tablafactenvio_SER442 = this.SER442.TODASFACT
                    if (this.tablafactenvio_SER442.length > 4500) {
                        CON851P("01", this._aceptarprefijo_SER442, this._evaluargrabado_SER442)
                    } else {
                        this._aceptarprefijo_SER442()
                    }
                })
                .catch((error) => {
                    console.error(error);
                    loader('hide')
                    this._aceptarprefijo_SER442()
                });

        },

        ///////////////GRABADO///////////////////////////////////
        _evaluargrabado_SER442() {
            _FloatText({ estado: 'off' })
            if (this.tablafactenvio_SER442.length == 0) {
                if (localStorage.Usuario == "GEBC") {
                    CON851P("01", this._aceptarprefijo_SER442, this._grabar_SER442);
                } else {
                    CON851('', 'Tabla vacia', this._aceptarprefijo_SER442(), 'error', 'error');
                }
            } else {
                if (this.tablafactenvio_SER442.length > 4500) {
                    CON851('', 'Supero el tamaño de la tabla', this._aceptarprefijo_SER442(), 'error', 'error');
                } else {
                    CON851P("01", this._aceptarprefijo_SER442, this._grabar_SER442);
                }
            }
        },
        _grabar_SER442() {
            loader("show");
            if (this.form.novedad_SER442.substring(0, 1) == 8) {
                this.SER442.FECHAMOD = moment().format('YYMMDD');
                this.SER442.OPERMOD = localStorage.Usuario;
            } else {
                this.SER442.FECHACRE = moment().format('YYMMDD');
                this.SER442.OPER = localStorage.Usuario;
                this.SER442.FECHAMOD = ' ';
                this.SER442.OPERMOD = ' ';
            }
            var data = {};
            var lin = 1;
            for (var i in this.tablafactenvio_SER442) {
                data['LIN-' + lin.toString().padStart(4, '0')] = this.tablafactenvio_SER442[i].PREFIJO + this.tablafactenvio_SER442[i].NUMERO + '|';
                lin++;
            }
            data.datosh = `${datosEnvio()}3|${this.form.novedad_SER442.substring(0, 1)}|${this.form.numero_SER442}|${this.form.entidad_SER442}|${this.SER442.PERINIW}|${this.SER442.FECHAENVW}|${this.SER442.OBSERV}|${this.SER442.OPER}|${this.SER442.FECHACRE}|${this.SER442.OPERMOD}|${this.SER442.FECHAMOD}|${this.SER442.MINI}|${this.SER442.SOAT}|`
            postData(data, get_url("APP/SALUD/SER442.DLL"))
                .then(data => {
                    console.log(data, 'ENVIO GRABADO')
                    this.SER442.CONSECUTIVO = data
                    if (this.form.novedad_SER442.substring(0, 1) == '7') {
                        this.SER442.FECHAULTMOV = moment().format("YYMMDD");
                        this.SER442.SECUNUM = "EN"
                        let URL = get_url("APP/CONTAB/CON007X.DLL");
                        postData({ datosh: datosEnvio() + this.SER442.SECUNUM + '|' + this.SER442.FECHAULTMOV + '|' + this.SER442.CONSECUTIVO + '|' }, URL)
                            .then(data => {
                                console.log(data)
                                this._generararchivotransacc_SER442()
                            })
                            .catch(err => {
                                console.error(err);
                                loader("hide");
                                this._aceptarprefijo_SER442();
                            })
                    } else {
                        this._generararchivotransacc_SER442()
                    }
                })
                .catch(err => {
                    console.error(err);
                    loader("hide");
                    this._aceptarprefijo_SER442();
                });
        },
        _generararchivotransacc_SER442() {
            this.SER442.CIUDADW = '';
            this.SER442.ACU29W = '';
            this.SER442.SWAPRVR = 'N';
            let URL = get_url("APP/SALUD/SER442A.DLL");
            postData({ datosh: datosEnvio() + this.form.numero_SER442 + '|' + this.SER442.SWPARTIC + '|' + this.SER442.SWCAPI + '|' + localStorage.Usuario + '|' + this.SER442.CIUDADW + '|' + this.SER442.SWABONO + '|' }, URL)
                .then(data => {
                    this.SER442.ESTADODLL = data.DATOSENV[0];
                    ////////////////////SER442B////////////////////////
                    let URL = get_url("APP/SALUD/SER442B.DLL");
                    postData({
                        datosh: datosEnvio() + this.form.numero_SER442 + '|' + this.SER442.SOAT + '|' + this.SER442.PYP + '|' + this.SER442.MINI + '|' + this.SER442.SWVLRDROG + '|' + this.SER442.ACU29W
                            + '|' + this.SER442.ACU51 + '|' + this.SER442.AUTORFACT + '|' + this.SER442.SWCAPI + '|' + localStorage.Usuario + '|' + this.SER442.CIUDADW + '|' + this.SER442.SWDIAG
                            + '|' + this.SER442.SWCONCEN + '|' + this.SER442.SW6408 + '|' + this.SER442.SUCW + '|' + this.SER442.CODPRESTNI + '|' + this.SER442.SWFECHASER + '|' + this.SER442.SWQX
                            + '|' + this.SER442.SWPTMV + '|' + this.SER442.SWAPRVR + '|' + this.SER442.SWLOTE + '|' + this.SER442.SWMSI + '|' + this.SER442.SWDECI + '|' + this.SER442.SWSEPARAR + '|'
                    }, URL)
                        .then(data => {
                            CON851('', 'Se crea plano AC', null, 'success', 'Exito')
                            CON851('', 'Se crea plano AP', null, 'success', 'Exito')
                            CON851('', 'Se crea plano AM', null, 'success', 'Exito')
                            CON851('', 'Se crea plano AT', null, 'success', 'Exito')
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
                            //////////////////////SER442D////////////
                            let URL = get_url("APP/SALUD/SER442D.DLL");
                            postData({
                                datosh: datosEnvio() + this.form.numero_SER442 + '|' + this.SER442.ENTIDADTERCERO + '|' + this.SER442.ACTTERCERO + '|' + this.SER442.MINI + '|' + localStorage.Usuario + '|' + this.SER442.CIUDADW + '|' + this.SER442.CODPRESTNI + '|' + this.SER442.SWMSI + '|' + this.SER442.SWSEPARAR + '|'
                            }, URL)
                                .then(data => {
                                    CON851('', 'Se crea plano AN', null, 'success', 'Exito')
                                    CON851('', 'Se crea plano US', null, 'success', 'Exito')
                                    CON851('', 'Se crea plano AH', null, 'success', 'Exito')
                                    for (var i in data.RUTAS2) {
                                        var nombretxt = data.RUTAS2[i].replace('.TXT', '');
                                        let datosEnvio = {
                                            nombre_txt: nombretxt,
                                        };
                                        $.ajax({
                                            data: datosEnvio,
                                            type: 'POST',
                                            async: false,
                                            url: get_url('app/Inc/_crearRIPS.php')
                                        }).done(function (data) {
                                            console.log(data);
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
                                    ////////////////////////SER442E////////////
                                    let URL = get_url("APP/SALUD/SER442E.DLL");
                                    postData({
                                        datosh: datosEnvio() + this.form.numero_SER442 + '|' + this.SER442.MINI + '|' + localStorage.Usuario + '|' + this.SER442.CIUDADW + '|' + this.SER442.SWCOPA + '|' + this.SER442.CODPRESTNI + '|' + this.SER442.SWABONO + '|' + this.SER442.SWSEPARAR + '|'
                                    }, URL)
                                        .then(data => {
                                            CON851('', 'Se crea plano CT', null, 'success', 'Exito')
                                            CON851('', 'Se crea plano AF', null, 'success', 'Exito')
                                            CON851('', 'Se crea plano AD', null, 'success', 'Exito')
                                            for (var i in data.RUTAS3) {
                                                var nombretxt = data.RUTAS3[i].replace('.TXT', '');
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
                                            this.SER442.SER442EULT = data;
                                            if (this.SER442.SER442EULT.ESTADO == '08') { CON851('08', 'No existe movimiento en transacciones AF!', null, 'error', 'error'); }
                                            else if (this.SER442.SER442EULT.ESTADO == '07') { CON851('08', 'No existe movimiento en Copagos PU!', null, 'error', 'error'); }
                                            loader("hide");
                                            if (this.SER442.SER442EULT.LLAVE_FACT2.trim() == '') {
                                                _toggleNav()
                                            } else {
                                                _toggleNav()
                                                // console.log(data.LLAVE_FACT2)
                                                // columnas = [
                                                //     {
                                                //         title: "COMPROBANTE",
                                                //         value: 'LLAVE_FACT2',
                                                //     },
                                                //     {
                                                //         title: "FACTURA",
                                                //         value: 'CTA2',
                                                //     },
                                                //     {
                                                //         title: "DESCRIPCIÓN",
                                                //         value: 'DESCRIP2',
                                                //     },
                                                //     {
                                                //         title: "CUP",
                                                //         value: 'CUP2',
                                                //     }
                                                // ]
                                                // _impresion2({
                                                //     tipo: 'excel',
                                                //     header: [
                                                //         { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 14 },
                                                //         `Listado de inconsistencias del envio` + this.form.numero_SER442 + `periodo` + this.SER442.MESACTUAL + `/` + this.SER442.ANOACTUAL,
                                                //     ],
                                                //     logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                                                //     tabla: {
                                                //         columnas,
                                                //         data: data,
                                                //     },
                                                //     archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                                                // })
                                                //     .then(() => {
                                                //         loader("hide");
                                                //         CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
                                                //     })
                                                //     .catch(() => {
                                                //         loader("hide");
                                                //         CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
                                                //     })
                                            }
                                        })
                                        .catch(err => {
                                            loader("hide");
                                            this._aceptarprefijo_SER442();
                                            console.debug(err);
                                        })
                                })
                                .catch(err => {
                                    loader("hide");
                                    this._aceptarprefijo_SER442();
                                    console.debug(err);
                                })
                        })
                        .catch(err => {
                            loader("hide");
                            this._aceptarprefijo_SER442();
                            console.debug(err);
                        })
                })
                .catch(err => {
                    loader("hide");
                    this._aceptarprefijo_SER442();
                    console.debug(err);
                })

        },
        /////////VENTANA SOAT/////////////////////////////////////////
        _eliminarfila_SER442V2(data) {
            this.SER442.TEMPTABLA = data
            _fin_validar_form();
            $_this = this
            if (this.form.novedad_SER442.substring(0, 1) == '8') {
                let datos_envio = datosEnvio()
                datos_envio += localStorage.Usuario + '|IS74D|'
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        let URL = get_url("APP/SALUD/SER442.DLL");
                        postData({ datosh: datosEnvio() + '4|' + '|||||||||||||||' + $_this.SER442.TEMPTABLA.articulo.PREFIJO + $_this.SER442.TEMPTABLA.articulo.NUMERO + '|' + localStorage.Usuario + '|' }, URL)
                            .then((data) => {
                                console.log(data)
                                CON851('', `${'Factura Eliminada: '}${$_this.SER442.TEMPTABLA.articulo.PREFIJO + $_this.SER442.TEMPTABLA.articulo.NUMERO}`, null, 'error', 'error');
                                CON851("", "Recuerde grabar el envio porfavor! ya que realizo una eliminación ", "", "warning", "");
                                $_this.RIPS = []
                                $_this.tablafactenvio_SER442.splice($_this.SER442.TEMPTABLA.item, 1);
                                $_this.RIPS.push($_this.tablafactenvio_SER442)
                                $_this.form.itemtabla_SER442 = $_this.tablafactenvio_SER442.length + 1
                                $_this._aceptarprefijo_SER442()
                            })
                            .catch((error) => {
                                console.log(error);
                                $_this._aceptarprefijo_SER442()
                            });
                    })
                    .catch(err => {
                        console.debug(err);
                        $_this._aceptarprefijo_SER442()
                    })

            } else {
                $_this.tablafactenvio_SER442.splice($_this.SER442.TEMPTABLA.item, 1);
                $_this.form.itemtabla_SER442 = $_this.tablafactenvio_SER442.length + 1
                $_this._aceptarprefijo_SER442()
            }
        },
        _ventanasoat_SER442() {
            _FloatText({ estado: 'off' })
            $_this = this
            var ventanasoat = bootbox.dialog({
                size: 'large',
                title: 'OPCION CODIGOS SOAT',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Desea reemplazar CUPS por SOAT?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="SOAT_SER442"> ' +
                    '<input id="soat_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-5 col-sm-6 col-xs-6 control-label" for="name">' + "Usa nuir 10 digitos?:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="NUIR_SER442"> ' +
                    '<input id="nuir_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="CODNUIR_SER442"> ' +
                    '<input id="codnuir_SER442" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Observaciones:" + '</label> ' +
                    '<div class="col-md-9 col-sm-6 col-xs-6" id="OBSERVACION_SER442"> ' +
                    '<input id="observacion_SER442" class="form-control input-md" data-orden="1" maxlength="20"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Opcion PYP: 1.Solo PyP, 2.Exepto Pyp, 3.Todo" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="PYP_SER442"> ' +
                    '<input id="pyp_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="1,2,3"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Generar Droga codigo: 1.229, 2.ATC, 3.CUM" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="DROGA_SER442"> ' +
                    '<input id="droga_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="1,2,3"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Marcar todo Nro Autorizacion de factura?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="AUTORIZ_SER442"> ' +
                    '<input id="autoriz_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Proximar el vlr droga:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="VLRDRO_SER442"> ' +
                    '<input id="vlrdroga_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "En la capita usar solo Nro maestra?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="MAESTRA_SER442"> ' +
                    '<input id="maestra_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir diagnosticos archivo AP?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="AP_SER442"> ' +
                    '<input id="ap_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir concentracion en todo archivo AM?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="AM_SER442"> ' +
                    '<input id="am_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir archivo PU copagos?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="PU_SER442"> ' +
                    '<input id="pu_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Resol. 6408-2016 ATC 7 dig?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="RESOL_SER442"> ' +
                    '<input id="resol_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-2 col-sm-6 col-xs-6 control-label" for="name">' + "Sucursal:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6" id="SUCURSAL_SER442"> ' +
                    '<input id="sucursal_SER442" class="form-control input-md" data-orden="1" maxlength="2" > ' +
                    '</div> ' +
                    '<button type="button" id="sucursalBtn_SER442" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
                    '<i class="icon-magnifier"></i>' +
                    '</button>' +
                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<input id="descripsuc_SER442" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div>' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Cambiar X fecha de servicio:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="SERVICIO_SER442"> ' +
                    '<input id="servicio_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Discriminar Cirugias?:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="CIRUGIA_SER442"> ' +
                    '<input id="cirugia_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Unificar Lote farmaceutico:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="LOTE_SER442"> ' +
                    '<input id="lote_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Discriminar AP AT AM AC:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id= "PTMV_SER442"> ' +
                    '<input id="ptmv_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +


                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Unificar MSI:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id= "MSI_SER442"> ' +
                    '<input id="msi_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Mostrar decimal:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id= "DECIMAL_SER442"> ' +
                    '<input id="decimal_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Separar prefijo - Ejem P_100001:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id= "SEPARAR_SER442"> ' +
                    '<input id="separar_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-8 col-sm-6 col-xs-6 control-label" for="name">' + "Incluir Abonos de Factura:" + '</label> ' +
                    '<div class="col-md-4 col-sm-6 col-xs-6" id="ABOFACT_SER442"> ' +
                    '<input id="abofact_SER442" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanasoat.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluargrabado_SER442() }, 500)
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanasoat.off('show.bs.modal');
                            setTimeout(() => { $_this._aceptarprefijo_SER442() }, 500)
                        }
                    }
                }
            });
            ventanasoat.init($('.modal-footer').hide());
            ventanasoat.init(this._Evaluarsoat_SER442());
            ventanasoat.on('shown.bs.modal', function () {
                $("#soat_SER442").focus();
            });
            ventanasoat.init(_toggleF8([{
                input: 'sucursal',
                app: 'SER442',
                funct: this._ventanasucursal_SER442
            },]));
        },
        _Evaluarsoat_SER442() {
            _inputControl("disabled");
            $('#soat_SER442').val(this.SER442.SOAT);
            $('#nuir_SER442').val(this.SER442.MINI);
            $('#observacion_SER442').val(this.SER442.OBSERV);
            $('#pyp_SER442').val(this.SER442.PYP);
            $('#droga_SER442').val(this.SER442.ACU51);
            $('#autoriz_SER442').val(this.SER442.AUTORFACT);
            $('#vlrdroga_SER442').val(this.SER442.SWVLRDROG);
            $('#maestra_SER442').val(this.SER442.SWCAPI);
            $('#ap_SER442').val(this.SER442.SWDIAG);
            $('#am_SER442').val(this.SER442.SWCONCEN);
            $('#pu_SER442').val(this.SER442.SWCOPA);
            $('#resol_SER442').val(this.SER442.SW6408);
            $('#sucursal_SER442').val(this.SER442.SUCW);
            $('#servicio_SER442').val(this.SER442.SWFECHASER);
            $('#cirugia_SER442').val(this.SER442.SWQX);
            $('#lote_SER442').val(this.SER442.SWLOTE);
            $('#ptmv_SER442').val(this.SER442.SWPTMV);
            $('#msi_SER442').val(this.SER442.SWMSI);
            $('#decimal_SER442').val(this.SER442.SWDECI);
            $('#separar_SER442').val(this.SER442.SWSEPARAR);
            $('#abofact_SER442').val(this.SER442.SWABONO);

            if (this.SER442.SOAT.trim() == '') {
                this.SER442.SOAT = 'N';
                $('#soat_SER442').val(this.SER442.SOAT);
            }
            validarInputs({
                form: '#SOAT_SER442',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER442.SOAT = $('#soat_SER442').val().toUpperCase(); $('#soat_SER442').val(this.SER442.SOAT);
                    if (this.SER442.SOAT == 'S' || this.SER442.SOAT == 'N') {
                        this._evaluarministerio_SER442();
                    } else {
                        CON851("03", "03", this._Evaluarsoat_SER442(), "error", "Error");
                    }
                }
            )
        },
        _evaluarministerio_SER442() {
            if (this.SER442.MINI.trim() == '') this.SER442.MINI = 'N'; $('#nuir_SER442').val(this.SER442.MINI);
            validarInputs({
                form: '#NUIR_SER442',
                orden: "1"
            },
                this._Evaluarsoat_SER442,
                () => {
                    this.SER442.MINI = $('#nuir_SER442').val().toUpperCase(); $('#nuir_SER442').val(this.SER442.MINI);
                    if (this.SER442.MINI == 'S' || this.SER442.MINI == 'N') {
                        this._evaluarnuir_SER442();
                    } else {
                        CON851("03", "03", this._evaluarministerio_SER442(), "error", "Error");
                    }
                }
            )
        },
        _evaluarnuir_SER442() {
            if (($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 900641654 || $_USUA_GLOBAL[0].NIT == 900193162 ||
                $_USUA_GLOBAL[0].NIT == 830511298) && ($_USUA_GLOBAL[0].PREFIJ == '08' || $_USUA_GLOBAL[0].PREFIJ == '01' || $_USUA_GLOBAL[0].PREFIJ == '02')) {
                this.SER442.CIUDADNI = $_USUA_GLOBAL[0].COD_CIUD
                this.SER442.NUIRNI = $_USUA_GLOBAL[0].NUIR
                this.SER442.PREFIJOINI = $_USUA_GLOBAL[0].PREFIJ
                this.SER442.CODPRESTNI = this.SSER442.CIUDADNI + this.SSER442.NUIRNI + this.SSER442.PREFIJOINI;
                $('#codnuir_SER442').val(this.SSER442.CODPRESTNI);
                validarInputs({
                    form: '#CODNUIR_SER442',
                    orden: "1"
                },
                    this._evaluarministerio_SER442,
                    () => {
                        this.SER442.CODPRESTNI = $('#codnuir_SER442').val();
                        if (this.SER442.CODPRESTNI.trim() == '') {
                            this._evaluarministerio_SER442();
                        } else {
                            this._evaluarobservacion_SER442();
                        }

                    }
                )
            } else {
                this._evaluarobservacion_SER442();
            }
        },
        _evaluarobservacion_SER442() {
            validarInputs({
                form: '#OBSERVACION_SER442',
                orden: "1"
            },
                this._Evaluarsoat_SER442,
                () => {
                    this.SER442.OBSERV = $('#observacion_SER442').val().toUpperCase(); $('#observacion_SER442').val(this.SER442.OBSERV);
                    this._evaluarpyp_SER442();
                }
            )
        },
        _evaluarpyp_SER442() {
            if (this.SER442.PYP.trim() == '') this.SER442.PYP = '3';
            $('#pyp_SER442').val(this.SER442.PYP);
            validarInputs({
                form: '#PYP_SER442',
                orden: "1"
            },
                this._Evaluarsoat_SER442,
                () => {
                    this.SER442.PYP = $('#pyp_SER442').val();
                    if (this.SER442.PYP == '1' || this.SER442.PYP == '2' || this.SER442.PYP == '3') {
                        this._evaluaracuerdo5121_SER442();
                    } else {
                        CON851("03", "03", this._evaluarpyp_SER442(), "error", "Error");
                    }
                }
            )
        },
        _evaluaracuerdo5121_SER442() {
            if (this.SER442.ACU51.trim() == '' && $_USUA_GLOBAL[0].NIT == 845000038) {
                this.SER442.ACU51 = '3';
                $('#droga_SER442').val(this.SER442.ACU51);
            } else if (this.SER442.ACU51.trim() == '') {
                this.SER442.ACU51 = '2';
                $('#droga_SER442').val(this.SER442.ACU51);
            }
            validarInputs({
                form: '#DROGA_SER442',
                orden: "1"
            },
                this._evaluarpyp_SER442,
                () => {
                    this.SER442.ACU51 = $('#droga_SER442').val();
                    if (this.SER442.ACU51 == '1' || this.SER442.ACU51 == '2' || this.SER442.ACU51 == '3') {
                        this._evaluarnroautorizacion_SER442();
                    } else {
                        CON851("03", "03", this._evaluaracuerdo5121_SER442(), "error", "Error");
                    }
                }
            )
        },
        _evaluarnroautorizacion_SER442() {
            if (this.SER442.AUTORFACT.trim() == '') this.SER442.AUTORFACT = 'N';
            $('#autoriz_SER442').val(this.SER442.AUTORFACT);

            validarInputs({
                form: '#AUTORIZ_SER442',
                orden: "1"
            },
                this._evaluaracuerdo5121_SER442,
                () => {
                    this.SER442.AUTORFACT = $('#autoriz_SER442').val().toUpperCase(); $('#autoriz_SER442').val(this.SER442.AUTORFACT);
                    if (this.SER442.AUTORFACT == 'S' || this.SER442.AUTORFACT == 'N') {
                        this._evaluaraproximar_SER442();
                    } else {
                        CON851("03", "03", this._evaluarnroautorizacion_SER442(), "error", "Error");
                    }
                }
            )
        },
        _evaluaraproximar_SER442() {
            if (this.SER442.NITENV == 892000148 || this.SER442.NITENV == 890102044) {
                this.SER442.SWVLRDROG = 'S';
            } else {
                if (this.SER442.SWVLRDROG.trim() == '' && $_USUA_GLOBAL[0].NIT == 845000038) {
                    this.SER442.SWVLRDROG = 'S';
                } else {
                    this.SER442.SWVLRDROG = 'N';
                }
            }
            $('#vlrdroga_SER442').val(this.SER442.SWVLRDROG);
            validarInputs({
                form: '#VLRDRO_SER442',
                orden: "1"
            },
                this._evaluaracuerdo5121_SER442,
                () => {
                    this.SER442.SWVLRDROG = $('#vlrdroga_SER442').val().toUpperCase(); $('#vlrdroga_SER442').val(this.SER442.SWVLRDROG);
                    if (this.SER442.SWVLRDROG == 'S' || this.SER442.SWVLRDROG == 'N') {
                        this._evaluarcapita_SER442();
                    } else {
                        CON851("03", "03", this._evaluaraproximar_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarcapita_SER442() {
            if (this.SER442.SWCAPI.trim() == '') this.SER442.SWCAPI = 'S';
            $('#maestra_SER442').val(this.SER442.SWCAPI);

            validarInputs({
                form: '#MAESTRA_SER442',
                orden: "1"
            },
                this._evaluaraproximar_SER442,
                () => {
                    this.SER442.SWCAPI = $('#maestra_SER442').val().toUpperCase(); $('#maestra_SER442').val(this.SER442.SWCAPI);
                    if (this.SER442.SWCAPI == 'S' || this.SER442.SWCAPI == 'N') {
                        this._evaluardiag_SER442();
                    } else {
                        CON851("03", "03", this._evaluarcapita_SER442(), "error", "Error");
                    }
                })
        },
        _evaluardiag_SER442() {
            if (this.SER442.SWDIAG.trim() == '' && $_USUA_GLOBAL[0].NIT == '0845000038') {
                this.SER442.SWDIAG = 'S';
                $('#ap_SER442').val(this.SER442.SWDIAG);
            } else if (this.SER442.SWDIAG.trim() == '') {
                this.SER442.SWDIAG = 'N';
                $('#ap_SER442').val(this.SER442.SWDIAG);
            }
            validarInputs({
                form: '#AP_SER442',
                orden: "1"
            },
                this._evaluarcapita_SER442,
                () => {
                    this.SER442.SWDIAG = $('#ap_SER442').val().toUpperCase(); $('#ap_SER442').val(this.SER442.SWDIAG);
                    if (this.SER442.SWDIAG == 'S' || this.SER442.SWDIAG == 'N') {
                        this._evaluarmedconce_SER442();
                    } else {
                        CON851("03", "03", this._evaluardiag_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarmedconce_SER442() {
            if (this.SER442.SWCONCEN.trim() == '' && $_USUA_GLOBAL[0].NIT == 845000038) {
                this.SER442.SWDIAG = 'S';
                $('#am_SER442').val(this.SER442.SWCONCEN);
            } else if (this.SER442.SWCONCEN.trim() == '') {
                this.SER442.SWCONCEN = 'S';
                $('#am_SER442').val(this.SER442.SWCONCEN);
            }
            validarInputs({
                form: '#AM_SER442',
                orden: "1"
            },
                this._evaluarcapita_SER442,
                () => {
                    this.SER442.SWCONCEN = $('#am_SER442').val().toUpperCase(); $('#am_SER442').val(this.SER442.SWCONCEN);
                    if (this.SER442.SWCONCEN == 'S' || this.SER442.SWCONCEN == 'N') {
                        this._evaluarcopagos_SER442();
                    } else {
                        CON851("03", "03", this._evaluardiag_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarcopagos_SER442() {
            if (this.SER442.SWCOPA.trim() == '') this.SER442.SWCOPA = 'N';
            $('#pu_SER442').val(this.SER442.SWCOPA);
            validarInputs({
                form: '#PU_SER442',
                orden: "1"
            },
                this._evaluarcapita_SER442,
                () => {
                    this.SER442.SWCOPA = $('#pu_SER442').val().toUpperCase(); $('#pu_SER442').val(this.SER442.SWCOPA);
                    if (this.SER442.SWCOPA == 'S' || this.SER442.SWCOPA == 'N') {
                        if (this.SER442.ACU51 == '2') {
                            if (this.SER442.SW6408.trim() == '') {
                                this.SER442.SW6408 = 'N';
                                $('#resol_SER442').val(this.SER442.SW6408);
                                this._evaluar6408_SER442();
                            } else {
                                this._evaluar6408_SER442();
                            }
                        } else {
                            this._evaluarsucursal_SER442();
                        }

                    } else {
                        CON851("03", "03", this._evaluarcopagos_SER442(), "error", "Error");
                    }
                })
        },
        _evaluar6408_SER442() {
            if (this.SER442.SW6408.trim() == '') {
                this.SER442.SW6408 = 'N'
                $('#resol_SER442').val(this.SER442.SW6408)
            }
            validarInputs({
                form: '#RESOL_SER442',
                orden: "1"
            },
                this._evaluarcopagos_SER442,
                () => {
                    this.SER442.SW6408 = $('#resol_SER442').val().toUpperCase(); $('#resol_SER442').val(this.SER442.SW6408);
                    if (this.SER442.SW6408 == 'S' || this.SER442.SW6408 == 'N') {
                        this._evaluarsucursal_SER442();
                    } else {
                        CON851("03", "03", this._evaluar6408_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarsucursal_SER442() {
            if (this.SER442.SUCW.trim() == '') {
                this.SER442.SUCW = '**';
                $('#sucursal_SER442').val(this.SER442.SUCW);
            }
            validarInputs({
                form: '#SUCURSAL_SER442',
                orden: "1"
            },
                this._evaluarcopagos_SER442,
                () => {
                    this.SER442.SUCW = $('#sucursal_SER442').val();
                    if (this.SER442.SUCW == '**') {
                        $('#descripsuc_SER442').val('TODAS LAS SUCURSALES');
                        this._evaluarfechaser_SER442()
                    } else {
                        if (this.SER442.SUCW == '01') {
                            $('#descripsuc_SER442').val('PRINCIPAL');
                            this._evaluarfechaser_SER442()
                        } else {
                            $('#descripsuc_SER442').val('SECUNDARIA');
                            this._evaluarfechaser_SER442()
                        }
                    }
                })
        },
        _evaluarfechaser_SER442() {
            if (this.SER442.SWFECHASER.trim() == '') {
                if ($_USUA_GLOBAL[0].NIT == 830511298) {
                    this.SER442.SWFECHASER = 'S';
                    $('#servicio_SER442').val(this.SER442.SWFECHASER);
                } else {
                    this.SER442.SWFECHASER = 'N';
                    $('#servicio_SER442').val(this.SER442.SWFECHASER);
                }
            }
            validarInputs({
                form: '#SERVICIO_SER442',
                orden: "1"
            },
                this._evaluarsucursal_SER442,
                () => {
                    this.SER442.SWFECHASER = $('#servicio_SER442').val().toUpperCase(); $('#servicio_SER442').val(this.SER442.SWFECHASER);
                    if (this.SER442.SWFECHASER == 'S' || this.SER442.SWFECHASER == 'N') {
                        if (this.SER442.SWFECHASER == 'S') {
                            this._evaluarQX_SER442();
                        } else {
                            this._evaluarQX_SER442();
                        }
                    } else {
                        CON851("03", "03", this._evaluarfechaser_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarQX_SER442() {
            if (this.SER442.SWQX.trim() == '') this.SER442.SWQX = 'N';
            $('#cirugia_SER442').val(this.SER442.SWQX);

            validarInputs({
                form: '#CIRUGIA_SER442',
                orden: "1"
            },
                this._evaluarfechaser_SER442,
                () => {
                    this.SER442.SWQX = $('#cirugia_SER442').val().toUpperCase(); $('#cirugia_SER442').val(this.SER442.SWQX);
                    if (this.SER442.SWQX == 'S' || this.SER442.SWQX == 'N') {
                        if ($_USUA_GLOBAL[0].LOTE_FARM != 'S') {
                            this._evaluarapat_SER442();
                        } else {
                            if (this.SER442.SWLOTE.trim() == '') {
                                if ($_USUA_GLOBAL[0].NIT == 845000038) {
                                    this.SER442.SWLOTE = 'S';
                                    $('#lote_SER442').val(this.SER442.SWLOTE);
                                    this._evaluarlote_SER442();
                                } else {
                                    this.SER442.SWLOTE = 'N';
                                    $('#lote_SER442').val(this.SER442.SWLOTE);
                                    this._evaluarlote_SER442();
                                }
                            } else {
                                this._evaluarlote_SER442();
                            }
                        }
                    } else {
                        CON851("03", "03", this._evaluarQX_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarlote_SER442() {
            validarInputs({
                form: '#LOTE_SER442',
                orden: "1"
            },
                this._evaluarQX_SER442,
                () => {
                    this.SER442.SWLOTE = $('#lote_SER442').val().toUpperCase(); $('#lote_SER442').val(this.SER442.SWLOTE);
                    if (this.SER442.SWLOTE == 'S' || this.SER442.SWLOTE == 'N') {
                        this._evaluarapat_SER442();
                    } else {
                        CON851("03", "03", this._evaluarlote_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarapat_SER442() {
            if (this.SER442.SWPTMV.trim() == '') this.SER442.SWPTMV = 'N';
            $('#ptmv_SER442').val(this.SER442.SWPTMV);
            validarInputs({
                form: '#PTMV_SER442',
                orden: "1"
            },
                this._evaluarlote_SER442,
                () => {
                    this.SER442.SWPTMV = $('#ptmv_SER442').val().toUpperCase(); $('#ptmv_SER442').val(this.SER442.SWPTMV);
                    if (this.SER442.SWPTMV == 'S' || this.SER442.SWPTMV == 'N') {
                        this._evaluarmsi_ser442();
                    } else {
                        CON851("03", "03", this._evaluarapat_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarmsi_ser442() {
            if (this.SER442.SWMSI.trim() == '') this.SER442.SWMSI = 'N';
            $('#msi_SER442').val(this.SER442.SWMSI);
            validarInputs({
                form: '#MSI_SER442',
                orden: "1"
            },
                this._evaluarapat_SER442,
                () => {
                    this.SER442.SWMSI = $('#msi_SER442').val().toUpperCase(); $('#msi_SER442').val(this.SER442.SWMSI);
                    if (this.SER442.SWMSI == 'S' || this.SER442.SWMSI == 'N') {
                        this._evaluardecimal_SER442();
                    } else {
                        CON851("03", "03", this._evaluarmsi_ser442(), "error", "Error");
                    }
                })
        },
        _evaluardecimal_SER442() {
            if (this.SER442.SWDECI.trim() == '') {
                this.SER442.SWDECI = 'N';
                $('#decimal_SER442').val(this.SER442.SWDECI);
            }
            validarInputs({
                form: '#DECIMAL_SER442',
                orden: "1"
            },
                this._evaluarmsi_ser442,
                () => {
                    this.SER442.SWDECI = $('#decimal_SER442').val().toUpperCase(); $('#decimal_SER442').val(this.SER442.SWDECI);
                    if (this.SER442.SWDECI == 'S' || this.SER442.SWDECI == 'N') {
                        this._evaluarseparar_SER442();
                    } else {
                        CON851("03", "03", this._evaluardecimal_SER442(), "error", "Error");

                    }
                })
        },
        _evaluarseparar_SER442() {
            if (this.SER442.SWSEPARAR.trim() == '') this.SER442.SWSEPARAR = 'N';
            $('#separar_SER442').val(this.SER442.SWSEPARAR);

            validarInputs({
                form: '#SEPARAR_SER442',
                orden: "1"
            },
                this._evaluardecimal_SER442,
                () => {
                    this.SER442.SWSEPARAR = $('#separar_SER442').val().toUpperCase(); $('#separar_SER442').val(this.SER442.SWSEPARAR);
                    if (this.SER442.SWSEPARAR == 'S' || this.SER442.SWSEPARAR == 'N') {
                        if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 845000038) {
                            this._evaluarabonos_SER442();
                        } else {
                            this.SER442.SWABONO = 'N';
                            $('.btn-primary').click();
                        }
                    } else {
                        CON851("03", "03", this._evaluarseparar_SER442(), "error", "Error");
                    }
                })
        },
        _evaluarabonos_SER442() {
            if (this.SER442.SWABONO.trim() == '') {
                this.SER442.SWABONO = 'N';
                $('#abofact_SER442').val(this.SER442.SWABONO);
            }
            validarInputs({
                form: '#ABOFACT_SER442',
                orden: "1"
            },
                _evaluarseparar_SER442,
                () => {
                    this.SER442.SWABONO = $('#abofact_SER442').val();
                    if (this.SER442.SWABONO == 'S' || this.SER442.SWABONO == 'N') {
                        $('.btn-primary').click();
                    } else {
                        CON851("03", "03", this._evaluarabonos_SER442(), "error", "Error");
                    }
                })
        },

        ///////////////////////VENTANAS F8///////////////////////////

        _f8elecenvio_SER442() {
            var $_this = this;
            let URL = get_url("APP/SALUD/SER846.DLL");
            postData({
                datosh: datosEnvio() + 20 + $_this.SER442.ANO_LNK + $_this.SER442.MES_LNK
            }, URL)
                .then((data) => {
                    loader("hide");
                    $_this.SER442.ENVIO1 = data.ENVIOS;
                    $_this.SER442.ENVIO1.pop()
                    _ventanaDatos({
                        titulo: 'VENTANA DE ENVIOS' + this.SER442.MES_LNK + '/' + this.SER442.ANO_LNK,
                        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
                        data: $_this.SER442.ENVIO1,
                        ancho: '90%',
                        callback_esc: function () {
                            $(".numero_SER442").focus();
                        },
                        callback: function (data) {
                            $_this.form.numero_SER442 = data.NRO
                            _enterInput('.numero_SER442');
                        }
                    });

                })
                .catch((error) => {
                    console.log(error)
                    $_this.form.numero_SER442
                });
        },
        _f8entidad_SER442() {
            $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.entidad_SER442 = data.COD.trim();
                    _enterInput('.terceros_SER442');
                },
                cancel: () => {
                    _enterInput('.terceros_SER442');
                }
            };
            F8LITE(parametros);
        },
        _f8factura_SER442() {
            parametros = {
                dll: 'NUMERACION',
                valoresselect: ['Buscar por tercero', 'buscar por paciente'],
                f8data: 'NUMERACION',
                columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                callback: (data) => {
                    $_this.SER442.FACT = data.COD;
                    $_this.form.facturatabla_SER442 = $_this.SER442.FACT.substring(1, 7)
                    _enterInput('.numeracion_SER442');
                },
                cancel: () => {
                    _enterInput('.numeracion_SER442');
                }
            };
            F8LITE(parametros);
        },
        _f8costo_SER442() {
            $_this = this
            _ventanaDatos({
                titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
                columnas: ["COD", "NOMBRE"],
                data: $_this.SER442.COSTO,
                callback_esc: function () {
                    $(".costo_SER442").focus();
                },
                callback: function (data) {
                    $_this.form.costo_SER442 = data.COD.trim()
                    _enterInput('.costo_SER442');
                }
            });
        },
        _ventanasucursal_SER442(e) {
            $_this = this
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE SUCURSALES",
                    columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
                    data: $_this.SER442.SUCURSALES,
                    callback_esc: function () {
                        $("#sucursal_SER442").focus();
                    },
                    callback: function (data) {
                        $('#sucursal_SER442').val(data.CODIGO.trim());
                        _enterInput('#sucursal_SER442');
                    }
                });
            }
        }
    },
});











