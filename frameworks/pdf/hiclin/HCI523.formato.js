function _imprimirHC523(datos) {
    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
        pageMargins: marginEncabezado_SUB52(),
        header: encabezado_SUB52(datos),
        content: [
            {
                margin: [0, 5, 0, 0],
                stack: [
                    {
                        marginTop: 5,
                        stack: llenarGlucometrias()
                    },
                ]
            },
        ],

        styles: estilosImpresion_impHc()
    }

    function llenarGlucometrias() {
        var content = []
        var body = []

        var head = [{ text: 'ITEM', style: 'center8BoldT' }, { text: 'FECHA', style: 'center8BoldT' }, { text: 'HORA', style: 'center8BoldT' }, { text: 'GLUCOMETRIA', style: 'center8BoldT' }, { text: 'MEDICAMENTO', style: 'center8BoldT' }, { text: 'FUNCIONARIO', style: 'center8BoldT' }];
        content.push(head);

        for (var i in datos.glucometrias) {
            body = [{ text: datos.glucometrias[i].item }, { text: datos.glucometrias[i].fecha }, { text: datos.glucometrias[i].horaComp }, { text: datos.glucometrias[i].gluco }, { text: datos.glucometrias[i].descripMed }, { text: datos.glucometrias[i].nombreOper }];
            content.push(body);
        }

        var tabla = [
            {
                marginTop: 5,
                style: 'center8',
                fontSize: 7,
                table: {
                    heights: [10, 10],
                    widths: ['6%', '15%', '10%', '15%', '38%', '16%'],
                    body: content
                }
            }
        ]
        return tabla
    }
}