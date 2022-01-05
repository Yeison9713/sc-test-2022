function _imprimirHCI_8031(datos, callback) {
    var espacios = '                                          '

    var content = {
        images: { logo: `C:\\PROSOFT\\LOGOS\\${datos.nitEnc}.png` },
        pageMargins: [20, 205, 30, 60],
        header: function (currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 60;

            return {
                margin: [30, 30, 30, 0],
                stack: [
                    {
                        columns: [
                            {
                                margin: [45, 0, 0, 0],
                                stack: [
                                    {
                                        image: 'logo',
                                        width: 50,
                                        height: 50
                                    }
                                ],
                                width: '20%'
                            },
                            {
                                alignment: 'center',
                                margin: [0, 5, 0, 10],
                                text: [
                                    { text: datos.empresaEnc + '\n' },
                                    { text: datos.nitEnc + '\n' },
                                    { text: 'HISTORIA CLINICA DE PLANIFICACION FAMILIAR' }
                                ],
                                fontSize: 11,
                                width: '60%'
                            },
                            {
                                margin: [0, 5, 0, 0],
                                text: [
                                    { text: 'PAG: ' + currentPage + '\n' },
                                ],
                                alignment: 'center',
                                width: '20%',
                                fontSize: 10
                            },
                        ],
                    },
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: -62,
                                w: width_page,
                                h: 66,
                                r: 0,
                                lineWidth: 1,
                                lineColor: '#000',
                            },
                        ],
                    },
                    {
                        marginTop: 10,
                        alignment: 'center',
                        fontSize: 11,
                        bold: true,
                        columns: [
                            {
                                text: 'DATOS DE IDENTIFICACIÓN'
                            },
                        ]
                    },
                    {
                        canvas: [{ type: 'rect', x: 0, y: -15, w: width_page, h: 17, r: 0, lineWidth: 1, lineColo: '#000' }]
                    },
                    {
                        columns: [
                            {
                                stack: [
                                    {
                                        marginTop: 5,
                                        columns: [
                                            { text: 'SEDE DE ATENCIÓN', style: 'headerSub', width: '20%' },
                                            { text: datos.sedePac, style: 'bodySub', width: '30%' },
                                            { text: 'No. HISTORIA CLINICA: ', style: 'headerSub', width: '17%' },
                                            { text: datos.nroHist, style: 'bodySub', width: '33%' }
                                        ]
                                    },
                                    {
                                        columns: [
                                            { text: 'FECHA DE CONSULTA DE LA INSCRIPCIÓN (1RA VEZ): ', style: 'headerSub', width: '50%' },
                                            { text: 'DIA: ', style: 'headerSub', width: '3%' },
                                            { text: datos.fecha.substring(0, 2), style: 'bodySub', width: '3%' },
                                            { text: 'MES: ', style: 'headerSub', width: '4%' },
                                            { text: datos.fecha.substring(3, 5), style: 'bodySub', width: '3%' },
                                            { text: 'AÑO: ', style: 'headerSub', width: '4%' },
                                            { text: datos.fecha.substring(6, 10), style: 'bodySub', width: '8%' },
                                            { text: 'HORA: ', style: 'headerSub', width: '5%' },
                                            { text: datos.hora, style: 'bodySub', width: '10%' },
                                        ]
                                    },
                                    {
                                        columns: [
                                            { text: 'APELLIDOS Y NOMBRES: ', style: 'headerSub', width: '20%' },
                                            { text: datos.nombrePac, style: 'bodySub', width: '30%' },
                                            { text: 'SEXO: ', style: 'headerSub', width: '5%' },
                                            { text: datos.sexoPac, style: 'bodySub', width: '5%' },
                                            { text: 'EDAD: ', style: 'headerSub', width: '5%' },
                                            { text: datos.edadPac, style: 'bodySub', width: '10%' },
                                            { text: 'F. NACI: ', style: 'headerSub', width: '6%' },
                                            { text: datos.nacimPac, style: 'bodySub', width: '12%' },
                                        ]
                                    },
                                    {
                                        columns: [
                                            { text: 'TIPO DE DOCUMENTO: ', style: 'headerSub', width: '20%' },
                                            { text: datos.idPac, style: 'bodySub', width: '30%' },
                                            { text: 'TELEFONO 1: ', style: 'headerSub', width: '10%' },
                                            { text: datos.telefono1Pac, style: 'bodySub', width: '15%' },
                                            { text: 'TELEFONO 2: ', style: 'headerSub', width: '10%' },
                                            { text: datos.telefono2Pac, style: 'bodySub', width: '15%' },
                                        ]
                                    },
                                    {
                                        columns: [
                                            { text: 'DIRECCIÓN DE RESIDENCIA: ', style: 'headerSub', width: '20%' },
                                            { text: datos.direccionPac, style: 'bodySub', width: '30%' },
                                            { text: 'CODIGO EDUCACIÓN: ', style: 'headerSub', width: '15%' },
                                            { text: datos.codEduPac, style: 'bodySub', width: '10%' },
                                            { text: 'CODIGO ETNIA: ', style: 'headerSub', width: '11%' },
                                            { text: datos.codEtnPac, style: 'bodySub', width: '14%' },
                                        ]
                                    },
                                    {
                                        columns: [
                                            { text: 'CODIGO OCUPACIÓN: ', style: 'headerSub', width: '20%' },
                                            { text: datos.ocupacionPac, style: 'bodySub', width: '80%' },
                                        ]
                                    },
                                    {
                                        columns: [
                                            { text: 'EPS: ', style: 'headerSub', width: '4%' },
                                            { text: datos.epsPac, style: 'bodySub', width: '46%' },
                                            { text: 'TIPO DE REGIMEN: ', style: 'headerSub', width: '13%' },
                                            { text: datos.tipoRegPac, style: 'bodySub', width: '12%' },
                                            { text: 'ESTADO CIVIL: ', style: 'headerSub', width: '11%' },
                                            { text: datos.estCivil, style: 'bodySub', width: '14%' }
                                        ]
                                    },
                                    {
                                        columns: [
                                            { text: 'ACOMPAÑANTE: ', style: 'headerSub', width: '20%' },
                                            { text: datos.acompPac, style: 'bodySub', width: '80%' },
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                ]
            }
        },
        content: [
            {
                margin: [10, 0, 0, 0],
                stack: [
                    {
                        // DATOS DEL PACIENTE
                        columns: [
                            {
                                width: '100%',
                                stack: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            headerRows: 1,
                                            body: [
                                                [{ text: 'MOTIVO DE CONSULTA', style: 'headTabla' }],
                                                [{ text: datos.motivo1 + '\n' + datos.motivo2, style: 'bodyTabla' }]
                                            ]
                                        }
                                    },
                                    {
                                        marginTop: 10,
                                        table: {
                                            widths: ['20%', '10%', '15%', '5%', '50%'],
                                            headerRows: 2,
                                            body: llenarAntFamiliares()
                                        },
                                        layout: 'lightHorizontalLines'
                                    },
                                    {
                                        marginTop: 10,
                                        table: {
                                            widths: ['20%', '30%', '20%', '30%'],
                                            headerRows: 0,
                                            body: llenarAntPersonales()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 0,
                                        table: {
                                            widths: ['8%', '9%', '6%', '77%'],
                                            headerRows: 0,
                                            body: llenarAntPersonales2()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 10,
                                        table: {
                                            widths: ['20%', '5%', '20%', '5%', '20%', '5%', '20%', '5%'],
                                            headerRows: 0,
                                            body: llenarAntGineco()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: -3,
                                        table: {
                                            widths: ['27%', '10%', '27%', '13%', '18%', '5%'],
                                            headerRows: 0,
                                            body: llenarAntGineco2()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: -3,
                                        table: {
                                            widths: ['20%', '11%', '8%', '61%'],
                                            headerRows: 0,
                                            body: llenarAntGineco3()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 10,
                                        table: {
                                            widths: ['26%', '18%', '18%', '18%', '20%'],
                                            headerRows: 0,
                                            body: llenarAntAnticonceptivos()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 12,
                                        pageBreak: 'after',
                                        table: {
                                            widths: ['18%', '15%', '13%', '8%', '21%', '25%'],
                                            headerRows: 0,
                                            body: llenarAntSocioCulturales()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 0,
                                        style: 'headTabla',
                                        columns: [
                                            {
                                                text: 'EXAMEN FISICO'
                                            },
                                        ]
                                    },
                                    {
                                        canvas: [{ type: 'rect', x: 0, y: -15, w: 535, h: 17, r: 0, lineWidth: 1, lineColo: '#000' }]
                                    },
                                    {
                                        marginTop: 10,
                                        marginLeft: 10,
                                        table: {
                                            heights: [15, 15],
                                            body: llenarExamenFisico()
                                        },
                                    },
                                    {
                                        marginTop: 5,
                                        table: {
                                            widths: ['18.66%', '14.66%', '17.66%', '14.66%', '19.66%', '14.66%'],
                                            headerRows: 0,
                                            body: llenarExamenFisico2()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 20,
                                        table: {
                                            widths: ['30%', '70%'],
                                            headerRows: 0,
                                            body: llenarAsesoria()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 0,
                                        table: {
                                            widths: ['32%', '18%', '32%', '18%'],
                                            headerRows: 0,
                                            body: llenarAsesoria2()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 0,
                                        table: {
                                            widths: ['10%', '90%'],
                                            headerRows: 0,
                                            body: llenarAsesoria3()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        pageBreak: 'after',
                                        stack: llenarOtrosTemas()
                                    },
                                    {
                                        marginTop: 0,
                                        table: {
                                            widths: ['70%', '30%'],
                                            headerRows: 0,
                                            body: llenarControl()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 0,
                                        table: {
                                            widths: ['32%', '18%', '32%', '18%'],
                                            headerRows: 0,
                                            body: llenarControl2()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        marginTop: 0,
                                        table: {
                                            widths: ['35%', '35%', '30%'],
                                            headerRows: 0,
                                            body: llenarControl3()
                                        },
                                        layout: 'lightHorizontalLines',
                                    },
                                    {
                                        stack: llenarAnalisis()
                                    },
                                    {
                                        stack: datos.agud ? llenarAgudeza() : []
                                    },
                                    {
                                        marginTop: 40,
                                        columns: [
                                            { text: 'ATENDIDO POR: ' + datos.profesional + ' Reg: ' + datos.regProf, alignment: 'right', style: 'bodyTabla' },
                                        ]
                                    },
                                    {
                                        canvas: [{ type: 'line', x1: 470, y1: -11, x2: 335, y2: -11, lineWidth: 1, lineColo: '#000' }]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ],

        footer: function (currentPage, pageCount) {
            return {
                margin: [0, 10, 40, 0],
                columns: [
                    {
                        text: 'Página ' + currentPage + ' de ' + pageCount,
                        fontSize: 9,
                        alignment: 'right'
                    }
                ]
            }
        },

        styles: {
            subtitulo: {
                bold: true,
                decoration: 'underline'
            },
            headerSub: {
                fontSize: 8,
                bold: true
            },
            bodySub: {
                fontSize: 8,
            },
            headTabla: {
                fontSize: 11,
                alignment: 'center',
                bold: true
            },
            headerTabla: {
                fontSize: 8,
                bold: true,
                alignment: 'center'
            },
            bodyTablaExam: {
                fontSize: 8,
                alignment: 'center'
            },
            bodyTabla: {
                fontSize: 8
            },
            tabla2: {
                fontSize: 8,
                alignment: 'left'
            },
            anticonceptivos: {
                fontSize: 8,
                alignment: 'center'
            }
        }
    }

    function llenarAntFamiliares() {
        var fila = [
            [{ text: 'ANTECEDENTES FAMILIARES', style: 'headTabla', colSpan: 5 }, {}, {}, {}, {}],
            [{}, {}, { text: 'Parentesco', style: 'bodyTabla', bold: true }, {}, {}]
        ]

        for (var i in datos.tablaAntFamiliares.booleano) {
            fila.push([{ text: datos.antFamiliaresTitulos[i], style: 'bodyTabla' }, { text: datos.tablaAntFamiliares.booleano[i], style: 'bodyTabla' }, { text: datos.tablaAntFamiliares.parentesco[i], style: 'bodyTabla' }, { text: 'Cual: ', style: 'bodyTabla' }, { text: datos.tablaAntFamiliares.cual[i], style: 'bodyTabla' }])
        }

        fila.push([{ text: 'Otros antecedentes', style: 'bodyTabla' }, { text: datos.tablaAntFamiliares.otrosAntFam, style: 'bodyTabla', colSpan: 4 }, {}, {}, {}])

        return fila
    }

    function llenarAntPersonales() {
        var fila = [
            [{ text: 'ANTECEDENTES PERSONALES', style: 'headTabla', colSpan: 4 }, {}, {}, {}],
        ]

        for (var i in datos.tablaAntPersonales) {
            var x = (parseInt(i) + 7)
            console.log(x)
            if (i < 7)
                fila.push([{ text: datos.antPersonalesTitulos[i], style: 'bodyTabla' }, { text: datos.tablaAntPersonales[i], style: 'bodyTabla' }, { text: datos.antPersonalesTitulos[x], style: 'bodyTabla' }, { text: datos.tablaAntPersonales[x], style: 'bodyTabla' }])
        }

        return fila
    }

    function llenarAntPersonales2() {
        var fila = [
            [{ text: '', style: 'headTabla', colSpan: 4 }, {}, {}, {}],
        ]

        fila.push([{ text: 'Cirugias: ', style: 'bodyTabla' }, { text: datos.tablaAntPersonales2.cirugias, style: 'bodyTabla' }, { text: 'Cuales: ', style: 'bodyTabla' }, { text: datos.tablaAntPersonales2.cirugiasCuales, style: 'bodyTabla' }])
        fila.push([{ text: 'I.T.S: ', style: 'bodyTabla' }, { text: datos.tablaAntPersonales2.its, style: 'bodyTabla' }, { text: 'Cuales: ', style: 'bodyTabla' }, { text: datos.tablaAntPersonales2.itsCuales, style: 'bodyTabla' }])
        fila.push([{ text: 'Alergias: ', style: 'bodyTabla' }, { text: datos.tablaAntPersonales2.alergias, style: 'bodyTabla' }, { text: 'Cuales: ', style: 'bodyTabla' }, { text: datos.tablaAntPersonales2.alergiasCuales, style: 'bodyTabla' }])
        fila.push([{ text: 'Otros antecedentes: ', style: 'bodyTabla', colSpan: 2 }, {}, { text: datos.tablaAntPersonales2.otrosAnt, style: 'bodyTabla', colSpan: 2 }, {}])

        return fila
    }

    function llenarAntGineco() {
        var fila = [
            [{ text: 'ANTECEDENTES GINECO-OBSTETRICOS', style: 'headTabla', colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
        ]
        for (var i in datos.tablaAntGineco1) {
            if (i == 0 || i == 4 || i == 8)
                fila.push([{ text: datos.antGinecoTitulos1[i], style: 'bodyTabla' }, { text: datos.tablaAntGineco1[i], style: 'bodyTabla' }, { text: datos.antGinecoTitulos1[parseInt(i) + 1], style: 'bodyTabla' }, { text: datos.tablaAntGineco1[parseInt(i) + 1], style: 'bodyTabla' }, { text: datos.antGinecoTitulos1[parseInt(i) + 2], style: 'bodyTabla' }, { text: datos.tablaAntGineco1[parseInt(i) + 2], style: 'bodyTabla' }, { text: datos.antGinecoTitulos1[parseInt(i) + 3], style: 'bodyTabla' }, { text: datos.tablaAntGineco1[parseInt(i) + 3], style: 'bodyTabla' }])
        }
        return fila
    }

    function llenarAntGineco2() {
        var fila = [
            [{ text: '', style: 'headTabla', colSpan: 6 }, {}, {}, {}, {}, {}],
        ]
        fila.push([{ text: datos.antGinecoTitulos2[0], style: 'bodyTabla' }, { text: datos.tablaAntGineco2[0], style: 'bodyTabla' }, { text: datos.antGinecoTitulos2[1], style: 'bodyTabla' }, { text: datos.tablaAntGineco2[1], style: 'bodyTabla' }, { text: datos.antGinecoTitulos2[2], style: 'bodyTabla' }, { text: datos.tablaAntGineco2[2], style: 'bodyTabla' }])
        fila.push([{ text: datos.antGinecoTitulos2[3], style: 'bodyTabla' }, { text: datos.tablaAntGineco2[3], style: 'bodyTabla' }, { text: datos.antGinecoTitulos2[4], style: 'bodyTabla' }, { text: datos.tablaAntGineco2[4], style: 'bodyTabla' }, { text: datos.antGinecoTitulos2[5], style: 'bodyTabla' }, { text: datos.tablaAntGineco2[5], style: 'bodyTabla' }])
        fila.push([{ text: datos.antGinecoTitulos2[6], style: 'bodyTabla' }, { text: datos.tablaAntGineco2[6], style: 'bodyTabla', colSpan: 3 }, {}, {}, {}, {}])
        return fila
    }

    function llenarAntGineco3() {
        var fila = [
            [{ text: '', style: 'headTabla', colSpan: 4 }, {}, {}, {}],
        ]
        fila.push([{ text: datos.antGinecoTitulos3[0], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[0], style: 'bodyTabla' }, { text: datos.antGinecoTitulos3[1], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[1], style: 'bodyTabla' }])
        fila.push([{ text: datos.antGinecoTitulos3[2], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[2], style: 'bodyTabla', colSpan: 3 }, {}, {}])
        fila.push([{ text: datos.antGinecoTitulos3[3], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[3], style: 'bodyTabla' }, { text: datos.antGinecoTitulos3[4], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[4], style: 'bodyTabla' }])
        fila.push([{ text: datos.antGinecoTitulos3[5], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[5], style: 'bodyTabla' }, { text: datos.antGinecoTitulos3[6], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[6], style: 'bodyTabla' }])
        fila.push([{ text: datos.antGinecoTitulos3[7], style: 'bodyTabla' }, { text: datos.tablaAntGineco3[7], style: 'bodyTabla', colSpan: 3 }, {}, {}])
        return fila
    }

    function llenarAntAnticonceptivos() {
        var fila = [
            [{ text: 'ANTECEDENTES ANTICONCEPTIVOS', style: 'headTabla', colSpan: 5 }, {}, {}, {}, {}],
            [{ text: 'Embarazo con uso de metodos anticonceptivos: ', style: 'bodyTabla', colSpan: 2 }, {}, { text: datos.tablaAntAnticonceptivos.dato1, style: 'bodyTabla' }, { text: 'Cual: ', style: 'bodyTabla' }, { text: datos.tablaAntAnticonceptivos.dato1Cual, style: 'bodyTabla' }],
            [{ text: 'METODO ANTICONCEPTIVO', style: 'bodyTabla', bold: true }, { text: 'CONOCE M.A.C', style: 'anticonceptivos', bold: true, alignment: 'center' }, { text: 'HA USADO ANTES', style: 'anticonceptivos', bold: true }, { text: 'USO ACTUAL', style: 'anticonceptivos', bold: true }, { text: 'INDICADO POR', style: 'anticonceptivos', bold: true }]
        ]

        for (var i in datos.tablaAntAnticonceptivos.metodos) {
            fila.push([{ text: datos.tablaAntAnticonceptivos.metodos[i], style: 'bodyTabla' }, { text: datos.tablaAntAnticonceptivos.con[i], style: 'anticonceptivos', alignment: 'center' }, { text: datos.tablaAntAnticonceptivos.usant[i], style: 'anticonceptivos' }, { text: datos.tablaAntAnticonceptivos.usact[i], style: 'anticonceptivos' }, { text: datos.tablaAntAnticonceptivos.indic[i], style: 'anticonceptivos' }])
        }

        fila.push([{ text: 'Razon de no uso en adolescentes con experiencia sexual:', style: 'bodyTabla', colSpan: 2 }, {}, { text: datos.tablaAntAnticonceptivos.dato2, style: 'bodyTabla', colSpan: 3 }])

        return fila
    }

    function llenarAntSocioCulturales() {
        var fila = [
            [{ text: 'ANTECEDENTES SOCIO-CULTURALES', style: 'headTabla', colSpan: 6 }, {}, {}, {}, {}, {}],
            [{ text: 'Recibe apoyo social:   ' + datos.tablaAntSocioCulturales.recibeApoyo, style: 'bodyTabla', colSpan: 2 }, {}, { text: 'Cual:  ' + datos.tablaAntSocioCulturales.recibeApoyoCual, style: 'bodyTabla', colSpan: 4 }, {}, {}, {}],
        ]

        fila.push([{ text: 'VIVIENDA: \n\n Propia: ' + datos.tablaAntSocioCulturales.viv[0], style: 'bodyTabla' }, { text: '\n\n Hacinamiento: ' + datos.tablaAntSocioCulturales.viv[1], style: 'bodyTabla' }, { text: '\n\n Casa: ' + datos.tablaAntSocioCulturales.viv[2], style: 'bodyTabla' }, { text: '\n\n Apto: ' + datos.tablaAntSocioCulturales.viv[3], style: 'bodyTabla' }, { text: '\n\n Invasión: ' + datos.tablaAntSocioCulturales.viv[4], style: 'bodyTabla' }, { text: '\n\n Lote: ' + datos.tablaAntSocioCulturales.viv[5], style: 'bodyTabla' }])
        fila.push([{ text: 'ACTIVIDADES SOCIALES: \n\n Estudia actualmente: ' + datos.tablaAntSocioCulturales.actSoc[0], style: 'bodyTabla', colSpan: 2 }, { text: '\n\n : ' + datos.tablaAntSocioCulturales.actSoc[1], style: 'bodyTabla' }, { text: '\n\n Trabaja actualmente: ' + datos.tablaAntSocioCulturales.actSoc[1], style: 'bodyTabla', colSpan: 2 }, {}, { text: '\n\n Actividad Fisica: ' + datos.tablaAntSocioCulturales.actSoc[2] + ' Horas', style: 'bodyTabla' }, { text: '\n\n Actividad Recreativa: ' + datos.tablaAntSocioCulturales.actSoc[3] + ' Horas', style: 'bodyTabla' }])
        fila.push([{ text: 'HABITOS: \n\n Alimentacion adecuada: ' + datos.tablaAntSocioCulturales.habitos[0], style: 'bodyTabla', colSpan: 2 }, {}, { text: '\n\n Cuantas por dia: ' + datos.tablaAntSocioCulturales.habitos[1], style: 'bodyTabla', colSpan: 2 }, {}, { text: '\n\n Cuantos con la familia: ' + datos.tablaAntSocioCulturales.habitos[2], style: 'bodyTabla' }, {}])
        fila.push([{ text: 'Sueño normal: ' + datos.tablaAntSocioCulturales.habitos[3], style: 'bodyTabla', colSpan: 2 }, {}, { text: 'Cuantas horas por dia: ' + datos.tablaAntSocioCulturales.habitos[4], style: 'bodyTabla', colSpan: 2 }, {}, {}, {}])
        fila.push([{ text: 'CONSUMO DE SUSTANCIAS PSICOACTIVAS: \n\n Cigarrillo: ' + datos.tablaAntSocioCulturales.sustancias[0], style: 'bodyTabla', colSpan: 2 }, {}, { text: '\n\n Cuantos por dia: ' + datos.tablaAntSocioCulturales.sustancias[1], style: 'bodyTabla', colSpan: 2 }, {}, { text: '\n\n Alcohol: ' + datos.tablaAntSocioCulturales.sustancias[2], style: 'bodyTabla' }, { text: '\n\n Abuso: ' + datos.tablaAntSocioCulturales.sustancias[3], style: 'bodyTabla' }])
        fila.push([{ text: 'Otras sustancias: ' + datos.tablaAntSocioCulturales.otrasSust, style: 'bodyTabla', colSpan: 2 }, {}, { text: 'Cuales: ' + datos.tablaAntSocioCulturales.otrasSustCuales, style: 'bodyTabla', colSpan: 4 }, {}, {}, {}])

        return fila
    }

    function llenarExamenFisico() {
        var fila = [
            [{ text: 'T.Arter', style: 'headerTabla' }, { text: 'T.Med', style: 'headerTabla' }, { text: 'Fr.Card', style: 'headerTabla' }, { text: 'Fr.Resp', style: 'headerTabla' }, { text: 'Tempe', style: 'headerTabla' }, { text: 'So2', style: 'headerTabla' }, { text: 'Pvc', style: 'headerTabla' }, { text: 'Peso', style: 'headerTabla' }, { text: 'Talla', style: 'headerTabla' }, { text: 'I.M.C', style: 'headerTabla' }, { text: 'Sp.Corp', style: 'headerTabla' }, { text: 'Per.Tor', style: 'headerTabla' }, { text: 'Per.Abdo', style: 'headerTabla' }, { text: 'Per.muñ', style: 'headerTabla' }, { text: 'Gasglow', style: 'headerTabla' }],
            [{ text: datos.exam[0], style: 'bodyTablaExam' }, { text: datos.exam[1], style: 'bodyTablaExam' }, { text: datos.exam[2], style: 'bodyTablaExam' }, { text: datos.exam[3], style: 'bodyTablaExam' }, { text: datos.exam[4], style: 'bodyTablaExam' }, { text: datos.exam[5], style: 'bodyTablaExam' }, { text: datos.exam[6], style: 'bodyTablaExam' }, { text: datos.exam[7], style: 'bodyTablaExam' }, { text: datos.exam[8], style: 'bodyTablaExam' }, { text: datos.exam[9], style: 'bodyTablaExam' }, { text: datos.exam[10], style: 'bodyTablaExam' }, { text: datos.exam[11], style: 'bodyTablaExam' }, { text: datos.exam[12], style: 'bodyTablaExam' }, { text: datos.exam[13], style: 'bodyTablaExam' }, { text: datos.exam[14], style: 'bodyTablaExam' }],
        ]
        return fila
    }

    function llenarExamenFisico2() {
        var fila = [
            [{ text: 'CLASIFICACIÓN IMC: ' + datos.exam2.clasImc, fontSize: 10, colSpan: 6 }, {}, {}, {}, {}, {}],
        ]

        for (var i in datos.exam2.tablaTitulos) {
            if (i == 0 || i == 3 || i == 6 || i == 9 || i == 12 || i == 15)
                fila.push([{ text: datos.exam2.tablaTitulos[i], style: 'bodyTabla' }, { text: datos.exam2.tabla[i], style: 'bodyTabla' }, { text: datos.exam2.tablaTitulos[parseInt(i) + 1], style: 'bodyTabla' }, { text: datos.exam2.tabla[parseInt(i) + 1], style: 'bodyTabla' }, { text: datos.exam2.tablaTitulos[parseInt(i) + 2], style: 'bodyTabla' }, { text: datos.exam2.tabla[parseInt(i) + 2], style: 'bodyTabla' }])
        }

        fila.push([{ text: 'OBSERVACIONES DEL EXAMEN FISICO: \n' + datos.exam2.observ, style: 'bodyTabla', colSpan: 6 }, {}, {}, {}, {}, {}])
        return fila
    }

    function llenarAsesoria() {
        var fila = [
            [{ text: 'ASESORIA Y ELECCIÓN DEL METODO', style: 'headTabla', colSpan: 2 }, {}],
        ]

        fila.push([{ text: 'Metodo elegido primera vez: ', style: 'bodyTabla' }, { text: datos.asesoria.metodo, style: 'bodyTabla' }])
        fila.push([{ text: 'Brinda educación en: ', style: 'bodyTabla' }, { text: datos.asesoria.brindaEdu, style: 'bodyTabla', alignment: 'justify' }])
        fila.push([{ text: 'Examen practicado en la consulta: ' + datos.asesoria.examPracticado, style: 'bodyTabla' }, { text: 'Cual: ' + datos.asesoria.practicadoCual, style: 'bodyTabla' }])
        return fila
    }

    function llenarAsesoria2() {
        var fila = [
            [{ text: '', style: 'headTabla', colSpan: 4 }, {}, {}, {}],
        ]
        for (var i in datos.asesoria.tablaTitulos) {
            if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8 || i == 10)
                fila.push([{ text: datos.asesoria.tablaTitulos[i], style: 'bodyTabla' }, { text: datos.asesoria.tabla[i], style: 'bodyTabla' }, { text: datos.asesoria.tablaTitulos[parseInt(i) + 1], style: 'bodyTabla' }, { text: datos.asesoria.tabla[parseInt(i) + 1], style: 'bodyTabla' }])
        }
        return fila
    }

    function llenarAsesoria3() {
        var fila = [
            [{ text: '', style: 'headTabla', colSpan: 2 }, {}],
        ]
        fila.push([{ text: 'Otro tema: ' + datos.asesoria.otroTema, style: 'bodyTabla' }, { text: 'Cual: ' + datos.asesoria.otroTemaCual, style: 'bodyTabla' }])

        return fila
    }

    function llenarOtrosTemas() {
        var fila = [
            [{ text: '', style: 'headTabla' }, {}],
        ]

        for (i in datos.otrosTemas.titulos) {
            fila.push([{ text: datos.otrosTemas.titulos[i], style: 'bodyTabla' }, { text: datos.otrosTemas.tabla[i], style: 'bodyTabla' }])
        }

        var tabla = [{
            marginTop: 10,
            table: {
                widths: ['20%', '80%'],
                headerRows: 0,
                body: fila
            },
            layout: 'lightHorizontalLines',
        }]

        return tabla
    }

    function llenarControl() {
        var fila = [
            [{ text: 'CONTROL DE PLANIFICACIÓN FAMILIAR', style: 'headTabla', colSpan: 2 }, {}],
        ]
        fila.push([{ text: 'Metodo utilizado desde la ultima atención: ' + datos.control.metodo, style: 'bodyTabla' }, { text: 'Tiempo de uso: ' + datos.control.tiempoUso + ' Meses', style: 'bodyTabla' }])
        fila.push([{ text: 'Satisfacción con el metodo: ' + datos.control.satisfaccion, style: 'bodyTabla' }, {}])

        return fila
    }

    function llenarControl2() {
        var fila = [
            [{ text: '', style: 'headTabla', colSpan: 4 }, {}, {}, {}],
        ]

        for (var i in datos.control.tablaTitulos) {
            if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8 || i == 10 || i == 12 || i == 14)
                fila.push([{ text: datos.control.tablaTitulos[i], style: 'bodyTabla' }, { text: datos.control.tabla[i], style: 'bodyTabla' }, { text: datos.control.tablaTitulos[parseInt(i) + 1], style: 'bodyTabla' }, { text: datos.control.tabla[parseInt(i) + 1], style: 'bodyTabla' }])
        }

        return fila
    }

    function llenarControl3() {
        var fila = [
            [{ text: '', style: 'headTabla', colSpan: 3 }, {}, {}],
        ]

        fila.push([{ text: 'Expulsión del metodo: ', style: 'bodyTabla' }, { text: 'Subdermico: ' + datos.control.expulsion.subdermico, style: 'bodyTabla' }, { text: 'Intrauterino: ' + datos.control.expulsion.intrauterino, style: 'bodyTabla' }])
        fila.push([{ text: 'Continua con el metodo: ' + datos.control.continua, style: 'bodyTabla' }, { text: 'Nuevo metodo: ' + datos.control.nuevo, style: 'bodyTabla' }, { text: 'Fecha: ' + datos.control.fecha, style: 'bodyTabla' }])
        fila.push([{ text: 'Remisión a: ' + datos.control.remision, style: 'bodyTabla', colSpan: 3 }, {}, {}])
        fila.push([{ text: 'Fecha proxima cita: ' + datos.control.fechaCita, style: 'bodyTabla' }, {}, {}])

        return fila
    }

    function llenarAgudeza() {
        var niv1 = 'Nivel de vision tabla snellen: ' + '                '
        var niv3 = 'Nivel de vision tabla snellen: ' + '                '
        if (datos.agudeza.nivel1.trim() != '') {
            niv1 = 'Nivel de vision tabla snellen:        ' + datos.agudeza.nivel1.padEnd(3) + '      ' + datos.agudeza.nivel2.padEnd(3)
        }

        if (datos.agudeza.nivel3.trim() != '') {
            niv3 = 'Nivel de vision tabla snellen:         ' + datos.agudeza.nivel3.padEnd(3) + '       ' + datos.agudeza.nivel4.padEnd(3)
        }

        var fila = [
            [{ text: 'EXAMEN DE AGUDEZA VISUAL', fontSize: 10, alignment: 'center', colSpan: 2 }, {}],
            [{ text: 'OJO IZQUIERDO', fontSize: 8, alignment: 'center' }, { text: 'OKO DERECHO', fontSize: 8, alignment: 'center' }],
            [{ text: 'Estructuras oculares: ' + '           Sin Alt' + '           Con Alt', fontSize: 8, alignment: 'left' }, { text: 'Estructuras oculares: ' + '           Sin Alt' + '           Con Alt', fontSize: 8, alignment: 'left' }],
            [{ text: niv1, fontSize: 8, alignment: 'left' }, { text: niv3, fontSize: 8, alignment: 'left' }],
            [{ text: 'FECHA ELABORACION: ' + datos.agudeza.fecha, fontSize: 6, alignment: 'right', colSpan: 2 }, {}]
        ]

        var mLeft = 75;
        var widths = [85 + mLeft, 130 + mLeft, 272 + mLeft, 317 + mLeft, 117 + mLeft, 143 + mLeft, 305 + mLeft, 330 + mLeft]

        var tabla = [{
            marginTop: 20,
            marginLeft: mLeft,
            table: {
                widths: ['40%', '40%'],
                headerRows: 0,
                body: fila
            },
        },
        {
            canvas: [{ type: 'rect', x: widths[0], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: '#000' }]
        },
        {
            canvas: [{ type: 'rect', x: widths[1], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: '#000' }]
        },
        {
            canvas: [{ type: 'rect', x: widths[2], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: '#000' }]
        },
        {
            canvas: [{ type: 'rect', x: widths[3], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: '#000' }]
        },
        {
            canvas: [{ type: 'rect', x: widths[4], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: '#000' }]
        },
        {
            canvas: [{ type: 'rect', x: widths[5], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: '#000' }]
        },
        {
            canvas: [{ type: 'rect', x: widths[6], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: '#000' }]
        },
        {
            canvas: [{ type: 'rect', x: widths[7], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: '#000', text: 'ase' }]
        }
        ]

        tabla.push(llenarEquis(widths))

        return tabla
    }

    function llenarEquis(widths) {
        var aux = [];
        if (datos.agudeza.izqSinAlt == true) {
            aux.push({ canvas: [{ type: 'line', x1: widths[0], y1: -38, x2: widths[0] + 15, y2: -29, lineWidth: 1, lineColo: '#000' }] })
            aux.push({ canvas: [{ type: 'line', x1: widths[0] + 15, y1: -38, x2: widths[0], y2: -29, lineWidth: 1, lineColo: '#000' }] })
        } else if (datos.agudeza.izqConAlt == true) {
            aux.push({ canvas: [{ type: 'line', x1: widths[1], y1: -38, x2: widths[1] + 15, y2: -29, lineWidth: 1, lineColo: '#000' }] })
            aux.push({ canvas: [{ type: 'line', x1: widths[1] + 15, y1: -38, x2: widths[1], y2: -29, lineWidth: 1, lineColo: '#000' }] })
        }

        if (datos.agudeza.derSinAlt == true) {
            aux.push({ canvas: [{ type: 'line', x1: widths[2], y1: -38, x2: widths[2] + 15, y2: -29, lineWidth: 1, lineColo: '#000' }] })
            aux.push({ canvas: [{ type: 'line', x1: widths[2] + 15, y1: -38, x2: widths[2], y2: -29, lineWidth: 1, lineColo: '#000' }] })
        } else if (datos.agudeza.derConAlt == true) {
            aux.push({ canvas: [{ type: 'line', x1: widths[3], y1: -38, x2: widths[3] + 15, y2: -29, lineWidth: 1, lineColo: '#000' }] })
            aux.push({ canvas: [{ type: 'line', x1: widths[3] + 15, y1: -38, x2: widths[3], y2: -29, lineWidth: 1, lineColo: '#000' }] })
        }

        return aux;
    }

    function llenarAnalisis() {
        var fila = []

        console.log()

        if (datos.datosAnalisis.diagnostico != '') {
            console.log('llega a diag1')
            var columnDiag = [
                { text: 'DIAGNOSTICO: \n', style: 'bodyTabla', bold: true, fontSize: 10, marginTop: 10 },
            ]
            for (i in datos.datosAnalisis.diagnostico) {
                columnDiag.push({ text: datos.datosAnalisis.diagnostico[i] + '\n', style: 'bodyTabla', marginLeft: 20 })
                console.log('llega a for diag')
            }
            fila.push(columnDiag)
        }

        if (datos.datosAnalisis.analisis.trim() != '') {
            var columnAn = [
                { text: 'A N A L I S I S: \n', style: 'bodyTabla', bold: true, fontSize: 10, marginTop: 5 },
                { text: datos.datosAnalisis.analisis, style: 'bodyTabla', alignment: 'justify', marginLeft: 20 }
            ]
            fila.push(columnAn)
        }

        return fila
    }

    _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
        content
    }).then(el => {
        console.log('Impresión terminada')
    }).catch((err) => {
        console.error(err);
    })

}