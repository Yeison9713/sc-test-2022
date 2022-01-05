function _imprimirVale(datos) {
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
                marginTop: 5,
                style: 'center8',
                table: {
                    widths: ['15%', '75%', '5%', '5%'],
                    body: [
                        [{ text: 'RANGO DE EDAD', rowSpan: 2, marginTop: 7, style:'center8BoldT' }, { text: 'CONDICIONES PERINATALES Y POSNATALES', rowSpan: 2, marginTop: 7, style:'center8BoldT' }, { text: 'RESPUESTA', colSpan: 2, style:'center8BoldT'}, {}],
                        [{ text: '', style:'center8BoldT' }, { text: '', style:'center8BoldT' }, { text: 'SI', style:'center8BoldT' }, { text: 'NO', style:'center8BoldT' }],
                        [{ text: 'Menores de 2 años', bold: true, rowSpan: 3, marginTop: 14 }, { text: 'Bajo peso al nacer (menor de 1500gr)', style: 'left8' }, { text: datos.bajo_peso_nacer == 'S' ? 'X' : '', bold: true }, { text: datos.bajo_peso_nacer == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Nacio antes de las 30 semanas de gestacion(Prematuro extremo)', style: 'left8' }, { text: datos.naci_ant_30sem == 'S' ? 'X' : '', bold: true }, { text: datos.naci_ant_30sem == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Estancia superior a 30 dias en la unidad de cuidados intensivos neotales', style: 'left8' }, { text: datos.estanc_sup_3odias == 'S' ? 'X' : '', bold: true }, { text: datos.estanc_sup_3odias == 'N' ? 'X' : '', bold: true }],

                        [{ text: 'Todas las edades', bold: true, rowSpan: 4, marginTop: 35 }, { text: 'Antes durante o poco despues del nacimineto hubo alguna complicacion? (Escribir la descripcion del padre o acudiente):', style: 'left8' }, { text: datos.complic_proc_naci == 'S' ? 'X' : '', bold: true }, { text: datos.complic_proc_naci == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'El niño/niña ha sido diagnosticado(a) con alguna condicion de salud? cual diagnostico? (escribir el reporte del padre o acudiente) ', style: 'left8' }, { text: datos.diag_cond_salud == 'S' ? 'X' : '', bold: true }, { text: datos.diag_cond_salud == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Hay alguna condicion de riesgo social (maltrato, abandono, otras) en la que se encuentre el niño? (escribir el reporte del padre o acudiente)', style: 'left8' }, { text: datos.riesgo_social == 'S' ? 'X' : '', bold: true }, { text: datos.riesgo_social == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'El niño presenta dificultades en el aprendizaje de la lectura y la escritura o en su desempeño escolar? (escribir el reporte del padre o acudiente)', style: 'left8' }, { text: datos.dific_apren == 'S' ? 'X' : '', bold: true }, { text: datos.dific_apren == 'N' ? 'X' : '', bold: true }]
                    ]
                }
            },
            {
                marginTop: 5,
                style: 'center8',
                table: {
                    widths: ['15%', '45%', '10%', '10%', '10%', '10%'],
                    body: [
                        [{ text: 'RANGO DE EDAD', rowSpan: 2, marginTop: 7, style:'center8BoldT' }, { text: 'CONDICIONES ESTRUCTURALES', rowSpan: 2, marginTop: 7, style:'center8BoldT' }, { text: 'PRESENCIA', colSpan: 2, style:'center8BoldT' }, {}, { text: 'INTEGRIDAD', colSpan: 2, style:'center8BoldT' }, {}],
                        [{ text: '', style:'center8BoldT' }, { text: '', style:'center8BoldT' }, { text: 'SI', style:'center8BoldT' }, { text: 'NO', style:'center8BoldT' }, { text: 'SI', style:'center8BoldT' }, { text: 'NO', style:'center8BoldT' }],
                        [{ text: 'Todas las edades', bold: true, rowSpan: 9, marginTop: 54 }, { text: 'Orejas', style: 'left8' }, { text: datos.prese_orejas == 'S' ? 'X' : '', bold: true }, { text: datos.prese_orejas == 'N' ? 'X' : '', bold: true }, { text: datos.integ_orejas == 'S' ? 'X' : '', bold: true }, { text: datos.integ_orejas == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Labios', style: 'left8' }, { text: datos.prese_labios == 'S' ? 'X' : '', bold: true }, { text: datos.prese_labios == 'N' ? 'X' : '', bold: true }, { text: datos.integ_labios == 'S' ? 'X' : '', bold: true }, { text: datos.integ_labios == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Lengua', style: 'left8' }, { text: datos.prese_lengua == 'S' ? 'X' : '', bold: true }, { text: datos.prese_lengua == 'N' ? 'X' : '', bold: true }, { text: datos.integ_lengua == 'S' ? 'X' : '', bold: true }, { text: datos.integ_lengua == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Nariz', style: 'left8' }, { text: datos.prese_nariz == 'S' ? 'X' : '', bold: true }, { text: datos.prese_nariz == 'N' ? 'X' : '', bold: true }, { text: datos.integ_nariz == 'S' ? 'X' : '', bold: true }, { text: datos.integ_nariz == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Paladar', style: 'left8' }, { text: datos.prese_paladar == 'S' ? 'X' : '', bold: true }, { text: datos.prese_paladar == 'N' ? 'X' : '', bold: true }, { text: datos.integ_paladar == 'S' ? 'X' : '', bold: true }, { text: datos.integ_paladar == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Ojos', style: 'left8' }, { text: datos.prese_ojos == 'S' ? 'X' : '', bold: true }, { text: datos.prese_ojos == 'N' ? 'X' : '', bold: true }, { text: datos.integ_ojos == 'S' ? 'X' : '', bold: true }, { text: datos.integ_ojos == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Dientes (acorde a la edad)', style: 'left8' }, { text: datos.prese_dientes == 'S' ? 'X' : '', bold: true }, { text: datos.prese_dientes == 'N' ? 'X' : '', bold: true }, { text: datos.integ_dientes == 'S' ? 'X' : '', bold: true }, { text: datos.integ_dientes == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Cuello', style: 'left8' }, { text: datos.prese_cuello == 'S' ? 'X' : '', bold: true }, { text: datos.prese_cuello == 'N' ? 'X' : '', bold: true }, { text: datos.integ_cuello == 'S' ? 'X' : '', bold: true }, { text: datos.integ_cuello == 'N' ? 'X' : '', bold: true }],
                        [{}, { text: 'Hombros', style: 'left8' }, { text: datos.prese_hombros == 'S' ? 'X' : '', bold: true }, { text: datos.prese_hombros == 'N' ? 'X' : '', bold: true }, { text: datos.integ_hombros == 'S' ? 'X' : '', bold: true }, { text: datos.integ_hombros == 'N' ? 'X' : '', bold: true }],
                    ]
                }
            },
            {
                marginTop: 5,
                style: 'center8',
                table: {
                    widths: ['7%', '83%', '5%', '5%'],
                    heights: function (row) {
                        if (row == 0 || row == 1) {
                            return 10;
                        } else {
                            return 15;
                        }
                    },
                    body: [
                        [{ text: 'RANGO DE EDAD', rowSpan: 2, marginTop: 3, height: 15, style:'center8BoldT' }, { text: 'REPORTE DE PADRES', rowSpan: 2, marginTop: 7, style:'center8BoldT' }, { text: 'RESPUESTA', colSpan: 2, style:'center8BoldT' }, {}],
                        [{ text: '', style:'center8BoldT' }, { text: '', style:'center8BoldT' }, { text: 'SI', style:'center8BoldT' }, { text: 'NO', style:'center8BoldT' }],
                        [{ image: writeRotatedText(1, '0 A 3 MESES'), fit: [10, 90], rowSpan: 4, marginTop: -17 }, { text: 'C: Cuando en casa se cierra una puerta, se cae un objeto o se escucha un ruido muy fuerte el bebe se mueve, se queda quieto o llora?', style: 'left8' }, { text: datos.bb_reaccio_ruido == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_reaccio_ruido == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: Usted siente diferencias en el llanto del bebe dependiendo si es por hambre, por sueño, porque esta mojado, o de mal humor?', style: 'left8' }, { text: datos.dif_llanto_bb == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.dif_llanto_bb == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El bebe succiona con fuerza el alimento u otros objetos?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.bb_succiona_fuerza == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_succiona_fuerza == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: Cuando le habla al bebe, el/ella la/lo mira?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.bb_reac_habla == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_reac_habla == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(1, '4 A 6 MESES'), fit: [10, 90], rowSpan: 3, marginTop: -25 }, { text: 'C: Cuando se escucha una puerta, timbre u otro sonido familiar el bebe voltea la cabeza buscando el sonido?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.bb_gira_cabez_ruido == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_gira_cabez_ruido == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: Cuando alguien le dice repeticiones de gestos y vocalizaciones como vocales "aaa", "eee" o silabas mamama o papapa el bebe intenta emitir sonidos similares?', style: 'left8' }, { text: datos.bb_repite_sonidos == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_repite_sonidos == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: Cuando interactua, juega, canta, habla con su bebe, el/ella hace sonidos o sonrie?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.bb_rie_con_juegos == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_rie_con_juegos == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(1, '7 A 9 MESES'), fit: [10, 90], rowSpan: 3, marginTop: -25 }, { text: 'C: Cuando usted le canta o le conversa el bebe muestra interes?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.bb_dem_int_canto_hab == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_dem_int_canto_hab == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: Cuando el bebe quiere algo, utiliza sonidos, silabas palabras o gestos para solicitarlo', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.bb_emit_sonido_pedi == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_emit_sonido_pedi == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: Cuando el bebe tiene alguna necesidad (por ejemplo, quiere algo, esta incomodo o tiene hambre), emite balbuceos, sonidos, señala o llora, para satisfacerla? ', style: 'left8' }, { text: datos.bb_emit_sonido_incom == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.bb_emit_sonido_incom == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                    ]
                }
            },
            {
                pageBreak: 'before',
                marginTop: 5,
                style: 'center8',
                table: {
                    widths: ['7%', '83%', '5%', '5%'],
                    heights: function (row) {
                        if (row == 0 || row == 1) {
                            return 10;
                        } else {
                            return 15;
                        }
                    },
                    body: [
                        [{ text: 'RANGO DE EDAD', rowSpan: 2, marginTop: 3, style:'center8BoldT' }, { text: 'REPORTE DE PADRES', rowSpan: 2, marginTop: 7, style:'center8BoldT' }, { text: 'RESPUESTA', colSpan: 2, style:'center8BoldT' }, {}],
                        [{ text: '', style:'center8BoldT' }, { text: '', style:'center8BoldT' }, { text: 'SI', style:'center8BoldT' }, { text: 'NO', style:'center8BoldT' }],

                        [{ image: writeRotatedText(1, '0 A 12 MESES'), fit: [10, 90], rowSpan: 4, marginTop: -17 }, { text: 'C: Cuando las personas le hablan, el niño/a les presta atencion?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_dem_aten_hablan == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_dem_aten_hablan == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: Cuando le dicen palabras nuevas, el niño/a trata de imitarlas?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_imit_palab_nuev == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_imit_palab_nuev == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a consume alimetos como papillas, jugos espesos, o galletas diariamente', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_cons_dif_alim == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_cons_dif_alim == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: Cuando el niño/a quiere algun objeto (por ejemplo, un juguete) lo señala y/o hace sonidos para obtenerlo?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_emit_sonido_pedi == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_emit_sonido_pedi == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(1, '13 A 15 MESES'), fit: [10, 90], rowSpan: 3, marginTop: -20 }, { text: 'C: Cuando usted le pide al niño/a que le muestre los ojos, la nariz, u otra parte del cuerpo (que el conozca) lo hace?', style: 'left8' }, { text: datos.nn_muest_part_cuerp == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_muest_part_cuerp == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a produce sonidos de animales o de objetos conocidos, por ejemplo, gato, vaca, telefeno, etc.?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_imit_sonido_anim == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_imit_sonido_anim == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niño/a toma y trae un objeto cuando quiere jugar con usted?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_toma_obj == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_toma_obj == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(1, '16 A 18 MESES'), fit: [10, 90], rowSpan: 3, marginTop: -20 }, { text: 'C: El niño/a ejecuta acciones u ordenes sencillas cuando alguien se las solicita? Por ejemplo: "donde esta la abuela".', style: 'left8' }, { text: datos.nn_eje_acc_basicas == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_eje_acc_basicas == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a dice el nombre de diferentes objetos cotidianos cuando se le pregunta "Que es esto?"', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_pronu_nomb_obj == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_pronu_nomb_obj == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niño/a pide cosas usando palabras, silabas o sonidos vocalicos?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_pide_obj_palb == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_pide_obj_palb == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(1, '19 A 24 MESES'), fit: [10, 90], rowSpan: 3, marginTop: -18 }, { text: 'C: El niño/a entiende y ejecuta ordenes? por ejemplo si le dicen: "Trae la cuchara de la cocina"', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_ejec_ordenes == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_ejec_ordenes == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a dice cada vez mas palabras, incluyendo: "Yo, mio, no, arriba, abajo" y nombres de objetos y acciones cotidianas?', style: 'left8' }, { text: datos.nn_pron_mas_palab == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_pron_mas_palab == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niño/a produce sonidos, silabas y palabras, acompañadas de gestos, señalamientos, miradas y entonaciones de habla cuando quiere interactuar con otros?', style: 'left8' }, { text: datos.nn_acomp_gest_habla == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_acomp_gest_habla == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(1, '25 A 36 MESES', 'SEGUNDA LIN'), fit: [10, 90], rowSpan: 4, marginTop: -10 }, { text: 'C: El niño/a utiliza palabras como "Mio, tuyo, suyo, etc."Cuando se le pregunta a quien pertenece algun objeto conocido, por ejemplo: "De quien es esta camisa, de quien es este muñeco?', style: 'left8' }, { text: datos.nn_uti_posesivos == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_uti_posesivos == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a se mueve, se emociona, canta, aplaude,cuando le ponen musica?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_exp_emoci_musica == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_exp_emoci_musica == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a muerde alimentos duros (por ejemplo, galletas) y los como sin atorarse?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_cons_alim_duros == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_cons_alim_duros == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niño/a se muestra interesado por comunicarse, por interactuar, conversar, y jugar con otros niños de su edad, en diferentes situaciones?', style: 'left8' }, { text: datos.nn_dem_int_jugar == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_dem_int_jugar == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(2, '3 AÑOS 1 MES,', '   A 4 AÑOS'), fit: [30, 100], rowSpan: 3, margin: [-10, -26] }, { text: 'C: En narraciones de hechos, cuentos o historias el niño/a responde a preguntas de Que, Como, Cuando, etc.?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_resp_preg_hist == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_resp_preg_hist == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a hace preguntas cuando se presenta una situacion nueva para el?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_cuest_situ_nuev == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_cuest_situ_nuev == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niño/a expresa sus sentimientos, pensamientos, emociones, ideas cuando interactua con personas cercanas?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_exp_sent_per_cer == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_exp_sent_per_cer == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(2, '4 AÑOS 1 MES,', '   A 5 AÑOS'), fit: [30, 100], rowSpan: 3, margin: [-10, -26] }, { text: 'C: El niño/a sabe y repite rondas, canciones, cuentos, historias cortas o fragmentos?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_sab_rep_canc == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_sab_rep_canc == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a habla utilizando frases de al menos cuatro palabras para contar hechos o expresar diferentes situaciones?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_exp_orac_4palb == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_exp_orac_4palb == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niños/a comprende y responde cuando las personas saludan, se despiden, dicen "gracias" o "por favor")', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_sal_desp == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_sal_desp == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(2, '5 AÑOS, 1 MES', '   A 9 AÑOS'), fit: [30, 100], rowSpan: 3, margin: [-10, -18] }, { text: 'C: El niño/a cumple con varias indicaciones que se le dan al mismo tiempo, por ejemplo, cuando usted le dice: "Primero te pones de pie, luego vas corriendo hasta la puerta y despues das dos golpes con la mano" o "Trae el caballito, ponlo en el corral y dale de comer"', style: 'left8' }, { text: datos.nn_ejec_acc_consec == 'S' ? 'X' : '', bold: true, margin: [0, 8, 0, 8] }, { text: datos.nn_ejec_acc_consec == 'N' ? 'X' : '', bold: true, margin: [0, 8, 0, 8] }],
                        [{}, { text: 'E: Cuando le niño/a habla o cuenta una historia se entiende claramente lo que dice y pronuncia bien todos los sonidos?', style: 'left8' }, { text: datos.nn_habla_claridad == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_habla_claridad == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niño/a sostiene conversaciones con familiares y no familiares para expresar opiniones e intentar convencer de sus ideas a los demas?', style: 'left8' }, { text: datos.nn_exp_opinion == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_exp_opinion == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                    ]
                }
            },
            {
                pageBreak: 'before',
                marginTop: 5,
                style: 'center8',
                table: {
                    widths: ['7%', '83%', '5%', '5%'],
                    heights: function (row) {
                        if (row == 0 || row == 1) {
                            return 10;
                        } else {
                            return 15;
                        }
                    },
                    body: [
                        [{ text: 'RANGO DE EDAD', rowSpan: 2, marginTop: 3, style:'center8BoldT' }, { text: 'REPORTE DE PADRES', rowSpan: 2, marginTop: 7, style:'center8BoldT' }, { text: 'RESPUESTA', colSpan: 2, style:'center8BoldT' }, {}],
                        [{ text: '', style:'center8BoldT' }, { text: '', style:'center8BoldT' }, { text: 'SI', style:'center8BoldT' }, { text: 'NO', style:'center8BoldT' }],

                        [{ image: writeRotatedText(3, '9 AÑOS 1 MES A', '      12 AÑOS', '     11 MESES'), fit: [30, 100], rowSpan: 3, margin: [-7, -20] }, { text: 'C: El niño/a identifica errores, se rie de errores e intenta corregirlos cuando alguien los dice, por ejemplos, "la pelota tiene patas" "por la noche me como el dayuno"?', style: 'left8' }, { text: datos.nn_ident_err_corri == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_ident_err_corri == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'E: El niño/a habla y explica el porque de diversas situaciones, sentimientos y pensamientos utilizando palabras abstractas como orgullo, valor, amar, etc.? ', style: 'left8' }, { text: datos.nn_uti_palb_abst == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_uti_palb_abst == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'I: El niño/a conversa con otros de diferentes temas, escuchando sus ideas y expresando con argumentos su acuerdo o desacuerdo?', style: 'left8' }, { text: datos.nn_exp_arg_acu_desc == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_exp_arg_acu_desc == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(2, '3 AÑOS A', '  5 AÑOS'), fit: [30, 100], rowSpan: 2, margin: [-7, -47] }, { text: 'V: El niño/a disfruta actividades de movimientos del cuerpo como columpiarse, giar, dar botes, saltar?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_disf_act_fis == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_disf_act_fis == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'V. El niño/a camina recto, sin inclinarse hacia los lados y sin caerse constantemente', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_camina_correct == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_camina_correct == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],

                        [{ image: writeRotatedText(3, '5 AÑOS 1 MES,', '   A 12 AÑOS', '   11 MESES'), fit: [30, 100], rowSpan: 3, margin: [-7, -28] }, { text: 'V. El niño/a disfruta dar algunas vueltas sobre si mismo, sin caerse?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_disf_vuelt_sin_caer == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_disf_vuelt_sin_caer == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'V. Cuando el niño/a se tropieza, o siente que se va a caer, pone las manos para protegerse?', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_protege_cae == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_protege_cae == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                        [{}, { text: 'V. El niño/a disfruta del movimiento en varias direcciones, velocidades y alturas? por ejemplo: subir al rodadero', style: 'left8', margin: [0, 3, 0, 3] }, { text: datos.nn_disf_juego_extre == 'S' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }, { text: datos.nn_disf_juego_extre == 'N' ? 'X' : '', bold: true, margin: [0, 3, 0, 3] }],
                    ]
                }
            },
            {
                marginTop: 20,
                style: 'center8',
                columns: [
                    {
                        table: {
                            body: [
                                [{ text: 'Items', style:'center8BoldT' }, { text: 'Numero de respuestas negativas', style:'center8BoldT' }],
                                [{ text: 'Comprension(C)' }, { text: datos.resp_neg_compren }],
                                [{ text: 'Exprension(E)' }, { text: datos.resp_neg_expres }],
                                [{ text: 'Interaccion(I)' }, { text: datos.resp_neg_interac }],
                                [{ text: 'Vestibular(V)' }, { text: datos.resp_neg_vesitb }],
                                [{ text: 'TOTAL', bold: true, alignment: 'right' }, { text: datos.total_resp_neg }],
                            ]
                        }
                    },
                    {
                        stack: [
                            { text: 'REMISION A EVALUACION DE PROCESOS DE HABLA Y LENGUAJE POR FONOADIOLOGIA, EVALUACION AUDIOLOGICA BASICA POR AUDIOLOGIA o SERVICIO DE URGENCIAS:', alignment: 'left', bold: true },
                            {
                                marginTop: 5,
                                columns: [
                                    { text: '', width: '5%' },
                                    { text: 'SI', bold: true, width: '20%', alignment: 'right', marginTop: 2, },
                                    { marginLeft: 5, alignment: 'left', width: '20%', canvas: datos.rem_eval == 'S' ? [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }, { type: 'line', x1: 0, x2: 20, y1: 15, y2: 0 }, { type: 'line', x1: 0, x2: 20, y1: 0, y2: 15 }] : [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }] },
                                    { text: 'NO', bold: true, width: '20%', alignment: 'right', marginTop: 2, },
                                    { marginLeft: 5, alignment: 'left', width: '20%', canvas: datos.rem_eval == 'N' ? [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }, { type: 'line', x1: 0, x2: 20, y1: 15, y2: 0 }, { type: 'line', x1: 0, x2: 20, y1: 0, y2: 15 }] : [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }] }
                                ]
                            },
                            { text: 'LA REMISION ES URGENTE?', bold: true, marginTop: 5 },
                            {
                                marginTop: 5,
                                columns: [
                                    { text: '', width: '5%' },
                                    { text: 'SI', bold: true, width: '20%', alignment: 'right', marginTop: 2, },
                                    { marginLeft: 5, alignment: 'left', width: '20%', canvas: datos.rem_urgent == 'S' ? [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }, { type: 'line', x1: 0, x2: 20, y1: 15, y2: 0 }, { type: 'line', x1: 0, x2: 20, y1: 0, y2: 15 }] : [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }] },
                                    { text: 'NO', bold: true, width: '20%', alignment: 'right', marginTop: 2, },
                                    { marginLeft: 5, alignment: 'left', width: '20%', canvas: datos.rem_urgent == 'N' ? [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }, { type: 'line', x1: 0, x2: 20, y1: 15, y2: 0 }, { type: 'line', x1: 0, x2: 20, y1: 0, y2: 15 }] : [{ type: 'rect', x: 0, y: 0, w: 20, h: 15 }] },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                marginTop: 10,
                text: datos.total_resp_neg > 0 ? 'INDICIO DE UNA ALTERACIÓN' : 'NO HAY ALTERACIÓN'
            }
        ]

        return col
    }


}