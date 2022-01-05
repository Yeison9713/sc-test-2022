function _imprimirApgar(datos) {
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
                stack: llenarTablaApgar()
            },
        ]
        
        return col
    }
    
    function llenarTablaApgar() {
        var content = []
        for (var i in datos.tabla_9011) {
            if(datos.tabla_9011[i].nombre_acomp.trim() != '' || datos.tabla_9011[i].sati_reci_ayuda_fami.trim() != '')
            content.push(
                { columns: [{text: 'FAMILIAR: ', bold: true, width: '8%'}, {text: `${parseInt(i) + 1} de ${datos.tabla_9011.length}`, width: '92%'}], style: 'left8'},
                { columns: [{text: 'NOMBRE DEL ACOMPAÑANTE: ', bold: true, width: '22%'}, {text: datos.tabla_9011[i].nombre_acomp, width: '45%'}, {text: 'PARENTESCO:', bold: true, width: '11%'}, {text: datos.tabla_9011[i].parentesco}], style: 'left8'},
                {
                    marginTop: 5,
                    style: 'left8',
                    table: {
                        widths: ['80%', '20%'],
                        body: [
                            [{text: 'CUESTIONARIO', bold: true, style: 'left8BoldT'}, {text: 'RESPUESTA', style: 'center8BoldT'}],
                            [{text: 'Le satisface la ayuda que recibe de su familia cuando tiene algun problema o alguna necesidad'}, {text: datos.tabla_9011[i].sati_reci_ayuda_fami, style: 'center8'}],
                            [{text: 'Le satisfacela participacion que su familia le brinda y permite?'}, {text: datos.tabla_9011[i].sati_parti_fami_brind, style: 'center8'}],
                            [{text: 'Le satisface como su familia acepta y apoya sus deseos de emprender nuevas actividades?'}, {text: datos.tabla_9011[i].sati_fami_acept_emp, style: 'center8'}],
                            [{text: 'Le satisface como su familia expresa afectos y responde a sus emociones como rabia, tristeza, amor, etc?'}, {text: datos.tabla_9011[i].sati_fami_exp_afect, style: 'center8'}],
                            [{text: 'Le satisface cmo comparte en familia el tiempo para estar juntos, los espacios en casa, el dinero, etc?'}, {text: datos.tabla_9011[i].sati_comp_tiemp_fami, style: 'center8'}],
                        ]
                    }
                },
                {
                    columns: [
                        {
                        },
                        {
                            marginTop: 5,
                            style: 'center8',
                            table: {
                                widths: ['30%', '70%'],
                                body: [
                                    [{text: 'PUNTAJE', bold: true, style: 'left8BoldT'}, {text: 'INTERPRETACIÓN', style: 'center8BoldT'}],
                                    [{text: datos.tabla_9011[i].puntaje}, {text: datos.tabla_9011[i].interp, style: 'center8'}],
                                ]
                            }
                        },
                        {
                        }
                    ]
                }
            )
        }
        
        return content
    }
}