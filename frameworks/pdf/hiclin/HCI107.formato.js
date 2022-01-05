function _imprimirHCI107(datos, callback) {
    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A': datos.AUX_EDAD = '  Años'; break;
        case 'M': datos.AUX_EDAD = '  Meses'; break;
        case 'D': datos.AUX_EDAD = '  Dias'; break;
        default: datos.AUX_EDAD = ''; break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), foto: rutaLogos_impHc(datos.paciente.foto), firma: rutaFirmas_impHc(datos.medico.firma) },
        pageMargins: [35, 143, 35, 60],
        header: function (currentPage, pageCount, pageSize) {
            var width_page = pageSize.width - 70;

            return {
                margin: [35, 25, 35, 0],
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
                                style: 'center10Bold',
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
                        columns: [
                            {
                                stack: [
                                    {
                                        columns: [
                                            { text: 'FECHA INGRESO:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.fechaIng, style: 'left8', width: '43%' },
                                            { text: 'FECHA EGRESO:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.fechaEgr, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'PACIENTE:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.nombre.replace(/\�/g, "Ñ"), style: 'left8', width: '43%' },
                                            { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.tipoId + datos.paciente.id, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                                            { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                                            { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                                            { text: datos.paciente.sexo, style: 'left8', width: '8%' },
                                            { text: 'NACIM:', style: 'left8Bold', width: '8%' },
                                            { text: datos.paciente.nacim, style: 'left8', width: '20%' },
                                            { text: 'CIUDAD:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.ciudad, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'ENTIDAD:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.entidad, style: 'left8', width: '43%' },
                                            { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.telefono, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'ACOMPAÑANTE:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.acomp, style: 'left8', width: '43%' },
                                            { text: 'FOLIO:', style: 'left8Bold', width: '15%' },
                                            { text: datos.paciente.folio, style: 'left8', width: '27%' },
                                        ]
                                    },
                                ],
                                width: '88%'
                            },
                            {
                                width: '12%',
                                stack: [
                                    {
                                        image: 'foto',
                                        width: 50,
                                        height: 53
                                    }
                                ],
                            }
                        ],
                    },
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: -58,
                                w: width_page,
                                h: 60,
                                r: 0,
                                lineWidth: 1,
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
            {
                text: [
                    { text: datos.encabezarEpi.mes_epi + '. ' + datos.encabezarEpi.dia_epi + '/' + datos.encabezarEpi.año_epi + '  ' + datos.encabezarEpi.hora_epi + ':' + datos.encabezarEpi.minutos_epi + '  ' + datos.encabezarEpi.descrip + '  ' + datos.encabezarEpi.descrip_prof + '\n\n', style: 'left8', },
                    { text: 'Tipo:  ', style: 'left8Bold' },
                    { text: datos.procedimientos.tipo, style: 'left8' }
                ],
            },
            {
                text: [
                    { text: '\n Motivo:  ', style: 'left8Bold', },
                    { text: datos.procedimientos.motivo, style: 'left8', }
                ],
            },
            {
                stack: [
                    datos.procedimientos.banderaMacro == true ? llenarMacro() : []
                ],
            },
            {
                stack: [
                    datos.procedimientos.bandera_viaEpi == true ? llenarVia() : []
                ],
            },
            {
                stack: [
                    datos.analisis.bandera == true ? llenarAnalisis() : []
                ],
            },
            {
                stack: [
                    datos.plan.bandera == true ? llenarPlan() : []
                ],
            },
            {
                stack: [
                    datos.result_proced_diag.bandera == true ? llenarProcedResultDiag() : []
                ],
            },
            {
                style: 'center8',
                stack: llenarMedicoFirma()
            },
            {
                style: 'left8',
                marginTop: 10,
                text: [
                    { text: 'CIERRE HISTORIA CLINICA    ' },
                    { text: datos.cierre.oper_descrip + '   ' },
                    { text: datos.cierre.fecha },
                ],
            },
            {
                stack: [
                    datos.cierre.bandera_diagnosMuerte == true ? llenarDiagnosMuerte() : []
                ],
            },
            {
                stack: [
                    datos.cierre.bandera_diagnosEgre == true ? llenarDiagnosEgre() : []
                ],
            },
            {
                stack: [
                    datos.cierre.bandera_obser == true ? llenarObserv() : []
                ],
            },
            {
                stack: [
                    datos.estado_salida.bandera == true ? llenarEstadoSalida() : []
                ],
            },
        ]
        return col
    }

    function llenarMedicoFirma() {
        var col = [
            firmaImpresion_impHc(datos)
        ]

        return col
    }

    function llenarMacro() {
        var col = [
            {
                style: 'left8',
                marginTop: 10,
                text: [
                    { text: datos.procedimientos.detalle_macroEvo }
                ],
            },
        ]

        return col
    }

    function llenarVia() {
        var col = [
            {
                style: 'left8',
                marginTop: 10,
                text: [
                    { text: 'VIA DE ACCESO:  ' + datos.procedimientos.descripVia }
                ],
            },
        ]
        return col
    }

    function llenarAnalisis() {
        var col = [
            {
                style: 'left8',
                marginTop: 10,
                text: [
                    { text: 'ANALISIS: \n', style: 'left8Bold' },
                    { text: datos.analisis.reng_epi, style: 'left8', alignment: 'justify' }
                ],
            },
        ]
        return col
    }

    function llenarPlan() {
        var col = [
            {
                marginTop: 5,
                text: [
                    { text: 'PLAN: \n', style: 'left8Bold' },
                    { text: datos.plan.plan_epi, style: 'left8' }
                ],
            },
        ]
        return col
    }

    function llenarProcedResultDiag() {
        var col = [
            {
                marginTop: 5,
                text: [
                    { text: 'RESULTADOS PROCEDIMIENTOS DIAGNOSTICOS: \n', style: 'left8Bold' },
                    { text: datos.result_proced_diag.result_proced_diag_epi, style: 'left8' }
                ],
            },
        ]
        return col
    }

    function llenarDiagnosMuerte() {
        var col = [
        ]

        for (var i in datos.cierre.cod_diag_enf) {
            col.push(
                [{ text: datos.cierre.cod_diag_enf[i] + '  ' + datos.cierre.nombre_enfer[i], style: 'left8', marginTop: 5 }],
            )
        }
        return col
    }

    function llenarDiagnosEgre() {
        var col = [
        ]

        for (var i in datos.cierre.cod_diag_egre) {
            col.push(
                [{ text: datos.cierre.cod_diag_egre[i] + '  ' + datos.cierre.nombre_enfer_egre[i], style: 'left8', marginTop: 5 }],
            )
        }
        return col
    }

    function llenarObserv() {
        var col = [
            {
                style: 'left8',
                marginTop: 5,
                text: [
                    { text: 'OBSERVACIONES:' }
                ],
            },
        ]

        for (var i in datos.cierre.observ) {
            col.push(
                [{ text: datos.cierre.observ[i], style: 'left8', marginTop: 5 }],
            )
        }
        return col
    }

    function llenarEstadoSalida() {
        var col = [
            {
                style: 'left8',
                marginTop: 5,
                text: [
                    { text: 'ESTADO SALIDA:    ' },
                    { text: datos.estado_salida.descrip + '   ' },
                    { text: datos.estado_salida.remitido },
                ],
            },
        ]
        return col
    }
}