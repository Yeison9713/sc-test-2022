function _imprimirHC522(datos) {
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
                        stack: llenarTablaSignos()
                    },
                ]
            },
        ],

        styles: estilosImpresion_impHc()
    }

    function llenarTablaSignos() {
        var content = []
        var body = []

        var head = [{ text: 'ITEM', style: 'center8BoldT' }, { text: 'FECHA', style: 'center8BoldT' }, { text: 'HORA', style: 'center8BoldT' }, { text: 'TEMP', style: 'center8BoldT' }, { text: 'F.C', style: 'center8BoldT' }, { text: 'F.R', style: 'center8BoldT' }, { text: 'T.A', style: 'center8BoldT' }, { text: 'PVC', style: 'center8BoldT' }, { text: 'SP02', style: 'center8BoldT' }, { text: 'FC.FET', style: 'center8BoldT' }, { text: 'FUNCIONARIO', style: 'center8BoldT' }];
        content.push(head);

        for (var i in datos.signos_vitales) {
            body = [{ text: datos.signos_vitales[i].item }, { text: datos.signos_vitales[i].fecha }, { text: datos.signos_vitales[i].horaComp }, { text: datos.signos_vitales[i].temp }, { text: datos.signos_vitales[i].fcard }, { text: datos.signos_vitales[i].fresp }, { text: datos.signos_vitales[i].tens }, { text: datos.signos_vitales[i].pvc }, { text: datos.signos_vitales[i].oxi }, { text: datos.signos_vitales[i].fc_fet }, { text: datos.signos_vitales[i].nombreOper }];
            content.push(body);
        }

        var tabla = [
            {
                marginTop: 5,
                style: 'center8',
                fontSize: 7,
                table: {
                    heights: [10, 10],
                    widths: ['6%', '15%', '10%', '6%', '6%', '6%', '15%', '6%', '6%', '8%', '16%'],
                    body: content
                }
            }
        ]
        return tabla
    }
}