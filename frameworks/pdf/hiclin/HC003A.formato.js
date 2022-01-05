function _imprimirHC003A(datos, callback) {

    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A': datos.AUX_EDAD = '  Años'; break;
        case 'M': datos.AUX_EDAD = '  Meses'; break;
        case 'D': datos.AUX_EDAD = '  Dias'; break;
        default: datos.AUX_EDAD = ''; break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) },
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
                marginTop: 0,
                table: {
                    widths: ['20%', '8%', '9%', '9%', '9%', '9%', '0%', '9%', '9%', '9%', '9%',],
                    headerRows: 0,
                    dontBreakRows: true,
                    body: llenarFormato(),
                },
            },
            {
                style: 'center8',
                stack: llenarMedicoFirma()
            }
        ],

        styles: estilosImpresion_impHc(),

    }

    function llenarFormato() {
        var col = [
                [
                    { text: 'MEDICAMENTO', style: 'center8BoldT' },
                    { text: 'CANTIDAD', style: 'center8BoldT' },
                    { text: '', style: 'center8BoldT' },
                    { text: datos.fechas.año1 + '/' + datos.fechas.mes1 + '/' + datos.fechas.dia1, style: 'center8BoldT' },
                    { text: '', style: 'center8BoldT' },
                    { text: '', style: 'center8BoldT' },
                    { text: '', border: [false, false, false, false] },
                    { text: '', style: 'center8BoldT' },
                    { text: datos.fechas.año2 + '/' + datos.fechas.mes2 + '/' + datos.fechas.dia2, style: 'center8BoldT' },
                    { text: '', style: 'center8BoldT' },
                    { text: '', style: 'center8BoldT' },
                ],
                [
                    { text: '', style: 'center8Bold' },
                    { text: '', style: 'center8Bold' },
                    { text: '00:00 a 06:59', style: 'center8Bold' },
                    { text: '07:00 a 12:59', style: 'center8Bold' },
                    { text: '13:00 a 18:59', style: 'center8Bold' },
                    { text: '19:00 a 23:59', style: 'center8Bold' },
                    { text: '', border: [false, false, false, false] },
                    { text: '00:00 a 06:59', style: 'center8Bold' },
                    { text: '07:00 a 12:59', style: 'center8Bold' },
                    { text: '13:00 a 18:59', style: 'center8Bold' },
                    { text: '19:00 a 23:59', style: 'center8Bold' },
                ],
            
            ]
            
            for (var i in datos.tabla_medicamentos.medicamento) {
                
                if (parseInt(datos.tabla_medicamentos.horas[i]) < 7 && datos.tabla_medicamentos.año[i] == datos.fechas.año1 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes1 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia1) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                } else if (parseInt(datos.tabla_medicamentos.horas[i]) < 13 && datos.tabla_medicamentos.año[i] == datos.fechas.año1 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes1 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia1) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: '', style: 'left8' },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                } else if (parseInt(datos.tabla_medicamentos.horas[i]) < 19 && datos.tabla_medicamentos.año[i] == datos.fechas.año1 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes1 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia1) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                } else if (parseInt(datos.tabla_medicamentos.horas[i]) <= 23 && parseInt(datos.tabla_medicamentos.minutos[i]) <= 59 && datos.tabla_medicamentos.año[i] == datos.fechas.año1 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes1 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia1) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                } else if (parseInt(datos.tabla_medicamentos.horas[i]) <= 7 && datos.tabla_medicamentos.año[i] == datos.fechas.año2 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes2 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia2) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                } else if (parseInt(datos.tabla_medicamentos.horas[i]) < 13 && datos.tabla_medicamentos.año[i] == datos.fechas.año2 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes2 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia2) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                } else if (parseInt(datos.tabla_medicamentos.horas[i]) < 19 && datos.tabla_medicamentos.año[i] == datos.fechas.año2 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes2 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia2) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                } else if (parseInt(datos.tabla_medicamentos.horas[i]) <= 23 && parseInt(datos.tabla_medicamentos.minutos[i]) <= 59 && datos.tabla_medicamentos.año[i] == datos.fechas.año2 && datos.tabla_medicamentos.mes[i] == datos.fechas.mes2 && datos.tabla_medicamentos.dia[i] == datos.fechas.dia2) {
                    
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.medicamento[i] + '\n' + datos.tabla_medicamentos.cantidad[i] + ' ' + datos.tabla_medicamentos.medida_cantidad[i] + '  ' + datos.tabla_medicamentos.tiempo[i]  + ' ' + datos.tabla_medicamentos.via[i], style: 'left8' },
                            { text: datos.tabla_medicamentos.cantidad_formu[i], style: 'center8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: datos.tabla_medicamentos.dato_tabla[i], style: 'left8' },
                        ],
                    )
                }
            }
            
            col.push(
                    [
                        { text: 'OBSERVACIONES', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'left8', border: [false, false, false, false] },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                        { text: '', style: 'center8BoldT' },
                    ],
                )
            
            for (var i in datos.tabla_medicamentos.medicamento) {

                if (datos.tabla_medicamentos.observaciones[i].trim() != "") {
                
                    col.push(
                        [
                            { text: datos.tabla_medicamentos.año[i] + '/' + datos.tabla_medicamentos.mes[i] + '/' + datos.tabla_medicamentos.dia[i] + ' ' + datos.tabla_medicamentos.horas[i] + ':' + datos.tabla_medicamentos.minutos[i] + ' ' + datos.tabla_medicamentos.oper[i] + ' ' + datos.tabla_medicamentos.medicamento[i] + '\n\n' + datos.tabla_medicamentos.observaciones[i], style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8', border: [false, false, false, false] },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                            { text: '', style: 'left8' },
                        ],
                    )
                    
                }
            }
            
        return col
    }

    function llenarMedicoFirma() {
        var col = [
            firmaImpresion_impHc(datos)
        ]

        return col
    }
}