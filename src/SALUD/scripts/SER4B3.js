// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#SER4B3",
    data: {
        SER4B3: [],
        form: {
            suc_SER4B3: "",
            numero_SER4B3: "",
            fecha_SER4B3: "",
            hora_SER4B3: "",
            novedad_SER4B3: "",
            item_SER4B3: 1,
            paciente_SER4B3: "",
            origatencion_SER4B3: "",
            prioridad_SER4B3: "",
            cama_SER4B3: "",
            tiposerv_SER4B3: "",
            entidad_SER4B3: "",
            observacion_SER4B3: "",
            diagprincipal_SER4B3: "",
            diag1_SER4B3: "",
            diag2_SER4B3: "",
            protocolo_SER4B3: "",
            descripdiagprincipal_SER4B3: "",
            descripdiag1_SER4B3: "",
            descripdiag2_SER4B3: ""

        },
        tablaautoriz_SER4B3: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");

        if (localStorage.Modulo == "HIC") {
            nombreOpcion("7,D - Reimprimir autorizaciones servicio");
        } else {
            nombreOpcion("9,7,4,B,3 - Reimprimir autorizaciones servicio");
        }

        $_this = this;
        $_this.SER4B3.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.SER4B3.ANO_LNK = $_this.SER4B3.FECHA_LNK.substring(0, 2);
        $_this.SER4B3.MES_LNK = $_this.SER4B3.FECHA_LNK.substring(2, 4);
        $_this.SER4B3.DIA_LNK = $_this.SER4B3.FECHA_LNK.substring(4, 6);
        $_this.SER4B3.FECHAACTUAL = moment().format('YYYYMMDD');
        $_this.SER4B3.ANOACTUAL = $_this.SER4B3.FECHAACTUAL.substring(0, 4)
        $_this.SER4B3.MESACTUAL = $_this.SER4B3.FECHAACTUAL.substring(4, 6)
        $_this.SER4B3.DIAACTUAL = $_this.SER4B3.FECHAACTUAL.substring(6, 8)
        loader("hide");
        $_this._asignarnumero_SER4B3()
        obtenerDatosCompletos({
            nombreFd: 'UNSERV'
        }, function (data) {
            console.log(data, 'UNIDAD')
            $_this.SER4B3.UNISERVICIO = data.UNSERV;
            $_this.SER4B3.UNIDADSERVICIO = [];
            for (var i in $_this.SER4B3.UNISERVICIO) {
                console.log(i);
                if ($_this.SER4B3.UNISERVICIO[i].ESTADO.trim() == 'S') {
                    $_this.SER4B3.UNIDADSERVICIO.push($_this.SER4B3.UNISERVICIO[i]);
                }
            }
            for (var i in $_this.SER4B3.UNIDADSERVICIO) {
                $_this.SER4B3.UNIDADSERVICIO[i].DESCRIP = `${$_this.SER4B3.UNIDADSERVICIO[i].COD} - ${$_this.SER4B3.UNIDADSERVICIO[i].DESCRIP}`;
                $_this.SER4B3.UNIDADSERVICIO[i].COD = i;
            }
        })
    },
    methods: {
        _asignarnumero_SER4B3() {
            this.form.novedad_SER4B3 = "C CONSULTA"
            this.form.fecha_SER4B3 = moment().format('YYYY-MM-DD');
            this.form.hora_SER4B3 = moment().format('HH:mm');
            this.form.suc_SER4B3 = $_USUA_GLOBAL[0].PREFIJ
            this.SER4B3.SECUNUM = "AS"
            let URL = get_url("APP/CONTAB/CON007.DLL");
            postData({ datosh: datosEnvio() + this.SER4B3.SECUNUM }, URL)
                .then(data => {
                    var data = data.split("|");
                    this.SER4B3.ULTFECHANUM = data[2].trim();
                    this.SER4B3.NUMEROCTL = data[1].substring(3, 9);
                    this.SER4B3.NROW = parseInt(this.SER4B3.NUMEROCTL) - 1;
                    this.form.numero_SER4B3 = this.SER4B3.NROW.toString().padStart(6, '0')
                    this._evaluarnro_SER4B3();
                })
                .catch(err => {
                    console.error(err);
                    if (localStorage.Modulo == "HIC") {
                        setTimeout(_regresar_menuhis, 500)
                    } else {
                        setTimeout(_toggleNav, 500)
                    }
                })
        },

        _evaluarnro_SER4B3() {
            this.form.suc_SER4B3 = $_USUA_GLOBAL[0].PREFIJ
            validarInputs(
                {
                    form: "#VALIDARNROAUTO_SER4B3",
                    orden: "1",
                },
                () => {
                    if (localStorage.Modulo == "HIC") {
                        _regresar_menuhis();
                    } else {
                        _toggleNav();
                    }
                },
                () => {
                    this.form.numero_SER4B3 = this.form.numero_SER4B3.toString().padStart(6, '0')
                    postData({
                        datosh: datosEnvio() + '1|' + this.form.suc_SER4B3 + this.form.numero_SER4B3 + '|'
                    }, get_url("APP/SALUD/SER4B3.DLL"))
                        .then((data) => {
                            this.SER4B3.REGISTOAUTW = data.DATOAUTORIZ[0];
                            this.form.paciente_SER4B3 = this.SER4B3.REGISTOAUTW.ID
                            this.form.unidadserv_SER4B3 = this.SER4B3.REGISTOAUTW.PUERTA

                            this.form.descrippaciente_SER4B3 = this.SER4B3.REGISTOAUTW.APELPACI1 + ' ' + this.SER4B3.REGISTOAUTW.APELPACI2 + ' ' + this.SER4B3.REGISTOAUTW.NOMPACI1 + ' ' + this.SER4B3.REGISTOAUTW.NOMPACI2
                            let unidadservicio = this.SER4B3.UNISERVICIO.filter(x => x.DESCRIP.substring(0, 2) == this.SER4B3.REGISTOAUTW.PUERTA);
                            if (unidadservicio.length > 0) {
                                this.form.unidadserv_SER4B3 = unidadservicio[0].DESCRIP
                            } else {
                                this.form.unidadserv_SER4B3 = ""
                            }
                            let causa = { '01': 'ACCIDENTE TRABAJO', '02': 'ACCIDENTE TRANSITO', '03': 'ACCIDENTE RABICO', '04': 'ACCIDENTE OFIDICO', '05': 'OTRO TIPO DE ACCIDENTE', '06': 'EVENTO CATASTROFIC', '07': 'LESION POR AGRESION', '08': 'LESION AUTOINFLIGIDA', '09': 'SOSP. MALTRATO FISICO', '10': 'SOSP. ABUSO SEXUAL', '11': 'SOSP. VIOLENC. SEXUAL', '12': 'SOSP. MALTRATO EMOCIONAL', '13': 'ENFERMEDAD GENERAL', '14': 'ENFERMEDAD PROFESIONAL', '15': 'OTRA CAUSA' };
                            if (causa[this.SER4B3.REGISTOAUTW.CAUSA] == undefined) {
                                this.form.origatencion_SER4B3 = ""
                            } else {
                                this.form.origatencion_SER4B3 = this.SER4B3.REGISTOAUTW.CAUSA + ' - ' + causa[this.SER4B3.REGISTOAUTW.CAUSA]
                            }
                            let triage = { '1': 'Prioritaria', '2': 'No prioritaria' };
                            if (triage[this.SER4B3.REGISTOAUTW.TRIAGE] == undefined) {
                                this.form.prioridad_SER4B3 = ""
                            } else {
                                this.form.prioridad_SER4B3 = this.SER4B3.REGISTOAUTW.TRIAGE + ' - ' + triage[this.SER4B3.REGISTOAUTW.TRIAGE]
                            }
                            this.form.cama_SER4B3 = this.SER4B3.REGISTOAUTW.CAMA.trim()
                            let tipo = { '1': 'Posterior Atencion Inic.Urg', '2': 'Servicios Electivos' };
                            if (tipo[this.SER4B3.REGISTOAUTW.TIPO] == undefined) {
                                this.form.tiposerv_SER4B3 = ""
                            } else {
                                this.form.tiposerv_SER4B3 = this.SER4B3.REGISTOAUTW.TIPO + ' - ' + tipo[this.SER4B3.REGISTOAUTW.TIPO]
                            }
                            this.form.cama_SER4B3 = this.SER4B3.REGISTOAUTW.CAMA
                            this.form.entidad_SER4B3 = this.SER4B3.REGISTOAUTW.ENTID
                            this.form.descripentidad_SER4B3 = this.SER4B3.REGISTOAUTW.NOMB_ENT
                            this.form.justificacion_SER4B3 = `${this.SER4B3.REGISTOAUTW.TABLA_JUST[0].JUSTIF.replace(/&/g, '\n')}${this.SER4B3.REGISTOAUTW.TABLA_JUST[1].JUSTIF.replace(/&/g, '\n')}${this.SER4B3.REGISTOAUTW.TABLA_JUST[2].JUSTIF.replace(/&/g, '\n')}${this.SER4B3.REGISTOAUTW.TABLA_JUST[3].JUSTIF.replace(/&/g, '\n')}${this.SER4B3.REGISTOAUTW.TABLA_JUST[4].JUSTIF.replace(/&/g, '\n')}`
                            this.form.diagprincipal_SER4B3 = this.SER4B3.REGISTOAUTW.TABLA_DIAG[0].DIAG
                            this.form.descripdiagprincipal_SER4B3 = this.SER4B3.REGISTOAUTW.TABLA_DIAG[0].NOMBRE
                            this.form.diag1_SER4B3 = this.SER4B3.REGISTOAUTW.TABLA_DIAG[1].DIAG
                            this.form.descripdiag1_SER4B3 = this.SER4B3.REGISTOAUTW.TABLA_DIAG[1].NOMBRE
                            this.form.diag2_SER4B3 = this.SER4B3.REGISTOAUTW.TABLA_DIAG[2].DIAG
                            this.form.descripdiag2_SER4B3 = this.SER4B3.REGISTOAUTW.TABLA_DIAG[2].NOMBRE
                            let protocolo = { '1': 'P. Urgencias', '2': 'P. Consulta Ext', '3': 'P. Cirugia', '4': 'P. Hospitalizac', '5': 'P. Apoyo Diagno' };
                            if (protocolo[this.SER4B3.REGISTOAUTW.GUIA] == undefined) {
                                this.form.protocolo_SER4B3 = ""
                            } else {
                                this.form.protocolo_SER4B3 = this.SER4B3.REGISTOAUTW.GUIA + ' - ' + protocolo[this.SER4B3.REGISTOAUTW.GUIA]
                            }
                            // this.form.protocolo_SER4B3 = this.SER4B3.REGISTOAUTW.GUIA
                            this.tablaautoriz_SER4B3 = this.SER4B3.REGISTOAUTW.TABLA_CUPS
                            this.tablaautoriz_SER4B3.pop()
                            this._evaluarsolicitante_SER4B3()
                        })
                        .catch((error) => {
                            console.log(error);
                            this._evaluarnro_SER4B3()
                        });
                })
        },
        _evaluarsolicitante_SER4B3() {
            solicitantemedMask_SER4B3.typedValue = 'N';
            validarInputs(
                {
                    form: "#SOLICITANTE_SER4B3",
                    orden: "1",
                },
                this._asignarnumero_SER4B3,
                () => {
                    if (solicitantemedMask_SER4B3.value.trim() == '') solicitantemedMask_SER4B3.typedValue = 'N';
                    CON851P("00", this._evaluarsolicitante_SER4B3, this._impresion_SER4B3);

                },
            );
        },
        tablasSER4B3(data, width, height, widthcolumna) {
            data = data.split('');
            return {
                table: {
                    widths: width,
                    heights: height,
                    body: [this.construircuerpotabla(data)],
                    width: widthcolumna,
                }
            }
        },
        construircuerpotabla(data) {
            console.log(data);
            var body = [];
            data.forEach(function (array) {
                body.push({ text: array, style: 'texto' })
            })
            return body;
        },
        armarcupsSER4B3(data) {
            var tablascups = [];
            tablascups.push([{ text: `Manejo Integral Segun Guia de: ${this.SER4B3.DESCRIPCIONGUIA}`, style: 'texto', colSpan: 2 }, '', ''])
            tablascups.push([{ text: 'Codigo CUPS', style: 'texto', width: '100%', margin: [5, 0] }, { text: 'Cantidad', style: 'texto', width: '100%' }, { text: 'Descripcion', style: 'texto', width: '100%' }])
            for (var i in this.SER4B3.REGISTOAUTW.TABLA_CUPS) {
                if (this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].CUPS.trim() != '') {
                    tablascups.push([
                        this.tablasSER4B3(this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].CUPS, ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%'], '', ''),
                        this.tablasSER4B3(parseInt(this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].CANT).toString().padStart(3, '0'), ['5%', '5%', '5%'], '', ''),
                        { text: this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].DESCRIP_CUP, style: 'texto' }
                    ])
                }
            }
            return tablascups;
        },
        _impresion_SER4B3() {
            var tablascups = [];
            for (var i in this.SER4B3.REGISTOAUTW.TABLA_CUPS) {
                if (this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].CUPS.trim() != '') {
                    tablascups.push(
                        this.tablasSER4B3(this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].CUPS, ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%'], '', ''),
                        this.tablasSER4B3(parseInt(this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].CANT).toString().padStart(3, '0'), ['5%', '5%', '5%'], '', ''),
                        { text: this.SER4B3.REGISTOAUTW.TABLA_CUPS[i].DESCRIP_CUP, style: 'texto' }
                    )
                }
            }
            this.SER4B3.TABLACUPS = tablascups;
            var RC = TI = ASI = CC = MSI = CE = PA = ' ';
            this.SER4B3.REGISTOAUTW.ID = parseInt(this.SER4B3.REGISTOAUTW.ID).toString();
            if (this.SER4B3.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'CC') CC = 'X'
            if (this.SER4B3.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'CE') CE = 'X'
            if (this.SER4B3.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'PA') PA = 'X'
            if (this.SER4B3.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'TI') TI = 'X'
            if (this.SER4B3.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'RC') RC = 'X'
            if (this.SER4B3.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'AS') ASI = 'X'
            if (this.SER4B3.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'MS') MSI = 'X'
            var CONTRIBUTIVO = SUBSIDIADO = OTRO = DESPLAZADO = VINCULADO = ' ';
            if (this.SER4B3.REGISTOAUTW.TIPOPACI == 'C') CONTRIBUTIVO = 'X'
            else if (this.SER4B3.REGISTOAUTW.TIPOPACI == 'S') SUBSIDIADO = 'X'
            else if (this.SER4B3.REGISTOAUTW.TIPOPACI == 'V') VINCULADO = 'X'
            else if (this.SER4B3.REGISTOAUTW.TIPOPACI == 'O') OTRO = 'X'
            else DESPLAZADO = 'X'
            var ENFERMEDADOTRO = ENFERMEDADGENERAL = ACCIDENTETRABAJO = EVENTOCATASTROFICO = ENFERMEDADPROFESIONAL = ACCIDENTETRANSITO = ' ';
            if (this.SER4B3.REGISTOAUTW.CAUSA == '01') ACCIDENTETRABAJO = 'X'
            else if (this.SER4B3.REGISTOAUTW.CAUSA == '06') EVENTOCATASTROFICO = 'X'
            else if (this.SER4B3.REGISTOAUTW.CAUSA == '14') ENFERMEDADPROFESIONAL = 'X'
            else if (this.SER4B3.REGISTOAUTW.CAUSA == '02') ACCIDENTETRANSITO = 'X'
            else if (this.SER4B3.REGISTOAUTW.CAUSA == '13') ENFERMEDADGENERAL = 'X'
            else ENFERMEDADOTRO = 'X'
            var POSTERIORATENCION = SERVICIOSELECTIVOS = ' '
            if (this.SER4B3.REGISTOAUTW.TIPO == '1') POSTERIORATENCION = 'X'
            if (this.SER4B3.REGISTOAUTW.TIPO == '2') SERVICIOSELECTIVOS = 'X'
            var PRIORITARIA = NOPRIORITARIA = ' '
            if (this.SER4B3.REGISTOAUTW.TRIAGE == '1') PRIORITARIA = 'X'
            if (this.SER4B3.REGISTOAUTW.TRIAGE == '2') NOPRIORITARIA = 'X'
            var CONSULTAEXTERNA = HOSPITALIZACION = URGENCIAS = ' '
            if (this.SER4B3.REGISTOAUTW.PUERTA == '01') URGENCIAS = 'X'
            if (this.SER4B3.REGISTOAUTW.PUERTA == '02') CONSULTAEXTERNA = 'X'
            if (this.SER4B3.REGISTOAUTW.PUERTA == '03') HOSPITALIZACION = 'X'
            this.SER4B3.DESCRIPCIONGUIA = ' ';
            if (this.SER4B3.REGISTOAUTW.GUIA == '1') this.SER4B3.DESCRIPCIONGUIA = 'Protocolo de Urgencias'
            if (this.SER4B3.REGISTOAUTW.GUIA == '2') this.SER4B3.DESCRIPCIONGUIA = 'Protocolo de Consulta Externa'
            if (this.SER4B3.REGISTOAUTW.GUIA == '3') this.SER4B3.DESCRIPCIONGUIA = 'Protocolo de Cirugia'
            if (this.SER4B3.REGISTOAUTW.GUIA == '4') this.SER4B3.DESCRIPCIONGUIA = 'Protocolo de Hospitalizacion'
            if (solicitantemedMask_SER4B3.value.trim() == 'S') {
                NOMBREQUIENINFORMA = this.SER4B3.REGISTOAUTW.NOM_MEDICO;
                CARGOACTIVIDAD = this.SER4B3.REGISTOAUTW.DETALLE_MEDICO;
            } else {
                NOMBREQUIENINFORMA = localStorage.Nombre;
                CARGOACTIVIDAD = 'FRONT URGENCIAS';
            }
            var _this = this
            var dd = {
                pageSize: "LETTER",
                pageMargins: [15, 77, 15, 10],
                header: function (currentPage, pageCount, pageSize) {
                    // you can apply any logic and return any valid pdfmake element
                    return [
                        {
                            image: "logo",
                            fit: [60, 40],
                            absolutePosition: { x: 10, y: 10 },
                        },
                        { text: "MINISTERIO DE LA PROTECCION SOCIAL", style: 'textomayus' },
                        { text: "SOLICITUD DE AUTORIZACION DE SERVICIOS DE SALUD", style: 'textomayus' },
                        { text: " " },
                        {
                            columns: [
                                {
                                    text: 'NUMERO DE SOLICITUD', width: '30%', alignment: 'right', fontSize: 9, bold: true, margin: [0, 0, 4, 0]
                                },
                                _this.tablasSER4B3(_this.form.numero_SER4B3.padStart(6, ' '), ['16.6%', '16.6%', '16.6%', '16.6%', '16.6%', '16.6%'], '', '10%'),
                                {
                                    text: 'FECHA', width: '10%', style: 'titulos1'
                                },
                                _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.FECHA, ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'], '', '20%'),
                                {
                                    text: 'HORA', width: '10%', style: 'titulos1'
                                },
                                _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.HORA, ['20%', '20%', '20%', '20%'], '', '10%'),
                            ]
                        },
                        {
                            text: ' '
                        },
                        {
                            text: 'INFORMACION DEL PRESTADOR (solicitante)', style: 'titulos2', margin: [15, 0, 0, 0]
                        }
                    ]
                },
                content: [
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'NOMBRE' }]
                                    ]
                                },
                                style: 'texto',
                                width: '65%'
                            },
                            {
                                text: 'NIT', width: '10%', style: 'textocentrado',
                            },
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'X' }]
                                    ]
                                },
                                style: 'texto',
                                width: '3%'
                            },
                            {
                                text: ' ', width: '2%',
                            },
                            _this.tablasSER4B3(`${$_USUA_GLOBAL[0].NIT.toString().padStart(10, ' ')}-${$_USUA_GLOBAL[0].DV}`, ['8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%'], '', '20%'),
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: $_USUA_GLOBAL[0].NOMBRE }]
                                    ]
                                },
                                style: 'texto',
                                width: '65%'
                            },
                            {
                                text: 'CC', width: '10%', style: 'textocentrado',
                            },
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: ' ' }]
                                    ]
                                },
                                style: 'texto',
                                width: '3%'
                            },
                            {
                                text: ' ', width: '2%',
                            },
                            {
                                table: {
                                    widths: ['85%', '15%'],
                                    body: [
                                        [{ text: 'NUMERO' }, { text: 'DV' }]
                                    ]
                                },
                                style: 'texto',
                                width: '20%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        ['CODIGO']
                                    ]
                                },
                                style: 'texto',
                                width: '10%'
                            },
                            _this.tablasSER4B3(`${$_USUA_GLOBAL[0].COD_CIUD}${$_USUA_GLOBAL[0].NUIR}${$_USUA_GLOBAL[0].PREFIJ}`, ['8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%'], '', '25%'),
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: `DIRECCION PRESTADOR     ${$_USUA_GLOBAL[0].DIRECC}` }]
                                    ]
                                },
                                style: 'texto',
                                width: '65%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        ['TELEFONO']
                                    ]
                                },
                                style: 'texto',
                                width: '10%'
                            },
                            _this.tablasSER4B3(`${$_USUA_GLOBAL[0].TEL}`, ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '25%'),
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: ' ' }]
                                    ]
                                },
                                style: 'texto',
                                width: '65%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [' ']
                                    ]
                                },
                                style: 'texto',
                                width: '10%'
                            },
                            {
                                table: {
                                    widths: ['30%', '70%'],
                                    body: [
                                        [{ text: 'Indicat' }, { text: 'Numero' }]
                                    ]
                                },
                                style: 'texto',
                                width: '25%'
                            },
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: `Departamento:    ${$_USUA_GLOBAL[0].NOMBRE_DEP}` }]
                                    ]
                                },
                                style: 'texto',
                                width: '28%'
                            },
                            {
                                table: {
                                    widths: ['50%', '50%'],
                                    body: [
                                        [{ text: $_USUA_GLOBAL[0].COD_CIUD.substring(0, 1) }, { text: $_USUA_GLOBAL[0].COD_CIUD.substring(1, 2) }]
                                    ]
                                },
                                style: 'texto',
                                width: '4%'
                            },
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: `Municipio:    ${$_USUA_GLOBAL[0].NOMBRE_CIU}` }]
                                    ]
                                },
                                style: 'texto',
                                width: '28%'
                            },
                            {
                                table: {
                                    widths: ['30%', '30%', '30%'],
                                    body: [
                                        [{ text: $_USUA_GLOBAL[0].COD_CIUD.substring(2, 3) }, { text: $_USUA_GLOBAL[0].COD_CIUD.substring(3, 4) }, { text: $_USUA_GLOBAL[0].COD_CIUD.substring(4, 5) }]
                                    ]
                                },
                                style: 'texto',
                                width: '5%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: `ENTIDAD A LA QUE SE LE INFORMA (PAGADOR)       ${_this.SER4B3.REGISTOAUTW.NOMB_ENT}` }]
                                    ]
                                },
                                style: 'texto',
                                width: '60%'
                            },
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'CODIGO' }]
                                    ]
                                },
                                style: 'texto',
                                width: '30.5%'
                            },
                            _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.ENTID, ['12,5%', '12,5%', '12,5%', '12,5%', '12,5%', '12,5%'], '', '24%'),
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'DATOS DEL PACIENTE' }]
                                    ]
                                },
                                style: 'titulos1',
                                width: '100%'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['25%', '25%', '25%', '25%'],
                                    body: [
                                        [{ text: _this.SER4B3.REGISTOAUTW.APELPACI1 }, { text: _this.SER4B3.REGISTOAUTW.APELPACI2 }, { text: _this.SER4B3.REGISTOAUTW.NOMPACI1 }, { text: _this.SER4B3.REGISTOAUTW.NOMPACI2 }]
                                    ]
                                },
                                style: 'texto',
                                width: '100%'
                            },
                        ]
                    },
                    {
                        table: {
                            widths: ['25%', '25%', '25%', '25%'],
                            body: [
                                [{ text: '1er Apellido', style: 'texto' }, { text: '2do Apellido', style: 'texto' }, { text: '1er Nombre', style: 'texto' }, { text: '2do Nombre', style: 'texto' }],
                                [{ text: 'Tipo documento de identificación', style: 'texto' }, '', '', ''],
                                [{
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: RC }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Registro civil', style: 'texto' }
                                    ]
                                }, {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: PA }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Pasaporte', style: 'texto' }
                                    ]
                                },
                                _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.ID, ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', ''), ''],
                                [{
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: TI }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Tarjeta de identidad', style: 'texto' }
                                    ]
                                }, {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: ASI }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Adulto sin identificación', style: 'texto' }
                                    ]
                                }, { text: 'Numero documento de identificación', style: 'texto' }, ''],
                                [{
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: CC }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Cedula de ciudadania', style: 'texto' }
                                    ]
                                }, {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: MSI }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Menor sin identificación', style: 'texto' }
                                    ]
                                }, '', ''],
                                [{
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: CE }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Cedula de Extranjeria', style: 'texto' }
                                    ]
                                }, '', {
                                    columns: [
                                        {
                                            text: 'FECHA DE NACIMIENTO', width: '30%', style: 'texto'
                                        },
                                        _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.NACIMPACI, ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'], '', '40%'),
                                    ],
                                    colSpan: 2
                                }, ''],
                            ],
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: `Dirección de Residencia Habitual           ${_this.SER4B3.REGISTOAUTW.DIRECCPACI}` }]
                                    ]
                                },
                                style: 'texto',
                                width: '60%'
                            },
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'TELEFONO' }]
                                    ]
                                },
                                style: 'texto',
                                width: '16%'
                            },
                            _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.TELPACI.padStart(15, ' '), ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '30%'),
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: `Departamento:  ${_this.SER4B3.REGISTOAUTW.NOMDEP_PACI}` }]
                                    ]
                                },
                                style: 'texto',
                                width: '47%'
                            },
                            _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.CODCIU_PACI.substring(0, 2), ['50%', '50%'], '', '5%'),
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: `Municipio:  ${_this.SER4B3.REGISTOAUTW.NOMMUN_PACI}` }]
                                    ]
                                },
                                style: 'texto',
                                width: '40%'
                            },
                            _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.CODCIU_PACI.substring(2, 5), ['33%', '33%', '34%'], '', '8%'),
                        ]
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'Telefono Celular: ' }]
                                    ]
                                },
                                style: 'texto',
                                width: '16%'
                            },
                            _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.CELL_PACI.padStart(15, ' '), ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '24%'),
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'Correo Electronico ' }]
                                    ]
                                },
                                style: 'texto',
                                width: '60%'
                            },
                        ]
                    },
                    {
                        table: {
                            widths: ['25%', '25%', '25%', '25%'],
                            body: [
                                [
                                    { text: 'Cobertura en Salud', style: 'texto' }, '', '', ''
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: CONTRIBUTIVO }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Regimen contributivo', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: ' ' }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Regimen subsidiado-pacial', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: VINCULADO }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Poblacion pobre no asegurada sin SISBEN', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: ' ' }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Plan adicional de salud', style: 'texto' }
                                        ]
                                    }
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: SUBSIDIADO }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Regimen subsidiado-total', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: ' ' }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Poblacion pobre no asegurada con SISBEN', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: DESPLAZADO }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Desplazado', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: OTRO }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Otro', style: 'texto' }
                                        ]
                                    }
                                ],
                            ],
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [{ text: 'INFORMACION DE LA ATENCION Y SERVICIOS SOLICITADOS' }]
                                    ]
                                },
                                style: 'titulos1',
                                width: '100%'
                            },
                        ]
                    },
                    {
                        table: {
                            widths: ['20%', '20%', '20%', '20%', '20%'],
                            body: [
                                [{ text: 'Origen de la Atencion', style: 'texto' }, '', '', { text: 'Tipo de Servicio Solicitados', style: 'texto' }, { text: 'Prioridad de la Atencion', style: 'texto' }],
                                [{
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: ENFERMEDADGENERAL }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Enfermedad General', style: 'texto' }
                                    ]
                                }, {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: ACCIDENTETRABAJO }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Accidente de Trabajo', style: 'texto' }
                                    ]
                                }, {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: EVENTOCATASTROFICO }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Evento Catastrofico', style: 'texto' }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: POSTERIORATENCION }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Posterior a la Atencion Inicial de Urgencias', style: 'texto' }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: PRIORITARIA }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Prioritaria', style: 'texto' }
                                    ]
                                }
                                ],
                                [{
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: ENFERMEDADPROFESIONAL }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Enfermedad Profesional', style: 'texto' }
                                    ]
                                }, {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: ACCIDENTETRANSITO }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Accidente de Transito', style: 'texto' }
                                    ]
                                }, {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: ENFERMEDADOTRO }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Otro tipo', style: 'texto' }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: SERVICIOSELECTIVOS }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'Servicios Electivos', style: 'texto' }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            table: {
                                                widths: ['100%'],
                                                body: [
                                                    [{ text: NOPRIORITARIA }]
                                                ]
                                            },
                                            style: 'texto',
                                            width: '10%'
                                        },
                                        { text: 'No prioritaria', style: 'texto' }
                                    ]
                                }
                                ],
                            ],
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        table: {
                            widths: ['25%', '20%', '30%', '25%'],
                            body: [
                                [{ text: 'Ubicacion del paciente al momento de la solicitud de autorización:', style: 'texto', colSpan: 2 }, '', '', ''],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: CONSULTAEXTERNA }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Consulta Externa', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: HOSPITALIZACION }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Hospitalizacion', style: 'texto' }
                                        ]
                                    }, {
                                        columns: [
                                            { text: 'Servicios', style: 'texto' },
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: _this.SER4B3.REGISTOAUTW.DESCRIPSERVICIO }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '80%'
                                            },
                                        ]
                                    }, {
                                        columns: [
                                            {
                                                text: 'Cama', width: '30%', style: 'texto', margin: [10, 0]
                                            },
                                            _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.CAMA, ['20%', '20%', '20%', '20%'], '', '30%'),
                                        ]
                                    }
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['100%'],
                                                    body: [
                                                        [{ text: URGENCIAS }]
                                                    ]
                                                },
                                                style: 'texto',
                                                width: '10%'
                                            },
                                            { text: 'Urgencias', style: 'texto' }
                                        ]
                                    }, '', '', ''
                                ],
                            ],
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        table: {
                            widths: ['33%', '33%', '34%'],
                            heights: ['auto', 'auto', 'auto'],
                            dontBreakRows: true,
                            body:
                                _this.armarcupsSER4B3(this.SER4B3.REGISTOAUTW.TABLA_CUPS),
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [
                                [{ text: 'Justificacion Clinica', style: 'texto' }],
                                [{ text: `${_this.SER4B3.REGISTOAUTW.TABLA_JUST[0].JUSTIF.replace(/&/g, '\n')}${_this.SER4B3.REGISTOAUTW.TABLA_JUST[1].JUSTIF.replace(/&/g, '\n')}${_this.SER4B3.REGISTOAUTW.TABLA_JUST[2].JUSTIF.replace(/&/g, '\n')}${_this.SER4B3.REGISTOAUTW.TABLA_JUST[3].JUSTIF.replace(/&/g, '\n')}${_this.SER4B3.REGISTOAUTW.TABLA_JUST[4].JUSTIF.replace(/&/g, '\n')}`, style: 'texto', fontSize: 6.75 }],
                            ],
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        table: {
                            widths: ['33%', '13%', '54%'],
                            body: [
                                [{ text: 'Impresion Diagnostica', style: 'texto' }, { text: 'Codigo CIE10', style: 'texto' }, { text: 'Descripción', style: 'texto' },],
                            ]
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        table: {
                            widths: ['33%', '13%', '54%'],
                            dontBreakRows: true,
                            body: [
                                [
                                    { text: 'Diagnostico Principal', style: 'texto' },
                                    _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.TABLA_DIAG[0].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                                    { text: _this.SER4B3.REGISTOAUTW.TABLA_DIAG[0].NOMBRE, style: 'texto' }
                                ],
                                [
                                    { text: 'Diagnostico Relacionado 1', style: 'texto' },
                                    _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.TABLA_DIAG[1].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                                    { text: _this.SER4B3.REGISTOAUTW.TABLA_DIAG[1].NOMBRE, style: 'texto' }
                                ],
                                [
                                    { text: 'Diagnostico Relacionado 2', style: 'texto' },
                                    _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.TABLA_DIAG[2].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                                    { text: _this.SER4B3.REGISTOAUTW.TABLA_DIAG[2].NOMBRE, style: 'texto' }
                                ],
                                [
                                    { text: 'Diagnostico Relacionado 3', style: 'texto' },
                                    _this.tablasSER4B3(_this.SER4B3.REGISTOAUTW.TABLA_DIAG[3].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                                    { text: _this.SER4B3.REGISTOAUTW.TABLA_DIAG[3].NOMBRE, style: 'texto' }
                                ],
                            ]
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        table: {
                            dontBreakRows: true,
                            widths: ['100%'],
                            body: [
                                [{ text: 'INFORMACION DE LA PERSONA QUE INFORMA', style: 'titulos1' }],
                            ],
                        },
                    },
                    {
                        table: {
                            dontBreakRows: true,
                            widths: ['54%', '10%', '36%'],
                            body: [
                                [
                                    { text: 'Nombre de quien informa', style: 'texto' },
                                    { text: 'Telefono:', style: 'texto' },
                                    _this.tablasSER4B3(`${$_USUA_GLOBAL[0].TEL}`, ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '70%'),
                                ],
                            ],
                        },
                    },
                    {
                        table: {
                            widths: ['53.1%', '46.9%'],
                            body: [
                                [{ text: NOMBREQUIENINFORMA, style: 'texto' },
                                {
                                    columns: [
                                        { text: '', witdh: '1%' },
                                        { text: 'Indicativo', style: 'texto', witdh: '5%' },
                                        { text: 'Numero', style: 'texto', witdh: '5%' },
                                        { text: 'Extension', style: 'texto', witdh: '5%' }
                                    ]
                                },
                                ],
                            ],
                        },
                    },
                    {
                        table: {
                            widths: ['54%', '10%', '36%'],
                            body: [
                                [
                                    { text: `Cargo o Actividad                                                                  ${CARGOACTIVIDAD}`, style: 'texto' },
                                    { text: 'Telefono Celular:', style: 'texto' },
                                    {
                                        table: {
                                            widths: ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '9%', '9%', '9%'],
                                            body: [
                                                []
                                            ]
                                        },
                                        style: 'texto',
                                        width: '70%'
                                    },
                                ],
                            ],
                        },
                    },
                ],
                styles: {
                    titulos1: {
                        alignment: "center",
                        fontSize: 9,
                        bold: true,
                    },
                    titulos2: {
                        fontSize: 9,
                        bold: true,
                    },
                    textomayus: {
                        alignment: "center",
                        fontSize: 10,
                        bold: true,
                    },
                    texto: {
                        fontSize: 7,
                    },
                    textocentrado: {
                        alignment: "center",
                        fontSize: 9,
                    }
                },
            }
            dd.images = {
                logo: "C:\\PROSOFT\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png"
            };
            _impresion2({
                tipo: 'pdf',
                content: dd,
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
            })
                .then(() => {
                    if (localStorage.Modulo == "HIC") {
                        _regresar_menuhis();
                    } else {
                        _toggleNav();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    if (localStorage.Modulo == "HIC") {
                        _regresar_menuhis();
                    } else {
                        _toggleNav();
                    }
                });
        },
        //////////////F8-VENTANAS//////////////////////////////////
        _f8nroautorizacion_SER4B3() {
            $_this = this
            let URL = get_url("APP/SALUD/SER4B82.DLL");
            postData({
                datosh: datosEnvio() + localStorage['Usuario'] + "|"
            }, URL)
                .then((data) => {
                    loader("hide");
                    $_this.SER4B3.SOLICITUDES = data.ANEXO3;
                    $_this.SER4B3.SOLICITUDES.pop()
                    _ventanaDatos({
                        titulo: "VENTANA DE SOLICITUDES POR PACIENTE",
                        columnas: ["SUC", "NRO", "CED", "DESCRIP", "FECHA", "HORA", "ENTIDAD", "DIAG1", "DIAG2",],
                        data: $_this.SER4B3.SOLICITUDES,
                        ancho: "95%",
                        callback_esc: function () {
                            $(".numero_SER4B3").focus();
                        },
                        callback: function (data) {
                            $_this.form.suc_SER4B3 = data.SUC
                            $_this.form.numero_SER4B3 = data.NRO
                            _enterInput('.numero_SER4B3');
                        }
                    });

                })
                .catch((error) => {
                    console.log(error)
                    this._evaluarnro_SER4B3()
                });
        }
    },
});



var solicitantemedMask_SER4B3 = IMask($('#solicitantemed_SER4B3')[0], {
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

