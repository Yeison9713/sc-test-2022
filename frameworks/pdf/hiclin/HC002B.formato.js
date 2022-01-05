function _imprimirHC002B(contenido) {
    return {
        pageMargins: [35, 60, 35, 40],
        header: function (currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 70;

            return {
                margin: [35, 10, 35, 0],
                stack: [
                    { 
                        columns: [
                            {
                                marginLeft: 7,
                                fontSize: 11,
                                stack: [
                                    { text: 'CONSULTA RESUMIDA DE EVOLUCIONES' },
                                    { text: '(NO ES VALIDA COMO HISTORIA CLINICA)'},
                                    { text: 'PACIENTE: ' + $_REG_PACI.DESCRIP.replace(/\s+/g, ' '), fontSize: 9 },
                                ],
                                width: '80%'
                            },
                            {
                                marginRight: 7,
                                fontSize: 11,
                                alignment: 'right',
                                text: [
                                    { text: '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                                    { text: localStorage.Usuario + moment().format('  YYYY-MM-DD HH:mm'), fontSize: 7 }
                                ],
                                width: '20%',
                            }
                        ],
                    },
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: -40,
                                w: width_page,
                                h: 42,
                                r: 0,
                                lineWidth: 1,
                                lineColor: '#000',
                            },
                        ],
                    },
                ]
            }
        },
        content: [
            {
                margin: [0, -10, 0, 0],
                stack: [
                    {
                        stack: contenido
                    },
                ]
            },
        ],

        styles: estilosImpresion_impHc()
    }
}