function _imprimirCitologia_8002(datos) {

    formatoBaseImp_Hc.images = { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) };
    formatoBaseImp_Hc.pageMargins = [15, 155, 15, 30]
    formatoBaseImp_Hc.header = function (currentPage, pageCount, pageSize) {
        var width_page = pageSize.width - 70;

        return {
            margin: [15, 30, 15, 0],
            stack: [
                {
                    columns: [
                        {
                            margin: [7, -3, 0, 0],
                            stack: [
                                {
                                    image: 'logo',
                                    width: 80,
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
                                { text: datos.encabezado.descrip }
                            ],
                            width: '60%'
                        },
                        {
                            style: 'left10Bold',
                            text: 'PAG: ' + currentPage,
                            alignment: 'right',
                            marginRight: 15,
                            width: '20%',
                        }
                    ],
                },
                {
                    style: 'left8',
                    marginTop: 10,
                    table: {
                        widths: ['20%', '2%', '7%', '2%', '2%', '15%', '10%', '15%', '28%'],
                        body: [
                            [
                                { text: 'REMITIDO PARTICULAR', border: [false, false, false, false] },
                                { text: '', border: [true, true, true, true] },
                                { text: 'OTRO', border: [false, false, false, false] },
                                { text: '', border: [true, true, true, true] },
                                { text: '', border: [false, false, false, false] },
                                { text: 'FECHA DE TOMA:', border: [false, false, false, false] },
                                { text: datos.encabezado.fecha_toma, border: [false, false, false, false] },
                                { text: 'No. DE HISTORIA:', border: [false, false, false, false] },
                                { text: datos.encabezado.nro_historia, border: [false, false, false, false] }
                            ]
                        ]
                    },
                },
                {
                    style: 'left6',
                    marginTop: 5,
                    table: {
                        widths: ['5%', '35%', '38%', '22%'],
                        body: [
                            [
                                {image: writeRotatedText(1, 'I-IDENTIFICA.'), fit:[11,90], rowSpan: 4, margin: [10,-35]},
                                {text: 'Nombres: ' + datos.paciente.nombre},
                                {text: 'Apellidos: ' + datos.paciente.apellidos},
                                {text: 'C.C: ' + datos.paciente.id},
                            ],
                            [
                                {},
                                {text: 'Fecha de nacimiento: ' + datos.paciente.fecha_nacimiento},
                                {text: 'Lugar: ' + datos.paciente.lugar},
                                {text: 'Edad: ' + datos.paciente.edad},
                            ],
                            [
                                {},
                                {text: 'E.P.S: ' + datos.paciente.eps},
                                {text: 'Direccion: ' + datos.paciente.direccion},
                                {text: 'Telefono: ' + datos.paciente.telefono},
                            ],
                            [
                                {},
                                {text: 'TIPO DE AFILIACION: ' + datos.paciente.tipo_afiliacion, colSpan: 3},
                                {},
                                {},
                            ],
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            if (i == 0 || i == 3 || i == 4 || i == 5) return 1;
                                else return 0;
                        },
                        vLineWidth: function (i, node) {
                            if (i == 0 || i == 1 || i == 4) return 1;
                                else return 0;
                        },
                    }
                },
            ]
        }
    },

        formatoBaseImp_Hc.content[0].stack.push(
            {
                margin: [0, 5, 0, 0],
                stack: [
                    {
                        stack: llenarFormato()
                    },
                ]
            }
        )
    // switch (datos.paciente.edad.substring(0, 1)) {
    //     case 'A': datos.AUX_EDAD = '  Años'; break;
    //     case 'M': datos.AUX_EDAD = '  Meses'; break;
    //     case 'D': datos.AUX_EDAD = '  Dias'; break;
    //     default: datos.AUX_EDAD = ''; break;
    // }
    // datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    function llenarFormato() {
        var col = [
            // {
            //     style: 'left6',
            //     table: {
            //         widths: ['5%', '35%', '38%', '22%'],
            //         body: [
            //             [
            //                 {image: writeRotatedText(1, 'I-IDENTIFICA.'), fit:[11,90], rowSpan: 4, margin: [10,-35]},
            //                 {text: 'Nombres: ' + datos.paciente.nombre},
            //                 {text: 'Apellidos: ' + datos.paciente.apellidos},
            //                 {text: 'C.C: ' + datos.paciente.id},
            //             ],
            //             [
            //                 {},
            //                 {text: 'Fecha de nacimiento: ' + datos.paciente.fecha_nacimiento},
            //                 {text: 'Lugar: ' + datos.paciente.lugar},
            //                 {text: 'Edad: ' + datos.paciente.edad},
            //             ],
            //             [
            //                 {},
            //                 {text: 'E.P.S: ' + datos.paciente.eps},
            //                 {text: 'Direccion: ' + datos.paciente.direccion},
            //                 {text: 'Telefono: ' + datos.paciente.telefono},
            //             ],
            //             [
            //                 {},
            //                 {text: 'TIPO DE AFILIACION: ' + datos.paciente.tipo_afiliacion, colSpan: 3},
            //                 {},
            //                 {},
            //             ],
            //         ]
            //     },
            //     layout: {
            //         hLineWidth: function (i, node) {
            //             if (i == 0 || i == 3 || i == 4 || i == 5) return 1;
            //                 else return 0;
            //         },
            //         vLineWidth: function (i, node) {
            //             if (i == 0 || i == 1 || i == 4) return 1;
            //                 else return 0;
            //         },
            //     }
            // },
            {
                style: 'left6',
                table: {
                    widths: ['5%', '95%'],
                    body: [
                        [
                            {image: writeRotatedText(1, 'II-ANTECEDENTES'), fit:[12,90], rowSpan: 7, margin: [5,30]},
                            {
                                style: 'left6',
                                table: {
                                    margin: [5,5,5,5],
                                    widths: ['20%', '3%', '2%', '3%', '2%', '10%', '2%', '18%', '5%', '5%', '7%'],
                                    body: [
                                        [
                                            {text: 'ESTA EMBARAZADA:', border: [false, false, false, false]},
                                            {text: 'SI', border: [false, false, false, false]},
                                            {text: datos.antecedentes.embarazo_si},
                                            {text: 'NO', border: [false, false, false, false]},
                                            {text: datos.antecedentes.embarazo_no},
                                            {text: 'NO SABE', border: [false, false, false, false]},
                                            {text: datos.antecedentes.embarazo_nose},
                                            {text: 'FUM', style: 'center6', border: [false, false, false, false]},
                                            {text: datos.antecedentes.dia_fum},
                                            {text: datos.antecedentes.mes_fum},
                                            {text: datos.antecedentes.ano_fum}
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['15%', '3%', '2%', '3%', '2%', '10%', '25%', '40%'],
                                    body: [
                                        [
                                            {text: 'PLANIFICA', border: [false, false, false, false]},
                                            {text: 'SI', border: [false, false, false, false]},
                                            {text: datos.antecedentes.planifica_si},
                                            {text: 'NO', border: [false, false, false, false]},
                                            {text: datos.antecedentes.planifica_no},
                                            {text: 'METODO:', border: [false, false, false, false]},
                                            {text: datos.antecedentes.metodo, colSpan: 2, border: [false, false, false, false]},
                                            {}
                                        ],
                                        [
                                            {text: 'ANTECEDENTE DE CANCER FAMILIARES:', colSpan: 6, border: [false, false, false, false] },
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {text: datos.antecedentes.cancer, colSpan: 2, border: [false, false, false, false] },
                                            {}
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['5%', '4%', '5%', '4%', '5%', '4%', '5%', '4%', '5%', '4%', '5%', '4%', '8%', '4%', '18%', '10%', '6%'],
                                    body: [
                                        [
                                            {text: 'G', border: [false, false, false, false]},
                                            {text: datos.antecedentes.gestaciones},
                                            {text: 'P', border: [false, false, false, false]},
                                            {text: datos.antecedentes.partos},
                                            {text: 'C', border: [false, false, false, false]},
                                            {text: datos.antecedentes.cesarias},
                                            {text: 'A', border: [false, false, false, false]},
                                            {text: datos.antecedentes.abortos},
                                            {text: 'M', border: [false, false, false, false]},
                                            {text: datos.antecedentes.nacidos_muertos},
                                            {text: 'V', border: [false, false, false, false]},
                                            {text: datos.antecedentes.nacidos_vivos},
                                            {text: 'I.T.S.', border: [false, false, false, false]},
                                            {text: datos.antecedentes.ets},
                                            {text: datos.antecedentes.ets2, colSpan: 3, border: [false, false, false, false]},
                                            {},
                                            {}
                                        ],
                                        [
                                            {text: 'CUAL?:', colSpan: 3, border: [false, false, false, false]},
                                            {},
                                            {},
                                            {text: datos.antecedentes.cual, colSpan: 14, border: [false, false, false, false]},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {},
                                            {}
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                border: [true, true, true, false],
                                style: 'left6',
                                table: {
                                    widths: ['27%', '4%', '4%', '6%', '14%', '29%', '6%', '3%', '2%', '3%', '2%'],
                                    body: [
                                        [
                                            {text: 'FECHA ULTIMA CITOLOGIA:', border: [false, false, false, false]},
                                            {text: datos.antecedentes.dia_ult_cito},
                                            {text: datos.antecedentes.mes_ult_cito},
                                            {text: datos.antecedentes.ano_ult_cito},
                                            {text: 'INSTITUCION:', border: [false, false, false, false]},
                                            {text: datos.antecedentes.institucion_ult_cito, border: [false, false, false, false] },
                                            {text: 'V.P.H:', border: [false, false, false, false]},
                                            {text: 'SI', border: [false, false, false, false]},
                                            {text: datos.antecedentes.vacunas_VPH_si},
                                            {text: 'NO', border: [false, false, false, false]},
                                            {text: datos.antecedentes.vacunas_VPH_no},
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                border: [true, false, true, false],
                                style: 'left6',
                                table: {
                                    widths: ['17%', '15%', '2%', '15%', '2%', '15%', '2%', '20%', '4%', '2%', '4%', '2%'],
                                    body: [
                                        [
                                            {text: 'RESULTADO', border: [false, false, false, false]},
                                            {text: 'NORMAL', border: [false, false, false, false], style: 'right6'},
                                            {text: datos.antecedentes.resultado_ult_cit_normal},
                                            {text: 'ANORMAL', border: [false, false, false, false], style: 'right6'},
                                            {text: datos.antecedentes.resultado_ult_cit_anormal},
                                            {text: 'NO SABE', border: [false, false, false, false], style: 'right6'},
                                            {text: datos.antecedentes.resultado_ult_cit_nose},
                                            {text: 'DISPAREUNIA:', border: [false, false, false, false], style: 'right6'},
                                            {text: 'SI', border: [false, false, false, false]},
                                            {text: datos.antecedentes.dispareunia_si},
                                            {text: 'NO', border: [false, false, false, false]},
                                            {text: datos.antecedentes.dispareunia_no},
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                border: [true, false, true, false],
                                style: 'left6',
                                table: {
                                    widths: ['43%', '3%', '2%', '3%', '2%', '10%', '2%', '10%', '25%'],
                                    body: [
                                        [
                                            {text: 'PROCEDIMIENTO EN EL CUELLO UTERINO', border: [false, false, false, false]},
                                            {text: 'SI', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_si},
                                            {text: 'NO', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_no},
                                            {text: 'NO SABE', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_nose},
                                            {text: 'FECHA:', border: [false, false, false, false]},
                                            {text: datos.antecedentes.fecha_proced_cuello, border: [false, false, false, false]}
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                border: [true, false, true, true],
                                style: 'left6',
                                table: {
                                    widths: ['41%', '17%', '2%', '17%', '2%', '17%', '2%'],
                                    body: [
                                        [
                                            {text: 'PROCEDIMIENTO EN EL CUELLO UTERINO', border: [false, false, false, false]},
                                            {text: 'CAUTERIZACION', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_cauterizacion},
                                            {text: 'CONIZACION', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_conizacion},
                                            {text: 'HISTERECTOMIA', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_histerectomia},
                                        ],
                                        [
                                            {text: '', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, false]},
                                            {text: 'BIOPSIA', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_biopsia},
                                            {text: 'DESCONOCE', border: [false, false, false, false]},
                                            {text: datos.antecedentes.proced_cuello_desconoce},
                                        ]
                                    ]
                                }
                            }
                        ]
                    ]
                }
            },
            {
                style: 'center6',
                marginTop: 5,
                table: {
                    widths: ['22%', '10%', '2%', '8%', '2%', '10%', '2%', '15%', '2%', '15%', '2%'],
                    body: [
                        [
                            {text: 'ASPECTOS DEL CUELLO', border: [false, false, false, false]},
                            {text: 'AUSENTE', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_ausente},
                            {text: 'SANO', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_sano},
                            {text: 'ARTROFICO', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_artrofico},
                            {text: 'CONGESTIVO', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_congestivo},
                            {text: 'SANGRANTE', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_sangrante},
                        ],
                    ]
                }
            },
            {
                style: 'center6',
                marginTop: 5,
                table: {
                    widths: ['20%', '25%', '2%', '8%', '2%', '15%', '2%', '15%', '2%'],
                    body: [
                        [
                            {text: '', border: [false, false, false, false]},
                            {text: 'EROSIONADO/ULCERADO',  border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_erosionado},
                            {text: 'POLIPO', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_polipo},
                            {text: 'LESION VISIBLE', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_lesionVisible},
                            {text: 'CUELLO INFLA', border: [false, false, false, false]},
                            {text: datos.antecedentes.aspecto_cuello_cuelloInfla},
                        ],
                    ]
                }
            },
            {
                style: 'left6',
                marginTop: 0,
                table: {
                    widths: ['40%', '60%'],
                    body: [
                        [
                            {text: 'CITOLOGIA TOMADA POR:', colSpan: 2, border: [false, false, false, false]},
                            {},
                        ],
                        [
                            {text: datos.antecedentes.descrip_prof, border: [false, false, false, true]},
                            {text: 'CARGO:  ' + datos.antecedentes.cargo, border: [false, false, false, false]},
                        ],
                    ]
                },
            },
            {
                style: 'left6',
                marginTop: 0,
                table: {
                    widths: ['15%', '85%'],
                    body: [
                        [
                            {text: 'OBSERVACIONES:', border: [false, false, false, false]},
                            {text: datos.antecedentes.observ_cit, border: [false, false, false, false]},
                        ],
                    ]
                },
            },
            {
                style: 'center6',
                marginTop: 0,
                table: {
                    widths: ['5%', '95%'],
                    body: [
                        [
                            {image: writeRotatedText(1, 'III-RESULTADOS'), fit:[11,90], rowSpan: 9, margin: [2,50]},
                            {
                                style: 'left6',
                                table: {
                                    
                                    widths: ['35%', '15%', '4%', '4%', '6%', '10%', '26%'],
                                    body: [
                                        [
                                            {text: 'LABORATORIO', border: [false, false, false, false], margin: [-2,-1,-2,-1]},
                                            {text: 'FECHA LECTURA', border: [false, false, false, false], margin: [-2,-1,-2,-1]},
                                            {},
                                            {},
                                            {},
                                            {text: 'No.PLACA', border: [false, false, false, false], margin: [-2,-1,-2,-1]},
                                            {}
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['3%', '49%', '3%', '45%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'NEGATIVO PARA LESION INTRA EPITELIAL O MALIGNIDAD', border: [false, false, false, false]},
                                            {},
                                            {text: 'POSITIVO ANORMALIDADES EN CELULAR EIPTELIALES', border: [false, false, false, false]},
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [
                                            {text: 'CALIDAD DE LA MUESTRA', style: 'center6', border: [false, false, false, false], margin: [-2,-5,-2,-5]},
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                border: [true, true, true, false],
                                style: 'left6',
                                table: {
                                    widths: ['3%', '97%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'SATISFACTORIA CELULAS ENDOCERVICALES / ZONA DE TRANSFORMACION PRESENTE', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'SATISFACTORIA CELULAS ENDOCERVICALES / ZONA TRANSFORMACION AUSENTE', border: [false, false, false, false]},
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                border: [true, false, true, true],
                                style: 'left6',
                                table: {
                                    widths: ['3%', '40%', '3%', '20%', '3%', '31%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'INSATISFACTORIA PARA EVALUACION', border: [false, false, false, false]},
                                            {},
                                            {text: 'SE PROCESA', border: [false, false, false, false]},
                                            {},
                                            {text: 'NO SE PROCESA', border: [false, false, false, false]}
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [
                                            {text: 'MICROORGANISMOS', style: 'center6', border: [false, false, false, false], margin: [-2,-5,-2,-5]},
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                border: [true, true, true, true],
                                table: {
                                    widths: ['3%', '49%', '3%', '45%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'TRICHOMONAS VAGINALES', border: [false, false, false, false]},
                                            {},
                                            {text: 'CAMBIOS COMPATIBLES CON HERPES SIMPLE', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'FLORA COMPATIBLE CON VAGINOSIS BACTERIANA', border: [false, false, false, false]},
                                            {},
                                            {text: 'BACTERIAS COMPATIBLES CON ACTNOMYCES SP', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'ELEMENTOS MICOTICOS COMPATIBLES CON CANDIDAD S.P', border: [false, false, false, false]},
                                            {},
                                            {text: 'NO SE OBSERVA FLORA PATOGENA', border: [false, false, false, false]},
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [
                                            {text: 'HALLAZGOS NO NEOPLACIDOS', style: 'center6', border: [false, false, false, false], margin: [-2,-5,-2,-5]},
                                        ]
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                border: [true, true, true, true],
                                table: {
                                    widths: ['3%', '49%', '3%', '45%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'CAMBIOS CELULARES REACTIVOS POR INFLAMACION', border: [false, false, false, false]},
                                            {},
                                            {text: 'CAMBIOS CELULARES REACTIVOS ASOCIADOS A DIU', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'CAMBIOS CELULARES REACTIVOS POR IRRADIACION', border: [false, false, false, false]},
                                            {},
                                            {text: 'CELULAS GLANDULARES (POST HISTERECTOMIA)', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'CAMBIOS CELULARES REACTIVOS POR ATROFIA', border: [false, false, false, false]},
                                            {},
                                            {text: 'CELULAS ENDOMETRIALES DESPUES DE LOS 40 AÑOS', border: [false, false, false, false]},
                                        ],
                                    ]
                                }
                            }
                        ],
                    ]
                }   
            },
            {
                marginTop: 3,
                unbreakable: true,
                table: {
                    widths: ['5%', '95%'],
                    body: [
                        [
                            {image: writeRotatedText(1, 'IV-INTERPRETACION'), fit:[12,90], rowSpan: 5, margin: [5,20]},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['3%', '49%', '3%', '45%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'ASC-US', border: [false, false, false, false]},
                                            {},
                                            {text: 'CARCINOMA ESCAMOCELULAR', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'LESION INTRA EPITELIAL DE ALTO GRADO NO EXCLUYE ASC-H', border: [false, false, false, false]},
                                            {},
                                            {text: 'LESION INTRA EPITELIAL DE BAJO GRADO (NIC - VPH)', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'LESION INTRA EPITELIAL DE ALTO GRADO (NIC II - NIC III - CA INSITU)', colSpan: 3, border: [false, false, false, false]},
                                            {},
                                            {},
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['3%', '48%', '3%', '45%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'ATIPIAS DE CELULAS ENDOCERVICALES SIN OTRO SIGNIFI.', border: [false, false, false, false]},
                                            {},
                                            {text: 'CELULAS ENDOMETRIALES SOSPECHOSAS DE NEOPLASIA', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'ATIPIAS DE CELULAS ENDOMENTRIALES SIN OTRO SIGNIFI.', border: [false, false, false, false]},
                                            {},
                                            {text: 'ADENOCARCINOMA ENDOCERVICAL IN-SITU', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'CELULAS ENDOCERVICALES SOSPECHOSAS DE NEOPLASIA', border: [false, false, false, false]},
                                            {},
                                            {text: 'ADENOCARCINOMA ENDOCERVICAL', border: [false, false, false, false]},
                                        ],
                                        [
                                            {},
                                            {text: 'ENDOMETRIAL', colSpan: 3, border: [false, false, false, false]},
                                            {},
                                            {},
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['3%', '54%', '3%', '40%'],
                                    body: [
                                        [
                                            {},
                                            {text: 'OTRAS NEOPLASIAS MALIGNAS', colSpan: 3, border: [false, false, false, false]},
                                            {},
                                            {},
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['15%', '85%'],
                                    body: [
                                        [
                                            {text: 'OBSERVACIONES:', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, true]}
                                        ],
                                        [
                                            {text: ' ', border: [false, false, false, true]},
                                            {text: ' ', border: [false, false, false, true]},
                                        ],
                                    ]
                                }
                            }
                        ],
                        [
                            {},
                            {
                                style: 'left6',
                                table: {
                                    widths: ['18%', '30%', '7%', '25%', '6%', '14%' ],
                                    body: [
                                        [
                                            {text: 'LEYO LA CITOLOGIA', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, true]},
                                            {text: 'CARGO', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, true]},
                                            {text: 'FECHA', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, true]}
                                        ],
                                        [
                                            {text: 'PRIMERA LECTURA', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, true]},
                                            {text: 'CARGO', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, true]},
                                            {text: 'FECHA', border: [false, false, false, false]},
                                            {text: '', border: [false, false, false, true]}
                                        ],
                                    ]
                                }
                            }
                        ],
                    ]
                }
            },
            {
                style: 'center6',
                marginTop: 0,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {text: datos.prox_cito.direcc_usu + '  ' + datos.prox_cito.tel_usu, border: [false, false, false, false]},
                        ],
                        [
                            {text: 'PROXIMA CITOLOGIA: ' + datos.prox_cito.fecha, border: [false, false, false, false]},
                        ],
                    ]
                },
            },
            {
                stack: [
                    datos.diagnos.bandera == true ? llenarDiagnos() : []
                ],
            },
            {
                stack: [
                    datos.analisis.bandera == true ? llenarAnalisis() : []
                ],
            },
            {
                marginTop: 5,
                style: 'left8',
                stack: [
                    [{text: 'TIPO DE DIAGNOSTICO:   ' + datos.tipoDiagnos.tipo}],
                    
                ],
            },
            {
                style: 'left8Bold',
                stack: [
                    [{text: 'SINTOMATICO RESPITARIO:   ' + datos.sinto.sintomatico_respi, marginTop: 5,}],
                    [{text: 'SINTOMATICO PIEL:   ' + datos.sinto.sintom_piel, marginTop: 5,}],
                    [{text: 'VICTIMA DE MALTRATO:   ' + datos.sinto.victima_maltrato, marginTop: 5,}],
                    [{text: 'VICTIMA DE VIOLENCIA:   ' + datos.sinto.victima_violencia, marginTop: 5,}],
                    [{text: 'ENFERMEDAD MENTAL:   ' + datos.sinto.enfermedad_mental, marginTop: 5,}],
                    [{text: 'ENFERMEDAD ITS:   ' + datos.sinto.enfermedad_its, marginTop: 5,}],
                    [{text: 'CANCER DE SENO:   ' + datos.sinto.cancer_seno, marginTop: 5,}],
                    [{text: 'CANCER DE CERVIX:   ' + datos.sinto.cancer_cervis, marginTop: 5,}],
                ],
            },
            {
                marginTop: 5,
                style: 'left10Bold',
                stack: [
                    [{text: 'CAUSA EXTERNA:'}],
                    
                ],
            },
            {
                marginTop: 5,
                style: 'left8',
                stack: [
                    [{text: datos.causa_externa.causa_ext}],
                ],
            },
            {
                style: 'left8',
                marginTop: 5,
                text: [
                    {text: 'CIERRE HISTORIA CLINICA    '},
                    {text: datos.cierre.descrip + '   '},
                    {text: datos.cierre.fecha},
                ],
            },
            // {
            //     stack: [
            //         datos.estado_salida.bandera == true ? llenarEstadoSalida() : []
            //     ],
            // },
            {
                style: 'center8',
                stack: llenarMedicoFirma()
            },
        ]
        
        return col
    }

    function llenarDiagnos() {
        var col = [
            [{ text: 'DIAGNOSTICO:', style: 'left10Bold' }],
        ]

        for (var i in datos.diagnos.cod_diag) {
            col.push(
                [{ text: datos.diagnos.cod_diag[i] + '  ' + datos.diagnos.nombre_enfer[i], style: 'left8', marginTop: 5 }],
            )
        }
        return col
    }

    function llenarAnalisis() {
        var col = [
            [{ text: 'ANALISIS:', style: 'left10Bold' }],
            [{ text: datos.analisis.analisis, style: 'left8' }]
        ]
        return col
    }

    // function llenarEstadoSalida() {
    //     var col = [
    //         {
    //             style: 'left8',
    //             marginTop: 2,
    //             text: [
    //                 { text: 'ESTADO SALIDA:    ' },
    //                 { text: datos.estado_salida.descrip + '   ' },
    //                 { text: datos.estado_salida.remitido },
    //             ],
    //         },
    //     ]
    //     return col
    // }

    function llenarMedicoFirma() {
        var col = [
            firmaImpresion_impHc(datos)
        ]

        return col
    }

    function writeRotatedText(lineas, text, text2, text3) {
        var ctx, canvas = document.createElement('canvas');
        switch (lineas) {
            case 1: canvas.width = 36; break;
            case 2: canvas.width = 100; break;
            case 3: canvas.width = 100; break;
        }
        canvas.height = 270;
        ctx = canvas.getContext('2d');
        console.log(canvas, ctx)
        ctx.font = 'bold 18pt Arial';
        ctx.save();
        ctx.translate(36, 270);
        ctx.rotate(-0.5 * Math.PI);
        ctx.fillStyle = '#000';

        switch (lineas) {
            case 1:
                ctx.fillText(text, 0, -5);
                break;
            case 2:
                ctx.fillText(text, 0, -20);
                ctx.fillText(text2, 0, 7);
                break;
            case 3:
                ctx.fillText(text, 0, -20);
                ctx.fillText(text2, 0, 7);
                ctx.fillText(text3, 0, 29);
                break;
        }

        ctx.restore();
        return canvas.toDataURL();
    };
}