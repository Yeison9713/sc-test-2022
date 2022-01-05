function _imprimirDepende(datos, callback) {
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
        console.log(datos, 'datos')
        var col = [
            {
                text: 'Que el (la) usuario (a) ' + datos.paciente.nombre + ' de ' + datos.paciente.edad + ' años de edad ' + ' con tipo de identificación ' + datos.paciente.tipoId + ' con numero de identificación ' + datos.paciente.id + ' tiene como diagnostico ' + datos.diag,
                alignment: 'justify',
                style: 'left8',
            },
            {
                text: 'Que el(la) usuario(a) en mencion le fue aplicado el INDICE DE BARTHEL dando una puntuacion de ' + datos.puntuacionBarthel + ' adicionalmente se le practicó INDICE DE KARNOfSKY, con una puntutacion de ' + datos.puntuacionKarno,
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                text: 'Que dichos diagnosticos le generaron a el (la) usuario(a) efectos, consecuencias y/o secuelas a nivel ' + datos.consecuencias.trim() + ' que lo llevaron a necesitar ayuda por un tercero para la realizacion de las siguientes actividades: ',
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                text: datos.areaTexto,
                alignment: 'justify',
                style: 'left8',
                marginTop: 5
            },
            {
                text: 'De acuerdo a lo mencionado anteriormente, se certifica que el (la) usuario(a) presenta una dependencia funcional: ' + datos.dependencia,
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                text: 'Para constancia, se expide a los ' + datos.fecha.dia + ' dias del mes de ' + datos.fecha.mes + ' del año ' + datos.fecha.ano,
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            {
                text: 'Cordialmente',
                alignment: 'justify',
                style: 'left8',
                marginTop: 10
            },
            firmaImpresion_impHc(datos)
        ]

        return col
    }
}