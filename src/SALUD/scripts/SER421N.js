// 26/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#SER421N",
    data: {
        SER421N: [],
        tablanacimiento_SER421N: [],
        form: {
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
        itemtabla: 1,
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("- Actualizar Nacimientos");
        $_this = this;
        $_this.SER421N.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SER421N.ANO_LNK = $_this.SER421N.FECHA_LNK.substring(0, 2);
        $_this.SER421N.MES_LNK = $_this.SER421N.FECHA_LNK.substring(2, 4);
        $_this.SER421N.DIA_LNK = $_this.SER421N.FECHA_LNK.substring(4, 6);
        $_this.SER421N.NOVEDAD = 0
        $_this.form.descripdiagnostico_SER421N = ' '
        $_this.form.descripcausamuerte_SER421N = ' '
        obtenerDatosCompletos({
            nombreFd: 'ENFERMEDADES'
        }, function (data) {
            $_this.SER421N.ENFERMEDADES = data.ENFERMEDADES;
            $_this.SER421N.ENFERMEDADES.pop();
            loader("hide");
            $_this._evaluarcomprobante_SER421N()
        })

    },
    methods: {
        _inicializarnuevo(){
            this.form.fechafact_SER421N= '',
            this.form.servicio_SER421N= '',
            this.form.formapago_SER421N= '',
            this.form.factura_SER421N= '',
            this.form.puerta_SER421N= '',
            this.form.comprobante_SER421N= '',
            this.form.paciente_SER421N= '',
            this.form.descrippaciente_SER421N= '',
            this.form.sexo_SER421N= '',
            this.form.edad_SER421N= '',
            this.form.medico_SER421N= '',
            this.form.descripmedico_SER421N= '',
            this.form.vinculado_SER421N= '',
            this.form.codigo_SER421N= '',
            this.form.descrip_SER421N= '',
            this.form.cantidad_SER421N= '',
            this.form.Valor_SER421N= '',
            this.form.edadgest_SER421N= '',
            this.form.control_SER421N= '',
            this.form.anomuerte1_SER421N= '',
            this.form.mesmuerte1_SER421N= '',
            this.form.diamuerte1_SER421N= '',
            this.form.causa_SER421N= '',
            this.form.descripcausa_SER421N= '',
            this.form.Hr_SER421N= '',
            this.form.Mn_SER421N= '',
            this.form.Sexo_SER421N= '',
            this.form.peso_SER421= '',
            this.form.diagnostico_SER421N= '',
            this.form.descripdiagnostico_SER421N= '',
            this.form.apag_SER421N= '',
            this.form.anomuerte_SER421N= '',
            this.form.mesmuerte_SER421N= '',
            this.form.diamuerte_SER421N= '',
            this.form.causamuerte_SER421N= '',
            this.form.descripcausamuerte_SER421N= '',
            this.form.Hrmuerte_SER421N= '',
            this.form.Mnmuerte_SER421N= '',
            this.form.detalle_SER421N= '',
            this.form.deseafact_SER421N= '',
            this.form.itemtabla_SER421N= '',
            this.form.opercreado_SER421N= '',
            this.form.fechacreado_SER421N= '',
            this.form.opermodif_SER421N= '',
            this.form.fechamodif_SER421N= ''
            this.tablanacimiento_SER421N = []
            this.SER421N.NOVEDAD = 0
        },
        _evaluarcomprobante_SER421N() {
            this._inicializarnuevo()
            validarInputs({
                form: "#COMPROBANTE_SER421N",
                orden: '1'
            },
                () => {
                    _toggleNav()
                },
                () => {

                    let URL = get_url("APP/SALUD/SAL450A.DLL");
                    postData({ datosh: datosEnvio() + this.form.comprobante_SER421N }, URL)
                        .then(data => {

                            this._validarfacturacion_SER421N(data)
                        })
                        .catch(err => {
                            console.error(err);
                            this._evaluarcomprobante_SER421N()
                        })

                }
            )
        },
        _validarfacturacion_SER421N(data) {
            this.SER421N.FACTURACION = data.FACTURA[0];
            this.form.comprobante_SER421N = this.SER421N.FACTURACION.SUC + this.SER421N.FACTURACION.CLASE.substring(0, 1) + this.SER421N.FACTURACION.NRO
            this.form.fechafact_SER421N = this.SER421N.FACTURACION.FECHA
            this.form.servicio_SER421N = this.SER421N.FACTURACION.CLASE
            let forma = { 'E': 'CONTADO', 'C': 'CREDITO', 'P': 'PENSIONADO', 'A': 'AMBULATORIO', 'T': 'ACC.TRANSIT' };
            this.form.formapago_SER421N = this.SER421N.FACTURACION.PREFIJO + ' - ' + forma[this.SER421N.FACTURACION.PREFIJO]
            this.form.factura_SER421N = this.SER421N.FACTURACION.NRO_CTA
            this.form.puerta_SER421N = this.SER421N.FACTURACION.PUERTA_ESTAD + ' - ' + this.SER421N.FACTURACION.DESCRIP_PUERTA
            this.form.paciente_SER421N = this.SER421N.FACTURACION.ID_PACIENTE
            this.form.descrippaciente_SER421N = this.SER421N.FACTURACION.DESCRIP_PACI
            this.form.sexo_SER421N = this.SER421N.FACTURACION.SEXO
            this.form.edad_SER421N = this.SER421N.FACTURACION.EDAD
            this.form.medico_SER421N = this.SER421N.FACTURACION.MED_OTR_FACT
            this.form.descripmedico_SER421N = this.SER421N.FACTURACION.DESCRIP_MED1
            // this.form.vinculado_SER421N= this.SER421N.FACTURACION
            this.form.codigo_SER421N = this.SER421N.FACTURACION.TABLA[0].ARTICULO
            this.form.descrip_SER421N = this.SER421N.FACTURACION.TABLA[0].DESCRIP_ART
            this.form.cantidad_SER421N = this.SER421N.FACTURACION.TABLA[0].CANTIDAD
            this.form.Valor_SER421N = this.SER421N.FACTURACION.TABLA[0].VALOR_FACT
            let URL = get_url("APP/SALUD/SER421N.DLL");
            postData({ datosh: datosEnvio() + '1|' + this.form.comprobante_SER421N + '|' }, URL)
                .then(data => {
                    this.SER421N.NACIMIENTO = data.NACIMIENTOS[0];
                    if (this.SER421N.NACIMIENTO.GESTAC != 0 || this.SER421N.NACIMIENTO.CONTROL != 0) this.SER421N.NOVEDAD = 8
                    this.form.edadgest_SER421N = this.SER421N.NACIMIENTO.GESTAC
                    let control = { '1': 'SI', '2': 'NO' };
                    if (control[this.SER421N.NACIMIENTO.CONTROL.trim()] == undefined) {
                        this.form.control_SER421N = ''
                    } else {
                        this.form.control_SER421N = this.SER421N.NACIMIENTO.CONTROL.trim() + ' - ' + control[this.SER421N.NACIMIENTO.CONTROL.trim()]
                    }
                    this.form.anomuerte1_SER421N = this.SER421N.NACIMIENTO.FECHAMUERTE.substring(0, 4)
                    this.form.mesmuerte1_SER421N = this.SER421N.NACIMIENTO.FECHAMUERTE.substring(4, 6)
                    this.form.diamuerte1_SER421N = this.SER421N.NACIMIENTO.FECHAMUERTE.substring(6, 8)
                    this.form.causa_SER421N = this.SER421N.NACIMIENTO.CAUSAMUERTE
                    this.form.opercreado_SER421N = this.SER421N.NACIMIENTO.OPERCRE
                    this.form.fechacreado_SER421N = this.SER421N.NACIMIENTO.FECHACRE
                    this.form.opermodif_SER421N = this.SER421N.NACIMIENTO.OPERMOD
                    this.form.fechamodif_SER421N = this.SER421N.NACIMIENTO.FECHAMOD
                    for (var i in this.SER421N.NACIMIENTO.TABLA_NACI) {
                        if (this.SER421N.NACIMIENTO.TABLA_NACI[i].SEXO_NAC.trim() != '') {
                            this.tablanacimiento_SER421N.push(this.SER421N.NACIMIENTO.TABLA_NACI[i])
                        }
                    }
                    this.itemtabla = this.tablanacimiento_SER421N.length + 1
                    this.form.itemtabla_SER421N = this.itemtabla
                    
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
                    this._evaluarcomprobante_SER421N()
                },
                () => {
                    if (this.form.edadgest_SER421N < 4 || this.form.edadgest_SER421N > 45) {
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
                    seleccion: this.form.control_SER421N,
                    callback_f: this._evaluargestacional_SER421N,
                },
                control => {
                    this.form.control_SER421N = control.COD + " - " + control.DESCRIP;
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
                    if (this.form.anomuerte1_SER421N == 0 || this.form.anomuerte1_SER421N.trim() == '') {
                        this.form.anomuerte1_SER421N = '0000'
                        this.form.mesmuerte1_SER421N = '00'
                        this.form.diamuerte1_SER421N = '00'
                        this.form.causa_SER421N = ''
                        this.form.descripcausa_SER421N = ''
                        return this._evaluarhoratabla_SER421N('1')
                    }
                    if (this.form.anomuerte1_SER421N < 1999) {
                        CON851("03", "03", null, "error", "error");
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
                () => {
                    this._Evaluaranomuerte1_SER421N()
                },
                () => {
                    if (this.form.mesmuerte1_SER421N < 1 || this.form.mesmuerte1_SER421N > 12) {
                        CON851("03", "03", null, "error", "error");
                        return this._evaluarfechamuerte1_SER421N('2')
                    }
                    if (this.form.diamuerte1_SER421N < 1 || this.form.diamuerte1_SER421N > 31) {
                        CON851("03", "03", null, "error", "error");
                        return this._evaluarfechamuerte1_SER421N('2')
                    }
                    if (moment(`${this.form.anomuerte1_SER421N}${this.form.mesmuerte1_SER421N.padStart(2, '0')}${this.form.diamuerte1_SER421N.padStart(2, '0')}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
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
                    this.form.causa_SER421N = this.form.causa_SER421N.toUpperCase();
                    postData(
                        { datosh: `${datosEnvio()}|`, codigo: this.form.causa_SER421N, paso: '1' },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluarcausamuerte1_SER421N()
                            }

                            this.form.descripcausa_SER421N = data.NOMBRE_ENF
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
                    if(this.tablanacimiento_SER421N.length == 0){
                        CON851('', 'Tabla vacia', null, 'error', 'error');
                        this._evaluarhoratabla_SER421N('1')
                    }else{
                        CON851P("01", ()=>{this._evaluarhoratabla_SER421N('1')}, this._grabaropcion_SER421N)
                    }
                }
            },
                () => {
                    if (this.form.anomuerte1_SER421N.trim() == '' || this.form.anomuerte1_SER421N.trim() == '0000') {
                        return this._Evaluaranomuerte1_SER421N()
                    }
                },
                () => {
                    this.form.Hr_SER421N = this.form.Hr_SER421N.padStart(2, '0')
                    this.form.Mn_SER421N = this.form.Mn_SER421N.padStart(2, '0')
                    if (this.form.Hr_SER421N > 23) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarhoratabla_SER421N('1')
                    }
                    if (this.form.Mn_SER421N > 59) {
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
                    this.form.Sexo_SER421N = this.form.Sexo_SER421N.toUpperCase();
                    if (this.form.Sexo_SER421N == 'F' || this.form.Sexo_SER421N == 'M' || this.form.Sexo_SER421N == 'I') {
                        return this._evaluarpesotabla_SER421N()
                    }
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
                    this.SER421N.PESO_SER421N = pesoMask.value
                    if (this.SER421N.PESO_SER421N < 350 || this.SER421N.PESO_SER421N > 6000) {
                        CON851('03', '03', null, 'error', 'error');
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
                    this.SER421N.TALLANAC = tallaMask.value
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
                    this.form.diagnostico_SER421N = this.form.diagnostico_SER421N.toUpperCase();
                    if (this.form.diagnostico_SER421N.trim() == '') {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluardiagtabla_SER421N()
                    }

                    postData(
                        { datosh: `${datosEnvio()}|`, codigo: this.form.diagnostico_SER421N, paso: '1' },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardiagtabla_SER421N()
                            }

                            this.form.descripdiagnostico_SER421N = data.NOMBRE_ENF
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
                    this.form.apag_SER421N = this.form.apag_SER421N.padStart(2, '0')
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
                    if (this.form.anomuerte_SER421N == 0 || this.form.anomuerte_SER421N.trim() == '') {
                        this.form.anomuerte_SER421N = '0000'
                        this.form.mesmuerte_SER421N = '00'
                        this.form.diamuerte_SER421N = '00'
                        this.form.causamuerte_SER421N = ''
                        return this._evaluarootronac_SER421N()
                    }
                    if (this.form.anomuerte_SER421N < 1999) {
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
                    if (this.form.mesmuerte_SER421N < 1 || this.form.mesmuerte_SER421N > 12) {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuertenac_SER421N('1')
                    }

                    if (this.form.diamuerte_SER421N < 1 || this.form.diamuerte_SER421N > 31) {
                        CON851("03", "03", null, "error", "error")
                        return this._evaluarfechamuertenac_SER421N('2')
                    }

                    if (moment(`${this.form.anomuerte_SER421N}${this.form.mesmuerte_SER421N.padStart(2, '0')}${this.form.diamuerte_SER421N.padStart(2, '0')}`).format('YYYYMMDD').trim() == 'Fecha inválida') {
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
                    this.form.causamuerte_SER421N = this.form.causamuerte_SER421N.toUpperCase();
                    postData(
                        { datosh: `${datosEnvio()}|`, codigo: this.form.causamuerte_SER421N, paso: '1' },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluarcausamuertetabla_SER421N()
                            }
                            this.form.descripcausamuerte_SER421N = data.NOMBRE_ENF
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
                    this.form.Hrmuerte_SER421N = this.form.Hrmuerte_SER421N.padStart(2, '0')
                    this.form.Mnmuerte_SER421N = this.form.Mnmuerte_SER421N.padStart(2, '0')
                    if (this.form.Hrmuerte_SER421N > 23) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarhoramuertetabla_SER421N('1')
                    }

                    if (this.form.Mnmuerte_SER421N > 59) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarhoramuertetabla_SER421N('2')
                    }

                    this._evaluarootronac_SER421N()
                }
            )
        },
        _evaluarootronac_SER421N() {
            if (this.itemtabla <= this.tablanacimiento_SER421N.length) {
                this.tablanacimiento_SER421N[this.itemtabla - 1].HORA_NAC = this.form.Hr_SER421N + this.form.Mn_SER421N;
                this.tablanacimiento_SER421N[this.itemtabla - 1].SEXO_NAC = this.form.Sexo_SER421N;
                this.tablanacimiento_SER421N[this.itemtabla - 1].PESO_NAC = this.SER421N.PESO_SER421N;
                this.tablanacimiento_SER421N[this.itemtabla - 1].TALLA_NAC = this.SER421N.TALLANAC;
                this.tablanacimiento_SER421N[this.itemtabla - 1].DIAG_NAC = this.form.diagnostico_SER421N;
                this.tablanacimiento_SER421N[this.itemtabla - 1].APGAR_NAC = this.form.apag_SER421N;
                this.tablanacimiento_SER421N[this.itemtabla - 1].FECHAM_NAC = this.form.anomuerte_SER421N + this.form.mesmuerte_SER421N + this.form.diamuerte_SER421N;
                this.tablanacimiento_SER421N[this.itemtabla - 1].CAUSAM_NAC = this.form.causamuerte_SER421N;
                this.tablanacimiento_SER421N[this.itemtabla - 1].HORAM_NAC = this.form.Hrmuerte_SER421N + this.form.Mnmuerte_SER421N;
            } else {
                this.tablanacimiento_SER421N.push({
                    HORA_NAC: this.form.Hr_SER421N + this.form.Mn_SER421N,
                    SEXO_NAC: this.form.Sexo_SER421N,
                    PESO_NAC: this.SER421N.PESO_SER421N,
                    TALLA_NAC: this.SER421N.TALLANAC,
                    DIAG_NAC: this.form.diagnostico_SER421N,
                    APGAR_NAC: this.form.apag_SER421N,
                    FECHAM_NAC: this.form.anomuerte_SER421N + this.form.mesmuerte_SER421N + this.form.diamuerte_SER421N,
                    CAUSAM_NAC: this.form.causamuerte_SER421N,
                    HORAM_NAC: this.form.Hrmuerte_SER421N + this.form.Mnmuerte_SER421N
                });
            }
            this.itemtabla++
            this._initializevariable_SER421N()
            this.form.itemtabla_SER421N = this.itemtabla
            setTimeout(this._evaluarhoratabla_SER421N('1'), 300)
        },
        _initializevariable_SER421N() {
            this.form.Hr_SER421N = ''
            this.form.Mn_SER421N = ''
            this.form.Sexo_SER421N = ''
            tallaMask.value = ''
            pesoMask.value = ''
            this.form.diagnostico_SER421N = ''
            this.form.apag_SER421N = ''
            this.form.anomuerte_SER421N = ''
            this.form.mesmuerte_SER421N = ''
            this.form.diamuerte_SER421N = ''
            this.form.causamuerte_SER421N = ''
            this.form.Hrmuerte_SER421N = ''
            this.form.Mnmuerte_SER421N = ''
            this.form.opercreado_SER421N = ''
            this.form.fechacreado_SER421N = ''
            this.form.opermodif_SER421N = ''
            this.form.fechamodif_SER421N = ''
            
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
                            this.form.Hr_SER421N = ""
                            this.form.Mn_SER421N = ""
                            this.form.Sexo_SER421N = ""
                            tallaMask.value = ""
                            pesoMask.value = ""
                            this.form.diagnostico_SER421N = ""
                            this.form.apag_SER421N = ""
                            this.form.anomuerte_SER421N = ""
                            this.form.mesmuerte_SER421N = ""
                            this.form.diamuerte_SER421N = ""
                            this.form.causamuerte_SER421N = ""
                            this.form.Hrmuerte_SER421N = ""
                            this.form.Mnmuerte_SER421N = ""
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
            this.itemtabla = ''
            this.form.itemtabla_SER421N = data.cells[0].textContent.trim()
            this.itemtabla = data.cells[0].textContent.trim()
            this.form.Hr_SER421N = data.cells[1].textContent.trim().substring(0, 2);
            this.form.Mn_SER421N = data.cells[1].textContent.trim().substring(2, 4);
            this.form.Sexo_SER421N = data.cells[2].textContent.trim();
            pesoMask.value = data.cells[3].textContent.trim();
            tallaMask.value = data.cells[4].textContent.trim();
            this.form.diagnostico_SER421N = data.cells[5].textContent.trim();
            this.form.apag_SER421N = data.cells[6].textContent.trim();
            this.form.anomuerte_SER421N = data.cells[7].textContent.trim().substring(0, 4);
            this.form.mesmuerte_SER421N = data.cells[7].textContent.trim().substring(4, 6);
            this.form.diamuerte_SER421N = data.cells[7].textContent.trim().substring(6, 8);
            this.form.causamuerte_SER421N = data.cells[8].textContent.trim();
            this.form.Hrmuerte_SER421N = data.cells[9].textContent.trim().substring(0, 2);
            this.form.Mnmuerte_SER421N = data.cells[9].textContent.trim().substring(2, 4);
            this._evaluarhoratabla_SER421N('1')
        },
        _grabaropcion_SER421N() {
            _FloatText({ estado: 'off' })
            loader("show");
            if(this.SER421N.NOVEDAD == '8'){
                this.form.opermodif_SER421N = localStorage.Usuario
                this.form.fechamodif_SER421N = moment().format('YYYYMMDD')
            }else{
                this.form.opercreado_SER421N = localStorage.Usuario
                this.form.fechacreado_SER421N = moment().format('YYYYMMDD')
                this.form.opermodif_SER421N = ''
                this.form.fechamodif_SER421N = ''
            }
            var data = {};
            var lin = 1;
            for (var i in this.tablanacimiento_SER421N) {
                data['LIN-' + lin.toString().padStart(3, '0')] = this.tablanacimiento_SER421N[i].HORA_NAC + '|' + this.tablanacimiento_SER421N[i].SEXO_NAC + '|' + this.tablanacimiento_SER421N[i].PESO_NAC + '|' + this.tablanacimiento_SER421N[i].TALLA_NAC + '|' + this.tablanacimiento_SER421N[i].DIAG_NAC + '|' + this.tablanacimiento_SER421N[i].APGAR_NAC + '|' + this.tablanacimiento_SER421N[i].FECHAM_NAC + '|' + this.tablanacimiento_SER421N[i].CAUSAM_NAC + '|' + this.tablanacimiento_SER421N[i].HORAM_NAC + '|';
                lin++;
            }
            data.datosh = `${datosEnvio()}2|${this.form.comprobante_SER421N}|${this.form.edadgest_SER421N}|${this.form.control_SER421N.substring(0, 1)}|${this.form.causa_SER421N}|${this.form.anomuerte1_SER421N + this.form.mesmuerte1_SER421N + this.form.diamuerte1_SER421N}|${this.form.opercreado_SER421N}|${this.form.fechacreado_SER421N}|${this.form.opermodif_SER421N}|${this.form.fechamodif_SER421N}|`
            postData(data, get_url("APP/SALUD/SER421N.DLL"))
                .then(data => {
                    loader("hide");
                    CON851('', 'Proceso terminado', null, 'success', 'Exito');
                    _toggleNav()

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
                    $_this.form.causa_SER421N = data.COD_ENF
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
                    $_this.form.diagnostico_SER421N = data.COD_ENF
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
                    $_this.form.causamuerte_SER421N = data.COD_ENF
                    _enterInput('.causamuertetabla');
                }
            });
        },
        _ventanacomprobantes_SER421N(e) {
            if (e.which == 119 || e.type == 'click') {
                set_Event_validar('#COMPROBANTE_SER421N', 'off');
                $('#comprobante_421N').attr('disabled', 'true');
                SER825(this._evaluarcomprobante_SER421N, this._validarfacturacion_SER421N, '1')
            }
        }
    },
});

var tallaMask = IMask($('#talla_SER421N')[0], { mask: Number });
var pesoMask = IMask($('#peso_SER421N')[0], { mask: Number });











