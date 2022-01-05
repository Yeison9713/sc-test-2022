// IMPRESION DE HISTORIAS Y EVOLUCIONES ANTERIORES - DAVID.M  07/01/2021
$_HC002B = [];
var datos_HC002B = {};
var content_HC002B = [];
var subtitulos = [];

async function iniciar_HC002B(ord) {
    $_HC002B.ord = ord;
    await abrirArchivos_HC002B();
}

async function procesos_HC002B() {
    $_HC002B.his_evo = $_HC002B._historias.concat($_HC002B._evoluciones);

    for (var i in $_HC002B.his_evo) {
        if ($_HC002B.his_evo[i].FECHA_EVO) {
            $_HC002B.his_evo[i].fecha_total = $_HC002B.his_evo[i].FECHA_EVO + $_HC002B.his_evo[i].HORA_EVO;
        } else {
            $_HC002B.his_evo[i].fecha_total = $_HC002B.his_evo[i].fecha + $_HC002B.his_evo[i].hora;
        }

    }
    await ordenarDatos_HC002B();

    $_HC002B.his_evo = $_HC002B.his_evo.reverse();

    for (var i in $_HC002B.his_evo) {
        if ($_HC002B.his_evo[i].cierre != undefined) {
            if ($_HC002B.his_evo[i].cierre.temporal < 1) {
                await mostrarHistoria_HC002B($_HC002B.his_evo[i]);
            }
        } else {
            await mostrarEvoluciones_HC002B($_HC002B.his_evo[i]);
        }
    }

    await _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
        content: _imprimirHC002B(content_HC002B),
    }).catch((err) => {
        console.error(err);
    });
}

async function ordenarDatos_HC002B() {
    await $_HC002B.his_evo.sort((a, b) => {
        if (parseInt(a.fecha_total) > parseInt(b.fecha_total)) {
            return 1;
        }
        if (parseInt(a.fecha_total) < parseInt(b.fecha_total)) {
            return -1;
        }
        return 0;
    });
}

async function mostrarHistoria_HC002B(historia) {
    datos_HC002B = {};
    subtitulos = [];
    switch (parseInt(historia.cierre.clase)) {
        case 1:
            datos_HC002B.titulo = 'H.C. AIEPI';
            break;
        case 2:
            datos_HC002B.titulo = 'H.C. AIEPI';
            break;
        case 3:
            datos_HC002B.titulo = 'PERINATAL';
            break;
        default:
            datos_HC002B.titulo = 'H.C.';
            break;
    }

    datos_HC002B.fecha = _editarFecha(historia.fecha);
    datos_HC002B.hora = _editHora(historia.hora);
    datos_HC002B.descrip_medico = historia.descrip_med;
    datos_HC002B.descrip_serv = historia.descrip_serv;
    datos_HC002B.folio = historia.llave.substring(15, 17) + '-' + historia.llave.substring(17, 23);


    datos_HC002B.motivo = historia.motivo;
    subtitulos.push({ text: 'MOTIVO DE CONSULTA', style: 'left9Bold' }, { text: datos_HC002B.motivo.replace(/\&/g, "\n").trim() });


    datos_HC002B.enf_actual = $_HC002B._detalles.find(e => e['COD-DETHC'] == '1001' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.enf_actual) ? datos_HC002B.enf_actual = datos_HC002B.enf_actual.DETALLE: datos_HC002B.enf_actual = '';
    subtitulos.push({ text: 'ENFERMEDAD ACTUAL', style: 'left9Bold' }, { text: datos_HC002B.enf_actual.replace(/\&/g, "\n").trim() });

    switch (parseInt(historia.cierre.clase)) {
        case 1:
            await aperturaAiepi_HC002B(historia);
            break;
        case 2:
            await aperturaAiepi_HC002B(historia);
            break;
        default:
            await aperturaNormal_HC002B(historia);
            break;
    }

    await imprimirSignosHc_HC002B(historia);
    await imprimirDiagnosticos_HC002B(historia);

    if (historia.observ_egres.trim() != '') {
        subtitulos.push({ text: 'OBSERVACIONES', style: 'left9Bold' }, { text: historia.observ_egres.replace(/\&/g, "\n").trim() });
    }

    $_HC002B.aux = '';
    if (historia.rips.finalidad > 0 && historia.rips.finalidad < 10) {
        switch (parseFloat(historia.rips.finalidad)) {
            case 1:
                $_HC002B.aux = 'ATENCION PARTO';
                break;
            case 2:
                $_HC002B.aux = 'ATENCION REC.NACID';
                break;
            case 3:
                $_HC002B.aux = 'ATENC.PLANIF.FAMIL';
                break;
            case 4:
                $_HC002B.aux = 'DET.ALT CRECIM <10';
                break;
            case 5:
                $_HC002B.aux = 'DET.ALT.DESA.JOVEN';
                break;
            case 6:
                $_HC002B.aux = 'DET.ALT.EMBARAZO  ';
                break;
            case 7:
                $_HC002B.aux = 'DET.ALT. ADULTO   ';
                break;
            case 8:
                $_HC002B.aux = 'DET.ALT.AGUD.VISUA';
                break;
            case 9:
                $_HC002B.aux = 'DET.ENFERM.PROFES.';
                break;
        }
        subtitulos.push({ text: 'PYP ' + $_HC002B.aux, style: 'left9Bold' });
    }

    content_HC002B.push({
        marginTop: 15,
        style: 'left9Bold',
        columns: [
            { text: datos_HC002B.titulo, width: '12%' },
            { text: datos_HC002B.fecha + '  ' + datos_HC002B.hora, width: '18%' },
            { text: datos_HC002B.descrip_medico, width: '30%' },
            { text: datos_HC002B.descrip_serv, width: '25%' },
            { text: 'FOLIO: ' + datos_HC002B.folio, width: '20%' },
        ]
    }, {
        style: 'left8',
        alignment: 'justify',
        stack: subtitulos
    })
}

async function mostrarEvoluciones_HC002B(evolucion) {
    datos_HC002B = {};
    subtitulos = [];
    switch (parseFloat(evolucion.TIPO)) {
        case 1:
            datos_HC002B.color = '#A21311' // rojo;
            datos_HC002B.titulo = 'Nota médica:';
            break;
        case 2:
            datos_HC002B.color = '#000000' // negro;
            datos_HC002B.titulo = 'Nota enferm:';
            break;
        default:
            datos_HC002B.color = '#2C979E' // azul;
            switch (evolucion.RIPS.ATIENDE) {
                case '5':
                    datos_HC002B.titulo = 'Nota enferm:';
                    break;
                case '7':
                    datos_HC002B.titulo = 'Nota sicologia:';
                    break;
                case '8':
                    datos_HC002B.titulo = 'Nota nutricion:';
                    break;
                case 'A':
                    datos_HC002B.titulo = 'Nota Odontologia:';
                    break;
                case 'H':
                    datos_HC002B.titulo = 'Nota Higiene Oral:';
                    break;
                case 'I':
                    datos_HC002B.titulo = 'Nota Instrumentac:';
                    break;
                case 'O':
                    datos_HC002B.titulo = 'Nota Optometria:';
                    break;
                case 'T':
                    datos_HC002B.titulo = 'Nota Trab. social:';
                    break;
                default:
                    datos_HC002B.titulo = 'Otras Notas:';
                    break;
            }
            break;
    }

    datos_HC002B.fecha = _editarFecha(evolucion.FECHA_EVO);
    datos_HC002B.hora = _editHora(evolucion.HORA_EVO);
    datos_HC002B.descrip_medico = evolucion.NOM_MEDICO;
    datos_HC002B.descrip_serv = evolucion.DESCRIP_UNSERV;
    datos_HC002B.folio = evolucion.LLAVE_EVO.substring(15, 17) + '-' + evolucion.LLAVE_EVO.substring(17, 23);

    if (evolucion.TIPO == 2) {
        imprimirSignosEvo_HC002B(evolucion);
        if (evolucion.SIGNOS_VITALES.OXIMETRIA > 0 || evolucion.SIGNOS_VITALES.GLUCOMETRIA > 0) {
            subtitulos.push({ text: [{ text: 'GLUCOMETRIA:  ', style: 'left9Bold' }, { text: evolucion.SIGNOS_VITALES.GLUCOMETRIA }, { text: '  OXIMETRIA:  ', style: 'left9Bold' }, { text: evolucion.SIGNOS_VITALES.OXIMETRIA }] });
        }

        if (evolucion.SIGNOS_VITALES.LIQ_ADM_W != 0 || evolucion.SIGNOS_VITALES.LIQ_ELI_W != 0) {
            subtitulos.push({ text: [{ text: 'LIQ. ADMINIST: ', style: 'left9Bold' }, { text: evolucion.SIGNOS_VITALES.LIQ_ADM_W }, { text: '  ELIMINADOS:  ', style: 'left9Bold' }, { text: evolucion.SIGNOS_VITALES.LIQ_ELI_W }, { text: '  BALANCE:  ', style: 'left9Bold' }, { text: evolucion.SIGNOS_VITALES.LIQ_NET_W }] });
        }
    }

    if (evolucion.MACRO.CODIGO == 0) {
        evolucion.MACRO.DETALLE_MACRO = '';
    } else {
        switch (parseFloat(evolucion.MACRO.CLASE)) {
            case 1:
                datos_HC002B.tipo_macro = 'CIRUGIA';
                break;
            case 2:
                datos_HC002B.tipo_macro = 'PROCEDIMIENTO';
                break;
            case 3:
                datos_HC002B.tipo_macro = 'RESULTADOS DE IMAGENOLOGIA';
                break;
            case 4:
                datos_HC002B.tipo_macro = 'ENFERMERIA';
                break;
            case 5:
                datos_HC002B.tipo_macro = 'MEDICINA GENERAL';
                break;
            case 6:
                datos_HC002B.tipo_macro = 'MEDICINA ESPECIALIZADA';
                break;
            case 7:
                datos_HC002B.tipo_macro = 'RESUMENES DE HISTORIA';
                break;
            default:
                datos_HC002B.tipo_macro = '';
                break;
        }
        subtitulos.push({ text: [{ text: datos_HC002B.tipo_macro + ' ' }, { text: evolucion.MACRO.DETALLE_MACRO ? evolucion.MACRO.DETALLE_MACRO.enterPut() : '' }] });
    }

    if (evolucion.TIPO == 5) {
        await imprimirAplicacionMedic_HC002B(evolucion);
    } else {
        subtitulos.push({ text: evolucion.TABLA_EVO ? evolucion.TABLA_EVO.enterPut() : '' });
        if (evolucion.ANALISIS_EVO) {
            if (evolucion.ANALISIS_EVO.trim() != '') subtitulos.push({ text: 'ANALISIS', style: 'left9Bold' }, { text: evolucion.ANALISIS_EVO.enterPut() });
        }

        if (evolucion.PLAN_EVO) {
            if (evolucion.PLAN_EVO.trim() != '') subtitulos.push({ text: 'PLAN', style: 'left9Bold' }, { text: evolucion.PLAN_EVO.enterPut() });
        }
    }

    await imprimirFormulacion_HC002B(evolucion);

    content_HC002B.push({
        color: datos_HC002B.color,
        marginTop: 15,
        style: 'left9Bold',
        columns: [
            { text: datos_HC002B.titulo, width: '12%' },
            { text: datos_HC002B.fecha + '  ' + datos_HC002B.hora, width: '18%' },
            { text: datos_HC002B.descrip_medico, width: '30%' },
            { text: datos_HC002B.descrip_serv, width: '25%' },
            { text: 'FOLIO: ' + datos_HC002B.folio, width: '20%' },
        ]
    }, {
        color: datos_HC002B.color,
        style: 'left8',
        alignment: 'justify',
        stack: subtitulos
    })
}

async function imprimirFormulacion_HC002B(evolucion) {
    if (evolucion.FORMULACION.length > 0) subtitulos.push({ text: 'FORMULACION:', style: 'left9Bold' });
    for (var i in evolucion.FORMULACION) {
        if (evolucion.FORMULACION[i]['CANT-FORMU'].trim() != 0) {
            switch (parseFloat(evolucion.FORMULACION[i]['TIPO-FORMU'])) {
                case 1:
                    datos_HC002B.tipo_formu = 'Medicamento';
                    break;
                case 2:
                    datos_HC002B.tipo_formu = 'Laboratorio';
                    break;
                case 3:
                    datos_HC002B.tipo_formu = 'Imagenologia';
                    break;
                case 4:
                    datos_HC002B.tipo_formu = 'Ordenes Medicas';
                    break;
                case 5:
                    datos_HC002B.tipo_formu = 'Interconsultas';
                    break;
                case 6:
                    datos_HC002B.tipo_formu = 'Incapacidades';
                    break;
            }
            subtitulos.push({
                text: [
                    { text: datos_HC002B.tipo_formu + '  ' },
                    { text: evolucion.FORMULACION[i]['DESCRIP-FORMU'] + '  ' },
                    { text: evolucion.FORMULACION[i]['CANT-FORMU'] + '  ' },
                    { text: evolucion.FORMULACION[i]['INDI1-FORMU'] + '  ' },
                ]
            }, {
                text: evolucion.FORMULACION[i]['TIPO-FORMU'] == 2 || evolucion.FORMULACION[i]['TIPO-FORMU'] == 3 || evolucion.FORMULACION[i]['TIPO-FORMU'] == 4 ? evolucion.FORMULACION[i]['OTROS1-FORMU'] : ''
            })
        }
    }
}

async function imprimirAplicacionMedic_HC002B(evolucion) {
    for (var i in evolucion.ADMI_MEDICAMENTOS) {
        if (evolucion.ADMI_MEDICAMENTOS[i]['CANT-DOSIS'].trim() != '') {
            subtitulos.push({
                text: [
                    { text: 'Aplic. Medicamentos   ' },
                    { text: _editarFecha(evolucion.ADMI_MEDICAMENTOS[i]['FECHA-FOR-W']) + '  ' },
                    { text: _editHora(evolucion.ADMI_MEDICAMENTOS[i]['HORA-FOR-W']) + '  ' },
                    { text: evolucion.ADMI_MEDICAMENTOS[i]['DESCRIP-FORMU'] + '  ' },
                    { text: evolucion.ADMI_MEDICAMENTOS[i]['VIA-DOSIS'] + '  ' },
                    { text: evaluarUnidadMedida_impHc(evolucion.ADMI_MEDICAMENTOS[i]['UNID-DOSIS']) + '  ' },
                    { text: evolucion.ADMI_MEDICAMENTOS[i]['CANT-DOSIS'] },
                ]
            })
        }
    }
}

async function imprimirSignosEvo_HC002B(evolucion) {
    let peso = 0

    if (evolucion.PESO_NEW == 0) {
        if ((evolucion.UNID_EDAD == 'D' || evolucion.UNID_EDAD == 'M') || evolucion.EDAD == 1) {
            peso = evolucion.SIGNOS_VITALES.PESO_GRAMOS
        } else {
            peso = evolucion.SIGNOS_VITALES.PESO
        }
    } else {
        peso = evolucion.PESO_NEW
    }

    subtitulos.push({
        text: [
            { text: 'SIGNOS', style: 'left9Bold' },
            { text: '    PESO: ', bold: true },
            { text: peso },
            { text: '    TALLA: ', bold: true },
            { text: evolucion.SIGNOS_VITALES.TALLA },
            { text: '    TEMP: ', bold: true },
            { text: evolucion.SIGNOS_VITALES.TEMP },
            { text: '    F.C: ', bold: true },
            { text: evolucion.SIGNOS_VITALES.F_CARD },
            { text: '    F.R: ', bold: true },
            { text: evolucion.SIGNOS_VITALES.F_RESP },
            { text: '    T.A: ', bold: true },
            { text: evolucion.SIGNOS_VITALES.TENS_1 + '/' + evolucion.SIGNOS_VITALES.TENS_2 },
            { text: evolucion.SIGNOS_VITALES.VLR_GLASG > 0 ? '    GLASGOW: ' : '', bold: true },
            { text: evolucion.SIGNOS_VITALES.VLR_GLASG > 0 ? evolucion.SIGNOS_VITALES.VLR_GLASG + '/15' : '' },
            { text: '    PVC: ', bold: true },
            { text: evolucion.SIGNOS_VITALES.PVC },
            { text: '    SATO2: ', bold: true },
            { text: evolucion.SIGNOS_VITALES.OXIMETRIA },
        ]
    })
}

async function imprimirSignosHc_HC002B(historia) {
    subtitulos.push({
        text: [
            { text: 'SIGNOS', style: 'left9Bold' },
            { text: '    PESO: ', bold: true },
            { text: historia.signos.peso },
            { text: '    TALLA: ', bold: true },
            { text: historia.signos.talla },
            { text: '    TEMP: ', bold: true },
            { text: historia.signos.temp },
            { text: '    F.C: ', bold: true },
            { text: historia.signos.fcard },
            { text: '    F.R: ', bold: true },
            { text: historia.signos.fresp },
            { text: '    T.A: ', bold: true },
            { text: historia.signos.tens1 + '/' + historia.signos.tens2 },
            { text: historia.signos.glasg.substring(3, 5) > 0 ? '    GLASGOW: ' : '', bold: true },
            { text: historia.signos.glasg.substring(3, 5) > 0 ? historia.signos.glasg.substring(3, 5) + '/15' : '' },
            { text: '    PVC: ', bold: true },
            { text: historia.signos.pvc },
            { text: '    SATO2: ', bold: true },
            { text: historia.signos.oximetria },
        ]
    })
}

async function imprimirDiagnosticos_HC002B(historia) {
    for (var i in historia.tabla_diag) {
        if (historia.tabla_diag[i].diagn.trim() != '') {
            subtitulos.push({ text: [{ text: 'DIAGNOSTICO:  ', style: 'left9Bold' }, { text: historia.tabla_diag[i].diagn + ' - ' + historia.tabla_diag[i].descrip }] })
        }
    }
}

async function aperturaNormal_HC002B(historia) {
    subtitulos.push({ text: 'ANTECEDENTES', style: 'left9Bold', marginBottom: 2 });

    datos_HC002B.dato_2002 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2002' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2002) ? datos_HC002B.dato_2002 = datos_HC002B.dato_2002.DETALLE: datos_HC002B.dato_2002 = '';

    if(datos_HC002B.dato_2002) {
        if(datos_HC002B.dato_2002.tipo_ws) {
            switch(datos_HC002B.dato_2002.tipo_ws) {
                case "01": subtitulos.push(antecedentes2002_01_impHc(datos_HC002B.dato_2002)); break;
                case "02": subtitulos.push(antecedentes2002_02_impHc(datos_HC002B.dato_2002)); break;
                case "03": subtitulos.push(antecedentes2002_03_impHc(datos_HC002B.dato_2002)); break;
                case "04": subtitulos.push(antecedentes2002_04_impHc(datos_HC002B.dato_2002)); break;
            }
        } else if (datos_HC002B.dato_2002.trim()) subtitulos.push({ text: 'FAMILIARES', style: 'left9Bold' }, { text: datos_HC002B.dato_2002.replace(/\&/g, "\n").replace(/\s+/g, ' ') });
    }

    datos_HC002B.dato_2010 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2010' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2010) ? datos_HC002B.dato_2010 = datos_HC002B.dato_2010.DETALLE: datos_HC002B.dato_2010 = '';
    if (datos_HC002B.dato_2010.trim() != '') subtitulos.push({ text: 'MEDICOS', style: 'left9Bold' }, { text: datos_HC002B.dato_2010.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_2020 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2020' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2020) ? datos_HC002B.dato_2020 = datos_HC002B.dato_2020.DETALLE: datos_HC002B.dato_2020 = '';
    if (datos_HC002B.dato_2020.trim() != '') subtitulos.push({ text: 'QUIRURGICOS', style: 'left9Bold' }, { text: datos_HC002B.dato_2020.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_2030 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2030' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2030) ? datos_HC002B.dato_2030 = datos_HC002B.dato_2030.DETALLE: datos_HC002B.dato_2030 = '';
    if (datos_HC002B.dato_2030.trim() != '') subtitulos.push({ text: 'FARMACOLÓGICOS', style: 'left9Bold' }, { text: datos_HC002B.dato_2030.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_2035 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2035' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2035) ? datos_HC002B.dato_2035 = datos_HC002B.dato_2035.DETALLE: datos_HC002B.dato_2035 = '';
    if (datos_HC002B.dato_2035.trim() != '') subtitulos.push({ text: 'TOXICOLÓGICOS', style: 'left9Bold' }, { text: datos_HC002B.dato_2035.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_2040 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2040' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2040) ? datos_HC002B.dato_2040 = datos_HC002B.dato_2040.DETALLE: datos_HC002B.dato_2040 = '';
    if (datos_HC002B.dato_2040.trim() != '') subtitulos.push({ text: 'TRAUMATOLÓGICOS', style: 'left9Bold' }, { text: datos_HC002B.dato_2040.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_2050 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2050' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2050) ? datos_HC002B.dato_2050 = datos_HC002B.dato_2050.DETALLE: datos_HC002B.dato_2050 = '';
    if (datos_HC002B.dato_2050.trim() != '') subtitulos.push({ text: 'OCUPACIONALES', style: 'left9Bold' }, { text: datos_HC002B.dato_2050.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_2060 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2060' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2060) ? datos_HC002B.dato_2060 = datos_HC002B.dato_2060.DETALLE: datos_HC002B.dato_2060 = '';
    if (datos_HC002B.dato_2060.trim() != '') subtitulos.push({ text: 'GINECO-OSTETRICOS', style: 'left9Bold' }, { text: datos_HC002B.dato_2060.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_2070 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2070' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_2070) ? datos_HC002B.dato_2070 = datos_HC002B.dato_2070.DETALLE: datos_HC002B.dato_2070 = '';

    if (datos_HC002B.dato_2070.tipo_ws) {
        subtitulos.push(antecedentes2070_impHc(datos_HC002B.dato_2070));
    } else {
        subtitulos.push({ text: 'OTROS ANTECEDENTES', style: 'left9Bold' }, { text: datos_HC002B.dato_2070.replace(/\&/g, "\n").replace(/\s+/g, ' ') });
    }

    datos_HC002B.dato_4005 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '4005' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_4005) ? datos_HC002B.dato_4005 = datos_HC002B.dato_4005.DETALLE: datos_HC002B.dato_4005 = '';
    if (datos_HC002B.dato_4005.trim() != '') subtitulos.push({ text: 'EXAMEN GENERAL', style: 'left9Bold' }, { text: datos_HC002B.dato_4005.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_7501 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '7501' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_7501) ? datos_HC002B.dato_7501 = datos_HC002B.dato_7501.DETALLE.replace(/\s+/g, ' '): datos_HC002B.dato_7501 = '';
    if (datos_HC002B.dato_7501.trim() != '') subtitulos.push({ text: 'ANÁLISIS', style: 'left9Bold' }, { text: datos_HC002B.dato_7501.replace(/\&/g, "\n") });

    datos_HC002B.dato_7503 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '7503' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_7503) ? datos_HC002B.dato_7503 = datos_HC002B.dato_7503.DETALLE: datos_HC002B.dato_7503 = '';
    if (datos_HC002B.dato_7503.trim() != '') subtitulos.push({ text: 'PLAN', style: 'left9Bold' }, { text: datos_HC002B.dato_7503.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    datos_HC002B.dato_4030 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '4030' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_4030) ? datos_HC002B.dato_4030 = datos_HC002B.dato_4030.DETALLE: datos_HC002B.dato_4030 = '';

    if (datos_HC002B.dato_4030 != '') {
        subtitulos.push({ text: 'OTORRINO', style: 'left9Bold' });
        await imprimirOtorrino_HC002B();
    }

    if (historia.espec_med == 480 || historia.espec_med == 481 || historia.espec_med == 500) {
        // agudeza visual
        datos_HC002B.dato_4010 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '4010' && e['LLAVE-HC'] == historia.llave);
        (datos_HC002B.dato_4010) ? datos_HC002B.dato_4010 = datos_HC002B.dato_4010.DETALLE: datos_HC002B.dato_4010 = '';

        // examen ocular
        datos_HC002B.dato_4011 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '4011' && e['LLAVE-HC'] == historia.llave);
        (datos_HC002B.dato_4011) ? datos_HC002B.dato_4011 = datos_HC002B.dato_4011.DETALLE: datos_HC002B.dato_4011 = '';

        (datos_HC002B.dato_4010 == '' && datos_HC002B.dato_4011 == '') ? false: imprimirOftal_HC002B();
    }
}

async function aperturaAiepi_HC002B(historia) {
    datos_HC002B.dato_9501 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '9501' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_9501) ? datos_HC002B.dato_9501 = datos_HC002B.dato_9501.DETALLE: datos_HC002B.dato_9501 = false;

    subtitulos.push({ text: 'ANTECEDENTES PATOLÓGICOS IMPORTANTES', style: 'left9Bold' });
    datos_HC002B.dato_2002 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '2002' && e['LLAVE-HC'] == historia.llave);
    if (datos_HC002B.dato_2002) {
        datos_HC002B.dato_2002 = datos_HC002B.dato_2002.DETALLE;
        if (datos_HC002B.dato_2002.tipo_ws != "03" || !datos_HC002B.dato_2002.tipo_ws) {
            datos_HC002B.dato_2002 = datos_HC002B.dato_2002.replace(/\&/g, "\n").trim();
            subtitulos.push({ text: datos_HC002B.dato_2002.replace(/\&/g, "\n").replace(/\s+/g, ' ') });
        } else {
            subtitulos.push(antecedentes2002_03_impHc(datos_HC002B.dato_2002));
        }
    }

    datos_HC002B.dato_4005 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '4005' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_4005) ? datos_HC002B.dato_4005 = datos_HC002B.dato_4005.DETALLE: datos_HC002B.dato_4005 = '';
    if (datos_HC002B.dato_4005.trim() != '') subtitulos.push({ text: 'EXAMEN GENERAL', style: 'left9Bold' }, { text: datos_HC002B.dato_4005.replace(/\&/g, "\n").replace(/\s+/g, ' ') });

    if(datos_HC002B.dato_9501) {
        if(datos_HC002B.dato_9501.sig_vacunacion) {
            if (historia.cierre.clase == 1) {
                subtitulos.push({ text: [{ text: 'VACUNA BCG:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.vac_bcg }] });
                subtitulos.push({ text: [{ text: 'VACUNA HEPATITIS B:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.vac_hepb1 }] });
            } else {
                subtitulos.push({ text: [{ text: 'VACUNA BCGHEPB:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.bsghep }] });
                subtitulos.push({ text: [{ text: 'VACUNA PENTA 1:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.penta1 }] });
                subtitulos.push({ text: [{ text: 'VACUNA PENTA 2:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.penta2 }] });
                subtitulos.push({ text: [{ text: 'VACUNA PENTA 3:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.penta3 }] });
                subtitulos.push({ text: [{ text: 'VACUNA TRIPLE VIRAL 1:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.tripl1 }] });
                subtitulos.push({ text: [{ text: 'VACUNA TRIPLE VIRAL 2:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.tripl2 }] });
                subtitulos.push({ text: [{ text: 'VACUNA VOP - 1:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.vavop1 }] });
                subtitulos.push({ text: [{ text: 'VACUNA VOP - 2:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.vavop2 }] });
                subtitulos.push({ text: [{ text: 'VACUNA VOP - 3:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.vavop3 }] });
                subtitulos.push({ text: [{ text: 'VACUNA FIEBRE AMARILLA:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.fiebam }] });
                subtitulos.push({ text: [{ text: 'VACUNA DPT -R1:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.vdptr1 }] });
                subtitulos.push({ text: [{ text: 'VACUNA DPT -R2:  ' }, { text: datos_HC002B.dato_9501.sig_vacunacion.vdptr2 }] });
            }
        }
    }

    datos_HC002B.dato_9503 = $_HC002B._detalles.find(e => e['COD-DETHC'] == '9503' && e['LLAVE-HC'] == historia.llave);
    (datos_HC002B.dato_9503) ? datos_HC002B.dato_9503 = datos_HC002B.dato_9503.DETALLE: datos_HC002B.dato_9503 = '';
    if (datos_HC002B.dato_9503.trim() != '') subtitulos.push({ text: 'TRATAR', style: 'left9Bold' }, { text: datos_HC002B.dato_9503.replace(/\&/g, "\n").replace(/\s+/g, ' ') });
}

async function imprimirOtorrino_HC002B() {
    subtitulos.push({ columns: [{ text: 'PABELLON:', width: '12%' }, { text: datos_HC002B.dato_4030.pabel_4030 }] });
    subtitulos.push({ columns: [{ text: 'CONDUC:', width: '12%' }, { text: datos_HC002B.dato_4030.condu_4030 }] });
    subtitulos.push({ columns: [{ text: 'OIDO DER:', width: '12%' }, { text: datos_HC002B.dato_4030.me_od_4030 }] });
    subtitulos.push({ columns: [{ text: 'OIDO IZQ:', width: '12%' }, { text: datos_HC002B.dato_4030.me_oi_4030 }] });
    subtitulos.push({ columns: [{ text: 'WEBBER:', width: '12%' }, { text: datos_HC002B.dato_4030.weber_4030 }] });
    subtitulos.push({ columns: [{ text: 'RIN-O.IZQ:', width: '12%' }, { text: datos_HC002B.dato_4030.rinoi_4030 }] });
    subtitulos.push({ columns: [{ text: 'RIN-O.DER:', width: '12%' }, { text: datos_HC002B.dato_4030.rinod_4030 }] });
    subtitulos.push({ columns: [{ text: 'NARIZ EXT:', width: '12%' }, { text: datos_HC002B.dato_4030.nariz_4030 }] });
    subtitulos.push({ columns: [{ text: 'SEPTUM:', width: '12%' }, { text: datos_HC002B.dato_4030.septu_4030 }] });
    subtitulos.push({ columns: [{ text: 'CORNETES:', width: '12%' }, { text: datos_HC002B.dato_4030.corne_4030 }] });
    subtitulos.push({ columns: [{ text: 'CAVIDAD ORAL:', width: '12%' }, { text: datos_HC002B.dato_4030.c_ora_4030 }] });
    subtitulos.push({ columns: [{ text: 'LARINGE-IND.:', width: '12%' }, { text: datos_HC002B.dato_4030.larin_4030 }] });
    subtitulos.push({ columns: [{ text: 'CUELLO:', width: '12%' }, { text: datos_HC002B.dato_4030.cuell_4030 }] });
    subtitulos.push({ columns: [{ text: 'VESTI:', width: '12%' }, { text: datos_HC002B.dato_4030.vesti_4030 }] });
}

async function imprimirOftal_HC002B() {
    var body = [
        [{ text: 'AGUDEZA VISUAL', colSpan: 6, style: 'center8Bold' }, {}, {}, {}, {}, {}],
    ];

    if (datos_HC002B.dato_4010) {
        if (datos_HC002B.dato_4010.agud_lej_sc_od_esq_w.trim() != '' || datos_HC002B.dato_4010.agud_lej_sc_oi_esq_w.trim() != '') {
            body.push(
                [{},
                    { text: 'lejos (sc)', bold: true },
                    { text: 'cerca (sc)', bold: true },
                    { text: 'lejos (cc)', bold: true },
                    { text: 'cerca (cc)', bold: true },
                    { text: 'Queratometria', bold: true }
                ],

                [{ text: 'Ojo derecho ', bold: true },
                    { text: datos_HC002B.dato_4010.agud_lej_sc_od_esq_w },
                    { text: datos_HC002B.dato_4010.agud_cer_sc_od_esq_w },
                    { text: datos_HC002B.dato_4010.agud_lej_cc_od_esq_w },
                    { text: datos_HC002B.dato_4010.agud_cer_cc_od_esq_w },
                    { text: datos_HC002B.dato_4010.queratro_od_esq_w }
                ],

                [{ text: 'Ojo Izquierdo ', bold: true },
                    { text: datos_HC002B.dato_4010.agud_lej_sc_oi_esq_w },
                    { text: datos_HC002B.dato_4010.agud_cer_sc_oi_esq_w },
                    { text: datos_HC002B.dato_4010.agud_lej_cc_oi_esq_w },
                    { text: datos_HC002B.dato_4010.agud_cer_cc_oi_esq_w },
                    { text: datos_HC002B.dato_4010.queratro_oi_esq_w }
                ],
            )
        }

        if (datos_HC002B.dato_4010.form_lej_od_esq_w.trim() != '' || datos_HC002B.dato_4010.form_lej_oi_esq_w.trim() != '') {
            body.push(
                [{},
                    { text: 'Formul.uso lej', bold: true },
                    { text: 'Formul.uso cer', bold: true },
                    { text: 'Refracc. estat', bold: true },
                    { text: 'Refracc. dinam', bold: true },
                    { text: 'Subjetivo', bold: true }
                ],

                [{ text: 'Ojo derecho ', bold: true },
                    { text: datos_HC002B.dato_4010.form_lej_od_esq_w },
                    { text: datos_HC002B.dato_4010.form_cer_od_esq_w },
                    { text: datos_HC002B.dato_4010.refracc_esta_od_esq_w },
                    { text: datos_HC002B.dato_4010.refracc_dina_od_esq_w },
                    { text: datos_HC002B.dato_4010.subjeti_od_esq_w }
                ],

                [{ text: 'Ojo izquierdo ', bold: true },
                    { text: datos_HC002B.dato_4010.form_lej_oi_esq_w },
                    { text: datos_HC002B.dato_4010.form_cer_oi_esq_w },
                    { text: datos_HC002B.dato_4010.refracc_esta_oi_esq_w },
                    { text: datos_HC002B.dato_4010.refracc_dina_oi_esq_w },
                    { text: datos_HC002B.dato_4010.subjeti_oi_esq_w }
                ],

                [{ text: 'Adicion ', bold: true },
                    { text: datos_HC002B.dato_4010.form_lej_ad_esq_w },
                    { text: datos_HC002B.dato_4010.form_cer_ad_esq_w },
                    { text: datos_HC002B.dato_4010.refracc_esta_ad_esq_w },
                    { text: datos_HC002B.dato_4010.refracc_dina_ad_esq_w },
                    { text: datos_HC002B.dato_4010.subjeti_ad_esq_w }
                ],
            )
        }

        subtitulos.push({
            style: 'left8',
            table: {
                body: body
            },
        })
    }

    if (datos_HC002B.dato_4011) {
        if (datos_HC002B.dato_4011.pio_ocu_esq_w.trim() != '') {
            subtitulos.push({ text: 'P.I.O:', bold: true }, { text: datos_HC002B.dato_4011.pio_ocu_esq_w }, )
        }

        for (var i in datos_HC002B.dato_4011.motili_esq_w) {
            if (datos_HC002B.dato_4011.motili_esq_w[i].motil1_ocu_esq_w.trim() != '') {
                if (i == 0) subtitulos.push({ text: 'MOTILIDAD:', bold: true });
                subtitulos.push({ text: datos_HC002B.dato_4011.motili_esq_w[i].motil1_ocu_esq_w + datos_HC002B.dato_4011.motili_esq_w[i].motil2_ocu_esq_w })
            }
        }

        for (var i in datos_HC002B.dato_4011.exter_esq_w) {
            if (datos_HC002B.dato_4011.exter_esq_w[i].exter1_ocu_esq_w.trim() != '') {
                if (i == 0) subtitulos.push({ text: 'EXTERNOS:', bold: true });
                subtitulos.push({ text: datos_HC002B.dato_4011.exter_esq_w[i].exter1_ocu_esq_w + datos_HC002B.dato_4011.exter_esq_w[i].exter2_ocu_esq_w })
            }
        }

        for (var i in datos_HC002B.dato_4011.biomic_esq_w) {
            if (datos_HC002B.dato_4011.biomic_esq_w[i].biomic1_ocu_esq_w.trim() != '') {
                if (i == 0) subtitulos.push({ text: 'BIOMICROSCOP:', bold: true });
                subtitulos.push({ text: datos_HC002B.dato_4011.biomic_esq_w[i].biomic1_ocu_esq_w + datos_HC002B.dato_4011.biomic_esq_w[i].biomic2_ocu_esq_w })
            }
        }

        for (var i in datos_HC002B.dato_4011.fondo_esq_w) {
            if (datos_HC002B.dato_4011.fondo_esq_w[i].fondo1_ocu_esq_w.trim() != '') {
                if (i == 0) subtitulos.push({ text: 'FONDO DE OJO:', bold: true });
                subtitulos.push({ text: datos_HC002B.dato_4011.fondo_esq_w[i].fondo1_ocu_esq_w + datos_HC002B.dato_4011.fondo_esq_w[i].fondo2_ocu_esq_w })
            }
        }
    }
}

async function imprimirAntecedentesAiepi_HC002B(i) {
    if ($_HC002B.his_evo[i].dato_2002) {
        if ($_AIEPI010.dato_2002.embarazo_deseado) {
            datos_HC002B.antec_perinatal = $_AIEPI010.dato_2002;

            switch (datos_HC002B.antec_perinatal.embarazo_deseado) {
                case 'S':
                    datos_HC002B.antec_perinatal.embarazo_deseado = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.embarazo_deseado = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.embarazo_deseado = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.embarazo_deseado = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.atencion_perinatal) {
                case 'S':
                    datos_HC002B.antec_perinatal.atencion_perinatal = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.atencion_perinatal = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.atencion_perinatal = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.atencion_perinatal = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.reanimacion) {
                case 'S':
                    datos_HC002B.antec_perinatal.reanimacion = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.reanimacion = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.reanimacion = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.reanimacion = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.sano) {
                case 'S':
                    datos_HC002B.antec_perinatal.sano = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.sano = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.sano = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.sano = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.hemorragias) {
                case 'S':
                    datos_HC002B.antec_perinatal.hemorragias = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.hemorragias = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.hemorragias = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.hemorragias = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.infecciones) {
                case 'S':
                    datos_HC002B.antec_perinatal.infecciones = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.infecciones = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.infecciones = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.infecciones = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.deforma_cong) {
                case 'S':
                    datos_HC002B.antec_perinatal.deforma_cong = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.deforma_cong = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.deforma_cong = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.deforma_cong = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.hipoglicemia) {
                case 'S':
                    datos_HC002B.antec_perinatal.hipoglicemia = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.hipoglicemia = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.hipoglicemia = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.hipoglicemia = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.apnea) {
                case 'S':
                    datos_HC002B.antec_perinatal.apnea = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.apnea = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.apnea = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.apnea = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.ictericia) {
                case 'S':
                    datos_HC002B.antec_perinatal.ictericia = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.ictericia = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.ictericia = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.ictericia = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.broncoasp) {
                case 'S':
                    datos_HC002B.antec_perinatal.broncoasp = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.broncoasp = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.broncoasp = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.broncoasp = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.neurologia) {
                case 'S':
                    datos_HC002B.antec_perinatal.neurologia = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.neurologia = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.neurologia = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.neurologia = '  ';
                    break;
            }

            switch (datos_HC002B.antec_perinatal.memb_hialina) {
                case 'S':
                    datos_HC002B.antec_perinatal.memb_hialina = 'SI';
                    break;
                case 'N':
                    datos_HC002B.antec_perinatal.memb_hialina = 'NO';
                    break;
                case 'I':
                    datos_HC002B.antec_perinatal.memb_hialina = 'IGNORA';
                    break;
                default:
                    datos_HC002B.antec_perinatal.memb_hialina = '  ';
                    break;
            }
        }

        datos_HC002B.antecPatologicos = $_AIEPI010.dato_2002;
    }
}

function salir_HC002B() {
    console.log('SALIR HC002B');
}

async function leerDetalles_HC002B() {
    // leer variables aiepi
    $_HC002B.dato_9501 = await $_HC002B._detalles.find(e => e['COD-DETHC'] == '9501' && e['LLAVE-HC'] == $_reg_hc.llave_hc);
    $_HC002B.dato_9501 != undefined ? $_HC002B.dato_9501 = $_HC002B.dato_9501.DETALLE : false;

    // leer enfermedad general
    $_HC002B.enf_act_hc = await $_HC002B._detalles.find(e => e['COD-DETHC'] == '1001' && e['LLAVE-HC'] == $_reg_hc.llave_hc);
    if ($_HC002B.enf_act_hc != undefined) {
        $_HC002B.enf_act_hc = $_HC002B.enf_act_hc.DETALLE;
        $_HC002B.enf_act_hc = $_HC002B.enf_act_hc.replace(/\&/g, "\n").trim()
    }

    // leer tratamiento
    $_HC002B.dato_9503 = await $_HC002B._detalles.find(e => e['COD-DETHC'] == '9503' && e['LLAVE-HC'] == $_reg_hc.llave_hc);
    if ($_HC002B.dato_9503) {
        $_HC002B.dato_9503 = $_HC002B.dato_9503.DETALLE.replace(/\&/g, "\n").trim();
        $_HC002B.dato_9503 = $_HC002B.dato_9503.replace(/\�/g, "Ñ").trim();
        $_HC002B.dato_9503 = $_HC002B.dato_9503.replace(/\s+/g, ' ').trim();
    }

    // leer antecedentes familiares
    $_HC002B.famil_hc = await $_HC002B._detalles.find(e => e['COD-DETHC'] == '2002' && e['LLAVE-HC'] == $_reg_hc.llave_hc);

    if ($_HC002B.famil_hc) {
        $_HC002B.famil_hc = $_HC002B.famil_hc.DETALLE;
        if ($_HC002B.hcprc.serv != '08') $_HC002B.famil_hc = $_HC002B.famil_hc.replace(/\&/g, "\n").trim()
    }

    // leer examen general
    $_HC002B.exa_general_hc = await $_HC002B._detalles.find(e => e['COD-DETHC'] == '4005' && e['LLAVE-HC'] == $_reg_hc.llave_hc);
    $_HC002B.exa_general_hc != undefined ? $_HC002B.exa_general_hc = $_HC002B.exa_general_hc.DETALLE.replace(/\&/g, "\n").trim() : false;

    // leer test barthel
    $_HC002B.dato_9005 = await $_HC002B._detalles.find(e => e['COD-DETHC'] == '9005' && e['LLAVE-HC'] == $_reg_hc.llave_hc);
    $_HC002B.dato_9005 != undefined ? $_HC002B.dato_9005 = $_HC002B.dato_9005.DETALLE : false;

    // leer test karnofsky
    $_HC002B.dato_9006 = await $_HC002B._detalles.find(e => e['COD-DETHC'] == '9006' && e['LLAVE-HC'] == $_reg_hc.llave_hc);
    $_HC002B.dato_9006 != undefined ? $_HC002B.dato_9006 = $_HC002B.dato_9006.DETALLE : false;
}

async function abrirArchivos_HC002B() {
    await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + `|${$_HC002B.ord}|` }, get_url("APP/HICLIN/HC002B.DLL"))
        .then(async(data) => {
            $_HC002B._evoluciones = data.EVOLUCIONES;
            $_HC002B._evoluciones.pop();
            await _cargarHistorias_HC002B();
        })
        .catch((err) => {
            console.log(err, "err");
            loader("hide");
        });
};

async function _cargarHistorias_HC002B() {
    await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + `|${$_HC002B.ord}|` }, get_url("APP/HICLIN/HC002B-1.DLL"))
        .then(async(data) => {
            $_HC002B._historias = data.APERTURAS;
            $_HC002B._historias.pop();
            for (var i in $_HC002B._historias) {
                $_HC002B._historias[i] = $_HC002B._historias[i].HCPAC;
            }
            await _cargarDetalles_HC002B();
        })
        .catch((err) => {
            console.log(err, "err");
            loader("hide");
        });
};

async function _cargarDetalles_HC002B() {
    await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc.substring(0, 15) + "|**|**||**|" }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then(async(data) => {
            $_HC002B._detalles = data["DETHC"];
            $_HC002B._detalles.pop();
            procesos_HC002B();
        })
        .catch((err) => {
            console.log(err, "error");
            loader("hide");
        });
}