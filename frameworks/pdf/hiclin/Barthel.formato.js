function _imprimirBarthel(datos, callback) {
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
                text: 'Poblacion Diana: Hace referencia a la poblacion general. Se trata de un cuestionario heteroadministrado con 10 items tipo Escala. El rango de posibles valores del indice de Barthel esta entre 0 y 100, con intervalos de 5 puntos. A menor puntuacion, mas dependencia; y a mayor puntuacion, mas independencia. Ademas, el indice Barthel puede usarse asignando puntuaciones con intervalos de 1 punto entre las categorias - las posibles puntuaciones para las actividades son 0,1,2 o 3 puntos - resultando un rango global entre 0 y 20. Los puntos de corte sugeridos por algunos autores para facilitar la interpretacion son: ',
                alignment: 'justify',
                style: 'left8',
                fontSize: 8
            },
            {
                marginTop: 10,
                table: {
                    widths: ['19.5%', '80.5%'],
                    headerRows: 0,
                    body: [
                        [{text: 'RANGO GLOBAL', style: 'center8BoldT'}, {text: 'TIPO DE DEPENDENCIA', style: 'center8BoldT'}],
                        [{ text: '0-20', style: 'center8' }, { text: 'TOTAL', style: 'center8' }],
                        [{ text: '25-45', style: 'center8' }, { text: 'SEVERA', style: 'center8' }],
                        [{ text: '50-60', style: 'center8' }, { text: 'MODERADA', style: 'center8' }],
                        [{ text: '> 60', style: 'center8' }, { text: 'LEVE', style: 'center8' }],
                    ]
                },
            },
            {
                marginTop: 10,
                table: {
                    widths: ['20%', '9%', '14%', '57%'],
                    headerRows: 0,
                    body: [
                        [{ text: 'ACTIVIDAD', style: 'center8BoldT' }, { text: 'PUNTAJE', style: 'center8BoldT' }, { text: 'NIVEL', style: 'center8BoldT' }, { text: 'DESCRIPCIÓN', style: 'center8BoldT' }],
                        [{ text: 'COMER', marginTop: 40, style: 'center8', rowSpan: 3, bold: true }, { text: datos.tabla.comer.ind, style: 'center8', marginTop: 15 }, { text: 'Independiente', style: 'center8', marginTop: 15 }, { text: 'Capaz de utilizar cualquier instrumento necesario, capaz de desmenuzar la comida, extender la mantequilla, usar condimentos, etc, por si solo. Come en un tiempo razonable. La comida puede ser cocinada y servida por otra persona.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.comer.ayu, style: 'center8', marginTop: 5 }, { text: 'Necesita ayuda', style: 'center8', marginTop: 5 }, { text: 'Para cortar la carne o el pan, extender la mantequilla, etc, pero es capaz de comer solo.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.comer.dep, style: 'center8', marginTop: 5 }, { text: 'Dependiente', style: 'center8', marginTop: 5 }, { text: 'Para cortar la carne o el pan, extender la mantequilla, etc, pero es capaz de comer solo.', style: 'center8', alignment: 'justify' }],

                        [{ text: 'LAVARSE/BAÑARSE', marginTop: 15, style: 'center8', rowSpan: 2, bold: true }, { text: datos.tabla.lavarse.ind, style: 'center8', marginTop: 10 }, { text: 'Independiente', style: 'center8', marginTop: 10 }, { text: 'Capaz de lavarse entero, puede ser usando la ducha, la bañera o permaneciendo de pie y aplicando la esponja sobre todo el cuerpo. Incluye entrar y salir del baño. Puede realizarlo todo sin estar una persona presente.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.lavarse.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: 'Necesita alguna ayuda o supervision', style: 'center8', alignment: 'justify' }],

                        [{ text: 'VESTIRSE', marginTop: 25, style: 'center8', rowSpan: 3, bold: true }, { text: datos.tabla.vestirse.ind, style: 'center8', marginTop: 10 }, { text: 'Independiente', style: 'center8', marginTop: 10 }, { text: 'Capaz de poner y quitarse la ropa, atarse los zapatos, abrocharse los botones y colocarse otros complementos que precisa (por ejemplo braguero, corse, etc) sin ayuda.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.vestirse.ayu, style: 'center8' }, { text: 'Necesita ayuda', style: 'center8' }, { text: 'Pero realiza solo al menos la mitad de las tareas en un tiempo razonable. ', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.vestirse.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: '', style: 'center8', alignment: 'justify' }],

                        [{ text: 'ARREGLARSE', marginTop: 17, style: 'center8', rowSpan: 2, bold: true }, { text: datos.tabla.arreglarse.ind, style: 'center8', marginTop: 10 }, { text: 'Independiente', style: 'center8', marginTop: 10 }, { text: 'Realiza todas las actividades personales sin ninguna ayuda. Incluye lavarse cara y manos, peinarse, maquillarse, afeitarse y lavarse los dientes. Los complementos necesarios para ello pueden ser provistos por otra persona.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.arreglarse.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: 'Necesita alguna ayuda', style: 'center8', alignment: 'justify' }],

                        [{ text: 'DEPOSICION', marginTop: 27, style: 'center8', rowSpan: 3, bold: true }, { text: datos.tabla.deposicion.con, style: 'center8', marginTop: 5 }, { text: 'Continente', style: 'center8', marginTop: 5 }, { text: 'Ningun episodio de incontinencia. Si necesita enema o supositorios es capaz de administrarselos por si solo.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.deposicion.acc, style: 'center8', marginTop: 5 }, { text: 'Accidente ocasional', style: 'center8' }, { text: 'Menos de una vez por semana o necesita ayuda para enemas o supositorios.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.deposicion.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: 'Incluye administracion de enemas o supositorios por otro.', style: 'center8', alignment: 'justify' }],

                        [{ text: 'MICCION/VALORAR LA SITUACIÓN EN LA SEMANA PREVIA', marginTop: 15, style: 'center8', rowSpan: 3, bold: true }, { unbreakable: true, text: datos.tabla.miccion.con, style: 'center8', marginTop: 5 }, { unbreakable: true, text: 'Continente', style: 'center8', marginTop: 5 }, { unbreakable: true, text: 'Ningun episodio de incontinencia (seco dia y noche). Capaz de usar cualquier dispositivo. En paciente sondado, incluye poder cambiar la bolsa solo.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.miccion.acc, style: 'center8', marginTop: 5 }, { text: 'Accidente ocasional', style: 'center8' }, { text: 'Menos de una vez por semana o necesita ayuda para enemas o supositorios.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.miccion.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: 'Incluye administracion de enemas o supositorios por otro.', style: 'center8', alignment: 'justify' }],
                    ]
                },
            },
            {
                unbreakable: true,
                table: {
                    widths: ['20%', '9%', '14%', '57%'],
                    headerRows: 0,
                    body: [
                        [{ text: 'IR AL BAÑO', marginTop: 35, style: 'center8', rowSpan: 3, bold: true }, { text: datos.tabla.irBano.ind, style: 'center8', marginTop: 20 }, { text: 'Independiente', style: 'center8', marginTop: 20 }, { text: 'Entra y sale solo. Capaz de quitarse y ponerse la ropa, limpiarse, prevenir el manchado de la ropa y tirar de la cadena. Capaz de sentarse y levantarse de la taza sin ayuda (puede utilizar barras para soportarse). Si usa bacinilla (orinal, botella, etc) es capaz de utilizarla y vaciarla completamente sin ayuda y sin manchar.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.irBano.ayu, style: 'center8', marginTop: 5 }, { text: 'Necesita ayuda', style: 'center8', marginTop: 5 }, { text: 'Capaz de manejarse con pequeña ayuda en el equilibrio, quitarse y ponerse la ropa, pero puede limpiarse solo. Aun es capaz de utilizar el retrete.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.irBano.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: 'Incapaz de manejarse sin asistencia mayor.', style: 'center8', alignment: 'justify' }],

                        [{ text: 'TRASLADARSE DEL SILLON A LA CAMA', marginTop: 40, style: 'center8', rowSpan: 4, bold: true }, { text: datos.tabla.trasladarse.ind, style: 'center8', marginTop: 10 }, { text: 'Independiente', style: 'center8', marginTop: 10 }, { text: 'Sin ayuda en todas las fases. Si utiliza silla de ruedas se aproxima a la cama, frena, desplaza el apoya pies, cierra la silla, se coloca en posicion de sentado en un lado de la cama, se mete y tumba, y puede volver a la silla sin ayuda.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.trasladarse.min, style: 'center8', marginTop: 5 }, { text: 'Minima ayuda', style: 'center8', marginTop: 5 }, { text: 'Incluye supervision verbal o pequeña ayuda fisica, tal como la ofrecida por una persona no muy fuerte o sin entrenamiento.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.trasladarse.gra, style: 'center8', marginTop: 5 }, { text: 'Gran ayuda', style: 'center8', marginTop: 5 }, { text: 'Capaz de estar sentado sin ayuda, pero necesita mucha asistencia (persona fuerte o entrenada) para salir / entrar de la cama o desplazarse.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.trasladarse.dep, style: 'center8', marginTop: 5 }, { text: 'Dependiente', style: 'center8', marginTop: 5 }, { text: 'Necesita grua o completo alzamiento por dos personas. Incapaz de permanecer sentado.', style: 'center8', alignment: 'justify' }],

                        [{ text: 'DEAMBULACIÓN', marginTop: 45, style: 'center8', rowSpan: 4, bold: true }, { text: datos.tabla.deambulacion.ind, style: 'center8', marginTop: 15 }, { text: 'Independiente', style: 'center8', marginTop: 15 }, { text: 'Puede caminar al menos 50 metros o su equivalente en casa sin ayuda o supervision. La velocidad no es importante. Puede usar cualquier ayuda (bastones, muletas, etc...) excepto andador. Si utiliza protesis es capaz de ponerselo y quitarselo solo.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.deambulacion.ayu, style: 'center8', marginTop: 5 }, { text: 'Necesita ayuda', style: 'center8', marginTop: 5 }, { text: 'Supervision o pequeña ayuda fisica (persona no muy fuerte) para andar 50 metros. Incluye instrumentos o ayudas para permanecer de pie (andador).', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.deambulacion.sill, style: 'center8', marginTop: 5 }, { text: 'Independiente en silla de ruedas', style: 'center8', marginTop: 0 }, { text: 'En 50 metros. Debe ser capaz de desplazarse, atravesar puertas y doblar esquinas solo.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.deambulacion.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: 'Si utiliza silla de ruedas, precisa ser emplujado por otro.', style: 'center8', alignment: 'justify' }],

                        [{ text: 'SUBIR Y BAJAR ESCALERAS', marginTop: 15, style: 'center8', rowSpan: 3, bold: true }, { text: datos.tabla.escaleras.ind, style: 'center8', marginTop: 5 }, { text: 'Independiente', style: 'center8', marginTop: 5 }, { text: 'Capaz de subir y bajar un piso sin ayuda ni supervision. Puede utilizar el apoyo que precisa para andar (baston, muletas, etc) y el pasamanos.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.escaleras.ayu, style: 'center8' }, { text: 'Necesita ayuda', style: 'center8' }, { text: 'Supervision fisica o verbal.', style: 'center8', alignment: 'justify' }],
                        [{ text: '' }, { text: datos.tabla.escaleras.dep, style: 'center8' }, { text: 'Dependiente', style: 'center8' }, { text: 'Incapaz de salvar escalones. Necesita alzamiento (ascensor).', style: 'center8', alignment: 'justify' }],
                    ]
                },
            },
            {
                marginTop: 20,
                unbreakable: true,
                table: {
                    widths: ['19.5%', '24.5%', '56%'],
                    headerRows: 0,
                    body: [
                        [
                            {
                                columns: [{ text: 'FECHA: ', style: 'left8', bold: true, width: '35%' }, { text: datos.total.fecha, style: 'left8', width: '100%' }]
                            },
                            {
                                columns: [{ text: 'PUNTUACIÓN TOTAL: ', style: 'left8', bold: true, width: '75%' }, { text: datos.total.puntuacion, style: 'left8', width: '25%' }]
                            },
                            {
                                columns: [{ text: 'TIPO DE DEPENDENCIA: ', style: 'left8', bold: true, width: '35%' }, { text: datos.total.tipoDep, style: 'left8', width: '100%' }]
                            }
                        ]
                    ]
                },
            },
            firmaImpresion_impHc(datos)
        ]

        return col
    }
}