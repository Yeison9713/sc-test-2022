
// CREACION - SANTIAGO.F - DICIEMBRE 20/2020

// var $this;
var $_HC702R = [];
var diagnos_HC702R = [];

var nombre_oper_w;
var id_oper_w;

// var normalize = (function() {
//   var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
//       to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
//       mapping = {};

//   for(var i = 0, j = from.length; i < j; i++ )
//       mapping[ from.charAt( i ) ] = to.charAt( i );

//   return function( str ) {
//       var ret = [];
//       for( var i = 0, j = str.length; i < j; i++ ) {
//           var c = str.charAt( i );
//           if( mapping.hasOwnProperty( str.charAt( i ) ) )
//               ret.push( mapping[ c ] );
//           else
//               ret.push( c );
//       }      
//       return ret.join( '' );
//   }

// })();

async function _iniciarHC702R(json) {
  $_HC702R._datos = json;
  await inicializarDatos_HC702R();
  await abrirArchivos_HC702R();
  await llenarTitulos_HC702R();
  await llenarEncabezado_HC702R();
  await llenarDatosPrestador_HC702R();
  await llenarDatosPaciente_HC702R();
  await llenarDatosAcompa_HC702R();
  await llenarDatosProfesional_HC702R();
  await llenarAnalisis_HC702R();
  await llenarDiagnostico_HC702R();
  await imprimirDatosCovid_HC702();
  await llenarFirma_HC702R();
  await llamarImpresion_HC702R();

  if (localStorage.idOpciondata == "072") {
    await salir_HC702R();
  }
}


async function llenarTitulos_HC702R() {
  switch ($_HC702R._datos.tipo_epi) {
    case '2':
      datos.encabezado.titulo = 'FORMATO ESTANDARIZADO DE REFERENCIA DE PACIENTES';
      datos.titulos.titulo_prof = 'PROFESIONAL QUE SOLICITA LA REFERENCIA Y SERVICIO AL CUAL REMITE';
      break;
    case '3':
      datos.encabezado.titulo = 'FORMATO ESTANDARIZADO DE CONTRAREFERENCIA DE PACIENTES';
      datos.titulos.titulo_prof = 'PROFESIONAL QUE CONTRARREFIERE';
      break;
    default:
      datos.encabezado.titulo = 'TITULO DESCONOCIDO';
      datos.titulos.titulo_prof = 'FORMATO DESCONOCIDO';
      break;
  }
}

async function llenarEncabezado_HC702R() {
  datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
  datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

  datos.fecha_epi.ano = $_HC702R._datos.fecha_epi.substring(0, 4);
  datos.fecha_epi.mes = $_HC702R._datos.fecha_epi.substring(4, 6);
  datos.fecha_epi.dia = $_HC702R._datos.fecha_epi.substring(6, 8);

  datos.fecha_epi.hora = $_HC702R._datos.hora_epi.substring(0, 2);
  datos.fecha_epi.minutos = $_HC702R._datos.hora_epi.substring(2, 4);
}

async function llenarDatosPrestador_HC702R() {
  if ($_USUA_GLOBAL[0].NIT == 800175901 || $_USUA_GLOBAL[0].NIT == 19381427 || $_USUA_GLOBAL[0].NIT == 17306492 || $_USUA_GLOBAL[0].NIT == 31841010) {

  } else {
    datos.prestador.nombre = $_USUA_GLOBAL[0].NOMBRE
  }

  datos.prestador.nit = $_USUA_GLOBAL[0].NIT;
  datos.prestador.codigo = $_USUA_GLOBAL[0].COD_CIUD + $_USUA_GLOBAL[0].NIT + $_USUA_GLOBAL[0].PREFIJ;
  datos.prestador.direccion_prestador = $_USUA_GLOBAL[0].DIRECC_USU;

  switch ($_USUA_GLOBAL[0].COD_CIUD.substring(0, 2)) {
    case '50': datos.prestador.indicativo_tel = '098'; break;
    case '15': datos.prestador.indicativo_tel = '098'; break;
    case '97': datos.prestador.indicativo_tel = '098'; break;
    case '25': datos.prestador.indicativo_tel = '091'; break;
    case '11': datos.prestador.indicativo_tel = '091'; break;
  }

  datos.prestador.telefono = $_USUA_GLOBAL[0].TEL;

  $_HC702R._ciudad = $_HC702R._ciudades.find(e => e['COD'] == $_USUA_GLOBAL[0].COD_CIUD);
  if ($_HC702R._ciudad != undefined) {
    datos.prestador.municipio = $_HC702R._ciudad.NOMBRE;
    datos.prestador.departamento = $_HC702R._ciudad.DEPART;
  } else {
    datos.prestador.municipio = '';
    datos.prestador.departamento = '';
  }
}

async function llenarDatosPaciente_HC702R() {
  datos.paciente.nombre_paci = $_REG_PACI.DESCRIP.trim();

  switch ($_REG_PACI['TIPO-ID'].trim()) {
    case 'RC': datos.tipo_ident.registro_civil = 'X'; break;
    case 'TI': datos.tipo_ident.targeta_iden = 'X'; break;
    case 'CC': datos.tipo_ident.cedula_ciuda = 'X'; break;
    case 'CE': datos.tipo_ident.cedula_extranjeria = 'X'; break;

    case 'PA': datos.tipo_ident.pasaporte = 'X'; break;
    case 'ASI': datos.tipo_ident.adulto_sin_ident = 'X'; break;
    case 'MSI': datos.tipo_ident.menor_sin_ident = 'X'; break;
    case 'CD': datos.tipo_ident.carnet_diplomat = 'X'; break;

    case 'NUI': datos.tipo_ident.numero_unico_ident = 'X'; break;
    case 'SC': datos.tipo_ident.salvo_conduc = 'X'; break;
    case 'PE': datos.tipo_ident.permiso_perman = 'X'; break;
    case 'CN': datos.tipo_ident.certificado_nacid_vivo = 'X'; break;
  }

  datos.paciente.identificacion = parseInt($_REG_PACI['COD']);

  datos.paciente.fecha_naci = $_REG_PACI['NACIM'].substring(0, 4) + '/' + $_REG_PACI['NACIM'].substring(4, 6) + '/' + $_REG_PACI['NACIM'].substring(6, 8);
  datos.paciente.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad;
  datos.paciente.direccion = $_REG_PACI['DIRECC'];
  datos.paciente.telefono = $_REG_PACI['TELEFONO'].trim();

  $_HC702R._ciudadPaci = $_HC702R._ciudades.find(e => e['COD'] == $_REG_PACI['CIUDAD'].trim());
  if ($_HC702R._ciudadPaci != undefined) {
    datos.paciente.municipio = $_HC702R._ciudadPaci.NOMBRE;
    datos.paciente.departamento = $_HC702R._ciudadPaci.DEPART;
  } else {
    datos.paciente.municipio = '';
    datos.paciente.departamento = '';
  }

  // $_HC702R.busqEnt = $_HC702R._entidades.find(e => e['COD-ENT'] == $_REG_PACI.EPS);
  // if ($_HC702R.busqEnt != undefined) {
  //   $_HC702R.NOMBRE_ENT = $_HC702R.busqEnt['NOMBRE-ENT'];
  //   datos.paciente.nombre_ent = $_HC702R.NOMBRE_ENT;
  //   datos.paciente.cod_ent = $_HC702R.busqEnt['COD-ENT'];
  // } else {
  //   $_HC702R.NOMBRE_ENT = $_REG_PACI.EPS;
  //   datos.paciente.nombre_ent = '';
  //   datos.paciente.cod_ent = '';
  // }

  if ($_HC702R._hcprc.cierre.nit_fact == '' || $_HC702R._hcprc.cierre.nit_fact == '0000000000') {
    datos.paciente.nombre_ent = $_REG_PACI["NOMBRE-EPS"];
    datos.paciente.cod_ent = $_REG_PACI.EPS;
  } else {
    datos.paciente.nombre_ent = $_HC702R._hcprc.cierre.descrip_nit_fact;
    datos.paciente.cod_ent = $_HC702R._hcprc.cierre.nit_fact;
  }
}

async function llenarDatosAcompa_HC702R() {
  var acompa_cod = parseInt($_HC702R._datos.acompa_epi);
  if (acompa_cod != 0) {
    await llamarAcompaPaci_HC702R();
    if ($_HC702R.reg_pac != undefined) {
      datos.acompa.nombre_acompa = $_HC702R.reg_pac[0].DESCRIP;
      datos.acompa.identificacion = parseInt($_HC702R.reg_pac[0].COD);
      datos.acompa.direccion = $_HC702R.reg_pac[0].DIRECC;
      datos.acompa.telefono = $_HC702R.reg_pac[0].TELEFONO;

      switch ($_HC702R.reg_pac[0]['TIPO-ID'].trim()) {
        case 'RC': datos.tipo_ident_acompa.registro_civil = 'X'; break;
        case 'TI': datos.tipo_ident_acompa.targeta_iden = 'X'; break;
        case 'CC': datos.tipo_ident_acompa.cedula_ciuda = 'X'; break;
        case 'CE': datos.tipo_ident_acompa.cedula_extranjeria = 'X'; break;

        case 'PA': datos.tipo_ident_acompa.pasaporte = 'X'; break;
        case 'ASI': datos.tipo_ident_acompa.adulto_sin_ident = 'X'; break;
        case 'MSI': datos.tipo_ident_acompa.menor_sin_ident = 'X'; break;
        case 'CD': datos.tipo_ident_acompa.carnet_diplomat = 'X'; break;

        case 'NUI': datos.tipo_ident_acompa.numero_unico_ident = 'X'; break;
        case 'SC': datos.tipo_ident_acompa.salvo_conduc = 'X'; break;
        case 'PE': datos.tipo_ident_acompa.permiso_perman = 'X'; break;
        case 'CN': datos.tipo_ident_acompa.certificado_nacid_vivo = 'X'; break;
      }

      $_HC702R._ciudadAcompa = $_HC702R._ciudades.find(e => e['COD'] == $_HC702R.reg_pac[0].CIUDAD.trim());
      if ($_HC702R._ciudadAcompa != undefined) {
        datos.acompa.municipio = $_HC702R._ciudadPaci.NOMBRE;
        datos.acompa.departamento = $_HC702R._ciudadPaci.DEPART;
      } else {
        datos.acompa.municipio = '';
        datos.acompa.departamento = '';
      }
    }
  }
  // no existe id del acompañante
}

async function llenarDatosProfesional_HC702R() {
  var operador;
  if ($_HC702R._datos.oper_elab_j.trim() != "") {
    operador = $_HC702R._datos.oper_elab_j;
  } else {
    operador = '';
  }

  if (operador != "") {
    await postData({ datosh: datosEnvio() + operador + '|' }, get_url("app/CONTAB/CON003.DLL"))
      .then(data => {
        var res = data.split('|');
        nombre_oper_w = res[0].trim();
        id_oper_w = res[1];

        datos.profesional.nombre = nombre_oper_w;

      }).catch(err => {
        console.log(err, 'error')
        datos.profesional.nombre = "";
      })
  } else {
    datos.profesional.nombre = "";
  }

  datos.profesional.telefono = $_USUA_GLOBAL[0].TEL;
  datos.profesional.descrip_unServ = $_HC702R._datos.unser_descrip;

  var espec_ref = $_HC702R._datos.espec_ref;
  res = $_HC702R._especialidades.find(e => e.CODIGO == espec_ref);
  res != undefined ? datos.profesional.nombre_esp = res.NOMBRE : false;
}

async function llenarAnalisis_HC702R() {
  var ren_epi = $_HC702R._datos.reng_epi.replace(/\&/g, "\n");
  var plan_epi = $_HC702R._datos.plan_epi.replace(/\&/g, "\n");

  if (ren_epi.trim() != "") {
    datos.analisis.reng_epi = ren_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
  }

  if (plan_epi.trim() != "") {
    datos.analisis.plan_epi = plan_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
  }
}

async function llenarDiagnostico_HC702R() {

  if (localStorage.idOpciondata == "072") {
    for (var i in $_HC702R._datos.diag_egr) {
      if ($_HC702R._datos.diag_egr[i].diagn.trim() != "") {
        datos.diagnostico.bandera = true;
        datos.diagnostico.cod_enf.push($_HC702R._datos.diag_egr[i].diagn);
        datos.diagnostico.nombre_enf.push($_HC702R._datos.diag_egr[i].descrip)
      }
    }
  } else {
    for (var i in $_HC702R._datos.diag_egr) {
      if ($_HC702R._datos.diag_egr[i].cod.trim() != "") {
        datos.diagnostico.bandera = true;
        datos.diagnostico.cod_enf.push($_HC702R._datos.diag_egr[i].cod);
        datos.diagnostico.nombre_enf.push($_HC702R._datos.diag_egr[i].descrip)
      }
    }
  }

}

async function llenarFirma_HC702R() {
  await postData({ datosh: datosEnvio(), paso: '1', codigo: $_HC702R._datos.medico }, get_url("app/SALUD/SER819.DLL"))
    .then(data => {
      $_HC702R._medico = data;
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  res = $_HC702R._especialidades.find(e => e.CODIGO == $_HC702R._medico.TAB_ESPEC[0].COD);
  res != undefined ? datos.medico.espec = res.NOMBRE : false;

  datos.medico.firma = $_HC702R._medico.IDENTIFICACION.trim();

  datos.medico.nombre = $_HC702R._medico.NOMBRE.replace(/\�/g, 'Ñ');
  datos.medico.reg = $_HC702R._medico.REG_MEDICO;
}

async function llamarAcompaPaci_HC702R() {
  var id_paci = cerosIzq($_HC702R._datos.acompa_epi, 15);
  await postData({ datosh: datosEnvio() + id_paci }, get_url("app/SALUD/SER810-1.DLL"))
    .then(data => {
      $_HC702R.reg_pac = data['REG-PACI'];
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
    })
}





async function imprimirDatosCovid_HC702() {
  if ($_HC702R._hcprc.covid19.viaje_covid19.trim() == '' && $_HC702R._hcprc.covid19.contacto_covid19.trim() == '') {
    // continue
  } else {
    datos.covid.riesgos.bandera = true;

    aux = '';
    switch ($_HC702R._hcprc.covid19.viaje_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.transito = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.contacto_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.contDiag = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.fiebre_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.fiebre = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.tos_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.tos = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.disnea_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.disnea = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.malestar_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.general = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.rinorrea_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.rinorrea = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.personal_salud_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.contEstr = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.odinofagia_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.odinofagia = aux;

    aux = '';
    switch ($_HC702R._hcprc.covid19.viaje_dentro_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.pre1 = aux;

    if ($_HC702R._hcprc.covid19.viaje_dentro_covid19 == 'S') {
      var x = $_HC702R._ciudades.find(e => e.COD == $_HC702R._hcprc.covid19.lugar_dentro_covid19);
      (x != undefined) ? datos.covid.riesgos.pre2 = x.NOMBRE : false;
      datos.covid.riesgos.pre3 = $_HC702R._hcprc.covid19.tiempo_dentro_covid19;
    }

    aux = '';
    switch ($_HC702R._hcprc.covid19.viaje_fuera_covid19) {
      case 'S': aux = 'SI'; break;
      case 'N': aux = 'NO'; break;
      default: aux = '  '; break;
    }
    datos.covid.riesgos.pre4 = aux;

    if ($_HC702R._hcprc.covid19.viaje_fuera_covid19 == 'S') {
      var x = $_HC702R._paisesRips.find(e => e.CODIGO == $_HC702R._hcprc.covid19.lugar_fuera_covid19);
      (x != undefined) ? datos.covid.riesgos.pre5 = x.DESCRIP : false;
      datos.covid.riesgos.pre6 = $_HC702R._hcprc.covid19.tiempo_fuera_covid19;
    }
  }
}

async function llamarImpresion_HC702R() {
  await _impresion2({
    tipo: 'pdf',
    archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS-01')}.pdf`,
    content: await _imprimirHC702R(datos, console.log('imprime HC702R')),
    retornar: false
  }).catch((err) => {
    console.error(err);
  })
}

async function salir_HC702R() {
  // console.log("aqui");
  loader('hide')
  _regresar_menuhis();
}

async function abrirArchivos_HC702R() {
  loader('show');
  await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
    .then(data => {
      $_HC702R._ciudades = data.CIUDAD;
      $_HC702R._ciudades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
    .then(data => {
      $_HC702R._entidades = data.ENTIDADES;
      $_HC702R._entidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
    .then(data => {
      $_HC702R._especialidades = data.ESPECIALIDADES;
      $_HC702R._especialidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
    .then(data => {
      $_HC702R._hcprc = data.HCPAC;
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
    .then(data => {
      $_HC702R._paisesRips = data.PAISESRIPS;
      $_HC702R._paisesRips.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  loader('show');
}

async function inicializarDatos_HC702R() {
  datos = {
    encabezado: {
      nombre: '',
      nit: '',
      titulo: '',
    },

    prestador: {
      nit: '',
      codigo: '',
      direccion_prestador: '',
      telefono: '',
      indicativo_tel: '',
      nombre: '',
      departamento: '',
      municipio: '',
    },

    paciente: {
      nombre_paci: '',
      identificacion: '',
      fecha_naci: '',
      edad: '',
      direccion: '',
      telefono: '',
      departamento: '',
      municipio: '',
      nombre_ent: '',
      cod_ent: '',
    },

    tipo_ident: {
      registro_civil: '',
      pasaporte: '',
      salvo_conduc: '',
      targeta_iden: '',
      adulto_sin_ident: '',
      permiso_perman: '',
      cedula_ciuda: '',
      menor_sin_ident: '',
      certificado_nacid_vivo: '',
      cedula_extranjeria: '',
      carnet_diplomat: '',
      numero_unico_ident: ''
    },

    acompa: {
      nombre_acompa: '',
      identificacion: '',
      direccion: '',
      telefono: '',
      departamento: '',
      municipio: '',
    },

    tipo_ident_acompa: {
      registro_civil: '',
      pasaporte: '',
      salvo_conduc: '',
      targeta_iden: '',
      adulto_sin_ident: '',
      permiso_perman: '',
      cedula_ciuda: '',
      menor_sin_ident: '',
      certificado_nacid_vivo: '',
      cedula_extranjeria: '',
      carnet_diplomat: '',
      numero_unico_ident: ''
    },

    profesional: {
      nombre: '',
      telefono: '',
      descrip_unServ: '',
      nombre_esp: '',
    },

    analisis: {
      reng_epi: '',
      plan_epi: '',
    },

    medico: {
      firma: '',
      reg: '',
      nombre: '',
      espec: ''
    },

    titulos: {
      titulo_prof: '',
    },

    diagnostico: {
      bandera: null,
      cod_enf: [],
      nombre_enf: [],
    },

    fecha_epi: {
      ano: '',
      mes: '',
      dia: '',
      hora: '',
      minutos: '',
    },

    covid: {
      recomendaciones: {
        bandera: true
      },

      riesgos: {
        bandera: null,
        transito: '',
        contDiag: '',
        contEstr: '',
        fiebre: '',
        tos: '',
        disnea: '',
        general: '',
        rinorrea: '',
        odinofagia: '',
        pre1: '',
        pre2: '',
        pre3: '',
        pre4: '',
        pre5: '',
        pre6: '',
      },

      prevencion: {
        bandera: null
      }
    },
  }
}