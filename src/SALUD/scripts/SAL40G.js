new Vue({
    el: '#SAL40G',
    data: {
        SAL40G: [],
        PAQUETES: [],
        form: {
            novedad_SAL40G: '',
            numeropaquete_SAL40G: '',
            prefijo_SAL40G: '',
            numerofactura_SAL40G: '',
            idpaciente_SAL40G: '',
            idpaciented_SAL40G: '',
            opercrea_SAL40G: '',
            fechaelab_SAL40G: '',
            opermod_SAL40G: '',
            fechamod_SAL40G: '',
            clasedeserviciod_SAL40G: '',
            convenio_SAL40G: '',
            conveniod_SAL40G: '',
            grupo_SAL40G: '',
            grupod_SAL40G: '',
            cups_SAL40G: '',
            cupsd_SAL40G: '',
            observaciones_SAL40G: '',
            item_SAL40G: '',
            articulotabla_SAL40G: '',
            articulotablad_SAL40G: '',
            cantidad_SAL40G: '',
            valortotalfact_SAL40G: '',
        }
    },
    created() {
        let _this = this;
        _toggleNav();
        nombreOpcion('9,4,G - Comprobantes por paquete integral');
        _inputControl('disabled');
        loader('show');
        obtenerDatosCompletos({ nombreFd: 'TARIFAS' }, (data) => {
            this.SAL40G.TARIFAS = data.TARIFAS;
            this.SAL40G.TARIFAS.pop();
            obtenerDatosCompletos({ nombreFd: 'SERVICIOS' }, (data) => {
                console.log(data);
                _this.SAL40G.SERVICIOS = data.SERVICIOS;
                obtenerDatosCompletos({ nombreFd: 'UNSERV' }, (data) => {
                    console.log(data);
                    _this.SAL40G.UNSERV = data.UNSERV;
                    _this.SAL40G.UNIDSERVICIO = [];
                    for (var i in _this.SAL40G.UNSERV) {
                        if (_this.SAL40G.UNSERV[i].ESTADO.trim() == 'S') {
                            if (_this.SAL40G.UNSERV[i].COD.trim() != '') {
                                _this.SAL40G.UNIDSERVICIO.push(_this.SAL40G.UNSERV[i]);
                            }
                        }
                    }
                    for (var i in _this.SAL40G.UNIDSERVICIO) {
                        _this.SAL40G.UNIDSERVICIO[i].DESCRIP = `${_this.SAL40G.UNIDSERVICIO[i].COD} - ${_this.SAL40G.UNIDSERVICIO[i].DESCRIP}`;
                        _this.SAL40G.UNIDSERVICIO[i].COD = i;
                    }
                    loader('hide');
                    CON850(_this._evaluarCON850_SAL40G);
                });
            });
        });
    },
    methods: {
        _inicializar_SAL40G(){
            this.form.opercrea_SAL40G = ''
            this.form.fechaelab_SAL40G = ''
            this.form.opermod_SAL40G = ''
            this.form.fechamod_SAL40G = ''
            clasedeservicioMask_SAL40G.typedValue = ''
            this.form.prefijo_SAL40G = ''
            this.form.numerofactura_SAL40G = ''
            this.form.convenio_SAL40G = ''
            this.form.conveniod_SAL40G = ''
            this.form.grupo_SAL40G = ''
            this.form.grupod_SAL40G = ''
            this.form.cups_SAL40G = ''
            this.form.cups_SAL40G = ''
            this.form.observaciones_SAL40G = ''
            valorMask_SAL40G.typedValue = ''
            this.PAQUETES = []
        },
        _evaluarCON850_SAL40G(data){
            this.form.novedad_SAL40G = `${data.id} - ${data.descripcion}`;
            if (data.id == 7 || data.id == 8 || data.id == 9) { 
                if (data.id == 7) {
                    this._inicializar_SAL40G();
                    this.form.opercrea_SAL40G = localStorage.Usuario;
                    this.form.fechaelab_SAL40G = moment().format('YYYY-MM-DD');
                    return this._consultarnumeronuevo_SAL40G()
                }
                return this._evaluarnumeropaquete_SAL40G()
            }
            _toggleNav();
        },
        _consultarnumeronuevo_SAL40G(){
            postData(
                {
                    datosh: `${datosEnvio()}`,
                    paso: '1',
                    novedad: `7`,
                },
                get_url('app/SALUD/SAL40G.DLL')
            )
            .then((data) => {
                this.form.numeropaquete_SAL40G = data.NUMERO;
                this._evaluarclase_SAL40G();
            })
            .catch((error) => {
                console.error(error);
                setTimeout(() => CON850(this._evaluarCON850_SAL40G), 300);
            });
        },
        _evaluarnumeropaquete_SAL40G(){
            validarInputs(
                {
                    form: '#VALIDAR1_SAL40G',
                    orden: '1'
                },
                () => {
                    this._inicializar_SAL40G();
                    setTimeout(() => CON850(this._evaluarCON850_SAL40G), 300)
                },
                () => {
                    postData(
                        {
                            datosh: `${datosEnvio()}`,
                            paso: '1',
                            novedad: `8`,
                            numeropaquete: `${this.form.numeropaquete_SAL40G.trim().padStart(8,'0')}`
                        },
                        get_url('app/SALUD/SAL40G.DLL')
                    )
                    .then((data) => {
                        console.log(data);
                        this.form.numeropaquete_SAL40G = data.NUMERO
                        clasedeservicioMask_SAL40G.typedValue = data.CLASE
                        this.form.convenio_SAL40G = data.CONVENIO
                        this.form.grupo_SAL40G = data.CODIGO.substring(0,2)
                        this.form.cups_SAL40G = data.CODIGO.substring(2,10)
                        this.form.prefijo_SAL40G = data.FACTURA.substring(0,1)
                        this.form.numerofactura_SAL40G = data.FACTURA.substring(1,7)
                        this.form.idpaciente_SAL40G = data.IDPACIENTE
                        this.form.observaciones_SAL40G = data.OBSERVACION
                        valorMask_SAL40G.typedValue = parseInt(data.VALOR).toString()
                        this.form.opercrea_SAL40G = data.OPER_CREA
                        this.form.fechaelab_SAL40G = data.FECHA_CREA
                        this.form.opermod_SAL40G = data.OPER_MOD
                        this.form.fechamod_SAL40G = data.FECHA_MOD
                        this.PAQUETES = data.TABLA;
                        this.PAQUETES.pop();
                        this._evaluarclase_SAL40G();
                    })
                    .catch((error) => {
                        console.error(error);
                        this._evaluarnumeropaquete_SAL40G();
                    });
                }
            );
        },
        _evaluarclase_SAL40G() {
            validarInputs(
                {
                    form: '#VALIDAR2_SAL40G',
                    orden: '1'
                },
                () => {
                    this._inicializar_SAL40G();
                    setTimeout(() => CON850(this._evaluarCON850_SAL40G), 300)
                },
                () => {
                    let array = this.SAL40G.SERVICIOS.filter(
                        (x) => x.COD == clasedeservicioMask_SAL40G.value.trim()
                    );
                    if (array.length > 0) {
                        this.form.clasedeserviciod_SAL40G = array[0].DESCRIPCION;
                        return this._evaluarconvenio_SAL40G();
                    }
                    CON851('03', '03', null, 'error', 'Error');
                    this._evaluarclase_SAL40G()
                }
            );
        },
        _evaluarconvenio_SAL40G() {
            validarInputs(
                {
                    form: '#VALIDAR3_SAL40G',
                    orden: '1'
                },
                this._evaluarclase_SAL40G,
                () => {
                    this.form.convenio_SAL40G = this.form.convenio_SAL40G.toUpperCase();
                    if (this.form.convenio_SAL40G.trim() == '') {
                        CON851('03', '03', null, 'error', 'Error');
                        return this._evaluarconvenio_SAL40G()
                    }

                    let tarifas = this.SAL40G.TARIFAS;
                    let array = tarifas.filter(
                        (x) => x.COD.trim() == this.form.convenio_SAL40G
                    );
                    if (array.length > 0) {
                        this.form.conveniod_SAL40G = array[0].DESCRIP;
                        return this._evaluargrupo_SAL40G();
                    }

                    CON851('03', '03', null, 'error', 'Error');
                    this._evaluarconvenio_SAL40G()
                }
            );
        },
        _evaluargrupo_SAL40G() {
            validarInputs(
                {
                    form: '#VALIDAR4_SAL40G',
                    orden: '1'
                },
                this._evaluarconvenio_SAL40G,
                () => {
                    postData(
                        {
                            datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
                            grupo: `${this.form.grupo_SAL40G}|`
                        },
                        get_url('app/SALUD/SER801.DLL')
                    )
                    .then((data) => {
                        console.log(data);
                        this.form.grupod_SAL40G = data.DESCRIP;
                        this._evaluarcups_SAL40G();
                    })
                    .catch((error) => {
                        console.error(error);
                        this._evaluargrupo_SAL40G();
                    });
                }
            );
        },
        _evaluarcups_SAL40G() {
            validarInputs(
                {
                    form: '#VALIDAR5_SAL40G',
                    orden: '1'
                },
                this._evaluargrupo_SAL40G,
                () => {
                    postData(
                        {
                            datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
                            cup: `${this.form.grupo_SAL40G}${this.form.cups_SAL40G}|`
                        },
                        get_url('app/SALUD/SER802C.DLL')
                    )
                        .then((data) => {
                            console.log(data);
                            this.form.cupsd_SAL40G = data.DESCRIP;
                            // this._leerpaquete_SAL40G();
                            this._evaluarprefijofactura_SAL40G();
                        })
                        .catch((error) => {
                            console.error(error);
                            this._evaluarcups_SAL40G();
                        });
                }
            );
        },
        _evaluarprefijofactura_SAL40G(){
            validarInputs(
                {
                    form: '#VALIDAR6_SAL40G',
                    orden: '1'
                },
                this._evaluarcups_SAL40G,
                () => {
                    this.form.prefijo_SAL40G = this.form.prefijo_SAL40G.toUpperCase();
                    if (this.form.prefijo_SAL40G.trim() == ''){
                        return this._evaluarprefijofactura_SAL40G()
                    }

                    postData(
                        { datosh: `${datosEnvio()}9${this.form.prefijo_SAL40G}|` },
                        get_url("APP/CONTAB/CON007.DLL")
                    )
                    .then(data => {
                        console.debug(data);
                        data = data.split("|");
                        if (this.form.novedad_SAL40G.substring(0,1) == '7') this.form.numerofactura_SAL40G = (parseInt(data[1].substring(3, 9)) - 1).toString();
                        this._evaluarnumerofactura_SAL40G();
                    })
                    .catch(err => {
                        console.error(err);
                        this._evaluarprefijofactura_SAL40G();
                    })
                }
            );
        },
        _evaluarnumerofactura_SAL40G(){
            validarInputs(
                {
                    form: '#VALIDAR7_SAL40G',
                    orden: '1'
                },
                this._evaluarprefijofactura_SAL40G,
                () => {
                    if (this.form.prefijo_SAL40G.trim() == ''){
                        return this._evaluarprefijofactura_SAL40G()
                    }

                    postData(
                        { datosh: `${datosEnvio()}${this.form.prefijo_SAL40G}${this.form.numerofactura_SAL40G.padStart(6,'0')}|` },
                        get_url("APP/SALUD/SER808-01.DLL")
                    )
                    .then(data => {
                        console.debug(data);
                        this.form.idpaciente_SAL40G = (parseInt(data.NUMER19[0].IDPAC_NUM)).toString();
                        // this._evaluarpaciente_SAL40G();
                        if (this.form.novedad_SAL40G.substring(0,1) == '7') {
                            postData(
                                { 
                                    datosh: `${datosEnvio()}`,
                                    factura: `${this.form.prefijo_SAL40G}${this.form.numerofactura_SAL40G.padStart(6,'0')}`,
                                    novedad: this.form.novedad_SAL40G.substring(0,1),
                                    paso: `5`
                                },
                                get_url("APP/SALUD/SAL40G.DLL")
                            )
                            .then(data => {
                                console.debug(data);
                                this._evaluarpaciente_SAL40G();
                            })
                            .catch(err => {
                                console.error(err);
                                this._evaluarnumerofactura_SAL40G();
                            })
                        } else {
                            this._evaluarpaciente_SAL40G();
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        this._evaluarnumerofactura_SAL40G();
                    })
                }
            );
        },
        _evaluarpaciente_SAL40G(){
            validarInputs(
                {
                    form: '#VALIDAR8_SAL40G',
                    orden: '1'
                },
                this._evaluarnumerofactura_SAL40G,
                () => {
                    postData(
                        { datosh: `${datosEnvio()}${this.form.idpaciente_SAL40G.padStart(15, '0')}||` },
                        get_url("APP/SALUD/SER810-1.DLL")
                    )
                    .then(data => {
                        console.log(data);
                        this.form.idpaciented_SAL40G = data['REG-PACI'][0].DESCRIP;
                        this._validarpaqueteintegral_SAL40G();
                    })
                    .catch(err => {
                        console.error(err);
                        this._evaluarpaciente_SAL40G();
                    })
                }
            );
        },
        _validarpaqueteintegral_SAL40G() {
            postData(
                {
                    datosh: `${datosEnvio()}`,
                    novedad: `8`,
                    factura: `${this.form.prefijo_SAL40G}${this.form.numerofactura_SAL40G.padStart(6,'0')}`,
                    paciente: `${this.form.idpaciente_SAL40G.padStart(15,'0')}`,
                    paso: `3`
                },
                get_url('app/SALUD/SAL40G.DLL')
            )
            .then((data) => {
                console.log(data);
                data.COMPROBANTES.pop();
                this.PAQUETES = data.COMPROBANTES;
                let valortotal = 0;
                for (var articulos of this.PAQUETES) {
                    if (!isNaN(parseFloat(articulos.VALOR_FACT.replace(/,/g,'')))){
                        valortotal = valortotal + parseInt(articulos.VALOR_FACT);
                    }
                }
                valorMask_SAL40G.typedValue = valortotal.toString();
                this._evaluargrabado_SAL40G();
            })
            .catch((error) => {
                console.error(error);
                this._evaluarnumeropaquete_SAL40G();
            });
        },
        _editarCantidadyvalor_SAL40G(data){
            _fin_validar_form();
            console.log(data);
            this.form.item_SAL40G = data.item;
            this.form.articulotabla_SAL40G = data.articulo.ARTICULO;
            this.form.articulotablad_SAL40G = data.articulo.DESCRIP_ART;
            cantidadMask_SAL40G.typedValue = data.articulo.CANTIDAD;
            valortotalMask_SAL40G.typedValue = data.articulo.VALOR_FACT;
            this._evaluarvalor_SAL40G(data);
        },
        // _evaluarcantidad_SAL40G(data){
        //     validarInputs(
        //         {
        //             form: '#VALIDAR10_SAL40G',
        //             orden: '1'
        //         },
        //         this._evaluarnumerofactura_SAL40G,
        //         () => {
        //             if (isNaN(cantidadMask_SAL40G.value)){
        //                 CON851('03', '03', null, 'error', 'Error');
        //                 return this._evaluarcantidad_SAL40G(data)
        //             }

        //             if (parseInt(cantidadMask_SAL40G.value) == 0){
        //                 CON851('03', '03', null, 'error', 'Error');
        //                 return this._evaluarcantidad_SAL40G(data)
        //             }

        //             this._evaluarvalor_SAL40G(data);
        //         }
        //     );
        // },
        _evaluarvalor_SAL40G(data){
            validarInputs(
                {
                    form: '#VALIDAR11_SAL40G',
                    orden: '1'
                },
                () => {
                    this._evaluarvalor_SAL40G(data)
                },
                () => {
                    if (isNaN(parseFloat(valortotalMask_SAL40G.value.replace(/-/g,'')))){
                        CON851('03', '03', null, 'error', 'Error');
                        return this._evaluarvalor_SAL40G()
                    }

                    data.item = data.item - 1;
                    this.PAQUETES[data.item].CAMBIO = 'S';
                    this.PAQUETES[data.item].CANTIDAD = cantidadMask_SAL40G.value;
                    this.PAQUETES[data.item].VALOR_FACT = valortotalMask_SAL40G.value;
                    let vlrunit = parseInt(this.PAQUETES[data.item].VALOR_FACT.replace(/,/g,'')) / parseInt(this.PAQUETES[data.item].CANTIDAD.replace(/,/g,''))
                    valortotalMask_SAL40G.typedValue = vlrunit.toString()
                    this.PAQUETES[data.item].VALOR_UNIT = valortotalMask_SAL40G.value;

                    this.form.item_SAL40G = ''
                    this.form.articulotabla_SAL40G = '';
                    this.form.articulotablad_SAL40G = '';
                    cantidadMask_SAL40G.typedValue = '';
                    valortotalMask_SAL40G.typedValue = '';

                    let total = 0;
                    for (var articulos of this.PAQUETES) {
                        if (parseInt(articulos.VALOR_FACT.replace(/,/g,'')) != 0 || articulos.VALOR_FACT.trim() != '') {
                            total = total + parseInt(articulos.VALOR_FACT.replace(/,/g,''));
                        }
                    }
                    valorMask_SAL40G.typedValue = total.toString();

                    this._evaluargrabado_SAL40G();
                }
            );
        },
        _evaluargrabado_SAL40G() {
            validarInputs(
                {
                    form: '#VALIDAR9_SAL40G',
                    orden: '1'
                },
                () => {
                    this.PAQUETES = []
                    valorMask_SAL40G.typedValue = ''
                    this._evaluarpaciente_SAL40G()
                },
                () => {
                    if (paqueteintegralMask_SAL40G.value == 'S'){
                        this.form.opermod_SAL40G = localStorage.Usuario
                        this.form.fechamod_SAL40G = moment().format('YYYY-MM-DD')
                        return this._grabarpaquete_SAL40G()
                    }

                    this.PAQUETES = []
                    this._evaluarcups_SAL40G()
                }
            );
        },
        _grabarpaquete_SAL40G() {
            let datasend = new Object()
            datasend.paso = '2'
            datasend.novedad = this.form.novedad_SAL40G.substring(0,1)
            datasend.datosh = `${datosEnvio()}${this.form.prefijo_SAL40G}${this.form.numerofactura_SAL40G.padStart(6,'0')}|${this.form.convenio_SAL40G}|`
            datasend.datosh += `${this.form.grupo_SAL40G}${this.form.cups_SAL40G.padEnd(10,' ')}|${this.form.observaciones_SAL40G}|${valorMask_SAL40G.value.replace(/,/g,'')}|`
            datasend.datosh += `${this.form.opercrea_SAL40G}|${this.form.fechaelab_SAL40G.replace(/-/g,'')}|${this.form.opermod_SAL40G}|${this.form.fechamod_SAL40G.replace(/-/g,'')}|${clasedeservicioMask_SAL40G.value}|${this.form.idpaciente_SAL40G.padStart(15,'0')}|`
            datasend.numeropaquete = this.form.numeropaquete_SAL40G.padStart(8,'0');
            let lin = 1;
            for (var articulos of this.PAQUETES) {
                if (articulos.VALOR_FACT.trim() == '') valor = '0.00'
                else valor = articulos.VALOR_FACT.replace(/,/g,'');
                datasend['LIN-' + lin.toString().padStart(3, '0')] = `${articulos.CLASE}|${articulos.ARTICULO}|${articulos.CANTIDAD}|`;
                lin++;
            }
            postData(
                datasend,
                get_url('app/SALUD/SAL40G.DLL')
            )
            .then((data) => {
                console.log(data);
                let cambios = [];
                for (var comprobantes of this.PAQUETES) {
                    if (comprobantes.CAMBIO){
                        cambios.push(comprobantes);
                    }
                }
                console.log(cambios);
                if (cambios.length == 0) {
                    // CON851('','Proceso terminado', null, 'success', 'Exito')
                    return this._impresion_SAL40G();
                }

                let datasend2 = new Object()
                lin = 1;
                for (var comprobantes of cambios) {
                    datasend2['LIN-' + lin.toString().padStart(3, '0')] = `${comprobantes.POSICION}|${comprobantes.SUCURSAL}${comprobantes.CLASE}${comprobantes.NRO}|${comprobantes.CANTIDAD}|${comprobantes.VALOR_FACT}|`;
                    lin++;
                }
                datasend2.datosh = datosEnvio()
                datasend2.paso = '4'
                datasend2.novedad = this.form.novedad_SAL40G.substring(0,1)
                postData(
                    datasend2,
                    get_url('app/SALUD/SAL40G.DLL')
                )
                .then((data) => {
                    console.log(data);
                    this._impresion_SAL40G()
                    // CON851('','Proceso terminado', null, 'success', 'Exito')
                    // _toggleNav();
                })
                .catch((error) => {
                    console.error(error);
                    this._evaluargrupo_SAL40G();
                });
            })
            .catch((error) => {
                console.error(error);
                this._evaluargrupo_SAL40G();
            });
        },
        _impresion_SAL40G(){
            let $_this = this;
            var datosimpresion_SAL40G = {
                pageSize: 'letter',
                pageMargins: [10, 141, 10, 20],
                header: function (currentPage, pageCount, pageSize) {
                        return [
                            { text: ' ' },
                            { text: ' ' },
                            {
                                image: 'logo',
                                fit: [60, 60],
                                absolutePosition: { x: 40, y: 10 }
                            },
                            { text: $_USUA_GLOBAL[0].NOMBRE, style: 'titulos' },
                            { text: `NIT ${$_USUA_GLOBAL[0].NIT}`, style: 'titulos' },
                            { text: `${$_USUA_GLOBAL[0].DIRECC} - ${$_USUA_GLOBAL[0].TEL}`, style: 'titulos2' },
                            { text: `PAQUETE INTEGRAL # ${parseInt($_this.form.numeropaquete_SAL40G).toString()}`, style: 'titulos2' },
                            {   columns: [
                                    { text: 'FACTURA :', width: '14%', style: 'textheadertitle', margin: [20, 0]},
                                    { text: `${$_this.form.prefijo_SAL40G} - ${$_this.form.numerofactura_SAL40G}`, width: '10%', style: 'textheadertitle'},
                                    {
                                        text: 'Página : ' + currentPage + ' de ' + pageCount,
                                        width: '60%',
                                        style: 'titulos2left',
                                    },
                                ]
                            },
                            { text: ' ' },
                            {
                                columns: [
                                    {
                                        text: 'CONVENIO : ',
                                        width: '14%',
                                        style: 'textheadertitle',
                                        margin: [20, 0]
                                    },
                                    { text: $_this.form.convenio_SAL40G, width: '5%', style: 'textheader' },
                                    { text: 'CUPS : ', width: '8%', style: 'textheadertitle' },
                                    { text: `${$_this.form.grupo_SAL40G}${$_this.form.cups_SAL40G}`, width: '6%', style: 'textheader' },
                                    { text: $_this.form.cupsd_SAL40G, width: '48%', style: 'textheader' },
                                    {
                                        text: 'VALOR : ',
                                        width: '6%',
                                        style: 'textheadertitle'
                                    },
                                    {
                                        text: valorMask_SAL40G.value,
                                        width: '10%',
                                        style: 'textheader'
                                    }
                                ]
                            },
                            { text: ' ' },
                            { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 605, y2: 0, lineWidth: 1 }] },
                            {
                                columns: [
                                    {
                                        text: 'CODIGO',
                                        width: '15%',
                                        style: 'textheadertitletable',
                                        margin: [20, 0]
                                    },
                                    { text: 'DESCRIPCION', width: '40%', style: 'textheadertitletable' },
                                    { text: 'CANTIDAD', width: '15%', style: 'textheadertitletable' },
                                    { text: 'VALOR UNITARIO', width: '15%', style: 'textheadertitletable' },
                                    { text: 'VALOR TOTAL', width: '15%', style: 'textheadertitletable' }
                                ]
                            },
                            // { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 605, y2: 0, lineWidth: 1 }] }
                        ];
                },
                content: [
                    construirtablaimpresioneslineal($_this.PAQUETES, ['ARTICULO','DESCRIP_ART','CANTIDAD','VALOR_UNIT','VALOR_FACT'], ['12%', '44%', '15%', '15%', '15%']),
                    { text: ' ' },
                    {
                        columns: [
                            { text: 'OPER CREA :', width: '10%', style: 'textheader' },
                            { text: $_this.form.opercrea_SAL40G, width: '5%', style: 'textheadertitle' },
                            { text: 'FECHA CREA :', width: '10%', style: 'textheader' },
                            { text: moment($_this.form.fechaelab_SAL40G).format('YYYY-MM-DD'), width: '10%', style: 'textheadertitle' },
                            { text: 'OPER MOD :', width: '10%', style: 'textheader' },
                            { text: $_this.form.opermod_SAL40G, width: '5%', style: 'textheadertitle' },
                            { text: 'FECHA MOD :', width: '10%', style: 'textheader' },
                            { text: $_this.form.fechamod_SAL40G, width: '10%', style: 'textheadertitle' },
                        ]
                    }
                ],
                styles: {
                    titulos: {
                        alignment: 'center',
                        fontSize: 13,
                        bold: true
                    },
                    titulos2: {
                        alignment: 'center',
                        fontSize: 10,
                        bold: true
                    },
                    textheader: {
                        alignment: 'rigth',
                        fontSize: 8
                    },
                    textheadertitle: {
                        alignment: 'rigth',
                        fontSize: 8,
                        bold: true
                    },
                    textheadertitletable: {
                        alignment: 'rigth',
                        fontSize: 8,
                        bold: true
                    },
                    titulos2left: {
                        alignment: 'left',
                        fontSize: 10,
                        margin:[20,0]
                    },
                    facturaoriginal: {
                        alignment: 'center',
                        fontSize: 8,
                        bold: true
                    },
                    textheadertable: {
                        fontSize: 5
                    },
                }
            }
            datosimpresion_SAL40G.images = {
                logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png'
            };
            _impresion2({
                tipo: 'pdf',
                content: datosimpresion_SAL40G,
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssSS')}.pdf`
            })
                .then(() => {
                    console.log('impresion2');
                    CON851('','Proceso terminado',null,'success','Exito');
                    _toggleNav();
                })
                .catch((err) => {
                    console.error(err);
                    this._evaluargrabado_SAL40G();
                });
        },
        _ventanaclasesdeservicio_SAL40G() {
            let $_this = this;
            _ventanaDatos({
                titulo: 'VENTANA DE CLASES DE SERVICIO',
                columnas: ['COD', 'DESCRIPCION'],
                data: this.SAL40G.SERVICIOS,
                callback_esc: function () {
                    $('#clasedeservicio_SAL40G').focus();
                },
                callback: function (data) {
                    clasedeservicioMask_SAL40G.typedValue = data.COD;
                    $_this.form.clasedeserviciod_SAL40G = data.DESCRIPCION;
                    _enterInput('#clasedeservicio_SAL40G');
                }
            });
        },
        _ventanaconvenios_SAL40G() {
            loader('show');
            let $_this = this;
            postData({ datosh: datosEnvio() }, get_url('APP/SALUD/SER804.DLL'))
                .then((data) => {
                    loader('hide');
                    data.TARIFAS.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA DE CONVENIOS',
                        columnas: ['COD', 'DESCRIP'],
                        data: data.TARIFAS,
                        callback_esc: function () {
                            $('.convenio_SAL40G').focus();
                        },
                        callback: function (data) {
                            $_this.form.convenio_SAL40G = data.COD;
                            $_this.form.conveniod_SAL40G = data.DESCRIP;
                            _enterInput('.convenio_SAL40G');
                        }
                    });
                })
                .catch((error) => {
                    loader('hide');
                    console.error(error);
                    CON851(
                        '',
                        'Ocurrio un error consultando los convenios',
                        null,
                        'error',
                        'Error'
                    );
                    $('.convenio_SAL40G').focus();
                });
        },
        _ventanagrupos_SAL40G() {
            loader('show');
            let $_this = this;
            postData({ datosh: datosEnvio() }, get_url('APP/SALUD/SER801.DLL'))
                .then((data) => {
                    loader('hide');
                    data.CODIGOS.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA DE GRUPOS DE SERVICIOS',
                        columnas: ['COD', 'DESCRIP'],
                        data: data.CODIGOS,
                        callback_esc: function () {
                            $('.grupo_SAL40G').focus();
                        },
                        callback: function (data) {
                            $_this.form.grupo_SAL40G = data.COD;
                            $_this.form.grupod_SAL40G = data.DESCRIP;
                            _enterInput('.grupo_SAL40G');
                        }
                    });
                })
                .catch((error) => {
                    loader('hide');
                    console.error(error);
                    CON851('', 'Ocurrio un error consultando los grupos', null, 'error', 'Error');
                    $('.grupo_SAL40G').focus();
                });
        },
        _ventanacups_SAL40G() {
            loader('show');
            let $_this = this;
            if (clasedeservicioMask_SAL40G.value == '0') {
                postData(
                    { datosh: datosEnvio() + clasedeservicioMask_SAL40G.value + '|' },
                    get_url('APP/INVENT/INV803.DLL')
                )
                    .then((data) => {
                        loader('hide');
                        data.ARTICULOS.pop();
                        _ventanaDatos({
                            titulo: 'VENTANA TABLA DE TARIFAS',
                            columnas: ['LLAVE_ART', 'DESCRIP_ART'],
                            data: data.ARTICULOS,
                            callback_esc: function () {
                                $('.cups_SAL40G').focus();
                            },
                            callback: function (data) {
                                $_this.form.cups_SAL40G = data.LLAVE_ART.substring(1, 18);
                                _enterInput('.cups_SAL40G');
                            }
                        });
                    })
                    .catch((error) => {
                        loader('hide');
                        console.error(error);
                        CON851(
                            '',
                            'Hubo un error consultando los articulos',
                            null,
                            'error',
                            'Error'
                        );
                        $('.cups_SAL40G').focus();
                    });
            } else {
                postData(
                    {
                        datosh: `${datosEnvio()}${this.form.convenio_SAL40G}${
                            clasedeservicioMask_SAL40G.value
                        }|`
                    },
                    get_url('APP/SALUD/SER802.DLL')
                )
                    .then((data) => {
                        loader('hide');
                        data.TABLA.pop();
                        _ventanaDatos({
                            titulo: 'VENTANA TABLA DE TARIFAS',
                            columnas: ['COD', 'TIPO', 'COD_SER', 'DESCRIP'],
                            data: data.TABLA,
                            callback_esc: function () {
                                $('.cups_SAL40G').focus();
                            },
                            callback: function (data) {
                                $_this.form.grupo_SAL40G = data.COD_SER.substring(0, 2);
                                postData(
                                    {
                                        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
                                        grupo: `${$_this.form.grupo_SAL40G}|`
                                    },
                                    get_url('app/SALUD/SER801.DLL')
                                )
                                .then((data) => {
                                    console.log(data);
                                    $_this.form.grupod_SAL40G = data.DESCRIP;
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                                $_this.form.cups_SAL40G = data.COD_SER.substring(2, 18);
                                _enterInput('.cups_SAL40G');
                            }
                        });
                    })
                    .catch((error) => {
                        loader('hide');
                        console.error(error);
                        CON851(
                            '',
                            'Hubo un error consultando los articulos',
                            null,
                            'error',
                            'Error'
                        );
                        $('.cups_SAL40G').focus();
                    });
            }
        },
        _ventanatipodearticulos_SAL40G() {
            let $_this = this;
            _ventanaDatos({
                titulo: 'VENTANA DE TIPOS DE ARTICULO',
                columnas: ['COD', 'DESCRIPCION'],
                data: this.SAL40G.SERVICIOS,
                callback_esc: function () {
                    $('#tipodearticulo_SAL40G').focus();
                },
                callback: function (data) {
                    tipodearticuloMask_SAL40G.typedValue = data.COD;
                    $_this.form.tipodearticulod_SAL40G = data.DESCRIPCION;
                    _enterInput('#tipodearticulo_SAL40G');
                }
            });
        },
        _ventanacups2_SAL40G() {
            loader('show');
            let $_this = this;
            if (tipodearticuloMask_SAL40G.value == '0') {
                postData(
                    { datosh: datosEnvio() + tipodearticuloMask_SAL40G.value + '|' },
                    get_url('APP/INVENT/INV803.DLL')
                )
                    .then((data) => {
                        loader('hide');
                        data.ARTICULOS.pop();
                        _ventanaDatos({
                            titulo: 'VENTANA TABLA DE TARIFAS',
                            columnas: ['LLAVE_ART', 'DESCRIP_ART'],
                            data: data.ARTICULOS,
                            callback_esc: function () {
                                $('.codigo_SAL40G').focus();
                            },
                            callback: function (data) {
                                $_this.form.codigo_SAL40G = data.LLAVE_ART.substring(1, 18);
                                _enterInput('.codigo_SAL40G');
                            }
                        });
                    })
                    .catch((error) => {
                        loader('hide');
                        console.error(error);
                        CON851(
                            '',
                            'Hubo un error consultando los articulos',
                            null,
                            'error',
                            'Error'
                        );
                        $('.codigo_SAL40G').focus();
                    });
            } else {
                postData(
                    {
                        datosh: `${datosEnvio()}${this.form.convenio_SAL40G}${
                            tipodearticuloMask_SAL40G.value
                        }|`
                    },
                    get_url('APP/SALUD/SER802.DLL')
                )
                    .then((data) => {
                        loader('hide');
                        data.TABLA.pop();
                        _ventanaDatos({
                            titulo: 'VENTANA TABLA DE TARIFAS',
                            columnas: ['COD', 'TIPO', 'COD_SER', 'DESCRIP'],
                            data: data.TABLA,
                            callback_esc: function () {
                                $('.codigo_SAL40G').focus();
                            },
                            callback: function (data) {
                                $_this.form.codigo_SAL40G = data.COD_SER;
                                _enterInput('.codigo_SAL40G');
                            }
                        });
                    })
                    .catch((error) => {
                        loader('hide');
                        console.error(error);
                        CON851(
                            '',
                            'Hubo un error consultando los articulos',
                            null,
                            'error',
                            'Error'
                        );
                        $('.codigo_SAL40G').focus();
                    });
            }
        },
        _ventanapaciente_SAL40G(){
            parametros = {
                dll: 'PACIENTES',
                valoresselect: ['Nombre del paciente'],
                f8data: 'PACIENTES',
                ancho: '95%',
                columnas: [
                    { title: 'COD' },
                    { title: 'NOMBRE' }, 
                    { title: 'EPS' },
                    { title: 'EDAD' }
                ],
                callback: data => {
                    this.form.idpaciente_SAL40G = data.COD;
                    _enterInput('.idpaciente_SAL40G');
                },
                cancel: () => {
                    $('.idpaciente_SAL40G').focus();
                }
            };
            F8LITE(parametros);
        },
        _ventanaPaquetes_SAL40G(){
            let $_this = this;
            loader('show');
            postData(
                {
                    datosh: `${datosEnvio()}`,
                    paso: '6'
                },
                get_url('APP/SALUD/SAL40G.DLL')
            )
            .then((data) => {
                loader('hide');
                data.PAQUETES.pop();
                _ventanaDatos({
                    titulo: 'VENTANA DE PAQUETES',
                    columnas: ['NUMERO','FACTURA','CODIGO','VALOR','PACIENTE'],
                    data: data.PAQUETES,
                    callback_esc: function () {
                        $('.numeropaquete_SAL40G').focus();
                    },
                    callback: function (data) {
                        $_this.form.numeropaquete_SAL40G = data.NUMERO;
                        _enterInput('.numeropaquete_SAL40G');
                    }
                });
            })
            .catch((error) => {
                loader('hide');
                console.error(error);
                CON851(
                    '',
                    'Hubo un error consultando los articulos',
                    null,
                    'error',
                    'Error'
                );
                $('.numeropaquete_SAL40G').focus();
            });
        }
    }
});

var clasedeservicioMask_SAL40G = IMask(document.getElementById('clasedeservicio_SAL40G'), {
    mask: Number,
    min: 0,
    max: 7
});
var valorMask_SAL40G = new IMask(document.getElementById('valor_SAL40G'), {
    mask: Number,
    min: 0,
    max: 99999999999,
    thousandsSeparator: ',',
    padFractionalZeros: true
});
var paqueteintegralMask_SAL40G = IMask(document.getElementById('paqueteintegral_SAL40G'), {
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
var cantidadMask_SAL40G = IMask($('#cantidad_SAL40G')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'] });
var valortotalMask_SAL40G = IMask($('#valortotalfact_SAL40G')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'] });