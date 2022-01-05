function _imprimirIncapHCI01I(datos, callback) {
    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A': datos.AUX_EDAD = '  Años'; break;
        case 'M': datos.AUX_EDAD = '  Meses'; break;
        case 'D': datos.AUX_EDAD = '  Dias'; break;
        default: datos.AUX_EDAD = ''; break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));
    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) },
        pageMargins: [35, 85, 35, 60],
        header: function (currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 70;

            return {
                margin: [35, 30, 35, 0],
                stack: [
                    {
                        columns: [
                            {
                                margin: [7, 0, 0, 0],
                                stack: [
                                    {
                                        image: 'logo',
                                        width: 80,
                                        height: 50
                                    }
                                ],
                                width: '17%'
                            },
                            {
                                style: 'center10Bold',
                                text: [
                                    { text: datos.encabezado.nombre + '\n' },
                                    { text: datos.encabezado.nit + '\n' },
                                    { text: 'Habilitacion IPS:  ' + datos.encabezado.habIps + '\n', width: '75%' },
                                    { text: datos.encabezado.titulo, width: '15%' }
                                ],
                                width: '67%'
                            },
                            {
                                style: 'right10Bold',
                                table : {
                                    widths: ['100%'],
                                    body: [ [{text: 'ORIGINAL'}] ] 
                                },
                                width: '13%',
                            }
                        ],
                    },
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: -57,
                                w: width_page,
                                h: 62,
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
            // {
            //     marginDown: -3,
            //     canvas: [{ type: 'line', x1: 0, x2: 525, y1: 0, y2: 0 }]
            // },
            {
                table: {
                    widths: ['100%'],
                    headerRows: 0,
                    body: [
                        [{}],
                        [
                            {
                                columns: [
                                    { text: 'Fecha:', style: 'left8Bold', width: '15%' },
                                    { text: datos.paciente.fecha, style: 'left8', width: '20%' },
                                    { text: 'TIPO:', style: 'left8Bold', width: '5%' },
                                    { text: datos.paciente.tipoId, style: 'left8', width: '14%' },
                                    { text: 'ID:', style: 'left8Bold', width: '5%' },
                                    { text: datos.paciente.id, style: 'left8', width: '18%' },
                                    { text: 'Edad:', style: 'left8Bold', width: '5%' },
                                    { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '7%' },
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: 'Paciente: ', style: 'left8Bold', width: '15%' },
                                    { text: datos.paciente.nombre, style: 'left8', width: '39%' },
                                    { text: 'Direccion:', style: 'left8Bold', width: '9%' },
                                    { text: datos.paciente.direccion, style: 'left8', width: '45%' },
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: 'Telefono:', style: 'left8Bold', width: '15%' },
                                    { text: datos.paciente.telefono, style: 'left8', width: '10%' },
                                    { text: 'Tipo Afiliacion:', style: 'left8Bold', width: '11%' },
                                    { text: datos.paciente.tipo_afiliacion, style: 'left8', width: '18%' },
                                    { text: 'Empresa:', style: 'left8Bold', width: '9%' },
                                    { text: datos.paciente.empresa, style: 'left8', width: '40%' },
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: 'Lugar de atencion:', style: 'left8Bold', width: '15%' },
                                    { text: datos.paciente.lugarAtencion, style: 'left8', width: '39%' },
                                    { text: 'Entidad Af:', style: 'left8Bold', width: '9%' },
                                    { text: datos.paciente.entidad, style: 'left8', width: '39%' },
                                ]
                            },
                        ],
                    ]
                },
                layout: 'noBorders'
            },
            {
                marginTop: 3,
                marginDown: -3,
                canvas: [{ type: 'line', x1: 0, x2: 525, y1: 0, y2: 0 }]
            },
            {
                // marginTop: 5,
                table: {
                    widths: ['100%'],
                    headerRows: 0,
                    body: [
                        [{}],
                        [
                            {
                                columns: [
                                    { text: 'Fecha inicio:', style: 'left8Bold', width: '15%' },
                                    { text: datos.incap.fechaInicio, style: 'left8', width: '12%' },
                                    { text: 'Fecha final:', style: 'left8Bold', width: '9%' },
                                    { text: datos.incap.fechaFinal, style: 'left8', width: '18%' },
                                    { text: 'Dias:', style: 'left8Bold', width: '5%' },
                                    { text: datos.incap.dias, style: 'left8', width: '5%' },
                                    { text: 'Total Dias: ', style: 'left8Bold', width: '8%' },
                                    { text: datos.incap.totalDias, style: 'left8', width: '35%' },
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: 'Origen servicio:', style: 'left8Bold', width: '15%' },
                                    { text: datos.incap.origenServicio, style: 'left8', width: '39%' },
                                    { text: 'Tipo Incapacidad:', style: 'left8Bold', width: '15%' },
                                    { text: datos.incap.tipo, style: 'left8', width: '39%' },
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: 'Concepto incapacidad:', style: 'left8Bold', width: '17%' },
                                    { text: datos.incap.concepto, style: 'left8', width: '50%' },
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: 'Estado de incapacidad:', style: 'left8Bold', width: '17%' },
                                    { text: datos.incap.estado, style: 'left8', width: '10%' },
                                    { text: 'Grado de incapacidad:', style: 'left8Bold', width: '17%' },
                                    { text: datos.incap.grado, style: 'left8', width: '39%' },
                                ]
                            },
                        ],
                        [
                            {
                                columns: [
                                    { text: 'Observacion:', style: 'left8Bold', width: '17%' },
                                    { text: datos.incap.observacion, style: 'left8', width: '83%' },
                                ]
                            },
                        ],
                    ]
                },
                layout: 'noBorders'
            },
            {
                marginTop: 3,
                canvas: [{ type: 'line', x1: 0, x2: 525, y1: 0, y2: 0 }]
            },
            {
                marginTop: 10,
                image: 'firma',
                width: 150,
                height: 70
            },
            {
                columns: [
                    {
                        marginTop: 7,
                        style: 'left8',
                        text: [
                            { text: datos.medico.nombre.replace(/\s+/g, ' ') + '\n' },
                            { text: 'Medico \n' },
                            { text: 'Reg profesional:  ' },
                            { text: datos.medico.reg + '\n' },
                            { text: datos.medico.id },
                        ]
                    },
                    {
                        marginTop: 7,
                        marginLeft: 150,
                        style: 'left8',
                        text: [
                            { text: 'Codigo DX:  ' + datos.medico.dx },
                        ]
                    },
                ]
            },
            {
                marginTop: 3,
                canvas: [{ type: 'line', x1: 0, x2: 525, y1: 0, y2: 0 }]
            },
        ]
        return col
    }
}