async function _imprimirTriage(datos, masiva, imp_main) {
    if(imp_main) {
        await consultarDatosImp_triage(imp_main.data)
        .then((data) => { 
            datos = data; 
        })
        .catch((error) => console.error(error))
    }

    datos.FECHA_ING = datos.LLAVE_TRIA.substring(0,4) + '/' + datos.LLAVE_TRIA.substring(4,6) + '/' + datos.LLAVE_TRIA.substring(6,8);
    datos.HORA_ING = datos.LLAVE_TRIA.substring(8,10) + ':' + datos.LLAVE_TRIA.substring(10,12);

    datos.FECHA_ATEN_TRIA = datos.FECHA_ATEN_TRIA.substring(0,4) + '/' + datos.FECHA_ATEN_TRIA.substring(4,6) + '/' + datos.FECHA_ATEN_TRIA.substring(6,8);
    datos.HORA_ATEN_TRIA = datos.HORA_ATEN_TRIA.substring(0,2) + ':' + datos.HORA_ATEN_TRIA.substring(2,4);

    datos.DESCRIP_PACI = datos.DESCRIP_PACI.replace(/\s+/g, ' ');
    isNaN(datos.COD_PACI) == true ? datos.COD_PACI = datos.COD_PACI : datos.COD_PACI = new Intl.NumberFormat("ja-JP").format(datos.COD_PACI);

    datos.T_MED = (parseFloat(datos.TENS1_TRIA) + (parseFloat(datos.TENS2_TRIA) * 2)) / 3;
    datos.T_MED = Math.round(datos.T_MED * 10) / 10;

    if(datos.PESO_TRIA == 0 && datos.TALLA_TRIA == 0) {
        datos.IMC_TRIA = 0;
        datos.SCORP_TRIA = 0;
    } else {
        datos.IMC_TRIA = datos.PESO_TRIA / ((datos.TALLA_TRIA / 100) * 2)
        datos.IMC_TRIA = Math.round(datos.IMC_TRIA * 10) / 10;

        datos.SCORP_TRIA = (parseFloat(datos.PESO_TRIA) + parseFloat(datos.TALLA_TRIA) - 60) / 100;
        datos.SCORP_TRIA = datos.SCORP_TRIA.toFixed(2);
    }

    datos.PESO_GRAMOS_TRIA > 0 && datos.PESO_TRIA < 1 ? datos.PESO_TRIA = datos.PESO_GRAMOS_TRIA + ' Gr' : datos.PESO_TRIA = datos.PESO_TRIA + ' Kl';
    datos.TALLA_TRIA = datos.TALLA_TRIA + ' Cm';

    datos.TEMP_TRIA = datos.TEMP_TRIA + ' °';

    switch(datos.SEXO_PACI) {
        case 'M': datos.SEXO_PACI = 'Masculino'; break;
        case 'F': datos.SEXO_PACI = 'Femenino'; break;
    }

    switch (datos.EDAD_TRIA.substring(0, 1)) {
        case 'A': datos.AUX_EDAD = '  Años'; break;
        case 'M': datos.AUX_EDAD = '  Meses'; break;
        case 'D': datos.AUX_EDAD = '  Dias'; break;
        default: datos.AUX_EDAD = ''; break;
    }
    datos.EDAD_TRIA = parseInt(datos.EDAD_TRIA.substring(1, 4));

    datos.medico = {};
    datos.medico.nombre = datos.DESCRIP_PROF;
    datos.medico.espec = datos.NOMBRE_ESP_MEDICO;
    datos.medico.reg = datos.REG_MEDICO;
    datos.medico.firma = parseFloat(datos.MEDICO_TRIA);

    if (masiva == true) {
        console.log('IMPRESION MASIVA');
    }

    switch(parseInt(datos.PRIORIDAD_TRIA)) {
        case 1: datos.INDICACIONES_TRIA = 'Requiere atencion inmediata'; break;
        case 2: datos.INDICACIONES_TRIA = 'Requiere una atencion de Urgencias'; break;
        case 3: datos.INDICACIONES_TRIA = 'Requiere una atencion de Urgencias'; break;
        case 4: datos.INDICACIONES_TRIA = 'El paciente presenta condiciones médicas que no comprometen su estado general, ni representan un riesgo evidente para la vida o perdida de miembro u organo No obstante,existen riesgos de complicación o secuelas de la enfermedad o lesion si no recibe la atencion correspondiente. Consulta Externa Prioritaria en su EPS'; break;
        case 5: datos.INDICACIONES_TRIA = 'El paciente presenta una condición clinica relacionada con problemas agudos o cronicos sin evidencia de deterioro que comprometa el estado general del paciente y no representa un riesgo evidente para la vida o la funcionalidad de miembro u organo. Consulta Externa en su EPS'; break;
    }

    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) },
        pageMargins: [35, 135, 35, 60],
        header: function (currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 70;

            return {
                margin: [35, 30, 35, 0],
                stack: [
                    {
                        columns: [
                            {
                                margin: [7, 0, 0, 0],
                                stack: [
                                    {
                                        image: 'logo',
                                        width: 75,
                                        height: 45
                                    }
                                ],
                                width: '20%'
                            },
                            {
                                style: 'center12Bold',
                                text: [
                                    { text: $_USUA_GLOBAL[0].NOMBRE + '\n' },
                                    { text: $_USUA_GLOBAL[0].NIT + '\n' },
                                    { text: 'HISTORIA TRIAGE' },
                                ],
                                width: '60%'
                            },
                            {
                                style: 'right12Bold',
                                text: [
                                    { text: 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                                    { text: localStorage.Usuario + moment().format('  YYYY-MM-DD - HH:mm'), fontSize: 7 },
                                ],
                                width: '20%'
                            }
                        ],
                    },
                    {
                        marginLeft: 7,
                        marginTop: 10,
                        stack: [
                            {
                                columns: [
                                    { text: 'FECHA INGRESO:', style: 'left8Bold', width: '13%' },
                                    { text: datos.FECHA_ING, style: 'left8', width: '15%' },
                                    { text: 'HORA:', style: 'left8Bold', width: '7%' },
                                    { text: datos.HORA_ING, style: 'left8', width: '23%' },
                                    { text: 'FECHA ATENCIÓN:', style: 'left8Bold', width: '15%' },
                                    { text: datos.FECHA_ATEN_TRIA, style: 'left8', width: '15%' },
                                    { text: 'HORA:', style: 'left8Bold', width: '6%' },
                                    { text: datos.HORA_ATEN_TRIA, style: 'left8', width: '6%' },
                                ]
                            },
                            {
                                marginTop: 2,
                                columns: [
                                    { text: 'PACIENTE:', style: 'left8Bold', width: '13%' },
                                    { text: datos.DESCRIP_PACI, style: 'left8', width: '45%' },
                                    { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                                    { text: datos.COD_PACI, style: 'left8', width: '22%' },
                                ]
                            },
                            {
                                marginTop: 2,
                                columns: [
                                    { text: 'DIRECCIÓN:', style: 'left8Bold', width: '13%' },
                                    { text: datos.DIRECC_PACI, style: 'left8', width: '45%' },
                                    { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                                    { text: datos.TELEFONO_PACI, style: 'left8', width: '27%' },
                                ]
                            },
                            {
                                marginTop: 2,
                                columns: [
                                    { text: 'ENTIDAD:', style: 'left8Bold', width: '13%' },
                                    { text: datos.NOMBRE_ENT, style: 'left8', width: '45%' },
                                    { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                                    { text: datos.EDAD_TRIA + datos.AUX_EDAD, style: 'left8', width: '9%' },
                                    { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                                    { text: datos.SEXO_PACI, style: 'left8', width: '8%' },
                                ]
                            },
                        ],
                    },
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: -45,
                                w: width_page,
                                h: 47,
                                r: 0,
                                lineWidth: 1,
                            },
                        ],
                    },
                ]
            }
        },
        content: [
            {
                margin: [0, 5, 0, 0],
                stack: [
                    {
                        stack: llenarFormato()
                    },
                ]
            },
        ],

        styles: estilosImpresion_impHc()
    }

    function llenarFormato() {
        var col = [
            {
                columns: [
                    {
                        marginTop: 3,
                        text: 'Prioridad: ', style: 'left8Bold', width: '20%'
                    },
                    {
                        text: 'I', style: 'left12', width: '3%', bold: true
                    },
                    {
                        canvas: datos.PRIORIDAD_TRIA == 1
                            ? [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' },
                                { type: 'line', x1: 0, y1: 0, x2: 30, y2: 15, lineWidth: 1 },
                                { type: 'line', x1: 30, y1: 0, x2: 0, y2: 15, lineWidth: 1 }
                            ]
                            : [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' }
                            ],
                        width: '10%'
                    },
                    {
                        text: 'II', style: 'left12', width: '3%', bold: true
                    },
                    {
                        canvas: datos.PRIORIDAD_TRIA == 2
                            ? [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' },
                                { type: 'line', x1: 0, y1: 0, x2: 30, y2: 15, lineWidth: 1 },
                                { type: 'line', x1: 30, y1: 0, x2: 0, y2: 15, lineWidth: 1 }
                            ]
                            : [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' }
                            ],
                        width: '10%'
                    },
                    {
                        text: 'III', style: 'left12', width: '3%', bold: true
                    },
                    {
                        canvas: datos.PRIORIDAD_TRIA == 3
                            ? [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' },
                                { type: 'line', x1: 0, y1: 0, x2: 30, y2: 15, lineWidth: 1 },
                                { type: 'line', x1: 30, y1: 0, x2: 0, y2: 15, lineWidth: 1 }
                            ]
                            : [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' }
                            ],
                        width: '10%'
                    },
                    {
                        text: 'IV', style: 'left12', width: '3%', bold: true
                    },
                    {
                        canvas: datos.PRIORIDAD_TRIA == 4
                            ? [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' },
                                { type: 'line', x1: 0, y1: 0, x2: 30, y2: 15, lineWidth: 1 },
                                { type: 'line', x1: 30, y1: 0, x2: 0, y2: 15, lineWidth: 1 }
                            ]
                            : [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' }
                            ],
                        width: '10%'
                    },
                    {
                        text: 'V', style: 'left12', width: '3%', bold: true
                    },
                    {
                        canvas: datos.PRIORIDAD_TRIA == 5
                            ? [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' },
                                { type: 'line', x1: 0, y1: 0, x2: 30, y2: 15, lineWidth: 1 },
                                { type: 'line', x1: 30, y1: 0, x2: 0, y2: 15, lineWidth: 1 }
                            ]
                            : [
                                { type: 'rect', x: 0, y: -1, w: 30, h: 16, r: 0, lineWidth: 1, lineColor: '#000' }
                            ],
                        width: '10%'
                    },
                ]
            },
            {
                marginTop: 10,
                columns: [
                    { text: 'Procedencia:', style: 'left8Bold', width: '20%' },
                    { text: datos.PROCED_TRIA }
                ],
                style: 'left8'
            },
            {
                marginTop: 3,
                columns: [
                    { text: 'Motivo de consulta:', style: 'left8Bold', width: '20%' },
                    { text: datos.MOTIV_TRIA, alignment: 'justify' }
                ],
                style: 'left8'
            },
            {
                marginTop: 3,
                columns: datos.ANTECED_FAMIL_TRIA.trim() !== '' ? [
                    { text: 'Antecedentes familiares:', style: 'left8Bold', width: '20%' },
                    { text: datos.ANTECED_FAMIL_TRIA, alignment: 'justify' }
                ] : [],
                style: 'left8'
            },
            {
                marginTop: 3,
                columns: datos.ANTECED_PATOL_TRIA.trim() !== '' ? [
                    { text: 'Antecedentes patológicos:', style: 'left8Bold', width: '20%' },
                    { text: datos.ANTECED_PATOL_TRIA, alignment: 'justify' }
                ] : [],
                style: 'left8'
            },
            {
                marginTop: 3,
                columns: datos.ANTECED_QUIRUR_TRIA.trim() !== '' ? [
                    { text: 'Antecedentes quirúrgicos:', style: 'left8Bold', width: '20%' },
                    { text: datos.ANTECED_QUIRUR_TRIA, alignment: 'justify' }
                ] : [],
                style: 'left8'
            },
            {
                marginTop: 3,
                columns: datos.ANTECED_ALERGICOS_TRIA.trim() !== '' ? [
                    { text: 'Antecedentes alérgicos:', style: 'left8Bold', width: '20%' },
                    { text: datos.ANTECED_ALERGICOS_TRIA, alignment: 'justify' }
                ] : [],
                style: 'left8'
            },
            {
                stack: llenarSignosVitales()
            },
            {
                marginTop: 7,
                columns: datos.OBSER_TRIA.trim() !== '' ? [
                    { text: datos.OBSER_TRIA, alignment: 'justify' }
                ] : [],
                style: 'left8'
            },
            {
                marginTop: 7,
                columns: datos.FECHA_REGLA_TRIA.trim() !== '' && parseFloat(datos.FECHA_REGLA_TRIA) !== 0
                    ? [
                        { text: 'FUM:', style: 'left8Bold', width: '7%' },
                        { text: datos.FECHA_REGLA_TRIA.substring(0, 4) + '/' + datos.FECHA_REGLA_TRIA.substring(4, 6) + '/' + datos.FECHA_REGLA_TRIA.substring(6, 8), width: '12%' },
                        { text: 'Sintomatologia obstetrica:', style: 'left8Bold', width: '20%' },
                        { text: datos.SINTOM_OBSTE_TRIA, width: '5%' },
                        { text: 'Edad gestacional:', style: 'left8Bold', width: '15%' },
                        { text: datos.EDAD_GEST_TRIA, width: '10%' }
                    ]
                    : [],
                style: 'left8'
            },
            {
                stack: llenarExamenFisico()
            },
            {
                marginTop: 12,
                columns: datos.ANALISIS_TRIA.trim() !== '' ? [
                    { text: 'Análisis:', style: 'left8Bold', width: '12%' },
                    { text: datos.ANALISIS_TRIA, alignment: 'justify' }
                ] : [],
                style: 'left8'
            },
            {
                marginTop: 7,
                columns: datos.DESCRIP_CAUSA_TRIA.trim() !== '' ? [
                    { text: 'Causa externa:', style: 'left8Bold', width: '12%', marginTop: 0 },
                    { text: datos.DESCRIP_CAUSA_TRIA, alignment: 'justify', marginTop: 0 }
                ] : [],
                style: 'left8'
            },
            {
                columns: datos.DESCRIP_EMBAR_TRIA.trim() !== '' ? [
                    { text: 'Embarazo:', style: 'left8Bold', width: '12%', marginTop: 3 },
                    { text: datos.DESCRIP_EMBAR_TRIA, alignment: 'justify', marginTop: 3 }
                ] : [],
                style: 'left8'
            },
            {
                columns: datos.PYP_TRIA.trim() !== '' ? [
                    { text: 'P & P:', style: 'left8Bold', width: '12%', marginTop: 3 },
                    { text: datos.PYP_TRIA, alignment: 'justify', marginTop: 3 }
                ] : [],
                style: 'left8'
            },
            {
                columns: datos.UMI_TRIA.trim() !== '' ? [
                    { text: 'Aplica UMI:', style: 'left8Bold', width: '12%', marginTop: 3 },
                    { text: datos.UMI_TRIA, alignment: 'justify', marginTop: 3 }
                ] : [],
                style: 'left8'
            },
            {
                columns: datos.DESCRIP_FINALID_TRIA.trim() !== '' ? [
                    { text: 'Finalidad:', style: 'left8Bold', width: '12%', marginTop: 3 },
                    { text: datos.DESCRIP_FINALID_TRIA, alignment: 'justify', marginTop: 3 }
                ] : [],
                style: 'left8'
            },
            {
                columns: datos.DESCRIP_CONDUCTA_TRIA.trim() !== '' ? [
                    { text: 'Conducta:', style: 'left8Bold', width: '12%', marginTop: 3 },
                    { text: datos.DESCRIP_CONDUCTA_TRIA, alignment: 'justify', marginTop: 3 }
                ] : [],
                style: 'left8'
            },
            {
                marginTop: 15,
                columns: datos.INDICACIONES_TRIA.trim() !== '' ? [
                    { text: datos.INDICACIONES_TRIA, alignment: 'justify', bold: true }
                ] : [],
                style: 'left8',
            },
            firmaImpresion_impHc(datos)
        ]

        return col
    }

    function llenarSignosVitales() {
        var x = []

        var arrayTit = ['T.Arter', 'T.Med', 'Fr.Card', 'Fr.Resp', 'Tempe', 'So2', 'Pvc', 'Peso', 'Talla', 'IMC', 'Sp.Corp', 'Per.Tor', 'Per.Abdo', 'Per.Muñ', 'Glasgow']

        var tit = []
        for (var i in arrayTit) {
            tit.push({ text: arrayTit[i], style: 'center8BoldT', fontSize: 7 })
        }

        x.push({ text: datos.TENS1_TRIA + '/' + datos.TENS2_TRIA }, { text: datos.T_MED }, { text: datos.FCARD_TRIA }, { text: datos.FRESP_TRIA }, { text: datos.TEMP_TRIA }, { text: datos.OXIMETRIA_TRIA }, { text: datos.PVC_TRIA }, { text: datos.PESO_TRIA }, { text: datos.TALLA_TRIA }, { text: datos.IMC_TRIA }, { text: datos.SCORP_TRIA }, { text: datos.TORA_TRIA }, { text: datos.ABDO_TRIA }, { text: datos.PERMU_TRIA }, { text: datos.GLASG_EDIT_TRIA })

        var fila = [tit]
        fila.push(x)

        var tabla = [
            {
                marginTop: 5,
                bold: true,
                text: 'EXAMEN FISICO',
                style: 'left8Bold'
            },
            {
                unbreakable: true,
                marginTop: 3,
                style: 'center8',
                fontSize: 7,
                table: {
                    heights: [10, 10],
                    widths: ['8%', '5%', '7.5%', '7.5%', '6.2%', '5%', '5%', '6%', '6.6%', '5%', '8%', '6%', '8%', '8%', '8%'],
                    body: fila
                }
            },
        ]

        return tabla
    }

    function llenarExamenFisico() {
        var x = [
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'CABEZA Y CUELLO', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[0].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[0].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'TÓRAX', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[1].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[1].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'CARDIOPULMONAR', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[2].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[2].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'ABDOMEN', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[3].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[3].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'COLUMNA', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[4].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[4].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'GENITO/URINARIO', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[5].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[5].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'EXTREMIDADES', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[6].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[6].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
            {
                style: 'left8',
                marginTop: 5,
                columns: [
                    { text: 'NEUROLOGICO', style: 'left8Bold', width: '20%' },
                    { text: 'Alterado', style: 'left8Bold', width: '7%' },
                    { text: datos.EXAMEN_FISICO_TRIA[7].ALTERADO_EXA_TRIA, width: '4%' },
                ]
            },
            {
                marginTop: 2,
                style: 'left8',
                text: datos.EXAMEN_FISICO_TRIA[7].EXA_FISICO_TRIA, width: '89%', alignment: 'justify'
            },
        ]

        return x
    }
}

async function consultarDatosImp_triage(data) {
    return new Promise((resolve, reject) => {
        postData({ datosh: datosEnvio() + localStorage.Usuario + '|' + data.EDAD_TRIA + '|' + localStorage.IDUSU + '|' + data.LLAVE_TRIA + '|' }, get_url("APP/HICLIN/HC000.DLL"))
            .then(async (data) => {
                datos = data;
                datos.ANALISIS_TRIA = datos.ANALISIS_TRIA.replace(/\&/g, "\n").trim();
                datos.ANTECED_FAMIL_TRIA = datos.ANTECED_FAMIL_TRIA.replace(/\&/g, "\n").trim();
                datos.ANTECED_PATOL_TRIA = datos.ANTECED_PATOL_TRIA.replace(/\&/g, "\n").trim();
                datos.ANTECED_QUIRUR_TRIA = datos.ANTECED_QUIRUR_TRIA.replace(/\&/g, "\n").trim();
                datos.ANTECED_ALERGICOS_TRIA = datos.ANTECED_ALERGICOS_TRIA.replace(/\&/g, "\n").trim();
                
                datos.EDAD_TRIA = isNaN(parseFloat(datos.EDAD_TRIA.substring(1, 4))) ? datos.EDAD_TRIA.substring(0, 1) + '0  ' : datos.EDAD_TRIA;

                for (var i in datos.EXAMEN_FISICO_TRIA) {
                    datos.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA = datos.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA.replace(/\&/g, "\n").trim();
                }

                datos.FCARD_TRIA = isNaN(parseFloat(datos.FCARD_TRIA)) ? 0 : parseFloat(datos.FCARD_TRIA);
                datos.FRESP_TRIA = isNaN(parseFloat(datos.FRESP_TRIA)) ? 0 : parseFloat(datos.FRESP_TRIA);
                datos.INDICACIONES_TRIA = datos.INDICACIONES_TRIA.replace(/\&/g, "\n").trim();
                datos.MOTIV_TRIA = datos.MOTIV_TRIA.replace(/\&/g, "\n").trim();
                datos.OBSER_INI_TRIA = datos.OBSER_INI_TRIA.replace(/\&/g, "\n").trim();
                datos.OBSER_TRIA = datos.OBSER_TRIA.replace(/\&/g, "\n").trim();
                datos.PESO_GRAMOS_TRIA = isNaN(parseFloat(datos.PESO_GRAMOS_TRIA)) ? 0 : parseFloat(datos.PESO_GRAMOS_TRIA);
                datos.PESO_TRIA = isNaN(parseFloat(datos.PESO_TRIA)) ? 0 : parseFloat(datos.PESO_TRIA);
                datos.PROCED_TRIA = datos.PROCED_TRIA.replace(/\&/g, "\n").trim();

                datos.TALLA_TRIA = isNaN(parseFloat(datos.TALLA_TRIA)) ? 0 : parseFloat(datos.TALLA_TRIA);
                datos.TEMP_TRIA = isNaN(parseFloat(datos.TEMP_TRIA)) ? 0 : parseFloat(datos.TEMP_TRIA);
                datos.TENS1_TRIA = isNaN(parseFloat(datos.TENS1_TRIA)) ? 0 : parseFloat(datos.TENS1_TRIA);
                datos.TENS2_TRIA = isNaN(parseFloat(datos.TENS2_TRIA)) ? 0 : parseFloat(datos.TENS2_TRIA);
                datos.UND_PESO_TRIA = isNaN(parseFloat(datos.UND_PESO_TRIA)) ? 0 : parseFloat(datos.UND_PESO_TRIA);

                resolve(datos);
            })
            .catch((err) => {
            console.log(err, 'err')
            CON851("", "Error en impresion triage", null, "error", "Error");
            reject();
        });
    })
}