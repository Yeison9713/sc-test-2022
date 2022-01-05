function _imprimirHCI529(datos, callback) {
    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A': datos.AUX_EDAD = '  Años'; break;
        case 'M': datos.AUX_EDAD = '  Meses'; break;
        case 'D': datos.AUX_EDAD = '  Dias'; break;
        default: datos.AUX_EDAD = ''; break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT)},
        pageMargins: [35, 143, 35, 60],
        header: function (currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 70;

            return {
                margin: [35, 25, 35, 0],
                stack: [
                    {
                        columns: [
                            {
                                margin: [7, 0, 0, 0],
                                stack: [
                                    {
                                        image: 'logo',
                                        width: 75,
                                        height: 45
                                    }
                                ],
                                width: '20%'
                            },
                            {
                                style: 'center10Bold',
                                text: [
                                    { text: datos.encabezado.nombre + '\n' },
                                    { text: datos.encabezado.nit + '\n' },
                                    { text: datos.encabezado.titulo + '   Nro: ' + datos.encabezado.nro }
                                ],
                                width: '60%'
                            },
                            {
                                style: 'right10Bold',
                                alignment: 'right',
                                text: [
                                    { text: '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                                    { text: localStorage.Usuario + moment().format('  YYYY-MM-DD'), fontSize: 7 },
                                ],
                                width: '20%'
                            }
                        ],
                    },
                    {
                        marginLeft: 7,
                        marginTop: 10,
                        columns: [
                            {
                                stack: [
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'FECHA:', style: 'left8Bold', width: '13%' },
                                            { text: datos.paciente.fecha, style: 'left8', width: '17%' },
                                            { text: 'HORA:', style: 'left8Bold', width: '8%' },
                                            { text: datos.paciente.hora, style: 'left8', width: '20%' },
                                            { text: 'UNSERV:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.unServ, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'PACIENTE:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.nombre.replace(/\�/g, "Ñ"), style: 'left8', width: '43%' },
                                            { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.tipoId + datos.paciente.id, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                                            { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                                            { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                                            { text: datos.paciente.sexo, style: 'left8', width: '8%' },
                                            { text: 'E.CIVIL:', style: 'left8Bold', width: '8%' },
                                            { text: datos.paciente.e_civil, style: 'left8', width: '20%' },
                                            { text: 'DIR:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.direccion, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'SALA:', style: 'left8Bold', width: '13%' },
                                            { text: datos.paciente.sala, style: 'left8', width: '17%' },
                                            { text: 'FACTURA:', style: 'left8Bold', width: '8%' },
                                            { text: datos.paciente.factura, style: 'left8', width: '20%' },
                                            { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.telefono, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'ENTIDAD:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.entidad, style: 'left8', width:  '85%'},
                                        ]
                                    },
                                ],
                                width: '100%'
                            },
                        ],
                    },
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: -60,
                                w: width_page,
                                h: 65,
                                r: 0,
                                lineWidth: 1,
                            },
                        ],
                    },
                ]
            }
        },
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
                style: 'left10Bold',
                text: [
                    {text: 'PROCEDIMIENTOS REALIZADOS'}
                ]
            },
            {
                marginTop: 10,
                stack: [
                    datos.procedi.bandera == true ? llenar_procedi() : []
                ],
            },
            {
                marginTop: 20,
                table: {
                    widths: ['15%', '35%', '15%', '35%'],
                    headerRows: 0,
                    body: [
                        [
                            {text: 'Cirujano:', style: 'left10Bold', border: [true, true, false, false]},
                            {text: datos.profesionales.cirujano, style: 'left8', border: [false, true, false, false]},
                            {text: 'Anestesiologo:', style: 'left10Bold', border: [false, true, false, false]},
                            {text: datos.profesionales.anestesiologo, style: 'left8', border: [false, true, true, false]},
                        ],
                        [
                            {text: 'Ayudante:', style: 'left10Bold', border: [true, false, false, false]},
                            {text: datos.profesionales.ayudante, style: 'left8', border: [false, false, false, false]},
                            {text: 'Instrumentador:', style: 'left10Bold', border: [false, false, false, false]},
                            {text: datos.profesionales.instrumentador, style: 'left8', border: [false, false, true, false]},
                        ],
                        [
                            {text: 'Circulante:', style: 'left10Bold', border: [true, false, false, true]},
                            {text: datos.profesionales.circulante, style: 'left8', colSpan: 3, border: [false, false, true, true]},
                            {},
                            {}
                        ]
                    ]
                }
            },
            {
                marginTop: 10,
                columns: [
                    {
                        table: {
                            widths: ['80%', '20%'],
                            headerRows: 0,
                            body: llenarMaterialesCirugia(),
                        }
                    },
                    {
                        width: '3%',
                        stack: [
                            {}
                        ]
                    },
                    {
                        table: {
                            widths: ['80%', '20%'],
                            headerRows: 0,
                            body: llenarMaterialesEnfer(),
                        }
                    },
                ]
            },
            {
                marginTop: 50,
                columns: [
                    {text: datos.materiales_cirugia.oper, style: 'center8'},
                    {text: datos.materiales_enfer.oper, style: 'center8'},
                ]
            }
        ]
        
        return col
    }
    
    function llenar_procedi() {
        var col = [
        ]

        for (var i in datos.procedi.cod) {
            col.push(
                [{text: datos.procedi.cod[i] + '            ' + datos.procedi.descrip[i], style: 'left8', marginTop: 2}],
            )
        }
        return col
    }
    
    function llenarMaterialesCirugia() {
        var col = [
            [
                { text: 'MATERIALES  (CIRUGIA)', style: 'center10Bold', colSpan: 2, fillColor: '#D1DFF4'},
                { text: '', style: 'center10Bold' },
            ],
            [
                { text: 'Descripcion', style: 'center8Bold', border: [true, false, false, true] },
                { text: 'Cantidad', style: 'left8Bold', border: [false, false, true, true] },
            ]
        ]

        for (var i in datos.materiales_cirugia.descrip) {
            col.push(
                [
                    {text: datos.materiales_cirugia.descrip[i], style: 'left8', border: [false, false, false, false]},
                    {text: datos.materiales_cirugia.cantidad[i], style: 'left8', border: [false, false, false, false]},
                ],
            )
        }
        return col
    }
    
    function llenarMaterialesEnfer() {
        var col = [
            [
                { text: 'MATERIALES  (ENFERMERA)', style: 'center10Bold', colSpan: 2, fillColor: '#D1DFF4'},
                { text: '', style: 'center10Bold' },
            ],
            [
                { text: 'Descripcion', style: 'center8Bold', border: [true, false, false, true] },
                { text: 'Cantidad', style: 'left8Bold', border: [false, false, true, true] },
            ]
        ]

        for (var i in datos.materiales_enfer.descrip) {
            col.push(
                [
                    {text: datos.materiales_enfer.descrip[i], style: 'left8', border: [false, false, false, false]},
                    {text: datos.materiales_enfer.cantidad[i], style: 'left8', border: [false, false, false, false]},
                ],
            )
        }
        return col
    }
}