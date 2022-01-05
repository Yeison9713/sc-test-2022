function _imprimirHC003A_2(datos, callback) {
    $this.data = datos;
    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A': datos.AUX_EDAD = '  Años'; break;
        case 'M': datos.AUX_EDAD = '  Meses'; break;
        case 'D': datos.AUX_EDAD = '  Dias'; break;
        default: datos.AUX_EDAD = ''; break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    var imagenes = {};
    imagenes.logo = rutaLogos_impHc($_USUA_GLOBAL[0].NIT);
    for (var i in datos.firmas.firma) {
        imagenes[`firma${i}`] = rutaFirmas_impHc(datos.firmas.firma[i]);
    }

    return {
        images: imagenes,
        pageMargins: [35, 147, 35, 60],
        pageOrientation: 'landscape',
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
                                        width: 75,
                                        height: 45
                                    }
                                ],
                                width: '20%'
                            },
                            {
                                style: 'center12Bold',
                                text: [
                                    { text: datos.encabezado.nombre + '\n' },
                                    { text: datos.encabezado.nit + '\n' },
                                    { text: datos.encabezado.titulo }
                                ],
                                width: '60%'
                            },
                            {
                                style: 'left12',
                                alignment: 'right',
                                text: [
                                    { text: '' + 'PAG: ' + currentPage + '\n\n' },
                                    { text: localStorage.Usuario + moment().format('  YYYY-MM-DD'), fontSize: 7 },
                                ],
                                width: '20%'
                            }
                        ],
                    },
                    {
                        marginLeft: 7,
                        marginTop: 10,
                        stack: [
                            {
                                columns: [
                                    { text: 'NOMBRE:', style: 'left8Bold', width: '10%' },
                                    { text: datos.paciente.nombre, style: 'left8', width: '48%' },
                                    { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                                    { text: datos.paciente.tipoId + datos.paciente.id, style: 'left8', width: '27%' },
                                ]
                            },
                            {
                                marginTop: 2,
                                columns: [
                                    { text: 'DIRECCION:', style: 'left8Bold', width: '10%' },
                                    { text: datos.paciente.direccion, style: 'left8', width: '48%' },
                                    { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                                    { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                                    { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                                    { text: datos.paciente.sexo, style: 'left8', width: '8%' },
                                ]
                            },
                            {
                                marginTop: 2,
                                columns: [
                                    { text: 'E.CIVIL:', style: 'left8Bold', width: '10%' },
                                    { text: datos.paciente.e_civil, style: 'left8', width: '10%' },
                                    { text: 'ENTIDAD:', style: 'left8Bold', width: '6%' },
                                    { text: datos.paciente.entidad, style: 'left8', width: '32%' },
                                    { text: 'OCUPACION:', style: 'left8Bold', width: '10%' },
                                    { text: datos.paciente.ocupacion, style: 'left8', width: '24%' },
                                ]
                            },
                            {
                                columns: [
                                    { text: 'U.SERVICIO:', style: 'left8Bold', width: '10%' },
                                    { text: datos.paciente.u_servicio, style: 'left8', width: '48%' },
                                    { text: 'FAC.PACI:', style: 'left8Bold', width: '10%' },
                                    { text: datos.paciente.fact_paci, style: 'left8', width: '32%' },
                                ]
                            },
                        ],
                    },
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: -45,
                                w: width_page,
                                h: 50,
                                r: 0,
                                lineWidth: 1,
                                lineColor: '#476fad',
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

        styles: estilosImpresion_impHc(),

    }

    function llenarFormato() {
        var col = [
            {
                margin: [0, 5, 0, 0],
                marginTop: 0,
                table: {
                    widths: ['23%', '7%', '10%', '15%', '15%', '15%', '15%'],
                    headerRows: 0,
                    body: llenarTabla(),
                },
            },
            {
                style: 'center8',
                marginTop: 20,
                unbreakable: true,
                table: {
                    widths: ['70%', '30%'],
                    headerRows: 0,
                    body: llenarMedicoFirma(),
                },
            },
        ]
        return col
    }

    function llenarTabla() {
        var col = [
            [
                { text: 'DESCRIPCION', style: 'center8BoldT' },
                { text: 'CANTIDAD', style: 'center8BoldT' },
                { text: 'FECHA', style: 'center8BoldT' },
                { text: '00:00 a 06:59', style: 'center8BoldT' },
                { text: '07:00 a 12:59', style: 'center8BoldT' },
                { text: '13:00 a 18:59', style: 'center8BoldT' },
                { text: '19:00 a 23:59', style: 'center8BoldT' },
            ],
        ]

        for (var i in datos.tabla_medicamentos.medicamento) {
            var obj_horas = {
                hora1: [],
                hora2: [],
                hora3: [],
                hora4: []
            }

            var horas = datos.tabla_medicamentos.horas[i]
            horas.forEach(el => {
                if (el.hora < 7) obj_horas.hora1.push(el.formato)
                else if (el.hora < 13) obj_horas.hora2.push(el.formato)
                else if (el.hora < 19) obj_horas.hora3.push(el.formato)
                else if (el.hora <= 23 && el.minutos) obj_horas.hora4.push(el.formato)

            })

            col.push(
                [
                    { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i] + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                    { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                    { text: datos.tabla_medicamentos.año[i] + '/' + datos.tabla_medicamentos.mes[i] + '/' + datos.tabla_medicamentos.dia[i], style: 'center8' },
                    { text: obj_horas.hora1.join('\n'), style: 'center8' },
                    { text: obj_horas.hora2.join('\n'), style: 'center8' },
                    { text: obj_horas.hora3.join('\n'), style: 'center8' },
                    { text: obj_horas.hora4.join('\n'), style: 'center8' },
                ],
            )
        }


        col.push(
            [
                { text: 'OBSERVACIONES', style: 'center8BoldT' },
                { text: '', style: 'center8BoldT' },
                { text: '', style: 'center8BoldT' },
                { text: '', style: 'center8BoldT' },
                { text: '', style: 'center8BoldT' },
                { text: '', style: 'center8BoldT' },
                { text: '', style: 'center8BoldT' },
            ],
        )

        for (var i in datos.tabla_medicamentos.medicamento) {
            for (var j in datos.tabla_medicamentos.horas[i]) {

                if (datos.tabla_medicamentos.observaciones[i][j].trim() != "") {
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.año[i] + '/' + datos.tabla_medicamentos.mes[i] + '/' + datos.tabla_medicamentos.dia[i] + ' ' + datos.tabla_medicamentos.horas[i][j].hora + ':' + datos.tabla_medicamentos.horas[i][j].minutos + ' ' + datos.tabla_medicamentos.oper[i] + ' ' + datos.tabla_medicamentos.medicamento[i] + '\n\n' + datos.tabla_medicamentos.observaciones[i][j], style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                }

            }
        }

        return col
    }

    function llenarMedicoFirma() {
        var col = [
            [
                { text: 'OPERADORES', style: 'center8BoldT', colSpan: 2 }, {}
            ],
        ]

        for (var i in datos.firmas.firma) {
            col.push(
                [
                    {
                        stack: [
                            {
                                marginTop: 5,
                                columns: [{ text: 'OPER: ', style: 'left8', bold: true, width: '28%' }, { text: datos.firmas.oper[i] + '  ' + datos.firmas.medico[i], style: 'left8', width: '100%' }],
                            },
                            {
                                marginTop: 5,
                                columns: [{ text: 'REGISTRO No: ', style: 'left8', bold: true, width: '28%' }, { text: datos.firmas.reg_medico[i], style: 'left8', width: '82%' }],
                            }
                        ]
                    },
                    {
                        image: `firma${i}`, width: 130, height: 40
                    }
                ],
            )
        }

        return col
    }
}