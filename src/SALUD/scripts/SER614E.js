new Vue({
    el: '#SER614E',
    data: {
        SER614E: [],
        form: {
            mesreportar_SER614E: '',
            mesreportard_SER614E: '',
            deseafolios_SER614E: '',
        }
    },
    created() {
        _inputControl('disabled');
        nombreOpcion("9,7,6,G,2 - Reporte facturación electronica");
        let $_this = this;
        loader('show');
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
            data = data.FIRMAS[0];
            $_this.SER614E.FIRMAS = data;
            loader('hide');
            $_this._evaluarnumeroenvio_SER614E();
        })
    },
    methods: {
        _evaluarnumeroenvio_SER614E() {
            validarInputs(
                {
                    form: "#VALIDAR1_SER614E",
                    orden: '1'
                },
                _toggleNav,
                () => {
                    this._evaluarfecha_SER614E();
                }
            )
        },
        _evaluarfecha_SER614E() {
            fechaMask_SER614E.typedValue = moment().format('YYYYMMDD');
            validarInputs(
                {
                    form: "#VALIDAR2_SER614E",
                    orden: '1'
                },
                this._evaluarnumeroenvio_SER614E,
                () => {
                    if (fechaMask_SER614E.value.trim() == '') {
                        this._evaluarfecha_SER614E();
                    } else {
                        this._evaluarmes_SER614E();
                    }
                }
            )
        },
        _evaluarmes_SER614E() {
            mesreportarMask_SER614E.typedValue = moment().format('MM');
            validarInputs(
                {
                    form: "#VALIDAR3_SER614E",
                    orden: '1'
                },
                this._evaluarfecha_SER614E,
                () => {
                    if (mesreportarMask_SER614E.value.trim() == '' || mesreportarMask_SER614E.value > 12) {
                        this._evaluarmes_SER614E();
                    } else {
                        let mes = {
                            '1': 'ENERO',
                            '2': 'FEBRERO',
                            '3': 'MARZO',
                            '4': 'ABRIL',
                            '5': 'MAYO',
                            '6': 'JUNIO',
                            '7': 'JULIO',
                            '8': 'AGOSTO',
                            '9': 'SEPTIEMBRE',
                            '10': 'OCTUBRE',
                            '11': 'NOVIEMBRE',
                            '12': 'DICIEMBRE',
                        }
                        this.form.mesreportard_SER614E = mes[mesreportarMask_SER614E.value];
                        this._evaluarfolios_SER614E();
                    }
                }
            )
        },
        _evaluarfolios_SER614E() {
            validarInputs(
                {
                    form: "#VALIDAR4_SER614E",
                    orden: '1'
                },
                this._evaluarmes_SER614E,
                () => {
                    if (mesreportarMask_SER614E.value.trim() == '') foliosMask_SER614E.typedValue = 'N'
                    postData({ datosh: `${datosEnvio()}${numeroenvioMask_SER614E.value.padStart(6, '0')}||${localStorage.Usuario}|` },
                        get_url("APP/SALUD/SER614E.DLL"))
                        .then((data) => {
                            this.SER614E.ENVIOS = data.FACTURAS[0];
                            this.SER614E.ENVIOS.FACTURAS.pop()
                            this._impresion_SER614E();
                        })
                        .catch(error => {
                            console.error(error);
                            this._evaluarfolios_SER614E();
                        });
                }
            )
        },
        _impresion_SER614E() {
            let datosimpresion = {
                pageSize: "LETTER",
                pageMargins: [15, 50, 15, 10],
                header: function (currentPage, pageCount, pageSize) {
                    return [
                        {
                            image: "logo",
                            fit: [60, 40],
                            absolutePosition: { x: 20, y: 10 },
                        },
                        { text: " " },
                        { text: $_USUA_GLOBAL[0].NOMBRE, style: "headerimpresion" },
                        { text: `NIT ${numeroencomas($_USUA_GLOBAL[0].NIT)}`, style: "headerimpresion" },
                    ]
                },
                content: [
                    { text: `${moment(fechaMask_SER614E.value.replace(/-/g, '')).format('MMMM DD [de] YYYY').toUpperCase()}`, style: "titulostexto" },
                    { text: "Señores:", style: "texto" },
                    {
                        columns: [
                            { text: this.SER614E.ENVIOS.DESCRIPCION.trim(), style: "titulostexto", width: '60%' },
                            { text: "REMISION:", style: "titulostexto", width: '8%' },
                            { text: `${numeroenvioMask_SER614E.value}`, style: "titulostexto", width: '22%' },
                        ]
                    },
                    { text: "E.   S.   D.", style: "texto" },
                    { text: " ", style: "texto" },
                    { text: `Adjunto a la presente estamos enviando la cuenta de cobro por los servicios prestados a sus afiliados en el mes de 20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)} ${this.form.mesreportard_SER614E}, para el tramite de pago:`, style: 'texto' },
                    { text: " ", style: "texto" },
                    {
                        table: {
                            widths: ['5%', '8%', '10%', '25%', '10%', '10%', '15%', '15%'],
                            body: [
                                [{ text: 'ITEM', style: 'textheadertable', border: [true, true, false, true] },
                                { text: 'FACTURA', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'FECHA', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'DESCRIPCION', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'VALOR', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'ABONO', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'NETO', style: 'textheadertable', border: [false, true, false, true] },
                                { text: 'DIAN', style: 'textheadertable', border: [false, true, true, true] }]
                            ]
                        }
                    },
                    construirtablaimpresiones(this.SER614E.ENVIOS.FACTURAS, ['ITEM', 'LLAVE', 'FECHAENV', 'DESCRIP', 'VLRBRUTO', 'VLRABONO', 'VLRNETO', 'ESTADO'], ['5%', '8%', '10%', '25%', '10%', '10%', '15%', '15%'])
                ],
                styles: {
                    headerimpresion: {
                        fontSize: 9,
                        bold: true,
                        alignment: 'center'
                    },
                    texto: {
                        fontSize: 9,
                    },
                    titulostexto: {
                        fontSize: 9,
                        bold: true,
                    },
                    titulosnumero: {
                        fontSize: 7,
                        bold: true,
                    },
                    textheadertable: {
                        fontSize: 7,
                        bold: true,
                    }
                },
            }
            let valortotal = valorabono = valorneto = 0;
            for (var i in this.SER614E.ENVIOS.FACTURAS) {
                if (this.SER614E.ENVIOS.FACTURAS[i].VLRBRUTO.trim() == '') this.SER614E.ENVIOS.FACTURAS[i].VLRBRUTO = 0
                if (this.SER614E.ENVIOS.FACTURAS[i].VLRABONO.trim() == '') this.SER614E.ENVIOS.FACTURAS[i].VLRABONO = 0
                if (this.SER614E.ENVIOS.FACTURAS[i].VLRNETO.trim() == '') this.SER614E.ENVIOS.FACTURAS[i].VLRNETO = 0                
                valortotal = valortotal + parseFloat(this.SER614E.ENVIOS.FACTURAS[i].VLRBRUTO);
                valorabono = valorabono + parseFloat(this.SER614E.ENVIOS.FACTURAS[i].VLRABONO);
                valorneto = valorneto + parseFloat(this.SER614E.ENVIOS.FACTURAS[i].VLRNETO);
            }
            datosimpresion.content.push({ text: ' ' })
            datosimpresion.content.push({ canvas: [{ type: "line", x1: 3, y1: 0, x2: 565, y2: 0, lineWidth: 1 }] }),
                datosimpresion.content.push({
                    columns: [
                        { text: "", style: "titulostexto", width: '40%' },
                        { text: "TOTALES:", style: "titulostexto", width: '8%' },
                        { text: valorestotales(valortotal.toString()), style: "titulosnumero", width: '10%' },
                        { text: valorestotales(valorabono.toString()), style: "titulosnumero", width: '10%' },
                        { text: valorestotales(valorneto.toString()), style: "titulosnumero", width: '10%' },
                    ]
                })
            datosimpresion.content.push({ text: ' ' })
            datosimpresion.content.push({ text: 'Estamos haciendo entrega del medio magnetico, debidamente validado con la malla validadora', style: 'texto' })
            datosimpresion.content.push({ text: ' ' })
            if ($_USUA_GLOBAL[0].NIT == 900566047) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 021335344 del Banco de BOGOTA y enviar al correo electronico lideraseguramientoyrecobro@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900541158) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 129145033 del Banco de BOGOTA y enviar al correo electronico enlacedosips@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 800037021) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 364 354 431 del Banco de BOGOTA y enviar al correo electronico                        la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 800037979) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 74200471-6 del Banco de BBVA y enviar al correo electronico hospiptolopez@yahoo.es la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900658867) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 129091781 del Banco de BOGOTA y enviar al correo electronico ___mavepharma@gmail.com___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900565371) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No 796078004 del Banco de BOGOTA y enviar al correo electronico analistacarterasalud@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 800037202) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No 971100089602 del Banco de Davivienda y enviar al correo electronico ___cartera@hospitalguamal.gov.co___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 892000458) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No ____________ del Banco de BOGOTA y enviar al correo electronico hospisanmartinese@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else if ($_USUA_GLOBAL[0].NIT == 900685768) {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No 33549218003 del Banco de BANCOLOMBIA y enviar al correo electronico ___tesoreria@omesalud.com___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            } else {
                datosimpresion.content.push({ text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No ____________ del Banco de ____________________ y enviar al correo electronico ________________________________________ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`, style: 'texto' })
            }
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: 'Atentamente,', style: 'texto' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({
                columns: [
                    {
                        image: "firma1",
                        fit: [60, 60],
                        width: '20%'
                    },
                    {
                        image: "firma2",
                        fit: [60, 60],
                        width: '40%',
                        margin: [20, 0]
                    },
                ]
            })
            datosimpresion.content.push({
                columns: [
                    { text: '____________________', style: 'texto', width: '20%' },
                    { text: '____________________________________________', style: 'texto', width: '40%', margin: [20, 0] }
                ]
            });
            datosimpresion.content.push({ text: ' ' });
            datosimpresion.content.push({ text: '' });
            let firma1 = firma2 = '';
            if ($_USUA_GLOBAL[0].NIT == 892000458) {
                firma1 = parseInt(this.SER614E.FIRMAS.DATOS_GER.substring(0, 10)).toString()
                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                postData({
                    datosh: datosEnvio() + parseInt(this.SER614E.FIRMAS.DATOS_GER.substring(0, 10)).toString() + "|",
                }, URL)
                    .then(data => {
                        datosimpresion.content.push({ text: data.TERCER[0].DESCRIP_TER, style: 'texto' });
                    }).catch(error => {
                        console.error(error)
                        datosimpresion.content.push({ text: ' ', style: 'texto' });
                    });
            } else if ($_USUA_GLOBAL[0].NIT == 892000401) {
                firma1 = parseInt(localStorage.IDUSU).toString();
                datosimpresion.content.push({ text: localStorage.Nombre, style: 'texto' });
                datosimpresion.content.push({ text: 'Radicacion de cuentas medicas', style: 'texto' });
            } else {
                firma1 = parseInt(this.SER614E.FIRMAS.FIRMA_GLOSA.substring(0, 10)).toString();
                let URL = get_url("APP/CONTAB/CON802_01.DLL");
                postData({
                    datosh: datosEnvio() + parseInt(this.SER614E.FIRMAS.FIRMA_GLOSA.substring(0, 10)).toString() + "|",
                }, URL)
                    .then(data => {
                        datosimpresion.content.push({ text: data.TERCER[0].DESCRIP_TER, style: 'texto' });
                    }).catch(error => {
                        datosimpresion.content.push({ text: ' ', style: 'texto' });
                    });
            }
            datosimpresion.content.push({ text: 'Responsable RIPS', style: 'texto' });
            datosimpresion.content.push({ text: '________________________________________________________________________________________________________________________', style: 'texto' });
            datosimpresion.images = {
                logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png",
                firma1: `P:\\FIRMAS\\${firma1}.png`,
                firma2: `P:\\FIRMAS\\${firma2}.png`
            };
            _impresion2({
                tipo: "pdf",
                content: datosimpresion,
                archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
            })
                .then(() => {
                    CON851('', 'Impreso Correctamente', _toggleNav(), 'success', '');
                })
                .catch(err => {
                    console.error(err);
                    this._evaluarfolios_SER614E();
                });
        },
    }
})

var numeroenvioMask_SER614E = IMask($('#numeroenvio_SER614E')[0], { mask: Number });
var fechaMask_SER614E = IMask($("#fecha_SER614E")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '1980', to: moment().format('YYYY'), maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
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
var mesreportarMask_SER614E = IMask($('#mesreportar_SER614E')[0], { mask: Number });
var foliosMask_SER614E = IMask($('#deseafolios_SER614E')[0], {
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

var valorestotales = IMask.createPipe({
    mask: Number,
    scale: 2,
    radix: ".",
    thousandsSeparator: ",",
    normalizeZeros: true,
    padFractionalZeros: true,
  });