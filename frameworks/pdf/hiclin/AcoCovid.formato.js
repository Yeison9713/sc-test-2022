function _imprimirAcoCovid(datos, callback) {
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
                text: 'CONSENTIMIENTO INFORMADO PARA ACOMPAÑANTE DE CASO PROBABLE/CONFIRMADO DE COVID-19',
                style: 'center10Bold',
            },
            {
                marginTop: 7,
                text: 'Yo, ' + datos.acompa.nombre.trim()
                    + ' con identificación ' + datos.acompa.tipoId.trim()
                    + ' No ' + datos.acompa.id.trim()
                    + ' de ' + datos.acompa.de.trim()
                    + ' actuando en calidad de acompañante del paciente ' + datos.paciente.nombre.trim()
                    + ', por medio del presente documento manifiesto:',
                alignment: 'justify',
                style: 'left8',
            },
            {
                text: 'Que de manera detallada se me ha suministrado informacion completa, suficiente, con un lenguaje sencillo y claro. El profesional de la salud me ha explicado la naturaleza de la enfermedad, acerca del significado de caso sospechoso o confirmado del coronavirus COVID-19 en cuanto a su presentacion clinica, modo de contagio, medidas para contenerla, posibilidad de sufrir la enfermedad, complicaciones o muerte, mientras permanezca como acompañante del paciente.',
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                text: 'Que he podido hacer las preguntas relacionadas con dicha enfermedad y se me han respondido en forma satisfactoria; así mismo se me ha explicado que voy a estar en riesgo de contagiarme mientras permanezca junto a el.',
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                text: 'Que tras haberse cumplido lo anterior, doy mi consentimiento para permanecer como acompañante mientras dure el proceso de la enfermedad de mi acompañado en la institucion '
                    + datos.institucion.trim() + ', atendiendo el estricto cumplimiento de las normas de la entidad.',
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                text: 'Certifico que el contenido de este consentimiento me ha sido explicado en su totalidad, que lo he leido o me lo han leido y que entiendo perfectamente su contenido.',
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                marginTop: 60,
                canvas: [
                    {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 150,
                        y2: 0,
                        r: 0,
                        lineWidth: 1,
                        lineColor: '#000',
                    },
                ],
            },
            {
                text: 'Firma del acompañante',
                alignment: 'justify',
                style: 'left8',
                marginTop: 5
            },
            {
                text: datos.acompa.tipoId + ' - ' + datos.acompa.id + ' de ' + datos.acompa.de,
                alignment: 'justify',
                style: 'left8',
                marginTop: 2
            },
            firmaImpresion_impHc(datos)
        ]

        return col
    }
}