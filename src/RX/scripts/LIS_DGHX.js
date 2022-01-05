new Vue({
    el: '#LIS_DGHX',
    data: {
        anoListado: '',
        mesPREListado: '',
        diaPREListado: '',
        mesPOSListado: '',
        diaPOSListado: ''
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');

        nombreOpcion('6,3 - Listado por fecha órdenes DGH')

        this.montarAno()
        _this = this;
    },
    watch: {

    },
    methods: {
        montarAno() {
            this.anoListado = (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) + 2000).toString()
            this.mesPREListado = '01'
            this.diaPREListado = '01'
            this.mesPOSListado = moment().format('MM')
            this.diaPOSListado = moment().format('DD')

            this.validarMesPREListado()
        },
        validarMesPREListado() {
            validarInputs(
                {
                    form: "#validarMesPRE_dghlis",
                    orden: '1'
                },
                () => this.salir_lablis(),
                () => {
                    this.mesPREListado = cerosIzq(this.mesPREListado, 2)

                    if (parseInt(this.mesPREListado) > 12 || parseInt(this.mesPREListado) < 1){
                        CON851("", "Mes fuera de rango !", null, "error", "Error");
                        this.validarMesPREListado()
                    } else this.validarDiaPRElistado()
                }
            )
        },
        validarDiaPRElistado() {
            validarInputs(
                {
                    form: "#validarDiaPRE_dghlis",
                    orden: '1'
                },
                () => this.validarMesPREListado(),
                () => {
                    this.diaPREListado = cerosIzq(this.diaPREListado, 2)

                    if (parseInt(this.diaPREListado) > 31 || parseInt(this.diaPREListado) < 1){
                        CON851("", "Dia fuera de rango !", null, "error", "Error");
                        this.validarDiaPRElistado()
                    } else this.validarMesPOS_lablis()
                }
            )
        },
        validarMesPOS_lablis() {
            validarInputs(
                {
                    form: "#validarMesPOS_dghlis",
                    orden: '1'
                },
                () => this.validarDiaPRElistado(),
                () => {
                    this.mesPOSListado = cerosIzq(this.mesPOSListado, 2)

                    if (parseInt(this.mesPOSListado) > 12 || parseInt(this.mesPOSListado) < 1){
                        CON851("", "Mes fuera de rango !", null, "error", "Error");
                        this.validarMesPOS_lablis()
                    } else this.validarDiaPOS_lablis()
                }
            )
        },
        validarDiaPOS_lablis() {
            validarInputs(
                {
                    form: "#validarDiaPOS_dghlis",
                    orden: '1'
                },
                () => this.validarMesPOS_lablis(),
                () => {
                    this.diaPOSListado = cerosIzq(this.diaPOSListado, 2)

                    if (parseInt(this.diaPOSListado) > 31 || parseInt(this.diaPOSListado) < 1){
                        CON851("", "Dia fuera de rango !", null, "error", "Error");
                        this.validarDiaPOS_lablis()
                    } else this.llamadoDLL()
                }
            )
        },
        llamadoDLL() {
            this.validarDiaPOS_lablis()
            // loader('show');
            // postData({ datosh: datosEnvio() + this.anoListado + this.mesPREListado + this.diaPREListado + '|' + this.anoListado + this.mesPOSListado + this.diaPOSListado + '|' }, get_url('app/RX/RX-500.DLL'))
            //     .then(data => {
            //         loader('hide');
            //         _this._montarImpresion_dghLIS(data);
            //     })
            //     .catch(err => {
            //         console.log(err)
            //         loader('hide');
            //         _this.validarMesPREListado();
            //     })
        },
        salir_lablis() {
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()
        },

        _montarImpresion_dghLIS(data) {
            data.LISTADO.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            data.ENCABEZADO.push(nombreEmpresa);
            data.ENCABEZADO.push(nit);
            data.ENCABEZADO.push(fecha);

            for (var i in data.LISTADO) {
                data.LISTADO[i].ID_MEDICO = parseInt(data.LISTADO[i].ID_MEDICO)
                data.LISTADO[i].SALA = parseInt(data.LISTADO[i].SALA)
                if (data.LISTADO[i].NOM_MEDICO.trim() == '0000000000') data.LISTADO[i].NOM_MEDICO = ''
            }

            if (data.LISTADO.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader('hide');
                _this.validarDiaPOS_lablis()
            } else {
                var columnas = [
                    {
                        title: "FECHA",
                        value: "FECHA_LN",
                        format: 'fecha',
                        filterButton: true
                    },
                    {
                        title: "SUC",
                        value: "SUC_LN",
                        format: 'string',
                        filterButton: true
                    },
                    {
                        title: "CL",
                        value: "CL_LN",
                        filterButton: true
                    },
                    {
                        title: "COMPROB",
                        value: "COMPROB_LN"
                    },
                    {
                        title: "FACTURA",
                        value: "FACTURA_LN"
                    },
                    {
                        title: "CUPS",
                        value: "CUP_LN",
                        filterButton: true
                    },
                    {
                        title: "DESCRIPCIÓN CUPS",
                        value: "DESCRIP_CUP_LN",
                    },
                    {
                        title: "ENTIDAD",
                        value: "ENTIDAD_LN"
                    },
                    {
                        title: "EDAD",
                        value: "EDAD_LN"
                    },
                    {
                        title: "SEXO",
                        value: "SEXO_LN"
                    },
                    {
                        title: "TIP DOC",
                        value: "TIP_DOC_LN"
                    },
                    {
                        title: "ID PACIENTE",
                        value: "ID_PACIENTE_LN"
                    },
                    {
                        title: "1ER APELLIDO",
                        value: "1ER_APELLIDO_LN"
                    },
                    {
                        title: "2DO APELLIDO",
                        value: "2DO_APELLIDO_LN"
                    },
                    {
                        title: "1ER NOMBRE",
                        value: "1ER_NOMBRE_LN"
                    },
                    {
                        title: "2DO NOMBRE",
                        value: "2DO_NOMBRE_LN"
                    },
                    {
                        title: "FECHA NAC",
                        value: "FECHA_NAC_LN",
                        format: 'fecha'
                    },
                    {
                        title: "TELEFONO",
                        value: "TELEFONO_PACI"
                    },
                    {
                        title: "ID MEDICO",
                        value: "ID_MEDICO",
                        filterButton: true
                    },
                    {
                        title: "NOMBRE MEDICO",
                        value: "NOM_MEDICO"
                    },
                    {
                        title: "SALA",
                        value: "SALA"
                    },
                    {
                        title: "OPERADOR",
                        value: "OPER_MODIF",
                        filterButton: true
                    },
                    {
                        title: "FECHA MODIFICACION",
                        value: "FECHA_MODIF",
                        format: 'fecha'
                    },
                    {
                        title: "DILIGENCIADO",
                        value: "DILIGENCIADO"
                    },
                    {
                        title: "EMAIL PACIENTE",
                        value: "EMAIL_PACI"
                    },
                    {
                        title: "ENVIADO POR EMAIL",
                        value: "ENVIO_EMAIL",
                        filterButton: true
                    },
                    {
                        title: "FECHA EMAIL",
                        value: "FECHA_EMAIL",
                        format: 'fecha'
                    },
                    {
                        title: "HORA TOMA",
                        value: "HORA_TOMA"
                    },
                    {
                        title: "HORA LECTURA",
                        value: "HORA_LECT"
                    },
                    {
                        title: "ARCHIVO HL7",
                        value: "ARCHIVO_HL7"
                    }
                ]

                if (this.mostrarContenido == 'S') {
                    columnas.push(
                    {
                        title: "CONTENIDO",
                        value: "CONTENIDO"
                    })
                }
                console.log(columnas)

                var header_format = [
                    { text: `${nombreEmpresa}`, bold: true, size: 16 },
                    'INFORME DE RESULTADOS POR FECHA',
                    `Fecha de reporte: ${fecha}`,
                    `NIT: ${nit}`,
                ]

                _impresion2({
                    tipo: 'excel',
                    header: header_format,
                    logo: `${nit}.png`,
                    tabla: {
                        columnas,
                        data: data.LISTADO,
                    },
                    archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`
                })
                    .then(() => {
                        console.log('Proceso terminado')
                        indice = 1;
                        _this.validarMesPREListado();
                        loader('hide')
                        toastr.success("Listado generado");
                    })
                    .catch((err) => {
                        console.error(err)
                        console.log('Proceso error')
                    })
            }
        }
    }
})