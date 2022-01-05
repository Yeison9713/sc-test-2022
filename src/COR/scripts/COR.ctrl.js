/**
 * @developer  Jhohan.S  "jhohanf.silva@gmail.com"
 * @author     SC-PROSOFT
 * @descrip    Funciones de uso  Común / global, para el módulo de CORESPONDENCIA.
 *
 **/

/*---------------------------------- R U T I N A S-------------------------------*/
const dir_dll = {
  servicios: 'APP/COR/CORR865.DLL', //CORR865 Dependencias | Cod.servicio
  dependencias: 'APP/COR/CORR866.DLL', //CORR866-Dependencias
  tipos: 'APP/COR/CORR867.DLL', //CORR867 Tipos Correspondencia
  aux_tipos: 'APP/COR/CORR871.DLL', //CORR871 Auxiliares Tipo Correspondencia
  und_funcionales: 'APP/COR/CORR876.DLL', //CORR876 Unidades Funcionales
  dependencias_remit: 'APP/COR/CORR879.DLL', //CORR879 Dependencias Remitentes
  holding: 'APP/COR/CORR885.DLL', //CORR885 holding empresarial
  cargos_ops: 'APP/COR/CORR888.DLL', //CORR888 Cargos OPS
  terceros: 'APP/COR/CON802.DLL', // Terceros
  centro_costos: 'APP/CONTAB/CON803.DLL', // Centro de costos
  correspondencia: 'APP/COR/CORR868.DLL', // Correspondencia
  oper_sistema: 'APP/CONTAB/CON982.DLL', //CON982 Operadores sistema seguridad
  macros: 'APP/COR/CORR875.DLL', //CORR875 Macros Correspondencia
  respuestas: 'APP/COR/CORR881.DLL', //CORR881 Respuesta Correspondencia
}

function get(programa) {
  return new Promise((resolve, reject) => {
    let dll = dir_dll[programa] || false

    if (dll) consulta(dll).then(resolve).catch(reject)
  })
}

let consulta = (dll) => {
  return new Promise((resolve, reject) => {
    postData({ datosh: datosEnvio() }, get_url(dll)).then((data) => {
      resolve(data)
    })
  })
}

const format_estado = (codigo) => {
  switch (parseInt(codigo) || 0) {
    case 1:
      return 'EN TRAMITE'
    case 2:
      return 'VENCIDA'
    case 3:
    case 4:
      return 'RESUELTA'
    case 5:
      return 'PRORROGA'
    case 6:
      return 'ANULADO'
    default:
      return ''
  }
}

const CORR201P = (data) => {
  return new Promise((resolve, reject) => {
    const usuario = $_USUA_GLOBAL[0]

    var content = {
      defaultStyle: {
        fontSize: 10,
      },
      pageSize: {
        width: 350,
        height: 'auto',
      },
      pageMargins: [10, 10, 10, 0],
      content: [
        {
          columns: [
            {
              width: '60%',
              stack: [
                {
                  text: usuario.NOMBRE.toUpperCase(),
                  bold: true,
                },
                {
                  text: [
                    {
                      text: `${data.cod_serco} - ${data.descrip_servicio_w}`,
                      bold: true,
                    },
                  ],
                },
                {
                  text: `Al contestar cite este no. ${data.cont_llave}-E`.toUpperCase(),
                  bold: true,
                },
              ],
            },
            {
              width: '40%',
              alignment: 'right',
              stack: [
                {
                  text: `${data.fecha_format.toUpperCase()} ${
                    data.hora_format
                  }`,
                  bold: true,
                },
                {
                  text: [
                    { text: 'Folio:', bold: true },
                    `${data.folio} de ${data.folio_d}`,
                  ],
                },
                {
                  text: [{ text: 'Tipo:', bold: true }, data.descrip_tipo_w],
                },
              ],
            },
          ],
        },
        {
          margin: [0, 0, 0, 0],
          width: 230,
          height: 50,
          alignment: 'center',
          image: 'barras',
        },
      ],
      codigo_barras: {
        barras: {
          text: data.cont_llave + '-E',
          options: {
            width: 230,
            height: 50,
            displayValue: false,
          },
        },
      },
    }

    _impresion2({
      tipo: 'pdf',
      archivo: `${
        localStorage.Usuario + moment().format('-YYMMDD-HHmmss')
      }.pdf`,
      content,
    })
      .then(resolve)
      .catch(reject)
  })
}

const CORR405P = (data = {}) => {
  return new Promise((resolve, reject) => {
    const usuario = $_USUA_GLOBAL[0]

    var content = {
      defaultStyle: {
        fontSize: 10,
      },
      pageSize: {
        width: 350,
        height: 'auto',
      },
      pageMargins: [10, 10, 10, 0],
      content: [
        {
          columns: [
            {
              width: '60%',
              stack: [
                {
                  text: usuario.NOMBRE.toUpperCase(),
                  bold: true,
                },
                {
                  text: usuario.NIT,
                },
                {
                  text: [
                    {
                      text: 'Nro. radicado salida:  ',
                      bold: true,
                    },
                    data.llave + '-S',
                  ],
                },
                {
                  text: `Referencia: ` + data.asunto,
                  bold: true,
                },
              ],
            },
            {
              width: '40%',
              alignment: 'right',
              stack: [
                {
                  text: `${data.fecha_format.toUpperCase()} ${
                    data.hora_format
                  }`,
                  bold: true,
                },
                {
                  text: [
                    { text: 'Origen:', bold: true },
                    data.descrip_responsable,
                  ],
                },
                {
                  text: [
                    { text: 'Destino:', bold: true },
                    data.descrip_destino,
                  ],
                },
              ],
            },
          ],
        },
        {
          margin: [0, 0, 0, 0],
          width: 230,
          height: 50,
          alignment: 'center',
          image: 'barras',
        },
      ],
      codigo_barras: {
        barras: {
          text: data.llave + '-S',
          options: {
            width: 230,
            height: 50,
            displayValue: false,
          },
        },
      },
    }

    _impresion2({
      tipo: 'pdf',
      archivo: `${
        localStorage.Usuario + moment().format('-YYMMDD-HHmmss')
      }.pdf`,
      content,
    })
      .then(resolve)
      .catch(reject)
  })
}

function enviar_correspondencia(listado) {
  return new Promise((resolve, reject) => {
    const envio = new FormData()
    envio.append('listado', JSON.stringify(listado))

    fetch(get_url('app/inc/email.COR.php'), {
      method: 'POST',
      body: envio,
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject)
  })
}

function init_datos_w() {
  return {
    fecha_w: {},
    nit_w: null,
    dptoremi_w: null,
    tipo_corres_w: null,
    cod_auxco_w: null,
    descrip_w: null,
    serv_w: null,
    dep_w: null,
    fol_w: null,
    fold_w: null,
    anex_w: null,
    tipo_anexo_w: null,
    nro_fact_w: null,
    monto_w: null,
    fecha_fact_w: {},
    fecha_entre_w: {},
    centro_cos_w: null,
    nro_guia_w: null,
    persentre_w: null,
    observ_w: null,
    otro_anexo_w: null,
    dias_max: null,
    med_ingreso_w: null
  }
}

function init_resp_w() {
  return {
    ano_llave_w: null,
    cont_w: null,
    nit_w: null,
    dptoremi_w: null,
    proceden_w: null,
    sw_radi_w: null,
    tipo_corres_w: null,
    cod_auxco_w: null,
    serv_w: null,
    dep_w: null,
    asunto_w: null,
    fecha_w: null,
    hora_w: null,
    cl_macro_w: null,
    codigo_macro_w: null,
    respuesta_w: null,
    firma_w: null,
    respon_w: null,
    cargo_w: null,
    med_resp_w: null,
    nro_fact_w: null,
    nro_guia_w: null,
    persentre_w: null,
  }
}

module.exports = {
  get,
  format_estado,
  CORR201P,
  CORR405P,
  enviar_correspondencia,
  init_datos_w,
  init_resp_w,
}
