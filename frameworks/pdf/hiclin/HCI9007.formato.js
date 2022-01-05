function _imprimirAutismo(datos) {
    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
        pageMargins: marginEncabezado_impHc(),
        header: encabezadoAperturas_impHc(datos),
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
                text: 'Por favor, rellene lo que su hijo hace habitualmente. Trate de responder a todas las preguntas. Si la conducta es poco frecuente (ej. la ha observado una o dos veces), responda "NO"', 
                style: 'left8', 
                alignment: 'justify' 
            },
            {
                marginTop: 5,
                style: 'center8',
                table: {
                    widths: ['90%', '5%', '5%'],
                    body: [
                        [{text: '1. Disfruta su hijo cuando se le balancea, se le hace saltar sobre sus rodillas?', style: 'left8'}, { text: datos.balan_salto_rodilla_9007 == 'S' ? 'SI' : '' }, { text: datos.balan_salto_rodilla_9007 == 'N' ? 'NO' : '' }],
                        [{text: '2. Muestra su hijo interes por otros niños?', style: 'left8'}, { text: datos.interes_otros_9007 == 'S' ? 'SI' : '' }, { text: datos.interes_otros_9007 == 'N' ? 'NO' : '' }],
                        [{text: '3. Le gusta a su hijo subirse a las cosas, como p.eje. las escaleras?', style: 'left8'}, { text: datos.subir_cosas_9007 == 'S' ? 'SI' : '' }, { text: datos.subir_cosas_9007 == 'N' ? 'NO' : '' }],
                        [{text: '4. Disfruta su hijo jugando a cucu-tras o al escondite?', style: 'left8'}, { text: datos.jugar_cucu_escondite_9007 == 'S' ? 'SI' : '' }, { text: datos.jugar_cucu_escondite_9007 == 'N' ? 'NO' : '' }],
                        [{text: '5. Su hijo simula alguna vez, por ejemplo, hablar por telefono o cuidar a las muñecas o imagina otra cosa?', style: 'left8'}, { text: datos.simula_tel_mune_9007 == 'S' ? 'SI' : '' }, { text: datos.simula_tel_mune_9007 == 'N' ? 'NO' : '' }],
                        [{text: '6. Utiliza su hijo alguna vez su dedo indice para señalar pidiendo algo? ', style: 'left8'}, { text: datos.senala_pedir_algo_9007 == 'S' ? 'SI' : '' }, { text: datos.senala_pedir_algo_9007 == 'N' ? 'NO' : '' }],
                        [{text: '7. Utiliza su hijo alguna vez su dedo indice para señalar mostrando su interes en algo? ', style: 'left8'}, { text: datos.senala_interes_algo_9007 == 'S' ? 'SI' : '' }, { text: datos.senala_interes_algo_9007 == 'N' ? 'NO' : '' }],
                        [{text: '8. Puede su hijo juguar apropiadamente con juguetes pequeños (ej. coches obloques) sin meterselos en la boca, toquearlos o tirarlos unicamente?', style: 'left8'}, { text: datos.juguetes_peque_boca_9007 == 'S' ? 'SI' : '', marginTop: 4 }, { text: datos.juguetes_peque_boca_9007 == 'N' ? 'NO' : '', marginTop: 4 }],
                        [{text: '9. Le acerca su hijo alguna vez objetos para enseñarselos?', style: 'left8'}, { text: datos.acerca_objetos_ensenar_9007 == 'S' ? 'SI' : '' }, { text: datos.acerca_objetos_ensenar_9007 == 'N' ? 'NO' : '' }],
                        [{text: '10. Le mira su hijo a los ojos durante mas de uno o dos segundos?', style: 'left8'}, { text: datos.mira_ojos_segundos_9007 == 'S' ? 'SI' : '' }, { text: datos.mira_ojos_segundos_9007 == 'N' ? 'NO' : '' }],
                        [{text: '11. Su hijo parece hipersensible a los ruidos?(ej. tapandose los oidos) ', style: 'left8'}, { text: datos.hipersensible_ruidos_9007 == 'S' ? 'SI' : '' }, { text: datos.hipersensible_ruidos_9007 == 'N' ? 'NO' : '' }],
                        [{text: '12. Responde su hijo con una sonrisa a su cara o a su sonrisa?', style: 'left8'}, { text: datos.responde_sonrisa_9007 == 'S' ? 'SI' : '' }, { text: datos.responde_sonrisa_9007 == 'N' ? 'NO' : '' }],
                        [{text: '13. Le imita su hijo? (ej. poner una cara que su hijo imita?)', style: 'left8'}, { text: datos.imita_9007 == 'S' ? 'SI' : '' }, { text: datos.imita_9007 == 'N' ? 'NO' : '' }],
                        [{text: '14. Su hijo responde cuando se le llama por su nombre?', style: 'left8'}, { text: datos.responde_nombre_9007 == 'S' ? 'SI' : '' }, { text: datos.responde_nombre_9007 == 'N' ? 'NO' : '' }],
                        [{text: '15. Si usted señala un juguete al otro lado de la habitacion su hijo lo mira?', style: 'left8'}, { text: datos.mira_juguete_9007 == 'S' ? 'SI' : '' }, { text: datos.mira_juguete_9007 == 'N' ? 'NO' : '' }],
                        [{text: '16. anda su hijo?', style: 'left8'}, { text: datos.anda_9007 == 'S' ? 'SI' : '' }, { text: datos.anda_9007 == 'N' ? 'NO' : '' }],
                        [{text: '17. Mira su hijo a las cosas que esta usted mirando?', style: 'left8'}, { text: datos.mira_cosas_9007 == 'S' ? 'SI' : '' }, { text: datos.mira_cosas_9007 == 'N' ? 'NO' : '' }],
                        [{text: '18. Hace su hijo movimientos raros con los dedos cerca de su propia cara? ', style: 'left8'}, { text: datos.movim_raros_dedos_cara_9007 == 'S' ? 'SI' : '' }, { text: datos.movim_raros_dedos_cara_9007 == 'N' ? 'NO' : '' }],
                        [{text: '19. Trata de atraer su hijo la atencion sobre su propia actividad?', style: 'left8'}, { text: datos.atrae_atencion_propia_9007 == 'S' ? 'SI' : '' }, { text: datos.atrae_atencion_propia_9007 == 'N' ? 'NO' : '' }],
                        [{text: '20. Alguna vez ha sospechado que su hijo era sordo?', style: 'left8'}, { text: datos.sospecha_sordo_9007 == 'S' ? 'SI' : '' }, { text: datos.sospecha_sordo_9007 == 'N' ? 'NO' : '' }],
                        [{text: '21. Entiende su hijo lo que dice la gente?', style: 'left8'}, { text: datos.entiende_gente_9007 == 'S' ? 'SI' : '' }, { text: datos.entiende_gente_9007 == 'N' ? 'NO' : '' }],
                        [{text: '22. Aveces su hijo se queda mirando fijamente al vacio o deambula sin ningun proposito?', style: 'left8'}, { text: datos.mirada_fija_deambula_9007 == 'S' ? 'SI' : '' }, { text: datos.mirada_fija_deambula_9007 == 'N' ? 'NO' : '' }],
                        [{text: '23. Mira su hijo a su cara para observar su reaccion cuando se enfrenta con algo desconocido?', style: 'left8'}, { text: datos.mira_cara_reaccion_des_9007 == 'S' ? 'SI' : '' }, { text: datos.mira_cara_reaccion_des_9007 == 'N' ? 'NO' : '' }],
                    ]
                }
            },
            { 
                marginTop: 10,
                style: 'center10Bold', 
                text: 'Instrucciones de corrección del M-CHAT',
            },
            { 
                marginTop: 5,
                style: 'left8',
                alignment: 'justify',
                text: [
                    {text: 'Un niño puntua negativamente en el cuestionario cuando no pasa de '},
                    {text: '2 o mas items criticos ', bold: true},
                    {text: 'O cuando no pasa '},
                    {text: '3 items cualquiera. ', bold: true},
                    {text: 'A continuacion se listan las respuestas que puntuan negativamente para cada uno de los items del M-CHAT. Las respuestas en negrita y mayuscula'},
                ], 
            },
            { 
                marginTop: 3,
                style: 'left8',
                alignment: 'justify',
                text: 'No todos los niños que puntuan negativamente en el cuestionario cumplen los criterios diagnosticos del espectro autista. Sin embargo, los niños que lo hacen deben ser evaluados de uan forma mas profunda por un especialista',
            },
            {
                marginTop: 10,
                style: 'left8',
                columns: [
                    {
                    },
                    {
                        table: {
                        widths: ['20%', '20%', '20%', '20%', '20%'],
                            body: [
                                [{text: '1. No'}, {text: '6. No'}, {text: '11. Si'}, {text: '16. No'}, {text: '21. No'}],
                                [{text: '2. No', bold: true }, {text: '7. No', bold: true}, {text: '12. No'}, {text: '17. No'}, {text: '22. Si'}],
                                [{text: '3. No'}, {text: '8. No'}, {text: '13. No', bold: true}, {text: '18. Si'}, {text: '23. No'}],
                                [{text: '4. No'}, {text: '9. No', bold: true}, {text: '14. No', bold: true}, {text: '19. No'}, {text: ''}],
                                [{text: '5. No'}, {text: '10. No'}, {text: '15. No', bold: true}, {text: '20. Si'}, {text: ''}]
                            ]
                        },
                        width: '33%'
                    },
                    {
                    }
                ],
            }
        ]
        
        return col
    }
}