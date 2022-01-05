// 26/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#SER613G",
    data: {
        SER613G: [],
        tablafactenvio_SER613G: [],
        form: {
            Envios_SER613G: "",
            novedad_SER613G: "",
            numero_SER613G: "",
            entidad_SER613G: "",
            descripentid_SER613G: "",
            anoini_SER613G: "",
            mesini_SER613G: "",
            diaini_SER613G: "",
            anofin_SER613G: "",
            mesfin_SER613G: "",
            diafin_SER613G: "",
            perido_SER613G: "",
            costo_SER613G: "",
            descripcosto_SER613G: "",
            oper_SER613G: "",
            md_SER613G: "",
            eps_SER613G: "",
            descripeps_SER613G: "",
            prefijotabla_SER613G: "",
            facturatabla_SER613G: "",
            itemtabla_SER613G: 1,
            ingreseok_SER613G: ""
        },
        ELECTRONICA: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,7,6,G,1 - Envio facturacion electronica");
        $_this = this;
        $_this.SER613G.BUSENVIOW = ' '
        $_this.SER613G.FECHAATEN = ' '
        $_this.SER613G.ORGANIZAW = '1'
        $_this.SER613G.VALID = ' '
        $_this.SER613G.CONTADO = 0
        $_this.SER613G.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SER613G.ANO_LNK = $_this.SER613G.FECHA_LNK.substring(0, 2);
        $_this.SER613G.MES_LNK = $_this.SER613G.FECHA_LNK.substring(2, 4);
        $_this.SER613G.DIA_LNK = $_this.SER613G.FECHA_LNK.substring(4, 6);
        $_this.SER613G.FECHAACTUAL = moment().format("YYYYMMDD");
        $_this.SER613G.ANOACTUAL = $_this.SER613G.FECHAACTUAL.substring(0, 4)
        $_this.SER613G.MESACTUAL = $_this.SER613G.FECHAACTUAL.substring(4, 6)
        $_this.SER613G.DIAACTUAL = $_this.SER613G.FECHAACTUAL.substring(6, 8)
        $_this.SER613G.CUFEELECNUM = ''
        this.SER613G.FECHAMAXIMA = moment().subtract(9, "days").format("YYYYMMDD")
        this.SER613G.SWFECHAMAXIMA = 'N'
        obtenerDatosCompletos({
            nombreFd: 'ENTIDADES'
        }, function (data) {
            $_this.SER613G.ENTIDADES = data.ENTIDADES
            $_this.SER613G.ENTIDADES.pop()
            loader("hide");
            $_this._evaluarfechaempezar_SER613G()
            obtenerDatosCompletos({
                nombreFd: 'COSTOS'
            }, function (data) {
                $_this.SER613G.COSTO = data.COSTO;
                $_this.SER613G.COSTO.pop();
                obtenerDatosCompletos({
                    nombreFd: 'SERV_HOSP'
                }, function (data) {
                    $_this.SER613G.SERVICIO = data.SERVICIO;
                    $_this.SER613G.SERVICIO.pop();
                    obtenerDatosCompletos({
                        nombreFd: 'PREFIJOS',
                    }, function (data) {
                        $_this.SER613G.PREFIJOS = data.PREFIJOS;
                        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                            data = data.FIRMAS[0];
                            $_this.SER613G.FIRMAS = data;
                        })
                    })
                })
            })
        });
    },
    methods: {
        _evaluarfechaempezar_SER613G() {
            this.SER613G.ANONUM = this.SER613G.ANO_LNK;
            if (parseInt(this.SER613G.ANONUM) > 90) {
                this.SER613G.ANOINIW = parseInt(this.SER613G.ANONUM) + 1900;
            } else {
                this.SER613G.ANOINIW = parseInt(this.SER613G.ANONUM) + 2000;
            }
            this.SER613G.MESNUM = this.SER613G.MES_LNK;
            this.SER613G.MESINIW = this.SER613G.MESNUM;
            this.SER613G.DIAINIW = '01';
            this.SER613G.FECHAINIW = this.SER613G.ANOINIW + this.SER613G.MESINIW + this.SER613G.DIAINIW
            this.SER613G.PERINILOCAL = this.SER613G.ANOINIW + this.SER613G.MESINIW;
            switch (parseInt(this.SER613G.MESINIW)) {
                case 01:
                    this.form.Envios_SER613G = 'ENERO' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 02:
                    this.form.Envios_SER613G = 'FEBRERO' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 03:
                    this.form.Envios_SER613G = 'MARZO' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 04:
                    this.form.Envios_SER613G = 'ABRIL' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 05:
                    this.form.Envios_SER613G = 'MAYO' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 06:
                    this.form.Envios_SER613G = 'JUNIO' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 07:
                    this.form.Envios_SER613G = 'JULIO' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 08:
                    this.form.Envios_SER613G = 'AGOSTO' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 09:
                    this.form.Envios_SER613G = 'SEPTIEMBRE' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 10:
                    this.form.Envios_SER613G = 'OCTUBRE' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 11:
                    this.form.Envios_SER613G = 'NOVIEMBRE' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
                case 12:
                    this.form.Envios_SER613G = 'DICIEMBE' + '/' + this.SER613G.ANOINIW
                    this._fechaactual_SER613G();
                    break;
            }
        },
        _fechaactual_SER613G() {
            this.SER613G.ANOCTL = this.SER613G.ANOACTUAL;
            if (parseInt(this.SER613G.DIAACTUAL >= 20)) {
                if (parseInt(this.SER613G.MESACTUAL) == 12) {
                    this.SER613G.ANOCTL = parseInt(this.SER613G.ANOCTL) + 1;
                    this.SER613G.MESCTL = '01';
                } else {
                    this.SER613G.MESCTL = parseInt(this.SER613G.MESCTL) + 1;
                }
                this.SER613G.DIACTL = 10;
                this._validacionabrirarch_SER613G()
            } else {
                this.SER613G.MESCTL = this.SER613G.MESACTUAL;
                this.SER613G.DIACTL = this.SER613G.DIAACTUAL;
                this._validacionabrirarch_SER613G()
            }
        },
        _validacionabrirarch_SER613G() {
            this.SER613G.FECHACTL = this.SER613G.ANOCTL + this.SER613G.MESCTL + this.SER613G.DIACTL;
            this.SER613G.NUIRW = $_USUA_GLOBAL[0].NUIR;
            if (!$.isNumeric(this.SER613G.NUIRW)) {
                jAlert({ titulo: 'Error ', mensaje: 'Falta asignar el codigo del prestador actualice el campo de NUIR en datos del usuario opcion 1-1-1 menu de contabilidad' }, _toggleNav);
            } else {
                CON850(this._validarnovedad_SER613G);
            }
        },
        _validarnovedad_SER613G(novedad) {
            this.form.novedad_SER613G = novedad.id;
            this.form.entidad_SER613G = ''
            this.form.descripentid_SER613G = ''
            this.form.anofin_SER613G = ''
            this.form.mesfin_SER613G = ''
            this.form.diafin_SER613G = ''
            this.form.perido_SER613G = ''
            this.form.oper_SER613G = ''
            this.form.md_SER613G = ''
            this.form.eps_SER613G = ''
            this.form.descripeps_SER613G = ''
            this.tablafactenvio_SER613G = []
            if (this.form.novedad_SER613G == "F") {
                _toggleNav();
            } else {
                let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
                this.form.novedad_SER613G = this.form.novedad_SER613G + " - " + novedad[this.form.novedad_SER613G];
                switch (this.form.novedad_SER613G.substring(0, 1)) {
                    case '7':
                    case '8':
                        this._asignarnumero_SER613G();
                        break;
                    case '9':
                        CON851('49', '49', null, 'error', 'error');
                        setTimeout(function () { CON850(this._validarnovedad_SER613G); }, 300)
                        break;
                }
            }
        },
        _asignarnumero_SER613G() {
            this.SER613G.SECUNUM = "FE"
            let URL = get_url("APP/CONTAB/CON007.DLL");
            postData({ datosh: datosEnvio() + this.SER613G.SECUNUM }, URL)
                .then(data => {
                    var data = data.split("|");
                    this.SER613G.ULTFECHANUM = data[2].trim();
                    this.SER613G.NUMEROCTL = data[1].substring(3, 9);
                    this.SER613G.SWSTOP = '0';
                    if (this.form.novedad_SER613G.substring(0, 1) == '7') {
                        this.SER613G.NROW = this.SER613G.NUMEROCTL;
                        this.form.numero_SER613G = this.SER613G.NROW
                        this._leernumero_SER613G();
                    } else {
                        this.SER613G.NROW = parseInt(this.SER613G.NUMEROCTL) - 1;
                        this.form.numero_SER613G = this.SER613G.NROW.toString().padStart(6, '0')
                        this._datonumero_SER613G();
                    }
                })
                .catch(err => {
                    console.error(err);
                    setTimeout(function () { CON850(this._validarnovedad_SER613G); }, 300)
                })

        },
        _datonumero_SER613G() {
            validarInputs({
                form: "#NUMERO_SER613G",
                orden: '1'
            },
                () => {
                    setTimeout(() => { CON850(this._validarnovedad_SER613G) }, 300)
                },
                () => {
                    this.tablafactenvio_SER613G = []
                    this.ELECTRONICA = []
                    this._leernumero_SER613G();
                }
            )
        },

        _leernumero_SER613G() {
            if (this.form.numero_SER613G == 0) {
                this._datonumero_SER613G()
            } else {
                this.form.numero_SER613G = this.form.numero_SER613G.toString().padStart(6, '0')
                postData({
                    datosh: datosEnvio() + '1|' + this.form.numero_SER613G + '|||||||||||||||||' + this.SER613G.FECHAMAXIMA + '|'
                }, get_url("APP/SALUD/SER613G.DLL"))
                    .then((data) => {
                        this.SER613G.ELECTFACTURACION = data.ELECFACTURACION[0];
                        if (this.form.novedad_SER613G.substring(0, 1) == '7') {
                            CON851('00', '00', null, 'error', 'error');
                            setTimeout(function () { CON850(this._validarnovedad_SER613G); }, 300)
                        } else if (this.form.novedad_SER613G.substring(0, 1) == '8') {
                            this._llenardatos_SER613G();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == "01" && this.form.novedad_SER613G.substring(0, 1) == '7') {
                            this._registronuevo_SER613G();
                        } else if (error.MENSAJE == "01" && this.form.novedad_SER613G.substring(0, 1) == '8') {
                            this._datonumero_SER613G();
                        } else {
                            this._datonumero_SER613G();
                        }
                    });
            }
        },
        _registronuevo_SER613G() {
            if (this.form.novedad_SER613G.substring(0, 1) == '7') {
                this.SER613G.ANOENVW = this.SER613G.ANOINIW;
                this.SER613G.ANOPERW = this.SER613G.ANOINIW;
                this.SER613G.MESPERW = this.SER613G.MESINIW;
                this.SER613G.MESENVW = this.SER613G.MESINIW;
                this.SER613G.PERW = this.SER613G.ANOPERW + this.SER613G.MESPERW;
                this.form.perido_SER613G = this.SER613G.PERW
                this.tablafactenvio_SER613G = []
                this._ventanarips_SER613G()
            } else {
                this._ventanarips_SER613G()
            }
        },

        _ventanarips_SER613G() {
            $_this = this
            var ventanarips = bootbox.dialog({
                size: 'small',
                title: 'ENVIO DE RIPS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Traer numero de envio RIPS' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="TRAERENVIO_SER613G"> ' +
                    '<input id="traerenv_SER613G" class="form-control input-md" data-orden="1" maxlength="1" placeholder= "S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Nro envio:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="NROENVIO_SER613G"> ' +
                    '<input id="nroenv_SER613G" class="form-control input-md" data-orden="1" maxlength="6" > ' +
                    '</div> ' +
                    '<button type="button" id="nroenvBtn_SER613G" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
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
                            ventanarips.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarnit_SER613G() }, 500)
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanarips.off('show.bs.modal');
                            setTimeout(function () { CON850($_this._validarnovedad_SER613G); }, 300)
                        }
                    }
                }
            });
            ventanarips.init($('.modal-footer').hide());
            ventanarips.init(this._evaluarenvio_SER613G);
            ventanarips.on('shown.bs.modal', function () {
                $("#traerenv_SER613G").focus();
            });
            ventanarips.init(_toggleF8([{
                input: 'nroenv',
                app: 'SER613G',
                funct: this._f8envio_SER613G
            },]));
        },
        _evaluarenvio_SER613G() {
            _inputControl("disabled");
            if (this.SER613G.BUSENVIOW.trim() == '') this.SER613G.BUSENVIOW = 'N'
            $('#traerenv_SER613G').val(this.SER613G.BUSENVIOW);
            validarInputs({
                form: '#TRAERENVIO_SER613G',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER613G.BUSENVIOW = $('#traerenv_SER613G').val().toUpperCase();
                    $('#traerenv_SER613G').val(this.SER613G.BUSENVIOW)
                    if (this.SER613G.BUSENVIOW == 'S' || this.SER613G.BUSENVIOW == 'N') {
                        if (this.SER613G.BUSENVIOW == 'N') {
                            $('.btn-primary').click();
                        } else {
                            this._evaluarnroenviovent_SER613G()
                        }
                    } else {
                        this._evaluarenvio_SER613G()
                    }
                }
            )
        },
        _evaluarnroenviovent_SER613G() {
            validarInputs({
                form: '#NROENVIO_SER613G',
                orden: "1"
            },
                () => { this._evaluarenvio_SER613G() },
                () => {
                    this.SER613G.NROENVIORIPS = $('#nroenv_SER613G').val();
                    this.SER613G.NROENVIORIPS = this.SER613G.NROENVIORIPS.toString().padStart(6, '0')
                    $('#nroenv_SER613G').val(this.SER613G.NROENVIORIPS);
                    postData({
                        datosh: datosEnvio() + this.SER613G.NROENVIORIPS + '| |1|'
                    }, get_url("APP/SALUD/SER442-01.DLL"))
                        .then((data) => {
                            this.SER613G.COMPLETOENVIO = data['ENVIOS'][0];
                            this.form.entidad_SER613G = parseInt($_this.SER613G.COMPLETOENVIO.NIT);
                            this.form.descripentid_SER613G = this.SER613G.COMPLETOENVIO.DESCRIPTER;
                            this.form.eps_SER613G = this.SER613G.COMPLETOENVIO.ENTIDAD;
                            this.form.descripeps_SER613G = this.SER613G.COMPLETOENVIO.DESCRIPENT;
                            this.form.perido_SER613G = this.SER613G.COMPLETOENVIO.PER_ENV;
                            this.SER613G.ANOPERW = this.SER613G.COMPLETOENVIO.PER_ENV.substring(0, 4);
                            this.SER613G.MESPERW = this.SER613G.COMPLETOENVIO.PER_ENV.substring(4, 6);
                            this.SER613G.FECHAENVW = this.SER613G.COMPLETOENVIO.FECHA_ENV;
                            this.form.anofin_SER613G = this.SER613G.FECHAENVW.substring(0, 4);
                            this.form.mesfin_SER613G = this.SER613G.FECHAENVW.substring(4, 6);
                            this.form.diafin_SER613G = this.SER613G.FECHAENVW.substring(6, 8);
                            this.SER613G.OBSERV = this.SER613G.COMPLETOENVIO.OBSERV;
                            this.form.oper_SER613G = this.SER613G.COMPLETOENVIO.OPER + ' ' + this.SER613G.COMPLETOENVIO.FECHA_CRE;
                            this.SER613G.FECHACRE = this.SER613G.COMPLETOENVIO.FECHA_CRE;
                            this.form.md_SER613G = this.SER613G.COMPLETOENVIO.OPER_MOD + ' ' + this.SER613G.COMPLETOENVIO.FECHA_MOD;
                            this.SER613G.FECHAMOD = this.SER613G.COMPLETOENVIO.FECHA_MOD;
                            this.SER613G.CANTCARP = this.SER613G.COMPLETOENVIO.CANT_CARP;
                            this.SER613G.CANTFOLIO = this.SER613G.COMPLETOENVIO.CANT_FOLIO;
                            this.SER613G.SEGRIPSNUM = this.SER613G.COMPLETOENVIO.SEG;
                            this.SER613G.COMPLETOENVIO.TAB_REG_ENV.pop()
                            this.SER613G.VALID = '1'
                            this._evaluarfactenvio_SER613G()
                        })
                        .catch((error) => {
                            console.log(error);
                            this._evaluarenvio_SER613G();
                        });
                }
            )
        },
        _evaluarfactenvio_SER613G() {
            this.tablafactenvio_SER613G = this.SER613G.COMPLETOENVIO.TAB_REG_ENV;
            for (var i in this.SER613G.COMPLETOENVIO.TAB_REG_ENV) {
                let facturanum = this.SER613G.COMPLETOENVIO.TAB_REG_ENV[i].NUMERO
                let prefijonum = this.SER613G.COMPLETOENVIO.TAB_REG_ENV[i].PREFIJO
                let URL = get_url("APP/SALUD/SER808-01.DLL");
                postData({
                    datosh: datosEnvio() + prefijonum + facturanum + "|",
                }, URL)
                    .then(data => {
                        this.SER613G.NUMERACION = data.NUMER19[0];
                        this.SER613G.LLAVE_NUM = this.SER613G.NUMERACION.LLAVE_NUM.trim()
                        this.SER613G.NITNUM = this.SER613G.NUMERACION.NIT_NUM.trim()
                        this.SER613G.DESCRIPNUM = this.SER613G.NUMERACION.DESCRIP_NUM.trim()
                        this.SER613G.FECHASALNUM = this.SER613G.NUMERACION.FECHA_RET.trim()
                        this.SER613G.ANORETNUM = this.SER613G.FECHASALNUM.substring(0, 4);
                        this.SER613G.MESRETNUM = this.SER613G.FECHASALNUM.substring(4, 6);
                        this.SER613G.DIARETNUM = this.SER613G.FECHASALNUM.substring(6, 8);
                        this.SER613G.FACTCAPITNUMW = this.SER613G.NUMERACION.FACTCAPIT_NUM.trim()
                        this.SER613G.CCOSTONUM = this.SER613G.NUMERACION.COSTO_NUM.trim()
                        this.SER613G.ELENVIONUM = this.SER613G.NUMERACION.ELENVIO.trim()
                        this.SER613G.CUFEELECNUM = this.SER613G.NUMERACION.CUFEELEC_NUM.trim()
                        this.SER613G.ESTADONUM = this.SER613G.NUMERACION.ESTADO_NUM.trim()
                        if (this.SER613G.CUFEELECNUM.trim() != '') {
                            CON851('', 'Factura ya fue radicada!', null, 'error', 'error');
                        } else {
                            if ((parseInt(this.SER613G.ELENVIONUM) > 0) && (parseInt(this.SER613G.ELENVIONUM) != parseInt(this.form.numero_SER613G))) {
                                CON851(this.SER613G.LLAVE_NUM, '9J', null, 'error', 'error');
                            }
                        }
                    })
                    .catch(error => {
                        $('.btn-primary').click();
                    });
            }
            $('.btn-primary').click();
        },
        _evaluarnit_SER613G() {
            validarInputs(
                {
                    form: "#ENTIDADES_SER613G",
                    orden: '1',
                },
                () => { CON850(this._validarnovedad_SER613G) },
                () => {
                    if (this.form.entidad_SER613G.toString().trim() == "") {
                        CON851("01", "01", this._evaluarnit_SER613G(), "error", "error");
                    } else {
                        this.SER613G.CODTERCERO = this.form.entidad_SER613G.toString().padStart(10, "0")
                        let URL = get_url("APP/CONTAB/CON802_01.DLL");
                        postData({
                            datosh: datosEnvio() + this.SER613G.CODTERCERO + "|",
                        }, URL)
                            .then(data => {
                                SER613G.TERCEROS = data.TERCER[0];
                                this.SER613G.DVTERCERO = SER613G.TERCEROS.DV.trim()
                                this.form.descripentid_SER613G = SER613G.TERCEROS.DESCRIP_TER.trim()
                                this.form.eps_SER613G = SER613G.TERCEROS.ENTIDAD.trim()
                                this.form.descripeps_SER613G = SER613G.TERCEROS.NOM_ENTID
                                this.SER613G.ACTTERCERO = SER613G.TERCEROS.ACT_TER.trim()
                                this.SER613G.EMAIL2TERCERO = SER613G.TERCEROS.EMAIL2.trim()
                                this.SER613G.DIRRECTERCERO = SER613G.TERCEROS.DIRREC.trim()
                                if (this.SER613G.DVTERCERO.trim() == '') {
                                    CON851("9I", "9I", this._evaluarnit_SER613G(), "error", "error");
                                } else {
                                    if (this.SER613G.DIRRECTERCERO.trim() == '') {
                                        CON851("84", "84", this._evaluarnit_SER613G(), "error", "error");
                                    } else {
                                        if (this.SER613G.EMAIL2TERCERO.trim() == '') {
                                            CON851("2K", "2K", this._evaluarnit_SER613G(), "error", "error");
                                        } else {
                                            this._asignarparticular_SER613G()
                                        }
                                    }
                                }
                            }).catch(error => {
                                this._evaluarnit_SER613G()
                            });
                    }
                }
            )
        },

        _asignarparticular_SER613G() {
            if (this.form.novedad_SER613G.substring(0, 1) == '8') {
                $_this = this
                var ventanaparticulares = bootbox.dialog({
                    size: 'small',
                    title: 'ACTUALIZA ENVIO DE RIPS',
                    message: '<div class="row"> ' +
                        '<div class="col-md-12"> ' +

                        '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                        '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Actualiza Nro de Envio RISP' + '</label> ' +
                        '<div class="col-md-6 col-sm-6 col-xs-6" id="TRAERENVIO1_SER613G"> ' +
                        '<input id="traerenv1_SER613G" class="form-control input-md" data-orden="1" maxlength="1" placeholder= "S/N"> ' +
                        '</div> ' +
                        '</div> ' +

                        '<div class="salto-linea"></div>' +

                        '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Nro envio:" + '</label> ' +
                        '<div class="col-md-6 col-sm-6 col-xs-6" id="NROENVIO1_SER613G"> ' +
                        '<input id="nroenv1_SER613G" class="form-control input-md" data-orden="1" maxlength="6" > ' +
                        '</div> ' +
                        '<button type="button" id="nroenv1Btn_SER613G" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
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
                                ventanaparticulares.off('show.bs.modal');
                                setTimeout(() => { $_this._validaciondenit_SER613G() }, 500)
                            }
                        },
                        cancelar: {
                            label: 'Cancelar',
                            className: 'btn-danger',
                            callback: function () {
                                ventanaparticulares.off('show.bs.modal');
                                setTimeout(function () { CON850($_this._validarnovedad_SER613G); }, 300)
                            }
                        }
                    }
                });
                ventanaparticulares.init($('.modal-footer').hide());
                ventanaparticulares.init(this._evaluarenvio1_SER613G);
                ventanaparticulares.on('shown.bs.modal', function () {
                    $("#traerenv1_SER613G").focus();
                });
                ventanaparticulares.init(_toggleF8([{
                    input: 'nroenv1',
                    app: 'SER613G',
                    funct: this._f8envio1_SER613G
                },]));

            } else {
                this._validaciondenit_SER613G()
            }
        },
        _evaluarenvio1_SER613G() {
            _inputControl("disabled");
            if (this.SER613G.BUSENVIOW.trim() == '') this.SER613G.BUSENVIOW = 'N'
            $('#traerenv1_SER613G').val(this.SER613G.BUSENVIOW);
            validarInputs({
                form: '#TRAERENVIO1_SER613G',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER613G.BUSENVIOW = $('#traerenv1_SER613G').val().toUpperCase();
                    $('#traerenv1_SER613G').val(this.SER613G.BUSENVIOW)
                    if (this.SER613G.BUSENVIOW == 'S' || this.SER613G.BUSENVIOW == 'N') {
                        if (this.SER613G.BUSENVIOW == 'N') {
                            $('.btn-primary').click();
                        } else {
                            this._evaluarnroenviovent1_SER613G()
                        }

                    } else {
                        this._evaluarenvio1_SER613G()
                    }
                }
            )
        },
        _evaluarnroenviovent1_SER613G() {
            validarInputs({
                form: '#NROENVIO1_SER613G',
                orden: "1"
            },
                () => { this._evaluarenvio1_SER613G() },
                () => {
                    this.SER613G.NROENVIORIPS = $('#nroenv1_SER613G').val();
                    this.SER613G.NROENVIORIPS = this.SER613G.NROENVIORIPS.toString().padStart(6, '0')
                    $('#nroenv1_SER613G').val(this.SER613G.NROENVIORIPS);
                    postData({
                        datosh: datosEnvio() + this.SER613G.NROENVIORIPS + '| |1|'
                    }, get_url("APP/SALUD/SER442-01.DLL"))
                        .then((data) => {
                            this.SER613G.COMPLETOENVIO = data['ENVIOS'][0];
                            this.form.entidad_SER613G = this.SER613G.COMPLETOENVIO.NIT;
                            this.form.descripentid_SER613G = this.SER613G.COMPLETOENVIO.DESCRIPTER;
                            this.form.eps_SER613G = this.SER613G.COMPLETOENVIO.ENTIDAD;
                            this.form.descripeps_SER613G = this.SER613G.COMPLETOENVIO.DESCRIPENT;
                            this.form.perido_SER613G = this.SER613G.COMPLETOENVIO.PER_ENV;
                            this.SER613G.ANOPERW = this.SER613G.COMPLETOENVIO.PER_ENV.substring(0, 4);
                            this.SER613G.MESPERW = this.SER613G.COMPLETOENVIO.PER_ENV.substring(4, 6);
                            this.SER613G.FECHAENVW = this.SER613G.COMPLETOENVIO.FECHA_ENV;
                            this.form.anofin_SER613G = this.SER613G.FECHAENVW.substring(0, 4);
                            this.form.mesfin_SER613G = this.SER613G.FECHAENVW.substring(4, 6);
                            this.form.diafin_SER613G = this.SER613G.FECHAENVW.substring(6, 8);
                            this.SER613G.OBSERV = this.SER613G.COMPLETOENVIO.OBSERV;
                            this.form.oper_SER613G = this.SER613G.COMPLETOENVIO.OPER + ' ' + this.SER613G.COMPLETOENVIO.FECHA_CRE;
                            this.SER613G.FECHACRE = this.SER613G.COMPLETOENVIO.FECHA_CRE;
                            this.form.md_SER613G = this.SER613G.COMPLETOENVIO.OPER_MOD + ' ' + this.SER613G.COMPLETOENVIO.FECHA_MOD;
                            this.SER613G.FECHAMOD = this.SER613G.COMPLETOENVIO.FECHA_MOD;
                            this.SER613G.CANTCARP = this.SER613G.COMPLETOENVIO.CANT_CARP;
                            this.SER613G.CANTFOLIO = this.SER613G.COMPLETOENVIO.CANT_FOLIO;
                            this.SER613G.SEGRIPSNUM = this.SER613G.COMPLETOENVIO.SEG;
                            this.SER613G.COMPLETOENVIO.TAB_REG_ENV.pop()
                            this.tablafactenvio_SER613G = this.SER613G.COMPLETOENVIO.TAB_REG_ENV;
                            this.SER613G.VALID = '1'
                            $('.btn-primary').click();
                        })
                        .catch((error) => {
                            console.log(error);
                            this._evaluarnroenviovent1_SER613G();
                        });
                }
            )
        },

        _validaciondenit_SER613G() {
            if (($_USUA_GLOBAL[0].NIT == 800162035) && (this.form.entidad_SER613G == 9998 || this.form.entidad_SER613G == 9999)) {
                this.SER613G.SWPARTIC = '0';
            } else {
                if ((this.SER613G.ACTTERCERO == '25') || (this.SER613G.ACTTERCERO == '30') || (this.SER613G.ACTTERCERO == '27')) {
                    this.SER613G.SWPARTIC = '1';
                } else {
                    this.SER613G.SWPARTIC = '0';
                }
            }
            this._evaluarentidad_SER613G()
        },
        _evaluarentidad_SER613G() {
            if (this.form.eps_SER613G.trim() == '') {
                this._evaluarfechaini_SER613G('1');
            } else {
                let res = this.SER613G.ENTIDADES.find(e => e['COD-ENT'].trim() == this.form.eps_SER613G.trim());
                if (res == undefined) {
                    jAlert({ titulo: 'Error ', mensaje: 'No existe el codigo de la entidad, debe actualizar el campo de la entidad en el tercero del cliente opcion 1-3-1.' }, this._evaluarnit_SER613G);
                } else {
                    this.form.descripeps_SER613G = res['NOMBRE-ENT'];
                    this._evaluarfechaini_SER613G('1');
                }
            }
        },
        _evaluarfechaini_SER613G(orden) {
            if (this.form.mesini_SER613G.trim() == '') {
                this.form.anoini_SER613G = this.SER613G.ANOINIW
                this.form.mesini_SER613G = this.SER613G.MESINIW
                this.form.diaini_SER613G = this.SER613G.DIAINIW
            }
            validarInputs(
                {
                    form: "#FECHAINI_SER613G",
                    orden: orden,
                },
                () => { this._evaluarnit_SER613G() },
                () => {
                    if (this.SER613G.ANOENVW < this.form.anoini_SER613G || this.form.anoini_SER613G.toString().trim() == "") {
                        CON851("", "A�o incorrecto! ", this._evaluarfechaini_SER613G("1"), "error", "error");
                    } else {
                        this.form.mesini_SER613G = this.form.mesini_SER613G.padStart(2, '0')
                        if (this.form.mesini_SER613G.toString().trim() == "" || parseInt(this.form.mesini_SER613G) < 1 || parseInt(this.form.mesini_SER613G) > 12) {
                            CON851("", "Mes incorrecto! ", this._evaluarfechaini_SER613G("2"), "error", "error");
                        } else {
                            if (this.form.novedad_SER613G.substring(0, 1) == '7') {
                                switch (this.form.mesini_SER613G) {
                                    case '01':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '02':
                                        if ((parseInt(this.SER613G.ANOENVW) == 2012) || (parseInt(this.SER613G.ANOENVW) == 2016) || (parseInt(this.SER613G.ANOENVW) == 2020) || (parseInt(this.SER613G.ANOENVW) == 2024) || (parseInt(this.SER613G.ANOENVW) == 2028)) {
                                            this.SER613G.DIAMAX = 29;
                                            this._datodiaini_SER613G();
                                        } else {
                                            this.SER613G.DIAMAX = 28;
                                            this._datodiaini_SER613G();
                                        }
                                        break;
                                    case '03':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '04':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '05':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '06':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '07':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '08':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '09':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '10':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '11':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiaini_SER613G();
                                        break;
                                    case '12':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiaini_SER613G();
                                        break;
                                    default:
                                        this._evaluarfechaini_SER613G('2')
                                        break;
                                }
                            } else {
                                this._datodiaini_SER613G();
                            }
                        }
                    }
                },
            );
        },
        _datodiaini_SER613G() {
            if (this.form.diaini_SER613G == 0) {
                this.form.diaini_SER613G = this.SER613G.DIAMAX;
            }
            validarInputs(
                {
                    form: "#FECHADIANI_SER613G",
                    orden: '1'
                },

                () => {
                    this._evaluarfechaini_SER613G("1")
                },
                () => {
                    this.form.diaini_SER613G = this.form.diaini_SER613G.toString().padStart(2, '0')
                    this.SER613G.FECHAINIW = this.form.anoini_SER613G + this.form.mesini_SER613G + this.form.diaini_SER613G;
                    if (this.form.diaini_SER613G < 1 || this.form.diaini_SER613G > SER613G.DIAMAX) {
                        return this._datodiaini_SER613G();
                    }
                    if ((parseInt(this.SER613G.FECHAINIW) > parseInt(this.SER613G.FECHACTL))) {
                        CON851('37', '37', null, 'error', 'error');
                        return this._datodiaini_SER613G()
                    } else {
                        this._evaluarfechafin_SER613G('1');
                    }
                }
            )
        },
        _evaluarfechafin_SER613G(orden) {
            if (this.form.mesfin_SER613G.trim() == '') {
                this.form.anofin_SER613G = '20' + this.SER613G.ANO_LNK
                this.form.mesfin_SER613G = this.SER613G.MES_LNK
            }
            this.form.diafin_SER613G = this.SER613G.DIA_LNK
            validarInputs(
                {
                    form: "#FECHAFIN_SER613G",
                    orden: orden,
                },
                () => { this._datodiaini_SER613G() },
                () => {
                    if (this.form.anofin_SER613G < this.form.anoini_SER613G || this.form.anofin_SER613G.trim() == "") {
                        CON851("", "A�o incorrecto! ", this._evaluarfechafin_SER613G("1"), "error", "error");
                    } else {
                        this.form.mesfin_SER613G = this.form.mesfin_SER613G.padStart(2, '0')
                        if (this.form.mesfin_SER613G.trim() == "" || this.form.mesfin_SER613G < 1 || this.form.mesfin_SER613G > 12) {
                            CON851("", "Mes incorrecto! ", this._evaluarfechafin_SER613G("2"), "error", "error");
                        } else {
                            if (this.form.novedad_SER613G.substring(0, 1) == '7') {
                                switch (this.form.mesfin_SER613G) {
                                    case '01':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '02':
                                        if ((parseInt(this.SER613G.ANOENVW) == 2012) || (parseInt(this.SER613G.ANOENVW) == 2016) || (parseInt(this.SER613G.ANOENVW) == 2020) || (parseInt(this.SER613G.ANOENVW) == 2024) || (parseInt(this.SER613G.ANOENVW) == 2028)) {
                                            this.SER613G.DIAMAX = 29;
                                            this._datodiafin_SER613G();
                                        } else {
                                            this.SER613G.DIAMAX = 28;
                                            this._datodiafin_SER613G();
                                        }
                                        break;
                                    case '03':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '04':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '05':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '06':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '07':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '08':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '09':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '10':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '11':
                                        this.SER613G.DIAMAX = 30;
                                        this._datodiafin_SER613G();
                                        break;
                                    case '12':
                                        this.SER613G.DIAMAX = 31;
                                        this._datodiafin_SER613G();
                                        break;
                                    default:
                                        this._evaluarfechafin_SER613G('2')
                                        break;
                                }
                            } else {
                                this._datodiafin_SER613G();
                            }
                        }
                    }
                },
            );
        },
        _datodiafin_SER613G() {
            if (this.form.diafin_SER613G == 0) {
                this.form.diafin_SER613G = this.SER613G.DIAMAX;
            }
            validarInputs(
                {
                    form: "#FECHADIAFIN_SER613G",
                    orden: '1'
                },
                () => {
                    this._evaluarfechafin_SER613G("1")
                },
                () => {
                    this.form.diafin_SER613G = this.form.diafin_SER613G.toString().padStart(2, '0')
                    this.SER613G.FECHAFINW = this.form.anofin_SER613G + this.form.mesfin_SER613G + this.form.diafin_SER613G;
                    if (this.form.diafin_SER613G < 1 || this.form.diafin_SER613G > this.SER613G.DIAMAX) {
                        this._datodiafin_SER613G();
                    } else if (this.SER613G.FECHAFINW < this.SER613G.FECHAINIW || (parseInt(this.SER613G.FECHAINIW) > parseInt(this.SER613G.FECHACTL))) {
                        CON851('37', '37', this._datodiafin_SER613G(), 'error', 'error');
                    } else {
                        this._datocosto_SER613G();
                    }
                }
            )
        },
        _datocosto_SER613G() {
            if (this.form.costo_SER613G.trim() == '') {
                this.form.costo_SER613G = '****';
            }
            validarInputs(
                {
                    form: "#CCOSTO_SER613G",
                    orden: '1'
                },
                () => {
                    this._datodiafin_SER613G()
                },
                () => {
                    if (this.form.costo_SER613G == '****') {
                        this.SER613G.NOMBRECOSTO = 'TODOS';
                        this.form.descripcosto_SER613G = SER613G.NOMBRECOSTO
                        this._validacionprefijo_SER613G();
                    } else if (this.form.costo_SER613G.trim() == '') {
                        this._datocosto_SER613G();
                    } else {
                        this.form.costo_SER613G = this.form.costo_SER613G.padStart(4, "0")
                        let res = this.SER613G.COSTO.find(e => e.COD == this.form.costo_SER613G);
                        if (res == undefined) {
                            CON851("01", "01", this._datocosto_SER613G(), "error", "error");
                        } else {
                            this.form.descripcosto_SER613G = res.NOMBRE;
                            this._validacionprefijo_SER613G();

                        }
                    }
                })
        },
        _validacionprefijo_SER613G() {
            if (this.form.prefijotabla_SER613G == '*' || this.form.prefijotabla_SER613G.trim() == '') this.form.prefijotabla_SER613G = "A";
            if (this.SER613G.SWSTOP == '1') {
                CON851('7T', '7T', null, 'error', 'error');
                $_this = this
                $_OPSEGU = 'IS74D';
                let datos_envio = datosEnvio()
                datos_envio += localStorage.Usuario + '|' + $_OPSEGU
                let URL = get_url("APP/CONTAB/CON904.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        $_this._aceptarprefijo_SER613G();
                    })
                    .catch(err => {
                        console.debug(err);
                        $_this._ventanasoat_SER613G();
                    })
            } else {
                this._aceptarprefijo_SER613G();
            }
        },
        _aceptarprefijo_SER613G() {
            this.form.itemtabla_SER613G = this.tablafactenvio_SER613G.length + 1;
            if (this.form.itemtabla_SER613G > 300) this._ventanasoat_SER613G()
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
                    form: "#PREFIJO_SER613G",
                    orden: '1',
                    event_f3: this._ventanasoat_SER613G
                }, this._datocosto_SER613G,
                () => {
                    this.form.prefijotabla_SER613G = this.form.prefijotabla_SER613G.toUpperCase();
                    if ((this.form.prefijotabla_SER613G == "A") || (this.form.prefijotabla_SER613G == "B") || (this.form.prefijotabla_SER613G == "D") || (this.form.prefijotabla_SER613G == "F")
                        || (this.form.prefijotabla_SER613G == "G") || (this.form.prefijotabla_SER613G == "H") || (this.form.prefijotabla_SER613G == "I") || (this.form.prefijotabla_SER613G == "J")
                        || (this.form.prefijotabla_SER613G == "K") || (this.form.prefijotabla_SER613G == "L") || (this.form.prefijotabla_SER613G == "M") || (this.form.prefijotabla_SER613G == "N")
                        || (this.form.prefijotabla_SER613G == "O") || (this.form.prefijotabla_SER613G == "P") || (this.form.prefijotabla_SER613G == "Q") || (this.form.prefijotabla_SER613G == "R")
                        || (this.form.prefijotabla_SER613G == "S") || (this.form.prefijotabla_SER613G == "T") || (this.form.prefijotabla_SER613G == "V") || (this.form.prefijotabla_SER613G == "W")
                        || (this.form.prefijotabla_SER613G == "X") || (this.form.prefijotabla_SER613G == "Y") || (this.form.prefijotabla_SER613G == "Z") || (this.form.prefijotabla_SER613G == "*")) {
                        if ((this.form.prefijotabla_SER613G == "*") && (this.SER613G.SWPARTIC == '0')) {
                            this._buscartodas_SER613G();
                        } else {
                            this._aceptarnumero_SER613G();
                        }
                    } else {
                        this._aceptarprefijo_SER613G();
                    }
                }
            )
        },
        _aceptarnumero_SER613G() {
            _FloatText({ estado: 'off' })
            validarInputs(
                {
                    form: "#FACTURAS_SER613G",
                    orden: '1'
                },
                () => { this._aceptarprefijo_SER613G(); },
                () => {
                    this.form.facturatabla_SER613G = this.form.facturatabla_SER613G.padStart(6, '0')
                    if (this.form.prefijotabla_SER613G == "*") {
                        this._buscartodas_SER613G();
                    } else {
                        if (this.form.facturatabla_SER613G.trim() == '') {
                            CON851('01', '01', null, 'error', 'error');
                            this._aceptarnumero_SER613G();
                        } else {
                            this.SER613G.LLAVENUM = this.form.prefijotabla_SER613G + this.form.facturatabla_SER613G;
                            let URL = get_url("APP/SALUD/SER808-01.DLL");
                            postData({
                                datosh: datosEnvio() + this.SER613G.LLAVENUM + "|",
                            }, URL)
                                .then(data => {
                                    this.SER613G.NUMER = data.NUMER19[0];
                                    this.SER613G.NITNUM = this.SER613G.NUMER.NIT_NUM.trim()
                                    this.SER613G.DESCRIPNUM = this.SER613G.NUMER.DESCRIP_NUM.trim()
                                    this.SER613G.FECHASALNUM = this.SER613G.NUMER.FECHA_RET.trim()
                                    this.SER613G.ANORETNUM = this.SER613G.FECHASALNUM.substring(0, 4);
                                    this.SER613G.MESRETNUM = this.SER613G.FECHASALNUM.substring(4, 6);
                                    this.SER613G.DIARETNUM = this.SER613G.FECHASALNUM.substring(6, 8);
                                    this.SER613G.FACTCAPITNUMW = this.SER613G.NUMER.FACTCAPIT_NUM.trim()
                                    this.SER613G.CCOSTONUM = this.SER613G.NUMER.COSTO_NUM.trim()
                                    this.SER613G.ELENVIONUM = this.SER613G.NUMER.ELENVIO.trim()
                                    this.SER613G.CUFEELECNUM = this.SER613G.NUMER.CUFEELEC_NUM.trim()
                                    this.SER613G.ESTADONUM = this.SER613G.NUMER.ESTADO_NUM.trim()
                                    if (parseInt(this.SER613G.FECHASALNUM) < parseInt(this.SER613G.FECHAMAXIMA)) {
                                        if (this.SER613G.SWFECHAMAXIMA != 'S') {
                                            return CON851P("Desea ajustar fecha",
                                                this._aceptarnumero_SER613G,
                                                () => {
                                                    this.SER613G.SWFECHAMAXIMA = 'S'
                                                    if (this.form.costo_SER613G == '****') {
                                                        return this._novedadtabla_SER613G();
                                                    }
                                                    if (this.form.costo_SER613G == this.SER613G.CCOSTONUM) {
                                                        return this._novedadtabla_SER613G();
                                                    }
                                                    CON851('61', '61', null, 'error', 'error');
                                                    this._aceptarnumero_SER613G()
                                                }
                                            )
                                        }
                                    }

                                    if (this.form.costo_SER613G == '****') {
                                        return this._novedadtabla_SER613G();
                                    }
                                    if (this.form.costo_SER613G == this.SER613G.CCOSTONUM) {
                                        return this._novedadtabla_SER613G();
                                    }
                                    CON851('61', '61', null, 'error', 'error');
                                    this._aceptarnumero_SER613G()
                                })
                                .catch(error => {
                                    console.error(error)
                                    this._aceptarnumero_SER613G();
                                });
                        }
                    }
                })
        },
        _novedadtabla_SER613G() {
            this.SER613G.VALID = ' '
            validarInputs(
                {
                    form: "#OK_SER613G",
                    orden: '1'
                },
                () => { this._aceptarnumero_SER613G(); },
                () => {

                    this.form.ingreseok_SER613G = this.form.ingreseok_SER613G.toUpperCase();
                    if (this.form.ingreseok_SER613G == 'R') {
                        $_this = this
                        $_OPSEGU = 'IS74D';
                        let datos_envio = datosEnvio()
                        datos_envio += localStorage.Usuario + '|' + $_OPSEGU
                        let URL = get_url("APP/CONTAB/CON904.DLL");
                        postData({ datosh: datos_envio }, URL)
                            .then(function (data) {
                                console.log(data)
                                $_this._otrasvalidaciones_SER613G();
                            })
                            .catch(err => {
                                console.debug(err);
                                $_this._novedadtabla_SER613G();
                            })
                    } else {
                        if (this.SER613G.ESTADONUM != '1') {
                            CON851('', 'Factura abierta!', this._novedadtabla_SER613G(), 'error', 'error');
                        } else {
                            if (this.SER613G.CUFEELECNUM.trim() != '') {
                                CON851('', `Factura ya fue radicada en el envio ${this.SER613G.ELENVIONUM}`, this._novedadtabla_SER613G(), 'error', 'error');
                            } else {
                                if (this.SER613G.ANORETNUM != this.SER613G.ANOPERW && this.SER613G.MESPERW == this.SER613G.MESRETNUM) {
                                    CON851('', 'Error en la fecha de retiro!', this._novedadtabla_SER613G(), 'error', 'error');
                                } else {
                                    this._otrasvalidaciones_SER613G();
                                }
                            }
                        }
                    }
                })
        },
        _otrasvalidaciones_SER613G() {
            if (this.form.ingreseok_SER613G == 'R') {
                this._borrartabla_SER613G();
            } else if (this.form.ingreseok_SER613G.trim() == '') {
                if (parseInt($_this.SER613G.NITNUM) != this.form.entidad_SER613G) {
                    CON851('06', '06', null, 'error', 'error');
                    if (this.form.ingreseok_SER613G != 'R') {
                        this._aceptarnumero_SER613G();
                    } else {
                        this._borrartabla_SER613G();
                    }
                } else {
                    this._cuartavalidacion_SER613G();
                }
            } else {
                this._novedadtabla_SER613G();
            }
        },
        _cuartavalidacion_SER613G() {
            if ((this.SER613G.ANORETNUM == this.form.anoini_SER613G) && (this.SER613G.MESRETNUM == this.form.mesini_SER613G)) {
                this._quintavalidacion_SER613G();
            } else {
                if ($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 845000038) {
                    this._quintavalidacion_SER613G();
                } else {
                    CON851('37', '37', null, 'error', 'error');
                    if (this.form.ingreseok_SER613G != 'R') {
                        this._aceptarnumero_SER613G();
                    }
                }
            }
        },
        _quintavalidacion_SER613G() {
            if ((parseInt(this.SER613G.ELENVIONUM) > 0) && (parseInt(this.SER613G.ELENVIONUM) != parseInt(this.form.numero_SER613G))) {
                CON851('', `Factura esta en el envio ${this.SER613G.ELENVIONUM}`, null, 'error', 'error');
                if (this.form.ingreseok_SER613G == 'R' || $_USUA_GLOBAL[0].NIT == 900047282) {
                    this._adicionatabla_SER613G();
                } else {
                    this._aceptarnumero_SER613G();
                }
            } else {
                this._adicionatabla_SER613G();
            }
        },
        //////////////VALIDACIONES DE TABLA/////////////////////
        _borrartabla_SER613G() {
            for (var i in this.tablafactenvio_SER613G) {
                if (this.tablafactenvio_SER613G[i].NUMERO == this.form.facturatabla_SER613G && this.tablafactenvio_SER613G[i].PREFIJO == this.form.prefijotabla_SER613G) {
                    this.SER613G.ITEMW = i
                    this.tablafactenvio_SER613G.splice(this.SER613G.ITEMW, 1);
                }
            }
            this._consultarborrartabla_SER613G()
            setTimeout(this._inicializa_SER613G(), 300);
            this.form.itemtabla_SER613G = this.form.itemtabla_SER613G - 1
            setTimeout(this._validacionprefijo_SER613G(), 500);
        },
        _consultarborrartabla_SER613G() {
            postData({
                datosh: datosEnvio() + '3|' + this.form.numero_SER613G + '|' + this.form.numero_SER613G + '|||||||||||||||' + this.form.prefijotabla_SER613G + this.form.facturatabla_SER613G + '|'
            }, get_url("APP/SALUD/SER613G.DLL"))
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.log(error);

                });
        },
        _adicionatabla_SER613G() {
            console.log(this.ELECTRONICA, 'CREADA')
            let factura = this.ELECTRONICA.filter(x => x.FACTURA == this.form.prefijotabla_SER613G + this.form.facturatabla_SER613G);
            if (factura.length > 0) {
                CON851("", "Factura repetida", this._aceptarnumero_SER613G(), "error", "Error");
            } else {
                this.tablafactenvio_SER613G.push({
                    PREFIJO: this.form.prefijotabla_SER613G,
                    NUMERO: this.form.facturatabla_SER613G,
                });
                this.ELECTRONICA.push({ FACTURA: this.form.prefijotabla_SER613G + this.form.facturatabla_SER613G })
                this._inicializa_SER613G()
                if (this.tablafactenvio_SER613G.length > 3000) {
                    this._evaluargrabado_SER613G()
                } else {
                    this.form.itemtabla_SER613G++
                    let numerofact = this.tablafactenvio_SER613G
                    numerofact.sort((a, b) => {
                        if (a.NUMERO > b.NUMERO) {
                            return 1;
                        }
                        if (a.NUMERO < b.NUMERO) {
                            return -1;
                        }
                        return 0;
                    })
                    this._validacionprefijo_SER613G()
                }
            }
        },
        _inicializa_SER613G() {
            this.form.prefijotabla_SER613G = ''
            this.form.facturatabla_SER613G = ''
            this.form.ingreseok_SER613G = ''
        },
        /////////////////////////OTRAS VALIDACIONES///////////
        _llenardatos_SER613G() {
            this.form.entidad_SER613G = this.SER613G.ELECTFACTURACION.NIT
            this.form.descripentid_SER613G = this.SER613G.ELECTFACTURACION.NOMBRE_TER
            this.SER613G.FECHAFINW = this.SER613G.ELECTFACTURACION.FECHA
            this.form.anofin_SER613G = this.SER613G.FECHAFINW.substring(0, 4)
            this.form.mesfin_SER613G = this.SER613G.FECHAFINW.substring(4, 6)
            this.form.diafin_SER613G = this.SER613G.FECHAFINW.substring(6, 8)
            this.form.anoini_SER613G = this.SER613G.FECHAFINW.substring(0, 4)
            this.form.mesini_SER613G = this.SER613G.FECHAFINW.substring(4, 6)
            this.form.diaini_SER613G = "01"
            this.form.perido_SER613G = this.SER613G.ELECTFACTURACION.PER
            this.SER613G.PERINIW = this.SER613G.ELECTFACTURACION.PER
            this.form.oper_SER613G = this.SER613G.ELECTFACTURACION.OPER_CRE + ' ' + this.SER613G.ELECTFACTURACION.FECHA_CRE
            this.form.md_SER613G = this.SER613G.ELECTFACTURACION.OPER_MOD + ' ' + this.SER613G.ELECTFACTURACION.FECHA_MOD
            this.form.eps_SER613G = this.SER613G.ELECTFACTURACION.ENTIDAD
            this.form.descripeps_SER613G = this.SER613G.ELECTFACTURACION.NOM_ENTIDAD
            this.SER613G.ELECTFACTURACION.TABLA_FACTELEC.pop()
            let numerofact = this.SER613G.ELECTFACTURACION.TABLA_FACTELEC
            numerofact.sort((a, b) => {
                if (a.NUMERO > b.NUMERO) {
                    return 1;
                }
                if (a.NUMERO < b.NUMERO) {
                    return -1;
                }
                return 0;
            })
            this.tablafactenvio_SER613G = this.SER613G.ELECTFACTURACION.TABLA_FACTELEC
            for (var i in this.SER613G.ELECTFACTURACION.TABLA_FACTELEC) {
                this.ELECTRONICA.push({ FACTURA: this.SER613G.ELECTFACTURACION.TABLA_FACTELEC[i].PREFIJO + this.SER613G.ELECTFACTURACION.TABLA_FACTELEC[i].NUMERO })
            }
            this.SER613G.SEGELECNUM = this.SER613G.ELECTFACTURACION.SEG
            if (this.SER613G.SEGELECNUM == 'S') this.SER613G.SWSTOP = '1';
            let facturas = this.SER613G.ELECTFACTURACION.TABLA_FACTELEC
            let fechaanterior = facturas.filter(data => data.FECHAMAXIMA == 'S')
            if (fechaanterior.length > 0) {
                return CON851P("Desea ajustar fecha", this._datonumero_SER613G,
                    () => {
                        this.SER613G.SWFECHAMAXIMA = 'S';
                        this._validacionesfechas_SER613G()
                    },
                )
            } else {
                this._validacionesfechas_SER613G()
            }
        },
        _validacionesfechas_SER613G() {
            if (parseInt(this.SER613G.MESPERW) == 0 || parseInt(this.SER613G.ANOPERW) == 2000) {
                this.SER613G.PERINIW = this.SER613G.PERINILOCAL
                return this._datonumero_SER613G()
            }
            if (this.SER613G.PERINILOCAL != this.SER613G.PERINIW) {
                CON851('37', '37', null, 'error', 'error');
                if ((localStorage.Usuario == 'GEBC') || (localStorage.Usuario == '0101' && this.form.novedad_SER613G.substring(0, 1) == '8')) {
                    return this._asignarparticular_SER613G()
                } else {
                    return this._datonumero_SER613G()
                }
            } else {
                return this._asignarparticular_SER613G()
            }
        },
        _buscartodas_SER613G() {
            this.form.prefijotabla_SER613G = "A";
            this.SER613G.SERVICIOW = '**';
            this.SER613G.CIUDADW = '*****';
            this.SER613G.SEBUSCAR = '00';
            this.SER613G.ANORETNUM = this.form.anoini_SER613G;
            this.SER613G.MESRETNUM = this.form.mesini_SER613G;
            this.SER613G.DIARETNUM = '01';
            this.SER613G.FECHARETNUM = this.SER613G.ANORETNUM + this.SER613G.MESRETNUM + this.SER613G.DIARETNUM;
            let URL = get_url("APP/SALUD/SER613G-01.DLL");
            postData({ datosh: datosEnvio() + this.SER613G.FECHARETNUM + '|' + this.form.anoini_SER613G + '|' + this.form.mesini_SER613G + '|' + this.form.costo_SER613G + '|' + this.form.entidad_SER613G + '|' + this.SER613G.SERVICIOW + '|' + this.form.numero_SER613G + '|' + this.SER613G.FECHAMAXIMA + '|' }, URL)
                .then(data => {
                    SER613G.TODASFACT = data['FACT'];
                    SER613G.TODASFACT.pop()
                    let numerofact = SER613G.TODASFACT
                    numerofact.sort((a, b) => {
                        if (a.NUMERO > b.NUMERO) {
                            return 1;
                        }
                        if (a.NUMERO < b.NUMERO) {
                            return -1;
                        }
                        return 0;
                    })
                    let facturas = SER613G.TODASFACT;
                    let fechasanteriores = facturas.filter(data => data.FECHAMAXIMA == 'S')
                    if (fechasanteriores.length > 0) {
                        return CON851P("Desea ajustar fecha", () => { return this._aceptarprefijo_SER613G() },
                            () => {
                                this.SER613G.SWFECHAMAXIMA = 'S'
                                if (localStorage.Usuario == '0800251482') {
                                    return this._ventanaservicios_SER613G()
                                }
                                this.tablafactenvio_SER613G = SER613G.TODASFACT
                                return this._aceptarprefijo_SER613G()
                            })
                    }
                    if (localStorage.Usuario == '0800251482') {
                        return this._ventanaservicios_SER613G();
                    }
                    this.tablafactenvio_SER613G = SER613G.TODASFACT
                    this._aceptarnumero_SER613G()
                })
                .catch(err => {
                    if (localStorage.Usuario == '0800251482') {
                        this._ventanaservicios_SER613G();
                    } else {
                        this._aceptarprefijo_SER613G()
                    }
                })
        },
        _ventanaservicios_SER613G() {
            console.log('FALTA VENTANA DE SERVICIOS ')
        },

        _ventanasoat_SER613G() {
            $_this = this
            var ventanaorganiza = bootbox.dialog({
                size: 'large',
                title: 'ORGANIZAR FACTURA POR',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + 'Organiza:' + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="ORGANIZAR_SER613G"> ' +
                    '<input id="seleccione_SER613G" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Cambiar x fecha de atencion?:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="FECHAATEN_SER613G"> ' +
                    '<input id="fechaatencion_SER613G" class="form-control input-md" data-orden="1" maxlength="1" placeholder= "S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanaorganiza.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluargrabado_SER613G() }, 500)
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanaorganiza.off('show.bs.modal');
                            setTimeout(() => { $_this._datocosto_SER613G() }, 500)
                        }
                    }
                }
            });
            ventanaorganiza.init($('.modal-footer').hide());
            ventanaorganiza.init(() => {
                setTimeout(this._evaluarseleccion_SER613G, 500)
            });
            ventanaorganiza.on('shown.bs.modal', function () {
                $("#seleccione_SER613G").focus();
            });
        },
        _evaluarseleccion_SER613G() {
            _inputControl("disabled");
            // var organiza = [
            //     { COD: "1", DESCRIP: "Comprobante" },
            //     { COD: "2", DESCRIP: "Fecha" },
            //     { COD: "3", DESCRIP: "Nombre" },
            // ];
            // POPUP(
            //     {
            //         array: organiza,
            //         titulo: "Organiza por",
            //         indices: [
            //             {
            //                 id: "COD",
            //                 label: "DESCRIP",
            //             },
            //         ],
            //         seleccion: this.SER613G.ORGANIZAW,
            //         callback_f: () => {
            //             $('.btn-danger').click()
            //         },
            //     },
            //     organiza => {
            //         console.log(organiza);
            //         this.SER613G.ORGANIZAW = organiza.COD
            //         $('#seleccione_SER613G').val(organiza.COD + " - " + organiza.DESCRIP);
            //         this._evaluarfechaaten_SER613G()
            //     },
            // );
            $('#seleccione_SER613G').val("1 - Comprobante");
            this._evaluarfechaaten_SER613G()

        },
        _evaluarfechaaten_SER613G() {
            if (this.SER613G.FECHAATEN.trim() == '') this.SER613G.FECHAATEN = 'N'
            $('#fechaatencion_SER613G').val(this.SER613G.FECHAATEN);
            validarInputs({
                form: '#FECHAATEN_SER613G',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER613G.FECHAATEN = $('#fechaatencion_SER613G').val();
                    if (this.SER613G.FECHAATEN == 'S' || this.SER613G.FECHAATEN == 'N') {
                        this.SER613G.SWDEVOL = 'N'
                        $('.btn-primary').click();
                    } else {
                        this._evaluarfechaaten_SER613G()
                    }
                }
            )
        },
        ///////////////GRABADO///////////////////////////////////
        _evaluargrabado_SER613G() {
            if (this.SER613G.VALID == '1') {
                if (this.SER613G.CUFEELECNUM.trim() != '') {
                    CON851('', 'Factura ya tiene cufe!', this._validacionprefijo_SER613G(), 'error', 'error');
                } else {
                    if ((parseInt(this.SER613G.ELENVIONUM) > 0) && (parseInt(this.SER613G.ELENVIONUM) != parseInt(this.form.numero_SER613G))) {
                        CON851(this.SER613G.LLAVE_NUM, '9J', this._validacionprefijo_SER613G(), 'error', 'error');
                    } else {
                        this._fechaatencion_SER613G();
                    }
                }

            } else {
                if (this.tablafactenvio_SER613G.length == 0) {
                    if (localStorage.Usuario == "GEBC") {
                        CON851P("01", this._datocosto_SER613G, this._grabar_SER613G)
                    } else {
                        CON851('', 'Tabla vacia', this._validacionprefijo_SER613G(), 'error', 'error');
                    }

                } else {
                    this._fechaatencion_SER613G()
                }
            }
        },
        _fechaatencion_SER613G() {
            CON851P("Desea ver fecha de atencion",
                () => {
                    this.SER613G.SWFECHAATENCION = 'N';
                    setTimeout(() => CON851P("01", this._datocosto_SER613G, this._grabar_SER613G), 300);
                },
                () => {
                    this.SER613G.SWFECHAATENCION = 'S';
                    setTimeout(() => CON851P("01", this._datocosto_SER613G, this._grabar_SER613G), 300);
                }
            );
        },
        _grabar_SER613G() {
            loader("show");
            if (this.form.novedad_SER613G.substring(0, 1) == '7') {
                this.SER613G.FECHACREW = moment().format("YYMMDD");
                this.SER613G.OPEERCREW = localStorage.Usuario
                this.SER613G.FECHAMODW = '000000'
                this.SER613G.OPEERMODW = ''
            } else {
                this.SER613G.FECHACREW = this.SER613G.ELECTFACTURACION.FECHA_CRE
                this.SER613G.OPEERCREW = this.SER613G.ELECTFACTURACION.OPER_CRE
                this.SER613G.FECHAMODW = moment().format("YYMMDD");
                this.SER613G.OPEERMODW = localStorage.Usuario
            }
            var data = {};
            var lin = 1;
            for (var i in this.tablafactenvio_SER613G) {
                data['LIN-' + lin.toString().padStart(3, '0')] = this.tablafactenvio_SER613G[i].PREFIJO + this.tablafactenvio_SER613G[i].NUMERO + '|';
                lin++;
            }
            this.SER613G.FECHAULTMOV = moment().format("YYMMDD");
            data.datosh = `${datosEnvio()}2|${this.form.numero_SER613G}|${this.form.numero_SER613G}|${this.form.novedad_SER613G.substring(0, 1)}|${this.form.entidad_SER613G}|${this.form.perido_SER613G}|${this.SER613G.FECHAFINW}||${this.SER613G.OPEERCREW}|${this.SER613G.FECHACREW}|${this.SER613G.OPEERMODW}|${this.SER613G.FECHAMODW}|||||`
            postData(data, get_url("APP/SALUD/SER613G.DLL"))
                .then(data => {
                    this.SER613G.CONSECUTIVO = data;
                    CON851('', 'Proceso terminado', null, 'success', 'Exito');
                    if (this.form.novedad_SER613G.substring(0, 1) == '7') {
                        let URL = get_url("APP/CONTAB/CON007X.DLL");
                        postData({ datosh: datosEnvio() + this.SER613G.SECUNUM + '|' + this.SER613G.FECHAULTMOV + '|' + this.SER613G.CONSECUTIVO + '|' }, URL)
                            .then(data => {
                                loader("hide");
                                this.SER613G.CONTEO = 0;
                                this._generartransacc_SER613G()
                            })
                            .catch(err => {
                                console.error(err);
                                loader("hide");
                                this._validacionprefijo_SER613G();
                            })
                    } else {
                        this.SER613G.CONTEO = 0;
                        this._generartransacc_SER613G()
                    }
                })
                .catch(err => {
                    console.error(err);
                    loader("hide");
                    this._validacionprefijo_SER613G();
                });
        },

        _generartransacc_SER613G() {
            if (this.SER613G.CONTEO > this.tablafactenvio_SER613G.length - 1) {
                loader("hide");
                CON851('', 'Factura/s enviada', null, 'success', 'Exito')
                CON851P("00", _toggleNav, this._impresioninforme_SER613G);
            } else {
                if (this.SER613G.ORGANIZAW == '1') {
                    let prefijo = this.tablafactenvio_SER613G[this.SER613G.CONTEO].PREFIJO;
                    let numero = this.tablafactenvio_SER613G[this.SER613G.CONTEO].NUMERO.padStart(6, '0');
                    postData({
                        datosh: `${datosEnvio()}${prefijo}${numero}|8|`,
                    }, get_url("APP/SALUD/SER808-01.DLL"))
                        .then(factura => {
                            if (factura.NUMER19[0].CUFEELEC_NUM.trim() == '') {
                                postData({ datosh: datosEnvio() + '1| |' + localStorage.getItem('Usuario').trim() + '|' + prefijo + numero + '|' }, get_url("APP/SALUD/SAL515F.DLL"))
                                    .then(data => {
                                        if (data.trim() == '') {
                                            CON851('', `Factura Aprobada ${prefijo}${numero}`, null, 'error', 'Error');
                                            this.SER613G.CONTEO++;
                                            this._generartransacc_SER613G();
                                        } else {
                                            postData({ datosh: datosEnvio() + `${localStorage.Usuario}|${prefijo}${numero}|${data}|${this.SER613G.SWFECHAMAXIMA}|${this.SER613G.FECHAMAXIMA}|${this.SER613G.SWFECHAATENCION}|` }, get_url("APP/SALUD/SAL515FE.DLL"))
                                                .then(data => {
                                                    console.log(data);
                                                    // 1 FACSE
                                                    // 2 CARVAJAL
                                                    // 3 NOVACORP
                                                    // 4 EKOMERCIO
                                                    // 5 EMISION
                                                    // CONDICIONES PARA ENVIAR EL NOMBRE DEL PROOVEDOR
                                                    // PROV FACT PREF proveedor tecnoologico -> servicio
                                                    // PRUEBA TOKEN PREF S - N si es N es produccion -> tipo_ser
                                                    // DATA SER -> dajaJson respuesta del dll
                                                    let pruebatoken = this.SER613G.PREFIJOS[0].PRUEBA_TOKEN;
                                                    let proveedor = this.SER613G.PREFIJOS[0].PROV_FACT_ELECT;
                                                    if (data[0].TOTALES.SALUD) data[0].TOTALES.SALUD = data[0].TOTALES.SALUD.replace(/�/g, "Ñ");
                                                    console.log(pruebatoken, proveedor);
                                                    _factura_electronica({ proveedor: proveedor, tipo_ser: pruebatoken, dataJson: data })
                                                        .then(data => {
                                                            data = data[0];
                                                            console.log(data);
                                                            if (data.ESTADO_ENVIO.substring(0, 2).trim() == '01') {
                                                                loader('hide');
                                                                CON851('', 'FACTURA RECHAZADA POR LA DIAN', null, 'error', 'Error');
                                                                this._aceptarprefijo_SER613G();
                                                            } else {
                                                                if (data.CUFE.CODE) {
                                                                    if (data.CUFE.CODE.trim() == 'ERROR') {
                                                                        postData({ datosh: `${datosEnvio()}5||||${prefijo}|${numero}|||||||||${parseInt(data.ESTADO_ENVIO.substring(0, 2)).toString()}|${data.FECHA.substring(6, 10)}${data.FECHA.substring(3, 5)}${data.FECHA.substring(0, 2)}|` },
                                                                            get_url("APP/SALUD/SER513.DLL"))
                                                                            .then((data) => {
                                                                                console.debug(data);
                                                                                this.SER613G.CONTEO++;
                                                                                setTimeout(this._generartransacc_SER613G, 300);
                                                                            })
                                                                            .catch(error => {
                                                                                console.error(error);
                                                                                CON851('', 'HUBO UN ERROR GRABANDO EL ESTADO DE LA FACTURA', null, 'error', 'Error');
                                                                                this._aceptarprefijo_SER613G();
                                                                            });
                                                                    } else {
                                                                        postData({ datosh: `${datosEnvio()}5||||${prefijo}|${numero}||||||||${data.CUFE.CODE.trim()}|${parseInt(data.ESTADO_ENVIO.substring(0, 2)).toString()}|${data.FECHA.substring(6, 10)}${data.FECHA.substring(3, 5)}${data.FECHA.substring(0, 2)}|` },
                                                                            get_url("APP/SALUD/SER513.DLL"))
                                                                            .then((data) => {
                                                                                console.debug(data);
                                                                                this.SER613G.CONTEO++;
                                                                                setTimeout(this._generartransacc_SER613G, 300);
                                                                            })
                                                                            .catch(error => {
                                                                                console.error(error);
                                                                                CON851('', 'HUBO UN ERROR GRABANDO EL ESTADO DE LA FACTURA', null, 'error', 'Error');
                                                                                this._aceptarprefijo_SER613G();
                                                                            });
                                                                    }
                                                                } else {
                                                                    postData({ datosh: `${datosEnvio()}5||||${prefijo}|${numero}|||||||||${parseInt(data.ESTADO_ENVIO.substring(0, 2)).toString()}|${data.FECHA.substring(6, 10)}${data.FECHA.substring(3, 5)}${data.FECHA.substring(0, 2)}|` },
                                                                        get_url("APP/SALUD/SER513.DLL"))
                                                                        .then((data) => {
                                                                            console.debug(data);
                                                                            this.SER613G.CONTEO++;
                                                                            setTimeout(this._generartransacc_SER613G, 300);
                                                                        })
                                                                        .catch(error => {
                                                                            loader("hide");
                                                                            console.error(error);
                                                                            CON851('', 'HUBO UN ERROR GRABANDO EL ESTADO DE LA FACTURA', null, 'error', 'Error');
                                                                            this._aceptarprefijo_SER613G();
                                                                        });
                                                                }
                                                            }
                                                        })
                                                    // .catch(error => {
                                                    //     loader("hide");
                                                    //     console.error(error);
                                                    //     CON851('','HUBO UN ERROR ENVIANDO LA FACTURA A LA DIAN',null,'error','Error');
                                                    //     this._aceptarprefijo_SER613G();
                                                    // })
                                                })
                                            // .catch(err => {
                                            //     loader("hide");
                                            //     console.error(err);
                                            //     CON851('','HUBO UN ERROR EN EL ENVIO A LA DIAN',null,'error','Error');
                                            //     this._aceptarprefijo_SER613G();
                                            // });
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err)
                                        loader("hide");
                                        CON851('', 'ERROR EN LA FACTURA', null, 'error', 'Error');
                                        this._aceptarprefijo_SER613G()
                                    });
                            } else {
                                CON851('', 'Factura ya tiene CUFE', null, 'success', 'Exito');
                                this.SER613G.CONTEO++;
                                this._generartransacc_SER613G();
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            loader("hide");
                            CON851('', 'ERROR AL CONSULTAR LA FACTURA', null, 'error', 'Error');
                            this._aceptarprefijo_SER613G()
                        })
                } else if (this.SER613G.ORGANIZAW == '2') {
                    postData({ datosh: datosEnvio() + '1| |' + localStorage.getItem('Usuario').trim() + '|' + this.form.prefijo_SER513 + this.form.numero_SER513 + '|' }, get_url("APP/SALUD/SAL515F2.DLL"))
                        .then(data => {

                        })
                        .catch(err => {
                            console.error(err)
                            this._aceptarprefijo_SER613G()
                        });
                } else {
                    postData({ datosh: datosEnvio() + '1| |' + localStorage.getItem('Usuario').trim() + '|' + this.form.prefijo_SER513 + this.form.numero_SER513 + '|' }, get_url("APP/SALUD/SAL515F3.DLL"))
                        .then(data => {

                        })
                        .catch(err => {
                            console.error(err)
                            this._aceptarprefijo_SER613G()
                        });
                }
            }
        },
        _impresioninforme_SER613G() {
            postData({ datosh: `${datosEnvio()}${this.SER613G.CONSECUTIVO}||${localStorage.Usuario}|` },
                get_url("APP/SALUD/SER614E.DLL"))
                .then((data) => {
                    this.SER613G.ENVIOS = data.FACTURAS[0];
                    this._impresion_SER613G();
                })
                .catch(error => {
                    console.error(error);
                    _toggleNav()
                });
        },
        _impresion_SER613G() {
            let mes = {
                '01': 'ENERO',
                '02': 'FEBRERO',
                '03': 'MARZO',
                '04': 'ABRIL',
                '05': 'MAYO',
                '06': 'JUNIO',
                '07': 'JULIO',
                '08': 'AGOSTO',
                '09': 'SEPTIEMBRE',
                '10': 'OCTUBRE',
                '11': 'NOVIEMBRE',
                '12': 'DICIEMBRE',
            }
            this.SER613G.MESREPORTADO = mes[this.form.mesini_SER613G];
            let datosimpresion = {
                pageSize: "LETTER",
                pageMargins: [15, 50, 15, 10],
                header: function (currentPage, pageCount, pageSize) {
                    return [
                        {
                            image: "logo",
                            fit: [60, 40],
                            absolutePosition: { x: 20, y: 10 },
                        },
                        { text: " " },
                        { text: $_USUA_GLOBAL[0].NOMBRE, style: "headerimpresion" },
                        { text: `NIT ${numeroencomas($_USUA_GLOBAL[0].NIT)}`, style: "headerimpresion" },
                    ]
                },
                content: [
                    { text: `${moment(this.SER613G.FECHAACTUAL).format('MMMM DD [de] YYYY').toUpperCase()}`, style: "titulostexto" },
                    { text: "Señores:", style: "texto" },
                    {
                        columns: [
                            { text: this.SER613G.ENVIOS.DESCRIPCION.trim(), style: "titulostexto", width: '60%' },
                            { text: "REMISION:", style: "titulostexto", width: '8%' },
                            { text: `${this.SER613G.CONSECUTIVO}`, style: "titulostexto", width: '22%' },
                        ]
                    },
                    { text: "E.   S.   D.", style: "texto" },
                    { text: " ", style: "texto" },
                    { text: `Adjunto a la presente estamos enviando la cuenta de cobro por los servicios prestados a sus afiliados en el mes de 20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)} ${this.SER613G.MESREPORTADO}, para el tramite de pago:`, style: 'texto' },
                    { text: " ", style: "texto" },
                    {
                        table: {
                            widths: ['5%', '8%', '10%', '25%', '10%', '10%', '15%', '15%'],
                            body: [
                                [{ text: 'ITEM', style: 'textheadertable', border: [true, true, false, true] },
                                { text: 'FACTURA', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'FECHA', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'DESCRIPCION', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'VALOR', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'ABONO', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'NETO', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'DIAN', style: 'textheadertable', border: [false, true, true, true] }]
                            ]
                        }
                    },
                    construirtablaimpresiones(this.SER613G.ENVIOS.FACTURAS, ['ITEM', 'LLAVE', 'FECHAENV', 'DESCRIP', 'VLRBRUTO', 'VLRABONO', 'VLRNETO', 'ESTADO'], ['5%', '8%', '10%', '25%', '10%', '10%', '15%', '15%'])
                ],
                styles: {
                    headerimpresion: {
                        fontSize: 9,
                        bold: true,
                        alignment: 'center'
                    },
                    texto: {
                        fontSize: 9,
                    },
                    titulostexto: {
                        fontSize: 9,
                        bold: true,
                    },
                    titulosnumero: {
                        fontSize: 7,
                        bold: true,
                    },
                    textheadertable: {
                        fontSize: 7,
                        bold: true,
                    }
                },
            }
            let valortotal = valorabono = valorneto = 0;
            for (var i in this.SER613G.ENVIOS.FACTURAS) {
                if (this.SER613G.ENVIOS.FACTURAS[i].VLRBRUTO.trim() == '') this.SER613G.ENVIOS.FACTURAS[i].VLRBRUTO = 0
                if (this.SER613G.ENVIOS.FACTURAS[i].VLRABONO.trim() == '') this.SER613G.ENVIOS.FACTURAS[i].VLRABONO = 0
                if (this.SER613G.ENVIOS.FACTURAS[i].VLRNETO.trim() == '') this.SER613G.ENVIOS.FACTURAS[i].VLRNETO = 0
                valortotal = valortotal + parseFloat(this.SER613G.ENVIOS.FACTURAS[i].VLRBRUTO);
                valorabono = valorabono + parseFloat(this.SER613G.ENVIOS.FACTURAS[i].VLRABONO);
                valorneto = valorneto + parseFloat(this.SER613G.ENVIOS.FACTURAS[i].VLRNETO);
            }
            datosimpresion.content.push({ text: ' ' })
            datosimpresion.content.push({ canvas: [{ type: "line", x1: 3, y1: 0, x2: 565, y2: 0, lineWidth: 1 }] }),
                datosimpresion.content.push({
                    columns: [
                        { text: "", style: "titulostexto", width: '40%' },
                        { text: "TOTALES:", style: "titulostexto", width: '8%' },
                        { text: valorestotales(valortotal.toString()), style: "titulosnumero", width: '10%' },
                        { text: valorestotales(valorabono.toString()), style: "titulosnumero", width: '10%' },
                        { text: valorestotales(valorneto.toString()), style: "titulosnumero", width: '10%' },
                    ]
                })
            datosimpresion.content.push({ text: ' ' })
            datosimpresion.content.push({ text: 'Estamos haciendo entrega del medio magnetico, debidamente validado con la malla validadora', style: 'texto' })
            datosimpresion.content.push({ text: ' ' })
            if ($_USUA_GLOBAL[0].NIT == 900566047) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 021335344 del Banco de BOGOTA y enviar al correo electronico lideraseguramientoyrecobro@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900541158) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 129145033 del Banco de BOGOTA y enviar al correo electronico enlacedosips@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 800037021) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 364 354 431 del Banco de BOGOTA y enviar al correo electronico                        la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 800037979) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 74200471-6 del Banco de BBVA y enviar al correo electronico hospiptolopez@yahoo.es la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900658867) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 129091781 del Banco de BOGOTA y enviar al correo electronico ___mavepharma@gmail.com___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900565371) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No 796078004 del Banco de BOGOTA y enviar al correo electronico analistacarterasalud@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 800037202) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No 971100089602 del Banco de Davivienda y enviar al correo electronico ___cartera@hospitalguamal.gov.co___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 892000458) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No ____________ del Banco de BOGOTA y enviar al correo electronico hospisanmartinese@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900685768) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 33549218003 del Banco de BANCOLOMBIA y enviar al correo electronico ___tesoreria@omesalud.com___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No ____________ del Banco de ____________________ y enviar al correo electronico ________________________________________ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            }
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: 'Atentamente,', style: 'texto' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({
                columns: [
                    {
                        image: "firma1",
                        fit: [60, 60],
                        width: '20%'
                    },
                    {
                        image: "firma2",
                        fit: [60, 60],
                        width: '40%',
                        margin: [20, 0]
                    },
                ]
            })
            datosimpresion.content.push({
                columns: [
                    { text: '____________________', style: 'texto', width: '20%' },
                    { text: '____________________________________________', style: 'texto', width: '40%', margin: [20, 0] }
                ]
            });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: '' });
            let firma1 = firma2 = '';
            if ($_USUA_GLOBAL[0].NIT == 892000458) {
                firma1 = parseInt(this.SER613G.FIRMAS.DATOS_GER.substring(0, 10)).toString()
                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                postData({
                    datosh: datosEnvio() + parseInt(this.SER613G.FIRMAS.DATOS_GER.substring(0, 10)).toString() + "|",
                }, URL)
                    .then(data => {
                        datosimpresion.content.push({ text: data.TERCER[0].DESCRIP_TER, style: 'texto' });
                    }).catch(error => {
                        datosimpresion.content.push({ text: ' ', style: 'texto' });
                    });
            } else if ($_USUA_GLOBAL[0].NIT == 892000401) {
                firma1 = parseInt(localStorage.IDUSU).toString();
                datosimpresion.content.push({ text: localStorage.Nombre, style: 'texto' });
                datosimpresion.content.push({ text: 'Radicacion de cuentas medicas', style: 'texto' });
            } else {
                firma1 = parseInt(this.SER613G.FIRMAS.FIRMA_GLOSA.substring(0, 10)).toString();
                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                postData({
                    datosh: datosEnvio() + parseInt(this.SER613G.FIRMAS.FIRMA_GLOSA.substring(0, 10)).toString() + "|",
                }, URL)
                    .then(data => {
                        datosimpresion.content.push({ text: data.TERCER[0].DESCRIP_TER, style: 'texto' });
                    }).catch(error => {
                        datosimpresion.content.push({ text: ' ', style: 'texto' });
                    });
            }
            datosimpresion.content.push({ text: 'Responsable RIPS', style: 'texto' });
            datosimpresion.content.push({ text: '________________________________________________________________________________________________________________________', style: 'texto' });
            datosimpresion.images = {
                logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png",
                firma1: `P:\\FIRMAS\\${firma1}.png`,
                firma2: `P:\\FIRMAS\\${firma2}.png`
            };
            _impresion2({
                tipo: "pdf",
                content: datosimpresion,
                archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
            })
                .then(() => {
                    CON851('', 'Impreso Correctamente', _toggleNav(), 'success', '');
                })
                .catch(err => {
                    console.error(err);
                    _toggleNav()
                });
        },
        ///////////////////////VENTANAS F8///////////////////////////
        _f8elecenvio_SER613G() {
            var $_this = this;
            let URL = get_url("APP/SALUD/SER846G.DLL");
            postData({
                datosh: datosEnvio() + 20 + $_this.SER613G.ANO_LNK + $_this.SER613G.MES_LNK
            }, URL)
                .then((data) => {
                    loader("hide");
                    $_this.SER613G.FILTROELEC = data.ELECENVIOS;
                    _ventanaDatos({
                        titulo: "VENTANA DE ENVIOS FACTURA ELECTRONICA",
                        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", 'FECHA'],
                        data: $_this.SER613G.FILTROELEC,
                        callback_esc: function () {
                            $(".numeroelec_SER613G").focus();
                        },
                        callback: function (data) {
                            $_this.form.numero_SER613G = data.NRO
                            _enterInput('.numeroelec_SER613G');
                        }
                    });

                })
                .catch((error) => {
                    console.log(error)
                    $_this.form.numero_SER613G
                });
        },
        _f8envio_SER613G(e) {
            var $_this = this;
            let URL = get_url("APP/SALUD/SER846.DLL");
            postData({
                datosh: datosEnvio() + 20 + $_this.SER613G.ANO_LNK + $_this.SER613G.MES_LNK
            }, URL)
                .then((data) => {
                    loader("hide");
                    $_this.SER613G.FILTROENVIO = data.ENVIOS;
                    $_this.SER613G.FILTROENVIO.pop()
                    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                        _ventanaDatos({
                            titulo: 'VENTANA DE ENVIOS',
                            columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
                            data: $_this.SER613G.FILTROENVIO,
                            callback_esc: function () {
                                $("#nroenv_SER613G").focus();
                            },
                            callback: function (data) {
                                $('#nroenv_SER613G').val(data.NRO.trim());
                                _enterInput('#nroenv_SER613G');
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                    $_this._evaluarnroenviovent_SER613G()
                });
        },
        _f8envio1_SER613G(e) {
            var $_this = this;
            let URL = get_url("APP/SALUD/SER846.DLL");
            postData({
                datosh: datosEnvio() + 20 + $_this.SER613G.ANO_LNK + $_this.SER613G.MES_LNK
            }, URL)
                .then((data) => {
                    loader("hide");
                    $_this.SER613G.FILTROENVIO = data.ENVIOS;
                    $_this.SER613G.FILTROENVIO.pop()
                    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                        _ventanaDatos({
                            titulo: 'VENTANA DE ENVIOS',
                            columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
                            data: $_this.SER613G.FILTROENVIO,
                            callback_esc: function () {
                                $("#nroenv1_SER613G").focus();
                            },
                            callback: function (data) {
                                $('#nroenv1_SER613G').val(data.NRO.trim());
                                _enterInput('#nroenv1_SER613G');
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                    $_this._evaluarnroenviovent1_SER613G()
                });
        },
        _f8entidad_SER613G() {
            $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.entidad_SER613G = data.COD.trim();
                    _enterInput('.terceros_SER613G');
                },
                cancel: () => {
                    _enterInput('.terceros_SER613G');
                }
            };
            F8LITE(parametros);
        },
        _f8centrocosto_SER613G() {
            $_this = this
            _ventanaDatos({
                titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
                columnas: ["COD", "NOMBRE"],
                data: $_this.SER613G.COSTO,
                callback_esc: function () {
                    $(".costo_SER613G").focus();
                },
                callback: function (data) {
                    $_this.form.costo_SER613G = data.COD
                    _enterInput('.costo_SER613G');
                }
            });
        },
        _f8factura_SER613G() {
            $_this = this
            parametros = {
                dll: 'NUMERACION',
                valoresselect: ['Buscar por tercero', 'buscar por paciente'],
                f8data: 'NUMERACION',
                columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
                callback: (data) => {
                    $_this.SER613G.FACT = data.COD;
                    $_this.form.facturatabla_SER613G = $_this.SER613G.FACT.substring(1, 7)
                    _enterInput('.numeracion_SER613G');
                },
                cancel: () => {
                    _enterInput('.numeracion_SER613G');
                }
            };
            F8LITE(parametros);
        }
    },
});


var valorestotales = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: ".",
    thousandsSeparator: ",",
    normalizeZeros: true,
    padFractionalZeros: true,
});








