// CREACION - SANTIAGO.F - MARZO 10/2021

var $_HCI9012 = [];

async function _iniciarHCI9012(opciones, json) {
    $_HCI9012._hcprc = json._hcpac;
    $_HCI9012._detalles = json._detalles;

    await inicializarDatos_HCI9012();
    await abrirArchivos_HCI9012();
    await leerDetalles_HCI9012();
    await llenarEncabezado_HCI9012();
    await llenarDatosPaciente_HCI9012();
    await llenarDatos_HCI9012();
    await llenarDatosComorbilidad_HCI9012();
    await llenarFirma_HCI9012();
    await llamarImpresion_HCI9012();
}

async function leerDetalles_HCI9012() {
    // vacunacion covid
    $_HCI9012.dato_9012 = await $_HCI9012._detalles.find(e => e['COD-DETHC'] == '9012' && e['LLAVE-HC'] == $_HCI9012._hcprc.llave);
    $_HCI9012.dato_9012 ? $_HCI9012.dato_9012 = $_HCI9012.dato_9012.DETALLE : false;
}

async function llenarEncabezado_HCI9012() {
    datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
    datos.encabezado.titulo = 'HISTORIA DE VACUNACION COVID-19';
}

async function llenarDatosPaciente_HCI9012() {
    datos.paciente.nombre = `${$_REG_PACI["NOM-PACI1"]} ${$_REG_PACI["NOM-PACI2"]} ${$_REG_PACI["APELL-PACI1"]} ${$_REG_PACI["APELL-PACI2"]}`;
    datos.paciente.tipoId = $_REG_PACI['TIPO-ID'];
    datos.paciente.id = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
    var horaIng = $_HCI9012._hcprc.hora.substring(0, 2) + ':' + $_HCI9012._hcprc.hora.substring(2, 4);
    var horaEgr = $_HCI9012._hcprc.hora_egres.substring(0, 2) + ':' + $_HCI9012._hcprc.hora_egres.substring(2, 4);
    datos.paciente.fechaIng = $_HCI9012._hcprc.fecha.substring(6, 8) + '-' + $_HCI9012._hcprc.fecha.substring(4, 6) + '-' + $_HCI9012._hcprc.fecha.substring(0, 4) + '  -  ' + horaIng;
    datos.paciente.fechaEgr = $_HCI9012._hcprc.egreso.substring(6, 8) + '-' + $_HCI9012._hcprc.egreso.substring(4, 6) + '-' + $_HCI9012._hcprc.egreso.substring(0, 4) + '  -  ' + horaEgr;
    datos.paciente.grp_sang = `${$_REG_PACI['GRP-SANG']} RH = ${$_REG_PACI['RH']}`;
    datos.paciente.edad = `${$_REG_HC.edad_hc["unid_edad"]}${$_REG_HC.edad_hc["vlr_edad"]}`;
    datos.paciente.nacim = _editFecha3($_REG_PACI['NACIM']);
    $_REG_PACI.SEXO == 'F' ? datos.paciente.sexo = 'Femenino' : datos.paciente.sexo = 'Masculino';
    datos.paciente.e_civil = _ESTCIVIL($_REG_PACI['EST-CIV']);

    var x;
    switch ($_REG_PACI['ETNIA']) {
        case '1':
            x = "INDIGENA";
            break;
        case '2':
            x = "RAIZAL";
            break;
        case '3':
            x = "GITANO";
            break;
        case '4':
            x = "AFROCOLOMBIANO";
            break;
        case '5':
            x = "ROM";
            break;
        case '6':
            x = "MESTIZO";
            break;
        case '9':
            x = "NO APLICA";
            break;
        default:
            x = '';
            break;
    }

    datos.paciente.etnia = x;
    datos.paciente.ocupacion = '';
    datos.paciente.tipo_afilia = _TIPOAFIL($_REG_PACI['TIPO-AFIL']);

    var ciudad;
    var busqCiu = $_HCI9012._ciudades.find(e => e['COD'].trim() == $_REG_PACI.CIUDAD.trim());
    busqCiu != undefined ? ciudad = busqCiu.NOMBRE : false;

    datos.paciente.direccion = `${$_REG_PACI.DIRECC}  ${ciudad}`;
    datos.paciente.telefono = $_REG_PACI.TELEFONO;
    datos.paciente.acomp = $_REG_PACI['ACOMPA'];
    datos.paciente.entidad = $_REG_PACI['NOMBRE-EPS'];
    datos.paciente.folio = $_HCI9012._hcprc.llave.substring(15, 17) + ' - ' + $_HCI9012._hcprc.llave.substring(17, 23);;
    datos.paciente.unserv = $_HCI9012._hcprc.cierre.descrip_unserv;

    parseFloat($_HCI9012._hcprc.rips.triage) != 0 ? datos.paciente.triage = $_HCI9012._hcprc.rips.triage : datos.paciente.triage = '';
    datos.paciente.hab = $_HCI9012._hcprc.cierre.hab;

    (parseFloat($_HCI9012._hcprc.cierre.nro_fact) == 0 || $_HCI9012._hcprc.cierre.nro_fact.trim() == '') ? datos.paciente.fact = '' : datos.paciente.nro_fact = $_HCI9012._hcprc.cierre.prefijo + $_HCI9012._hcprc.cierre.nro_fact;
}

async function llenarDatos_HCI9012() {
    datos.ws9012.motiv_consul = $_HCI9012._hcprc.motivo.replace(/\&/g, "\n");

    var etap;
    switch ($_HCI9012.dato_9012.etapa_vacuna) {
        case '1':
            etap = "1. PRIMERA";
            break;
        case '2':
            etap = "2. SEGUNDA";
            break;
        case '3':
            etap = "3. TERCERA";
            break;
        case '4':
            etap = "4. CUARTA";
            break;
        case '5':
            etap = "5. QUINTA";
            break;
        default:
            etap = '';
            break;
    }
    datos.ws9012.etapa_vacuna = etap;

    var vacuna;
    switch ($_HCI9012.dato_9012.tipo_vacuna) {
        case '1':
            vacuna = "PFIZER";
            break;
        case '2':
            vacuna = "SINOVAC";
            break;
        case '3':
            vacuna = "MODERNA";
            break;
        case '4':
            vacuna = "ASTRAZENECA";
            break;
        case '5':
            vacuna = "JANSSEN";
            break;
        default:
            vacuna = '';
            break;
    }

    datos.ws9012.tipo_vacuna = vacuna;

    var dosis;
    if($_HCI9012.dato_9012.tipo_vacuna != 5) {
        switch ($_HCI9012.dato_9012.nro_dosis) {
          case "1":
            dosis = "PRIMERA DOSIS";
            break;
          case "2":
            dosis = "SEGUNDA DOSIS";
            break;
          case "3":
            dosis = "DOSIS UNICA";
            break;
          default:
            dosis = "";
            break;
        }
    } else {
        switch ($_HCI9012.dato_9012.nro_dosis) {
          case "3":
            dosis = "DOSIS UNICA";
            break;
          case "4":
            dosis = "DOSIS REFUERZO";
            break;
          default:
            dosis = "";
            break;
        }
    }

    datos.ws9012.nro_dosis = dosis;
    datos.ws9012.hora_ing_obser = `${$_HCI9012._hcprc.hora.substring(0, 2)}:${$_HCI9012._hcprc.hora.substring(2, 4)}`;
    datos.ws9012.titulo1 = '';

    datos.examFisico_hc.bandera = true;
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.tens1 + '/' + $_HCI9012._hcprc.signos.tens2);
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.tens_m);
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.fcard + ' lmp');
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.fresp + ' rpm');
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.temp + '°');
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.oximetria + '%');
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.pvc);

    if ($_HCI9012._hcprc.signos.und_peso == '2' || parseFloat($_HCI9012._hcprc.signos.peso) > 500) {
        datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.peso + ' Gr');
    } else {
        datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.peso + ' Kl');
    }
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.talla + ' cm');
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.imc);
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.sup + ' m2');
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.per_tora);
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.per_abdo);
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.per_mune);
    datos.examFisico_hc.cont.push($_HCI9012._hcprc.signos.glasg.substring(3, 5) + '/15');

    var cond;
    switch ($_HCI9012.dato_9012.reaccion_second) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.reaccion_secund = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.enrojecimiento_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.enrojecimiento = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.mialgias_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.mialgias = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.prurito_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.prurito = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.lipotimia_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.lipotimia = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.erupcion_cuta_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.erupcion_cuta = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.ansiedad_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.ansiedad = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.cefalea_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.cefalea = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.rash_cutaneo_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.rash_cut = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.fatiga_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.fatiga = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.disnea_tipo) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.disnea = cond;

    var cond;
    switch ($_HCI9012.dato_9012.tipo_reaccion.otros_tipo_reac) {
        case 'S':
            cond = "SI";
            break;
        case 'N':
            cond = "NO";
            break;
        default:
            cond = '';
            break;
    }
    datos.ws9012.otros = cond;

    datos.ws9012.otra_reaccion = $_HCI9012.dato_9012.otro_reaccion.replace(/\&/g, "\n");

    if ($_HCI9012.dato_9012.signos.peso.trim() == '' &&
        $_HCI9012.dato_9012.signos.talla.trim() == '' &&
        $_HCI9012.dato_9012.signos.temp.trim() == '') {
        // continue
    } else {
        datos.examFisico_covid.bandera = true;
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.tens1 + '/' + $_HCI9012.dato_9012.signos.tens2);
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.tens_media);
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.fcard + ' lmp');
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.fresp + ' rpm');
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.temp + '°');
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.oximetria + '%');
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.pvc);
        if ($_HCI9012.dato_9012.signos.und_peso == '2' || parseFloat($_HCI9012.dato_9012.signos.peso) > 500) {
            datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.peso + ' Gr');
        } else {
            datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.peso + ' Kl');
        }
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.talla + ' cm');
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.imc_corp);
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.sup_corp + ' m2');
        datos.examFisico_covid.cont.push('');
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.per_abdo);
        datos.examFisico_covid.cont.push('');
        datos.examFisico_covid.cont.push($_HCI9012.dato_9012.signos.vlr_glasg + '/15');
    }

    datos.ws9012.hora_egre_obser = $_HCI9012._hcprc.hora_egres.substring(0, 2) + ':' + $_HCI9012._hcprc.hora_egres.substring(2, 4);
    datos.ws9012.obser_vacuna = $_HCI9012.dato_9012.observacion_vacuna.replace(/\&/g, "\n");
    datos.ws9012.recomendaciones_vacuna = $_HCI9012.dato_9012.datos_tabla_recom.replace(/\&/g, "\n");
}

async function llenarDatosComorbilidad_HCI9012() {
    var cond;
    if ($_HCI9012.dato_9012.comorbilidad_vacuna.trim() != '') {
        switch ($_HCI9012.dato_9012.comorbilidad_vacuna) {
            case 'S':
                cond = "SI";
                break;
            case 'N':
                cond = "NO";
                break;
            default:
                cond = '';
                break;
        }
        datos.comorbilidades.presentaComorbilidades = cond;

        if ($_HCI9012.dato_9012.comorbilidad_vacuna == 'S') {
            datos.comorbilidades.bandera = true;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.diabetes) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.diabetes = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.enf_cardiovas) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.enfCardiovasc = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.falla_renal) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.fallaRenal = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.vih) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.VIH_u_otras = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.cancer) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.cancer = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.enf_autoinmun) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.enferAutoinmunes = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.hipotiroid) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.hipotiroidismo = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.cortico_inmuno) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.usoCorticoides = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.epoc_asma) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.epocAsma = cond;

            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.mal_nutricion) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.malNutricion = cond;
            4
            switch ($_HCI9012.dato_9012.comorbilidad_confirmada.fumadores) {
                case 'S':
                    cond = "SI";
                    break;
                case 'N':
                    cond = "NO";
                    break;
                default:
                    cond = '';
                    break;
            }
            datos.comorbilidades.fumadores = cond;
        }
    }
}

function llenarFirma_HCI9012() {
    datos.medico.firma = $_HCI9012._hcprc.med;
    datos.medico.nombre = $_HCI9012._hcprc.descrip_med.replace(/\�/g, 'Ñ');
    datos.medico.reg = $_HCI9012._hcprc.reg_med;
    datos.medico.espec = $_HCI9012._hcprc.descrip_espec_med;
}


async function llamarImpresion_HCI9012() {
    await _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS-01')}.pdf`,
        content: await _imprimirHCI_9012(datos, console.log('imprime HCI-9012')),
        retornar: false
    }).catch((err) => {
        console.error(err);
    })
}

async function abrirArchivos_HCI9012() {
    loader('show');
    await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then(data => {
            $_HCI9012._ciudades = data.CIUDAD;
            $_HCI9012._ciudades.pop();
        }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
        })

    await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then(data => {
            $_HCI9012._especialidades = data.ESPECIALIDADES;
            $_HCI9012._especialidades.pop();
        }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
        })

    loader('show');
}

async function inicializarDatos_HCI9012() {
    datos = {
        encabezado: {
            nombre: '',
            nit: '',
            titulo: '',
        },

        paciente: {
            nombre: '',
            tipoId: '',
            id: '',
            fechaIng: '',
            fechaEgr: '',
            grp_sang: '',
            edad: '',
            nacim: '',
            sexo: '',
            e_civil: '',
            etnia: '',
            ocupacion: '',
            tipo_afilia: '',
            direccion: '',
            telefono: '',
            acomp: '',
            entidad: '',
            folio: '',
            unserv: '',
            triage: '',
            hab: '',
            nro_fact: '',
        },

        ws9012: {
            motiv_consul: '',
            tipo_vacuna: '',
            etapa_vacuna: '',
            nro_dosis: '',
            hora_ing_obser: '',
            titulo1: '',
            reaccion_secund: '',
            enrojecimiento: '',
            mialgias: '',
            prurito: '',
            lipotimia: '',
            erupcion_cuta: '',
            ansiedad: '',
            cefalea: '',
            rash_cut: '',
            fatiga: '',
            disnea: '',
            otros: '',
            otra_reaccion: '',
            hora_egre_obser: '',
            obser_vacuna: '',
            recomendaciones_vacuna: '',
        },

        comorbilidades: {
            bandera: null,
            presentaComorbilidades: '',
            diabetes: '',
            fallaRenal: '',
            cancer: '',
            hipotiroidismo: '',
            epocAsma: '',
            fumadores: '',
            enfCardiovasc: '',
            VIH_u_otras: '',
            enferAutoinmunes: '',
            usoCorticoides: '',
            malNutricion: '',
        },

        examFisico_hc: {
            bandera: null,
            cont: [],
        },

        examFisico_covid: {
            bandera: null,
            cont: [],
        },

        medico: {
            firma: '',
            reg: '',
            nombre: '',
            espec: ''
        },
    }
}