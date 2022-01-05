function _imprimirHCI_9012(datos) {
    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A':
            datos.AUX_EDAD = '  Años';
            break;
        case 'M':
            datos.AUX_EDAD = '  Meses';
            break;
        case 'D':
            datos.AUX_EDAD = '  Dias';
            break;
        default:
            datos.AUX_EDAD = '';
            break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) },
        pageMargins: [35, 160, 35, 60],
        header: function(currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 70;

            return {
                margin: [35, 25, 35, 0],
                stack: [{
                        columns: [{
                                margin: [7, 0, 0, 0],
                                stack: [{
                                    image: 'logo',
                                    width: 75,
                                    height: 45
                                }],
                                width: '20%'
                            },
                            {
                                style: 'center10Bold',
                                text: [
                                    { text: datos.encabezado.nombre + '\n' },
                                    { text: datos.encabezado.nit + '\n' },
                                    { text: datos.encabezado.titulo }
                                ],
                                width: '60%'
                            },
                            {
                                style: 'right10Bold',
                                alignment: 'right',
                                text: [
                                    { text: '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                                    { text: localStorage.Usuario + moment().format('  YYYY-MM-DD'), fontSize: 7 },
                                ],
                                width: '20%'
                            }
                        ],
                    },
                    {
                        marginLeft: 7,
                        marginTop: 10,
                        columns: [{
                            stack: [{
                                    columns: [
                                        { text: 'FECHA INGRESO:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.fechaIng, style: 'left8', width: '35%' },
                                        { text: 'FECHA EGRESO:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.fechaEgr, style: 'left8', width: '35%' },
                                    ]
                                },
                                {
                                    marginTop: 2,
                                    columns: [
                                        { text: 'PACIENTE:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.nombre, style: 'left8', width: '35%' },
                                        { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.tipoId + datos.paciente.id, style: 'left8', width: '15%' },
                                        { text: 'Grp Sang:', style: 'left8Bold', width: '10%' },
                                        { text: datos.paciente.grp_sang, style: 'left8', width: '10%' },
                                    ]
                                },
                                {
                                    marginTop: 2,
                                    columns: [
                                        { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                                        { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                                        { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                                        { text: datos.paciente.sexo, style: 'left8', width: '8%' },
                                        { text: 'NACIM:', style: 'left8Bold', width: '8%' },
                                        { text: datos.paciente.nacim, style: 'left8', width: '12%' },
                                        { text: 'DIRECCION:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.direccion, style: 'left8', width: '35%' },
                                    ]
                                },
                                {
                                    marginTop: 2,
                                    columns: [
                                        { text: 'E. CIVIL:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.e_civil, style: 'left8', width: '15%' },
                                        { text: 'TIPO AFILIA:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.tipo_afilia, style: 'left8', width: '20%' },
                                        { text: 'OCUPAC:', style: 'left8Bold', width: '10%' },
                                        { text: datos.paciente.ocupacion, style: 'left8', width: '25%' },
                                    ]
                                },
                                {
                                    marginTop: 2,
                                    columns: [
                                        { text: 'ENTIDAD:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.entidad, style: 'left8', width: '45%' },
                                        { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.telefono, style: 'left8', width: '25%' },
                                    ]
                                },
                                {
                                    marginTop: 2,
                                    columns: [
                                        { text: 'ACOMPAÑANTE:', style: 'left8Bold', width: '15%' },
                                        { text: datos.paciente.acomp, style: 'left8', width: '35%' },
                                        { text: 'FOLIO:', style: 'left8Bold', width: '10%' },
                                        { text: datos.paciente.folio, style: 'left8', width: '15%' },
                                        { text: 'ETNIA:', style: 'left8Bold', width: '6%' },
                                        { text: datos.paciente.etnia, style: 'left8', width: '19%' },
                                    ]
                                },
                            ],
                            width: '100%'
                        }, ],
                    },
                    {
                        canvas: [{
                            type: 'rect',
                            x: 0,
                            y: -70,
                            w: width_page,
                            h: 75,
                            r: 0,
                            lineWidth: 1,
                        }, ],
                    },
                ]
            }
        },
        content: [{
                margin: [0, 5, 0, 0],
                stack: [{
                    stack: llenarFormato()
                }, ]
            },
            {
                style: 'center8',
                stack: llenarMedicoFirma()
            }
        ],

        styles: estilosImpresion_impHc()
    }

    function llenarFormato() {
        var col = [{
                marginTop: 2,
                columns: [
                    { text: datos.paciente.hab.trim() ? 'Hab:' : '', width: '5%', style: 'center10Bold', },
                    { text: datos.paciente.hab.trim() ? datos.paciente.hab : '', width: '10%', style: 'center10Bold', },
                    { text: datos.paciente.nro_fact, width: '20%', style: 'center10Bold', },
                    { text: datos.paciente.unserv, width: '30%', style: 'center10Bold', },
                    { text: datos.paciente.triage.trim() ? 'Triage:' : '', width: '10%', style: 'center10Bold', },
                    { text: datos.paciente.triage.trim() ? datos.paciente.triage : '', width: '25%', style: 'left10Bold', }
                ]
            },
            {
                marginTop: 10,
                text: [
                    { text: 'MOTIVO DE CONSULTA:  ', style: 'left8Bold', },
                    { text: datos.ws9012.motiv_consul, style: 'left8', }
                ]
            },
            {
                marginTop: 5,
                text: [
                    { text: 'ETAPA DE VACUNACION:  ', style: 'left8Bold',},
                    { text: datos.ws9012.etapa_vacuna, style: 'left8',}
                ]
            },
            {
                marginTop: 5,
                text: [
                    { text: 'TIPO VACUNA:  ', style: 'left8Bold', },
                    { text: datos.ws9012.tipo_vacuna, style: 'left8', }
                ]
            },
            {
                marginTop: 5,
                text: [
                    { text: 'NUMERO DE DOSIS:  ', style: 'left8Bold', },
                    { text: datos.ws9012.nro_dosis, style: 'left8', }
                ]
            },
            {
                marginTop: 5,
                text: [
                    { text: 'HORA INGRESO OBSERVACION:  ', style: 'left8Bold', },
                    { text: datos.ws9012.hora_ing_obser, style: 'left8', }
                ]
            },
            {
                unbreakable: true,
                stack: llenarExamFisico_hc()
            },
            {
                marginTop: 10,
                text: [
                    { text: 'PRESENTA COMORBILIDADES:  ', style: 'left8Bold',},
                    { text: datos.comorbilidades.presentaComorbilidades, style: 'left8',}
                ]
            },
            {
                stack: [
                    datos.comorbilidades.bandera == true ? llenarComorbilidad() : []
                ],
            },
            {
                marginTop: 10,
                text: [
                    { text: 'PRESENTA REACCION SECUNDARIA A LA ADMINISTRACION DE LA VACUNA:  ', style: 'left8Bold' },
                    { text: datos.ws9012.reaccion_secund, style: 'left8' }
                ]
            },
            {
                marginTop: 5,
                unbreakable: true,
                style: 'left8',
                table: {
                    widths: ['20%', '5%', '5%', '15%', '5%', '5%', '15%', '5%', '5%', '15%', '5%'],
                    headerRows: 0,
                    body: [
                        [
                            { text: 'Enrojecimiento', border: [false, false, false, false] },
                            { text: datos.ws9012.enrojecimiento },
                            { text: '', border: [false, false, false, false] },
                            { text: 'Mialgias', border: [false, false, false, false] },
                            { text: datos.ws9012.mialgias },
                            { text: '', border: [false, false, false, false] },
                            { text: 'Prurito', border: [false, false, false, false] },
                            { text: datos.ws9012.prurito },
                            { text: '', border: [false, false, false, false] },
                            { text: 'Lipotimia', border: [false, false, false, false] },
                            { text: datos.ws9012.lipotimia }
                        ],
                    ]
                },
                //  layout: 'lightHorizontalLines'
            },
            {
                marginTop: 5,
                unbreakable: true,
                style: 'left8',
                table: {
                    widths: ['20%', '5%', '5%', '15%', '5%', '5%', '15%', '5%', '5%', '15%', '5%'],
                    headerRows: 0,
                    body: [
                        [
                            { text: 'Erupcion cutanea', border: [false, false, false, false] },
                            { text: datos.ws9012.erupcion_cuta },
                            { text: '', border: [false, false, false, false] },
                            { text: 'Ansiedad', border: [false, false, false, false] },
                            { text: datos.ws9012.ansiedad },
                            { text: '', border: [false, false, false, false] },
                            { text: 'Cefalea', border: [false, false, false, false] },
                            { text: datos.ws9012.cefalea },
                            { text: '', border: [false, false, false, false] },
                            { text: 'Rash cutanea', border: [false, false, false, false] },
                            { text: datos.ws9012.rash_cut }
                        ],
                    ]
                },
                //  layout: 'lightHorizontalLines'
            },
            {
                marginTop: 5,
                unbreakable: true,
                style: 'left8',
                table: {
                    widths: ['20%', '5%', '5%', '15%', '5%', '5%', '15%', '5%', '5%', '15%', '5%'],
                    headerRows: 0,
                    body: [
                        [
                            { text: 'Fatiga', border: [false, false, false, false] },
                            { text: datos.ws9012.fatiga },
                            { text: '', border: [false, false, false, false] },
                            { text: 'Disnea', border: [false, false, false, false] },
                            { text: datos.ws9012.disnea },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                        ],
                    ]
                },
                //  layout: 'lightHorizontalLines'
            },
            {
                marginTop: 5,
                unbreakable: true,
                style: 'left8',
                table: {
                    widths: ['20%', '5%', '5%', '15%', '5%', '5%', '15%', '5%', '5%', '15%', '5%'],
                    headerRows: 0,
                    body: [
                        [
                            { text: 'Otros', border: [false, false, false, false] },
                            { text: datos.ws9012.otros },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] },
                            { text: '', border: [false, false, false, false] }
                        ],
                    ]
                },
                //  layout: 'lightHorizontalLines'
            },
            {
                marginTop: 5,
                style: 'left8',
                text: [
                    { text: datos.ws9012.otra_reaccion }
                ]
            },
            {
                unbreakable: true,
                stack: llenarExamFisico_covid()
            },
            {
                marginTop: 5,
                text: [
                    { text: 'HORA EGRESO OBSERVACION:  ', style: 'left8Bold', },
                    { text: datos.ws9012.hora_egre_obser, style: 'left8', }
                ]
            },
            {
                marginTop: 10,
                text: [
                    { text: 'OBSERVACIONES:' + '\n', style: 'left8Bold', },
                    { text: datos.ws9012.obser_vacuna, style: 'left8', }
                ]
            },
            {
                marginTop: 10,
                text: [
                    { text: 'RECOMENDACIONES:' + '\n', style: 'left8Bold', },
                    { text: datos.ws9012.recomendaciones_vacuna, style: 'left8', }
                ]
            },

        ]
        return col
    }

    function llenarExamFisico_hc() {
        var arrayTit = ['T.Arter', 'T.Med', 'Fr.Card', 'Fr.Resp', 'Tempe', 'So2', 'Pvc', 'Peso', 'Talla', 'IMC', 'Sp.Corp', 'Per.Tor', 'Per.Abdo', 'Per.Muñ', 'Glasgow']

        var titulos = []
        for (var i in arrayTit) {
            titulos.push([{ text: arrayTit[i], fillColor: '#D1DFF4', bold: true }])
        }

        var body = []
        for (var i in arrayTit) {
            body.push([{ text: datos.examFisico_hc.cont[i] }])
        }

        var fila = [titulos, body]

        var tabla = [{
                marginTop: 5,
                bold: true,
                text: "SIGNOS VITALES DE INGRESO",
                style: 'left10Bold'
            },
            {
                marginTop: 2,
                bold: true,
                text: 'EXAMEN FISICO',
                style: 'center10Bold'
            },
            {
                unbreakable: true,
                marginTop: 2,
                style: 'center8',
                fontSize: 7,
                table: {
                    heights: [15, 15],
                    widths: ['8%', '5%', '7.5%', '7.5%', '6.2%', '5%', '5%', '6%', '6.6%', '5%', '8%', '6%', '8%', '8%', '8%'],
                    body: fila
                }
            }
        ]

        if (datos.examFisico_hc.bandera) {
            return tabla
        } else {
            return []
        }
    }

    function llenarExamFisico_covid() {
        var arrayTit = ['T.Arter', 'T.Med', 'Fr.Card', 'Fr.Resp', 'Tempe', 'So2', 'Pvc', 'Peso', 'Talla', 'IMC', 'Sp.Corp', 'Per.Tor', 'Per.Abdo', 'Per.Muñ', 'Glasgow']

        var titulos = []
        for (var i in arrayTit) {
            titulos.push([{ text: arrayTit[i], fillColor: '#D1DFF4', bold: true }])
        }

        var body = []
        for (var i in arrayTit) {
            body.push([{ text: datos.examFisico_covid.cont[i] }])
        }

        var fila = [titulos, body]

        var tabla = [{
                marginTop: 5,
                bold: true,
                text: "SIGNOS VITALES DE EGRESO",
                style: 'left10Bold'
            },
            {
                marginTop: 2,
                bold: true,
                text: 'EXAMEN FISICO',
                style: 'center10Bold'
            },
            {
                unbreakable: true,
                marginTop: 2,
                style: 'center8',
                fontSize: 7,
                table: {
                    heights: [15, 15],
                    widths: ['8%', '5%', '7.5%', '7.5%', '6.2%', '5%', '5%', '6%', '6.6%', '5%', '8%', '6%', '8%', '8%', '8%'],
                    body: fila
                }
            }
        ]

        if (datos.examFisico_covid.bandera) {
            return tabla
        } else {
            return []
        }
    }

    function llenarMedicoFirma() {
        var col = [
            firmaImpresion_impHc(datos)
        ]

        return col
    }

    function llenarComorbilidad() {
        var col = [
            {
                marginTop: 10,
                unbreakable: true,
                table: {
                    widths: ['45%', '5%', '45%', '5%'],
                    headerRows: 0,
                    body: [
                        [
                            {text: 'COMORBILIDADES', colSpan: 4, style: 'center8Bold' },
                            {},
                            {},
                            {},
                        ],
                        [
                            {text: 'DIABETES', style: 'left8'},
                            {text: datos.comorbilidades.diabetes, style: 'center8Bold'},
                            {text: 'ENFERMEDAD CARDIOVASCULAR (Incluye HTA y ACV)', style: 'left8'},
                            {text: datos.comorbilidades.enfCardiovasc, style: 'center8Bold'},
                        ],
                        [
                            {text: 'FALLA RENAL', style: 'left8'},
                            {text: datos.comorbilidades.fallaRenal, style: 'center8Bold'},
                            {text: 'VIH U OTRA INMUNODEFICIENCIA', style: 'left8'},
                            {text: datos.comorbilidades.VIH_u_otras, style: 'center8Bold'},
                        ],
                        [
                            {text: 'CANCER', style: 'left8'},
                            {text: datos.comorbilidades.cancer, style: 'center8Bold'},
                            {text: 'ENFERMEDADES AUTOINMUNES', style: 'left8'},
                            {text: datos.comorbilidades.enferAutoinmunes, style: 'center8Bold'},
                        ],
                        [
                            {text: 'HIPOTIROIDISMO', style: 'left8'},
                            {text: datos.comorbilidades.hipotiroidismo, style: 'center8Bold'},
                            {text: 'USO DE CORTICOIDES O INMUNOSUPRESORES', style: 'left8'},
                            {text: datos.comorbilidades.usoCorticoides, style: 'center8Bold'},
                        ],
                        [
                            {text: 'EPOC Y ASMA', style: 'left8'},
                            {text: datos.comorbilidades.epocAsma, style: 'center8Bold'},
                            {text: 'MAL NUTRICION (OBESIDAD Y DESNUTRICION)', style: 'left8'},
                            {text: datos.comorbilidades.malNutricion, style: 'center8Bold'},
                        ],
                        [
                            {text: 'FUMADORES', style: 'left8'},
                            {text: datos.comorbilidades.fumadores, style: 'center8Bold'},
                            {text: '', style: 'left8'},
                            {text: '', style: 'center8Bold'},
                        ],
                    ]
                }
            },
        ]
        return col
    }
}