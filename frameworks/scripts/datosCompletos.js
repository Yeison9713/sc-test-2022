(function ($) {
    $.datoscompletos = {
        dll: [],
        callback: null,
        callbackerror: null,
        objLocal: '',
        estado: null,

        _init: (dll, callbackSucces, estado, callbackError) => {
            dll == undefined ? $.datoscompletos.dll = console.error('No tiene ningún DLL') : $.datoscompletos.dll = dll;
            dll.usuario ? dll.usuario = dll.usuario : false
            estado == undefined ? $.datoscompletos.estado = '' : $.datoscompletos.estado = estado.toUpperCase();
            $.datoscompletos.callback = callbackSucces;
            callbackError == undefined ? $.datoscompletos.callbackerror = _toggleNav : $.datoscompletos.callbackerror = callbackError;

            $.datoscompletos._consulta(dll);
            $.datoscompletos._cargando();
        },

        _consulta: (dll) => {
            DLLS = {
                'ENFERMEDADES': 'SALUD/SER851',
                'PACIENTES': 'SALUD/SER810',
                'ENTIDADES': 'SALUD/SER853',
                'OCUPACIONES': 'SALUD/SER854',
                'CIUDADES': 'CONTAB/CON809',
                'DESTINOS': 'CONTAB/CON809L',
                'PROFESIONALES': 'SALUD/SER819',
                'TERCEROS': 'CONTAB/CON802',
                'DIVISION': 'INVENT/INV809-03',
                'IPS': 'SALUD/SER813',
                'NUMERACION': 'SALUD/SER808',// SI REQUIERE FILTRO
                'SERV_HOSP': 'SALUD/SER812',
                'ZONAS_RUTAS': 'CONTAB/CON810', // SI REQUIERE FILTRO
                'PATOLOGIAS': 'SALUD/SER858',
                'PAISES_RIPS': 'SALUD/SER888',
                'UNSERV': 'SALUD/SER873',
                'COSTOS': 'CONTAB/CON803',
                'ARTICULOS': 'INVENT/INV803',
                'FIRMAS': 'CONTAB/CON110Y',
                'TABLAS': 'SALUD/SER802',
                'GRUPO-SER': 'SALUD/SER801',
                'CTA-MAYOR': 'CONTAB/CON801',
                'ETNIAS': 'SALUD/SER867',
                'COLEGIOS': 'SALUD/SER902',
                'CLASIPACI': 'SALUD/SER868',
                'PREFIJOS': 'INVENT/INV109',
                'LOTES': 'CONTAB/CON110I',
                'GRUPOTAR': 'SALUD/SER803',
                'LOCALIZACION': 'INVENT/INV801',
                'GRNEGOCIO': 'CONTAB/CON818',
                'CLASC': 'CONTAB/CON810S',
                'VENDEDOR': 'CONTAB/CON805',
                'USO': 'INVENT/INV806',
                'POLIT': 'INVENT/INV807',
                'GRUPOS': 'INVENT/INV804',
                'COSTO': 'CONTAB/CON803-01',
                'ESPECIALIDAD': 'SALUD/SER855',
                'SUCURSALES': 'CONTAB/CON823',
                'OPERADOR': 'CONTAB/CON982',
                'MEDATC': 'SALUD/SER857',
                'GRCAPITA': 'SALUD/SER871',
                'COMUNIDADES': 'SALUD/SER116A',
                'RESGUARDOS': 'SALUD/SER117A',
                'EQUIOPERADOR': 'SALUD/SER11V',
                'TARIFAS': 'SALUD/SER804',
                'DESPLAZADO': 'SALUD/SER810D',
                'ESPCUPS': 'SALUD/SER11A-C',
                'CUPS': 'SALUD/SER802C',
                'MEDICAMENTOS': 'SALUD/SER104C',//TABLA DE MEDICAMENTOS
                'SALDOS': 'INVENT/INV507',
                'ENVIOS': 'SALUD/SER846', // REQUIERE FILTRO
                'ELECENVIOS': 'SALUD/SER846G', // REQUIERE FILTRO
                'FURIPS': 'SALUD/SER846F', // REQUIERE FILTRO
                'BARRIOS': 'SALUD/SER904',
                'ARTCONVENIO': 'SALUD/SER104CV',  ////////NO EXISTE DLL
                'TRANSACCIONES': 'INVENT/INV802',
                'ORDENES_COMPRA': 'INVENT/INV827',
                'ORDENES_SERV': 'INVENT/INV826A',
                'MOVIM_PRE': 'PRESUP/PRE802',
                'CARROS': 'SALUD/CER101',
                'HORAR': 'SALUD/SER819H',// REQUIERE FILTRO
                'CLASES': 'INVENT/INV806',
                'ACTIVIDADES': 'CONTAB/CON806',
                'CONTRATOS': 'SALUD/SER872',
                'HOJA_VIDA': 'MANT/MANT800',
                'PROTOCOLOS_MANT': 'MANT/MANT802',
                'PRODUCION_MANT': 'MANT/MANT502',
                'COMPROBSALDO': 'SALUD/INV805B', // REQUIERE FILTRO
                'CARTERANIT': 'INVENT/INV805E', // REQUIERE FILTRO
                'EVOL_PACI': 'HICLIN/HC705B',//  REQUIERE FILTRO | * EVOLUCIONES X PACIENTE
                'MOTIVOSGLOSA': 'SALUD/SER-A81',
                'MACROSGLOSA': 'SALUD/SER-A82',
                'GLOSAENTIDAD': 'SALUD/SER-A83',
                'RADICGLOSAS': 'SALUD/SER-A84',
                'GLOSASFACT': 'SALUD/SER-A83F',
                'SISVAN': 'SALUD/SER134',
                'ESTADO': 'SALUD/SAL810',
                'FARMACOS': 'SALUD/SER809',
                'TABLAS-OMS': 'SALUD/AIE-DESA',
                'ENF-TRANSMI': 'SALUD/SER753A',
                'CAMAS': 'HICLIN/HC809',
                'ANEXO3': 'SALUD/SER4B82',
                'EVOLUCIONES': 'HICLIN/HC002B', // REQUIERE FILTRO: LLAVE-HC - ORDEN ** 1 - BUSQ X FOLIO (DATOS RESUMIDOS), 2 - BUSQ X PACIENTE (DATOS RESUMIDOS), 3 - BUSQ X FOLIO (DATOS COMPLETOS) **
                'HCPAC': 'HICLIN/HC_PRC', // REQUIERE FILTRO: LLAVE-HC - OPERADOR
                'HCDETAL_PRC': 'HICLIN/HCDETAL_PRC', // REQUIERE FILTRO
                'PROFESION': {
                    'PROFESION': [
                        { 'COD': '1', 'DESCRIP': 'MEDICO ESPECIALISTA' },
                        { 'COD': '2', 'DESCRIP': 'MEDICO GENERAL' },
                        { 'COD': '3', 'DESCRIP': 'ENFERMERO(A) JEFE' },
                        { 'COD': '4', 'DESCRIP': 'AUXILIAR ENFERMERIA' },
                        { 'COD': '5', 'DESCRIP': 'TERAPEUTAS Y OTROS' },
                        { 'COD': '6', 'DESCRIP': 'ENFERMERA JEFE P Y P' },
                        { 'COD': '7', 'DESCRIP': 'PSICOLOGIA' },
                        { 'COD': '8', 'DESCRIP': 'NUTRICIONISTA' },
                        { 'COD': '9', 'DESCRIP': 'NO APLICA' },
                        { 'COD': 'A', 'DESCRIP': 'ODONTOLOGO' },
                        { 'COD': 'B', 'DESCRIP': 'AUDITOR MEDICO' },
                        { 'COD': 'H', 'DESCRIP': 'HIGIENE ORAL' },
                        { 'COD': 'I', 'DESCRIP': 'INSTRUMENTADOR(A)' },
                        { 'COD': 'O', 'DESCRIP': 'OPTOMETRA' },
                        { 'COD': 'T', 'DESCRIP': 'TRABAJO SOCIAL' },
                    ]
                },
                'FORMAPAGO': {
                    'FORMAPAGO': [
                        { 'COD': 'E', 'DESCRIP': 'EFECTIVO' },
                        { 'COD': 'C', 'DESCRIP': 'CREDITO' },
                        { 'COD': 'P', 'DESCRIP': 'PENSIONADO' },
                        { 'COD': 'A', 'DESCRIP': 'AMBULATORIO' },
                        { 'COD': 'T', 'DESCRIP': 'ACC.TRANS' },
                    ]
                },
                'SERVICIOS': {
                    'SERVICIOS': [
                        { 'COD': '0', 'DESCRIPCION': 'DROGUERIA' },
                        { 'COD': '1', 'DESCRIPCION': 'CIRUGIAS' },
                        { 'COD': '2', 'DESCRIPCION': 'LAB. Y OTROS DIAG.' },
                        { 'COD': '3', 'DESCRIPCION': 'RX - IMAGENOLOGIA' },
                        { 'COD': '4', 'DESCRIPCION': 'OTROS SERVICIOS' },
                        { 'COD': '5', 'DESCRIPCION': 'CONSULTAS Y TERAPIAS' },
                        { 'COD': '6', 'DESCRIPCION': 'PATOLOGIA' },
                        { 'COD': '7', 'DESCRIPCION': 'PROMOCION Y PREVENCION' },
                    ]
                },
                'SUBCUENTASINGRESOSOPER': () => { // SER-A851 || SER-A854
                    if ($_USUA_GLOBAL[0].PUC == '3') {
                        return valor = {
                            'CUENTAS': [
                                { 'COD': '05', 'DESCRIP': 'URGENCIAS' },
                                { 'COD': '10', 'DESCRIP': 'CONSULTA EXTERNA' },
                                { 'COD': '15', 'DESCRIP': 'HOSPITALIZACION' },
                                { 'COD': '20', 'DESCRIP': 'QUIROFANO' },
                                { 'COD': '25', 'DESCRIP': 'APOYO DIAGNOSTICO' },
                                { 'COD': '30', 'DESCRIP': 'APOYO TERAPEUTICO' },
                                { 'COD': '35', 'DESCRIP': 'FARMACIA' },
                            ]
                        }
                    } else {
                        return valor = {
                            'CUENTAS': [
                                { 'COD': '08', 'DESCRIP': 'URGENCIAS' },
                                { 'COD': '09', 'DESCRIP': 'OBSERVACION URGENC.' },
                                { 'COD': '17', 'DESCRIP': 'CONSULTA EXTERNA' },
                                { 'COD': '18', 'DESCRIP': 'CONSULTA ESPECIALIZ' },
                                { 'COD': '19', 'DESCRIP': 'SALUD ORAL' },
                                { 'COD': '20', 'DESCRIP': 'PROMOCION Y PREVENC' },
                                { 'COD': '21', 'DESCRIP': 'OTR ACTIV EXTRAMUR' },
                                { 'COD': '27', 'DESCRIP': 'HOSP. ESTANCIA GEN' },
                                { 'COD': '28', 'DESCRIP': 'HOSP. CUIDADO INTEN' },
                                { 'COD': '29', 'DESCRIP': 'HOSP. CUIDADO INTER' },
                                { 'COD': '30', 'DESCRIP': 'HOSP. NEONATOS' },
                                { 'COD': '31', 'DESCRIP': 'HOSP. SALUD MENTAL' },
                                { 'COD': '32', 'DESCRIP': 'HOSP. QUEMADOS' },
                                { 'COD': '33', 'DESCRIP': 'HOSP. OTR CIUD.ESP' },
                                { 'COD': '36', 'DESCRIP': 'QUIROFANO' },
                                { 'COD': '37', 'DESCRIP': 'SALAS DE PARTO' },
                                { 'COD': '46', 'DESCRIP': 'LABORATORIO CLINICO' },
                                { 'COD': '47', 'DESCRIP': 'IMAGENOLOGIA' },
                                { 'COD': '48', 'DESCRIP': 'PATOLOGIA' },
                                { 'COD': '49', 'DESCRIP': 'OTROS APOYOS DIAGN' },
                                { 'COD': '56', 'DESCRIP': 'APOYO TERAPEUTICO' },
                                { 'COD': '58', 'DESCRIP': 'BANCO DE SANGRE' },
                                { 'COD': '59', 'DESCRIP': 'UNIDAD RENAL' },
                                { 'COD': '60', 'DESCRIP': 'UNIDAD HEMODINAMIA' },
                                { 'COD': '62', 'DESCRIP': 'FARMACIA' },
                                { 'COD': '63', 'DESCRIP': 'OTRO APOYO TERAPEUT' },
                                { 'COD': '88', 'DESCRIP': 'ANCIANATOS Y ALBERG' },
                                { 'COD': '89', 'DESCRIP': 'CENTROS DE SALUD' },
                                { 'COD': '94', 'DESCRIP': 'AMBULANCIAS' },
                                { 'COD': '95', 'DESCRIP': 'OTROS SERV. SALUD' },
                            ]
                        }
                    }
                },
                'TIPOID': {
                    'IDENTIFICACION': [
                        { 'COD': "CC ", 'DESCRIP': "CEDULA CIUDADANIA" },
                        { 'COD': "CE ", 'DESCRIP': "CEDULA EXTRANJERIA" },
                        { 'COD': "PA ", 'DESCRIP': "NUMERO PASAPORTE" },
                        { 'COD': "RC ", 'DESCRIP': "REGISTRO CIVIL" },
                        { 'COD': "TI ", 'DESCRIP': "TARJETA IDENTIDAD" },
                        { 'COD': "ASI", 'DESCRIP': "ADULTO SIN IDENT" },
                        { 'COD': "MSI", 'DESCRIP': "MENOR SIN IDENT" },
                        { 'COD': "NUI", 'DESCRIP': "NUM UNICO IDENT. NUID" },
                        { 'COD': "CD ", 'DESCRIP': "CARNET DIPLOMA" },
                        { 'COD': "SC ", 'DESCRIP': "SALVO CONDUCTO" },
                        { 'COD': "PE ", 'DESCRIP': "PERMISO ESPECIAL PERM" },
                        { 'COD': "CN ", 'DESCRIP': "CERTIFICADO NACIDO VIVO" }
                    ]
                },
                'ESTADOCIVIL': {
                    'ESTADOCIVIL': [
                        { 'COD': "S", 'DESCRIP': "SOLTERO" },
                        { 'COD': "C", 'DESCRIP': "CASADO" },
                        { 'COD': "U", 'DESCRIP': "UNION LIBRE" },
                        { 'COD': "V", 'DESCRIP': "VIUDO" },
                        { 'COD': "D", 'DESCRIP': "SEPARADO" }
                    ]
                },
                'NIVELESTUDIO': {
                    'NIVELESTUDIO': [
                        { 'COD': "1", 'DESCRIP': "NINGUNO" },
                        { 'COD': "2", 'DESCRIP': "PRE-ESCOLAR" },
                        { 'COD': "3", 'DESCRIP': "PRIMARIA" },
                        { 'COD': "4", 'DESCRIP': "SECUNDARIA" },
                        { 'COD': "5", 'DESCRIP': "BACH. BASICO" },
                        { 'COD': "6", 'DESCRIP': "BACH. TECNICO" },
                        { 'COD': "7", 'DESCRIP': "NORMALISTA" },
                        { 'COD': "8", 'DESCRIP': "TECN.PROFE" },
                        { 'COD': "9", 'DESCRIP': "TECNOLOGIA" },
                        { 'COD': "A", 'DESCRIP': "PROFESIONAL" },
                        { 'COD': "B", 'DESCRIP': "ESPECIALI" },
                        { 'COD': "C", 'DESCRIP': "MAESTRIA" },
                        { 'COD': "D", 'DESCRIP': "DOCTORADO" }
                    ]
                },
                'ESTRATO': {
                    'ESTRATO': [
                        { "COD": "0", "DESCRIP": "NIVEL 0" },
                        { "COD": "1", "DESCRIP": "NIVEL 1" },
                        { "COD": "2", "DESCRIP": "NIVEL 2" },
                        { "COD": "3", "DESCRIP": "NIVEL 3" },
                        { "COD": "4", "DESCRIP": "NIVEL 4" },
                        { "COD": "5", "DESCRIP": "NIVEL 5" },
                        { "COD": "6", "DESCRIP": "NIVEL 6" }
                    ]
                },
                'TIPOUSUARIO': () => { /// SER824 - SER824A
                    if ($_USUA_GLOBAL[0].NIT == 900004059) {
                        return tipo = {
                            'TIPOUSUARIO': [
                                { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
                                { "COD": "S", "DESCRIP": "SUBSIDIADO" },
                                { "COD": "V", "DESCRIP": "VINCULADO" },
                                { "COD": "P", "DESCRIP": "PARTICULAR" },
                                { "COD": "O", "DESCRIP": "OTRO TIPO" },
                                { "COD": "D", "DESCRIP": "DESPLAZ CONT" },
                                { "COD": "E", "DESCRIP": "DESPLAZ SUBS" },
                                { "COD": "G", "DESCRIP": "DESPLAZ VINC" }
                            ]
                        }
                    } else {
                        return tipo = {
                            'TIPOUSUARIO': [
                                { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
                                { "COD": "S", "DESCRIP": "SUBSIDIADO" },
                                { "COD": "V", "DESCRIP": "VINCULADO" },
                                { "COD": "P", "DESCRIP": "PARTICULAR" },
                                { "COD": "O", "DESCRIP": "OTRO TIPO" },
                                { "COD": "D", "DESCRIP": "DESPLAZ CONT" },
                                { "COD": "E", "DESCRIP": "DESPLAZ SUBS" },
                                { "COD": "G", "DESCRIP": "DESPLAZ VINC" }
                            ]
                        }
                    }
                },
                'ETNIA': {
                    'ETNIA': [
                        { "COD": "1", "DESCRIP": "INDIGENA" },
                        { "COD": "2", "DESCRIP": "RAIZAL" },
                        { "COD": "3", "DESCRIP": "GITANO" },
                        { "COD": "4", "DESCRIP": "AFROCO" },
                        { "COD": "5", "DESCRIP": "ROM" },
                        { "COD": "6", "DESCRIP": "MESTIZO" },
                        { "COD": "9", "DESCRIP": "NO APLICA" }
                    ]
                },
                'TIPOAFILIADO': {
                    'TIPOAFILIADO': [
                        { "COD": "1", "DESCRIP": "COTIZANTE" },
                        { "COD": "2", "DESCRIP": "BENEFICIARIO" },
                        { "COD": "3", "DESCRIP": "COT. PENSIONADO" },
                        { "COD": "4", "DESCRIP": "UPC ADICIONAL" },
                        { "COD": "5", "DESCRIP": "CABEZA FAMILIA" },
                        { "COD": "6", "DESCRIP": "GRUPO FAMILIAR" },
                        { "COD": "7", "DESCRIP": "OTRO TIPO" },
                        { "COD": "0", "DESCRIP": "SIN DETERMINAR" }
                    ]
                },
                'PARENTEZCO': {
                    'PARENTEZCO': [
                        { "COD": "00", "DESCRIP": "COTIZANTE" },
                        { "COD": "01", "DESCRIP": "CONYUGUE" },
                        { "COD": "02", "DESCRIP": "HIJO" },
                        { "COD": "03", "DESCRIP": "PADRES" },
                        { "COD": "04", "DESCRIP": "2 GRADO" },
                        { "COD": "05", "DESCRIP": "3 GRADO" },
                        { "COD": "06", "DESCRIP": "< 12" },
                        { "COD": "07", "DESCRIP": "SUEGRO" },
                        { "COD": "08", "DESCRIP": "OTR-BE" },
                    ]
                },
                'DERECHO': {
                    'DERECHO': [
                        { "COD": "1", "DESCRIP": "En base de datos, ACTIVO" },
                        { "COD": "2", "DESCRIP": "En base de datos, INACTIVO" },
                        { "COD": "3", "DESCRIP": "Creado por el  usuario" },
                        { "COD": "4", "DESCRIP": "Pendiente por determinar" },
                        { "COD": "5", "DESCRIP": "En base de datos, SIN CARNET" },
                        { "COD": "6", "DESCRIP": "SUSPENDIDO, requiere autoriz" },
                        { "COD": "7", "DESCRIP": "Afiliado Fallecido" },
                        { "COD": "8", "DESCRIP": "Retiro X Multiafiliado" },
                        { "COD": "9", "DESCRIP": "Ingreso X Traslado" },
                        { "COD": "A", "DESCRIP": "Retiro  X Traslado" },
                        { "COD": "B", "DESCRIP": "Periodo integral" }
                    ]
                },
                'DISCAPACIDAD': {
                    'DISCAPACIDAD': [
                        { "COD": "1", "DESCRIP": "SIN DISCAPACI" },
                        { "COD": "2", "DESCRIP": "DISC.FISICA" },
                        { "COD": "3", "DESCRIP": "DISC.AUDITIVA" },
                        { "COD": "4", "DESCRIP": "DISC.VISUAL" },
                        { "COD": "5", "DESCRIP": "DISC.MENTAL" },
                        { "COD": "6", "DESCRIP": "DISC.COGNITIV" }
                    ]
                },
                'ESTADONUM': {
                    'ESTADONUM': [
                        { "COD": "0", "DESCRIP": "ACTIVO" },
                        { "COD": "1", "DESCRIP": "INACTIVO" },
                        { "COD": "2", "DESCRIP": "ANULADO" },
                        { "COD": "3", "DESCRIP": "BLOQUEO" },
                    ]
                },
                'PAGO': {
                    'PAGO': [
                        { "COD": "1", "DESCRIP": "ACEPTA COPAGO" },
                        { "COD": "2", "DESCRIP": "NO ACEPT COPAGO" },
                        { "COD": "3", "DESCRIP": "COPAGO INGRESO" },
                        { "COD": "4", "DESCRIP": "COPAGO PGP" },
                    ]
                },
                'CLASIF': {
                    'CLASIF': [
                        { "COD": "1", "DESCRIP": "POS" },
                        { "COD": "2", "DESCRIP": "NO POS" },
                        { "COD": "3", "DESCRIP": "NO APLICA" },
                    ]
                },
                'EVENTO': {
                    'EVENTO': [
                        { "COD": "00", "DESCRIP": "NO APLICA" },
                        { "COD": "01", "DESCRIP": "ACCIDENTE DE TRANSI" },
                        { "COD": "02", "DESCRIP": "SISMO" },
                        { "COD": "03", "DESCRIP": "MAREMOTO" },
                        { "COD": "04", "DESCRIP": "ERUPCIONES VOLCANIC" },
                        { "COD": "05", "DESCRIP": "DESLIZAMIENTO TIERR" },
                        { "COD": "06", "DESCRIP": "INUNDACIONES" },
                        { "COD": "07", "DESCRIP": "AVALANCHA" },
                        { "COD": "08", "DESCRIP": "INCENDIO NATURAL" },
                        { "COD": "09", "DESCRIP": "EXPLOSION TERRORIST" },
                        { "COD": "10", "DESCRIP": "INCENDIO TERRORISTA" },
                        { "COD": "11", "DESCRIP": "COMBATE" },
                        { "COD": "12", "DESCRIP": "ATAQUE A MUNICIPIOS" },
                        { "COD": "13", "DESCRIP": "MASACRE" },
                        { "COD": "14", "DESCRIP": "DESPLAZADOS" },
                        { "COD": "15", "DESCRIP": "OTRO" },
                        { "COD": "16", "DESCRIP": "HURACAN" },
                        { "COD": "18", "DESCRIP": "MINA ANTIPERSONAL" },
                    ]
                },
            }
            let ruta = DLLS[dll.nombreFd.toUpperCase()];
            let datos_envio = datosEnvio();
            if (dll.filtro) {
                datos_envio += dll.filtro + '|';
                if (dll.campo) datos_envio += dll.campo + '|';
            }
            if (typeof ruta === 'object' || typeof ruta === 'function') {
                $.datoscompletos.callback(ruta);
            } else {
                var data = {}
                data['datosh'] = datos_envio
                if (dll.usuario) data['usuario'] = localStorage.Usuario
                postData(data, get_url("APP/" + ruta + ".DLL"))
                    .then(data => {
                        // console.log(data)
                        $.datoscompletos.callback(data);
                        if ($.datoscompletos.estado == 'ONLY') {
                            loader('hide');
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        $.datoscompletos.callbackerror();
                    });
            }
        },

        _cargando: () => {
            switch ($.datoscompletos.estado) {
                case 'ON':
                    loader('show');
                    break;
                case 'OFF':
                    loader('hide');
                    break;
                case 'ONLY':
                    loader('show');
                    break;
            }
        }

    },
        obtenerDatosCompletos = function (dll, callbackSucces, estado, callbackError) {
            $.datoscompletos._init(dll, callbackSucces, estado, callbackError);
        }
})(jQuery);