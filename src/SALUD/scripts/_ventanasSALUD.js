const { param } = require('jquery');
const { backtick } = require('pdf-lib');

function _ventanaalterna_SALUD(data) {
    let width = 'col-md-12 col-sm-12 col-xs-12';
    if (data.tamaño) width = data.tamaño;
    $('body').append(`
    <div id="${data.ID}" class="portlet light col-md-12 col-sm-12 col-xs-12" style="display:flex; align-items:center; justify-content: center; text-align: center; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: 0 auto; z-index: 999999; background:  rgba(0, 0, 0, 0.5);">
        <div class="form-group ${width}" style="float: none; margin: 0 auto;">
            <div class="portlet-body">
                <div class="form-horizontal" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                    <div class="col-md-12 col-sm-12 col-xs-12" id="${data.ID}_HEAD" style="background: #6576b4; color white;">
                        <label class="col-md-12 col-sm-12 col-xs-12" style="color:white;"> ${data.titulo} </label>
                    </div>
                    <div id="${data.ID}_BODY" style="background:white; padding-top:40px; padding-bottom:20px;">
                        ${data.html}
                    </div>
                    <div id="${data.ID}_FOOT" style="background:#6576b4; height:10px;">
                    </div>
                </div>
            </div>
        </div>
    </div>`);
}

function SER835(data, esccallback, callback) {
    var SER835 = [];
    var paciente = data.DESCRIPPACI;
    let URL = get_url('APP/SALUD/SER835.DLL');
    console.log(
        ' data.PACIENTE + ' | ' + data.CLFACT + ' | ' + data.NITUSU',
        data.PACIENTE + '|' + data.CLFACT + '|' + data.NITUSU
    );
    postData(
        {
            datosh: datosEnvio() + data.PACIENTE + '|' + data.CLFACT + '|' + data.NITUSU + '|'
        },
        URL
    )
        .then((data) => {
            SER835 = data.FACTURAS;
            SER835.pop();
            _ventanaDatos({
                titulo: 'FACTURAS POR EL PACIENTE ' + paciente,
                columnas: [
                    'FECHA_INGRESO',
                    'FACTURA',
                    'ARTICULO',
                    'DESCRIPCION_CUP',
                    'DETALLE_FACTURA',
                    'MEDICO_FACTURA',
                    'COPAGO_FACTURA'
                ],
                ancho: '95%',
                data: SER835,
                foco: true,
                callback_esc: () => {
                    CON851P('04', esccallback, callback);
                },
                callback: (data) => {
                    CON851P('04', esccallback, callback);
                }
            });
        })
        .catch((error) => {
            console.log(error);
            callback();
        });
}

function SER505C(data, esccallback, callback) {
    var SER505C = [];
    let URL = get_url('APP/SALUD/SER505C.DLL');
    postData(
        {
            datosh: datosEnvio() + data.PREFIJO + data.FACTURA + '|'
        },
        URL
    )
        .then((data) => {
            SER505C = data.COMPROBANTES;
            SER505C.pop();
            _ventanaDatos({
                titulo: 'CONSULTA POR FACTURA- GLOSAS',
                columnas: [
                    'FACTURA',
                    'FECHA_APERT',
                    'FECHA_CIERR',
                    'FECHA_RADIC',
                    'VALOR_FACT',
                    'COPAGOS',
                    'ABONOS',
                    'GLOSA_INICI',
                    'GLOSA_LEVAN',
                    'GLOSA_ACEPT',
                    'SALDO'
                ],
                data: SER505C,
                callback_esc: () => {
                    esccallback(data);
                },
                callback: (data) => {
                    callback(data);
                }
            });
        })
        .catch((error) => {
            console.log(error);
            callback();
        });
}

function SER835G(data, esccallback, callback) {
    var SER835G = [];
    let URL = get_url('APP/SALUD/SER835G.DLL');
    postData(
        {
            datosh:
                datosEnvio() +
                data.PACIENTEW +
                '|' +
                data.CLW +
                '|' +
                data.ADMINW +
                '|' +
                data.CLASIFNUM +
                '|' +
                data.LLAVENUMDEST
        },
        URL
    )
        .then((data) => {
            SER835G = data.FACT;
            SER835G.pop();
            _ventanaDatos({
                titulo:
                    data.PACIENTEW +
                    ' ' +
                    data.DECRIPPACIW +
                    ' ' +
                    data.LLAVENUMDEST +
                    ' ' +
                    data.CLASIFNUM,
                columnas: ['FECHA', 'CTA', 'CL', 'ART', 'AUTOR', 'MEDIC'],
                data: SER835G,
                callback_esc: () => {
                    CON851P('04', esccallback, esccallback);
                },
                callback: (data) => {
                    CON851P('04', esccallback, () => {
                        callback(data);
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error);
            callback();
        });
}

function SER836(data, esccallback, callback) {
    if (parseInt(data.PACIENTE) < 120) {
        let data = {
            CITAS: {
                LLAVE_CIT: '                                              ',
                MED_CIT: ''
            }
        };
        esccallback();
        // callback(data);
    } else {
        var SER836 = [];
        console.debug(datosEnvio() + data.PACIENTE + '|' + data.FECHA + '|' + data.ANO + '|');
        let URL = get_url('APP/SALUD/SER836.DLL');
        postData(
            {
                datosh: datosEnvio() + data.PACIENTE + '|' + data.FECHA + '|' + data.ANO + '|'
            },
            URL
        )
            .then((data) => {
                SER836 = data.CITAS;
                SER836.pop();
                console.log(SER836);
                SER836.sort((a, b) => {
                    if (a.FECHA_CITA < b.FECHA_CITA) {
                        return 1;
                    }
                    if (a.FECHA_CITA > b.FECHA_CITA) {
                        return -1;
                    }
                    return 0;
                });
                if (SER836.length > 0) {
                    _ventanaDatos({
                        titulo: 'VENTANA CONSULTA DE CITAS',
                        columnas: [
                            'FECHA_CITA',
                            'OBSERVACION_CITA',
                            'HORA_CITA',
                            'NOMBRE_PROFESIONAL',
                            'NOMBRE_CUP',
                            'TIPO_FACT_CITA'
                        ],
                        ancho: '95%',
                        data: SER836,
                        callback_esc: () => {
                            CON851P('04', esccallback, esccallback);
                        },
                        callback: (data) => {
                            console.debug(data);
                            CON851P('04', esccallback, () => {
                                callback(data);
                            });
                        }
                    });
                } else {
                    esccallback();
                }
            })
            .catch((error) => {
                console.log(error);
                esccallback();
            });
    }
}

function SER836T(data, esccallback, callback) {
    var SER836T = [];
    let URL = get_url('APP/SALUD/SER836T.DLL');
    postData(
        {
            datosh: datosEnvio() + data.PACIENTE + '|' + data.FECHA + '|' + data.AÑO + '|'
        },
        URL
    )
        .then((data) => {
            console.debug(data, 'SER836T');
            SER836T = data.CITASMED;
            SER836T.pop();
            if (SER836T[0].MEDICO.trim() != '') {
                _ventanaDatos({
                    titulo: '',
                    columnas: ['MEDICO', 'HORA_CIT', 'MED_CIT', 'DESCRIP_TER'],
                    data: SER836T,
                    callback_esc: () => {
                        CON851P('04', esccallback, callback);
                    },
                    callback: (data) => {
                        CON851P('04', esccallback, callback);
                    }
                });
            } else {
                callback();
            }
        })
        .catch((error) => {
            console.log(error);
            esccallback();
        });
}

function SER819H(data, esccallback, callback) {
    var SER819H = [];
    let URL = get_url('APP/SALUD/SER819H.DLL');
    postData(
        {
            datosh: datosEnvio() + data.PACIENTE + '|'
        },
        URL
    )
        .then((data) => {
            console.debug(data, 'SER819H');
            SER819H = data.DIASDISPONIBLES;
            SER819H.pop();
            _ventanaDatos({
                titulo: '',
                columnas: [
                    'FECHA',
                    'OBSERVACION',
                    'HORA_INGRESO1',
                    'HORASALIDA1',
                    'HORA_INGRESO2',
                    'HORA_SALID2'
                ],
                data: SER819H,
                callback_esc: () => {
                    esccallback(data);
                },
                callback: (data) => {
                    callback(data);
                }
            });
        })
        .catch((error) => {
            console.log(error);
            esccallback();
        });
}
function SER829(seleccion, esccallback, callback) {
    var SER829 = [];
    SER829.PROCEDIMIENTOS = [
        { COD: '1', DESCRIP: 'DIAGNOSTICO' },
        { COD: '2', DESCRIP: 'TERAPEUTICO' },
        { COD: '3', DESCRIP: 'PROTECION ESPECIFICA' },
        { COD: '4', DESCRIP: 'DETEC. TEMPRANA ENF. GENER' },
        { COD: '5', DESCRIP: 'DET. TEMPRANA ENF.PROF' },
        { COD: '9', DESCRIP: 'NO APLICA' }
    ];
    POPUP(
        {
            array: SER829.PROCEDIMIENTOS,
            titulo: 'TIPO DE PROCEDIMIENTO',
            indices: [
                {
                    id: 'COD',
                    label: 'DESCRIP'
                }
            ],
            seleccion: seleccion,
            callback_f: esccallback
        },
        callback
    );
}
function SER834A(data, esccallback, callback) {
    var edad = data['EDAD'] ? parseInt(data['EDAD'].replace(/\D/g, '')) : '';
    var unid_edad = data['EDAD'] ? data['EDAD'].replace(/[^a-zA-Z]+/g, '') : data['EDAD'];

    var naci = edad == '' ? calcular_edad(data['NACI']) : '';
    console.log('naci', naci);
    naci = naci ? naci['vlr_edad'].toString().concat(naci['unid_edad']) : '';

    var SER834A = {
        UNID_EDAD: unid_edad,
        EDAD: edad ? edad : false,
        NIT: data.NITUSU ? data.NITUSU : $_USUA_GLOBAL[0].NIT,
        NACI: data.NACI ? naci : false,
        SEXO: data.SEXOPACI ? data.SEXOPACI : false
    };
    SER834A.DATOS = [];
    if (SER834A.EDAD != '') {
        SER834A.EDAD = SER834A.EDAD;
        SER834A.UNID_EDAD = SER834A.UNID_EDAD;
    } else {
        SER834A.EDAD = parseInt(naci.replace(/\D/g, ''));
        SER834A.UNID_EDAD = naci.replace(/[^a-zA-Z]+/g, '');
    }
    if (SER834A.NIT == '844003225') {
        if (
            SER834A.SEXO == 'F' &&
            SER834A.UNID_EDAD == 'A' &&
            SER834A.EDAD > 9 &&
            SER834A.UNID_EDAD < 51
        ) {
            SER834A.DATOS.push({ COD: '01', DESCRIP: 'ATENCION PARTO PUERPERIO' });
        }

        if (SER834A.UNID_EDAD == 'D') {
            SER834A.DATOS.push({ COD: '02', DESCRIP: 'ATENCION REC.NACID' });
        }

        if (SER834A.UNID_EDAD == 'A' && SER834A.EDAD > 9 && SER834A.EDAD < 61) {
            SER834A.DATOS.push({ COD: '03', DESCRIP: 'ATENC.PLANIF.FAMIL' });
        }

        if (
            SER834A.UNID_EDAD == 'D' ||
            SER834A.UNID_EDAD == 'M' ||
            (SER834A.UNID_EDAD == 'A' && SER834A.EDAD < 10)
        ) {
            SER834A.DATOS.push({ COD: '04', DESCRIP: 'DET.ALT CRECIM <10' });
        }

        if (SER834A.UNID_EDAD == 'A' && SER834A.EDAD > 9 && SER834A.EDAD < 30) {
            SER834A.DATOS.push({ COD: '05', DESCRIP: 'DET.ALT.DESA.JOVEN' });
        }

        if (
            SER834A.SEXO == 'F' &&
            SER834A.UNID_EDAD == 'A' &&
            SER834A.EDAD > 9 &&
            SER834A.EDAD < 51
        ) {
            SER834A.DATOS.push({ COD: '06', DESCRIP: 'DET.ALT.EMBARAZO' });
        }

        if (SER834A.UNID_EDAD == 'A' && SER834A.EDAD > 29) {
            SER834A.DATOS.push({ COD: '07', DESCRIP: 'DET.ALT. ADULTO' });
        }

        SER834A.DATOS.push({ COD: '08', DESCRIP: 'DET.ALT.AGUD.VISUA' });

        if (SER834A.UNID_EDAD == 'A' && SER834A.EDAD > 17) {
            SER834A.DATOS.push({ COD: '09', DESCRIP: 'DET.ENFERM.PROFES.' });
        }

        SER834A.DATOS.push(
            { COD: '10', DESCRIP: 'NO APLICA' },
            { COD: '11', DESCRIP: 'PATOLOGIA CRONICA' }
        );
    } else {
        if (
            SER834A.SEXO == 'F' &&
            SER834A.UNID_EDAD == 'A' &&
            SER834A.EDAD > 9 &&
            SER834A.EDAD < 51
        ) {
            SER834A.DATOS.push({ COD: '01', DESCRIP: 'ATENCION PARTO PUERPERIO' });
        }

        if (SER834A.UNID_EDAD == 'D') {
            SER834A.DATOS.push({ COD: '02', DESCRIP: 'ATENCION REC.NACID' });
        }

        if (SER834A.UNID_EDAD == 'A' && SER834A.EDAD > 9 && SER834A.EDAD < 61) {
            SER834A.DATOS.push({ COD: '03', DESCRIP: 'ATENC.PLANIF.FAMIL' });
        }

        if (
            SER834A.UNID_EDAD == 'D' ||
            SER834A.UNID_EDAD == 'M' ||
            (SER834A.UNID_EDAD == 'A' && SER834A.EDAD < 12)
        ) {
            if (
                SER834A.UNID_EDAD == 'D' ||
                SER834A.UNID_EDAD == 'M' ||
                (SER834A.UNID_EDAD == 'A' && SER834A.EDAD < 6)
            ) {
                SER834A.DATOS.push({ COD: '04', DESCRIP: 'PRIMERA INFANCIA' });
            } else {
                SER834A.DATOS.push({ COD: '04', DESCRIP: 'INFANCIA' });
            }
        }

        if (SER834A.UNID_EDAD == 'A' && SER834A.EDAD > 11 && SER834A.EDAD < 29) {
            if (SER834A.EDAD > 11 && SER834A.EDAD < 18) {
                SER834A.DATOS.push({ COD: '05', DESCRIP: 'ADOLECENCIA' });
            } else {
                SER834A.DATOS.push({ COD: '05', DESCRIP: 'JUVENTUD' });
            }
        }

        if (
            SER834A.SEXO == 'F' &&
            SER834A.UNID_EDAD == 'A' &&
            SER834A.EDAD > 9 &&
            SER834A.EDAD < 51
        ) {
            SER834A.DATOS.push({ COD: '06', DESCRIP: 'DET.ALT.EMBARAZO' });
        }

        if (SER834A.UNID_EDAD == 'A') {
            if (SER834A.EDAD > 28 && SER834A.EDAD < 60) {
                SER834A.DATOS.push({ COD: '07', DESCRIP: 'ADULTEZ' });
            }

            if (SER834A.EDAD > 59) {
                SER834A.DATOS.push({ COD: '07', DESCRIP: 'VEJEZ' });
            }
        }

        SER834A.DATOS.push({ COD: '08', DESCRIP: 'DET.ALT.AGUD.VISUA' });

        if (SER834A.UNID_EDAD == 'A' && SER834A.EDAD > 17) {
            SER834A.DATOS.push({ COD: '09', DESCRIP: 'DET.ENFERM.PROFES.' });
        }

        SER834A.DATOS.push(
            { COD: '10', DESCRIP: 'NO APLICA' },
            { COD: '11', DESCRIP: 'PATOLOGIA CRONICA' }
        );
    }

    POPUP(
        {
            array: SER834A.DATOS,
            titulo: 'FINALIDAD DE LA CONSULTA',
            indices: [
                {
                    id: 'COD',
                    label: 'DESCRIP'
                }
            ],
            seleccion: data.seleccion,
            callback_f: esccallback
        },
        callback
    );
}

function SER818(data, esccallback, callback) {
    var SER818 = {
        SWMARCA: data.SWMARCA ? data.SWMARCA : false,
        SWEVOL: data.SWEVOL ? data.SWEVOL : false,
        DESDE: data.DESDE ? data.DESDE : false,
        HASTA: data.HASTA ? data.HASTA : false
    };
    var datos_envio = datosEnvio();
    datos_envio += SER818.SWMARCA + '|';
    datos_envio += SER818.SWEVOL + '|';
    datos_envio += SER818.DESDE + '|';
    datos_envio += SER818.HASTA + '|';

    let URL = get_url('APP/SALUD/SER818.DLL');
    postData(
        {
            datosh: datos_envio
        },
        URL
    )
        .then((data) => {
            data.PENDIENTES_FACT_HC.pop();
            if (data.PENDIENTES_FACT_HC == '') {
                jAlert(
                    { titulo: 'Error ', mensaje: 'No hay registros de pendientes por facturar HC' },
                    _toggleNav
                );
            } else {
                POPUP(
                    {
                        array: data.PENDIENTES_FACT_HC,
                        titulo: 'CONSULTA DE ATENCIÓN MEDICA POR FECHA',
                        callback_f: esccallback
                    },
                    callback
                );
            }
        })
        .catch((err) => {
            console.debug(err);
        });
}

function SER830(data, esccallback, callback) {
    var SER830 = [];
    SER830 = [
        { COD: '1', DESCRIP: consult_atiendProf('1') },
        { COD: '2', DESCRIP: consult_atiendProf('2') },
        { COD: '3', DESCRIP: consult_atiendProf('3') },
        { COD: '4', DESCRIP: consult_atiendProf('4') },
        { COD: '5', DESCRIP: consult_atiendProf('5') },
        { COD: '6', DESCRIP: consult_atiendProf('6') },
        { COD: '7', DESCRIP: consult_atiendProf('7') },
        { COD: '8', DESCRIP: consult_atiendProf('8') },
        { COD: '9', DESCRIP: consult_atiendProf('9') },
        { COD: 'A', DESCRIP: consult_atiendProf('A') },
        { COD: 'B', DESCRIP: consult_atiendProf('B') },
        { COD: 'H', DESCRIP: consult_atiendProf('H') },
        { COD: 'I,', DESCRIP: consult_atiendProf('I') },
        { COD: 'O', DESCRIP: consult_atiendProf('O') },
        { COD: 'T', DESCRIP: consult_atiendProf('T') }
    ];
    POPUP(
        {
            array: SER830,
            titulo: 'PROFESIONAL ATIENDE',
            indices: [
                {
                    id: 'COD',
                    label: 'DESCRIP'
                }
            ],
            seleccion: data.seleccion,
            callback_f: esccallback,
            teclaAlterna: true
        },
        callback
    );
}

function SER822A(data, esccallback, callback) {
    var SER822A = [];
    SER822A = [
        { COD: '1', DESCRIP: 'CO-PAGO' },
        { COD: '2', DESCRIP: 'CUOTA MODERADORA' },
        { COD: '3', DESCRIP: 'PAGO CONTADO' }
    ];
    if (data.popup == 'off') {
        callback(SER822A.find((e) => e.COD == data.seleccion));
    } else {
        POPUP(
            {
                array: SER822A,
                titulo: 'TIPO DE PAGO',
                indices: [
                    {
                        id: 'COD',
                        label: 'DESCRIP'
                    }
                ],
                seleccion: data.seleccion,
                callback_f: esccallback
            },
            callback
        );
    }
}

function SER822B(data, esccallback, callback) {
    var SER822B = [];
    SER822B = [
        { COD: '1', DESCRIP: 'COPAGO' },
        { COD: '2', DESCRIP: 'CUOTA MODERADORA' },
        { COD: '3', DESCRIP: 'NO APLICA' }
    ];
    if (data.popup == 'off') {
        callback(SER822B.find((e) => e.COD == data.seleccion));
    } else {
        POPUP(
            {
                array: SER822B,
                titulo: 'TIPO DE PAGO',
                indices: [
                    {
                        id: 'COD',
                        label: 'DESCRIP'
                    }
                ],
                seleccion: data.seleccion,
                callback_f: esccallback
            },
            callback
        );
    }
}

function SER822C(data, esccallback, callback) {
    var SER822C = [];
    SER822C = [
        { COD: '1', DESCRIP: 'EFECTIVO' },
        { COD: '2', DESCRIP: 'TARJETA' },
        { COD: '3', DESCRIP: 'PLATAFORMA' }
    ];
    if (data.popup == 'off') {
        callback(SER822C.find((e) => e.COD == data.seleccion));
    } else {
        POPUP(
            {
                array: SER822C,
                titulo: 'TIPO DE PAGO',
                indices: [
                    {
                        id: 'COD',
                        label: 'DESCRIP'
                    }
                ],
                seleccion: data.seleccion,
                callback_f: esccallback
            },
            callback
        );
    }
}

function TIPOSERVICIOS(data, esccallback, callback) {
    var TIPOSER = [
        { COD: '01', DESCRIP: 'CIRUGIAS' },
        { COD: '02', DESCRIP: 'LABORATORIO' }
    ];

    if ($_USUA_GLOBAL[0].NIT == 800156469) {
        TIPOSER.push(
            { COD: '03', DESCRIP: 'ECOGRAFIAS, DOPPLER, T.A.C, RESONACIA NUCLEAR' },
            { COD: '04', DESCRIP: 'ESTANCIA Y OTROS' },
            { COD: '05', DESCRIP: 'CONSULTA Y TERAPIAS' },
            { COD: '06', DESCRIP: 'PATOLOGIA Y CITOLOGIA' },
            { COD: '07', DESCRIP: 'PROMOCION Y PREVENCION' }
        );
    } else {
        TIPOSER.push(
            { COD: '03', DESCRIP: 'RX iMAGENEOLOGIA' },
            { COD: '04', DESCRIP: 'ESTANCIA Y OTROS' },
            { COD: '05', DESCRIP: 'CONSULTA Y TERAPIAS' },
            { COD: '06', DESCRIP: 'PATOLOGIA Y CITOLOGIA' },
            { COD: '07', DESCRIP: 'PROMOCION Y PREVENCION' }
        );
    }
    if (data.popup == 'off') {
        callback(TIPOSER.find((ts) => ts.COD == data.seleccion));
    } else {
        POPUP(
            {
                array: TIPOSER,
                titulo: 'Tipo servicios',
                indices: [
                    {
                        id: 'COD',
                        label: 'DESCRIP'
                    }
                ],
                seleccion: data.seleccion,
                callback_f: esccallback
            },
            callback
        );
    }
}
/////////// FUNCIONES PARA VENTANAS SALUD//////////

function get_finalidadConsulta(codigo) {
    var msj = false;
    switch (codigo) {
        case '0':
            msj = '';
            break;
        case '1':
            msj = 'ATENCION PARTO PUERPERIO';
            break;
        case '2':
            msj = 'ATENCION REC.NACID';
            break;
        case '3':
            msj = 'ATENC.PLANIF.FAMIL';
            break;
        case '4':
            msj = 'DET.ALT CRECIM <10';
            break;
        case '5':
            msj = 'DET.ALT.DESA.JOVEN';
            break;
        case '6':
            msj = 'DET.ALT.EMBARAZO';
            break;
        case '7':
            msj = 'DET.ALT. ADULTO';
            break;
        case '8':
            msj = 'DET.ALT.AGUD.VISUA';
            break;
        case '9':
            msj = 'DET.ENFERM.PROFES.';
            break;
        case '10':
            msj = 'NO APLICA';
            break;
        case '11':
            msj = 'PATOLOGIA CRONICA';
            break;
    }
    return msj;
}
function consult_atiendProf(codigo) {
    var msj = false;
    switch (codigo) {
        case '1':
            msj = 'MEDICO ESPECIALISTA';
            break;
        case '2':
            msj = 'MEDICO GENERAL';
            break;
        case '3':
            msj = 'ENFERMERA';
            break;
        case '4':
            msj = 'AUXILIAR ENFERMERIA';
            break;
        case '5':
            msj = 'TERAPEUTAS Y OTROS';
            break;
        case '6':
            msj = 'ENFERMERA JEFE PYP';
            break;
        case '7':
            msj = 'PSICOLOGIA';
            break;
        case '8':
            msj = 'NUTRICIONISTA';
            break;
        case '9':
            msj = 'NUTRICIONISTA';
            break;
        case 'A':
            msj = 'SIN DETERMINAR';
            break;
        case 'B':
            msj = 'AUDITOR MEDICO';
            break;
        case 'H':
            msj = 'ODONTOLOGO';
            break;
        case 'I':
            msj = 'HIGIENISTA ORAL';
            break;
        case 'O':
            msj = 'OPTOMETRA';
            break;
        case 'T':
            msj = 'TRABAJO SOCIAL';
            break;
        default:
            msj = false;
    }
    return msj;
}

function _claveOtrosProcesos(titulo, callbackSig, callbackAtras) {
    callbackAtras ? callbackAtras : _toggleNav;
    // esta pendiente por hacer el menu de ayudas
    var fuente =
        '<div id="popUp_clave_procesos">' +
        '<div class="col-md-12">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
        '<div class="col-md-12 col-sm-12 col-xs-12" id="validar_clave_procesos" style="display: flex;justify-content: center">' +
        '<div class="col-md-6">' +
        '<label>Clave otros proc:</label>' +
        '<div class="input-group col-md-10 col-sm-10 col-xs-10">' +
        '<input type="text" id="clave_procesos" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" type="" data-orden="1" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>';
    var dialogo = bootbox.dialog({
        title: titulo,
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: 'Aceptar',
                className: 'blue hidden',
                callback: function () { }
            }
        }
    });
    dialogo.on('shown.bs.modal', function (e) {
        $('.modal-content').css({
            width: '500px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        });
        on_claveOtrosProcesos(callbackAtras, callbackSig);
    });
}

function on_claveOtrosProcesos(callbackAtras, callbackSig) {
    // falta hacer menu de ayudas
    // _toggleF8([{ input: 'clave', app: 'procesos', funct: (e) => {} ])
    validarInputs(
        {
            form: '#validar_clave_procesos',
            orden: '1'
        },
        function () {
            $('[data-bb-handler="main"]').click();
            $('#clave_procesos').val('');
            callbackAtras(callbackAtras);
        },
        function () {
            var clave = $('#clave_procesos').val();

            if (clave == $_USUA_GLOBAL[0].CLAVE_OTR.trim()) {
                $('[data-bb-handler="main"]').click();
                $('#clave_procesos').val('');
                callbackSig(callbackSig);
            } else {
                CON851('', 'Clave invalida', null, 'error', 'Error');
                on_claveOtrosProcesos();
            }
        }
    );
}

function _VENTANABASE09(callbackAtras, callbackSig) {
    var ventanabase09 = bootbox.dialog({
        size: 'medium',
        title: 'CONSULTA DE PACIENTE BASE09',
        message:
            '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' +
            'Doc. Identidad:' +
            '</label> ' +
            '<div class="col-md-9 col-sm-6 col-xs-6" id="DOCBASE09_SER110C"> ' +
            '<input id="docpacbase09_SER110C" class="form-control input-md" data-orden="1" maxlength="15" > ' +
            '</div> ' +
            '<button type="button" id="docpacbase09Btn_110C" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-4 col-xs-6 control-label" for="name">' +
            'Paciente: ' +
            '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="PACBASE09_SER110C"> ' +
            '<input id="pacientebase09_110C" class="form-control input-md"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-8 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-4 col-xs-6 control-label" for="name">' +
            'Eps: ' +
            '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="EPSBASE09_SER110C"> ' +
            '<input id="epspacbase09_110C" class="form-control input-md"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="PAREBASE09_SER110C"> ' +
            '<input id="parebase09_110C" class="form-control input-md" data-orden="1"> ' +
            '</div> ' +
            '</div> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanabase09.off('show.bs.modal');
                    console.log($_DOCBASE09, 'PACI');
                    setTimeout(callbackSig($_DOCBASE09), 300);
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanabase09.off('show.bs.modal');
                    setTimeout(callbackAtras, 300);
                }
            },
            f8pacientesbase09: {
                label: 'Pacientes',
                className: 'btn-info',
                callback: function () {
                    ventanabase09.off('show.bs.modal');
                    setTimeout(() => {
                        _ventanaf8base09(callbackAtras, callbackSig);
                    }, 300);
                }
            }
        }
    });
    ventanabase09.init($('.modal-footer').hide());
    ventanabase09.init(_evaluardocbase09());
    ventanabase09.on('shown.bs.modal', function () {
        $('#docpacbase09_SER110C').focus();
    });
    ventanabase09.on('shown.bs.modal', function (e) {
        _toggleF8([
            {
                input: 'docpacbase09',
                app: 'SER110C',
                funct: (e) => {
                    if ((e.type == 'keydown' && e.which == 119) || e.type == 'click') {
                        set_Event_validar('#DOCBASE09_SER110C', 'off');
                        $('.btn-info').click();
                    }
                }
            }
        ]);
    });
}

function _evaluardocbase09() {
    _inputControl('disabled');
    validarInputs(
        {
            form: '#DOCBASE09_SER110C',
            orden: '1'
            // event_f4: () => {  },
        },
        () => {
            $('.btn-danger').click();
        },
        () => {
            $_DOCBASE09 = $('#docpacbase09_SER110C').val().padStart(15, '0');
            $('#docpacbase09_SER110C').val($_DOCBASE09);
            if ($_DOCBASE09 == 0) {
                _evaluardocbase09();
            } else {
                let URL = get_url('APP/SALUD/SER810W.DLL');
                postData(
                    {
                        datosh: datosEnvio() + $_DOCBASE09 + '|'
                    },
                    URL
                )
                    .then((data) => {
                        $_BASE09 = data.BASE09;
                        $('#pacientebase09_110C').val($_BASE09[0].PACIENTE);
                        $('#epspacbase09_110C').val($_BASE09[0].EPS);
                        _evaluarpare();
                    })
                    .catch((error) => {
                        console.error(error);
                        _evaluardocbase09();
                    });
            }
        }
    );
}

function _evaluarpare() {
    validarInputs(
        {
            form: '#PAREBASE09_SER110C',
            orden: '1'
        },
        () => {
            _evaluardocbase09();
        },
        () => {
            $_PAREBASE09 = $('#parebase09_110C').val();
            $('.btn-primary').click();
        }
    );
}

function _ventanaf8base09(callbackAtras, callbackSig) {
    parametros = {
        dll: 'PACIBASE09',
        valoresselect: ['Nombre del paciente'],
        f8data: 'PACIBASE09',
        columnas: [
            {
                title: 'COD'
            },
            {
                title: 'NOMBRE'
            },
            {
                title: 'EPS'
            }
        ],
        callback: (data) => {
            setTimeout(() => {
                _VENTANABASE09(callbackAtras, callbackSig);
            }, 300);
            $_DOCBASE09 = data.COD;
            setTimeout(() => {
                $('#docpacbase09_SER110C').val(data.COD);
            }, 400);
        },
        cancel: () => {
            setTimeout(_VENTANABASE09, 300);
        }
    };
    F8LITE(parametros);
}

function SER825(callbackAtras, callbackSig, orden_w, componente) {
    var fuente =
        '<div id="popUp_paciente_SER825">' +
        '<div class="col-md-12">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
        '<div class="col-md-12 col-sm-12 col-xs-12" id="validar_paciente_SER825" style="display: flex;justify-content: center">' +
        '<div class="col-md-6">' +
        '<label>Doc. Identidad:</label>' +
        '<div class="input-group col-md-10 col-sm-10 col-xs-10">' +
        '<input type="text" id="paciente_SER825" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="15" data-orden="1" required="true" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>';
    var dialogo = bootbox.dialog({
        title: 'Consulta por paciente:',
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: 'Aceptar',
                className: 'blue hidden',
                callback: function () { }
            }
        }
    });
    dialogo.on('shown.bs.modal', function (e) {
        $('.modal-content').css({
            width: '1000px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        });
        paciente_SER825(callbackAtras, callbackSig, orden_w, componente);
    });
}

// REQUIERE ENVIAR ORDEN-W PARA DETERMINAR CUAL .DAT ABRIR DEL FD-SALUD, SI NO ENVIA ORDEN-W POR LINKAGE, ENVIE '1'
function paciente_SER825(callbackAtras, callbackSig, orden_w, componente) {
    _toggleF8([
        {
            input: 'paciente',
            app: 'SER825',
            funct: (e) => {
                if ((e.type == 'keydown' && e.which == 119) || e.type == 'click') {
                    set_Event_validar('#validar_paciente_SER825', 'off');
                    $('#paciente_SER825').attr('disabled', 'true');
                    $('[data-bb-handler="main"]').click();

                    f8Pacientes_SER825(callbackAtras, callbackSig, orden_w);
                }
            }
        }
    ]);

    validarInputs(
        {
            form: '#validar_paciente_SER825',
            orden: '1'
        },
        function () {
            $('[data-bb-handler="main"]').click();
            $('#paciente_SER825').val('');
            callbackAtras(callbackAtras);
        },
        function () {
            var id_historia = cerosIzq($('#paciente_SER825').val(), 15);
            $('#paciente_SER825').val(id_historia);

            llamado_ventana_SER825(
                id_historia,
                callbackAtras,
                callbackSig,
                orden_w,
                '1',
                componente
            );
        }
    );
}

function llamado_ventana_SER825(
    idHistoria,
    callbackAtras,
    callbackSig,
    orden_w,
    llega,
    componente
) {
    var datos_envio = datosEnvio();
    datos_envio += idHistoria;
    datos_envio += '|';
    datos_envio += orden_w;
    datos_envio += '|';
    let URL = get_url('APP/SALUD/SER825.DLL');
    postData(
        {
            datosh: datos_envio
        },
        URL
    )
        .then((data) => {
            console.log(data, componente);
            // data.FACTURAS[0].TABLA.pop()

            if (componente == 'ventana_componente') {
                $('[data-bb-handler="main"]').click();
                callbackSig(data);
            } else validarFacturas_SER825(data, callbackAtras, callbackSig, orden_w);
        })
        .catch((error) => {
            console.error(error);
            if (llega == '1') {
                paciente_SER825(callbackAtras, callbackSig, orden_w, componente);
            } else {
                f8Pacientes_SER825(callbackAtras, callbackSig, orden_w, componente);
            }
        });
}

function validarFacturas_SER825(data, callbackAtras, callbackSig, orden_w) {
    $('[data-bb-handler="main"]').click();
    var f8comprob_ser825 = data.FACTURAS[0];
    f8comprob_ser825.TABLA.pop();
    _ventanaDatos({
        titulo: `COMPROBANTES DEL PACIENTE ${f8comprob_ser825.NOMBRE_PACI}`,
        columnas: [
            'SUC',
            'UND',
            'NRO_FACT',
            'FECHA',
            'CUENTA',
            'CLASE',
            'ARTICULO',
            'MEDICO',
            'DIAGNOSTICO_1',
            'DIAGNOSTICO_2',
            'COPAGO',
            'FINALID',
            'EMBAR',
            'ARTICULO2',
            'ARTICULO3',
            'ARTICULO4',
            'ARTICULO5',
            'ARTICULO6'
        ],
        data: f8comprob_ser825.TABLA,
        ancho: '90%',
        callback_esc: function () {
            callbackAtras(callbackAtras);
        },
        callback: function (data) {
            traerRegistroCompleto_SER825(data.LLAVE, callbackAtras, callbackSig, orden_w);
        }
    });
}

function traerRegistroCompleto_SER825(llave, callbackAtras, callbackSig, orden_w) {
    var datos_envio = datosEnvio();
    datos_envio += llave;
    datos_envio += '|';
    let URL = get_url('APP/SALUD/SAL450A.DLL');

    postData(
        {
            datosh: datos_envio
        },
        URL
    )
        .then((data) => {
            callbackSig(data);
        })
        .catch((error) => {
            console.error(error);
            callbackAtras(callbackAtras);
        });
}

function f8Pacientes_SER825(callbackAtras, callbackSig, orden_w) {
    parametros = {
        dll: 'PACIENTES',
        valoresselect: ['Nombre'],
        f8data: 'PACIENTES',
        columnas: [
            {
                title: 'COD'
            },
            {
                title: 'NOMBRE'
            },
            {
                title: 'EPS'
            },
            {
                title: 'EDAD'
            }
        ],
        callback: (data) => {
            console.debug(data);
            llamado_ventana_SER825(data.COD, callbackAtras, callbackSig, orden_w, '2');
        },
        cancel: () => {
            SER825(callbackAtras, callbackSig, orden_w);
        }
    };
    F8LITE(parametros);
}

function SER873(callbackAtras, callbackSig, seleccion) {
    seleccion ? seleccion : false;
    obtenerDatosCompletos(
        { nombreFd: 'UNSERV' },
        (data) => {
            var unidServ = data.UNSERV;

            var unidadesServicio = [];
            for (var i in unidServ) {
                if (unidServ[i].COD.trim() != '') {
                    if (unidServ[i].ESTADO.trim() == 'S') {
                        unidadesServicio.push(unidServ[i]);
                    }
                }
            }

            POPUP(
                {
                    array: unidadesServicio,
                    titulo: 'UNIDADES DE SERVICIO',
                    indices: [{ id: 'COD', label: 'DESCRIP' }],
                    seleccion: seleccion,
                    callback_f: callbackAtras
                },
                (data) => {
                    callbackSig(data);
                }
            );
        },
        'ONLY'
    );
}

function SER822(callbackAtras, callbackSig, seleccion) {
    seleccion ? seleccion : false;
    console.log(seleccion);
    var estados = [
        { COD: '1', DESCRIP: 'URGENCIAS' },
        { COD: '2', DESCRIP: 'CONSULTA EXT.' },
        { COD: '3', DESCRIP: 'REMITIDO' },
        { COD: '4', DESCRIP: 'NACIDO INSTI' }
    ];

    POPUP(
        {
            array: estados,
            titulo: 'Puerta ingreso',
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callbackSig(data);
        }
    );
}

function SER866C(callbackAtras, callbackSig, seleccion) {
    seleccion ? seleccion : false;
    console.log(seleccion);
    var tipos = [
        { COD: '1', DESCRIP: 'PARTICULAR' },
        { COD: '2', DESCRIP: 'PUBLICO' },
        { COD: '3', DESCRIP: 'OFICIAL' },
        { COD: '4', DESCRIP: 'DE EMERGENCIA' },
        { COD: '5', DESCRIP: 'DIPLOMATICO' },
        { COD: '6', DESCRIP: 'TRANSP. MASIVO' },
        { COD: '7', DESCRIP: 'ESCOLAR' }
    ];

    POPUP(
        {
            array: tipos,
            titulo: 'TIPO DE SERVICIO',
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callbackSig(data);
        }
    );
}

function SER866(callbackAtras, callbackSig, seleccion) {
    seleccion ? seleccion : false;
    console.log(seleccion);
    var siniestros = [
        { COD: '01', DESCRIP: 'ACCIDENTE DE TRANSITO' },
        { COD: '02', DESCRIP: 'SISMO' },
        { COD: '03', DESCRIP: 'MAREMOTO' },
        { COD: '04', DESCRIP: 'ERUPCIONES VOLCANICAS' },
        { COD: '05', DESCRIP: 'DESLIZAMIENTO TIERRA' },
        { COD: '06', DESCRIP: 'INUNDACIONES' },
        { COD: '07', DESCRIP: 'AVALANCHA' },
        { COD: '08', DESCRIP: 'INCENDIO NATURAL' },
        { COD: '09', DESCRIP: 'EXPLOSION TERRORISTA' },
        { COD: '10', DESCRIP: 'INCENDIO TERRORISTA' },
        { COD: '11', DESCRIP: 'COMBATE' },
        { COD: '12', DESCRIP: 'ATAQUE A MUNICIPIOS' },
        { COD: '13', DESCRIP: 'MASACRE' },
        { COD: '14', DESCRIP: 'DESPLAZADOS' },
        { COD: '15', DESCRIP: 'OTRO' },
        { COD: '16', DESCRIP: 'HURACAN' },
        { COD: '18', DESCRIP: 'MINA ANTIPERSONAL' }
    ];

    POPUP(
        {
            array: siniestros,
            titulo: 'TIPO DE EVENTO',
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callbackSig(data);
        }
    );
}

function SER866A(callbackAtras, callbackSig, seleccion) {
    seleccion ? seleccion : false;
    console.log(seleccion);
    var siniestros = [
        { COD: '1', DESCRIP: 'CONDUCTOR' },
        { COD: '2', DESCRIP: 'PEATON' },
        { COD: '3', DESCRIP: 'OCUPANTE' },
        { COD: '4', DESCRIP: 'CICLISTA' }
    ];

    POPUP(
        {
            array: siniestros,
            titulo: 'CONDICION VICTIMA',
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callbackSig(data);
        }
    );
}

function SER866B(callbackAtras, callbackSig, seleccion) {
    seleccion ? seleccion : false;
    console.log(seleccion);
    var aseguramientos = [
        { COD: '1', DESCRIP: 'ASEGURADO' },
        { COD: '2', DESCRIP: 'NO ASEGURADO' },
        { COD: '3', DESCRIP: 'VEHICULO FANTASMA' },
        { COD: '4', DESCRIP: 'POLIZA FALSA' },
        { COD: '5', DESCRIP: 'VEHICULO EN FUGA' }
    ];

    POPUP(
        {
            array: aseguramientos,
            titulo: 'ESTADO DE ASEGURAMIENTO',
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callbackSig(data);
        }
    );
}

function SER810F(data, esccallback, callback) {
    var SER810F = [];
    let URL = get_url('APP/SALUD/SER810F.DLL');
    postData(
        {
            datosh: datosEnvio() + data.PACIENTEW + '|' + data.ADMINW + '|'
        },
        URL
    )
        .then((data) => {
            SER810F = data.FAMILIA;
            SER810F.pop();
            _ventanaDatos({
                titulo:
                    data.PACIENTE +
                    ' ' +
                    data.CEDULA +
                    ' ' +
                    data.EPS +
                    ' ' +
                    data.PARENT +
                    ' ' +
                    data.ESTADO,
                columnas: ['PACIENTE', 'CEDUAL', 'EPS', 'PARENT', 'ESTADO'],
                data: SER810F,
                callback_esc: () => {
                    CON851P('04', esccallback, esccallback);
                },
                callback: (data) => {
                    CON851P('04', esccallback, () => {
                        callback(data);
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error);
            callback();
        });
}

function SER810K(data, esccallback, callback) {
    var SER810K = [];
    let URL = get_url('APP/SALUD/SER810K.DLL');
    postData(
        {
            datosh:
                datosEnvio() + data.PACIENTEW + '|' + data.ANOSISTEMA + '|' + data.MESSISTEMA + '|'
        },
        URL
    )
        .then((data) => {
            SER810K = data.BASEDATOS;
            SER810K.pop();
            _ventanaDatos({
                titulo: 'VENTANA DE CAMBIOS BASE DE DATOS',
                columnas: ['FECHA', 'HORA', 'OPER', 'CAMPO', 'ANTERIOR', 'ACTUAL'],
                data: SER810K,
                callback_esc: () => {
                    esccallback();
                },
                callback: (data) => {
                    callback(data);
                }
            });
        })
        .catch((error) => {
            console.log(error);
            callback();
        });
}

function SER810F(data, esccallback, callback) {
    var SER810F = [];
    let URL = get_url('APP/SALUD/SER810F.DLL');
    postData(
        {
            datosh: datosEnvio() + data.PACIENTEW + '|' + data.ADMIW + '|'
        },
        URL
    )
        .then((data) => {
            SER810F = data.FAMILIAR;
            SER810F.pop();
            _ventanaDatos({
                titulo: 'VENTANA DE GRUPO FAMILIAR',
                columnas: ['PACIENTE', 'CEDULA', 'EPS', 'NACIM', 'PARENT', 'ESTADO'],
                data: SER810F,
                callback_esc: () => {
                    esccallback();
                },
                callback: (data) => {
                    callback(data);
                }
            });
        })
        .catch((error) => {
            console.log(error);
            callback();
        });
}

function _ventanaF8Reserva_PRE802(arrayReservas, tr_pre, nit, input_esc, input_enter, arraynits) {
    var titulo_reserva = '';
    var nit_w = '',
        vigencia_w = '',
        tipo_w = '';

    parseInt(tr_pre) < 04 || tr_pre == undefined ? (nit_w = '0') : (nit_w = nit);

    switch (tr_pre) {
        case '01':
            titulo_reserva = 'VENTANA DE CONSULTA DE PRESUP APROB';
            break;
        case '02':
            titulo_reserva = 'VENTANA DE CONSULTA DE ADICIONES';
            break;
        case '03':
            titulo_reserva = 'VENTANA DE CONSULTA DE TRASLADOS';
            break;
        case '04':
            titulo_reserva = 'VENTANA DE CONSULTA DE COMPROMISOS';
            break;
        case '05':
            titulo_reserva = 'VENTANA DE CONSULTA DE PAGOS';
            break;
        case '06':
            titulo_reserva = 'VENTANA DE CONSULTA DE CERTIFICADOS';
            break;
        case '07':
            titulo_reserva = 'VENTANA DE CONSULTA DE PAC';
            break;
        case '08':
            titulo_reserva = 'VENTANA DE CONSULTA DE OBLIGACIONES';
            break;
        case '10':
            titulo_reserva = 'VENTANA OBLIGACIONES SOBRE RESERVA';
            break;
    }

    //BUSCAR VIGENCIA
    console.log(tr_pre, 'tr_pre');
    switch (tr_pre) {
        case '08':
            ingresarVigencia();
            function ingresarVigencia() {
                bootbox.prompt({
                    title: 'Vigencia: (1) Actual, (2) anterior',
                    placeholder: '',
                    maxlength: 1,
                    size: 'small',
                    type: Number,
                    buttons: {
                        confirm: {
                            label: 'Ok'
                        },
                        cancel: {
                            label: 'Cancelar'
                        }
                    },
                    callback: function (value) {
                        if (value != undefined) {
                            vigencia_w = value;
                            switch (vigencia_w) {
                                case '1':
                                    tr_pre = '08';
                                    validarNit();
                                    break;
                                case '2':
                                    tr_pre = '10';
                                    validarNit();
                                    break;
                                default:
                                    CON851('03', '03', ingresarVigencia(), 'error', 'error');
                            }
                        } else {
                            tipo_w = '0';
                            _enterInput(input_enter);
                        }
                    }
                });
            }
            break;
        case 10:
            vigencia_w = '2';
            validarNit();
            break;
        default:
            vigencia_w = '1';
            validarNit();
            break;
    }

    // BUSCAR-NIT
    function validarNit() {
        if (parseInt(nit) > 0 || tr_pre == '01' || tr_pre == '02' || tr_pre == '03') {
            ventanaMae();
        } else {
            ingresarNit();
            function ingresarNit() {
                for (i in arraynits) {
                    arraynits[i]['IDENTIFICACION'] = arraynits[i]['COD'];
                }
                _ventanaDatos_lite_v2({
                    titulo: 'VENTANA DE TERCEROS',
                    data: arraynits,
                    indice: ['NOMBRE', 'IDENTIFICACION', 'TELEF', 'CIUDAD', 'ACT'],
                    mascara: [
                        {
                            NOMBRE: 'NOMBRE',
                            DIRREC: 'DIRECCION',
                            TELEF: 'TELEFONO'
                        }
                    ],
                    minLength: 3,
                    callback_esc: function () {
                        tipo_w = '0';
                        _enterInput(input_enter);
                    },
                    callback: function (data) {
                        nit_w = data.COD;
                        ventanaMae();
                    }
                });
            }
        }
    }
    // VENTANA-MAE

    if (nit_w == '0' || nit_w == undefined) {
        const result = arrayReservas.find((e) => e.TR_PRE == tr_pre);

        result == undefined
            ? CON851('08', '08', _enterInput(input_enter), 'error', 'error')
            : ventanaF8Reserva();
    } else {
        const result = arrayReservas.find((e) => e.NIT_PRE == nit_w);
        result == undefined
            ? CON851('08', '08', _enterInput(input_enter), 'error', 'error')
            : ventanaF8Reserva();
    }

    function ventanaF8Reserva() {
        switch (tr_pre) {
            case '08':
                arrayReservas = arrayReservas.filter((n) => n.TR_PRE == '05' || n.TR_PRE == '08');

                break;
            case '10':
                arrayReservas = arrayReservas.filter((n) => n.TR_PRE == '05' || n.TR_PRE == '10');
                break;
            default:
                arrayReservas = arrayReservas.filter(n.TR_PRE != tr_pre);
                break;
        }
        for (i in arrayReservas) {
            arrayReservas[i]['DOCUM'] = arrayReservas[i]['DOCUM_PRE'];
            // if (tr_pre == "05") {
            arrayReservas[i]['COMP'] = arrayReservas[i]['COMP_PRE'];
            // } else {
            arrayReservas[i]['FECHA'] = arrayReservas[i]['FECHA_PRE'];
            // if(parseInt(arrayReservas[i]['VLR_PRE']) > 0 || arrayReservas[i]['VLR_PRE'] == "88"){
            arrayReservas[i]['VLR_INIC'] = arrayReservas[i]['VLR_PRE'];
            arrayReservas[i]['COMP'] = '000001';
            // }
            // if(tr_pre == "08"){
            arrayReservas[i]['VALOR_DCTO'] = arrayReservas[i]['VLR_DESCTO_PRE'];
            // }
            // }
            arrayReservas[i]['LLAVE'] = arrayReservas[i]['LLAVE_COD_PRE'];
            arrayReservas[i]['DETALLE'] = arrayReservas[i]['DET_TABLA'];
            arrayReservas[i]['VALOR'] = arrayReservas[i]['VLR_PRE'];
        }
        _ventanaDatos({
            titulo: titulo_reserva + ' ------- ' + nit,
            columnas: ['DOCUM', 'COMP', 'LLAVE', 'DETALLE', 'VALOR_DCTO', 'FECHA', 'VALOR'],
            data: arrayReservas.filter(
                (e) =>
                    e.NIT_PRE == nit &&
                    e.TR_PRE == tr_pre &&
                    (parseInt(e.VLR_PRE) > 0 || e.TIP_DOC_PRE == '88')
            ),
            ancho: 1200,
            callback_esc: () => {
                $(input_esc).focus();
            },
            callback: (data) => {
                var RESERVA = data.DOCUM_PRE;
                $(input_enter).val(RESERVA);
                _enterInput(input_enter);
            }
        });
    }
}

function _ventanaLoteFarmaceutico(callback, callback_esc, almacen, llaveArticulo, codTrans) {
    try {
        ventanaLotes = bootbox.dialog({
            title: 'LOTE FARMACEUTICO',
            message:
                '<style type="text/css">' +
                '.modal-footer {' +
                'padding: 20px;' +
                '	text-align: right;' +
                'margin-top:38px;' +
                'border-top: 1px solid #e5e5e5;}' +
                '	textarea {' +
                'resize: none;}' +
                '.span-lote{ ' +
                'padding: 12px 12px 12px 0;' +
                'display: inline-block; }' +
                '.inputs-lote{ ' +
                'padding: 6px 10px;' +
                'margin: 8px 0;' +
                'border: 1px solid #ccc;' +
                'border-radius: 4px;' +
                'box-sizing: border-box;' +
                '} </style>' +
                '<div class="portlet" > ' +
                '<div class="portlet-body" style="text-align:left">' +
                '<div class="inline-inputs col-md-11" id="lotes">' +
                '<span class="span-lote">Lote:</span>' +
                '<input class="form-control col-md-2 col-sm-5 col-xs-5 inputs-lote" id="lote_id" data-orden="1" style="width:35%;">' +
                '<button type="button" id="loteBtn_id"' +
                'class="btn btn-default col-md-2 col-sm-2 col-xs-2" style="width:10%;">' +
                '<i class="icon-magnifier"></i>' +
                '</button>' +
                '<input class="form-control col-md-5 col-sm-5 col-xs-5 inputs-lote" id="descripcion_lote">' +
                '</div><br>' +
                '<div class="inline-inputs col-md-11" id="lab">' +
                '<span class="span-lote">Lab:&nbsp</span>' +
                '<input class="form-control col-md-10 col-sm-10 col-xs-10 inputs-lote" id="lab_lote" data-orden="1">' +
                '</div><br>' +
                '</div>' + //cierrra portlet body
                '</div>' + //cierrra portlety
                '</div><br>' +
                '</div><br>'
        });
        ventanaLotes.on('shown.bs.modal', function (e) {
            _F8Lotes(callback, callback_esc, almacen, llaveArticulo, codTrans, ventanaLotes);
        });
    } catch (ex) {
        console.debug(ex);
    }
}

function _F8Lotes(callback, callback_esc, almacen, llaveArticulo, codTrans) {
    let URL = get_url('APP/INVENT/INV814A.DLL');
    var llave = almacen + llaveArticulo;
    datos_envio = datosEnvio() + llave + '|';
    console.log(datos_envio, 'datos_envio');
    postData({ datosh: datos_envio }, URL).then((data) => {
        console.log(data, 'data inv814A');
        $_lotes = data.LOTESFARM;
        if ($_lotes[0].DESCRIP.trim() == '08') {
            CON851('08', '08', null, 'error', 'error');
        }
        $_lotes.pop();
    });
    validarLote(callback, callback_esc);

    _inputControl('disabled');
    _toggleF8([
        {
            input: 'lote',
            app: 'id',
            funct: (e) => {
                if ((e.type == 'keydown' && e.which == 119) || e.type == 'click') {
                    for (var i in $_lotes) {
                        $_lotes[i]['CODIGO'] = $_lotes[i]['COD'];
                        $_lotes[i]['LABORATORIO'] = $_lotes[i]['LAB'];
                        $_lotes[i]['VENCIMIENTO'] = $_lotes[i]['VENCE'];
                        $_lotes[i]['CUM'] = $_lotes[i]['CUM'];
                    }
                    _ventanaDatos({
                        titulo: 'VENTANA DE LOTES DE FARMA X ARTICULO',
                        columnas: [
                            'CODIGO',
                            'LABORATORIO',
                            'LOTE',
                            'VENCIMIENTO',
                            'CUM',
                            'ALMACEN',
                            'SALDO'
                        ],
                        ancho: 850,
                        data: $_lotes,
                        callback_esc: () => {
                            setTimeout(function () {
                                $('#lote_id').focus();
                            }, 400);
                        },
                        callback: (data) => {
                            document.getElementById('lote_id').value = data.CODIGO.trim();
                            document.getElementById('descripcion_lote').value = data.DESCRIP.trim();
                            _enterInput('#lote_id');
                        }
                    });
                }
            }
        }
    ]);

    function validarLote(callback, callback_esc) {
        var lab_ltf = '',
            art_ltf = '',
            SW_OK = '',
            descrip = '',
            lote_ltf = '',
            ban_lnk;
        validarInputs(
            {
                form: '#lotes',
                orden: '1'
            },
            () => {
                console.debug('presiono ESC');
                ventanaLotes.modal('hide');
                ban_lnk = 1;
                callback_esc();
            },
            function () {
                COD_LOTE = document.getElementById('lote_id').value.trim();
                const result = $_lotes.find((e) => e.COD.trim() == COD_LOTE.trim());
                if (result != undefined) {
                    lab_ltf = result.LAB;
                    art_ltf = result.ART;
                    descrip = result.DESCRIP;
                    lote_ltf = result.COD;
                    console.log('lo encuentra');
                }
                if (result == undefined) {
                    if (codTrans == '11' || codTrans == '21') {
                        CON851('01', '01', validarLote(callback, callback_esc), 'error', 'error');
                        lab_ltf = ' ';
                        art_ltf = llaveArticulo;
                    } else {
                        // FALTA CREAR INV115
                        SW_OK = 'S';
                        CON851P('08', validarLote(callback, callback_esc), () => {
                            console.log('FALTA CREAR INV115');
                        });
                        if (SW_OK == 'S') {
                            // LLAMADO INV115
                        }
                    }
                } else {
                    if (result.CUM.trim() == '') {
                        console.log('llama inv115');
                        // LLAMADO INV115
                        // () => { $('#lote_id').focus(); }
                    } else {
                        console.log(lote_ltf, descrip, lab_ltf, art_ltf, 'datos');
                        // if(lote_ltf && lab_ltf && descrip_ltf != "")
                        document.getElementById('lote_id').value = lote_ltf;
                        document.getElementById('descripcion_lote').value = descrip;
                        document.getElementById('lab_lote').value = lab_ltf;

                        if (art_ltf.trim() != llaveArticulo.trim()) {
                            CON851(
                                '1M',
                                '1M',
                                validarLote(callback, callback_esc),
                                'error',
                                'error'
                            );
                        } else {
                            console.log('entra a callback');
                            ventanaLotes.modal('hide');
                            console.log(lab_ltf, 'lab');
                            callback(result.CUM, result.COD);
                        }
                    }
                }
            }
        );
    }
}

function SER848(callbackSER848, esccallbackSER848) {
    var ventanaser848 = bootbox.dialog({
        size: 'small',
        title: 'LECTOR DE CEDULA',
        onEscape: true,
        message:
            '<div class="row" id="VALIDAR1_SER848"> ' +
            '<div class="col-md-12"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            'CODIGO' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datocodigo_SER848" class="form-control input-md" data-orden="1" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            'CEDULA' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datocedula_SER848" class="form-control input-md" data-orden="2" maxlength="14"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            '1ER APELLIDO' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datoapellido1_SER848" class="form-control input-md" data-orden="3" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            '2DO APELLIDO' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datoapellido2_SER848" class="form-control input-md" data-orden="4" maxlength="15"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            '1ER NOMBRE' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datonombre1_SER848" class="form-control input-md" data-orden="5" maxlength="12"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            '2DO NOMBRE' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datonombre2_SER848" class="form-control input-md" data-orden="6" maxlength="12"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            'SEXO' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datosexo_SER848" class="form-control input-md" data-orden="7" maxlength="1"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            'FECHA DE NACIMIENTO' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datofechadenacimiento_SER848" class="form-control input-md" data-orden="8" maxlength="10"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' +
            'HEMOCL' +
            '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datofechadenacimiento_SER848" class="form-control input-md" data-orden="9" maxlength="3"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaser848.off('show.bs.modal');
                    callbackSER848($('#datocedula_SER848').val().replace(/,/g, ''));
                    // _Leerpaciente_41();
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaser848.off('show.bs.modal');
                    esccallbackSER848();
                    // _Datopaciente2_41();
                }
            }
        }
    });
    ventanaser848.init(_evaluarSER848());
    ventanaser848.init(mascarasser848());
    ventanaser848.init($('.modal-footer').hide());
    ventanaser848.on('shown.bs.modal', function () {
        $('#datocodigo_SER848').focus();
    });
}

function _evaluarSER848() {
    _inputControl('disabled');
    validarInputs(
        {
            form: '#VALIDAR1_SER848',
            orden: '1'
        },
        () => {
            $('.btn-danger').click();
        },
        () => {
            $('.btn-primary').click();
        }
    );
}

function mascarasser848() {
    var idhistoriaser848Mask = IMask($('#datocedula_SER848')[0], {
        mask: Number,
        thousandsSeparator: ',',
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ',',
        mapToRadix: ['.']
    });
    var sexoser848Mask = IMask($('#datosexo_SER848')[0], {
        mask: 'a',
        prepare: function (str) {
            console.debug(str);
            if (str == 'F' || str == 'f' || str == 'M' || str == 'M') {
                return str.toUpperCase();
            }
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase();
        }
    });
    var fechaser848Mask = IMask($('#datofechadenacimiento_SER848')[0], {
        mask: Date,
        pattern: 'Y-m-d',
        lazy: true,
        blocks: {
            Y: {
                mask: IMask.MaskedRange,
                placeholderChar: 'y',
                from: '1900',
                to: '20' + moment().format('YY'),
                maxLength: 4
            },
            m: {
                mask: IMask.MaskedRange,
                placeholderChar: 'm',
                from: '01',
                to: '12',
                maxLength: 2
            },
            d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 }
        },
        format: function (date) {
            return moment(date).format('YYYY-MM-DD');
        },
        parse: function (str) {
            var fecha = moment(str).format('YYYY-MM-DD');
            if (fecha == 'Invalid date') {
                CON851('01', '01', null, 'error', 'error');
            } else {
                return str;
            }
        }
    });
}

///////////////////////////////////////////

function SER838(callback, callbackAtras, seleccion) {
    seleccion ? seleccion : false;
    let estados = [
        { COD: '1', DESCRIP: 'REGISTRO DE OBJECION' },
        { COD: '2', DESCRIP: 'RESPUESTA OBJECION' },
        { COD: '3', DESCRIP: 'GLOSA' },
        { COD: '4', DESCRIP: 'SEGUNDA RESPUESTA' },
        { COD: '5', DESCRIP: 'CONCILIACION' }
    ];

    POPUP(
        {
            array: estados,
            titulo: 'ESTADOS DE GLOSA',
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callback(data);
        }
    );
}

/////////////////////////////////////
var datosF8 = [];

function SERA83(callback, callbackback) {
    var ventana_f8consecutivoglosa = bootbox.dialog({
        size: 'small',
        title: 'FACTURA GLOSA',
        message:
            '<div class="row"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-6 col-xs-12 control-label">' +
            'Entidad' +
            '</label> ' +
            '<div class="input-group col-md-5 col-sm-5 col-xs-12" id="VALIDARENTIDAD_SERA83"> ' +
            '<input id="entidad_SERA83" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10" > ' +
            '</div> ' +
            '<button type="button" id="entidadBtn_SERA83" class="btn  f8-Btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div> ' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-succes',
                callback: function () {
                    ventana_f8consecutivoglosa.off('show.bs.modal');
                    console.log(callback, datosF8);
                    setTimeout(() => {
                        _ventenaF8Glosas_SERA83(callback, callbackback);
                    }, 500);
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventana_f8consecutivoglosa.off('show.bs.modal');
                    setTimeout(callbackback, 500);
                }
            }
        }
    });
    ventana_f8consecutivoglosa.init($('.modal-footer').hide());
    ventana_f8consecutivoglosa.init(this._evaluarentidad_SERA83());
    ventana_f8consecutivoglosa.on('shown.bs.modal', function () {
        $('#entidad_SERA83').focus();
    });
    ventana_f8consecutivoglosa.init(
        _toggleF8([
            {
                input: 'entidad',
                app: 'SERA83',
                funct: _ventanaF8entidad_SERA83
            }
        ])
    );
}

function _ventanaF8entidad_SERA83(e) {
    if ((e.type == 'keydown' && e.which == 119) || e.type == 'click') {
        loader('show');
        postData(
            {
                datosh: datosEnvio()
            },
            get_url('APP/CONTAB/CON802.DLL')
        )
            .then((data) => {
                loader('hide');
                data.TERCEROS.pop();
                let TERCEROS = data.TERCEROS;
                _ventanaDatos({
                    titulo: 'VENTANA DE CONSULTA TERCEROS',
                    columnas: ['COD', 'NOMBRE'],
                    data: TERCEROS,
                    callback_esc: function () {
                        $('#entidad_SERA83').focus();
                    },
                    callback: function (data) {
                        $('#entidad_SERA83').val(data.COD);
                        _enterInput('#entidad_SERA83');
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                CON851('', 'Ha ocurrido un error en el SERA83', null, 'error', 'Error');
                $('.btn-danger').click();
            });
    }
}

function _evaluarentidad_SERA83() {
    validarInputs(
        {
            form: '#VALIDARENTIDAD_SERA83',
            orden: '1'
        },
        () => {
            $('.btn-danger').click();
        },
        () => {
            var entidad = $('#entidad_SERA83').val().trim().padStart(10, '0');
            postData(
                {
                    datosh:
                        datosEnvio() + `${entidad}|20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}|`
                },
                get_url('APP/SALUD/SER-A83.DLL')
            )
                .then((data) => {
                    console.log(data);
                    data.GLOSAS.pop();
                    datosF8 = data.GLOSAS;
                    $('.btn-succes').click();
                })
                .catch((error) => {
                    console.error(error);
                    _evaluarentidad_SERA83();
                });
        }
    );
}

function _ventenaF8Glosas_SERA83(callback, callbackback, data) {
    _ventanaDatos({
        titulo: 'GLOSAS POR ENTIDAD',
        columnas: ['FACTURA', 'GLOSA', 'TERCERO', 'PACIENTE'],
        data: datosF8,
        callback_esc: function () {
            callbackback()
            // $('.btn-danger').click();
        },
        callback: function (data) {
            callback(data);
        }
    });
}

function _mensajespacientes_SALUD(callback, back, params) {
    if (params.STOP == '1') {
        console.log('PASO 1');
        postData({ datosh: `${datosEnvio()}${params.ID}|` }, get_url('APP/SALUD/SER810B.DLL'))
            .then((data) => {
                var data = data.NOTASPACI[0];
                params.FECHANOTA = data['FECHA-NOTA'];
                params.OBSERVNOTA = data['OBSERV1-NOTA'].trim();
                params.OBSERVNOTA2 = data['OBSERV2-NOTA'].trim();
                params.OBSERVNOTA3 = data['OBSERV3-NOTA'].trim();
                params.OPERNOTA = data['OPER-OBSE-NOTA'].trim();
                if (data['OBSERV1-NOTA'].trim() == '') {
                    console.log('NADA')
                    callback();
                } else {
                    _ventanajspaciente_SALUD(callback, back, params);
                }
            })
            .catch((error) => {
                console.error(error);
                callback();
            });
    } else {
        _ventanajspaciente_SALUD(callback, back, params);
    }
}

function _ventanajspaciente_SALUD(callback, back, params) {
    params.VENTANAID = 'MENSAJESPACI';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-6 col-sm-6 col-xs-12',
            titulo: 'MENSAJES SOBRE EL PACIENTE',
            html: `
                    <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                        <div class="col-md-6 col-sm-3 col-xs-12">
                            <label class="col-md-6 col-sm-6 col-xs-6 control-label">Fecha:</label>
                            <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1MSJ_VENTANA">
                                <input id="fechanota_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="5"> 
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-3 col-xs-12">
                            <label class="col-md-4 col-sm-4 col-xs-4 control-label">Operador:</label>
                            <div class="col-md-8 col-sm-8 col-xs-8" id="VALIDAR2MSJ_VENTANA"> 
                                <input id="opernota_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12">
                            </div>
                        </div>
                        <div class="salto-linea"></div>
                        <div class="col-md-12 col-sm-6 col-xs-12" id="VALIDAR4MSJ_VENTANA">
                            <label class="col-md-12 col-sm-12 col-xs-12">Observaciones</label>
                                <textarea id="observacionesnota_VENTANA" class="form-control" rows="4" data-orden="2" maxlength="400" style="resize: none;"></textarea>
                        </div>
                        <div class="salto-linea"></div>
                        <div class="col-md-2">
                        <button type="button" style= "margin-left: 246px" class="col-md-12 btn btn-primary" id="buttonmsj_VENTANA">Aceptar</button>
                        </div>
                    </div>
                    `
        })
    );
    _inputControl('disabled');
    $('#fechanota_VENTANA').val(params.FECHANOTA);
    $('#observacionesnota_VENTANA').val(
        params.OBSERVNOTA + params.OBSERVNOTA2 + params.OBSERVNOTA3
    );
    $('#opernota_VENTANA').val(params.OPERNOTA);
    if (params.STOP == '1') {
        document.getElementById('buttonmsj_VENTANA').onclick = function () {
            CON851P(
                '04',
                () => {
                    $(`#${params.VENTANAID}`).remove();
                    back();
                },
                () => {
                    $(`#${params.VENTANAID}`).remove();
                    callback();
                }
            );
        };
    } else {
        _evaluarfecha_SALUD(callback, back, params);
    }
}

function _evaluarfecha_SALUD(callback, back, params) {
    validarInputs(
        {
            form: '#VALIDAR4MSJ_VENTANA',
            orden: '1'
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            let OBSERVACIONNOTA = $('#observacionesnota_VENTANA').val().trim();
            if (OBSERVACIONNOTA.trim() == '') {
                _evaluarfecha_SALUD(callback, back, params);
            } else {
                let FECHANOTA = moment().format('YYYYMMDD');
                postData(
                    {
                        datosh: `${datosEnvio()}1|${params.ID}|${localStorage.Usuario
                            }|${OBSERVACIONNOTA}|${FECHANOTA}|`
                    },
                    get_url('APP/SALUD/SER810A.DLL')
                )
                    .then((data) => {
                        callback();
                        $(`#${params.VENTANAID}`).remove();
                    })
                    .catch((error) => {
                        console.error(error);
                        _evaluarfecha_SALUD(callback, back, params);
                    });
            }
        }
    );
}

function _buscarduplicadopaciente_SALUD(callback, back, params) {
    loader('show');
    var datos_envio =
        datosEnvio() +
        params.APELLIDOS +
        '|' +
        params.NOMBRES +
        '|' +
        params.ID +
        '|' +
        params.FECHANAC +
        '|';
    postData(
        {
            datosh: datos_envio
        },
        get_url('APP/SALUD/SER810H_1.DLL')
    )
        .then((data) => {
            console.log(data);
            loader('hide');
            if (data['DUPLICADO'][0]['FECHA'] > 0) {
                params.NOMBRES = data['DUPLICADO'][0]['NOMBRES'];
                params.CEDULA = data['DUPLICADO'][0]['CEDULA'];
                params.FECHANAC = data['DUPLICADO'][0]['FECHA'];
                params.EPS = data['DUPLICADO'][0]['EPS'];
                CON851('2B', '2B', null, 'error', 'error');
                _ventanaDuplicado_SER110C(callback, back, params);
            } else {
                params.CEDULA = '';
                callback((data = { CEDULA: params.CEDULA }));
            }
        })
        .catch((error) => {
            console.log(error);
            params.CEDULA = '';
            callback((data = { CEDULA: params.CEDULA }));
        });
}

function _ventanaDuplicado_SER110C(callback, back, params) {
    console.log(callback, back, params);
    params.VENTANAID = 'PACDUPLICADO';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-8 col-sm-12 col-xs-12',
            titulo: 'REGISTROS DUPLICADOS',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-4 col-sm-3 col-xs-12">
                <label class="col-md-3 col-sm-6 col-xs-6 control-label">Doc:</label>
                <div class="col-md-9 col-sm-9 col-xs-6" id="VALIDAR1PAC_VENTANA">
                    <input id="idpaciente_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" > 
                </div>
            </div>
            <div class="col-md-8 col-sm-3 col-xs-12">
                <label class="col-md-2 col-sm-6 col-xs-6 control-label">Nombre:</label>
                <div class="col-md-10 col-sm-6 col-xs-6" id="VALIDAR2PAC_VENTANA">
                    <input id="nombrespaciente_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" > 
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-5 col-sm-3 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">Fecha nac:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR3PAC_VENTANA">
                    <input id="fechanacpaciente_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" > 
                </div>
            </div>
            <div class="col-md-5 col-sm-3 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">Eps:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR4PAC_VENTANA">
                    <input id="epspaciente_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" > 
                </div>
            </div>
            <div class="col-md-2">
            <button type="button" class="col-md-12 btn btn-primary" id="buttonduplicado_VENTANA">Aceptar</button>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    $('#idpaciente_VENTANA').val(params.CEDULA);
    $('#nombrespaciente_VENTANA').val(params.NOMBRES);
    $('#fechanacpaciente_VENTANA').val(params.FECHANAC);
    $('#epspaciente_VENTANA').val(params.EPS);
    document.getElementById('buttonduplicado_VENTANA').onclick = function () {
        CON851P(
            '07',
            () => {
                $(`#${params.VENTANAID}`).remove();
                back();
            },
            () => {
                callback((data = { CEDULA: params.CEDULA }));
                $(`#${params.VENTANAID}`).remove();
            }
        );
    };
}

function _ventanaprefactura_SALUD(callback, back, params) {
    params.VENTANAID = 'VENTANAPREFACTURA';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-4 col-sm-4 col-xs-12',
            titulo: 'VENTANA FARMA',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-6 col-sm-3 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">Fecha farma:</label>
                <div class="col-md-6 col-sm-9 col-xs-6" id="VALIDAR1PAC_VENTANA">
                    <input id="fechafarma_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12"> 
                </div>
            </div>
            <div class="col-md-6 col-sm-3 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">Hora farma:</label>
                <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR2PAC_VENTANA">
                    <input id="horafarma_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12"> 
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-6 col-sm-3 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">Operador:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR3PAC_VENTANA">
                    <input id="operfarma_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12"> 
                </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
            <button type="button" class="col-md-12 btn btn-primary" id="buttonfarma_VENTANA">Aceptar</button>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    $('#fechafarma_VENTANA').val(params.FECHAFARMA);
    $('#horafarma_VENTANA').val(params.HORAFARMA);
    $('#operfarma_VENTANA').val(params.OPERFARMA);
    document.getElementById('buttonfarma_VENTANA').onclick = function () {
        CON851('1H', '1H', null, 'error', 'error');
        CON851P(
            '04',
            () => {
                $(`#${params.VENTANAID}`).remove();
                back();
            },
            () => {
                callback((data = { CEDULA: params.CEDULA }));
                $(`#${params.VENTANAID}`).remove();
            }
        );
    };
}

function _ventanaipsante_SALUD(callback, back, params) {
    console.log('VENTANA DE IPSANTE')
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-4 col-sm-4 col-xs-12',
            titulo: 'VLR DE FACT Y COPAGO IPS ANT',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">NOMBRE IPS ANT:</label>
                <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1IPSANT_VENTANA">
                    <input id="ventaipsan108_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" 
                    data-orden="1" maxlength="30"> 
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">NOMBRE IPS ANT:</label>
                <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR2IPSANT_VENTANA">
                    <input id="ventafactip108_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" 
                    data-orden="1" maxlength="30"> 
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">NOMBRE IPS ANT:</label>
                <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR3IPSANT_VENTANA">
                    <input id="ventacopatip108_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" 
                    data-orden="1" maxlength="30"> 
                </div>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluaripsante_VENTANA(callback, back, params);
}

function _evaluaripsante_VENTANA(callback, back, params) {
    console.log('1')
    validarInputs(
        {
            form: '#VALIDAR1IPSANT_VENTANA',
            orden: "1"
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            let NOMBREIPSANT = $('#ventaipsan108_VENTANA').val().trim().toUpperCase();
            _evaluaripsante2_VENTANA(callback, back, params)
        }
    );
}

function _evaluaripsante2_VENTANA(callback, back, params) {
    console.log('2')
    validarInputs(
        {
            form: '#VALIDAR2IPSANT_VENTANA',
            orden: "1"
        },
        () => {
            _evaluaripsante_VENTANA(callback, back, params)
        },
        () => {
            let VLRIPSANT = $('#ventafactip108_VENTANA').val()
            _evaluaripsante3_VENTANA(callback, back, params)
        }
    );
}
function _evaluaripsante3_VENTANA(callback, back, params) {
    console.log('3')
    validarInputs(
        {
            form: '#VALIDAR3IPSANT_VENTANA',
            orden: "1"
        },
        () => {
            _evaluaripsante2_VENTANA(callback, back, params)
        },
        () => {
            let NOMBREIPSANT2 = $('#ventaipsan108_VENTANA').val().trim()
            let VLRIPSANT2 = $('#ventafactip108_VENTANA').val()
            let VLRCOPIPSANT2 = $('#ventacopatip108_VENTANA').val()
            callback(data = { NOMBREIPS: NOMBREIPSANT2, VALORIPS: VLRIPSANT2, VALORCOP: VLRCOPIPSANT2 });
            $(`#${params.VENTANAID}`).remove()
        }
    );
}

function _ventanaclave_SALUD(callback, back, params) {
    params.VENTANAID = 'CLAVEOPCION';
    if (params.PREFIJO == 'A') {
        params.TITULO = 'CLAVE DE ACCESO 1 AMBULATORIO'
    } else {
        params.TITULO = 'CLAVE DE ACCESO 2 P O T'
    }
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-4 col-sm-4 col-xs-12',
            titulo: params.TITULO,
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-12 col-sm-3 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">CLAVE:</label>
                <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDARCLAVEAPERT_VENTANA">
                    <input id="claveapertura_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" 
                    data-orden="1" maxlength="6" placeholder= "Digite Clave"> 
                </div>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluarclaveapert_VENTANA(callback, back, params);
}

function _evaluarclaveapert_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#VALIDARCLAVEAPERT_VENTANA',
            orden: '1'
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            let CLAVE = $('#claveapertura_VENTANA').val().trim().toUpperCase();
            if (CLAVE.trim() == params.SWCLAVE.trim()) {
                callback();
                $(`#${params.VENTANAID}`).remove()
            } else {
                _evaluarclaveapert_VENTANA(callback, back, params)
            }
        }
    );
}

function _resultadocovid_SALUD(callback, back, params) {
    params.VENTANAID = 'RESULTADOCOVID';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-4 col-sm-4 col-xs-12',
            titulo: 'COVID-19 (CORONAVIRUS)',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-12 col-sm-3 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">Paciente pendiente de resultado COVID-19:</label>
                <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1COVID_VENTANA">
                    <input id="resultadocovid_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" placeholder= "S/N"> 
                </div>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluarresultadocovid_VENTANA(callback, back, params);
}

function _evaluarresultadocovid_VENTANA(callback, back, params) {
    console.log(params, 'ALTOCOSTO');
    $('#resultadocovid_VENTANA').val(params.COVID);
    validarInputs(
        {
            form: '#VALIDAR1COVID_VENTANA',
            orden: '1'
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            let RESULTADOCOVID = $('#resultadocovid_VENTANA').val().trim().toUpperCase();
            if (RESULTADOCOVID.trim() == '' || (RESULTADOCOVID != 'S' && RESULTADOCOVID != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarresultadocovid_VENTANA(callback, back, params);
            } else {
                callback((data = { RESPUESTA: RESULTADOCOVID }));
                $(`#${params.VENTANAID}`).remove();
            }
        }
    );
}


function _acompanantepaciente_SALUD(callback, back, params) {
    params.VENTANAID = 'ACOMPPACIENTE';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-6 col-sm-6 col-xs-12',
            titulo: 'DATOS RESPONSABLE...NRO 1 SI NO TRAE',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="inline-inputs">
                    <label class="col-md-4 col-sm-6 col-xs-6 control-label">ID ACOMP:</label>
                    <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR1ACOMP_VENTANA">
                       <input id="idacomp_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="15"> 
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">TIPO ID:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR2ACOMP_VENTANA">
                    <input id="tipoacomp_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="3"> 
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">1ER.APEL:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR3ACOMP_VENTANA">
                    <input id="apelacomp1_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="15"> 
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">2DO.APEL:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR4ACOMP_VENTANA">
                    <input id="apelacomp2_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="15"> 
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">1ER.NOMB:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR5ACOMP_VENTANA">
                    <input id="nombreacomp1_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12"> 
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">2DO.NOMB:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR6ACOMP_VENTANA">
                    <input id="nombreacomp2_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12"> 
                </div>
            </div>
            <div class="salto-linea"></div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <label class="col-md-4 col-sm-6 col-xs-6 control-label">TELEFONO:</label>
                <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR7ACOMP_VENTANA">
                    <input id="telacomp_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12"> 
                </div>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluaridacomp_VENTANA(callback, back, params);
}
function _evaluaridacomp_VENTANA(callback, back, params) {
    let IDACOMP = params.IDACOMP;
    let TIPOACOMP = params.TIPOACOMP;
    let APEL1ACOMP = params.APEL1ACOMP;
    let APEL2ACOMP = params.APEL2ACOMP;
    let NOMB1ACOMP = params.NOMB1ACOMP;
    let NOMB2ACOMP = params.NOMB2ACOMP;
    let TELACOMP = params.TELACOMP;
    $('#idacomp_VENTANA').val(IDACOMP);
    $('#tipoacomp_VENTANA').val(TIPOACOMP);
    $('#apelacomp1_VENTANA').val(APEL1ACOMP);
    $('#apelacomp2_VENTANA').val(APEL2ACOMP);
    $('#nombreacomp1_VENTANA').val(NOMB1ACOMP);
    $('#nombreacomp2_VENTANA').val(NOMB2ACOMP);
    $('#telacomp_VENTANA').val(TELACOMP);
    validarInputs(
        {
            form: '#VALIDAR1ACOMP_VENTANA',
            orden: '1'
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            let IDACOMP = $('#idacomp_VENTANA').val().padStart(15, '0')

            if (IDACOMP == 0) {
                _evaluaridacomp_VENTANA(callback, back, params)
            } else {
                if (IDACOMP > 1) {
                    console.log('MAYOR QUE ')
                    postData({ datosh: `${datosEnvio()}${IDACOMP}|` },
                        get_url("APP/SALUD/SER810-1.DLL"))
                        .then((data) => {
                            console.log(data, 'ACOMP')
                            var data = data["REG-PACI"][0];
                            $('#tipoacomp_VENTANA').val(data["TIPO-ID"])
                            $('#apelacomp1_VENTANA').val(data["APELL-PACI1"])
                            $('#apelacomp2_VENTANA').val(data["APELL-PACI2"])
                            $('#nombreacomp1_VENTANA').val(data["NOM-PACI1"])
                            $('#nombreacomp2_VENTANA').val(data["NOM-PACI2"])
                            $('#telacomp_VENTANA').val(data.TELEFONO)
                            params.TIPOACOMP = data["TIPO-ID"]
                            _evaluartipoacomp_VENTANA(callback, back, params)
                        })
                        .catch(error => {
                            console.error(error);
                            _evaluaridacomp_VENTANA(callback, back, params)
                        });
                } else {
                    console.log('MENOR QUE ')
                    let TIPOACOMP = ""
                    let APEL1ACOMP = ""
                    let APEL2ACOMP = ""
                    let NOMB1ACOMP = ""
                    let NOMB2ACOMP = ""
                    callback(data = { IDACOMP: IDACOMP, TIPOACOMPA: TIPOACOMP, APEL1ACOMPA: APEL1ACOMP, APEL2ACOMPA: APEL2ACOMP, NOMB1ACOMPA: NOMB1ACOMP, NOMB2ACOMPA: NOMB2ACOMP, TELACOMPA: TELACOMP });
                    $(`#${params.VENTANAID}`).remove();
                }
            }

        }
    );
}

function _evaluartipoacomp_VENTANA(callback, back, params) {
    console.log(params.TIPOACOMP)
    obtenerDatosCompletos({ nombreFd: 'TIPOID' }, (data) => {
        console.log(data, 'TIPOID');
        var tipodoc = data.IDENTIFICACION;
        POPUP(
            {
                array: tipodoc,
                titulo: 'TIPO DOCUMENTO',
                indices: [
                    {
                        id: 'COD',
                        label: 'DESCRIP'
                    }
                ],
                seleccion: params.TIPOACOMP.padEnd(3, ' '),
                callback_f: () => {
                    _evaluaridacomp_VENTANA(callback, back, params)
                },
            },
            tipodoc => {
                params.TIPOACOMP = tipodoc.COD + " - " + tipodoc.DESCRIP;
                $('#tipoacomp_VENTANA').val(params.TIPOACOMP.substring(0, 2))
                _evaluarapel1comp_VENTANA(callback, back, params)
            },
            (tipodoc) => {
                let TIPOACOMP = tipodoc.COD + ' - ' + tipodoc.DESCRIP;
                $('#tipoacomp_VENTANA').val(TIPOACOMP.substring(0, 2));
                _evaluarapel1comp_VENTANA(callback, back, params);
            }
        );
    });
}

function _evaluarapel1comp_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#VALIDAR3ACOMP_VENTANA',
            orden: '1'
        },
        () => {
            setTimeout(_evaluartipoacomp_VENTANA(callback, back, params), 300);
        },
        () => {
            let APEL1ACOMP = $('#apelacomp1_VENTANA').val().toUpperCase();
            if (APEL1ACOMP.trim() == '' || $.isNumeric(APEL1ACOMP)) {
                if (APEL1ACOMP.trim() == '') CON851('02', '02', null, 'error', 'error');
                else CON851('58', '58', null, 'error', 'error');
                _evaluarapel1comp_VENTANA(callback, back, params);
            } else {
                _evaluarapel2comp_VENTANA(callback, back, params);
            }
        }
    );
}

function _evaluarapel2comp_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#VALIDAR4ACOMP_VENTANA',
            orden: '1'
        },
        () => {
            _evaluarapel1comp_VENTANA(callback, back, params);
        },
        () => {
            let APEL2ACOMP = $('#apelacomp2_VENTANA').val().toUpperCase();
            _evaluarnomb1comp_VENTANA(callback, back, params);
        }
    );
}

function _evaluarnomb1comp_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#VALIDAR5ACOMP_VENTANA',
            orden: '1'
        },
        () => {
            _evaluarapel2comp_VENTANA(callback, back, params);
        },
        () => {
            let NOMB1ACOMP = $('#nombreacomp1_VENTANA').val().toUpperCase();
            if (NOMB1ACOMP.trim() == '' || $.isNumeric(NOMB1ACOMP)) {
                CON851('58', '58', null, 'error', 'error');
                _evaluarnomb1comp_VENTANA(callback, back, params);
            } else {
                _evaluarnomb2comp_VENTANA(callback, back, params);
            }
        }
    );
}

function _evaluarnomb2comp_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#VALIDAR6ACOMP_VENTANA',
            orden: '1'
        },
        () => {
            _evaluarnomb1comp_VENTANA(callback, back, params);
        },
        () => {
            let NOMB2ACOMP = $('#nombreacomp2_VENTANA').val().toUpperCase();
            _evaluartelacomp_VENTANA(callback, back, params);
        }
    );
}
function _evaluartelacomp_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#VALIDAR7ACOMP_VENTANA',
            orden: '1'
        },
        () => {
            _evaluarnomb2comp_VENTANA(callback, back, params);
        },
        () => {
            let TELACOMP = $('#telacomp_VENTANA').val();
            if (TELACOMP.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _evaluartelacomp_VENTANA(callback, back, params);
            } else {
                let IDACOMP = $('#idacomp_VENTANA').val();
                let TIPOACOMP = $('#tipoacomp_VENTANA').val();
                let APEL1ACOMP = $('#apelacomp1_VENTANA').val();
                let APEL2ACOMP = $('#apelacomp2_VENTANA').val();
                let NOMB1ACOMP = $('#nombreacomp1_VENTANA').val();
                let NOMB2ACOMP = $('#nombreacomp2_VENTANA').val();
                console.log(
                    IDACOMP,
                    TIPOACOMP,
                    APEL1ACOMP,
                    APEL2ACOMP,
                    NOMB1ACOMP,
                    NOMB2ACOMP,
                    TELACOMP,
                    'VDSVDSVDSVDS'
                );
                callback(
                    (data = {
                        IDACOMP: IDACOMP,
                        TIPOACOMPA: TIPOACOMP,
                        APEL1ACOMPA: APEL1ACOMP,
                        APEL2ACOMPA: APEL2ACOMP,
                        NOMB1ACOMPA: NOMB1ACOMP,
                        NOMB2ACOMPA: NOMB2ACOMP,
                        TELACOMPA: TELACOMP
                    })
                );
                $(`#${params.VENTANAID}`).remove();
            }
        }
    );
}

function _consultabase09_SALUD(callback, back) {
    let datos = new Object();
    datos.VENTANAID = 'PACIENTEBASE09';
    _ventanaalterna_SALUD(
        (data = {
            ID: datos.VENTANAID,
            tamaño: 'col-md-8 col-sm-4 col-xs-12',
            titulo: 'CONSULTA DE PACIENTE BASE09',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
        <div class="col-md-9 col-sm-9 col-xs-12">
        <div class="inline-inputs">
            <label class="col-md-4 col-sm-6 col-xs-6 control-label">DOC. IDENTIDAD:</label>
            <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR1BASE09_VENTANA">
               <input id="DOCBASE09_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="15"> 
            </div>
            <button type="button" id="DOCBASE09Btn_VENTANA" class="btn  f8-Btn btn-default col-md-1 col-sm-1 col-xs-1">
                <i class="icon-magnifier"></i>
            </button>
        </div>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
            <div class="col-md-8 col-sm-6 col-xs-6" id="VALIDAR2BASE09_VENTANA">
               <input id="pared_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="3"> 
            </div>
        </div>
        <div class="salto-linea"></div>
        <div class="col-md-8 col-sm-6 col-xs-12">
            <label class="col-md-3 col-sm-6 col-xs-6 control-label">PACIENTE:</label>
            <div class="col-md-9 col-sm-6 col-xs-6">
               <input id="nombrepac_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="3"> 
            </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <label class="col-md-3 col-sm-6 col-xs-6 control-label">EPS:</label>
            <div class="col-md-9 col-sm-6 col-xs-6">
               <input id="eps_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="15"> 
            </div>
        </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluarbase09_VENTANA(callback, back, datos);
}

function _evaluarbase09_VENTANA(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDAR1BASE09_VENTANA',
            orden: '1'
        },
        () => {
            $(`#${datos.VENTANAID}`).remove();
            back();
        },
        () => {
            let DOCBASE09 = $('#DOCBASE09_VENTANA').val().padStart(15, '0');
            if (DOCBASE09 == 0) {
                _evaluarbase09_VENTANA(callback, back, datos);
            } else {
                var BASE09 = [];
                let URL = get_url('APP/SALUD/SER810W.DLL');
                postData(
                    {
                        datosh: datosEnvio() + DOCBASE09 + '|'
                    },
                    URL
                )
                    .then((data) => {
                        BASE09 = data.BASE09[0];
                        $('#nombrepac_VENTANA').val(BASE09.PACIENTE);
                        $('#eps_VENTANA').val(BASE09.EPS);
                        _evaluarpare_VENTANA(callback, back, datos);
                    })
                    .catch((error) => {
                        console.error(error);
                        _evaluarbase09_VENTANA(callback, back, datos);
                    });
            }
        }
    );
}

function _evaluarpare_VENTANA(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDAR2BASE09_VENTANA',
            orden: '1'
        },
        () => {
            _evaluarbase09_VENTANA(callback, back, datos);
        },
        () => {
            let PAREBASE09 = $('#pared_VENTANA').val();
            let PACIENTEBASE09W = $('#DOCBASE09_VENTANA').val();
            callback((data = { CODBASE09: PACIENTEBASE09W }));
            $(`#${datos.VENTANAID}`).remove();
        }
    );
}

function _ventanafechaatenc_SALUD(callback, back, params) {
    params.VENTANAID = 'FECHAATENCION';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            tamaño: 'col-md-12 col-sm-12 col-xs-12',
            titulo: 'VENTANA FECHA ATENCION',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-12 col-sm-3 col-xs-12">
                <div id="VALIDAR1INIATENCION_VENTANA">
                <label class="col-md-1 col-sm-6 col-xs-6 control-label">FECHA DE INICIO:</label>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="anoiniatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="4" placeholder= "AAAA"> 
                </div>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="mesiniatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="2" maxlength="2" placeholder= "MM"> 
                </div>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="diainiatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="3" maxlength="2" placeholder= "DD"> 
                </div>
                </div>
                <div id="VALIDAR2INIATENCION_VENTANA">
                <label class="col-md-1 col-sm-6 col-xs-6 control-label">HORA DE INICIO:</label>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="horainiatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength=2" placeholder= "HH"> 
                </div>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="mininiatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="2" maxlength="2" placeholder= "MM"> 
                </div>
                </div>
            </div>
            <div class="col-md-12 col-sm-3 col-xs-12">
                <div id="VALIDAR3INIATENCION_VENTANA">
                <label class="col-md-1 col-sm-6 col-xs-6 control-label">FECHA DE FINAL:</label>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="anofinatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="4" placeholder= "AAAA"> 
                </div>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="mesfinatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="2" maxlength="2" placeholder= "MM"> 
                </div>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="diafinatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="3" maxlength="2" placeholder= "DD"> 
                </div>
                </div>
                <div id="VALIDAR4INIATENCION_VENTANA">
                <label class="col-md-1 col-sm-6 col-xs-6 control-label">HORA DE FINAL:</label>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="horafinatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2" placeholder= "HH"> 
                </div>
                <div class="col-md-2 col-sm-6 col-xs-6">
                    <input id="minfinatencion_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="2" maxlength="2" placeholder= "MM"> 
                </div>
                </div>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluarfechainiaten_VENTANA(callback, back, params, '1');
}

function _evaluarfechainiaten_VENTANA(callback, back, params, orden) {
    params.ANOINGW = params.FECHAINGNUM.substring(0, 4)
    if (params.FECHAINIATEN != 0 || params.FECHAFINATEN != 0) {
        $('#anoiniatencion_VENTANA').val(params.FECHAINIATEN.substring(0, 4));
        $('#mesiniatencion_VENTANA').val(params.FECHAINIATEN.substring(4, 6));
        $('#diainiatencion_VENTANA').val(params.FECHAINIATEN.substring(6, 8));
        $('#horainiatencion_VENTANA').val(params.HORAINIATEN.substring(0, 2));
        $('#mininiatencion_VENTANA').val(params.HORAINIATEN.substring(2, 4));
        $('#anofinatencion_VENTANA').val(params.FECHAFINATEN.substring(0, 4));
        $('#mesfinatencion_VENTANA').val(params.FECHAFINATEN.substring(4, 6));
        $('#diafinatencion_VENTANA').val(params.FECHAFINATEN.substring(6, 8));
        $('#horafinatencion_VENTANA').val(params.HORAFINATEN.substring(0, 2));
        $('#minfinatencion_VENTANA').val(params.HORAFINATEN.substring(2, 4));
    }
    validarInputs(
        {
            form: '#VALIDAR1INIATENCION_VENTANA',
            orden: orden
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            let ANOATENCIONNUM = $('#anoiniatencion_VENTANA').val();
            if (ANOATENCIONNUM < (params.ANOINGW - 1) || ANOATENCIONNUM > (params.ANOINGW + 1)) {
                CON851('37', '37', null, 'error', 'Error');
                _evaluarfechainiaten_VENTANA(callback, back, params, '1')
            } else {
                let MESATENCIONNUM = $('#mesiniatencion_VENTANA').val();
                let DIAATENCIONNUM = $('#diainiatencion_VENTANA').val();
                $('#diainiatencion_VENTANA').val(DIAATENCIONNUM.padStart(2, '0'))
                $('#mesiniatencion_VENTANA').val(MESATENCIONNUM.padStart(2, '0'));
                params.FECHAATENINI = ANOATENCIONNUM + MESATENCIONNUM + DIAATENCIONNUM
                if (moment(params.FECHAATENINI).format().trim() == 'Fecha inválida') {
                    CON851('03', '03', null, 'error', 'Error');
                    _evaluarfechainiaten_VENTANA(callback, back, params, '3')
                } else {
                    _evaluarhorainiaten_VENTANA(callback, back, params, '1')
                }
            }
        }
    );
}

function _evaluarhorainiaten_VENTANA(callback, back, params, orden) {
    validarInputs(
        {
            form: '#VALIDAR2INIATENCION_VENTANA',
            orden: orden
        },
        () => {
            _evaluarfechainiaten_VENTANA(callback, back, params, '3')
        },
        () => {
            let HORAATENCIONNUM = $('#horainiatencion_VENTANA').val();
            let MINATENCIONNUM = $('#mininiatencion_VENTANA').val();
            $('#horainiatencion_VENTANA').val(HORAATENCIONNUM.padStart(2, '0'));
            $('#mininiatencion_VENTANA').val(MINATENCIONNUM.padStart(2, '0'))
            params.HORAATENINI = HORAATENCIONNUM.padStart(2, '0') + MINATENCIONNUM.padStart(2, '0')
            if (HORAATENCIONNUM > 23) {
                CON851('37', '37', null, 'error', 'Error');
                _evaluarhorainiaten_VENTANA(callback, back, params, '1')
            } else {
                if (MINATENCIONNUM > 59) {
                    CON851('37', '37', null, 'error', 'Error');
                    _evaluarhorainiaten_VENTANA(callback, back, params, '2')
                } else {
                    _evaluarfechafinaten_VENTANA(callback, back, params, '1')
                }
            }
        }
    );
}

function _evaluarfechafinaten_VENTANA(callback, back, params, orden) {
    if (params.FECHAFINATEN == 0 || params.FECHAFINATEN.trim() == '') {
        $('#anofinatencion_VENTANA').val(params.FECHAATENINI.substring(0, 4));
        $('#mesfinatencion_VENTANA').val(params.FECHAATENINI.substring(4, 6));
        $('#diafinatencion_VENTANA').val(params.FECHAATENINI.substring(6, 8));
        $('#horafinatencion_VENTANA').val(params.HORAATENINI.substring(0, 2))
        $('#minfinatencion_VENTANA').val(params.HORAATENINI.substring(2, 4))
    }
    params.ANORETW = params.FECHASALNUM.substring(0, 4)
    validarInputs(
        {
            form: '#VALIDAR3INIATENCION_VENTANA',
            orden: orden
        },
        () => {
            _evaluarhorainiaten_VENTANA(callback, back, params, '2')
        },
        () => {
            let ANOFINATENCIONNUM = $('#anofinatencion_VENTANA').val();
            if (ANOFINATENCIONNUM < (params.ANORETW - 1) || ANOFINATENCIONNUM > (params.ANOINGW + 1)) {
                CON851('37', '37', null, 'error', 'Error');
                _evaluarfechafinaten_VENTANA(callback, back, params, '1')
            } else {
                let MESFINATENCIONNUM = $('#mesfinatencion_VENTANA').val();
                let DIAFINATENCIONNUM = $('#diafinatencion_VENTANA').val();
                $('#mesfinatencion_VENTANA').val(MESFINATENCIONNUM.padStart(2, '0'))
                $('#diafinatencion_VENTANA').val(DIAFINATENCIONNUM.padStart(2, '0'))
                params.FECHAATENFIN = ANOFINATENCIONNUM + MESFINATENCIONNUM + DIAFINATENCIONNUM
                if (moment(params.FECHAATENFIN).format().trim() == 'Fecha inválida') {
                    CON851('03', '03', null, 'error', 'Error');
                    _evaluarfechafinaten_VENTANA(callback, back, params, '3')
                } else {
                    _evaluarhorafinaten_VENTANA(callback, back, params, '1')
                }
            }
        }
    );
}

function _evaluarhorafinaten_VENTANA(callback, back, params, orden) {
    validarInputs(
        {
            form: '#VALIDAR4INIATENCION_VENTANA',
            orden: orden
        },
        () => {
            _evaluarfechafinaten_VENTANA(callback, back, params, '3')
        },
        () => {
            let HORAFINATENCIONNUM = $('#horafinatencion_VENTANA').val();
            let MINFINATENCIONNUM = $('#minfinatencion_VENTANA').val();
            $('#horafinatencion_VENTANA').val(HORAFINATENCIONNUM.padStart(2, '0'))
            $('#minfinatencion_VENTANA').val(MINFINATENCIONNUM.padStart(2, '0'))
            params.HORAATENFIN = HORAFINATENCIONNUM.padStart(2, '0') + MINFINATENCIONNUM.padStart(2, '0')
            if (HORAFINATENCIONNUM > 23) {
                CON851('37', '37', null, 'error', 'Error');
                _evaluarhorafinaten_VENTANA(callback, back, params, '1')
            } else {
                if (MINFINATENCIONNUM > 59) {
                    CON851('37', '37', null, 'error', 'Error');
                    _evaluarhorafinaten_VENTANA(callback, back, params, '2')
                } else {

                    callback(
                        (data = {
                            FECHAATENINI: params.FECHAATENINI,
                            HORAATENINI: params.HORAATENINI,
                            FECHAATENFIN: params.FECHAATENFIN,
                            HORAATENFIN: params.HORAATENFIN,
                        })
                    );
                    $(`#${params.VENTANAID}`).remove();
                }
            }

        }
    );
}


function _liquidacioncopagos_SALUD(callback, back, params) {
    params.VENTANAID = 'LIQUIDACIONDEPAGOS';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            titulo: 'VENTANA DE LIQUIDACION DE COPAGOS',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-3 col-sm-3 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">% COPAGO:</label>
                <div class="col-md-6 col-sm-6 col-xs-6" id="VALIDAR1VENTANACOPAGO_VENTANA">
                    <input id="porcentcopago_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="5"> 
                </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
                <label class="col-md-4 col-sm-4 col-xs-4 control-label">VALOR:</label>
                <div class="col-md-8 col-sm-8 col-xs-8" id="VALIDAR2VENTANACOPAGO_VENTANA"> 
                    <input id="montocopago_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="12">
                </div>
            </div>
            <div class="col-md-5 col-sm-5 col-xs-12">
                <label class="col-md-6 col-sm-6 col-xs-6 control-label">COPAGOS ACUMULADOS :</label>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <input id="copagoacumulado_VENTANA" class="form-control col-md-12 col-sm-12 col-xs-12"> 
                </div> 
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluarporcentcopago_VENTANA(callback, back, params);
}

function _evaluarporcentcopago_VENTANA(callback, back, params) {
    let porcentcopagoMask_VENTANA = IMask($('#porcentcopago_VENTANA')[0], {
        mask: Number,
        scale: 2,
        radix: '.',
        normalizeZeros: true,
        padFractionalZeros: true
    });
    //  SE AGREGA VALIDACION MIENTRAS SE CAMBIA LAS DEMAS OPCIONES DE IMPRESION DEL SER109D AL SER808-01
    let nombreporcentaje = 'PORCECOPAGO_NUM'
    let nombrecopago = 'COPAGO_NUM'
    if (params.NUMERACION.PORCENTCOP_NUM) {
        nombreporcentaje = 'PORCENTCOP_NUM'
        nombrecopago = 'COPAGOEST_NUM'
    }
    if (params.NUMERACION[nombreporcentaje].trim() == '') params.NUMERACION[nombreporcentaje] = '0.00';
    porcentcopagoMask_VENTANA.typedValue = parseFloat(
        params.NUMERACION[nombreporcentaje].padStart(5, '0')
    ).toString();
    $('#copagoacumulado_VENTANA').val(params.NUMERACION[nombrecopago]);
    $('#montocopago_VENTANA').val(params.NUMERACION[nombrecopago]);
    console.log(params);
    validarInputs(
        {
            form: '#VALIDAR1VENTANACOPAGO_VENTANA',
            orden: '1'
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            if (porcentcopagoMask_VENTANA.value.trim() == '') {
                porcentcopagoMask_VENTANA.typedValue = params.NUMERACION.PORCECOPAGO_NUM;
            }
            if (parseFloat(porcentcopagoMask_VENTANA.value.trim()) == 0) {
                _validarcopago_VENTANA(callback, back, params);
            } else if (parseFloat(porcentcopagoMask_VENTANA.value.trim()) > 100) {
                CON851('', 'Revise el valor del porcentaje', null, 'error', 'Error');
                _evaluarporcentcopago_VENTANA(callback, back, params);
            } else {
                if (params.LLAVE_NUM.substring(0, 1) == 'P' && $_USUA_GLOBAL[0].NIT == 892000264) {
                    params.TIPOCOPAGO = "1"
                }
                if (parseInt(porcentcopagoMask_VENTANA.value.trim()) == 9) {
                    if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == '') {
                        _evaluarcopagoest_VENTANA(callback, back, params);
                    } else {
                        let valor =
                            (Math.round(
                                (params.TOTBASECOPAGO *
                                    parseFloat(porcentcopagoMask_VENTANA.value.trim())) /
                                100
                            ) /
                                100) *
                            100;
                        $('#montocopago_VENTANA').val(numeroencomas(valor));
                        _validarcopago_VENTANA(callback, back, params);
                    }
                } else {
                    let valor =
                        (Math.round(
                            (params.TOTBASECOPAGO *
                                parseFloat(porcentcopagoMask_VENTANA.value.trim())) /
                            100
                        ) /
                            100) *
                        100;
                    $('#montocopago_VENTANA').val(numeroencomas(valor));
                    _validarcopago_VENTANA(callback, back, params);
                }
            }
        }
    );
}

function _evaluarcopagoest_VENTANA(callback, back, params) {
    var copagoestMask_VENTANA = IMask($('#montocopago_VENTANA')[0], {
        mask: Number,
        thousandsSeparator: ',',
        scale: 2,
        radix: '.',
        thousandsSeparator: ',',
        normalizeZeros: true,
        padFractionalZeros: true
    });
    validarInputs(
        {
            form: '#VALIDAR2VENTANACOPAGO_VENTANA',
            orden: '1'
        },
        () => {
            _evaluarporcentcopago_VENTANA(callback, back, params);
        },
        () => {
            _validarcopago_VENTANA(callback, back, params);
        }
    );
}

function _validarcopago_VENTANA(callback, back, params) {
    if (
        params.NUMERACION.ESTRATO_PACI != '1' &&
        params.NUMERACION.ESTRATO_PACI != '2' &&
        params.NUMERACION.ESTRATO_PACI != '3'
    ) {
        params.NUMERACION.ESTRATO_PACI = '3';
    }
    switch (params.NUMERACION.TIPOPACI_NUM) {
        case 'C':
            switch (params.NUMERACION.ESTRATO_PACI) {
                case '1':
                    params.COPALIQMESW = Math.round(parseInt($_USUA_GLOBAL[0].SAL_MIN) * 28.7 / 100);
                    break;
                case '2':
                    params.COPALIQMESW = Math.round(parseInt($_USUA_GLOBAL[0].SAL_MIN) * 115 / 100);
                    break;
                case '3':
                    params.COPALIQMESW = Math.round(parseInt($_USUA_GLOBAL[0].SAL_MIN) * 230 / 100);
                    break;
            }
            break;
        case 'S':
            params.COPALIQMESW = (params.TOTBASECOPAGO * 10) / 100;
            break;
    }
    switch (params.NUMERACION.TIPOPACI_NUM) {
        case 'C':
            switch (params.NUMERACION.ESTRATO_PACI) {
                case '1':
                    params.COPALIQANOW = Math.round(parseInt($_USUA_GLOBAL[0].SAL_MIN) * 57.5 / 100);
                    break;
                case '2':
                    params.COPALIQANOW = Math.round(parseInt($_USUA_GLOBAL[0].SAL_MIN) * 230 / 100);
                    break;
                case '3':
                    params.COPALIQANOW = Math.round(parseInt($_USUA_GLOBAL[0].SAL_MIN) * 460 / 100);
                    break;
            }
            break;
        case 'S':
            params.COPALIQANOW = parseFloat($_USUA_GLOBAL[0].SAL_MIN) / 2;
            if (params.COPALIQMESW > params.COPALIQANOW) {
                params.COPALIQMESW = params.COPALIQANOW;
            }
            break;
    }
    if (parseInt($('#montocopago_VENTANA').val().replace(/,/g,'')) > params.COPALIQMESW) {
        $('#montocopago_VENTANA').val(params.COPALIQMESW.toString());
    }
    // if (params.NUMERACION.FECHARET_NUM != '00000000') {
    //     let cantidadaños = moment(params.NUMERACION.FECHAING_NUM, "YYYYMMDD").diff(moment(params.NUMERACION.FECHARET_NUM, "YYYYMMDD"), 'years');
    //     cantidadaños < 0 ? cantidadaños = cantidadaños * -1 : null;
    //     if (cantidadaños == 0) {
    //     }
    //     if (cantidadaños > 0) {
    //         if (parseInt($('#montocopago_VENTANA').val()) > params.COPALIQANOW) {
    //             params.COPALIQANOW = params.COPALIQANOW * cantidadaños;
    //             $('#montocopago_VENTANA').val(params.COPALIQANOW);
    //         }
    //     }
    // }
    if (
        $('#porcentcopago_VENTANA').val() != params.NUMERACION.COPAGO_NUM ||
        $('#montocopago_VENTANA').val().replace(/,/g, '') != params.NUMERACION.PORCECOPAGO_NUM
    ) {
        postData(
            {
                datosh:
                    datosEnvio() +
                    params.LLAVE_NUM +
                    '|' +
                    $('#porcentcopago_VENTANA').val().padStart(5, '0') +
                    '|' +
                    $('#montocopago_VENTANA').val().replace(/,/g, '').trim().padStart(9, '0') +
                    '|' +
                    params.TIPOCOPAGO +
                    '|'
            },
            get_url('APP/SALUD/SER109A.DLL')
        )
            .then((data) => {
                let copago = $('#montocopago_VENTANA').val().replace(/,/g, '');
                let porcentaje = $('#porcentcopago_VENTANA').val();
                $(`#${params.VENTANAID}`).remove();
                callback((data = { COPAGO: copago, PORCENTAJE: porcentaje }));
            })
            .catch((error) => {
                console.error(error);
                _evaluarporcentcopago_VENTANA(callback, back, params);
            });
    } else {
        let copago = $('#montocopago_VENTANA').val().replace(/,/g, '');
        let porcentaje = $('#porcentcopago_VENTANA').val();
        $(`#${params.VENTANAID}`).remove();
        callback((data = { COPAGO: copago, PORCENTAJE: porcentaje }));
    }
}

function _cerrarnumeracion_VENTANA(callback, back, params) {
    postData({ datosh: `${datosEnvio()}${params.LLAVE_NUM}|` }, get_url('APP/SALUD/SAL020I.DLL'))
        .then((data) => {
            data.FECHAULTIMAFACT.pop();
            let FECHALIMI = '00000000';
            if (data.FECHAULTIMAFACT != '') {
                FECHALIMI = data.FECHAULTIMAFACT[data.FECHAULTIMAFACT.length - 1];
            }
            if (parseInt(FECHALIMI) > parseInt(params.FECHALNK)) {
                CON851('', 'LA FECHA DEL ULT. COMP > A FECHA DEL MES', null, 'error', 'Error');
                if (
                    params.PREFIJOW != 'C' &&
                    params.PREFIJOW != 'E' &&
                    params.PREFIJOW != 'Ñ' &&
                    params.PREFIJOW != 'O' &&
                    params.PREFIJOW != 'P' &&
                    params.PREFIJOW != 'T' &&
                    params.PREFIJOW != 'U'
                ) {
                    _ventanacierrefact_VENTANA(callback, back, params);
                } else {
                    callback();
                }
            } else {
                _ventanacierrefact_VENTANA(callback, back, params);
            }
        })
        .catch((error) => {
            console.error(error);
            back();
        });
}

function _ventanacierrefact_VENTANA(callback, back, params) {
    params.VENTANAID = 'VENTANACIERREFACTURAS';
    _ventanaalterna_SALUD(
        (data = {
            ID: params.VENTANAID,
            titulo: 'CIERRE DE FACTURAS',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto; display: flex; justify-content: center;">
            <div class="col-md-3 col-sm-3 col-xs-12">
                <label class="col-md-8 col-sm-8 col-xs-8 control-label" for="name">Desea cerrar la factura?</label>
                <div class="col-md-4 col-sm-4 col-xs-4" id="CERRARFACT_VENTANA">
                    <input id="cerrar_VENTANA" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N">
                </div>
            </div>

            <div class="col-md-3 col-sm-3 col-xs-12">
                <label class="col-md-8 col-sm-8 col-xs-8 control-label" for="name">Factura lista para RIPS?</label>
                <div class="col-md-4 col-sm-4 col-xs-4" id="LISTARIPS_VENTANA">
                    <input id="listrips_VENTANA" class="form-control input-md" data-orden="1" maxlength="1" placeholder="S/N" required="true">
                </div>
            </div>

            <div class="col-md-5 col-sm-5 col-xs-12" id="FECHACIE_VENTANA">
                <label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name"> Fecha cierre: </label>
                <div class="col-md-3 col-sm-6 col-xs-6">
                    <input id="anocierre_VENTANA" class="form-control input-md" data-orden="1" maxlength="4" placeholder="AAAA" required="true">
                </div>
                <div class="col-md-3 col-sm-6 col-xs-6">
                <input id="mescierre_VENTANA" class="form-control input-md" data-orden="2" maxlength="2" placeholder="MM" required="true">
                </div>
                <div class="col-md-3 col-sm-6 col-xs-6">
                    <input id="diacierre_VENTANA" class="form-control input-md" data-orden="3" maxlength="2" placeholder="DD" required="true">
                </div>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _Evaluarcierrefact_VENTANA(callback, back, params);
}

function _Evaluarcierrefact_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#CERRARFACT_VENTANA',
            orden: '1'
        },
        () => {
            $(`#${params.VENTANAID}`).remove();
            back();
        },
        () => {
            let CERRAR = $('#cerrar_VENTANA').val().toUpperCase();
            if (CERRAR == 'S' || CERRAR == 'N') {
                if (CERRAR == 'N') {
                    $(`#${params.VENTANAID}`).remove();
                    callback();
                } else {
                    if (localStorage.Usuario == 'APCF' || localStorage.Usuario == 'EDMG' || localStorage.Usuario == 'IMLS' ||
                        localStorage.Usuario == 'AKOG' || localStorage.Usuario == 'DPCO' || localStorage.Usuario == 'DSRP' || 
                        localStorage.Usuario == 'LICC' || localStorage.Usuario == 'LYRC' || localStorage.Usuario == 'MSBR' || 
                        localStorage.Usuario == "KFLT" || localStorage.Usuario == "MYPS" || localStorage.Usuario == 'GEBC') {
                        console.log('RIPS')
                        _evaluarlistorips_VENTANA(callback, back, params);
                    } else {
                        $('#listrips_VENTANA').val('N')
                        params.RIPS = 'N'
                        console.log('FECHA')
                        _evaluarfechacierre_VENTANA('3', callback, back, params);
                    }
                }
            } else {
                CON851('', 'Digite S o N', null, 'error', 'Error');
                $('#cerrar_VENTANA').val('');
                _Evaluarcierrefact_VENTANA();
            }
        }
    );
}

function _evaluarlistorips_VENTANA(callback, back, params) {
    validarInputs(
        {
            form: '#LISTARIPS_VENTANA',
            orden: '1'
        },
        () => {
            _Evaluarcierrefact_VENTANA(callback, back, params)
        },
        () => {
            let RIPS = $('#listrips_VENTANA').val().toUpperCase();
            if (RIPS == 'S' || RIPS == 'N') {
                console.log(params);
                params.RIPS = $('#listrips_VENTANA').val()
                _evaluarfechacierre_VENTANA('3', callback, back, params);
            } else {
                CON851('', 'Digite S o N', null, 'error', 'Error');
                $('#listrips_VENTANA').val('');
                _evaluarlistorips_VENTANA();
            }
        }
    );
}

function _evaluarfechacierre_VENTANA(orden, callback, back, params) {
    let fechasistema = moment().format('YYYYMMDD');
    let fechacierre = moment().format('YYYYMMDD');
    // params.HORARETNUM = moment().format('HHmm');/////Diana.E = se comento porq estaba generado error undefined
    $('#anocierre_VENTANA').val(fechacierre.substring(0, 4));
    $('#mescierre_VENTANA').val(fechacierre.substring(4, 6));
    $('#diacierre_VENTANA').val(fechacierre.substring(6, 8));
    params.ANORET = $('#anocierre_VENTANA').val();
    params.MESRET = $('#mescierre_VENTANA').val();
    validarInputs(
        {
            form: '#FECHACIE_VENTANA',
            orden: orden
        },
        () => {
            _Evaluarcierrefact_VENTANA(callback, back, params);
        },
        () => {
            let MESRET = $('#mescierre_VENTANA').val();
            let DIARET = $('#diacierre_VENTANA').val();
            let FECHARETNUM = params.ANORET + MESRET + DIARET;
            if (
                parseInt(DIARET) < 1 ||
                parseInt(DIARET) > parseInt(params.FECHALNK.substring(6, 8)) ||
                parseInt(FECHARETNUM) < parseInt(params.FECHAING_NUM) ||
                FECHARETNUM > fechasistema ||
                (MESRET < 0 && MESRET > 12)
            ) {
                CON851('37', '37', null, 'error', 'error');
                $('#cerrar_VENTANA').val('N');
                _evaluarfechacierre_VENTANA('3', callback, back, params);
                // } else if (fechasistema > SER109.FECHARETNUM) {
                //     CON851('37', '37', null, 'error', 'error');
                //     $('#cerrar_VENTANA').val('N');
                //     _Evaluarcierrefact_VENTANA(callback, back, params)
            } else {
                params.FECHARETNUM = FECHARETNUM;
                _grabarcierre_VENTANA(callback, back, params);
            }
        }
    );
}

function _grabarcierre_VENTANA(callback, back, params) {
    postData(
        {
            datosh: `${datosEnvio()}4|${$_USUA_GLOBAL[0].COD_CIUD}|${params.LLAVE_NUM}| | |${params.ESTADOW
                }| | | | | |${localStorage.getItem('Usuario').trim()}| | | |${params.FECHARETNUM}|${params.RIPS
                }|`
        },
        get_url('APP/SALUD/SER109D.DLL')
    )
        .then((data) => {
            if (
                params.PREFIJOW == 'P' ||
                params.PREFIJOW == 'T' ||
                params.PREFIJOW == 'Q' ||
                params.PREFIJOW == 'V'
            ) {
                let URL = get_url('APP/SALUD/SAL020C.DLL');
                postData(
                    {
                        datosh:
                            datosEnvio() +
                            params.LLAVE_NUM +
                            '|' +
                            localStorage.getItem('Usuario').trim() +
                            '|'
                    },
                    URL
                )
                    .then((data) => {
                        console.debug(data);
                        CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
                        $(`#${params.VENTANAID}`).remove();
                        callback();
                    })
                    .catch((error) => {
                        console.error(error);
                        CON851(
                            '',
                            'Ocurrio un problema contactese con prosoft',
                            null,
                            'error',
                            'Error'
                        );
                        $(`#${params.VENTANAID}`).remove();
                        back();
                    });
            } else {
                postData(
                    { datosh: datosEnvio() + params.LLAVE_NUM + '|' + params.FECHALNK + '|' },
                    get_url('APP/SALUD/SAL020B.DLL')
                )
                    .then((data) => {
                        console.debug(data);
                        CON851('', 'Proceso Satisfactorio', null, 'success', 'Exito');
                        $(`#${params.VENTANAID}`).remove();
                        callback();
                    })
                    .catch((error) => {
                        console.error(error);
                        CON851(
                            '',
                            'Ocurrio un problema contactese con prosoft',
                            null,
                            'error',
                            'Error'
                        );
                        $(`#${params.VENTANAID}`).remove();
                        back();
                    });
            }
        })
        .catch((error) => {
            console.error(error);
            CON851('', 'Hubo un error con el cierre', null, 'error', 'Error');
            $(`#${params.VENTANAID}`).remove();
            back();
        });
}

function SER865(callback, back) {
    var medicamentos = [
        { CODIGO: '1', DESCRIPCION: 'VENTA DROGA' },
        { CODIGO: '2', DESCRIPCION: 'DEVOLUCION DROGA' },
        { CODIGO: '3', DESCRIPCION: 'PENDIENTE DROGA' }
    ];
    POPUP(
        {
            array: medicamentos,
            titulo: 'FACTURACION',
            callback_f: back,
            indices: [{ id: 'CODIGO', label: 'DESCRIPCION' }]
        },
        (data) => {
            callback(data);
        }
    );
}

function SER865A(callback, back) {
    var dispensaciones = [
        { CODIGO: '1', DESCRIPCION: 'NORMAL' },
        { CODIGO: '2', DESCRIPCION: 'AUTOMATICA' }
    ];
    POPUP(
        {
            array: dispensaciones,
            titulo: 'FACTURACION',
            indices: [{ label: 'DESCRIPCION' }],
            callback_f: back
        },
        (data) => {
            callback(data);
        }
    );
}

function RX822A(callback, back) {
    let lateralidades = [
        { CODIGO: '1', DESCRIPCION: 'DERECHO' },
        { CODIGO: '2', DESCRIPCION: 'IZQUIERDO' },
        { CODIGO: '3', DESCRIPCION: 'BILATERAL' },
        { CODIGO: '4', DESCRIPCION: 'NO APLICA' }
    ];
    POPUP(
        {
            array: lateralidades,
            titulo: 'LATERALIDAD',
            indices: [{ label: 'DESCRIPCION' }],
            callback_f: back
        },
        (data) => {
            callback(data);
        }
    );
}

function SER826(callback, callbackAtras, seleccion) {
    seleccion ? seleccion : false;
    let estados = [
        { COD: '0', DESCRIP: 'NO APLICA ESTADO' },
        { COD: '1', DESCRIP: '1ER TRIM. EMBARAZO' },
        { COD: '2', DESCRIP: '2DO TRIM. EMBARAZO' },
        { COD: '3', DESCRIP: '3ER TRIM. EMBARAZO' },
        { COD: '4', DESCRIP: 'NO ESTA EMBARAZADA' }
    ];

    POPUP(
        {
            array: estados,
            titulo: 'CONDICION USUARIA',
            teclaAlterna: true,
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callback(data);
        }
    );
}

function SER828(callback, callbackAtras, seleccion) {
    seleccion ? seleccion : false;
    let estados = [
        { COD: '1', DESCRIP: 'ACCIDENTE DE TRABAJO' },
        { COD: '2', DESCRIP: 'ACCIDENTE DE TRANSITO' },
        { COD: '3', DESCRIP: 'ACCIDENTE RABICO' },
        { COD: '4', DESCRIP: 'ACCIDENTE OFIDICO' },
        { COD: '5', DESCRIP: 'OTRO TIPO DE ACCIDENTE' },
        { COD: '6', DESCRIP: 'EVENTO CATASTROFICO' },
        { COD: '7', DESCRIP: 'LESION POR AGRESION' },
        { COD: '8', DESCRIP: 'LESION AUTOINFLINGIDA' },
        { COD: '9', DESCRIP: 'SOSP. MALTRATO FISICO' },
        { COD: 'A', DESCRIP: 'SOSP. ABUSO SEXUAL' },
        { COD: 'B', DESCRIP: 'SOSP. VIOLENCIA SEXUAL' },
        { COD: 'C', DESCRIP: 'SOSP. MALTRATO EMOCIONAL' },
        { COD: 'D', DESCRIP: 'ENFERMEDAD GENERAL' },
        { COD: 'E', DESCRIP: 'ENFERMEDAD PROFESIONAL' },
        { COD: 'G', DESCRIP: 'NO APLICA' }
    ];

    POPUP(
        {
            array: estados,
            titulo: 'CAUSA DEL EVENTO',
            indices: [{ id: 'COD', label: 'DESCRIP' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callback(data);
        }
    );
}

function SER837(callback, callbackAtras, seleccion) {
    seleccion ? seleccion : false;
    let estados = [
        { CODIGO: '1', DESCRIPCION: 'CANCEL X URGEN' },
        { CODIGO: '2', DESCRIPCION: 'FALTA SANGRE' },
        { CODIGO: '3', DESCRIPCION: 'FALTA MAT. MQ' },
        { CODIGO: '4', DESCRIPCION: 'FALTA APOYO DX' },
        { CODIGO: '5', DESCRIPCION: 'FALTA MEDICO' },
        { CODIGO: '6', DESCRIPCION: 'FALTA SALA' },
        { CODIGO: '7', DESCRIPCION: 'FALTA CUID INS' },
        { CODIGO: '8', DESCRIPCION: 'FALTA CUID PAC' },
        { CODIGO: '9', DESCRIPCION: 'CUDARO CLINICO' },
        { CODIGO: 'A', DESCRIPCION: 'DECISION PACI.' },
        { CODIGO: 'B', DESCRIPCION: 'OTRO MOTIVO' },
        { CODIGO: 'C', DESCRIPCION: 'DECISION PROFE' }
    ];

    POPUP(
        {
            array: estados,
            titulo: 'Motivo cancelacion:',
            indices: [{ id: 'CODIGO', label: 'DESCRIPCION' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callback(data);
        }
    );
}

function SER861A(callback, callbackAtras, seleccion) {
    seleccion ? seleccion : false;
    let estados = [
        { CODIGO: '1', DESCRIPCION: 'VIA PRESENCIAL' },
        { CODIGO: '2', DESCRIPCION: 'VIA TELEFONICA' },
        { CODIGO: '3', DESCRIPCION: 'VIA CORREO ELE' },
        { CODIGO: '4', DESCRIPCION: 'VIA MSN TEXTO' },
        { CODIGO: '5', DESCRIPCION: 'OTRAS VIAS' }
    ];

    POPUP(
        {
            array: estados,
            titulo: 'Via de asignación:',
            indices: [{ id: 'CODIGO', label: 'DESCRIPCION' }],
            seleccion: seleccion,
            callback_f: callbackAtras
        },
        (data) => {
            callback(data);
        }
    );
}

function SER818N(callback, back) {
    var ventanacierre = bootbox.dialog({
        size: 'medium',
        title: 'CONSULTA DE NOTIFICACIONES DE ATENCION',
        message: `<div class="row">
                <div class="col-md-12">
                    <div class="col-md-4 col-sm-4 col-xs-12" id="FECHAPROCESO_SER818NVENTANA">
                        <label class="col-md-6 col-sm-6 col-xs-12 control-label"> Fecha proceso </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input id="fecha_SER818NVENTANA" class="form-control input-md" data-orden="1" maxlength="10" placeholder="YYYY/MM/DD">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12" id="SWMARCA_SER818NVENTANA">
                        <label class="col-md-10 col-sm-10 col-xs-12 control-label" for="name"> Mostrar los eventos marcados como leidos? </label>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <input id="marca_SER818NVENTANA" class="form-control input-md" data-orden="1" maxlength="10" placeholder="YYYY/MM/DD">
                        </div>
                    </div>
                </div>
            </div>`,
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanacierre.off('show.bs.modal');
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanacierre.off('show.bs.modal');
                    back();
                }
            }
        }
    });
    ventanacierre.init($('.modal-footer').hide());
    ventanacierre.init(_evaluarfechaproceso_SER818N(callback, back));
    ventanacierre.on('shown.bs.modal', function () {
        $('#fecha_SER818NVENTANA').focus();
    });
}

function _evaluarfechaproceso_SER818N(callback, back) {
    var fechaproceso_SER818N = IMask($('#fecha_SER818NVENTANA')[0], {
        mask: Date,
        pattern: 'Y-m-d',
        lazy: true,
        blocks: {
            Y: {
                mask: IMask.MaskedRange,
                placeholderChar: 'Y',
                from: '2000',
                to: moment().format('YYYY'),
                maxLength: 4
            },
            m: {
                mask: IMask.MaskedRange,
                placeholderChar: 'm',
                from: '01',
                to: '12',
                maxLength: 2
            },
            d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 }
        },
        format: function (date) {
            return moment(date).format('YYYY-MM-DD');
        },
        parse: function (str) {
            var fecha = moment(str).format('YYYY-MM-DD');
            return str;
        }
    });
    _inputControl('disabled');
    fechaproceso_SER818N.typedValue = moment().format('YYYYMMDD');
    validarInputs(
        {
            form: '#FECHAPROCESO_SER818NVENTANA',
            orden: '1'
        },
        () => {
            $('.btn-danger').click();
        },
        () => {
            if (fechaproceso_SER818N.value.replace(/-/g, '').length < 10) {
                CON851('03', '03', _evaluarfechaproceso_SER818N(), 'error', 'Error');
            } else {
                _evaluarmarca_SER818N(callback, back);
            }
        }
    );
}

function _evaluarmarca_SER818N(callback, back) {
    var swmarcaMask_SER818N = IMask($('#marca_SER818NVENTANA')[0], {
        mask: 'a',
        definitions: {
            a: /[SN]/
        },
        prepare: function (str) {
            if (str.trim() == '') {
                return false;
            } else {
                return str.toUpperCase();
            }
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase();
        }
    });
    swmarcaMask_SER818N.typedValue = 'N';
    validarInputs(
        {
            form: '#SWMARCA_SER818NVENTANA',
            orden: '1'
        },
        () => {
            _evaluarfechaproceso_SER818N(callback, back);
        },
        () => {
            if (swmarcaMask_SER818N.value.trim() == '') {
                CON851('03', '03', _evaluarmarca_SER818N(), 'error', 'Error');
            } else {
                postData(
                    { datosh: `${datosEnvio()}${this.form.sucursal_SAL401.trim()}|` },
                    get_url('APP/SALUD/SER818N.DLL')
                )
                    .then((data) => {
                        _ventanaDatos({
                            titulo: `CONSULTA DE ATENCION `,
                            columnas: ['NOMBRE', 'IDENTIFICACION', 'DESCRIPCION'],
                            data: data,
                            callback_esc: function () {
                                _evaluarmarca_SER818N();
                            },
                            callback: function (data) {
                                $('.btn-primary').click();
                                callback(data);
                            }
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        _evaluarmarca_SER818N();
                    });
            }
        }
    );
}

function SER815(datos) {
    _ventanaalterna_SALUD(
        (data = {
            ID: datos.VENTANADISPENSACION,
            titulo: 'CONTROL DE DISPENSACION',
            html: ` 
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <label class=""col-md-12 col-sm-12 col-xs-12">Digite el codigo barras </label>
            <div class="col-md-12 col-sm-12 col-xs-12" id="VALIDARVENTANADISPENSACION1_SER815">
                <div class="inline-inputs">
                    <label class="col-md-5 col-sm-5 col-xs-12">DOCUMENTO A DISPENSAR:</label>
                    <div class="input-group col-md-6 col-sm-6 col-xs-11">
                        <input id="dispensarventana_SER815" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="16">
                    </div>
                    <button type="button" id="dispensarventanaBtn_SER815" class="btn  f8-Btn btn-default col-md-1 col-sm-1 col-xs-1">
                        <i class="icon-magnifier"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        })
    );
    _evaluardocumentoadispensar_SER815(datos);
    _toggleF8([
        {
            input: 'dispensarventana',
            app: 'SER815',
            funct: (e) => {
                if (e.which == 119 || e.type == 'click') {
                    set_Event_validar('#VALIDARVENTANADISPENSACION1_SER815', 'off');
                    $('#dispensarventana_SER815').attr('disabled', 'true');
                    $(`#${datos.VENTANADISPENSACION}`).remove();
                    datos.f8callback();
                }
            }
        }
    ]);
}
function _evaluardocumentoadispensar_SER815(datos) {
    validarInputs(
        {
            form: '#VALIDARVENTANADISPENSACION1_SER815',
            orden: '1'
        },
        () => {
            $(`#${datos.VENTANADISPENSACION}`).remove();
            datos.errcallback();
        },
        () => {
            var DOCW = $('#dispensarventana_SER815').val();
            if (DOCW.trim() == 'DR001892000264') {
                $(`#${datos.VENTANADISPENSACION}`).remove();
                return datos.continuar()
            };
            console.log(DOCW);
            postData(
                { datosh: `${datosEnvio()}1|${DOCW}|${localStorage.Usuario}|${datos.UNSERV}|` },
                get_url('APP/SALUD/SER815.DLL')
            )
                .then((data) => {
                    console.log(data);
                    $(`#${datos.VENTANADISPENSACION}`).remove();
                    datos.callback(data);
                })
                .catch((error) => {
                    console.error(error);
                    _evaluardocumentoadispensar_SER815(datos);
                });
        }
    );
}

function _preguntascovid_VENTANA(callback, back) {
    let datos = new Object();
    datos.VENTANAID = 'VENTANAPREGUNTASCOVID';
    _ventanaalterna_SALUD(
        (data = {
            ID: datos.VENTANAID,
            tamaño: 'col-md-5 col-sm-5 col-xs-12',
            titulo: 'RECOMENDACIONES',
            html: `
        <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Presenta sintomar Respiratorios?</label>
                    <div class="col-md-4" id="VALIDARCOVID1_SAL97C11">
                        <input id="sintomasrespiratotios_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span> 
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>

            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Presenta Fiebre o ha tenido en 14 dias > 38°C?</label>
                    <div class="col-md-4" id="VALIDARCOVID2_SAL97C11">
                        <input id="fiebre_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span>
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>

            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Tiene o ha tenido problemas digestivos en 14 dias?</label>
                    <div class="col-md-4" id="VALIDARCOVID3_SAL97C11">
                        <input id="digestivos_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span>
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>

            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Tiene o ha tenido cansancio o malestar en 14 dias?</label>
                    <div class="col-md-4" id="VALIDARCOVID4_SAL97C11">
                        <input id="cansancio_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span>
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>

            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Perdida del sentido del gusto o olfato en 14 dias?</label>
                    <div class="col-md-4" id="VALIDARCOVID5_SAL97C11">
                        <input id="gusto_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span>
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>

            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Ha tenido contacto con casos positivos COVID-19?</label>
                    <div class="col-md-4" id="VALIDARCOVID6_SAL97C11">
                        <input id="contacto_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span>
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>

            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Ha presentado la enfermedad de COVID-19?</label>
                    <div class="col-md-4" id="VALIDARCOVID7_SAL97C11">
                        <input id="enfermedad_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span>
                    </div>
                </div>
            </div>

            <div class="salto-linea"></div>

            <div class="col-md-12">
                <div class="form-group">
                    <label class="col-md-8 control-label">Sigue usted en cuarentena COVID19?</label>
                    <div class="col-md-4" id="VALIDARCOVID8_SAL97C11">
                        <input id="cuarentena_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1">
                        <span class="help-block">S/N</span>
                    </div>
                </div>
            </div>
        </div>
        `
        })
    );
    _inputControl('disabled');
    _evaluarcovid191_SAL97C11(callback, back, datos);
}

function _evaluarcovid191_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID1_SAL97C11',
            orden: '1'
        },
        () => {
            $(`#${datos.VENTANAID}`).remove();
            back();
        },
        () => {
            let PRESSINTERAW2 = $('#sintomasrespiratotios_SAL97C11').val().trim().toUpperCase();
            if (PRESSINTERAW2.trim() == '' || (PRESSINTERAW2 != 'S' && PRESSINTERAW2 != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid191_SAL97C11(callback, back, datos);
            } else {
                _evaluarcovid192_SAL97C11(callback, back, datos);
            }
        }
    );
}

function _evaluarcovid192_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID2_SAL97C11',
            orden: '1'
        },
        () => {
            _evaluarcovid191_SAL97C11(callback, back, datos);
        },
        () => {
            let COVFIEBREMAY38W2 = $('#fiebre_SAL97C11').val().trim().toUpperCase();
            if (
                COVFIEBREMAY38W2.trim() == '' ||
                (COVFIEBREMAY38W2 != 'S' && COVFIEBREMAY38W2 != 'N')
            ) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid192_SAL97C11(callback, back, datos);
            } else {
                _evaluarcovid193_SAL97C11(callback, back, datos);
            }
        }
    );
}

function _evaluarcovid193_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID3_SAL97C11',
            orden: '1'
        },
        () => {
            _evaluarcovid192_SAL97C11(callback, back, datos);
        },
        () => {
            let COVDIGESTIVOW2 = $('#digestivos_SAL97C11').val().trim().toUpperCase();
            if (COVDIGESTIVOW2.trim() == '' || (COVDIGESTIVOW2 != 'S' && COVDIGESTIVOW2 != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid193_SAL97C11(callback, back, datos);
            } else {
                _evaluarcovid194_SAL97C11(callback, back, datos);
            }
        }
    );
}
function _evaluarcovid194_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID4_SAL97C11',
            orden: '1'
        },
        () => {
            _evaluarcovid193_SAL97C11(callback, back, datos);
        },
        () => {
            let COVCANSANW2 = $('#cansancio_SAL97C11').val().trim().toUpperCase();
            if (COVCANSANW2.trim() == '' || (COVCANSANW2 != 'S' && COVCANSANW2 != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid194_SAL97C11(callback, back, datos);
            } else {
                _evaluarcovid195_SAL97C11(callback, back, datos);
            }
        }
    );
}
function _evaluarcovid195_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID5_SAL97C11',
            orden: '1'
        },
        () => {
            _evaluarcovid194_SAL97C11(callback, back, datos);
        },
        () => {
            let COVGUSOLFW2 = $('#gusto_SAL97C11').val().trim().toUpperCase();
            if (COVGUSOLFW2.trim() == '' || (COVGUSOLFW2 != 'S' && COVGUSOLFW2 != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid195_SAL97C11(callback, back, datos);
            } else {
                _evaluarcovid196_SAL97C11(callback, back, datos);
            }
        }
    );
}
function _evaluarcovid196_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID6_SAL97C11',
            orden: '1'
        },
        () => {
            _evaluarcovid195_SAL97C11(callback, back, datos);
        },
        () => {
            let CONTATOCOVIDW2 = $('#contacto_SAL97C11').val().trim().toUpperCase();
            if (CONTATOCOVIDW2.trim() == '' || (CONTATOCOVIDW2 != 'S' && CONTATOCOVIDW2 != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid196_SAL97C11(callback, back, datos);
            } else {
                _evaluarcovid197_SAL97C11(callback, back, datos);
            }
        }
    );
}
function _evaluarcovid197_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID7_SAL97C11',
            orden: '1'
        },
        () => {
            _evaluarcovid196_SAL97C11(callback, back, datos);
        },
        () => {
            let ENFCOVDW2 = $('#enfermedad_SAL97C11').val().trim().toUpperCase();
            if (ENFCOVDW2.trim() == '' || (ENFCOVDW2 != 'S' && ENFCOVDW2 != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid197_SAL97C11(callback, back, datos);
            } else {
                _evaluarcovid198_SAL97C11(callback, back, datos);
            }
        }
    );
}
function _evaluarcovid198_SAL97C11(callback, back, datos) {
    validarInputs(
        {
            form: '#VALIDARCOVID8_SAL97C11',
            orden: '1'
        },
        () => {
            _evaluarcovid197_SAL97C11(callback, back, datos);
        },
        () => {
            let SIGUECUARW2 = $('#cuarentena_SAL97C11').val().trim().toUpperCase();
            if (SIGUECUARW2.trim() == '' || (SIGUECUARW2 != 'S' && SIGUECUARW2 != 'N')) {
                CON851('', 'Por favor digita S o N', null, 'error', 'Error');
                _evaluarcovid198_SAL97C11(callback, back, datos);
            } else {
                let SINTOMASERAW2 = $('#sintomasrespiratotios_SAL97C11').val().trim().toUpperCase();
                let FIEBREW2 = $('#fiebre_SAL97C11').val().trim().toUpperCase();
                let COVDIGESTIVOW2 = $('#digestivos_SAL97C11').val().trim().toUpperCase();
                let COVCANSANW2 = $('#cansancio_SAL97C11').val().trim().toUpperCase();
                let COVGUSOLFW2 = $('#gusto_SAL97C11').val().trim().toUpperCase();
                let CONTATOCOVIDW2 = $('#contacto_SAL97C11').val().trim().toUpperCase();
                let ENFCOVDW2 = $('#enfermedad_SAL97C11').val().trim().toUpperCase();
                callback(
                    (data = {
                        SINTOMAS: SINTOMASERAW2,
                        FIEBRE: FIEBREW2,
                        DIGESTIVO: COVDIGESTIVOW2,
                        CANSANCIO: COVCANSANW2,
                        GUSTO: COVGUSOLFW2,
                        CONTACTO: CONTATOCOVIDW2,
                        ENFERMEDAD: ENFCOVDW2,
                        CUARENTENA: SIGUECUARW2
                    })
                );
                $(`#${datos.VENTANAID}`).remove();
                // PREGUNTAS VACUNA
            }
        }
    );
}

// function _ventanaDispensacion_SER815(e, datos){
//     if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
//         loader('show')
//         postData( { datosh: `${datosEnvio()}${datos.UNSERV}|` }, get_url("APP/SALUD/SER815V.DLL"))
//             .then((data) => {
//                 loader("hide");
//                 data.DISPENSACION.pop();
//                 _ventanaDatos({
//                     titulo: 'VENTANA DE CONSULTA TERCEROS',
//                     columnas: ["NOMBRE_PACIENTE", "UNIDAD", "MEDICO", "TIPO", "PEDIDO"],
//                     data: data.DISPENSACION,
//                     callback_esc: function () {
//                         $('#dispensarventana_SER815').focus();
//                     },
//                     callback: function (data) {
//                         if (data.TIPO.substring(0,1) == 'P'){
//                             $('#dispensarventana_SER815').val(data.PEDIDO.padStart(16,'0'));
//                         } else {
//                             let segundos = parseInt(data.LLAVE.substring(31,33)) + parseInt(data.LLAVE.substring(33,35));
//                             $('#dispensarventana_SER815').val(`${data.LLAVE.substring(25,31)}${data.LLAVE.substring(31,33)}${data.LLAVE.substring(33,35)}${segundos.toString().substring(0,2)}1${data.LLAVE.substring(12,15)}`);
//                         }
//                         _enterInput('#dispensarventana_SER815');
//                     }
//                 });
//             })
//             .catch((error) => {
//                 loader("hide");
//                 console.error(error);
//                 CON851('', 'Ha ocurrido un error en el SER815', null, 'error', 'Error');
//                 $('#dispensarventana_SER815').focus();
//             });
//     }
// }
