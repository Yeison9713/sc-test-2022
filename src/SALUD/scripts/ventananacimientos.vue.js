// 26/11/2020 - DIANA ESCOBAR: CREADO 
module.exports = Vue.component("content_nacimiento", {
    props: {
        params: {},
        data: {},
    },
    data() {
        return {
            nacimiento: this.data,
            SER421N: [],
            tablanacimiento_SER421N: [],
            textos: {
                fechafact_SER421N: '',
                servicio_SER421N: '',
                formapago_SER421N: '',
                factura_SER421N: '',
                puerta_SER421N: '',
                comprobante_SER421N: '',
                paciente_SER421N: '',
                descrippaciente_SER421N: '',
                sexo_SER421N: '',
                edad_SER421N: '',
                medico_SER421N: '',
                descripmedico_SER421N: '',
                vinculado_SER421N: '',
                codigo_SER421N: '',
                descrip_SER421N: '',
                cantidad_SER421N: '',
                Valor_SER421N: '',
                edadgest_SER421N: '',
                control_SER421N: '',
                anomuerte1_SER421N: '',
                mesmuerte1_SER421N: '',
                diamuerte1_SER421N: '',
                causa_SER421N: '',
                descripcausa_SER421N: '',
                Hr_SER421N: '',
                Mn_SER421N: '',
                Sexo_SER421N: '',
                peso_SER421: '',
                diagnostico_SER421N: '',
                descripdiagnostico_SER421N: '',
                apag_SER421N: '',
                anomuerte_SER421N: '',
                mesmuerte_SER421N: '',
                diamuerte_SER421N: '',
                causamuerte_SER421N: '',
                descripcausamuerte_SER421N: '',
                Hrmuerte_SER421N: '',
                Mnmuerte_SER421N: '',
                detalle_SER421N: '',
                deseafact_SER421N: '',
                itemtabla_SER421N: '',
                opercreado_SER421N: '',
                fechacreado_SER421N: '',
                opermodif_SER421N: '',
                fechamodif_SER421N: '',
            },
        };
    },
    watch: {
        "params.estado": function (estado) {
            if (estado)
                console.log('ESTADO', estado)
            setTimeout(() => {
                this._evaluarcomprobante_SER421N()
            }, 400);
        },

    },
    created() {
        $_this = this;
        $_this.SER421N.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SER421N.ANO_LNK = $_this.SER421N.FECHA_LNK.substring(0, 2);
        $_this.SER421N.MES_LNK = $_this.SER421N.FECHA_LNK.substring(2, 4);
        $_this.SER421N.DIA_LNK = $_this.SER421N.FECHA_LNK.substring(4, 6);
        this.SER421N.BANDERA = 0
        this.textos.descripdiagnostico_SER421N = ' '
        this.textos.descripcausamuerte_SER421N = ' '
        this.SER421N.itemtabla = 1
        obtenerDatosCompletos({
            nombreFd: 'ENFERMEDADES'
        }, function (data) {
            $_this.SER421N.ENFERMEDADES = data.ENFERMEDADES;
            $_this.SER421N.ENFERMEDADES.pop();
        })
    },

    methods: {
        _evaluarcomprobante_SER421N() {
            console.log('EMPEZO OPCION')
            this._mascarasnac_SER421N()
            let URL = get_url("APP/SALUD/SAL450A.DLL");
            postData({ datosh: datosEnvio() + this.nacimiento.comprobante }, URL)
                .then(data => {
                    this._validarfacturacion_SER421N(data)
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarcomprobante_SER421N()
                })
        },
        _validarfacturacion_SER421N(data) {
            this.SER421N.FACTURACION = data.FACTURA[0];
            this.textos.comprobante_SER421N = this.SER421N.FACTURACION.SUC + this.SER421N.FACTURACION.CLASE.substring(0, 1) + this.SER421N.FACTURACION.NRO
            this.textos.fechafact_SER421N = this.SER421N.FACTURACION.FECHA
            this.textos.servicio_SER421N = this.SER421N.FACTURACION.CLASE
            let forma = { 'E': 'CONTADO', 'C': 'CREDITO', 'P': 'PENSIONADO', 'A': 'AMBULATORIO', 'T': 'ACC.TRANSIT' };
            this.textos.formapago_SER421N = this.SER421N.FACTURACION.PREFIJO + ' - ' + forma[this.SER421N.FACTURACION.PREFIJO]
            this.textos.factura_SER421N = this.SER421N.FACTURACION.NRO_CTA
            this.textos.puerta_SER421N = this.SER421N.FACTURACION.PUERTA_ESTAD + ' - ' + this.SER421N.FACTURACION.DESCRIP_PUERTA
            this.textos.paciente_SER421N = this.SER421N.FACTURACION.ID_PACIENTE
            this.textos.descrippaciente_SER421N = this.SER421N.FACTURACION.DESCRIP_PACI
            this.textos.sexo_SER421N = this.SER421N.FACTURACION.SEXO
            this.textos.edad_SER421N = this.SER421N.FACTURACION.EDAD
            this.textos.medico_SER421N = this.SER421N.FACTURACION.MED_OTR_FACT
            this.textos.descripmedico_SER421N = this.SER421N.FACTURACION.DESCRIP_MED1
            // this.textos.vinculado_SER421N= this.SER421N.FACTURACION
            this.textos.codigo_SER421N = this.SER421N.FACTURACION.TABLA[0].ARTICULO
            this.textos.descrip_SER421N = this.SER421N.FACTURACION.TABLA[0].DESCRIP_ART
            this.textos.cantidad_SER421N = this.SER421N.FACTURACION.TABLA[0].CANTIDAD
            this.textos.Valor_SER421N = this.SER421N.FACTURACION.TABLA[0].VALOR_FACT
            let URL = get_url("APP/SALUD/SER421N.DLL");
            postData({ datosh: datosEnvio() + '1|' + this.textos.comprobante_SER421N + '|' }, URL)
                .then(data => {
                    this.SER421N.NACIMIENTO = data.NACIMIENTOS[0];
                    if (this.SER421N.NACIMIENTO.GESTAC != 0 || this.SER421N.NACIMIENTO.CONTROL != 0) this.SER421N.BANDERA = '1'
                    this.textos.edadgest_SER421N = this.SER421N.NACIMIENTO.GESTAC
                    let control = { '1': 'SI', '2': 'NO' };
                    if (control[this.SER421N.NACIMIENTO.CONTROL.trim()] == undefined) {
                        this.textos.control_SER421N = ''
                    } else {
                        this.textos.control_SER421N = this.SER421N.NACIMIENTO.CONTROL.trim() + ' - ' + control[this.SER421N.NACIMIENTO.CONTROL.trim()]
                    }
                    this.textos.anomuerte1_SER421N = this.SER421N.NACIMIENTO.FECHAMUERTE.substring(0, 4)
                    this.textos.mesmuerte1_SER421N = this.SER421N.NACIMIENTO.FECHAMUERTE.substring(4, 6)
                    this.textos.diamuerte1_SER421N = this.SER421N.NACIMIENTO.FECHAMUERTE.substring(6, 8)
                    this.textos.causa_SER421N = this.SER421N.NACIMIENTO.CAUSAMUERTE
                    this.textos.opercreado_SER421N = this.SER421N.NACIMIENTO.OPERCRE
                    this.textos.fechacreado_SER421N = this.SER421N.NACIMIENTO.FECHACRE
                    this.textos.opermodif_SER421N = this.SER421N.NACIMIENTO.OPERMOD
                    this.textos.fechamodif_SER421N = this.SER421N.NACIMIENTO.FECHAMOD
                    for (var i in this.SER421N.NACIMIENTO.TABLA_NACI) {
                        if (this.SER421N.NACIMIENTO.TABLA_NACI[i].SEXO_NAC.trim() != '') {
                            this.tablanacimiento_SER421N.push(this.SER421N.NACIMIENTO.TABLA_NACI[i])
                        }
                    }
                    this.SER421N.itemtabla = this.tablanacimiento_SER421N.length + 1
                    this.textos.itemtabla_SER421N = this.SER421N.itemtabla
                    this._evaluargestacional_SER421N()
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarcomprobante_SER421N()
                })

        },
        _evaluargestacional_SER421N() {
            validarInputs({
                form: "#EDADGESTACIONAL_SER421N",
                orden: '1'
            },
                () => {
                    if (this.SER421N.BANDERA == 0) {
                        CON851("", "No se puede salir de la opción sin registrar el nacimiento", null, "error", "error");
                        return this._evaluarcomprobante_SER421N()
                    }

                    this._escape_SER421N()
                },
                () => {
                    if (this.textos.edadgest_SER421N < 4 || this.textos.edadgest_SER421N > 45) {
                        CON851("03", "03", null, "error", "error");
                        return this._evaluargestacional_SER421N()
                    }

                    this._Evaluarcontrol_SER421()
                }
            )
        },
        _Evaluarcontrol_SER421() {
            var control = [
                { COD: "1", DESCRIP: "SI" },
                { COD: "2", DESCRIP: "NO" },

            ];
            POPUP(
                {
                    array: control,
                    titulo: "Control prenatal",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    teclaAlterna: true,
                    seleccion: this.textos.control_SER421N,
                    callback_f: this._evaluargestacional_SER421N,
                },
                control => {
                    this.textos.control_SER421N = control.COD + " - " + control.DESCRIP;
                    this._Evaluaranomuerte1_SER421N()
                },
            );
        },
        _Evaluaranomuerte1_SER421N() {
            validarInputs({
                form: "#FECHAMUERTE1_SER421N",
                orden: '1'
            },
                () => {
                    this._Evaluarcontrol_SER421()
                },
                () => {
                    if (this.textos.anomuerte1_SER421N == 0 || this.textos.anomuerte1_SER421N.trim() == '') {
                        this.textos.anomuerte1_SER421N = '0000'
                        this.textos.mesmuerte1_SER421N = '00'
                        this.textos.diamuerte1_SER421N = '00'
                        this.textos.causa_SER421N = ''
                        this.textos.descripcausa_SER421N = ''
                        return this._evaluarhoratabla_SER421N('1')
                    }

                    if (this.textos.anomuerte1_SER421N < 1999) {
                        CON851("03", "03", null, "error", "error")
                        return this._Evaluaranomuerte1_SER421N()
                    }

                    this._evaluarfechamuerte1_SER421N('1')
                }
            )
        },
        _evaluarfechamuerte1_SER421N(orden) {
            validarInputs({
                form: "#FECHAMUERTE2_SER421N",
                orden: orden
            },
                this._Evaluaranomuerte1_SER421N,
                () => {
                    if (this.textos.mesmuerte1_SER421N < 1 || this.textos.mesmuerte1_SER421N > 12) {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuerte1_SER421N('1')
                    }

                    if (this.textos.diamuerte1_SER421N < 1 || this.textos.diamuerte1_SER421N > 31) {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuerte1_SER421N('2')
                    }

                    if (moment(`${this.textos.anomuerte1_SER421N}${this.textos.mesmuerte1_SER421N.padStart(2, '0')}${this.textos.diamuerte1_SER421N.padStart(2, '0')}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuerte1_SER421N('2')
                    }

                    this._evaluarcausamuerte1_SER421N()
                }
            )
        },
        _evaluarcausamuerte1_SER421N() {
            validarInputs({
                form: "#CAUSAMUERTE1_SER421N",
                orden: '1'
            },
                () => {
                    this._Evaluaranomuerte1_SER421N()
                },
                () => {
                    this.textos.causa_SER421N = this.textos.causa_SER421N.toUpperCase()
                    postData(
                        { datosh: `${datosEnvio()}|`, codigo: this.textos.causa_SER421N, paso: '1' },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluarcausamuerte1_SER421N()
                            }

                            this.textos.descripcausa_SER421N = data.NOMBRE_ENF
                            this._evaluarhoratabla_SER421N('1')
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluarcausamuerte1_SER421N()
                        })
                }
            )
        },
        _evaluarhoratabla_SER421N(orden) {
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprimar F3 - Oprima para grabar' }, { mensaje: 'Oprimar F7 - Oprima para Editar tabla' }] })
            validarInputs({
                form: "#HORA_SER421N",
                orden: orden,
                event_f7: this._validartabla_SER421N,
                event_f3: () => {
                    if (this.tablanacimiento_SER421N.length == 0) {
                        CON851('', 'Tabla vacia', null, 'error', 'error');
                        this._evaluarhoratabla_SER421N('1')
                    } else {
                        CON851P("01", ()=>{this._evaluarhoratabla_SER421N('1')}, this._grabaropcion_SER421N)
                    }
                }
            },
                () => {
                    if (this.textos.anomuerte1_SER421N.trim() == '' || this.textos.anomuerte1_SER421N.trim() == '0000') {
                        return this._Evaluaranomuerte1_SER421N()
                    }

                    this._evaluarcausamuerte1_SER421N()
                },
                () => {
                    this.textos.Hr_SER421N = this.textos.Hr_SER421N.padStart(2, '0')
                    this.textos.Mn_SER421N = this.textos.Mn_SER421N.padStart(2, '0')
                    if (this.textos.Hr_SER421N > 23) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarhoratabla_SER421N('1')
                    }
                    if (this.textos.Mn_SER421N > 59) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarhoratabla_SER421N('1')
                    }

                    this._evaluarsexotabla_SER421N()
                }
            )
        },
        _evaluarsexotabla_SER421N() {
            _FloatText({ estado: 'off' })
            validarInputs({
                form: "#SEXO_SER421N",
                orden: "1"
            },
                () => {
                    this._evaluarhoratabla_SER421N('1')
                },
                () => {
                    this.textos.Sexo_SER421N = this.textos.Sexo_SER421N.toUpperCase();
                    if (this.textos.Sexo_SER421N == 'F' || this.textos.Sexo_SER421N == 'M' || this.textos.Sexo_SER421N == 'I') {
                        return this._evaluarpesotabla_SER421N()
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarsexotabla_SER421N()
                }
            )
        },
        _evaluarpesotabla_SER421N() {
            validarInputs({
                form: "#PESO_SER421N",
                orden: "1"
            },
                () => {
                    this._evaluarsexotabla_SER421N()
                },
                () => {
                    this.SER421N.PESO_SER421N = this.SER421N.pesoMask.value
                    if (this.SER421N.PESO_SER421N < 350 || this.SER421N.PESO_SER421N > 6000) {
                        CON851('03', '03', null, 'error', 'error')
                        return this._evaluarpesotabla_SER421N()
                    }

                    this._evaluartallatabla_SER421N()
                }
            )
        },
        _evaluartallatabla_SER421N() {
            validarInputs({
                form: "#TALLA_SER421N",
                orden: "1"
            },
                () => {
                    this._evaluarpesotabla_SER421N()
                },
                () => {
                    this.SER421N.TALLANAC = this.SER421N.tallaMask.value
                    if (this.SER421N.TALLANAC < 15 || this.SER421N.TALLANAC > 80) {
                        CON851('03', '03', null, 'error', 'error');
                        return this._evaluartallatabla_SER421N()
                    }

                    this._evaluardiagtabla_SER421N()
                }
            )
        },
        _evaluardiagtabla_SER421N() {
            validarInputs({
                form: "#DIAG_SER421N",
                orden: '1'
            },
                () => {
                    this._evaluartallatabla_SER421N()
                },
                () => {
                    this.textos.diagnostico_SER421N = this.textos.diagnostico_SER421N.toUpperCase();
                    if (this.textos.diagnostico_SER421N.trim() == '') {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluardiagtabla_SER421N()
                    }

                    postData(
                        { datosh: `${datosEnvio()}|`, codigo: this.textos.diagnostico_SER421N, paso: '1' },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardiagtabla_SER421N()
                            }

                            this.textos.descripdiagnostico_SER421N = data.NOMBRE_ENF
                            this._evaluarapgartabla_SER421N()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardiagtabla_SER421N()
                        })
                }
            )
        },
        _evaluarapgartabla_SER421N() {
            validarInputs({
                form: "#APAGAR_SER421N",
                orden: "1"
            },
                () => {
                    this._evaluardiagtabla_SER421N()
                },
                () => {
                    this.textos.apag_SER421N = this.textos.apag_SER421N.padStart(2, '0')
                    this._evaluarmuertenactabla_SER421N()
                }
            )
        },
        _evaluarmuertenactabla_SER421N() {
            validarInputs({
                form: "#FECHAMUERT_SER421N",
                orden: "1"
            },
                () => {
                    this._evaluarapgartabla_SER421N()
                },
                () => {
                    if (this.textos.anomuerte_SER421N == 0 || this.textos.anomuerte_SER421N.trim() == '') {
                        this.textos.anomuerte_SER421N = '0000'
                        this.textos.mesmuerte_SER421N = '00'
                        this.textos.diamuerte_SER421N = '00'
                        this.textos.causamuerte_SER421N = ''
                        return this._evaluarootronac_SER421N()
                    }

                    if (this.textos.anomuerte_SER421N < 1999) {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarmuertenactabla_SER421N()
                    }

                    this._evaluarfechamuertenac_SER421N('1')
                }
            )
        },
        _evaluarfechamuertenac_SER421N(orden) {
            validarInputs({
                form: "#FECHAMUERT3_SER421N",
                orden: orden
            },
                () => {
                    this._evaluarmuertenactabla_SER421N()
                },
                () => {
                    if (this.textos.mesmuerte_SER421N < 1 || this.textos.mesmuerte_SER421N > 12) {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuertenac_SER421N('1')
                    }

                    if (this.textos.diamuerte_SER421N < 1 || this.textos.diamuerte_SER421N > 31) {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuertenac_SER421N('2')
                    }

                    if (moment(`${this.textos.anomuerte_SER421N}${this.textos.mesmuerte_SER421N.padStart(2, '0')}${this.textos.diamuerte_SER421N.padStart(2, '0')}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuertenac_SER421N('2')
                    }

                    this._evaluarcausamuertetabla_SER421N()
                }
            )
        },
        _evaluarcausamuertetabla_SER421N() {
            validarInputs({
                form: "#CAUSAMUERTE_SER421N",
                orden: '1'
            },
                () => {
                    this._evaluarfechamuertenac_SER421N('1')
                },
                () => {
                    this.textos.causamuerte_SER421N = this.textos.causamuerte_SER421N.toUpperCase()
                    postData(
                        { datosh: `${datosEnvio()}|`, codigo: this.textos.causamuerte_SER421N, paso: '1' },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluarcausamuertetabla_SER421N()
                            }
                            this.textos.descripcausamuerte_SER421N = data.NOMBRE_ENF
                            this._evaluarhoramuertetabla_SER421N('1')
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluarcausamuertetabla_SER421N()
                        })
                }
            )
        },
        _evaluarhoramuertetabla_SER421N(orden) {
            validarInputs({
                form: "#HORAMUERTE_SER421N",
                orden: orden
            },
                () => {
                    this._evaluarcausamuertetabla_SER421N()
                },
                () => {
                    this.textos.Hrmuerte_SER421N = this.textos.Hrmuerte_SER421N.padStart(2, '0')
                    this.textos.Mnmuerte_SER421N = this.textos.Mnmuerte_SER421N.padStart(2, '0')
                    if (this.textos.Hrmuerte_SER421N > 23) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarhoramuertetabla_SER421N('1')
                    }

                    if (this.textos.Mnmuerte_SER421N > 59) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarhoramuertetabla_SER421N('2')
                    }

                    this._evaluarootronac_SER421N()
                }
            )
        },
        _evaluarootronac_SER421N() {
            if (this.SER421N.itemtabla <= this.tablanacimiento_SER421N.length) {
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].HORA_NAC = this.textos.Hr_SER421N + this.textos.Mn_SER421N;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].SEXO_NAC = this.textos.Sexo_SER421N;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].PESO_NAC = this.SER421N.PESO_SER421N;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].TALLA_NAC = this.SER421N.TALLANAC;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].DIAG_NAC = this.textos.diagnostico_SER421N;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].APGAR_NAC = this.textos.apag_SER421N;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].FECHAM_NAC = this.textos.anomuerte_SER421N + this.textos.mesmuerte_SER421N + this.textos.diamuerte_SER421N;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].CAUSAM_NAC = this.textos.causamuerte_SER421N;
                this.tablanacimiento_SER421N[this.SER421N.itemtabla - 1].HORAM_NAC = this.textos.Hrmuerte_SER421N + this.textos.Mnmuerte_SER421N;
            } else {
                this.tablanacimiento_SER421N.push({
                    HORA_NAC: this.textos.Hr_SER421N + this.textos.Mn_SER421N,
                    SEXO_NAC: this.textos.Sexo_SER421N,
                    PESO_NAC: this.SER421N.PESO_SER421N,
                    TALLA_NAC: this.SER421N.TALLANAC,
                    DIAG_NAC: this.textos.diagnostico_SER421N,
                    APGAR_NAC: this.textos.apag_SER421N,
                    FECHAM_NAC: this.textos.anomuerte_SER421N + this.textos.mesmuerte_SER421N + this.textos.diamuerte_SER421N,
                    CAUSAM_NAC: this.textos.causamuerte_SER421N,
                    HORAM_NAC: this.textos.Hrmuerte_SER421N + this.textos.Mnmuerte_SER421N
                })
            }
            this.SER421N.itemtabla++
            this._initializevariable_SER421N()
            this.textos.itemtabla_SER421N = this.SER421N.itemtabla
            setTimeout(this._evaluarhoratabla_SER421N('1'), 300)
        },
        _initializevariable_SER421N() {
            this.textos.Hr_SER421N = ''
            this.textos.Mn_SER421N = ''
            this.textos.Sexo_SER421N = ''
            this.SER421N.tallaMask.value = ''
            this.SER421N.pesoMask.value = ''
            this.textos.diagnostico_SER421N = ''
            this.textos.apag_SER421N = ''
            this.textos.anomuerte_SER421N = ''
            this.textos.mesmuerte_SER421N = ''
            this.textos.diamuerte_SER421N = ''
            this.textos.causamuerte_SER421N = ''
            this.textos.Hrmuerte_SER421N = ''
            this.textos.Mnmuerte_SER421N = ''
            this.textos.opercreado_SER421N = ''
            this.textos.fechacreado_SER421N = ''
            this.textos.opermodif_SER421N = ''
            this.textos.fechamodif_SER421N = ''
        },
        _validartabla_SER421N() {
            if ($("#TABLANAC_SER421N tbody tr").length == 0) {
                this._evaluarhoratabla_SER421N('1');
            } else {
                validarTabla(
                    {
                        tabla: "#TABLANAC_SER421N",
                        orden: "0",
                        Supr: data => {
                            this.tablanacimiento_SER421N.splice(parseInt(data.cells[0].textContent.trim() - 1), 1);
                            this.textos.Hr_SER421N = ""
                            this.textos.Mn_SER421N = ""
                            this.textos.Sexo_SER421N = ""
                            this.SER421N.tallaMask.value = ""
                            this.SER421N.pesoMask.value = ""
                            this.textos.diagnostico_SER421N = ""
                            this.textos.apag_SER421N = ""
                            this.textos.anomuerte_SER421N = ""
                            this.textos.mesmuerte_SER421N = ""
                            this.textos.diamuerte_SER421N = ""
                            this.textos.causamuerte_SER421N = ""
                            this.textos.Hrmuerte_SER421N = ""
                            this.textos.Mnmuerte_SER421N = ""
                        },
                    },
                    this._editartabla_SER421N,
                    () => {
                        this._evaluarhoratabla_SER421N('1')
                    }
                );
            }
        },
        _editartabla_SER421N(data) {
            this.SER421N.itemtabla = ''
            this.textos.itemtabla_SER421N = data.cells[0].textContent.trim()
            this.SER421N.itemtabla = parseInt(data.cells[0].textContent)
            this.textos.Hr_SER421N = data.cells[1].textContent.trim().substring(0, 2);
            this.textos.Mn_SER421N = data.cells[1].textContent.trim().substring(2, 4);
            this.textos.Sexo_SER421N = data.cells[2].textContent.trim();
            this.SER421N.pesoMask.value = data.cells[3].textContent.trim();
            this.SER421N.tallaMask.value = data.cells[4].textContent.trim();
            this.textos.diagnostico_SER421N = data.cells[5].textContent.trim();
            this.textos.apag_SER421N = data.cells[6].textContent.trim();
            this.textos.anomuerte_SER421N = data.cells[7].textContent.trim().substring(0, 4);
            this.textos.mesmuerte_SER421N = data.cells[7].textContent.trim().substring(4, 6);
            this.textos.diamuerte_SER421N = data.cells[7].textContent.trim().substring(6, 8);
            this.textos.causamuerte_SER421N = data.cells[8].textContent.trim();
            this.textos.Hrmuerte_SER421N = data.cells[9].textContent.trim().substring(0, 2);
            this.textos.Mnmuerte_SER421N = data.cells[9].textContent.trim().substring(2, 4);
            this._evaluarhoratabla_SER421N('1')
        },
        _grabaropcion_SER421N() {
            _FloatText({ estado: 'off' })
            loader("show");
            if (this.SER421N.BANDERA == '1') {
                this.textos.opermodif_SER421N = localStorage.Usuario
                this.textos.fechamodif_SER421N = moment().format('YYYYMMDD')
            } else {
                this.textos.opercreado_SER421N = localStorage.Usuario
                this.textos.fechacreado_SER421N = moment().format('YYYYMMDD')
                this.textos.opermodif_SER421N = ''
                this.textos.fechamodif_SER421N = ''
            }
            var data = {};
            var lin = 1;
            for (var i in this.tablanacimiento_SER421N) {
                data['LIN-' + lin.toString().padStart(3, '0')] = this.tablanacimiento_SER421N[i].HORA_NAC + '|' + this.tablanacimiento_SER421N[i].SEXO_NAC + '|' + this.tablanacimiento_SER421N[i].PESO_NAC + '|' + this.tablanacimiento_SER421N[i].TALLA_NAC + '|' + this.tablanacimiento_SER421N[i].DIAG_NAC + '|' + this.tablanacimiento_SER421N[i].APGAR_NAC + '|' + this.tablanacimiento_SER421N[i].FECHAM_NAC + '|' + this.tablanacimiento_SER421N[i].CAUSAM_NAC + '|' + this.tablanacimiento_SER421N[i].HORAM_NAC + '|';
                lin++;
            }
            data.datosh = `${datosEnvio()}2|${this.textos.comprobante_SER421N}|${this.textos.edadgest_SER421N}|${this.textos.control_SER421N.substring(0, 1)}|${this.textos.causa_SER421N}|${this.textos.anomuerte1_SER421N + this.textos.mesmuerte1_SER421N + this.textos.diamuerte1_SER421N}|${this.textos.opercreado_SER421N}|${this.textos.fechacreado_SER421N}|${this.textos.opermodif_SER421N}|${this.textos.fechamodif_SER421N}|`
            postData(data, get_url("APP/SALUD/SER421N.DLL"))
                .then(data => {
                    this.SER421N.BANDERA = 1
                    loader("hide");
                    CON851('', 'Proceso terminado', null, 'success', 'Exito');
                    this._terminar_SER421N()
                })
                .catch(err => {
                    console.error(err);
                    loader("hide");
                    this._evaluarhoratabla_SER421N('1')
                });
        },
        _f8causa_SER421N() {
            $_this = this
            console.log('F8 ENFERMEDADES')
            _ventanaDatos({
                titulo: "VENTANA DE ENFERMEDADES",
                columnas: ["COD_ENF", "NOMBRE_ENF"],
                data: $_this.SER421N.ENFERMEDADES,
                callback_esc: function () {
                    $(".causamuerte1_SER421N").focus();
                },
                callback: function (data) {
                    $_this.textos.causa_SER421N = data.COD_ENF
                    _enterInput('.causamuerte1_SER421N');
                }
            });
        },
        _f8causa2_SER421N() {
            $_this = this
            console.log('F8 ENFERMEDADES')
            _ventanaDatos({
                titulo: "VENTANA DE ENFERMEDADES",
                columnas: ["COD_ENF", "NOMBRE_ENF"],
                data: $_this.SER421N.ENFERMEDADES,
                callback_esc: function () {
                    $(".diagnostico_SER421N").focus();
                },
                callback: function (data) {
                    $_this.textos.diagnostico_SER421N = data.COD_ENF
                    _enterInput('.diagnostico_SER421N');
                }
            });
        },
        _f8causa3_SER421N() {
            $_this = this
            console.log('F8 ENFERMEDADES')
            _ventanaDatos({
                titulo: "VENTANA DE ENFERMEDADES",
                columnas: ["COD_ENF", "NOMBRE_ENF"],
                data: $_this.SER421N.ENFERMEDADES,
                callback_esc: function () {
                    $(".causamuertetabla").focus();
                },
                callback: function (data) {
                    $_this.textos.causamuerte_SER421N = data.COD_ENF
                    _enterInput('.causamuertetabla');
                }
            });
        },
        _escape_SER421N() {
            this.$emit("callback_esc");
        },
        _terminar_SER421N() {
            this.$emit("callback");
        },
        // _ventanacomprobantes_SER421N(e) {
        //     if (e.which == 119 || e.type == 'click') {
        //         set_Event_validar('#COMPROBANTE_SER421N', 'off');
        //         $('#comprobante_421N').attr('disabled', 'true');
        //         SER825(this._evaluarcomprobante_SER421N, this._validarfacturacion_SER421N, '1')
        //     }
        // },
        _mascarasnac_SER421N() {
            this.SER421N.tallaMask = IMask($('#talla_SER421N')[0], { mask: Number });
            this.SER421N.pesoMask = IMask($('#peso_SER421N')[0], { mask: Number });
        }
    },
    template: `<div class="col-md-12" style= "overflow-y: scroll; height: 650px" > 
    <form class="form-horizontal">
    <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center" style="float: none; margin: 0 auto;">
            <div class="col-md-4 col-sm-3 col-xs-3">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-6 col-xs-6">Fecha:</label>
                    <div class="input-group col-md-6 col-sm-6 col-xs-6">
                        <input v-model="textos.fechafact_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-3 col-xs-3">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-6 col-xs-6">Tipo de servicio:</label>
                    <div class="input-group col-md-6 col-sm-6 col-xs-6">
                        <input v-model="textos.servicio_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-3 col-xs-3">
                <div class="inline-inputs">
                    <label class="col-md-4 col-sm-5 col-xs-5">Forma de pago:</label>
                    <div class="input-group col-md-10 col-sm-5 col-xs-5">
                        <input type="text" v-model="textos.formapago_SER421N"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-4 col-sm-6 col-xs-6">
                <div class="inline-inputs">
                    <label class="col-md-3 col-sm-3 col-xs-3">Factura:</label>
                    <div class="input-group col-md-9 col-sm-9 col-xs-9">
                        <input v-model="textos.factura_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-3 col-xs-3">
                <div class="inline-inputs">
                    <label class="col-md-7 col-sm-5 col-xs-5">Puerta ing:</label>
                    <div class="input-group col-md-10 col-sm-5 col-xs-5">
                        <input v-model="textos.puerta_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-3 col-xs-3" id= "COMPROBANTE_SER421N">
                <div class="inline-inputs">
                    <label class="col-md-7 col-sm-5 col-xs-5">Comprob:</label>
                    <div class="input-group col-md-10 col-sm-5 col-xs-5" >
                        <input v-model="textos.comprobante_SER421N" type="text" id="comprobante_421N"
                            data-orden="1" maxlength="9"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                    <button type="button" class="btn f8-Btn col-md-2 col-sm-2 col-xs-2" disabled="disabled">
                    <i class="icon-magnifier"></i>
                </button>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-8 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Paciente:</label>
                    <div class="input-group col-md-4 col-sm-3 col-xs-3">
                        <input v-model="textos.paciente_SER421N" type="text" maxlength="15" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12 " disabled="disabled">
                    </div>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                        <input v-model="textos.descrippaciente_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-4 col-xs-4">
                <div class="inline-inputs">
                    <label class="col-md-4 col-sm-6 col-xs-6 text-label">Sexo:</label>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                        <input v-model="textos.sexo_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-4 col-xs-4">
                <div class="inline-inputs">
                    <label class="col-md-4 col-sm-6 col-xs-6 text-label">Edad:</label>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                        <input v-model="textos.edad_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-8 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Medico:</label>
                    <div class="input-group col-md-4 col-sm-3 col-xs-3">
                        <input v-model="textos.medico_SER421N" type="text" maxlength="15" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12 " disabled="disabled">
                    </div>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                        <input v-model="textos.descripmedico_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-4">
                <div class="inline-inputs">
                    <label class="col-md-4 col-sm-6 col-xs-6 text-label">Vinculado:</label>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                        <input v-model="textos.vinculado_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">codigo:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.codigo_SER421N" type="text" maxlength="15" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12 " disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-4 col-sm-9 col-xs-9">Descripción:</label>
                    <div class="input-group col-md-8 col-sm-3 col-xs-3">
                        <input v-model="textos.descrip_SER421N" type="text" maxlength="35" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12 " disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Cantidad:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.cantidad_SER421N" type="text" maxlength="12" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12 " disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">R.I.:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.Valor_SER421N" type="text" maxlength="12" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">DATOS DE LA MADRE Edad gestacional:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3" id="EDADGESTACIONAL_SER421N">
                        <input v-model="textos.edadgest_SER421N" type="text" maxlength="2" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" placeholder="SEMANAS">
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Control prenatal:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3" id="CONTROL_SER421N">
                        <input v-model="textos.control_SER421N" type="text" maxlength="1" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Fecha muerte:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3" id="FECHAMUERTE1_SER421N">
                        <input v-model="textos.anomuerte1_SER421N" type="text" maxlength="4" data-orden="1"
                            placeholder="AAAA" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3" id="FECHAMUERTE2_SER421N">
                        <input v-model="textos.mesmuerte1_SER421N" type="text" maxlength="2" data-orden="1"
                            placeholder="MM" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3" id="FECHAMUERTE2_SER421N">
                        <input v-model="textos.diamuerte1_SER421N" type="text" maxlength="2" data-orden="2"
                            placeholder="DD" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-8 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Causa:</label>
                    <div class="input-group col-md-4 col-sm-3 col-xs-3" id="CAUSAMUERTE1_SER421N">
                        <input v-model="textos.causa_SER421N" type="text" v-on:keyup.119='_f8causa_SER421N'
                            maxlength="4" data-orden="1" 
                            class="form-control col-md-12 col-sm-12 col-xs-12 causamuerte1_SER421N" disabled="disabled">
                    </div>
                    <button type="button" @click='_f8causa_SER421N' disabled="disabled"
                        class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                        <i class="icon-magnifier"></i>
                    </button>
                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                        <input v-model="textos.descripcausa_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center"  style="float: none; margin: 0 auto;">
            <div class="col-md-1 col-sm-1 col-xs-12">
            <label class="col-md-6 col-sm-9 col-xs-9">Item:</label>
            <div class="input-group col-md-6 col-sm-3 col-xs-3" id="ITEM_SER421N">
                <input v-model="textos.itemtabla_SER421N" type="text" maxlength="4" data-orden="1"
                    class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
            </div>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-12">
            </div>
            <div class="col-md-1 col-sm-1 col-xs-12">
            </div>
            <div class="col-md-1 col-sm-1 col-xs-12">
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                    <label class="form-control col-md-12 col-sm-12 col-xs-12" style="background-color: #f5f5f5;">
                        {{ textos.descripdiagnostico_SER421N }}
                    </label>
                </div>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-12">
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
                <div class="input-group col-md-12 col-sm-12 col-xs-12">
                <label class="form-control col-md-12 col-sm-12 col-xs-12" style="background-color: #f5f5f5;">
                    {{ textos.descripcausamuerte_SER421N }}
                </label>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-1 col-sm-6 col-xs-12" id="HORA_SER421N">
                <div class="inline-inputs">
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.Hr_SER421N" type="text" maxlength="2" data-orden="1" style="padding-right: 8px; padding-left: 8px"
                            placeholder="hr" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.Mn_SER421N" type="text" maxlength="2" data-orden="2" style="padding-right: 8px; padding-left: 8px"
                            placeholder="mn" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-1 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <div class="input-group col-md-12 col-sm-3 col-xs-3" id="SEXO_SER421N">
                        <input v-model="textos.Sexo_SER421N" type="text" maxlength="1" data-orden="1"
                            placeholder="F/M" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-1 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <div class="input-group col-md-12 col-sm-3 col-xs-3" id="PESO_SER421N">
                        <input id="peso_SER421N" type="text" maxlength="4" data-orden="1" placeholder="PESO"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-1 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <div class="input-group col-md-12 col-sm-3 col-xs-3" id="TALLA_SER421N">
                        <input id="talla_SER421N" type="text" maxlength="2" data-orden="1" placeholder="TALLA"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <div class="input-group col-md-12 col-sm-3 col-xs-3" id="DIAG_SER421N">
                        <input v-model="textos.diagnostico_SER421N" type="text" v-on:keyup.119='_f8causa2_SER421N'
                            maxlength="4" data-orden="1" 
                            class="form-control col-md-12 col-sm-12 col-xs-12 diagnostico_SER421N" disabled="disabled">
                    </div>
                    <button type="button" @click='_f8causa2_SER421N'
                        class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2" disabled="disabled">
                        <i class="icon-magnifier"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-1 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <div class="input-group col-md-12 col-sm-3 col-xs-3" id="APAGAR_SER421N">
                        <input v-model="textos.apag_SER421N" type="text" maxlength="2" data-orden="1"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <div class="input-group col-md-4 col-sm-3 col-xs-3" id="FECHAMUERT_SER421N">
                        <input v-model="textos.anomuerte_SER421N" type="text" maxlength="4" data-orden="1" style="padding-right: 8px; padding-left: 8px"
                            placeholder="AAAA" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                    <div class="input-group col-md-4 col-sm-3 col-xs-3" id="FECHAMUERT3_SER421N">
                        <input v-model="textos.mesmuerte_SER421N" type="text" maxlength="2" data-orden="1" style="padding-right: 8px; padding-left: 8px"
                            placeholder="MM" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                    <div class="input-group col-md-4 col-sm-3 col-xs-3" id="FECHAMUERT3_SER421N">
                        <input v-model="textos.diamuerte_SER421N" type="text" maxlength="2" data-orden="2" style="padding-right: 8px; padding-left: 8px"
                            placeholder="DD" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <div class="input-group col-md-12 col-sm-3 col-xs-3" id="CAUSAMUERTE_SER421N">
                        <input v-model="textos.causamuerte_SER421N" type="text" v-on:keyup.119='_f8causa3_SER421N'
                            maxlength="4" data-orden="1" 
                            class="form-control col-md-12 col-sm-12 col-xs-12 causamuertetabla" disabled="disabled">
                    </div>
                    <button type="button" @click='_f8causa3_SER421N' disabled="disabled"
                        class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2">
                        <i class="icon-magnifier"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-1 col-sm-6 col-xs-12" id="HORAMUERTE_SER421N">
                <div class="inline-inputs">
                    <div class="input-group col-md-12 col-sm-3 col-xs-3">
                        <input v-model="textos.Hrmuerte_SER421N" type="text" maxlength="2" data-orden="1" style="padding-right: 8px; padding-left: 8px"
                            placeholder="hr" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                    <div class="input-group col-md-12 col-sm-3 col-xs-3">
                        <input v-model="textos.Mnmuerte_SER421N" type="text" maxlength="2" data-orden="2" style="padding-right: 8px; padding-left: 8px"
                            placeholder="mn" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>
            <table id="TITULOSNAC_SER421N" class="table table-light table-striped">
                <thead>
                    <tr>
                        <th style="width: 1%; text-align: center;">#</th>
                        <th style="width: 4%; text-align: center;">Hora</th>
                        <th style="width: 10%; text-align: center;">Sexo</th>
                        <th style="width: 8%; text-align: center;">Peso gramo</th>
                        <th style="width: 9%; text-align: center;">talla cm</th>
                        <th style="width: 16%; text-align: center;">Diagnostico del nacido</th>
                        <th style="width: 8%; text-align: center;">Apgar</th>
                        <th style="width: 17%; text-align: center;">Fecha muerte</th>
                        <th style="width: 17%; text-align: center;">Causa Muerte</th>
                        <th style="width: 10%; text-align: center;">Hora Muerte</th>
                    </tr>
                </thead>
            </table>
            <div style="max-height: 400px; overflow-y: auto;">
                <table id="TABLANAC_SER421N" class="table table-light table-striped">
                    <tbody>
                        <tr v-for="(row, index) in tablanacimiento_SER421N">
                            <td style="width: 1%; text-align: center;">
                                {{index + 1}}
                            </td>
                            <td style="width: 4%; text-align: center;">
                                {{row.HORA_NAC}}
                            </td>
                            <td style="width: 10%; text-align: center;">
                                {{row.SEXO_NAC}}
                            </td>
                            <td style="width: 8%; text-align: center;">
                                {{row.PESO_NAC}}
                            </td>
                            <td style="width: 9%; text-align: center;">
                                {{row.TALLA_NAC}}
                            </td>
                            <td style="width: 16%; text-align: center;">
                                {{row.DIAG_NAC}}
                            </td>
                            <td style="width: 8%; text-align: center;">
                                {{row.APGAR_NAC}}
                            </td>
                            <td style="width: 17%; text-align: center;">
                                {{row.FECHAM_NAC}}
                            </td>
                            <td style="width: 17%; text-align: center;">
                                {{row.CAUSAM_NAC}}
                            </td>
                            <td style="width: 10%; text-align: center;">
                                {{row.HORAM_NAC}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center" style="float: none; margin: 0 auto;">
            <div class="col-md-8 col-sm-3 col-xs-3">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-6 col-xs-6">Detalle:</label>
                    <div class="input-group col-md-6 col-sm-6 col-xs-6">
                        <input v-model="textos.detalle_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-3 col-xs-3">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-6 col-xs-6">Desea ver factura?:</label>
                    <div class="input-group col-md-6 col-sm-6 col-xs-6">
                        <input v-model="textos.deseafact_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Oper Creado:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.opercreado_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Fecha creado:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.fechacreado_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Oper Mod:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.opermodif_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-6 col-sm-9 col-xs-9">Fecha Mod:</label>
                    <div class="input-group col-md-6 col-sm-3 col-xs-3">
                        <input v-model="textos.fechamodif_SER421N" type="text"
                            class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
    </div> `,
});













