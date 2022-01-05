// 02-12-2020 - IMPRESION FORMULARIO APGAR - DAVID.M - HICLIN

$_HCI9011 = [];
datos_HCI9011 = {};

async function iniciar_HCI9011(rec, opciones, dataBase64) {
  $_HCI9011._ciudades = rec._ciudades;
  $_HCI9011._hcprc = rec._hcpac;
  $_HCI9011._detalles = rec._detalles;
  $_HCI9011._paci = rec.$_reg_paci;
  $_HCI9011.opciones = opciones;
  $_HCI9011._hcprc2 = rec.hcprc_new;

  $_HCI9011.dato_9011 = await $_HCI9011._detalles.find(
    (e) => e["COD-DETHC"] == "9011" && e["LLAVE-HC"] == $_HCI9011._hcprc.llave
  );
  $_HCI9011.dato_9011 != undefined ? ($_HCI9011.dato_9011 = $_HCI9011.dato_9011.DETALLE) : false;

  if ($_HCI9011.dato_9011) {
    // LLENAR ENCABEZADO

    datos_HCI9011.encabezado = {};
    datos_HCI9011.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    datos_HCI9011.encabezado.nit = $_USUA_GLOBAL[0].NIT;
    datos_HCI9011.encabezado.titulo = "FORMULARIO APGAR";

    // LLENAR DATOS PACIENTE

    datos_HCI9011.paciente = llenarPacienteAperturas2_impHc($_HCI9011._paci, $_HCI9011._hcprc2);

    // LLENAR DATOS

    datos_HCI9011.tabla_9011 = [];

    if ($_HCI9011.dato_9011.tabla_9011) {
      for (var i in $_HCI9011.dato_9011.tabla_9011) {
        if ($_HCI9011.dato_9011.tabla_9011[i].nombre_acomp) {
          datos_HCI9011.tabla_9011.push($_HCI9011.dato_9011.tabla_9011[i]);
        }
      }
    }

    for (var i in datos_HCI9011.tabla_9011) {
      datos_HCI9011.tabla_9011[i].puntaje = 0;
      datos_HCI9011.tabla_9011[i].puntaje =
        parseInt(datos_HCI9011.tabla_9011[i].sati_reci_ayuda_fami) +
        parseInt(datos_HCI9011.tabla_9011[i].sati_parti_fami_brind) +
        parseInt(datos_HCI9011.tabla_9011[i].sati_fami_acept_emp) +
        parseInt(datos_HCI9011.tabla_9011[i].sati_fami_exp_afect) +
        parseInt(datos_HCI9011.tabla_9011[i].sati_comp_tiemp_fami);

      var punt = parseInt(datos_HCI9011.tabla_9011[i].puntaje);
      switch (true) {
        case punt <= 9:
          datos_HCI9011.tabla_9011[i].interp = "Disfuncion severa";
          break;
        case punt > 9 && punt < 13:
          datos_HCI9011.tabla_9011[i].interp = "Disfuncion moderada";
          break;
        case punt > 12 && punt < 17:
          datos_HCI9011.tabla_9011[i].interp = "Disfuncion leve";
          break;
        case punt > 16:
          datos_HCI9011.tabla_9011[i].interp = "Normal";
          break;
      }

      switch (parseInt(datos_HCI9011.tabla_9011[i].sati_reci_ayuda_fami)) {
        case 0:
          datos_HCI9011.tabla_9011[i].sati_reci_ayuda_fami = "NUNCA";
          break;
        case 1:
          datos_HCI9011.tabla_9011[i].sati_reci_ayuda_fami = "CASI NUNCA";
          break;
        case 2:
          datos_HCI9011.tabla_9011[i].sati_reci_ayuda_fami = "ALGUNAS VECES";
          break;
        case 3:
          datos_HCI9011.tabla_9011[i].sati_reci_ayuda_fami = "CASI SIEMPRE";
          break;
        case 4:
          datos_HCI9011.tabla_9011[i].sati_reci_ayuda_fami = "SIEMPRE";
          break;
      }

      switch (parseInt(datos_HCI9011.tabla_9011[i].sati_parti_fami_brind)) {
        case 0:
          datos_HCI9011.tabla_9011[i].sati_parti_fami_brind = "NUNCA";
          break;
        case 1:
          datos_HCI9011.tabla_9011[i].sati_parti_fami_brind = "CASI NUNCA";
          break;
        case 2:
          datos_HCI9011.tabla_9011[i].sati_parti_fami_brind = "ALGUNAS VECES";
          break;
        case 3:
          datos_HCI9011.tabla_9011[i].sati_parti_fami_brind = "CASI SIEMPRE";
          break;
        case 4:
          datos_HCI9011.tabla_9011[i].sati_parti_fami_brind = "SIEMPRE";
          break;
      }

      switch (parseInt(datos_HCI9011.tabla_9011[i].sati_fami_acept_emp)) {
        case 0:
          datos_HCI9011.tabla_9011[i].sati_fami_acept_emp = "NUNCA";
          break;
        case 1:
          datos_HCI9011.tabla_9011[i].sati_fami_acept_emp = "CASI NUNCA";
          break;
        case 2:
          datos_HCI9011.tabla_9011[i].sati_fami_acept_emp = "ALGUNAS VECES";
          break;
        case 3:
          datos_HCI9011.tabla_9011[i].sati_fami_acept_emp = "CASI SIEMPRE";
          break;
        case 4:
          datos_HCI9011.tabla_9011[i].sati_fami_acept_emp = "SIEMPRE";
          break;
      }

      switch (parseInt(datos_HCI9011.tabla_9011[i].sati_fami_exp_afect)) {
        case 0:
          datos_HCI9011.tabla_9011[i].sati_fami_exp_afect = "NUNCA";
          break;
        case 1:
          datos_HCI9011.tabla_9011[i].sati_fami_exp_afect = "CASI NUNCA";
          break;
        case 2:
          datos_HCI9011.tabla_9011[i].sati_fami_exp_afect = "ALGUNAS VECES";
          break;
        case 3:
          datos_HCI9011.tabla_9011[i].sati_fami_exp_afect = "CASI SIEMPRE";
          break;
        case 4:
          datos_HCI9011.tabla_9011[i].sati_fami_exp_afect = "SIEMPRE";
          break;
      }

      switch (parseInt(datos_HCI9011.tabla_9011[i].sati_comp_tiemp_fami)) {
        case 0:
          datos_HCI9011.tabla_9011[i].sati_comp_tiemp_fami = "NUNCA";
          break;
        case 1:
          datos_HCI9011.tabla_9011[i].sati_comp_tiemp_fami = "CASI NUNCA";
          break;
        case 2:
          datos_HCI9011.tabla_9011[i].sati_comp_tiemp_fami = "ALGUNAS VECES";
          break;
        case 3:
          datos_HCI9011.tabla_9011[i].sati_comp_tiemp_fami = "CASI SIEMPRE";
          break;
        case 4:
          datos_HCI9011.tabla_9011[i].sati_comp_tiemp_fami = "SIEMPRE";
          break;
      }
    }

    await _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
      content: _imprimirApgar(datos_HCI9011),
    }).catch((err) => {
      console.error(err);
    });

    return $_HCI9011.data;
  } else {
    return null;
  }
}
