new Vue({
    el: '#INV109',
    data: {
        DLL: {
            FPREF_NUM: '',
            PROV_FACT_ELECT: '',
            PRUEBA_TOKEN: '',
            TABLA: [],
            OPER_MODIF: '',
            OPER_CREA: '',
            FECHA_CREA: '',
            FECHA_MODIF: ''
        },
        global_INV109: {
            NRO: '',
            PREFIJO: '',
            DESCRIPCION: '',
            RESOLUCION: '',
            FECHA_INI: '',
            ANO_INI: '',
            MES_INI: '',
            DIA_INI: '',
            DESDE_NRO: '',
            HASTA_NRO: '',
            FECHA_FIN: '',
            ANO_FIN: '',
            MES_FIN: '',
            DIA_FIN: '',
            SUCURSAL: '',
            CENTRO_COSTO: '',
            ALMACEN: '',
            LISTA_SUC: '',
            VIGENCIA: '',
            TIPO_FACT: '',
            TOKEN: '',
            COMP: ''
        },
        centros_Costo: [],
        almacenes: [],
        textos: {
            descrip_centroCosto: '',
            descrip_almacen: '',
            descrip_comportamiento: '',
            proveedor_fact_elect: ''
        },
        flujo: false,
        proveedores: [
            { COD: "1", DESCRIP: "Facse" },
            { COD: "2", DESCRIP: "Carvajal" },
            { COD: "3", DESCRIP: "Novacorp" },
            { COD: "4", DESCRIP: "Ekomercio" },
            { COD: "5", DESCRIP: "Emision" }
        ],
        comportamiento: [
            { COD: "A", DESCRIP: "Ambulatorio-multipaciente" },
            { COD: "P", DESCRIP: "Hospitalizado-unipaciente" },
            { COD: "T", DESCRIP: "Transito eventos catastroficos" },
            { COD: "E", DESCRIP: "Particular contado" }
        ]
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');

        nombreOpcion('9,1,B  - Configuracion prefijos de facturacion')

        this.traerPrefijos()
    },
    watch: {

    },
    methods: {
        traerPrefijos() {
            var _this = this
            obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
                console.log(data)
                _this.DLL = data.PREFIJOS[0]
                _this.DLL.TABLA.pop()

                for (var i in _this.DLL.TABLA) {
                    _this.DLL.TABLA[i].NRO = parseInt(_this.DLL.TABLA[i].NRO).toString()
                    _this.DLL.TABLA[i].VIGENCIA = parseInt(_this.DLL.TABLA[i].VIGENCIA).toString()
                }

                _this.traerCentrosCostos()
            }, 'ON')
        },
        traerCentrosCostos() {
            var _this = this

            obtenerDatosCompletos({ nombreFd: 'COSTOS' }, data => {
                console.log(data)
                _this.centros_Costo = data.COSTO
                _this.centros_Costo.pop()

                _this.traerAlmacenes()
            }, '')
        },
        traerAlmacenes() {
            var _this = this

            obtenerDatosCompletos({ nombreFd: 'LOCALIZACION' }, data => {
                console.log(data)
                _this.almacenes = data.LOCALIZACION
                _this.almacenes.pop()
                _this.global_INV109.NRO = 1

                var prov = _this.proveedores.find(x => x.COD == _this.DLL.PROV_FACT_ELECT)
                if (prov) _this.textos.proveedor_fact_elect = prov.COD + '. ' + prov.DESCRIP

                _this.validarNro()
            }, 'OFF')
        },
        _validarTabla_inv109(orden) {
            validarTabla(
                {
                    tabla: '#validarTabla_INV109',
                    orden: orden,
                    event_f3: this.validarFacturaPrefijo,
                    Esc: this.validarNro
                },
                this.bajarDatosTabla,
                this.validarNro,
                this.validarFacturaPrefijo
            )
        },
        bajarDatosTabla(datos) {
            this.global_INV109.NRO = parseInt(datos.cells[0].textContent)
            var existe = this.DLL.TABLA.find(x => parseInt(x.NRO) == this.global_INV109.NRO)

            if (existe) {
                this.AsignarGlobal(existe)
            } else {
                CON851('', 'Ha ocurrido un error', null, 'error', 'error')
                this.validarNro()
            }
        },
        AsignarGlobal(existe) {
            console.log(existe)
            this.global_INV109.PREFIJO = existe.PREFIJO.trim()
            this.global_INV109.DESCRIPCION = existe.DESCRIPCION.trim()
            this.global_INV109.RESOLUCION = existe.RESOLUCION.trim()
            this.global_INV109.FECHA_INI = existe.FECHA_INI.trim()
            this.global_INV109.ANO_INI = existe.ANO_INI.trim()
            this.global_INV109.MES_INI = existe.MES_INI.trim()
            this.global_INV109.DIA_INI = existe.DIA_INI.trim()
            this.global_INV109.DESDE_NRO = existe.DESDE_NRO.trim()
            this.global_INV109.HASTA_NRO = existe.HASTA_NRO.trim()
            this.global_INV109.FECHA_FIN = existe.FECHA_FIN.trim()
            this.global_INV109.ANO_FIN = existe.ANO_FIN.trim()
            this.global_INV109.MES_FIN = existe.MES_FIN.trim()
            this.global_INV109.DIA_FIN = existe.DIA_FIN.trim()
            this.global_INV109.SUCURSAL = existe.SUCURSAL.trim()
            this.global_INV109.CENTRO_COSTO = existe.CENTRO_COSTO.trim()

            var busqueda_cc = this.centros_Costo.find(x => x.COD.trim() == this.global_INV109.CENTRO_COSTO.trim())

            if (busqueda_cc) this.textos.descrip_centroCosto = busqueda_cc.NOMBRE.trim()
            else this.textos.descrip_centroCosto = ''

            this.global_INV109.ALMACEN = existe.ALMACEN

            var busqueda_alm = this.almacenes.find(x => x.CODIGO.trim() == this.global_INV109.ALMACEN.trim())

            if (busqueda_alm) this.textos.descrip_almacen = busqueda_alm.DESCRIPCION.trim()
            else this.textos.descrip_almacen = ''

            this.global_INV109.LISTA_SUC = existe.LISTA_SUC.trim()
            this.global_INV109.VIGENCIA = existe.VIGENCIA.trim()
            this.global_INV109.TIPO_FACT = existe.TIPO_FACT.trim()
            this.global_INV109.TOKEN = existe.TOKEN.trim()

            this.global_INV109.COMP = existe.COMP.trim()

            var busqueda_comp = this.comportamiento.find(x => x.COD == this.global_INV109.COMP.trim())

            if (busqueda_comp) this.textos.descrip_comportamiento = this.global_INV109.COMP + '. ' + busqueda_comp.DESCRIP
            else this.textos.descrip_comportamiento = ''

            this.validarPrefijo()
        },
        vaciarGlobal() {
            this.textos.descrip_centroCosto = ''
            this.textos.descrip_almacen = ''
            this.textos.descrip_comportamiento = ''

            this.global_INV109 = {
                NRO: '',
                PREFIJO: '',
                DESCRIPCION: '',
                RESOLUCION: '',
                FECHA_INI: '',
                ANO_INI: '',
                MES_INI: '',
                DIA_INI: '',
                DESDE_NRO: '',
                HASTA_NRO: '',
                FECHA_FIN: '',
                ANO_FIN: '',
                MES_FIN: '',
                DIA_FIN: '',
                SUCURSAL: '',
                CENTRO_COSTO: '',
                ALMACEN: '',
                LISTA_SUC: '',
                VIGENCIA: '',
                TIPO_FACT: '',
                TOKEN: '',
                COMP: ''
            }
        },
        validarNro() {
            validarInputs(
                {
                    form: "#validar_NRO_prefijo109",
                    orden: '1',
                    event_f3: () => {
                        if (this.DLL.TABLA.length < 1) {
                            CON851('01', 'Tabla sin prefijos', null, 'error', 'error')
                            this.validarNro()
                        } else {
                            this.vaciarGlobal()
                            this._validarTabla_inv109('0')
                        }
                    }
                },
                () => CON851P('03', this.validarNro, this.salir_INV109),
                () => {
                    var nro = parseInt(this.global_INV109.NRO)

                    if (nro > 99 || nro < 1) {
                        CON851('01', 'Nro fuera de rango!', null, 'error', 'error')
                        this.validarNro()
                    } else {
                        var existe = this.DLL.TABLA.find(x => parseInt(x.NRO) == nro)

                        if (existe) {
                            this.AsignarGlobal(existe)
                        } else {
                            this.vaciarGlobal()
                            this.global_INV109.NRO = nro.toString()
                            this.validarPrefijo()
                        }
                    }
                }
            )
        },
        validarPrefijo() {
            validarInputs(
                {
                    form: "#validarPrefijo_109",
                    orden: '1'
                },
                () => this.validarNro(),
                () => {
                    if (this.global_INV109.PREFIJO.trim() == '') {

                        var existe = this.DLL.TABLA.find(x => parseInt(x.NRO) == parseInt(this.global_INV109.NRO))
                        var index = this.DLL.TABLA.findIndex(x => parseInt(x.NRO) == parseInt(this.global_INV109.NRO))

                        if (existe && index != -1) {
                            this.DLL.TABLA.splice(index, 1)
                            var nro = parseInt(this.global_INV109.NRO) + 1
                            this.vaciarGlobal()
                            this.global_INV109.NRO = nro
                            this.validarNro()
                        } else {
                            CON851('', 'Debe digitar un prefijo!', null, 'warning', 'Advertencia')
                            this.validarPrefijo()
                        }
                    } else {
                        this.validarDescripcion()
                    }
                }
            )
        },
        validarDescripcion() {
            validarInputs(
                {
                    form: "#validarDescripcion_109",
                    orden: '1'
                },
                () => this.validarPrefijo(),
                () => {
                    this.validarResolucion()
                }
            )
        },
        validarResolucion() {
            validarInputs(
                {
                    form: "#validarAutDian_109",
                    orden: '1'
                },
                () => this.validarDescripcion(),
                () => {
                    this.validarAnoIni()
                }
            )
        },
        validarAnoIni() {
            validarInputs(
                {
                    form: "#validarAnoIni_109",
                    orden: '1'
                },
                () => this.validarResolucion(),
                () => {
                    if (parseInt(this.global_INV109.ANO_INI) > 2000) {
                        this.validarMesIni()
                    } else {
                        CON851('37', '37', null, 'error', 'Error')
                        this.validarAnoIni()
                    }
                }
            )
        },
        validarMesIni() {
            validarInputs(
                {
                    form: "#validarMesIni_109",
                    orden: '1'
                },
                () => this.validarAnoIni(),
                () => {
                    if (parseInt(this.global_INV109.MES_INI) > 0 && parseInt(this.global_INV109.MES_INI) < 13) {
                        this.global_INV109.MES_INI = cerosIzq(this.global_INV109.MES_INI, 2)
                        this.validarDiaIni()
                    } else {
                        CON851('37', '37', null, 'error', 'Error')
                        this.validarMesIni()
                    }
                }
            )
        },
        validarDiaIni() {
            validarInputs(
                {
                    form: "#validarDiaIni_109",
                    orden: '1'
                },
                () => this.validarMesIni(),
                () => {
                    var fecha = moment([parseInt(this.global_INV109.ANO_INI), parseInt(this.global_INV109.MES_INI) - 1, parseInt(this.global_INV109.DIA_INI)]).isValid()

                    if (fecha) {
                        this.global_INV109.DIA_INI = cerosIzq(this.global_INV109.DIA_INI, 2)
                        this.validarAnoFin()
                    } else {
                        CON851('37', '37', null, 'error', 'Error')
                        this.validarDiaIni()
                    }
                }
            )
        },
        validarAnoFin() {
            validarInputs(
                {
                    form: "#validarAnoFin_109",
                    orden: '1'
                },
                () => this.validarDiaIni(),
                () => {
                    if (parseInt(this.global_INV109.ANO_FIN) > 2000) {
                        this.validarMesFin()
                    } else {
                        CON851('37', '37', null, 'error', 'Error')
                        this.validarAnoFin()
                    }
                }
            )
        },
        validarMesFin() {
            validarInputs(
                {
                    form: "#validarMesFin_109",
                    orden: '1'
                },
                () => this.validarAnoFin(),
                () => {
                    if (parseInt(this.global_INV109.MES_FIN) > 0 && parseInt(this.global_INV109.MES_FIN) < 13) {
                        this.global_INV109.MES_FIN = cerosIzq(this.global_INV109.MES_FIN, 2)
                        this.validarDiaFin()
                    } else {
                        CON851('37', '37', null, 'error', 'Error')
                        this.validarMesFin()
                    }
                }
            )
        },
        validarDiaFin() {
            validarInputs(
                {
                    form: "#validarDiaFin_109",
                    orden: '1'
                },
                () => this.validarMesFin(),
                () => {
                    this.global_INV109.DIA_FIN = cerosIzq(this.global_INV109.DIA_FIN, 2)

                    var fechaIni = parseInt(this.global_INV109.ANO_INI + this.global_INV109.MES_INI + this.global_INV109.DIA_INI)
                    var fechaFin = parseInt(this.global_INV109.ANO_FIN + this.global_INV109.MES_FIN + this.global_INV109.DIA_FIN)

                    var fecha_format_ini = moment([parseInt(this.global_INV109.ANO_INI), parseInt(this.global_INV109.MES_INI) - 1, parseInt(this.global_INV109.DIA_INI)])
                    var fecha_format_fin = moment([parseInt(this.global_INV109.ANO_FIN), parseInt(this.global_INV109.MES_FIN) - 1, parseInt(this.global_INV109.DIA_FIN)]).isValid()

                    if (fecha_format_fin) {

                        if (fechaIni > fechaFin) {
                            CON851('', 'Fecha final menor a inicial', null, 'error', 'Error')
                            this.validarDiaFin()
                        } else {
                            var diferencia = moment([parseInt(this.global_INV109.ANO_FIN), parseInt(this.global_INV109.MES_FIN) - 1, parseInt(this.global_INV109.DIA_FIN)]).diff(fecha_format_ini, 'months')

                            if (parseInt(diferencia) > 0) {
                                this.global_INV109.VIGENCIA = diferencia.toString()
                                this.validarNroDesde()
                            } else {
                                CON851('', 'Meses Vigencia debe ser mayor a 0', null, 'error', 'Error')
                                this.validarDiaFin()
                            }

                        }
                    } else {
                        CON851('37', '37', null, 'error', 'Error')
                        this.validarDiaFin()
                    }
                }
            )
        },
        validarNroDesde() {
            validarInputs(
                {
                    form: "#validarNroDesde_109",
                    orden: '1'
                },
                () => this.validarDiaFin(),
                () => {
                    this.global_INV109.DESDE_NRO = cerosIzq(this.global_INV109.DESDE_NRO, 9)

                    if (parseInt(this.global_INV109.DESDE_NRO) < 1) {
                        CON851('03', '03', null, 'error', 'Error')
                        this.validarNroDesde()
                    } else {
                        this.validarNroHasta()
                    }
                }
            )
        },
        validarNroHasta() {
            validarInputs(
                {
                    form: "#validarHasta_109",
                    orden: '1'
                },
                () => this.validarNroDesde(),
                () => {
                    this.global_INV109.HASTA_NRO = cerosIzq(this.global_INV109.HASTA_NRO, 9)

                    if (parseInt(this.global_INV109.HASTA_NRO) < 1) {
                        CON851('03', '03', null, 'error', 'error')
                        this.validarNroHasta()
                    } else {

                        if (parseInt(this.global_INV109.HASTA_NRO) < parseInt(this.global_INV109.DESDE_NRO)) {
                            CON851('03', '03', null, 'error', 'Error')
                            this.validarNroHasta()
                        } else {
                            this.validarSucursal()
                        }
                    }
                }
            )
        },
        validarSucursal() {
            validarInputs(
                {
                    form: "#validarSucursal_109",
                    orden: '1'
                },
                () => this.validarNroHasta(),
                () => {
                    this.global_INV109.SUCURSAL = cerosIzq(this.global_INV109.SUCURSAL, 2)

                    switch (this.global_INV109.SUCURSAL) {
                        case '01':
                        case '02':
                            this.validarCentroCosto()
                            break;
                        default:
                            CON851('03', '03', null, 'error', 'Error')
                            this.validarSucursal()
                            break;
                    }
                }
            )
        },
        ventanaCentrosCosto() {
            var _this = this

            _ventanaDatos({
                titulo: "Ventana centros de costo",
                columnas: ["COD", "NOMBRE"],
                data: this.centros_Costo,
                ancho: '60%',
                callback_esc: () => {
                    document.getElementById("centroCosto_inv109").focus()
                },
                callback: (data) => {
                    _this.global_INV109.CENTRO_COSTO = data.COD.trim()
                    setTimeout(() => _enterInput('#centroCosto_inv109'), 100)
                }
            });
        },
        validarCentroCosto() {
            validarInputs(
                {
                    form: "#validarCosto_109",
                    orden: '1'
                },
                () => this.validarSucursal(),
                () => {
                    if (this.global_INV109.CENTRO_COSTO.trim() == '') {
                        this.textos.descrip_centroCosto = ''
                        this.validarAlmacen()

                    } else {
                        var busqueda = this.centros_Costo.find(x => x.COD.trim() == this.global_INV109.CENTRO_COSTO.trim())

                        if (busqueda) {
                            this.textos.descrip_centroCosto = busqueda.NOMBRE.trim()
                            this.validarAlmacen()
                        } else {
                            CON851('', 'No existe centro de costo!', null, 'error', 'Error')
                            this.validarCentroCosto()
                        }
                    }
                }
            )
        },
        ventanaAlmacenes() {
            var _this = this

            _ventanaDatos({
                titulo: "Ventana almacenes",
                columnas: ["CODIGO", "DESCRIPCION"],
                data: this.almacenes,
                ancho: '60%',
                callback_esc: () => {
                    document.getElementById("almacen_inv109").focus()
                },
                callback: (data) => {
                    _this.global_INV109.ALMACEN = data.CODIGO.trim()
                    setTimeout(() => _enterInput('#almacen_inv109'), 100)
                }
            });
        },
        validarAlmacen() {
            validarInputs(
                {
                    form: "#validarAlmacen_109",
                    orden: '1'
                },
                () => this.validarCentroCosto(),
                () => {
                    if (this.global_INV109.ALMACEN.trim() == '') {
                        CON851('02', '02', null, 'error', 'Error')
                        this.validarAlmacen()

                    } else {
                        var busqueda = this.almacenes.find(x => x.CODIGO.trim() == this.global_INV109.ALMACEN.trim())

                        if (busqueda) {
                            this.textos.descrip_almacen = busqueda.DESCRIPCION.trim()
                            this.validarContingencia()
                        } else {
                            CON851('', 'No existe almacen!', null, 'error', 'Error')
                            this.validarAlmacen()
                        }
                    }
                }
            )
        },
        validarContingencia() {
            validarInputs(
                {
                    form: "#validarContingencia_109",
                    orden: '1'
                },
                () => this.validarAlmacen(),
                () => {
                    this.global_INV109.TIPO_FACT = this.global_INV109.TIPO_FACT.toUpperCase().trim() != 'S' ? "N" : "S"

                    this.flujo = true

                    this.validarComportamientoPref()
                }
            )
        },
        validarComportamientoPref() {
            var _this = this

            setTimeout(() => {
                POPUP({
                    titulo: "Comportamiento de este prefijo",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.comportamiento,
                    callback_f: () => this.validarContingencia(),
                    seleccion: this.global_INV109.COMP,
                    teclaAlterna: true,
                }, (data) => {
                    _this.global_INV109.COMP = data.COD
                    _this.textos.descrip_comportamiento = data.COD + '. ' + data.DESCRIP

                    _this.validarToken()
                })
            }, 300)
        },
        validarToken() {
            validarInputs(
                {
                    form: "#validarToken_109",
                    orden: '1'
                },
                () => this.validarComportamientoPref(),
                () => {
                    this.modificarItem()
                }
            )
        },
        modificarItem() {
            var index = this.DLL.TABLA.findIndex(x => parseInt(x.NRO) == parseInt(this.global_INV109.NRO))

            if (index == -1) {

                this.DLL.TABLA.push({
                    NRO: this.global_INV109.NRO,
                    PREFIJO: this.global_INV109.PREFIJO,
                    DESCRIPCION: this.global_INV109.DESCRIPCION,
                    RESOLUCION: this.global_INV109.RESOLUCION,
                    FECHA_INI: this.global_INV109.ANO_INI + '/' + this.global_INV109.MES_INI + '/' + this.global_INV109.DIA_INI,
                    ANO_INI: this.global_INV109.ANO_INI,
                    MES_INI: this.global_INV109.MES_INI,
                    DIA_INI: this.global_INV109.DIA_INI,
                    FECHA_FIN: this.global_INV109.ANO_FIN + '/' + this.global_INV109.MES_FIN + '/' + this.global_INV109.DIA_FIN,
                    ANO_FIN: this.global_INV109.ANO_FIN,
                    MES_FIN: this.global_INV109.MES_FIN,
                    DIA_FIN: this.global_INV109.DIA_FIN,
                    DESDE_NRO: this.global_INV109.DESDE_NRO,
                    HASTA_NRO: this.global_INV109.HASTA_NRO,
                    SUCURSAL: this.global_INV109.SUCURSAL,
                    CENTRO_COSTO: this.global_INV109.CENTRO_COSTO,
                    ALMACEN: this.global_INV109.ALMACEN,
                    LISTA_SUC: this.global_INV109.LISTA_SUC,
                    VIGENCIA: this.global_INV109.VIGENCIA,
                    TIPO_FACT: this.global_INV109.TIPO_FACT,
                    TOKEN: this.global_INV109.TOKEN,
                    COMP: this.global_INV109.COMP
                })

            } else {
                this.DLL.TABLA[index].NRO = this.global_INV109.NRO
                this.DLL.TABLA[index].PREFIJO = this.global_INV109.PREFIJO
                this.DLL.TABLA[index].DESCRIPCION = this.global_INV109.DESCRIPCION
                this.DLL.TABLA[index].RESOLUCION = this.global_INV109.RESOLUCION
                this.DLL.TABLA[index].FECHA_INI = this.global_INV109.ANO_INI + '/' + this.global_INV109.MES_INI + '/' + this.global_INV109.DIA_INI
                this.DLL.TABLA[index].ANO_INI = this.global_INV109.ANO_INI
                this.DLL.TABLA[index].MES_INI = this.global_INV109.MES_INI
                this.DLL.TABLA[index].DIA_INI = this.global_INV109.DIA_INI
                this.DLL.TABLA[index].DESDE_NRO = this.global_INV109.DESDE_NRO
                this.DLL.TABLA[index].HASTA_NRO = this.global_INV109.HASTA_NRO
                this.DLL.TABLA[index].FECHA_FIN = this.global_INV109.ANO_FIN + '/' + this.global_INV109.MES_FIN + '/' + this.global_INV109.DIA_FIN
                this.DLL.TABLA[index].ANO_FIN = this.global_INV109.ANO_FIN
                this.DLL.TABLA[index].MES_FIN = this.global_INV109.MES_FIN
                this.DLL.TABLA[index].DIA_FIN = this.global_INV109.DIA_FIN
                this.DLL.TABLA[index].SUCURSAL = this.global_INV109.SUCURSAL
                this.DLL.TABLA[index].CENTRO_COSTO = this.global_INV109.CENTRO_COSTO
                this.DLL.TABLA[index].ALMACEN = this.global_INV109.ALMACEN
                this.DLL.TABLA[index].LISTA_SUC = this.global_INV109.LISTA_SUC
                this.DLL.TABLA[index].VIGENCIA = this.global_INV109.VIGENCIA
                this.DLL.TABLA[index].TIPO_FACT = this.global_INV109.TIPO_FACT
                this.DLL.TABLA[index].TOKEN = this.global_INV109.TOKEN
                this.DLL.TABLA[index].COMP = this.global_INV109.COMP
            }

            var item = parseInt(this.global_INV109.NRO) + 1

            this.DLL.TABLA.sort((a, b) => {
                if (parseInt(a.NRO) > parseInt(b.NRO)) {
                    return 1;
                }
                if (parseInt(a.NRO) < parseInt(b.NRO)) {
                    return -1;
                }
                return 0;
            });

            this.flujo = false

            this.vaciarGlobal()
            this.global_INV109.NRO = item
            this.validarNro()
        },
        validarFacturaPrefijo() {
            validarInputs(
                {
                    form: "#validarFactPref_109",
                    orden: '1'
                },
                () => this._validarTabla_inv109('0'),
                () => {
                    var index = this.DLL.TABLA.findIndex(x => parseInt(x.NRO) == parseInt(this.DLL.FPREF_NUM))

                    if (index != -1) {
                        this.proveedorElectronico()
                    } else {
                        CON851('', 'No existe prefijo!', null, 'error', 'Error')
                        this.validarFacturaPrefijo()
                    }
                }
            )
        },
        proveedorElectronico() {
            var _this = this

            setTimeout(() => {
                POPUP({
                    titulo: "Resultado del examen",
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    array: this.proveedores,
                    callback_f: () => this.validarFacturaPrefijo(),
                    seleccion: this.DLL.PROV_FACT_ELECT,
                    teclaAlterna: true,
                }, (data) => {
                    _this.DLL.PROV_FACT_ELECT = data.COD
                    _this.textos.proveedor_fact_elect = data.COD + '. ' + data.DESCRIP

                    _this.entornoPrueba()
                })
            }, 300)
        },
        entornoPrueba() {
            validarInputs(
                {
                    form: "#validarEntornoPrueba",
                    orden: '1'
                },
                () => this.proveedorElectronico(),
                () => {
                    this.DLL.PRUEBA_TOKEN = this.DLL.PRUEBA_TOKEN.toUpperCase().trim() != 'S' ? "N" : "S"

                    CON851P('01', this.entornoPrueba,this._grabardatos_INV109)
                }
            )
        },
        _grabardatos_INV109() {
            var _this = this

            var data = {};

            var datos_envio = datosEnvio()
            datos_envio += this.DLL.FPREF_NUM
            datos_envio += '|'
            datos_envio += this.DLL.PROV_FACT_ELECT
            datos_envio += '|'
            datos_envio += this.DLL.PRUEBA_TOKEN
            datos_envio += '|'
            datos_envio += localStorage.Usuario
            datos_envio += '|'
            datos_envio += moment().format('YYYYMMDD')
            datos_envio += '|'

            data['datosh'] = datos_envio

            this.DLL.TABLA.forEach((item, i) => {
                var pos = i + 1;

                var datos = item.PREFIJO
                datos += '|'
                datos += item.DESCRIPCION
                datos += '|'
                datos += item.RESOLUCION
                datos += '|'
                datos += item.ANO_INI + item.MES_INI + item.DIA_INI
                datos += '|'
                datos += item.ANO_FIN + item.MES_FIN + item.DIA_FIN
                datos += '|'
                datos += item.DESDE_NRO
                datos += '|'
                datos += item.HASTA_NRO
                datos += '|'
                datos += item.SUCURSAL
                datos += '|'
                datos += item.CENTRO_COSTO
                datos += '|'
                datos += item.ALMACEN
                datos += '|'
                datos += item.LISTA_SUC
                datos += '|'
                datos += item.VIGENCIA
                datos += '|'
                datos += item.TIPO_FACT
                datos += '|'
                datos += item.TOKEN
                datos += '|'
                datos += item.COMP
                datos += '|'

                data["LIN-" + pos.toString().padStart(3, "0")] = datos
            })

            console.log(data)

            postData(data, get_url("APP/INVENT/INV109-02.DLL"))
                .then((data) => {
                    console.log(data)
                    
                    CON851('', 'Guardado correctamente', null, 'success', 'Exitoso');
                    _this.salir_INV109()
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    _this.salir_INV109()
                });
        },
        salir_INV109() {
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()
        }
    }
})