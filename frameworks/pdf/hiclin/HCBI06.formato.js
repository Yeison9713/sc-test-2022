async function _imprimirReferencia(llave) {
    var datos = {};
    await postData({ datosh: datosEnvio() + llave + '|' }, get_url("app/HICLIN/HCB06.DLL"))
        .then(data => {
            datos = data.REG_REF[0];
        }).catch(err => {
            CON851('ERROR', 'Error en impresion', null, 'error', 'error');
            console.log(err, 'error');
        })

    datos.MED_REF_FIRMA = datos.MED_REF;
    isNaN(datos.ID_PACI) ? datos.ID_PACI = datos.ID_PACI : datos.ID_PACI = new Intl.NumberFormat("ja-JP").format(datos.ID_PACI);
    isNaN(datos.MED_REF) ? datos.MED_REF_EDIT = datos.MED_REF : datos.MED_REF_EDIT = new Intl.NumberFormat("ja-JP").format(datos.MED_REF);

    datos.medico = {};
    datos.medico.nombre = datos.DESCRIP_MED;
    datos.medico.espec = datos.DESCRIP_ESPEC_MED;
    datos.medico.reg = datos.REG_MED;

    datos.encabezado = {};
    datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
    datos.encabezado.titulo = 'SOLICITUD DE REFERENCIA';

    if (datos != {}) {
        return {
            images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.MED_REF_FIRMA) },
            pageMargins: margin = [35, 80, 35, 60],
            header: encabezadoSimple_impHC(datos),
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
    } else {
        CON851('ERROR', 'Error en impresion', null, 'error', 'error');
        _regresar_menuhis();
    }

    function llenarFormato() {

        var col = [
            {
                style: 'center8',
                table: {
                    widths: ['25%', '25%', '25%', '5%', '5%', '5%', '10%'],
                    body: [
                        [{ text: 'PRIORITARIA', rowSpan: 2, style: 'center8BoldT', marginTop: 7 }, { text: 'URGENTE', rowSpan: 2, style: 'center8BoldT', marginTop: 7 }, { text: 'VITAL', rowSpan: 2, style: 'center8BoldT', marginTop: 7 }, { text: 'FECHA SOLICITUD', style: 'center8BoldT', colSpan: 4 }, {}, {}, {}],
                        [{}, {}, {}, { text: 'DIA', style: 'center8BoldT' }, { text: 'MES', style: 'center8BoldT' }, { text: 'AÑO', style: 'center8BoldT' }, { text: 'HORA', style: 'center8BoldT' }],
                        [{ text: datos.PRIORIDAD_REF == 1 ? 'X' : '', bold: true }, { text: datos.PRIORIDAD_REF == 2 ? 'X' : '', bold: true }, { text: datos.PRIORIDAD_REF == 3 ? 'X' : '', bold: true }, { text: datos.FECHA_REF.substring(6, 8), bold: true }, { text: datos.FECHA_REF.substring(4, 6), bold: true }, { text: datos.FECHA_REF.substring(0, 4), bold: true }, { text: _editHora(datos.HORA_REF), bold: true }],
                    ]
                }
            },
            {
                marginTop: 4,
                style: 'center8',
                table: {
                    widths: ['20%', '5%', '20%', '5%', '20%', '5%', '20%', '5%'],
                    body: [
                        [{ text: 'TIPO DE SERVICIO SOLICITADO', style: 'center8BoldT', colSpan: 8 }, {}, {}, {}, {}, {}, {}],
                        [{ text: 'Diagnóstico:', bold: true }, { text: datos.SERV_SOLICITA_REF == 1 ? 'X' : '', bold: true }, { text: 'Tratemiento:', bold: true }, { text: datos.SERV_SOLICITA_REF == 2 ? 'X' : '', bold: true }, { text: 'Valoración externa:', bold: true }, { text: datos.SERV_SOLICITA_REF == 3 ? 'X' : '', bold: true }, { text: 'Manejo integral:', bold: true }, { text: datos.SERV_SOLICITA_REF == 4 ? 'X' : '', bold: true }]
                    ]
                }
            },
            {
                marginTop: 4,
                style: 'center8',
                table: {
                    widths: ['15%', '85%'],
                    body: llenarEspecialidadees()
                }
            },
            {
                marginTop: 4,
                style: 'center8',
                table: {
                    widths: ['40%', '15%', '5%', '5%', '35%'],
                    body: [
                        [{ text: 'NOMBRES Y APELLIDOS DEL USUARIO', style: 'center8BoldT' }, { text: 'IDENTIFICACIÓN', style: 'center8BoldT' }, { text: 'SEXO', style: 'center8BoldT' }, { text: 'EDAD', style: 'center8BoldT' }, { text: 'ASEGURADORA', style: 'center8BoldT' }],
                        [{ text: datos.DESCRIP_PACI.replace(/\s+/g, ' ') }, { text: datos.ID_PACI }, { text: datos.SEXO_PACI }, { text: datos.EDAD_REF }, { text: datos.DESCRIP_ENTID }],
                    ]
                }
            },
            {
                marginTop: 4,
                style: 'center8',
                table: {
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'PROFESIONAL QUE SOLICITA REFERENCIA', style: 'center8BoldT' }, { text: 'MÉDICO TRATANTE', style: 'center8BoldT' }],
                        [{ text: datos.DESCRIP_MED.replace(/\s+/g, ' ') }, { text: datos.DESCRIP_MED_TRATANTE.replace(/\s+/g, ' ') }],
                    ]
                }
            },
            {
                marginTop: 4,
                style: 'center8',
                table: {
                    widths: ['100%'],
                    body: [
                        [{ text: 'RESUMEN HISTORIA CLÍNICA', style: 'center8BoldT' }],
                        [{ text: datos.TABLA_REF.replace(/\&/g, "\n").trim(), alignment: 'justify' }],
                    ]
                }
            },
            {
                marginTop: 4,
                style: 'center8',
                table: {
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'DIAGNOSTICOS', style: 'center8BoldT' }, { text: 'MOTIVO DE LA REMISIÓN', style: 'center8BoldT' }],
                        [
                            {
                                stack: llenarDiagnosticos()
                            },
                            {
                                text: datos.MOTIVO_REVISION_REF.replace(/\&/g, "\n").trim(),
                                alignment: 'justify'
                            }
                        ]
                    ]
                }
            },
            firmaImpresion_impHc(datos)
        ]

        return col
    }

    function llenarEspecialidadees() {
        datos.ESPECIALIDADES = [];
        datos.ESPECIALIDADES.push(
            { COD: datos.ESPECIA_REMI_REF, DESCRIP: datos.DESCRIP_ESPEC },
            { COD: datos.ESPECIA_REMI_REF2, DESCRIP: datos.DESCRIP_ESPEC2 },
            { COD: datos.ESPECIA_REMI_REF3, DESCRIP: datos.DESCRIP_ESPEC3 }
        )

        var body = [
            [{ text: 'ESPECIALIDAD', style: 'center8BoldT', colSpan: 2 }, {}]
        ]

        for (var i in datos.ESPECIALIDADES) {
            if(datos.ESPECIALIDADES[i].COD.trim()) {
                body.push(
                    [{ text: datos.ESPECIALIDADES[i].COD }, { text: datos.ESPECIALIDADES[i].DESCRIP, style: 'left8' }]
                )
            }
        }
        return body
    }

    function llenarDiagnosticos() {
        datos.DIAGNOSTICOS = [];
        datos.DIAGNOSTICOS.push(
            { COD: datos.DIAG_PRIN_REF, DESCRIP: datos.DESCRIP_DIAG_PRIN_REF }
        )

        for (var i in datos.OTROS_DIAGNOSTICOS_REF) {
            if (datos.OTROS_DIAGNOSTICOS_REF[i].COD.trim() != '') {
                datos.DIAGNOSTICOS.push(
                    { COD: datos.OTROS_DIAGNOSTICOS_REF[i].COD, DESCRIP: datos.OTROS_DIAGNOSTICOS_REF[i].DESCRIP }
                )
            }
        }
        var col = []

        for (var i in datos.DIAGNOSTICOS) {
            col.push(
                { columns: [{ text: datos.DIAGNOSTICOS[i].COD, width: '13%', style: 'left8' }, { text: datos.DIAGNOSTICOS[i].DESCRIP, style: 'left8' }] }
            )
        }

        return col
    }
}