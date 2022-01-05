function _imprimirHCI_8031(datos) {
    console.log(datos, 'datos hci-8031')
        // ************* LLENADO DE IMPRESION CON FORMATO BASE *******************

    formatoBaseImp_Hc.images = { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) };
    formatoBaseImp_Hc.pageMargins = [35, 143, 35, 60];
    formatoBaseImp_Hc.header = formatoBaseImp_Hc.header = encabezadoAperturas_impHc(datos)

    formatoBaseImp_Hc.content[0].stack.push({
        // margin: [0, 0, 0, 0],
        stack: llenarFormato()
    })

    function llenarFormato() {
        var col = [{
            // DATOS DEL PACIENTE
            columns: [{
                width: '100%',
                stack: [{
                        table: {
                            widths: ['100%'],
                            headerRows: 1,
                            body: [
                                [{ text: 'MOTIVO DE CONSULTA', style: 'center8BoldT' }],
                                [{ text: datos.motivo1 + '\n' + datos.motivo2, style: 'left8' }]
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
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 2 || i == 12) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 5) return 1;
                                else return 0;
                            },
                        }
                    },
                    {
                        marginTop: 10,
                        table: {
                            widths: ['20%', '30%', '20%', '30%'],
                            headerRows: 0,
                            body: llenarAntPersonales()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 9) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 4) return 1;
                                else return 0;
                            },
                        }
                    },
                    {
                        marginTop: 0,
                        table: {
                            widths: ['8%', '9%', '6%', '77%'],
                            headerRows: 0,
                            body: llenarAntPersonales2()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 4) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 4) return 1;
                                else return 0;
                            },
                        }
                    },
                    {
                        marginTop: 10,
                        table: {
                            widths: ['20%', '5%', '20%', '5%', '20%', '5%', '20%', '5%'],
                            headerRows: 0,
                            body: llenarAntGineco()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 4) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 8) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        table: {
                            widths: ['27%', '10%', '27%', '13%', '18%', '5%'],
                            headerRows: 0,
                            body: llenarAntGineco2()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 3) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 6) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        table: {
                            widths: ['20%', '11%', '8%', '61%'],
                            headerRows: 0,
                            body: llenarAntGineco3()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 5) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 4) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        pageBreak: 'before',
                        marginTop: 5,
                        table: {
                            widths: ['26%', '18%', '18%', '18%', '20%'],
                            headerRows: 0,
                            body: llenarAntAnticonceptivos()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 2 || i == 3 || i == 21) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 5) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        marginTop: 12,
                        pageBreak: 'after',
                        table: {
                            widths: ['18%', '15%', '13%', '8%', '21%', '25%'],
                            headerRows: 0,
                            body: llenarAntSocioCulturales()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 6 || i == 7 || i == 8) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 6) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        marginTop: 0,
                        style: 'center8Bold',
                        columns: [{
                            text: 'EXAMEN FISICO'
                        }, ]
                    },
                    {
                        canvas: [{ type: 'rect', x: 0, y: -15, w: 525, h: 17, r: 0, lineWidth: 1, lineColo: '#000' }]
                    },
                    {
                        marginTop: 10,
                        fontSize: 7,
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
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 7 || i == 8) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 6) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        marginTop: 20,
                        table: {
                            widths: ['30%', '70%'],
                            headerRows: 0,
                            body: llenarAsesoria()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 4) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 2) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        marginTop: 0,
                        table: {
                            widths: ['32%', '18%', '32%', '18%'],
                            headerRows: 0,
                            body: llenarAsesoria2()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 5) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 4) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        marginTop: 0,
                        table: {
                            widths: ['10%', '90%'],
                            headerRows: 0,
                            body: llenarAsesoria3()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 1) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 2) return 1;
                                else return 0;
                            }
                        }
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
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 3) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 2) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        marginTop: 0,
                        table: {
                            widths: ['32%', '18%', '32%', '18%'],
                            headerRows: 0,
                            body: llenarControl2()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 8) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 4) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        marginTop: 0,
                        table: {
                            widths: ['35%', '35%', '30%'],
                            headerRows: 0,
                            body: llenarControl3()
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 4) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 3) return 1;
                                else return 0;
                            }
                        }
                    },
                    {
                        stack: llenarAnalisis()
                    },
                    {
                        stack: datos.agud ? llenarAgudeza() : []
                    },
                    firmaImpresion_impHc(datos)
                ]
            }, ]
        }]

        return col
    }

    function llenarAntFamiliares() {
        var fila = [
            [{ text: 'ANTECEDENTES FAMILIARES', style: 'center8BoldT', colSpan: 5 }, {}, {}, {}, {}],
            [{}, {}, { text: 'Parentesco', style: 'left8', bold: true }, {}, {}]
        ]

        for (var i in datos.tablaAntFamiliares.booleano) {
            fila.push([{ text: datos.antFamiliaresTitulos[i], style: 'left8' }, { text: datos.tablaAntFamiliares.booleano[i], style: 'left8' }, { text: datos.tablaAntFamiliares.parentesco[i], style: 'left8' }, { text: 'Cual: ', style: 'left8' }, { text: datos.tablaAntFamiliares.cual[i], style: 'left8' }])
        }

        fila.push([{ text: 'Otros antecedentes', style: 'left8' }, { text: datos.tablaAntFamiliares.otrosAntFam, style: 'left8', colSpan: 4 }, {}, {}, {}])

        return fila
    }

    function llenarAntPersonales() {
        var fila = [
            [{ text: 'ANTECEDENTES PERSONALES', style: 'center8BoldT', colSpan: 4 }, {}, {}, {}],
        ]

        for (var i in datos.tablaAntPersonales) {
            var x = (parseInt(i) + 7)
            if (i < 7)
                fila.push([{ text: datos.antPersonalesTitulos[i], style: 'left8' }, { text: datos.tablaAntPersonales[i], style: 'left8' }, { text: datos.antPersonalesTitulos[x], style: 'left8' }, { text: datos.tablaAntPersonales[x], style: 'left8' }])
        }

        return fila
    }

    function llenarAntPersonales2() {
        var fila = []

        fila.push([{ text: 'Cirugias: ', style: 'left8' }, { text: datos.tablaAntPersonales2.cirugias, style: 'left8' }, { text: 'Cuales: ', style: 'left8' }, { text: datos.tablaAntPersonales2.cirugiasCuales, style: 'left8' }])
        fila.push([{ text: 'I.T.S: ', style: 'left8' }, { text: datos.tablaAntPersonales2.its, style: 'left8' }, { text: 'Cuales: ', style: 'left8' }, { text: datos.tablaAntPersonales2.itsCuales, style: 'left8' }])
        fila.push([{ text: 'Alergias: ', style: 'left8' }, { text: datos.tablaAntPersonales2.alergias, style: 'left8' }, { text: 'Cuales: ', style: 'left8' }, { text: datos.tablaAntPersonales2.alergiasCuales, style: 'left8' }])
        fila.push([{ text: 'Otros antecedentes: ', style: 'left8', colSpan: 2 }, {}, { text: datos.tablaAntPersonales2.otrosAnt, style: 'left8', colSpan: 2 }, {}])

        return fila
    }

    function llenarAntGineco() {
        var fila = [
            [{ text: 'ANTECEDENTES GINECO-OBSTETRICOS', style: 'center8BoldT', colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
        ]
        for (var i in datos.tablaAntGineco1) {
            if (i == 0 || i == 4 || i == 8)
                fila.push([{ text: datos.antGinecoTitulos1[i], style: 'left8' }, { text: datos.tablaAntGineco1[i], style: 'left8' }, { text: datos.antGinecoTitulos1[parseInt(i) + 1], style: 'left8' }, { text: datos.tablaAntGineco1[parseInt(i) + 1], style: 'left8' }, { text: datos.antGinecoTitulos1[parseInt(i) + 2], style: 'left8' }, { text: datos.tablaAntGineco1[parseInt(i) + 2], style: 'left8' }, { text: datos.antGinecoTitulos1[parseInt(i) + 3], style: 'left8' }, { text: datos.tablaAntGineco1[parseInt(i) + 3], style: 'left8' }])
        }
        return fila
    }

    function llenarAntGineco2() {
        var fila = []
        fila.push([{ text: datos.antGinecoTitulos2[0], style: 'left8' }, { text: datos.tablaAntGineco2[0], style: 'left8' }, { text: datos.antGinecoTitulos2[1], style: 'left8' }, { text: datos.tablaAntGineco2[1], style: 'left8' }, { text: datos.antGinecoTitulos2[2], style: 'left8' }, { text: datos.tablaAntGineco2[2], style: 'left8' }])
        fila.push([{ text: datos.antGinecoTitulos2[3], style: 'left8' }, { text: datos.tablaAntGineco2[3], style: 'left8' }, { text: datos.antGinecoTitulos2[4], style: 'left8' }, { text: datos.tablaAntGineco2[4], style: 'left8' }, { text: datos.antGinecoTitulos2[5], style: 'left8' }, { text: datos.tablaAntGineco2[5], style: 'left8' }])
        fila.push([{ text: datos.antGinecoTitulos2[6], style: 'left8' }, { text: datos.tablaAntGineco2[6], style: 'left8', colSpan: 3 }, {}, {}, {}, {}])
        return fila
    }

    function llenarAntGineco3() {
        var fila = []
        fila.push([{ text: datos.antGinecoTitulos3[0], style: 'left8' }, { text: datos.tablaAntGineco3[0], style: 'left8' }, { text: datos.antGinecoTitulos3[1], style: 'left8' }, { text: datos.tablaAntGineco3[1], style: 'left8' }])
        fila.push([{ text: datos.antGinecoTitulos3[2], style: 'left8' }, { text: datos.tablaAntGineco3[2], style: 'left8', colSpan: 3 }, {}, {}])
        fila.push([{ text: datos.antGinecoTitulos3[3], style: 'left8' }, { text: datos.tablaAntGineco3[3], style: 'left8' }, { text: datos.antGinecoTitulos3[4], style: 'left8' }, { text: datos.tablaAntGineco3[4], style: 'left8' }])
        fila.push([{ text: datos.antGinecoTitulos3[5], style: 'left8' }, { text: datos.tablaAntGineco3[5], style: 'left8' }, { text: datos.antGinecoTitulos3[6], style: 'left8' }, { text: datos.tablaAntGineco3[6], style: 'left8' }])
        fila.push([{ text: datos.antGinecoTitulos3[7], style: 'left8' }, { text: datos.tablaAntGineco3[7], style: 'left8', colSpan: 3 }, {}, {}])
        return fila
    }

    function llenarAntAnticonceptivos() {
        var fila = [
            [{ text: 'ANTECEDENTES ANTICONCEPTIVOS', style: 'center8BoldT', colSpan: 5 }, {}, {}, {}, {}],
            [{ text: 'Embarazo con uso de metodos anticonceptivos: ', style: 'left8', colSpan: 2 }, {}, { text: datos.tablaAntAnticonceptivos.dato1, style: 'left8' }, { text: 'Cual: ', style: 'left8' }, { text: datos.tablaAntAnticonceptivos.dato1Cual, style: 'left8' }],
            [{ text: 'METODO ANTICONCEPTIVO', style: 'left8', bold: true }, { text: 'CONOCE M.A.C', style: 'center8', bold: true, alignment: 'center' }, { text: 'HA USADO ANTES', style: 'center8', bold: true }, { text: 'USO ACTUAL', style: 'center8', bold: true }, { text: 'INDICADO POR', style: 'center8', bold: true }]
        ]

        for (var i in datos.tablaAntAnticonceptivos.metodos) {
            fila.push([{ text: datos.tablaAntAnticonceptivos.metodos[i], style: 'left8' }, { text: datos.tablaAntAnticonceptivos.con[i], style: 'center8', alignment: 'center' }, { text: datos.tablaAntAnticonceptivos.usant[i], style: 'center8' }, { text: datos.tablaAntAnticonceptivos.usact[i], style: 'center8' }, { text: datos.tablaAntAnticonceptivos.indic[i], style: 'center8' }])
        }

        fila.push([{ text: 'Razon de no uso en adolescentes con experiencia sexual:', style: 'left8', colSpan: 2 }, {}, { text: datos.tablaAntAnticonceptivos.dato2, style: 'left8', colSpan: 3 }])

        return fila
    }

    function llenarAntSocioCulturales() {
        var fila = [
            [{ text: 'ANTECEDENTES SOCIO-CULTURALES', style: 'center8BoldT', colSpan: 6 }, {}, {}, {}, {}, {}],
            [{ text: 'Recibe apoyo social:   ' + datos.tablaAntSocioCulturales.recibeApoyo, style: 'left8', colSpan: 2 }, {}, { text: 'Cual:  ' + datos.tablaAntSocioCulturales.recibeApoyoCual, style: 'left8', colSpan: 4 }, {}, {}, {}],
        ]

        fila.push([{ text: 'VIVIENDA: \n\n Propia: ' + datos.tablaAntSocioCulturales.viv[0], style: 'left8' }, { text: '\n\n Hacinamiento: ' + datos.tablaAntSocioCulturales.viv[1], style: 'left8' }, { text: '\n\n Casa: ' + datos.tablaAntSocioCulturales.viv[2], style: 'left8' }, { text: '\n\n Apto: ' + datos.tablaAntSocioCulturales.viv[3], style: 'left8' }, { text: '\n\n Invasión: ' + datos.tablaAntSocioCulturales.viv[4], style: 'left8' }, { text: '\n\n Lote: ' + datos.tablaAntSocioCulturales.viv[5], style: 'left8' }])
        fila.push([{ text: 'ACTIVIDADES SOCIALES: \n\n Estudia actualmente: ' + datos.tablaAntSocioCulturales.actSoc[0], style: 'left8', colSpan: 2 }, { text: '\n\n : ' + datos.tablaAntSocioCulturales.actSoc[1], style: 'left8' }, { text: '\n\n Trabaja actualmente: ' + datos.tablaAntSocioCulturales.actSoc[1], style: 'left8', colSpan: 2 }, {}, { text: '\n\n Actividad Fisica: ' + datos.tablaAntSocioCulturales.actSoc[2] + ' Horas', style: 'left8' }, { text: '\n\n Actividad Recreativa: ' + datos.tablaAntSocioCulturales.actSoc[3] + ' Horas', style: 'left8' }])
        fila.push([{ text: 'HABITOS: \n\n Alimentacion adecuada: ' + datos.tablaAntSocioCulturales.habitos[0], style: 'left8', colSpan: 2 }, {}, { text: '\n\n Cuantas por dia: ' + datos.tablaAntSocioCulturales.habitos[1], style: 'left8', colSpan: 2 }, {}, { text: '\n\n Cuantos con la familia: ' + datos.tablaAntSocioCulturales.habitos[2], style: 'left8' }, {}])
        fila.push([{ text: 'Sueño normal: ' + datos.tablaAntSocioCulturales.habitos[3], style: 'left8', colSpan: 2 }, {}, { text: 'Cuantas horas por dia: ' + datos.tablaAntSocioCulturales.habitos[4], style: 'left8', colSpan: 2 }, {}, {}, {}])
        fila.push([{ text: 'CONSUMO DE SUSTANCIAS PSICOACTIVAS: \n\n Cigarrillo: ' + datos.tablaAntSocioCulturales.sustancias[0], style: 'left8', colSpan: 2 }, {}, { text: '\n\n Cuantos por dia: ' + datos.tablaAntSocioCulturales.sustancias[1], style: 'left8', colSpan: 2 }, {}, { text: '\n\n Alcohol: ' + datos.tablaAntSocioCulturales.sustancias[2], style: 'left8' }, { text: '\n\n Abuso: ' + datos.tablaAntSocioCulturales.sustancias[3], style: 'left8' }])
        fila.push([{ text: 'Otras sustancias: ' + datos.tablaAntSocioCulturales.otrasSust, style: 'left8', colSpan: 2 }, {}, { text: 'Cuales: ' + datos.tablaAntSocioCulturales.otrasSustCuales, style: 'left8', colSpan: 4 }, {}, {}, {}])

        return fila
    }

    function llenarExamenFisico() {
        var fila = [
            [{ text: 'T.Arter', style: 'center8Bold' }, { text: 'T.Med', style: 'center8Bold' }, { text: 'Fr.Card', style: 'center8Bold' }, { text: 'Fr.Resp', style: 'center8Bold' }, { text: 'Tempe', style: 'center8Bold' }, { text: 'So2', style: 'center8Bold' }, { text: 'Pvc', style: 'center8Bold' }, { text: 'Peso', style: 'center8Bold' }, { text: 'Talla', style: 'center8Bold' }, { text: 'I.M.C', style: 'center8Bold' }, { text: 'Sp.Corp', style: 'center8Bold' }, { text: 'Per.Tor', style: 'center8Bold' }, { text: 'Per.Abdo', style: 'center8Bold' }, { text: 'Per.muñ', style: 'center8Bold' }, { text: 'Gasglow', style: 'center8Bold' }],
            [{ text: datos.exam[0], style: 'center8' }, { text: datos.exam[1], style: 'center8' }, { text: datos.exam[2], style: 'center8' }, { text: datos.exam[3], style: 'center8' }, { text: datos.exam[4], style: 'center8' }, { text: datos.exam[5], style: 'center8' }, { text: datos.exam[6], style: 'center8' }, { text: datos.exam[7], style: 'center8' }, { text: datos.exam[8], style: 'center8' }, { text: datos.exam[9], style: 'center8' }, { text: datos.exam[10], style: 'center8' }, { text: datos.exam[11], style: 'center8' }, { text: datos.exam[12], style: 'center8' }, { text: datos.exam[13], style: 'center8' }, { text: datos.exam[14], style: 'center8' }],
        ]
        return fila
    }

    function llenarExamenFisico2() {
        var fila = [
            [{ text: 'CLASIFICACIÓN IMC: ' + datos.exam2.clasImc, colSpan: 6, style: 'left8' }, {}, {}, {}, {}, {}],
        ]

        for (var i in datos.exam2.tablaTitulos) {
            if (i == 0 || i == 3 || i == 6 || i == 9 || i == 12 || i == 15)
                fila.push([{ text: datos.exam2.tablaTitulos[i], style: 'left8' }, { text: datos.exam2.tabla[i], style: 'left8' }, { text: datos.exam2.tablaTitulos[parseInt(i) + 1], style: 'left8' }, { text: datos.exam2.tabla[parseInt(i) + 1], style: 'left8' }, { text: datos.exam2.tablaTitulos[parseInt(i) + 2], style: 'left8' }, { text: datos.exam2.tabla[parseInt(i) + 2], style: 'left8' }])
        }

        fila.push([{ text: 'OBSERVACIONES DEL EXAMEN FISICO: \n' + datos.exam2.observ, style: 'left8', colSpan: 6 }, {}, {}, {}, {}, {}])
        return fila
    }

    function llenarAsesoria() {
        var fila = [
            [{ text: 'ASESORIA Y ELECCIÓN DEL METODO', style: 'center8BoldT', colSpan: 2 }, {}],
        ]

        fila.push([{ text: 'Metodo elegido primera vez: ', style: 'left8' }, { text: datos.asesoria.metodo, style: 'left8' }])
        fila.push([{ text: 'Brinda educación en: ', style: 'left8' }, { text: datos.asesoria.brindaEdu, style: 'left8', alignment: 'justify' }])
        fila.push([{ text: 'Examen practicado en la consulta: ' + datos.asesoria.examPracticado, style: 'left8' }, { text: 'Cual: ' + datos.asesoria.practicadoCual, style: 'left8' }])
        return fila
    }

    function llenarAsesoria2() {
        var fila = []
        for (var i in datos.asesoria.tablaTitulos) {
            if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8 || i == 10)
                fila.push([{ text: datos.asesoria.tablaTitulos[i], style: 'left8' }, { text: datos.asesoria.tabla[i], style: 'left8' }, { text: datos.asesoria.tablaTitulos[parseInt(i) + 1], style: 'left8' }, { text: datos.asesoria.tabla[parseInt(i) + 1], style: 'left8' }])
        }
        return fila
    }

    function llenarAsesoria3() {
        var fila = []
        fila.push([{ text: 'Otro tema: ' + datos.asesoria.otroTema, style: 'left8' }, { text: 'Cual: ' + datos.asesoria.otroTemaCual, style: 'left8' }])

        return fila
    }

    function llenarOtrosTemas() {
        var fila = [
            [{ text: '', style: 'center10' }, {}],
        ]

        for (i in datos.otrosTemas.titulos) {
            fila.push([{ text: datos.otrosTemas.titulos[i], style: 'left8' }, { text: datos.otrosTemas.tabla[i], style: 'left8' }])
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
            [{ text: 'CONTROL DE PLANIFICACIÓN FAMILIAR', style: 'center8BoldT', colSpan: 2 }, {}],
        ]
        fila.push([{ text: 'Metodo utilizado desde la ultima atención: ' + datos.control.metodo, style: 'left8' }, { text: 'Tiempo de uso: ' + datos.control.tiempoUso + ' Meses', style: 'left8' }])
        fila.push([{ text: 'Satisfacción con el metodo: ' + datos.control.satisfaccion, style: 'left8' }, {}])

        return fila
    }

    function llenarControl2() {
        var fila = []

        for (var i in datos.control.tablaTitulos) {
            if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8 || i == 10 || i == 12 || i == 14)
                fila.push([{ text: datos.control.tablaTitulos[i], style: 'left8' }, { text: datos.control.tabla[i], style: 'left8' }, { text: datos.control.tablaTitulos[parseInt(i) + 1], style: 'left8' }, { text: datos.control.tabla[parseInt(i) + 1], style: 'left8' }])
        }

        return fila
    }

    function llenarControl3() {
        var fila = []

        fila.push([{ text: 'Expulsión del metodo: ', style: 'left8' }, { text: 'Subdermico: ' + datos.control.expulsion.subdermico, style: 'left8' }, { text: 'Intrauterino: ' + datos.control.expulsion.intrauterino, style: 'left8' }])
        fila.push([{ text: 'Continua con el metodo: ' + datos.control.continua, style: 'left8' }, { text: 'Nuevo metodo: ' + datos.control.nuevo, style: 'left8' }, { text: 'Fecha: ' + datos.control.fecha, style: 'left8' }])
        fila.push([{ text: 'Remisión a: ' + datos.control.remision, style: 'left8', colSpan: 3 }, {}, {}])
        fila.push([{ text: 'Fecha proxima cita: ' + datos.control.fechaCita, style: 'left8' }, {}, {}])

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
            [{ text: 'EXAMEN DE AGUDEZA VISUAL', style: 'center8BoldT', colSpan: 2 }, {}],
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
                { text: 'DIAGNOSTICO: \n', style: 'left8Bold', marginTop: 10 },
            ]
            for (i in datos.datosAnalisis.diagnostico) {
                columnDiag.push({ text: datos.datosAnalisis.diagnostico[i] + '\n', style: 'left8', marginLeft: 20 })
                console.log('llega a for diag')
            }
            fila.push(columnDiag)
        }

        if (datos.datosAnalisis.analisis) {
            var columnAn = [
                { text: 'A N A L I S I S: \n', style: 'left8Bold', marginTop: 5 },
                { text: datos.datosAnalisis.analisis, style: 'left8', alignment: 'justify', marginLeft: 20 }
            ]
            fila.push(columnAn)
        }

        if (datos.datosAnalisis.analisis) {
            var columnAn = [
                { text: 'P L A N: \n', style: 'left8Bold', marginTop: 5 },
                { text: datos.datosPlan.plan, style: 'left8', alignment: 'justify', marginLeft: 20 }
            ]
            fila.push(columnAn)
        }

        return fila
    }
}