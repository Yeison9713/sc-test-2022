function _imprimirKarnof(datos, callback) {
    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) },
        pageMargins: marginEncabezado_impHc(),
        header: encabezado_impHC(datos),
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
                text: 'Poblacion Diana: Hace referencia a la poblacion general. Se trata de una escala heteroadministrada que valora la calidad de vida en las personas que sufren de patologias que incapacitan la funcionalidad humana. A mayor grado, mayor calidad de vida.',
                alignment: 'justify',
                style: 'left8',
                fontSize: 8
            },
            {
                marginTop: 10,
                table: {
                    widths: ['20%', '80%'],
                    headerRows: 0,
                    body: [
                        [{ text: 'RANGO GLOBAL', style: 'center8BoldT' }, { text: 'TIPO DE DEPENDENCIA', style: 'center8BoldT' }],
                        [{ text: '0 <= 50', style: 'center8' }, { text: 'ALTO GRADO DE MUERTE EN LOS 6 MESES SIGUIENTES', style: 'center8' }],
                        [{ text: '51 >= 100', style: 'center8' }, { text: 'EXPECTATIVA DE VIDA MAYOR A 6 MESES', style: 'center8' }],
                    ]
                },
            },
            {
                marginTop: 10,
                table: {
                    widths: ['40%', '10%', '50%'],
                    headerRows: 0,
                    body: [
                        [{ text: 'CATEGORIAS GENERALES', style: 'center8BoldT' }, { text: 'GRADO', style: 'center8BoldT' }, { text: 'INTERPRETACIÓN', style: 'center8BoldT' }],
                        [{ text: 'Capaz de realizar actividades normales, no requiere cuidados especiales.', marginTop: 20, style: 'center8', rowSpan: 3 }, { text: datos.tabla.capaz.grado1, style: 'center8', marginTop: 0 }, { text: 'Actividad normal. Sin evidencia de enfermedad.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.capaz.grado2, style: 'center8', marginTop: 5 }, { text: 'Actividad normal con esfuerzo. Algunos signos o sintomas de enfermedad.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.capaz.grado3, style: 'center8', marginTop: 5 }, { text: 'Cuida de si mismo pero es incapaz de llevar a cabo una actividad o trabajo normal.', style: 'center8', alignment: 'justify' }],

                        [{ text: 'Incapaz de trabajar, puede vivir en casa y auto cuidarse con ayuda variable.', marginTop: 25, style: 'center8', rowSpan: 3 }, { text: datos.tabla.incapazTrabajar.grado1, style: 'center8', marginTop: 5 }, { text: 'Necesita ayuda ocasional de otros pero es capaz de cuidar de si mismo para la mayor parte de sus necesidades. ', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.incapazTrabajar.grado2, style: 'center8', marginTop: 5 }, { text: 'Requiere ayuda considerable de otros y cuidados especiales frecuentes. Incapacitado.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.incapazTrabajar.grado3, style: 'center8', marginTop: 5 }, { text: 'Requiere cuidados especiales. \n Severamente incapacitado.', style: 'center8', alignment: 'justify' }],

                        [{ text: 'Incapaz de auto cuidarse. Requiere cuidados especiales, susceptible de hospitalizacion. Probable avance rapido de enfermedad.', marginTop: 20, style: 'center8', rowSpan: 4 }, { text: datos.tabla.incapazCuidarse.grado1, style: 'center8', marginTop: 5 }, { text: 'Indicacion de hospitalizacion aunque no hay indicios de muerte inminente.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.incapazCuidarse.grado2, style: 'center8', marginTop: 0 }, { text: 'Gravemente enfermo. Necesita asistencia activa de soporte.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.incapazCuidarse.grado3, style: 'center8', marginTop: 0 }, { text: 'Moribundo.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.incapazCuidarse.grado4, style: 'center8', marginTop: 0 }, { text: 'Fallecido.', style: 'center8', alignment: 'justify' }],
                    ]
                },
            },
            {
                marginTop: 20,
                unbreakable: true,
                table: {
                    widths: ['19.5%', '24.5%', '56%'],
                    headerRows: 0,
                    body: [
                        [
                            {
                                columns: [{ text: 'FECHA: ', style: 'left8', bold: true, width: '35%' }, { text: datos.total.fecha, style: 'left8', width: '100%' }]
                            },
                            {
                                columns: [{ text: 'PUNTUACIÓN TOTAL: ', style: 'left8', bold: true, width: '75%' }, { text: datos.total.puntuacion, style: 'left8', width: '25%' }]
                            },
                            {
                                columns: [{ text: 'TIPO DE RIESGO: ', style: 'left8', bold: true, width: '25%' }, { text: datos.total.tipoDep, style: 'left8', width: '100%' }]
                            }
                        ]
                    ]
                },
            },
            firmaImpresion_impHc(datos)
        ]

        return col
    }
}