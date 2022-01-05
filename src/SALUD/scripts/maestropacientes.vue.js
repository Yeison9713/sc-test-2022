module.exports = Vue.component("content_pacientes", {
    props: {
        params: {},
        data: {},
    },
    data() {
        return {
            paciente: this.data,
            SER110C: [],
            textos: {
                novedad_SER110C: '',
                numero_SER110C: '',
                identif_SER110C: '',
                lugar_SER110C: '',
                anonac_SER110C: '',
                mesnac_SER110C: '',
                dianac_SER110C: '',
                edad_SER110C: '',
                gruposang_SER110C: '',
                rh_SER110C: '',
                sexo_SER110C: '',
                civil_SER110C: '',
                estudio_SER110C: '',
                zona_SER110C: '',
                correo2_SER110C: '',
                padre_SER110C: '',
                madre_SER110C: '',
                ciudad_SER110C: '',
                ciudadd_SER110C: '',
                pais_SER110C: '',
                paisd_SER110C: '',
                barrio_SER110C: '',
                descripbarrio_SER110C: '',
                nivel_SER110C: '',
                direccion_SER110C: '',
                ocupacion_SER110C: '',
                ocupaciond_SER110C: '',
                regimen_SER110C: '',
                colegio_SER110C: '',
                colegiod_SER110C: '',
                etnia_SER110C: '',
                indigena_SER110C: '',
                comunidades_SER110C: '',
                resguardos_SER110C: '',
                tipoafil_SER110C: '',
                portabilidad_SER110C: '',
                ciudadportab_SER110C: '',
                eps_SER110C: '',
                epsd_SER110C: '',
                contrato_SER110C: '',
                ficha_SER110C: '',
                carnet_SER110C: '',
                fechademan_SER110C: '',
                demandaindu_SER110C: '',
                codant_SER110C: '',
                cotizante_SER110C: '',
                cotizanted_SER110C: '',
                parentezco_SER110C: '',
                empresalab_SER110C: '',
                fechamatr_SER110C: '',
                matr_SER110C: '',
                fechaecono_SER110C: '',
                econo_SER110C: '',
                patologiacronica_SER110C: '',
                clasif_SER110C: '',
                clasifd_SER110C: '',
                mamografiaano_SER110C: '',
                mamografiames_SER110C: '',
                finalidad_SER110C: '',
                prefijo_SER110C: '',
                factura_SER110C: '',
                observaciones_SER110C: '',
                discapacidad_SER110C: '',
                entidad_SER110C: '',
                entidadd_SER110C: '',
                fechasistd_SER110C: '',
                medicofam_SER110C: '',
                medicofamd_SER110C: '',
                correo_SER110C: '',
                basedatos_SER110C: '',
                altoriesgo_SER110C: '',
                antecedentes_SER110C: '',
                opercreado_SER110C: '',
                fechacreado_SER110C: '',
                hrcreado_SER110C: '',
                modificado_SER110C: '',
                fechamodif_SER110C: '',
                hrmodif_SER110C: '',

                Bloqhc_SER110C: '',
                copago_SER110C: '',
                victimac_SER110C: '',
                proespecial_SER110C: '',
                altocosto_SER110C: '',
                cronica_SER110C: '',
                pacitutela_SER110C: '',
                policonsul_SER110C: '',
                candpyp_SER110C: '',
                restric_SER110C: '',
                consult_SER110C: '',
                odont_SER110C: '',
                pyp_SER110C: '',
                lab_SER110C: '',
                rx_SER110C: '',
                drog_SER110C: '',
                fisiot_SER110C: '',
                terap_SER110C: '',
                cirug_SER110C: '',
                estanc_SER110C: '',
                vcm_SER110C: '',
                pagare_SER110C: '',
            },
        };
    },
    watch: {
        "params.estado": function (estado) {
            if (estado)
                console.log('ESTADO', estado)
            setTimeout(() => {
                this.cargarDatos();
            }, 400);
        },

    },
    created() {
        $_this = this;
        $_this.SER110C.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SER110C.ANO_LNK = 20 + $_this.SER110C.FECHA_LNK.substring(0, 2);
        $_this.SER110C.MES_LNK = $_this.SER110C.FECHA_LNK.substring(2, 4);
        $_this.SER110C.DIA_LNK = $_this.SER110C.FECHA_LNK.substring(4, 6);
        $_this.SER110C.FECHAACTUAL = moment().format('YYYYMMDD');
        $_this.SER110C.ANOACTUALW = $_this.SER110C.FECHAACTUAL.substring(0, 4);
        $_this.SER110C.MESACTUALW = $_this.SER110C.FECHAACTUAL.substring(4, 6);
        $_this.SER110C.DIAACTUAL = $_this.SER110C.FECHAACTUAL.substring(6, 8);
        $_this.SER110C.ACTBARRIOW = ''
        $_this.SER110C.EPAPACIW = ''
        $_this.SER110C.RESULTADOCOVIDPACIW = ''
        $_this.SER110C.NITFACTPACIW = ''
        $_this.SER110C.FECHAMAMOGRAFIA = ''
        $_this.SER110C.FACTURAPAGARE = ''
        $_this.SER110C.VALORPAGARE = ''
        $_this.SER110C.NITENT = ''
        $_this.SER110C.FECHANACCAMB = ''
    },
    methods: {
        cargarDatos() {
            loader("show");
            obtenerDatosCompletos({
                nombreFd: 'CIUDADES'
            }, function (data) {
                $_this.SER110C.CIUDAD = data.CIUDAD
                $_this.SER110C.CIUDAD.pop()
                obtenerDatosCompletos({
                    nombreFd: 'PAISES_RIPS'
                }, function (data) {
                    $_this.SER110C.PAISES = data.PAISESRIPS
                    $_this.SER110C.PAISES.pop()
                    obtenerDatosCompletos({
                        nombreFd: 'OCUPACIONES'
                    }, function (data) {
                        $_this.SER110C.OCUPACIONES = data.OCUPACIONES
                        $_this.SER110C.OCUPACIONES.pop()
                        obtenerDatosCompletos({
                            nombreFd: 'ENTIDADES',
                            usuario: true,
                        }, function (data) {
                            $_this.SER110C.ENTIDADES = data.ENTIDADES
                            $_this.SER110C.ENTIDADES.pop()
                            obtenerDatosCompletos({
                                nombreFd: 'COLEGIOS'
                            }, function (data) {
                                $_this.SER110C.COLEGIOS = data.COLEGIOS;
                                $_this.SER110C.COLEGIOS.pop()
                                obtenerDatosCompletos({
                                    nombreFd: 'PATOLOGIAS'
                                }, function (data) {
                                    $_this.SER110C.PATOLOGIAS = data.PATOLOGIAS;
                                    $_this.SER110C.PATOLOGIAS.pop()
                                    obtenerDatosCompletos({
                                        nombreFd: 'CLASIPACI'
                                    }, function (data) {
                                        $_this.SER110C.CLASIFICACION = data.CLASIFICACION;
                                        $_this.SER110C.CLASIFICACION.pop()
                                        obtenerDatosCompletos({
                                            nombreFd: 'BARRIOS'
                                        }, function (data) {
                                            $_this.SER110C.BARRIOS = data.BARRIOS;
                                            $_this.SER110C.BARRIOS.pop();
                                            obtenerDatosCompletos({
                                                nombreFd: 'PROFESIONALES'
                                            }, function (data) {
                                                $_this.SER110C.PROFESIONALES = data.ARCHPROF;
                                                loader("hide");
                                                $_this._revisarpermidos_SER110CVUE();
                                                console.log("LLEGA HASTA PROFESIONALES");
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        },
        _caracteresespeciales_SER110C(e, input) {
            this.textos[input] = this.textos[input].replace(/[^a-zA-Z0-9Ññ ]/g, '')
        },
        _revisarpermidos_SER110CVUE() {
            this._mascarascajas_SER110C()
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${'IS767'}|` },
                get_url("APP/CONTAB/CON904.DLL"))
                .then(data => {
                    if (this.paciente.novedad) {
                        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
                        this.textos.novedad_SER110C = `${this.paciente.novedad.trim()} - ${novedad[this.paciente.novedad.trim()]}`
                        return this._permisonovedad_SER110C()
                    }

                    console.log(this.paciente.novedad, "NOVEDAD");
                    if(localStorage.idOpciondata == "9422" && this.paciente.idpaciente > 0) {
                        console.log(localStorage.idOpciondata)
                    }
                    CON850(this._evaluarnovedad_SER110C);

                })
                .catch(err => {
                    console.error(err);
                    this._terminar_SER110C()
                });
        },
        _evaluarnovedad_SER110C(novedad) {
            this.SER110C.SWCAMBIO = 0;
            this._inicializarvariables_SER110C()
            this.textos.novedad_SER110C = novedad.id;
            if (this.textos.novedad_SER110C == "F") {
                this._escape_SER110C()
            } else {
                let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
                this.textos.novedad_SER110C = this.textos.novedad_SER110C + " - " + novedad[this.textos.novedad_SER110C];
                switch (this.textos.novedad_SER110C.substring(0, 1)) {
                    case '7':
                    case '8':
                    case '9':
                        if (this.textos.novedad_SER110C.substring(0, 1) == '9') {
                            postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${'IS7679'}|` },
                                get_url("APP/CONTAB/CON904.DLL"))
                                .then(data => {
                                    this._permisonovedad_SER110C();
                                })
                                .catch(err => {
                                    console.error(err);
                                    CON851('01', '01', null, 'error', 'error');
                                    setTimeout(() => { CON850(this._evaluarnovedad_SER110C); }, 300)

                                });
                        } else {
                            this._permisonovedad_SER110C()
                        }
                        break;
                }
            }
        },
        _permisonovedad_SER110C() {
            $_this = this
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${'IS767'}${$_this.textos.novedad_SER110C.substring(0, 1)}|` },
                get_url("APP/CONTAB/CON904.DLL"))
                .then(data => {
                    $_this._evaluarnumero_SER110C();
                })
                .catch(err => {
                    console.error(err);
                    CON851('01', '01', null, 'error', 'error');
                    setTimeout(() => { CON850($_this._evaluarnovedad_SER110C); }, 300)
                });
        },
        _evaluarnumero_SER110C() {
            if (this.textos.numero_SER110C.trim() == '') {
                this.textos.numero_SER110C = this.paciente.idpaciente
            }
            validarInputs({
                form: '#NUMERO_SER110C',
                orden: "1",
                event_f4: this._ventanapacientedoc_SER110C,

            }, () => { this._escape_SER110C() },
                () => {
                    this.textos.numero_SER110C = this.textos.numero_SER110C.padStart(15, "0").toUpperCase()
                    this._validarpaciente_SER110C()
                }
            )
        },
        _validarpaciente_SER110C() {
            if (this.textos.numero_SER110C == "000000000000000") {
                CON851('', 'Digite un numero valido!', null, 'error', 'error')
                this._evaluarnumero_SER110C();
            } else {
                let URL = get_url("APP/SALUD/SER810-1.DLL");
                postData({
                    datosh: datosEnvio() + this.textos.numero_SER110C + "|",
                }, URL)
                    .then(data => {
                        this.SER110C.PACIENTES = data["REG-PACI"];
                        if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                            this._error_SER110C()
                        } else if (this.textos.novedad_SER110C.substring(0, 1) == '8' || this.textos.novedad_SER110C.substring(0, 1) == '9') {
                            this._llenardatos_SER110C()
                            if (this.textos.novedad_SER110C.substring(0, 1) == '8') {
                                $('#VALIDARBOTOM_SER110C').removeClass('hidden');
                                $('#VALIDARBOTOM1_SER110C').removeClass('hidden');
                                $('#VALIDARBOTOM2_SER110C').removeClass('hidden');
                                $('#VALIDARBOTOM3_SER110C').removeClass('hidden');
                                $('#VALIDARBOTOM4_SER110C').removeClass('hidden');
                                $('#VALIDARBOTOM5_SER110C').removeClass('hidden');
                                setTimeout(this._validacionesinicio4_SER110C, 300);
                            } else {
                                this._grabarauditoria_SER110C()
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        if (error.MENSAJE == "01" && this.textos.novedad_SER110C.substring(0, 1) == '7') {
                            this._validacionesinicio4_SER110C();
                        } else if (error.MENSAJE == "01" && this.textos.novedad_SER110C.substring(0, 1) == '8') {
                            this._error_SER110C();
                        } else if (error.MENSAJE == "01" && this.textos.novedad_SER110C.substring(0, 1) == '9') {
                            this._error_SER110C();
                        }
                    });
            }
        },
        _error_SER110C() {
            if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                this.textos.novedad_SER110C = '8- Cambio'
                CON851('00', '00', null, 'error', 'Error');
                this._llenardatos_SER110C()
                setTimeout(this._evaluarnumero_SER110C, 300);
            } else if (this.textos.novedad_SER110C.substring(0, 1) == '8' || this.textos.novedad_SER110C.substring(0, 1) == '9') {
                this._evaluarnumero_SER110C();
            }
        },
        _validacionesinicio4_SER110C() {
            _mensajespacientes_SALUD(() => { setTimeout(this._validacionesdato4_SER110C, 300) }, this._evaluarnumero_SER110C, params = { ID: this.textos.numero_SER110C, STOP: "1" });
        },
        _validacionesdato4_SER110C() {
            if (this.textos.novedad_SER110C.substring(0, 1) == '7' && !$.isNumeric(this.textos.numero_SER110C) && this.textos.identif_SER110C.trim() == '') {
                this.textos.identif_SER110C = 'RC - REGISTRO CIVIL'
            }
            if ((this.textos.novedad_SER110C.substring(0, 1) == '8') && (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC')) {
                $('#BLOQHC_SER110C').removeClass('hidden');
                if (this.textos.Bloqhc_SER110C.trim() == '') this.textos.Bloqhc_SER110C = 'N'
                validarInputs({
                    form: '#BLOQHC_SER110C',
                    orden: "1"
                },
                    this._evaluarnumero_SER110C,
                    () => {
                        this._evaluartipoid_SER110C()
                    }
                )
            } else {
                this._evaluartipoid_SER110C()
            }
        },
        _evaluartipoid_SER110C() {
            this.SER110C.TIPOIDW = this.textos.identif_SER110C.substring(0, 3)
            var documento = [
                { 'COD': "CC ", 'DESCRIP': "CEDULA CIUDADANIA" },
                { 'COD': "CE ", 'DESCRIP': "CEDULA EXTRANJERIA" },
                { 'COD': "PA ", 'DESCRIP': "NUMERO PASAPORTE" },
                { 'COD': "RC ", 'DESCRIP': "REGISTRO CIVIL" },
                { 'COD': "TI ", 'DESCRIP': "TARJETA IDENTIDAD" },
                { 'COD': "ASI", 'DESCRIP': "ADULTO SIN IDENT" },
                { 'COD': "MSI", 'DESCRIP': "MENOR SIN IDENT" },
                { 'COD': "NUI", 'DESCRIP': "NUM UNICO IDENT. NUID" },
                { 'COD': "CD ", 'DESCRIP': "CARNET DIPLOMA" },
                { 'COD': "SC ", 'DESCRIP': "SALVO CONDUCTO" },
                { 'COD': "PE ", 'DESCRIP': "PERMISO ESPECIAL PERM" },
                { 'COD': "CN ", 'DESCRIP': "CERTIFICADO NACIDO VIVO" }
            ]
            POPUP(
                {
                    array: documento,
                    titulo: "TIPO DOCUMENTO",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    seleccion: this.SER110C.TIPOIDW.padEnd(3, ' '),
                    callback_f: () => {
                        this._evaluarnumero_SER110C();
                    },
                },
                documento => {
                    this.textos.identif_SER110C = documento.COD + " - " + documento.DESCRIP;
                    this._validacionestipoid_SER110C()
                },
            );
        },
        _validacionestipoid_SER110C() {
            if ((this.textos.identif_SER110C.substring(0, 3) == 'CC ' || this.textos.identif_SER110C.substring(0, 3) == 'TI ') && !$.isNumeric(this.textos.numero_SER110C)) {
                CON851('57', '57', null, 'error', 'error');
                return setTimeout(this._evaluartipoid_SER110C(), 300);
            }
            if (this.textos.identif_SER110C.substring(0, 3) == "CC " && (this.textos.numero_SER110C < 1000 || this.textos.numero_SER110C > 2999000000 || (this.textos.numero_SER110C > 100000000 && this.textos.numero_SER110C < 1000000000))) {
                CON851('78', '78', null, 'error', 'error');
                if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                    return setTimeout(this._evaluartipoid_SER110C(), 300);
                }
            } else {
                if (this.textos.novedad_SER110C.substring(0, 1) == '8') {
                    if (this.textos.identif_SER110C.substring(0, 3) == 'RC ' || this.textos.identif_SER110C.substring(0, 3) == 'MSI' || this.textos.identif_SER110C.substring(0, 3) == 'CE ' || this.textos.identif_SER110C.substring(0, 3) == 'CN ') {
                        this._validacionesTI_SER110C()
                    } else {
                        if ((this.textos.numero_SER110C > 3000000 && this.textos.numero_SER110C < 9000000) && (this.SER110C.UNIDADEDADW != 'A' || this.SER110C.VLREDADW < 15)) {
                            CON851('74', '74', null, 'error', 'error');
                            return this._evaluarnumero_SER110C()
                        } else {
                            this._validacionesTI_SER110C()
                        }
                    }
                } else {
                    this._evaluarlugarnaci_SER110C()
                }

            }
        },
        _validacionesTI_SER110C() {
            if ((this.textos.identif_SER110C.substring(0, 3) == 'TI ') && (this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW < 7)) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if (this.textos.identif_SER110C.substring(0, 3) == 'TI ' && this.SER110C.UNIDADEDADW == 'M') {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if (this.textos.identif_SER110C.substring(0, 3) == 'TI ' && this.SER110C.UNIDADEDADW == 'D') {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if ((this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW > 18) && (this.textos.identif_SER110C.substring(0, 3) == 'RC ' || this.textos.identif_SER110C.substring(0, 3) == 'TI ' || this.textos.identif_SER110C.substring(0, 3) == 'NUI' || this.textos.identif_SER110C.substring(0, 3) == 'MSI' || this.textos.identif_SER110C.substring(0, 3) == 'CN ')) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if ((this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW < 18) && (this.textos.identif_SER110C.substring(0, 3) == "CC " || this.textos.identif_SER110C.substring(0, 3) == 'ASI')) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }

            if ((this.SER110C.UNIDADEDADW != 'A') && (this.textos.identif_SER110C.substring(0, 3) == "CC " || this.textos.identif_SER110C.substring(0, 3) == 'ASI')) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if ((this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW > 10) && (this.textos.identif_SER110C.substring(0, 3) == "RC ")) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            } else {
                this._evaluarlugarnaci_SER110C()
            }
        },
        _evaluarlugarnaci_SER110C() {
            validarInputs({
                form: '#LUGARNAM_SER110C',
                orden: "1"
            },
                () => { setTimeout(this._evaluartipoid_SER110C, 300) },
                () => {
                    if (this.textos.lugar_SER110C.trim() == '') {
                        this._evaluarapel1_SER110C()
                    } else {
                        const res = this.SER110C.CIUDAD.find(e => e.COD == this.textos.lugar_SER110C);
                        if (res == undefined) {
                            CON851("01", "01", null, "error", "error");
                            this._evaluarlugarnaci_SER110C()
                        } else {
                            this.textos.descripcostos_SER110 = res.NOMBRE;
                            this._evaluarapel1_SER110C()
                        }
                    }
                }
            )
        },
        _evaluarapel1_SER110C() {
            let parametros = {
                estado: 'on',
                msg: [{
                    mensaje: 'Oprima F7 para cambios base datos'
                }, {
                    mensaje: 'Oprimar F9 para grupo familiar'
                }
                ]
            }
            _FloatText(parametros);
            validarInputs({
                form: '#APELLIDO1_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarapel1_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarapel1_SER110C) }
            },
                this._evaluarlugarnaci_SER110C,
                () => {
                    this.SER110C.PRIAPEL1PACIW = this.SER110C.primerapellido_SER110C.value.trim().substring(0, 1);
                    this.SER110C.PRIAPEL2PACIW = this.SER110C.primerapellido_SER110C.value.trim().substring(1, 14);
                    if (this.SER110C.PRIAPEL1PACIW.trim() == '' || ($.isNumeric(this.SER110C.PRIAPEL1PACIW))) {
                        CON851('58', '58', null, 'error', 'error');
                        this._evaluarapel1_SER110C()
                    } else if (this.textos.pacitutela_SER110C == "S") {
                        CON851('5B', '5B', null, 'error', 'error');
                        this._evaluarapel2_SER110C()
                    } else if (this.SER110C.primerapellido_SER110C.value.trim() == '') {
                        CON851('02', '02', null, 'error', 'error');
                        this._evaluarapel1_SER110C()
                    } else {
                        this._evaluarapel2_SER110C()
                    }
                }
            )
        },
        _evaluarapel2_SER110C() {
            validarInputs({
                form: '#APELLIDO2_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarapel2_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarapel2_SER110C) }
            }, () => { this._evaluarapel1_SER110C() },
                () => {
                    if ($.isNumeric(this.SER110C.segundoapellido_SER110C.value)) {
                        this._evaluarapel2_SER110C()
                    } else {
                        this._evaluarnomb1_SER110C()
                    }
                }
            )
        },
        _evaluarnomb1_SER110C() {
            validarInputs({
                form: '#NOMBRE1_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarnomb1_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarnomb1_SER110C) }
            }, () => { this._evaluarapel2_SER110C() },
                () => {
                    this.SER110C.PRINOMB1PACIW = this.SER110C.primernombre_SER110C.value.trim().substring(0, 1);
                    this.SER110C.PRINOMB2PACIW = this.SER110C.primernombre_SER110C.value.trim().substring(1, 12);
                    if (this.SER110C.PRINOMB1PACIW.trim() == '' || $.isNumeric(this.SER110C.PRINOMB1PACIW)) {
                        CON851('58', '58', null, 'error', 'error');
                        this._evaluarnomb1_SER110C()
                    } else if (this.SER110C.primernombre_SER110C.value.trim() == '') {
                        CON851('02', '02', null, 'error', 'error');
                        this._evaluarnomb1_SER110C()
                    } else {
                        this._evaluarnomb2_SER110C()
                    }
                }
            )
        },
        _evaluarnomb2_SER110C() {
            validarInputs({
                form: '#NOMBRE2_SER110C',
                orden: "1",
                event_f7: () => { this.evaluarcambiosbasedatos_SER110C(this._evaluarnomb2_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarnomb2_SER110C) }
            }, () => { this._evaluarnomb1_SER110C() },
                () => {
                    if ($.isNumeric(this.SER110C.segundonombre_SER110C.value)) {
                        this._evaluarnomb2_SER110C()
                    } else {
                        if ($_USUA_GLOBAL[0].NIT == 900475095 || $_USUA_GLOBAL[0].NIT == 822007038 || $_USUA_GLOBAL[0].NIT == 844003225) {
                            this._ventanahuellada_SER110C()
                        } else {
                            this._evaluaranonac_SER110C()
                        }
                    }
                }
            )
        },
        _evaluaranonac_SER110C() {
            validarInputs({
                form: "#ANONAC_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluaranonac_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluaranonac_SER110C) }
            },
                () => { this._evaluarnomb2_SER110C() },
                () => {
                    if (this.textos.anonac_SER110C.trim() == '') {
                        this._evaluaranonac_SER110C()
                    } else if (this.textos.anonac_SER110C > this.SER110C.ANOACTUALW || (parseInt(this.textos.anonac_SER110C) < 1900)) {
                        CON851('2D', '2D', null, 'error', 'error');
                        this._evaluaranonac_SER110C()
                    } else if ($.isNumeric(this.textos.anonac_SER110C)) {
                        this._evaluarmesnac_SER110C();
                    } else {
                        this._evaluaranonac_SER110C()
                    }
                }
            )
        },
        _evaluarmesnac_SER110C() {
            validarInputs({
                form: "#MESNAC_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarmesnac_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarmesnac_SER110C) }
            },
                () => { this._evaluaranonac_SER110C() },
                () => {
                    this.textos.mesnac_SER110C = this.textos.mesnac_SER110C.padStart(2, '0')
                    if (this.textos.mesnac_SER110C < 1 || this.textos.mesnac_SER110C > 12 || this.textos.mesnac_SER110C.trim() == 00) {
                        CON851('2D', '2D', null, 'error', 'error');
                        this._evaluarmesnac_SER110C()
                    } else if ($.isNumeric(this.textos.mesnac_SER110C)) {
                        this._evaluardianac_SER110C();
                    } else {
                        this._evaluarmesnac_SER110C()
                    }
                }
            )
        },
        _evaluardianac_SER110C() {
            validarInputs({
                form: "#DIANAC_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluardianac_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluardianac_SER110C) }
            },
                () => { this._evaluarmesnac_SER110C(); },
                () => {
                    this.textos.dianac_SER110C = this.textos.dianac_SER110C.padStart(2, '0');
                    if (this.textos.dianac_SER110C < 1 || this.textos.dianac_SER110C > 31) {
                        CON851('2D', '2D', null, 'error', 'error');
                        this._evaluardianac_SER110C()
                    } else if ($.isNumeric(this.textos.dianac_SER110C)) {
                        switch (this.textos.mesnac_SER110C) {
                            case 02:
                            case 04:
                            case 06:
                            case 09:
                            case 11:
                                if (this.textos.dianac_SER110C > 30) {
                                    CON851('37', '37', null, 'error', 'error');
                                    this._evaluaranonac_SER110C()
                                } else {
                                    this._validacionesedadnac_SER110C()
                                }
                                break;
                            default:
                                this._validacionesedadnac_SER110C()
                                break;
                        }
                    } else {
                        this._evaluardianac_SER110C()
                    }
                }
            )
        },
        _validacionesedadnac_SER110C() {
            this.SER110C.FECHANACIPACIW = this.textos.anonac_SER110C + this.textos.mesnac_SER110C + this.textos.dianac_SER110C
            var edad = calcular_edad(this.SER110C.FECHANACIPACIW);
            this.textos.edad_SER110C = edad.unid_edad + edad.vlr_edad.toString().padStart('0')
            this.SER110C.UNIDADEDADW = edad.unid_edad
            this.SER110C.VLREDADW = edad.vlr_edad.toString().padStart('0');
            if (this.SER110C.FECHANACCAMB != this.SER110C.FECHANACIPACIW && this.textos.novedad_SER110C.substring(0, 1) == '8') {
                this.SER110C.FECHANACCAMB = this.SER110C.FECHANACIPACIW
                CON851("", "Se cambio la fecha de nacimiento! Debes de repasar el Tipo de Doc ", "", "warning", "");
                return setTimeout(this._evaluartipoid_SER110C, 300) 
              }
            if (this.SER110C.FECHANACIPACIW > this.SER110C.FECHAACTUAL) {
                CON851('37', '37', null, 'error', 'error');
                return this._evaluaranonac_SER110C()
            }
            if (this.textos.identif_SER110C.substring(0, 3) == 'RC ' || this.textos.identif_SER110C.substring(0, 3) == 'MSI' || this.textos.identif_SER110C.substring(0, 3) == 'CE ' || this.textos.identif_SER110C.substring(0, 3) == 'CN ') {
                this._validacionesedadnac2_SER110C()
            } else {
                if ((this.textos.numero_SER110C > 3000000 && this.textos.numero_SER110C < 9000000) && (this.SER110C.UNIDADEDADW != 'A' || this.SER110C.VLREDADW < 15)) {
                    CON851('74', '74', null, 'error', 'error');
                    return this._evaluarnumero_SER110C()
                } else {
                    this._validacionesedadnac2_SER110C()
                }
            }
        },
        _validacionesedadnac2_SER110C() {
            if ((this.textos.identif_SER110C.substring(0, 3) == 'TI ') && (this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW < 7)) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if (this.textos.identif_SER110C.substring(0, 3) == 'TI ' && this.SER110C.UNIDADEDADW == 'M') {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if (this.textos.identif_SER110C.substring(0, 3) == 'TI ' && this.SER110C.UNIDADEDADW == 'D') {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if ((this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW > 18) && (this.textos.identif_SER110C.substring(0, 3) == 'RC ' || this.textos.identif_SER110C.substring(0, 3) == 'TI ' || this.textos.identif_SER110C.substring(0, 3) == 'NUI' || this.textos.identif_SER110C.substring(0, 3) == 'MSI' || this.textos.identif_SER110C.substring(0, 3) == 'CN ')) {
                if ($_USUA_GLOBAL[0].NIT == 800251482) {
                    this._buscarduplicado_SER110C();
                } else {
                    CON851('74', '74', null, 'error', 'error');
                    return this._evaluarnumero_SER110C()
                }
            }
            if ((this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW < 18) && (this.textos.identif_SER110C.substring(0, 3) == "CC " || this.textos.identif_SER110C.substring(0, 3) == 'ASI')) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if ((this.SER110C.UNIDADEDADW != 'A') && (this.textos.identif_SER110C.substring(0, 3) == "CC " || this.textos.identif_SER110C.substring(0, 3) == 'ASI')) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            }
            if ((this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW > 10) && (this.textos.identif_SER110C.substring(0, 3) == "RC ")) {
                CON851('74', '74', null, 'error', 'error');
                return this._evaluarnumero_SER110C()
            } else {
                this._buscarduplicado_SER110C()
            }
        },
        _buscarduplicado_SER110C() {
            if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                this.SER110C.APELLIDOSPACIW = this.SER110C.primerapellido_SER110C.value.padEnd(15, ' ') + '|' + this.SER110C.segundoapellido_SER110C.value.padEnd(15, ' ');
                this.SER110C.NOMBRESPACIW = this.SER110C.primernombre_SER110C.value.padEnd(12, ' ') + '|' + this.SER110C.segundonombre_SER110C.value.padEnd(12, ' ');
                _buscarduplicadopaciente_SALUD(this._consultapacduplicado_SER110C, this._evaluardianac_SER110C, params = { APELLIDOS: this.SER110C.APELLIDOSPACIW, NOMBRES: this.SER110C.NOMBRESPACIW, ID: this.textos.numero_SER110C, FECHANAC: this.SER110C.FECHANACIPACIW })
            } else {
                this._evaluargruposang_SER110C()
            }
        },
        _consultapacduplicado_SER110C(data) {
            this.SER110C.DOCDUPLICADO = data.CEDULA
            if (this.SER110C.DOCDUPLICADO.trim() == '') {
                setTimeout(this._evaluargruposang_SER110C, 300)
            } else {
                let URL = get_url("APP/SALUD/SER810-1.DLL");
                postData({
                    datosh: datosEnvio() + this.SER110C.DOCDUPLICADO + "|",
                }, URL)
                    .then(data => {
                        this.SER110C.PACIENTES = data["REG-PACI"]
                        this.SER110C.ACTUALIZAPACIX = "1"
                        this._llenardatos_SER110C()
                        setTimeout(this._evaluargruposang_SER110C, 300)

                    })
                    .catch(error => {
                        console.error(error, 'VALIDADPACIENTE2')
                        this._evaluardianac_SER110C()
                    });
            }
        },
        _evaluargruposang_SER110C() {
            if ($_USUA_GLOBAL[0].NIT == 900019291) {
                this._evaluarsexo_SER110C()
            } else {
                validarInputs({
                    form: "#GRUPOSANG_SER110C",
                    orden: "1",
                    event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluargruposang_SER110C) },
                    event_f9: () => { this.datoscompletfamiliar_SER110C(this._evaluargruposang_SER110C) }
                },
                    this._evaluaranonac_SER110C,
                    () => {
                        this.textos.gruposang_SER110C = this.textos.gruposang_SER110C.toUpperCase()
                        if (this.textos.gruposang_SER110C.trim() == '') {
                            this.textos.rh_SER110C = ''
                            CON851('2C', '2C', null, 'error', 'error');
                            this._evaluarsexo_SER110C()
                        } else if (this.textos.gruposang_SER110C == 'A' || this.textos.gruposang_SER110C == 'B' || this.textos.gruposang_SER110C == 'AB' || this.textos.gruposang_SER110C == 'O') {
                            this._evaluarrh_SER110C()
                        } else {
                            CON851('03', '03', null, 'error', 'error');
                            this._evaluargruposang_SER110C()
                        }
                    }
                )
            }
        },
        _evaluarrh_SER110C() {
            validarInputs({
                form: "#RH_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrh_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrh_SER110C) }
            },
                this._evaluargruposang_SER110C,
                () => {
                    if (this.textos.rh_SER110C == '+' || this.textos.rh_SER110C == '-') {
                        this._evaluarsexo_SER110C();
                    } else if ($.isNumeric(this.textos.rh_SER110C)) {
                        CON851('2C', '2C', null, 'error', 'error');
                        this._evaluarrh_SER110C()
                    } else {
                        CON851('03', '03', null, 'error', 'error');
                        this._evaluarrh_SER110C()
                    }
                }
            )
        },
        _evaluarsexo_SER110C() {
            validarInputs({
                form: "#SEXO_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarsexo_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarsexo_SER110C) }
            },
                this._evaluargruposang_SER110C,
                () => {
                    this.textos.sexo_SER110C = this.textos.sexo_SER110C.toUpperCase()
                    if (this.textos.sexo_SER110C == 'M' || this.textos.sexo_SER110C == 'F') {
                        this._evaluarestcivil_SER110C();
                    } else if (this.textos.sexo_SER110C.trim() == '') {
                        CON851('', 'Debe indicar el sexo del paciente', null, 'error', 'Error');
                        this._evaluarsexo_SER110C()
                    } else {
                        this._evaluarsexo_SER110C()
                    }
                }
            )
        },
        _evaluarestcivil_SER110C() {
            if ($_USUA_GLOBAL[0].NIT == 900019291) {
                this.textos.civil_SER110C = 'S - SOLTERO';
                this.textos.zona_SER110C = 'U - URBAN0';
                this.textos.ciudadportab_SER110C = $_USUA_GLOBAL[0].COD_CIUD;
                this._evaluarocupacion_SER110C()
            } else if ((this.SER110C.UNIDADEDADW == 'D' || this.SER110C.UNIDADEDADW == 'M') || (this.SER110C.VLREDADW < 16)) {
                this.textos.civil_SER110C = 'S - SOLTERO';
                setTimeout(this._evaluarestudio_SER110C, 300)
            } else {
                obtenerDatosCompletos({ nombreFd: 'ESTADOCIVIL' }, (data) => {
                    var civil = data.ESTADOCIVIL;
                    POPUP(
                        {
                            array: civil,
                            titulo: "ESTADO CIVIL",
                            indices: [
                                {
                                    id: "COD",
                                    label: "DESCRIP",
                                },
                            ],
                            seleccion: this.textos.civil_SER110C.substring(0, 1),
                            callback_f: () => {
                                this._evaluarsexo_SER110C();
                            },
                            teclaAlterna: true
                        },
                        civil => {
                            this.textos.civil_SER110C = civil.COD + " - " + civil.DESCRIP;
                            setTimeout(this._evaluarestudio_SER110C, 300);
                        },
                    );
                })
            }
        },
        _evaluarestudio_SER110C() {
            obtenerDatosCompletos({ nombreFd: 'NIVELESTUDIO' }, (data) => {
                var estudio = data.NIVELESTUDIO;
                POPUP(
                    {
                        array: estudio,
                        titulo: "NIVEL DE ESTUDIO",
                        indices: [
                            {
                                id: "COD",
                                label: "DESCRIP",
                            },
                        ],
                        seleccion: this.textos.estudio_SER110C.substring(0, 1),
                        callback_f: () => {
                            if ((this.SER110C.UNIDADEDADW == 'D' || this.SER110C.UNIDADEDADW == 'M') || (this.SER110C.VLREDADW < 16)) {
                                setTimeout(this._evaluarsexo_SER110C, 300)
                            } else {
                                setTimeout(this._evaluarestcivil_SER110C, 300)
                            }
                        },
                        teclaAlterna: true
                    },
                    estudio => {
                        this.textos.estudio_SER110C = estudio.COD + " - " + estudio.DESCRIP;
                        this._evaluarzona_SER110C()
                    },
                );
            })
        },
        _evaluarzona_SER110C() {
            if (this.textos.novedad_SER110C.substring(0, 1) == '7' && this.textos.zona_SER110C.trim() == '') {
                this.textos.zona_SER110C = 'U- URBANO'
            }
            validarInputs({
                form: "#ZONA_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarzona_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarzona_SER110C) }
            },
                () => {
                    setTimeout(this._evaluarestudio_SER110C, 300)
                },
                () => {
                    this.textos.zona_SER110C = this.textos.zona_SER110C.toUpperCase()
                    if (this.textos.zona_SER110C.substring(0, 1) == 'U' || this.textos.zona_SER110C.substring(0, 1) == 'R') {
                        switch (this.textos.zona_SER110C.substring(0, 1)) {
                            case "U":
                                this.textos.zona_SER110C = 'U- URBANO'
                                break;
                            default:
                                this.textos.zona_SER110C = 'R- RURAL'
                                break;
                        }
                        this._validacionesmenor_SER110C()
                    } else {
                        CON851('03', '03', null, 'error', 'error');
                        this._evaluarzona_SER110C();
                    }
                }
            )
        },
        _validacionesmenor_SER110C() {
            if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
                $('#EMAIL2_SER110C').removeClass('hidden');
                this._evaluargmail2_SER110C();
            } else {
                if ((this.SER110C.UNIDADEDADW == 'D' || this.SER110C.UNIDADEDADW == 'M') || (this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW < 18)) {
                    $('#PADRE_SER110C').removeClass('hidden');
                    $('#MADRE_SER110C').removeClass('hidden');
                    this._evaluarpadre_SER110C();
                } else {
                    if ($_USUA_GLOBAL[0].NIT == 19381427 || $_USUA_GLOBAL[0].NIT == 17306492 || $_USUA_GLOBAL[0].NIT == 800175901) {
                        $('#PADRE_SER110C').removeClass('hidden');
                        $('#MADRE_SER110C').removeClass('hidden');
                        this._evaluarpadre_SER110C();
                    } else {
                        this._evaluarciudad_SER110C()
                    }
                }
            }
        },
        _evaluargmail2_SER110C() {
            validarInputs({
                form: "#EMAIL2_SER110C",
                orden: "1"
            },
                this._evaluarzona_SER110C,
                () => {
                    if (this.textos.correo2_SER110C.trim() == '') {
                        CON851('02', '02', null, 'error', 'error');
                        this._evaluargmail2_SER110C()
                    } else {
                        var correo2 = this.textos.correo2_SER110C.indexOf("@")
                        if (correo2 < 1) {
                            CON851('2K', '2K', null, 'error', 'error');
                            this._evaluargmail2_SER110C()
                        } else {
                            this.textos.ciudad_SER110C = $_USUA_GLOBAL[0].COD_CIUD
                            this._evaluardireccion_SER110C();
                        }
                    }
                }
            )
        },
        _evaluarpadre_SER110C() {
            validarInputs({
                form: "#PADRE_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarpadre_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarpadre_SER110C) }
            }, () => { this._evaluarzona_SER110C() },
                () => {
                    this.textos.padre_SER110C = this.textos.padre_SER110C.toUpperCase()
                    if (this.textos.padre_SER110C.trim() == '' && $_USUA_GLOBAL[0].COD_CIUD.substring(0, 2) == 85) {
                        CON851('02', '02', null, 'error', 'error');
                        if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                            this._evaluarpadre_SER110C();
                        } else {
                            this._evaluarmadre_SER110C();
                        }
                    } else {
                        this._evaluarmadre_SER110C();
                    }
                }
            )
        },
        _evaluarmadre_SER110C() {
            validarInputs({
                form: "#MADRE_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarmadre_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarmadre_SER110C) }
            },
                () => { this._evaluarpadre_SER110C() },
                () => {
                    this.textos.madre_SER110C = this.textos.madre_SER110C.toUpperCase()
                    if (this.textos.madre_SER110C.trim() == '' && $_USUA_GLOBAL[0].COD_CIUD.substring(0, 2) == 85) {
                        CON851('02', '02', null, 'error', 'error');
                        if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                            this._evaluarmadre_SER110C()
                        } else {
                            this._evaluarciudad_SER110C()
                        }
                    } else {
                        this._evaluarciudad_SER110C()
                    }
                }
            )
        },
        _evaluarciudad_SER110C() {
            if (this.textos.novedad_SER110C.substring(0, 1) == '7' && this.textos.ciudad_SER110C.trim() == '') {
                this.textos.ciudad_SER110C = $_USUA_GLOBAL[0].COD_CIUD
            }
            validarInputs({
                form: "#CIUDAD_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarciudad_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarciudad_SER110C) }
            },
                () => { this._evaluarzona_SER110C() },
                () => {
                    if (this.textos.ciudad_SER110C.substring(2, 5) == '000') {
                        CON851('', 'Verifique codigo de ciudad', null, 'error', 'Error');
                        this._evaluarciudad_SER110C();
                    } else {
                        const res = this.SER110C.CIUDAD.find(e => e.COD == this.textos.ciudad_SER110C);
                        if (res == undefined) {
                            CON851("01", "01", null, "error", "error");
                            this._evaluarciudad_SER110C()
                        } else {
                            this.textos.ciudadd_SER110C = res.NOMBRE;
                            this.SER110C.ACTBARRIOW = res.NOMBRE.ACTBARRIOS
                            if (this.textos.identif_SER110C.substring(0, 3) == "CE " || this.textos.identif_SER110C.substring(0, 3) == "CD " || this.textos.identif_SER110C.substring(0, 3) == "SC " || this.textos.identif_SER110C.substring(0, 3) == "PE " || this.textos.identif_SER110C.substring(0, 3) == "CN " || this.textos.identif_SER110C.substring(0, 3) == "ASI" || this.textos.identif_SER110C.substring(0, 3) == "MSI") {
                                this._evaluarpais_SER110C()
                            } else {
                                this._evaluartelefono1_SER110C()
                            }
                        }
                    }
                })
        },
        _evaluarpais_SER110C() {
            validarInputs({
                form: "#PAIS_SER110C",
                orden: "1"
            },
                this._evaluarciudad_SER110C,
                () => {
                    this.textos.pais_SER110C = this.textos.pais_SER110C.toUpperCase();
                    const res = this.SER110C.PAISES.find(e => e.CODIGO == this.textos.pais_SER110C);
                    if (res == undefined) {
                        CON851("01", "01", null, "error", "error");
                        this._evaluarpais_SER110C()
                    } else {
                        this.textos.paisd_SER110C = res.DESCRIP
                        this._evaluartelefono1_SER110C()
                    }
                })
        },
        _evaluartelefono1_SER110C() {
            validarInputs({
                form: "#TELEFONO_SER110C",
                orden: "1"
            },
                this._evaluarciudad_SER110C,
                () => {
                    if (this.SER110C.telefono1Mask_SER110C.value.trim() == '') {
                        CON851('02', '02', null, 'error', 'error')
                        this._evaluartelefono1_SER110C()
                    } else {
                        this._evaluartelefono2_SER110C()
                    }
                })
        },
        _evaluartelefono2_SER110C() {
            validarInputs({
                form: "#TELEFONO2_SER110C",
                orden: "1"
            },
                this._evaluartelefono1_SER110C,
                () => {
                    this._evaluardireccion_SER110C()
                })
        },
        _evaluardireccion_SER110C() {
            validarInputs({
                form: "#DIRECCION_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluardireccion_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluardireccion_SER110C) }
            },
                this._evaluartelefono1_SER110C,
                () => {
                    this.textos.direccion_SER110C = this.textos.direccion_SER110C.toUpperCase()
                    if (this.textos.direccion_SER110C.trim() == '') {
                        CON851('84', '84', null, 'error', 'error');
                        this._evaluardireccion_SER110C();
                    } else {
                        if (this.SER110C.ACTBARRIOW != 'S' || this.SER110C.ACTBARRIOW.trim() == '') {
                            this._evaluarocupacion_SER110C();
                        } else {
                            this._evaluarbarrio_SER110C();
                        }
                    }
                }
            )
        },
        _evaluarbarrio_SER110C() {
            validarInputs({
                form: "#BARRIOS_SER110C",
                orden: "1"
            },
                this._evaluardireccion_SER110C,
                () => {

                    this.SER110C.CIUBARRIOW = this.textos.barrio_SER110C.substring(0, 4)
                    this.SER110C.SECUBARRIOW = this.textos.barrio_SER110C.substring(4, 11)
                    if (this.SER110C.CIUBARRIOW == '00000' || this.SER110C.CIUBARRIOW.trim() == '') {
                        this._evaluarbarrio_SER110C();
                    } else {
                        const res = this.SER110C.BARRIOS.find(e => e.LLAVE == this.textos.barrio_SER110C);
                        if (res == undefined) {
                            CON851("01", "01", null, "error", "error");
                            this._evaluarbarrio_SER110C()
                        } else {
                            this.textos.descripbarrio_SER110C = res.NOMBRE
                            this._evaluarocupacion_SER110C()
                        }
                    }
                })
        },
        _evaluarocupacion_SER110C() {
            if (this.textos.ocupacion_SER110C == '0000' || this.textos.ocupacion_SER110C.trim() == '') {
                if ((this.SER110C.UNIDADEDADW == 'D' || this.SER110C.UNIDADEDADW == 'M') || (this.SER110C.VLREDADW < 18)) {
                    this.textos.ocupacion_SER110C = '9998'
                }
            }
            validarInputs({
                form: "#OCUPACION_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarocupacion_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarocupacion_SER110C) }
            },
                this._evaluardireccion_SER110C,
                () => {
                    const res = this.SER110C.OCUPACIONES.find(e => e.CODOCU == this.textos.ocupacion_SER110C);
                    if (res == undefined) {
                        CON851("01", "01", null, "error", "error");
                        this._evaluarocupacion_SER110C()
                    } else {
                        this.textos.ocupaciond_SER110C = res.NOMBREOCU
                        this._evaluarestrato_SER110C()
                    }
                })
        },
        _evaluarestrato_SER110C() {
            obtenerDatosCompletos({ nombreFd: 'ESTRATO' }, (data) => {
                var estrato = data.ESTRATO;
                POPUP(
                    {
                        array: estrato,
                        titulo: "NIVEL",
                        indices: [
                            {
                                id: "COD",
                                label: "DESCRIP",
                            },
                        ],
                        seleccion: this.textos.nivel_SER110C.substring(0, 1),
                        callback_f: () => {
                            this._evaluarocupacion_SER110C();
                        },
                        teclaAlterna: true
                    },
                    estrato => {
                        this.textos.nivel_SER110C = estrato.COD + " - " + estrato.DESCRIP;
                        this._evaluarcopago_SER110C()
                    },
                );
            })
        },
        _evaluarcopago_SER110C() {
            if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719) {
                if (this.textos.copago_SER110C.trim() == '') {
                    this.textos.copago_SER110C = 'S';
                }
            } else {
                if (this.textos.copago_SER110C.trim() != '' && this.textos.novedad_SER110C.substring(0, 1) == '7') {
                    this.textos.copago_SER110C = 'S';
                }
            }
            validarInputs({
                form: "#COPAGO_SER110C",
                orden: "1"
            },
                () => {
                    setTimeout(this._evaluarestrato_SER110C, 300)
                },
                () => {
                    this.textos.copago_SER110C = this.textos.copago_SER110C.toUpperCase()
                    if (this.textos.copago_SER110C == 'S' || this.textos.copago_SER110C == 'N') {
                        this._evaluarregimen_SER110C()
                    } else {
                        CON851('02', '02', null, 'error', 'error');
                        return this._evaluarcopago_SER110C()
                    }
                }
            )
        },
        _evaluarregimen_SER110C() {
            obtenerDatosCompletos({ nombreFd: 'TIPOUSUARIO' }, (data) => {
                this.SER110C.TIPO = data();
                var tipousuario = this.SER110C.TIPO.TIPOUSUARIO
                POPUP(
                    {
                        array: tipousuario,
                        titulo: "TIPO USUARIO",
                        indices: [
                            {
                                id: "COD",
                                label: "DESCRIP",
                            },
                        ],
                        seleccion: this.textos.regimen_SER110C.substring(0, 1),
                        callback_f: () => {
                            this._evaluarcopago_SER110C();
                        },
                        teclaAlterna: true
                    },
                    tipousuario => {
                        this.textos.regimen_SER110C = tipousuario.COD + " - " + tipousuario.DESCRIP;
                        this._evaluarcolegio_SER110C()
                    },
                );
            })
        },
        _evaluarcolegio_SER110C() {
            validarInputs({
                form: "#COLEGIO_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarcolegio_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarcolegio_SER110C) }
            },
                () => {
                    setTimeout(this._evaluarregimen_SER110C, 300)
                },
                () => {
                    if (this.textos.colegio_SER110C.trim() == "" || this.textos.colegio_SER110C == "            ") {
                        this.textos.colegiod_SER110C = 'COLEGIO NO ASIGNADO';
                        this._evaluaretnia_SER110C();
                    } else {
                        let URL = get_url("APP/SALUD/SER110CV2.DLL");
                        postData({
                            datosh: datosEnvio() + '1|' + this.textos.colegio_SER110C + "|",
                        }, URL)
                            .then(data => {
                                this.textos.colegiod_SER110C = data
                                if (this.textos.regimen_SER110C.substring(0, 1) == 'P') {
                                    this.textos.etnia_SER110C = '9 - NO APLICA'
                                    this._evaluartipoafiliado_SER110C()
                                } else {
                                    this._evaluaretnia_SER110C()
                                }
                            }).catch(error => {
                                console.error(error)
                                this._evaluarcolegio_SER110C()
                            });
                    }
                }
            )
        },
        _evaluaretnia_SER110C() {
            obtenerDatosCompletos({ nombreFd: 'ETNIA' }, (data) => {
                var etnia = data.ETNIA;
                POPUP(
                    {
                        array: etnia,
                        titulo: "NIVEL",
                        indices: [
                            {
                                id: "COD",
                                label: "DESCRIP",
                            },
                        ],
                        seleccion: this.textos.etnia_SER110C.substring(0, 1),
                        callback_f: () => {
                            this._evaluarcolegio_SER110C();
                        },
                        teclaAlterna: true
                    },
                    etnia => {
                        this.textos.etnia_SER110C = etnia.COD + " - " + etnia.DESCRIP;
                        this._validacionesetnia_SER110C()
                    },
                );
            })
        },
        _validacionesetnia_SER110C() {
            if (this.textos.etnia_SER110C.substring(0, 1) == '1') {
                let URL = get_url("APP/SALUD/SER867.DLL");
                postData({
                    datosh: datosEnvio() + localStorage['Usuario'] + "|"
                }, URL)
                    .then((data) => {
                        loader("hide");
                        this.SER110C.ETNIAS = data.ETNIAS
                        this.SER110C.ETNIAS.pop()
                        $_this = this
                        if ($_this.SER110C.ETNIAS.length == 0) {
                            CON851('4J', '4J', null, 'error', 'error');
                            setTimeout(this._evaluaretnia_SER110C, 300);
                        } else {
                            _ventanaDatos({
                                titulo: 'VENTANA DE ETNIAS PACIENTES',
                                columnas: ["COD", "DESCRIP"],
                                data: $_this.SER110C.ETNIAS,
                                callback_esc: function () {
                                    setTimeout($_this._evaluaretnia_SER110C, 500);
                                },
                                callback: function (data) {
                                    $_this.textos.indigena_SER110C = data.COD;
                                    setTimeout($_this._validarcomunidad_SER110C, 300);
                                }
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                        setTimeout(this._evaluaretnia_SER110C, 500);
                    });

            } else {
                this._validarcomunidad_SER110C();
            }
        },
        _validarcomunidad_SER110C() {
            if ((this.textos.etnia_SER110C.substring(0, 1) == '1' || this.textos.etnia_SER110C.substring(0, 1) == '2') && ($_USUA_GLOBAL[0].NIT != 845000038)) {
                let URL = get_url("APP/SALUD/SER116A.DLL");
                postData({
                    datosh: datosEnvio() + localStorage['Usuario'] + "|"
                }, URL)
                    .then((data) => {
                        loader("hide");
                        this.SER110C.COMUNIDADES = data.COMUNIDADES;
                        this.SER110C.COMUNIDADES.pop();
                        $_this = this
                        if ($_this.SER110C.COMUNIDADES.length == 0) {
                            CON851('4X', '4X', null, 'error', 'error');
                            setTimeout($_this._evaluaretnia_SER110C, 500);
                        } else {
                            _ventanaDatos({
                                titulo: 'VENTANA DE COMUNIDADES PACIENTES',
                                columnas: ["COD", "DESCRIP"],
                                data: $_this.SER110C.COMUNIDADES,
                                callback_esc: function () {
                                    setTimeout($_this._evaluaretnia_SER110C, 500);
                                },
                                callback: function (data) {
                                    $_this.textos.comunidades_SER110C = data.COD;
                                    setTimeout($_this._validarresguardos_SALSER110C, 300);

                                }
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setTimeout(this._evaluaretnia_SER110C, 500);
                    });
            } else {
                setTimeout(this._evaluartipoafiliado_SER110C, 300);
            }

        },
        _validarresguardos_SALSER110C() {
            if ((this.textos.etnia_SER110C.substring(0, 1) == '1' || this.textos.etnia_SER110C.substring(0, 1) == '2') && ($_USUA_GLOBAL[0].NIT != 845000038)) {
                let URL = get_url("APP/" + "SALUD/SER117A" + ".DLL");
                postData({
                    datosh: datosEnvio() + localStorage['Usuario'] + "|"
                }, URL)
                    .then((data) => {
                        loader("hide");
                        this.SER110C.RESGUARDOS = data.RESGUARDOS;
                        this.SER110C.RESGUARDOS.pop();
                        $_this = this
                        if ($_this.SER110C.RESGUARDOS.length == 0) {
                            CON851('4Y', '4Y', null, 'error', 'error');
                            setTimeout($_this._evaluaretnia_SER110C, 300);
                        } else {
                            _ventanaDatos({
                                titulo: 'VENTANA DE RESGUARDOS PACIENTES',
                                columnas: ["COD", "DESCRIP"],
                                data: $_this.SER110C.RESGUARDOS,
                                callback_esc: function () {
                                    setTimeout($_this._evaluaretnia_SER110C, 300);
                                },
                                callback: function (data) {
                                    $_this.textos.resguardos_SER110C = data.COD;
                                    setTimeout($_this._evaluartipoafiliado_SER110C, 300);
                                }
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setTimeout(this._evaluaretnia_SER110C, 500);
                    });
            }
        },
        _evaluartipoafiliado_SER110C() {
            obtenerDatosCompletos({ nombreFd: 'TIPOAFILIADO' }, (data) => {
                var afiliado = data.TIPOAFILIADO;
                POPUP(
                    {
                        array: afiliado,
                        titulo: "TIPO AFILIADO",
                        indices: [
                            {
                                id: "COD",
                                label: "DESCRIP",
                            },
                        ],
                        seleccion: this.textos.tipoafil_SER110C.substring(0, 1),
                        callback_f: () => {
                            setTimeout(this._evaluaretnia_SER110C, 500);
                        },
                        teclaAlterna: true
                    },
                    afiliado => {
                        this.textos.tipoafil_SER110C = afiliado.COD + " - " + afiliado.DESCRIP;
                        if ($_USUA_GLOBAL[0].NIT == 900405505 && this.textos.regimen_SER110C.substring(0, 1) != 'O') {
                            if ((this.textos.regimen_SER110C.substring(0, 1) != 'S') && (this.textos.tipoafil_SER110C.substring(0, 1) == '5' || this.textos.tipoafil_SER110C.substring(0, 1) == '6')) {
                                this._evaluarportabilidad_SER110C();
                            } else {
                                if ((this.textos.regimen_SER110C.substring(0, 1) != 'C') && (this.textos.tipoafil_SER110C.substring(0, 1) == '1' || this.textos.tipoafil_SER110C.substring(0, 1) == '2' || this.textos.tipoafil_SER110C.substring(0, 1) == '0')) {
                                    this._evaluarportabilidad_SER110C();
                                } else {
                                    setTimeout(this._evaluartipoafiliado_SER110C, 300);
                                }
                            }
                        } else {
                            this._evaluarportabilidad_SER110C();
                        }

                    },
                );
            })
        },
        _evaluarportabilidad_SER110C() {
            validarInputs({
                form: "#PORTABILI_SER110C",
                orden: "1"
            },
                () => { setTimeout(this._evaluartipoafiliado_SER110C, 300); },
                () => {
                    this.textos.portabilidad_SER110C = this.textos.portabilidad_SER110C.toUpperCase()
                    if (this.textos.portabilidad_SER110C.trim() == '') {
                        this.textos.portabilidad_SER110C = 'N';
                        this.textos.ciudadportab_SER110C = this.textos.ciudad_SER110C
                        this._evaluardesplazado_SER110C()
                    } else if (this.textos.portabilidad_SER110C == 'S') {
                        this._evaluarciudadaseg_SER110C();
                    } else if (this.textos.portabilidad_SER110C == 'N') {
                        this.textos.ciudadportab_SER110C = this.textos.ciudad_SER110C
                        this._evaluardesplazado_SER110C()
                    } else {
                        CON851('02', '02', null, 'error', 'error');
                        this._evaluarportabilidad_SER110C()
                    }
                }
            )
        },
        _evaluarciudadaseg_SER110C() {
            validarInputs({
                form: "#CIUDADPORTA_SER110C",
                orden: '1'
            },
                () => { this._evaluarportabilidad_SER110C(); },
                () => {
                    if (this.textos.ciudadportab_SER110C.trim() == '') {
                        this.textos.ciudadportab_SER110C = this.textos.ciudad_SER110C
                        this._evaluardesplazado_SER110C()
                    } else {
                        const res = this.SER110C.CIUDAD.find(e => e.COD == this.textos.ciudadportab_SER110C);
                        if (res == undefined) {
                            CON851("01", "01", null, "error", "error");
                            this._evaluarciudadaseg_SER110C()
                        } else {
                            this._evaluardesplazado_SER110C()
                        }
                    }
                }
            )
        },
        _evaluardesplazado_SER110C() {
            if ((this.textos.regimen_SER110C.substring(0, 1) == 'D' || this.textos.regimen_SER110C.substring(0, 1) == 'E' || this.textos.regimen_SER110C.substring(0, 1) == 'F') && (this.textos.tipoafil_SER110C.substring(0, 1) == '1')) {
                let { ipcRenderer } = require("electron");
                ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110D.html', cedula: this.textos.numero_SER110C });
                vector = ['on', 'Actualizando maestro de desplazados...']
                _EventocrearSegventana(vector, this._evaluarentidadafiliada_SER110C);

            } else {
                this._evaluarentidadafiliada_SER110C();
            }
        },
        _evaluarentidadafiliada_SER110C() {
            validarInputs({
                form: "#AFILIADO_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarentidadafiliada_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarentidadafiliada_SER110C) }
            },
                this._evaluarportabilidad_SER110C,
                () => {
                    this.textos.eps_SER110C = this.textos.eps_SER110C.toUpperCase()
                    if (this.textos.eps_SER110C.trim() == '') {
                        if (this.textos.regimen_SER110C.substring(0, 1) == 'P') {
                            this.textos.eps_SER110C = 'SIN001'
                            this.textos.epsd_SER110C = 'SIN DETERMINAR'
                            this._validacionesentidadafil_SER110C()
                        } else {
                            CON851('02', '02', null, 'error', 'error');
                            this._evaluarentidadafiliada_SER110C()
                        }
                    } else {
                        const res = this.SER110C.ENTIDADES.find(e => e['COD-ENT'] == this.textos.eps_SER110C);
                        if (res == undefined) {
                            CON851("01", "01", null, "error", "error");
                            this._evaluarentidadafiliada_SER110C()
                        } else {
                            this.SER110C.NITENT = res['NIT-ENT']
                            this.textos.epsd_SER110C = res['NOMBRE-ENT']
                            this._validacionesentidadafil_SER110C()
                        }
                    }
                }
            )
        },
        _validacionesentidadafil_SER110C() {
            if (localStorage.Usuario == 'ADMIN' || localStorage.Usuario == 'GEBC') {
                this._evaluarcontrato_SER110C();
            } else {
                if (this.textos.eps_SER110C != this.SER110C.EPAPACIW) {
                    if (this.textos.eps_SER110C == 'SIN438' || this.SER110C.EPAPACIW == 'SIN438') {
                        this.textos.eps_SER110C = this.SER110C.EPAPACIW;
                        this._evaluarentidadafiliada_SER110C()
                    } else {
                        this._evaluarcontrato_SER110C();
                    }
                } else {
                    this._evaluarcontrato_SER110C();
                }
            }
        },
        _evaluarcontrato_SER110C() {
            if (this.textos.entidad_SER110C != this.SER110C.NITENT) this.textos.entidad_SER110C = this.SER110C.NITENT
            validarInputs({
                form: "#CONTRATO_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarcontrato_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarcontrato_SER110C) }
            },
                this._evaluarentidadafiliada_SER110C,
                () => {
                    if (($_USUA_GLOBAL[0].NIT == 900405505) && (this.textos.contrato_SER110C.trim() == '' || this.textos.contrato_SER110C == 99)) {
                        this._evaluarcontrato_SER110C();
                    } else if ($_USUA_GLOBAL[0].NIT == 830092718 && this.textos.novedad_SER110C.substring(0, 1) == '7') {
                        this._evaluarmamografia_SER110C();
                    } else {
                        if ($_USUA_GLOBAL[0].NIT == 900229438) {
                            this._evaluarcotizante_SER110C()
                        } else {
                            // if ($_USUA_GLOBAL[0].NIT == 892000264) {
                            // this._evaluarvictimaconf_SER110C()
                            // } else {
                            this._evaluarfechaafiliado_SER110C();
                            // }
                        }
                    }
                }
            )
        },
        _evaluarfechaafiliado_SER110C() {
            validarInputs({
                form: "#FECHAAFIL_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarfechaafiliado_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarfechaafiliado_SER110C) }
            },
                this._evaluarcontrato_SER110C,
                () => {
                    if ((this.textos.eps_SER110C == 'EPS013' || this.textos.eps_SER110C == 'RES004') && (this.SER110C.fechaafilMask_SER110C.value.trim() == '')) {
                        CON851('02', '02', null, 'error', 'error');
                        if ($_USUA_GLOBAL[0].NIT == 891855847) {
                            this._evaluarfechaafiliado_SER110C()
                        } else {
                            this._evaluarcarnet_SER110C();
                        }
                    } else if (this.SER110C.fechaafilMask_SER110C.value.trim() == '') {
                        this._evaluarcarnet_SER110C();
                    } else {
                        this._evaluarficha_SER110C();
                    }
                }
            )
        },
        _evaluarficha_SER110C() {
            validarInputs({
                form: "#FICHA_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarficha_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarficha_SER110C) }
            },
                this._evaluarfechaafiliado_SER110C,
                () => {
                    this.textos.ficha_SER110C = this.textos.ficha_SER110C.toUpperCase()
                    this._evaluarcarnet_SER110C();
                }
            )
        },
        _evaluarcarnet_SER110C() {
            validarInputs({
                form: "#CARNET_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarcarnet_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarcarnet_SER110C) }
            },
                this._evaluarficha_SER110C,
                () => {
                    this.textos.carnet_SER110C = this.textos.carnet_SER110C.toUpperCase()
                    this._evaluarfechavence_SER110C()
                }
            )
        },
        _evaluarfechavence_SER110C() {
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${'IS7677'}|` },
                get_url("APP/CONTAB/CON904.DLL"))
                .then(data => {
                    $_this = this
                    validarInputs({
                        form: "#FECHAVENCE_SER110C",
                        orden: "1",
                        event_f7: () => { $_this._evaluarcambiosbasedatos_SER110C($_this._evaluarfechavence_SER110C) },
                        event_f9: () => { $_this._datoscompletfamiliar_SER110C($_this._evaluarfechavence_SER110C) }
                    },
                        $_this._evaluarcarnet_SER110C,
                        () => {
                            if (this.SER110C.fechavenceMask_SER110C.value.trim() == '') {
                                $_this._evaluarcotizante_SER110C()
                            } else {
                                if (moment().format('YYYYMMDD') > moment(this.SER110C.fechavenceMask_SER110C.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
                                    $_this.textos.basedatos_SER110C = '2 - En base de datos'
                                    $_this.textos.clasif_SER110C = 'R'
                                }
                                $_this._evaluarcotizante_SER110C()
                            }
                        }
                    )
                })
                .catch(err => {
                    console.error(err);
                    if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                        this.SER110C.fechavenceMask_SER110C.typedValue = moment().format('YYYYMMDD')
                        this._evaluarcotizante_SER110C()
                    } else {
                        this._evaluarfechaafiliado_SER110C()
                    }
                });
        },
        _evaluarcotizante_SER110C() {
            if ((this.textos.regimen_SER110C.substring(0, 1) == 'V' || this.textos.regimen_SER110C.substring(0, 1) == "P" || this.textos.regimen_SER110C.substring(0, 1) == "O") || (this.textos.tipoafil_SER110C.substring(0, 1) == '1' || this.textos.tipoafil_SER110C.substring(0, 1) == '3')) {
                this.textos.cotizante_SER110C = this.textos.numero_SER110C
                this._mostrarcotizante_SER110C()
            } else {
                validarInputs({
                    form: "#COTIZANTE_SER110C",
                    orden: "1",
                    event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarcotizante_SER110C) },
                    event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarcotizante_SER110C) }
                },
                    this._evaluarfechavence_SER110C,
                    () => {
                        this.textos.cotizante_SER110C = this.textos.cotizante_SER110C.padStart(15, '0')
                        this._mostrarcotizante_SER110C()
                    }
                )
            }
        },
        _mostrarcotizante_SER110C() {
            if ((this.textos.tipoafil_SER110C.substring(0, 1) == '2' && this.textos.tipoafil_SER110C.substring(0, 1) == '4') && (this.textos.cotizante_SER110C == this.textos.numero_SER110C)) {
                CON851('03', '03', null, 'error', 'error');
                return this._evaluarcotizante_SER110C()
            }
            if (this.textos.tipoafil_SER110C.substring(0, 1) == '2' && this.textos.cotizante_SER110C.trim() == 0) {
                CON851('02', '02', null, 'error', 'error');
                if ((($_USUA_GLOBAL[0].NIT == 800162035) && (localStorage.Usuario == "ALMB" || localStorage.Usuario == "KAJU")) || ($_USUA_GLOBAL[0].NIT == 800037202)) {
                    this._evaluarparentezco_SER110C()
                } else {
                    return this._evaluarcotizante_SER110C()
                }
            }
            if (this.textos.cotizante_SER110C == 0) {
                this.textos.cotizante_SER110C = '000000000000000'
                this.textos.cotizanted_SER110C = ''
                this.textos.parentezco_SER110C = '00'
                this._evaluarparentezco_SER110C()
            } else {
                if (this.textos.cotizante_SER110C == this.textos.numero_SER110C) {
                    this.textos.cotizanted_SER110C = this.SER110C.primerapellido_SER110C.value.padEnd(15, ' ') + this.SER110C.segundoapellido_SER110C.value.padEnd(15, ' ') + this.SER110C.primernombre_SER110C.value.padEnd(12, ' ') + this.SER110C.segundonombre_SER110C.value.padEnd(12, ' ')
                    this._evaluarparentezco_SER110C()
                } else {
                    let URL = get_url("APP/SALUD/SER810-1.DLL");
                    postData({
                        datosh: datosEnvio() + this.textos.numero_SER110C + "|",
                    }, URL)
                        .then(data => {
                            this.SER110C.COTIZANTE = data["REG-PACI"][0]
                            this.textos.parentezco_SER110C = this.SER110C.COTIZANTE['TIPO-AFIL']
                            if (this.textos.parentezco_SER110C == '1' || this.textos.parentezco_SER110C == '3') {
                                this.textos.cotizanted_SER110C = this.SER110C.COTIZANTE.DESCRIP
                                this._evaluarparentezco_SER110C()
                            } else {
                                CON851('03', '03', null, 'error', 'error');
                                return this._evaluarcotizante_SER110C()
                            }
                        })
                        .catch(error => {
                            console.error(error, 'VALIDA PACIENTE 3')
                            CON851P('08', this._evaluarcotizante_SER110C, this._crearcotizante_SER110C)
                        });
                }
            }
        },
        _crearcotizante_SER110C() {
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110CA.html', cedula: this.textos.cotizante_SER110C });
            vector = ['on', 'Actualizando maestro de pacientes...']
            _EventocrearSegventana(vector, this._evaluarcotizante_SER110C);
        },
        _evaluarparentezco_SER110C() {
            if (this.textos.tipoafil_SER110C.substring(0, 1) == '0' || this.textos.tipoafil_SER110C.substring(0, 1) == '1' || this.textos.tipoafil_SER110C.substring(0, 1) == '3') {
                this.textos.parentezco_SER110C = '00'
            }
            obtenerDatosCompletos({ nombreFd: 'PARENTEZCO' }, (data) => {
                var parentezco = data.PARENTEZCO;
                POPUP(
                    {
                        array: parentezco,
                        titulo: "RELACION CON EL COTIZANTE",
                        indices: [
                            {
                                id: "COD",
                                label: "DESCRIP",
                            },
                        ],
                        seleccion: this.textos.parentezco_SER110C.substring(0, 2),
                        callback_f: () => {
                            this._evaluarfechavence_SER110C()
                        },
                        teclaAlterna: true
                    },
                    parentezco => {
                        this.textos.parentezco_SER110C = parentezco.COD + " - " + parentezco.DESCRIP;
                        if (this.textos.parentezco_SER110C == "00") {
                            if (this.textos.tipoafil_SER110C.substring(0, 1) == '2') {
                                CON851('03', '03', null, 'error', 'error');
                                return setTimeout(this._evaluarparentezco_SER110C, 300)
                            } else {
                                this._evaluarempresa_SER110C()
                            }
                        } else {
                            this._evaluarempresa_SER110C()
                        }
                    },
                );
            })
        },
        _evaluarempresa_SER110C() {
            validarInputs({
                form: "#EMPRESALAB_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarempresa_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarempresa_SER110C) }
            },
                () => { setTimeout(this._evaluarparentezco_SER110C, 300) },
                () => {
                    this.textos.empresalab_SER110C = this.textos.empresalab_SER110C.toUpperCase()
                    this._evaluarvictimaconf_SER110C()
                }
            )
        },
        _evaluarvictimaconf_SER110C() {
            if (this.textos.victimac_SER110C.trim() == '') this.textos.victimac_SER110C = 'N'
            validarInputs({
                form: '#EVAVICTIMAC_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarvictimaconf_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarvictimaconf_SER110C) }
            },
                this._evaluarempresa_SER110C,
                () => {
                    this.textos.victimac_SER110C = this.textos.victimac_SER110C.toUpperCase()
                    if (this.textos.victimac_SER110C == 'S' || this.textos.victimac_SER110C == 'N') {
                        this._evaluarprogespecial_SER110C()
                    } else {
                        this._evaluarvictimaconf_SER110C()
                    }
                }
            )
        },
        _evaluarprogespecial_SER110C() {
            if (this.textos.proespecial_SER110C.trim() == '') this.textos.proespecial_SER110C = 'N'
            validarInputs({
                form: '#EVAPROESPECIAL_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarprogespecial_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarprogespecial_SER110C) }
            },
                this._evaluarvictimaconf_SER110C,
                () => {
                    this.textos.proespecial_SER110C = this.textos.proespecial_SER110C.toUpperCase()
                    if (this.textos.proespecial_SER110C == 'S' || this.textos.proespecial_SER110C == 'N') {
                        this._evaluaraltocosto_SER110C()
                    } else {
                        this._evaluarprogespecial_SER110C()
                    }
                }
            )
        },
        _evaluaraltocosto_SER110C() {
            if (this.textos.altocosto_SER110C.trim() == '') this.textos.altocosto_SER110C = 'N'
            validarInputs({
                form: '#EVAALTOCOSTO_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluaraltocosto_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluaraltocosto_SER110C) }
            },
                this._evaluarprogespecial_SER110C,
                () => {
                    this.textos.altocosto_SER110C = this.textos.altocosto_SER110C.toUpperCase()
                    if (this.textos.altocosto_SER110C == 'S' || this.textos.altocosto_SER110C == 'N') {
                        setTimeout(() => {
                            _resultadocovid_SALUD(this._evaluarcronico_SER110C, this._evaluaraltocosto_SER110C, params = { COVID: this.SER110C.RESULTADOCOVIDPACIW })
                        }, 300);
                    } else {
                        this._evaluaraltocosto_SER110C()
                    }
                }
            )
        },
        _evaluarcronico_SER110C(data) {
            if (data == undefined) {
                this.SER110C.RESULTADOCOVIDPACIW = ''
            } else {
                this.SER110C.RESULTADOCOVIDPACIW = data.RESPUESTA
            }
            if (this.textos.cronica_SER110C.trim() == '') this.textos.cronica_SER110C = 'N'
            validarInputs({
                form: '#EVACRONIC_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarcronico_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarcronico_SER110C) }
            },
                this._evaluaraltocosto_SER110C,
                () => {
                    this.textos.cronica_SER110C = this.textos.cronica_SER110C.toUpperCase()
                    if (this.textos.cronica_SER110C == 'S' || this.textos.cronica_SER110C == 'N') {
                        if (this.textos.cronica_SER110C == 'S') {
                            this._evaluapatologia_SER110C()
                        } else {
                            this.textos.patologiacronica_SER110C = ''
                            this._evaluartutela_SER110C()
                        }
                    } else {
                        this._evaluarcronico_SER110C(data)
                    }
                }
            )
        },
        _evaluapatologia_SER110C() {
            validarInputs({
                form: "#PATOLOGIA_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluapatologia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluapatologia_SER110C) }
            },
                () => {
                    this._evaluarcronico_SER110C();
                },
                () => {
                    this.textos.patologiacronica_SER110C = this.textos.patologiacronica_SER110C.padStart(3, '0')
                    if (this.textos.patologiacronica_SER110C == '000') {
                        _evaluartutela_7767();
                    } else {
                        const res = this.SER110C.PATOLOGIAS.find(e => e.COD == this.textos.patologiacronica_SER110C);
                        if (res == undefined) {
                            CON851("01", "01", null, "error", "error");
                            this._evaluapatologia_SER110C()
                        } else {
                            this._evaluartutela_SER110C()
                        }
                    }
                }
            )
        },
        _evaluartutela_SER110C() {
            if (this.textos.pacitutela_SER110C.trim() == '') this.textos.pacitutela_SER110C = 'N'
            validarInputs({
                form: '#EVAPACITUTELA_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluartutela_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluartutela_SER110C) }
            },
                this._evaluarcronico_SER110C,
                () => {
                    this.textos.pacitutela_SER110C = this.textos.pacitutela_SER110C.toUpperCase()
                    if (this.textos.pacitutela_SER110C == 'S' || this.textos.pacitutela_SER110C == 'N') {
                        this._evaluarclasificacion_SER110C()
                    } else {
                        this._evaluartutela_SER110C()
                    }
                }
            )
        },
        _evaluarclasificacion_SER110C() {
            switch ($_USUA_GLOBAL[0].NIT) {
                case 844003225:
                case 891855847:
                case 800162035:
                case 900541158:
                case 900565371:
                case 900566047:
                case 900658867:
                case 900405505:
                case 900405505:
                    validarInputs({
                        form: '#CLASIF_SER110C',
                        orden: "1",
                        event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarclasificacion_SER110C) },
                        event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarclasificacion_SER110C) }
                    },
                        this._evaluartutela_SER110C,
                        () => {
                            if (this.textos.clasif_SER110C.trim() == '') {
                                this._evaluarmulticonsulta_SER110C()
                            } else {
                                const res = this.SER110C.CLASIFICACION.find(e => e.COD == this.textos.clasif_SER110C);
                                if (res == undefined) {
                                    CON851("01", "01", null, "error", "error");
                                    this._evaluarclasificacion_SER110C()
                                } else {
                                    this.textos.clasifd_SER110C = res.NOMBRE
                                    this._evaluarmulticonsulta_SER110C()
                                }
                            }
                        }
                    )
                    break;
                default:
                    this.textos.clasif_SER110C = '';
                    this._evaluaracompa_SER110C()
                    break;
            }
        },
        _evaluarmulticonsulta_SER110C() {
            if (this.textos.policonsul_SER110C.trim() == '') this.textos.policonsul_SER110C = 'N'
            validarInputs({
                form: '#EVAPOLICONSUL_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarmulticonsulta_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarmulticonsulta_SER110C) }
            },
                this._evaluarclasificacion_SER110C,
                () => {
                    this.textos.policonsul_SER110C = this.textos.policonsul_SER110C.toUpperCase()
                    if (this.textos.policonsul_SER110C == 'S' || this.textos.policonsul_SER110C == 'N') {
                        this._evaluaracompa_SER110C()
                    } else {
                        this._evaluarmulticonsulta_SER110C()
                    }
                }
            )
        },
        _evaluaracompa_SER110C() {
            setTimeout(() => {
                _acompanantepaciente_SALUD(this._validacionesmamografia_SER110C, this._evaluartutela_SER110C, params = { IDACOMP: this.SER110C.IDACOMPW, TIPOACOMP: this.SER110C.TIPOACOMPW, NOMB1ACOMP: this.SER110C.NOMB1ACOMPW, NOMB2ACOMP: this.SER110C.NOMB2ACOMPW, APEL1ACOMP: this.SER110C.APEL1ACOMPW, APEL2ACOMP: this.SER110C.APEL2ACOMPW, TELACOMP: this.SER110C.TELACOMPW })
            }, 300);
        },
        _validacionesmamografia_SER110C() {
            if (data == undefined) {
                this.SER110C.IDACOMPW = ''
                this.SER110C.TIPOACOMPW = ''
                this.SER110C.NOMB1ACOMPW = ''
                this.SER110C.NOMB2ACOMPW = ''
                this.SER110C.APEL1ACOMPW = ''
                this.SER110C.APEL2ACOMPW = ''
                this.SER110C.TELACOMPW = ''
            } else {
                this.SER110C.IDACOMPW = data.IDACOMP
                this.SER110C.TIPOACOMPW = data.TIPOACOMPA
                this.SER110C.NOMB1ACOMPW = data.NOMB1ACOMPA.padEnd(12, ' ')
                this.SER110C.NOMB2ACOMPW = data.NOMB2ACOMPA.padEnd(12, ' ')
                this.SER110C.APEL1ACOMPW = data.APEL1ACOMPA.padEnd(15, ' ')
                this.SER110C.APEL2ACOMPW = data.APEL2ACOMPA.padEnd(15, ' ')
                this.SER110C.TELACOMPW = data.TELACOMPA
            }
            if ($_USUA_GLOBAL[0].NIT == 830092718 && this.textos.sexo_SER110C == 'F') {
                this._evaluarmamografia_SER110C()
            } else {
                this._evaluarcandidatopyp_SER110C()
            }
        },
        _evaluarmamografia_SER110C() {
            validarInputs({
                form: "#MAMOGRAFIA1_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarmamografia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarmamografia_SER110C) }
            },
                () => { this._evaluarmulticonsulta_SER110C() },
                () => {
                    if (this.textos.mamografiaano_SER110C.trim() == '') {
                        this._evaluarrestriccion_SER110C()
                    } else {
                        if (this.textos.mamografiaano_SER110C < 2000) {
                            CON851('03', '03', null, 'error', 'error');
                            this._evaluarmamografia_SER110C()
                        } else {
                            this._evaluarmesmamografia_SER110C()
                        }
                    }
                }
            )
        },
        _evaluarmesmamografia_SER110C() {
            validarInputs({
                form: "#MAMOGRAFIA2_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarmesmamografia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarmesmamografia_SER110C) }
            },
                () => { this._evaluarmamografia_SER110C() },
                () => {
                    this.textos.mamografiames_SER110C = this.textos.mamografiames_SER110C.padStart(2, '0')
                    if (this.textos.mamografiames_SER110C < 01 || this.textos.mamografiames_SER110C > 12) {
                        this._evaluarmesmamografia_SER110C()
                    } else {
                        this.SER110C.FECHAMAMOGRAFIA = this.textos.mamografiaano_SER110C + this.textos.mamografiames_SER110C
                        if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                            this._evaluarnitfac_SER110C()
                        } else {
                            this._evaluarcandidatopyp_SER110C()
                        }
                    }
                }
            )
        },
        _evaluarcandidatopyp_SER110C() {
            if (this.textos.candpyp_SER110C.trim() == '') this.textos.candpyp_SER110C = 'N'
            validarInputs({
                form: '#EVACANDPYP_SER110C',
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarcandidatopyp_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarcandidatopyp_SER110C) }
            },
                this._evaluarmulticonsulta_SER110C,
                () => {
                    this.textos.candpyp_SER110C = this.textos.candpyp_SER110C.toUpperCase()
                    if (this.textos.candpyp_SER110C == 'S' || this.textos.candpyp_SER110C == 'N') {
                        if (this.textos.candpyp_SER110C == 'N') {
                            this._evaluarrestriccion_SER110C()
                        } else {
                            this._evaluarfinalidad_SER110C()
                        }
                    } else {
                        this._evaluarcandidatopyp_SER110C()
                    }
                }
            )
        },


        _evaluarfinalidad_SER110C() {
            setTimeout(() => {
                SER834A({ seleccion: this.textos.finalidad_SER110C.substring(0, 2) }, this._evaluarcandidatopyp_SER110C, data => {
                    this.textos.finalidad_SER110C = data.COD + " - " + data.DESCRIP;
                    this._evaluarrestriccion_SER110C()
                });
            }, 300);
        },
        _evaluarrestriccion_SER110C() {
            if (this.textos.consult_SER110C == 'N' || this.textos.odont_SER110C == 'N' || this.textos.pyp_SER110C == 'N' || this.textos.lab_SER110C == 'N' || this.textos.rx_SER110C == 'N' || this.textos.drog_SER110C == 'N' ||
                this.textos.fisiot_SER110C == 'N' || this.textos.terap_SER110C == 'N' || this.textos.cirug_SER110C == 'N' || this.textos.estanc_SER110C == 'N') {
                this.textos.restric_SER110C = 'S'
            }
            if (this.textos.restric_SER110C.trim() == '') this.textos.restric_SER110C = 'N'
            validarInputs({
                form: "#EVARESTRIC_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestriccion_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestriccion_SER110C) }
            },
                () => { this._evaluarcandidatopyp_SER110C() },
                () => {
                    this.textos.restric_SER110C = this.textos.restric_SER110C.toUpperCase()
                    if (this.textos.restric_SER110C == 'S' || this.textos.restric_SER110C == 'N') {
                        this._evaluarrestconsulta_SER110C()
                    } else {
                        this._evaluarrestriccion_SER110C()
                    }
                }
            )
        },
        _evaluarrestconsulta_SER110C() {
            if (this.textos.consult_SER110C.trim() == '') this.textos.consult_SER110C = 'S'
            validarInputs({
                form: "#EVACONSULT_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestconsulta_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestconsulta_SER110C) }
            },
                () => { this._evaluarcandidatopyp_SER110C() },
                () => {
                    this.textos.consult_SER110C = this.textos.consult_SER110C.toUpperCase()
                    if (this.textos.consult_SER110C == 'S' || this.textos.consult_SER110C == 'N') {
                        this._evaluarrestodontologo_SER110C()
                    } else {
                        this._evaluarrestconsulta_SER110C()
                    }
                }
            )
        },
        _evaluarrestodontologo_SER110C() {
            if (this.textos.odont_SER110C.trim() == '') this.textos.odont_SER110C = 'S'
            validarInputs({
                form: "#EVAODONT_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestodontologo_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestodontologo_SER110C) }
            },
                () => { this._evaluarrestconsulta_SER110C() },
                () => {
                    this.textos.odont_SER110C = this.textos.odont_SER110C.toUpperCase()
                    if (this.textos.odont_SER110C == 'S' || this.textos.odont_SER110C == 'N') {
                        this._evaluarrestpyp_SER110C()
                    } else {
                        this._evaluarrestodontologo_SER110C()
                    }
                }
            )
        },
        _evaluarrestpyp_SER110C() {
            if (this.textos.pyp_SER110C.trim() == '') this.textos.pyp_SER110C = 'S'
            validarInputs({
                form: "#EVAPYP_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestpyp_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestpyp_SER110C) }
            },
                () => { this._evaluarrestodontologo_SER110C() },
                () => {
                    this.textos.pyp_SER110C = this.textos.pyp_SER110C.toUpperCase()
                    if (this.textos.pyp_SER110C == 'S' || this.textos.pyp_SER110C == 'N') {
                        this._evaluarrestlaboratorio_SER110C()
                    } else {
                        this._evaluarrestpyp_SER110C()
                    }
                }
            )
        },
        _evaluarrestlaboratorio_SER110C() {
            if (this.textos.lab_SER110C.trim() == '') this.textos.lab_SER110C = 'S'
            validarInputs({
                form: "#EVALAB_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestlaboratorio_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestlaboratorio_SER110C) }
            },
                () => { this._evaluarrestpyp_SER110C() },
                () => {
                    this.textos.lab_SER110C = this.textos.lab_SER110C.toUpperCase()
                    if (this.textos.lab_SER110C == 'S' || this.textos.lab_SER110C == 'N') {
                        this._evaluarrestrx_SER110C()
                    } else {
                        this._evaluarrestlaboratorio_SER110C()
                    }
                }
            )
        },
        _evaluarrestrx_SER110C() {
            if (this.textos.rx_SER110C.trim() == '') this.textos.rx_SER110C = 'S'
            validarInputs({
                form: "#EVARX_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestrx_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestrx_SER110C) }
            },
                () => { this._evaluarrestlaboratorio_SER110C() },
                () => {
                    this.textos.rx_SER110C = this.textos.rx_SER110C.toUpperCase()
                    if (this.textos.rx_SER110C == 'S' || this.textos.rx_SER110C == 'N') {
                        this._evaluarrestdrogueria_SER110C()
                    } else {
                        this._evaluarrestrx_SER110C()
                    }
                }
            )
        },
        _evaluarrestdrogueria_SER110C() {
            if (this.textos.drog_SER110C.trim() == '') this.textos.drog_SER110C = 'S'
            validarInputs({
                form: "#EVADROG_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestdrogueria_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestdrogueria_SER110C) }
            },
                () => { this._evaluarrestrx_SER110C() },
                () => {
                    this.textos.drog_SER110C = this.textos.drog_SER110C.toUpperCase()
                    if (this.textos.drog_SER110C == 'S' || this.textos.drog_SER110C == 'N') {
                        this._evaluarrestfisioterapia_SER110C()
                    } else {
                        this._evaluarrestdrogueria_SER110C()
                    }
                }
            )
        },
        _evaluarrestfisioterapia_SER110C() {
            if (this.textos.fisiot_SER110C.trim() == '') this.textos.fisiot_SER110C = 'S'
            validarInputs({
                form: "#EVAFISIOT_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestfisioterapia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestfisioterapia_SER110C) }
            },
                () => { this._evaluarrestdrogueria_SER110C() },
                () => {
                    this.textos.fisiot_SER110C = this.textos.fisiot_SER110C.toUpperCase()
                    if (this.textos.fisiot_SER110C == 'S' || this.textos.fisiot_SER110C == 'N') {
                        this._evaluarrestotraterapia_SER110C()
                    } else {
                        this._evaluarrestfisioterapia_SER110C()
                    }
                }
            )
        },
        _evaluarrestotraterapia_SER110C() {
            if (this.textos.terap_SER110C.trim() == '') this.textos.terap_SER110C = 'S'
            validarInputs({
                form: "#EVATERAP_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestotraterapia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestotraterapia_SER110C) }
            },
                () => { this._evaluarrestfisioterapia_SER110C() },
                () => {
                    this.textos.terap_SER110C = this.textos.terap_SER110C.toUpperCase()
                    if (this.textos.terap_SER110C == 'S' || this.textos.terap_SER110C == 'N') {
                        this._evaluarrestcirugia_SER110C()
                    } else {
                        this._evaluarrestotraterapia_SER110C()
                    }
                }
            )
        },
        _evaluarrestcirugia_SER110C() {
            if (this.textos.cirug_SER110C.trim() == '') this.textos.cirug_SER110C = 'S'
            validarInputs({
                form: "#EVACIRUG_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestcirugia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestcirugia_SER110C) }
            },
                () => { this._evaluarrestotraterapia_SER110C() },
                () => {
                    this.textos.cirug_SER110C = this.textos.cirug_SER110C.toUpperCase()
                    if (this.textos.cirug_SER110C == 'S' || this.textos.cirug_SER110C == 'N') {
                        this._evaluarrestestancia_SER110C()
                    } else {
                        this._evaluarrestcirugia_SER110C()
                    }
                }
            )
        },
        _evaluarrestestancia_SER110C() {
            if (this.textos.estanc_SER110C.trim() == '') this.textos.estanc_SER110C = 'S'
            validarInputs({
                form: "#EVAESTANC_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarrestestancia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarrestestancia_SER110C) }
            },
                () => { this._evaluarrestcirugia_SER110C() },
                () => {
                    this.textos.estanc_SER110C = this.textos.estanc_SER110C.toUpperCase()
                    if (this.textos.estanc_SER110C == 'S' || this.textos.estanc_SER110C == 'N') {
                        this._evaluarviolencia_SER110C()
                    } else {
                        this._evaluarrestestancia_SER110C()
                    }
                }
            )
        },
        _evaluarviolencia_SER110C() {
            if (this.textos.vcm_SER110C.trim() == '') this.textos.vcm_SER110C = 'N'
            validarInputs({
                form: "#EVAVCM_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarviolencia_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarviolencia_SER110C) }
            },
                () => { this._evaluarrestestancia_SER110C() },
                () => {
                    this.textos.vcm_SER110C = this.textos.vcm_SER110C.toUpperCase()
                    if (this.textos.vcm_SER110C == 'N' || this.textos.vcm_SER110C == 'S') {
                        this._evaluarpagare_SER110C()
                    } else {
                        this._evaluarviolencia_SER110C()
                    }
                }
            )
        },
        _evaluarpagare_SER110C() {
            if (this.textos.pagare_SER110C.trim() == '') this.textos.pagare_SER110C = 'N'
            validarInputs({
                form: "#TIENEPAGARE_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarpagare_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarpagare_SER110C) }
            },
                () => { this._evaluarviolencia_SER110C() },
                () => {
                    this.textos.pagare_SER110C = this.textos.pagare_SER110C.toUpperCase()
                    if (this.textos.pagare_SER110C == 'S' || this.textos.pagare_SER110C == 'N') {
                        if (this.textos.pagare_SER110C == 'S') {
                            this._evaluarprefijo_SER110C()
                        } else {
                            this.textos.prefijo_SER110C = ''
                            this.textos.factura_SER110C = 00000
                            this.SER110C.FACTURAPAGARE = this.textos.prefijo_SER110C + this.textos.factura_SER110C
                            this.SER110C.valorpagareMask_SER110C.typedValue = 0
                            this.SER110C.VALORPAGARE = 0
                            this._evaluarderecho_SER110C()
                        }
                    } else {
                        this._evaluarpagare_SER110C()
                    }
                }
            )
        },
        _evaluarprefijo_SER110C() {
            validarInputs(
                {
                    form: "#FACTURA_SER110C",
                    orden: "1"
                }, () => { this._evaluarpagare_SER110C() },
                () => {
                    this.textos.prefijo_SER110C = this.textos.prefijo_SER110C.toUpperCase();
                    if (this.textos.prefijo_SER110C.trim() == "" || this.textos.prefijo_SER110C.trim() == "C" || this.textos.prefijo_SER110C.trim() == "E" ||
                        this.textos.prefijo_SER110C.trim() == "U" || this.textos.prefijo_SER110C.trim() == "Ñ") {
                        CON851("", "Prefijo incorrecto", null, "error", "Error");
                        this._evaluarprefijo_SER110C()
                    } else {
                        this._evaluarfact_SER110C()
                    }
                },
            );
        },
        _evaluarfact_SER110C() {
            validarInputs(
                {
                    form: "#FACTURA2_SER110C",
                    orden: "1"
                }, () => { this._evaluarpagare_SER110C() },
                () => {
                    this.SER110C.FACTURAPAGARE = this.textos.prefijo_SER110C + this.textos.factura_SER110C.padStart(6, '0')
                    this._evaluarvalorpagare_SER110C()
                },
            );
        },
        _evaluarvalorpagare_SER110C() {
            validarInputs(
                {
                    form: "#VALOR_SER110C",
                    orden: "1"
                }, () => { this._evaluarprefijo_SER110C() },
                () => {
                    this.SER110C.VALORPAGARE = this.SER110C.valorpagareMask_SER110C.value
                    this._evaluarderecho_SER110C()
                },
            );
        },
        _evaluarderecho_SER110C() {
            if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                this.textos.basedatos_SER110C = '3 - Creado por el  usuario'
                this._evaluarobservacion_SER110C()
            } else {
                obtenerDatosCompletos({ nombreFd: 'DERECHO' }, (data) => {
                    var derecho = data.DERECHO;
                    POPUP(
                        {
                            array: derecho,
                            titulo: "ESTADO BASE DE DATOS",
                            indices: [
                                {
                                    id: "COD",
                                    label: "DESCRIP",
                                },
                            ],
                            seleccion: this.textos.basedatos_SER110C.substring(0, 1),
                            callback_f: () => {
                                this._evaluarpagare_SER110C()
                            },
                            teclaAlterna: true
                        },
                        derecho => {
                            this.textos.basedatos_SER110C = derecho.COD + " - " + derecho.DESCRIP;
                            this._evaluarobservacion_SER110C()
                        },
                    );
                })
            }
        },
        _evaluarobservacion_SER110C() {
            validarInputs({
                form: "#OBSERVACIONES_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarobservacion_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarobservacion_SER110C) }
            },
                () => {
                    this._evaluarvalorpagare_SER110C()
                },
                () => {
                    this.textos.observaciones_SER110C = this.textos.observaciones_SER110C.toUpperCase()
                    this._evaluardiscapacidad_SER110C()
                }
            )
        },
        _evaluardiscapacidad_SER110C() {
            obtenerDatosCompletos({ nombreFd: 'DISCAPACIDAD' }, (data) => {
                var discapacidad = data.DISCAPACIDAD;
                POPUP(
                    {
                        array: discapacidad,
                        titulo: "Discapacidad",
                        indices: [
                            {
                                id: "COD",
                                label: "DESCRIP",
                            },
                        ],
                        seleccion: this.textos.discapacidad_SER110C.substring(0, 1),
                        callback_f: () => {
                            this._evaluarobservacion_SER110C();
                        },
                        teclaAlterna: true
                    },
                    discapacidad => {
                        this.textos.discapacidad_SER110C = discapacidad.COD + " - " + discapacidad.DESCRIP;
                        if ($_USUA_GLOBAL[0].NIT == 830092718) {
                            switch ($_USUA_GLOBAL[0].PREFIJ) {
                                case "TU":
                                    this.textos.entidad_SER110C = 800209488
                                    break;
                                case "SB":
                                    this.textos.entidad_SER110C = 800216883
                                    break;
                            }
                        }
                        this._evaluarnitfac_SER110C()
                    },
                );
            })
        },
        _evaluarnitfac_SER110C() {
            if (this.textos.entidad_SER110C.trim() == '') this.textos.entidad_SER110C = this.SER110C.NITENT
            validarInputs({
                form: "#ENTIDAD_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarnitfac_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarnitfac_SER110C) }
            },
                () => { this._evaluarobservacion_SER110C() },
                () => {
                    this.textos.entidad_SER110C = this.textos.entidad_SER110C.padStart(10, "0");
                    if (this.textos.entidad_SER110C == 0 && $_USUA_GLOBAL[0].NIT != 892000401 && $_USUA_GLOBAL[0].NIT != 830092718) {
                        this.textos.entidadd_SER110C = '';
                        this._validacionesnitfact_SER110C()
                    } else {
                        let URL = get_url("APP/CONTAB/CON802_01.DLL");
                        postData({
                            datosh: datosEnvio() + this.textos.entidad_SER110C + "|",
                        }, URL)
                            .then(data => {
                                this.SER110C.TERCERO = data.TERCER[0]
                                this.textos.entidadd_SER110C = this.SER110C.TERCERO.DESCRIP_TER
                                this._validacionesnitfact_SER110C()
                            }).catch(error => {
                                console.error(error)
                                this._evaluarnitfac_SER110C()
                            });
                    }
                }
            )
        },
        _validacionesnitfact_SER110C() {
            if (this.textos.entidad_SER110C > 0 && this.textos.entidad_SER110C != this.SER110C.NITFACTPACIW) {
                this.textos.fechasistd_SER110C = moment().format('YYYYMMDD');
            }
            if ($_USUA_GLOBAL[0].NIT == 830092718) {
                this._evaluarantecendentescancer_SER110C()
            } else {
                this._evaluarembarazo_SER110C()
            }
        },
        _evaluarantecendentescancer_SER110C() {
            $('#ANTECEND_SER110C').removeClass('hidden');
            validarInputs({
                form: "#ANTECEND_SER110C",
                orden: "1"
            },
                () => { this._evaluarnitfac_SER110C() },
                () => {
                    this.textos.antecedentes_SER110C = this.textos.antecedentes_SER110C.toUpperCase()
                    if (this.textos.antecedentes_SER110C == 'N' || this.textos.antecedentes_SER110C == 'S') {
                        this._evaluarembarazo_SER110C()
                    } else {
                        CON851('03', '03', null, 'error', 'error');
                        this._evaluarantecendentescancer_SER110C()
                    }
                }
            )
        },
        _evaluarembarazo_SER110C() {
            if (this.textos.sexo_SER110C == 'M' || this.SER110C.UNIDADEDADW != 'A' || this.SER110C.VLREDADW < 8) {
                this.textos.altoriesgo_SER110C = ''
                this._validacionesembarazo_SER110C()
            } else {
                validarInputs({
                    form: "#ALGORIESGO_SER110C",
                    orden: "1"
                },
                    () => { this._evaluarnitfac_SER110C() },
                    () => {
                        this.textos.altoriesgo_SER110C = this.textos.altoriesgo_SER110C.toUpperCase()
                        if (this.textos.altoriesgo_SER110C == 'S' || this.textos.altoriesgo_SER110C == 'N' || this.textos.altoriesgo_SER110C.trim() == '') {
                            this._validacionesembarazo_SER110C()
                        } else {
                            this._evaluarembarazo_SER110C()
                        }
                    }
                )
            }
        },
        _validacionesembarazo_SER110C() {
            if (this.textos.altoriesgo_SER110C.trim() == '' || this.textos.altoriesgo_SER110C == 'S' || this.textos.altoriesgo_SER110C == 'N') {
                if (this.textos.altoriesgo_SER110C == 'S') {
                    CON851('', 'EH', null, 'warning', 'Advertencia');
                }
                this._evaluarmedicofami_SER110C()
            } else {
                CON851('03', '03', null, 'error', 'error');
                this._evaluarembarazo_SER110C()
            }
        },
        _evaluarmedicofami_SER110C() {
            validarInputs({
                form: "#MEDICOFAM_SER110C",
                orden: "1",
                event_f7: () => { this._evaluarcambiosbasedatos_SER110C(this._evaluarmedicofami_SER110C) },
                event_f9: () => { this._datoscompletfamiliar_SER110C(this._evaluarmedicofami_SER110C) }
            },
                () => { this._evaluarnitfac_SER110C() },
                () => {
                    this.textos.medicofam_SER110C = this.textos.medicofam_SER110C.replace(/^0+/, '')
                    if (this.textos.medicofam_SER110C.trim() == '' || this.textos.medicofam_SER110C == 0) {
                        this.textos.medicofamd_SER110C = ''
                        this._evaluaremail_SER110C()
                    } else {
                        const res = this.SER110C.PROFESIONALES.find(e => e.IDENTIFICACION == this.textos.medicofam_SER110C);
                        if (res == undefined) {
                            CON851("01", "01", null, "error", "error");
                            this._evaluarmedicofami_SER110C()
                        } else {
                            this.textos.medicofamd_SER110C = res.NOMBRE;
                            this._evaluaremail_SER110C()
                        }
                    }
                }
            )
        },
        _evaluaremail_SER110C() {
            if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                this.textos.opercreado_SER110C = localStorage.Usuario
                this.textos.fechacreado_SER110C = moment().format('YYYYMMDD')
                this.textos.hrcreado_SER110C = moment().format('HHmm')
                this.textos.modificado_SER110C = ''
                this.textos.fechamodif_SER110C = ''
                this.textos.hrmodif_SER110C = ''
            } else {
                this.textos.modificado_SER110C = localStorage.Usuario
                this.textos.fechamodif_SER110C = moment().format('YYYYMMDD')
                this.textos.hrmodif_SER110C = moment().format('HHmm')
            }
            if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
                CON851P('01', this._evaluarmedicofami_SER110C, this._validacionesgrabar_SER110C)
            } else {
                $('#CORREO_SER110C').removeClass('hidden');
                validarInputs({
                    form: "#CORREO_SER110C",
                    orden: "1"
                },
                    () => { this._evaluarnitfac_SER110C() },
                    () => {
                        if (this.textos.correo_SER110C.trim() == '') {
                            CON851P('01', this._evaluarmedicofami_SER110C, this._validacionesgrabar_SER110C)
                        } else {
                            var correo = this.textos.correo_SER110C.indexOf("@")
                            if (correo < 1) {
                                CON851('2K', '2K', null, 'error', 'error');
                                this._evaluaremail_SER110C()
                            } else {
                                CON851P('01', this._evaluarmedicofami_SER110C, this._validacionesgrabar_SER110C)
                            }
                        }
                    }
                )
            }
        },
        _validacionesgrabar_SER110C() {
            let datos_envio = [
                '2',
                null,
                this.textos.novedad_SER110C.substring(0, 1),
                this.textos.numero_SER110C,
                this.textos.identif_SER110C.substring(0, 3),
                this.textos.lugar_SER110C,
                this.SER110C.primerapellido_SER110C.value,
                this.SER110C.segundoapellido_SER110C.value,
                this.SER110C.primernombre_SER110C.value,
                this.SER110C.segundonombre_SER110C.value,
                this.SER110C.FECHANACIPACIW,
                this.textos.gruposang_SER110C,
                this.textos.rh_SER110C,
                this.textos.sexo_SER110C,
                this.textos.civil_SER110C.substring(0, 1),
                this.textos.estudio_SER110C.substring(0, 1),
                this.textos.zona_SER110C.substring(0, 1),
                this.textos.correo2_SER110C,
                this.textos.padre_SER110C,
                this.textos.madre_SER110C,
                this.textos.ciudad_SER110C,
                this.textos.pais_SER110C,
                this.SER110C.telefono1Mask_SER110C.value,
                this.SER110C.telefono2Mask_SER110C.value,
                this.textos.direccion_SER110C,
                this.textos.barrio_SER110C,
                this.textos.ocupacion_SER110C,
                this.textos.nivel_SER110C.substring(0, 1),
                this.textos.copago_SER110C,
                this.textos.regimen_SER110C.substring(0, 1),
                this.textos.colegio_SER110C,
                this.textos.etnia_SER110C.substring(0, 1),
                this.textos.indigena_SER110C,
                this.textos.comunidades_SER110C,
                this.textos.resguardos_SER110C,
                this.textos.tipoafil_SER110C.substring(0, 1),
                this.textos.portabilidad_SER110C,
                this.textos.ciudadportab_SER110C,
                this.textos.eps_SER110C,
                this.textos.contrato_SER110C,
                this.SER110C.fechaafilMask_SER110C.value,
                this.textos.ficha_SER110C,
                this.textos.carnet_SER110C,
                this.SER110C.fechavenceMask_SER110C.value,
                this.textos.cotizante_SER110C,
                this.textos.parentezco_SER110C.substring(0, 2),
                this.textos.empresalab_SER110C,
                this.textos.victimac_SER110C,
                this.textos.proespecial_SER110C,
                this.textos.altocosto_SER110C,
                this.SER110C.RESULTADOCOVIDPACIW,
                this.textos.cronica_SER110C,
                this.textos.patologiacronica_SER110C,
                this.textos.pacitutela_SER110C,
                this.textos.clasif_SER110C,
                this.textos.policonsul_SER110C,
                this.SER110C.IDACOMPW,
                this.SER110C.TIPOACOMPW,
                this.SER110C.NOMB1ACOMPW,
                this.SER110C.NOMB2ACOMPW,
                this.SER110C.APEL1ACOMPW,
                this.SER110C.APEL2ACOMPW,
                this.SER110C.TELACOMPW,
                this.SER110C.FECHAMAMOGRAFIA,
                this.textos.candpyp_SER110C,
                this.textos.finalidad_SER110C.substring(0, 2),
                this.textos.restric_SER110C,
                this.textos.consult_SER110C,
                this.textos.odont_SER110C,
                this.textos.pyp_SER110C,
                this.textos.lab_SER110C,
                this.textos.rx_SER110C,
                this.textos.drog_SER110C,
                this.textos.fisiot_SER110C,
                this.textos.terap_SER110C,
                this.textos.cirug_SER110C,
                this.textos.estanc_SER110C,
                this.textos.vcm_SER110C,
                this.textos.pagare_SER110C,
                this.SER110C.FACTURAPAGARE,
                this.SER110C.VALORPAGARE,
                this.textos.basedatos_SER110C.substring(0, 1),
                this.textos.observaciones_SER110C,
                this.textos.discapacidad_SER110C.substring(0, 1),
                this.textos.entidad_SER110C,
                this.textos.fechasistd_SER110C,
                this.textos.antecedentes_SER110C,
                this.textos.altoriesgo_SER110C,
                this.textos.medicofam_SER110C,
                this.textos.correo_SER110C,
                this.textos.opercreado_SER110C,
                this.textos.fechacreado_SER110C,
                this.textos.hrcreado_SER110C,
                this.textos.modificado_SER110C,
                this.textos.fechamodif_SER110C,
                this.textos.hrmodif_SER110C
            ];
            if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                postData({ datosh: `${datosEnvio()}${datos_envio.join('|')}` },
                    get_url("APP/SALUD/SER110CV2.DLL"))
                    .then(data => {
                        this.SER110C.LLAVEAUDW = this.textos.numero_SER110C
                        if (this.textos.pagare_SER110C == 'S') {
                            this._grabarpagare_SER110C()
                        } else {
                            this._grabarauditoria_SER110C()
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        this._evaluarnitfac_SER110C()
                    });
            } else {
                this._grabarauditoria_SER110C(datos_envio)
            }
        },
        _grabarpagare_SER110C() {
            postData({ datosh: `${datosEnvio()}2|${this.textos.numero_SER110C}|${localStorage.Usuario}` },
                get_url("APP/SALUD/SER810A.DLL"))
                .then(data => {
                    if (this.textos.novedad_SER110C.substring(0, 1) == '7') {
                        this._grabarauditoria_SER110C()
                    } else {
                        this._grabarcorresponsalia_SER110C()
                    }
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarnitfac_SER110C()
                });
        },
        _grabarauditoria_SER110C(datos_envio) {
            grabar_auditoria_SALUD(
                {
                    'TIPO': 'IS767',
                    'NOVED': this.textos.novedad_SER110C.substring(0, 1),
                    'LLAVE': this.SER110C.LLAVEAUDW,
                    'ARCH': "PACIENTES      "
                },
                () => {
                    loader("hide")
                    $_this = this
                    switch (this.textos.novedad_SER110C.substring(0, 1)) {
                        case "7":
                            toastr.success('Se ha guardado paciente', 'EXITOSAMENTE');
                            $_this._grabarcorresponsalia_SER110C()
                            break;
                        case "8":
                            $_this._grabarcambio_SER110C(datos_envio)
                            break;
                        default:
                            CON851P('02', $_this._evaluarnumero_SER110C, $_this._eliminarregistro_SER110C)
                            break;
                    }
                }
            )
        },
        _grabarcambio_SER110C(datos_envio) {
            postData({ datosh: `${datosEnvio()}${datos_envio.join('|')}` },
                get_url("APP/SALUD/SER110CV2.DLL"))
                .then(data => {
                    toastr.success('Se ha guardado cambio', 'EXITOSAMENTE');
                    if (this.textos.pagare_SER110C == 'S') {
                        this._grabarpagare_SER110C()
                    } else {
                        this._grabarcorresponsalia_SER110C()
                    }
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarnitfac_SER110C()
                });
        },
        _eliminarregistro_SER110C() {
            postData({ datosh: `${datosEnvio()}2||${this.textos.novedad_SER110C.substring(0, 1)}|${this.textos.numero_SER110C}` },
                get_url("APP/SALUD/SER110CV2.DLL"))
                .then(data => {
                    CON851('', 'Paciente Eliminado', null, 'error', 'error');
                    this._grabarcorresponsalia_SER110C()
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarnitfac_SER110C()
                });
        },
        _grabarcorresponsalia_SER110C() {
            let URL = get_url("APP/CONTAB/CON904.DLL");
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario}|IS767C|` }, URL)
                .then(data => {
                    if (this.textos.novedad_SER110C.substring(0, 1) == '7' || this.textos.novedad_SER110C.substring(0, 1) == '8') {
                        if (this.SER110C.ACTUALIZAPACIX == '1') {
                            CON851P('24', this._deseatrasladardoc_SER110C, this._ventanacorresponsalia_SER110C)
                        } else {
                            CON851P('24', this._terminar_SER110C, this._ventanacorresponsalia_SER110C)
                        }
                    } else {
                        CON851P('24', this._terminar_SER110C, this._ventanacorresponsalia_SER110C)
                    }
                })
                .catch(err => {
                    CON851(swinvalid, swinvalid, null, 'error', 'error')
                    this._validarSalida_ser110c()
                })
        },
        _ventanacorresponsalia_SER110C() {
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110CCR.html', cedula: this.textos.numero_SER110C.padStart(15, '0') });
            vector = ['on', 'Actualizando corresponsalia de pacientes...']
            _EventocrearSegventana(vector, this._terminar_SER110C);
        },
        _deseatrasladardoc_SER110C() {
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario}|IS762|` },
                get_url("APP/CONTAB/CON904S.DLL"))
                .then(data => {
                    if (this.SER110C.ACTUALIZAPACIX == '1') {
                        CON851P('25', this._terminar_SER110C, this._buscartrasladodoc_SER110C)
                    } else {
                        this._terminar_SER110C()
                    }
                })
                .catch(error => {
                    this._terminar_SER110C()
                });
        },
        _buscartrasladodoc_SER110C() {
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER7621.html' });
            vector = ['on', 'Unifica movimiento de pacientes...']
            _EventocrearSegventana(vector, this._terminar_SER110C);
        },
        _saliropcion_SER110C() {
            loader("hide")
            _inputControl("reset");
            _inputControl("disabled");
            this._terminar_SER110C()
        },
        _validarSalida_ser110c() {
            let modulo = localStorage.Modulo;
            if (modulo == "HIC") _regresar_menuhis();
            else _toggleNav();
        },
        _ventanahuellada_SER110C() {
            console.log('HUELLA DACTILAR')
        },
        //////////LLENAR DATOS/////////////////////
        _llenardatos_SER110C() {
            let estadocivil = { 'S': 'SOLTERO', 'C': 'CASADA', 'U': 'UNION LIBRE', 'V': 'VIUDO', 'D': 'SEPARADO' };
            let nivelestudio = { '1': 'NINGUNO', '2': 'PRE-ESCOL', '3': 'PRIMARIA', '4': 'SECUNDARIA', '5': 'BACH.BASI', '6': 'BACH.TECN', '7': 'NORMALIST', '8': 'TECN.PROFE', '9': 'TECNOLOGI', 'A': 'PROFESION', 'B': 'ESPECIALI', 'C': 'MAESTRIA', 'D': 'DOCTORADO' };
            let nivel = { '0': 'NIVEL 0', '1': 'NIVEL 1', '2': 'NIVEL 2', '3': 'NIVEL 3', '4': 'NIVEL 4', '5': 'NIVEL 5', '6': 'NIVEL 6' };
            let regimen = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR', 'O': 'OTRO TIPO', 'D': 'DESPLAZ CONT', 'E': 'DESPLAZ SUBS', 'G': 'DESPLAZ VINC' };
            let afiliado = { '1': 'COTIZANTE', '2': 'BENEFICIARIO', '3': 'COT. PENSIONADO', '4': 'UPC ADICIONAL', '5': 'CABEZA FAMILIA', '6': 'GRUPO FAMILIAR', '0': 'SIN DETERMINAR' };
            let derecho = { '1': 'En base de datos, ACTIVO', '2': 'En base de datos, INACTIVO', '3': 'Creado por el  usuario', '4': 'Pendiente por determinar', '5': 'En base de datos, SIN CARNET', '6': 'SUSPENDIDO, requiere autoriz', '7': 'Afiliado Fallecido', '8': 'Retiro X Multiafiliado', '9': 'Ingreso X Traslado', 'A': 'Retiro  X Traslado', 'B': 'Periodo integral' };
            let discapacidad = { '1': 'SIN DISCAPACI', '2': 'DISC.FISICA', '3': 'DISC.AUDITIVA', '4': 'DISC.VISUAL', '5': 'DISC.MENTAL', '6': 'DISC.COGNITIV' };
            let parentezco = { '01': 'CONYUGUE', '02': 'HIJO', '03': 'PADRES', '04': '2 GRADO', '05': '3 GRADO', '06': '< 12', '07': 'SUEGRO', '08': 'OTR-BE', '00': 'COTIZANTE' };
            let etnia = { '1': 'INGENA', '2': 'RAIZAL', '3': 'GITANO', '4': 'AFROCO', '5': 'ROM', '6': 'MESTIZO', '9': 'NO APLICA' };
            let zona = { 'R': 'RURAL', 'U': 'URBANO' };
            if (estadocivil[this.SER110C.PACIENTES[0]["EST-CIV"].trim()] == undefined) {
                this.textos.civil_SER110C = ''
            } else {
                this.textos.civil_SER110C = this.SER110C.PACIENTES[0]["EST-CIV"].trim() + ' - ' + estadocivil[this.SER110C.PACIENTES[0]["EST-CIV"].trim()]
            }
            if (nivelestudio[this.SER110C.PACIENTES[0]["NIV-ESTUD"].trim()] == undefined) {
                this.textos.estudio_SER110C = ''
            } else {
                this.textos.estudio_SER110C = this.SER110C.PACIENTES[0]["NIV-ESTUD"].trim() + ' - ' + nivelestudio[this.SER110C.PACIENTES[0]["NIV-ESTUD"].trim()]
            }
            if (nivel[this.SER110C.PACIENTES[0].ESTRATO.trim()] == undefined) {
                this.textos.nivel_SER110C = ''
            } else {
                this.textos.nivel_SER110C = this.SER110C.PACIENTES[0].ESTRATO.trim() + ' - ' + nivel[this.SER110C.PACIENTES[0].ESTRATO.trim()]
            }
            if (regimen[this.SER110C.PACIENTES[0].TIPO.trim()] == undefined) {
                this.textos.regimen_SER110C = ''
            } else {
                this.textos.regimen_SER110C = this.SER110C.PACIENTES[0].TIPO.trim() + ' - ' + regimen[this.SER110C.PACIENTES[0].TIPO.trim()]
            }
            if (afiliado[this.SER110C.PACIENTES[0]["TIPO-AFIL"].trim()] == undefined) {
                this.textos.tipoafil_SER110C = ''
            } else {
                this.textos.tipoafil_SER110C = this.SER110C.PACIENTES[0]["TIPO-AFIL"].trim() + ' - ' + afiliado[this.SER110C.PACIENTES[0]["TIPO-AFIL"].trim()]
            }
            if (derecho[this.SER110C.PACIENTES[0].DERECHO.trim()] == undefined) {
                this.textos.basedatos_SER110C = ''
            } else {
                this.textos.basedatos_SER110C = this.SER110C.PACIENTES[0].DERECHO.trim() + ' - ' + derecho[this.SER110C.PACIENTES[0].DERECHO]
            }
            if (discapacidad[this.SER110C.PACIENTES[0].DISCAP.trim()] == undefined) {
                this.textos.discapacidad_SER110C = ''
            } else {
                this.textos.discapacidad_SER110C = this.SER110C.PACIENTES[0].DISCAP.trim() + ' - ' + discapacidad[this.SER110C.PACIENTES[0].DISCAP.trim()]
            }
            if (parentezco[this.SER110C.PACIENTES[0]["PARENT"].trim()] == undefined) {
                this.textos.parentezco_SER110C = ''
            } else {
                this.textos.parentezco_SER110C = this.SER110C.PACIENTES[0]["PARENT"].trim() + ' - ' + parentezco[this.SER110C.PACIENTES[0]["PARENT"].trim()]
            }
            if (etnia[this.SER110C.PACIENTES[0].ETNIA.trim()] == undefined) {
                this.textos.etnia_SER110C = ''
            } else {
                this.textos.etnia_SER110C = this.SER110C.PACIENTES[0].ETNIA.trim() + ' - ' + etnia[this.SER110C.PACIENTES[0].ETNIA.trim()]
            }
            if (zona[this.SER110C.PACIENTES[0].ZONA.trim()] == undefined) {
                this.textos.zona_SER110C = ''
            } else {
                this.textos.zona_SER110C = this.SER110C.PACIENTES[0].ZONA.trim() + ' - ' + zona[this.SER110C.PACIENTES[0].ZONA.trim()]
            }
            this.textos.identif_SER110C = this.SER110C.PACIENTES[0]["TIPO-ID"]

            this.textos.lugar_SER110C = this.SER110C.PACIENTES[0]["LUGAR-ID"].trim()
            this.SER110C.primerapellido_SER110C.typedValue = this.SER110C.PACIENTES[0]["APELL-PACI1"].trim();
            this.SER110C.segundoapellido_SER110C.typedValue = this.SER110C.PACIENTES[0]["APELL-PACI2"].trim();
            this.SER110C.primernombre_SER110C.typedValue = this.SER110C.PACIENTES[0]["NOM-PACI1"].trim();
            this.SER110C.segundonombre_SER110C.typedValue = this.SER110C.PACIENTES[0]["NOM-PACI2"].trim();
            this.textos.anonac_SER110C = this.SER110C.PACIENTES[0].NACIM.substring(0, 4);
            this.textos.mesnac_SER110C = this.SER110C.PACIENTES[0].NACIM.substring(4, 6);
            this.textos.dianac_SER110C = this.SER110C.PACIENTES[0].NACIM.substring(6, 8);
            this.SER110C.FECHANACCAMB = this.SER110C.PACIENTES[0].NACIM
            var edad = calcular_edad(this.SER110C.PACIENTES[0].NACIM);
            this.textos.edad_SER110C = edad.unid_edad + edad.vlr_edad.toString().padStart('0')
            this.SER110C.UNIDADEDADW = edad.unid_edad
            this.SER110C.VLREDADW = edad.vlr_edad.toString().padStart('0');
            if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
                $('#EMAIL2_SER110C').removeClass('hidden');
            } else {
                if ((this.SER110C.UNIDADEDADW == 'D' || this.SER110C.UNIDADEDADW == 'M') || (this.SER110C.UNIDADEDADW == 'A' && this.SER110C.VLREDADW < 18)) {
                    $('#PADRE_SER110C').removeClass('hidden');
                    $('#MADRE_SER110C').removeClass('hidden');
                } else {
                    $('#PADRE_SER110C').addClass('hidden');
                    $('#MADRE_SER110C').addClass('hidden');
                }
            }
            this.textos.gruposang_SER110C = this.SER110C.PACIENTES[0]["GRP-SANG"].trim()
            this.textos.rh_SER110C = this.SER110C.PACIENTES[0].RH.trim()
            this.textos.sexo_SER110C = this.SER110C.PACIENTES[0].SEXO.trim()
            this.textos.correo2_SER110C = this.SER110C.PACIENTES[0]["E-MAIL"].trim()
            this.textos.padre_SER110C = this.SER110C.PACIENTES[0].PADRE.trim()
            this.textos.madre_SER110C = this.SER110C.PACIENTES[0].MADRE.trim()
            this.textos.ciudad_SER110C = this.SER110C.PACIENTES[0].CIUDAD.trim()
            this.textos.ciudadd_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-CIUDAD"].trim()
            this.SER110C.telefono1Mask_SER110C.typedValue = this.SER110C.PACIENTES[0].TELEFONO.trim()
            this.SER110C.telefono2Mask_SER110C.typedValue = this.SER110C.PACIENTES[0].CEL.trim()
            this.textos.pais_SER110C = this.SER110C.PACIENTES[0]["PAIS-ORIG"].trim()
            this.textos.barrio_SER110C = this.SER110C.PACIENTES[0]["COD-BARRIO"].trim()
            this.textos.descripbarrio_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-BARRIO"].trim()
            this.textos.direccion_SER110C = this.SER110C.PACIENTES[0].DIRECC.trim()
            this.textos.ocupacion_SER110C = this.SER110C.PACIENTES[0]["OCUP-V8"].trim()
            this.textos.ocupaciond_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-OCUP"].trim();
            this.textos.colegio_SER110C = this.SER110C.PACIENTES[0].INSTITUTO.trim()
            this.textos.colegiod_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-INST"].trim()
            this.textos.comunidades_SER110C = this.SER110C.PACIENTES[0]["NOM-COMUNIDAD"].trim();
            this.textos.indigena_SER110C = this.SER110C.PACIENTES[0]["ETNIA-IND"].trim()
            this.textos.resguardos_SER110C = this.SER110C.PACIENTES[0]["NOM-RESGUARDO"].trim();
            this.textos.portabilidad_SER110C = this.SER110C.PACIENTES[0].PORTABILIDAD.trim()
            this.textos.ciudadportab_SER110C = this.SER110C.PACIENTES[0]["CIUDAD-ASEG"].trim()
            this.textos.eps_SER110C = this.SER110C.PACIENTES[0].EPS.trim()
            this.textos.epsd_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-EPS"].trim()
            this.textos.contrato_SER110C = this.SER110C.PACIENTES[0].CONTRATO.trim()
            this.SER110C.fechaafilMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["FECHA-AFIL"].trim()
            this.textos.ficha_SER110C = this.SER110C.PACIENTES[0].FICHA.trim()
            this.textos.carnet_SER110C = this.SER110C.PACIENTES[0]["NRO-AFIL"].trim()
            this.SER110C.fechavenceMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["FECHA-VENCE"].trim()
            this.textos.fechademan_SER110C = this.SER110C.PACIENTES[0]["FECHA-DEMAN-INDU"].trim()
            this.textos.demandaindu_SER110C = this.SER110C.PACIENTES[0]["DEMAN-INDU"].trim();
            this.textos.cotizante_SER110C = this.SER110C.PACIENTES[0]["ID-COTIZ"].trim()
            this.textos.cotizanted_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-COTIZ"].trim()
            this.textos.empresalab_SER110C = this.SER110C.PACIENTES[0].EMPRESA.trim()
            this.textos.fechamatr_SER110C = this.SER110C.PACIENTES[0]["CERT-ESTUD"].trim()
            this.textos.matr_SER110C = this.SER110C.PACIENTES[0]["PERI-ESTUD"].trim()
            this.textos.fechaecono_SER110C = this.SER110C.PACIENTES[0]["CERT-ECONO"].trim()
            this.textos.econo_SER110C = this.SER110C.PACIENTES[0]["PERI-ECO"].trim()
            this.textos.finalidad_SER110C = this.SER110C.PACIENTES[0]["FINALID-PYP"].trim()
            this.textos.patologiacronica_SER110C = this.SER110C.PACIENTES[0]["PATOL-CRONIC"].trim()
            this.textos.clasif_SER110C = this.SER110C.PACIENTES[0].CLASIF.trim()
            this.textos.mamografia_SER110C = this.SER110C.PACIENTES[0]["ULT-MAMO"].trim()

            this.textos.Bloqhc_SER110C = this.SER110C.PACIENTES[0]["BLOQUEO-HC"].trim()
            this.textos.copago_SER110C = this.SER110C.PACIENTES[0].COPAGO.trim();
            this.textos.candpyp_SER110C = this.SER110C.PACIENTES[0]["CANDID-PYP"].trim()
            this.textos.victimac_SER110C = this.SER110C.PACIENTES[0]["VICTI-CONFLICTO"].trim()
            this.textos.proespecial_SER110C = this.SER110C.PACIENTES[0]["PROG-ESP"].trim()
            this.textos.altocosto_SER110C = this.SER110C.PACIENTES[0]["ALT-COS"].trim()
            this.textos.cronica_SER110C = this.SER110C.PACIENTES[0].CRONICO.trim()
            this.textos.pacitutela_SER110C = this.SER110C.PACIENTES[0].TUTELA.trim()
            this.textos.policonsul_SER110C = this.SER110C.PACIENTES[0].MULTICONSUL.trim()
            this.textos.restric_SER110C = this.SER110C.PACIENTES[0]["REST-APLI"].trim()
            this.textos.consult_SER110C = this.SER110C.PACIENTES[0]["REST-CONS"].trim()
            this.textos.odont_SER110C = this.SER110C.PACIENTES[0]["REST-ODON"].trim()
            this.textos.pyp_SER110C = this.SER110C.PACIENTES[0]["REST-PYP"].trim()
            this.textos.lab_SER110C = this.SER110C.PACIENTES[0]["REST-LABO"].trim()
            this.textos.rx_SER110C = this.SER110C.PACIENTES[0]["REST-IMAG"].trim()
            this.textos.drog_SER110C = this.SER110C.PACIENTES[0]["REST-DROG"].trim()
            this.textos.fisiot_SER110C = this.SER110C.PACIENTES[0]["REST-TERF"].trim()
            this.textos.terap_SER110C = this.SER110C.PACIENTES[0]["REST-TERO"].trim()
            this.textos.cirug_SER110C = this.SER110C.PACIENTES[0]["REST-CIRU"].trim()
            this.textos.estanc_SER110C = this.SER110C.PACIENTES[0]["REST-ESTA"].trim()
            this.textos.vcm_SER110C = this.SER110C.PACIENTES[0]["VICT-ABUSO-SEX"].trim()
            this.textos.pagare_SER110C = this.SER110C.PACIENTES[0].PAGARE.trim();

            this.SER110C.valorpagareMask_SER110C.typedValue = this.SER110C.PACIENTES[0]["VALOR-PAGARE"].trim()
            this.textos.prefijo_SER110C = this.SER110C.PACIENTES[0]["FACT-PAGARE"].substring(0, 1)
            this.textos.factura_SER110C = this.SER110C.PACIENTES[0]["FACT-PAGARE"].substring(1, 7)
            this.textos.observaciones_SER110C = this.SER110C.PACIENTES[0].OBSERV.trim()
            this.textos.entidad_SER110C = this.SER110C.PACIENTES[0]["NIT-FACT"].trim()
            this.textos.entidadd_SER110C = this.SER110C.PACIENTES[0]["DESCRIP-NIT-FACT"].trim()
            this.textos.fechasistd_SER110C = this.SER110C.PACIENTES[0]["FECHA-NIT"].trim()
            this.textos.medicofam_SER110C = this.SER110C.PACIENTES[0]["MED-FAMI"].trim()
            this.textos.medicofamd_SER110C = this.SER110C.PACIENTES[0]["NOMBRE-MED-FAMI"].trim()
            this.textos.altoriesgo_SER110C = this.SER110C.PACIENTES[0]["EMB-ALTO-RIESG"].trim()
            this.textos.opercreado_SER110C = this.SER110C.PACIENTES[0]["OPER-CREA"].trim()
            this.textos.fechacreado_SER110C = this.SER110C.PACIENTES[0]["FECHA-CREA"].trim()
            this.textos.hrcreado_SER110C = this.SER110C.PACIENTES[0]["HORA-CREA"].trim()
            this.textos.modificado_SER110C = this.SER110C.PACIENTES[0]["OPER-CORR"].trim()
            this.textos.fechamodif_SER110C = this.SER110C.PACIENTES[0]["FECHA-CORR"].trim()
            this.textos.hrmodif_SER110C = this.SER110C.PACIENTES[0]["HORA-CORR"].trim()
            this.textos.correo2_SER110C = this.SER110C.PACIENTES[0]["E-MAIL"].trim()
            this.textos.correo_SER110C = this.SER110C.PACIENTES[0]["E-MAIL"].trim()
            this.SER110C.PRIAPEL1PACIW = this.SER110C.PACIENTES[0]["APELL-PACI1"].trim().substring(0, 1);
            this.SER110C.PRIAPEL2PACIW = this.SER110C.PACIENTES[0]["APELL-PACI1"].trim().substring(1, 14);
            this.SER110C.PRINOMB1PACIW = this.SER110C.PACIENTES[0]["NOM-PACI1"].trim().substring(0, 1);
            this.SER110C.PRINOMB2PACIW = this.SER110C.PACIENTES[0]["NOM-PACI1"].trim().substring(1, 12);
            this.SER110C.FECHANACIPACIW = this.textos.anonac_SER110C + this.textos.mesnac_SER110C + this.textos.dianac_SER110C
            this.SER110C.NITFACTPACIW = this.SER110C.PACIENTES[0]["NIT-FACT"].trim()
            this.SER110C.ANTCANCERPACIW = this.SER110C.PACIENTES[0]["ANTECED-CANCER"].trim()
            this.SER110C.DESCRIPPACIW = this.SER110C.PACIENTES[0].DESCRIP.trim()
            this.SER110C.EMAIL2W = this.SER110C.PACIENTES[0]["E-MAIL"].trim()
            this.SER110C.TIPOACOMPW = this.SER110C.PACIENTES[0]["TIPO-ID-ACOMP"].trim();
            this.SER110C.IDACOMPW = this.SER110C.PACIENTES[0]["ID-ACOMP"].trim();
            this.SER110C.NOMB1ACOMPW = this.SER110C.PACIENTES[0].NOMB1_ACOMP.trim()
            this.SER110C.NOMB2ACOMPW = this.SER110C.PACIENTES[0].NOMB2_ACOMP.trim()
            this.SER110C.APEL1ACOMPW = this.SER110C.PACIENTES[0].APEL1_ACOMP.trim()
            this.SER110C.APEL2ACOMPW = this.SER110C.PACIENTES[0].APEL2_ACOMP.trim()
            this.SER110C.TELACOMPW = this.SER110C.PACIENTES[0]["TEL-ACOM"].trim();
            this.SER110C.FACTURAPAGARE = this.SER110C.PACIENTES[0]["FACT-PAGARE"].trim()
            this.SER110C.VALORPAGARE = this.SER110C.PACIENTES[0]["VALOR-PAGARE"].trim()
            this.SER110C.FECHANOTAPACIW = this.SER110C.PACIENTES[0]["FECHA-NOTA"].trim()
            this.SER110C.OBSERVNOTAPACIW = this.SER110C.PACIENTES[0]["OBSERV-NOTA"].trim()
            this.SER110C.OPEROBSERNOTAPACIW = this.SER110C.PACIENTES[0]["OPER-OBSE-NOTA"]
            this.SER110C.FACTNOTAPACIW = this.SER110C.PACIENTES[0]["FACT-NOTA"]
            this.SER110C.RESULTADOCOVIDPACIW = this.SER110C.PACIENTES[0].RESULT_COVID.trim()
            this.SER110C.EPAPACIW = this.SER110C.PACIENTES[0].EPS.trim()
            this.SER110C.FECHAMAMOGRAFIA = this.SER110C.PACIENTES[0]["ULT-MAMO"].trim()
            this.SER110C.LLAVEAUDW = this.textos.numero_SER110C;

            if (this.textos.madre_SER110C.trim() == '' && ((this.SER110C.UNIDADEDADW == 'D' || this.SER110C.UNIDADEDADW == 'M') || this.SER110C.VLREDADW < 18)) {
                CON851('EK', 'EK', null, 'error', 'error');
            }
        },
        _inicializarvariables_SER110C() {
            this.SER110C.primerapellido_SER110C.typedValue = ""
            this.SER110C.segundoapellido_SER110C.typedValue = ""
            this.SER110C.primernombre_SER110C.typedValue = ""
            this.SER110C.segundonombre_SER110C.typedValue = ""
            this.textos.Bloqhc_SER110C = ""
            this.textos.victimac_SER110C = ""
            this.textos.proespecial_SER110C = ""
            this.textos.altocosto_SER110C = ""
            this.textos.cronica_SER110C = ""
            this.textos.pacitutela_SER110C = ""
            this.textos.policonsul_SER110C = ""
            this.textos.restric_SER110C = ""
            this.textos.consult_SER110C = ""
            this.textos.odont_SER110C = ""
            this.textos.pyp_SER110C = ""
            this.textos.lab_SER110C = ""
            this.textos.rx_SER110C = ""
            this.textos.drog_SER110C = ""
            this.textos.fisiot_SER110C = ""
            this.textos.terap_SER110C = ""
            this.textos.cirug_SER110C = ""
            this.textos.estanc_SER110C = ""
            this.textos.vcm_SER110C = ""
            this.textos.pagare_SER110C = ""
            this.SER110C.telefono1Mask_SER110C.typedValue = ""
            this.SER110C.telefono2Mask_SER110C.typedValue = ""
            this.SER110C.fechaafilMask_SER110C.typedValue = ""
            this.SER110C.fechavenceMask_SER110C.typedValue = ""
            this.textos.identif_SER110C = ""
            this.textos.lugar_SER110C = ""
            this.textos.anonac_SER110C = ""
            this.textos.mesnac_SER110C = ""
            this.textos.dianac_SER110C = ""
            this.textos.edad_SER110C = ""
            this.textos.gruposang_SER110C = ""
            this.textos.rh_SER110C = ""
            this.textos.sexo_SER110C = ""
            this.textos.civil_SER110C = ""
            this.textos.estudio_SER110C = ""
            this.textos.zona_SER110C = ""
            this.textos.correo2_SER110C = ""
            this.textos.padre_SER110C = ""
            this.textos.madre_SER110C = ""
            this.textos.ciudad_SER110C = ""
            this.textos.ciudadd_SER110C = ""
            this.textos.pais_SER110C = ""
            this.textos.paisd_SER110C = ""
            this.textos.barrio_SER110C = ""
            this.textos.descripbarrio_SER110C = ""
            this.textos.nivel_SER110C = ""
            this.textos.direccion_SER110C = ""
            this.textos.ocupacion_SER110C = ""
            this.textos.ocupaciond_SER110C = ""
            this.textos.regimen_SER110C = ""
            this.textos.colegio_SER110C = ""
            this.textos.colegiod_SER110C = ""
            this.textos.etnia_SER110C = ""
            this.textos.comunidades_SER110C = ""
            this.textos.indigena_SER110C = ""
            this.textos.resguardos_SER110C = ""
            this.textos.tipoafil_SER110C = ""
            this.textos.portabilidad_SER110C = ""
            this.textos.ciudadportab_SER110C = ""
            this.textos.eps_SER110C = ""
            this.textos.epsd_SER110C = ""
            this.textos.contrato_SER110C = ""
            this.textos.ficha_SER110C = ""
            this.textos.carnet_SER110C = ""
            this.textos.fechademan_SER110C = ""
            this.textos.demandaindu_SER110C = ""
            this.textos.codant_SER110C = ""
            this.textos.cotizante_SER110C = ""
            this.textos.cotizanted_SER110C = ""
            this.textos.parentezco_SER110C = ""
            this.textos.empresalab_SER110C = ""
            this.textos.fechamatr_SER110C = ""
            this.textos.matr_SER110C = ""
            this.textos.fechaecono_SER110C = ""
            this.textos.econo_SER110C = ""
            this.textos.patologiacronica_SER110C = ""
            this.textos.clasif_SER110C = ""
            this.textos.clasifd_SER110C = ""
            this.textos.mamografia_SER110C = ""
            this.textos.basedatos_SER110C = ""
            this.textos.observaciones_SER110C = ""
            this.textos.discapacidad_SER110C = ""
            this.textos.entidad_SER110C = ""
            this.textos.entidadd_SER110C = ""
            this.textos.fechasistd_SER110C = ""
            this.textos.medicofam_SER110C = ""
            this.textos.medicofamd_SER110C = ""
            this.textos.altoriesgo_SER110C = ""
            this.textos.opercreado_SER110C = ""
            this.textos.fechacreado_SER110C = ""
            this.textos.hrcreado_SER110C = ""
            this.textos.modificado_SER110C = ""
            this.textos.fechamodif_SER110C = ""
            this.textos.hrmodif_SER110C = ""
        },

        /////////////////DIFERENTESCONSULTAS//////////////
        _escape_SER110C() {
            this.$emit("callback_esc");
        },
        _terminar_SER110C() {
            this.$emit("callback");
        },
        _cambioEvento_SER110C(e) {
            _fin_validar_form();
            let funcion = e.srcElement.getAttribute("data-validar");
            this[funcion]();
        },
        _mascarascajas_SER110C() {
            console.log("MASCARA CAJAS");
            this.SER110C.primerapellido_SER110C = IMask($('#apellido1_SER110C')[0], {
                mask: 'aaaaaaaaaaaaaaa',
                prepare: function (str) {
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toUpperCase();  // Don't do it
                }
            })
            this.SER110C.segundoapellido_SER110C = IMask($('#apellido2_SER110C')[0], {
                mask: 'aaaaaaaaaaaaaaa',
                prepare: function (str) {
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toUpperCase();  // Don't do it
                }
            })
            this.SER110C.primernombre_SER110C = IMask($('#nombre1_SER110C')[0], {
                mask: 'aaaaaaaaaaaa',
                prepare: function (str) {
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toUpperCase();  // Don't do it
                }
            })
            this.SER110C.segundonombre_SER110C = IMask($('#nombre2_SER110C')[0], {
                mask: 'aaaaaaaaaaaa',
                prepare: function (str) {
                    return str.toUpperCase();
                },
                commit: function (value, masked) {
                    masked._value = value.toUpperCase();  // Don't do it
                }
            })
            this.SER110C.telefono1Mask_SER110C = IMask($('#tel1_SER110C')[0], { mask: Number, min: 0, max: 999999999999 });
            this.SER110C.telefono2Mask_SER110C = IMask($('#tel2_SER110C')[0], { mask: Number, min: 0, max: 999999999999 });
            this.SER110C.valorpagareMask_SER110C = IMask($('#valor_SER110C')[0], { mask: Number, min: 0, max: 999999999999 });
            this.SER110C.anocontab = parseInt(`20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`);
            this.SER110C.fechaafilMask_SER110C = IMask($("#fechaafil_SER110C")[0], {
                mask: Date,
                pattern: 'Y-m-d',
                lazy: true,
                blocks: {
                    Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '1890', to: this.SER110C.anocontab, maxLength: 4 },
                    m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
                    d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
                },
                format: function (date) {
                    return moment(date).format("YYYY-MM-DD");
                },
                parse: function (str) {
                    var fecha = moment(str).format('YYYY-MM-DD');
                    if (fecha == "Invalid date") return "0000/00/00";
                    return str;
                }
            });

            this.SER110C.fechavenceMask_SER110C = IMask($("#fechavence_SER110C")[0], {
                mask: Date,
                pattern: 'Y-m-d',
                lazy: true,
                blocks: {
                    Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '1890', to: this.SER110C.anocontab, maxLength: 4 },
                    m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
                    d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
                },
                format: function (date) {
                    return moment(date).format("YYYY-MM-DD");
                },
                parse: function (str) {
                    var fecha = moment(str).format('YYYY-MM-DD');
                    if (fecha == "Invalid date") return "0000/00/00";
                    return str;
                }
            });
        },
        _evaluarcambiosbasedatos_SER110C(callback) {
            let FECHASISTEMA = moment().format('YYMMDD');
            var SER810K = [];
            let URL = get_url("APP/SALUD/SER810K.DLL");
            postData({
                datosh: datosEnvio() + this.textos.numero_SER110C + '|' + FECHASISTEMA.substring(0, 2) + '|' + FECHASISTEMA.substring(2, 4) + '|'
            }, URL)
                .then(data => {
                    SER810K = data.BASEDATOS;
                    SER810K.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA DE CAMBIOS',
                        columnas: ["FECHA", "HORA", "OPER", "CAMPO", "ANTERIOR", "ACTUAL"],
                        data: SER810K,
                        callback_esc: () => {
                            callback();
                        },
                        callback: data => {
                            callback();
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                    esccallback();
                });
        },
        _datoscompletfamiliar_SER110C(callback) {
            var $_FAMILIAR = [];
            let URL = get_url("APP/SALUD/SER810F.DLL");
            postData({
                datosh: datosEnvio() + this.textos.numero_SER110C + '|' + localStorage.Usuario + '|'
            }, URL)
                .then(data => {
                    $_FAMILIAR = data.FAMILIAR;
                    $_FAMILIAR.pop();
                    _ventanaDatos({
                        titulo: "VENTANA COTIZANTE ",
                        columnas: ["PACIENTE", "CEDULA", "EPS", "NACIM", "PARENT", "ESTADO"],
                        data: $_FAMILIAR,
                        ancho: '85%',
                        callback_esc: () => {
                            callback();
                        },
                        callback: data => {
                            callback();
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                    callback();
                });
        },
        _ventanapacientedoc_SER110C() {
            setTimeout(() => {
                _consultabase09_SALUD(this._validarregbase09_SER110C, this._evaluarnumero_SER110C)
            }, 300);
        },
        _validarregbase09_SER110C(data) {
            this.textos.numero_SER110C = data.CODBASE09
            this.textos.novedad_SER110C = '8- Cambio'
            this._validarpaciente_SER110C()
        },

        /////////////////VENTANA F8///////////////////////
        _f8identificacion_SER110C(data) {
            console.log('F8 VENTANA', data)
            parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
                callback: (data) => {
                    $_this.textos.numero_SER110C = data.COD
                    _enterInput('.identificacion_SER110C');
                },
                cancel: () => {
                    _enterInput('.identificacion_SER110C');
                }
            };
            F8LITE(parametros);
        },
        _f8lugar_SER110C() {
            _ventanaDatos({
                titulo: "VENTANA DE CONSULTA DE CIUDADES",
                columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
                data: $_this.SER110C.CIUDAD,
                callback_esc: function () {
                    $(".lugar_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.lugar_SER110C = data.COD.trim();
                    _enterInput('.lugar_SER110C');
                }
            });
        },
        _f8ciudad_SER110C() {

            _ventanaDatos({
                titulo: "VENTANA DE CONSULTA DE CIUDADES",
                columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
                data: $_this.SER110C.CIUDAD,
                callback_esc: function () {
                    $(".ciudad_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.ciudad_SER110C = data.COD.trim();
                    _enterInput('.ciudad_SER110C');
                }
            });
        },
        _f8pais_SER110C() {

            _ventanaDatos({
                titulo: 'VENTANA PAIS RIPS',
                columnas: ["CODIGO", "DESCRIP"],
                data: $_this.SER110C.PAISES,
                callback_esc: function () {
                    $(".pais_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.pais_SER110C = data.CODIGO;
                    _enterInput('.pais_SER110C');
                }
            });
        },

        _f8barrios_SER110C() {

            _ventanaDatos({
                titulo: "VENTANA DE BARRIOS Y VEREDAS",
                columnas: ["LLAVE", "NOMBRE", "COMUNA", "ZONA"],
                data: $_this.SER110C.BARRIOS,
                callback_esc: function () {
                    $(".barrio_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.barrio_SER110C = data.LLAVE.trim();
                    _enterInput('.barrio_SER110C');
                }
            });
        },

        _f8ocupacion_SER110C() {

            _ventanaDatos({
                titulo: "VENTANA DE OCUPACIONES",
                columnas: ["CODOCU", "NOMBREOCU"],
                data: $_this.SER110C.OCUPACIONES,
                ancho: '90%',
                callback_esc: function () {
                    $(".ocupacion_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.ocupacion_SER110C = data.CODOCU.trim();
                    _enterInput('.ocupacion_SER110C');
                }
            });
        },
        _f8colegio_SER110C() {

            _ventanaDatos({
                titulo: 'VENTANA DE INSTITUCIONES',
                columnas: ["TIPO", "CIUDAD", "SECU", "DESCRIP"],
                data: $_this.SER110C.COLEGIOS,
                callback_esc: function () {
                    $(".colegio_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.colegio_SER110C = data.TIPO.trim() + data.CIUDAD.trim() + data.SECU.trim();
                    _enterInput('.colegio_SER110C');
                }
            });
        },
        _f8portabilidad_SER110C() {

            _ventanaDatos({
                titulo: "VENTANA DE CONSULTA DE CIUDADES",
                columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
                data: $_this.SER110C.CIUDAD,
                callback_esc: function () {
                    $(".portabilidad_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.ciudadportab_SER110C = data.COD.trim();
                    _enterInput('.portabilidad_SER110C');
                }
            });
        },
        _f8eps_SER110C() {

            _ventanaDatos({
                titulo: 'VENTANA DE ENTIDADES',
                columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
                data: $_this.SER110C.ENTIDADES,
                ancho: '90%',
                callback_esc: function () {
                    $(".eps_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.eps_SER110C = data["COD-ENT"];
                    _enterInput('.eps_SER110C');
                }
            });
        },
        _f8cotizante_SER110C() {

            parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
                callback: (data) => {
                    $_this.textos.cotizante_SER110C = data.COD
                    _enterInput('.cotizante_SER110C');
                },
                cancel: () => {
                    _enterInput('.cotizante_SER110C');
                }
            };
            F8LITE(parametros);
        },
        _f8patologias_SER110C() {

            _ventanaDatos({
                titulo: 'VENTANA DE PATOLOGIAS CRONICAS',
                columnas: ["COD", "DESCRIP"],
                data: $_this.SER110C.PATOLOGIAS,
                callback_esc: function () {
                    $(".patologiacronica_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.patologiacronica_SER110C = data.COD.trim()
                    _enterInput('.patologiacronica_SER110C');
                }
            });
        },
        _f8clasificacion_SER110C() {

            _ventanaDatos({
                titulo: 'VENTANA DE CLASIFICACION PACI',
                columnas: ["COD", "NOMBRE"],
                data: $_this.SER110C.CLASIFICACION,
                callback_esc: function () {
                    $(".clasif_SER110C").focus();
                },
                callback: function (data) {
                    $_this.textos.clasif_SER110C = data.COD.trim()
                    _enterInput('.clasif_SER110C');
                }
            });
        },
        _f8terceros_SER110C() {

            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.textos.entidad_SER110C = data.COD.trim();
                    _enterInput('.entidad_SER110C');
                },
                cancel: () => {
                    _enterInput('.entidad_SER110C');
                }
            };
            F8LITE(parametros);
        },
        _f8profesionales_SER110C() {

            _ventanaDatos({
                titulo: 'VENTANA DE PROFESIONALES',
                data: $_this.SER110C.PROFESIONALES,
                columnas: ["NOMBRE", "IDENTIFICACION", "ATIENDE_PROF", "LU", "MA", "MI", "JU", "VI", "SA"],
                callback_esc: function () {
                    $(".medicofam_SER110Cc").focus();
                },
                callback: function (data) {
                    $_this.textos.medicofam_SER110C = data.IDENTIFICACION.trim();
                    _enterInput('.medicofam_SER110C');
                }
            });
        },

    },

    template: `<div class="col-md-12" style= "overflow-y: scroll; height: 650px" > 
        <form class="form-horizontal">
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-2 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-12 col-xs-12">Novedad</label>
                        <div class="input-group col-md-6 col-sm-12 col-xs-12">
                            <input v-model='textos.novedad_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-7 col-xs-7">
                <div class="inline-inputs">
                    <label class="col-md-5 col-sm-9 col-xs-12">Identificación</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="NUMERO_SER110C">
                            <input v-model='textos.numero_SER110C' type="text" v-on:keyup.119='_f8identificacion_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 identificacion_SER110C" 
                                maxlength="15" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8identificacion_SER110C' disabled="disabled" 
                        class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1">
                            <i class="icon-magnifier"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-2 col-sm-5 col-xs-5 hidden" id="BLOQHC_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-9 col-xs-12">Bloq Hc</label>
                        <div class="input-group col-md-9 col-sm-4 col-xs-12">
                            <input v-model='textos.Bloqhc_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-9 col-xs-12">Tipo Identif</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="IDENTIF_SER110C">
                            <input v-model='textos.identif_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" 
                                maxlength="3" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-9 col-xs-12">Lugar Exp</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id='LUGARNAM_SER110C'>
                        <input v-model='textos.lugar_SER110C' type="text" v-on:keyup.119='_f8lugar_SER110C'
                              class="form-control col-md-12 col-sm-12 col-xs-12 lugar_SER110C" 
                              maxlength="5" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8lugar_SER110C' 
                        class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                          <i class="icon-magnifier"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-3 col-sm-3 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">1er Apellido</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="APELLIDO1_SER110C">
                            <input id="apellido1_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" 
                                maxlength="15" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">2do Apellido</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="APELLIDO2_SER110C">
                            <input id="apellido2_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" 
                                maxlength="15" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">1er Nombre</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="NOMBRE1_SER110C">
                            <input id="nombre1_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" 
                                maxlength="12" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">2do Nombre</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="NOMBRE2_SER110C">
                            <input id="nombre2_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12"
                                 maxlength="12" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-3 col-sm-4 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-7 col-xs-12">F. Nacimiento</label>
                        <div class="input-group col-md-3 col-sm-4 col-xs-12" id="ANONAC_SER110C">
                            <input v-model="textos.anonac_SER110C" type="text" placeholder="AAAA"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" data-orden="1" disabled="disabled">
                        </div>
                        <div class="input-group col-md-2 col-sm-4 col-xs-12" id="MESNAC_SER110C">
                            <input v-model="textos.mesnac_SER110C" type="text" placeholder="MM"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1" disabled="disabled">
                        </div>
                        <div class="input-group col-md-2 col-sm-4 col-xs-12" id="DIANAC_SER110C">
                            <input v-model="textos.dianac_SER110C" type="text" placeholder="DD"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Edad</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="EDAD_SER110C">
                            <input v-model="textos.edad_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-3 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-5 col-xs-12">Grup Sang:</label>
                        <div class="input-group col-md-3 col-sm-3 col-xs-12" id="GRUPOSANG_SER110C">
                            <input v-model="textos.gruposang_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1" disabled="disabled">
                        </div>
                        <label class="col-md-3 col-sm-5 col-xs-12">Factor RH:</label>
                        <div class="input-group col-md-3 col-sm-3 col-xs-9" id="RH_SER110C">
                            <input v-model="textos.rh_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Sexo</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="SEXO_SER110C">
                            <input v-model="textos.sexo_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="F/M" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-4 col-sm-5 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Estado Civil</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="CIVIL_SER110C">
                            <input v-model="textos.civil_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-8 col-xs-12">Nivel Estudio</label>
                        <div class="input-group col-md-7 col-sm-8 col-xs-12" id="ESTUDIO_SER110C">
                            <input v-model="textos.estudio_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-3 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-6 col-xs-12">Zona</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="ZONA_SER110C">
                            <input v-model="textos.zona_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="U/R" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-8 col-xs-8 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-6 col-sm-5 col-xs-5 hidden" id="EMAIL2_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-5 col-xs-12">Email</label>
                        <div class="input-group col-md-8 col-sm-7 col-xs-12" id="CORREO2PACI_SER110C">
                            <input v-model="textos.correo2_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="80" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6 hidden" id="PADRE_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-6 col-xs-12">Nombre Padre</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model="textos.padre_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                            maxlength="30" data-orden="1"  @keyup="event => _caracteresespeciales_SER110C(event, 'padre_SER110C')" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6 hidden" id="MADRE_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-6 col-xs-12">Nombre Madre</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model="textos.madre_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                maxlength="30" data-orden="1" @keyup="event => _caracteresespeciales_SER110C(event, 'madre_SER110C')" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-6 col-sm-7 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-5 col-xs-5">Ciudad</label>
                        <div class="input-group col-md-5 col-sm-4 col-xs-4" id="CIUDAD_SER110C">
                            <input v-model="textos.ciudad_SER110C" type="text" v-on:keyup.119='_f8ciudad_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 ciudad_SER110C" maxlength="5" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8ciudad_SER110C()' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-12 col-sm-9 col-xs-9">
                            <input v-model="textos.ciudadd_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-6 col-xs-12">Telefono 1</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="TELEFONO_SER110C">
                            <input id="tel1_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_cambioEvento_SER110C' class="btn hidden btn-default col-md-1 col-sm-1 col-xs-1" id= "VALIDARBOTOM_SER110C"
                        data-validar="_evaluartelefono1_SER110C">
                            <i class="glyphicon glyphicon-pencil" data-validar="_evaluartelefono1_SER110C"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-6 col-xs-12">Telefono 2</label>
                        <div class="input-group col-md-7 col-sm-9 col-xs-9" id="TELEFONO2_SER110C">
                            <input id="tel2_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-3 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Orig.Pais</label>
                        <div class="input-group col-md-6 col-sm-5 col-xs-12" id="PAIS_SER110C">
                            <input v-model="textos.pais_SER110C" type="text" v-on:keyup.119='_f8pais_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 pais_SER110C" maxlength="3" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8pais_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-12 col-sm-9 col-xs-9">
                            <input v-model="textos.paisd_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-4 col-xs-12">Barrio</label>
                        <div class="input-group col-md-6 col-sm-12 col-xs-12" id="BARRIOS_SER110C">
                            <input v-model="textos.barrio_SER110C" type="text" v-on:keyup.119='_f8barrios_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 barrio_SER110C" maxlength="11" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8barrios_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input v-model="textos.descripbarrio_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Nivel</label>
                        <div class="input-group col-md-7 col-sm-7 col-xs-12" id="NIVEL_SER110C">
                            <input v-model="textos.nivel_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Copago</label>
                        <div class="input-group col-md-7 col-sm-5 col-xs-12" id="COPAGO_SER110C">
                            <input v-model='textos.copago_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                        <button type="button" @click='_cambioEvento_SER110C' class="btn hidden btn-default col-md-1 col-sm-1 col-xs-1" id= "VALIDARBOTOM4_SER110C"
                        data-validar="_evaluarcopago_SER110C">
                            <i class="glyphicon glyphicon-pencil" data-validar="_evaluarcopago_SER110C"></i>
                        </button>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-5 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-4 col-xs-12">Direccion</label>
                        <div class="input-group col-md-9 col-sm-12 col-xs-12" id="DIRECCION_SER110C">
                            <input v-model="textos.direccion_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                            maxlength="30" data-orden="1" @keyup="event => _caracteresespeciales_SER110C(event, 'direccion_SER110C')" disabled="disabled">
                        </div>
                        <button type="button" @click='_cambioEvento_SER110C' class="btn hidden btn-default col-md-1 col-sm-1 col-xs-1" id= "VALIDARBOTOM1_SER110C"
                        data-validar="_evaluardireccion_SER110C">
                            <i class="glyphicon glyphicon-pencil" data-validar="_evaluardireccion_SER110C"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-4 col-sm-7 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-5">Ocupacion</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-4" id="OCUPACION_SER110C">
                            <input v-model="textos.ocupacion_SER110C" type="text" v-on:keyup.119='_f8ocupacion_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 ocupacion_SER110C" maxlength="4" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8ocupacion_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-9 col-sm-9 col-xs-9">
                            <input v-model="textos.ocupaciond_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Regimen</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="REGIMEN_SER110C">
                            <input v-model="textos.regimen_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_cambioEvento_SER110C' class="btn hidden btn-default col-md-1 col-sm-1 col-xs-1" id= "VALIDARBOTOM2_SER110C"
                        data-validar="_evaluarregimen_SER110C">
                            <i class="glyphicon glyphicon-pencil" data-validar="_evaluarregimen_SER110C"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-6">Cod Colegio</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-2" id="COLEGIO_SER110C">
                            <input v-model="textos.colegio_SER110C" type="text" v-on:keyup.119='_f8colegio_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 colegio_SER110C" maxlength="12" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8colegio_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-12 col-sm-9 col-xs-9">
                            <input v-model="textos.colegiod_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-3">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-4 col-xs-12">Etnia</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12" id="ETNIA_SER110C">
                            <input v-model="textos.etnia_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-1 col-sm-2 col-xs-3">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-4 col-xs-12">I:</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model="textos.indigena_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-1 col-sm-2 col-xs-3">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-4 col-xs-12">C:</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model="textos.comunidades_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-1 col-sm-2 col-xs-3">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-4 col-xs-12">R: </label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12">
                            <input v-model="textos.resguardos_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-2 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-4 col-xs-12">T. Afiliado</label>
                        <div class="input-group col-md-7 col-sm-8 col-xs-12" id="TIPOAFIL_SER110C">
                            <input v-model="textos.tipoafil_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-4 col-sm-4 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Portabilidad</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="PORTABILI_SER110C">
                            <input v-model="textos.portabilidad_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                        <div class="input-group col-md-12 col-sm-4 col-xs-12" id="CIUDADPORTA_SER110C">
                            <input v-model="textos.ciudadportab_SER110C" type="text" v-on:keyup.119='_f8portabilidad_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 portabilidad_SER110C" maxlength="5" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8portabilidad_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-5 col-sm-8 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-6 col-xs-6">Entidad Afil</label>
                        <div class="input-group col-md-7 col-sm-3 col-xs-6" id="AFILIADO_SER110C">
                            <input v-model="textos.eps_SER110C" type="text" v-on:keyup.119='_f8eps_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 eps_SER110C" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_cambioEvento_SER110C' class="btn hidden btn-default col-md-1 col-sm-1 col-xs-1" id= "VALIDARBOTOM3_SER110C"
                        data-validar="_evaluarentidadafiliada_SER110C">
                            <i class="glyphicon glyphicon-pencil" data-validar="_evaluarentidadafiliada_SER110C"></i>
                        </button>
                        <button type="button" @click='_f8eps_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input v-model="textos.epsd_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Contrato</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="CONTRATO_SER110C">
                            <input v-model="textos.contrato_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Fecha Afilia</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="FECHAAFIL_SER110C">
                            <input id="fechaafil_SER110C"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1"
                                placeholder="AAAA/MM/DD" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Ficha</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="FICHA_SER110C">
                            <input v-model="textos.ficha_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">No. Carnet</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="CARNET_SER110C">
                            <input v-model="textos.carnet_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="15" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Fecha Vence</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="FECHAVENCE_SER110C">
                            <input id="fechavence_SER110C"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1"
                                placeholder="AAAA-MM-DD" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-9 col-xs-12">Fecha Demand Ind</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="FECHADEMAN_SER110C">
                            <input v-model="textos.fechademan_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1"
                                placeholder="AAAA-MM-DD" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Demanda Ind</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="DEMANDAINDU_SER110C">
                            <input v-model="textos.demandaindu_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-12 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Codigo Ant</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="CODANT_SER110C">
                            <input v-model="textos.codant_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-7 col-sm-7 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-6 col-xs-6">Id Cotizante</label>
                        <div class="input-group col-md-7 col-sm-5 col-xs-5" id="COTIZANTE_SER110C">
                            <input v-model="textos.cotizante_SER110C" type="text" v-on:keyup.119='_f8cotizante_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 cotizante_SER110C" maxlength="15" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8cotizante_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-12 col-sm-12 col-xs-12">
                            <input v-model="textos.cotizanted_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Parentezco</label>
                        <div class="input-group col-md-7 col-sm-4 col-xs-12" id="PARENTEZCO_SER110C">
                            <input v-model="textos.parentezco_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="15" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-6 col-sm-7 col-xs-7">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-3 col-xs-12">Empresa Laboral</label>
                        <div class="input-group col-md-9 col-sm-9 col-xs-12" id="EMPRESALAB_SER110C">
                            <input v-model="textos.empresalab_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" 
                                maxlength="30" data-orden="1" @keyup="event => _caracteresespeciales_SER110C(event, 'empresalab_SER110C')" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Fecha R. Matr:</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="FECHAMATR_SER110C">
                            <input v-model="textos.fechamatr_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" data-orden="1" disabled="disabled">
                        </div>
                        <div class="input-group col-md-2 col-sm-2 col-xs-12" id="FECHAMATR2_SER110C">
                            <input v-model="textos.matr_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="2" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-5 col-sm-5 col-xs-12">Fecha D. Econ:</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="FECHAECONO_SER110C">
                            <input v-model="textos.fechaecono_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" data-orden="1" disabled="disabled">
                        </div>
                        <div class="input-group col-md-2 col-sm-2 col-xs-12" id="NUMERECONO_SER110C">
                            <input v-model="textos.econo_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="2" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-8 col-xs-8 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Victima Conflicto?</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="EVAVICTIMAC_SER110C">
                            <input v-model='textos.victimac_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Programa Especial?</label>
                        <div class="input-group col-md-6 col-sm-3 col-xs-12" id="EVAPROESPECIAL_SER110C">
                            <input v-model='textos.proespecial_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Paciente Alto Costo?</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="EVAALTOCOSTO_SER110C">
                            <input v-model='textos.altocosto_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Paciente Cronico?</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="EVACRONIC_SER110C">
                            <input v-model='textos.cronica_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="PATOLOGIA_SER110C">
                            <input v-model="textos.patologiacronica_SER110C" type="text" v-on:keyup.119='_f8patologias_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 patologiacronica_SER110C" 
                                maxlength="3" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8patologias_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-8 col-xs-8 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Paciente tutela?</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="EVAPACITUTELA_SER110C">
                            <input v-model='textos.pacitutela_SER110C' type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Clasificacion:</label>
                        <div class="input-group col-md-3 col-sm-3 col-xs-12" id="CLASIF_SER110C">
                            <input v-model="textos.clasif_SER110C" type="text" v-on:keyup.119='_f8clasificacion_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 clasif_SER110C" 
                                maxlength="2" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8clasificacion_SER110C' class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-3 col-sm-3 col-xs-12" id="DESCRIPCLASIF_SER110C">
                            <input v-model="textos.clasifd_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" 
                                maxlength="6" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Ultima Mamografia</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="MAMOGRAFIA1_SER110C">
                            <input v-model="textos.mamografiaano_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" data-orden="1"
                                placeholder="AAAA" disabled="disabled"> 
                        </div>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="MAMOGRAFIA2_SER110C">
                            <input v-model="textos.mamografiames_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1"
                                placeholder="MM" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Pte Policonsultante?</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="EVAPOLICONSUL_SER110C">
                            <input v-model="textos.policonsul_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-8 col-sm-8 col-xs-12">Cand PYP</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="EVACANDPYP_SER110C">
                            <input v-model="textos.candpyp_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-8 col-xs-12">Finalidad</label>
                        <div class="input-group col-md-8 col-sm-4 col-xs-12" id="EVAFINALIDAD_SER110C">
                            <input v-model="textos.finalidad_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <label> PACIENTE TIENE DERECHO A: </label>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2  no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Restricc?</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVARESTRIC_SER110C">
                            <input v-model="textos.restric_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Consulta</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVACONSULT_SER110C">
                            <input v-model="textos.consult_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Odont</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVAODONT_SER110C">
                            <input v-model="textos.odont_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">PYP</label>
                        <div class="input-group col-md-6 col-sm-6 col-xs-12" id="EVAPYP_SER110C">
                            <input v-model="textos.pyp_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Laborat</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVALAB_SER110C">
                            <input v-model="textos.lab_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">RX</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVARX_SER110C">
                            <input v-model="textos.rx_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2  no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Drogue</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVADROG_SER110C">
                            <input v-model="textos.drog_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Fisiote</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVAFISIOT_SER110C">
                            <input v-model="textos.fisiot_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-6">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Otra Terap</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVATERAP_SER110C">
                            <input v-model="textos.terap_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Cirugia</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVACIRUG_SER110C">
                            <input v-model="textos.cirug_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Estancia</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVAESTANC_SER110C">
                            <input v-model="textos.estanc_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">VCM</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="EVAVCM_SER110C">
                            <input v-model="textos.vcm_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                                maxlength="1" data-orden="1" placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8 col-sm-8 col-xs-8 no-padding">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-4 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Tiene Pagare</label>
                        <div class="input-group col-md-6 col-sm-6 col-xs-12" id="TIENEPAGARE_SER110C">
                            <input v-model="textos.pagare_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Factura</label>
                        <div class="input-group col-md-4 col-sm-6 col-xs-12" id="FACTURA_SER110C">
                            <input v-model="textos.prefijo_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1" disabled="disabled">
                        </div>
                        <div class="input-group col-md-8 col-sm-6 col-xs-12" id="FACTURA2_SER110C">
                            <input v-model="textos.factura_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Valor</label>
                        <div class="input-group col-md-6 col-sm-6 col-xs-12" id="VALOR_SER110C">
                            <input id="valor_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-7 col-xs-7">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-5 col-xs-12">Observaciones</label>
                        <div class="input-group col-md-8 col-sm-7 col-xs-12" id="OBSERVACIONES_SER110C">
                            <input v-model="textos.observaciones_SER110C" type="text" class="form-control col-md-12 col-sm-12 col-xs-12"
                             maxlength="20" data-orden="1" @keyup="event => _caracteresespeciales_SER110C(event, 'observaciones_SER110C')" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-4 col-sm-4 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-4 col-xs-12">Discap</label>
                        <div class="input-group col-md-8 col-sm-8 col-xs-12" id="DISCAPACIDAD_SER110C">
                            <input v-model="textos.discapacidad_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-8 col-xs-7" id="ENTIDAD_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-8">Entidad Fact</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-4">
                            <input v-model="textos.entidad_SER110C" type="text" v-on:keyup.119='_f8terceros_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 entidad_SER110C" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_cambioEvento_SER110C' class="btn hidden btn-default col-md-1 col-sm-1 col-xs-1" id= "VALIDARBOTOM5_SER110C"
                        data-validar="_evaluarnitfac_SER110C">
                            <i class="glyphicon glyphicon-pencil" data-validar="_evaluarnitfac_SER110C"></i>
                        </button>
                        <button type="button" @click='_f8terceros_SER110C' class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-11 col-sm-11 col-xs-9">
                            <input v-model="textos.entidadd_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                        <div class="input-group col-md-4 col-sm-4 col-xs-9">
                            <input v-model="textos.fechasistd_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>

                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-7 col-xs-12" id="MEDICOFAM_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-6">Medico Familiar</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-4" >
                            <input v-model="textos.medicofam_SER110C" type="text" v-on:keyup.119='_f8profesionales_SER110C'
                                class="form-control col-md-12 col-sm-12 col-xs-12 medicofam_SER110C" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                        <button type="button" @click='_f8profesionales_SER110C' class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2" disabled="disabled">
                            <i class="icon-magnifier"></i>
                        </button>
                        <div class="input-group col-md-9 col-sm-9 col-xs-9">
                            <input v-model="textos.medicofamd_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-12 col-xs-12 hidden" id="CORREO_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-6">Correo</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-4" >
                            <input v-model="textos.correo_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="60" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-4" style="padding-right: 0; padding-left: 10px;">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-6 col-sm-6 col-xs-12">Estado Base Datos</label>
                        <div class="input-group col-md-6 col-sm-6 col-xs-12" id="BASEDATOS_SER110C" disabled="disabled">
                            <input v-model="textos.basedatos_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Embarazo Alto Riesgo?</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12" id="ALGORIESGO_SER110C">
                            <input v-model="textos.altoriesgo_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-12 col-sm-12 col-xs-12 hidden" id="ANTECEND_SER110C">
                    <div class="inline-inputs">
                        <label class="col-md-7 col-sm-7 col-xs-12">Antecendentes de Cancer</label>
                        <div class="input-group col-md-5 col-sm-5 col-xs-12">
                            <input v-model="textos.antecedentes_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1"
                                placeholder="S/N" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-7 col-sm-7 col-xs-7">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-4 col-xs-4">Actual</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12">
                            <input v-model="textos.opercreado_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                        <div class="input-group col-md-6 col-sm-6 col-xs-9">
                            <input v-model="textos.fechacreado_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="8" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-3 col-xs-12">Hr</label>
                        <div class="input-group col-md-12 col-sm-12 col-xs-12" id="HR_SER110C">
                            <input v-model="textos.hrcreado_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="salto-linea"></div>
                <div class="col-md-7 col-sm-7 col-xs-7">
                    <div class="inline-inputs">
                        <label class="col-md-4 col-sm-4 col-xs-4">Modif</label>
                        <div class="input-group col-md-4 col-sm-4 col-xs-12" id="MODIF_SER110C">
                            <input v-model="textos.modificado_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1" disabled="disabled">
                        </div>
                        <div class="input-group col-md-6 col-sm-6 col-xs-9">
                            <input v-model="textos.fechamodif_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="8" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-5">
                    <div class="inline-inputs">
                        <label class="col-md-3 col-sm-3 col-xs-12">Hr</label>
                        <div class="input-group col-md-12 col-sm-12 col-xs-12" id="HR2_SER110C">
                            <input v-model="textos.hrmodif_SER110C" type="text"
                                class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1" disabled="disabled">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </div> `,
});





































