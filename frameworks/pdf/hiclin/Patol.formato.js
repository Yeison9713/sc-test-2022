function _imprimirPatol(datos, callback) {
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
                columns: [
                    { text: 'FECHA DE RECOLECCIÓN: ', width: '25%', style: 'left8Bold' },
                    { text: datos.fechaRecol, style: 'left8' },
                ],
            },
            {
                marginTop: 5,
                columns: [
                    { text: 'PIEZA QUIRURGICA REMITIDA: ', width: '25%', style: 'left8Bold' },
                    { text: datos.pieza, style: 'left8' },
                ],
            },
            {
                marginTop: 5,
                columns: [
                    { text: 'DATOS CLINICOS: ', width: '15%', style: 'left8Bold' },
                    { text: datos.datosClinicos, style: 'left8' },
                ],
            },
            {
                marginTop: 5,
                columns: [
                    { text: 'DIAGNOSTICO: ', width: '15%', style: 'left8Bold' },
                    { text: datos.diagnostico, style: 'left8' },
                ],

            },
            firmaImpresion_impHc(datos)
        ]

        return col
    }
}