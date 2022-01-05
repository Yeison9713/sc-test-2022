new Vue({
    el: "#FAC157",
    data: {
        form: {
            nombreusu_FAC157: '',
            nombrelote_FAC157: '',
            comprobante_FAC157: '',
            anoelab_FAC157: '',
            meselab_FAC157: '',
            diaelab_FAC157: '',
            prefijo_FAC157: '',
            factura_FAC157: '',
            anorecaudo_FAC157: '',
            mesrecaudo_FAC157:'',
            diarecaudo_FAC157:'',
            tercero_FAC157: '',
            fechavence_FAC157: '',
            anodir_FAC157: '',
            sucursal_FAC157: '',
            prefijotabla_FAC157: '',
            facturatabla_FAC157: '',
            descripfact_FAC157: '',
            tipofact_FAC157: '',
            numerotabla_FAC157: 0,
            codcontable_FAC157: '',
            nombrecta_FAC157: '',
            tercerotabla_FAC157: '',
            debito_FAC157: '',
            credito_FAC157: '',
            detalle_FAC157: '',
            totaldebito_FAC157: '',
            totalcredito_FAC157: '',
            centrocosto_FAC157: '',
            documento_FAC157: '',
        },
        FAC157: [],
        tablareccaja_FAC157: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader('show');
        nombreOpcion("Reimpresión de recibos de caja");
        let active = $('#navegacion').find('li.opcion-menu.active');
        if (active.length > 0) this.FAC157.OPCIONACTIVA = active[0].attributes[2].nodeValue;
        else this.FAC157.OPCIONACTIVA == SUCURSAL_0A
        if (this.FAC157.OPCIONACTIVA == '03421') this.FAC157.LOTE = '1R'
        else this.FAC157.LOTE = SUCURSAL_0A
        let $_this = this;
        obtenerDatosCompletos({ nombreFd: 'LOTES' }, data => {
            data = data.LOTES;
            data.pop();
            $_this.FAC157.LOTES = data;
            loader('hide');
            let lote = $_this.FAC157.LOTES.filter(x => x.LOTE == $_this.FAC157.LOTE)
            console.log(lote);
            if (lote.length > 0) {
                this.FAC157.NOMBRELOTE = lote[0].NOMBRE;
                this.form.nombreusu_FAC157 = `${$_this.FAC157.LOTE} - ${lote[0].NOMBRE}`
            } else {
                this.FAC157.NOMBRELOTE = 'COMPROBANTE INGRESO';
                this.form.nombreusu_FAC157 = `${$_this.FAC157.LOTE} - COMPROBANTE INGRESO`
            }
            postData(
                { datosh: `${datosEnvio()}1|${this.FAC157.LOTE}|` }, 
            get_url("APP/SALUD/FAC135.DLL"))
            .then(data => {
                this.FAC157.CONSECLOTE = data.CONSULTA[0].CONSEC_LOTE;
                this.FAC157.PREFIJOLOTE = data.CONSULTA[0].PREFIJO_LOTE;
                this._consultarconsecutivo_FAC157();
            })
            .catch(err => {
                console.error(err);
                this.FAC157.CONSECLOTE = '1'
                this.FAC157.PREFIJOLOTE = ''
                this._consultarconsecutivo_FAC157();
            })
        });
    },
    methods: {
        _consultarconsecutivo_FAC157(){
            let data = {};
            if (this.FAC157.CONSECLOTE == '1') data.datosh = `|${localStorage.Contab}|\\CONTROL\\|${this.FAC157.LOTE}|`
            else data.datosh = `${datosEnvio()}${this.FAC157.LOTE}|`
            postData(data,
            get_url("APP/CONTAB/CON007.DLL"))
            .then(data => {
                console.log(data);
                data = data.split("|");
                numeroreciboMask_FAC157.typedValue = (parseInt(data[1].substring(3,9)) - 1).toString();
                if (this.FAC157.OPCIONACTIVA == '03421') this._evaluarnumerorecibocaja_FAC157()
                else this._evaluarnumerorecibocaja_FAC157()
            })
            .catch(err => {
                console.error(err);
                _toggleNav();
            })
        },
        _evaluarnumerorecibocaja_FAC157() {
            this.tablareccaja_FAC157 = [];
            validarInputs(
                {
                    form: "#VALIDAR1_FAC157",
                    orden: '1'
                }, 
                _toggleNav,
                () => {
                    postData({
                        datosh: `${datosEnvio()}${this.FAC157.LOTE}${numeroreciboMask_FAC157.value.padStart(6,'0')}|`
                    }, get_url("APP/CONTAB/FAC157.DLL"))
                    .then(data => {
                        console.debug(data);
                        data.MOVIMIENTOS.pop();
                        this.FAC157.MOVIMIENTOS = data.MOVIMIENTOS;
                        this.form.anoelab_FAC157 = data.MOVIMIENTOS[0].LLAVEMOV.substring(28,30);
                        this.form.meselab_FAC157 = data.MOVIMIENTOS[0].LLAVEMOV.substring(30,32);
                        this.form.diaelab_FAC157 = data.MOVIMIENTOS[0].LLAVEMOV.substring(32,34);
                        this.form.anorecaudo_FAC157 = data.MOVIMIENTOS[0].FECHAVENCEMOV.substring(0,2);
                        this.form.mesrecaudo_FAC157 = data.MOVIMIENTOS[0].FECHAVENCEMOV.substring(2,4);
                        this.form.diarecaudo_FAC157 = data.MOVIMIENTOS[0].FECHAVENCEMOV.substring(4,6);
                        this.form.tercero_FAC157 = data.MOVIMIENTOS[0].DESCRIPIDMOV;
                        this.form.detalle_FAC157 = data.MOVIMIENTOS[0].DETALLEMOV;
                        this.form.centrocosto_FAC157 = data.MOVIMIENTOS[0].COSTO;
                        var valorcredito = valordebito = '0';
                        for (var i in data.MOVIMIENTOS){
                            let valor = data.MOVIMIENTOS[i].VALORMOV;
                            if (valor.indexOf('-') < 0) {
                                valorcredito = '0';
                                valordebito = valor;
                            } else {
                                valorcredito = valor;
                                valordebito = '0';
                            }
                            this.tablareccaja_FAC157.push({ CODIGO_CONTROL: data.MOVIMIENTOS[i].LLAVEMOV.substring(0,11), DESCRIP_CODIGO: data.MOVIMIENTOS[i].NOMBRECUENTAMOV, NIT: data.MOVIMIENTOS[i].IDMOV, SUCURSAL: data.MOVIMIENTOS[i].SUCMOV, DOCUM: data.MOVIMIENTOS[i].LLAVEMOV.substring(21,28), VALORDEBITO: valordebito, VALORCREDITO: valorcredito})
                        }
                        valorcredito = valordebito = 0;
                        console.log(this.tablareccaja_FAC157);
                        for (var i in this.tablareccaja_FAC157) {
                             valordebito = valordebito + parseFloat(this.tablareccaja_FAC157[i].VALORDEBITO.replace(/,/g,''))
                             console.log(valorcredito);
                             valorcredito = valorcredito + parseFloat(this.tablareccaja_FAC157[i].VALORCREDITO.replace(/ /g,'').replace(/,/g,''))
                             console.log(valorcredito);
                        }
                        this.form.totaldebito_FAC157 = numeroencomas(valordebito);
                        this.form.totalcredito_FAC157 = numeroencomas(valorcredito);
                        CON851P('00', this._evaluarnumerorecibocaja_FAC157, this._impresion_FAC157);
                    })
                    .catch(error => {
                        console.error(error);
                        _toggleNav();
                    });
                }
            )
        },
        _impresion_FAC157() {
            let impresion = new Object ;
            postData({ datosh: `${datosEnvio()}${this.FAC157.LOTE}|${numeroreciboMask_FAC157.value.padStart(6,'0')}|` },
            URL = get_url("APP/SALUD/FAC145.DLL"))
            .then(data => {
            impresion.DIRECCPACI = data.IMPRESION[0].DIRECC_PACI;
            impresion.TELTER = data.IMPRESION[0].TEL_TER;
            impresion.OPERMOV = data.IMPRESION[0].OPER_MOV;
            impresion.APELLIDOPACI = data.IMPRESION[0].APELLIDO_PACI;
            impresion.TELEFONOPACI = data.IMPRESION[0].TELEFONO_PACI;
            impresion.NETO = data.IMPRESION[0].NETO;
            impresion.DESCRIPCIONTERCERO = data.IMPRESION[0].DESCRIP_TER;
            impresion.IDTERCERO = numeroencomas(parseInt(data.IMPRESION[0].ID_PAC));
            impresion.DESCRIPCIONID = $_USUA_GLOBAL[0].NOMBRE;
            impresion.IDMOV = numeroencomas($_USUA_GLOBAL[0].NIT);
            impresion.COLUMNAS = ["CODIGO_CONTROL", "DESCRIP_CODIGO", "DOCUM", "VALORDEBITO", "VALORCREDITO"];
            impresion.WIDTH = ['13%', '43%', '15%', '15%', '15%'];
            impresion.LOTE = this.FAC157.LOTE;
            impresion.NOMBRELOTE = this.FAC157.NOMBRELOTE;
            impresion.COMPROBANTE = numeroreciboMask_FAC157.value.padStart(6,'0');
            impresion.FECHA = `20${this.form.anoelab_FAC157}${this.form.meselab_FAC157}${this.form.diaelab_FAC157}`;
            impresion.FECHA =  moment(impresion.FECHA).format("MMMM DD YYYY");
            impresion.VLRCREDITO = this.form.totalcredito_FAC157;
            impresion.VLRDEBITO = this.form.totaldebito_FAC157;
            impresion.VALORENLETRAS = FAC146(parseFloat(this.form.totalcredito_FAC157.replace(/,/g,'').replace(/-/g,'')));
            impresion.DETALLEMOV = this.form.detalle_FAC157;
            impresion.REFERMOV = this.FAC157.MOVIMIENTOS[0].REFERMOV;
            impresion.OTROMOV = this.FAC157.MOVIMIENTOS[0].OTROMOV;
            impresion.OPER = this.FAC157.MOVIMIENTOS[0].OPERELAB;
            impresion.TIPOCOMP = this.FAC157.LOTE;
            impresion.TABLA = this.tablareccaja_FAC157;
            _impresioncopagosyrecibosdecaja(impresion, this._evaluarnumerorecibocaja_FAC157, () => {
                CON851('', 'Impresion finalizada', null, 'success', '');
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    setTimeout(_cerrarSegundaVentana, 500);
                } else {
                    _toggleNav();
                }
            });
            })
            .catch(error => {
                console.error(error);
                this._evaluarnumerorecibocaja_FAC157();
            });
        },
        // F8
        _f8Movimientos_FAC157(e){
            $_this = this;
            if (e.which == 119 || e.type == 'click') {
                postData({ datosh: `${datosEnvio()}${this.FAC157.LOTE}|` },
                URL = get_url("APP/CONTAB/CON815.DLL"))
                .then(data => {
                    data.MOVIMIENTOS.pop();
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NUMERO", "FECHA", "REFERMOV","IDMOV","DESCRIPCION"],
                        data: data.MOVIMIENTOS,
                        callback_esc: function () {
                            $('#numerorecibo_FAC157').focus();
                        },
                        callback: function (data) {
                            console.log(data);
                            numeroreciboMask_FAC157.typedValue = parseInt(data.NUMERO).toString()
                            _enterInput('#numerorecibo_FAC157');
                        }
                    });
                })
                .catch(error => {
                    console.error(error);
                    this._evaluarnumerorecibocaja_FAC157();
                });
            }
        }
    },
})

var numeroreciboMask_FAC157 = IMask($('#numerorecibo_FAC157')[0], { mask: Number });