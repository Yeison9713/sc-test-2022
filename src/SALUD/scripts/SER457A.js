// // 01-09-2020 DIANA E: creado 
moment.locale('es')
var fecha_SER457A = IMask.createPipe({
    mask: Date,
    pattern: "Y/m/d",
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "0000", to: "9000", maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "00", to: "12", maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "31", maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY/MM/DD");
    },
    parse: function (str) {
        var fecha = moment(str).format("YYYY/MM/DD");
        if (fecha == 'Invalid date') return '0000/00/00'
        return str;
    },
});

new Vue({
    el: "#SER457A",
    data: {
        SER457A: [],
        form: {
            numeroprefijo_SER457A: "",
            entidad_SER457A: "",
            nombrepaciente_SER457A: "",
            estadofactura_SER457A: "",
            fechafactura_SER457A: "",
            operbloq_SER457A: "",
            observacion_SER457A: "",
            anexos_SER457A: "",
            fechafacturaano_SER457A: "",
            fechafacturames_SER457A: "",
            fechafacturadia_SER457A: "",
            valorsalmin_SER457A: "",
            topepoliza_SER457A: "",
            totalfact_SER457A: "",
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion('9,7,4,3,L,1 - Cobro secretaria de salud NP');
        loader("show");
        var $_this = this;
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS;
            this.SER457A.PREFIJOS = data;
            obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
                data = data.FIRMAS;
                this.SER457A.FIRMAS = data;
                $_this._evaluarprefijo_SER457A()
            })
        })
    },
    methods: {
        _evaluarprefijo_SER457A() {
            loader("hide");
            validarInputs({
                form: '#VALIDAR1_SER457A',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.SER457A.PREFIJOW = prefijoMask_SER457A.value;
                    let URL = get_url("APP/CONTAB/CON007.DLL");
                    postData({
                        datosh: datosEnvio() + '9' + this.SER457A.PREFIJOW + '|'
                    }, URL)
                        .then(data => {
                            data = data.split('|');
                            this.form.numeroprefijo_SER457A = parseInt(data[1].substring(3, 9)) - 1
                            this._evaluarnumeroprefijo_SER457A();
                        })
                        .catch(error => {
                            _toggleNav();
                        });
                }
            )
        },
        _evaluarnumeroprefijo_SER457A() {
            console.log('numero prefijo')
            validarInputs({
                form: '#VALIDAR2_SER457A',
                orden: '1'
            },
                this._evaluarprefijo_SER457A,
                () => {
                    this.SER457A.LLAVEW = this.SER457A.PREFIJOW + this.form.numeroprefijo_SER457A.toString().padStart(6, '0');
                    _ImpresionesActualizarCopagos({ LLAVENUM: this.SER457A.LLAVEW }, this._validarfactura_SER457A, this._evaluarnumeroprefijo_SER457A)
                }
            )
        },
        _validarfactura_SER457A(data1, data2) {
            this.SER457A.NUMERACION = data1;
            if (this.SER457A.NUMERACION.TIPOPACI_NUM == "X") this.SER457A.NUMERACION.TIPOPACI_NUM == '*';
            this.SER457A.FECHAPRENUM = this.SER457A.NUMERACION.FECHAPRE_NUM;
            this.form.entidad_SER457A = this.SER457A.NUMERACION.DESCRIP_NUM.trim()
            this.form.nombrepaciente_SER457A = this.SER457A.NUMERACION.NOMBREPAC_NUM.trim();
            let estado = { '0': 'ACTIVO', '1': 'CERRADA', '2': 'ANULADA', '3': 'BLOQUEADA' };
            this.form.estadofactura_SER457A = this.SER457A.NUMERACION.ESTADO_NUM + ' - ' + estado[this.SER457A.NUMERACION.ESTADO_NUM];
            if (this.SER457A.NUMERACION.ESTADO_NUM == '0' || this.SER457A.NUMERACION.ESTADO_NUM == '1') {
                $('#FECHARET_SER457A').removeClass('hidden');
                this.form.fechafactura_SER457A = fecha_SER457A(this.SER457A.NUMERACION.FECHARET_NUM)
            } else {
                $('#OPERBLOQ_SER457A').removeClass('hidden');
                this.form.operbloq_SER457A = this.SER457A.NUMERACION.OPERBLOQ_NUM
            }
            this.form.observacion_SER457A = this.SER457A.NUMERACION.OBSERV_NUM
            this.form.anexos_SER457A = this.SER457A.NUMERACION.ANEXOS_NUM
            this.SER457A.ANOINGNUM = this.SER457A.NUMERACION.FECHAING_NUM.substring(0, 4)
            if (parseInt(this.SER457A.NUMERACION.FECHAPRE_NUM.substring(4, 6)) == 0) {
                if (parseInt(this.SER457A.NUMERACION.FECHARET_NUM.substring(4, 6)) > 0) {
                    this.form.fechafacturaano_SER457A = this.SER457A.NUMERACION.FECHARET_NUM.substring(0, 4)
                    this.form.fechafacturames_SER457A = this.SER457A.NUMERACION.FECHARET_NUM.substring(4, 6)
                    this.form.fechafacturadia_SER457A = this.SER457A.NUMERACION.FECHARET_NUM.substring(6, 8)
                } else {
                    let fechaactual = moment().format('YYYYMMDD');
                    this.form.fechafacturaano_SER457A = fechaactual.substring(0, 4)
                    this.form.fechafacturames_SER457A = fechaactual.substring(4, 6)
                    this.form.fechafacturadia_SER457A = fechaactual.substring(6, 8)
                }
            } else {
                this.form.fechafacturaano_SER457A = this.SER457A.NUMERACION.FECHAPRE_NUM.substring(0, 4)
                this.form.fechafacturames_SER457A = this.SER457A.NUMERACION.FECHAPRE_NUM.substring(4, 6)
                this.form.fechafacturadia_SER457A = this.SER457A.NUMERACION.FECHAPRE_NUM.substring(6, 8)
            }
            if (this.SER457A.PREFIJOW == 'T') {
                this.SER457A.VALORES = data2
                $('#VALORESCARTERA_109F').removeClass('hidden');
                this.form.valorsalmin_SER457A = this.SER457A.VALORES.SALMIN
                this.form.topepoliza_SER457A = this.SER457A.VALORES.TOPE
                this.form.totalfact_SER457A = this.SER457A.VALORES.TOTAL
            }
            this._afectarnumeracion_SER457A()
        },
        _afectarnumeracion_SER457A() {
            if (this.SER457A.NUMERACION.ESTADO_NUM == '0' || this.SER457A.NUMERACION.ESTADO_NUM == '3') {
                this._evaluarobservaciones_SER457A('1')
            } else {
                this._evaluarfechaimpresion_SER457A('1')
            }
        },
        _evaluarobservaciones_SER457A(orden) {
            _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para continuar' }] })
            validarInputs({
                form: '#VALIDAR3_SER457A',
                orden: orden
            },
                () => { this._evaluarnumeroprefijo_SER457A() },
                () => {
                    _FloatText({ estado: 'off' });
                    this.form.observacion_SER457A = this.form.observacion_SER457A.toUpperCase();
                    this.form.anexos_SER457A = this.form.anexos_SER457A.toUpperCase();
                    if (this.form.estadofactura_SER457A.substring(0, 1) == '3' || this.form.estadofactura_SER457A.substring(0, 1) == '0') {
                        this._evaluarbloqueofactura_SER457A()
                    } else {
                        this._evaluarfechaimpresion_SER457A('1');
                    }
                }
            )
        },
        _evaluarbloqueofactura_SER457A() {
            _FloatText({ estado: 'off' })
            if (this.form.estadofactura_SER457A.substring(0, 1) == '3') {
                this._grabarnumeracion_SER457A()
            } else {
                bloqueoMask_SER457A.typedValue = 'N'
                validarInputs({
                    form: '#VALIDAR4_SER457A',
                    orden: '1'
                },
                    () => { this._evaluarobservaciones_SER457A('2') },
                    () => {
                        if (bloqueoMask_SER457A.value.trim() == '') bloqueoMask_SER457A.typedValue = 'N'
                        if (bloqueoMask_SER457A.value == 'S') this.form.estadofactura_SER457A = '3', this.form.operbloq_SER457A = localStorage.getItem('Usuario').trim();
                        this._grabarnumeracion_SER457A()
                    }
                )
            }
        },
        _grabarnumeracion_SER457A() {
            if (this.form.observacion_SER457A.trim() != this.SER457A.NUMERACION.OBSERV_NUM.trim() || this.form.anexos_SER457A.trim() != this.SER457A.NUMERACION.ANEXOS_NUM.trim() || this.form.estadofactura_SER457A.substring(0, 1) != this.SER457A.NUMERACION.ESTADO) {
                let URL = get_url("APP/SALUD/SER109D.DLL");
                postData({
                    datosh: datosEnvio() + '2|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER457A.LLAVEW + '|' + this.form.observacion_SER457A + '|' + this.form.anexos_SER457A + '|' + this.form.estadofactura_SER457A.substring(0, 1) + '|' + '|' + '|' + '|' + '|' + '|' + localStorage.getItem('Usuario').trim() + '|'
                }, URL)
                    .then((data) => {
                        console.log(data, 'REGRESAS GRABAR NUMERACION');
                        this._evaluarfechaimpresion_SER457A('1')
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MENSAJE == '01') {
                            this._evaluarbloqueofactura_SER457A();
                        }
                    })
            } else {
                this._evaluarfechaimpresion_SER457A('1')
            }
        },
        _evaluarfechaimpresion_SER457A(orden) {
            validarInputs({
                form: '#VALIDAR5_SER457A',
                orden: orden,
            },
                this._evaluarbloqueofactura_SER457A,
                () => {
                    this.SER457A.FECHA = this.form.fechafacturaano_SER457A + this.form.fechafacturames_SER457A.padStart(2, '0') + this.form.fechafacturadia_SER457A.padStart(2, '0')
                    this.SER457A.ANONUM = this.SER457A.FECHA.substring(4, 6)
                    this._evaluardiscriminardrog_SER457A()
                }
            )
        },
        _evaluardiscriminardrog_SER457A() {
            discriminardrogMask_SER457A.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR6_SER457A',
                orden: '1',
            },
                () => { this._evaluarfechaimpresion_SER457A('1') },
                () => {
                    if (discriminardrogMask_SER457A.value.trim() == '') discriminardrogMask_SER457A.typedValue = 'N';
                    this._evaluarnrocomprob_SER457A()
                }
            )
        },
        _evaluarnrocomprob_SER457A() {
            mostrarnrodrogMask_SER457A.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR7_SER457A',
                orden: '1',
            },
                () => { this._evaluardiscriminardrog_SER457A() },
                () => {
                    if (mostrarnrodrogMask_SER457A.value.trim() == '') mostrarnrodrogMask_SER457A.typedValue = 'N';
                    this._evaluarmostrarfechacomp_SER457A()
                }
            )
        },
        _evaluarmostrarfechacomp_SER457A() {
            mostrarfechacompMask_SER457A.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR8_SER457A',
                orden: '1',
            },
                () => { this._evaluarnrocomprob_SER457A() },
                () => {
                    if (mostrarfechacompMask_SER457A.value.trim() == '') mostrarfechacompMask_SER457A.typedValue = 'N';
                    this._evaluarfechacomp_SER457A()
                }
            )
        },
        _evaluarfechacomp_SER457A() {
            cambiarfechacompMask_SER457A.typedValue = 'N';
            validarInputs({
                form: '#VALIDAR9_SER457A',
                orden: '1',
            },
                () => { this._evaluarmostrarfechacomp_SER457A() },
                () => {
                    if (cambiarfechacompMask_SER457A.value.trim() == '') cambiarfechacompMask_SER457A.typedValue = 'N';
                    this._evaluarfiltrosimpresion_SER457A()
                }
            )
        },
        _evaluarfiltrosimpresion_SER457A() {
            let URL = get_url("APP/SALUD/SER457A.DLL");
            postData({
                datosh: datosEnvio() + this.SER457A.LLAVEW + '|' + discriminardrogMask_SER457A.value + '|' + mostrarnrodrogMask_SER457A.value + '|' + mostrarfechacompMask_SER457A.value + '|' + cambiarfechacompMask_SER457A.value + '|'
            }, URL)
                .then((data) => {
                    console.log(data, 'SER457A')
                    this.SER457A.FACTURAS457A = data.FACTURA;
                    this.SER457A.FACTURAS457A.pop()
                    this._datosimpresion_SER457A()
                
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MENSAJE == '08') {
                        _toggleNav()
                    } else {
                        console.error(error);
                        CON851('', 'Hubo un error con el cierre', this._evaluarfechacomp_SER457A(), 'error', 'Error');
                    }
                })

        },
        _datosimpresion_SER457A() {
            this.SER457A.datosimpresion_SER457A = new Object;
            this.SER457A.datosimpresion_SER457A.PREFIJO = prefijoMask_SER457A.value.trim();
            this.SER457A.datosimpresion_SER457A.NROFACTURA = parseInt(this.form.numeroprefijo_SER457A);
            this.SER457A.datosimpresion_SER457A.DESCRIPNUM = this.SER457A.NUMERACION.DESCRIP_NUM.trim();
            this.SER457A.datosimpresion_SER457A.IDPACIENTE = this.SER457A.FACTURAS457A[0].DETALLE.substring(28,40).replace(/,/g,'');
            postData({
                datosh: `${datosEnvio()}${this.SER457A.datosimpresion_SER457A.IDPACIENTE.padStart(15,'0')}|`
            }, get_url("APP/SALUD/SER810-1.DLL"))
            .then((data) => {
                console.debug(data);
                this.SER457A.PACIENTE = data['REG-PACI'][0];
                this._completarimpresion_SER457A();
                })
                .catch((error) => {
                    console.log(error);
                    this._completarimpresion_SER457A();
                })
        },

        _completarimpresion_SER457A(){
            this.SER457A.datosimpresion_SER457A.TIPOIDPACI = this.SER457A.PACIENTE['TIPO-ID'].trim();
            let tiposid = {
                'CC': 'CEDULA CIUDADANIA',
                'CE': 'CEDULA EXTRANJERA',
                'PA': 'NUMERO PASAPORTE',
                'RC': 'REGISTRO CIVIL',
                'TI': 'TARJETA IDENTIDAD',
                'ASI': 'ADULTO SIN IDENTIFICAR',
                'MSI': 'MENOR SIN IDENTIFICAR',
                'NUI': 'NUMERO UNICO IDENT. NUID',
                'CD': 'CARNET DIPLOMATICO',
                'SC': 'SALVO CONDUCTO',
                'PE': 'PERMISO ESPECIAL PERMANEN',
                'CE': 'CERTIFICADO NACIDO VIVO',
            }
            let tipopaci = {
                'C': 'CONTRIBUTIVO',
                'S': 'SUBSIDIADO',
                'V': 'VINCULADO',
                'P': 'PARTICULAR',
                'O': 'OTRO TIPO',
                'D': 'DESPLAZ CONT',
                'E': 'DESPLAZ SUBS',
                'F': 'DESPLAZ VINC',
                '': ' ',
            }
            this.SER457A.datosimpresion_SER457A.DESCRIPIDPACI = tiposid[this.SER457A.PACIENTE['TIPO-ID'].trim()];
            this.SER457A.datosimpresion_SER457A.APELLIDO1 = this.SER457A.PACIENTE['APELL-PACI1'];
            this.SER457A.datosimpresion_SER457A.APELLIDO2 = this.SER457A.PACIENTE['APELL-PACI2'];
            this.SER457A.datosimpresion_SER457A.NOMBRE1 = this.SER457A.PACIENTE['NOM-PACI1'];
            this.SER457A.datosimpresion_SER457A.NOMBRE2 = this.SER457A.PACIENTE['NOM-PACI2'];
            this.SER457A.datosimpresion_SER457A.AFILIACION = tipopaci[this.SER457A.PACIENTE.TIPO.trim()];
            this.SER457A.datosimpresion_SER457A.FACTURAS = this.SER457A.FACTURAS457A;
            this.SER457A.datosimpresion_SER457A.COLUMNAS = ['ITEM','AUTOR','FECHA','FECHA','CRONICO','FECHA_PERIODO','PREFIJO','NUMERO','FECHA','FECHA','DIAGNOPOS','NITU','NOMBREUSU','CODIGO','CONCEPTO','CANT','VLR_UNITARIO','VALOR','COPAGO','VLR_RECOBRO']
            this.SER457A.datosimpresion_SER457A.WIDTH = ['2%','4%','4%','4%','4%','5%','4%','4%','5%','5%','3%','4%','10%','5%','14%','3%','4%','4%','4%','4%','4%'],
            // MIRAR COMO REALIZAR LA VALIDACION DE PREFIJO = P NO MOSTRAR CONCEPTO
            this.SER457A.datosimpresion_SER457A.COLUMNAS2 = ['ITEM','CONCEPTO','UNIDAD_ART','DOSISDIA','DOSISDIA','DIASFORMU','CANT','VLR_UNITARIO','VALOR','VLR_DIFERENCIA','HOMOLOGO','DETALLE_HOMO','VLR_MYT','VLR_DIFERENCIA'];
            this.SER457A.datosimpresion_SER457A.WIDTH2 = ['3%','15%','5%','4%','3%','3%','7%','7%','7%','7%','15%','6%','5%','6%','7%'];
            this._impresionSER457I(this.SER457A.datosimpresion_SER457A);
        },

        _impresionSER457I(params){
            var datosimpresion = {
                pageSize: "A4",
                pageMargins: [ 10, 150, 10, 20 ],
                pageOrientation: 'landscape',
                header: function(currentPage, pageCount, pageSize) {
                return [
                  { text: ' '},
                  {canvas: [{ type: 'line', x1: 10, y1: 5, x2: 830, y2: 5, lineWidth: 1 }]},
                  {
                      image: "logo",
                      fit: [60, 60],
                      absolutePosition: {x: 40, y: 25},
                  },
                  {canvas: [{ type: 'line', x1: 110, y1: 0, x2: 110, y2: 67, lineWidth: 1}], absolutePosition: {x:0, y: 20}},
                  { columns: [
                      {text:'FONDO DE SOLIDARIDAD Y GARANTIA -FOSYGA-', width:'80%', style:'titulos2', margin:[120,0,0,0]},
                      {text:'FECHA', width:'7%', style:'titulos2'},
                      {text: `${moment().format('YYYY/MM/DD')}`, width:'12%', style:'titulos2'},
                      ],
                  },
                  {canvas: [{ type: 'line', x1: 110, y1: 5, x2: 830, y2: 5, lineWidth: 1 }]},
                  { columns: [
                        {text:'TRAMITE INTEGRAL DE COBRO POR TECNOLOGIAS EN SALUD NO PREVISTAS EN EL PLAN OBLIGATORIO DE SALUD', width:'80%', style:'titulos', margin:[120,0,0,0]},
                        [ 
                          {text: 'Página ' + currentPage + ' de ' + pageCount, style: "textocentrado"}, 
                          {canvas: [{ type: 'line', x1: 0, y1: 0, x2: 156, y2: 0, lineWidth: 1 }]},
                          {text:'FID-PR-MYT-Proceso Tramite de cobros. V05', width:'30%', style:'textocentrado'} 
                        ],
                      ],
                  },
                  {canvas: [{ type: 'line', x1: 10, y1: 5, x2: 830, y2: 5, lineWidth: 1 }]},
                  {text: $_USUA_GLOBAL[0].NOMBRE, style:'titulos2'},
                  {text:'REPUBLICA DE COLOMBIA', style:'titulos2'},
                  {text:'Ministerio de la Proteccion Social', style:'titulos3'},
                  {text:'Solicitud de cobro por concepto de medicamentos, servicios medicos y prestaciones de SALUD NO POS - CTC', style:'titulos3'},
                  {canvas: [{ type: 'line', x1: 673, y1: 0, x2: 673, y2: 67, lineWidth: 1}], absolutePosition: {x:0, y: 20}},
                ]
              },
              content: [
                  {
                    columns: [
                        {
                            table: {
                                widths:['*'],
                                body: [
                                    [{text:'l. Datos del Cobro', style:'tituloscaja'}],
                                    [{text:`No. Consecutivo para radicaciones de entidad reclamante: ${params.PREFIJO} ${params.NROFACTURA}`, style:'texto'}],
                                    [{text:'No. Consecutivo recobro: _________________________________', style:'texto'}],
                                    [{text:'Tipo Radicacion:  Nueva X    Reingreso:', style:'texto'}],
                                    [{text:'Numero Radicacion anterior MYT01: ____________________________', style:'texto'}]
                                ]
                            },
                            layout: {
                                    hLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                    },
                                    vLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                    },
                                    hLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                                    },
                                    vLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                                 },
                            },
                            width: '40%' // Changes width of the table
                        },
                        {
                            table: {
                                widths:['*'],
                                body: [
                                    [{text:'ll. Datos de la entidad', style:'tituloscaja'}],
                                    [{text:' ', style:'texto'}],
                                    [{text:`Codigos SNS: ${$_USUA_GLOBAL[0].COD_CIUD}${$_USUA_GLOBAL[0].NUIR}${$_USUA_GLOBAL[0].PREFIJ}`, style:'texto'}],
                                    [{text:`Razon social: ${params.DESCRIPNUM}`, style:'texto'}],
                                    [{text:' ', style:'texto'}],
                                ]
                            },
                            layout: {
                                    hLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                    },
                                    vLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                    },
                                    hLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                                    },
                                    vLineColor: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                                 },
                            },
                            width: '31%' // Changes width of the table
                        },
                        {text: ' '},
                    ],
                    columnGap: 10,
                  },
                  { text: ' '},
                  { 
                    table: {
                            widths:['35%','35%'],
                            body:   [
                                        [ {text:'lll. Datos del afiliado', style:'tituloscaja'}, ' '],
                                        [ {text:`Tipo de documento: ${params.TIPOIDPACI} ${params.DESCRIPIDPACI}`, style:'texto'}, {text:`Numero de documento de identidad: ${params.IDPACIENTE}`, style:'texto'}],
                                        [ {text:`Primer apellido: ${params.APELLIDO1}   Segundo apellido: ${params.APELLIDO2}`, style:'texto'},{text:`Primer nombre: ${params.NOMBRE1}   Segundo nombre: ${params.NOMBRE2}`, style:'texto'}],
                                        [ {text:`Tipo de Afiliacion: ${params.AFILIACION}`, style:'texto'}, {text:'Numero de cuota moderadora:________________', style:'texto'}],
                                    ]
                            },
                    layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                                },
                                  vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';		            
                                  },
                            },
                  },
                  { 
                    table: {
                            widths:['62%','18%','20%'],
                            body:   [
                                        [ {text:'V. Declaracion de la entidad', style:'tituloscaja'}, ' ', ' '],
                                        [ {text:'DOCUMENTO', style:'textonegrilla'}, {text:'No. Doc', style:'textonegrilla'}, {text:'No. Folio', style:'textonegrilla'}],
                                        [ {text:'Copia(s) de Acta(s) del CTC', style:'texto'}, {text:' ', style:'texto'}, {text:' ', style:'texto'}],
                                        [ {text:'Factura(s) de Provedor(es) Cancelada(s)', style:'texto'},{text:' ', style:'texto'}, {text:' ', style:'texto'}],
                                        [ {text:'Orden(es) o Formula(s) Medica(s)', style:'texto'}, {text:' ', style:'texto'}, {text:' ', style:'texto'}],
                                        [ {text:'Soportes Integrales del cobro', style:'texto'}, {text:' ', style:'texto'}, {text:' ', style:'texto'}],
                                        [ {text:'Totales', style:'textocajacentrado', colSpan: 3}],
                                        [ {text:'Datos de la solicitud en la que anexo la copia del acta o del Cobro Anterior', style:'textocajacentrado', colSpan: 3}],
                                        [ {text:'No. Radicacion anterior reposa Acta de CTC (Formato MYT 01)', style:'textocajacentrado', colSpan: 3}],
                                    ]
                            },
                    layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                                },
                                  vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';		            
                                  },
                            },
                    absolutePosition: {x:595, y: 150}
                  },
                  {text:' '},
                  { 
                    table: {
                            widths:['*'],
                            body:   [
                                        [ {text:'V. Detalle del cobro', style:'tituloscaja'}],
                                    ]
                            },
                    layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                                },
                                  vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';		            
                                  },
                            },
                  },
                  { 
                    table: {
                            widths:['2%','4%','4%','4%','4%','5%','4%','4%','5%','5%','3%','4%','10%','5%','14%','3%','4%','4%','4%','4%','4%'],
                            body:   [
                                        [ 
                                            {text:'Item', style:'titulostabla'}, 
                                            {text:'No. Acta CTC', style:'titulostabla'},
                                            {text:'Fecha Acta CTC', style:'titulostabla'},
                                            {text:'Fecha Solicitud Medica', style:'titulostabla'},
                                            {text:'Periodico (S/N)', style:'titulostabla'},
                                            {text:'Periodo Suministro', style:'titulostabla'},
                                            {text:'No. Factura', style:'titulostabla'},
                                            {text:'Fecha Prestacion servicios Medica', style:'titulostabla'},
                                            {text:'Fecha Radicacion Factura', style:'titulostabla'},
                                            {text:'Codigo Diagnostico (CIE)', style:'titulostabla'},
                                            {text:'% Sumas', style:'titulostabla'},
                                            {text:'Nit Proveedor', style:'titulostabla'},
                                            {text:'Nombre del Proveedor', style:'titulostabla'},
                                            {text:'Codigo Medicamen. serv presta.', style:'titulostabla'},
                                            {text:'Nombre Medicamento, servicio o prestacion', style:'titulostabla'},
                                            {text:'Tipo Item', style:'titulostabla'},
                                            {text:'Cantidad', style:'titulostabla'},
                                            {text:'Valor unitario', style:'titulostabla'},
                                            {text:'Vlor total', style:'titulostabla'},
                                            {text:'Valor Cuotas Moderadoras', style:'titulostabla'},
                                            {text:'Valor cobro', style:'titulostabla'},
                                        ],
                                    ]
                            },
                  },
                  table(params.FACTURAS, params.COLUMNAS, params.WIDTH),
                  {
                      columns: [
                        {text: "", width: "80%"},
                        {text: "TOTAL COBRO", width: "10%", style: "texto"},
                        {text: '9,000,000', width: "10%", style: "textoderecha"},
                      ],
                  },
                  {text:' '},
                  { 
                    table: {
                            widths:['*'],
                            body:   [
                                        [ {text:'Vl. Datos medicamentos, servicios medicos y/o prestaciones de salud NO POS', style:'tituloscaja'}],
                                        [ {text:'MEDICAMENTO/SERVICIO/PRESTACION DE SALUD- NO POS', style:'tituloscaja'}],
                                    ]
                            },
                    layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
                                },
                                  vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';		            
                                  },
                            },
                  },
                  { 
                    table: {
                            widths:['3%','15%','5%','4%','3%','3%','7%','7%','7%','7%','15%','6%','5%','6%','7%'],
                            body:   [
                                        [ 
                                            {text:'Item', style:'titulostabla'}, 
                                            {text:'Nombre', style:'titulostabla'},
                                            {text:'Presentacion', style:'titulostabla'},
                                            {text:'Frec Uso', style:'titulostabla'},
                                            {text:'Dias Autor', style:'titulostabla'},
                                            {text:'Cant', style:'titulostabla'},
                                            {text:'Vlr unitario', style:'titulostabla'},
                                            {text:'Valor Total', style:'titulostabla'},
                                            {text:'Vlr Diferencia', style:'titulostabla'},
                                            {text:'Codigo Similar POS', style:'titulostabla'},
                                            {text:'Nombre del Similar pos', style:'titulostabla'},
                                            {text:'Frecuencia Uso', style:'titulostabla'},
                                            {text:'Tiempo Dias', style:'titulostabla'},
                                            {text:'Vlr Unitario', style:'titulostabla'},
                                            {text:'Valor total pos', style:'titulostabla'},
                                        ],
                                    ]
                            },
                  },
                  table(params.FACTURAS, params.COLUMNAS2, params.WIDTH2),
                  {
                    columns: [
                      {text: " ", width: "70%", style: "textousuarios"},
                      {text: "CERRO:", width: "5%", style: "textousuarios"},
                      {text: '0101', width: "5%", style: "textousuarios"},
                      {text: "ABRE:", width: "5%", style: "textousuarios"},
                      {text: '0101', width: "5%", style: "textousuarios"},
                      {text: "IMP:", width: "5%", style: "textousuarios"},
                      {text: '0101', width: "5%", style: "textousuarios"},
                    ]
                  }
                  ],
              styles:{
                    titulos:{
                        alignment: 'center',
                        fontSize: 18,
                        bold: true,
                    },
                    titulos2:{
                        alignment: 'center',
                        fontSize: 13,
                        bold: true,
                    },
                    titulos3:{
                        alignment: 'center',
                        fontSize: 11,
                        bold: true,
                    },
                    tituloscaja:{
                        fontSize:10,
                        bold: true,
                    },
                    titulostabla:{
                        fontSize:5,
                        bold: true,
                    },
                    texto:{
                        fontSize:8,
                    },
                    textonegrilla:{
                      fontSize: 8,
                      bold: true,
                    },
                    textocentrado:{
                        alignment: 'center',
                        fontSize:10,
                    },
                    textocajacentrado:{
                        alignment: 'center',
                        fontSize: 8,  
                    },
                    textotabla:{
                        fontSize: 5,
                    },
                    textoderecha:{
                        alignment: 'right',
                        fontSize: 8,
                    },
                    textousuarios:{
                        fontSize: 10,
                    },
                    textheadertable:{
                        fontSize: 5,
                    },
                }
            };
            datosimpresion.images = {
                logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png"
            };
            console.log(datosimpresion)
            _impresion2({
                tipo: "pdf",
                content: datosimpresion,
                archivo: `${localStorage.Usuario + moment().format("YYMMDD-HHmmss")}.pdf`,
            })
                .then(() => {
                // callback();
                CON851('','Proceso Terminado',_toggleNav(),'success','Exito')
                })
                .catch(err => {
                console.error(err);
                CON851('','Ocurrio un error en la impresion',this._evaluarmostrarfechacomp_SER457A(),'success','Exito')
                // errcallback();
                });
        },
        _cerrarnumeracion_SER457A() {
            console.log('cerrarnumeracion');
            if (this.form.estadofactura_SER457A.substring(0, 1) == '0' || this.form.estadofactura_SER457A.substring(0, 1) == '3') {
                if (this.SER457A.PREFIJOW == 'A' || this.SER457A.PREFIJOW == 'B' || this.SER457A.PREFIJOW == 'D' || this.SER457A.PREFIJOW == 'F' || this.SER457A.PREFIJOW == 'G' ||
                    this.SER457A.PREFIJOW == 'H' || this.SER457A.PREFIJOW == 'I' || this.SER457A.PREFIJOW == 'J' || this.SER457A.PREFIJOW == 'K') {
                    if (this.SER457A.FECHALNK.substring(0, 4) == this.SER457A.NUMERACION.FECHAING_NUM.substring(0, 4) && this.SER457A.FECHALNK.substring(4, 6) == this.SER457A.NUMERACION.FECHAING_NUM.substring(4, 6)) {
                        this._cerrarnumeracion2_SER457A();
                    } else {
                        CON851('3G', '3G', null, 'error', 'Error');
                        _toggleNav();
                    }
                } else {
                    this._cerrarnumeracion2_SER457A();
                }
            } else {
                _toggleNav();
            }
        },
        _cerrarnumeracion2_SER457A() {
            let URL = get_url("APP/SALUD/SAL020I.DLL");
            postData({
                datosh: datosEnvio() + SER457A.LLAVEW + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    this.SER457A.FECHAULTIMAFACT = data.FECHAULTIMAFACT
                    this.SER457A.FECHAULTIMAFACT.pop();
                    this.SER457A.FECHALIMI = '00000000';
                    if (this.SER457A.FECHAULTIMAFACT != '') { this.SER457A.FECHALIMI = this.SER457A.FECHAULTIMAFACT[this.SER457A.FECHAULTIMAFACT.length - 1] };
                    if (parseInt(this.SER457A.FECHALIMI) > parseInt(this.SER457A.FECHALNK)) {
                        CON851('', 'LA FECHA DEL ULT. COMP > A FECHA DEL MES', null, 'error', 'Error');
                        if (this.SER457A.PREFIJOW != 'C' && this.SER457A.PREFIJOW != 'E' && this.SER457A.PREFIJOW != 'Ñ' && this.SER457A.PREFIJOW != 'O' && this.SER457A.PREFIJOW != 'P' && this.SER457A.PREFIJOW != 'T' && this.SER457A.PREFIJOW != 'U') {
                            this._ventanacierrefact_SER457A();
                        } else {
                            _toggleNav();
                        }
                    } else {
                        this._ventanacierrefact_SER457A();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this._evaluarprefijo_SER457A();
                })
        },
        _ventanacierrefact_SER457A() {
            $_this = this
            var ventanacierre = bootbox.dialog({
                size: 'medium',
                title: 'CIERRE DE FACTURAS',
                message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Desea cerrar la factura?:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" id="CERRARFACT_SER457A"> ' +
                    '<input id="cerrar_SER457A" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +

                    '<div class="col-md-10 col-sm-6 col-xs-6" id="FECHACIE_SER457A"> ' +
                    '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "Fecha cierre:" + '</label> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="anocierre_SER457A" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="mescierre_SER457A" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM"> ' +
                    '</div> ' +
                    '<div class="col-md-3 col-sm-6 col-xs-6"> ' +
                    '<input id="diacierre_SER457A" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanacierre.off('show.bs.modal');
                            setTimeout(() => { $_this._grabarcierre_SER457A() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanacierre.off('show.bs.modal');
                            _toggleNav();
                        }
                    }
                }
            });
            ventanacierre.init($('.modal-footer').hide());
            ventanacierre.init(this._Evaluarcierrefact_SER457A());
            ventanacierre.on('shown.bs.modal', function () {
                $("#cerrar_SER457A").focus();
            });
        },
        _Evaluarcierrefact_SER457A() {
            _inputControl("disabled");
            validarInputs({
                form: '#CERRARFACT_SER457A',
                orden: "1"
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.SER457A.CERRARFACT = $('#cerrar_SER457A').val().toUpperCase();
                    if ((this.SER457A.CERRARFACT == 'S') || (this.SER457A.CERRARFACT == 'N')) {
                        if (this.SER457A.CERRARFACT == 'N') {
                            $('.btn-danger').click();
                        } else {
                            this._evaluarfechacierre_SER457A('3');
                        }
                    } else {
                        this._Evaluarcierrefact_SER457A();
                    }
                }
            )
        },
        _evaluarfechacierre_SER457A(orden) {
            let fechasistema = moment().format('YYYYMMDD');
            let fechacierre = moment().format('YYYYMMDD');
            this.SER457A.HORARETNUM = moment().format('HHmm');
            $('#anocierre_SER457A').val(fechacierre.substring(0, 4));
            $('#mescierre_SER457A').val(fechacierre.substring(4, 6));
            this.SER457A.ANORET = $('#anocierre_SER457A').val();
            this.SER457A.MESRET = $('#mescierre_SER457A').val();
            $('#diacierre_SER457A').val(fechacierre.substring(6, 8));
            validarInputs({
                form: '#FECHACIE_SER457A',
                orden: orden,
            },
                this._Evaluarcierrefact_SER457A,
                () => {
                    this.SER457A.DIARET = $('#diacierre_SER457A').val().padStart(2, '0');
                    this.SER457A.FECHARETNUM = this.SER457A.ANORET + this.SER457A.MESRET + this.SER457A.DIARET;
                    if ((parseInt(this.SER457A.DIARET) < 1) || (parseInt(this.SER457A.DIARET) > parseInt(this.SER457A.FECHALNK.substring(6, 8))) || parseInt(this.SER457A.FECHARETNUM) < (this.SER457A.FECHAING_NUM)) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER457A').val('N');
                        this._Evaluarcierrefact_SER457A()
                    } else if (fechasistema > SER457A.FECHARETNUM) {
                        CON851('37', '37', null, 'error', 'error');
                        $('#cerrar_SER457A').val('N');
                        this._Evaluarcierrefact_SER457A()
                    } else {
                        $('.btn-primary').click();
                    }
                }
            )
        },
        _grabarcierre_SER457A() {
            let URL = get_url("APP/SALUD/SER109D.DLL");
            postData({
                datosh: datosEnvio() + '4|' + $_USUA_GLOBAL[0].COD_CIUD + '|' + this.SER457A.LLAVEW + '| | |' + this.form.estadofactura_SER457A.substring(0, 1) + '| | | | | |' + localStorage.getItem('Usuario').trim() + '| | | |' + SER457A.FECHARETNUM + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    if (this.SER457A.PREFIJOW == 'P' || this.SER457A.PREFIJOW == 'T' || this.SER457A.PREFIJOW == 'Q' || this.SER457A.PREFIJOW == 'V') {
                        let URL = get_url("APP/SALUD/SAL020C.DLL");
                        postData({
                            datosh: datosEnvio() + this.SER457A.LLAVEW + '|' + this.SER457A.FECHALNK + '|'
                        }, URL)
                            .then((data) => {
                                console.debug(data);
                                CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
                                _toggleNav();
                            })
                            .catch((error) => {
                                console.log(error);
                                CON851('', 'Ocurrio un problema contactese con prosoft', null, 'error', 'Error');
                                _toggleNav();
                            })
                    } else {
                        let URL = get_url("APP/SALUD/SAL020B.DLL");
                        postData({
                            datosh: datosEnvio() + SER457A.LLAVEW + '|' + SER457A.FECHALNK + '|'
                        }, URL)
                            .then((data) => {
                                console.debug(data);
                                CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
                                _toggleNav();
                            })
                            .catch((error) => {
                                console.log(error);
                                CON851('', 'Ocurrio un problema contactese con prosoft', null, 'error', 'Error');
                                _toggleNav();
                            })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    CON851('', 'Hubo un error con el cierre', null, 'error', 'Error');
                    this._evaluarprefijo_SER457A();
                })
        }
    }
})

var porcentcopagoMask_SER457A = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    normalizeZeros: true,
    padFractionalZeros: true,
});

var prefijoMask_SER457A = IMask($('#prefijo_SER457A')[0], {
    mask: 'a',
    definitions: {
        'a': /[APTBDFGHIJKLMNQRSVWXYZ]/
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

var bloqueoMask_SER457A = IMask($('#bloquearfactura_SER457A')[0], {
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

var discriminardrogMask_SER457A = IMask($('#descriminardrog_SER457A')[0], {
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

var mostrarnrodrogMask_SER457A = IMask($('#mostrarcomprob_SER457A')[0], {
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

var mostrarfechacompMask_SER457A = IMask($('#fechadrog_SER457A')[0], {
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

var cambiarfechacompMask_SER457A = IMask($('#Cambiarfecha_SER457A')[0], {
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





