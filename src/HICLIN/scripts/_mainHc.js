// Codigo detalles // HISTORIAS-DETALLADAS
// 1001 - enfermedad general
// 2002 - antecedentes familiares
// 2010 - antecedentes medicos
// 2020 - antecedentes quirurgicos
// 2030 - antecedentes farmacologicos
// 2035 - antecedentes toxico alergicos
// 2040 - antecedentes traumaticos
// 2050 - antecedentes ocupacionales
// 2060 - antecedentes ginecologicos
// 2070 - antecedentes otros
// 2080 - genograma // objecto
// 3010 - organo de sentidos
// 3020 - cardiopulmonar
// 3030 - sistema digestivo
// 3040 - dermatologico
// 3050 - ostearticular
// 3060 - sistema neurologico
// 3070 - psiquiatrico
// 3080 - genitourinario
// 3090 - sistema ginecologico
// 3095 - sistema obstetrico
// 4040 - obstetrico - gineco - mamografia  // objecto
// 4005 - examen general
// 7501 - analisis
// 9005 - escala de barthel // objecto
// 9006 - escala de karnofsky // objecto
// 9008 - findrisk // objecto
// 9009 - paquetes de atencion clinica de heridas // objecto
// 9010 - instrumento de valoracion para menores de 13 años // objecto
// 9011 - instrumento de valoracion apgar-familiar // objecto

function _regresar_menuhis() {
    loader("hide");
    let { llave_hc } = $_REG_HC;
    $("#body_main").load("../../HICLIN/paginas/MENU-HIS.html");
    setTimeout(() => {
        $_REG_HC = { llave_hc };
    }, 150);
}

function calcularFechasLimite() {
    var fecha_limite = "";
    var ano_egreso = $_REG_HC.fecha_egreso_hc.substring(0, 4);
    var mes_egreso = $_REG_HC.fecha_egreso_hc.substring(4, 6);
    var dia_egreso = $_REG_HC.fecha_egreso_hc.substring(6, 8);

    $_REG_HC["fecha_limite"] = "";

    if (mes_egreso == "00" || mes_egreso == "  ") {
        if (parseInt($_REG_HC.estado_hc) < 2 || $_REG_HC.estado_hc == " ") {
            $_REG_HC.fecha_limite = moment().format("YYYYMMDD");
        } else {
            $_REG_HC.fecha_limite = $_REG_HC.fecha_hc;
        }
    } else {
        var fecha = new Date(ano_egreso + "/" + mes_egreso + "/" + dia_egreso);

        switch ($_REG_HC.unser_hc) {
            case "01":
                fecha_limite = fecha.addDays(8);
                break;
            case "02":
                fecha_limite = fecha.addDays(30);
                break;
        }

        $_REG_HC["fecha_limite"] = moment(fecha_limite).format("YYYYMMDD");
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function _getObjetoHc(data) {
    let obj = JSON.parse(JSON.stringify(data));
    let datos_env = _desplegarArrayHc(obj);
    datos_env.datosh = datosEnvio() + localStorage.Usuario + "|";
    return datos_env;
}

var _desplegarArrayHc = function (obj) {
    var datos = {};

    const filtro = [
        "tabla_tto_sifi",
        "tabla_segui_serol",
        "tabla_diag",
        "tabla_diag_egr",
    ];

    Object.keys(obj).forEach((el) => {
        let tipo = typeof obj[el];
        if (tipo === "object") {
            if (filtro.indexOf(el) !== -1) {
                let filtro_data = obj[el];
                filtro_data.forEach((i, index) => {
                    let name = el + (index + 1).toString().padStart(3, "0");
                    let string = "";
                    Object.keys(i).forEach((j) => {
                        string += i[j] + "|";
                    });
                    datos[name] = string;
                });
            } else {
                if (obj[el] != null) {
                    datos = Object.assign(datos, _desplegarArrayHc(obj[el]));
                }
            }
        } else if (tipo === "string" || tipo == "number") {
            if (!datos[el]) {
                let data_string = _reemplazoCaracEsp(obj[el]);
                datos[el] = _reemplazoEnterXCarac(data_string);
            }
        }
    });

    return datos;
};

var _desplegarNuevoArray = function (array) {
    var datos = {};
    array = JSON.parse(JSON.stringify(array));

    array.forEach((obj, index) => {
        let new_obj = _desplegarNuevoObject(obj, index);
        datos = Object.assign(datos, new_obj);
    });

    return datos;
};

var _desplegarNuevoObject = function (obj, index) {
    var datos = {};
    obj = JSON.parse(JSON.stringify(obj));

    Object.getOwnPropertyNames(obj).forEach((val) => {
        let tipo = typeof obj[val];
        if (tipo == "string" || tipo == "number") {
            let name = val + (index + 1).toString().padStart(3, "0");
            datos[name] = obj[val];
        } else {
            if (obj[val] != null) {
                datos = Object.assign(datos, _desplegarNuevoObject(obj[val], index));
            }
        }
    });

    return datos;
};

function _getObjetoHcDetal(object, llave_hcdet) {
    var datos_env = { datosh: datosEnvio() + llave_hcdet + "|", codigos: "" },
        codigos = [
            // "2002",
            "3010",
            "2005",
            "2079",
            "2080",
            "4010",
            "4011",
            "4030",
            "4040",
            "8031",
            "8002",
            "9001",
            "9002",
            "9003",
            "9005",
            "9006",
            "9007",
            "9008",
            "9009",
            "9501",
            "9010",
            "9011",
        ];

    object = JSON.parse(JSON.stringify(object));
    object.forEach((item) => {
        var consulta = codigos.find((e) => e == item["COD-DETHC"]);
        if (item["LLAVE-HC"].trim()) {
            if (!consulta) {
                datos_env.codigos += item["COD-DETHC"].trim() + "|";
                item.DETALLE = _reemplazoEnterXCarac(item.DETALLE);
                var length = item.DETALLE.trim().length / 95;
                (length = Math.ceil(length)), (sw = 0);

                for (var j = 0; j < length; j++) {
                    sw++;
                    datos_env[
                        `LIN_${item["COD-DETHC"]}_${sw.toString().padStart(3, "0")}`
                    ] = item.DETALLE.substring(95 * j, j * 95 + 95).trim();
                }
            } else {
                var obj = Object.keys(item.DETALLE);
                datos_env[`LIN_${item["COD-DETHC"]}_001`] = "";

                for (var k in obj) {
                    if (obj[k] == "dependencia_funcional_9005") {
                        Object.getOwnPropertyNames(item.DETALLE[obj[k]]).forEach((val) => {
                            datos_env[`LIN_${item["COD-DETHC"]}_001`] +=
                                item.DETALLE[obj[k]][val] + "|";
                        });
                    } else {
                        datos_env[`LIN_${item["COD-DETHC"]}_001`] +=
                            item.DETALLE[obj[k]] + "|";
                    }
                }
            }
        }
    });
    return datos_env;
}

function Regexp_detalle(array) {
    var detalles = [];

    array.forEach((item) => {
        var type_data = typeof item.DETALLE;

        if (type_data == "string") {
            item.DETALLE = _reemplazoCaracXEnter(item.DETALLE);
            detalles.push(item);
        } else {
            detalles.push(item);
        }
    });

    return detalles;
}

var _reemplazoCaracEsp = function (string) {
    let tipo = typeof string;
    if (tipo == "string") string = string.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
    return string || "";
};

var _reemplazoCaracXEnter = function (string) {
    let tipo = typeof string;
    if (tipo == "string") string = string.replace(/(?:\&)/g, "\n");
    return string || "";
};

var _reemplazoEnterXCarac = function (string) {
    let tipo = typeof string;
    if (tipo == "string") string = string.replace(/(\r\n|\n|\r)/gm, "&");
    return string || "";
};

function _limpiarFormulacion() {
    let obj = {
        item_formu: "",
        tipo_formu: "",
        cod_formu: "",
        cant_formu: "",
        descripcion: "",
        indic_formu: {
            indi1_formu: {
                orden_dosis_formu: "",
                cant_dosis_formu: "",
                unid_dosis_formu: "",
                inmed_formu: {
                    cada_dosis_formu: "",
                    cant_frec_dosis_formu: "",
                    unid_frec_dosis_formu: "",
                },
                via_dosis_formu: "",
                dias_trat_formu: "",
            },
            indic2_formu: "",
        },
        var_dosis_formu: {
            cant_dosisf_formu: "",
            tipo_dosisf_formu: "",
            cant_frec_dosisf_formu: "",
            frec_dosisf_formu: "",
            via_formu: "",
        },
        instituto_formu: "",
        tipo_incap_formu: "",
        grado_incap_formu: "",
        prorroga_formu: "",
        nro_ord_formu: "",
        fecha_incap: {
            ano: "",
            mes: "",
            dia: "",
        },
        /* variable de la tabla interpretacion */
        manejo_formu: "",
        espec_formu: "",
    };
    return JSON.parse(JSON.stringify(obj));
}

function consult_atiendProf(codigo) {
    var msj = "";
    switch (codigo) {
        case "1":
            msj = "MEDICO ESPECIALISTA";
            break;
        case "2":
            msj = "MEDICO GENERAL";
            break;
        case "3":
            msj = "ENFERMERA";
            break;
        case "4":
            msj = "AUXILIAR ENFERMERIA";
            break;
        case "5":
            msj = "TERAPEUTAS Y OTROS";
            break;
        case "6":
            msj = "ENFERMERA JEFE PYP";
            break;
        case "7":
            msj = "PSICOLOGIA";
            break;
        case "8":
            msj = "NUTRICIONISTA";
            break;
        case "9":
            msj = "NUTRICIONISTA";
            break;
        case "A":
            msj = "SIN DETERMINAR";
            break;
        case "B":
            msj = "AUDITOR MEDICO";
            break;
        case "H":
            msj = "ODONTOLOGO";
            break;
        case "I":
            msj = "HIGIENISTA ORAL";
            break;
        case "O":
            msj = "OPTOMETRA";
            break;
        case "T":
            msj = "TRABAJO SOCIAL";
            break;
    }
    return msj;
}

function consult_embar(codigo) {
    var msj = "";
    switch (codigo) {
        case "1":
            msj = "1ER TRIM. EMBA";
            break;
        case "2":
            msj = "2DO TRIM. EMBA";
            break;
        case "3":
            msj = "3ER TRIM. EMBA";
            break;
        case "4":
            msj = "NO ESTA EMBAR.";
            break;
        case "9":
            msj = "NO APLICA";
            break;
    }
    return msj;
}

function consult_causa(codigo) {
    var msj = "";
    switch (parseInt(codigo)) {
        case 1:
            msj = "ACCIDENTE TRABAJO";
            break;
        case 2:
            msj = "ACCIDENTE TRANSITO";
            break;
        case 3:
            msj = "ACCIDENTE RABICO";
            break;
        case 4:
            msj = "ACCIDENTE OFIDICO";
            break;
        case 5:
            msj = "OTRO ACCIDENTE";
            break;
        case 6:
            msj = "EVENTO CATASTROFIC";
            break;
        case 7:
            msj = "LESION AGRESION";
            break;
        case 8:
            msj = "LESION AUTO INFLIG";
            break;
        case 9:
            msj = "SOSP.MALTRATO FIS";
            break;
        case 10:
            msj = "SOSP.ABUSO SEXUAL";
            break;
        case 11:
            msj = "SOSP.VIOLENCIA SEX";
            break;
        case 12:
            msj = "SOSP.MALTRATO EMOC";
            break;
        case 13:
            msj = "ENFERMEDAD GENERAL";
            break;
        case 14:
            msj = "ENFERMEDAD PROFES";
            break;
        case 15:
            msj = "NO APLICA";
            break;
    }
    return msj;
}

function consult_tipoDiagn(codigo) {
    var msj = "";
    switch (codigo) {
        case "1":
            msj = "IMPRESION DIAGNOST";
            break;
        case "2":
            msj = "CONFIRMADO NUEVO";
            break;
        case "3":
            msj = "CONFIRMADO REPETID";
            break;
        case "9":
            msj = "No aplica";
            break;
    }
    return msj;
}

function consult_planifica(codigo) {
    var msj = "";
    switch (codigo) {
        case "1":
            msj = "DIU";
            break;
        case "2":
            msj = "ORAL";
            break;
        case "3":
            msj = "BARRERA";
            break;
        case "4":
            msj = "OTRO";
            break;
        case "5":
            msj = "NINGUNO";
            break;
        case "6":
            msj = "DIU + BARRERA";
            break;
        case "7":
            msj = "IMPL. SUBDERMICO";
            break;
        case "8":
            msj = "I.SUBDERM+BARRERA";
            break;
        case "9":
            msj = "ORAL + BARRERA";
            break;
        case "A":
            msj = "INYECTABLE MENSUAL";
            break;
        case "B":
            msj = "INYECTABLE+BARRERA";
            break;
        case "C":
            msj = "INYECTABLE TRIMEST";
            break;
        case "D":
            msj = "TRIMESTRAL+BERRERA";
            break;
        case "E":
            msj = "EMERGENCIA";
            break;
        case "F":
            msj = "EMERGENCIA+BARRERA";
            break;
        case "G":
            msj = "ESTERILIZACION";
            break;
        case "H":
            msj = "ESTERILIZA+BARRERA";
            break;
        case "I":
            msj = "NO USA X TRADICION";
            break;
        case "J":
            msj = "NO USA X SALUD";
            break;
        case "K":
            msj = "NO USA X NEGACION";
            break;
        case "L":
            msj = "COITUS INTERRUPTUS";
            break;
        case "M":
            msj = "METODO DEL RITMO";
            break;
        default:
            msj = "";
            break;
    }
    return msj;
}

function estad_salida(codigo) {
    var msj = "";
    switch (codigo) {
        case "":
            msj = "";
            break;
        case "1":
            msj = "VIVO   (a)";
            break;
        case "2":
            msj = "MUERTO (a)";
            break;
        case "3":
            msj = "REMITIDO";
            break;
        case "4":
            msj = "HOSPITALIZAD";
            break;
        case "5":
            msj = "OBSERVACION";
            break;
        case "6":
            msj = "NO APLICA";
            break;
    }
    return msj;
}

function get_parentezcoPaciente(codigo) {
    var msj = "";
    switch (codigo) {
        case "01":
            msj = "CONYUG";
            break;
        case "02":
            msj = "HIJO  ";
            break;
        case "03":
            msj = "PADRES";
            break;
        case "04":
            msj = "2 GRAD";
            break;
        case "05":
            msj = "3 GRAD";
            break;
        case "06":
            msj = "< 12  ";
            break;
        case "07":
            msj = "SUEGRO";
            break;
    }
    return msj;
}

function _tipoJsonHc(tipo) {
    var retornar = "";
    switch (tipo) {
        case "nivel_estudio":
            retornar = [
                { COD: '1', DESCRIP: 'NINGUNO' },
                { COD: '2', DESCRIP: 'PRE-ESCOL' },
                { COD: '3', DESCRIP: 'PRIMARIA.' },
                { COD: '4', DESCRIP: 'SECUNDAR.' },
                { COD: '5', DESCRIP: 'BACH. BASI' },
                { COD: '6', DESCRIP: 'BACH. TECN' },
                { COD: '7', DESCRIP: 'NORMALIST' },
                { COD: '8', DESCRIP: 'TEC. PROFE' },
                { COD: '9', DESCRIP: 'TECNOLOGI' },
                { COD: 'A', DESCRIP: 'PROFESION' },
                { COD: 'B', DESCRIP: 'ESPECIALI' },
                { COD: 'C', DESCRIP: 'MAESTRIA.' },
                { COD: 'D', DESCRIP: 'DOCTORADO' },
            ];
            break;
        case "ciclos_menstruales":
            retornar = [
                { COD: '1', DESCRIP: 'REGULARES' },
                { COD: '2', DESCRIP: 'IREGULARES' },
            ];
            break;
        case "estructurasOculares":
            retornar = [
                { COD: "1", DESCRIP: "SIN ALTERACIONES" },
                { COD: "2", DESCRIP: "CON ALTERACIONES" },
                { COD: "3", DESCRIP: "NO APLICA" },
            ];
            break;
        case "9005_comer":
        case "9005_vestirse":
        case "9005_baño":
        case "9005_escaleras":
            retornar = [
                { COD: "1", DESCRIP: "Independiente" },
                { COD: "2", DESCRIP: "Necesita ayuda" },
                { COD: "3", DESCRIP: "Dependiente" },
            ];
            break;
        case "9005_lavarse":
        case "9005_arreglarse":
            retornar = [
                { COD: "1", DESCRIP: "Independiente" },
                { COD: "2", DESCRIP: "Dependiente" },
            ];
            break;
        case "9005_deposicion":
        case "9005_miccion":
            retornar = [
                { COD: "1", DESCRIP: "Continente" },
                { COD: "2", DESCRIP: "Accidental ocasional" },
                { COD: "3", DESCRIP: "Incontinente" },
            ];
            break;
        case "9005_trasladarse":
            retornar = [
                { COD: "1", DESCRIP: "Independiente" },
                { COD: "2", DESCRIP: "Minima ayuda" },
                { COD: "3", DESCRIP: "Gran ayuda" },
                { COD: "4", DESCRIP: "Dependiente" },
            ];
            break;
        case "9005_deambulacion":
            retornar = [
                { COD: "1", DESCRIP: "Independiente" },
                { COD: "2", DESCRIP: "Necesita ayuda" },
                { COD: "3", DESCRIP: "Independiente en silla de ruedas" },
                { COD: "4", DESCRIP: "Dependiente" },
            ];
            break;
        case "9006_categorias":
            retornar = [{
                COD: "1",
                DESCRIP: "Capaz de realizar actividades normales, no requiere cuidados especiales",
            },
            {
                COD: "2",
                DESCRIP: "Incapaz de trabajar, puede vivir en casa y auto cuidarse con ayuda variables",
            },
            {
                COD: "3",
                DESCRIP: "Incapaz de auto cuidarse. Requiere cuidados especiales, susceptible de hospitalizacion, probable avance de enfermedad",
            },
            ];
            break;
        case "9006_actividades":
            retornar = [
                { COD: "1", DESCRIP: "Actividad normal. Sin evidencia de enfermedad" },
                {
                    COD: "2",
                    DESCRIP: "Actividad normal con esfuerzo, sintomas de enfermedad.",
                },
                {
                    COD: "3",
                    DESCRIP: "Cuida de si mismo pero es incapaz de llevar a cabo una actividad o trabajo normal",
                },
            ];
            break;
        case "9006_incapazTrabajar":
            retornar = [{
                COD: "1",
                DESCRIP: "Necesita ayuda de otros pero es capaz de cuidar de si mismo para mayor parte sus necesidades",
            },
            {
                COD: "2",
                DESCRIP: "Requiere ayuda considerable de otros y cuidados especiales frecuentes incapacitados",
            },
            {
                COD: "3",
                DESCRIP: "Requiere cuidados especiales. Severamente incapacitado",
            },
            ];
            break;
        case "9006_incapazCuidarse":
            retornar = [{
                COD: "1",
                DESCRIP: "Indicacion de hospitalizacion aunque no hay indicios de muerte.",
            },
            {
                COD: "2",
                DESCRIP: "Gravemente enfermo. Necesita asistencia activa de soporte.",
            },
            { COD: "3", DESCRIP: "Moribundo." },
            { COD: "4", DESCRIP: "Fallecio." },
            ];
            break;
        case "9009_clasificaHerida":
            retornar = [
                { COD: "1", DESCRIP: "Heridas agudas." },
                { COD: "2", DESCRIP: "Heridas especiales." },
                { COD: "3", DESCRIP: "Heridas cronicas." },
            ];
            break;
        case "9009_dimensionHerida":
            retornar = [
                { COD: "1", DESCRIP: "Superficie < 4 CM2." },
                { COD: "2", DESCRIP: "Superficie = 4 -< 16 CM2." },
                { COD: "3", DESCRIP: "Superficie = 16 -< 36 CM2." },
                { COD: "4", DESCRIP: "Superficie = 36 -< 64 CM2." },
                { COD: "5", DESCRIP: "Superficie = 64 -< 100 CM2." },
                { COD: "3", DESCRIP: "Superficie = >= 100 CM2." },
            ];
            break;
        case "9009_profundTejido":
            retornar = [
                { COD: "1", DESCRIP: "Piel intacta o cicatrizada." },
                { COD: "2", DESCRIP: "Afectacion de la Dermis-Epidermis." },
                {
                    COD: "3",
                    DESCRIP: "Afectacion de tejido sucutaneo (tejido adiposo sin llegar a la fascia del musculo).",
                },
                { COD: "4", DESCRIP: "Afectacion del musculo." },
                {
                    COD: "5",
                    DESCRIP: "Afectacion del hueso y tejido anexos. (Tendones, ligamentos, capsula articular o escara negra que no permite ver los tejidos debajo de ella).",
                },
                { COD: "3", DESCRIP: "Superficie = >= 100 CM2." },
            ];
            break;
        case "9009_comorbilidad":
            retornar = [
                { COD: "1", DESCRIP: "Sin patologias asociadas." },
                { COD: "2", DESCRIP: "Con 1 patologia como comorbilidad asociada." },
                { COD: "3", DESCRIP: "Con 2 patologias como comorbilidad asociadas." },
            ];
            break;
        case "9009_estadoHerida":
            retornar = [
                { COD: "1", DESCRIP: "Estadio I." },
                { COD: "2", DESCRIP: "Estadio II." },
                { COD: "3", DESCRIP: "Estadio III." },
                { COD: "4", DESCRIP: "Estadio IV." },
            ];
            break;
        case "9009_infecion":
            retornar = [
                { COD: "1", DESCRIP: "No evidencia signos de infeccion." },
                { COD: "2", DESCRIP: "Si evidencia signos de infeccion." },
            ];
            break;
        case "9009_tiempo":
            retornar = [
                { COD: "1", DESCRIP: "De 1 a 4 meses." },
                { COD: "2", DESCRIP: "De 5 a 8 meses." },
                { COD: "3", DESCRIP: "De 9 a 12 meses." },
                { COD: "4", DESCRIP: "Mas de 12 meses." },
            ];
            break;
        case "9009_registroFoto":
            retornar = [
                { COD: "1", DESCRIP: "Con evidente evolucion." },
                { COD: "2", DESCRIP: "Evolucion estancada." },
                { COD: "3", DESCRIP: "Con retroceso evidente en la evolucion." },
            ];
            break;
        case "causa":
            retornar = [
                { COD: "1", DESCRIP: "ACCIDENTE DE TRABAJO" },
                { COD: "2", DESCRIP: "ACCIDENTE DE TRANSITO" },
                { COD: "3", DESCRIP: "ACCIDENTE RABICO" },
                { COD: "4", DESCRIP: "ACCIDENTE OFIDICO" },
                { COD: "5", DESCRIP: "OTRO TIPO ACCIDENTE" },
                { COD: "6", DESCRIP: "EVENTO CATASTROFICO" },
                { COD: "7", DESCRIP: "LESION POR AGRESION" },
                { COD: "8", DESCRIP: "LESION AUTOINFLINGIDA" },
                { COD: "9", DESCRIP: "SOSPECHA MALTRATO FISICO" },
                { COD: "10", DESCRIP: "SOSPECHA ABUSO SEXUAL" },
                { COD: "11", DESCRIP: "SOSPECHA VIOLENCIA SEXUAL" },
                { COD: "12", DESCRIP: "SOSPECHA MALTRATO EMOCIONAL" },
                { COD: "13", DESCRIP: "ENFERMEDAD GENERAL" },
                { COD: "14", DESCRIP: "ENFERMEDAD PROFESIONAL" },
                { COD: "15", DESCRIP: "NO APLICA" },
            ];
            break;
        case "tipo_diagnostico":
            retornar = [
                { COD: "1", DESCRIP: "IMPRESION DIAGNOSTICA" },
                { COD: "2", DESCRIP: "CONFIRMADO NUEVO" },
                { COD: "3", DESCRIP: "CONFIRMADO REPETIDO" },
                { COD: "9", DESCRIP: "NO APLICA" },
            ];
            break;
        case "salida":
            retornar = [
                { COD: "1", DESCRIP: "VIVO (a)" },
                { COD: "2", DESCRIP: "MUERTO (a)" },
                { COD: "3", DESCRIP: "REMITIDO" },
                { COD: "4", DESCRIP: "HOSPITALIZADO" },
                { COD: "5", DESCRIP: "OBSERVACION" },
                { COD: "6", DESCRIP: "NO APLICA" },
            ];
            break;
        case "embarazo":
            retornar = [
                { COD: "1", DESCRIP: "1ER TRIM. EMBA" },
                { COD: "2", DESCRIP: "2DO TRIM. EMBA" },
                { COD: "3", DESCRIP: "3ER TRIM. EMBA" },
                { COD: "4", DESCRIP: "NO DECLARA" },
                { COD: "9", DESCRIP: "NO APLICA" },
            ];
            break;
        case "adm_dosis":
            retornar = [
                { value: "1", text: " C.C" },
                { value: "2", text: " Gramos" },
                { value: "3", text: " Miligramos" },
                { value: "4", text: " Microgramos" },
                { value: "5", text: " Tiempo" },
                { value: "6", text: " Unidades" },
                { value: "7", text: " U. Internac." },
                { value: "8", text: " Puff" },
                { value: "9", text: " Gotas" },
                { value: "A", text: " %" },
                { value: "B", text: " Litros" },
                { value: "C", text: " MCG/Kl/min" },
                { value: "D", text: " Tableta" },
                { value: "E", text: " Cucharada" },
                { value: "F", text: " Crema/Ungu." },
                { value: "G", text: " Ampolla" },
                { value: "H", text: " Sobre" },
                { value: "I", text: " MiliEquivale" },
                { value: "J", text: " Capsulas" },
            ];
            break;
        case "adm_tiempo":
            retornar = [
                { value: 1, text: "Minuto (s)" },
                { value: 2, text: "Hora (s)" },
                { value: 3, text: "Dia (s)" },
                { value: 4, text: "Mes (s)" },
                { value: 5, text: "Año (s)" },
                { value: 6, text: "Inmediato" },
                { value: 7, text: "Para mezclas" },
                { value: 8, text: "Titulable" },
                { value: 9, text: "Una vez" },
            ];
            break;
        case "adm_via_dosis":
            retornar = [
                { value: 1, text: "Intravenosa" },
                { value: 2, text: "Intramuscular" },
                { value: 3, text: "Oral" },
                { value: 4, text: "Subcutaneo" },
                { value: 5, text: "Nasal" },
                { value: 6, text: "Oftalmica" },
                { value: 7, text: "Otica" },
                { value: 8, text: "Topica" },
                { value: 9, text: "Intradermico" },
                { value: "A", text: "Inhalatorio" },
                { value: "B", text: "Vaginal" },
                { value: "C", text: "Rectal" },
                { value: "D", text: "Peridural" },
                { value: "E", text: "Raquidea" },
                { value: "F", text: "Uretral" },
                { value: "G", text: "Sublingual" },
            ];
            break;
        case "selecionantecedentes":
            retornar = [
                { COD: 1, DESCRIP: "No refiere" },
                { COD: 2, DESCRIP: "No hay datos" },
                { COD: 3, DESCRIP: "No aplica" },
            ];
            break;
        case "tipoIncapacidad":
            retornar = [
                { COD: 1, DESCRIP: "Auxilo Maternidad" },
                { COD: 2, DESCRIP: "Enfermedad General" },
                { COD: 3, DESCRIP: "Enfermedad Profesional" },
                { COD: 4, DESCRIP: "Enfermedad de trabajo" },
                { COD: 5, DESCRIP: "Accidente de transito" },
                { COD: 6, DESCRIP: "Accidente de trabajo" },
            ];
            break;
        case "resp_ocular":
            retornar = [
                { COD: 1, DESCRIP: "Ninguna" },
                { COD: 2, DESCRIP: "Al dolor" },
                { COD: 3, DESCRIP: "A ordenes" },
                { COD: 4, DESCRIP: "Espontanea" },
            ];
            break;
        case "resp_verbal":
            retornar = [
                { COD: 1, DESCRIP: "Ninguna" },
                { COD: 2, DESCRIP: "Incomprensible" },
                { COD: 3, DESCRIP: "Inapropiada" },
                { COD: 4, DESCRIP: "Confusa" },
                { COD: 5, DESCRIP: "Orientada" },
            ];
            break;
        case "resp_motora":
            retornar = [
                { COD: 1, DESCRIP: "Ninguna" },
                { COD: 2, DESCRIP: "Descerebracion" },
                { COD: 3, DESCRIP: "Decorticacion" },
                { COD: 4, DESCRIP: "Retira" },
                { COD: 5, DESCRIP: "Localiza" },
                { COD: 6, DESCRIP: "Obedece orden" },
            ];
            break;
        case "tipo_macro_his":
            retornar = [
                { COD: 1, DESCRIP: "Macros formulacion medicamentos" },
                { COD: 2, DESCRIP: "Macros formulacion laboratorios" },
                { COD: 3, DESCRIP: "Macros formulacion paraclinicos" },
            ];
            break;
        case "si_no_aplica":
            retornar = [
                { COD: 1, DESCRIP: "Si" },
                { COD: 2, DESCRIP: "No" },
                { COD: 3, DESCRIP: "No aplica" },
            ];
            break;
        case "covid19":
            retornar = {
                viaje_covid19: null,
                contacto_covid19: null,
                fiebre_covid19: null,
                tos_covid19: null,
                disnea_covid19: null,
                malestar_covid19: null,
                rinorrea_covid19: null,
                viaje_dentro_covid19: null,
                lugar_dentro_covid19: null,
                tiempo_dentro_covid19: null,
                viaje_fuera_covid19: null,
                lugar_fuera_covid19: null,
                tiempo_fuera_covid19: null,
                odinofagia_covid19: null,
                recomendacion_covid19: null,
                consenti_acomp_covid19: null,
                personal_salud_covid19: null,
                acompanante_covid19: {
                    ident_acomp_covid19: null,
                    tipo_id_covid19: null,
                    primer_apel_covid19: null,
                    segundo_apel_covid19: null,
                    primer_nom_covid19: null,
                    segundo_nom_covid19: null,
                    lugar_id_covid19: null,
                },
                paci_confirmado: {
                    diabetes_covid19: null,
                    enf_cardiovas_covid19: null,
                    falla_renal_covid19: null,
                    vih_covid19: null,
                    cancer_covid19: null,
                    enf_autoinmun_covid19: null,
                    hipotiroid_covid19: null,
                    cortico_inmuno_covid19: null,
                    epoc_asma_covid19: null,
                    mal_nutricion_covid19: null,
                    fumadores_covid19: null,
                },
                consent_infor_covid19: null,
            };
            break;
        case "tipo_identicacion":
            retornar = [
                { COD: "CC", DESCRIP: "Cedula ciudadania" },
                { COD: "CE", DESCRIP: "Cedula extranjera" },
                { COD: "PA", DESCRIP: "Numero pasaporte" },
                { COD: "RC", DESCRIP: "Registro civil" },
                { COD: "TI", DESCRIP: "Tarjeta identidad" },
                { COD: "ASI", DESCRIP: "Adulto sin identificar" },
                { COD: "MSI", DESCRIP: "Menor sin identificar" },
                { COD: "NUI", DESCRIP: "Numero unico identidad. NUID." },
                { COD: "CD", DESCRIP: "Carnet diplomatico" },
                { COD: "SC", DESCRIP: "Salvo conducto" },
                { COD: "PE", DESCRIP: "Permiso especial permanente" },
                { COD: "CN", DESCRIP: "Certificado nacido vivo" },
            ];
            break;
        case "hc864":
            retornar = [
                { COD: 1, DESCRIP: "Intrahospitalario" },
                { COD: 2, DESCRIP: "Ambulatorio" },
            ];
            break;
        case 'atiende':
            retornar = [
                { COD: '1', DESCRIP: "MEDICO ESPECIALISTA" },
                { COD: '2', DESCRIP: "MEDICO GENERAL" },
                { COD: '3', DESCRIP: "ENFERMERA" },
                { COD: '4', DESCRIP: "AUXILIAR ENFERMERIA" },
                { COD: '5', DESCRIP: "TERAPEUTAS Y OTROS" },
                { COD: '6', DESCRIP: "ENFERMERA JEFE PYP" },
                { COD: '7', DESCRIP: "PSICOLOGIA" },
                { COD: '8', DESCRIP: "NUTRICIONISTA " },
                { COD: '9', DESCRIP: "SIN DETERMINAR" },
                { COD: 'A', DESCRIP: "ODONTOLOGO" },
                { COD: 'H', DESCRIP: "HIGIENISTA ORAL" },
                { COD: 'I', DESCRIP: "INSTRUMENTACION" },
                { COD: 'O', DESCRIP: "OPTOMETRA" },
                { COD: 'T', DESCRIP: "TRABAJO SOCIAL" },
                { COD: ' ', DESCRIP: "SIN DETERMINAR" },
            ];
            break;
        case 'finalid':
            retornar = [
                { COD: '0', DESCRIP: "" },
                { COD: '1', DESCRIP: "ATENCION PARTO    " },
                { COD: '2', DESCRIP: "ATENCION REC.NACID" },
                { COD: '3', DESCRIP: "ATENC.PLANIF.FAMIL" },
                { COD: '4', DESCRIP: "DET.ALT CRECIM <10" },
                { COD: '5', DESCRIP: "DET.ALT.DESA.JOVEN" },
                { COD: '6', DESCRIP: "DET.ALT.EMBARAZO  " },
                { COD: '7', DESCRIP: "DET.ALT. ADULTO   " },
                { COD: '8', DESCRIP: "DET.ALT.AGUD.VISUA" },
                { COD: '9', DESCRIP: "DET.ENFERM.PROFES." },
                { COD: '10', DESCRIP: "NO APLICA         " },
                { COD: '11', DESCRIP: "PATOLOGIA CRONICA " },
            ];
            break;
        case 'planific':
            retornar = [
                { COD: "1", DESCRIP: "DIU" },
                { COD: "2", DESCRIP: "ORAL" },
                { COD: "3", DESCRIP: "BARRERA" },
                { COD: "4", DESCRIP: "OTRO" },
                { COD: "5", DESCRIP: "NINGUNO" },
                { COD: "6", DESCRIP: "DIU + BARRERA" },
                { COD: "7", DESCRIP: "IMPLA. SUBDERMICO" },
                { COD: "8", DESCRIP: "I. SUBDERMICO + BARRERA" },
                { COD: "9", DESCRIP: "ORAL + BARRERA" },
                { COD: "A", DESCRIP: "INYECTABLE MENSUAL" },
                { COD: "B", DESCRIP: "INYECTABLE + BARRERA" },
                { COD: "C", DESCRIP: "INYECTABLE TRIMESTRAL" },
                { COD: "D", DESCRIP: "TRIMESTRAL + BARRERA" },
                { COD: "E", DESCRIP: "EMERGENCIA" },
                { COD: "F", DESCRIP: "EMERGENCIA + BARRERA" },
                { COD: "G", DESCRIP: "ESTERILIZACION" },
                { COD: "H", DESCRIP: "ESTERILIZA + BARRERA" },
                { COD: "I", DESCRIP: "NO USA X TRADICION" },
                { COD: "J", DESCRIP: "NO USA X SALUD" },
                { COD: "K", DESCRIP: "NO USA X NEGACION" },
                { COD: "L", DESCRIP: "COITUS INTERRUPTUS" },
                { COD: "M", DESCRIP: "METODO DEL RITMO" }
            ];
            break;
        case 'parentesco':
            retornar = [
                { COD: '1', DESCRIP: 'MADRE' },
                { COD: '2', DESCRIP: 'PADRE' },
                { COD: '3', DESCRIP: 'HIJO(A)' },
                { COD: '4', DESCRIP: 'ESPOSO(A)' },
                { COD: '5', DESCRIP: 'HERMANO(A)' },
                { COD: '6', DESCRIP: 'TIO(A)' },
                { COD: '7', DESCRIP: 'SOBRINO(A)' },
                { COD: '8', DESCRIP: 'PRIMO(A)' },
                { COD: '9', DESCRIP: 'MADRASTRA' },
                { COD: '10', DESCRIP: 'PADRASTRO' },
                { COD: '11', DESCRIP: 'AMIGO(A)' },
                { COD: '12', DESCRIP: 'ABUELO(A)' }
            ];
            break;
        case 'respuesta':
            retornar = [
                { COD: '1', DESCRIP: 'SI' },
                { COD: '2', DESCRIP: 'NO' },
                { COD: '3', DESCRIP: 'NO SABE' }
            ];
            break;
        case 'aspecto_cuell':
            retornar = [
                { COD: '1', DESCRIP: 'SANO' },
                { COD: '2', DESCRIP: 'CONGESTIVO' },
                { COD: '3', DESCRIP: 'LACERADO' },
                { COD: '4', DESCRIP: 'ULCERADO' },
                { COD: '5', DESCRIP: 'POLIPO' },
                { COD: '6', DESCRIP: 'OTRO' }
            ];
            break;
        case 'aper_ocul':
            retornar = [
                { COD: "1", DESCRIP: "NINGUNA" },
                { COD: "2", DESCRIP: "AL DOLOR" },
                { COD: "3", DESCRIP: "A ORDENES" },
                { COD: "4", DESCRIP: "EXPONTANEA" }
            ];
            break;
        case 'resp_verb':
            retornar = [
                { COD: "1", DESCRIP: "NINGUNA" },
                { COD: "2", DESCRIP: "INCOMPRENSIBLE" },
                { COD: "3", DESCRIP: "INAPROPIADA" },
                { COD: "4", DESCRIP: "CONFUSA" },
                { COD: "5", DESCRIP: "ORIENTADA" }
            ];
            break;
        case 'resp_moto':
            retornar = [
                { COD: "1", DESCRIP: "NINGUNA" },
                { COD: "2", DESCRIP: "DESCEREBRACIÓN" },
                { COD: "3", DESCRIP: "DECORTICACIÓN" },
                { COD: "4", DESCRIP: "RETIRA" },
                { COD: "5", DESCRIP: "LOCALIZA" },
                { COD: "6", DESCRIP: "OBEDECE ORDEN" }
            ];
            break;
        case 'tamano_pupila':
            retornar = [
                { COD: "1", DESCRIP: "NORMAL" },
                { COD: "2", DESCRIP: "MIDRIASIS" },
                { COD: "3", DESCRIP: "MIOSIS" },
            ];
            break;
        case 'reaccion_pupila':
            retornar = [
                { COD: "1", DESCRIP: "NORMAL" },
                { COD: "2", DESCRIP: "FIJA" },
                { COD: "3", DESCRIP: "PEREZOSA" },
            ];
            break;
        case 'fuerza_muscular':
            retornar = [
                { COD: "1", DESCRIP: "NORMAL" },
                { COD: "2", DESCRIP: "DISMINUIDA" },
                { COD: "3", DESCRIP: "AUSENTE" },
            ];
            break;
    }
    return retornar;
}

var _espejoProfesional = () => {
    return {
        NOMBRE: "",
        IDENTIFICACION: localStorage.Sesion.substr(5, 10),
        DESCRIPCION: "",
        REG_MEDICO: "Personal no atiende",
        ATIENDE_PROF: "",
        HORARIO: "",
        LU: "",
        MA: "",
        MI: "",
        JU: "",
        VI: "",
        SA: "",
        DO: "",
        TAB_ESPEC: [],
    };
};

function _SER874(tipoM) {
    // TIPOS DE MACRO
    tipoM = [
        { CODIGO: "1", DESCRIP: "CIRUGIAS" },
        { CODIGO: "2", DESCRIP: "PROCEDIMIENTOS" },
        { CODIGO: "4", DESCRIP: "ENFERMERIA" },
        { CODIGO: "5", DESCRIP: "MEDICINA GENERAL" },
        { CODIGO: "6", DESCRIP: "MEDICINA ESPECIALIZ" },
        { CODIGO: "7", DESCRIP: "RESUMENES HISTORIA" },
        { CODIGO: "8", DESCRIP: "TERAPIAS" },
        { CODIGO: "9", DESCRIP: "PRE-ANESTESIA" },
        { CODIGO: "O", DESCRIP: "ODONTOLOGIA" },
        { CODIGO: "C", DESCRIP: "CONSENT. INFORMADO" },
        { CODIGO: "P", DESCRIP: "PROMOCION Y PREVENC" },
    ];
    return tipoM;
}

function descripTipoMacro_mainHc(tipo) {
    switch (tipo) {
        case "0":
            return "TODAS LAS MACROS";
        case "1":
            return "CIRUGIAS";
        case "2":
            return "PROCEDIMIENTOS";
        case "4":
            return "ENFERMERIA";
        case "5":
            return "MEDICINA GENERAL";
        case "6":
            return "MEDICINA ESPECIALIZ";
        case "7":
            return "RESUMENES HISTORIA";
        case "8":
            return "TERAPIAS";
        case "9":
            return "PRE-ANESTESIA";
        case "O":
            return "ODONTOLOGIA";
        case "C":
            return "CONSENT. INFORMADO";
        case "P":
            return "PROMOCION Y PREVENC";
    }
}

function SC_DIAS(ini, fin) {
    ini = moment(ini);
    fin = moment(fin);

    var result = fin.diff(ini, "days");

    return result;
}

function SC_DIAS_SEMANAS(ini, fin, decimal = false) {
    ini = moment(ini);
    fin = moment(fin);

    var result = fin.diff(ini, 'week', decimal)

    return result;
}

function SC_DIAS_MESES(ini, fin) {
    ini = moment(ini);
    fin = moment(fin);

    let result = fin.diff(ini, "months");

    return result;
}

function SC_EDAD_AMD(naci, act) {
    let fecha_ws = {
        ano_ws: parseInt(act.slice(0, 4)),
        mes_ws: parseInt(act.slice(4, 6)),
        dia_ws: parseInt(act.slice(6)),
    };

    let fecha_naci = {
        ano_naci: parseInt(naci.slice(0, 4)),
        mes_naci: parseInt(naci.slice(4, 6)),
        dia_naci: parseInt(naci.slice(6)),
    };

    let bisiesto = año_bisiesto_mainHc(fecha_ws.ano_ws);
    let edad_dias_paci = 0;
    let edad_meses_paci = 0;
    let edad_anos_paci = 0;
    let unidad_edad_paci = "";

    if (fecha_naci.dia_naci <= fecha_ws.dia_ws) {
        edad_dias_paci = fecha_ws.dia_ws - fecha_naci.dia_naci;
    } else {
        fecha_ws.mes_ws = fecha_ws.mes_ws - 1;

        switch (true) {
            case [01, 03, 05, 07, 08, 10, 12].includes(fecha_ws.mes_ws):
                fecha_ws.dia_ws = fecha_ws.dia_ws + 31;
                break;
            case [04, 06, 09, 11].includes(fecha_ws.mes_ws):
                fecha_ws.dia_ws = fecha_ws.dia_ws + 30;
                break;
            case fecha_ws.mes_ws == 02:
                if (bisiesto == 1) {
                    fecha_ws.dia_ws = fecha_ws.dia_ws + 29;
                } else {
                    fecha_ws.dia_ws = fecha_ws.dia_ws + 28;
                }
                break;
        }

        edad_dias_paci = fecha_ws.dia_ws - fecha_naci.dia_naci;
    }

    if (fecha_naci.mes_naci <= fecha_ws.mes_ws) {
        edad_meses_paci = fecha_ws.mes_ws - fecha_naci.mes_naci;
    } else {
        fecha_ws.ano_ws = fecha_ws.ano_ws - 1;
        fecha_ws.mes_ws = fecha_ws.mes_ws + 12;
        edad_meses_paci = fecha_ws.mes_ws - fecha_naci.mes_naci;
    }

    edad_anos_paci = fecha_ws.ano_ws - fecha_naci.ano_naci;

    if (edad_anos_paci > 0) {
        unidad_edad_paci = "A";
    } else if (edad_meses_paci > 0) {
        unidad_edad_paci = "M";
    } else if (edad_meses_paci >= 0) {
        unidad_edad_paci = "D";
    }

    return {
        años: edad_anos_paci,
        meses: edad_meses_paci,
        dias: edad_dias_paci,
        unidad: unidad_edad_paci,
    };
}

function año_bisiesto_mainHc(año) {
    mod_4 = obtenerDecimales_mainHc(4 / año);
    mod_100 = obtenerDecimales_mainHc(100 / año);
    mod_400 = obtenerDecimales_mainHc(400 / año);

    if (mod_4 == 0 && (mod_400 == 0 || mod_100 != 0)) {
        return 1;
    } else return 0;
}

function obtenerDecimales_mainHc(valor) {
    let decimales = valor - Math.trunc(valor);
    return Math.abs(decimales.toFixed(2));
}

function _ESTCIVIL(e) {
    switch (e) {
        case "S":
            e = "SOLTERO ";
            break;
        case "C":
            e = "CASADO  ";
            break;
        case "U":
            e = "U.LIBRE ";
            break;
        case "D":
            e = "SEPARADO";
            break;
        case "V":
            e = "VIUDO   ";
            break;
        default:
            e = "        ";
            break;
    }
    return e;
}

function _TIPOAFIL(e) {
    switch (e) {
        case "1":
            e = "COTIZANTE";
            break;
        case "2":
            e = "BENEFICIARIO";
            break;
        case "3":
            e = "COT.PENSIONADO";
            break;
        case "4":
            e = "UPC ADICIONAL";
            break;
        case "5":
            e = "CABEZA FAMILIA";
            break;
        case "6":
            e = "GRUPO FAMILIAR";
            break;
        case "0":
            e = "SIN DETERMINAR";
            break;
        default:
            e = "              ";
            break;
    }
    return e;
}

function _ETNIA(e) {
    switch (e) {
        case "1":
            e = "INDIGENA ";
            break;
        case "2":
            e = "RAIZAL   ";
            break;
        case "3":
            e = "GITANO   ";
            break;
        case "4":
            e = "AFROCOLOM";
            break;
        case "5":
            e = "ROM      ";
            break;
        case "6":
            e = "MESTIZO  ";
            break;
        case "9":
            e = "NO APLICA";
            break;
        default:
            e = "         ";
            break;
    }
    return e;
}

function _editarFecha(fecha) {
    fecha = fecha.toString();
    var d = parseInt(fecha.substring(6, 8));
    var m = parseInt(fecha.substring(4, 6));
    var a = parseInt(fecha.substring(0, 4));

    var aux = "  ";
    switch (m) {
        case 1:
            aux = "Ene. ";
            break;
        case 2:
            aux = "Feb. ";
            break;
        case 3:
            aux = "Mar. ";
            break;
        case 4:
            aux = "Abr. ";
            break;
        case 5:
            aux = "May. ";
            break;
        case 6:
            aux = "Jun. ";
            break;
        case 7:
            aux = "Jul. ";
            break;
        case 8:
            aux = "Ago. ";
            break;
        case 9:
            aux = "Sep. ";
            break;
        case 10:
            aux = "Oct. ";
            break;
        case 11:
            aux = "Nov. ";
            break;
        case 12:
            aux = "Dic. ";
            break;
    }

    var fecha_edit = aux + d + "/" + a;

    if (fecha.trim() == "") {
        return fecha;
    } else {
        return fecha_edit;
    }
}

function calcularRangoImc(imc) {
    imc = parseFloat(imc);
    // t = parseFloat(talla);
    // p = parseFloat(peso);
    // t > 10 ? t = t / 100 : false;
    // t = t * t;

    // imc = p / t;

    rango = "";
    if (imc < 18.5) {
        rango = "DELGADEZ";
    } else if (imc >= 18.5 && imc <= 24.9) {
        rango = "NORMAL";
    } else if (imc >= 25 && imc <= 29.9) {
        rango = "PACIENTE CON SOBREPESO";
    } else if (imc >= 30) {
        rango = "PACIENTE OBESO";
    }

    return rango;
}

function _EVALCARDIO(sexo, edad, diabetes, tens1, tabaco) {
    var riesgoCardioLnk = 0;
    var edad_c = 0;
    if (parseFloat(edad.substring(1, 4)) >= 70) {
        edad_c = 4;
    } else if (parseFloat(edad.substring(1, 4)) >= 60) {
        edad_c = 3;
    } else if (parseFloat(edad.substring(1, 4)) >= 50) {
        edad_c = 2;
    } else {
        edad_c = 1;
    }

    var tens1_c = 0;
    if (parseFloat(tens1 >= 180)) {
        tens1_c = 4;
    } else if (parseFloat(tens1 >= 160)) {
        tens1_c = 3;
    } else if (parseFloat(tens1 >= 140)) {
        tens1_c = 2;
    } else {
        tens1_c = 1;
    }

    if (diabetes == "S") {
        _evaluarCardioConDiabetes();
    } else {
        _evaluarCardioSinDiabetes();
    }

    function _evaluarCardioConDiabetes() {
        switch (edad_c) {
            case 1:
                switch (tens1_c) {
                    case 1:
                        break;
                    case 2:
                        riesgoCardioLnk = 1;
                        break;
                    case 3:
                        if (sexo == "M") {
                            tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 1);
                        } else {
                            tabaco == "S" ? (riesgoCardioLnk = 4) : (riesgoCardioLnk = 2);
                        }
                        break;
                    case 4:
                        if (sexo == "M" && tabaco == "N") {
                            riesgoCardioLnk = 4;
                        } else {
                            riesgoCardioLnk = 5;
                        }
                        break;
                }
                break;
            case 2:
                switch (tens1_c) {
                    case 1:
                        riesgoCardioLnk = 1;
                        break;
                    case 2:
                        tabaco == "S" ? (riesgoCardioLnk = 2) : (riesgoCardioLnk = 1);
                        break;
                    case 3:
                        tabaco == "S" ? (riesgoCardioLnk = 4) : (riesgoCardioLnk = 2);
                        break;
                    case 4:
                        riesgoCardioLnk = 5;
                        break;
                }
                break;
            case 3:
                switch (tens1_c) {
                    case 1:
                        sexo == "M" && tabaco == "S" ?
                            (riesgoCardioLnk = 2) :
                            (riesgoCardioLnk = 1);
                        break;
                    case 2:
                        if (sexo == "M") {
                            tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 2);
                        } else {
                            tabaco == "S" ? (riesgoCardioLnk = 2) : (riesgoCardioLnk = 1);
                        }
                        break;
                    case 3:
                        if (sexo == "M") {
                            tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 3);
                        } else {
                            tabaco == "S" ? (riesgoCardioLnk = 4) : (riesgoCardioLnk = 2);
                        }
                        break;
                    case 4:
                        riesgoCardioLnk = 5;
                        break;
                }
                break;
            case 4:
                switch (tens1) {
                    case 1:
                        sexo == "M" && tabaco == "S" ?
                            (riesgoCardioLnk = 3) :
                            (riesgoCardioLnk = 2);
                        break;
                    case 2:
                        if (tabaco == "S") {
                            riesgoCardioLnk = 3;
                        } else {
                            if (sexo == "M") {
                                riesgoCardioLnk = 3;
                            } else {
                                riesgoCardioLnk = 2;
                            }
                        }
                        break;
                    case 3:
                        tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
                        break;
                    case 4:
                        riesgoCardioLnk = 5;
                        break;
                }
                break;
        }
    }

    function _evaluarCardioSinDiabetes() {
        switch (edad_c) {
            case 1:
                switch (tens1_c) {
                    case 1:
                        break;
                    case 2:
                        riesgoCardioLnk = 1;
                        break;
                    case 3:
                        tabaco == "S" ? (riesgoCardioLnk = 1) : (riesgoCardioLnk = 2);
                        break;
                    case 4:
                        if (tabaco == "S") {
                            riesgoCardioLnk = 5;
                        } else if (sexo == "M") {
                            riesgoCardioLnk = 3;
                        } else {
                            riesgoCardioLnk = 4;
                        }
                        break;
                }
                break;
            case 2:
                switch (tens1_c) {
                    case 1:
                        break;
                    case 2:
                        riesgoCardioLnk = 1;
                        break;
                    case 3:
                        if (sexo == "M") {
                            tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 2);
                        } else {
                            tabaco == "S" ? (riesgoCardioLnk = 2) : (riesgoCardioLnk = 1);
                        }
                        break;
                    case 4:
                        tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
                        break;
                }
                break;
            case 3:
                switch (tens1_c) {
                    case 1:
                        riesgoCardioLnk = 2;
                        break;
                    case 2:
                        sexo == "M" && tabaco == "S" ?
                            (riesgoCardioLnk = 2) :
                            (riesgoCardioLnk = 1);
                        break;
                    case 3:
                        if (
                            (sexo == "M" && tabaco == "N") ||
                            (sexo == "F" && tabaco == "S")
                        ) {
                            riesgoCardioLnk = 2;
                        } else if (sexo == "M" && tabaco == "S") {
                            riesgoCardioLnk = 4;
                        } else {
                            riesgoCardioLnk = 1;
                        }
                        break;
                    case 4:
                        tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
                        break;
                }
                break;
            case 4:
                switch (tens1) {
                    case 1:
                        sexo == "M" && tabaco ?
                            (riesgoCardioLnk = 2) :
                            (riesgoCardioLnk = 1);
                        break;
                    case 2:
                        sexo == "F" && tabaco == "N" ?
                            (riesgoCardioLnk = 1) :
                            (riesgoCardioLnk = 2);
                        break;
                    case 3:
                        tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 2);
                        break;
                    case 4:
                        tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
                        break;
                }
                break;
        }
    }

    console.log(riesgoCardioLnk, "riesgoCardioLnk");
    return riesgoCardioLnk;
}

function _editFecha2(fecha) {
    fecha = fecha.toString();
    var fecha_edit2 =
        fecha.substring(0, 4) +
        "/" +
        fecha.substring(4, 6) +
        "/" +
        fecha.substring(6, 8);
    return fecha_edit2;
}

function tipoEvolucion() {
    var TIPO_EVO = [
        { COD: "1", DESCRIP: "EVOLUCIÓN MÉDICA" },
        { COD: "2", DESCRIP: "NOTAS ENFERMERÍA" },
        { COD: "3", DESCRIP: "TERAPEUTAS" },
        { COD: "4", DESCRIP: "RESULTADOS COTOLOGÍA" },
        { COD: "5", DESCRIP: "APLICACIÓN MEDICAMENTOS" },
        { COD: "6", DESCRIP: "NOTA INSTRUMENTADORA" },
        { COD: "7", DESCRIP: "CONSULTA PRE-ANESTESIA" },
        { COD: "8", DESCRIP: "ANESTESIA" },
        // { 'COD': '8I', 'DESCRIP': 'EVOLUCION ANESTESIA - INICIO' },
        // { 'COD': '8M', 'DESCRIP': 'EVOLUCION ANESTESIA - MANTENIMIENTO' },
        // { 'COD': '8C', 'DESCRIP': 'EVOLUCION ANESTESIA - CIERRE' },
        { COD: "9", DESCRIP: "RESULTADOS DE PATOLOGÍA" },
        { COD: "A", DESCRIP: "FORMULARIO APACHE" },
        { COD: "B", DESCRIP: "FORMULARIO TISS" },
        { COD: "C", DESCRIP: "CONTROL DE TRANSFUSIÓN" },
        { COD: "D", DESCRIP: "BITACORA AMBULANCIAS" },
        { COD: "N", DESCRIP: "ATENCIÓN RECIÉN NACIDO" },
        { COD: "P", DESCRIP: 'FORMATO PYP1 "EVALUACIÓN Y DESARROLLO < 84 MESES"' },
    ];

    return TIPO_EVO;
}

function f8Pacientes(callbackAtras, callbackSig) {
    parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre"],
        f8data: "PACIENTES",
        columnas: [{
            title: "COD",
        },
        {
            title: "NOMBRE",
        },
        {
            title: "EPS",
        },
        {
            title: "EDAD",
        },
        ],
        callback: (data) => {
            callbackSig;
        },
        cancel: () => {
            callbackAtras;
        },
    };
    F8LITE(parametros);
}

function _HC828(callback_esc, input_actual) {
    // $this.banderaHC828 = true;
    var arrayHC828 = [
        { COD: "1", DESCRIP: "NO REFIERE" },
        { COD: "2", DESCRIP: "NO HAY DATOS" },
    ];
    POPUP({
        array: arrayHC828,
        titulo: "Selección",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: 1,
        callback_f: () => {
            callback_esc();
        },
    },
        (data) => {
            $this.global_HC000[input_actual] = data.DESCRIP;
            _enterF3(`.${input_actual}`);
            // $this.banderaHC828 = false;
        }
    );
}

function _HC823A(callback_esc, callback, seleccion) {
    var datos = [
        { COD: "1", DESCRIP: "Hi" },
        { COD: "2", DESCRIP: "Low" },
    ];

    POPUP({
        array: datos,
        titulo: "GLUCOMETRIA",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: seleccion,
        callback_f: () => {
            setTimeout(() => {
                callback_esc();
            }, 300);
        },
    },
        (data) => {
            callback(data);
        }
    );
}

// AGRUPA LAS ESTRUCTURAS DE TODAS LAS IMPRESIONES EN UN SOLO PDF
async function unirPdfs_mainHc(arrayData, retornar, nomPdf) {
    var merger = new PDFMerger();

    for (var i in arrayData) {
        if (arrayData[i] != undefined) {
            var x = await new Buffer.from(arrayData[i]);
            merger.add(x);
        }
    }

    var nombrePdf = "";
    if (nomPdf != undefined) {
        nombrePdf = nomPdf;
    } else {
        nombrePdf = `C:/PROSOFT/TEMP/${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")
            }.pdf`;
    }

    await merger.save(nombrePdf);

    if (retornar) {
        $_REG_HC.nombrePdf = nombrePdf;
    } else {
        child(`start ${nombrePdf}`);
    }
}

// DEVUELVE FORMATO DD-MM-YYYY
function _editFecha3(fecha) {
    fecha = fecha.toString();
    var fecha_edit3 =
        fecha.substring(6, 8) +
        "/" +
        fecha.substring(4, 6) +
        "/" +
        fecha.substring(0, 4);
    return fecha_edit3;
}

function _editHora(hora) {
    hora = hora.toString();
    var hora_edit = hora.substring(0, 2) + ":" + hora.substring(2, 4);
    return hora_edit;
}

function _AIEPI830(paso_w, edad_dias) {
    edad_dias = parseFloat(edad_dias);

    var llenar_1M = {
        titulo: "Actividades 0 a 1 mes",
        cuestionario: [
            "Reflejo de moro?",
            "Reflejo cocleo palpebral?",
            "Reflejo de succion?",
            "Brazos y piernas flexionada?",
            "Manos cerradas?",
        ],
    };

    var llenar_2M = {
        titulo: "Actividades 1 a 2 meses",
        cuestionario: [
            "Vocaliza?",
            "Movimiento pierna alternado?",
            "Sonrisa social?",
            "Sigue objetos en linea medi?",
        ]
    };

    var llenar_3M = {
        titulo: "Actividades 0 a 3 meses",
        cuestionario: [
            "Responde al examinador?",
            "Agarra objetos?",
            "Emite sonidos?",
            "Sostiene la cabeza?",
        ]
    };

    var llenar_5M = {
        titulo: "Actividades 4 a 5 meses",
        cuestionario: [
            "Intenta alcanzar un juguete?",
            "Lleva objetos a la boca?",
            "Localiza un sonido?",
            "Gira?",
        ]
    };

    var llenar_8M = {
        titulo: "Actividades 6 a 8 meses",
        cuestionario: [
            "Juega a taparse y descubrirse?",
            "Trasfiere objetos entre manos?",
            "Duplica silabas?",
            "Se sienta sin apoyo?",
        ]
    };

    var llenar_11M = {
        titulo: "Actividades 9 a 11 meses",
        cuestionario: [
            "Imita gestos?",
            "Pinza superior?",
            "Jerga jerigonza?",
            "Camina con apoyo?",
        ]
    };

    var llenar_14M = {
        titulo: "Actividades 12 a 14 meses",
        cuestionario: [
            "Ejecuta gestos a padido?",
            "Coloca cubos en un recipiente?",
            "Dice una palabra?",
            "Camina sin apoyo?",
        ]
    };

    var llenar_17M = {
        titulo: "Actividades 15 a 17 meses",
        cuestionario: [
            "Identifica 2 objetos?",
            "Garabatea espontaneamente?",
            "Dice 3 palabras?",
            "Camina para atras?",
        ]
    };

    var llenar_23M = {
        titulo: "Actividades 18 a 23 meses",
        cuestionario: [
            "Se quita la ropa?",
            "Construye una torre de 3 cubo?",
            "Señala 2 figuras?",
            "Patea una pelota?",
        ]
    };

    var llenar_29M = {
        titulo: "Actividades 24 a 29 meses",
        cuestionario: [
            "Se viste con supervision?",
            "Construye torre de 6 cubos?",
            "Forma frases con 2 palabras?",
            "Salta con ambos pies?",
        ]
    };

    var llenar_35M = {
        titulo: "Actividades 30 a 35 meses",
        cuestionario: [
            "Dice el nombre de un amigo?",
            "Imita una linea verticale?",
            "Reconoce 2 acciones?",
            "Tira la pelota?",
        ]
    };

    var llenar_41M = {
        titulo: "Actividades 36 a 41 meses",
        cuestionario: [
            "Se pone un saco?",
            "Mueve el pulgar con mano cerrada?",
            "Comprende 2 adjetivos?",
            "Se para en cada pie por 1 segund?",
        ]
    };

    var llenar_47M = {
        titulo: "Actividades 42 a 47 meses",
        cuestionario: [
            "Aparea colores?",
            "Copia circulos?",
            "Habla inteligible?",
            "Salta en un solo pie?",
        ]
    };

    var llenar_53M = {
        titulo: "Actividades 48 a 53 meses",
        cuestionario: [
            "Se viste sin ayuda?",
            "Copia cruz?",
            "Comprende 4 preposiciones?",
            "Se para en cada pie por 3 segundo?",
        ]
    };

    var llenar_59M = {
        titulo: "Actividades 53 a 59 meses",
        cuestionario: [
            "Se cepilla los dientes sin ayud?",
            "Señala la linea mas larga?",
            "Define 5 palabras?",
            "Se para en un pie por 5 segundo?",
        ]
    };

    var llenar_65M = {
        titulo: "Actividades 60 a 65 meses",
        cuestionario: [
            "Juega a -hacer de cuenta- con otros niño?",
            "Señala la linea mas larga?",
            "Define 5 palabras?",
            "Se para en un pie por 5 segundo?",
        ]
    };

    var llenar_72M = {
        titulo: "Actividades 66 a 72 meses",
        preguntas: [
            "Acepta y sigue las reglas de juegos de mes?",
            "Copia un cuadrado?",
            "Define 7 palabras?",
            "Se equilibra en cada pie por 7 segundo?",
        ]
    };

    if (edad_dias < 31) {
        return llenar_1M;
    } else if (edad_dias < 61) {
        return llenar_2M;
    } else if (edad_dias < 119) {
        return llenar_3M;
    } else if (edad_dias < 180) {
        if (paso_w == 1) {
            return llenar_5M;
        } else {
            return llenar_3M;
        }
    } else if (edad_dias < 270) {
        if (paso_w == 1) {
            return llenar_8M;
        } else {
            return llenar_5M;
        }
    } else if (edad_dias < 365) {
        if (paso_w == 1) {
            return llenar_11M;
        } else {
            return llenar_8M;
        }
    } else if (edad_dias < 455) {
        if (paso_w == 1) {
            return llenar_14M;
        } else {
            return llenar_11M;
        }
    } else if (edad_dias < 548) {
        if (paso_w == 1) {
            return llenar_17M;
        } else {
            return llenar_14M;
        }
    } else if (edad_dias < 730) {
        if (paso_w == 1) {
            return llenar_23M;
        } else {
            return llenar_17M;
        }
    } else if (edad_dias < 913) {
        if (paso_w == 1) {
            return llenar_29M;
        } else {
            return llenar_23M;
        }
    } else if (edad_dias < 1095) {
        if (paso_w == 1) {
            return llenar_35M;
        } else {
            return llenar_23M;
        }
    } else if (edad_dias < 1277) {
        if (paso_w == 1) {
            return llenar_41M;
        } else {
            return llenar_35M;
        }
    } else if (edad_dias < 1459) {
        if (paso_w == 1) {
            return llenar_47M;
        } else {
            return llenar_35M;
        }
    } else if (edad_dias < 1642) {
        if (paso_w == 1) {
            return llenar_53M;
        } else {
            return llenar_47M;
        }
    } else if (edad_dias < 1825) {
        if (paso_w == 1) {
            return llenar_59M;
        } else {
            return llenar_53M;
        }
    } else if (edad_dias < 2007) {
        if (paso_w == 1) {
            return llenar_65M;
        } else {
            return llenar_59M;
        }
    } else {
        if (paso_w == 1) {
            return llenar_72M;
        } else {
            return llenar_65M;
        }
    }
}

function _editCedula(cod) {
    if (!isNaN(cod)) cod = new Intl.NumberFormat("ja-JP").format(cod);
    return cod;
}

var filtroArray = {
    tablasHC: ["tabla_tto_sifi", "tabla_segui_serol", "tabla_diagn", "tabla_diag_egr"],
    tablasEvo: ["tabla_cups", "tabla_formu", "tabla_diag", "tabla_cups_ant"],
    tabla9011: ["tabla_9011_"],
    tabla9501: ["des_test_act", "des_test_act_ant", "tabla_controles", "tabla_inter"],
    tabla4040: ["tabla_vih_esq_w", "tabla_serolo_esq_w", "tabla_hemogl_esq_w", "tabla_igg_esq_w", "tabla_glicem_esq_w", "tabla_hemogra_esq_w", "tabla_hemopara_esq_w", "tabla_fta_abs_esq_w", "tabla_uroanali_esq_w", "tabla_uroculti_esq_w", "tabla_frotisv_esq_w", "tabla_glicemia_esq_w", "tabla_vdrl_esq_w", "tabla_glucosa_esq_w", "tabla_ptog_esq_w", "tabla_gota_grues_esq_w", "tabla_estrep_b_esq_w", "tabla_igm_esq_w", "tabla_rubeo_igg_esq_w", "tabla_rubeo_igm_esq_w", "tabla_chagas_tot_esq_w", "tabla_chagas_sint_esq_w", "tabla_tsh_esq_w", "tabla_citolo_cerv_esq_w"],
    clap: ["tabla_gest", "trabajo_parto", "tabla_trim", "tabla_enfermedades", "enf_rec", "puerperio"],
    tabla9520: ["limit", "lab_tab_anter"]
}

function _getObjetoSaveEvo(data) {
    let obj = JSON.parse(JSON.stringify(data));

    for (let i in obj.tabla_formu) {
        let datos_env = _getValuesSaveHc(obj.tabla_formu[i], []);
        delete datos_env['descrip_cod'];
        obj.tabla_formu[i] = datos_env;
    }

    let datos = _getObjetoSaveHc(obj, filtroArray.tablasEvo)
    return datos;
}

function _getObjetoSaveHc(data, filtro = []) {
    let obj = JSON.parse(JSON.stringify(data));
    let datos_env = _getValuesSaveHc(obj, filtro);
    datos_env.datosh = datosEnvio() + localStorage.Usuario + "|";
    return datos_env;
}

var _getValuesSaveHc = function (obj, filtro) {
    var datos = {};

    Object.keys(obj).forEach((el) => {
        let tipo = typeof obj[el];
        if (tipo === "object") {
            if (filtro.indexOf(el) !== -1) {
                let filtro_data = obj[el];
                filtro_data.forEach((i, index) => {
                    let name = el + (index + 1).toString().padStart(3, "0");
                    let string = "";
                    Object.keys(i).forEach((j) => {
                        string += i[j] + "|";
                    });
                    datos[name] = string;
                });
            } else {
                if (obj[el] != null) {
                    datos = Object.assign(datos, _getValuesSaveHc(obj[el], filtro));
                }
            }
        } else if (tipo === "string" || tipo == "number") {
            if (!datos[el]) {
                let data_string = _reemplazoCaracEsp(obj[el]);
                datos[el] = _reemplazoEnterXCarac(data_string);
            }
        }
    });

    return datos;
};

function getObjectDate(dato) {
    dato = (dato).toString().padStart(8, "0")

    return {
        ano_w: dato.slice(0, 4),
        mes_w: dato.slice(4, 6),
        dia_w: dato.slice(6)
    }
}

function getObjectHour(dato) {
    dato = (dato).toString().padStart(4, "0");

    return {
        hora_w: dato.slice(0, 2),
        min_w: dato.slice(2, 4)
    }
}

function nivel_estudio_mainHc(e) {
    switch (e) {
        case "1":
            e = "NINGUNA";
            break;
        case "2":
            e = "PRE-ESCOLAR";
            break;
        case "3":
            e = "PRIMARIA";
            break;
        case "4":
            e = "SECUNDARIA";
            break;
        case "5":
            e = "BACHILLER BASI";
            break;
        case "6":
            e = "BACHILLER TECN";
            break;
        case "7":
            e = "NORMALISTA";
            break;
        case "8":
            e = "TECNICA PROFES";
            break;
        case "9":
            e = "TECNOLOGIA";
            break;
        case "A":
            e = "PROFESIONAL";
            break;
        case "B":
            e = "ESPECIALIZACIO";
            break;
        case "C":
            e = "MAESTRIA";
            break;
        case "D":
            e = "DOCTORADO";
            break;
        default:
            e = " ";
            break;
    }
    return e;
}

function resultado_citologia(e) {
    switch (e.toString()) {
        case "1":
            e = "NORMAL";
            break;
        case "2":
            e = "ANORMAL";
            break;
        case "3":
            e = "NO APLICA";
            break;
        case "4":
            e = "NO SABE";
            break;
        default:
            e = " ";
            break;
    }
    return e;
}

function consult_finalidad(e) {
    console.log(e, 'e')
    switch (parseInt(e)) {
        case 0:
            e = " ";
            break;
        case 1:
            e = "ATENCION PARTO";
            break;
        case 2:
            e = "ATENCION REC.NACID";
            break;
        case 3:
            e = "ATENC.PLANIF.FAMIL";
            break;
        case 4:
            e = "DET.ALT CRECIM <10";
            break;
        case 5:
            e = "DET.ALT.DESA.JOVEN";
            break;
        case 6:
            e = "DET.ALT.EMBARAZO";
            break;
        case 7:
            e = "DET.ALT. ADULTO";
            break;
        case 8:
            e = "DET.ALT.AGUD.VISUA";
            break;
        case 9:
            e = "DET.ENFERM.PROFES.";
            break;
        case 10:
            e = "NO APLICA";
            break;
        case 11:
            e = "PATOLOGIA CRONICA";
            break;
        default:
            e = " ";
            break;
    }
    return e;
}

function consult_estado_sal(e) {
    switch (parseInt(e)) {
        case 1: return 'VIVO (A)';
        case 2: return 'MUERTO (A)';
        case 3: return 'REMITIDO A';
        case 4: return 'HOSPITALIZADO';
        case 5: return 'OBSERVACION';
        default: return '';
    }
}

function conversiones_PT_TIPICA_PYP2(area, pt_directa, rango) {
    let tablas = {
        MG: {
            0: [2],
            1: [13, 0],
            2: [25, 11],
            3: [36, 21],
            4: [48, 31, 8],
            5: [59, 41, 16, 0],
            6: [71, 51, 25, 8],
            7: [82, 61, 33, 15, 2],
            8: [93, 72, 42, 22, 9],
            9: [105, 82, 50, 29, 15, 1],
            10: [116, 92, 58, 37, 22, 6],
            11: [128, 102, 67, 44, 28, 12],
            12: [139, 112, 75, 51, 35, 17, 3],
            13: [150, 122, 84, 58, 41, 23, 8],
            14: [162, 132, 92, 66, 47, 29, 13],
            15: [173, 143, 100, 73, 54, 34, 18, 3],
            16: [185, 153, 109, 80, 60, 40, 23, 7],
            17: [196, 163, 117, 88, 67, 46, 28, 12],
            18: [208, 173, 126, 95, 73, 51, 33, 16, 2],
            19: [219, 183, 134, 102, 80, 57, 38, 21, 6],
            20: [230, 193, 142, 109, 86, 63, 43, 25, 11, 2],
            21: [242, 204, 151, 117, 93, 68, 48, 30, 15, 7],
            22: [253, 214, 159, 124, 99, 74, 53, 34, 19, 11],
            23: [265, 224, 168, 131, 106, 80, 58, 39, 24, 16],
            24: [276, 234, 176, 138, 112, 85, 63, 43, 28, 20],
            25: [287, 244, 185, 146, 119, 91, 68, 48, 33, 25],
            26: [299, 254, 193, 153, 125, 97, 73, 52, 37, 30, 4],
            27: [310, 265, 201, 160, 132, 102, 78, 57, 41, 34, 10],
            28: [322, 275, 210, 167, 138, 108, 83, 61, 46, 39, 17],
            29: [333, 285, 218, 175, 144, 114, 88, 66, 50, 43, 23],
            30: [345, 295, 227, 182, 151, 119, 93, 70, 54, 48, 30],
            31: [356, 305, 235, 189, 157, 125, 98, 75, 59, 53, 36],
            32: [367, 315, 243, 197, 164, 131, 103, 79, 63, 57, 43],
            33: [379, 325, 252, 204, 170, 136, 108, 84, 68, 62, 49, 11],
            34: [390, 336, 260, 211, 177, 142, 113, 88, 72, 66, 56, 24],
            35: [402, 346, 269, 218, 183, 148, 118, 96, 76, 71, 62, 37],
            36: [413, 356, 277, 226, 190, 153, 123, 97, 81, 76, 69, 51],
        },

        MF: {
            0: [0, 4],
            1: [12, 11, 5],
            2: [32, 19, 11],
            3: [52, 26, 17, 2],
            4: [72, 33, 23, 8],
            5: [92, 40, 29, 15, 0],
            6: [112, 47, 34, 21, 7],
            7: [132, 55, 40, 27, 13],
            8: [152, 62, 46, 33, 20, 5],
            9: [172, 69, 52, 39, 26, 11],
            10: [192, 76, 58, 46, 32, 17],
            11: [212, 83, 64, 52, 39, 23],
            12: [232, 91, 70, 58, 45, 29],
            13: [252, 98, 76, 64, 52, 34, 7],
            14: [272, 105, 82, 70, 58, 40, 14],
            15: [292, 112, 88, 77, 65, 46, 21],
            16: [312, 119, 94, 83, 71, 52, 28, 4],
            17: [332, 127, 100, 89, 77, 58, 35, 10],
            18: [352, 134, 106, 95, 84, 64, 42, 16],
            19: [372, 141, 112, 101, 90, 70, 50, 23, 1],
            20: [392, 148, 118, 108, 97, 76, 57, 29, 6],
            21: [412, 155, 124, 114, 103, 82, 64, 35, 11],
            22: [432, 163, 130, 120, 110, 88, 71, 41, 17],
            23: [452, 170, 136, 126, 116, 94, 48, 47, 22, 4],
            24: [472, 177, 142, 132, 122, 100, 85, 53, 28, 11],
            25: [492, 184, 148, 139, 129, 106, 93, 59, 33, 17, 5],
            26: [512, 191, 154, 145, 135, 112, 100, 65, 39, 23, 11],
            27: [532, 199, 160, 151, 142, 118, 107, 71, 44, 30, 17, 0],
            28: [552, 206, 166, 157, 148, 124, 114, 77, 49, 36, 23, 9],
            29: [572, 213, 172, 163, 155, 130, 121, 83, 55, 43, 29, 18],
            30: [592, 220, 178, 170, 161, 136, 129, 89, 60, 49, 35, 28],
            31: [612, 227, 184, 176, 168, 142, 136, 96, 66, 55, 41, 37],
            32: [632, 235, 190, 182, 174, 148, 143, 102, 71, 62, 47, 46],
            33: [652, 242, 196, 188, 180, 154, 150, 108, 77, 68, 53, 55],
            34: [672, 249, 202, 194, 187, 160, 157, 114, 82, 75, 59, 64],
            35: [692, 256, 208, 201, 193, 166, 164, 120, 88, 81, 65, 73],
            36: [712, 263, 214, 207, 200, 172, 172, 126, 93, 87, 71, 82],
        },

        AL: {
            0: [],
            1: [],
            2: [10, 3],
            3: [20, 12, 1],
            4: [30, 22, 9],
            5: [40, 31, 17, 6],
            6: [50, 40, 25, 13, 4],
            7: [60, 49, 33, 20, 11],
            8: [70, 58, 41, 27, 17, 5],
            9: [80, 67, 49, 34, 23, 11],
            10: [90, 77, 56, 42, 30, 16, 3],
            11: [100, 86, 64, 49, 36, 22, 8],
            12: [110, 95, 72, 56, 43, 28, 13],
            13: [120, 104, 80, 63, 49, 34, 18, 1],
            14: [130, 113, 88, 70, 56, 39, 23, 5],
            15: [140, 123, 96, 77, 62, 45, 28, 10],
            16: [150, 132, 104, 84, 69, 51, 34, 15],
            17: [160, 141, 112, 91, 75, 57, 39, 19],
            18: [170, 150, 120, 98, 82, 63, 44, 24, 4],
            19: [180, 159, 128, 105, 88, 68, 49, 29, 8],
            20: [190, 168, 136, 113, 94, 74, 54, 33, 13, 2],
            21: [200, 178, 144, 120, 101, 80, 59, 38, 17, 6],
            22: [210, 187, 152, 127, 107, 86, 65, 43, 22, 11],
            23: [220, 196, 160, 134, 114, 91, 70, 47, 26, 15],
            24: [230, 205, 168, 141, 120, 97, 75, 52, 31, 20],
            25: [240, 214, 176, 148, 127, 103, 80, 57, 35, 25, 1],
            26: [250, 224, 184, 155, 133, 109, 85, 61, 40, 29, 7],
            27: [260, 233, 192, 162, 140, 114, 90, 66, 44, 34, 12],
            28: [270, 242, 200, 169, 146, 120, 96, 71, 49, 38, 18],
            29: [280, 251, 208, 176, 153, 126, 101, 75, 53, 43, 24, 6],
            30: [290, 260, 216, 184, 159, 132, 106, 80, 58, 48, 29, 14],
            31: [300, 270, 224, 191, 166, 137, 111, 85, 62, 52, 35, 22],
            32: [310, 279, 232, 198, 172, 143, 116, 89, 67, 57, 41, 31],
            33: [320, 288, 240, 205, 178, 149, 121, 94, 71, 62, 46, 39],
            34: [330, 297, 248, 212, 185, 155, 127, 99, 76, 66, 52, 47],
            35: [340, 306, 256, 219, 191, 161, 132, 104, 80, 71, 58, 55],
            36: [350, 315, 264, 226, 198, 166, 137, 108, 85, 75, 63, 64],
        },

        PS: {
            0: [],
            1: [8, 3],
            2: [17, 11, 1],
            3: [25, 18, 8],
            4: [34, 26, 14, 6],
            5: [42, 34, 21, 11, 4],
            6: [50, 41, 27, 17, 9],
            7: [59, 49, 34, 23, 14, 4],
            8: [67, 57, 40, 29, 20, 9],
            9: [76, 64, 47, 34, 25, 14, 2],
            10: [84, 72, 53, 40, 30, 18, 6],
            11: [92, 79, 60, 46, 35, 23, 10],
            12: [101, 87, 67, 52, 41, 28, 15],
            13: [109, 95, 73, 58, 46, 32, 19, 3],
            14: [118, 102, 80, 63, 51, 37, 23, 7],
            15: [126, 110, 86, 69, 56, 42, 27, 11],
            16: [134, 118, 93, 75, 61, 46, 31, 15],
            17: [143, 125, 99, 81, 67, 51, 36, 19],
            18: [151, 133, 106, 86, 72, 56, 40, 22, 3],
            19: [160, 141, 112, 92, 77, 60, 44, 26, 7],
            20: [168, 148, 119, 98, 82, 65, 48, 30, 11],
            21: [176, 156, 125, 104, 88, 70, 52, 34, 15, 3],
            22: [185, 163, 132, 110, 93, 74, 57, 38, 19, 7],
            23: [193, 171, 138, 115, 98, 79, 61, 42, 23, 12],
            24: [202, 179, 145, 121, 103, 84, 65, 46, 27, 16],
            25: [210, 186, 152, 127, 109, 88, 69, 50, 31, 20],
            26: [218, 194, 158, 133, 114, 93, 74, 54, 35, 24],
            27: [227, 202, 165, 138, 119, 98, 78, 57, 39, 29],
            28: [235, 209, 171, 144, 124, 102, 82, 61, 43, 33, 6],
            29: [244, 217, 178, 150, 130, 107, 86, 65, 47, 37, 12],
            30: [252, 225, 184, 156, 135, 112, 90, 69, 50, 41, 19],
            31: [260, 232, 191, 162, 140, 116, 95, 73, 54, 46, 26],
            32: [269, 240, 197, 167, 145, 121, 99, 77, 58, 50, 33],
            33: [277, 248, 204, 173, 150, 126, 103, 81, 62, 54, 39, 18],
            34: [286, 255, 210, 179, 156, 130, 107, 85, 66, 58, 46, 39],
            35: [294, 263, 217, 185, 161, 135, 111, 89, 70, 62, 53, 61],
            36: [302, 270, 223, 190, 166, 140, 116, 92, 74, 67, 59, 82],
        },
    };

    return tablas[area][pt_directa][rango - 1] || "";
}

async function rangoEdad_mainHc(edad_edit_ws) {
    // rango 1 (0 dias - 1 mes y 0 dias)
    if (edad_edit_ws <= 100) {
        return 1;
    }

    // rango 2 (1 mes y 1 dia - 3 meses y 0 dias)
    if (edad_edit_ws >= 101 && edad_edit_ws <= 300) {
        return 2;
    }

    // rango 3 (3 meses y 1 dia - 6 meses y 0 dias)
    if (edad_edit_ws >= 301 && edad_edit_ws <= 600) {
        return 3;
    }

    // rango 4 (6 meses y 1 dia - 9 meses y 0 dias)
    if (edad_edit_ws >= 601 && edad_edit_ws <= 900) {
        return 4;
    }

    // rango 5 (9 meses y 1 dia - 12 meses y 0 dias)
    if (edad_edit_ws >= 901 && edad_edit_ws <= 10000) {
        return 5;
    }

    // rango 6 (12 meses y 1 dia - 18 meses y 0 dias)
    if (edad_edit_ws >= 10001 && edad_edit_ws <= 10600) {
        return 6;
    }

    // rango 7 (18 meses y 1 dia - 24 meses y 0 dias)
    if (edad_edit_ws >= 10601 && edad_edit_ws <= 20000) {
        return 7;
    }

    // rango 8 (24 meses y 1 dia - 36 meses y 0 dias)
    if (edad_edit_ws >= 20001 && edad_edit_ws <= 30000) {
        return 8;
    }

    // rango 9 (36 meses y 1 dia - 48 meses y 0 dias)
    if (edad_edit_ws >= 30001 && edad_edit_ws <= 40000) {
        return 9;
    }

    // rango 10 (48 meses y 1 dia - 60 meses y 0 dias)
    if (edad_edit_ws >= 40001 && edad_edit_ws <= 50000) {
        return 10;
    }

    // rango 11 (60 meses y 1 dia - 72 meses y 0 dias)
    if (edad_edit_ws >= 50001 && edad_edit_ws <= 60000) {
        return 11;
    }

    // rango 12 (72 meses y 1 dia - 84 meses y 0 dias)
    if (edad_edit_ws >= 60001 && edad_edit_ws <= 70000) {
        return 12;
    }
}