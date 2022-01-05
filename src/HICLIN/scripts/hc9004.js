
/** 
 * @developer Pablo.O.
 * @author    SC-PROSOFT.
 * @proyect   HICLIN.
 * @descrip   HISTORIAS CLÍNICAS || APERTURA DE HISTORIA DE ONCOLOGÍA.
 * @date      27/10/2020 CREACION
 * @date      00/00/0000 FINALIZADO
**/

var $this;
new Vue({
  el: '#HC9004',
  data: {
    form: {

    }
  },
  created: () => {
    // loader("show");
    _inputControl("reset");
    _inputControl("disabled");
    // _cargarEnfermedades();
    // cargarHistoria();
    _formHidden("1");
  }
})

function _formHidden(pag) {
  var forms = $("[id^='pag_']");
  for (var i = 0; i < forms.length; i++) {
    var num_pag = $(forms[i]).attr("id").split("_");
    if (num_pag[1] == pag) $(forms[i]).removeClass("hidden");
    else $(forms[i]).addClass("hidden");
  }
}
// var HC9004 = [], $llavehc, $ip_servidor, $path_dir, FARMACOS = [], ANTECEDENTES = [], $array_medicamentos = [];
// HC9004.DETALLES = [];
// $(document).ready(function () { _inputControl('reset'); _inputControl('disabled'); onHC9004(); iniciarMascarasInputs(); });

// var pesoMask = '', supCMask = '', perim_cefalicoMask = '', perim_toraxMask = '', perim_abdoMask = '';

// function onHC9004() {
//   HC9004.IP_SERVIDOR = getParameterByName("a");
//   $ip_servidor = getParameterByName("a");
//   HC9004.LLAVE_HC = getParameterByName("b");
//   HC9004.MED_HC = getParameterByName("c").split('|')[0];
//   HC9004.FINALID_HC = getParameterByName("c").split('|')[1];
//   HC9004.UNSERV_HC = getParameterByName("c").split('|')[2];
//   $path_dir = getParameterByName("c").split('|')[3].split('$')[0];
//   HC9004.OPER_HC = getParameterByName("c").split('|')[4];

//   _toggleF8([
//     { input: 'cum_causa_anafil_hc', app: '9004', funct: _ventanaFarmacos_HC9004 },
//     { input: 'cum_pos_hc', app: '9004', funct: _ventanaFarmacos_HC9004 },
//     { input: 'cum_nopos_hc', app: '9004', funct: _ventanaFarmacos_HC9004 },
//     { input: 'cum_otros1_trat_hc', app: '9004', funct: _ventanaFarmacos_HC9004 },
//     { input: 'cum_otros2_trat_hc', app: '9004', funct: _ventanaFarmacos_HC9004 }
//   ]);
//   $('#guardar_HC9004').hide();
//   ocultarSecciones(); iniciarObjetosFNF8();
// }

// function getParameterByName(name, url = window.location.href) {
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
//   if (!results) return null; if (!results[2]) return "";
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// //------------------------------MASCARAS-------------------------------------//
// function iniciarMascarasInputs() {
//   pesoMask = IMask($('#peso_hc_9004')[0], { mask: '{000}.{0}' });
//   supCMask = IMask($("#imc_corp_hc_9004")[0], { mask: "00.00" });

//   perim_cefalicoMask = IMask($('#per_cef_hc_9004')[0], { mask: '{0}0.[0][0]' });
//   perim_toraxMask = IMask($('#per_tora_hc_9004')[0], { mask: '{0}0.[0][0]' });
//   perim_abdoMask = IMask($('#per_abdo_hc_9004')[0], { mask: '{0}0.[0][0]' });

//   var momentFormat = 'YYYY/MM/DD';
//   let fecha_act = new Date();
//   fechaReporteInhib = IMask($("#fecha_ult_repor_hc_9004")[0], {
//     mask: Date,
//     pattern: momentFormat,
//     lazy: true,
//     max: new Date(fecha_act.getFullYear(), 00, 01, 00, 00),
//     min: new Date(2000, 00, 01, 00, 00),

//     format: function (date) { return moment(date).format(momentFormat); },

//     parse: function (str) {
//       return moment(str, momentFormat);

//     },
//     blocks: {
//       YYYY: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'yyyy',
//         from: 2000,
//         to: fecha_act.getFullYear()

//       },
//       MM: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'MM',
//         from: 01,
//         to: 12

//       },
//       DD: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'DD',
//         from: 01,
//         to: 31
//       },
//     }
//   });

//   fechaInicioTratamiento = IMask($("#fecha_ini_prim_trat_hc_9004")[0], {
//     mask: Date,
//     pattern: momentFormat,
//     lazy: true,
//     max: new Date(fecha_act.getFullYear(), 00, 01, 00, 00),
//     min: new Date(2000, 00, 01, 00, 00),

//     format: function (date) { return moment(date).format(momentFormat); },

//     parse: function (str) {
//       return moment(str, momentFormat);
//     },
//     blocks: {
//       YYYY: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'yyyy',
//         from: 2000,
//         to: fecha_act.getFullYear()

//       },
//       MM: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'MM',
//         from: 01,
//         to: 12

//       },
//       DD: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'DD',
//         from: 01,
//         to: 31
//       },
//     }
//   });

//   fechaDiagnostico = IMask($("#fecha_dx_hc_9004")[0], {
//     mask: Date,
//     pattern: momentFormat,
//     lazy: true,
//     max: new Date(fecha_act.getFullYear(), 00, 01, 00, 00),
//     min: new Date(2000, 00, 01, 00, 00),

//     format: function (date) { return moment(date).format(momentFormat); },

//     parse: function (str) {
//       return moment(str, momentFormat);
//     },
//     blocks: {
//       YYYY: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'yyyy',
//         from: 2000,
//         to: fecha_act.getFullYear()

//       },
//       MM: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'MM',
//         from: 01,
//         to: 12

//       },
//       DD: {
//         mask: IMask.MaskedRange,
//         placeholderChar: 'DD',
//         from: 01,
//         to: 31
//       },
//     }
//   });

// }
// //------------------------------END-MASCARAS-------------------------------------//

// function iniciarObjetosFNF8() {
//   loader('show');
//   const URL = get_url({ ip: HC9004.IP_SERVIDOR, dir: "/HICLIN/APP/" + "SER857" + ".DLL" });
//   let datos_envio = HC9004.IP_SERVIDOR
//   postData({ datosh: datos_envio }, URL)
//     .then((data) => {
//       $array_medicamentos = data.MEDICAMENTOS;
//       if ($array_medicamentos) {
//         FARMACOS.ALL = $array_medicamentos.map(arr => {
//           let res = {
//             DESCRIPCION: arr['DESCRIP'].trim(), COD: arr['COD'], TIPO: arr['TIPO_CUM']
//           }; return res;
//         }).filter(ar => ar['TIPO'] == 'NP' || ar['TIPO'] == 'PO' || ar['TIPO'] == 'NO APLICA');
//         FARMACOS.POS = FARMACOS.ALL.filter(arr => arr['TIPO'] == 'PO' || arr['TIPO'] == 'NO APLICA');
//         FARMACOS.NOPOS = FARMACOS.ALL.filter(arr => arr['TIPO'] == 'NP' || arr['TIPO'] == 'NO APLICA');
//         getDatos_HC9004();
//       }
//       $array_medicamentos.push({ DESCRIP: 'NO RECIBIO MEDICAMENTO', COD: '999999999999', 'TIPO-CUM': 'NO APLICA' });
//     }).catch(error => { console.error(error) });
// }

// /*------------------------------VENTANAS FN-F8----------------------------------*/
// function _ventanaFarmacos_HC9004(e) {
//   let data_farmacos = [];
//   if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
//     switch (e.target.id) {
//       case 'cum_causa_anafil_hc_9004': data_farmacos = FARMACOS.ALL; break;
//       case 'cum_pos_hc_9004': data_farmacos = FARMACOS.POS; break;
//       case 'cum_otros1_trat_hc_9004': data_farmacos = FARMACOS.POS; break;
//       case 'cum_nopos_hc_9004': data_farmacos = FARMACOS.NOPOS; break;
//       case 'cum_otros2_trat_hc_9004': data_farmacos = FARMACOS.NOPOS; break;
//     }
//     _ventanaDatos({
//       titulo: "VENTANA FARMACOS Y MEDICAMENTOS",
//       columnas: ["COD", "DESCRIPCION", "TIPO"],
//       data: data_farmacos,
//       callback_esc: () => {
//         document.getElementById(`"${e.target.id}"`).focus;
//       },
//       callback: (data) => {
//         e.target.value = data.COD + '-' + data.DESCRIPCION;
//         _enterInput(`#${e.target.id}`);
//         //----------
//       }
//     });
//   }
// }

// function getDatos_HC9004() {
//   const URL = get_url({ ip: HC9004.IP_SERVIDOR, dir: "/HICLIN/APP/" + "HC01" + ".DLL" });
//   let datos_envio = HC9004.IP_SERVIDOR + '|' + $path_dir + '|' + HC9004.LLAVE_HC + '|' + HC9004.MED_HC + '|' + HC9004.FINALID_HC + '|' + HC9004.UNSERV_HC + '|' + HC9004.OPER_HC
//   postData({ datosh: datos_envio }, URL)
//     .then((data) => {
//       if (data['HC-PAC'].NOVEDAD == '7') {
//         data['HC-PAC'] ? HC9004 = data['HC-PAC'] : false;
//         HC9004.DETALLES = { 'FAMIL': '', 'MEDIC': '', 'HEMOR': '', 'QUIRU': '', 'TOXIC': '', 'TRAUM': '', 'ENFER': '', 'EXAGE': '', 'ANALI': '', 'GINEC': '' };
//         cargarCampos_HC9004();
//       } else {
//         CON851('6Q', '6Q', null, 'error', 'error');
//       }
//     }).catch(error => { console.error(error) });
// }

// function cargarCampos_HC9004() {
//   // FECHA HISTORIA
//   document.getElementById('fecha_hc_9004').value = HC9004.FECHA.substring(0, 4) + '-' + HC9004.FECHA.substring(4, 6) + '-' + HC9004.FECHA.substring(6, 8);
//   // // HORA HISTORIA
//   document.getElementById('hora_hc_9004').value = HC9004.HORA.substring(0, 2) + ':' + HC9004.HORA.substring(2, 4);

//   document.getElementById('med_hc_9004').value = HC9004.MED;
//   document.getElementById('descripmed_hc_9004').value = HC9004.NOM_OPER;
//   !HC9004.PROCEDEN.trim() ? HC9004.PROCEDEN = HC9004.CIUDAD : HC9004.PROCEDEN = HC9004.PROCEDEN;
//   document.getElementById('proced_hc_9004').value = HC9004.PROCEDEN;
//   document.getElementById('ciud_hc_9004').value = HC9004.CIUDAD;

//   document.getElementById('paciente_hc_9004').value = HC9004.NOM_PACI.trim();
//   document.getElementById('sucursal_hc_9004').value = HC9004.LLAVE.substring(15, 17);
//   document.getElementById('folio_hc_9004').value = HC9004.LLAVE.substring(17, 23);
//   document.getElementById('llave_hc_9004').value = HC9004.LLAVE.replace(/^0+/, '');
//   HC9004.CODPACI = HC9004.LLAVE.substring(0, 15);
//   HC9004.CODPACI.replace(/^0+/, '');


//   let folio = HC9004.LLAVE.substring(15, 17) + cerosIzq(parseInt(HC9004.LLAVE.substring(17, 23)), 6);
//   consultar_detalles_historia(folio, ["9004", "1001", "2002", "2010", "2020", "2035", "2040", "4040", "5005", "7501"], HC9004.LLAVE, cargarDetallesHC_HC9004)
// }

// function cargarDetallesHC_HC9004(data) {
//   if (data.length > 0) {
//     let detalles = data;
//     // Antecedentes HC
//     /*
//     1001--Enfermedad actual,
//     2002--Antec.familiares,
//     2010--Antec.medicos,
//     2020--Antec.quirurgicos,
//     2035--Antec.toxico-alergicos,
//     2040--Antec.traumaticos,
//     4040--Antec.ginecoobstetricos,
//     5005--Examen general,
//     7501--Analisis-hc
//     */

//     //Cargar antecedentes historia
//     for (var detalle in detalles) {
//       cod_dethc = detalles[detalle]['COD']
//       switch (cod_dethc) {
//         case "1001":
//           document.querySelector('#enfer_act_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "2002":
//           document.querySelector('#ant_famil_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "2010":
//           document.querySelector('#ant_medi_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "2020":
//           document.querySelector('#ant_quiru_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "2035":
//           document.querySelector('#ant_toxi_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "2040":
//           document.querySelector('#ant_traum_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "4040":
//           document.querySelector('#ant_ginec_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "5005":
//           document.querySelector('#exagen_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         case "7501":
//           document.querySelector('#analisis_hc_9004').value = detalles[detalle]['DESCRIPCION'].trim()
//           break;
//         default:
//           break;
//       }
//     }
//     HC9004.PERCEFHC = data.PERCEF_ANT_HC.trim();
//     HC9004.PERABDOHC = data.PERABDO_ANT_HC.trim();
//     HC9004.PERTORAHC = data.PERTORA_ANT_HC.trim();
//     HC9004.PESOHC = data.PESOANT_HC.trim();
//     HC9004.TALLAHC = data.TALLAANT_HC.trim();
//   } validar_MOTIVOCONSULTA_HC9004();

// }

// function validar_MOTIVOCONSULTA_HC9004() {
//   activarCampo({ input: 'motiv_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#motiv_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () { validar_MOTIVOCONSULTA_HC9004() },
//     function () {
//       HC9004.MOTIVHC = document.getElementById('motiv_hc_9004').value;
//       activarCampo({ input: 'motiv_hc_9004', type: 's', activar: false });
//       validar_ENFERMEDAD_HC9004();
//     }
//   )
// }

// function validar_ENFERMEDAD_HC9004() {
//   activarCampo({ input: 'enfer_act_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#enferact_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () { activarCampo({ input: 'enfer_act_hc_9004', type: 's', activar: false }); validar_MOTIVOCONSULTA_HC9004() },
//     function () {
//       HC9004.DETALLES.ENFER = document.getElementById('enfer_act_hc_9004').value;
//       activarCampo({ input: 'enfer_act_hc_9004', type: 's', activar: false });
//       mostrarVista('1', 'sig', () => { setTimeout(() => { evaluar_PORC_FACTOR_HC9004() }, 300) });

//     }
//   )
// }

// function evaluar_PORC_FACTOR_HC9004() {
//   HC9004.PORC_ACTFACTOR = document.getElementById('porc_fact_hc_9004').value.substring(0, 1);
//   activarCampo({ input: 'porcfacthc_9004', type: 'd', activar: true });
//   HC9004.PORC_ACTFACTOR.trim() == '' ? HC9004.PORC_ACTFACTOR = null : HC9004.PORC_ACTFACTOR = HC9004.PORC_ACTFACTOR;
//   porcentaje_actFactor_HC9004(HC9004.PORC_ACTFACTOR, function () {
//     activarCampo({ input: 'porcfacthc_9004', type: 'd', activar: false });
//     mostrarVista('2', 'ant', validar_ENFERMEDAD_HC9004);
//   }, data => {
//     HC9004.PORC_ACTFACTOR = data.VAL; document.getElementById('porc_fact_hc_9004').value = data.VAL + '-' + data.DESCRIP;

//     setTimeout(function () { activarCampo({ input: 'porcfacthc_9004', type: 'd', activar: false }); evaluar_PRESENCIA_INHIBIDORES_HC9004() }, 500)
//   })
// }

// function evaluar_PRESENCIA_INHIBIDORES_HC9004() {
//   HC9004.INHIBIDORES = document.getElementById('inhibidores_hc_9004').value.substring(0, 1);
//   activarCampo({ input: 'inhibidores_9004', type: 'd', activar: true });
//   HC9004.INHIBIDORES.trim() == '' ? HC9004.INHIBIDORES = null : HC9004.INHIBIDORES = HC9004.INHIBIDORES;
//   presencia_inhibidores_HC9004(HC9004.INHIBIDORES, function () {
//     setTimeout(function () { activarCampo({ input: 'inhibidores_9004', type: 'd', activar: false }); evaluar_PORC_FACTOR_HC9004() }, 500)
//   },
//     data => {
//       HC9004.INHIBIDORES = data.COD; document.getElementById('inhibidores_hc_9004').value = HC9004.INHIBIDORES + '-' + data.DESCRIP;
//       setTimeout(function () { activarCampo({ input: 'inhibidores_9004', type: 'd', activar: false }); validar_FECHA_INHIB_HC9004() }, 500)
//     })
// }

// function validar_FECHA_INHIB_HC9004() {
//   activarCampo({ input: 'fecha_inhib_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#fecha_inhib_9004",
//     orden: '1'
//   },
//     function () { activarCampo({ input: 'fecha_inhib_9004', type: 'n', activar: false }); evaluar_PRESENCIA_INHIBIDORES_HC9004(); },
//     function () {
//       HC9004.FECH_INHIBI = fechaReporteInhib._value;
//       if (HC9004.FECH_INHIBI == '' || HC9004.FECH_INHIBI.length < 8) CON851('03', '03', validar_FECHA_INHIB_HC9004(), 'error', 'error');
//       else setTimeout(function () { activarCampo({ input: 'fecha_inhib_9004', type: 'd', activar: false }); evaluar_ITI_HC9004() }, 500);
//     })
// }

// function evaluar_ITI_HC9004() {
//   activarCampo({ input: 'harecibido_iti_hc_9004', type: 'n', activar: true });
//   HC9004.PREG_ITI = document.getElementById('ha_recibido_iti_hc_9004').value.substring(0, 1);
//   HC9004.PREG_ITI.trim() == '' ? HC9004.PREG_ITI = null : HC9004.PREG_ITI = HC9004.PREG_ITI;
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_ITI, titulo: "HA RECICIBIDO ITI ?" },
//     function () {
//       activarCampo({ input: 'harecibido_iti_hc_9004', type: 'n', activar: false });
//       validar_FECHA_INHIB_HC9004();
//     }
//     , data => {
//       HC9004.PREG_ITI = data.VAL; document.getElementById('ha_recibido_iti_hc_9004').value = HC9004.PREG_ITI + '-' + data.DESCRIP;
//       setTimeout(function () { activarCampo({ input: 'harecibido_iti_hc_9004', type: 'n', activar: false }); evaluar_ITI_ACTUAL_HC9004() }, 500)
//     })
// }

// function evaluar_ITI_ACTUAL_HC9004() {
//   activarCampo({ input: 'estarecibiendo_iti_hc_9004', type: 'n', activar: true })
//   HC9004.PREG_ITI_ACT = document.getElementById('esta_recibiendo_iti_hc_9004').value.substring(0, 1);
//   HC9004.PREG_ITI_ACT.trim() == '' ? HC9004.PREG_ITI_ACT = null : HC9004.PREG_ITI_ACT = HC9004.PREG_ITI_ACT;
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_ITI_ACT, titulo: "ESTA RECIBIENDO ITI ?" }, function () {
//     activarCampo({ input: 'estarecibiendo_iti_hc_9004', type: 'n', activar: false });
//     setTimeout(function () { evaluar_ITI_HC9004() }, 500)
//   }, data => {
//     HC9004.PREG_ITI_ACT = data.VAL; document.getElementById('esta_recibiendo_iti_hc_9004').value = HC9004.PREG_ITI_ACT + '-' + data.DESCRIP;
//     if (HC9004.PREG_ITI_ACT == 'S') { activarCampo({ input: 'estarecibiendo_iti_hc_9004', type: 'n', activar: false }); validar_PERIODO_ITI_ACT_HC9004() } else {
//       HC9004.TIEMPO_ITI = '0'; document.getElementById('tiempo_en_iti_hc_9004').value = HC9004.TIEMPO_ITI;
//       activarCampo({ input: 'estarecibiendo_iti_hc_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_HEMARTROSIS_HC9004() }, 500);
//     }
//   })
// }

// function validar_PERIODO_ITI_ACT_HC9004() {
//   activarCampo({ input: 'tiempoiti_9004', type: 'n', activar: true })
//   validarInputs({
//     form: "#tiempoiti_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'tiempoiti_9004', type: 'n', activar: false })
//       setTimeout(function () { evaluar_ITI_ACTUAL_HC9004() }, 500);
//     },
//     function () {
//       HC9004.TIEMPO_ITI = document.getElementById('tiempo_en_iti_hc_9004').value;
//       if (!isNaN(HC9004.TIEMPO_ITI)) {
//         HC9004.TIEMPO_ITI.trim() == '' ? HC9004.TIEMPO_ITI = '0' : HC9004.TIEMPO_ITI = HC9004.TIEMPO_ITI;
//         if (HC9004.TIEMPO_ITI.trim() == '') CON851('03', '03', validar_PERIODO_ITI_ACT_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'tiempoiti_9004', type: 'n', activar: false });
//           setTimeout(function () { evaluar_HEMARTROSIS_HC9004() }, 500);
//         }
//       }
//       else { CON851('03', '03', validar_PERIODO_ITI_ACT_HC9004(), 'error', 'error') }
//     })
// }

// function evaluar_HEMARTROSIS_HC9004() {
//   activarCampo({ input: 'hemartrosis_9004', type: 'n', activar: true })
//   HC9004.PREG_HEMARTROSIS = document.getElementById('hemartrosis_hc_9004').value.substring(0, 1);
//   HC9004.PREG_HEMARTROSIS.trim() == '' ? HC9004.PREG_HEMARTROSIS = null : HC9004.PREG_HEMARTROSIS = HC9004.PREG_HEMARTROSIS;
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_HEMARTROSIS, titulo: "HEMARTROSIS ?" },
//     function () {
//       if (HC9004.PREG_ITI_ACT == 'S') {
//         activarCampo({ input: 'hemartrosis_9004', type: 'n', activar: false })
//         validar_PERIODO_ITI_ACT_HC9004();
//       }
//       else {
//         activarCampo({ input: 'hemartrosis_9004', type: 'n', activar: false })
//         setTimeout(function () { evaluar_ITI_ACTUAL_HC9004() }, 500);
//       }
//     }, data => {
//       HC9004.PREG_HEMARTROSIS = data.VAL; document.getElementById('hemartrosis_hc_9004').value = HC9004.PREG_HEMARTROSIS + '-' + data.DESCRIP;
//       activarCampo({ input: 'hemartrosis_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_VHC_HC9004() }, 500);
//     })
// }
// // EVALUA PREGUNTAS VIH,VHB,VHC (INFECCIONES)
// function evaluar_VHC_HC9004() {
//   activarCampo({ input: 'vhc_9004', type: 'n', activar: true });
//   //-----------------------------------------VHC-----------------------------------------  
//   HC9004.PREG_VHC = document.getElementById('vhc_hc_9004').value.substring(0, 1);
//   HC9004.PREG_VHC.trim() == '' ? HC9004.PREG_VHC = null : HC9004.PREG_VHC = HC9004.PREG_VHC;
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_VHC, titulo: "HEPATITIS C (VHC) ?" },
//     function () {
//       activarCampo({ input: 'vhc_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_HEMARTROSIS_HC9004() }, 500)
//     }
//     , data => {
//       HC9004.PREG_VHC = data.VAL; document.getElementById('vhc_hc_9004').value = HC9004.PREG_VHC + '-' + data.DESCRIP;
//       activarCampo({ input: 'vhc_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_VHB_HC9004() }, 500);
//     })
// }

// function evaluar_VHB_HC9004() {
//   activarCampo({ input: 'vhb_9004', type: 'n', activar: true });
//   //-----------------------------------------VHB-----------------------------------------  
//   HC9004.PREG_VHB = document.getElementById('vhb_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_VHB, titulo: "HEPATITIS B (VHB) ?" },
//     function () {
//       activarCampo({ input: 'vhb_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_VHC_HC9004() }, 500)
//     }, data => {
//       HC9004.PREG_VHB = data.VAL; document.getElementById('vhb_hc_9004').value = HC9004.PREG_VHB + '-' + data.DESCRIP;
//       activarCampo({ input: 'vhb_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_VIH_HC9004() }, 500);
//     })
// }

// function evaluar_VIH_HC9004() {
//   activarCampo({ input: 'vih_9004', type: 'n', activar: true });
//   //-----------------------------------------VIH-----------------------------------------  
//   HC9004.PREG_VIH = document.getElementById('vih_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_VIH, titulo: "INMUNODEFICIENCIA HUMANA (VIH) ?" },
//     function () {
//       activarCampo({ input: 'vih_004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_VHB_HC9004() }, 500)
//     }, data => {
//       HC9004.PREG_VIH = data.VAL; document.getElementById('vih_hc_9004').value = HC9004.PREG_VIH + '-' + data.DESCRIP;
//       activarCampo({ input: 'vih_9004', type: 'n', activar: false });
//       setTimeout(() => { evaluar_ARTR_HEMOCRONICA_HC9004() }, 500);
//     })
// }

// function evaluar_ARTR_HEMOCRONICA_HC9004() {
//   activarCampo({ input: 'art_hemocron_9004', type: 'n', activar: true });
//   HC9004.PREG_ART_HEMOCRONICA = document.getElementById('artr_hemocron_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_ART_HEMOCRONICA, titulo: "ARTROPATÍA HEMOCRÓNICA ?" },
//     function () {
//       setTimeout(function () { evaluar_VIH_HC9004() }, 500)
//     },
//     data => {
//       HC9004.PREG_ART_HEMOCRONICA = data.VAL;
//       document.getElementById('artr_hemocron_hc_9004').value = HC9004.PREG_ART_HEMOCRONICA + '-' + data.DESCRIP;
//       if (data.COD == 'S') {
//         activarCampo({ input: 'art_hemocron_9004', type: 'n', activar: false });
//         validar_NUM_ARTICULACIONES_HC9004();
//       } else {
//         HC9004.NUM_ARTICULACIONES = 0;
//         document.getElementById('nro_art_compro_hc_9004').value = '0';
//         activarCampo({ input: 'art_hemocron_9004', type: 'n', activar: false });
//         setTimeout(() => { evaluar_SANGRADOS_ILIOPSOAS_HC9004() }, 500);
//       }
//     })
// }

// function validar_NUM_ARTICULACIONES_HC9004() {
//   activarCampo({ input: 'nroartcompro_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nroartcompro_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'nroartcompro_9004', type: 'n', activar: false });
//       setTimeout(evaluar_ARTR_HEMOCRONICA_HC9004, 500)
//     },
//     function () {
//       HC9004.NUM_ARTICULACIONES = (document.getElementById('nro_art_compro_hc_9004').value).padStart(3, '0');
//       if (!isNaN(HC9004.NUM_ARTICULACIONES)) {
//         HC9004.NUM_ARTICULACIONES.trim() == '' ? HC9004.NUM_ARTICULACIONES = '0' : HC9004.NUM_ARTICULACIONES = HC9004.NUM_ARTICULACIONES;
//         if (HC9004.NUM_ARTICULACIONES == '' || parseInt(HC9004.NUM_ARTICULACIONES) > 360) CON851('03', '03', validar_NUM_ARTICULACIONES_HC9004(), 'error', 'error');
//         else setTimeout(function () {
//           document.getElementById('nro_art_compro_hc_9004').value = HC9004.NUM_ARTICULACIONES;
//           activarCampo({ input: 'nroartcompro_9004', type: 'n', activar: false });
//           setTimeout(evaluar_SANGRADOS_ILIOPSOAS_HC9004, 500)
//         }, 500);

//         if (HC9004.PREG_ART_HEMOCRONICA == 'S' && HC9004.NUM_ARTICULACIONES > 0) {
//           activarCampo({ input: 'nroartcompro_9004', type: 'n', activar: false });
//           setTimeout(evaluar_SANGRADOS_ILIOPSOAS_HC9004, 500)
//         }
//         else CON851('03', '03', validar_NUM_ARTICULACIONES_HC9004(), 'error', 'error');

//       } else {
//         CON851('03', '03', validar_NUM_ARTICULACIONES_HC9004(), 'error', 'error');
//       }
//     })
// }

// function evaluar_SANGRADOS_ILIOPSOAS_HC9004() {
//   activarCampo({ input: 'san_iliopsoas_9004', type: 'n', activar: true });
//   HC9004.PREG_SANG_ILIOPSOA = document.getElementById('san_iliopsoas_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_SANG_ILIOPSOA, titulo: "SANGRADO EN ILIOPSOAS ?" },
//     function () {
//       if (HC9004.NUM_ARTICULACIONES == 0) {
//         activarCampo({ input: 'san_iliopsoas_9004', type: 'n', activar: false });
//         setTimeout(evaluar_ARTR_HEMOCRONICA_HC9004, 500)
//       } else {
//         activarCampo({ input: 'san_iliopsoas_9004', type: 'n', activar: false });
//         validar_NUM_ARTICULACIONES_HC9004();
//       }
//     }, data => {
//       HC9004.PREG_SANG_ILIOPSOA = data.VAL;
//       document.getElementById('san_iliopsoas_hc_9004').value = HC9004.PREG_SANG_ILIOPSOA + '-' + data.DESCRIP;
//       activarCampo({ input: 'san_iliopsoas_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_TBLANDOS_HC9004() }, 500);
//     })
// }

// function evaluar_SANGRADOS_TBLANDOS_HC9004() {
//   activarCampo({ input: 'san_tejidos_9004', type: 'n', activar: true });
//   HC9004.PREG_SANG_TBLANDO = document.getElementById('san_tejidos_blandos_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_SANG_TBLANDO, titulo: "SANGRADO EN TEJIDOS BLANDOS ?" },
//     function () {
//       activarCampo({ input: 'san_tejidos_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_ILIOPSOAS_HC9004() }, 500)
//     }
//     , data => {
//       HC9004.PREG_SANG_TBLANDO = data.VAL; document.getElementById('san_tejidos_blandos_9004').value = HC9004.PREG_SANG_TBLANDO + '-' + data.DESCRIP;
//       activarCampo({ input: 'san_tejidos_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_CRANEAL_HC9004() }, 500);
//     })
// }

// function evaluar_SANGRADOS_CRANEAL_HC9004() {
//   activarCampo({ input: 'san_intracraneal_9004', type: 'n', activar: true });
//   HC9004.PREG_SANG_CRANEO = document.getElementById('san_intracraneal_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_SANG_CRANEO, titulo: "SANGRADO INTRACRANEAL ?" }, function () {
//     activarCampo({ input: 'san_intracraneal_9004', type: 'n', activar: false });
//     setTimeout(evaluar_SANGRADOS_TBLANDOS_HC9004(), 500);
//   },
//     data => {
//       HC9004.PREG_SANG_CRANEO = data.VAL; document.getElementById('san_intracraneal_hc_9004').value = HC9004.PREG_SANG_CRANEO + '-' + data.DESCRIP;
//       activarCampo({ input: 'san_intracraneal_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_CUELLO_HC9004() }, 500);
//     })
// }

// function evaluar_SANGRADOS_CUELLO_HC9004() {
//   activarCampo({ input: 'san_cuello_garganta_9004', type: 'n', activar: true });
//   HC9004.PREG_SANG_CUELLO = document.getElementById('san_cuello_garganta_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_SANG_CUELLO, titulo: "SANGRADO EN CUELLO|GARGANTA ?" },
//     function () {
//       activarCampo({ input: 'san_cuello_garganta_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_CRANEAL_HC9004() }, 500)
//     }
//     , data => {
//       HC9004.PREG_SANG_CUELLO = data.VAL; document.getElementById('san_cuello_garganta_hc_9004').value = HC9004.PREG_SANG_CUELLO + '-' + data.DESCRIP;
//       activarCampo({ input: 'san_cuello_garganta_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_ORAL_HC9004() }, 500);
//     })
// }

// function evaluar_SANGRADOS_ORAL_HC9004() {
//   activarCampo({ input: 'san_oral_9004', type: 'n', activar: true });
//   HC9004.PREG_SANG_ORAL = document.getElementById('san_oral_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_SANG_ORAL, titulo: "SANGRADO ORAL ?" },
//     function () {
//       activarCampo({ input: 'san_oral_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_CUELLO_HC9004() }, 500)
//     }
//     , data => {
//       HC9004.PREG_SANG_ORAL = data.VAL; document.getElementById('san_oral_hc_9004').value = HC9004.PREG_SANG_ORAL + '-' + data.DESCRIP;
//       activarCampo({ input: 'san_oral_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_OTROS_HC9004() }, 500);
//     })
// }
// function evaluar_SANGRADOS_OTROS_HC9004() {
//   activarCampo({ input: 'san_otr_9004', type: 'n', activar: true });
//   HC9004.PREG_SANG_OTROS = document.getElementById('san_otros_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.PREG_SANG_OTROS, titulo: "SANGRADO OTROS ?" },
//     function () {
//       activarCampo({ input: 'san_otr_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_SANGRADOS_ORAL_HC9004() }, 500)
//     }
//     , data => {
//       HC9004.PREG_SANG_OTROS = data.VAL; document.getElementById('san_otros_9004').value = HC9004.PREG_SANG_OTROS + '-' + data.DESCRIP;
//       activarCampo({ input: 'san_otr_9004', type: 'n', activar: false });
//       setTimeout(function () { validar_EXAMENGENERAL_HC9004() }, 500);
//     })
// }

// function validar_EXAMENGENERAL_HC9004() {
//   activarCampo({ input: 'exagen_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#exagen_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () {
//       activarCampo({ input: 'exagen_hc_9004', type: 's', activar: false });
//       mostrarVista('2', 'ant', () => { setTimeout(evaluar_SANGRADOS_OTROS_HC9004(), 500) });
//     },
//     function () {
//       HC9004.DETALLES.EXAGE = document.getElementById('exagen_hc_9004').value;
//       activarCampo({ input: 'exagen_hc_9004', type: 's', activar: false });
//       mostrarVista('2', 'sig', () => { setTimeout(function () { evaluar_UNDPESO_HC9004() }, 500) });
//     }
//   )
// }

// function evaluar_UNDPESO_HC9004() {
//   activarCampo({ input: 'undpeso_9004', type: 'n', activar: true });
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "KG" },
//     { "COD": "2", "DESCRIP": "LB" },
//     { "COD": "3", "DESCRIP": "G" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'UNIDAD DE MEDIDA USADA PARA EL PESO',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: HC9004.UNDPESO,
//     callback_f: function () {
//       activarCampo({ input: 'undpeso_9004', type: 'n', activar: false });
//       mostrarVista('3', 'ant', () => { setTimeout(validar_EXAMENGENERAL_HC9004(), 500) });

//     }
//   }, function (data) {
//     HC9004.UNDPESO = data.COD;
//     activarCampo({ input: 'undpeso_9004', type: 'n', activar: false });
//     document.getElementById('undpeso_hc_9004').value = data.DESCRIP;
//     validar_PESO_HC9004();
//   })
// }

// function validar_PESO_HC9004() {
//   activarCampo({ input: 'peso_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#peso_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'peso_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_UNDPESO_HC9004() }, 500)
//     },
//     function () {
//       activarCampo({ input: 'peso_9004', type: 'n', activar: false });
//       HC9004.PESOHC = pesoMask.unmaskedValue;
//       HC9004.PESOHC == HC9004.PESOHC ? HC9004.PESOHC : '000';
//       HC9004.PESOHC = parseFloat(HC9004.PESOHC).toFixed(1);
//       HC9004.PESOHC = cerosIzq(HC9004.PESOHC, 5);
//       if (HC9004.PESOHC == '') CON851('03', '03', validar_PESO_HC9004(), 'error', 'error');
//       else {
//         activarCampo({ input: 'peso_9004', type: 'n', activar: false });
//         validar_TALLA_HC9004();
//       }
//     })
// }

// function validar_TALLA_HC9004() {
//   activarCampo({ input: 'talla_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#talla_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'talla_9004', type: 'n', activar: false });
//       validar_PESO_HC9004()
//     },
//     function () {
//       HC9004.TALLAHC = document.getElementById('talla_hc_9004').value;
//       if (HC9004.TALLAHC == '' || HC9004.TALLAHC > 230) {
//         document.getElementById('talla_hc_9004').value = '';
//         CON851('03', '03', validar_TALLA_HC9004(), 'error', 'error');
//       } else {
//         let resultado_indices = calcularIndices({ UNDPESO: HC9004.UNDPESO, PESO: HC9004.PESOHC, TALLA: HC9004.TALLAHC });
//         // Calculo Superficie corporal
//         HC9004.SUPCORPHC = resultado_indices.supcorp
//         document.getElementById('sup_corp_hc_9004').value = HC9004.SUPCORPHC; HC9004.SUPCORPHC = HC9004.SUPCORPHC
//         // Calculo Indice masa corporal
//         HC9004.IMCHC = resultado_indices.imc
//         document.getElementById('imc_corp_hc_9004').value = HC9004.IMCHC;
//         activarCampo({ input: 'talla_9004', type: 'n', activar: false });
//         validar_PERIMETRO_CEFALICO_HC9004();
//       }
//     })
// }

// function validar_PERIMETRO_CEFALICO_HC9004() {
//   activarCampo({ input: 'percefal_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#percefal_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'percefal_9004', type: 'n', activar: false });
//       validar_TALLA_HC9004()
//     },
//     function () {
//       HC9004.PERCEFHC = perim_cefalicoMask.unmaskedValue;
//       HC9004.PERCEFHC.trim() == '' ? HC9004.PERCEFHC = '0' : HC9004.PERCEFHC = HC9004.PERCEFHC;
//       if (HC9004.PERCEFHC == '') CON851('03', '03', validar_PERIMETRO_CEFALICO_HC9004(), 'error', 'error');
//       else {
//         activarCampo({ input: 'percefal_9004', type: 'n', activar: false });
//         validar_PERIMETRO_TORAXICO_HC9004();
//       }
//     })
// }

// function validar_PERIMETRO_TORAXICO_HC9004() {
//   activarCampo({ input: 'pertora_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#pertora_9004",
//     orden: '1'
//   },
//     () => {
//       activarCampo({ input: 'pertora_9004', type: 'n', activar: false });
//       validar_PERIMETRO_CEFALICO_HC9004();
//     },
//     function () {
//       HC9004.PERTORAHC = perim_toraxMask.unmaskedValue;
//       HC9004.PERTORAHC.trim() == '' ? HC9004.PERTORAHC = '0' : HC9004.PERTORAHC = HC9004.PERTORAHC;
//       if (HC9004.PERTORAHC == '') CON851('03', '03', validar_PERIMETRO_TORAXICO_HC9004(), 'error', 'error');
//       else {
//         activarCampo({ input: 'pertora_9004', type: 'n', activar: false });
//         validar_PERIMETRO_ABDO_HC9004();
//       }
//     })
// }

// function validar_PERIMETRO_ABDO_HC9004() {
//   activarCampo({ input: 'perabdo_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#perabdo_9004",
//     orden: '1'
//   },
//     () => {
//       activarCampo({ input: 'perabdo_9004', type: 'n', activar: false });
//       validar_PERIMETRO_TORAXICO_HC9004()
//     },
//     function () {
//       HC9004.PERABDOHC = perim_abdoMask.unmaskedValue;
//       HC9004.PERABDOHC.trim() == '' ? HC9004.PERABDOHC = '0' : HC9004.PERABDOHC = HC9004.PERABDOHC;
//       if (HC9004.PERABDOHC == '') CON851('03', '03', validar_PERIMETRO_ABDO_HC9004(), 'error', 'error');
//       else {
//         activarCampo({ input: 'perabdo_9004', type: 'n', activar: false });
//         mostrarVista('3', 'sig', () => { setTimeout(evaluar_ANTECEDENTES_FAMIL_HC9004(), 500) });
//       }
//     })
// }

// // ANTECEDENTES FAMILIARES
// function evaluar_ANTECEDENTES_FAMIL_HC9004() {
//   activarCampo({ input: 'antfamil', type: 'n', activar: true });
//   HC9004.FAMILHC == '' ? HC9004.FAMILHC = null : HC9004.FAMILHC = HC9004.FAMILHC;
//   antecedentes_famil_HC9004(HC9004.FAMILHC, () => {
//     mostrarVista('4', 'ant', () => { validar_PERIMETRO_ABDO_HC9004() });
//     activarCampo({ input: 'antfamil', type: 'n', activar: false });
//   }, data => {
//     activarCampo({ input: 'antfamil', type: 'n', activar: false });
//     HC9004.FAMILHC = data.COD; document.getElementById('antecedentefamil').value = data.COD + '-' + data.DESCRIP;
//     validar_ANTECEDENTES_FAMIL_HC9004();
//   })
// }

// function validar_ANTECEDENTES_FAMIL_HC9004() {
//   activarCampo({ input: 'ant_famil_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#famil_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () {
//       activarCampo({ input: 'ant_famil_hc_9004', type: 's', activar: false });
//       setTimeout(function () { evaluar_ANTECEDENTES_FAMIL_HC9004() }, 500)
//     }, function () {
//       activarCampo({ input: 'ant_famil_hc_9004', type: 's', activar: false });
//       HC9004.DETALLES['FAMIL'] = document.getElementById('ant_famil_hc_9004').value;
//       mostrarVista('4', 'sig', () => { validar_NOATENCIONES_URGENCIAS_HC9004() });
//     })
// }

// // ANTECEDENTES MEDICOS
// function validar_NOATENCIONES_URGENCIAS_HC9004() {
//   activarCampo({ input: 'nro_atencion_urg_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_atencion_urghemo_9004",
//     orden: '1'
//   },
//     () => {
//       activarCampo({ input: 'nro_atencion_urg_9004', type: 'n', activar: false });
//       mostrarVista('5', 'ant', () => { validar_ANTECEDENTES_FAMIL_HC9004() });
//     },
//     function () {
//       HC9004.NO_ATENURG_HEMO = document.getElementById('nro_atencion_urg_hemo_hc_9004').value;
//       HC9004.NO_ATENURG_HEMO.trim() == '' ? HC9004.NO_ATENURG_HEMO = '0' : HC9004.NO_ATENURG_HEMO = HC9004.NO_ATENURG_HEMO;
//       if (!isNaN(HC9004.NO_ATENURG_HEMO)) {
//         if (HC9004.NO_ATENURG_HEMO == '') CON851('03', '03', validar_NOATENCIONES_URGENCIAS_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'nro_atencion_urg_9004', type: 'n', activar: false });
//           validar_NOEVENT_HEMOFILIA_HC9004();
//         }
//       } else {
//         CON851('03', '03', validar_NOATENCIONES_URGENCIAS_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_NOEVENT_HEMOFILIA_HC9004() {
//   activarCampo({ input: 'nro_even_hospi_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_event_hemofilia",
//     orden: '1'
//   },
//     () => {
//       activarCampo({ input: 'nro_even_hospi_9004', type: 'n', activar: false });
//       validar_NOATENCIONES_URGENCIAS_HC9004();
//     },
//     function () {
//       HC9004.NO_EVENT_HEMO = document.getElementById('nro_even_hospi_hemo_hc_9004').value;
//       HC9004.NO_EVENT_HEMO.trim() == '' ? HC9004.NO_EVENT_HEMO = null : HC9004.NO_EVENT_HEMO = HC9004.NO_EVENT_HEMO;
//       if (!isNaN(HC9004.NO_EVENT_HEMO)) {
//         if (HC9004.NO_EVENT_HEMO == '') CON851('03', '03', validar_NOEVENT_HEMOFILIA_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'nro_even_hospi_9004', type: 'n', activar: false });
//           validar_ANTECEDENTES_MEDIC_HC9004();
//         }
//       } else {
//         CON851('03', '03', validar_NOEVENT_HEMOFILIA_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_ANTECEDENTES_MEDIC_HC9004() {
//   activarCampo({ input: 'ant_medi_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#medic_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     () => {
//       activarCampo({ input: 'ant_medi_hc_9004', type: 's', activar: false });
//       validar_NOEVENT_HEMOFILIA_HC9004()
//     },
//     function () {
//       HC9004.DETALLES['MEDIC'] = document.getElementById('ant_medi_hc_9004').value;
//       activarCampo({ input: 'ant_medi_hc_9004', type: 's', activar: false });
//       mostrarVista('5', 'sig', () => { validar_NO_HEMARESP_HC9004() });
//     });
// }

// // ANTECEDENTES HEMORRAGICOS
// function validar_NO_HEMARESP_HC9004() {
//   activarCampo({ input: 'hemar_espon_12mes_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_hemar_espon_9004",
//     orden: '1'
//   },
//     () => {
//       activarCampo({ input: 'hemar_espon_12mes_9004', type: 'n', activar: false });
//       mostrarVista('6', 'ant', () => { validar_ANTECEDENTES_MEDIC_HC9004() });
//     },
//     function () {
//       HC9004.NO_HEMAR_ESP = document.getElementById('nro_hemar_espon_12mes_hc_9004').value;
//       HC9004.NO_HEMAR_ESP.trim() == '' ? HC9004.NO_HEMAR_ESP = '0' : HC9004.NO_HEMAR_ESP = HC9004.NO_HEMAR_ESP;
//       if (!isNaN(HC9004.NO_HEMAR_ESP)) {
//         if (HC9004.NO_HEMAR_ESP == '') CON851('03', '03', validar_NO_HEMARESP_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'hemar_espon_12mes_9004', type: 'n', activar: false });
//           validar_NO_HEMARTRAUM_HC9004();
//         }
//       } else {
//         CON851('03', '03', validar_NO_HEMARESP_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_NO_HEMARTRAUM_HC9004() {
//   activarCampo({ input: 'hemar_traum_12mes_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_hemar_traum_9004",
//     orden: '1'
//   },
//     () => {
//       activarCampo({ input: 'hemar_traum_12mes_9004', type: 'n', activar: false });
//       validar_NO_HEMARESP_HC9004();
//     },
//     function () {
//       HC9004.NO_HEMAR_TRAUM = document.getElementById('nro_hemar_traum_12mes_hc_9004').value;
//       HC9004.NO_HEMAR_TRAUM.trim() == '' ? HC9004.NO_HEMAR_TRAUM = null : HC9004.NO_HEMAR_TRAUM = HC9004.NO_HEMAR_TRAUM;
//       if (!isNaN(HC9004.NO_HEMAR_TRAUM)) {
//         if (HC9004.NO_HEMAR_TRAUM == '') CON851('03', '03', validar_NO_HEMARTRAUM_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'hemar_traum_12mes_9004', type: 'n', activar: false });
//           validar_NO_OTRHEMOR_HC9004();
//         }
//       } else {
//         CON851('03', '03', validar_NO_HEMARTRAUM_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_NO_OTRHEMOR_HC9004() {
//   activarCampo({ input: 'otr_hemor_12mes_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_otr_hemor_9004",
//     orden: '1'
//   },
//     () => {
//       activarCampo({ input: 'otr_hemor_12mes_9004', type: 'n', activar: false });
//       validar_NO_HEMARTRAUM_HC9004()
//     },
//     function () {
//       HC9004.NO_OTR_HEMOR = document.getElementById('nro_otr_hemor_12mes_hc_9004').value;
//       HC9004.NO_OTR_HEMOR.trim() == '' ? HC9004.NO_OTR_HEMOR = '0' : HC9004.NO_OTR_HEMOR = HC9004.NO_OTR_HEMOR;
//       if (!isNaN(HC9004.NO_OTR_HEMOR)) {
//         if (HC9004.NO_OTR_HEMOR == '') CON851('03', '03', validar_NO_OTRHEMOR_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'otr_hemor_12mes_9004', type: 'n', activar: false });
//           validar_ANTECEDENTES_HEMOR_HC9004();
//         }
//       } else {
//         CON851('03', '03', validar_NO_OTRHEMOR_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_ANTECEDENTES_HEMOR_HC9004() {
//   activarCampo({ input: 'ant_hemor_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#hemor_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     () => {
//       activarCampo({ input: 'ant_hemor_hc_9004', type: 's', activar: false });
//       validar_NO_OTRHEMOR_HC9004();
//     },
//     function () {
//       HC9004.DETALLES['HEMOR'] = document.getElementById('ant_hemor_hc_9004').value;
//       activarCampo({ input: 'ant_hemor_hc_9004', type: 's', activar: false });
//       mostrarVista('6', 'sig', () => { setTimeout(evaluar_REEMPLAZOS_ARTIC_HC9004(), 500) });
//     })
// }

// // ANTECEDENTES QUIRURGICOS
// function evaluar_REEMPLAZOS_ARTIC_HC9004() {
//   activarCampo({ input: 'reemplazos_articulares_9004', type: 'n', activar: true });
//   HC9004.REEMP_ARTIC = document.getElementById('reemplazos_articulares_hc_9004').value.substring(0, 1);
//   HC9004.REEMP_ARTIC.trim() == '' ? HC9004.REEMP_ARTIC = null : HC9004.REEMP_ARTIC = HC9004.REEMP_ARTIC;
//   preguntas_onco_HC9004({ seleccion: HC9004.REEMP_ARTIC, titulo: 'REEMPLAZOS ARTICULARES?' },
//     function () {
//       mostrarVista('7', 'ant', () => { setTimeout(evaluar_REEMPLAZOS_ARTIC_HC9004(), 500) });
//       activarCampo({ input: 'reemplazos_articulares_9004', type: 'n', activar: false });
//       validar_ANTECEDENTES_HEMOR_HC9004()
//     }, data => {
//       HC9004.REEMP_ARTIC = data.COD;
//       if (HC9004.REEMP_ARTIC == 'S') {
//         document.getElementById('reemplazos_articulares_hc_9004').value = data.COD + '-' + data.DESCRIP;
//         activarCampo({ input: 'reemplazos_articulares_9004', type: 'n', activar: false });
//         validar_NO_REEMP_ART_HC9004();
//       } else {
//         document.getElementById('nroremplazos_articulares_hc_9004').value = '0';
//         HC9004.NO_REEMP_ARTC = document.getElementById('nroremplazos_articulares_hc_9004').value;
//         document.getElementById('reemplazos_articulares_hc_9004').value = data.COD + '-' + data.DESCRIP
//         activarCampo({ input: 'reemplazos_articulares_9004', type: 'n', activar: false });
//         validar_NO_HEMOR_PROC_HC9004();
//       }
//     })
// }

// function validar_NO_REEMP_ART_HC9004() {
//   activarCampo({ input: 'nro_reemp_articulares_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_reemp_articulares_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'nro_reemp_articulares_9004', type: 'n', activar: false });
//       setTimeout(() => { evaluar_REEMPLAZOS_ARTIC_HC9004() }, 500)
//     },
//     function () {
//       HC9004.NO_REEMP_ARTC = document.getElementById('nroremplazos_articulares_hc_9004').value;
//       HC9004.NO_REEMP_ARTC.trim() == '' ? HC9004.NO_REEMP_ARTC = '0' : HC9004.NO_REEMP_ARTC = HC9004.NO_REEMP_ARTC;
//       if (!isNaN(HC9004.NO_REEMP_ARTC)) {
//         if (HC9004.NO_REEMP_ARTC == '') CON851('03', '03', validar_NO_REEMP_ART_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'nro_reemp_articulares_9004', type: 'n', activar: false });
//           validar_NO_HEMOR_PROC_HC9004();
//         }

//       } else {
//         CON851('03', '03', validar_NO_REEMP_ART_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_NO_HEMOR_PROC_HC9004() {
//   activarCampo({ input: 'nro_hemorproc_9004', type: 'n', activar: false });
//   validarInputs({
//     form: "#nro_hemorproc_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'nro_hemorproc_9004', type: 'n', activar: false });
//       if (HC9004.REEMP_ARTIC == 'S') validar_NO_REEMP_ART_HC9004();
//       else setTimeout(function () { evaluar_REEMPLAZOS_ARTIC_HC9004() }, 500);
//     },
//     function () {
//       HC9004.NO_HEMOR_PROC = document.getElementById('nro_hemor_proc_12mes_hc_9004').value;
//       HC9004.NO_HEMOR_PROC.trim() == '' ? HC9004.NO_HEMOR_PROC = '0' : HC9004.NO_HEMOR_PROC = HC9004.NO_HEMOR_PROC;
//       if (!isNaN(HC9004.NO_HEMOR_PROC)) {
//         if (HC9004.NO_HEMOR_PROC == '') CON851('03', '03', validar_NO_HEMOR_PROC_HC9004(), 'error', 'error');
//         else {
//           activarCampo({ input: 'nro_hemorproc_9004', type: 'n', activar: false });
//           validar_ANTECEDENTES_QUIRU_HC9004();
//         }
//       } else {
//         CON851('03', '03', validar_NO_HEMOR_PROC_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_ANTECEDENTES_QUIRU_HC9004() {
//   activarCampo({ input: 'ant_quiru_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#quiru_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     () => {
//       activarCampo({ input: 'ant_quiru_hc_9004', type: 's', activar: false });
//       validar_NO_HEMOR_PROC_HC9004()
//     },
//     function () {
//       HC9004.DETALLES['QUIRU'] = document.getElementById('ant_quiru_hc_9004').value;
//       activarCampo({ input: 'ant_quiru_hc_9004', type: 's', activar: false });
//       mostrarVista('7', 'sig', () => { setTimeout(evaluar_FACTOR_RECIBIDO_HC9004(), 500) });
//     })
// }

// // ANTECEDENTES FARMACOLÓGICOS
// function evaluar_FACTOR_RECIBIDO_HC9004() {
//   activarCampo({ input: 'factor_recib_9004', type: 'n', activar: true });
//   HC9004.FACT_RECIB = document.getElementById('factor_recibido_9004').value.substring(0, 1);
//   HC9004.FACT_RECIB == '' ? HC9004.FACT_RECIB = null : HC9004.FACT_RECIB = HC9004.FACT_RECIB;
//   factor_recibido_HC9004(HC9004.FACT_RECIB,
//     function () {
//       activarCampo({ input: 'factor_recib_9004', type: 'n', activar: false });
//       mostrarVista('8', 'ant', () => { validar_ANTECEDENTES_QUIRU_HC9004() });
//     }, data => {
//       activarCampo({ input: 'factor_recib_9004', type: 'n', activar: false });
//       HC9004.FACT_RECIB = data.COD; document.getElementById('factor_recibido_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(function () { evaluar_ESQUEMA_RECIBIDO_HC9004() }, 500)
//     })
// }

// function evaluar_ESQUEMA_RECIBIDO_HC9004() {
//   activarCampo({ input: 'esquema_recibi_9004', type: 'n', activar: true });
//   HC9004.ESQUEMA_RECIB = document.getElementById('esquema_recibido_hc_9004').value.substring(0, 1);
//   HC9004.ESQUEMA_RECIB == '' ? HC9004.ESQUEMA_RECIB = null : HC9004.ESQUEMA_RECIB = HC9004.ESQUEMA_RECIB;
//   esquema_recibido_HC9004(HC9004.ESQUEMA_RECIB,
//     function () {
//       activarCampo({ input: 'esquema_recibi_9004', type: 'n', activar: false });
//       setTimeout(function () { evaluar_FACTOR_RECIBIDO_HC9004() }, 500)
//     }, data => {
//       activarCampo({ input: 'esquema_recibi_9004', type: 'n', activar: false });
//       HC9004.ESQUEMA_RECIB = data.COD; document.getElementById('esquema_recibido_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       validar_FECHA_TRAT_HC9004();
//     })
// }

// function validar_FECHA_TRAT_HC9004() {
//   activarCampo({ input: 'fecha_ini_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#fecha_ini_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'fecha_ini_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_PRESENCIA_INHIBIDORES_HC9004(), 500);
//     }, function () {
//       HC9004.FECH_INITRAT = fechaInicioTratamiento._value;
//       if (HC9004.FECH_INITRAT == '') CON851('03', '03', validar_FECHA_TRAT_HC9004(), 'error', 'error');
//       else {
//         activarCampo({ input: 'fecha_ini_9004', type: 'n', activar: false });
//         setTimeout(function () { evaluar_ANAFILAXIS_HC9004() }, 500);
//       }
//     })
// }

// function evaluar_ANAFILAXIS_HC9004() {
//   activarCampo({ input: 'anafilaxis_9004', type: 'n', activar: true });
//   HC9004.ANAFILAXIS = document.getElementById('anafilaxis_hc_9004').value.substring(0, 1);
//   HC9004.ANAFILAXIS == '' ? HC9004.ANAFILAXIS = null : HC9004.ANAFILAXIS = HC9004.ANAFILAXIS;
//   preguntas_onco_HC9004({ seleccion: HC9004.ANAFILAXIS, titulo: 'ANAFILAXIS?' },
//     function () {
//       activarCampo({ input: 'anafilaxis_9004', type: 'n', activar: false });
//       validar_FECHA_TRAT_HC9004()
//     }, data => {
//       HC9004.ANAFILAXIS = data.COD; document.getElementById('anafilaxis_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       if (HC9004.ANAFILAXIS == 'S') {
//         activarCampo({ input: 'anafilaxis_9004', type: 'n', activar: false });
//         validar_FACTOR_ANAFIL_HC9004();
//       }
//       else {
//         HC9004.FACT_ANAFIL = '999999999999'; document.getElementById('cum_causa_anafil_hc_9004').value = '99- NO APLICA';
//         activarCampo({ input: 'anafilaxis_9004', type: 'n', activar: false });
//         validar_ANTECEDENTES_TOXI_HC9004();
//       }
//     })
// }

// function validar_FACTOR_ANAFIL_HC9004() {
//   activarCampo({ input: 'cum_causa_anafil_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#cum_causa_anafil_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cum_causa_anafil_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_ANAFILAXIS_HC9004(), 500);
//     }, function () {
//       HC9004.FACT_ANAFIL = document.getElementById('cum_causa_anafil_hc_9004').value.trim().substring(0, 13);
//       if (HC9004.FACT_ANAFIL.trim() == '') HC9004.FACT_ANAFIL = '999999999999';
//       let causa_anafil = FARMACOS.ALL.find(farmaco => farmaco.COD.trim().substring(0, 13) == HC9004.FACT_ANAFIL);
//       if (causa_anafil == undefined) CON851('01', '01', validar_FACTOR_ANAFIL_HC9004(), 'error', 'error');
//       else {
//         activarCampo({ input: 'cum_causa_anafil_9004', type: 'n', activar: false });
//         document.getElementById('cum_causa_anafil_hc_9004').value = causa_anafil.COD + '-' + causa_anafil.DESCRIPCION;
//         validar_ANTECEDENTES_TOXI_HC9004();
//       }
//     })
// }

// function validar_ANTECEDENTES_TOXI_HC9004() {
//   activarCampo({ input: 'ant_toxi_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#toxi_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () {
//       if (HC9004.ANAFILAXIS == 'S') {
//         activarCampo({ input: 'ant_toxi_hc_9004', type: 's', activar: false });
//         validar_FACTOR_ANAFIL_HC9004()
//       } else {
//         activarCampo({ input: 'ant_toxi_hc_9004', type: 's', activar: false });
//         setTimeout(() => { evaluar_ANAFILAXIS_HC9004() }, 500);
//       }
//     },
//     function () {
//       activarCampo({ input: 'ant_toxi_hc_9004', type: 's', activar: false });
//       HC9004.DETALLES['TOXIC'] = document.getElementById('ant_toxi_hc_9004').value;
//       mostrarVista('8', 'sig', () => { setTimeout(evaluar_FRACT_OSTEOPENLAS_HC9004(), 500) });
//       ;
//     })
// }

// //----------------- ANTECEDENTES TRAUMATICOS---------------

// function evaluar_FRACT_OSTEOPENLAS_HC9004() {
//   activarCampo({ input: 'fract_osteo_9004', type: 'n', activar: true });
//   HC9004.FRACT_OSTEO = document.getElementById('fract_osteo_hc_9004').value.substring(0, 1);
//   HC9004.FRACT_OSTEO == '' ? HC9004.FRACT_OSTEO = 'N' : HC9004.FRACT_OSTEO = HC9004.FRACT_OSTEO;
//   preguntas_onco_HC9004({ seleccion: HC9004.FRACT_OSTEO, titulo: 'PADECE FRACTURAS/OSTEOPENLAS U OSTEOPOROSIS?' },
//     function () {
//       activarCampo({ input: 'fract_osteo_9004', type: 'n', activar: false });
//       mostrarVista('9', 'ant', () => { validar_ANTECEDENTES_TOXI_HC9004() });
//     }, data => {
//       activarCampo({ input: 'fract_osteo_9004', type: 'n', activar: false });
//       HC9004.FRACT_OSTEO = data.COD; document.getElementById('fract_osteo_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => { evaluar_PSEUDOTUMORES_HC9004() }, 500);
//     })
// }

// function evaluar_PSEUDOTUMORES_HC9004() {
//   activarCampo({ input: 'psudotumores_9004', type: 'n', activar: true });
//   HC9004.PSUDOTUMORES = document.getElementById('pseudotumores_hc_9004').value.substring(0, 1);
//   HC9004.PSUDOTUMORES == '' ? HC9004.PSUDOTUMORES = 'N' : HC9004.PSUDOTUMORES = HC9004.PSUDOTUMORES;
//   preguntas_onco_HC9004({ seleccion: HC9004.PSUDOTUMORES, titulo: 'PSEUDOTUMORES?' },
//     function () {
//       activarCampo({ input: 'psudotumores_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_FRACT_OSTEOPENLAS_HC9004(), 500)
//     }, data => {
//       activarCampo({ input: 'psudotumores_9004', type: 'n', activar: false });
//       HC9004.PSUDOTUMORES = data.COD; document.getElementById('pseudotumores_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       validar_HEMOR_TRAUM_HC9004();
//     })
// }

// function validar_HEMOR_TRAUM_HC9004() {
//   activarCampo({ input: 'nro_hemor_traum_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_hemor_traum_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'nro_hemor_traum_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_PSEUDOTUMORES_HC9004(), 500);
//     }, function () {
//       HC9004.NO_HEMOR_TRAUM = parseInt(document.getElementById('nro_hemor_traum_hc_9004').value);
//       if (!isNaN(HC9004.NO_HEMOR_TRAUM)) {
//         HC9004.NO_HEMOR_TRAUM == '' ? HC9004.NO_HEMOR_TRAUM = '0' : HC9004.NO_HEMOR_TRAUM = HC9004.NO_HEMOR_TRAUM;
//         activarCampo({ input: 'nro_hemor_traum_9004', type: 'n', activar: false });
//         validar_ANTECEDENTES_TRAUM_HC9004();
//       } else { CON851('03', '03', validar_HEMOR_TRAUM_HC9004(), 'error', 'error'); }
//     })
// }

// function validar_ANTECEDENTES_TRAUM_HC9004() {
//   activarCampo({ input: 'ant_traum_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#traum_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () {
//       activarCampo({ input: 'ant_traum_hc_9004', type: 's', activar: false });
//       validar_HEMOR_TRAUM_HC9004()
//     }, function () {
//       activarCampo({ input: 'ant_traum_hc_9004', type: 's', activar: false });
//       HC9004.DETALLES['TRAUM'] = document.getElementById('ant_traum_hc_9004').value;
//       mostrarVista('9', 'sig', () => { setTimeout(() => evaluar_PLANIFAMIL_HC9004(), 500); });
//     })
// }

// //-----------------ANTECEDENTES GINECOOBSTETRICOS --------------
// function evaluar_PLANIFAMIL_HC9004() {
//   activarCampo({ input: 'plan_famil_9004', type: 'n', activar: true });
//   HC9004.PLANFAMIL = document.getElementById('plan_famil_hc_9004').value.substring(0, 1);
//   HC9004.PLANFAMIL == '' ? HC9004.PLANFAMIL = null : HC9004.PLANFAMIL = HC9004.PLANFAMIL;
//   planificacion_famil_HC9004(HC9004.PLANFAMIL,
//     function () {
//       activarCampo({ input: 'plan_famil_9004', type: 'n', activar: false });
//       validar_ANTECEDENTES_TRAUM_HC9004()
//     }, data => {
//       HC9004.PLANFAMIL = data.COD; document.getElementById('plan_famil_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       activarCampo({ input: 'plan_famil_9004', type: 'n', activar: false });
//       validar_ANTECEDENTES_GINEC_HC9004();
//     })
// }

// function validar_ANTECEDENTES_GINEC_HC9004() {
//   activarCampo({ input: 'ant_ginec_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#ginec_9004",
//       orden: '1'
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () {
//       activarCampo({ input: 'ant_ginec_hc_9004', type: 's', activar: false });
//       mostrarVista('10', 'ant', () => { setTimeout(evaluar_PLANIFAMIL_HC9004(), 500) });
//     }, function () {
//       activarCampo({ input: 'ant_ginec_hc_9004', type: 's', activar: false });
//       HC9004.DETALLES['GINEC'] = document.getElementById('ant_ginec_hc_9004').value;
//       mostrarVista('10', 'sig', () => { validar_EDAD_DX_HC9004() });
//     })
// }

// //-----------------DIAGNOSTICO -------------------------------//
// function validar_EDAD_DX_HC9004() {
//   activarCampo({ input: 'edad_dx_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#edad_dx_9004",
//     orden: '1'
//   }, function () {
//     activarCampo({ input: 'edad_dx_9004', type: 'n', activar: false });
//     mostrarVista('11', 'ant', () => { validar_ANTECEDENTES_GINEC_HC9004() });
//   }, function () {
//     HC9004.EDAD_DX = document.getElementById('edad_dx_hc_9004').value;
//     HC9004.EDAD_DX == '' ? HC9004.EDAD_DX = '0' : HC9004.EDAD_DX = HC9004.EDAD_DX;

//     if (isNaN(HC9004.EDAD_DX)) { CON851('03', '03', validar_EDAD_DX_HC9004(), 'error', 'error') }
//     else {
//       activarCampo({ input: 'edad_dx_9004', type: 'n', activar: false });
//       setTimeout(() => { evaluar_UNDEDAD_DX_HC9004() }, 500);
//     }
//   })
// }

// function evaluar_UNDEDAD_DX_HC9004() {
//   activarCampo({ input: 'unid_edad_dx_hc_9004', type: 'n', activar: true });
//   HC9004.UNDEDAD_DX = document.getElementById('unid_edad_dx_hc_9004').value.substring(0, 1);
//   undedad_dx_HC9004(HC9004.UNDEDAD_DX,
//     function () {
//       activarCampo({ input: 'unid_edad_dx_hc_9004', type: 'n', activar: false });
//       validar_EDAD_DX_HC9004();
//     }, (data) => {
//       HC9004.UNDEDAD_DX = data.COD; document.getElementById('unid_edad_dx_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       activarCampo({ input: 'unid_edad_dx_hc_9004', type: 'n', activar: true });
//       setTimeout(() => { evaluar_FECHA_DX_HC9004() }, 500);
//     })
// }
// function evaluar_FECHA_DX_HC9004() {
//   activarCampo({ input: 'fecha_dx_9004', type: 'n', activar: true });
//   HC9004.FECH_DX = fechaDiagnostico._value.substring(0, 8);
//   fecha_dx_HC9004(HC9004.FECH_DX,
//     function () {
//       activarCampo({ input: 'fecha_dx_9004', type: 'n', activar: false });
//       setTimeout(() => { evaluar_UNDEDAD_DX_HC9004() }, 500)
//     }, (data) => {
//       activarCampo({ input: 'fecha_dx_9004', type: 'n', activar: false });
//       if (data.COD == 'S') {
//         validar_FECHA_DX_HC9004();
//       } else {
//         fechaDiagnostico.typedValue = data.VAL;
//         HC9004.FECH_DX = fechaDiagnostico.unmaskedValue.substring(0, 8);
//         setTimeout(() => { evaluar_TIPO_DEFICIENCIA_HC9004() }, 500)
//       }

//     })
// }
// function validar_FECHA_DX_HC9004() {
//   activarCampo({ input: 'fecha_dx_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#fecha_dx_9004",
//     orden: '1'
//   }, function () {
//     activarCampo({ input: 'fecha_dx_9004', type: 'n', activar: false });
//     setTimeout(() => evaluar_UNDEDAD_DX_HC9004, 500)
//   }, function () {
//     activarCampo({ input: 'fecha_dx_9004', type: 'n', activar: false });
//     HC9004.FECH_DX = fechaDiagnostico.unmaskedValue;
//     if (HC9004.FECH_DX == '') CON851('03', '03', validar_FECHA_DX_HC9004(), 'error', 'error');
//     else setTimeout(function () { evaluar_TIPO_DEFICIENCIA_HC9004() }, 500);
//   })
// }

// function evaluar_TIPO_DEFICIENCIA_HC9004() {
//   activarCampo({ input: 'tipo_def_dx_hc_9004', type: 'n', activar: true });
//   HC9004.DEFICIENCIA_DX = document.getElementById('tipo_def_dx_hc_9004').value.substring(0, 1);
//   deficiencia_dx_HC9004(HC9004.DEFICIENCIA_DX,
//     function () {
//       activarCampo({ input: 'tipo_def_dx_hc_9004', type: 'n', activar: false });
//       validar_FECHA_DX_HC9004()
//     }, data => {
//       activarCampo({ input: 'tipo_def_dx_hc_9004', type: 'n', activar: false });
//       HC9004.DEFICIENCIA_DX = data.COD; document.getElementById('tipo_def_dx_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => evaluar_SEVERIDAD_DX_HC9004(), 500)
//     })
// }

// function evaluar_SEVERIDAD_DX_HC9004() {
//   activarCampo({ input: 'severidad_dx_9004', type: 'n', activar: true });
//   HC9004.SEVERIDAD_DX = document.getElementById('severidad_dx_9004').value.substring(0, 1);
//   severidad_dx_HC9004(HC9004.SEVERIDAD_DX,
//     function () {
//       activarCampo({ input: 'severidad_dx_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_TIPO_DEFICIENCIA_HC9004(), 500)
//     }, data => {
//       activarCampo({ input: 'severidad_dx_9004', type: 'n', activar: false });
//       HC9004.SEVERIDAD_DX = data.COD; document.getElementById('severidad_dx_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => { evaluar_MOTIV_DX_HC9004() }, 500);
//     })
// }
// function evaluar_MOTIV_DX_HC9004() {
//   activarCampo({ input: 'motivo_dx_9004', type: 'n', activar: true });
//   HC9004.MOTIV_DX = document.getElementById('motivo_prueba_dx_hc_9004').value.substring(0, 1);
//   motivo_dx_HC9004(HC9004.MOTIV_DX,
//     function () {
//       activarCampo({ input: 'motivo_dx_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_SEVERIDAD_DX_HC9004(), 500);
//     }, data => {
//       activarCampo({ input: 'motivo_dx_9004', type: 'n', activar: false });
//       HC9004.MOTIV_DX = data.COD; document.getElementById('motivo_prueba_dx_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       mostrarVista('11', 'sig', () => { setTimeout(() => { evaluar_PROF_ATEN_HC9004() }, 500) });
//     })
// }

// //------------------ ANALISIS Y PLAN ------------------//  
// function evaluar_PROF_ATEN_HC9004() {
//   activarCampo({ input: 'proflider_atencion_9004', type: 'n', activar: true });
//   HC9004.PROF_ATEN = document.getElementById('prof_lider_atencion_hc_9004').value.substring(0, 1);
//   proflider_atencion_HC9004(HC9004.PROF_ATEN,
//     function () {
//       activarCampo({ input: 'proflider_atencion_9004', type: 'n', activar: false });
//       mostrarVista('12', 'ant', () => { setTimeout(() => evaluar_MOTIV_DX_HC9004(), 500) });
//     }, data => {
//       activarCampo({ input: 'proflider_atencion_9004', type: 'n', activar: false });
//       HC9004.PROF_ATEN = data.COD; document.getElementById('prof_lider_atencion_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => { evaluar_INTERVENCION_ENFERM_HC9004() }, 500)
//     })
// }

// function evaluar_INTERVENCION_ENFERM_HC9004() {
//   activarCampo({ input: 'interenfer_9004', type: 'n', activar: true });
//   HC9004.INTER_ENFER = document.getElementById('inter_prof_enfer_hc_9004').value.substring(0, 1);
//   preguntas_onco_HC9004({ seleccion: HC9004.INTER_ENFER, titulo: 'INTERVENCIÓN POR ENFERMERÍA PROFESIONAL?' },
//     function () {
//       activarCampo({ input: 'interenfer_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_PROF_ATEN_HC9004(), 500);
//     }, data => {
//       activarCampo({ input: 'interenfer_9004', type: 'n', activar: false });
//       HC9004.INTER_ENFER = data.COD; document.getElementById('inter_prof_enfer_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       mostrarVista('12', 'sig', () => { validar_CONS_HEMA_HC9004() });
//     })
// }
// /*-------------------NUMERO CONSULTAS---------------*/
// function validar_CONS_HEMA_HC9004() {
//   activarCampo({ input: 'cons_hema_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_hematologia_9004",
//     orden: '1'
//   }, function () {
//     activarCampo({ input: 'cons_hema_9004', type: 'n', activar: false });
//     mostrarVista('13', 'ant', () => { setTimeout(() => evaluar_INTERVENCION_ENFERM_HC9004(), 500) });
//   }, function () {
//     activarCampo({ input: 'cons_hema_9004', type: 'n', activar: false });
//     HC9004.CONSUL_HEMA = document.getElementById('nro_con_hematologia_hc_9004').value;
//     HC9004.CONSUL_HEMA == '' ? HC9004.CONSUL_HEMA = '0' : HC9004.CONSUL_HEMA = HC9004.CONSUL_HEMA;
//     if (!isNaN(HC9004.CONSUL_HEMA)) {
//       if (HC9004.CONSUL_HEMA == '') CON851('03', '03', validar_CONS_HEMA_HC9004(), 'error', 'error');
//       else validar_CONS_ORTOP_HC9004();
//     } else {
//       CON851('03', '03', validar_CONS_HEMA_HC9004(), 'error', 'error');
//     }
//   })
// }

// function validar_CONS_ORTOP_HC9004() {
//   activarCampo({ input: 'cons_ortop_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_ortopedia_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cons_ortop_9004', type: 'n', activar: false });
//       validar_CONS_HEMA_HC9004();
//     }, function () {
//       activarCampo({ input: 'cons_ortop_9004', type: 'n', activar: false });
//       HC9004.CONSUL_ORTOP = document.getElementById('nro_con_ortopedia_hc_9004').value;
//       HC9004.CONSUL_ORTOP == '' ? HC9004.CONSUL_ORTOP = '0' : HC9004.CONSUL_ORTOP = HC9004.CONSUL_ORTOP;
//       if (!isNaN(HC9004.CONSUL_ORTOP)) {
//         if (HC9004.CONSUL_ORTOP == '') CON851('03', '03', validar_CONS_ORTOP_HC9004(), 'error', 'error');
//         else validar_CONS_ODONTO_HC9004();
//       } else {
//         CON851('03', '03', validar_CONS_ORTOP_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_CONS_ODONTO_HC9004() {
//   activarCampo({ input: 'cons_odonto_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_odontologia_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cons_odonto_9004', type: 'n', activar: false });
//       validar_CONS_ORTOP_HC9004();
//     }, function () {
//       activarCampo({ input: 'cons_odonto_9004', type: 'n', activar: false });
//       HC9004.CONSUL_ODONTO = document.getElementById('nro_con_odontologia_hc_9004').value;
//       HC9004.CONSUL_ODONTO == '' ? HC9004.CONSUL_ODONTO = '0' : HC9004.CONSUL_ODONTO = HC9004.CONSUL_ODONTO;
//       if (!isNaN(HC9004.CONSUL_ODONTO)) {
//         if (HC9004.CONSUL_ODONTO == '') CON851('03', '03', validar_CONS_ODONTO_HC9004(), 'error', 'error');
//         else validar_CONS_NUTRI_HC9004();
//       } else {
//         CON851('03', '03', validar_CONS_ODONTO_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_CONS_NUTRI_HC9004() {
//   activarCampo({ input: 'cons_nutr_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_nutricion_9004",
//     orden: '1'
//   }, function () {
//     activarCampo({ input: 'cons_nutr_9004', type: 'n', activar: false });
//     validar_CONS_ODONTO_HC9004()
//   }, function () {
//     activarCampo({ input: 'cons_nutr_9004', type: 'n', activar: false });
//     HC9004.CONSUL_NUTRI = document.getElementById('nro_con_nutricion_hc_9004').value;
//     HC9004.CONSUL_NUTRI == '' ? HC9004.CONSUL_NUTRI = '0' : HC9004.CONSUL_NUTRI = HC9004.CONSUL_NUTRI;
//     if (!isNaN(HC9004.CONSUL_NUTRI)) {
//       if (HC9004.CONSUL_NUTRI == '') CON851('03', '03', validar_CONS_NUTRI_HC9004(), 'error', 'error');
//       else validar_CONS_TSOCIAL_HC9004();
//     } else {
//       CON851('03', '03', validar_CONS_NUTRI_HC9004(), 'error', 'error');
//     }
//   })
// }

// function validar_CONS_TSOCIAL_HC9004() {
//   activarCampo({ input: 'cons_terasocial_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_terapiasocial_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cons_terasocial_9004', type: 'n', activar: false });
//       validar_CONS_NUTRI_HC9004();
//     }, function () {
//       activarCampo({ input: 'cons_terasocial_9004', type: 'n', activar: false });
//       HC9004.CONSUL_TSOCIAL = document.getElementById('nro_con_t_social_hc_9004').value;
//       HC9004.CONSUL_TSOCIAL == '' ? HC9004.CONSUL_TSOCIAL = '0' : HC9004.CONSUL_TSOCIAL = HC9004.CONSUL_TSOCIAL;
//       if (!isNaN(HC9004.CONSUL_TSOCIAL)) {
//         if (HC9004.CONSUL_TSOCIAL == '') CON851('03', '03', validar_CONS_TSOCIAL_HC9004(), 'error', 'error');
//         else validar_CONS_FISIATRIA_HC9004();
//       } else {
//         CON851('03', '03', validar_CONS_TSOCIAL_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_CONS_FISIATRIA_HC9004() {
//   activarCampo({ input: 'cons_fisia_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_fisiatria_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cons_fisia_9004', type: 'n', activar: false });
//       validar_CONS_TSOCIAL_HC9004()
//     }, function () {
//       activarCampo({ input: 'cons_fisia_9004', type: 'n', activar: false });
//       HC9004.CONSUL_FISIATRIA = document.getElementById('nro_con_fisiatria_hc_9004').value;
//       HC9004.CONSUL_TSOCIAL == '' ? HC9004.CONSUL_FISIATRIA = '0' : HC9004.CONSUL_FISIATRIA = HC9004.CONSUL_FISIATRIA;
//       if (!isNaN(HC9004.CONSUL_FISIATRIA)) {
//         if (HC9004.CONSUL_FISIATRIA == '') CON851('03', '03', validar_CONS_FISIATRIA_HC9004(), 'error', 'error');
//         else validar_CONS_PSICOLOGIA_HC9004();
//       } else {
//         CON851('03', '03', validar_CONS_FISIATRIA_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_CONS_PSICOLOGIA_HC9004() {
//   activarCampo({ input: 'cons_psico_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_psicologia_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cons_psico_9004', type: 'n', activar: false });
//       validar_CONS_FISIATRIA_HC9004();
//     }, function () {
//       activarCampo({ input: 'cons_psico_9004', type: 'n', activar: false });
//       HC9004.CONSUL_PSICOLOGIA = document.getElementById('nro_con_psicologia_hc_9004').value;
//       HC9004.CONSUL_PSICOLOGIA == '' ? HC9004.CONSUL_PSICOLOGIA = '0' : HC9004.CONSUL_PSICOLOGIA = HC9004.CONSUL_PSICOLOGIA;
//       if (!isNaN(HC9004.CONSUL_PSICOLOGIA)) {
//         if (HC9004.CONSUL_PSICOLOGIA == '') CON851('03', '03', validar_CONS_PSICOLOGIA_HC9004(), 'error', 'error');
//         else validar_CONS_QUIMFARMA_HC9004();
//       } else {
//         CON851('03', '03', validar_CONS_PSICOLOGIA_HC9004(), 'error', 'error');
//       }
//     })
// }

// function validar_CONS_QUIMFARMA_HC9004() {
//   activarCampo({ input: 'cons_quim_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_quimifarma_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cons_quim_9004', type: 'n', activar: false });
//       validar_CONS_FISIATRIA_HC9004();
//     }, function () {
//       activarCampo({ input: 'cons_quim_9004', type: 'n', activar: false });
//       HC9004.CONSUL_QUIMFARMA = document.getElementById('nro_com_quim_farma_hc_9004').value;
//       HC9004.CONSUL_QUIMFARMA == '' ? HC9004.CONSUL_QUIMFARMA = '0' : HC9004.CONSUL_QUIMFARMA = HC9004.CONSUL_QUIMFARMA;
//       if (isNaN(HC9004.CONSUL_QUIMFARMA)) {
//         CON851('03', '03', validar_CONS_QUIMFARMA_HC9004(), 'error', 'error');
//       } else validar_CONS_FISIOTERAPIA_HC9004();
//     })
// }

// function validar_CONS_FISIOTERAPIA_HC9004() {
//   activarCampo({ input: 'cons_fisioter_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#con_fisioterapia_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cons_fisioter_9004', type: 'n', activar: false });
//       validar_CONS_QUIMFARMA_HC9004()
//     }, function () {
//       activarCampo({ input: 'cons_fisioter_9004', type: 'n', activar: false });
//       HC9004.CONSUL_FISIOTERAPIA = document.getElementById('nro_con_fisioterapia_hc_9004').value;
//       HC9004.CONSUL_FISIOTERAPIA == '' ? HC9004.CONSUL_FISIOTERAPIA = '0' : HC9004.CONSUL_FISIOTERAPIA = HC9004.CONSUL_FISIOTERAPIA;
//       if (isNaN(HC9004.CONSUL_FISIOTERAPIA)) {
//         CON851('03', '03', validar_CONS_FISIOTERAPIA_HC9004(), 'error', 'error');
//       } else {
//         mostrarVista('13', 'sig', () => { validar_CUMPOS_HC9004() });
//       }
//     })
// }
// //-----------------ADMINISTRACION DE MEDICAMENTOS ----------------//
// function validar_CUMPOS_HC9004() {
//   activarCampo({ input: 'cumpos_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#cum_pos_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cumpos_9004', type: 'n', activar: false });
//       mostrarVista('14', 'ant', () => { validar_CONS_FISIOTERAPIA_HC9004() });
//     }, function () {
//       activarCampo({ input: 'cumpos_9004', type: 'n', activar: false });
//       HC9004.CUMPOS = document.getElementById('cum_pos_hc_9004').value.trim().substring(0, 13);
//       if (HC9004.CUMPOS.trim() == '') HC9004.CUMPOS = '999999999999';
//       const pos = FARMACOS['POS'].find(farmaco => farmaco.COD.trim().substring(0, 13) == HC9004.CUMPOS);
//       if (typeof (pos) == 'undefined' || (pos.COD == HC9004.FACT_ANAFIL.trim() && pos.COD != '999999999999')) CON851('03', '03', validar_CUMPOS_HC9004(), 'error', 'error');
//       else {
//         HC9004.CUMPOS = pos.COD
//         document.getElementById('cum_pos_hc_9004').value = pos.COD + '-' + pos.DESCRIPCION;
//         validar_CUMNOPOS_HC9004();
//       }
//     })
// }
// function validar_CUMNOPOS_HC9004() {
//   activarCampo({ input: 'cumnopos_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#cum_nopos_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cumnopos_9004', type: 'n', activar: false });
//       validar_CUMPOS_HC9004();
//     }
//     , function () {
//       activarCampo({ input: 'cumnopos_9004', type: 'n', activar: false });
//       HC9004.CUMNOPOS = document.getElementById('cum_nopos_hc_9004').value.trim().substring(0, 13);
//       if (HC9004.CUMNOPOS.trim() == '') HC9004.CUMNOPOS = '999999999999';
//       const pos = FARMACOS['NOPOS'].find(farmaco => farmaco.COD.trim().substring(0, 13) == HC9004.CUMNOPOS);
//       if (typeof (pos) == 'undefined' || (pos.COD == HC9004.FACT_ANAFIL.trim() && pos.COD != '999999999999')) CON851('03', '03', validar_CUMNOPOS_HC9004(), 'error', 'error');
//       else {
//         HC9004.CUMNOPOS = pos.COD;
//         document.getElementById('cum_nopos_hc_9004').value = pos.COD + '-' + pos.DESCRIPCION;
//         validar_CUMPOSOTR_HC9004();
//       }
//     })
// }

// function validar_CUMPOSOTR_HC9004() {
//   activarCampo({ input: 'cumposotr_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#cum_posotr_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cumposotr_9004', type: 'n', activar: false });
//       validar_CUMNOPOS_HC9004();
//     }, function () {
//       activarCampo({ input: 'cumposotr_9004', type: 'n', activar: false });
//       HC9004.CUMPOSOTR = document.getElementById('cum_otros1_trat_hc_9004').value.trim().substring(0, 13);
//       if (HC9004.CUMPOSOTR.trim() == '') HC9004.CUMPOSOTR = '999999999999';
//       const pos = FARMACOS['POS'].find(farmaco => farmaco.COD.trim().substring(0, 13) == HC9004.CUMPOSOTR);
//       if (typeof (pos) == 'undefined' || (pos.COD == HC9004.FACT_ANAFIL.trim() && pos.COD != '999999999999')) CON851('03', '03', validar_CUMPOSOTR_HC9004(), 'error', 'error');
//       else {
//         HC9004.CUMPOSOTR = pos.COD;
//         document.getElementById('cum_otros1_trat_hc_9004').value = pos.COD + '-' + pos.DESCRIPCION;
//         validar_CUMNOPOSOTR_HC9004();
//       }
//     })
// }

// function validar_CUMNOPOSOTR_HC9004() {
//   activarCampo({ input: 'cum_noposotr_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#cum_noposotr_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'cum_noposotr_9004', type: 'n', activar: false });
//       validar_CUMPOSOTR_HC9004();
//     }, function () {
//       activarCampo({ input: 'cum_noposotr_9004', type: 'n', activar: false });
//       HC9004.CUMNOPOSOTR = document.getElementById('cum_otros2_trat_hc_9004').value.trim().substring(0, 13);
//       if (HC9004.CUMNOPOSOTR.trim() == '') HC9004.CUMNOPOSOTR = '999999999999';
//       const pos = FARMACOS['NOPOS'].find(farmaco => farmaco.COD == HC9004.CUMNOPOSOTR);

//       if (typeof (pos) == 'undefined' || (pos.COD == HC9004.FACT_ANAFIL.trim() && pos.COD != '999999999999')) CON851('03', '03', validar_CUMNOPOSOTR_HC9004(), 'error', 'error')
//       else {
//         HC9004.CUMNOPOSOTR = pos.COD; document.getElementById('cum_otros2_trat_hc_9004').value = pos.COD + '-' + pos.DESCRIPCION;
//         mostrarVista('14', 'sig', () => { setTimeout(evaluar_FACTOR_RECIBIDO_ACT_HC9004(), 500) });
//       }
//     })
// }

// //------------------- TRATAMIENTO ACTUAL-------------------------------//
// function evaluar_FACTOR_RECIBIDO_ACT_HC9004() {
//   activarCampo({ input: 'factor_recib_act_9004', type: 'n', activar: true });
//   HC9004.FACT_RECIB_ACT = document.getElementById('factor_recibido_act_hc_9004').value.substring(0, 1);
//   HC9004.FACT_RECIB_ACT == '' ? HC9004.FACT_RECIB_ACT = null : HC9004.FACT_RECIB_ACT = HC9004.FACT_RECIB_ACT;
//   factor_recibido_act_HC9004(HC9004.FACT_RECIB_ACT,
//     function () {
//       activarCampo({ input: 'factor_recib_act_9004', type: 'n', activar: false });
//       validar_CUMNOPOSOTR_HC9004()
//     }, data => {
//       activarCampo({ input: 'factor_recib_act_9004', type: 'n', activar: false });
//       HC9004.FACT_RECIB_ACT = data.COD; document.getElementById('factor_recibido_act_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => { evaluar_ESQUEMA_RECIBIDO_ACT_HC9004() }, 500);
//     })
// }

// function evaluar_ESQUEMA_RECIBIDO_ACT_HC9004() {
//   activarCampo({ input: 'esquem_recib_act_9004', type: 'n', activar: true });
//   HC9004.ESQUEMA_RECIB_ACT = document.getElementById('esquema_recibido_act_hc_9004').value.substring(0, 1);
//   HC9004.ESQUEMA_RECIB_ACT == '' ? HC9004.ESQUEMA_RECIB_ACT = null : HC9004.ESQUEMA_RECIB_ACT = HC9004.ESQUEMA_RECIB_ACT;
//   esquema_recibido_act_HC9004(HC9004.ESQUEMA_RECIB_ACT,
//     function () {
//       activarCampo({ input: 'esquem_recib_act_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_FACTOR_RECIBIDO_ACT_HC9004(), 500)
//     }, data => {
//       activarCampo({ input: 'esquem_recib_act_9004', type: 'n', activar: false });
//       HC9004.ESQUEMA_RECIB_ACT = data.COD; document.getElementById('esquema_recibido_act_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => { evaluar_APLICA_ULTDOSIS_HC9004() }, 500);
//     })
// }

// function evaluar_APLICA_ULTDOSIS_HC9004() {
//   activarCampo({ input: 'ultdosis_9004', type: 'n', activar: true });
//   HC9004.ULT_DOSIS = document.getElementById('ult_dosis_acthc_9004').value.substring(0, 1);
//   HC9004.ULT_DOSIS == '0' ? HC9004.ULT_DOSIS = null : HC9004.ULT_DOSIS = HC9004.ULT_DOSIS;
//   aplica_ultdosis_HC9004(HC9004.ULT_DOSIS,
//     function () {
//       activarCampo({ input: 'ultdosis_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_ESQUEMA_RECIBIDO_ACT_HC9004(), 500)
//     }, data => {
//       activarCampo({ input: 'ultdosis_9004', type: 'n', activar: false });
//       HC9004.ULT_DOSIS = data.VAL;
//       if (data.COD == 'S') validar_ULT_DOSIS_HC9004();
//       else {
//         HC9004.ULT_DOSIS = data.VAL;
//         document.getElementById('ult_dosis_acthc_9004').value = data.COD + '-' + data.DESCRIP;
//         setTimeout(() => { evaluar_FREC_SEMANAL_HC9004() }, 500)
//       }
//     })
// }

// function validar_ULT_DOSIS_HC9004() {
//   activarCampo({ input: 'ultdosis_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#ul_dosis_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'ultdosis_9004', type: 'n', activar: false });
//       setTimeout(() => evaluar_APLICA_ULTDOSIS_HC9004(), 500);
//     }, function () {
//       const cdosis = document.getElementById('ult_dosis_acthc_9004').value.padStart(4, '0') + '(UD)';
//       document.getElementById('ult_dosis_acthc_9004').value = cdosis; HC9004.ULT_DOSIS = cdosis.substring(0, 4);
//       activarCampo({ input: 'ultdosis_9004', type: 'n', activar: false });
//       if (isNaN(HC9004.ULT_DOSIS)) { CON851('03', '03', validar_ULT_DOSIS_HC9004(), 'error', 'error'); }
//       else { setTimeout(() => evaluar_FREC_SEMANAL_HC9004(), 500) }
//     })
// }

// function evaluar_FREC_SEMANAL_HC9004() {
//   activarCampo({ input: 'frec_semana_9004', type: 'n', activar: true });
//   HC9004.FREC_SEMANA = document.getElementById('frecuencia_semana_hc_9004').value.substring(0, 1);
//   HC9004.FREC_SEMANA == '' ? HC9004.FREC_SEMANA = null : HC9004.FREC_SEMANA = HC9004.FREC_SEMANA;
//   frec_semana_HC9004(HC9004.FREC_SEMANA,
//     function () {
//       activarCampo({ input: 'frec_semana_9004', type: 'n', activar: false });
//       validar_ULT_DOSIS_HC9004();
//     }, data => {
//       activarCampo({ input: 'frec_semana_9004', type: 'n', activar: false });
//       HC9004.FREC_SEMANA = data.COD; document.getElementById('frecuencia_semana_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => evaluar_DLUI_PERIODO_HC9004(), 500)
//     })
// }

// function evaluar_DLUI_PERIODO_HC9004() {
//   activarCampo({ input: 'uild_periodo_9004', type: 'n', activar: true });
//   HC9004.PREG_DLUI_PERIODO = document.getElementById('uild_periodo_hc_9004').value.substring(0, 1);
//   admin_aplicaciones_HC9004(HC9004.PREG_DLUI_PERIODO, validar_ULT_DOSIS_HC9004,
//     data => {
//       activarCampo({ input: 'uild_periodo_9004', type: 'n', activar: false });
//       HC9004.PREG_DLUI_PERIODO = data.COD;
//       if (HC9004.PREG_DLUI_PERIODO == 'S') {
//         document.getElementById('uild_periodo_hc_9004').value = data.COD + '-' + data.DESCRIP;
//         validar_NO_APLFACTOR_HC9004();
//       } else {
//         document.getElementById('nro_apl_factor_hc_9004').value = '0';
//         HC9004.NRO_APL_FACTOR = document.getElementById('nro_apl_factor_hc_9004').value;
//         document.getElementById('uild_periodo_hc_9004').value = data.COD + '-' + data.DESCRIP;
//         setTimeout(() => { evaluar_VIA_ADMIN_HC9004() }, 500);
//       }
//     })
// }

// function validar_NO_APLFACTOR_HC9004() {
//   activarCampo({ input: 'apl_factor_9004', type: 'n', activar: true });
//   validarInputs({
//     form: "#nro_apl_factor_9004",
//     orden: '1'
//   },
//     function () {
//       activarCampo({ input: 'apl_factor_9004', type: 'n', activar: false });
//       if (HC9004.PREG_DLUI_PERIODO == 'S') {
//         setTimeout(() => { evaluar_DLUI_PERIODO_HC9004() }, 500)
//       } else { setTimeout(() => { evaluar_FREC_SEMANAL_HC9004() }, 500) }
//     },
//     function () {
//       activarCampo({ input: 'apl_factor_9004', type: 'n', activar: false });
//       HC9004.NRO_APL_FACTOR = (document.getElementById('nro_apl_factor_hc_9004').value).toString().trim();
//       if (typeof HC9004.NRO_APL_FACTOR == "undefined" || HC9004.NRO_APL_FACTOR.toString().trim() == '') {
//         CON851('03', '03', validar_DLUI_PERIODO_HC9004(), 'error', 'error');
//       } else {
//         if (isNaN(HC9004.NRO_APL_FACTOR)) { CON851('03', '03', validar_DLUI_PERIODO_HC9004(), 'error', 'error'); }
//         else {
//           document.getElementById('nro_apl_factor_hc_9004').value = HC9004.NRO_APL_FACTOR.toString().trim();
//           setTimeout(() => { evaluar_VIA_ADMIN_HC9004() }, 500);
//         }
//       }
//     })
// }

// function evaluar_VIA_ADMIN_HC9004() {
//   activarCampo({ input: 'via_adm_9004', type: 'n', activar: true });
//   HC9004.VIA_ADMIN = document.getElementById('via_admin_hc_9004').value.substring(0, 1);
//   HC9004.VIA_ADMIN == '' ? HC9004.VIA_ADMIN = '' : HC9004.VIA_ADMIN = HC9004.VIA_ADMIN;
//   via_admin_HC9004(HC9004.VIA_ADMIN,
//     function () {
//       activarCampo({ input: 'via_adm_9004', type: 'n', activar: false });
//       if (HC9004.PREG_DLUI_PERIODO == 'S') {
//         validar_NO_APLFACTOR_HC9004()
//       } else {
//         setTimeout(() => { evaluar_DLUI_PERIODO_HC9004() }, 500)
//       }
//     }, data => {
//       activarCampo({ input: 'via_adm_9004', type: 'n', activar: false });
//       HC9004.VIA_ADMIN = data.COD; document.getElementById('via_admin_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       setTimeout(() => { evaluar_MOD_TRATAMIENTO_HC9004() }, 500)
//     })
// }

// function evaluar_MOD_TRATAMIENTO_HC9004() {
//   activarCampo({ input: 'modapl_tart_9004', type: 'n', activar: true });
//   HC9004.MOD_APL = document.getElementById('modalidad_apl_trat_h_9004').value.substring(0, 1);
//   HC9004.MOD_APL == '' ? HC9004.MOD_APL = '' : HC9004.MOD_APL = HC9004.MOD_APL;
//   modalidad_aplicacion_HC9004(HC9004.MOD_APL, validar_NO_APLFACTOR_HC9004,
//     data => {
//       activarCampo({ input: 'modapl_tart_9004', type: 'n', activar: false });
//       HC9004.MOD_APL = data.COD; document.getElementById('modalidad_apl_trat_h_9004').value = data.COD + '-' + data.DESCRIP;
//       validar_ANALISI_HC9004()
//     })
// }

// function validar_ANALISI_HC9004() {
//   activarCampo({ input: 'analisis_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#analisis_9004",
//       orden: '1',
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () {
//       activarCampo({ input: 'analisis_hc_9004', type: 's', activar: false });
//       setTimeout(() => evaluar_MOD_TRATAMIENTO_HC9004(), 500)
//     }, function () {
//       activarCampo({ input: 'analisis_hc_9004', type: 's', activar: false });
//       HC9004.DETALLES.ANALI = document.getElementById('analisis_hc_9004').value;
//       mostrarVista('15', 'sig', () => { setTimeout(() => evaluar_NOVEDADES_HC9004(), 500) });
//     })
// }

// function evaluar_NOVEDADES_HC9004() {
//   activarCampo({ input: 'noved_9004', type: 'n', activar: true });
//   HC9004.NOVEDAD = document.getElementById('novedad_hc_9004').value.substring(0, 1);
//   HC9004.NOVEDAD == '' ? HC9004.NOVEDAD = '' : HC9004.NOVEDAD = HC9004.NOVEDAD;
//   novedades_HC9004(HC9004.NOVEDAD
//     , function () {
//       activarCampo({ input: 'noved_9004', type: 'n', activar: false });
//       mostrarVista('16', 'ant', () => { validar_ANALISI_HC9004() });
//     }, data => {
//       activarCampo({ input: 'noved_9004', type: 'n', activar: false });
//       HC9004.NOVEDAD = data.COD; document.getElementById('novedad_hc_9004').value = data.COD + '-' + data.DESCRIP;
//       validar_OBSERVACIONES_HC9004();
//     })
// }

// function validar_OBSERVACIONES_HC9004() {
//   activarCampo({ input: 'observaciones_hc_9004', type: 's', activar: true });
//   validarInputs(
//     {
//       form: "#observaciones_9004",
//       orden: '1',
//       // event_f3: function () { validarTipoDiag_rx421w() }
//     },
//     function () {
//       activarCampo({ input: 'observaciones_hc_9004', type: 's', activar: false });
//       setTimeout(() => evaluar_NOVEDADES_HC9004(), 500);
//     }, function () {
//       activarCampo({ input: 'observaciones_hc_9004', type: 's', activar: false });
//       HC9004.OBSERVACIONES = document.getElementById('observaciones_hc_9004').value;
//       $('#guardar_HC9004').show();

//     })
// }
// //-------------------------- _____________________ ---------------------------
// //-------------------------- detalles de la historia ------------------------
// $('#guardar_HC9004').click(function () {
//   datos_HISTORIA_HC9004();
// });
// function datos_HISTORIA_HC9004() {
//   HC9004.DETALLES.OBSER = HC9004.OBSERVACIONES;
//   var datosphp = []; let detalles_hc = ''; let cont = 0; let detalle_envio = '';
//   for (detalle in HC9004.DETALLES) {
//     detalles_hc = '';
//     let detal = HC9004.DETALLES[detalle];
//     for (c in detal) {
//       let index = detal.indexOf(detal[c])
//       detalles_hc += (detal.substring(index, (index + 1)))
//     }
//     detalle_envio = `${detalle.padEnd(5, ' ')}` + detalles_hc;
//     datosphp[`'${detalle}'`] = detalle_envio;
//   }

//   datosphp.LLAVE = HC9004.LLAVE; datosphp.FECHA = HC9004.FECHA.toString() + HC9004.HORA.toString();

//   const dataFetch = new FormData();
//   for (var [key, value] of Object.entries(datosphp)) dataFetch.append(key, value);

//   fetch(get_url({ ip: $ip_servidor, dir: '/HICLIN/inc/detalles_hc9004.php' }), {
//     method: 'POST',
//     body: dataFetch
//   })
//     .then(function (response) {
//       if (response.ok) {
//         response.text().then((data) => {
//           if (data.split('|')[0] == '00') {
//             HC9004.NOMBREPLANO = data.split('|')[1];
//             /* Llamado DLL guardado*/
//             var datos_envio = ordenar_DATOS_HC9004();
//             grabar_HISTORIA_HC9004(datos_envio)
//           }
//           else jAlert({ titulo: 'Error ', mensaje: '<b>Mensaje: </b>' + data.split('|')[1] }, () => { location.reload() })
//         })
//       }
//     })

// }
// //-------------------------- _____________________ --------------------------
// //-------------------------- datos de la historia ---------------------------
// function ordenar_DATOS_HC9004() {
//   let edad = calcular_edad(HC9004.FECHA_NACIM);
//   HC9004.EDADHC = edad.vlr_edad;
//   HC9004.UND_EDADHC = edad.unid_edad;
//   let datos_envio = $ip_servidor + '|';
//   datos_envio += $path_dir + '|';
//   datos_envio += HC9004.OPER_HC + '|';
//   datos_envio += HC9004.NOMBREPLANO + '|';
//   datos_envio += HC9004.FECHA + '|';
//   datos_envio += HC9004.HORA + '|';
//   datos_envio += HC9004.MOTIVHC + '|';
//   datos_envio += HC9004.LLAVE + '|';
//   datos_envio += HC9004.PESOHC + '|';
//   datos_envio += HC9004.TALLAHC + '|';
//   datos_envio += HC9004.IMCHC + '|';
//   datos_envio += HC9004.PERCEFHC + '|';
//   datos_envio += HC9004.PERABDOHC + '|';
//   datos_envio += HC9004.PERTORAHC + '|';
//   datos_envio += HC9004.SUPCORPHC + '|';
//   datos_envio += HC9004.UND_EDADHC + HC9004.EDADHC + '|';
//   datos_envio += HC9004.MED + '|';
//   datos_envio += HC9004.RIPS[0].FINALIDAD + '|';
//   datos_envio += HC9004.SERV.trim() + '|';

//   datos_envio += HC9004.PORC_ACTFACTOR + '|';
//   datos_envio += HC9004.INHIBIDORES + '|';
//   datos_envio += HC9004.FECH_INHIBI.split('/')[0].toString() + HC9004.FECH_INHIBI.split('/')[1].toString() + HC9004.FECH_INHIBI.split('/')[2].toString() + '|';
//   datos_envio += HC9004.PREG_ITI + '|';
//   datos_envio += HC9004.PREG_ITI_ACT + '|';
//   datos_envio += HC9004.TIEMPO_ITI + '|';
//   datos_envio += HC9004.PREG_HEMARTROSIS + '|';
//   datos_envio += HC9004.PREG_ART_HEMOCRONICA + '|';
//   datos_envio += HC9004.NUM_ARTICULACIONES + '|';
//   datos_envio += HC9004.PREG_VHC + '|' + HC9004.PREG_VHB + '|' + HC9004.PREG_VIH + '|';

//   datos_envio += HC9004.PREG_SANG_CUELLO + '|';
//   datos_envio += HC9004.PREG_SANG_ILIOPSOA + '|';
//   datos_envio += HC9004.PREG_SANG_CRANEO + '|';
//   datos_envio += HC9004.PREG_SANG_ORAL + '|';
//   datos_envio += HC9004.PREG_SANG_OTROS + '|';
//   datos_envio += HC9004.PREG_SANG_TBLANDO + '|';
//   datos_envio += HC9004.FAMILHC + '|';
//   datos_envio += HC9004.NO_ATENURG_HEMO + '|';
//   datos_envio += HC9004.NO_EVENT_HEMO + '|';
//   datos_envio += HC9004.NO_HEMAR_ESP + '|';
//   datos_envio += HC9004.NO_HEMAR_TRAUM + '|';
//   datos_envio += HC9004.NO_OTR_HEMOR + '|';
//   datos_envio += HC9004.PLANFAMIL + '|';
//   datos_envio += HC9004.SWEMBAR + '|';
//   datos_envio += HC9004.FACT_RECIB + '|';
//   datos_envio += HC9004.ESQUEMA_RECIB + '|';
//   datos_envio += HC9004.REEMP_ARTIC + '|';
//   datos_envio += HC9004.NO_REEMP_ARTC + '|';
//   datos_envio += HC9004.NO_HEMOR_PROC + '|';
//   datos_envio += HC9004.FECH_INITRAT.split('/')[0].toString() + HC9004.FECH_INITRAT.split('/')[1].toString() + HC9004.FECH_INITRAT.split('/')[2].toString() + '|';
//   datos_envio += HC9004.ANAFILAXIS + '|';
//   datos_envio += HC9004.FACT_ANAFIL + '|';
//   datos_envio += HC9004.FRACT_OSTEO + '|';
//   datos_envio += HC9004.PSUDOTUMORES + '|';
//   datos_envio += HC9004.UNDEDAD_DX + '|';
//   datos_envio += HC9004.EDAD_DX + '|';
//   datos_envio += HC9004.MOTIV_DX + '|';
//   datos_envio += HC9004.SEVERIDAD_DX + '|';
//   datos_envio += HC9004.PROF_ATEN + '|';
//   datos_envio += HC9004.CONSUL_HEMA + '|';
//   datos_envio += HC9004.CONSUL_ORTOP + '|';
//   datos_envio += HC9004.INTER_ENFER + '|';
//   datos_envio += HC9004.CONSUL_ODONTO + '|';
//   datos_envio += HC9004.CONSUL_NUTRI + '|';
//   datos_envio += HC9004.CONSUL_TSOCIAL + '|';
//   datos_envio += HC9004.CONSUL_FISIATRIA + '|';
//   datos_envio += HC9004.CONSUL_PSICOLOGIA + '|';
//   datos_envio += HC9004.CONSUL_QUIMFARMA + '|';
//   datos_envio += HC9004.CONSUL_FISIOTERAPIA + '|';
//   datos_envio += HC9004.FACT_RECIB_ACT + '|';
//   datos_envio += HC9004.ESQUEMA_RECIB_ACT + '|';
//   datos_envio += HC9004.ULT_DOSIS + '|';
//   datos_envio += HC9004.FREC_SEMANA + '|';
//   datos_envio += HC9004.PREG_DLUI_PERIODO + '|';
//   datos_envio += HC9004.NRO_APL_FACTOR + '|';
//   datos_envio += HC9004.MOD_APL + '|';
//   datos_envio += HC9004.VIA_ADMIN + '|';
//   datos_envio += HC9004.CUMPOS + '|';
//   datos_envio += HC9004.CUMNOPOS + '|';
//   datos_envio += HC9004.CUMPOSOTR + '|';
//   datos_envio += HC9004.CUMNOPOSOTR + '|';
//   datos_envio += HC9004.NOVEDAD;

//   return datos_envio;
// }
// function grabar_HISTORIA_HC9004(datos_envio) {
//   console.debug('datos_envio', datos_envio)
//   const URL = get_url({ ip: $ip_servidor, dir: "/HICLIN/APP/" + "HC9004-01" + ".DLL" });
//   postData({
//     datosh: datos_envio
//   }, URL)
//     .then((data) => {
//       let res = data.split('|');
//       if (res[0] = "00") {
//         toastr.success('La historia ha sido guardada ', 'HISTORIA CLÍNICA DE ONCOLOGÍA');
//         console.debug('datos_grabados', datos_envio);
//         eliminar_TEMPORAL_HC9004(HC9004.NOMBREPLANO, crear_IMPRESION_HC9004());
//       } else {
//         console.error(error)
//         toastr.warning('Ocurrio un error al guardar la historia ', 'HISTORIA CLÍNICA DE ONCOLOGÍA');
//         validar_OBSERVACIONES_HC9004();
//       }
//     })
//     .catch(error => {
//       console.error(error)
//       toastr.warning('Ocurrio un error al guardar la historia ', 'HISTORIA CLÍNICA DE ONCOLOGÍA');
//       validar_OBSERVACIONES_HC9004();
//     });
// }

// function eliminar_TEMPORAL_HC9004(nombre, callback) {
//   const dataFetch = new FormData();
//   dataFetch.append('files', nombre);
//   fetch(get_url({ ip: $ip_servidor, dir: '/HICLIN/inc/eliminar_plano.php' }), {
//     method: 'POST',
//     body: dataFetch
//   })
//     .then(function (response) {
//       if (response.ok) {
//         response.text().then((data) => {
//           if (data == '00') { callback() }
//           else jAlert({ titulo: 'Error ', mensaje: '<b>Mensaje: </b>' + data.split('|')[1] }, validar_OBSERVACIONES_HC9004)
//         })
//       }
//     })
// }

// function crear_IMPRESION_HC9004() {
//   let fol = HC9004.LLAVEHC.substring(15, 17) + cerosIzq(parseInt(HC9004.LLAVEHC.substring(17, 23)), 6);
//   const URL = get_url({ ip: $ip_servidor, dir: "/HICLIN/APP/" + "HCI9004" + ".DLL" });
//   postData({
//     datosh: HC9004.DIRCONTABILIDAD + '|' + HC9004.LLAVEHC + '|' + $ip_servidor
//   }, URL)
//     .then((data) => {
//       console.debug(data, 'impresion')
//       consultar_detalles_historia(fol, ["1001", "2002", "2010", "2020", "2035", "2040", "4040", "5005", "7501"], HC9004.LLAVEHC,
//         function (detalles) {
//           console.debug(detalles, 'detalles')
//           ver_IMPRESION_HC9004();
//         })
//     })
//     .catch(error => {
//       toastr.warning('Ocurrio un error al crear impresion de la historia, HISTORIA CLÍNICA DE ONCOLOGÍA');
//       console.error(error)
//     });
// }

// // function ver_IMPRESION_HC9004() {

// // }
// //------------------ FUNCIONES POPUP -----------------------------
// function antecedentes_famil_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "NO TIENE ANTECEDENTES", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "MADRE", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "PADRE", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "1 HERMANO", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "2 HERMANOS", "VAL": "4" },
//     { "COD": "6", "DESCRIP": "1 HERMANA", "VAL": "5" },
//     { "COD": "7", "DESCRIP": "2 HERMANAS", "VAL": "6" },
//     { "COD": "8", "DESCRIP": "PADRE Y MADRE", "VAL": "7" },
//     { "COD": "9", "DESCRIP": "PADRE Y 1 HERMANO", "VAL": "8" },
//     { "COD": "A", "DESCRIP": "PADRE Y 2 HERMANOS", "VAL": "9" },
//     { "COD": "B", "DESCRIP": "PADRE Y 1 HERMANA", "VAL": "10" },
//     { "COD": "C", "DESCRIP": "PADRE Y 2 HERMANAS", "VAL": "11" },
//     { "COD": "D", "DESCRIP": "MADRE Y 1 HERMANO", "VAL": "12" },
//     { "COD": "E", "DESCRIP": "MADRE  Y 2 HERMANOS", "VAL": "13" },
//     { "COD": "F", "DESCRIP": "MADRE Y 1 HERMANA", "VAL": "14" },
//     { "COD": "G", "DESCRIP": "MADRE Y 2 HERMANAS", "VAL": "15" },
//     { "COD": "H", "DESCRIP": "1 SOBRINA", "VAL": "16" },
//     { "COD": "I", "DESCRIP": "2 SOBRINAS", "VAL": "17" },
//     { "COD": "J", "DESCRIP": "1 SOBRINO", "VAL": "18" },
//     { "COD": "K", "DESCRIP": "2 SOBRINOS", "VAL": "19" },
//     { "COD": "L", "DESCRIP": "DESCONOCIDO", "VAL": "20" },
//     { "COD": "L", "DESCRIP": "NO APLICA", "VAL": "99" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'ANTECEDENTES FAMILIARES',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }

// function porcentaje_actFactor_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "MENOR AL 1 %", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "MAYOR AL 1 %", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "MAYOR AL 5 % Y MENOR AL 40 %", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "DESCONOCIDO", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "NO APLICA", "VAL": "4" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: '% ACTUAL DEL FACTOR',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }
// function presencia_inhibidores_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "BAJA RESPUESTA O MENOR 5 UB", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "ALTA RESPUESTA O MAYOR 5 UB", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "NO PRESENTA INHIBIDORES", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "DESCONOCIDO", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "NO APLICA", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'PRESENCIA DE INHIBIDORES',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }

// function factor_recibido_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "FVIII", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "FIX", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "PLASMA FRESCO CONGELADO", "VAL": "2" },
//     { "COD": "3", "DESCRIP": "CRIOPRECIPITADO", "VAL": "3" },
//     { "COD": "4", "DESCRIP": "DESCONOCIDO", "VAL": "4" },
//     { "COD": "5", "DESCRIP": "NO RECIBIDO", "VAL": "5" },
//     { "COD": "6", "DESCRIP": "NO APLICA", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'FACTOR RECIBIDO',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }

// function esquema_recibido_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "A DEMANDA", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "PROFESIONAL PRIMARIA", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "PROFESIONAL SECUNDARIA", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "PROFESIONAL TERCIARIA", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "PROFESIONAL INTERMITENTE", "VAL": "4" },
//     { "COD": "6", "DESCRIP": "SIN TRATAMIENTO", "VAL": "5" },
//     { "COD": "7", "DESCRIP": "DESCONOCIDO", "VAL": "6" },
//     { "COD": "8", "DESCRIP": "NO APLICA", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'ESQUEMA RECIBIDO',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }

// function esquema_recibido_act_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "A DEMANDA", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "PROFESIONAL PRIMARIA", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "PROFESIONAL SECUNDARIA", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "PROFESIONAL TERCIARIA", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "PROFESIONAL INTERMITENTE", "VAL": "4" },
//     { "COD": "6", "DESCRIP": "REQUIRIO MANEJO ADICIONAL EN EL PERIODO DE CORTE POR TRAUMA O INTERVENCIÓN QUIRÚRGICA (USUARIO EN PROFILÁXIS)", "VAL": "5" },
//     { "COD": "7", "DESCRIP": "USUARIO CON COAGULOPATÍA DIFERENTE A HEMOFILIA (NO APLICA)", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'ESQUEMA RECIBIDO ACTUALMENTE',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }
// function factor_recibido_act_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "CONCENTRADO DE FACTOR VIII", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "CONCENTRADO DE FACTOR IX", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "FVIIRa (FACTOR RECOMBINANTE ACTIVADO)", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "CCPa (CONCENTRADO DOMPLEJO PROTOMBINA ACTIVADO)", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "PLASMA FRESCO CONGELADO", "VAL": "4" },
//     { "COD": "6", "DESCRIP": "CRIOPRECIPITADO", "VAL": "5" },
//     { "COD": "7", "DESCRIP": "NO APLICA", "VAL": "6" },
//     { "COD": "8", "DESCRIP": "PACIENTE HEMOFILICO NO RECIBE TRATAMIENTO", "VAL": "7" },
//     { "COD": "9", "DESCRIP": "NO APLICA (USUARIO CON COAGULOPATÍA A HEMOFILIA)", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'FACTOR RECIBIDO ACTUALMENTE',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }
// function planificacion_famil_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "PLANIFICACIÓN", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "CONSEJERÍA GENÉTICA", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "PLANIFICACIÓN Y CONSEJERÍA GÉNETICA", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "NO APLICA", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "NINGUNO", "VAL": "4" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'PLANIFIACIÓN FAMILIAR',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }

// function motivo_dx_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "MADRE PORTADORA CONOCIDA", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "OTRO HISTORIAL FAMILIAR", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "SINTOMA HEMORRÁGICO", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "OTRO", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "DESCONOCIDO", "VAL": "4" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'MOTIVO PRUEBA DX',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }
// function fecha_dx_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "S", "DESCRIP": "SI", "VAL": "SI" },
//     { "COD": "1", "DESCRIP": "DESCONOCIDA", "VAL": "18000101" },
//     { "COD": "2", "DESCRIP": "DATO NO DISPONIBLE, SE REALIZO EN OTRA EPS", "VAL": "18110101" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'CONOCE LA FECHA DEL DIAGNÓSTICO?',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }
// function aplica_ultdosis_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "S", "DESCRIP": "SI APLICA", "VAL": "0" },
//     { "COD": "1", "DESCRIP": "USUARIO HEMOFÍLICO CON MANEJO A DEMANDA (NO APLICA)", "VAL": "9998" },
//     { "COD": "2", "DESCRIP": "USUARIO CON COAGULOPATÍA DIFERENTE A HEMOFILIA", "VAL": "9999" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'APLICA PARA ÚLTIMA DOSIS?',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }
// function admin_aplicaciones_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "S", "DESCRIP": "SI SE ADMINISTRARON", "VAL": "S" },
//     { "COD": "1", "DESCRIP": "USUARIO HEMOFÍLICO CON MANEJO EN PROFILAXIS (NO APLICA)", "VAL": "9998" },
//     { "COD": "2", "DESCRIP": "USUARIO CON COAGULOPATÍA DIFERENTE A HEMOFILIA (NO APLICA)", "VAL": "9999" },
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'SE ADMINISTRARON APLICACIONES DEL FACTOR?',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }
// function via_admin_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "ACCESO PERIFÉRICO", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "ACCESO CENTRAL", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "MIXTO", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "USUARIO CON COAGULOPATÍA DIFERENTE A HEMOFILIA (NO APLICA)", "VAL": "9" },
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: "VIAS DE ADMINISTRACIÓN TRATAMIENTO",
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }
// function modalidad_aplicacion_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "INSTITUCIONAL", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "DOMICILIARIO", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "MIXTO", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "USUARIO CON COAGULOPATÍA DIFERENTE A HEMOFILIA (NO APLICA)", "VAL": "99999" },
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: "MODALIDAD DE APLICACIÓN TRATAMIENTO",
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }
// function frec_semana_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "UNA VEZ POR SEMANA", "VAL": "1" },
//     { "COD": "2", "DESCRIP": "DOS VECES POR SEMANA", "VAL": "2" },
//     { "COD": "3", "DESCRIP": "TRES VECES POR SEMANA", "VAL": "3" },
//     { "COD": "4", "DESCRIP": "CUATRO VECES POR SEMANA", "VAL": "4" },
//     { "COD": "5", "DESCRIP": "MÁS DE CUATRO VECES POR SEMANA", "VAL": "5" },
//     { "COD": "6", "DESCRIP": "USUARIO CON COAGULOPATÍA DIFERENTE A HEMOFILIA (USUARIO CON COAGULOPATÍA)", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'FRECUENCIA SEMANAL APLICACIÓN DOSIS?',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }

// function undedad_dx_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "A", "DESCRIP": "AÑOS" },
//     { "COD": "D", "DESCRIP": "DIAS" },
//     { "COD": "M", "DESCRIP": "MESES" }];

//   POPUP({
//     array: OPCIONES,
//     titulo: 'UNIDAD EDAD DIAGNÓSTICO?',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }
// function fecha_dx_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "DESCONOCIDA", "VAL": "18000101" },
//     { "COD": "2", "DESCRIP": "DATO NO DISPONIBLE, PORQUE EL DX SE REALIZÓ EN OTRA EPS", "VAL": "18110101" },
//     { "COD": "S", "DESCRIP": "SI LA CONOCE" }];

//   POPUP({
//     array: OPCIONES,
//     titulo: 'CONOCE LA FECHA EN LA QUE SE REALIZO EL DIAGNÓSTICO?',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }

// function severidad_dx_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "LEVE", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "MODERADO", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "SEVERO", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "DESCONOCIDO", "VAL": "3" },
//     { "COD": "9", "DESCRIP": "NO APLICA", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'SEVERIDAD DEL DIAGNÓSTICO',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }
// function deficiencia_dx_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "FACTOR VIII (HEMOFILIA A)", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "FACTOR IX (HEMOFILIA B)", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "PORTADOR(A)", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "VON WILEBRAND", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "FIBRINOGÉNO", "VAL": "4" },
//     { "COD": "6", "DESCRIP": "PROTOMBINA", "VAL": "5" },
//     { "COD": "7", "DESCRIP": "FV Y FVIII", "VAL": "6" },
//     { "COD": "8", "DESCRIP": "FVII", "VAL": "7" },
//     { "COD": "9", "DESCRIP": "FX", "VAL": "8" },
//     { "COD": "A", "DESCRIP": "FX", "VAL": "FXI" },
//     { "COD": "B", "DESCRIP": "FX", "VAL": "FXIII" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'TIPO DE DEFICIENCIA DEL DIAGNÓSTICO',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }

// function proflider_atencion_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "HEMATOLÓGO", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "MÉDICO GENERAL", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "MÉDICO FAMILIAR", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "ORTOPEDISTA", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "NO APLICA", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'PROFESIONAL QUE LIDERA LA ATECIÓN',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback
//   }, callback)
// }

// function novedades_HC9004(seleccion, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "1", "DESCRIP": "NO PRESENTA NOVEDAD", "VAL": "0" },
//     { "COD": "2", "DESCRIP": "USUARIO INGRESÓ A LA EAPB CON DIAGNÓSTICO DE HEMOFILIA", "VAL": "1" },
//     { "COD": "3", "DESCRIP": "USUARIO ANTIGUO EN LA EAPB, SE REALIZÓ NUEVO DIAGNÓSTICO DE HEMOGILIA", "VAL": "2" },
//     { "COD": "4", "DESCRIP": "USUARIO ANTIGUO EN LA EAPB Y ANTIGUO DIAGNÓSTICO DE HEMOFILIA NO INCLUIDO EN EL REPORTE", "VAL": "3" },
//     { "COD": "5", "DESCRIP": "USUARIO QUE FALLECIÓ", "VAL": "4" },
//     { "COD": "5", "DESCRIP": "USUARIO QUE SE DESAFILIÓ", "VAL": "5" },
//     { "COD": "6", "DESCRIP": "USUARIO PARA ELIMINAR DE LA BASE DE DATOS POR CORRECIÓN LUEGO DE AUDITORIA INTERNA O DE CAC", "VAL": "6" },
//     { "COD": "7", "DESCRIP": "USUARIO QUE FIRMO SALIDA VOLUNTARIA DEL TRATAMIENTO", "VAL": "7" },
//     { "COD": "8", "DESCRIP": "USUARIO CON CAMBIO DE TIPO O NUMERO DE ID(MISMO USUARIO CON NUEVO ID)", "VAL": "8" },
//     { "COD": "9", "DESCRIP": "USUARIO ABANDONÓ EL TRATAMIENTO Y ES IMPOSIBLE DE UBICAR", "VAL": "9" },
//     { "COD": "A", "DESCRIP": "USUARIO NO INCLUIDO EN EL REPORTE ANTERIOR Y ESTA FALLECIDO EN EL MOMENTO DEL REPORTE ACTUAL", "VAL": "A" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: 'NOVEDADES',
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: seleccion,
//     callback_f: esccallback,
//     teclaAlterna: true
//   }, callback)
// }
// function preguntas_onco_HC9004(data, esccallback, callback) {
//   var OPCIONES = new Array();
//   OPCIONES = [
//     { "COD": "S", "DESCRIP": "SI", "VAL": "S" },
//     { "COD": "N", "DESCRIP": "NO", "VAL": "N" },
//     { "COD": "9", "DESCRIP": "NO APLICA", "VAL": "9" }
//   ]
//   POPUP({
//     array: OPCIONES,
//     titulo: data.titulo,
//     indices: [{
//       id: 'COD',
//       label: 'DESCRIP'
//     }],
//     seleccion: data.seleccion,
//     teclaAlterna: true,
//     callback_f: esccallback
//   }, callback)
// }
