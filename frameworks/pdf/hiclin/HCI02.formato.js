async function _imprimirHCI02(datos, resumido, opc_aper, hide_firma) {
    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A':
            datos.AUX_EDAD = '  Años';
            break;
        case 'M':
            datos.AUX_EDAD = '  Meses';
            break;
        case 'D':
            datos.AUX_EDAD = '  Dias';
            break;
        default:
            datos.AUX_EDAD = '';
            break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    // ************* LLENADO DE IMPRESION CON FORMATO BASE *******************

    formatoBaseImp_Hc.contador = parseInt(formatoBaseImp_Hc.contador) + 1;
    formatoBaseImp_Hc.codigo_barras[`barra${formatoBaseImp_Hc.contador}`] = { text: datos.codigoBarra.consec_barras, options: { width: 1, height: 40, fontSize: 10 } };
    formatoBaseImp_Hc.images[`firma${formatoBaseImp_Hc.contador}`] = rutaFirmas_impHc(datos.medico.firma);
    formatoBaseImp_Hc.images[`logo`] = rutaLogos_impHc($_USUA_GLOBAL[0].NIT);
    formatoBaseImp_Hc.pageMargins = formatoBaseImp_Hc.pageMargins == '' ? [35, 165, 35, 60] : formatoBaseImp_Hc.pageMargins;
    if (formatoBaseImp_Hc.header == '') formatoBaseImp_Hc.header = function(currentPage, pageCount, pageSize) {
        var width_page = pageSize.width - 70;

        return {
            margin: [35, 30, 35, 0],
            stack: [{
                    columns: [{
                            margin: [7, 0, 0, 0],
                            stack: [{
                                image: 'logo',
                                width: 75,
                                height: 45
                            }],
                            width: '20%'
                        },
                        {
                            style: 'center10Bold',
                            text: [
                                { text: datos.encabezado.nombre + '\n' },
                                { text: datos.encabezado.nit + '\n' },
                                { text: datos.encabezado.tipo + '\n' + datos.encabezado.unid_serv.trim() + '  ' + datos.encabezado.ambulatorio.trim() }
                            ],
                            width: '63%'
                        },
                        {
                            style: 'right10Bold',
                            stack: [
                                { text: !$_REG_HC.hidePage ? '' + 'PAG: ' + currentPage + ' de ' + pageCount : '' },
                                {
                                    stack: datos.original.bandera == true ? [{
                                        table: {
                                            widths: ['20%', '80%'],
                                            body: [
                                                [{ text: '', border: [false, false, false, false] }, { text: datos.original.descrip, alignment: 'center' }]
                                            ]
                                        }
                                    }] : [{}]
                                },
                                { text: '  ' },
                                { text: localStorage.Usuario + moment().format('  YYYY-MM-DD HH:mm'), fontSize: 7 },
                            ],
                            width: '17%'
                        }
                    ],
                },
                {
                    marginLeft: 7,
                    marginTop: 10,
                    stack: [{
                            columns: [
                                { text: 'FECHA:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.fecha + '  -  ' + datos.paciente.hora, style: 'left8', width: '43%' },
                                { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.tipoId + ' ' + datos.paciente.id, style: 'left8', width: '27%' },
                            ]
                        },
                        {
                            marginTop: 2,
                            columns: [
                                { text: 'PACIENTE:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.nombre, style: 'left8', width: '43%' },
                                { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                                { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                                { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                                { text: datos.paciente.sexo, style: 'left8', width: '8%' },
                            ]
                        },
                        {
                            marginTop: 2,
                            columns: [
                                { text: 'CIUDAD:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.ciudad, style: 'left8', width: '43%' },
                                { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.tel, style: 'left8', width: '27%' },
                            ]
                        },
                        {
                            marginTop: 2,
                            columns: [
                                { text: 'ACOMPAÑANTE:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.acompañante, style: 'left8', width: '43%' },
                                { text: 'FECHA NACIM:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.nacim, style: 'left8', width: '27%' },
                            ]
                        },
                        {
                            marginTop: 2,
                            columns: [
                                { text: 'FOLIO:', style: 'left8Bold', width: '6%' },
                                { text: datos.paciente.folio, style: 'left8', width: '10%' },
                                { text: 'FACTURA:', style: 'left8Bold', width: '8%' },
                                { text: datos.paciente.fact, style: 'left8', width: '34%' },
                                { text: 'REGIMEN:', style: 'left8Bold', width: '10%' },
                                { text: datos.paciente.regimen, style: 'left8', width: '32%' },
                            ]
                        },
                        {
                            marginTop: 2,
                            columns: [
                                { text: 'ENTIDAD:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.entidad, style: 'left8', width: '43%' },
                                { text: 'DIRECCION:', style: 'left8Bold', width: '15%' },
                                { text: datos.paciente.direccion, style: 'left8', width: '27%' },
                            ]
                        }
                    ],
                },
                {
                    canvas: [{
                        type: 'rect',
                        x: 0,
                        y: -70,
                        w: width_page,
                        h: 75,
                        r: 0,
                        lineWidth: 1,
                    }, ],
                },
            ]
        }
    }

    formatoBaseImp_Hc.content[0].stack.push({
        margin: [0, 2, 0, 0],
        stack: llenarFormato()
    })

    function llenarFormato() {
        console.log(datos);
        var col = [
            // {
            //     width: '100%',
            //     stack: resumido ? [{
            //         margin: opc_aper == 'S' ? [0, 5, 0, 5] : [0, 0, 0, 0],
            //         style: 'left7Bold',
            //         text: `${datos.paciente.fecha}  ${datos.paciente.hora}     evoluciono  ${datos.medico.nombre}         ${datos.medico.espec}        folio:  ${datos.paciente.folio}`
            //     }] : []
            // },
            {
                stack: localStorage.idOpciondata == '072' ? [] : llenarEncabezadoResumid()
            },
            // {
            //     text: datos.encabezado.unid_serv.trim() + '  ' + datos.encabezado.ambulatorio.trim(),
            //     style: 'center10Bold',
            // },
            {
                stack: datos.fechas.bandera == true ? llenarFechas() : [{}]
            },
            {
                // marginTop: 5,
                columns: [
                    { text: datos.tabla.subtitulo, style: 'left8', width: '50%' },
                ]
            },
            {
                stack: llenarSubs()
            },
            {
                stack: llenarCups()
            },
            {
                // marginTop: 5,
                stack: datos.analisis.titulo.trim() != '' ? [
                    { text: datos.analisis.titulo + '\n', style: 'left8Bold', marginTop: 5 },
                    { text: datos.analisis.contenido, style: 'left8', marginLeft: 20 }
                ] : []
            },
            {
                // marginTop: 5,
                stack: datos.plan.titulo.trim() != '' ? [
                    { text: datos.plan.titulo + '\n', style: 'left8Bold', marginTop: 5 },
                    { text: datos.plan.contenido, style: 'left8', marginLeft: 20 }
                ] : []
            },
            {
                // marginTop: 5,
                text: datos.tipoDiag.titulo.trim() != '' ? [
                    { text: datos.tipoDiag.titulo, style: 'left8Bold', marginTop: 5 },
                    { text: datos.tipoDiag.contenido, style: 'left8', marginLeft: 20 }
                ] : []
            },
            {
                stack: datos.diagnosticos.contenido != '' ? llenarDiagnosticos() : []
            },
            {
                stack: llenarPerinatal()
            },
            {
                stack: llenarCreatinina()
            },
            {
                stack: llenarRips()
            },
            {
                stack: datos.linea.bandera == true ? llenarLinea() : []
            },
            {
                stack: datos.sub.subtitul != '' ? [{
                    marginTop: 5,
                    columns: [
                        { text: datos.sub.subtitul, style: 'left10Bold', width: '50%' },
                    ]
                }] : []
            },
            {
                stack: datos.medicamentos.bandera ? [{
                    marginTop: 5,
                    table: {
                        widths: ['15%', '55%', '10%', '20%'],
                        headerRows: 0,
                        body: llenarTabla()
                    }
                }] : []
            },
            {
                stack: datos.historia.bandera == true ? llenarCampo() : []
            },
            {
                stack: datos.prof.bandera == true ? prof() : []
            },
            {
                stack: datos.signos.bandera == true ? llenarSignos() : []
            },
            {
                stack: datos.signos2.bandera == true ? llenarSignos2() : []
            },
            {
                stack: datos.diagFormula.bandera == true ? llenarDiagFormula() : [{}]
            },
            {
                stack: datos.codigoBarra.bandera == true ? llenarFirma() : [{}]
            },
            {
                stack: datos.medicamentos2.bandera == true ? llenarMedicamentos() : []
            },
            {
                // marginTop: 5,
                unbreakable: true,
                table: {
                    widths: ['8%', '15%', '10%', '10%', '57%'],
                    body: datos.interpretacion.bandera == true ? llenarInterpretacion() : [{}],
                },
            },
            {
                stack: datos.partograma.bandera == true ? registroParto() : [{}]
            },
            {
                stack: datos.partograma2.bandera == true ? partograma2() : [{}]
            },
            {
                stack: datos.partograma.bandera == true ? llenarPartograma() : [{}]
            },
            {
                stack: datos.observacion.bandera == true ? llenarObservacion() : [{}]
            },
            {
                stack: datos.covid.riesgos.bandera === true ? llenarRiesgosCovid() : []
            },
            {
                stack: hide_firma ? [] : llenarMedicoFirma()
            },
            {
                stack: datos.revision.bandera == true ? revision() : [{}]
            },
            {
                // stack: datos.mensaje.bandera == true ? mensaje() : [{}]
                stack: datos.mensaje.bandera == true && (datos.mensaje.mensaje1 != '' || datos.mensaje.mensaje2 != '') ? [{
                    marginTop: 5,
                    columns: [
                        { text: datos.mensaje.mensaje1, style: 'left8Bold' },
                        { text: datos.mensaje.mensaje2, style: 'left8Bold' },
                    ],
                }] : []
            },
            {
                stack: datos.vih.bandera == true ? asesoriaPrePosVih() : [{}]
            },
            {
                stack: datos.covid.recomendaciones.bandera == true ? llenarRecomendacionesCovid() : []
            },
        ]
        return col
    }

    function llenarEncabezadoResumid() {
        var col = [
            {
                width: '100%',
                stack: resumido ? [{
                    margin: opc_aper == 'S' ? [0, 5, 0, 5] : [0, 0, 0, 0],
                    style: 'left9Bold',
                    text: `${datos.paciente.fecha}  ${datos.paciente.hora}     evoluciono  ${datos.medico.nombre}         ${datos.medico.espec}        folio:  ${datos.paciente.folio}`
                }] : []
            },
        ]

        return col
    }

    function llenarTabla() {
        var col = [
            [{ text: 'TIPO', style: 'center8BoldT' }, { text: 'DESCRIPCION', style: 'center8BoldT' }, { text: 'DIAS TTO.', style: 'center8BoldT' }, { text: 'CANT.', style: 'center8BoldT' }],
        ]

        for (i in datos.medicamentos.tipo_formu) {
            if (datos.medicamentos.cod_soat[i] != '') {
                col.push(
                    [
                        { text: datos.medicamentos.tipo_formu[i], style: 'left8' },
                        { text: datos.medicamentos.cod_soat[i] + ' - ' + datos.medicamentos.descrip[i] + ' - ' + datos.medicamentos.cod_formu[i] + '\n' + datos.medicamentos.obser[i], style: 'left8' },
                        { text: datos.medicamentos.dias_trat[i], style: 'center8' },
                        // {text: datos.medicamentos.cantidad[i]+ ' ' + datos.medicamentos.dias[i] + '             ' + datos.medicamentos.manejo_formu[i] + '\n' + '(' + datos.medicamentos.num_text[i] + ')', style: 'left8'}],
                        { text: datos.medicamentos.cantidad[i] + ' ' + '(' + datos.medicamentos.num_text[i] + ')' + ' ' + datos.medicamentos.manejo_formu[i], style: 'left8' }
                    ],
                )
            } else {
                col.push(
                    [
                        { text: datos.medicamentos.tipo_formu[i], style: 'left8' },
                        { text: datos.medicamentos.descrip[i] + ' - ' + datos.medicamentos.cod_formu[i] + '\n' + datos.medicamentos.obser[i], style: 'left8' },
                        { text: datos.medicamentos.dias_trat[i], style: 'center8' },
                        // {text: datos.medicamentos.cantidad[i]+ ' ' + datos.medicamentos.dias[i] + '             ' + datos.medicamentos.manejo_formu[i] + '\n' + '(' + datos.medicamentos.num_text[i] + ')', style: 'left8'}],
                        { text: datos.medicamentos.cantidad[i] + ' ' + '(' + datos.medicamentos.num_text[i] + ')' + ' ' + datos.medicamentos.manejo_formu[i], style: 'left8' }
                    ],
                )
            }
        }

        return col
    }

    function llenarSubs() {
        var col = []

        for (var i in datos.subtitulos.titulo) {
            if (datos.subtitulos.titulo[i].trim() != '' || datos.subtitulos.contenido[i].trim() != '') {
                col.push({
                    marginTop: i == 0 ? 5 : 2,
                    text: [
                        { text: datos.subtitulos.titulo[i], style: 'left8Bold' },
                        { text: datos.subtitulos.contenido[i], style: 'left8' }
                    ]
                })
            }
        }

        return col
    }

    function llenarPerinatal() {
        var col = []

        for (var i in datos.perinatal.titulo) {
            col.push({
                marginTop: i == 0 ? 5 : 2,
                text: [
                    { text: datos.perinatal.titulo[i] + '  ', style: 'left8Bold' },
                    { text: datos.perinatal.contenido[i], style: 'left8' }
                ]
            })
        }

        return col
    }

    function llenarCreatinina() {
        var col = []

        for (var i in datos.creatinina.titulos) {
            col.push({
                marginTop: i == 0 ? 5 : 2,
                text: [
                    { text: datos.creatinina.titulos[i] + '  ', style: 'left8Bold' },
                    { text: datos.creatinina.contenido[i], style: 'left8' }
                ]
            })
        }

        return col
    }

    function llenarCups() {
        var col = []

        for (var i in datos.cups.titulo) {
            col.push({
                marginTop: i == 0 ? 5 : 2,
                text: [
                    { text: datos.cups.titulo[i], style: 'left8Bold' },
                    { text: datos.cups.contenido[i], style: 'left8' }
                ]
            })
        }

        return col
    }

    function llenarRips() {
        var col = []

        for (var i in datos.rips.titulo) {
            col.push({
                marginTop: i == 0 ? 5 : 2,
                text: [
                    { text: datos.rips.titulo[i], style: 'left8Bold' },
                    { text: datos.rips.contenido[i], style: 'left8' }
                ]
            })
        }

        return col
    }

    function llenarMedicamentos() {
        var col = [
            [{ text: 'FECHA', style: 'center8Bold' }, { text: 'HORA', style: 'center8Bold' }, { text: 'DESCRIPCION', style: 'center8Bold' }, { text: 'VIA', style: 'center8Bold' }, { text: 'UND.MEDIDA', style: 'center8Bold' }, { text: 'Dosis Sum.', style: 'center8Bold' }]
        ]

        for (i in datos.medicamentos2.fecha) {
            col.push(
                [{ text: datos.medicamentos2.fecha[i], style: 'left8' },
                    { text: datos.medicamentos2.hora[i] + ':' + datos.medicamentos2.min[i], style: 'center8' },
                    { text: datos.medicamentos2.descrip[i] + '\n\n' + 'Indicacion Medica: ' + datos.medicamentos2.dosis, style: 'left8' },
                    { text: datos.medicamentos2.via[i], style: 'left8' },
                    { text: datos.medicamentos2.medida[i], style: 'left8' },
                    { text: datos.medicamentos2.cantidad[i], style: 'left8' },
                ]
            )
        }

        var tabla = [{
            marginTop: 15,
            unbreakable: true,
            table: {
                widths: ['10%', '10%', '40%', '10%', '15%', '10%'],
                headerRows: 0,
                body: col
            },
            layout: 'lightHorizontalLines'
        }]

        return tabla
    }

    function registroParto() {
        var col = [{
            marginTop: 50,
            columns: [
                { text: 'Registro de partograma ', style: 'left8Bold' },
            ],
        }, ]
        return col
    }

    function partograma2() {
        var col = [{
            marginTop: 10,
            columns: [
                { text: 'Medico: ' + datos.partograma2.descrip_prof, style: 'left8', width: '40%' },
                { text: 'Paridad: ' + datos.partograma2.paridad, style: 'left8', width: '20%' },
                { text: 'Membranas: ' + datos.partograma2.membranas, style: 'left8', width: '20%' },
                { text: 'Estado: ' + datos.partograma2.estado, style: 'left8', width: '20%' },
            ],
        }, ]
        return col
    }

    function llenarPartograma() {
        var col = [{
            table: {
                widths: ['3%', '10%', '10%', '7%', '6%', '13%', '5%', '5%', '6%', '6%', '8%', '7%', '7%', '7%'],
                headerRows: 0,
                body: [
                    [
                        { text: '#', style: 'center8Bold' },
                        { text: 'Fecha Registro', style: 'center8Bold' },
                        { text: 'Fecha Atencion', style: 'center8Bold' },
                        { text: 'Ten.Art', style: 'center8Bold' },
                        { text: 'Pulso', style: 'center8Bold' },
                        { text: 'Pos.Materna', style: 'center8Bold' },
                        { text: 'Inten', style: 'center8Bold' },
                        { text: 'Dura.', style: 'center8Bold' },
                        { text: 'Dilata', style: 'center8Bold' },
                        {},
                        { text: 'Frc.Cont', style: 'center8Bold' },
                        { text: 'Borra', style: 'center8Bold' },
                        { text: 'Fcard.', style: 'center8Bold' },
                        { text: 'HODGE', style: 'center8Bold' },

                    ],
                    [
                        { text: datos.partograma.item, style: 'center6' },
                        { text: datos.partograma.dia_grab + '/' + datos.partograma.mes_grab + '/' + datos.partograma.ano_grab + ' ' + datos.partograma.hr_grab + ':' + datos.partograma.mn_grab, style: 'left6' },
                        { text: datos.partograma.dia_part + '/' + datos.partograma.mes_part + '/' + datos.partograma.ano_part + ' ' + datos.partograma.hr_part + ':' + datos.partograma.mn_part, style: 'left6' },
                        { text: datos.partograma.tension1_part + '/' + datos.partograma.tension2_part, style: 'center6' },
                        { text: datos.partograma.pulso_part, style: 'center6' },
                        { text: datos.partograma.posicion, style: 'left6' },
                        { text: datos.partograma.inten_contr, style: 'center6' },
                        { text: datos.partograma.dura_contr + ' seg', style: 'center6' },
                        { text: datos.partograma.dilata_part + ' cm', style: 'center6' },
                        {},
                        { text: datos.partograma.frecu_contr + ' /10min', style: 'center6' },
                        { text: datos.partograma.borramiento_part + '%', style: 'center6' },
                        { text: datos.partograma.fcard_fetal, style: 'center6' },
                        { text: datos.partograma.hodge_x, style: 'center6' },
                    ],
                ]
            },
            layout: {
                fillColor: function(rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                }
            }
        }, ]

        return col
    }

    function llenarObservacion() {
        var col = [{
            table: {
                widths: '100%',
                headerRows: 0,
                body: [
                    [
                        { border: [true, false, true, true], text: datos.observacion.obs1 + datos.observacion.obs3 + datos.observacion.obs3, style: 'left8' },
                    ]
                ],
            },
        }, ]
        return col
    }

    function llenarCampo() {
        var col = [{
            columns: [
                { text: datos.historia.diagnos1 + datos.historia.diagnos2, style: 'center8', width: '100%' },
            ],
        }, ]
        return col
    }

    function llenarSignos() {
        var fila = [
            [{ text: 'T.Arter', bold: true }, { text: 'T.Med', bold: true }, { text: 'Fr.Card', bold: true }, { text: 'Fr.Resp', bold: true }, { text: 'Tempe', bold: true }, { text: 'So2', bold: true }, { text: 'Pvc', bold: true }, { text: 'Peso', bold: true }, { text: 'Talla', bold: true }, { text: 'IMC', bold: true }, { text: 'Sp.Corp', bold: true }, { text: 'Per.Tor', bold: true }, { text: 'Per.Abdo', bold: true }, { text: 'Per.Muñ', bold: true }, { text: 'Glasgow', bold: true }],
        ]

        var x = []

        for (i in datos.signos.cont) {
            x.push({ text: datos.signos.cont[i] })
        }

        fila.push(x)

        var col = [{
                marginTop: 5,
                columns: [
                    { text: 'EXAMEN FISICO', style: 'left8Bold', width: '100%' },
                ],
            },
            {
                unbreakable: true,
                marginTop: 2,
                marginLeft: 5,
                style: 'left8',
                table: {
                    heights: [20, 20],
                    body: fila
                }
            }
        ]
        return col
    }

    function llenarLinea() {
        var col = [{
            columns: [
                { text: datos.linea.campo1, style: 'left8', width: '25%' },
                { text: datos.linea.campo2a + datos.linea.campo2b, style: 'left8', width: '75%' },
            ]
        }, ]
        return col
    }

    function revision() {
        var col = [{
                marginTop: 20,
                columns: [
                    { text: 'REVISION Y SEGUIMIENTO:', style: 'left8' },
                ],
            },
            {
                marginTop: 5,
                columns: [
                    { text: '1VEZ: ' + datos.revision.a1 + '  SEGUIMIENTO 1-1-3: ' + datos.revision.a2 + '  SEGUIMIENTO 1-1: ' + datos.revision.a3 + '  SEGUIMIENTO 3-3: ' + datos.revision.a4 + '  SEGUIMIENTO 1-3: ' + datos.revision.a7 + '  SEGUIMIENTO 1-3-3: ' + datos.revision.a8 + '  SEGUIMIENTO 1-5: ' + datos.revision.a9 + '  SEGUIMIENTO 1-5-5: ' + datos.revision.a0 + '  FUERA DE ESQUEMA: ' + datos.revision.a5 + '  CONTROL: ' + datos.revision.a6, style: 'left8' },
                ],
            },
        ]
        return col
    }

    function prof() {
        var col = [{
            columns: [
                { text: datos.prof.descrip_prof, style: 'left8Bold', width: '25%' },
                { text: 'ID: ' + datos.prof.id_prof, style: 'left8Bold', width: '15%' },
                { text: 'REG: ' + datos.prof.reg_med_prof, style: 'left8Bold', width: '15%' },
                { text: datos.prof.nombre_esp, style: 'left8Bold', width: '45%' }
            ]
        }, ]
        return col
    }

    function llenarSignos2() {
        var col = [{
            marginTop: 10,
            columns: [
                { text: 'Nota: Esta evolucion fue trasladada de otro folio por ' + datos.signos2.oper_tras + ' ' + datos.signos2.fecha_tras + ' datos origen: ' + datos.signos2.llave_paci_tras, style: 'left8Bold', width: '100%' },
            ],
        }, ]
        return col
    }

    function llenarFirma() {
        var col = [{
                margin: [0, 5, 0, 0],
                stack: [{
                    image: `barra${formatoBaseImp_Hc.contador}`,
                }],
            },
            {
                margin: [10, 5, 0, 0],
                columns: [
                    { text: 'NRO FORMULA ', style: 'left8', width: '13%' },
                    { text: datos.codigoBarra.consec_barras, style: 'left8Bold' },
                ],
            },
        ]
        return col
    }

    function llenarDiagFormula() {
        var col = [{
            margin: [0, 5, 0, 0],
            columns: [
                { text: 'Dx/  ' + datos.diagFormula.cod_diagn_1 + ' ' + datos.diagFormula.cod_diagn_2 + ' ' + datos.diagFormula.cod_diagn_3 + ' ' + datos.diagFormula.cod_diagn_4 + ' ' + datos.diagFormula.cod_diagn_5 + ' ' + datos.diagFormula.cod_diagn_6 + ' ' + datos.diagFormula.cod_diagn_7 + ' ' + datos.diagFormula.cod_diagn_8 + ' ' + datos.diagFormula.cod_diagn_9 + ' ' + datos.diagFormula.cod_diagn_10 + ' ' + datos.diagFormula.embar, style: 'left8' },
            ],
        }, ]
        return col
    }

    function llenarInterpretacion() {
        var col = [
            [{ text: 'INTERPRETACION', style: 'center8BoldT', colSpan: 5 }, { text: '', style: 'center8BoldT' }, { text: '', style: 'center8BoldT' }, { text: '', style: 'center8BoldT' }, { text: '', style: 'center8BoldT' }],
            [{ text: 'FECHA', style: 'center8Bold' }, { text: 'TIPO', style: 'center8Bold' }, { text: 'CODIGO', style: 'center8Bold' }, { text: 'RESULTADO', style: 'center8Bold' }, { text: 'DESCRIPCION', style: 'center8Bold' }],
        ]

        for (var i in datos.interpretacion.interp) {
            col.push(
                [
                    { text: datos.interpretacion.fecha_inter[i], style: 'left8' },
                    { text: datos.interpretacion.tipo_formu[i], style: 'left8' },
                    { text: datos.interpretacion.cod_formu[i], style: 'left8' },
                    { text: datos.interpretacion.interp[i], style: 'left8' },
                    { text: datos.interpretacion.interp_descrip[i], style: 'left8' },
                ],
            )
        }
        return col
    }

    function llenarMedicoFirma() {
        var firma = `firma${formatoBaseImp_Hc.contador}`;
        var col = [
            firmaImpresion_impHc(datos, firma)
        ]

        return col
    }

    function mensaje() {
        var col = [
            // {
            //     marginTop: 10,
            //     canvas: [{
            //         type: 'rect',
            //         x: 0,
            //         y: 0,
            //         w: 500,
            //         h: 0,
            //         r: 3,
            //         lineWidth: 1,
            //         lineColor: '#000',
            //     }, ],
            // },
            {
                marginTop: 5,
                columns: [
                    { text: datos.mensaje.mensaje1, style: 'left8Bold' },
                    { text: datos.mensaje.mensaje2, style: 'left8Bold' },
                ],
            },
        ]
        return col
    }

    function asesoriaPrePosVih() {
        var col = [{
                marginTop: 10,
                columns: [
                    { text: 'Asesoria Pre-test VIH:', style: 'left10Bold' },
                ],
            },
            {
                marginTop: 10,
                columns: [
                    { text: datos.vih.txt1, style: 'left8' },
                ],
            },
            {
                marginTop: 10,
                columns: [
                    { text: 'Asesoria Pos-test VIH:', style: 'left10Bold' },
                ],
            },
            {
                marginTop: 10,
                columns: [
                    { text: datos.vih.txt2, style: 'left8' },
                ],
            },
            // {
            //     marginTop: 20,
            //     canvas: [{
            //         type: 'rect',
            //         x: 0,
            //         y: 0,
            //         w: 500,
            //         h: 0,
            //         r: 3,
            //         lineWidth: 1,
            //         lineColor: '#000',
            //     }, ],
            // }
        ]
        return col
    }

    function llenarFechas() {
        var col = [{
                marginTop: 5,
                columns: [
                    { text: 'FECHA DE RECOLECCION DE MUESTRA : ' + datos.fechas.año_muestra + '/' + datos.fechas.mes_muestra + '/' + datos.fechas.dia_muestra, style: 'left8', width: '50%' },
                ]
            },
            {
                marginTop: 5,
                columns: [
                    { text: 'FECHA DEL RESULTADO : ' + '20' + datos.fechas.año_lect + '/' + datos.fechas.mes_lect + '/' + datos.fechas.dia_lect, style: 'left8', width: '50%' },
                ]
            },
        ]
        return col
    }

    function llenarDiagnosticos() {
        var col = [{
            marginTop: 5,
            text: datos.diagnosticos.titulos,
            style: 'left8Bold'
        }]

        for (i in datos.diagnosticos.contenido) {
            col.push({ marginLeft: 20, text: datos.diagnosticos.contenido[i], style: 'left8' })
        }

        return col
    }

    function llenarRiesgosCovid() {
        var col = [{
            unbreakable: true,
            marginTop: 10,
            stack: [
                { text: 'EVALUACIÓN DEL RIESGO COVID-19', style: 'left8Bold' },
                { text: 'Transito o viajo en los ultimos 14 dias por un pais o region con circulacion viral confirmada de COVID 19? ' + datos.covid.riesgos.transito, style: 'left8', marginTop: 3 },
                { text: 'En los ultimos 14 dias ha estado en contacto con alguna persona que haya sido diagnosticada con Coronavirus? ' + datos.covid.riesgos.contDiag, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Es personal de la salud u otro ambito hospitalario con contacto estrecho de caso confirmado o probable para Covid-19? ' + datos.covid.riesgos.contEstr, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Fiebre: ' + datos.covid.riesgos.fiebre, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Tos: ' + datos.covid.riesgos.tos, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Disnea: ' + datos.covid.riesgos.disnea, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Malestar general: ' + datos.covid.riesgos.general, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Rinorrea: ' + datos.covid.riesgos.rinorrea, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Odinofagia: ' + datos.covid.riesgos.odinofagia, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Ha viajado dentro del pais? ' + datos.covid.riesgos.pre1, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'A donde viajo? ' + datos.covid.riesgos.pre2, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Qué tiempo en dias duró ese viaje? ' + datos.covid.riesgos.pre3, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Ha viajado fuera del pais? ' + datos.covid.riesgos.pre4, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'A donde viajó? ' + datos.covid.riesgos.pre5, style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Qué tiempo en dias duró ese viaje? ' + datos.covid.riesgos.pre6, style: 'left8', marginTop: 2, alignment: 'justify' },
            ]
        }]

        return col
    }

    function llenarRecomendacionesCovid() {
        var col = [{
            unbreakable: true,
            marginTop: 10,
            stack: [
                { text: 'RECOMENDACIONES PARA COVID-19 (CORONAVIRUS)', style: 'center10Bold' },
                { text: 'Lávese las manos frecuentemente', style: 'left8Bold', marginTop: 3 },
                { text: 'Lávese las manos con frecuencia con agua y jabón y si dispone de un desinfectante de manos a base de alcohol. \n Por qué? Lavarse las manos con agua y jabón mata el virus si este esta en sus manos.', style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Adopte medidas de higiene respiratoria', style: 'left8Bold', marginTop: 3 },
                { text: 'Al toser o estornudar, cúbrase la boca y la nariz con el codo flexionado o con un pañuelo; tire el pañuelo inmediatamente y lávese las manos con agua y jabón. \n Por qué? Al cubrir la boca y la nariz durante la tos o el estornudo se evita la propagación de germenes y virus. Si usted estornuda o tose cubrindose con las manos puede contaminar los objetos o las personas a los que toque.', style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Mantenga el distanciamiento social', style: 'left8Bold', marginTop: 3 },
                { text: 'Mantenga al menos 1 metro (3 pies) de distancia entre usted y las demás personas, particularmente aquellas que tosan, estornuden y tengan fiebre. \n Por qué? Cuando alguien con una enfermedad respiratoria, como la infección por el COVID19, tose o estornuda, proyecta pequeñas gotículas que contienen el virus. Si esta demasiado cerca, puede inhalar el virus.', style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Evite tocarse los ojos, la nariz y la boca', style: 'left8Bold', marginTop: 3 },
                { text: 'Por qué? Las manos tocan muchas superficies que pueden estar contaminadas con el virus. Si se toca los ojos, la nariz o la boca con las manos contaminadas, puedes transferir el virus de la superficie a si mismo', style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Si tiene fiebre, tos y dificultad para respirar, solicite atención médica a tiempo', style: 'left8Bold', marginTop: 3 },
                { text: 'Indique a su prestador de atención de salud si ha viajado a una zona con presencia del virus COVID19, o si ha tenido un contacto cercano con alguien que haya viajado desde China, Europa entre otros y demás países donde este presente el virus y tenga síntomas respiratorios. \n Por qué? Siempre que tenga fiebre, tos y dificultad para respirar, es importante que busque atención médica de inmediato, ya que dichos sintomas pueden deberse a una infección respiratoria o a otra afección grave. Los síntomas respiratorios con fiebre pueden tener diversas causas, y dependiendo de sus antecedentes de viajes y circunstancias personales, el COVID19 podría ser una de ellas.', style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Mantengase informado y siga las recomendaciones de los Profesionales de Salud', style: 'left8Bold', marginTop: 3 },
                { text: 'Mantengase informado sobre las últimas novedades en relación con la COVID-19. Siga los consejos de su IPS de atención de salud, de las autoridades sanitarias pertinentes a nivel Nacional y Local o de su empleador sobre la forma de protegerse a sí mismo y a los demás ante la COVID-19. \n Por qué? Las autoridades Nacionales y Locales dispondrán de la información más actualizada acerca de si la COVID-19 se esta propagando en su zona. Son los interlocutores más indicados para dar consejos sobre las medidas que la población de su zona debe adoptar para protegerse.', style: 'left8', marginTop: 2, alignment: 'justify' },
                { text: 'Medidas de protección para las personas que se encuentran en zonas donde se est propagando la COVID-19 o que las han visitado recientemente (en los últimos 14 días)', style: 'left8Bold', marginTop: 3 },
                { text: '* Siga las orientaciones expuestas arriba. \n * Permanezca en casa si empieza a encontrarse mal, aunque se trate de síntomas leves como cefalea y rinorrea leve, hasta que se recupere. \n Por qué? Evitar los contactos con otras personas y las visitas a centros mdicos permitir que estos ultimos funcionen con mayor eficacia y ayudar a protegerle a usted y a otras personas de posibles infecciones por el virus de la COVID-19 u otros. \n * Si tiene fiebre, tos y dificultad para respirar, busque r pidamente asesoramiento mdico, ya que podría deberse a una infección respiratoria u otra afección grave. Llame con antelación e informe a su dispensador de atención de salud sobre cualquier viaje que haya realizado recientemente o cualquier contacto que haya mantenido con viajeros. Por qu? Llamar con antelación permitir que su dispensador de atención de salud le dirija r pidamente hacia el centro de salud adecuado. Esto ayudar tambin a prevenir la propagación del virus de la COVID-19 y otros virus', style: 'left8', marginTop: 2, alignment: 'justify' },
            ]
        }]

        return col
    }
}