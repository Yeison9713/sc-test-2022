function _imprimirHerida(datos, callback) {
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
                table: {
                    widths: ['3.5%', '10%', '7.5%', '27.5%', '41%', '10.5%'],
                    headerRows: 0,
                    body: [
                        [{ text: 'NRO', style: 'center7BoldT' }, { text: 'VARIABLE', style: 'center7BoldT' }, { text: 'VALORES', style: 'center7BoldT' }, { text: 'SUB CATEGORIA', style: 'center7BoldT' }, { text: 'OBSERVACIONES', style: 'center7BoldT' }, { text: 'ACUMULADO', style: 'center7BoldT' }],
                        [{ text: '1', marginTop: 30, style: 'center6', rowSpan: 6, bold: true }, { text: 'Clasificación de la herida', style: 'center6', marginTop: 30, rowSpan: 6 }, { text: '1', style: 'center6', marginTop: 0 }, { text: 'Heridas agudas', style: 'left6' }, { text: 'POP Quirurgicas', style: 'left6' }, { text: datos.acumulado1, style: 'center6', rowSpan: 6, marginTop: 30 }],
                        [{}, {}, { text: '2', style: 'center6', marginTop: 0 }, { text: 'Heridas especiales', style: 'left6' }, { text: 'Por picaduras, mordeduras, armas cortopunsantes y de fuego', style: 'left6' }, {}],
                        [{}, {}, { text: '3', style: 'center6', marginTop: 20, rowSpan: 4 }, { text: 'Heridas crónicas', style: 'left6', rowSpan: 4, marginTop: 20 }, { text: 'Ostomias', style: 'left6' }, {}],
                        [{}, {}, {}, {}, { text: 'Escaras', style: 'left6' }, {}],
                        [{}, {}, {}, {}, { text: 'Ulceras por presion', style: 'left6' }, {}],
                        [{}, {}, {}, {}, { text: 'Ulceras tumorales / vasculares', style: 'left6' }, {}],

                        [{ text: '2', marginTop: 33, style: 'center6', rowSpan: 6, bold: true }, { text: 'Dimensión de la herida', style: 'center6', marginTop: 33, rowSpan: 6 }, { text: '0', style: 'center6', marginTop: 0 }, { text: '1.Superficie < 4 cm2', style: 'left6' }, { text: 'Seleccione el dato segun la(s) medicion(es) de la(s) herida(s) total, de la superficie corporal afectada', style: 'left6', rowSpan: 6, marginTop: 30 }, { text: datos.acumulado2, style: 'center6', rowSpan: 6, marginTop: 33 }],
                        [{}, {}, { text: '1', style: 'center6', marginTop: 0 }, { text: '2.Superficie = 4 - < 16 cm2', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '2', style: 'center6', marginTop: 0 }, { text: '3.Superficie = 16 - < 36 cm2', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '3', style: 'center6', marginTop: 0 }, { text: '4.Superficie = 36 - < 64 cm2', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '4', style: 'center6', marginTop: 0 }, { text: '5.Superficie = 64 - < 100 cm2', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '5', style: 'center6', marginTop: 0 }, { text: '6.Superficie = >= 100 cm2', style: 'left6' }, {}, {}],

                        [{ text: '3', marginTop: 33, style: 'center6', rowSpan: 5, bold: true }, { text: 'Profundidad / Tejidos afectados', style: 'center6', marginTop: 33, rowSpan: 5 }, { text: '0', style: 'center6', marginTop: 0 }, { text: 'Piel intacta o cicatrizada', style: 'left6' }, { text: 'Seleccione el dato segun la(s) medicion(es) de la(s) herida(s) total, de la superficie corporal afectada', style: 'left6', rowSpan: 5, marginTop: 42 }, { text: datos.acumulado3, style: 'center6', rowSpan: 5, marginTop: 45 }],
                        [{}, {}, { text: '1', style: 'center6', marginTop: 0 }, { text: 'Afectacion de la dermis-epidermis', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '2', style: 'center6', marginTop: 0 }, { text: 'Afectacion del tejido subcutaneo (tejido adiposo sin llegar a la fascia del musculo)', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '3', style: 'center6', marginTop: 0 }, { text: 'Afectacion del musculo', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '4', style: 'center6', marginTop: 0 }, { text: 'Afectacion del hueso y tejidos anexos. (tendones, ligamentos, capsula articular o escara negra que no permite ver los tejidos debajo de ella)', style: 'left6' }, {}, {}],

                        [{ text: '4', marginTop: 22, style: 'center6', rowSpan: 3, bold: true }, { text: 'Comorbilidad', style: 'center6', marginTop: 22, rowSpan: 3 }, { text: '0', style: 'center6', marginTop: 0 }, { text: 'Sin patologias asociadas', style: 'left6' }, { text: 'Seleccione el dato segun la(s) medicion(es) de la(s) herida(s) total, de la superficie corporal afectada', style: 'left6', rowSpan: 3, marginTop: 20 }, { text: datos.acumulado4, style: 'center6', rowSpan: 3, marginTop: 22 }],
                        [{}, {}, { text: '2', style: 'center6', marginTop: 5 }, { text: 'Con 1 patologia como Comorbilidad asociada', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '3', style: 'center6', marginTop: 5 }, { text: 'Con 2 patologias como Comorbilidad asociadas', style: 'left6' }, {}, {}],

                        [{ text: '5', marginTop: 22, style: 'center6', rowSpan: 4, bold: true }, { text: 'Estadio de la herida', style: 'center6', marginTop: 22, rowSpan: 4 }, { text: '1', style: 'center6', marginTop: 8 }, { text: 'Estadio I', style: 'left6', marginTop: 8 }, { text: 'Epidermis y dermis no destruidas. Eritema y piel intacta que se blanquea con la presion. En pacientes con la piel oscura se puede ver como edema, induracion, decoloracion y calor.', style: 'left6', marginTop: 0 }, { text: datos.acumulado5, style: 'center6', rowSpan: 4, marginTop: 22 }],
                        [{}, {}, { text: '2', style: 'center6', marginTop: 5 }, { text: 'Estadio II', style: 'left6' }, { text: 'Epidermis y/o dermis destruidas. Ulcera superficial que se presenta como una erosion, flictenas. Ulcera superficial que se presenta como una erosion, flictemas.', style: 'left6' }, {}],
                        [{}, {}, { text: '3', style: 'center6', marginTop: 5 }, { text: 'Estadio III', style: 'left6' }, { text: 'Destruccion de la epidermis, dermis y capa subcutanea que puede afectar la fascia subyacente pero no la atraviesa. La ulcera se presenta clinicamente como un crater profundo, generalmente con ligero exudado y con los margenes bien definidos.', style: 'left6' }, {}],
                        [{}, {}, { text: '3', style: 'center6', marginTop: 5 }, { text: 'Estadio IV', style: 'left6' }, { text: 'Perdida de todo el espesor cutaneo y destruccion extensa, necrosis fisular o afectacion del tejido muscular, oseo y estructuas de soporte (tendones y capsula articular). Tambien se pueden observar oquedades y trayectos fistulosos.', style: 'left6' }, {}],

                        [{ text: '6', marginTop: 5, style: 'center6', rowSpan: 2, bold: true }, { text: 'nfección', style: 'center6', marginTop: 5, rowSpan: 2 }, { text: '0', style: 'center6' }, { text: 'No evidencia signos de infeccion', style: 'left6' }, { text: 'Seleccione segun el examen fisico realizado a la herida', style: 'left6', rowSpan: 2, marginTop: 5 }, { text: datos.acumulado6, style: 'center6', rowSpan: 2, marginTop: 5 }],
                        [{}, {}, { text: '3', style: 'center6' }, { text: 'Si evidencia signos de infeccion', style: 'left6' }, {}, {}],

                        [{ text: '7', marginTop: 17, style: 'center6', rowSpan: 4, bold: true }, { text: 'Tiempo de evolucion en tratamiento con clinica de heridas', style: 'center6', rowSpan: 4, marginTop: 7 }, { text: '1', style: 'center6' }, { text: 'De 1 a 4 meses', style: 'left6' }, { text: 'Seleccion segun la antiguedad del paciente en el programa.', style: 'left6', rowSpan: 4, marginTop: 17 }, { text: datos.acumulado7, style: 'center6', rowSpan: 4, marginTop: 17 }],
                        [{}, {}, { text: '2', style: 'center6' }, { text: 'De 5 a 8 meses', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '3', style: 'center6' }, { text: 'De 9 a 12 meses', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '4', style: 'center6' }, { text: 'Mas de 12 meses', style: 'left6' }, {}, {}],

                        [{ text: '8', marginTop: 13, style: 'center6', rowSpan: 3, bold: true }, { text: 'Registro fotografico', style: 'center6', rowSpan: 3, marginTop: 10 }, { text: '1', style: 'center6' }, { text: 'Con evidente evolucion', style: 'left6' }, { text: 'Seleccione segun la evidencia del registro fotografico.', style: 'left6', rowSpan: 3, marginTop: 13 }, { text: datos.acumulado8, style: 'center6', rowSpan: 3, marginTop: 13 }],
                        [{}, {}, { text: '2', style: 'center6' }, { text: 'Evolucion estancada', style: 'left6' }, {}, {}],
                        [{}, {}, { text: '4', style: 'center6' }, { text: 'Con retroceso evidente en la evolucion', style: 'left6' }, {}, {}],

                        [{ text: 'PUNTAJE ACUMULADO PARA ASIGNACIÓN DE COMPLEJIDAD', style: 'center7Bold', colSpan: 5, marginLeft: 55 }, {}, {}, {}, {}, { text: datos.totalAcumulado, style: 'center8' }],
                    ]
                },
            },
            {
                table: {
                    widths: ['34%', '33%', '33%'],
                    headerRows: 0,
                    body: llenarEscala()
                },
            },
            {
                marginTop: 2,
                unbreakable: true,
                table: {
                    heights: [12, 15, 15, 15],
                    widths: ['70%', '30%'],
                    headerRows: 0,
                    body: [
                        [{ text: 'QUIEN REALIZA LA VALORACIÓN', style: 'center8BoldT', colSpan: 2 }, {}],
                        [
                            {
                                stack: [
                                    {
                                        marginTop: 5,
                                        columns: [{ text: 'NOMBRES Y APELLIDOS: ', style: 'left8', bold: true, width: '28%' }, { text: datos.medico.nombre.replace(/\s+/g, ' '), style: 'left8', width: '100%' }],
                                    },
                                    {
                                        marginTop: 5,
                                        columns: [{ text: 'ESPECIALIDAD: ', style: 'left8', bold: true, width: '28%' }, { text: datos.medico.espec, style: 'left8', width: '82%' }],
                                    },
                                    {
                                        marginTop: 5,
                                        columns: [{ text: 'REGISTRO No: ', style: 'left8', bold: true, width: '28%' }, { text: datos.medico.reg, style: 'left8', width: '82%' }],
                                    }
                                ]
                            },
                            {
                                image: 'firma', width: 130, height: 50
                            }
                        ]
                    ]
                },
            }
        ]

        return col
    }

    function llenarEscala() {
        var col = [
            [{ text: 'ESCALA DE ASIGNACIÓN DE PAQUETE DE TRATAMIENTO', style: 'center7BoldT', colSpan: 3 }, {}, {}],
            [{ text: 'Tipo paquete', style: 'center7Bold' }, { text: 'Puntaje minimo', style: 'center7Bold' }, { text: 'Puntaje maximo', style: 'center7Bold' }],
        ]

        if (datos.escala === 1) {
            col.push(
                [{ text: 'Paquete de Alta complejidad', style: 'center7Bold' }, { text: '23', style: 'center7Bold' }, { text: '30', style: 'center7Bold' }]
            )
        } else if (datos.escala === 2) {
            col.push(
                [{ text: 'Paquete de Mediana complejidad', style: 'center7Bold' }, { text: '13', style: 'center7Bold' }, { text: '22', style: 'center7Bold' }]
            )
        } else if (datos.escala === 3) {
            col.push(
                [{ text: 'Paquete de Baja complejidad', style: 'center7Bold' }, { text: '0', style: 'center7Bold' }, { text: '12', style: 'center7Bold' }]
            )
        }

        return col
    }
}