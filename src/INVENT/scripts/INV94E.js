const { Debugger } = require("electron");
const { parse } = require("qs");

new Vue({
    el: '#INV94E',
    data: {
        INV94E: [],
        form: {
            sucursal_INV94E: '',
            prefijo_INV94E: '',
            prefijod_INV94E: '',
            cufe_INV94E: '',
            nitd_INV94E: '',
            costod_INV94E: '',
            item_INV94E: '',
            grupo_INV94E: '',
            articulo_INV94E: '',
            cl_INV94E: '',
            descripcionarticulo_INV94E: '',
            detalle_INV94E: '',
            opercre_INV94E: '',
            fechacrea_INV94E: '',
            opermodif_INV94E: '',
            fechamodif_INV94E: '',
            cufenota_INV94E: '',
            documento_INV94E: '',
            neto_INV94E: ''
        },
        tablaarticulos_INV94E: [],
        flagNotasNeg: false // se utiliza para notas con valor negativo, solo GEBC
    },
    created() {
        _inputControl('disabled');
        let active = $('#navegacion').find('li.opcion-menu.active');
        this.INV94E.OPCIONACTIVA = active[0].attributes[2].nodeValue;
        this.INV94E.NOVEDAD = '7'
        if (this.INV94E.OPCIONACTIVA == '0942E2') this.INV94E.NOVEDAD = '8'
        let $_this = this;
        _this = this; // pruebas
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, data => {
            data = data.PREFIJOS[0];
            $_this.INV94E.PREFIJOS = data;
            $_this.INV94E.PREFIJOS.TABLA.pop();
            obtenerDatosCompletos({ nombreFd: 'GRUPOS' }, data => {
                data = data.GRUPOS;
                data.pop();
                $_this.INV94E.GRUPOS = data;
                $_this.INV94E.GRUPOS = $_this.INV94E.GRUPOS.filter(x => x.TIPO.trim() == '0')
                obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, data => {
                    data = data.ARTICULOS
                    data.pop();
                    $_this.INV94E.ARTICULOS = data;
                })
                $_this._evaluardocumentoelaborar();
            })
        })
    },
    methods: {
        _evaluardocumentoelaborar() {
            var elaborar = [
                { COD: "1", DESCRIP: "Elaborar Nota Debito" },
                { COD: "2", DESCRIP: "Elaborar Nota credito" }
            ];
            POPUP(
                {
                    array: elaborar,
                    titulo: "Documento a elaborar",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    callback_f: () => {
                        _toggleNav();
                    },
                },
                elaborar => {
                    this.form.documento_INV94E = elaborar.COD + " - " + elaborar.DESCRIP;
                    switch (this.form.documento_INV94E.substring(0, 1)) {
                        case "1":
                            this.INV94E.SECU2 = 'x'
                            let opcion1 = {
                                '0942E1': '9,4,2,E,1 Elaborar nota Debito',
                                '0942E2': '9,4,2,E,2 Corregir nota Debito',
                                '0942E3': '9,4,2,E,3 Reimprimir nota Debito',
                            }
                            nombreOpcion(opcion1[this.INV94E.OPCIONACTIVA]);
                            break;
                        default:
                            this.INV94E.SECU2 = 'X'
                            let opcion2 = {
                                '0942E1': '9,4,2,E,1 Elaborar nota Credito',
                                '0942E2': '9,4,2,E,2 Corregir nota Credito',
                                '0942E3': '9,4,2,E,3 Reimprimir nota Credito',
                            }
                            nombreOpcion(opcion2[this.INV94E.OPCIONACTIVA]);
                            break;
                    }

                    this._evaluarsucursal_INV94E()
                },
            );

        },
        _evaluarsucursal_INV94E() {
            this.tablaarticulos_INV94E = []
            validarInputs(
                {
                    form: "#VALIDAR1_INV94E",
                    orden: '1'
                }, () => {
                    _toggleNav()
                },
                () => {
                    this.form.sucursal_INV94E = this.form.sucursal_INV94E.toUpperCase()
                    if (this.form.sucursal_INV94E.trim() == '') {
                        this._evaluarsucursal_INV94E();
                    } else {
                        console.log(this.INV94E.SECU2, 'CON007')
                        postData({ datosh: `${datosEnvio()}${this.form.sucursal_INV94E}${this.INV94E.SECU2}|` }, get_url("APP/CONTAB/CON007.DLL"))
                            .then(data => {
                                console.debug(data);
                                data = data.split("|");
                                nroMask_INV94E.typedValue = (parseInt(data[1].substring(3, 9))).toString();
                                if (this.INV94E.OPCIONACTIVA == '0942E1') {
                                    let prefijo = this.INV94E.PREFIJOS.TABLA.filter(x => x.PREFIJO.trim() == this.form.sucursal_INV94E.trim())
                                    console.log(prefijo);
                                    if (prefijo.length > 0) {
                                        this._evaluarfecha_INV94E();
                                    } else {
                                        CON851('01', '01', this._evaluarsucursal_INV94E(), 'error', 'Error');
                                    }
                                } else {
                                    nroMask_INV94E.typedValue = (parseInt(data[1].substring(3, 9)) - 1).toString();
                                    this._evaluarnrocredito_INV94E();
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                this._evaluarsucursal_INV94E();
                            })
                    }
                }
            )
        },
        _evaluarfecha_INV94E() {
            if (fechaMask_INV94E.value.trim() == '') fechaMask_INV94E.typedValue = moment().format("YYYYMMDD")
            validarInputs(
                {
                    form: "#VALIDAR2_INV94E",
                    orden: '1'
                },
                this._evaluarsucursal_INV94E,
                () => {
                    let dato = fechaMask_INV94E.value.replace(/-/g, '').padEnd(8, ' ').substring(6, 8);
                    console.log(dato)
                    if (dato.trim() == '1' || dato.trim() == '2' || dato.trim() == '3' || dato.trim() == '4' || dato.trim() == '5' || dato.trim() == '6' || dato.trim() == '7' || dato.trim() == '8' || dato.trim() == '9') {
                        fechaMask_INV94E.typedValue = `${fechaMask_INV94E.value.replace(/-/g, '').substring(0, 6)}0${dato.trim()}`
                    }
                    if (fechaMask_INV94E.value.trim() == '' || fechaMask_INV94E.value.length < 10) {
                        this._evaluarfecha_INV94E();
                    } else {
                        if (moment(fechaMask_INV94E.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
                            this._evaluarfecha_INV94E();
                        } else {
                            this._evaluarprefijo_INV94E();
                        }
                    }
                }
            )
        },
        _evaluarprefijo_INV94E() {
            validarInputs(
                {
                    form: "#VALIDAR3_INV94E",
                    orden: '1'
                },
                this._evaluarfecha_INV94E,
                () => {
                    this.form.prefijo_INV94E = this.form.prefijo_INV94E.toUpperCase();
                    if (this.form.prefijo_INV94E.trim() == '') {
                        CON851('02', '02', this._evaluarprefijo_INV94E(), 'error', 'Error');
                    } else {
                        if (this.form.prefijo_INV94E.trim() == this.form.sucursal_INV94E.trim()) {
                            let prefijo = this.INV94E.PREFIJOS.TABLA.filter(x => x.PREFIJO.trim() == this.form.prefijo_INV94E)
                            console.log(prefijo);
                            if (prefijo.length > 0) {
                                // this.form.prefijod_INV94E = prefijo[0].DESCRIPCION;
                                this._evaluarnrofactura_INV94E();
                            } else {
                                CON851('01', '01', this._evaluarprefijo_INV94E(), 'error', 'Error');
                            }
                        } else {
                            CON851('03', '03', this._evaluarprefijo_INV94E(), 'error', 'Error');
                        }
                    }
                }
            )
        },
        _evaluarnrofactura_INV94E() {
            this.INV94E.ITEM = 0;
            this.flagNotasNeg = false;
            validarInputs(
                {
                    form: "#VALIDAR4_INV94E",
                    orden: '1'
                },
                this._evaluarfecha_INV94E,
                () => {
                    if (this.form.prefijo_INV94E.trim() == '' || this.form.prefijo_INV94E == 0) {
                        CON851('01', '01', this._evaluarnrofactura_INV94E(), 'error', 'Error');
                    } else {
                        postData({ datosh: `${datosEnvio()}${this.form.prefijo_INV94E.trim()}${nrofacturaMask_INV94E.value.trim().padStart(6, '0')}|` },
                            get_url("APP/SALUD/SER808-01.DLL"))
                            .then(data => {
                                console.log(data);
                                this.INV94E.FACTURA = data.NUMER19[0];
                                nitMask_INV94E.typedValue = parseInt(this.INV94E.FACTURA.NIT_NUM).toString();
                                this.form.nitd_INV94E = this.INV94E.FACTURA.DESCRIP_NUM;
                                this.form.cufe_INV94E = this.INV94E.FACTURA.CUFEELEC_NUM.trim();
                                let fact = this.INV94E.FACTURA.TABLA_FACT.filter(x => parseInt(x.VLR_FACT) > 0);
                                this.tablafact_INV94E = fact;
                                let totalfact = 0;
                                for (var i in this.tablafact_INV94E) {
                                    if (parseInt(this.tablafact_INV94E[i].VLR_FACT) > 0) {
                                        totalfact = totalfact + parseInt(this.tablafact_INV94E[i].VLR_FACT);
                                    }
                                }
                                let totalabon = 0;
                                for (var i in this.tablaabon_INV94E) {
                                    if (parseInt(this.tablaabon_INV94E[i].VLR_ABON) > 0) {
                                        totalabon = totalabon - parseInt(this.tablaabon_INV94E[i].VLR_ABON);
                                    }
                                }
                                this.form.copagos_INV94E = valores_INV94E(parseInt(this.INV94E.FACTURA.COPAGOS_NUM).toString());
                                this.form.neto_INV94E = totalfact + totalabon - parseInt(this.INV94E.FACTURA.COPAGOS_NUM);
                                this.form.neto_INV94E = valores_INV94E(this.form.neto_INV94E.toString())
                                console.log(this.form.neto_INV94E)
                                postData({ datosh: `${datosEnvio()}${nitMask_INV94E.unmaskedValue.padStart(10, '0')}|` },
                                    get_url("APP/CONTAB/CON802_01.DLL"))
                                    .then(data => {
                                        this.INV94E.FACTORTER = data.TERCER[0].FACTOR.trim();
                                    }).catch(error => {
                                        console.error(error);
                                        this.INV94E.FACTORTER = '0';
                                    });

                                let negativo = this.INV94E.FACTURA.SALDO_NETO.indexOf('-')
                                let valor = parseInt(this.INV94E.FACTURA.SALDO_NETO.replace(/-/g, ''))
                                if (isNaN(valor)) valor = 0
                                if (negativo >= 0) valor = valor * -1
                                console.log(valor, 'VALOR NUM')
                                if ((valor == 0 || valor < 0) && this.form.documento_INV94E.substring(0, 1) == '2') {
                                    CON851('07', '07', null, 'error', 'error');
                                    CON851("", "No se puede realizar Nota debido a que factura esta en Cero", "", "warning", "");
                                    if (localStorage.Usuario == "GEBC") {
                                      this.flagNotasNeg = true;
                                    } else {
                                      this.flagNotasNeg = false;
                                      return this._evaluarnrofactura_INV94E();
                                    }
                                }
                                if (this.form.cufe_INV94E.trim() == '') {
                                    this._evaluarcufe_INV94E();
                                } else {
                                    this._evaluargrupotabla_INV94E();
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                this._evaluarnrofactura_INV94E();
                            })
                    }
                }
            )
        },
        _evaluarcufe_INV94E() {
            validarInputs(
                {
                    form: "#VALIDAR5_INV94E",
                    orden: '1'
                },
                this._evaluarnrofactura_INV94E,
                () => {
                    if (this.form.cufe_INV94E.trim() == '') {
                        this._evaluarcufe_INV94E();
                    } else {
                        this._evaluargrupotabla_INV94E();
                    }
                }
            )
        },
        _evaluargrupotabla_INV94E() {
            _FloatText({
                estado: "on",
                msg: [{ mensaje: "Oprima F3 para Continuar" }],
            });
            if (this.INV94E.ITEM > 4) {
                this._evaluardatoretencion_INV94E();
            } else {
                this.form.item_INV94E = this.INV94E.ITEM + 1;
                if (this.tablaarticulos_INV94E[this.INV94E.ITEM]) {
                    this.form.grupo_INV94E = this.tablaarticulos_INV94E[this.INV94E.ITEM].GRUPO;
                    this.form.articulo_INV94E = this.tablaarticulos_INV94E[this.INV94E.ITEM].ARTICULO;
                    this.form.cl_INV94E = this.tablaarticulos_INV94E[this.INV94E.ITEM].CL;
                    this.form.descripcionarticulo_INV94E = this.tablaarticulos_INV94E[this.INV94E.ITEM].DESCRIPCION;
                    cantidadMask_INV94E.typedValue = this.tablaarticulos_INV94E[this.INV94E.ITEM].CANTIDAD;
                    vlrunitarioMask_INV94E.typedValue = this.tablaarticulos_INV94E[this.INV94E.ITEM].VLRUNIT;
                    IVAMask_INV94E.typedValue = this.tablaarticulos_INV94E[this.INV94E.ITEM].IVA;
                }
                validarInputs(
                    {
                        form: "#VALIDAR6_INV94E",
                        orden: '1',
                        event_f3: this._evaluardatoretencion_INV94E
                    },
                    this._evaluarnrofactura_INV94E,
                    () => {
                        if (this.form.grupo_INV94E.trim() == '') {
                            this._evaluargrupotabla_INV94E();
                        } else {
                            postData({ datosh: `${datosEnvio()}1|${this.form.grupo_INV94E.trim()}|` },
                                get_url("APP/INVENT/INV94E.DLL"))
                                .then(data => {
                                    this.form.descripcionarticulo_INV94E = data;
                                    this._evaluararticulo_INV94E();
                                })
                                .catch(err => {
                                    console.error(err);
                                    this._evaluargrupotabla_INV94E();
                                })
                        }
                    }
                )
            }
        },
        _evaluararticulo_INV94E() {
            _FloatText({ estado: "off" });
            validarInputs(
                {
                    form: "#VALIDAR7_INV94E",
                    orden: '1'
                },
                this._evaluargrupotabla_INV94E,
                () => {
                    if (this.form.documento_INV94E.substring(0, 1) == '1' && this.form.articulo_INV94E != "00002") {
                        CON851('', 'Codigo pertenece a nota credito', null, 'error', 'error');
                        this._evaluararticulo_INV94E()
                    } else {
                        if (this.form.documento_INV94E.substring(0, 1) == '2' && this.form.articulo_INV94E != "00001") {
                            CON851('', 'Codigo pertenece a nota debito', null, 'error', 'error');
                            this._evaluararticulo_INV94E()
                        } else {
                            if (this.form.articulo_INV94E.trim() == '' || this.form.articulo_INV94E.trim() == 0) {
                                this._evaluararticulo_INV94E();
                            } else {
                                postData({ datosh: `${datosEnvio()}2|${this.form.grupo_INV94E.trim()}|${this.form.articulo_INV94E.trim().padEnd(13, ' ')}|` },
                                    get_url("APP/INVENT/INV94E.DLL"))
                                    .then(data => {
                                        this.form.cl_INV94E = data;
                                        this._evaluarclasearticulo_INV94E();
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        this._evaluararticulo_INV94E();
                                    })
                            }
                        }
                    }
                }
            )
        },
        _evaluarclasearticulo_INV94E() {
            if (localStorage.Usuario == "GEBC" && this.flagNotasNeg == true) {
              this._evaluarcantidad_INV94E();
            } else {
              validarInputs(
                {
                  form: "#VALIDAR8_INV94E",
                  orden: "1",
                },
                this._evaluargrupotabla_INV94E,
                () => {
                  postData(
                    {
                      datosh: `${datosEnvio()}3|${this.form.grupo_INV94E.trim()}|${this.form.articulo_INV94E
                        .trim()
                        .padEnd(13, " ")}|${this.form.cl_INV94E}|`,
                    },
                    get_url("APP/INVENT/INV94E.DLL")
                  )
                    .then((data) => {
                      this.form.descripcionarticulo_INV94E = data.DESCRIPCION;
                      vlrunitarioMask_INV94E.typedValue = data.VALOR;
                      this._evaluarcantidad_INV94E();
                    })
                    .catch((err) => {
                      console.error(err);
                      this._evaluargrupotabla_INV94E();
                    });
                }
              );
            }
        },
        _evaluarcantidad_INV94E() {
            cantidadMask_INV94E.value = '1'
            validarInputs(
                {
                    form: "#VALIDAR9_INV94E",
                    orden: '1'
                },
                this._evaluargrupotabla_INV94E,
                () => {
                    if (cantidadMask_INV94E.value.trim() == '') cantidadMask_INV94E.typedValue = '0.00'
                    this._evaluarvlrunitario_INV94E();
                }
            )
        },
        _evaluarvlrunitario_INV94E() {
            if (this.INV94E.NOVEDAD == '7') {
                vlrunitarioMask_INV94E.value = this.form.neto_INV94E
            }
            validarInputs(
                {
                    form: "#VALIDAR10_INV94E",
                    orden: '1'
                },
                this._evaluarcantidad_INV94E,
                () => {
                    if (vlrunitarioMask_INV94E.value.trim() == '') vlrunitarioMask_INV94E.typedValue = '0.00'
                    this._evaluariva_INV94E();
                }
            )
        },
        _evaluariva_INV94E() {
            validarInputs(
                {
                    form: "#VALIDAR11_INV94E",
                    orden: '1'
                },
                this._evaluarvlrunitario_INV94E,
                () => {
                    if (IVAMask_INV94E.value.trim() == '') IVAMask_INV94E.typedValue = '0.00'
                    if (this.tablaarticulos_INV94E[this.INV94E.ITEM]) {
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].GRUPO = this.form.grupo_INV94E.trim();
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].ARTICULO = this.form.articulo_INV94E.trim();
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].CL = this.form.cl_INV94E.trim();
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].DESCRIPCION = this.form.descripcionarticulo_INV94E.trim();
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].CANTIDAD = cantidadMask_INV94E.value;
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].VLRUNIT = vlrunitarioMask_INV94E.value;
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].VLRTOTIVA = ((parseFloat(vlrunitarioMask_INV94E.value.replace(/,/g, '')) * parseFloat(cantidadMask_INV94E.value.replace(/,/g, ''))) + parseFloat(IVAMask_INV94E.value.replace(/,/g, ''))).toString();
                        this.tablaarticulos_INV94E[this.INV94E.ITEM].IVA = IVAMask_INV94E.value;
                    } else {
                        let valor = (parseFloat(vlrunitarioMask_INV94E.value.replace(/,/g, '')) * parseFloat(cantidadMask_INV94E.value.replace(/,/g, ''))) + parseFloat(IVAMask_INV94E.value.replace(/,/g, ''));
                        let valoriva = IVAMask_INV94E.value;
                        IVAMask_INV94E.typedValue = valor.toString()
                        this.tablaarticulos_INV94E.push({ GRUPO: this.form.grupo_INV94E, ARTICULO: this.form.articulo_INV94E, CL: this.form.cl_INV94E, DESCRIPCION: this.form.descripcionarticulo_INV94E, CANTIDAD: cantidadMask_INV94E.value, VLRUNIT: vlrunitarioMask_INV94E.value, VLRTOTIVA: IVAMask_INV94E.value, IVA: valoriva })
                    }
                    let valorbruto = valorneto = iva = 0;
                    for (var i in this.tablaarticulos_INV94E) {
                        let valor = parseFloat(this.tablaarticulos_INV94E[i].VLRUNIT.replace(/,/g, '')) * parseFloat(this.tablaarticulos_INV94E[i].CANTIDAD.replace(/,/g, ''));
                        valorbruto = valorbruto + valor
                        iva = iva + (valor - parseFloat(this.tablaarticulos_INV94E[i].VLRTOTIVA.replace(/,/g, '')))
                    }
                    vlrbrutoMask_INV94E.typedValue = valorbruto.toString();
                    vlrivaMask_INV94E.typedValue = iva.toString();
                    vlrnetoMask_INV94E.typedValue = (valorbruto - iva).toString();
                    this.form.grupo_INV94E = '';
                    this.form.articulo_INV94E = '';
                    this.form.descripcionarticulo_INV94E = '';
                    cantidadMask_INV94E.typedValue = '';
                    vlrunitarioMask_INV94E.typedValue = '';
                    IVAMask_INV94E.typedValue = '';
                    this.INV94E.ITEM++;
                    this._evaluargrupotabla_INV94E();
                }
            )
        },
        _evaluardatoretencion_INV94E() {
            _FloatText({ estado: "off" });
            vlrrtefteMask_INV94E.typedValue = '0.00'
            if (!this.INV94E.NOTA) this.INV94E.NOTA = new Object;
            if (!this.INV94E.NOTA.RETEICA) this.INV94E.NOTA.RETEICA = '0.00';
            this.INV94E.BASERETW = parseFloat(vlrbrutoMask_INV94E.value.replace(/,/g, '')) - parseFloat(this.INV94E.NOTA.RETEICA);
            validarInputs(
                {
                    form: "#VALIDAR12_INV94E",
                    orden: '1'
                },
                () => {
                    this.INV94E.ITEM = 0;
                    this._evaluargrupotabla_INV94E();
                },
                () => {
                    if (porcentajertefteMask_SER109.value.trim() == '') porcentajertefteMask_SER109.typedValue = '0'
                    let tiporet = {
                        '0': '0',
                        '1': '0.1',
                        '2': '1.5',
                        '3': '3.5',
                        '4': '4.0',
                        '5': '7.0',
                        '6': '11',
                        '7': '1',
                        '8': '2.0',
                        '9': '9',
                        'A': '2.5',
                        '': '0'
                    }
                    let porcentret = tiporet[porcentajertefteMask_SER109.value];
                    if (porcentret == '9') {
                        validarInputs(
                            {
                                form: "#VALIDAR13_INV94E",
                                orden: '1'
                            },
                            this._evaluardatoretencion_INV94E,
                            () => {
                                vlrtotalMask_INV94E.typedValue = (parseFloat(vlrnetoMask_INV94E.value.replace(/,/g, '')) - parseFloat(vlrrtefteMask_INV94E.value.replace(/,/g, ''))).toString();
                                this._evaluardatodetalle_INV94E();
                            }
                        )
                    } else {
                        vlrrtefteMask_INV94E.typedValue = (this.INV94E.BASERETW * parseFloat(porcentret)).toString();
                        vlrtotalMask_INV94E.typedValue = (parseFloat(vlrnetoMask_INV94E.value.replace(/,/g, '')) - parseFloat(vlrrtefteMask_INV94E.value.replace(/,/g, ''))).toString();
                        this._evaluardatodetalle_INV94E();
                    }
                }
            )
        },
        _evaluardatodetalle_INV94E() {
            validarInputs(
                {
                    form: "#VALIDAR14_INV94E",
                    orden: '1'
                },
                () => {
                    this.INV94E.ITEM = 0;
                    this._evaluargrupotabla_INV94E();
                },
                () => {
                    if (this.form.documento_INV94E.substring(0, 1) == '1') {
                        this.INV94E.TIPONOTA = 0
                        CON851P('01', this._evaluardatodetalle_INV94E, this.grabarnotacredito_INV94E);
                    } else {
                        this._evaluartiponota_INV94E();
                    }
                }
            )
        },

        _evaluartiponota_INV94E() {
            var tipo = [
                { COD: "1", DESCRIP: "Devolución" },
                { COD: "2", DESCRIP: "Ajuste de factura" },
            ];
            POPUP(
                {
                    array: tipo,
                    titulo: "Estado de Nota",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    callback_f: () => {
                        this._evaluardatodetalle_INV94E()
                    },
                },
                tipo => {
                    this.INV94E.TIPONOTA = tipo.COD
                    CON851P('01', this._evaluardatodetalle_INV94E, this.grabarnotacredito_INV94E);
                },
            );
        },
        grabarnotacredito_INV94E() {
            if (this.INV94E.NOVEDAD == '7') {
                this.INV94E.OPERCREA = localStorage.Usuario.trim();
                this.INV94E.FECHACREA = moment().format('YYYYMMDD');
                this.INV94E.OPERMOD = '';
                this.INV94E.FECHAMOD = '';
            } else {
                if (this.INV94E.OPERMOD.trim() == '') {
                    this.INV94E.OPERMOD = localStorage.Usuario.trim();
                    this.INV94E.FECHAMOD = moment().format('YYYYMMDD');
                }
            }
            let datosenvio = new Object;
            datosenvio.datosh = `${datosEnvio()}4||||${this.form.sucursal_INV94E}${nroMask_INV94E.value.padStart(6, '0')}|${this.form.prefijo_INV94E}${nrofacturaMask_INV94E.value.padStart(6, '0')}|${fechaMask_INV94E.value.replace(/-/g, '')}|${nitMask_INV94E.unmaskedValue.padStart(10, '0')}|`
            datosenvio.datosh += `${vlrbrutoMask_INV94E.value.replace(/,/g, '').padStart(15, '0')}|${vlrivaMask_INV94E.value.replace(/,/g, '').padStart(15, '0')}|${vlrnetoMask_INV94E.value.replace(/,/g, '').padStart(15, '0')}|${vlrrtefteMask_INV94E.value.replace(/,/g, '').padStart(15, '0')}|000000000000.00|000000000000.00|${vlrtotalMask_INV94E.value.replace(/,/g, '').padStart(15, '0')}|`
            datosenvio.datosh += `${this.form.detalle_INV94E.trim()}|${porcentajertefteMask_SER109.value}|${this.form.cufenota_INV94E}|${this.INV94E.OPERCREA}|${this.INV94E.FECHACREA}|${this.INV94E.OPERMOD}|${this.INV94E.FECHAMOD}|${this.INV94E.NOVEDAD}|${this.form.documento_INV94E.substring(0, 1)}|${this.INV94E.TIPONOTA}|`
            var lin = 1;
            for (var i in this.tablaarticulos_INV94E) {
                let valorunit = parseFloat(this.tablaarticulos_INV94E[i].VLRUNIT)
                if (isNaN(valorunit)) valor = '000000000000.00';
                else valorunit = this.tablaarticulos_INV94E[i].VLRUNIT.replace(/,/g, '').toString().padStart(15, '0');
                let valoriva = parseFloat(this.tablaarticulos_INV94E[i].IVA);
                if (isNaN(valoriva)) valoriva = '000000000000.00';
                else valoriva = this.tablaarticulos_INV94E[i].IVA.replace(/,/g, '').toString().padStart(15, '0');
                let cantidad = parseFloat(this.tablaarticulos_INV94E[i].CANTIDAD)
                if (isNaN(cantidad)) cantidad = '000000000000.00';
                else cantidad = this.tablaarticulos_INV94E[i].CANTIDAD.replace(/,/g, '').toString().padStart(15, '0');
                let valortotal = parseFloat(this.tablaarticulos_INV94E[i].VLRTOTIVA);
                if (isNaN(valortotal)) valortotal = '000000000000.00';
                else valortotal = this.tablaarticulos_INV94E[i].VLRTOTIVA.replace(/,/g, '').toString().padStart(15, '0');
                datosenvio['LIN-' + lin.toString().padStart(3, '0')] = `0${this.tablaarticulos_INV94E[i].GRUPO}${this.tablaarticulos_INV94E[i].ARTICULO}${this.tablaarticulos_INV94E[i].CL}|${cantidad}|${valorunit}|${valoriva}|${valortotal}|`
                lin++;
            }
            console.log(datosenvio);
            postData(datosenvio,
                get_url("APP/INVENT/INV94E.DLL"))
                .then(data => {
                    console.log(data);
                    nroMask_INV94E.typedValue = parseInt(data).toString();
                    if (this.INV94E.NOVEDAD == '7') {
                        postData({ datosh: `${datosEnvio()}${this.form.sucursal_INV94E}${this.INV94E.SECU2}|${moment().format('YYMMDD')}|${nroMask_INV94E.value.padStart(6, '0')}|` },
                            get_url("APP/CONTAB/CON007X.DLL"))
                            .then(data => {
                                var data = data.split("|");
                                console.log(data);
                                this._contabilizacion_INV94E()
                            })
                            .catch(err => {
                                console.error(err);
                                this._evaluardatodetalle_INV94E();
                            });
                    } else {
                        this._contabilizacion_INV94E()
                    }
                })
                .catch(err => {
                    console.error(err);
                    this._evaluardatodetalle_INV94E();
                })
        },
        _contabilizacion_INV94E() {
            console.log('CONTABILIZA');
            if (localStorage.Usuario == "GEBC" && this.flagNotasNeg == true) {
                CON851P('00', _toggleNav, this._imprimir_INV94E);
            } else {
                postData({ datosh: `${datosEnvio()}${this.form.sucursal_INV94E}${nroMask_INV94E.value.padStart(6, '0')}|${this.form.documento_INV94E.substring(0, 1)}|` },
                    get_url("APP/SALUD/SAL020DE.DLL"))
                    .then(data => {
                        console.log(data, 'RESP');
                        CON851P('00', _toggleNav, this._imprimir_INV94E);
                    })
                    .catch(err => {
                        console.error(err);
                        this._evaluardatodetalle_INV94E();
                    });

            }
        },
        _evaluarnrocredito_INV94E() {
            validarInputs(
                {
                    form: "#VALIDAR15_INV94E",
                    orden: '1'
                },
                this._evaluarsucursal_INV94E,
                () => {
                    if (nroMask_INV94E.value == '' || nroMask_INV94E.value == 0) {
                        this._evaluarnrocredito_INV94E();
                    } else {
                        this.tablaarticulos_INV94E = []
                        postData({ datosh: `${datosEnvio()}5||||${this.form.sucursal_INV94E}${nroMask_INV94E.value.padStart(6, '0')}|||||||||||||||||||${this.form.documento_INV94E.substring(0, 1)}|` }, get_url("APP/INVENT/INV94E.DLL"))
                            .then(data => {
                                console.debug(data);
                                fechaMask_INV94E.typedValue = data.FECHA;
                                this.form.prefijo_INV94E = data.LLAVEFACT.substring(0, 1);
                                nrofacturaMask_INV94E.typedValue = data.LLAVEFACT.substring(1, 7);
                                this.form.cufenota_INV94E = data.CUFE;
                                for (var i in data.TABLA) {
                                    if (data.TABLA[i].GRUPO.trim() != '') {
                                        this.tablaarticulos_INV94E.push(data.TABLA[i])
                                    }
                                }
                                nitMask_INV94E.typedValue = data.NIT;
                                vlrbrutoMask_INV94E.typedValue = data.TOTALBRUTO;
                                vlrivaMask_INV94E.typedValue = data.TOTALIVA;
                                vlrnetoMask_INV94E.typedValue = data.TOTALNETO;
                                vlrrtefteMask_INV94E.typedValue = data.TOTALRETEFUENT;
                                porcentajertefteMask_SER109.typedValue = data.TIPORET;
                                this.form.detalle_INV94E = data.OBSERVACIONES;
                                this.form.opercre_INV94E = data.OPERCREA;
                                this.form.fechacrea_INV94E = data.FECHACREA;
                                this.form.opermodif_INV94E = data.OPERMOD;
                                this.form.fechamodif_INV94E = data.FECHAMOD;
                                this.INV94E.OPERCREA = data.OPERCREA;
                                this.INV94E.FECHACREA = data.FECHACREA;
                                this.INV94E.OPERMOD = data.OPERMOD;
                                this.INV94E.FECHAMOD = data.FECHAMOD;
                                let nota = { '1': 'Devolución', '2': 'Ajuste de factura', '3': 'Glosa' };
                                if (nota[data.TIPONOTA] == undefined) {
                                    this.form.tiponota_INV94E = ''
                                } else {
                                    this.form.tiponota_INV94E = data.TIPONOTA + ' - ' + nota[data.TIPONOTA]
                                }
                                this.INV94E.TIPONOTA = data.TIPONOTA
                                if (this.INV94E.OPCIONACTIVA == '0942E3') {
                                    CON851P('00', _toggleNav, this._imprimir_INV94E);
                                } else {
                                    if (this.INV94E.TIPONOTA == '3') {
                                        CON851('', 'Nota no se puede modificar fue creada desde una glosa', null, 'error', 'error');
                                        return this._evaluarnrocredito_INV94E();
                                    } else {
                                        this._evaluarprefijo_INV94E();
                                    }
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                this._evaluarnrocredito_INV94E();
                            })
                    }
                }
            )
        },
        _imprimir_INV94E() {
            _toggleNav()
        },
        // F8
        _ventananota_INV94E() {
            var $_this = this;
            let URL = get_url("APP/SALUD/SAL94E.DLL");
            postData({
                datosh: datosEnvio() + this.form.documento_INV94E.substring(0, 1) + '|' + this.form.sucursal_INV94E + '|'
            }, URL)
                .then((data) => {
                    loader("hide");
                    $_this.INV94E.NOTAS = data.NOTA;
                    $_this.INV94E.NOTAS.pop()
                    _ventanaDatos({
                        titulo: 'VENTANA DE NOTAS',
                        columnas: ["LLAVENOTA", "FACTURA", "DESCRIP", "VALOR", "TIPO", "GLOSA"],
                        data: $_this.INV94E.NOTAS,
                        ancho: '90%',
                        callback_esc: function () {
                            $(".nro_INV94E").focus();
                        },
                        callback: function (data) {
                            console.log(data.LLAVENOTA.substring(1, 7))
                            $_this.form.sucursal_INV94E = data.LLAVENOTA.substring(0, 1)
                            nroMask_INV94E.typedValue = data.LLAVENOTA.substring(1, 7)
                            console.log(nroMask_INV94E.value)
                            _enterInput('.nro_INV94E');
                        }
                    });

                })
                .catch((error) => {
                    console.log(error)
                    $_this.form.numero_SER442
                });
        },
        _ventanaGrupos_INV94E(e) {
            let $_this = this;
            if (e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE GRUPOS',
                    columnas: ["GRUPO", "DESCRIP"],
                    data: this.INV94E.GRUPOS,
                    callback_esc: function () {
                        $('.grupo_INV94E').focus();
                    },
                    callback: function (data) {
                        $_this.form.grupo_INV94E = data.GRUPO.trim();
                        _enterInput('.grupo_INV94E');
                    }
                });
            }
        },
        _ventanaArticulos_INV94E(e) {
            let articulos = this.INV94E.ARTICULOS.filter(x => x.LLAVE_ART.substring(1, 3) == this.form.grupo_INV94E)
            let $_this = this;
            if (e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE ARTICULOS',
                    columnas: ["LLAVE_ART", "DESCRIP_ART"],
                    data: articulos,
                    callback_esc: function () {
                        $('.articulo_INV94E').focus();
                    },
                    callback: function (data) {
                        $_this.form.articulo_INV94E = data.LLAVE_ART.substring(3, 18);
                        _enterInput('.articulo_INV94E');
                    }
                });
            }
        }
    }
})

var nroMask_INV94E = IMask($('#nro_INV94E')[0], { mask: Number });
var fechaMask_INV94E = IMask($("#fecha_INV94E")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: moment().format('YYYY'), to: moment().format('YYYY'), maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: moment().format('MM'), to: moment().format('MM'), maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});
var nrofacturaMask_INV94E = IMask($('#nrofact_INV94E')[0], { mask: Number });
var nitMask_INV94E = IMask($('#nit_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var cantidadMask_INV94E = IMask($('#cantidad_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var vlrunitarioMask_INV94E = IMask($('#vlrunitario_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var IVAMask_INV94E = IMask($('#IVA_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var vlrbrutoMask_INV94E = IMask($('#vlrbruto_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var vlrivaMask_INV94E = IMask($('#vlriva_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var vlrnetoMask_INV94E = IMask($('#vlrneto_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var porcentajertefteMask_SER109 = IMask($('#porcentrtefte_INV94E')[0], {
    mask: '*',
    definitions: {
        '*': /[0123456789A]/
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
var vlrrtefteMask_INV94E = IMask($('#vlrrtefte_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });
var vlrtotalMask_INV94E = IMask($('#vlrtotal_INV94E')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 });

var valores_INV94E = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: '.',
    thousandsSeparator: ',',
    normalizeZeros: true,
    padFractionalZeros: true,
    min: -999999999999,
    max: 999999999999
});