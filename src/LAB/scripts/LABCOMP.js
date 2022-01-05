new Vue({
    el: '#LABCOMP',
    data: {
        global_LABCOMP: {
            DESCRIPCION: '',
            UNIDAD_MEDIDA: '',
            PLANTILLA: '',
            TITULO: '',
            VLR_REFER: [
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' },
                { DESCRIP: '', VLR: '' }
            ],
            OPER_CREA: '',
            FECHA_CREA: '',
            OPER_MODIF: '',
            FECHA_MODIF: ''
        },
        plantillas: [],
        componentes: [],
        novedad: '',
        llave: '',
        textos: {
            descrip_novedad: '',
            descrip_plantilla: ''
        }
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');

        nombreOpcion('1,1 - Actualizar componentes')

        loader('show')
        this.traerComponentes()
    },
    watch: {

    },
    methods: {
        traerComponentes() {
            var _this = this

            postData({ datosh: datosEnvio() }, get_url("APP/LAB/LABCOMP.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.componentes = data.COMPONENTES
                    _this.componentes.pop()
                    _this.traerPlantillas()
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    CON851('', 'error consultando componentes', null, 'error', 'Error')
                    _this.salir_labcomp()
                });
        },
        traerPlantillas() {
            var _this = this

            postData({ datosh: datosEnvio() }, get_url("APP/LAB/LAB104.DLL"))
                .then((data) => {
                    _this.plantillas = data.PLANTILLAS
                    _this.plantillas.pop()
                    loader('hide')
                    CON850(this.evaluarNovedad)
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    CON851('', 'error consultando plantillas', null, 'error', 'Error')
                    _this.salir_labcomp()
                })
        },
        evaluarNovedad(novedad) {
            this.novedad = novedad.id

            switch (this.novedad) {
                case '7':
                case '8':
                case '9':
                    this.textos.descrip_novedad = novedad.id + ' - ' + novedad.descripcion
                    this.validarCodigo()
                    break;
                case 'F':
                    this.salir_labcomp()
                    break;
            }
        },
        ventana_componentes() {
            var _this = this

            _ventanaDatos({
                titulo: "Ventana Componentes",
                columnas: ["CODIGO", "DESCRIPCION"],
                data: this.componentes,
                ancho: '60%',
                callback_esc: () => {
                    document.getElementById("codigo_labcomp").focus()
                },
                callback: (data) => {
                    _this.llave = data.CODIGO
                    setTimeout(() => _enterInput('#codigo_labcomp'), 100)
                }
            });
        },
        validarCodigo() {
            validarInputs(
                {
                    form: "#validarCodigo_LABCOMP",
                    orden: '1'
                },
                () => CON850(this.evaluarNovedad),
                () => {
                    this.llave = this.llave.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, '').toUpperCase().trim()
                    this.llave = this.llave.replace(/Ñ/g, '\001')
                    this.llave = this.llave.normalize("NFD").replace(/[\u0300-\u032a]/g, "")
                    this.llave = this.llave.replace(/\001/g, 'Ñ');

                    var busqueda = this.componentes.find(x => x.CODIGO.toUpperCase().trim() == this.llave)

                    if (busqueda) {

                        switch (this.novedad) {
                            case '7':
                                CON851('', 'Componente ya existe!', null, 'error', 'Error')
                                this.validarCodigo()
                                break;
                            case '8':
                            case '9':
                                loader('show')
                                this.traerComponente_completo()
                                break;
                        }

                    } else {

                        switch (this.novedad) {
                            case '7':
                                this.validarDescripcion()
                                break;
                            case '8':
                            case '9':
                                CON851('', 'Componente no existe!', null, 'error', 'Error')
                                this.validarCodigo()
                                break;
                        }
                    }

                }
            )
        },
        traerComponente_completo() {
            var _this = this

            postData({ datosh: datosEnvio() + this.llave + '|' }, get_url("APP/LAB/LABCOMP-02.DLL"))
                .then((data) => {
                    console.log(data)
                    _this.global_LABCOMP = data.COMPONENTE_FULL[0]
                    _this.global_LABCOMP.PLANTILLA
                    _this.AsignarDatos()
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    CON851('', 'error consultando componente', null, 'error', 'Error')
                    _this.validarDescripcion()
                });
        },
        AsignarDatos() {
            this.global_LABCOMP.DESCRIPCION = this.global_LABCOMP.DESCRIPCION.trim()

            this.global_LABCOMP.UNIDAD_MEDIDA = this.global_LABCOMP.UNIDAD_MEDIDA.trim()

            this.global_LABCOMP.TITULO == this.global_LABCOMP.TITULO.trim()

            if (this.global_LABCOMP.PLANTILLA == '00') {
                this.textos.descrip_plantilla = 'Digitar valor'

            } else if (this.global_LABCOMP.TITULO == 'S') {
                this.textos.descrip_plantilla = ''

            } else {
                var busqueda = this.plantillas.find(data => data.COD == this.global_LABCOMP.PLANTILLA)

                if (busqueda) this.textos.descrip_plantilla = busqueda.DESCRIP
                else this.textos.descrip_plantilla = 'No encontrado'
            }

            for (var i in this.global_LABCOMP.VLR_REFER) {
                this.global_LABCOMP.VLR_REFER[i].DESCRIP = this.global_LABCOMP.VLR_REFER[i].DESCRIP.trim()
                this.global_LABCOMP.VLR_REFER[i].VLR = this.global_LABCOMP.VLR_REFER[i].VLR.trim()
            }

            loader('hide')

            if (this.novedad == '9') {
                switch (localStorage.Usuario) {
                    case 'GEBC':
                    case 'ADMI':
                    case 'MFCG':
                        CON851P('La eliminación de este componente afectará los resultados anteriores, seguro que desea eliminarlo?', () => this.validarDescripcion(), () => this._grabardatos_LABCOMP())
                        break;
                    default:
                        jAlert(
                            { titulo: "Advertencia ", mensaje: 'Usted no está autorizado para eliminar componentes!' },
                            this.validarDescripcion
                        )
                        break;
                }
            } else if (this.novedad == '8') {
                switch (localStorage.Usuario) {
                    case 'GEBC':
                    case 'ADMI':
                    case 'DHAY':
                        this.validarDescripcion()
                        break;
                    default:
                        jAlert(
                            { titulo: "Advertencia ", mensaje: 'Usted no está autorizado para modificar componentes!' },
                            this.validarCodigo
                        )
                        break;
                }

            } else {
                this.validarDescripcion()
            }
        },
        validarDescripcion() {
            validarInputs(
                {
                    form: "#validarDescrip_LABCOMP",
                    orden: '1'
                },
                () => CON851P('03', this.validarDescripcion, () => {
                    this.vaciarGlobal()
                    this.validarCodigo()
                }),
                () => {
                    this.global_LABCOMP.DESCRIPCION = this.global_LABCOMP.DESCRIPCION.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, '').toUpperCase().trim()
                    this.global_LABCOMP.DESCRIPCION = this.global_LABCOMP.DESCRIPCION.replace(/Ñ/g, '\001')
                    this.global_LABCOMP.DESCRIPCION = this.global_LABCOMP.DESCRIPCION.normalize("NFD").replace(/[\u0300-\u032a]/g, "")
                    this.global_LABCOMP.DESCRIPCION = this.global_LABCOMP.DESCRIPCION.replace(/\001/g, 'Ñ');

                    var busqueda = this.componentes.find(x => x.DESCRIPCION.toUpperCase().trim() == this.global_LABCOMP.DESCRIPCION)
                    console.log(busqueda)

                    if (busqueda) {

                        if (busqueda.CODIGO.toUpperCase().trim() == this.llave) {
                            this.validarTitulo()
                        } else {
                            CON851('', 'Descripcion ya existe!', null, 'error', 'Error')
                            this.validarDescripcion()
                        }

                    } else {
                        this.validarTitulo()
                    }

                }
            )
        },
        validarTitulo() {
            validarInputs(
                {
                    form: "#validarTitulo_LABCOMP",
                    orden: '1'
                },
                () => this.validarDescripcion(),
                () => {
                    this.global_LABCOMP.TITULO = this.global_LABCOMP.TITULO.toUpperCase().trim() != 'S' ? "N" : "S"

                    if (this.global_LABCOMP.TITULO == 'S') {

                        this.global_LABCOMP.UNIDAD_MEDIDA = ''
                        this.global_LABCOMP.PLANTILLA = ''
                        this.global_LABCOMP.VLR_REFER = [
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' },
                            { DESCRIP: '', VLR: '' }
                        ]

                        this.validarPreguntaGuardado('titulo')

                    } else {
                        this.validarUnid_medida()
                    }
                }
            )
        },
        validarUnid_medida() {
            validarInputs(
                {
                    form: "#validarUnidMed_LABCOMP",
                    orden: '1'
                },
                () => this.validarTitulo(),
                () => this.validarPlantilla()
            )
        },
        ventanaPlantillas() {
            var _this = this

            _ventanaDatos({
                titulo: "Ventana Plantillas",
                columnas: ["COD", "DESCRIP"],
                data: this.plantillas,
                ancho: '50%',
                callback_esc: () => {
                    document.getElementById("plantilla_LABCOMP").focus()
                },
                callback: (data) => {
                    _this.global_LABCOMP.PLANTILLA = data.COD
                    setTimeout(() => _enterInput('#plantilla_LABCOMP'), 100)
                }
            });
        },
        validarPlantilla() {
            validarInputs(
                {
                    form: "#validarPlantilla_LABCOMP",
                    orden: '1'
                },
                () => this.validarUnid_medida(),
                () => {
                    this.global_LABCOMP.PLANTILLA = cerosIzq(this.global_LABCOMP.PLANTILLA.trim(), 2)

                    if (this.global_LABCOMP.PLANTILLA == '00') {
                        this.textos.descrip_plantilla = 'Digitar valor'
                        this.validarDescrip_vlrReferencia(0)
                    } else {
                        var busqueda = this.plantillas.find(data => data.COD == this.global_LABCOMP.PLANTILLA)

                        if (busqueda) {
                            this.textos.descrip_plantilla = busqueda.DESCRIP
                            this.validarDescrip_vlrReferencia(0)
                        } else {
                            CON851('01', 'No existe plantilla', null, 'error', 'error')
                            this.textos.descrip_plantilla = 'No existe'
                            this.validarPlantilla()
                        }
                    }
                }
            )
        },
        validarDescrip_vlrReferencia(a) {
            validarInputs(
                {
                    form: "#validarDescripRefer" + a + "_LABCOMP",
                    orden: '1',
                    event_f3: () => this.validarPreguntaGuardado(a),
                    event_flecha_arriba: () => {
                        if (a != 0) {
                            this.validarDescrip_vlrReferencia(parseInt(a) - 1)
                        } else {
                            this.validarDescrip_vlrReferencia(a)
                        }
                    },
                    event_flecha_abajo: () => {
                        if (a != 14) {
                            this.validarDescrip_vlrReferencia(parseInt(a) + 1)
                        } else {
                            this.validarDescrip_vlrReferencia(a)
                        }
                    }
                },
                () => {
                    if (a == 0) {
                        this.validarPlantilla()
                    } else {
                        this.validarVlr_vlrReferencia(parseInt(a) - 1)
                    }
                },
                () => {
                    this.validarVlr_vlrReferencia(a)
                }
            )
        },
        validarVlr_vlrReferencia(a) {
            validarInputs(
                {
                    form: "#validarVlrRefer" + a + "_LABCOMP",
                    orden: '1',
                    event_f3: () => this.validarPreguntaGuardado(a),
                    event_flecha_arriba: () => {
                        if (a != 0) {
                            this.validarVlr_vlrReferencia(parseInt(a) - 1)
                        } else {
                            this.validarVlr_vlrReferencia(a)
                        }
                    },
                    event_flecha_abajo: () => {
                        if (a != 14) {
                            this.validarVlr_vlrReferencia(parseInt(a) + 1)
                        } else {
                            this.validarVlr_vlrReferencia(a)
                        }
                    }
                },
                () => {
                    this.validarDescrip_vlrReferencia(a)
                },
                () => {
                    if (a == 14) {
                        console.log(this.global_LABCOMP)
                    } else {
                        this.validarDescrip_vlrReferencia(parseInt(a) + 1)
                    }
                }
            )
        },
        validarPreguntaGuardado(a) {

            if (this.novedad == '8') {
                CON851P('La modificación de este componente afectará los resultados anteriores, seguro que desea modificarlo?', () => {

                    if (a == 'titulo') this.validarTitulo()
                    else this.validarDescrip_vlrReferencia(a)

                }, () => this._grabardatos_LABCOMP())

            } else {
                CON851P('01', () => {

                    if (a == 'titulo') this.validarTitulo()
                    else this.validarDescrip_vlrReferencia(a)

                }, () => this._grabardatos_LABCOMP())
            }
        },
        _grabardatos_LABCOMP() {
            var _this = this

            var data = {};

            var datos_envio = datosEnvio()
            datos_envio += this.novedad
            datos_envio += '|'
            datos_envio += espaciosDer(this.llave, 10)
            datos_envio += '|'
            datos_envio += espaciosDer(this.global_LABCOMP.DESCRIPCION, 80)
            datos_envio += '|'
            datos_envio += this.global_LABCOMP.TITULO
            datos_envio += '|'
            datos_envio += espaciosDer(this.global_LABCOMP.UNIDAD_MEDIDA, 15)
            datos_envio += '|'
            datos_envio += cerosIzq(this.global_LABCOMP.PLANTILLA, 2)
            datos_envio += '|'
            datos_envio += localStorage.Usuario
            datos_envio += '|'
            datos_envio += moment().format('YYYYMMDD')
            datos_envio += '|'

            data['datosh'] = datos_envio

            this.global_LABCOMP.VLR_REFER.forEach((item, i) => {
                var posicion = i + 1;

                var valores_Refer = espaciosDer(item.DESCRIP, 24)
                valores_Refer += '|'
                valores_Refer += espaciosDer(item.VLR, 24)
                valores_Refer += '|'
                data["VLR-" + posicion.toString().padStart(3, "0")] = valores_Refer
            })

            console.log(data)

            postData(data, get_url("APP/LAB/LABCOMP-03.DLL"))
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
                    _this.salir_labcomp()
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    _this.salir_labcomp()
                });
        },
        vaciarGlobal() {
            this.global_LABCOMP = {
                DESCRIPCION: '',
                UNIDAD_MEDIDA: '',
                PLANTILLA: '',
                TITULO: '',
                VLR_REFER: [
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' },
                    { DESCRIP: '', VLR: '' }
                ],
                OPER_CREA: '',
                FECHA_CREA: '',
                OPER_MODIF: '',
                FECHA_MODIF: ''
            }
            this.textos.descrip_plantilla = ''
        },
        salir_labcomp() {
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()
        }
    }
})