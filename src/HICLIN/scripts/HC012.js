const { isNumeric } = require("jquery");

new Vue({
    el: '#HC012',
    data: {
        tablaIzq_interpretaciones: [],
        tablaDer_interpretaciones: null,
        arrayInterpretacion: null,
        enterIzq: null,
        posicionIzq: 0,
        posicionDer: 0,
        itemsSinInterpretar: null,
        posicionSinInter: null,
        arrayIps: null,
        datosGuardado: {},
        busquedaIPS: null,
        popupResul: [
            { "COD": "1", "DESCRIP": "Normal" },
            { "COD": "2", "DESCRIP": "Anormal" },
            { "COD": "3", "DESCRIP": "Positivo" },
            { "COD": "4", "DESCRIP": "Negativo" },
            { "COD": "5", "DESCRIP": "No se hizo" },
            { "COD": "6", "DESCRIP": "Pendiente" },
            { "COD": "7", "DESCRIP": "Reactivo" },
            { "COD": "8", "DESCRIP": "No reactivo" }
        ],

    },
    created() {
        loader('show')
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');
        $("#lab_hc012").hide()
        loader('show')

        this.traerRegistros()
    },
    watch: {

    },
    methods: {
        evaluarClase(item, index) {
            var clase = ''

            console.log(this.enterDer, this.posicionDer, index)

            if (index == this.posicionDer && this.enterDer == 'S') {
                console.log('siiii')
                clase = 'seleccionado'
            } else {
                switch (item.INTERPRETADO.trim()) {
                    case '': clase = ''
                        break;
                    case '6': clase = 'item_orange'
                        break;
                    default: clase = 'item_green'
                        break;
                }
            }
            return clase
        },
        traerRegistros() {
            var URL = get_url("APP/HICLIN/HC012.DLL");
            postData({
                datosh: datosEnvio() + $_REG_HC.llave_hc + '|'
            }, URL)
                .then((data) => {
                    this.tablaIzq_interpretaciones = data.ESTUDIOS
                    this.tablaIzq_interpretaciones.pop()

                    if (this.tablaIzq_interpretaciones.length > 0) {

                        for (var i in this.tablaIzq_interpretaciones) {
                            this.tablaIzq_interpretaciones[i].MEDICO = this.tablaIzq_interpretaciones[i].MEDICO.replace(/\�/g, "Ñ").trim()
                        }

                        this.organizarArray()

                        this.tablaDer_interpretaciones = this.tablaIzq_interpretaciones[this.posicionIzq].TABLA;
                        for (var i in this.tablaDer_interpretaciones) {
                            this.tablaDer_interpretaciones[i].DESCRIP_CUP = this.tablaDer_interpretaciones[i].DESCRIP_CUP.replace(/\�/g, "Ñ").trim()
                        }

                        loader('hide')
                        this.focoTablaIzq(0)
                    } else {
                        loader('hide')
                        CON851('', 'No se ha elaborado formulacion!', null, 'error', 'Error');
                        this.salir_HC012()
                    }

                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    this.salir_HC012()
                });
        },
        organizarArray() {
            this.tablaIzq_interpretaciones.sort(function (a, b) {
                if (parseInt(a.FECHA) < parseInt(b.FECHA)) {
                    return 1;
                }
                if (parseInt(a.FECHA) > parseInt(b.FECHA)) {
                    return -1;
                }
                return 0;
            })
        },
        mostrarTablaDerecha(item) {
            this.posicionIzq = item
            var copia = JSON.parse(JSON.stringify(this.tablaIzq_interpretaciones[this.posicionIzq].TABLA))

            for (var i in copia) {
                copia[i].DESCRIP_CUP = copia[i].DESCRIP_CUP.replace(/\�/g, "Ñ").trim()
            }

            this.tablaDer_interpretaciones = []
            this.tablaDer_interpretaciones = copia
        },
        focoTablaIzq(order) {
            validarTabla(
                {
                    tabla: '#tablaIzq_HC012',
                    orden: order,
                    cambioFoco: (a) => this.mostrarTablaDerecha(a),
                    Esc: () => this.salir_HC012()
                },
                (data) => {
                    if (this.tablaDer_interpretaciones.length < 1) {
                        CON851('', 'Esa evolucion no tiene examenes pendientes!', null, 'warning', 'Advertencia');
                        this.focoTablaIzq(this.posicionIzq)
                    } else {
                        this.enterIzq = 'S'
                        $("#lab_hc012").show()
                        this.focoTablaDer(0)
                    }
                },
                () => this.focoTablaIzq(0),
                () => this.focoTablaIzq(tablaIzq_HC012.rows.length - 1)
            )
        },
        focoTablaDer(order) {
            validarTabla(
                {
                    tabla: '#tablaDer_HC012',
                    orden: order,
                    cambioFoco: (a) => this.posicionDer = a,
                    Esc: () => {
                        this.enterIzq = null
                        $("#lab_hc012").hide()
                        this.focoTablaIzq(this.posicionIzq)
                    }
                },
                (data) => {
                    this.enterDer = 'S'
                    this.mostrarTablaDerecha(this.posicionIzq)
                    this.consultarInterpretacion()
                },
                () => this.focoTablaDer(0),
                () => this.focoTablaDer(tablaDer_HC012.rows.length - 1)
            )
        },
        ventanaLaboratorios() {
            loader('show')
            var URL = get_url("APP/LAB/LAB-ESTUDIOS.DLL");

            postData({
                datosh: datosEnvio() + 'PACIENTE' + '|' + $_REG_HC.id_paciente + '|'
            }, URL)
                .then((data) => {
                    loader('hide')
                    let { ipcRenderer } = require("electron");
                    ipcRenderer.send('another', datos = { directorio: 'frameworks/scripts/valMenus/VAL_RXLAB.html', REG_HC: $_REG_HC, REG_PROF: $_REG_PROF });
                    vector = ['on', 'Consultando laboratorios...']
                    _EventocrearSegventana(vector, () => console.log('salio'));
                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                });
        },
        consultarInterpretacion() {
            loader('show')
            var URL = get_url("APP/HICLIN/HC012-02.DLL")

            var llave = this.tablaIzq_interpretaciones[this.posicionIzq].LLAVE
            var cup = espaciosDer(this.tablaDer_interpretaciones[this.posicionDer].CUP, 12)
            var posicion = this.tablaDer_interpretaciones[this.posicionDer].POSICION

            postData({
                datosh: datosEnvio() + llave + '|' + cup + '|' + posicion + '|'
            }, URL)
                .then((data) => {
                    this.arrayInterpretacion = data.INTERPRETACION[0]
                    loader('hide')

                    if (this.arrayInterpretacion.RESULTADO == '6' || this.arrayInterpretacion.RESULTADO.trim() == '') {
                        this.popupResultado()
                    } else {
                        CON851('', 'Interpretación no es modificable!', null, 'warning', 'Advertencia');
                        this.ventanaIntepretacion()
                    }

                })
                .catch(error => {
                    console.error(error)
                    loader('hide')
                    $_this.enterDer = null
                    $_this.mostrarTablaDerecha($_this.posicionIzq)
                    $_this.focoTablaDer($_this.posicionDer)
                });
        },
        popupResultado() {
            var $_this = this

            POPUP({
                array: this.popupResul,
                titulo: 'Resultado:',
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                callback_f: () => {
                    setTimeout(() => {
                        CON851P('Salir sin grabar?', $_this.popupResultado, () => {
                            console.log('sale popup')
                            $_this.arrayInterpretacion = null
                            $_this.enterDer = null
                            $_this.mostrarTablaDerecha($_this.posicionIzq)
                            $_this.focoTablaDer($_this.posicionDer)
                        })
                    }, 200)
                },
                seleccion: $_this.arrayInterpretacion.RESULTADO
            }, function (data) {
                $_this.arrayInterpretacion.RESULTADO = data.COD
                setTimeout($_this.ventanaIntepretacion(), 300)
            })

        },
        ventanaIntepretacion() {
            var fuente = '<div>' +
                '<div class="col-md-12">' +
                '<div class="portlet light no-padding">' +
                '<div class="portlet-body no-padding">' +
                '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

                '<div class="col-md-12" style="display: flex">' +

                '<div class="col-md-2" id="validarResultado_hc012">' +
                '<label>Resultado:</label>' +
                '<input type="text" id="resultado_hc012" class="form-control" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
                '</div>' +

                '<div class="col-md-10" id="validarInterpretacion_hc012">' +
                '<div class="col-md-12 no-padding" style="display:flex; justify-content:space-between">' +
                '<label>Interpretación :</label>' +
                '<label>(Máximo 190 caracteres)</label>' +
                '</div>' +
                '<textarea id="interpretacion_hc012" class="form-control" disabled="disabled" rows="2" maxlength="190" data-orden="1" style="resize: none; text-align: justify; font-size: 15px"></textarea>' +
                '</div>' +

                '</div>' +

                '<div class="salto-linea"></div>' +

                '<div class="col-md-12" style="display: flex">' +

                '<div class="col-md-2" id="validarAsesoria_hc012">' +
                '<label>Asesoria VIH?</label>' +
                '<input type="text" id="asesoriaVIH_hc012" class="form-control" disabled="disabled" maxlength="1" placeholder="N" data-orden="1" style="text-align: center" />' +
                '</div>' +

                '<div class="col-md-10 no-padding" style="display: flex; justify-content:left">' +

                '<div class="col-md-2" id="validarDia_hc012">' +
                '<label>Dia</label>' +
                '<input type="text" id="diaVIH_hc012" class="form-control" disabled="disabled" maxlength="2" data-orden="1" style="text-align: center" />' +
                '</div>' +

                '<div class="col-md-2" id="validarMes_hc012">' +
                '<label>Mes</label>' +
                '<input type="text" id="mesVIH_hc012" class="form-control" disabled="disabled" maxlength="2" data-orden="1" style="text-align: center" />' +
                '</div>' +

                '<div class="col-md-2" id="validarAno_hc012">' +
                '<label>Año</label>' +
                '<input type="text" id="anoVIH_hc012" class="form-control" disabled="disabled" maxlength="4" data-orden="1" style="text-align: center" />' +
                '</div>' +

                '<div class="col-md-3" id="validarInst_hc012">' +
                '<label>Se realizó en la institución ?</label>' +
                '<input type="text" id="inst_hc012" class="form-control" required="true" disabled="disabled" maxlength="1" placeholder="N" data-orden="1" style="text-align: center" />' +
                '</div>' +

                '<div class="col-md-3 col-sm-3 col-xs-3" id="validarIPS_hc012">' +
                '<label>IPS:</label>' +
                '<div class="inline-inputs">' +
                '<div class="input-group col-md-10 col-sm-10 col-xs-10">' +
                '<input id="IPS_hc012" disabled="disabled" required="true" maxlength="12" data-orden="1" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                '</div>' +
                '<button type="button" id="IPSBtn_hc012"' +
                'class="btn f8-Btn col-md-2 col-sm-2 col-xs-2">' +
                '<i class="icon-magnifier"></i>' +
                '</button>' +
                '</div>' +
                '</div>' +

                '</div>' +

                '</div>' +

                '</div>' +

                '</div>' +
                '</div>' +
                '</div>' +
                '<div style="clear:both;"></div>' +
                '</div>'

            var dialogo = bootbox.dialog({
                title: this.tablaDer_interpretaciones[this.posicionDer].DESCRIP_CUP,
                message: fuente,
                closeButton: false,
                buttons: {
                    main: {
                        label: "Aceptar",
                        className: "blue hidden",
                        callback: function () {

                        }
                    }
                },
            });

            var resul = this.popupResul.find(x => x.COD == this.arrayInterpretacion.RESULTADO)
            var $_this = this
            dialogo.on('shown.bs.modal', function (e) {
                $('.modal-content').css({ 'width': '1100px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })

                $('#validarInst_hc012').hide()
                $('#validarIPS_hc012').hide()

                _toggleF8([{
                    input: 'IPS', app: 'hc012', funct: (e) => {
                        if (e.type == "keydown" && e.which == 119 || e.type == 'click') $_this.ventanaIPS()
                    }
                }])

                $('#resultado_hc012').val(resul.COD + '. ' + resul.DESCRIP)
                $_this.arrayInterpretacion.INTERPRETACION = $_this.arrayInterpretacion.INTERPRETACION.replace(/\&/g, "\n").trim()
                $('#interpretacion_hc012').val($_this.arrayInterpretacion.INTERPRETACION)

                if ($_this.tablaDer_interpretaciones[$_this.posicionDer].CUP.trim() == '906249' || $_this.tablaDer_interpretaciones[$_this.posicionDer].CUP.trim() == '906250') {
                    $('#asesoriaVIH_hc012').val($_this.arrayInterpretacion.ANO_ASE_VIH.trim() == '0000' ? 'N' : 'S')
                    $('#anoVIH_hc012').val($_this.arrayInterpretacion.ANO_ASE_VIH.trim() == '0000' ? '' : $_this.arrayInterpretacion.ANO_ASE_VIH.trim())
                    $('#mesVIH_hc012').val($_this.arrayInterpretacion.MES_ASE_VIH.trim() == '00' ? '' : $_this.arrayInterpretacion.MES_ASE_VIH.trim())
                    $('#diaVIH_hc012').val($_this.arrayInterpretacion.DIA_ASE_VIH.trim() == '00' ? '' : $_this.arrayInterpretacion.DIA_ASE_VIH.trim())
                } else {
                    $('#validarAsesoria_hc012').hide()
                    $('#validarAno_hc012').hide()
                    $('#validarMes_hc012').hide()
                    $('#validarDia_hc012').hide()
                }

                $_this.validarInterpretacion()
            });
        },
        validarInterpretacion() {
            validarInputs(
                {
                    form: "#validarInterpretacion_hc012",
                    orden: '1'
                },
                () => {
                    this.arrayInterpretacion.INTERPRETACION = $('#interpretacion_hc012').val().trim()

                    $('[data-bb-handler="main"]').click()

                    if (this.tablaDer_interpretaciones[this.posicionDer].INTERPRETADO == '6' || this.tablaDer_interpretaciones[this.posicionDer].INTERPRETADO.trim() == '') {
                        setTimeout(this.popupResultado, 500)
                    } else {
                        this.arrayInterpretacion = {}
                        this.enterDer = null
                        this.mostrarTablaDerecha(this.posicionIzq)
                        this.focoTablaDer(this.posicionDer)
                    }
                },
                () => {
                    this.arrayInterpretacion.INTERPRETACION = $('#interpretacion_hc012').val().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ').trim()

                    this.arrayInterpretacion.INTERPRETACION = this.arrayInterpretacion.INTERPRETACION.replace(/(\r\n|\n|\r)/gm, "&")

                    if (this.tablaDer_interpretaciones[this.posicionDer].INTERPRETADO == '6' || this.tablaDer_interpretaciones[this.posicionDer].INTERPRETADO.trim() == '') {

                        if (this.tablaDer_interpretaciones[this.posicionDer].CUP.trim() == '906249' || this.tablaDer_interpretaciones[this.posicionDer].CUP.trim() == '906250') {
                            this.validarAsesoria()
                        } else {
                            this.validarUltimoInter()
                        }

                    } else {
                        $('[data-bb-handler="main"]').click()
                        this.arrayInterpretacion = {}
                        this.enterDer = null
                        this.mostrarTablaDerecha(this.posicionIzq)
                        this.focoTablaDer(this.posicionDer)
                    }

                }
            )
        },
        validarUltimoInter() {
            this.itemsSinInterpretar = this.tablaDer_interpretaciones.filter(x => x.INTERPRETADO == '6' || x.INTERPRETADO.trim() == '')

            if (this.itemsSinInterpretar.length == 1) {
                this.posicionSinInter = this.tablaDer_interpretaciones.findIndex(x => x.CUP.trim() == this.itemsSinInterpretar[0].CUP.trim())

                if (this.posicionSinInter == this.posicionDer) {
                    $('#validarInst_hc012').show()
                    $('#validarIPS_hc012').show()
                    this.traerIps()
                } else {
                    this.GuardarInterpretacion()
                }

            } else {
                this.GuardarInterpretacion()
            }

        },
        GuardarInterpretacion(dato) {
            CON851P('01', () => {
                if (dato == 'IPS') {
                    this.validarInst_realizo()
                } else {
                    this.validarInterpretacion()
                }
            }, () => {
                loader('show')
                this.datosGuardado['datosh'] = datosEnvio()
                this.datosGuardado['llave'] = this.tablaIzq_interpretaciones[this.posicionIzq].LLAVE
                this.datosGuardado['cup'] = espaciosDer(this.tablaDer_interpretaciones[this.posicionDer].CUP, 12)
                this.datosGuardado['posicion'] = this.tablaDer_interpretaciones[this.posicionDer].POSICION
                this.datosGuardado['INTERPRETACION'] = this.arrayInterpretacion.INTERPRETACION
                this.datosGuardado['RESULTADO'] = this.arrayInterpretacion.RESULTADO
                this.datosGuardado['MEDICO'] = $_REG_PROF.IDENTIFICACION.trim()
                this.datosGuardado['REALIZO_ACA'] = this.arrayInterpretacion.REALIZO_ACA
                if (this.arrayInterpretacion.REALIZO_ACA == 'S') this.datosGuardado['FECHA_ASE_VIH'] = this.arrayInterpretacion.ANO_ASE_VIH + this.arrayInterpretacion.MES_ASE_VIH + this.arrayInterpretacion.DIA_ASE_VIH
                this.datosGuardado['INST'] = this.arrayInterpretacion.INST
                if (this.arrayInterpretacion.INST == 'S') this.datosGuardado['IPS'] = this.arrayInterpretacion.IPS
                console.log(this.datosGuardado)

                postData(this.datosGuardado, get_url("APP/HICLIN/HC012-03.DLL"))
                    .then((data) => {
                        loader('hide')
                        CON851('', 'Interpretacion guardada', null, 'success', 'Correcto');
                        $('[data-bb-handler="main"]').click()
                        this.tablaDer_interpretaciones[this.posicionDer].INTERPRETADO = JSON.parse(JSON.stringify(this.arrayInterpretacion.RESULTADO))
                        this.tablaIzq_interpretaciones[this.posicionIzq].TABLA[this.posicionDer].INTERPRETADO = JSON.parse(JSON.stringify(this.arrayInterpretacion.RESULTADO))
                        console.log(this.tablaDer_interpretaciones[this.posicionDer].INTERPRETADO)
                        this.arrayInterpretacion = null
                        this.enterDer = null
                        this.mostrarTablaDerecha(this.posicionIzq)
                        this.focoTablaDer(this.posicionDer)
                    })
                    .catch(error => {
                        console.error(error)
                        loader('hide')
                    });
            })
        },
        ventanaIPS() {
            _ventanaDatos({
                titulo: "Ventana De IPS",
                columnas: ["COD", "DESCRIP", "CIUDAD", "TEL", "FUNCIONARIO"],
                data: this.arrayIps,
                ancho: '90%',
                callback_esc: function () {
                    $("#IPS_hc012").focus()
                },
                callback: function (data) {
                    $("#IPS_hc012").val(data.COD.trim())
                    _enterInput('#IPS_hc012');
                }
            });

        },
        traerIps() {
            $this = this
            obtenerDatosCompletos({ nombreFd: 'IPS' }, function (data) {
                $this.arrayIps = data.IPS;
                $this.arrayIps.pop();
                console.log($this.arrayIps)
                $this.validarInst_realizo()
            }, 'ONLY');
        },
        validarInst_realizo() {
            validarInputs(
                {
                    form: "#validarInst_hc012",
                    orden: '1'
                },
                () => {
                    this.validarInterpretacion()
                },
                () => {
                    this.arrayInterpretacion.INST = $("#inst_hc012").val().toUpperCase().trim() != 'S' ? "N" : "S"
                    $("#inst_hc012").val(this.arrayInterpretacion.INST)

                    if (this.arrayInterpretacion.INST == 'N') {
                        this.validarIPS()
                    } else {
                        this.arrayInterpretacion.IPS = ''
                        $('#IPS_hc012').val('')

                        this.GuardarInterpretacion('IPS')
                    }
                }
            )
        },
        validarIPS() {
            validarInputs(
                {
                    form: "#validarIPS_hc012",
                    orden: '1'
                },
                () => {
                    this.validarInst_realizo()
                },
                () => {
                    this.arrayInterpretacion.IPS = cerosIzq($("#IPS_hc012").val().trim(), 12)
                    $("#IPS_hc012").val(this.arrayInterpretacion.IPS)

                    this.busquedaIPS = this.arrayIps.find(x => x.COD.trim() == this.arrayInterpretacion.IPS)

                    if (this.busquedaIPS) {
                        CON851('', this.busquedaIPS.DESCRIP, null, 'success', 'IPS');
                        setTimeout(() => this.GuardarInterpretacion('IPS'), 300)
                    } else {
                        CON851('01', 'No existe IPS', null, 'error', 'error');
                        this.validarIPS()
                    }
                }
            )
        },
        validarAsesoria() {
            validarInputs(
                {
                    form: "#validarAsesoria_hc012",
                    orden: '1'
                },
                () => {
                    this.validarInterpretacion()
                },
                () => {
                    this.arrayInterpretacion.REALIZO_ACA = $("#asesoriaVIH_hc012").val().toUpperCase().trim() != 'S' ? "N" : "S"
                    $("#asesoriaVIH_hc012").val(this.arrayInterpretacion.REALIZO_ACA)

                    if (this.arrayInterpretacion.REALIZO_ACA == 'S') {
                        this.validarDia()
                    } else {
                        this.arrayInterpretacion.DIA_ASE_VIH = '00'
                        this.arrayInterpretacion.MES_ASE_VIH = '00'
                        this.arrayInterpretacion.ANO_ASE_VIH = '0000'

                        $('#diaVIH_hc012').val('')
                        $('#mesVIH_hc012').val('')
                        $('#anoVIH_hc012').val('')

                        this.validarUltimoInter()
                    }
                }
            )
        },
        validarDia() {
            validarInputs(
                {
                    form: "#validarDia_hc012",
                    orden: '1'
                },
                () => {
                    this.validarAsesoria()
                },
                () => {
                    this.arrayInterpretacion.DIA_ASE_VIH = cerosIzq($("#diaVIH_hc012").val().trim(), 2)
                    $("#diaVIH_hc012").val(this.arrayInterpretacion.DIA_ASE_VIH)

                    if (parseInt(this.arrayInterpretacion.DIA_ASE_VIH) < 1 || parseInt(this.arrayInterpretacion.DIA_ASE_VIH) > 31) {
                        CON851('37', '37', null, 'error', 'error')
                        this.validarDia()
                    } else {
                        this.validarMes()
                    }
                }
            )
        },
        validarMes() {
            validarInputs(
                {
                    form: "#validarMes_hc012",
                    orden: '1'
                },
                () => {
                    this.validarDia()
                },
                () => {
                    this.arrayInterpretacion.MES_ASE_VIH = cerosIzq($("#mesVIH_hc012").val().trim(), 2)
                    $("#mesVIH_hc012").val(this.arrayInterpretacion.MES_ASE_VIH)

                    if (parseInt(this.arrayInterpretacion.MES_ASE_VIH) < 1 || parseInt(this.arrayInterpretacion.MES_ASE_VIH) > 12) {
                        CON851('37', '37', null, 'error', 'error')
                        this.validarMes()
                    } else {
                        this.validarAño()
                    }
                }
            )
        },
        validarAño() {
            validarInputs(
                {
                    form: "#validarAno_hc012",
                    orden: '1'
                },
                () => {
                    this.validarMes()
                },
                () => {
                    this.arrayInterpretacion.ANO_ASE_VIH = cerosIzq($("#anoVIH_hc012").val().trim(), 4)
                    $("#anoVIH_hc012").val(this.arrayInterpretacion.ANO_ASE_VIH)

                    if (parseInt(this.arrayInterpretacion.ANO_ASE_VIH) < 2019) {
                        CON851('37', '37', null, 'error', 'error')
                        this.validarAño()
                    } else {
                        this.validarUltimoInter()
                    }
                }
            )
        },
        salir_HC012() {
            this.tablaIzq_interpretaciones = []
            this.tablaDer_interpretaciones = []
            this.posicionIzq = null
            this.posicionDer = null
            this.enterDer = null
            this.enterIzq = null
            _regresar_menuhis()
        }
    }
})