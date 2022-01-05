// 25-01-2021 - IMPRESION CITOLOGIA TOMA Y CONTROL - DAVID.M - HICLIN

$_HCI8001 = [];
datos_HCI8001 = {};

async function iniciar_HCI8001(opciones, rec) {
    $_HCI8001._hcprc = rec._hcpac;
    $_HCI8001._detalles = rec._detalles;
    $_HCI8001._paci = rec.$_reg_paci;
    $_HCI8001.opciones = opciones;

    // leer historia
    if ($_HCI8001._hcprc.novedad == 7) $_HCI8001.sw_buscar = 0;
    else $_HCI8001.sw_buscar = 1;

    await leerDetalles_HCI8001();
    await llenarEncabezado_HCI8001();
    await llenarDatos_HCI8001();
}

async function leerDetalles_HCI8001() {
    $_HCI8001.dato_8001 = await $_HCI8001._detalles.find(e => e['COD-DETHC'] == '8001' && e['LLAVE-HC'] == $_HCI8001._hcprc.llave);
    $_HCI8001.dato_8001 ? $_HCI8001.dato_8001 = $_HCI8001.dato_8001.DETALLE : false;

    $_HCI8001.dato_4040 = await $_HCI8001._detalles.find(e => e['COD-DETHC'] == '4040' && e['LLAVE-HC'] == $_HCI8001._hcprc.llave);
    $_HCI8001.dato_4040 ? $_HCI8001.dato_4040 = $_HCI8001.dato_4040.DETALLE : false;

    $_HCI8001.dato_7501 = await $_HCI8001._detalles.find(e => e['COD-DETHC'] == '7501' && e['LLAVE-HC'] == $_HCI8001._hcprc.llave);
    $_HCI8001.dato_7501 ? $_HCI8001.dato_7501 = $_HCI8001.dato_7501.DETALLE : false;

    $_HCI8001.dato_7503 = await $_HCI8001._detalles.find(e => e['COD-DETHC'] == '7503' && e['LLAVE-HC'] == $_HCI8001._hcprc.llave);
    $_HCI8001.dato_7503 ? $_HCI8001.dato_7503 = $_HCI8001.dato_7503.DETALLE : false;
}

async function llenarEncabezado_HCI8001() {
    datos_HCI8001.encabezado = {};
    datos_HCI8001.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    datos_HCI8001.encabezado.nit = $_USUA_GLOBAL[0].NIT;
    datos_HCI8001.encabezado.titulo = 'HISTORIA CLINICA CITOLOGIA TOMA Y CONTROL';

    // llenar encabezado
    datos_HCI8001.paciente = llenarPacienteAperturas_impHc($_HCI8001._paci, $_HCI8001._hcprc)
}

async function llenarDatos_HCI8001() {
    // antecedentes familiares
    datos_HCI8001.dato_fam = $_HCI8001.dato_8001.dato_fam;
    switch (parseFloat(datos_HCI8001.dato_fam.hiper_fam)) {
        case 1:
            datos_HCI8001.dato_fam.hiper_fam = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_fam.hiper_fam = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_fam.hiper_fam = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_fam.hiper_fam = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_fam.diabet_fam)) {
        case 1:
            datos_HCI8001.dato_fam.diabet_fam = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_fam.diabet_fam = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_fam.diabet_fam = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_fam.diabet_fam = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_fam.cardiopat_fam)) {
        case 1:
            datos_HCI8001.dato_fam.cardiopat_fam = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_fam.cardiopat_fam = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_fam.cardiopat_fam = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_fam.cardiopat_fam = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_fam.can_cuell_fam)) {
        case 1:
            datos_HCI8001.dato_fam.can_cuell_fam = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_fam.can_cuell_fam = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_fam.can_cuell_fam = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_fam.can_cuell_fam = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_fam.can_mama_fam)) {
        case 1:
            datos_HCI8001.dato_fam.can_mama_fam = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_fam.can_mama_fam = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_fam.can_mama_fam = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_fam.can_mama_fam = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_fam.otro_can_fam)) {
        case 1:
            datos_HCI8001.dato_fam.otro_can_fam = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_fam.otro_can_fam = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_fam.otro_can_fam = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_fam.otro_can_fam = ' ';
            break;
    }

    // antecedentes personales
    datos_HCI8001.dato_per = $_HCI8001.dato_8001.dato_per;
    switch (parseFloat(datos_HCI8001.dato_per.hiper_per)) {
        case 1:
            datos_HCI8001.dato_per.hiper_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.hiper_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.hiper_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.hiper_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.viol_gen_per)) {
        case 1:
            datos_HCI8001.dato_per.viol_gen_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.viol_gen_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.viol_gen_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.viol_gen_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.diabet_per)) {
        case 1:
            datos_HCI8001.dato_per.diabet_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.diabet_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.diabet_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.diabet_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.sangrado_vag_per)) {
        case 1:
            datos_HCI8001.dato_per.sangrado_vag_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.sangrado_vag_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.sangrado_vag_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.sangrado_vag_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.tumores_per)) {
        case 1:
            datos_HCI8001.dato_per.tumores_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.tumores_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.tumores_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.tumores_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.cirug_pel_per)) {
        case 1:
            datos_HCI8001.dato_per.cirug_pel_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.cirug_pel_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.cirug_pel_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.cirug_pel_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.infec_pelvi_per)) {
        case 1:
            datos_HCI8001.dato_per.infec_pelvi_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.infec_pelvi_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.infec_pelvi_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.infec_pelvi_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.crioterapia_per)) {
        case 1:
            datos_HCI8001.dato_per.crioterapia_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.crioterapia_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.crioterapia_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.crioterapia_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.infec_celvi_per)) {
        case 1:
            datos_HCI8001.dato_per.infec_celvi_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.infec_celvi_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.infec_celvi_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.infec_celvi_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.radioterapia_per)) {
        case 1:
            datos_HCI8001.dato_per.radioterapia_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.radioterapia_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.radioterapia_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.radioterapia_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.flujo_vag_per)) {
        case 1:
            datos_HCI8001.dato_per.flujo_vag_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.flujo_vag_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.flujo_vag_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.flujo_vag_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.histerectomia_per)) {
        case 1:
            datos_HCI8001.dato_per.histerectomia_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.histerectomia_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.histerectomia_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.histerectomia_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.can_cuell_per)) {
        case 1:
            datos_HCI8001.dato_per.can_cuell_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.can_cuell_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.can_cuell_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.can_cuell_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.conizacion_per)) {
        case 1:
            datos_HCI8001.dato_per.conizacion_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.conizacion_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.conizacion_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.conizacion_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.can_mama_per)) {
        case 1:
            datos_HCI8001.dato_per.can_mama_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.can_mama_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.can_mama_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.can_mama_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.exeresis_per)) {
        case 1:
            datos_HCI8001.dato_per.exeresis_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.exeresis_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.exeresis_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.exeresis_per = ' ';
            break;
    }

    switch (parseFloat(datos_HCI8001.dato_per.fuma_per)) {
        case 1:
            datos_HCI8001.dato_per.fuma_per = 'SI';
            break;
        case 2:
            datos_HCI8001.dato_per.fuma_per = 'NO';
            break;
        case 3:
            datos_HCI8001.dato_per.fuma_per = 'NO SABE';
            break;
        default:
            datos_HCI8001.dato_per.fuma_per = ' ';
            break;
    }

    // antecedentes gineco-obstetricos
    datos_HCI8001.gineco_esq_w = $_HCI8001.dato_4040.gineco_esq_w;

    var embar = parseFloat($_HCI8001._hcprc.rips.embarazo);
    if (embar == 1 || embar == 2 || embar == 3) {
        datos_HCI8001.embarazada = 'SI';
        switch (embar) {
            case 1:
                datos_HCI8001.embarazo = 'EMBARAZO PRIMER TIMESTRE';
                break;
            case 2:
                datos_HCI8001.embarazo = 'EMBARAZO SEGUND TIMESTRE';
                break;
            case 3:
                datos_HCI8001.embarazo = 'EMBARAZO TERCER TIMESTRE';
                break;
        }
    } else {
        datos_HCI8001.embarazada = 'NO';
        datos_HCI8001.embarazo = '';
    }

    // dato gineco 8001
    datos_HCI8001.dato_gineco = $_HCI8001.dato_8001.dato_gineco;

    if (datos_HCI8001.dato_gineco.planifica == 'S') datos_HCI8001.dato_gineco.planifica = 'SI';
    else datos_HCI8001.dato_gineco.planifica = 'NO';

    datos_HCI8001.metodo_planif = consult_planifica($_HCI8001._hcprc.planific);

    // dato obstetric 4040
    datos_HCI8001.obstetric_esq_w = $_HCI8001.dato_4040.obstetric_esq_w;

    if (datos_HCI8001.obstetric_esq_w.lactancia_esq_w == 'S') datos_HCI8001.obstetric_esq_w.lactancia_esq_w = 'SI';
    else datos_HCI8001.obstetric_esq_w.lactancia_esq_w = 'NO';

    if (datos_HCI8001.dato_gineco.posparto == 'S') datos_HCI8001.dato_gineco.posparto = 'SI';
    else datos_HCI8001.dato_gineco.posparto = 'NO';

    if (datos_HCI8001.dato_gineco.menopausia == 'S') datos_HCI8001.dato_gineco.menopausia = 'SI';
    else datos_HCI8001.dato_gineco.menopausia = 'NO';

    // antecedentes socio-culturales
    datos_HCI8001.dato_soc_cul = $_HCI8001.dato_8001.dato_soc_cul;

    if (datos_HCI8001.dato_soc_cul.reci_apoy_social == 'S') datos_HCI8001.dato_soc_cul.reci_apoy_social = 'SI';
    else datos_HCI8001.dato_soc_cul.reci_apoy_social = 'NO';

    switch (datos_HCI8001.dato_soc_cul.vivienda_propia) {
        case 'S':
            datos_HCI8001.dato_soc_cul.vivienda_propia = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.vivienda_propia = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.vivienda_propia = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.vivienda_hacina) {
        case 'S':
            datos_HCI8001.dato_soc_cul.vivienda_hacina = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.vivienda_hacina = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.vivienda_hacina = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.casa) {
        case 'S':
            datos_HCI8001.dato_soc_cul.casa = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.casa = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.casa = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.apto) {
        case 'S':
            datos_HCI8001.dato_soc_cul.apto = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.apto = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.apto = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.invasion) {
        case 'S':
            datos_HCI8001.dato_soc_cul.invasion = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.invasion = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.invasion = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.lote) {
        case 'S':
            datos_HCI8001.dato_soc_cul.lote = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.lote = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.lote = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.estudia_act) {
        case 'S':
            datos_HCI8001.dato_soc_cul.estudia_act = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.estudia_act = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.estudia_act = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.trabaja_act) {
        case 'S':
            datos_HCI8001.dato_soc_cul.trabaja_act = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.trabaja_act = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.trabaja_act = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.alimentacion_adec) {
        case 'S':
            datos_HCI8001.dato_soc_cul.alimentacion_adec = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.alimentacion_adec = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.alimentacion_adec = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.sueno_normal) {
        case 'S':
            datos_HCI8001.dato_soc_cul.sueno_normal = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.sueno_normal = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.sueno_normal = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.tabaco) {
        case 'S':
            datos_HCI8001.dato_soc_cul.tabaco = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.tabaco = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.tabaco = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.alcohol) {
        case 'S':
            datos_HCI8001.dato_soc_cul.alcohol = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.alcohol = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.alcohol = ' ';
            break;
    }

    switch (datos_HCI8001.dato_soc_cul.otras_sustacias) {
        case 'S':
            datos_HCI8001.dato_soc_cul.otras_sustacias = 'SI';
            break;
        case 'N':
            datos_HCI8001.dato_soc_cul.otras_sustacias = 'NO';
            break;
        default:
            datos_HCI8001.dato_soc_cul.otras_sustacias = ' ';
            break;
    }

    // especuloscopia
    datos_HCI8001.especuloscopia = $_HCI8001.dato_8001.especuloscopia;
    switch (parseFloat(datos_HCI8001.especuloscopia.aspecto_cuell)) {
        case 1:
            datos_HCI8001.especuloscopia.aspecto_cuell = 'SANO';
            break;
        case 2:
            datos_HCI8001.especuloscopia.aspecto_cuell = 'CONGESTIVO';
            break;
        case 3:
            datos_HCI8001.especuloscopia.aspecto_cuell = 'LACERADO';
            break;
        case 4:
            datos_HCI8001.especuloscopia.aspecto_cuell = 'ULCERADO';
            break;
        case 5:
            datos_HCI8001.especuloscopia.aspecto_cuell = 'POLIPO';
            break;
        case 6:
            datos_HCI8001.especuloscopia.aspecto_cuell = 'OTRO';
            break;
        default:
            datos_HCI8001.especuloscopia.aspecto_cuell = '';
            break;
    }

    // recepcion y entrega de resultados
    datos_HCI8001.recepcion_entrega = $_HCI8001.dato_8001.recepcion_entrega;
    datos_HCI8001.recepcion_entrega.fecha_entrega = datos_HCI8001.recepcion_entrega.ano_entre + datos_HCI8001.recepcion_entrega.mes_entre + datos_HCI8001.recepcion_entrega.dia_entre
    datos_HCI8001.recepcion_entrega.fecha_consulta = datos_HCI8001.recepcion_entrega.ano_consul + datos_HCI8001.recepcion_entrega.mes_consul + datos_HCI8001.recepcion_entrega.dia_consul

    await postData({ datosh: datosEnvio() + cerosIzq(datos_HCI8001.recepcion_entrega.ips_lect, 10) + '|' }, get_url("APP/SALUD/SER813-1.DLL"))
        .then((data) => {
            datos_HCI8001.recepcion_entrega.nombre_ips = data.DESCRIP;
        })
        .catch((err) => {
            datos_HCI8001.recepcion_entrega.nombre_ips = '';
            console.log(err, "err");
        });

    if (datos_HCI8001.recepcion_entrega.aten_medico == 'S') datos_HCI8001.recepcion_entrega.aten_medico = 'SI';
    else datos_HCI8001.recepcion_entrega.aten_medico = 'NO';

    datos_HCI8001.diagnosticos = [];

    if ($_HCI8001.dato_8001.tipo == 1) {
        await imprimirDiagnostico_HCI8001();
    } else {
        // citologia
        datos_HCI8001.control = $_HCI8001.dato_8001.control;

        datos_HCI8001.control.fecha_toma = datos_HCI8001.control.ano_toma + datos_HCI8001.control.mes_toma + datos_HCI8001.control.dia_toma
        datos_HCI8001.control.fecha_cuando = datos_HCI8001.control.ano_cuando + datos_HCI8001.control.mes_cuando + datos_HCI8001.control.dia_cuando

        datos_HCI8001.control.conduc_manejo = datos_HCI8001.control.conduc_manejo;
        datos_HCI8001.control.aspect_geni = datos_HCI8001.control.aspect_geni;
        datos_HCI8001.control.flujo_car = datos_HCI8001.control.flujo_car;
        datos_HCI8001.control.educa_prev = datos_HCI8001.control.educa_prev;

        await postData({ datosh: datosEnvio() + datos_HCI8001.control.remision_cod + '|' }, get_url("APP/SALUD/SER855-1.DLL"))
            .then((data) => {
                datos_HCI8001.control.nombre_espec = data.NOMBRE;
            })
            .catch((err) => {
                console.log(err, "err");
                datos_HCI8001.control.nombre_espec = '';
            });

        await imprimirDiagnostico_HCI8001();
    }

    await imprimirAnalisis_HCI8001();
    await imprimirPlan_HCI8001();
    await imprimirFirma_HCI8001();

    inicializarFormatoBase_impHc();
    await _imprimirCitologia_8001(datos_HCI8001);
    if ($_HCI8001.opciones.opc_resu != 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
            content: formatoBaseImp_Hc
        }).catch((err) => {
            console.error(err);
        })
    }
}

async function imprimirDiagnostico_HCI8001() {
    for (var i in $_HCI8001._hcprc.rips.tabla_diag) {
        if ($_HCI8001._hcprc.rips.tabla_diag[i].diagn.trim() != '') {
            await datos_HCI8001.diagnosticos.push($_HCI8001._hcprc.rips.tabla_diag[i].diagn + ' - ' + $_HCI8001._hcprc.rips.tabla_diag[i].descrip);
        }
    }
}

async function imprimirAnalisis_HCI8001() {
    datos_HCI8001.analisis = $_HCI8001.dato_7501 ? $_HCI8001.dato_7501.replace(/\&/g, "\n").trim() : '';
}

async function imprimirPlan_HCI8001() {
    datos_HCI8001.plan = $_HCI8001.dato_7503 ? $_HCI8001.dato_7503.replace(/\&/g, "\n").trim() : '';
}

async function imprimirFirma_HCI8001() {
    datos_HCI8001.medico = {};
    datos_HCI8001.medico.firma = parseFloat($_HCI8001._hcprc.med.trim());
    datos_HCI8001.medico.nombre = $_HCI8001._hcprc.descrip_med;
    datos_HCI8001.medico.espec = $_HCI8001._hcprc.descrip_espec_med;
    datos_HCI8001.medico.reg = $_HCI8001._hcprc.reg_med;
    datos_HCI8001.medico.id = parseFloat($_HCI8001._hcprc.med.trim());
}