async function _imprimirCitologia_8001(datos) {
    formatoBaseImp_Hc.images = { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) };
    formatoBaseImp_Hc.pageMargins = [35, 143, 35, 60];
    formatoBaseImp_Hc.header = encabezadoAperturas_impHc(datos);

    formatoBaseImp_Hc.content[0].stack.push({
        margin: [0, 5, 0, 0],
        stack: [{
            stack: llenarFormato()
        }, ]
    })

    function llenarFormato() {
        var col = [{
            width: '100%',
            stack: [{
                    style: 'left8',
                    table: {
                        widths: ['20%', '10%', '20%', '20%', '10%', '20%'],
                        body: [
                            [{ text: 'ANTECEDENTES FAMILIARES', style: 'center8BoldT', colSpan: 6 }, {}, {}, {}, {}, {}],
                            [{}, {}, { text: 'Parentesco', style: 'left8Bold' }, {}, {}, { text: 'Parentesco', style: 'left8Bold' }],
                            [{ text: 'Hipertensión:', style: 'left8Bold' }, { text: datos.dato_fam.hiper_fam }, { text: datos.dato_fam.paren_hiper_fam, style: 'left8' }, { text: 'Diabetes:', style: 'left8Bold' }, { text: datos.dato_fam.diabet_fam }, { text: datos.dato_fam.paren_diabet_fam, style: 'left8' }],
                            [{ text: 'Cardiopatias:', style: 'left8Bold' }, { text: datos.dato_fam.cardiopat_fam }, { text: datos.dato_fam.paren_cardiopat_fam, style: 'left8' }, { text: 'Cancer de cuello uterino:', style: 'left8Bold' }, { text: datos.dato_fam.can_cuell_fam }, { text: datos.dato_fam.paren_can_cuell_fam, style: 'left8' }],
                            [{ text: 'Cancer de mama:', style: 'left8Bold' }, { text: datos.dato_fam.can_mama_fam }, { text: datos.dato_fam.paren_can_mama_fam, style: 'left8' }, { text: 'Otro tipo de cancer:', style: 'left8Bold' }, { text: datos.dato_fam.otro_can_fam }, { text: datos.dato_fam.paren_otro_can_fam, style: 'left8' }]
                        ]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            if (i == 0 || i == 1 || i == 5 || i == 2) return 1;
                            else return 0;
                        },
                        vLineWidth: function(i, node) {
                            if (i == 0 || i == 6) return 1;
                            else return 0;
                        },
                    }
                },
                {
                    marginTop: 10,
                    style: 'left8',
                    table: {
                        widths: ['20%', '10%', '19%', '28%', '23%'],
                        body: [
                            [{ text: 'ANTECEDENTES PERSONALES', style: 'center8BoldT', colSpan: 5 }, {}, {}, {}, {}],
                            [{ text: 'Hipertensión:', style: 'left8Bold' }, { text: datos.dato_per.hiper_per }, {}, { text: 'Violencia de genero:', style: 'left8Bold' }, { text: datos.dato_per.viol_gen_per }],
                            [{ text: 'Diabetes:', style: 'left8Bold' }, { text: datos.dato_per.diabet_per }, {}, { text: 'Sangrados vaginales anormales:', style: 'left8Bold' }, { text: datos.dato_per.sangrado_vag_per }],
                            [{ text: 'Tumores:', style: 'left8Bold' }, { text: datos.dato_per.tumores_per }, {}, { text: 'Cirugia pelvica:', style: 'left8Bold' }, { text: datos.dato_per.cirug_pel_per }],
                            [{ text: 'Infecciones pelvicas:', style: 'left8Bold' }, { text: datos.dato_per.infec_pelvi_per }, {}, { text: 'Crioterapia:', style: 'left8Bold' }, { text: datos.dato_per.crioterapia_per }],
                            [{ text: 'Infeccion cervical:', style: 'left8Bold' }, { text: datos.dato_per.infec_celvi_per }, {}, { text: 'Radioterapia:', style: 'left8Bold' }, { text: datos.dato_per.radioterapia_per }],
                            [{ text: 'Flujo vaginal:', style: 'left8Bold' }, { text: datos.dato_per.flujo_vag_per }, {}, { text: 'Histerectomia:', style: 'left8Bold' }, { text: datos.dato_per.histerectomia_per }],
                            [{ text: 'Cancer de cuello:', style: 'left8Bold' }, { text: datos.dato_per.can_cuell_per }, {}, { text: 'Conizacion:', style: 'left8Bold' }, { text: datos.dato_per.conizacion_per }],
                            [{ text: 'Cancer de mama:', style: 'left8Bold' }, { text: datos.dato_per.can_mama_per }, {}, { text: 'Exeresis:', style: 'left8Bold' }, { text: datos.dato_per.exeresis_per }],
                            [{ text: 'Fuma:', style: 'left8Bold' }, { text: datos.dato_per.fuma_per }, {}, {}, {}],
                            [{ text: 'Otro:', style: 'left8Bold', }, { text: datos.dato_per.otros_antec_per, colSpan: 4, alignment: 'justify' }, {}, {}, {}]
                        ]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            if (i == 0 || i == 1 || i == 11) return 1;
                            else return 0;
                        },
                        vLineWidth: function(i, node) {
                            if (i == 0 || i == 5) return 1;
                            else return 0;
                        },
                    }
                },
                {
                    marginTop: 10,
                    style: 'center8',
                    table: {
                        widths: ['20%', '5%', '20%', '5%', '20%', '5%', '20%', '5%'],
                        body: [
                            [{ text: 'ANTECEDENTES GINECO-OBSTETRICOS', style: 'center8BoldT', colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
                            [{ text: 'Gestac. Previas:', style: 'left8Bold' }, { text: datos.gineco_esq_w.gestaciones_esq_w }, { text: 'Partos vaginales:', style: 'left8Bold' }, { text: datos.gineco_esq_w.partos_esq_w }, { text: 'Partos abdominales:', style: 'left8Bold' }, { text: datos.gineco_esq_w.cesareas_esq_w }, { text: 'Vivos:', style: 'left8Bold' }, { text: datos.gineco_esq_w.gine_vivos_esq_w }],
                            [{ text: 'Partos a Termino:', style: 'left8Bold' }, { text: datos.gineco_esq_w.partos_termino_esq_w }, { text: 'Partos prematuros:', style: 'left8Bold' }, { text: datos.gineco_esq_w.partos_prematuro_esq_w }, { text: 'Abortos:', style: 'left8Bold' }, { text: datos.gineco_esq_w.abortos_esq_w }, {}, {}],

                            [{ text: 'Edad inicio de relaciones sexuales:', style: 'left8Bold' }, { text: datos.dato_gineco.inicio_rel_sex }, { text: 'Esta embarazada:', style: 'left8Bold' }, { text: datos.embarazada }, { text: datos.embarazo, style: 'left8Bold', colSpan: 3 }, {}, {}, {}],
                            [{ text: 'Planifica:', style: 'left8Bold' }, { text: datos.dato_gineco.planifica }, { text: [{ text: 'Cual metodo:  ', style: 'left8Bold' }, { text: datos.metodo_planif, style: 'left8' }], colSpan: 5 }, {}, {}, {}, {}, {}],
                            [{ text: 'Lactancia materna:', style: 'left8Bold' }, { text: datos.obstetric_esq_w.lactancia_esq_w }, { text: 'Posparto:', style: 'left8Bold' }, { text: datos.dato_gineco.posparto }, { text: 'Menopausia:', style: 'left8Bold' }, { text: datos.dato_gineco.menopausia }, {}, {}],

                            [{ text: 'Fecha ultima menstruación:', style: 'left8Bold', colSpan: 2 }, {}, { text: _editFecha2(datos.gineco_esq_w.fecha_regla_esq_w), style: 'left8', colSpan: 2 }, {}, { text: 'Fecha ultima citologia:', style: 'left8Bold', colSpan: 2 }, {}, { text: _editFecha2(datos.gineco_esq_w.fecha_citol_esq_w), style: 'left8', colSpan: 2 }, {}],
                        ]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            if (i == 0 || i == 1 || i == 3 || i == 6 || i == 7) return 1;
                            else return 0;
                        },
                        vLineWidth: function(i, node) {
                            if (i == 0 || i == 8) return 1;
                            else return 0;
                        },
                    }
                },
                {
                    pageBreak: 'after',
                    marginTop: 10,
                    style: 'center8',
                    table: {
                        widths: ['18%', '14%', '13%', '7%', '23%', '25%'],
                        body: [
                            [{ text: 'ANTECEDENTES SOCIO-CULTURALES', style: 'center8BoldT', colSpan: 6 }, {}, {}, {}, {}, {}],
                            [{
                                columns: [
                                    { text: 'Recibe apoyo social:  ', style: 'left8Bold', width: '15%' }, { text: datos.dato_soc_cul.reci_apoy_social, style: 'left8', width: '5%' },
                                    { text: 'Cual:  ', style: 'left8Bold', width: '6%' }, { text: datos.dato_soc_cul.cual_apoy_social, style: 'left8', width: '74%' },
                                ],
                                colSpan: 6
                            }, {}, {}, {}, {}, {}],
                            [{ text: 'VIVIENDA', style: 'left8Bold', colSpan: 6 }, {}, {}, {}, {}, {}],
                            [{
                                columns: [
                                    { text: 'Propia:  ', style: 'left8Bold', width: '6%' }, { text: datos.dato_soc_cul.vivienda_propia, style: 'left8', width: '10%' },
                                    { text: 'Hacinamiento:  ', style: 'left8Bold', width: '11%' }, { text: datos.dato_soc_cul.vivienda_hacina, style: 'left8', width: '5%' },
                                    { text: 'Casa:  ', style: 'left8Bold', width: '6%' }, { text: datos.dato_soc_cul.casa, style: 'left8', width: '10%' },
                                    { text: 'Apto:  ', style: 'left8Bold', width: '6%' }, { text: datos.dato_soc_cul.apto, style: 'left8', width: '10%' },
                                    { text: 'Invasión:  ', style: 'left8Bold', width: '10%' }, { text: datos.dato_soc_cul.invasion, style: 'left8', width: '13%' },
                                    { text: 'Lote:  ', style: 'left8Bold', width: '6%' }, { text: datos.dato_soc_cul.lote, style: 'left8', width: '10%' },
                                ],
                                colSpan: 6
                            }, {}, {}, {}, {}, {}],
                            [{ text: 'ACTIVIDADES SOCIALES', style: 'left8Bold', colSpan: 6 }, {}, {}, {}, {}, {}],
                            [{
                                columns: [
                                    { text: 'Estudia actualmente:  ', style: 'left8Bold', width: '15%' }, { text: datos.dato_soc_cul.estudia_act, style: 'left8', width: '5%' },
                                    { text: 'Trabaja actualmente:  ', style: 'left8Bold', width: '15%' }, { text: datos.dato_soc_cul.trabaja_act, style: 'left8', width: '5%' },
                                    { text: 'En que trabaja:  ', style: 'left8Bold', width: '11%' }, { text: datos.dato_soc_cul.que_trabajo, style: 'left8', width: '49%' }
                                ],
                                colSpan: 6
                            }, {}, {}, {}, {}, {}],
                            [{
                                columns: [
                                    { text: 'Actividad fisica:  ', style: 'left8Bold', width: '12%' }, { text: datos.dato_soc_cul.actividad_fisica + '  Horas', style: 'left8', width: '8%' },
                                    { text: 'Actividad recreativa:  ', style: 'left8Bold', width: '15%' }, { text: datos.dato_soc_cul.actividad_recrea + '  Horas', style: 'left8', width: '8%' }
                                ],
                                colSpan: 6
                            }, {}, {}, {}, {}, {}],
                            [{ text: 'HABITOS', style: 'left8Bold', colSpan: 6 }, {}, {}, {}, {}, {}],
                            [{
                                columns: [
                                    { text: 'Alimentación adecuada:  ', style: 'left8Bold', width: '18%' }, { text: datos.dato_soc_cul.alimentacion_adec, style: 'left8', width: '5%' },
                                    { text: 'Cuantas por dia:  ', style: 'left8Bold', width: '12%' }, { text: datos.dato_soc_cul.cuantas_x_dia, style: 'left8', width: '5%' },
                                    { text: 'Cuantos con la familia:  ', style: 'left8Bold', width: '17%' }, { text: datos.dato_soc_cul.cuantas_con_famil, style: 'left8', width: '5%' },
                                    { text: 'Sueño normal:  ', style: 'left8Bold', width: '11%' }, { text: datos.dato_soc_cul.sueno_normal, style: 'left8', width: '5%' },
                                    { text: 'Cuantas horas por dia:  ', style: 'left8Bold', width: '17%' }, { text: datos.dato_soc_cul.horas_sueno, style: 'left8', width: '5%' }
                                ],
                                colSpan: 6
                            }, {}, {}, {}, {}, {}],
                            [{ text: 'CONSUMO DE SUSTANCIAS PSICOACTIVAS', style: 'left8Bold', colSpan: 6 }, {}, {}, {}, {}, {}],
                            [{
                                columns: [
                                    { text: 'Tabaco:  ', style: 'left8Bold', width: '13%' }, { text: datos.dato_soc_cul.tabaco, style: 'left8', width: '5%' },
                                    { text: 'Alcohol:  ', style: 'left8Bold', width: '7%' }, { text: datos.dato_soc_cul.alcohol, style: 'left8', width: '5%' },
                                ],
                                colSpan: 6
                            }, {}, {}, {}, {}, {}],
                            [{
                                columns: [
                                    { text: 'Otras sustancias:  ', style: 'left8Bold', width: '13%' }, { text: datos.dato_soc_cul.otras_sustacias, style: 'left8', width: '5%' },
                                    { text: 'Cuales:  ', style: 'left8Bold', width: '7%' }, { text: datos.dato_soc_cul.cual_sustacias, style: 'left8', width: '76%' },
                                ],
                                colSpan: 6
                            }, {}, {}, {}, {}, {}],
                        ]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            if (i == 0 || i == 1 || i == 2 || i == 4 || i == 7 || i == 9 || i == 12) return 1;
                            else return 0;
                        },
                        vLineWidth: function(i, node) {
                            if (i == 0 || i == 6) return 1;
                            else return 0;
                        },
                    }
                },
                {
                    marginTop: 10,
                    style: 'center8',
                    table: {
                        widths: ['15%', '10%', '75%'],
                        body: [
                            [{ text: 'ESPECULOSCOPIA', style: 'center8BoldT', colSpan: 3 }, {}, {}],
                            [{ text: 'Aspecto del cuello:', style: 'left8Bold' }, { text: datos.especuloscopia.aspecto_cuell }, { text: datos.especuloscopia.otro_aspecto, style: 'left8' }],
                        ]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            if (i == 0 || i == 1 || i == 2) return 1;
                            else return 0;
                        },
                        vLineWidth: function(i, node) {
                            if (i == 0 || i == 3) return 1;
                            else return 0;
                        },
                    }
                },
                {
                    marginTop: 10,
                    style: 'center8',
                    table: {
                        widths: ['26%', '74%'],
                        body: [
                            [{ text: 'RECEPCION Y ENTREGA DE RESULTADOS', style: 'center8BoldT', colSpan: 2 }, {}],
                            [{ text: 'I.P.S. que realiza la lectura:', style: 'left8Bold' }, { text: datos.recepcion_entrega.nombre_ips, style: 'left8' }],
                            [{ text: 'Fecha de entrega a la usuaria:', style: 'left8Bold' }, { text: _editFecha2(datos.recepcion_entrega.fecha_entrega), style: 'left8' }],
                            [{ text: 'Resultado:', style: 'left8Bold' }, { text: datos.recepcion_entrega.resultado, style: 'left8' }],
                            [{ text: 'Requiere atención del médico:', style: 'left8Bold' }, { text: datos.recepcion_entrega.aten_medico, style: 'left8' }],
                            [{ columns: [{ text: 'Educación:', style: 'left8Bold', width: '10%' }, { text: datos.recepcion_entrega.educacion, style: 'left8', width: '90%', alignment: 'justify' }], colSpan: 2 }, {}],
                            [{ columns: [{ text: 'Seguimiento:', style: 'left8Bold', width: '10%' }, { text: datos.recepcion_entrega.seguimiento, style: 'left8', width: '90%', alignment: 'justify' }], colSpan: 2 }, {}],
                            [{ columns: [{ text: 'Descripción:', style: 'left8Bold', width: '10%' }, { text: datos.recepcion_entrega.descripcion, style: 'left8', width: '90%', alignment: 'justify' }], colSpan: 2 }, {}],
                            [{ columns: [{ text: 'Fecha de consulta:', style: 'left8Bold', width: '15%' }, { text: _editFecha2(datos.recepcion_entrega.fecha_consulta), style: 'left8', width: '90%', alignment: 'justify' }], colSpan: 2 }, {}],

                            [{ columns: [{ text: 'Realizado por:', style: 'left8Bold', width: '15%' }, { text: datos.medico.id, style: 'left8', width: '15%' }, { text: datos.medico.nombre, style: 'left8', width: '30%' }], colSpan: 2 }, {}],
                        ]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            if (i == 0 || i == 1 || i == 5 || i == 9 || i == 10) return 1;
                            else return 0;
                        },
                        vLineWidth: function(i, node) {
                            if (i == 0 || i == 2) return 1;
                            else return 0;
                        },
                    }
                },
                {
                    stack: datos.control ? [{
                        marginTop: 10,
                        style: 'center8',
                        table: {
                            widths: ['21%', '79%'],
                            body: [
                                [{ text: 'CONTROL DE CITOLOGIA', style: 'center8BoldT', colSpan: 2 }, {}],
                                [{ columns: [{ text: 'Fecha toma citologia:', style: 'left8Bold', width: '16%' }, { text: datos.control.fecha_toma, style: 'left8', width: '36%' }, { text: 'Metodo de planificación actual:', style: 'left8Bold', width: '23%' }, { text: datos.metodo_planif, style: 'left8', width: '90%' }], colSpan: 2 }, {}],
                                [{ columns: [{ text: 'Fecha ultima citologia:', style: 'left8Bold', width: '16%' }, { text: datos.gineco_esq_w.fecha_citol_esq_w, style: 'left8', width: '90%' }], colSpan: 2 }, {}],

                                [{ columns: [{ text: 'Conducta de manejo:', style: 'left8Bold', width: '20%' }, { text: datos.control.conduc_manejo, style: 'left8', width: '80%', alignment: 'justify' }], colSpan: 2 }, {}],
                                [{ columns: [{ text: 'Aspecto genitales externos:', style: 'left8Bold', width: '20%' }, { text: datos.control.aspect_geni, style: 'left8', width: '80%', alignment: 'justify' }], colSpan: 2 }, {}],
                                [{ columns: [{ text: 'Flujo, Caracteristicas:', style: 'left8Bold', width: '20%' }, { text: datos.control.flujo_car, style: 'left8', width: '80%', alignment: 'justify' }], colSpan: 2 }, {}],
                                [{ columns: [{ text: 'Educacion prevencion ITS:', style: 'left8Bold', width: '20%' }, { text: datos.control.educa_prev, style: 'left8', width: '80%', alignment: 'justify' }], colSpan: 2 }, {}],

                                [{ columns: [{ text: 'Remisión a:', style: 'left8Bold', width: '10%' }, { text: datos.control.remision_cod, style: 'left8', width: '10%' }, { text: datos.control.nombre_espec, style: 'left8', width: '80%' }], colSpan: 2 }, {}],
                                [{ columns: [{ text: 'Cuando reclama resultado:', style: 'left8Bold', width: '20%' }, { text: datos.control.fecha_cuando, style: 'left8', width: '20%' }], colSpan: 2 }, {}],

                                [{ columns: [{ text: 'Observaciones:', style: 'left8Bold', width: '20%' }, { text: datos.control.observ_contr, style: 'left8', width: '80%', alignment: 'justify' }], colSpan: 2 }, {}],
                            ]
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if (i == 0 || i == 1 || i == 3 || i == 7 || i == 10) return 1;
                                else return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i == 0 || i == 2) return 1;
                                else return 0;
                            },
                        }
                    }] : []
                },
                {
                    style: 'left8',
                    marginTop: 10,
                    stack: llenarDiagnosticos()
                },
                {
                    style: 'left8',
                    marginTop: 10,
                    stack: [
                        { text: 'ANÁLISIS', style: 'left8Bold' },
                        { text: datos.analisis, marginLeft: 20 }
                    ]
                },
                {
                    style: 'left8',
                    marginTop: 10,
                    stack: [
                        { text: 'PLAN', style: 'left8Bold' },
                        { text: datos.plan, marginLeft: 20 }
                    ]
                },
                firmaImpresion_impHc(datos)
            ]
        }, ]

        return col
    }

    function llenarDiagnosticos() {
        var col = [
            { text: 'DIAGNOSTICOS', style: 'left8Bold' }
        ]

        for (var i in datos.diagnosticos) {
            col.push({ text: datos.diagnosticos[i], marginLeft: 20 })
        }

        return col
    }
}