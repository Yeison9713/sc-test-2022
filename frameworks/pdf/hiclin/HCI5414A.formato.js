function _imprimirHCI5414A(datos, callback, opc_resu) {
    return {
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(datos.medico.firma) },
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
                text: 'CERTIFICADO DE ATENCION MEDICA PARA VICTIMAS DE ACCIDENTES DE TRANSITO \n EXPEDIDOS POR LA INSTITUCION PRESTADORA DE SERVICIOS DE SALUD',
                style: 'center10Bold'
            },
            {
                marginTop: 5,
                canvas: [{type: 'line', x1: 0, x2: 525, y1: 0, y2: 0}]  
            },
            {
                marginTop: 5,
                text: 'El suscrito Medico del Servicio de Urgencias de la Institucion Prestadora de Servicios \n',
                style: 'center8'
            },
            {
                text: datos.encabezado.nombre + '\n',
                style: 'center8Bold'
            },
            {
                columns: [
                    [
                        {
                          marginTop: 5,
                          text: 'Con domicilio en:  ' + datos.empresa.domicilio  
                        },
                        {
                            text: 'Telefono:  ' + datos.empresa.telefono,
                        }
                    ],
                    [
                        {
                            marginTop: 5,
                            text: 'Ciudad:  ' + datos.empresa.municipio 
                        }
                    ]
                ],
                style: 'left8',
                alignment: 'justify'
            },
            {
                marginTop: 5,
                text: 'Certifica que atendio en el servicio de urgencias al señor (a): ' + datos.paciente.nombre
                + ', identficado con ' + datos.paciente.tipoIdTexto.trim()
                + ', numero ' + datos.paciente.id
                + ', residente en ' + datos.paciente.residente
                + ', ciudad ' + datos.paciente.municipio
                + ', telefono ' + datos.paciente.telefono,
                style: 'left8',
                alignment: 'justify'
            },
            {
                marginTop: 5,
                text: 'Que según declaracion de:  ' + datos.paciente.declaracion
                + ', C.C No:  ' + datos.paciente.declaracionId
                + ', fue victima del accidente de transito ocurrido el dia  ' + datos.paciente.diaAcc
                + ', a las ' + datos.paciente.horaAcc
                + ', horas ingresado al servicio de urgencias de esta institucion el dia ' + datos.paciente.diaIng
                + ', a las ' + datos.paciente.horaIng
                + ' horas con los siguientes hallazgos: ',
                style: 'left8',
                alignment: 'justify'
            },
            {
                marginTop: 5,
                canvas: [{type: 'line', x1: 0, x2: 525, y1: 0, y2: 0}]  
            },
            {
                marginTop: 5,
                columns: [
                    {text: 'Signos vitales: ', style: 'left8Bold', width: '17%'},
                    {text: 'Tension arterial: ', style: 'left8', width: '13%'}, 
                    {text: datos.signos.tArt + 'mmHg', style: 'left8', width: '13%'},
                    {text: 'Fre. Card: ', style: 'left8', width: '8%'}, 
                    {text: datos.signos.card + ' x min', style: 'left8', width: '10%'},
                    {text: 'Fre. Resp: ', style: 'left8', width: '8%'}, 
                    {text: datos.signos.resp + ' x min', style: 'left8', width: '10%'},
                    {text: 'Temperatura: ', style: 'left8', width: '10%'}, 
                    {text: datos.signos.temp, style: 'left8', width: '30%'},
                ]
            },
            {
                marginTop: 5,
                columns: [
                    {text: 'Estado de conciencia: ', style: 'left8Bold', width: '17%'},
                    {text: 'Apertura Ocular: ', style: 'left8', width: '13%'}, 
                    {text: datos.conciencia.ocular, style: 'left8', width: '13%'},
                    {text: 'Respuesta Verbal: ', style: 'left8', width: '14%'}, 
                    {text: datos.conciencia.verbal, style: 'left8', width: '12%'},
                    {text: 'Respuesta Motora: ', style: 'left8', width: '14%'}, 
                    {text: datos.conciencia.motora, style: 'left8', width: '19%'},
                ]
            },
            {
                marginTop: 5,
                columns: [
                    {text: '', style: 'left8Bold', width: '17%'},
                    {text: 'Glasgow: ', style: 'left8', width: '13%'}, 
                    {text: datos.conciencia.glasg + ' / 15', style: 'left8', width: '13%'},
                ]
            },
            {
                marginTop: 5,
                columns: llenarEstEmbriaguez()
            },
            {
                marginTop: 5,
                canvas: [{type: 'line', x1: 0, x2: 525, y1: 0, y2: 0}]  
            },
            {
                marginTop: 15,
                text: 'DATOS POSITIVOS',
                style: 'left10Bold'
            },
            {
                marginTop: 3,
                text: datos.datosPositivos.cont,
                style: 'left8'
            },
            firmaImpresion_impHc(datos)
        ]
        
        return col
    }
    
    function llenarEstEmbriaguez() {
        var filas = [
            {text: 'Estado de Embriaguez', style: 'left8Bold', width: '17%'},
        ]
        
        if(datos.embriaguez.estado == 1) {
            filas.push(
                {text: 'SI', style: 'left8', width: '13%'},
                {text: datos.embriaguez.descrip, style: 'left8', width: '70%'}
            )
        } else if(datos.embriaguez.estado === 0) {
            filas.push(
                {text: 'NO', style: 'left8', width: '13%'}
            )
        }
        
        return filas
    }
}