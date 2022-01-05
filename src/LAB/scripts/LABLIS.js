new Vue({
    el: '#LABLIS',
    data: {
        anoListado: '',
        mesPREListado: '',
        diaPREListado: '',
        mesPOSListado: '',
        diaPOSListado: '',
        IMPRESION: []
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');

        nombreOpcion('5,2 - Listado por mes laboratorios')

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
            this.mesPOSListado = '01'
            this.diaPOSListado = '01'

            this.validarMesPREListado()
        },
        validarMesPREListado() {
            validarInputs(
                {
                    form: "#validarMesPRE_lablis",
                    orden: '1'
                },
                () => this.salir_lablis(),
                () => {
                    this.mesPREListado = cerosIzq(this.mesPREListado, 2)

                    this.validarDiaPRElistado()
                }
            )
        },
        validarDiaPRElistado(){
            validarInputs(
                {
                    form: "#validarDiaPRE_lablis",
                    orden: '1'
                },
                () => this.validarMesPREListado(),
                () => {
                    this.diaPREListado = cerosIzq(this.diaPREListado, 2)

                    this.validarMesPOS_lablis()
                }
            )
        },
        validarMesPOS_lablis() {
            validarInputs(
                {
                    form: "#validarMesPOS_lablis",
                    orden: '1'
                },
                () => this.validarDiaPRElistado(),
                () => {
                    this.mesPOSListado = cerosIzq(this.mesPOSListado, 2)

                    this.validarDiaPOS_lablis()
                }
            )
        },
        validarDiaPOS_lablis(){
            validarInputs(
                {
                    form: "#validarDiaPOS_lablis",
                    orden: '1'
                },
                () => this.validarMesPOS_lablis(),
                () => {
                    this.diaPOSListado = cerosIzq(this.diaPOSListado, 2)

                    this.llamadoDLL()
                }
            )
        },
        llamadoDLL() {
            loader('show');
            postData({ datosh: datosEnvio() + '|||||||2|' + this.anoListado + this.mesPREListado + this.diaPREListado  + '|' + this.anoListado + this.mesPOSListado + this.diaPOSListado + '|' }, get_url('app/SALUD/LAB548.DLL'))
                .then(data => {
                    loader('hide');
                    _this.IMPRESION = data.LISTADO

                    console.log(_this.IMPRESION, 'data')
                    _this._montarImpresion_LABLIS(data);
                })
                .catch(err => {
                    console.log(err)
                    loader('hide');
                    _this.validarDiaPOS_lablis();
                })
        },
        salir_lablis() {
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()
        },

        _montarImpresion_LABLIS(data) {
            data.LISTADO.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            data.ENCABEZADO.push(nombreEmpresa);
            data.ENCABEZADO.push(nit);
            data.ENCABEZADO.push(fecha);

            for (i in data.LISTADO) {
                data.LISTADO[i]['1ER_APELLIDO_LN'] = data.LISTADO[i]['1ER_APELLIDO_LN'].replace(/\�/g, "Ñ")
                data.LISTADO[i]['2DO_APELLIDO_LN'] = data.LISTADO[i]['2DO_APELLIDO_LN'].replace(/\�/g, "Ñ")
                data.LISTADO[i]['1ER_NOMBRE_LN'] = data.LISTADO[i]['1ER_NOMBRE_LN'].replace(/\�/g, "Ñ")
                data.LISTADO[i]['2DO_NOMBRE_LN'] = data.LISTADO[i]['2DO_NOMBRE_LN'].replace(/\�/g, "Ñ")
                for (y in data.LISTADO[i].RESULTADOS_LN) {
                    data.LISTADO[i][`TITULO${y}_LN`] = data.LISTADO[i].RESULTADOS_LN[y].TITULO_LN;
                    data.LISTADO[i][`RESULTADO${y}_LN`] = data.LISTADO[i].RESULTADOS_LN[y].RESULTADO_LN;
                }
                if (data.LISTADO[i]['REGISTRO_ESCRITO_LN'].trim() == '' || data.LISTADO[i]['REGISTRO_ESCRITO_LN'] == 'N') {
                    data.LISTADO[i]['REGISTRO_ESCRITO_LN'] = 'No'
                } else if (data.LISTADO[i]['REGISTRO_ESCRITO_LN'].trim() == 'S') {
                    data.LISTADO[i]['REGISTRO_ESCRITO_LN'] = 'Si'
                }
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
                        title: "FINALID",
                        value: "FINALID_LN"
                    },
                    {
                        title: "EMBARAZO",
                        value: "EMBARAZO_LN"
                    },
                    {
                        title: "DILIGENCIADO",
                        value: "REGISTRO_ESCRITO_LN",
                        filterButton: true
                    },
                    {
                        title: "TITULO",
                        value: "TITULO0_LN"
                    },
                    {
                        title: "RESULTADO",
                        value: "RESULTADO0_LN"
                    },
                    {
                        title: "TITULO RENG 2",
                        value: "TITULO1_LN"
                    },
                    {
                        title: "RESULTADO RENG 2",
                        value: "RESULTADO1_LN"
                    },
                    {
                        title: "TITULO RENG 3",
                        value: "TITULO2_LN"
                    },
                    {
                        title: "RESULTADO RENG 3",
                        value: "RESULTADO2_LN"
                    },
                    {
                        title: "TITULO RENG 4",
                        value: "TITULO3_LN"
                    },
                    {
                        title: "RESULTADO RENG 4",
                        value: "RESULTADO3_LN"
                    },
                    {
                        title: "TITULO RENG 5",
                        value: "TITULO4_LN"
                    },
                    {
                        title: "RESULTADO RENG 5",
                        value: "RESULTADO4_LN"
                    },
                    {
                        title: "TITULO RENG 6",
                        value: "TITULO5_LN"
                    },
                    {
                        title: "RESULTADO RENG 6",
                        value: "RESULTADO5_LN"
                    },
                    {
                        title: "TITULO RENG 7",
                        value: "TITULO6_LN"
                    },
                    {
                        title: "RESULTADO RENG 7",
                        value: "RESULTADO6_LN"
                    },
                    {
                        title: "TITULO RENG 8",
                        value: "TITULO7_LN"
                    },
                    {
                        title: "RESULTADO RENG 8",
                        value: "RESULTADO7_LN"
                    },
                    {
                        title: "TITULO RENG 9",
                        value: "TITULO8_LN"
                    },
                    {
                        title: "RESULTADO RENG 9",
                        value: "RESULTADO8_LN"
                    },
                    {
                        title: "TITULO RENG 10",
                        value: "TITULO9_LN"
                    },
                    {
                        title: "RESULTADO RENG 10",
                        value: "RESULTADO9_LN"
                    },
                    {
                        title: "TITULO RENG 11",
                        value: "TITULO10_LN"
                    },
                    {
                        title: "RESULTADO RENG 11",
                        value: "RESULTADO10_LN"
                    },
                    {
                        title: "TITULO RENG 12",
                        value: "TITULO11_LN"
                    },
                    {
                        title: "RESULTADO RENG 12",
                        value: "RESULTADO11_LN"
                    },
                    {
                        title: "TITULO RENG 13",
                        value: "TITULO12_LN"
                    },
                    {
                        title: "RESULTADO RENG 13",
                        value: "RESULTADO12_LN"
                    },
                    {
                        title: "TITULO RENG 14",
                        value: "TITULO13_LN"
                    },
                    {
                        title: "RESULTADO RENG 14",
                        value: "RESULTADO13_LN"
                    },
                    {
                        title: "TITULO RENG 15",
                        value: "TITULO14_LN"
                    },
                    {
                        title: "RESULTADO RENG 15",
                        value: "RESULTADO14_LN"
                    },
                ]

                var header_format = [
                    { text: `${nombreEmpresa}`, bold: true, size: 16 },
                    'INFORME DE RESULTADOS POR MES',
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