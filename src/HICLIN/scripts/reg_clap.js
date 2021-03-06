// JS MANEJO DATOS ARCHIVO CLAP
//02/09/2021 GABY: creación

function getObjRegCLAP() {
  return {
    llave: "",
    novedad: "",
    folio: "",
    fecha: "",
    hora: "",
    med_abre: "",
    descrip_med_abre: "",
    raza: "",
    descrip_etnia_paci: "",
    alfab: "",
    estud: "",
    vive_sola: "",
    lug_ctr_prenatal: "",
    lug_part_aborto: "",
    nefropatia: "",
    an_may_niv_est: "",
    antecedentes_familiares: {
      tbc_fam: "",
      diab_fam: "",
      hiper_fam: "",
      preeclam_fam: "",
      eclam_fam: "",
      otros_fam: "",
      descr_otros_fam: "",
    },
    antecedentes_personales: {
      tbc_per: "",
      diab_per: "",
      hiper_per: "",
      preeclam_per: "",
      eclam_per: "",
      otros_per: "",
      descr_otros_per: "",
    },
    cirugia: "",
    infertil: "",
    vih: "",
    cardio: "",
    condic: "",
    obstetricos: {
      gestas: "",
      abortos: "",
      vaginal: "",
      nacivivo: "",
      viven: "",
      partos: "",
      cesareas: "",
      nacimuer: "",
      muert1ra: "",
      muert2da: "",
      gemelare: "",
      consecut3: "",
      peso_ultprev: "",
      ectopico: "",
    },
    embar_planeado: "",
    fecha_fin: "",
    met_antico: "",
    gest_act: {
      peso_ant_gest: "",
      talla_gest: "",
      edad_gest: {
        sema_edad: "",
        dias_edad: "",
        ecog_men20sem: "",
      },
      fum: "",
      fpp: "",
      eg_confia: "",
      inmuniza: "",
      gamaglob_anti_d: "",
      cervix: {
        insp: "",
        pap: "",
        colp: "",
      },
      antiteta: {
        vigen_ant: "",
        prim_dosis: "",
        seg_dosis: "",
      },
      antirube: "",
      ex_normal: {
        odont: "",
        mamas: "",
      },
      malaria: "",
      bacteriu: "",
      chagas: "",
      toxoplasmosis: {
        sem1_igg: "",
        sem2_igg: "",
        primera_cons_igm: "",
      },
      citolog: "",
      colposc: "",
      vihs: "",
      vdrl1: "",
      sifilis: "",
      vdrl2: "",
      hb_sem1: "",
      folatos: "",
      hb_sem2: "",
      estrepto: "",
      pelviana: "",
    },
    tabla_gest: [
      // occurs 11
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
      {
        ano_gest: "",
        mes_gest: "",
        dia_gest: "",
        edad_gest: "",
        peso_gest: "",
        pa1_gest: "",
        pa3_gest: "",
        alt_uteri_gest: "",
        present_gest: "",
        latid_fetal_gest: "",
        mov_fetal_gest: "",
        prote_gest: "",
        sign_alarm_gest: "",
        ano_prox_cita_gest: "",
        mes_prox_cita_gest: "",
        dia_prox_cita_gest: "",
        tecn_gest: "",
      },
    ],
    eva_clin: {
      angulo_subp: "",
      espina_ciat: "",
      pared_pelv: "",
      incli_sacro: "",
      promontorio: "",
      diam_bitubero: "",
      pronostico: "",
      parto: "",
      carne: "",
    },
    datos_parto: {
      aborto: "",
      fec_ingreso: "",
      consul_pre: "",
      hospit_emb: "",
      sem_ini: "",
      hr_rupt_part: "",
      rupt_memb: "",
      corticoides_ante: "",
      inicio: "",
      rupt_memb_anteparto: {
        fecha_rup: "",
        hora_rup: "",
        min_rup: "",
        menor_37sem: "",
        mayor_18hs: "",
        temp_may18: "",
      },
      sem_fum_ed: "",
      presentacion: "",
      tamano_fetal: "",
      fum_eco_p_a: "",
      acompanan_tdp: "",
      enfermedades: {
        ninguna: "",
        hta_prev: "",
        hta_indu: "",
        pre_ecla: "",
        eclampsia: "",
        cardiop: "",
        diabete: "",
        infe_ovul: "",
        infe_urin: "",
        amen_part: "",
        rciu: "",
        rotu_prem: "",
        anemia: "",
        hemorr: "",
        primer_trim: "",
        segundo_trim: "",
        tercer_trim: "",
        postpar: "",
        infpuer: "",
        nefropatia_enf: "",
        otra_cond_enf: "",
        tabla_enfermedades: [
          { codigo: "", descrip: "" },
          { codigo: "", descrip: "" },
          { codigo: "", descrip: "" },
        ],
        notas_enf: "",
      },
      trabajo_parto: [
        // occurs 4
        {
          hora_par: "",
          min_par: "",
          compan_par: "",
          posici_par: "",
          pa_puls_par1: "",
          pa_puls_par3: "",
          contr_par: "",
          pulso_par: "",
          dilata_par: "",
          alturp_par: "",
          vari_po_par: "",
          meconi_par: "",
          fcf_dip_par: "",
        },
        {
          hora_par: "",
          min_par: "",
          compan_par: "",
          posici_par: "",
          pa_puls_par1: "",
          pa_puls_par3: "",
          contr_par: "",
          pulso_par: "",
          dilata_par: "",
          alturp_par: "",
          vari_po_par: "",
          meconi_par: "",
          fcf_dip_par: "",
        },
        {
          hora_par: "",
          min_par: "",
          compan_par: "",
          posici_par: "",
          pa_puls_par1: "",
          pa_puls_par3: "",
          contr_par: "",
          pulso_par: "",
          dilata_par: "",
          alturp_par: "",
          vari_po_par: "",
          meconi_par: "",
          fcf_dip_par: "",
        },
        {
          hora_par: "",
          min_par: "",
          compan_par: "",
          posici_par: "",
          pa_puls_par1: "",
          pa_puls_par3: "",
          contr_par: "",
          pulso_par: "",
          dilata_par: "",
          alturp_par: "",
          vari_po_par: "",
          meconi_par: "",
          fcf_dip_par: "",
        },
      ],
      vivo_nac: "",
      muert_nac: "",
      ante_parto_nac: "",
      ignor_nac: "",
      hor: "",
      minu: "",
      fecha_dia2: "",
      multip_fetos: "",
      orden_mul: "",
      posic_parto: "",
      cups: "",
      desgarros: "",
      ocitocicos_oci: {
        prelumb_oci: "",
        poslumb_oci: "",
      },
      placenta: {
        comple_pla: "",
        reteni_pla: "",
      },
      ligad_cord: "",
      medic_recibida: {
        med_ocioto: "",
        med_antib: "",
        med_analge: "",
        med_anest: "",
        med_anest_regi: "",
        med_transf: "",
        med_otros: "",
        med_anest_total: "",
      },
      recienacido: {
        rec_sexo: "",
        rec_peso: "",
        rec_percef: "",
        rec_longit: "",
        rec_eg_conf: {
          conf_sem: "",
          conf_dia: "",
        },
        fum_eco_rn: "",
        peso_eg: "",
        apgar: "",
        primermin: "", // en fd es 1ERMIN-CLAP
        quintomin: "", // en fd es 5TOMIN-CLAP
        o2: "",
        mascar: "",
        tubo: "",
        masaje: "",
        adrena: "",
        fallec: "",
        aspiracion: "",
        estimulacion: "",
      },
      atendi: {
        med_parto: "",
        descrip_med_parto: "",
        atiende_med_parto: "",
        med_neona: "",
        descrip_med_neona: "",
        atiende_med_neona: "",
      },
    },
    observaciones: "",
    datos_parto_2: {
      egreso_materno: {
        viva_eg_mt: "",
        fallece_eg_mt: "",
        traslado_eg_mt: "",
        fecha_eg_mt: "",
        fallec_trasl_eg_mt: "",
        lugar_trasl_eg_mt: "",
        dias_desde_parto: "",
        responsable_eg_mt: "",
        descrip_responsable_eg_mt: "",
        anticoncepcion: {
          consejeria: "",
          metodo_ant: "",
        },
      },
      egreso_rn: {
        vivo_eg_rn: "",
        fallece_eg_rn: "",
        traslado_eg_rn: "",
        hora_eg_rn: "",
        min_eg_rn: "",
        fecha_eg_rn: "",
        fallec_trasl_eg_rn: "",
        lugar_trasl_eg_rn: "",
        edad_eg_rn: "",
        aliment_eg_rn: "",
        boca_arriba_eg_rn: "",
        bcg_eg_rn: "",
        peso_eg_rn: "",
        id_eg_rn: "",
        nombre_rn: {
          apellido1_rn_cm: "",
          apellido2_rn_cm: "",
          nombre1_rn_cm: "",
          nombre2_rn_cm: "",
        },
        reponsable_rg_rn: "",
        descrip_responsable_rg_rn: "",
      },
      reciennacido2: {
        antirubeola_pospart: "",
        gamaglob_ant_d_rec: "",
        puerperio: [
          // OCCURS 3
          {
            dia_puer: "",
            hora_puer: "",
            temp_puer: "",
            pa_puer1: "",
            pa_puer2: "",
            pulso_puer: "",
            invol_uter_puer: "",
            loquios_puer: "",
          },
          {
            dia_puer: "",
            hora_puer: "",
            temp_puer: "",
            pa_puer1: "",
            pa_puer2: "",
            pulso_puer: "",
            invol_uter_puer: "",
            loquios_puer: "",
          },
          {
            dia_puer: "",
            hora_puer: "",
            temp_puer: "",
            pa_puer1: "",
            pa_puer2: "",
            pulso_puer: "",
            invol_uter_puer: "",
            loquios_puer: "",
          },
        ],
        meconio_rec: "",
        tsh_rec: "",
        hbpatia_rec: "",
        bilirubina_rec: "",
        toxo_igm_rec: "",
        vdrl_rec: "",
        trat_vdrl_rec: "",
        enf_rec: [
          { codigo: "", descrip: "" },
          { codigo: "", descrip: "" },
          { codigo: "", descrip: "" },
        ],
        def_congen_men: "",
        def_congen_may: "",
        cod_def_congen: "",
        referido: "",
      },
    },
    det_partograma: "",
    grado_desg: "",
    cod_oper: "",
    cod_induc: "",
    ind_prin_induc_oper: "",
    episiotomia_nac: "",
    termin_part_nac: "",
    notrep_men20sem: "",
    sem_notrep_men20: "",
    notrep_may20sem: "",
    sem_notrep_may20: "",
    trep_men20sem: "",
    sem_trep_men20: "",
    trep_may20sem: "",
    sem_trep_may20: "",
    trat_men20sem: "",
    sem_trat_men20: "",
    trat_may20sem: "",
    sem_trat_may20: "",
    tto_pareja_men20sem: "",
    tto_pareja_may20sem: "",
    bacte_men20sem: "",
    bacte_may20sem: "",
    cons_lact_mat: "",
    prep_part: "",
    fe: "",
    vihs_men20sem: "",
    vihr_men20sem: "",
    vihs_may20sem: "",
    vihr_may20sem: "",
    glucemia_men20sem: "",
    glucemia_may30sem: "",
    violencia: "",
    tabla_trim: [
      { fuma_act: "", fuma_pas: "", drogas: "", alcohol: "", violencia: "" },
      { fuma_act: "", fuma_pas: "", drogas: "", alcohol: "", violencia: "" },
      { fuma_act: "", fuma_pas: "", drogas: "", alcohol: "", violencia: "" },
    ],
    estado: "",
    oper_cier: "",
    fech_cier: "",
    oper_corr: "",
    fech_corr: "",
  };
}

async function grabarRegClap(reg) {
  return new Promise(async (resolve, reject) => {
      let datos = {
        ...reg,
        datosh: datosEnvio(),
      };
      console.log(datos);

      await postData(datos, get_url("APP/HICLIN/SAVE_CLAP.DLL"))
        .then((data) => {
          console.log(data)
          // CON851("", `Detalle ${dll} grabada con exito`, null, "success", "Success");
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          // CON851("", `Error grabando detalle ${dll}`, null, "error", "Error");
          reject(err);
        });
  });
}

module.exports = {
  getObjRegCLAP,
  grabarRegClap
};
