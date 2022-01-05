/** @format */

'use strict';
/**
 * @developer Pablo.O "pabloolguin@prosoft.com.co"
 * @author    SC-PROSOFT
 * @descrip   JS MANEJO ARCHIVOS MANTENIMIENTO EQUIPOS / VEHICULOS.
 **/

/*
- FD-MANHO   : ARCHIVO-HOJAVIDA-MAN     - get_hojadevida_mant
- FD-MANSO   : ARCHIVO-SOLICITUD-MAN    - get_solicitud_mant
- FD-MANPR   : ARCHIVO-PRODUCCION-MANT  - get_produccion_mant
- FD-MANRE   : ARCHIVO-MANT-REALIZADO   - get_mant_realizado
- FD-MANCONS : ARCHIVO-CONSUMOS-MANT    - get_consumos_mant
- FD-USOAR   : ARCHIVO-USO              - get_uso_mant
- FD-MACRP   : ARCHIVO-MACRO-PROTOCOLO  - get_macro_protocolo_mant
- FD-MANDES  : ARCHIVO-DESPACHOS        - get_despachos_mant
*/
function get_hojadevida_mant() {
  // REG-HOMAN
  return JSON.parse(
    JSON.stringify({
      cod: {
        llave_grupo: '',
        tipo: '',
        grupo: '',
        numero: '',
        clase: '',
      },
      datos_homan: {
        fecha_compra: '',
        fecha_garant: '',
        fecha_fabric: '',
        id_proveed: '',
        forma_adq: '',
        uso: '',
        modelo: '',
        serial: '',
        clase_tecn1: '',
        clase_tecn2: '',
        clase_tecn3: '',
        fuente_ali1: '',
        fuente_ali2: '',
        fuente_ali3: '',
        voltaje: '',
        amperaje: '',
        potencia: '',
        frecuencia: '',
        periodo_mant: '',
        resp: '',
        protoc_mant: '',
        estado_eq: '',
        observ: '',
        prov_mant: '',
        ult_ubic: '',
        tabla_compon: Array(20).fill({
          descrip: '',
          marca: '',
          model: '',
          serie: '',
        }),
        fecha_baja: '',
        vida_util: '',
        hr_km_mant: '',
        fecha_ultmant: '',
        hr_km_ultmant: '',
        fecha_antmant: '',
        hr_km_antmant: '',
        oper_modi: '',
        fecha_modi: '',
        tecnovig: '',
        manual: '',
        idioma_manual: '',
        uso_especif: '',
      },
    }),
  );
}

function get_consumos_mant() {
  // REG-MANCONS
  return JSON.parse(
    JSON.stringify({
      llave: '',
      datos_mancons: {
        fecha: '',
        llave_grupo: '',
        numero: '',
        clase: '',
      },
      otros_datos: {
        operario: '',
        hr_km: '',
        tabla_mancons: Array(10).fill({
          prod_tipo: '',
          prod_grp: '',
          prod_nro: '',
          prod_cl: '',
          cant: '',
          vlr: '',
        }),
        observ: '',
        oper_modi: '',
        fecha_modi: '',
      },
    }),
  );
}

function get_localizacion() {
  // REG-LOCAL
  return JSON.parse(
    JSON.stringify({
      cod: {
        // LLAVE1-LOC {
        cod1: '',
        cod2: '',
        // }
        cod3: '',
        cod4: '',
      },
      nombre: '',
      datos_local: {
        llave_alt1: '',
        nombre_resp: '',
        restric: '',
        c1_costo: '',
        c2_costo: '',
        llave_alt2: '',
      },
    }),
  );
}
// Desde aqui
function get_solicitud_mant() {
  // REG-SOMAN
  return JSON.parse(
    JSON.stringify({
      llave: '',
      datos_soman: {
        cod: {
          llave_grupo: '',
          numero: '',
          clase: '',
        },
        fecha: '',
        hora: '',
        problem: '',
        prioridad: '',
        respu: '',
        estado: '',
        tipo_serv: '',
        oper_modi: '',
        fecha_modi: '',
      },
    }),
  );
}

function get_mant_realizado() {
  // REG-MANRE
  return JSON.parse(
    JSON.stringify({
      llave: '',
      datos_manre: {
        tipo_mant: '',
        nro_sol: '',
        fecha_sol: '',
        cod: {
          llave_grupo: '',
          numero: '',
          clase: '',
        },
        fecha: '',
        hora: '',
        protocolo: '',
        actividad: '',
        repuestos: '',
        estado: '',
        problem: '',
        respon_veh: '',
        respons_repar: '',
        oper_crea: '',
        fecha_crea: '',
        oper_modi: '',
        fecha_modi: '',
      },
    }),
  );
}

function get_produccion_mant() {
  // REG-MANPR
  return JSON.parse(
    JSON.stringify({
      llave: '',
      datos_manpr: {
        fecha: '',
        evento: '',
        cod: {
          llave_grupo: '',
          numero: '',
          clase: '',
        },
        operario: '',
        otros_datos: {
          tabla_prod: Array(50).fill({
            prod_tipo: '',
            prod_grp: '',
            prod_nro: '',
            prod_cl: '',
            m3: '',
            ciu_dest: '',
            sit_dest: '',
            cant_viaj_cor: '',
            cant_viaj_lar: '',
          }),
          hr_km_ini: '',
          hr_km_fin: '',
          cant_hr_km: '',
          jornada: '',
          hr_diu: '',
          hr_noc: '',
          cant_hr_noc: '',
          m3_tot: '',
          observ: '',
          oper_modi: '',
          fecha_modi: '',
        },
      },
    }),
  );
}

function get_uso_mant() {
  // REG-REG-USO
  return JSON.parse(
    JSON.stringify({
      llave: '',
      descrip: '',
      vida_util: '',
      porc_dep: '',
      cta_costo: '',
    }),
  );
}

function get_macro_protocolo_mant() {
  // REG-MACROPR
  return JSON.parse(
    JSON.stringify({
      llave: '',
      detalle: '',
      reng_macropr: '',
      oper: '',
      fech_oper: '',
    }),
  );
}

function get_despachos_mant() {
  // REG-DESPACHOS
  return JSON.parse(
    JSON.stringify({
      llave: '',
      fecha: '',
      nit: '',
      tabla_despa: Array(10).fill({
        cod_art: {
          llave_grupo: '',
          numero: '',
          clase: '',
        },
        cantidad: '',
        valor: '',
      }),
      valores: {
        vlr_unit: '',
        distancia: '',
        cant_flete: '',
        vlr_flete: '',
        vlr_ant: '',
        vlr_tot: '',
      },
      otros_datos_desp: {
        vendedor: '',
        placa: '',
        conductor: '',
        ord_pedi: '',
        detalle1: '',
        detalle2: '',
        detalle3: '',
        paga: '',
        fact: '',
        almacen: '',
        destino: '',
        lug_pago: '',
        admin_cor: '',
        fec_cor: '',
        admin: '',
        fec_rest: '',
      },
    }),
  );
}

// Funciones Consultas archivos MANTENIMIENTO

function get_datosgrupo(grupo) {
  let datos_envio = {datosh: datosEnvio(), filtro: grupo};
  let retorno = false;
  return new Promise(async (resolve, reject) => {
    await postData(datos_envio, get_url('APP/INVENT/INV804.DLL'))
      .then((data) => {
        data['GRUPOS'] != {} ? (retorno = data['GRUPOS']['DESCRIP']) : (retorno = {});
      })
      .catch((e) => {
        retorno = {Error: 'No se ha encontrado el grupo: ' + datos_envio['filtro']};
      });
    resolve(retorno);
    reject(retorno);
  });
}

function get_datosarticulo(cod) {
  cod = cod.toString();
  let retorno = false;
  let datos_envio = {datosh: datosEnvio() + cod.padEnd(15, ' ') + '||'};
  return new Promise(async (resolve, reject) => {
    await postData(datos_envio, get_url('APP/INVENT/INV803-01.DLL'))
      .then((data) => {
        data['ARTICULOS'][0] != {}
          ? (retorno = {
              cod: cod,
              descrip: data['ARTICULOS'][0]['DESCRIP_ART'],
              unid_conv: data['ARTICULOS'][0]['UNIDCONV_ART'],
            })
          : (retorno = {cod: cod, descrip: ' ', unid_conv: ' '});
        resolve(retorno);
      })
      .catch((e) => {
        retorno = {Error: 'No se ha encontrado El articulo ', cod, e};
        reject(retorno);
      });
  });
}

function get_datosgrupo(grupo) {
  let datos_envio = {datosh: datosEnvio(), filtro: grupo};
  let retorno = false;
  return new Promise(async (resolve, reject) => {
    await postData(datos_envio, get_url('APP/INVENT/INV804.DLL'))
      .then((data) => {
        data['GRUPOS'] != {} ? (retorno = data['GRUPOS']['DESCRIP']) : (retorno = {});
        resolve(retorno);
      })
      .catch((e) => {
        retorno = {Error: 'No se ha encontrado el grupo: ' + datos_envio['filtro'], e};
        reject(retorno);
      });
  });
}

function get_datostercero(oper) {
  let datos_envio = {datosh: datosEnvio() + '8' + '|' + oper};
  let retorno = false;
  return new Promise(async (resolve, reject) => {
    await postData(datos_envio, get_url('APP/CONTAB/CON802_01.DLL'))
      .then((data) => {
        data['TERCER'][0] != {} ? (retorno = data['TERCER'][0]['DESCRIP_TER']) : (retorno = {});
        resolve(retorno);
      })
      .catch((e) => {
        retorno = {Error: 'No se ha encontrado el tercero' + oper, e};
        reject(retorno);
      });
  });
}

function get_entradas_produccion() {}

function get_salidas_produccion() {}

module.exports = {
  get_hojadevida_mant,
  get_consumos_mant,
  get_localizacion,
  get_solicitud_mant,
  get_mant_realizado,
  get_produccion_mant,
  get_uso_mant,
  get_macro_protocolo_mant,
  get_despachos_mant,

  get_entradas_produccion,
  get_salidas_produccion,
  get_datosarticulo,
  get_datosgrupo,
  get_datostercero,
};
