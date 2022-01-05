function _imprimirPDF(datos, callback) {
    espacios = '                                          '
    datos.nit ? datos.nit : ''
    datos.histNum ? datos.histNum : espacios
    // datos.encabezado.codigo ? datos.encabezado.codigo : datos.encabezado.espacios = espacios

    content = {
        pageMargins: [20, 100, 30, 60],
        images: { logo: `P:\\PROG\\LOGOS\\${datos.nit}.png` },
        header: function (currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 60;

            return {
                margin: [30, 30, 30, 0],
                stack: [
                    {
                        columns: [
                            {
                                margin: [60, 0, 0, 0],
                                stack: [
                                    {
                                        image: 'logo',
                                        // text: '',
                                        width: 50,
                                        height: 50
                                    }
                                ],
                                width: '30%'
                            },
                            {
                                alignment: 'center',
                                margin: [0, 10, 0, 10],
                                text: [
                                    { text: 'CONSENTIMIENTO INFORMADO \n ODONTOLOGIA-HIGIENE ORAL' }
                                ],
                                fontSize: 13,
                                width: '40%'
                            },
                            {
                                margin: [0, 7, 0, 0],
                                text: [
                                    { text: 'Codigo: ' + datos.codigoEnc + '\n' },
                                    { text: 'Versión: ' + datos.versionEnc + '\n' },
                                    { text: 'Fecha de actualización:' + datos.fechaEnc }
                                ],
                                width: '30%',
                                fontSize: 10
                            }
                        ],
                    },
                    {
                        canvas: [{ type: 'rect', x: 0, y: -62, w: width_page, h: 66, r: 0, lineWidth: 1, lineColor: '#000' }],
                    },
                ]
            }
        },
        content: [
            {
                margin: [10, 5, 0, 0],
                stack: [
                    {
                        // DATOS DEL PACIENTE
                        columns: [
                            {
                                width: '100%',
                                stack: [
                                    {
                                        marginTop: 3,
                                        columns: [
                                            { text: 'Historia Numero: ', width: 72, style: 'headerSub' },
                                            { text: datos.histNum, fontSize: 9, width: 175 },
                                            { text: 'Ciudad:', width: 35, style: 'headerSub' },
                                            { text: datos.ciudad, fontSize: 9, width: 110 },
                                            { text: 'Fecha: ', width: 30, style: 'headerSub' },
                                            { text: datos.fecha, fontSize: 9, width: 70 }
                                        ]
                                    },
                                    {
                                        marginTop: 10,
                                        columns: [
                                            { alignment: 'justify', text: 'Yo, ' + (datos.nombrePac ? datos.nombrePac : espacios) + ' identificado con cedula numero ' + (datos.idPac ? datos.idPac : espacios) + ' expedida en ' + datos.ciudadPac + ', actuando en nombre propio o como acudiente de ' + datos.acudiente + '.', fontSize: 9, width: 530 },
                                        ]
                                    },
                                    {
                                        marginTop: 7,
                                        columns: [
                                            { alignment: 'justify', text: 'Comprendo que durante el procedimiento pueden aparecer circunstancias imprevisibles o inesperadas, que pueden requerir una extensión de otro procedimiento; acepto que las ciencias de la salud no son una ciencia exacta, que se garantizan resultados en la atención, y que aunque son procedimientos seguros pueden presentarse complicaciones como: hematomas, inflamaciones, infecciones, alergias, dolores locales, sangrados, efectos adversos medicamentosos, laceraciones, ingesta accidental de flúor, deglución de instrumento o insumo odontológico, caída, bronco aspiración, quemaduras, fatiga muscular y otros impredecibles.', fontSize: 9, width: 530 },
                                        ]
                                    },
                                    {
                                        marginTop: 7,
                                        columns: [
                                            { alignment: 'justify', text: 'Me han explicado también que de negarme a realizarme los exámenes diagnósticos, procedimientos y/o tratamientos ordenados, estoy asumiendo la responsabilidad por sus consecuencias, con lo que exonero de ellas el quipo asistencial tratante y la institución, sin embargo ello no significa que pierda mis derechos para una atención posterior.', fontSize: 9, width: 530 },
                                        ]
                                    },
                                    {
                                        marginTop: 7,
                                        columns: [
                                            { alignment: 'justify', text: 'Se me ha informado que en la ' + datos.entidad + ', cuenta con personal idóneo, competente y capacitado para la determinación de conductas terapéuticas que contribuyan a mejorar mi calidad de vida y salud. Doy constancia de que se me ha explicado en lenguaje sencillo claro, y entendible para mí, los aspectos relacionados con mi condición actual, los riesgos y beneficios de los procedimientos; se me ha permitido hacer todas las preguntas necesarias, y han sido resueltas satisfactoriamente.', fontSize: 9, width: 530 },
                                        ]
                                    },
                                    {
                                        marginTop: 7,
                                        columns: [
                                            { alignment: 'justify', text: 'Por lo tanto, en forma consciente y voluntaria, sin haber sido objeto de coacción, persuasión, ni manipulación:', fontSize: 9, width: 530 },
                                        ]
                                    },
                                    {
                                        marginTop: 7,
                                        columns: [
                                            { alignment: 'justify', marginLeft: 20, text: 'AUTORIZO al personal asistencial de la ' + datos.personalAsist + ', para la realización de los procedimientos de salud: ' + datos.procedimientos + ', cuyo objetivo es: ' + datos.objetivo + ', ante el diagnostico ' + datos.diagnostico, fontSize: 9, width: 530 },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    { canvas: [{ type: 'rect', x: 0, y: -5, w: 15, h: -13, r: 0, lineWidth: 1, lineColor: '#000' }] },
                    { canvas: [{ type: 'line', x1: 15, y1: -18, x2: 0, y2: -5, lineWidth: 1, lineColor: '#000' }] },
                    { canvas: [{ type: 'line', x1: 15, y1: -5, x2: 0, y2: -18, lineWidth: 1, lineColor: '#000' }] },
                    {
                        marginTop: 40,
                        marginLeft: 0,
                        table: {
                            widths: ['50%', '50%'],
                            headerRows: 1,
                            body: [
                                [{ text: 'FIRMA / HUELLA (EN CASO DE NO FIRMAR)', style: 'tablaHuella', marginBottom: 70 }, { text: 'FIRMA / HUELLA (EN CASO DE NO FIRMAR)', style: 'tablaHuella', marginBottom: 70 }],
                            ]
                        }
                    },
                    {
                        marginTop: 10,
                        marginLeft: 0,
                        table: {
                            widths: ['50%', '50%'],
                            headerRows: 1,
                            body: [
                                [{ text: 'NOMBRE DEL PACIENTE', style: 'tabla2' }, { text: 'TUTOR REPRESENTANTE Y/0 ACOMPAÑANTE', style: 'tabla2' }],
                                [{ text: datos.nombrePac, style: 'tabla2' }, { text: datos.acomp, style: 'tabla2' }],
                                [{ text: 'DOCUMENTO DEL PACIENTE: ' + datos.idPac, style: 'tabla2', rowSpan: 2 }, { text: 'DOCUMENTO: ' + datos.idAcomp, style: 'tabla2' }],
                                [{ text: ' ', style: 'tabla2' }, { text: 'TIPO DE PARENTESCO: ' + datos.parentescoAcomp, style: 'tabla2' }],
                                [{ text: 'FIRMA DEL PROFESIONAL: ' + datos.firmaProf, style: 'tabla2', colSpan: 2, marginBottom: 30 }, { text: ' ' }],
                                [{ text: 'NOMBRE DEL PROFESIONAL: ' + datos.nombreProf, style: 'tabla2', colSpan: 2 }, { text: ' ' }],
                                [{ text: 'PROFESIONAL AREA DE MEDICINA FAMILIAR: ' + datos.profFamiliar, style: 'tabla2' }, { text: 'R.P #: ' + datos.rp, style: 'tabla2' }]
                            ]
                        }
                    }
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
                fontSize: 9,
                bold: true
            },
            tablaHuella: {
                fontSize: 8,
                alignment: 'center'
            },
            tabla2: {
                fontSize: 8,
                alignment: 'left'
            }
        }
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