new Vue({
    el: '#HC106',
    data: {
        global_HC106: {
            CODIGO: '',
            TIPO: '',
            DESCRIP: '',
            TABLA: []
        },
        tabla: {
            ITEM: '',
            CODIGO: ''
        },
        tipos_macro: [
            { COD: '1', DESCRIP: 'FARMACO' },
            { COD: '2', DESCRIP: 'LABORATORIO' },
            { COD: '3', DESCRIP: 'IMAGENOLOGIA' }
        ],
        macrosFormu: [],
        farmacos: [],
        laboratorios: [],
        imagenologia: [],
        novedad: '',
        llave: {
            tipo: '',
            cod: ''
        },
        textos: {
            descrip_novedad: '',
            tipo_macro: ''
        }
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');

        nombreOpcion('D,6 - Actualizar Macros Formulación')

        loader('show')
        this.traerFarmacos()
    },
    watch: {

    },
    methods: {
        traerFarmacos() {
            var _this = this

            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER809.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.farmacos = data.FARMACOS
                    _this.farmacos.pop()

                    _this.traerLaboratorios()
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    CON851('', 'error consultando farmacos', null, 'error', 'Error')
                    _this.salir_HC106()
                })
        },
        traerLaboratorios() {
            var _this = this

            postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC802.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.laboratorios = data.FORLAB

                    _this.traerMacrosFormu()
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    CON851('', 'error consultando laboratorios', null, 'error', 'Error')
                    _this.salir_HC106()
                });
        },
        traerMacrosFormu() {
            var _this = this

            postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC106.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.macrosFormu = data.MACROSHIC
                    _this.macrosFormu.pop()

                    _this.traerImagenologia()
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    CON851('', 'error consultando macros formulacion', null, 'error', 'Error')
                    _this.salir_HC106()
                })
        },
        traerImagenologia() {
            var _this = this

            postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC803.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.imagenologia = data.FORIMAG

                    loader('hide')

                    CON850(this.evaluarNovedad)
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    CON851('', 'error consultando imagenologia', null, 'error', 'Error')
                    _this.salir_HC106()
                });
        },
        evaluarNovedad(novedad) {
            this.novedad = novedad.id

            switch (this.novedad) {
                case '7':
                case '8':
                case '9':
                    this.textos.descrip_novedad = novedad.id + ' - ' + novedad.descripcion
                    this.seleccionTipoMacro()
                    break;
                case 'F':
                    this.salir_HC106()
                    break;
            }
        },
        seleccionTipoMacro() {
            var _this = this

            setTimeout(() => {
                POPUP({
                    titulo: "Tipo de macro",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.tipos_macro,
                    callback_f: () => CON850(this.evaluarNovedad),
                    seleccion: this.llave.tipo,
                    teclaAlterna: true,
                }, (data) => {
                    _this.llave.tipo = data.COD
                    _this.textos.tipo_macro = data.COD + '. ' + data.DESCRIP

                    _this.validarCodMacro()
                })
            }, 300)

        },
        ventana_macrosFormu() {
            var _this = this

            var titulo = ''
            var filtrados = this.macrosFormu.filter(x => x.TIPO == this.llave.tipo)

            switch (this.llave.tipo) {
                case '1':
                    titulo = 'Ventana macros tipo fármaco'
                    break;
                case '2':
                    titulo = 'Ventana macros tipo laboratorio'
                    break;
                case '3':
                    titulo = 'Ventana macros tipo imagenología'
                    break;
            }

            _ventanaDatos({
                titulo: titulo,
                columnas: ["CODIGO", "DESCRIP"],
                label: ["Codigo", "Descripcion"],
                data: filtrados,
                ancho: '75%',
                callback_esc: () => {
                    document.getElementById("codigoMacro_HC106").focus()
                },
                callback: (data) => {
                    _this.llave.cod = data.CODIGO.trim()
                    setTimeout(() => _enterInput('#codigoMacro_HC106'), 100)
                }
            })

        },
        validarCodMacro() {
            validarInputs(
                {
                    form: "#validarLlave_HC106",
                    orden: '1'
                },
                () => this.seleccionTipoMacro(),
                () => {
                    this.llave.cod = cerosIzq(this.llave.cod.trim(), 2)

                    var busquedaMacro = this.macrosFormu.find(x => x.TIPO == this.llave.tipo && x.CODIGO == this.llave.cod)
                    console.log(busquedaMacro)

                    switch (this.novedad) {
                        case '7':

                            if (!busquedaMacro) {
                                this.global_HC106.TIPO = this.llave.tipo
                                this.global_HC106.CODIGO = this.llave.cod
                                this.validarDetalle()
                            } else {
                                CON851('00', 'Macro ya existe', null, 'error', 'error')
                                this.vaciarGlobal()
                                this.validarCodMacro()
                            }

                            break
                        case '8':
                        case '9':

                            if (!busquedaMacro) {
                                CON851('01', 'Macro no existe', null, 'error', 'error')
                                this.vaciarGlobal()
                                this.validarCodMacro()
                            } else {
                                this.global_HC106 = busquedaMacro
                                this.AsignarDatos()
                            }
                            break
                    }

                }
            )
        },
        vaciarGlobal() {
            this.global_HC106 = {
                CODIGO: '',
                TIPO: '',
                DESCRIP: '',
                TABLA: []
            }

            this.tabla = {
                ITEM: '',
                CODIGO: ''
            }
        },
        AsignarDatos() {
            var filtro = []

            switch (this.global_HC106.TIPO) {
                case '1': filtro = this.farmacos
                    break;
                case '2': filtro = this.laboratorios
                    break;
                case '3': filtro = this.imagenologia
                    break;
            }

            for (var i in this.global_HC106.TABLA) {
                this.global_HC106.TABLA[i].ITEM = parseInt(this.global_HC106.TABLA[i].ITEM)
                this.global_HC106.TABLA[i].CODIGO = this.global_HC106.TABLA[i].CODIGO.trim()

                var busqueda = filtro.find(x => x.COD.trim() == this.global_HC106.TABLA[i].CODIGO)

                if (busqueda) this.global_HC106.TABLA[i].DESCRIP = busqueda.DESCRIP.trim()
                else this.global_HC106.TABLA[i].DESCRIP = 'No encontrado'
            }

            if (this.novedad == '9'){
                CON851P('Seguro que quiere eliminar macro ?', this.validarCodMacro, this._grabardatos_hc106)
            } else {
                this.validarDetalle()
            }
        },
        validarDetalle() {
            validarInputs(
                {
                    form: "#validarDetalle",
                    orden: '1'
                },
                () => {
                    CON851P('03', this.validarDetalle, () => {
                        this.vaciarGlobal()
                        this.validarCodMacro()
                    })
                },
                () => {
                    console.log(this.global_HC106)
                    this.global_HC106.DESCRIP = this.global_HC106.DESCRIP.trim()
                    this.tabla.ITEM = 1

                    this.validarItem()
                }
            )
        },
        _validarTabla_hc106(orden) {
            validarTabla(
                {
                    tabla: '#validarTabla_HC106',
                    orden: orden,
                    event_f3: this.preguntaGrabarDatos,
                    Esc: this.validarItem
                },
                this.bajarDatosTabla,
                this.validarItem,
                this.preguntaGrabarDatos
            )
        },
        bajarDatosTabla(datos) {
            this.tabla.ITEM = parseInt(datos.cells[0].textContent)
            var existe = this.global_HC106.TABLA.find(x => parseInt(x.ITEM) == this.tabla.ITEM)

            if (existe) {
                this.tabla.CODIGO = existe.CODIGO
                this.validarCodigoTabla()
            } else {
                CON851('', 'Ha ocurrido un error', null, 'error', 'error')
                this.validarItem()
            }
        },
        validarItem() {
            validarInputs(
                {
                    form: "#validarItem_HC106",
                    orden: '1',
                    event_f3: () => {
                        if (this.global_HC106.TABLA.length < 1) {
                            CON851('01', 'Tabla sin codigos', null, 'error', 'error')
                            this.validarItem()
                        } else {
                            this.tabla.ITEM = ''
                            this.tabla.CODIGO = ''
                            this._validarTabla_hc106('0')
                        }
                    }
                },
                () => this.validarDetalle(),
                () => {
                    this.tabla.ITEM = parseInt(this.tabla.ITEM)

                    if (this.tabla.ITEM > 30 || this.tabla.ITEM < 1) {
                        CON851('01', 'Item fuera de rango!', null, 'error', 'error')
                        this.validarItem()
                    } else {
                        var existe = this.global_HC106.TABLA.find(x => parseInt(x.ITEM) == this.tabla.ITEM)

                        if (existe) {
                            this.tabla.CODIGO = existe.CODIGO
                            this.validarCodigoTabla()
                        } else {
                            this.tabla.CODIGO = ''
                            this.validarCodigoTabla()
                        }
                    }
                }
            )
        },
        ventana_codigos() {
            var _this = this
            var titulo = ''

            var filtro = []

            switch (this.global_HC106.TIPO) {
                case '1':
                    filtro = this.farmacos
                    titulo = 'Ventana fármacos'
                    break;
                case '2':
                    filtro = this.laboratorios
                    titulo = 'Ventana laboratorios'
                    break;
                case '3':
                    filtro = this.imagenologia
                    titulo = 'Ventana imagenología'
                    break;
            }

            _ventanaDatos({
                titulo: titulo,
                columnas: ["COD", "DESCRIP"],
                data: filtro,
                ancho: '60%',
                callback_esc: () => {
                    document.getElementById("codTabla_HC106").focus()
                },
                callback: (data) => {
                    _this.tabla.CODIGO = data.COD
                    setTimeout(() => _enterInput('#codTabla_HC106'), 100)
                }
            });
        },
        validarCodigoTabla() {
            validarInputs(
                {
                    form: "#validarCodigo_HC106",
                    orden: '1'
                },
                () => {
                    this.tabla.CODIGO = ''
                    this.validarItem()
                },
                () => {
                    var index = this.global_HC106.TABLA.findIndex(x => parseInt(x.ITEM) == parseInt(this.tabla.ITEM))

                    if (this.tabla.CODIGO.trim() == '') {

                        if (index == -1) {
                            CON851('', 'Debe digitar un componente!', null, 'warning', 'Advertencia')
                            this.validarCodigoTabla()
                        } else {
                            this.eliminarItem(index)
                        }

                    } else {
                        var filtro = []

                        switch (this.global_HC106.TIPO) {
                            case '1': filtro = this.farmacos
                                break;
                            case '2': filtro = this.laboratorios
                                break;
                            case '3': filtro = this.imagenologia
                                break;
                        }

                        this.tabla.CODIGO = this.tabla.CODIGO.trim()

                        var busqueda = filtro.find(x => x.COD.trim() == this.tabla.CODIGO)
                        console.log(busqueda)

                        if (busqueda) {
                            var existe = this.global_HC106.TABLA.find(x => x.CODIGO.trim() == this.tabla.CODIGO)

                            if (!existe) {
                                this.modificarItem(index, busqueda)

                            } else if (existe && (parseInt(existe.ITEM) == this.tabla.ITEM)) {
                                this.tabla.ITEM = parseInt(this.tabla.ITEM) + 1
                                this.tabla.CODIGO = ''
                                this.validarItem()

                            } else {
                                CON851('', 'No se puede repetir!', null, 'error', 'Error')
                                this.validarCodigoTabla()
                            }

                        } else {
                            CON851('', 'Componente no existe!', null, 'error', 'Error')
                            this.validarCodigoTabla()
                        }
                    }

                }
            )
        },
        modificarItem(index, existe) {

            if (index == -1) {

                this.global_HC106.TABLA.push({
                    ITEM: this.tabla.ITEM,
                    CODIGO: this.tabla.CODIGO,
                    DESCRIP: existe.DESCRIP.trim()
                })

            } else {
                this.global_HC106.TABLA[index].ITEM = this.tabla.ITEM
                this.global_HC106.TABLA[index].CODIGO = this.tabla.CODIGO
                this.global_HC106.TABLA[index].DESCRIP = existe.DESCRIP.trim()
            }

            this.tabla.ITEM = parseInt(this.tabla.ITEM) + 1
            this.tabla.CODIGO = ''

            this.global_HC106.TABLA.sort((a, b) => {
                if (parseInt(a.ITEM) > parseInt(b.ITEM)) {
                    return 1;
                }
                if (parseInt(a.ITEM) < parseInt(b.ITEM)) {
                    return -1;
                }
                return 0;
            });

            this.validarItem()
        },
        eliminarItem(index) {
            this.global_HC106.TABLA.splice(index, 1)
            this.validarItem()
        },
        preguntaGrabarDatos() {
            CON851P('01', () => this._validarTabla_hc106('0'), this._grabardatos_hc106)
        },
        _grabardatos_hc106() {
            var _this = this

            var data = {};

            var datos_envio = datosEnvio()
            datos_envio += this.novedad
            datos_envio += '|'
            datos_envio += this.global_HC106.TIPO
            datos_envio += '|'
            datos_envio += this.global_HC106.CODIGO
            datos_envio += '|'
            datos_envio += espaciosDer(this.global_HC106.DESCRIP, 40)
            datos_envio += '|'

            data['datosh'] = datos_envio

            this.global_HC106.TABLA.forEach((item, i) => {
                var pos = i + 1;

                data["COD-" + pos.toString().padStart(3, "0")] = espaciosDer(item.CODIGO, 13)
            })

            console.log(data)

            postData(data, get_url("APP/HICLIN/HC106-02.DLL"))
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
                    _this.salir_HC106()
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    _this.salir_HC106()
                });
        },
        salir_HC106() {
            _regresar_menuhis()
        }
    }
})