// JS MANEJO DATOS ARCHIVO ARCHIVO-NUMERACION - GET_NUM.DLL
//10/12/2021 David.M: Creación

function getObjRegNum() {
  return {
    llave: {
      prefijo: "",
      nro: "",
    },
    llave_ele: {
      prefijo_ele: "",
      nro_ele: "",
    },
    sucur: "",
    convenio: "",
    estado: "",
    nit: "",
    descrip: "",
    nombre_pac: "",
    id_pac: "",
    hab: "",
    clasif: "",
    fecha_ing: "",
    fecha_ret: "",
    fecha_pre: "",
    observ: "",
    anexos: "",
    nro_hist: "",
    radicacion: "",
    est_cob: "",
    c_costo: "",
    servicio: "",
    division: "",
    hora_ing: "",
    dias_est: "",
    diag_ing: "",
    diag_sal: "",
    estad_sal: "",
    remite: "",
    ciu_remite: "",
    diag_muer: "",
    hora_ret: "",
    ctl_nropaci: "",
    nivel_cups: "",
    per_cont_rad: "",
    cta_pic: "",
    div: "",
    forma_copag: "",
    red_exter: "",
    tipo_evento: "",
    oper_bol: "",
    fech_bol: "",
    hora_bol: "",
    fecha_farma: "",
    hora_farma: "",
    oper_farma: "",
    tipo_paci: "",
    contrato_ant: "",
    control_cap: "",
    fact_capit: {
      pre_capit: "",
      nro_capit: "",
    },
    glosa: "",
    resp_glosa: "",
    glosa_disc: "",
    trasl_glosa: "",
    carta_glo: "",
    entra_remit: "",
    orig_remit: "",
    tipo_fac: "",
    unserv: "",
    porc_retenc: "",
    envio: "",
    seg_rips: "",
    detalle: "",
    det_cartera: "",
    copago_est: "",
    porcent_copago: "",
    co_pagos: "",
    envio_furips: "",
    fecha_glosa: "",
    contrato: "",
    cis: "",
    nro_autori: "",
    fecha_repre: "",
    myt: "",
    ciudad: "",
    fecha_radglo: "",
    radicado_exter: "",
    control_x_serv: "",
    control_cl_0: "",
    control_cl_1: "",
    control_cl_2: "",
    control_cl_3: "",
    control_cl_4: "",
    control_cl_5: "",
    control_cl_6: "",
    control_cl_7: "",
    art_iva: "",
    llave_salid: {
      per_salid: "",
      nro_salid: "",
    },
    fecha_env: "",
    nombre_ipsant: "",
    vlr_ipsant: "",
    vlrcop_ipsant: "",
    control_x_diag: "",
    fecha_ing_aut: "",
    hora_ing_aut: "",
    fecha_ret_aut: "",
    hora_ret_aut: "",
    fecha_elec_rad: "",
    estado_elec: "",
    aproba_elec: "",
    cufe_elec: "",
    copago_pgp: "",
    levant_glosa: "",
    vlr_lev_glosa: "",
    fecha_lev_glosa: "",
    hora_fact_arma: "",
    docum_fact_arma: "",
    fecha_fact_arma: "",
    docum_arma_fact: "",
    fecha_arma_fact: "",
    docum_arma_radi: "",
    fecha_arma_radi: "",
    docum_radi_arma: "",
    fecha_radi_arma: "",
    nro_pol: "",
    fecha_radico: "",
    oper_radico: "",
    elenvio: "",
    fecha_elenv: "",
    seg_elenv: "",
    convid19: "",
    nopbs: "",
    nro_notacre: {
      sucur_nota: "",
      nro_nota: "",
    },
    comporta: "",
    fecha_ing_consupoli: "",
    fecha_ret_consupoli: "",
    fecha_vence: "",
    list_rips: "",
    fecha_elim_rips: "",
    oper_elim_rips: "",
    copago_tipo1: "",
    copago_tipo2: "",
    oper_mod: "",
    func_autor_ing: "",
    observ_cre: "",
    hora_cre: "",
    tabla_fact: JSON.parse(
      JSON.stringify(
        Array(20).fill({
          fecha_fact: "",
          vlr_fact: "",
        })
      )
    ),
    tabla_rbos: JSON.parse(
      JSON.stringify(
        Array(50).fill({
          fecha_abon: "",
          secu_abon: {
            lote_abon: "",
            nro_abon: "",
            sec_abon: "",
          },
          vlr_abon: "",
        })
      )
    ),
    oper: "",
    fecha_cre: "",
    fecha_mod: "",
    oper_bloq: "",
    tabla_num2: JSON.parse(
      JSON.stringify(
        Array(150).fill({
          condic_num2: "",
        })
      )
    ),
  };
}

module.exports = { getObjRegNum };