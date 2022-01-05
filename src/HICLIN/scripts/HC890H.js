$_HC890H = new Vue({
    el: '#HC890H',
    data: {
        global_COVID19: {
            consenti_acomp_covid19: '',
            contacto_covid19: '',
            disnea_covid19: '',
            fiebre_covid19: '',
            lugar_dentro_covid19: '',
            lugar_fuera_covid19: '',
            malestar_covid19: '',
            odinofagia_covid19: '',
            personal_salud_covid19: '',
            recomendacion_covid19: '',
            rinorrea_covid19: '',
            tiempo_dentro_covid19: '',
            tiempo_fuera_covid19: '',
            tos_covid19: '',
            viaje_covid19: '',
            viaje_dentro_covid19: '',
            viaje_fuera_covid19: ''
        },
        textos: {
            ciudad_dentro: '',
            pais_fuera: ''
        },
        ciudades: [],
        paises: [],
        callbackAtras: null,
        callbackSiguiente: null
    },
    created() {
        this.traerCiudades()
    },
    watch: {

    },
    methods: {
        traerCiudades() {
            var _this = this
            postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON809.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.ciudades = data.CIUDAD
                    _this.ciudades.pop()

                    for (var i in _this.ciudades) {
                        _this.ciudades[i].NOMBRE = _this.ciudades[i].NOMBRE.replace(/\�/g, "Ñ").trim()
                    }
                    _this.traerPaises()
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    _this.salir_hc002()
                });
        },
        traerPaises() {
            var _this = this
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER888.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.paises = data.PAISESRIPS
                    _this.paises.pop()

                    for (var i in _this.paises) {
                        _this.paises[i].DESCRIP = _this.paises[i].DESCRIP.replace(/\�/g, "Ñ").trim()
                    }
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    _this.salir_hc002()
                });
        },
        validarFiebre_COVID() {
            validarInputs(
                {
                    form: "#validarFiebre_COVID",
                    orden: '1'
                }, () => {
                    this.callbackAtras(this.global_COVID19)
                },
                () => {
                    this.global_COVID19.fiebre_covid19 = this.global_COVID19.fiebre_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarTos_COVID()
                }
            )
        },
        validarTos_COVID() {
            validarInputs(
                {
                    form: "#validarTos_COVID",
                    orden: '1'
                }, () => {
                    this.validarFiebre_COVID()
                },
                () => {
                    this.global_COVID19.tos_covid19 = this.global_COVID19.tos_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarDisnea_COVID()
                }
            )
        },
        validarDisnea_COVID() {
            validarInputs(
                {
                    form: "#validarDisnea_COVID",
                    orden: '1'
                }, () => {
                    this.validarTos_COVID()
                },
                () => {
                    this.global_COVID19.disnea_covid19 = this.global_COVID19.disnea_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarMalestar_COVID()
                }
            )
        },
        validarMalestar_COVID() {
            validarInputs(
                {
                    form: "#validarMalestar_COVID",
                    orden: '1'
                }, () => {
                    this.validarDisnea_COVID()
                },
                () => {
                    this.global_COVID19.malestar_covid19 = this.global_COVID19.malestar_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarRinorrea_COVID()
                }
            )
        },
        validarRinorrea_COVID() {
            validarInputs(
                {
                    form: "#validarRinorrea_COVID",
                    orden: '1'
                }, () => {
                    this.validarMalestar_COVID()
                },
                () => {
                    this.global_COVID19.rinorrea_covid19 = this.global_COVID19.rinorrea_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarOdinofagia_COVID()
                }
            )
        },
        validarOdinofagia_COVID() {
            validarInputs(
                {
                    form: "#validarOdinofagia_COVID",
                    orden: '1'
                }, () => {
                    this.validarRinorrea_COVID()
                },
                () => {
                    this.global_COVID19.odinofagia_covid19 = this.global_COVID19.odinofagia_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarViaje_COVID()
                }
            )
        },
        validarViaje_COVID() {
            validarInputs(
                {
                    form: "#validarViaje_COVID",
                    orden: '1'
                }, () => {
                    this.validarOdinofagia_COVID()
                },
                () => {
                    this.global_COVID19.viaje_covid19 = this.global_COVID19.viaje_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarContacto_COVID()
                }
            )
        },
        validarContacto_COVID() {
            validarInputs(
                {
                    form: "#validarContacto_COVID",
                    orden: '1'
                }, () => {
                    this.validarViaje_COVID()
                },
                () => {
                    this.global_COVID19.contacto_covid19 = this.global_COVID19.contacto_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarPersonalSalud_COVID()
                }
            )
        },
        validarPersonalSalud_COVID() {
            validarInputs(
                {
                    form: "#validarPersonalSalud_COVID",
                    orden: '1'
                }, () => {
                    this.validarContacto_COVID()
                },
                () => {
                    this.global_COVID19.personal_salud_covid19 = this.global_COVID19.personal_salud_covid19.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarViajeDentro_COVID()
                }
            )
        },
        validarViajeDentro_COVID() {
            validarInputs(
                {
                    form: "#validarViajeDentro_COVID",
                    orden: '1'
                }, () => {
                    this.validarPersonalSalud_COVID()
                },
                () => {
                    this.global_COVID19.viaje_dentro_covid19 = this.global_COVID19.viaje_dentro_covid19.toUpperCase().trim() != 'S' ? "N" : "S"

                    if (this.global_COVID19.viaje_dentro_covid19 == 'S') {
                        this.ventanaCiudadViajeDentro_COVID()
                    } else {
                        this.textos.ciudad_dentro = ''
                        this.global_COVID19.lugar_dentro_covid19 = ''
                        this.global_COVID19.tiempo_dentro_covid19 = ''
                        this.validarViajeFuera_COVID()
                    }
                }
            )
        },
        ventanaCiudadViajeDentro_COVID() {
            var _this = this

            _ventanaDatos({
                titulo: "Ventana ciudades",
                columnas: ["COD", "NOMBRE", "DEPART"],
                data: this.ciudades,
                ancho: '70%',
                callback_esc: () => {
                    _this.validarViajeDentro_COVID()
                },
                callback: (data) => {
                    _this.global_COVID19.lugar_dentro_covid19 = data.COD.trim()
                    _this.textos.ciudad_dentro = data.NOMBRE.trim()
                    _this.validarTiempoViajeDentro_COVID()
                }
            });
        },
        validarTiempoViajeDentro_COVID() {
            validarInputs(
                {
                    form: "#validarTiempoViajeDentro_COVID",
                    orden: '1'
                }, () => {
                    this.ventanaCiudadViajeDentro_COVID()
                },
                () => {
                    this.validarViajeFuera_COVID()
                }
            )
        },
        validarViajeFuera_COVID() {
            validarInputs(
                {
                    form: "#validarViajeFuera_COVID",
                    orden: '1'
                }, () => {
                    this.validarViajeDentro_COVID()
                },
                () => {
                    this.global_COVID19.viaje_fuera_covid19 = this.global_COVID19.viaje_fuera_covid19.toUpperCase().trim() != 'S' ? "N" : "S"

                    if (this.global_COVID19.viaje_fuera_covid19 == 'S') {
                        this.ventanaCiudadViajeFuera_COVID()
                    } else {
                        this.textos.pais_fuera = ''
                        this.global_COVID19.lugar_fuera_covid19 = ''
                        this.global_COVID19.tiempo_fuera_covid19 = ''
                        this.salir_HC890H()
                    }
                }
            )
        },
        ventanaCiudadViajeFuera_COVID() {
            var _this = this

            _ventanaDatos({
                titulo: "Ventana paises",
                columnas: ["CODIGO", "DESCRIP"],
                data: this.paises,
                ancho: '70%',
                callback_esc: () => {
                    _this.validarViajeFuera_COVID()
                },
                callback: (data) => {
                    _this.global_COVID19.lugar_fuera_covid19 = data.CODIGO.trim()
                    _this.textos.pais_fuera = data.DESCRIP.trim()
                    _this.validarTiempoViajeFuera_COVID()
                }
            });
        },
        validarTiempoViajeFuera_COVID() {
            validarInputs(
                {
                    form: "#validarTiempoViajeFuera_COVID",
                    orden: '1'
                }, () => {
                    this.ventanaCiudadViajeFuera_COVID()
                },
                () => {
                    this.salir_HC890H()
                }
            )
        },
        salir_HC890H() {
            this.callbackSiguiente(this.global_COVID19)
        }
    }
})