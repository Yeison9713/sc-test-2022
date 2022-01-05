const { param } = require('jquery');

///      IMPRESIONES DE SALUD ///
function FAC145(params, callback) {
    console.debug(params);
    params.LOTE = undefined ? alert('Falta definir el Lote') : (params.LOTE = params.LOTE);
    params.COMPROBANTE = undefined
        ? alert('Falta definir el Comprobante')
        : (params.COMPROBANTE = params.COMPROBANTE);
    params.MAYDEUD1 = undefined
        ? alert('Falta definir el Mayordeu1')
        : (params.MAYDEUD1 = params.MAYDEUD1);
    params.MAYDEUD2 = undefined
        ? alert('Falta definir el Mayordeu2')
        : (params.MAYDEUD2 = params.MAYDEUD2);
    params.MAYDEUD3 = undefined
        ? alert('Falta definir el Mayordeu1')
        : (params.MAYDEUD3 = params.MAYDEUD3);
    let URL = get_url('APP/SALUD/FAC145.DLL');
    postData(
        {
            datosh:
                datosEnvio() +
                params.LOTE +
                '|' +
                params.COMPROBANTE +
                '|' +
                params.MAYORDEU1 +
                '|' +
                params.MAYORDEU2 +
                '|' +
                params.MAYORDEU3 +
                '|'
        },
        URL
    )
        .then((data) => {
            FAC145.IMPRESION = new Object();
            FAC145.IMPRESION.NITTER = data.IMPRESION[0].NIT_TER;
            moment.updateLocale('es', {
                months: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                ]
            });
            let fecha = data.IMPRESION[0].FECHA_MOV;
            if (parseInt(fecha) > 0 && parseInt(fecha) < 70) {
                fecha = '20' + data.IMPRESION[0].FECHA_MOV;
            } else {
                fecha = '19' + data.IMPRESION[0].FECHA_MOV;
            }
            FAC145.IMPRESION.FECHAMOV = moment(fecha).format('MMMM DD YYYY');
            FAC145.IMPRESION.REFERMOV = data.IMPRESION[0].REFER_MOV;
            FAC145.IMPRESION.OTROMOV = data.IMPRESION[0].OTRO_MOV;
            FAC145.IMPRESION.TIPOCOMP = data.IMPRESION[0].TIPO_COMP;
            FAC145.IMPRESION.IDPAC = data.IMPRESION[0].ID_PAC;
            FAC145.IMPRESION.DESCRIPTER = data.IMPRESION[0].DESCRIP_TER;
            FAC145.IMPRESION.DIRECCPACI = data.IMPRESION[0].DIRECC_PACI;
            FAC145.IMPRESION.TELTER = data.IMPRESION[0].TEL_TER;
            FAC145.IMPRESION.DETALLEMOV = data.IMPRESION[0].DETALLE_MOV;
            FAC145.IMPRESION.OPERMOV = data.IMPRESION[0].OPER_MOV;
            FAC145.IMPRESION.NOMBREPACI = data.IMPRESION[0].NOMBRE_PACI;
            FAC145.IMPRESION.APELLIDOPACI = data.IMPRESION[0].APELLIDO_PACI;
            FAC145.IMPRESION.TELEFONOPACI = data.IMPRESION[0].TELEFONO_PACI;
            FAC145.IMPRESION.NETO = data.IMPRESION[0].NETO;
            FAC145.IMPRESION.NOMBREMAE = data.IMPRESION[0].NOMBRE_MAE;
            FAC145.IMPRESION.DOCUMMOV = data.IMPRESION[0].DOCUM_MOV;
            FAC145.IMPRESION.CUENTAMOV = data.IMPRESION[0].CUENTA_MOV;
            FAC145.IMPRESION.TOTALDDB = data.IMPRESION[0].TOTAL_DB;
            FAC145.IMPRESION.TOTALCR = data.IMPRESION[0].TOTAL_CR;
            FAC145.IMPRESION.LOTE = params.LOTE;
            FAC145.IMPRESION.COMPROBANTE = params.COMPROBANTE;
            FAC145.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
            FAC145.IMPRESION.SUCURSAL = $_USUA_GLOBAL[0].PREFIJ;
            FAC145.IMPRESION.NITUSU = $_USUA_GLOBAL[0].NIT;
            FAC145.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
            FAC145.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL;
            FAC145.IMPRESION.NOMBRECIU = data.IMPRESION[0].NOMBRE_CIU;
            FAC145.IMPRESION.CUENTAMOV2 = data.IMPRESION[1].CUENTA_MOV;
            FAC145.IMPRESION.DOCUMMOV2 = data.IMPRESION[1].DOCUM_MOV;
            FAC145.IMPRESION.NOMBREMAE2 = data.IMPRESION[1].NOMBRE_MAE;
            FAC145.IMPRESION.TOTALDDB2 = data.IMPRESION[1].TOTAL_DB;
            let valor = FAC146(data.IMPRESION[0].TOTAL_CR.replace(/-/g, ''));
            FAC145.IMPRESION.VALORENLETRAS = valor;
            FAC145.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT.toString().substring(1, 9);
            opcionesImpresion_FAC145 = {
                datos: FAC145.IMPRESION,
                tipo: 'pdf',
                formato: 'salud/FAC145.html',
                nombre: 'PRUEBAFAC145'
            };
            imprimir(opcionesImpresion_FAC145, callback);
            // callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function SER109M(data, callback) {
    var IMPRESION = new Object();
    let iva = {
        C: () => {
            if ($_USUA_GLOBAL[0].RETEIVA == 'S') {
                return 'IVA Regimen Comun - Retenedor Iva';
            } else {
                return 'IVA Regimen Comun';
            }
        },
        S: () => {
            if ($_USUA_GLOBAL[0].NIT == 900565371 || $_USUA_GLOBAL[0].NIT == 901120152) {
                return 'Somos Responsables de IVA - Actividad Excluida de IVA';
            } else {
                return 'IVA Regimen Simplificado';
            }
        },
        N: 'No somos responsables de IVA'
    };
    if ($_USUA_GLOBAL[0].IVA_S == 'C' || $_USUA_GLOBAL[0].IVA_S == 'S') {
        let ivaf = iva[$_USUA_GLOBAL[0].IVA_S];
        IMPRESION.IVA = ivaf();
    } else {
        IMPRESION.IVA = iva[$_USUA_GLOBAL[0].IVA_S];
    }
    IMPRESION.NIT = $_USUA_GLOBAL[0].NIT.toString().substring(1, 9);
    IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    IMPRESION.NITUSU = $_USUA_GLOBAL[0].NIT;
    IMPRESION.TELUSU = $_USUA_GLOBAL[0].TEL;
    IMPRESION.DIRECCUSU = $_USUA_GLOBAL[0].DIRECC;
    IMPRESION.DVUSU = $_USUA_GLOBAL[0].DV;
    IMPRESION.NOMBRECIU = $_USUA_GLOBAL[0].NOMBRE_CIU;
    IMPRESION.CIUDADUSU = data.CIUDADUSU[0].NOMBRE.trim();
    IMPRESION.LLAVE = data.LLAVE;
    let fecha = () => {
        if (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4)) < 90) {
            return momentes('20' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'MMMM DD YYYY');
            // return moment('20' + $_USUA_GLOBAL[0].FECHALNK).format('MMMM DD YYYY');
        } else {
            return momentes('19' + $_USUA_GLOBAL[0].FECHALNK, 'YYYYMMDD', 'MMMM DD YYYY');
            // return moment('19' + $_USUA_GLOBAL[0].FECHALNK).format('MMMM DD YYYY');
        }
    };
    IMPRESION.FECHA = fecha().toUpperCase();
    IMPRESION.NOMTER = data.DESCRIP_NUM;
    IMPRESION.DIRECCTER = data.DIRECC_TER;
    IMPRESION.TELTER = data.TEL_TER;
    IMPRESION.NITTER = data.NIT_NUM;
    IMPRESION.DVTER = data.DV_TER;
    IMPRESION.CIUDADTER = data.CIUDAD_TER;
    let tipopac = {
        C: 'CONTRIBUTIVO',
        S: 'SUBSIDIADO',
        V: 'VINCULADO',
        P: 'PARTICULAR',
        O: 'OTRO TIPO',
        D: 'DESPLAZADO CONTRIBUTIV',
        E: 'DESPLAZADO SUBSIDIADO',
        F: 'DESPLAZADO VINCULADO'
    };
    IMPRESION.TIPOPACI = tipopac[data.TIPOPACI_NUM];
    IMPRESION.NOMBREPACNUM = data.NOMBREPAC_NUM;
    IMPRESION.IDPACNUM = data.IDPAC_NUM;
    let edad = calcular_edad(data.NACIPACI_NUM);
    IMPRESION.EDAD = edad.vlr_edad;
    IMPRESION.DESCRIPTAR = data.CONVENIO_NUM;
    IMPRESION.NROAFILPACI = data.NROAFIL_PACI;
    IMPRESION.TIPOIDPACI = data.TIPOID_PACI;
    IMPRESION.DIRECCPACI = data.DIRECC_PACI;
    IMPRESION.CIUDADPACI = data.CIUDAD_PACI;
    IMPRESION.EPSPACI = data.EPS_PACI;
    IMPRESION.NOMBREENT = data.NOMBRE_ENT;
    let original = {
        S: '*** ORIGINAL ***',
        N: '*** COPIA ***'
    };
    IMPRESION.ORIGINAL = original[data.SWORIGINAL];
    let sexo = { F: 'Femenino', M: 'Masculino' };
    IMPRESION.SEXO = sexo[data.SEXO_PACI.toUpperCase()];
    if (data.FACTURAS.length > 0) data.FACTURAS.pop();
    IMPRESION.FACTURAS = data.FACTURAS;
    IMPRESION.ANEXOSNUM = data.ANEXOS_NUM;
    IMPRESION.OBSERVNUM = data.OBSERV_NUM;
    IMPRESION.NOMBREPDF = localStorage.getItem('Usuario').trim() + moment().format('YYMMDDHHss');
    IMPRESION.LOGO = $_USUA_GLOBAL[0].NIT.toString().substring(1, 9);
    IMPRESION.TOTALIVA = 0;
    for (var i in data.FACTURAS) {
        IMPRESION.TOTALIVA = IMPRESION.TOTALIVA + parseInt(data.FACTURAS[i].IVA.replace(/,/g, ''));
    }
    IMPRESION.TOTALCOPAGO = 0;
    for (var i in data.FACTURAS) {
        if (!isNaN(parseInt(data.FACTURAS[i].COPAGO))) {
            IMPRESION.TOTALCOPAGO = IMPRESION.TOTALCOPAGO + parseInt(data.FACTURAS[i].COPAGO);
        }
    }
    IMPRESION.TOTAL = 0;
    for (var i in data.FACTURAS) {
        IMPRESION.TOTAL = IMPRESION.TOTAL + parseInt(data.FACTURAS[i].VALOR.replace(/,/g, ''));
    }
    IMPRESION.PREFIJOW = data.PREFIJOW;
    IMPRESION.COPAGONUM = data.FORMACOPAGO_NUM;
    IMPRESION.OPERNUM = data.OPER_NUM;
    IMPRESION.OPERMODNUM = data.OPERMOD_NUM;
    IMPRESION.OPERBLOQNUM = data.OPERBLOQ_NUM;
    IMPRESION.ADMIN = localStorage.getItem('Usuario').trim();
    IMPRESION.FECHAIMPRESION = moment().format('YYMMDD');
    IMPRESION.FECHAOPER = moment(data.FECHAING_NUM, 'YYYYMMDD').format('YYMMDD');
    IMPRESION.FECHAMODOPER = moment(data.FECHAMOD_NUM, 'YYYYMMDD').format('YYMMDD');
    IMPRESION.FECHARETOPER = moment(data.FECHARET_NUM, 'YYYYMMDD').format('YYMMDD');
    IMPRESION.NUMEROENLETRAS = FAC146(IMPRESION.TOTAL);
    IMPRESION.AUTDIAN = data.AUTDIAN;
    IMPRESION.FECHAPREFIJO = data.FECHAPREFIJO;
    IMPRESION.DESDEPREFIJO = data.DESDEPREFIJO;
    IMPRESION.HASTAPREFIJO = data.HASTAPREFIJO;
    if (
        (data.FIRMAS[0].FIRMFAC.trim() == '1' && data.ESTADO_NUM == '1') ||
        data.FIRMAS[0].FIRMFAC.trim() == '2'
    ) {
        IMPRESION.IDGER1 = data.FIRMAS[0].IDGER1;
    }
    opcionesImpresion_SER109M = {
        datos: IMPRESION,
        tipo: 'pdf',
        formato: 'salud/SER109M.formato.html',
        nombre: IMPRESION.NOMBREPDF
    };
    imprimir(opcionesImpresion_SER109M, callback);
}

function CON406S(data) {
    console.log(data);
}

function _INV411(params, callback) {
    console.log(params);
    var datosimpresion = new Object();

    let logo = $_USUA_GLOBAL[0].NIT == 822006883 ? { image: 'logo', fit: [140, 150], absolutePosition: { x: 40, y: 30 } } : { image: 'logo', fit: [60, 60], absolutePosition: { x: 40, y: 10 } }

    datosimpresion = {
        pageSize: 'A4',
        pageMargins: [10, 180, 10, 20],
        header: function (currentPage, pageCount, pageSize) {
            if (params.FACTURA.substring(0, 1) == 'E' || params.FACTURA.substring(0, 1) == 'C') {
                return [
                    { text: ' ' },
                    { text: ' ' },
                    // {
                    //     image: 'logo',
                    //     fit: [60, 60],
                    //     absolutePosition: { x: 40, y: 30 }
                    // },
                    logo,
                    { text: params.NOMBREUSU, style: 'titulos' },
                    { text: params.NITUSU, style: 'titulos' },
                    { text: params.IVAUSU, style: 'titulos2' },
                    { text: params.DIRECCIONUSU + '  ' + params.TELEFONOUSU, style: 'titulos2' },
                    { text: params.CODCIUUSU, style: 'titulos2' },
                    {
                        columns: [
                            'Página : ' + currentPage + ' de ' + pageCount,
                            params.CLASESERVICIO,
                            params.NOMBRECIUUSU
                        ],
                        style: 'titulos2'
                    },
                    {
                        text: params.ORIGINAL,
                        style: 'facturaoriginal',
                        absolutePosition: { x: 520, y: 68 }
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                    {
                        columns: [
                            {
                                text: 'FECHA : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.FECHAFACT, width: '25%', style: 'textheader' },
                            { text: 'FACTURA DE VENTA : ', width: '18%', style: 'textheadertitle' },
                            { text: params.FACTURA, width: '10%', style: 'textheader' },
                            {
                                text: 'COMPROBANTE NUMERO : ',
                                width: '20%',
                                style: 'textheadertitle'
                            },
                            {
                                text: parseInt(params.COMPROBANTE).toString(),
                                width: '10%',
                                style: 'textheader'
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'ENTIDAD : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.DESCRIPTER, width: '25%', style: 'textheader' },
                            { text: 'CODIGO : ', width: '6%', style: 'textheadertitle' },
                            { text: params.CODIGOEPS, width: '8%', style: 'textheader' },
                            { text: 'F.PAGO : ', width: '6%', style: 'textheadertitle' },
                            { text: params.ACCESO, width: '8%', style: 'textheader' },
                            { text: 'ACCESO : ', width: '10%', style: 'textheadertitle' },
                            { text: params.PUERTAW, width: '20%', style: 'textheader' }
                        ],
                        style: 'textheader'
                    },
                    {
                        columns: [
                            {
                                text: 'ATIENDE : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.ATIENDE, width: '25%', style: 'textheader' },
                            { text: 'ESPEC : ', width: '5%', style: 'textheadertitle' },
                            { text: params.ESPECIALIDAD, width: '23%', style: 'textheader' },
                            { text: 'COS : ', width: '5%', style: 'textheadertitle' },
                            { text: params.COSTO, width: '20%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'PACIENTE : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.PACIENTE, width: '53%', style: 'textheader' },
                            { text: 'US : ', width: '5%', style: 'textheadertitle' },
                            { text: params.UNSERVFACT, width: '20%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'OCUPACION:',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.OCUPACION, width: '5%', style: 'textheader' },
                            { text: 'TIPO USUARIO : ', width: '10%', style: 'textheadertitle' },
                            { text: params.TIPOUSUW, width: '9%', style: 'textheader' },
                            { text: 'EDAD : ', width: '8%', style: 'textheadertitle' },
                            { text: params.EDAD, width: '6%', style: 'textheader' },
                            { text: 'SEXO : ', width: '5%', style: 'textheadertitle' },
                            { text: params.SEXO, width: '9%', style: 'textheader' },
                            { text: 'CIUDAD : ', width: '6%', style: 'textheadertitle' },
                            { text: params.CIUDAD, width: '6%', style: 'textheader' },
                            { text: 'ZONA : ', width: '5%', style: 'textheadertitle' },
                            { text: params.ZONA, width: '5%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'DETALLE : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.DETALLE, width: '53%', style: 'textheader' },
                            { text: 'AUTOR : ', width: '7%', style: 'textheadertitle' },
                            { text: params.NROAUTOR, width: '10%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'SOLICITA : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.SOLICITA, width: '48%', style: 'textheader' }
                        ]
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                    {
                        columns: [
                            {
                                text: 'CODIGO',
                                width: '15%',
                                style: 'textheadertitletable',
                                margin: [20, 0]
                            },
                            { text: 'DESCRIPCION', width: '40%', style: 'textheadertitletable' },
                            { text: 'CANTIDAD', width: '15%', style: 'textheadertitletable' },
                            { text: 'VALOR UNITARIO', width: '15%', style: 'textheadertitletable' },
                            { text: 'VALOR TOTAL', width: '15%', style: 'textheadertitletable' }
                        ]
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 2, lineWidth: 1 }] }
                ];
            } else {
                return [
                    { text: ' ' },
                    { text: ' ' },
                    // {
                    //     image: 'logo',
                    //     fit: [60, 60],
                    //     absolutePosition: { x: 40, y: 30 }
                    // },
                    logo,
                    { text: params.NOMBREUSU, style: 'titulos' },
                    { text: params.NITUSU, style: 'titulos' },
                    { text: params.IVAUSU, style: 'titulos2' },
                    { text: params.DIRECCIONUSU + '  ' + params.TELEFONOUSU, style: 'titulos2' },
                    { text: params.CODCIUUSU, style: 'titulos2' },
                    {
                        columns: [
                            'Página : ' + currentPage + ' de ' + pageCount,
                            params.CLASESERVICIO,
                            params.NOMBRECIUUSU
                        ],
                        style: 'titulos2'
                    },
                    {
                        text: params.ORIGINAL,
                        style: 'facturaoriginal',
                        absolutePosition: { x: 520, y: 68 }
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                    {
                        columns: [
                            {
                                text: 'FECHA : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.FECHAFACT, width: '25%', style: 'textheader' },
                            { text: 'FACTURA : ', width: '18%', style: 'textheadertitle' },
                            { text: params.FACTURA, width: '10%', style: 'textheader' },
                            {
                                text: 'COMPROBANTE NUMERO : ',
                                width: '20%',
                                style: 'textheadertitle'
                            },
                            {
                                text: parseInt(params.COMPROBANTE).toString(),
                                width: '10%',
                                style: 'textheader'
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'ENTIDAD : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.DESCRIPTER, width: '25%', style: 'textheader' },
                            { text: 'CODIGO : ', width: '6%', style: 'textheadertitle' },
                            { text: params.CODIGOEPS, width: '8%', style: 'textheader' },
                            { text: 'F.PAGO : ', width: '6%', style: 'textheadertitle' },
                            { text: params.ACCESO, width: '8%', style: 'textheader' },
                            { text: 'ACCESO : ', width: '10%', style: 'textheadertitle' },
                            { text: params.PUERTAW, width: '20%', style: 'textheader' }
                        ],
                        style: 'textheader'
                    },
                    {
                        columns: [
                            {
                                text: 'ATIENDE : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.ATIENDE, width: '25%', style: 'textheader' },
                            { text: 'ESPEC : ', width: '5%', style: 'textheadertitle' },
                            { text: params.ESPECIALIDAD, width: '23%', style: 'textheader' },
                            { text: 'COS : ', width: '5%', style: 'textheadertitle' },
                            { text: params.COSTO, width: '20%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'PACIENTE : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.PACIENTE, width: '53%', style: 'textheader' },
                            { text: 'US : ', width: '5%', style: 'textheadertitle' },
                            { text: params.UNSERVFACT, width: '20%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'OCUPACION:',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.OCUPACION, width: '5%', style: 'textheader' },
                            { text: 'TIPO USUARIO : ', width: '10%', style: 'textheadertitle' },
                            { text: params.TIPOUSUW, width: '9%', style: 'textheader' },
                            { text: 'EDAD : ', width: '8%', style: 'textheadertitle' },
                            { text: params.EDAD, width: '6%', style: 'textheader' },
                            { text: 'SEXO : ', width: '5%', style: 'textheadertitle' },
                            { text: params.SEXO, width: '9%', style: 'textheader' },
                            { text: 'CIUDAD : ', width: '6%', style: 'textheadertitle' },
                            { text: params.CIUDAD, width: '6%', style: 'textheader' },
                            { text: 'ZONA : ', width: '5%', style: 'textheadertitle' },
                            { text: params.ZONA, width: '5%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'DETALLE : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.DETALLE, width: '53%', style: 'textheader' },
                            { text: 'AUTOR : ', width: '7%', style: 'textheadertitle' },
                            { text: params.NROAUTOR, width: '10%', style: 'textheader' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'SOLICITA : ',
                                width: '14%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.SOLICITA, width: '48%', style: 'textheader' }
                        ]
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                    {
                        columns: [
                            {
                                text: 'CODIGO',
                                width: '15%',
                                style: 'textheadertitletable',
                                margin: [20, 0]
                            },
                            { text: 'DESCRIPCION', width: '40%', style: 'textheadertitletable' },
                            { text: 'CANTIDAD', width: '15%', style: 'textheadertitletable' },
                            { text: 'VALOR UNITARIO', width: '15%', style: 'textheadertitletable' },
                            { text: 'VALOR TOTAL', width: '15%', style: 'textheadertitletable' }
                        ]
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 2, lineWidth: 1 }] }
                ];
            }
        },
        content: [
            table411(params.TABLA, params.COLUMNAS),
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 570, y2: 5, lineWidth: 1 }] },
            { text: ' ' },
            {
                columns: [
                    { text: 'TOTAL FACTURA : ', width: '20%', style: 'textheadertitle' },
                    { text: params.VLRTOTAL, width: '15%', style: 'textheadertitle' },
                    { text: 'ABONOS/COPAGOS : ', width: '20%', style: 'textheadertitle' },
                    { text: params.COPAGO, width: '15%', style: 'textheadertitle' },
                    { text: 'SALDO : ', width: '10%', style: 'textheadertitle' },
                    { text: params.SALDO, width: '15%', style: 'textheadertitle' }
                ]
            },
            { text: params.SON, style: 'textheader' },
            { text: ' ' },
            {
                columns: [
                    { text: params.PREFIJO[0].AUT_DIAN, width: '13%', style: 'textheader' },
                    { text: params.PREFIJO[0].FECHA, width: '10%', style: 'textheader' },
                    { text: 'PREFIJO', width: '7%', style: 'textheader' },
                    { text: params.PREFIJO[0].PREFIJO, width: '3%', style: 'textheader' },
                    { text: 'RANGO', width: '7%', style: 'textheader' },
                    {
                        text: params.PREFIJO[0].DESDE_NRO + ' - ' + params.PREFIJO[0].HASTA_NRO,
                        width: '20%',
                        style: 'textheader'
                    }
                ]
            },
            { text: ' ' },
            {
                columns: [
                    { text: params.FECHAACT, width: '13%', style: 'textheader' },
                    {
                        text: 'Firma paciente : _____________________________________________',
                        width: '40%',
                        style: 'textheader'
                    },
                    { text: params.OPERELABFACT, width: '5%', style: 'textheader' },
                    { text: 'Mod:', width: '5%', style: 'textheadertitle' },
                    { text: params.OPERCORRECFACT, width: '8%', style: 'textheader' },
                    { text: 'Imprime:', width: '8%', style: 'textheadertitle' },
                    { text: params.ADMINW, width: '8%', style: 'textheader' }
                ]
            }
        ],
        styles: {
            titulos: {
                alignment: 'center',
                fontSize: 13,
                bold: true
            },
            titulos2: {
                alignment: 'center',
                fontSize: 10,
                bold: true
            },
            textheader: {
                alignment: 'rigth',
                fontSize: 8
            },
            textheadertitle: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            textheadertitletable: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            facturaoriginal: {
                alignment: 'center',
                fontSize: 8,
                bold: true
            }
        }
    };
    datosimpresion.images = {
        logo: 'P:\\PROG\\LOGOS\\' + params.NIT.toString() + '.png'
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssSS')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
        });
}

function buildTableBody411(data, columns) {
    var body = [];
    data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
            dataRow.push({ text: row[column].toString(), style: 'textheader', border: [false] });
        });
        body.push(dataRow);
    });

    return body;
}

function table411(data, columns) {
    for (var i in data) {
        if (data[i].ARTICULO.trim() == '') {
            data.splice(i, i + 1);
        }
    }
    return {
        table: {
            widths: ['12%', '44%', '15%', '15%', '15%'],
            body: buildTableBody411(data, columns)
        }
    };
}

function _INV412(params, callback, errcallback) {
    let datosimpresion = new Object();
    datosimpresion = {
        pageSize: 'A7',
        pageMargins: [20, 40, 20, 80],
        content: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
            { text: params.NOMBREUSU, style: 'titulos', width: '100%' },
            {
                columns: [
                    { text: 'N.I.T', style: 'titulos', width: '20%' },
                    { text: params.NITUSU, style: 'titulos', width: '40%' },
                    { text: 'T.', style: 'titulos', width: '20%' },
                    { text: params.TELEFONOUSU, style: 'titulos', width: '20%' }
                ]
            },
            {
                columns: [
                    { text: params.DIRECCIONUSU, style: 'titulos', width: '65%' },
                    { text: params.NOMBRECIUUSU, style: 'titulos', width: '35%' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 180, y2: 5, lineWidth: 1 }] },
            { text: params.IVAUSU, style: 'titulos', width: '100%' },
            {
                columns: [
                    { text: 'FACTURA DE VENTA', style: 'titulos', width: '40%' },
                    { text: params.FACTURA, style: 'titulos', width: '20%' },
                    { text: params.FECHAFACT, style: 'titulos', width: '40%' }
                ]
            },
            { text: params.DESCRIPTER, style: 'titulos', width: '100%' },
            {
                columns: [
                    { text: 'NIT : ', style: 'titulos', width: '20%' },
                    { text: params.NITTER, style: 'titulos', width: '20%' },
                    { text: params.DEPARTAMENTOTER, style: 'titulos', width: '60%' }
                ]
            },
            { text: params.FPAGO, style: 'titulos', width: '30%' },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 180, y2: 5, lineWidth: 1 }] },
            {
                columns: [
                    { text: 'DESCRIPCION', style: 'titulos', width: '60%' },
                    { text: 'CANT', style: 'titulos', width: '20%' },
                    { text: 'VALOR TOTAL', style: 'titulos', width: '20%' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 180, y2: 5, lineWidth: 1 }] },
            table412(params.TABLA, ['DESCRIPCIONART', 'CANTIDAD', 'VALORTOTAL']),
            {
                columns: [
                    { text: 'SUBTOTAL', style: 'titulos', width: '60%' },
                    { text: params.CANTIDADTOTAL, style: 'titulos', width: '20%' },
                    { text: params.VLRTOTAL, style: 'titulos', width: '20%' }
                ]
            },
            {
                columns: [
                    { text: 'COPAGOS Y ABONOS', style: 'titulos', width: '60%' },
                    { text: '', style: 'titulos', width: '20%' },
                    { text: params.COPAGO, style: 'titulos', width: '20%' }
                ]
            },
            {
                columns: [
                    { text: 'TOTAL FACTURA', style: 'titulos', width: '30%' },
                    { text: params.CANTIDADTOTAL, style: 'titulos', width: '20%' },
                    { text: params.SALDO, style: 'titulos', width: '50%' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 180, y2: 5, lineWidth: 1 }] },
            { text: ' ' },
            {
                columns: [
                    { text: 'ACEPTADA', style: 'titulos', width: '30%' },
                    { text: '_________________________________', style: 'titulos', width: '70%' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 140, y2: 5, lineWidth: 1 }] },
            {
                text: 'Esta factura se asimila en sus efectos',
                style: 'titulos',
                width: '100%',
                margin: [0, 8, 0, 0]
            },
            { text: 'a la letra de cambio Art. 774 C de Cio', style: 'titulos', width: '100%' },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 140, y2: 5, lineWidth: 1 }] }
        ],
        styles: {
            titulos: {
                alignment: 'rigth',
                fontSize: 6,
                bold: true
            },
            titulousu: {
                alignment: 'center',
                fontSize: 6,
                bold: true
            }
        }
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
        });
}

function buildTableBody412(data, columns) {
    var body = [];
    data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
            dataRow.push({ text: row[column].toString(), style: 'titulos', border: [false] });
        });
        body.push(dataRow);
    });

    return body;
}

function table412(data, columns) {
    for (var i in data) {
        if (data[i].ARTICULO.trim() == '') {
            data.splice(i, i + 1);
        }
    }
    return {
        table: {
            widths: ['60%', '20%', '20%'],
            body: buildTableBody412(data, columns)
        }
    };
}

function buildTableBody(data, columns) {
    var body = [];

    data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
            dataRow.push({
                text: row[column].toString(),
                style: 'textheadertable',
                border: [false]
            });
        });

        body.push(dataRow);
    });

    return body;
}

function construirtablaimpresiones(data, columns, width) {
    return {
        table: {
            widths: width,
            body: buildTableBody(data, columns)
        }
    };
}
function construirtablaimpresioneslineal(data, columns, width) {
    return {
        table: {
            widths: width,
            body: buildTableBody2(data, columns)
        }
    };
}

function buildTableBody2(data, columns) {
    var body = [];

    data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
            dataRow.push({ text: row[column].toString(), style: 'textheadertable' });
        });

        body.push(dataRow);
    });

    return body;
}

function _impresionformatoSER109(params, callback, errcallback) {
    if (params.OBSERVNUM.trim() == '' && params.ANEXOSNUM.trim() == '') params.MARGIN[1] = 140;

    if (params.OBSERVNUM.length < 98) params.MARGIN[1] = params.MARGIN[1] + 30;
    else if (params.OBSERVNUM.length > 98 && params.OBSERVNUM.length < 196)
        params.MARGIN[1] = params.MARGIN[1] + 30;
    else if (params.OBSERVNUM.length > 206 && params.OBSERVNUM.length < 294)
        params.MARGIN[1] = params.MARGIN[1] + 60;
    else if (params.OBSERVNUM.length > 294) params.MARGIN[1] = params.MARGIN[1] + 80;

    if (params.ANEXOSNUM.length < 98) params.MARGIN[1] = params.MARGIN[1] + 12;
    if (params.ANEXOSNUM.length > 98 && params.ANEXOSNUM.length < 196)
        params.MARGIN[1] = params.MARGIN[1] + 30;
    else if (params.ANEXOSNUM.length > 206 && params.ANEXOSNUM.length < 294)
        params.MARGIN[1] = params.MARGIN[1] + 50;
    else if (params.ANEXOSNUM.length > 294) params.MARGIN[1] = params.MARGIN[1] + 70;

    if (params.DIRECCTER.length > 37) params.MARGIN[1] = params.MARGIN[1] + 5;

    let hoja = '';
    let tamanocanvas = 580;
    let x21firma = 150;
    let x22firma = 280;
    if (params.estilohoja) {
        if (params.estilohoja == '2')
            (hoja = 'landscape'), (tamanocanvas = 830), (x21firma = 200), (x22firma = 320);
        else hoja = 'portrait';
    } else {
        hoja = 'portrait';
    }
    console.log(params.MARGIN);
    let datosimpresion = {
        watermark: { text: params.MARCAAGUA, opacity: 0.1, bold: true, italics: false },
        pageSize: 'A4',
        pageMargins: params.MARGIN,
        pageOrientation: hoja,
        header: function (currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element
            hearderimpresion = [
                {
                    image: 'logo',
                    fit: [120, 60],
                    absolutePosition: { x: 40, y: 20 }
                },
                { text: ' ' },
                { text: ' ' },
                { text: $_USUA_GLOBAL[0].NOMBRE, style: 'titulos' },
                {
                    text: $_USUA_GLOBAL[0].NIT.toString() + ' - ' + $_USUA_GLOBAL[0].DV,
                    style: 'titulos'
                },
                { text: $_USUA_GLOBAL[0].DIRECC, style: 'titulos' },
                // { text: " ", style: "titulos2" },
                {
                    columns: [
                        'TEL.' + $_USUA_GLOBAL[0].TEL,
                        $_USUA_GLOBAL[0].NOMBRE_CIU,
                        'Pagina ' + currentPage + ' de ' + pageCount
                    ],
                    style: 'titulos2'
                }
            ];
            if (params.ORIGINAL) {
                hearderimpresion.push({
                    text: params.ORIGINAL,
                    style: 'facturaoriginal',
                    absolutePosition: { x: 500, y: 60 }
                });
            }
            hearderimpresion.push({
                table: {
                    widths: ['99.5%'],
                    body: []
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                },
                margin: [10, 0]
            });
            if (params.FECHAVENCE) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'FECHA : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.FECHA, width: '25%', style: 'textheader' },
                            { text: 'VENCE : ', width: '8%', style: 'textheadertitle' },
                            { text: params.FECHAVENCE, width: '20%', style: 'textheader' },
                            {
                                text: 'FACTURA DE VENTA NO. : ',
                                width: '20%',
                                style: 'textheadertitle'
                            },
                            {
                                text:
                                    params.LLAVE.substring(0, 1) +
                                    ' ' +
                                    parseInt(params.LLAVE.substring(1, 8)),
                                width: '10%',
                                style: 'textheader'
                            }
                        ]
                    }
                ]);
            } else {
                // hearderimpresion[8].table.body.push([{ text: ' ' }]);
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'FECHA : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.FECHA, width: '53%', style: 'textheader' },
                            {
                                text: 'FACTURA DE VENTA NO. : ',
                                width: '20%',
                                style: 'textheadertitle'
                            },
                            {
                                text:
                                    params.LLAVE.substring(0, 1) +
                                    ' ' +
                                    parseInt(params.LLAVE.substring(1, 8)),
                                width: '10%',
                                style: 'textheader'
                            }
                        ]
                    }
                ]);
            }
            hearderimpresion[8].table.body.push(
                [
                    {
                        columns: [
                            {
                                text: 'CLIENTE : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.NOMTER, width: '53%', style: 'textheader' },
                            { text: 'NIT : ', width: '5%', style: 'textheadertitle' },
                            {
                                text: params.NITTER + '-' + params.DVTER,
                                width: '20%',
                                style: 'textheader'
                            }
                        ]
                    }
                ],
                [
                    {
                        columns: [
                            {
                                text: 'DIRECCION : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.DIRECCTER, width: '30%', style: 'textheader' },
                            { text: 'TEL : ', width: '8%', style: 'textheadertitle' },
                            { text: params.TELTER, width: '15%', style: 'textheader' },
                            { text: 'CIUDAD : ', width: '8%', style: 'textheadertitle' },
                            { text: params.CIUDADTER, width: '20%', style: 'textheader' }
                        ]
                    }
                ]
            );
            if ( ["P", "O", "Q", "R", "S", "U", "T", "V", "W", "X", "Y", "Z"].includes(params.PREFIJOW) && params.IMPRESION == 'SER109') {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'PACIENTE : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.NOMBREPACNUM, width: '53%', style: 'textheader' },
                            { text: 'Ident : ', width: '5%', style: 'textheadertitle' },
                            {
                                text: numeroencomas(parseInt(params.IDPACNUM)),
                                width: '10%',
                                style: 'textheader'
                            },
                            { text: 'Edad : ', width: '5%', style: 'textheadertitle' },
                            { text: params.EDAD, width: '10%', style: 'textheader' }
                        ]
                    }
                ]);
            }
            if (params.TARIF == 1) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: params.DESCRIPTAR,
                                width: '40%',
                                style: 'textheader',
                                margin: [20, 0]
                            },
                            { text: 'TIPO DE CUENTA : ', width: '15%', style: 'textheadertitle' },
                            { text: params.REGIMEN, width: '13%', style: 'textheader' },
                            { text: 'REGIMEN : ', width: '8%', style: 'textheadertitle' },
                            { text: params.TIPOPACI, width: '20%', style: 'textheader' }
                        ]
                    }
                ]);
            } else if (params.TARIF == 2) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'CONTRATO: ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.CONTRATONUM, width: '75%', style: 'textheader' }
                        ]
                    }
                ]);
            } else if (params.TARIF == 3) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: params.DESCRIPTAR,
                                width: '40%',
                                style: 'textheader',
                                margin: [20, 0]
                            },
                            { text: params.NROAFILPACI, width: '15%', style: 'textheadertitle' },
                            { text: params.REGIMEN, width: '13%', style: 'textheader' },
                            { text: 'CONTRATO : ', width: '8%', style: 'textheadertitle' },
                            { text: params.CONTRATONUM, width: '20%', style: 'textheader' }
                        ]
                    }
                ]);
            } else {
                if (params.ZONA.trim() != ''){
                    hearderimpresion[8].table.body.push([
                        {
                            columns: [
                                {
                                    text: 'CONVENIO : ',
                                    width: '15%',
                                    style: 'textheadertitle',
                                    margin: [20, 0]
                                },
                                { text: params.DESCRIPTAR, width: '25%', style: 'textheader' },
                                { text: 'REGIMEN : ', width: '8%', style: 'textheadertitle' },
                                { text: params.TIPOPACI, width: '10%', style: 'textheader' },
                                { text: 'AUTORIZACIÓN: ', width: '11%', style: 'textheadertitle' },
                                { text: params.AUTORIZA, width: '15%', style: 'textheader' },
                                { text: params.ZONA, width: '16%', style: 'textheader' }
                            ]
                        }
                    ]);
                } else {
                    hearderimpresion[8].table.body.push([
                        {
                            columns: [
                                {
                                    text: 'CONVENIO : ',
                                    width: '15%',
                                    style: 'textheadertitle',
                                    margin: [20, 0]
                                },
                                { text: params.DESCRIPTAR, width: '30%', style: 'textheader' },
                                { text: 'REGIMEN : ', width: '8%', style: 'textheadertitle' },
                                { text: params.TIPOPACI, width: '15%', style: 'textheader' },
                                { text: 'AUTORIZACIÓN: ', width: '12%', style: 'textheadertitle' },
                                { text: params.AUTORIZA, width: '25%', style: 'textheader' }
                            ]
                        }
                    ]);
                }
            }
            if (params.IMPRESION == 'SER109N') {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'PACIENTE : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.NOMBREPACNUM, width: '53%', style: 'textheader' },
                            { text: 'Ident : ', width: '5%', style: 'textheadertitle' },
                            {
                                text: params.IDPACNUM + '-' + params.DVTER,
                                width: '20%',
                                style: 'textheader'
                            }
                        ]
                    }
                ]);
            }
            if (params.CLASEFACTURA == 'T') {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'PACIENTE : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.NOMBREPACNUM, width: '53%', style: 'textheader' },
                            { text: 'Ident : ', width: '5%', style: 'textheadertitle' },
                            {
                                text: numeroencomas(parseInt(params.IDPACNUM)),
                                width: '10%',
                                style: 'textheader'
                            },
                            { text: 'Edad : ', width: '5%', style: 'textheadertitle' },
                            { text: params.EDAD, width: '10%', style: 'textheader' }
                        ]
                    }
                ]);
            }
            // hearderimpresion[8].table.body.push([{
            //   columns: [
            //     { text: " ", width: "15%", style: "textheadertitle" },
            //   ],
            // }])
            if (params.OBSERVNUM.trim() != '') {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'OBSERVAC : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.OBSERVNUM, width: '75%', style: 'textheader' }
                        ]
                    }
                ]);
            }
            if (params.ANEXOSNUM.trim() != '') {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'ANEXOS : ',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [20, 0]
                            },
                            { text: params.ANEXOSNUM, width: '75%', style: 'textheader' }
                        ]
                    }
                ]);
            }
            console.log(params.FORMATOTABLA);
            if (params.FORMATOTABLA == 1) {
                if (params.RESUMIDO) {
                    hearderimpresion[8].table.body.push([
                        {
                            table: {
                                widths: ['10%', '10%', '29.5%', '8%', '25%', '5%', '12.5%'],
                                body: [
                                    [
                                        { text: 'COMP', style: 'textheader', fillColor: '#8cd3ff' },
                                        {
                                            text: 'FECHA',
                                            style: 'textheader',
                                            fillColor: '#8cd3ff'
                                        },
                                        {
                                            text: 'DESCRIPCION',
                                            style: 'textheader',
                                            fillColor: '#8cd3ff'
                                        },
                                        {
                                            text: 'COD.SERV.',
                                            style: 'textheader',
                                            fillColor: '#8cd3ff'
                                        },
                                        {
                                            text: 'CONCEPTO',
                                            style: 'textheader',
                                            fillColor: '#8cd3ff'
                                        },
                                        { text: 'CANT', style: 'textheader', fillColor: '#8cd3ff' },
                                        { text: 'VALOR', style: 'textheader', fillColor: '#8cd3ff' }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) {
                                    return i === 0 || i === node.table.body.length ? 0 : 0;
                                },
                                vLineWidth: function (i, node) {
                                    return i === 0 || i === node.table.widths.length ? 0 : 0;
                                },
                                hLineColor: function (i, node) {
                                    return i === 0 || i === node.table.body.length
                                        ? 'black'
                                        : '#04d9ff';
                                },
                                vLineColor: function (i, node) {
                                    return i === 0 || i === node.table.widths.length
                                        ? 'black'
                                        : '#04d9ff';
                                },
                                paddingLeft: function (i, node) {
                                    return 0;
                                },
                                paddingRight: function (i, node) {
                                    return 0;
                                },
                                paddingTop: function (i, node) {
                                    return 0;
                                },
                                paddingBottom: function (i, node) {
                                    return 0;
                                }
                            }
                        }
                    ]);
                } else {
                    hearderimpresion[8].table.body.push([
                        {
                            table: {
                                widths: [
                                    '5%',
                                    '5%',
                                    '26%',
                                    '5%',
                                    '5%',
                                    '19%',
                                    '4%',
                                    '7%',
                                    '8%',
                                    '5%',
                                    '8%',
                                    '3%'
                                ],
                                body: [
                                    [
                                        { text: 'COMP', style: 'textheade2', fillColor: '#8cd3ff' },
                                        {
                                            text: 'FECHA',
                                            style: 'textheade2',
                                            fillColor: '#8cd3ff'
                                        },
                                        {
                                            text: 'DESCRIPCION',
                                            style: 'textheade2',
                                            fillColor: '#8cd3ff'
                                        },
                                        { text: 'EDAD', style: 'textheade2', fillColor: '#8cd3ff' },
                                        { text: 'SEXO', style: 'textheade2', fillColor: '#8cd3ff' },
                                        {
                                            text: 'CONCEPTO',
                                            style: 'textheade2',
                                            fillColor: '#8cd3ff'
                                        },
                                        { text: 'CANT', style: 'textheade2', fillColor: '#8cd3ff' },
                                        {
                                            text: 'VALOR',
                                            style: 'textheade2',
                                            fillColor: '#8cd3ff'
                                        },
                                        {
                                            text: 'COPAGO',
                                            style: 'textheade2',
                                            fillColor: '#8cd3ff'
                                        },
                                        {
                                            text: 'AUTOR',
                                            style: 'textheade2',
                                            fillColor: '#8cd3ff'
                                        },
                                        {
                                            text: 'COD.SERV.',
                                            style: 'textheade2',
                                            fillColor: '#8cd3ff'
                                        },
                                        { text: 'UND', style: 'textheade2', fillColor: '#8cd3ff' }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) {
                                    return i === 0 || i === node.table.body.length ? 0 : 0;
                                },
                                vLineWidth: function (i, node) {
                                    return i === 0 || i === node.table.widths.length ? 0 : 0;
                                },
                                hLineColor: function (i, node) {
                                    return i === 0 || i === node.table.body.length
                                        ? 'black'
                                        : '#04d9ff';
                                },
                                vLineColor: function (i, node) {
                                    return i === 0 || i === node.table.widths.length
                                        ? 'black'
                                        : '#04d9ff';
                                },
                                paddingLeft: function (i, node) {
                                    return 0;
                                },
                                paddingRight: function (i, node) {
                                    return 0;
                                },
                                paddingTop: function (i, node) {
                                    return 0;
                                },
                                paddingBottom: function (i, node) {
                                    return 0;
                                }
                            }
                        }
                    ]);
                }
                console.log('aca');
            }
            if (params.FORMATOTABLA == 2) {
                hearderimpresion[8].table.body.push([
                    {
                        table: {
                            widths: ['13%', '27%', '15%', '10%', '15%', '15%'],
                            body: [
                                [
                                    {
                                        text: 'CODIGO',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'DESCRIPCION',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'CODIGO CUM',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'CANTIDAD',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'VLR UNIT',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'VALOR',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return i === 0 || i === node.table.body.length ? 0.3 : 0.3;
                            },
                            vLineWidth: function (i, node) {
                                return i === 0 || i === node.table.widths.length ? 0.3 : 0.3;
                            },
                            hLineColor: function (i, node) {
                                return i === 0 || i === node.table.body.length
                                    ? 'black'
                                    : '#8cd3ff';
                            },
                            vLineColor: function (i, node) {
                                return i === 0 || i === node.table.widths.length
                                    ? 'black'
                                    : '#8cd3ff';
                            },
                            paddingLeft: function (i, node) {
                                return 0;
                            },
                            paddingRight: function (i, node) {
                                return 0;
                            },
                            paddingTop: function (i, node) {
                                return 0;
                            },
                            paddingBottom: function (i, node) {
                                return 0;
                            }
                        }
                    }
                ]);
            }
            if (params.FORMATOTABLA == 3) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'PACIENTE',
                                width: '40%',
                                style: 'textheadertitletable',
                                margin: [15, 0]
                            },
                            { text: 'CONCEPTO', width: '20%', style: 'textheadertitletable' },
                            { text: 'VALOR', width: '10%', style: 'textheadertitletable' },
                            { text: 'CODIGO', width: '10%', style: 'textheadertitletable' },
                            { text: 'FECHA', width: '10%', style: 'textheadertitletable' },
                            { text: 'EQ.SOAT', width: '10%', style: 'textheadertitletable' }
                        ]
                    }
                ]);
            }
            if (params.FORMATOTABLA == 4) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'CODIGO',
                                width: '8%',
                                style: 'textheadertitletable',
                                margin: [15, 0]
                            },
                            { text: 'COMP', width: '4%', style: 'textheadertitletable' },
                            { text: 'FECHA', width: '4%', style: 'textheadertitletable' },
                            { text: 'MEDICO', width: '19%', style: 'textheadertitletable' },
                            { text: 'DETALLE', width: '19%', style: 'textheadertitletable' },
                            { text: 'CONCEPTO', width: '19%', style: 'textheadertitletable' },
                            { text: 'CANT', width: '5%', style: 'textheadertitletable' },
                            { text: 'VALOR', width: '6%', style: 'textheadertitletable' },
                            { text: 'ESPEC', width: '4%', style: 'textheadertitletable' },
                            { text: 'NOMBRE', width: '10%', style: 'textheadertitletable' }
                        ]
                    }
                ]);
            }
            if (params.FORMATOTABLA == 5) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'COMP',
                                width: '7%',
                                style: 'textheadertitletable',
                                margin: [15, 0]
                            },
                            { text: 'FECHA', width: '6%', style: 'textheadertitletable' },
                            { text: 'DESCRIPCION', width: '15%', style: 'textheadertitletable' },
                            { text: 'EDAD', width: '4%', style: 'textheadertitletable' },
                            { text: 'SEXO', width: '4%', style: 'textheadertitletable' },
                            { text: 'CONCEPTO', width: '19%', style: 'textheadertitletable' },
                            { text: 'CANT', width: '4%', style: 'textheadertitletable' },
                            { text: 'VALOR', width: '7%', style: 'textheadertitletable' },
                            { text: 'CODSERVICIO', width: '7%', style: 'textheadertitletable' },
                            { text: 'EPS', width: '4%', style: 'textheadertitletable' },
                            { text: 'AUTORIZ', width: '6%', style: 'textheadertitletable' },
                            { text: 'COPAGMODER', width: '8%', style: 'textheadertitletable' },
                            { text: 'MEDICO', width: '12%', style: 'textheadertitletable' }
                        ]
                    }
                ]);
            }
            if (params.FORMATOTABLA == 6) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'UPC DEL MES',
                                width: '30%',
                                style: 'textheadertitletable',
                                margin: [20, 0]
                            },
                            { text: 'CONCEPTO', width: '30%', style: 'textheadertitletable' },
                            { text: 'NROUSUARIOS', width: '15%', style: 'textheadertitletable' },
                            { text: 'PORCENT', width: '15%', style: 'textheadertitletable' },
                            { text: 'VALOR', width: '10%', style: 'textheadertitletable' }
                        ]
                    }
                ]);
            }
            if (params.FORMATOTABLA == 7) {
                hearderimpresion[8].table.body.push([
                    {
                        table: {
                            widths: ['40%', '30%', '30%'],
                            body: [
                                [
                                    {
                                        text: 'CODIGO',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'CANTIDAD',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'VALOR',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return i === 0 || i === node.table.body.length ? 0.3 : 0.3;
                            },
                            vLineWidth: function (i, node) {
                                return i === 0 || i === node.table.widths.length ? 0.3 : 0.3;
                            },
                            hLineColor: function (i, node) {
                                return i === 0 || i === node.table.body.length
                                    ? 'black'
                                    : '#8cd3ff';
                            },
                            vLineColor: function (i, node) {
                                return i === 0 || i === node.table.widths.length
                                    ? 'black'
                                    : '#8cd3ff';
                            },
                            paddingLeft: function (i, node) {
                                return 0;
                            },
                            paddingRight: function (i, node) {
                                return 0;
                            },
                            paddingTop: function (i, node) {
                                return 0;
                            },
                            paddingBottom: function (i, node) {
                                return 0;
                            }
                        }
                    }
                ]);
            }
            if (params.FORMATOTABLA == 8) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'COMP',
                                width: '8%',
                                style: 'textheadertitletable',
                                margin: [15, 0]
                            },
                            { text: 'FECHA', width: '7%', style: 'textheadertitletable' },
                            { text: 'CONCEPTO', width: '22%', style: 'textheadertitletable' },
                            { text: 'CANT', width: '5%', style: 'textheadertitletable' },
                            { text: 'VALOR', width: '8%', style: 'textheadertitletable' },
                            { text: 'CODSERVICIO', width: '8%', style: 'textheadertitletable' },
                            { text: 'UNID', width: '5%', style: 'textheadertitletable' },
                            { text: 'ESPECIALIDAD', width: '15%', style: 'textheadertitletable' },
                            { text: 'MEDICO', width: '15%', style: 'textheadertitletable' }
                        ]
                    }
                ]);
            }
            if (params.FORMATOTABLA == 9) {
                hearderimpresion[8].table.body.push([
                    {
                        table: {
                            widths: ['5%', '8%', '30%', '7%', '10%', '10%', '8%', '7%', '15%'],
                            body: [
                                [
                                    {
                                        text: 'COMP',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'FECHA',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'CONCEPTO',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'CANT',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'VLR UNIT',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'VALOR T',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'COD.SERV',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'NRO AUTOR',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    },
                                    {
                                        text: 'ESPECI/C.U.M.',
                                        style: 'textheadertitletable',
                                        fillColor: '#8cd3ff'
                                    }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return i === 0 || i === node.table.body.length ? 0 : 0;
                            },
                            vLineWidth: function (i, node) {
                                return i === 0 || i === node.table.widths.length ? 0 : 0;
                            },
                            hLineColor: function (i, node) {
                                return i === 0 || i === node.table.body.length
                                    ? 'black'
                                    : '#8cd3ff';
                            },
                            vLineColor: function (i, node) {
                                return i === 0 || i === node.table.widths.length
                                    ? 'black'
                                    : '#8cd3ff';
                            },
                            paddingLeft: function (i, node) {
                                return 0;
                            },
                            paddingRight: function (i, node) {
                                return 0;
                            },
                            paddingTop: function (i, node) {
                                return 0;
                            },
                            paddingBottom: function (i, node) {
                                return 0;
                            }
                        }
                    }
                ]);
            }
            if (params.FORMATOTABLA == 10) {
                hearderimpresion[8].table.body.push([
                    {
                        columns: [
                            {
                                text: 'COMP',
                                width: '6%',
                                style: 'textheadertitletable',
                                margin: [8, 0]
                            },
                            { text: 'FECHA', width: '7%', style: 'textheadertitletable' },
                            { text: 'CONCEPTO', width: '17%', style: 'textheadertitletable' },
                            { text: 'CODIGO ATC', width: '9%', style: 'textheadertitletable' },
                            { text: 'CUM', width: '7%', style: 'textheadertitletable' },
                            { text: 'INVIMA', width: '8%', style: 'textheadertitletable' },
                            { text: 'LOTE', width: '5%', style: 'textheadertitletable' },
                            { text: 'MARCA', width: '9%', style: 'textheadertitletable' },
                            { text: 'FECHA VEN', width: '5%', style: 'textheadertitletable' },
                            { text: 'CANT', width: '5%', style: 'textheadertitletable' },
                            { text: 'VLR UNIT', width: '6%', style: 'textheadertitletable' },
                            { text: 'VALOR', width: '5%', style: 'textheadertitletable' },
                            { text: 'IVA', width: '5%', style: 'textheadertitletable' },
                            { text: 'VLR IVA', width: '5%', style: 'textheadertitletable' }
                        ]
                    }
                ]);
            }
            return hearderimpresion;
        },
        content: [
            construirtablaimpresiones(params.FACTURAS, params.COLUMNAS, params.WIDTH),
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: tamanocanvas - 10, y2: 5, lineWidth: 1 }] }
        ],
        styles: {
            titulos: {
                alignment: 'center',
                fontSize: 13,
                bold: true
            },
            titulos2: {
                alignment: 'center',
                fontSize: 10,
                bold: true
            },
            textheader: {
                alignment: 'rigth',
                fontSize: 8
            },
            textheade2: {
                alignment: 'center',
                fontSize: 7
            },
            textheadertitle: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            textheadertitletable: {
                alignment: 'rigth',
                fontSize: 6,
                bold: true
            },
            textheadertable: {
                fontSize: 4
            },
            facturaoriginal: {
                alignment: 'center',
                fontSize: 8,
                bold: true
            },
            textsmall: {
                fontSize: 4,
                bold: true
            },
            textofirma: {
                fontSize: 8,
                bold: true,
                alignment: 'center'
            }
        }
    };
    if (params.FORMATOTABLA == 1) {
        var tamanocelda = '42%';
        if (params.RESUMIDO) tamanocelda = '62%';
    } else if (params.FORMATOTABLA == 2) var tamanocelda = '56%';
    else if (params.FORMATOTABLA == 3 || params.FORMATOTABLA == 7) var tamanocelda = '35%';
    else if (params.FORMATOTABLA == 5) var tamanocelda = '35%';
    else if (params.FORMATOTABLA == 9) var tamanocelda = '35%';
    else if (params.FORMATOTABLA == 6 || params.FORMATOTABLA == 10) var tamanocelda = '65%';
    datosimpresion.content.push({
        columns: [
            { text: '', width: tamanocelda },
            { text: 'TOTAL FACTURA', width: '25%', style: 'textheadertitle' },
            { text: numeroencomas(params.VLRTOTAL), width: '15%', style: 'textheadertitle' }
        ]
    });
    if (params.IMPRESION == 'SER109' || params.IMPRESION == 'SER109H') {
        // SE AGREGA VALDACION PARA CAMBIA EN CONSULTA DEL SER109D A SER808-01
        let nombreabono = 'SECU_ABON'
        let nombrevalor = 'VLR_ABON'
        if (params.TABLARBOS_NUM.length) {
            if (params.TABLARBOS_NUM[0].VLRABON_NUM) {
                nombrevalor = 'VLRABON_NUM'
            }
        }
        for (var i in params.TABLARBOS_NUM) {
            if (params.TABLARBOS_NUM[i][nombreabono].trim() != '' && params.TABLARBOS_NUM[i][nombreabono].substring(0,2) != '' && params.TABLARBOS_NUM[i][nombreabono].substring(0,2) != '00') {
                let tipopago = '';
                switch (params.TABLARBOS_NUM[i][nombreabono].substring(0,2)) {
                    case '1R':
                        tipopago = 'Total abonos recibidos';
                        break;
                    case '2R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '2R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '3R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '4R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '5R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '6R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '7R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case 'GP':
                        tipopago = 'Total glosas aceptadas';
                        break;
                    case 'GT':
                        tipopago = 'Total glosas aceptadas';
                        break;
                    case 'GA':
                        tipopago = 'Total glosas aceptadas';
                        break;
                    default:
                        tipopago = 'Total copagos recibidos';
                        break;
                }
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: tipopago, width: '25%', style: 'textheadertitle' },
                        {
                            text: numeroencomas(
                                parseFloat(
                                    params.TABLARBOS_NUM[i][nombrevalor].replace(/-/g, '')
                                ).toString()
                            ),
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                })
            }
        }
        if (params.SALDOCOPAGO > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Copago pendiente de pago', width: '25%', style: 'textheadertitle' },
                    {
                        text: numeroencomas(params.SALDOCOPAGO),
                        width: '15%',
                        style: 'textheadertitle'
                    }
                ]
            });
        }
        if (params.IMPRESION == 'SER109H' && params.COPAGO > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                    { text: numeroencomas(params.COPAGO), width: '15%', style: 'textheadertitle' }
                ]
            });
        }
        if (
            params.PREFIJOW == 'A' ||
            params.PREFIJOW == 'B' ||
            params.PREFIJOW == 'D' ||
            params.PREFIJOW == 'F' ||
            params.PREFIJOW == 'G' ||
            params.PREFIJOW == 'H' ||
            params.PREFIJOW == 'I' ||
            params.PREFIJOW == 'J' ||
            params.PREFIJOW == 'K' ||
            params.PREFIJOW == 'L' ||
            params.PREFIJOW == 'M' ||
            params.PREFIJOW == 'N'
        ) {
            console.log(params.FORMACOPAGONUM);
            if (params.FORMACOPAGONUM == '2' || params.FORMACOPAGONUM == '3') {
                console.log('aca');
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        {
                            text: 'Total cuotas moderadoras',
                            width: '25%',
                            style: 'textheadertitle'
                        },
                        {
                            text: numeroencomas(params.TOTCTAMODFAME),
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            } else {
                if (params.TOTCTAMODFAME > 0) {
                    datosimpresion.content.push({
                        columns: [
                            { text: '', width: tamanocelda },
                            {
                                text: 'Total cuotas moderadoras',
                                width: '25%',
                                style: 'textheadertitle'
                            },
                            {
                                text: numeroencomas(params.TOTCTAMODFAME),
                                width: '15%',
                                style: 'textheadertitle'
                            }
                        ]
                    });
                } else {
                    datosimpresion.content.push({
                        columns: [
                            { text: '', width: tamanocelda },
                            {
                                text: 'Total cuotas moderadoras',
                                width: '25%',
                                style: 'textheadertitle'
                            },
                            { text: params.TOTCTAMODFAME, width: '15%', style: 'textheadertitle' }
                        ]
                    });
                }
                if (params.TOTCOPAGOFAME > 0) {
                    datosimpresion.content.push({
                        columns: [
                            { text: '', width: tamanocelda },
                            {
                                text: 'Total copagos recibidos',
                                width: '25%',
                                style: 'textheadertitle'
                            },
                            { text: params.TOTCOPAGOFAME, width: '15%', style: 'textheadertitle' }
                        ]
                    });
                } else {
                    datosimpresion.content.push({
                        columns: [
                            { text: '', width: tamanocelda },
                            {
                                text: 'Total copagos recibidos',
                                width: '25%',
                                style: 'textheadertitle'
                            },
                            { text: params.TOTCOPAGOFAME, width: '15%', style: 'textheadertitle' }
                        ]
                    });
                }
            }
        }
    }
    //      else if ((params.PREFIJOW == "P" || params.PREFIJOW == "O" || params.PREFIJOW == "Q" || params.PREFIJOW == "R" || params.PREFIJOW == "S" || params.PREFIJOW == "U") && params.ABONOSW == 0) {
    //      let abonos = 0;
    //      if (params.NIT == 900161116) {
    //        abonos = params.TOTCTAMODFAME + params.TOTCOPAGOFAME;
    //      }
    //      if (parseInt(params.NITNUM) == 860078828 && (parseInt(params.NIT) == 892000401 || parseInt(params.NIT) == 900161116)) {
    //        datosimpresion.content.push({
    //          columns: [
    //            { text: "", width: tamanocelda },
    //            { text: "Descuento Nro 1", width: "25%", style: "textheadertitle" },
    //            { text: abonos, width: "15%", style: "textheadertitle" },
    //          ],
    //        });
    //      } else {
    //        datosimpresion.content.push({
    //          columns: [
    //            { text: "", width: tamanocelda },
    //            { text: "Total copagos recibidos", width: "25%", style: "textheadertitle" },
    //            { text: abonos, width: "15%", style: "textheadertitle" },
    //          ],
    //        });
    //      }
    //    }
    //  }
    else if (params.IMPRESION == 'SER109W') {
        for (var i in params.TABLARBOS_NUM) {
            if (params.TABLARBOS_NUM[i].LOTEABON_NUM.trim() != '') {
                let tipopago = '';
                switch (params.TABLARBOS_NUM[i].LOTEABON_NUM) {
                    case '1R':
                        tipopago = 'Total abonos recibidos';
                        break;
                    case '2R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '2R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '3R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '4R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '5R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '6R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case '7R':
                        if (params.NIT == 9998 || params.NIT == 9999 || params.NIT == 222222222)
                            tipopago = 'Total abonos recibidos';
                        else tipopago = 'Total copagos recibidos';
                        break;
                    case 'GP':
                        tipopago = 'Total glosas aceptadas';
                        break;
                    case 'GT':
                        tipopago = 'Total glosas aceptadas';
                        break;
                    case 'GA':
                        tipopago = 'Total glosas aceptadas';
                        break;
                    default:
                        tipopago = 'Total copagos recibidos';
                        break;
                }
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: tipopago, width: '25%', style: 'textheadertitle' },
                        {
                            text: params.TABLARBOS_NUM[i].VLRABON_NUM,
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            }
        }
        if (params.SALDOCOPAGO > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Copago pendiente de pago', width: '25%', style: 'textheadertitle' },
                    {
                        text: numeroencomas(params.SALDOCOPAGO),
                        width: '15%',
                        style: 'textheadertitle'
                    }
                ]
            });
        }
        if ($_USUA_GLOBAL[0].NIT == 900405505) {
            if (params.TOTCTAMODFAME > 0) {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        {
                            text: 'Total cuotas moderadoras',
                            width: '25%',
                            style: 'textheadertitle'
                        },
                        {
                            text: numeroencomas(params.TOTCTAMODFAME),
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            } else {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        {
                            text: 'Total cuotas moderadoras',
                            width: '25%',
                            style: 'textheadertitle'
                        },
                        { text: '0', width: '15%', style: 'textheadertitle' }
                    ]
                });
            }
            if (params.TOTCOPAGOFAME > 0) {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                        {
                            text: numeroencomas(params.TOTCOPAGOFAME),
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            } else {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                        { text: '0', width: '15%', style: 'textheadertitle' }
                    ]
                });
            }
        } else {
            if (params.TOTCOPAGO > 0) {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                        {
                            text: numeroencomas(params.TOTCOPAGO),
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            }
        }
    } else if (params.IMPRESION == 'SER109N') {
        if (
            (params.PREFIJOW == 'P' ||
                params.PREFIJOW == 'O' ||
                params.PREFIJOW == 'Q' ||
                params.PREFIJOW == 'R' ||
                params.PREFIJOW == 'S' ||
                params.PREFIJOW == 'U') &&
            params.ABONOSW == 0
        ) {
            let abonos = 0;
            if (params.NIT == 900161116) {
                abonos = params.TOTCTAMODFAME + params.TOTCOPAGOFAME;
            }
            if (
                parseInt(params.NITNUM) == 860078828 &&
                (parseInt(params.NIT) == 892000401 || parseInt(params.NIT) == 900161116)
            ) {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: 'Descuento Nro 1', width: '25%', style: 'textheadertitle' },
                        { text: abonos, width: '15%', style: 'textheadertitle' }
                    ]
                });
            } else {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                        { text: abonos, width: '15%', style: 'textheadertitle' }
                    ]
                });
            }
        }
        if (params.COPAGO > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                    { text: numeroencomas(params.COPAGO), width: '15%', style: 'textheadertitle' }
                ]
            });
        }
    } else if (params.IMPRESION == 'SER109F') {
        if (params.SALDOCOPAGO > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                    {
                        text: numeroencomas(params.SALDOCOPAGO),
                        width: '15%',
                        style: 'textheadertitle'
                    }
                ]
            });
        }
        if (params.COPAGO > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                    { text: numeroencomas(params.COPAGO), width: '15%', style: 'textheadertitle' }
                ]
            });
        }
    } else if (params.IMPRESION == 'SER109Q') {
        datosimpresion.content.push({
            columns: [
                { text: '', width: tamanocelda },
                { text: 'Valor bruto', width: '25%', style: 'textheadertitle' },
                { text: numeroencomas(params.VALORBRUTO), width: '15%', style: 'textheadertitle' }
            ]
        });
        datosimpresion.content.push({
            columns: [
                { text: '', width: tamanocelda },
                { text: 'Menos descuentos', width: '25%', style: 'textheadertitle' },
                { text: numeroencomas(params.DESCUENTOS), width: '15%', style: 'textheadertitle' }
            ]
        });
        if (params.IVA > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Mas I.V.A.', width: '25%', style: 'textheadertitle' },
                    { text: numeroencomas(params.IVA), width: '15%', style: 'textheadertitle' }
                ]
            });
        }
        datosimpresion.content.push({
            columns: [
                { text: '', width: tamanocelda },
                { text: 'Neto facturado', width: '25%', style: 'textheadertitle' },
                {
                    text: numeroencomas(params.NETOFACTURADO),
                    width: '15%',
                    style: 'textheadertitle'
                }
            ]
        });
        if (params.ABONOS > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Menos abonos', width: '25%', style: 'textheadertitle' },
                    { text: numeroencomas(params.ABONOS), width: '15%', style: 'textheadertitle' }
                ]
            });
        }
        if (params.COPAGO > 0 && params.COPAGOS == 0 && params.ABONOS == 0) {
            if (params.COPAGO > 0 || params.COPAGOS > 0 || params.COPAGOSW > 0) {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: 'Copago estimado', width: '25%', style: 'textheadertitle' },
                        {
                            text: numeroencomas(params.COAPGO),
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            }
        } else {
            if (params.COPAGO > 0 || params.COPAGOS > 0 || params.COPAGOSW > 0) {
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: 'Total copagos recibidos', width: '25%', style: 'textheadertitle' },
                        {
                            text: numeroencomas(params.COPAGOSW),
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            }
        }
        if (params.CUOTAM > 0) {
            datosimpresion.content.push({
                columns: [
                    { text: '', width: tamanocelda },
                    { text: 'Total cuotas moderadoras', width: '25%', style: 'textheadertitle' },
                    { text: numeroencomas(params.CUOTAM), width: '15%', style: 'textheadertitle' }
                ]
            });
        }
    } else if (params.IMPRESION == 'SER109V' || params.IMPRESION == 'SER109F') {
        for (var i in params.TABLARBOS_NUM) {
            if (params.TABLARBOS_NUM[i].LOTEABON_NUM.trim() != '') {
                let tipopago = '';
                if (
                    params.TABLARBOS_NUM[i].LOTEABON_NUM == '30' ||
                    params.TABLARBOS_NUM[i].LOTEABON_NUM == '40' ||
                    params.TABLARBOS_NUM[i].LOTEABON_NUM == '50'
                ) {
                    tipopago = 'COPAGOS DEL MES';
                } else {
                    switch (params.TABLARBOS_NUM[i].LOTEABON_NUM.substring(1, 2)) {
                        case 'R':
                            tipopago = 'RECIBO DE CAJA';
                            break;
                        case 'G':
                            tipopago = 'NOTAS DE CONTAB';
                            break;
                        default:
                            if (params.TABLARBOS_NUM[i].LOTEABON_NUM.substring(0, 1) == 'G') {
                                tipopago = 'GLOSAS';
                            }
                            break;
                    }
                }
                datosimpresion.content.push({
                    columns: [
                        { text: '', width: tamanocelda },
                        { text: tipopago, width: '25%', style: 'textheadertitle' },
                        {
                            text: params.TABLARBOS_NUM[i].VLRABON_NUM,
                            width: '15%',
                            style: 'textheadertitle'
                        }
                    ]
                });
            }
        }
    }
    datosimpresion.content.push({
        columns: [
            { text: '', width: tamanocelda },
            { text: 'Saldo neto factura', width: '25%', style: 'textheadertitle' },
            { text: numeroencomas(params.SALDO), width: '15%', style: 'textheadertitle' }
        ]
    });
    datosimpresion.content.push({
        text: ' '
    });
    datosimpresion.content.push(
        { text: params.NUMEROENLETRAS, style: 'textheader' },
        { text: ' ' },
        { text: ' ' }
    );
    if (params.IMPRESION == 'SER109N') {
        if (params.OBSERVNUM.trim() != '') {
            datosimpresion.content.push({
                columns: [
                    { text: 'OBSERVAC : ', width: '15%', style: 'textheadertitle', margin: [5, 0] },
                    { text: params.OBSERVNUM, width: '75%', style: 'textheader' }
                ]
            });
        }
        if (params.ANEXOSNUM.trim() != '') {
            datosimpresion.content.push({
                columns: [
                    { text: 'ANEXOS : ', width: '15%', style: 'textheadertitle', margin: [5, 0] },
                    { text: params.ANEXOSNUM, width: '75%', style: 'textheader' }
                ]
            });
        }
    }
    if ($_USUA_GLOBAL[0].NIT == 892000264) {
        datosimpresion.content.push(
            { text: ' ' },
            { text: ' ' },
            {
                image: 'firma',
                fit: [100, 100],
                margin: [100, 0]
            },
            { canvas: [{ type: 'line', x1: 80, y1: 0, x2: 220, y2: 0, lineWidth: 1 }] },
            { canvas: [{ type: 'line', x1: 380, y1: 0, x2: 480, y2: 0, lineWidth: 1 }] }
        );
    } else {
        datosimpresion.content.push(
            {
                image: 'firma',
                fit: [100, 100]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 140, y2: 0, lineWidth: 1 }] },
            { canvas: [{ type: 'line', x1: x21firma, y1: 0, x2: x22firma, y2: 0, lineWidth: 1 }] }
        );
    }
    if (params.FIRMA == 1) {
        datosimpresion.content.push(
            {
                columns: [
                    { text: $_USUA_GLOBAL[0].NOMBRE, width: '30%', style: 'textheadertitle' },
                    {
                        text: 'Firma de recibido por la prestacion de los servicios y acepto para el pago',
                        width: '50%',
                        style: 'textheadertitle'
                    }
                ]
            },
            {
                columns: [
                    { text: ' ', width: '65%', style: 'textheadertitle' },
                    { text: 'CERRO:', width: '5%', style: 'textheadertitle' },
                    { text: params.OPERBLOQNUM, width: '5%', style: 'textheadertitle' },
                    { text: 'ABRE:', width: '5%', style: 'textheadertitle' },
                    { text: params.OPERNUM, width: '5%', style: 'textheadertitle' },
                    { text: 'IMP:', width: '5%', style: 'textheadertitle' },
                    { text: params.ADMINW, width: '5%', style: 'textheadertitle' }
                ]
            }
        );
    } else {
        if ($_USUA_GLOBAL[0].NIT == 892000264) {
            datosimpresion.content.push({
                columns: [
                    { text: 'JAIME MORENO ROJAS', width: '50%', style: 'textofirma' },
                    { text: 'Aceptada', width: '50%', style: 'textofirma' }
                ]
            });
            datosimpresion.content.push(
                {
                    columns: [
                        { text: 'Firma representante legal', width: '50%', style: 'textofirma' }
                    ]
                },
                {
                    columns: [{ text: $_USUA_GLOBAL[0].NOMBRE, width: '50%', style: 'textofirma' }]
                }
            );
            datosimpresion.content.push({
                columns: [{ text: ' ', width: '100%', style: 'textheadertitle' }]
            });
        } else {
            datosimpresion.content.push({
                columns: [
                    { text: $_USUA_GLOBAL[0].NOMBRE, width: '30%', style: 'textheadertitle' },
                    { text: 'Aceptada', width: '10%', style: 'textosmall' },
                    { text: 'CREO:', width: '5%', style: 'textosmall' },
                    {
                        text: params.FECHAOPER + ' ' + params.OPERNUM,
                        width: '10%',
                        style: 'textosmall'
                    },
                    { text: 'MODI:', width: '5%', style: 'textosmall' },
                    {
                        text: params.FECHAMODOPER + ' ' + params.OPERMODNUM,
                        width: '10%',
                        style: 'textosmall'
                    },
                    { text: 'BLOQ:', width: '5%', style: 'textosmall' },
                    {
                        text: params.FECHARETOPER + ' ' + params.OPERBLOQNUM,
                        width: '10%',
                        style: 'textosmall'
                    },
                    { text: 'IMP:', width: '5%', style: 'textosmall' },
                    {
                        text: params.FECHAIMPRESION + ' ' + params.ADMINW,
                        width: '10%',
                        style: 'textosmall'
                    }
                ]
            });
        }
    }

    if (params.FINALIMPRESION == '1') {
        datosimpresion.content.push(
            { text: 'FACTURA IMPRESA POR COMPUTADOR', style: 'textheader' },
            { text: ' ' },
            {
                columns: [
                    { text: 'AUTORIZACION DIAN : ', width: '15%', style: 'textheader' },
                    { text: params.PREFIJO[0].AUT_DIAN, width: '13%', style: 'textheader' }
                ]
            },
            { text: params.IVA, style: 'textheader' },
            {
                text: 'LA PRESENTE FACTURA SE ASIMILA EN SUS EFECTOS A UNA LETRA DE CAMBIO ART 779 CODIGO DE COMERCIO',
                style: 'textheader'
            }
        );
    } else {
        datosimpresion.content.push(
            { text: 'FACTURA IMPRESA POR COMPUTADOR', style: 'textheader' },
            { text: ' ' },
            {
                columns: [
                    { text: 'AUTORIZACION DIAN : ', width: '15%', style: 'textheader' },
                    { text: params.PREFIJO[0].AUT_DIAN, width: '15%', style: 'textheader' }
                ]
            },
            {
                columns: [
                    { text: 'PREFIJO', width: '7%', style: 'textheader' },
                    { text: params.PREFIJO[0].PREFIJO, width: '3%', style: 'textheader' },
                    { text: 'RANGO', width: '7%', style: 'textheader' },
                    {
                        text: params.PREFIJO[0].DESDE_NRO + ' - ' + params.PREFIJO[0].HASTA_NRO,
                        width: '20%',
                        style: 'textheader'
                    },
                    {
                        text:
                            'DESDE : ' +
                            params.PREFIJO[0].FECHA_INI +
                            ' HASTA : ' +
                            params.PREFIJO[0].FECHA_FIN,
                        width: '100%',
                        style: 'textheader'
                    }
                ]
            },
            { text: params.IVA, style: 'textheader' },
            {
                text: 'LA PRESENTE FACTURA SE ASIMILA EN SUS EFECTOS A UNA LETRA DE CAMBIO ART 779 CODIGO DE COMERCIO',
                style: 'textheader'
            }
        );
        if ($_USUA_GLOBAL[0].NIT == 892000264) {
            datosimpresion.content.push(
                { text: ' ' },
                {
                    columns: [
                        { text: 'CREO:', width: '3%', style: 'textsmall' },
                        {
                            text: params.FECHAOPER + ' ' + params.OPERNUM,
                            width: '5%',
                            style: 'textsmall'
                        },
                        { text: 'MODI:', width: '3%', style: 'textsmall' },
                        {
                            text: params.FECHAMODOPER + ' ' + params.OPERMODNUM,
                            width: '5%',
                            style: 'textsmall'
                        },
                        { text: 'BLOQ:', width: '3%', style: 'textsmall' },
                        {
                            text: params.FECHARETOPER + ' ' + params.OPERBLOQNUM,
                            width: '5%',
                            style: 'textsmall'
                        },
                        { text: 'IMP:', width: '3%', style: 'textsmall' },
                        {
                            text: params.FECHAIMPRESION + ' ' + params.ADMINW,
                            width: '5%',
                            style: 'textsmall'
                        }
                    ]
                }
            );
        }
    }
    datosimpresion.images = {
        logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png',
        firma: 'P:\\PROG\\FIRMAS\\' + params.FIRMA1 + '.png'
    };
    if (params.MASIVO) {
        _impresion2({
            tipo: 'pdf',
            content: datosimpresion,
            archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`,
            abrir_archivo: false
        });
    } else {
        _impresion2({
            tipo: 'pdf',
            content: datosimpresion,
            archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`
        })
            .then(() => {
                callback();
            })
            .catch((err) => {
                console.error(err);
                errcallback();
            });
    }
}

function _impresioncopagosyrecibosdecaja(params, errcallback, callback) {
    if (params.TIPOFACTURA) {
        console.log(params.TIPOFACTURA);
        if (params.TIPOFACTURA == 'FAC138') {
            console.log('entro');
            var datosimpresion = {
                pageSize: 'A4',
                pageMargins: [10, 75, 10, 20],
                header: function (currentPage, pageCount, pageSize) {
                    return [
                        { text: ' ' },
                        {
                            text: 'Página ' + currentPage + ' de ' + pageCount,
                            style: 'textheadertitle',
                            absolutePosition: { x: 500, y: 5 }
                        },
                        { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 580, y2: 5, lineWidth: 1 }] },
                        {
                            image: 'logo',
                            fit: [60, 20],
                            absolutePosition: { x: 38, y: 25 }
                        },
                        {
                            columns: [
                                {
                                    text: $_USUA_GLOBAL[0].NOMBRE,
                                    width: '80%',
                                    style: 'titulos',
                                    margin: [120, 0, 0, 0]
                                }, // NOMBRE USUARIO || NOMBRE ALT
                                { text: params.LOTE, width: '5%', style: 'titulos' } // LOTE MOV
                            ]
                        },
                        {
                            columns: [
                                {
                                    text: numeroencomas($_USUA_GLOBAL[0].NIT),
                                    width: '50%',
                                    style: 'textheadertitle',
                                    margin: [120, 0, 0, 0]
                                }, // NIT USUARIO SIN CEROS
                                { text: params.NOMBRELOTE, width: '30%', style: 'titulos' }, // NOMBRE LOTE
                                { text: 'No.', width: '7%', style: 'textheadertitle' },
                                { text: params.COMPROBANTE, width: '5%', style: 'textheadertitle' } // COMP-INGRESO
                            ]
                        },
                        {
                            columns: [
                                {
                                    text: $_USUA_GLOBAL[0].DIRECC,
                                    width: '50%',
                                    style: 'textheadertitle',
                                    margin: [120, 0, 0, 0]
                                }, // DIRECCION USUARIO || DIRECCION ALTERNA
                                { text: 'TEL.', width: '5%', style: 'textheadertitle' },
                                {
                                    text: $_USUA_GLOBAL[0].TEL,
                                    width: '25%',
                                    style: 'textheadertitle'
                                }, // TELEFONO USUARIO || TELEFONO ALTERNO
                                { text: 'FECHA : ', width: '7%', style: 'textheadertitle' },
                                { text: params.FECHA, width: '10%', style: 'textheadertitle' }
                            ]
                        },
                        { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                        {
                            columns: [
                                {
                                    text: 'CODIGO',
                                    width: '15%',
                                    style: 'textheadertitletable',
                                    margin: [10, 0]
                                },
                                { text: 'CT', width: '5%', style: 'textheadertitletable' },
                                {
                                    text: 'DESCRIPCION',
                                    width: '20%',
                                    style: 'textheadertitletable'
                                },
                                { text: 'FACT', width: '5%', style: 'textheadertitletable' },
                                { text: 'NIT', width: '10%', style: 'textheadertitletable' },
                                { text: 'DETALLE', width: '20%', style: 'textheadertitletable' },
                                { text: 'DEBITOS', width: '12%', style: 'textheadertitletable' },
                                { text: 'CREDITOS', width: '12%', style: 'textheadertitletable' }
                            ]
                        },
                        { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 2, lineWidth: 1 }] }
                    ];
                },
                content: [
                    // construirtablaimpresiones(params.TABLA, ['CODIGO','DESCRIPCION','DOCUMENTO','VLRDEBITO','VLRCREDITO']),
                    construirtablaimpresiones(params.TABLA, params.COLUMNAS, params.WIDTH),
                    { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 570, y2: 5, lineWidth: 1 }] },
                    { text: ' ' },
                    {
                        columns: [
                            {
                                text: '',
                                width: '55%',
                                style: 'textheadertitletable',
                                margin: [10, 0]
                            },
                            {
                                text: 'TOTAL COMPORBANTE',
                                width: '20%',
                                style: 'textheadertitletable'
                            },
                            { text: params.VLRDEBITO, width: '12%', style: 'textheadertitletable' },
                            { text: params.VLRCREDITO, width: '12%', style: 'textheadertitletable' }
                        ]
                    },
                    { text: ' ' },
                    { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 570, y2: 5, lineWidth: 1 }] },
                    {
                        columns: [
                            {
                                text: 'DOCUMENTO : ',
                                width: '15%',
                                style: 'textheadertable',
                                margin: [10, 0]
                            },
                            { text: params.DOCUMENTO, width: '5%', style: 'textheadertable' },
                            { text: 'COMPROMISO', width: '10%', style: 'textheadertable' },
                            { text: params.COMPROMISO, width: '5%', style: 'textheadertable' },
                            { text: 'NRO. CHEQUE', width: '7%', style: 'textheadertable' },
                            { text: params.NROCHEQUE, width: '7%', style: 'textheadertable' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'BANCO : ',
                                width: '15%',
                                style: 'textheadertable',
                                margin: [10, 0]
                            },
                            { text: params.BANCO, width: '35%', style: 'textheadertable' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'RUBRO : ',
                                width: '15%',
                                style: 'textheadertable',
                                margin: [10, 0]
                            },
                            { text: params.RUBRO, width: '35%', style: 'textheadertable' }
                        ]
                    },
                    { text: ' ' },
                    {
                        columns: [
                            { text: ' ', width: '50%', style: 'textheadertable' },
                            { text: $_USUA_GLOBAL[0].NOMBRE, width: '50%', style: 'titulos' }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'ELABORO : ',
                                width: '6%',
                                style: 'textheadertable',
                                margin: [10, 0]
                            },
                            { text: params.ELABORO, width: '6%', style: 'textheadertable' },
                            { text: 'REVISO : ', width: '6%', style: 'textheadertable' },
                            { text: ' ', width: '4%', style: 'textheadertable' },
                            { text: 'APROBO : ', width: '6%', style: 'textheadertable' },
                            { text: ' ', width: '4%', style: 'textheadertable' },
                            { text: 'IMP : ', width: '3%', style: 'textheadertable' },
                            { text: params.IMPRIMIO, width: '6%', style: 'textheadertable' }
                        ]
                    }
                ],
                styles: {
                    titulos: {
                        fontSize: 13,
                        bold: true
                    },
                    textheader: {
                        alignment: 'rigth',
                        fontSize: 8
                    },
                    textheadertitle: {
                        alignment: 'rigth',
                        fontSize: 8,
                        bold: true
                    },
                    textheadertitletable: {
                        alignment: 'rigth',
                        fontSize: 8,
                        bold: true
                    },
                    textheadertable: {
                        fontSize: 6
                    },
                    textheaderusuario: {
                        fontSize: 15
                    },
                    valorenletras: {
                        fontSize: 13,
                        alignment: 'center'
                    }
                }
            };
        }
    } else {
        var datosimpresion = {
            pageSize: 'A4',
            pageMargins: [10, 170, 10, 20],
            header: function (currentPage, pageCount, pageSize) {
                // you can apply any logic and return any valid pdfmake element
                return [
                    { text: ' ' },
                    {
                        text: 'Página ' + currentPage + ' de ' + pageCount,
                        style: 'textheadertitle',
                        absolutePosition: { x: 500, y: 5 }
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 580, y2: 5, lineWidth: 1 }] },
                    {
                        image: 'logo',
                        fit: [80, 120],
                        absolutePosition: { x: 25, y: 35 }
                    },
                    {
                        columns: [
                            {
                                text: $_USUA_GLOBAL[0].NOMBRE,
                                width: '80%',
                                style: 'titulos',
                                margin: [120, 0, 0, 0]
                            }, // NOMBRE USUARIO || NOMBRE ALT
                            { text: params.LOTE, width: '5%', style: 'titulos' }, // LOTE MOV
                            { text: 'SUC :', width: '7%', style: 'titulos' },
                            { text: $_USUA_GLOBAL[0].PREFIJ, width: '5%', style: 'titulos' } // PREFIJO USU || PREFIJO ALT
                        ]
                    },
                    {
                        columns: [
                            {
                                text: numeroencomas($_USUA_GLOBAL[0].NIT),
                                width: '50%',
                                style: 'textheadertitle',
                                margin: [120, 0, 0, 0]
                            }, // NIT USUARIO SIN CEROS
                            { text: params.NOMBRELOTE, width: '30%', style: 'titulos' }, // NOMBRE LOTE
                            { text: 'No.', width: '7%', style: 'textheadertitle' },
                            { text: params.COMPROBANTE, width: '7%', style: 'textheadertitle' } // COMP-INGRESO
                        ]
                    },
                    {
                        columns: [
                            {
                                text: $_USUA_GLOBAL[0].DIRECC.trim(),
                                width: '50%',
                                style: 'textheadertitle',
                                margin: [120, 0, 0, 0]
                            }, // DIRECCION USUARIO || DIRECCION ALTERNA
                            { text: 'TEL.', width: '5%', style: 'textheadertitle' },
                            {
                                text: $_USUA_GLOBAL[0].TEL.trim(),
                                width: '20%',
                                style: 'textheadertitle'
                            }, // TELEFONO USUARIO || TELEFONO ALTERNO
                            { text: 'FECHA : ', width: '7%', style: 'textheadertitle' },
                            {
                                text: params.FECHA.toUpperCase(),
                                width: '15%',
                                style: 'textheadertitle'
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: $_USUA_GLOBAL[0].NOMBRE_CIU.trim(),
                                width: '30%',
                                style: 'textheadertitle',
                                margin: [120, 0, 0, 0]
                            } // NOMBRE CIUDAD USU
                        ]
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 580, y2: 5, lineWidth: 1 }] },
                    {
                        columns: [
                            {
                                text: 'RECIBI DE :',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [10, 0, 0, 0]
                            },
                            {
                                text: params.DESCRIPCIONTERCERO,
                                width: '45%',
                                style: 'textheadertitle'
                            }, // NOMBRE PACI
                            { text: 'ID :', width: '5%', style: 'textheadertitle' },
                            { text: params.IDTERCERO, width: '35%', style: 'textheadertitle' } // ID PACI
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'DIRECCION :',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [10, 0, 0, 0]
                            },
                            {
                                text: params.DIRECCIONTERCERO,
                                width: '45%',
                                style: 'textheadertitle'
                            }, // DIRECCION PACI
                            { text: 'TEL :', width: '5%', style: 'textheadertitle' },
                            { text: params.TELEFONOTERCERO, width: '35%', style: 'textheadertitle' } // TELEFONO PACI
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'LA SUMA DE :',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [10, 0, 0, 0]
                            },
                            { text: params.VALORENLETRAS, width: '85%', style: 'textheadertitle' } // VALOR TOTAL DEL COMPROBANTE
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'LA CUENTA DE :',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [10, 0, 0, 0]
                            },
                            { text: params.DESCRIPCIONID, width: '45%', style: 'textheadertitle' }, // ID-MOV
                            { text: 'ID :', width: '5%', style: 'textheadertitle' },
                            { text: params.IDMOV, width: '35%', style: 'textheadertitle' } // ID-MOV
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'DETALLE :',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [10, 0, 0, 0]
                            },
                            { text: params.DETALLEMOV, width: '85%', style: 'textheadertitle' } // DETALLE MOV
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'F.PAGO :',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [10, 0, 0, 0]
                            },
                            { text: params.REFERMOV, width: '45%', style: 'textheadertitle' }, // REFER MOV
                            { text: params.OTROMOV, width: '5%', style: 'textheadertitle' }, // OTRO MOV
                            { text: params.TIPOCOMP, width: '35%', style: 'textheadertitle' } // TIPO COMP L
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'VALOR $',
                                width: '15%',
                                style: 'textheadertitle',
                                margin: [10, 0, 0, 0]
                            },
                            {
                                text: params.VLRCREDITO,
                                width: '60%',
                                style: 'textheadertitle',
                                fontSize: 10
                            } // VALOR SIN LETRAS
                        ]
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                    {
                        columns: [
                            {
                                text: 'CODIGO',
                                width: '15%',
                                style: 'textheadertitletable',
                                margin: [10, 0]
                            },
                            {
                                text: 'NOMBRE DE LA CUENTA',
                                width: '40%',
                                style: 'textheadertitletable'
                            },
                            { text: 'DOCUMENTO', width: '15%', style: 'textheadertitletable' },
                            { text: 'DEBITOS', width: '15%', style: 'textheadertitletable' },
                            { text: 'CREDITOS', width: '15%', style: 'textheadertitletable' }
                        ]
                    },
                    { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] }
                ];
            },
            content: [
                // construirtablaimpresiones(params.TABLA, ['CODIGO','DESCRIPCION','DOCUMENTO','VLRDEBITO','VLRCREDITO']),
                construirtablaimpresiones(params.TABLA, params.COLUMNAS, params.WIDTH),
                { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 570, y2: 5, lineWidth: 1 }] },
                {
                    columns: [
                        { text: '', width: '15%', style: 'textheadertitletable', margin: [10, 0] },
                        {
                            text: 'SUMAS IGUALES --------->',
                            width: '40%',
                            style: 'textheadertitletable'
                        },
                        { text: '', width: '15%', style: 'textheadertitletable' },
                        { text: params.VLRDEBITO, width: '15%', style: 'textheadertitletable' },
                        { text: params.VLRCREDITO, width: '15%', style: 'textheadertitletable' }
                    ]
                },
                { text: ' ' },
                { text: ' ' },
                {
                    columns: [
                        {
                            text: 'Recibi, ',
                            width: '8%',
                            style: 'textheadertitletable',
                            margin: [10, 0]
                        },
                        {
                            text: '________________________________',
                            width: '25%',
                            style: 'textheadertitletable'
                        },
                        { text: params.OPERMOV, width: '10%', style: 'textheadertitletable' } // OPER MOV
                    ]
                },
                { text: ' ' },
                { text: ' ' },
                { text: params.VALORENLETRAS, style: 'valorenletras', width: '100%' }
            ],
            styles: {
                titulos: {
                    fontSize: 13,
                    bold: true
                },
                textheader: {
                    alignment: 'rigth',
                    fontSize: 8
                },
                textheadertitle: {
                    alignment: 'rigth',
                    fontSize: 9,
                    bold: true
                },
                textheadertitletable: {
                    alignment: 'rigth',
                    fontSize: 8,
                    bold: true
                },
                textheadertable: {
                    fontSize: 6
                },
                textheaderusuario: {
                    fontSize: 15
                },
                valorenletras: {
                    fontSize: 13,
                    alignment: 'center'
                }
            }
        };
    }
    console.log(datosimpresion);
    datosimpresion.images = {
        logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png'
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}

function _impresionformatoSER109J(params, callback, errcallback) {
    let datosimpresion = {
        pageSize: 'A4',
        pageMargins: params.MARGIN,
        header: function (currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element
            return [
                {
                    image: 'logo',
                    fit: [60, 60],
                    absolutePosition: { x: 40, y: 25 }
                },
                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, style: 'titulos', margin: [120, 0] },
                {
                    text: `NIT ${numeroencomas($_USUA_GLOBAL[0].NIT)} - ${$_USUA_GLOBAL[0].DV}`,
                    style: 'titulos',
                    margin: [120, 0]
                },
                { text: `${$_USUA_GLOBAL[0].DIRECC}`, style: 'titulos', margin: [120, 0] },
                { text: `TEL  :  ${$_USUA_GLOBAL[0].TEL}`, style: 'titulos', margin: [120, 0] },
                { text: params.REFER1TER, style: 'titulos', margin: [120, 0] },
                { text: params.REFER2TER, style: 'titulos', margin: [120, 0] },
                { text: `${$_USUA_GLOBAL[0].NOMBRE_CIU}`, style: 'titulos', margin: [120, 0] },
                { canvas: [{ type: 'line', x1: 370, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                {
                    text: `FECHA DE FACTURA : ${params.FECHAFACT}`,
                    style: 'tituloizquierda',
                    margin: [0, 0, 20, 0]
                },
                {
                    text: `FECHA VENCE : ${params.FECHAVENCE} días`,
                    style: 'tituloizquierda',
                    margin: [0, 0, 20, 0]
                },
                { canvas: [{ type: 'line', x1: 370, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                {
                    columns: [
                        {
                            text: 'SEÑORES : ',
                            width: '15%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: `${params.NOMBRETER}`, width: '25%', style: 'textheader' },
                        { text: 'FACTURA DE VENTA NO. : ', width: '16%', style: 'textheadertitle' },
                        {
                            text: `${params.LLAVE.substring(0, 1)} ${parseInt(
                                params.LLAVE.substring(1, 7)
                            )}`,
                            width: '10%',
                            style: 'textheader'
                        },
                        { text: 'NIT :', width: '5%', style: 'textheadertitle' },
                        {
                            text: `${params.NITTER} - ${params.DVTER}`,
                            width: '15%',
                            style: 'textheader'
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'DIRECCION : ',
                            width: '15%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: `${params.DIRECCTER}`, width: '25%', style: 'textheader' },
                        { text: 'TELEFONO : ', width: '15%', style: 'textheadertitle' },
                        { text: `${params.TELTER}`, width: '11%', style: 'textheader' },
                        { text: 'CIUDAD : ', width: '7%', style: 'textheadertitle' },
                        { text: `${params.CIUDADTER}`, width: '10%', style: 'textheader' }
                    ]
                },
                { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 580, y2: 5, lineWidth: 1 }] },
                {
                    text: `Contrato: ${params.CONTRATO}`,
                    style: 'tituloizquierda',
                    margin: [0, 0, 50, 0]
                },
                { canvas: [{ type: 'line', x1: 420, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                {
                    columns: [
                        {
                            text: 'Nombre (s) Paciente : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: `${params.NOMBREPACI}`, width: '35%', style: 'textheader' }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'Apellido (s) Paciente : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: `${params.APELLIDOPACI}`, width: '50%', style: 'textheader' },
                        { text: 'Identificación : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.IDPACI}`, width: '15%', style: 'textheader' }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'OBSERVACION : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: `${params.OBSERVACION}`, width: '50%', style: 'textheader' },
                        { text: 'Edad : ', width: '5%', style: 'textheadertitle' },
                        { text: `${params.EDAD}`, width: '15%', style: 'textheader' }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'Nombre acompañante : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: `${params.NOMBREACOMPAÑANTE}`, width: '75%', style: 'textheader' }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'Ingreso de albergue : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: `${params.INGRESO}`, width: '50%', style: 'textheader' },
                        { text: 'Tipo de cuenta : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.TIPOCUENTA}`, width: '10%', style: 'textheader' }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'Hospitalización : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: 'Desde : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.HOSPDESDE}`, width: '10%', style: 'textheader' },
                        { text: 'Hasta : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.HOSPHASTA}`, width: '10%', style: 'textheader' },
                        { text: 'Total días : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.TOTALHOSP}`, width: '10%', style: 'textheader' }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'Albergue Paciente : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: 'Desde : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.ALBDESDE}`, width: '10%', style: 'textheader' },
                        { text: 'Hasta : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.ALBHASTA}`, width: '10%', style: 'textheader' },
                        { text: 'Total días : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.ALBTOTAL}`, width: '10%', style: 'textheader' }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'Albergue Acompañante : ',
                            width: '21%',
                            style: 'textheadertitle',
                            margin: [20, 0]
                        },
                        { text: 'Desde : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.ALBADESDE}`, width: '10%', style: 'textheader' },
                        { text: 'Hasta : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.ALBAHASTA}`, width: '10%', style: 'textheader' },
                        { text: 'Total días : ', width: '10%', style: 'textheadertitle' },
                        { text: `${params.ALBATOTAL}`, width: '10%', style: 'textheader' }
                    ]
                },
                { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                { text: 'Descripcion', style: 'titulos2' },
                { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                {
                    columns: [
                        {
                            text: 'COMPR',
                            width: '15%',
                            style: 'textheadertitletable',
                            margin: [10, 0]
                        },
                        { text: 'COD SERV', width: '15%', style: 'textheadertitletable' },
                        { text: 'CONCEPTO', width: '30%', style: 'textheadertitletable' },
                        { text: 'CANTIDAD', width: '10%', style: 'textheadertitletable' },
                        { text: 'VLR UNITARIO', width: '15%', style: 'textheadertitletable' },
                        { text: 'VLR TOTAL', width: '15%', style: 'textheadertitletable' }
                    ]
                },
                { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 580, y2: 2, lineWidth: 1 }] }
            ];
        },
        content: [
            construirtablaimpresiones(params.TABLA, params.COLUMNAS, params.WIDTH),
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 570, y2: 5, lineWidth: 1 }] },
            {
                columns: [
                    { text: '', width: '61%' },
                    { text: 'TOTAL FACT.', width: '25%', style: 'textheadertitle' },
                    { text: `${params.TOTALFACT}`, width: '15%', style: 'textheadertitle' }
                ]
            },
            { canvas: [{ type: 'line', x1: 340, y1: 0, x2: 570, y2: 0, lineWidth: 1 }] },
            { text: ' ' },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 570, y2: 5, lineWidth: 1 }] },
            {
                columns: [
                    { text: 'LA SUMA DE : ', width: '25%', style: 'textheadertitle' },
                    { text: `${params.VALORENLETRAS}`, width: '70%', style: 'textheadertitle' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 570, y2: 0, lineWidth: 1 }] },
            {
                text: 'LA PRESENTE FACTURA SE ASIMILA EN SUS EFECTOS A UNA LETRA DE CAMBIO ART 779 CODIGO DE COMERCIO',
                style: 'titulos3'
            },
            {
                text: 'ACTIVIDAD ECONOMICA 8790 -- No somos responsables de IVA',
                width: '50%',
                style: 'titulos3'
            },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { canvas: [{ type: 'line', x1: 20, y1: 0, x2: 140, y2: 0, lineWidth: 1 }] },
            { canvas: [{ type: 'line', x1: 350, y1: 0, x2: 470, y2: 0, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'FIRMA Y SELLO ',
                        width: '67%',
                        style: 'textheadertitle',
                        margin: [50, 0]
                    },
                    { text: 'FIRMA Y SELLO', width: '10%', style: 'textheadertitle' }
                ]
            },
            { text: ' ' },
            { text: ' ' },
            {
                columns: [
                    { text: 'AUTORIZACION DIAN : ', width: '15%', style: 'textheader' },
                    { text: params.PREFIJO[0].AUT_DIAN, width: '13%', style: 'textheader' },
                    { text: params.PREFIJO[0].FECHA, width: '10%', style: 'textheader' },
                    { text: 'PREFIJO', width: '7%', style: 'textheader' },
                    { text: params.PREFIJO[0].PREFIJO, width: '3%', style: 'textheader' },
                    { text: 'RANGO', width: '7%', style: 'textheader' },
                    {
                        text: params.PREFIJO[0].DESDE_NRO + ' - ' + params.PREFIJO[0].HASTA_NRO,
                        width: '20%',
                        style: 'textheader'
                    }
                ]
            },
            {
                columns: [
                    { text: 'CREO:', width: '45%', style: 'textheadertitlederecha' },
                    {
                        text: `${params.FECHAOPER} ${params.OPERNUM}`,
                        width: '10%',
                        style: 'textheadertitle'
                    },
                    { text: 'MODI:', width: '5%', style: 'textheadertitlederecha' },
                    {
                        text: `${params.FECHAMODOPER} ${params.OPERMODNUM}`,
                        width: '10%',
                        style: 'textheadertitle'
                    },
                    { text: 'BLOQ:', width: '5%', style: 'textheadertitlederecha' },
                    {
                        text: `${params.FECHARETOPER} ${params.OPERBLOQNUM}`,
                        width: '10%',
                        style: 'textheadertitle'
                    },
                    { text: 'IMP:', width: '5%', style: 'textheadertitlederecha' },
                    {
                        text: `${params.FECHAIMPRESION} ${params.ADMINW}`,
                        width: '10%',
                        style: 'textheadertitle'
                    }
                ]
            }
        ],
        styles: {
            titulos: {
                fontSize: 10,
                bold: true
            },
            titulos2: {
                alignment: 'center',
                fontSize: 10,
                bold: true
            },
            titulos3: {
                alignment: 'center',
                fontSize: 8,
                bold: true
            },
            textheader: {
                alignment: 'rigth',
                fontSize: 8
            },
            textheadertitle: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            textheadertitlederecha: {
                alignment: 'right',
                fontSize: 8,
                bold: true
            },
            textheadertitletable: {
                alignment: 'rigth',
                fontSize: 6,
                bold: true
            },
            titulomarco: {
                decoration: 'underline',
                alignment: 'right',
                fontSize: 10,
                bold: true
            },
            tituloizquierda: {
                alignment: 'right',
                fontSize: 10,
                bold: true
            },
            textheadertable: {
                fontSize: 6
            }
        }
    };
    datosimpresion.images = {
        logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png'
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}

function _impresionformatoSER109T(params, callback, errcallback) {
    let datosimpresion = {
        pageSize: 'A4',
        pageMargins: params.MARGIN,
        header: function (currentPage, pageCount, pageSize) {
            return [
                { text: ' ' },
                { text: ' ' },
                {
                    image: 'logo',
                    fit: [60, 60],
                    absolutePosition: { x: 40, y: 25 }
                },
                {
                    columns: [
                        { text: 'FACTURA DE VENTA NUMERO : ', width: '45%', style: 'titulos' },
                        { text: params.NROFACTURA, width: '20%', style: 'titulos' },
                        { text: params.ORIGINAL, width: '30%', style: 'titulos' }
                    ],
                    margin: [120, 0]
                },
                {
                    columns: [
                        { text: 'LA COMPAÑIA ASEGURADORA : ', width: '45%', style: 'titulos' },
                        {
                            text: `${params.NOMBREENTIDAD} ${params.NITENTIDAD} ${params.DVENTIDAD}`,
                            width: '85%',
                            style: 'titulos2'
                        }
                    ],
                    margin: [120, 0]
                },
                {
                    columns: [
                        { text: 'POLIZA SOAT NUMERO : ', width: '45%', style: 'titulos' },
                        { text: params.POLIZA, width: '85%', style: 'titulos' }
                    ],
                    margin: [120, 0]
                }
            ];
        },
        content: [
            { text: 'DEBE A :', style: 'titulos', margin: [110, 0] },
            { text: params.DEBEA, style: 'titulos', margin: [110, 0] },
            { text: params.NITDEBE, style: 'titulos', margin: [110, 0] },
            {
                columns: [
                    { text: params.DIRECCIONDEBE, width: '45%', style: 'titulos2' },
                    { text: params.CIUDADDEBE, width: '85%', style: 'titulos2' }
                ],
                margin: [110, 0]
            },
            { text: ' ' },
            {
                columns: [
                    { text: 'LA SUMA DE : ', width: '12%', style: 'titulos2' },
                    { text: params.VALORENLETRAS, width: '68%', style: 'textonormal' },
                    { text: params.VALOR, width: '15%', style: 'textonormal' }
                ],
                margin: [10, 0]
            },
            { text: ' ' }
            // { text: '123456789012345678901234567890123456789012345678901234567890123456', style:'textonormal', margin:[10,0]},
            // { text: ' '},
        ],
        styles: {
            titulos: {
                fontSize: 10,
                bold: true
            },
            titulos2: {
                fontSize: 8,
                bold: true
            },
            textonormal: {
                fontSize: 8
            },
            titulos3: {
                alignment: 'center',
                fontSize: 8,
                bold: true
            },
            textheader: {
                alignment: 'rigth',
                fontSize: 8
            },
            textheadertitle: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            textheadertitlederecha: {
                alignment: 'right',
                fontSize: 8,
                bold: true
            },
            textheadertitletable: {
                alignment: 'rigth',
                fontSize: 6,
                bold: true
            },
            titulomarco: {
                decoration: 'underline',
                alignment: 'right',
                fontSize: 10,
                bold: true
            },
            tituloizquierda: {
                alignment: 'right',
                fontSize: 10,
                bold: true
            },
            textheadertable: {
                fontSize: 6
            }
        }
    };
    if (params.PREFIJO == 'T')
        datosimpresion.content.push({
            text: 'Por concepto de servicios de salud correspondientes al Seguro Obligatorio de Accidente de Transito prestados a:',
            style: 'textonormal',
            margin: [10, 0]
        });
    else
        datosimpresion.content.push({
            text: 'Por concepto de servicios de salud correspondientes prestados a:',
            style: 'textonormal',
            margin: [10, 0]
        });
    datosimpresion.content.push(
        {
            columns: [
                { text: params.NOMBREPACIENTE, width: '35%', style: 'textonormal' },
                { text: 'Ident:', width: '5%', style: 'textonormal' },
                { text: params.IDPACIENTE, width: '15%', style: 'textonormal' }
            ],
            margin: [10, 0]
        },
        { text: ' ' },
        {
            columns: [
                { text: 'Historia clinica Nro:', width: '15%', style: 'titulos2' },
                { text: params.HISTORIA, width: '15%', style: 'textonormal' },
                { text: 'Fecha de ingreso:', width: '15%', style: 'textonormal' },
                { text: 'año', width: '5%', style: 'textonormal' },
                { text: params.AÑOINGRESO, width: '5%', style: 'textonormal' },
                { text: 'mes', width: '5%', style: 'textonormal' },
                { text: params.MESINGRESO, width: '5%', style: 'textonormal' },
                { text: 'dia', width: '5%', style: 'textonormal' },
                { text: params.DIAINGRESO, width: '5%', style: 'textonormal' }
            ],
            margin: [10, 0]
        },
        {
            columns: [
                { text: 'Dias de estancia:', width: '15%', style: 'titulos2' },
                { text: params.DIASESTANCIA, width: '15%', style: 'textonormal' },
                { text: 'Fecha de retiro:', width: '15%', style: 'textonormal' },
                { text: 'año', width: '5%', style: 'textonormal' },
                { text: params.AÑORETIRO, width: '5%', style: 'textonormal' },
                { text: 'mes', width: '5%', style: 'textonormal' },
                { text: params.MESRETIRO, width: '5%', style: 'textonormal' },
                { text: 'dia', width: '5%', style: 'textonormal' },
                { text: params.DIARETIRO, width: '5%', style: 'textonormal' }
            ],
            margin: [10, 0]
        },
        {
            columns: [
                { text: 'Fecha de entrega : ', width: '15%', style: 'textonormal' },
                { text: params.FECHAENTREGA, width: '68%', style: 'textonormal' }
            ],
            margin: [10, 0]
        },
        { text: ' ' },
        { text: ' ' },
        { text: ' ' },
        { text: ' ' },
        { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 200, y2: 0, lineWidth: 1 }] },
        { text: 'Firma y sello', style: 'textonormal', margin: [10, 0] },
        { text: ' ' },
        { text: 'DESCRIPCION DEL SERVICIO', style: 'textonormal', margin: [10, 0] },
        { text: ' ' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 570, y2: 0, lineWidth: 1 }] },
        {
            columns: [
                { text: 'COMPR', width: '14%', style: 'textheadertitletable' },
                { text: 'CODIGO', width: '15%', style: 'textheadertitletable' },
                { text: 'CONCEPTO', width: '31%', style: 'textheadertitletable' },
                { text: 'CANTIDAD', width: '11%', style: 'textheadertitletable' },
                { text: 'VLR UNITARIO', width: '15%', style: 'textheadertitletable' },
                { text: 'VLR TOTAL', width: '15%', style: 'textheadertitletable' }
            ]
        },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 570, y2: 0, lineWidth: 1 }] },
        construirtablaimpresiones(params.TABLA, params.COLUMNAS, params.WIDTH),
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 570, y2: 5, lineWidth: 1 }] },
        {
            columns: [
                { text: '', width: '61%' },
                { text: 'TOTAL FACT.', width: '25%', style: 'textheadertitle' },
                { text: `${params.TOTALFACT}`, width: '15%', style: 'textheadertitle' }
            ]
        },
        { text: ' ' },
        { text: ' ' },
        {
            columns: [
                { text: 'AUTORIZACION DIAN : ', width: '15%', style: 'textheader' },
                { text: params.PREFIJO[0].AUT_DIAN, width: '13%', style: 'textheader' },
                { text: params.PREFIJO[0].FECHA, width: '10%', style: 'textheader' },
                { text: 'PREFIJO', width: '7%', style: 'textheader' },
                { text: params.PREFIJO[0].PREFIJO, width: '3%', style: 'textheader' },
                { text: 'RANGO', width: '7%', style: 'textheader' },
                {
                    text: params.PREFIJO[0].DESDE_NRO + ' - ' + params.PREFIJO[0].HASTA_NRO,
                    width: '20%',
                    style: 'textheader'
                }
            ],
            margin: [10, 0]
        },
        {
            columns: [
                { text: 'CREO:', width: '45%', style: 'textheadertitlederecha' },
                {
                    text: `${params.FECHAOPER} ${params.OPERNUM}`,
                    width: '10%',
                    style: 'textheadertitle'
                },
                { text: 'MODI:', width: '5%', style: 'textheadertitlederecha' },
                {
                    text: `${params.FECHAMODOPER} ${params.OPERMODNUM}`,
                    width: '10%',
                    style: 'textheadertitle'
                },
                { text: 'BLOQ:', width: '5%', style: 'textheadertitlederecha' },
                {
                    text: `${params.FECHARETOPER} ${params.OPERBLOQNUM}`,
                    width: '10%',
                    style: 'textheadertitle'
                },
                { text: 'IMP:', width: '5%', style: 'textheadertitlederecha' },
                {
                    text: `${params.FECHAIMPRESION} ${params.ADMINW}`,
                    width: '10%',
                    style: 'textheadertitle'
                }
            ],
            margin: [10, 0]
        },
        { text: params.RESOLDIANUSU, style: 'textonormal', margin: [10, 0] },
        { text: params.IVA, style: 'textonormal', margin: [10, 0] },
        {
            text: 'LA PRESENTE FACTURA SE ASIMILA EN SUS EFECTOS A UNA LETRA DE CAMBIO ART 779 CODIGO DE COMERCIO',
            style: 'textonormal'
        }
    );
    datosimpresion.images = {
        logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png'
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}

function _impresionescartapresentacion(params, callback, errcallback) {
    console.log(params);
    let datosimpresion = {
        pageMargins: [10, 90, 10, 20],
        // IZQ, ARRIBA, DERECHA, ABAJO
        pageSize: 'A4',
        header: function (currentPage, pageCount, pageSize) {
            return [
                { text: ' ' },
                {
                    text: 'Página ' + currentPage + ' de ' + pageCount,
                    style: 'titulo2',
                    absolutePosition: { x: 500, y: 5 }
                },
                {
                    image: 'logo',
                    fit: [120, 60],
                    absolutePosition: { x: 40, y: 10 }
                },
                { text: ' ' },
                { text: $_USUA_GLOBAL[0].NOMBRE, style: 'titulos' },
                {
                    text: `NIT ${numeroencomas($_USUA_GLOBAL[0].NIT)} - ${$_USUA_GLOBAL[0].DV}`,
                    style: 'titulos'
                },
                {
                    text: `${$_USUA_GLOBAL[0].DIRECC} TEL: ${$_USUA_GLOBAL[0].TEL}`,
                    style: 'titulo2'
                },
                {
                    text: `${$_USUA_GLOBAL[0].NOMBRE_CIU} - ${$_USUA_GLOBAL[0].NOMBRE_DEP}`,
                    style: 'titulo2'
                },
                { text: `RELACIÓN DE FACTURAS`, style: 'titulo2' },
                { text: ' ' }
            ];
        },
        content: [
            { text: ' ' },
            { text: ' ' },
            { text: params.FECHAENCABEZADO, style: 'textonegrilla', margin: [10, 0] }
        ],
        styles: {
            titulos: {
                alignment: 'center',
                fontSize: 12,
                bold: true
            },
            titulo2: {
                alignment: 'center',
                fontSize: 9
                // bold: true,
            },
            textonegrilla: {
                fontSize: 10,
                bold: true
            },
            texto: {
                fontSize: 10
            },
            titulotabla: {
                fontSize: 9,
                bold: true
            },
            titulotablaizquierda: {
                alignment: 'left',
                fontSize: 9,
                bold: true
            },
            textheadertable: {
                fontSize: 9
            }
        }
    };
    if ($_USUA_GLOBAL[0].NIT == 845000038) {
        datosimpresion.content.push({
            columns: [
                { text: 'Señores', width: '65%', style: 'textonegrilla', margin: [10, 0] },
                {
                    text: `CANT CARPETAS ${params.CANTCARPETAS}`,
                    width: '15%',
                    style: 'textonegrilla'
                },
                { text: `FOLIOS ${params.FOLIOS}`, width: '15%', style: 'textonegrilla' }
            ]
        });
    } else {
        datosimpresion.content.push({ text: 'Señores', style: 'texto', margin: [10, 0] });
    }
    if ($_USUA_GLOBAL[0].NIT == 830515242) {
        datosimpresion.content.push({
            columns: [
                { text: params.DESCRIPTER2, width: '65%', style: 'textonegrilla', margin: [10, 0] },
                {
                    text: `MLK-${params.AÑO}-${params.NROENV}-FT`,
                    width: '10%',
                    style: 'textonegrilla'
                }
            ]
        });
    } else if ($_USUA_GLOBAL[0].NIT == 800251482) {
        datosimpresion.content.push({
            columns: [
                { text: params.DESCRIPTER2, width: '65%', style: 'textonegrilla', margin: [10, 0] },
                {
                    text: `VPS-${params.AÑO}-${params.NROENV}-FT`,
                    width: '10%',
                    style: 'textonegrilla'
                }
            ]
        });
    } else if ($_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 900804411) {
        datosimpresion.content.push({ text: params.DESCRIPTER, style: 'texto', margin: [10, 0] });
    } else {
        datosimpresion.content.push({
            columns: [
                { text: params.DESCRIPTER, width: '65%', style: 'textonegrilla', margin: [10, 0] },
                { text: 'REMISION:', width: '10%', style: 'textonegrilla' },
                { text: params.NROENV, width: '31%', style: 'textonegrilla' }
            ]
        });
    }
    if ($_USUA_GLOBAL[0].NIT == 830515242 || $_USUA_GLOBAL[0].NIT == 800251482) {
        datosimpresion.content.push(
            { text: 'Cuentas Medicas', style: 'textonegrilla', margin: [10, 0] },
            { text: params.DIRECCTER, style: 'textonegrilla', margin: [10, 0] },
            { text: params.CODCIUTER, style: 'textonegrilla', margin: [10, 0] }
        );
    } else if ($_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 892000401) {
        datosimpresion.content.push({ text: 'CIUDAD', style: 'textonegrilla', margin: [10, 0] });
    } else {
        datosimpresion.content.push({ text: 'E. S. D.', style: 'textonegrilla', margin: [10, 0] });
    }
    datosimpresion.content.push({ text: ' ' });
    if ($_USUA_GLOBAL[0].NIT == 830515242 || $_USUA_GLOBAL[0].NIT == 800251482) {
        datosimpresion.content.push({
            text: `Adjunto a la presente estamos enviando la cuenta de cobro por los servicios prestados en el mes de ${params.MESREPORTADOENLETRAS} del ${params.AÑO}, para el tramite de pago:`,
            style: 'texto',
            margin: [10, 0]
        });
    } else if ($_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 892000401) {
        datosimpresion.content.push({
            text: `Adjunto a la presente estamos enviando la cuenta de cobro por los servicios prestados a sus afiliados, para el tramite de pago:`,
            style: 'texto',
            margin: [10, 0]
        });
    } else {
        datosimpresion.content.push({
            text: `Adjunto a la presente estamos enviando la cuenta de cobro por los servicios prestados a sus afiliados en el mes de ${params.MESREPORTADOENLETRAS} del ${params.AÑO}, para el tramite de pago:`,
            style: 'texto',
            margin: [10, 0]
        });
    }
    datosimpresion.content.push(
        { text: ' ' },
        { canvas: [{ type: 'line', x1: 1, y1: 1, x2: 560, y2: 1, lineWidth: 1 }] }
    );
    // MIRAR LOS WIDTH DE LAS IMPRESIONES DE LOS FORMATOS DE TABLA
    if ($_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 892000401) {
        datosimpresion.content.push({
            columns: [
                { text: 'No FACTURA', width: '13%', style: 'titulotabla' },
                { text: 'PACIENTE', width: '27%', style: 'titulotabla' },
                { text: 'ACOMPAÑANTE', width: '28%', style: 'titulotabla' },
                { text: 'VALOR', width: '10%', style: 'titulotabla' }
            ]
        });
    } else if (
        $_USUA_GLOBAL[0].NIT == 900870633 ||
        $_USUA_GLOBAL[0].NIT == 900804411 ||
        $_USUA_GLOBAL[0].NIT == 892000401
    ) {
        datosimpresion.content.push({
            columns: [
                { text: 'FACTURA', width: '13%', style: 'titulotabla' },
                { text: 'FECHA', width: '13%', style: 'titulotabla' },
                { text: 'PACIENTE', width: '40%', style: 'titulotabla' },
                { text: 'VALOR NETO', width: '10%', style: 'titulotabla' }
            ]
        });
    } else if ($_USUA_GLOBAL[0].NIT == 900471031) {
        // SER446W
        datosimpresion.content.push({
            columns: [
                { text: 'FACTURA', width: '15%', style: 'titulotabla' },
                { text: 'FECHA', width: '11%', style: 'titulotabla' },
                { text: 'ID PACIENTE', width: '12%', style: 'titulotabla' },
                { text: 'DESCRIPCION', width: '24%', style: 'titulotabla' },
                { text: 'VALOR', width: '12%', style: 'titulotabla' },
                { text: 'ABONO', width: '12%', style: 'titulotabla' },
                { text: 'NETO', width: '12%', style: 'titulotabla' }
            ]
        });
    } else if ($_USUA_GLOBAL[0].NIT == 845000038) {
        // SER446M
        datosimpresion.content.push({
            columns: [
                { text: 'FACTURA', width: '13%', style: 'titulotabla' },
                { text: 'FECHA', width: '13%', style: 'titulotabla' },
                { text: 'DESCRIPCION', width: '27%', style: 'titulotabla' },
                { text: 'VALOR', width: '10%', style: 'titulotabla' },
                { text: 'CTA MODE', width: '10%', style: 'titulotabla' },
                { text: 'COPAGOS', width: '10%', style: 'titulotabla' },
                { text: 'NETO', width: '10%', style: 'titulotabla' }
            ]
        });
    } else {
        datosimpresion.content.push({
            columns: [
                { text: '', width: '1%', style: 'titulotabla' },
                { text: 'ITEM', width: '6%', style: 'titulotabla' },
                { text: 'PREFIJO', width: '9%', style: 'titulotabla' },
                { text: 'FACTURA', width: '12%', style: 'titulotabla' },
                { text: 'FECHA', width: '12%', style: 'titulotabla' },
                { text: 'IDENTIFICACION', width: '16%', style: 'titulotabla' },
                { text: 'DESCRIPCION', width: '30%', style: 'titulotabla' },
                { text: 'NETO', width: '13%', style: 'titulotablaizquierda' }
            ]
        });
    }

    datosimpresion.content.push(
        // IZQ, ARRIBA, DERECHA, ABAJO
        { canvas: [{ type: 'line', x1: 1, y1: 1, x2: 560, y2: 1, lineWidth: 1 }] },
        construirtablaimpresioneslineal(params.TABLA, params.COLUMNAS, params.WIDTH)
    );
    if (
        $_USUA_GLOBAL[0].NIT == 800037202 ||
        $_USUA_GLOBAL[0].NIT == 901120152 ||
        $_USUA_GLOBAL[0].NIT == 892000458 ||
        $_USUA_GLOBAL[0].NIT == 900450008
    ) {
        // SER446Z - SER446G - SER446H - SER446T
        datosimpresion.content.push({
            columns: [
                { text: 'CANT FACT', width: '10%', style: 'titulotabla' },
                { text: params.CANTFACT, width: '16%', style: 'titulotabla' },
                { text: 'TOTAL', width: '24%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALVALOR), width: '12%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALABONO), width: '12%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALSALDO), width: '12%', style: 'titulotabla' }
            ]
        });
    } else if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900804411) {
        datosimpresion.content.push({
            columns: [
                { text: 'CANT FACT', width: '10%', style: 'titulotabla' },
                { text: params.CANTFACT, width: '13%', style: 'titulotabla' },
                { text: 'TOTAL', width: '42%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALSALDO), width: '10%', style: 'titulotabla' }
            ]
        });
    } else if ($_USUA_GLOBAL[0].NIT == 830515242 || $_USUA_GLOBAL[0].NIT == 800251482) {
        datosimpresion.content.push({
            columns: [
                { text: 'CANT FACT', width: '10%', style: 'titulotabla' },
                { text: params.CANTFACT, width: '17%', style: 'titulotabla' },
                { text: 'TOTAL', width: '28%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALSALDO), width: '10%', style: 'titulotabla' }
            ]
        });
        // SER446I - SER446V YA
    } else if ($_USUA_GLOBAL[0].NIT == 845000038) {
        datosimpresion.content.push({
            columns: [
                { text: 'CANT FACT', width: '10%', style: 'titulotabla' },
                { text: params.CANTFACT, width: '11%', style: 'titulotabla' },
                { text: 'TOTAL', width: '50%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALSALDO), width: '10%', style: 'titulotabla' }
            ]
        });
        // SER446M YA
    } else if ($_USUA_GLOBAL[0].NIT == 900471031) {
        datosimpresion.content.push({
            columns: [
                { text: 'CANT FACT', width: '12%', style: 'titulotabla' },
                { text: params.CANTFACT, width: '22%', style: 'titulotabla' },
                { text: 'TOTAL', width: '54%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALSALDO), width: '13%', style: 'titulotabla' }
            ]
        });
        // SER446W
    } else {
        datosimpresion.content.push({
            columns: [
                { text: '', width: '40%', style: 'titulotabla' },
                { text: 'TOTAL REMISIÓN ' + params.NROENV, width: '46%', style: 'titulotabla' },
                { text: numeroencomas(params.TOTALVALOR), width: '12%', style: 'titulotabla' }
            ]
        });
        // SER446
    }
    datosimpresion.content.push({ text: ' ' }, { text: ' ' });
    if ($_USUA_GLOBAL[0].NIT == 830515242) {
        datosimpresion.content.push(
            {
                text: `Para su conocimiento y fines pertinentes al pago, me permito anexar la facturación relacionada en documento adjunto con su respectivos soportes, prestación de servicios integrales de salud en la modalidad de evento durante el periodo comprendido entre el 01 al 30 de ${params.MESLNKENLETRAS} de ${params.AÑO}, por un total de ${params.VALORTOTALENLETRAS} (${params.VALORTOTAL})`,
                style: 'texto',
                margin: [10, 0]
            },
            {
                text: `De igual forma se hace entrega de los RIPS correspondientes en medio magnetico (CD)`,
                style: 'texto',
                margin: [10, 0]
            },
            {
                text: `Una vez se haga el pago de las facturas radicadas en este oficio solicito remitir correspondiente reporte de pago haciendo claridad de los descuentos efectuados, informe que debe remitirse al correo electrónico coordinacion@vaupessanoips.com - vaupessano_ips@yahoo.es`,
                style: 'texto',
                margin: [10, 0]
            },
            {
                text: `Por favor, le solicitamos que el valor respectivo sea consignado en la cuenta de ahorros No. 48420300136-0 de Banco Agrario Sucursal Mitu.`,
                style: 'texto',
                margin: [10, 0]
            }
        );
    } else if ($_USUA_GLOBAL[0].NIT == 800251482) {
        datosimpresion.content.push(
            {
                text: `Correspondiente a los servicios de albergue, alimentación y transporte prestados a pacientes remitidos por esta entidad dentro del periodo comprendido entre el 01 al 30 ${params.MESLNKENLETRAS} de ${params.AÑO}, por un total de ${params.VALORTOTALENLETRAS} (${params.VALORTOTAL}) en original y dos copias`,
                style: 'texto',
                margin: [10, 0]
            },
            {
                text: `De igual forma se hace entrega de los RIPS correspondientes en medio magnetico (CD)`,
                style: 'texto',
                margin: [10, 0]
            },
            {
                text: `Una vez se haga el pago de las facturas radicadas en este oficio solicito remitir correspondiente reporte de pago haciendo claridad de los descuentos efectuados, informe que debe remitirse al correo electrónico cartera@lamaloka.com`,
                style: 'texto',
                margin: [10, 0]
            }
        );
    } else if ($_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 892000401) {
        datosimpresion.content.push(
            {
                text: `Estamos haciendo entrega tambien del medio magnetico con remision No ${params.NROENV} que contiene los RIPS correspondientes, debidamente validados con la malla del Ministerio de Salud`,
                style: 'texto',
                margin: [10, 0]
            },
            {
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta No. 364-34355-8 del Banco de Bogota sucursal centauros y enviarnos informacion de la operacion realizada, detallando descuentos efectuados, al fac 6731765 Ext. 1154, correo electronico cartera@clinicameta.co`,
                style: 'texto',
                margin: [10, 0]
            }
        );
    } else if ($_USUA_GLOBAL[0].NIT == 845000038) {
        datosimpresion.content.push(
            { text: ` `, style: 'texto', margin: [10, 0] },
            { text: ` `, style: 'texto', margin: [10, 0] }
        );
    } else if ($_USUA_GLOBAL[0].NIT == 901120152) {
        datosimpresion.content.push(
            {
                text: `Estamos haciendo entrega tambien del medio magnetico con remision No ${params.NROENV} que contiene los RIPS correspondientes, debidamente validados con la malla validadora`,
                style: 'texto',
                margin: [10, 0]
            },
            {
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta Ahorros No. 101-901780-01 del Grupo Bancolombia y enviar correo electronico cartera.itzayana@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            }
        );
    } else {
        datosimpresion.content.push(
            {
                text: `Estamos haciendo entrega tambien del medio magnetico con remision No ${params.NROENV} que contiene los RIPS correspondientes, debidamente validados con la malla validadora.`,
                style: 'texto',
                margin: [10, 0]
            },
            { text: ` `, style: 'texto' }
        );
        if ($_USUA_GLOBAL[0] == 900566047) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No. 021335344 del Banco de Bogota y enviar correo electronico lideraseguramientoyrecobro@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 900541158) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No. 129145033 del Banco de Bogota y enviar correo electronico enlacedosips@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 800037021) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sisitema nacional de recaudo en la cuenta corriente No. 364 354 431 del Banco de Bogota y enviar correo electronico ____________________________________ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 800037979) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No. 74200471-6 del Banco de BBVA y enviar correo electronico hospiptolopez@yahoo.es la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 900658867) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No. 129091781 del Banco de Bogota y enviar correo electronico ___mavepharma@gmail.com___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 900565371) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No. 796078004 del Banco de Bogota y enviar correo electronico analistacarterasalud@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 800037202) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No. 971100089602 del Banco de Davivienda y enviar correo electronico ___cartera@hospitalguamal.gov.co___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 892000458) {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No. ________________ del Banco de Bogota y enviar correo electronico hospisanmartinese@gmail.com la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        } else if ($_USUA_GLOBAL[0] == 900685768) {
            if (params.TABLA[0].LLAVE.substring(0, 1) == 'T') {
                datosimpresion.content.push({
                    text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No. 219-84384-4 del Banco de Occidente y enviar correo electronico ___tesoreria@omesalud.com___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                    style: 'texto',
                    margin: [10, 0]
                });
            } else {
                datosimpresion.content.push({
                    text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No. 33549218003 del Banco de Bancolombia y enviar correo electronico ___tesoreria@omesalud.com___ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                    style: 'texto',
                    margin: [10, 0]
                });
            }
        } else if ($_USUA_GLOBAL[0].NIT == 892000264) {
            if (params.NIT == 901361398) {
                datosimpresion.content.push({
                    text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No. 354188542 del Banco de Bogota y enviar correo electronico cartera@hospitaldeacacias.gov.co la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                    style: 'texto',
                    margin: [10, 0]
                });
            } else {
                datosimpresion.content.push({
                    text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta ahorros No. 296119498 del Banco de BBVA y enviar correo electronico cartera@hospitaldeacacias.gov.co la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                    style: 'texto',
                    margin: [10, 0]
                });
            }
        } else {
            datosimpresion.content.push({
                text: `Solicitamos el favor de confirmarnos su consignacion mediante el sistema nacional de recaudo en la cuenta corriente No. __________________ del Banco de ______________________________ y enviar correo electronico _____________________________________ la relacion de facturas canceladas y los descuentos efectuados, esto con el fin de tener su estado de cartera actualizado.`,
                style: 'texto',
                margin: [10, 0]
            });
        }
    }
    datosimpresion.content.push(
        { text: ' ' },
        { text: 'Atentamente,', style: 'texto', margin: [10, 0] },
        { text: ' ' },
        { text: ' ' },
        { text: ' ' },
        { text: ' ' }
    );
    if ($_USUA_GLOBAL[0].NIT == 830515242) {
        datosimpresion.content.push(
            { text: 'LINA CATERIN BARACALDO', margin: [10, 0] },
            { text: 'GERENTE', style: 'texto', margin: [10, 0] },
            { text: 'Vaupes Sano IPS', margin: [10, 0] }
        );
    } else if ($_USUA_GLOBAL[0].NIT == 800251482) {
        datosimpresion.content.push(
            { text: 'RIGOBERO OLAYA H.', margin: [10, 0] },
            { text: 'Lider Facturacion', style: 'texto', margin: [10, 0] },
            { text: 'Cel: 3134424212', margin: [10, 0] },
            { text: 'Correo electronico: auxiliardefacturacion@lamaloka.com', margin: [10, 0] }
        );
    } else if ($_USUA_GLOBAL[0].NIT == 900804411 || $_USUA_GLOBAL[0].NIT == 892000401) {
        if ($_USUA_GLOBAL[0].NIT == 892000401) {
            datosimpresion.content.push(
                { text: localStorage.Nombre, margin: [10, 0] },
                { text: 'Radicacion de cuentas medicas', style: 'texto', margin: [10, 0] }
            );
        } else {
            datosimpresion.content.push({ text: params.DESCRIPTER, margin: [10, 0] });
        }
        datosimpresion.content.push(
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 380, y2: 0, lineWidth: 1 }] },
            { text: ' ' },
            {
                text: 'La radicacion de facturacion de NO POS, se realiza de conformidad con lo establecido en el articulo 30 de la Resolucion 1885 de 2018, que al renot reza "garantia del suministro", la EPS y las EOC consultaran la herramienta tecnologica de reporte de prescripcion de tecnologias en salud no financiadas con recursos de la UPC o servicios complementarios para garantizar a sus afiliados el suministro efectivo de lo prescrito u ordenado por el profesional de la salud segun corresponda sin que requieran autorizaciones administrativas o de pertenencia medica de terceros.',
                style: 'texto',
                margin: [10, 0]
            }
        );
    } else {
        if ($_USUA_GLOBAL[0].NIT == 892000458) {
            datosimpresion.content.push({
                canvas: [{ type: 'line', x1: 10, y1: 0, x2: 180, y2: 0, lineWidth: 1 }]
            });
        } else {
            datosimpresion.content.push(
                {
                    image: 'firma',
                    fit: [100, 100],
                    margin: [40, 0]
                },
                { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                { canvas: [{ type: 'line', x1: 200, y1: 0, x2: 480, y2: 0, lineWidth: 1 }] }
            );
        }
        datosimpresion.content.push(
            { text: ' ' },
            { text: params.DESCRIPFIRMA, style: 'texto', margin: [10, 0] },
            { text: 'Responsable RIPS', style: 'texto', margin: [10, 0] },
            { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 570, y2: 0, lineWidth: 1 }] }
        );
    }
    datosimpresion.images = {
        logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png',
        firma: 'P:\\PROG\\FIRMAS\\' + params.FIRMA + '.png'
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}

function _impresionfacturamytSER458I(params, callback, errcallback) {
    let datosimpresion = {
        pageSize: 'A4',
        pageMargins: [10, 150, 10, 20],
        pageOrientation: 'landscape',
        header: function (currentPage, pageCount, pageSize) {
            return [
                { text: ' ' },
                { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 830, y2: 5, lineWidth: 1 }] },
                {
                    image: 'logo',
                    fit: [60, 60],
                    absolutePosition: { x: 40, y: 25 }
                },
                {
                    columns: [
                        {
                            text: 'REPUBLICA DE COLOMBIA',
                            width: '80%',
                            style: 'titulos',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'MINISTERIO DE LA PROTECCION SOCIAL',
                            width: '80%',
                            style: 'titulos2',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'FORMULARIO RADICACION DE SOLICITUDES DE COBROS',
                            width: '80%',
                            style: 'titulos2',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'MYT - R - ANEXO No. 001',
                            width: '80%',
                            style: 'titulos2',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 830, y2: 5, lineWidth: 1 }] },
                {
                    columns: [
                        {
                            text: 'No CONSECUTIVO PARA RADICACIONES DE ENTIDAD RECLAMANTE 000000',
                            width: '80%',
                            style: 'titulos2',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 830, y2: 5, lineWidth: 1 }] },
                { text: ' ' },
                { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 830, y2: 5, lineWidth: 1 }] },
                { text: 'RELACION DE SOLICITUDES DE COBROS', style: 'titulos2' }
            ];
        },
        content: [
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 820, y2: 5, lineWidth: 1 }] },
            {
                columns: [
                    { text: 'N ITEM', width: '8%', style: 'textheadertitletable', margin: [10, 0] },
                    { text: 'No FACTURA', width: '8%', style: 'textheadertitletable' },
                    { text: 'DATOS DEL PACIENTE', width: '48%', style: 'texttitlecentrado' },
                    { text: 'IDENTIFICACION', width: '15%', style: 'texttitlecentrado' },
                    { text: '', width: '5%', style: 'texttitlecentrado' },
                    { text: 'CAUSA', width: '8%', style: 'texttitlecentrado' },
                    { text: 'VALOR', width: '8%', style: 'texttitlecentrado' }
                ]
            },
            {
                columns: [
                    { text: '', width: '15%', style: 'textheadertitletable', margin: [10, 0] },
                    { text: 'PRIMER APELLIDO', width: '12%', style: 'textheadertitletable' },
                    { text: 'SEGUNDO APELLIDO', width: '12%', style: 'textheadertitletable' },
                    { text: 'PRIMER NOMBRE', width: '12%', style: 'textheadertitletable' },
                    { text: 'SEGUNDO NOMBRE', width: '12%', style: 'textheadertitletable' },
                    { text: 'TIPO', width: '5%', style: 'textheadertitletable' },
                    { text: 'NUMERO', width: '12%', style: 'textheadertitletable' },
                    { text: 'REGIMEN', width: '6%', style: 'textheadertitletable' },
                    { text: 'COBRO', width: '8%', style: 'textheadertitletable' },
                    { text: 'COBRO', width: '8%', style: 'textheadertitletable' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 820, y2: 5, lineWidth: 1 }] },
            tableSER458I(params.FACTURASMYT, [
                'ITEM',
                'FACTURA',
                'APEL1',
                'APEL2',
                'NOMB1',
                'NOMB2',
                'TIPOID',
                'ID',
                'REGIMEN',
                'CAUSA',
                'VLRBRUTO'
            ]),
            { text: ' ' },
            { text: ' ' },
            {
                columns: [
                    { text: '', width: '80%' },
                    { text: 'VALOR TOTAL', width: '13%', style: 'textheadertitle' },
                    { text: params.VLRTOTAL, width: '15%', style: 'textheadertitle' }
                ]
            },
            {
                columns: [{ text: 'Causa de cobro', width: '15%', style: 'texto' }]
            },
            {
                columns: [
                    { text: '01 = Tutela por periodos de carencia', width: '30%', style: 'texto' },
                    { text: '02 = Tutela por servicios No POS', width: '30%', style: 'texto' },
                    { text: '03 = Tutela por medicamentos No POS', width: '30%', style: 'texto' }
                ]
            },
            {
                columns: [
                    {
                        text: '04 = Tutela por servicios en el exterior',
                        width: '30%',
                        style: 'texto'
                    },
                    { text: '05 = Tutela por otras causas', width: '30%', style: 'texto' },
                    {
                        text: '06 = Mtos servicios Mds y prestaciones de salud No POS-CTC',
                        width: '30%',
                        style: 'texto'
                    }
                ]
            },
            {
                columns: [
                    { text: '07 = Tutelas por tratamiento integral', width: '30%', style: 'texto' }
                ]
            },
            { text: ' ' },
            {
                columns: [
                    { text: 'REGIMEN', width: '10%', style: 'titulos3' },
                    { text: '1 = Contributivo', width: '30%', style: 'texto' },
                    { text: '2 = Subsidiado', width: '30%', style: 'texto' },
                    { text: '3 = Otros', width: '30%', style: 'texto' }
                ]
            },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { canvas: [{ type: 'line', x1: 580, y1: 5, x2: 260, y2: 5, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'Firma del representante legal o apoderado',
                        width: '100%',
                        style: 'textocentrado'
                    }
                ]
            },
            {
                columns: [
                    { text: ' ', width: '30%', style: 'textheadertitle' },
                    { text: 'CERRO:', width: '5%', style: 'textheadertitle' },
                    { text: params.OPERADOR, width: '10%', style: 'textheadertitle' },
                    { text: 'ABRE:', width: '5%', style: 'textheadertitle' },
                    { text: params.OPERMOD, width: '10%', style: 'textheadertitle' },
                    { text: 'IMP:', width: '5%', style: 'textheadertitle' },
                    {
                        text: params.FECHACTUAL + ' ' + params.ADMINW,
                        width: '10%',
                        style: 'textheadertitle'
                    }
                ]
            }
        ],
        styles: {
            titulos: {
                alignment: 'center',
                fontSize: 18,
                bold: true
            },
            titulos2: {
                alignment: 'center',
                fontSize: 13,
                bold: true
            },
            titulos3: {
                alignment: 'center',
                fontSize: 11,
                bold: true
            },
            tituloscaja: {
                fontSize: 10,
                bold: true
            },
            texto: {
                fontSize: 8
            },
            textocentrado: {
                alignment: 'center',
                fontSize: 10
            },
            textheader: {
                alignment: 'rigth',
                fontSize: 8
            },
            texttitlecentrado: {
                alignment: 'center',
                fontSize: 8,
                bold: true
            },
            textheadertitle: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            textheadertitletable: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            textheadertable: {
                fontSize: 9
            },
            textheaderusuario: {
                fontSize: 15
            }
        }
    };
    datosimpresion.images = {
        logo: 'P:\\PROG\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png'
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}
function tableSER458I(data, columns) {
    return {
        table: {
            widths: ['8%', '7%', '13%', '12%', '12%', '12%', '4%', '14%', '5%', '6%', '12%'],
            body: buildTableBody458I(data, columns)
        }
    };
}

function buildTableBody458I(data, columns) {
    var body = [];
    data.forEach(function (row) {
        var dataRow = [];
        columns.forEach(function (column) {
            dataRow.push({
                text: row[column].toString(),
                style: 'textheadertable',
                border: [false]
            });
        });
        body.push(dataRow);
    });
    return body;
}

function _impresion2facturamytSER458I(params, callback, errcallback) {
    console.log(params, 'PARAMETROS');
    let datosimpresionSER458I = {
        pageMargins: [10, 150, 10, 20],
        pageSize: 'A4',
        // pageOrientation: 'landscape',
        header: function (currentPage, pageCount, pageSize) {
            return [
                { text: ' ' },
                { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 585, y2: 5, lineWidth: 1 }] },
                { text: ' ' },
                {
                    columns: [
                        {
                            text: 'REPUBLICA DE COLOMBIA',
                            width: '80%',
                            style: 'titulos2',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'MINISTERIO DE LA PROTECCION SOCIAL',
                            width: '80%',
                            style: 'titulos2',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'FORMULARIO RADICACION DE SOLICITUDES DE COBROS',
                            width: '80%',
                            style: 'titulos2',
                            margin: [120, 0, 0, 0]
                        }
                    ]
                },
                {
                    columns: [
                        { text: 'MYT - R', width: '80%', style: 'titulos2', margin: [120, 0, 0, 0] }
                    ]
                },
                {
                    columns: [
                        {
                            text: 'No CONSECUTIVO PARA RADICACIONES DE ENTIDAD RECLAMANTE n1n2n3',
                            width: '88%',
                            style: 'titulos2',
                            margin: [75, 0, 0, 0]
                        }
                    ]
                },
                { text: ' ' },
                {
                    columns: [
                        {
                            text: 'Fecha Radicacion:',
                            width: '15%',
                            style: 'texto',
                            margin: [20, 0, 0, 0]
                        },
                        { text: params.FECHARAD, width: '50%', style: 'texto' },
                        { text: 'No. Radicado', width: '15%', style: 'texto' },
                        { text: params.RADICADO, width: '20%', style: 'texto' }
                    ]
                }
            ];
        },
        content: [
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 580, y2: 5, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'l. DATOS DE LA ENTIDAD',
                        width: '80%',
                        style: 'titulos3',
                        margin: [120, 0, 0, 0]
                    }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            {
                columns: [
                    { text: 'Tipo de entidad', width: '15%', style: 'textheadertitle' },
                    { text: 'EPS', width: '4%', style: 'texto' },
                    { text: '___', width: '8%', style: 'texto' },
                    { text: 'ARS', width: '4%', style: 'texto' },
                    { text: '___', width: '8%', style: 'texto' },
                    { text: 'EOC ', width: '4%', style: 'texto' },
                    { text: '___', width: '8%', style: 'texto' },
                    { text: 'OTROS', width: '5%', style: 'texto' },
                    { text: '___', width: '8%', style: 'texto' }
                ]
            },
            {
                columns: [
                    { text: 'Razon social: ', width: '15%', style: 'textheadertitle' },
                    { text: $_USUA_GLOBAL[0].NOMBRE, width: '30%', style: 'texto' }
                ]
            },
            {
                columns: [
                    { text: 'Codigo      : ', width: '15%', style: 'textheadertitle' },
                    {
                        text:
                            $_USUA_GLOBAL[0].COD_CIUD +
                            $_USUA_GLOBAL[0].NUIR +
                            $_USUA_GLOBAL[0].PREFIJ,
                        width: '30%',
                        style: 'texto'
                    },
                    { text: 'Nit : ', width: '5%', style: 'textheadertitle' },
                    { text: $_USUA_GLOBAL[0].NIT, width: '15%', style: 'texto' }
                ]
            },
            {
                columns: [
                    { text: 'Direccion  : ', width: '15%', style: 'textheadertitle' },
                    { text: $_USUA_GLOBAL[0].DIRECC, width: '30%', style: 'texto' }
                ]
            },
            {
                columns: [
                    { text: 'Ciudad      : ', width: '15%', style: 'textheadertitle' },
                    { text: $_USUA_GLOBAL[0].NOMBRE_CIU, width: '30%', style: 'texto' },
                    { text: 'COD : ', width: '5%', style: 'textheadertitle' },
                    { text: $_USUA_GLOBAL[0].COD_CIUD, width: '15%', style: 'texto' },
                    { text: 'Telefono:', width: '8%', style: 'textheadertitle' },
                    { text: $_USUA_GLOBAL[0].TEL, width: '15%', style: 'texto' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 580, y2: 5, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'll. CONSOLIDADO POR CAUSA',
                        width: '80%',
                        style: 'titulos3',
                        margin: [120, 0, 0, 0]
                    }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'Causa cobro',
                        width: '50%',
                        style: 'textheadertitletable',
                        margin: [10, 0]
                    },
                    { text: 'No de cobro', width: '30%', style: 'textheadertitletable' },
                    { text: 'Valor', width: '12%', style: 'textheadertitletable' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            // construirtablaimpresiones(externalDataRetrievedFromServer, ['CAUSA', 'NROCOBRO', 'VALOR']),
            { text: '01 Tutela por Periodo de carencia', width: '30%', style: 'texto' },
            { text: '02 Tutela por Servicios No POS', width: '30%', style: 'texto' },
            { text: '03 Tutela por Medicamentos No POS', width: '30%', style: 'texto' },
            { text: '04 Tutela por Servicios en el exterior', width: '30%', style: 'texto' },
            { text: '05 Tutela por Otras causas', width: '30%', style: 'texto' },
            {
                columns: [
                    {
                        text: '06 Mtos, Servicios Mds y Prestaciones de Salud No POS - CT',
                        width: '50%',
                        style: 'texto'
                    },
                    { text: params.NROCOBRO, width: '30%', style: 'texto' },
                    { text: params.VALORCOBRO, width: '12%', style: 'texto' }
                ]
            },
            { text: '07 Tutela por Tratamiento integral', width: '30%', style: 'texto' },
            {
                text: '08 Tutela por Servicios NO POS prestados a victimas del con',
                width: '30%',
                style: 'texto'
            },
            {
                text: '09 Medicamentos servicios medicos y prestaciones de salud',
                width: '30%',
                style: 'texto'
            },

            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'TOTALES',
                        width: '80%',
                        style: 'textheadertitletable',
                        margin: [10, 0]
                    },
                    { text: params.VALORTOTAL, width: '12%', style: 'textheadertitletable' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'No total de folios Anexos',
                        width: '50%',
                        style: 'texto',
                        margin: [10, 0]
                    },
                    { text: params.TOTALFOLIO, width: '12%', style: 'texto' }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'lll. DECLARACION DE LA ENTIDAD',
                        width: '80%',
                        style: 'titulos3',
                        margin: [120, 0, 0, 0]
                    }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            {
                columns: [
                    { text: '', width: '28%', style: 'texto', margin: [10, 0] },
                    {
                        text: 'Como representante legal declaro bajo gravedad de juramento',
                        width: '80%',
                        style: 'texto',
                        margin: [10, 0]
                    }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },

            {
                text: '1) Que toda la informacion contenida en estos recobros se ajusta al marco legal vigente, es cierta y poodra ser verificada por el ministerio de la Proteccion Social, por el Administrador Fidusiario del fondo de seguridad Solidario y garantia - FOSYGA - por la Superintendencia Nacional de salud o la contraloria General de la Republica : de no ser asi, acepto todas las consecuencias legales que produzca esta esta situacion. General de la Republica : de no ser asi, acepto todas las consecuencias legales que produzca esta esta situacion. 3) En cumplimiento del macro legal vigente y dentro del termino establecido no se completan o actualizan los documentos DESTINO del tramite y autorizo el descuento automatico del 50% del valor liquidado y pagado por los recobros con APROBACION CONDICIONADA de futuros pagos por conceptos de Medicamentos, servicios y prestaciones de salud NO POS y tutelas.',
                style: 'texto'
            },
            { canvas: [{ type: 'line', x1: 0, y1: 3, x2: 580, y2: 3, lineWidth: 1 }] },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { text: ' ' },
            { canvas: [{ type: 'line', x1: 160, y1: 3, x2: 420, y2: 3, lineWidth: 1 }] },
            {
                columns: [
                    {
                        text: 'Firma del representante legal o apoderado',
                        width: '100%',
                        style: 'textocentrado'
                    }
                ]
            }
        ],
        styles: {
            titulos: {
                alignment: 'center',
                fontSize: 18,
                bold: true
            },
            titulos2: {
                alignment: 'center',
                fontSize: 13,
                bold: true
            },
            titulos3: {
                alignment: 'center',
                fontSize: 9,
                bold: true
            },
            tituloscaja: {
                fontSize: 10,
                bold: true
            },
            texto: {
                fontSize: 8
            },
            textocentrado: {
                alignment: 'center',
                fontSize: 10
            },
            textheader: {
                alignment: 'rigth',
                fontSize: 8
            },
            texttitlecentrado: {
                alignment: 'center',
                fontSize: 8,
                bold: true
            },
            textheadertitle: {
                alignment: 'rigth',
                fontSize: 8,
                bold: true
            },
            textheadertitletable: {
                alignment: 'rigth',
                fontSize: 9,
                bold: true
            },
            textheadertable: {
                fontSize: 9
            },
            textheaderusuario: {
                fontSize: 15
            }
        }
    };
    console.log(datosimpresionSER458I, 'no llega nada');
    _impresion2({
        tipo: 'pdf',
        content: datosimpresionSER458I,
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}

function _impresioncitas(params, callback, errcallback) {
    console.log(params);
    let datosimpresion = {
        pageSize: 'A7',
        pageMargins: [10, 10, 10, 20],
        content: [
            {
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: `ASIGNACION DE CITAS ${$_USUA_GLOBAL[0].NOMBRE}`,
                                style: 'titulos'
                            }
                        ]
                    ]
                }
            }
        ],
        styles: {
            titulos: {
                fontSize: 9,
                bold: true
            },
            texto: {
                fontSize: 9
            },
            texto_alt: {
                fontSize: 6,
                bold: true
            },
            texto_oper: {
                fontSize: 5
            }
        }
    };
    if (params.TELESALUD) {
        datosimpresion.content.push({
            text: 'CONSULTA TELE SALUD',
            style: 'titulos',
            alignment: 'center'
        });
    } else {
        datosimpresion.content.push({ text: ' ', style: 'titulos' });
    }
    datosimpresion.content.push(
        {
            columns: [
                { text: 'FECHA CITA:', width: '30%', style: 'titulos' },
                { text: params.FECHACITA, width: '40%', style: 'texto' }
            ]
        },
        {
            columns: [
                { text: 'HORA:', width: '30%', style: 'titulos' },
                { text: params.HORACITA, width: '40%', style: 'texto' }
            ]
        },
        {
            columns: [
                { text: 'PACIENTE:', width: '30%', style: 'titulos' },
                {
                    text: `${params.NOMBRE1} ${params.NOMBRE2} ${params.APELLIDO1} ${params.APELLIDO2}`,
                    width: '60%',
                    style: 'texto'
                }
            ]
        },
        {
            columns: [
                { text: 'CC:', width: '30%', style: 'titulos' },
                { text: params.CC, width: '70%', style: 'texto' }
            ]
        },
        {
            columns: [
                { text: 'MOTIVO:', width: '30%', style: 'titulos' },
                { text: `${params.CUP} ${params.DESCRIPCUP}`, width: '70%', style: 'texto' }
            ]
        },
        {
            columns: [
                { text: 'ENTIDAD:', width: '30%', style: 'titulos' },
                { text: params.ENTIDAD, width: '70%', style: 'texto' }
            ]
        },
        {
            columns: [
                { text: 'N. MEDICO:', width: '30%', style: 'titulos' },
                { text: params.NOMBREMEDICO, width: '70%', style: 'texto' }
            ]
        },
        { text: '______________________________________________', style: 'titulos' },
        {
            columns: [
                { text: 'FECHA/HORA CREA:', width: '30%', style: 'texto_alt' },
                { text: params.HORACREA, width: '30%', style: 'texto_oper' },
                { text: 'OPER CREA:', width: '20%', style: 'texto_alt' },
                { text: params.OPERCREA, width: '20%', style: 'texto_oper' }
            ]
        }
    );
    console.log(datosimpresion);
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion,
        archivo: `${localStorage.Usuario + moment().format('YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}

function tablasSER4B1(data, width, height, widthcolumna) {
    console.log(data);
    data = data.split('');
    return {
        table: {
            widths: width,
            heights: height,
            body: [this.construircuerpotablaSER4B1(data)],
            width: widthcolumna
        }
    };
}

function construircuerpotablaSER4B1(data) {
    console.log(data);
    var body = [];
    data.forEach(function (array) {
        body.push({ text: array, style: 'texto' });
    });
    return body;
}

function _impresion_SER4B1(params, callback) {
    var _this = params;
    console.log(_this);
    _this.SAL401.PACIENTE.COD = parseInt(_this.SAL401.PACIENTE.COD).toString();
    var RC = (TI = ASI = CC = MSI = CE = PA = ' ');
    if (_this.SAL401.PACIENTE['TIPO-ID'].substring(0, 2) == 'CC') CC = 'X';
    if (_this.SAL401.PACIENTE['TIPO-ID'].substring(0, 2) == 'CE') CE = 'X';
    if (_this.SAL401.PACIENTE['TIPO-ID'].substring(0, 2) == 'PA') PA = 'X';
    if (_this.SAL401.PACIENTE['TIPO-ID'].substring(0, 2) == 'TI') TI = 'X';
    if (_this.SAL401.PACIENTE['TIPO-ID'].substring(0, 2) == 'RC') RC = 'X';
    if (_this.SAL401.PACIENTE['TIPO-ID'].substring(0, 2) == 'AS') ASI = 'X';
    if (_this.SAL401.PACIENTE['TIPO-ID'].substring(0, 2) == 'MS') MSI = 'X';
    var CONTRIBUTIVO = (SUBSIDIADO = OTRO = DESPLAZADO = VINCULADO = ' ');
    if (_this.SAL401.PACIENTE['TIPO'] == 'C') CONTRIBUTIVO = 'X';
    else if (_this.SAL401.PACIENTE['TIPO'] == 'S') SUBSIDIADO = 'X';
    else if (_this.SAL401.PACIENTE['TIPO'] == 'V') VINCULADO = 'X';
    else if (_this.SAL401.PACIENTE['TIPO'] == 'O') OTRO = 'X';
    else DESPLAZADO = 'X';
    var ENFERMEDADOTRO =
        (ENFERMEDADGENERAL =
        ACCIDENTETRABAJO =
        EVENTOCATASTROFICO =
        ENFERMEDADPROFESIONAL =
        ACCIDENTETRANSITO =
            ' ');
    if (_this.SAL401.COMPROBANTE.CAUSA_ESTAD == '01') ACCIDENTETRABAJO = 'X';
    else if (_this.SAL401.COMPROBANTE.CAUSA_ESTAD == '06') EVENTOCATASTROFICO = 'X';
    else if (_this.SAL401.COMPROBANTE.CAUSA_ESTAD == '14') ENFERMEDADPROFESIONAL = 'X';
    else if (_this.SAL401.COMPROBANTE.CAUSA_ESTAD == '02') ACCIDENTETRANSITO = 'X';
    else if (_this.SAL401.COMPROBANTE.CAUSA_ESTAD == '13') ENFERMEDADGENERAL = 'X';
    else ENFERMEDADOTRO = 'X';
    var ROJO = (AMARILLO = VERDE = ' ');
    if (_this.SAL401.COMPROBANTE.TRIAGE == '1') ROJO = 'X';
    else if (_this.SAL401.COMPROBANTE.TRIAGE == '2') AMARILLO = 'X';
    else VERDE = 'X';
    if (_this.SAL401.COMPROBANTE.FECHA_ING.replace(/\//g, '').substring(4, 6) == '00') {
        _this.SAL401.COMPROBANTE.FECHA_ING = _this.SAL401.COMPROBANTE.FECHA;
        _this.SAL401.COMPROBANTE.HORA_ESTAD = _this.SAL401.COMPROBANTE.HORA_ELAB;
    }
    var ENTRAREMITS = (ENTRAREMITN = ' ');
    if (_this.SAL401.COMPROBANTE.ENTRAREMIT == 'S') {
        ENTRAREMITS = 'X';
    } else {
        ENTRAREMITN = 'X';
    }
    if (_this.SAL401.COMPROBANTE.ENTRAREMIT.trim() == 'N') {
        _this.SAL401.COMPROBANTE.IPS = '            ';
        _this.SAL401.COMPROBANTE.NOMCIU_IPS = '            ';
        _this.SAL401.COMPROBANTE.NOMDEP_IPS = '            ';
        _this.SAL401.COMPROBANTE.NOM_IPS = '            ';
        _this.SAL401.COMPROBANTE.CIUDAD_IPS = '            ';
    }
    var DOMICILIO = (INTERNACION = CONTRAREMISION = OBSERVACION = REMISION = OTROF = ' ');
    if (_this.SAL401.COMPROBANTE.OBSERVTIPS == 'S') {
        OBSERVACION = 'X';
    } else {
        if (_this.SAL401.COMPROBANTE.ESTAD_SAL.substring(0, 1) == '1') {
            DOMICILIO = 'X';
        } else if (_this.SAL401.COMPROBANTE.ESTAD_SAL.substring(0, 1) == '2') {
            OTROF = 'X';
        } else if (_this.SAL401.COMPROBANTE.ESTAD_SAL.substring(0, 1) == '3') {
            REMISION = 'X';
        } else if (_this.SAL401.COMPROBANTE.ESTAD_SAL.substring(0, 1) == '4') {
            INTERNACION = 'X';
        } else {
            DOMICILIO = 'X';
        }
    }
    var dd = {
        pageSize: 'LETTER',
        pageMargins: [15, 77, 15, 10],
        header: function (currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element
            return [
                {
                    image: 'logo',
                    fit: [60, 40],
                    absolutePosition: { x: 10, y: 10 }
                },
                { text: 'MINISTERIO DE LA PROTECCION SOCIAL', style: 'textomayus' },
                { text: 'INFORME DE LA ATENCION INCIAL DE URGENCIAS', style: 'textomayus' },
                { text: ' ' },
                {
                    columns: [
                        {
                            text: 'NUMERO ATENCION',
                            width: '30%',
                            alignment: 'right',
                            fontSize: 9,
                            bold: true,
                            margin: [0, 0, 4, 0]
                        },
                        tablasSER4B1(
                            _this.SAL401.NROCOMPROBANTE.padStart(6, '0'),
                            ['16.6%', '16.6%', '16.6%', '16.6%', '16.6%', '16.6%'],
                            '',
                            '10%'
                        ),
                        {
                            text: 'FECHA',
                            width: '10%',
                            style: 'titulos1'
                        },
                        tablasSER4B1(
                            _this.SAL401.FECHA.replace(/-/g, ''),
                            ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],
                            '',
                            '20%'
                        ),
                        {
                            text: 'HORA',
                            width: '10%',
                            style: 'titulos1'
                        },
                        tablasSER4B1(
                            _this.SAL401.COMPROBANTE.HORA_ESTAD,
                            ['20%', '20%', '20%', '20%'],
                            '',
                            '10%'
                        )
                    ]
                },
                {
                    text: ' '
                },
                {
                    text: 'INFORMACION DEL PRESTADOR',
                    style: 'titulos2',
                    margin: [15, 0, 0, 0]
                }
            ];
        },
        content: [
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: 'NOMBRE' }]]
                        },
                        style: 'texto',
                        width: '65%'
                    },
                    {
                        text: 'NIT',
                        width: '10%',
                        style: 'textocentrado'
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: 'X' }]]
                        },
                        style: 'texto',
                        width: '3%'
                    },
                    {
                        text: ' ',
                        width: '2%'
                    },
                    tablasSER4B1(
                        `${$_USUA_GLOBAL[0].NIT.toString().padStart(10, ' ')}-${
                            $_USUA_GLOBAL[0].DV
                        }`,
                        [
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%'
                        ],
                        '',
                        '20%'
                    )
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: $_USUA_GLOBAL[0].NOMBRE }]]
                        },
                        style: 'texto',
                        width: '65%'
                    },
                    {
                        text: 'CC',
                        width: '10%',
                        style: 'textocentrado'
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: ' ' }]]
                        },
                        style: 'texto',
                        width: '3%'
                    },
                    {
                        text: ' ',
                        width: '2%'
                    },
                    {
                        table: {
                            widths: ['85%', '15%'],
                            body: [[{ text: 'NUMERO' }, { text: 'DV' }]]
                        },
                        style: 'texto',
                        width: '20%'
                    }
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [['CODIGO']]
                        },
                        style: 'texto',
                        width: '10%'
                    },
                    tablasSER4B1(
                        `${$_USUA_GLOBAL[0].COD_CIUD}${$_USUA_GLOBAL[0].NUIR}${$_USUA_GLOBAL[0].PREFIJ}`,
                        [
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%',
                            '8.3%'
                        ],
                        '',
                        '25%'
                    ),
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: `DIRECCION PRESTADOR     ${$_USUA_GLOBAL[0].DIRECC}` }]]
                        },
                        style: 'texto',
                        width: '65%'
                    }
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [['TELEFONO']]
                        },
                        style: 'texto',
                        width: '10%'
                    },
                    tablasSER4B1(
                        `${$_USUA_GLOBAL[0].TEL}`,
                        [
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%'
                        ],
                        '',
                        '25%'
                    ),
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: ' ' }]]
                        },
                        style: 'texto',
                        width: '65%'
                    }
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [[' ']]
                        },
                        style: 'texto',
                        width: '10%'
                    },
                    {
                        table: {
                            widths: ['30%', '70%'],
                            body: [[{ text: 'Indicat' }, { text: 'Numero' }]]
                        },
                        style: 'texto',
                        width: '25%'
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: `Departamento:    ${$_USUA_GLOBAL[0].NOMBRE_DEP}` }]]
                        },
                        style: 'texto',
                        width: '28%'
                    },
                    {
                        table: {
                            widths: ['50%', '50%'],
                            body: [
                                [
                                    { text: $_USUA_GLOBAL[0].COD_CIUD.substring(0, 1) },
                                    { text: $_USUA_GLOBAL[0].COD_CIUD.substring(1, 2) }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '4%'
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: `Municipio:    ${$_USUA_GLOBAL[0].NOMBRE_CIU}` }]]
                        },
                        style: 'texto',
                        width: '28%'
                    },
                    {
                        table: {
                            widths: ['30%', '30%', '30%'],
                            body: [
                                [
                                    { text: $_USUA_GLOBAL[0].COD_CIUD.substring(2, 3) },
                                    { text: $_USUA_GLOBAL[0].COD_CIUD.substring(3, 4) },
                                    { text: $_USUA_GLOBAL[0].COD_CIUD.substring(4, 5) }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '5%'
                    }
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [
                                [
                                    {
                                        text: `ENTIDAD A LA QUE SE LE INFORMA (PAGADOR)       ${_this.form.cliented_SAL401}`
                                    }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '60%'
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: 'CODIGO' }]]
                        },
                        style: 'texto',
                        width: '30.5%'
                    },
                    tablasSER4B1(
                        _this.SAL401.COMPROBANTE.ENTIDADTER,
                        ['12,5%', '12,5%', '12,5%', '12,5%', '12,5%', '12,5%'],
                        '',
                        '24%'
                    )
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: 'DATOS DEL PACIENTE' }]]
                        },
                        style: 'titulos1',
                        width: '100%'
                    }
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['25%', '25%', '25%', '25%'],
                            body: [
                                [
                                    { text: _this.SAL401.PACIENTE['APELL-PACI1'] },
                                    { text: _this.SAL401.PACIENTE['APELL-PACI2'] },
                                    { text: _this.SAL401.PACIENTE['NOM-PACI1'] },
                                    { text: _this.SAL401.PACIENTE['NOM-PACI2'] }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '100%'
                    }
                ]
            },
            {
                table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                        [
                            { text: '1er Apellido', style: 'texto' },
                            { text: '2do Apellido', style: 'texto' },
                            { text: '1er Nombre', style: 'texto' },
                            { text: '2do Nombre', style: 'texto' }
                        ],
                        [{ text: 'Tipo documento de identificación', style: 'texto' }, '', '', ''],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: RC }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Registro civil', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: PA }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Pasaporte', style: 'texto' }
                                ]
                            },
                            tablasSER4B1(
                                _this.SAL401.PACIENTE.COD,
                                [
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%',
                                    '6.6%'
                                ],
                                '',
                                ''
                            ),
                            ''
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: TI }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Tarjeta de identidad', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ASI }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Adulto sin identificación', style: 'texto' }
                                ]
                            },
                            { text: 'Numero documento de identificación', style: 'texto' },
                            ''
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: CC }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Cedula de ciudadania', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: MSI }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Menor sin identificación', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: CE }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Cedula de Extranjeria', style: 'texto' }
                                ]
                            },
                            ''
                        ]
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [
                                [
                                    {
                                        text: `Dirección de Residencia Habitual           ${_this.SAL401.PACIENTE.DIRECC}`
                                    }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '60%'
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: 'TELEFONO' }]]
                        },
                        style: 'texto',
                        width: '16%'
                    },
                    tablasSER4B1(
                        _this.SAL401.PACIENTE.TELEFONO.padStart(15, ' '),
                        [
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%',
                            '6.6%'
                        ],
                        '',
                        '30%'
                    )
                ]
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [
                                [
                                    {
                                        text: `Departamento:  ${_this.SAL401.PACIENTE['DESCRIP-DEPA']}`
                                    }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '47%'
                    },
                    tablasSER4B1(
                        _this.SAL401.PACIENTE.CIUDAD.trim().substring(0, 2),
                        ['50%', '50%'],
                        '',
                        '5%'
                    ),
                    {
                        table: {
                            widths: ['100%'],
                            body: [
                                [{ text: `Municipio:  ${_this.SAL401.PACIENTE['DESCRIP-CIUDAD']}` }]
                            ]
                        },
                        style: 'texto',
                        width: '40%'
                    },
                    tablasSER4B1(
                        _this.SAL401.PACIENTE.CIUDAD.trim().substring(2, 5),
                        ['33%', '33%', '34%'],
                        '',
                        '8%'
                    )
                ]
            },
            {
                table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                        [{ text: 'Cobertura en Salud', style: 'texto' }, '', '', ''],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: CONTRIBUTIVO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Regimen contributivo', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ' ' }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Regimen subsidiado-pacial', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: VINCULADO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    {
                                        text: 'Poblacion pobre no asegurada sin SISBEN',
                                        style: 'texto'
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ' ' }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Plan adicional de salud', style: 'texto' }
                                ]
                            }
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: SUBSIDIADO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Regimen subsidiado-total', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ' ' }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    {
                                        text: 'Poblacion pobre no asegurada con SISBEN',
                                        style: 'texto'
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: DESPLAZADO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Desplazado', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: OTRO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Otro', style: 'texto' }
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: 'INFORMACION DE LA ATENCION' }]]
                        },
                        style: 'titulos1',
                        width: '100%'
                    }
                ]
            },
            {
                table: {
                    widths: ['20%', '20%', '20%', '20%', '20%'],
                    body: [
                        [{ text: 'Origen de la Atencion', style: 'texto' }, '', '', '', ''],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ENFERMEDADGENERAL }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Enfermedad General', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ACCIDENTETRABAJO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Accidente de Trabajo', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: EVENTOCATASTROFICO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Evento Catastrofico', style: 'texto' }
                                ]
                            },
                            { text: 'Clasificacion Triage', style: 'texto' },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ROJO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: '1. Rojo', style: 'texto' }
                                ]
                            }
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ENFERMEDADPROFESIONAL }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Enfermedad Profesional', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ACCIDENTETRANSITO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Accidente de Transito', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ENFERMEDADOTRO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Otro tipo', style: 'texto' }
                                ]
                            },
                            '',
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: AMARILLO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: '2. Amarillo', style: 'texto' }
                                ]
                            }
                        ],
                        [
                            '',
                            '',
                            '',
                            '',
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: VERDE }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: '3. Verde', style: 'texto' }
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                table: {
                    widths: ['30%', '10%', '30%', '20%', '10%'],
                    body: [
                        [{ text: 'Ingreso a Urgencias', style: 'texto' }, '', '', '', ''],
                        [
                            {
                                columns: [
                                    { text: 'FECHA', style: 'texto' },
                                    tablasSER4B1(
                                        _this.SAL401.COMPROBANTE.FECHA_ING.replace(/\//g, ''),
                                        [
                                            '10%',
                                            '10%',
                                            '10%',
                                            '10%',
                                            '10%',
                                            '10%',
                                            '10%',
                                            '10%',
                                            '10%',
                                            '10%'
                                        ],
                                        '',
                                        '70%'
                                    )
                                ]
                            },
                            { text: 'HORA', style: 'texto', margin: [15, 0] },
                            {
                                columns: [
                                    tablasSER4B1(
                                        _this.SAL401.COMPROBANTE.HORA_ESTAD,
                                        ['20%', '20%', '20%', '20%'],
                                        '',
                                        '40%'
                                    ),
                                    {
                                        text: 'Paciente Viene Remitido',
                                        style: 'texto',
                                        margin: [10, 0]
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ENTRAREMITS }]]
                                        },
                                        style: 'texto',
                                        width: '15%'
                                    },
                                    { text: 'SI', style: 'texto', margin: [5, 0] },
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: ENTRAREMITN }]]
                                        },
                                        style: 'texto',
                                        width: '15%'
                                    },
                                    { text: 'NO', style: 'texto', margin: [5, 0] }
                                ]
                            },
                            ''
                        ]
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                table: {
                    widths: ['70%', '30%'],
                    body: [
                        [
                            {
                                text: 'Nombre del prestador de Servicios de Salud que Remite',
                                style: 'texto'
                            },
                            ''
                        ]
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                table: {
                    widths: ['100%'],
                    body: [[{ text: _this.SAL401.COMPROBANTE.NOM_IPS, style: 'texto' }]]
                }
            },
            {
                columns: [
                    {
                        table: {
                            widths: ['100%'],
                            body: [
                                [{ text: `Departamento:  ${_this.SAL401.COMPROBANTE.NOMDEP_IPS}` }]
                            ]
                        },
                        style: 'texto',
                        width: '47%'
                    },
                    {
                        table: {
                            widths: ['50%', '50%'],
                            body: [
                                [
                                    { text: _this.SAL401.COMPROBANTE.CIUDAD_IPS.substring(0, 1) },
                                    { text: _this.SAL401.COMPROBANTE.CIUDAD_IPS.substring(1, 2) }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '5%'
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [[{ text: `Municipio:  ${_this.SAL401.COMPROBANTE.NOMCIU_IPS}` }]]
                        },
                        style: 'texto',
                        width: '40%'
                    },
                    {
                        table: {
                            widths: ['33%', '33%', '34%'],
                            body: [
                                [
                                    { text: _this.SAL401.COMPROBANTE.CIUDAD_IPS.substring(2, 3) },
                                    { text: _this.SAL401.COMPROBANTE.CIUDAD_IPS.substring(3, 4) },
                                    { text: _this.SAL401.COMPROBANTE.CIUDAD_IPS.substring(4, 5) }
                                ]
                            ]
                        },
                        style: 'texto',
                        width: '8%'
                    }
                ]
            },
            {
                table: {
                    widths: ['100%'],
                    body: [[{ text: _this.SAL401.COMPROBANTE.MOTIVOCONSULRIPS, style: 'texto' }]]
                }
            },
            {
                table: {
                    widths: ['100%'],
                    body: [[{ text: ' ', style: 'texto' }]]
                }
            },
            {
                table: {
                    widths: ['100%'],
                    body: [[{ text: ' ', style: 'texto' }]]
                }
            },
            {
                table: {
                    widths: ['33%', '13%', '54%'],
                    body: [
                        [
                            { text: 'Impresion Diagnostica', style: 'texto' },
                            { text: 'Codigo CIE10', style: 'texto' },
                            { text: 'Descripción', style: 'texto' }
                        ],
                        [
                            { text: 'Diagnostico Principal', style: 'texto' },
                            tablasSER4B1(
                                _this.SAL401.COMPROBANTE.TABLA_DIAG[0].COD_DIAG,
                                ['5%', '5%', '5%', '5%'],
                                '',
                                '30%'
                            ),
                            { text: _this.SAL401.COMPROBANTE.TABLA_DIAG[0].DESCRIP, style: 'texto' }
                        ],
                        [
                            { text: 'Diagnostico Relacionado 1', style: 'texto' },
                            tablasSER4B1(
                                _this.SAL401.COMPROBANTE.TABLA_DIAG[1].COD_DIAG,
                                ['5%', '5%', '5%', '5%'],
                                '',
                                '30%'
                            ),
                            { text: _this.SAL401.COMPROBANTE.TABLA_DIAG[1].DESCRIP, style: 'texto' }
                        ],
                        [
                            { text: 'Diagnostico Relacionado 2', style: 'texto' },
                            tablasSER4B1(
                                _this.SAL401.COMPROBANTE.TABLA_DIAG[2].COD_DIAG,
                                ['5%', '5%', '5%', '5%'],
                                '',
                                '30%'
                            ),
                            { text: _this.SAL401.COMPROBANTE.TABLA_DIAG[2].DESCRIP, style: 'texto' }
                        ],
                        [
                            { text: 'Diagnostico Relacionado 3', style: 'texto' },
                            tablasSER4B1(
                                _this.SAL401.COMPROBANTE.TABLA_DIAG[3].COD_DIAG,
                                ['5%', '5%', '5%', '5%'],
                                '',
                                '30%'
                            ),
                            { text: _this.SAL401.COMPROBANTE.TABLA_DIAG[3].DESCRIP, style: 'texto' }
                        ]
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                table: {
                    widths: ['33%', '33%', '34%'],
                    body: [
                        [{ text: 'Destino del paciente', style: 'texto' }, '', ''],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: DOMICILIO }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Domicilio', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: INTERNACION }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Internación', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: CONTRAREMISION }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Contraremision', style: 'texto' }
                                ]
                            }
                        ],
                        [
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: OBSERVACION }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Observación', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: REMISION }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Remision', style: 'texto' }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        table: {
                                            widths: ['100%'],
                                            body: [[{ text: OTROF }]]
                                        },
                                        style: 'texto',
                                        width: '10%'
                                    },
                                    { text: 'Otro', style: 'texto' }
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineColor: function (i, node) {
                        return i === 0 || i === node.table.body.length ? 'black' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return i === 0 || i === node.table.widths.length ? 'black' : 'white';
                    },
                    paddingLeft: function (i, node) {
                        return 0;
                    },
                    paddingRight: function (i, node) {
                        return 0;
                    },
                    paddingTop: function (i, node) {
                        return 0;
                    },
                    paddingBottom: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                table: {
                    widths: ['100%'],
                    body: [[{ text: 'INFORMACION DE LA PERSONA QUE INFORMA', style: 'titulos1' }]]
                }
            },
            {
                table: {
                    widths: ['54%', '10%', '36%'],
                    body: [
                        [
                            { text: 'Nombre de quien informa', style: 'texto' },
                            { text: 'Telefono:', style: 'texto' },
                            {
                                table: {
                                    widths: [
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '9%',
                                        '9%',
                                        '9%'
                                    ],
                                    body: [[]]
                                },
                                style: 'texto',
                                width: '70%'
                            }
                        ]
                    ]
                }
            },
            {
                table: {
                    widths: ['53.1%', '46.9%'],
                    body: [
                        [
                            { text: localStorage.Nombre, style: 'texto' },
                            {
                                columns: [
                                    { text: '', witdh: '1%' },
                                    { text: 'Indicativo', style: 'texto', witdh: '5%' },
                                    { text: 'Numero', style: 'texto', witdh: '5%' },
                                    { text: 'Extension', style: 'texto', witdh: '5%' }
                                ]
                            }
                        ]
                    ]
                }
            },
            {
                table: {
                    widths: ['54%', '10%', '36%'],
                    body: [
                        [
                            {
                                text: 'Cargo o Actividad                                                                  FRONT URGENCIAS',
                                style: 'texto'
                            },
                            { text: 'Telefono Celular:', style: 'texto' },
                            {
                                table: {
                                    widths: [
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '8%',
                                        '9%',
                                        '9%',
                                        '9%'
                                    ],
                                    body: [[]]
                                },
                                style: 'texto',
                                width: '70%'
                            }
                        ]
                    ]
                }
            }
        ],
        styles: {
            titulos1: {
                alignment: 'center',
                fontSize: 9,
                bold: true
            },
            titulos2: {
                fontSize: 9,
                bold: true
            },
            textomayus: {
                alignment: 'center',
                fontSize: 10,
                bold: true
            },
            texto: {
                fontSize: 7
            },
            textocentrado: {
                alignment: 'center',
                fontSize: 9
            }
        }
    };
    dd.images = {
        logo: 'C:\\PROSOFT\\LOGOS\\' + $_USUA_GLOBAL[0].NIT.toString() + '.png'
    };
    _impresion2({
        tipo: 'pdf',
        content: dd,
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            callback();
        });
}

function _impresionSER515DA(params, callback, errcallback) {
    console.log(params, 'PARAMETROS');
    let datosimpresion_SER515DA = {
        pageSize: 'A4',
        content: [
            {
                table: {
                    widths: ['80%', '20%'],
                    body: [
                        [
                            {
                                border: [true, true, false, false],
                                text: `${$_USUA_GLOBAL[0].NOMBRE}`,
                                alignment: 'center',
                                bold: true
                            },
                            {
                                border: [false, true, true, false],
                                text: `NUMERO DEVOLUCION`,
                                alignment: 'center',
                                fontSize: 12,
                                bold: true
                            }
                        ]
                    ]
                }
            },
            {
                table: {
                    widths: ['80%', '20%'],
                    body: [
                        [
                            {
                                border: [true, false, false, false],
                                text: `DEVOLUCION DE FACTURAS`,
                                alignment: 'center',
                                bold: true
                            },
                            {
                                border: [false, false, true, false],
                                text: `${params.DEVOLUCION}`,
                                alignment: 'center',
                                bold: true
                            }
                        ]
                    ]
                }
            },
            {
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                border: [true, true, true, true],
                                columns: [
                                    {
                                        text: 'REMITENTE : ',
                                        width: '18%',
                                        bold: true
                                    },
                                    {
                                        text: params.NITREMITE,
                                        width: '20%'
                                    },
                                    {
                                        text: params.DESCRIPCION_REMITE,
                                        width: '62%'
                                    }
                                ]
                            }
                        ]
                    ]
                }
            },
            {
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                border: [true, false, true, false],
                                columns: [
                                    {
                                        text: 'CONCEPTO : ',
                                        width: '18%',
                                        bold: true
                                    },
                                    {
                                        text: params.CONCEPTO,
                                        width: '10%'
                                    },
                                    {
                                        text: params.DESCRIPCION_CONCEPTO,
                                        width: '72%'
                                    }
                                ]
                            }
                        ]
                    ]
                }
            },
            {
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: `OBSERVACION:
                                ${params.DESCRIPCION}
                              `
                            }
                        ]
                    ]
                }
            },
            { text: ' ' },
            { text: ' ' },
            {
                table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                        [
                            {
                                border: [true, true, false, false],
                                text: 'NUMERO FACTURA',
                                alignment: 'center',
                                bold: true
                            },
                            {
                                border: [false, true, false, false],
                                text: `VALOR FACTURA`,
                                alignment: 'center',
                                bold: true
                            },
                            {
                                border: [false, true, false, false],
                                text: `FECHA FACTURA`,
                                alignment: 'center',
                                bold: true
                            },
                            {
                                border: [false, true, true, false],
                                text: `FECHA ENTREGA`,
                                alignment: 'center',
                                bold: true
                            }
                        ]
                    ]
                }
            },
            {
                table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                        [
                            {
                                text: `${params.FACTURA.substring(0, 1)} ${params.FACTURA.substring(
                                    1,
                                    7
                                )}`,
                                alignment: 'center'
                            },
                            { text: `${params.VLRFACTURA}`, alignment: 'center' },
                            { text: `${params.FECHA_FACTURA}`, alignment: 'center' },
                            { text: `${params.FECHA_ENTREGA}`, alignment: 'center' }
                        ]
                    ]
                }
            }
            // {text:' '},
            // {text:' '},
            // {text:' '},
            // { text:'M1M1M1M1M1M1'},
            // { text:'E1E1E1E1E1E1'}
        ]
    };
    _impresion2({
        tipo: 'pdf',
        content: datosimpresion_SER515DA,
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`
    })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(err);
            errcallback();
        });
}
