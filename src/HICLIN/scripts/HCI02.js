// REIMPRIME EVOLUCIONES -- 06/10/2020 -- DAVID.M

$_HCI02 = [];
var band = '';
$_HCI02.currency = {
    plural: '   ',
    singular: '    '
}

async function _iniciarHCI02(json) {
    $_HCI02._evolucion = []
    $_HCI02.nit_usu = $_USUA_GLOBAL[0].NIT;
    datos = null
    $_HCI02.datosHC705 = json;
    $_HCI02.hide_firma = json.hide_firma;
    $_HCI02.hide_sinto = json.hide_sinto;
    $_HCI02.salir = false;

    await inicializarDatos();
    await _cargarArc_HCI02(json.arrayDatos_HCI02);
    await leerHistoria_HCI02();

    let array_formulacion = $_HCI02._evolucion.FORMULACION.map(
        (item, index) => {
          let nro_ord_formu = item["NRO-ORD-FORMU"] || "1";
          item["NRO-ORD-FORMU"] = nro_ord_formu;
  
          let new_obj = $_HCI02._evolucion.OTROS_FORMU_EVO[index];
          item = { ...item, ...new_obj };
          return item;
        }
      );
  
      $_HCI02._evolucion.FORMULACION = JSON.parse(
        JSON.stringify(array_formulacion)
      );

    if ($_HCI02.errorEvo != true) {
        await validaciones();
        await abrirArchivos_HCI02();
        await depurarImpresion_HCI02();
        await procesos_HCI02();

        if ($_HCI02.salir) {
            return null;
        }
        for (var i in $_HCI02._evolucion.FORMULACION) {
            var cod = $_HCI02._evolucion.FORMULACION[i]['COD-FORMU']
            if ($_HCI02._evolucion.FORMULACION[i]['TIPO-FORMU'] == 0) {
                if (cod.substring(0, 2) == "PO" || cod.substring(0, 2) == "NP" || cod.substring(0, 2) == "MQ") {
                    $_HCI02._evolucion.FORMULACION[i]['TIPO-FORMU'] = '1';
                }
            }
        }

        await codigoBarra();
        if ($_HCI02.datosHC705._opciones.opc_evo == 'S' || $_HCI02.datosHC705._opciones.opc_enf == 'S' || $_HCI02.datosHC705._opciones.opc_ter == 'S' || $_HCI02.datosHC705.resumido == true || $_HCI02.datosHC705.todasFormu == false) {
            $_HCI02.tipo_evo = $_HCI02.datosHC705._arrayTipoEvo.find(e => e.COD == $_HCI02._evolucion.TIPO);
            $_HCI02.tipo_evo != undefined ? datos.encabezado.tipo = $_HCI02.tipo_evo.DESCRIP : false;
            if ($_HCI02.datosHC705._opciones.opc_for == 'S' ||
                $_HCI02.datosHC705._opciones.opc_lab == 'S' ||
                $_HCI02.datosHC705._opciones.opc_ima == 'S' ||
                $_HCI02.datosHC705._opciones.opc_ord == 'S' ||
                $_HCI02.datosHC705._opciones.opc_con == 'S' ||
                $_HCI02.datosHC705._opciones.opc_inc == 'S' ||
                $_HCI02.datosHC705._opciones.opc_epic == 'S'
            ) {
                $_HCI02._evolucion.FORMULACION.length > 0 ? await imprimirFormulacion_Evo_HCI02() : false;
            }
            // else {
            //     if($_HCI02.datosHC705._opciones.opc_evo == 'S') {
            //         $_HCI02._evolucion.FORMULACION.length > 0 ? await imprimirFormulacion_Evo_HCI02() : false;
            //     }
            // }
            await llamarImpHCI02();
        }

        if (($_HCI02.datosHC705._opciones.opc_for == 'S' ||
            $_HCI02.datosHC705._opciones.opc_lab == 'S' ||
            $_HCI02.datosHC705._opciones.opc_ima == 'S' ||
            $_HCI02.datosHC705._opciones.opc_ord == 'S' ||
            $_HCI02.datosHC705._opciones.opc_con == 'S' ||
            $_HCI02.datosHC705._opciones.opc_inc == 'S' ||
            $_HCI02.datosHC705._opciones.opc_epic == 'S') &&
            $_HCI02.datosHC705.resumido != true &&
            $_HCI02.datosHC705.todasFormu != false
        ) {
            await imprimirFormulacion_HCI02();
        }

        if ($_HCI02.datosHC705._opciones.opc_resu != 'S' && $_HCI02.datosHC705.resumido != true) {
            await imprimirPatol_HCI02();
        }
    }

    return $_HCI02.dataBase64
}

async function abrirArchivos_HCI02() {
    if ($_HCI02.datosHC705.id == '000000010111222' && parseFloat($_HCI02.datosHC705.folio.substring(2, 8)) == 01 && $_HCI02.datosHC705.fecha == '20130710' && $_HCI02.datosHC705.hora == '1752') {
        salir_HCI02();
    }

    $_HCI02.varEnvio = {
        _hcprc: $_HCI02._hcprc,
        _evolucion: $_HCI02._evolucion,
        _paci: $_REG_PACI,
        _espec: $_HCI02._especialidades,
    }
}

async function leerHistoria_HCI02() {
    if ($_HCI02.datosHC705.opcion == 'masiva') {
        $_HCI02._evolucion = $_HCI02.datosHC705._evolucion;
        $_HCI02._evolucion.FORMULACION.pop();
        $_HCI02._evolucion.OTROS_FORMU_EVO.pop();
        await validacionesInicioEvolucion_HCI02();
    } else {
        // -- TRAER JSON DE LA EVOLUCION --
        $_HCI02.llaveHc = $_HCI02.datosHC705.id + $_HCI02.datosHC705.folio;
        $_HCI02.operHc = $_HCI02.datosHC705.oper;
        $_HCI02.medicHc = $_HCI02.datosHC705.medic;
        $_HCI02.fechaHc = $_HCI02.datosHC705.fecha;
        $_HCI02.horaHc = $_HCI02.datosHC705.hora;

        $_HCI02.medicHc.trim() == '' || parseFloat($_HCI02.medicHc) == 0 ? $_HCI02.medicHc = cerosIzq(localStorage.IDUSU.trim(), 10) : $_HCI02.medicHc = cerosIzq($_HCI02.medicHc.trim(), 10);
        await postData({ datosh: datosEnvio() + $_HCI02.llaveHc + '|' + $_HCI02.operHc + '|' + $_HCI02.medicHc + '|' + $_HCI02.fechaHc + '|' + $_HCI02.horaHc + '|' + 'CONS' + '|' }, get_url("app/HICLIN/HC002.DLL"))
            .then(async data => {
                $_HCI02.errorEvo = false;
                $_HCI02._evolucion = data.EVOLUCION[0];
                $_HCI02._evolucion.FORMULACION.pop();
                $_HCI02._evolucion.OTROS_FORMU_EVO.pop();
                await validacionesInicioEvolucion_HCI02();
            }).catch(err => {
                $_HCI02.errorEvo = true;
                console.log(err, 'error')
            })

        return new Promise(resolve => {
            resolve('carga evol');
        })
    }
}

async function validaciones() {
    parseFloat($_HCI02._evolucion.RIPS.EDAD) > 140 ? $_HCI02._evolucion.RIPS.EDAD = '0' : false;

    // ($_HCI02._evolucion.RIPS.UNID_EDAD == 'D' || $_HCI02._evolucion.RIPS.UNID_EDAD == 'M') || parseFloat($_HCI02._evolucion.RIPS.EDAD) == 1 ?
    //     $_HCI02.peso_w = $_HCI02._evolucion.SIGNOS_VITALES.PESO_GRAMOS :
    //     $_HCI02.peso_w = $_HCI02._evolucion.SIGNOS_VITALES.PESO;

    if (($_HCI02._evolucion.RIPS.UNID_EDAD == 'D' || $_HCI02._evolucion.RIPS.UNID_EDAD == 'M') || parseFloat($_HCI02._evolucion.RIPS.EDAD) == 1) {
        if ($_HCI02._evolucion.PESO_NEW == 0) {
            $_HCI02.peso_w = $_HCI02._evolucion.SIGNOS_VITALES.PESO_GRAMOS
        } else {
            $_HCI02.peso_w = $_HCI02._evolucion.PESO_NEW;
        }
    } else {
        if ($_HCI02._evolucion.PESO_NEW == 0) {
            $_HCI02.peso_w = $_HCI02._evolucion.SIGNOS_VITALES.PESO
        } else {
            $_HCI02.peso_w = $_HCI02._evolucion.PESO_NEW;
        }
    }

    if ($_HCI02.datosHC705._opciones.opc_for == 'S' ||
        $_HCI02.datosHC705._opciones.opc_lab == 'S' ||
        $_HCI02.datosHC705._opciones.opc_ima == 'S' ||
        $_HCI02.datosHC705._opciones.opc_ord == 'S' ||
        $_HCI02.datosHC705._opciones.opc_con == 'S' ||
        $_HCI02.datosHC705._opciones.opc_inc == 'S'
    ) {
        // continue
    } else {
        if ($_HCI02._evolucion.TIPO == 'C' || $_HCI02._evolucion.TIPO == '9' || $_HCI02._evolucion.TIPO == 'N') {
            // continue
        } else {
            // se agrega condicion de diagnostico - David.M 27-01-2021
            if ($_HCI02.tabla_evo.trim() == '' &&
                $_HCI02.analisis_evo.trim() == '' &&
                $_HCI02._evolucion.FORMULACION.length == 0 &&
                $_HCI02._evolucion.SIGNOS_VITALES.PESO.trim() == '' &&
                $_HCI02._evolucion.PESO_NEW.trim() == '' &&
                $_HCI02._evolucion.SIGNOS_VITALES.TALLA.trim() == '' &&
                $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0] == ''
            ) {
                toastr.warning('No tiene contenido la evolución');
                salir_HCI02();
            } else if (
                $_HCI02.tabla_evo.trim() == '' &&
                $_HCI02.analisis_evo.trim() == '' &&
                $_HCI02._evolucion.FORMULACION.length > 0 &&
                $_HCI02._evolucion.SIGNOS_VITALES.PESO.trim() == '' &&
                $_HCI02._evolucion.PESO_NEW.trim() == '' &&
                $_HCI02._evolucion.SIGNOS_VITALES.TALLA.trim() == '' &&
                $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0] == ''
            ) {
                if ($_HCI02.tabla_evo.trim() == '' &&
                    $_HCI02.analisis_evo.trim() == '' &&
                    ($_HCI02._evolucion.FORMULACION[0].ESPEC_FORMU.trim() == '' || $_HCI02._evolucion.FORMULACION[0].INDIC2_2FORMU.trim() == '') &&
                    $_HCI02._evolucion.SIGNOS_VITALES.PESO.trim() == '' &&
                    $_HCI02._evolucion.PESO_NEW.trim() == '' &&
                    $_HCI02._evolucion.SIGNOS_VITALES.TALLA.trim() == '' &&
                    $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0] == ''
                ) {
                    toastr.warning('No tiene contenido la evolución');
                    salir_HCI02();
                }
            }

        }
    }
}

// ----  DEPURAR-IMPRESION ----
async function depurarImpresion_HCI02() {
    if ($_HCI02.datosHC705._opciones.opc_aper == 'S' ||
        $_HCI02.datosHC705._opciones.opc_evo == 'S' ||
        $_HCI02.datosHC705._opciones.opc_ter == 'S' ||
        $_HCI02.datosHC705._opciones.opc_enf == 'S'
    ) {
        $_HCI02.sw_buscar = 1;
    } else {
        $_HCI02.sw_buscar = 0;
    }

    // SI ES INCAPACIDAD SOLO LA IMPRIME SEGUN EL FORMATO Y SALE
    if ($_HCI02.datosHC705._opciones.opc_inc == 'S') {
        $_HCI02.banderaIncap != true ? await imprimirIncapacidad_HCI02() : false;

        if (localStorage.idOpciondata == "071") {
            salir_HCI02();
        }
    }
}

async function validacionesInicioEvolucion_HCI02() {
    if ($_HCI02.nit_usu == 844003225 || $_HCI02.nit_usu == 892000458 || $_HCI02.nit_usu == 900161116) {
        if ($_HCI02._evolucion.MACRO['CLASE'] == 'C') {

        }
    }

    await leerTablaEvo_HCI02();
    await leerAnalisisEvo_HCI02();
    await leerPlanEvo_HCI02();

    return new Promise(resolve => {
        resolve('carga evol');
    })
}

async function procesos_HCI02() {
    parseFloat($_HCI02.datosHC705._opciones.fechaIni) > 0 && parseFloat($_HCI02._evolucion.FECHA_EVO) < parseFloat($_HCI02.datosHC705._opciones.fechaIni) ? salir_HCI02() : false;
    parseFloat($_HCI02.datosHC705._opciones.fechaFin) > 0 && parseFloat($_HCI02._evolucion.FECHA_EVO) > parseFloat($_HCI02.datosHC705._opciones.fechaFin) ? salir_HCI02() : false;

    if ($_HCI02.datosHC705._opciones.opc_macro.substring(0, 1) == '0' || $_HCI02.datosHC705._opciones.opc_macro.substring(0, 1) == ' ') {
        // continue
    } else if ($_HCI02.datosHC705._opciones.opc_macro.substring(1, 7) == '000000') {
        if ($_HCI02.datosHC705._opciones.opc_macro.substring(0, 1) != $_HCI02._evolucion.MACRO['CLASE']) {
            salir_HCI02()
        } else {
            $_HCI02.datosHC705._opciones.opc_macro.substring(1, 7) != $_HCI02._evolucion.MACRO['CODIGO'] ? salir_HCI02() : false;
        }
    }

    $_HCI02.datosHC705._opciones.opc_evo == 'S' && $_HCI02._evolucion.TIPO ? imprimirPartograma_HCI02() : false;

    if ($_HCI02.datosHC705._opciones.opc_evo == 'S' && ($_HCI02._evolucion.TIPO == '1' || $_HCI02._evolucion.TIPO == '7' || $_HCI02._evolucion.TIPO == '8')) {
        if ($_HCI02.datosHC705._opciones.opc_epic == 'S' && $_HCI02._evolucion.RIPS.ATIENDE != '1') {
            $_HCI02.tabla_evo = '';
        } else {
            await imprimirProcedimientos_HCI02();
        }

        $_HCI02._evolucion.MACRO['CLASE'] == 'C' ? salir_HCI02() : false;

        await imprimirAnalisisEvolucion_HCI02();
        await imprimirPlanEvolucion_HCI02();
        await imprimirTipoDiagnostico_HCI02();
    }

    if ($_HCI02.datosHC705._opciones.opc_enf == 'S' && ($_HCI02._evolucion.TIPO == '2' || $_HCI02._evolucion.TIPO == '4' || $_HCI02._evolucion.TIPO == '6')) {
        await imprimirProcedimientos_HCI02();
    }

    if ($_HCI02.datosHC705._opciones.opc_ter == 'S' && $_HCI02._evolucion.TIPO == '3') {
        await imprimirProcedimientos_HCI02();
        await imprimirAnalisisEvolucion_HCI02();
        await imprimirPlanEvolucion_HCI02();
        await imprimirTipoDiagnostico_HCI02();
    }

    if ($_HCI02._evolucion.DATOS_TRAS.OPER_TRAS.trim() != '') {
        datos.signos2.oper_tras = $_HCI02._evolucion.DATOS_TRAS.OPER_TRAS;
        datos.signos2.fecha_tras = $_HCI02._evolucion.DATOS_TRAS.FECHA_TRAS;
        datos.signos2.llave_paci_tras = $_HCI02._evolucion.DATOS_TRAS.LLAVE_PACI_TRAS;

        localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI' ? datos.signos2.bandera = true : false;
    }

    if ($_HCI02.datosHC705._opciones.opc_enf == 'S' && $_HCI02._evolucion.TIPO == '5') {
        $_HCI02.datosHC705._opciones.opc_enf = 'N';
        toastr.warning('Opción para impresión de administración de medicamentos: 7-C-1');
        $_HCI02.salir = true;
    }

    // se agrega opc_ter a condicion if - David.M 27-01-2021
    if ($_HCI02.datosHC705._opciones.opc_evo == 'S' || $_HCI02.datosHC705._opciones.opc_enf == 'S' || $_HCI02.datosHC705._opciones.opc_ter == 'S') {
        if ($_HCI02._evolucion.TABLA_DIAGNOSTICOS != $_HCI02._evolucion.TABLA_DIAG_ANT || $_HCI02.datosHC705._opciones.opc_epic == 'N') {
            encabezarDiag_HCI02();

            if ($_HCI02._evolucion.TIPO == '4') {
                $_HCI02._evolucion.SIGNOS_VITALES.RESUL_CITO.trim() != '' ? imprimirResultadoCito_HCI02() : false;
                $_HCI02._evolucion.SIGNOS_VITALES.MUEST_CITO.trim() != '' ? imprimirMuestraCito_HCI02() : false;
            }

            if ($_HCI02._evolucion.TIPO == '9' && parseFloat($_HCI02._evolucion.PATOLOGIA.TIPO_ESTUD) > 0) {
                imprimirPatol_HCI02();
            }

            if (localStorage.idOpciondata != '072') {
                await imprimirEstadoEvolucion_HCI02();
            }

            if (parseFloat($_HCI02._evolucion.EMBAR.PESO_PREV) > 0 && parseFloat($_HCI02._evolucion.EMBAR.ALT_UTER) > 0) {
                await imprimirPerinatal_HCI02();
            }

            if (localStorage.idOpciondata != '072') {
                await imprimirRips_HCI02();
            }

            if (!$_HCI02.hide_sinto) {
                if ($_HCI02._evolucion.SINTOM_RESPI.trim() != '') {
                    datos.rips.titulo.push('SINTOMATICO RESPIRATORIO:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.SINTOM_RESPI) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.SINTOM_RESPI;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.SINTOM_PIEL.trim() != '') {
                    datos.rips.titulo.push('SINTOMATICO DE PIEL:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.SINTOM_PIEL) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.SINTOM_PIEL;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.VICTI_MALTRATO.trim() != '') {
                    datos.rips.titulo.push('VICTIMA DE MALTRATO:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.VICTI_MALTRATO) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.VICTI_MALTRATO;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.VICTI_VIOLENCIA.trim() != '') {
                    datos.rips.titulo.push('VICTIMA DE VIOLENCIA:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.VICTI_VIOLENCIA) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.VICTI_VIOLENCIA;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.ENFER_MENTAL.trim() != '') {
                    datos.rips.titulo.push('ENFERMEDAD MENTAL:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.ENFER_MENTAL) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.ENFER_MENTAL;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.ENFER_ITS.trim() != '') {
                    datos.rips.titulo.push('ENFERMEDAD ITS:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.ENFER_ITS) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.ENFER_ITS;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.CANCER_SENO.trim() != '') {
                    datos.rips.titulo.push('CANCER DE SENO:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.CANCER_SENO) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.CANCER_SENO;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.CANCER_CERVIS.trim() != '') {
                    datos.rips.titulo.push('CANCER DE CERVIX:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.CANCER_CERVIS) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.CANCER_CERVIS;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.EDU_AUTOEXA_SENO.trim() != '') {
                    datos.rips.titulo.push('EDUCA AUTOEXAMEN DE SENO:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.EDU_AUTOEXA_SENO) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.EDU_AUTOEXA_SENO;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.CITOLOGIA_PREVIA.trim() != '') {
                    datos.rips.titulo.push('CITOLOGIA PREVIA:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.CITOLOGIA_PREVIA) {
                        case 'S':
                            aux = 'SI';
                            break;
                        case 'N':
                            aux = 'NO';
                            break;
                        case 'X':
                            aux = 'NO VALORADO';
                            break;
                        default:
                            aux = $_HCI02._evolucion.CITOLOGIA_PREVIA;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if (parseFloat($_HCI02._evolucion.FECHA_CITO_PREVIA) > 0 && $_HCI02._evolucion.FECHA_CITO_PREVIA.trim() != '') {
                    datos.rips.titulo.push('FECHA CITOLOGIA PREVIA:  ');
                    datos.rips.contenido.push(_editFecha2($_HCI02._evolucion.FECHA_CITO_PREVIA));
                }

                if ($_HCI02._evolucion.RESUL_CITO_PREVIA.trim() != '') {
                    datos.rips.titulo.push('RESULTADO CITOLOGIA PREVIA:  ');
                    aux = '';
                    switch ($_HCI02._evolucion.RESUL_CITO_PREVIA) {
                        case '1':
                            aux = 'NORMAL';
                            break;
                        case '2':
                            aux = 'ANORMAL';
                            break;
                        case '3':
                            aux = 'NO APLICA';
                            break;
                        case '4':
                            aux = 'NO SABE';
                            break;
                        default:
                            aux = $_HCI02._evolucion.RESUL_CITO_PREVIA;
                            break;
                    }
                    datos.rips.contenido.push(aux);
                }

                if ($_HCI02._evolucion.FECHA_ULT_MAMO > 0) {
                    datos.rips.titulo.push('FECHA ÚLTIMA MAMOGRAFIA:  ');
                    datos.rips.contenido.push(_editFecha2($_HCI02._evolucion.FECHA_ULT_MAMO));
                }
            }

            if ($_HCI02._evolucion.CREATININA2 > 0) {
                await imprimirCreatininaGlomedular_HCI02();
                await imprimirHemoGlicosada_HCI02();
                await imprimirMicroalbuminuria_HCI02();
                await imprimirRiesgoCardio_HCI02();
            }
        }
    }

    await llenarEncabezado_HCI02();

    await cerrarImpresion_HCI02();
}

async function imprimirCreatininaGlomedular_HCI02() {
    datos.creatinina.titulos.push('CREATININA  METODO MDRD:');
    datos.creatinina.contenido.push($_HCI02._evolucion.CREATININA2)

    datos.creatinina.titulos.push('FILTRADO GLOMEDULAR:');

    tfg = '';
    edad = $_HCI02._evolucion.RIPS.EDAD;

    // peso = $_HCI02._evolucion.SIGNOS_VITALES.PESO > 0 ? $_HCI02._evolucion.SIGNOS_VITALES.PESO : 1;

    if ($_HCI02._evolucion.PESO_NEW == 0 && $_HCI02._evolucion.SIGNOS_VITALES.PESO > 0) {
        peso = $_HCI02._evolucion.SIGNOS_VITALES.PESO;
    } else if ($_HCI02._evolucion.PESO_NEW == 0 && $_HCI02._evolucion.SIGNOS_VITALES.PESO == 0) {
        peso = 1;
    } else if ($_HCI02._evolucion.PESO_NEW > 0 && $_HCI02._evolucion.SIGNOS_VITALES.PESO == 0) {
        peso = $_HCI02._evolucion.PESO_NEW;
    }

    crea2 = $_HCI02._evolucion.CREATININA2;

    if ($_REG_PACI.SEXO == 'F') {
        tfg = (((148 - edad) * peso) / (72 * crea2)) * 0.85;
    } else {
        tfg = ((148 - edad) * peso) / (72 * crea2);
    }
    tfg = parseFloat(tfg);

    datos.creatinina.contenido.push(tfg);
}

async function imprimirHemoGlicosada_HCI02() {
    datos.creatinina.titulos.push('HEMOGLOBINA GLICOSILADA:');
    datos.creatinina.contenido.push($_HCI02._evolucion.HEMO_GLICOSILADA);

    datos.creatinina.titulos.push('FECHA DE TOMA:');
    datos.creatinina.contenido.push($_HCI02._evolucion.HEMO_GLICO_FECHA);
}

//  ---- IMPRIMIR-ANALISIS-EVO ------
async function imprimirAnalisisEvolucion_HCI02() {
    if ($_HCI02.analisis_evo.trim() != '') {
        datos.analisis.titulo = 'ANALISIS DE LA EVOLUCION:  ';
        datos.analisis.contenido = $_HCI02.analisis_evo.trim();
    }
}

async function imprimirPlanEvolucion_HCI02() {
    if ($_HCI02.plan_evo.trim() != '') {
        datos.plan.titulo = 'PLAN:  ';
        datos.plan.contenido = $_HCI02.plan_evo.trim();
    }
}

async function imprimirMicroalbuminuria_HCI02() {
    datos.creatinina.titulos.push('MICROALBUMINURIA:');

    if ($_HCI02._evolucion.MICROALBUMINURIA == 0) {
        aux = $_HCI02._evolucion.MICROALBUMINURIA_2;
    } else {
        aux = $_HCI02._evolucion.MICROALBUMINURIA;
    }
    datos.creatinina.contenido.push(aux);

    datos.creatinina.titulos.push('FECHA DE TOMA:');
    datos.creatinina.contenido.push($_HCI02._evolucion.FECHA_MICROALBUMINURIA);
}

async function imprimirRiesgoCardio_HCI02() {
    datos.creatinina.titulos.push('RIESGO CARDIOVASCULAR:');
    datos.creatinina.contenido.push($_HCI02._evolucion.RIESGO_CARDIO);
}

//  ---- IMPRIMIR-TIPO-DIAGN-EVO ------
async function imprimirTipoDiagnostico_HCI02() {
    if (localStorage.idOpciondata != '072') {
        datos.tipoDiag.titulo = 'TIPO DE DIAGN:  ';
        aux = '';
        switch ($_HCI02._hcprc.rips.tipo_diag) {
            case '1':
                aux = '1-IMPRESION DIAGNOSTICA';
                break;
            case '2':
                aux = '2-CONFIRMADO NUEVO';
                break;
            case '3':
                aux = '3-CONFIRMADO REPETIDO';
                break;
            case '9':
                aux = '9-NO APLICA';
                break;
        }
        datos.tipoDiag.contenido = aux;
    }
}

//  ---- IMPRIMIR-DIAGNOSTICOS-EVO ------
async function imprimirEstadoEvolucion_HCI02() {
    for (i in $_HCI02._evolucion.TABLA_DIAGNOSTICOS) {
        if ($_HCI02._evolucion.TABLA_DIAGNOSTICOS[i].trim() != '') {
            datos.diagnosticos.contenido.push($_HCI02._evolucion.TABLA_DIAGNOSTICOS[i] + ' - ' + $_HCI02._evolucion.DESCRIPCIONES_DIAGN[i]);
        }
    }
}

async function imprimirRips_HCI02() {
    if (parseFloat($_HCI02._evolucion.RIPS.EMBAR) > 0) {
        datos.rips.titulo.push('ESTADO DE GRAVIDEZ:  ');
        aux = '';
        switch ($_HCI02._evolucion.RIPS.EMBAR) {
            case '1':
                aux = 'PRIMER TRIMESTRE';
                break;
            case '2':
                aux = 'SEGUNDO TRIMESTRE';
                break;
            case '3':
                aux = 'TERCER TRIMESTRE';
                break;
            case '4':
                aux = 'NO DECLARA';
                break;
            default:
                aux = 'NO APLICA';
                break;
        }
        datos.rips.contenido.push(aux);
    }

    if (parseFloat($_HCI02._evolucion.RIPS.CAUSA)) {
        datos.rips.titulo.push('CAUSA EXTERNA:  ');
        aux = '';
        switch (parseFloat($_HCI02._evolucion.RIPS.CAUSA)) {
            case 1:
                aux = 'ACCIDENTE DE TRABAJO';
                break;
            case 2:
                aux = 'ACCIDENTE DE TRANSITO';
                break;
            case 3:
                aux = 'ACCIDENTE RABICO';
                break;
            case 4:
                aux = 'ACCIDENTE OFIDICO';
                break;
            case 5:
                aux = 'OTRO TIPO DE ACCIDENTE';
                break;
            case 6:
                aux = 'EVENTO CATASTROFICO';
                break;
            case 7:
                aux = 'LESION POR AGRESION';
                break;
            case 8:
                aux = 'LESION AUTOINFLIGIDA';
                break;
            case 9:
                aux = 'SOSPECHA MALTRATO FISICO';
                break;
            case 10:
                aux = 'SOSPECHA ABUSO SEXUAL';
                break;
            case 11:
                aux = 'SOSPECHA VIOLENCIA SEXUAL';
                break;
            case 12:
                aux = 'SOSPECHA MALTRATO EMOCION';
                break;
            case 13:
                aux = 'ENFERMEDAD GENERAL';
                break;
            case 14:
                aux = 'ENFERMEDAD PROFESIONAL';
                break;
            case 15:
                aux = 'NO APLICA';
                break;
            default:
                aux = '       ';
                break;
        }
        datos.rips.contenido.push(aux);
    }

    if ($_HCI02._evolucion.MACRO.CLASE == 'C') {
        // continue
    } else {
        if ($_HCI02._evolucion.UNSERV == '08') {
            datos.rips.titulo.push('FINALIDAD:  ');
            if (parseFloat($_HCI02._evolucion.RIPS.FINALID) == 0) {
                $_HCI02._evolucion.RIPS.FINALID = $_HCI02._hcprc.rips.finalidad;
            }
            aux = '';
            switch ($_HCI02._evolucion.RIPS.FINALID) {
                case '1':
                    aux = 'ATENCION PARTO -Puerperio-';
                    break;
                case '2':
                    aux = 'ATENCION RECIEN NACIDO';
                    break;
                case '3':
                    aux = 'ATENCION PLANIF.FAMILIAR';
                    break;
                case '4':
                    aux = 'AT.ALTER.CREC. & DESARR.<10';
                    break;
                case '5':
                    aux = 'DETECCION ALT. DESARR.JOVEN';
                    break;
                case '6':
                    aux = 'DETECCION ALT. EMBARAZO';
                    break;
                case '7':
                    aux = 'DETECCION ALT. ADULTO';
                    break;
                case '8':
                    aux = 'DETECCION ALT. AGUDEZA VISUAL';
                    break;
                case '9':
                    aux = 'DETECCION ENFERM.PROFESIONAL';
                    break;
                case '10':
                    aux = 'NO APLICA';
                    break;
                case '11':
                    aux = 'PATOLOGIAS CRONICAS';
                    break;
                default:
                    aux = '       ';
                    break;
            }
            datos.rips.contenido.push(aux);

            if ($_HCI02._evolucion.RIPS.FINALID == '05' &&
                ($_HCI02._evolucion.SIGNOS_VITALES.TANNER_PUBICO == '1' || $_HCI02._evolucion.SIGNOS_VITALES.TANNER_PUBICO == '2' ||
                    $_HCI02._evolucion.SIGNOS_VITALES.TANNER_PUBICO == '3' || $_HCI02._evolucion.SIGNOS_VITALES.TANNER_PUBICO == '4' ||
                    $_HCI02._evolucion.SIGNOS_VITALES.TANNER_PUBICO == '5')) {
                imprimirTanner_HCI02();
            }
        }

        if (parseFloat($_HCI02._evolucion.RIPS.ESTADO_SAL) == 0 || $_HCI02._evolucion.RIPS.ESTADO_SAL.trim() == '') {
            aux = '';
        } else {
            datos.rips.titulo.push('ESTADO SALIDA:  ');
            aux = '';
            switch ($_HCI02._evolucion.RIPS.ESTADO_SAL) {
                case '1':
                    aux = 'VIVO (A)';
                    break;
                case '2':
                    aux = 'MUERTO (A)';
                    break;
                case '3':
                    aux = 'REMITIDO A: ';
                    break;
                case '4':
                    aux = 'HOSPITALIZADO';
                    break;
                case '5':
                    aux = 'OBSERVACION';
                    break;
                default:
                    aux = '  ';
                    break;
            }
            datos.rips.contenido.push(aux);
        }

        if (parseFloat($_HCI02._evolucion.RIPS.ATIENDE) == 0 || $_HCI02._evolucion.RIPS.ATIENDE.trim() == '') {
            aux = '';
        } else {
            datos.rips.titulo.push('PERS.ATIENDE:  ');
            aux = '';
            switch ($_HCI02._evolucion.RIPS.ATIENDE) {
                case '1':
                    $_HCI02._evolucion.DESCRIP_ESPEC_MEDICO.trim() != '' ? aux = $_HCI02._evolucion.DESCRIP_ESPEC_MEDICO : aux = 'MEDICO ESPECIALISTA';
                    break;
                case '2':
                    aux = 'MEDICO GENERAL';
                    break;
                case '3':
                    aux = 'ENFERMERA';
                    break;
                case '4':
                    aux = 'AUXILIAR ENFERMERIA';
                    break;
                case '5':
                    aux = 'TERAPIAS Y OTROS';
                    break;
                case '6':
                    aux = 'ENFERMERA JEFE PYP';
                    break;
                case '7':
                    aux = 'PSICOLOGIA';
                    break;
                case '8':
                    aux = 'NUTRICIONISTA';
                    break;
                case 'A':
                    aux = 'ODONTOLOGIA';
                    break;
                case 'H':
                    aux = 'HIGIENISTA ORAL';
                    break;
                case 'I':
                    aux = 'INSTRUMENTACION';
                    break;
                case 'O':
                    aux = 'OPTOMETRA';
                    break;
                case 'T':
                    aux = 'TRABAJO SOCIAL';
                    break;
                default:
                    aux = 'NO APLICA';
                    break;
            }
            datos.rips.contenido.push(aux);
        }

        if (parseFloat($_HCI02._evolucion.RIPS.DIAG_MUER) > 0) {
            datos.rips.titulo.push('DIAGNOSTICO DE MUERTE:  ');
            await postData({ datosh: datosEnvio() + $_HCI02._evolucion.RIPS.DIAG_MUER }, get_url("app/HICLIN/HCI-8031-1.DLL"))
                .then(data => {
                    $_HCI02.enf_muerte = data;
                    if ($_HCI02.enf_muerte[0].cod_diagn.trim() != '') {
                        datos.rips.contenido.push($_HCI02.enf_muerte[0].cod_diagn + ' - ' + $_HCI02.enf_muerte[0].nom_diagn);
                    } else {
                        datos.rips.contenido.push($_HCI02._evolucion.RIPS.DIAG_MUER);
                    }
                }).catch(err => {
                    console.log(err, 'error')
                })
        }
    }
}

function imprimirTanner_HCI02() {
    datos.rips.titulo.push('TANNER:  VELLO PUBIANO');

    aux = '';
    switch ($_HCI02._evolucion.SIGNOS_VITALES.TANNER_PUBICO) {
        case '1':
            aux = '1. SIN VELLO PUBIANO';
            break;
        case '2':
            aux = '2. VELLO DISPERSO, LARGO, FINO, LISO O LIGERAMENTE RIZADO, POCO PIGMENTADO, EN LABIOS MAYORES';
            break;
        case '3':
            aux = '3. VELLO MAS PIGMENTADO, DENSO Y RIZADO QUE SE EXTIENDE A LA SINFILIS PUBICA';
            break;
        case '4':
            aux = '4. VELLO SEMEJANTE AL ADULTO PERO EN MENOR CANTIDAD';
            break;
        case '5':
            aux = '5. VELLO IGUAL AL ADULTO';
            break;
        default:
            aux = '   ';
    }
    datos.rips.contenido.push(aux);

    if ($_REG_PACI.SEXO == 'F') {
        datos.rips.titulo.push('TANNER:  ESTADIO MAMARIO');

        aux = '';
        switch ($_HCI02._evolucion.SIGNOS_VITALES.TANNER_GENIT) {
            case '0':
                aux = 'NO SE EVALUO';
                break;
            case '1':
                aux = '1. ELEVACION DE LA PAPILA (PREADOLESCENTE)';
                break;
            case '2':
                aux = '2. BOTON MAMARIO, ELEVACION DE LAS MAMAS Y LA PAPILA, AUMENTO TAMAÑO AEROLAR';
                break;
            case '3':
                aux = '3. AUMENTO TAMAÑO MAMARIO SIS SEPARACION DE SUS CONTORNOS';
                break;
            case '4':
                aux = '4. PROYECCION DE LA AREOLA Y PAPILA, QUE SOBRESALEN DEL PLANO DE LA MAMA';
                break;
            case '5':
                aux = '5. MAMA ADULTA, SOLAMENTE SE PROYECTA LA PAPILA';
                break;
        }
        datos.rips.contenido.push(aux);
    } else {
        datos.rips.titulo.push('TANNER:  ESTADIO GENITAL');

        aux = '';
        switch ($_HCI02._evolucion.SIGNOS_VITALES.TANNER_GENIT) {
            case '0':
                aux = 'NO SE EVALUO';
                break;
            case '1':
                aux = '1. PENE, TESTICULO Y ESCROTO DE TAMAÑO INFANTIL';
                break;
            case '2':
                aux = '2. AUMENTO DEL TAMAÑO DE LOS TESTICULOS Y EL ESCROTO, CUYA PIEL ES FINA Y ENROJECIDA';
                break;
            case '3':
                aux = '3. SE SUMA EL AUMENTO DEL TAMAÑO DEL PENE';
                break;
            case '4':
                aux = '4. AUMENTO DE TAMAÑO DE GENITALES MAS AUMENTO PIGMENTACION ESCROTAL';
                break;
            case '5':
                aux = '5. GENITALES ADULTOS';
                break;
        }
        datos.rips.contenido.push(aux);
    }
}

async function cerrarImpresion_HCI02() {
    await imprimirFirma_HCI02();

    return new Promise(resolve => {
        resolve()
    })
}

async function imprimirPatol_HCI02() {
    if ($_HCI02._evolucion.PATOLOGIA.PIEZA_QUIR.trim() != '') {
        _inicicarPatol($_HCI02.varEnvio, $_HCI02.datosHC705._opciones);
    }
}

async function imprimirFirma_HCI02() {
    if (($_HCI02._evolucion.TIPO == '1' || $_HCI02._evolucion.TIPO == '2') && $_HCI02.datosHC705._opciones.opc_evo == 'S') {
        if ($_HCI02._evolucion.UNSERV == '02' || $_HCI02._evolucion.UNSERV == '08' || $_HCI02._evolucion.UNSERV == '63') {
            await imprimirDatosCovid_HCI02();
        }
    }

    aux = '';
    switch ($_HCI02._evolucion.DESCRIP_ESPEC_MEDICO) {
        case '   ':
            aux = '';
            break;
        case '385':
            $_HCI02._evolucion.MEDICO.trim() == '46452426' ? aux = 'MED. FAMILIAR' : aux = 'MED. GENERAL';
            break;
        default:
            aux = $_HCI02._evolucion.DESCRIP_ESPEC_MEDICO;
            break;
    }

    if ($_HCI02.nit_usu == 844003225) {
        if ($_HCI02._evolucion.RIPS.ATIENDE == '1') {
            // continue
        } else {
            switch ($_HCI02._evolucion.RIPS.ATIENDE) {
                case "1":
                    aux = "MEDICO ESPECIALISTA      ";
                    break;
                case "2":
                    aux = "MEDICO GENERAL           ";
                    break;
                case "3":
                    aux = "ENFERMERO(A) JEFE        ";
                    break;
                case "4":
                    aux = "AUXILIAR ENFERMERIA      ";
                    break;
                case "5":
                    aux = "TERAPEUTAS Y OTROS       ";
                    break;
                case "6":
                    aux = "ENFERMERA JEFE P Y P     ";
                    break;
                case "7":
                    aux = "PSICOLOGIA               ";
                    break;
                case "8":
                    aux = "NUTRICIONISTA            ";
                    break;
                case "9":
                    aux = "NO APLICA                ";
                    break;
                case "A":
                    aux = "ODONTOLOGO               ";
                    break;
                case "B":
                    aux = "AUDITOR MEDICO           ";
                    break;
                case "H":
                    aux = "HIGIENE ORAL             ";
                    break;
                case "I":
                    aux = "INSTRUMENTADOR(A)        ";
                    break;
                case "O":
                    aux = "OPTOMETRA                ";
                    break;
                case "T":
                    aux = "TRABAJO SOCIAL           ";
                    break;
                default:
                    aux = '  ';
                    break;
            }
        }
    }

    datos.medico.espec = aux;

    datos.medico.firma = parseFloat($_HCI02._evolucion.MEDICO.trim());
    datos.medico.nombre = $_HCI02._evolucion.NOM_MEDICO.replace(/\?/g, 'Ñ');
    datos.medico.reg = $_HCI02._evolucion.REG_MEDICO;

    if ($_HCI02._evolucion.TIPO == '1' && $_HCI02.datosHC705._opciones.opc_evo == 'S' && $_HCI02.nit_usu == 800175901) {
        // imprimirRecomendacionesCovid_HCI02();
    }

    if ($_HCI02._evolucion.TIPO == '3') {
        if ($_HCI02.nit_usu == 892000401) {
            // continue
        } else {
            if ($_HCI02.datosHC705._opciones.opc_resu == 'S' && $_HCI02.nit_usu == 800162035) {
                // continue
            } else {
                // imprimirRecomendacionesCovid_HCI02();
            }
        }
    }

    return new Promise(resolve => {
        resolve()
    })
}

function imprimirRecomendacionesCovid_HCI02() {
    if ($_HCI02._hcprc.covid19.recomendacion_covid19) {
        datos.covid.recomendaciones.bandera = true;
    }
}

async function imprimirDatosCovid_HCI02() {
    if ($_HCI02._evolucion.COVID.VIAJE.trim() == '' && $_HCI02._evolucion.COVID.CONTACTO.trim() == '') {
        // continue
    } else {
        datos.covid.riesgos.bandera = true;

        aux = '';
        switch ($_HCI02._evolucion.COVID.VIAJE) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.transito = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.CONTACTO) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.contDiag = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.FIEBRE) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.fiebre = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.TOS) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.tos = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.DISNEA) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.disnea = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.MALESTAR) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.general = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.RINORREA) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.rinorrea = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.PERSONAL_SALUD) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.contEstr = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.ODINOFAGIA) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.odinofagia = aux;

        aux = '';
        switch ($_HCI02._evolucion.COVID.VIAJE_DENTRO) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.pre1 = aux;

        if ($_HCI02._evolucion.COVID.VIAJE_DENTRO == 'S') {
            var x = $_HCI02._ciudades.find(e => e.COD == $_HCI02._evolucion.COVID.LUGAR_VIAJE_DENTRO);
            (x != undefined) ? datos.covid.riesgos.pre2 = x.NOMBRE : false;
            datos.covid.riesgos.pre3 = $_HCI02._evolucion.COVID.TIEMPO_VIAJE_DENTRO;
        }

        aux = '';
        switch ($_HCI02._evolucion.COVID.VIAJE_FUERA) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos.covid.riesgos.pre4 = aux;

        if ($_HCI02._evolucion.COVID.VIAJE_FUERA == 'S') {
            var x = await $_HCI02._paisesRips.find(e => e.CODIGO == $_HCI02._evolucion.COVID.LUGAR_VIAJE_FUERA);
            (x != undefined) ? datos.covid.riesgos.pre5 = x.DESCRIP : false;
            datos.covid.riesgos.pre6 = $_HCI02._evolucion.COVID.TIEMPO_VIAJE_FUERA;
        }
    }
}

async function imprimirPerinatal_HCI02() {
    datos.perinatal.titulo.push('GESTACIONES:  ')
    datos.perinatal.contenido.push($_HCI02._evolucion.EMBAR.GESTACIONES);

    datos.perinatal.titulo.push('PESO PREVIO:  ')
    datos.perinatal.contenido.push($_HCI02._evolucion.EMBAR.PESO_PREV);

    datos.perinatal.titulo.push('FECHA ULT REGLA:  ')
    datos.perinatal.contenido.push(_editFecha2($_HCI02._evolucion.EMBAR.FECHA_REGLA));

    datos.perinatal.titulo.push('EDAD GESTACIONAL:  ')
    var entero = Math.trunc($_HCI02._evolucion.EMBAR.EDAD_GEST_REGLA);
    var decimales = $_HCI02._evolucion.EMBAR.EDAD_GEST_REGLA - Math.trunc($_HCI02._evolucion.EMBAR.EDAD_GEST_REGLA);
    var dias = Math.round(7 * decimales);
    var edad_gest = entero + ' + ' + (dias);

    datos.perinatal.contenido.push(edad_gest);

    datos.perinatal.titulo.push('ALT UTERINA:  ')
    datos.perinatal.contenido.push($_HCI02._evolucion.EMBAR.ALT_UTER);
}

function encabezarDiag_HCI02() {

}

function imprimirMuestraCito_HCI02() {

}

function imprimirResultadoCito_HCI02() {

}

function imprimirPartograma_HCI02() {

}

async function imprimirIncapacidad_HCI02() {
    $_HCI02.banderaIncap = true;
    var busqIncap = $_HCI02._evolucion.FORMULACION.find(e => e['TIPO-FORMU'] == '6');
    if (busqIncap) {
        // let index = $_HCI02._evolucion.FORMULACION.findIndex(e => e['TIPO-FORMU'] == '6');
        //  Yeisson. O -> se agregan segunda indicaciones para incapacidad (no se estaban teniendo en cuenta en la impresion)
        let indic2_2_formu = busqIncap['INDIC2_2FORMU'] || "";
        await leerArchivoFormu(busqIncap['COD-FORMU'], '6');
        $_HCI02.varEnvio._inc = {
            FECHA_INC: busqIncap['INDI1-FORMU'],
            TIPO_INC: busqIncap['TIPO-FORMU'],
            COD_INC: busqIncap['COD-FORMU'],
            CANT_INC: busqIncap['CANT-FORMU'],
            INDIC_INC: busqIncap['INDI1-FORMU'] + busqIncap['INDI2-FORMU'] + indic2_2_formu,
            TIPO_EXT_INC: busqIncap['TIPO-INCAP-FORMU'],
            COLEGIO_INC: busqIncap['INSTITUTO-FORMU'],
            ITEM_INC: busqIncap['PRORROG-FORMU'],
            GRADO_INC: busqIncap['GRADO-INCAP-FORMU'],
            MED_ENC_INC: $_HCI02._evolucion.MEDICO,
            PACI_ENC_INC: $_HCI02._evolucion.LLAVE_EVO.substring(0, 15),
            FECHA_ENC_INC: $_HCI02._evolucion.FECHA_EVO,
            EDAD_ENC_INC: $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad,
            DIAG_ENC_INC: $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0],
            LLAVE_EVO: $_HCI02._evolucion.LLAVE_EVO,
            _evolucion: $_HCI02._evolucion
        }
        if ($_USUA_GLOBAL[0].NIT == 892000401) {
            var u = $_HCI02._evolucion.UNSERV;
            if (u == '01' || u == '02' || u == '05' || u == '55' || u == '04') {
                $_HCI02.varEnvio._inc.DESCRIP_ENC_INC = 'AMBULATORIO';
            } else {
                $_HCI02.varEnvio._inc.DESCRIP_ENC_INC = 'HOSPITALIZADO';
            }
        } else {
            $_HCI02.varEnvio._inc.DESCRIP_ENC_INC = $_HCI02._evolucion.DESCRIP_UNSERV
        }

        $_HCI02.varEnvio.nit_fact_lnk = $_HCI02._hcprc.cierre.nit_fact;

        $_HCI02.varEnvio._incapacidad = $_HCI02._incapacidad[0];

        if ($_USUA_GLOBAL[0].NIT == 800162035 &&
            ($_REG_PACI.EPS.substring(0, 3) == 'EAR' || $_REG_PACI.EPS.substring(0, 3) == 'RES') &&
            $_REG_PACI.EPS != 'RES002') { } else {
            _iniciarHCI01I($_HCI02.varEnvio);
        }
    }
}

async function imprimirProcedimientos_HCI02() {
    if ($_HCI02._evolucion.MACRO.CODIGO == '000000') {
        aux = '';
        switch ($_HCI02._evolucion.RIPS.ATIENDE) {
            case '1':
                $_HCI02._evolucion.DESCRIP_ESPEC_MEDICO.trim() != '' ? aux = $_HCI02._evolucion.DESCRIP_ESPEC_MEDICO : aux = 'MEDICO ESPECIALISTA';
                break;
            case '2':
                aux = 'MEDICO GENERAL';
                break;
            case '3':
                aux = 'ENFERMERA';
                break;
            case '4':
                aux = 'AUXILIAR ENFERMERIA';
                break;
            case '5':
                aux = 'TERAPIAS Y OTROS';
                break;
            case '6':
                aux = 'ENFERMERA JEFE PYP';
                break;
            case '7':
                aux = 'PSICOLOGIA';
                break;
            case '8':
                aux = 'NUTRICIONISTA';
                break;
            case 'A':
                aux = 'ODONTOLOGIA';
                break;
            case 'H':
                aux = 'HIGIENISTA ORAL';
                break;
            case 'I':
                aux = 'INSTRUMENTACION';
                break;
            case 'O':
                aux = 'OPTOMETRA';
                break;
            case 'T':
                aux = 'TRABAJO SOCIAL';
                break;
            default:
                aux = 'NO APLICA';
                break;
        }
    } else {
        switch ($_HCI02._evolucion.MACRO['CLASE']) {
            case '1':
                aux = 'CIRUGIA';
                break;
            case '2':
                aux = 'PROCEDIMIENTO:';
                break;
            case '3':
                aux = 'RESULTADOS DE IMAGENOLOGIA';
                break;
            case '4':
                aux = 'ENFERMERIA';
                break;
            case '5':
                aux = 'MEDICINA GENERAL';
                break;
            case '6':
                aux = 'MEDICINA ESPECIALIZADA';
                break;
            case '7':
                aux = 'RESUMENES DE HISTORIA';
                break;
            case '8':
                aux = 'TERAPIAS';
                break;
            case 'A':
                aux = 'PRE-ANESTESIA';
                break;
            case 'H':
                aux = 'ODONTOLOGIA';
                break;
            case 'I':
                aux = 'CONSENTIM. INFORMADO';
                break;
            case 'O':
                aux = 'PROMOCION Y PREVENCION';
                break;
            default:
                aux = $_HCI02._evolucion.MACRO['CLASE'];
                break;
        }
    }

    if (localStorage.idOpciondata != '072') {
        datos.tabla.subtitulo = 'NOTA:   ' + aux + '   ' + $_HCI02._evolucion.DESCRIP_UNSERV;
    }

    if (($_HCI02._evolucion.TIPO == '2' || $_HCI02._evolucion.MACRO.CLASE == '9') &&
        (parseFloat($_HCI02.peso_w) > 0 || parseFloat($_HCI02._evolucion.SIGNOS_VITALES.TALLA) > 0 ||
            parseFloat($_HCI02._evolucion.SIGNOS_VITALES.TEMP) > 0 || parseFloat($_HCI02._evolucion.SIGNOS_VITALES.TENS_1) > 0)) {
        imprimirSignos_HCI02();
    }

    if ($_HCI02._evolucion.TIPO == '3') {
        if (parseFloat($_HCI02.peso_w) > 0) {
            datos.subtitulos.titulo.push('PESO:  ')
            datos.subtitulos.contenido.push(parseFloat($_HCI02.peso_w));
        }

        if (parseFloat($_HCI02._evolucion.SIGNOS_VITALES.TALLA) > 0) {
            datos.subtitulos.titulo.push('TALLA:  ')
            datos.subtitulos.contenido.push(parseFloat($_HCI02._evolucion.SIGNOS_VITALES.TALLA));
        }
    }

    await imprimirCups_HCI02();

    if ($_HCI02._evolucion.MACRO.CODIGO == '000000' || $_HCI02._evolucion.MACRO.CODIGO.trim() == '') {
        aux = '';
    } else {
        await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
            .then(async (data) => {
                $_HCI02._codigosMacros = data.MACROS;
                var busqMacro = await $_HCI02._codigosMacros.find(e => e.CLASE.concat(e.CODIGO) == $_HCI02._evolucion.MACRO.CLASE.concat($_HCI02._evolucion.MACRO.CODIGO))
                busqMacro == undefined ? aux = $_HCI02._evolucion.MACRO.CLASE.concat($_HCI02._evolucion.MACRO.CODIGO) : aux = busqMacro.DETALLE;
                datos.subtitulos.titulo.push('');
                datos.subtitulos.contenido.push(aux);
            })
            .catch((err) => {
                console.log(err, 'err')
                // loader('hide')
                // _regresar_menuhis();
            });
    }

    if (parseInt($_HCI02._evolucion.MACRO.VIA) != 0 && $_HCI02._evolucion.MACRO.VIA.trim() != '') {
        await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER856.DLL"))
            .then(async (data) => {
                $_HCI02._vias = data.VIAS_ACCESO;
                aux = '';
                var busqVias = await $_HCI02._vias.find(e => e.CODIGO == $_HCI02._evolucion.MACRO.VIA);
                busqVias == undefined ? aux = $_HCI02._evolucion.MACRO.VIA : aux = busqVias.NOMBRE;

                datos.subtitulos.titulo.push('VIA DE ACCESO:  ');
                datos.subtitulos.contenido.push(aux);
            })
            .catch((err) => {
                console.log(err, 'err')
                // loader('hide')
                // _regresar_menuhis();
            });
    }

    // LLENAR CITOLOGIAS ---------------------------------------------------------------------------------------------------

    await imprimirTablaEvolucion_HCI02();
}

function imprimirSignos_HCI02() {
    datos.signos.bandera = true;

    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.TENS_1 + '/' + $_HCI02._evolucion.SIGNOS_VITALES.TENS_2);
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.TENS_MEDIA);
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.F_CARD + ' lmp');
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.F_RESP + ' rpm');
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.TEMP + '°');
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.OXIMETRIA + '%');
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.PVC);

    if ($_HCI02._evolucion.PESO_NEW == 0) {
        if ($_HCI02._hcprc.signos.und_peso == '2' || parseFloat($_HCI02.peso_w) > 500) {
            datos.signos.cont.push($_HCI02.peso_w + ' Gr');
        } else {
            datos.signos.cont.push($_HCI02.peso_w + ' Kl');
        }
    } else {
        datos.signos.cont.push($_HCI02.peso_w);
    }

    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.TALLA + ' cm');
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.IMC_CORP);
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.SUP_CORP + ' m2');
    datos.signos.cont.push($_HCI02._evolucion.PER_TORA);
    datos.signos.cont.push($_HCI02._evolucion.PER_ABDO);
    datos.signos.cont.push($_HCI02._evolucion.PER_MUNE);
    datos.signos.cont.push($_HCI02._evolucion.SIGNOS_VITALES.VLR_GLASG + '/15');
}

async function imprimirCups_HCI02() {
    if ($_HCI02.nit_usu == 892000401) {
        for (i in $_HCI02._evolucion.TABLA_CUPS) {
            await leerArchivoFormu($_HCI02._evolucion.TABLA_CUPS[i].trim(), '4');
            var ord_med = $_HCI02._ordenes_medicas.find(e => e['LLAVE_J'] == $_HCI02._evolucion.TABLA_CUPS[i].trim());
            ord_med != undefined ? descripcion = ord_med.DESCRIP_J : descripcion = cod_formu;
            datos.cups.titulo.push('PROCEDIMIENTO:  ');
            datos.cups.contenido.push($_HCI02._evolucion.TABLA_CUPS[i].trim() + ' - ' + descripcion);
        }
    } else {
        await _cargarCups();
    }
}

async function _cargarCups() {
    for (i in $_HCI02._evolucion.TABLA_CUPS) {
        if ($_HCI02._evolucion.TABLA_CUPS[i].trim() != '') {
            datos.cups.titulo.push('PROCEDIMIENTO:  ');
            datos.cups.contenido.push($_HCI02._evolucion.TABLA_CUPS[i].trim() + ' - ' + $_HCI02._evolucion.DESCRIPCIONES_CUPS[i].trim());
        }
    }
}

async function imprimirTablaEvolucion_HCI02() {
    if ($_HCI02.tabla_evo != undefined) {
        datos.subtitulos.titulo.push('');
        $_HCI02.tabla_evo = $_HCI02.tabla_evo.replace(/\s+/g, ' ');
        $_HCI02.tabla_evo = $_HCI02.tabla_evo.replace(/\&/g, "\n").trim()
        datos.subtitulos.contenido.push($_HCI02.tabla_evo)
    }
}

async function salir_HCI02() {
    console.log('salir');
    $_HCI02.salir = true;
}

async function llenarEncabezado_HCI02() {
    //  ----------encabezado scl -----------
    datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    datos.encabezado.nit = $_HCI02.nit_usu;

    datos.encabezado.folio = $_HCI02.datosHC705.folio;

    aux = '';
    if (($_HCI02.nit_usu == 900147959 && $_HCI02._evolucion.UNSERV == '05') || $_HCI02.sw_ambulatorio_w == 1) {
        aux = 'UNIDAD ' + $_HCI02._evolucion.UNSERV;
    } else {
        aux = $_HCI02._evolucion.DESCRIP_UNSERV;
    }
    datos.encabezado.unid_serv = aux;

    aux = '';
    if ($_HCI02._evolucion.UNSERV == '01') {
        switch ($_HCI02._hcprc.rips.triage) {
            case 1:
                aux = 'TRIAGE 1';
                break;
            case 2:
                aux = 'TRIAGE 2';
                break;
            case 3:
                aux = 'TRIAGE 3';
                break;
            case 4:
                aux = 'TRIAGE 4';
                break;
            default:
                aux = $_HCI02._hcprc.rips.triage;
                break;
        }
    }
    datos.encabezado.triage = aux;
    datos.encabezado.imprime = localStorage.Usuario + moment().format(' DD-MM-YYYY hh-mm');

    if ($_HCI02.nit_usu == 900541158 || $_HCI02.nit_usu == 900566047 || $_HCI02.nit_usu == 900658567 ||
        $_HCI02.nit_usu == 900565371 || $_HCI02.nit_usu == 900435177 || $_HCI02.nit_usu == 900481648 ||
        $_HCI02.nit_usu == 900005594) {

    } else {
        if ($_HCI02.datosHC705.original == 0) {
            datos.original.bandera = true;
            datos.original.descrip = 'COPIA';
        } else if ($_HCI02.datosHC705.original == null) {

        } else {
            datos.original.bandera = true;
            datos.original.descrip = 'ORIGINAL';
        }
        // dependiendo de los nit o el numero que venga en la variable original muestra o no muestra si es copia u original
    }

    // LLENAR DATOS PACIENTE - DATOS EVOULUCION

    await llenarDatosPaciente();

    return new Promise(resolve => {
        resolve('llena encabezado')
    })
}

async function llenarDatosPaciente() {
    $_HCI02._evolucion.FECHA_EVO == '00000000' ? $_HCI02._evolucion.FECHA_EVO = '        ' : false;

    datos.paciente.fecha = _editarFecha($_HCI02._evolucion.FECHA_EVO);
    datos.paciente.hora = $_HCI02._evolucion.HORA_EVO.substring(0, 2) + ':' + $_HCI02._evolucion.HORA_EVO.substring(2, 4);
    datos.paciente.fact = $_HCI02._hcprc.cierre.prefijo + $_HCI02._hcprc.cierre.nro_fact;
    datos.paciente.hab_hc = $_HCI02._hcprc.cierre.hab;

    aux = '';
    switch ($_REG_PACI.TIPO) {
        case "C":
            aux = "CONTRIBUTIVO";
            break;
        case "S":
            aux = "SUBSIDIADO  ";
            break;
        case "V":
            aux = "VINCULADO   ";
            break;
        case "P":
            aux = "PARTICULAR  ";
            break;
        case "O":
            aux = "OTRO TIPO   ";
            break;
        case "D":
            aux = "DESPLAZ CONT";
            break;
        case "E":
            aux = "DESPLAZ SUBS";
            break;
        case "F":
            aux = "DESPLAZ VINC";
            break;
    }

    $_REG_PACI.CRONICO == 'S' ? datos.paciente.regimen = aux + '    PACIENTE CRÓNICO' : datos.paciente.regimen = aux;
    datos.paciente.nombre = $_REG_PACI.DESCRIP.replace(/\s+/g, ' ');
    datos.paciente.tipoId = $_REG_PACI['TIPO-ID'];
    isNaN($_REG_PACI.COD) == true ? aux = $_REG_PACI.COD : aux = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
    datos.paciente.id = aux;
    datos.paciente.folio = $_HCI02._hcprc.llave.substring(15, 17) + ' - ' + $_HCI02._hcprc.llave.substring(17, 23);
    datos.paciente.gruposangre = $_REG_PACI['GRP-SANG'];
    datos.paciente.rhpacie = $_REG_PACI['RH'];

    if (($_HCI02._hcprc.cierre.nit_fact == '' || $_HCI02._hcprc.cierre.nit_fact == 0) || ($_HCI02.nit_usu == 800175901 || $_HCI02.nit_usu == 19381427 || $_HCI02.nit_usu == 17306492 || $_HCI02.nit_usu == 31810010)) {
        datos.paciente.entidad = $_REG_PACI['NOMBRE-EPS'];
    } else {
        datos.paciente.entidad = $_HCI02._hcprc.cierre.descrip_nit_fact;
    }

    // datos.paciente.edad = $_HCI02._hcprc.edad;
    datos.paciente.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad;
    datos.paciente.fecha_naci = _editFecha2($_REG_PACI.NACIM);
    $_REG_PACI.SEXO == 'F' ? datos.paciente.sexo = 'Femenino' : datos.paciente.sexo = 'Masculino';
    datos.paciente.est_civil = _ESTCIVIL($_REG_PACI['EST-CIV']);
    datos.paciente.direccion = $_REG_PACI['DIRECC'];
    datos.paciente.ciudad = $_REG_PACI["DESCRIP-CIUDAD"];

    datos.paciente.tipo_afiliacion = _TIPOAFIL($_REG_PACI['TIPO-AFIL']);
    datos.paciente.acompañante = $_REG_PACI['ACOMPA'];
    datos.paciente.tel = $_REG_PACI['TELEFONO'];
    datos.paciente.nacim = _editFecha3($_REG_PACI['NACIM']);

    return new Promise(resolve => {
        resolve('llena paciente')
    })
}

async function imprimirFormulacion_Evo_HCI02() {
    inicializar_Medicamentos();
    inicializar_interpretacion();

    datos.codigoBarra.bandera = true;
    datos.medicamentos.bandera = true;

    var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
    var nit_usu = $_USUA_GLOBAL[0].NIT;

    if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {

    } else if (atiende_evo == 3 || atiende_evo == 6) {
        datos.sub.subtitul = "TRANSCRIPCION FORMULACION:";
    } else {
        datos.sub.subtitul = "FORMULACION:";
    }

    for (i in $_HCI02._evolucion.FORMULACION) {
        var tipo_formu = $_HCI02._evolucion.FORMULACION[i]['TIPO-FORMU'];
        var cod_formu = $_HCI02._evolucion.FORMULACION[i]['COD-FORMU'];
        var cod_soat = $_HCI02._evolucion.FORMULACION[i]['COD_TARIF'];
        var descripcion = ''
        switch (tipo_formu) {
            case '1':
                if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                    datos.medicamentos.tipo_formu.push('');
                } else {
                    datos.medicamentos.tipo_formu.push('Farmacia');
                }

                if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                    datos.medicamentos.cod_soat.push(cod_soat);
                } else {
                    datos.medicamentos.cod_soat.push('');
                }

                datos.medicamentos.cod_formu.push(cod_formu.trim());
                descripcion = $_HCI02._evolucion.FORMULACION[i]['DESCRIP-FORMU'];
                datos.medicamentos.descrip.push(descripcion.trim());
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";
                break;
            case '2':
                if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                    datos.medicamentos.tipo_formu.push('');
                } else {
                    datos.medicamentos.tipo_formu.push('Laboratorio');
                }

                if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                    datos.medicamentos.cod_soat.push(cod_soat);
                } else {
                    datos.medicamentos.cod_soat.push('');
                }

                datos.medicamentos.cod_formu.push(cod_formu.trim());
                descripcion = $_HCI02._evolucion.FORMULACION[i]['DESCRIP-FORMU'];
                datos.medicamentos.descrip.push(descripcion.trim());
                if (nit_usu == 892000401) {
                    datos.mensaje.mensaje1 = "FORMULA VALIDA POR 24 DIAS";
                } else {
                    datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";
                }
                break;
            case '3':
                if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                    datos.medicamentos.tipo_formu.push('');
                } else {
                    datos.medicamentos.tipo_formu.push('Imagenologia');
                }

                if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                    datos.medicamentos.cod_soat.push(cod_soat);
                } else {
                    datos.medicamentos.cod_soat.push('');
                }

                datos.medicamentos.cod_formu.push(cod_formu.trim());
                descripcion = $_HCI02._evolucion.FORMULACION[i]['DESCRIP-FORMU'];
                datos.medicamentos.descrip.push(descripcion.trim());
                if (nit_usu == 892000401) {
                    datos.mensaje.mensaje1 = "FORMULA VALIDA POR 24 DIAS";
                } else {
                    datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";
                }
                break;
            case '4':
                if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                    datos.medicamentos.tipo_formu.push('');
                } else {
                    datos.medicamentos.tipo_formu.push('Ordenes Medicas');
                }

                if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                    datos.medicamentos.cod_soat.push(cod_soat);
                } else {
                    datos.medicamentos.cod_soat.push('');
                }

                datos.medicamentos.cod_formu.push(cod_formu.trim());
                descripcion = $_HCI02._evolucion.FORMULACION[i]['DESCRIP-FORMU'];
                datos.medicamentos.descrip.push(descripcion.trim());
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";
                break;
            case '5':
                if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                    datos.medicamentos.tipo_formu.push('');
                } else {
                    datos.medicamentos.tipo_formu.push('Interconsultas');
                }

                if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                    datos.medicamentos.cod_soat.push(cod_soat);
                } else {
                    datos.medicamentos.cod_soat.push('');
                }

                datos.medicamentos.cod_formu.push(cod_formu.trim());
                descripcion = $_HCI02._evolucion.FORMULACION[i]['DESCRIP-FORMU'];
                datos.medicamentos.descrip.push(descripcion.trim());
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";
                break;
            case '6':
                if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                    datos.medicamentos.tipo_formu.push('');
                } else {
                    datos.medicamentos.tipo_formu.push('Incapacidad');
                }

                if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                    datos.medicamentos.cod_soat.push(cod_soat);
                } else {
                    datos.medicamentos.cod_soat.push('');
                }

                datos.medicamentos.cod_formu.push(cod_formu.trim());
                descripcion = $_HCI02._evolucion.FORMULACION[i]['DESCRIP-FORMU'];
                datos.medicamentos.descrip.push(descripcion.trim());
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 72 HORAS";
                break;
        }
        var cantid = $_HCI02._evolucion.FORMULACION[i]['CANT-FORMU'];
        datos.medicamentos.cantidad.push(cantid);
        // var grupo_formu = $_HCI02._evolucion.FORMULACION[i]['COD-FORMU'].substring(0, 2);

        // if (grupo_formu == "IC") {
        //     datos.medicamentos.dias.push('DIAS');
        // } else {
        //     datos.medicamentos.dias.push('');
        // }

        var dias_trat = $_HCI02._evolucion.FORMULACION[i]['DIAS-TRAT'];
        if (tipo_formu == "1") {
            datos.medicamentos.dias_trat.push(dias_trat);
        } else {
            datos.medicamentos.dias_trat.push('');
        }

        manejo_formu = $_HCI02._evolucion.FORMULACION[i]['MANEJO_FORMU'] || "";
        switch (manejo_formu) {
            case "1":
                datos.medicamentos.manejo_formu.push('INT');
                break;
            case "2":
                datos.medicamentos.manejo_formu.push('AMB');
                break;
            default:
                datos.medicamentos.manejo_formu.push('');
        }

        espec_formu = $_HCI02._evolucion.FORMULACION[i].ESPEC_FORMU;
        var cant_formu = "";
        var descrip_linea16 = "";

        if ($_HCI02._evolucion.FORMULACION[i]['INDI1-FORMU'].trim() == "" && $_HCI02._evolucion.FORMULACION[i]['INDI2-FORMU'].trim() != "") {
            var observ = $_HCI02._evolucion.FORMULACION[i]['INDI2-FORMU'];
        } else if ($_HCI02._evolucion.FORMULACION[i]['INDI1-FORMU'].trim() != "" && $_HCI02._evolucion.FORMULACION[i]['INDI2-FORMU'].trim() == "") {
            var observ = $_HCI02._evolucion.FORMULACION[i]['INDI1-FORMU'];
        } else if ($_HCI02._evolucion.FORMULACION[i]['INDI1-FORMU'].trim() == "" && $_HCI02._evolucion.FORMULACION[i]['INDI2-FORMU'].trim() == "") {
            var observ = "";
        } else if ($_HCI02._evolucion.FORMULACION[i]['INDI1-FORMU'].trim() != "" && $_HCI02._evolucion.FORMULACION[i]['INDI2-FORMU'].trim() != "") {
            var observ = $_HCI02._evolucion.FORMULACION[i]['INDI1-FORMU'] + ' - ' + $_HCI02._evolucion.FORMULACION[i]['INDI2-FORMU'];
        }

        var numText = "";
        if (espec_formu.trim() != "") {
            var especi = $_HCI02._especialidades.find(e => e['CODIGO'] == espec_formu);
            if (especi != undefined) {
                descrip_linea16 = especi.CODIGO + especi.NOMBRE;
                datos.medicamentos.obser.push(descrip_linea16);
                cant_formu = $_HCI02._evolucion.FORMULACION[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            } else {
                datos.medicamentos.obser.push(espec_formu);
                cant_formu = $_HCI02._evolucion.FORMULACION[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            }
        } else if (observ.trim() != "") {
            descrip_linea16 = observ;
            datos.medicamentos.obser.push(descrip_linea16);
            cant_formu = $_HCI02._evolucion.FORMULACION[i]['CANT-FORMU'];
            numText = ''
            cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
            datos.medicamentos.num_text.push(numText);
        } else {
            if ($_HCI02._evolucion.FORMULACION[i] != undefined) {
                var indic2_2_formu = $_HCI02._evolucion.FORMULACION[i]['INDIC2_2FORMU'];
                datos.medicamentos.obser.push(indic2_2_formu);
            } else {
                datos.medicamentos.obser.push("");
            }
            cant_formu = $_HCI02._evolucion.FORMULACION[i]['CANT-FORMU'];
            numText = ''
            cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
            datos.medicamentos.num_text.push(numText);
        }

        result_inter = $_HCI02._evolucion.FORMULACION[i]['RESUL_INTERP_EVO'];

        if ((tipo_formu == 2 || tipo_formu == 3) && (result_inter.trim() != "")) {
            console.log(i, "/", datos.medicamentos.tipo_formu);
            datos.interpretacion.bandera = true;

            if (tipo_formu == "2") {
                datos.interpretacion.tipo_formu.push('Laboratorio');
                datos.interpretacion.cod_formu.push(cod_formu);
            } else if (tipo_formu == "3") {
                datos.interpretacion.tipo_formu.push('Imagenologia');
                datos.interpretacion.cod_formu.push(cod_formu);
            }

            var dia_interp_evo = $_HCI02._evolucion.FORMULACION[i].DATOS_FACT_EVO.FECHA_INTERP_EVO.substring(6, 8);
            if (dia_interp_evo > 0) {
                var fecha_interp = $_HCI02._evolucion.FORMULACION[i].DATOS_FACT_EVO.FECHA_INTERP_EVO;
                datos.interpretacion.fecha_inter.push(fecha_interp);
            } else {
                var fecha_lect = $_HCI02._evolucion.FECHA_LECT;
                datos.interpretacion.fecha_inter.push(fecha_lect);
            }
            var result_interp = $_HCI02._evolucion.FORMULACION[i]['RESUL_INTERP_EVO'];
            switch (result_interp) {
                case '1':
                    var interp_w = "NORMAL";
                    break;
                case '2':
                    var interp_w = "ANORMAL";
                    break;
                case '3':
                    var interp_w = "POSITIVO";
                    break;
                case '4':
                    var interp_w = "NEGATIVO";
                    break;
                case '5':
                    var interp_w = "SIN REAL";
                case '6':
                    var interp_w = "PENDIENT";
                    break;
                case '7':
                    var interp_w = "REACTIVO";
                    break;
                case '8':
                    var interp_w = "NO REACT";
                    break;
                default:
                    var interp_w = "";
            }
            datos.interpretacion.interp.push(interp_w);
            var observ_inter = $_HCI02._evolucion.FORMULACION[i]['OBSERV_INTERP1_EVO'] + $_HCI02._evolucion.FORMULACION[i]['OBSERV_INTERP2_EVO'];
            datos.interpretacion.interp_descrip.push(observ_inter);
        } // interpretacion

        var cod_diag_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
        if (cod_diag_1.trim() != '') {
            datos.diagFormula.bandera = true;
            datos.diagFormula.cod_diagn_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
            datos.diagFormula.cod_diagn_2 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[1];
            datos.diagFormula.cod_diagn_3 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[2];
            datos.diagFormula.cod_diagn_4 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[3];
            datos.diagFormula.cod_diagn_5 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[4];
            datos.diagFormula.cod_diagn_6 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[5];
            datos.diagFormula.cod_diagn_7 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[6];
            datos.diagFormula.cod_diagn_8 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[7];
            datos.diagFormula.cod_diagn_9 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[8];
            datos.diagFormula.cod_diagn_10 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[9];

            var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
            switch (embar_w) {
                case '1':
                    datos.diagFormula.embar = "Emb. 1er trim.";
                    break;
                case '2':
                    datos.diagFormula.embar = "Emb. 2er trim.";
                    break;
                case '3':
                    datos.diagFormula.embar = "Emb. 3er trim.";
                    break;
                default:
                    datos.diagFormula.embar = "";
            }
        }
    }
    await codigoBarra();
}

async function leerArchivoFormu(cod_formu, tipo_formu) {
    await postData({ datosh: datosEnvio() + cod_formu + '|' + tipo_formu }, get_url("app/HICLIN/HCI02-1.DLL"))
        .then(data => {
            switch (tipo_formu) {
                case '1':
                    $_HCI02._farmacia = data.FARMACIA;
                    $_HCI02._farmacia.length > 1 ? $_HCI02._farmacia.pop() : false;
                    break;
                case '2':
                    $_HCI02._laboratorio = data.LABORATORIO;
                    $_HCI02._laboratorio.length > 1 ? $_HCI02._laboratorio.pop() : false;
                    break;
                case '3':
                    $_HCI02._imagenologia = data.IMAGENOLOGIA;
                    $_HCI02._imagenologia.length > 1 ? $_HCI02._imagenologia.pop() : false;
                    break;
                case '4':
                    $_HCI02._ordenes_medicas = data.ORDENES_MEDICAS;
                    $_HCI02._ordenes_medicas.length > 1 ? $_HCI02._ordenes_medicas.pop() : false;
                    break;
                case '5':
                    $_HCI02._interconsultas = data.INTERCONSULTAS;
                    $_HCI02._interconsultas.length > 1 ? $_HCI02._interconsultas.pop() : false;
                    break;
                case '6':
                    $_HCI02._incapacidad = data.INCAPACIDAD;
                    $_HCI02._incapacidad.length > 1 ? $_HCI02._incapacidad.pop() : false;
            }
        }).catch(err => {
            console.log(err, 'error')
            // loader('hide')
        })
}

async function imprimirFormulacion_HCI02() {
    for (var i in $_HCI02._evolucion.FORMULACION) {
        $_HCI02._evolucion.FORMULACION[i]['NRO-ORD-FORMU'] < 1 ? $_HCI02._evolucion.FORMULACION[i]['NRO-ORD-FORMU'] = '1' : false;
    }
    await inicializarDatos();

    if ($_HCI02.datosHC705._opciones.opc_for == 'S') {
        var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
        if (atiende_evo == 3 || atiende_evo == 6) {
            datos.encabezado.tipo = "TRANSCRIPCION FORMULACION";
        } else {
            datos.encabezado.tipo = "FORMULACION";
        }
        for (var i = 1; i < 10; i++) {
            await farmacia_HCI02(i);
        }
    }

    if ($_HCI02.datosHC705._opciones.opc_lab == 'S') {
        var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
        if (atiende_evo == 3 || atiende_evo == 6) {
            datos.encabezado.tipo = "TRANSCRIPCION FORMULACION";
        } else {
            datos.encabezado.tipo = "FORMULACION";
        }
        for (var i = 1; i < 10; i++) {
            await laboratorio_HCI02(i);
        }
    }

    if ($_HCI02.datosHC705._opciones.opc_ima == 'S') {
        var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
        if (atiende_evo == 3 || atiende_evo == 6) {
            datos.encabezado.tipo = "TRANSCRIPCION FORMULACION";
        } else {
            datos.encabezado.tipo = "FORMULACION";
        }
        for (var i = 1; i < 10; i++) {
            await imagenologia_HCI02(i);
        }
    }

    if ($_HCI02.datosHC705._opciones.opc_ord == 'S') {
        var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
        if (atiende_evo == 3 || atiende_evo == 6) {
            datos.encabezado.tipo = "TRANSCRIPCION FORMULACION";
        } else {
            datos.encabezado.tipo = "FORMULACION";
        }
        for (var i = 1; i < 10; i++) {
            await ordenes_Medicas_HCI02(i);
        }
    }

    if ($_HCI02.datosHC705._opciones.opc_con == 'S') {
        var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
        if (atiende_evo == 3 || atiende_evo == 6) {
            datos.encabezado.tipo = "TRANSCRIPCION FORMULACION";
        } else {
            datos.encabezado.tipo = "FORMULACION";
        }
        for (var i = 1; i < 10; i++) {
            await interconsultas_HCI02(i);
        }
    }

    if ($_HCI02.datosHC705._opciones.opc_inc == 'S') {
        $_HCI02.banderaIncap != true ? await imprimirIncapacidad_HCI02() : false;
    }
}

async function farmacia_HCI02(j) {
    inicializar_Medicamentos();
    inicializar_interpretacion();
    var arrayFarmacia = $_HCI02._evolucion.FORMULACION.filter(e => e['TIPO-FORMU'] == '1' && e['NRO-ORD-FORMU'] == j);
    for (i in arrayFarmacia) {
        var tipo_formu = arrayFarmacia[i]['TIPO-FORMU'];
        var cod_formu = arrayFarmacia[i]['COD-FORMU'];
        var descripcion = ''
        if (tipo_formu == '1') {
            band = '1';
            datos.codigoBarra.bandera = true;
            datos.medicamentos.bandera = true;
            var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
            var nit_usu = $_USUA_GLOBAL[0].NIT;

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {

            } else if (atiende_evo == 3 || atiende_evo == 6) {
                datos.sub.subtitul = "TRANSCRIPCION FORMULACION:";
            } else {
                datos.sub.subtitul = "FORMULACION DE MEDICAMENTOS:";
            }

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                datos.medicamentos.tipo_formu.push('');
            } else {
                datos.medicamentos.tipo_formu.push('Farmacia');
            }

            if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                datos.medicamentos.cod_soat.push(arrayFarmacia[i]['COD_TARIF']);
            } else {
                datos.medicamentos.cod_soat.push('');
            }

            datos.medicamentos.cod_formu.push(cod_formu.trim());
            descripcion = arrayFarmacia[i]['DESCRIP-FORMU'];
            datos.medicamentos.descrip.push(descripcion.trim());
            datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";

            var cantid = arrayFarmacia[i]['CANT-FORMU'];
            datos.medicamentos.cantidad.push(cantid);

            var dias_trat = arrayFarmacia[i]['DIAS-TRAT'];
            if (tipo_formu == "1") {
                datos.medicamentos.dias_trat.push(dias_trat);
            } else {
                datos.medicamentos.dias_trat.push('');
            }

            manejo_formu = arrayFarmacia[i]['MANEJO_FORMU'] || "";
            switch (manejo_formu) {
                case "1":
                    datos.medicamentos.manejo_formu.push('INT');
                    break;
                case "2":
                    datos.medicamentos.manejo_formu.push('AMB');
                    break;
                default:
                    datos.medicamentos.manejo_formu.push('');
            }

            espec_formu = arrayFarmacia[i].ESPEC_FORMU;
            var cant_formu = "";
            var descrip_linea16 = "";

            if (arrayFarmacia[i]['INDI1-FORMU'].trim() == "" && arrayFarmacia[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayFarmacia[i]['INDI2-FORMU'];
            } else if (arrayFarmacia[i]['INDI1-FORMU'].trim() != "" && arrayFarmacia[i]['INDI2-FORMU'].trim() == "") {
                var observ = arrayFarmacia[i]['INDI1-FORMU'];
            } else if (arrayFarmacia[i]['INDI1-FORMU'].trim() == "" && arrayFarmacia[i]['INDI2-FORMU'].trim() == "") {
                var observ = "";
            } else if (arrayFarmacia[i]['INDI1-FORMU'].trim() != "" && arrayFarmacia[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayFarmacia[i]['INDI1-FORMU'] + '\n' + arrayFarmacia[i]['INDI2-FORMU'];
            }

            var numText = "";
            if (espec_formu.trim() != "") {
                var especi = $_HCI02._especialidades.find(e => e['CODIGO'] == espec_formu);
                if (especi != undefined) {
                    descrip_linea16 = especi.CODIGO + especi.NOMBRE;
                    datos.medicamentos.obser.push(descrip_linea16);
                    cant_formu = arrayFarmacia[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                } else {
                    datos.medicamentos.obser.push(espec_formu);
                    cant_formu = arrayFarmacia[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                }
            } else if (observ.trim() != "") {
                descrip_linea16 = observ;
                datos.medicamentos.obser.push(descrip_linea16);
                cant_formu = arrayFarmacia[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            } else {
                if (arrayFarmacia[i] != undefined) {
                    var indic2_2_formu = arrayFarmacia[i]['INDIC2_2FORMU'];
                    datos.medicamentos.obser.push(indic2_2_formu);
                } else {
                    datos.medicamentos.obser.push("");
                }
                cant_formu = arrayFarmacia[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            }

            result_inter = arrayFarmacia[i]['RESUL_INTERP_EVO'];

            if ((tipo_formu == 2 || tipo_formu == 3 || tipo_formu == 4) && (result_inter.trim() != "")) {
                datos.interpretacion.bandera = true;
                var dia_interp_evo = arrayFarmacia[i].DATOS_FACT_EVO.FECHA_INTERP_EVO.substring(6, 8);
                if (dia_interp_evo > 0) {
                    var fecha_interp = arrayFarmacia[i].DATOS_FACT_EVO.FECHA_INTERP_EVO;
                    datos.interpretacion.fecha_inter.push(fecha_interp);
                } else {
                    var fecha_lect = $_HCI02._evolucion.FECHA_LECT;
                    datos.interpretacion.fecha_inter.push(fecha_lect);
                }
                var result_interp = arrayFarmacia[i]['RESUL_INTERP_EVO'];
                switch (result_interp) {
                    case '1':
                        var interp_w = "NORMAL";
                        break;
                    case '2':
                        var interp_w = "ANORMAL";
                        break;
                    case '3':
                        var interp_w = "POSITIVO";
                        break;
                    case '4':
                        var interp_w = "NEGATIVO";
                        break;
                    case '5':
                        var interp_w = "SIN REAL";
                    case '6':
                        var interp_w = "PENDIENT";
                        break;
                    case '7':
                        var interp_w = "REACTIVO";
                        break;
                    case '8':
                        var interp_w = "NO REACT";
                        break;
                    default:
                        var interp_w = "";
                }
                datos.interpretacion.interp.push(interp_w);
                var observ_inter = arrayFarmacia[i]['OBSERV_INTERP1_EVO'] + arrayFarmacia[i]['OBSERV_INTERP2_EVO'];
                datos.interpretacion.interp_descrip.push(observ_inter);
            } // interpretacion

            var cod_diag_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
            if (cod_diag_1.trim() != '') {
                datos.diagFormula.bandera = true;
                datos.diagFormula.cod_diagn_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
                datos.diagFormula.cod_diagn_2 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[1];
                datos.diagFormula.cod_diagn_3 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[2];
                datos.diagFormula.cod_diagn_4 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[3];
                datos.diagFormula.cod_diagn_5 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[4];
                datos.diagFormula.cod_diagn_6 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[5];
                datos.diagFormula.cod_diagn_7 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[6];
                datos.diagFormula.cod_diagn_8 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[7];
                datos.diagFormula.cod_diagn_9 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[8];
                datos.diagFormula.cod_diagn_10 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[9];

                var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                switch (embar_w) {
                    case '1':
                        datos.diagFormula.embar = "Emb. 1er trim.";
                        break;
                    case '2':
                        datos.diagFormula.embar = "Emb. 2er trim.";
                        break;
                    case '3':
                        datos.diagFormula.embar = "Emb. 3er trim.";
                        break;
                    default:
                        datos.diagFormula.embar = "";
                }
            } else {
                var cod_diaghc_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                if (cod_diaghc_1.trim() != '') {
                    datos.diagFormula.bandera = true;
                    datos.diagFormula.cod_diagn_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                    datos.diagFormula.cod_diagn_2 = $_HCI02._hcprc.rips.tabla_diag[1].diagn;
                    datos.diagFormula.cod_diagn_3 = $_HCI02._hcprc.rips.tabla_diag[2].diagn;
                    datos.diagFormula.cod_diagn_4 = $_HCI02._hcprc.rips.tabla_diag[3].diagn;
                    datos.diagFormula.cod_diagn_5 = $_HCI02._hcprc.rips.tabla_diag[4].diagn;
                    datos.diagFormula.cod_diagn_6 = $_HCI02._hcprc.rips.tabla_diag[5].diagn;
                    datos.diagFormula.cod_diagn_7 = $_HCI02._hcprc.rips.tabla_diag[6].diagn;
                    datos.diagFormula.cod_diagn_8 = $_HCI02._hcprc.rips.tabla_diag[7].diagn;
                    datos.diagFormula.cod_diagn_9 = $_HCI02._hcprc.rips.tabla_diag[8].diagn;
                    datos.diagFormula.cod_diagn_10 = $_HCI02._hcprc.rips.tabla_diag[9].diagn;

                    var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                    switch (embar_w) {
                        case '1':
                            datos.diagFormula.embar = "Emb. 1er trim.";
                            break;
                        case '2':
                            datos.diagFormula.embar = "Emb. 2er trim.";
                            break;
                        case '3':
                            datos.diagFormula.embar = "Emb. 3er trim.";
                            break;
                        default:
                            datos.diagFormula.embar = "";
                    }
                }
            }
        }
    }

    if (arrayFarmacia.length > 0) {
        await llenarEncabezado_HCI02();

        await cerrarImpresion_HCI02();

        await codigoBarra();

        await inicializar_Covid();

        if (band == '1') {
            await llamarImpHCI02();
        }
    }
}

function inicializar_Medicamentos() {
    datos.medicamentos = {
        bandera: null,
        tipo_formu: [],
        cod_soat: [],
        cod_formu: [],
        descrip: [],
        dias_trat: [],
        cantidad: [],
        dias: [],
        manejo_formu: [],
        obser: [],
        num_text: [],
    }
}

function inicializar_interpretacion() {
    datos.interpretacion = {
        bandera: null,
        tipo_formu: [],
        cod_formu: [],
        fecha_inter: [],
        interp: [],
        interp_descrip: [],
    }
}

async function inicializar_Covid() {
    datos.covid = {
        recomendaciones: {
            bandera: null
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
    }
}

async function laboratorio_HCI02(j) {
    inicializar_Medicamentos();
    inicializar_interpretacion();
    var arrayLabor = $_HCI02._evolucion.FORMULACION.filter(e => e['TIPO-FORMU'] == '2' && e['NRO-ORD-FORMU'] == j);

    for (i in arrayLabor) {
        var tipo_formu = arrayLabor[i]['TIPO-FORMU'];
        var cod_formu = arrayLabor[i]['COD-FORMU'];
        var descripcion = ''
        if (tipo_formu == '2') {
            band = '2';
            datos.codigoBarra.bandera = true;
            datos.medicamentos.bandera = true;
            var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
            var nit_usu = $_USUA_GLOBAL[0].NIT;

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {

            } else if (atiende_evo == 3 || atiende_evo == 6) {
                datos.sub.subtitul = "TRANSCRIPCION FORMULACION:";
            } else {
                datos.sub.subtitul = "FORMULACION DE LABORATORIOS:";
            }

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                datos.medicamentos.tipo_formu.push('');
            } else {
                datos.medicamentos.tipo_formu.push('Laboratorio');
            }

            if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                datos.medicamentos.cod_soat.push(arrayLabor[i]['COD_TARIF']);
            } else {
                datos.medicamentos.cod_soat.push('');
            }

            datos.medicamentos.cod_formu.push(cod_formu.trim());
            descripcion = arrayLabor[i]['DESCRIP-FORMU'];
            datos.medicamentos.descrip.push(descripcion.trim());

            if (nit_usu == 892000401) {
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 24 DIAS";
            } else {
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";
            }

            var cantid = arrayLabor[i]['CANT-FORMU'];
            datos.medicamentos.cantidad.push(cantid);

            var dias_trat = arrayLabor[i]['DIAS-TRAT'];
            if (tipo_formu == "1") {
                datos.medicamentos.dias_trat.push(dias_trat);
            } else {
                datos.medicamentos.dias_trat.push('');
            }

            manejo_formu = arrayLabor[i]['MANEJO_FORMU'] || "";
            switch (manejo_formu) {
                case "1":
                    datos.medicamentos.manejo_formu.push('INT');
                    break;
                case "2":
                    datos.medicamentos.manejo_formu.push('AMB');
                    break;
                default:
                    datos.medicamentos.manejo_formu.push('');
            }

            espec_formu = arrayLabor[i].ESPEC_FORMU;
            var cant_formu = "";
            var descrip_linea16 = "";

            if (arrayLabor[i]['INDI1-FORMU'].trim() == "" && arrayLabor[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayLabor[i]['INDI2-FORMU'];
            } else if (arrayLabor[i]['INDI1-FORMU'].trim() != "" && arrayLabor[i]['INDI2-FORMU'].trim() == "") {
                var observ = arrayLabor[i]['INDI1-FORMU'];
            } else if (arrayLabor[i]['INDI1-FORMU'].trim() == "" && arrayLabor[i]['INDI2-FORMU'].trim() == "") {
                var observ = "";
            } else if (arrayLabor[i]['INDI1-FORMU'].trim() != "" && arrayLabor[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayLabor[i]['INDI1-FORMU'] + ' - ' + arrayLabor[i]['INDI2-FORMU'];
            }

            var numText = "";
            if (espec_formu.trim() != "") {
                var especi = $_HCI02._especialidades.find(e => e['CODIGO'] == espec_formu);
                if (especi != undefined) {
                    descrip_linea16 = especi.CODIGO + especi.NOMBRE;
                    datos.medicamentos.obser.push(descrip_linea16);
                    cant_formu = arrayLabor[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                } else {
                    datos.medicamentos.obser.push(espec_formu);
                    cant_formu = arrayLabor[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                }
            } else if (observ.trim() != "") {
                descrip_linea16 = observ;
                datos.medicamentos.obser.push(descrip_linea16);
                cant_formu = arrayLabor[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            } else {
                if (arrayLabor[i] != undefined) {
                    var indic2_2_formu = arrayLabor[i]['INDIC2_2FORMU'];
                    datos.medicamentos.obser.push(indic2_2_formu);
                } else {
                    datos.medicamentos.obser.push("");
                }
                cant_formu = arrayLabor[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            }

            // var posicion = arrayLabor[i]['POSICION_FORMU_J'];
            // var arrayOtrasFormu = $_HCI02._evolucion.OTROS_FORMU_EVO.filter(e => e.DATOS_FACT_EVO.POSICION_OTRFORMU_J == posicion);

            result_inter = arrayLabor[i]['RESUL_INTERP_EVO'];

            if ((tipo_formu == 2) && (result_inter.trim() != "")) {
                datos.interpretacion.bandera = true;
                var dia_interp_evo = arrayLabor[i].DATOS_FACT_EVO.FECHA_INTERP_EVO.substring(6, 8);
                if (dia_interp_evo > 0) {
                    var fecha_interp = arrayLabor[i].DATOS_FACT_EVO.FECHA_INTERP_EVO;
                    datos.interpretacion.fecha_inter.push(fecha_interp);
                } else {
                    var fecha_lect = $_HCI02._evolucion.FECHA_LECT;
                    datos.interpretacion.fecha_inter.push(fecha_lect);
                }
                var result_interp = arrayLabor[i]['RESUL_INTERP_EVO'];
                switch (result_interp) {
                    case '1':
                        var interp_w = "NORMAL";
                        break;
                    case '2':
                        var interp_w = "ANORMAL";
                        break;
                    case '3':
                        var interp_w = "POSITIVO";
                        break;
                    case '4':
                        var interp_w = "NEGATIVO";
                        break;
                    case '5':
                        var interp_w = "SIN REAL";
                    case '6':
                        var interp_w = "PENDIENT";
                        break;
                    case '7':
                        var interp_w = "REACTIVO";
                        break;
                    case '8':
                        var interp_w = "NO REACT";
                        break;
                    default:
                        var interp_w = "";
                }
                datos.interpretacion.interp.push(interp_w);
                var observ_inter = arrayLabor[i]['OBSERV_INTERP1_EVO'] + arrayLabor[i]['OBSERV_INTERP2_EVO'];
                datos.interpretacion.interp_descrip.push(observ_inter);
            } // interpretacion

            var cod_diag_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
            if (cod_diag_1.trim() != '') {
                datos.diagFormula.bandera = true;
                datos.diagFormula.cod_diagn_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
                datos.diagFormula.cod_diagn_2 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[1];
                datos.diagFormula.cod_diagn_3 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[2];
                datos.diagFormula.cod_diagn_4 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[3];
                datos.diagFormula.cod_diagn_5 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[4];
                datos.diagFormula.cod_diagn_6 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[5];
                datos.diagFormula.cod_diagn_7 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[6];
                datos.diagFormula.cod_diagn_8 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[7];
                datos.diagFormula.cod_diagn_9 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[8];
                datos.diagFormula.cod_diagn_10 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[9];

                var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                switch (embar_w) {
                    case '1':
                        datos.diagFormula.embar = "Emb. 1er trim.";
                        break;
                    case '2':
                        datos.diagFormula.embar = "Emb. 2er trim.";
                        break;
                    case '3':
                        datos.diagFormula.embar = "Emb. 3er trim.";
                        break;
                    default:
                        datos.diagFormula.embar = "";
                }
            } else {
                var cod_diaghc_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                if (cod_diaghc_1.trim() != '') {
                    datos.diagFormula.bandera = true;
                    datos.diagFormula.cod_diagn_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                    datos.diagFormula.cod_diagn_2 = $_HCI02._hcprc.rips.tabla_diag[1].diagn;
                    datos.diagFormula.cod_diagn_3 = $_HCI02._hcprc.rips.tabla_diag[2].diagn;
                    datos.diagFormula.cod_diagn_4 = $_HCI02._hcprc.rips.tabla_diag[3].diagn;
                    datos.diagFormula.cod_diagn_5 = $_HCI02._hcprc.rips.tabla_diag[4].diagn;
                    datos.diagFormula.cod_diagn_6 = $_HCI02._hcprc.rips.tabla_diag[5].diagn;
                    datos.diagFormula.cod_diagn_7 = $_HCI02._hcprc.rips.tabla_diag[6].diagn;
                    datos.diagFormula.cod_diagn_8 = $_HCI02._hcprc.rips.tabla_diag[7].diagn;
                    datos.diagFormula.cod_diagn_9 = $_HCI02._hcprc.rips.tabla_diag[8].diagn;
                    datos.diagFormula.cod_diagn_10 = $_HCI02._hcprc.rips.tabla_diag[9].diagn;

                    var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                    switch (embar_w) {
                        case '1':
                            datos.diagFormula.embar = "Emb. 1er trim.";
                            break;
                        case '2':
                            datos.diagFormula.embar = "Emb. 2er trim.";
                            break;
                        case '3':
                            datos.diagFormula.embar = "Emb. 3er trim.";
                            break;
                        default:
                            datos.diagFormula.embar = "";
                    }
                }
            }
        }
    }

    if (arrayLabor.length > 0) {
        await llenarEncabezado_HCI02();

        await cerrarImpresion_HCI02();

        await codigoBarra();

        await inicializar_Covid();

        if (band == '2') {
            await llamarImpHCI02();
        }
    }
}

async function imagenologia_HCI02(j) {
    inicializar_Medicamentos();
    inicializar_interpretacion();
    var arrayImag = $_HCI02._evolucion.FORMULACION.filter(e => e['TIPO-FORMU'] == '3' && e['NRO-ORD-FORMU'] == j);

    for (i in arrayImag) {
        var tipo_formu = arrayImag[i]['TIPO-FORMU'];
        var cod_formu = arrayImag[i]['COD-FORMU'];
        var descripcion = ''
        if (tipo_formu == '3') {
            band = '3';
            datos.codigoBarra.bandera = true;
            datos.medicamentos.bandera = true;
            var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
            var nit_usu = $_USUA_GLOBAL[0].NIT;

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {

            } else if (atiende_evo == 3 || atiende_evo == 6) {
                datos.sub.subtitul = "TRANSCRIPCION FORMULACION:";
            } else {
                datos.sub.subtitul = "FORMULACION DE IMAGENOLOGIA:";
            }

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                datos.medicamentos.tipo_formu.push('');
            } else {
                datos.medicamentos.tipo_formu.push('Imagenologia');
            }

            if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                datos.medicamentos.cod_soat.push(arrayImag[i]['COD_TARIF']);
            } else {
                datos.medicamentos.cod_soat.push('');
            }

            datos.medicamentos.cod_formu.push(cod_formu.trim());
            descripcion = arrayImag[i]['DESCRIP-FORMU'];
            datos.medicamentos.descrip.push(descripcion.trim());
            if (nit_usu == 892000401) {
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 24 DIAS";
            } else {
                datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";
            }

            var cantid = arrayImag[i]['CANT-FORMU'];
            datos.medicamentos.cantidad.push(cantid);

            var dias_trat = arrayImag[i]['DIAS-TRAT'];
            if (tipo_formu == "1") {
                datos.medicamentos.dias_trat.push(dias_trat);
            } else {
                datos.medicamentos.dias_trat.push('');
            }

            manejo_formu = arrayImag[i]['MANEJO_FORMU'] || "";
            switch (manejo_formu) {
                case "1":
                    datos.medicamentos.manejo_formu.push('INT');
                    break;
                case "2":
                    datos.medicamentos.manejo_formu.push('AMB');
                    break;
                default:
                    datos.medicamentos.manejo_formu.push('');
            }

            espec_formu = arrayImag[i].ESPEC_FORMU;
            var cant_formu = "";
            var descrip_linea16 = "";

            if (arrayImag[i]['INDI1-FORMU'].trim() == "" && arrayImag[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayImag[i]['INDI2-FORMU'];
            } else if (arrayImag[i]['INDI1-FORMU'].trim() != "" && arrayImag[i]['INDI2-FORMU'].trim() == "") {
                var observ = arrayImag[i]['INDI1-FORMU'];
            } else if (arrayImag[i]['INDI1-FORMU'].trim() == "" && arrayImag[i]['INDI2-FORMU'].trim() == "") {
                var observ = "";
            } else if (arrayImag[i]['INDI1-FORMU'].trim() != "" && arrayImag[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayImag[i]['INDI1-FORMU'] + ' - ' + arrayImag[i]['INDI2-FORMU'];
            }

            var numText = "";
            if (espec_formu.trim() != "") {
                var especi = $_HCI02._especialidades.find(e => e['CODIGO'] == espec_formu);
                if (especi != undefined) {
                    descrip_linea16 = especi.CODIGO + especi.NOMBRE;
                    datos.medicamentos.obser.push(descrip_linea16);
                    cant_formu = arrayImag[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                } else {
                    datos.medicamentos.obser.push(espec_formu);
                    cant_formu = arrayImag[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                }
            } else if (observ.trim() != "") {
                descrip_linea16 = observ;
                datos.medicamentos.obser.push(descrip_linea16);
                cant_formu = arrayImag[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            } else {
                if (arrayImag[i] != undefined) {
                    var indic2_2_formu = arrayImag[i]['INDIC2_2FORMU'];
                    datos.medicamentos.obser.push(indic2_2_formu);
                } else {
                    datos.medicamentos.obser.push("");
                }
                cant_formu = arrayImag[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            }

            // var posicion = arrayImag[i]['POSICION_FORMU_J'];
            // var arrayOtrasFormu = $_HCI02._evolucion.OTROS_FORMU_EVO.filter(e => e.DATOS_FACT_EVO.POSICION_OTRFORMU_J == posicion);

            result_inter = arrayImag[i]['RESUL_INTERP_EVO'];

            if ((tipo_formu == 3) && (result_inter.trim() != "")) {
                datos.interpretacion.bandera = true;
                var dia_interp_evo = arrayImag[i].DATOS_FACT_EVO.FECHA_INTERP_EVO.substring(6, 8);
                if (dia_interp_evo > 0) {
                    var fecha_interp = arrayImag[i].DATOS_FACT_EVO.FECHA_INTERP_EVO;
                    datos.interpretacion.fecha_inter.push(fecha_interp);
                } else {
                    var fecha_lect = $_HCI02._evolucion.FECHA_LECT;
                    datos.interpretacion.fecha_inter.push(fecha_lect);
                }
                var result_interp = arrayImag[i]['RESUL_INTERP_EVO'];
                switch (result_interp) {
                    case '1':
                        var interp_w = "NORMAL";
                        break;
                    case '2':
                        var interp_w = "ANORMAL";
                        break;
                    case '3':
                        var interp_w = "POSITIVO";
                        break;
                    case '4':
                        var interp_w = "NEGATIVO";
                        break;
                    case '5':
                        var interp_w = "SIN REAL";
                    case '6':
                        var interp_w = "PENDIENT";
                        break;
                    case '7':
                        var interp_w = "REACTIVO";
                        break;
                    case '8':
                        var interp_w = "NO REACT";
                        break;
                    default:
                        var interp_w = "";
                }
                datos.interpretacion.interp.push(interp_w);
                var observ_inter = arrayImag[i]['OBSERV_INTERP1_EVO'] + arrayImag[i]['OBSERV_INTERP2_EVO'];
                datos.interpretacion.interp_descrip.push(observ_inter);
            } // interpretacion

            var cod_diag_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
            if (cod_diag_1.trim() != '') {
                datos.diagFormula.bandera = true;
                datos.diagFormula.cod_diagn_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
                datos.diagFormula.cod_diagn_2 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[1];
                datos.diagFormula.cod_diagn_3 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[2];
                datos.diagFormula.cod_diagn_4 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[3];
                datos.diagFormula.cod_diagn_5 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[4];
                datos.diagFormula.cod_diagn_6 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[5];
                datos.diagFormula.cod_diagn_7 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[6];
                datos.diagFormula.cod_diagn_8 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[7];
                datos.diagFormula.cod_diagn_9 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[8];
                datos.diagFormula.cod_diagn_10 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[9];

                var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                switch (embar_w) {
                    case '1':
                        datos.diagFormula.embar = "Emb. 1er trim.";
                        break;
                    case '2':
                        datos.diagFormula.embar = "Emb. 2er trim.";
                        break;
                    case '3':
                        datos.diagFormula.embar = "Emb. 3er trim.";
                        break;
                    default:
                        datos.diagFormula.embar = "";
                }
            } else {
                var cod_diaghc_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                if (cod_diaghc_1.trim() != '') {
                    datos.diagFormula.bandera = true;
                    datos.diagFormula.cod_diagn_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                    datos.diagFormula.cod_diagn_2 = $_HCI02._hcprc.rips.tabla_diag[1].diagn;
                    datos.diagFormula.cod_diagn_3 = $_HCI02._hcprc.rips.tabla_diag[2].diagn;
                    datos.diagFormula.cod_diagn_4 = $_HCI02._hcprc.rips.tabla_diag[3].diagn;
                    datos.diagFormula.cod_diagn_5 = $_HCI02._hcprc.rips.tabla_diag[4].diagn;
                    datos.diagFormula.cod_diagn_6 = $_HCI02._hcprc.rips.tabla_diag[5].diagn;
                    datos.diagFormula.cod_diagn_7 = $_HCI02._hcprc.rips.tabla_diag[6].diagn;
                    datos.diagFormula.cod_diagn_8 = $_HCI02._hcprc.rips.tabla_diag[7].diagn;
                    datos.diagFormula.cod_diagn_9 = $_HCI02._hcprc.rips.tabla_diag[8].diagn;
                    datos.diagFormula.cod_diagn_10 = $_HCI02._hcprc.rips.tabla_diag[9].diagn;

                    var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                    switch (embar_w) {
                        case '1':
                            datos.diagFormula.embar = "Emb. 1er trim.";
                            break;
                        case '2':
                            datos.diagFormula.embar = "Emb. 2er trim.";
                            break;
                        case '3':
                            datos.diagFormula.embar = "Emb. 3er trim.";
                            break;
                        default:
                            datos.diagFormula.embar = "";
                    }
                }
            }
        }
    }
    if (arrayImag.length > 0) {
        await llenarEncabezado_HCI02();

        await cerrarImpresion_HCI02();

        await codigoBarra();

        await inicializar_Covid();

        if (band == '3') {
            await llamarImpHCI02();
        }
    }
}

async function ordenes_Medicas_HCI02(j) {
    inicializar_Medicamentos();
    inicializar_interpretacion();
    var arrayOrd = $_HCI02._evolucion.FORMULACION.filter(e => e['TIPO-FORMU'] == '4' && e['NRO-ORD-FORMU'] == j);
    for (i in arrayOrd) {
        var tipo_formu = arrayOrd[i]['TIPO-FORMU'];
        var cod_formu = arrayOrd[i]['COD-FORMU'];
        var descripcion = ''
        if (tipo_formu == '4') {
            band = '4';
            datos.codigoBarra.bandera = true;
            datos.medicamentos.bandera = true;
            var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
            var nit_usu = $_USUA_GLOBAL[0].NIT;

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {

            } else if (atiende_evo == 3 || atiende_evo == 6) {
                datos.sub.subtitul = "TRANSCRIPCION FORMULACION:";
            } else {
                datos.sub.subtitul = "FORMULACION DE ORDENES MEDICAS:";
            }

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                datos.medicamentos.tipo_formu.push('');
            } else {
                datos.medicamentos.tipo_formu.push('Ordenes Medicas');
            }

            if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                datos.medicamentos.cod_soat.push(arrayOrd[i]['COD_TARIF']);
            } else {
                datos.medicamentos.cod_soat.push('');
            }

            datos.medicamentos.cod_formu.push(cod_formu.trim());
            descripcion = arrayOrd[i]['DESCRIP-FORMU'];
            datos.medicamentos.descrip.push(descripcion.trim());
            datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";

            var cantid = arrayOrd[i]['CANT-FORMU'];
            datos.medicamentos.cantidad.push(cantid);

            var dias_trat = arrayOrd[i]['DIAS-TRAT'];
            if (tipo_formu == "1") {
                datos.medicamentos.dias_trat.push(dias_trat);
            } else {
                datos.medicamentos.dias_trat.push('');
            }

            manejo_formu = arrayOrd[i]['MANEJO_FORMU'] || "";
            switch (manejo_formu) {
                case "1":
                    datos.medicamentos.manejo_formu.push('INT');
                    break;
                case "2":
                    datos.medicamentos.manejo_formu.push('AMB');
                    break;
                default:
                    datos.medicamentos.manejo_formu.push('');
            }

            espec_formu = arrayOrd[i].ESPEC_FORMU;
            var cant_formu = "";
            var descrip_linea16 = "";

            if (arrayOrd[i]['INDI1-FORMU'].trim() == "" && arrayOrd[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayOrd[i]['INDI2-FORMU'];
            } else if (arrayOrd[i]['INDI1-FORMU'].trim() != "" && arrayOrd[i]['INDI2-FORMU'].trim() == "") {
                var observ = arrayOrd[i]['INDI1-FORMU'];
            } else if (arrayOrd[i]['INDI1-FORMU'].trim() == "" && arrayOrd[i]['INDI2-FORMU'].trim() == "") {
                var observ = "";
            } else if (arrayOrd[i]['INDI1-FORMU'].trim() != "" && arrayOrd[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayOrd[i]['INDI1-FORMU'] + ' - ' + arrayOrd[i]['INDI2-FORMU'];
            }

            var numText = "";
            if (espec_formu.trim() != "") {
                var especi = $_HCI02._especialidades.find(e => e['CODIGO'] == espec_formu);
                if (especi != undefined) {
                    descrip_linea16 = especi.CODIGO + especi.NOMBRE;
                    datos.medicamentos.obser.push(descrip_linea16);
                    cant_formu = arrayOrd[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                } else {
                    datos.medicamentos.obser.push(espec_formu);
                    cant_formu = arrayOrd[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                }
            } else if (observ.trim() != "") {
                descrip_linea16 = observ;
                datos.medicamentos.obser.push(descrip_linea16);
                cant_formu = arrayOrd[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            } else {
                if (arrayOrd[i] != undefined) {
                    var indic2_2_formu = arrayOrd[i]['INDIC2_2FORMU'];
                    datos.medicamentos.obser.push(indic2_2_formu);
                } else {
                    datos.medicamentos.obser.push("");
                }
                cant_formu = arrayOrd[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            }

            // var posicion = arrayOrd[i]['POSICION_FORMU_J'];
            // var arrayOtrasFormu = $_HCI02._evolucion.OTROS_FORMU_EVO.filter(e => e.DATOS_FACT_EVO.POSICION_OTRFORMU_J == posicion);

            result_inter = arrayOrd[i]['RESUL_INTERP_EVO'];

            if ((tipo_formu == 4) && (result_inter.trim() != "")) {
                datos.interpretacion.bandera = true;
                var dia_interp_evo = arrayOrd[i].DATOS_FACT_EVO.FECHA_INTERP_EVO.substring(6, 8);
                if (dia_interp_evo > 0) {
                    var fecha_interp = arrayOrd[i].DATOS_FACT_EVO.FECHA_INTERP_EVO;
                    datos.interpretacion.fecha_inter.push(fecha_interp);
                } else {
                    var fecha_lect = $_HCI02._evolucion.FECHA_LECT;
                    datos.interpretacion.fecha_inter.push(fecha_lect);
                }
                var result_interp = arrayOrd[i]['RESUL_INTERP_EVO'];
                switch (result_interp) {
                    case '1':
                        var interp_w = "NORMAL";
                        break;
                    case '2':
                        var interp_w = "ANORMAL";
                        break;
                    case '3':
                        var interp_w = "POSITIVO";
                        break;
                    case '4':
                        var interp_w = "NEGATIVO";
                        break;
                    case '5':
                        var interp_w = "SIN REAL";
                    case '6':
                        var interp_w = "PENDIENT";
                        break;
                    case '7':
                        var interp_w = "REACTIVO";
                        break;
                    case '8':
                        var interp_w = "NO REACT";
                        break;
                    default:
                        var interp_w = "";
                }
                datos.interpretacion.interp.push(interp_w);
                var observ_inter = arrayOrd[i]['OBSERV_INTERP1_EVO'] + arrayOrd[i]['OBSERV_INTERP2_EVO'];
                datos.interpretacion.interp_descrip.push(observ_inter);
            } // interpretacion

            var cod_diag_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
            if (cod_diag_1.trim() != '') {
                datos.diagFormula.bandera = true;
                datos.diagFormula.cod_diagn_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
                datos.diagFormula.cod_diagn_2 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[1];
                datos.diagFormula.cod_diagn_3 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[2];
                datos.diagFormula.cod_diagn_4 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[3];
                datos.diagFormula.cod_diagn_5 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[4];
                datos.diagFormula.cod_diagn_6 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[5];
                datos.diagFormula.cod_diagn_7 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[6];
                datos.diagFormula.cod_diagn_8 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[7];
                datos.diagFormula.cod_diagn_9 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[8];
                datos.diagFormula.cod_diagn_10 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[9];

                var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                switch (embar_w) {
                    case '1':
                        datos.diagFormula.embar = "Emb. 1er trim.";
                        break;
                    case '2':
                        datos.diagFormula.embar = "Emb. 2er trim.";
                        break;
                    case '3':
                        datos.diagFormula.embar = "Emb. 3er trim.";
                        break;
                    default:
                        datos.diagFormula.embar = "";
                }
            } else {
                var cod_diaghc_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                if (cod_diaghc_1.trim() != '') {
                    datos.diagFormula.bandera = true;
                    datos.diagFormula.cod_diagn_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                    datos.diagFormula.cod_diagn_2 = $_HCI02._hcprc.rips.tabla_diag[1].diagn;
                    datos.diagFormula.cod_diagn_3 = $_HCI02._hcprc.rips.tabla_diag[2].diagn;
                    datos.diagFormula.cod_diagn_4 = $_HCI02._hcprc.rips.tabla_diag[3].diagn;
                    datos.diagFormula.cod_diagn_5 = $_HCI02._hcprc.rips.tabla_diag[4].diagn;
                    datos.diagFormula.cod_diagn_6 = $_HCI02._hcprc.rips.tabla_diag[5].diagn;
                    datos.diagFormula.cod_diagn_7 = $_HCI02._hcprc.rips.tabla_diag[6].diagn;
                    datos.diagFormula.cod_diagn_8 = $_HCI02._hcprc.rips.tabla_diag[7].diagn;
                    datos.diagFormula.cod_diagn_9 = $_HCI02._hcprc.rips.tabla_diag[8].diagn;
                    datos.diagFormula.cod_diagn_10 = $_HCI02._hcprc.rips.tabla_diag[9].diagn;

                    var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                    switch (embar_w) {
                        case '1':
                            datos.diagFormula.embar = "Emb. 1er trim.";
                            break;
                        case '2':
                            datos.diagFormula.embar = "Emb. 2er trim.";
                            break;
                        case '3':
                            datos.diagFormula.embar = "Emb. 3er trim.";
                            break;
                        default:
                            datos.diagFormula.embar = "";
                    }
                }
            }
        }
    }
    if (arrayOrd.length > 0) {
        await llenarEncabezado_HCI02();

        await cerrarImpresion_HCI02();

        await codigoBarra();

        await inicializar_Covid();

        if (band == '4') {
            await llamarImpHCI02();
        }
    }
}

async function interconsultas_HCI02(j) {
    inicializar_Medicamentos();
    inicializar_interpretacion();
    var arrayInter = $_HCI02._evolucion.FORMULACION.filter(e => e['TIPO-FORMU'] == '5' && e['NRO-ORD-FORMU'] == j);
    for (i in arrayInter) {
        var tipo_formu = arrayInter[i]['TIPO-FORMU'];
        var cod_formu = arrayInter[i]['COD-FORMU'];
        var descripcion = ''
        if (tipo_formu == '5') {
            band = '5';
            datos.codigoBarra.bandera = true;
            datos.medicamentos.bandera = true;
            var atiende_evo = parseInt($_HCI02._evolucion.RIPS.ATIENDE);
            var nit_usu = $_USUA_GLOBAL[0].NIT;

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {

            } else if (atiende_evo == 3 || atiende_evo == 6) {
                datos.sub.subtitul = "TRANSCRIPCION FORMULACION:";
            } else {
                datos.sub.subtitul = "FORMULACION DE INTERCONSULTAS:";
            }

            if (nit_usu == 800175901 || nit_usu == 19381427 || nit_usu == 17306492 || nit_usu == 31841010) {
                datos.medicamentos.tipo_formu.push('');
            } else {
                datos.medicamentos.tipo_formu.push('Interconsultas');
            }

            if ($_HCI02._hcprc.cierre.prefijo == 'T') {
                datos.medicamentos.cod_soat.push(arrayInter[i]['COD_TARIF']);
            } else {
                datos.medicamentos.cod_soat.push('');
            }

            datos.medicamentos.cod_formu.push(cod_formu.trim());
            descripcion = arrayInter[i]['DESCRIP-FORMU'];
            datos.medicamentos.descrip.push(descripcion.trim());
            datos.mensaje.mensaje1 = "FORMULA VALIDA POR 30 DIAS";

            var cantid = arrayInter[i]['CANT-FORMU'];
            datos.medicamentos.cantidad.push(cantid);

            var dias_trat = arrayInter[i]['DIAS-TRAT'];
            if (tipo_formu == "1") {
                datos.medicamentos.dias_trat.push(dias_trat);
            } else {
                datos.medicamentos.dias_trat.push('');
            }

            manejo_formu = arrayInter[i]['MANEJO_FORMU'] || "";
            switch (manejo_formu) {
                case "1":
                    datos.medicamentos.manejo_formu.push('INT');
                    break;
                case "2":
                    datos.medicamentos.manejo_formu.push('AMB');
                    break;
                default:
                    datos.medicamentos.manejo_formu.push('');
            }

            espec_formu = arrayInter[i].ESPEC_FORMU;
            var cant_formu = "";
            var descrip_linea16 = "";

            if (arrayInter[i]['INDI1-FORMU'].trim() == "" && arrayInter[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayInter[i]['INDI2-FORMU'];
            } else if (arrayInter[i]['INDI1-FORMU'].trim() != "" && arrayInter[i]['INDI2-FORMU'].trim() == "") {
                var observ = arrayInter[i]['INDI1-FORMU'];
            } else if (arrayInter[i]['INDI1-FORMU'].trim() == "" && arrayInter[i]['INDI2-FORMU'].trim() == "") {
                var observ = "";
            } else if (arrayInter[i]['INDI1-FORMU'].trim() != "" && arrayInter[i]['INDI2-FORMU'].trim() != "") {
                var observ = arrayInter[i]['INDI1-FORMU'] + ' - ' + arrayInter[i]['INDI2-FORMU'];
            }

            var numText = "";
            if (espec_formu.trim() != "") {
                var especi = $_HCI02._especialidades.find(e => e['CODIGO'] == espec_formu);
                if (especi != undefined) {
                    descrip_linea16 = especi.CODIGO + especi.NOMBRE;
                    datos.medicamentos.obser.push(descrip_linea16);
                    cant_formu = arrayInter[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                } else {
                    datos.medicamentos.obser.push(espec_formu);
                    cant_formu = arrayInter[i]['CANT-FORMU'];
                    numText = ''
                    cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                    datos.medicamentos.num_text.push(numText);
                }
            } else if (observ.trim() != "") {
                descrip_linea16 = observ;
                datos.medicamentos.obser.push(descrip_linea16);
                cant_formu = arrayInter[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            } else {
                if (arrayInter[i] != undefined) {
                    var indic2_2_formu = arrayInter[i]['INDIC2_2FORMU'];
                    datos.medicamentos.obser.push(indic2_2_formu);
                } else {
                    datos.medicamentos.obser.push("");
                }
                cant_formu = arrayInter[i]['CANT-FORMU'];
                numText = ''
                cant_formu.trim() != '' ? numText = FAC146(cant_formu, false, $_HCI02.currency).trim() : false;
                datos.medicamentos.num_text.push(numText);
            }

            result_inter = arrayInter[i]['RESUL_INTERP_EVO'];

            if ((tipo_formu == 2 || tipo_formu == 3 || tipo_formu == 4) && (result_inter.trim() != "")) {
                datos.interpretacion.bandera = true;
                var dia_interp_evo = arrayInter[i].DATOS_FACT_EVO.FECHA_INTERP_EVO.substring(6, 8);
                if (dia_interp_evo > 0) {
                    var fecha_interp = arrayInter[i].DATOS_FACT_EVO.FECHA_INTERP_EVO;
                    datos.interpretacion.fecha_inter.push(fecha_interp);
                } else {
                    var fecha_lect = $_HCI02._evolucion.FECHA_LECT;
                    datos.interpretacion.fecha_inter.push(fecha_lect);
                }
                var result_interp = arrayInter[i]['RESUL_INTERP_EVO'];
                switch (result_interp) {
                    case '1':
                        var interp_w = "NORMAL";
                        break;
                    case '2':
                        var interp_w = "ANORMAL";
                        break;
                    case '3':
                        var interp_w = "POSITIVO";
                        break;
                    case '4':
                        var interp_w = "NEGATIVO";
                        break;
                    case '5':
                        var interp_w = "SIN REAL";
                    case '6':
                        var interp_w = "PENDIENT";
                        break;
                    case '7':
                        var interp_w = "REACTIVO";
                        break;
                    case '8':
                        var interp_w = "NO REACT";
                        break;
                    default:
                        var interp_w = "";
                }
                datos.interpretacion.interp.push(interp_w);
                var observ_inter = arrayInter[i]['OBSERV_INTERP1_EVO'] + arrayInter[i]['OBSERV_INTERP2_EVO'];
                datos.interpretacion.interp_descrip.push(observ_inter);
            } // interpretacion

            var cod_diag_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
            if (cod_diag_1.trim() != '') {
                datos.diagFormula.bandera = true;
                datos.diagFormula.cod_diagn_1 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[0];
                datos.diagFormula.cod_diagn_2 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[1];
                datos.diagFormula.cod_diagn_3 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[2];
                datos.diagFormula.cod_diagn_4 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[3];
                datos.diagFormula.cod_diagn_5 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[4];
                datos.diagFormula.cod_diagn_6 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[5];
                datos.diagFormula.cod_diagn_7 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[6];
                datos.diagFormula.cod_diagn_8 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[7];
                datos.diagFormula.cod_diagn_9 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[8];
                datos.diagFormula.cod_diagn_10 = $_HCI02._evolucion.TABLA_DIAGNOSTICOS[9];

                var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                switch (embar_w) {
                    case '1':
                        datos.diagFormula.embar = "Emb. 1er trim.";
                        break;
                    case '2':
                        datos.diagFormula.embar = "Emb. 2er trim.";
                        break;
                    case '3':
                        datos.diagFormula.embar = "Emb. 3er trim.";
                        break;
                    default:
                        datos.diagFormula.embar = "";
                }
            } else {
                var cod_diaghc_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                if (cod_diaghc_1.trim() != '') {
                    datos.diagFormula.bandera = true;
                    datos.diagFormula.cod_diagn_1 = $_HCI02._hcprc.rips.tabla_diag[0].diagn;
                    datos.diagFormula.cod_diagn_2 = $_HCI02._hcprc.rips.tabla_diag[1].diagn;
                    datos.diagFormula.cod_diagn_3 = $_HCI02._hcprc.rips.tabla_diag[2].diagn;
                    datos.diagFormula.cod_diagn_4 = $_HCI02._hcprc.rips.tabla_diag[3].diagn;
                    datos.diagFormula.cod_diagn_5 = $_HCI02._hcprc.rips.tabla_diag[4].diagn;
                    datos.diagFormula.cod_diagn_6 = $_HCI02._hcprc.rips.tabla_diag[5].diagn;
                    datos.diagFormula.cod_diagn_7 = $_HCI02._hcprc.rips.tabla_diag[6].diagn;
                    datos.diagFormula.cod_diagn_8 = $_HCI02._hcprc.rips.tabla_diag[7].diagn;
                    datos.diagFormula.cod_diagn_9 = $_HCI02._hcprc.rips.tabla_diag[8].diagn;
                    datos.diagFormula.cod_diagn_10 = $_HCI02._hcprc.rips.tabla_diag[9].diagn;

                    var embar_w = $_HCI02._evolucion.RIPS.EMBAR;
                    switch (embar_w) {
                        case '1':
                            datos.diagFormula.embar = "Emb. 1er trim.";
                            break;
                        case '2':
                            datos.diagFormula.embar = "Emb. 2er trim.";
                            break;
                        case '3':
                            datos.diagFormula.embar = "Emb. 3er trim.";
                            break;
                        default:
                            datos.diagFormula.embar = "";
                    }
                }
            }
        }
    }
    if (arrayInter.length > 0) {
        await llenarEncabezado_HCI02();

        await cerrarImpresion_HCI02();

        await codigoBarra();

        await inicializar_Covid();

        if (band == '5') {
            await llamarImpHCI02();
        }
    }
}

async function codigoBarra() {
    if ($_HCI02.datosHC705._opciones.opc_for == 'S' ||
        $_HCI02.datosHC705._opciones.opc_ord == 'S' ||
        $_HCI02.datosHC705._opciones.opc_lab == 'S' ||
        $_HCI02.datosHC705._opciones.opc_ima == 'S' ||
        $_HCI02.datosHC705._opciones.opc_con == 'S') {

        var fecha_w = $_HCI02.datosHC705.fecha.substring(2);
        var hora_w = $_HCI02.datosHC705.hora + (parseInt($_HCI02.datosHC705.hora.slice(0, 2)) + parseInt($_HCI02.datosHC705.hora.slice(2)));
        // var hora_w = moment().format('HHmmss');

        var pag_w = '1';
        var id_paci_w = $_HCI02.datosHC705.id.substring(12);
        var consec_barra_w = fecha_w + hora_w + pag_w + id_paci_w;
    } else {
        var consec_barra_w = '000000'
    }
    datos.codigoBarra.consec_barras = consec_barra_w;
    await grabarDispensacion_HCI02();

    datos.mensaje.bandera = true;
}

async function grabarDispensacion_HCI02() {
    var llave = $_HCI02._evolucion.LLAVE_EVO;
    consec_barra = datos.codigoBarra.consec_barras;
    await postData({ datosh: datosEnvio() + llave + '|' + consec_barra + '|' }, get_url("app/HICLIN/HCI02-3.DLL"))
        .then(data => {
            console.log(data)
            console.log('Dispensacion guardada', data)
        }).catch(err => {
            toastr.error("Error en guardado", err);
            console.log(err, 'error')
        })

}

async function leerTablaEvo_HCI02() {
    if ($_HCI02.datosHC705.opcion != 'masiva') {
        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + $_HCI02.datosHC705.fecha + '|' + $_HCI02.datosHC705.hora + '|' + $_HCI02.datosHC705.oper + '|' + '1' + '|CONS|' }, get_url("app/HICLIN/HCDETA_EVO.DLL"))
            .then(data => {
                $_HCI02.tabla_evo = data.DETALLE_EVO[0].CONTENIDO;
                $_HCI02.tabla_evo == undefined ? $_HCI02.tabla_evo = '' : false;
            }).catch(err => {
                $_HCI02.tabla_evo == undefined ? $_HCI02.tabla_evo = '' : false;
                console.log(err, 'error')
                // loader('hide')
            })

        return new Promise(resolve => {
            resolve()
        })
    } else {
        $_HCI02.tabla_evo = $_HCI02._evolucion.TABLA_EVO;
    }
}

async function leerAnalisisEvo_HCI02() {
    if ($_HCI02.datosHC705.opcion != 'masiva') {
        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + $_HCI02.datosHC705.fecha + '|' + $_HCI02.datosHC705.hora + '|' + $_HCI02.datosHC705.oper + '|' + '2' + '|CONS|' }, get_url("app/HICLIN/HCDETA_EVO.DLL"))
            .then(data => {
                $_HCI02.analisis_evo = data.DETALLE_EVO[0].CONTENIDO;
                $_HCI02.analisis_evo = $_HCI02.analisis_evo.replace(/\&/g, "\n").trim()
                $_HCI02.analisis_evo == undefined ? $_HCI02.analisis_evo = '' : false;
            }).catch(err => {
                $_HCI02.analisis_evo == undefined ? $_HCI02.analisis_evo = '' : false;
                console.log(err, 'error')
                // loader('hide')
            })

        return new Promise(resolve => {
            resolve()
        })
    } else {
        $_HCI02.analisis_evo = $_HCI02._evolucion.ANALISIS_EVO.replace(/\&/g, "\n");
    }
}

async function leerPlanEvo_HCI02() {
    if ($_HCI02.datosHC705.opcion != 'masiva') {
        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + $_HCI02.datosHC705.fecha + '|' + $_HCI02.datosHC705.hora + '|' + $_HCI02.datosHC705.oper + '|' + '6' + '|CONS|' }, get_url("app/HICLIN/HCDETA_EVO.DLL"))
            .then(data => {
                $_HCI02.plan_evo = data.DETALLE_EVO[0].CONTENIDO;
                $_HCI02.plan_evo = $_HCI02.plan_evo.replace(/\&/g, "\n").trim()
                $_HCI02.plan_evo == undefined ? $_HCI02.plan_evo = '' : false;
            }).catch(err => {
                $_HCI02.plan_evo == undefined ? $_HCI02.plan_evo = '' : false;
                console.log(err, 'error')
            })

        return new Promise(resolve => {
            resolve()
        })
    } else {
        $_HCI02.plan_evo = $_HCI02._evolucion.PLAN_EVO.replace(/\&/g, "\n");
    }
}

async function llamarImpHCI02() {
    if (!$_HCI02.datosHC705.resumido) inicializarFormatoBase_impHc();

    await _imprimirHCI02(datos, $_HCI02.datosHC705.resumido, $_HCI02.datosHC705._opciones.opc_aper, $_HCI02.hide_firma);

    if (!$_HCI02.datosHC705.resumido) {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
            content: formatoBaseImp_Hc,
        }).catch((err) => {
            console.error(err);
        });
    }
}

async function _cargarArc_HCI02(json) {
    if (json._hcpac != undefined) {
        $_HCI02._hcprc = json._hcpac
    } else {
        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
            .then(data => {
                $_HCI02._hcprc = data.HCPAC;
            }).catch(err => {
                console.log(err, 'error')
                _regresar_menuhis();
            })
    }

    $_HCI02._especialidades = json._especialidades;
    $_HCI02._ciudades = json._ciudades;
    $_HCI02._paisesRips = json._paisesRips;

    return new Promise(resolve => {
        resolve('carga ultimo')
    })
}

async function inicializarDatos() {
    datos = {
        encabezado: {
            nombre: '',
            nit: '',
            tipo: '',
            unid_serv: '',
            ambulatorio: '',
            imprime: '',
            triage: '',
            folio: ''
        },

        paciente: {
            fecha: '',
            hora: '',
            fact: '',
            hab_hc: '',
            nombre: '',
            regimen: '',
            tipoId: '',
            id: '',
            gruposangre: '',
            rhpacie: '',
            edad: '',
            fecha_naci: '',
            sexo: '',
            est_civil: '',
            direccion: '',
            ciudad: '',
            entidad: '',
            ocupacion: '',
            tel: '',
            tipo_afiliacion: '',
            acompañante: '',
            nacim: '',
        },

        tabla: {
            subtitulo: ''
        },

        sub: {
            subtitul: ''
        },

        subtitulos: {
            titulo: [],
            contenido: []
        },

        perinatal: {
            titulo: [],
            contenido: []
        },

        creatinina: {
            titulos: [],
            contenido: []
        },

        cups: {
            titulo: [],
            contenido: []
        },

        analisis: {
            titulo: '',
            contenido: ''
        },

        plan: {
            titulo: '',
            contenido: ''
        },

        tipoDiag: {
            titulo: '',
            contenido: ''
        },

        diagnosticos: {
            titulos: 'DIAGNOSTICO:  ',
            contenido: []
        },

        rips: {
            titulo: [],
            contenido: []
        },

        fechas: {
            bandera: null,
            año_muestra: '',
            mes_muestra: '',
            dia_muestra: '',
            año_lect: '',
            mes_lect: '',
            dia_lect: '',
        },

        linea: {
            bandera: null,
            campo1: '',
            campo2a: '',
            campo2b: '',
        },

        medicamentos: {
            bandera: null,
            tipo_formu: [],
            cod_soat: [],
            cod_formu: [],
            descrip: [],
            dias_trat: [],
            cantidad: [],
            // dias: [],
            manejo_formu: [],
            obser: [],
            num_text: [],
        },

        historia: {
            bandera: null,
            diagnos1: '',
            diagnos2: '',
        },

        prof: {
            bandera: null,
            descrip_prof: '',
            id_prof: '',
            reg_med_prof: '',
            nombre_esp: '',
        },

        signos: {
            bandera: null,
            cont: []
        },

        signos2: {
            bandera: null,
            oper_tras: '',
            fecha_tras: '',
            llave_paci_tras: '',
        },


        codigoBarra: {
            bandera: null,
            consec_barras: '',
        },

        diagFormula: {
            bandera: null,
            cod_diagn_1: '',
            cod_diagn_2: '',
            cod_diagn_3: '',
            cod_diagn_4: '',
            cod_diagn_5: '',
            cod_diagn_6: '',
            cod_diagn_7: '',
            cod_diagn_8: '',
            cod_diagn_9: '',
            cod_diagn_10: '',
            embar: '',
        },

        medicamentos2: {
            bandera: null,
            fecha: [],
            hora: [],
            min: [],
            descrip: [],
            via: [],
            medida: [],
            cantidad: [],
            dosis: [],
        },

        interpretacion: {
            bandera: null,
            tipo_formu: [],
            cod_formu: [],
            fecha_inter: [],
            interp: [],
            interp_descrip: [],
        },

        partograma2: {
            bandera: null,
            descrip_prof: '',
            paridad: '',
            membranas: '',
            estado: '',
        },

        partograma: {
            bandera: null,
            item: '',
            dia_grab: '',
            mes_grab: '',
            ano_grab: '',
            hr_grab: '',
            mn_grab: '',
            dia_part: '',
            mes_part: '',
            ano_part: '',
            hr_part: '',
            mn_part: '',
            tension1_part: '',
            tension2_part: '',
            pulso_part: '',
            posicion: '',
            inten_contr: '',
            dura_contr: '',
            dilata_part: '',
            frecu_contr: '',
            borramiento_part: '',
            fcard_fetal: '',
            hodge_x: '',
        },

        observacion: {
            bandera: null,
            obs1: '',
            obs2: '',
            obs3: '',
        },

        firma: {
            bandera: null,
            descrip_prof: '',
            cadena30: '',
            id_acepta: '',
            reg_med_prof: '',
            nombre1: '',
            firma: ''
        },

        revision: {
            bandera: null,
            a1: '',
            a2: '',
            a3: '',
            a4: '',
            a5: '',
            a6: '',
            a7: '',
            a8: '',
            a9: '',
            a0: '',
        },

        mensaje: {
            bandera: null,
            mensaje1: '',
            mensaje2: '',
        },

        vih: {
            bandera: null,
            txt1: 'Se brinda asesoria y consejeria sobre pretest para la toma de muestra del virus de la inmunodeficiencia humana [VIH]: se explica que es el virus del VIH y la diferencia con el sida; importancia de la realizacion de la prueba; formas de transmision, diagnostico y factores de riesgo del VIH; como prevenir el VIH; interpretacion de resultado, tratamiento y manejo de la enfermedad. confidencialidad de la prueba y posibles resultados de la muestra; se le indica al usuario que el VIH es una enfermedad cronica tratable, se socializan con el paciente los conocimientos que tiene con respecto a que es el VIH, como es su modo de transmisión que pueden ser por medio sexual, de transfusiones sanguineas, transmision vertical de madre a hijo, se enfatiza en la transmision vertical (madre e hijo), y como se realiza su diagnostico: por medio de ex menes se le da a conocer la importancia de la realizacion de la prueba, tiempo en el que pueden aparecer los signos y sintomas, lo que afecta en nuestro cuerpo, se indica que la prueba es rapida, tipo tamizaje y si sale positiva se realizara Elisa de cuarta generacion que es una prueba confirmatoria, en caso de ser positiva esta prueba se remite al programa que ofrecen las EPS que cuenta con un grupo interdisciplinario de especialistas, se realiza laboratorios especificos, se define si requiere tratamiento o no tratamiento.',
            txt2: 'Se brinda asesoria de pos test resultados de examenes de virus de inmunodeficiencia humana (VIH), se entrega al paciente el resultado de prueba de rapida (presuntiva) la cual se encuentra no reactiva, se explica al usuario el resultado, y se entrega reporte del resultado de la prueba. Se da educacion en la forma de mantenerse no reactiva para el VIH, y prevencion de enfermedades de transmision sexual y uso de preservativo en las relaciones sexuales, se le explica la importancia de tomarse el examen anualmente y acciones preventivas, se refuerza sobre doble proteccion de ITS, promover estilos de vida saludables, se educa sobre la importancia de una sexualidad responsable y de los controles, derechos sexuales y reproductivos, se trabaja sobre proyecto de vida se resuelven dudas e inquietudes por parte del usuario frente al virus del VIH o de la enfermedad sida.'
        },

        medico: {
            firma: '',
            reg: '',
            nombre: '',
            espec: ''
        },

        covid: {
            recomendaciones: {
                bandera: null
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

        original: {
            bandera: null,
            descrip: '',
        }
    }
}