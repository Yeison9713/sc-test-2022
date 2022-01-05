// 2021-05-21 : CAMILO FRANCO - > ACTUALIZACION A VUE JS

const { relativeTimeThreshold } = require("moment");

new Vue({
    el: '#SER109',
    data: {
        form: {
            prefijo_SER109: '',
            entidad_SER109: '',
            entidadd_SER109: '',
            paciente_SER109: '',
            paciented_SER109: '',
            observacion_SER109: '',
            anexos_SER109: '',
            bloqueofactura_SER109: '',
            añoimpresion_SER109: '',
            mesimpresion_SER109: '',
            diaimpresion_SER109: '',
            valorceros_SER109: '',
            ordenarservicio_SER109: '',
            vlrunitario_SER109: '',
            añoimpresion_SER109: '',
            mesimpresion_SER109: '',
            diaimpresion_SER109: '',
            drogueria_SER109: '',
            mostrarcomprobante_SER109: '',
            mostrarfecha_SER109: '',
            cambiarfecha_SER109: '',
            cambiarfechaatencion_SER109: '',
            autorizacion_SER109: '',
            codigodroga_SER109: '',
            nombremedico_SER109: '',
            facturaoriginal_SER109: '',
            cupsporsoat_SER109: '',
            fechaxservi_SER109: '',
            facturavacia_SER109: '',
            valorsalmin_SER109: '',
            topepoliza_SER109: '',
            totalfact_SER109: '',
        },
        SER109: [],
        estado_loader: false,
        progreso: {},
        label_loader: null,
        loader: 1,
    },
    components: {
        loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
    },
    created() {
        nombreOpcion('9,7,4,3,1 - Imprimir fact. orden paciente');
        let _this = this;
        _toggleNav();
        _inputControl('disabled');
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, (data) => {
            loader('hide')
            data = data.PREFIJOS;
            _this.SER109.PREFIJOS = data
            this._evaluarprefijo_SER109()
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, (data) => {
                data = data.FIRMAS;
                _this.SER109.FIRMAS = data;
            })
        })
    },
    methods: {
        _evaluarprefijo_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR1_SER109',
                    orden: '1'
                },
                _toggleNav,
                () => {
                    this.form.prefijo_SER109 = this.form.prefijo_SER109.toUpperCase()
                    let prefijos = this.SER109.PREFIJOS[0].TABLA

                    let prefijo = prefijos.filter(data => data.PREFIJO.trim() == this.form.prefijo_SER109.trim())
                    if (prefijo.length > 0) {
                        return postData(
                            {
                                datosh: `${datosEnvio()}9${this.form.prefijo_SER109}|`
                            },
                            get_url('APP/CONTAB/CON007.DLL')
                        )
                            .then((data) => {
                                data = data.split('|');
                                numerofacturaMask_SER109.typedValue = (parseInt(data[1].substring(3, 9)) - 1).toString();
                                this._evaluarnumeroprefijo_SER109();
                            })
                            .catch((error) => {
                                console.error(error);
                                this._evaluarprefijo_SER109();
                            })
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarprefijo_SER109()
                }
            );
        },
        _evaluarnumeroprefijo_SER109() {
            loader('hide')
            validarInputs(
                {
                    form: '#VALIDAR2_SER109',
                    orden: '1'
                },
                this._evaluarprefijo_SER109,
                () => {
                    this.SER109.LLAVEW = `${this.form.prefijo_SER109}${numerofacturaMask_SER109.value.padStart(6, '0')}`
                    loader('show')
                    _ImpresionesActualizarCopagosV2(
                        { LLAVENUM: this.SER109.LLAVEW },
                        this._validarfactura_SER109,
                        this._evaluarnumeroprefijo_SER109
                    )
                }
            )
        },
        _validarfactura_SER109(numeracion, valoressoat) {
            loader('hide');
            this.SER109.NUMERACION = numeracion
            this.SER109.NUMERACION.FECHA_PRE = this.SER109.NUMERACION.FECHA_PRE.padStart(8, '0')
            this.SER109.NUMERACION.FECHA_RET = this.SER109.NUMERACION.FECHA_RET.padStart(8, '0')
            if (this.SER109.NUMERACION.TIPOPACI_NUM == 'X') this.SER109.NUMERACION.TIPOPACI_NUM == '*'
            this.form.entidad_SER109 = parseInt(this.SER109.NUMERACION.NIT_NUM).toString()
            this.form.entidadd_SER109 = this.SER109.NUMERACION.DESCRIP_NUM
            this.form.paciente_SER109 = parseInt(this.SER109.NUMERACION.IDPAC_NUM).toString()
            this.form.paciented_SER109 = this.SER109.NUMERACION.PACIENTE_NUM
            let estado = { 0: 'ACTIVO', 1: 'CERRADA', 2: 'ANULADA', 3: 'BLOQUEADA' }
            this.form.estadofactura_SER109 = this.SER109.NUMERACION.ESTADO_NUM
            this.form.estadofactura_SER109 = `${this.form.estadofactura_SER109} - ${estado[this.form.estadofactura_SER109]}`
            this.form.observacion_SER109 = this.SER109.NUMERACION.OBSERV_NUM
            this.form.anexos_SER109 = this.SER109.NUMERACION.ANEXOS_NUM
            let saldo = parseInt(this.SER109.NUMERACION.TOTAL_NUM.trim().padStart(16, '0')) - parseInt(this.SER109.NUMERACION.VLRTOTALABON.trim().padStart(16, '0'))
            saldofacturaMask_SER109.typedValue = saldo.toString()
            this.form.añoimpresion_SER109 = this.SER109.NUMERACION.FECHA_PRE.substring(0, 4)
            this.form.mesimpresion_SER109 = this.SER109.NUMERACION.FECHA_PRE.substring(4, 6)
            this.form.diaimpresion_SER109 = this.SER109.NUMERACION.FECHA_PRE.substring(6, 8)
            if (parseInt(this.SER109.NUMERACION.FECHA_PRE.substring(4, 6)) == 0) {
                let fechaactual = moment().format('YYYYMMDD');
                this.form.añoimpresion_SER109 = fechaactual.substring(0, 4)
                this.form.mesimpresion_SER109 = fechaactual.substring(4, 6)
                this.form.diaimpresion_SER109 = fechaactual.substring(6, 8)
                if (this.SER109.NUMERACION.FECHA_RET.substring(4, 6) > 0) {
                    this.form.añoimpresion_SER109 = this.SER109.NUMERACION.FECHA_RET.substring(0, 4)
                    this.form.mesimpresion_SER109 = this.SER109.NUMERACION.FECHA_RET.substring(4, 6)
                    this.form.diaimpresion_SER109 = this.SER109.NUMERACION.FECHA_RET.substring(6, 8)
                }
            }
            if (this.form.prefijo_SER109 == 'T') {
                $('#VALORESSOAT_SER109').removeClass('hidden')
                if (this.SER109.NUMERACION.NROPOL_NUM) CON851('', 'Falta diligenciar numero de poliza', null, 'error', 'Error')
                this.form.valorsalmin_SER109 = valoressoat.SALMIN
                this.form.topepoliza_SER109 = valoressoat.TOPE
                this.form.totalfact_SER109 = valoressoat.TOTAL
            }
            this._valoresinciales_SER109();
            if (this.SER109.NUMERACION.ESTADO_NUM == '0' || this.SER109.NUMERACION.ESTADO_NUM == '3') return this._evaluarobservacion_SER109('1')
            if (this.SER109.NUMERACION.LISTARIPS == 'S') {
                // return jAlert({ titulo: 'Notificacion', mensaje: `Factura: ${this.SER109.LLAVEW} Se encuenta lista para rips!` }, this._evaluarvlrenceros_SER109)
                this.SER109.VENTANAID = 'LISTAPARARIPS_SER109'
                _ventanaalterna_SALUD(
                    (data = {
                        ID: this.SER109.VENTANAID,
                        titulo: 'NOTIFICACION',
                        html: `
                                <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto; display: flex; justify-content: center;">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <label class="col-md-12 col-sm-12 col-xs-12 control-label"> ${this.form.prefijo_SER109}${numerofacturaMask_SER109.value.padStart(6, '0')} Factura Lista para RIPS </label>
                                    </div>
                                </div>
                            `,
                        tamaño: 'col-md-4 col-sm-4 col-xs-4'
                    })
                )
                return setTimeout(() => {
                    this._evaluarvlrenceros_SER109()
                    $(`#${this.SER109.VENTANAID}`).remove()
                }, 1000)
            }
            this._evaluarvlrenceros_SER109()
        },
        _evaluarobservacion_SER109(orden) {
            validarInputs(
                {
                    form: '#VALIDAR3_SER109',
                    orden: orden
                },
                () => {
                    $('#VALORESSOAT_SER109').addClass('hidden')
                    this._evaluarnumeroprefijo_SER109()
                },
                () => {
                    this.form.bloqueofactura_SER109 = 'N'
                    if (this.SER109.NUMERACION.ESTADO_NUM == '3') {
                        return this._grabarnumeracion_SER109();
                    }
                    this._evaluarbloqueofactura_SER109();
                }
            );
        },
        _evaluarbloqueofactura_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR4_SER109',
                    orden: '1'
                },
                () => {
                    this._evaluarobservacion_SER109('2');
                },
                () => {
                    this._valoresinciales_SER109();
                    this.form.bloqueofactura_SER109 = this.form.bloqueofactura_SER109.toUpperCase();
                    if (this.form.bloqueofactura_SER109.trim() != 'S' && this.form.bloqueofactura_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarbloqueofactura_SER109()
                    }
                    if (this.form.bloqueofactura_SER109 == 'S') {
                        this.form.estadofactura_SER109 = '3 - BLOQUEADA';
                        this.SER109.OPERBLOQNUM = localStorage.Usuario;
                    }
                    this._grabarnumeracion_SER109();
                }
            );
        },
        _grabarnumeracion_SER109() {
            if (
                this.form.observacion_SER109.trim() != this.SER109.NUMERACION.OBSERV_NUM.trim() ||
                this.form.anexos_SER109.trim() != this.SER109.NUMERACION.ANEXOS_NUM.trim() ||
                this.form.estadofactura_SER109.substring(0, 1) != this.SER109.NUMERACION.ESTADO_NUM
            ) {
                postData(
                    { datosh: `${datosEnvio()}2|${$_USUA_GLOBAL[0].COD_CIUD}|${this.SER109.LLAVEW}|${this.form.observacion_SER109}|${this.form.anexos_SER109}|${this.form.estadofactura_SER109.substring(0, 1)}||||||${localStorage.getItem('Usuario')}|` },
                    get_url('APP/SALUD/SER109D.DLL')
                )
                    .then((data) => {
                        this._evaluarvlrenceros_SER109();
                    })
                    .catch((error) => {
                        console.error(error);
                        this._evaluarnumeroprefijo_SER109();
                    });
            } else this._evaluarvlrenceros_SER109();
        },
        _valoresinciales_SER109() {
            this.form.valorceros_SER109 = 'N'
            this.form.ordenarservicio_SER109 = 'N'
            this.form.vlrunitario_SER109 = 'S'
            this.form.drogueria_SER109 = 'S'
            this.form.mostrarcomprobante_SER109 = 'S'
            this.form.mostrarfecha_SER109 = 'S'
            this.form.cambiarfecha_SER109 = 'N'
            this.form.cambiarfechaatencion_SER109 = 'N'
            this.form.autorizacion_SER109 = 'S'
            this.form.codigodroga_SER109 = '2'
            this.form.nombremedico_SER109 = 'N'
        },
        _evaluarvlrenceros_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR5_SER109',
                    orden: '1'
                },
                this._evaluarnumeroprefijo_SER109,
                () => {
                    this.form.valorceros_SER109 = this.form.valorceros_SER109.toUpperCase();
                    if (this.form.valorceros_SER109.trim() != 'S' && this.form.valorceros_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarvlrenceros_SER109()
                    }
                    this._evaluarporservicio_SER109()
                }
            );
        },
        _evaluarporservicio_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR6_SER109',
                    orden: '1'
                },
                this._evaluarvlrenceros_SER109,
                () => {
                    this.form.ordenarservicio_SER109 = this.form.ordenarservicio_SER109.toUpperCase();
                    if (this.form.ordenarservicio_SER109.trim() != 'S' && this.form.ordenarservicio_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarporservicio_SER109()
                    }
                    this._evaluarvalorunitario_SER109()
                }
            );
        },
        _evaluarvalorunitario_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR7_SER109',
                    orden: '1'
                },
                this._evaluarporservicio_SER109,
                () => {
                    this.form.vlrunitario_SER109 = this.form.vlrunitario_SER109.toUpperCase();
                    if (this.form.vlrunitario_SER109.trim() != 'S' && this.form.vlrunitario_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarvalorunitario_SER109()
                    }
                    this._evaluarañoimpresion_SER109()
                }
            );
        },
        _evaluarañoimpresion_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR8_SER109',
                    orden: '1'
                },
                this._evaluarvalorunitario_SER109,
                () => {
                    if (isNaN(this.form.añoimpresion_SER109)) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarañoimpresion_SER109()
                    }
                    this._evaluarmesimpresion_SER109()
                }
            );
        },
        _evaluarmesimpresion_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR9_SER109',
                    orden: '1'
                },
                this._evaluarañoimpresion_SER109,
                () => {
                    if (isNaN(this.form.mesimpresion_SER109)) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluarmesimpresion_SER109()
                    }
                    this._evaluardiaimpresion_SER109()
                }
            );
        },
        _evaluardiaimpresion_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR10_SER109',
                    orden: '1'
                },
                this._evaluarmesimpresion_SER109,
                () => {
                    if (isNaN(this.form.diaimpresion_SER109)) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluardiaimpresion_SER109()
                    }
                    if (moment(`${this.form.añoimpresion_SER109}${this.form.mesimpresion_SER109}${this.form.diaimpresion_SER109}`, 'YYYYMMDD').format('YYYYMMDD').trim() == 'Fecha inválida') {
                        CON851('', 'Revise fecha', null, 'error', 'Error')
                        return this._evaluardiaimpresion_SER109()
                    }
                    this._evaluardiscriminardrogueria_SER109()
                }
            );
        },
        _evaluardiscriminardrogueria_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR11_SER109',
                    orden: '1'
                },
                this._evaluardiaimpresion_SER109,
                () => {
                    this.form.drogueria_SER109 = this.form.drogueria_SER109.toUpperCase();
                    if (this.form.drogueria_SER109.trim() != 'S' && this.form.drogueria_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluardiscriminardrogueria_SER109()
                    }
                    this._evaluarordenarporservicio_SER109()
                }
            )
        },
        _evaluarordenarporservicio_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR12_SER109',
                    orden: '1'
                },
                this._evaluardiscriminardrogueria_SER109,
                () => {
                    this.form.mostrarcomprobante_SER109 = this.form.mostrarcomprobante_SER109.toUpperCase();
                    if (this.form.mostrarcomprobante_SER109.trim() != 'S' && this.form.mostrarcomprobante_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarordenarporservicio_SER109()
                    }
                    this._evaluarfechamedicamentos_SER109()
                }
            )
        },
        _evaluarfechamedicamentos_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR13_SER109',
                    orden: '1'
                },
                this._evaluarordenarporservicio_SER109,
                () => {
                    this.form.mostrarfecha_SER109 = this.form.mostrarfecha_SER109.toUpperCase();
                    if (this.form.mostrarfecha_SER109.trim() != 'S' && this.form.mostrarfecha_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarfechamedicamentos_SER109()
                    }
                    this._evaluarfechacomprobanteanterior_SER109()
                }
            )
        },
        _evaluarfechacomprobanteanterior_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR14_SER109',
                    orden: '1'
                },
                this._evaluarfechamedicamentos_SER109,
                () => {
                    this.form.cambiarfecha_SER109 = this.form.cambiarfecha_SER109.toUpperCase();
                    if (this.form.cambiarfecha_SER109.trim() != 'S' && this.form.cambiarfecha_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarfechacomprobanteanterior_SER109()
                    }
                    this._evaluarfechaatencion_SER109()
                }
            )
        },
        _evaluarfechaatencion_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR15_SER109',
                    orden: '1'
                },
                this._evaluarfechacomprobanteanterior_SER109,
                () => {
                    this.form.cambiarfechaatencion_SER109 = this.form.cambiarfechaatencion_SER109.toUpperCase();
                    if (this.form.cambiarfechaatencion_SER109.trim() != 'S' && this.form.cambiarfechaatencion_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarfechaatencion_SER109()
                    }
                    this._evaluarmostrarautorizacion_SER109()
                }
            )
        },
        _evaluarmostrarautorizacion_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR16_SER109',
                    orden: '1'
                },
                this._evaluarfechaatencion_SER109,
                () => {
                    this.form.autorizacion_SER109 = this.form.autorizacion_SER109.toUpperCase();
                    if (this.form.autorizacion_SER109.trim() != 'S' && this.form.autorizacion_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        this._evaluarmostrarautorizacion_SER109()
                    } else this._evaluarmedicamentocodigo_SER109();
                }
            )
        },
        _evaluarmedicamentocodigo_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR17_SER109',
                    orden: '1'
                },
                this._evaluarmostrarautorizacion_SER109,
                () => {
                    this.form.codigodroga_SER109 = this.form.codigodroga_SER109.toUpperCase();
                    if (this.form.codigodroga_SER109.trim() != '1' && this.form.codigodroga_SER109.trim() != '2' && this.form.codigodroga_SER109.trim() != '3') {
                        CON851('Error', 'Digite 1. 229 / 2.ATC / 3.CUM', null, 'error', 'Error')
                        this._evaluarmedicamentocodigo_SER109()
                    } else this._consultarcomprobantes_SER109();
                }
            )
        },
        async _consultarcomprobantes_SER109() {
            let datos_envio = [
                this.SER109.LLAVEW,
                this.form.mostrarfecha_SER109,
                this.form.drogueria_SER109,
                this.form.cambiarfecha_SER109,
                this.form.cambiarfechaatencion_SER109,
                this.form.mostrarcomprobante_SER109,
                this.form.ordenarservicio_SER109,
                this.form.autorizacion_SER109,
                this.form.valorceros_SER109,
                this.form.codigodroga_SER109,
                localStorage.Usuario.trim()
            ]
            this.estado_loader = true
            this.loader = true
            this.label_loader = 'Consultando comprobantes'
            this.progreso = { transferred: 0, speed: 0 }
            this.procesar_envio(datos_envio).then((res) => {
                console.log(res)
                this.loader = false
                this.label_loader = `Consulta finalizada`
                this.progreso.completado = true
                this.estado_loader = false
                setTimeout(this._evaluarlistarnombremedico_SER109, 700)
            })
                .catch(err => {
                    if (err.MENSAJE == '08') {
                        $('#VALIDAR22_SER109').removeClass('hidden');
                        this.form.facturavacia_SER109 = 'N'
                        this.estado_loader = false
                        this._evaluarimprimirvacia_SER109();
                    } else this._evaluarmedicamentocodigo_SER109();
                })
        },
        procesar_envio(datos_envio) {
            const _this = this
            console.log('aca')
            return new Promise((resolve, reject) => {
                let URL = get_url("APP/SALUD/SER109.DLL");
                postData({
                    datosh: datosEnvio() + datos_envio.join('|')
                }, URL, {
                    onProgress: (progress) => {
                        _this.progreso = progress
                    }
                })
                    .then(data => {
                        console.log('aca')
                        this.SER109.FACTURAS = data.FACTURA;
                        this.SER109.FACTURASSINDEVOLCIONES = [];
                        this.SER109.DEVOLUCIONES = [];
                        if (
                            this.form.mostrarcomprobante_SER109.trim() == 'S' &&
                            this.form.cambiarfechaatencion_SER109.trim() == 'S'
                        ) {
                            for (let datos of this.SER109.FACTURAS) {
                                if (datos.VALOR.indexOf('-') < 0) {
                                    this.SER109.FACTURASSINDEVOLCIONES.push(datos);
                                } else {
                                    this.SER109.DEVOLUCIONES.push(datos);
                                }
                            }
                            var negativo = this.SER109.DEVOLUCIONES.length;
                            var conteo = 0;
                            while (negativo > 0) {
                                negativo = this.SER109.DEVOLUCIONES.length;
                                if (conteo == 100) {
                                    CON851('', 'La factura tiene valores negativos', null, 'error', 'Error');
                                    this.estado_loader = false
                                    return _evaluarfiltrosimpresion_SER109('5');
                                }
                                for (let datos of this.SER109.FACTURASSINDEVOLCIONES) {
                                    for (let [index, restar] of this.SER109.DEVOLUCIONES.entries()) {
                                        if (datos.CUPS == restar.CUPS) {
                                            datos.VALOR = parseInt(datos.VALOR.replace(/,/g, '')) - parseInt(restar.VALOR.replace(/,/g, '').replace(/-/g, ''));
                                            if (datos.VALOR < 0) {
                                                restar.VALOR = cantidadesMask_SER109(datos.VALOR.toString());
                                                datos.VALOR = 0
                                            }
                                            datos.VALOR = cantidadesMask_SER109(datos.VALOR.toString());
                                            datos.CANTIDAD = parseInt(datos.CANTIDAD.replace(/,/g, '')) - parseInt(restar.CANTIDAD.replace(/,/g, '').replace(/-/g, ''));
                                            if (datos.CANTIDAD == 0) {
                                                restar.CANTIDAD = 0;
                                            }
                                            if (datos.CANTIDAD < 0) {
                                                restar.CANTIDAD = cantidadesMask_SER109(datos.CANTIDAD.toString());
                                                datos.CANTIDAD = 0
                                            }
                                            datos.CANTIDAD = cantidadesMask_SER109(datos.CANTIDAD.toString());
                                            if (restar.CANTIDAD == 0 || datos.CANTIDAD > 0) {
                                                this.SER109.DEVOLUCIONES.splice(index, 1)
                                            }
                                        }
                                    }
                                }
                                conteo++;
                            }
                            var result = this.SER109.FACTURASSINDEVOLCIONES.filter(datos => datos.CANTIDAD.trim() == '0.00');
                            result = result.length;
                            if (this.form.valorceros_SER109 == 'N') {
                                while (result > 0) {
                                    console.log(result);
                                    for (let [index, datos] of this.SER109.FACTURASSINDEVOLCIONES.entries()) {
                                        if (datos.CANTIDAD.trim() == '0.00') {
                                            this.SER109.FACTURASSINDEVOLCIONES.splice(index, 1);
                                            result--;
                                        }
                                    }
                                }
                                this.SER109.FACTURAS = this.SER109.FACTURASSINDEVOLCIONES;
                            }
                        }
                        resolve(data)
                    })
                    .catch(err => {
                        console.error('Ha ocurrido un error durante la consulta:', err)
                        reject(err)
                    })
            })
        },
        _evaluarlistarnombremedico_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR18_SER109',
                    orden: '1'
                },
                this._evaluarmedicamentocodigo_SER109,
                () => {
                    this.form.nombremedico_SER109 = this.form.nombremedico_SER109.toUpperCase();
                    if (this.form.nombremedico_SER109.trim() != 'S' && this.form.nombremedico_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarlistarnombremedico_SER109()
                    }
                    if ($_USUA_GLOBAL[0].NIT == 845000038) {
                        $('#VALIDAR20_SER109').removeClass('hidden')
                        return this._evaluarcupsporsoat_SER109()
                    }
                    this.form.facturaoriginal_SER109 = 'S'
                    this._evaluarfacturaoriginal_SER109()
                }
            )
        },
        _evaluarcupsporsoat_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR20_SER109',
                    orden: '1'
                },
                () => {
                    $('#VALIDAR20_SER109').addClass('hidden')
                    this._evaluarlistarnombremedico_SER109()
                },
                () => {
                    this.form.cupsporsoat_SER109 = this.form.cupsporsoat_SER109.toUpperCase();
                    if (this.form.cupsporsoat_SER109.trim() != 'S' && this.form.cupsporsoat_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarcupsporsoat_SER109()
                    }
                    this._validarcambiarfechaservi_SER109()
                }
            )
        },
        _validarcambiarfechaservi_SER109() {
            if (
                $_USUA_GLOBAL[0].NIT == 800162035 ||
                $_USUA_GLOBAL[0].NIT == 900405505 ||
                $_USUA_GLOBAL[0].NIT == 830511298
            ) {
                $('#VALIDAR21_SER109').removeClass('hidden')
                return this._evaluarcambiarfechaservi_SER109()
            }
            this._evaluarfacturaoriginal_SER109()
        },
        _evaluarcambiarfechaservi_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR21_SER109',
                    orden: '1'
                },
                () => {
                    $('#VALIDAR21_SER109').addClass('hidden')
                    this._evaluarcupsporsoat_SER109()
                },
                () => {
                    this.form.fechaxservi_SER109 = this.form.fechaxservi_SER109.toUpperCase();
                    if (this.form.fechaxservi_SER109.trim() != 'S' && this.form.fechaxservi_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarcambiarfechaservi_SER109()
                    }
                    this._evaluarfacturaoriginal_SER109()
                }
            )
        },
        _evaluarfacturaoriginal_SER109() {
            this.SER109.TOTBASECOPAGO = this.SER109.TOTCOPAGOFAME = this.SER109.TOTCTAMODFAME = 0;
            for (var i in this.SER109.FACTURAS) {
                let valor = parseInt(this.SER109.FACTURAS[i].VALOR.trim().replace(/,/g, '').replace(/ /g, ''));
                let copago = parseInt(this.SER109.FACTURAS[i].COPAGO.replace(/,/g, ''));
                if (isNaN(valor)) valor = 0;
                if (isNaN(copago)) copago = 0;
                if (this.SER109.NUMERACION.ACUERDO260.trim() == 'S') {
                    this.SER109.TOTBASECOPAGO = this.SER109.TOTBASECOPAGO + valor;
                } else {
                    if (this.SER109.FACTURAS[i].CUPS.trim() != '890701') {
                        this.SER109.TOTBASECOPAGO = this.SER109.TOTBASECOPAGO + valor;
                    }
                }
                if (
                    this.form.prefijo_SER109 != 'C' &&
                    this.form.prefijo_SER109 != 'E' &&
                    this.form.prefijo_SER109 != 'Ñ' &&
                    this.form.prefijo_SER109 != 'O' &&
                    this.form.prefijo_SER109 != 'T' &&
                    this.form.prefijo_SER109 != 'V' &&
                    this.form.prefijo_SER109 != 'X' &&
                    this.form.prefijo_SER109 != 'Y' &&
                    this.form.prefijo_SER109 != 'Z' &&
                    this.form.prefijo_SER109 != 'W'
                ) {
                    if (this.SER109.FACTURAS[i].TIPO_COPAGO == '1') {
                        if (this.SER109.FACTURAS[i].COPAGO.trim() != '' && copago != 0) {
                            this.SER109.TOTCOPAGOFAME = this.SER109.TOTCOPAGOFAME + copago;
                        }
                    } else if (this.SER109.FACTURAS[i].TIPO_COPAGO == '2') {
                        if (this.SER109.FACTURAS[i].COPAGO.trim() != '') {
                            this.SER109.TOTCTAMODFAME = this.SER109.TOTCTAMODFAME + copago;
                        }
                    } else {
                        if (this.SER109.FACTURAS[i].COPAGO.trim() != '') {
                            this.SER109.TOTCTAMODFAME = this.SER109.TOTCTAMODFAME + copago;
                        }
                    }
                }
                let nombrepac1, nombrepac2, apellido1pac, apellido2pac, idpaci
                let completo
                if (this.form.prefijo_SER109 == 'A') {
                    apellido1pac = this.SER109.FACTURAS[i].DETALLE.substring(0, 14)
                    apellido2pac = this.SER109.FACTURAS[i].DETALLE.substring(14, 29)
                    nombrepac1 = this.SER109.FACTURAS[i].DETALLE.substring(29, 41)
                    nombrepac2 = this.SER109.FACTURAS[i].DETALLE.substring(41, 53)
                    idpaci = this.SER109.FACTURAS[i].DETALLE.substring(53, 74)
                    completo = apellido1pac.trim() + ' ' + apellido2pac.trim() + ' ' + nombrepac1.trim() + ' ' + nombrepac2.trim()
                    this.SER109.FACTURAS[i].DETALLE = completo.padEnd(40, ' ') + ' ' + idpaci.trim()
                }
            }
            validarInputs(
                {
                    form: '#VALIDAR19_SER109',
                    orden: '1'
                },
                this._evaluarlistarnombremedico_SER109,
                () => {
                    this.form.facturaoriginal_SER109 = this.form.facturaoriginal_SER109.toUpperCase();
                    if (this.form.facturaoriginal_SER109.trim() != 'S' && this.form.facturaoriginal_SER109.trim() != 'N') {
                        CON851('Error', 'Digite S o N', null, 'error', 'Error')
                        return this._evaluarfacturaoriginal_SER109()
                    }
                    if (this.form.prefijo_SER109 == 'P') {
                        if (this.form.estadofactura_SER109.substring(0, 1) == '0' || this.form.estadofactura_SER109.substring(0, 1) == '3') {
                            return postData(
                                {
                                    datosh: `${datosEnvio()}${this.SER109.LLAVEW}|${this.SER109.NUMERACION.IDPAC_NUM}|${this.SER109.NUMERACION.PACIENTE_NUM.substring(0, 5)}|
                                            20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}|`
                                },
                                get_url('APP/SALUD/SER836E.DLL')
                            )
                                .then((data) => {
                                    this.SER109.COPAGOSACUMW = data.CONSULTA[0].COPAGO;
                                    console.log('copago')
                                    if (parseFloat(this.SER109.NUMERACION.PORCENTCOP_NUM) > 0) {
                                        return setTimeout(() => {
                                            _liquidacioncopagos_SALUD(
                                                this._datosimpresion_SER109,
                                                this._evaluarfacturaoriginal_SER109,
                                                (params = {
                                                    NUMERACION: this.SER109.NUMERACION,
                                                    LLAVE_NUM: this.SER109.LLAVEW,
                                                    TOTBASECOPAGO: this.SER109.TOTBASECOPAGO
                                                })
                                            );
                                        }, 300);
                                    }
                                    this._datosimpresion_SER109();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this._evaluarfacturaoriginal_SER109();
                                });
                        }
                        return this._datosimpresion_SER109();
                    }
                    this._datosimpresion_SER109();
                }
            )
        },
        _evaluarimprimirvacia_SER109() {
            validarInputs(
                {
                    form: '#VALIDAR22_SER109',
                    orden: '1'
                },
                () => {
                    _evaluarfiltrosimpresion_SER109('7');
                },
                () => {
                    if (this.form.facturavacia_SER109.trim() == 'S') {
                        this.form.facturaoriginal_SER109 = 'N'
                        this.SER109.FACTURAS = []
                        this.SER109.FACTURAS.push({ ARTICULO: '', CANTIDAD: '', CL: '', COD: '', COD_PACI: '', CONCEPTO: '', COPAGO: '', COSTO: '', CUM: '', CUPS: '', DETALLE: '', DV: '', EDAD: '', ESPEC: '', FECHA: '', FECHA_ING: '', IVA_ART: '', MEDICO: '', NIT: '', NOMBRE: '', NOM_ESPEC: '', NOM_MEDICO: '', NRO_AUTOR: '', NRO_AUTOR2: '', NRO_COMP: '', ORDEN: '', ORDEN_SUC: '', REFER: '', SEXO: '', SUC: '', VALOR: '', VALOR_UNIT: '' })
                        return this._datosimpresion_SER109()
                    }

                    _toggleNav()
                }
            );
        },
        _datosimpresion_SER109(data) {
            if (data) {
                if (data.COPAGO.trim() == '') data.COPAGO = '0';
                this.SER109.NUMERACION.COPAGOS_NUM = data.COPAGO;
                this.SER109.NUMERACION.PORCENTCOP_NUM = data.PORCENTAJE;
            }
            this.SER109.IMPRESION = new Object();
            if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                    this.SER109.IMPRESION.IVA = 'IVA Regimen Comun - Retenedor Iva';
                } else {
                    this.SER109.IMPRESION.IVA = 'IVA Regimen Comun';
                }
            } else if ($_USUA_GLOBAL[0].IVA_S == 'C') {
                if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                    this.SER109.IMPRESION.IVA = 'Somos Responsables de IVA - Actividad Excluida de IVA';
                } else {
                    this.SER109.IMPRESION.IVA = 'IVA Regimen Simplificado';
                }
            } else if ($_USUA_GLOBAL[0].IVA_S == 'N') {
                this.SER109.IMPRESION.IVA = 'No somos responsables de IVA';
            } else {
                this.SER109.IMPRESION.IVA = '';
            }
            this.SER109.IMPRESION.MARCAAGUA = '';
            if (this.SER109.NUMERACION.ESTADO_NUM == '0') this.SER109.IMPRESION.MARCAAGUA = 'ACTIVO';
            if (this.SER109.NUMERACION.ESTADO_NUM == '2') this.SER109.IMPRESION.MARCAAGUA = 'ANULADO';
            this.SER109.IMPRESION.TOTALIVA = 0;
            this.SER109.IMPRESION.TOTALCOPAGO = 0;
            if (this.SER109.FACTURAS.length > 0) {
                for (var i in this.SER109.FACTURAS) {
                    if ($_USUA_GLOBAL[0].NIT == 900264583 && this.SER109.FACTURAS[i].FECHA_ING != '000000') {
                        this.SER109.FACTURAS[i].FECHA = this.SER109.FACTURAS[i].FECHA_ING;
                    } else if (
                        $_USUA_GLOBAL[0].NIT == 800162035 &&
                        this.SER109.FACTURAS[i].NIT == '0830006404'
                    ) {
                        this.SER109.FACTURAS[i].FECHA = this.SER109.FACTURAS[i].FECHA_ING;
                    } else if (
                        ($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 900405505) &&
                        this.SER109.FECHASERW == 'S'
                    ) {
                        if (this.SER109.FACTURAS[i].FECHA_ING != '000000') {
                            this.SER109.FACTURAS[i].FECHA = this.SER109.FACTURAS[i].FECHA_ING;
                        }
                    }

                    if (!isNaN(parseInt(this.SER109.FACTURAS[i].IVA_ART.replace(/,/g, '')))) {
                        this.SER109.TOTALIVA =
                            this.SER109.TOTALIVA + parseInt(this.SER109.FACTURAS[i].IVA_ART.replace(/,/g, ''));
                    }
                    if (!isNaN(parseInt(this.SER109.FACTURAS[i].COPAGO))) {
                        this.SER109.IMPRESION.TOTALCOPAGO =
                            this.SER109.IMPRESION.TOTALCOPAGO + parseInt(this.SER109.FACTURAS[i].COPAGO);
                    }
                }
            }
            this.SER109.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT
            this.SER109.IMPRESION.LLAVE = this.SER109.LLAVEW
            let fechaimpresion = `${this.form.añoimpresion_SER109}${this.form.mesimpresion_SER109}${this.form.diaimpresion_SER109}`
            this.SER109.IMPRESION.FECHA = moment(fechaimpresion, 'YYYYMMDD', 'es', true).format('MMMM DD YYYY').toUpperCase()
            this.SER109.IMPRESION.NOMTER = this.SER109.NUMERACION.DESCRIP_NUM.replace(/\�/g, 'Ñ')
            this.SER109.IMPRESION.DIRECCTER = this.SER109.NUMERACION.DIRECC_TER
            this.SER109.IMPRESION.TELTER = parseInt(this.SER109.NUMERACION.TEL_TER).toString()
            this.SER109.IMPRESION.NITTER = parseInt(this.SER109.NUMERACION.NIT_NUM).toString()
            this.SER109.IMPRESION.DVTER = this.SER109.NUMERACION.DV_TER
            this.SER109.IMPRESION.CIUDADTER = this.SER109.NUMERACION.CIUDAD_TER
            let tipopac = {
                C: 'CONTRIBUTIVO',
                S: 'SUBSIDIADO',
                V: 'VINCULADO',
                P: 'PARTICULAR',
                O: 'OTRO TIPO',
                D: 'DESPLAZADO CONTRIBUTIV',
                E: 'DESPLAZADO SUBSIDIADO',
                F: 'DESPLAZADO VINCULADO',
                '*': 'TODOS'
            };
            this.SER109.IMPRESION.REGIMEN = 'EVENTO';
            this.SER109.IMPRESION.ZONA = this.SER109.NUMERACION.DESCRIP_ZONA;
            if (this.form.prefijo_SER109 == 'T' || this.form.prefijo_SER109 == 'P') this.SER109.IMPRESION.CLASEFACTURA = 'T';
            if (this.SER109.NUMERACION.FACTCAPIT_NUM == this.SER109.LLAVEW) this.SER109.IMPRESION.REGIMEN = 'CAPITA';
            this.SER109.IMPRESION.TIPOPACI = tipopac[this.SER109.NUMERACION.TIPOPACI_NUM];
            this.SER109.IMPRESION.AUTORIZA = this.SER109.NUMERACION.NROAUTORI_NUM;
            this.SER109.IMPRESION.NOMBREPACNUM = this.SER109.NUMERACION.PACIENTE_NUM;
            this.SER109.IMPRESION.IDPACNUM = this.SER109.NUMERACION.IDPAC_NUM;
            let edad = calcular_edad(this.SER109.NUMERACION.NACIPACI_NUM);
            this.SER109.IMPRESION.EDAD = `${edad.unid_edad}${edad.vlr_edad.toString().padStart(3, '0')}`;
            this.SER109.IMPRESION.DESCRIPTAR = this.SER109.NUMERACION.DESCRIP_TAR;
            this.SER109.IMPRESION.NROAFILPACI = this.SER109.NUMERACION.NROAFIL_PACI;
            this.SER109.IMPRESION.TIPOIDPACI = this.SER109.NUMERACION.TIPOID_PACI;
            this.SER109.IMPRESION.DIRECCPACI = this.SER109.NUMERACION.DIRECC_PACI;
            this.SER109.IMPRESION.CIUDADPACI = this.SER109.NUMERACION.CIUDAD_PACI;
            this.SER109.IMPRESION.EPSPACI = this.SER109.NUMERACION.EPS_PACI;
            this.SER109.IMPRESION.NOMBREENT = this.SER109.NUMERACION.DESCRIP_ENT;
            let original = {
                S: '*** ORIGINAL ***',
                N: '*** COPIA ***'
            };
            this.SER109.IMPRESION.ORIGINAL = original[this.form.facturaoriginal_SER109];
            let sexo = { F: 'Femenino', M: 'Masculino' };
            this.SER109.IMPRESION.SEXO = sexo[this.SER109.NUMERACION.SEXO_PACI.toUpperCase()];
            if (this.SER109.FACTURAS.length > 0) this.SER109.FACTURAS.pop();
            this.SER109.IMPRESION.FACTURAS = this.SER109.FACTURAS;
            this.SER109.IMPRESION.ANEXOSNUM = this.form.anexos_SER109.trim();
            this.SER109.IMPRESION.OBSERVNUM = this.form.observacion_SER109.trim();
            this.SER109.IMPRESION.OBSERVACION = '2';
            this.SER109.IMPRESION.NOMBREPDF =
                localStorage.getItem('Usuario').trim() + moment().format('YYMMDDHHss');

            this.SER109.IMPRESION.TOTAL = 0;
            if (this.SER109.FACTURAS.length > 0) {
                for (var i in this.SER109.FACTURAS) {
                    let articulo = parseInt(
                        this.SER109.FACTURAS[i].VALOR.trim().replace(/,/g, '').replace(/ /g, '0')
                    );
                    if (!isNaN(articulo)) {
                        this.SER109.IMPRESION.TOTAL = this.SER109.IMPRESION.TOTAL + articulo;
                    }
                }
                for (var i in this.SER109.FACTURAS) {
                    if (this.SER109.FACTURAS[i].ARTICULO.trim() == 'XXCAPI') {
                        this.SER109.FACTURAS[i].DETALLE = '';
                        this.SER109.FACTURAS[i].COPAGO = '';
                        this.SER109.FACTURAS[i].SEXO = '';
                        this.SER109.FACTURAS[i].EDAD = '';
                    }
                }
            } else {
                this.SER109.FACTURAS.push({
                    FECHA: '        ',
                    FECHA_ING: '        ',
                    ORDEN_SUC: '  ',
                    ORDEN: ' ',
                    SUC: '  ',
                    CL: ' ',
                    NRO_COMP: '      ',
                    EDAD: '    ',
                    SEXO: ' ',
                    NIT: '          ',
                    DETALLE: '                                           ',
                    COD_PACI: '               ',
                    NOMBRE: '                         ',
                    ESPEC: '   ',
                    UNID_SERV: '  ',
                    COD: '    ',
                    NRO_AUTOR: '                           ',
                    NRO_AUTOR2: '                           ',
                    COSTO: '    ',
                    TIPO_COPAGO: ' ',
                    COPAGO: '          ',
                    CONCEPTO: '                                               ',
                    CUPS: '                 ',
                    MEDICO: '          ',
                    VALOR: '                   ',
                    VALOR_UNIT: '                   ',
                    IVA_ART: '          ',
                    CANTIDAD: '                   ',
                    CUM: '               ',
                    ARTICULO: '                 ',
                    REFER: '               ',
                    DV: ' ',
                    NOM_MEDICO: '                                                  ',
                    NOM_ESPEC: '                                                  ',
                    TIPO_DR: ' '
                });
            }
            this.SER109.ABONOSW = 0;
            for (var i in this.SER109.NUMERACION.TABLA_ABON) {
                console.log('nuevo item', this.SER109.NUMERACION.TABLA_ABON[i].SECU_ABON);
                this.SER109.NUMERACION.TABLA_ABON[i].LOTEABON_NUM = this.SER109.NUMERACION.TABLA_ABON[i].SECU_ABON
                let abono = 0;
                let negativo = this.SER109.NUMERACION.TABLA_ABON[i].VLR_ABON.indexOf('-');
                abono = parseInt(
                    this.SER109.NUMERACION.TABLA_ABON[i].VLR_ABON.replace(/,/g, '').replace(/-/g, '')
                );
                if (isNaN(abono)) abono = 0;
                if (this.SER109.NUMERACION.TABLA_ABON[i].VLR_ABON.trim() != '') {
                    if (negativo >= 0) abono = abono * -1;

                    if ($_USUA_GLOBAL[0].NIT == 892000264) {
                      if (
                        this.SER109.NUMERACION.TABLA_ABON[i].SECU_ABON.slice(0, 2) == "4R" ||
                        this.SER109.NUMERACION.TABLA_ABON[i].SECU_ABON.slice(0, 2) == "5R"
                      ) {
                        this.SER109.ABONOSW = this.SER109.ABONOSW + abono;
                      }
                    } else {
                      this.SER109.ABONOSW = this.SER109.ABONOSW + abono;
                    }
                }
            }
            this.SER109.IMPRESION.PREFIJOW = this.form.prefijo_SER109;
            this.SER109.IMPRESION.COPAGONUM = this.SER109.NUMERACION.FORMACOPAG_NUM;
            this.SER109.IMPRESION.OPERNUM = this.SER109.NUMERACION.OPER_NUM;
            this.SER109.IMPRESION.OPERMODNUM = this.SER109.NUMERACION.OPERMOD_NUM;
            this.SER109.IMPRESION.OPERBLOQNUM = this.SER109.NUMERACION.OPERBLOQ_NUM;
            this.SER109.IMPRESION.ADMINW = localStorage.getItem('Usuario').trim();
            // this.SER109.IMPRESION.FECHAIMPRESION = `${this.form.añoimpresion_SER109}${this.form.mesimpresion_SER109}${this.form.diaimpresion_SER109}`;
            this.SER109.IMPRESION.FECHAIMPRESION = moment().format('YYYYMMDD')
            this.SER109.IMPRESION.FECHAOPER = moment(this.SER109.NUMERACION.FECHA_ING, 'YYYYMMDD').format(
                'YYMMDD'
            );
            if (this.SER109.IMPRESION.FECHAOPER == 'Fecha inválida') this.SER109.IMPRESION.FECHAOPER = '000000';
            this.SER109.IMPRESION.FECHAMODOPER = moment(this.SER109.NUMERACION.FECHAMOD_NUM, 'YYYYMMDD').format(
                'YYMMDD'
            );
            if (this.SER109.IMPRESION.FECHAMODOPER == 'Fecha inválida') this.SER109.IMPRESION.FECHAMODOPER = '000000';
            this.SER109.IMPRESION.FECHARETOPER = moment(this.SER109.NUMERACION.FECHARET_NUM, 'YYYYMMDD').format(
                'YYMMDD'
            );
            if (this.SER109.IMPRESION.FECHARETOPER == 'Fecha inválida') this.SER109.IMPRESION.FECHARETOPER = '000000';
            

            if ($_USUA_GLOBAL[0].NIT == 892000264) {
                this.SER109.IMPRESION.TABLARBOS_NUM = this.SER109.NUMERACION.TABLA_ABON.filter(el => el.SECU_ABON.slice(0, 2) == "4R" || el.SECU_ABON.slice(0, 2) == "5R");
            } else this.SER109.IMPRESION.TABLARBOS_NUM = this.SER109.NUMERACION.TABLA_ABON;
            
            if (this.form.prefijo_SER109 == 'P')
                this.SER109.IMPRESION.SALDOCOPAGO = parseInt(this.SER109.NUMERACION.COPAGOS_NUM.padStart(9, '0'));
            else this.SER109.IMPRESION.SALDOCOPAGO = parseInt(this.SER109.NUMERACION.COPAGOEST_NUM.padStart(9, '0'));
            this.SER109.IMPRESION.NITNUM = this.SER109.NUMERACION.NIT_NUM;
            this.SER109.IMPRESION.FORMACOPAGONUM = this.SER109.NUMERACION.FORMACOPAG_NUM;
            this.SER109.IMPRESION.TOTCTAMODFAME = this.SER109.TOTCTAMODFAME;
            this.SER109.IMPRESION.TOTCOPAGOFAME = this.SER109.TOTCOPAGOFAME;
            this.SER109.IMPRESION.ABONOSW = this.SER109.ABONOSW;
            this.SER109.IMPRESION.VLRTOTAL = this.SER109.IMPRESION.TOTAL;
            // SER109.IMPRESION.SALDO = SER109.IMPRESION.TOTAL + SER109.IMPRESION.ABONOSW - SER109.NUMERACION.CO_PAGO_NUM - SER109.TOTCOPAGOFAME - SER109.TOTCTAMODFAME;
            this.SER109.IMPRESION.SALDO =
                this.SER109.IMPRESION.TOTAL -
                this.SER109.IMPRESION.SALDOCOPAGO -
                this.SER109.TOTCOPAGOFAME -
                this.SER109.TOTCTAMODFAME +
                this.SER109.ABONOSW;
            if (isNaN(this.SER109.IMPRESION.SALDO)) this.SER109.IMPRESION.SALDO = 0
            let valorenletras = FAC146(this.SER109.IMPRESION.SALDO);
            this.SER109.IMPRESION.NUMEROENLETRAS = 'SON: ' + valorenletras;
            let prefijo = this.SER109.PREFIJOS[0].TABLA.filter(
                (x) => x.PREFIJO.trim() == this.form.prefijo_SER109.trim()
            );
            if (prefijo.length == 0) {
                prefijo[0] = new Object();
                prefijo[0].AUT_DIAN = '';
                prefijo[0].PREFIJO = this.form.prefijo_SER109;
                prefijo[0].DESDE_NRO = '';
                prefijo[0].HASTA_NRO = '';
                prefijo[0].FECHA_INI = '';
                prefijo[0].FECHA_FIN = '';
            }
            this.SER109.IMPRESION.PREFIJO = prefijo;
            this.SER109.IMPRESION.FORMATOTABLA = 1; // HABILITA ESTE FORMATO EN LA IMPRESION VER FUNCION _impresionformatoSER109 EN _impresionesSALUD.js
            this.SER109.IMPRESION.ANEXO = 2;
            this.SER109.IMPRESION.OBSERVACION = 2;

            this.SER109.IMPRESION.WIDTH = [
                //'5%',
                //'8%',
                //'19%',
                //'5%',
                //'4%',
                //'25%',
                //'3%',
                //'8%',
                //'8%',
                //'4%',
                //'8%',
                //'3%'

                '3%',
                '5%',
                '32%',
                '5%',
                '2%',
                '20%',
                '5%',
                '9%',
                '5%',
                '7%',
                '4%',
                '3%'
            ];
            this.SER109.IMPRESION.COLUMNAS = [
                'NRO_COMP',
                'FECHA',
                'DETALLE',
                'EDAD',
                'SEXO',
                'CONCEPTO',
                'CANTIDAD',
                'VALOR',
                'COPAGO',
                'NRO_AUTOR',
                'ARTICULO',
                'UNID_SERV'
            ];
            // if (this.form.prefijo_SER109 == 'T' || this.form.prefijo_SER109 == 'P') {
            if ( ["P", "O", "Q", "R", "S", "U", "T", "V", "W", "X", "Y", "Z"].includes(this.form.prefijo_SER109) ) {
                this.SER109.IMPRESION.FORMATOTABLA = 9;
                this.SER109.IMPRESION.WIDTH = ['5%', '8%', '30%', '7%', '10%', '10%', '8%', '7%', '15%'];
                this.SER109.IMPRESION.COLUMNAS = [
                    'NRO_COMP',
                    'FECHA',
                    'CONCEPTO',
                    'CANTIDAD',
                    'VALOR_UNIT',
                    'VALOR',
                    'ARTICULO',
                    'NRO_AUTOR',
                    'UNID_SERV'
                ];
            }
            if (this.SER109.IMPRESION.length > 2) this.SER109.IMPRESION.MARGIN = [10, 155, 10, 20];
            else this.SER109.IMPRESION.MARGIN = [10, 145, 10, 20];

            if (
                this.form.prefijo_SER109 == 'A' ||
                this.form.prefijo_SER109 == 'B' ||
                this.form.prefijo_SER109 == 'D' ||
                this.form.prefijo_SER109 == 'F' ||
                this.form.prefijo_SER109 == 'G' ||
                this.form.prefijo_SER109 == 'H' ||
                this.form.prefijo_SER109 == 'I' ||
                this.form.prefijo_SER109 == 'J' ||
                this.form.prefijo_SER109 == 'K' ||
                this.form.prefijo_SER109 == 'L' ||
                this.form.prefijo_SER109 == 'M' ||
                this.form.prefijo_SER109 == 'N'
            ) {
                if (this.form.nombremedico_SER109 == 'S') {
                    this.SER109.IMPRESION.estilohoja = 2;
                    this.SER109.IMPRESION.FORMATOTABLA = 5;
                    this.SER109.IMPRESION.WIDTH = [
                        '4%',
                        '4%',
                        '22%',
                        '3%',
                        '3%',
                        '20%',
                        '4%',
                        '7%',
                        '7%',
                        '5%',
                        '5%',
                        '6%',
                        '11%'
                    ];
                    this.SER109.IMPRESION.COLUMNAS = [
                        'NRO_COMP',
                        'FECHA',
                        'DETALLE',
                        'EDAD',
                        'SEXO',
                        'CONCEPTO',
                        'CANTIDAD',
                        'VALOR',
                        'ARTICULO',
                        'CUM',
                        'NRO_AUTOR',
                        'COPAGO',
                        'NOM_MEDICO'
                    ];
                }
            } else {
                if (this.form.nombremedico_SER109 == 'S') {
                    this.SER109.IMPRESION.estilohoja = 2;
                    this.SER109.IMPRESION.FORMATOTABLA = 8;
                    this.SER109.IMPRESION.WIDTH = ['8%', '5%', '22%', '5%', '8%', '8%', '5%', '15%', '15%'];
                    this.SER109.IMPRESION.COLUMNAS = [
                        'NRO_COMP',
                        'FECHA',
                        'CONCEPTO',
                        'CANTIDAD',
                        'VALOR',
                        'ARTICULO',
                        'UNID_SERV',
                        'NOM_ESPEC',
                        'NOM_MEDICO'
                    ];
                }
            }

            this.SER109.IMPRESION.IMPRESION = 'SER109';
            if (
                $_USUA_GLOBAL[0].NIT == 892000401 ||
                $_USUA_GLOBAL[0].NIT == 900648993 ||
                $_USUA_GLOBAL[0].NIT == 900755133 ||
                $_USUA_GLOBAL[0].NIT == 900804411 ||
                $_USUA_GLOBAL[0].NIT == 900161116 ||
                $_USUA_GLOBAL[0].NIT == 900424844 ||
                $_USUA_GLOBAL[0].NIT == 900870633
            ) {
                this.SER109.IMPRESION.FIRMA1 = localStorage.getItem('IDUSU');
            } else {
                this.SER109.IMPRESION.FIRMA1 = parseInt(this.SER109.FIRMAS[0].DATOS_GER.substring(0, 10)).toString();
            }
            if (this.SER109.FACTURAS.length > 0) {
                for (var i in this.SER109.FACTURAS) {
                    if (this.SER109.FACTURAS[i].ARTICULO.trim() == 'XXCAPI') {
                        this.SER109.IMPRESION.FIRMA1 = '';
                    }
                }
            }
            if (this.form.prefijo_SER109 == 'P' || this.form.prefijo_SER109 == 'T') {
                return postData(
                    { datosh: `${datosEnvio()}${this.SER109.NUMERACION.IDPAC_NUM}|` },
                    get_url('APP/SALUD/SER810-1.DLL')
                )
                    .then((data) => {
                        let nombredelpaciente = `${data['REG-PACI'][0]['APELL-PACI1'].trim()} ${data[
                            'REG-PACI'
                        ][0]['APELL-PACI2'].trim()} ${data['REG-PACI'][0]['NOM-PACI1'].trim()} ${data[
                            'REG-PACI'
                        ][0]['NOM-PACI2'].trim()}`;
                        this.SER109.IMPRESION.NOMBREPACNUM = nombredelpaciente;
                        _impresionformatoSER109(
                            this.SER109.IMPRESION,
                            this._cerrarnumeracion_SER109,
                            this._evaluarfacturaoriginal_SER109
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        CON851('', 'Revisar paciente', null, 'error', 'Error');
                        this._evaluarfacturaoriginal_SER109()
                    });
            }

            _impresionformatoSER109(
                this.SER109.IMPRESION,
                this._cerrarnumeracion_SER109,
                this._evaluarfacturaoriginal_SER109
            );
        },
        _cerrarnumeracion_SER109() {
            if (this.form.estadofactura_SER109.substring(0, 1) == '0' || this.form.estadofactura_SER109.substring(0, 1) == '3') {
                if (
                    this.form.prefijo_SER109 == 'A' ||
                    this.form.prefijo_SER109 == 'B' ||
                    this.form.prefijo_SER109 == 'D' ||
                    this.form.prefijo_SER109 == 'F' ||
                    this.form.prefijo_SER109 == 'G' ||
                    this.form.prefijo_SER109 == 'H' ||
                    this.form.prefijo_SER109 == 'I' ||
                    this.form.prefijo_SER109 == 'J' ||
                    this.form.prefijo_SER109 == 'K'
                ) {
                    if (
                        `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}` == this.SER109.NUMERACION.FECHA_ING.substring(0, 4) &&
                        $_USUA_GLOBAL[0].FECHALNK.substring(2, 4) == this.SER109.NUMERACION.FECHA_ING.substring(4, 6)
                    ) {
                        return _cerrarnumeracion_VENTANA(
                            _toggleNav,
                            this._evaluarprefijo_SER109,
                            (params = {
                                LLAVE_NUM: this.SER109.LLAVEW,
                                PREFIJOW: this.form.prefijo_SER109,
                                FECHAING_NUM: this.SER109.NUMERACION.FECHA_ING,
                                ESTADOW: this.form.estadofactura_SER109.substring(0, 1),
                                FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}`
                            })
                        );
                    }
                    CON851('3G', '3G', null, 'error', 'Error');
                    return _toggleNav();
                }
                return _cerrarnumeracion_VENTANA(
                    _toggleNav,
                    this._evaluarprefijo_SER109,
                    (params = {
                        LLAVE_NUM: this.SER109.LLAVEW,
                        PREFIJOW: this.form.prefijo_SER109,
                        FECHAING_NUM: this.SER109.NUMERACION.FECHA_ING,
                        ESTADOW: this.form.estadofactura_SER109.substring(0, 1),
                        FECHALNK: `20${$_USUA_GLOBAL[0].FECHALNK}`
                    })
                );
            }
            _toggleNav();
        }
    }
})

var numerofacturaMask_SER109 = IMask($('#numeroprefijo_SER109')[0], {
    mask: Number,
    min: 0,
    max: 999999
});
var saldofacturaMask_SER109 = IMask($('#saldofactura_SER109')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var cantidadesMask_SER109 = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true
});