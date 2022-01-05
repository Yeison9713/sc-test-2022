// 30-12-2020 - IMPRESION FORMULARIO VALE - DAVID.M - HICLIN

$_HCI9010 = [];

async function iniciar_HCI9010(rec, opciones, dataBase64) {
    $_HCI9010._ciudades = rec._ciudades;
    $_HCI9010._hcprc = rec._hcpac;
    $_HCI9010._detalles = rec._detalles;
    $_HCI9010._paci = rec.$_reg_paci;
    $_HCI9010.opciones = opciones;
    $_HCI9010._hcprc2 = rec.hcprc_new;

    $_HCI9010.dato_9010 = await $_HCI9010._detalles.find(e => e['COD-DETHC'] == '9010' && e['LLAVE-HC'] == $_HCI9010._hcprc.llave);
    $_HCI9010.dato_9010 != undefined ? $_HCI9010.dato_9010 = $_HCI9010.dato_9010.DETALLE : false;

    datos_HCI9010 = $_HCI9010.dato_9010;

    if ($_HCI9010.dato_9010) {
        // LLENAR ENCABEZADO

        datos_HCI9010.encabezado = {};
        datos_HCI9010.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
        datos_HCI9010.encabezado.nit = $_USUA_GLOBAL[0].NIT;
        datos_HCI9010.encabezado.titulo = 'FORMULARIO VALE';

        // LLENAR DATOS PACIENTE

        datos_HCI9010.paciente = {};
        datos_HCI9010.paciente = llenarPacienteAperturas2_impHc($_HCI9010._paci, $_HCI9010._hcprc2);
        // datos_HCI9010.paciente.nombre = $_HCI9010._paci.DESCRIP.replace(/\s+/g, ' ');
        // datos_HCI9010.paciente.tipoId = $_HCI9010._paci['TIPO-ID'];
        isNaN($_HCI9010._paci.COD) == true ? aux = $_HCI9010._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_HCI9010._paci.COD);
        datos_HCI9010.paciente.id = aux;
        // datos_HCI9010.paciente.edad = $_HCI9010._hcprc.edad;
        // $_HCI9010._paci.SEXO == 'F' ? datos_HCI9010.paciente.sexo = 'Femenino' : datos_HCI9010.paciente.sexo = 'Masculino';
        datos_HCI9010.paciente.fecha = $_HCI9010._hcprc.fecha.substring(6, 8) + '-' + $_HCI9010._hcprc.fecha.substring(4, 6) + '-' + $_HCI9010._hcprc.fecha.substring(0, 4);
        datos_HCI9010.paciente.hora = $_HCI9010._hcprc.hora.substring(0, 2) + ':' + $_HCI9010._hcprc.hora.substring(2, 4);

        var busqCiu = $_HCI9010._ciudades.find(e => e.COD.trim() == $_HCI9010._paci.CIUDAD.trim());
        (busqCiu) ? datos_HCI9010.paciente.municipio = busqCiu.NOMBRE.replace(/\s+/g, ' ') : datos_HCI9010.paciente.municipio = '';

        // datos_HCI9010.paciente.telefono = $_HCI9010._paci.TELEFONO;

        // LLENAR DATOS

        datos_HCI9010.total_resp_afi = 0;
        datos_HCI9010.resp_neg_compren = 0;
        datos_HCI9010.resp_neg_expres = 0;
        datos_HCI9010.resp_neg_interac = 0;
        datos_HCI9010.resp_neg_vesitb = 0;

        switch (datos_HCI9010.bb_reaccio_ruido) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.dif_llanto_bb) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.bb_succiona_fuerza) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.bb_reac_habla) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.bb_gira_cabez_ruido) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.bb_repite_sonidos) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.bb_rie_con_juegos) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.bb_dem_int_canto_hab) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.bb_emit_sonido_pedi) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.bb_emit_sonido_incom) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_dem_aten_hablan) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_imit_palab_nuev) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_cons_dif_alim) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_emit_sonido_pedi) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_muest_part_cuerp) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_imit_sonido_anim) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_toma_obj) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_eje_acc_basicas) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_pronu_nomb_obj) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_pide_obj_palb) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_ejec_ordenes) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_pron_mas_palab) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_acomp_gest_habla) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_uti_posesivos) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_exp_emoci_musica) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_cons_alim_duros) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_dem_int_jugar) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_resp_preg_hist) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_cuest_situ_nuev) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_exp_sent_per_cer) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_sab_rep_canc) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_exp_orac_4palb) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_sal_desp) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_ejec_acc_consec) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_habla_claridad) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_exp_opinion) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_ident_err_corri) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_compren += 1; break;
        }

        switch (datos_HCI9010.nn_uti_palb_abst) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_expres += 1; break;
        }

        switch (datos_HCI9010.nn_exp_arg_acu_desc) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_interac += 1; break;
        }

        switch (datos_HCI9010.nn_disf_act_fis) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_vesitb += 1; break;
        }

        switch (datos_HCI9010.nn_camina_correct) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_vesitb += 1; break;
        }

        switch (datos_HCI9010.nn_disf_vuelt_sin_caer) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_vesitb += 1; break;
        }

        switch (datos_HCI9010.nn_protege_cae) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_vesitb += 1; break;
        }

        switch (datos_HCI9010.nn_disf_juego_extre) {
            case 'S': datos_HCI9010.total_resp_afi += 1; break;
            case 'N': datos_HCI9010.resp_neg_vesitb += 1; break;
        }

        datos_HCI9010.total_resp_neg = parseInt(datos_HCI9010.resp_neg_compren) + parseInt(datos_HCI9010.resp_neg_expres) + parseInt(datos_HCI9010.resp_neg_interac) + parseInt(datos_HCI9010.resp_neg_vesitb);

        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
            content: _imprimirVale(datos_HCI9010),
        }).catch((err) => {
            console.error(err);
        });

        return $_HCI9010.data;
    } else {
        return null
    }
}