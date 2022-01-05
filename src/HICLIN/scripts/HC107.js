new Vue({
    el: '#HC107',
    data: {
        macros_existentes: [],
        macros_his: [],
        global_HC107: {
            DETALLE: '',
            CONTENIDO: '',
            VIAS_ACCESO: [{ VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }],
            MACROS_FORMU: [{ CODIGO: '', NOMBRE: '' }, { CODIGO: '', NOMBRE: '' }, { CODIGO: '', NOMBRE: '' }],
            ADMI_CREA: '',
            FECHA_CREA: '',
            ADMI_MODIF: '',
            FECHA_MODIF: ''
        },
        vias_existentes: [],
        tipos_macro: [
            { COD: '1', DESCRIP: 'CIRUGIAS' },
            { COD: '2', DESCRIP: 'PROCEDIMIENTOS' },
            { COD: '3', DESCRIP: 'RESULTADOS IMAGENOL' },
            { COD: '4', DESCRIP: 'ENFERMERIA' },
            { COD: '5', DESCRIP: 'MEDICINA GENERAL' },
            { COD: '6', DESCRIP: 'MEDICINA ESPECIALIZ' },
            { COD: '7', DESCRIP: 'RESUMENES HISTORIA' },
            { COD: '8', DESCRIP: 'TERAPIAS' },
            { COD: '9', DESCRIP: 'PRE-ANESTESIA' },
            { COD: 'O', DESCRIP: 'ODONTOLOGIA' },
            { COD: 'P', DESCRIP: 'PROMOCION Y PREVENC' }
        ],
        novedad: '',
        descrip_novedad: '',
        descrip_clase: '',
        llave: {
            clase: '',
            codigo: ''
        }
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');
        // loader('show')
        this.traerMacrosEvol()
    },
    watch: {

    },
    methods: {
        traerMacrosEvol() {
            var _this = this
            var URL = get_url("APP/HICLIN/HC808.DLL");
            postData({
                datosh: datosEnvio()
            }, URL)
                .then((data) => {
                    loader('hide')
                    console.log(data)
                    _this.macros_existentes = data.MACROS
                    this.traerViasAcceso()
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    _this.salir_hc107()
                });
        },
        traerViasAcceso() {
            var _this = this
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER856.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.vias_existentes = data.VIAS_ACCESO
                    _this.vias_existentes.pop()
                    _this.traerMacrosHis()
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    _this.salir_hc107()
                });
        },
        traerMacrosHis() {
            var _this = this
            postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC837.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.macros_his = data.MACROS_HIS
                    loader('hide')
                    CON850(_this.evaluarNovedad)
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    _this.salir_hc107()
                });
        },
        ventanaMacrosHis(param) {
            var _this = this
            var nombre = ''
            id = ''
            var filtrados = this.macros_his.filter(x => x.TIPO == param)

            switch (param) {
                case '1':
                    nombre = 'medicamentos'
                    id = 'drog_formu'
                    break;
                case '2':
                    nombre = 'laboratorios'
                    id = 'lab_formu'
                    break;
                case '3':
                    nombre = 'paraclinicos'
                    id = 'imag_formu'
                    break;
            }

            _ventanaDatos({
                titulo: "Macros formulación " + nombre,
                columnas: ["TIPO", "CODIGO", "NOMBRE"],
                data: filtrados,
                ancho: '70%',
                callback_esc: () => {
                    document.getElementById(id).focus()
                },
                callback: (data) => {
                    _this.global_HC107.MACROS_FORMU[parseInt(param) - 1].CODIGO = data.CODIGO.trim()
                    setTimeout(() => _enterInput('#' + id), 100)
                }
            });
        },
        ventanaViasAcceso(param) {
            var _this = this

            _ventanaDatos({
                titulo: "Ventana vias de acceso",
                columnas: ["CODIGO", "NOMBRE"],
                data: _this.vias_existentes,
                ancho: '50%',
                callback_esc: () => {
                    document.getElementById("viaAccess_" + param).focus()
                },
                callback: (data) => {
                    _this.global_HC107.VIAS_ACCESO[parseInt(param) - 1].VIA = data.CODIGO.trim()
                    setTimeout(() => _enterInput('#viaAccess_' + param), 100)
                }
            });
        },
        ventana_macros() {
            var _this = this
            var macros_filtrados = this.macros_existentes.filter(x => x.CLASE == this.llave.clase)

            _ventanaDatos({
                titulo: "Ventana macros por tipo",
                columnas: ["CLASE", "CODIGO", "DETALLE"],
                data: macros_filtrados,
                ancho: '70%',
                callback_esc: () => {
                    document.getElementById("codigo_HC107").focus()
                },
                callback: (data) => {
                    _this.llave.codigo = data.CODIGO.trim()
                    setTimeout(() => _enterInput('#codigo_HC107'), 100)
                }
            });
        },
        evaluarNovedad(novedad) {
            this.novedad = novedad.id

            switch (this.novedad) {
                case '7':
                case '8':
                case '9':
                    this.descrip_novedad = novedad.id + ' - ' + novedad.descripcion
                    this.seleccionClase()
                    break;
                case 'F':
                    this.salir_hc107()
                    break;
            }
        },
        seleccionClase() {
            var _this = this

            POPUP({
                titulo: "Tipo de macro",
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                array: this.tipos_macro,
                callback_f: () => CON850(this.evaluarNovedad),
                seleccion: this.llave.clase,
                teclaAlterna: true,
            }, function (data) {
                _this.llave.clase = data.COD
                _this.descrip_clase = data.COD + '. ' + data.DESCRIP
                _this.validarCodigo()
            })
        },
        validarCodigo() {
            validarInputs(
                {
                    form: "#ValidarCodigo_HC107",
                    orden: '1'
                },
                () => this.seleccionClase(),
                () => {

                    this.llave.codigo = this.llave.codigo.toString()

                    var busqueda = this.macros_existentes.find(x => x.CLASE.trim() == this.llave.clase && x.CODIGO.trim() == this.llave.codigo.trim())

                    if (busqueda) {

                        switch (this.novedad) {
                            case '7':
                                CON851('', 'Macro ya existe!', null, 'error', 'Error')
                                this.validarCodigo()
                                break;
                            case '8':
                            case '9':
                                loader('show')
                                this.traerMacro_completa()
                                break;
                        }
                    } else {

                        switch (this.novedad) {
                            case '7':
                                this.validarDetalle()
                                break;
                            case '8':
                            case '9':
                                CON851('', 'Macro no existe!', null, 'error', 'Error')
                                this.validarCodigo()
                                break;
                        }
                    }

                }
            )
        },
        traerMacro_completa() {
            var _this = this
            var llave = this.llave.clase + cerosIzq(this.llave.codigo, 6)
            postData({ datosh: datosEnvio() + llave + '|' }, get_url("APP/HICLIN/HC808-02.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.global_HC107 = data.MACRO_FULL[0]
                    loader('hide')
                    _this.global_HC107.DETALLE = _this.global_HC107.DETALLE.trim()
                    _this.global_HC107.CONTENIDO = _this.global_HC107.CONTENIDO.replace(/\&/g, "\n").trim()

                    for (var i in _this.global_HC107.VIAS_ACCESO) {
                        var buscar = _this.vias_existentes.find(x => x.CODIGO.trim() == _this.global_HC107.VIAS_ACCESO[i].VIA.trim())
                        if (buscar) _this.global_HC107.VIAS_ACCESO[i].DESCRIP = buscar.NOMBRE.trim()
                    }

                    for (var i in _this.global_HC107.MACROS_FORMU) {
                        var buscar = this.macros_his.find(x => parseInt(x.TIPO) == (parseInt(i) + 1) && x.CODIGO.trim() == this.global_HC107.MACROS_FORMU[i].CODIGO.trim())
                        if (buscar) _this.global_HC107.MACROS_FORMU[i].NOMBRE = buscar.NOMBRE.trim()
                    }

                    switch (_this.novedad) {
                        case '8':
                            _this.validarDetalle()
                            break;
                        case '9':
                            CON851P('54', _this.validarCodigo, _this._grabardatos_HC107)
                            break;
                    }
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    this.validarCodigo()
                });
        },
        validarDetalle() {
            var _this = this

            validarInputs(
                {
                    form: "#ValidarDetalle_HC107",
                    orden: '1'
                },
                () => CON851P('03', _this.validarDetalle, () => {
                    _this.global_HC107 = {
                        DETALLE: '',
                        CONTENIDO: '',
                        VIAS_ACCESO: [{ VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }, { VIA: '', DESCRIP: '' }],
                        MACROS_FORMU: [{ COD: '', DESCRIP: '' }, { COD: '', DESCRIP: '' }, { COD: '', DESCRIP: '' }],
                        ADMI_CREA: '',
                        FECHA_CREA: '',
                        ADMI_MODIF: '',
                        FECHA_MODIF: ''
                    }
                    _this.validarCodigo()
                }),
                () => _this.validarContenido()
            )
        },
        validarContenido() {
            var _this = this

            validarInputs(
                {
                    form: "#validarContenido_HC107",
                    orden: '1'
                },
                () => _this.validarDetalle(),
                () => {
                    this.global_HC107.CONTENIDO = this.global_HC107.CONTENIDO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

                    this.validarVias_acceso(1)
                }
            )
        },
        validarVias_acceso(a) {
            validarInputs(
                {
                    form: "#validarViaAcceso_" + a + "_HC107",
                    orden: '1'
                },
                () => {
                    if (a == 1) {
                        this.validarContenido()
                    } else {
                        this.validarVias_acceso(parseInt(a) - 1)
                    }
                },
                () => {
                    var pos = parseInt(a) - 1

                    var busqueda = this.vias_existentes.find(x => x.CODIGO.trim() == this.global_HC107.VIAS_ACCESO[pos].VIA.trim())

                    if (this.global_HC107.VIAS_ACCESO[pos].VIA.trim() == '' || busqueda) {

                        if (busqueda) this.global_HC107.VIAS_ACCESO[pos].DESCRIP = busqueda.NOMBRE.trim()

                        if (a == 6) {
                            this.validarMacrosFormu(1)
                        } else {
                            this.validarVias_acceso(parseInt(a) + 1)
                        }

                    } else {
                        CON851('', 'Via no existe!', null, 'error', 'Error')
                        this.validarVias_acceso(a)
                    }

                }
            )
        },
        validarMacrosFormu(a) {
            validarInputs(
                {
                    form: "#validarMacrosFormu_" + a + "_HC107",
                    orden: '1'
                },
                () => {
                    if (a == 1) {
                        this.validarVias_acceso(6)
                    } else {
                        this.validarMacrosFormu(parseInt(a) - 1)
                    }
                },
                () => {
                    var pos = parseInt(a) - 1

                    var busqueda = this.macros_his.find(x => parseInt(x.TIPO) == a && x.CODIGO.trim() == this.global_HC107.MACROS_FORMU[pos].CODIGO.trim())

                    console.log(this.global_HC107.MACROS_FORMU[pos].CODIGO)
                    if (this.global_HC107.MACROS_FORMU[pos].CODIGO.trim() == '' || busqueda) {

                        if (busqueda) this.global_HC107.MACROS_FORMU[pos].NOMBRE = busqueda.NOMBRE.trim()

                        if (a == 3) {
                            this._grabardatos_HC107()
                        } else {
                            this.validarMacrosFormu(parseInt(a) + 1)
                        }

                    } else {
                        CON851('', 'Macro no existe!', null, 'error', 'Error')
                        this.validarMacrosFormu(a)
                    }

                }
            )
        },
        _grabardatos_HC107() {
            var _this = this

            var data = {};

            var datos_envio = datosEnvio()
            datos_envio += this.novedad
            datos_envio += '|'
            datos_envio += this.llave.clase + cerosIzq(this.llave.codigo, 6)
            datos_envio += '|'
            datos_envio += espaciosDer(this.global_HC107.DETALLE, 40)
            datos_envio += '|'
            datos_envio += localStorage.Usuario
            datos_envio += '|'
            datos_envio += moment().format('YYYYMMDD')
            datos_envio += '|'

            data['datosh'] = datos_envio

            var tabla_vias = ''
            tabla_vias += espaciosDer(this.global_HC107.VIAS_ACCESO[0].VIA, 2)
            tabla_vias += '|'
            tabla_vias += espaciosDer(this.global_HC107.VIAS_ACCESO[1].VIA, 2)
            tabla_vias += '|'
            tabla_vias += espaciosDer(this.global_HC107.VIAS_ACCESO[2].VIA, 2)
            tabla_vias += '|'
            tabla_vias += espaciosDer(this.global_HC107.VIAS_ACCESO[3].VIA, 2)
            tabla_vias += '|'
            tabla_vias += espaciosDer(this.global_HC107.VIAS_ACCESO[4].VIA, 2)
            tabla_vias += '|'
            tabla_vias += espaciosDer(this.global_HC107.VIAS_ACCESO[5].VIA, 2)
            tabla_vias += '|'

            data['vias'] = tabla_vias

            var tabla_formu = ''
            tabla_formu += espaciosDer(this.global_HC107.MACROS_FORMU[0].CODIGO, 2)
            tabla_formu += '|'
            tabla_formu += espaciosDer(this.global_HC107.MACROS_FORMU[1].CODIGO, 2)
            tabla_formu += '|'
            tabla_formu += espaciosDer(this.global_HC107.MACROS_FORMU[2].CODIGO, 2)
            tabla_formu += '|'

            data['macros_formu'] = tabla_formu

            var contenido = JSON.parse(JSON.stringify(this.global_HC107.CONTENIDO.replace(/(\r\n|\n|\r)/gm, "&")))

            var posicion = 0
            var contadorLin = 0
            var contadorTotal = 0
            var linea = ''
            var maximo = 90

            contenido.split('').forEach(function (item, i) {
                contadorTotal = i + 1
                contadorLin = contadorLin + 1

                switch (item) {
                    case 'á':
                    case 'é':
                    case 'í':
                    case 'ó':
                    case 'ú':
                    case 'Á':
                    case 'É':
                    case 'Í':
                    case 'Ó':
                    case 'Ú':
                    case 'ñ':
                    case 'Ñ':
                    case '!':
                    case '"':
                    case '#':
                    case '$':
                    case '%':
                    case '/':
                    case '(':
                    case ')':
                    case '=':
                    case '?':
                    case '*':
                    case '+':
                    case '-':
                    case '@':
                    case '>':
                    case '<':
                        maximo = maximo + 1
                        break;
                }
                linea += item

                if (contadorLin == maximo || contenido.length == contadorTotal) {
                    posicion = posicion + 1

                    data["CON-" + posicion.toString().padStart(3, "0")] = linea
                    contadorLin = 0
                    linea = ''
                    maximo = 90
                }
            })

            console.log(data)
            postData(data, get_url("APP/HICLIN/HC107.DLL"))
                .then((data) => {
                    console.log(data)
                    var mensaje
                    switch (_this.novedad) {
                        case '7': mensaje = 'Creado correctamente'
                            break;
                        case '8': mensaje = 'Modificado correctamente'
                            break;
                        case '9': mensaje = 'Eliminado correctamente'
                            break;
                    }
                    CON851('', mensaje, null, 'success', 'Exitoso');
                    _this.salir_hc107()
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    this.salir_hc107()
                });
        },
        salir_hc107() {
            if (localStorage.Modulo == 'HIC') {
                _regresar_menuhis()
            } else {
                _inputControl('disabled');
                _inputControl('reset');
                _toggleNav()
            }
        }
    }
})