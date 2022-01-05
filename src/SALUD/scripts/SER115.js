new Vue({
    el: "#SER115",
    data: {
        SER115: [],
        PAQUETES: [],
        form: {
            novedad_SER115: "",
            clasedeserviciod_SER115: "",
            convenio_SER115: "",
            conveniod_SER115: "",
            grupo_SER115: "",
            cups_SER115: "",
            cupsd_SER115: "",
            observaciones_SER115: "",
            grupod_SER115: "",
            clasecupsd_SER115: "",
            tipodearticulod_SER115:"",
            codigo_SER115:"",
            codigod_SER115:"",
        },
    },
    created() {
        _toggleNav();
        nombreOpcion('9,7,1,G - Actualiza maestro paquete integrales');
        _inputControl('reset');
        _inputControl('disabled');
        loader('show');
        this.SER115.CLASESCUPS = [
            { TIPO:'0', DESCRIPCION:'DROGUERIA' },
            { TIPO:'1', DESCRIPCION:'CUPS' }
        ]
        if ($_USUA_GLOBAL[0].NIT == 800156469) {
            this.SER115.SERVICIOS = [
                { COD: '0', DESCRIPCION: 'DROGUERIA' },
                { COD: '1', DESCRIPCION: 'CIRUGIAS' },
                { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
                { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
                { COD: '4', DESCRIPCION: 'DOPPLER' },
                { COD: '5', DESCRIPCION: 'T.A.C.' },
                { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
                { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
            ]
        } else {
            this.SER115.SERVICIOS = [
                { COD: '0', DESCRIPCION: 'DROGUERIA' },
                { COD: '1', DESCRIPCION: 'CIRUGIAS' },
                { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
                { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
                { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
                { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
                { COD: '6', DESCRIPCION: 'PATOLOGIA' },
                { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
            ]
        }
        obtenerDatosCompletos( { nombreFd: 'TARIFAS' }, data => {
            this.SER115.TARIFAS = data.TARIFAS;
            this.SER115.TARIFAS.pop();
            CON850(this._evaluarCON850_SER115);
            loader('hide');
        })
    },
    methods: {
        _evaluarCON850_SER115(data){
            this.form.novedad_SER115 = `${data.id} - ${data.descripcion}`;
            if (data.id == 7 || data.id == 8 || data.id == 9) this._evaluarclase_SER115();
            else _toggleNav()
        },
        _evaluarclase_SER115(){
            validarInputs({
                form: '#VALIDAR1_SER115',
                orden: '1'
            },
                () => {
                    CON850(this._evaluarCON850_SER115);
                },
                () => {
                    let array = this.SER115.SERVICIOS.filter(x => x.COD == clasedeservicioMask_SER115.value.trim());
                    if (array.length > 0) {
                        this.form.clasedeserviciod_SER115 = array[0].DESCRIPCION;
                        this._evaluarconvenio_SER115();
                    } else {
                        CON851('03','03',this._evaluarclase_SER115(),'error','Error');
                    }
                }
            )
        },
        _evaluarconvenio_SER115(){
            validarInputs({
                form: '#VALIDAR2_SER115',
                orden: '1'
            },
                this._evaluarclase_SER115,
                () => {
                    this.form.convenio_SER115 = this.form.convenio_SER115.toUpperCase();
                    if (this.form.convenio_SER115.trim() == ''){
                        CON851('03','03',this._evaluarconvenio_SER115(),'error','Error');
                    } else {
                        let tarifas = this.SER115.TARIFAS;
                        let array = tarifas.filter(x => x.COD.trim() == this.form.convenio_SER115)
                        if (array.length > 0) {
                            this.form.conveniod_SER115 = array[0].DESCRIP;
                            this._evaluargrupo_SER115();
                        } else {
                            CON851('03','03',this._evaluarconvenio_SER115(),'error','Error');
                        }
                    }
                }
            )
        },
        _evaluargrupo_SER115(){
            validarInputs({
                form: '#VALIDAR3_SER115',
                orden: '1'
            },
                this._evaluarconvenio_SER115,
                () => {
                    postData( { datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`, grupo: `${this.form.grupo_SER115}|` }, 
                    get_url("app/SALUD/SER801.DLL"))
                    .then((data) => {
                        console.log(data);
                        this.form.grupod_SER115 = data.DESCRIP;
                        this._evaluarcups_SER115();
                    })
                    .catch(error => {
                        console.error(error);
                        this._evaluargrupo_SER115();
                    });
                }
            )
        },
        _evaluarcups_SER115(){
            validarInputs({
                form: '#VALIDAR4_SER115',
                orden: '1'
            },
                this._evaluargrupo_SER115,
                () => {
                    postData( { datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`, cup: `${this.form.grupo_SER115}${this.form.cups_SER115}|` }, 
                    get_url("app/SALUD/SER802C.DLL"))
                    .then((data) => {
                        console.log(data);
                        this.form.cupsd_SER115 = data.DESCRIP;
                        this._leerpaquete_SER115();
                    })
                    .catch(error => {
                        console.error(error);
                        this._evaluarcups_SER115();
                    });
                }
            )
        },
        _leerpaquete_SER115(){
            postData({
                datosh: `${datosEnvio()}1|${this.form.convenio_SER115}${clasedeservicioMask_SER115.value}${this.form.grupo_SER115}${this.form.cups_SER115}|${this.form.novedad_SER115.substring(0,1)}|`
            }, get_url("APP/SALUD/SER115.DLL"))
            .then((data) => {
                console.debug(data);
                this.SER115.PAQUETE = data.PAQINTEGRAL[0];
                if (this.form.novedad_SER115.substring(0,1) == '7') {
                    CON851('00','00',this._evaluarcups_SER115(),'error','Error');
                } else {
                    this.form.observaciones_SER115 = this.SER115.PAQUETE.OBSERVACION;
                    valorMask_SER115.typedValue = this.SER115.PAQUETE.VALOR;
                    this.PAQUETES = this.SER115.PAQUETE.TAB_PAQINT;
                    if (this.form.novedad_SER115.substring(0,1) == '8'){
                        this._evaluarobservaciones_SER115();
                    } else {
                        CON851P('54', this._evaluarconvenio_SER115, this._grabarpaquete_SER115);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                if (this.form.novedad_SER115.substring(0,1) == '7' && error.MENSAJE == '01') {
                    this._evaluarobservaciones_SER115();
                } else {
                    this._evaluarcups_SER115();
                }
            });
        },
        _evaluarobservaciones_SER115(){
            validarInputs({
                form: '#VALIDAR5_SER115',
                orden: '1'
            },
                this._evaluarcups_SER115,
                this._evaluarvalor_SER115
            )
        },
        _evaluarvalor_SER115(){
            validarInputs({
                form: '#VALIDAR6_SER115',
                orden: '1'
            },
                this._evaluarobservaciones_SER115,
                () => {
                    if (valorMask_SER115.value == 0){
                        CON851('03','03',this._evaluarvalor_SER115(),'error','Error');
                    } else {
                        this.SER115.CONTEO = 1;
                        this.SER115.TABLA = this.SER115.CAMBIO = 0;
                        itemMask_SER115.typedValue = this.SER115.CONTEO.toString();
                        if (this.form.novedad_SER115.substring(0,1) == '7'){
                            this._evaluartipodearticulo_SER115();
                        } else {
                            this._evaluaritem_SER115();
                        }
                    }
                }
            )
        },
        _evaluaritem_SER115(data){
            if (data){
                this.SER115.TABLA = 1;
                itemMask_SER115.typedValue = data.cells[0].textContent.trim();
                clasedeservicioMask_SER115 = data.cells[1].textContent.trim();
                tipodearticuloMask_SER115.typedValue = data.cells[2].textContent.trim();
                this.form.codigo_SER115 = data.cells[3].textContent.trim();
                this.form.codigod_SER115 = data.cells[4].textContent.trim();
                cantidadMask_SER115.typedValue = data.cells[5].textContent.trim();
            } else {
                itemMask_SER115.typedValue = this.SER115.CONTEO;
            }
            validarInputs({
                form: '#VALIDAR7_SER115',
                orden: '1',
                event_f3: this._grabarpaquete_SER115,
                event_f7: () => {this._evaluartabla_SER115('0')}
            },
                this._evaluarvalor_SER115,
                () =>{
                    if (this.PAQUETES.length == 0 && itemMask_SER115.value == '1') {
                        this._evaluartipodearticulo_SER115();
                    } else {
                        if (this.PAQUETES[parseInt(itemMask_SER115.value) - 1]) {
                            this.SER115.CAMBIO = 1;
                            clasecupsMask_SER115.typedValue = this.PAQUETES[parseInt(itemMask_SER115.value) - 1].CLASE;
                            tipodearticuloMask_SER115.typedValue = this.PAQUETES[parseInt(itemMask_SER115.value) - 1].TIPO;
                            this.form.codigo_SER115 = this.PAQUETES[parseInt(itemMask_SER115.value) - 1].ARTICULO;
                            this.form.codigod_SER115 = this.PAQUETES[parseInt(itemMask_SER115.value) - 1].DESCRIPCION;
                            cantidadMask_SER115.typedValue = this.PAQUETES[parseInt(itemMask_SER115.value) - 1].CANTIDAD;
                            this._evaluartipodearticulo_SER115();
                        } else {
                            this._evaluartipodearticulo_SER115();
                        }
                    }
                }
            )
        },
        _evaluartipodearticulo_SER115(){
            validarInputs({
                form: '#VALIDAR9_SER115',
                orden: '1'
            },
                () => { 
                    this.SER115.CAMBIO = 0;
                    this._evaluaritem_SER115() 
                },
                () => {
                    let array = this.SER115.SERVICIOS.filter(x => x.COD == tipodearticuloMask_SER115.value.trim());
                    if (array.length > 0) {
                        this.form.tipodearticulod_SER115 = array[0].DESCRIPCION;
                        this._evaluararticulo_SER115();
                    } else {
                        CON851('03','03',this._evaluartipodearticulo_SER115(),'error','Error');
                    }
                }
            )
        },
        _evaluararticulo_SER115(){
            validarInputs({
                form: '#VALIDAR10_SER115',
                orden: '1'
            },
                this._evaluartipodearticulo_SER115,
                () => {
                    if (tipodearticuloMask_SER115.value == '0') {
                        postData( { datosh: `${datosEnvio()}0${this.form.codigo_SER115.trim()}|` },
                        get_url("app/INVENT/INV803-01.DLL"))
                        .then((data) => {
                            console.log(data);
                            this.form.codigod_SER115 = data.ARTICULOS[0].DESCRIP_ART;
                            this._evaluarcantidad_SER115();
                        })
                        .catch(error => {
                            console.error(error);
                            this._evaluararticulo_SER115();
                        });
                    } else {
                        postData( { datosh: `${datosEnvio()}|`, tabla: `${this.form.convenio_SER115}${tipodearticuloMask_SER115.value}${this.form.codigo_SER115.trim()}|` },
                        get_url("app/SALUD/SER802.DLL"))
                        .then((data) => {
                            console.log(data);
                            this.form.codigod_SER115 = data.DESCRIP;
                            this._evaluarcantidad_SER115();
                        })
                        .catch(error => {
                            console.error(error);
                            this._evaluararticulo_SER115();
                        });
                    }
                }
            )
        },
        _evaluarcantidad_SER115(){
            validarInputs({
                form: '#VALIDAR11_SER115',
                orden: '1'
            },
                this._evaluararticulo_SER115,
                () => {
                    if (cantidadMask_SER115.value == 0) {
                        CON851('03','03',this._evaluarcantidad_SER115(),'error','Error');
                    } else {
                        this._evaluarprecio_SER115();
                    }
                }
            )
        },
        _evaluarprecio_SER115(){
            validarInputs({
                form: '#VALIDAR8_SER115',
                orden: '1',
            },
                this._evaluarcantidad_SER115,
                () => {
                    if (clasecupsMask_SER115.value == '') {
                        CON851('','Digite S o N',this._evaluarprecio_SER115(),'error','Error');
                    } else {
                        if (this.SER115.CAMBIO == 1 || this.SER115.TABLA == 1) {
                            this.PAQUETES[parseInt(itemMask_SER115.value) - 1].ITEM = itemMask_SER115.value;
                            this.PAQUETES[parseInt(itemMask_SER115.value) - 1].CLASE = clasecupsMask_SER115.value;
                            this.PAQUETES[parseInt(itemMask_SER115.value) - 1].TIPO = tipodearticuloMask_SER115.value;
                            this.PAQUETES[parseInt(itemMask_SER115.value) - 1].ARTICULO = this.form.codigo_SER115;
                            this.PAQUETES[parseInt(itemMask_SER115.value) - 1].DESCRIPCION = this.form.codigod_SER115;
                            this.PAQUETES[parseInt(itemMask_SER115.value) - 1].CANTIDAD = cantidadMask_SER115.value;
                        } else {
                            this.PAQUETES.push({ ITEM: itemMask_SER115.value, TIPO: tipodearticuloMask_SER115.value, ARTICULO: this.form.codigo_SER115, DESCRIPCION: this.form.codigod_SER115, CANTIDAD: cantidadMask_SER115.value, CLASE: clasecupsMask_SER115.value })
                        }
                        this.SER115.CAMBIO = 0;
                        clasecupsMask_SER115.typedValue = '';
                        this.form.clasecupsd_SER115 = '';
                        tipodearticuloMask_SER115.typedValue = '';
                        this.form.tipodearticulod_SER115 = '';
                        this.form.codigo_SER115 = '';
                        this.form.codigod_SER115 = '';
                        cantidadMask_SER115.typedValue = '';
                        this.SER115.CONTEO++;
                        if (this.SER115.TABLA == 1) {
                            this._evaluartabla_SER115(parseInt(itemMask_SER115.value) - 1);
                        } else {
                            this._evaluaritem_SER115();
                        }
                    }
                }
            )
        },
        _evaluartabla_SER115(orden){
            validarTabla(
                {
                    tabla: '#TABLAPAQUETEINT_SER115',
                    orden: orden,
                    Supr: data => {
                        let posicion = parseInt(data.cells[0].textContent.trim()) - 1;
                        this.PAQUETES.splice(data.cells[0].textContent.trim(), 1);
                        if (this.PAQUETES.length == 0) {
                            this._evaluaritem_SER115();
                        } else {
                            this._evaluartabla_SER115(posicion.toString());
                        }
                    },
                    event_f3: this._grabarpaquete_SER115
                },
                this._evaluaritem_SER115,
                () => { 
                    this.SER115.TABLA = 0;
                    this._evaluaritem_SER115() 
                },
                () => {
                    this.SER115.TABLA = 0;
                    this._evaluartabla_SER115('0');
                }
            )
        },
        _grabarpaquete_SER115(){
            CON851P('01', () => { this._evaluaritem_SER115() }, () => {
                let data = {};
                data.datosh = `${datosEnvio()}2|${this.form.convenio_SER115}${clasedeservicioMask_SER115.value}${this.form.grupo_SER115}${this.form.cups_SER115}|${this.form.novedad_SER115.substring(0,1)}|${this.form.observaciones_SER115}|${valorMask_SER115.unmaskedValue.padStart(11,'0')}|`
                var lin = 1;
                for (var i in this.PAQUETES){
                    data[`LIN-${lin.toString().padStart(3,'0')}`] = `${this.PAQUETES[i].TIPO}|${this.PAQUETES[i].ARTICULO}|${this.PAQUETES[i].CANTIDAD}|${this.PAQUETES[i].CLASE}|`
                    lin++;
                }
                postData(data, get_url("APP/SALUD/SER115.DLL"))
                .then(data => {
                    CON851('', 'Grabado Correctamente', null, 'success', 'Exito');
                    _toggleNav();
                })
                .catch(err => {
                    console.error(err);
                    this._evaluaritem_SER115();
                })
            })
        },
        _ventanaclasesdeservicio_SER115(){
            let $_this = this;
            _ventanaDatos({
                titulo: 'VENTANA DE CLASES DE SERVICIO',
                columnas: ["COD", "DESCRIPCION"],
                data: this.SER115.SERVICIOS,
                callback_esc: function () {
                    $('#clasedeservicio_SER115').focus();
                },
                callback: function (data) {
                    clasedeservicioMask_SER115.typedValue = data.COD;
                    $_this.form.clasedeserviciod_SER115 = data.DESCRIPCION;
                    _enterInput('#clasedeservicio_SER115');
                }
            });
        },
        _ventanaconvenios_SER115(){
            loader('show');
            let $_this = this;
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER804.DLL"))
            .then((data) => {
                loader("hide");
                data.TARIFAS.pop();
                _ventanaDatos({
                    titulo: 'VENTANA DE CONVENIOS',
                    columnas: ["COD", "DESCRIP"],
                    data: data.TARIFAS,
                    callback_esc: function () {
                        $('.convenio_SER115').focus();
                    },
                    callback: function (data) {
                        $_this.form.convenio_SER115 = data.COD;
                        $_this.form.conveniod_SER115 = data.DESCRIP;
                        _enterInput('.convenio_SER115');
                    }
                });
            })
            .catch((error) => {
                loader('hide');
                console.error(error);
                CON851('', 'Ocurrio un error consultando los convenios', null, 'error', 'Error');
                $('.convenio_SER115').focus();
            });
        },
        _ventanagrupos_SER115(){
            loader('show');
            let $_this = this;
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER801.DLL"))
            .then((data) => {
                loader("hide");
                data.CODIGOS.pop();
                _ventanaDatos({
                    titulo: 'VENTANA DE GRUPOS DE SERVICIOS',
                    columnas: ["COD", "DESCRIP"],
                    data: data.CODIGOS,
                    callback_esc: function () {
                        $('.grupo_SER115').focus();
                    },
                    callback: function (data) {
                        $_this.form.grupo_SER115 = data.COD;
                        $_this.form.grupod_SER115 = data.DESCRIP;
                        _enterInput('.grupo_SER115');
                    }
                });
            })
            .catch((error) => {
                loader('hide');
                console.error(error);
                CON851('', 'Ocurrio un error consultando los grupos', null, 'error', 'Error');
                $('.grupo_SER115').focus();
            });
        },
        _ventanacups_SER115(){
            loader('show');
            let $_this = this;
            if (clasedeservicioMask_SER115.value == '0') {
                postData({ datosh: datosEnvio() + clasedeservicioMask_SER115.value + '|' },
                get_url("APP/INVENT/INV803.DLL"))
                .then((data) => {
                    loader("hide");
                    data.ARTICULOS.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA TABLA DE TARIFAS',
                        columnas: ["LLAVE_ART", "DESCRIP_ART"],
                        data: data.ARTICULOS,
                        callback_esc: function () {
                            $('.cups_SER115').focus();
                        },
                        callback: function (data) {
                            $_this.form.cups_SER115 = data.LLAVE_ART.substring(1, 18);
                            _enterInput('.cups_SER115');
                        }
                    });
                })
                .catch((error) => {
                    loader("hide");
                    console.error(error)
                    CON851('', 'Hubo un error consultando los articulos', null, 'error', 'Error');
                    $('.cups_SER115').focus();
                });
            } else {
                postData({ datosh: `${datosEnvio()}${this.form.convenio_SER115}${clasedeservicioMask_SER115.value}|` },
                    get_url("APP/SALUD/SER802.DLL"))
                    .then((data) => {
                        loader("hide");
                        data.TABLA.pop();
                        _ventanaDatos({
                            titulo: 'VENTANA TABLA DE TARIFAS',
                            columnas: ["COD", "TIPO", "COD_SER", "DESCRIP"],
                            data: data.TABLA,
                            callback_esc: function () {
                                $(".cups_SER115").focus();
                            },
                            callback: function (data) {
                                $_this.form.cups_SER115 = data.COD_SER.substring(2,18);
                                _enterInput('.cups_SER115');
                            }
                        });
                    })
                    .catch((error) => {
                        loader("hide");
                        console.error(error);
                        CON851('', 'Hubo un error consultando los articulos', null, 'error', 'Error');
                        $(".cups_SER115").focus();
                    });
            }
        },
        _ventanatipodearticulos_SER115(){
            let $_this = this;
            _ventanaDatos({
                titulo: 'VENTANA DE TIPOS DE ARTICULO',
                columnas: ["COD", "DESCRIPCION"],
                data: this.SER115.SERVICIOS,
                callback_esc: function () {
                    $('#tipodearticulo_SER115').focus();
                },
                callback: function (data) {
                    tipodearticuloMask_SER115.typedValue = data.COD;
                    $_this.form.tipodearticulod_SER115 = data.DESCRIPCION;
                    _enterInput('#tipodearticulo_SER115');
                }
            });
        },
        _ventanacups2_SER115(){
            loader('show');
            let $_this = this;
            if (tipodearticuloMask_SER115.value == '0') {
                postData({ datosh: datosEnvio() + tipodearticuloMask_SER115.value + '|' },
                get_url("APP/INVENT/INV803.DLL"))
                .then((data) => {
                    loader("hide");
                    data.ARTICULOS.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA TABLA DE TARIFAS',
                        columnas: ["LLAVE_ART", "DESCRIP_ART"],
                        data: data.ARTICULOS,
                        callback_esc: function () {
                            $('.codigo_SER115').focus();
                        },
                        callback: function (data) {
                            $_this.form.codigo_SER115 = data.LLAVE_ART.substring(1, 18);
                            _enterInput('.codigo_SER115');
                        }
                    });
                })
                .catch((error) => {
                    loader("hide");
                    console.error(error)
                    CON851('', 'Hubo un error consultando los articulos', null, 'error', 'Error');
                    $('.codigo_SER115').focus();
                });
            } else {
                postData({ datosh: `${datosEnvio()}${this.form.convenio_SER115}${tipodearticuloMask_SER115.value}|` },
                get_url("APP/SALUD/SER802.DLL"))
                .then((data) => {
                    loader("hide");
                    data.TABLA.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA TABLA DE TARIFAS',
                        columnas: ["COD", "TIPO", "COD_SER", "DESCRIP"],
                        data: data.TABLA,
                        callback_esc: function () {
                            $(".codigo_SER115").focus();
                        },
                        callback: function (data) {
                            $_this.form.codigo_SER115 = data.COD_SER;
                            _enterInput('.codigo_SER115');
                        }
                    });
                })
                .catch((error) => {
                    loader("hide");
                    console.error(error);
                    CON851('', 'Hubo un error consultando los articulos', null, 'error', 'Error');
                    $(".codigo_SER115").focus();
                });
            }
        },
    }
})

var clasedeservicioMask_SER115 = IMask($('#clasedeservicio_SER115')[0], { mask: Number, min: 0, max: 7 });
var valorMask_SER115 = new IMask(document.getElementById('valor_SER115'),
    { mask: Number, min: 0, max: 99999999999, thousandsSeparator: ',', padFractionalZeros: true }
);
var itemMask_SER115 = IMask($('#item_SER115')[0], { mask: Number });
var tipodearticuloMask_SER115 = IMask($('#tipodearticulo_SER115')[0], { mask: Number });
var clasecupsMask_SER115 = IMask($('#clasecups_SER115')[0], {
    mask: 'a',
    definitions: {
        'a': /[SN]/
    },
    prepare: function (str) {
        if (str.trim() == '') {
            return false
        } else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var cantidadMask_SER115 = IMask($('#cantidad_SER115')[0], { mask: Number });